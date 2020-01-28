define(['dart_sdk', 'packages/flutter/material', 'packages/flutter/src/widgets/actions', 'packages/flutter/src/painting/_network_image_web', 'packages/flutter/src/rendering/animated_size'], function(dart_sdk, packages__flutter__material, packages__flutter__src__widgets__actions, packages__flutter__src__painting___network_image_web, packages__flutter__src__rendering__animated_size) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const snack_bar = packages__flutter__material.src__material__snack_bar;
  const progress_indicator = packages__flutter__material.src__material__progress_indicator;
  const colors = packages__flutter__material.src__material__colors;
  const widget_inspector = packages__flutter__src__widgets__actions.src__widgets__widget_inspector;
  const basic = packages__flutter__src__widgets__actions.src__widgets__basic;
  const container = packages__flutter__src__widgets__actions.src__widgets__container;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const icon$ = packages__flutter__src__widgets__actions.src__widgets__icon;
  const text = packages__flutter__src__widgets__actions.src__widgets__text;
  const edge_insets = packages__flutter__src__painting___network_image_web.src__painting__edge_insets;
  const text_style = packages__flutter__src__painting___network_image_web.src__painting__text_style;
  const paragraph = packages__flutter__src__rendering__animated_size.src__rendering__paragraph;
  const snack = Object.create(dart.library);
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "content",
        [_Location_column]: 7,
        [_Location_line]: 17,
        [_Location_file]: null
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "duration",
        [_Location_column]: 7,
        [_Location_line]: 18,
        [_Location_file]: null
      });
    },
    get C4() {
      return C4 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 7,
        [_Location_line]: 19,
        [_Location_file]: null
      });
    },
    get C1() {
      return C1 = dart.constList([C2 || CT.C2, C3 || CT.C3, C4 || CT.C4], widget_inspector._Location);
    },
    get C0() {
      return C0 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C1 || CT.C1,
        [_Location_name]: null,
        [_Location_column]: 47,
        [_Location_line]: 16,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 8
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "strokeWidth",
        [_Location_column]: 17,
        [_Location_line]: 41,
        [_Location_file]: null
      });
    },
    get C7() {
      return C7 = dart.constList([C8 || CT.C8], widget_inspector._Location);
    },
    get C6() {
      return C6 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C7 || CT.C7,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 40,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C11() {
      return C11 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 15,
        [_Location_line]: 38,
        [_Location_file]: null
      });
    },
    get C12() {
      return C12 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 15,
        [_Location_line]: 39,
        [_Location_file]: null
      });
    },
    get C13() {
      return C13 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 40,
        [_Location_file]: null
      });
    },
    get C10() {
      return C10 = dart.constList([C11 || CT.C11, C12 || CT.C12, C13 || CT.C13], widget_inspector._Location);
    },
    get C9() {
      return C9 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C10 || CT.C10,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 37,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C16() {
      return C16 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 13,
        [_Location_line]: 36,
        [_Location_file]: null
      });
    },
    get C17() {
      return C17 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 37,
        [_Location_file]: null
      });
    },
    get C15() {
      return C15 = dart.constList([C16 || CT.C16, C17 || CT.C17], widget_inspector._Location);
    },
    get C14() {
      return C14 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C15 || CT.C15,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 35,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 9,
        [_Location_line]: 34,
        [_Location_file]: null
      });
    },
    get C19() {
      return C19 = dart.constList([C20 || CT.C20], widget_inspector._Location);
    },
    get C18() {
      return C18 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C19 || CT.C19,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 33,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C23() {
      return C23 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "content",
        [_Location_column]: 7,
        [_Location_line]: 33,
        [_Location_file]: null
      });
    },
    get C24() {
      return C24 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "duration",
        [_Location_column]: 7,
        [_Location_line]: 48,
        [_Location_file]: null
      });
    },
    get C25() {
      return C25 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 7,
        [_Location_line]: 49,
        [_Location_file]: null
      });
    },
    get C22() {
      return C22 = dart.constList([C23 || CT.C23, C24 || CT.C24, C25 || CT.C25], widget_inspector._Location);
    },
    get C21() {
      return C21 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C22 || CT.C22,
        [_Location_name]: null,
        [_Location_column]: 47,
        [_Location_line]: 32,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C26() {
      return C26 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 20,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 8
      });
    },
    get C29() {
      return C29 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 27,
        [_Location_line]: 77,
        [_Location_file]: null
      });
    },
    get C28() {
      return C28 = dart.constList([C29 || CT.C29], widget_inspector._Location);
    },
    get C27() {
      return C27 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C28 || CT.C28,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 77,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C32() {
      return C32 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 15,
        [_Location_line]: 75,
        [_Location_file]: null
      });
    },
    get C33() {
      return C33 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 15,
        [_Location_line]: 76,
        [_Location_file]: null
      });
    },
    get C34() {
      return C34 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 77,
        [_Location_file]: null
      });
    },
    get C31() {
      return C31 = dart.constList([C32 || CT.C32, C33 || CT.C33, C34 || CT.C34], widget_inspector._Location);
    },
    get C30() {
      return C30 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C31 || CT.C31,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 74,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C37() {
      return C37 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 13,
        [_Location_line]: 73,
        [_Location_file]: null
      });
    },
    get C38() {
      return C38 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 74,
        [_Location_file]: null
      });
    },
    get C36() {
      return C36 = dart.constList([C37 || CT.C37, C38 || CT.C38], widget_inspector._Location);
    },
    get C35() {
      return C35 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C36 || CT.C36,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 72,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C41() {
      return C41 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 9,
        [_Location_line]: 71,
        [_Location_file]: null
      });
    },
    get C40() {
      return C40 = dart.constList([C41 || CT.C41], widget_inspector._Location);
    },
    get C39() {
      return C39 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C40 || CT.C40,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 70,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C44() {
      return C44 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "label",
        [_Location_column]: 9,
        [_Location_line]: 87,
        [_Location_file]: null
      });
    },
    get C45() {
      return C45 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 9,
        [_Location_line]: 88,
        [_Location_file]: null
      });
    },
    get C43() {
      return C43 = dart.constList([C44 || CT.C44, C45 || CT.C45], widget_inspector._Location);
    },
    get C42() {
      return C42 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C43 || CT.C43,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 86,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C48() {
      return C48 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "content",
        [_Location_column]: 7,
        [_Location_line]: 70,
        [_Location_file]: null
      });
    },
    get C49() {
      return C49 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "duration",
        [_Location_column]: 7,
        [_Location_line]: 83,
        [_Location_file]: null
      });
    },
    get C50() {
      return C50 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 7,
        [_Location_line]: 85,
        [_Location_file]: null
      });
    },
    get C51() {
      return C51 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "action",
        [_Location_column]: 7,
        [_Location_line]: 86,
        [_Location_file]: null
      });
    },
    get C47() {
      return C47 = dart.constList([C48 || CT.C48, C49 || CT.C49, C50 || CT.C50, C51 || CT.C51], widget_inspector._Location);
    },
    get C46() {
      return C46 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C47 || CT.C47,
        [_Location_name]: null,
        [_Location_column]: 47,
        [_Location_line]: 69,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C54() {
      return C54 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 7,
        [_Location_line]: 100,
        [_Location_file]: null
      });
    },
    get C55() {
      return C55 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "overflow",
        [_Location_column]: 7,
        [_Location_line]: 101,
        [_Location_file]: null
      });
    },
    get C56() {
      return C56 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 7,
        [_Location_line]: 102,
        [_Location_file]: null
      });
    },
    get C53() {
      return C53 = dart.constList([C54 || CT.C54, C55 || CT.C55, C56 || CT.C56], widget_inspector._Location);
    },
    get C52() {
      return C52 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C53 || CT.C53,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 99,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C59() {
      return C59 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "label",
        [_Location_column]: 9,
        [_Location_line]: 123,
        [_Location_file]: null
      });
    },
    get C60() {
      return C60 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 9,
        [_Location_line]: 124,
        [_Location_file]: null
      });
    },
    get C58() {
      return C58 = dart.constList([C59 || CT.C59, C60 || CT.C60], widget_inspector._Location);
    },
    get C57() {
      return C57 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C58 || CT.C58,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 122,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    },
    get C63() {
      return C63 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "content",
        [_Location_column]: 7,
        [_Location_line]: 119,
        [_Location_file]: null
      });
    },
    get C64() {
      return C64 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "duration",
        [_Location_column]: 7,
        [_Location_line]: 120,
        [_Location_file]: null
      });
    },
    get C65() {
      return C65 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 7,
        [_Location_line]: 121,
        [_Location_file]: null
      });
    },
    get C66() {
      return C66 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "action",
        [_Location_column]: 7,
        [_Location_line]: 122,
        [_Location_file]: null
      });
    },
    get C62() {
      return C62 = dart.constList([C63 || CT.C63, C64 || CT.C64, C65 || CT.C65, C66 || CT.C66], widget_inspector._Location);
    },
    get C61() {
      return C61 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C62 || CT.C62,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 118,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/snack.dart"
      });
    }
  });
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C3;
  let C4;
  let C1;
  let C0;
  const EdgeInsets_bottom = dart.privateName(edge_insets, "EdgeInsets.bottom");
  const EdgeInsets_right = dart.privateName(edge_insets, "EdgeInsets.right");
  const EdgeInsets_top = dart.privateName(edge_insets, "EdgeInsets.top");
  const EdgeInsets_left = dart.privateName(edge_insets, "EdgeInsets.left");
  let C5;
  let C8;
  let C7;
  let C6;
  let C11;
  let C12;
  let C13;
  let C10;
  let C9;
  let C16;
  let C17;
  let C15;
  let C14;
  let C20;
  let C19;
  let C18;
  let C23;
  let C24;
  let C25;
  let C22;
  let C21;
  let C26;
  let C29;
  let C28;
  let C27;
  let C32;
  let C33;
  let C34;
  let C31;
  let C30;
  let C37;
  let C38;
  let C36;
  let C35;
  let C41;
  let C40;
  let C39;
  let C44;
  let C45;
  let C43;
  let C42;
  let C48;
  let C49;
  let C50;
  let C51;
  let C47;
  let C46;
  let C54;
  let C55;
  let C56;
  let C53;
  let C52;
  let C59;
  let C60;
  let C58;
  let C57;
  let C63;
  let C64;
  let C65;
  let C66;
  let C62;
  let C61;
  snack.AppSnackbar = class AppSnackbar extends core.Object {
    static showSnackbar(opts) {
      let scaffoldKey = opts && 'scaffoldKey' in opts ? opts.scaffoldKey : null;
      let message = opts && 'message' in opts ? opts.message : null;
      let textColor = opts && 'textColor' in opts ? opts.textColor : null;
      let backgroundColor = opts && 'backgroundColor' in opts ? opts.backgroundColor : null;
      if (scaffoldKey.currentState == null) {
        core.print("AppSnackbar.showSnackbar --- currentState is NULL, quit ..");
        return;
      }
      scaffoldKey.currentState.removeCurrentSnackBar();
      scaffoldKey.currentState.showSnackBar(new snack_bar.SnackBar.new({content: snack.AppSnackbar._getText(message, textColor), duration: new core.Duration.new({seconds: 15}), backgroundColor: backgroundColor, $creationLocationd_0dea112b090073317d4: C0 || CT.C0}));
    }
    static showSnackbarWithProgressIndicator(opts) {
      let scaffoldKey = opts && 'scaffoldKey' in opts ? opts.scaffoldKey : null;
      let message = opts && 'message' in opts ? opts.message : null;
      let textColor = opts && 'textColor' in opts ? opts.textColor : null;
      let backgroundColor = opts && 'backgroundColor' in opts ? opts.backgroundColor : null;
      if (scaffoldKey.currentState == null) {
        return;
      }
      scaffoldKey.currentState.removeCurrentSnackBar();
      scaffoldKey.currentState.showSnackBar(new snack_bar.SnackBar.new({content: new basic.Row.new({children: JSArrayOfWidget().of([new basic.Padding.new({padding: C5 || CT.C5, child: new container.Container.new({height: 20.0, width: 20.0, child: new progress_indicator.CircularProgressIndicator.new({strokeWidth: 2.0, $creationLocationd_0dea112b090073317d4: C6 || CT.C6}), $creationLocationd_0dea112b090073317d4: C9 || CT.C9}), $creationLocationd_0dea112b090073317d4: C14 || CT.C14}), snack.AppSnackbar._getText(message, textColor)]), $creationLocationd_0dea112b090073317d4: C18 || CT.C18}), duration: new core.Duration.new({minutes: 5}), backgroundColor: backgroundColor, $creationLocationd_0dea112b090073317d4: C21 || CT.C21}));
    }
    static showSnackbarWithAction(opts) {
      let scaffoldKey = opts && 'scaffoldKey' in opts ? opts.scaffoldKey : null;
      let message = opts && 'message' in opts ? opts.message : null;
      let textColor = opts && 'textColor' in opts ? opts.textColor : null;
      let backgroundColor = opts && 'backgroundColor' in opts ? opts.backgroundColor : null;
      let actionLabel = opts && 'actionLabel' in opts ? opts.actionLabel : null;
      let listener = opts && 'listener' in opts ? opts.listener : null;
      let icon = opts && 'icon' in opts ? opts.icon : null;
      let durationMinutes = opts && 'durationMinutes' in opts ? opts.durationMinutes : null;
      let action = opts && 'action' in opts ? opts.action : null;
      if (scaffoldKey.currentState == null) {
        core.print("AppSnackbar.showSnackbarWithAction --- currentState is NULL, quit ..");
        return;
      }
      scaffoldKey.currentState.removeCurrentSnackBar();
      scaffoldKey.currentState.showSnackBar(new snack_bar.SnackBar.new({content: new basic.Row.new({children: JSArrayOfWidget().of([new basic.Padding.new({padding: C26 || CT.C26, child: new container.Container.new({height: 40.0, width: 40.0, child: new icon$.Icon.new(icon, {$creationLocationd_0dea112b090073317d4: C27 || CT.C27}), $creationLocationd_0dea112b090073317d4: C30 || CT.C30}), $creationLocationd_0dea112b090073317d4: C35 || CT.C35}), snack.AppSnackbar._getText(message, textColor)]), $creationLocationd_0dea112b090073317d4: C39 || CT.C39}), duration: new core.Duration.new({minutes: durationMinutes == null ? 10 : durationMinutes}), backgroundColor: backgroundColor, action: new snack_bar.SnackBarAction.new({label: actionLabel, onPressed: dart.fn(() => {
            listener.onActionPressed(action);
          }, VoidToNull()), $creationLocationd_0dea112b090073317d4: C42 || CT.C42}), $creationLocationd_0dea112b090073317d4: C46 || CT.C46}));
    }
    static _getText(message, textColor) {
      return new text.Text.new(message, {overflow: paragraph.TextOverflow.clip, style: new text_style.TextStyle.new({color: textColor}), $creationLocationd_0dea112b090073317d4: C52 || CT.C52});
    }
    static showErrorSnackbar(opts) {
      let scaffoldKey = opts && 'scaffoldKey' in opts ? opts.scaffoldKey : null;
      let message = opts && 'message' in opts ? opts.message : null;
      let listener = opts && 'listener' in opts ? opts.listener : null;
      let actionLabel = opts && 'actionLabel' in opts ? opts.actionLabel : null;
      if (scaffoldKey == null || scaffoldKey.currentState == null) {
        core.print("AppSnackbar.showErrorSnackbar --- currentState is NULL, quit ..");
        return;
      } else {
        scaffoldKey.currentState.removeCurrentSnackBar();
      }
      let snackbar = new snack_bar.SnackBar.new({content: snack.AppSnackbar._getText(message, colors.Colors.white), duration: new core.Duration.new({seconds: 20}), backgroundColor: colors.Colors.red.shade900, action: new snack_bar.SnackBarAction.new({label: actionLabel, onPressed: dart.fn(() => {
            listener.onActionPressed(0);
          }, VoidToNull()), $creationLocationd_0dea112b090073317d4: C57 || CT.C57}), $creationLocationd_0dea112b090073317d4: C61 || CT.C61});
      scaffoldKey.currentState.showSnackBar(snackbar);
    }
  };
  (snack.AppSnackbar.new = function() {
    ;
  }).prototype = snack.AppSnackbar.prototype;
  dart.addTypeTests(snack.AppSnackbar);
  dart.setLibraryUri(snack.AppSnackbar, "package:bfnlibrary/util/snack.dart");
  dart.defineLazy(snack.AppSnackbar, {
    /*snack.AppSnackbar.Error*/get Error() {
      return 0;
    },
    /*snack.AppSnackbar.Action*/get Action() {
      return 1;
    }
  });
  snack.SnackBarListener = class SnackBarListener extends core.Object {};
  (snack.SnackBarListener.new = function() {
    ;
  }).prototype = snack.SnackBarListener.prototype;
  dart.addTypeTests(snack.SnackBarListener);
  dart.setLibraryUri(snack.SnackBarListener, "package:bfnlibrary/util/snack.dart");
  dart.trackLibraries("packages/bfnlibrary/util/snack", {
    "package:bfnlibrary/util/snack.dart": snack
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["snack.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;UAM0C;UACnB;UACD;UACA;AAClB,UAAI,AAAY,AAAa,WAAd,iBAAiB;AACqC,QAAnE,WAAM;AACN;;AAE8C,MAAhD,AAAY,AAAa,WAAd;AAKT,MAJF,AAAY,AAAa,WAAd,2BAA+B,qCAC/B,2BAAS,OAAO,EAAE,SAAS,aACtB,gCAAkB,uBACf,eAAe;IAEpC;;UAGwC;UACnB;UACD;UACA;AAClB,UAAI,AAAY,AAAa,WAAd,iBAAiB;AAC9B;;AAE8C,MAAhD,AAAY,AAAa,WAAd;AAmBT,MAlBF,AAAY,AAAa,WAAd,2BAA+B,qCAC3B,6BACO,sBACZ,oDAES,qCACD,aACD,aACA,mEACQ,4KAInB,2BAAS,OAAO,EAAE,SAAS,wEAGjB,gCAAkB,sBACf,eAAe;IAEpC;;UAGwC;UACnB;UACD;UACA;UACT;UACU;UACR;UACL;UACA;AACN,UAAI,AAAY,AAAa,WAAd,iBAAiB;AAE6C,QAD3E,WACI;AACJ;;AAE8C,MAAhD,AAAY,AAAa,WAAd;AAwBT,MAvBF,AAAY,AAAa,WAAd,2BAA+B,qCAC3B,6BACO,sBACZ,sDAES,qCACD,aACD,aACA,mBAAK,IAAI,8KAGpB,2BAAS,OAAO,EAAE,SAAS,wEAIvB,gCAAkB,AAAgB,eAAD,IAAI,OAAO,KAAK,eAAe,qBACvD,eAAe,UACxB,yCACC,WAAW,aACP;AACuB,YAAhC,AAAS,QAAD,iBAAiB,MAAM;;IAIvC;oBAGS,SACD;AAEN,YAAO,mBACL,OAAO,aACgB,oCACZ,qCAAiB,SAAS;IAEzC;;UAGwC;UACnB;UACA;UACV;AACT,UAAI,AAAY,WAAD,IAAI,QAAQ,AAAY,AAAa,WAAd,iBAAiB;AACmB,QAAxE,WAAM;AACN;;AAEgD,QAAhD,AAAY,AAAa,WAAd;;AAGT,qBAAe,qCACR,2BAAS,OAAO,EAAS,gCACpB,gCAAkB,uBACR,AAAI,oCACpB,yCACC,WAAW,aACP;AACsB,YAA/B,AAAS,QAAD;;AAKiC,MAA/C,AAAY,AAAa,WAAd,2BAA2B,QAAQ;IAChD;;;;EAGF;;;;MADe,uBAAK;;;MAAM,wBAAM;;;;;;;EAKhC","file":"snack.ddc.js"}');
  // Exports:
  return {
    util__snack: snack
  };
});

//# sourceMappingURL=snack.ddc.js.map
