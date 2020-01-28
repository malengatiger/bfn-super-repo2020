define(['dart_sdk', 'packages/flutter/src/gestures/arena', 'packages/platform/platform', 'packages/flutter/src/widgets/actions'], function(dart_sdk, packages__flutter__src__gestures__arena, packages__platform__platform, packages__flutter__src__widgets__actions) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const ui = dart_sdk.ui;
  const _js_helper = dart_sdk._js_helper;
  const collection = dart_sdk.collection;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const platform_channel = packages__flutter__src__gestures__arena.src__services__platform_channel;
  const message_codec = packages__flutter__src__gestures__arena.src__services__message_codec;
  const message_codecs = packages__flutter__src__gestures__arena.src__services__message_codecs;
  const platform = packages__platform__platform.src__interface__platform;
  const local_platform = packages__platform__platform.src__interface__local_platform;
  const binding = packages__flutter__src__widgets__actions.src__widgets__binding;
  const firebase_messaging = Object.create(dart.library);
  const $_get = dartx._get;
  let StreamControllerOfIosNotificationSettings = () => (StreamControllerOfIosNotificationSettings = dart.constFn(async.StreamController$(firebase_messaging.IosNotificationSettings)))();
  let StreamControllerOfString = () => (StreamControllerOfString = dart.constFn(async.StreamController$(core.String)))();
  let __Tovoid = () => (__Tovoid = dart.constFn(dart.fnType(dart.void, [], {backgroundChannel: platform_channel.MethodChannel}, {})))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  let MapOfString$bool = () => (MapOfString$bool = dart.constFn(core.Map$(core.String, core.bool)))();
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
  let IdentityMapOfString$bool = () => (IdentityMapOfString$bool = dart.constFn(_js_helper.IdentityMap$(core.String, core.bool)))();
  let LinkedHashMapOfString$dynamic = () => (LinkedHashMapOfString$dynamic = dart.constFn(collection.LinkedHashMap$(core.String, dart.dynamic)))();
  let FutureOfvoid = () => (FutureOfvoid = dart.constFn(async.Future$(dart.void)))();
  let MethodCallToFutureOfvoid = () => (MethodCallToFutureOfvoid = dart.constFn(dart.fnType(FutureOfvoid(), [message_codec.MethodCall])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.const({
        __proto__: firebase_messaging.IosNotificationSettings.prototype,
        [IosNotificationSettings_provisional]: false,
        [IosNotificationSettings_badge]: true,
        [IosNotificationSettings_alert]: true,
        [IosNotificationSettings_sound]: true
      });
    },
    get C1() {
      return C1 = dart.fn(firebase_messaging._fcmSetupBackgroundChannel, __Tovoid());
    },
    get C4() {
      return C4 = dart.const({
        __proto__: message_codecs.StandardMessageCodec.prototype
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: message_codecs.StandardMethodCodec.prototype,
        [StandardMethodCodec_messageCodec]: C4 || CT.C4
      });
    },
    get C2() {
      return C2 = dart.const({
        __proto__: platform_channel.MethodChannel.prototype,
        [MethodChannel__binaryMessenger]: null,
        [MethodChannel_codec]: C3 || CT.C3,
        [MethodChannel_name]: "plugins.flutter.io/firebase_messaging"
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: local_platform.LocalPlatform.prototype
      });
    },
    get C6() {
      return C6 = dart.const({
        __proto__: platform_channel.MethodChannel.prototype,
        [MethodChannel__binaryMessenger]: null,
        [MethodChannel_codec]: C3 || CT.C3,
        [MethodChannel_name]: "plugins.flutter.io/firebase_messaging_background"
      });
    }
  });
  const _onMessage = dart.privateName(firebase_messaging, "_onMessage");
  const _onBackgroundMessage = dart.privateName(firebase_messaging, "_onBackgroundMessage");
  const _onLaunch = dart.privateName(firebase_messaging, "_onLaunch");
  const _onResume = dart.privateName(firebase_messaging, "_onResume");
  const _iosSettingsStreamController = dart.privateName(firebase_messaging, "_iosSettingsStreamController");
  const _tokenStreamController = dart.privateName(firebase_messaging, "_tokenStreamController");
  const _channel = dart.privateName(firebase_messaging, "_channel");
  const _platform = dart.privateName(firebase_messaging, "_platform");
  const IosNotificationSettings_provisional = dart.privateName(firebase_messaging, "IosNotificationSettings.provisional");
  const IosNotificationSettings_badge = dart.privateName(firebase_messaging, "IosNotificationSettings.badge");
  const IosNotificationSettings_alert = dart.privateName(firebase_messaging, "IosNotificationSettings.alert");
  const IosNotificationSettings_sound = dart.privateName(firebase_messaging, "IosNotificationSettings.sound");
  let C0;
  const _handleMethod = dart.privateName(firebase_messaging, "_handleMethod");
  let C1;
  const MethodChannel__binaryMessenger = dart.privateName(platform_channel, "MethodChannel._binaryMessenger");
  let C4;
  const StandardMethodCodec_messageCodec = dart.privateName(message_codecs, "StandardMethodCodec.messageCodec");
  let C3;
  const MethodChannel_codec = dart.privateName(platform_channel, "MethodChannel.codec");
  const MethodChannel_name = dart.privateName(platform_channel, "MethodChannel.name");
  let C2;
  let C5;
  firebase_messaging.FirebaseMessaging = class FirebaseMessaging extends core.Object {
    static new() {
      return firebase_messaging.FirebaseMessaging._instance;
    }
    requestNotificationPermissions(iosSettings = C0 || CT.C0) {
      if (!dart.test(this[_platform].isIOS)) {
        return null;
      }
      return this[_channel].invokeMethod(core.bool, "requestNotificationPermissions", iosSettings.toMap());
    }
    get onIosSettingsRegistered() {
      return this[_iosSettingsStreamController].stream;
    }
    configure(opts) {
      let onMessage = opts && 'onMessage' in opts ? opts.onMessage : null;
      let onBackgroundMessage = opts && 'onBackgroundMessage' in opts ? opts.onBackgroundMessage : null;
      let onLaunch = opts && 'onLaunch' in opts ? opts.onLaunch : null;
      let onResume = opts && 'onResume' in opts ? opts.onResume : null;
      this[_onMessage] = onMessage;
      this[_onLaunch] = onLaunch;
      this[_onResume] = onResume;
      this[_channel].setMethodCallHandler(dart.bind(this, _handleMethod));
      this[_channel].invokeMethod(dart.void, "configure");
      if (onBackgroundMessage != null) {
        this[_onBackgroundMessage] = onBackgroundMessage;
        let backgroundSetupHandle = ui.PluginUtilities.getCallbackHandle(C1 || CT.C1);
        let backgroundMessageHandle = ui.PluginUtilities.getCallbackHandle(this[_onBackgroundMessage]);
        if (backgroundMessageHandle == null) {
          dart.throw(new core.ArgumentError.new("Failed to setup background message handler! `onBackgroundMessage`\n          should be a TOP-LEVEL OR STATIC FUNCTION and should NOT be tied to a\n          class or an anonymous function."));
        }
        this[_channel].invokeMethod(core.bool, "FcmDartService#start", new (IdentityMapOfString$dynamic()).from(["setupHandle", backgroundSetupHandle.toRawHandle(), "backgroundHandle", backgroundMessageHandle.toRawHandle()]));
      }
    }
    get onTokenRefresh() {
      return this[_tokenStreamController].stream;
    }
    getToken() {
      return async.async(core.String, (function* getToken() {
        return yield this[_channel].invokeMethod(core.String, "getToken");
      }).bind(this));
    }
    subscribeToTopic(topic) {
      return this[_channel].invokeMethod(dart.void, "subscribeToTopic", topic);
    }
    unsubscribeFromTopic(topic) {
      return this[_channel].invokeMethod(dart.void, "unsubscribeFromTopic", topic);
    }
    deleteInstanceID() {
      return async.async(core.bool, (function* deleteInstanceID() {
        return yield this[_channel].invokeMethod(core.bool, "deleteInstanceID");
      }).bind(this));
    }
    autoInitEnabled() {
      return async.async(core.bool, (function* autoInitEnabled() {
        return yield this[_channel].invokeMethod(core.bool, "autoInitEnabled");
      }).bind(this));
    }
    setAutoInitEnabled(enabled) {
      return async.async(dart.void, (function* setAutoInitEnabled() {
        yield this[_channel].invokeMethod(dart.void, "setAutoInitEnabled", enabled);
      }).bind(this));
    }
    [_handleMethod](call) {
      return async.async(dart.dynamic, (function* _handleMethod() {
        switch (call.method) {
          case "onToken":
          {
            let token = core.String._check(call.arguments);
            this[_tokenStreamController].add(token);
            return null;
          }
          case "onIosSettingsRegistered":
          {
            this[_iosSettingsStreamController].add(new firebase_messaging.IosNotificationSettings._fromMap(MapOfString$bool()._check(dart.dgsend(call.arguments, [core.String, core.bool], 'cast', []))));
            return null;
          }
          case "onMessage":
          {
            return this[_onMessage](MapOfString$dynamic()._check(dart.dgsend(call.arguments, [core.String, dart.dynamic], 'cast', [])));
          }
          case "onLaunch":
          {
            return this[_onLaunch](MapOfString$dynamic()._check(dart.dgsend(call.arguments, [core.String, dart.dynamic], 'cast', [])));
          }
          case "onResume":
          {
            return this[_onResume](MapOfString$dynamic()._check(dart.dgsend(call.arguments, [core.String, dart.dynamic], 'cast', [])));
          }
          default:
          {
            dart.throw(new core.UnsupportedError.new("Unrecognized JSON message"));
          }
        }
      }).bind(this));
    }
  };
  (firebase_messaging.FirebaseMessaging.private = function(channel, platform) {
    this[_onMessage] = null;
    this[_onBackgroundMessage] = null;
    this[_onLaunch] = null;
    this[_onResume] = null;
    this[_iosSettingsStreamController] = StreamControllerOfIosNotificationSettings().broadcast();
    this[_tokenStreamController] = StreamControllerOfString().broadcast();
    this[_channel] = channel;
    this[_platform] = platform;
    ;
  }).prototype = firebase_messaging.FirebaseMessaging.prototype;
  dart.addTypeTests(firebase_messaging.FirebaseMessaging);
  dart.setMethodSignature(firebase_messaging.FirebaseMessaging, () => ({
    __proto__: dart.getMethods(firebase_messaging.FirebaseMessaging.__proto__),
    requestNotificationPermissions: dart.fnType(async.FutureOr$(core.bool), [], [firebase_messaging.IosNotificationSettings]),
    configure: dart.fnType(dart.void, [], {onBackgroundMessage: dart.fnType(async.Future, [core.Map$(core.String, dart.dynamic)]), onLaunch: dart.fnType(async.Future, [core.Map$(core.String, dart.dynamic)]), onMessage: dart.fnType(async.Future, [core.Map$(core.String, dart.dynamic)]), onResume: dart.fnType(async.Future, [core.Map$(core.String, dart.dynamic)])}, {}),
    getToken: dart.fnType(async.Future$(core.String), []),
    subscribeToTopic: dart.fnType(async.Future$(dart.void), [core.String]),
    unsubscribeFromTopic: dart.fnType(async.Future$(dart.void), [core.String]),
    deleteInstanceID: dart.fnType(async.Future$(core.bool), []),
    autoInitEnabled: dart.fnType(async.Future$(core.bool), []),
    setAutoInitEnabled: dart.fnType(async.Future$(dart.void), [core.bool]),
    [_handleMethod]: dart.fnType(async.Future, [message_codec.MethodCall])
  }));
  dart.setGetterSignature(firebase_messaging.FirebaseMessaging, () => ({
    __proto__: dart.getGetters(firebase_messaging.FirebaseMessaging.__proto__),
    onIosSettingsRegistered: async.Stream$(firebase_messaging.IosNotificationSettings),
    onTokenRefresh: async.Stream$(core.String)
  }));
  dart.setLibraryUri(firebase_messaging.FirebaseMessaging, "package:firebase_messaging/firebase_messaging.dart");
  dart.setFieldSignature(firebase_messaging.FirebaseMessaging, () => ({
    __proto__: dart.getFields(firebase_messaging.FirebaseMessaging.__proto__),
    [_channel]: dart.finalFieldType(platform_channel.MethodChannel),
    [_platform]: dart.finalFieldType(platform.Platform),
    [_onMessage]: dart.fieldType(dart.fnType(async.Future, [core.Map$(core.String, dart.dynamic)])),
    [_onBackgroundMessage]: dart.fieldType(dart.fnType(async.Future, [core.Map$(core.String, dart.dynamic)])),
    [_onLaunch]: dart.fieldType(dart.fnType(async.Future, [core.Map$(core.String, dart.dynamic)])),
    [_onResume]: dart.fieldType(dart.fnType(async.Future, [core.Map$(core.String, dart.dynamic)])),
    [_iosSettingsStreamController]: dart.finalFieldType(async.StreamController$(firebase_messaging.IosNotificationSettings)),
    [_tokenStreamController]: dart.finalFieldType(async.StreamController$(core.String))
  }));
  dart.defineLazy(firebase_messaging.FirebaseMessaging, {
    /*firebase_messaging.FirebaseMessaging._instance*/get _instance() {
      return new firebase_messaging.FirebaseMessaging.private(C2 || CT.C2, C5 || CT.C5);
    }
  });
  firebase_messaging.IosNotificationSettings = class IosNotificationSettings extends core.Object {
    get sound() {
      return this[sound$];
    }
    set sound(value) {
      super.sound = value;
    }
    get alert() {
      return this[alert$];
    }
    set alert(value) {
      super.alert = value;
    }
    get badge() {
      return this[badge$];
    }
    set badge(value) {
      super.badge = value;
    }
    get provisional() {
      return this[provisional$];
    }
    set provisional(value) {
      super.provisional = value;
    }
    toMap() {
      return new (IdentityMapOfString$bool()).from(["sound", this.sound, "alert", this.alert, "badge", this.badge, "provisional", this.provisional]);
    }
    toString() {
      return "PushNotificationSettings " + dart.str(this.toMap());
    }
  };
  (firebase_messaging.IosNotificationSettings.new = function(opts) {
    let sound = opts && 'sound' in opts ? opts.sound : true;
    let alert = opts && 'alert' in opts ? opts.alert : true;
    let badge = opts && 'badge' in opts ? opts.badge : true;
    let provisional = opts && 'provisional' in opts ? opts.provisional : false;
    this[sound$] = sound;
    this[alert$] = alert;
    this[badge$] = badge;
    this[provisional$] = provisional;
    ;
  }).prototype = firebase_messaging.IosNotificationSettings.prototype;
  (firebase_messaging.IosNotificationSettings._fromMap = function(settings) {
    this[sound$] = settings[$_get]("sound");
    this[alert$] = settings[$_get]("alert");
    this[badge$] = settings[$_get]("badge");
    this[provisional$] = settings[$_get]("provisional");
    ;
  }).prototype = firebase_messaging.IosNotificationSettings.prototype;
  dart.addTypeTests(firebase_messaging.IosNotificationSettings);
  const sound$ = IosNotificationSettings_sound;
  const alert$ = IosNotificationSettings_alert;
  const badge$ = IosNotificationSettings_badge;
  const provisional$ = IosNotificationSettings_provisional;
  dart.setMethodSignature(firebase_messaging.IosNotificationSettings, () => ({
    __proto__: dart.getMethods(firebase_messaging.IosNotificationSettings.__proto__),
    toMap: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(firebase_messaging.IosNotificationSettings, "package:firebase_messaging/firebase_messaging.dart");
  dart.setFieldSignature(firebase_messaging.IosNotificationSettings, () => ({
    __proto__: dart.getFields(firebase_messaging.IosNotificationSettings.__proto__),
    sound: dart.finalFieldType(core.bool),
    alert: dart.finalFieldType(core.bool),
    badge: dart.finalFieldType(core.bool),
    provisional: dart.finalFieldType(core.bool)
  }));
  dart.defineExtensionMethods(firebase_messaging.IosNotificationSettings, ['toString']);
  let C6;
  firebase_messaging._fcmSetupBackgroundChannel = function _fcmSetupBackgroundChannel(opts) {
    let backgroundChannel = opts && 'backgroundChannel' in opts ? opts.backgroundChannel : C6 || CT.C6;
    return async.async(dart.void, function* _fcmSetupBackgroundChannel() {
      binding.WidgetsFlutterBinding.ensureInitialized();
      backgroundChannel.setMethodCallHandler(dart.fn(call => async.async(dart.void, function*() {
        if (call.method === "handleBackgroundMessage") {
          let handle = new ui.CallbackHandle.fromRawHandle(core.int._check(dart.dsend(call.arguments, '_get', ["handle"])));
          let handlerFunction = ui.PluginUtilities.getCallbackFromHandle(handle);
          try {
            yield dart.dcall(handlerFunction, [LinkedHashMapOfString$dynamic().from(core.Map._check(dart.dsend(call.arguments, '_get', ["message"])))]);
          } catch (e$) {
            let e = dart.getThrown(e$);
            core.print("Unable to handle incoming background message.");
            core.print(e);
          }
          return FutureOfvoid().value();
        }
      }), MethodCallToFutureOfvoid()));
      backgroundChannel.invokeMethod(dart.void, "FcmDartService#initialized");
    });
  };
  dart.trackLibraries("packages/firebase_messaging/firebase_messaging", {
    "package:firebase_messaging/firebase_messaging.dart": firebase_messaging
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["firebase_messaging.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAyDiC;IAAS;mCAwBd;AAExB,qBAAK,AAAU;AACb,cAAO;;AAET,YAAO,AAAS,wCACd,kCACA,AAAY,WAAD;IAEf;;AASE,YAAO,AAA6B;IACtC;;UAIiB;UACA;UACA;UACA;AAEO,MAAtB,mBAAa,SAAS;AACF,MAApB,kBAAY,QAAQ;AACA,MAApB,kBAAY,QAAQ;AACwB,MAA5C,AAAS,8CAAqB;AACU,MAAxC,AAAS,uCAAmB;AAC5B,UAAI,mBAAmB,IAAI;AACiB,QAA1C,6BAAuB,mBAAmB;AACrB,oCACD;AACC,sCACD,qCAAkB;AAEtC,YAAI,AAAwB,uBAAD,IAAI;AAK5B,UAJD,WAAM,2BACJ;;AAYH,QAND,AAAS,uCACP,wBACiB,0CACf,eAAe,AAAsB,qBAAD,gBACpC,oBAAoB,AAAwB,uBAAD;;IAInD;;AAOE,YAAO,AAAuB;IAChC;;AAGuB;AACrB,cAAO,OAAM,AAAS,yCAAqB;MAC7C;;qBAMqC;AACnC,YAAO,AAAS,wCAAmB,oBAAoB,KAAK;IAC9D;yBAGyC;AACvC,YAAO,AAAS,wCAAmB,wBAAwB,KAAK;IAClE;;AAO6B;AAC3B,cAAO,OAAM,AAAS,uCAAmB;MAC3C;;;AAG4B;AAC1B,cAAO,OAAM,AAAS,uCAAmB;MAC3C;;uBAGqC;AAAN;AACmC,QAAhE,MAAM,AAAS,uCAAmB,sBAAsB,OAAO;MACjE;;oBAEyC;AAAZ;AAC3B,gBAAQ,AAAK,IAAD;;;AAEK,2CAAQ,AAAK,IAAD;AACQ,YAAjC,AAAuB,iCAAI,KAAK;AAChC,kBAAO;;;;AAGkC,YADzC,AAA6B,uCAA4B,kFACtC,YAAf,AAAK,IAAD;AACR,kBAAO;;;;AAEP,kBAAO,+CAA0B,YAAf,AAAK,IAAD;;;;AAEtB,kBAAO,8CAAyB,YAAf,AAAK,IAAD;;;;AAErB,kBAAO,8CAAyB,YAAf,AAAK,IAAD;;;;AAE8B,YAAnD,WAAM,8BAAiB;;;MAE7B;;;2DA/IwC,SAAkB;IAW3C;IACA;IACA;IACA;IAkBiC,qCAA6B;IA+C9C,+BAAuB;IA9EvC,iBAAE,OAAO;IACR,kBAAE,QAAQ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;MAEK,8CAAS;YAAqB;;;;IA4JlD;;;;;;IACA;;;;;;IACA;;;;;;IACA;;;;;;;AAIT,YAAqB,wCACnB,SAAS,YACT,SAAS,YACT,SAAS,YACT,eAAe;IAEnB;;AAGqB,YAAA,AAAqC,wCAAT;IAAS;;;QA5BnD;QACA;QACA;QACA;IAHA;IACA;IACA;IACA;;EACL;kEAEiD;IACvC,eAAE,AAAQ,QAAA,QAAC;IACX,eAAE,AAAQ,QAAA,QAAC;IACX,eAAE,AAAQ,QAAA,QAAC;IACL,qBAAE,AAAQ,QAAA,QAAC;;EAAc;;;;;;;;;;;;;;;;;;;;;QAnM1B;AADY;AAIY,MAAnB;AAmBpB,MAfF,AAAkB,iBAAD,sBAAsB,QAAY;AACjD,YAAI,AAAK,AAAO,IAAR,YAAW;AACI,uBACF,oDAA4B,WAAd,AAAK,IAAD,qBAAW;AACjC,gCACK,yCAAsB,MAAM;AAChD;AAE2D,YADzD,MAAqB,WAAf,eAAe,wDACuB,WAAd,AAAK,IAAD,qBAAW;;gBACtC;AAC+C,YAAtD,WAAM;AACE,YAAR,WAAM,CAAC;;AAET;;MAEH;AAIiE,MAAlE,AAAkB,iBAAD,yBAAoB;IACvC","file":"firebase_messaging.ddc.js"}');
  // Exports:
  return {
    firebase_messaging: firebase_messaging
  };
});

//# sourceMappingURL=firebase_messaging.ddc.js.map
