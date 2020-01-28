define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/flutter/material', 'packages/bfnlibrary/util/prefs', 'packages/bfnlibrary/util/functions', 'packages/bfnmobile/ui/buy_offer', 'packages/bfnmobile/bloc', 'packages/flutter/src/foundation/_bitfield_web', 'packages/flutter/src/painting/_network_image_web', 'packages/flutter/src/gestures/arena', 'packages/bfnlibrary/util/slide_right', 'packages/bfnmobile/ui/network_accounts', 'packages/bfnlibrary/data/account', 'packages/bfnlibrary/util/snack', 'packages/bfnlibrary/data/invoice', 'packages/bfnlibrary/util/net'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__flutter__material, packages__bfnlibrary__util__prefs, packages__bfnlibrary__util__functions, packages__bfnmobile__ui__buy_offer, packages__bfnmobile__bloc, packages__flutter__src__foundation___bitfield_web, packages__flutter__src__painting___network_image_web, packages__flutter__src__gestures__arena, packages__bfnlibrary__util__slide_right, packages__bfnmobile__ui__network_accounts, packages__bfnlibrary__data__account, packages__bfnlibrary__util__snack, packages__bfnlibrary__data__invoice, packages__bfnlibrary__util__net) {
  'use strict';
  const core = dart_sdk.core;
  const async = dart_sdk.async;
  const ui = dart_sdk.ui;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const form = packages__flutter__src__widgets__actions.src__widgets__form;
  const text = packages__flutter__src__widgets__actions.src__widgets__text;
  const widget_inspector = packages__flutter__src__widgets__actions.src__widgets__widget_inspector;
  const preferred_size = packages__flutter__src__widgets__actions.src__widgets__preferred_size;
  const basic = packages__flutter__src__widgets__actions.src__widgets__basic;
  const container = packages__flutter__src__widgets__actions.src__widgets__container;
  const async$ = packages__flutter__src__widgets__actions.src__widgets__async;
  const scroll_view = packages__flutter__src__widgets__actions.src__widgets__scroll_view;
  const icon = packages__flutter__src__widgets__actions.src__widgets__icon;
  const navigator = packages__flutter__src__widgets__actions.src__widgets__navigator;
  const scaffold = packages__flutter__material.src__material__scaffold;
  const app_bar = packages__flutter__material.src__material__app_bar;
  const colors = packages__flutter__material.src__material__colors;
  const card = packages__flutter__material.src__material__card;
  const raised_button = packages__flutter__material.src__material__raised_button;
  const text_form_field = packages__flutter__material.src__material__text_form_field;
  const input_decorator = packages__flutter__material.src__material__input_decorator;
  const icons = packages__flutter__material.src__material__icons;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const functions = packages__bfnlibrary__util__functions.util__functions;
  const buy_offer = packages__bfnmobile__ui__buy_offer.ui__buy_offer;
  const bloc = packages__bfnmobile__bloc.bloc;
  const print = packages__flutter__src__foundation___bitfield_web.src__foundation__print;
  const edge_insets = packages__flutter__src__painting___network_image_web.src__painting__edge_insets;
  const text_input = packages__flutter__src__gestures__arena.src__services__text_input;
  const slide_right = packages__bfnlibrary__util__slide_right.util__slide_right;
  const network_accounts = packages__bfnmobile__ui__network_accounts.ui__network_accounts;
  const account = packages__bfnlibrary__data__account.data__account;
  const snack = packages__bfnlibrary__util__snack.util__snack;
  const invoice$ = packages__bfnlibrary__data__invoice.data__invoice;
  const net = packages__bfnlibrary__util__net.util__net;
  const create_invoice = Object.create(dart.library);
  const $isEmpty = dartx.isEmpty;
  const $toString = dartx.toString;
  let GlobalKeyOfScaffoldState = () => (GlobalKeyOfScaffoldState = dart.constFn(framework.GlobalKey$(scaffold.ScaffoldState)))();
  let GlobalKeyOfFormState = () => (GlobalKeyOfFormState = dart.constFn(framework.GlobalKey$(form.FormState)))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let StreamBuilderOfString = () => (StreamBuilderOfString = dart.constFn(async$.StreamBuilder$(core.String)))();
  let StreamOfString = () => (StreamOfString = dart.constFn(async.Stream$(core.String)))();
  let AsyncSnapshotOfString = () => (AsyncSnapshotOfString = dart.constFn(async$.AsyncSnapshot$(core.String)))();
  let BuildContextAndAsyncSnapshotOfStringToText = () => (BuildContextAndAsyncSnapshotOfStringToText = dart.constFn(dart.fnType(text.Text, [framework.BuildContext, AsyncSnapshotOfString()])))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let StringToString = () => (StringToString = dart.constFn(dart.fnType(core.String, [core.String])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 66,
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
        [_Location_line]: 66,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C4() {
      return C4 = dart.constList([], widget_inspector._Location);
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C4 || CT.C4,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 72,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C7() {
      return C7 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "account",
        [_Location_column]: 23,
        [_Location_line]: 74,
        [_Location_file]: null
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nodeStyle",
        [_Location_column]: 23,
        [_Location_line]: 75,
        [_Location_file]: null
      });
    },
    get C9() {
      return C9 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nameStyle",
        [_Location_column]: 23,
        [_Location_line]: 76,
        [_Location_file]: null
      });
    },
    get C10() {
      return C10 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 23,
        [_Location_line]: 77,
        [_Location_file]: null
      });
    },
    get C6() {
      return C6 = dart.constList([C7 || CT.C7, C8 || CT.C8, C9 || CT.C9, C10 || CT.C10], widget_inspector._Location);
    },
    get C5() {
      return C5 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C6 || CT.C6,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 73,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C13() {
      return C13 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 80,
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
        [_Location_column]: 15,
        [_Location_line]: 79,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C16() {
      return C16 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 33,
        [_Location_line]: 92,
        [_Location_file]: null
      });
    },
    get C17() {
      return C17 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 23,
        [_Location_line]: 93,
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
        [_Location_column]: 28,
        [_Location_line]: 91,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 19,
        [_Location_line]: 83,
        [_Location_file]: null
      });
    },
    get C21() {
      return C21 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "initialData",
        [_Location_column]: 19,
        [_Location_line]: 84,
        [_Location_file]: null
      });
    },
    get C22() {
      return C22 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 19,
        [_Location_line]: 85,
        [_Location_file]: null
      });
    },
    get C19() {
      return C19 = dart.constList([C20 || CT.C20, C21 || CT.C21, C22 || CT.C22], widget_inspector._Location);
    },
    get C18() {
      return C18 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C19 || CT.C19,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 82,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C25() {
      return C25 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 97,
        [_Location_file]: null
      });
    },
    get C24() {
      return C24 = dart.constList([C25 || CT.C25], widget_inspector._Location);
    },
    get C23() {
      return C23 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C24 || CT.C24,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 96,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C28() {
      return C28 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 13,
        [_Location_line]: 70,
        [_Location_file]: null
      });
    },
    get C27() {
      return C27 = dart.constList([C28 || CT.C28], widget_inspector._Location);
    },
    get C26() {
      return C26 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C27 || CT.C27,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 69,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C31() {
      return C31 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 11,
        [_Location_line]: 68,
        [_Location_file]: null
      });
    },
    get C32() {
      return C32 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 11,
        [_Location_line]: 69,
        [_Location_file]: null
      });
    },
    get C30() {
      return C30 = dart.constList([C31 || CT.C31, C32 || CT.C32], widget_inspector._Location);
    },
    get C29() {
      return C29 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C30 || CT.C30,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 67,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C35() {
      return C35 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 9,
        [_Location_line]: 66,
        [_Location_file]: null
      });
    },
    get C36() {
      return C36 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 9,
        [_Location_line]: 67,
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
        [_Location_column]: 15,
        [_Location_line]: 65,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C39() {
      return C39 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 13,
        [_Location_line]: 107,
        [_Location_file]: null
      });
    },
    get C38() {
      return C38 = dart.constList([C39 || CT.C39], widget_inspector._Location);
    },
    get C37() {
      return C37 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C38 || CT.C38,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 106,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C42() {
      return C42 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 113,
        [_Location_file]: null
      });
    },
    get C41() {
      return C41 = dart.constList([C42 || CT.C42], widget_inspector._Location);
    },
    get C40() {
      return C40 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C41 || CT.C41,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 112,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C43() {
      return C43 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 8,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 8
      });
    },
    get C46() {
      return C46 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 23,
        [_Location_line]: 120,
        [_Location_file]: null
      });
    },
    get C47() {
      return C47 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 23,
        [_Location_line]: 121,
        [_Location_file]: null
      });
    },
    get C45() {
      return C45 = dart.constList([C46 || CT.C46, C47 || CT.C47], widget_inspector._Location);
    },
    get C44() {
      return C44 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C45 || CT.C45,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 119,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C50() {
      return C50 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 21,
        [_Location_line]: 118,
        [_Location_file]: null
      });
    },
    get C51() {
      return C51 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 119,
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
        [_Location_column]: 26,
        [_Location_line]: 117,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C54() {
      return C54 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 19,
        [_Location_line]: 116,
        [_Location_file]: null
      });
    },
    get C55() {
      return C55 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 117,
        [_Location_file]: null
      });
    },
    get C56() {
      return C56 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 19,
        [_Location_line]: 124,
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
        [_Location_column]: 17,
        [_Location_line]: 115,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C59() {
      return C59 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 127,
        [_Location_file]: null
      });
    },
    get C58() {
      return C58 = dart.constList([C59 || CT.C59], widget_inspector._Location);
    },
    get C57() {
      return C57 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C58 || CT.C58,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 126,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C62() {
      return C62 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 42,
        [_Location_line]: 130,
        [_Location_file]: null
      });
    },
    get C63() {
      return C63 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 19,
        [_Location_line]: 131,
        [_Location_file]: null
      });
    },
    get C61() {
      return C61 = dart.constList([C62 || CT.C62, C63 || CT.C63], widget_inspector._Location);
    },
    get C60() {
      return C60 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C61 || CT.C61,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 129,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C64() {
      return C64 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C4 || CT.C4,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 134,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C65() {
      return C65 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 48,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 20
      });
    },
    get C68() {
      return C68 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 33,
        [_Location_line]: 144,
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
        [_Location_column]: 31,
        [_Location_line]: 143,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C71() {
      return C71 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 54,
        [_Location_line]: 149,
        [_Location_file]: null
      });
    },
    get C70() {
      return C70 = dart.constList([C71 || CT.C71], widget_inspector._Location);
    },
    get C69() {
      return C69 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C70 || CT.C70,
        [_Location_name]: null,
        [_Location_column]: 43,
        [_Location_line]: 149,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C74() {
      return C74 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 33,
        [_Location_line]: 147,
        [_Location_file]: null
      });
    },
    get C75() {
      return C75 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 33,
        [_Location_line]: 148,
        [_Location_file]: null
      });
    },
    get C76() {
      return C76 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 33,
        [_Location_line]: 152,
        [_Location_file]: null
      });
    },
    get C77() {
      return C77 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 33,
        [_Location_line]: 153,
        [_Location_file]: null
      });
    },
    get C73() {
      return C73 = dart.constList([C74 || CT.C74, C75 || CT.C75, C76 || CT.C76, C77 || CT.C77], widget_inspector._Location);
    },
    get C72() {
      return C72 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C73 || CT.C73,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 146,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C80() {
      return C80 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 54,
        [_Location_line]: 167,
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
        [_Location_column]: 43,
        [_Location_line]: 167,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C83() {
      return C83 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 33,
        [_Location_line]: 165,
        [_Location_file]: null
      });
    },
    get C84() {
      return C84 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 33,
        [_Location_line]: 166,
        [_Location_file]: null
      });
    },
    get C85() {
      return C85 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 33,
        [_Location_line]: 170,
        [_Location_file]: null
      });
    },
    get C86() {
      return C86 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onChanged",
        [_Location_column]: 33,
        [_Location_line]: 172,
        [_Location_file]: null
      });
    },
    get C87() {
      return C87 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 33,
        [_Location_line]: 173,
        [_Location_file]: null
      });
    },
    get C82() {
      return C82 = dart.constList([C83 || CT.C83, C84 || CT.C84, C85 || CT.C85, C86 || CT.C86, C87 || CT.C87], widget_inspector._Location);
    },
    get C81() {
      return C81 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C82 || CT.C82,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 164,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C90() {
      return C90 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 33,
        [_Location_line]: 182,
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
        [_Location_column]: 31,
        [_Location_line]: 181,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C93() {
      return C93 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 54,
        [_Location_line]: 188,
        [_Location_file]: null
      });
    },
    get C92() {
      return C92 = dart.constList([C93 || CT.C93], widget_inspector._Location);
    },
    get C91() {
      return C91 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C92 || CT.C92,
        [_Location_name]: null,
        [_Location_column]: 43,
        [_Location_line]: 188,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C96() {
      return C96 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 33,
        [_Location_line]: 185,
        [_Location_file]: null
      });
    },
    get C97() {
      return C97 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onChanged",
        [_Location_column]: 33,
        [_Location_line]: 186,
        [_Location_file]: null
      });
    },
    get C98() {
      return C98 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 33,
        [_Location_line]: 187,
        [_Location_file]: null
      });
    },
    get C99() {
      return C99 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 33,
        [_Location_line]: 191,
        [_Location_file]: null
      });
    },
    get C100() {
      return C100 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 33,
        [_Location_line]: 193,
        [_Location_file]: null
      });
    },
    get C95() {
      return C95 = dart.constList([C96 || CT.C96, C97 || CT.C97, C98 || CT.C98, C99 || CT.C99, C100 || CT.C100], widget_inspector._Location);
    },
    get C94() {
      return C94 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C95 || CT.C95,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 184,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C103() {
      return C103 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 33,
        [_Location_line]: 202,
        [_Location_file]: null
      });
    },
    get C102() {
      return C102 = dart.constList([C103 || CT.C103], widget_inspector._Location);
    },
    get C101() {
      return C101 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C102 || CT.C102,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 201,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C106() {
      return C106 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 54,
        [_Location_line]: 207,
        [_Location_file]: null
      });
    },
    get C105() {
      return C105 = dart.constList([C106 || CT.C106], widget_inspector._Location);
    },
    get C104() {
      return C104 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C105 || CT.C105,
        [_Location_name]: null,
        [_Location_column]: 43,
        [_Location_line]: 207,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C109() {
      return C109 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 33,
        [_Location_line]: 205,
        [_Location_file]: null
      });
    },
    get C110() {
      return C110 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 33,
        [_Location_line]: 206,
        [_Location_file]: null
      });
    },
    get C111() {
      return C111 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 33,
        [_Location_line]: 210,
        [_Location_file]: null
      });
    },
    get C112() {
      return C112 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "validator",
        [_Location_column]: 33,
        [_Location_line]: 211,
        [_Location_file]: null
      });
    },
    get C108() {
      return C108 = dart.constList([C109 || CT.C109, C110 || CT.C110, C111 || CT.C111, C112 || CT.C112], widget_inspector._Location);
    },
    get C107() {
      return C107 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C108 || CT.C108,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 204,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C115() {
      return C115 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 33,
        [_Location_line]: 220,
        [_Location_file]: null
      });
    },
    get C114() {
      return C114 = dart.constList([C115 || CT.C115], widget_inspector._Location);
    },
    get C113() {
      return C113 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C114 || CT.C114,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 219,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C118() {
      return C118 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 37,
        [_Location_line]: 225,
        [_Location_file]: null
      });
    },
    get C119() {
      return C119 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 37,
        [_Location_line]: 226,
        [_Location_file]: null
      });
    },
    get C117() {
      return C117 = dart.constList([C118 || CT.C118, C119 || CT.C119], widget_inspector._Location);
    },
    get C116() {
      return C116 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C117 || CT.C117,
        [_Location_name]: null,
        [_Location_column]: 35,
        [_Location_line]: 224,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C122() {
      return C122 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 37,
        [_Location_line]: 229,
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
        [_Location_column]: 35,
        [_Location_line]: 228,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C125() {
      return C125 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 57,
        [_Location_line]: 232,
        [_Location_file]: null
      });
    },
    get C126() {
      return C126 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 37,
        [_Location_line]: 233,
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
        [_Location_column]: 35,
        [_Location_line]: 231,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C129() {
      return C129 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 33,
        [_Location_line]: 223,
        [_Location_file]: null
      });
    },
    get C128() {
      return C128 = dart.constList([C129 || CT.C129], widget_inspector._Location);
    },
    get C127() {
      return C127 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C128 || CT.C128,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 222,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C132() {
      return C132 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 33,
        [_Location_line]: 238,
        [_Location_file]: null
      });
    },
    get C131() {
      return C131 = dart.constList([C132 || CT.C132], widget_inspector._Location);
    },
    get C130() {
      return C130 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C131 || CT.C131,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 237,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C133() {
      return C133 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 16,
        [EdgeInsets_right]: 16,
        [EdgeInsets_top]: 16,
        [EdgeInsets_left]: 16
      });
    },
    get C136() {
      return C136 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 37,
        [_Location_line]: 247,
        [_Location_file]: null
      });
    },
    get C137() {
      return C137 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 37,
        [_Location_line]: 248,
        [_Location_file]: null
      });
    },
    get C135() {
      return C135 = dart.constList([C136 || CT.C136, C137 || CT.C137], widget_inspector._Location);
    },
    get C134() {
      return C134 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C135 || CT.C135,
        [_Location_name]: null,
        [_Location_column]: 42,
        [_Location_line]: 246,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C140() {
      return C140 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 35,
        [_Location_line]: 245,
        [_Location_file]: null
      });
    },
    get C141() {
      return C141 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 35,
        [_Location_line]: 246,
        [_Location_file]: null
      });
    },
    get C139() {
      return C139 = dart.constList([C140 || CT.C140, C141 || CT.C141], widget_inspector._Location);
    },
    get C138() {
      return C138 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C139 || CT.C139,
        [_Location_name]: null,
        [_Location_column]: 40,
        [_Location_line]: 244,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C144() {
      return C144 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 33,
        [_Location_line]: 242,
        [_Location_file]: null
      });
    },
    get C145() {
      return C145 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 33,
        [_Location_line]: 243,
        [_Location_file]: null
      });
    },
    get C146() {
      return C146 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 33,
        [_Location_line]: 244,
        [_Location_file]: null
      });
    },
    get C143() {
      return C143 = dart.constList([C144 || CT.C144, C145 || CT.C145, C146 || CT.C146], widget_inspector._Location);
    },
    get C142() {
      return C142 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C143 || CT.C143,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 240,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C149() {
      return C149 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 33,
        [_Location_line]: 253,
        [_Location_file]: null
      });
    },
    get C148() {
      return C148 = dart.constList([C149 || CT.C149], widget_inspector._Location);
    },
    get C147() {
      return C147 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C148 || CT.C148,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 252,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C152() {
      return C152 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 29,
        [_Location_line]: 142,
        [_Location_file]: null
      });
    },
    get C151() {
      return C151 = dart.constList([C152 || CT.C152], widget_inspector._Location);
    },
    get C150() {
      return C150 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C151 || CT.C151,
        [_Location_name]: null,
        [_Location_column]: 34,
        [_Location_line]: 141,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C155() {
      return C155 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 27,
        [_Location_line]: 140,
        [_Location_file]: null
      });
    },
    get C156() {
      return C156 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 27,
        [_Location_line]: 141,
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
        [_Location_column]: 32,
        [_Location_line]: 139,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C159() {
      return C159 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 25,
        [_Location_line]: 136,
        [_Location_file]: null
      });
    },
    get C160() {
      return C160 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "autovalidate",
        [_Location_column]: 25,
        [_Location_line]: 137,
        [_Location_file]: null
      });
    },
    get C161() {
      return C161 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onChanged",
        [_Location_column]: 25,
        [_Location_line]: 138,
        [_Location_file]: null
      });
    },
    get C162() {
      return C162 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 25,
        [_Location_line]: 139,
        [_Location_file]: null
      });
    },
    get C158() {
      return C158 = dart.constList([C159 || CT.C159, C160 || CT.C160, C161 || CT.C161, C162 || CT.C162], widget_inspector._Location);
    },
    get C157() {
      return C157 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C158 || CT.C158,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 135,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C165() {
      return C165 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 15,
        [_Location_line]: 111,
        [_Location_file]: null
      });
    },
    get C164() {
      return C164 = dart.constList([C165 || CT.C165], widget_inspector._Location);
    },
    get C163() {
      return C163 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C164 || CT.C164,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 110,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C168() {
      return C168 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 110,
        [_Location_file]: null
      });
    },
    get C167() {
      return C167 = dart.constList([C168 || CT.C168], widget_inspector._Location);
    },
    get C166() {
      return C166 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C167 || CT.C167,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 109,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C171() {
      return C171 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 9,
        [_Location_line]: 105,
        [_Location_file]: null
      });
    },
    get C170() {
      return C170 = dart.constList([C171 || CT.C171], widget_inspector._Location);
    },
    get C169() {
      return C169 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C170 || CT.C170,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 104,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C174() {
      return C174 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 7,
        [_Location_line]: 64,
        [_Location_file]: null
      });
    },
    get C175() {
      return C175 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 7,
        [_Location_line]: 65,
        [_Location_file]: null
      });
    },
    get C176() {
      return C176 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 7,
        [_Location_line]: 103,
        [_Location_file]: null
      });
    },
    get C177() {
      return C177 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 7,
        [_Location_line]: 104,
        [_Location_file]: null
      });
    },
    get C173() {
      return C173 = dart.constList([C174 || CT.C174, C175 || CT.C175, C176 || CT.C176, C177 || CT.C177], widget_inspector._Location);
    },
    get C172() {
      return C172 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C173 || CT.C173,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 63,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    },
    get C178() {
      return C178 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C4 || CT.C4,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 274,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_invoice.dart"
      });
    }
  });
  create_invoice.CreateInvoice = class CreateInvoice extends framework.StatefulWidget {
    createState() {
      return new create_invoice._CreateInvoiceState.new();
    }
  };
  (create_invoice.CreateInvoice.new = function(opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    create_invoice.CreateInvoice.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = create_invoice.CreateInvoice.prototype;
  dart.addTypeTests(create_invoice.CreateInvoice);
  dart.setMethodSignature(create_invoice.CreateInvoice, () => ({
    __proto__: dart.getMethods(create_invoice.CreateInvoice.__proto__),
    createState: dart.fnType(create_invoice._CreateInvoiceState, [])
  }));
  dart.setLibraryUri(create_invoice.CreateInvoice, "package:bfnmobile/ui/create_invoice.dart");
  const _key = dart.privateName(create_invoice, "_key");
  const _formKey = dart.privateName(create_invoice, "_formKey");
  const _amountKey = dart.privateName(create_invoice, "_amountKey");
  const _vatKey = dart.privateName(create_invoice, "_vatKey");
  const _invoiceKey = dart.privateName(create_invoice, "_invoiceKey");
  const _descKey = dart.privateName(create_invoice, "_descKey");
  const _init = dart.privateName(create_invoice, "_init");
  const _setTotalAmount = dart.privateName(create_invoice, "_setTotalAmount");
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C1;
  let C0;
  let C4;
  let C3;
  let C7;
  let C8;
  let C9;
  let C10;
  let C6;
  let C5;
  let C13;
  let C12;
  let C11;
  let C16;
  let C17;
  let C15;
  let C14;
  let C20;
  let C21;
  let C22;
  let C19;
  let C18;
  let C25;
  let C24;
  let C23;
  let C28;
  let C27;
  let C26;
  let C31;
  let C32;
  let C30;
  let C29;
  let C35;
  let C36;
  let C34;
  let C33;
  let C39;
  let C38;
  let C37;
  let C42;
  let C41;
  let C40;
  const EdgeInsets_bottom = dart.privateName(edge_insets, "EdgeInsets.bottom");
  const EdgeInsets_right = dart.privateName(edge_insets, "EdgeInsets.right");
  const EdgeInsets_top = dart.privateName(edge_insets, "EdgeInsets.top");
  const EdgeInsets_left = dart.privateName(edge_insets, "EdgeInsets.left");
  let C43;
  let C46;
  let C47;
  let C45;
  let C44;
  let C50;
  let C51;
  let C49;
  let C48;
  const _onAccountRequested = dart.privateName(create_invoice, "_onAccountRequested");
  let C54;
  let C55;
  let C56;
  let C53;
  let C52;
  let C59;
  let C58;
  let C57;
  let C62;
  let C63;
  let C61;
  let C60;
  let C64;
  const _onFormChanged = dart.privateName(create_invoice, "_onFormChanged");
  let C65;
  let C68;
  let C67;
  let C66;
  let C71;
  let C70;
  let C69;
  let C74;
  let C75;
  let C76;
  let C77;
  let C73;
  let C72;
  let C80;
  let C79;
  let C78;
  const _onAmountChanged = dart.privateName(create_invoice, "_onAmountChanged");
  let C83;
  let C84;
  let C85;
  let C86;
  let C87;
  let C82;
  let C81;
  let C90;
  let C89;
  let C88;
  const _onVATChanged = dart.privateName(create_invoice, "_onVATChanged");
  let C93;
  let C92;
  let C91;
  let C96;
  let C97;
  let C98;
  let C99;
  let C100;
  let C95;
  let C94;
  let C103;
  let C102;
  let C101;
  let C106;
  let C105;
  let C104;
  let C109;
  let C110;
  let C111;
  let C112;
  let C108;
  let C107;
  let C115;
  let C114;
  let C113;
  let C118;
  let C119;
  let C117;
  let C116;
  let C122;
  let C121;
  let C120;
  let C125;
  let C126;
  let C124;
  let C123;
  let C129;
  let C128;
  let C127;
  let C132;
  let C131;
  let C130;
  const _onInvoiceSubmitRequested = dart.privateName(create_invoice, "_onInvoiceSubmitRequested");
  let C133;
  let C136;
  let C137;
  let C135;
  let C134;
  let C140;
  let C141;
  let C139;
  let C138;
  let C144;
  let C145;
  let C146;
  let C143;
  let C142;
  let C149;
  let C148;
  let C147;
  let C152;
  let C151;
  let C150;
  let C155;
  let C156;
  let C154;
  let C153;
  let C159;
  let C160;
  let C161;
  let C162;
  let C158;
  let C157;
  let C165;
  let C164;
  let C163;
  let C168;
  let C167;
  let C166;
  let C171;
  let C170;
  let C169;
  let C174;
  let C175;
  let C176;
  let C177;
  let C173;
  let C172;
  let C178;
  create_invoice._CreateInvoiceState = class _CreateInvoiceState extends framework.State$(create_invoice.CreateInvoice) {
    initState() {
      super.initState();
      this[_init]();
    }
    [_init]() {
      return async.async(dart.dynamic, (function* _init() {
        this.account = (yield prefs.Prefs.getAccount());
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    [_setTotalAmount]() {
      if (this.amount == null || this.amount[$isEmpty]) {
        return;
      }
      if (this.vat == null || this.vat[$isEmpty]) {
        return;
      }
      let amt = core.double.parse(this.amount);
      let tax = core.double.parse(this.vat);
      let tot = dart.notNull(amt) + dart.notNull(amt) * (dart.notNull(tax) / 100);
      this.setState(dart.fn(() => {
        this.totalAmount = this.getCurrency(tot, this.context);
      }, VoidToNull()));
    }
    getCurrency(amt, context) {
      return functions.getFormattedAmount(dart.toString(amt), context);
    }
    build(context) {
      return new scaffold.Scaffold.new({key: this[_key], appBar: new app_bar.AppBar.new({title: new text.Text.new("Create Invoice", {$creationLocationd_0dea112b090073317d4: C0 || CT.C0}), bottom: new preferred_size.PreferredSize.new({preferredSize: new ui.Size.fromHeight(120.0), child: new basic.Column.new({children: JSArrayOfWidget().of([this.account == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C3 || CT.C3}) : new buy_offer.NameBadge.new({account: this.account, nodeStyle: functions.Styles.whiteSmall, nameStyle: functions.Styles.blackBoldMedium, elevation: 2.0, $creationLocationd_0dea112b090073317d4: C5 || CT.C5}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C11 || CT.C11}), new (StreamBuilderOfString()).new({stream: StreamOfString()._check(bloc.bfnBloc.fcmStream), initialData: "No network message yet", builder: dart.fn((context, snapshot) => {
                    if (dart.test(snapshot.hasData)) {
                      print.debugPrint("😡  😡  😡  😡  CreateInvoice: FCM message arrived on Stream: " + dart.str(snapshot.data) + "  😡  😡  😡  😡 ");
                      this.message = snapshot.data;
                    }
                    return new text.Text.new(dart.str(this.message), {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C14 || CT.C14});
                  }, BuildContextAndAsyncSnapshotOfStringToText()), $creationLocationd_0dea112b090073317d4: C18 || CT.C18}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C23 || CT.C23})]), $creationLocationd_0dea112b090073317d4: C26 || CT.C26}), $creationLocationd_0dea112b090073317d4: C29 || CT.C29}), $creationLocationd_0dea112b090073317d4: C33 || CT.C33}), backgroundColor: colors.Colors.brown._get(50), body: new scroll_view.ListView.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C37 || CT.C37}), new card.Card.new({child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C40 || CT.C40}), new raised_button.RaisedButton.new({elevation: 2.0, child: new basic.Padding.new({padding: C43 || CT.C43, child: new text.Text.new("Select Supplier", {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C44 || CT.C44}), $creationLocationd_0dea112b090073317d4: C48 || CT.C48}), onPressed: dart.bind(this, _onAccountRequested), $creationLocationd_0dea112b090073317d4: C52 || CT.C52}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C57 || CT.C57}), new text.Text.new(this.tradingAccount == null ? "" : this.tradingAccount.name, {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C60 || CT.C60}), this.tradingAccount == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C64 || CT.C64}) : new form.Form.new({key: this[_formKey], autovalidate: true, onChanged: dart.bind(this, _onFormChanged), child: new basic.Padding.new({padding: C65 || CT.C65, child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C66 || CT.C66}), new text_form_field.TextFormField.new({key: this[_invoiceKey], decoration: new input_decorator.InputDecoration.new({icon: new icon.Icon.new(icons.Icons.account_balance, {$creationLocationd_0dea112b090073317d4: C69 || CT.C69}), hintText: "Enter Invoice Number", labelText: "Invoice Number #"}), keyboardType: text_input.TextInputType.text, validator: dart.fn(value => {
                              if (value[$isEmpty]) {
                                return "Please enter invoice number";
                              }
                              if (value.length < 3) {
                                return "Please enter at least 3 letters or numbers";
                              }
                              this.invoiceNumber = value;
                              return null;
                            }, StringToString()), $creationLocationd_0dea112b090073317d4: C72 || CT.C72}), new text_form_field.TextFormField.new({key: this[_amountKey], decoration: new input_decorator.InputDecoration.new({icon: new icon.Icon.new(icons.Icons.attach_money, {$creationLocationd_0dea112b090073317d4: C78 || CT.C78}), hintText: "Enter Amount", labelText: "Amount"}), keyboardType: new text_input.TextInputType.numberWithOptions({decimal: true}), onChanged: dart.bind(this, _onAmountChanged), validator: dart.fn(value => {
                              if (value[$isEmpty]) {
                                return "Please enter amount";
                              }
                              this.amount = value;
                              return null;
                            }, StringToString()), $creationLocationd_0dea112b090073317d4: C81 || CT.C81}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C88 || CT.C88}), new text_form_field.TextFormField.new({key: this[_vatKey], onChanged: dart.bind(this, _onVATChanged), decoration: new input_decorator.InputDecoration.new({icon: new icon.Icon.new(icons.Icons.note, {$creationLocationd_0dea112b090073317d4: C91 || CT.C91}), hintText: "Enter VAT", labelText: "Value Added Tax"}), keyboardType: new text_input.TextInputType.numberWithOptions({decimal: true}), validator: dart.fn(value => {
                              if (value[$isEmpty]) {
                                return "Please enter VAT %";
                              }
                              this.vat = value;
                              return null;
                            }, StringToString()), $creationLocationd_0dea112b090073317d4: C94 || CT.C94}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C101 || CT.C101}), new text_form_field.TextFormField.new({key: this[_descKey], decoration: new input_decorator.InputDecoration.new({icon: new icon.Icon.new(icons.Icons.event, {$creationLocationd_0dea112b090073317d4: C104 || CT.C104}), hintText: "Enter Description", labelText: "Description"}), keyboardType: text_input.TextInputType.text, validator: dart.fn(value => {
                              if (value[$isEmpty]) {
                                return "Please enter description";
                              }
                              this.description = value;
                              return null;
                            }, StringToString()), $creationLocationd_0dea112b090073317d4: C107 || CT.C107}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C113 || CT.C113}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Total:", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C116 || CT.C116}), new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C120 || CT.C120}), new text.Text.new(this.totalAmount == null ? "0.00" : this.totalAmount, {style: functions.Styles.blackBoldLarge, $creationLocationd_0dea112b090073317d4: C123 || CT.C123})]), $creationLocationd_0dea112b090073317d4: C127 || CT.C127}), new basic.SizedBox.new({height: 24.0, $creationLocationd_0dea112b090073317d4: C130 || CT.C130}), new raised_button.RaisedButton.new({elevation: 8.0, onPressed: dart.bind(this, _onInvoiceSubmitRequested), child: new basic.Padding.new({padding: C133 || CT.C133, child: new text.Text.new("Submit Invoice", {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C134 || CT.C134}), $creationLocationd_0dea112b090073317d4: C138 || CT.C138}), $creationLocationd_0dea112b090073317d4: C142 || CT.C142}), new basic.SizedBox.new({height: 24.0, $creationLocationd_0dea112b090073317d4: C147 || CT.C147})]), $creationLocationd_0dea112b090073317d4: C150 || CT.C150}), $creationLocationd_0dea112b090073317d4: C153 || CT.C153}), $creationLocationd_0dea112b090073317d4: C157 || CT.C157})]), $creationLocationd_0dea112b090073317d4: C163 || CT.C163}), $creationLocationd_0dea112b090073317d4: C166 || CT.C166})]), $creationLocationd_0dea112b090073317d4: C169 || CT.C169}), $creationLocationd_0dea112b090073317d4: C172 || CT.C172});
    }
    [_onFormChanged]() {
    }
    [_onAccountRequested]() {
      return async.async(dart.void, (function* _onAccountRequested() {
        core.print("_onAccountRequested");
        let result = (yield navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new network_accounts.NetworkAccountsPage.new({$creationLocationd_0dea112b090073317d4: C178 || CT.C178})})));
        if (account.AccountInfo.is(result)) {
          this.setState(dart.fn(() => {
            this.tradingAccount = result;
          }, VoidToNull()));
        }
      }).bind(this));
    }
    [_onInvoiceSubmitRequested]() {
      return async.async(dart.void, (function* _onInvoiceSubmitRequested() {
        core.print("_onInvoiceSubmitRequested 🍊 🍊 ");
        if (this.tradingAccount == null) {
          snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: "Please select supplier", actionLabel: ""});
          return;
        }
        if (dart.test(this[_formKey].currentState.validate())) {
          let invoice = new invoice$.Invoice.new({amount: core.double.parse(this.amount), valueAddedTax: core.double.parse(this.vat), invoiceNumber: this.invoiceNumber, supplier: this.tradingAccount, customer: this.account, description: this.description});
          let tot = dart.notNull(invoice.amount) + dart.notNull(invoice.amount) * (dart.notNull(invoice.valueAddedTax) / 100);
          invoice.totalAmount = tot;
          snack.AppSnackbar.showSnackbarWithProgressIndicator({scaffoldKey: this[_key], message: "Submitting invoice ...", textColor: colors.Colors.white, backgroundColor: colors.Colors.brown});
          try {
            this.resultInvoice = (yield net.Net.startRegisterInvoiceFlow(invoice));
            core.print(" 🌺  🌺  🌺  INVOICE returned: " + dart.str(this.resultInvoice.toJson()) + "  🌺  🌺  🌺 ");
            snack.AppSnackbar.showSnackbarWithAction({scaffoldKey: this[_key], message: "Invoice submitted OK", textColor: colors.Colors.white, actionLabel: "Done", listener: this, action: 1, backgroundColor: colors.Colors.teal._get(700)});
          } catch (e$) {
            let e = dart.getThrown(e$);
            snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: core.String._check(dart.dload(e, 'message')), actionLabel: "Err"});
          }
        }
      }).bind(this));
    }
    [_onAmountChanged](value) {
      this.amount = value;
      this[_setTotalAmount]();
    }
    [_onVATChanged](value) {
      this.vat = value;
      this[_setTotalAmount]();
    }
    onActionPressed(action) {
      switch (action) {
        case 1:
        {
          navigator.Navigator.pop(invoice$.Invoice, this.context, this.resultInvoice);
          break;
        }
      }
    }
  };
  (create_invoice._CreateInvoiceState.new = function() {
    this[_key] = GlobalKeyOfScaffoldState().new();
    this[_formKey] = GlobalKeyOfFormState().new();
    this[_amountKey] = GlobalKeyOfFormState().new();
    this[_vatKey] = GlobalKeyOfFormState().new();
    this[_invoiceKey] = GlobalKeyOfFormState().new();
    this[_descKey] = GlobalKeyOfFormState().new();
    this.account = null;
    this.tradingAccount = null;
    this.amount = null;
    this.vat = null;
    this.totalAmount = null;
    this.invoiceNumber = null;
    this.description = null;
    this.message = null;
    this.resultInvoice = null;
    create_invoice._CreateInvoiceState.__proto__.new.call(this);
    ;
  }).prototype = create_invoice._CreateInvoiceState.prototype;
  dart.addTypeTests(create_invoice._CreateInvoiceState);
  create_invoice._CreateInvoiceState[dart.implements] = () => [snack.SnackBarListener];
  dart.setMethodSignature(create_invoice._CreateInvoiceState, () => ({
    __proto__: dart.getMethods(create_invoice._CreateInvoiceState.__proto__),
    [_init]: dart.fnType(dart.dynamic, []),
    [_setTotalAmount]: dart.fnType(dart.dynamic, []),
    getCurrency: dart.fnType(core.String, [core.double, framework.BuildContext]),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    [_onFormChanged]: dart.fnType(dart.void, []),
    [_onAccountRequested]: dart.fnType(dart.void, []),
    [_onInvoiceSubmitRequested]: dart.fnType(dart.void, []),
    [_onAmountChanged]: dart.fnType(dart.void, [core.String]),
    [_onVATChanged]: dart.fnType(dart.void, [core.String]),
    onActionPressed: dart.fnType(dart.dynamic, [core.int])
  }));
  dart.setLibraryUri(create_invoice._CreateInvoiceState, "package:bfnmobile/ui/create_invoice.dart");
  dart.setFieldSignature(create_invoice._CreateInvoiceState, () => ({
    __proto__: dart.getFields(create_invoice._CreateInvoiceState.__proto__),
    [_key]: dart.fieldType(framework.GlobalKey$(scaffold.ScaffoldState)),
    [_formKey]: dart.fieldType(framework.GlobalKey$(form.FormState)),
    [_amountKey]: dart.fieldType(framework.GlobalKey$(form.FormState)),
    [_vatKey]: dart.fieldType(framework.GlobalKey$(form.FormState)),
    [_invoiceKey]: dart.fieldType(framework.GlobalKey$(form.FormState)),
    [_descKey]: dart.fieldType(framework.GlobalKey$(form.FormState)),
    account: dart.fieldType(account.AccountInfo),
    tradingAccount: dart.fieldType(account.AccountInfo),
    amount: dart.fieldType(core.String),
    vat: dart.fieldType(core.String),
    totalAmount: dart.fieldType(core.String),
    invoiceNumber: dart.fieldType(core.String),
    description: dart.fieldType(core.String),
    message: dart.fieldType(core.String),
    resultInvoice: dart.fieldType(invoice$.Invoice)
  }));
  dart.trackLibraries("packages/bfnmobile/ui/create_invoice", {
    "package:bfnmobile/ui/create_invoice.dart": create_invoice
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["create_invoice.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;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","file":"create_invoice.ddc.js"}');
  // Exports:
  return {
    ui__create_invoice: create_invoice
  };
});

//# sourceMappingURL=create_invoice.ddc.js.map
