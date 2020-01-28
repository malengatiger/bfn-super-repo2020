define(['dart_sdk', 'packages/firebase_auth_platform_interface/firebase_auth_platform_interface', 'packages/firebase/firebase', 'packages/http_parser/http_parser', 'packages/flutter/src/gestures/arena', 'packages/firebase/src/app'], function(dart_sdk, packages__firebase_auth_platform_interface__firebase_auth_platform_interface, packages__firebase__firebase, packages__http_parser__http_parser, packages__flutter__src__gestures__arena, packages__firebase__src__app) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const firebase_auth_platform_interface = packages__firebase_auth_platform_interface__firebase_auth_platform_interface.firebase_auth_platform_interface;
  const top_level = packages__firebase__firebase.src__top_level;
  const http_date = packages__http_parser__http_parser.src__http_date;
  const message_codec = packages__flutter__src__gestures__arena.src__services__message_codec;
  const auth = packages__firebase__src__app.src__auth;
  const firebase_auth_web = Object.create(dart.library);
  const $map = dartx.map;
  const $toList = dartx.toList;
  const CT = Object.create(null);
  const _getAuth = dart.privateName(firebase_auth_web, "_getAuth");
  const _fromJsAdditionalUserInfo = dart.privateName(firebase_auth_web, "_fromJsAdditionalUserInfo");
  const _fromJsUserInfo = dart.privateName(firebase_auth_web, "_fromJsUserInfo");
  const _fromJsUser = dart.privateName(firebase_auth_web, "_fromJsUser");
  const _fromJsUserCredential = dart.privateName(firebase_auth_web, "_fromJsUserCredential");
  const _fromJsIdTokenResult = dart.privateName(firebase_auth_web, "_fromJsIdTokenResult");
  const _getCurrentUserOrThrow = dart.privateName(firebase_auth_web, "_getCurrentUserOrThrow");
  const _getCredential = dart.privateName(firebase_auth_web, "_getCredential");
  firebase_auth_web.FirebaseAuthWeb = class FirebaseAuthWeb extends firebase_auth_platform_interface.FirebaseAuthPlatform {
    static registerWith(registrar) {
      firebase_auth_platform_interface.FirebaseAuthPlatform.instance = new firebase_auth_web.FirebaseAuthWeb.new();
    }
    [_getAuth](name) {
      let app = top_level.app(name);
      return top_level.auth(app);
    }
    [_fromJsAdditionalUserInfo](additionalUserInfo) {
      return new firebase_auth_platform_interface.PlatformAdditionalUserInfo.new({isNewUser: additionalUserInfo.isNewUser, providerId: additionalUserInfo.providerId, username: additionalUserInfo.username, profile: additionalUserInfo.profile});
    }
    [_fromJsUserInfo](userInfo) {
      return new firebase_auth_platform_interface.PlatformUserInfo.new({providerId: userInfo.providerId, uid: userInfo.providerId, displayName: userInfo.displayName, photoUrl: userInfo.photoURL, email: userInfo.email, phoneNumber: userInfo.phoneNumber});
    }
    [_fromJsUser](user) {
      if (user == null) {
        return null;
      }
      return new firebase_auth_platform_interface.PlatformUser.new({providerId: user.providerId, uid: user.uid, displayName: user.displayName, photoUrl: user.photoURL, email: user.email, phoneNumber: user.phoneNumber, creationTimestamp: http_date.parseHttpDate(user.metadata.creationTime).millisecondsSinceEpoch, lastSignInTimestamp: http_date.parseHttpDate(user.metadata.lastSignInTime).millisecondsSinceEpoch, isAnonymous: user.isAnonymous, isEmailVerified: user.emailVerified, providerData: user.providerData[$map](firebase_auth_platform_interface.PlatformUserInfo, dart.bind(this, _fromJsUserInfo))[$toList]()});
    }
    [_fromJsUserCredential](credential) {
      return new firebase_auth_platform_interface.PlatformAuthResult.new({user: this[_fromJsUser](credential.user), additionalUserInfo: this[_fromJsAdditionalUserInfo](credential.additionalUserInfo)});
    }
    [_fromJsIdTokenResult](idTokenResult) {
      return new firebase_auth_platform_interface.PlatformIdTokenResult.new({token: idTokenResult.token, expirationTimestamp: idTokenResult.expirationTime.millisecondsSinceEpoch, authTimestamp: idTokenResult.authTime.millisecondsSinceEpoch, issuedAtTimestamp: idTokenResult.issuedAtTime.millisecondsSinceEpoch, claims: idTokenResult.claims, signInProvider: idTokenResult.signInProvider});
    }
    [_getCurrentUserOrThrow](auth) {
      let user = auth.currentUser;
      if (user == null) {
        dart.throw(new message_codec.PlatformException.new({code: "USER_REQUIRED", message: "Please authenticate with Firebase first"}));
      }
      return user;
    }
    [_getCredential](credential) {
      if (firebase_auth_platform_interface.EmailAuthCredential.is(credential)) {
        return auth.EmailAuthProvider.credential(credential.email, credential.password);
      }
      if (firebase_auth_platform_interface.GoogleAuthCredential.is(credential)) {
        return auth.GoogleAuthProvider.credential(credential.idToken, credential.accessToken);
      }
      if (firebase_auth_platform_interface.FacebookAuthCredential.is(credential)) {
        return auth.FacebookAuthProvider.credential(credential.accessToken);
      }
      if (firebase_auth_platform_interface.TwitterAuthCredential.is(credential)) {
        return auth.TwitterAuthProvider.credential(credential.authToken, credential.authTokenSecret);
      }
      if (firebase_auth_platform_interface.GithubAuthCredential.is(credential)) {
        return auth.GithubAuthProvider.credential(credential.token);
      }
      if (firebase_auth_platform_interface.PhoneAuthCredential.is(credential)) {
        return auth.PhoneAuthProvider.credential(credential.verificationId, credential.smsCode);
      }
      return null;
    }
    createUserWithEmailAndPassword(app, email, password) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, (function* createUserWithEmailAndPassword() {
        let auth = this[_getAuth](app);
        let credential = (yield auth.createUserWithEmailAndPassword(email, password));
        return this[_fromJsUserCredential](credential);
      }).bind(this));
    }
    delete(app) {
      return async.async(dart.void, (function* $delete() {
        let auth = this[_getAuth](app);
        let user = this[_getCurrentUserOrThrow](auth);
        yield user.delete();
      }).bind(this));
    }
    fetchSignInMethodsForEmail(app, email) {
      dart.throw(new core.UnimplementedError.new("fetchSignInMethodsForEmail"));
    }
    getCurrentUser(app) {
      return async.async(firebase_auth_platform_interface.PlatformUser, (function* getCurrentUser() {
        let auth = this[_getAuth](app);
        let currentUser = auth.currentUser;
        return this[_fromJsUser](currentUser);
      }).bind(this));
    }
    getIdToken(app, refresh) {
      return async.async(firebase_auth_platform_interface.PlatformIdTokenResult, (function* getIdToken() {
        let auth = this[_getAuth](app);
        let currentUser = auth.currentUser;
        let idTokenResult = (yield currentUser.getIdTokenResult(refresh));
        return this[_fromJsIdTokenResult](idTokenResult);
      }).bind(this));
    }
    isSignInWithEmailLink(app, link) {
      dart.throw(new core.UnimplementedError.new("isSignInWithEmailLink"));
    }
    linkWithCredential(app, credential) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, (function* linkWithCredential() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        let firebaseCredential = this[_getCredential](credential);
        let userCredential = (yield currentUser.linkWithCredential(firebaseCredential));
        return this[_fromJsUserCredential](userCredential);
      }).bind(this));
    }
    onAuthStateChanged(app) {
      let auth = this[_getAuth](app);
      return auth.onAuthStateChanged.map(firebase_auth_platform_interface.PlatformUser, dart.bind(this, _fromJsUser));
    }
    reauthenticateWithCredential(app, credential) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, (function* reauthenticateWithCredential() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        let firebaseCredential = this[_getCredential](credential);
        let userCredential = (yield currentUser.reauthenticateWithCredential(firebaseCredential));
        return this[_fromJsUserCredential](userCredential);
      }).bind(this));
    }
    reload(app) {
      return async.async(dart.void, (function* reload() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        yield currentUser.reload();
      }).bind(this));
    }
    sendEmailVerification(app) {
      return async.async(dart.void, (function* sendEmailVerification() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        yield currentUser.sendEmailVerification();
      }).bind(this));
    }
    sendLinkToEmail(app, opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let url = opts && 'url' in opts ? opts.url : null;
      let handleCodeInApp = opts && 'handleCodeInApp' in opts ? opts.handleCodeInApp : null;
      let iOSBundleID = opts && 'iOSBundleID' in opts ? opts.iOSBundleID : null;
      let androidPackageName = opts && 'androidPackageName' in opts ? opts.androidPackageName : null;
      let androidInstallIfNotAvailable = opts && 'androidInstallIfNotAvailable' in opts ? opts.androidInstallIfNotAvailable : null;
      let androidMinimumVersion = opts && 'androidMinimumVersion' in opts ? opts.androidMinimumVersion : null;
      dart.throw(new core.UnimplementedError.new("sendLinkToEmail"));
    }
    sendPasswordResetEmail(app, email) {
      return async.async(dart.void, (function* sendPasswordResetEmail() {
        let auth = this[_getAuth](app);
        yield auth.sendPasswordResetEmail(email);
      }).bind(this));
    }
    setLanguageCode(app, language) {
      return async.async(dart.void, (function* setLanguageCode() {
        let auth = this[_getAuth](app);
        auth.languageCode = language;
      }).bind(this));
    }
    signInAnonymously(app) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, (function* signInAnonymously() {
        let auth = this[_getAuth](app);
        let userCredential = (yield auth.signInAnonymously());
        return this[_fromJsUserCredential](userCredential);
      }).bind(this));
    }
    signInWithCredential(app, credential) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, (function* signInWithCredential() {
        let auth = this[_getAuth](app);
        let firebaseCredential = this[_getCredential](credential);
        let userCredential = (yield auth.signInWithCredential(firebaseCredential));
        return this[_fromJsUserCredential](userCredential);
      }).bind(this));
    }
    signInWithCustomToken(app, token) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, (function* signInWithCustomToken() {
        let auth = this[_getAuth](app);
        let userCredential = (yield auth.signInWithCustomToken(token));
        return this[_fromJsUserCredential](userCredential);
      }).bind(this));
    }
    signInWithEmailAndLink(app, email, link) {
      return async.async(firebase_auth_platform_interface.PlatformAuthResult, function* signInWithEmailAndLink() {
        dart.throw(new core.UnimplementedError.new("signInWithEmailAndLink"));
      });
    }
    signOut(app) {
      return async.async(dart.void, (function* signOut() {
        let auth = this[_getAuth](app);
        yield auth.signOut();
      }).bind(this));
    }
    unlinkFromProvider(app, provider) {
      return async.async(dart.void, (function* unlinkFromProvider() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        yield currentUser.unlink(provider);
      }).bind(this));
    }
    updateEmail(app, email) {
      return async.async(dart.void, (function* updateEmail() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        yield currentUser.updateEmail(email);
      }).bind(this));
    }
    updatePassword(app, password) {
      return async.async(dart.void, (function* updatePassword() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        yield currentUser.updatePassword(password);
      }).bind(this));
    }
    updatePhoneNumberCredential(app, phoneAuthCredential) {
      return async.async(dart.void, (function* updatePhoneNumberCredential() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        let credential = this[_getCredential](phoneAuthCredential);
        yield currentUser.updatePhoneNumber(credential);
      }).bind(this));
    }
    updateProfile(app, opts) {
      let displayName = opts && 'displayName' in opts ? opts.displayName : null;
      let photoUrl = opts && 'photoUrl' in opts ? opts.photoUrl : null;
      return async.async(dart.void, (function* updateProfile() {
        let auth = this[_getAuth](app);
        let currentUser = this[_getCurrentUserOrThrow](auth);
        let profile = {};
        if (displayName != null) {
          profile.displayName = displayName;
        }
        if (photoUrl != null) {
          profile.photoURL = photoUrl;
        }
        yield currentUser.updateProfile(profile);
      }).bind(this));
    }
    verifyPhoneNumber(app, opts) {
      let phoneNumber = opts && 'phoneNumber' in opts ? opts.phoneNumber : null;
      let timeout = opts && 'timeout' in opts ? opts.timeout : null;
      let forceResendingToken = opts && 'forceResendingToken' in opts ? opts.forceResendingToken : null;
      let verificationCompleted = opts && 'verificationCompleted' in opts ? opts.verificationCompleted : null;
      let verificationFailed = opts && 'verificationFailed' in opts ? opts.verificationFailed : null;
      let codeSent = opts && 'codeSent' in opts ? opts.codeSent : null;
      let codeAutoRetrievalTimeout = opts && 'codeAutoRetrievalTimeout' in opts ? opts.codeAutoRetrievalTimeout : null;
      return async.async(dart.void, function* verifyPhoneNumber() {
        dart.throw(new core.UnimplementedError.new("verifyPhoneNumber"));
      });
    }
  };
  (firebase_auth_web.FirebaseAuthWeb.new = function() {
    ;
  }).prototype = firebase_auth_web.FirebaseAuthWeb.prototype;
  dart.addTypeTests(firebase_auth_web.FirebaseAuthWeb);
  dart.setMethodSignature(firebase_auth_web.FirebaseAuthWeb, () => ({
    __proto__: dart.getMethods(firebase_auth_web.FirebaseAuthWeb.__proto__),
    [_getAuth]: dart.fnType(auth.Auth, [core.String]),
    [_fromJsAdditionalUserInfo]: dart.fnType(firebase_auth_platform_interface.PlatformAdditionalUserInfo, [auth.AdditionalUserInfo]),
    [_fromJsUserInfo]: dart.fnType(firebase_auth_platform_interface.PlatformUserInfo, [auth.UserInfo$(dart.anonymousJSType("UserInfoJsImpl"))]),
    [_fromJsUser]: dart.fnType(firebase_auth_platform_interface.PlatformUser, [auth.User]),
    [_fromJsUserCredential]: dart.fnType(firebase_auth_platform_interface.PlatformAuthResult, [auth.UserCredential]),
    [_fromJsIdTokenResult]: dart.fnType(firebase_auth_platform_interface.PlatformIdTokenResult, [auth.IdTokenResult]),
    [_getCurrentUserOrThrow]: dart.fnType(auth.User, [auth.Auth]),
    [_getCredential]: dart.fnType(dart.lazyJSType(() => dart.global.firebase.auth.OAuthCredential, "firebase.auth.OAuthCredential"), [firebase_auth_platform_interface.AuthCredential])
  }));
  dart.setLibraryUri(firebase_auth_web.FirebaseAuthWeb, "package:firebase_auth_web/firebase_auth_web.dart");
  dart.trackLibraries("packages/firebase_auth_web/firebase_auth_web", {
    "package:firebase_auth_web/firebase_auth_web.dart": firebase_auth_web
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["firebase_auth_web.dart"],"names":[],"mappings":"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","file":"firebase_auth_web.ddc.js"}');
  // Exports:
  return {
    firebase_auth_web: firebase_auth_web
  };
});

//# sourceMappingURL=firebase_auth_web.ddc.js.map
