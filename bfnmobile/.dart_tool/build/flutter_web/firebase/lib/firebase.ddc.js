define(['dart_sdk', 'packages/firebase/src/app'], function(dart_sdk, packages__firebase__src__app) {
  'use strict';
  const core = dart_sdk.core;
  const js_util = dart_sdk.js_util;
  const async = dart_sdk.async;
  const js = dart_sdk.js;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const utils = packages__firebase__src__app.src__utils;
  const js$ = packages__firebase__src__app.src__js;
  const app = packages__firebase__src__app.src__app;
  const auth = packages__firebase__src__app.src__auth;
  const database = packages__firebase__src__app.src__database;
  const storage = packages__firebase__src__app.src__storage;
  const firestore = packages__firebase__src__app.src__firestore;
  const functions = packages__firebase__src__app.src__functions;
  const analytics = Object.create(dart.library);
  const top_level = Object.create(dart.library);
  const remote_config = Object.create(dart.library);
  const performance = Object.create(dart.library);
  const messaging = Object.create(dart.library);
  const firebase = Object.create(dart.library);
  const $map = dartx.map;
  const $toList = dartx.toList;
  const $_get = dartx._get;
  let ExpandoOfAnalytics = () => (ExpandoOfAnalytics = dart.constFn(core.Expando$(analytics.Analytics)))();
  let dynamicToApp = () => (dynamicToApp = dart.constFn(dart.fnType(app.App, [dart.dynamic])))();
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
  let MapEntryOfString$RemoteConfigValue = () => (MapEntryOfString$RemoteConfigValue = dart.constFn(core.MapEntry$(core.String, remote_config.RemoteConfigValue)))();
  let dynamicToMapEntryOfString$RemoteConfigValue = () => (dynamicToMapEntryOfString$RemoteConfigValue = dart.constFn(dart.fnType(MapEntryOfString$RemoteConfigValue(), [dart.dynamic])))();
  let MapOfString$RemoteConfigValue = () => (MapOfString$RemoteConfigValue = dart.constFn(core.Map$(core.String, remote_config.RemoteConfigValue)))();
  let ExpandoOfRemoteConfig = () => (ExpandoOfRemoteConfig = dart.constFn(core.Expando$(remote_config.RemoteConfig)))();
  let ExpandoOfPerformance = () => (ExpandoOfPerformance = dart.constFn(core.Expando$(performance.Performance)))();
  let ObjectTodynamic = () => (ObjectTodynamic = dart.constFn(dart.fnType(dart.dynamic, [core.Object])))();
  let StreamControllerOfPayload = () => (StreamControllerOfPayload = dart.constFn(async.StreamController$(messaging.Payload)))();
  let dynamicToNull = () => (dynamicToNull = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  let VoidTovoid = () => (VoidTovoid = dart.constFn(dart.fnType(dart.void, [])))();
  let StreamControllerOfNull = () => (StreamControllerOfNull = dart.constFn(async.StreamController$(core.Null)))();
  let StreamOfNull = () => (StreamOfNull = dart.constFn(async.Stream$(core.Null)))();
  let ExpandoOfMessaging = () => (ExpandoOfMessaging = dart.constFn(core.Expando$(messaging.Messaging)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C1() {
      return C1 = dart.const({
        __proto__: remote_config.RemoteConfigLogLevel.prototype,
        [_name$]: "RemoteConfigLogLevel.debug",
        index: 0
      });
    },
    get C2() {
      return C2 = dart.const({
        __proto__: remote_config.RemoteConfigLogLevel.prototype,
        [_name$]: "RemoteConfigLogLevel.error",
        index: 1
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: remote_config.RemoteConfigLogLevel.prototype,
        [_name$]: "RemoteConfigLogLevel.silent",
        index: 2
      });
    },
    get C0() {
      return C0 = dart.constMap(remote_config.RemoteConfigLogLevel, core.String, [C1 || CT.C1, "debug", C2 || CT.C2, "error", C3 || CT.C3, "silent"]);
    },
    get C4() {
      return C4 = dart.const({
        __proto__: remote_config.RemoteConfigValueSource.prototype,
        [_name$]: "RemoteConfigValueSource.static",
        index: 0
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: remote_config.RemoteConfigValueSource.prototype,
        [_name$]: "RemoteConfigValueSource.defaults",
        index: 1
      });
    },
    get C6() {
      return C6 = dart.const({
        __proto__: remote_config.RemoteConfigValueSource.prototype,
        [_name$]: "RemoteConfigValueSource.remote",
        index: 2
      });
    },
    get C7() {
      return C7 = dart.constList([C4 || CT.C4, C5 || CT.C5, C6 || CT.C6], remote_config.RemoteConfigValueSource);
    },
    get C8() {
      return C8 = dart.const({
        __proto__: remote_config.RemoteConfigFetchStatus.prototype,
        [_name$]: "RemoteConfigFetchStatus.notFetchedYet",
        index: 0
      });
    },
    get C9() {
      return C9 = dart.const({
        __proto__: remote_config.RemoteConfigFetchStatus.prototype,
        [_name$]: "RemoteConfigFetchStatus.success",
        index: 1
      });
    },
    get C10() {
      return C10 = dart.const({
        __proto__: remote_config.RemoteConfigFetchStatus.prototype,
        [_name$]: "RemoteConfigFetchStatus.failure",
        index: 2
      });
    },
    get C11() {
      return C11 = dart.const({
        __proto__: remote_config.RemoteConfigFetchStatus.prototype,
        [_name$]: "RemoteConfigFetchStatus.throttle",
        index: 3
      });
    },
    get C12() {
      return C12 = dart.constList([C8 || CT.C8, C9 || CT.C9, C10 || CT.C10, C11 || CT.C11], remote_config.RemoteConfigFetchStatus);
    },
    get C13() {
      return C13 = dart.constList([C1 || CT.C1, C2 || CT.C2, C3 || CT.C3], remote_config.RemoteConfigLogLevel);
    },
    get C14() {
      return C14 = dart.fn(utils.dartify, ObjectTodynamic());
    }
  });
  analytics.Analytics = class Analytics extends js$.JsObjectWrapper$(dart.lazyJSType(() => dart.global.firebase.analytics.Analytics, "firebase.analytics.Analytics")) {
    static getInstance(jsObject) {
      let t3, t2, t1, t0;
      if (jsObject == null) {
        return null;
      }
      t0 = analytics.Analytics._expando;
      t1 = jsObject;
      t2 = t0._get(t1);
      return t2 == null ? (t3 = new analytics.Analytics._fromJsObject(jsObject), t0._set(t1, t3), t3) : t2;
    }
    logEvent(eventName, eventParams, options = null) {
      if (options != null) {
        this.jsObject.logEvent(eventName, utils.jsify(eventParams), options.jsObject);
      } else {
        this.jsObject.logEvent(eventName, utils.jsify(eventParams));
      }
    }
    setAnalyticsCollectionEnabled(enabled) {
      this.jsObject.setAnalyticsCollectionEnabled(enabled);
    }
    setCurrentScreen(screenName, options = null) {
      if (options != null) {
        this.jsObject.setCurrentScreen(screenName, options.jsObject);
      } else {
        this.jsObject.setCurrentScreen(screenName);
      }
    }
    setUserId(id, options = null) {
      if (options != null) {
        this.jsObject.setUserId(id, options.jsObject);
      } else {
        this.jsObject.setUserId(id);
      }
    }
    setUserProperties(properties, options = null) {
      if (options != null) {
        this.jsObject.setUserProperties(properties.jsObject, options.jsObject);
      } else {
        this.jsObject.setUserProperties(properties.jsObject);
      }
    }
  };
  (analytics.Analytics._fromJsObject = function(jsObject) {
    analytics.Analytics.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = analytics.Analytics.prototype;
  dart.addTypeTests(analytics.Analytics);
  dart.setMethodSignature(analytics.Analytics, () => ({
    __proto__: dart.getMethods(analytics.Analytics.__proto__),
    logEvent: dart.fnType(dart.void, [core.String, core.Map], [analytics.AnalyticsCallOptions]),
    setAnalyticsCollectionEnabled: dart.fnType(dart.void, [core.bool]),
    setCurrentScreen: dart.fnType(dart.void, [core.String], [analytics.AnalyticsCallOptions]),
    setUserId: dart.fnType(dart.void, [core.String], [analytics.AnalyticsCallOptions]),
    setUserProperties: dart.fnType(dart.void, [analytics.CustomParams], [analytics.AnalyticsCallOptions])
  }));
  dart.setLibraryUri(analytics.Analytics, "package:firebase/src/analytics.dart");
  dart.defineLazy(analytics.Analytics, {
    /*analytics.Analytics._expando*/get _expando() {
      return new (ExpandoOfAnalytics()).new();
    }
  });
  analytics.AnalyticsCallOptions = class AnalyticsCallOptions extends js$.JsObjectWrapper$(dart.anonymousJSType("AnalyticsCallOptionsJsImpl")) {
    get global() {
      return this.jsObject.global;
    }
    set global(t) {
      this.jsObject.global = t;
    }
  };
  (analytics.AnalyticsCallOptions._fromJsObject = function(jsObject) {
    analytics.AnalyticsCallOptions.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = analytics.AnalyticsCallOptions.prototype;
  dart.addTypeTests(analytics.AnalyticsCallOptions);
  dart.setGetterSignature(analytics.AnalyticsCallOptions, () => ({
    __proto__: dart.getGetters(analytics.AnalyticsCallOptions.__proto__),
    global: core.bool
  }));
  dart.setSetterSignature(analytics.AnalyticsCallOptions, () => ({
    __proto__: dart.getSetters(analytics.AnalyticsCallOptions.__proto__),
    global: core.bool
  }));
  dart.setLibraryUri(analytics.AnalyticsCallOptions, "package:firebase/src/analytics.dart");
  analytics.CustomParams = class CustomParams extends js$.JsObjectWrapper$(dart.lazyJSType(() => dart.global.firebase.analytics.CustomParams, "firebase.analytics.CustomParams")) {};
  (analytics.CustomParams._fromJsObject = function(jsObject) {
    analytics.CustomParams.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = analytics.CustomParams.prototype;
  dart.addTypeTests(analytics.CustomParams);
  dart.setLibraryUri(analytics.CustomParams, "package:firebase/src/analytics.dart");
  const message$ = dart.privateName(top_level, "FirebaseJsNotLoadedException.message");
  top_level.FirebaseJsNotLoadedException = class FirebaseJsNotLoadedException extends core.Object {
    get message() {
      return this[message$];
    }
    set message(value) {
      super.message = value;
    }
    toString() {
      return "FirebaseJsNotLoadedException: " + dart.str(this.message);
    }
  };
  (top_level.FirebaseJsNotLoadedException.new = function(message) {
    this[message$] = message;
    ;
  }).prototype = top_level.FirebaseJsNotLoadedException.prototype;
  dart.addTypeTests(top_level.FirebaseJsNotLoadedException);
  top_level.FirebaseJsNotLoadedException[dart.implements] = () => [core.Exception];
  dart.setLibraryUri(top_level.FirebaseJsNotLoadedException, "package:firebase/src/top_level.dart");
  dart.setFieldSignature(top_level.FirebaseJsNotLoadedException, () => ({
    __proto__: dart.getFields(top_level.FirebaseJsNotLoadedException.__proto__),
    message: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(top_level.FirebaseJsNotLoadedException, ['toString']);
  top_level.initializeApp = function initializeApp(opts) {
    let apiKey = opts && 'apiKey' in opts ? opts.apiKey : null;
    let authDomain = opts && 'authDomain' in opts ? opts.authDomain : null;
    let databaseURL = opts && 'databaseURL' in opts ? opts.databaseURL : null;
    let projectId = opts && 'projectId' in opts ? opts.projectId : null;
    let storageBucket = opts && 'storageBucket' in opts ? opts.storageBucket : null;
    let messagingSenderId = opts && 'messagingSenderId' in opts ? opts.messagingSenderId : null;
    let name = opts && 'name' in opts ? opts.name : null;
    let measurementId = opts && 'measurementId' in opts ? opts.measurementId : null;
    let appId = opts && 'appId' in opts ? opts.appId : null;
    name == null ? name = "[DEFAULT]" : null;
    try {
      return app.App.getInstance(dart.global.firebase.initializeApp({apiKey: apiKey, authDomain: authDomain, databaseURL: databaseURL, projectId: projectId, storageBucket: storageBucket, messagingSenderId: messagingSenderId, measurementId: measurementId, appId: appId}, name));
    } catch (e$) {
      let e = dart.getThrown(e$);
      if (dart.test(top_level._firebaseNotLoaded(e))) {
        dart.throw(new top_level.FirebaseJsNotLoadedException.new("firebase.js must be loaded."));
      }
      dart.rethrow(e$);
    }
  };
  top_level.app = function app$(name = null) {
    let jsObject = name != null ? dart.global.firebase.app(name) : dart.global.firebase.app();
    return app.App.getInstance(jsObject);
  };
  top_level.auth = function auth$(app = null) {
    let jsObject = app != null ? dart.global.firebase.auth(app.jsObject) : dart.global.firebase.auth();
    return auth.Auth.getInstance(jsObject);
  };
  top_level.database = function database$(app = null) {
    let jsObject = app != null ? dart.global.firebase.database(app.jsObject) : dart.global.firebase.database();
    return database.Database.getInstance(jsObject);
  };
  top_level.storage = function storage$(app = null) {
    let jsObject = app != null ? dart.global.firebase.storage(app.jsObject) : dart.global.firebase.storage();
    return storage.Storage.getInstance(jsObject);
  };
  top_level.firestore = function firestore$(app = null) {
    let jsObject = app != null ? dart.global.firebase.firestore(app.jsObject) : dart.global.firebase.firestore();
    return firestore.Firestore.getInstance(jsObject);
  };
  top_level.functions = function functions$(app = null) {
    let jsObject = app != null ? dart.global.firebase.functions(app.jsObject) : dart.global.firebase.functions();
    return functions.Functions.getInstance(jsObject);
  };
  top_level.messaging = function messaging$(app = null) {
    let jsObject = app != null ? dart.global.firebase.messaging(app.jsObject) : dart.global.firebase.messaging();
    return messaging.Messaging.getInstance(jsObject);
  };
  top_level.remoteConfig = function remoteConfig(app = null) {
    let jsObject = app != null ? dart.global.firebase.remoteConfig(app.jsObject) : dart.global.firebase.remoteConfig();
    return remote_config.RemoteConfig.getInstance(jsObject);
  };
  top_level.analytics = function analytics$(app = null) {
    let jsObject = app != null ? dart.global.firebase.analytics(app.jsObject) : dart.global.firebase.analytics();
    return analytics.Analytics.getInstance(jsObject);
  };
  top_level.performance = function performance$(app = null) {
    let jsObject = app != null ? dart.global.firebase.performance(app.jsObject) : dart.global.firebase.performance();
    return performance.Performance.getInstance(jsObject);
  };
  top_level._firebaseNotLoaded = function _firebaseNotLoaded(error) {
    if (core.NoSuchMethodError.is(error)) {
      return true;
    }
    if (dart.test(js_util.hasProperty(error, "message"))) {
      let message = js_util.getProperty(error, "message");
      return dart.equals(message, "firebase is not defined") || dart.equals(message, "Can't find variable: firebase");
    }
    return false;
  };
  dart.copyProperties(top_level, {
    get apps() {
      return dart.global.firebase.apps[$map](app.App, dart.fn(e => app.App.getInstance(dart.lazyJSType(() => dart.global.firebase.app.App, "firebase.app.App")._check(e)), dynamicToApp()))[$toList]();
    }
  });
  dart.defineLazy(top_level, {
    /*top_level._defaultAppName*/get _defaultAppName() {
      return "[DEFAULT]";
    }
  });
  const _name$ = dart.privateName(remote_config, "_name");
  let C1;
  let C2;
  let C3;
  let C0;
  remote_config.RemoteConfig = class RemoteConfig extends js$.JsObjectWrapper$(dart.lazyJSType(() => dart.global.firebase.remoteConfig.RemoteConfig, "firebase.remoteConfig.RemoteConfig")) {
    static getInstance(jsObject) {
      let t4, t3, t2, t1;
      if (jsObject == null) {
        return null;
      }
      t1 = remote_config.RemoteConfig._expando;
      t2 = jsObject;
      t3 = t1._get(t2);
      return t3 == null ? (t4 = new remote_config.RemoteConfig._fromJsObject(jsObject), t1._set(t2, t4), t4) : t3;
    }
    get settings() {
      return new remote_config.RemoteConfigSettings._fromJsObject(this.jsObject.settings);
    }
    get defaultConfig() {
      return MapOfString$dynamic().unmodifiable(utils.dartifyMap(this.jsObject.defaultConfig));
    }
    set defaultConfig(value) {
      this.jsObject.defaultConfig = utils.jsify(value);
    }
    get fetchTime() {
      if (dart.notNull(this.jsObject.fetchTimeMillis) < 0) {
        return null;
      } else {
        return new core.DateTime.fromMillisecondsSinceEpoch(this.jsObject.fetchTimeMillis);
      }
    }
    get lastFetchStatus() {
      switch (this.jsObject.lastFetchStatus) {
        case "no-fetch-yet":
        {
          return remote_config.RemoteConfigFetchStatus.notFetchedYet;
        }
        case "success":
        {
          return remote_config.RemoteConfigFetchStatus.success;
        }
        case "failure":
        {
          return remote_config.RemoteConfigFetchStatus.failure;
        }
        case "throttle":
        {
          return remote_config.RemoteConfigFetchStatus.throttle;
        }
        default:
        {
          if (!false) dart.assertFailed(null, "org-dartlang-app:///packages/firebase/src/remote_config.dart", 69, 16, "false");
          return null;
        }
      }
    }
    activate() {
      return async.async(core.bool, (function* activate() {
        return utils.handleThenable(core.bool, this.jsObject.activate());
      }).bind(this));
    }
    ensureInitialized() {
      return async.async(dart.void, (function* ensureInitialized() {
        return utils.handleThenable(dart.void, this.jsObject.ensureInitialized());
      }).bind(this));
    }
    fetch() {
      return async.async(dart.void, (function* fetch() {
        return utils.handleThenable(dart.void, this.jsObject.fetch());
      }).bind(this));
    }
    fetchAndActivate() {
      return async.async(core.bool, (function* fetchAndActivate() {
        return utils.handleThenable(core.bool, this.jsObject.fetchAndActivate());
      }).bind(this));
    }
    getAll() {
      let keys = dart.global.Object.keys(this.jsObject.getAll());
      let entries = keys[$map](MapEntryOfString$RemoteConfigValue(), dart.fn(k => new (MapEntryOfString$RemoteConfigValue()).__(core.String._check(k), this.getValue(core.String._check(k))), dynamicToMapEntryOfString$RemoteConfigValue()));
      return MapOfString$RemoteConfigValue().fromEntries(entries);
    }
    getBoolean(key) {
      return this.jsObject.getBoolean(key);
    }
    getNumber(key) {
      return this.jsObject.getNumber(key);
    }
    getString(key) {
      return this.jsObject.getString(key);
    }
    getValue(key) {
      return new remote_config.RemoteConfigValue._fromJsObject(this.jsObject.getValue(key));
    }
    setLogLevel(value) {
      this.jsObject.setLogLevel((C0 || CT.C0)[$_get](value));
    }
  };
  (remote_config.RemoteConfig._fromJsObject = function(jsObject) {
    remote_config.RemoteConfig.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = remote_config.RemoteConfig.prototype;
  dart.addTypeTests(remote_config.RemoteConfig);
  dart.setMethodSignature(remote_config.RemoteConfig, () => ({
    __proto__: dart.getMethods(remote_config.RemoteConfig.__proto__),
    activate: dart.fnType(async.Future$(core.bool), []),
    ensureInitialized: dart.fnType(async.Future$(dart.void), []),
    fetch: dart.fnType(async.Future$(dart.void), []),
    fetchAndActivate: dart.fnType(async.Future$(core.bool), []),
    getAll: dart.fnType(core.Map$(core.String, remote_config.RemoteConfigValue), []),
    getBoolean: dart.fnType(core.bool, [core.String]),
    getNumber: dart.fnType(core.num, [core.String]),
    getString: dart.fnType(core.String, [core.String]),
    getValue: dart.fnType(remote_config.RemoteConfigValue, [core.String]),
    setLogLevel: dart.fnType(dart.void, [remote_config.RemoteConfigLogLevel])
  }));
  dart.setGetterSignature(remote_config.RemoteConfig, () => ({
    __proto__: dart.getGetters(remote_config.RemoteConfig.__proto__),
    settings: remote_config.RemoteConfigSettings,
    defaultConfig: core.Map$(core.String, dart.dynamic),
    fetchTime: core.DateTime,
    lastFetchStatus: remote_config.RemoteConfigFetchStatus
  }));
  dart.setSetterSignature(remote_config.RemoteConfig, () => ({
    __proto__: dart.getSetters(remote_config.RemoteConfig.__proto__),
    defaultConfig: core.Map$(core.String, dart.dynamic)
  }));
  dart.setLibraryUri(remote_config.RemoteConfig, "package:firebase/src/remote_config.dart");
  dart.defineLazy(remote_config.RemoteConfig, {
    /*remote_config.RemoteConfig._expando*/get _expando() {
      return new (ExpandoOfRemoteConfig()).new();
    }
  });
  remote_config.RemoteConfigValue = class RemoteConfigValue extends js$.JsObjectWrapper$(dart.anonymousJSType("ValueJsImpl")) {
    asBoolean() {
      return this.jsObject.asBoolean();
    }
    asNumber() {
      return this.jsObject.asNumber();
    }
    asString() {
      return this.jsObject.asString();
    }
    getSource() {
      switch (this.jsObject.getSource()) {
        case "static":
        {
          return remote_config.RemoteConfigValueSource.static;
        }
        case "default":
        {
          return remote_config.RemoteConfigValueSource.defaults;
        }
        case "remote":
        {
          return remote_config.RemoteConfigValueSource.remote;
        }
        default:
        {
          if (!false) dart.assertFailed(null, "org-dartlang-app:///packages/firebase/src/remote_config.dart", 170, 16, "false");
          return null;
        }
      }
    }
  };
  (remote_config.RemoteConfigValue._fromJsObject = function(jsObject) {
    remote_config.RemoteConfigValue.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = remote_config.RemoteConfigValue.prototype;
  dart.addTypeTests(remote_config.RemoteConfigValue);
  dart.setMethodSignature(remote_config.RemoteConfigValue, () => ({
    __proto__: dart.getMethods(remote_config.RemoteConfigValue.__proto__),
    asBoolean: dart.fnType(core.bool, []),
    asNumber: dart.fnType(core.num, []),
    asString: dart.fnType(core.String, []),
    getSource: dart.fnType(remote_config.RemoteConfigValueSource, [])
  }));
  dart.setLibraryUri(remote_config.RemoteConfigValue, "package:firebase/src/remote_config.dart");
  let C4;
  let C5;
  let C6;
  let C7;
  remote_config.RemoteConfigValueSource = class RemoteConfigValueSource extends core.Object {
    toString() {
      return this[_name$];
    }
  };
  (remote_config.RemoteConfigValueSource.new = function(index, _name) {
    this.index = index;
    this[_name$] = _name;
    ;
  }).prototype = remote_config.RemoteConfigValueSource.prototype;
  dart.addTypeTests(remote_config.RemoteConfigValueSource);
  dart.setLibraryUri(remote_config.RemoteConfigValueSource, "package:firebase/src/remote_config.dart");
  dart.setFieldSignature(remote_config.RemoteConfigValueSource, () => ({
    __proto__: dart.getFields(remote_config.RemoteConfigValueSource.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(remote_config.RemoteConfigValueSource, ['toString']);
  remote_config.RemoteConfigValueSource.static = C4 || CT.C4;
  remote_config.RemoteConfigValueSource.defaults = C5 || CT.C5;
  remote_config.RemoteConfigValueSource.remote = C6 || CT.C6;
  remote_config.RemoteConfigValueSource.values = C7 || CT.C7;
  remote_config.RemoteConfigSettings = class RemoteConfigSettings extends js$.JsObjectWrapper$(dart.anonymousJSType("SettingsJsImpl")) {
    get minimumFetchInterval() {
      return new core.Duration.new({milliseconds: this.jsObject.minimumFetchIntervalMillis});
    }
    set minimumFetchInterval(value) {
      this.jsObject.minimumFetchIntervalMillis = value.inMilliseconds;
    }
    get fetchTimeoutMillis() {
      return new core.Duration.new({milliseconds: this.jsObject.fetchTimeoutMillis});
    }
    set fetchTimeoutMillis(value) {
      this.jsObject.fetchTimeoutMillis = value.inMilliseconds;
    }
  };
  (remote_config.RemoteConfigSettings._fromJsObject = function(jsObject) {
    remote_config.RemoteConfigSettings.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = remote_config.RemoteConfigSettings.prototype;
  dart.addTypeTests(remote_config.RemoteConfigSettings);
  dart.setGetterSignature(remote_config.RemoteConfigSettings, () => ({
    __proto__: dart.getGetters(remote_config.RemoteConfigSettings.__proto__),
    minimumFetchInterval: core.Duration,
    fetchTimeoutMillis: core.Duration
  }));
  dart.setSetterSignature(remote_config.RemoteConfigSettings, () => ({
    __proto__: dart.getSetters(remote_config.RemoteConfigSettings.__proto__),
    minimumFetchInterval: core.Duration,
    fetchTimeoutMillis: core.Duration
  }));
  dart.setLibraryUri(remote_config.RemoteConfigSettings, "package:firebase/src/remote_config.dart");
  let C8;
  let C9;
  let C10;
  let C11;
  let C12;
  remote_config.RemoteConfigFetchStatus = class RemoteConfigFetchStatus extends core.Object {
    toString() {
      return this[_name$];
    }
  };
  (remote_config.RemoteConfigFetchStatus.new = function(index, _name) {
    this.index = index;
    this[_name$] = _name;
    ;
  }).prototype = remote_config.RemoteConfigFetchStatus.prototype;
  dart.addTypeTests(remote_config.RemoteConfigFetchStatus);
  dart.setLibraryUri(remote_config.RemoteConfigFetchStatus, "package:firebase/src/remote_config.dart");
  dart.setFieldSignature(remote_config.RemoteConfigFetchStatus, () => ({
    __proto__: dart.getFields(remote_config.RemoteConfigFetchStatus.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(remote_config.RemoteConfigFetchStatus, ['toString']);
  remote_config.RemoteConfigFetchStatus.notFetchedYet = C8 || CT.C8;
  remote_config.RemoteConfigFetchStatus.success = C9 || CT.C9;
  remote_config.RemoteConfigFetchStatus.failure = C10 || CT.C10;
  remote_config.RemoteConfigFetchStatus.throttle = C11 || CT.C11;
  remote_config.RemoteConfigFetchStatus.values = C12 || CT.C12;
  let C13;
  remote_config.RemoteConfigLogLevel = class RemoteConfigLogLevel extends core.Object {
    toString() {
      return this[_name$];
    }
  };
  (remote_config.RemoteConfigLogLevel.new = function(index, _name) {
    this.index = index;
    this[_name$] = _name;
    ;
  }).prototype = remote_config.RemoteConfigLogLevel.prototype;
  dart.addTypeTests(remote_config.RemoteConfigLogLevel);
  dart.setLibraryUri(remote_config.RemoteConfigLogLevel, "package:firebase/src/remote_config.dart");
  dart.setFieldSignature(remote_config.RemoteConfigLogLevel, () => ({
    __proto__: dart.getFields(remote_config.RemoteConfigLogLevel.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(remote_config.RemoteConfigLogLevel, ['toString']);
  remote_config.RemoteConfigLogLevel.debug = C1 || CT.C1;
  remote_config.RemoteConfigLogLevel.error = C2 || CT.C2;
  remote_config.RemoteConfigLogLevel.silent = C3 || CT.C3;
  remote_config.RemoteConfigLogLevel.values = C13 || CT.C13;
  performance.Performance = class Performance extends js$.JsObjectWrapper$(dart.lazyJSType(() => dart.global.firebase.analytics.Performance, "firebase.analytics.Performance")) {
    static getInstance(jsObject) {
      let t4, t3, t2, t1;
      if (jsObject == null) {
        return null;
      }
      t1 = performance.Performance._expando;
      t2 = jsObject;
      t3 = t1._get(t2);
      return t3 == null ? (t4 = new performance.Performance._fromJsObject(jsObject), t1._set(t2, t4), t4) : t3;
    }
    trace(traceName) {
      return new performance.Trace.fromJsObject(this.jsObject.trace(traceName));
    }
  };
  (performance.Performance._fromJsObject = function(jsObject) {
    performance.Performance.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = performance.Performance.prototype;
  dart.addTypeTests(performance.Performance);
  dart.setMethodSignature(performance.Performance, () => ({
    __proto__: dart.getMethods(performance.Performance.__proto__),
    trace: dart.fnType(performance.Trace, [core.String])
  }));
  dart.setLibraryUri(performance.Performance, "package:firebase/src/performance.dart");
  dart.defineLazy(performance.Performance, {
    /*performance.Performance._expando*/get _expando() {
      return new (ExpandoOfPerformance()).new();
    }
  });
  performance.Trace = class Trace extends js$.JsObjectWrapper$(dart.anonymousJSType("TraceJsImpl")) {
    getAttribute(attr) {
      return this.jsObject.getAttribute(attr);
    }
    getAttributes() {
      return MapOfString$dynamic()._check(utils.dartify(this.jsObject.getAttributes()));
    }
    getMetric(metricName) {
      return this.jsObject.getMetric(metricName);
    }
    incrementMetric(metricName, num = null) {
      if (num != null) {
        this.jsObject.incrementMetric(metricName, num);
      } else {
        this.jsObject.incrementMetric(metricName);
      }
    }
    putAttribute(attr, value) {
      this.jsObject.putAttribute(attr, value);
    }
    removeAttribute(attr) {
      this.jsObject.removeAttribute(attr);
    }
    start() {
      this.jsObject.start();
    }
    stop() {
      this.jsObject.stop();
    }
  };
  (performance.Trace.fromJsObject = function(jsObject) {
    performance.Trace.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = performance.Trace.prototype;
  dart.addTypeTests(performance.Trace);
  dart.setMethodSignature(performance.Trace, () => ({
    __proto__: dart.getMethods(performance.Trace.__proto__),
    getAttribute: dart.fnType(core.String, [core.String]),
    getAttributes: dart.fnType(core.Map$(core.String, dart.dynamic), []),
    getMetric: dart.fnType(core.int, [core.String]),
    incrementMetric: dart.fnType(dart.void, [core.String], [core.int]),
    putAttribute: dart.fnType(dart.void, [core.String, core.String]),
    removeAttribute: dart.fnType(dart.void, [core.String]),
    start: dart.fnType(dart.void, []),
    stop: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(performance.Trace, "package:firebase/src/performance.dart");
  const _onMessageController = dart.privateName(messaging, "_onMessageController");
  const _onTokenRefresh = dart.privateName(messaging, "_onTokenRefresh");
  const _onBackgroundMessage = dart.privateName(messaging, "_onBackgroundMessage");
  let C14;
  const _createOnMessageStream = dart.privateName(messaging, "_createOnMessageStream");
  const _createBackgroundMessagedStream = dart.privateName(messaging, "_createBackgroundMessagedStream");
  const _createNullStream = dart.privateName(messaging, "_createNullStream");
  messaging.Messaging = class Messaging extends js$.JsObjectWrapper$(dart.lazyJSType(() => dart.global.firebase.messaging.Messaging, "firebase.messaging.Messaging")) {
    static getInstance(jsObject) {
      let t4, t3, t2, t1;
      if (jsObject == null) {
        return null;
      }
      t1 = messaging.Messaging._expando;
      t2 = jsObject;
      t3 = t1._get(t2);
      return t3 == null ? (t4 = new messaging.Messaging._fromJsObject(jsObject), t1._set(t2, t4), t4) : t3;
    }
    static isSupported() {
      return dart.global.firebase.messaging.isSupported();
    }
    usePublicVapidKey(key) {
      this.jsObject.usePublicVapidKey(key);
    }
    useServiceWorker(registration) {
      this.jsObject.useServiceWorker(registration);
    }
    deleteToken(token) {
      this.jsObject.deleteToken(token);
    }
    requestPermission() {
      return async.async(dart.dynamic, (function* requestPermission() {
        yield utils.handleThenable(dart.void, this.jsObject.requestPermission()).then(dart.dynamic, C14 || CT.C14);
      }).bind(this));
    }
    getToken() {
      return utils.handleThenable(core.String, this.jsObject.getToken());
    }
    get onMessage() {
      return this[_createOnMessageStream](this[_onMessageController]);
    }
    get onBackgroundMessage() {
      return this[_createBackgroundMessagedStream](this[_onBackgroundMessage]);
    }
    get onTokenRefresh() {
      return this[_createNullStream](this[_onTokenRefresh]);
    }
    [_createOnMessageStream](controller) {
      if (controller == null) {
        controller = StreamControllerOfPayload().broadcast({sync: true});
        let nextWrapper = js.allowInterop(dynamicToNull(), dart.fn(payload => {
          controller.add(new messaging.Payload._fromJsObject(dart.anonymousJSType("PayloadJsImpl")._check(payload)));
        }, dynamicToNull()));
        let errorWrapper = js.allowInterop(dynamicToNull(), dart.fn(e => {
          controller.addError(e);
        }, dynamicToNull()));
        this.jsObject.onMessage(dart.assertInterop(nextWrapper), dart.assertInterop(errorWrapper));
      }
      return controller.stream;
    }
    [_createBackgroundMessagedStream](controller) {
      if (controller == null) {
        controller = StreamControllerOfPayload().broadcast({sync: true});
        let nextWrapper = js.allowInterop(dynamicToNull(), dart.fn(payload => {
          controller.add(new messaging.Payload._fromJsObject(dart.anonymousJSType("PayloadJsImpl")._check(payload)));
        }, dynamicToNull()));
        this.jsObject.setBackgroundMessageHandler(dart.assertInterop(nextWrapper));
      }
      return controller.stream;
    }
    [_createNullStream](controller) {
      if (controller == null) {
        let nextWrapper = js.allowInterop(dynamicToNull(), dart.fn(_ => null, dynamicToNull()));
        let errorWrapper = js.allowInterop(dynamicToNull(), dart.fn(e => {
          controller.addError(e);
        }, dynamicToNull()));
        let onSnapshotUnsubscribe = null;
        const startListen = () => {
          onSnapshotUnsubscribe = this.jsObject.onTokenRefresh(dart.assertInterop(nextWrapper), dart.assertInterop(errorWrapper));
        };
        dart.fn(startListen, VoidTovoid());
        function stopListen() {
          onSnapshotUnsubscribe();
          onSnapshotUnsubscribe = null;
        }
        dart.fn(stopListen, VoidTovoid());
        controller = StreamControllerOfNull().broadcast({onListen: startListen, onCancel: stopListen, sync: true});
      }
      return StreamOfNull()._check(controller.stream);
    }
  };
  (messaging.Messaging._fromJsObject = function(jsObject) {
    this[_onMessageController] = null;
    this[_onTokenRefresh] = null;
    this[_onBackgroundMessage] = null;
    messaging.Messaging.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = messaging.Messaging.prototype;
  dart.addTypeTests(messaging.Messaging);
  dart.setMethodSignature(messaging.Messaging, () => ({
    __proto__: dart.getMethods(messaging.Messaging.__proto__),
    usePublicVapidKey: dart.fnType(dart.void, [core.String]),
    useServiceWorker: dart.fnType(dart.void, [dart.dynamic]),
    deleteToken: dart.fnType(dart.void, [core.String]),
    requestPermission: dart.fnType(async.Future, []),
    getToken: dart.fnType(async.Future$(core.String), []),
    [_createOnMessageStream]: dart.fnType(async.Stream$(messaging.Payload), [async.StreamController$(messaging.Payload)]),
    [_createBackgroundMessagedStream]: dart.fnType(async.Stream$(messaging.Payload), [async.StreamController$(messaging.Payload)]),
    [_createNullStream]: dart.fnType(async.Stream$(core.Null), [async.StreamController])
  }));
  dart.setGetterSignature(messaging.Messaging, () => ({
    __proto__: dart.getGetters(messaging.Messaging.__proto__),
    onMessage: async.Stream$(messaging.Payload),
    onBackgroundMessage: async.Stream$(messaging.Payload),
    onTokenRefresh: async.Stream$(core.Null)
  }));
  dart.setLibraryUri(messaging.Messaging, "package:firebase/src/messaging.dart");
  dart.setFieldSignature(messaging.Messaging, () => ({
    __proto__: dart.getFields(messaging.Messaging.__proto__),
    [_onMessageController]: dart.fieldType(async.StreamController$(messaging.Payload)),
    [_onTokenRefresh]: dart.fieldType(async.StreamController$(core.Null)),
    [_onBackgroundMessage]: dart.fieldType(async.StreamController$(messaging.Payload))
  }));
  dart.defineLazy(messaging.Messaging, {
    /*messaging.Messaging._expando*/get _expando() {
      return new (ExpandoOfMessaging()).new();
    }
  });
  messaging.Notification = class Notification extends js$.JsObjectWrapper$(dart.anonymousJSType("NotificationJsImpl")) {
    get title() {
      return this.jsObject.title;
    }
    get body() {
      return this.jsObject.body;
    }
    get clickAction() {
      return this.jsObject.click_action;
    }
    get icon() {
      return this.jsObject.icon;
    }
  };
  (messaging.Notification._fromJsObject = function(jsObject) {
    messaging.Notification.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = messaging.Notification.prototype;
  dart.addTypeTests(messaging.Notification);
  dart.setGetterSignature(messaging.Notification, () => ({
    __proto__: dart.getGetters(messaging.Notification.__proto__),
    title: core.String,
    body: core.String,
    clickAction: core.String,
    icon: core.String
  }));
  dart.setLibraryUri(messaging.Notification, "package:firebase/src/messaging.dart");
  messaging.Payload = class Payload extends js$.JsObjectWrapper$(dart.anonymousJSType("PayloadJsImpl")) {
    get notification() {
      return new messaging.Notification._fromJsObject(this.jsObject.notification);
    }
    get collapseKey() {
      return this.jsObject.collapse_key;
    }
    get from() {
      return this.jsObject.from;
    }
    get data() {
      return MapOfString$dynamic()._check(utils.dartify(this.jsObject.data));
    }
  };
  (messaging.Payload._fromJsObject = function(jsObject) {
    messaging.Payload.__proto__.fromJsObject.call(this, jsObject);
    ;
  }).prototype = messaging.Payload.prototype;
  dart.addTypeTests(messaging.Payload);
  dart.setGetterSignature(messaging.Payload, () => ({
    __proto__: dart.getGetters(messaging.Payload.__proto__),
    notification: messaging.Notification,
    collapseKey: core.String,
    from: core.String,
    data: core.Map$(core.String, dart.dynamic)
  }));
  dart.setLibraryUri(messaging.Payload, "package:firebase/src/messaging.dart");
  dart.trackLibraries("packages/firebase/firebase", {
    "package:firebase/src/analytics.dart": analytics,
    "package:firebase/src/top_level.dart": top_level,
    "package:firebase/src/remote_config.dart": remote_config,
    "package:firebase/src/performance.dart": performance,
    "package:firebase/src/messaging.dart": messaging,
    "package:firebase/firebase.dart": firebase
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["src/analytics.dart","src/top_level.dart","src/remote_config.dart","src/performance.dart","src/messaging.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;uBAOiE;;AAC7D,UAAI,AAAS,QAAD,IAAI;AACd,cAAO;;AAET,WAAO;WAAS,QAAQ;WAAT;mBAAW,aAAc,sCAAc,QAAQ,GAA/C;IACjB;aAKqB,WAAiC,aAC5B;AACxB,UAAI,OAAO,IAAI;AACqD,QAAlE,AAAS,uBAAS,SAAS,EAAE,YAAM,WAAW,GAAG,AAAQ,OAAD;;AAER,QAAhD,AAAS,uBAAS,SAAS,EAAE,YAAM,WAAW;;IAElD;kCAEwC;AACS,MAA/C,AAAS,4CAA8B,OAAO;IAChD;qBAE6B,YAAkC;AAC7D,UAAI,OAAO,IAAI;AAC0C,QAAvD,AAAS,+BAAiB,UAAU,EAAE,AAAQ,OAAD;;AAER,QAArC,AAAS,+BAAiB,UAAU;;IAExC;cAEsB,IAA0B;AAC9C,UAAI,OAAO,IAAI;AAC2B,QAAxC,AAAS,wBAAU,EAAE,EAAE,AAAQ,OAAD;;AAER,QAAtB,AAAS,wBAAU,EAAE;;IAEzB;sBAEoC,YACV;AACxB,UAAI,OAAO,IAAI;AACoD,QAAjE,AAAS,gCAAkB,AAAW,UAAD,WAAW,AAAQ,OAAD;;AAER,QAA/C,AAAS,gCAAkB,AAAW,UAAD;;IAEzC;;gDAvC0D;AAC9C,0DAAa,QAAQ;;EAAC;;;;;;;;;;;;MAVrB,4BAAQ;YAAG;;;;;AAyDL,YAAA,AAAS;IAAM;eAClB;AACK,MAAnB,AAAS,uBAAS,CAAC;IACrB;;2DANiD;AACrC,qEAAa,QAAQ;;EAAC;;;;;;;;;;;;mDAU8B;AACpD,6DAAa,QAAQ;;EAAC;;;;;IC8GrB;;;;;;;AAIQ,YAAA,AAAwC,6CAAR;IAAQ;;;IAH3B;;EAAQ;;;;;;;;;;QAnJhC;QACD;QACA;QACA;QACA;QACA;QACA;QACA;QACA;AACe,IAAxB,AAAK,IAAD,IAAC,OAAL,qBAAK;AAEL;AACE,YAAW,qBAAY,mCACV,SACG,MAAM,cACF,UAAU,eACT,WAAW,aACb,SAAS,iBACL,aAAa,qBACT,iBAAiB,iBACrB,aAAa,SACrB,KAAK,GAChB,IAAI;;UACD;AACP,oBAAI,6BAAmB,CAAC;AAC2C,QAAjE,WAAM,+CAA6B;;AAG9B,MAAP;;EAEJ;gCAWgB;AACV,mBAAY,AAAK,IAAD,IAAI,OAAQ,yBAAa,IAAI,IAAI;AAErD,UAAW,qBAAY,QAAQ;EACjC;kCAKe;AACT,mBAAY,AAAI,GAAD,IAAI,OAAQ,0BAAc,AAAI,GAAD,aAAa;AAE7D,UAAY,uBAAY,QAAQ;EAClC;0CAQuB;AACjB,mBACC,AAAI,GAAD,IAAI,OAAQ,8BAAkB,AAAI,GAAD,aAAa;AAEtD,UAAgB,+BAAY,QAAQ;EACtC;wCAQqB;AACf,mBACC,AAAI,GAAD,IAAI,OAAQ,6BAAiB,AAAI,GAAD,aAAa;AAErD,UAAe,6BAAY,QAAQ;EACrC;4CAKyB;AACnB,mBACC,AAAI,GAAD,IAAI,OAAQ,+BAAmB,AAAI,GAAD,aAAa;AAEvD,UAAiB,iCAAY,QAAQ;EACvC;4CAKyB;AACnB,mBACC,AAAI,GAAD,IAAI,OAAQ,+BAAmB,AAAI,GAAD,aAAa;AAEvD,UAAiB,iCAAY,QAAQ;EACvC;4CAKyB;AACnB,mBACC,AAAI,GAAD,IAAI,OAAQ,+BAAmB,AAAI,GAAD,aAAa;AAEvD,UAAiB,iCAAY,QAAQ;EACvC;iDAK+B;AACzB,mBAAY,AAAI,GAAD,IAAI,OACjB,kCAAsB,AAAI,GAAD,aACzB;AAEN,UAAoB,wCAAY,QAAQ;EAC1C;4CAKyB;AACnB,mBACC,AAAI,GAAD,IAAI,OAAQ,+BAAmB,AAAI,GAAD,aAAa;AAEvD,UAAiB,iCAAY,QAAQ;EACvC;gDAK6B;AACvB,mBAAY,AAAI,GAAD,IAAI,OACjB,iCAAqB,AAAI,GAAD,aACxB;AAEN,UAAmB,qCAAY,QAAQ;EACzC;6DAWwB;AACtB,QAAU,0BAAN,KAAK;AACP,YAAO;;AAGT,kBAAI,oBAAe,KAAK,EAAE;AACpB,oBAAU,oBAAe,KAAK,EAAE;AACpC,YAAe,AAA6B,aAArC,OAAO,EAAI,8BACN,YAAR,OAAO,EAAI;;AAGjB,UAAO;EACT;;;AAnLsB,YAAS,AAI1B,AACA,0CADI,QAAS,KAAU,mGAAY,CAAC;IAC5B;;;MAEA,yBAAe;;;;;;;;;;uBCjByB;;AACjD,UAAI,AAAS,QAAD,IAAI;AACd,cAAO;;AAET,WAAO;WAAS,QAAQ;WAAT;mBAAW,aAAiB,6CAAc,QAAQ,GAAlD;IACjB;;AAOE,YAA4B,sDAAc,AAAS;IACrD;;AAeE,YAAW,oCAAa,iBAAW,AAAS;IAC9C;sBAEuC;AACA,MAArC,AAAS,8BAAgB,YAAM,KAAK;IACtC;;AAKE,UAA6B,aAAzB,AAAS,iCAAkB;AAC7B,cAAO;;AAEP,cAAgB,8CAA2B,AAAS;;IAExD;;AAIE,cAAQ,AAAS;;;AAEb,gBAA+B;;;;AAE/B,gBAA+B;;;;AAE/B,gBAA+B;;;;AAE/B,gBAA+B;;;;AAE/B,eAAO;AACP,gBAAO;;;IAEb;;AAKqB;AACnB,cAAO,iCAAe,AAAS;MACjC;;;AAG8B;AAC5B,cAAO,iCAAe,AAAS;MACjC;;;AAGkB;AAChB,cAAO,iCAAe,AAAS;MACjC;;;AAK6B;AAC3B,cAAO,iCAAe,AAAS;MACjC;;;AAIQ,iBAAO,wBAAsB,AAAS;AACtC,oBAAU,AAAK,IAAD,6CAChB,QAAS,KAAM,iEAAoC,CAAC,GAAE,iCAAS,CAAC;AACpE,yDAAkD,OAAO;IAC3D;eAIuB;AACrB,YAAO,AAAS,0BAAW,GAAG;IAChC;cAIqB;AACnB,YAAO,AAAS,yBAAU,GAAG;IAC/B;cAIwB;AACtB,YAAO,AAAS,yBAAU,GAAG;IAC/B;aAGkC;AAChC,YAAyB,mDAAc,AAAS,uBAAS,GAAG;IAC9D;gBAEsC;AAK3B,MAJT,AAAS,0BAIR,qBAAC,KAAK;IACT;;uDApH8C;AAClC,iEAAa,QAAQ;;EAAC;;;;;;;;;;;;;;;;;;;;;;;;;;;;MAVrB,mCAAQ;YAAG;;;;;AAyItB,YAAO,AAAS;IAClB;;AAIE,YAAO,AAAS;IAClB;;AAIE,YAAO,AAAS;IAClB;;AAIE,cAAQ,AAAS;;;AAEb,gBAA+B;;;;AAE/B,gBAA+B;;;;AAE/B,gBAA+B;;;;AAE/B,eAAO;AACP,gBAAO;;;IAEb;;4DAjC4C;AAChC,sEAAa,QAAQ;;EAAC;;;;;;;;;;;;;;;;;IA6CpC;;+DATK;;;;EASL;;;;;;;;;;;;;;;AAUI,YAAO,sCAAuB,AAAS;IACzC;6BAEkC;AAC0B,MAA1D,AAAS,2CAA6B,AAAM,KAAD;IAC7C;;AAKE,YAAO,sCAAuB,AAAS;IACzC;2BAEgC;AACoB,MAAlD,AAAS,mCAAqB,AAAM,KAAD;IACrC;;+DArBkD;AACtC,yEAAa,QAAQ;;EAAC;;;;;;;;;;;;;;;;;;;;;IAoCpC;;+DAZK;;;;EAYL;;;;;;;;;;;;;;;;;;IAOA;;4DAJK;;;;EAIL;;;;;;;;;;;;;;uBChO4C;;AACxC,UAAI,AAAS,QAAD,IAAI;AACd,cAAO;;AAET,WAAO;WAAS,QAAQ;WAAT;mBAAW,aAAgB,0CAAc,QAAQ,GAAjD;IACjB;UAKmB;AACjB,YAAa,oCAAa,AAAS,oBAAM,SAAS;IACpD;;oDALgE;AACpD,8DAAa,QAAQ;;EAAC;;;;;;;;MAXrB,gCAAQ;YAAG;;;;iBAqBG;AACzB,YAAO,AAAS,4BAAa,IAAI;IACnC;;AAGE,0CAAO,cAAQ,AAAS;IAC1B;cAEqB;AACnB,YAAO,AAAS,yBAAU,UAAU;IACtC;oBAE4B,YAAiB;AAC3C,UAAI,GAAG,IAAI;AACgC,QAAzC,AAAS,8BAAgB,UAAU,EAAE,GAAG;;AAEJ,QAApC,AAAS,8BAAgB,UAAU;;IAEvC;iBAEyB,MAAa;AACF,MAAlC,AAAS,2BAAa,IAAI,EAAE,KAAK;IACnC;oBAE4B;AACI,MAA9B,AAAS,8BAAgB,IAAI;IAC/B;;AAGkB,MAAhB,AAAS;IACX;;AAGiB,MAAf,AAAS;IACX;;6CApCmD;AACvC,wDAAa,QAAQ;;EAAC;;;;;;;;;;;;;;;;;;;;;;uBCf6B;;AAC7D,UAAI,AAAS,QAAD,IAAI;AACd,cAAO;;AAET,WAAO;WAAS,QAAQ;WAAT;mBAAW,aAAc,sCAAc,QAAQ,GAA/C;IACjB;;AAE6B;IAA+B;sBAO9B;AACG,MAA/B,AAAS,gCAAkB,GAAG;IAChC;qBAIsB;AACmB,MAAvC,AAAS,+BAAiB,YAAY;IACxC;gBAIwB;AACK,MAA3B,AAAS,0BAAY,KAAK;IAC5B;;AAIwB;AAC0C,QAAhE,MAAM,AAA6C,gCAA9B,AAAS;MAChC;;;AAI6B,+CAAe,AAAS;IAAW;;AAQ/B,0CAAuB;IAAqB;;AAKzE,mDAAgC;IAAqB;;AAItB,qCAAkB;IAAgB;6BAEJ;AAC/D,UAAI,AAAW,UAAD,IAAI;AACmC,QAAnD,aAA8B,6CAAgB;AACxC,0BAAc,iCAAa,QAAC;AACc,UAA9C,AAAW,UAAD,KAAa,iFAAc,OAAO;;AAExC,2BAAe,iCAAa,QAAC;AACX,UAAtB,AAAW,UAAD,UAAU,CAAC;;AAEsB,QAA7C,AAAS,2CAAU,WAAW,sBAAE,YAAY;;AAE9C,YAAO,AAAW,WAAD;IACnB;sCAG8B;AAC5B,UAAI,AAAW,UAAD,IAAI;AACmC,QAAnD,aAA8B,6CAAgB;AACxC,0BAAc,iCAAa,QAAC;AACc,UAA9C,AAAW,UAAD,KAAa,iFAAc,OAAO;;AAEG,QAAjD,AAAS,6DAA4B,WAAW;;AAElD,YAAO,AAAW,WAAD;IACnB;wBAEgD;AAC9C,UAAI,AAAW,UAAD,IAAI;AACV,0BAAc,iCAAa,QAAC,KAAM;AAClC,2BAAe,iCAAa,QAAC;AACX,UAAtB,AAAW,UAAD,UAAU,CAAC;;AAEV;AAEb,cAAK;AAEmD,UADtD,wBACI,AAAS,gDAAe,WAAW,sBAAE,YAAY;;;AAGvD,iBAAK;AACoB,UAAvB,AAAqB,qBAAA;AACO,UAA5B,wBAAwB;;;AAIkC,QAD5D,aAAW,8CACG,WAAW,YAAY,UAAU,QAAQ;;AAEzD,mCAAO,AAAW,UAAD;IACnB;;gDAhG0D;IA+BhC;IACH;IACG;AAhCd,0DAAa,QAAQ;;EAAC;;;;;;;;;;;;;;;;;;;;;;;;;;;MAZrB,4BAAQ;YAAG;;;;;AAmHJ,YAAA,AAAS;IAAK;;AACf,YAAA,AAAS;IAAI;;AACN,YAAA,AAAS;IAAY;;AAC5B,YAAA,AAAS;IAAI;;mDANgC;AACpD,6DAAa,QAAQ;;EAAC;;;;;;;;;;;;AAa9B,YAAa,0CAAc,AAAS;IAAa;;AAC3B,YAAA,AAAS;IAAY;;AAC5B,YAAA,AAAS;IAAI;;AACC,wDAAQ,AAAS;IAAK;;8CAPD;AAC1C,wDAAa,QAAQ;;EAAC","file":"firebase.ddc.js"}');
  // Exports:
  return {
    src__analytics: analytics,
    src__top_level: top_level,
    src__remote_config: remote_config,
    src__performance: performance,
    src__messaging: messaging,
    firebase: firebase
  };
});

//# sourceMappingURL=firebase.ddc.js.map
