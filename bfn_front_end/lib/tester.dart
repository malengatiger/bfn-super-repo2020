import 'package:bfnlibrary/util/net.dart';
import 'package:flutter/material.dart';

class Tester extends StatefulWidget {
  @override
  _TesterState createState() => _TesterState();
}

class _TesterState extends State<Tester> {
  @override
  void initState() {
    super.initState();
    print("initState .........");
    getNodes();
  }

  void getNodes() async {
    print("getting nodes .......");
    var list = await Net.listNodes();
    list.forEach((element) {
      print(element.toJson());
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
