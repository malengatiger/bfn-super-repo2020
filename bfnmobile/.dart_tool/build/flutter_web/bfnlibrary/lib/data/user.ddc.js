define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const user = Object.create(dart.library);
  const $_get = dartx._get;
  const $_set = dartx._set;
  let LinkedMapOfString$dynamic = () => (LinkedMapOfString$dynamic = dart.constFn(_js_helper.LinkedMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  const name$ = dart.privateName(user, "UserDTO.name");
  const email$ = dart.privateName(user, "UserDTO.email");
  const password$ = dart.privateName(user, "UserDTO.password");
  const uid$ = dart.privateName(user, "UserDTO.uid");
  const cellphone$ = dart.privateName(user, "UserDTO.cellphone");
  user.UserDTO = class UserDTO extends core.Object {
    get name() {
      return this[name$];
    }
    set name(value) {
      this[name$] = value;
    }
    get email() {
      return this[email$];
    }
    set email(value) {
      this[email$] = value;
    }
    get password() {
      return this[password$];
    }
    set password(value) {
      this[password$] = value;
    }
    get uid() {
      return this[uid$];
    }
    set uid(value) {
      this[uid$] = value;
    }
    get cellphone() {
      return this[cellphone$];
    }
    set cellphone(value) {
      this[cellphone$] = value;
    }
    toJson() {
      let data = new (LinkedMapOfString$dynamic()).new();
      data[$_set]("name", this.name);
      data[$_set]("email", this.email);
      data[$_set]("cellphone", this.cellphone);
      data[$_set]("password", this.password);
      data[$_set]("uid", this.uid);
      return data;
    }
  };
  (user.UserDTO.new = function(name, email, password, cellphone, uid) {
    this[name$] = name;
    this[email$] = email;
    this[password$] = password;
    this[cellphone$] = cellphone;
    this[uid$] = uid;
    ;
  }).prototype = user.UserDTO.prototype;
  (user.UserDTO.fromJson = function(json) {
    this[uid$] = null;
    this[cellphone$] = null;
    this[password$] = null;
    this[email$] = null;
    this[name$] = null;
    this.name = core.String._check(json[$_get]("name"));
    this.uid = core.String._check(json[$_get]("uid"));
    this.email = core.String._check(json[$_get]("email"));
    this.cellphone = core.String._check(json[$_get]("cellphone"));
    this.password = core.String._check(json[$_get]("password"));
  }).prototype = user.UserDTO.prototype;
  dart.addTypeTests(user.UserDTO);
  dart.setMethodSignature(user.UserDTO, () => ({
    __proto__: dart.getMethods(user.UserDTO.__proto__),
    toJson: dart.fnType(core.Map$(core.String, dart.dynamic), [])
  }));
  dart.setLibraryUri(user.UserDTO, "package:bfnlibrary/data/user.dart");
  dart.setFieldSignature(user.UserDTO, () => ({
    __proto__: dart.getFields(user.UserDTO.__proto__),
    name: dart.fieldType(core.String),
    email: dart.fieldType(core.String),
    password: dart.fieldType(core.String),
    uid: dart.fieldType(core.String),
    cellphone: dart.fieldType(core.String)
  }));
  dart.trackLibraries("packages/bfnlibrary/data/user", {
    "package:bfnlibrary/data/user.dart": user
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["user.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;IACS;;;;;;IACA;;;;;;IACA;;;;;;IAAU;;;;;;IACV;;;;;;;AAasB,iBAAW;AACd,MAAxB,AAAI,IAAA,QAAC,QAAe;AACM,MAA1B,AAAI,IAAA,QAAC,SAAgB;AACa,MAAlC,AAAI,IAAA,QAAC,aAAoB;AACO,MAAhC,AAAI,IAAA,QAAC,YAAmB;AACF,MAAtB,AAAI,IAAA,QAAC,OAAc;AAEnB,YAAO,KAAI;IACb;;+BAnBa,MAAW,OAAY,UAAe,WAAgB;IAAtD;IAAW;IAAY;IAAe;IAAgB;;EAAI;oCAEjC;;;;;;AACjB,gBAAnB,mBAAO,AAAI,IAAA,QAAC;AACK,eAAjB,mBAAM,AAAI,IAAA,QAAC;AACU,iBAArB,mBAAQ,AAAI,IAAA,QAAC;AACgB,qBAA7B,mBAAY,AAAI,IAAA,QAAC;AACU,oBAA3B,mBAAW,AAAI,IAAA,QAAC;EAClB","file":"user.ddc.js"}');
  // Exports:
  return {
    data__user: user
  };
});

//# sourceMappingURL=user.ddc.js.map
