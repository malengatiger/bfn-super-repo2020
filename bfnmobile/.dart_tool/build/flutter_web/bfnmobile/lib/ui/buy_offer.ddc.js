define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/bfnlibrary/data/invoice_offer', 'packages/flutter/material', 'packages/bfnlibrary/util/prefs', 'packages/flutter/src/painting/_network_image_web', 'packages/bfnlibrary/util/functions', 'packages/bfnmobile/bloc', 'packages/flutter/src/foundation/_bitfield_web', 'packages/bfnlibrary/util/snack', 'packages/bfnlibrary/util/net', 'packages/bfnlibrary/data/account'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__bfnlibrary__data__invoice_offer, packages__flutter__material, packages__bfnlibrary__util__prefs, packages__flutter__src__painting___network_image_web, packages__bfnlibrary__util__functions, packages__bfnmobile__bloc, packages__flutter__src__foundation___bitfield_web, packages__bfnlibrary__util__snack, packages__bfnlibrary__util__net, packages__bfnlibrary__data__account) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const _interceptors = dart_sdk._interceptors;
  const ui = dart_sdk.ui;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const text = packages__flutter__src__widgets__actions.src__widgets__text;
  const widget_inspector = packages__flutter__src__widgets__actions.src__widgets__widget_inspector;
  const preferred_size = packages__flutter__src__widgets__actions.src__widgets__preferred_size;
  const basic = packages__flutter__src__widgets__actions.src__widgets__basic;
  const container = packages__flutter__src__widgets__actions.src__widgets__container;
  const async$ = packages__flutter__src__widgets__actions.src__widgets__async;
  const scroll_view = packages__flutter__src__widgets__actions.src__widgets__scroll_view;
  const navigator = packages__flutter__src__widgets__actions.src__widgets__navigator;
  const invoice_offer = packages__bfnlibrary__data__invoice_offer.data__invoice_offer;
  const scaffold = packages__flutter__material.src__material__scaffold;
  const app_bar = packages__flutter__material.src__material__app_bar;
  const colors = packages__flutter__material.src__material__colors;
  const card = packages__flutter__material.src__material__card;
  const raised_button = packages__flutter__material.src__material__raised_button;
  const theme = packages__flutter__material.src__material__theme;
  const dialog = packages__flutter__material.src__material__dialog;
  const flat_button = packages__flutter__material.src__material__flat_button;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const edge_insets = packages__flutter__src__painting___network_image_web.src__painting__edge_insets;
  const text_style = packages__flutter__src__painting___network_image_web.src__painting__text_style;
  const functions = packages__bfnlibrary__util__functions.util__functions;
  const bloc = packages__bfnmobile__bloc.bloc;
  const print = packages__flutter__src__foundation___bitfield_web.src__foundation__print;
  const snack = packages__bfnlibrary__util__snack.util__snack;
  const net = packages__bfnlibrary__util__net.util__net;
  const account = packages__bfnlibrary__data__account.data__account;
  const buy_offer = Object.create(dart.library);
  const $toString = dartx.toString;
  const $split = dartx.split;
  const $elementAt = dartx.elementAt;
  const $forEach = dartx.forEach;
  let GlobalKeyOfScaffoldState = () => (GlobalKeyOfScaffoldState = dart.constFn(framework.GlobalKey$(scaffold.ScaffoldState)))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let StreamBuilderOfString = () => (StreamBuilderOfString = dart.constFn(async$.StreamBuilder$(core.String)))();
  let StreamOfString = () => (StreamOfString = dart.constFn(async.Stream$(core.String)))();
  let AsyncSnapshotOfString = () => (AsyncSnapshotOfString = dart.constFn(async$.AsyncSnapshot$(core.String)))();
  let BuildContextAndAsyncSnapshotOfStringToText = () => (BuildContextAndAsyncSnapshotOfStringToText = dart.constFn(dart.fnType(text.Text, [framework.BuildContext, AsyncSnapshotOfString()])))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let BuildContextToAlertDialog = () => (BuildContextToAlertDialog = dart.constFn(dart.fnType(dialog.AlertDialog, [framework.BuildContext])))();
  let StringToNull = () => (StringToNull = dart.constFn(dart.fnType(core.Null, [core.String])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 54,
        [_Location_file]: null
      });
    },
    get C1() {
      return C1 = dart.constList([C2 || CT.C2], widget_inspector._Location);
    },
    get C0() {
      return C0 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C1 || CT.C1,
        [_Location_name]: null,
        [_Location_column]: 16,
        [_Location_line]: 54,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 0,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 28
      });
    },
    get C5() {
      return C5 = dart.constList([], widget_inspector._Location);
    },
    get C4() {
      return C4 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C5 || CT.C5,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 62,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "account",
        [_Location_column]: 29,
        [_Location_line]: 64,
        [_Location_file]: null
      });
    },
    get C9() {
      return C9 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 29,
        [_Location_line]: 65,
        [_Location_file]: null
      });
    },
    get C10() {
      return C10 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nodeStyle",
        [_Location_column]: 29,
        [_Location_line]: 66,
        [_Location_file]: null
      });
    },
    get C7() {
      return C7 = dart.constList([C8 || CT.C8, C9 || CT.C9, C10 || CT.C10], widget_inspector._Location);
    },
    get C6() {
      return C6 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C7 || CT.C7,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 63,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C13() {
      return C13 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 21,
        [_Location_line]: 60,
        [_Location_file]: null
      });
    },
    get C14() {
      return C14 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 61,
        [_Location_file]: null
      });
    },
    get C12() {
      return C12 = dart.constList([C13 || CT.C13, C14 || CT.C14], widget_inspector._Location);
    },
    get C11() {
      return C11 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C12 || CT.C12,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 59,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C17() {
      return C17 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 59,
        [_Location_file]: null
      });
    },
    get C16() {
      return C16 = dart.constList([C17 || CT.C17], widget_inspector._Location);
    },
    get C15() {
      return C15 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C16 || CT.C16,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 58,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 71,
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
        [_Location_column]: 17,
        [_Location_line]: 70,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C23() {
      return C23 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 35,
        [_Location_line]: 83,
        [_Location_file]: null
      });
    },
    get C24() {
      return C24 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 25,
        [_Location_line]: 84,
        [_Location_file]: null
      });
    },
    get C22() {
      return C22 = dart.constList([C23 || CT.C23, C24 || CT.C24], widget_inspector._Location);
    },
    get C21() {
      return C21 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C22 || CT.C22,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 82,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C27() {
      return C27 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 21,
        [_Location_line]: 74,
        [_Location_file]: null
      });
    },
    get C28() {
      return C28 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "initialData",
        [_Location_column]: 21,
        [_Location_line]: 75,
        [_Location_file]: null
      });
    },
    get C29() {
      return C29 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 21,
        [_Location_line]: 76,
        [_Location_file]: null
      });
    },
    get C26() {
      return C26 = dart.constList([C27 || CT.C27, C28 || CT.C28, C29 || CT.C29], widget_inspector._Location);
    },
    get C25() {
      return C25 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C26 || CT.C26,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 73,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C32() {
      return C32 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 26,
        [_Location_line]: 87,
        [_Location_file]: null
      });
    },
    get C31() {
      return C31 = dart.constList([C32 || CT.C32], widget_inspector._Location);
    },
    get C30() {
      return C30 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C31 || CT.C31,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 87,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C35() {
      return C35 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 15,
        [_Location_line]: 57,
        [_Location_file]: null
      });
    },
    get C34() {
      return C34 = dart.constList([C35 || CT.C35], widget_inspector._Location);
    },
    get C33() {
      return C33 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C34 || CT.C34,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 56,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C38() {
      return C38 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 56,
        [_Location_file]: null
      });
    },
    get C39() {
      return C39 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 13,
        [_Location_line]: 90,
        [_Location_file]: null
      });
    },
    get C37() {
      return C37 = dart.constList([C38 || CT.C38, C39 || CT.C39], widget_inspector._Location);
    },
    get C36() {
      return C36 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C37 || CT.C37,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 55,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C42() {
      return C42 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 9,
        [_Location_line]: 54,
        [_Location_file]: null
      });
    },
    get C43() {
      return C43 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 9,
        [_Location_line]: 55,
        [_Location_file]: null
      });
    },
    get C41() {
      return C41 = dart.constList([C42 || CT.C42, C43 || CT.C43], widget_inspector._Location);
    },
    get C40() {
      return C40 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C41 || CT.C41,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 53,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C44() {
      return C44 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 8,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 8
      });
    },
    get C47() {
      return C47 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 15,
        [_Location_line]: 98,
        [_Location_file]: null
      });
    },
    get C46() {
      return C46 = dart.constList([C47 || CT.C47], widget_inspector._Location);
    },
    get C45() {
      return C45 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C46 || CT.C46,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 97,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C48() {
      return C48 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 0,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 20
      });
    },
    get C51() {
      return C51 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 109,
        [_Location_file]: null
      });
    },
    get C50() {
      return C50 = dart.constList([C51 || CT.C51], widget_inspector._Location);
    },
    get C49() {
      return C49 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C50 || CT.C50,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 108,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C54() {
      return C54 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 114,
        [_Location_file]: null
      });
    },
    get C55() {
      return C55 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 115,
        [_Location_file]: null
      });
    },
    get C53() {
      return C53 = dart.constList([C54 || CT.C54, C55 || CT.C55], widget_inspector._Location);
    },
    get C52() {
      return C52 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C53 || CT.C53,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 113,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C58() {
      return C58 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 29,
        [_Location_line]: 118,
        [_Location_file]: null
      });
    },
    get C57() {
      return C57 = dart.constList([C58 || CT.C58], widget_inspector._Location);
    },
    get C56() {
      return C56 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C57 || CT.C57,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 117,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C61() {
      return C61 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 51,
        [_Location_line]: 121,
        [_Location_file]: null
      });
    },
    get C62() {
      return C62 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 122,
        [_Location_file]: null
      });
    },
    get C60() {
      return C60 = dart.constList([C61 || CT.C61, C62 || CT.C62], widget_inspector._Location);
    },
    get C59() {
      return C59 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C60 || CT.C60,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 120,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C65() {
      return C65 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 112,
        [_Location_file]: null
      });
    },
    get C64() {
      return C64 = dart.constList([C65 || CT.C65], widget_inspector._Location);
    },
    get C63() {
      return C63 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C64 || CT.C64,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 111,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C68() {
      return C68 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 127,
        [_Location_file]: null
      });
    },
    get C67() {
      return C67 = dart.constList([C68 || CT.C68], widget_inspector._Location);
    },
    get C66() {
      return C66 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C67 || CT.C67,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 126,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C71() {
      return C71 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 132,
        [_Location_file]: null
      });
    },
    get C72() {
      return C72 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 133,
        [_Location_file]: null
      });
    },
    get C70() {
      return C70 = dart.constList([C71 || CT.C71, C72 || CT.C72], widget_inspector._Location);
    },
    get C69() {
      return C69 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C70 || CT.C70,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 131,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C75() {
      return C75 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 29,
        [_Location_line]: 136,
        [_Location_file]: null
      });
    },
    get C74() {
      return C74 = dart.constList([C75 || CT.C75], widget_inspector._Location);
    },
    get C73() {
      return C73 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C74 || CT.C74,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 135,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C78() {
      return C78 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 51,
        [_Location_line]: 139,
        [_Location_file]: null
      });
    },
    get C79() {
      return C79 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 140,
        [_Location_file]: null
      });
    },
    get C77() {
      return C77 = dart.constList([C78 || CT.C78, C79 || CT.C79], widget_inspector._Location);
    },
    get C76() {
      return C76 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C77 || CT.C77,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 138,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C82() {
      return C82 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 130,
        [_Location_file]: null
      });
    },
    get C81() {
      return C81 = dart.constList([C82 || CT.C82], widget_inspector._Location);
    },
    get C80() {
      return C80 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C81 || CT.C81,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 129,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C85() {
      return C85 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 145,
        [_Location_file]: null
      });
    },
    get C84() {
      return C84 = dart.constList([C85 || CT.C85], widget_inspector._Location);
    },
    get C83() {
      return C83 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C84 || CT.C84,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 144,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C88() {
      return C88 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 150,
        [_Location_file]: null
      });
    },
    get C89() {
      return C89 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 151,
        [_Location_file]: null
      });
    },
    get C87() {
      return C87 = dart.constList([C88 || CT.C88, C89 || CT.C89], widget_inspector._Location);
    },
    get C86() {
      return C86 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C87 || CT.C87,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 149,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C92() {
      return C92 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 29,
        [_Location_line]: 154,
        [_Location_file]: null
      });
    },
    get C91() {
      return C91 = dart.constList([C92 || CT.C92], widget_inspector._Location);
    },
    get C90() {
      return C90 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C91 || CT.C91,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 153,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C95() {
      return C95 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 51,
        [_Location_line]: 157,
        [_Location_file]: null
      });
    },
    get C96() {
      return C96 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 158,
        [_Location_file]: null
      });
    },
    get C94() {
      return C94 = dart.constList([C95 || CT.C95, C96 || CT.C96], widget_inspector._Location);
    },
    get C93() {
      return C93 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C94 || CT.C94,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 156,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C99() {
      return C99 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 148,
        [_Location_file]: null
      });
    },
    get C98() {
      return C98 = dart.constList([C99 || CT.C99], widget_inspector._Location);
    },
    get C97() {
      return C97 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C98 || CT.C98,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 147,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C102() {
      return C102 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 163,
        [_Location_file]: null
      });
    },
    get C101() {
      return C101 = dart.constList([C102 || CT.C102], widget_inspector._Location);
    },
    get C100() {
      return C100 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C101 || CT.C101,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 162,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C105() {
      return C105 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 168,
        [_Location_file]: null
      });
    },
    get C106() {
      return C106 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 169,
        [_Location_file]: null
      });
    },
    get C104() {
      return C104 = dart.constList([C105 || CT.C105, C106 || CT.C106], widget_inspector._Location);
    },
    get C103() {
      return C103 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C104 || CT.C104,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 167,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C109() {
      return C109 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 29,
        [_Location_line]: 172,
        [_Location_file]: null
      });
    },
    get C108() {
      return C108 = dart.constList([C109 || CT.C109], widget_inspector._Location);
    },
    get C107() {
      return C107 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C108 || CT.C108,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 171,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C112() {
      return C112 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 175,
        [_Location_file]: null
      });
    },
    get C113() {
      return C113 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 176,
        [_Location_file]: null
      });
    },
    get C111() {
      return C111 = dart.constList([C112 || CT.C112, C113 || CT.C113], widget_inspector._Location);
    },
    get C110() {
      return C110 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C111 || CT.C111,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 174,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C116() {
      return C116 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 166,
        [_Location_file]: null
      });
    },
    get C115() {
      return C115 = dart.constList([C116 || CT.C116], widget_inspector._Location);
    },
    get C114() {
      return C114 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C115 || CT.C115,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 165,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C119() {
      return C119 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 181,
        [_Location_file]: null
      });
    },
    get C118() {
      return C118 = dart.constList([C119 || CT.C119], widget_inspector._Location);
    },
    get C117() {
      return C117 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C118 || CT.C118,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 180,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C122() {
      return C122 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 186,
        [_Location_file]: null
      });
    },
    get C123() {
      return C123 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 187,
        [_Location_file]: null
      });
    },
    get C121() {
      return C121 = dart.constList([C122 || CT.C122, C123 || CT.C123], widget_inspector._Location);
    },
    get C120() {
      return C120 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C121 || CT.C121,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 185,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C126() {
      return C126 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 29,
        [_Location_line]: 190,
        [_Location_file]: null
      });
    },
    get C125() {
      return C125 = dart.constList([C126 || CT.C126], widget_inspector._Location);
    },
    get C124() {
      return C124 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C125 || CT.C125,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 189,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C129() {
      return C129 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 79,
        [_Location_line]: 193,
        [_Location_file]: null
      });
    },
    get C130() {
      return C130 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 194,
        [_Location_file]: null
      });
    },
    get C128() {
      return C128 = dart.constList([C129 || CT.C129, C130 || CT.C130], widget_inspector._Location);
    },
    get C127() {
      return C127 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C128 || CT.C128,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 192,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C133() {
      return C133 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 184,
        [_Location_file]: null
      });
    },
    get C132() {
      return C132 = dart.constList([C133 || CT.C133], widget_inspector._Location);
    },
    get C131() {
      return C131 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C132 || CT.C132,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 183,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C136() {
      return C136 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 199,
        [_Location_file]: null
      });
    },
    get C135() {
      return C135 = dart.constList([C136 || CT.C136], widget_inspector._Location);
    },
    get C134() {
      return C134 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C135 || CT.C135,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 198,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C139() {
      return C139 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 204,
        [_Location_file]: null
      });
    },
    get C140() {
      return C140 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 205,
        [_Location_file]: null
      });
    },
    get C138() {
      return C138 = dart.constList([C139 || CT.C139, C140 || CT.C140], widget_inspector._Location);
    },
    get C137() {
      return C137 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C138 || CT.C138,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 203,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C143() {
      return C143 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 29,
        [_Location_line]: 208,
        [_Location_file]: null
      });
    },
    get C142() {
      return C142 = dart.constList([C143 || CT.C143], widget_inspector._Location);
    },
    get C141() {
      return C141 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C142 || CT.C142,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 207,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C146() {
      return C146 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 211,
        [_Location_file]: null
      });
    },
    get C147() {
      return C147 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 212,
        [_Location_file]: null
      });
    },
    get C145() {
      return C145 = dart.constList([C146 || CT.C146, C147 || CT.C147], widget_inspector._Location);
    },
    get C144() {
      return C144 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C145 || CT.C145,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 210,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C150() {
      return C150 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 202,
        [_Location_file]: null
      });
    },
    get C149() {
      return C149 = dart.constList([C150 || CT.C150], widget_inspector._Location);
    },
    get C148() {
      return C148 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C149 || CT.C149,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 201,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C153() {
      return C153 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 217,
        [_Location_file]: null
      });
    },
    get C152() {
      return C152 = dart.constList([C153 || CT.C153], widget_inspector._Location);
    },
    get C151() {
      return C151 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C152 || CT.C152,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 216,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C156() {
      return C156 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 222,
        [_Location_file]: null
      });
    },
    get C157() {
      return C157 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 223,
        [_Location_file]: null
      });
    },
    get C155() {
      return C155 = dart.constList([C156 || CT.C156, C157 || CT.C157], widget_inspector._Location);
    },
    get C154() {
      return C154 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C155 || CT.C155,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 221,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C160() {
      return C160 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 29,
        [_Location_line]: 226,
        [_Location_file]: null
      });
    },
    get C159() {
      return C159 = dart.constList([C160 || CT.C160], widget_inspector._Location);
    },
    get C158() {
      return C158 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C159 || CT.C159,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 225,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C163() {
      return C163 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 229,
        [_Location_file]: null
      });
    },
    get C164() {
      return C164 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 231,
        [_Location_file]: null
      });
    },
    get C162() {
      return C162 = dart.constList([C163 || CT.C163, C164 || CT.C164], widget_inspector._Location);
    },
    get C161() {
      return C161 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C162 || CT.C162,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 228,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C167() {
      return C167 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 220,
        [_Location_file]: null
      });
    },
    get C166() {
      return C166 = dart.constList([C167 || CT.C167], widget_inspector._Location);
    },
    get C165() {
      return C165 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C166 || CT.C166,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 219,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C170() {
      return C170 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 236,
        [_Location_file]: null
      });
    },
    get C169() {
      return C169 = dart.constList([C170 || CT.C170], widget_inspector._Location);
    },
    get C168() {
      return C168 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C169 || CT.C169,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 235,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C171() {
      return C171 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 16,
        [EdgeInsets_right]: 16,
        [EdgeInsets_top]: 16,
        [EdgeInsets_left]: 16
      });
    },
    get C174() {
      return C174 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 245,
        [_Location_file]: null
      });
    },
    get C175() {
      return C175 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 246,
        [_Location_file]: null
      });
    },
    get C173() {
      return C173 = dart.constList([C174 || CT.C174, C175 || CT.C175], widget_inspector._Location);
    },
    get C172() {
      return C172 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C173 || CT.C173,
        [_Location_name]: null,
        [_Location_column]: 34,
        [_Location_line]: 244,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C178() {
      return C178 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 27,
        [_Location_line]: 243,
        [_Location_file]: null
      });
    },
    get C179() {
      return C179 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 27,
        [_Location_line]: 244,
        [_Location_file]: null
      });
    },
    get C177() {
      return C177 = dart.constList([C178 || CT.C178, C179 || CT.C179], widget_inspector._Location);
    },
    get C176() {
      return C176 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C177 || CT.C177,
        [_Location_name]: null,
        [_Location_column]: 32,
        [_Location_line]: 242,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C182() {
      return C182 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 25,
        [_Location_line]: 239,
        [_Location_file]: null
      });
    },
    get C183() {
      return C183 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 25,
        [_Location_line]: 240,
        [_Location_file]: null
      });
    },
    get C184() {
      return C184 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 25,
        [_Location_line]: 241,
        [_Location_file]: null
      });
    },
    get C185() {
      return C185 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 25,
        [_Location_line]: 242,
        [_Location_file]: null
      });
    },
    get C181() {
      return C181 = dart.constList([C182 || CT.C182, C183 || CT.C183, C184 || CT.C184, C185 || CT.C185], widget_inspector._Location);
    },
    get C180() {
      return C180 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C181 || CT.C181,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 238,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C188() {
      return C188 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 25,
        [_Location_line]: 251,
        [_Location_file]: null
      });
    },
    get C187() {
      return C187 = dart.constList([C188 || CT.C188], widget_inspector._Location);
    },
    get C186() {
      return C186 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C187 || CT.C187,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 250,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C191() {
      return C191 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 21,
        [_Location_line]: 107,
        [_Location_file]: null
      });
    },
    get C190() {
      return C190 = dart.constList([C191 || CT.C191], widget_inspector._Location);
    },
    get C189() {
      return C189 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C190 || CT.C190,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 106,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C194() {
      return C194 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 19,
        [_Location_line]: 105,
        [_Location_file]: null
      });
    },
    get C195() {
      return C195 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 106,
        [_Location_file]: null
      });
    },
    get C193() {
      return C193 = dart.constList([C194 || CT.C194, C195 || CT.C195], widget_inspector._Location);
    },
    get C192() {
      return C192 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C193 || CT.C193,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 104,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C198() {
      return C198 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 17,
        [_Location_line]: 103,
        [_Location_file]: null
      });
    },
    get C199() {
      return C199 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 104,
        [_Location_file]: null
      });
    },
    get C197() {
      return C197 = dart.constList([C198 || CT.C198, C199 || CT.C199], widget_inspector._Location);
    },
    get C196() {
      return C196 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C197 || CT.C197,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 102,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C202() {
      return C202 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 15,
        [_Location_line]: 101,
        [_Location_file]: null
      });
    },
    get C203() {
      return C203 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 102,
        [_Location_file]: null
      });
    },
    get C201() {
      return C201 = dart.constList([C202 || CT.C202, C203 || CT.C203], widget_inspector._Location);
    },
    get C200() {
      return C200 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C201 || CT.C201,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 100,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C206() {
      return C206 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 11,
        [_Location_line]: 96,
        [_Location_file]: null
      });
    },
    get C205() {
      return C205 = dart.constList([C206 || CT.C206], widget_inspector._Location);
    },
    get C204() {
      return C204 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C205 || CT.C205,
        [_Location_name]: null,
        [_Location_column]: 16,
        [_Location_line]: 95,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C209() {
      return C209 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 9,
        [_Location_line]: 94,
        [_Location_file]: null
      });
    },
    get C210() {
      return C210 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 9,
        [_Location_line]: 95,
        [_Location_file]: null
      });
    },
    get C208() {
      return C208 = dart.constList([C209 || CT.C209, C210 || CT.C210], widget_inspector._Location);
    },
    get C207() {
      return C207 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C208 || CT.C208,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 93,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C213() {
      return C213 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 7,
        [_Location_line]: 52,
        [_Location_file]: null
      });
    },
    get C214() {
      return C214 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 7,
        [_Location_line]: 53,
        [_Location_file]: null
      });
    },
    get C215() {
      return C215 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 7,
        [_Location_line]: 92,
        [_Location_file]: null
      });
    },
    get C216() {
      return C216 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 7,
        [_Location_line]: 93,
        [_Location_file]: null
      });
    },
    get C212() {
      return C212 = dart.constList([C213 || CT.C213, C214 || CT.C214, C215 || CT.C215, C216 || CT.C216], widget_inspector._Location);
    },
    get C211() {
      return C211 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C212 || CT.C212,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 51,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C219() {
      return C219 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 25,
        [_Location_line]: 277,
        [_Location_file]: null
      });
    },
    get C218() {
      return C218 = dart.constList([C219 || CT.C219], widget_inspector._Location);
    },
    get C217() {
      return C217 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C218 || CT.C218,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 277,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C222() {
      return C222 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 23,
        [_Location_line]: 283,
        [_Location_file]: null
      });
    },
    get C221() {
      return C221 = dart.constList([C222 || CT.C222], widget_inspector._Location);
    },
    get C220() {
      return C220 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C221 || CT.C221,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 282,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C225() {
      return C225 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 21,
        [_Location_line]: 285,
        [_Location_file]: null
      });
    },
    get C224() {
      return C224 = dart.constList([C225 || CT.C225], widget_inspector._Location);
    },
    get C223() {
      return C223 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C224 || CT.C224,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 284,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C228() {
      return C228 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 288,
        [_Location_file]: null
      });
    },
    get C229() {
      return C229 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 289,
        [_Location_file]: null
      });
    },
    get C227() {
      return C227 = dart.constList([C228 || CT.C228, C229 || CT.C229], widget_inspector._Location);
    },
    get C226() {
      return C226 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C227 || CT.C227,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 287,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C232() {
      return C232 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 17,
        [_Location_line]: 281,
        [_Location_file]: null
      });
    },
    get C231() {
      return C231 = dart.constList([C232 || CT.C232], widget_inspector._Location);
    },
    get C230() {
      return C230 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C231 || CT.C231,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 280,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C235() {
      return C235 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 15,
        [_Location_line]: 279,
        [_Location_file]: null
      });
    },
    get C236() {
      return C236 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 280,
        [_Location_file]: null
      });
    },
    get C234() {
      return C234 = dart.constList([C235 || CT.C235, C236 || CT.C236], widget_inspector._Location);
    },
    get C233() {
      return C233 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C234 || CT.C234,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 278,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C239() {
      return C239 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 19,
        [_Location_line]: 300,
        [_Location_file]: null
      });
    },
    get C240() {
      return C240 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 19,
        [_Location_line]: 301,
        [_Location_file]: null
      });
    },
    get C238() {
      return C238 = dart.constList([C239 || CT.C239, C240 || CT.C240], widget_inspector._Location);
    },
    get C237() {
      return C237 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C238 || CT.C238,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 299,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C243() {
      return C243 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 17,
        [_Location_line]: 296,
        [_Location_file]: null
      });
    },
    get C244() {
      return C244 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 299,
        [_Location_file]: null
      });
    },
    get C242() {
      return C242 = dart.constList([C243 || CT.C243, C244 || CT.C244], widget_inspector._Location);
    },
    get C241() {
      return C241 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C242 || CT.C242,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 295,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C247() {
      return C247 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 19,
        [_Location_line]: 310,
        [_Location_file]: null
      });
    },
    get C248() {
      return C248 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 19,
        [_Location_line]: 311,
        [_Location_file]: null
      });
    },
    get C246() {
      return C246 = dart.constList([C247 || CT.C247, C248 || CT.C248], widget_inspector._Location);
    },
    get C245() {
      return C245 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C246 || CT.C246,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 309,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C251() {
      return C251 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 17,
        [_Location_line]: 305,
        [_Location_file]: null
      });
    },
    get C252() {
      return C252 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 309,
        [_Location_file]: null
      });
    },
    get C250() {
      return C250 = dart.constList([C251 || CT.C251, C252 || CT.C252], widget_inspector._Location);
    },
    get C249() {
      return C249 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C250 || CT.C250,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 304,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C255() {
      return C255 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 13,
        [_Location_line]: 277,
        [_Location_file]: null
      });
    },
    get C256() {
      return C256 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "content",
        [_Location_column]: 13,
        [_Location_line]: 278,
        [_Location_file]: null
      });
    },
    get C257() {
      return C257 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "actions",
        [_Location_column]: 13,
        [_Location_line]: 294,
        [_Location_file]: null
      });
    },
    get C254() {
      return C254 = dart.constList([C255 || CT.C255, C256 || CT.C256, C257 || CT.C257], widget_inspector._Location);
    },
    get C253() {
      return C253 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C254 || CT.C254,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 276,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C258() {
      return C258 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 8,
        [EdgeInsets_right]: 20,
        [EdgeInsets_top]: 12,
        [EdgeInsets_left]: 20
      });
    },
    get C261() {
      return C261 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 381,
        [_Location_file]: null
      });
    },
    get C262() {
      return C262 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 13,
        [_Location_line]: 382,
        [_Location_file]: null
      });
    },
    get C260() {
      return C260 = dart.constList([C261 || CT.C261, C262 || CT.C262], widget_inspector._Location);
    },
    get C259() {
      return C259 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C260 || CT.C260,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 380,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C265() {
      return C265 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 13,
        [_Location_line]: 385,
        [_Location_file]: null
      });
    },
    get C264() {
      return C264 = dart.constList([C265 || CT.C265], widget_inspector._Location);
    },
    get C263() {
      return C263 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C264 || CT.C264,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 384,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C268() {
      return C268 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 13,
        [_Location_line]: 388,
        [_Location_file]: null
      });
    },
    get C269() {
      return C269 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 13,
        [_Location_line]: 389,
        [_Location_file]: null
      });
    },
    get C267() {
      return C267 = dart.constList([C268 || CT.C268, C269 || CT.C269], widget_inspector._Location);
    },
    get C266() {
      return C266 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C267 || CT.C267,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 387,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C272() {
      return C272 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 13,
        [_Location_line]: 392,
        [_Location_file]: null
      });
    },
    get C271() {
      return C271 = dart.constList([C272 || CT.C272], widget_inspector._Location);
    },
    get C270() {
      return C270 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C271 || CT.C271,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 391,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C275() {
      return C275 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 9,
        [_Location_line]: 379,
        [_Location_file]: null
      });
    },
    get C274() {
      return C274 = dart.constList([C275 || CT.C275], widget_inspector._Location);
    },
    get C273() {
      return C273 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C274 || CT.C274,
        [_Location_name]: null,
        [_Location_column]: 14,
        [_Location_line]: 378,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    },
    get C278() {
      return C278 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 7,
        [_Location_line]: 377,
        [_Location_file]: null
      });
    },
    get C279() {
      return C279 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 7,
        [_Location_line]: 378,
        [_Location_file]: null
      });
    },
    get C277() {
      return C277 = dart.constList([C278 || CT.C278, C279 || CT.C279], widget_inspector._Location);
    },
    get C276() {
      return C276 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C277 || CT.C277,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 376,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/buy_offer.dart"
      });
    }
  });
  const offer$ = dart.privateName(buy_offer, "BuyOffer.offer");
  buy_offer.BuyOffer = class BuyOffer extends framework.StatefulWidget {
    get offer() {
      return this[offer$];
    }
    set offer(value) {
      super.offer = value;
    }
    createState() {
      return new buy_offer._BuyOfferState.new();
    }
  };
  (buy_offer.BuyOffer.new = function(offer, opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[offer$] = offer;
    buy_offer.BuyOffer.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = buy_offer.BuyOffer.prototype;
  dart.addTypeTests(buy_offer.BuyOffer);
  dart.setMethodSignature(buy_offer.BuyOffer, () => ({
    __proto__: dart.getMethods(buy_offer.BuyOffer.__proto__),
    createState: dart.fnType(buy_offer._BuyOfferState, [])
  }));
  dart.setLibraryUri(buy_offer.BuyOffer, "package:bfnmobile/ui/buy_offer.dart");
  dart.setFieldSignature(buy_offer.BuyOffer, () => ({
    __proto__: dart.getFields(buy_offer.BuyOffer.__proto__),
    offer: dart.finalFieldType(invoice_offer.InvoiceOffer)
  }));
  const _key = dart.privateName(buy_offer, "_key");
  const _checkIfValidBuyer = dart.privateName(buy_offer, "_checkIfValidBuyer");
  const _exit = dart.privateName(buy_offer, "_exit");
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C1;
  let C0;
  const EdgeInsets_bottom = dart.privateName(edge_insets, "EdgeInsets.bottom");
  const EdgeInsets_right = dart.privateName(edge_insets, "EdgeInsets.right");
  const EdgeInsets_top = dart.privateName(edge_insets, "EdgeInsets.top");
  const EdgeInsets_left = dart.privateName(edge_insets, "EdgeInsets.left");
  let C3;
  let C5;
  let C4;
  let C8;
  let C9;
  let C10;
  let C7;
  let C6;
  let C13;
  let C14;
  let C12;
  let C11;
  let C17;
  let C16;
  let C15;
  let C20;
  let C19;
  let C18;
  let C23;
  let C24;
  let C22;
  let C21;
  let C27;
  let C28;
  let C29;
  let C26;
  let C25;
  let C32;
  let C31;
  let C30;
  let C35;
  let C34;
  let C33;
  let C38;
  let C39;
  let C37;
  let C36;
  let C42;
  let C43;
  let C41;
  let C40;
  let C44;
  let C47;
  let C46;
  let C45;
  let C48;
  let C51;
  let C50;
  let C49;
  let C54;
  let C55;
  let C53;
  let C52;
  let C58;
  let C57;
  let C56;
  let C61;
  let C62;
  let C60;
  let C59;
  let C65;
  let C64;
  let C63;
  let C68;
  let C67;
  let C66;
  let C71;
  let C72;
  let C70;
  let C69;
  let C75;
  let C74;
  let C73;
  let C78;
  let C79;
  let C77;
  let C76;
  let C82;
  let C81;
  let C80;
  let C85;
  let C84;
  let C83;
  let C88;
  let C89;
  let C87;
  let C86;
  let C92;
  let C91;
  let C90;
  let C95;
  let C96;
  let C94;
  let C93;
  let C99;
  let C98;
  let C97;
  let C102;
  let C101;
  let C100;
  let C105;
  let C106;
  let C104;
  let C103;
  let C109;
  let C108;
  let C107;
  let C112;
  let C113;
  let C111;
  let C110;
  let C116;
  let C115;
  let C114;
  let C119;
  let C118;
  let C117;
  let C122;
  let C123;
  let C121;
  let C120;
  let C126;
  let C125;
  let C124;
  let C129;
  let C130;
  let C128;
  let C127;
  let C133;
  let C132;
  let C131;
  let C136;
  let C135;
  let C134;
  let C139;
  let C140;
  let C138;
  let C137;
  let C143;
  let C142;
  let C141;
  let C146;
  let C147;
  let C145;
  let C144;
  let C150;
  let C149;
  let C148;
  let C153;
  let C152;
  let C151;
  let C156;
  let C157;
  let C155;
  let C154;
  let C160;
  let C159;
  let C158;
  let C163;
  let C164;
  let C162;
  let C161;
  let C167;
  let C166;
  let C165;
  let C170;
  let C169;
  let C168;
  const _confirm = dart.privateName(buy_offer, "_confirm");
  let C171;
  let C174;
  let C175;
  let C173;
  let C172;
  let C178;
  let C179;
  let C177;
  let C176;
  let C182;
  let C183;
  let C184;
  let C185;
  let C181;
  let C180;
  let C188;
  let C187;
  let C186;
  let C191;
  let C190;
  let C189;
  let C194;
  let C195;
  let C193;
  let C192;
  let C198;
  let C199;
  let C197;
  let C196;
  let C202;
  let C203;
  let C201;
  let C200;
  let C206;
  let C205;
  let C204;
  let C209;
  let C210;
  let C208;
  let C207;
  let C213;
  let C214;
  let C215;
  let C216;
  let C212;
  let C211;
  let C219;
  let C218;
  let C217;
  let C222;
  let C221;
  let C220;
  let C225;
  let C224;
  let C223;
  let C228;
  let C229;
  let C227;
  let C226;
  let C232;
  let C231;
  let C230;
  let C235;
  let C236;
  let C234;
  let C233;
  let C239;
  let C240;
  let C238;
  let C237;
  let C243;
  let C244;
  let C242;
  let C241;
  const _submitOffer = dart.privateName(buy_offer, "_submitOffer");
  let C247;
  let C248;
  let C246;
  let C245;
  let C251;
  let C252;
  let C250;
  let C249;
  let C255;
  let C256;
  let C257;
  let C254;
  let C253;
  buy_offer._BuyOfferState = class _BuyOfferState extends framework.State$(buy_offer.BuyOffer) {
    initState() {
      super.initState();
      this[_checkIfValidBuyer]();
    }
    [_checkIfValidBuyer]() {
      return async.async(dart.dynamic, (function* _checkIfValidBuyer() {
        this.account = (yield prefs.Prefs.getAccount());
        if (this.account.identifier == this.widget.offer.supplier.identifier) {
          this[_exit]();
        }
        if (this.account.identifier == this.widget.offer.customer.identifier) {
          this[_exit]();
        }
        if (this.account.identifier == this.widget.offer.investor.identifier) {
        }
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    build(context) {
      return new scaffold.Scaffold.new({key: this[_key], appBar: new app_bar.AppBar.new({title: new text.Text.new("Buy Invoice Offer", {$creationLocationd_0dea112b090073317d4: C0 || CT.C0}), bottom: new preferred_size.PreferredSize.new({child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.Center.new({child: new basic.Padding.new({padding: C3 || CT.C3, child: this.account == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C4 || CT.C4}) : new buy_offer.NameBadge.new({account: this.account, elevation: 0.5, nodeStyle: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C6 || CT.C6}), $creationLocationd_0dea112b090073317d4: C11 || CT.C11}), $creationLocationd_0dea112b090073317d4: C15 || CT.C15}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C18 || CT.C18}), new (StreamBuilderOfString()).new({stream: StreamOfString()._check(bloc.bfnBloc.fcmStream), initialData: "No network message yet", builder: dart.fn((context, snapshot) => {
                    if (dart.test(snapshot.hasData)) {
                      print.debugPrint(" 😡  😡  😡  😡  FCM message arrived on Stream: " + dart.str(snapshot.data) + "  😡  😡  😡  😡 ");
                      this.message = snapshot.data;
                    }
                    return new text.Text.new(dart.str(this.message), {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C21 || CT.C21});
                  }, BuildContextAndAsyncSnapshotOfStringToText()), $creationLocationd_0dea112b090073317d4: C25 || CT.C25}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C30 || CT.C30})]), $creationLocationd_0dea112b090073317d4: C33 || CT.C33}), preferredSize: new ui.Size.fromHeight(140.0), $creationLocationd_0dea112b090073317d4: C36 || CT.C36}), $creationLocationd_0dea112b090073317d4: C40 || CT.C40}), backgroundColor: colors.Colors.brown._get(100), body: new basic.Padding.new({padding: C44 || CT.C44, child: new scroll_view.ListView.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C45 || CT.C45}), new card.Card.new({elevation: 2.0, child: new basic.Padding.new({padding: C44 || CT.C44, child: new basic.Padding.new({padding: C48 || CT.C48, child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C49 || CT.C49}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Customer", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C52 || CT.C52}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C56 || CT.C56}), new text.Text.new(this.widget.offer.customer.name, {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C59 || CT.C59})]), $creationLocationd_0dea112b090073317d4: C63 || CT.C63}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C66 || CT.C66}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Supplier", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C69 || CT.C69}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C73 || CT.C73}), new text.Text.new(this.widget.offer.supplier.name, {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C76 || CT.C76})]), $creationLocationd_0dea112b090073317d4: C80 || CT.C80}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C83 || CT.C83}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Buyer", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C86 || CT.C86}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C90 || CT.C90}), new text.Text.new(this.widget.offer.investor.name, {style: functions.Styles.blueBoldSmall, $creationLocationd_0dea112b090073317d4: C93 || CT.C93})]), $creationLocationd_0dea112b090073317d4: C97 || CT.C97}), new basic.SizedBox.new({height: 24.0, $creationLocationd_0dea112b090073317d4: C100 || CT.C100}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Invoice Amount", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C103 || CT.C103}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C107 || CT.C107}), new text.Text.new(this.getCurrency(this.widget.offer.originalAmount, context), {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C110 || CT.C110})]), $creationLocationd_0dea112b090073317d4: C114 || CT.C114}), new basic.SizedBox.new({height: 28.0, $creationLocationd_0dea112b090073317d4: C117 || CT.C117}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Discount", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C120 || CT.C120}), new basic.SizedBox.new({width: 24.0, $creationLocationd_0dea112b090073317d4: C124 || CT.C124}), new text.Text.new(dart.str(this.getCurrency(this.widget.offer.discount, context)) + " %", {style: functions.Styles.tealBoldLarge, $creationLocationd_0dea112b090073317d4: C127 || CT.C127})]), $creationLocationd_0dea112b090073317d4: C131 || CT.C131}), new basic.SizedBox.new({height: 24.0, $creationLocationd_0dea112b090073317d4: C134 || CT.C134}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Amount", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C137 || CT.C137}), new basic.SizedBox.new({width: 16.0, $creationLocationd_0dea112b090073317d4: C141 || CT.C141}), new text.Text.new(this.getCurrency(this.widget.offer.offerAmount, context), {style: functions.Styles.blackBoldLarge, $creationLocationd_0dea112b090073317d4: C144 || CT.C144})]), $creationLocationd_0dea112b090073317d4: C148 || CT.C148}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C151 || CT.C151}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Offered", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C154 || CT.C154}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C158 || CT.C158}), new text.Text.new(functions.getFormattedDateShortWithTime(this.widget.offer.offerDate, context), {style: functions.Styles.blueSmall, $creationLocationd_0dea112b090073317d4: C161 || CT.C161})]), $creationLocationd_0dea112b090073317d4: C165 || CT.C165}), new basic.SizedBox.new({height: 40.0, $creationLocationd_0dea112b090073317d4: C168 || CT.C168}), new raised_button.RaisedButton.new({onPressed: dart.bind(this, _confirm), elevation: 8.0, color: theme.Theme.of(context).primaryColor, child: new basic.Padding.new({padding: C171 || CT.C171, child: new text.Text.new("Submit Buy Instruction", {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C172 || CT.C172}), $creationLocationd_0dea112b090073317d4: C176 || CT.C176}), $creationLocationd_0dea112b090073317d4: C180 || CT.C180}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C186 || CT.C186})]), $creationLocationd_0dea112b090073317d4: C189 || CT.C189}), $creationLocationd_0dea112b090073317d4: C192 || CT.C192}), $creationLocationd_0dea112b090073317d4: C196 || CT.C196}), $creationLocationd_0dea112b090073317d4: C200 || CT.C200})]), $creationLocationd_0dea112b090073317d4: C204 || CT.C204}), $creationLocationd_0dea112b090073317d4: C207 || CT.C207}), $creationLocationd_0dea112b090073317d4: C211 || CT.C211});
    }
    getCurrency(amt, context) {
      return functions.getFormattedAmount(dart.toString(amt), context);
    }
    [_exit]() {
      navigator.Navigator.pop(core.Object, this.context);
    }
    [_confirm]() {
      dialog.showDialog(dart.dynamic, {context: this.context, builder: dart.fn(context => new dialog.AlertDialog.new({title: new text.Text.new("Purchase Confirmation", {$creationLocationd_0dea112b090073317d4: C217 || CT.C217}), content: new container.Container.new({height: 180.0, child: new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new("Please confirm your purchase instruction. You will be notified when the transaction is sucessful. Sometimes someone else may have bought this offer just before you did", {$creationLocationd_0dea112b090073317d4: C220 || CT.C220}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C223 || CT.C223}), new text.Text.new(this.getCurrency(this.widget.offer.offerAmount, context), {style: functions.Styles.blackBoldLarge, $creationLocationd_0dea112b090073317d4: C226 || CT.C226})]), $creationLocationd_0dea112b090073317d4: C230 || CT.C230}), $creationLocationd_0dea112b090073317d4: C233 || CT.C233}), actions: JSArrayOfWidget().of([new flat_button.FlatButton.new({onPressed: dart.fn(() => {
                navigator.Navigator.pop(core.Object, context);
              }, VoidToNull()), child: new text.Text.new("Cancel", {style: functions.Styles.blueBoldSmall, $creationLocationd_0dea112b090073317d4: C237 || CT.C237}), $creationLocationd_0dea112b090073317d4: C241 || CT.C241}), new flat_button.FlatButton.new({onPressed: dart.fn(() => {
                navigator.Navigator.pop(core.Object, context);
                this[_submitOffer]();
              }, VoidToNull()), child: new text.Text.new("CONFIRM", {style: functions.Styles.pinkBoldMedium, $creationLocationd_0dea112b090073317d4: C245 || CT.C245}), $creationLocationd_0dea112b090073317d4: C249 || CT.C249})]), $creationLocationd_0dea112b090073317d4: C253 || CT.C253}), BuildContextToAlertDialog())});
    }
    [_submitOffer]() {
      return async.async(dart.dynamic, (function* _submitOffer() {
        snack.AppSnackbar.showSnackbarWithProgressIndicator({scaffoldKey: this[_key], message: "Submitting Buy Instruction", textColor: colors.Colors.white, backgroundColor: theme.Theme.of(this.context).primaryColor});
        try {
          let result = (yield net.Net.buyInvoiceOffer(this.widget.offer.invoiceId));
          core.print("👽 👽 👽 👽 👽  result of buyOffer call: " + dart.str(result));
          snack.AppSnackbar.showSnackbarWithAction({scaffoldKey: this[_key], message: "Submission completed OK", textColor: colors.Colors.white, action: 1, actionLabel: "OK", listener: this, backgroundColor: colors.Colors.teal._get(900)});
        } catch (e$) {
          let e = dart.getThrown(e$);
          snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: "Submission failed", actionLabel: ""});
        }
      }).bind(this));
    }
    onActionPressed(action) {
      switch (action) {
        case 1:
        {
          navigator.Navigator.pop(core.Object, this.context);
        }
      }
      return null;
    }
  };
  (buy_offer._BuyOfferState.new = function() {
    this.account = null;
    this[_key] = GlobalKeyOfScaffoldState().new();
    this.message = null;
    buy_offer._BuyOfferState.__proto__.new.call(this);
    ;
  }).prototype = buy_offer._BuyOfferState.prototype;
  dart.addTypeTests(buy_offer._BuyOfferState);
  buy_offer._BuyOfferState[dart.implements] = () => [snack.SnackBarListener];
  dart.setMethodSignature(buy_offer._BuyOfferState, () => ({
    __proto__: dart.getMethods(buy_offer._BuyOfferState.__proto__),
    [_checkIfValidBuyer]: dart.fnType(dart.dynamic, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    getCurrency: dart.fnType(core.String, [core.double, framework.BuildContext]),
    [_exit]: dart.fnType(dart.dynamic, []),
    [_confirm]: dart.fnType(dart.void, []),
    [_submitOffer]: dart.fnType(dart.dynamic, []),
    onActionPressed: dart.fnType(dart.dynamic, [core.int])
  }));
  dart.setLibraryUri(buy_offer._BuyOfferState, "package:bfnmobile/ui/buy_offer.dart");
  dart.setFieldSignature(buy_offer._BuyOfferState, () => ({
    __proto__: dart.getFields(buy_offer._BuyOfferState.__proto__),
    account: dart.fieldType(account.AccountInfo),
    [_key]: dart.fieldType(framework.GlobalKey$(scaffold.ScaffoldState)),
    message: dart.fieldType(core.String)
  }));
  let C258;
  let C261;
  let C262;
  let C260;
  let C259;
  let C265;
  let C264;
  let C263;
  let C268;
  let C269;
  let C267;
  let C266;
  let C272;
  let C271;
  let C270;
  let C275;
  let C274;
  let C273;
  let C278;
  let C279;
  let C277;
  let C276;
  const account$ = dart.privateName(buy_offer, "NameBadge.account");
  const textColor$ = dart.privateName(buy_offer, "NameBadge.textColor");
  const backgroundColor$ = dart.privateName(buy_offer, "NameBadge.backgroundColor");
  const elevation$ = dart.privateName(buy_offer, "NameBadge.elevation");
  const nameStyle$ = dart.privateName(buy_offer, "NameBadge.nameStyle");
  const nodeStyle$ = dart.privateName(buy_offer, "NameBadge.nodeStyle");
  buy_offer.NameBadge = class NameBadge extends framework.StatelessWidget {
    get account() {
      return this[account$];
    }
    set account(value) {
      super.account = value;
    }
    get textColor() {
      return this[textColor$];
    }
    set textColor(value) {
      super.textColor = value;
    }
    get backgroundColor() {
      return this[backgroundColor$];
    }
    set backgroundColor(value) {
      super.backgroundColor = value;
    }
    get elevation() {
      return this[elevation$];
    }
    set elevation(value) {
      super.elevation = value;
    }
    get nameStyle() {
      return this[nameStyle$];
    }
    set nameStyle(value) {
      super.nameStyle = value;
    }
    get nodeStyle() {
      return this[nodeStyle$];
    }
    set nodeStyle(value) {
      super.nodeStyle = value;
    }
    build(context) {
      let loc = new core.StringBuffer.new();
      let mList = this.account.host[$split](",");
      mList[$forEach](dart.fn(m => {
        let xList = m[$split]("=");
        loc.write(dart.notNull(xList[$elementAt](1)) + " ");
      }, StringToNull()));
      let node = loc.toString();
      return new basic.Padding.new({padding: C258 || CT.C258, child: new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new(this.account.name, {style: this.nameStyle == null ? functions.Styles.blackBoldSmall : this.nameStyle, $creationLocationd_0dea112b090073317d4: C259 || CT.C259}), new basic.SizedBox.new({height: 4.0, $creationLocationd_0dea112b090073317d4: C263 || CT.C263}), new text.Text.new(node, {style: this.nodeStyle == null ? functions.Styles.blackSmall : this.nodeStyle, $creationLocationd_0dea112b090073317d4: C266 || CT.C266}), new basic.SizedBox.new({height: 4.0, $creationLocationd_0dea112b090073317d4: C270 || CT.C270})]), $creationLocationd_0dea112b090073317d4: C273 || CT.C273}), $creationLocationd_0dea112b090073317d4: C276 || CT.C276});
    }
  };
  (buy_offer.NameBadge.new = function(opts) {
    let account = opts && 'account' in opts ? opts.account : null;
    let textColor = opts && 'textColor' in opts ? opts.textColor : null;
    let nameStyle = opts && 'nameStyle' in opts ? opts.nameStyle : null;
    let nodeStyle = opts && 'nodeStyle' in opts ? opts.nodeStyle : null;
    let backgroundColor = opts && 'backgroundColor' in opts ? opts.backgroundColor : null;
    let elevation = opts && 'elevation' in opts ? opts.elevation : null;
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[account$] = account;
    this[textColor$] = textColor;
    this[nameStyle$] = nameStyle;
    this[nodeStyle$] = nodeStyle;
    this[backgroundColor$] = backgroundColor;
    this[elevation$] = elevation;
    buy_offer.NameBadge.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = buy_offer.NameBadge.prototype;
  dart.addTypeTests(buy_offer.NameBadge);
  dart.setMethodSignature(buy_offer.NameBadge, () => ({
    __proto__: dart.getMethods(buy_offer.NameBadge.__proto__),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setLibraryUri(buy_offer.NameBadge, "package:bfnmobile/ui/buy_offer.dart");
  dart.setFieldSignature(buy_offer.NameBadge, () => ({
    __proto__: dart.getFields(buy_offer.NameBadge.__proto__),
    account: dart.finalFieldType(account.AccountInfo),
    textColor: dart.finalFieldType(ui.Color),
    backgroundColor: dart.finalFieldType(ui.Color),
    elevation: dart.finalFieldType(core.double),
    nameStyle: dart.finalFieldType(text_style.TextStyle),
    nodeStyle: dart.finalFieldType(text_style.TextStyle)
  }));
  dart.trackLibraries("packages/bfnmobile/ui/buy_offer", {
    "package:bfnmobile/ui/buy_offer.dart": buy_offer
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["buy_offer.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAaqB;;;;;;;AAKa;IAAgB;;qCAHlC;;;AAAd;;EAAoB;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAWD,MAAX;AACc,MAApB;IACF;;AAEkB;AACkB,QAAlC,gBAAU,MAAY;AAEtB,YAAI,AAAQ,AAAW,2BAAG,AAAO,AAAM,AAAS;AAEvC,UAAP;;AAEF,YAAI,AAAQ,AAAW,2BAAG,AAAO,AAAM,AAAS;AAEvC,UAAP;;AAEF,YAAI,AAAQ,AAAW,2BAAG,AAAO,AAAM,AAAS;;AAGjC,QAAf,cAAS;;MACX;;UAI0B;AACxB,YAAO,iCACA,oBACG,+BACC,kBAAK,qFACJ,6CACG,gCACa,sBAChB,6BACS,oDAEE,AAAQ,gBAAG,OACZ,qFACA,sCACW,yBACE,gBACO,sMAI9B,gCACU,+DAEV,mEACY,AAAQ,sCACH,mCACJ,SAAC,SAAS;AACjB,kCAAI,AAAS,QAAD;AAE8E,sBADxF,AAAU,iBACN,AAAmF,0DAAhC,AAAS,QAAD,SAAM;AAC9C,sBAAvB,eAAU,AAAS,QAAD;;AAEpB,0BAAO,mBACK,SAAR,uBACY;6HAGtB,gCAAiB,yIAGD,uBAAW,2IAEb,AAAK,yBAAC,YACxB,sDAEG,wCACa,sBAChB,gCACU,+DAEV,8BACa,YACJ,sDAEE,sDAEE,gCACa,sBAChB,gCACU,8DAEV,6BACoB,sBAChB,kBACE,oBACc,0FAEhB,+BACS,8DAET,kBACE,AAAO,AAAM,AAAS,yCACR,sJAIpB,gCACU,8DAEV,6BACoB,sBAChB,kBACE,oBACc,0FAEhB,+BACS,8DAET,kBACE,AAAO,AAAM,AAAS,yCACR,sJAIpB,gCACU,8DAEV,6BACoB,sBAChB,kBACE,iBACc,0FAEhB,+BACS,8DAET,kBACE,AAAO,AAAM,AAAS,yCACR,oJAIpB,gCACU,iEAEV,6BACoB,sBAChB,kBACE,0BACc,4FAEhB,+BACS,gEAET,kBACE,iBAAY,AAAO,AAAM,kCAAgB,OAAO,WAClC,yJAIpB,gCACU,iEAEV,6BACoB,sBAChB,kBACE,oBACc,4FAEhB,+BACS,iEAET,kBACoD,SAA/C,iBAAY,AAAO,AAAM,4BAAU,OAAO,KAAE,cACjC,wJAIpB,gCACU,iEAEV,6BACoB,sBAChB,kBACE,kBACc,4FAEhB,+BACS,iEAET,kBACE,iBAAY,AAAO,AAAM,+BAAa,OAAO,WAC/B,yJAIpB,gCACU,gEAEV,6BACoB,sBAChB,kBACE,mBACc,4FAEhB,+BACS,gEAET,kBACE,wCACI,AAAO,AAAM,6BAAW,OAAO,WACrB,oJAIpB,gCACU,iEAEV,yDACa,4BACA,YACE,AAAY,eAAT,OAAO,uBAChB,wDAEE,kBACL,kCACc,8MAIpB,gCACU;IAW9B;gBAE0B,KAAkB;AAC1C,YAAO,8BAAuB,cAAJ,GAAG,GAAa,OAAO;IACnD;;AAGwB,MAAZ,qCAAI;IAChB;;AA8CQ,MA3CN,0CACa,uBACA,QAAC,WACD,mCACE,kBAAK,8FACH,qCACC,cACD,gCACa,sBAChB,kBACI,uOACJ,gCACU,iEAEV,kBACE,iBAAY,AAAO,AAAM,+BAAa,OAAO,WAC/B,6NAKL,sBACf,2CACa;AACa,gBAAZ,qCAAI,OAAO;uCAEhB,kBACL,kBACc,sJAGlB,2CACa;AACa,gBAAZ,qCAAI,OAAO;AACP,gBAAd;uCAEK,kBACL,mBACc;IAM9B;;AAEY;AAK0C,QAJxC,kEACK,qBACJ,yCACS,sCACK,AAAY,eAAT;AAC9B;AACM,wBAAS,MAAU,wBAAgB,AAAO,AAAM;AACK,UAAzD,WAAM,AAAkD,kDAAP,MAAM;AASjB,UAP1B,uDACK,qBACJ,sCACS,6BACV,gBACK,gBACH,uBACc,AAAI,wBAAC;;cAC1B;AAE8D,UADzD,kDACK,qBAAe,kCAAkC;;MAEtE;;oBAGoB;AAClB,cAAQ,MAAM;;;AAEY,UAAZ,qCAAI;;;AAElB,YAAO;IACT;;;IAvUY;IACR,aAAO;IAwBJ;;;EA+ST;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAGoB;;;;;;IACN;;;;;;IAAW;;;;;;IACV;;;;;;IACG;;;;;;IAAW;;;;;;UAWD;AACX,gBAAM;AACf,kBAAQ,AAAQ,AAAK,0BAAM;AAI7B,MAHF,AAAM,KAAD,WAAS,QAAC;AACT,oBAAQ,AAAE,CAAD,SAAO;AACe,QAAnC,AAAI,GAAD,OAA0B,aAAnB,AAAM,KAAD,aAAW,MAAK;;AAE7B,iBAAO,AAAI,GAAD;AACd,YAAO,yDAEE,gCACa,sBAChB,kBACE,AAAQ,2BACD,AAAU,kBAAG,OAAc,kCAAiB,2EAErD,gCACU,gEAEV,kBACE,IAAI,UACG,AAAU,kBAAG,OAAc,8BAAa,2EAEjD,gCACU;IAKlB;;;QArCoB;QACX;QACA;QACA;QACA;QACA;;IALW;IACX;IACA;IACA;IACA;IACA;AANT;;EAMoB","file":"buy_offer.ddc.js"}');
  // Exports:
  return {
    ui__buy_offer: buy_offer
  };
});

//# sourceMappingURL=buy_offer.ddc.js.map
