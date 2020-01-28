define(['dart_sdk', 'packages/bfnlibrary/util/prefs', 'packages/flutter/material'], function(dart_sdk, packages__bfnlibrary__util__prefs, packages__flutter__material) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const math = dart_sdk.math;
  const ui = dart_sdk.ui;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const app_bar_theme = packages__flutter__material.src__material__app_bar_theme;
  const colors = packages__flutter__material.src__material__colors;
  const theme_data = packages__flutter__material.src__material__theme_data;
  const theme_bloc = Object.create(dart.library);
  const $isEmpty = dartx.isEmpty;
  const $length = dartx.length;
  const $elementAt = dartx.elementAt;
  const $clear = dartx.clear;
  const $add = dartx.add;
  let StreamControllerOfint = () => (StreamControllerOfint = dart.constFn(async.StreamController$(core.int)))();
  let JSArrayOfThemeData = () => (JSArrayOfThemeData = dart.constFn(_interceptors.JSArray$(theme_data.ThemeData)))();
  const CT = Object.create(null);
  const _themeController = dart.privateName(theme_bloc, "_themeController");
  const _rand = dart.privateName(theme_bloc, "_rand");
  const _themeIndex = dart.privateName(theme_bloc, "_themeIndex");
  theme_bloc.ThemeBloc = class ThemeBloc extends core.Object {
    get changeToTheme0() {
      return this[_themeController].sink.add(0);
    }
    get changeToTheme1() {
      return this[_themeController].sink.add(1);
    }
    get changeToTheme2() {
      return this[_themeController].sink.add(2);
    }
    get themeIndex() {
      return this[_themeIndex];
    }
    initialize() {
      return async.async(dart.dynamic, (function* initialize() {
        this[_themeIndex] = (yield prefs.Prefs.getThemeIndex());
        core.print("📌 📌 📌 📌️ ThemeBloc: initialize:: adding index to stream ....theme index: " + dart.str(this.themeIndex));
        this[_themeController].sink.add(this[_themeIndex]);
      }).bind(this));
    }
    changeToTheme(index) {
      core.print("✈️✈️ changeToTheme: adding index to stream ....");
      this[_themeController].sink.add(index);
    }
    changeToRandomTheme() {
      this[_themeIndex] = this[_rand].nextInt(dart.notNull(theme_bloc.ThemeUtil.getThemeCount()) - 1);
      this[_themeController].sink.add(this[_themeIndex]);
      core.print("✈️✈️ changeToRandomTheme: adding index to stream ....");
      prefs.Prefs.setThemeIndex(this[_themeIndex]);
    }
    closeStream() {
      this[_themeController].close();
    }
    get newThemeStream() {
      return this[_themeController].stream;
    }
  };
  (theme_bloc.ThemeBloc.new = function() {
    this[_themeController] = StreamControllerOfint().broadcast();
    this[_rand] = math.Random.new(new core.DateTime.now().millisecondsSinceEpoch);
    this[_themeIndex] = 0;
    this.initialize();
  }).prototype = theme_bloc.ThemeBloc.prototype;
  dart.addTypeTests(theme_bloc.ThemeBloc);
  dart.setMethodSignature(theme_bloc.ThemeBloc, () => ({
    __proto__: dart.getMethods(theme_bloc.ThemeBloc.__proto__),
    initialize: dart.fnType(dart.dynamic, []),
    changeToTheme: dart.fnType(dart.dynamic, [core.int]),
    changeToRandomTheme: dart.fnType(dart.dynamic, []),
    closeStream: dart.fnType(dart.dynamic, [])
  }));
  dart.setGetterSignature(theme_bloc.ThemeBloc, () => ({
    __proto__: dart.getGetters(theme_bloc.ThemeBloc.__proto__),
    changeToTheme0: dart.dynamic,
    changeToTheme1: dart.dynamic,
    changeToTheme2: dart.dynamic,
    themeIndex: core.int,
    newThemeStream: dart.dynamic
  }));
  dart.setLibraryUri(theme_bloc.ThemeBloc, "package:bfnlibrary/util/theme_bloc.dart");
  dart.setFieldSignature(theme_bloc.ThemeBloc, () => ({
    __proto__: dart.getFields(theme_bloc.ThemeBloc.__proto__),
    [_themeController]: dart.finalFieldType(async.StreamController$(core.int)),
    [_rand]: dart.finalFieldType(math.Random),
    [_themeIndex]: dart.fieldType(core.int)
  }));
  theme_bloc.ThemeUtil = class ThemeUtil extends core.Object {
    static getTheme(opts) {
      let themeIndex = opts && 'themeIndex' in opts ? opts.themeIndex : null;
      core.print("🌈 🌈 getting theme with index: 🌈 " + dart.str(theme_bloc.ThemeUtil.index));
      if (dart.test(theme_bloc.ThemeUtil._themes[$isEmpty])) {
        theme_bloc.ThemeUtil._setThemes();
      }
      if (themeIndex == null) {
        if (theme_bloc.ThemeUtil.index == null) {
          theme_bloc.ThemeUtil.index = 0;
        } else {
          theme_bloc.ThemeUtil.index = dart.notNull(theme_bloc.ThemeUtil.index) + 1;
          if (theme_bloc.ThemeUtil.index == theme_bloc.ThemeUtil._themes[$length]) {
            theme_bloc.ThemeUtil.index = 0;
          }
        }
      } else {
        theme_bloc.ThemeUtil.index = themeIndex;
      }
      return theme_bloc.ThemeUtil._themes[$elementAt](theme_bloc.ThemeUtil.index);
    }
    static getThemeCount() {
      theme_bloc.ThemeUtil._setThemes();
      return theme_bloc.ThemeUtil._themes[$length];
    }
    static getRandomTheme() {
      if (dart.test(theme_bloc.ThemeUtil._themes[$isEmpty])) theme_bloc.ThemeUtil._setThemes();
      let index = theme_bloc.ThemeUtil._rand.nextInt(dart.notNull(theme_bloc.ThemeUtil._themes[$length]) - 1);
      return theme_bloc.ThemeUtil._themes[$elementAt](index);
    }
    static getThemeByIndex(index) {
      if (dart.notNull(index) >= dart.notNull(theme_bloc.ThemeUtil._themes[$length]) || dart.notNull(index) < 0) index = 0;
      return theme_bloc.ThemeUtil._themes[$elementAt](index);
    }
    static _setThemes() {
      theme_bloc.ThemeUtil._themes[$clear]();
      let aTheme = new app_bar_theme.AppBarTheme.new({color: colors.Colors.blue.shade300});
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.indigo.shade400, accentColor: colors.Colors.pink, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.indigo.shade300, brightness: ui.Brightness.dark}), buttonColor: colors.Colors.blue}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.pink, accentColor: colors.Colors.teal, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.pink.shade200}), buttonColor: colors.Colors.indigo}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.teal, accentColor: colors.Colors.purple, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.teal.shade300}), buttonColor: colors.Colors.pink}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.brown, accentColor: colors.Colors.yellow.shade900, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.brown.shade300}), buttonColor: colors.Colors.blue}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.lime.shade800, accentColor: colors.Colors.teal, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.lime.shade300}), buttonColor: colors.Colors.brown}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.blue, accentColor: colors.Colors.red, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.blue.shade300}), buttonColor: colors.Colors.blue}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.blueGrey, accentColor: colors.Colors.teal, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.blueGrey.shade300}), buttonColor: colors.Colors.pink}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.purple, accentColor: colors.Colors.teal, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.purple.shade300}), buttonColor: colors.Colors.pink}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.amber.shade700, accentColor: colors.Colors.teal, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.amber.shade300}), buttonColor: colors.Colors.pink}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.deepOrange, accentColor: colors.Colors.brown, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.deepOrange.shade300}), buttonColor: colors.Colors.deepOrange}));
      theme_bloc.ThemeUtil._themes[$add](theme_data.ThemeData.new({fontFamily: "Raleway", primaryColor: colors.Colors.orange, accentColor: colors.Colors.teal, cardColor: colors.Colors.white, backgroundColor: colors.Colors.brown.shade100, appBarTheme: new app_bar_theme.AppBarTheme.new({color: colors.Colors.orange.shade300}), buttonColor: colors.Colors.pink}));
    }
  };
  (theme_bloc.ThemeUtil.new = function() {
    ;
  }).prototype = theme_bloc.ThemeUtil.prototype;
  dart.addTypeTests(theme_bloc.ThemeUtil);
  dart.setLibraryUri(theme_bloc.ThemeUtil, "package:bfnlibrary/util/theme_bloc.dart");
  dart.defineLazy(theme_bloc.ThemeUtil, {
    /*theme_bloc.ThemeUtil._themes*/get _themes() {
      return JSArrayOfThemeData().of([]);
    },
    set _themes(_) {},
    /*theme_bloc.ThemeUtil.index*/get index() {
      return null;
    },
    set index(_) {},
    /*theme_bloc.ThemeUtil._rand*/get _rand() {
      return math.Random.new(new core.DateTime.now().millisecondsSinceEpoch);
    },
    set _rand(_) {}
  });
  dart.defineLazy(theme_bloc, {
    /*theme_bloc.themeBloc*/get themeBloc() {
      return new theme_bloc.ThemeBloc.new();
    }
  });
  dart.trackLibraries("packages/bfnlibrary/util/theme_bloc", {
    "package:bfnlibrary/util/theme_bloc.dart": theme_bloc
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["theme_bloc.dart"],"names":[],"mappings":"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","file":"theme_bloc.ddc.js"}');
  // Exports:
  return {
    util__theme_bloc: theme_bloc
  };
});

//# sourceMappingURL=theme_bloc.ddc.js.map
