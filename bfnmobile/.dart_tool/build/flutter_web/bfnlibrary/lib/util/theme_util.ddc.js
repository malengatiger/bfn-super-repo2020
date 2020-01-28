define(['dart_sdk', 'packages/flutter/material', 'packages/flutter/src/foundation/_bitfield_web'], function(dart_sdk, packages__flutter__material, packages__flutter__src__foundation___bitfield_web) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const math = dart_sdk.math;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const theme_data = packages__flutter__material.src__material__theme_data;
  const colors = packages__flutter__material.src__material__colors;
  const change_notifier = packages__flutter__src__foundation___bitfield_web.src__foundation__change_notifier;
  const theme_util = Object.create(dart.library);
  const $isEmpty = dartx.isEmpty;
  const $elementAt = dartx.elementAt;
  const $length = dartx.length;
  const $add = dartx.add;
  let JSArrayOfThemeData = () => (JSArrayOfThemeData = dart.constFn(_interceptors.JSArray$(theme_data.ThemeData)))();
  const CT = Object.create(null);
  const _themeData$ = dart.privateName(theme_util, "_themeData");
  const Object_ChangeNotifier$36 = class Object_ChangeNotifier extends core.Object {};
  (Object_ChangeNotifier$36.new = function() {
    change_notifier.ChangeNotifier.new.call(this);
  }).prototype = Object_ChangeNotifier$36.prototype;
  dart.applyMixin(Object_ChangeNotifier$36, change_notifier.ChangeNotifier);
  theme_util.ThemeChanger = class ThemeChanger extends Object_ChangeNotifier$36 {
    getTheme() {
      return this[_themeData$];
    }
    setTheme(data) {
      this[_themeData$] = data;
      this.notifyListeners();
    }
    static getThemeByIndex(index) {
      core.print("🧩 🧩 🧩 🧩 🧩 Getting theme index: " + dart.str(index));
      if (dart.test(theme_util.ThemeChanger._themes[$isEmpty])) {
        theme_util.ThemeChanger._buildThemes();
      }
      let m = theme_util.ThemeChanger._themes[$elementAt](index);
      return m;
    }
    static getRandomIndex() {
      if (dart.test(theme_util.ThemeChanger._themes[$isEmpty])) {
        theme_util.ThemeChanger._buildThemes();
      }
      let index = theme_util.ThemeChanger.random.nextInt(dart.notNull(theme_util.ThemeChanger._themes[$length]) - 1);
      return index;
    }
    static _buildThemes() {
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.teal, accentColor: colors.Colors.orange, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.pink, accentColor: colors.Colors.blue, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.purple, accentColor: colors.Colors.orange, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.indigo, accentColor: colors.Colors.lime, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.blue, accentColor: colors.Colors.amber, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.cyan, accentColor: colors.Colors.indigo, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.cyan, accentColor: colors.Colors.orange, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.orange, accentColor: colors.Colors.lime, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.red, accentColor: colors.Colors.blue, backgroundColor: colors.Colors.brown._get(100)}));
      theme_util.ThemeChanger._themes[$add](theme_data.ThemeData.new({primaryColor: colors.Colors.blueGrey, accentColor: colors.Colors.pink, backgroundColor: colors.Colors.brown._get(100)}));
    }
  };
  (theme_util.ThemeChanger.new = function(_themeData) {
    this[_themeData$] = _themeData;
    theme_util.ThemeChanger.__proto__.new.call(this);
    ;
  }).prototype = theme_util.ThemeChanger.prototype;
  dart.addTypeTests(theme_util.ThemeChanger);
  dart.setMethodSignature(theme_util.ThemeChanger, () => ({
    __proto__: dart.getMethods(theme_util.ThemeChanger.__proto__),
    getTheme: dart.fnType(dart.dynamic, []),
    setTheme: dart.fnType(dart.dynamic, [theme_data.ThemeData])
  }));
  dart.setLibraryUri(theme_util.ThemeChanger, "package:bfnlibrary/util/theme_util.dart");
  dart.setFieldSignature(theme_util.ThemeChanger, () => ({
    __proto__: dart.getFields(theme_util.ThemeChanger.__proto__),
    [_themeData$]: dart.fieldType(theme_data.ThemeData)
  }));
  dart.defineLazy(theme_util.ThemeChanger, {
    /*theme_util.ThemeChanger._themes*/get _themes() {
      return JSArrayOfThemeData().of([]);
    },
    set _themes(_) {},
    /*theme_util.ThemeChanger.random*/get random() {
      return math.Random.new(new core.DateTime.now().millisecondsSinceEpoch);
    },
    set random(_) {}
  });
  dart.trackLibraries("packages/bfnlibrary/util/theme_util", {
    "package:bfnlibrary/util/theme_util.dart": theme_util
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["theme_util.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;AAUgB;IAAU;aAEL;AACA,MAAjB,oBAAa,IAAI;AACA,MAAjB;IACF;2BAKqC;AACgB,MAAnD,WAAM,AAA4C,6CAAN,KAAK;AACjD,oBAAI,AAAQ;AACI,QAAd;;AAEE,cAAI,AAAQ,4CAAU,KAAK;AAC/B,YAAO,EAAC;IACV;;AAGE,oBAAI,AAAQ;AACI,QAAd;;AAEE,kBAAQ,AAAO,uCAAuB,aAAf,AAAQ,4CAAS;AAC5C,YAAO,MAAK;IACd;;AAOI,MAJF,AAAQ,sCAAI,wCACW,iCACD,uCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,iCACD,qCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,mCACD,uCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,mCACD,qCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,iCACD,sCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,iCACD,uCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,iCACD,uCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,mCACD,qCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,gCACD,qCACI,AAAK,yBAAC;AAM9B,MAJF,AAAQ,sCAAI,wCACW,qCACD,qCACI,AAAK,yBAAC;IAElC;;;IAhFkB;AAAlB;;EAA6B;;;;;;;;;;;;;MASN,+BAAO;YAAG;;;MACnB,8BAAM;YAAG,iBAAgB,AAAM","file":"theme_util.ddc.js"}');
  // Exports:
  return {
    util__theme_util: theme_util
  };
});

//# sourceMappingURL=theme_util.ddc.js.map
