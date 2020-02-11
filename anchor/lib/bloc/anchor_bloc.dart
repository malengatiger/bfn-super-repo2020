import 'dart:convert';
import 'dart:io';

import 'package:bfnlibrary/data/account.dart';
import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/data/invoice.dart';
import 'package:bfnlibrary/data/invoice_offer.dart';
import 'package:bfnlibrary/data/node_info.dart';
import 'package:bfnlibrary/net_util.dart';
import 'package:bfnlibrary/util/auth.dart';
import 'package:bfnlibrary/util/prefs.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';

class AnchorBloc extends ChangeNotifier {
  Anchor _anchor;
  NodeInfo _node;
  FirebaseMessaging _firebaseMessaging = FirebaseMessaging();
  List<NodeInfo> _nodes = List();
  List<InvoiceOffer> _openOffers = List();
  List<InvoiceOffer> _acceptedOffers = List();
  List<InvoiceOffer> _closedOffers = List();
  List<Invoice> _invoices = List();
  List<AccountInfo> _accounts = List();
  String _url;

  List<InvoiceOffer> get openOffers => _openOffers;
  List<InvoiceOffer> get acceptedOffers => _acceptedOffers;
  List<InvoiceOffer> get closedOffers => _closedOffers;
  List<AccountInfo> get accounts => _accounts;

  Anchor get anchor => _anchor;
  NodeInfo get node => _node;
  List<NodeInfo> get nodes => _nodes;
  List<Invoice> get invoices => _invoices;
  String get url => _url;

  AnchorBloc() {
    debugPrint(
        '🔱 🔱 🔱 🔱 🔱 🔱 AnchorBloc Constructor  🌸 calling _init  🌸 ');
    initialize();
  }
  initialize() async {
    debugPrint(
        '🥏 🥏 🥏 _init: AnchorBloc 🥏 getAnchor  🍎 getNodesFromFirestore');
    _firebaseCloudMessagingInitialization();
    _anchor = await Prefs.getAnchor();
    _nodes = await Net.getNodesFromFirestore();
    debugPrint(_anchor == null
        ? '🔱 🔱 🔱 AnchorBloc 🔴 No anchor found in Prefs'
        : '🔶🔶🔶 Anchor from Prefs: 🔶 ${_anchor.name} 🔶');
    debugPrint(
        '🛎 🛎 🛎 AnchorBloc _init: 🛎 ${_nodes.length} 🛎 nodes found  🍎 ...');
    debugPrint(
        '🌸 🌸 🌸 AnchorBloc Constructor 🔱 about to notifyListeners  🍎 ...');
    notifyListeners();
  }

  void _firebaseCloudMessagingInitialization() {
    print(
        '🍊 🍊 _firebaseCloudMessagingInitialization started... 🍊 Configuring messaging 🍊 🍊 🍊');
    if (Platform.isIOS) iOSPermission();
    _firebaseMessaging.getToken().then((token) {
      print("FCM user token :: $token");
    });
    _firebaseMessaging.configure(
      onMessage: (Map<String, dynamic> message) async {
        print('🧩🧩🧩🧩🧩🧩 on message $message');
        var data = message['data'];
        if (data['invoiceOffer'] != null) {
          var offer = json.decode(data['invoiceOffer']);
          var m = InvoiceOffer.fromJson(offer);
          _openOffers.add(m);
          notifyListeners();
          return;
        }
        if (data['invoice'] != null) {
          var invJson = json.decode(data['invoice']);
          var m = Invoice.fromJson(invJson);
          _invoices.add(m);
          notifyListeners();
          return;
        }
        if (data['account'] != null) {
          var offer = json.decode(data['account']);
          var m = AccountInfo.fromJson(offer);
          _accounts.add(m);
          notifyListeners();
          return;
        }
        debugPrint('Un-accounted for message received ... 😝 😝 check above');
      },
      onResume: (Map<String, dynamic> message) async {
        print('🧩🧩🧩🧩🧩🧩 on resume $message');
      },
      onLaunch: (Map<String, dynamic> message) async {
        print('🧩🧩🧩🧩🧩🧩 on launch $message');
      },
    );
    _subscribe();
  }

  void _subscribe() {
    _firebaseMessaging.subscribeToTopic('invoiceOffers');
    _firebaseMessaging.subscribeToTopic('invoices');
    _firebaseMessaging.subscribeToTopic('accounts');
    _firebaseMessaging.subscribeToTopic('supplierPayments');
    _firebaseMessaging.subscribeToTopic('supplierProfiles');
    _firebaseMessaging.subscribeToTopic('investorProfiles');
    print(
        '🧩🧩🧩🧩🧩🧩 subscribed to FCM topics 🍊 invoiceOffers 🍊 invoices 🍊 accounts '
        '🔋 supplierPayments 🔋 supplierProfiles 🔋 investorProfiles');
  }

  void iOSPermission() {
    _firebaseMessaging.requestNotificationPermissions(
        IosNotificationSettings(sound: true, badge: true, alert: true));
    _firebaseMessaging.onIosSettingsRegistered
        .listen((IosNotificationSettings settings) {
      print("Settings registered: $settings");
    });
  }

  Future<Anchor> anchorSignIn(String email, String password) async {
    try {
      _anchor = await BFNAuth.anchorSignIn(email, password);
      await Prefs.saveAnchor(_anchor);
      notifyListeners();
    } catch (e) {
      debugPrint(
          '🔴 AnchorBloc 🔴 anchorSignIn: Hey Senor, we gotta us a problem ...  👿  $e');
      throw e;
    }

    return _anchor;
  }

  Future<String> buildUrl() async {
    if (_node == null) {
      throw Exception('Node not found in Prefs');
    }
    var mx = '${_node.webServerAddress}';
    debugPrint("🍊 🍊 🍊  🌸 🌸 🌸 ${_node.toJson()}  🌸 🌸 🌸  🍊 🍊 🍊 ");
    if (_node.webServerPort != null || _node.webServerPort > 0) {
      mx += ':${_node.webServerPort}/';
    } else {
      mx += '/';
    }
    return mx;
  }

  Future getOpenOffers() async {
    notifyListeners();
  }

  Future getAcceptedOffers() async {
    notifyListeners();
  }

  Future getClosedOffers() async {
    notifyListeners();
  }

  Future refreshDashboardData() async {
    notifyListeners();
  }
}
