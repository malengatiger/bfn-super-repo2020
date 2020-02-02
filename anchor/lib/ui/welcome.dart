import 'package:anchor/onboard/pages.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:google_fonts/google_fonts.dart';
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
    return WillPopScope(
      onWillPop: () async {
        return Future.value(false);
      },
      child: Scaffold(
        appBar: AppBar(
          elevation: 0,
          title: Text('Business Finance Network',
            style: TextStyle(fontFamily: GoogleFonts.raleway().toString(), fontSize: 20),),
          backgroundColor: Colors.orange,
          actions: <Widget>[
            IconButton(icon: Icon(Icons.close), onPressed: () {
              Navigator.pop(context);
            },),
          ],
        ),
        body: PageView(
          children: <Widget>[
            PageOne(), PageTwo(), PageThree(), PageFour(), PageFive()
          ],
        ),
      )
    );
  }
}
