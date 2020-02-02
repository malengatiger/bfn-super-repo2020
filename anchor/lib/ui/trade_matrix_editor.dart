import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:flutter/material.dart';

class TradeMatrixEditor extends StatefulWidget {
  final Anchor anchor;

  TradeMatrixEditor(this.anchor);

  @override
  _TradeMatrixEditorState createState() => _TradeMatrixEditorState();
}

class _TradeMatrixEditorState extends State<TradeMatrixEditor> {
  final _formKey = GlobalKey<FormState>();
  var _key = GlobalKey<ScaffoldState>();

  var idEditor = TextEditingController();
  var startAmountEditor = TextEditingController();
  var endAmountEditor = TextEditingController();
  var ageEditor = TextEditingController();
  var discountEditor = TextEditingController();

  @override
  void initState() {
    super.initState();
    debugPrint('........ 🍐 TradeMatrixEditor initState ... 🍐 ');
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        return Future.value(false);
      },
      child: Scaffold(
        key: _key,
        appBar: AppBar(
          leading: Container(),
          title: Text('Trade Matrix Editor'),
          backgroundColor: Colors.indigo[300],
          bottom: PreferredSize(preferredSize: Size.fromHeight(120),
          child: Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  RaisedButton(
                    elevation: 4,
                    color: Colors.indigo,
                    child: Text('Done'),
                    onPressed: () {
                      Navigator.pop(context, widget.anchor);
                    },
                  ),
                  Text('Number of Trade Matrices'),
                  SizedBox(width: 16,),
                  Text('${widget.anchor.tradeMatrices.length}', style: Styles.whiteBoldLarge,),
                  SizedBox(width: 20,)
                ],
              ),
              SizedBox(height: 20,),
            ],
          ),),
        ),
        backgroundColor: Colors.brown[50],
        body: ListView(
          children: <Widget>[
            Form(
                key: _formKey,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(children: <Widget>[
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: startAmountEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: 'Start Invoice Amount',
                        hintText: 'Enter Starting Invoice Amount',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Starting Invoice Amount';
                        }
                        if (double.parse(value) < 2000) {
                          return 'Please enter Starting Invoice Amount > 2000';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: endAmountEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: 'End Invoice Amount',
                        hintText: 'Enter End Invoice Amount',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Ending Invoice Amount';
                        }
                        if (double.parse(value) > 20000000.00) {
                          return 'Please enter Ending Invoice Amount < 20000000.00';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: discountEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: 'Discount',
                        hintText: 'Discount',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Discount';
                        }
                        if (double.parse(value) <= 1.0) {
                          return 'Please enter Starting Discount > 1';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: ageEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: 'Maximum Invoice Age in Days',
                        hintText: 'Enter Maximum Invoice Age in Days',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Maximum Invoice Age in Days, eg 60';
                        }
                        if (double.parse(value) <= 7) {
                          return 'Please enter Maximum Invoice Age > 7';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 24,
                    ),
                    RaisedButton(
                      color: Colors.pink,
                      elevation: 8,
                      onPressed: () {
                        if (_formKey.currentState.validate()) {
                          addTradeMatrix();
                        } else {
                          debugPrint('🍎 🍎 Form validation says No Way!');
                        }
                      },
                      child: Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: Text(
                          'Add Trade Matrix',
                          style: Styles.whiteSmall,
                        ),
                      ),
                    )
                  ]),
                )),
          ],
        ),
      ),
    );
  }

  void addTradeMatrix() async {
    var matrix = TradeMatrix(
      startInvoiceAmount: double.parse(startAmountEditor.text),
      endInvoiceAmount: double.parse(endAmountEditor.text),
      offerDiscount: double.parse(discountEditor.text),
      maximumInvoiceAgeInDays: int.parse(ageEditor.text),
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      date: DateTime.now().toUtc().toIso8601String()
    );
    setState(() {
      widget.anchor.tradeMatrices.add(matrix);
    });
    await Prefs.saveAnchor(widget.anchor);
    debugPrint('🍡🍡 Anchor; check trade matrices: 🥨 ${widget.anchor.tradeMatrices.length} 🥨 ');
  }
}
