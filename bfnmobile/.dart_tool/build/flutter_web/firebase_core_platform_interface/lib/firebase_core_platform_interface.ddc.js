define(['dart_sdk', 'packages/quiver/core', 'packages/flutter/src/gestures/arena'], function(dart_sdk, packages__quiver__core, packages__flutter__src__gestures__arena) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const _interceptors = dart_sdk._interceptors;
  const async = dart_sdk.async;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const core$ = packages__quiver__core.core;
  const platform_channel = packages__flutter__src__gestures__arena.src__services__platform_channel;
  const message_codecs = packages__flutter__src__gestures__arena.src__services__message_codecs;
  const firebase_options = Object.create(dart.library);
  const platform_firebase_app = Object.create(dart.library);
  const firebase_core_platform_interface = Object.create(dart.library);
  const method_channel_firebase_core = Object.create(dart.library);
  const $_get = dartx._get;
  const $toString = dartx.toString;
  const $map = dartx.map;
  const $toList = dartx.toList;
  let IdentityMapOfString$String = () => (IdentityMapOfString$String = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  let dynamicToPlatformFirebaseApp = () => (dynamicToPlatformFirebaseApp = dart.constFn(dart.fnType(platform_firebase_app.PlatformFirebaseApp, [dart.dynamic])))();
  let ListOfPlatformFirebaseApp = () => (ListOfPlatformFirebaseApp = dart.constFn(core.List$(platform_firebase_app.PlatformFirebaseApp)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: message_codecs.StandardMessageCodec.prototype
      });
    },
    get C1() {
      return C1 = dart.const({
        __proto__: message_codecs.StandardMethodCodec.prototype,
        [StandardMethodCodec_messageCodec]: C2 || CT.C2
      });
    },
    get C0() {
      return C0 = dart.const({
        __proto__: platform_channel.MethodChannel.prototype,
        [MethodChannel__binaryMessenger]: null,
        [MethodChannel_codec]: C1 || CT.C1,
        [MethodChannel_name]: "plugins.flutter.io/firebase_core"
      });
    }
  });
  const apiKey$ = dart.privateName(firebase_options, "FirebaseOptions.apiKey");
  const bundleID$ = dart.privateName(firebase_options, "FirebaseOptions.bundleID");
  const clientID$ = dart.privateName(firebase_options, "FirebaseOptions.clientID");
  const trackingID$ = dart.privateName(firebase_options, "FirebaseOptions.trackingID");
  const gcmSenderID$ = dart.privateName(firebase_options, "FirebaseOptions.gcmSenderID");
  const projectID$ = dart.privateName(firebase_options, "FirebaseOptions.projectID");
  const androidClientID$ = dart.privateName(firebase_options, "FirebaseOptions.androidClientID");
  const googleAppID$ = dart.privateName(firebase_options, "FirebaseOptions.googleAppID");
  const databaseURL$ = dart.privateName(firebase_options, "FirebaseOptions.databaseURL");
  const deepLinkURLScheme$ = dart.privateName(firebase_options, "FirebaseOptions.deepLinkURLScheme");
  const storageBucket$ = dart.privateName(firebase_options, "FirebaseOptions.storageBucket");
  firebase_options.FirebaseOptions = class FirebaseOptions extends core.Object {
    get apiKey() {
      return this[apiKey$];
    }
    set apiKey(value) {
      super.apiKey = value;
    }
    get bundleID() {
      return this[bundleID$];
    }
    set bundleID(value) {
      super.bundleID = value;
    }
    get clientID() {
      return this[clientID$];
    }
    set clientID(value) {
      super.clientID = value;
    }
    get trackingID() {
      return this[trackingID$];
    }
    set trackingID(value) {
      super.trackingID = value;
    }
    get gcmSenderID() {
      return this[gcmSenderID$];
    }
    set gcmSenderID(value) {
      super.gcmSenderID = value;
    }
    get projectID() {
      return this[projectID$];
    }
    set projectID(value) {
      super.projectID = value;
    }
    get androidClientID() {
      return this[androidClientID$];
    }
    set androidClientID(value) {
      super.androidClientID = value;
    }
    get googleAppID() {
      return this[googleAppID$];
    }
    set googleAppID(value) {
      super.googleAppID = value;
    }
    get databaseURL() {
      return this[databaseURL$];
    }
    set databaseURL(value) {
      super.databaseURL = value;
    }
    get deepLinkURLScheme() {
      return this[deepLinkURLScheme$];
    }
    set deepLinkURLScheme(value) {
      super.deepLinkURLScheme = value;
    }
    get storageBucket() {
      return this[storageBucket$];
    }
    set storageBucket(value) {
      super.storageBucket = value;
    }
    get asMap() {
      return new (IdentityMapOfString$String()).from(["APIKey", this.apiKey, "bundleID", this.bundleID, "clientID", this.clientID, "trackingID", this.trackingID, "GCMSenderID", this.gcmSenderID, "projectID", this.projectID, "androidClientID", this.androidClientID, "googleAppID", this.googleAppID, "databaseURL", this.databaseURL, "deepLinkURLScheme", this.deepLinkURLScheme, "storageBucket", this.storageBucket]);
    }
    _equals(other) {
      if (other == null) return false;
      if (this === other) return true;
      if (!firebase_options.FirebaseOptions.is(other)) return false;
      return dart.equals(dart.dload(other, 'apiKey'), this.apiKey) && dart.equals(dart.dload(other, 'bundleID'), this.bundleID) && dart.equals(dart.dload(other, 'clientID'), this.clientID) && dart.equals(dart.dload(other, 'trackingID'), this.trackingID) && dart.equals(dart.dload(other, 'gcmSenderID'), this.gcmSenderID) && dart.equals(dart.dload(other, 'projectID'), this.projectID) && dart.equals(dart.dload(other, 'androidClientID'), this.androidClientID) && dart.equals(dart.dload(other, 'googleAppID'), this.googleAppID) && dart.equals(dart.dload(other, 'databaseURL'), this.databaseURL) && dart.equals(dart.dload(other, 'deepLinkURLScheme'), this.deepLinkURLScheme) && dart.equals(dart.dload(other, 'storageBucket'), this.storageBucket);
    }
    get hashCode() {
      return core$.hashObjects(JSArrayOfString().of([this.apiKey, this.bundleID, this.clientID, this.trackingID, this.gcmSenderID, this.projectID, this.androidClientID, this.googleAppID, this.databaseURL, this.deepLinkURLScheme, this.storageBucket]));
    }
    toString() {
      return dart.toString(this.asMap);
    }
  };
  (firebase_options.FirebaseOptions.new = function(opts) {
    let apiKey = opts && 'apiKey' in opts ? opts.apiKey : null;
    let bundleID = opts && 'bundleID' in opts ? opts.bundleID : null;
    let clientID = opts && 'clientID' in opts ? opts.clientID : null;
    let trackingID = opts && 'trackingID' in opts ? opts.trackingID : null;
    let gcmSenderID = opts && 'gcmSenderID' in opts ? opts.gcmSenderID : null;
    let projectID = opts && 'projectID' in opts ? opts.projectID : null;
    let androidClientID = opts && 'androidClientID' in opts ? opts.androidClientID : null;
    let googleAppID = opts && 'googleAppID' in opts ? opts.googleAppID : null;
    let databaseURL = opts && 'databaseURL' in opts ? opts.databaseURL : null;
    let deepLinkURLScheme = opts && 'deepLinkURLScheme' in opts ? opts.deepLinkURLScheme : null;
    let storageBucket = opts && 'storageBucket' in opts ? opts.storageBucket : null;
    this[apiKey$] = apiKey;
    this[bundleID$] = bundleID;
    this[clientID$] = clientID;
    this[trackingID$] = trackingID;
    this[gcmSenderID$] = gcmSenderID;
    this[projectID$] = projectID;
    this[androidClientID$] = androidClientID;
    this[googleAppID$] = googleAppID;
    this[databaseURL$] = databaseURL;
    this[deepLinkURLScheme$] = deepLinkURLScheme;
    this[storageBucket$] = storageBucket;
    if (!(googleAppID != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_core_platform_interface/src/firebase_options.dart", 22, 15, "googleAppID != null");
    ;
  }).prototype = firebase_options.FirebaseOptions.prototype;
  (firebase_options.FirebaseOptions.from = function(map) {
    this[apiKey$] = core.String._check(map[$_get]("APIKey"));
    this[bundleID$] = core.String._check(map[$_get]("bundleID"));
    this[clientID$] = core.String._check(map[$_get]("clientID"));
    this[trackingID$] = core.String._check(map[$_get]("trackingID"));
    this[gcmSenderID$] = core.String._check(map[$_get]("GCMSenderID"));
    this[projectID$] = core.String._check(map[$_get]("projectID"));
    this[androidClientID$] = core.String._check(map[$_get]("androidClientID"));
    this[googleAppID$] = core.String._check(map[$_get]("googleAppID"));
    this[databaseURL$] = core.String._check(map[$_get]("databaseURL"));
    this[deepLinkURLScheme$] = core.String._check(map[$_get]("deepLinkURLScheme"));
    this[storageBucket$] = core.String._check(map[$_get]("storageBucket"));
    if (!(this.googleAppID != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_core_platform_interface/src/firebase_options.dart", 36, 12, "googleAppID != null");
  }).prototype = firebase_options.FirebaseOptions.prototype;
  dart.addTypeTests(firebase_options.FirebaseOptions);
  dart.setGetterSignature(firebase_options.FirebaseOptions, () => ({
    __proto__: dart.getGetters(firebase_options.FirebaseOptions.__proto__),
    asMap: core.Map$(core.String, core.String)
  }));
  dart.setLibraryUri(firebase_options.FirebaseOptions, "package:firebase_core_platform_interface/src/firebase_options.dart");
  dart.setFieldSignature(firebase_options.FirebaseOptions, () => ({
    __proto__: dart.getFields(firebase_options.FirebaseOptions.__proto__),
    apiKey: dart.finalFieldType(core.String),
    bundleID: dart.finalFieldType(core.String),
    clientID: dart.finalFieldType(core.String),
    trackingID: dart.finalFieldType(core.String),
    gcmSenderID: dart.finalFieldType(core.String),
    projectID: dart.finalFieldType(core.String),
    androidClientID: dart.finalFieldType(core.String),
    googleAppID: dart.finalFieldType(core.String),
    databaseURL: dart.finalFieldType(core.String),
    deepLinkURLScheme: dart.finalFieldType(core.String),
    storageBucket: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(firebase_options.FirebaseOptions, ['_equals', 'toString']);
  dart.defineExtensionAccessors(firebase_options.FirebaseOptions, ['hashCode']);
  const name$ = dart.privateName(platform_firebase_app, "PlatformFirebaseApp.name");
  const options$ = dart.privateName(platform_firebase_app, "PlatformFirebaseApp.options");
  platform_firebase_app.PlatformFirebaseApp = class PlatformFirebaseApp extends core.Object {
    get name() {
      return this[name$];
    }
    set name(value) {
      super.name = value;
    }
    get options() {
      return this[options$];
    }
    set options(value) {
      super.options = value;
    }
    _equals(other) {
      if (other == null) return false;
      if (this === other) return true;
      if (!platform_firebase_app.PlatformFirebaseApp.is(other)) return false;
      return dart.equals(dart.dload(other, 'name'), this.name) && dart.equals(dart.dload(other, 'options'), this.options);
    }
    get hashCode() {
      return core$.hash2(this.name, this.options);
    }
    toString() {
      return dart.str(dart.wrapType(platform_firebase_app.PlatformFirebaseApp)) + "(" + dart.str(this.name) + ")";
    }
  };
  (platform_firebase_app.PlatformFirebaseApp.new = function(name, options) {
    this[name$] = name;
    this[options$] = options;
    ;
  }).prototype = platform_firebase_app.PlatformFirebaseApp.prototype;
  dart.addTypeTests(platform_firebase_app.PlatformFirebaseApp);
  dart.setLibraryUri(platform_firebase_app.PlatformFirebaseApp, "package:firebase_core_platform_interface/src/platform_firebase_app.dart");
  dart.setFieldSignature(platform_firebase_app.PlatformFirebaseApp, () => ({
    __proto__: dart.getFields(platform_firebase_app.PlatformFirebaseApp.__proto__),
    name: dart.finalFieldType(core.String),
    options: dart.finalFieldType(firebase_options.FirebaseOptions)
  }));
  dart.defineExtensionMethods(platform_firebase_app.PlatformFirebaseApp, ['_equals', 'toString']);
  dart.defineExtensionAccessors(platform_firebase_app.PlatformFirebaseApp, ['hashCode']);
  const _verifyProvidesDefaultImplementations = dart.privateName(firebase_core_platform_interface, "_verifyProvidesDefaultImplementations");
  firebase_core_platform_interface.FirebaseCorePlatform = class FirebaseCorePlatform extends core.Object {
    get isMock() {
      return false;
    }
    static get instance() {
      return firebase_core_platform_interface.FirebaseCorePlatform._instance;
    }
    static set instance(instance) {
      if (!dart.test(instance.isMock)) {
        try {
          instance[_verifyProvidesDefaultImplementations]();
        } catch (e) {
          let _ = dart.getThrown(e);
          if (core.NoSuchMethodError.is(_)) {
            dart.throw(new core.AssertionError.new("Platform interfaces must not be implemented with `implements`"));
          } else
            throw e;
        }
      }
      firebase_core_platform_interface.FirebaseCorePlatform._instance = instance;
    }
    [_verifyProvidesDefaultImplementations]() {
    }
    appNamed(name) {
      dart.throw(new core.UnimplementedError.new("appNamed() has not been implemented."));
    }
    configure(name, options) {
      dart.throw(new core.UnimplementedError.new("configure() has not been implemented."));
    }
    allApps() {
      dart.throw(new core.UnimplementedError.new("allApps() has not been implemented."));
    }
  };
  (firebase_core_platform_interface.FirebaseCorePlatform.new = function() {
    ;
  }).prototype = firebase_core_platform_interface.FirebaseCorePlatform.prototype;
  dart.addTypeTests(firebase_core_platform_interface.FirebaseCorePlatform);
  dart.setMethodSignature(firebase_core_platform_interface.FirebaseCorePlatform, () => ({
    __proto__: dart.getMethods(firebase_core_platform_interface.FirebaseCorePlatform.__proto__),
    [_verifyProvidesDefaultImplementations]: dart.fnType(dart.void, []),
    appNamed: dart.fnType(async.Future$(platform_firebase_app.PlatformFirebaseApp), [core.String]),
    configure: dart.fnType(async.Future$(dart.void), [core.String, firebase_options.FirebaseOptions]),
    allApps: dart.fnType(async.Future$(core.List$(platform_firebase_app.PlatformFirebaseApp)), [])
  }));
  dart.setGetterSignature(firebase_core_platform_interface.FirebaseCorePlatform, () => ({
    __proto__: dart.getGetters(firebase_core_platform_interface.FirebaseCorePlatform.__proto__),
    isMock: core.bool
  }));
  dart.setLibraryUri(firebase_core_platform_interface.FirebaseCorePlatform, "package:firebase_core_platform_interface/firebase_core_platform_interface.dart");
  dart.defineLazy(firebase_core_platform_interface.FirebaseCorePlatform, {
    /*firebase_core_platform_interface.FirebaseCorePlatform._instance*/get _instance() {
      return new method_channel_firebase_core.MethodChannelFirebaseCore.new();
    },
    set _instance(_) {}
  });
  const MethodChannel__binaryMessenger = dart.privateName(platform_channel, "MethodChannel._binaryMessenger");
  let C2;
  const StandardMethodCodec_messageCodec = dart.privateName(message_codecs, "StandardMethodCodec.messageCodec");
  let C1;
  const MethodChannel_codec = dart.privateName(platform_channel, "MethodChannel.codec");
  const MethodChannel_name = dart.privateName(platform_channel, "MethodChannel.name");
  let C0;
  method_channel_firebase_core.MethodChannelFirebaseCore = class MethodChannelFirebaseCore extends firebase_core_platform_interface.FirebaseCorePlatform {
    appNamed(name) {
      return async.async(platform_firebase_app.PlatformFirebaseApp, function* appNamed() {
        let app = (yield method_channel_firebase_core.MethodChannelFirebaseCore.channel.invokeMapMethod(core.String, dart.dynamic, "FirebaseApp#appNamed", name));
        if (app == null) return null;
        return new platform_firebase_app.PlatformFirebaseApp.new(core.String._check(app[$_get]("name")), new firebase_options.FirebaseOptions.from(core.Map._check(app[$_get]("options"))));
      });
    }
    configure(name, options) {
      return method_channel_firebase_core.MethodChannelFirebaseCore.channel.invokeMethod(dart.void, "FirebaseApp#configure", new (IdentityMapOfString$dynamic()).from(["name", name, "options", options.asMap]));
    }
    allApps() {
      return async.async(ListOfPlatformFirebaseApp(), function* allApps() {
        let t1, t1$;
        let result = (yield method_channel_firebase_core.MethodChannelFirebaseCore.channel.invokeListMethod(dart.dynamic, "FirebaseApp#allApps"));
        t1$ = (t1 = result, t1 == null ? null : t1[$map](platform_firebase_app.PlatformFirebaseApp, dart.fn(app => new platform_firebase_app.PlatformFirebaseApp.new(core.String._check(dart.dsend(app, '_get', ["name"])), new firebase_options.FirebaseOptions.from(core.Map._check(dart.dsend(app, '_get', ["options"])))), dynamicToPlatformFirebaseApp())));
        return t1$ == null ? null : t1$[$toList]();
      });
    }
  };
  (method_channel_firebase_core.MethodChannelFirebaseCore.new = function() {
    ;
  }).prototype = method_channel_firebase_core.MethodChannelFirebaseCore.prototype;
  dart.addTypeTests(method_channel_firebase_core.MethodChannelFirebaseCore);
  dart.setLibraryUri(method_channel_firebase_core.MethodChannelFirebaseCore, "package:firebase_core_platform_interface/src/method_channel_firebase_core.dart");
  dart.defineLazy(method_channel_firebase_core.MethodChannelFirebaseCore, {
    /*method_channel_firebase_core.MethodChannelFirebaseCore.channel*/get channel() {
      return C0 || CT.C0;
    }
  });
  dart.trackLibraries("packages/firebase_core_platform_interface/firebase_core_platform_interface", {
    "package:firebase_core_platform_interface/src/firebase_options.dart": firebase_options,
    "package:firebase_core_platform_interface/src/platform_firebase_app.dart": platform_firebase_app,
    "package:firebase_core_platform_interface/firebase_core_platform_interface.dart": firebase_core_platform_interface,
    "package:firebase_core_platform_interface/src/method_channel_firebase_core.dart": method_channel_firebase_core
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["src/firebase_options.dart","src/platform_firebase_app.dart","firebase_core_platform_interface.dart","src/method_channel_firebase_core.dart"],"names":[],"mappings":"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","file":"firebase_core_platform_interface.ddc.js"}');
  // Exports:
  return {
    src__firebase_options: firebase_options,
    src__platform_firebase_app: platform_firebase_app,
    firebase_core_platform_interface: firebase_core_platform_interface,
    src__method_channel_firebase_core: method_channel_firebase_core
  };
});

//# sourceMappingURL=firebase_core_platform_interface.ddc.js.map
