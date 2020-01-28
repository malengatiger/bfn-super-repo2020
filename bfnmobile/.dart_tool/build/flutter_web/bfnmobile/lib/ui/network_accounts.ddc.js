define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/flutter/material', 'packages/bfnlibrary/data/account', 'packages/bfnlibrary/util/net', 'packages/flutter/src/painting/_network_image_web', 'packages/bfnlibrary/util/functions', 'packages/flutter/src/rendering/animated_size'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__flutter__material, packages__bfnlibrary__data__account, packages__bfnlibrary__util__net, packages__flutter__src__painting___network_image_web, packages__bfnlibrary__util__functions, packages__flutter__src__rendering__animated_size) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const async = dart_sdk.async;
  const ui = dart_sdk.ui;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const focus_scope = packages__flutter__src__widgets__actions.src__widgets__focus_scope;
  const focus_manager = packages__flutter__src__widgets__actions.src__widgets__focus_manager;
  const text = packages__flutter__src__widgets__actions.src__widgets__text;
  const widget_inspector = packages__flutter__src__widgets__actions.src__widgets__widget_inspector;
  const preferred_size = packages__flutter__src__widgets__actions.src__widgets__preferred_size;
  const icon = packages__flutter__src__widgets__actions.src__widgets__icon;
  const scroll_view = packages__flutter__src__widgets__actions.src__widgets__scroll_view;
  const basic = packages__flutter__src__widgets__actions.src__widgets__basic;
  const navigator = packages__flutter__src__widgets__actions.src__widgets__navigator;
  const scaffold = packages__flutter__material.src__material__scaffold;
  const app_bar = packages__flutter__material.src__material__app_bar;
  const icon_button = packages__flutter__material.src__material__icon_button;
  const icons = packages__flutter__material.src__material__icons;
  const colors = packages__flutter__material.src__material__colors;
  const card = packages__flutter__material.src__material__card;
  const list_tile = packages__flutter__material.src__material__list_tile;
  const text_field = packages__flutter__material.src__material__text_field;
  const input_decorator = packages__flutter__material.src__material__input_decorator;
  const account = packages__bfnlibrary__data__account.data__account;
  const net = packages__bfnlibrary__util__net.util__net;
  const edge_insets = packages__flutter__src__painting___network_image_web.src__painting__edge_insets;
  const functions = packages__bfnlibrary__util__functions.util__functions;
  const flex = packages__flutter__src__rendering__animated_size.src__rendering__flex;
  const network_accounts = Object.create(dart.library);
  const $compareTo = dartx.compareTo;
  const $sort = dartx.sort;
  const $length = dartx.length;
  const $isEmpty = dartx.isEmpty;
  const $clear = dartx.clear;
  const $toLowerCase = dartx.toLowerCase;
  const $contains = dartx.contains;
  const $add = dartx.add;
  const $forEach = dartx.forEach;
  const $elementAt = dartx.elementAt;
  let GlobalKeyOfScaffoldState = () => (GlobalKeyOfScaffoldState = dart.constFn(framework.GlobalKey$(scaffold.ScaffoldState)))();
  let JSArrayOfAccountInfo = () => (JSArrayOfAccountInfo = dart.constFn(_interceptors.JSArray$(account.AccountInfo)))();
  let AccountInfoAndAccountInfoToint = () => (AccountInfoAndAccountInfoToint = dart.constFn(dart.fnType(core.int, [account.AccountInfo, account.AccountInfo])))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let AccountInfoToNull = () => (AccountInfoToNull = dart.constFn(dart.fnType(core.Null, [account.AccountInfo])))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let BuildContextAndintToPadding = () => (BuildContextAndintToPadding = dart.constFn(dart.fnType(basic.Padding, [framework.BuildContext, core.int])))();
  let StringToNull = () => (StringToNull = dart.constFn(dart.fnType(core.Null, [core.String])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 68,
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
        [_Location_line]: 68,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 30,
        [_Location_line]: 72,
        [_Location_file]: null
      });
    },
    get C4() {
      return C4 = dart.constList([C5 || CT.C5], widget_inspector._Location);
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C4 || CT.C4,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 72,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 13,
        [_Location_line]: 72,
        [_Location_file]: null
      });
    },
    get C9() {
      return C9 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 13,
        [_Location_line]: 73,
        [_Location_file]: null
      });
    },
    get C7() {
      return C7 = dart.constList([C8 || CT.C8, C9 || CT.C9], widget_inspector._Location);
    },
    get C6() {
      return C6 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C7 || CT.C7,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 71,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C12() {
      return C12 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 9,
        [_Location_line]: 68,
        [_Location_file]: null
      });
    },
    get C13() {
      return C13 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 9,
        [_Location_line]: 69,
        [_Location_file]: null
      });
    },
    get C14() {
      return C14 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "actions",
        [_Location_column]: 9,
        [_Location_line]: 70,
        [_Location_file]: null
      });
    },
    get C11() {
      return C11 = dart.constList([C12 || CT.C12, C13 || CT.C13, C14 || CT.C14], widget_inspector._Location);
    },
    get C10() {
      return C10 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C11 || CT.C11,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 67,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C15() {
      return C15 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 8
      });
    },
    get C18() {
      return C18 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 27,
        [_Location_line]: 87,
        [_Location_file]: null
      });
    },
    get C19() {
      return C19 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 21,
        [_Location_line]: 88,
        [_Location_file]: null
      });
    },
    get C17() {
      return C17 = dart.constList([C18 || CT.C18, C19 || CT.C19], widget_inspector._Location);
    },
    get C16() {
      return C16 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C17 || CT.C17,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 86,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C22() {
      return C22 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 55,
        [_Location_line]: 91,
        [_Location_file]: null
      });
    },
    get C23() {
      return C23 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 92,
        [_Location_file]: null
      });
    },
    get C21() {
      return C21 = dart.constList([C22 || CT.C22, C23 || CT.C23], widget_inspector._Location);
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C21 || CT.C21,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 90,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C26() {
      return C26 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 68,
        [_Location_line]: 94,
        [_Location_file]: null
      });
    },
    get C25() {
      return C25 = dart.constList([C26 || CT.C26], widget_inspector._Location);
    },
    get C24() {
      return C24 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C25 || CT.C25,
        [_Location_name]: null,
        [_Location_column]: 29,
        [_Location_line]: 94,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C29() {
      return C29 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "leading",
        [_Location_column]: 19,
        [_Location_line]: 86,
        [_Location_file]: null
      });
    },
    get C30() {
      return C30 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 19,
        [_Location_line]: 90,
        [_Location_file]: null
      });
    },
    get C31() {
      return C31 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "subtitle",
        [_Location_column]: 19,
        [_Location_line]: 94,
        [_Location_file]: null
      });
    },
    get C32() {
      return C32 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onTap",
        [_Location_column]: 19,
        [_Location_line]: 95,
        [_Location_file]: null
      });
    },
    get C28() {
      return C28 = dart.constList([C29 || CT.C29, C30 || CT.C30, C31 || CT.C31, C32 || CT.C32], widget_inspector._Location);
    },
    get C27() {
      return C27 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C28 || CT.C28,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 85,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C35() {
      return C35 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 17,
        [_Location_line]: 84,
        [_Location_file]: null
      });
    },
    get C36() {
      return C36 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 85,
        [_Location_file]: null
      });
    },
    get C34() {
      return C34 = dart.constList([C35 || CT.C35, C36 || CT.C36], widget_inspector._Location);
    },
    get C33() {
      return C33 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C34 || CT.C34,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 83,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C39() {
      return C39 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 15,
        [_Location_line]: 82,
        [_Location_file]: null
      });
    },
    get C40() {
      return C40 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 83,
        [_Location_file]: null
      });
    },
    get C38() {
      return C38 = dart.constList([C39 || CT.C39, C40 || CT.C40], widget_inspector._Location);
    },
    get C37() {
      return C37 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C38 || CT.C38,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 81,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C43() {
      return C43 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemCount",
        [_Location_column]: 11,
        [_Location_line]: 79,
        [_Location_file]: null
      });
    },
    get C44() {
      return C44 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemBuilder",
        [_Location_column]: 11,
        [_Location_line]: 80,
        [_Location_file]: null
      });
    },
    get C42() {
      return C42 = dart.constList([C43 || CT.C43, C44 || CT.C44], widget_inspector._Location);
    },
    get C41() {
      return C41 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C42 || CT.C42,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 78,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C47() {
      return C47 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 7,
        [_Location_line]: 66,
        [_Location_file]: null
      });
    },
    get C48() {
      return C48 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 7,
        [_Location_line]: 67,
        [_Location_file]: null
      });
    },
    get C49() {
      return C49 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 7,
        [_Location_line]: 77,
        [_Location_file]: null
      });
    },
    get C50() {
      return C50 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 7,
        [_Location_line]: 78,
        [_Location_file]: null
      });
    },
    get C46() {
      return C46 = dart.constList([C47 || CT.C47, C48 || CT.C48, C49 || CT.C49, C50 || CT.C50], widget_inspector._Location);
    },
    get C45() {
      return C45 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C46 || CT.C46,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 65,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C52() {
      return C52 = dart.constList([], widget_inspector._Location);
    },
    get C51() {
      return C51 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C52 || CT.C52,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 110,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C53() {
      return C53 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 20,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 20
      });
    },
    get C54() {
      return C54 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 0,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 16
      });
    },
    get C57() {
      return C57 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 41,
        [_Location_line]: 124,
        [_Location_file]: null
      });
    },
    get C58() {
      return C58 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 35,
        [_Location_line]: 125,
        [_Location_file]: null
      });
    },
    get C56() {
      return C56 = dart.constList([C57 || CT.C57, C58 || CT.C58], widget_inspector._Location);
    },
    get C55() {
      return C55 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C56 || CT.C56,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 123,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C61() {
      return C61 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 33,
        [_Location_line]: 123,
        [_Location_file]: null
      });
    },
    get C62() {
      return C62 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 33,
        [_Location_line]: 127,
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
        [_Location_column]: 39,
        [_Location_line]: 122,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C65() {
      return C65 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 120,
        [_Location_file]: null
      });
    },
    get C66() {
      return C66 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 27,
        [_Location_line]: 121,
        [_Location_file]: null
      });
    },
    get C67() {
      return C67 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onChanged",
        [_Location_column]: 27,
        [_Location_line]: 130,
        [_Location_file]: null
      });
    },
    get C64() {
      return C64 = dart.constList([C65 || CT.C65, C66 || CT.C66, C67 || CT.C67], widget_inspector._Location);
    },
    get C63() {
      return C63 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C64 || CT.C64,
        [_Location_name]: null,
        [_Location_column]: 32,
        [_Location_line]: 119,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C70() {
      return C70 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 25,
        [_Location_line]: 118,
        [_Location_file]: null
      });
    },
    get C71() {
      return C71 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 25,
        [_Location_line]: 119,
        [_Location_file]: null
      });
    },
    get C69() {
      return C69 = dart.constList([C70 || CT.C70, C71 || CT.C71], widget_inspector._Location);
    },
    get C68() {
      return C68 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C69 || CT.C69,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 117,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C74() {
      return C74 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 23,
        [_Location_line]: 116,
        [_Location_file]: null
      });
    },
    get C75() {
      return C75 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 117,
        [_Location_file]: null
      });
    },
    get C73() {
      return C73 = dart.constList([C74 || CT.C74, C75 || CT.C75], widget_inspector._Location);
    },
    get C72() {
      return C72 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C73 || CT.C73,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 115,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C78() {
      return C78 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 21,
        [_Location_line]: 114,
        [_Location_file]: null
      });
    },
    get C79() {
      return C79 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 115,
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
        [_Location_column]: 19,
        [_Location_line]: 113,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C80() {
      return C80 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 8,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 8
      });
    },
    get C83() {
      return C83 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 27,
        [_Location_line]: 144,
        [_Location_file]: null
      });
    },
    get C84() {
      return C84 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 145,
        [_Location_file]: null
      });
    },
    get C82() {
      return C82 = dart.constList([C83 || CT.C83, C84 || CT.C84], widget_inspector._Location);
    },
    get C81() {
      return C81 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C82 || CT.C82,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 143,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C87() {
      return C87 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 27,
        [_Location_line]: 148,
        [_Location_file]: null
      });
    },
    get C86() {
      return C86 = dart.constList([C87 || CT.C87], widget_inspector._Location);
    },
    get C85() {
      return C85 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C86 || CT.C86,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 147,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C90() {
      return C90 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 55,
        [_Location_line]: 151,
        [_Location_file]: null
      });
    },
    get C91() {
      return C91 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 152,
        [_Location_file]: null
      });
    },
    get C89() {
      return C89 = dart.constList([C90 || CT.C90, C91 || CT.C91], widget_inspector._Location);
    },
    get C88() {
      return C88 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C89 || CT.C89,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 150,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C94() {
      return C94 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 27,
        [_Location_line]: 155,
        [_Location_file]: null
      });
    },
    get C93() {
      return C93 = dart.constList([C94 || CT.C94], widget_inspector._Location);
    },
    get C92() {
      return C92 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C93 || CT.C93,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 154,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C97() {
      return C97 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 27,
        [_Location_line]: 158,
        [_Location_file]: null
      });
    },
    get C98() {
      return C98 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 159,
        [_Location_file]: null
      });
    },
    get C96() {
      return C96 = dart.constList([C97 || CT.C97, C98 || CT.C98], widget_inspector._Location);
    },
    get C95() {
      return C95 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C96 || CT.C96,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 157,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C101() {
      return C101 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 27,
        [_Location_line]: 162,
        [_Location_file]: null
      });
    },
    get C100() {
      return C100 = dart.constList([C101 || CT.C101], widget_inspector._Location);
    },
    get C99() {
      return C99 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C100 || CT.C100,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 161,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C104() {
      return C104 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 47,
        [_Location_line]: 165,
        [_Location_file]: null
      });
    },
    get C105() {
      return C105 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 166,
        [_Location_file]: null
      });
    },
    get C103() {
      return C103 = dart.constList([C104 || CT.C104, C105 || CT.C105], widget_inspector._Location);
    },
    get C102() {
      return C102 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C103 || CT.C103,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 164,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C108() {
      return C108 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 27,
        [_Location_line]: 169,
        [_Location_file]: null
      });
    },
    get C107() {
      return C107 = dart.constList([C108 || CT.C108], widget_inspector._Location);
    },
    get C106() {
      return C106 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C107 || CT.C107,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 168,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C111() {
      return C111 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "mainAxisAlignment",
        [_Location_column]: 23,
        [_Location_line]: 141,
        [_Location_file]: null
      });
    },
    get C112() {
      return C112 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 23,
        [_Location_line]: 142,
        [_Location_file]: null
      });
    },
    get C110() {
      return C110 = dart.constList([C111 || CT.C111, C112 || CT.C112], widget_inspector._Location);
    },
    get C109() {
      return C109 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C110 || CT.C110,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 140,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C115() {
      return C115 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 21,
        [_Location_line]: 139,
        [_Location_file]: null
      });
    },
    get C116() {
      return C116 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 140,
        [_Location_file]: null
      });
    },
    get C114() {
      return C114 = dart.constList([C115 || CT.C115, C116 || CT.C116], widget_inspector._Location);
    },
    get C113() {
      return C113 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C114 || CT.C114,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 138,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C119() {
      return C119 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 21,
        [_Location_line]: 175,
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
        [_Location_column]: 19,
        [_Location_line]: 174,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C122() {
      return C122 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 17,
        [_Location_line]: 112,
        [_Location_file]: null
      });
    },
    get C121() {
      return C121 = dart.constList([C122 || CT.C122], widget_inspector._Location);
    },
    get C120() {
      return C120 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C121 || CT.C121,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 111,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    },
    get C125() {
      return C125 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 9,
        [_Location_line]: 109,
        [_Location_file]: null
      });
    },
    get C126() {
      return C126 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 9,
        [_Location_line]: 179,
        [_Location_file]: null
      });
    },
    get C124() {
      return C124 = dart.constList([C125 || CT.C125, C126 || CT.C126], widget_inspector._Location);
    },
    get C123() {
      return C123 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C124 || CT.C124,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 108,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/network_accounts.dart"
      });
    }
  });
  network_accounts.NetworkAccountsPage = class NetworkAccountsPage extends framework.StatefulWidget {
    createState() {
      return new network_accounts._NetworkAccountsPageState.new();
    }
  };
  (network_accounts.NetworkAccountsPage.new = function(opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    network_accounts.NetworkAccountsPage.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = network_accounts.NetworkAccountsPage.prototype;
  dart.addTypeTests(network_accounts.NetworkAccountsPage);
  dart.setMethodSignature(network_accounts.NetworkAccountsPage, () => ({
    __proto__: dart.getMethods(network_accounts.NetworkAccountsPage.__proto__),
    createState: dart.fnType(network_accounts._NetworkAccountsPageState, [])
  }));
  dart.setLibraryUri(network_accounts.NetworkAccountsPage, "package:bfnmobile/ui/network_accounts.dart");
  const _key = dart.privateName(network_accounts, "_key");
  const _getAccounts = dart.privateName(network_accounts, "_getAccounts");
  const _dismissKeyboard = dart.privateName(network_accounts, "_dismissKeyboard");
  const _filterAccounts = dart.privateName(network_accounts, "_filterAccounts");
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C1;
  let C0;
  const _getBottom = dart.privateName(network_accounts, "_getBottom");
  let C5;
  let C4;
  let C3;
  let C8;
  let C9;
  let C7;
  let C6;
  let C12;
  let C13;
  let C14;
  let C11;
  let C10;
  const EdgeInsets_bottom = dart.privateName(edge_insets, "EdgeInsets.bottom");
  const EdgeInsets_right = dart.privateName(edge_insets, "EdgeInsets.right");
  const EdgeInsets_top = dart.privateName(edge_insets, "EdgeInsets.top");
  const EdgeInsets_left = dart.privateName(edge_insets, "EdgeInsets.left");
  let C15;
  let C18;
  let C19;
  let C17;
  let C16;
  let C22;
  let C23;
  let C21;
  let C20;
  let C26;
  let C25;
  let C24;
  let C29;
  let C30;
  let C31;
  let C32;
  let C28;
  let C27;
  let C35;
  let C36;
  let C34;
  let C33;
  let C39;
  let C40;
  let C38;
  let C37;
  let C43;
  let C44;
  let C42;
  let C41;
  let C47;
  let C48;
  let C49;
  let C50;
  let C46;
  let C45;
  let C52;
  let C51;
  let C53;
  let C54;
  let C57;
  let C58;
  let C56;
  let C55;
  let C61;
  let C62;
  let C60;
  let C59;
  let C65;
  let C66;
  let C67;
  let C64;
  let C63;
  let C70;
  let C71;
  let C69;
  let C68;
  let C74;
  let C75;
  let C73;
  let C72;
  let C78;
  let C79;
  let C77;
  let C76;
  let C80;
  let C83;
  let C84;
  let C82;
  let C81;
  let C87;
  let C86;
  let C85;
  let C90;
  let C91;
  let C89;
  let C88;
  let C94;
  let C93;
  let C92;
  let C97;
  let C98;
  let C96;
  let C95;
  let C101;
  let C100;
  let C99;
  let C104;
  let C105;
  let C103;
  let C102;
  let C108;
  let C107;
  let C106;
  let C111;
  let C112;
  let C110;
  let C109;
  let C115;
  let C116;
  let C114;
  let C113;
  let C119;
  let C118;
  let C117;
  let C122;
  let C121;
  let C120;
  let C125;
  let C126;
  let C124;
  let C123;
  network_accounts._NetworkAccountsPageState = class _NetworkAccountsPageState extends framework.State$(network_accounts.NetworkAccountsPage) {
    initState() {
      super.initState();
      this[_getAccounts]();
    }
    [_getAccounts]() {
      return async.async(dart.dynamic, (function* _getAccounts() {
        this.accounts = (yield net.Net.getAccounts());
        this.accounts[$sort](dart.fn((a, b) => a.name[$compareTo](b.name), AccountInfoAndAccountInfoToint()));
        if (dart.notNull(this.accounts[$length]) < 101) {
          this.showAllAccounts = true;
          this.filteredAccounts = this.accounts;
        }
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    [_dismissKeyboard]() {
      focus_scope.FocusScope.of(this.context).requestFocus(new focus_manager.FocusNode.new());
    }
    [_filterAccounts]() {
      if (dart.test(this.showAllAccounts)) {
        this.setState(dart.fn(() => {
          this.filteredAccounts = this.accounts;
          this.filteredAccounts[$sort](dart.fn((a, b) => a.name[$compareTo](b.name), AccountInfoAndAccountInfoToint()));
        }, VoidToNull()));
        return;
      }
      if (this.filter[$isEmpty]) {
        this.setState(dart.fn(() => {
          this.filteredAccounts[$clear]();
        }, VoidToNull()));
        return;
      }
      this.filteredAccounts[$clear]();
      this.accounts[$forEach](dart.fn(v => {
        if (v.name[$toLowerCase]()[$contains](this.filter[$toLowerCase]())) {
          this.filteredAccounts[$add](v);
        }
      }, AccountInfoToNull()));
      this.filteredAccounts[$sort](dart.fn((a, b) => a.name[$compareTo](b.name), AccountInfoAndAccountInfoToint()));
      this.setState(dart.fn(() => {
      }, VoidToNull()));
    }
    build(context) {
      return new scaffold.Scaffold.new({key: this[_key], appBar: new app_bar.AppBar.new({title: new text.Text.new("BFN Accounts", {$creationLocationd_0dea112b090073317d4: C0 || CT.C0}), bottom: preferred_size.PreferredSizeWidget._check(this[_getBottom]()), actions: JSArrayOfWidget().of([new icon_button.IconButton.new({icon: new icon.Icon.new(icons.Icons.refresh, {$creationLocationd_0dea112b090073317d4: C3 || CT.C3}), onPressed: dart.bind(this, _getAccounts), $creationLocationd_0dea112b090073317d4: C6 || CT.C6})]), $creationLocationd_0dea112b090073317d4: C10 || CT.C10}), backgroundColor: colors.Colors.brown._get(100), body: new scroll_view.ListView.builder({itemCount: this.filteredAccounts[$length], itemBuilder: dart.fn((context, index) => new basic.Padding.new({padding: C15 || CT.C15, child: new card.Card.new({elevation: 4.0, child: new list_tile.ListTile.new({leading: new icon.Icon.new(icons.Icons.account_circle, {color: colors.Colors.pink, $creationLocationd_0dea112b090073317d4: C16 || CT.C16}), title: new text.Text.new(this.filteredAccounts[$elementAt](index).name, {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C20 || CT.C20}), subtitle: new text.Text.new(this.filteredAccounts[$elementAt](index).host, {$creationLocationd_0dea112b090073317d4: C24 || CT.C24}), onTap: dart.fn(() => {
                  core.print("🍎 🍊 selected account " + dart.str(this.filteredAccounts[$elementAt](index).toJson()));
                  navigator.Navigator.pop(account.AccountInfo, context, this.filteredAccounts[$elementAt](index));
                }, VoidToNull()), $creationLocationd_0dea112b090073317d4: C27 || CT.C27}), $creationLocationd_0dea112b090073317d4: C33 || CT.C33}), $creationLocationd_0dea112b090073317d4: C37 || CT.C37}), BuildContextAndintToPadding()), $creationLocationd_0dea112b090073317d4: C41 || CT.C41}), $creationLocationd_0dea112b090073317d4: C45 || CT.C45});
    }
    [_getBottom]() {
      return new preferred_size.PreferredSize.new({child: dart.test(this.showAllAccounts) ? new basic.Column.new({$creationLocationd_0dea112b090073317d4: C51 || CT.C51}) : new basic.Column.new({children: JSArrayOfWidget().of([new basic.Padding.new({padding: C53 || CT.C53, child: new card.Card.new({elevation: 8.0, child: new basic.Padding.new({padding: C54 || CT.C54, child: new text_field.TextField.new({style: functions.Styles.blackMedium, decoration: new input_decorator.InputDecoration.new({suffix: new icon_button.IconButton.new({icon: new icon.Icon.new(icons.Icons.close, {color: colors.Colors.pink, $creationLocationd_0dea112b090073317d4: C55 || CT.C55}), onPressed: dart.bind(this, _dismissKeyboard), $creationLocationd_0dea112b090073317d4: C59 || CT.C59}), hintText: "Find network account "}), onChanged: dart.fn(val => {
                      this.filter = val;
                      this[_filterAccounts]();
                    }, StringToNull()), $creationLocationd_0dea112b090073317d4: C63 || CT.C63}), $creationLocationd_0dea112b090073317d4: C68 || CT.C68}), $creationLocationd_0dea112b090073317d4: C72 || CT.C72}), $creationLocationd_0dea112b090073317d4: C76 || CT.C76}), new basic.Padding.new({padding: C80 || CT.C80, child: new basic.Row.new({mainAxisAlignment: flex.MainAxisAlignment.end, children: JSArrayOfWidget().of([new text.Text.new("Accounts Found:", {style: functions.Styles.whiteMedium, $creationLocationd_0dea112b090073317d4: C81 || CT.C81}), new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C85 || CT.C85}), new text.Text.new(dart.str(this.filteredAccounts[$length]), {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C88 || CT.C88}), new basic.SizedBox.new({width: 12.0, $creationLocationd_0dea112b090073317d4: C92 || CT.C92}), new text.Text.new("of", {style: functions.Styles.whiteMedium, $creationLocationd_0dea112b090073317d4: C95 || CT.C95}), new basic.SizedBox.new({width: 12.0, $creationLocationd_0dea112b090073317d4: C99 || CT.C99}), new text.Text.new(dart.str(this.accounts[$length]), {style: functions.Styles.whiteBoldMedium, $creationLocationd_0dea112b090073317d4: C102 || CT.C102}), new basic.SizedBox.new({width: 20.0, $creationLocationd_0dea112b090073317d4: C106 || CT.C106})]), $creationLocationd_0dea112b090073317d4: C109 || CT.C109}), $creationLocationd_0dea112b090073317d4: C113 || CT.C113}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C117 || CT.C117})]), $creationLocationd_0dea112b090073317d4: C120 || CT.C120}), preferredSize: new ui.Size.fromHeight(dart.test(this.showAllAccounts) ? 40.0 : 180.0), $creationLocationd_0dea112b090073317d4: C123 || CT.C123});
    }
  };
  (network_accounts._NetworkAccountsPageState.new = function() {
    this[_key] = GlobalKeyOfScaffoldState().new();
    this.accounts = JSArrayOfAccountInfo().of([]);
    this.filteredAccounts = JSArrayOfAccountInfo().of([]);
    this.filter = null;
    this.showFilter = true;
    this.showAllAccounts = false;
    network_accounts._NetworkAccountsPageState.__proto__.new.call(this);
    ;
  }).prototype = network_accounts._NetworkAccountsPageState.prototype;
  dart.addTypeTests(network_accounts._NetworkAccountsPageState);
  dart.setMethodSignature(network_accounts._NetworkAccountsPageState, () => ({
    __proto__: dart.getMethods(network_accounts._NetworkAccountsPageState.__proto__),
    [_getAccounts]: dart.fnType(dart.dynamic, []),
    [_dismissKeyboard]: dart.fnType(dart.void, []),
    [_filterAccounts]: dart.fnType(dart.void, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    [_getBottom]: dart.fnType(framework.Widget, [])
  }));
  dart.setLibraryUri(network_accounts._NetworkAccountsPageState, "package:bfnmobile/ui/network_accounts.dart");
  dart.setFieldSignature(network_accounts._NetworkAccountsPageState, () => ({
    __proto__: dart.getFields(network_accounts._NetworkAccountsPageState.__proto__),
    [_key]: dart.fieldType(framework.GlobalKey$(scaffold.ScaffoldState)),
    accounts: dart.fieldType(core.List$(account.AccountInfo)),
    filteredAccounts: dart.fieldType(core.List$(account.AccountInfo)),
    filter: dart.fieldType(core.String),
    showFilter: dart.fieldType(core.bool),
    showAllAccounts: dart.fieldType(core.bool)
  }));
  dart.trackLibraries("packages/bfnmobile/ui/network_accounts", {
    "package:bfnmobile/ui/network_accounts.dart": network_accounts
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["network_accounts.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAQ6C;IAA2B;;;;;;EACxE;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAWqB,MAAX;AACQ,MAAd;IACF;;AAEY;AACwB,QAAlC,iBAAW,MAAU;AAC4B,QAAjD,AAAS,qBAAK,SAAC,GAAG,MAAM,AAAE,AAAK,CAAN,kBAAgB,AAAE,CAAD;AAC1C,YAAoB,aAAhB,AAAS,0BAAS;AACE,UAAtB,uBAAkB;AACS,UAA3B,wBAAmB;;AAEN,QAAf,cAAS;;MACX;;;AAGsD,MAAzC,AAAY,0BAAT,2BAA0B;IAC1C;;AAGE,oBAAI;AAIA,QAHF,cAAS;AACoB,UAA3B,wBAAmB;AACsC,UAAzD,AAAiB,6BAAK,SAAC,GAAG,MAAM,AAAE,AAAK,CAAN,kBAAgB,AAAE,CAAD;;AAEpD;;AAEF,UAAI,AAAO;AAGP,QAFF,cAAS;AACiB,UAAxB,AAAiB;;AAEnB;;AAEsB,MAAxB,AAAiB;AAKf,MAJF,AAAS,wBAAQ,QAAC;AAChB,YAAI,AAAE,AAAK,AAAc,CAApB,iCAA6B,AAAO;AAChB,UAAvB,AAAiB,4BAAI,CAAC;;;AAG+B,MAAzD,AAAiB,6BAAK,SAAC,GAAG,MAAM,AAAE,AAAK,CAAN,kBAAgB,AAAE,CAAD;AACnC,MAAf,cAAS;;IACX;UAG0B;AACxB,YAAO,iCACA,oBACG,+BACC,kBAAK,0HACJ,8BACS,sBACf,sCACQ,kBAAW,kGACN,wJAIO,AAAK,yBAAC,YACf,6CACA,AAAiB,6CACf,SAAc,SAAa,UAC/B,sDAEE,8BACM,YACJ,qCACI,kBACD,oCACQ,oFAET,kBACL,AAAiB,AAAiB,kCAAP,KAAK,gBAClB,qGAEN,kBAAK,AAAiB,AAAiB,kCAAP,KAAK,yEACxC;AAEsE,kBAD3E,WACI,AAAsE,mCAA5C,AAAiB,AAAiB,kCAAP,KAAK;AACL,kBAA/C,6CAAI,OAAO,EAAE,AAAiB,kCAAU,KAAK;;IAOzE;;AAGE,YAAO,wDACI,wBACD,gFACA,gCACoB,sBAChB,sDAES,8BACM,YACJ,sDAEE,qCACS,0CACF,iDACA,sCACA,kBACE,2BACQ,kGAEL,4FAEH,sCACH,QAAC;AACE,sBAAZ,cAAS,GAAG;AACK,sBAAjB;4QAMV,sDAES,sCACgC,sCACnB,sBAChB,kBACE,2BACc,uFAEhB,+BACS,8DAET,kBAC8B,SAAzB,AAAiB,yCACN,2FAEhB,+BACS,+DAET,kBACE,cACc,uFAEhB,+BACS,+DAET,kBACsB,SAAjB,AAAS,iCACE,6FAEhB,+BACS,yLAKf,gCACU,6IAIA,iCAAW,wBAAkB,OAAK;IAC5D;;;IAvKI,aAAO;IACO,gBAAW;IAAQ,wBAAmB;IACjD;IACF,kBAAa;IACb,uBAAkB;;;EAoKzB","file":"network_accounts.ddc.js"}');
  // Exports:
  return {
    ui__network_accounts: network_accounts
  };
});

//# sourceMappingURL=network_accounts.ddc.js.map
