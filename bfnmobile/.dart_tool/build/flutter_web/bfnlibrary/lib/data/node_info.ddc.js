define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const node_info = Object.create(dart.library);
  const $_get = dartx._get;
  const $add = dartx.add;
  const $forEach = dartx.forEach;
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  let dynamicToNull = () => (dynamicToNull = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  const addresses$ = dart.privateName(node_info, "NodeInfo.addresses");
  const platformVersion$ = dart.privateName(node_info, "NodeInfo.platformVersion");
  const serial$ = dart.privateName(node_info, "NodeInfo.serial");
  const webAPIUrl$ = dart.privateName(node_info, "NodeInfo.webAPIUrl");
  node_info.NodeInfo = class NodeInfo extends core.Object {
    get addresses() {
      return this[addresses$];
    }
    set addresses(value) {
      this[addresses$] = value;
    }
    get platformVersion() {
      return this[platformVersion$];
    }
    set platformVersion(value) {
      this[platformVersion$] = value;
    }
    get serial() {
      return this[serial$];
    }
    set serial(value) {
      this[serial$] = value;
    }
    get webAPIUrl() {
      return this[webAPIUrl$];
    }
    set webAPIUrl(value) {
      this[webAPIUrl$] = value;
    }
    toJson() {
      return new (IdentityMapOfString$dynamic()).from(["addresses", this.addresses, "platformVersion", this.platformVersion, "serial", this.serial, "webAPIUrl", this.webAPIUrl]);
    }
  };
  (node_info.NodeInfo.new = function(addresses, platformVersion, serial, webAPIUrl) {
    this[addresses$] = addresses;
    this[platformVersion$] = platformVersion;
    this[serial$] = serial;
    this[webAPIUrl$] = webAPIUrl;
    ;
  }).prototype = node_info.NodeInfo.prototype;
  (node_info.NodeInfo.fromJson = function(data) {
    this[webAPIUrl$] = null;
    this[serial$] = null;
    this[platformVersion$] = null;
    this[addresses$] = null;
    let list = core.List._check(data[$_get]("addresses"));
    this.addresses = JSArrayOfString().of([]);
    list[$forEach](dart.fn(a => {
      this.addresses[$add](core.String.as(a));
    }, dynamicToNull()));
    this.platformVersion = core.int._check(data[$_get]("platformVersion"));
    this.serial = core.int._check(data[$_get]("serial"));
    this.webAPIUrl = core.String._check(data[$_get]("webAPIUrl"));
  }).prototype = node_info.NodeInfo.prototype;
  dart.addTypeTests(node_info.NodeInfo);
  dart.setMethodSignature(node_info.NodeInfo, () => ({
    __proto__: dart.getMethods(node_info.NodeInfo.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(node_info.NodeInfo, "package:bfnlibrary/data/node_info.dart");
  dart.setFieldSignature(node_info.NodeInfo, () => ({
    __proto__: dart.getFields(node_info.NodeInfo.__proto__),
    addresses: dart.fieldType(core.List$(core.String)),
    platformVersion: dart.fieldType(core.int),
    serial: dart.fieldType(core.int),
    webAPIUrl: dart.fieldType(core.String)
  }));
  dart.trackLibraries("packages/bfnlibrary/data/node_info", {
    "package:bfnlibrary/data/node_info.dart": node_info
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["node_info.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;IACe;;;;;;IACT;;;;;;IACA;;;;;;IACG;;;;;;;AAe0B,YAAiB,2CAC5C,aAAa,gBACb,mBAAmB,sBACnB,UAAU,aACV,aAAa;IACd;;qCAlBS,WAAgB,iBAAsB,QAAa;IAAnD;IAAgB;IAAsB;IAAa;;EAAU;0CAErD;;;;;AACf,gCAAO,AAAI,IAAA,QAAC;AACM,IAAlB,iBAAY;AAGf,IAFF,AAAK,IAAD,WAAS,QAAC;AACmB,MAA1B,AAAU,qBAAM,eAAF,CAAC;;AAEwB,2BAAzC,gBAAkB,AAAI,IAAA,QAAC;AACA,kBAAvB,gBAAS,AAAI,IAAA,QAAC;AACe,qBAA7B,mBAAY,AAAI,IAAA,QAAC;EACxB","file":"node_info.ddc.js"}');
  // Exports:
  return {
    data__node_info: node_info
  };
});

//# sourceMappingURL=node_info.ddc.js.map
