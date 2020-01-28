import 'package:bfnlibrary/util/prefs.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:bfnlibrary/util/theme_bloc.dart';
import 'package:bfnmobile/bloc.dart';
import 'package:bfnmobile/ui/dashboard.dart';
import 'package:bfnmobile/ui/dev_signin.dart';
import 'package:bfnmobile/ui/sign_up.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() async {
  await DotEnv().load('.env');
  print('🌸 🌸 🌸 🌸 🌸 DotEnv has been created. Check content of variables');
  var email = DotEnv().env['email'];
  var pass = DotEnv().env['password'];
  print('🌸 🌸 🌸 🌸 🌸 email from .env : 🌸  $email 🌸  pass: $pass');

  runApp(BFNMobileApp());
}

class BFNMobileApp extends StatefulWidget {
  @override
  _BFNMobileAppState createState() => _BFNMobileAppState();
}

class _BFNMobileAppState extends State<BFNMobileApp> {
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
    return StreamBuilder<int>(
        initialData: themeIndex == null ? 0 : themeIndex,
        stream: themeBloc.newThemeStream,
        builder: (context, snapShot) {
          print(
              '👽 👽 👽 👽 main.dart; snapShot theme index: 👽  ${snapShot.data} 👽 ');
          return MaterialApp(
            title: 'BFNapp',
            debugShowCheckedModeBanner: false,
            theme: snapShot.data == null
                ? ThemeUtil.getTheme(themeIndex: themeIndex)
                : ThemeUtil.getTheme(themeIndex: snapShot.data),
            home: ControllerPage(),
          );
        });
  }
}

class ControllerPage extends StatefulWidget {
  ControllerPage({Key key}) : super(key: key);

  @override
  _ControllerPageState createState() => _ControllerPageState();
}

class _ControllerPageState extends State<ControllerPage> {
  @override
  void initState() {
    super.initState();
    _startData();
  }

  void _startData() async {
    print('_startData:  📌️  📌️ will check authentication ...');
    var isAuthed = await bfnBloc.isUserAuthenticated();
    var debug = DotEnv().env['debug'];
    print('🌸 🌸 🌸 🌸 🌸 debug from .env : 🌸  $debug');
    if (debug == 'true') {
      if (!isAuthed) {
        _startDevSignUp();
        return;
      } else {
        _startDashboard();
      }
    } else {
      if (!isAuthed) {
        _startSignUp();
        return;
      } else {
        _startDashboard();
      }
    }
  }

  _startDevSignUp() async {
    print('🌸 🌸 🌸 🌸 🌸 _startDevSignUp: debug from .env : 🌸 ');
    var res = await Navigator.push(
        context,
        SlideRightRoute(
          widget: DevSignIn(),
        ));
    if (res != null) {
      _startDashboard();
    }
  }

  _startSignUp() async {
    var res = await Navigator.push(
        context,
        SlideRightRoute(
          widget: SignUp(),
        ));
    if (res != null) {
      _startDashboard();
    }
  }

  _startDashboard() {
    Navigator.push(
        context,
        SlideRightRoute(
          widget: Dashboard(),
        ));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.brown[200],
    );
  }
}
