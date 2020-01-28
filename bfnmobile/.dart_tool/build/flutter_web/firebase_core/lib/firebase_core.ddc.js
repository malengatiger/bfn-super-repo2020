define(['dart_sdk', 'packages/firebase_core_platform_interface/firebase_core_platform_interface'], function(dart_sdk, packages__firebase_core_platform_interface__firebase_core_platform_interface) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const firebase_core_platform_interface = packages__firebase_core_platform_interface__firebase_core_platform_interface.firebase_core_platform_interface;
  const firebase_options = packages__firebase_core_platform_interface__firebase_core_platform_interface.src__firebase_options;
  const platform_firebase_app = packages__firebase_core_platform_interface__firebase_core_platform_interface.src__platform_firebase_app;
  const default_app_name = Object.create(dart.library);
  const firebase_app = Object.create(dart.library);
  const firebase_core = Object.create(dart.library);
  const $map = dartx.map;
  const $toList = dartx.toList;
  const $hashCode = dartx.hashCode;
  let PlatformFirebaseAppToFirebaseApp = () => (PlatformFirebaseAppToFirebaseApp = dart.constFn(dart.fnType(firebase_app.FirebaseApp, [platform_firebase_app.PlatformFirebaseApp])))();
  let ListOfFirebaseApp = () => (ListOfFirebaseApp = dart.constFn(core.List$(firebase_app.FirebaseApp)))();
  const CT = Object.create(null);
  dart.defineLazy(default_app_name, {
    /*default_app_name.firebaseDefaultAppName*/get firebaseDefaultAppName() {
      return "[DEFAULT]";
    }
  });
  const name$ = dart.privateName(firebase_app, "FirebaseApp.name");
  firebase_app.FirebaseApp = class FirebaseApp extends core.Object {
    get name() {
      return this[name$];
    }
    set name(value) {
      super.name = value;
    }
    get options() {
      return async.async(firebase_options.FirebaseOptions, (function* options() {
        let app = (yield firebase_core_platform_interface.FirebaseCorePlatform.instance.appNamed(this.name));
        if (!(app != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_core/src/firebase_app.dart", 28, 12, "app != null");
        return app.options;
      }).bind(this));
    }
    static appNamed(name) {
      return async.async(firebase_app.FirebaseApp, function* appNamed() {
        let app = (yield firebase_core_platform_interface.FirebaseCorePlatform.instance.appNamed(name));
        return app == null ? null : new firebase_app.FirebaseApp.new({name: app.name});
      });
    }
    static configure(opts) {
      let name = opts && 'name' in opts ? opts.name : null;
      let options = opts && 'options' in opts ? opts.options : null;
      return async.async(firebase_app.FirebaseApp, function* configure() {
        if (!(name != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_core/src/firebase_app.dart", 54, 12, "name != null");
        if (!(name != firebase_app.FirebaseApp.defaultAppName)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_core/src/firebase_app.dart", 55, 12, "name != defaultAppName");
        if (!(options != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_core/src/firebase_app.dart", 56, 12, "options != null");
        if (!(options.googleAppID != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_core/src/firebase_app.dart", 57, 12, "options.googleAppID != null");
        let existingApp = (yield firebase_app.FirebaseApp.appNamed(name));
        if (existingApp != null) {
          return existingApp;
        }
        yield firebase_core_platform_interface.FirebaseCorePlatform.instance.configure(name, options);
        return new firebase_app.FirebaseApp.new({name: name});
      });
    }
    static allApps() {
      return async.async(ListOfFirebaseApp(), function* allApps() {
        let t0, t0$;
        let result = (yield firebase_core_platform_interface.FirebaseCorePlatform.instance.allApps());
        t0$ = (t0 = result, t0 == null ? null : t0[$map](firebase_app.FirebaseApp, dart.fn(app => new firebase_app.FirebaseApp.new({name: app.name}), PlatformFirebaseAppToFirebaseApp())));
        return t0$ == null ? null : t0$[$toList]();
      });
    }
    _equals(other) {
      if (other == null) return false;
      if (this === other) return true;
      if (!firebase_app.FirebaseApp.is(other)) return false;
      return dart.equals(dart.dload(other, 'name'), this.name);
    }
    get hashCode() {
      return dart.hashCode(this.name);
    }
    toString() {
      return dart.str(dart.wrapType(firebase_app.FirebaseApp)) + "(" + dart.str(this.name) + ")";
    }
  };
  (firebase_app.FirebaseApp.new = function(opts) {
    let name = opts && 'name' in opts ? opts.name : null;
    this[name$] = name;
    if (!(name != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_core/src/firebase_app.dart", 14, 47, "name != null");
    ;
  }).prototype = firebase_app.FirebaseApp.prototype;
  dart.addTypeTests(firebase_app.FirebaseApp);
  dart.setGetterSignature(firebase_app.FirebaseApp, () => ({
    __proto__: dart.getGetters(firebase_app.FirebaseApp.__proto__),
    options: async.Future$(firebase_options.FirebaseOptions)
  }));
  dart.setLibraryUri(firebase_app.FirebaseApp, "package:firebase_core/src/firebase_app.dart");
  dart.setFieldSignature(firebase_app.FirebaseApp, () => ({
    __proto__: dart.getFields(firebase_app.FirebaseApp.__proto__),
    name: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(firebase_app.FirebaseApp, ['_equals', 'toString']);
  dart.defineExtensionAccessors(firebase_app.FirebaseApp, ['hashCode']);
  dart.defineLazy(firebase_app.FirebaseApp, {
    /*firebase_app.FirebaseApp.defaultAppName*/get defaultAppName() {
      return "[DEFAULT]";
    },
    /*firebase_app.FirebaseApp.instance*/get instance() {
      return new firebase_app.FirebaseApp.new({name: firebase_app.FirebaseApp.defaultAppName});
    }
  });
  dart.trackLibraries("packages/firebase_core/firebase_core", {
    "package:firebase_core/src/default_app_name.dart": default_app_name,
    "package:firebase_core/src/firebase_app.dart": firebase_app,
    "package:firebase_core/firebase_core.dart": firebase_core
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["src/default_app_name.dart","src/firebase_app.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;MAKa,uCAAsB;;;;;;ICWpB;;;;;;;AAQuB;AACR,mBACtB,MAA2B,AAAS,wEAAS;AACjD,cAAO,AAAI,GAAD,IAAI;AACd,cAAO,AAAI,IAAD;MACZ;;oBAI2C;AAAR;AACP,mBACtB,MAA2B,AAAS,wEAAS,IAAI;AACrD,cAAO,AAAI,IAAD,IAAI,OAAO,OAAO,wCAAkB,AAAI,GAAD;MACnD;;;UAamB;UACS;AAFQ;AAIlC,cAAO,AAAK,IAAD,IAAI;AACf,cAAO,AAAK,IAAD,IAAI;AACf,cAAO,AAAQ,OAAD,IAAI;AAClB,cAAO,AAAQ,AAAY,OAAb,gBAAgB;AACZ,2BAAc,MAAkB,kCAAS,IAAI;AAC/D,YAAI,WAAW,IAAI;AACjB,gBAAO,YAAW;;AAEwC,QAA5D,MAA2B,AAAS,yEAAU,IAAI,EAAE,OAAO;AAC3D,cAAO,yCAAkB,IAAI;MAC/B;;;AAIwC;;AACN,sBAC5B,MAA2B,AAAS;AACxC,oBAAO,MAAM,eAAN,OACD,mCACA,QAAqB,OAAQ,wCAAkB,AAAI,GAAD;6BAFjD,OAID;MACR;;;UAGyB;AACvB,UAAI,AAAU,SAAM,KAAK,EAAG,MAAO;AACnC,WAAU,4BAAN,KAAK,GAAkB,MAAO;AAClC,YAAkB,aAAL,WAAN,KAAK,WAAS;IACvB;;AAGoB,YAAK,eAAL;IAAa;;AAGZ,YAAqB,UAAnB,2CAAW,eAAE,aAAI;IAAE;;;QA3Ed;;UAAgB,AAAK,IAAD,IAAI;;EAAK;;;;;;;;;;;;;;MAKrC,uCAAc;;;MAsBT,iCAAQ;YAAG,yCAAkB","file":"firebase_core.ddc.js"}');
  // Exports:
  return {
    src__default_app_name: default_app_name,
    src__firebase_app: firebase_app,
    firebase_core: firebase_core
  };
});

//# sourceMappingURL=firebase_core.ddc.js.map
