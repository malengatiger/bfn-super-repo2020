define(['dart_sdk', 'packages/firebase_core_platform_interface/firebase_core_platform_interface', 'packages/firebase/firebase', 'packages/firebase/src/app'], function(dart_sdk, packages__firebase_core_platform_interface__firebase_core_platform_interface, packages__firebase__firebase, packages__firebase__src__app) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const js_util = dart_sdk.js_util;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const firebase_core_platform_interface = packages__firebase_core_platform_interface__firebase_core_platform_interface.firebase_core_platform_interface;
  const platform_firebase_app = packages__firebase_core_platform_interface__firebase_core_platform_interface.src__platform_firebase_app;
  const firebase_options = packages__firebase_core_platform_interface__firebase_core_platform_interface.src__firebase_options;
  const top_level = packages__firebase__firebase.src__top_level;
  const app = packages__firebase__src__app.src__app;
  const firebase_core_web = Object.create(dart.library);
  const $map = dartx.map;
  const $toList = dartx.toList;
  let AppToPlatformFirebaseApp = () => (AppToPlatformFirebaseApp = dart.constFn(dart.fnType(platform_firebase_app.PlatformFirebaseApp, [app.App])))();
  let ListOfPlatformFirebaseApp = () => (ListOfPlatformFirebaseApp = dart.constFn(core.List$(platform_firebase_app.PlatformFirebaseApp)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.fn(firebase_core_web._createFromJsApp, AppToPlatformFirebaseApp());
    }
  });
  let C0;
  firebase_core_web.FirebaseCoreWeb = class FirebaseCoreWeb extends firebase_core_platform_interface.FirebaseCorePlatform {
    static registerWith(registrar) {
      firebase_core_platform_interface.FirebaseCorePlatform.instance = new firebase_core_web.FirebaseCoreWeb.new();
    }
    appNamed(name) {
      return async.async(platform_firebase_app.PlatformFirebaseApp, function* appNamed() {
        try {
          let jsApp = top_level.app(name);
          if (jsApp == null) {
            return null;
          }
          return firebase_core_web._createFromJsApp(jsApp);
        } catch (e$) {
          let e = dart.getThrown(e$);
          if (dart.test(firebase_core_web._isFirebaseError(e))) {
            return null;
          }
          dart.rethrow(e$);
        }
      });
    }
    configure(name, options) {
      return async.async(dart.void, function* configure() {
        return top_level.initializeApp({name: name, apiKey: options.apiKey, databaseURL: options.databaseURL, projectId: options.projectID, storageBucket: options.storageBucket, messagingSenderId: options.gcmSenderID, measurementId: options.trackingID, appId: options.googleAppID});
      });
    }
    allApps() {
      return async.async(ListOfPlatformFirebaseApp(), function* allApps() {
        let jsApps = top_level.apps;
        return jsApps[$map](platform_firebase_app.PlatformFirebaseApp, C0 || CT.C0)[$toList]();
      });
    }
  };
  (firebase_core_web.FirebaseCoreWeb.new = function() {
    ;
  }).prototype = firebase_core_web.FirebaseCoreWeb.prototype;
  dart.addTypeTests(firebase_core_web.FirebaseCoreWeb);
  dart.setLibraryUri(firebase_core_web.FirebaseCoreWeb, "package:firebase_core_web/firebase_core_web.dart");
  firebase_core_web._isFirebaseError = function _isFirebaseError(e) {
    return dart.equals(js_util.getProperty(e, "name"), "FirebaseError");
  };
  firebase_core_web._createFromJsApp = function _createFromJsApp(jsApp) {
    return new platform_firebase_app.PlatformFirebaseApp.new(jsApp.name, firebase_core_web._createFromJsOptions(jsApp.options));
  };
  firebase_core_web._createFromJsOptions = function _createFromJsOptions(options) {
    return new firebase_options.FirebaseOptions.new({apiKey: options.apiKey, trackingID: options.measurementId, gcmSenderID: options.messagingSenderId, projectID: options.projectId, googleAppID: options.appId, databaseURL: options.databaseURL, storageBucket: options.storageBucket});
  };
  dart.trackLibraries("packages/firebase_core_web/firebase_core_web", {
    "package:firebase_core_web/firebase_core_web.dart": firebase_core_web
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["firebase_core_web.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;wBAcqC;AACgB,MAA5B,iEAAW;IAClC;aAG4C;AAAR;AAClC;AACe,sBAAQ,cAAO,IAAI;AAChC,cAAI,AAAM,KAAD,IAAI;AACX,kBAAO;;AAET,gBAAO,oCAAiB,KAAK;;cACtB;AACP,wBAAI,mCAAiB,CAAC;AACpB,kBAAO;;AAEF,UAAP;;MAEJ;;cAG8B,MAAsB;AAA9B;AACpB,cAAO,gCACC,IAAI,UACF,AAAQ,OAAD,sBACF,AAAQ,OAAD,yBACT,AAAQ,OAAD,2BACH,AAAQ,OAAD,mCACH,AAAQ,OAAD,6BACX,AAAQ,OAAD,oBACf,AAAQ,OAAD;MAElB;;;AAGyC;AACpB,qBAAY;AAC/B,cAAO,AAAO,AAA2C,OAA5C;MACf;;;;;EACF;;;iEAG8B;AAC5B,UAAsC,aAA/B,oBAAoB,CAAC,EAAE,SAAW;EAC3C;iEAE4C;AAC1C,UAAO,mDAAoB,AAAM,KAAD,OAAO,uCAAqB,AAAM,KAAD;EACnE;yEAEwD;AACtD,UAAO,mDACG,AAAQ,OAAD,qBACH,AAAQ,OAAD,6BACN,AAAQ,OAAD,+BACT,AAAQ,OAAD,yBACL,AAAQ,OAAD,qBACP,AAAQ,OAAD,6BACL,AAAQ,OAAD;EAE1B","file":"firebase_core_web.ddc.js"}');
  // Exports:
  return {
    firebase_core_web: firebase_core_web
  };
});

//# sourceMappingURL=firebase_core_web.ddc.js.map
