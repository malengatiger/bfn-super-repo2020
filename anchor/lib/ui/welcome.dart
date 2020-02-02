import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:flutter/material.dart';

class Welcome extends StatefulWidget {
  final Anchor anchor;

  Welcome(this.anchor);

  @override
  _WelcomeState createState() => _WelcomeState();
}

class _WelcomeState extends State<Welcome> {
  var _key = GlobalKey<ScaffoldState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text('Welcome'),
        backgroundColor: Colors.teal[400],
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(80),
          child: Column(
            children: <Widget>[
              Text('Onboarding UI coming under here', style: Styles.whiteSmall,),
              SizedBox(height: 20,),
            ],
          ),
        ),
      ),
    );
  }
}
