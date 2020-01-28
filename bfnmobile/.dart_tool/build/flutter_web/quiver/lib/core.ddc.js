define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const _internal = dart_sdk._internal;
  const collection = dart_sdk.collection;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const core$ = Object.create(dart.library);
  const $iterator = dartx.iterator;
  const $hashCode = dartx.hashCode;
  const $fold = dartx.fold;
  const $rightShift = dartx['>>'];
  let intAnddynamicToint = () => (intAnddynamicToint = dart.constFn(dart.fnType(core.int, [core.int, dart.dynamic])))();
  const CT = Object.create(null);
  const _value = dart.privateName(core$, "_value");
  const _is_Optional_default = Symbol('_is_Optional_default');
  const _value$ = dart.privateName(core$, "Optional._value");
  core$.Optional$ = dart.generic(T => {
    let JSArrayOfT = () => (JSArrayOfT = dart.constFn(_interceptors.JSArray$(T)))();
    let EmptyIterableOfT = () => (EmptyIterableOfT = dart.constFn(_internal.EmptyIterable$(T)))();
    let OptionalOfT = () => (OptionalOfT = dart.constFn(core$.Optional$(T)))();
    class Optional extends collection.IterableBase$(T) {
      get [_value]() {
        return this[_value$];
      }
      set [_value](value) {
        super[_value] = value;
      }
      get isPresent() {
        return this[_value] != null;
      }
      get isNotPresent() {
        return this[_value] == null;
      }
      get value() {
        if (this[_value] == null) {
          dart.throw(new core.StateError.new("value called on absent Optional."));
        }
        return this[_value];
      }
      ifPresent(ifPresent) {
        if (dart.test(this.isPresent)) {
          ifPresent(this[_value]);
        }
      }
      ifAbsent(ifAbsent) {
        if (!dart.test(this.isPresent)) {
          ifAbsent();
        }
      }
      or(defaultValue) {
        T._check(defaultValue);
        if (defaultValue == null) {
          dart.throw(new core.ArgumentError.new("defaultValue must not be null."));
        }
        return this[_value] == null ? defaultValue : this[_value];
      }
      get orNull() {
        return this[_value];
      }
      transform(S, transformer) {
        return this[_value] == null ? new (core$.Optional$(S)).absent() : new (core$.Optional$(S)).of(transformer(this[_value]));
      }
      transformNullable(S, transformer) {
        return this[_value] == null ? new (core$.Optional$(S)).absent() : new (core$.Optional$(S)).fromNullable(transformer(this[_value]));
      }
      get iterator() {
        return dart.test(this.isPresent) ? JSArrayOfT().of([this[_value]])[$iterator] : new (EmptyIterableOfT()).new()[$iterator];
      }
      get hashCode() {
        return dart.hashCode(this[_value]);
      }
      _equals(o) {
        if (o == null) return false;
        return OptionalOfT().is(o) && dart.equals(o[_value], this[_value]);
      }
      toString() {
        return this[_value] == null ? "Optional { absent }" : "Optional { value: " + dart.str(this[_value]) + " }";
      }
    }
    (Optional.absent = function() {
      this[_value$] = null;
      Optional.__proto__.new.call(this);
      ;
    }).prototype = Optional.prototype;
    (Optional.of = function(value) {
      this[_value$] = value;
      Optional.__proto__.new.call(this);
      if (this[_value] == null) dart.throw(new core.ArgumentError.new("Must not be null."));
    }).prototype = Optional.prototype;
    (Optional.fromNullable = function(value) {
      this[_value$] = value;
      Optional.__proto__.new.call(this);
      ;
    }).prototype = Optional.prototype;
    dart.addTypeTests(Optional);
    Optional.prototype[_is_Optional_default] = true;
    dart.setMethodSignature(Optional, () => ({
      __proto__: dart.getMethods(Optional.__proto__),
      ifPresent: dart.fnType(dart.void, [dart.fnType(dart.void, [T])]),
      ifAbsent: dart.fnType(dart.void, [dart.fnType(dart.void, [])]),
      or: dart.fnType(T, [core.Object]),
      transform: dart.gFnType(S => [core$.Optional$(S), [dart.fnType(S, [T])]]),
      transformNullable: dart.gFnType(S => [core$.Optional$(S), [dart.fnType(S, [T])]])
    }));
    dart.setGetterSignature(Optional, () => ({
      __proto__: dart.getGetters(Optional.__proto__),
      isPresent: core.bool,
      isNotPresent: core.bool,
      value: T,
      orNull: T,
      iterator: core.Iterator$(T),
      [$iterator]: core.Iterator$(T)
    }));
    dart.setLibraryUri(Optional, "package:quiver/core.dart");
    dart.setFieldSignature(Optional, () => ({
      __proto__: dart.getFields(Optional.__proto__),
      [_value]: dart.finalFieldType(T)
    }));
    dart.defineExtensionMethods(Optional, ['_equals', 'toString']);
    dart.defineExtensionAccessors(Optional, ['iterator', 'hashCode']);
    return Optional;
  });
  core$.Optional = core$.Optional$();
  dart.addTypeTests(core$.Optional, _is_Optional_default);
  core$.firstNonNull = function firstNonNull(o1, o2, o3 = null, o4 = null) {
    if (o1 != null) return o1;
    if (o2 != null) return o2;
    if (o3 != null) return o3;
    if (o4 != null) return o4;
    dart.throw(new core.ArgumentError.new("All arguments were null"));
  };
  core$.hashObjects = function hashObjects(objects) {
    return core$._finish(objects[$fold](core.int, 0, dart.fn((h, i) => core$._combine(h, dart.hashCode(i)), intAnddynamicToint())));
  };
  core$.hash2 = function hash2(a, b) {
    return core$._finish(core$._combine(core$._combine(0, dart.hashCode(a)), dart.hashCode(b)));
  };
  core$.hash3 = function hash3(a, b, c) {
    return core$._finish(core$._combine(core$._combine(core$._combine(0, dart.hashCode(a)), dart.hashCode(b)), dart.hashCode(c)));
  };
  core$.hash4 = function hash4(a, b, c, d) {
    return core$._finish(core$._combine(core$._combine(core$._combine(core$._combine(0, dart.hashCode(a)), dart.hashCode(b)), dart.hashCode(c)), dart.hashCode(d)));
  };
  core$._combine = function _combine(hash, value) {
    hash = 536870911 & dart.notNull(hash) + dart.notNull(value);
    hash = 536870911 & dart.notNull(hash) + ((524287 & dart.notNull(hash)) << 10);
    return (dart.notNull(hash) ^ hash[$rightShift](6)) >>> 0;
  };
  core$._finish = function _finish(hash) {
    hash = 536870911 & dart.notNull(hash) + ((67108863 & dart.notNull(hash)) << 3);
    hash = (dart.notNull(hash) ^ hash[$rightShift](11)) >>> 0;
    return 536870911 & dart.notNull(hash) + ((16383 & dart.notNull(hash)) << 15);
  };
  dart.trackLibraries("packages/quiver/core", {
    "package:quiver/core.dart": core$
  }, {
    "package:quiver/core.dart": ["src/core/hash.dart", "src/core/optional.dart"]
  }, '{"version":3,"sourceRoot":"","sources":["src/core/optional.dart","core.dart","src/core/hash.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;MAsBU;;;;;;;AAkBc,cAAA,AAAO,iBAAG;MAAI;;AAGX,cAAA,AAAO,iBAAG;MAAI;;AAMrC,YAAS,AAAO,gBAAG;AACuC,UAAxD,WAAU,wBAAW;;AAEvB,cAAO;MACT;gBAGoB;AAClB,sBAAI;AACe,UAAjB,AAAS,SAAA,CAAC;;MAEd;eAGmB;AACjB,uBAAK;AACO,UAAV,AAAQ,QAAA;;MAEZ;;iBAOO;AACL,YAAI,AAAa,YAAD,IAAI;AACuC,UAAzD,WAAU,2BAAc;;AAE1B,cAAO,AAAO,iBAAG,OAAO,YAAY,GAAG;MACzC;;AAGgB;MAAM;mBAOK;AACzB,cAAO,AAAO,iBAAG,OACP,oCACA,4BAAY,AAAW,WAAA,CAAC;MACpC;2BAOmC;AACjC,cAAO,AAAO,iBAAG,OACP,oCACA,sCAAsB,AAAW,WAAA,CAAC;MAC9C;;AAII,2CAAe,AAAS,iBAAR,4BAAuB,AAAoB;MAAQ;;AAGnD,cAAO,eAAP;MAAe;;YAGlB;AAAM,cAAE,AAAe,kBAAjB,CAAC,KAA4B,YAAT,AAAE,CAAD,UAAW;MAAM;;AAG3D,cAAO,AAAO,iBAAG,OACX,wBACA,AAA+B,gCAAV,gBAAO;MACpC;;;MA/FiC,gBAAE;AAA7B;;IAAiC;4BAKzB;MAAqB,gBAAE,KAAK;AAA1C;AACE,UAAS,AAAO,gBAAG,MAAM,AAA4C,WAAlC,2BAAc;IACnD;sCAK8B;MAAqB,gBAAE,KAAK;AAApD;;IAAoD;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6CCX/C,IAAI,IAAK,WAAI;AACxB,QAAI,EAAE,IAAI,MAAM,MAAO,GAAE;AACzB,QAAI,EAAE,IAAI,MAAM,MAAO,GAAE;AACzB,QAAI,EAAE,IAAI,MAAM,MAAO,GAAE;AACzB,QAAI,EAAE,IAAI,MAAM,MAAO,GAAE;AACyB,IAAlD,WAAU,2BAAc;EAC1B;2CCfyB;AACrB,yBAAQ,AAAQ,OAAD,kBAAM,GAAG,SAAC,GAAG,MAAM,eAAS,CAAC,EAAI,cAAF,CAAC;EAAY;+BAGrD,GAAG;AAAM,yBAAQ,eAAS,eAAS,GAAK,cAAF,CAAC,IAAc,cAAF,CAAC;EAAW;+BAG/D,GAAG,GAAG;AAAM,yBAClB,eAAS,eAAS,eAAS,GAAK,cAAF,CAAC,IAAc,cAAF,CAAC,IAAc,cAAF,CAAC;EAAW;+BAG9D,GAAG,GAAG,GAAG;AAAM,yBAAQ,eAC7B,eAAS,eAAS,eAAS,GAAK,cAAF,CAAC,IAAc,cAAF,CAAC,IAAc,cAAF,CAAC,IACvD,cAAF,CAAC;EAAW;qCAIC,MAAU;AACS,IAAlC,OAAO,AAAW,YAAQ,aAAL,IAAI,iBAAG,KAAK;AACuB,IAAxD,OAAO,AAAW,YAAQ,aAAL,IAAI,KAAwB,CAAnB,AAAW,sBAAE,IAAI,MAAK;AACpD,UAAY,eAAL,IAAI,IAAI,AAAK,IAAD,cAAI;EACzB;mCAEgB;AACyC,IAAvD,OAAO,AAAW,YAAQ,aAAL,IAAI,KAAwB,CAAnB,AAAW,wBAAE,IAAI,MAAK;AAC1B,IAA1B,OAAY,cAAL,IAAI,IAAI,AAAK,IAAD,cAAI;AACvB,UAAO,AAAW,aAAQ,aAAL,IAAI,KAAwB,CAAnB,AAAW,qBAAE,IAAI,MAAK;EACtD","file":"core.ddc.js"}');
  // Exports:
  return {
    core: core$
  };
});

//# sourceMappingURL=core.ddc.js.map
