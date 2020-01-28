define(['dart_sdk', 'packages/bfnlibrary/data/account'], function(dart_sdk, packages__bfnlibrary__data__account) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const account = packages__bfnlibrary__data__account.data__account;
  const invoice = Object.create(dart.library);
  const $_get = dartx._get;
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  const invoiceId$ = dart.privateName(invoice, "Invoice.invoiceId");
  const invoiceNumber$ = dart.privateName(invoice, "Invoice.invoiceNumber");
  const description$ = dart.privateName(invoice, "Invoice.description");
  const supplier$ = dart.privateName(invoice, "Invoice.supplier");
  const customer$ = dart.privateName(invoice, "Invoice.customer");
  const dateRegistered$ = dart.privateName(invoice, "Invoice.dateRegistered");
  const amount$ = dart.privateName(invoice, "Invoice.amount");
  const valueAddedTax$ = dart.privateName(invoice, "Invoice.valueAddedTax");
  const totalAmount$ = dart.privateName(invoice, "Invoice.totalAmount");
  invoice.Invoice = class Invoice extends core.Object {
    get invoiceId() {
      return this[invoiceId$];
    }
    set invoiceId(value) {
      this[invoiceId$] = value;
    }
    get invoiceNumber() {
      return this[invoiceNumber$];
    }
    set invoiceNumber(value) {
      this[invoiceNumber$] = value;
    }
    get description() {
      return this[description$];
    }
    set description(value) {
      this[description$] = value;
    }
    get supplier() {
      return this[supplier$];
    }
    set supplier(value) {
      this[supplier$] = value;
    }
    get customer() {
      return this[customer$];
    }
    set customer(value) {
      this[customer$] = value;
    }
    get dateRegistered() {
      return this[dateRegistered$];
    }
    set dateRegistered(value) {
      this[dateRegistered$] = value;
    }
    get amount() {
      return this[amount$];
    }
    set amount(value) {
      this[amount$] = value;
    }
    get valueAddedTax() {
      return this[valueAddedTax$];
    }
    set valueAddedTax(value) {
      this[valueAddedTax$] = value;
    }
    get totalAmount() {
      return this[totalAmount$];
    }
    set totalAmount(value) {
      this[totalAmount$] = value;
    }
    toJson() {
      return new (IdentityMapOfString$dynamic()).from(["invoiceId", this.invoiceId, "invoiceNumber", this.invoiceNumber, "description", this.description, "supplier", this.supplier.toJson(), "amount", this.amount, "valueAddedTax", this.valueAddedTax, "totalAmount", this.totalAmount, "dateRegistered", this.dateRegistered, "customer", this.customer.toJson()]);
    }
  };
  (invoice.Invoice.new = function(opts) {
    let invoiceId = opts && 'invoiceId' in opts ? opts.invoiceId : null;
    let invoiceNumber = opts && 'invoiceNumber' in opts ? opts.invoiceNumber : null;
    let description = opts && 'description' in opts ? opts.description : null;
    let supplier = opts && 'supplier' in opts ? opts.supplier : null;
    let customer = opts && 'customer' in opts ? opts.customer : null;
    let dateRegistered = opts && 'dateRegistered' in opts ? opts.dateRegistered : null;
    let amount = opts && 'amount' in opts ? opts.amount : null;
    let valueAddedTax = opts && 'valueAddedTax' in opts ? opts.valueAddedTax : null;
    let totalAmount = opts && 'totalAmount' in opts ? opts.totalAmount : null;
    this[invoiceId$] = invoiceId;
    this[invoiceNumber$] = invoiceNumber;
    this[description$] = description;
    this[supplier$] = supplier;
    this[customer$] = customer;
    this[dateRegistered$] = dateRegistered;
    this[amount$] = amount;
    this[valueAddedTax$] = valueAddedTax;
    this[totalAmount$] = totalAmount;
    ;
  }).prototype = invoice.Invoice.prototype;
  (invoice.Invoice.fromJson = function(data) {
    this[totalAmount$] = null;
    this[valueAddedTax$] = null;
    this[amount$] = null;
    this[dateRegistered$] = null;
    this[customer$] = null;
    this[supplier$] = null;
    this[description$] = null;
    this[invoiceNumber$] = null;
    this[invoiceId$] = null;
    this.invoiceId = core.String._check(data[$_get]("invoiceId"));
    this.invoiceNumber = core.String._check(data[$_get]("invoiceNumber"));
    this.description = core.String._check(data[$_get]("description"));
    if (data[$_get]("supplier") != null) {
      this.supplier = new account.AccountInfo.fromJson(core.Map._check(data[$_get]("supplier")));
    }
    if (data[$_get]("customer") != null) {
      this.customer = new account.AccountInfo.fromJson(core.Map._check(data[$_get]("customer")));
    }
    this.dateRegistered = core.String._check(data[$_get]("dateRegistered"));
    if (core.int.is(data[$_get]("amount"))) {
      this.amount = core.double._check(dart.dsend(data[$_get]("amount"), '*', [1.0]));
    }
    if (typeof data[$_get]("amount") == 'number') {
      this.amount = core.double._check(data[$_get]("amount"));
    }
    if (core.int.is(data[$_get]("valueAddedTax"))) {
      this.valueAddedTax = core.double._check(dart.dsend(data[$_get]("valueAddedTax"), '*', [1.0]));
    }
    if (typeof data[$_get]("valueAddedTax") == 'number') {
      this.valueAddedTax = core.double._check(data[$_get]("valueAddedTax"));
    }
    if (core.int.is(data[$_get]("totalAmount"))) {
      this.totalAmount = core.double._check(dart.dsend(data[$_get]("totalAmount"), '*', [1.0]));
    }
    if (typeof data[$_get]("totalAmount") == 'number') {
      this.totalAmount = core.double._check(data[$_get]("totalAmount"));
    }
  }).prototype = invoice.Invoice.prototype;
  dart.addTypeTests(invoice.Invoice);
  dart.setMethodSignature(invoice.Invoice, () => ({
    __proto__: dart.getMethods(invoice.Invoice.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(invoice.Invoice, "package:bfnlibrary/data/invoice.dart");
  dart.setFieldSignature(invoice.Invoice, () => ({
    __proto__: dart.getFields(invoice.Invoice.__proto__),
    invoiceId: dart.fieldType(core.String),
    invoiceNumber: dart.fieldType(core.String),
    description: dart.fieldType(core.String),
    supplier: dart.fieldType(account.AccountInfo),
    customer: dart.fieldType(account.AccountInfo),
    dateRegistered: dart.fieldType(core.String),
    amount: dart.fieldType(core.double),
    valueAddedTax: dart.fieldType(core.double),
    totalAmount: dart.fieldType(core.double)
  }));
  dart.trackLibraries("packages/bfnlibrary/data/invoice", {
    "package:bfnlibrary/data/invoice.dart": invoice
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["invoice.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;IAGS;;;;;;IACA;;;;;;IACA;;;;;;IACK;;;;;;IAAU;;;;;;IACf;;;;;;IACA;;;;;;IAAQ;;;;;;IAAe;;;;;;;AA4CG,YAAiB,2CAC5C,aAAa,gBACb,iBAAiB,oBACjB,eAAe,kBACf,YAAY,AAAS,wBACrB,UAAU,aACV,iBAAiB,oBACjB,eAAe,kBACf,kBAAkB,qBAClB,YAAY,AAAS;IACtB;;;QAnDK;QACD;QACA;QACA;QACA;QACA;QACA;QACA;QACA;IARC;IACD;IACA;IACA;IACA;IACA;IACA;IACA;IACA;;EAAa;uCAED;;;;;;;;;;AACe,qBAA7B,mBAAY,AAAI,IAAA,QAAC;AACoB,yBAArC,mBAAgB,AAAI,IAAA,QAAC;AACY,uBAAjC,mBAAc,AAAI,IAAA,QAAC;AACxB,QAAI,AAAI,IAAA,QAAC,eAAe;AACgC,MAAjD,gBAAuB,iDAAS,AAAI,IAAA,QAAC;;AAE5C,QAAI,AAAI,IAAA,QAAC,eAAe;AACgC,MAAjD,gBAAuB,iDAAS,AAAI,IAAA,QAAC;;AAEA,0BAAvC,mBAAiB,AAAI,IAAA,QAAC;AAC3B,QAAmB,YAAf,AAAI,IAAA,QAAC;AAC4B,oBAA9B,mBAAwB,WAAf,AAAI,IAAA,QAAC,iBAAY;;AAEjC,QAAmB,OAAf,AAAI,IAAA,QAAC;AACqB,oBAAvB,mBAAS,AAAI,IAAA,QAAC;;AAErB,QAA0B,YAAtB,AAAI,IAAA,QAAC;AAC0C,2BAA5C,mBAAsC,WAAtB,AAAI,IAAA,QAAC,wBAAmB;;AAE/C,QAA0B,OAAtB,AAAI,IAAA,QAAC;AACmC,2BAArC,mBAAgB,AAAI,IAAA,QAAC;;AAE5B,QAAwB,YAApB,AAAI,IAAA,QAAC;AACsC,yBAAxC,mBAAkC,WAApB,AAAI,IAAA,QAAC,sBAAiB;;AAE3C,QAAwB,OAApB,AAAI,IAAA,QAAC;AAC+B,yBAAjC,mBAAc,AAAI,IAAA,QAAC;;EAE5B","file":"invoice.ddc.js"}');
  // Exports:
  return {
    data__invoice: invoice
  };
});

//# sourceMappingURL=invoice.ddc.js.map
