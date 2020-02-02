import 'package:anchor/bloc/anchor_bloc.dart';
import 'package:anchor/bloc/trader_bloc.dart';
import 'package:anchor/ui/anchor_editor.dart';
import 'package:anchor/ui/dashboard.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/net_util.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';
import 'ui/welcome.dart';
import 'package:google_fonts/google_fonts.dart';

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

class AnchorApp extends StatelessWidget {
  // This widget is the root of your application.
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
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Anchor',
        theme: ThemeData(
          primarySwatch: Colors.indigo,
          textTheme: GoogleFonts.ralewayTextTheme()
        ),
        home: LandingPage(),
      ),
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
      var res = await Navigator.push(
          context, SlideRightRoute(widget: AnchorEditor()));
      if (res != null && res is Anchor) {
        Navigator.push(context, SlideRightRoute(widget: Welcome(res)));
      }
    } else {
      if (anchor.accountId == null) {
        isFirstTime = true;
        var res = await Navigator.push(
            context,
            SlideRightRoute(
                widget: AnchorEditor(
              anchor: anchor,
            )));
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

  var _key = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text('BFN Anchor App'),
      ),
      body: isBusy
          ? Center(
              child: Container(
                  width: 200,
                  height: 200,
                  child: CircularProgressIndicator(
                    strokeWidth: 24,
                    backgroundColor: Colors.pink,
                  )),
            )
          : isFirstTime ? Welcome(null) : Dashboard(),
    );
  }
}
