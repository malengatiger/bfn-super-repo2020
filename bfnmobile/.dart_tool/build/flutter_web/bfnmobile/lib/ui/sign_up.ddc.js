define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/flutter/material', 'packages/firebase_auth/firebase_auth', 'packages/bfnlibrary/data/node_info', 'packages/bfnlibrary/util/net', 'packages/bfnlibrary/util/functions', 'packages/flutter/src/painting/_network_image_web', 'packages/flutter/src/gestures/arena', 'packages/bfnlibrary/util/prefs', 'packages/bfnmobile/bloc', 'packages/bfnlibrary/util/slide_right', 'packages/bfnmobile/ui/dashboard', 'packages/bfnlibrary/util/snack', 'packages/bfnmobile/ui/network_accounts', 'packages/bfnlibrary/data/account'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__flutter__material, packages__firebase_auth__firebase_auth, packages__bfnlibrary__data__node_info, packages__bfnlibrary__util__net, packages__bfnlibrary__util__functions, packages__flutter__src__painting___network_image_web, packages__flutter__src__gestures__arena, packages__bfnlibrary__util__prefs, packages__bfnmobile__bloc, packages__bfnlibrary__util__slide_right, packages__bfnmobile__ui__dashboard, packages__bfnlibrary__util__snack, packages__bfnmobile__ui__network_accounts, packages__bfnlibrary__data__account) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const async = dart_sdk.async;
  const ui = dart_sdk.ui;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const form = packages__flutter__src__widgets__actions.src__widgets__form;
  const text = packages__flutter__src__widgets__actions.src__widgets__text;
  const widget_inspector = packages__flutter__src__widgets__actions.src__widgets__widget_inspector;
  const will_pop_scope = packages__flutter__src__widgets__actions.src__widgets__will_pop_scope;
  const icon = packages__flutter__src__widgets__actions.src__widgets__icon;
  const preferred_size = packages__flutter__src__widgets__actions.src__widgets__preferred_size;
  const basic = packages__flutter__src__widgets__actions.src__widgets__basic;
  const scroll_view = packages__flutter__src__widgets__actions.src__widgets__scroll_view;
  const navigator = packages__flutter__src__widgets__actions.src__widgets__navigator;
  const scaffold = packages__flutter__material.src__material__scaffold;
  const dropdown = packages__flutter__material.src__material__dropdown;
  const app_bar = packages__flutter__material.src__material__app_bar;
  const icons = packages__flutter__material.src__material__icons;
  const icon_button = packages__flutter__material.src__material__icon_button;
  const colors = packages__flutter__material.src__material__colors;
  const card = packages__flutter__material.src__material__card;
  const text_form_field = packages__flutter__material.src__material__text_form_field;
  const input_decorator = packages__flutter__material.src__material__input_decorator;
  const raised_button = packages__flutter__material.src__material__raised_button;
  const firebase_auth = packages__firebase_auth__firebase_auth.firebase_auth;
  const node_info = packages__bfnlibrary__data__node_info.data__node_info;
  const net = packages__bfnlibrary__util__net.util__net;
  const functions = packages__bfnlibrary__util__functions.util__functions;
  const text_style = packages__flutter__src__painting___network_image_web.src__painting__text_style;
  const edge_insets = packages__flutter__src__painting___network_image_web.src__painting__edge_insets;
  const text_input = packages__flutter__src__gestures__arena.src__services__text_input;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const bloc = packages__bfnmobile__bloc.bloc;
  const slide_right = packages__bfnlibrary__util__slide_right.util__slide_right;
  const dashboard = packages__bfnmobile__ui__dashboard.ui__dashboard;
  const snack = packages__bfnlibrary__util__snack.util__snack;
  const network_accounts = packages__bfnmobile__ui__network_accounts.ui__network_accounts;
  const account$ = packages__bfnlibrary__data__account.data__account;
  const sign_up = Object.create(dart.library);
  const $elementAt = dartx.elementAt;
  const $add = dartx.add;
  const $forEach = dartx.forEach;
  const $length = dartx.length;
  const $isEmpty = dartx.isEmpty;
  const $toString = dartx.toString;
  let GlobalKeyOfScaffoldState = () => (GlobalKeyOfScaffoldState = dart.constFn(framework.GlobalKey$(scaffold.ScaffoldState)))();
  let GlobalKeyOfFormState = () => (GlobalKeyOfFormState = dart.constFn(framework.GlobalKey$(form.FormState)))();
  let JSArrayOfNodeInfo = () => (JSArrayOfNodeInfo = dart.constFn(_interceptors.JSArray$(node_info.NodeInfo)))();
  let DropdownMenuItemOfNodeInfo = () => (DropdownMenuItemOfNodeInfo = dart.constFn(dropdown.DropdownMenuItem$(node_info.NodeInfo)))();
  let JSArrayOfDropdownMenuItemOfNodeInfo = () => (JSArrayOfDropdownMenuItemOfNodeInfo = dart.constFn(_interceptors.JSArray$(DropdownMenuItemOfNodeInfo())))();
  let NodeInfoToNull = () => (NodeInfoToNull = dart.constFn(dart.fnType(core.Null, [node_info.NodeInfo])))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let DropdownButtonOfNodeInfo = () => (DropdownButtonOfNodeInfo = dart.constFn(dropdown.DropdownButton$(node_info.NodeInfo)))();
  let StringToNull = () => (StringToNull = dart.constFn(dart.fnType(core.Null, [core.String])))();
  let StringToString = () => (StringToString = dart.constFn(dart.fnType(core.String, [core.String])))();
  let FutureOfbool = () => (FutureOfbool = dart.constFn(async.Future$(core.bool)))();
  let VoidToFutureOfbool = () => (VoidToFutureOfbool = dart.constFn(dart.fnType(FutureOfbool(), [])))();
  let FutureOfNull = () => (FutureOfNull = dart.constFn(async.Future$(core.Null)))();
  let NodeInfoToFutureOfNull = () => (NodeInfoToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [node_info.NodeInfo])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 27,
        [_Location_line]: 47,
        [_Location_file]: null
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 15,
        [_Location_line]: 48,
        [_Location_file]: null
      });
    },
    get C1() {
      return C1 = dart.constList([C2 || CT.C2, C3 || CT.C3], widget_inspector._Location);
    },
    get C0() {
      return C0 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C1 || CT.C1,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 46,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C6() {
      return C6 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "value",
        [_Location_column]: 13,
        [_Location_line]: 45,
        [_Location_file]: null
      });
    },
    get C7() {
      return C7 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 46,
        [_Location_file]: null
      });
    },
    get C5() {
      return C5 = dart.constList([C6 || CT.C6, C7 || CT.C7], widget_inspector._Location);
    },
    get C4() {
      return C4 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C5 || CT.C5,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 44,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C10() {
      return C10 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 31,
        [_Location_line]: 65,
        [_Location_file]: null
      });
    },
    get C9() {
      return C9 = dart.constList([C10 || CT.C10], widget_inspector._Location);
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C9 || CT.C9,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 65,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C13() {
      return C13 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 23,
        [_Location_line]: 66,
        [_Location_file]: null
      });
    },
    get C12() {
      return C12 = dart.constList([C13 || CT.C13], widget_inspector._Location);
    },
    get C11() {
      return C11 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C12 || CT.C12,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 66,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C16() {
      return C16 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 32,
        [_Location_line]: 69,
        [_Location_file]: null
      });
    },
    get C15() {
      return C15 = dart.constList([C16 || CT.C16], widget_inspector._Location);
    },
    get C14() {
      return C14 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C15 || CT.C15,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 69,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C19() {
      return C19 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 15,
        [_Location_line]: 69,
        [_Location_file]: null
      });
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 15,
        [_Location_line]: 70,
        [_Location_file]: null
      });
    },
    get C18() {
      return C18 = dart.constList([C19 || CT.C19, C20 || CT.C20], widget_inspector._Location);
    },
    get C17() {
      return C17 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C18 || CT.C18,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 68,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C23() {
      return C23 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 77,
        [_Location_file]: null
      });
    },
    get C24() {
      return C24 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 78,
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
        [_Location_column]: 19,
        [_Location_line]: 76,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C27() {
      return C27 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 21,
        [_Location_line]: 84,
        [_Location_file]: null
      });
    },
    get C26() {
      return C26 = dart.constList([C27 || CT.C27], widget_inspector._Location);
    },
    get C25() {
      return C25 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C26 || CT.C26,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 83,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C30() {
      return C30 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 17,
        [_Location_line]: 75,
        [_Location_file]: null
      });
    },
    get C29() {
      return C29 = dart.constList([C30 || CT.C30], widget_inspector._Location);
    },
    get C28() {
      return C28 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C29 || CT.C29,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 74,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C33() {
      return C33 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 74,
        [_Location_file]: null
      });
    },
    get C34() {
      return C34 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 15,
        [_Location_line]: 88,
        [_Location_file]: null
      });
    },
    get C32() {
      return C32 = dart.constList([C33 || CT.C33, C34 || CT.C34], widget_inspector._Location);
    },
    get C31() {
      return C31 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C32 || CT.C32,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 73,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C37() {
      return C37 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "leading",
        [_Location_column]: 11,
        [_Location_line]: 65,
        [_Location_file]: null
      });
    },
    get C38() {
      return C38 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 11,
        [_Location_line]: 66,
        [_Location_file]: null
      });
    },
    get C39() {
      return C39 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "actions",
        [_Location_column]: 11,
        [_Location_line]: 67,
        [_Location_file]: null
      });
    },
    get C40() {
      return C40 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 11,
        [_Location_line]: 73,
        [_Location_file]: null
      });
    },
    get C36() {
      return C36 = dart.constList([C37 || CT.C37, C38 || CT.C38, C39 || CT.C39, C40 || CT.C40], widget_inspector._Location);
    },
    get C35() {
      return C35 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C36 || CT.C36,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 64,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C41() {
      return C41 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 8,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 8
      });
    },
    get C42() {
      return C42 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 16,
        [EdgeInsets_right]: 16,
        [EdgeInsets_top]: 16,
        [EdgeInsets_left]: 16
      });
    },
    get C45() {
      return C45 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 104,
        [_Location_file]: null
      });
    },
    get C46() {
      return C46 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 105,
        [_Location_file]: null
      });
    },
    get C44() {
      return C44 = dart.constList([C45 || CT.C45, C46 || CT.C46], widget_inspector._Location);
    },
    get C43() {
      return C43 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C44 || CT.C44,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 103,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C49() {
      return C49 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 109,
        [_Location_file]: null
      });
    },
    get C48() {
      return C48 = dart.constList([C49 || CT.C49], widget_inspector._Location);
    },
    get C47() {
      return C47 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C48 || CT.C48,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 108,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C52() {
      return C52 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 42,
        [_Location_line]: 113,
        [_Location_file]: null
      });
    },
    get C51() {
      return C51 = dart.constList([C52 || CT.C52], widget_inspector._Location);
    },
    get C50() {
      return C50 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C51 || CT.C51,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 113,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C55() {
      return C55 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "items",
        [_Location_column]: 31,
        [_Location_line]: 112,
        [_Location_file]: null
      });
    },
    get C56() {
      return C56 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "hint",
        [_Location_column]: 31,
        [_Location_line]: 113,
        [_Location_file]: null
      });
    },
    get C57() {
      return C57 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onChanged",
        [_Location_column]: 31,
        [_Location_line]: 114,
        [_Location_file]: null
      });
    },
    get C54() {
      return C54 = dart.constList([C55 || CT.C55, C56 || CT.C56, C57 || CT.C57], widget_inspector._Location);
    },
    get C53() {
      return C53 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C54 || CT.C54,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 111,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C60() {
      return C60 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 116,
        [_Location_file]: null
      });
    },
    get C59() {
      return C59 = dart.constList([C60 || CT.C60], widget_inspector._Location);
    },
    get C58() {
      return C58 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C59 || CT.C59,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 115,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C63() {
      return C63 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 50,
        [_Location_line]: 121,
        [_Location_file]: null
      });
    },
    get C62() {
      return C62 = dart.constList([C63 || CT.C63], widget_inspector._Location);
    },
    get C61() {
      return C61 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C62 || CT.C62,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 121,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C66() {
      return C66 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 29,
        [_Location_line]: 119,
        [_Location_file]: null
      });
    },
    get C67() {
      return C67 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 120,
        [_Location_file]: null
      });
    },
    get C68() {
      return C68 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 124,
        [_Location_file]: null
      });
    },
    get C69() {
      return C69 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 126,
        [_Location_file]: null
      });
    },
    get C65() {
      return C65 = dart.constList([C66 || CT.C66, C67 || CT.C67, C68 || CT.C68, C69 || CT.C69], widget_inspector._Location);
    },
    get C64() {
      return C64 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C65 || CT.C65,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 118,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C72() {
      return C72 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 50,
        [_Location_line]: 137,
        [_Location_file]: null
      });
    },
    get C71() {
      return C71 = dart.constList([C72 || CT.C72], widget_inspector._Location);
    },
    get C70() {
      return C70 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C71 || CT.C71,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 137,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C75() {
      return C75 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 29,
        [_Location_line]: 135,
        [_Location_file]: null
      });
    },
    get C76() {
      return C76 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 136,
        [_Location_file]: null
      });
    },
    get C77() {
      return C77 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 140,
        [_Location_file]: null
      });
    },
    get C78() {
      return C78 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 142,
        [_Location_file]: null
      });
    },
    get C74() {
      return C74 = dart.constList([C75 || CT.C75, C76 || CT.C76, C77 || CT.C77, C78 || CT.C78], widget_inspector._Location);
    },
    get C73() {
      return C73 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C74 || CT.C74,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 134,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C81() {
      return C81 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 50,
        [_Location_line]: 153,
        [_Location_file]: null
      });
    },
    get C80() {
      return C80 = dart.constList([C81 || CT.C81], widget_inspector._Location);
    },
    get C79() {
      return C79 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C80 || CT.C80,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 153,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C84() {
      return C84 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 29,
        [_Location_line]: 151,
        [_Location_file]: null
      });
    },
    get C85() {
      return C85 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 152,
        [_Location_file]: null
      });
    },
    get C86() {
      return C86 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 156,
        [_Location_file]: null
      });
    },
    get C87() {
      return C87 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 158,
        [_Location_file]: null
      });
    },
    get C83() {
      return C83 = dart.constList([C84 || CT.C84, C85 || CT.C85, C86 || CT.C86, C87 || CT.C87], widget_inspector._Location);
    },
    get C82() {
      return C82 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C83 || CT.C83,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 150,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C90() {
      return C90 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 50,
        [_Location_line]: 169,
        [_Location_file]: null
      });
    },
    get C89() {
      return C89 = dart.constList([C90 || CT.C90], widget_inspector._Location);
    },
    get C88() {
      return C88 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C89 || CT.C89,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 169,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C93() {
      return C93 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 29,
        [_Location_line]: 167,
        [_Location_file]: null
      });
    },
    get C94() {
      return C94 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 168,
        [_Location_file]: null
      });
    },
    get C95() {
      return C95 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 172,
        [_Location_file]: null
      });
    },
    get C96() {
      return C96 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 174,
        [_Location_file]: null
      });
    },
    get C92() {
      return C92 = dart.constList([C93 || CT.C93, C94 || CT.C94, C95 || CT.C95, C96 || CT.C96], widget_inspector._Location);
    },
    get C91() {
      return C91 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C92 || CT.C92,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 166,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C99() {
      return C99 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 183,
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
        [_Location_column]: 27,
        [_Location_line]: 182,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C102() {
      return C102 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 38,
        [_Location_line]: 186,
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
        [_Location_column]: 33,
        [_Location_line]: 186,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C105() {
      return C105 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 190,
        [_Location_file]: null
      });
    },
    get C106() {
      return C106 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 191,
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
        [_Location_column]: 37,
        [_Location_line]: 189,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C109() {
      return C109 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 194,
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
        [_Location_column]: 37,
        [_Location_line]: 193,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C112() {
      return C112 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 62,
        [_Location_line]: 197,
        [_Location_file]: null
      });
    },
    get C113() {
      return C113 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 198,
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
        [_Location_column]: 37,
        [_Location_line]: 196,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C116() {
      return C116 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 188,
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
        [_Location_column]: 33,
        [_Location_line]: 187,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C119() {
      return C119 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 203,
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
        [_Location_column]: 27,
        [_Location_line]: 202,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C122() {
      return C122 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 36,
        [_Location_line]: 205,
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
        [_Location_column]: 27,
        [_Location_line]: 205,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C123() {
      return C123 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 20,
        [EdgeInsets_right]: 20,
        [EdgeInsets_top]: 20,
        [EdgeInsets_left]: 20
      });
    },
    get C126() {
      return C126 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 33,
        [_Location_line]: 212,
        [_Location_file]: null
      });
    },
    get C127() {
      return C127 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 33,
        [_Location_line]: 213,
        [_Location_file]: null
      });
    },
    get C125() {
      return C125 = dart.constList([C126 || CT.C126, C127 || CT.C127], widget_inspector._Location);
    },
    get C124() {
      return C124 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C125 || CT.C125,
        [_Location_name]: null,
        [_Location_column]: 38,
        [_Location_line]: 211,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C130() {
      return C130 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 31,
        [_Location_line]: 210,
        [_Location_file]: null
      });
    },
    get C131() {
      return C131 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 31,
        [_Location_line]: 211,
        [_Location_file]: null
      });
    },
    get C129() {
      return C129 = dart.constList([C130 || CT.C130, C131 || CT.C131], widget_inspector._Location);
    },
    get C128() {
      return C128 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C129 || CT.C129,
        [_Location_name]: null,
        [_Location_column]: 36,
        [_Location_line]: 209,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C134() {
      return C134 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 29,
        [_Location_line]: 207,
        [_Location_file]: null
      });
    },
    get C135() {
      return C135 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 29,
        [_Location_line]: 208,
        [_Location_file]: null
      });
    },
    get C136() {
      return C136 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 29,
        [_Location_line]: 209,
        [_Location_file]: null
      });
    },
    get C137() {
      return C137 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 29,
        [_Location_line]: 216,
        [_Location_file]: null
      });
    },
    get C133() {
      return C133 = dart.constList([C134 || CT.C134, C135 || CT.C135, C136 || CT.C136, C137 || CT.C137], widget_inspector._Location);
    },
    get C132() {
      return C132 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C133 || CT.C133,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 206,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C140() {
      return C140 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 102,
        [_Location_file]: null
      });
    },
    get C139() {
      return C139 = dart.constList([C140 || CT.C140], widget_inspector._Location);
    },
    get C138() {
      return C138 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C139 || CT.C139,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 101,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C143() {
      return C143 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 23,
        [_Location_line]: 100,
        [_Location_file]: null
      });
    },
    get C144() {
      return C144 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 101,
        [_Location_file]: null
      });
    },
    get C142() {
      return C142 = dart.constList([C143 || CT.C143, C144 || CT.C144], widget_inspector._Location);
    },
    get C141() {
      return C141 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C142 || CT.C142,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 99,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C147() {
      return C147 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 21,
        [_Location_line]: 98,
        [_Location_file]: null
      });
    },
    get C148() {
      return C148 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 99,
        [_Location_file]: null
      });
    },
    get C146() {
      return C146 = dart.constList([C147 || CT.C147, C148 || CT.C148], widget_inspector._Location);
    },
    get C145() {
      return C145 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C146 || CT.C146,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 97,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C151() {
      return C151 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 19,
        [_Location_line]: 96,
        [_Location_file]: null
      });
    },
    get C152() {
      return C152 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 97,
        [_Location_file]: null
      });
    },
    get C150() {
      return C150 = dart.constList([C151 || CT.C151, C152 || CT.C152], widget_inspector._Location);
    },
    get C149() {
      return C149 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C150 || CT.C150,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 95,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C155() {
      return C155 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 15,
        [_Location_line]: 94,
        [_Location_file]: null
      });
    },
    get C156() {
      return C156 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 95,
        [_Location_file]: null
      });
    },
    get C154() {
      return C154 = dart.constList([C155 || CT.C155, C156 || CT.C156], widget_inspector._Location);
    },
    get C153() {
      return C153 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C154 || CT.C154,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 93,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C159() {
      return C159 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 11,
        [_Location_line]: 92,
        [_Location_file]: null
      });
    },
    get C158() {
      return C158 = dart.constList([C159 || CT.C159], widget_inspector._Location);
    },
    get C157() {
      return C157 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C158 || CT.C158,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 91,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C162() {
      return C162 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 9,
        [_Location_line]: 63,
        [_Location_file]: null
      });
    },
    get C163() {
      return C163 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 9,
        [_Location_line]: 64,
        [_Location_file]: null
      });
    },
    get C164() {
      return C164 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 9,
        [_Location_line]: 90,
        [_Location_file]: null
      });
    },
    get C165() {
      return C165 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 9,
        [_Location_line]: 91,
        [_Location_file]: null
      });
    },
    get C161() {
      return C161 = dart.constList([C162 || CT.C162, C163 || CT.C163, C164 || CT.C164, C165 || CT.C165], widget_inspector._Location);
    },
    get C160() {
      return C160 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C161 || CT.C161,
        [_Location_name]: null,
        [_Location_column]: 14,
        [_Location_line]: 62,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C168() {
      return C168 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 7,
        [_Location_line]: 62,
        [_Location_file]: null
      });
    },
    get C169() {
      return C169 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onWillPop",
        [_Location_column]: 7,
        [_Location_line]: 226,
        [_Location_file]: null
      });
    },
    get C167() {
      return C167 = dart.constList([C168 || CT.C168, C169 || CT.C169], widget_inspector._Location);
    },
    get C166() {
      return C166 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C167 || CT.C167,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 61,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C171() {
      return C171 = dart.constList([], widget_inspector._Location);
    },
    get C170() {
      return C170 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C171 || CT.C171,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 274,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C172() {
      return C172 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C171 || CT.C171,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 296,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    },
    get C173() {
      return C173 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C171 || CT.C171,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 314,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/sign_up.dart"
      });
    }
  });
  sign_up.SignUp = class SignUp extends framework.StatefulWidget {
    createState() {
      return new sign_up._SignUpState.new();
    }
  };
  (sign_up.SignUp.new = function(opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    sign_up.SignUp.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = sign_up.SignUp.prototype;
  dart.addTypeTests(sign_up.SignUp);
  dart.setMethodSignature(sign_up.SignUp, () => ({
    __proto__: dart.getMethods(sign_up.SignUp.__proto__),
    createState: dart.fnType(sign_up._SignUpState, [])
  }));
  dart.setLibraryUri(sign_up.SignUp, "package:bfnmobile/ui/sign_up.dart");
  const _key = dart.privateName(sign_up, "_key");
  const _nameKey = dart.privateName(sign_up, "_nameKey");
  const _emailKey = dart.privateName(sign_up, "_emailKey");
  const _cellKey = dart.privateName(sign_up, "_cellKey");
  const _passKey = dart.privateName(sign_up, "_passKey");
  const _formKey = dart.privateName(sign_up, "_formKey");
  const _getNodes = dart.privateName(sign_up, "_getNodes");
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C3;
  let C1;
  let C0;
  let C6;
  let C7;
  let C5;
  let C4;
  let C10;
  let C9;
  let C8;
  let C13;
  let C12;
  let C11;
  let C16;
  let C15;
  let C14;
  const _changeAccount = dart.privateName(sign_up, "_changeAccount");
  let C19;
  let C20;
  let C18;
  let C17;
  let C23;
  let C24;
  let C22;
  let C21;
  let C27;
  let C26;
  let C25;
  let C30;
  let C29;
  let C28;
  let C33;
  let C34;
  let C32;
  let C31;
  let C37;
  let C38;
  let C39;
  let C40;
  let C36;
  let C35;
  const EdgeInsets_bottom = dart.privateName(edge_insets, "EdgeInsets.bottom");
  const EdgeInsets_right = dart.privateName(edge_insets, "EdgeInsets.right");
  const EdgeInsets_top = dart.privateName(edge_insets, "EdgeInsets.top");
  const EdgeInsets_left = dart.privateName(edge_insets, "EdgeInsets.left");
  let C41;
  let C42;
  let C45;
  let C46;
  let C44;
  let C43;
  let C49;
  let C48;
  let C47;
  let C52;
  let C51;
  let C50;
  const _dropDownChanged = dart.privateName(sign_up, "_dropDownChanged");
  let C55;
  let C56;
  let C57;
  let C54;
  let C53;
  let C60;
  let C59;
  let C58;
  let C63;
  let C62;
  let C61;
  let C66;
  let C67;
  let C68;
  let C69;
  let C65;
  let C64;
  let C72;
  let C71;
  let C70;
  let C75;
  let C76;
  let C77;
  let C78;
  let C74;
  let C73;
  let C81;
  let C80;
  let C79;
  let C84;
  let C85;
  let C86;
  let C87;
  let C83;
  let C82;
  let C90;
  let C89;
  let C88;
  let C93;
  let C94;
  let C95;
  let C96;
  let C92;
  let C91;
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
  let C121;
  let C120;
  let C123;
  let C126;
  let C127;
  let C125;
  let C124;
  let C130;
  let C131;
  let C129;
  let C128;
  const _validate = dart.privateName(sign_up, "_validate");
  let C134;
  let C135;
  let C136;
  let C137;
  let C133;
  let C132;
  let C140;
  let C139;
  let C138;
  let C143;
  let C144;
  let C142;
  let C141;
  let C147;
  let C148;
  let C146;
  let C145;
  let C151;
  let C152;
  let C150;
  let C149;
  let C155;
  let C156;
  let C154;
  let C153;
  let C159;
  let C158;
  let C157;
  let C162;
  let C163;
  let C164;
  let C165;
  let C161;
  let C160;
  let C168;
  let C169;
  let C167;
  let C166;
  const _error = dart.privateName(sign_up, "_error");
  let C171;
  let C170;
  let C172;
  let C173;
  sign_up._SignUpState = class _SignUpState extends framework.State$(sign_up.SignUp) {
    initState() {
      super.initState();
      this[_getNodes]();
    }
    [_getNodes]() {
      return async.async(dart.dynamic, (function* _getNodes() {
        this.nodes = (yield net.Net.listNodes());
        this.nodes[$forEach](dart.fn(n => {
          if (n.webAPIUrl != null) {
            core.print("add to dropdown " + dart.str(n.webAPIUrl));
            this.items[$add](new (DropdownMenuItemOfNodeInfo()).new({value: n, child: new text.Text.new(n.addresses[$elementAt](0), {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C0 || CT.C0}), $creationLocationd_0dea112b090073317d4: C4 || CT.C4}));
          } else {
            core.print(" 👿  👿  👿 ignore possible notary node - no webAPIUrl available");
          }
        }, NodeInfoToNull()));
        core.print("..................dropDownItems: " + dart.str(this.items[$length]));
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    build(context) {
      return new will_pop_scope.WillPopScope.new({child: new scaffold.Scaffold.new({key: this[_key], appBar: new app_bar.AppBar.new({leading: new icon.Icon.new(icons.Icons.people, {$creationLocationd_0dea112b090073317d4: C8 || CT.C8}), title: new text.Text.new("BFN SignUp", {$creationLocationd_0dea112b090073317d4: C11 || CT.C11}), actions: JSArrayOfWidget().of([new icon_button.IconButton.new({icon: new icon.Icon.new(icons.Icons.person_add, {$creationLocationd_0dea112b090073317d4: C14 || CT.C14}), onPressed: dart.bind(this, _changeAccount), $creationLocationd_0dea112b090073317d4: C17 || CT.C17})]), bottom: new preferred_size.PreferredSize.new({child: new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new("Business Finance Network", {style: new text_style.TextStyle.new({color: colors.Colors.white, fontWeight: ui.FontWeight.w900, fontSize: 24.0}), $creationLocationd_0dea112b090073317d4: C21 || CT.C21}), new basic.SizedBox.new({height: 24.0, $creationLocationd_0dea112b090073317d4: C25 || CT.C25})]), $creationLocationd_0dea112b090073317d4: C28 || CT.C28}), preferredSize: new ui.Size.fromHeight(60.0), $creationLocationd_0dea112b090073317d4: C31 || CT.C31}), $creationLocationd_0dea112b090073317d4: C35 || CT.C35}), backgroundColor: colors.Colors.brown._get(100), body: new scroll_view.ListView.new({children: JSArrayOfWidget().of([new basic.Padding.new({padding: C41 || CT.C41, child: new card.Card.new({elevation: 4.0, child: new basic.Padding.new({padding: C42 || CT.C42, child: new form.Form.new({key: this[_formKey], child: new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new("Account Details", {style: new text_style.TextStyle.new({fontSize: 28.0, fontWeight: ui.FontWeight.w900}), $creationLocationd_0dea112b090073317d4: C43 || CT.C43}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C47 || CT.C47}), new (DropdownButtonOfNodeInfo()).new({items: this.items, hint: new text.Text.new("Select Network Node", {$creationLocationd_0dea112b090073317d4: C50 || CT.C50}), onChanged: dart.bind(this, _dropDownChanged), $creationLocationd_0dea112b090073317d4: C53 || CT.C53}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C58 || CT.C58}), new text_form_field.TextFormField.new({key: this[_nameKey], decoration: new input_decorator.InputDecoration.new({icon: new icon.Icon.new(icons.Icons.person, {$creationLocationd_0dea112b090073317d4: C61 || CT.C61}), hintText: "Enter Name", labelText: "Name"}), keyboardType: text_input.TextInputType.text, validator: dart.fn(value => {
                              this.name = value;
                              return null;
                            }, StringToNull()), $creationLocationd_0dea112b090073317d4: C64 || CT.C64}), new text_form_field.TextFormField.new({key: this[_emailKey], decoration: new input_decorator.InputDecoration.new({icon: new icon.Icon.new(icons.Icons.email, {$creationLocationd_0dea112b090073317d4: C70 || CT.C70}), hintText: "Enter Email Address", labelText: "Email"}), keyboardType: text_input.TextInputType.emailAddress, validator: dart.fn(value => {
                              if (value[$isEmpty]) {
                                return "Please enter email address";
                              }
                              this.email = value;
                              return null;
                            }, StringToString()), $creationLocationd_0dea112b090073317d4: C73 || CT.C73}), new text_form_field.TextFormField.new({key: this[_cellKey], decoration: new input_decorator.InputDecoration.new({icon: new icon.Icon.new(icons.Icons.phone, {$creationLocationd_0dea112b090073317d4: C79 || CT.C79}), hintText: "Enter Cellphone Number", labelText: " Cellphone Number"}), keyboardType: text_input.TextInputType.phone, validator: dart.fn(value => {
                              this.cellphone = value;
                              return null;
                            }, StringToNull()), $creationLocationd_0dea112b090073317d4: C82 || CT.C82}), new text_form_field.TextFormField.new({key: this[_passKey], decoration: new input_decorator.InputDecoration.new({icon: new icon.Icon.new(icons.Icons.vpn_key, {$creationLocationd_0dea112b090073317d4: C88 || CT.C88}), hintText: "Enter Password", labelText: "Password"}), keyboardType: text_input.TextInputType.visiblePassword, validator: dart.fn(value => {
                              if (value[$isEmpty]) {
                                return "Please enter password";
                              }
                              this.password = value;
                              return null;
                            }, StringToString()), $creationLocationd_0dea112b090073317d4: C91 || CT.C91}), new basic.SizedBox.new({height: 28.0, $creationLocationd_0dea112b090073317d4: C97 || CT.C97}), this.selectedNode == null ? new text.Text.new("No Network Node", {$creationLocationd_0dea112b090073317d4: C100 || CT.C100}) : new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Node", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C103 || CT.C103}), new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C107 || CT.C107}), new text.Text.new(this.selectedNode.addresses[$elementAt](0), {style: functions.Styles.tealBoldSmall, $creationLocationd_0dea112b090073317d4: C110 || CT.C110})]), $creationLocationd_0dea112b090073317d4: C114 || CT.C114}), new basic.SizedBox.new({height: 40.0, $creationLocationd_0dea112b090073317d4: C117 || CT.C117}), new basic.SizedBox.new({height: 0.0, $creationLocationd_0dea112b090073317d4: C120 || CT.C120}), new raised_button.RaisedButton.new({color: colors.Colors.indigo, elevation: 8.0, child: new basic.Padding.new({padding: C123 || CT.C123, child: new text.Text.new("Create Account", {style: new text_style.TextStyle.new({color: colors.Colors.white}), $creationLocationd_0dea112b090073317d4: C124 || CT.C124}), $creationLocationd_0dea112b090073317d4: C128 || CT.C128}), onPressed: dart.bind(this, _validate), $creationLocationd_0dea112b090073317d4: C132 || CT.C132})]), $creationLocationd_0dea112b090073317d4: C138 || CT.C138}), $creationLocationd_0dea112b090073317d4: C141 || CT.C141}), $creationLocationd_0dea112b090073317d4: C145 || CT.C145}), $creationLocationd_0dea112b090073317d4: C149 || CT.C149}), $creationLocationd_0dea112b090073317d4: C153 || CT.C153})]), $creationLocationd_0dea112b090073317d4: C157 || CT.C157}), $creationLocationd_0dea112b090073317d4: C160 || CT.C160}), onWillPop: dart.fn(() => this.doNothing(), VoidToFutureOfbool()), $creationLocationd_0dea112b090073317d4: C166 || CT.C166});
    }
    [_validate]() {
      return async.async(dart.dynamic, (function* _validate() {
        if (this.selectedNode == null) {
          this[_error]("Please select Network Node");
          return;
        }
        if (dart.test(this[_formKey].currentState.validate())) {
          core.print("🍎 🍊 ready to rumble " + dart.str(this.name) + " " + dart.str(this.email) + " " + dart.str(this.cellphone) + " " + dart.str(this.password));
          let userRecord = null;
          try {
            userRecord = (yield net.Net.getUser(this.email));
          } catch (e$) {
            let e = dart.getThrown(e$);
            core.print(e);
          }
          let accountInfo = null;
          try {
            if (userRecord != null) {
              let authResult = (yield this.auth.signInWithEmailAndPassword({email: this.email, password: this.password}));
              if (authResult.user != null) {
                try {
                  accountInfo = (yield net.Net.getAccount(authResult.user.uid));
                } catch (e$0) {
                  let e = dart.getThrown(e$0);
                  core.print(e);
                }
              } else {
                accountInfo = (yield net.Net.startAccountRegistrationFlow(this.name, this.email, this.password, this.cellphone));
              }
            } else {
              core.print("🍎 🍊 🍎 🍊 🍎 🍊 ... creating account flow .....");
              accountInfo = (yield net.Net.startAccountRegistrationFlow(this.name, this.email, this.password, this.cellphone));
            }
            core.print("🍎 🍊 🍎 🍊 🍎 🍊 acct found or created: " + dart.str(accountInfo.toJson()) + " 🍎 🍊 🍎 🍊 🍎 🍊 ");
            yield prefs.Prefs.saveAccount(accountInfo);
            let result = (yield bloc.bfnBloc.signIn(this.email, this.password));
            net.Net.getNodeUrl();
            navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new dashboard.Dashboard.new({$creationLocationd_0dea112b090073317d4: C170 || CT.C170})}));
          } catch (e$1) {
            let e = dart.getThrown(e$1);
            core.print(e);
            this[_error]("Account registration failed");
          }
        }
      }).bind(this));
    }
    [_error](msg) {
      snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: msg, actionLabel: "Err"});
    }
    doNothing() {
      return async.async(core.bool, function* doNothing() {
        return false;
      });
    }
    [_changeAccount]() {
      return async.async(dart.void, (function* _changeAccount() {
        let result = (yield navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new network_accounts.NetworkAccountsPage.new({$creationLocationd_0dea112b090073317d4: C172 || CT.C172})})));
        if (result != null) {
          core.print(result);
          let account = account$.AccountInfo.as(result);
          yield prefs.Prefs.saveAccount(account);
          let auth = firebase_auth.FirebaseAuth.instance;
          yield auth.signInAnonymously();
          this.nodes[$forEach](dart.fn(n => async.async(core.Null, function*() {
            if (account.name == n.addresses[$elementAt](0)) {
              yield prefs.Prefs.saveNode(n);
            }
          }), NodeInfoToFutureOfNull()));
          core.print("🍊 🍊 🍊 🍊 Signed in FRESH (anonymous) to Firebase: " + dart.str(dart.toString(result)));
          navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new dashboard.Dashboard.new({$creationLocationd_0dea112b090073317d4: C173 || CT.C173})}));
        }
      }).bind(this));
    }
    [_dropDownChanged](value) {
      return async.async(dart.void, (function* _dropDownChanged() {
        this.selectedNode = value;
        core.print("🌸 🌸 🌸 Selected node: " + dart.str(this.selectedNode.toJson()));
        this.setState(dart.fn(() => {
        }, VoidToNull()));
        prefs.Prefs.saveNode(this.selectedNode);
      }).bind(this));
    }
  };
  (sign_up._SignUpState.new = function() {
    this[_key] = GlobalKeyOfScaffoldState().new();
    this[_nameKey] = GlobalKeyOfFormState().new();
    this[_emailKey] = GlobalKeyOfFormState().new();
    this[_cellKey] = GlobalKeyOfFormState().new();
    this[_passKey] = GlobalKeyOfFormState().new();
    this[_formKey] = GlobalKeyOfFormState().new();
    this.name = null;
    this.email = null;
    this.cellphone = null;
    this.password = null;
    this.auth = firebase_auth.FirebaseAuth.instance;
    this.nodes = JSArrayOfNodeInfo().of([]);
    this.items = JSArrayOfDropdownMenuItemOfNodeInfo().of([]);
    this.selectedNode = null;
    sign_up._SignUpState.__proto__.new.call(this);
    ;
  }).prototype = sign_up._SignUpState.prototype;
  dart.addTypeTests(sign_up._SignUpState);
  dart.setMethodSignature(sign_up._SignUpState, () => ({
    __proto__: dart.getMethods(sign_up._SignUpState.__proto__),
    [_getNodes]: dart.fnType(dart.dynamic, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    [_validate]: dart.fnType(dart.dynamic, []),
    [_error]: dart.fnType(dart.dynamic, [core.String]),
    doNothing: dart.fnType(async.Future$(core.bool), []),
    [_changeAccount]: dart.fnType(dart.void, []),
    [_dropDownChanged]: dart.fnType(dart.void, [node_info.NodeInfo])
  }));
  dart.setLibraryUri(sign_up._SignUpState, "package:bfnmobile/ui/sign_up.dart");
  dart.setFieldSignature(sign_up._SignUpState, () => ({
    __proto__: dart.getFields(sign_up._SignUpState.__proto__),
    [_key]: dart.finalFieldType(framework.GlobalKey$(scaffold.ScaffoldState)),
    [_nameKey]: dart.finalFieldType(framework.GlobalKey$(form.FormState)),
    [_emailKey]: dart.finalFieldType(framework.GlobalKey$(form.FormState)),
    [_cellKey]: dart.finalFieldType(framework.GlobalKey$(form.FormState)),
    [_passKey]: dart.finalFieldType(framework.GlobalKey$(form.FormState)),
    [_formKey]: dart.finalFieldType(framework.GlobalKey$(form.FormState)),
    name: dart.fieldType(core.String),
    email: dart.fieldType(core.String),
    cellphone: dart.fieldType(core.String),
    password: dart.fieldType(core.String),
    auth: dart.fieldType(firebase_auth.FirebaseAuth),
    nodes: dart.fieldType(core.List$(node_info.NodeInfo)),
    items: dart.fieldType(core.List$(dropdown.DropdownMenuItem$(node_info.NodeInfo))),
    selectedNode: dart.fieldType(node_info.NodeInfo)
  }));
  dart.trackLibraries("packages/bfnmobile/ui/sign_up", {
    "package:bfnmobile/ui/sign_up.dart": sign_up
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["sign_up.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;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","file":"sign_up.ddc.js"}');
  // Exports:
  return {
    ui__sign_up: sign_up
  };
});

//# sourceMappingURL=sign_up.ddc.js.map
