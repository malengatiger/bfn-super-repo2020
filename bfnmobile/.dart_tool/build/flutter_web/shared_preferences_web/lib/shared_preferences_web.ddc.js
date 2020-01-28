define(['dart_sdk', 'packages/shared_preferences_platform_interface/method_channel_shared_preferences'], function(dart_sdk, packages__shared_preferences_platform_interface__method_channel_shared_preferences) {
  'use strict';
  const core = dart_sdk.core;
  const html = dart_sdk.html;
  const async = dart_sdk.async;
  const _js_helper = dart_sdk._js_helper;
  const _interceptors = dart_sdk._interceptors;
  const convert = dart_sdk.convert;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const shared_preferences_platform_interface = packages__shared_preferences_platform_interface__method_channel_shared_preferences.shared_preferences_platform_interface;
  const shared_preferences_web = Object.create(dart.library);
  const $remove = dartx.remove;
  const $_get = dartx._get;
  const $_set = dartx._set;
  const $startsWith = dartx.startsWith;
  const $keys = dartx.keys;
  const $add = dartx.add;
  const $cast = dartx.cast;
  let IdentityMapOfString$Object = () => (IdentityMapOfString$Object = dart.constFn(_js_helper.IdentityMap$(core.String, core.Object)))();
  let MapOfString$Object = () => (MapOfString$Object = dart.constFn(core.Map$(core.String, core.Object)))();
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  const CT = Object.create(null);
  const _storedFlutterKeys = dart.privateName(shared_preferences_web, "_storedFlutterKeys");
  const _decodeValue = dart.privateName(shared_preferences_web, "_decodeValue");
  const _checkPrefix = dart.privateName(shared_preferences_web, "_checkPrefix");
  const _encodeValue = dart.privateName(shared_preferences_web, "_encodeValue");
  shared_preferences_web.SharedPreferencesPlugin = class SharedPreferencesPlugin extends shared_preferences_platform_interface.SharedPreferencesStorePlatform {
    static registerWith(registrar) {
      shared_preferences_platform_interface.SharedPreferencesStorePlatform.instance = new shared_preferences_web.SharedPreferencesPlugin.new();
    }
    clear() {
      return async.async(core.bool, (function* clear() {
        for (let key of this[_storedFlutterKeys]) {
          html.window.localStorage[$remove](key);
        }
        return true;
      }).bind(this));
    }
    getAll() {
      return async.async(MapOfString$Object(), (function* getAll() {
        let allData = new (IdentityMapOfString$Object()).new();
        for (let key of this[_storedFlutterKeys]) {
          allData[$_set](key, this[_decodeValue](html.window.localStorage[$_get](key)));
        }
        return allData;
      }).bind(this));
    }
    remove(key) {
      return async.async(core.bool, (function* remove() {
        this[_checkPrefix](key);
        html.window.localStorage[$remove](key);
        return true;
      }).bind(this));
    }
    setValue(valueType, key, value) {
      return async.async(core.bool, (function* setValue() {
        this[_checkPrefix](key);
        html.window.localStorage[$_set](key, this[_encodeValue](value));
        return true;
      }).bind(this));
    }
    [_checkPrefix](key) {
      if (!key[$startsWith]("flutter.")) {
        dart.throw(new core.FormatException.new("Shared preferences keys must start with prefix \"flutter.\".", key, 0));
      }
    }
    get [_storedFlutterKeys]() {
      let keys = JSArrayOfString().of([]);
      for (let key of html.window.localStorage[$keys]) {
        if (key[$startsWith]("flutter.")) {
          keys[$add](key);
        }
      }
      return keys;
    }
    [_encodeValue](value) {
      return convert.json.encode(value);
    }
    [_decodeValue](encodedValue) {
      let decodedValue = convert.json.decode(encodedValue);
      if (core.List.is(decodedValue)) {
        return decodedValue[$cast](core.String);
      }
      return decodedValue;
    }
  };
  (shared_preferences_web.SharedPreferencesPlugin.new = function() {
    ;
  }).prototype = shared_preferences_web.SharedPreferencesPlugin.prototype;
  dart.addTypeTests(shared_preferences_web.SharedPreferencesPlugin);
  dart.setMethodSignature(shared_preferences_web.SharedPreferencesPlugin, () => ({
    __proto__: dart.getMethods(shared_preferences_web.SharedPreferencesPlugin.__proto__),
    clear: dart.fnType(async.Future$(core.bool), []),
    getAll: dart.fnType(async.Future$(core.Map$(core.String, core.Object)), []),
    remove: dart.fnType(async.Future$(core.bool), [core.String]),
    setValue: dart.fnType(async.Future$(core.bool), [core.String, core.String, core.Object]),
    [_checkPrefix]: dart.fnType(dart.void, [core.String]),
    [_encodeValue]: dart.fnType(core.String, [core.Object]),
    [_decodeValue]: dart.fnType(core.Object, [core.String])
  }));
  dart.setGetterSignature(shared_preferences_web.SharedPreferencesPlugin, () => ({
    __proto__: dart.getGetters(shared_preferences_web.SharedPreferencesPlugin.__proto__),
    [_storedFlutterKeys]: core.List$(core.String)
  }));
  dart.setLibraryUri(shared_preferences_web.SharedPreferencesPlugin, "package:shared_preferences_web/shared_preferences_web.dart");
  dart.trackLibraries("packages/shared_preferences_web/shared_preferences_web", {
    "package:shared_preferences_web/shared_preferences_web.dart": shared_preferences_web
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["shared_preferences_web.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;wBAgBqC;AACkC,MAApC,gFAAW;IAC5C;;AAGkB;AAIhB,iBAAY,MAAO;AACmB,UAA/B,AAAO,AAAa,kCAAO,GAAG;;AAErC,cAAO;MACT;;;AAGkC;AACN,sBAA0B;AACpD,iBAAY,MAAO;AACyC,UAA1D,AAAO,OAAA,QAAC,GAAG,EAAI,mBAAkB,AAAO,AAAY,gCAAC,GAAG;;AAE1D,cAAO,QAAO;MAChB;;WAG2B;AAAR;AACA,QAAjB,mBAAa,GAAG;AACoB,QAA/B,AAAO,AAAa,kCAAO,GAAG;AACnC,cAAO;MACT;;aAG6B,WAAkB,KAAY;AAAtC;AACF,QAAjB,mBAAa,GAAG;AACmC,QAA9C,AAAO,AAAY,gCAAC,GAAG,EAAI,mBAAa,KAAK;AAClD,cAAO;MACT;;mBAEyB;AACvB,WAAK,AAAI,GAAD,cAAY;AAKjB,QAJD,WAAM,6BACJ,gEACA,GAAG,EACH;;IAGN;;AAGqB,iBAAe;AAClC,eAAY,MAAY,AAAO,AAAa;AAC1C,YAAI,AAAI,GAAD,cAAY;AACJ,UAAb,AAAK,IAAD,OAAK,GAAG;;;AAGhB,YAAO,KAAI;IACb;mBAE2B;AACzB,YAAO,AAAK,qBAAO,KAAK;IAC1B;mBAE2B;AACZ,yBAAe,AAAK,oBAAO,YAAY;AAEpD,UAAiB,aAAb,YAAY;AAId,cAAO,AAAa,aAAD;;AAGrB,YAAO,aAAY;IACrB;;;;EACF","file":"shared_preferences_web.ddc.js"}');
  // Exports:
  return {
    shared_preferences_web: shared_preferences_web
  };
});

//# sourceMappingURL=shared_preferences_web.ddc.js.map
