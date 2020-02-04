import 'dart:math';

import 'package:anchor/ui/trade_matrix_editor.dart';
import 'package:anchor/ui/welcome.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/net_util.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:bfnlibrary/util/snack.dart';
import 'package:flutter/material.dart';

class TradeMatrixList extends StatefulWidget {
  final Anchor anchor;

  TradeMatrixList(this.anchor);

  @override
  _TradeMatrixListState createState() => _TradeMatrixListState();
}

class _TradeMatrixListState extends State<TradeMatrixList> {
  @override
  void initState() {
    super.initState();
  }

  _addMatrix() async {
    debugPrint('Navigating to 🌞 🌞 🌞 TradeMatrixEditor 🌞 ');
    var anchor = await Navigator.push(
        context, SlideRightRoute(widget: TradeMatrixEditor(widget.anchor)));
    if (anchor != null && anchor is Anchor) {
      debugPrint('🍊🍊 Anchor returned from editor: 🍊 ${anchor.toJson()} 🍊');
      debugPrint('💠 💠  Anchor in widget: 💠 ${widget.anchor.toJson()} 💠 ');
      setState(() {
        widget.anchor.tradeMatrices = anchor.tradeMatrices;
      });
    }
  }

  var _key = GlobalKey<ScaffoldState>();
 var random = Random(DateTime.now().millisecondsSinceEpoch);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text(widget.anchor.name),
        actions: <Widget>[
          IconButton(
            onPressed: _addMatrix,
            icon: Icon(Icons.add),
          )
        ],
        backgroundColor: Colors.pink[400],
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(200),
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              children: <Widget>[
                Text(
                  'These matrices will control the offer discount made during automated invoice trades',
                  style: Styles.whiteSmall,
                ),
                SizedBox(
                  height: 28,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    RaisedButton(
                      onPressed: _saveAnchor,
                      elevation: 8,
                      color: widget.anchor.accountId == null? Colors.indigo : Colors.black,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            widget.anchor.accountId == null? 'Save Anchor': 'Update Anchor',
                            style: Styles.whiteSmall,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      width: 16,
                    ),
                    Text('Matrices'),
                    SizedBox(
                      width: 16,
                    ),
                    Text(
                      '${widget.anchor.tradeMatrices.length}',
                      style: Styles.whiteBoldLarge,
                    ),
                  ],
                ),
                SizedBox(
                  height: 16,
                ),
              ],
            ),
          ),
        ),
      ),
      backgroundColor: Colors.brown[50],
      body: widget.anchor.tradeMatrices.isEmpty
          ? Center(
              child: Container(
                child: Text(
                  'No matrices yet\nPress + to add one',
                  style: Styles.blackBoldMedium,
                ),
              ),
            )
          : ListView.builder(
              itemCount: widget.anchor.tradeMatrices.length,
              itemBuilder: (context, index) {
                debugPrint('🧀  🧀 index is : $index  🧀 ');
                return Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: Dismissible(
                    background: Container(color: Colors.pink[300]),
                    key: Key(DateTime.now().microsecondsSinceEpoch.toString()),
                    direction: DismissDirection.endToStart,
                    onDismissed: (direction) {
                      setState(() {
                        widget.anchor.tradeMatrices.removeAt(index);
                      });
                    },
                    child: Card(
                      elevation: 2,
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Column(
                          children: <Widget>[
                            Row(
                              children: <Widget>[
                                Text(
                                  'Start Invoice Amount',
                                  style: Styles.greyLabelSmall,
                                ),
                                SizedBox(
                                  width: 8,
                                ),
                                Text(
                                  '${widget.anchor.tradeMatrices.elementAt(index).startInvoiceAmount}',
                                  style: Styles.blackBoldSmall,
                                ),
                              ],
                            ),
                            Row(
                              children: <Widget>[
                                Text(
                                  'End Invoice Amount',
                                  style: Styles.greyLabelSmall,
                                ),
                                SizedBox(
                                  width: 8,
                                ),
                                Text(
                                  '${widget.anchor.tradeMatrices.elementAt(index).endInvoiceAmount}',
                                  style: Styles.blackBoldSmall,
                                ),
                              ],
                            ),
                            Row(
                              children: <Widget>[
                                Text(
                                  'Offer Discount',
                                  style: Styles.greyLabelSmall,
                                ),
                                SizedBox(
                                  width: 8,
                                ),
                                Text(
                                  '${widget.anchor.tradeMatrices.elementAt(index).offerDiscount}',
                                  style: Styles.pinkBoldSmall,
                                ),
                              ],
                            ),
                            Row(
                              children: <Widget>[
                                Text(
                                  'Maximum Invoice Age',
                                  style: Styles.greyLabelSmall,
                                ),
                                SizedBox(
                                  width: 8,
                                ),
                                Text(
                                  '${widget.anchor.tradeMatrices.elementAt(index).maximumInvoiceAgeInDays}',
                                  style: Styles.blackBoldSmall,
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                );
              }),
    );
  }
  _saveAnchor() async {
    debugPrint(
        '... 🥨  🥨 about to save/update the Anchor! ....  🧀  🧀 ${widget.anchor.toJson()}  🧀  🧀 ');
    try {
      if (widget.anchor.accountId == null) {
        var res = await Net.createAnchor(widget.anchor);
        await Prefs.saveAnchor(res);
        debugPrint('☘️ ☘️ ☘️ Looks like we good with 🌼 Anchor 🌼 creation');
        debugPrint('Anchor Result : 🌼 🌼 🌼 ${res.toJson()} 🌼 🌼 🌼');
        Navigator.pop(context, res);
        Navigator.push(context, SlideRightRoute(
          widget: Welcome(res)
        ));
      } else {
        var res = await Net.updateAnchor(widget.anchor);
        await Prefs.saveAnchor(res);
        debugPrint('☘️ ☘️ ☘️ Looks like we good with 🎈 Anchor 🎈 update 🎈');
        debugPrint('Anchor Result : 🎈🎈🎈 ${res.toJson()} 🎈🎈🎈');
        Navigator.pop(context, res);
        Navigator.pop(context, res);
      }
    } catch (e) {
      debugPrint('👿 👿 👿 👿 Hey Jose, we gotta a problem: 👿 👿 $e');
      AppSnackbar.showSnackbarWithAction(
          scaffoldKey: _key,
          message: "Save/Update Anchor failed : $e",
          textColor: Colors.white,
          actionLabel: '',
          action: 0,
          backgroundColor: Colors.pink[900]);
    }
  }
}
