define(['dart_sdk', 'packages/shared_preferences_platform_interface/method_channel_shared_preferences'], function(dart_sdk, packages__shared_preferences_platform_interface__method_channel_shared_preferences) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const collection = dart_sdk.collection;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const shared_preferences_platform_interface = packages__shared_preferences_platform_interface__method_channel_shared_preferences.shared_preferences_platform_interface;
  const shared_preferences = Object.create(dart.library);
  const $keys = dartx.keys;
  const $_get = dartx._get;
  const $containsKey = dartx.containsKey;
  const $cast = dartx.cast;
  const $toList = dartx.toList;
  const $_set = dartx._set;
  const $remove = dartx.remove;
  const $clear = dartx.clear;
  const $addAll = dartx.addAll;
  const $startsWith = dartx.startsWith;
  const $substring = dartx.substring;
  const $map = dartx.map;
  let CompleterOfSharedPreferences = () => (CompleterOfSharedPreferences = dart.constFn(async.Completer$(shared_preferences.SharedPreferences)))();
  let LinkedHashSetOfString = () => (LinkedHashSetOfString = dart.constFn(collection.LinkedHashSet$(core.String)))();
  let ListOfObject = () => (ListOfObject = dart.constFn(core.List$(core.Object)))();
  let ListOfString = () => (ListOfString = dart.constFn(core.List$(core.String)))();
  let IdentityMapOfString$Object = () => (IdentityMapOfString$Object = dart.constFn(_js_helper.IdentityMap$(core.String, core.Object)))();
  let MapOfString$Object = () => (MapOfString$Object = dart.constFn(core.Map$(core.String, core.Object)))();
  let MapEntryOfString$dynamic = () => (MapEntryOfString$dynamic = dart.constFn(core.MapEntry$(core.String, dart.dynamic)))();
  let StringAnddynamicToMapEntryOfString$dynamic = () => (StringAnddynamicToMapEntryOfString$dynamic = dart.constFn(dart.fnType(MapEntryOfString$dynamic(), [core.String, dart.dynamic])))();
  const CT = Object.create(null);
  const _preferenceCache$ = dart.privateName(shared_preferences, "_preferenceCache");
  const _setValue = dart.privateName(shared_preferences, "_setValue");
  shared_preferences.SharedPreferences = class SharedPreferences extends core.Object {
    static get _store() {
      return shared_preferences_platform_interface.SharedPreferencesStorePlatform.instance;
    }
    static getInstance() {
      return async.async(shared_preferences.SharedPreferences, function* getInstance() {
        if (shared_preferences.SharedPreferences._completer == null) {
          shared_preferences.SharedPreferences._completer = CompleterOfSharedPreferences().new();
          try {
            let preferencesMap = (yield shared_preferences.SharedPreferences._getSharedPreferencesMap());
            shared_preferences.SharedPreferences._completer.complete(new shared_preferences.SharedPreferences.__(preferencesMap));
          } catch (e$) {
            let e = dart.getThrown(e$);
            if (core.Exception.is(e)) {
              shared_preferences.SharedPreferences._completer.completeError(e);
              let sharedPrefsFuture = shared_preferences.SharedPreferences._completer.future;
              shared_preferences.SharedPreferences._completer = null;
              return sharedPrefsFuture;
            } else
              throw e$;
          }
        }
        return shared_preferences.SharedPreferences._completer.future;
      });
    }
    getKeys() {
      return LinkedHashSetOfString().from(this[_preferenceCache$][$keys]);
    }
    get(key) {
      return this[_preferenceCache$][$_get](key);
    }
    getBool(key) {
      return core.bool._check(this[_preferenceCache$][$_get](key));
    }
    getInt(key) {
      return core.int._check(this[_preferenceCache$][$_get](key));
    }
    getDouble(key) {
      return core.double._check(this[_preferenceCache$][$_get](key));
    }
    getString(key) {
      return core.String._check(this[_preferenceCache$][$_get](key));
    }
    containsKey(key) {
      return this[_preferenceCache$][$containsKey](key);
    }
    getStringList(key) {
      let t1;
      let list = ListOfObject()._check(this[_preferenceCache$][$_get](key));
      if (list != null && !ListOfString().is(list)) {
        list = list[$cast](core.String)[$toList]();
        this[_preferenceCache$][$_set](key, list);
      }
      return ListOfString()._check((t1 = list, t1 == null ? null : t1[$toList]()));
    }
    setBool(key, value) {
      return this[_setValue]("Bool", key, value);
    }
    setInt(key, value) {
      return this[_setValue]("Int", key, value);
    }
    setDouble(key, value) {
      return this[_setValue]("Double", key, value);
    }
    setString(key, value) {
      return this[_setValue]("String", key, value);
    }
    setStringList(key, value) {
      return this[_setValue]("StringList", key, value);
    }
    remove(key) {
      return this[_setValue](null, key, null);
    }
    [_setValue](valueType, key, value) {
      let prefixedKey = "flutter." + dart.str(key);
      if (value == null) {
        this[_preferenceCache$][$remove](key);
        return shared_preferences.SharedPreferences._store.remove(prefixedKey);
      } else {
        if (ListOfString().is(value)) {
          this[_preferenceCache$][$_set](key, value[$toList]());
        } else {
          this[_preferenceCache$][$_set](key, value);
        }
        return shared_preferences.SharedPreferences._store.setValue(valueType, prefixedKey, value);
      }
    }
    commit() {
      return async.async(core.bool, function* commit() {
        return true;
      });
    }
    clear() {
      this[_preferenceCache$][$clear]();
      return shared_preferences.SharedPreferences._store.clear();
    }
    reload() {
      return async.async(dart.void, (function* reload() {
        let preferences = (yield shared_preferences.SharedPreferences._getSharedPreferencesMap());
        this[_preferenceCache$][$clear]();
        this[_preferenceCache$][$addAll](preferences);
      }).bind(this));
    }
    static _getSharedPreferencesMap() {
      return async.async(MapOfString$Object(), function* _getSharedPreferencesMap() {
        let fromSystem = (yield shared_preferences.SharedPreferences._store.getAll());
        if (!(fromSystem != null)) dart.assertFailed(null, "org-dartlang-app:///packages/shared_preferences/shared_preferences.dart", 167, 12, "fromSystem != null");
        let preferencesMap = new (IdentityMapOfString$Object()).new();
        for (let key of fromSystem[$keys]) {
          if (!key[$startsWith]("flutter.")) dart.assertFailed(null, "org-dartlang-app:///packages/shared_preferences/shared_preferences.dart", 171, 14, "key.startsWith(_prefix)");
          preferencesMap[$_set](key[$substring]("flutter.".length), fromSystem[$_get](key));
        }
        return preferencesMap;
      });
    }
    static setMockInitialValues(values) {
      let newValues = values[$map](core.String, dart.dynamic, dart.fn((key, value) => {
        let newKey = key;
        if (!key[$startsWith]("flutter.")) {
          newKey = "flutter." + dart.str(key);
        }
        return new (MapEntryOfString$dynamic()).__(newKey, value);
      }, StringAnddynamicToMapEntryOfString$dynamic()));
      shared_preferences_platform_interface.SharedPreferencesStorePlatform.instance = new shared_preferences_platform_interface.InMemorySharedPreferencesStore.withData(newValues);
      shared_preferences.SharedPreferences._completer = null;
    }
  };
  (shared_preferences.SharedPreferences.__ = function(_preferenceCache) {
    this[_preferenceCache$] = _preferenceCache;
    ;
  }).prototype = shared_preferences.SharedPreferences.prototype;
  dart.addTypeTests(shared_preferences.SharedPreferences);
  dart.setMethodSignature(shared_preferences.SharedPreferences, () => ({
    __proto__: dart.getMethods(shared_preferences.SharedPreferences.__proto__),
    getKeys: dart.fnType(core.Set$(core.String), []),
    get: dart.fnType(dart.dynamic, [core.String]),
    getBool: dart.fnType(core.bool, [core.String]),
    getInt: dart.fnType(core.int, [core.String]),
    getDouble: dart.fnType(core.double, [core.String]),
    getString: dart.fnType(core.String, [core.String]),
    containsKey: dart.fnType(core.bool, [core.String]),
    getStringList: dart.fnType(core.List$(core.String), [core.String]),
    setBool: dart.fnType(async.Future$(core.bool), [core.String, core.bool]),
    setInt: dart.fnType(async.Future$(core.bool), [core.String, core.int]),
    setDouble: dart.fnType(async.Future$(core.bool), [core.String, core.double]),
    setString: dart.fnType(async.Future$(core.bool), [core.String, core.String]),
    setStringList: dart.fnType(async.Future$(core.bool), [core.String, core.List$(core.String)]),
    remove: dart.fnType(async.Future$(core.bool), [core.String]),
    [_setValue]: dart.fnType(async.Future$(core.bool), [core.String, core.String, core.Object]),
    commit: dart.fnType(async.Future$(core.bool), []),
    clear: dart.fnType(async.Future$(core.bool), []),
    reload: dart.fnType(async.Future$(dart.void), [])
  }));
  dart.setLibraryUri(shared_preferences.SharedPreferences, "package:shared_preferences/shared_preferences.dart");
  dart.setFieldSignature(shared_preferences.SharedPreferences, () => ({
    __proto__: dart.getFields(shared_preferences.SharedPreferences.__proto__),
    [_preferenceCache$]: dart.finalFieldType(core.Map$(core.String, core.Object))
  }));
  dart.defineLazy(shared_preferences.SharedPreferences, {
    /*shared_preferences.SharedPreferences._prefix*/get _prefix() {
      return "flutter.";
    },
    /*shared_preferences.SharedPreferences._completer*/get _completer() {
      return null;
    },
    set _completer(_) {}
  });
  dart.trackLibraries("packages/shared_preferences/shared_preferences", {
    "package:shared_preferences/shared_preferences.dart": shared_preferences
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["shared_preferences.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAqBM,YAA+B;IAAQ;;AAMC;AAC1C,YAAI,AAAW,mDAAG;AAC2B,UAA3C,kDAAa;AACb;AAC4B,kCACtB,MAAM;AAC8C,YAAxD,AAAW,yDAA2B,4CAAE,cAAc;;gBAClC;AAApB;AAG2B,cAA3B,AAAW,8DAAc,CAAC;AACM,sCAAoB,AAAW;AAC9C,cAAjB,kDAAa;AACb,oBAAO,kBAAiB;;;;;AAG5B,cAAO,AAAW;MACpB;;;AAayB,YAAH,8BAAoB,AAAiB;IAAK;QAG7C;AAAQ,YAAA,AAAgB,gCAAC,GAAG;IAAC;YAI5B;AAAQ,8BAAA,AAAgB,+BAAC,GAAG;IAAC;WAI/B;AAAQ,6BAAA,AAAgB,+BAAC,GAAG;IAAC;cAIvB;AAAQ,gCAAA,AAAgB,+BAAC,GAAG;IAAC;cAI7B;AAAQ,gCAAA,AAAgB,+BAAC,GAAG;IAAC;gBAG7B;AAAQ,YAAA,AAAiB,uCAAY,GAAG;IAAC;kBAI/B;;AACnB,uCAAO,AAAgB,+BAAC,GAAG;AACxC,UAAI,IAAI,IAAI,SAAa,kBAAL,IAAI;AACa,QAAnC,OAAO,AAAK,AAAe,IAAhB;AACiB,QAA5B,AAAgB,+BAAC,GAAG,EAAI,IAAI;;AAG9B,yCAAO,IAAI,eAAJ,OAAM;IACf;YAK4B,KAAU;AAAU,6BAAU,QAAQ,GAAG,EAAE,KAAK;IAAC;WAKlD,KAAS;AAAU,6BAAU,OAAO,GAAG,EAAE,KAAK;IAAC;cAO5C,KAAY;AACtC,6BAAU,UAAU,GAAG,EAAE,KAAK;IAAC;cAKL,KAAY;AACtC,6BAAU,UAAU,GAAG,EAAE,KAAK;IAAC;kBAKD,KAAkB;AAChD,6BAAU,cAAc,GAAG,EAAE,KAAK;IAAC;WAGZ;AAAQ,6BAAU,MAAM,GAAG,EAAE;IAAK;gBAE/B,WAAkB,KAAY;AAC7C,wBAA4B,sBAAJ,GAAG;AACxC,UAAI,AAAM,KAAD,IAAI;AACiB,QAA5B,AAAiB,iCAAO,GAAG;AAC3B,cAAO,AAAO,oDAAO,WAAW;;AAEhC,YAAU,kBAAN,KAAK;AAE+B,UAAtC,AAAgB,+BAAC,GAAG,EAAI,AAAM,KAAD;;AAEA,UAA7B,AAAgB,+BAAC,GAAG,EAAI,KAAK;;AAE/B,cAAO,AAAO,sDAAS,SAAS,EAAE,WAAW,EAAE,KAAK;;IAExD;;AAKmB;AAAY;MAAI;;;AAIT,MAAxB,AAAiB;AACjB,YAAO,AAAO;IAChB;;AAMmB;AACS,2BACtB,MAAwB;AACJ,QAAxB,AAAiB;AACmB,QAApC,AAAiB,iCAAO,WAAW;MACrC;;;AAE2D;AAC/B,0BAAa,MAAM,AAAO;AACpD,cAAO,AAAW,UAAD,IAAI;AAEK,6BAAiC;AAC3D,iBAAY,MAAO,AAAW,WAAD;AAC3B,eAAO,AAAI,GAAD;AACqD,UAA/D,AAAc,cAAA,QAAC,AAAI,GAAD,aAAmB,oBAAW,AAAU,UAAA,QAAC,GAAG;;AAEhE,cAAO,eAAc;MACvB;;gCAMsD;AACzB,sBACvB,AAAO,MAAD,kCAAsB,SAAQ,KAAa;AAC5C,qBAAS,GAAG;AACnB,aAAK,AAAI,GAAD;AACiB,UAAvB,SAAuB,sBAAJ,GAAG;;AAExB,cAAO,qCAA0B,MAAM,EAAE,KAAK;;AAGM,MADvB,gFACI,kFAAS,SAAS;AACpC,MAAjB,kDAAa;IACf;;;IAjLyB;;EAAiB;;;;;;;;;;;;;;;;;;;;;;;;;;;;;MAEtB,4CAAO;;;MACS,+CAAU","file":"shared_preferences.ddc.js"}');
  // Exports:
  return {
    shared_preferences: shared_preferences
  };
});

//# sourceMappingURL=shared_preferences.ddc.js.map
