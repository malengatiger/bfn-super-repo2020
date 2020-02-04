import 'package:anchor/ui/trade_matrix_list.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/net_util.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:bfnlibrary/util/snack.dart';
import 'package:flutter/material.dart';

class AnchorEditor extends StatefulWidget {
  final Anchor anchor;

  const AnchorEditor({Key key, this.anchor}) : super(key: key);

  @override
  _AnchorEditorState createState() => _AnchorEditorState();
}

class _AnchorEditorState extends State<AnchorEditor> {
  final _formKey = GlobalKey<FormState>();
  var nameEditor = TextEditingController();
  var emailEditor = TextEditingController();
  var cellphoneEditor = TextEditingController();
  var minInvoiceEditor = TextEditingController();
  var maxInvoiceEditor = TextEditingController();
  var tradeFreqEditor = TextEditingController();
  var maxInvestmentEditor = TextEditingController();
  var passwordEditor = TextEditingController();
  var defaultDiscEditor = TextEditingController();

  @override
  @override
  initState() {
    super.initState();
    if (widget.anchor != null) {
      debugPrint('😝 😝 initializing form with anchor details 😝 ${widget.anchor.toJson()}  😝 ');
      nameEditor.text = widget.anchor.name;
      emailEditor.text = widget.anchor.email;
      cellphoneEditor.text = widget.anchor.cellphone;
      minInvoiceEditor.text = widget.anchor.minimumInvoiceAmount.toString();
      maxInvoiceEditor.text = widget.anchor.maximumInvoiceAmount.toString();
      maxInvestmentEditor.text = widget.anchor.maximumInvestment.toString();
      tradeFreqEditor.text = widget.anchor.tradeFrequencyInMinutes.toString();
      defaultDiscEditor.text = widget.anchor.defaultOfferDiscount.toString();
      passwordEditor.text = widget.anchor.password;
    } else {
      //todo - remove after dev
      nameEditor.text = 'AnchorInvestor';
      emailEditor.text = 'anchor1@bfn.com';
      cellphoneEditor.text = '+27710441887';
      minInvoiceEditor.text = '25000.00';
      maxInvoiceEditor.text = '350000.00';
      maxInvestmentEditor.text = '100000000.00';
      tradeFreqEditor.text = '120';
      defaultDiscEditor.text = '6.4';
      passwordEditor.text = 'kktiger3';
    }
    _checkAnchorExists();
  }
  _checkAnchorExists() async {
    anchor = await Prefs.getAnchor();
    if (anchor != null) {
      nameEditor.text = anchor.name;
      emailEditor.text = anchor.email;
      cellphoneEditor.text = anchor.cellphone;
      minInvoiceEditor.text = anchor.minimumInvoiceAmount.toString();
      maxInvoiceEditor.text = anchor.maximumInvoiceAmount.toString();
      maxInvestmentEditor.text = anchor.maximumInvestment.toString();
      tradeFreqEditor.text = anchor.tradeFrequencyInMinutes.toString();
      defaultDiscEditor.text = anchor.defaultOfferDiscount.toString();
      passwordEditor.text = anchor.password;
      setState(() {

      });
    }
  }
  var _key = GlobalKey<ScaffoldState>();
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        return Future.value(false);
      },
      child: Scaffold(
        key: _key,
        appBar: AppBar(
          leading: Container(),
          title: Text('BFN Anchor Editor'),
          actions: <Widget>[
           IconButton(icon: Icon(Icons.cancel), onPressed: _cancel,)
          ],
        ),
        backgroundColor: Colors.brown[50],
        body: isBusy? Center(
          child: Container(
            width: 200, height: 200,
            child: CircularProgressIndicator(
              strokeWidth: 16,
              backgroundColor: Colors.red,
            ),
          ),
        ) : ListView(
          children: <Widget>[
            Form(
                key: _formKey,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(children: <Widget>[
                    TextFormField(
                      controller: nameEditor,
                      keyboardType: TextInputType.text,
                      style: Styles.blackBoldMedium,
                      decoration: InputDecoration(
                        labelText: 'Anchor Name',
                        hintText: 'Enter Anchor Name',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Anchor Name';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: emailEditor,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        labelText: 'Email',
                        hintText: 'Enter Email',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Anchor Email address';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: cellphoneEditor,
                      keyboardType: TextInputType.phone,
                      decoration: InputDecoration(
                        labelText: 'Cellphone',
                        hintText: 'Enter Cellphone with country code prefix',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Anchor cellphone with country code prefix';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: minInvoiceEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: 'Minimum Invoice Amount',
                        hintText: 'Enter Minimum Invoice Amount',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Minimum Invoice Amount';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: maxInvoiceEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: 'Maximum Invoice Amount',
                        hintText: 'Enter Maximum Invoice Amount',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Maximum Invoice Amount';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: maxInvestmentEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: 'Maximum Investment Amount',
                        hintText: 'Enter Maximum Investment Amount',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Maximum Investment Amount';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: defaultDiscEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: true),
                      decoration: InputDecoration(
                        labelText: 'Default Discount',
                        hintText: 'Enter Default Discount Percentage',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Default Discount Percentage, eg 4.5';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: tradeFreqEditor,
                      keyboardType:
                      TextInputType.numberWithOptions(decimal: false),
                      decoration: InputDecoration(
                        labelText: 'Trade Frequency in Minutes',
                        hintText: 'Enter Trade Frequency in Minutes',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Trade Frequency in Minutes';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: passwordEditor,
                      keyboardType:
                      TextInputType.text,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        hintText: 'Enter Password',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter Password';
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
                          _checkIfMatricesNeeded();
                        } else {
                          debugPrint('🍎 🍎 Form validation says No Way!');
                        }
                      },
                      child: Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: Text(
                          'Add Trade Matrices',
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
  var isBusy = false;
  Anchor anchor;
  void _checkIfMatricesNeeded() async {
    debugPrint('🥏 🥏 🥏 Creating anchor ...');
    var mAnchor = Anchor(
      name: nameEditor.text,
      email: emailEditor.text,
      cellphone: cellphoneEditor.text,
      password: passwordEditor.text,
      minimumInvoiceAmount: double.parse(minInvoiceEditor.text),
      maximumInvoiceAmount: double.parse(maxInvoiceEditor.text),
      maximumInvestment: double.parse(maxInvestmentEditor.text),
      tradeFrequencyInMinutes: int.parse(tradeFreqEditor.text),
      defaultOfferDiscount: double.parse(defaultDiscEditor.text),
      tradeMatrices: anchor == null? List() : anchor.tradeMatrices,
    );
    if (anchor != null) {
      mAnchor.accountId = anchor.accountId;
    }
    anchor = mAnchor;
    await Prefs.saveAnchor(mAnchor);
    _displayDialog(mAnchor);
//
  }

  void _cancel() {
    if (widget.anchor == null) {
      return;
    }
    if (widget.anchor.accountId != null) {
      debugPrint('🍊 Cancelling ......');
      Navigator.pop(context);
    }
    debugPrint('🎽 🎽 Cancel ignored ....');
  }
  void _startList(Anchor anchor) async {
    await Navigator.push(context, SlideRightRoute(
      widget: TradeMatrixList(anchor)
    ));
    Navigator.pop(context);

  }
  _submit(Anchor anchor) async {
    try {
      if (anchor.accountId == null) {
        var res = await Net.createAnchor(anchor);
        await Prefs.saveAnchor(res);
        debugPrint('☘️ ☘️ ☘️ Looks like we good with 🌼 Anchor 🌼 creation');
        debugPrint('Anchor Result : 🌼 🌼 🌼 ${res.toJson()} 🌼 🌼 🌼');
        Navigator.pop(context, res);
      } else {
        var res = await Net.updateAnchor(anchor);
        await Prefs.saveAnchor(res);
        debugPrint('☘️ ☘️ ☘️ Looks like we good with 🎈Anchor 🎈 update 🎈');
        debugPrint('Anchor Result : 🎈🎈🎈 ${res.toJson()} 🎈🎈🎈');
      }

    } catch (e) {
      debugPrint('👿 👿 👿 👿 Hey Jose, we gotta a problem: $e');
    }
  }
  _displayDialog(Anchor anchor) {
    showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Add Trade Matrices'),
            content: Container(
              height: 200,
              child: Column(
                children: <Widget>[
                  Text('Trade Matrices help you manage automated trading for invoices. \nThey enable fine-grained control of the amount offered during automated trades. Without them, all your offers carry a default discount.'),
                ],
              ),
            ),
            actions: <Widget>[
              FlatButton(
                onPressed: () {
                  Navigator.pop(context);
                  _submit(anchor);
                },
                child: Text(
                  'Submit Without Matrices',
                  style: Styles.blueBoldSmall,
                ),
              ),
              FlatButton(
                onPressed: () {
                  Navigator.pop(context);
                 _startList(anchor);
                },
                child: Text(
                  'Add Matrices',
                  style: Styles.pinkBoldSmall,
                ),
              ),
            ],
          );
        });
  }

}
