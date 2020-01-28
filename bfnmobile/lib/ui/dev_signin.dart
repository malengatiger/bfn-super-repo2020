import 'package:bfnlibrary/data/account.dart';
import 'package:bfnlibrary/data/node_info.dart';
import 'package:bfnlibrary/data/user.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/net.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:bfnlibrary/util/slide_right.dart';
import 'package:bfnlibrary/util/snack.dart';
import 'package:bfnmobile/ui/settings.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DevSignIn extends StatefulWidget {
  @override
  _DevSignInState createState() => _DevSignInState();
}

class _DevSignInState extends State<DevSignIn> {
  @override
  initState() {
    super.initState();
    _getData();
  }

  final _key = GlobalKey<ScaffoldState>();
  List<UserDTO> _users = List();
  FirebaseAuth auth = FirebaseAuth.instance;
  List<NodeInfo> nodes = List();
  List<DropdownMenuItem<NodeInfo>> items = List();
  bool isBusy = false;
  _getData() async {
    setState(() {
      isBusy = true;
    });
    await _getNodes();
    setState(() {
      isBusy = false;
    });
  }

  _getUsers() async {
    setState(() {
      isBusy = true;
    });
    try {
      _users = await Net.getUsers();
      _filter();
      print(
          '_DevSignInState  🍊  🍊  🍊  Users found: ${_users.length} 🍊  🍊  🍊 ');
      setState(() {
        isBusy = false;
      });
    } catch (e) {
      AppSnackbar.showErrorSnackbar(
          scaffoldKey: _key, message: 'We have a problem', actionLabel: '');
    }
  }

  _getNodes() async {
    nodes = await Net.listNodes();
    print('🌸 🌸 🌸 nodes found: ${nodes.length}');
    nodes.forEach((n) {
      if (n != null) {
        if (n.webAPIUrl != null) {
          if (!n.addresses.elementAt(0).contains('Regulator')) {
            print('🌸 🌸 🌸 add to dropdown ${n.webAPIUrl}');
            items.add(DropdownMenuItem(
                value: n,
                child: Text(
                  n.addresses.elementAt(0),
                  style: Styles.blackBoldSmall,
                )));
          }
        } else {
          print(
              ' 👿  👿  👿 ignore possible notary node - no webAPIUrl available');
        }
      }
    });
    print('🍊 ..................dropDownItems: ${items.length}');
  }

  _signIn(UserDTO user) async {
    setState(() {
      isBusy = true;
    });
    AccountInfo m = await Net.getAccount(user.uid);
    if (m == null) {
      AppSnackbar.showErrorSnackbar(
          scaffoldKey: _key, message: 'Account does not exist');
      return;
    }
    await Prefs.saveAccount(m);
    var email = DotEnv().env['email'];
    var pass = DotEnv().env['password'];
    AuthResult authResult =
        await auth.signInWithEmailAndPassword(email: email, password: pass);
    if (authResult.user != null) {
      print(
          '🔑 🔑 🔑 🔑 🔑 ${authResult.user.displayName} 🔑 has logged in, starting Profile settings');
      Navigator.push(
          context,
          SlideRightRoute(
            widget: Settings(m),
          ));
    } else {
      AppSnackbar.showErrorSnackbar(
          scaffoldKey: _key, message: 'User does not exist on Firebase auth');
    }
  }

  _filter() {
    List<UserDTO> mList = List();
    _users.forEach((u) {
      if (u.email.contains("aubrey33@aftarobot.com") ||
          u.email.contains("aubrey@gmail.com") ||
          u.email.contains("aubrey@bfn.com")) {
        print('🔆 🔆 🔆 IGNORED - ${u.toJson()}');
      } else {
        mList.add(u);
      }
    });
    _users = mList;
    _users.sort((a, b) => a.name.compareTo(b.name));
  }

  NodeInfo selectedNode;
  void _dropDownChanged(NodeInfo value) async {
    selectedNode = value;
    print('🌸 🌸 🌸 Selected node: ${selectedNode.toJson()}');
    setState(() {});
    await Prefs.saveNode(selectedNode);
    _getUsers();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      appBar: AppBar(
        title: Text('BFN Login Helper'),
        backgroundColor: Colors.teal[400],
        bottom: PreferredSize(
            child: Column(children: <Widget>[
              SizedBox(
                height: 8,
              ),
              DropdownButton(
                  items: items,
                  hint: Text('Select Network Node'),
                  onChanged: _dropDownChanged),
              SizedBox(
                height: 28,
              ),
              Text(
                selectedNode == null ? '' : selectedNode.addresses.elementAt(0),
                style: Styles.whiteBoldSmall,
              ),
              SizedBox(
                height: 16,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  Text('Number of Accounts'),
                  SizedBox(
                    width: 12,
                  ),
                  Text(
                    '${_users.length}',
                    style: Styles.whiteBoldMedium,
                  ),
                  SizedBox(
                    width: 40,
                  ),
                ],
              ),
              SizedBox(
                height: 20,
              ),
            ]),
            preferredSize: Size.fromHeight(140)),
      ),
      body: isBusy
          ? Center()
          : ListView.builder(
              itemCount: _users.length,
              itemBuilder: (context, index) {
                UserDTO user = _users.elementAt(index);
                return Padding(
                  padding: const EdgeInsets.only(left: 12, right: 12, top: 8),
                  child: Card(
                    elevation: 2,
                    child: GestureDetector(
                      onTap: () {
                        _signIn(user);
                      },
                      child: ListTile(
                        leading: Icon(
                          Icons.person,
                          color: getRandomColor(),
                        ),
                        title: Text(
                          user.name == null ? 'name WTF' : user.name,
                          style: Styles.blackBoldSmall,
                        ),
                        subtitle:
                            Text(user.email == null ? 'email wtf' : user.email),
                      ),
                    ),
                  ),
                );
              }),
    );
  }
}
