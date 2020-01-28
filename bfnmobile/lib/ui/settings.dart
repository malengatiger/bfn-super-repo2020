import 'package:bfnlibrary/data/account.dart';
import 'package:bfnlibrary/data/profile.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/net.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:bfnlibrary/util/snack.dart';
import 'package:bfnmobile/main.dart';
import 'package:flutter/material.dart';

class Settings extends StatefulWidget {
  final AccountInfo account;

  Settings(this.account);

  @override
  _SettingsState createState() => _SettingsState();
}

class _SettingsState extends State<Settings> implements SnackBarListener {
  TextEditingController _defaultDiscountController = TextEditingController();
  TextEditingController _maximumDiscountController = TextEditingController();
  TextEditingController _minInvoiceController = TextEditingController();
  TextEditingController _maxInvoiceController = TextEditingController();
  TextEditingController _totalInvoiceController = TextEditingController();

  SupplierProfile _supplierProfile;
  InvestorProfile _investorProfile;
  GlobalKey<ScaffoldState> _key = GlobalKey();
  GlobalKey<FormState> _defaultDiscountKey = GlobalKey();
  GlobalKey<FormState> _formKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    _getExistingProfiles();
  }

  void _getExistingProfiles() async {
    _supplierProfile = await Net.getSupplierProfile(widget.account.identifier);
    _investorProfile = await Net.getInvestorProfile(widget.account.identifier);

    if (_supplierProfile != null) {
      _maximumDiscountController = TextEditingController(
          text: _supplierProfile.maximumDiscount.toString());
    }
    if (_investorProfile != null) {
      _minInvoiceController = TextEditingController(
          text: _investorProfile.minimumInvoiceAmount.toString());
      _maxInvoiceController = TextEditingController(
          text: _investorProfile.maximumInvoiceAmount.toString());
      _totalInvoiceController = TextEditingController(
          text: _investorProfile.totalInvestment.toString());
      _defaultDiscountController = TextEditingController(
          text: _investorProfile.defaultDiscount.toString());
    }
    setState(() {});
  }

  Future _createSupplier() async {
    _supplierProfile = SupplierProfile(
        issuedBy: "me",
        maximumDiscount: maximumDiscount,
        date: DateTime.now().toIso8601String(),
        accountId: widget.account.identifier);
    var result = await Net.createSupplierProfile(_supplierProfile);
    print('🍎 🍎 🍎 Result from _createInvestorProfile: 🍎 $result');
  }

  Future _createInvestorProfile() async {
    _investorProfile = InvestorProfile(
        issuedBy: "me",
        accountId: widget.account.identifier,
        date: DateTime.now().toIso8601String(),
        defaultDiscount: defaultDiscount,
        minimumInvoiceAmount: minimumInvoiceAmt,
        maximumInvoiceAmount: maximumInvoiceAmt);
    var result = await Net.createInvestorProfile(_investorProfile);
    print('🍊 🍊 🍊 Result from _createInvestorProfile: 🍊 $result');
  }

  void _createProfiles() async {
    setState(() {
      isBusy = true;
    });
    try {
      await _createSupplier();
      await _createInvestorProfile();

      setState(() {
        isBusy = false;
      });
      AppSnackbar.showSnackbarWithAction(
          scaffoldKey: _key,
          message: "Profile created OK",
          textColor: Colors.greenAccent,
          backgroundColor: Colors.black,
          actionLabel: 'Done!',
          listener: this);
    } catch (e) {
      print(e);
      setState(() {
        isBusy = false;
      });
    }
  }

  bool isBusy = false;
  double defaultDiscount,
      maximumDiscount,
      minimumInvoiceAmt,
      maximumInvoiceAmt,
      totalInvestmentAmt;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text("Profile Settings"),
        bottom: PreferredSize(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: <Widget>[
                  Text(
                    widget.account.name,
                    style: Styles.blackBoldMedium,
                  ),
                  SizedBox(
                    height: 12,
                  ),
                  Text(
                    'Settings to control how BFN will help you buy and sell invoices on the platform ',
                    style: Styles.whiteSmall,
                  ),
                  SizedBox(
                    height: 12,
                  ),
                ],
              ),
            ),
            preferredSize: Size.fromHeight(100)),
      ),
