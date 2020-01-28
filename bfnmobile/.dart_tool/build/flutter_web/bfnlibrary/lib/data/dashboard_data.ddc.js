define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const dashboard_data = Object.create(dart.library);
  const $_get = dartx._get;
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  const invoices$ = dart.privateName(dashboard_data, "DashboardData.invoices");
  const accounts$ = dart.privateName(dashboard_data, "DashboardData.accounts");
  const offers$ = dart.privateName(dashboard_data, "DashboardData.offers");
  const node$ = dart.privateName(dashboard_data, "DashboardData.node");
  dashboard_data.DashboardData = class DashboardData extends core.Object {
    get invoices() {
      return this[invoices$];
    }
    set invoices(value) {
      this[invoices$] = value;
    }
    get accounts() {
      return this[accounts$];
    }
    set accounts(value) {
      this[accounts$] = value;
    }
    get offers() {
      return this[offers$];
    }
    set offers(value) {
      this[offers$] = value;
    }
    get node() {
      return this[node$];
    }
    set node(value) {
      this[node$] = value;
    }
    toJson() {
      return new (IdentityMapOfString$dynamic()).from(["offers", this.offers, "invoices", this.invoices, "accounts", this.accounts, "node", this.node]);
    }
  };
  (dashboard_data.DashboardData.new = function(invoices, accounts, offers, node) {
    this[invoices$] = invoices;
    this[accounts$] = accounts;
    this[offers$] = offers;
    this[node$] = node;
    ;
  }).prototype = dashboard_data.DashboardData.prototype;
  (dashboard_data.DashboardData.fromJson = function(data) {
    this[node$] = null;
    this[offers$] = null;
    this[accounts$] = null;
    this[invoices$] = null;
    this.invoices = core.int._check(data[$_get]("invoices"));
    this.accounts = core.int._check(data[$_get]("accounts"));
    this.offers = core.int._check(data[$_get]("offers"));
    this.node = core.String._check(data[$_get]("webAPIUrl"));
  }).prototype = dashboard_data.DashboardData.prototype;
  dart.addTypeTests(dashboard_data.DashboardData);
  dart.setMethodSignature(dashboard_data.DashboardData, () => ({
    __proto__: dart.getMethods(dashboard_data.DashboardData.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(dashboard_data.DashboardData, "package:bfnlibrary/data/dashboard_data.dart");
  dart.setFieldSignature(dashboard_data.DashboardData, () => ({
    __proto__: dart.getFields(dashboard_data.DashboardData.__proto__),
    invoices: dart.fieldType(core.int),
    accounts: dart.fieldType(core.int),
    offers: dart.fieldType(core.int),
    node: dart.fieldType(core.String)
  }));
  dart.trackLibraries("packages/bfnlibrary/data/dashboard_data", {
    "package:bfnlibrary/data/dashboard_data.dart": dashboard_data
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["dashboard_data.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;IACM;;;;;;IACA;;;;;;IAAU;;;;;;IACP;;;;;;;AAW0B,YAAiB,2CAC5C,UAAU,aACV,YAAY,eACZ,YAAY,eACZ,QAAQ;IACT;;+CAdc,UAAe,UAAe,QAAa;IAA3C;IAAe;IAAe;IAAa;;EAAK;oDAExC;;;;;AACO,oBAA3B,gBAAW,AAAI,IAAA,QAAC;AACW,oBAA3B,gBAAW,AAAI,IAAA,QAAC;AACO,kBAAvB,gBAAS,AAAI,IAAA,QAAC;AACU,gBAAxB,mBAAO,AAAI,IAAA,QAAC;EACnB","file":"dashboard_data.ddc.js"}');
  // Exports:
  return {
    data__dashboard_data: dashboard_data
  };
});

//# sourceMappingURL=dashboard_data.ddc.js.map
