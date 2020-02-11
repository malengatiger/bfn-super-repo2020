import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:dots_indicator/dots_indicator.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PageOne extends StatelessWidget {
  final Anchor anchor;

  PageOne(this.anchor);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Column(
          children: <Widget>[
            Container(
              color: Colors.blue,
              height: 300,
              width: double.infinity,
              child: Opacity(
                opacity: 0.7,
                child: Image(
                  image: AssetImage('download1.jpeg'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(
              height: 28,
            ),
            Column(
              children: <Widget>[
                Text(
                  'Welcome Aboard',
                  style: TextStyle(
                      fontFamily: GoogleFonts.acme().toString(),
                      fontSize: 30,
                      fontWeight: FontWeight.w900),
                ),
                Text(
                  anchor == null ? '' : anchor.name,
                  style: Styles.greyLabelSmall,
                ),
              ],
            ),
            SizedBox(
              height: 8,
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Text(
                'The Anchor App enables you to participate '
                'in the Business Finance Network where you can purchase invoices for a discount',
                style: Styles.blackBoldSmall,
              ),
            ),
            SizedBox(
              height: 16,
            ),
            DotsIndicator(
              dotsCount: 5,
              position: 0,
            ),
          ],
        ),
      ],
    );
  }
}

class PageTwo extends StatelessWidget {
  final Anchor anchor;

  PageTwo(this.anchor);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Column(
          children: <Widget>[
            Container(
              color: Colors.blue,
              height: 300,
              width: double.infinity,
              child: Opacity(
                opacity: 0.7,
                child: Image(
                  image: AssetImage('download3.jpeg'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(
              height: 8,
            ),
            Column(
              children: <Widget>[
                Text(
                  'Purchase Invoices',
                  style: TextStyle(
                      fontFamily: GoogleFonts.acme().toString(),
                      fontSize: 30,
                      fontWeight: FontWeight.w900),
                ),
                Text(
                  anchor == null ? '' : anchor.name,
                  style: Styles.greyLabelSmall,
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Text('The Anchor App enables you to participate '
                  'in the Business Finance Network where you can purchase invoices for a discount'),
            ),
            SizedBox(
              height: 16,
            ),
            DotsIndicator(
              dotsCount: 5,
              position: 1,
            ),
          ],
        ),
      ],
    );
  }
}

class PageThree extends StatelessWidget {
  final Anchor anchor;

  PageThree(this.anchor);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Column(
          children: <Widget>[
            Container(
              color: Colors.blue,
              height: 300,
              width: double.infinity,
              child: Opacity(
                opacity: 0.6,
                child: Image(
                  image: AssetImage('download4.jpeg'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(
              height: 8,
            ),
            Column(
              children: <Widget>[
                Text(
                  'Get Paid',
                  style: TextStyle(
                      fontFamily: GoogleFonts.acme().toString(),
                      fontSize: 30,
                      fontWeight: FontWeight.w900),
                ),
                Text(
                  anchor == null ? '' : anchor.name,
                  style: Styles.greyLabelSmall,
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Text('The Anchor App enables you to participate '
                  'in the Business Finance Network where you can purchase invoices for a discount'),
            ),
            SizedBox(
              height: 16,
            ),
            DotsIndicator(
              dotsCount: 5,
              position: 2,
            ),
          ],
        ),
      ],
    );
  }
}

class PageFour extends StatelessWidget {
  final Anchor anchor;

  PageFour(this.anchor);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Column(
          children: <Widget>[
            Container(
              color: Colors.blue,
              height: 300,
              width: double.infinity,
              child: Opacity(
                opacity: 0.6,
                child: Image(
                  image: AssetImage('download8.jpeg'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(
              height: 8,
            ),
            Column(
              children: <Widget>[
                Text(
                  'Be Happy!',
                  style: TextStyle(
                      fontFamily: GoogleFonts.acme().toString(),
                      fontSize: 30,
                      fontWeight: FontWeight.w900),
                ),
                Text(
                  anchor == null ? '' : anchor.name,
                  style: Styles.greyLabelSmall,
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Text('The Anchor App enables you to participate '
                  'in the Business Finance Network where you can purchase invoices for a discount'),
            ),
            SizedBox(
              height: 16,
            ),
            DotsIndicator(
              dotsCount: 5,
              position: 3,
            ),
          ],
        ),
      ],
    );
  }
}

class PageFive extends StatelessWidget {
  final Anchor anchor;

  PageFive(this.anchor);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Column(
          children: <Widget>[
            Container(
              color: Colors.blue,
              height: 300,
              width: double.infinity,
              child: AnimatedOpacity(
                opacity: 0.2,
                duration: Duration(milliseconds: 500),
                child: Image(
                  image: AssetImage('images22.jpeg'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(
              height: 8,
            ),
            Column(
              children: <Widget>[
                Text(
                  'Contact Us',
                  style: TextStyle(
                      fontFamily: GoogleFonts.acme().toString(),
                      fontSize: 30,
                      fontWeight: FontWeight.w900),
                ),
                Text(
                  anchor == null ? '' : anchor.name,
                  style: Styles.greyLabelSmall,
                ),
              ],
            ),
            SizedBox(
              height: 8,
            ),
            Center(
              child: GestureDetector(
                onTap: () {
                  debugPrint('📅 📅 📅 📭 Open phone email app... 📭 ');
                },
                child: Padding(
                  padding: const EdgeInsets.only(left: 48.0),
                  child: Column(
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Icon(Icons.email),
                          Text(
                            'Email:',
                            style: Styles.greyLabelSmall,
                          ),
                        ],
                      ),
                      SizedBox(
                        width: 16,
                      ),
                      Row(
                        children: <Widget>[
                          Text(
                            'info@oneconnect.co.za',
                            style: Styles.blackBoldSmall,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(
              height: 16,
            ),
            Center(
              child: GestureDetector(
                onTap: () {
                  debugPrint('☎️ ☎️ ☎️ Open phone dialler... ☎️');
                },
                child: Padding(
                  padding: const EdgeInsets.only(left: 48.0),
                  child: Column(
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Icon(Icons.phone),
                          Text(
                            'Telephone:',
                            style: Styles.greyLabelSmall,
                          ),
                        ],
                      ),
                      Row(
                        children: <Widget>[
                          Text(
                            '+27 12 666 7267',
                            style: Styles.pinkBoldSmall,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
