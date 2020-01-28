define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/flutter/material', 'packages/bfnlibrary/data/user', 'packages/firebase_auth/firebase_auth', 'packages/bfnlibrary/data/node_info', 'packages/bfnlibrary/util/net', 'packages/bfnlibrary/util/snack', 'packages/bfnlibrary/util/functions', 'packages/bfnlibrary/util/prefs', 'packages/flutter_dotenv/flutter_dotenv', 'packages/bfnlibrary/util/slide_right', 'packages/flutter/src/rendering/animated_size', 'packages/flutter/src/painting/_network_image_web', 'packages/bfnlibrary/data/account', 'packages/bfnlibrary/data/profile', 'packages/flutter/src/gestures/arena', 'packages/bfnlibrary/util/theme_bloc', 'packages/bfnmobile/bloc', 'packages/bfnmobile/ui/sign_up', 'packages/bfnmobile/ui/dashboard'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__flutter__material, packages__bfnlibrary__data__user, packages__firebase_auth__firebase_auth, packages__bfnlibrary__data__node_info, packages__bfnlibrary__util__net, packages__bfnlibrary__util__snack, packages__bfnlibrary__util__functions, packages__bfnlibrary__util__prefs, packages__flutter_dotenv__flutter_dotenv, packages__bfnlibrary__util__slide_right, packages__flutter__src__rendering__animated_size, packages__flutter__src__painting___network_image_web, packages__bfnlibrary__data__account, packages__bfnlibrary__data__profile, packages__flutter__src__gestures__arena, packages__bfnlibrary__util__theme_bloc, packages__bfnmobile__bloc, packages__bfnmobile__ui__sign_up, packages__bfnmobile__ui__dashboard) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const async = dart_sdk.async;
  const ui = dart_sdk.ui;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const text = packages__flutter__src__widgets__actions.src__widgets__text;
  const widget_inspector = packages__flutter__src__widgets__actions.src__widgets__widget_inspector;
  const navigator = packages__flutter__src__widgets__actions.src__widgets__navigator;
  const preferred_size = packages__flutter__src__widgets__actions.src__widgets__preferred_size;
  const basic = packages__flutter__src__widgets__actions.src__widgets__basic;
  const scroll_view = packages__flutter__src__widgets__actions.src__widgets__scroll_view;
  const gesture_detector = packages__flutter__src__widgets__actions.src__widgets__gesture_detector;
  const icon = packages__flutter__src__widgets__actions.src__widgets__icon;
  const editable_text = packages__flutter__src__widgets__actions.src__widgets__editable_text;
  const form = packages__flutter__src__widgets__actions.src__widgets__form;
  const container = packages__flutter__src__widgets__actions.src__widgets__container;
  const async$ = packages__flutter__src__widgets__actions.src__widgets__async;
  const binding = packages__flutter__src__widgets__actions.src__widgets__binding;
  const scaffold = packages__flutter__material.src__material__scaffold;
  const dropdown = packages__flutter__material.src__material__dropdown;
  const app_bar = packages__flutter__material.src__material__app_bar;
  const colors = packages__flutter__material.src__material__colors;
  const card = packages__flutter__material.src__material__card;
  const list_tile = packages__flutter__material.src__material__list_tile;
  const icons = packages__flutter__material.src__material__icons;
  const progress_indicator = packages__flutter__material.src__material__progress_indicator;
  const text_form_field = packages__flutter__material.src__material__text_form_field;
  const input_decorator = packages__flutter__material.src__material__input_decorator;
  const input_border = packages__flutter__material.src__material__input_border;
  const raised_button = packages__flutter__material.src__material__raised_button;
  const app = packages__flutter__material.src__material__app;
  const user = packages__bfnlibrary__data__user.data__user;
  const firebase_auth = packages__firebase_auth__firebase_auth.firebase_auth;
  const node_info = packages__bfnlibrary__data__node_info.data__node_info;
  const net = packages__bfnlibrary__util__net.util__net;
  const snack = packages__bfnlibrary__util__snack.util__snack;
  const functions = packages__bfnlibrary__util__functions.util__functions;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const dotenv = packages__flutter_dotenv__flutter_dotenv.src__dotenv;
  const slide_right = packages__bfnlibrary__util__slide_right.util__slide_right;
  const flex = packages__flutter__src__rendering__animated_size.src__rendering__flex;
  const edge_insets = packages__flutter__src__painting___network_image_web.src__painting__edge_insets;
  const borders = packages__flutter__src__painting___network_image_web.src__painting__borders;
  const account = packages__bfnlibrary__data__account.data__account;
  const profile = packages__bfnlibrary__data__profile.data__profile;
  const text_input = packages__flutter__src__gestures__arena.src__services__text_input;
  const theme_bloc = packages__bfnlibrary__util__theme_bloc.util__theme_bloc;
  const bloc = packages__bfnmobile__bloc.bloc;
  const sign_up = packages__bfnmobile__ui__sign_up.ui__sign_up;
  const dashboard = packages__bfnmobile__ui__dashboard.ui__dashboard;
  const dev_signin = Object.create(dart.library);
  const settings = Object.create(dart.library);
  const main = Object.create(dart.library);
  const $length = dartx.length;
  const $elementAt = dartx.elementAt;
  const $contains = dartx.contains;
  const $add = dartx.add;
  const $forEach = dartx.forEach;
  const $_get = dartx._get;
  const $compareTo = dartx.compareTo;
  const $sort = dartx.sort;
  const $toString = dartx.toString;
  const $isEmpty = dartx.isEmpty;
  let GlobalKeyOfScaffoldState = () => (GlobalKeyOfScaffoldState = dart.constFn(framework.GlobalKey$(scaffold.ScaffoldState)))();
  let JSArrayOfUserDTO = () => (JSArrayOfUserDTO = dart.constFn(_interceptors.JSArray$(user.UserDTO)))();
  let JSArrayOfNodeInfo = () => (JSArrayOfNodeInfo = dart.constFn(_interceptors.JSArray$(node_info.NodeInfo)))();
  let DropdownMenuItemOfNodeInfo = () => (DropdownMenuItemOfNodeInfo = dart.constFn(dropdown.DropdownMenuItem$(node_info.NodeInfo)))();
  let JSArrayOfDropdownMenuItemOfNodeInfo = () => (JSArrayOfDropdownMenuItemOfNodeInfo = dart.constFn(_interceptors.JSArray$(DropdownMenuItemOfNodeInfo())))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let NodeInfoToNull = () => (NodeInfoToNull = dart.constFn(dart.fnType(core.Null, [node_info.NodeInfo])))();
  let UserDTOToNull = () => (UserDTOToNull = dart.constFn(dart.fnType(core.Null, [user.UserDTO])))();
  let UserDTOAndUserDTOToint = () => (UserDTOAndUserDTOToint = dart.constFn(dart.fnType(core.int, [user.UserDTO, user.UserDTO])))();
  let DropdownButtonOfNodeInfo = () => (DropdownButtonOfNodeInfo = dart.constFn(dropdown.DropdownButton$(node_info.NodeInfo)))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let BuildContextAndintToPadding = () => (BuildContextAndintToPadding = dart.constFn(dart.fnType(basic.Padding, [framework.BuildContext, core.int])))();
  let GlobalKeyOfFormState = () => (GlobalKeyOfFormState = dart.constFn(framework.GlobalKey$(form.FormState)))();
  let StringToString = () => (StringToString = dart.constFn(dart.fnType(core.String, [core.String])))();
  let StreamBuilderOfint = () => (StreamBuilderOfint = dart.constFn(async$.StreamBuilder$(core.int)))();
  let StreamOfint = () => (StreamOfint = dart.constFn(async.Stream$(core.int)))();
  let AsyncSnapshotOfint = () => (AsyncSnapshotOfint = dart.constFn(async$.AsyncSnapshot$(core.int)))();
  let BuildContextAndAsyncSnapshotOfintToMaterialApp = () => (BuildContextAndAsyncSnapshotOfintToMaterialApp = dart.constFn(dart.fnType(app.MaterialApp, [framework.BuildContext, AsyncSnapshotOfint()])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 31,
        [_Location_line]: 71,
        [_Location_file]: null
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 19,
        [_Location_line]: 72,
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
        [_Location_column]: 24,
        [_Location_line]: 70,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C6() {
      return C6 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "value",
        [_Location_column]: 17,
        [_Location_line]: 69,
        [_Location_file]: null
      });
    },
    get C7() {
      return C7 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 70,
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
        [_Location_column]: 23,
        [_Location_line]: 68,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C10() {
      return C10 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "account",
        [_Location_column]: 30,
        [_Location_line]: 105,
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
        [_Location_column]: 21,
        [_Location_line]: 105,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C13() {
      return C13 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 142,
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
        [_Location_column]: 16,
        [_Location_line]: 142,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C16() {
      return C16 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 147,
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
        [_Location_column]: 15,
        [_Location_line]: 146,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C19() {
      return C19 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 30,
        [_Location_line]: 151,
        [_Location_file]: null
      });
    },
    get C18() {
      return C18 = dart.constList([C19 || CT.C19], widget_inspector._Location);
    },
    get C17() {
      return C17 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C18 || CT.C18,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 151,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C22() {
      return C22 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "items",
        [_Location_column]: 19,
        [_Location_line]: 150,
        [_Location_file]: null
      });
    },
    get C23() {
      return C23 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "hint",
        [_Location_column]: 19,
        [_Location_line]: 151,
        [_Location_file]: null
      });
    },
    get C24() {
      return C24 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onChanged",
        [_Location_column]: 19,
        [_Location_line]: 152,
        [_Location_file]: null
      });
    },
    get C21() {
      return C21 = dart.constList([C22 || CT.C22, C23 || CT.C23, C24 || CT.C24], widget_inspector._Location);
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C21 || CT.C21,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 149,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C27() {
      return C27 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 154,
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
        [_Location_column]: 15,
        [_Location_line]: 153,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C30() {
      return C30 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 38,
        [_Location_line]: 157,
        [_Location_file]: null
      });
    },
    get C31() {
      return C31 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 17,
        [_Location_line]: 158,
        [_Location_file]: null
      });
    },
    get C29() {
      return C29 = dart.constList([C30 || CT.C30, C31 || CT.C31], widget_inspector._Location);
    },
    get C28() {
      return C28 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C29 || CT.C29,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 156,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C34() {
      return C34 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 161,
        [_Location_file]: null
      });
    },
    get C33() {
      return C33 = dart.constList([C34 || CT.C34], widget_inspector._Location);
    },
    get C32() {
      return C32 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C33 || CT.C33,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 160,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C37() {
      return C37 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 24,
        [_Location_line]: 166,
        [_Location_file]: null
      });
    },
    get C36() {
      return C36 = dart.constList([C37 || CT.C37], widget_inspector._Location);
    },
    get C35() {
      return C35 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C36 || CT.C36,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 166,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C40() {
      return C40 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 21,
        [_Location_line]: 168,
        [_Location_file]: null
      });
    },
    get C39() {
      return C39 = dart.constList([C40 || CT.C40], widget_inspector._Location);
    },
    get C38() {
      return C38 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C39 || CT.C39,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 167,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C43() {
      return C43 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 171,
        [_Location_file]: null
      });
    },
    get C44() {
      return C44 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 172,
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
        [_Location_column]: 19,
        [_Location_line]: 170,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C47() {
      return C47 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 21,
        [_Location_line]: 175,
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
        [_Location_column]: 19,
        [_Location_line]: 174,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C50() {
      return C50 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "mainAxisAlignment",
        [_Location_column]: 17,
        [_Location_line]: 164,
        [_Location_file]: null
      });
    },
    get C51() {
      return C51 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 17,
        [_Location_line]: 165,
        [_Location_file]: null
      });
    },
    get C49() {
      return C49 = dart.constList([C50 || CT.C50, C51 || CT.C51], widget_inspector._Location);
    },
    get C48() {
      return C48 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C49 || CT.C49,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 163,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C54() {
      return C54 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 180,
        [_Location_file]: null
      });
    },
    get C53() {
      return C53 = dart.constList([C54 || CT.C54], widget_inspector._Location);
    },
    get C52() {
      return C52 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C53 || CT.C53,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 179,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C57() {
      return C57 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 27,
        [_Location_line]: 145,
        [_Location_file]: null
      });
    },
    get C56() {
      return C56 = dart.constList([C57 || CT.C57], widget_inspector._Location);
    },
    get C55() {
      return C55 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C56 || CT.C56,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 145,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C60() {
      return C60 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 145,
        [_Location_file]: null
      });
    },
    get C61() {
      return C61 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 13,
        [_Location_line]: 183,
        [_Location_file]: null
      });
    },
    get C59() {
      return C59 = dart.constList([C60 || CT.C60, C61 || CT.C61], widget_inspector._Location);
    },
    get C58() {
      return C58 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C59 || CT.C59,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 144,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C64() {
      return C64 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 9,
        [_Location_line]: 142,
        [_Location_file]: null
      });
    },
    get C65() {
      return C65 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 9,
        [_Location_line]: 143,
        [_Location_file]: null
      });
    },
    get C66() {
      return C66 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 9,
        [_Location_line]: 144,
        [_Location_file]: null
      });
    },
    get C63() {
      return C63 = dart.constList([C64 || CT.C64, C65 || CT.C65, C66 || CT.C66], widget_inspector._Location);
    },
    get C62() {
      return C62 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C63 || CT.C63,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 141,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C68() {
      return C68 = dart.constList([], widget_inspector._Location);
    },
    get C67() {
      return C67 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C68 || CT.C68,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 186,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C69() {
      return C69 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 12,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 12
      });
    },
    get C72() {
      return C72 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 33,
        [_Location_line]: 201,
        [_Location_file]: null
      });
    },
    get C73() {
      return C73 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 27,
        [_Location_line]: 202,
        [_Location_file]: null
      });
    },
    get C71() {
      return C71 = dart.constList([C72 || CT.C72, C73 || CT.C73], widget_inspector._Location);
    },
    get C70() {
      return C70 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C71 || CT.C71,
        [_Location_name]: null,
        [_Location_column]: 34,
        [_Location_line]: 200,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C76() {
      return C76 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 45,
        [_Location_line]: 205,
        [_Location_file]: null
      });
    },
    get C77() {
      return C77 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 206,
        [_Location_file]: null
      });
    },
    get C75() {
      return C75 = dart.constList([C76 || CT.C76, C77 || CT.C77], widget_inspector._Location);
    },
    get C74() {
      return C74 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C75 || CT.C75,
        [_Location_name]: null,
        [_Location_column]: 32,
        [_Location_line]: 204,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C80() {
      return C80 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 53,
        [_Location_line]: 209,
        [_Location_file]: null
      });
    },
    get C79() {
      return C79 = dart.constList([C80 || CT.C80], widget_inspector._Location);
    },
    get C78() {
      return C78 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C79 || CT.C79,
        [_Location_name]: null,
        [_Location_column]: 29,
        [_Location_line]: 209,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C83() {
      return C83 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "leading",
        [_Location_column]: 25,
        [_Location_line]: 200,
        [_Location_file]: null
      });
    },
    get C84() {
      return C84 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 25,
        [_Location_line]: 204,
        [_Location_file]: null
      });
    },
    get C85() {
      return C85 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "subtitle",
        [_Location_column]: 25,
        [_Location_line]: 208,
        [_Location_file]: null
      });
    },
    get C82() {
      return C82 = dart.constList([C83 || CT.C83, C84 || CT.C84, C85 || CT.C85], widget_inspector._Location);
    },
    get C81() {
      return C81 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C82 || CT.C82,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 199,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C88() {
      return C88 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onTap",
        [_Location_column]: 23,
        [_Location_line]: 196,
        [_Location_file]: null
      });
    },
    get C89() {
      return C89 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 199,
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
        [_Location_column]: 28,
        [_Location_line]: 195,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C92() {
      return C92 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 21,
        [_Location_line]: 194,
        [_Location_file]: null
      });
    },
    get C93() {
      return C93 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 195,
        [_Location_file]: null
      });
    },
    get C91() {
      return C91 = dart.constList([C92 || CT.C92, C93 || CT.C93], widget_inspector._Location);
    },
    get C90() {
      return C90 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C91 || CT.C91,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 193,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C96() {
      return C96 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 19,
        [_Location_line]: 192,
        [_Location_file]: null
      });
    },
    get C97() {
      return C97 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 193,
        [_Location_file]: null
      });
    },
    get C95() {
      return C95 = dart.constList([C96 || CT.C96, C97 || CT.C97], widget_inspector._Location);
    },
    get C94() {
      return C94 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C95 || CT.C95,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 191,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C100() {
      return C100 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemCount",
        [_Location_column]: 15,
        [_Location_line]: 188,
        [_Location_file]: null
      });
    },
    get C101() {
      return C101 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemBuilder",
        [_Location_column]: 15,
        [_Location_line]: 189,
        [_Location_file]: null
      });
    },
    get C99() {
      return C99 = dart.constList([C100 || CT.C100, C101 || CT.C101], widget_inspector._Location);
    },
    get C98() {
      return C98 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C99 || CT.C99,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 187,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C104() {
      return C104 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 7,
        [_Location_line]: 140,
        [_Location_file]: null
      });
    },
    get C105() {
      return C105 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 7,
        [_Location_line]: 141,
        [_Location_file]: null
      });
    },
    get C106() {
      return C106 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 7,
        [_Location_line]: 185,
        [_Location_file]: null
      });
    },
    get C103() {
      return C103 = dart.constList([C104 || CT.C104, C105 || CT.C105, C106 || CT.C106], widget_inspector._Location);
    },
    get C102() {
      return C102 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C103 || CT.C103,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 139,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dev_signin.dart"
      });
    },
    get C109() {
      return C109 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 118,
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
        [_Location_column]: 16,
        [_Location_line]: 118,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C110() {
      return C110 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 16,
        [EdgeInsets_right]: 16,
        [EdgeInsets_top]: 16,
        [EdgeInsets_left]: 16
      });
    },
    get C113() {
      return C113 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 36,
        [_Location_line]: 125,
        [_Location_file]: null
      });
    },
    get C114() {
      return C114 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 126,
        [_Location_file]: null
      });
    },
    get C112() {
      return C112 = dart.constList([C113 || CT.C113, C114 || CT.C114], widget_inspector._Location);
    },
    get C111() {
      return C111 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C112 || CT.C112,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 124,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C117() {
      return C117 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 21,
        [_Location_line]: 129,
        [_Location_file]: null
      });
    },
    get C116() {
      return C116 = dart.constList([C117 || CT.C117], widget_inspector._Location);
    },
    get C115() {
      return C115 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C116 || CT.C116,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 128,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C120() {
      return C120 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 132,
        [_Location_file]: null
      });
    },
    get C121() {
      return C121 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 133,
        [_Location_file]: null
      });
    },
    get C119() {
      return C119 = dart.constList([C120 || CT.C120, C121 || CT.C121], widget_inspector._Location);
    },
    get C118() {
      return C118 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C119 || CT.C119,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 131,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C124() {
      return C124 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 21,
        [_Location_line]: 136,
        [_Location_file]: null
      });
    },
    get C123() {
      return C123 = dart.constList([C124 || CT.C124], widget_inspector._Location);
    },
    get C122() {
      return C122 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C123 || CT.C123,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 135,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C127() {
      return C127 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 17,
        [_Location_line]: 123,
        [_Location_file]: null
      });
    },
    get C126() {
      return C126 = dart.constList([C127 || CT.C127], widget_inspector._Location);
    },
    get C125() {
      return C125 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C126 || CT.C126,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 122,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C130() {
      return C130 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 15,
        [_Location_line]: 121,
        [_Location_file]: null
      });
    },
    get C131() {
      return C131 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 122,
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
        [_Location_column]: 20,
        [_Location_line]: 120,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C134() {
      return C134 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 120,
        [_Location_file]: null
      });
    },
    get C135() {
      return C135 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 13,
        [_Location_line]: 141,
        [_Location_file]: null
      });
    },
    get C133() {
      return C133 = dart.constList([C134 || CT.C134, C135 || CT.C135], widget_inspector._Location);
    },
    get C132() {
      return C132 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C133 || CT.C133,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 119,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C138() {
      return C138 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 9,
        [_Location_line]: 118,
        [_Location_file]: null
      });
    },
    get C139() {
      return C139 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 9,
        [_Location_line]: 119,
        [_Location_file]: null
      });
    },
    get C137() {
      return C137 = dart.constList([C138 || CT.C138, C139 || CT.C139], widget_inspector._Location);
    },
    get C136() {
      return C136 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C137 || CT.C137,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 117,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C142() {
      return C142 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "strokeWidth",
        [_Location_column]: 19,
        [_Location_line]: 150,
        [_Location_file]: null
      });
    },
    get C143() {
      return C143 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 19,
        [_Location_line]: 151,
        [_Location_file]: null
      });
    },
    get C141() {
      return C141 = dart.constList([C142 || CT.C142, C143 || CT.C143], widget_inspector._Location);
    },
    get C140() {
      return C140 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C141 || CT.C141,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 149,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C146() {
      return C146 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 17,
        [_Location_line]: 147,
        [_Location_file]: null
      });
    },
    get C147() {
      return C147 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 148,
        [_Location_file]: null
      });
    },
    get C148() {
      return C148 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 149,
        [_Location_file]: null
      });
    },
    get C145() {
      return C145 = dart.constList([C146 || CT.C146, C147 || CT.C147, C148 || CT.C148], widget_inspector._Location);
    },
    get C144() {
      return C144 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C145 || CT.C145,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 146,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C151() {
      return C151 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 146,
        [_Location_file]: null
      });
    },
    get C150() {
      return C150 = dart.constList([C151 || CT.C151], widget_inspector._Location);
    },
    get C149() {
      return C149 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C150 || CT.C150,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 145,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C152() {
      return C152 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 20,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 20
      });
    },
    get C155() {
      return C155 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 164,
        [_Location_file]: null
      });
    },
    get C156() {
      return C156 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 165,
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
        [_Location_column]: 27,
        [_Location_line]: 163,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C159() {
      return C159 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 168,
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
        [_Location_column]: 27,
        [_Location_line]: 167,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C162() {
      return C162 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "controller",
        [_Location_column]: 29,
        [_Location_line]: 171,
        [_Location_file]: null
      });
    },
    get C163() {
      return C163 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 172,
        [_Location_file]: null
      });
    },
    get C164() {
      return C164 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 173,
        [_Location_file]: null
      });
    },
    get C165() {
      return C165 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 175,
        [_Location_file]: null
      });
    },
    get C166() {
      return C166 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 186,
        [_Location_file]: null
      });
    },
    get C161() {
      return C161 = dart.constList([C162 || CT.C162, C163 || CT.C163, C164 || CT.C164, C165 || CT.C165, C166 || CT.C166], widget_inspector._Location);
    },
    get C160() {
      return C160 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C161 || CT.C161,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 170,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C169() {
      return C169 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 198,
        [_Location_file]: null
      });
    },
    get C168() {
      return C168 = dart.constList([C169 || CT.C169], widget_inspector._Location);
    },
    get C167() {
      return C167 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C168 || CT.C168,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 197,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C172() {
      return C172 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 201,
        [_Location_file]: null
      });
    },
    get C171() {
      return C171 = dart.constList([C172 || CT.C172], widget_inspector._Location);
    },
    get C170() {
      return C170 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C171 || CT.C171,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 200,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C175() {
      return C175 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 204,
        [_Location_file]: null
      });
    },
    get C176() {
      return C176 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 205,
        [_Location_file]: null
      });
    },
    get C174() {
      return C174 = dart.constList([C175 || CT.C175, C176 || CT.C176], widget_inspector._Location);
    },
    get C173() {
      return C173 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C174 || CT.C174,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 203,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C179() {
      return C179 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 208,
        [_Location_file]: null
      });
    },
    get C178() {
      return C178 = dart.constList([C179 || CT.C179], widget_inspector._Location);
    },
    get C177() {
      return C177 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C178 || CT.C178,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 207,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C182() {
      return C182 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "controller",
        [_Location_column]: 29,
        [_Location_line]: 211,
        [_Location_file]: null
      });
    },
    get C183() {
      return C183 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 212,
        [_Location_file]: null
      });
    },
    get C184() {
      return C184 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 213,
        [_Location_file]: null
      });
    },
    get C185() {
      return C185 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 215,
        [_Location_file]: null
      });
    },
    get C186() {
      return C186 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 226,
        [_Location_file]: null
      });
    },
    get C181() {
      return C181 = dart.constList([C182 || CT.C182, C183 || CT.C183, C184 || CT.C184, C185 || CT.C185, C186 || CT.C186], widget_inspector._Location);
    },
    get C180() {
      return C180 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C181 || CT.C181,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 210,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C189() {
      return C189 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 238,
        [_Location_file]: null
      });
    },
    get C188() {
      return C188 = dart.constList([C189 || CT.C189], widget_inspector._Location);
    },
    get C187() {
      return C187 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C188 || CT.C188,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 237,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C192() {
      return C192 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 241,
        [_Location_file]: null
      });
    },
    get C193() {
      return C193 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 242,
        [_Location_file]: null
      });
    },
    get C191() {
      return C191 = dart.constList([C192 || CT.C192, C193 || CT.C193], widget_inspector._Location);
    },
    get C190() {
      return C190 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C191 || CT.C191,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 240,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C196() {
      return C196 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 245,
        [_Location_file]: null
      });
    },
    get C195() {
      return C195 = dart.constList([C196 || CT.C196], widget_inspector._Location);
    },
    get C194() {
      return C194 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C195 || CT.C195,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 244,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C199() {
      return C199 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "controller",
        [_Location_column]: 29,
        [_Location_line]: 248,
        [_Location_file]: null
      });
    },
    get C200() {
      return C200 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 249,
        [_Location_file]: null
      });
    },
    get C201() {
      return C201 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 250,
        [_Location_file]: null
      });
    },
    get C202() {
      return C202 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 252,
        [_Location_file]: null
      });
    },
    get C203() {
      return C203 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 263,
        [_Location_file]: null
      });
    },
    get C198() {
      return C198 = dart.constList([C199 || CT.C199, C200 || CT.C200, C201 || CT.C201, C202 || CT.C202, C203 || CT.C203], widget_inspector._Location);
    },
    get C197() {
      return C197 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C198 || CT.C198,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 247,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C206() {
      return C206 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 272,
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
        [_Location_column]: 27,
        [_Location_line]: 271,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C209() {
      return C209 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 275,
        [_Location_file]: null
      });
    },
    get C210() {
      return C210 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 276,
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
        [_Location_column]: 27,
        [_Location_line]: 274,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C213() {
      return C213 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 279,
        [_Location_file]: null
      });
    },
    get C212() {
      return C212 = dart.constList([C213 || CT.C213], widget_inspector._Location);
    },
    get C211() {
      return C211 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C212 || CT.C212,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 278,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C216() {
      return C216 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "controller",
        [_Location_column]: 29,
        [_Location_line]: 282,
        [_Location_file]: null
      });
    },
    get C217() {
      return C217 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 283,
        [_Location_file]: null
      });
    },
    get C218() {
      return C218 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 284,
        [_Location_file]: null
      });
    },
    get C219() {
      return C219 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 286,
        [_Location_file]: null
      });
    },
    get C220() {
      return C220 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 297,
        [_Location_file]: null
      });
    },
    get C215() {
      return C215 = dart.constList([C216 || CT.C216, C217 || CT.C217, C218 || CT.C218, C219 || CT.C219, C220 || CT.C220], widget_inspector._Location);
    },
    get C214() {
      return C214 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C215 || CT.C215,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 281,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C223() {
      return C223 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 306,
        [_Location_file]: null
      });
    },
    get C222() {
      return C222 = dart.constList([C223 || CT.C223], widget_inspector._Location);
    },
    get C221() {
      return C221 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C222 || CT.C222,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 305,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C226() {
      return C226 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 309,
        [_Location_file]: null
      });
    },
    get C227() {
      return C227 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 310,
        [_Location_file]: null
      });
    },
    get C225() {
      return C225 = dart.constList([C226 || CT.C226, C227 || CT.C227], widget_inspector._Location);
    },
    get C224() {
      return C224 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C225 || CT.C225,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 308,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C230() {
      return C230 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 313,
        [_Location_file]: null
      });
    },
    get C229() {
      return C229 = dart.constList([C230 || CT.C230], widget_inspector._Location);
    },
    get C228() {
      return C228 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C229 || CT.C229,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 312,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C233() {
      return C233 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "controller",
        [_Location_column]: 29,
        [_Location_line]: 316,
        [_Location_file]: null
      });
    },
    get C234() {
      return C234 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 29,
        [_Location_line]: 317,
        [_Location_file]: null
      });
    },
    get C235() {
      return C235 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 319,
        [_Location_file]: null
      });
    },
    get C236() {
      return C236 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 29,
        [_Location_line]: 320,
        [_Location_file]: null
      });
    },
    get C237() {
      return C237 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 29,
        [_Location_line]: 331,
        [_Location_file]: null
      });
    },
    get C232() {
      return C232 = dart.constList([C233 || CT.C233, C234 || CT.C234, C235 || CT.C235, C236 || CT.C236, C237 || CT.C237], widget_inspector._Location);
    },
    get C231() {
      return C231 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C232 || CT.C232,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 315,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C240() {
      return C240 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 340,
        [_Location_file]: null
      });
    },
    get C239() {
      return C239 = dart.constList([C240 || CT.C240], widget_inspector._Location);
    },
    get C238() {
      return C238 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C239 || CT.C239,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 339,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C243() {
      return C243 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 33,
        [_Location_line]: 353,
        [_Location_file]: null
      });
    },
    get C244() {
      return C244 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 33,
        [_Location_line]: 354,
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
        [_Location_column]: 38,
        [_Location_line]: 352,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C247() {
      return C247 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 31,
        [_Location_line]: 351,
        [_Location_file]: null
      });
    },
    get C248() {
      return C248 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 31,
        [_Location_line]: 352,
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
        [_Location_column]: 36,
        [_Location_line]: 350,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C251() {
      return C251 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 29,
        [_Location_line]: 343,
        [_Location_file]: null
      });
    },
    get C252() {
      return C252 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 29,
        [_Location_line]: 344,
        [_Location_file]: null
      });
    },
    get C253() {
      return C253 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 29,
        [_Location_line]: 350,
        [_Location_file]: null
      });
    },
    get C250() {
      return C250 = dart.constList([C251 || CT.C251, C252 || CT.C252, C253 || CT.C253], widget_inspector._Location);
    },
    get C249() {
      return C249 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C250 || CT.C250,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 342,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C256() {
      return C256 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 162,
        [_Location_file]: null
      });
    },
    get C255() {
      return C255 = dart.constList([C256 || CT.C256], widget_inspector._Location);
    },
    get C254() {
      return C254 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C255 || CT.C255,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 161,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C259() {
      return C259 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 23,
        [_Location_line]: 160,
        [_Location_file]: null
      });
    },
    get C260() {
      return C260 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 161,
        [_Location_file]: null
      });
    },
    get C258() {
      return C258 = dart.constList([C259 || CT.C259, C260 || CT.C260], widget_inspector._Location);
    },
    get C257() {
      return C257 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C258 || CT.C258,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 159,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C263() {
      return C263 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 17,
        [_Location_line]: 158,
        [_Location_file]: null
      });
    },
    get C262() {
      return C262 = dart.constList([C263 || CT.C263], widget_inspector._Location);
    },
    get C261() {
      return C261 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C262 || CT.C262,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 157,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C266() {
      return C266 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 15,
        [_Location_line]: 156,
        [_Location_file]: null
      });
    },
    get C267() {
      return C267 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 157,
        [_Location_file]: null
      });
    },
    get C265() {
      return C265 = dart.constList([C266 || CT.C266, C267 || CT.C267], widget_inspector._Location);
    },
    get C264() {
      return C264 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C265 || CT.C265,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 155,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C270() {
      return C270 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 7,
        [_Location_line]: 116,
        [_Location_file]: null
      });
    },
    get C271() {
      return C271 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 7,
        [_Location_line]: 117,
        [_Location_file]: null
      });
    },
    get C272() {
      return C272 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 7,
        [_Location_line]: 144,
        [_Location_file]: null
      });
    },
    get C269() {
      return C269 = dart.constList([C270 || CT.C270, C271 || CT.C271, C272 || CT.C272], widget_inspector._Location);
    },
    get C268() {
      return C268 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C269 || CT.C269,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 115,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C273() {
      return C273 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C68 || CT.C68,
        [_Location_name]: null,
        [_Location_column]: 53,
        [_Location_line]: 369,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/settings.dart"
      });
    },
    get C274() {
      return C274 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C68 || CT.C68,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 53,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/main.dart"
      });
    },
    get C277() {
      return C277 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 13,
        [_Location_line]: 48,
        [_Location_file]: null
      });
    },
    get C278() {
      return C278 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "debugShowCheckedModeBanner",
        [_Location_column]: 13,
        [_Location_line]: 49,
        [_Location_file]: null
      });
    },
    get C279() {
      return C279 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "theme",
        [_Location_column]: 13,
        [_Location_line]: 50,
        [_Location_file]: null
      });
    },
    get C280() {
      return C280 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "home",
        [_Location_column]: 13,
        [_Location_line]: 53,
        [_Location_file]: null
      });
    },
    get C276() {
      return C276 = dart.constList([C277 || CT.C277, C278 || CT.C278, C279 || CT.C279, C280 || CT.C280], widget_inspector._Location);
    },
    get C275() {
      return C275 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C276 || CT.C276,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 47,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/main.dart"
      });
    },
    get C283() {
      return C283 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "initialData",
        [_Location_column]: 9,
        [_Location_line]: 42,
        [_Location_file]: null
      });
    },
    get C284() {
      return C284 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 9,
        [_Location_line]: 43,
        [_Location_file]: null
      });
    },
    get C285() {
      return C285 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 9,
        [_Location_line]: 44,
        [_Location_file]: null
      });
    },
    get C282() {
      return C282 = dart.constList([C283 || CT.C283, C284 || CT.C284, C285 || CT.C285], widget_inspector._Location);
    },
    get C281() {
      return C281 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C282 || CT.C282,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 41,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/main.dart"
      });
    },
    get C286() {
      return C286 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C68 || CT.C68,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 100,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/main.dart"
      });
    },
    get C287() {
      return C287 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C68 || CT.C68,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 111,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/main.dart"
      });
    },
    get C288() {
      return C288 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C68 || CT.C68,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 122,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/main.dart"
      });
    },
    get C291() {
      return C291 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 7,
        [_Location_line]: 129,
        [_Location_file]: null
      });
    },
    get C290() {
      return C290 = dart.constList([C291 || CT.C291], widget_inspector._Location);
    },
    get C289() {
      return C289 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C290 || CT.C290,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 128,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/main.dart"
      });
    },
    get C292() {
      return C292 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C68 || CT.C68,
        [_Location_name]: null,
        [_Location_column]: 10,
        [_Location_line]: 18,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/main.dart"
      });
    }
  });
  dev_signin.DevSignIn = class DevSignIn extends framework.StatefulWidget {
    createState() {
      return new dev_signin._DevSignInState.new();
    }
  };
  (dev_signin.DevSignIn.new = function(opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    dev_signin.DevSignIn.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = dev_signin.DevSignIn.prototype;
  dart.addTypeTests(dev_signin.DevSignIn);
  dart.setMethodSignature(dev_signin.DevSignIn, () => ({
    __proto__: dart.getMethods(dev_signin.DevSignIn.__proto__),
    createState: dart.fnType(dev_signin._DevSignInState, [])
  }));
  dart.setLibraryUri(dev_signin.DevSignIn, "package:bfnmobile/ui/dev_signin.dart");
  const _key = dart.privateName(dev_signin, "_key");
  const _users = dart.privateName(dev_signin, "_users");
  const _getData = dart.privateName(dev_signin, "_getData");
  const _getNodes = dart.privateName(dev_signin, "_getNodes");
  const _filter = dart.privateName(dev_signin, "_filter");
  const _getUsers = dart.privateName(dev_signin, "_getUsers");
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
  const _signIn = dart.privateName(dev_signin, "_signIn");
  const _dropDownChanged = dart.privateName(dev_signin, "_dropDownChanged");
  let C13;
  let C12;
  let C11;
  let C16;
  let C15;
  let C14;
  let C19;
  let C18;
  let C17;
  let C22;
  let C23;
  let C24;
  let C21;
  let C20;
  let C27;
  let C26;
  let C25;
  let C30;
  let C31;
  let C29;
  let C28;
  let C34;
  let C33;
  let C32;
  let C37;
  let C36;
  let C35;
  let C40;
  let C39;
  let C38;
  let C43;
  let C44;
  let C42;
  let C41;
  let C47;
  let C46;
  let C45;
  let C50;
  let C51;
  let C49;
  let C48;
  let C54;
  let C53;
  let C52;
  let C57;
  let C56;
  let C55;
  let C60;
  let C61;
  let C59;
  let C58;
  let C64;
  let C65;
  let C66;
  let C63;
  let C62;
  let C68;
  let C67;
  const EdgeInsets_bottom = dart.privateName(edge_insets, "EdgeInsets.bottom");
  const EdgeInsets_right = dart.privateName(edge_insets, "EdgeInsets.right");
  const EdgeInsets_top = dart.privateName(edge_insets, "EdgeInsets.top");
  const EdgeInsets_left = dart.privateName(edge_insets, "EdgeInsets.left");
  let C69;
  let C72;
  let C73;
  let C71;
  let C70;
  let C76;
  let C77;
  let C75;
  let C74;
  let C80;
  let C79;
  let C78;
  let C83;
  let C84;
  let C85;
  let C82;
  let C81;
  let C88;
  let C89;
  let C87;
  let C86;
  let C92;
  let C93;
  let C91;
  let C90;
  let C96;
  let C97;
  let C95;
  let C94;
  let C100;
  let C101;
  let C99;
  let C98;
  let C104;
  let C105;
  let C106;
  let C103;
  let C102;
  dev_signin._DevSignInState = class _DevSignInState extends framework.State$(dev_signin.DevSignIn) {
    initState() {
      super.initState();
      this[_getData]();
    }
    [_getData]() {
      return async.async(dart.dynamic, (function* _getData() {
        this.setState(dart.fn(() => {
          this.isBusy = true;
        }, VoidToNull()));
        yield this[_getNodes]();
        this.setState(dart.fn(() => {
          this.isBusy = false;
        }, VoidToNull()));
      }).bind(this));
    }
    [_getUsers]() {
      return async.async(dart.dynamic, (function* _getUsers() {
        this.setState(dart.fn(() => {
          this.isBusy = true;
        }, VoidToNull()));
        try {
          this[_users] = (yield net.Net.getUsers());
          this[_filter]();
          core.print("_DevSignInState  🍊  🍊  🍊  Users found: " + dart.str(this[_users][$length]) + " 🍊  🍊  🍊 ");
          this.setState(dart.fn(() => {
            this.isBusy = false;
          }, VoidToNull()));
        } catch (e$) {
          let e = dart.getThrown(e$);
          snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: "We have a problem", actionLabel: ""});
        }
      }).bind(this));
    }
    [_getNodes]() {
      return async.async(dart.dynamic, (function* _getNodes() {
        this.nodes = (yield net.Net.listNodes());
        core.print("🌸 🌸 🌸 nodes found: " + dart.str(this.nodes[$length]));
        this.nodes[$forEach](dart.fn(n => {
          if (n != null) {
            if (n.webAPIUrl != null) {
              if (!n.addresses[$elementAt](0)[$contains]("Regulator")) {
                core.print("🌸 🌸 🌸 add to dropdown " + dart.str(n.webAPIUrl));
                this.items[$add](new (DropdownMenuItemOfNodeInfo()).new({value: n, child: new text.Text.new(n.addresses[$elementAt](0), {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C0 || CT.C0}), $creationLocationd_0dea112b090073317d4: C4 || CT.C4}));
              }
            } else {
              core.print(" 👿  👿  👿 ignore possible notary node - no webAPIUrl available");
            }
          }
        }, NodeInfoToNull()));
        core.print("🍊 ..................dropDownItems: " + dart.str(this.items[$length]));
      }).bind(this));
    }
    [_signIn](user) {
      return async.async(dart.dynamic, (function* _signIn() {
        this.setState(dart.fn(() => {
          this.isBusy = true;
        }, VoidToNull()));
        let m = (yield net.Net.getAccount(user.uid));
        if (m == null) {
          snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: "Account does not exist"});
          return;
        }
        yield prefs.Prefs.saveAccount(m);
        let email = dotenv.DotEnv.new().env[$_get]("email");
        let pass = dotenv.DotEnv.new().env[$_get]("password");
        let authResult = (yield this.auth.signInWithEmailAndPassword({email: email, password: pass}));
        if (authResult.user != null) {
          core.print("🔑 🔑 🔑 🔑 🔑 " + dart.str(authResult.user.displayName) + " 🔑 has logged in, starting Profile settings");
          navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new settings.Settings.new(m, {$creationLocationd_0dea112b090073317d4: C8 || CT.C8})}));
        } else {
          snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: "User does not exist on Firebase auth"});
        }
      }).bind(this));
    }
    [_filter]() {
      let mList = JSArrayOfUserDTO().of([]);
      this[_users][$forEach](dart.fn(u => {
        if (u.email[$contains]("aubrey33@aftarobot.com") || u.email[$contains]("aubrey@gmail.com") || u.email[$contains]("aubrey@bfn.com")) {
          core.print("🔆 🔆 🔆 IGNORED - " + dart.str(u.toJson()));
        } else {
          mList[$add](u);
        }
      }, UserDTOToNull()));
      this[_users] = mList;
      this[_users][$sort](dart.fn((a, b) => a.name[$compareTo](b.name), UserDTOAndUserDTOToint()));
    }
    [_dropDownChanged](value) {
      return async.async(dart.void, (function* _dropDownChanged() {
        this.selectedNode = value;
        core.print("🌸 🌸 🌸 Selected node: " + dart.str(this.selectedNode.toJson()));
        this.setState(dart.fn(() => {
        }, VoidToNull()));
        yield prefs.Prefs.saveNode(this.selectedNode);
        this[_getUsers]();
      }).bind(this));
    }
    build(context) {
      return new scaffold.Scaffold.new({key: this[_key], appBar: new app_bar.AppBar.new({title: new text.Text.new("BFN Login Helper", {$creationLocationd_0dea112b090073317d4: C11 || CT.C11}), backgroundColor: colors.Colors.teal._get(400), bottom: new preferred_size.PreferredSize.new({child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C14 || CT.C14}), new (DropdownButtonOfNodeInfo()).new({items: this.items, hint: new text.Text.new("Select Network Node", {$creationLocationd_0dea112b090073317d4: C17 || CT.C17}), onChanged: dart.bind(this, _dropDownChanged), $creationLocationd_0dea112b090073317d4: C20 || CT.C20}), new basic.SizedBox.new({height: 28.0, $creationLocationd_0dea112b090073317d4: C25 || CT.C25}), new text.Text.new(this.selectedNode == null ? "" : this.selectedNode.addresses[$elementAt](0), {style: functions.Styles.whiteBoldSmall, $creationLocationd_0dea112b090073317d4: C28 || CT.C28}), new basic.SizedBox.new({height: 16.0, $creationLocationd_0dea112b090073317d4: C32 || CT.C32}), new basic.Row.new({mainAxisAlignment: flex.MainAxisAlignment.end, children: JSArrayOfWidget().of([new text.Text.new("Number of Accounts", {$creationLocationd_0dea112b090073317d4: C35 || CT.C35}), new basic.SizedBox.new({width: 12.0, $creationLocationd_0dea112b090073317d4: C38 || CT.C38}), new text.Text.new(dart.str(this[_users][$length]), {style: functions.Styles.whiteBoldMedium, $creationLocationd_0dea112b090073317d4: C41 || CT.C41}), new basic.SizedBox.new({width: 40.0, $creationLocationd_0dea112b090073317d4: C45 || CT.C45})]), $creationLocationd_0dea112b090073317d4: C48 || CT.C48}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C52 || CT.C52})]), $creationLocationd_0dea112b090073317d4: C55 || CT.C55}), preferredSize: new ui.Size.fromHeight(140.0), $creationLocationd_0dea112b090073317d4: C58 || CT.C58}), $creationLocationd_0dea112b090073317d4: C62 || CT.C62}), body: dart.test(this.isBusy) ? new basic.Center.new({$creationLocationd_0dea112b090073317d4: C67 || CT.C67}) : new scroll_view.ListView.builder({itemCount: this[_users][$length], itemBuilder: dart.fn((context, index) => {
            let user = this[_users][$elementAt](index);
            return new basic.Padding.new({padding: C69 || CT.C69, child: new card.Card.new({elevation: 2.0, child: new gesture_detector.GestureDetector.new({onTap: dart.fn(() => {
                    this[_signIn](user);
                  }, VoidToNull()), child: new list_tile.ListTile.new({leading: new icon.Icon.new(icons.Icons.person, {color: functions.getRandomColor(), $creationLocationd_0dea112b090073317d4: C70 || CT.C70}), title: new text.Text.new(user.name == null ? "name WTF" : user.name, {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C74 || CT.C74}), subtitle: new text.Text.new(user.email == null ? "email wtf" : user.email, {$creationLocationd_0dea112b090073317d4: C78 || CT.C78}), $creationLocationd_0dea112b090073317d4: C81 || CT.C81}), $creationLocationd_0dea112b090073317d4: C86 || CT.C86}), $creationLocationd_0dea112b090073317d4: C90 || CT.C90}), $creationLocationd_0dea112b090073317d4: C94 || CT.C94});
          }, BuildContextAndintToPadding()), $creationLocationd_0dea112b090073317d4: C98 || CT.C98}), $creationLocationd_0dea112b090073317d4: C102 || CT.C102});
    }
  };
  (dev_signin._DevSignInState.new = function() {
    this[_key] = GlobalKeyOfScaffoldState().new();
    this[_users] = JSArrayOfUserDTO().of([]);
    this.auth = firebase_auth.FirebaseAuth.instance;
    this.nodes = JSArrayOfNodeInfo().of([]);
    this.items = JSArrayOfDropdownMenuItemOfNodeInfo().of([]);
    this.isBusy = false;
    this.selectedNode = null;
    dev_signin._DevSignInState.__proto__.new.call(this);
    ;
  }).prototype = dev_signin._DevSignInState.prototype;
  dart.addTypeTests(dev_signin._DevSignInState);
  dart.setMethodSignature(dev_signin._DevSignInState, () => ({
    __proto__: dart.getMethods(dev_signin._DevSignInState.__proto__),
    [_getData]: dart.fnType(dart.dynamic, []),
    [_getUsers]: dart.fnType(dart.dynamic, []),
    [_getNodes]: dart.fnType(dart.dynamic, []),
    [_signIn]: dart.fnType(dart.dynamic, [user.UserDTO]),
    [_filter]: dart.fnType(dart.dynamic, []),
    [_dropDownChanged]: dart.fnType(dart.void, [node_info.NodeInfo]),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setLibraryUri(dev_signin._DevSignInState, "package:bfnmobile/ui/dev_signin.dart");
  dart.setFieldSignature(dev_signin._DevSignInState, () => ({
    __proto__: dart.getFields(dev_signin._DevSignInState.__proto__),
    [_key]: dart.finalFieldType(framework.GlobalKey$(scaffold.ScaffoldState)),
    [_users]: dart.fieldType(core.List$(user.UserDTO)),
    auth: dart.fieldType(firebase_auth.FirebaseAuth),
    nodes: dart.fieldType(core.List$(node_info.NodeInfo)),
    items: dart.fieldType(core.List$(dropdown.DropdownMenuItem$(node_info.NodeInfo))),
    isBusy: dart.fieldType(core.bool),
    selectedNode: dart.fieldType(node_info.NodeInfo)
  }));
  const account$ = dart.privateName(settings, "Settings.account");
  settings.Settings = class Settings extends framework.StatefulWidget {
    get account() {
      return this[account$];
    }
    set account(value) {
      super.account = value;
    }
    createState() {
      return new settings._SettingsState.new();
    }
  };
  (settings.Settings.new = function(account, opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[account$] = account;
    settings.Settings.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = settings.Settings.prototype;
  dart.addTypeTests(settings.Settings);
  dart.setMethodSignature(settings.Settings, () => ({
    __proto__: dart.getMethods(settings.Settings.__proto__),
    createState: dart.fnType(settings._SettingsState, [])
  }));
  dart.setLibraryUri(settings.Settings, "package:bfnmobile/ui/settings.dart");
  dart.setFieldSignature(settings.Settings, () => ({
    __proto__: dart.getFields(settings.Settings.__proto__),
    account: dart.finalFieldType(account.AccountInfo)
  }));
  const _defaultDiscountController = dart.privateName(settings, "_defaultDiscountController");
  const _maximumDiscountController = dart.privateName(settings, "_maximumDiscountController");
  const _minInvoiceController = dart.privateName(settings, "_minInvoiceController");
  const _maxInvoiceController = dart.privateName(settings, "_maxInvoiceController");
  const _totalInvoiceController = dart.privateName(settings, "_totalInvoiceController");
  const _supplierProfile = dart.privateName(settings, "_supplierProfile");
  const _investorProfile = dart.privateName(settings, "_investorProfile");
  const _key$ = dart.privateName(settings, "_key");
  const _defaultDiscountKey = dart.privateName(settings, "_defaultDiscountKey");
  const _formKey = dart.privateName(settings, "_formKey");
  const _getExistingProfiles = dart.privateName(settings, "_getExistingProfiles");
  const _createSupplier = dart.privateName(settings, "_createSupplier");
  const _createInvestorProfile = dart.privateName(settings, "_createInvestorProfile");
  const _createProfiles = dart.privateName(settings, "_createProfiles");
  let C109;
  let C108;
  let C107;
  let C110;
  let C113;
  let C114;
  let C112;
  let C111;
  let C117;
  let C116;
  let C115;
  let C120;
  let C121;
  let C119;
  let C118;
  let C124;
  let C123;
  let C122;
  let C127;
  let C126;
  let C125;
  let C130;
  let C131;
  let C129;
  let C128;
  let C134;
  let C135;
  let C133;
  let C132;
  let C138;
  let C139;
  let C137;
  let C136;
  let C142;
  let C143;
  let C141;
  let C140;
  let C146;
  let C147;
  let C148;
  let C145;
  let C144;
  let C151;
  let C150;
  let C149;
  let C152;
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
  let C166;
  let C161;
  let C160;
  let C169;
  let C168;
  let C167;
  let C172;
  let C171;
  let C170;
  let C175;
  let C176;
  let C174;
  let C173;
  let C179;
  let C178;
  let C177;
  let C182;
  let C183;
  let C184;
  let C185;
  let C186;
  let C181;
  let C180;
  let C189;
  let C188;
  let C187;
  let C192;
  let C193;
  let C191;
  let C190;
  let C196;
  let C195;
  let C194;
  let C199;
  let C200;
  let C201;
  let C202;
  let C203;
  let C198;
  let C197;
  let C206;
  let C205;
  let C204;
  let C209;
  let C210;
  let C208;
  let C207;
  let C213;
  let C212;
  let C211;
  let C216;
  let C217;
  let C218;
  let C219;
  let C220;
  let C215;
  let C214;
  let C223;
  let C222;
  let C221;
  let C226;
  let C227;
  let C225;
  let C224;
  let C230;
  let C229;
  let C228;
  let C233;
  let C234;
  let C235;
  let C236;
  let C237;
  let C232;
  let C231;
  let C240;
  let C239;
  let C238;
  let C243;
  let C244;
  let C242;
  let C241;
  let C247;
  let C248;
  let C246;
  let C245;
  let C251;
  let C252;
  let C253;
  let C250;
  let C249;
  let C256;
  let C255;
  let C254;
  let C259;
  let C260;
  let C258;
  let C257;
  let C263;
  let C262;
  let C261;
  let C266;
  let C267;
  let C265;
  let C264;
  let C270;
  let C271;
  let C272;
  let C269;
  let C268;
  let C273;
  settings._SettingsState = class _SettingsState extends framework.State$(settings.Settings) {
    initState() {
      super.initState();
      this[_getExistingProfiles]();
    }
    [_getExistingProfiles]() {
      return async.async(dart.void, (function* _getExistingProfiles() {
        this[_supplierProfile] = (yield net.Net.getSupplierProfile(this.widget.account.identifier));
        this[_investorProfile] = (yield net.Net.getInvestorProfile(this.widget.account.identifier));
        if (this[_supplierProfile] != null) {
          this[_maximumDiscountController] = new editable_text.TextEditingController.new({text: dart.toString(this[_supplierProfile].maximumDiscount)});
        }
        if (this[_investorProfile] != null) {
          this[_minInvoiceController] = new editable_text.TextEditingController.new({text: dart.toString(this[_investorProfile].minimumInvoiceAmount)});
          this[_maxInvoiceController] = new editable_text.TextEditingController.new({text: dart.toString(this[_investorProfile].maximumInvoiceAmount)});
          this[_totalInvoiceController] = new editable_text.TextEditingController.new({text: dart.toString(this[_investorProfile].totalInvestment)});
          this[_defaultDiscountController] = new editable_text.TextEditingController.new({text: dart.toString(this[_investorProfile].defaultDiscount)});
        }
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    [_createSupplier]() {
      return async.async(dart.dynamic, (function* _createSupplier() {
        this[_supplierProfile] = new profile.SupplierProfile.new({issuedBy: "me", maximumDiscount: this.maximumDiscount, date: new core.DateTime.now().toIso8601String(), accountId: this.widget.account.identifier});
        let result = (yield net.Net.createSupplierProfile(this[_supplierProfile]));
        core.print("🍎 🍎 🍎 Result from _createInvestorProfile: 🍎 " + dart.str(result));
      }).bind(this));
    }
    [_createInvestorProfile]() {
      return async.async(dart.dynamic, (function* _createInvestorProfile() {
        this[_investorProfile] = new profile.InvestorProfile.new({issuedBy: "me", accountId: this.widget.account.identifier, date: new core.DateTime.now().toIso8601String(), defaultDiscount: this.defaultDiscount, minimumInvoiceAmount: this.minimumInvoiceAmt, maximumInvoiceAmount: this.maximumInvoiceAmt});
        let result = (yield net.Net.createInvestorProfile(this[_investorProfile]));
        core.print("🍊 🍊 🍊 Result from _createInvestorProfile: 🍊 " + dart.str(result));
      }).bind(this));
    }
    [_createProfiles]() {
      return async.async(dart.void, (function* _createProfiles() {
        this.setState(dart.fn(() => {
          this.isBusy = true;
        }, VoidToNull()));
        try {
          yield this[_createSupplier]();
          yield this[_createInvestorProfile]();
          this.setState(dart.fn(() => {
            this.isBusy = false;
          }, VoidToNull()));
          snack.AppSnackbar.showSnackbarWithAction({scaffoldKey: this[_key$], message: "Profile created OK", textColor: colors.Colors.greenAccent, backgroundColor: colors.Colors.black, actionLabel: "Done!", listener: this});
        } catch (e$) {
          let e = dart.getThrown(e$);
          core.print(e);
          this.setState(dart.fn(() => {
            this.isBusy = false;
          }, VoidToNull()));
        }
      }).bind(this));
    }
    build(context) {
      return new scaffold.Scaffold.new({key: this[_key$], appBar: new app_bar.AppBar.new({title: new text.Text.new("Profile Settings", {$creationLocationd_0dea112b090073317d4: C107 || CT.C107}), bottom: new preferred_size.PreferredSize.new({child: new basic.Padding.new({padding: C110 || CT.C110, child: new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new(this.widget.account.name, {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C111 || CT.C111}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C115 || CT.C115}), new text.Text.new("Settings to control how BFN will help you buy and sell invoices on the platform ", {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C118 || CT.C118}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C122 || CT.C122})]), $creationLocationd_0dea112b090073317d4: C125 || CT.C125}), $creationLocationd_0dea112b090073317d4: C128 || CT.C128}), preferredSize: new ui.Size.fromHeight(100.0), $creationLocationd_0dea112b090073317d4: C132 || CT.C132}), $creationLocationd_0dea112b090073317d4: C136 || CT.C136}), body: dart.test(this.isBusy) ? new basic.Center.new({child: new container.Container.new({width: 100.0, height: 100.0, child: new progress_indicator.CircularProgressIndicator.new({strokeWidth: 12.0, backgroundColor: colors.Colors.pink, $creationLocationd_0dea112b090073317d4: C140 || CT.C140}), $creationLocationd_0dea112b090073317d4: C144 || CT.C144}), $creationLocationd_0dea112b090073317d4: C149 || CT.C149}) : new basic.Padding.new({padding: C152 || CT.C152, child: new scroll_view.ListView.new({children: JSArrayOfWidget().of([new form.Form.new({key: this[_formKey], child: new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new("When SELLING invoices, the Maximum Discount (Percentage) To Accept from Investor", {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C153 || CT.C153}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C157 || CT.C157}), new text_form_field.TextFormField.new({controller: this[_maximumDiscountController], style: functions.Styles.blueBoldMedium, keyboardType: new text_input.TextInputType.numberWithOptions({signed: false, decimal: true}), decoration: new input_decorator.InputDecoration.new({focusedBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.greenAccent, width: 5.0})}), enabledBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.grey, width: 2.0})}), hintText: "0.00", labelText: "Maximum Discount To Accept"}), validator: dart.fn(value => {
                        if (value[$isEmpty]) {
                          return "Please enter Maximum Discount To Accept when you sell invoices";
                        }
                        if (value === "0.0") {
                          return "Please enter Maximum Discount To Accept when you sell invoices";
                        }
                        this.maximumDiscount = core.double.parse(value);
                        return null;
                      }, StringToString()), $creationLocationd_0dea112b090073317d4: C160 || CT.C160}), new basic.SizedBox.new({height: 40.0, $creationLocationd_0dea112b090073317d4: C167 || CT.C167}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C170 || CT.C170}), new text.Text.new("When BUYING invoices, the Default Discount (Percentage) to offer for Invoice", {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C173 || CT.C173}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C177 || CT.C177}), new text_form_field.TextFormField.new({controller: this[_defaultDiscountController], style: functions.Styles.pinkBoldMedium, keyboardType: new text_input.TextInputType.numberWithOptions({signed: false, decimal: true}), decoration: new input_decorator.InputDecoration.new({focusedBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.greenAccent, width: 5.0})}), enabledBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.grey, width: 2.0})}), hintText: "0.00", labelText: "Default Discount Required"}), validator: dart.fn(value => {
                        if (value[$isEmpty]) {
                          return "Please enter Default Discount Required when you buy invoices";
                        }
                        if (value === "0.0") {
                          return "Please enter Default Discount Requiredwhen you buy invoices";
                        }
                        this.defaultDiscount = core.double.parse(value);
                        return null;
                      }, StringToString()), $creationLocationd_0dea112b090073317d4: C180 || CT.C180}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C187 || CT.C187}), new text.Text.new("When BUYING invoices, the Minimum Invoice Amount you require", {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C190 || CT.C190}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C194 || CT.C194}), new text_form_field.TextFormField.new({controller: this[_minInvoiceController], style: functions.Styles.blueBoldMedium, keyboardType: new text_input.TextInputType.numberWithOptions({signed: false, decimal: true}), decoration: new input_decorator.InputDecoration.new({focusedBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.greenAccent, width: 5.0})}), enabledBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.grey, width: 2.0})}), hintText: "0.00", labelText: "Minimum Invoice Amount"}), validator: dart.fn(value => {
                        if (value[$isEmpty]) {
                          return "Please enter Minimum Invoice Amount required when you BUY invoices";
                        }
                        this.minimumInvoiceAmt = core.double.parse(value);
                        return null;
                      }, StringToString()), $creationLocationd_0dea112b090073317d4: C197 || CT.C197}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C204 || CT.C204}), new text.Text.new("When BUYING invoices, the Maximum Invoice Amount you will invest in", {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C207 || CT.C207}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C211 || CT.C211}), new text_form_field.TextFormField.new({controller: this[_maxInvoiceController], style: functions.Styles.blueBoldMedium, keyboardType: new text_input.TextInputType.numberWithOptions({signed: false, decimal: true}), decoration: new input_decorator.InputDecoration.new({focusedBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.greenAccent, width: 5.0})}), enabledBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.grey, width: 2.0})}), hintText: "0.00", labelText: "Maximum Invoice Amount"}), validator: dart.fn(value => {
                        if (value[$isEmpty]) {
                          return "Please enter Maximum Invoice Amount required when you BUY invoices";
                        }
                        this.maximumInvoiceAmt = core.double.parse(value);
                        return null;
                      }, StringToString()), $creationLocationd_0dea112b090073317d4: C214 || CT.C214}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C221 || CT.C221}), new text.Text.new("When making offers for invoices, the Total Investment Amount for all your offers", {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C224 || CT.C224}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C228 || CT.C228}), new text_form_field.TextFormField.new({controller: this[_totalInvoiceController], keyboardType: new text_input.TextInputType.numberWithOptions({signed: false, decimal: true}), style: functions.Styles.blackBoldMedium, decoration: new input_decorator.InputDecoration.new({focusedBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.greenAccent, width: 5.0})}), enabledBorder: new input_border.OutlineInputBorder.new({borderSide: new borders.BorderSide.new({color: colors.Colors.grey, width: 2.0})}), hintText: "0.00", labelText: "Total Investment Amount"}), validator: dart.fn(value => {
                        if (value[$isEmpty]) {
                          return "Please enter Total Investment Amount required when you BUY invoices";
                        }
                        this.totalInvestmentAmt = core.double.parse(value);
                        return null;
                      }, StringToString()), $creationLocationd_0dea112b090073317d4: C231 || CT.C231}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C238 || CT.C238}), new raised_button.RaisedButton.new({elevation: 8.0, onPressed: dart.fn(() => {
                        if (dart.test(this[_formKey].currentState.validate())) {
                          this[_createProfiles]();
                        }
                      }, VoidToNull()), child: new basic.Padding.new({padding: C110 || CT.C110, child: new text.Text.new("Create Profile", {style: functions.Styles.whiteMedium, $creationLocationd_0dea112b090073317d4: C241 || CT.C241}), $creationLocationd_0dea112b090073317d4: C245 || CT.C245}), $creationLocationd_0dea112b090073317d4: C249 || CT.C249})]), $creationLocationd_0dea112b090073317d4: C254 || CT.C254}), $creationLocationd_0dea112b090073317d4: C257 || CT.C257})]), $creationLocationd_0dea112b090073317d4: C261 || CT.C261}), $creationLocationd_0dea112b090073317d4: C264 || CT.C264}), $creationLocationd_0dea112b090073317d4: C268 || CT.C268});
    }
    onActionPressed(action) {
      navigator.Navigator.pop(core.Object, this.context);
      navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new main.ControllerPage.new({$creationLocationd_0dea112b090073317d4: C273 || CT.C273})}));
    }
  };
  (settings._SettingsState.new = function() {
    this[_defaultDiscountController] = new editable_text.TextEditingController.new();
    this[_maximumDiscountController] = new editable_text.TextEditingController.new();
    this[_minInvoiceController] = new editable_text.TextEditingController.new();
    this[_maxInvoiceController] = new editable_text.TextEditingController.new();
    this[_totalInvoiceController] = new editable_text.TextEditingController.new();
    this[_supplierProfile] = null;
    this[_investorProfile] = null;
    this[_key$] = GlobalKeyOfScaffoldState().new();
    this[_defaultDiscountKey] = GlobalKeyOfFormState().new();
    this[_formKey] = GlobalKeyOfFormState().new();
    this.isBusy = false;
    this.defaultDiscount = null;
    this.maximumDiscount = null;
    this.minimumInvoiceAmt = null;
    this.maximumInvoiceAmt = null;
    this.totalInvestmentAmt = null;
    settings._SettingsState.__proto__.new.call(this);
    ;
  }).prototype = settings._SettingsState.prototype;
  dart.addTypeTests(settings._SettingsState);
  settings._SettingsState[dart.implements] = () => [snack.SnackBarListener];
  dart.setMethodSignature(settings._SettingsState, () => ({
    __proto__: dart.getMethods(settings._SettingsState.__proto__),
    [_getExistingProfiles]: dart.fnType(dart.void, []),
    [_createSupplier]: dart.fnType(async.Future, []),
    [_createInvestorProfile]: dart.fnType(async.Future, []),
    [_createProfiles]: dart.fnType(dart.void, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    onActionPressed: dart.fnType(dart.dynamic, [core.int])
  }));
  dart.setLibraryUri(settings._SettingsState, "package:bfnmobile/ui/settings.dart");
  dart.setFieldSignature(settings._SettingsState, () => ({
    __proto__: dart.getFields(settings._SettingsState.__proto__),
    [_defaultDiscountController]: dart.fieldType(editable_text.TextEditingController),
    [_maximumDiscountController]: dart.fieldType(editable_text.TextEditingController),
    [_minInvoiceController]: dart.fieldType(editable_text.TextEditingController),
    [_maxInvoiceController]: dart.fieldType(editable_text.TextEditingController),
    [_totalInvoiceController]: dart.fieldType(editable_text.TextEditingController),
    [_supplierProfile]: dart.fieldType(profile.SupplierProfile),
    [_investorProfile]: dart.fieldType(profile.InvestorProfile),
    [_key$]: dart.fieldType(framework.GlobalKey$(scaffold.ScaffoldState)),
    [_defaultDiscountKey]: dart.fieldType(framework.GlobalKey$(form.FormState)),
    [_formKey]: dart.fieldType(framework.GlobalKey$(form.FormState)),
    isBusy: dart.fieldType(core.bool),
    defaultDiscount: dart.fieldType(core.double),
    maximumDiscount: dart.fieldType(core.double),
    minimumInvoiceAmt: dart.fieldType(core.double),
    maximumInvoiceAmt: dart.fieldType(core.double),
    totalInvestmentAmt: dart.fieldType(core.double)
  }));
  main.BFNMobileApp = class BFNMobileApp extends framework.StatefulWidget {
    createState() {
      return new main._BFNMobileAppState.new();
    }
  };
  (main.BFNMobileApp.new = function(opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    main.BFNMobileApp.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = main.BFNMobileApp.prototype;
  dart.addTypeTests(main.BFNMobileApp);
  dart.setMethodSignature(main.BFNMobileApp, () => ({
    __proto__: dart.getMethods(main.BFNMobileApp.__proto__),
    createState: dart.fnType(main._BFNMobileAppState, [])
  }));
  dart.setLibraryUri(main.BFNMobileApp, "package:bfnmobile/main.dart");
  const _getTheme = dart.privateName(main, "_getTheme");
  let C274;
  let C277;
  let C278;
  let C279;
  let C280;
  let C276;
  let C275;
  let C283;
  let C284;
  let C285;
  let C282;
  let C281;
  main._BFNMobileAppState = class _BFNMobileAppState extends framework.State$(main.BFNMobileApp) {
    [_getTheme]() {
      return async.async(dart.void, (function* _getTheme() {
        this.themeIndex = (yield prefs.Prefs.getThemeIndex());
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    initState() {
      super.initState();
      this[_getTheme]();
    }
    build(context) {
      return new (StreamBuilderOfint()).new({initialData: this.themeIndex == null ? 0 : this.themeIndex, stream: StreamOfint()._check(theme_bloc.themeBloc.newThemeStream), builder: dart.fn((context, snapShot) => {
          core.print("👽 👽 👽 👽 main.dart; snapShot theme index: 👽  " + dart.str(snapShot.data) + " 👽 ");
          return new app.MaterialApp.new({title: "BFNapp", debugShowCheckedModeBanner: false, theme: snapShot.data == null ? theme_bloc.ThemeUtil.getTheme({themeIndex: this.themeIndex}) : theme_bloc.ThemeUtil.getTheme({themeIndex: snapShot.data}), home: new main.ControllerPage.new({$creationLocationd_0dea112b090073317d4: C274 || CT.C274}), $creationLocationd_0dea112b090073317d4: C275 || CT.C275});
        }, BuildContextAndAsyncSnapshotOfintToMaterialApp()), $creationLocationd_0dea112b090073317d4: C281 || CT.C281});
    }
  };
  (main._BFNMobileAppState.new = function() {
    this.themeIndex = null;
    main._BFNMobileAppState.__proto__.new.call(this);
    ;
  }).prototype = main._BFNMobileAppState.prototype;
  dart.addTypeTests(main._BFNMobileAppState);
  dart.setMethodSignature(main._BFNMobileAppState, () => ({
    __proto__: dart.getMethods(main._BFNMobileAppState.__proto__),
    [_getTheme]: dart.fnType(dart.void, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setLibraryUri(main._BFNMobileAppState, "package:bfnmobile/main.dart");
  dart.setFieldSignature(main._BFNMobileAppState, () => ({
    __proto__: dart.getFields(main._BFNMobileAppState.__proto__),
    themeIndex: dart.fieldType(core.int)
  }));
  main.ControllerPage = class ControllerPage extends framework.StatefulWidget {
    createState() {
      return new main._ControllerPageState.new();
    }
  };
  (main.ControllerPage.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    main.ControllerPage.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = main.ControllerPage.prototype;
  dart.addTypeTests(main.ControllerPage);
  dart.setMethodSignature(main.ControllerPage, () => ({
    __proto__: dart.getMethods(main.ControllerPage.__proto__),
    createState: dart.fnType(main._ControllerPageState, [])
  }));
  dart.setLibraryUri(main.ControllerPage, "package:bfnmobile/main.dart");
  const _startData = dart.privateName(main, "_startData");
  const _startDevSignUp = dart.privateName(main, "_startDevSignUp");
  const _startDashboard = dart.privateName(main, "_startDashboard");
  const _startSignUp = dart.privateName(main, "_startSignUp");
  let C286;
  let C287;
  let C288;
  let C291;
  let C290;
  let C289;
  main._ControllerPageState = class _ControllerPageState extends framework.State$(main.ControllerPage) {
    initState() {
      super.initState();
      this[_startData]();
    }
    [_startData]() {
      return async.async(dart.void, (function* _startData() {
        core.print("_startData:  📌️  📌️ will check authentication ...");
        let isAuthed = (yield bloc.bfnBloc.isUserAuthenticated());
        let debug = dotenv.DotEnv.new().env[$_get]("debug");
        core.print("🌸 🌸 🌸 🌸 🌸 debug from .env : 🌸  " + dart.str(debug));
        if (debug === "true") {
          if (!dart.test(isAuthed)) {
            this[_startDevSignUp]();
            return;
          } else {
            this[_startDashboard]();
          }
        } else {
          if (!dart.test(isAuthed)) {
            this[_startSignUp]();
            return;
          } else {
            this[_startDashboard]();
          }
        }
      }).bind(this));
    }
    [_startDevSignUp]() {
      return async.async(dart.dynamic, (function* _startDevSignUp() {
        core.print("🌸 🌸 🌸 🌸 🌸 _startDevSignUp: debug from .env : 🌸 ");
        let res = (yield navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new dev_signin.DevSignIn.new({$creationLocationd_0dea112b090073317d4: C286 || CT.C286})})));
        if (res != null) {
          this[_startDashboard]();
        }
      }).bind(this));
    }
    [_startSignUp]() {
      return async.async(dart.dynamic, (function* _startSignUp() {
        let res = (yield navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new sign_up.SignUp.new({$creationLocationd_0dea112b090073317d4: C287 || CT.C287})})));
        if (res != null) {
          this[_startDashboard]();
        }
      }).bind(this));
    }
    [_startDashboard]() {
      navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new dashboard.Dashboard.new({$creationLocationd_0dea112b090073317d4: C288 || CT.C288})}));
    }
    build(context) {
      return new container.Container.new({color: colors.Colors.brown._get(200), $creationLocationd_0dea112b090073317d4: C289 || CT.C289});
    }
  };
  (main._ControllerPageState.new = function() {
    main._ControllerPageState.__proto__.new.call(this);
    ;
  }).prototype = main._ControllerPageState.prototype;
  dart.addTypeTests(main._ControllerPageState);
  dart.setMethodSignature(main._ControllerPageState, () => ({
    __proto__: dart.getMethods(main._ControllerPageState.__proto__),
    [_startData]: dart.fnType(dart.void, []),
    [_startDevSignUp]: dart.fnType(dart.dynamic, []),
    [_startSignUp]: dart.fnType(dart.dynamic, []),
    [_startDashboard]: dart.fnType(dart.dynamic, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setLibraryUri(main._ControllerPageState, "package:bfnmobile/main.dart");
  let C292;
  main.main = function main$() {
    return async.async(dart.void, function* main$() {
      yield dotenv.DotEnv.new().load(".env");
      core.print("🌸 🌸 🌸 🌸 🌸 DotEnv has been created. Check content of variables");
      let email = dotenv.DotEnv.new().env[$_get]("email");
      let pass = dotenv.DotEnv.new().env[$_get]("password");
      core.print("🌸 🌸 🌸 🌸 🌸 email from .env : 🌸  " + dart.str(email) + " 🌸  pass: " + dart.str(pass));
      binding.runApp(new main.BFNMobileApp.new({$creationLocationd_0dea112b090073317d4: C292 || CT.C292}));
    });
  };
  dart.trackLibraries("packages/bfnmobile/main", {
    "package:bfnmobile/ui/dev_signin.dart": dev_signin,
    "package:bfnmobile/ui/settings.dart": settings,
    "package:bfnmobile/main.dart": main
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["ui/dev_signin.dart","ui/settings.dart","main.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;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","file":"main.ddc.js"}');
  // Exports:
  return {
    ui__dev_signin: dev_signin,
    ui__settings: settings,
    main: main
  };
});

//# sourceMappingURL=main.ddc.js.map
