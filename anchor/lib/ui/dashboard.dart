import 'package:anchor/ui/anchor_editor.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  var _key = GlobalKey<ScaffoldState>();
  Anchor anchor;

  @override
  void initState() {
    super.initState();
    _getAnchor();
  }

  _getAnchor() async {
    anchor = await Prefs.getAnchor();
    setState(() {

    });
  }

  _updateAnchor() async {
    debugPrint('🔋🔋🔋 Navigating to AnchorEditor ...');
    var res = await Navigator.push(context, SlideRightRoute(
      widget: AnchorEditor(anchor: anchor,)
    ));
    debugPrint('🔋🔋🔋 Back from AnchorEditor ...');
    if (res != null && res is Anchor) {
      setState(() {
        anchor = res;
      });
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text('Dashboard'),
        backgroundColor: Colors.pink[300],
        actions: <Widget>[
          IconButton(icon: Icon(Icons.settings), onPressed: _updateAnchor,)
        ],
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(80),
          child: Column(
            children: <Widget>[
              Text(
                anchor == null ? 'Dashboard data here ...' : anchor.name,
                style: Styles.whiteSmall,
              ),
              SizedBox(
                height: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
