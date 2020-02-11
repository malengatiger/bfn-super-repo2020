import 'dart:convert';

import 'package:bfnlibrary/data/account.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/data/dashboard_data.dart';
import 'package:bfnlibrary/data/fb_user.dart';
import 'package:bfnlibrary/data/invoice.dart';
import 'package:bfnlibrary/data/invoice_offer.dart';
import 'package:bfnlibrary/data/node_info.dart';
import 'package:bfnlibrary/data/profile.dart';
import 'package:bfnlibrary/data/user.dart';
import 'package:bfnlibrary/util/functions.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class Net {
  static Firestore db = Firestore.instance;
  static FirebaseAuth auth = FirebaseAuth.instance;
  static const Map<String, String> headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  };

  static Future _getCachedURL() async {
    var url = await Prefs.getUrl();
    return url;
  }

  static const String BFN = 'bfn/admin/';
  static Future<List<NodeInfo>> getNodesFromFirestore() async {
    var list = List<NodeInfo>();
    print('🍎 🍎 🍎 🍎 🍎 🍎 about to call auth.currentUser ... ');
    var result = await auth.currentUser();
    if (result == null) {
      print(
          '🍎 🍎 🍎 🍎  there is no current auth user ... login with admin 🍎 🍎');
      var email = DotEnv().env['email'];
      var pass = DotEnv().env['password'];
      print(
          '🌸 🌸 🌸 🌸 🌸 ADMIN 🧡 auth for getting nodes from firestore: 🧡🧡 email from .env : 🥏  $email 🥏  pass: $pass 🥏 ');
      var userResult = await auth.signInWithEmailAndPassword(
          email: 'aubrey@bfn.com',
          password: '2a91f706-81c7-47bf-a172-3d36095d5a32');
      print(
          '🍊 🍊 🍊 Logged into Firebase with .env credentials,  🌸 uid: ${userResult.user.uid} ... getting nodes ...');
      list = await _readCurrentNodes(list);
      await auth.signOut();
      print('🍊 🍊 🍊 Logged OUT of Firebase  ${userResult.user.uid} ... ');
    } else {
      print('🍎 🍎 🍎 🍎 about to get nodes from firestore  🍎 🍎');
      list = await _readCurrentNodes(list);
    }
    if (list.isNotEmpty) {
      await Prefs.saveNodes(list);
    }
    return list;
  }

  static Future<String> getNodeUrl() async {
    var m = await _getCachedURL();
    if (m != null) {
      return m;
    }
    var acct = await Prefs.getAccount();
    if (acct == null) {
      throw Exception("Account not available yet");
    }
    var list = await getNodesFromFirestore();
    String url;
    print('  🔆  🔆  🔆 local account:  💚 ${acct.toJson()}');
    list.forEach((node) {
      var host = node.addresses.elementAt(0);
      print('  🔆  🔆  🔆 host of node:  💚 $host');
      if (host == acct.host) {
        url = node.webAPIUrl;
      }
    });
    if (url == null) {
      throw Exception("Url not found");
    }
    Prefs.setUrl(url);
    return url;
  }

  static Future _readCurrentNodes(List<NodeInfo> list) async {
    var snapshot = await db.collection("nodes").getDocuments();
    print(
        '🥏 🥏 🥏 🥏 nodes found on Firestore: 🥏 ${snapshot.documents.length} 🥏 ');
    snapshot.documents.forEach((doc) {
      var data = doc.data;

      var node = NodeInfo.fromJson(data);
      var springBootProfile = DotEnv().env['springBootProfile'];
      if (springBootProfile == null) {
        list.add(node);
        print('🥏 data from Firestore: $data');
      } else {
        if (node.springBootProfile == springBootProfile) {
          list.add(node);
          print('🥏 data from Firestore: $data');
        }
      }
    });
    return list;
  }

  static Future<String> get(String mUrl) async {
    var start = DateTime.now();
    var client = new http.Client();
    var resp = await client
        .get(
      mUrl,
      headers: headers,
    )
        .whenComplete(() {
      client.close();
    });

    var end = DateTime.now();
    debugPrint(
        '🍎 🍊 Net: post  ##################### elapsed: ${end.difference(start).inSeconds} seconds\n\n');
    if (resp.statusCode == 200) {
      debugPrint(
          '🍎 🍊 Net: get: SUCCESS: Network Response Status Code: 🥬  🥬 ${resp.statusCode} 🥬  $mUrl');
      return resp.body;
    } else {
      var msg = ' 👿  Failed status code: ${resp.statusCode} 🥬  $mUrl';
      debugPrint(msg);
      throw Exception(msg);
    }
  }

  static Future post(String mUrl, Map bag) async {
    var start = DateTime.now();
    var client = new http.Client();
    String body;
    if (bag != null) {
      body = json.encode(bag);
    }
    debugPrint('🍊 🍊 🍊 Net: post ... calling with bag: $body');
    var resp = await client
        .post(
      mUrl,
      body: body,
      headers: headers,
    )
        .whenComplete(() {
      debugPrint('🍊 🍊 🍊 Net: post whenComplete ');
      client.close();
    });
    debugPrint(
        '🍎 🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊 Net: post : PRINTING respomse.body from: $mUrl - $body');
    print(resp.body);
    var end = DateTime.now();
    debugPrint(
        '🍎 🍊 Net: post  ##################### elapsed: ${end.difference(start).inSeconds} seconds\n\n');
    if (resp.statusCode == 200) {
      debugPrint(
          '🍎 🍊 Net: post: SUCCESS: Network Response Status Code: 🥬  🥬 ${resp.statusCode} 🥬  $mUrl');
      return resp.body;
    } else {
      var msg = ' 👿  Failed status code: ${resp.statusCode} 🥬  $mUrl';
      debugPrint(resp.body);
      throw Exception(msg);
    }
  }

  static Future<Anchor> updateAnchor(Anchor anchor) async {
    String mx = await buildUrl();
    debugPrint('🌸 CONCATENATED URL: 🌸 $mx' + 'bfn/admin/updateAnchor');
    final response = await post(mx + 'bfn/admin/updateAnchor', anchor.toJson());
    var m = json.decode(response);
    var acct = Anchor.fromJson(m);
    return acct;
  }

  static Future<Anchor> createAnchor(Anchor anchor) async {
    debugPrint('🍊🍊🍊🍊🍊 createAnchor starting the call ...');
    var nodes = await Prefs.getNodes();
    if (nodes == null || nodes.isEmpty) {
      throw Exception("Nodes not found in Preferences");
    }
    NodeInfo node;
    nodes.forEach((m) {
      if (m.addresses[0].contains(anchor.name)) {
        node = m;
      }
    });
    if (node == null) {
      throw Exception("Anchor has no node running");
    }
    await Prefs.saveNode(node);
    String mx = await buildUrl();
    debugPrint('🌸 CONCATENATED URL: 🌸 $mx' + 'bfn/admin/createAnchor');
    final response = await post(mx + 'bfn/admin/createAnchor', anchor.toJson());
    var m = json.decode(response);
    var acct = Anchor.fromJson(m);
    return acct;
  }

  static Future<String> buildUrl() async {
    var node = await Prefs.getNode();
    if (node == null) {
      throw Exception('Node not found in Prefs');
    }
    var mx = '${node.webServerAddress}';
    debugPrint("🍊 🍊 🍊  🌸 🌸 🌸 ${node.toJson()}  🌸 🌸 🌸  🍊 🍊 🍊 ");
    if (node.webServerPort != null || node.webServerPort > 0) {
      mx += ':${node.webServerPort}/';
    } else {
      mx += '/';
    }
    return mx;
  }

  static Future<Anchor> getAnchor(String identifier) async {
    var qs = await db
        .collection("accounts")
        .where("identifier", isEqualTo: identifier)
        .getDocuments();
    AccountInfo acct;
    qs.documents.forEach((doc) {
      acct = AccountInfo.fromJson(doc.data);
    });
    if (acct == null) {
      throw Exception('Account not found on Firestore');
    }
    var nodes = await Prefs.getNodes();
    if (nodes.isEmpty) {
      throw Exception('Nodes not found in Prefs');
    }
    NodeInfo node;
    nodes.forEach((n) {
      if (n.addresses.first.contains(acct.name)) {
        node = n;
      }
    });
    if (node == null) {
      throw Exception('Node cannot be determined from list of ${nodes.length}');
    }
    await Prefs.saveNode(node);
    var bag = {
      "identifier": identifier,
    };
    debugPrint('🍊🍊🍊🍊🍊 getAnchor starting the call ...');
    var url = await buildUrl();
    final response = await get(url + '${BFN}getAnchor?identifier=$identifier');
    var m = json.decode(response);
    var anchor = Anchor.fromJson(m);
    prettyPrint(anchor.toJson(), "🥏 🥏 🥏 🥏 ANCHOR RECEIVED 🍎 ");
    return anchor;
  }

  static Future<AccountInfo> startAccountRegistrationFlow(
      String name, String email, String password, String cellphone) async {
    var bag = {
      "name": name,
      "email": email,
      "password": password,
      "cellphone": cellphone
    };
    debugPrint('🍊🍊🍊🍊🍊 startAccountRegistrationFlow starting the call ...');
    var node = await Prefs.getNode();
    final response =
        await post(node.webAPIUrl + '${BFN}startAccountRegistrationFlow', bag);
    var m = json.decode(response);
    var acct = AccountInfo.fromJson(m);
    return acct;
  }

  static Future<Invoice> startRegisterInvoiceFlow(Invoice invoice) async {
    var node = await Prefs.getNode();
    final response = await post(
        node.webAPIUrl + 'supplier/startRegisterInvoiceFlow', invoice.toJson());
    var m = json.decode(response);
    var acct = Invoice.fromJson(m);
    return acct;
  }

  static Future<String> buyInvoiceOffer(String invoiceId) async {
    var user = await Prefs.getAccount();
    var node = await Prefs.getNode();
    final response = await get(node.webAPIUrl +
        'investor/buyInvoiceOffer?invoiceId=$invoiceId&investorId=${user.identifier}');
    return response;
  }

  static Future<InvoiceOffer> startInvoiceOfferFlow(
      InvoiceOffer invoiceOffer) async {
    var node = await Prefs.getNode();
    final response = await post(
        node.webAPIUrl + 'supplier/startInvoiceOfferFlow',
        invoiceOffer.toJson());
    var m = json.decode(response);
    var acct = InvoiceOffer.fromJson(m);
    return acct;
  }

  static Future<List<AccountInfo>> getAccounts() async {
    var prefix = await getNodeUrl();
    final response = await get(prefix + '${BFN}getAccounts');

    List<AccountInfo> list = List();
    List m = json.decode(response);
    m.forEach((f) {
      list.add(AccountInfo.fromJson(f));
    });
    debugPrint('🍎 🍊 Net: getAccounts: found ${list.length}');
    return list;
  }

  static Future<AccountInfo> getAccount(String accountId) async {
    var node = await Prefs.getNode();
    final response =
        await get(node.webAPIUrl + '${BFN}getAccount?accountId=$accountId');

    AccountInfo acctInfo = AccountInfo.fromJson(json.decode(response));
    debugPrint('🍎 🍊 Net: getAccount: found ${acctInfo.toJson()}');
    return acctInfo;
  }

  static Future<SupplierProfile> getSupplierProfile(String accountId) async {
    var node = await Prefs.getNode();
    final response = await get(
        node.webAPIUrl + '${BFN}getSupplierProfile?accountId=$accountId');

    if (response == null) {
      return null;
    }
    SupplierProfile profile = SupplierProfile.fromJson(json.decode(response));
    debugPrint('🍎 🍊 Net: getSupplierProfile: found ${profile.toJson()}');
    return profile;
  }

  static Future<InvestorProfile> getInvestorProfile(String accountId) async {
    var node = await Prefs.getNode();
    final response = await get(
        node.webAPIUrl + '${BFN}getInvestorProfile?accountId=$accountId');
    if (response == null) {
      return null;
    }
    InvestorProfile profile = InvestorProfile.fromJson(json.decode(response));
    debugPrint('🍎 🍊 Net: getInvestorProfile: found ${profile.toJson()}');
    return profile;
  }

  static Future<String> createInvestorProfile(InvestorProfile profile) async {
    var node = await Prefs.getNode();
    final response = await post(
        node.webAPIUrl + '${BFN}createInvestorProfile', profile.toJson());

    debugPrint('🍎 🍊 Net: createInvestorProfile: $response');
    return response;
  }

  static Future<String> createSupplierProfile(SupplierProfile profile) async {
    var node = await Prefs.getNode();
    final response = await post(
        node.webAPIUrl + '${BFN}createSupplierProfile', profile.toJson());

    debugPrint('🍎 🍊 Net: createSupplierProfile: $response');
    return response;
  }

  static Future<UserRecord> getUser(String email) async {
    var node = await Prefs.getNode();
    String url = node.webAPIUrl + '${BFN}getUser?email=$email';
    ;
    final response = await http.get(url);
    if (response.statusCode == 200) {
      debugPrint(
          '🍎 🍊 Net: getInvoices: Network Response Status Code: 🥬  🥬 ${response.statusCode} 🥬 ');
      if (response.body == null) {
        return null;
      }
      return UserRecord.fromJson(json.decode(response.body));
    } else {
      print(
          ' 👿  Failed : getUser Status Code: 🥬  🥬 ${response.statusCode} 🥬 ');
      return null;
    }
  }

  static Future<List<UserDTO>> getUsers() async {
    var node = await Prefs.getNode();
    String url = node.webAPIUrl + '${BFN}getUsers';
    List<UserDTO> users = List();
    final response = await http.get(url);
    if (response.statusCode == 200) {
      debugPrint(
          '🍎 🍊 Net: getUsers: Network Response Status Code: 🥬  🥬 ${response.statusCode} 🥬 ');
      if (response.body == null) {
        return null;
      }

      List k = json.decode(response.body);
      k.forEach((m) {
        users.add(UserDTO.fromJson(m));
      });
      return users;
    } else {
      print(
          ' 👿  Failed : getUsers Status Code: 🥬  🥬 ${response.statusCode} 🥬 ');
      return null;
    }
  }

  static Future<List<Invoice>> getInvoices(
      {String accountId, bool consumed = false}) async {
    var node = await Prefs.getNode();
    String url;
    if (accountId == null) {
      url = node.webAPIUrl + '${BFN}getInvoiceStates?consumed=$consumed';
    } else {
      url = node.webAPIUrl +
          '${BFN}findInvoicesForSupplier?accountId=$accountId&consumed=$consumed';
    }
    debugPrint(url);
    final response = await get(url);

    List<Invoice> list = List();
    List m = json.decode(response);
    m.forEach((f) {
      list.add(Invoice.fromJson(f));
    });
    debugPrint(
        '🍎 🍊 🍎 🍊 Net: findInvoicesForSupplier: found ${list.length}');
    return list;
  }

  static Future<List<InvoiceOffer>> getSupplierInvoiceOffers(
      {String accountId, bool consumed}) async {
    var node = await Prefs.getNode();
    if (consumed == null) consumed = false;
    String url;
    if (accountId == null) {
      url = node.webAPIUrl + '${BFN}findOffersForSupplier?consumed=$consumed';
    } else {
      url = node.webAPIUrl +
          '${BFN}findOffersForSupplier?accountId=$accountId&consumed=$consumed';
    }
    debugPrint(url);
    final response = await get(url);

    List<InvoiceOffer> list = List();
    List m = json.decode(response);
    m.forEach((f) {
      list.add(InvoiceOffer.fromJson(f));
    });
    debugPrint('🍎 🍊 🍎 🍊 Net: findOffersForInvestor: found ${list.length}');
    return list;
  }

  static Future<List<InvoiceOffer>> getInvestorInvoiceOffers(
      {String accountId, bool consumed}) async {
    var node = await Prefs.getNode();
    if (consumed == null) consumed = false;
    String url;
    if (accountId == null) {
      url = node.webAPIUrl + '${BFN}findOffersForInvestor?consumed=$consumed';
    } else {
      url = node.webAPIUrl +
          '${BFN}findOffersForInvestor?accountId=$accountId&consumed=$consumed';
    }
    debugPrint(url);
    final response = await get(url);

    List<InvoiceOffer> list = List();
    List m = json.decode(response);
    m.forEach((f) {
      list.add(InvoiceOffer.fromJson(f));
    });
    debugPrint('🍎 🍊 🍎 🍊 Net: findOffersForInvestor: found ${list.length}');
    return list;
  }

  static Future<DashboardData> getDashboardData() async {
    var node = await Prefs.getNode();
    String url = node.webAPIUrl + '${BFN}getDashboardData';

    debugPrint(url);
    final response = await get(url);
    var data = DashboardData.fromJson(json.decode(response));
    debugPrint('🍎 🍊 🍎 🍊 Net: getDashboardData: found ${data.toJson()}');
    return data;
  }

  static Future<String> ping() async {
    var node = await Prefs.getNode();
    final response = await http.get(node.webAPIUrl + '${BFN}ping');
    if (response.statusCode == 200) {
      debugPrint(
          '🍎 🍊 Net: ping: Network Response Status Code: 🥬  🥬 ${response.statusCode} 🥬 ');
      return response.body;
    } else {
      throw Exception(' 👿  Failed ping');
    }
  }
//
//  static Future<String> startDemoDataGeneration() async {
//    final response = await http.get(URL + '${BFN}demo');
//
//    if (response.statusCode == 200) {
//      debugPrint(
//          '🍎 🍊 Net: startDemoDataGeneration: Network Response Status Code: 🥬  🥬 ${response.statusCode} 🥬 ');
//      Prefs.setDemoString('DEMO DATA COMPLETE');
//      return response.body;
//    } else {
//      throw Exception(' 👿  Failed: startDemoDataGeneration');
//    }
//  }
}
