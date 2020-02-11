import 'package:anchor/bloc/anchor_bloc.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/snack.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class SignIn extends StatefulWidget {
  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  final _formKey = GlobalKey<FormState>();
  var emailEditor = TextEditingController();
  var passwordEditor = TextEditingController();
  var bloc = AnchorBloc();
  @override
  @override
  initState() {
    super.initState();
    emailEditor.text = "anchor1@bfn.com";
    passwordEditor.text = "bfnanchor33";
  }

  AnchorBloc _anchorBloc;
  var _key = GlobalKey<ScaffoldState>();
  Widget build(BuildContext context) {
    final AnchorBloc bloc = Provider.of<AnchorBloc>(context);
    _anchorBloc = bloc;
    return WillPopScope(
      onWillPop: () async {
        return Future.value(false);
      },
      child: Scaffold(
        key: _key,
        appBar: AppBar(
          leading: Container(),
          title: Text('BFN Anchor',
              style: TextStyle(
                  fontFamily: GoogleFonts.acme().toString(),
                  fontSize: 30,
                  fontWeight: FontWeight.w900)),
          backgroundColor: Colors.deepOrange[400],
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.refresh),
              onPressed: () {
                debugPrint('Refresh nodes ...');
                bloc.initialize();
              },
            )
          ],
          bottom: PreferredSize(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  children: <Widget>[
                    Text(
                      'This sign in enables you to connect with a Node that has already been created and started for you on '
                      'the Business Finance Network. 🍎 Please use the credentials that were provided to you when you signed up to be a member of the network',
                      style: Styles.whiteSmall,
                    ),
                    SizedBox(
                      height: 24,
                    ),
                  ],
                ),
              ),
              preferredSize: Size.fromHeight(200)),
        ),
        backgroundColor: Colors.brown[50],
        body: isBusy
            ? Center(
                child: Container(
                  width: 80,
                  height: 80,
                  child: CircularProgressIndicator(
                    strokeWidth: 16,
                    backgroundColor: Colors.indigo,
                  ),
                ),
              )
            : ListView(
                children: <Widget>[
                  Form(
                      key: _formKey,
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(children: <Widget>[
                          SizedBox(
                            height: 48,
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
                            controller: passwordEditor,
                            keyboardType: TextInputType.text,
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
                            color: Colors.indigo,
                            elevation: 8,
                            onPressed: () {
                              if (_formKey.currentState.validate()) {
                                _submit();
                              } else {
                                debugPrint(
                                    '🍎 🍎 Form validation says No Way!');
                              }
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(20.0),
                              child: Text(
                                'Sign in to BFN',
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

  _submit() async {
    setState(() {
      isBusy = true;
    });
    try {
      var res = await bloc.anchorSignIn(emailEditor.text, passwordEditor.text);
      Navigator.pop(context, res);
    } catch (e) {
      debugPrint('👿 👿 👿 👿 Hey Jose, we gotta a problem: $e');
      setState(() {
        isBusy = false;
      });
      AppSnackbar.showErrorSnackbar(
          scaffoldKey: _key, message: "Anchor sign in failed", actionLabel: "");
    }
  }
}
