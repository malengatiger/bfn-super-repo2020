import 'package:anchor/bloc/anchor_bloc.dart';
import 'package:anchor/ui/anchor_editor.dart';
import 'package:anchor/ui/welcome.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/data/invoice_offer.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:bfnlibrary/util/theme_bloc.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';

class Dashboard extends StatefulWidget {
  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  var _key = GlobalKey<ScaffoldState>();
  Anchor anchor;
  AnchorBloc _anchorBloc;

  @override
  void initState() {
    super.initState();
    _getAnchor();
    _buildItems();
  }

  _getAnchor() async {
    anchor = await Prefs.getAnchor();
    setState(() {});
  }

  _updateAnchor() async {
    debugPrint('🔋🔋🔋 Navigating to AnchorEditor ...');
    var res = await Navigator.push(
        context,
        SlideRightRoute(
            widget: AnchorEditor(
          anchor: anchor,
        )));
    debugPrint('🔋🔋🔋 Back from AnchorEditor ...');
    if (res != null && res is Anchor) {
      setState(() {
        anchor = res;
      });
    }
  }

  var _items = List<BottomNavigationBarItem>();
  _buildItems() {
    debugPrint('🔹 🔹 🔹 building items ....');
//    _items.add(BottomNavigationBarItem(
//        icon: Icon(
//          Icons.list,
//          color: Colors.black, size: 36,
//        ),
//        title: Text('Offers')));
    _items.add(BottomNavigationBarItem(
        icon: Icon(
          Icons.access_alarm,
          size: 36,
        ),
        title: Text('Acceptances')));
    _items.add(BottomNavigationBarItem(
        icon: Icon(
          Icons.account_balance,
          size: 36,
        ),
        title: Text('Payments')));
    _items.add(BottomNavigationBarItem(
        icon: Icon(
          Icons.shopping_cart,
          size: 36,
        ),
        title: Text('History')));
    debugPrint('🔹 🔹 we have 🔹 ${_items.length} items in nav list');
  }

  List<Content> contents = List();
  @override
  Widget build(BuildContext context) {
    final AnchorBloc bloc = Provider.of<AnchorBloc>(context);
    _anchorBloc = bloc;
    var node = bloc.node;
    print(node);

    return Scaffold(
      key: _key,
      appBar: AppBar(
        leading: Container(), elevation: 0,
        title: Text('Business Finance Network', style: Styles.whiteSmall,),
        centerTitle: false,
        backgroundColor: Colors.brown[100],
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.settings, color: Colors.black,),
            onPressed: _updateAnchor,
          ),
          IconButton(
            icon: Icon(Icons.info_outline, color: Colors.blue,),
            onPressed: () {
              Navigator.push(context, SlideRightRoute(widget: Welcome(null)));
            },
          )
        ],
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(80),
          child: Column(
            children: <Widget>[
              GestureDetector(
                onTap: () {
                  debugPrint('🍀 🍀 🍀 🍀 changeToRandomTheme ');
                  themeBloc.changeToRandomTheme();
                },
                child: Text(
                  bloc.anchor == null ? '..... 🍊 🍊 🍊 ....' : bloc.anchor.name,
                  style: TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 24,
                      fontFamily: GoogleFonts.anton().toString()),
                ),
              ),
              SizedBox(
                height: 20,
              ),
            ],
          ),
        ),
      ),
      backgroundColor: Colors.brown[100],
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: GridView.count(
          crossAxisCount: 2,
          children: <Widget>[
            GestureDetector(
                onTap: _navigateToOpenOffers,
                child: OfferCard('open')),
            GestureDetector(
                onTap: _navigateToAcceptedOffers,
                child: OfferCard('accepted')),
            GestureDetector(
                onTap: _navigateToClosedOffers,
                child: OfferCard('closed')),

          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: _items,
        onTap: (index) {
          debugPrint('❇️ Tapped index $index');
          switch (index) {
            case 0:
              debugPrint('💊 Navigation item clicked: 💊 $index 💊 ');
              break;
            case 1:
              debugPrint('💊 Navigation item clicked: 💊 $index 💊 ');
              break;
            case 2:
              debugPrint('💊 Navigation item clicked: 💊 $index 💊 ');
              break;
          }
        },
      ),
    );
  }

  void _navigateToOpenOffers() {
    debugPrint('🦠 🦠 🦠  _navigateToOpenOffers ....');
  }
  void _navigateToAcceptedOffers() {
    debugPrint('🌺 🌺 🌺  _navigateToAcceptedOffers ....');
  }
  void _navigateToClosedOffers() {
    debugPrint('😪 😪 😪  _navigateToClosedOffers ....');
  }
}

class Content {
  String label;
  int number;
  Color textColor, backgroundColor;
  Icon icon;

  Content(
      {this.label,
      this.number,
      this.textColor,
      this.icon,
      this.backgroundColor});
}

class OfferCard extends StatelessWidget {
  final String type;
  OfferCard(this.type);
  @override
  Widget build(BuildContext context) {
    final AnchorBloc bloc = Provider.of<AnchorBloc>(context);
    List<InvoiceOffer> offers = List();
    String label = '';
    Color color = Colors.black;
    switch (type) {
      case 'open':
        offers = bloc.openOffers;
        label = 'Open Offers';
        color = Colors.teal;
        break;
      case 'accepted':
        offers = bloc.acceptedOffers;
        label = 'Accepted Offers';
        break;
      case 'closed':
        offers = bloc.closedOffers;
        label = 'Closed Offers';
        color = Colors.grey;
        break;
    }
    return Container(
      width: 300,
      height: 100, color: Colors.brown[100],
      child: Card(
        elevation: 2, color: Colors.brown[50],
        child: Center(
          child: Container(
            child: Column(
              children: <Widget>[
                SizedBox(height: 44,),
                Text(
                  '${getFormattedNumber(346500, context)}',
                  style: TextStyle(
                      fontFamily: GoogleFonts.raleway().toString(),
                      fontWeight: FontWeight.w900, color: color,
                      fontSize: 30),
                ),
                SizedBox(
                  height: 16,
                ),
                Text(label),
                Text('03 Feb 2020 10:38', style: Styles.blueSmall,),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
