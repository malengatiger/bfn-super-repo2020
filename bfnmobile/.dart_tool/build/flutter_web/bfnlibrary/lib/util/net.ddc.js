define(['dart_sdk', 'packages/bfnlibrary/util/prefs', 'packages/bfnlibrary/data/node_info', 'packages/flutter_dotenv/flutter_dotenv', 'packages/cloud_firestore/cloud_firestore', 'packages/http/src/base_client', 'packages/flutter/src/foundation/_bitfield_web', 'packages/bfnlibrary/data/account', 'packages/bfnlibrary/data/invoice', 'packages/bfnlibrary/data/invoice_offer', 'packages/bfnlibrary/data/profile', 'packages/http/http', 'packages/bfnlibrary/data/fb_user', 'packages/bfnlibrary/data/user', 'packages/bfnlibrary/data/dashboard_data', 'packages/firebase_auth/firebase_auth'], function(dart_sdk, packages__bfnlibrary__util__prefs, packages__bfnlibrary__data__node_info, packages__flutter_dotenv__flutter_dotenv, packages__cloud_firestore__cloud_firestore, packages__http__src__base_client, packages__flutter__src__foundation___bitfield_web, packages__bfnlibrary__data__account, packages__bfnlibrary__data__invoice, packages__bfnlibrary__data__invoice_offer, packages__bfnlibrary__data__profile, packages__http__http, packages__bfnlibrary__data__fb_user, packages__bfnlibrary__data__user, packages__bfnlibrary__data__dashboard_data, packages__firebase_auth__firebase_auth) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const _interceptors = dart_sdk._interceptors;
  const convert = dart_sdk.convert;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const node_info = packages__bfnlibrary__data__node_info.data__node_info;
  const dotenv = packages__flutter_dotenv__flutter_dotenv.src__dotenv;
  const cloud_firestore = packages__cloud_firestore__cloud_firestore.cloud_firestore;
  const client$ = packages__http__src__base_client.src__client;
  const print = packages__flutter__src__foundation___bitfield_web.src__foundation__print;
  const account = packages__bfnlibrary__data__account.data__account;
  const invoice$ = packages__bfnlibrary__data__invoice.data__invoice;
  const invoice_offer = packages__bfnlibrary__data__invoice_offer.data__invoice_offer;
  const profile$ = packages__bfnlibrary__data__profile.data__profile;
  const http = packages__http__http.http;
  const fb_user = packages__bfnlibrary__data__fb_user.data__fb_user;
  const user = packages__bfnlibrary__data__user.data__user;
  const dashboard_data = packages__bfnlibrary__data__dashboard_data.data__dashboard_data;
  const firebase_auth = packages__firebase_auth__firebase_auth.firebase_auth;
  const net = Object.create(dart.library);
  const $_get = dartx._get;
  const $isNotEmpty = dartx.isNotEmpty;
  const $elementAt = dartx.elementAt;
  const $forEach = dartx.forEach;
  const $length = dartx.length;
  const $add = dartx.add;
  let JSArrayOfNodeInfo = () => (JSArrayOfNodeInfo = dart.constFn(_interceptors.JSArray$(node_info.NodeInfo)))();
  let ListOfNodeInfo = () => (ListOfNodeInfo = dart.constFn(core.List$(node_info.NodeInfo)))();
  let FutureOrOfString = () => (FutureOrOfString = dart.constFn(async.FutureOr$(core.String)))();
  let NodeInfoToNull = () => (NodeInfoToNull = dart.constFn(dart.fnType(core.Null, [node_info.NodeInfo])))();
  let DocumentSnapshotToNull = () => (DocumentSnapshotToNull = dart.constFn(dart.fnType(core.Null, [cloud_firestore.DocumentSnapshot])))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let IdentityMapOfString$String = () => (IdentityMapOfString$String = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  let JSArrayOfAccountInfo = () => (JSArrayOfAccountInfo = dart.constFn(_interceptors.JSArray$(account.AccountInfo)))();
  let dynamicToNull = () => (dynamicToNull = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  let ListOfAccountInfo = () => (ListOfAccountInfo = dart.constFn(core.List$(account.AccountInfo)))();
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
  let JSArrayOfUserDTO = () => (JSArrayOfUserDTO = dart.constFn(_interceptors.JSArray$(user.UserDTO)))();
  let ListOfUserDTO = () => (ListOfUserDTO = dart.constFn(core.List$(user.UserDTO)))();
  let JSArrayOfInvoice = () => (JSArrayOfInvoice = dart.constFn(_interceptors.JSArray$(invoice$.Invoice)))();
  let ListOfInvoice = () => (ListOfInvoice = dart.constFn(core.List$(invoice$.Invoice)))();
  let JSArrayOfInvoiceOffer = () => (JSArrayOfInvoiceOffer = dart.constFn(_interceptors.JSArray$(invoice_offer.InvoiceOffer)))();
  let ListOfInvoiceOffer = () => (ListOfInvoiceOffer = dart.constFn(core.List$(invoice_offer.InvoiceOffer)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.constMap(core.String, core.String, ["Content-type", "application/json", "Accept", "application/json"]);
    }
  });
  let C0;
  net.Net = class Net extends core.Object {
    static _getCachedURL() {
      return async.async(dart.dynamic, function* _getCachedURL() {
        let url = (yield prefs.Prefs.getUrl());
        return url;
      });
    }
    static listNodes() {
      return async.async(ListOfNodeInfo(), function* listNodes() {
        core.print("Net: 🍊 🍊 🍊 🍊 listNodes ...................  🥏  🥏  🥏 ");
        let list = JSArrayOfNodeInfo().of([]);
        let result = (yield net.Net.auth.currentUser());
        core.print(" 🌸 🌸 auth has returned with  🥏 " + dart.str(result) + "  🥏 ");
        if (result == null) {
          core.print("Getting user and password from .env");
          let email = dotenv.DotEnv.new().env[$_get]("email");
          let pass = dotenv.DotEnv.new().env[$_get]("password");
          core.print("🌸 🌸 🌸 🌸 🌸 ADMIN 🧡 auth for getting nodes from firestore: 🧡🧡 email from .env : 🥏  " + dart.str(email) + " 🥏  pass: " + dart.str(pass) + " 🥏 ");
          let userResult = (yield net.Net.auth.signInWithEmailAndPassword({email: email, password: pass}));
          core.print("🍊 🍊 🍊 Logged into Firebase with .env credentials,  🌸 uid: " + dart.str(userResult.user.uid) + " ... getting nodes ...");
          list = ListOfNodeInfo()._check(yield net.Net._getNodes(list));
          yield net.Net.auth.signOut();
          core.print("🍊 🍊 🍊 Logged OUT of Firebase  " + dart.str(userResult.user.uid) + " ... ");
        } else {
          core.print("Firebase auth : is already signed in, get nodes from firestore");
          list = ListOfNodeInfo()._check(yield net.Net._getNodes(list));
        }
        if (dart.test(list[$isNotEmpty])) {
          yield prefs.Prefs.saveNodes(list);
        }
        return list;
      });
    }
    static getNodeUrl() {
      return async.async(core.String, function* getNodeUrl() {
        let m = (yield net.Net._getCachedURL());
        if (m != null) {
          return FutureOrOfString()._check(m);
        }
        let acct = (yield prefs.Prefs.getAccount());
        if (acct == null) {
          dart.throw(core.Exception.new("Account not available yet"));
        }
        let list = (yield net.Net.listNodes());
        let url = null;
        core.print("  🔆  🔆  🔆 local account:  💚 " + dart.str(acct.toJson()));
        list[$forEach](dart.fn(node => {
          let host = node.addresses[$elementAt](0);
          core.print("  🔆  🔆  🔆 host of node:  💚 " + dart.str(host));
          if (host == acct.host) {
            url = node.webAPIUrl;
          }
        }, NodeInfoToNull()));
        if (url == null) {
          dart.throw(core.Exception.new("Url not found"));
        }
        prefs.Prefs.setUrl(url);
        return url;
      });
    }
    static _getNodes(list) {
      return async.async(dart.dynamic, function* _getNodes() {
        let snapshot = (yield net.Net.db.collection("nodes").getDocuments());
        core.print("🥏 🥏 🥏 🥏 nodes found on network: 🥏 " + dart.str(snapshot.documents[$length]) + " 🥏 ");
        snapshot.documents[$forEach](dart.fn(doc => {
          let data = doc.data;
          core.print("🥏 data from Firestore: " + dart.str(data));
          let node = new node_info.NodeInfo.fromJson(data);
          list[$add](node);
        }, DocumentSnapshotToNull()));
        return list;
      });
    }
    static get(mUrl) {
      return async.async(core.String, function* get() {
        let start = new core.DateTime.now();
        let client = client$.Client.new();
        let resp = (yield client.get(mUrl, {headers: net.Net.headers}).whenComplete(dart.fn(() => {
          client.close();
        }, VoidToNull())));
        let end = new core.DateTime.now();
        print.debugPrint("🍎 🍊 Net: post  ##################### elapsed: " + dart.str(end.difference(start).inSeconds) + " seconds\n\n");
        if (resp.statusCode === 200) {
          print.debugPrint("🍎 🍊 Net: get: SUCCESS: Network Response Status Code: 🥬  🥬 " + dart.str(resp.statusCode) + " 🥬  " + dart.str(mUrl));
          return resp.body;
        } else {
          let msg = " 👿  Failed status code: " + dart.str(resp.statusCode) + " 🥬  " + dart.str(mUrl);
          print.debugPrint(msg);
          dart.throw(core.Exception.new(msg));
        }
      });
    }
    static post(mUrl, bag) {
      return async.async(dart.dynamic, function* post() {
        let start = new core.DateTime.now();
        let client = client$.Client.new();
        let body = null;
        if (bag != null) {
          body = convert.json.encode(bag);
        }
        print.debugPrint("🍊 🍊 🍊 Net: post ... calling with bag: " + dart.str(body));
        let resp = (yield client.post(mUrl, {body: body, headers: net.Net.headers}).whenComplete(dart.fn(() => {
          print.debugPrint("🍊 🍊 🍊 Net: post whenComplete ");
          client.close();
        }, VoidToNull())));
        print.debugPrint("🍎 🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊 Net: post : PRINTING respomse.body from: " + dart.str(mUrl) + " - " + dart.str(body));
        core.print(resp.body);
        let end = new core.DateTime.now();
        print.debugPrint("🍎 🍊 Net: post  ##################### elapsed: " + dart.str(end.difference(start).inSeconds) + " seconds\n\n");
        if (resp.statusCode === 200) {
          print.debugPrint("🍎 🍊 Net: post: SUCCESS: Network Response Status Code: 🥬  🥬 " + dart.str(resp.statusCode) + " 🥬  " + dart.str(mUrl));
          return resp.body;
        } else {
          let msg = " 👿  Failed status code: " + dart.str(resp.statusCode) + " 🥬  " + dart.str(mUrl);
          print.debugPrint(resp.body);
          dart.throw(core.Exception.new(msg));
        }
      });
    }
    static startAccountRegistrationFlow(name, email, password, cellphone) {
      return async.async(account.AccountInfo, function* startAccountRegistrationFlow() {
        let bag = new (IdentityMapOfString$String()).from(["name", name, "email", email, "password", password, "cellphone", cellphone]);
        print.debugPrint("🍊🍊🍊🍊🍊 startAccountRegistrationFlow starting the call ...");
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.post(dart.notNull(node.webAPIUrl) + "admin/startAccountRegistrationFlow", bag));
        let m = convert.json.decode(core.String._check(response));
        let acct = new account.AccountInfo.fromJson(core.Map._check(m));
        return acct;
      });
    }
    static startRegisterInvoiceFlow(invoice) {
      return async.async(invoice$.Invoice, function* startRegisterInvoiceFlow() {
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.post(dart.notNull(node.webAPIUrl) + "supplier/startRegisterInvoiceFlow", invoice.toJson()));
        let m = convert.json.decode(core.String._check(response));
        let acct = new invoice$.Invoice.fromJson(core.Map._check(m));
        return acct;
      });
    }
    static buyInvoiceOffer(invoiceId) {
      return async.async(core.String, function* buyInvoiceOffer() {
        let user = (yield prefs.Prefs.getAccount());
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.get(dart.notNull(node.webAPIUrl) + ("investor/buyInvoiceOffer?invoiceId=" + dart.str(invoiceId) + "&investorId=" + dart.str(user.identifier))));
        return response;
      });
    }
    static startInvoiceOfferFlow(invoiceOffer) {
      return async.async(invoice_offer.InvoiceOffer, function* startInvoiceOfferFlow() {
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.post(dart.notNull(node.webAPIUrl) + "supplier/startInvoiceOfferFlow", invoiceOffer.toJson()));
        let m = convert.json.decode(core.String._check(response));
        let acct = new invoice_offer.InvoiceOffer.fromJson(core.Map._check(m));
        return acct;
      });
    }
    static getAccounts() {
      return async.async(ListOfAccountInfo(), function* getAccounts() {
        let prefix = (yield net.Net.getNodeUrl());
        let response = (yield net.Net.get(dart.notNull(prefix) + "admin/getAccounts"));
        let list = JSArrayOfAccountInfo().of([]);
        let m = core.List._check(convert.json.decode(response));
        m[$forEach](dart.fn(f => {
          list[$add](new account.AccountInfo.fromJson(core.Map._check(f)));
        }, dynamicToNull()));
        print.debugPrint("🍎 🍊 Net: getAccounts: found " + dart.str(list[$length]));
        return list;
      });
    }
    static getAccount(accountId) {
      return async.async(account.AccountInfo, function* getAccount() {
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.get(dart.notNull(node.webAPIUrl) + ("admin/getAccount?accountId=" + dart.str(accountId))));
        let acctInfo = new account.AccountInfo.fromJson(core.Map._check(convert.json.decode(response)));
        print.debugPrint("🍎 🍊 Net: getAccount: found " + dart.str(acctInfo.toJson()));
        return acctInfo;
      });
    }
    static getSupplierProfile(accountId) {
      return async.async(profile$.SupplierProfile, function* getSupplierProfile() {
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.get(dart.notNull(node.webAPIUrl) + ("admin/getSupplierProfile?accountId=" + dart.str(accountId))));
        if (response == null) {
          return null;
        }
        let profile = new profile$.SupplierProfile.fromJson(core.Map._check(convert.json.decode(response)));
        print.debugPrint("🍎 🍊 Net: getSupplierProfile: found " + dart.str(profile.toJson()));
        return profile;
      });
    }
    static getInvestorProfile(accountId) {
      return async.async(profile$.InvestorProfile, function* getInvestorProfile() {
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.get(dart.notNull(node.webAPIUrl) + ("admin/getInvestorProfile?accountId=" + dart.str(accountId))));
        if (response == null) {
          return null;
        }
        let profile = new profile$.InvestorProfile.fromJson(core.Map._check(convert.json.decode(response)));
        print.debugPrint("🍎 🍊 Net: getInvestorProfile: found " + dart.str(profile.toJson()));
        return profile;
      });
    }
    static createInvestorProfile(profile) {
      return async.async(core.String, function* createInvestorProfile() {
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.post(dart.notNull(node.webAPIUrl) + "admin/createInvestorProfile", profile.toJson()));
        print.debugPrint("🍎 🍊 Net: createInvestorProfile: " + dart.str(response));
        return FutureOrOfString()._check(response);
      });
    }
    static createSupplierProfile(profile) {
      return async.async(core.String, function* createSupplierProfile() {
        let node = (yield prefs.Prefs.getNode());
        let response = (yield net.Net.post(dart.notNull(node.webAPIUrl) + "admin/createSupplierProfile", profile.toJson()));
        print.debugPrint("🍎 🍊 Net: createSupplierProfile: " + dart.str(response));
        return FutureOrOfString()._check(response);
      });
    }
    static getUser(email) {
      return async.async(fb_user.UserRecord, function* getUser() {
        let node = (yield prefs.Prefs.getNode());
        let url = dart.notNull(node.webAPIUrl) + ("admin/getUser?email=" + dart.str(email));
        ;
        let response = (yield http.get(url));
        if (response.statusCode === 200) {
          print.debugPrint("🍎 🍊 Net: getInvoices: Network Response Status Code: 🥬  🥬 " + dart.str(response.statusCode) + " 🥬 ");
          if (response.body == null) {
            return null;
          }
          return new fb_user.UserRecord.fromJson(MapOfString$dynamic()._check(convert.json.decode(response.body)));
        } else {
          core.print(" 👿  Failed : getUser Status Code: 🥬  🥬 " + dart.str(response.statusCode) + " 🥬 ");
          return null;
        }
      });
    }
    static getUsers() {
      return async.async(ListOfUserDTO(), function* getUsers() {
        let node = (yield prefs.Prefs.getNode());
        let url = dart.notNull(node.webAPIUrl) + "admin/getUsers";
        let users = JSArrayOfUserDTO().of([]);
        let response = (yield http.get(url));
        if (response.statusCode === 200) {
          print.debugPrint("🍎 🍊 Net: getUsers: Network Response Status Code: 🥬  🥬 " + dart.str(response.statusCode) + " 🥬 ");
          if (response.body == null) {
            return null;
          }
          let k = core.List._check(convert.json.decode(response.body));
          k[$forEach](dart.fn(m => {
            users[$add](new user.UserDTO.fromJson(MapOfString$dynamic()._check(m)));
          }, dynamicToNull()));
          return users;
        } else {
          core.print(" 👿  Failed : getUsers Status Code: 🥬  🥬 " + dart.str(response.statusCode) + " 🥬 ");
          return null;
        }
      });
    }
    static getInvoices(opts) {
      let accountId = opts && 'accountId' in opts ? opts.accountId : null;
      let consumed = opts && 'consumed' in opts ? opts.consumed : false;
      return async.async(ListOfInvoice(), function* getInvoices() {
        let node = (yield prefs.Prefs.getNode());
        let url = null;
        if (accountId == null) {
          url = dart.notNull(node.webAPIUrl) + ("admin/getInvoiceStates?consumed=" + dart.str(consumed));
        } else {
          url = dart.notNull(node.webAPIUrl) + ("admin/findInvoicesForSupplier?accountId=" + dart.str(accountId) + "&consumed=" + dart.str(consumed));
        }
        print.debugPrint(url);
        let response = (yield net.Net.get(url));
        let list = JSArrayOfInvoice().of([]);
        let m = core.List._check(convert.json.decode(response));
        m[$forEach](dart.fn(f => {
          list[$add](new invoice$.Invoice.fromJson(core.Map._check(f)));
        }, dynamicToNull()));
        print.debugPrint("🍎 🍊 🍎 🍊 Net: findInvoicesForSupplier: found " + dart.str(list[$length]));
        return list;
      });
    }
    static getSupplierInvoiceOffers(opts) {
      let accountId = opts && 'accountId' in opts ? opts.accountId : null;
      let consumed = opts && 'consumed' in opts ? opts.consumed : null;
      return async.async(ListOfInvoiceOffer(), function* getSupplierInvoiceOffers() {
        let node = (yield prefs.Prefs.getNode());
        if (consumed == null) consumed = false;
        let url = null;
        if (accountId == null) {
          url = dart.notNull(node.webAPIUrl) + ("admin/findOffersForSupplier?consumed=" + dart.str(consumed));
        } else {
          url = dart.notNull(node.webAPIUrl) + ("admin/findOffersForSupplier?accountId=" + dart.str(accountId) + "&consumed=" + dart.str(consumed));
        }
        print.debugPrint(url);
        let response = (yield net.Net.get(url));
        let list = JSArrayOfInvoiceOffer().of([]);
        let m = core.List._check(convert.json.decode(response));
        m[$forEach](dart.fn(f => {
          list[$add](new invoice_offer.InvoiceOffer.fromJson(core.Map._check(f)));
        }, dynamicToNull()));
        print.debugPrint("🍎 🍊 🍎 🍊 Net: findOffersForInvestor: found " + dart.str(list[$length]));
        return list;
      });
    }
    static getInvestorInvoiceOffers(opts) {
      let accountId = opts && 'accountId' in opts ? opts.accountId : null;
      let consumed = opts && 'consumed' in opts ? opts.consumed : null;
      return async.async(ListOfInvoiceOffer(), function* getInvestorInvoiceOffers() {
        let node = (yield prefs.Prefs.getNode());
        if (consumed == null) consumed = false;
        let url = null;
        if (accountId == null) {
          url = dart.notNull(node.webAPIUrl) + ("admin/findOffersForInvestor?consumed=" + dart.str(consumed));
        } else {
          url = dart.notNull(node.webAPIUrl) + ("admin/findOffersForInvestor?accountId=" + dart.str(accountId) + "&consumed=" + dart.str(consumed));
        }
        print.debugPrint(url);
        let response = (yield net.Net.get(url));
        let list = JSArrayOfInvoiceOffer().of([]);
        let m = core.List._check(convert.json.decode(response));
        m[$forEach](dart.fn(f => {
          list[$add](new invoice_offer.InvoiceOffer.fromJson(core.Map._check(f)));
        }, dynamicToNull()));
        print.debugPrint("🍎 🍊 🍎 🍊 Net: findOffersForInvestor: found " + dart.str(list[$length]));
        return list;
      });
    }
    static getDashboardData() {
      return async.async(dashboard_data.DashboardData, function* getDashboardData() {
        let node = (yield prefs.Prefs.getNode());
        let url = dart.notNull(node.webAPIUrl) + "admin/getDashboardData";
        print.debugPrint(url);
        let response = (yield net.Net.get(url));
        let data = new dashboard_data.DashboardData.fromJson(core.Map._check(convert.json.decode(response)));
        print.debugPrint("🍎 🍊 🍎 🍊 Net: getDashboardData: found " + dart.str(data.toJson()));
        return data;
      });
    }
    static ping() {
      return async.async(core.String, function* ping() {
        let node = (yield prefs.Prefs.getNode());
        let response = (yield http.get(dart.notNull(node.webAPIUrl) + "admin/ping"));
        if (response.statusCode === 200) {
          print.debugPrint("🍎 🍊 Net: ping: Network Response Status Code: 🥬  🥬 " + dart.str(response.statusCode) + " 🥬 ");
          return response.body;
        } else {
          dart.throw(core.Exception.new(" 👿  Failed ping"));
        }
      });
    }
  };
  (net.Net.new = function() {
    ;
  }).prototype = net.Net.prototype;
  dart.addTypeTests(net.Net);
  dart.setLibraryUri(net.Net, "package:bfnlibrary/util/net.dart");
  dart.defineLazy(net.Net, {
    /*net.Net.db*/get db() {
      return cloud_firestore.Firestore.instance;
    },
    set db(_) {},
    /*net.Net.auth*/get auth() {
      return firebase_auth.FirebaseAuth.instance;
    },
    set auth(_) {},
    /*net.Net.headers*/get headers() {
      return C0 || CT.C0;
    }
  });
  dart.trackLibraries("packages/bfnlibrary/util/net", {
    "package:bfnlibrary/util/net.dart": net
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["net.dart"],"names":[],"mappings":"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","file":"net.ddc.js"}');
  // Exports:
  return {
    util__net: net
  };
});

//# sourceMappingURL=net.ddc.js.map
