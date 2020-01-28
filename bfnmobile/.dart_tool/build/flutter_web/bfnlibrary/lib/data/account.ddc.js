define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const account = Object.create(dart.library);
  const $_get = dartx._get;
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  const identifier$ = dart.privateName(account, "AccountInfo.identifier");
  const host$ = dart.privateName(account, "AccountInfo.host");
  const name$ = dart.privateName(account, "AccountInfo.name");
  const status$ = dart.privateName(account, "AccountInfo.status");
  account.AccountInfo = class AccountInfo extends core.Object {
    get identifier() {
      return this[identifier$];
    }
    set identifier(value) {
      this[identifier$] = value;
    }
    get host() {
      return this[host$];
    }
    set host(value) {
      this[host$] = value;
    }
    get name() {
      return this[name$];
    }
    set name(value) {
      this[name$] = value;
    }
    get status() {
      return this[status$];
    }
    set status(value) {
      this[status$] = value;
    }
    toJson() {
      return new (IdentityMapOfString$dynamic()).from(["identifier", this.identifier, "host", this.host, "name", this.name, "status", this.status]);
    }
  };
  (account.AccountInfo.new = function(identifier, host, name, status) {
    this[identifier$] = identifier;
    this[host$] = host;
    this[name$] = name;
    this[status$] = status;
    ;
  }).prototype = account.AccountInfo.prototype;
  (account.AccountInfo.fromJson = function(data) {
    this[status$] = null;
    this[name$] = null;
    this[host$] = null;
    this[identifier$] = null;
    this.identifier = core.String._check(data[$_get]("identifier"));
    this.host = core.String._check(data[$_get]("host"));
    this.name = core.String._check(data[$_get]("name"));
    this.status = core.String._check(data[$_get]("status"));
  }).prototype = account.AccountInfo.prototype;
  dart.addTypeTests(account.AccountInfo);
  dart.setMethodSignature(account.AccountInfo, () => ({
    __proto__: dart.getMethods(account.AccountInfo.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(account.AccountInfo, "package:bfnlibrary/data/account.dart");
  dart.setFieldSignature(account.AccountInfo, () => ({
    __proto__: dart.getFields(account.AccountInfo.__proto__),
    identifier: dart.fieldType(core.String),
    host: dart.fieldType(core.String),
    name: dart.fieldType(core.String),
    status: dart.fieldType(core.String)
  }));
  dart.trackLibraries("packages/bfnlibrary/data/account", {
    "package:bfnlibrary/data/account.dart": account
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["account.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;IACS;;;;;;IACA;;;;;;IACA;;;;;;IACA;;;;;;;AAW0B,YAAiB,2CAC5C,cAAc,iBACd,QAAQ,WACR,QAAQ,WACR,UAAU;IACX;;sCAdY,YAAiB,MAAW,MAAW;IAAvC;IAAiB;IAAW;IAAW;;EAAO;2CAEtC;;;;;AACa,sBAA/B,mBAAa,AAAI,IAAA,QAAC;AACC,gBAAnB,mBAAO,AAAI,IAAA,QAAC;AACO,gBAAnB,mBAAO,AAAI,IAAA,QAAC;AACW,kBAAvB,mBAAS,AAAI,IAAA,QAAC;EACrB","file":"account.ddc.js"}');
  // Exports:
  return {
    data__account: account
  };
});

//# sourceMappingURL=account.ddc.js.map
