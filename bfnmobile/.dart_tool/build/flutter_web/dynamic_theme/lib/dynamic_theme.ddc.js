define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/flutter/material', 'packages/shared_preferences/shared_preferences'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__flutter__material, packages__shared_preferences__shared_preferences) {
  'use strict';
  const core = dart_sdk.core;
  const ui = dart_sdk.ui;
  const async = dart_sdk.async;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const theme_data = packages__flutter__material.src__material__theme_data;
  const shared_preferences = packages__shared_preferences__shared_preferences.shared_preferences;
  const dynamic_theme = Object.create(dart.library);
  let TypeMatcherOfDynamicThemeState = () => (TypeMatcherOfDynamicThemeState = dart.constFn(framework.TypeMatcher$(dynamic_theme.DynamicThemeState)))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let boolToNull = () => (boolToNull = dart.constFn(dart.fnType(core.Null, [core.bool])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.const({
        __proto__: TypeMatcherOfDynamicThemeState().prototype
      });
    }
  });
  let C0;
  const themedWidgetBuilder$ = dart.privateName(dynamic_theme, "DynamicTheme.themedWidgetBuilder");
  const data$ = dart.privateName(dynamic_theme, "DynamicTheme.data");
  const defaultBrightness$ = dart.privateName(dynamic_theme, "DynamicTheme.defaultBrightness");
  dynamic_theme.DynamicTheme = class DynamicTheme extends framework.StatefulWidget {
    get themedWidgetBuilder() {
      return this[themedWidgetBuilder$];
    }
    set themedWidgetBuilder(value) {
      super.themedWidgetBuilder = value;
    }
    get data() {
      return this[data$];
    }
    set data(value) {
      super.data = value;
    }
    get defaultBrightness() {
      return this[defaultBrightness$];
    }
    set defaultBrightness(value) {
      super.defaultBrightness = value;
    }
    createState() {
      return new dynamic_theme.DynamicThemeState.new();
    }
    static of(context) {
      return dynamic_theme.DynamicThemeState._check(context.ancestorStateOfType(C0 || CT.C0));
    }
  };
  (dynamic_theme.DynamicTheme.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let data = opts && 'data' in opts ? opts.data : null;
    let themedWidgetBuilder = opts && 'themedWidgetBuilder' in opts ? opts.themedWidgetBuilder : null;
    let defaultBrightness = opts && 'defaultBrightness' in opts ? opts.defaultBrightness : null;
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[data$] = data;
    this[themedWidgetBuilder$] = themedWidgetBuilder;
    this[defaultBrightness$] = defaultBrightness;
    dynamic_theme.DynamicTheme.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = dynamic_theme.DynamicTheme.prototype;
  dart.addTypeTests(dynamic_theme.DynamicTheme);
  dart.setMethodSignature(dynamic_theme.DynamicTheme, () => ({
    __proto__: dart.getMethods(dynamic_theme.DynamicTheme.__proto__),
    createState: dart.fnType(dynamic_theme.DynamicThemeState, [])
  }));
  dart.setLibraryUri(dynamic_theme.DynamicTheme, "package:dynamic_theme/dynamic_theme.dart");
  dart.setFieldSignature(dynamic_theme.DynamicTheme, () => ({
    __proto__: dart.getFields(dynamic_theme.DynamicTheme.__proto__),
    themedWidgetBuilder: dart.finalFieldType(dart.fnType(framework.Widget, [framework.BuildContext, theme_data.ThemeData])),
    data: dart.finalFieldType(dart.fnType(theme_data.ThemeData, [ui.Brightness])),
    defaultBrightness: dart.finalFieldType(ui.Brightness)
  }));
  const _data = dart.privateName(dynamic_theme, "_data");
  const _brightness = dart.privateName(dynamic_theme, "_brightness");
  dynamic_theme.DynamicThemeState = class DynamicThemeState extends framework.State$(dynamic_theme.DynamicTheme) {
    get data() {
      return this[_data];
    }
    get brightness() {
      return this[_brightness];
    }
    initState() {
      super.initState();
      this[_brightness] = this.widget.defaultBrightness;
      this[_data] = this.widget.data(this[_brightness]);
      this.loadBrightness().then(core.Null, dart.fn(dark => {
        this[_brightness] = dart.test(dark) ? ui.Brightness.dark : ui.Brightness.light;
        this[_data] = this.widget.data(this[_brightness]);
        if (dart.test(this.mounted)) {
          this.setState(dart.fn(() => {
          }, VoidToNull()));
        }
      }, boolToNull()));
    }
    didChangeDependencies() {
      super.didChangeDependencies();
      this[_data] = this.widget.data(this[_brightness]);
    }
    didUpdateWidget(oldWidget) {
      dynamic_theme.DynamicTheme._check(oldWidget);
      super.didUpdateWidget(oldWidget);
      this[_data] = this.widget.data(this[_brightness]);
    }
    setBrightness(brightness) {
      return async.async(dart.void, (function* setBrightness() {
        this.setState(dart.fn(() => {
          this[_data] = this.widget.data(brightness);
          this[_brightness] = brightness;
        }, VoidToNull()));
        let prefs = (yield shared_preferences.SharedPreferences.getInstance());
        yield prefs.setBool("isDark", dart.equals(brightness, ui.Brightness.dark) ? true : false);
      }).bind(this));
    }
    setThemeData(data) {
      this.setState(dart.fn(() => {
        this[_data] = data;
      }, VoidToNull()));
    }
    loadBrightness() {
      return async.async(core.bool, (function* loadBrightness() {
        let t0;
        let prefs = (yield shared_preferences.SharedPreferences.getInstance());
        t0 = prefs.getBool("isDark");
        return t0 == null ? dart.equals(this.widget.defaultBrightness, ui.Brightness.dark) : t0;
      }).bind(this));
    }
    build(context) {
      return this.widget.themedWidgetBuilder(context, this[_data]);
    }
  };
  (dynamic_theme.DynamicThemeState.new = function() {
    this[_data] = null;
    this[_brightness] = null;
    dynamic_theme.DynamicThemeState.__proto__.new.call(this);
    ;
  }).prototype = dynamic_theme.DynamicThemeState.prototype;
  dart.addTypeTests(dynamic_theme.DynamicThemeState);
  dart.setMethodSignature(dynamic_theme.DynamicThemeState, () => ({
    __proto__: dart.getMethods(dynamic_theme.DynamicThemeState.__proto__),
    setBrightness: dart.fnType(async.Future$(dart.void), [ui.Brightness]),
    setThemeData: dart.fnType(dart.void, [theme_data.ThemeData]),
    loadBrightness: dart.fnType(async.Future$(core.bool), []),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setGetterSignature(dynamic_theme.DynamicThemeState, () => ({
    __proto__: dart.getGetters(dynamic_theme.DynamicThemeState.__proto__),
    data: theme_data.ThemeData,
    brightness: ui.Brightness
  }));
  dart.setLibraryUri(dynamic_theme.DynamicThemeState, "package:dynamic_theme/dynamic_theme.dart");
  dart.setFieldSignature(dynamic_theme.DynamicThemeState, () => ({
    __proto__: dart.getFields(dynamic_theme.DynamicThemeState.__proto__),
    [_data]: dart.fieldType(theme_data.ThemeData),
    [_brightness]: dart.fieldType(ui.Brightness)
  }));
  dart.defineLazy(dynamic_theme.DynamicThemeState, {
    /*dynamic_theme.DynamicThemeState._sharedPreferencesKey*/get _sharedPreferencesKey() {
      return "isDark";
    }
  });
  dart.trackLibraries("packages/dynamic_theme/dynamic_theme", {
    "package:dynamic_theme/dynamic_theme.dart": dynamic_theme
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["dynamic_theme.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;IAgB4B;;;;;;IACW;;;;;;IACpB;;;;;;;AAGkB;IAAmB;cAEb;AACvC,oDAAO,AAAQ,OAAD;IAChB;;;QAZS;QAAU;QAAW;QAA0B;;IAArC;IAAW;IAA0B;AAClD,8DAAW,GAAG;;EAAC;;;;;;;;;;;;;;;;;AAqBC;IAAK;;AAEE;IAAW;;AAIrB,MAAX;AACgC,MAAtC,oBAAc,AAAO;AACW,MAAhC,cAAQ,AAAO,iBAAK;AAQlB,MANF,AAAiB,sCAAK,QAAM;AAC6B,QAAvD,8BAAc,IAAI,IAAc,qBAAkB;AAClB,QAAhC,cAAQ,AAAO,iBAAK;AACpB,sBAAI;AACa,UAAf,cAAS;;;;IAGf;;AAI+B,MAAvB;AAC0B,MAAhC,cAAQ,AAAO,iBAAK;IACtB;;wCAGkC;AACA,MAA1B,sBAAgB,SAAS;AACC,MAAhC,cAAQ,AAAO,iBAAK;IACtB;kBAEsC;AAAZ;AAItB,QAHF,cAAS;AACwB,UAA/B,cAAQ,AAAO,iBAAK,UAAU;AACN,UAAxB,oBAAc,UAAU;;AAEF,qBAAQ,MAAwB;AAEgB,QADxE,MAAM,AAAM,KAAD,mBAC2B,YAAX,UAAU,EAAe,sBAAO,OAAO;MACpE;;iBAE4B;AAGxB,MAFF,cAAS;AACK,QAAZ,cAAQ,IAAI;;IAEhB;;AAE2B;;AACD,qBAAQ,MAAwB;AACxD,aAAO,AAAM,KAAD;qBAAC,OACgB,YAAzB,AAAO,+BAAgC;MAC7C;;UAG0B;AACxB,YAAO,AAAO,iCAAoB,OAAO,EAAE;IAC7C;;;IA9DU;IAEC;;;EA6Db;;;;;;;;;;;;;;;;;;;;;MA3DsB,qDAAqB","file":"dynamic_theme.ddc.js"}');
  // Exports:
  return {
    dynamic_theme: dynamic_theme
  };
});

//# sourceMappingURL=dynamic_theme.ddc.js.map
