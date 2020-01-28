define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/flutter/src/gestures/arena', 'packages/flutter/src/foundation/_bitfield_web'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__flutter__src__gestures__arena, packages__flutter__src__foundation___bitfield_web) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const io = dart_sdk.io;
  const async = dart_sdk.async;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const binding = packages__flutter__src__widgets__actions.src__widgets__binding;
  const asset_bundle = packages__flutter__src__gestures__arena.src__services__asset_bundle;
  const assertions = packages__flutter__src__foundation___bitfield_web.src__foundation__assertions;
  const flutter_dotenv = Object.create(dart.library);
  const parser = Object.create(dart.library);
  const dotenv = Object.create(dart.library);
  const $isEmpty = dartx.isEmpty;
  const $single = dartx.single;
  const $keys = dartx.keys;
  const $values = dartx.values;
  const $putIfAbsent = dartx.putIfAbsent;
  const $indexOf = dartx.indexOf;
  const $substring = dartx.substring;
  const $trim = dartx.trim;
  const $replaceFirstMapped = dartx.replaceFirstMapped;
  const $replaceAll = dartx.replaceAll;
  const $isNotEmpty = dartx.isNotEmpty;
  const $contains = dartx.contains;
  const $_get = dartx._get;
  const $every = dartx.every;
  const $addAll = dartx.addAll;
  const $split = dartx.split;
  let IdentityMapOfString$String = () => (IdentityMapOfString$String = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  let VoidToString = () => (VoidToString = dart.constFn(dart.fnType(core.String, [])))();
  let MatchToString = () => (MatchToString = dart.constFn(dart.fnType(core.String, [core.Match])))();
  let StringTobool = () => (StringTobool = dart.constFn(dart.fnType(core.bool, [core.String])))();
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  let ListOfString = () => (ListOfString = dart.constFn(core.List$(core.String)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.constMap(core.String, core.String, []);
    },
    get C1() {
      return C1 = dart.const({
        __proto__: parser.Parser.prototype
      });
    }
  });
  let C0;
  const _isValid = dart.privateName(parser, "_isValid");
  parser.Parser = class Parser extends core.Object {
    parse(lines) {
      let out = new (IdentityMapOfString$String()).new();
      for (let line of lines) {
        let kv = this.parseOne(line, {env: out});
        if (dart.test(kv[$isEmpty])) continue;
        out[$putIfAbsent](kv[$keys][$single], dart.fn(() => kv[$values][$single], VoidToString()));
      }
      return out;
    }
    parseOne(line, opts) {
      let env = opts && 'env' in opts ? opts.env : C0 || CT.C0;
      let stripped = this.strip(line);
      if (!dart.test(this[_isValid](stripped))) return new (IdentityMapOfString$String()).new();
      let idx = stripped[$indexOf]("=");
      let lhs = stripped[$substring](0, idx);
      let k = this.swallow(lhs);
      if (k[$isEmpty]) return new (IdentityMapOfString$String()).new();
      let rhs = stripped[$substring](idx + 1, stripped.length)[$trim]();
      let v = this.unquote(rhs);
      return new (IdentityMapOfString$String()).from([k, v]);
    }
    surroundingQuote(val) {
      if (!dart.test(parser.Parser._surroundQuotes.hasMatch(val))) return "";
      return parser.Parser._surroundQuotes.firstMatch(val).group(1);
    }
    unquote(val) {
      return val[$replaceFirstMapped](parser.Parser._surroundQuotes, dart.fn(m => m._get(2), MatchToString()))[$trim]();
    }
    strip(line) {
      return line[$replaceAll](parser.Parser._comment, "")[$trim]();
    }
    swallow(line) {
      return line[$replaceAll]("export", "")[$trim]();
    }
    [_isValid](s) {
      return s[$isNotEmpty] && s[$contains]("=");
    }
  };
  (parser.Parser.new = function() {
    ;
  }).prototype = parser.Parser.prototype;
  dart.addTypeTests(parser.Parser);
  dart.setMethodSignature(parser.Parser, () => ({
    __proto__: dart.getMethods(parser.Parser.__proto__),
    parse: dart.fnType(core.Map$(core.String, core.String), [core.Iterable$(core.String)]),
    parseOne: dart.fnType(core.Map$(core.String, core.String), [core.String], {env: core.Map$(core.String, core.String)}, {}),
    surroundingQuote: dart.fnType(core.String, [core.String]),
    unquote: dart.fnType(core.String, [core.String]),
    strip: dart.fnType(core.String, [core.String]),
    swallow: dart.fnType(core.String, [core.String]),
    [_isValid]: dart.fnType(core.bool, [core.String])
  }));
  dart.setLibraryUri(parser.Parser, "package:flutter_dotenv/src/parser.dart");
  dart.defineLazy(parser.Parser, {
    /*parser.Parser._keyword*/get _keyword() {
      return "export";
    },
    /*parser.Parser._comment*/get _comment() {
      return core.RegExp.new("#.*(?:[^'\"])$");
    },
    /*parser.Parser._surroundQuotes*/get _surroundQuotes() {
      return core.RegExp.new("^(['\"])(.*)\\1$");
    }
  });
  const _env = dart.privateName(dotenv, "_env");
  let C1;
  const _verify = dart.privateName(dotenv, "_verify");
  dotenv.DotEnv = class DotEnv extends core.Object {
    get env() {
      if (dart.test(this[_env][$isEmpty])) {
        io.stderr.writeln("[flutter_dotenv] No env values found. Make sure you have called DotEnv.load()");
      }
      return this[_env];
    }
    set env(env) {
      this[_env] = env;
    }
    isEveryDefined(vars) {
      return vars[$every](dart.fn(k => this.env[$_get](k) != null && this.env[$_get](k)[$isNotEmpty], StringTobool()));
    }
    load(filename = ".env", psr = C1 || CT.C1) {
      return async.async(dart.dynamic, (function* load() {
        let lines = (yield this[_verify](filename));
        this[_env][$addAll](psr.parse(lines));
      }).bind(this));
    }
    [_verify](filename) {
      return async.async(ListOfString(), function* _verify() {
        try {
          binding.WidgetsFlutterBinding.ensureInitialized();
          let str = (yield asset_bundle.rootBundle.loadString(filename));
          if (str[$isNotEmpty]) return str[$split]("\n");
          io.stderr.writeln("[flutter_dotenv] Load failed: file " + dart.str(filename) + " was empty");
        } catch (e) {
          let ex = dart.getThrown(e);
          if (assertions.FlutterError.is(ex)) {
            io.stderr.writeln("[flutter_dotenv] Load failed: file not found");
          } else
            throw e;
        }
        return JSArrayOfString().of([]);
      });
    }
    static new(opts) {
      let env = opts && 'env' in opts ? opts.env : null;
      if (dotenv.DotEnv._singleton == null) {
        dotenv.DotEnv._singleton = new dotenv.DotEnv._internal({env: env});
      }
      return dotenv.DotEnv._singleton;
    }
  };
  (dotenv.DotEnv._internal = function(opts) {
    let t0;
    let env = opts && 'env' in opts ? opts.env : null;
    this[_env] = new (IdentityMapOfString$String()).new();
    this[_env] = (t0 = env, t0 == null ? new (IdentityMapOfString$String()).new() : t0);
    ;
  }).prototype = dotenv.DotEnv.prototype;
  dart.addTypeTests(dotenv.DotEnv);
  dart.setMethodSignature(dotenv.DotEnv, () => ({
    __proto__: dart.getMethods(dotenv.DotEnv.__proto__),
    isEveryDefined: dart.fnType(core.bool, [core.Iterable$(core.String)]),
    load: dart.fnType(async.Future, [], [core.String, parser.Parser]),
    [_verify]: dart.fnType(async.Future$(core.List$(core.String)), [core.String])
  }));
  dart.setGetterSignature(dotenv.DotEnv, () => ({
    __proto__: dart.getGetters(dotenv.DotEnv.__proto__),
    env: core.Map$(core.String, core.String)
  }));
  dart.setSetterSignature(dotenv.DotEnv, () => ({
    __proto__: dart.getSetters(dotenv.DotEnv.__proto__),
    env: core.Map$(core.String, core.String)
  }));
  dart.setLibraryUri(dotenv.DotEnv, "package:flutter_dotenv/src/dotenv.dart");
  dart.setFieldSignature(dotenv.DotEnv, () => ({
    __proto__: dart.getFields(dotenv.DotEnv.__proto__),
    [_env]: dart.fieldType(core.Map$(core.String, core.String))
  }));
  dart.defineLazy(dotenv.DotEnv, {
    /*dotenv.DotEnv._singleton*/get _singleton() {
      return null;
    },
    set _singleton(_) {}
  });
  dart.trackLibraries("packages/flutter_dotenv/flutter_dotenv", {
    "package:flutter_dotenv/flutter_dotenv.dart": flutter_dotenv,
    "package:flutter_dotenv/src/parser.dart": parser,
    "package:flutter_dotenv/src/dotenv.dart": dotenv
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["src/parser.dart","src/dotenv.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;UAe6C;AACrC,gBAAsB;AAC1B,eAAS,OAAQ,MAAK;AAChB,iBAAK,cAAS,IAAI,QAAO,GAAG;AAChC,sBAAI,AAAG,EAAD,aAAU;AACuC,QAAvD,AAAI,GAAD,eAAa,AAAG,AAAK,EAAN,kBAAc,cAAM,AAAG,AAAO,EAAR;;AAE1C,YAAO,IAAG;IACZ;aAIoC;UACX;AACnB,qBAAW,WAAM,IAAI;AACzB,qBAAK,eAAS,QAAQ,IAAG,MAAO;AAE5B,gBAAM,AAAS,QAAD,WAAS;AACvB,gBAAM,AAAS,QAAD,aAAW,GAAG,GAAG;AAC/B,cAAI,aAAQ,GAAG;AACnB,UAAI,AAAE,CAAD,YAAU,MAAO;AAElB,gBAAM,AAAS,AAAoC,QAArC,aAAW,AAAI,GAAD,GAAG,GAAG,AAAS,QAAD;AAC1C,cAAI,aAAQ,GAAG;AAEnB,YAAO,0CAAC,CAAC,EAAE,CAAC;IACd;qBAK+B;AAC7B,qBAAK,AAAgB,uCAAS,GAAG,IAAG,MAAO;AAC3C,YAAO,AAAgB,AAAgB,0CAAL,GAAG,QAAQ;IAC/C;YAIsB;AAClB,YAAA,AAAI,AAAiD,IAAlD,sBAAoB,+BAAiB,QAAC,KAAM,AAAC,CAAA,MAAC;IAAU;UAI3C;AAAS,YAAA,AAAK,AAAyB,KAA1B,cAAY,wBAAU;IAAU;YAI3C;AAAS,YAAA,AAAK,AAAyB,KAA1B,wBAAsB;IAAU;eAE9C;AAAM,YAAA,AAAE,AAAW,EAAZ,iBAAe,AAAE,CAAD,YAAU;IAAI;;;;EArD5C;;;;;;;;;;;;;;MAND,sBAAQ;;;MAER,sBAAQ;YAAG,iBAAO;;MAClB,6BAAe;YAAG,iBAAO;;;;;;;;ACwCpC,oBAAI,AAAK;AAE6E,QADpF,AAAO,kBACH;;AAEN,YAAO;IACT;YAE4B;AAChB,MAAV,aAAO,GAAG;IACZ;mBAKqC;AACjC,YAAA,AAAK,KAAD,SAAO,QAAC,KAAM,AAAG,AAAY,gBAAX,CAAC,KAAK,QAAQ,AAAG,AAAI,gBAAH,CAAC;IAAa;SAItC,mBAA0B;AAAnC;AACL,qBAAQ,MAAM,cAAQ,QAAQ;AACL,QAA7B,AAAK,oBAAO,AAAI,GAAD,OAAO,KAAK;MAC7B;;cAEoC;AAAR;AAC1B;AAC2C,UAAnB;AAClB,qBAAM,MAAM,AAAW,mCAAW,QAAQ;AAC9C,cAAI,AAAI,GAAD,eAAa,MAAO,AAAI,IAAD,SAAO;AACmC,UAAxE,AAAO,kBAAQ,AAAwD,iDAAnB,QAAQ;;;AAC5D;AAC8D,YAA9D,AAAO,kBAAQ;;;;AAEjB,cAAO;MACT;;;UAEoC;AAClC,UAAI,AAAW,4BAAG;AACuB,QAAvC,2BAAoB,kCAAe,GAAG;;AAExC,YAAO;IACT;;;;QAEsC;IA/ClB,aAAuB;IAgDhC,cAAM,KAAJ,GAAG,QAAH,OAAuB;;EAAE;;;;;;;;;;;;;;;;;;;;;;MA/CxB,wBAAU","file":"flutter_dotenv.ddc.js"}');
  // Exports:
  return {
    flutter_dotenv: flutter_dotenv,
    src__parser: parser,
    src__dotenv: dotenv
  };
});

//# sourceMappingURL=flutter_dotenv.ddc.js.map
