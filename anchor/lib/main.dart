import 'package:bfnlibrary/net_util.dart';
import 'package:bfnlibrary/util/auth.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() async {
  await DotEnv().load('.env');
  print('🌸 🌸 🌸 🌸 🌸 DotEnv has been created. Check content of variables');
  var email = DotEnv().env['email'];
  var pass = DotEnv().env['password'];
  print('🌸 🌸 🌸 🌸 🌸 email from .env : 🌸  $email 🌸  pass: $pass');

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 8;

  @override
  void initState() {
    super.initState();
    _getNodes();
  }

  void _getNodes() async {
    print('🍎 🍎 🍎 🍎 🍎 🍎 get nodes .....');
    var res = await Net.getNodesFromFirestore();
    res.forEach((element) {
      print('🍎 🍎 🍎 🍎 ${element.toJson()} 🍎 🍎');
    });
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            SizedBox(
              height: 20,
            ),
            RaisedButton(
              onPressed: _handleGoogleSignIn,
              color: Colors.pink,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  "Handle Google Sign In",
                  style: Styles.whiteMedium,
                ),
              ),
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  void _handleGoogleSignIn() async {
    BFNAuth.handleSignIn();
  }
}
