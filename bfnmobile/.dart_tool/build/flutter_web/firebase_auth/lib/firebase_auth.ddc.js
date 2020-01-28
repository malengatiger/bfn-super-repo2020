define(['dart_sdk', 'packages/firebase_auth_platform_interface/firebase_auth_platform_interface', 'packages/firebase_core/firebase_core'], function(dart_sdk, packages__firebase_auth_platform_interface__firebase_auth_platform_interface, packages__firebase_core__firebase_core) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const firebase_auth_platform_interface = packages__firebase_auth_platform_interface__firebase_auth_platform_interface.firebase_auth_platform_interface;
  const firebase_app = packages__firebase_core__firebase_core.src__firebase_app;
  const firebase_auth = Object.create(dart.library);
  const $runtimeType = dartx.runtimeType;
  const $map = dartx.map;
  const $toList = dartx.toList;
  const $_set = dartx._set;
  const $_get = dartx._get;
  let PlatformUserToFirebaseUser = () => (PlatformUserToFirebaseUser = dart.constFn(dart.fnType(firebase_auth.FirebaseUser, [firebase_auth_platform_interface.PlatformUser])))();
  let PlatformUserInfoToUserInfo = () => (PlatformUserInfoToUserInfo = dart.constFn(dart.fnType(firebase_auth.UserInfo, [firebase_auth_platform_interface.PlatformUserInfo])))();
  let IdentityMapOfString$String = () => (IdentityMapOfString$String = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  const CT = Object.create(null);
  firebase_auth.EmailAuthProvider = class EmailAuthProvider extends core.Object {
    static getCredential(opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let password = opts && 'password' in opts ? opts.password : null;
      return new firebase_auth_platform_interface.EmailAuthCredential.new({email: email, password: password});
    }
    static getCredentialWithLink(opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let link = opts && 'link' in opts ? opts.link : null;
      return new firebase_auth_platform_interface.EmailAuthCredential.new({email: email, link: link});
    }
  };
  (firebase_auth.EmailAuthProvider.new = function() {
    ;
  }).prototype = firebase_auth.EmailAuthProvider.prototype;
  dart.addTypeTests(firebase_auth.EmailAuthProvider);
  dart.setLibraryUri(firebase_auth.EmailAuthProvider, "package:firebase_auth/firebase_auth.dart");
  dart.defineLazy(firebase_auth.EmailAuthProvider, {
    /*firebase_auth.EmailAuthProvider.providerId*/get providerId() {
      return "password";
    }
  });
  firebase_auth.FacebookAuthProvider = class FacebookAuthProvider extends core.Object {
    static getCredential(opts) {
      let accessToken = opts && 'accessToken' in opts ? opts.accessToken : null;
      return new firebase_auth_platform_interface.FacebookAuthCredential.new({accessToken: accessToken});
    }
  };
  (firebase_auth.FacebookAuthProvider.new = function() {
    ;
  }).prototype = firebase_auth.FacebookAuthProvider.prototype;
  dart.addTypeTests(firebase_auth.FacebookAuthProvider);
  dart.setLibraryUri(firebase_auth.FacebookAuthProvider, "package:firebase_auth/firebase_auth.dart");
  dart.defineLazy(firebase_auth.FacebookAuthProvider, {
    /*firebase_auth.FacebookAuthProvider.providerId*/get providerId() {
      return "facebook.com";
    }
  });
  firebase_auth.GithubAuthProvider = class GithubAuthProvider extends core.Object {
    static getCredential(opts) {
      let token = opts && 'token' in opts ? opts.token : null;
      return new firebase_auth_platform_interface.GithubAuthCredential.new({token: token});
    }
  };
  (firebase_auth.GithubAuthProvider.new = function() {
    ;
  }).prototype = firebase_auth.GithubAuthProvider.prototype;
  dart.addTypeTests(firebase_auth.GithubAuthProvider);
  dart.setLibraryUri(firebase_auth.GithubAuthProvider, "package:firebase_auth/firebase_auth.dart");
  dart.defineLazy(firebase_auth.GithubAuthProvider, {
    /*firebase_auth.GithubAuthProvider.providerId*/get providerId() {
      return "github.com";
    }
  });
  firebase_auth.GoogleAuthProvider = class GoogleAuthProvider extends core.Object {
    static getCredential(opts) {
      let idToken = opts && 'idToken' in opts ? opts.idToken : null;
      let accessToken = opts && 'accessToken' in opts ? opts.accessToken : null;
      return new firebase_auth_platform_interface.GoogleAuthCredential.new({idToken: idToken, accessToken: accessToken});
    }
  };
  (firebase_auth.GoogleAuthProvider.new = function() {
    ;
  }).prototype = firebase_auth.GoogleAuthProvider.prototype;
  dart.addTypeTests(firebase_auth.GoogleAuthProvider);
  dart.setLibraryUri(firebase_auth.GoogleAuthProvider, "package:firebase_auth/firebase_auth.dart");
  dart.defineLazy(firebase_auth.GoogleAuthProvider, {
    /*firebase_auth.GoogleAuthProvider.providerId*/get providerId() {
      return "google.com";
    }
  });
  firebase_auth.PhoneAuthProvider = class PhoneAuthProvider extends core.Object {
    static getCredential(opts) {
      let verificationId = opts && 'verificationId' in opts ? opts.verificationId : null;
      let smsCode = opts && 'smsCode' in opts ? opts.smsCode : null;
      return new firebase_auth_platform_interface.PhoneAuthCredential.new({verificationId: verificationId, smsCode: smsCode});
    }
  };
  (firebase_auth.PhoneAuthProvider.new = function() {
    ;
  }).prototype = firebase_auth.PhoneAuthProvider.prototype;
  dart.addTypeTests(firebase_auth.PhoneAuthProvider);
  dart.setLibraryUri(firebase_auth.PhoneAuthProvider, "package:firebase_auth/firebase_auth.dart");
  dart.defineLazy(firebase_auth.PhoneAuthProvider, {
    /*firebase_auth.PhoneAuthProvider.providerId*/get providerId() {
      return "phone";
    }
  });
  firebase_auth.TwitterAuthProvider = class TwitterAuthProvider extends core.Object {
    static getCredential(opts) {
      let authToken = opts && 'authToken' in opts ? opts.authToken : null;
      let authTokenSecret = opts && 'authTokenSecret' in opts ? opts.authTokenSecret : null;
      return new firebase_auth_platform_interface.TwitterAuthCredential.new({authToken: authToken, authTokenSecret: authTokenSecret});
    }
  };
  (firebase_auth.TwitterAuthProvider.new = function() {
    ;
  }).prototype = firebase_auth.TwitterAuthProvider.prototype;
  dart.addTypeTests(firebase_auth.TwitterAuthProvider);
  dart.setLibraryUri(firebase_auth.TwitterAuthProvider, "package:firebase_auth/firebase_auth.dart");
  dart.defineLazy(firebase_auth.TwitterAuthProvider, {
    /*firebase_auth.TwitterAuthProvider.providerId*/get providerId() {
      return "twitter.com";
    }
  });
  const providerId$ = dart.privateName(firebase_auth, "OAuthProvider.providerId");
  firebase_auth.OAuthProvider = class OAuthProvider extends core.Object {
    get providerId() {
      return this[providerId$];
    }
    set providerId(value) {
      super.providerId = value;
    }
    getCredential(opts) {
      let idToken = opts && 'idToken' in opts ? opts.idToken : null;
      let accessToken = opts && 'accessToken' in opts ? opts.accessToken : null;
      let rawNonce = opts && 'rawNonce' in opts ? opts.rawNonce : null;
      return new firebase_auth_platform_interface.PlatformOAuthCredential.new({providerId: this.providerId, idToken: idToken, accessToken: accessToken, rawNonce: rawNonce});
    }
  };
  (firebase_auth.OAuthProvider.new = function(opts) {
    let providerId = opts && 'providerId' in opts ? opts.providerId : null;
    this[providerId$] = providerId;
    if (!(providerId != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/auth_provider/oauth_auth_provider.dart", 8, 61, "providerId != null");
    ;
  }).prototype = firebase_auth.OAuthProvider.prototype;
  dart.addTypeTests(firebase_auth.OAuthProvider);
  dart.setMethodSignature(firebase_auth.OAuthProvider, () => ({
    __proto__: dart.getMethods(firebase_auth.OAuthProvider.__proto__),
    getCredential: dart.fnType(firebase_auth_platform_interface.OAuthCredential, [], {accessToken: core.String, idToken: core.String, rawNonce: core.String}, {})
  }));
  dart.setLibraryUri(firebase_auth.OAuthProvider, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.OAuthProvider, () => ({
    __proto__: dart.getFields(firebase_auth.OAuthProvider.__proto__),
    providerId: dart.finalFieldType(core.String)
  }));
  const _data$ = dart.privateName(firebase_auth, "_data");
  firebase_auth.AdditionalUserInfo = class AdditionalUserInfo extends core.Object {
    get isNewUser() {
      return this[_data$].isNewUser;
    }
    get username() {
      return this[_data$].username;
    }
    get providerId() {
      return this[_data$].providerId;
    }
    get profile() {
      return this[_data$].profile;
    }
  };
  (firebase_auth.AdditionalUserInfo.__ = function(_data) {
    this[_data$] = _data;
    ;
  }).prototype = firebase_auth.AdditionalUserInfo.prototype;
  dart.addTypeTests(firebase_auth.AdditionalUserInfo);
  dart.setGetterSignature(firebase_auth.AdditionalUserInfo, () => ({
    __proto__: dart.getGetters(firebase_auth.AdditionalUserInfo.__proto__),
    isNewUser: core.bool,
    username: core.String,
    providerId: core.String,
    profile: core.Map$(core.String, dart.dynamic)
  }));
  dart.setLibraryUri(firebase_auth.AdditionalUserInfo, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.AdditionalUserInfo, () => ({
    __proto__: dart.getFields(firebase_auth.AdditionalUserInfo.__proto__),
    [_data$]: dart.finalFieldType(firebase_auth_platform_interface.PlatformAdditionalUserInfo)
  }));
  const user = dart.privateName(firebase_auth, "AuthResult.user");
  firebase_auth.AuthResult = class AuthResult extends core.Object {
    get user() {
      return this[user];
    }
    set user(value) {
      super.user = value;
    }
    get additionalUserInfo() {
      return this[_data$].additionalUserInfo == null ? null : new firebase_auth.AdditionalUserInfo.__(this[_data$].additionalUserInfo);
    }
    toString() {
      return dart.str(this[$runtimeType]) + "(" + dart.str(this[_data$]) + ")";
    }
  };
  (firebase_auth.AuthResult.__ = function(_data, app) {
    this[_data$] = _data;
    this[user] = new firebase_auth.FirebaseUser.__(_data.user, app);
    ;
  }).prototype = firebase_auth.AuthResult.prototype;
  dart.addTypeTests(firebase_auth.AuthResult);
  dart.setGetterSignature(firebase_auth.AuthResult, () => ({
    __proto__: dart.getGetters(firebase_auth.AuthResult.__proto__),
    additionalUserInfo: firebase_auth.AdditionalUserInfo
  }));
  dart.setLibraryUri(firebase_auth.AuthResult, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.AuthResult, () => ({
    __proto__: dart.getFields(firebase_auth.AuthResult.__proto__),
    [_data$]: dart.finalFieldType(firebase_auth_platform_interface.PlatformAuthResult),
    user: dart.finalFieldType(firebase_auth.FirebaseUser)
  }));
  dart.defineExtensionMethods(firebase_auth.AuthResult, ['toString']);
  const app$ = dart.privateName(firebase_auth, "FirebaseAuth.app");
  firebase_auth.FirebaseAuth = class FirebaseAuth extends core.Object {
    get app() {
      return this[app$];
    }
    set app(value) {
      super.app = value;
    }
    static fromApp(app) {
      if (!(app != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 13, 12, "app != null");
      return new firebase_auth.FirebaseAuth.__(app);
    }
    get onAuthStateChanged() {
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.onAuthStateChanged(this.app.name).map(firebase_auth.FirebaseUser, dart.fn(user => user == null ? null : new firebase_auth.FirebaseUser.__(user, this.app), PlatformUserToFirebaseUser()));
    }
    signInAnonymously() {
      return async.async(firebase_auth.AuthResult, (function* signInAnonymously() {
        let data = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.signInAnonymously(this.app.name));
        let authResult = new firebase_auth.AuthResult.__(data, this.app);
        return authResult;
      }).bind(this));
    }
    createUserWithEmailAndPassword(opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let password = opts && 'password' in opts ? opts.password : null;
      return async.async(firebase_auth.AuthResult, (function* createUserWithEmailAndPassword() {
        if (!(email != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 61, 12, "email != null");
        if (!(password != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 62, 12, "password != null");
        let data = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.createUserWithEmailAndPassword(this.app.name, email, password));
        let authResult = new firebase_auth.AuthResult.__(data, this.app);
        return authResult;
      }).bind(this));
    }
    fetchSignInMethodsForEmail(opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      if (!(email != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 83, 12, "email != null");
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.fetchSignInMethodsForEmail(this.app.name, email);
    }
    sendPasswordResetEmail(opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      if (!(email != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 99, 12, "email != null");
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.sendPasswordResetEmail(this.app.name, email);
    }
    sendSignInWithEmailLink(opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let url = opts && 'url' in opts ? opts.url : null;
      let handleCodeInApp = opts && 'handleCodeInApp' in opts ? opts.handleCodeInApp : null;
      let iOSBundleID = opts && 'iOSBundleID' in opts ? opts.iOSBundleID : null;
      let androidPackageName = opts && 'androidPackageName' in opts ? opts.androidPackageName : null;
      let androidInstallIfNotAvailable = opts && 'androidInstallIfNotAvailable' in opts ? opts.androidInstallIfNotAvailable : null;
      let androidMinimumVersion = opts && 'androidMinimumVersion' in opts ? opts.androidMinimumVersion : null;
      if (!(email != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 114, 12, "email != null");
      if (!(url != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 115, 12, "url != null");
      if (!(handleCodeInApp != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 116, 12, "handleCodeInApp != null");
      if (!(iOSBundleID != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 117, 12, "iOSBundleID != null");
      if (!(androidPackageName != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 118, 12, "androidPackageName != null");
      if (!(androidInstallIfNotAvailable != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 119, 12, "androidInstallIfNotAvailable != null");
      if (!(androidMinimumVersion != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 120, 12, "androidMinimumVersion != null");
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.sendLinkToEmail(this.app.name, {email: email, url: url, handleCodeInApp: handleCodeInApp, iOSBundleID: iOSBundleID, androidPackageName: androidPackageName, androidInstallIfNotAvailable: androidInstallIfNotAvailable, androidMinimumVersion: androidMinimumVersion});
    }
    isSignInWithEmailLink(link) {
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.isSignInWithEmailLink(this.app.name, link);
    }
    signInWithEmailAndLink(opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let link = opts && 'link' in opts ? opts.link : null;
      return async.async(firebase_auth.AuthResult, (function* signInWithEmailAndLink() {
        let data = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.signInWithEmailAndLink(this.app.name, email, link));
        let authResult = new firebase_auth.AuthResult.__(data, this.app);
        return authResult;
      }).bind(this));
    }
    signInWithEmailAndPassword(opts) {
      let email = opts && 'email' in opts ? opts.email : null;
      let password = opts && 'password' in opts ? opts.password : null;
      if (!(email != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 174, 12, "email != null");
      if (!(password != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 175, 12, "password != null");
      let credential = firebase_auth.EmailAuthProvider.getCredential({email: email, password: password});
      return this.signInWithCredential(credential);
    }
    signInWithCredential(credential) {
      return async.async(firebase_auth.AuthResult, (function* signInWithCredential() {
        if (!(credential != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 206, 12, "credential != null");
        let data = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.signInWithCredential(this.app.name, credential));
        let authResult = new firebase_auth.AuthResult.__(data, this.app);
        return authResult;
      }).bind(this));
    }
    verifyPhoneNumber(opts) {
      let phoneNumber = opts && 'phoneNumber' in opts ? opts.phoneNumber : null;
      let timeout = opts && 'timeout' in opts ? opts.timeout : null;
      let forceResendingToken = opts && 'forceResendingToken' in opts ? opts.forceResendingToken : null;
      let verificationCompleted = opts && 'verificationCompleted' in opts ? opts.verificationCompleted : null;
      let verificationFailed = opts && 'verificationFailed' in opts ? opts.verificationFailed : null;
      let codeSent = opts && 'codeSent' in opts ? opts.codeSent : null;
      let codeAutoRetrievalTimeout = opts && 'codeAutoRetrievalTimeout' in opts ? opts.codeAutoRetrievalTimeout : null;
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.verifyPhoneNumber(this.app.name, {phoneNumber: phoneNumber, timeout: timeout, forceResendingToken: forceResendingToken, verificationCompleted: verificationCompleted, verificationFailed: verificationFailed, codeSent: codeSent, codeAutoRetrievalTimeout: codeAutoRetrievalTimeout});
    }
    signInWithCustomToken(opts) {
      let token = opts && 'token' in opts ? opts.token : null;
      return async.async(firebase_auth.AuthResult, (function* signInWithCustomToken() {
        if (!(token != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 298, 12, "token != null");
        let data = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.signInWithCustomToken(this.app.name, token));
        let authResult = new firebase_auth.AuthResult.__(data, this.app);
        return authResult;
      }).bind(this));
    }
    signOut() {
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.signOut(this.app.name);
    }
    currentUser() {
      return async.async(firebase_auth.FirebaseUser, (function* currentUser() {
        let data = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.getCurrentUser(this.app.name));
        let currentUser = data == null ? null : new firebase_auth.FirebaseUser.__(data, this.app);
        return currentUser;
      }).bind(this));
    }
    setLanguageCode(language) {
      if (!(language != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_auth.dart", 326, 12, "language != null");
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.setLanguageCode(this.app.name, language);
    }
    confirmPasswordReset(oobCode, newPassword) {
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.confirmPasswordReset(this.app.name, oobCode, newPassword);
    }
  };
  (firebase_auth.FirebaseAuth.__ = function(app) {
    this[app$] = app;
    ;
  }).prototype = firebase_auth.FirebaseAuth.prototype;
  dart.addTypeTests(firebase_auth.FirebaseAuth);
  dart.setMethodSignature(firebase_auth.FirebaseAuth, () => ({
    __proto__: dart.getMethods(firebase_auth.FirebaseAuth.__proto__),
    signInAnonymously: dart.fnType(async.Future$(firebase_auth.AuthResult), []),
    createUserWithEmailAndPassword: dart.fnType(async.Future$(firebase_auth.AuthResult), [], {email: core.String, password: core.String}, {}),
    fetchSignInMethodsForEmail: dart.fnType(async.Future$(core.List$(core.String)), [], {email: core.String}, {}),
    sendPasswordResetEmail: dart.fnType(async.Future$(dart.void), [], {email: core.String}, {}),
    sendSignInWithEmailLink: dart.fnType(async.Future$(dart.void), [], {androidInstallIfNotAvailable: core.bool, androidMinimumVersion: core.String, androidPackageName: core.String, email: core.String, handleCodeInApp: core.bool, iOSBundleID: core.String, url: core.String}, {}),
    isSignInWithEmailLink: dart.fnType(async.Future$(core.bool), [core.String]),
    signInWithEmailAndLink: dart.fnType(async.Future$(firebase_auth.AuthResult), [], {email: core.String, link: core.String}, {}),
    signInWithEmailAndPassword: dart.fnType(async.Future$(firebase_auth.AuthResult), [], {email: core.String, password: core.String}, {}),
    signInWithCredential: dart.fnType(async.Future$(firebase_auth.AuthResult), [firebase_auth_platform_interface.AuthCredential]),
    verifyPhoneNumber: dart.fnType(async.Future$(dart.void), [], {codeAutoRetrievalTimeout: dart.fnType(dart.void, [core.String]), codeSent: dart.fnType(dart.void, [core.String], [core.int]), forceResendingToken: core.int, phoneNumber: core.String, timeout: core.Duration, verificationCompleted: dart.fnType(dart.void, [firebase_auth_platform_interface.AuthCredential]), verificationFailed: dart.fnType(dart.void, [firebase_auth_platform_interface.AuthException])}, {}),
    signInWithCustomToken: dart.fnType(async.Future$(firebase_auth.AuthResult), [], {token: core.String}, {}),
    signOut: dart.fnType(async.Future$(dart.void), []),
    currentUser: dart.fnType(async.Future$(firebase_auth.FirebaseUser), []),
    setLanguageCode: dart.fnType(async.Future$(dart.void), [core.String]),
    confirmPasswordReset: dart.fnType(async.Future$(dart.void), [core.String, core.String])
  }));
  dart.setGetterSignature(firebase_auth.FirebaseAuth, () => ({
    __proto__: dart.getGetters(firebase_auth.FirebaseAuth.__proto__),
    onAuthStateChanged: async.Stream$(firebase_auth.FirebaseUser)
  }));
  dart.setLibraryUri(firebase_auth.FirebaseAuth, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.FirebaseAuth, () => ({
    __proto__: dart.getFields(firebase_auth.FirebaseAuth.__proto__),
    app: dart.finalFieldType(firebase_app.FirebaseApp)
  }));
  dart.defineLazy(firebase_auth.FirebaseAuth, {
    /*firebase_auth.FirebaseAuth.instance*/get instance() {
      return new firebase_auth.FirebaseAuth.__(firebase_app.FirebaseApp.instance);
    }
  });
  const _metadata = dart.privateName(firebase_auth, "_metadata");
  const _userData = dart.privateName(firebase_auth, "_userData");
  const _app$ = dart.privateName(firebase_auth, "_app");
  firebase_auth.UserInfo = class UserInfo extends core.Object {
    get providerId() {
      return this[_data$].providerId;
    }
    get uid() {
      return this[_data$].uid;
    }
    get displayName() {
      return this[_data$].displayName;
    }
    get photoUrl() {
      return this[_data$].photoUrl;
    }
    get email() {
      return this[_data$].email;
    }
    get phoneNumber() {
      return this[_data$].phoneNumber;
    }
    toString() {
      return dart.str(this[$runtimeType]) + "(" + dart.str(this[_data$]) + ")";
    }
  };
  (firebase_auth.UserInfo.__ = function(_data, _app) {
    this[_data$] = _data;
    this[_app$] = _app;
    ;
  }).prototype = firebase_auth.UserInfo.prototype;
  dart.addTypeTests(firebase_auth.UserInfo);
  dart.setGetterSignature(firebase_auth.UserInfo, () => ({
    __proto__: dart.getGetters(firebase_auth.UserInfo.__proto__),
    providerId: core.String,
    uid: core.String,
    displayName: core.String,
    photoUrl: core.String,
    email: core.String,
    phoneNumber: core.String
  }));
  dart.setLibraryUri(firebase_auth.UserInfo, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.UserInfo, () => ({
    __proto__: dart.getFields(firebase_auth.UserInfo.__proto__),
    [_app$]: dart.finalFieldType(firebase_app.FirebaseApp),
    [_data$]: dart.finalFieldType(firebase_auth_platform_interface.PlatformUserInfo)
  }));
  dart.defineExtensionMethods(firebase_auth.UserInfo, ['toString']);
  const providerData = dart.privateName(firebase_auth, "FirebaseUser.providerData");
  firebase_auth.FirebaseUser = class FirebaseUser extends firebase_auth.UserInfo {
    get providerData() {
      return this[providerData];
    }
    set providerData(value) {
      super.providerData = value;
    }
    get metadata() {
      return this[_metadata];
    }
    get isAnonymous() {
      return this[_userData].isAnonymous;
    }
    get isEmailVerified() {
      return this[_userData].isEmailVerified;
    }
    getIdToken(opts) {
      let refresh = opts && 'refresh' in opts ? opts.refresh : false;
      return async.async(firebase_auth.IdTokenResult, (function* getIdToken() {
        let result = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.getIdToken(this[_app$].name, refresh));
        return new firebase_auth.IdTokenResult.__(result);
      }).bind(this));
    }
    linkWithCredential(credential) {
      return async.async(firebase_auth.AuthResult, (function* linkWithCredential() {
        if (!(credential != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_user.dart", 63, 12, "credential != null");
        let platformResult = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.linkWithCredential(this[_app$].name, credential));
        let result = new firebase_auth.AuthResult.__(platformResult, this[_app$]);
        return result;
      }).bind(this));
    }
    sendEmailVerification() {
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.sendEmailVerification(this[_app$].name);
    }
    reload() {
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.reload(this[_app$].name);
    }
    delete() {
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.delete(this[_app$].name);
    }
    updateEmail(email) {
      if (!(email != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_user.dart", 112, 12, "email != null");
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.updateEmail(this[_app$].name, email);
    }
    updatePhoneNumberCredential(credential) {
      if (!(credential != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_user.dart", 126, 12, "credential != null");
      if (!firebase_auth_platform_interface.PhoneAuthCredential.is(credential)) {
        dart.throw(new core.ArgumentError.value(credential, "Credential must be a phone credential, " + "i.e. made with PhoneAuthProvider.getCredential()"));
      }
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.updatePhoneNumberCredential(this[_app$].name, firebase_auth_platform_interface.PhoneAuthCredential._check(credential));
    }
    updatePassword(password) {
      if (!(password != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_user.dart", 154, 12, "password != null");
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.updatePassword(this[_app$].name, password);
    }
    updateProfile(userUpdateInfo) {
      if (!(userUpdateInfo != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_user.dart", 165, 12, "userUpdateInfo != null");
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.updateProfile(this[_app$].name, {displayName: userUpdateInfo.displayName, photoUrl: userUpdateInfo.photoUrl});
    }
    reauthenticateWithCredential(credential) {
      return async.async(firebase_auth.AuthResult, (function* reauthenticateWithCredential() {
        if (!(credential != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_user.dart", 193, 12, "credential != null");
        let result = (yield firebase_auth_platform_interface.FirebaseAuthPlatform.instance.reauthenticateWithCredential(this[_app$].name, credential));
        return new firebase_auth.AuthResult.__(result, this[_app$]);
      }).bind(this));
    }
    unlinkFromProvider(provider) {
      if (!(provider != null)) dart.assertFailed(null, "org-dartlang-app:///packages/firebase_auth/src/firebase_user.dart", 214, 12, "provider != null");
      return firebase_auth_platform_interface.FirebaseAuthPlatform.instance.unlinkFromProvider(this[_app$].name, provider);
    }
    toString() {
      return dart.str(this[$runtimeType]) + "(" + dart.str(this[_data$]) + ")";
    }
  };
  (firebase_auth.FirebaseUser.__ = function(data, app) {
    this[providerData] = data.providerData[$map](firebase_auth.UserInfo, dart.fn(item => new firebase_auth.UserInfo.__(item, app), PlatformUserInfoToUserInfo()))[$toList]();
    this[_metadata] = new firebase_auth.FirebaseUserMetadata.__(data);
    this[_userData] = data;
    firebase_auth.FirebaseUser.__proto__.__.call(this, data, app);
    ;
  }).prototype = firebase_auth.FirebaseUser.prototype;
  dart.addTypeTests(firebase_auth.FirebaseUser);
  dart.setMethodSignature(firebase_auth.FirebaseUser, () => ({
    __proto__: dart.getMethods(firebase_auth.FirebaseUser.__proto__),
    getIdToken: dart.fnType(async.Future$(firebase_auth.IdTokenResult), [], {refresh: core.bool}, {}),
    linkWithCredential: dart.fnType(async.Future$(firebase_auth.AuthResult), [firebase_auth_platform_interface.AuthCredential]),
    sendEmailVerification: dart.fnType(async.Future$(dart.void), []),
    reload: dart.fnType(async.Future$(dart.void), []),
    delete: dart.fnType(async.Future$(dart.void), []),
    updateEmail: dart.fnType(async.Future$(dart.void), [core.String]),
    updatePhoneNumberCredential: dart.fnType(async.Future$(dart.void), [firebase_auth_platform_interface.AuthCredential]),
    updatePassword: dart.fnType(async.Future$(dart.void), [core.String]),
    updateProfile: dart.fnType(async.Future$(dart.void), [firebase_auth.UserUpdateInfo]),
    reauthenticateWithCredential: dart.fnType(async.Future$(firebase_auth.AuthResult), [firebase_auth_platform_interface.AuthCredential]),
    unlinkFromProvider: dart.fnType(async.Future$(dart.void), [core.String])
  }));
  dart.setGetterSignature(firebase_auth.FirebaseUser, () => ({
    __proto__: dart.getGetters(firebase_auth.FirebaseUser.__proto__),
    metadata: firebase_auth.FirebaseUserMetadata,
    isAnonymous: core.bool,
    isEmailVerified: core.bool
  }));
  dart.setLibraryUri(firebase_auth.FirebaseUser, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.FirebaseUser, () => ({
    __proto__: dart.getFields(firebase_auth.FirebaseUser.__proto__),
    [_userData]: dart.finalFieldType(firebase_auth_platform_interface.PlatformUser),
    providerData: dart.finalFieldType(core.List$(firebase_auth.UserInfo)),
    [_metadata]: dart.finalFieldType(firebase_auth.FirebaseUserMetadata)
  }));
  dart.defineExtensionMethods(firebase_auth.FirebaseUser, ['toString']);
  firebase_auth.IdTokenResult = class IdTokenResult extends core.Object {
    get token() {
      return this[_data$].token;
    }
    get expirationTime() {
      return new core.DateTime.fromMillisecondsSinceEpoch(dart.notNull(this[_data$].expirationTimestamp) * 1000);
    }
    get authTime() {
      return new core.DateTime.fromMillisecondsSinceEpoch(dart.notNull(this[_data$].authTimestamp) * 1000);
    }
    get issuedAtTime() {
      return new core.DateTime.fromMillisecondsSinceEpoch(dart.notNull(this[_data$].issuedAtTimestamp) * 1000);
    }
    get signInProvider() {
      return this[_data$].signInProvider;
    }
    get claims() {
      return this[_data$].claims;
    }
    toString() {
      return dart.str(this[$runtimeType]) + "(" + dart.str(this[_data$]) + ")";
    }
  };
  (firebase_auth.IdTokenResult.__ = function(_data) {
    this[_data$] = _data;
    ;
  }).prototype = firebase_auth.IdTokenResult.prototype;
  dart.addTypeTests(firebase_auth.IdTokenResult);
  dart.setGetterSignature(firebase_auth.IdTokenResult, () => ({
    __proto__: dart.getGetters(firebase_auth.IdTokenResult.__proto__),
    token: core.String,
    expirationTime: core.DateTime,
    authTime: core.DateTime,
    issuedAtTime: core.DateTime,
    signInProvider: core.String,
    claims: core.Map
  }));
  dart.setLibraryUri(firebase_auth.IdTokenResult, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.IdTokenResult, () => ({
    __proto__: dart.getFields(firebase_auth.IdTokenResult.__proto__),
    [_data$]: dart.finalFieldType(firebase_auth_platform_interface.PlatformIdTokenResult)
  }));
  dart.defineExtensionMethods(firebase_auth.IdTokenResult, ['toString']);
  firebase_auth.FirebaseUserMetadata = class FirebaseUserMetadata extends core.Object {
    get creationTime() {
      return new core.DateTime.fromMillisecondsSinceEpoch(this[_data$].creationTimestamp);
    }
    get lastSignInTime() {
      return new core.DateTime.fromMillisecondsSinceEpoch(this[_data$].lastSignInTimestamp);
    }
  };
  (firebase_auth.FirebaseUserMetadata.__ = function(_data) {
    this[_data$] = _data;
    ;
  }).prototype = firebase_auth.FirebaseUserMetadata.prototype;
  dart.addTypeTests(firebase_auth.FirebaseUserMetadata);
  dart.setGetterSignature(firebase_auth.FirebaseUserMetadata, () => ({
    __proto__: dart.getGetters(firebase_auth.FirebaseUserMetadata.__proto__),
    creationTime: core.DateTime,
    lastSignInTime: core.DateTime
  }));
  dart.setLibraryUri(firebase_auth.FirebaseUserMetadata, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.FirebaseUserMetadata, () => ({
    __proto__: dart.getFields(firebase_auth.FirebaseUserMetadata.__proto__),
    [_data$]: dart.finalFieldType(firebase_auth_platform_interface.PlatformUser)
  }));
  const _updateData = dart.privateName(firebase_auth, "_updateData");
  firebase_auth.UserUpdateInfo = class UserUpdateInfo extends core.Object {
    set displayName(displayName) {
      let t2, t1, t0;
      t0 = this[_updateData];
      t1 = "displayName";
      t2 = displayName;
      t0[$_set](t1, t2);
      return t2;
    }
    get displayName() {
      return this[_updateData][$_get]("displayName");
    }
    set photoUrl(photoUri) {
      let t2, t1, t0;
      t0 = this[_updateData];
      t1 = "photoUrl";
      t2 = photoUri;
      t0[$_set](t1, t2);
      return t2;
    }
    get photoUrl() {
      return this[_updateData][$_get]("photoUrl");
    }
  };
  (firebase_auth.UserUpdateInfo.new = function() {
    this[_updateData] = new (IdentityMapOfString$String()).new();
    ;
  }).prototype = firebase_auth.UserUpdateInfo.prototype;
  dart.addTypeTests(firebase_auth.UserUpdateInfo);
  dart.setGetterSignature(firebase_auth.UserUpdateInfo, () => ({
    __proto__: dart.getGetters(firebase_auth.UserUpdateInfo.__proto__),
    displayName: core.String,
    photoUrl: core.String
  }));
  dart.setSetterSignature(firebase_auth.UserUpdateInfo, () => ({
    __proto__: dart.getSetters(firebase_auth.UserUpdateInfo.__proto__),
    displayName: core.String,
    photoUrl: core.String
  }));
  dart.setLibraryUri(firebase_auth.UserUpdateInfo, "package:firebase_auth/firebase_auth.dart");
  dart.setFieldSignature(firebase_auth.UserUpdateInfo, () => ({
    __proto__: dart.getFields(firebase_auth.UserUpdateInfo.__proto__),
    [_updateData]: dart.finalFieldType(core.Map$(core.String, core.String))
  }));
  dart.trackLibraries("packages/firebase_auth/firebase_auth", {
    "package:firebase_auth/firebase_auth.dart": firebase_auth
  }, {
    "package:firebase_auth/firebase_auth.dart": ["src/auth_provider/email_auth_provider.dart", "src/auth_provider/facebook_auth_provider.dart", "src/auth_provider/github_auth_provider.dart", "src/auth_provider/google_auth_provider.dart", "src/auth_provider/phone_auth_provider.dart", "src/auth_provider/twitter_auth_provider.dart", "src/auth_provider/oauth_auth_provider.dart", "src/additional_user_info.dart", "src/auth_result.dart", "src/firebase_auth.dart", "src/firebase_user.dart", "src/id_token_result.dart", "src/user_info.dart", "src/user_metadata.dart", "src/user_update_info.dart"]
  }, '{"version":3,"sourceRoot":"","sources":["src/auth_provider/email_auth_provider.dart","src/auth_provider/facebook_auth_provider.dart","src/auth_provider/github_auth_provider.dart","src/auth_provider/google_auth_provider.dart","src/auth_provider/phone_auth_provider.dart","src/auth_provider/twitter_auth_provider.dart","src/auth_provider/oauth_auth_provider.dart","src/additional_user_info.dart","src/auth_result.dart","src/firebase_auth.dart","src/user_info.dart","src/firebase_user.dart","src/id_token_result.dart","src/user_metadata.dart","src/user_update_info.dart"],"names":[],"mappings":"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","file":"firebase_auth.ddc.js"}');
  // Exports:
  return {
    firebase_auth: firebase_auth
  };
});

//# sourceMappingURL=firebase_auth.ddc.js.map
