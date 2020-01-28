define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/flutter/material', 'packages/firebase_messaging/firebase_messaging', 'packages/bfnlibrary/data/account', 'packages/bfnlibrary/data/invoice', 'packages/bfnlibrary/data/invoice_offer', 'packages/bfnlibrary/data/node_info', 'packages/dynamic_theme/dynamic_theme', 'packages/bfnlibrary/util/theme_bloc', 'packages/bfnmobile/bloc', 'packages/bfnlibrary/util/net', 'packages/bfnlibrary/util/prefs', 'packages/bfnlibrary/util/snack', 'packages/bfnlibrary/data/dashboard_data', 'packages/flutter/src/painting/_network_image_web', 'packages/bfnmobile/ui/buy_offer', 'packages/bfnlibrary/util/functions', 'packages/flutter/src/foundation/_bitfield_web', 'packages/flutter/src/rendering/animated_size', 'packages/bfnlibrary/util/slide_right', 'packages/bfnmobile/ui/network_accounts', 'packages/bfnmobile/ui/create_offer', 'packages/firebase_auth/firebase_auth', 'packages/bfnlibrary/util/theme_util'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__flutter__material, packages__firebase_messaging__firebase_messaging, packages__bfnlibrary__data__account, packages__bfnlibrary__data__invoice, packages__bfnlibrary__data__invoice_offer, packages__bfnlibrary__data__node_info, packages__dynamic_theme__dynamic_theme, packages__bfnlibrary__util__theme_bloc, packages__bfnmobile__bloc, packages__bfnlibrary__util__net, packages__bfnlibrary__util__prefs, packages__bfnlibrary__util__snack, packages__bfnlibrary__data__dashboard_data, packages__flutter__src__painting___network_image_web, packages__bfnmobile__ui__buy_offer, packages__bfnlibrary__util__functions, packages__flutter__src__foundation___bitfield_web, packages__flutter__src__rendering__animated_size, packages__bfnlibrary__util__slide_right, packages__bfnmobile__ui__network_accounts, packages__bfnmobile__ui__create_offer, packages__firebase_auth__firebase_auth, packages__bfnlibrary__util__theme_util) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const ui = dart_sdk.ui;
  const async = dart_sdk.async;
  const io = dart_sdk.io;
  const convert = dart_sdk.convert;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const icon = packages__flutter__src__widgets__actions.src__widgets__icon;
  const widget_inspector = packages__flutter__src__widgets__actions.src__widgets__widget_inspector;
  const will_pop_scope = packages__flutter__src__widgets__actions.src__widgets__will_pop_scope;
  const text = packages__flutter__src__widgets__actions.src__widgets__text;
  const preferred_size = packages__flutter__src__widgets__actions.src__widgets__preferred_size;
  const basic = packages__flutter__src__widgets__actions.src__widgets__basic;
  const container = packages__flutter__src__widgets__actions.src__widgets__container;
  const async$ = packages__flutter__src__widgets__actions.src__widgets__async;
  const scroll_view = packages__flutter__src__widgets__actions.src__widgets__scroll_view;
  const bottom_navigation_bar_item = packages__flutter__src__widgets__actions.src__widgets__bottom_navigation_bar_item;
  const navigator = packages__flutter__src__widgets__actions.src__widgets__navigator;
  const scaffold = packages__flutter__material.src__material__scaffold;
  const theme = packages__flutter__material.src__material__theme;
  const icons = packages__flutter__material.src__material__icons;
  const colors = packages__flutter__material.src__material__colors;
  const app_bar = packages__flutter__material.src__material__app_bar;
  const icon_button = packages__flutter__material.src__material__icon_button;
  const card = packages__flutter__material.src__material__card;
  const bottom_navigation_bar = packages__flutter__material.src__material__bottom_navigation_bar;
  const firebase_messaging = packages__firebase_messaging__firebase_messaging.firebase_messaging;
  const account = packages__bfnlibrary__data__account.data__account;
  const invoice = packages__bfnlibrary__data__invoice.data__invoice;
  const invoice_offer = packages__bfnlibrary__data__invoice_offer.data__invoice_offer;
  const node_info = packages__bfnlibrary__data__node_info.data__node_info;
  const dynamic_theme = packages__dynamic_theme__dynamic_theme.dynamic_theme;
  const theme_bloc = packages__bfnlibrary__util__theme_bloc.util__theme_bloc;
  const bloc = packages__bfnmobile__bloc.bloc;
  const net = packages__bfnlibrary__util__net.util__net;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const snack = packages__bfnlibrary__util__snack.util__snack;
  const dashboard_data = packages__bfnlibrary__data__dashboard_data.data__dashboard_data;
  const edge_insets = packages__flutter__src__painting___network_image_web.src__painting__edge_insets;
  const text_style = packages__flutter__src__painting___network_image_web.src__painting__text_style;
  const buy_offer = packages__bfnmobile__ui__buy_offer.ui__buy_offer;
  const functions = packages__bfnlibrary__util__functions.util__functions;
  const print = packages__flutter__src__foundation___bitfield_web.src__foundation__print;
  const sliver_grid = packages__flutter__src__rendering__animated_size.src__rendering__sliver_grid;
  const slide_right = packages__bfnlibrary__util__slide_right.util__slide_right;
  const network_accounts = packages__bfnmobile__ui__network_accounts.ui__network_accounts;
  const list_tabs = packages__bfnmobile__ui__create_offer.ui__list_tabs;
  const firebase_auth = packages__firebase_auth__firebase_auth.firebase_auth;
  const theme_util = packages__bfnlibrary__util__theme_util.util__theme_util;
  const dashboard = Object.create(dart.library);
  const $add = dartx.add;
  const $length = dartx.length;
  const $_get = dartx._get;
  const $toString = dartx.toString;
  const $clear = dartx.clear;
  const $contains = dartx.contains;
  const $elementAt = dartx.elementAt;
  const $forEach = dartx.forEach;
  let GlobalKeyOfScaffoldState = () => (GlobalKeyOfScaffoldState = dart.constFn(framework.GlobalKey$(scaffold.ScaffoldState)))();
  let JSArrayOfAccountInfo = () => (JSArrayOfAccountInfo = dart.constFn(_interceptors.JSArray$(account.AccountInfo)))();
  let JSArrayOfInvoice = () => (JSArrayOfInvoice = dart.constFn(_interceptors.JSArray$(invoice.Invoice)))();
  let JSArrayOfInvoiceOffer = () => (JSArrayOfInvoiceOffer = dart.constFn(_interceptors.JSArray$(invoice_offer.InvoiceOffer)))();
  let JSArrayOfNodeInfo = () => (JSArrayOfNodeInfo = dart.constFn(_interceptors.JSArray$(node_info.NodeInfo)))();
  let JSArrayOfContent = () => (JSArrayOfContent = dart.constFn(_interceptors.JSArray$(dashboard.Content)))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let StringToNull = () => (StringToNull = dart.constFn(dart.fnType(core.Null, [core.String])))();
  let FutureOfNull = () => (FutureOfNull = dart.constFn(async.Future$(core.Null)))();
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
  let MapOfString$dynamicToFutureOfNull = () => (MapOfString$dynamicToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [MapOfString$dynamic()])))();
  let IosNotificationSettingsToNull = () => (IosNotificationSettingsToNull = dart.constFn(dart.fnType(core.Null, [firebase_messaging.IosNotificationSettings])))();
  let FutureOfbool = () => (FutureOfbool = dart.constFn(async.Future$(core.bool)))();
  let VoidToFutureOfbool = () => (VoidToFutureOfbool = dart.constFn(dart.fnType(FutureOfbool(), [])))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let StreamBuilderOfString = () => (StreamBuilderOfString = dart.constFn(async$.StreamBuilder$(core.String)))();
  let StreamOfString = () => (StreamOfString = dart.constFn(async.Stream$(core.String)))();
  let AsyncSnapshotOfString = () => (AsyncSnapshotOfString = dart.constFn(async$.AsyncSnapshot$(core.String)))();
  let BuildContextAndAsyncSnapshotOfStringToText = () => (BuildContextAndAsyncSnapshotOfStringToText = dart.constFn(dart.fnType(text.Text, [framework.BuildContext, AsyncSnapshotOfString()])))();
  let BuildContextAndintToPadding = () => (BuildContextAndintToPadding = dart.constFn(dart.fnType(basic.Padding, [framework.BuildContext, core.int])))();
  let JSArrayOfBottomNavigationBarItem = () => (JSArrayOfBottomNavigationBarItem = dart.constFn(_interceptors.JSArray$(bottom_navigation_bar_item.BottomNavigationBarItem)))();
  let NodeInfoToFutureOfNull = () => (NodeInfoToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [node_info.NodeInfo])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 26,
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
        [_Location_column]: 15,
        [_Location_line]: 68,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 26,
        [_Location_line]: 74,
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
        [_Location_column]: 15,
        [_Location_line]: 74,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 26,
        [_Location_line]: 80,
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
        [_Location_column]: 15,
        [_Location_line]: 80,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C11() {
      return C11 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 26,
        [_Location_line]: 184,
        [_Location_file]: null
      });
    },
    get C10() {
      return C10 = dart.constList([C11 || CT.C11], widget_inspector._Location);
    },
    get C9() {
      return C9 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C10 || CT.C10,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 184,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C14() {
      return C14 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 26,
        [_Location_line]: 190,
        [_Location_file]: null
      });
    },
    get C13() {
      return C13 = dart.constList([C14 || CT.C14], widget_inspector._Location);
    },
    get C12() {
      return C12 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C13 || CT.C13,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 190,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C17() {
      return C17 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 30,
        [_Location_line]: 207,
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
        [_Location_column]: 19,
        [_Location_line]: 207,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 13,
        [_Location_line]: 207,
        [_Location_file]: null
      });
    },
    get C21() {
      return C21 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 13,
        [_Location_line]: 208,
        [_Location_file]: null
      });
    },
    get C19() {
      return C19 = dart.constList([C20 || CT.C20, C21 || CT.C21], widget_inspector._Location);
    },
    get C18() {
      return C18 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C19 || CT.C19,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 206,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C24() {
      return C24 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 23,
        [_Location_line]: 210,
        [_Location_file]: null
      });
    },
    get C23() {
      return C23 = dart.constList([C24 || CT.C24], widget_inspector._Location);
    },
    get C22() {
      return C22 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C23 || CT.C23,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 210,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C27() {
      return C27 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 32,
        [_Location_line]: 214,
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
        [_Location_column]: 21,
        [_Location_line]: 214,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C30() {
      return C30 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 15,
        [_Location_line]: 214,
        [_Location_file]: null
      });
    },
    get C31() {
      return C31 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 15,
        [_Location_line]: 215,
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
        [_Location_column]: 13,
        [_Location_line]: 213,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C34() {
      return C34 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 32,
        [_Location_line]: 218,
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
        [_Location_column]: 21,
        [_Location_line]: 218,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C37() {
      return C37 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 15,
        [_Location_line]: 218,
        [_Location_file]: null
      });
    },
    get C38() {
      return C38 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 15,
        [_Location_line]: 219,
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
        [_Location_column]: 13,
        [_Location_line]: 217,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C39() {
      return C39 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 8
      });
    },
    get C41() {
      return C41 = dart.constList([], widget_inspector._Location);
    },
    get C40() {
      return C40 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C41 || CT.C41,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 230,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C44() {
      return C44 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "account",
        [_Location_column]: 29,
        [_Location_line]: 232,
        [_Location_file]: null
      });
    },
    get C45() {
      return C45 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nameStyle",
        [_Location_column]: 29,
        [_Location_line]: 233,
        [_Location_file]: null
      });
    },
    get C46() {
      return C46 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nodeStyle",
        [_Location_column]: 29,
        [_Location_line]: 234,
        [_Location_file]: null
      });
    },
    get C47() {
      return C47 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 29,
        [_Location_line]: 235,
        [_Location_file]: null
      });
    },
    get C43() {
      return C43 = dart.constList([C44 || CT.C44, C45 || CT.C45, C46 || CT.C46, C47 || CT.C47], widget_inspector._Location);
    },
    get C42() {
      return C42 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C43 || CT.C43,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 231,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C50() {
      return C50 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 23,
        [_Location_line]: 238,
        [_Location_file]: null
      });
    },
    get C49() {
      return C49 = dart.constList([C50 || CT.C50], widget_inspector._Location);
    },
    get C48() {
      return C48 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C49 || CT.C49,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 237,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C51() {
      return C51 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 0,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 8
      });
    },
    get C54() {
      return C54 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 29,
        [_Location_line]: 245,
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
        [_Location_column]: 27,
        [_Location_line]: 244,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C57() {
      return C57 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 45,
        [_Location_line]: 257,
        [_Location_file]: null
      });
    },
    get C58() {
      return C58 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 35,
        [_Location_line]: 258,
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
        [_Location_column]: 40,
        [_Location_line]: 256,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C61() {
      return C61 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 31,
        [_Location_line]: 248,
        [_Location_file]: null
      });
    },
    get C62() {
      return C62 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "initialData",
        [_Location_column]: 31,
        [_Location_line]: 249,
        [_Location_file]: null
      });
    },
    get C63() {
      return C63 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 31,
        [_Location_line]: 250,
        [_Location_file]: null
      });
    },
    get C60() {
      return C60 = dart.constList([C61 || CT.C61, C62 || CT.C62, C63 || CT.C63], widget_inspector._Location);
    },
    get C59() {
      return C59 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C60 || CT.C60,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 247,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C66() {
      return C66 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 243,
        [_Location_file]: null
      });
    },
    get C65() {
      return C65 = dart.constList([C66 || CT.C66], widget_inspector._Location);
    },
    get C64() {
      return C64 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C65 || CT.C65,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 242,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C69() {
      return C69 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 23,
        [_Location_line]: 241,
        [_Location_file]: null
      });
    },
    get C70() {
      return C70 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 242,
        [_Location_file]: null
      });
    },
    get C68() {
      return C68 = dart.constList([C69 || CT.C69, C70 || CT.C70], widget_inspector._Location);
    },
    get C67() {
      return C67 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C68 || CT.C68,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 240,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C73() {
      return C73 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 23,
        [_Location_line]: 265,
        [_Location_file]: null
      });
    },
    get C72() {
      return C72 = dart.constList([C73 || CT.C73], widget_inspector._Location);
    },
    get C71() {
      return C71 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C72 || CT.C72,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 264,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C76() {
      return C76 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 19,
        [_Location_line]: 228,
        [_Location_file]: null
      });
    },
    get C75() {
      return C75 = dart.constList([C76 || CT.C76], widget_inspector._Location);
    },
    get C74() {
      return C74 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C75 || CT.C75,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 227,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C79() {
      return C79 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 17,
        [_Location_line]: 226,
        [_Location_file]: null
      });
    },
    get C80() {
      return C80 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 227,
        [_Location_file]: null
      });
    },
    get C78() {
      return C78 = dart.constList([C79 || CT.C79, C80 || CT.C80], widget_inspector._Location);
    },
    get C77() {
      return C77 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C78 || CT.C78,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 225,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C83() {
      return C83 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 225,
        [_Location_file]: null
      });
    },
    get C84() {
      return C84 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 15,
        [_Location_line]: 270,
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
        [_Location_column]: 19,
        [_Location_line]: 224,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C87() {
      return C87 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "leading",
        [_Location_column]: 11,
        [_Location_line]: 206,
        [_Location_file]: null
      });
    },
    get C88() {
      return C88 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 11,
        [_Location_line]: 210,
        [_Location_file]: null
      });
    },
    get C89() {
      return C89 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 11,
        [_Location_line]: 211,
        [_Location_file]: null
      });
    },
    get C90() {
      return C90 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "actions",
        [_Location_column]: 11,
        [_Location_line]: 212,
        [_Location_file]: null
      });
    },
    get C91() {
      return C91 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 11,
        [_Location_line]: 224,
        [_Location_file]: null
      });
    },
    get C86() {
      return C86 = dart.constList([C87 || CT.C87, C88 || CT.C88, C89 || CT.C89, C90 || CT.C90, C91 || CT.C91], widget_inspector._Location);
    },
    get C85() {
      return C85 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C86 || CT.C86,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 205,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C92() {
      return C92 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 4,
        [EdgeInsets_right]: 4,
        [EdgeInsets_top]: 4,
        [EdgeInsets_left]: 4
      });
    },
    get C95() {
      return C95 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 27,
        [_Location_line]: 293,
        [_Location_file]: null
      });
    },
    get C94() {
      return C94 = dart.constList([C95 || CT.C95], widget_inspector._Location);
    },
    get C93() {
      return C93 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C94 || CT.C94,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 292,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C98() {
      return C98 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 27,
        [_Location_line]: 297,
        [_Location_file]: null
      });
    },
    get C97() {
      return C97 = dart.constList([C98 || CT.C98], widget_inspector._Location);
    },
    get C96() {
      return C96 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C97 || CT.C97,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 296,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C101() {
      return C101 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 46,
        [_Location_line]: 300,
        [_Location_file]: null
      });
    },
    get C102() {
      return C102 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 301,
        [_Location_file]: null
      });
    },
    get C100() {
      return C100 = dart.constList([C101 || CT.C101, C102 || CT.C102], widget_inspector._Location);
    },
    get C99() {
      return C99 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C100 || CT.C100,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 299,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C105() {
      return C105 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 27,
        [_Location_line]: 307,
        [_Location_file]: null
      });
    },
    get C104() {
      return C104 = dart.constList([C105 || CT.C105], widget_inspector._Location);
    },
    get C103() {
      return C103 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C104 || CT.C104,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 306,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C108() {
      return C108 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 38,
        [_Location_line]: 309,
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
        [_Location_line]: 309,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C111() {
      return C111 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 23,
        [_Location_line]: 291,
        [_Location_file]: null
      });
    },
    get C110() {
      return C110 = dart.constList([C111 || CT.C111], widget_inspector._Location);
    },
    get C109() {
      return C109 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C110 || CT.C110,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 290,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C114() {
      return C114 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 290,
        [_Location_file]: null
      });
    },
    get C113() {
      return C113 = dart.constList([C114 || CT.C114], widget_inspector._Location);
    },
    get C112() {
      return C112 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C113 || CT.C113,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 289,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C117() {
      return C117 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 19,
        [_Location_line]: 285,
        [_Location_file]: null
      });
    },
    get C118() {
      return C118 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 19,
        [_Location_line]: 288,
        [_Location_file]: null
      });
    },
    get C119() {
      return C119 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 289,
        [_Location_file]: null
      });
    },
    get C116() {
      return C116 = dart.constList([C117 || CT.C117, C118 || CT.C118, C119 || CT.C119], widget_inspector._Location);
    },
    get C115() {
      return C115 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C116 || CT.C116,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 284,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C122() {
      return C122 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 282,
        [_Location_file]: null
      });
    },
    get C123() {
      return C123 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 17,
        [_Location_line]: 283,
        [_Location_file]: null
      });
    },
    get C124() {
      return C124 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 284,
        [_Location_file]: null
      });
    },
    get C121() {
      return C121 = dart.constList([C122 || CT.C122, C123 || CT.C123, C124 || CT.C124], widget_inspector._Location);
    },
    get C120() {
      return C120 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C121 || CT.C121,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 281,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C127() {
      return C127 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 15,
        [_Location_line]: 280,
        [_Location_file]: null
      });
    },
    get C128() {
      return C128 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 281,
        [_Location_file]: null
      });
    },
    get C126() {
      return C126 = dart.constList([C127 || CT.C127, C128 || CT.C128], widget_inspector._Location);
    },
    get C125() {
      return C125 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C126 || CT.C126,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 279,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C131() {
      return C131 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "gridDelegate",
        [_Location_column]: 11,
        [_Location_line]: 274,
        [_Location_file]: null
      });
    },
    get C132() {
      return C132 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemCount",
        [_Location_column]: 11,
        [_Location_line]: 276,
        [_Location_file]: null
      });
    },
    get C133() {
      return C133 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemBuilder",
        [_Location_column]: 11,
        [_Location_line]: 277,
        [_Location_file]: null
      });
    },
    get C130() {
      return C130 = dart.constList([C131 || CT.C131, C132 || CT.C132, C133 || CT.C133], widget_inspector._Location);
    },
    get C129() {
      return C129 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C130 || CT.C130,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 273,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C136() {
      return C136 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 34,
        [_Location_line]: 321,
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
        [_Location_line]: 321,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C139() {
      return C139 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 67,
        [_Location_line]: 321,
        [_Location_file]: null
      });
    },
    get C138() {
      return C138 = dart.constList([C139 || CT.C139], widget_inspector._Location);
    },
    get C137() {
      return C137 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C138 || CT.C138,
        [_Location_name]: null,
        [_Location_column]: 62,
        [_Location_line]: 321,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C142() {
      return C142 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 34,
        [_Location_line]: 323,
        [_Location_file]: null
      });
    },
    get C141() {
      return C141 = dart.constList([C142 || CT.C142], widget_inspector._Location);
    },
    get C140() {
      return C140 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C141 || CT.C141,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 323,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C145() {
      return C145 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 53,
        [_Location_line]: 323,
        [_Location_file]: null
      });
    },
    get C144() {
      return C144 = dart.constList([C145 || CT.C145], widget_inspector._Location);
    },
    get C143() {
      return C143 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C144 || CT.C144,
        [_Location_name]: null,
        [_Location_column]: 48,
        [_Location_line]: 323,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C148() {
      return C148 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 34,
        [_Location_line]: 325,
        [_Location_file]: null
      });
    },
    get C147() {
      return C147 = dart.constList([C148 || CT.C148], widget_inspector._Location);
    },
    get C146() {
      return C146 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C147 || CT.C147,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 325,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C151() {
      return C151 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 64,
        [_Location_line]: 325,
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
        [_Location_column]: 59,
        [_Location_line]: 325,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C154() {
      return C154 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "items",
        [_Location_column]: 11,
        [_Location_line]: 319,
        [_Location_file]: null
      });
    },
    get C155() {
      return C155 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 11,
        [_Location_line]: 327,
        [_Location_file]: null
      });
    },
    get C156() {
      return C156 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onTap",
        [_Location_column]: 11,
        [_Location_line]: 328,
        [_Location_file]: null
      });
    },
    get C153() {
      return C153 = dart.constList([C154 || CT.C154, C155 || CT.C155, C156 || CT.C156], widget_inspector._Location);
    },
    get C152() {
      return C152 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C153 || CT.C153,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 318,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C159() {
      return C159 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 9,
        [_Location_line]: 204,
        [_Location_file]: null
      });
    },
    get C160() {
      return C160 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 9,
        [_Location_line]: 205,
        [_Location_file]: null
      });
    },
    get C161() {
      return C161 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 9,
        [_Location_line]: 272,
        [_Location_file]: null
      });
    },
    get C162() {
      return C162 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 9,
        [_Location_line]: 273,
        [_Location_file]: null
      });
    },
    get C163() {
      return C163 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottomNavigationBar",
        [_Location_column]: 9,
        [_Location_line]: 318,
        [_Location_file]: null
      });
    },
    get C158() {
      return C158 = dart.constList([C159 || CT.C159, C160 || CT.C160, C161 || CT.C161, C162 || CT.C162, C163 || CT.C163], widget_inspector._Location);
    },
    get C157() {
      return C157 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C158 || CT.C158,
        [_Location_name]: null,
        [_Location_column]: 14,
        [_Location_line]: 203,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C166() {
      return C166 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onWillPop",
        [_Location_column]: 7,
        [_Location_line]: 202,
        [_Location_file]: null
      });
    },
    get C167() {
      return C167 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 7,
        [_Location_line]: 203,
        [_Location_file]: null
      });
    },
    get C165() {
      return C165 = dart.constList([C166 || CT.C166, C167 || CT.C167], widget_inspector._Location);
    },
    get C164() {
      return C164 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C165 || CT.C165,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 201,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C168() {
      return C168 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C41 || CT.C41,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 340,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C169() {
      return C169 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C41 || CT.C41,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 347,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    },
    get C170() {
      return C170 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C41 || CT.C41,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 363,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/dashboard.dart"
      });
    }
  });
  dashboard.Dashboard = class Dashboard extends framework.StatefulWidget {
    createState() {
      return new dashboard._DashboardState.new();
    }
  };
  (dashboard.Dashboard.new = function(opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    dashboard.Dashboard.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = dashboard.Dashboard.prototype;
  dart.addTypeTests(dashboard.Dashboard);
  dart.setMethodSignature(dashboard.Dashboard, () => ({
    __proto__: dart.getMethods(dashboard.Dashboard.__proto__),
    createState: dart.fnType(dashboard._DashboardState, [])
  }));
  dart.setLibraryUri(dashboard.Dashboard, "package:bfnmobile/ui/dashboard.dart");
  const _key = dart.privateName(dashboard, "_key");
  const _firebaseMessaging = dart.privateName(dashboard, "_firebaseMessaging");
  const _firebaseCloudMessaging = dart.privateName(dashboard, "_firebaseCloudMessaging");
  const _getNodes = dart.privateName(dashboard, "_getNodes");
  const _refresh = dart.privateName(dashboard, "_refresh");
  const _changeTheme = dart.privateName(dashboard, "_changeTheme");
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C1;
  let C0;
  let C5;
  let C4;
  let C3;
  let C8;
  let C7;
  let C6;
  const _getDashboardData = dart.privateName(dashboard, "_getDashboardData");
  const _showMessage = dart.privateName(dashboard, "_showMessage");
  const _subscribe = dart.privateName(dashboard, "_subscribe");
  let C11;
  let C10;
  let C9;
  let C14;
  let C13;
  let C12;
  let C17;
  let C16;
  let C15;
  let C20;
  let C21;
  let C19;
  let C18;
  let C24;
  let C23;
  let C22;
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
  const _changeAccount = dart.privateName(dashboard, "_changeAccount");
  let C37;
  let C38;
  let C36;
  let C35;
  const EdgeInsets_bottom = dart.privateName(edge_insets, "EdgeInsets.bottom");
  const EdgeInsets_right = dart.privateName(edge_insets, "EdgeInsets.right");
  const EdgeInsets_top = dart.privateName(edge_insets, "EdgeInsets.top");
  const EdgeInsets_left = dart.privateName(edge_insets, "EdgeInsets.left");
  let C39;
  let C41;
  let C40;
  let C44;
  let C45;
  let C46;
  let C47;
  let C43;
  let C42;
  let C50;
  let C49;
  let C48;
  let C51;
  let C54;
  let C53;
  let C52;
  let C57;
  let C58;
  let C56;
  let C55;
  let C61;
  let C62;
  let C63;
  let C60;
  let C59;
  let C66;
  let C65;
  let C64;
  let C69;
  let C70;
  let C68;
  let C67;
  let C73;
  let C72;
  let C71;
  let C76;
  let C75;
  let C74;
  let C79;
  let C80;
  let C78;
  let C77;
  let C83;
  let C84;
  let C82;
  let C81;
  let C87;
  let C88;
  let C89;
  let C90;
  let C91;
  let C86;
  let C85;
  let C92;
  let C95;
  let C94;
  let C93;
  let C98;
  let C97;
  let C96;
  let C101;
  let C102;
  let C100;
  let C99;
  let C105;
  let C104;
  let C103;
  let C108;
  let C107;
  let C106;
  let C111;
  let C110;
  let C109;
  let C114;
  let C113;
  let C112;
  let C117;
  let C118;
  let C119;
  let C116;
  let C115;
  let C122;
  let C123;
  let C124;
  let C121;
  let C120;
  let C127;
  let C128;
  let C126;
  let C125;
  let C131;
  let C132;
  let C133;
  let C130;
  let C129;
  let C136;
  let C135;
  let C134;
  let C139;
  let C138;
  let C137;
  let C142;
  let C141;
  let C140;
  let C145;
  let C144;
  let C143;
  let C148;
  let C147;
  let C146;
  let C151;
  let C150;
  let C149;
  const _onNavTap = dart.privateName(dashboard, "_onNavTap");
  let C154;
  let C155;
  let C156;
  let C153;
  let C152;
  let C159;
  let C160;
  let C161;
  let C162;
  let C163;
  let C158;
  let C157;
  let C166;
  let C167;
  let C165;
  let C164;
  let C168;
  let C169;
  let C170;
  dashboard._DashboardState = class _DashboardState extends framework.State$(dashboard.Dashboard) {
    initState() {
      super.initState();
      this[_firebaseCloudMessaging]();
      this[_getNodes]();
      this[_refresh]();
    }
    changeBrightness() {
      dynamic_theme.DynamicTheme.of(this.context).setBrightness(dart.equals(theme.Theme.of(this.context).brightness, ui.Brightness.dark) ? ui.Brightness.light : ui.Brightness.dark);
    }
    [_changeTheme]() {
      theme_bloc.themeBloc.changeToRandomTheme();
    }
    [_getDashboardData]() {
      return async.async(dart.dynamic, (function* _getDashboardData() {
        this.data = (yield bloc.bfnBloc.getDashboardData());
        this.contents[$add](new dashboard.Content.new({label: "Node Invoices", number: this.data.invoices, icon: new icon.Icon.new(icons.Icons.account_balance, {$creationLocationd_0dea112b090073317d4: C0 || CT.C0}), backgroundColor: colors.Colors.grey._get(300), textColor: colors.Colors.black}));
        this.contents[$add](new dashboard.Content.new({label: "Node Offers", number: this.data.offers, icon: new icon.Icon.new(icons.Icons.apps, {$creationLocationd_0dea112b090073317d4: C3 || CT.C3}), backgroundColor: colors.Colors.grey._get(300), textColor: colors.Colors.black}));
        this.contents[$add](new dashboard.Content.new({label: "Network Accounts", number: this.data.accounts, icon: new icon.Icon.new(icons.Icons.people, {$creationLocationd_0dea112b090073317d4: C6 || CT.C6}), backgroundColor: colors.Colors.grey._get(300), textColor: colors.Colors.teal._get(700)}));
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    [_getNodes]() {
      return async.async(dart.dynamic, (function* _getNodes() {
        this.nodes = (yield net.Net.listNodes());
        this.nodeInfo = (yield prefs.Prefs.getNode());
        core.print("Dashboard: 💠💠💠💠💠 nodes collected: " + dart.str(this.nodes[$length]) + ", my node is 💠 " + dart.str(this.nodeInfo.toJson()));
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    [_firebaseCloudMessaging]() {
      core.print("🍊 🍊 _firebaseCloudMessaging started. 🍊 Configuring messaging 🍊 🍊 🍊");
      if (dart.test(io.Platform.isIOS)) this.iOS_Permission();
      this[_firebaseMessaging].getToken().then(core.Null, dart.fn(token => {
        core.print("FCM user token :: " + dart.str(token));
      }, StringToNull()));
      this[_firebaseMessaging].configure({onMessage: dart.fn(message => async.async(core.Null, (function*() {
          core.print("🧩🧩🧩🧩🧩🧩 on message " + dart.str(message));
          let data = message[$_get]("data");
          if (dart.dsend(data, '_get', ["invoiceOffer"]) != null) {
            let offer = convert.json.decode(core.String._check(dart.dsend(data, '_get', ["invoiceOffer"])));
            let m = new invoice_offer.InvoiceOffer.fromJson(core.Map._check(offer));
            this.offerMessages[$add](m);
            this[_showMessage]("New Invoice Offer, amount: " + dart.toString(m.offerAmount));
            bloc.bfnBloc.addFCMInvoiceOffer(m, this.context);
          }
          if (dart.dsend(data, '_get', ["invoice"]) != null) {
            let invJson = convert.json.decode(core.String._check(dart.dsend(data, '_get', ["invoice"])));
            let m = new invoice.Invoice.fromJson(core.Map._check(invJson));
            this.invoiceMessages[$add](m);
            this[_showMessage]("New Invoice, amount: " + dart.toString(m.totalAmount));
            bloc.bfnBloc.addFCMInvoice(m, this.context);
          }
          if (dart.dsend(data, '_get', ["account"]) != null) {
            let offer = convert.json.decode(core.String._check(dart.dsend(data, '_get', ["account"])));
            let m = new account.AccountInfo.fromJson(core.Map._check(offer));
            this.accountMessages[$add](m);
            this[_showMessage]("New Account, name: " + dart.toString(m.name));
            bloc.bfnBloc.addFCMAccount(m, this.context);
          }
          this[_refresh]();
        }).bind(this)), MapOfString$dynamicToFutureOfNull()), onResume: dart.fn(message => async.async(core.Null, function*() {
          core.print("🧩🧩🧩🧩🧩🧩 on resume " + dart.str(message));
        }), MapOfString$dynamicToFutureOfNull()), onLaunch: dart.fn(message => async.async(core.Null, function*() {
          core.print("🧩🧩🧩🧩🧩🧩 on launch " + dart.str(message));
        }), MapOfString$dynamicToFutureOfNull())});
      this[_subscribe]();
    }
    [_showMessage](msg) {
      core.print("showing fcm message ... " + dart.str(msg));
      snack.AppSnackbar.showSnackbar({scaffoldKey: this[_key], message: msg, textColor: colors.Colors.yellow, backgroundColor: colors.Colors.black});
    }
    [_subscribe]() {
      this[_firebaseMessaging].subscribeToTopic("invoiceOffers");
      this[_firebaseMessaging].subscribeToTopic("invoices");
      this[_firebaseMessaging].subscribeToTopic("accounts");
      core.print("🧩🧩🧩🧩🧩🧩 subscribed to FCM topics 🍊 invoiceOffers 🍊 invoices 🍊 accounts");
    }
    iOS_Permission() {
      this[_firebaseMessaging].requestNotificationPermissions(new firebase_messaging.IosNotificationSettings.new({sound: true, badge: true, alert: true}));
      this[_firebaseMessaging].onIosSettingsRegistered.listen(dart.fn(settings => {
        core.print("Settings registered: " + dart.str(settings));
      }, IosNotificationSettingsToNull()));
    }
    [_refresh]() {
      return async.async(dart.dynamic, (function* _refresh() {
        core.print("Dashboard: 📯📯📯📯📯📯📯📯 REFRESH DASHBOARD ..... 😻 😻 😻 ");
        if (this.account == null) {
          this.account = (yield prefs.Prefs.getAccount());
        }
        this.contents[$clear]();
        this.account = (yield prefs.Prefs.getAccount());
        core.print("Dashboard: 🔵 🔵 🔵 🔵 🔵 🔵 account: " + dart.str(this.account.toJson()) + " 🔵 🔵 🔵 🔵 🔵 🔵 ");
        if (this.account.host[$contains]("Regulator")) {
          return;
        }
        core.print("Dashboard:  🚻  🚻  🚻  🚻  🚻  🚻  🚻  Getting remote data ....");
        this.myInvoices = (yield bloc.bfnBloc.getInvoices({accountId: this.account.identifier}));
        this.contents[$add](new dashboard.Content.new({label: "My Invoices", number: this.myInvoices[$length], icon: new icon.Icon.new(icons.Icons.account_balance, {$creationLocationd_0dea112b090073317d4: C9 || CT.C9}), textColor: colors.Colors.blue}));
        this.myOffers = (yield bloc.bfnBloc.getInvoiceOffers({accountId: this.account.identifier}));
        this.contents[$add](new dashboard.Content.new({label: "My Offers", number: this.myOffers[$length], icon: new icon.Icon.new(icons.Icons.apps, {$creationLocationd_0dea112b090073317d4: C12 || CT.C12}), textColor: colors.Colors.pink}));
        this.setState(dart.fn(() => {
        }, VoidToNull()));
        this.data = dashboard_data.DashboardData._check(yield this[_getDashboardData]());
      }).bind(this));
    }
    build(context) {
      return new will_pop_scope.WillPopScope.new({onWillPop: dart.fn(() => this.doNothing(), VoidToFutureOfbool()), child: new scaffold.Scaffold.new({key: this[_key], appBar: new app_bar.AppBar.new({leading: new icon_button.IconButton.new({icon: new icon.Icon.new(icons.Icons.brightness_7, {$creationLocationd_0dea112b090073317d4: C15 || CT.C15}), onPressed: dart.bind(this, _changeTheme), $creationLocationd_0dea112b090073317d4: C18 || CT.C18}), title: new text.Text.new("BFN", {$creationLocationd_0dea112b090073317d4: C22 || CT.C22}), elevation: 8.0, actions: JSArrayOfWidget().of([new icon_button.IconButton.new({icon: new icon.Icon.new(icons.Icons.refresh, {$creationLocationd_0dea112b090073317d4: C25 || CT.C25}), onPressed: dart.bind(this, _refresh), $creationLocationd_0dea112b090073317d4: C28 || CT.C28}), new icon_button.IconButton.new({icon: new icon.Icon.new(icons.Icons.person_add, {$creationLocationd_0dea112b090073317d4: C32 || CT.C32}), onPressed: dart.fn(() => {
                  this[_changeAccount]();
                }, VoidToNull()), $creationLocationd_0dea112b090073317d4: C35 || CT.C35})]), bottom: new preferred_size.PreferredSize.new({child: new basic.Padding.new({padding: C39 || CT.C39, child: new basic.Column.new({children: JSArrayOfWidget().of([this.account == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C40 || CT.C40}) : new buy_offer.NameBadge.new({account: this.account, nameStyle: functions.Styles.whiteBoldMedium, nodeStyle: functions.Styles.whiteSmall, elevation: 2.0, $creationLocationd_0dea112b090073317d4: C42 || CT.C42}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C48 || CT.C48}), new basic.Padding.new({padding: C51 || CT.C51, child: new basic.Row.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C52 || CT.C52}), new (StreamBuilderOfString()).new({stream: StreamOfString()._check(bloc.bfnBloc.fcmStream), initialData: "No network message yet", builder: dart.fn((context, snapshot) => {
                              if (dart.test(snapshot.hasData)) {
                                print.debugPrint(" 😡  😡  😡  😡  FCM message arrived on Stream: " + dart.str(snapshot.data) + "  😡  😡  😡  😡 ");
                                this.message = snapshot.data;
                              }
                              return new text.Text.new(dart.str(this.message), {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C55 || CT.C55});
                            }, BuildContextAndAsyncSnapshotOfStringToText()), $creationLocationd_0dea112b090073317d4: C59 || CT.C59})]), $creationLocationd_0dea112b090073317d4: C64 || CT.C64}), $creationLocationd_0dea112b090073317d4: C67 || CT.C67}), new basic.SizedBox.new({height: 24.0, $creationLocationd_0dea112b090073317d4: C71 || CT.C71})]), $creationLocationd_0dea112b090073317d4: C74 || CT.C74}), $creationLocationd_0dea112b090073317d4: C77 || CT.C77}), preferredSize: new ui.Size.fromHeight(120.0), $creationLocationd_0dea112b090073317d4: C81 || CT.C81}), $creationLocationd_0dea112b090073317d4: C85 || CT.C85}), backgroundColor: colors.Colors.brown._get(100), body: new scroll_view.GridView.builder({gridDelegate: new sliver_grid.SliverGridDelegateWithFixedCrossAxisCount.new({crossAxisCount: 2, mainAxisSpacing: 2.0, crossAxisSpacing: 2.0}), itemCount: this.contents[$length], itemBuilder: dart.fn((context, index) => {
              let content = this.contents[$elementAt](index);
              return new basic.Padding.new({padding: C92 || CT.C92, child: new container.Container.new({height: 80.0, width: 160.0, child: new card.Card.new({color: content.backgroundColor == null ? colors.Colors.white : content.backgroundColor, elevation: 4.0, child: new basic.Center.new({child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 24.0, $creationLocationd_0dea112b090073317d4: C93 || CT.C93}), content.icon, new basic.SizedBox.new({height: 24.0, $creationLocationd_0dea112b090073317d4: C96 || CT.C96}), new text.Text.new(dart.str(content.number), {style: new text_style.TextStyle.new({fontSize: dart.notNull(content.number) > 1000 ? 36.0 : 44.0, fontWeight: ui.FontWeight.w900, color: content.textColor}), $creationLocationd_0dea112b090073317d4: C99 || CT.C99}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C103 || CT.C103}), new text.Text.new(content.label, {$creationLocationd_0dea112b090073317d4: C106 || CT.C106})]), $creationLocationd_0dea112b090073317d4: C109 || CT.C109}), $creationLocationd_0dea112b090073317d4: C112 || CT.C112}), $creationLocationd_0dea112b090073317d4: C115 || CT.C115}), $creationLocationd_0dea112b090073317d4: C120 || CT.C120}), $creationLocationd_0dea112b090073317d4: C125 || CT.C125});
            }, BuildContextAndintToPadding()), $creationLocationd_0dea112b090073317d4: C129 || CT.C129}), bottomNavigationBar: new bottom_navigation_bar.BottomNavigationBar.new({items: JSArrayOfBottomNavigationBarItem().of([new bottom_navigation_bar_item.BottomNavigationBarItem.new({icon: new icon.Icon.new(icons.Icons.supervisor_account, {$creationLocationd_0dea112b090073317d4: C134 || CT.C134}), title: new text.Text.new("Accounts", {$creationLocationd_0dea112b090073317d4: C137 || CT.C137})}), new bottom_navigation_bar_item.BottomNavigationBarItem.new({icon: new icon.Icon.new(icons.Icons.apps, {$creationLocationd_0dea112b090073317d4: C140 || CT.C140}), title: new text.Text.new("Invoices", {$creationLocationd_0dea112b090073317d4: C143 || CT.C143})}), new bottom_navigation_bar_item.BottomNavigationBarItem.new({icon: new icon.Icon.new(icons.Icons.account_balance, {$creationLocationd_0dea112b090073317d4: C146 || CT.C146}), title: new text.Text.new("Offers", {$creationLocationd_0dea112b090073317d4: C149 || CT.C149})})]), elevation: 8.0, onTap: dart.bind(this, _onNavTap), $creationLocationd_0dea112b090073317d4: C152 || CT.C152}), $creationLocationd_0dea112b090073317d4: C157 || CT.C157}), $creationLocationd_0dea112b090073317d4: C164 || CT.C164});
    }
    [_onNavTap](value) {
      switch (value) {
        case 0:
        {
          navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new network_accounts.NetworkAccountsPage.new({$creationLocationd_0dea112b090073317d4: C168 || CT.C168})}));
          break;
        }
        case 1:
        {
          navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new list_tabs.InvoicesPage.new({$creationLocationd_0dea112b090073317d4: C169 || CT.C169})}));
          break;
        }
        case 2:
        {
          break;
        }
      }
    }
    doNothing() {
      return async.async(core.bool, function* doNothing() {
        return false;
      });
    }
    [_changeAccount]() {
      return async.async(dart.void, (function* _changeAccount() {
        let result = (yield navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new network_accounts.NetworkAccountsPage.new({$creationLocationd_0dea112b090073317d4: C170 || CT.C170})})));
        if (result != null) {
          core.print(result);
          this.account = account.AccountInfo.as(result);
          yield prefs.Prefs.saveAccount(this.account);
          let auth = firebase_auth.FirebaseAuth.instance;
          yield auth.signInAnonymously();
          core.print("account name: " + dart.str(this.account.host) + " vs ");
          this.nodes[$forEach](dart.fn(n => async.async(core.Null, (function*() {
            core.print("compare to: " + dart.str(n.addresses[$elementAt](0)));
            if (this.account.host == n.addresses[$elementAt](0)) {
              yield prefs.Prefs.saveNode(n);
              this.setState(dart.fn(() => {
                this.nodeInfo = n;
              }, VoidToNull()));
            }
          }).bind(this)), NodeInfoToFutureOfNull()));
          core.print("🍊 🍊 🍊 🍊 Signed in FRESH (anonymous) to Firebase: " + dart.str(dart.toString(result)));
          this[_refresh]();
        }
      }).bind(this));
    }
  };
  (dashboard._DashboardState.new = function() {
    this[_key] = GlobalKeyOfScaffoldState().new();
    this.themeChanger = null;
    this[_firebaseMessaging] = firebase_messaging.FirebaseMessaging.new();
    this.accountMessages = JSArrayOfAccountInfo().of([]);
    this.invoiceMessages = JSArrayOfInvoice().of([]);
    this.myInvoices = JSArrayOfInvoice().of([]);
    this.offerMessages = JSArrayOfInvoiceOffer().of([]);
    this.myOffers = JSArrayOfInvoiceOffer().of([]);
    this.account = null;
    this.nodes = JSArrayOfNodeInfo().of([]);
    this.nodeInfo = null;
    this.data = null;
    this.contents = JSArrayOfContent().of([]);
    this.message = null;
    dashboard._DashboardState.__proto__.new.call(this);
    ;
  }).prototype = dashboard._DashboardState.prototype;
  dart.addTypeTests(dashboard._DashboardState);
  dart.setMethodSignature(dashboard._DashboardState, () => ({
    __proto__: dart.getMethods(dashboard._DashboardState.__proto__),
    changeBrightness: dart.fnType(dart.void, []),
    [_changeTheme]: dart.fnType(dart.void, []),
    [_getDashboardData]: dart.fnType(dart.dynamic, []),
    [_getNodes]: dart.fnType(dart.dynamic, []),
    [_firebaseCloudMessaging]: dart.fnType(dart.void, []),
    [_showMessage]: dart.fnType(dart.void, [core.String]),
    [_subscribe]: dart.fnType(dart.void, []),
    iOS_Permission: dart.fnType(dart.void, []),
    [_refresh]: dart.fnType(dart.dynamic, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    [_onNavTap]: dart.fnType(dart.void, [core.int]),
    doNothing: dart.fnType(async.Future$(core.bool), []),
    [_changeAccount]: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(dashboard._DashboardState, "package:bfnmobile/ui/dashboard.dart");
  dart.setFieldSignature(dashboard._DashboardState, () => ({
    __proto__: dart.getFields(dashboard._DashboardState.__proto__),
    [_key]: dart.fieldType(framework.GlobalKey$(scaffold.ScaffoldState)),
    themeChanger: dart.fieldType(theme_util.ThemeChanger),
    [_firebaseMessaging]: dart.fieldType(firebase_messaging.FirebaseMessaging),
    accountMessages: dart.fieldType(core.List$(account.AccountInfo)),
    invoiceMessages: dart.fieldType(core.List$(invoice.Invoice)),
    myInvoices: dart.fieldType(core.List$(invoice.Invoice)),
    offerMessages: dart.fieldType(core.List$(invoice_offer.InvoiceOffer)),
    myOffers: dart.fieldType(core.List$(invoice_offer.InvoiceOffer)),
    account: dart.fieldType(account.AccountInfo),
    nodes: dart.fieldType(core.List$(node_info.NodeInfo)),
    nodeInfo: dart.fieldType(node_info.NodeInfo),
    data: dart.fieldType(dashboard_data.DashboardData),
    contents: dart.fieldType(core.List$(dashboard.Content)),
    message: dart.fieldType(core.String)
  }));
  const label$ = dart.privateName(dashboard, "Content.label");
  const number$ = dart.privateName(dashboard, "Content.number");
  const textColor$ = dart.privateName(dashboard, "Content.textColor");
  const backgroundColor$ = dart.privateName(dashboard, "Content.backgroundColor");
  const icon$ = dart.privateName(dashboard, "Content.icon");
  dashboard.Content = class Content extends core.Object {
    get label() {
      return this[label$];
    }
    set label(value) {
      this[label$] = value;
    }
    get number() {
      return this[number$];
    }
    set number(value) {
      this[number$] = value;
    }
    get textColor() {
      return this[textColor$];
    }
    set textColor(value) {
      this[textColor$] = value;
    }
    get backgroundColor() {
      return this[backgroundColor$];
    }
    set backgroundColor(value) {
      this[backgroundColor$] = value;
    }
    get icon() {
      return this[icon$];
    }
    set icon(value) {
      this[icon$] = value;
    }
  };
  (dashboard.Content.new = function(opts) {
    let label = opts && 'label' in opts ? opts.label : null;
    let number = opts && 'number' in opts ? opts.number : null;
    let textColor = opts && 'textColor' in opts ? opts.textColor : null;
    let icon = opts && 'icon' in opts ? opts.icon : null;
    let backgroundColor = opts && 'backgroundColor' in opts ? opts.backgroundColor : null;
    this[label$] = label;
    this[number$] = number;
    this[textColor$] = textColor;
    this[icon$] = icon;
    this[backgroundColor$] = backgroundColor;
    ;
  }).prototype = dashboard.Content.prototype;
  dart.addTypeTests(dashboard.Content);
  dart.setLibraryUri(dashboard.Content, "package:bfnmobile/ui/dashboard.dart");
  dart.setFieldSignature(dashboard.Content, () => ({
    __proto__: dart.getFields(dashboard.Content.__proto__),
    label: dart.fieldType(core.String),
    number: dart.fieldType(core.int),
    textColor: dart.fieldType(ui.Color),
    backgroundColor: dart.fieldType(ui.Color),
    icon: dart.fieldType(icon.Icon)
  }));
  dart.trackLibraries("packages/bfnmobile/ui/dashboard", {
    "package:bfnmobile/ui/dashboard.dart": dashboard
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["dashboard.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;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","file":"dashboard.ddc.js"}');
  // Exports:
  return {
    ui__dashboard: dashboard
  };
});

//# sourceMappingURL=dashboard.ddc.js.map
