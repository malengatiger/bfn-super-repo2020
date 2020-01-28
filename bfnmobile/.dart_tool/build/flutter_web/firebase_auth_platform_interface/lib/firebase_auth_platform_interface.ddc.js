define(['dart_sdk', 'packages/flutter/src/gestures/arena'], function(dart_sdk, packages__flutter__src__gestures__arena) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const message_codec = packages__flutter__src__gestures__arena.src__services__message_codec;
  const platform_channel = packages__flutter__src__gestures__arena.src__services__platform_channel;
  const message_codecs = packages__flutter__src__gestures__arena.src__services__message_codecs;
  const firebase_auth_platform_interface = Object.create(dart.library);
  const $_set = dartx._set;
  const $remove = dartx.remove;
  const $_get = dartx._get;
  const $toString = dartx.toString;
  const $cast = dartx.cast;
  const $map = dartx.map;
  const $toList = dartx.toList;
  let StreamControllerOfPlatformUser = () => (StreamControllerOfPlatformUser = dart.constFn(async.StreamController$(firebase_auth_platform_interface.PlatformUser)))();
  let IdentityMapOfint$StreamControllerOfPlatformUser = () => (IdentityMapOfint$StreamControllerOfPlatformUser = dart.constFn(_js_helper.IdentityMap$(core.int, StreamControllerOfPlatformUser())))();
  let IdentityMapOfint$_PhoneAuthCallbacks = () => (IdentityMapOfint$_PhoneAuthCallbacks = dart.constFn(_js_helper.IdentityMap$(core.int, firebase_auth_platform_interface._PhoneAuthCallbacks)))();
  let IdentityMapOfString$String = () => (IdentityMapOfString$String = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  let FutureOrOfint = () => (FutureOrOfint = dart.constFn(async.FutureOr$(core.int)))();
  let dynamicToFutureOrOfint = () => (dynamicToFutureOrOfint = dart.constFn(dart.fnType(FutureOrOfint(), [dart.dynamic])))();
  let intToNull = () => (intToNull = dart.constFn(dart.fnType(core.Null, [core.int])))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let FutureOfNull = () => (FutureOfNull = dart.constFn(async.Future$(core.Null)))();
  let intToFutureOfNull = () => (intToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [core.int])))();
  let MapToPlatformUserInfo = () => (MapToPlatformUserInfo = dart.constFn(dart.fnType(firebase_auth_platform_interface.PlatformUserInfo, [core.Map])))();
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
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
        [MethodChannel_name]: "plugins.flutter.io/firebase_auth"
      });
    },
    get C3() {
      return C3 = dart.fn(firebase_auth_platform_interface._decodeUserInfo, MapToPlatformUserInfo());
    }
  });
  const _verifyProvidesDefaultImplementations = dart.privateName(firebase_auth_platform_interface, "_verifyProvidesDefaultImplementations");
  firebase_auth_platform_interface.FirebaseAuthPlatform = class FirebaseAuthPlatform extends core.Object {
    get isMock() {
      return false;
    }
    static get instance() {
      return firebase_auth_platform_interface.FirebaseAuthPlatform._instance;
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
      firebase_auth_platform_interface.FirebaseAuthPlatform._instance = instance;
    }
    [_verifyProvidesDefaultImplementations]() {
    }
    getCurrentUser(app) {
      dart.throw(new core.UnimplementedError.new("getCurrentUser() is not implemented"));
    }
    signInAnonymously(app) {
      dart.throw(new core.UnimplementedError.new("signInAnonymously() is not implemented"));
    }
    createUserWithEmailAndPassword(app, email, password) {
      dart.throw(new core.UnimplementedError.new("createUserWithEmailAndPassword() is not implemented"));
    }
    fetchSignInMethodsForEmail(app, email) {
      dart.throw(new core.UnimplementedError.new("fetchSignInMethodsForEmail() is not implemented"));
    }
    sendPasswordResetEmail(app, email) {
      dart.throw(new core.UnimplementedError.new("sendPasswordResetEmail() is not implemented"));
    }
    sendLinkToEmail(app, opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let url = opts && 'url' in opts ? opts.url : null;
      let handleCodeInApp = opts && 'handleCodeInApp' in opts ? opts.handleCodeInApp : null;
      let iOSBundleID = opts && 'iOSBundleID' in opts ? opts.iOSBundleID : null;
      let androidPackageName = opts && 'androidPackageName' in opts ? opts.androidPackageName : null;
      let androidInstallIfNotAvailable = opts && 'androidInstallIfNotAvailable' in opts ? opts.androidInstallIfNotAvailable : null;
      let androidMinimumVersion = opts && 'androidMinimumVersion' in opts ? opts.androidMinimumVersion : null;
      dart.throw(new core.UnimplementedError.new("sendLinkToEmail() is not implemented"));
    }
    isSignInWithEmailLink(app, link) {
      dart.throw(new core.UnimplementedError.new("isSignInWithEmailLink() is not implemented"));
    }
    signInWithEmailAndLink(app, email, link) {
      dart.throw(new core.UnimplementedError.new("signInWithEmailAndLink() is not implemented"));
    }
    sendEmailVerification(app) {
      dart.throw(new core.UnimplementedError.new("sendEmailVerification() is not implemented"));
    }
    reload(app) {
      dart.throw(new core.UnimplementedError.new("reload() is not implemented"));
    }
    delete(app) {
      dart.throw(new core.UnimplementedError.new("delete() is not implemented"));
    }
    signInWithCredential(app, credential) {
      dart.throw(new core.UnimplementedError.new("signInWithCredential() is not implemented"));
    }
    signInWithCustomToken(app, token) {
      dart.throw(new core.UnimplementedError.new("signInWithCustomToken() is not implemented"));
    }
    signOut(app) {
      dart.throw(new core.UnimplementedError.new("signOut() is not implemented"));
    }
    getIdToken(app, refresh) {
      dart.throw(new core.UnimplementedError.new("getIdToken() is not implemented"));
    }
    reauthenticateWithCredential(app, credential) {
      dart.throw(new core.UnimplementedError.new("reauthenticalWithCredential() is not implemented"));
    }
    linkWithCredential(app, credential) {
      dart.throw(new core.UnimplementedError.new("linkWithCredential() is not implemented"));
    }
    unlinkFromProvider(app, provider) {
      dart.throw(new core.UnimplementedError.new("unlinkFromProvider() is not implemented"));
    }
    updateEmail(app, email) {
      dart.throw(new core.UnimplementedError.new("updateEmail() is not implemented"));
    }
    updatePhoneNumberCredential(app, phoneAuthCredential) {
      dart.throw(new core.UnimplementedError.new("updatePhoneNumberCredential() is not implemented"));
    }
    updatePassword(app, password) {
      dart.throw(new core.UnimplementedError.new("updatePassword() is not implemented"));
    }
    updateProfile(app, opts) {
      let displayName = opts && 'displayName' in opts ? opts.displayName : null;
      let photoUrl = opts && 'photoUrl' in opts ? opts.photoUrl : null;
      dart.throw(new core.UnimplementedError.new("updateProfile() is not implemented"));
    }
    setLanguageCode(app, language) {
      dart.throw(new core.UnimplementedError.new("setLanguageCode() is not implemented"));
    }
    onAuthStateChanged(app) {
      dart.throw(new core.UnimplementedError.new("onAuthStateChanged() is not implemented"));
    }
    verifyPhoneNumber(app, opts) {
      let phoneNumber = opts && 'phoneNumber' in opts ? opts.phoneNumber : null;
      let timeout = opts && 'timeout' in opts ? opts.timeout : null;
      let forceResendingToken = opts && 'forceResendingToken' in opts ? opts.forceResendingToken : null;
      let verificationCompleted = opts && 'verificationCompleted' in opts ? opts.verificationCompleted : null;
      let verificationFailed = opts && 'verificationFailed' in opts ? opts.verificationFailed : null;
      let codeSent = opts && 'codeSent' in opts ? opts.codeSent : null;
      let codeAutoRetrievalTimeout = opts && 'codeAutoRetrievalTimeout' in opts ? opts.codeAutoRetrievalTimeout : null;
      dart.throw(new core.UnimplementedError.new("verifyPhoneNumber() is not implemented"));
    }
    confirmPasswordReset(app, oobCode, newPassword) {
      dart.throw(new core.UnimplementedError.new("confirmPasswordReset() is not implemented"));
    }
  };
  (firebase_auth_platform_interface.FirebaseAuthPlatform.new = function() {
    ;
  }).prototype = firebase_auth_platform_interface.FirebaseAuthPlatform.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.FirebaseAuthPlatform);
  dart.setMethodSignature(firebase_auth_platform_interface.FirebaseAuthPlatform, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.FirebaseAuthPlatform.__proto__),
    [_verifyProvidesDefaultImplementations]: dart.fnType(dart.void, []),
    getCurrentUser: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformUser), [core.String]),
    signInAnonymously: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformAuthResult), [core.String]),
    createUserWithEmailAndPassword: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformAuthResult), [core.String, core.String, core.String]),
    fetchSignInMethodsForEmail: dart.fnType(async.Future$(core.List$(core.String)), [core.String, core.String]),
    sendPasswordResetEmail: dart.fnType(async.Future$(dart.void), [core.String, core.String]),
    sendLinkToEmail: dart.fnType(async.Future$(dart.void), [core.String], {androidInstallIfNotAvailable: core.bool, androidMinimumVersion: core.String, androidPackageName: core.String, email: core.String, handleCodeInApp: core.bool, iOSBundleID: core.String, url: core.String}, {}),
    isSignInWithEmailLink: dart.fnType(async.Future$(core.bool), [core.String, core.String]),
    signInWithEmailAndLink: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformAuthResult), [core.String, core.String, core.String]),
    sendEmailVerification: dart.fnType(async.Future$(dart.void), [core.String]),
    reload: dart.fnType(async.Future$(dart.void), [core.String]),
    delete: dart.fnType(async.Future$(dart.void), [core.String]),
    signInWithCredential: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformAuthResult), [core.String, firebase_auth_platform_interface.AuthCredential]),
    signInWithCustomToken: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformAuthResult), [core.String, core.String]),
    signOut: dart.fnType(async.Future$(dart.void), [core.String]),
    getIdToken: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformIdTokenResult), [core.String, core.bool]),
    reauthenticateWithCredential: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformAuthResult), [core.String, firebase_auth_platform_interface.AuthCredential]),
    linkWithCredential: dart.fnType(async.Future$(firebase_auth_platform_interface.PlatformAuthResult), [core.String, firebase_auth_platform_interface.AuthCredential]),
    unlinkFromProvider: dart.fnType(async.Future$(dart.void), [core.String, core.String]),
    updateEmail: dart.fnType(async.Future$(dart.void), [core.String, core.String]),
    updatePhoneNumberCredential: dart.fnType(async.Future$(dart.void), [core.String, firebase_auth_platform_interface.PhoneAuthCredential]),
    updatePassword: dart.fnType(async.Future$(dart.void), [core.String, core.String]),
    updateProfile: dart.fnType(async.Future$(dart.void), [core.String], {displayName: core.String, photoUrl: core.String}, {}),
    setLanguageCode: dart.fnType(async.Future$(dart.void), [core.String, core.String]),
    onAuthStateChanged: dart.fnType(async.Stream$(firebase_auth_platform_interface.PlatformUser), [core.String]),
    verifyPhoneNumber: dart.fnType(async.Future$(dart.void), [core.String], {codeAutoRetrievalTimeout: dart.fnType(dart.void, [core.String]), codeSent: dart.fnType(dart.void, [core.String], [core.int]), forceResendingToken: core.int, phoneNumber: core.String, timeout: core.Duration, verificationCompleted: dart.fnType(dart.void, [firebase_auth_platform_interface.AuthCredential]), verificationFailed: dart.fnType(dart.void, [firebase_auth_platform_interface.AuthException])}, {}),
    confirmPasswordReset: dart.fnType(async.Future$(dart.void), [core.String, core.String, core.String])
  }));
  dart.setGetterSignature(firebase_auth_platform_interface.FirebaseAuthPlatform, () => ({
    __proto__: dart.getGetters(firebase_auth_platform_interface.FirebaseAuthPlatform.__proto__),
    isMock: core.bool
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.FirebaseAuthPlatform, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.defineLazy(firebase_auth_platform_interface.FirebaseAuthPlatform, {
    /*firebase_auth_platform_interface.FirebaseAuthPlatform._instance*/get _instance() {
      return new firebase_auth_platform_interface.MethodChannelFirebaseAuth.new();
    },
    set _instance(_) {}
  });
  const _authStateChangedControllers = dart.privateName(firebase_auth_platform_interface, "_authStateChangedControllers");
  const _phoneAuthCallbacks = dart.privateName(firebase_auth_platform_interface, "_phoneAuthCallbacks");
  const _callHandler = dart.privateName(firebase_auth_platform_interface, "_callHandler");
  const _asMap = dart.privateName(firebase_auth_platform_interface, "_asMap");
  const _onAuthStateChangedHandler = dart.privateName(firebase_auth_platform_interface, "_onAuthStateChangedHandler");
  const MethodChannel__binaryMessenger = dart.privateName(platform_channel, "MethodChannel._binaryMessenger");
  let C2;
  const StandardMethodCodec_messageCodec = dart.privateName(message_codecs, "StandardMethodCodec.messageCodec");
  let C1;
  const MethodChannel_codec = dart.privateName(platform_channel, "MethodChannel.codec");
  const MethodChannel_name = dart.privateName(platform_channel, "MethodChannel.name");
  let C0;
  firebase_auth_platform_interface.MethodChannelFirebaseAuth = class MethodChannelFirebaseAuth extends firebase_auth_platform_interface.FirebaseAuthPlatform {
    getCurrentUser(app) {
      return async.async(firebase_auth_platform_interface.PlatformUser, function* getCurrentUser() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "currentUser", new (IdentityMapOfString$String()).from(["app", app])));
        let currentUser = data == null ? null : firebase_auth_platform_interface._decodeUser(data);
        return currentUser;
      });
    }
    signInAnonymously(app) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, function* signInAnonymously() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "signInAnonymously", new (IdentityMapOfString$String()).from(["app", app])));
        return firebase_auth_platform_interface._decodeAuthResult(data);
      });
    }
    createUserWithEmailAndPassword(app, email, password) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, function* createUserWithEmailAndPassword() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "createUserWithEmailAndPassword", new (IdentityMapOfString$String()).from(["email", email, "password", password, "app", app])));
        return firebase_auth_platform_interface._decodeAuthResult(data);
      });
    }
    fetchSignInMethodsForEmail(app, email) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeListMethod(core.String, "fetchSignInMethodsForEmail", new (IdentityMapOfString$String()).from(["email", email, "app", app]));
    }
    sendPasswordResetEmail(app, email) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "sendPasswordResetEmail", new (IdentityMapOfString$String()).from(["email", email, "app", app]));
    }
    sendLinkToEmail(app, opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let url = opts && 'url' in opts ? opts.url : null;
      let handleCodeInApp = opts && 'handleCodeInApp' in opts ? opts.handleCodeInApp : null;
      let iOSBundleID = opts && 'iOSBundleID' in opts ? opts.iOSBundleID : null;
      let androidPackageName = opts && 'androidPackageName' in opts ? opts.androidPackageName : null;
      let androidInstallIfNotAvailable = opts && 'androidInstallIfNotAvailable' in opts ? opts.androidInstallIfNotAvailable : null;
      let androidMinimumVersion = opts && 'androidMinimumVersion' in opts ? opts.androidMinimumVersion : null;
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "sendLinkToEmail", new (IdentityMapOfString$dynamic()).from(["email", email, "url", url, "handleCodeInApp", handleCodeInApp, "iOSBundleID", iOSBundleID, "androidPackageName", androidPackageName, "androidInstallIfNotAvailable", androidInstallIfNotAvailable, "androidMinimumVersion", androidMinimumVersion, "app", app]));
    }
    isSignInWithEmailLink(app, link) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(core.bool, "isSignInWithEmailLink", new (IdentityMapOfString$String()).from(["link", link, "app", app]));
    }
    signInWithEmailAndLink(app, email, link) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, function* signInWithEmailAndLink() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "signInWithEmailAndLink", new (IdentityMapOfString$dynamic()).from(["app", app, "email", email, "link", link])));
        return firebase_auth_platform_interface._decodeAuthResult(data);
      });
    }
    sendEmailVerification(app) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "sendEmailVerification", new (IdentityMapOfString$String()).from(["app", app]));
    }
    reload(app) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "reload", new (IdentityMapOfString$String()).from(["app", app]));
    }
    delete(app) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "delete", new (IdentityMapOfString$String()).from(["app", app]));
    }
    signInWithCredential(app, credential) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, function* signInWithCredential() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "signInWithCredential", new (IdentityMapOfString$dynamic()).from(["app", app, "provider", credential.providerId, "data", credential[_asMap]()])));
        return firebase_auth_platform_interface._decodeAuthResult(data);
      });
    }
    signInWithCustomToken(app, token) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, function* signInWithCustomToken() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "signInWithCustomToken", new (IdentityMapOfString$String()).from(["token", token, "app", app])));
        return firebase_auth_platform_interface._decodeAuthResult(data);
      });
    }
    signOut(app) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "signOut", new (IdentityMapOfString$String()).from(["app", app]));
    }
    getIdToken(app, refresh) {
      return async.async(firebase_auth_platform_interface.PlatformIdTokenResult, function* getIdToken() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "getIdToken", new (IdentityMapOfString$dynamic()).from(["refresh", refresh, "app", app])));
        return firebase_auth_platform_interface._decodeIdTokenResult(data);
      });
    }
    reauthenticateWithCredential(app, credential) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, function* reauthenticateWithCredential() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "reauthenticateWithCredential", new (IdentityMapOfString$dynamic()).from(["app", app, "provider", credential.providerId, "data", credential[_asMap]()])));
        return firebase_auth_platform_interface._decodeAuthResult(data);
      });
    }
    linkWithCredential(app, credential) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, function* linkWithCredential() {
        let data = (yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMapMethod(core.String, dart.dynamic, "linkWithCredential", new (IdentityMapOfString$dynamic()).from(["app", app, "provider", credential.providerId, "data", credential[_asMap]()])));
        let result = firebase_auth_platform_interface._decodeAuthResult(data);
        return result;
      });
    }
    unlinkFromProvider(app, provider) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "unlinkFromProvider", new (IdentityMapOfString$String()).from(["provider", provider, "app", app]));
    }
    updateEmail(app, email) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "updateEmail", new (IdentityMapOfString$String()).from(["email", email, "app", app]));
    }
    updatePhoneNumberCredential(app, phoneAuthCredential) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "updatePhoneNumberCredential", new (IdentityMapOfString$dynamic()).from(["app", app, "provider", phoneAuthCredential.providerId, "data", phoneAuthCredential[_asMap]()]));
    }
    updatePassword(app, password) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "updatePassword", new (IdentityMapOfString$String()).from(["password", password, "app", app]));
    }
    updateProfile(app, opts) {
      let displayName = opts && 'displayName' in opts ? opts.displayName : null;
      let photoUrl = opts && 'photoUrl' in opts ? opts.photoUrl : null;
      let $arguments = new (IdentityMapOfString$String()).from(["app", app]);
      if (displayName != null) {
        $arguments[$_set]("displayName", displayName);
      }
      if (photoUrl != null) {
        $arguments[$_set]("photoUrl", photoUrl);
      }
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "updateProfile", $arguments);
    }
    setLanguageCode(app, language) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "setLanguageCode", new (IdentityMapOfString$String()).from(["language", language, "app", app]));
    }
    onAuthStateChanged(app) {
      let _handle = null;
      let controller = null;
      controller = StreamControllerOfPlatformUser().broadcast({onListen: dart.fn(() => {
          _handle = firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(core.int, "startListeningAuthState", new (IdentityMapOfString$String()).from(["app", app])).then(core.int, dart.fn(v => FutureOrOfint()._check(v), dynamicToFutureOrOfint()));
          _handle.then(core.Null, dart.fn(handle => {
            this[_authStateChangedControllers][$_set](handle, controller);
          }, intToNull()));
        }, VoidToNull()), onCancel: dart.fn(() => {
          _handle.then(core.Null, dart.fn(handle => async.async(core.Null, (function*() {
            yield firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "stopListeningAuthState", new (IdentityMapOfString$dynamic()).from(["id", handle, "app", app]));
            this[_authStateChangedControllers][$remove](handle);
          }).bind(this)), intToFutureOfNull()));
        }, VoidToNull())});
      return controller.stream;
    }
    verifyPhoneNumber(app, opts) {
      let phoneNumber = opts && 'phoneNumber' in opts ? opts.phoneNumber : null;
      let timeout = opts && 'timeout' in opts ? opts.timeout : null;
      let forceResendingToken = opts && 'forceResendingToken' in opts ? opts.forceResendingToken : null;
      let verificationCompleted = opts && 'verificationCompleted' in opts ? opts.verificationCompleted : null;
      let verificationFailed = opts && 'verificationFailed' in opts ? opts.verificationFailed : null;
      let codeSent = opts && 'codeSent' in opts ? opts.codeSent : null;
      let codeAutoRetrievalTimeout = opts && 'codeAutoRetrievalTimeout' in opts ? opts.codeAutoRetrievalTimeout : null;
      let callbacks = new firebase_auth_platform_interface._PhoneAuthCallbacks.new(verificationCompleted, verificationFailed, codeSent, codeAutoRetrievalTimeout);
      firebase_auth_platform_interface.MethodChannelFirebaseAuth._nextPhoneAuthHandle = dart.notNull(firebase_auth_platform_interface.MethodChannelFirebaseAuth._nextPhoneAuthHandle) + 1;
      this[_phoneAuthCallbacks][$_set](firebase_auth_platform_interface.MethodChannelFirebaseAuth._nextPhoneAuthHandle, callbacks);
      let params = new (IdentityMapOfString$dynamic()).from(["handle", firebase_auth_platform_interface.MethodChannelFirebaseAuth._nextPhoneAuthHandle, "phoneNumber", phoneNumber, "timeout", timeout.inMilliseconds, "forceResendingToken", forceResendingToken, "app", app]);
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "verifyPhoneNumber", params);
    }
    confirmPasswordReset(app, oobCode, newPassword) {
      return firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.invokeMethod(dart.void, "confirmPasswordReset", new (IdentityMapOfString$String()).from(["app", app, "oobCode", oobCode, "newPassword", newPassword]));
    }
    [_callHandler](call) {
      return async.async(dart.void, (function* _callHandler() {
        switch (call.method) {
          case "onAuthStateChanged":
          {
            this[_onAuthStateChangedHandler](call);
            break;
          }
          case "phoneVerificationCompleted":
          {
            let handle = core.int._check(dart.dsend(call.arguments, '_get', ["handle"]));
            let verificationCompleted = this[_phoneAuthCallbacks][$_get](handle).verificationCompleted;
            verificationCompleted(new firebase_auth_platform_interface.PhoneAuthCredential._fromDetectedOnAndroid({jsonObject: dart.toString(dart.dsend(call.arguments, '_get', ["phoneAuthCredential"]))}));
            this[_phoneAuthCallbacks][$remove](handle);
            break;
          }
          case "phoneVerificationFailed":
          {
            let handle = core.int._check(dart.dsend(call.arguments, '_get', ["handle"]));
            let verificationFailed = this[_phoneAuthCallbacks][$_get](handle).verificationFailed;
            let exception = core.Map._check(dart.dsend(call.arguments, '_get', ["exception"]));
            verificationFailed(new firebase_auth_platform_interface.AuthException.new(core.String._check(exception[$_get]("code")), core.String._check(exception[$_get]("message"))));
            this[_phoneAuthCallbacks][$remove](handle);
            break;
          }
          case "phoneCodeSent":
          {
            let handle = core.int._check(dart.dsend(call.arguments, '_get', ["handle"]));
            let verificationId = core.String._check(dart.dsend(call.arguments, '_get', ["verificationId"]));
            let forceResendingToken = core.int._check(dart.dsend(call.arguments, '_get', ["forceResendingToken"]));
            let codeSent = this[_phoneAuthCallbacks][$_get](handle).codeSent;
            if (forceResendingToken == null) {
              codeSent(verificationId);
            } else {
              codeSent(verificationId, forceResendingToken);
            }
            break;
          }
          case "phoneCodeAutoRetrievalTimeout":
          {
            let handle = core.int._check(dart.dsend(call.arguments, '_get', ["handle"]));
            let codeAutoRetrievalTimeout = this[_phoneAuthCallbacks][$_get](handle).codeAutoRetrievalTimeout;
            let verificationId = core.String._check(dart.dsend(call.arguments, '_get', ["verificationId"]));
            codeAutoRetrievalTimeout(verificationId);
            break;
          }
        }
      }).bind(this));
    }
    [_onAuthStateChangedHandler](call) {
      let data = core.Map._check(dart.dsend(call.arguments, '_get', ["user"]));
      let id = core.int._check(dart.dsend(call.arguments, '_get', ["id"]));
      let currentUser = data != null ? firebase_auth_platform_interface._decodeUser(data) : null;
      this[_authStateChangedControllers][$_get](id).add(currentUser);
    }
  };
  (firebase_auth_platform_interface.MethodChannelFirebaseAuth.new = function() {
    this[_authStateChangedControllers] = new (IdentityMapOfint$StreamControllerOfPlatformUser()).new();
    this[_phoneAuthCallbacks] = new (IdentityMapOfint$_PhoneAuthCallbacks()).new();
    firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel.setMethodCallHandler(dart.bind(this, _callHandler));
  }).prototype = firebase_auth_platform_interface.MethodChannelFirebaseAuth.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.MethodChannelFirebaseAuth);
  dart.setMethodSignature(firebase_auth_platform_interface.MethodChannelFirebaseAuth, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.MethodChannelFirebaseAuth.__proto__),
    [_callHandler]: dart.fnType(async.Future$(dart.void), [message_codec.MethodCall]),
    [_onAuthStateChangedHandler]: dart.fnType(dart.void, [message_codec.MethodCall])
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.MethodChannelFirebaseAuth, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.MethodChannelFirebaseAuth, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.MethodChannelFirebaseAuth.__proto__),
    [_authStateChangedControllers]: dart.finalFieldType(core.Map$(core.int, async.StreamController$(firebase_auth_platform_interface.PlatformUser))),
    [_phoneAuthCallbacks]: dart.finalFieldType(core.Map$(core.int, firebase_auth_platform_interface._PhoneAuthCallbacks))
  }));
  dart.defineLazy(firebase_auth_platform_interface.MethodChannelFirebaseAuth, {
    /*firebase_auth_platform_interface.MethodChannelFirebaseAuth.channel*/get channel() {
      return C0 || CT.C0;
    },
    /*firebase_auth_platform_interface.MethodChannelFirebaseAuth._nextPhoneAuthHandle*/get _nextPhoneAuthHandle() {
      return 0;
    },
    set _nextPhoneAuthHandle(_) {}
  });
  const verificationCompleted$ = dart.privateName(firebase_auth_platform_interface, "_PhoneAuthCallbacks.verificationCompleted");
  const verificationFailed$ = dart.privateName(firebase_auth_platform_interface, "_PhoneAuthCallbacks.verificationFailed");
  const codeSent$ = dart.privateName(firebase_auth_platform_interface, "_PhoneAuthCallbacks.codeSent");
  const codeAutoRetrievalTimeout$ = dart.privateName(firebase_auth_platform_interface, "_PhoneAuthCallbacks.codeAutoRetrievalTimeout");
  firebase_auth_platform_interface._PhoneAuthCallbacks = class _PhoneAuthCallbacks extends core.Object {
    get verificationCompleted() {
      return this[verificationCompleted$];
    }
    set verificationCompleted(value) {
      super.verificationCompleted = value;
    }
    get verificationFailed() {
      return this[verificationFailed$];
    }
    set verificationFailed(value) {
      super.verificationFailed = value;
    }
    get codeSent() {
      return this[codeSent$];
    }
    set codeSent(value) {
      super.codeSent = value;
    }
    get codeAutoRetrievalTimeout() {
      return this[codeAutoRetrievalTimeout$];
    }
    set codeAutoRetrievalTimeout(value) {
      super.codeAutoRetrievalTimeout = value;
    }
  };
  (firebase_auth_platform_interface._PhoneAuthCallbacks.new = function(verificationCompleted, verificationFailed, codeSent, codeAutoRetrievalTimeout) {
    this[verificationCompleted$] = verificationCompleted;
    this[verificationFailed$] = verificationFailed;
    this[codeSent$] = codeSent;
    this[codeAutoRetrievalTimeout$] = codeAutoRetrievalTimeout;
    ;
  }).prototype = firebase_auth_platform_interface._PhoneAuthCallbacks.prototype;
  dart.addTypeTests(firebase_auth_platform_interface._PhoneAuthCallbacks);
  dart.setLibraryUri(firebase_auth_platform_interface._PhoneAuthCallbacks, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface._PhoneAuthCallbacks, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface._PhoneAuthCallbacks.__proto__),
    verificationCompleted: dart.finalFieldType(dart.fnType(dart.void, [firebase_auth_platform_interface.AuthCredential])),
    verificationFailed: dart.finalFieldType(dart.fnType(dart.void, [firebase_auth_platform_interface.AuthException])),
    codeSent: dart.finalFieldType(dart.fnType(dart.void, [core.String], [core.int])),
    codeAutoRetrievalTimeout: dart.finalFieldType(dart.fnType(dart.void, [core.String]))
  }));
  const providerId$ = dart.privateName(firebase_auth_platform_interface, "PlatformUserInfo.providerId");
  const uid$ = dart.privateName(firebase_auth_platform_interface, "PlatformUserInfo.uid");
  const displayName$ = dart.privateName(firebase_auth_platform_interface, "PlatformUserInfo.displayName");
  const photoUrl$ = dart.privateName(firebase_auth_platform_interface, "PlatformUserInfo.photoUrl");
  const email$ = dart.privateName(firebase_auth_platform_interface, "PlatformUserInfo.email");
  const phoneNumber$ = dart.privateName(firebase_auth_platform_interface, "PlatformUserInfo.phoneNumber");
  firebase_auth_platform_interface.PlatformUserInfo = class PlatformUserInfo extends core.Object {
    get providerId() {
      return this[providerId$];
    }
    set providerId(value) {
      super.providerId = value;
    }
    get uid() {
      return this[uid$];
    }
    set uid(value) {
      super.uid = value;
    }
    get displayName() {
      return this[displayName$];
    }
    set displayName(value) {
      super.displayName = value;
    }
    get photoUrl() {
      return this[photoUrl$];
    }
    set photoUrl(value) {
      super.photoUrl = value;
    }
    get email() {
      return this[email$];
    }
    set email(value) {
      super.email = value;
    }
    get phoneNumber() {
      return this[phoneNumber$];
    }
    set phoneNumber(value) {
      super.phoneNumber = value;
    }
  };
  (firebase_auth_platform_interface.PlatformUserInfo.new = function(opts) {
    let providerId = opts && 'providerId' in opts ? opts.providerId : null;
    let uid = opts && 'uid' in opts ? opts.uid : null;
    let displayName = opts && 'displayName' in opts ? opts.displayName : null;
    let photoUrl = opts && 'photoUrl' in opts ? opts.photoUrl : null;
    let email = opts && 'email' in opts ? opts.email : null;
    let phoneNumber = opts && 'phoneNumber' in opts ? opts.phoneNumber : null;
    this[providerId$] = providerId;
    this[uid$] = uid;
    this[displayName$] = displayName;
    this[photoUrl$] = photoUrl;
    this[email$] = email;
    this[phoneNumber$] = phoneNumber;
    ;
  }).prototype = firebase_auth_platform_interface.PlatformUserInfo.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.PlatformUserInfo);
  dart.setLibraryUri(firebase_auth_platform_interface.PlatformUserInfo, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.PlatformUserInfo, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.PlatformUserInfo.__proto__),
    providerId: dart.finalFieldType(core.String),
    uid: dart.finalFieldType(core.String),
    displayName: dart.finalFieldType(core.String),
    photoUrl: dart.finalFieldType(core.String),
    email: dart.finalFieldType(core.String),
    phoneNumber: dart.finalFieldType(core.String)
  }));
  const creationTimestamp$ = dart.privateName(firebase_auth_platform_interface, "PlatformUser.creationTimestamp");
  const lastSignInTimestamp$ = dart.privateName(firebase_auth_platform_interface, "PlatformUser.lastSignInTimestamp");
  const isAnonymous$ = dart.privateName(firebase_auth_platform_interface, "PlatformUser.isAnonymous");
  const isEmailVerified$ = dart.privateName(firebase_auth_platform_interface, "PlatformUser.isEmailVerified");
  const providerData$ = dart.privateName(firebase_auth_platform_interface, "PlatformUser.providerData");
  firebase_auth_platform_interface.PlatformUser = class PlatformUser extends firebase_auth_platform_interface.PlatformUserInfo {
    get creationTimestamp() {
      return this[creationTimestamp$];
    }
    set creationTimestamp(value) {
      super.creationTimestamp = value;
    }
    get lastSignInTimestamp() {
      return this[lastSignInTimestamp$];
    }
    set lastSignInTimestamp(value) {
      super.lastSignInTimestamp = value;
    }
    get isAnonymous() {
      return this[isAnonymous$];
    }
    set isAnonymous(value) {
      super.isAnonymous = value;
    }
    get isEmailVerified() {
      return this[isEmailVerified$];
    }
    set isEmailVerified(value) {
      super.isEmailVerified = value;
    }
    get providerData() {
      return this[providerData$];
    }
    set providerData(value) {
      super.providerData = value;
    }
  };
  (firebase_auth_platform_interface.PlatformUser.new = function(opts) {
    let providerId = opts && 'providerId' in opts ? opts.providerId : null;
    let uid = opts && 'uid' in opts ? opts.uid : null;
    let displayName = opts && 'displayName' in opts ? opts.displayName : null;
    let photoUrl = opts && 'photoUrl' in opts ? opts.photoUrl : null;
    let email = opts && 'email' in opts ? opts.email : null;
    let phoneNumber = opts && 'phoneNumber' in opts ? opts.phoneNumber : null;
    let creationTimestamp = opts && 'creationTimestamp' in opts ? opts.creationTimestamp : null;
    let lastSignInTimestamp = opts && 'lastSignInTimestamp' in opts ? opts.lastSignInTimestamp : null;
    let isAnonymous = opts && 'isAnonymous' in opts ? opts.isAnonymous : null;
    let isEmailVerified = opts && 'isEmailVerified' in opts ? opts.isEmailVerified : null;
    let providerData = opts && 'providerData' in opts ? opts.providerData : null;
    this[creationTimestamp$] = creationTimestamp;
    this[lastSignInTimestamp$] = lastSignInTimestamp;
    this[isAnonymous$] = isAnonymous;
    this[isEmailVerified$] = isEmailVerified;
    this[providerData$] = providerData;
    firebase_auth_platform_interface.PlatformUser.__proto__.new.call(this, {providerId: providerId, uid: uid, displayName: displayName, photoUrl: photoUrl, email: email, phoneNumber: phoneNumber});
    ;
  }).prototype = firebase_auth_platform_interface.PlatformUser.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.PlatformUser);
  dart.setLibraryUri(firebase_auth_platform_interface.PlatformUser, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.PlatformUser, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.PlatformUser.__proto__),
    creationTimestamp: dart.finalFieldType(core.int),
    lastSignInTimestamp: dart.finalFieldType(core.int),
    isAnonymous: dart.finalFieldType(core.bool),
    isEmailVerified: dart.finalFieldType(core.bool),
    providerData: dart.finalFieldType(core.List$(firebase_auth_platform_interface.PlatformUserInfo))
  }));
  const isNewUser$ = dart.privateName(firebase_auth_platform_interface, "PlatformAdditionalUserInfo.isNewUser");
  const providerId$0 = dart.privateName(firebase_auth_platform_interface, "PlatformAdditionalUserInfo.providerId");
  const username$ = dart.privateName(firebase_auth_platform_interface, "PlatformAdditionalUserInfo.username");
  const profile$ = dart.privateName(firebase_auth_platform_interface, "PlatformAdditionalUserInfo.profile");
  firebase_auth_platform_interface.PlatformAdditionalUserInfo = class PlatformAdditionalUserInfo extends core.Object {
    get isNewUser() {
      return this[isNewUser$];
    }
    set isNewUser(value) {
      super.isNewUser = value;
    }
    get providerId() {
      return this[providerId$0];
    }
    set providerId(value) {
      super.providerId = value;
    }
    get username() {
      return this[username$];
    }
    set username(value) {
      super.username = value;
    }
    get profile() {
      return this[profile$];
    }
    set profile(value) {
      super.profile = value;
    }
  };
  (firebase_auth_platform_interface.PlatformAdditionalUserInfo.new = function(opts) {
    let isNewUser = opts && 'isNewUser' in opts ? opts.isNewUser : null;
    let providerId = opts && 'providerId' in opts ? opts.providerId : null;
    let username = opts && 'username' in opts ? opts.username : null;
    let profile = opts && 'profile' in opts ? opts.profile : null;
    this[isNewUser$] = isNewUser;
    this[providerId$0] = providerId;
    this[username$] = username;
    this[profile$] = profile;
    ;
  }).prototype = firebase_auth_platform_interface.PlatformAdditionalUserInfo.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.PlatformAdditionalUserInfo);
  dart.setLibraryUri(firebase_auth_platform_interface.PlatformAdditionalUserInfo, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.PlatformAdditionalUserInfo, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.PlatformAdditionalUserInfo.__proto__),
    isNewUser: dart.finalFieldType(core.bool),
    providerId: dart.finalFieldType(core.String),
    username: dart.finalFieldType(core.String),
    profile: dart.finalFieldType(core.Map$(core.String, dart.dynamic))
  }));
  const user$ = dart.privateName(firebase_auth_platform_interface, "PlatformAuthResult.user");
  const additionalUserInfo$ = dart.privateName(firebase_auth_platform_interface, "PlatformAuthResult.additionalUserInfo");
  firebase_auth_platform_interface.PlatformAuthResult = class PlatformAuthResult extends core.Object {
    get user() {
      return this[user$];
    }
    set user(value) {
      super.user = value;
    }
    get additionalUserInfo() {
      return this[additionalUserInfo$];
    }
    set additionalUserInfo(value) {
      super.additionalUserInfo = value;
    }
  };
  (firebase_auth_platform_interface.PlatformAuthResult.new = function(opts) {
    let user = opts && 'user' in opts ? opts.user : null;
    let additionalUserInfo = opts && 'additionalUserInfo' in opts ? opts.additionalUserInfo : null;
    this[user$] = user;
    this[additionalUserInfo$] = additionalUserInfo;
    ;
  }).prototype = firebase_auth_platform_interface.PlatformAuthResult.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.PlatformAuthResult);
  dart.setLibraryUri(firebase_auth_platform_interface.PlatformAuthResult, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.PlatformAuthResult, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.PlatformAuthResult.__proto__),
    user: dart.finalFieldType(firebase_auth_platform_interface.PlatformUser),
    additionalUserInfo: dart.finalFieldType(firebase_auth_platform_interface.PlatformAdditionalUserInfo)
  }));
  const providerId$1 = dart.privateName(firebase_auth_platform_interface, "AuthCredential.providerId");
  firebase_auth_platform_interface.AuthCredential = class AuthCredential extends core.Object {
    get providerId() {
      return this[providerId$1];
    }
    set providerId(value) {
      super.providerId = value;
    }
    toString() {
      return dart.toString(this[_asMap]());
    }
  };
  (firebase_auth_platform_interface.AuthCredential.new = function(providerId) {
    this[providerId$1] = providerId;
    ;
  }).prototype = firebase_auth_platform_interface.AuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.AuthCredential);
  dart.setLibraryUri(firebase_auth_platform_interface.AuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.AuthCredential, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.AuthCredential.__proto__),
    providerId: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(firebase_auth_platform_interface.AuthCredential, ['toString']);
  const email$0 = dart.privateName(firebase_auth_platform_interface, "EmailAuthCredential.email");
  const password$ = dart.privateName(firebase_auth_platform_interface, "EmailAuthCredential.password");
  const link$ = dart.privateName(firebase_auth_platform_interface, "EmailAuthCredential.link");
  firebase_auth_platform_interface.EmailAuthCredential = class EmailAuthCredential extends firebase_auth_platform_interface.AuthCredential {
    get email() {
      return this[email$0];
    }
    set email(value) {
      super.email = value;
    }
    get password() {
      return this[password$];
    }
    set password(value) {
      super.password = value;
    }
    get link() {
      return this[link$];
    }
    set link(value) {
      super.link = value;
    }
    [_asMap]() {
      let result = new (IdentityMapOfString$String()).from(["email", this.email]);
      if (this.password != null) {
        result[$_set]("password", this.password);
      }
      if (this.link != null) {
        result[$_set]("link", this.link);
      }
      return result;
    }
  };
  (firebase_auth_platform_interface.EmailAuthCredential.new = function(opts) {
    let email = opts && 'email' in opts ? opts.email : null;
    let password = opts && 'password' in opts ? opts.password : null;
    let link = opts && 'link' in opts ? opts.link : null;
    this[email$0] = email;
    this[password$] = password;
    this[link$] = link;
    if (!(password != null || link != null)) dart.assertFailed("One of \"password\" or \"link\" must be provided", "org-dartlang-app:///packages/firebase_auth_platform_interface/src/types.dart", 112, 16, "password != null || link != null");
    firebase_auth_platform_interface.EmailAuthCredential.__proto__.new.call(this, "password");
    ;
  }).prototype = firebase_auth_platform_interface.EmailAuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.EmailAuthCredential);
  dart.setMethodSignature(firebase_auth_platform_interface.EmailAuthCredential, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.EmailAuthCredential.__proto__),
    [_asMap]: dart.fnType(core.Map$(core.String, core.String), [])
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.EmailAuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.EmailAuthCredential, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.EmailAuthCredential.__proto__),
    email: dart.finalFieldType(core.String),
    password: dart.finalFieldType(core.String),
    link: dart.finalFieldType(core.String)
  }));
  dart.defineLazy(firebase_auth_platform_interface.EmailAuthCredential, {
    /*firebase_auth_platform_interface.EmailAuthCredential._providerId*/get _providerId() {
      return "password";
    }
  });
  const idToken$ = dart.privateName(firebase_auth_platform_interface, "GoogleAuthCredential.idToken");
  const accessToken$ = dart.privateName(firebase_auth_platform_interface, "GoogleAuthCredential.accessToken");
  firebase_auth_platform_interface.GoogleAuthCredential = class GoogleAuthCredential extends firebase_auth_platform_interface.AuthCredential {
    get idToken() {
      return this[idToken$];
    }
    set idToken(value) {
      super.idToken = value;
    }
    get accessToken() {
      return this[accessToken$];
    }
    set accessToken(value) {
      super.accessToken = value;
    }
    [_asMap]() {
      return new (IdentityMapOfString$String()).from(["idToken", this.idToken, "accessToken", this.accessToken]);
    }
  };
  (firebase_auth_platform_interface.GoogleAuthCredential.new = function(opts) {
    let idToken = opts && 'idToken' in opts ? opts.idToken : null;
    let accessToken = opts && 'accessToken' in opts ? opts.accessToken : null;
    this[idToken$] = idToken;
    this[accessToken$] = accessToken;
    firebase_auth_platform_interface.GoogleAuthCredential.__proto__.new.call(this, "google.com");
    ;
  }).prototype = firebase_auth_platform_interface.GoogleAuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.GoogleAuthCredential);
  dart.setMethodSignature(firebase_auth_platform_interface.GoogleAuthCredential, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.GoogleAuthCredential.__proto__),
    [_asMap]: dart.fnType(core.Map$(core.String, core.String), [])
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.GoogleAuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.GoogleAuthCredential, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.GoogleAuthCredential.__proto__),
    idToken: dart.finalFieldType(core.String),
    accessToken: dart.finalFieldType(core.String)
  }));
  dart.defineLazy(firebase_auth_platform_interface.GoogleAuthCredential, {
    /*firebase_auth_platform_interface.GoogleAuthCredential._providerId*/get _providerId() {
      return "google.com";
    }
  });
  const idToken$0 = dart.privateName(firebase_auth_platform_interface, "OAuthCredential.idToken");
  const accessToken$0 = dart.privateName(firebase_auth_platform_interface, "OAuthCredential.accessToken");
  const rawNonce$ = dart.privateName(firebase_auth_platform_interface, "OAuthCredential.rawNonce");
  const providerId$2 = dart.privateName(firebase_auth_platform_interface, "OAuthCredential.providerId");
  firebase_auth_platform_interface.OAuthCredential = class OAuthCredential extends firebase_auth_platform_interface.AuthCredential {
    get idToken() {
      return this[idToken$0];
    }
    set idToken(value) {
      super.idToken = value;
    }
    get accessToken() {
      return this[accessToken$0];
    }
    set accessToken(value) {
      super.accessToken = value;
    }
    get rawNonce() {
      return this[rawNonce$];
    }
    set rawNonce(value) {
      super.rawNonce = value;
    }
    get providerId() {
      return this[providerId$2];
    }
    set providerId(value) {
      super.providerId = value;
    }
    [_asMap]() {
      return new (IdentityMapOfString$String()).from(["idToken", this.idToken, "accessToken", this.accessToken, "providerId", this.providerId, "rawNonce", this.rawNonce]);
    }
  };
  (firebase_auth_platform_interface.OAuthCredential.new = function(providerId, idToken, accessToken, rawNonce) {
    this[providerId$2] = providerId;
    this[idToken$0] = idToken;
    this[accessToken$0] = accessToken;
    this[rawNonce$] = rawNonce;
    firebase_auth_platform_interface.OAuthCredential.__proto__.new.call(this, providerId);
    ;
  }).prototype = firebase_auth_platform_interface.OAuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.OAuthCredential);
  dart.setMethodSignature(firebase_auth_platform_interface.OAuthCredential, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.OAuthCredential.__proto__),
    [_asMap]: dart.fnType(core.Map$(core.String, core.String), [])
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.OAuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.OAuthCredential, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.OAuthCredential.__proto__),
    idToken: dart.finalFieldType(core.String),
    accessToken: dart.finalFieldType(core.String),
    rawNonce: dart.finalFieldType(core.String),
    providerId: dart.finalFieldType(core.String)
  }));
  firebase_auth_platform_interface.PlatformOAuthCredential = class PlatformOAuthCredential extends firebase_auth_platform_interface.OAuthCredential {};
  (firebase_auth_platform_interface.PlatformOAuthCredential.new = function(opts) {
    let providerId = opts && 'providerId' in opts ? opts.providerId : null;
    let idToken = opts && 'idToken' in opts ? opts.idToken : null;
    let accessToken = opts && 'accessToken' in opts ? opts.accessToken : null;
    let rawNonce = opts && 'rawNonce' in opts ? opts.rawNonce : null;
    firebase_auth_platform_interface.PlatformOAuthCredential.__proto__.new.call(this, providerId, idToken, accessToken, rawNonce);
    ;
  }).prototype = firebase_auth_platform_interface.PlatformOAuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.PlatformOAuthCredential);
  dart.setLibraryUri(firebase_auth_platform_interface.PlatformOAuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  const accessToken$1 = dart.privateName(firebase_auth_platform_interface, "FacebookAuthCredential.accessToken");
  firebase_auth_platform_interface.FacebookAuthCredential = class FacebookAuthCredential extends firebase_auth_platform_interface.AuthCredential {
    get accessToken() {
      return this[accessToken$1];
    }
    set accessToken(value) {
      super.accessToken = value;
    }
    [_asMap]() {
      return new (IdentityMapOfString$String()).from(["accessToken", this.accessToken]);
    }
  };
  (firebase_auth_platform_interface.FacebookAuthCredential.new = function(opts) {
    let accessToken = opts && 'accessToken' in opts ? opts.accessToken : null;
    this[accessToken$1] = accessToken;
    firebase_auth_platform_interface.FacebookAuthCredential.__proto__.new.call(this, "facebook.com");
    ;
  }).prototype = firebase_auth_platform_interface.FacebookAuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.FacebookAuthCredential);
  dart.setMethodSignature(firebase_auth_platform_interface.FacebookAuthCredential, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.FacebookAuthCredential.__proto__),
    [_asMap]: dart.fnType(core.Map$(core.String, core.String), [])
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.FacebookAuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.FacebookAuthCredential, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.FacebookAuthCredential.__proto__),
    accessToken: dart.finalFieldType(core.String)
  }));
  dart.defineLazy(firebase_auth_platform_interface.FacebookAuthCredential, {
    /*firebase_auth_platform_interface.FacebookAuthCredential._providerId*/get _providerId() {
      return "facebook.com";
    }
  });
  const authToken$ = dart.privateName(firebase_auth_platform_interface, "TwitterAuthCredential.authToken");
  const authTokenSecret$ = dart.privateName(firebase_auth_platform_interface, "TwitterAuthCredential.authTokenSecret");
  firebase_auth_platform_interface.TwitterAuthCredential = class TwitterAuthCredential extends firebase_auth_platform_interface.AuthCredential {
    get authToken() {
      return this[authToken$];
    }
    set authToken(value) {
      super.authToken = value;
    }
    get authTokenSecret() {
      return this[authTokenSecret$];
    }
    set authTokenSecret(value) {
      super.authTokenSecret = value;
    }
    [_asMap]() {
      return new (IdentityMapOfString$String()).from(["authToken", this.authToken, "authTokenSecret", this.authTokenSecret]);
    }
  };
  (firebase_auth_platform_interface.TwitterAuthCredential.new = function(opts) {
    let authToken = opts && 'authToken' in opts ? opts.authToken : null;
    let authTokenSecret = opts && 'authTokenSecret' in opts ? opts.authTokenSecret : null;
    this[authToken$] = authToken;
    this[authTokenSecret$] = authTokenSecret;
    firebase_auth_platform_interface.TwitterAuthCredential.__proto__.new.call(this, "twitter.com");
    ;
  }).prototype = firebase_auth_platform_interface.TwitterAuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.TwitterAuthCredential);
  dart.setMethodSignature(firebase_auth_platform_interface.TwitterAuthCredential, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.TwitterAuthCredential.__proto__),
    [_asMap]: dart.fnType(core.Map$(core.String, core.String), [])
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.TwitterAuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.TwitterAuthCredential, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.TwitterAuthCredential.__proto__),
    authToken: dart.finalFieldType(core.String),
    authTokenSecret: dart.finalFieldType(core.String)
  }));
  dart.defineLazy(firebase_auth_platform_interface.TwitterAuthCredential, {
    /*firebase_auth_platform_interface.TwitterAuthCredential._providerId*/get _providerId() {
      return "twitter.com";
    }
  });
  const token$ = dart.privateName(firebase_auth_platform_interface, "GithubAuthCredential.token");
  firebase_auth_platform_interface.GithubAuthCredential = class GithubAuthCredential extends firebase_auth_platform_interface.AuthCredential {
    get token() {
      return this[token$];
    }
    set token(value) {
      super.token = value;
    }
    [_asMap]() {
      return new (IdentityMapOfString$String()).from(["token", this.token]);
    }
  };
  (firebase_auth_platform_interface.GithubAuthCredential.new = function(opts) {
    let token = opts && 'token' in opts ? opts.token : null;
    this[token$] = token;
    firebase_auth_platform_interface.GithubAuthCredential.__proto__.new.call(this, "github.com");
    ;
  }).prototype = firebase_auth_platform_interface.GithubAuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.GithubAuthCredential);
  dart.setMethodSignature(firebase_auth_platform_interface.GithubAuthCredential, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.GithubAuthCredential.__proto__),
    [_asMap]: dart.fnType(core.Map$(core.String, core.String), [])
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.GithubAuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.GithubAuthCredential, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.GithubAuthCredential.__proto__),
    token: dart.finalFieldType(core.String)
  }));
  dart.defineLazy(firebase_auth_platform_interface.GithubAuthCredential, {
    /*firebase_auth_platform_interface.GithubAuthCredential._providerId*/get _providerId() {
      return "github.com";
    }
  });
  const _jsonObject = dart.privateName(firebase_auth_platform_interface, "_jsonObject");
  const verificationId$ = dart.privateName(firebase_auth_platform_interface, "PhoneAuthCredential.verificationId");
  const smsCode$ = dart.privateName(firebase_auth_platform_interface, "PhoneAuthCredential.smsCode");
  const _jsonObject$ = dart.privateName(firebase_auth_platform_interface, "PhoneAuthCredential._jsonObject");
  firebase_auth_platform_interface.PhoneAuthCredential = class PhoneAuthCredential extends firebase_auth_platform_interface.AuthCredential {
    get verificationId() {
      return this[verificationId$];
    }
    set verificationId(value) {
      super.verificationId = value;
    }
    get smsCode() {
      return this[smsCode$];
    }
    set smsCode(value) {
      super.smsCode = value;
    }
    get [_jsonObject]() {
      return this[_jsonObject$];
    }
    set [_jsonObject](value) {
      super[_jsonObject] = value;
    }
    [_asMap]() {
      let result = new (IdentityMapOfString$String()).new();
      if (this.verificationId != null) {
        result[$_set]("verificationId", this.verificationId);
      }
      if (this.smsCode != null) {
        result[$_set]("smsCode", this.smsCode);
      }
      if (this[_jsonObject] != null) {
        result[$_set]("jsonObject", this[_jsonObject]);
      }
      return result;
    }
  };
  (firebase_auth_platform_interface.PhoneAuthCredential.new = function(opts) {
    let verificationId = opts && 'verificationId' in opts ? opts.verificationId : null;
    let smsCode = opts && 'smsCode' in opts ? opts.smsCode : null;
    this[verificationId$] = verificationId;
    this[smsCode$] = smsCode;
    this[_jsonObject$] = null;
    firebase_auth_platform_interface.PhoneAuthCredential.__proto__.new.call(this, "phone");
    ;
  }).prototype = firebase_auth_platform_interface.PhoneAuthCredential.prototype;
  (firebase_auth_platform_interface.PhoneAuthCredential._fromDetectedOnAndroid = function(opts) {
    let jsonObject = opts && 'jsonObject' in opts ? opts.jsonObject : null;
    this[_jsonObject$] = jsonObject;
    this[verificationId$] = null;
    this[smsCode$] = null;
    firebase_auth_platform_interface.PhoneAuthCredential.__proto__.new.call(this, "phone");
    ;
  }).prototype = firebase_auth_platform_interface.PhoneAuthCredential.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.PhoneAuthCredential);
  dart.setMethodSignature(firebase_auth_platform_interface.PhoneAuthCredential, () => ({
    __proto__: dart.getMethods(firebase_auth_platform_interface.PhoneAuthCredential.__proto__),
    [_asMap]: dart.fnType(core.Map$(core.String, core.String), [])
  }));
  dart.setLibraryUri(firebase_auth_platform_interface.PhoneAuthCredential, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.PhoneAuthCredential, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.PhoneAuthCredential.__proto__),
    verificationId: dart.finalFieldType(core.String),
    smsCode: dart.finalFieldType(core.String),
    [_jsonObject]: dart.finalFieldType(core.String)
  }));
  dart.defineLazy(firebase_auth_platform_interface.PhoneAuthCredential, {
    /*firebase_auth_platform_interface.PhoneAuthCredential._providerId*/get _providerId() {
      return "phone";
    }
  });
  const token$0 = dart.privateName(firebase_auth_platform_interface, "PlatformIdTokenResult.token");
  const expirationTimestamp$ = dart.privateName(firebase_auth_platform_interface, "PlatformIdTokenResult.expirationTimestamp");
  const authTimestamp$ = dart.privateName(firebase_auth_platform_interface, "PlatformIdTokenResult.authTimestamp");
  const issuedAtTimestamp$ = dart.privateName(firebase_auth_platform_interface, "PlatformIdTokenResult.issuedAtTimestamp");
  const claims$ = dart.privateName(firebase_auth_platform_interface, "PlatformIdTokenResult.claims");
  const signInProvider$ = dart.privateName(firebase_auth_platform_interface, "PlatformIdTokenResult.signInProvider");
  firebase_auth_platform_interface.PlatformIdTokenResult = class PlatformIdTokenResult extends core.Object {
    get token() {
      return this[token$0];
    }
    set token(value) {
      super.token = value;
    }
    get expirationTimestamp() {
      return this[expirationTimestamp$];
    }
    set expirationTimestamp(value) {
      super.expirationTimestamp = value;
    }
    get authTimestamp() {
      return this[authTimestamp$];
    }
    set authTimestamp(value) {
      super.authTimestamp = value;
    }
    get issuedAtTimestamp() {
      return this[issuedAtTimestamp$];
    }
    set issuedAtTimestamp(value) {
      super.issuedAtTimestamp = value;
    }
    get claims() {
      return this[claims$];
    }
    set claims(value) {
      super.claims = value;
    }
    get signInProvider() {
      return this[signInProvider$];
    }
    set signInProvider(value) {
      super.signInProvider = value;
    }
  };
  (firebase_auth_platform_interface.PlatformIdTokenResult.new = function(opts) {
    let token = opts && 'token' in opts ? opts.token : null;
    let expirationTimestamp = opts && 'expirationTimestamp' in opts ? opts.expirationTimestamp : null;
    let authTimestamp = opts && 'authTimestamp' in opts ? opts.authTimestamp : null;
    let issuedAtTimestamp = opts && 'issuedAtTimestamp' in opts ? opts.issuedAtTimestamp : null;
    let claims = opts && 'claims' in opts ? opts.claims : null;
    let signInProvider = opts && 'signInProvider' in opts ? opts.signInProvider : null;
    this[token$0] = token;
    this[expirationTimestamp$] = expirationTimestamp;
    this[authTimestamp$] = authTimestamp;
    this[issuedAtTimestamp$] = issuedAtTimestamp;
    this[claims$] = claims;
    this[signInProvider$] = signInProvider;
    ;
  }).prototype = firebase_auth_platform_interface.PlatformIdTokenResult.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.PlatformIdTokenResult);
  dart.setLibraryUri(firebase_auth_platform_interface.PlatformIdTokenResult, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.PlatformIdTokenResult, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.PlatformIdTokenResult.__proto__),
    token: dart.finalFieldType(core.String),
    expirationTimestamp: dart.finalFieldType(core.int),
    authTimestamp: dart.finalFieldType(core.int),
    issuedAtTimestamp: dart.finalFieldType(core.int),
    claims: dart.finalFieldType(core.Map),
    signInProvider: dart.finalFieldType(core.String)
  }));
  const code$ = dart.privateName(firebase_auth_platform_interface, "AuthException.code");
  const message$ = dart.privateName(firebase_auth_platform_interface, "AuthException.message");
  firebase_auth_platform_interface.AuthException = class AuthException extends core.Object {
    get code() {
      return this[code$];
    }
    set code(value) {
      super.code = value;
    }
    get message() {
      return this[message$];
    }
    set message(value) {
      super.message = value;
    }
  };
  (firebase_auth_platform_interface.AuthException.new = function(code, message) {
    this[code$] = code;
    this[message$] = message;
    ;
  }).prototype = firebase_auth_platform_interface.AuthException.prototype;
  dart.addTypeTests(firebase_auth_platform_interface.AuthException);
  firebase_auth_platform_interface.AuthException[dart.implements] = () => [core.Exception];
  dart.setLibraryUri(firebase_auth_platform_interface.AuthException, "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart");
  dart.setFieldSignature(firebase_auth_platform_interface.AuthException, () => ({
    __proto__: dart.getFields(firebase_auth_platform_interface.AuthException.__proto__),
    code: dart.finalFieldType(core.String),
    message: dart.finalFieldType(core.String)
  }));
  let C3;
  firebase_auth_platform_interface._decodeUser = function _decodeUser(data) {
    let rawProviderData = core.List._check(data[$_get]("providerData"));
    let castProviderData = rawProviderData[$cast](core.Map);
    let providerData = castProviderData[$map](firebase_auth_platform_interface.PlatformUserInfo, C3 || CT.C3)[$toList]();
    return new firebase_auth_platform_interface.PlatformUser.new({providerId: core.String._check(data[$_get]("providerId")), uid: core.String._check(data[$_get]("uid")), displayName: core.String._check(data[$_get]("displayName")), photoUrl: core.String._check(data[$_get]("photoUrl")), email: core.String._check(data[$_get]("email")), phoneNumber: core.String._check(data[$_get]("phoneNumber")), isAnonymous: core.bool._check(data[$_get]("isAnonymous")), isEmailVerified: core.bool._check(data[$_get]("isEmailVerified")), creationTimestamp: core.int._check(data[$_get]("creationTimestamp")), lastSignInTimestamp: core.int._check(data[$_get]("lastSignInTimestamp")), providerData: providerData});
  };
  firebase_auth_platform_interface._decodeUserInfo = function _decodeUserInfo(data) {
    return new firebase_auth_platform_interface.PlatformUserInfo.new({providerId: core.String._check(data[$_get]("providerId")), uid: core.String._check(data[$_get]("uid")), displayName: core.String._check(data[$_get]("displayName")), photoUrl: core.String._check(data[$_get]("photoUrl")), email: core.String._check(data[$_get]("email")), phoneNumber: core.String._check(data[$_get]("phoneNumber"))});
  };
  firebase_auth_platform_interface._decodeAuthResult = function _decodeAuthResult(data) {
    let user = firebase_auth_platform_interface._decodeUser(core.Map._check(data[$_get]("user")));
    let additionalUserInfo = firebase_auth_platform_interface._decodeAdditionalUserInfo(core.Map._check(data[$_get]("additionalUserInfo")));
    return new firebase_auth_platform_interface.PlatformAuthResult.new({user: user, additionalUserInfo: additionalUserInfo});
  };
  firebase_auth_platform_interface._decodeAdditionalUserInfo = function _decodeAdditionalUserInfo(data) {
    let t1;
    if (data == null) {
      return null;
    }
    return new firebase_auth_platform_interface.PlatformAdditionalUserInfo.new({isNewUser: core.bool._check(data[$_get]("isNewUser")), username: core.String._check(data[$_get]("username")), providerId: core.String._check(data[$_get]("providerId")), profile: MapOfString$dynamic()._check((t1 = data[$_get]("profile"), t1 == null ? null : dart.dgsend(t1, [core.String, dart.dynamic], 'cast', [])))});
  };
  firebase_auth_platform_interface._decodeIdTokenResult = function _decodeIdTokenResult(data) {
    return new firebase_auth_platform_interface.PlatformIdTokenResult.new({token: core.String._check(data[$_get]("token")), expirationTimestamp: core.int._check(data[$_get]("expirationTimestamp")), authTimestamp: core.int._check(data[$_get]("authTimestamp")), issuedAtTimestamp: core.int._check(data[$_get]("issuedAtTimestamp")), signInProvider: core.String._check(data[$_get]("signInProvider")), claims: core.Map._check(data[$_get]("claims"))});
  };
  dart.trackLibraries("packages/firebase_auth_platform_interface/firebase_auth_platform_interface", {
    "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart": firebase_auth_platform_interface
  }, {
    "package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart": ["src/method_channel_firebase_auth.dart", "src/types.dart"]
  }, '{"version":3,"sourceRoot":"","sources":["firebase_auth_platform_interface.dart","src/method_channel_firebase_auth.dart","src/types.dart"],"names":[],"mappings":"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","file":"firebase_auth_platform_interface.ddc.js"}');
  // Exports:
  return {
    firebase_auth_platform_interface: firebase_auth_platform_interface
  };
});

//# sourceMappingURL=firebase_auth_platform_interface.ddc.js.map
