define(['dart_sdk', 'packages/bfnlibrary/data/account', 'packages/bfnlibrary/data/invoice', 'packages/bfnlibrary/data/invoice_offer', 'packages/bfnlibrary/data/dashboard_data', 'packages/firebase_auth/firebase_auth', 'packages/bfnlibrary/util/prefs', 'packages/flutter/src/foundation/_bitfield_web', 'packages/bfnlibrary/util/functions', 'packages/bfnlibrary/util/net', 'packages/flutter/src/widgets/actions'], function(dart_sdk, packages__bfnlibrary__data__account, packages__bfnlibrary__data__invoice, packages__bfnlibrary__data__invoice_offer, packages__bfnlibrary__data__dashboard_data, packages__firebase_auth__firebase_auth, packages__bfnlibrary__util__prefs, packages__flutter__src__foundation___bitfield_web, packages__bfnlibrary__util__functions, packages__bfnlibrary__util__net, packages__flutter__src__widgets__actions) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const account = packages__bfnlibrary__data__account.data__account;
  const invoice = packages__bfnlibrary__data__invoice.data__invoice;
  const invoice_offer = packages__bfnlibrary__data__invoice_offer.data__invoice_offer;
  const dashboard_data = packages__bfnlibrary__data__dashboard_data.data__dashboard_data;
  const firebase_auth = packages__firebase_auth__firebase_auth.firebase_auth;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const print = packages__flutter__src__foundation___bitfield_web.src__foundation__print;
  const functions = packages__bfnlibrary__util__functions.util__functions;
  const net = packages__bfnlibrary__util__net.util__net;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const bloc = Object.create(dart.library);
  const $add = dartx.add;
  const $length = dartx.length;
  let ListOfAccountInfo = () => (ListOfAccountInfo = dart.constFn(core.List$(account.AccountInfo)))();
  let StreamControllerOfListOfAccountInfo = () => (StreamControllerOfListOfAccountInfo = dart.constFn(async.StreamController$(ListOfAccountInfo())))();
  let ListOfInvoice = () => (ListOfInvoice = dart.constFn(core.List$(invoice.Invoice)))();
  let StreamControllerOfListOfInvoice = () => (StreamControllerOfListOfInvoice = dart.constFn(async.StreamController$(ListOfInvoice())))();
  let ListOfInvoiceOffer = () => (ListOfInvoiceOffer = dart.constFn(core.List$(invoice_offer.InvoiceOffer)))();
  let StreamControllerOfListOfInvoiceOffer = () => (StreamControllerOfListOfInvoiceOffer = dart.constFn(async.StreamController$(ListOfInvoiceOffer())))();
  let StreamControllerOfString = () => (StreamControllerOfString = dart.constFn(async.StreamController$(core.String)))();
  let StreamControllerOfInvoice = () => (StreamControllerOfInvoice = dart.constFn(async.StreamController$(invoice.Invoice)))();
  let StreamControllerOfInvoiceOffer = () => (StreamControllerOfInvoiceOffer = dart.constFn(async.StreamController$(invoice_offer.InvoiceOffer)))();
  let StreamControllerOfDashboardData = () => (StreamControllerOfDashboardData = dart.constFn(async.StreamController$(dashboard_data.DashboardData)))();
  let JSArrayOfAccountInfo = () => (JSArrayOfAccountInfo = dart.constFn(_interceptors.JSArray$(account.AccountInfo)))();
  let JSArrayOfInvoice = () => (JSArrayOfInvoice = dart.constFn(_interceptors.JSArray$(invoice.Invoice)))();
  let JSArrayOfInvoiceOffer = () => (JSArrayOfInvoiceOffer = dart.constFn(_interceptors.JSArray$(invoice_offer.InvoiceOffer)))();
  const CT = Object.create(null);
  const _acctController = dart.privateName(bloc, "_acctController");
  const _invoiceController = dart.privateName(bloc, "_invoiceController");
  const _offerController = dart.privateName(bloc, "_offerController");
  const _fcmController = dart.privateName(bloc, "_fcmController");
  const _invoiceFCMController = dart.privateName(bloc, "_invoiceFCMController");
  const _offerFCMController = dart.privateName(bloc, "_offerFCMController");
  const _dashController = dart.privateName(bloc, "_dashController");
  const _user = dart.privateName(bloc, "_user");
  const _accounts = dart.privateName(bloc, "_accounts");
  const auth = dart.privateName(bloc, "BFNBloc.auth");
  const account$ = dart.privateName(bloc, "BFNBloc.account");
  bloc.BFNBloc = class BFNBloc extends core.Object {
    get auth() {
      return this[auth];
    }
    set auth(value) {
      this[auth] = value;
    }
    get account() {
      return this[account$];
    }
    set account(value) {
      this[account$] = value;
    }
    get fcmStream() {
      return this[_fcmController].stream;
    }
    get accountStream() {
      return this[_acctController].stream;
    }
    get invoiceStream() {
      return this[_invoiceFCMController].stream;
    }
    get offerStream() {
      return this[_offerFCMController].stream;
    }
    get dashboardStream() {
      return this[_dashController].stream;
    }
    getMyAccount() {
      return async.async(account.AccountInfo, (function* getMyAccount() {
        this.account = (yield prefs.Prefs.getAccount());
        return this.account;
      }).bind(this));
    }
    close() {
      this[_acctController].close();
      this[_invoiceController].close();
      this[_offerController].close();
      this[_dashController].close();
      this[_fcmController].close();
      this[_invoiceFCMController].close();
      this[_offerFCMController].close();
    }
    addFCMInvoice(invoice, context) {
      print.debugPrint("🥬 🥬 🥬 Putting arrived FCM message on stream: 🥬 invoice: " + dart.str(invoice.invoiceNumber));
      let msg = "🥬 Invoice added to Network " + dart.str(functions.getFormattedDateShortWithTime(invoice.dateRegistered, context));
      this[_fcmController].sink.add(msg);
      this[_invoiceFCMController].sink.add(invoice);
    }
    addFCMInvoiceOffer(invoiceOffer, context) {
      print.debugPrint("🥬 🥬 🥬 Putting arrived FCM message on stream: 🥬 invoiceOffer: " + dart.str(invoiceOffer.invoiceId));
      let msg = "🍎 Offer added to Network " + dart.str(functions.getFormattedDateShortWithTime(invoiceOffer.offerDate, context));
      this[_fcmController].sink.add(msg);
      this[_offerFCMController].sink.add(invoiceOffer);
    }
    addFCMAccount(account, context) {
      print.debugPrint("🥬 🥬 🥬 Putting arrived FCM message on stream: 🥬 account: " + dart.str(account.name));
      let msg = "🧩 Account added to Network: " + dart.str(account.name);
      this[_fcmController].sink.add(msg);
      this[_accounts][$add](account);
      this[_acctController].sink.add(this[_accounts]);
    }
    getFirebaseUser() {
      return async.async(dart.dynamic, (function* getFirebaseUser() {
        let user = (yield this.auth.onAuthStateChanged.first);
        if (user != null) {
          core.print("🍊 🍊 🍊 🍊 🍊 🍊 Firebase user is logged in");
        } else {
          core.print("👽 Firebase user is NOT logged in 🍊 ");
        }
      }).bind(this));
    }
    isUserAuthenticated() {
      return async.async(core.bool, (function* isUserAuthenticated() {
        print.debugPrint("Bloc:  🥏  🥏  🥏  isUserAuthenticated .....");
        let user = (yield this.getFirebaseUser());
        if (user == null) {
          print.debugPrint("🍎 🍎 🍊 User NOT authenticated! 🍎");
          return false;
        } else {
          print.debugPrint("🥬 🥬 🥬 User authenticated already 🥬 🥬 🥬 ");
          this.account = (yield prefs.Prefs.getAccount());
          return true;
        }
      }).bind(this));
    }
    signIn(email, password) {
      return async.async(firebase_auth.FirebaseUser, (function* signIn() {
        let result = (yield this.auth.signInWithEmailAndPassword({email: email, password: password}));
        if (result.user == null) {
          dart.throw(core.Exception.new("User sigin failed"));
        }
        core.print("🥬 🥬 🥬 User successfully signed in: 🍎 🍊 " + dart.str(result.user.uid));
        this[_user] = result.user;
        return this[_user];
      }).bind(this));
    }
    getAccounts() {
      return async.async(ListOfAccountInfo(), (function* getAccounts() {
        try {
          this[_accounts] = (yield net.Net.getAccounts());
          core.print("🍏 🍏 BFNBloc: getAccounts found 🔆 " + dart.str(this[_accounts][$length]) + " 🔆 🍏 🍏  - adding to stream 🧩 🧩 ");
          this[_acctController].sink.add(this[_accounts]);
          return this[_accounts];
        } catch (e$) {
          let e = dart.getThrown(e$);
          core.print(e);
          return JSArrayOfAccountInfo().of([]);
        }
      }).bind(this));
    }
    getInvoices(opts) {
      let accountId = opts && 'accountId' in opts ? opts.accountId : null;
      return async.async(ListOfInvoice(), (function* getInvoices() {
        let invoices = JSArrayOfInvoice().of([]);
        if (accountId == null) {
          invoices = (yield net.Net.getInvoices());
        } else {
          invoices = (yield net.Net.getInvoices({accountId: accountId}));
        }
        core.print("🍏 🍏 BFNBloc: getInvoices found 🔆 " + dart.str(invoices[$length]) + " 🔆 🍏 🍏  - adding to stream 🧩 🧩 ");
        this[_invoiceController].sink.add(invoices);
        return invoices;
      }).bind(this));
    }
    getInvoiceOffers(opts) {
      let accountId = opts && 'accountId' in opts ? opts.accountId : null;
      let consumed = opts && 'consumed' in opts ? opts.consumed : null;
      return async.async(ListOfInvoiceOffer(), (function* getInvoiceOffers() {
        let offers = JSArrayOfInvoiceOffer().of([]);
        if (accountId == null) {
          offers = (yield net.Net.getSupplierInvoiceOffers());
        } else {
          offers = (yield net.Net.getSupplierInvoiceOffers({accountId: accountId, consumed: consumed}));
        }
        core.print("🍏 🍏 BFNBloc: getInvoiceOffers found 🔆 " + dart.str(offers[$length]) + " 🔆 🍏 🍏  - adding to stream 🧩 🧩 ");
        this[_offerController].sink.add(offers);
        return offers;
      }).bind(this));
    }
    getDashboardData() {
      return async.async(dashboard_data.DashboardData, (function* getDashboardData() {
        let data = (yield net.Net.getDashboardData());
        core.print("🍏 🍏 BFNBloc: getDashboardData found 🔆 " + dart.str(data.toJson()) + " 🔆 🍏 🍏  - adding to stream 🧩 🧩 ");
        this[_dashController].sink.add(data);
        return data;
      }).bind(this));
    }
  };
  (bloc.BFNBloc.new = function() {
    this[_acctController] = StreamControllerOfListOfAccountInfo().broadcast();
    this[_invoiceController] = StreamControllerOfListOfInvoice().broadcast();
    this[_offerController] = StreamControllerOfListOfInvoiceOffer().broadcast();
    this[_fcmController] = StreamControllerOfString().broadcast();
    this[_invoiceFCMController] = StreamControllerOfInvoice().broadcast();
    this[_offerFCMController] = StreamControllerOfInvoiceOffer().broadcast();
    this[_dashController] = StreamControllerOfDashboardData().broadcast();
    this[auth] = firebase_auth.FirebaseAuth.instance;
    this[_user] = null;
    this[account$] = null;
    this[_accounts] = JSArrayOfAccountInfo().of([]);
    this.getMyAccount();
  }).prototype = bloc.BFNBloc.prototype;
  dart.addTypeTests(bloc.BFNBloc);
  dart.setMethodSignature(bloc.BFNBloc, () => ({
    __proto__: dart.getMethods(bloc.BFNBloc.__proto__),
    getMyAccount: dart.fnType(async.Future$(account.AccountInfo), []),
    close: dart.fnType(dart.dynamic, []),
    addFCMInvoice: dart.fnType(dart.void, [invoice.Invoice, framework.BuildContext]),
    addFCMInvoiceOffer: dart.fnType(dart.void, [invoice_offer.InvoiceOffer, framework.BuildContext]),
    addFCMAccount: dart.fnType(dart.void, [account.AccountInfo, framework.BuildContext]),
    getFirebaseUser: dart.fnType(async.Future, []),
    isUserAuthenticated: dart.fnType(async.Future$(core.bool), []),
    signIn: dart.fnType(async.Future$(firebase_auth.FirebaseUser), [core.String, core.String]),
    getAccounts: dart.fnType(async.Future$(core.List$(account.AccountInfo)), []),
    getInvoices: dart.fnType(async.Future$(core.List$(invoice.Invoice)), [], {accountId: core.String}, {}),
    getInvoiceOffers: dart.fnType(async.Future$(core.List$(invoice_offer.InvoiceOffer)), [], {accountId: core.String, consumed: core.bool}, {}),
    getDashboardData: dart.fnType(async.Future$(dashboard_data.DashboardData), [])
  }));
  dart.setGetterSignature(bloc.BFNBloc, () => ({
    __proto__: dart.getGetters(bloc.BFNBloc.__proto__),
    fcmStream: async.Stream,
    accountStream: async.Stream,
    invoiceStream: async.Stream,
    offerStream: async.Stream,
    dashboardStream: async.Stream
  }));
  dart.setLibraryUri(bloc.BFNBloc, "package:bfnmobile/bloc.dart");
  dart.setFieldSignature(bloc.BFNBloc, () => ({
    __proto__: dart.getFields(bloc.BFNBloc.__proto__),
    [_acctController]: dart.fieldType(async.StreamController$(core.List$(account.AccountInfo))),
    [_invoiceController]: dart.fieldType(async.StreamController$(core.List$(invoice.Invoice))),
    [_offerController]: dart.fieldType(async.StreamController$(core.List$(invoice_offer.InvoiceOffer))),
    [_fcmController]: dart.fieldType(async.StreamController$(core.String)),
    [_invoiceFCMController]: dart.fieldType(async.StreamController$(invoice.Invoice)),
    [_offerFCMController]: dart.fieldType(async.StreamController$(invoice_offer.InvoiceOffer)),
    [_dashController]: dart.fieldType(async.StreamController$(dashboard_data.DashboardData)),
    auth: dart.fieldType(firebase_auth.FirebaseAuth),
    [_user]: dart.fieldType(firebase_auth.FirebaseUser),
    account: dart.fieldType(account.AccountInfo),
    [_accounts]: dart.fieldType(core.List$(account.AccountInfo))
  }));
  dart.defineLazy(bloc, {
    /*bloc.bfnBloc*/get bfnBloc() {
      return new bloc.BFNBloc.new();
    },
    set bfnBloc(_) {}
  });
  dart.trackLibraries("packages/bfnmobile/bloc", {
    "package:bfnmobile/bloc.dart": bloc
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["bloc.dart"],"names":[],"mappings":"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","file":"bloc.ddc.js"}');
  // Exports:
  return {
    bloc: bloc
  };
});

//# sourceMappingURL=bloc.ddc.js.map
