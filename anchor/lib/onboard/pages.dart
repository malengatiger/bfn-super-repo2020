import 'package:bfnlibrary/util/functions.dart';
import 'package:flutter/material.dart';
import 'package:dots_indicator/dots_indicator.dart';

class PageOne extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          color: Colors.blue,
          height: 400, width: double.infinity,
          child: Opacity(
            opacity: 0.8,
            child: Image(image: AssetImage('download1.jpeg'),
              fit: BoxFit.cover,
            ),
          ),
        ),
        SizedBox(height: 8,),
        Text('Welcome Aboard', style: Styles.blackBoldLarge,),
        SizedBox(height: 8,),
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: Text('The Anchor App enables you to participate '
              'in the Business Finance Network where you can purchase invoices for a discount',
          style: Styles.blackBoldSmall,),
        ),
        DotsIndicator(
          dotsCount: 5,
          position: 0,
        ),
      ],
    );
  }
}
class PageTwo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          color: Colors.blue,
          height: 400, width: double.infinity,
            child: Opacity(
              opacity: 0.8,
              child: Image(image: AssetImage('download3.jpeg'),
                fit: BoxFit.cover,
              ),
            ),
        ),
        SizedBox(height: 8,),
        Text('Purchase Invoices', style: Styles.blackBoldLarge,),
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: Text('The Anchor App enables you to participate '
              'in the Business Finance Network where you can purchase invoices for a discount'),
        ),
        DotsIndicator(
          dotsCount: 5,
          position: 1,
        ),
      ],
    );
  }
}
class PageThree extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          color: Colors.blue,
          height: 400, width: double.infinity,
          child: Opacity(
            opacity: 0.8,
            child: Image(image: AssetImage('download4.jpeg'),
              fit: BoxFit.cover,
            ),
          ),
        ),
        SizedBox(height: 8,),
        Text('Get Paid', style: Styles.blackBoldLarge,),
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: Text('The Anchor App enables you to participate '
              'in the Business Finance Network where you can purchase invoices for a discount'),
        ),
        DotsIndicator(
          dotsCount: 5,
          position: 2,
        ),
      ],
    );
  }
}
class PageFour extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          color: Colors.blue,
          height: 400, width: double.infinity,
          child: Opacity(
            opacity: 0.8,
            child: Image(image: AssetImage('download8.jpeg'),
              fit: BoxFit.cover,
            ),
          ),
        ),
        SizedBox(height: 8,),
        Text('Live Happy!', style: Styles.blackBoldLarge,),
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: Text('The Anchor App enables you to participate '
              'in the Business Finance Network where you can purchase invoices for a discount'),
        ),
        DotsIndicator(
          dotsCount: 5,
          position: 3,
        ),
      ],
    );
  }
}
class PageFive extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          color: Colors.blue,
          height: 400, width: double.infinity,
          child: Opacity(
            opacity: 0.8,
            child: Image(image: AssetImage('images12.jpeg'),
              fit: BoxFit.cover,
            ),
          ),
        ),
        SizedBox(height: 8,),
        Text('Contact Us', style: Styles.blackBoldLarge,),
        Center(
          child: GestureDetector(
            onTap: () {
              debugPrint('📅 📅 📅 📭 Open phone email app... 📭 ');
            },
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                children: <Widget>[
                  Text('Email:', style: Styles.greyLabelSmall,),
                  SizedBox(width: 16,),
                  Text('info@oneconnect.co.za', style: Styles.blackBoldSmall,),
                ],
              ),
            ),
          ),
        ),
        Center(
          child: GestureDetector(
            onTap: () {
              debugPrint('☎️ ☎️ ☎️ Open phone dialler... ☎️');
            },
            child: Padding(
              padding: const EdgeInsets.only(left:12.0),
              child: Column(
                children: <Widget>[
                  Text('Telephone:', style: Styles.greyLabelSmall,),
                  SizedBox(width: 16,),
                  Text('+27 12 666 7267', style: Styles.pinkBoldSmall,),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
