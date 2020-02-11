import 'package:anchor/bloc/anchor_bloc.dart';
import 'package:anchor/bloc/trader_bloc.dart';
import 'package:anchor/onboard/signin.dart';
import 'package:anchor/ui/dashboard.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:bfnlibrary/util/theme_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import 'ui/welcome.dart';

void main() async {
  await DotEnv().load('.env');
  print('🌸 🌸 🌸 🌸 🌸 DotEnv has been created. Check content of variables');
  var email = DotEnv().env['email'];
  var pass = DotEnv().env['password'];
  print('🌸 🌸 🌸 🌸 🌸 email from .env : 🌸  $email 🌸  pass: $pass');
  await SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  runApp(AnchorApp());
}

class AnchorApp extends StatefulWidget {
  @override
  _AnchorAppState createState() => _AnchorAppState();
}

class _AnchorAppState extends State<AnchorApp> {
  int themeIndex;
  void _getTheme() async {
    themeIndex = await Prefs.getThemeIndex();
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    _getTheme();
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<AnchorBloc>.value(
          value: AnchorBloc(),
        ),
        ChangeNotifierProvider<TraderBloc>.value(
          value: TraderBloc(),
        ),
      ],
      child: StreamBuilder<int>(
          initialData: themeIndex == null ? 0 : themeIndex,
          stream: themeBloc.newThemeStream,
          builder: (context, snapShot) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              title: 'Anchor',
              theme: snapShot.data == null
                  ? ThemeUtil.getTheme(themeIndex: themeIndex)
                  : ThemeUtil.getTheme(themeIndex: snapShot.data),
              home: LandingPage(),
            );
          }),
    );
  }
}

class LandingPage extends StatefulWidget {
  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  @override
  void initState() {
    super.initState();
    _checkAnchor();
  }

  var isBusy = false;
  var isFirstTime = false;

  void _checkAnchor() async {
    var anchor = await Prefs.getAnchor();
    if (anchor == null) {
      debugPrint(
          '🥦  🥦 There is no anchor in prefs. 🍊 🍊 🍊 Create one, please! 🛎 ');
      isFirstTime = true;
      var res =
          await Navigator.push(context, SlideRightRoute(widget: SignIn()));
      if (res != null && res is Anchor) {
        Navigator.push(context, SlideRightRoute(widget: Welcome(res)));
      }
    } else {
      if (anchor.accountId == "TBD") {
        isFirstTime = true;
        var res =
            await Navigator.push(context, SlideRightRoute(widget: SignIn()));
        if (res != null && res is Anchor) {
          Navigator.push(context, SlideRightRoute(widget: Welcome(res)));
        }
      } else {
        debugPrint(
            '🥦 🥦 Anchor is already set up on 🍎 Node and 🥏 Firebase Auth and 🍊 Firestore');
        Navigator.push(context, SlideRightRoute(widget: Dashboard()));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return isFirstTime ? Welcome(null) : Dashboard();
  }
}
