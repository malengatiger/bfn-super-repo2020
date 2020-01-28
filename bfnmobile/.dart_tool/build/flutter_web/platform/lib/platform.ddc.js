define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const collection = dart_sdk.collection;
  const convert = dart_sdk.convert;
  const _js_helper = dart_sdk._js_helper;
  const io = dart_sdk.io;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const platform = Object.create(dart.library);
  const fake_platform = Object.create(dart.library);
  const platform$ = Object.create(dart.library);
  const local_platform = Object.create(dart.library);
  const $_get = dartx._get;
  let LinkedHashMapOfString$String = () => (LinkedHashMapOfString$String = dart.constFn(collection.LinkedHashMap$(core.String, core.String)))();
  let ListOfString = () => (ListOfString = dart.constFn(core.List$(core.String)))();
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
  let MapOfString$String = () => (MapOfString$String = dart.constFn(core.Map$(core.String, core.String)))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.const({
        __proto__: convert.JsonEncoder.prototype,
        [JsonEncoder__toEncodable]: null,
        [JsonEncoder_indent]: "  "
      });
    }
  });
  const JsonEncoder__toEncodable = dart.privateName(convert, "JsonEncoder._toEncodable");
  const JsonEncoder_indent = dart.privateName(convert, "JsonEncoder.indent");
  let C0;
  platform$.Platform = class Platform extends core.Object {
    get isLinux() {
      return this.operatingSystem === "linux";
    }
    get isMacOS() {
      return this.operatingSystem === "macos";
    }
    get isWindows() {
      return this.operatingSystem === "windows";
    }
    get isAndroid() {
      return this.operatingSystem === "android";
    }
    get isIOS() {
      return this.operatingSystem === "ios";
    }
    get isFuchsia() {
      return this.operatingSystem === "fuchsia";
    }
    toJson() {
      return (C0 || CT.C0).convert(new (IdentityMapOfString$dynamic()).from(["numberOfProcessors", this.numberOfProcessors, "pathSeparator", this.pathSeparator, "operatingSystem", this.operatingSystem, "operatingSystemVersion", this.operatingSystemVersion, "localHostname", this.localHostname, "environment", this.environment, "executable", this.executable, "resolvedExecutable", this.resolvedExecutable, "script", dart.toString(this.script), "executableArguments", this.executableArguments, "packageRoot", this.packageRoot, "packageConfig", this.packageConfig, "version", this.version, "stdinSupportsAnsi", this.stdinSupportsAnsi, "stdoutSupportsAnsi", this.stdoutSupportsAnsi, "localeName", this.localeName]));
    }
  };
  (platform$.Platform.new = function() {
    ;
  }).prototype = platform$.Platform.prototype;
  dart.addTypeTests(platform$.Platform);
  dart.setMethodSignature(platform$.Platform, () => ({
    __proto__: dart.getMethods(platform$.Platform.__proto__),
    toJson: dart.fnType(core.String, [])
  }));
  dart.setGetterSignature(platform$.Platform, () => ({
    __proto__: dart.getGetters(platform$.Platform.__proto__),
    isLinux: core.bool,
    isMacOS: core.bool,
    isWindows: core.bool,
    isAndroid: core.bool,
    isIOS: core.bool,
    isFuchsia: core.bool
  }));
  dart.setLibraryUri(platform$.Platform, "package:platform/src/interface/platform.dart");
  const numberOfProcessors$ = dart.privateName(fake_platform, "FakePlatform.numberOfProcessors");
  const pathSeparator$ = dart.privateName(fake_platform, "FakePlatform.pathSeparator");
  const operatingSystem$ = dart.privateName(fake_platform, "FakePlatform.operatingSystem");
  const operatingSystemVersion$ = dart.privateName(fake_platform, "FakePlatform.operatingSystemVersion");
  const localHostname$ = dart.privateName(fake_platform, "FakePlatform.localHostname");
  const environment$ = dart.privateName(fake_platform, "FakePlatform.environment");
  const executable$ = dart.privateName(fake_platform, "FakePlatform.executable");
  const resolvedExecutable$ = dart.privateName(fake_platform, "FakePlatform.resolvedExecutable");
  const script$ = dart.privateName(fake_platform, "FakePlatform.script");
  const executableArguments$ = dart.privateName(fake_platform, "FakePlatform.executableArguments");
  const packageRoot$ = dart.privateName(fake_platform, "FakePlatform.packageRoot");
  const packageConfig$ = dart.privateName(fake_platform, "FakePlatform.packageConfig");
  const version$ = dart.privateName(fake_platform, "FakePlatform.version");
  const stdinSupportsAnsi$ = dart.privateName(fake_platform, "FakePlatform.stdinSupportsAnsi");
  const stdoutSupportsAnsi$ = dart.privateName(fake_platform, "FakePlatform.stdoutSupportsAnsi");
  const localeName$ = dart.privateName(fake_platform, "FakePlatform.localeName");
  fake_platform.FakePlatform = class FakePlatform extends platform$.Platform {
    get numberOfProcessors() {
      return this[numberOfProcessors$];
    }
    set numberOfProcessors(value) {
      this[numberOfProcessors$] = value;
    }
    get pathSeparator() {
      return this[pathSeparator$];
    }
    set pathSeparator(value) {
      this[pathSeparator$] = value;
    }
    get operatingSystem() {
      return this[operatingSystem$];
    }
    set operatingSystem(value) {
      this[operatingSystem$] = value;
    }
    get operatingSystemVersion() {
      return this[operatingSystemVersion$];
    }
    set operatingSystemVersion(value) {
      this[operatingSystemVersion$] = value;
    }
    get localHostname() {
      return this[localHostname$];
    }
    set localHostname(value) {
      this[localHostname$] = value;
    }
    get environment() {
      return this[environment$];
    }
    set environment(value) {
      this[environment$] = value;
    }
    get executable() {
      return this[executable$];
    }
    set executable(value) {
      this[executable$] = value;
    }
    get resolvedExecutable() {
      return this[resolvedExecutable$];
    }
    set resolvedExecutable(value) {
      this[resolvedExecutable$] = value;
    }
    get script() {
      return this[script$];
    }
    set script(value) {
      this[script$] = value;
    }
    get executableArguments() {
      return this[executableArguments$];
    }
    set executableArguments(value) {
      this[executableArguments$] = value;
    }
    get packageRoot() {
      return this[packageRoot$];
    }
    set packageRoot(value) {
      this[packageRoot$] = value;
    }
    get packageConfig() {
      return this[packageConfig$];
    }
    set packageConfig(value) {
      this[packageConfig$] = value;
    }
    get version() {
      return this[version$];
    }
    set version(value) {
      this[version$] = value;
    }
    get stdinSupportsAnsi() {
      return this[stdinSupportsAnsi$];
    }
    set stdinSupportsAnsi(value) {
      this[stdinSupportsAnsi$] = value;
    }
    get stdoutSupportsAnsi() {
      return this[stdoutSupportsAnsi$];
    }
    set stdoutSupportsAnsi(value) {
      this[stdoutSupportsAnsi$] = value;
    }
    get localeName() {
      return this[localeName$];
    }
    set localeName(value) {
      this[localeName$] = value;
    }
    static fromJson(json) {
      let map = MapOfString$dynamic()._check(new convert.JsonDecoder.new().convert(json));
      return new fake_platform.FakePlatform.new({numberOfProcessors: core.int._check(map[$_get]("numberOfProcessors")), pathSeparator: core.String._check(map[$_get]("pathSeparator")), operatingSystem: core.String._check(map[$_get]("operatingSystem")), operatingSystemVersion: core.String._check(map[$_get]("operatingSystemVersion")), localHostname: core.String._check(map[$_get]("localHostname")), environment: MapOfString$String()._check(dart.dgsend(map[$_get]("environment"), [core.String, core.String], 'cast', [])), executable: core.String._check(map[$_get]("executable")), resolvedExecutable: core.String._check(map[$_get]("resolvedExecutable")), script: core.Uri.parse(core.String._check(map[$_get]("script"))), executableArguments: ListOfString()._check(dart.dgsend(map[$_get]("executableArguments"), [core.String], 'cast', [])), packageRoot: core.String._check(map[$_get]("packageRoot")), packageConfig: core.String._check(map[$_get]("packageConfig")), version: core.String._check(map[$_get]("version")), stdinSupportsAnsi: core.bool._check(map[$_get]("stdinSupportsAnsi")), stdoutSupportsAnsi: core.bool._check(map[$_get]("stdoutSupportsAnsi")), localeName: core.String._check(map[$_get]("localeName"))});
    }
  };
  (fake_platform.FakePlatform.new = function(opts) {
    let numberOfProcessors = opts && 'numberOfProcessors' in opts ? opts.numberOfProcessors : null;
    let pathSeparator = opts && 'pathSeparator' in opts ? opts.pathSeparator : null;
    let operatingSystem = opts && 'operatingSystem' in opts ? opts.operatingSystem : null;
    let operatingSystemVersion = opts && 'operatingSystemVersion' in opts ? opts.operatingSystemVersion : null;
    let localHostname = opts && 'localHostname' in opts ? opts.localHostname : null;
    let environment = opts && 'environment' in opts ? opts.environment : null;
    let executable = opts && 'executable' in opts ? opts.executable : null;
    let resolvedExecutable = opts && 'resolvedExecutable' in opts ? opts.resolvedExecutable : null;
    let script = opts && 'script' in opts ? opts.script : null;
    let executableArguments = opts && 'executableArguments' in opts ? opts.executableArguments : null;
    let packageRoot = opts && 'packageRoot' in opts ? opts.packageRoot : null;
    let packageConfig = opts && 'packageConfig' in opts ? opts.packageConfig : null;
    let version = opts && 'version' in opts ? opts.version : null;
    let stdinSupportsAnsi = opts && 'stdinSupportsAnsi' in opts ? opts.stdinSupportsAnsi : null;
    let stdoutSupportsAnsi = opts && 'stdoutSupportsAnsi' in opts ? opts.stdoutSupportsAnsi : null;
    let localeName = opts && 'localeName' in opts ? opts.localeName : null;
    this[numberOfProcessors$] = numberOfProcessors;
    this[pathSeparator$] = pathSeparator;
    this[operatingSystem$] = operatingSystem;
    this[operatingSystemVersion$] = operatingSystemVersion;
    this[localHostname$] = localHostname;
    this[environment$] = environment;
    this[executable$] = executable;
    this[resolvedExecutable$] = resolvedExecutable;
    this[script$] = script;
    this[executableArguments$] = executableArguments;
    this[packageRoot$] = packageRoot;
    this[packageConfig$] = packageConfig;
    this[version$] = version;
    this[stdinSupportsAnsi$] = stdinSupportsAnsi;
    this[stdoutSupportsAnsi$] = stdoutSupportsAnsi;
    this[localeName$] = localeName;
    fake_platform.FakePlatform.__proto__.new.call(this);
    ;
  }).prototype = fake_platform.FakePlatform.prototype;
  (fake_platform.FakePlatform.fromPlatform = function(platform) {
    this[numberOfProcessors$] = platform.numberOfProcessors;
    this[pathSeparator$] = platform.pathSeparator;
    this[operatingSystem$] = platform.operatingSystem;
    this[operatingSystemVersion$] = platform.operatingSystemVersion;
    this[localHostname$] = platform.localHostname;
    this[environment$] = LinkedHashMapOfString$String().from(platform.environment);
    this[executable$] = platform.executable;
    this[resolvedExecutable$] = platform.resolvedExecutable;
    this[script$] = platform.script;
    this[executableArguments$] = ListOfString().from(platform.executableArguments);
    this[packageRoot$] = platform.packageRoot;
    this[packageConfig$] = platform.packageConfig;
    this[version$] = platform.version;
    this[stdinSupportsAnsi$] = platform.stdinSupportsAnsi;
    this[stdoutSupportsAnsi$] = platform.stdoutSupportsAnsi;
    this[localeName$] = platform.localeName;
    fake_platform.FakePlatform.__proto__.new.call(this);
    ;
  }).prototype = fake_platform.FakePlatform.prototype;
  dart.addTypeTests(fake_platform.FakePlatform);
  dart.setLibraryUri(fake_platform.FakePlatform, "package:platform/src/testing/fake_platform.dart");
  dart.setFieldSignature(fake_platform.FakePlatform, () => ({
    __proto__: dart.getFields(fake_platform.FakePlatform.__proto__),
    numberOfProcessors: dart.fieldType(core.int),
    pathSeparator: dart.fieldType(core.String),
    operatingSystem: dart.fieldType(core.String),
    operatingSystemVersion: dart.fieldType(core.String),
    localHostname: dart.fieldType(core.String),
    environment: dart.fieldType(core.Map$(core.String, core.String)),
    executable: dart.fieldType(core.String),
    resolvedExecutable: dart.fieldType(core.String),
    script: dart.fieldType(core.Uri),
    executableArguments: dart.fieldType(core.List$(core.String)),
    packageRoot: dart.fieldType(core.String),
    packageConfig: dart.fieldType(core.String),
    version: dart.fieldType(core.String),
    stdinSupportsAnsi: dart.fieldType(core.bool),
    stdoutSupportsAnsi: dart.fieldType(core.bool),
    localeName: dart.fieldType(core.String)
  }));
  local_platform.LocalPlatform = class LocalPlatform extends platform$.Platform {
    get numberOfProcessors() {
      return io.Platform.numberOfProcessors;
    }
    get pathSeparator() {
      return io.Platform.pathSeparator;
    }
    get operatingSystem() {
      return io.Platform.operatingSystem;
    }
    get operatingSystemVersion() {
      return io.Platform.operatingSystemVersion;
    }
    get localHostname() {
      return io.Platform.localHostname;
    }
    get environment() {
      return io.Platform.environment;
    }
    get executable() {
      return io.Platform.executable;
    }
    get resolvedExecutable() {
      return io.Platform.resolvedExecutable;
    }
    get script() {
      return io.Platform.script;
    }
    get executableArguments() {
      return io.Platform.executableArguments;
    }
    get packageRoot() {
      return io.Platform.packageRoot;
    }
    get packageConfig() {
      return io.Platform.packageConfig;
    }
    get version() {
      return io.Platform.version;
    }
    get stdinSupportsAnsi() {
      return io.stdin.supportsAnsiEscapes;
    }
    get stdoutSupportsAnsi() {
      return io.stdout.supportsAnsiEscapes;
    }
    get localeName() {
      return io.Platform.localeName;
    }
  };
  (local_platform.LocalPlatform.new = function() {
    local_platform.LocalPlatform.__proto__.new.call(this);
    ;
  }).prototype = local_platform.LocalPlatform.prototype;
  dart.addTypeTests(local_platform.LocalPlatform);
  dart.setGetterSignature(local_platform.LocalPlatform, () => ({
    __proto__: dart.getGetters(local_platform.LocalPlatform.__proto__),
    numberOfProcessors: core.int,
    pathSeparator: core.String,
    operatingSystem: core.String,
    operatingSystemVersion: core.String,
    localHostname: core.String,
    environment: core.Map$(core.String, core.String),
    executable: core.String,
    resolvedExecutable: core.String,
    script: core.Uri,
    executableArguments: core.List$(core.String),
    packageRoot: core.String,
    packageConfig: core.String,
    version: core.String,
    stdinSupportsAnsi: core.bool,
    stdoutSupportsAnsi: core.bool,
    localeName: core.String
  }));
  dart.setLibraryUri(local_platform.LocalPlatform, "package:platform/src/interface/local_platform.dart");
  dart.trackLibraries("packages/platform/platform", {
    "package:platform/platform.dart": platform,
    "package:platform/src/testing/fake_platform.dart": fake_platform,
    "package:platform/src/interface/platform.dart": platform$,
    "package:platform/src/interface/local_platform.dart": local_platform
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["src/interface/platform.dart","src/testing/fake_platform.dart","src/interface/local_platform.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA+BsB,YAAC,AAAgB,0BAAG;IAAQ;;AAG5B,YAAC,AAAgB,0BAAG;IAAQ;;AAG1B,YAAC,AAAgB,0BAAG;IAAU;;AAG9B,YAAC,AAAgB,0BAAG;IAAU;;AAGlC,YAAC,AAAgB,0BAAG;IAAM;;AAGtB,YAAC,AAAgB,0BAAG;IAAU;;AAoFlD,YAA0C,uBAAyB,0CACjE,sBAAsB,yBACtB,iBAAiB,oBACjB,mBAAmB,sBACnB,0BAA0B,6BAC1B,iBAAiB,oBACjB,eAAe,kBACf,cAAc,iBACd,sBAAsB,yBACtB,UAAiB,cAAP,cACV,uBAAuB,0BACvB,eAAe,kBACf,iBAAiB,oBACjB,WAAW,cACX,qBAAqB,wBACrB,sBAAsB,yBACtB,cAAc;IAElB;;;;EAzIgB;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ICuEZ;;;;;;IAGG;;;;;;IAGA;;;;;;IAGA;;;;;;IAGA;;;;;;IAGa;;;;;;IAGb;;;;;;IAGA;;;;;;IAGH;;;;;;IAGS;;;;;;IAGN;;;;;;IAGA;;;;;;IAGA;;;;;;IAGF;;;;;;IAGA;;;;;;IAGE;;;;;;oBApE8B;AACd,6CAAU,AAAc,sCAAQ,IAAI;AACzD,YAAW,yEACW,AAAG,GAAA,QAAC,0DACT,AAAG,GAAA,QAAC,uDACF,AAAG,GAAA,QAAC,gEACG,AAAG,GAAA,QAAC,8DACb,AAAG,GAAA,QAAC,4DACa,YAAnB,AAAG,GAAA,QAAC,yFACL,AAAG,GAAA,QAAC,uDACI,AAAG,GAAA,QAAC,gCACZ,kCAAM,AAAG,GAAA,QAAC,wDAC0B,YAA3B,AAAG,GAAA,QAAC,qFACZ,AAAG,GAAA,QAAC,mDACF,AAAG,GAAA,QAAC,+CACV,AAAG,GAAA,QAAC,iDACM,AAAG,GAAA,QAAC,4DACH,AAAG,GAAA,QAAC,uDACZ,AAAG,GAAA,QAAC;IAEpB;;;QAhEO;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;IAfA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;IACA;AAhBP;;EAiBE;sDAIiC;IACV,4BAAE,AAAS,QAAD;IACf,uBAAE,AAAS,QAAD;IACR,yBAAE,AAAS,QAAD;IACH,gCAAE,AAAS,QAAD;IACnB,uBAAE,AAAS,QAAD;IACZ,qBAAM,oCAAyB,AAAS,QAAD;IACxC,oBAAE,AAAS,QAAD;IACF,4BAAE,AAAS,QAAD;IACtB,gBAAE,AAAS,QAAD;IACG,6BACZ,oBAAkB,AAAS,QAAD;IACtB,qBAAE,AAAS,QAAD;IACR,uBAAE,AAAS,QAAD;IAChB,iBAAE,AAAS,QAAD;IACA,2BAAE,AAAS,QAAD;IACT,4BAAE,AAAS,QAAD;IAClB,oBAAE,AAAS,QAAD;AAjB3B;;EAiBsC;;;;;;;;;;;;;;;;;;;;;;;;ACtCR,YAAY;IAAkB;;AAGhC,YAAY;IAAa;;AAGvB,YAAY;IAAe;;AAGpB,YAAY;IAAsB;;AAG3C,YAAY;IAAa;;AAGd,YAAY;IAAW;;AAGrC,YAAY;IAAU;;AAGd,YAAY;IAAkB;;AAG7C,YAAY;IAAM;;AAGI,YAAY;IAAmB;;AAG7C,YAAY;IAAW;;AAGrB,YAAY;IAAa;;AAG/B,YAAY;IAAO;;AAGX,YAAG,AAAM;IAAmB;;AAG3B,YAAG,AAAO;IAAmB;;AAGnC,YAAY;IAAU;;;AAhDzC;;EAAe","file":"platform.ddc.js"}');
  // Exports:
  return {
    platform: platform,
    src__testing__fake_platform: fake_platform,
    src__interface__platform: platform$,
    src__interface__local_platform: local_platform
  };
});

//# sourceMappingURL=platform.ddc.js.map