//      backgroundColor: Colors.brown[100],
      body: isBusy
          ? Center(
              child: Container(
                width: 100,
                height: 100,
                child: CircularProgressIndicator(
                  strokeWidth: 12,
                  backgroundColor: Colors.pink,
                ),
              ),
            )
          : Padding(
              padding: const EdgeInsets.only(left: 20, right: 20, top: 8),
              child: ListView(
                children: <Widget>[
                  Form(
                      key: _formKey,
                      child: Column(
                        children: <Widget>[
                          Text(
                            'When SELLING invoices, the Maximum Discount (Percentage) To Accept from Investor',
                            style: Styles.blackBoldSmall,
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          TextFormField(
                            controller: _maximumDiscountController,
                            style: Styles.blueBoldMedium,
                            keyboardType: TextInputType.numberWithOptions(
                                signed: false, decimal: true),
                            decoration: new InputDecoration(
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.greenAccent, width: 5.0),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.grey, width: 2.0),
                                ),
                                hintText: '0.00',
                                labelText: 'Maximum Discount To Accept'),
                            validator: (value) {
                              if (value.isEmpty) {
                                return 'Please enter Maximum Discount To Accept when you sell invoices';
                              }
                              if (value == '0.0') {
                                return 'Please enter Maximum Discount To Accept when you sell invoices';
                              }
                              maximumDiscount = double.parse(value);
                              return null;
                            },
                          ),
                          SizedBox(
                            height: 40,
                          ),
                          SizedBox(
                            height: 20,
                          ),
                          Text(
                            'When BUYING invoices, the Default Discount (Percentage) to offer for Invoice',
                            style: Styles.blackBoldSmall,
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          TextFormField(
                            controller: _defaultDiscountController,
                            style: Styles.pinkBoldMedium,
                            keyboardType: TextInputType.numberWithOptions(
                                signed: false, decimal: true),
                            decoration: new InputDecoration(
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.greenAccent, width: 5.0),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.grey, width: 2.0),
                                ),
                                hintText: '0.00',
                                labelText: 'Default Discount Required'),
                            validator: (value) {
                              if (value.isEmpty) {
                                return 'Please enter Default Discount Required when you buy invoices';
                              }
                              if (value == '0.0') {
                                return 'Please enter Default Discount Requiredwhen you buy invoices';
                              }
                              defaultDiscount = double.parse(value);
                              return null;
                            },
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          Text(
                            'When BUYING invoices, the Minimum Invoice Amount you require',
                            style: Styles.blackBoldSmall,
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          TextFormField(
                            controller: _minInvoiceController,
                            style: Styles.blueBoldMedium,
                            keyboardType: TextInputType.numberWithOptions(
                                signed: false, decimal: true),
                            decoration: new InputDecoration(
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.greenAccent, width: 5.0),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.grey, width: 2.0),
                                ),
                                hintText: '0.00',
                                labelText: 'Minimum Invoice Amount'),
                            validator: (value) {
                              if (value.isEmpty) {
                                return 'Please enter Minimum Invoice Amount required when you BUY invoices';
                              }
                              minimumInvoiceAmt = double.parse(value);
                              return null;
                            },
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          Text(
                            'When BUYING invoices, the Maximum Invoice Amount you will invest in',
                            style: Styles.blackBoldSmall,
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          TextFormField(
                            controller: _maxInvoiceController,
                            style: Styles.blueBoldMedium,
                            keyboardType: TextInputType.numberWithOptions(
                                signed: false, decimal: true),
                            decoration: new InputDecoration(
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.greenAccent, width: 5.0),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.grey, width: 2.0),
                                ),
                                hintText: '0.00',
                                labelText: 'Maximum Invoice Amount'),
                            validator: (value) {
                              if (value.isEmpty) {
                                return 'Please enter Maximum Invoice Amount required when you BUY invoices';
                              }
                              maximumInvoiceAmt = double.parse(value);
                              return null;
                            },
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          Text(
                            'When making offers for invoices, the Total Investment Amount for all your offers',
                            style: Styles.blackBoldSmall,
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          TextFormField(
                            controller: _totalInvoiceController,
                            keyboardType: TextInputType.numberWithOptions(
                                signed: false, decimal: true),
                            style: Styles.blackBoldMedium,
                            decoration: new InputDecoration(
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.greenAccent, width: 5.0),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Colors.grey, width: 2.0),
                                ),
                                hintText: '0.00',
                                labelText: 'Total Investment Amount'),
                            validator: (value) {
                              if (value.isEmpty) {
                                return 'Please enter Total Investment Amount required when you BUY invoices';
                              }
                              totalInvestmentAmt = double.parse(value);
                              return null;
                            },
                          ),
                          SizedBox(
                            height: 20,
                          ),
                          RaisedButton(
                            elevation: 8,
                            onPressed: () {
                              // Validate returns true if the form is valid, otherwise false.
                              if (_formKey.currentState.validate()) {
                                _createProfiles();
                              }
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Text(
                                'Create Profile',
                                style: Styles.whiteMedium,
                              ),
                            ),
                          ),
                        ],
                      )),
                ],
              ),
            ),
    );
  }

  @override
  onActionPressed(int action) {
    Navigator.pop(context);
    Navigator.push(context, SlideRightRoute(widget: ControllerPage()));
  }
}
