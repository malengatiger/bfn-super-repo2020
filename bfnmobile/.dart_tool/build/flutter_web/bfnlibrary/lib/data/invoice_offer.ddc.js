define(['dart_sdk', 'packages/bfnlibrary/data/account'], function(dart_sdk, packages__bfnlibrary__data__account) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const account = packages__bfnlibrary__data__account.data__account;
  const invoice_offer = Object.create(dart.library);
  const $_get = dartx._get;
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  const invoiceId$ = dart.privateName(invoice_offer, "InvoiceOffer.invoiceId");
  const owner$ = dart.privateName(invoice_offer, "InvoiceOffer.owner");
  const supplier$ = dart.privateName(invoice_offer, "InvoiceOffer.supplier");
  const investor$ = dart.privateName(invoice_offer, "InvoiceOffer.investor");
  const customer$ = dart.privateName(invoice_offer, "InvoiceOffer.customer");
  const offerDate$ = dart.privateName(invoice_offer, "InvoiceOffer.offerDate");
  const offerAmount$ = dart.privateName(invoice_offer, "InvoiceOffer.offerAmount");
  const discount$ = dart.privateName(invoice_offer, "InvoiceOffer.discount");
  const originalAmount$ = dart.privateName(invoice_offer, "InvoiceOffer.originalAmount");
  const investorDate$ = dart.privateName(invoice_offer, "InvoiceOffer.investorDate");
  invoice_offer.InvoiceOffer = class InvoiceOffer extends core.Object {
    get invoiceId() {
      return this[invoiceId$];
    }
    set invoiceId(value) {
      this[invoiceId$] = value;
    }
    get owner() {
      return this[owner$];
    }
    set owner(value) {
      this[owner$] = value;
    }
    get supplier() {
      return this[supplier$];
    }
    set supplier(value) {
      this[supplier$] = value;
    }
    get investor() {
      return this[investor$];
    }
    set investor(value) {
      this[investor$] = value;
    }
    get customer() {
      return this[customer$];
    }
    set customer(value) {
      this[customer$] = value;
    }
    get offerDate() {
      return this[offerDate$];
    }
    set offerDate(value) {
      this[offerDate$] = value;
    }
    get offerAmount() {
      return this[offerAmount$];
    }
    set offerAmount(value) {
      this[offerAmount$] = value;
    }
    get discount() {
      return this[discount$];
    }
    set discount(value) {
      this[discount$] = value;
    }
    get originalAmount() {
      return this[originalAmount$];
    }
    set originalAmount(value) {
      this[originalAmount$] = value;
    }
    get investorDate() {
      return this[investorDate$];
    }
    set investorDate(value) {
      this[investorDate$] = value;
    }
    toJson() {
      return new (IdentityMapOfString$dynamic()).from(["invoiceId", this.invoiceId, "owner", this.owner.toJson(), "supplier", this.supplier.toJson(), "offerAmount", this.offerAmount, "discount", this.discount, "investorDate", this.investorDate, "offerDate", this.offerDate, "investor", this.investor.toJson(), "customer", this.customer.toJson(), "originalAmount", this.originalAmount]);
    }
  };
  (invoice_offer.InvoiceOffer.new = function(opts) {
    let invoiceId = opts && 'invoiceId' in opts ? opts.invoiceId : null;
    let owner = opts && 'owner' in opts ? opts.owner : null;
    let supplier = opts && 'supplier' in opts ? opts.supplier : null;
    let investor = opts && 'investor' in opts ? opts.investor : null;
    let offerDate = opts && 'offerDate' in opts ? opts.offerDate : null;
    let offerAmount = opts && 'offerAmount' in opts ? opts.offerAmount : null;
    let discount = opts && 'discount' in opts ? opts.discount : null;
    let customer = opts && 'customer' in opts ? opts.customer : null;
    let originalAmount = opts && 'originalAmount' in opts ? opts.originalAmount : null;
    let investorDate = opts && 'investorDate' in opts ? opts.investorDate : null;
    this[invoiceId$] = invoiceId;
    this[owner$] = owner;
    this[supplier$] = supplier;
    this[investor$] = investor;
    this[offerDate$] = offerDate;
    this[offerAmount$] = offerAmount;
    this[discount$] = discount;
    this[customer$] = customer;
    this[originalAmount$] = originalAmount;
    this[investorDate$] = investorDate;
    ;
  }).prototype = invoice_offer.InvoiceOffer.prototype;
  (invoice_offer.InvoiceOffer.fromJson = function(data) {
    this[investorDate$] = null;
    this[originalAmount$] = null;
    this[customer$] = null;
    this[discount$] = null;
    this[offerAmount$] = null;
    this[offerDate$] = null;
    this[investor$] = null;
    this[supplier$] = null;
    this[owner$] = null;
    this[invoiceId$] = null;
    this.invoiceId = core.String._check(data[$_get]("invoiceId"));
    if (data[$_get]("owner") != null) {
      this.owner = new account.AccountInfo.fromJson(core.Map._check(data[$_get]("owner")));
    }
    if (data[$_get]("supplier") != null) {
      this.supplier = new account.AccountInfo.fromJson(core.Map._check(data[$_get]("supplier")));
    }
    if (data[$_get]("investor") != null) {
      this.investor = new account.AccountInfo.fromJson(core.Map._check(data[$_get]("investor")));
    }
    if (data[$_get]("customer") != null) {
      this.customer = new account.AccountInfo.fromJson(core.Map._check(data[$_get]("customer")));
    }
    this.offerDate = core.String._check(data[$_get]("offerDate"));
    if (core.int.is(data[$_get]("offerAmount"))) {
      this.offerAmount = core.double._check(dart.dsend(data[$_get]("offerAmount"), '*', [1.0]));
    }
    if (typeof data[$_get]("offerAmount") == 'number') {
      this.offerAmount = core.double._check(data[$_get]("offerAmount"));
    }
    if (core.int.is(data[$_get]("discount"))) {
      this.discount = core.double._check(dart.dsend(data[$_get]("discount"), '*', [1.0]));
    }
    if (typeof data[$_get]("discount") == 'number') {
      this.discount = core.double._check(data[$_get]("discount"));
    }
    this.investorDate = core.String._check(data[$_get]("investorDate"));
    if (core.int.is(data[$_get]("originalAmount"))) {
      this.originalAmount = core.double._check(dart.dsend(data[$_get]("originalAmount"), '*', [1.0]));
    }
    if (typeof data[$_get]("originalAmount") == 'number') {
      this.originalAmount = core.double._check(data[$_get]("originalAmount"));
    }
  }).prototype = invoice_offer.InvoiceOffer.prototype;
  dart.addTypeTests(invoice_offer.InvoiceOffer);
  dart.setMethodSignature(invoice_offer.InvoiceOffer, () => ({
    __proto__: dart.getMethods(invoice_offer.InvoiceOffer.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(invoice_offer.InvoiceOffer, "package:bfnlibrary/data/invoice_offer.dart");
  dart.setFieldSignature(invoice_offer.InvoiceOffer, () => ({
    __proto__: dart.getFields(invoice_offer.InvoiceOffer.__proto__),
    invoiceId: dart.fieldType(core.String),
    owner: dart.fieldType(account.AccountInfo),
    supplier: dart.fieldType(account.AccountInfo),
    investor: dart.fieldType(account.AccountInfo),
    customer: dart.fieldType(account.AccountInfo),
    offerDate: dart.fieldType(core.String),
    offerAmount: dart.fieldType(core.double),
    discount: dart.fieldType(core.double),
    originalAmount: dart.fieldType(core.double),
    investorDate: dart.fieldType(core.String)
  }));
  dart.trackLibraries("packages/bfnlibrary/data/invoice_offer", {
    "package:bfnlibrary/data/invoice_offer.dart": invoice_offer
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["invoice_offer.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;IAGS;;;;;;IACK;;;;;;IACA;;;;;;IAAU;;;;;;IAAU;;;;;;IACzB;;;;;;IACA;;;;;;IAAa;;;;;;IAAU;;;;;;IACvB;;;;;;;AAkD0B,YAAiB,2CAC5C,aAAa,gBACb,SAAS,AAAM,qBACf,YAAY,AAAS,wBACrB,eAAe,kBACf,YAAY,eACZ,gBAAgB,mBAChB,aAAa,gBACb,YAAY,AAAS,wBACrB,YAAY,AAAS,wBACrB,kBAAkB;IACnB;;;QA1DK;QACD;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;IATC;IACD;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;;EAAc;kDAEG;;;;;;;;;;;AACU,qBAA7B,mBAAY,AAAI,IAAA,QAAC;AACtB,QAAI,AAAI,IAAA,QAAC,YAAY;AAC6B,MAA3C,aAAoB,iDAAS,AAAI,IAAA,QAAC;;AAEzC,QAAI,AAAI,IAAA,QAAC,eAAe;AACgC,MAAjD,gBAAuB,iDAAS,AAAI,IAAA,QAAC;;AAE5C,QAAI,AAAI,IAAA,QAAC,eAAe;AACgC,MAAjD,gBAAuB,iDAAS,AAAI,IAAA,QAAC;;AAE5C,QAAI,AAAI,IAAA,QAAC,eAAe;AACgC,MAAjD,gBAAuB,iDAAS,AAAI,IAAA,QAAC;;AAEV,qBAA7B,mBAAY,AAAI,IAAA,QAAC;AACtB,QAAwB,YAApB,AAAI,IAAA,QAAC;AACsC,yBAAxC,mBAAkC,WAApB,AAAI,IAAA,QAAC,sBAAiB;;AAE3C,QAAwB,OAApB,AAAI,IAAA,QAAC;AAC+B,yBAAjC,mBAAc,AAAI,IAAA,QAAC;;AAE1B,QAAqB,YAAjB,AAAI,IAAA,QAAC;AACgC,sBAAlC,mBAA4B,WAAjB,AAAI,IAAA,QAAC,mBAAc;;AAErC,QAAqB,OAAjB,AAAI,IAAA,QAAC;AACyB,sBAA3B,mBAAW,AAAI,IAAA,QAAC;;AAEiB,wBAAnC,mBAAe,AAAI,IAAA,QAAC;AACzB,QAA2B,YAAvB,AAAI,IAAA,QAAC;AAC4C,4BAA9C,mBAAwC,WAAvB,AAAI,IAAA,QAAC,yBAAoB;;AAEjD,QAA2B,OAAvB,AAAI,IAAA,QAAC;AACqC,4BAAvC,mBAAiB,AAAI,IAAA,QAAC;;EAE/B","file":"invoice_offer.ddc.js"}');
  // Exports:
  return {
    data__invoice_offer: invoice_offer
  };
});

//# sourceMappingURL=invoice_offer.ddc.js.map
