import 'package:anchor/onboard/pages.dart';
import 'package:anchor/ui/dashboard.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
//    final AnchorBloc bloc = Provider.of<AnchorBloc>(context);
    return WillPopScope(
        onWillPop: () async {
          return Future.value(false);
        },
        child: Scaffold(
          key: _key,
          appBar: AppBar(
            leading: Container(),
            elevation: 0,
            centerTitle: true,
            title: Text(
              'Business Finance Network',
              style: TextStyle(
                  fontFamily: GoogleFonts.raleway().toString(), fontSize: 12),
            ),
            backgroundColor: Colors.orange,
            actions: <Widget>[
              IconButton(
                icon: Icon(Icons.close),
                onPressed: () {
                  Navigator.pop(context);
                  Navigator.push(context, SlideRightRoute(widget: Dashboard()));
                },
              ),
            ],
          ),
          body: PageView(
            children: <Widget>[
              PageOne(widget.anchor),
              PageTwo(widget.anchor),
              PageThree(widget.anchor),
              PageFour(widget.anchor),
              PageFive(widget.anchor)
            ],
          ),
        ));
  }
}
