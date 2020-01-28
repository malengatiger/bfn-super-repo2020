define(['dart_sdk', 'packages/flutter/src/gestures/arena', 'packages/flutter/src/foundation/_bitfield_web'], function(dart_sdk, packages__flutter__src__gestures__arena, packages__flutter__src__foundation___bitfield_web) {
  'use strict';
  const core = dart_sdk.core;
  const _engine = dart_sdk._engine;
  const _js_helper = dart_sdk._js_helper;
  const async = dart_sdk.async;
  const typed_data = dart_sdk.typed_data;
  const ui = dart_sdk.ui;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const binary_messenger = packages__flutter__src__gestures__arena.src__services__binary_messenger;
  const message_codecs = packages__flutter__src__gestures__arena.src__services__message_codecs;
  const message_codec = packages__flutter__src__gestures__arena.src__services__message_codec;
  const assertions = packages__flutter__src__foundation___bitfield_web.src__foundation__assertions;
  const plugin_registry = Object.create(dart.library);
  const flutter_web_plugins = Object.create(dart.library);
  const plugin_event_channel = Object.create(dart.library);
  const $_get = dartx._get;
  const $remove = dartx.remove;
  const $_set = dartx._set;
  const $toString = dartx.toString;
  let FutureOfByteData = () => (FutureOfByteData = dart.constFn(async.Future$(typed_data.ByteData)))();
  let ByteDataToFutureOfByteData = () => (ByteDataToFutureOfByteData = dart.constFn(dart.fnType(FutureOfByteData(), [typed_data.ByteData])))();
  let IdentityMapOfString$ByteDataToFutureOfByteData = () => (IdentityMapOfString$ByteDataToFutureOfByteData = dart.constFn(_js_helper.IdentityMap$(core.String, ByteDataToFutureOfByteData())))();
  let CompleterOfByteData = () => (CompleterOfByteData = dart.constFn(async.Completer$(typed_data.ByteData)))();
  let ByteDataToNull = () => (ByteDataToNull = dart.constFn(dart.fnType(core.Null, [typed_data.ByteData])))();
  let FutureOfNull = () => (FutureOfNull = dart.constFn(async.Future$(core.Null)))();
  let ByteDataTovoid = () => (ByteDataTovoid = dart.constFn(dart.fnType(dart.void, [typed_data.ByteData])))();
  let ByteDataAndFnToFutureOfNull = () => (ByteDataAndFnToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [typed_data.ByteData, ByteDataTovoid()])))();
  let dynamicToNull = () => (dynamicToNull = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C1() {
      return C1 = dart.const({
        __proto__: message_codecs.StandardMessageCodec.prototype
      });
    },
    get C0() {
      return C0 = dart.const({
        __proto__: message_codecs.StandardMethodCodec.prototype,
        [StandardMethodCodec_messageCodec]: C1 || CT.C1
      });
    }
  });
  const _binaryMessenger$ = dart.privateName(plugin_registry, "_binaryMessenger");
  plugin_registry.PluginRegistry = class PluginRegistry extends core.Object {
    registrarFor(key) {
      return new plugin_registry.Registrar.new(this[_binaryMessenger$]);
    }
    registerMessageHandler() {
      _engine.webOnlySetPluginHandler(dart.bind(this[_binaryMessenger$], 'handlePlatformMessage'));
    }
  };
  (plugin_registry.PluginRegistry.new = function(_binaryMessenger) {
    this[_binaryMessenger$] = _binaryMessenger;
    ;
  }).prototype = plugin_registry.PluginRegistry.prototype;
  dart.addTypeTests(plugin_registry.PluginRegistry);
  dart.setMethodSignature(plugin_registry.PluginRegistry, () => ({
    __proto__: dart.getMethods(plugin_registry.PluginRegistry.__proto__),
    registrarFor: dart.fnType(plugin_registry.Registrar, [core.Type]),
    registerMessageHandler: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(plugin_registry.PluginRegistry, "package:flutter_web_plugins/src/plugin_registry.dart");
  dart.setFieldSignature(plugin_registry.PluginRegistry, () => ({
    __proto__: dart.getFields(plugin_registry.PluginRegistry.__proto__),
    [_binaryMessenger$]: dart.finalFieldType(binary_messenger.BinaryMessenger)
  }));
  const messenger$ = dart.privateName(plugin_registry, "Registrar.messenger");
  plugin_registry.Registrar = class Registrar extends core.Object {
    get messenger() {
      return this[messenger$];
    }
    set messenger(value) {
      super.messenger = value;
    }
  };
  (plugin_registry.Registrar.new = function(messenger) {
    this[messenger$] = messenger;
    ;
  }).prototype = plugin_registry.Registrar.prototype;
  dart.addTypeTests(plugin_registry.Registrar);
  dart.setLibraryUri(plugin_registry.Registrar, "package:flutter_web_plugins/src/plugin_registry.dart");
  dart.setFieldSignature(plugin_registry.Registrar, () => ({
    __proto__: dart.getFields(plugin_registry.Registrar.__proto__),
    messenger: dart.finalFieldType(binary_messenger.BinaryMessenger)
  }));
  const _handlers = dart.privateName(plugin_registry, "_handlers");
  plugin_registry._PlatformBinaryMessenger = class _PlatformBinaryMessenger extends binary_messenger.BinaryMessenger {
    handlePlatformMessage(channel, data, callback) {
      return async.async(dart.void, (function* handlePlatformMessage() {
        let response = null;
        try {
          let handler = this[_handlers][$_get](channel);
          if (handler != null) {
            response = (yield handler(data));
          } else {
            ui.channelBuffers.push(channel, data, callback);
            callback = null;
          }
        } catch (e) {
          let exception = dart.getThrown(e);
          let stack = dart.stackTrace(e);
          assertions.FlutterError.reportError(new assertions.FlutterErrorDetails.new({exception: exception, stack: stack, library: "flutter web shell", context: new assertions.ErrorDescription.new("during a plugin platform message call")}));
        } finally {
          if (callback != null) {
            callback(response);
          }
        }
      }).bind(this));
    }
    send(channel, message) {
      let completer = CompleterOfByteData().new();
      ui.window.onPlatformMessage(channel, message, dart.fn(reply => {
        try {
          completer.complete(reply);
        } catch (e) {
          let exception = dart.getThrown(e);
          let stack = dart.stackTrace(e);
          assertions.FlutterError.reportError(new assertions.FlutterErrorDetails.new({exception: exception, stack: stack, library: "flutter web shell", context: new assertions.ErrorDescription.new("during a plugin-to-framework message")}));
        }
      }, ByteDataToNull()));
      return completer.future;
    }
    setMessageHandler(channel, handler) {
      if (handler == null)
        this[_handlers][$remove](channel);
      else
        this[_handlers][$_set](channel, handler);
      ui.channelBuffers.drain(channel, dart.fn((data, callback) => async.async(core.Null, (function*() {
        yield this.handlePlatformMessage(channel, data, callback);
      }).bind(this)), ByteDataAndFnToFutureOfNull()));
    }
    setMockMessageHandler(channel, handler) {
      dart.throw(assertions.FlutterError.new("Setting mock handlers is not supported on the platform side."));
    }
  };
  (plugin_registry._PlatformBinaryMessenger.new = function() {
    this[_handlers] = new (IdentityMapOfString$ByteDataToFutureOfByteData()).new();
    plugin_registry._PlatformBinaryMessenger.__proto__.new.call(this);
    ;
  }).prototype = plugin_registry._PlatformBinaryMessenger.prototype;
  dart.addTypeTests(plugin_registry._PlatformBinaryMessenger);
  dart.setMethodSignature(plugin_registry._PlatformBinaryMessenger, () => ({
    __proto__: dart.getMethods(plugin_registry._PlatformBinaryMessenger.__proto__),
    handlePlatformMessage: dart.fnType(async.Future$(dart.void), [core.String, typed_data.ByteData, dart.fnType(dart.void, [typed_data.ByteData])]),
    send: dart.fnType(async.Future$(typed_data.ByteData), [core.String, typed_data.ByteData]),
    setMessageHandler: dart.fnType(dart.void, [core.String, dart.fnType(async.Future$(typed_data.ByteData), [typed_data.ByteData])]),
    setMockMessageHandler: dart.fnType(dart.void, [core.String, dart.fnType(async.Future$(typed_data.ByteData), [typed_data.ByteData])])
  }));
  dart.setLibraryUri(plugin_registry._PlatformBinaryMessenger, "package:flutter_web_plugins/src/plugin_registry.dart");
  dart.setFieldSignature(plugin_registry._PlatformBinaryMessenger, () => ({
    __proto__: dart.getFields(plugin_registry._PlatformBinaryMessenger.__proto__),
    [_handlers]: dart.finalFieldType(core.Map$(core.String, dart.fnType(async.Future$(typed_data.ByteData), [typed_data.ByteData])))
  }));
  dart.defineLazy(plugin_registry, {
    /*plugin_registry.webPluginRegistry*/get webPluginRegistry() {
      return new plugin_registry.PluginRegistry.new(plugin_registry.pluginBinaryMessenger);
    },
    /*plugin_registry.pluginBinaryMessenger*/get pluginBinaryMessenger() {
      return new plugin_registry._PlatformBinaryMessenger.new();
    }
  });
  let C1;
  const StandardMethodCodec_messageCodec = dart.privateName(message_codecs, "StandardMethodCodec.messageCodec");
  let C0;
  const _binaryMessenger = dart.privateName(plugin_event_channel, "_binaryMessenger");
  const _is_PluginEventChannel_default = Symbol('_is_PluginEventChannel_default');
  const name$ = dart.privateName(plugin_event_channel, "PluginEventChannel.name");
  const codec$ = dart.privateName(plugin_event_channel, "PluginEventChannel.codec");
  const _binaryMessenger$0 = dart.privateName(plugin_event_channel, "PluginEventChannel._binaryMessenger");
  plugin_event_channel.PluginEventChannel$ = dart.generic(T => {
    let StreamControllerOfT = () => (StreamControllerOfT = dart.constFn(async.StreamController$(T)))();
    let _EventChannelHandlerOfT = () => (_EventChannelHandlerOfT = dart.constFn(plugin_event_channel._EventChannelHandler$(T)))();
    class PluginEventChannel extends core.Object {
      get name() {
        return this[name$];
      }
      set name(value) {
        super.name = value;
      }
      get codec() {
        return this[codec$];
      }
      set codec(value) {
        super.codec = value;
      }
      get [_binaryMessenger]() {
        return this[_binaryMessenger$0];
      }
      set [_binaryMessenger](value) {
        super[_binaryMessenger] = value;
      }
      get binaryMessenger() {
        let t2;
        t2 = this[_binaryMessenger];
        return t2 == null ? plugin_registry.pluginBinaryMessenger : t2;
      }
      set controller(controller) {
        StreamControllerOfT()._check(controller);
        let handler = new (_EventChannelHandlerOfT()).new(this.name, this.codec, controller, this.binaryMessenger);
        this.binaryMessenger.setMessageHandler(this.name, controller == null ? null : dart.bind(handler, 'handle'));
      }
    }
    (PluginEventChannel.new = function(name, codec = C0 || CT.C0, binaryMessenger = null) {
      this[name$] = name;
      this[codec$] = codec;
      if (!(name != null)) dart.assertFailed(null, "org-dartlang-app:///packages/flutter_web_plugins/src/plugin_event_channel.dart", 28, 16, "name != null");
      if (!(codec != null)) dart.assertFailed(null, "org-dartlang-app:///packages/flutter_web_plugins/src/plugin_event_channel.dart", 29, 16, "codec != null");
      this[_binaryMessenger$0] = binaryMessenger;
      ;
    }).prototype = PluginEventChannel.prototype;
    dart.addTypeTests(PluginEventChannel);
    PluginEventChannel.prototype[_is_PluginEventChannel_default] = true;
    dart.setGetterSignature(PluginEventChannel, () => ({
      __proto__: dart.getGetters(PluginEventChannel.__proto__),
      binaryMessenger: binary_messenger.BinaryMessenger
    }));
    dart.setSetterSignature(PluginEventChannel, () => ({
      __proto__: dart.getSetters(PluginEventChannel.__proto__),
      controller: core.Object
    }));
    dart.setLibraryUri(PluginEventChannel, "package:flutter_web_plugins/src/plugin_event_channel.dart");
    dart.setFieldSignature(PluginEventChannel, () => ({
      __proto__: dart.getFields(PluginEventChannel.__proto__),
      name: dart.finalFieldType(core.String),
      codec: dart.finalFieldType(message_codec.MethodCodec),
      [_binaryMessenger]: dart.finalFieldType(binary_messenger.BinaryMessenger)
    }));
    return PluginEventChannel;
  });
  plugin_event_channel.PluginEventChannel = plugin_event_channel.PluginEventChannel$();
  dart.addTypeTests(plugin_event_channel.PluginEventChannel, _is_PluginEventChannel_default);
  const _listen = dart.privateName(plugin_event_channel, "_listen");
  const _cancel = dart.privateName(plugin_event_channel, "_cancel");
  const _is__EventChannelHandler_default = Symbol('_is__EventChannelHandler_default');
  const subscription = dart.privateName(plugin_event_channel, "_EventChannelHandler.subscription");
  plugin_event_channel._EventChannelHandler$ = dart.generic(T => {
    let StreamSubscriptionOfT = () => (StreamSubscriptionOfT = dart.constFn(async.StreamSubscription$(T)))();
    class _EventChannelHandler extends core.Object {
      get subscription() {
        return this[subscription];
      }
      set subscription(value) {
        this[subscription] = StreamSubscriptionOfT()._check(value);
      }
      handle(message) {
        let call = this.codec.decodeMethodCall(message);
        switch (call.method) {
          case "listen":
          {
            return this[_listen]();
          }
          case "cancel":
          {
            return this[_cancel]();
          }
        }
        return null;
      }
      [_listen]() {
        return async.async(typed_data.ByteData, (function* _listen() {
          if (this.subscription != null) {
            yield this.subscription.cancel();
          }
          this.subscription = this.controller.stream.listen(dart.fn(event => {
            this.messenger.send(this.name, this.codec.encodeSuccessEnvelope(event));
          }, dynamicToNull()), {onError: dart.fn(error => {
              this.messenger.send(this.name, this.codec.encodeErrorEnvelope({code: "error", message: dart.toString(error)}));
            }, dynamicToNull())});
          return this.codec.encodeSuccessEnvelope(null);
        }).bind(this));
      }
      [_cancel]() {
        return async.async(typed_data.ByteData, (function* _cancel() {
          if (this.subscription == null) {
            return this.codec.encodeErrorEnvelope({code: "error", message: "No active stream to cancel."});
          }
          yield this.subscription.cancel();
          this.subscription = null;
          return this.codec.encodeSuccessEnvelope(null);
        }).bind(this));
      }
    }
    (_EventChannelHandler.new = function(name, codec, controller, messenger) {
      this[subscription] = null;
      this.name = name;
      this.codec = codec;
      this.controller = controller;
      this.messenger = messenger;
      ;
    }).prototype = _EventChannelHandler.prototype;
    dart.addTypeTests(_EventChannelHandler);
    _EventChannelHandler.prototype[_is__EventChannelHandler_default] = true;
    dart.setMethodSignature(_EventChannelHandler, () => ({
      __proto__: dart.getMethods(_EventChannelHandler.__proto__),
      handle: dart.fnType(async.Future$(typed_data.ByteData), [typed_data.ByteData]),
      [_listen]: dart.fnType(async.Future$(typed_data.ByteData), []),
      [_cancel]: dart.fnType(async.Future$(typed_data.ByteData), [])
    }));
    dart.setLibraryUri(_EventChannelHandler, "package:flutter_web_plugins/src/plugin_event_channel.dart");
    dart.setFieldSignature(_EventChannelHandler, () => ({
      __proto__: dart.getFields(_EventChannelHandler.__proto__),
      name: dart.finalFieldType(core.String),
      codec: dart.finalFieldType(message_codec.MethodCodec),
      controller: dart.finalFieldType(async.StreamController$(T)),
      messenger: dart.finalFieldType(binary_messenger.BinaryMessenger),
      subscription: dart.fieldType(async.StreamSubscription$(T))
    }));
    return _EventChannelHandler;
  });
  plugin_event_channel._EventChannelHandler = plugin_event_channel._EventChannelHandler$();
  dart.addTypeTests(plugin_event_channel._EventChannelHandler, _is__EventChannelHandler_default);
  dart.trackLibraries("packages/flutter_web_plugins/flutter_web_plugins", {
    "package:flutter_web_plugins/src/plugin_registry.dart": plugin_registry,
    "package:flutter_web_plugins/flutter_web_plugins.dart": flutter_web_plugins,
    "package:flutter_web_plugins/src/plugin_event_channel.dart": plugin_event_channel
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["src/plugin_registry.dart","src/plugin_event_channel.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;iBAoB8B;AAAQ,+CAAU;IAAiB;;AAQK,MAAlE,gCAA4C,UAAjB;IAC7B;;;IAdoB;;EAAiB;;;;;;;;;;;;;;IA2Cf;;;;;;;;IApBP;;EAAU;;;;;;;;;0BAqCiB,SAAkB,MACrB;AADL;AAEvB;AACT;AACuB,wBAAU,AAAS,uBAAC,OAAO;AAChD,cAAI,OAAO,IAAI;AACiB,YAA9B,YAAW,MAAM,AAAO,OAAA,CAAC,IAAI;;AAEkB,YAA5C,AAAe,uBAAK,OAAO,EAAE,IAAI,EAAE,QAAQ;AAC/B,YAAf,WAAW;;;cAEN;cAAW;AAMhB,UALW,oCAAY,mDACZ,SAAS,SACb,KAAK,WACH,8BACA,oCAAiB;;AAG5B,cAAI,QAAQ,IAAI;AACI,YAAlB,AAAQ,QAAA,CAAC,QAAQ;;;MAGvB;;SAI6B,SAAkB;AACnB,sBAAY;AAYpC,MAXC,AAAO,4BAAkB,OAAO,EAAE,OAAO,EAAE,QAAU;AACtD;AAC2B,UAAzB,AAAU,SAAD,UAAU,KAAK;;cACjB;cAAW;AAMhB,UALW,oCAAY,mDACZ,SAAS,SACb,KAAK,WACH,8BACA,oCAAiB;;;AAIhC,YAAO,AAAU,UAAD;IAClB;sBAIW,SAAqD;AAC9D,UAAI,AAAQ,OAAD,IAAI;AACY,QAAzB,AAAU,yBAAO,OAAO;;AAEI,QAA5B,AAAS,uBAAC,OAAO,EAAI,OAAO;AAG5B,MAFC,AAAe,wBAAM,OAAO,EAAE,SAAU,MAAyC;AAC9B,QAApD,MAAM,2BAAsB,OAAO,EAAE,IAAI,EAAE,QAAQ;MACpD;IACH;0BAIW,SAAqD;AAEK,MADnE,WAAM,4BACF;IACN;;;IAjEmC,kBAAqC;;;EAkE1E;;;;;;;;;;;;;;;MA3EqB,iCAAiB;YAAG,wCAAe;;MA8ElC,qCAAqB;YAAG;;;;;;;;;;;;;;;MC1G/B;;;;;;MAKK;;;;;;MASI;;;;;;;;AADlB;4BAAoB;MAAqB;;qCAIV;AACH,sBAAU,oCACtC,WACA,YACA,UAAU,EACV;AAGmD,QADrD,AAAgB,uCACZ,WAAM,AAAW,UAAD,IAAI,OAAO,OAAe,UAAR,OAAO;MAC/C;;uCApCO,MACA,qBACW;MAFX;MACA;YAEM,AAAK,IAAD,IAAI;YACR,AAAM,KAAD,IAAI;MACC,2BAAE,eAAe;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;MA0ClB;;;;;;aAEW;AACd,mBAAO,AAAM,4BAAiB,OAAO;AACtD,gBAAQ,AAAK,IAAD;;;AAER,kBAAO;;;;AAEP,kBAAO;;;AAEX,cAAO;MACT;;AAGwB;AACtB,cAAI,qBAAgB;AACS,YAA3B,MAAM,AAAa;;AAOnB,UALF,oBAAe,AAAW,AAAO,8BAAO,QAAS;AACS,YAAxD,AAAU,oBAAK,WAAM,AAAM,iCAAsB,KAAK;yCAC5C,QAAS;AAEqD,cADxE,AAAU,oBAAK,WACX,AAAM,sCAA0B,kBAAwB,cAAN,KAAK;;AAG7D,gBAAO,AAAM,kCAAsB;QACrC;;;AAGwB;AACtB,cAAI,AAAa,qBAAG;AAClB,kBAAO,AAAM,uCACH,kBAAkB;;AAEH,UAA3B,MAAM,AAAa;AACA,UAAnB,oBAAe;AACf,gBAAO,AAAM,kCAAsB;QACrC;;;yCA5C0B,MAAW,OAAY,YAAiB;MAO5C;MAPI;MAAW;MAAY;MAAiB;;IAAU","file":"flutter_web_plugins.ddc.js"}');
  // Exports:
  return {
    src__plugin_registry: plugin_registry,
    flutter_web_plugins: flutter_web_plugins,
    src__plugin_event_channel: plugin_event_channel
  };
});

//# sourceMappingURL=flutter_web_plugins.ddc.js.map
