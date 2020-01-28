define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const profile = Object.create(dart.library);
  const $_get = dartx._get;
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  const issuedBy$ = dart.privateName(profile, "InvestorProfile.issuedBy");
  const accountId$ = dart.privateName(profile, "InvestorProfile.accountId");
  const date$ = dart.privateName(profile, "InvestorProfile.date");
  const minimumInvoiceAmount$ = dart.privateName(profile, "InvestorProfile.minimumInvoiceAmount");
  const defaultDiscount$ = dart.privateName(profile, "InvestorProfile.defaultDiscount");
  const maximumInvoiceAmount$ = dart.privateName(profile, "InvestorProfile.maximumInvoiceAmount");
  const totalInvestment$ = dart.privateName(profile, "InvestorProfile.totalInvestment");
  profile.InvestorProfile = class InvestorProfile extends core.Object {
    get issuedBy() {
      return this[issuedBy$];
    }
    set issuedBy(value) {
      this[issuedBy$] = value;
    }
    get accountId() {
      return this[accountId$];
    }
    set accountId(value) {
      this[accountId$] = value;
    }
    get date() {
      return this[date$];
    }
    set date(value) {
      this[date$] = value;
    }
    get minimumInvoiceAmount() {
      return this[minimumInvoiceAmount$];
    }
    set minimumInvoiceAmount(value) {
      this[minimumInvoiceAmount$] = value;
    }
    get defaultDiscount() {
      return this[defaultDiscount$];
    }
    set defaultDiscount(value) {
      this[defaultDiscount$] = value;
    }
    get maximumInvoiceAmount() {
      return this[maximumInvoiceAmount$];
    }
    set maximumInvoiceAmount(value) {
      this[maximumInvoiceAmount$] = value;
    }
    get totalInvestment() {
      return this[totalInvestment$];
    }
    set totalInvestment(value) {
      this[totalInvestment$] = value;
    }
    toJson() {
      return new (IdentityMapOfString$dynamic()).from(["issuedBy", this.issuedBy, "accountId", this.accountId, "minimumInvoiceAmount", this.minimumInvoiceAmount, "maximumInvoiceAmount", this.maximumInvoiceAmount, "date", this.date, "defaultDiscount", this.defaultDiscount, "totalInvestment", this.totalInvestment]);
    }
  };
  (profile.InvestorProfile.new = function(opts) {
    let issuedBy = opts && 'issuedBy' in opts ? opts.issuedBy : null;
    let accountId = opts && 'accountId' in opts ? opts.accountId : null;
    let minimumInvoiceAmount = opts && 'minimumInvoiceAmount' in opts ? opts.minimumInvoiceAmount : null;
    let totalInvestment = opts && 'totalInvestment' in opts ? opts.totalInvestment : null;
    let defaultDiscount = opts && 'defaultDiscount' in opts ? opts.defaultDiscount : null;
    let date = opts && 'date' in opts ? opts.date : null;
    let maximumInvoiceAmount = opts && 'maximumInvoiceAmount' in opts ? opts.maximumInvoiceAmount : null;
    this[issuedBy$] = issuedBy;
    this[accountId$] = accountId;
    this[minimumInvoiceAmount$] = minimumInvoiceAmount;
    this[totalInvestment$] = totalInvestment;
    this[defaultDiscount$] = defaultDiscount;
    this[date$] = date;
    this[maximumInvoiceAmount$] = maximumInvoiceAmount;
    ;
  }).prototype = profile.InvestorProfile.prototype;
  (profile.InvestorProfile.fromJson = function(data) {
    this[maximumInvoiceAmount$] = null;
    this[date$] = null;
    this[defaultDiscount$] = null;
    this[totalInvestment$] = null;
    this[minimumInvoiceAmount$] = null;
    this[accountId$] = null;
    this[issuedBy$] = null;
    this.issuedBy = core.String._check(data[$_get]("issuedBy"));
    this.accountId = core.String._check(data[$_get]("accountId"));
    this.minimumInvoiceAmount = core.double._check(data[$_get]("minimumInvoiceAmount"));
    this.maximumInvoiceAmount = core.double._check(data[$_get]("maximumInvoiceAmount"));
    this.defaultDiscount = core.double._check(data[$_get]("defaultDiscount"));
    this.date = core.String._check(data[$_get]("date"));
    this.totalInvestment = core.double._check(data[$_get]("totalInvestment"));
  }).prototype = profile.InvestorProfile.prototype;
  dart.addTypeTests(profile.InvestorProfile);
  dart.setMethodSignature(profile.InvestorProfile, () => ({
    __proto__: dart.getMethods(profile.InvestorProfile.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(profile.InvestorProfile, "package:bfnlibrary/data/profile.dart");
  dart.setFieldSignature(profile.InvestorProfile, () => ({
    __proto__: dart.getFields(profile.InvestorProfile.__proto__),
    issuedBy: dart.fieldType(core.String),
    accountId: dart.fieldType(core.String),
    date: dart.fieldType(core.String),
    minimumInvoiceAmount: dart.fieldType(core.double),
    defaultDiscount: dart.fieldType(core.double),
    maximumInvoiceAmount: dart.fieldType(core.double),
    totalInvestment: dart.fieldType(core.double)
  }));
  const issuedBy$0 = dart.privateName(profile, "SupplierProfile.issuedBy");
  const accountId$0 = dart.privateName(profile, "SupplierProfile.accountId");
  const date$0 = dart.privateName(profile, "SupplierProfile.date");
  const maximumDiscount$ = dart.privateName(profile, "SupplierProfile.maximumDiscount");
  profile.SupplierProfile = class SupplierProfile extends core.Object {
    get issuedBy() {
      return this[issuedBy$0];
    }
    set issuedBy(value) {
      this[issuedBy$0] = value;
    }
    get accountId() {
      return this[accountId$0];
    }
    set accountId(value) {
      this[accountId$0] = value;
    }
    get date() {
      return this[date$0];
    }
    set date(value) {
      this[date$0] = value;
    }
    get maximumDiscount() {
      return this[maximumDiscount$];
    }
    set maximumDiscount(value) {
      this[maximumDiscount$] = value;
    }
    toJson() {
      return new (IdentityMapOfString$dynamic()).from(["issuedBy", this.issuedBy, "accountId", this.accountId, "maximumDiscount", this.maximumDiscount, "date", this.date]);
    }
  };
  (profile.SupplierProfile.new = function(opts) {
    let issuedBy = opts && 'issuedBy' in opts ? opts.issuedBy : null;
    let accountId = opts && 'accountId' in opts ? opts.accountId : null;
    let date = opts && 'date' in opts ? opts.date : null;
    let maximumDiscount = opts && 'maximumDiscount' in opts ? opts.maximumDiscount : null;
    this[issuedBy$0] = issuedBy;
    this[accountId$0] = accountId;
    this[date$0] = date;
    this[maximumDiscount$] = maximumDiscount;
    ;
  }).prototype = profile.SupplierProfile.prototype;
  (profile.SupplierProfile.fromJson = function(data) {
    this[maximumDiscount$] = null;
    this[date$0] = null;
    this[accountId$0] = null;
    this[issuedBy$0] = null;
    this.issuedBy = core.String._check(data[$_get]("issuedBy"));
    this.accountId = core.String._check(data[$_get]("accountId"));
    this.maximumDiscount = core.double._check(data[$_get]("maximumDiscount"));
    this.date = core.String._check(data[$_get]("date"));
  }).prototype = profile.SupplierProfile.prototype;
  dart.addTypeTests(profile.SupplierProfile);
  dart.setMethodSignature(profile.SupplierProfile, () => ({
    __proto__: dart.getMethods(profile.SupplierProfile.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(profile.SupplierProfile, "package:bfnlibrary/data/profile.dart");
  dart.setFieldSignature(profile.SupplierProfile, () => ({
    __proto__: dart.getFields(profile.SupplierProfile.__proto__),
    issuedBy: dart.fieldType(core.String),
    accountId: dart.fieldType(core.String),
    date: dart.fieldType(core.String),
    maximumDiscount: dart.fieldType(core.double)
  }));
  dart.trackLibraries("packages/bfnlibrary/data/profile", {
    "package:bfnlibrary/data/profile.dart": profile
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["profile.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;IAGS;;;;;;IACA;;;;;;IAAW;;;;;;IACX;;;;;;IAAsB;;;;;;IACtB;;;;;;IAAsB;;;;;;;AAqBI,YAAiB,2CAC5C,YAAY,eACZ,aAAa,gBACb,wBAAwB,2BACxB,wBAAwB,2BACxB,QAAQ,WACR,mBAAmB,sBACnB,mBAAmB;IACpB;;;QA1BK;QACS;QACA;QACA;QACA;QACA;QACA;IANT;IACS;IACA;IACA;IACA;IACA;IACA;;EAAsB;+CAEZ;;;;;;;;AACK,oBAA3B,mBAAW,AAAI,IAAA,QAAC;AACa,qBAA7B,mBAAY,AAAI,IAAA,QAAC;AACkC,gCAAnD,mBAAuB,AAAI,IAAA,QAAC;AACuB,gCAAnD,mBAAuB,AAAI,IAAA,QAAC;AACa,2BAAzC,mBAAkB,AAAI,IAAA,QAAC;AACJ,gBAAnB,mBAAO,AAAI,IAAA,QAAC;AAC6B,2BAAzC,mBAAkB,AAAI,IAAA,QAAC;EAC9B;;;;;;;;;;;;;;;;;;;;;;IAcO;;;;;;IACA;;;;;;IAAW;;;;;;IACX;;;;;;;AAe0B,YAAiB,2CAC5C,YAAY,eACZ,aAAa,gBACb,mBAAmB,sBACnB,QAAQ;IACT;;;QAjBK;QACS;QACA;QACA;IAHT;IACS;IACA;IACA;;EAAiB;+CAEP;;;;;AACK,oBAA3B,mBAAW,AAAI,IAAA,QAAC;AACa,qBAA7B,mBAAY,AAAI,IAAA,QAAC;AACwB,2BAAzC,mBAAkB,AAAI,IAAA,QAAC;AACJ,gBAAnB,mBAAO,AAAI,IAAA,QAAC;EACnB","file":"profile.ddc.js"}');
  // Exports:
  return {
    data__profile: profile
  };
});

//# sourceMappingURL=profile.ddc.js.map
