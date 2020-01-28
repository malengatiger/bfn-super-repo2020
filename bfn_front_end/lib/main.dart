import 'package:bfn_front_end/tester.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Business Finance Network',
      theme: ThemeData(
        primarySwatch: Colors.pink,
      ),
      home: Tester(),
    );
  }
}
