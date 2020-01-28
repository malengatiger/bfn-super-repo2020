define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const fb_user = Object.create(dart.library);
  const $_get = dartx._get;
  const $add = dartx.add;
  const $_set = dartx._set;
  const $map = dartx.map;
  const $toList = dartx.toList;
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
  let JSArrayOfProviderData = () => (JSArrayOfProviderData = dart.constFn(_interceptors.JSArray$(fb_user.ProviderData)))();
  let dynamicToNull = () => (dynamicToNull = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  let LinkedMapOfString$dynamic = () => (LinkedMapOfString$dynamic = dart.constFn(_js_helper.LinkedMap$(core.String, dart.dynamic)))();
  let ProviderDataToMapOfString$dynamic = () => (ProviderDataToMapOfString$dynamic = dart.constFn(dart.fnType(MapOfString$dynamic(), [fb_user.ProviderData])))();
  const CT = Object.create(null);
  const uid$ = dart.privateName(fb_user, "UserRecord.uid");
  const email$ = dart.privateName(fb_user, "UserRecord.email");
  const phoneNumber$ = dart.privateName(fb_user, "UserRecord.phoneNumber");
  const emailVerified$ = dart.privateName(fb_user, "UserRecord.emailVerified");
  const displayName$ = dart.privateName(fb_user, "UserRecord.displayName");
  const photoUrl$ = dart.privateName(fb_user, "UserRecord.photoUrl");
  const disabled$ = dart.privateName(fb_user, "UserRecord.disabled");
  const tokensValidAfterTimestamp$ = dart.privateName(fb_user, "UserRecord.tokensValidAfterTimestamp");
  const userMetadata$ = dart.privateName(fb_user, "UserRecord.userMetadata");
  const customClaims$ = dart.privateName(fb_user, "UserRecord.customClaims");
  const providerId$ = dart.privateName(fb_user, "UserRecord.providerId");
  const providerData$ = dart.privateName(fb_user, "UserRecord.providerData");
  fb_user.UserRecord = class UserRecord extends core.Object {
    get uid() {
      return this[uid$];
    }
    set uid(value) {
      this[uid$] = value;
    }
    get email() {
      return this[email$];
    }
    set email(value) {
      this[email$] = value;
    }
    get phoneNumber() {
      return this[phoneNumber$];
    }
    set phoneNumber(value) {
      this[phoneNumber$] = value;
    }
    get emailVerified() {
      return this[emailVerified$];
    }
    set emailVerified(value) {
      this[emailVerified$] = value;
    }
    get displayName() {
      return this[displayName$];
    }
    set displayName(value) {
      this[displayName$] = value;
    }
    get photoUrl() {
      return this[photoUrl$];
    }
    set photoUrl(value) {
      this[photoUrl$] = value;
    }
    get disabled() {
      return this[disabled$];
    }
    set disabled(value) {
      this[disabled$] = value;
    }
    get tokensValidAfterTimestamp() {
      return this[tokensValidAfterTimestamp$];
    }
    set tokensValidAfterTimestamp(value) {
      this[tokensValidAfterTimestamp$] = value;
    }
    get userMetadata() {
      return this[userMetadata$];
    }
    set userMetadata(value) {
      this[userMetadata$] = value;
    }
    get customClaims() {
      return this[customClaims$];
    }
    set customClaims(value) {
      this[customClaims$] = value;
    }
    get providerId() {
      return this[providerId$];
    }
    set providerId(value) {
      this[providerId$] = value;
    }
    get providerData() {
      return this[providerData$];
    }
    set providerData(value) {
      this[providerData$] = value;
    }
    toJson() {
      let data = new (LinkedMapOfString$dynamic()).new();
      data[$_set]("uid", this.uid);
      data[$_set]("email", this.email);
      data[$_set]("phoneNumber", this.phoneNumber);
      data[$_set]("emailVerified", this.emailVerified);
      data[$_set]("displayName", this.displayName);
      data[$_set]("photoUrl", this.photoUrl);
      data[$_set]("disabled", this.disabled);
      data[$_set]("tokensValidAfterTimestamp", this.tokensValidAfterTimestamp);
      if (this.userMetadata != null) {
        data[$_set]("userMetadata", this.userMetadata.toJson());
      }
      if (this.customClaims != null) {
        data[$_set]("customClaims", this.customClaims.toJson());
      }
      data[$_set]("providerId", this.providerId);
      if (this.providerData != null) {
        data[$_set]("providerData", this.providerData[$map](MapOfString$dynamic(), dart.fn(v => v.toJson(), ProviderDataToMapOfString$dynamic()))[$toList]());
      }
      return data;
    }
  };
  (fb_user.UserRecord.new = function(opts) {
    let uid = opts && 'uid' in opts ? opts.uid : null;
    let email = opts && 'email' in opts ? opts.email : null;
    let phoneNumber = opts && 'phoneNumber' in opts ? opts.phoneNumber : null;
    let emailVerified = opts && 'emailVerified' in opts ? opts.emailVerified : null;
    let displayName = opts && 'displayName' in opts ? opts.displayName : null;
    let photoUrl = opts && 'photoUrl' in opts ? opts.photoUrl : null;
    let disabled = opts && 'disabled' in opts ? opts.disabled : null;
    let tokensValidAfterTimestamp = opts && 'tokensValidAfterTimestamp' in opts ? opts.tokensValidAfterTimestamp : null;
    let userMetadata = opts && 'userMetadata' in opts ? opts.userMetadata : null;
    let customClaims = opts && 'customClaims' in opts ? opts.customClaims : null;
    let providerId = opts && 'providerId' in opts ? opts.providerId : null;
    let providerData = opts && 'providerData' in opts ? opts.providerData : null;
    this[uid$] = uid;
    this[email$] = email;
    this[phoneNumber$] = phoneNumber;
    this[emailVerified$] = emailVerified;
    this[displayName$] = displayName;
    this[photoUrl$] = photoUrl;
    this[disabled$] = disabled;
    this[tokensValidAfterTimestamp$] = tokensValidAfterTimestamp;
    this[userMetadata$] = userMetadata;
    this[customClaims$] = customClaims;
    this[providerId$] = providerId;
    this[providerData$] = providerData;
    ;
  }).prototype = fb_user.UserRecord.prototype;
  (fb_user.UserRecord.fromJson = function(json) {
    this[providerData$] = null;
    this[providerId$] = null;
    this[customClaims$] = null;
    this[userMetadata$] = null;
    this[tokensValidAfterTimestamp$] = null;
    this[disabled$] = null;
    this[photoUrl$] = null;
    this[displayName$] = null;
    this[emailVerified$] = null;
    this[phoneNumber$] = null;
    this[email$] = null;
    this[uid$] = null;
    this.uid = core.String._check(json[$_get]("uid"));
    this.email = core.String._check(json[$_get]("email"));
    this.phoneNumber = core.String._check(json[$_get]("phoneNumber"));
    this.emailVerified = core.bool._check(json[$_get]("emailVerified"));
    this.displayName = core.String._check(json[$_get]("displayName"));
    this.photoUrl = core.Null._check(json[$_get]("photoUrl"));
    this.disabled = core.bool._check(json[$_get]("disabled"));
    this.tokensValidAfterTimestamp = core.int._check(json[$_get]("tokensValidAfterTimestamp"));
    this.userMetadata = json[$_get]("userMetadata") != null ? new fb_user.UserMetadata.fromJson(MapOfString$dynamic()._check(json[$_get]("userMetadata"))) : null;
    this.customClaims = json[$_get]("customClaims") != null ? new fb_user.CustomClaims.fromJson(MapOfString$dynamic()._check(json[$_get]("customClaims"))) : null;
    this.providerId = core.String._check(json[$_get]("providerId"));
    if (json[$_get]("providerData") != null) {
      this.providerData = JSArrayOfProviderData().of([]);
      dart.dsend(json[$_get]("providerData"), 'forEach', [dart.fn(v => {
          this.providerData[$add](new fb_user.ProviderData.fromJson(MapOfString$dynamic()._check(v)));
        }, dynamicToNull())]);
    }
  }).prototype = fb_user.UserRecord.prototype;
  dart.addTypeTests(fb_user.UserRecord);
  dart.setMethodSignature(fb_user.UserRecord, () => ({
    __proto__: dart.getMethods(fb_user.UserRecord.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(fb_user.UserRecord, "package:bfnlibrary/data/fb_user.dart");
  dart.setFieldSignature(fb_user.UserRecord, () => ({
    __proto__: dart.getFields(fb_user.UserRecord.__proto__),
    uid: dart.fieldType(core.String),
    email: dart.fieldType(core.String),
    phoneNumber: dart.fieldType(core.String),
    emailVerified: dart.fieldType(core.bool),
    displayName: dart.fieldType(core.String),
    photoUrl: dart.fieldType(core.Null),
    disabled: dart.fieldType(core.bool),
    tokensValidAfterTimestamp: dart.fieldType(core.int),
    userMetadata: dart.fieldType(fb_user.UserMetadata),
    customClaims: dart.fieldType(fb_user.CustomClaims),
    providerId: dart.fieldType(core.String),
    providerData: dart.fieldType(core.List$(fb_user.ProviderData))
  }));
  const creationTimestamp$ = dart.privateName(fb_user, "UserMetadata.creationTimestamp");
  const lastSignInTimestamp$ = dart.privateName(fb_user, "UserMetadata.lastSignInTimestamp");
  fb_user.UserMetadata = class UserMetadata extends core.Object {
    get creationTimestamp() {
      return this[creationTimestamp$];
    }
    set creationTimestamp(value) {
      this[creationTimestamp$] = value;
    }
    get lastSignInTimestamp() {
      return this[lastSignInTimestamp$];
    }
    set lastSignInTimestamp(value) {
      this[lastSignInTimestamp$] = value;
    }
    toJson() {
      let data = new (LinkedMapOfString$dynamic()).new();
      data[$_set]("creationTimestamp", this.creationTimestamp);
      data[$_set]("lastSignInTimestamp", this.lastSignInTimestamp);
      return data;
    }
  };
  (fb_user.UserMetadata.new = function(opts) {
    let creationTimestamp = opts && 'creationTimestamp' in opts ? opts.creationTimestamp : null;
    let lastSignInTimestamp = opts && 'lastSignInTimestamp' in opts ? opts.lastSignInTimestamp : null;
    this[creationTimestamp$] = creationTimestamp;
    this[lastSignInTimestamp$] = lastSignInTimestamp;
    ;
  }).prototype = fb_user.UserMetadata.prototype;
  (fb_user.UserMetadata.fromJson = function(json) {
    this[lastSignInTimestamp$] = null;
    this[creationTimestamp$] = null;
    this.creationTimestamp = core.int._check(json[$_get]("creationTimestamp"));
    this.lastSignInTimestamp = core.int._check(json[$_get]("lastSignInTimestamp"));
  }).prototype = fb_user.UserMetadata.prototype;
  dart.addTypeTests(fb_user.UserMetadata);
  dart.setMethodSignature(fb_user.UserMetadata, () => ({
    __proto__: dart.getMethods(fb_user.UserMetadata.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(fb_user.UserMetadata, "package:bfnlibrary/data/fb_user.dart");
  dart.setFieldSignature(fb_user.UserMetadata, () => ({
    __proto__: dart.getFields(fb_user.UserMetadata.__proto__),
    creationTimestamp: dart.fieldType(core.int),
    lastSignInTimestamp: dart.fieldType(core.int)
  }));
  fb_user.CustomClaims = class CustomClaims extends core.Object {
    toJson() {
      let data = new (LinkedMapOfString$dynamic()).new();
      return data;
    }
  };
  (fb_user.CustomClaims.new = function() {
    ;
  }).prototype = fb_user.CustomClaims.prototype;
  (fb_user.CustomClaims.fromJson = function(json) {
  }).prototype = fb_user.CustomClaims.prototype;
  dart.addTypeTests(fb_user.CustomClaims);
  dart.setMethodSignature(fb_user.CustomClaims, () => ({
    __proto__: dart.getMethods(fb_user.CustomClaims.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(fb_user.CustomClaims, "package:bfnlibrary/data/fb_user.dart");
  const uid$0 = dart.privateName(fb_user, "ProviderData.uid");
  const displayName$0 = dart.privateName(fb_user, "ProviderData.displayName");
  const email$0 = dart.privateName(fb_user, "ProviderData.email");
  const phoneNumber$0 = dart.privateName(fb_user, "ProviderData.phoneNumber");
  const photoUrl$0 = dart.privateName(fb_user, "ProviderData.photoUrl");
  const providerId$0 = dart.privateName(fb_user, "ProviderData.providerId");
  fb_user.ProviderData = class ProviderData extends core.Object {
    get uid() {
      return this[uid$0];
    }
    set uid(value) {
      this[uid$0] = value;
    }
    get displayName() {
      return this[displayName$0];
    }
    set displayName(value) {
      this[displayName$0] = value;
    }
    get email() {
      return this[email$0];
    }
    set email(value) {
      this[email$0] = value;
    }
    get phoneNumber() {
      return this[phoneNumber$0];
    }
    set phoneNumber(value) {
      this[phoneNumber$0] = value;
    }
    get photoUrl() {
      return this[photoUrl$0];
    }
    set photoUrl(value) {
      this[photoUrl$0] = value;
    }
    get providerId() {
      return this[providerId$0];
    }
    set providerId(value) {
      this[providerId$0] = value;
    }
    toJson() {
      let data = new (LinkedMapOfString$dynamic()).new();
      data[$_set]("uid", this.uid);
      data[$_set]("displayName", this.displayName);
      data[$_set]("email", this.email);
      data[$_set]("phoneNumber", this.phoneNumber);
      data[$_set]("photoUrl", this.photoUrl);
      data[$_set]("providerId", this.providerId);
      return data;
    }
  };
  (fb_user.ProviderData.new = function(opts) {
    let uid = opts && 'uid' in opts ? opts.uid : null;
    let displayName = opts && 'displayName' in opts ? opts.displayName : null;
    let email = opts && 'email' in opts ? opts.email : null;
    let phoneNumber = opts && 'phoneNumber' in opts ? opts.phoneNumber : null;
    let photoUrl = opts && 'photoUrl' in opts ? opts.photoUrl : null;
    let providerId = opts && 'providerId' in opts ? opts.providerId : null;
    this[uid$0] = uid;
    this[displayName$0] = displayName;
    this[email$0] = email;
    this[phoneNumber$0] = phoneNumber;
    this[photoUrl$0] = photoUrl;
    this[providerId$0] = providerId;
    ;
  }).prototype = fb_user.ProviderData.prototype;
  (fb_user.ProviderData.fromJson = function(json) {
    this[providerId$0] = null;
    this[photoUrl$0] = null;
    this[phoneNumber$0] = null;
    this[email$0] = null;
    this[displayName$0] = null;
    this[uid$0] = null;
    this.uid = core.String._check(json[$_get]("uid"));
    this.displayName = core.String._check(json[$_get]("displayName"));
    this.email = core.String._check(json[$_get]("email"));
    this.phoneNumber = core.String._check(json[$_get]("phoneNumber"));
    this.photoUrl = core.Null._check(json[$_get]("photoUrl"));
    this.providerId = core.String._check(json[$_get]("providerId"));
  }).prototype = fb_user.ProviderData.prototype;
  dart.addTypeTests(fb_user.ProviderData);
  dart.setMethodSignature(fb_user.ProviderData, () => ({
    __proto__: dart.getMethods(fb_user.ProviderData.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(fb_user.ProviderData, "package:bfnlibrary/data/fb_user.dart");
  dart.setFieldSignature(fb_user.ProviderData, () => ({
    __proto__: dart.getFields(fb_user.ProviderData.__proto__),
    uid: dart.fieldType(core.String),
    displayName: dart.fieldType(core.String),
    email: dart.fieldType(core.String),
    phoneNumber: dart.fieldType(core.String),
    photoUrl: dart.fieldType(core.Null),
    providerId: dart.fieldType(core.String)
  }));
  dart.trackLibraries("packages/bfnlibrary/data/fb_user", {
    "package:bfnlibrary/data/fb_user.dart": fb_user
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["fb_user.dart"],"names":[],"mappings":"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","file":"fb_user.ddc.js"}');
  // Exports:
  return {
    data__fb_user: fb_user
  };
});

//# sourceMappingURL=fb_user.ddc.js.map
