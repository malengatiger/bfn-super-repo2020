define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/bfnlibrary/data/invoice', 'packages/flutter/material', 'packages/bfnlibrary/util/prefs', 'packages/bfnmobile/ui/buy_offer', 'packages/bfnlibrary/util/functions', 'packages/bfnmobile/bloc', 'packages/flutter/src/foundation/_bitfield_web', 'packages/flutter/src/painting/_network_image_web', 'packages/flutter/src/gestures/arena', 'packages/bfnlibrary/util/snack', 'packages/bfnlibrary/data/invoice_offer', 'packages/bfnlibrary/util/net', 'packages/bfnlibrary/util/slide_right', 'packages/bfnmobile/ui/network_accounts', 'packages/bfnlibrary/data/account', 'packages/bfnlibrary/util/theme_bloc', 'packages/bfnmobile/ui/create_invoice'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__bfnlibrary__data__invoice, packages__flutter__material, packages__bfnlibrary__util__prefs, packages__bfnmobile__ui__buy_offer, packages__bfnlibrary__util__functions, packages__bfnmobile__bloc, packages__flutter__src__foundation___bitfield_web, packages__flutter__src__painting___network_image_web, packages__flutter__src__gestures__arena, packages__bfnlibrary__util__snack, packages__bfnlibrary__data__invoice_offer, packages__bfnlibrary__util__net, packages__bfnlibrary__util__slide_right, packages__bfnmobile__ui__network_accounts, packages__bfnlibrary__data__account, packages__bfnlibrary__util__theme_bloc, packages__bfnmobile__ui__create_invoice) {
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
  const async$ = packages__flutter__src__widgets__actions.src__widgets__async;
  const scroll_view = packages__flutter__src__widgets__actions.src__widgets__scroll_view;
  const container = packages__flutter__src__widgets__actions.src__widgets__container;
  const navigator = packages__flutter__src__widgets__actions.src__widgets__navigator;
  const editable_text = packages__flutter__src__widgets__actions.src__widgets__editable_text;
  const icon = packages__flutter__src__widgets__actions.src__widgets__icon;
  const ticker_provider = packages__flutter__src__widgets__actions.src__widgets__ticker_provider;
  const gesture_detector = packages__flutter__src__widgets__actions.src__widgets__gesture_detector;
  const invoice = packages__bfnlibrary__data__invoice.data__invoice;
  const scaffold = packages__flutter__material.src__material__scaffold;
  const app_bar = packages__flutter__material.src__material__app_bar;
  const colors = packages__flutter__material.src__material__colors;
  const card = packages__flutter__material.src__material__card;
  const flat_button = packages__flutter__material.src__material__flat_button;
  const text_field = packages__flutter__material.src__material__text_field;
  const input_decorator = packages__flutter__material.src__material__input_decorator;
  const raised_button = packages__flutter__material.src__material__raised_button;
  const tab_controller = packages__flutter__material.src__material__tab_controller;
  const app = packages__flutter__material.src__material__app;
  const icon_button = packages__flutter__material.src__material__icon_button;
  const icons = packages__flutter__material.src__material__icons;
  const tabs = packages__flutter__material.src__material__tabs;
  const list_tile = packages__flutter__material.src__material__list_tile;
  const dialog = packages__flutter__material.src__material__dialog;
  const floating_action_button = packages__flutter__material.src__material__floating_action_button;
  const prefs = packages__bfnlibrary__util__prefs.util__prefs;
  const buy_offer = packages__bfnmobile__ui__buy_offer.ui__buy_offer;
  const functions = packages__bfnlibrary__util__functions.util__functions;
  const bloc = packages__bfnmobile__bloc.bloc;
  const print = packages__flutter__src__foundation___bitfield_web.src__foundation__print;
  const edge_insets = packages__flutter__src__painting___network_image_web.src__painting__edge_insets;
  const text_style = packages__flutter__src__painting___network_image_web.src__painting__text_style;
  const text_input = packages__flutter__src__gestures__arena.src__services__text_input;
  const snack = packages__bfnlibrary__util__snack.util__snack;
  const invoice_offer = packages__bfnlibrary__data__invoice_offer.data__invoice_offer;
  const net = packages__bfnlibrary__util__net.util__net;
  const slide_right = packages__bfnlibrary__util__slide_right.util__slide_right;
  const network_accounts = packages__bfnmobile__ui__network_accounts.ui__network_accounts;
  const account = packages__bfnlibrary__data__account.data__account;
  const theme_bloc = packages__bfnlibrary__util__theme_bloc.util__theme_bloc;
  const create_invoice = packages__bfnmobile__ui__create_invoice.ui__create_invoice;
  const create_offer = Object.create(dart.library);
  const list_tabs = Object.create(dart.library);
  const $isEmpty = dartx.isEmpty;
  const $toString = dartx.toString;
  const $contains = dartx.contains;
  const $compareTo = dartx.compareTo;
  const $sort = dartx.sort;
  const $add = dartx.add;
  const $forEach = dartx.forEach;
  const $insert = dartx.insert;
  const $length = dartx.length;
  const $elementAt = dartx.elementAt;
  let GlobalKeyOfScaffoldState = () => (GlobalKeyOfScaffoldState = dart.constFn(framework.GlobalKey$(scaffold.ScaffoldState)))();
  let GlobalKeyOfFormState = () => (GlobalKeyOfFormState = dart.constFn(framework.GlobalKey$(form.FormState)))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let StreamBuilderOfString = () => (StreamBuilderOfString = dart.constFn(async$.StreamBuilder$(core.String)))();
  let StreamOfString = () => (StreamOfString = dart.constFn(async.Stream$(core.String)))();
  let AsyncSnapshotOfString = () => (AsyncSnapshotOfString = dart.constFn(async$.AsyncSnapshot$(core.String)))();
  let BuildContextAndAsyncSnapshotOfStringToText = () => (BuildContextAndAsyncSnapshotOfStringToText = dart.constFn(dart.fnType(text.Text, [framework.BuildContext, AsyncSnapshotOfString()])))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let JSArrayOfInvoiceOffer = () => (JSArrayOfInvoiceOffer = dart.constFn(_interceptors.JSArray$(invoice_offer.InvoiceOffer)))();
  let JSArrayOfInvoice = () => (JSArrayOfInvoice = dart.constFn(_interceptors.JSArray$(invoice.Invoice)))();
  let InvoiceOfferAndInvoiceOfferToint = () => (InvoiceOfferAndInvoiceOfferToint = dart.constFn(dart.fnType(core.int, [invoice_offer.InvoiceOffer, invoice_offer.InvoiceOffer])))();
  let InvoiceAndInvoiceToint = () => (InvoiceAndInvoiceToint = dart.constFn(dart.fnType(core.int, [invoice.Invoice, invoice.Invoice])))();
  let StreamBuilderOfint = () => (StreamBuilderOfint = dart.constFn(async$.StreamBuilder$(core.int)))();
  let StreamOfint = () => (StreamOfint = dart.constFn(async.Stream$(core.int)))();
  let AsyncSnapshotOfint = () => (AsyncSnapshotOfint = dart.constFn(async$.AsyncSnapshot$(core.int)))();
  let BuildContextAndAsyncSnapshotOfintToMaterialApp = () => (BuildContextAndAsyncSnapshotOfintToMaterialApp = dart.constFn(dart.fnType(app.MaterialApp, [framework.BuildContext, AsyncSnapshotOfint()])))();
  let InvoiceOfferToNull = () => (InvoiceOfferToNull = dart.constFn(dart.fnType(core.Null, [invoice_offer.InvoiceOffer])))();
  let StreamBuilderOfInvoiceOffer = () => (StreamBuilderOfInvoiceOffer = dart.constFn(async$.StreamBuilder$(invoice_offer.InvoiceOffer)))();
  let StreamOfInvoiceOffer = () => (StreamOfInvoiceOffer = dart.constFn(async.Stream$(invoice_offer.InvoiceOffer)))();
  let BuildContextAndintToPadding = () => (BuildContextAndintToPadding = dart.constFn(dart.fnType(basic.Padding, [framework.BuildContext, core.int])))();
  let AsyncSnapshotOfInvoiceOffer = () => (AsyncSnapshotOfInvoiceOffer = dart.constFn(async$.AsyncSnapshot$(invoice_offer.InvoiceOffer)))();
  let BuildContextAndAsyncSnapshotOfInvoiceOfferToStack = () => (BuildContextAndAsyncSnapshotOfInvoiceOfferToStack = dart.constFn(dart.fnType(basic.Stack, [framework.BuildContext, AsyncSnapshotOfInvoiceOffer()])))();
  let BuildContextToAlertDialog = () => (BuildContextToAlertDialog = dart.constFn(dart.fnType(dialog.AlertDialog, [framework.BuildContext])))();
  let StreamBuilderOfInvoice = () => (StreamBuilderOfInvoice = dart.constFn(async$.StreamBuilder$(invoice.Invoice)))();
  let StreamOfInvoice = () => (StreamOfInvoice = dart.constFn(async.Stream$(invoice.Invoice)))();
  let AsyncSnapshotOfInvoice = () => (AsyncSnapshotOfInvoice = dart.constFn(async$.AsyncSnapshot$(invoice.Invoice)))();
  let BuildContextAndAsyncSnapshotOfInvoiceToStack = () => (BuildContextAndAsyncSnapshotOfInvoiceToStack = dart.constFn(dart.fnType(basic.Stack, [framework.BuildContext, AsyncSnapshotOfInvoice()])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 49,
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
        [_Location_line]: 49,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "account",
        [_Location_column]: 17,
        [_Location_line]: 55,
        [_Location_file]: null
      });
    },
    get C6() {
      return C6 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nodeStyle",
        [_Location_column]: 17,
        [_Location_line]: 56,
        [_Location_file]: null
      });
    },
    get C7() {
      return C7 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nameStyle",
        [_Location_column]: 17,
        [_Location_line]: 57,
        [_Location_file]: null
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 17,
        [_Location_line]: 58,
        [_Location_file]: null
      });
    },
    get C4() {
      return C4 = dart.constList([C5 || CT.C5, C6 || CT.C6, C7 || CT.C7, C8 || CT.C8], widget_inspector._Location);
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C4 || CT.C4,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 54,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C11() {
      return C11 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 61,
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
        [_Location_line]: 60,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C14() {
      return C14 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 33,
        [_Location_line]: 73,
        [_Location_file]: null
      });
    },
    get C15() {
      return C15 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 23,
        [_Location_line]: 74,
        [_Location_file]: null
      });
    },
    get C13() {
      return C13 = dart.constList([C14 || CT.C14, C15 || CT.C15], widget_inspector._Location);
    },
    get C12() {
      return C12 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C13 || CT.C13,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 72,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C18() {
      return C18 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 19,
        [_Location_line]: 64,
        [_Location_file]: null
      });
    },
    get C19() {
      return C19 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "initialData",
        [_Location_column]: 19,
        [_Location_line]: 65,
        [_Location_file]: null
      });
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 19,
        [_Location_line]: 66,
        [_Location_file]: null
      });
    },
    get C17() {
      return C17 = dart.constList([C18 || CT.C18, C19 || CT.C19, C20 || CT.C20], widget_inspector._Location);
    },
    get C16() {
      return C16 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C17 || CT.C17,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 63,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C23() {
      return C23 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 17,
        [_Location_line]: 78,
        [_Location_file]: null
      });
    },
    get C22() {
      return C22 = dart.constList([C23 || CT.C23], widget_inspector._Location);
    },
    get C21() {
      return C21 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C22 || CT.C22,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 77,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C26() {
      return C26 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 13,
        [_Location_line]: 53,
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
        [_Location_column]: 18,
        [_Location_line]: 52,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C29() {
      return C29 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 11,
        [_Location_line]: 51,
        [_Location_file]: null
      });
    },
    get C30() {
      return C30 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 11,
        [_Location_line]: 52,
        [_Location_file]: null
      });
    },
    get C28() {
      return C28 = dart.constList([C29 || CT.C29, C30 || CT.C30], widget_inspector._Location);
    },
    get C27() {
      return C27 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C28 || CT.C28,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 50,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C33() {
      return C33 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 9,
        [_Location_line]: 49,
        [_Location_file]: null
      });
    },
    get C34() {
      return C34 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 9,
        [_Location_line]: 50,
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
        [_Location_column]: 15,
        [_Location_line]: 48,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C37() {
      return C37 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "key",
        [_Location_column]: 7,
        [_Location_line]: 47,
        [_Location_file]: null
      });
    },
    get C38() {
      return C38 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 7,
        [_Location_line]: 48,
        [_Location_file]: null
      });
    },
    get C39() {
      return C39 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 7,
        [_Location_line]: 84,
        [_Location_file]: null
      });
    },
    get C40() {
      return C40 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 7,
        [_Location_line]: 85,
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
        [_Location_column]: 12,
        [_Location_line]: 46,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
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
    get C44() {
      return C44 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "invoice",
        [_Location_column]: 68,
        [_Location_line]: 95,
        [_Location_file]: null
      });
    },
    get C43() {
      return C43 = dart.constList([C44 || CT.C44], widget_inspector._Location);
    },
    get C42() {
      return C42 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C43 || CT.C43,
        [_Location_name]: null,
        [_Location_column]: 47,
        [_Location_line]: 95,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C47() {
      return C47 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 15,
        [_Location_line]: 95,
        [_Location_file]: null
      });
    },
    get C48() {
      return C48 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 40,
        [_Location_line]: 95,
        [_Location_file]: null
      });
    },
    get C46() {
      return C46 = dart.constList([C47 || CT.C47, C48 || CT.C48], widget_inspector._Location);
    },
    get C45() {
      return C45 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C46 || CT.C46,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 94,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C51() {
      return C51 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 11,
        [_Location_line]: 93,
        [_Location_file]: null
      });
    },
    get C52() {
      return C52 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 11,
        [_Location_line]: 94,
        [_Location_file]: null
      });
    },
    get C50() {
      return C50 = dart.constList([C51 || CT.C51, C52 || CT.C52], widget_inspector._Location);
    },
    get C49() {
      return C49 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C50 || CT.C50,
        [_Location_name]: null,
        [_Location_column]: 9,
        [_Location_line]: 92,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C53() {
      return C53 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 8
      });
    },
    get C56() {
      return C56 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 104,
        [_Location_file]: null
      });
    },
    get C55() {
      return C55 = dart.constList([C56 || CT.C56], widget_inspector._Location);
    },
    get C54() {
      return C54 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C55 || CT.C55,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 103,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C59() {
      return C59 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 109,
        [_Location_file]: null
      });
    },
    get C60() {
      return C60 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 110,
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
        [_Location_column]: 26,
        [_Location_line]: 108,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C63() {
      return C63 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 19,
        [_Location_line]: 107,
        [_Location_file]: null
      });
    },
    get C64() {
      return C64 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 108,
        [_Location_file]: null
      });
    },
    get C62() {
      return C62 = dart.constList([C63 || CT.C63, C64 || CT.C64], widget_inspector._Location);
    },
    get C61() {
      return C61 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C62 || CT.C62,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 106,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C66() {
      return C66 = dart.constList([], widget_inspector._Location);
    },
    get C65() {
      return C65 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C66 || CT.C66,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 114,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C69() {
      return C69 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 40,
        [_Location_line]: 116,
        [_Location_file]: null
      });
    },
    get C70() {
      return C70 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 25,
        [_Location_line]: 117,
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
        [_Location_column]: 23,
        [_Location_line]: 115,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C73() {
      return C73 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 120,
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
        [_Location_column]: 17,
        [_Location_line]: 119,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C74() {
      return C74 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C66 || CT.C66,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 123,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C77() {
      return C77 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 25,
        [_Location_line]: 125,
        [_Location_file]: null
      });
    },
    get C78() {
      return C78 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 25,
        [_Location_line]: 126,
        [_Location_file]: null
      });
    },
    get C76() {
      return C76 = dart.constList([C77 || CT.C77, C78 || CT.C78], widget_inspector._Location);
    },
    get C75() {
      return C75 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C76 || CT.C76,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 124,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C81() {
      return C81 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 129,
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
        [_Location_column]: 17,
        [_Location_line]: 128,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C82() {
      return C82 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C66 || CT.C66,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 132,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C83() {
      return C83 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 20,
        [EdgeInsets_right]: 96,
        [EdgeInsets_top]: 0,
        [EdgeInsets_left]: 96
      });
    },
    get C86() {
      return C86 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "controller",
        [_Location_column]: 27,
        [_Location_line]: 137,
        [_Location_file]: null
      });
    },
    get C87() {
      return C87 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 138,
        [_Location_file]: null
      });
    },
    get C88() {
      return C88 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "keyboardType",
        [_Location_column]: 27,
        [_Location_line]: 139,
        [_Location_file]: null
      });
    },
    get C89() {
      return C89 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "decoration",
        [_Location_column]: 27,
        [_Location_line]: 141,
        [_Location_file]: null
      });
    },
    get C90() {
      return C90 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onChanged",
        [_Location_column]: 27,
        [_Location_line]: 145,
        [_Location_file]: null
      });
    },
    get C85() {
      return C85 = dart.constList([C86 || CT.C86, C87 || CT.C87, C88 || CT.C88, C89 || CT.C89, C90 || CT.C90], widget_inspector._Location);
    },
    get C84() {
      return C84 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C85 || CT.C85,
        [_Location_name]: null,
        [_Location_column]: 32,
        [_Location_line]: 136,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C93() {
      return C93 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 25,
        [_Location_line]: 134,
        [_Location_file]: null
      });
    },
    get C94() {
      return C94 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 25,
        [_Location_line]: 136,
        [_Location_file]: null
      });
    },
    get C92() {
      return C92 = dart.constList([C93 || CT.C93, C94 || CT.C94], widget_inspector._Location);
    },
    get C91() {
      return C91 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C92 || CT.C92,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 133,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C95() {
      return C95 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C66 || CT.C66,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 149,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C98() {
      return C98 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 29,
        [_Location_line]: 157,
        [_Location_file]: null
      });
    },
    get C99() {
      return C99 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 29,
        [_Location_line]: 158,
        [_Location_file]: null
      });
    },
    get C97() {
      return C97 = dart.constList([C98 || CT.C98, C99 || CT.C99], widget_inspector._Location);
    },
    get C96() {
      return C96 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C97 || CT.C97,
        [_Location_name]: null,
        [_Location_column]: 34,
        [_Location_line]: 156,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C102() {
      return C102 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 27,
        [_Location_line]: 155,
        [_Location_file]: null
      });
    },
    get C103() {
      return C103 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 27,
        [_Location_line]: 156,
        [_Location_file]: null
      });
    },
    get C101() {
      return C101 = dart.constList([C102 || CT.C102, C103 || CT.C103], widget_inspector._Location);
    },
    get C100() {
      return C100 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C101 || CT.C101,
        [_Location_name]: null,
        [_Location_column]: 32,
        [_Location_line]: 154,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C106() {
      return C106 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 25,
        [_Location_line]: 151,
        [_Location_file]: null
      });
    },
    get C107() {
      return C107 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 25,
        [_Location_line]: 152,
        [_Location_file]: null
      });
    },
    get C108() {
      return C108 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 25,
        [_Location_line]: 153,
        [_Location_file]: null
      });
    },
    get C109() {
      return C109 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 25,
        [_Location_line]: 154,
        [_Location_file]: null
      });
    },
    get C105() {
      return C105 = dart.constList([C106 || CT.C106, C107 || CT.C107, C108 || CT.C108, C109 || CT.C109], widget_inspector._Location);
    },
    get C104() {
      return C104 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C105 || CT.C105,
        [_Location_name]: null,
        [_Location_column]: 23,
        [_Location_line]: 150,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C112() {
      return C112 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 163,
        [_Location_file]: null
      });
    },
    get C111() {
      return C111 = dart.constList([C112 || CT.C112], widget_inspector._Location);
    },
    get C110() {
      return C110 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C111 || CT.C111,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 162,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C115() {
      return C115 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 15,
        [_Location_line]: 102,
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
        [_Location_column]: 20,
        [_Location_line]: 101,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C118() {
      return C118 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 13,
        [_Location_line]: 100,
        [_Location_file]: null
      });
    },
    get C119() {
      return C119 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 101,
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
        [_Location_column]: 18,
        [_Location_line]: 99,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C122() {
      return C122 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 11,
        [_Location_line]: 98,
        [_Location_file]: null
      });
    },
    get C123() {
      return C123 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 11,
        [_Location_line]: 99,
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
        [_Location_column]: 9,
        [_Location_line]: 97,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C126() {
      return C126 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 7,
        [_Location_line]: 91,
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
        [_Location_column]: 12,
        [_Location_line]: 90,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C127() {
      return C127 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C66 || CT.C66,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 229,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/create_offer.dart"
      });
    },
    get C130() {
      return C130 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 40,
        [_Location_line]: 78,
        [_Location_file]: null
      });
    },
    get C129() {
      return C129 = dart.constList([C130 || CT.C130], widget_inspector._Location);
    },
    get C128() {
      return C128 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C129 || CT.C129,
        [_Location_name]: null,
        [_Location_column]: 29,
        [_Location_line]: 78,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C133() {
      return C133 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 23,
        [_Location_line]: 78,
        [_Location_file]: null
      });
    },
    get C134() {
      return C134 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 23,
        [_Location_line]: 79,
        [_Location_file]: null
      });
    },
    get C132() {
      return C132 = dart.constList([C133 || CT.C133, C134 || CT.C134], widget_inspector._Location);
    },
    get C131() {
      return C131 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C132 || CT.C132,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 77,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C137() {
      return C137 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 38,
        [_Location_line]: 83,
        [_Location_file]: null
      });
    },
    get C136() {
      return C136 = dart.constList([C137 || CT.C137], widget_inspector._Location);
    },
    get C135() {
      return C135 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C136 || CT.C136,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 83,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C140() {
      return C140 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 21,
        [_Location_line]: 83,
        [_Location_file]: null
      });
    },
    get C141() {
      return C141 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 21,
        [_Location_line]: 84,
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
        [_Location_column]: 28,
        [_Location_line]: 82,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C142() {
      return C142 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C66 || CT.C66,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 92,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C145() {
      return C145 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "account",
        [_Location_column]: 35,
        [_Location_line]: 94,
        [_Location_file]: null
      });
    },
    get C146() {
      return C146 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nodeStyle",
        [_Location_column]: 35,
        [_Location_line]: 95,
        [_Location_file]: null
      });
    },
    get C147() {
      return C147 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "nameStyle",
        [_Location_column]: 35,
        [_Location_line]: 96,
        [_Location_file]: null
      });
    },
    get C148() {
      return C148 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 35,
        [_Location_line]: 97,
        [_Location_file]: null
      });
    },
    get C144() {
      return C144 = dart.constList([C145 || CT.C145, C146 || CT.C146, C147 || CT.C147, C148 || CT.C148], widget_inspector._Location);
    },
    get C143() {
      return C143 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C144 || CT.C144,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 93,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C151() {
      return C151 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 100,
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
        [_Location_column]: 27,
        [_Location_line]: 99,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C154() {
      return C154 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 45,
        [_Location_line]: 112,
        [_Location_file]: null
      });
    },
    get C155() {
      return C155 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 35,
        [_Location_line]: 113,
        [_Location_file]: null
      });
    },
    get C153() {
      return C153 = dart.constList([C154 || CT.C154, C155 || CT.C155], widget_inspector._Location);
    },
    get C152() {
      return C152 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C153 || CT.C153,
        [_Location_name]: null,
        [_Location_column]: 40,
        [_Location_line]: 111,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C158() {
      return C158 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 31,
        [_Location_line]: 103,
        [_Location_file]: null
      });
    },
    get C159() {
      return C159 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "initialData",
        [_Location_column]: 31,
        [_Location_line]: 104,
        [_Location_file]: null
      });
    },
    get C160() {
      return C160 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 31,
        [_Location_line]: 105,
        [_Location_file]: null
      });
    },
    get C157() {
      return C157 = dart.constList([C158 || CT.C158, C159 || CT.C159, C160 || CT.C160], widget_inspector._Location);
    },
    get C156() {
      return C156 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C157 || CT.C157,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 102,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C163() {
      return C163 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 117,
        [_Location_file]: null
      });
    },
    get C162() {
      return C162 = dart.constList([C163 || CT.C163], widget_inspector._Location);
    },
    get C161() {
      return C161 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C162 || CT.C162,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 116,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C166() {
      return C166 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 50,
        [_Location_line]: 122,
        [_Location_file]: null
      });
    },
    get C165() {
      return C165 = dart.constList([C166 || CT.C166], widget_inspector._Location);
    },
    get C164() {
      return C164 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C165 || CT.C165,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 122,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C169() {
      return C169 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 33,
        [_Location_line]: 122,
        [_Location_file]: null
      });
    },
    get C170() {
      return C170 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "text",
        [_Location_column]: 33,
        [_Location_line]: 123,
        [_Location_file]: null
      });
    },
    get C168() {
      return C168 = dart.constList([C169 || CT.C169, C170 || CT.C170], widget_inspector._Location);
    },
    get C167() {
      return C167 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C168 || CT.C168,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 121,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C173() {
      return C173 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 50,
        [_Location_line]: 126,
        [_Location_file]: null
      });
    },
    get C172() {
      return C172 = dart.constList([C173 || CT.C173], widget_inspector._Location);
    },
    get C171() {
      return C171 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C172 || CT.C172,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 126,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C176() {
      return C176 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 33,
        [_Location_line]: 126,
        [_Location_file]: null
      });
    },
    get C177() {
      return C177 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "text",
        [_Location_column]: 33,
        [_Location_line]: 127,
        [_Location_file]: null
      });
    },
    get C175() {
      return C175 = dart.constList([C176 || CT.C176, C177 || CT.C177], widget_inspector._Location);
    },
    get C174() {
      return C174 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C175 || CT.C175,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 125,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C180() {
      return C180 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 50,
        [_Location_line]: 130,
        [_Location_file]: null
      });
    },
    get C179() {
      return C179 = dart.constList([C180 || CT.C180], widget_inspector._Location);
    },
    get C178() {
      return C178 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C179 || CT.C179,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 130,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C183() {
      return C183 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 33,
        [_Location_line]: 130,
        [_Location_file]: null
      });
    },
    get C184() {
      return C184 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "text",
        [_Location_column]: 33,
        [_Location_line]: 131,
        [_Location_file]: null
      });
    },
    get C182() {
      return C182 = dart.constList([C183 || CT.C183, C184 || CT.C184], widget_inspector._Location);
    },
    get C181() {
      return C181 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C182 || CT.C182,
        [_Location_name]: null,
        [_Location_column]: 31,
        [_Location_line]: 129,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C187() {
      return C187 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "tabs",
        [_Location_column]: 29,
        [_Location_line]: 120,
        [_Location_file]: null
      });
    },
    get C186() {
      return C186 = dart.constList([C187 || CT.C187], widget_inspector._Location);
    },
    get C185() {
      return C185 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C186 || CT.C186,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 119,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C190() {
      return C190 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 25,
        [_Location_line]: 90,
        [_Location_file]: null
      });
    },
    get C189() {
      return C189 = dart.constList([C190 || CT.C190], widget_inspector._Location);
    },
    get C188() {
      return C188 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C189 || CT.C189,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 89,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C193() {
      return C193 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 89,
        [_Location_file]: null
      });
    },
    get C194() {
      return C194 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "preferredSize",
        [_Location_column]: 23,
        [_Location_line]: 137,
        [_Location_file]: null
      });
    },
    get C192() {
      return C192 = dart.constList([C193 || CT.C193, C194 || CT.C194], widget_inspector._Location);
    },
    get C191() {
      return C191 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C192 || CT.C192,
        [_Location_name]: null,
        [_Location_column]: 27,
        [_Location_line]: 88,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C197() {
      return C197 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 31,
        [_Location_line]: 138,
        [_Location_file]: null
      });
    },
    get C196() {
      return C196 = dart.constList([C197 || CT.C197], widget_inspector._Location);
    },
    get C195() {
      return C195 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C196 || CT.C196,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 138,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C200() {
      return C200 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "actions",
        [_Location_column]: 19,
        [_Location_line]: 76,
        [_Location_file]: null
      });
    },
    get C201() {
      return C201 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "leading",
        [_Location_column]: 19,
        [_Location_line]: 82,
        [_Location_file]: null
      });
    },
    get C202() {
      return C202 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 19,
        [_Location_line]: 88,
        [_Location_file]: null
      });
    },
    get C203() {
      return C203 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 19,
        [_Location_line]: 138,
        [_Location_file]: null
      });
    },
    get C199() {
      return C199 = dart.constList([C200 || CT.C200, C201 || CT.C201, C202 || CT.C202, C203 || CT.C203], widget_inspector._Location);
    },
    get C198() {
      return C198 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C199 || CT.C199,
        [_Location_name]: null,
        [_Location_column]: 25,
        [_Location_line]: 75,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C206() {
      return C206 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "offers",
        [_Location_column]: 31,
        [_Location_line]: 143,
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
        [_Location_column]: 21,
        [_Location_line]: 143,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C209() {
      return C209 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "account",
        [_Location_column]: 23,
        [_Location_line]: 145,
        [_Location_file]: null
      });
    },
    get C210() {
      return C210 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "context",
        [_Location_column]: 23,
        [_Location_line]: 146,
        [_Location_file]: null
      });
    },
    get C211() {
      return C211 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "invoices",
        [_Location_column]: 23,
        [_Location_line]: 147,
        [_Location_file]: null
      });
    },
    get C212() {
      return C212 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "invoiceListener",
        [_Location_column]: 23,
        [_Location_line]: 148,
        [_Location_file]: null
      });
    },
    get C208() {
      return C208 = dart.constList([C209 || CT.C209, C210 || CT.C210, C211 || CT.C211, C212 || CT.C212], widget_inspector._Location);
    },
    get C207() {
      return C207 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C208 || CT.C208,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 144,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C213() {
      return C213 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C66 || CT.C66,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 151,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C216() {
      return C216 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 151,
        [_Location_file]: null
      });
    },
    get C215() {
      return C215 = dart.constList([C216 || CT.C216], widget_inspector._Location);
    },
    get C214() {
      return C214 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C215 || CT.C215,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 150,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C219() {
      return C219 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 19,
        [_Location_line]: 142,
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
        [_Location_column]: 23,
        [_Location_line]: 141,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C222() {
      return C222 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "appBar",
        [_Location_column]: 17,
        [_Location_line]: 75,
        [_Location_file]: null
      });
    },
    get C223() {
      return C223 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 17,
        [_Location_line]: 140,
        [_Location_file]: null
      });
    },
    get C224() {
      return C224 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 17,
        [_Location_line]: 141,
        [_Location_file]: null
      });
    },
    get C221() {
      return C221 = dart.constList([C222 || CT.C222, C223 || CT.C223, C224 || CT.C224], widget_inspector._Location);
    },
    get C220() {
      return C220 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C221 || CT.C221,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 74,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C227() {
      return C227 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "length",
        [_Location_column]: 15,
        [_Location_line]: 73,
        [_Location_file]: null
      });
    },
    get C228() {
      return C228 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 74,
        [_Location_file]: null
      });
    },
    get C226() {
      return C226 = dart.constList([C227 || CT.C227, C228 || CT.C228], widget_inspector._Location);
    },
    get C225() {
      return C225 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C226 || CT.C226,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 72,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C231() {
      return C231 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "debugShowCheckedModeBanner",
        [_Location_column]: 13,
        [_Location_line]: 68,
        [_Location_file]: null
      });
    },
    get C232() {
      return C232 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "theme",
        [_Location_column]: 13,
        [_Location_line]: 69,
        [_Location_file]: null
      });
    },
    get C233() {
      return C233 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "home",
        [_Location_column]: 13,
        [_Location_line]: 72,
        [_Location_file]: null
      });
    },
    get C230() {
      return C230 = dart.constList([C231 || CT.C231, C232 || CT.C232, C233 || CT.C233], widget_inspector._Location);
    },
    get C229() {
      return C229 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C230 || CT.C230,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 67,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C236() {
      return C236 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "initialData",
        [_Location_column]: 9,
        [_Location_line]: 62,
        [_Location_file]: null
      });
    },
    get C237() {
      return C237 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 9,
        [_Location_line]: 63,
        [_Location_file]: null
      });
    },
    get C238() {
      return C238 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 9,
        [_Location_line]: 64,
        [_Location_file]: null
      });
    },
    get C235() {
      return C235 = dart.constList([C236 || CT.C236, C237 || CT.C237, C238 || CT.C238], widget_inspector._Location);
    },
    get C234() {
      return C234 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C235 || CT.C235,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 61,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C239() {
      return C239 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 8,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 8
      });
    },
    get C242() {
      return C242 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 37,
        [_Location_line]: 242,
        [_Location_file]: null
      });
    },
    get C243() {
      return C243 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 31,
        [_Location_line]: 243,
        [_Location_file]: null
      });
    },
    get C241() {
      return C241 = dart.constList([C242 || CT.C242, C243 || CT.C243], widget_inspector._Location);
    },
    get C240() {
      return C240 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C241 || CT.C241,
        [_Location_name]: null,
        [_Location_column]: 38,
        [_Location_line]: 241,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C246() {
      return C246 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 31,
        [_Location_line]: 246,
        [_Location_file]: null
      });
    },
    get C247() {
      return C247 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 31,
        [_Location_line]: 247,
        [_Location_file]: null
      });
    },
    get C245() {
      return C245 = dart.constList([C246 || CT.C246, C247 || CT.C247], widget_inspector._Location);
    },
    get C244() {
      return C244 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C245 || CT.C245,
        [_Location_name]: null,
        [_Location_column]: 36,
        [_Location_line]: 245,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C250() {
      return C250 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 35,
        [_Location_line]: 255,
        [_Location_file]: null
      });
    },
    get C249() {
      return C249 = dart.constList([C250 || CT.C250], widget_inspector._Location);
    },
    get C248() {
      return C248 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C249 || CT.C249,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 254,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C253() {
      return C253 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 260,
        [_Location_file]: null
      });
    },
    get C254() {
      return C254 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 261,
        [_Location_file]: null
      });
    },
    get C252() {
      return C252 = dart.constList([C253 || CT.C253, C254 || CT.C254], widget_inspector._Location);
    },
    get C251() {
      return C251 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C252 || CT.C252,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 259,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C257() {
      return C257 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 264,
        [_Location_file]: null
      });
    },
    get C256() {
      return C256 = dart.constList([C257 || CT.C257], widget_inspector._Location);
    },
    get C255() {
      return C255 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C256 || CT.C256,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 263,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C260() {
      return C260 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 57,
        [_Location_line]: 266,
        [_Location_file]: null
      });
    },
    get C259() {
      return C259 = dart.constList([C260 || CT.C260], widget_inspector._Location);
    },
    get C258() {
      return C258 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C259 || CT.C259,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 266,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C263() {
      return C263 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 258,
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
        [_Location_column]: 33,
        [_Location_line]: 257,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C266() {
      return C266 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 272,
        [_Location_file]: null
      });
    },
    get C267() {
      return C267 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 273,
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
        [_Location_column]: 37,
        [_Location_line]: 271,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C270() {
      return C270 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 276,
        [_Location_file]: null
      });
    },
    get C269() {
      return C269 = dart.constList([C270 || CT.C270], widget_inspector._Location);
    },
    get C268() {
      return C268 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C269 || CT.C269,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 275,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C273() {
      return C273 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 57,
        [_Location_line]: 278,
        [_Location_file]: null
      });
    },
    get C272() {
      return C272 = dart.constList([C273 || CT.C273], widget_inspector._Location);
    },
    get C271() {
      return C271 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C272 || CT.C272,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 278,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C276() {
      return C276 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 270,
        [_Location_file]: null
      });
    },
    get C275() {
      return C275 = dart.constList([C276 || CT.C276], widget_inspector._Location);
    },
    get C274() {
      return C274 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C275 || CT.C275,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 269,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C279() {
      return C279 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 284,
        [_Location_file]: null
      });
    },
    get C280() {
      return C280 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 285,
        [_Location_file]: null
      });
    },
    get C278() {
      return C278 = dart.constList([C279 || CT.C279, C280 || CT.C280], widget_inspector._Location);
    },
    get C277() {
      return C277 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C278 || CT.C278,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 283,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C283() {
      return C283 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 288,
        [_Location_file]: null
      });
    },
    get C282() {
      return C282 = dart.constList([C283 || CT.C283], widget_inspector._Location);
    },
    get C281() {
      return C281 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C282 || CT.C282,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 287,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C286() {
      return C286 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 54,
        [_Location_line]: 291,
        [_Location_file]: null
      });
    },
    get C287() {
      return C287 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 292,
        [_Location_file]: null
      });
    },
    get C285() {
      return C285 = dart.constList([C286 || CT.C286, C287 || CT.C287], widget_inspector._Location);
    },
    get C284() {
      return C284 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C285 || CT.C285,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 290,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C290() {
      return C290 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 282,
        [_Location_file]: null
      });
    },
    get C289() {
      return C289 = dart.constList([C290 || CT.C290], widget_inspector._Location);
    },
    get C288() {
      return C288 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C289 || CT.C289,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 281,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C293() {
      return C293 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 299,
        [_Location_file]: null
      });
    },
    get C294() {
      return C294 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 300,
        [_Location_file]: null
      });
    },
    get C292() {
      return C292 = dart.constList([C293 || CT.C293, C294 || CT.C294], widget_inspector._Location);
    },
    get C291() {
      return C291 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C292 || CT.C292,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 298,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C297() {
      return C297 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 303,
        [_Location_file]: null
      });
    },
    get C296() {
      return C296 = dart.constList([C297 || CT.C297], widget_inspector._Location);
    },
    get C295() {
      return C295 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C296 || CT.C296,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 302,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C300() {
      return C300 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 42,
        [_Location_line]: 305,
        [_Location_file]: null
      });
    },
    get C299() {
      return C299 = dart.constList([C300 || CT.C300], widget_inspector._Location);
    },
    get C298() {
      return C298 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C299 || CT.C299,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 305,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C303() {
      return C303 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 297,
        [_Location_file]: null
      });
    },
    get C302() {
      return C302 = dart.constList([C303 || CT.C303], widget_inspector._Location);
    },
    get C301() {
      return C301 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C302 || CT.C302,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 296,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C306() {
      return C306 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 312,
        [_Location_file]: null
      });
    },
    get C307() {
      return C307 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 313,
        [_Location_file]: null
      });
    },
    get C305() {
      return C305 = dart.constList([C306 || CT.C306, C307 || CT.C307], widget_inspector._Location);
    },
    get C304() {
      return C304 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C305 || CT.C305,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 311,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C310() {
      return C310 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 316,
        [_Location_file]: null
      });
    },
    get C309() {
      return C309 = dart.constList([C310 || CT.C310], widget_inspector._Location);
    },
    get C308() {
      return C308 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C309 || CT.C309,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 315,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C313() {
      return C313 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 82,
        [_Location_line]: 319,
        [_Location_file]: null
      });
    },
    get C314() {
      return C314 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 320,
        [_Location_file]: null
      });
    },
    get C312() {
      return C312 = dart.constList([C313 || CT.C313, C314 || CT.C314], widget_inspector._Location);
    },
    get C311() {
      return C311 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C312 || CT.C312,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 318,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C317() {
      return C317 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 310,
        [_Location_file]: null
      });
    },
    get C316() {
      return C316 = dart.constList([C317 || CT.C317], widget_inspector._Location);
    },
    get C315() {
      return C315 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C316 || CT.C316,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 309,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C320() {
      return C320 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 35,
        [_Location_line]: 325,
        [_Location_file]: null
      });
    },
    get C319() {
      return C319 = dart.constList([C320 || CT.C320], widget_inspector._Location);
    },
    get C318() {
      return C318 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C319 || CT.C319,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 324,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C323() {
      return C323 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 330,
        [_Location_file]: null
      });
    },
    get C324() {
      return C324 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 331,
        [_Location_file]: null
      });
    },
    get C322() {
      return C322 = dart.constList([C323 || CT.C323, C324 || CT.C324], widget_inspector._Location);
    },
    get C321() {
      return C321 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C322 || CT.C322,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 329,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C327() {
      return C327 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 334,
        [_Location_file]: null
      });
    },
    get C326() {
      return C326 = dart.constList([C327 || CT.C327], widget_inspector._Location);
    },
    get C325() {
      return C325 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C326 || CT.C326,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 333,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C330() {
      return C330 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 337,
        [_Location_file]: null
      });
    },
    get C331() {
      return C331 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 339,
        [_Location_file]: null
      });
    },
    get C329() {
      return C329 = dart.constList([C330 || CT.C330, C331 || CT.C331], widget_inspector._Location);
    },
    get C328() {
      return C328 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C329 || CT.C329,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 336,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C334() {
      return C334 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 328,
        [_Location_file]: null
      });
    },
    get C333() {
      return C333 = dart.constList([C334 || CT.C334], widget_inspector._Location);
    },
    get C332() {
      return C332 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C333 || CT.C333,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 327,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C337() {
      return C337 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 35,
        [_Location_line]: 344,
        [_Location_file]: null
      });
    },
    get C336() {
      return C336 = dart.constList([C337 || CT.C337], widget_inspector._Location);
    },
    get C335() {
      return C335 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C336 || CT.C336,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 343,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C340() {
      return C340 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 31,
        [_Location_line]: 253,
        [_Location_file]: null
      });
    },
    get C339() {
      return C339 = dart.constList([C340 || CT.C340], widget_inspector._Location);
    },
    get C338() {
      return C338 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C339 || CT.C339,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 252,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C343() {
      return C343 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "leading",
        [_Location_column]: 29,
        [_Location_line]: 241,
        [_Location_file]: null
      });
    },
    get C344() {
      return C344 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 29,
        [_Location_line]: 245,
        [_Location_file]: null
      });
    },
    get C345() {
      return C345 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "subtitle",
        [_Location_column]: 29,
        [_Location_line]: 252,
        [_Location_file]: null
      });
    },
    get C342() {
      return C342 = dart.constList([C343 || CT.C343, C344 || CT.C344, C345 || CT.C345], widget_inspector._Location);
    },
    get C341() {
      return C341 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C342 || CT.C342,
        [_Location_name]: null,
        [_Location_column]: 34,
        [_Location_line]: 240,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C348() {
      return C348 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 27,
        [_Location_line]: 238,
        [_Location_file]: null
      });
    },
    get C349() {
      return C349 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 27,
        [_Location_line]: 239,
        [_Location_file]: null
      });
    },
    get C350() {
      return C350 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 27,
        [_Location_line]: 240,
        [_Location_file]: null
      });
    },
    get C347() {
      return C347 = dart.constList([C348 || CT.C348, C349 || CT.C349, C350 || CT.C350], widget_inspector._Location);
    },
    get C346() {
      return C346 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C347 || CT.C347,
        [_Location_name]: null,
        [_Location_column]: 32,
        [_Location_line]: 237,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C353() {
      return C353 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onTap",
        [_Location_column]: 25,
        [_Location_line]: 231,
        [_Location_file]: null
      });
    },
    get C354() {
      return C354 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 25,
        [_Location_line]: 237,
        [_Location_file]: null
      });
    },
    get C352() {
      return C352 = dart.constList([C353 || CT.C353, C354 || CT.C354], widget_inspector._Location);
    },
    get C351() {
      return C351 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C352 || CT.C352,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 230,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C357() {
      return C357 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 23,
        [_Location_line]: 228,
        [_Location_file]: null
      });
    },
    get C358() {
      return C358 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 230,
        [_Location_file]: null
      });
    },
    get C356() {
      return C356 = dart.constList([C357 || CT.C357, C358 || CT.C358], widget_inspector._Location);
    },
    get C355() {
      return C355 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C356 || CT.C356,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 227,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C361() {
      return C361 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemCount",
        [_Location_column]: 19,
        [_Location_line]: 209,
        [_Location_file]: null
      });
    },
    get C362() {
      return C362 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemBuilder",
        [_Location_column]: 19,
        [_Location_line]: 210,
        [_Location_file]: null
      });
    },
    get C360() {
      return C360 = dart.constList([C361 || CT.C361, C362 || CT.C362], widget_inspector._Location);
    },
    get C359() {
      return C359 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C360 || CT.C360,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 208,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C365() {
      return C365 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 50,
        [_Location_line]: 364,
        [_Location_file]: null
      });
    },
    get C366() {
      return C366 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 25,
        [_Location_line]: 365,
        [_Location_file]: null
      });
    },
    get C364() {
      return C364 = dart.constList([C365 || CT.C365, C366 || CT.C366], widget_inspector._Location);
    },
    get C363() {
      return C363 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C364 || CT.C364,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 363,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C369() {
      return C369 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 363,
        [_Location_file]: null
      });
    },
    get C368() {
      return C368 = dart.constList([C369 || CT.C369], widget_inspector._Location);
    },
    get C367() {
      return C367 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C368 || CT.C368,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 362,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C372() {
      return C372 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 21,
        [_Location_line]: 360,
        [_Location_file]: null
      });
    },
    get C373() {
      return C373 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 21,
        [_Location_line]: 361,
        [_Location_file]: null
      });
    },
    get C374() {
      return C374 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 362,
        [_Location_file]: null
      });
    },
    get C371() {
      return C371 = dart.constList([C372 || CT.C372, C373 || CT.C373, C374 || CT.C374], widget_inspector._Location);
    },
    get C370() {
      return C370 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C371 || CT.C371,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 359,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C377() {
      return C377 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 357,
        [_Location_file]: null
      });
    },
    get C378() {
      return C378 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 19,
        [_Location_line]: 358,
        [_Location_file]: null
      });
    },
    get C379() {
      return C379 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 359,
        [_Location_file]: null
      });
    },
    get C376() {
      return C376 = dart.constList([C377 || CT.C377, C378 || CT.C378, C379 || CT.C379], widget_inspector._Location);
    },
    get C375() {
      return C375 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C376 || CT.C376,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 356,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C382() {
      return C382 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "top",
        [_Location_column]: 17,
        [_Location_line]: 354,
        [_Location_file]: null
      });
    },
    get C383() {
      return C383 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "right",
        [_Location_column]: 17,
        [_Location_line]: 355,
        [_Location_file]: null
      });
    },
    get C384() {
      return C384 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 356,
        [_Location_file]: null
      });
    },
    get C381() {
      return C381 = dart.constList([C382 || CT.C382, C383 || CT.C383, C384 || CT.C384], widget_inspector._Location);
    },
    get C380() {
      return C380 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C381 || CT.C381,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 353,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C387() {
      return C387 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 13,
        [_Location_line]: 207,
        [_Location_file]: null
      });
    },
    get C386() {
      return C386 = dart.constList([C387 || CT.C387], widget_inspector._Location);
    },
    get C385() {
      return C385 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C386 || CT.C386,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 206,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C390() {
      return C390 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 9,
        [_Location_line]: 198,
        [_Location_file]: null
      });
    },
    get C391() {
      return C391 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 9,
        [_Location_line]: 199,
        [_Location_file]: null
      });
    },
    get C389() {
      return C389 = dart.constList([C390 || CT.C390, C391 || CT.C391], widget_inspector._Location);
    },
    get C388() {
      return C388 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C389 || CT.C389,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 197,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C394() {
      return C394 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "offer",
        [_Location_column]: 30,
        [_Location_line]: 389,
        [_Location_file]: null
      });
    },
    get C393() {
      return C393 = dart.constList([C394 || CT.C394], widget_inspector._Location);
    },
    get C392() {
      return C392 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C393 || CT.C393,
        [_Location_name]: null,
        [_Location_column]: 21,
        [_Location_line]: 389,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C397() {
      return C397 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 15,
        [_Location_line]: 407,
        [_Location_file]: null
      });
    },
    get C396() {
      return C396 = dart.constList([C397 || CT.C397], widget_inspector._Location);
    },
    get C395() {
      return C395 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C396 || CT.C396,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 406,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C398() {
      return C398 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 20,
        [EdgeInsets_right]: 20,
        [EdgeInsets_top]: 20,
        [EdgeInsets_left]: 20
      });
    },
    get C401() {
      return C401 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 19,
        [_Location_line]: 412,
        [_Location_file]: null
      });
    },
    get C400() {
      return C400 = dart.constList([C401 || CT.C401], widget_inspector._Location);
    },
    get C399() {
      return C399 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C400 || CT.C400,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 411,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C404() {
      return C404 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 15,
        [_Location_line]: 410,
        [_Location_file]: null
      });
    },
    get C405() {
      return C405 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 411,
        [_Location_file]: null
      });
    },
    get C403() {
      return C403 = dart.constList([C404 || CT.C404, C405 || CT.C405], widget_inspector._Location);
    },
    get C402() {
      return C402 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C403 || CT.C403,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 409,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C408() {
      return C408 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 15,
        [_Location_line]: 415,
        [_Location_file]: null
      });
    },
    get C407() {
      return C407 = dart.constList([C408 || CT.C408], widget_inspector._Location);
    },
    get C406() {
      return C406 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C407 || CT.C407,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 414,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C409() {
      return C409 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 16,
        [EdgeInsets_right]: 16,
        [EdgeInsets_top]: 16,
        [EdgeInsets_left]: 16
      });
    },
    get C412() {
      return C412 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 19,
        [_Location_line]: 423,
        [_Location_file]: null
      });
    },
    get C413() {
      return C413 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 19,
        [_Location_line]: 424,
        [_Location_file]: null
      });
    },
    get C411() {
      return C411 = dart.constList([C412 || CT.C412, C413 || CT.C413], widget_inspector._Location);
    },
    get C410() {
      return C410 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C411 || CT.C411,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 422,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C416() {
      return C416 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 17,
        [_Location_line]: 421,
        [_Location_file]: null
      });
    },
    get C417() {
      return C417 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 422,
        [_Location_file]: null
      });
    },
    get C415() {
      return C415 = dart.constList([C416 || CT.C416, C417 || CT.C417], widget_inspector._Location);
    },
    get C414() {
      return C414 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C415 || CT.C415,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 420,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C420() {
      return C420 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 15,
        [_Location_line]: 418,
        [_Location_file]: null
      });
    },
    get C421() {
      return C421 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 15,
        [_Location_line]: 419,
        [_Location_file]: null
      });
    },
    get C422() {
      return C422 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 420,
        [_Location_file]: null
      });
    },
    get C423() {
      return C423 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 15,
        [_Location_line]: 427,
        [_Location_file]: null
      });
    },
    get C419() {
      return C419 = dart.constList([C420 || CT.C420, C421 || CT.C421, C422 || CT.C422, C423 || CT.C423], widget_inspector._Location);
    },
    get C418() {
      return C418 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C419 || CT.C419,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 417,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C426() {
      return C426 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 15,
        [_Location_line]: 430,
        [_Location_file]: null
      });
    },
    get C425() {
      return C425 = dart.constList([C426 || CT.C426], widget_inspector._Location);
    },
    get C424() {
      return C424 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C425 || CT.C425,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 429,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C429() {
      return C429 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 19,
        [_Location_line]: 435,
        [_Location_file]: null
      });
    },
    get C428() {
      return C428 = dart.constList([C429 || CT.C429], widget_inspector._Location);
    },
    get C427() {
      return C427 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C428 || CT.C428,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 434,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C432() {
      return C432 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 15,
        [_Location_line]: 433,
        [_Location_file]: null
      });
    },
    get C433() {
      return C433 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 434,
        [_Location_file]: null
      });
    },
    get C431() {
      return C431 = dart.constList([C432 || CT.C432, C433 || CT.C433], widget_inspector._Location);
    },
    get C430() {
      return C430 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C431 || CT.C431,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 432,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C436() {
      return C436 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 15,
        [_Location_line]: 438,
        [_Location_file]: null
      });
    },
    get C435() {
      return C435 = dart.constList([C436 || CT.C436], widget_inspector._Location);
    },
    get C434() {
      return C434 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C435 || CT.C435,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 437,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C439() {
      return C439 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 19,
        [_Location_line]: 446,
        [_Location_file]: null
      });
    },
    get C440() {
      return C440 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 19,
        [_Location_line]: 447,
        [_Location_file]: null
      });
    },
    get C438() {
      return C438 = dart.constList([C439 || CT.C439, C440 || CT.C440], widget_inspector._Location);
    },
    get C437() {
      return C437 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C438 || CT.C438,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 445,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C443() {
      return C443 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 17,
        [_Location_line]: 444,
        [_Location_file]: null
      });
    },
    get C444() {
      return C444 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 445,
        [_Location_file]: null
      });
    },
    get C442() {
      return C442 = dart.constList([C443 || CT.C443, C444 || CT.C444], widget_inspector._Location);
    },
    get C441() {
      return C441 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C442 || CT.C442,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 443,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C447() {
      return C447 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 15,
        [_Location_line]: 441,
        [_Location_file]: null
      });
    },
    get C448() {
      return C448 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 15,
        [_Location_line]: 442,
        [_Location_file]: null
      });
    },
    get C449() {
      return C449 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 15,
        [_Location_line]: 443,
        [_Location_file]: null
      });
    },
    get C450() {
      return C450 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 15,
        [_Location_line]: 450,
        [_Location_file]: null
      });
    },
    get C446() {
      return C446 = dart.constList([C447 || CT.C447, C448 || CT.C448, C449 || CT.C449, C450 || CT.C450], widget_inspector._Location);
    },
    get C445() {
      return C445 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C446 || CT.C446,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 440,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C453() {
      return C453 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 11,
        [_Location_line]: 405,
        [_Location_file]: null
      });
    },
    get C452() {
      return C452 = dart.constList([C453 || CT.C453], widget_inspector._Location);
    },
    get C451() {
      return C451 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C452 || CT.C452,
        [_Location_name]: null,
        [_Location_column]: 16,
        [_Location_line]: 404,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C456() {
      return C456 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 9,
        [_Location_line]: 404,
        [_Location_file]: null
      });
    },
    get C455() {
      return C455 = dart.constList([C456 || CT.C456], widget_inspector._Location);
    },
    get C454() {
      return C454 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C455 || CT.C455,
        [_Location_name]: null,
        [_Location_column]: 14,
        [_Location_line]: 403,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C459() {
      return C459 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 7,
        [_Location_line]: 403,
        [_Location_file]: null
      });
    },
    get C458() {
      return C458 = dart.constList([C459 || CT.C459], widget_inspector._Location);
    },
    get C457() {
      return C457 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C458 || CT.C458,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 402,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C462() {
      return C462 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 27,
        [_Location_line]: 505,
        [_Location_file]: null
      });
    },
    get C461() {
      return C461 = dart.constList([C462 || CT.C462], widget_inspector._Location);
    },
    get C460() {
      return C460 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C461 || CT.C461,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 505,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C465() {
      return C465 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "invoice",
        [_Location_column]: 42,
        [_Location_line]: 506,
        [_Location_file]: null
      });
    },
    get C464() {
      return C464 = dart.constList([C465 || CT.C465], widget_inspector._Location);
    },
    get C463() {
      return C463 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C464 || CT.C464,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 506,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C468() {
      return C468 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 513,
        [_Location_file]: null
      });
    },
    get C469() {
      return C469 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 514,
        [_Location_file]: null
      });
    },
    get C467() {
      return C467 = dart.constList([C468 || CT.C468, C469 || CT.C469], widget_inspector._Location);
    },
    get C466() {
      return C466 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C467 || CT.C467,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 512,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C472() {
      return C472 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 19,
        [_Location_line]: 509,
        [_Location_file]: null
      });
    },
    get C473() {
      return C473 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 512,
        [_Location_file]: null
      });
    },
    get C471() {
      return C471 = dart.constList([C472 || CT.C472, C473 || CT.C473], widget_inspector._Location);
    },
    get C470() {
      return C470 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C471 || CT.C471,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 508,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C476() {
      return C476 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 15,
        [_Location_line]: 505,
        [_Location_file]: null
      });
    },
    get C477() {
      return C477 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "content",
        [_Location_column]: 15,
        [_Location_line]: 506,
        [_Location_file]: null
      });
    },
    get C478() {
      return C478 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "actions",
        [_Location_column]: 15,
        [_Location_line]: 507,
        [_Location_file]: null
      });
    },
    get C475() {
      return C475 = dart.constList([C476 || CT.C476, C477 || CT.C477, C478 || CT.C478], widget_inspector._Location);
    },
    get C474() {
      return C474 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C475 || CT.C475,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 504,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C481() {
      return C481 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 27,
        [_Location_line]: 525,
        [_Location_file]: null
      });
    },
    get C480() {
      return C480 = dart.constList([C481 || CT.C481], widget_inspector._Location);
    },
    get C479() {
      return C479 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C480 || CT.C480,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 525,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C484() {
      return C484 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "invoice",
        [_Location_column]: 67,
        [_Location_line]: 527,
        [_Location_file]: null
      });
    },
    get C483() {
      return C483 = dart.constList([C484 || CT.C484], widget_inspector._Location);
    },
    get C482() {
      return C482 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C483 || CT.C483,
        [_Location_name]: null,
        [_Location_column]: 53,
        [_Location_line]: 527,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C487() {
      return C487 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 29,
        [_Location_line]: 527,
        [_Location_file]: null
      });
    },
    get C488() {
      return C488 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 42,
        [_Location_line]: 527,
        [_Location_file]: null
      });
    },
    get C486() {
      return C486 = dart.constList([C487 || CT.C487, C488 || CT.C488], widget_inspector._Location);
    },
    get C485() {
      return C485 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C486 || CT.C486,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 527,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C491() {
      return C491 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 33,
        [_Location_line]: 533,
        [_Location_file]: null
      });
    },
    get C490() {
      return C490 = dart.constList([C491 || CT.C491], widget_inspector._Location);
    },
    get C489() {
      return C489 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C490 || CT.C490,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 533,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C494() {
      return C494 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 21,
        [_Location_line]: 530,
        [_Location_file]: null
      });
    },
    get C495() {
      return C495 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 533,
        [_Location_file]: null
      });
    },
    get C493() {
      return C493 = dart.constList([C494 || CT.C494, C495 || CT.C495], widget_inspector._Location);
    },
    get C492() {
      return C492 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C493 || CT.C493,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 529,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C498() {
      return C498 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 21,
        [_Location_line]: 539,
        [_Location_file]: null
      });
    },
    get C499() {
      return C499 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 21,
        [_Location_line]: 540,
        [_Location_file]: null
      });
    },
    get C497() {
      return C497 = dart.constList([C498 || CT.C498, C499 || CT.C499], widget_inspector._Location);
    },
    get C496() {
      return C496 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C497 || CT.C497,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 538,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C502() {
      return C502 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 19,
        [_Location_line]: 535,
        [_Location_file]: null
      });
    },
    get C503() {
      return C503 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 538,
        [_Location_file]: null
      });
    },
    get C501() {
      return C501 = dart.constList([C502 || CT.C502, C503 || CT.C503], widget_inspector._Location);
    },
    get C500() {
      return C500 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C501 || CT.C501,
        [_Location_name]: null,
        [_Location_column]: 17,
        [_Location_line]: 534,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C506() {
      return C506 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 15,
        [_Location_line]: 525,
        [_Location_file]: null
      });
    },
    get C507() {
      return C507 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "content",
        [_Location_column]: 15,
        [_Location_line]: 526,
        [_Location_file]: null
      });
    },
    get C508() {
      return C508 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "actions",
        [_Location_column]: 15,
        [_Location_line]: 528,
        [_Location_file]: null
      });
    },
    get C505() {
      return C505 = dart.constList([C506 || CT.C506, C507 || CT.C507, C508 || CT.C508], widget_inspector._Location);
    },
    get C504() {
      return C504 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C505 || CT.C505,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 524,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C509() {
      return C509 = dart.const({
        __proto__: edge_insets.EdgeInsets.prototype,
        [EdgeInsets_bottom]: 0,
        [EdgeInsets_right]: 20,
        [EdgeInsets_top]: 8,
        [EdgeInsets_left]: 20
      });
    },
    get C512() {
      return C512 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 37,
        [_Location_line]: 587,
        [_Location_file]: null
      });
    },
    get C513() {
      return C513 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 31,
        [_Location_line]: 588,
        [_Location_file]: null
      });
    },
    get C511() {
      return C511 = dart.constList([C512 || CT.C512, C513 || CT.C513], widget_inspector._Location);
    },
    get C510() {
      return C510 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C511 || CT.C511,
        [_Location_name]: null,
        [_Location_column]: 38,
        [_Location_line]: 586,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C516() {
      return C516 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 31,
        [_Location_line]: 591,
        [_Location_file]: null
      });
    },
    get C517() {
      return C517 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 31,
        [_Location_line]: 592,
        [_Location_file]: null
      });
    },
    get C515() {
      return C515 = dart.constList([C516 || CT.C516, C517 || CT.C517], widget_inspector._Location);
    },
    get C514() {
      return C514 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C515 || CT.C515,
        [_Location_name]: null,
        [_Location_column]: 36,
        [_Location_line]: 590,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C520() {
      return C520 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 35,
        [_Location_line]: 600,
        [_Location_file]: null
      });
    },
    get C519() {
      return C519 = dart.constList([C520 || CT.C520], widget_inspector._Location);
    },
    get C518() {
      return C518 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C519 || CT.C519,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 599,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C523() {
      return C523 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 605,
        [_Location_file]: null
      });
    },
    get C524() {
      return C524 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 606,
        [_Location_file]: null
      });
    },
    get C522() {
      return C522 = dart.constList([C523 || CT.C523, C524 || CT.C524], widget_inspector._Location);
    },
    get C521() {
      return C521 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C522 || CT.C522,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 604,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C527() {
      return C527 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 609,
        [_Location_file]: null
      });
    },
    get C526() {
      return C526 = dart.constList([C527 || CT.C527], widget_inspector._Location);
    },
    get C525() {
      return C525 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C526 || CT.C526,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 608,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C530() {
      return C530 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 56,
        [_Location_line]: 612,
        [_Location_file]: null
      });
    },
    get C531() {
      return C531 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 613,
        [_Location_file]: null
      });
    },
    get C529() {
      return C529 = dart.constList([C530 || CT.C530, C531 || CT.C531], widget_inspector._Location);
    },
    get C528() {
      return C528 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C529 || CT.C529,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 611,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C534() {
      return C534 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 603,
        [_Location_file]: null
      });
    },
    get C533() {
      return C533 = dart.constList([C534 || CT.C534], widget_inspector._Location);
    },
    get C532() {
      return C532 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C533 || CT.C533,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 602,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C537() {
      return C537 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 35,
        [_Location_line]: 618,
        [_Location_file]: null
      });
    },
    get C536() {
      return C536 = dart.constList([C537 || CT.C537], widget_inspector._Location);
    },
    get C535() {
      return C535 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C536 || CT.C536,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 617,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C540() {
      return C540 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 39,
        [_Location_line]: 623,
        [_Location_file]: null
      });
    },
    get C541() {
      return C541 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 624,
        [_Location_file]: null
      });
    },
    get C539() {
      return C539 = dart.constList([C540 || CT.C540, C541 || CT.C541], widget_inspector._Location);
    },
    get C538() {
      return C538 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C539 || CT.C539,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 622,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C544() {
      return C544 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 39,
        [_Location_line]: 627,
        [_Location_file]: null
      });
    },
    get C543() {
      return C543 = dart.constList([C544 || CT.C544], widget_inspector._Location);
    },
    get C542() {
      return C542 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C543 || CT.C543,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 626,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C547() {
      return C547 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 56,
        [_Location_line]: 630,
        [_Location_file]: null
      });
    },
    get C548() {
      return C548 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 39,
        [_Location_line]: 631,
        [_Location_file]: null
      });
    },
    get C546() {
      return C546 = dart.constList([C547 || CT.C547, C548 || CT.C548], widget_inspector._Location);
    },
    get C545() {
      return C545 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C546 || CT.C546,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 629,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C551() {
      return C551 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 621,
        [_Location_file]: null
      });
    },
    get C550() {
      return C550 = dart.constList([C551 || CT.C551], widget_inspector._Location);
    },
    get C549() {
      return C549 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C550 || CT.C550,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 620,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C554() {
      return C554 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 35,
        [_Location_line]: 636,
        [_Location_file]: null
      });
    },
    get C553() {
      return C553 = dart.constList([C554 || CT.C554], widget_inspector._Location);
    },
    get C552() {
      return C552 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C553 || CT.C553,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 635,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C557() {
      return C557 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 42,
        [_Location_line]: 640,
        [_Location_file]: null
      });
    },
    get C556() {
      return C556 = dart.constList([C557 || CT.C557], widget_inspector._Location);
    },
    get C555() {
      return C555 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C556 || CT.C556,
        [_Location_name]: null,
        [_Location_column]: 37,
        [_Location_line]: 640,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C560() {
      return C560 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 35,
        [_Location_line]: 639,
        [_Location_file]: null
      });
    },
    get C559() {
      return C559 = dart.constList([C560 || CT.C560], widget_inspector._Location);
    },
    get C558() {
      return C558 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C559 || CT.C559,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 638,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C563() {
      return C563 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 35,
        [_Location_line]: 645,
        [_Location_file]: null
      });
    },
    get C562() {
      return C562 = dart.constList([C563 || CT.C563], widget_inspector._Location);
    },
    get C561() {
      return C561 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C562 || CT.C562,
        [_Location_name]: null,
        [_Location_column]: 33,
        [_Location_line]: 644,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C566() {
      return C566 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 31,
        [_Location_line]: 598,
        [_Location_file]: null
      });
    },
    get C565() {
      return C565 = dart.constList([C566 || CT.C566], widget_inspector._Location);
    },
    get C564() {
      return C564 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C565 || CT.C565,
        [_Location_name]: null,
        [_Location_column]: 39,
        [_Location_line]: 597,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C569() {
      return C569 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "leading",
        [_Location_column]: 29,
        [_Location_line]: 586,
        [_Location_file]: null
      });
    },
    get C570() {
      return C570 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 29,
        [_Location_line]: 590,
        [_Location_file]: null
      });
    },
    get C571() {
      return C571 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "subtitle",
        [_Location_column]: 29,
        [_Location_line]: 597,
        [_Location_file]: null
      });
    },
    get C568() {
      return C568 = dart.constList([C569 || CT.C569, C570 || CT.C570, C571 || CT.C571], widget_inspector._Location);
    },
    get C567() {
      return C567 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C568 || CT.C568,
        [_Location_name]: null,
        [_Location_column]: 34,
        [_Location_line]: 585,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C574() {
      return C574 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 27,
        [_Location_line]: 584,
        [_Location_file]: null
      });
    },
    get C575() {
      return C575 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 27,
        [_Location_line]: 585,
        [_Location_file]: null
      });
    },
    get C573() {
      return C573 = dart.constList([C574 || CT.C574, C575 || CT.C575], widget_inspector._Location);
    },
    get C572() {
      return C572 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C573 || CT.C573,
        [_Location_name]: null,
        [_Location_column]: 32,
        [_Location_line]: 583,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C578() {
      return C578 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onTap",
        [_Location_column]: 25,
        [_Location_line]: 577,
        [_Location_file]: null
      });
    },
    get C579() {
      return C579 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 25,
        [_Location_line]: 583,
        [_Location_file]: null
      });
    },
    get C577() {
      return C577 = dart.constList([C578 || CT.C578, C579 || CT.C579], widget_inspector._Location);
    },
    get C576() {
      return C576 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C577 || CT.C577,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 576,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C582() {
      return C582 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "padding",
        [_Location_column]: 23,
        [_Location_line]: 574,
        [_Location_file]: null
      });
    },
    get C583() {
      return C583 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 576,
        [_Location_file]: null
      });
    },
    get C581() {
      return C581 = dart.constList([C582 || CT.C582, C583 || CT.C583], widget_inspector._Location);
    },
    get C580() {
      return C580 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C581 || CT.C581,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 573,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C586() {
      return C586 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemCount",
        [_Location_column]: 19,
        [_Location_line]: 565,
        [_Location_file]: null
      });
    },
    get C587() {
      return C587 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemBuilder",
        [_Location_column]: 19,
        [_Location_line]: 566,
        [_Location_file]: null
      });
    },
    get C585() {
      return C585 = dart.constList([C586 || CT.C586, C587 || CT.C587], widget_inspector._Location);
    },
    get C584() {
      return C584 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C585 || CT.C585,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 564,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C590() {
      return C590 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 54,
        [_Location_line]: 667,
        [_Location_file]: null
      });
    },
    get C591() {
      return C591 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 27,
        [_Location_line]: 668,
        [_Location_file]: null
      });
    },
    get C589() {
      return C589 = dart.constList([C590 || CT.C590, C591 || CT.C591], widget_inspector._Location);
    },
    get C588() {
      return C588 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C589 || CT.C589,
        [_Location_name]: null,
        [_Location_column]: 32,
        [_Location_line]: 666,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C594() {
      return C594 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 25,
        [_Location_line]: 666,
        [_Location_file]: null
      });
    },
    get C593() {
      return C593 = dart.constList([C594 || CT.C594], widget_inspector._Location);
    },
    get C592() {
      return C592 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C593 || CT.C593,
        [_Location_name]: null,
        [_Location_column]: 30,
        [_Location_line]: 665,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C597() {
      return C597 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 23,
        [_Location_line]: 663,
        [_Location_file]: null
      });
    },
    get C598() {
      return C598 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 23,
        [_Location_line]: 664,
        [_Location_file]: null
      });
    },
    get C599() {
      return C599 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 23,
        [_Location_line]: 665,
        [_Location_file]: null
      });
    },
    get C596() {
      return C596 = dart.constList([C597 || CT.C597, C598 || CT.C598, C599 || CT.C599], widget_inspector._Location);
    },
    get C595() {
      return C595 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C596 || CT.C596,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 662,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C602() {
      return C602 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onTap",
        [_Location_column]: 21,
        [_Location_line]: 661,
        [_Location_file]: null
      });
    },
    get C603() {
      return C603 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 21,
        [_Location_line]: 662,
        [_Location_file]: null
      });
    },
    get C601() {
      return C601 = dart.constList([C602 || CT.C602, C603 || CT.C603], widget_inspector._Location);
    },
    get C600() {
      return C600 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C601 || CT.C601,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 660,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C606() {
      return C606 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 19,
        [_Location_line]: 658,
        [_Location_file]: null
      });
    },
    get C607() {
      return C607 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 19,
        [_Location_line]: 659,
        [_Location_file]: null
      });
    },
    get C608() {
      return C608 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 660,
        [_Location_file]: null
      });
    },
    get C605() {
      return C605 = dart.constList([C606 || CT.C606, C607 || CT.C607, C608 || CT.C608], widget_inspector._Location);
    },
    get C604() {
      return C604 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C605 || CT.C605,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 657,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C611() {
      return C611 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "top",
        [_Location_column]: 17,
        [_Location_line]: 655,
        [_Location_file]: null
      });
    },
    get C612() {
      return C612 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "right",
        [_Location_column]: 17,
        [_Location_line]: 656,
        [_Location_file]: null
      });
    },
    get C613() {
      return C613 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 657,
        [_Location_file]: null
      });
    },
    get C610() {
      return C610 = dart.constList([C611 || CT.C611, C612 || CT.C612, C613 || CT.C613], widget_inspector._Location);
    },
    get C609() {
      return C609 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C610 || CT.C610,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 654,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C616() {
      return C616 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "icon",
        [_Location_column]: 37,
        [_Location_line]: 681,
        [_Location_file]: null
      });
    },
    get C615() {
      return C615 = dart.constList([C616 || CT.C616], widget_inspector._Location);
    },
    get C614() {
      return C614 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C615 || CT.C615,
        [_Location_name]: null,
        [_Location_column]: 26,
        [_Location_line]: 681,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C619() {
      return C619 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "backgroundColor",
        [_Location_column]: 19,
        [_Location_line]: 679,
        [_Location_file]: null
      });
    },
    get C620() {
      return C620 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "elevation",
        [_Location_column]: 19,
        [_Location_line]: 680,
        [_Location_file]: null
      });
    },
    get C621() {
      return C621 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 19,
        [_Location_line]: 681,
        [_Location_file]: null
      });
    },
    get C622() {
      return C622 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onPressed",
        [_Location_column]: 19,
        [_Location_line]: 682,
        [_Location_file]: null
      });
    },
    get C618() {
      return C618 = dart.constList([C619 || CT.C619, C620 || CT.C620, C621 || CT.C621, C622 || CT.C622], widget_inspector._Location);
    },
    get C617() {
      return C617 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C618 || CT.C618,
        [_Location_name]: null,
        [_Location_column]: 24,
        [_Location_line]: 678,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C625() {
      return C625 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "bottom",
        [_Location_column]: 17,
        [_Location_line]: 676,
        [_Location_file]: null
      });
    },
    get C626() {
      return C626 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "right",
        [_Location_column]: 17,
        [_Location_line]: 677,
        [_Location_file]: null
      });
    },
    get C627() {
      return C627 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 678,
        [_Location_file]: null
      });
    },
    get C624() {
      return C624 = dart.constList([C625 || CT.C625, C626 || CT.C626, C627 || CT.C627], widget_inspector._Location);
    },
    get C623() {
      return C623 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C624 || CT.C624,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 675,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C630() {
      return C630 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 13,
        [_Location_line]: 563,
        [_Location_file]: null
      });
    },
    get C629() {
      return C629 = dart.constList([C630 || CT.C630], widget_inspector._Location);
    },
    get C628() {
      return C628 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C629 || CT.C629,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 562,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C633() {
      return C633 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "stream",
        [_Location_column]: 9,
        [_Location_line]: 552,
        [_Location_file]: null
      });
    },
    get C634() {
      return C634 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "builder",
        [_Location_column]: 9,
        [_Location_line]: 553,
        [_Location_file]: null
      });
    },
    get C632() {
      return C632 = dart.constList([C633 || CT.C633, C634 || CT.C634], widget_inspector._Location);
    },
    get C631() {
      return C631 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C632 || CT.C632,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 551,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C635() {
      return C635 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C66 || CT.C66,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 699,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C638() {
      return C638 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "invoice",
        [_Location_column]: 31,
        [_Location_line]: 723,
        [_Location_file]: null
      });
    },
    get C637() {
      return C637 = dart.constList([C638 || CT.C638], widget_inspector._Location);
    },
    get C636() {
      return C636 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C637 || CT.C637,
        [_Location_name]: null,
        [_Location_column]: 19,
        [_Location_line]: 723,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C641() {
      return C641 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 17,
        [_Location_line]: 741,
        [_Location_file]: null
      });
    },
    get C642() {
      return C642 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 17,
        [_Location_line]: 742,
        [_Location_file]: null
      });
    },
    get C640() {
      return C640 = dart.constList([C641 || CT.C641, C642 || CT.C642], widget_inspector._Location);
    },
    get C639() {
      return C639 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C640 || CT.C640,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 740,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C645() {
      return C645 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 17,
        [_Location_line]: 745,
        [_Location_file]: null
      });
    },
    get C644() {
      return C644 = dart.constList([C645 || CT.C645], widget_inspector._Location);
    },
    get C643() {
      return C643 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C644 || CT.C644,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 744,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C648() {
      return C648 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 37,
        [_Location_line]: 747,
        [_Location_file]: null
      });
    },
    get C647() {
      return C647 = dart.constList([C648 || CT.C648], widget_inspector._Location);
    },
    get C646() {
      return C646 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C647 || CT.C647,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 747,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C651() {
      return C651 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 13,
        [_Location_line]: 739,
        [_Location_file]: null
      });
    },
    get C650() {
      return C650 = dart.constList([C651 || CT.C651], widget_inspector._Location);
    },
    get C649() {
      return C649 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C650 || CT.C650,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 738,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C654() {
      return C654 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 13,
        [_Location_line]: 751,
        [_Location_file]: null
      });
    },
    get C653() {
      return C653 = dart.constList([C654 || CT.C654], widget_inspector._Location);
    },
    get C652() {
      return C652 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C653 || CT.C653,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 750,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C657() {
      return C657 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 20,
        [_Location_line]: 755,
        [_Location_file]: null
      });
    },
    get C658() {
      return C658 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 33,
        [_Location_line]: 755,
        [_Location_file]: null
      });
    },
    get C656() {
      return C656 = dart.constList([C657 || CT.C657, C658 || CT.C658], widget_inspector._Location);
    },
    get C655() {
      return C655 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C656 || CT.C656,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 755,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C661() {
      return C661 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 17,
        [_Location_line]: 757,
        [_Location_file]: null
      });
    },
    get C660() {
      return C660 = dart.constList([C661 || CT.C661], widget_inspector._Location);
    },
    get C659() {
      return C659 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C660 || CT.C660,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 756,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C664() {
      return C664 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 37,
        [_Location_line]: 759,
        [_Location_file]: null
      });
    },
    get C665() {
      return C665 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 43,
        [_Location_line]: 759,
        [_Location_file]: null
      });
    },
    get C663() {
      return C663 = dart.constList([C664 || CT.C664, C665 || CT.C665], widget_inspector._Location);
    },
    get C662() {
      return C662 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C663 || CT.C663,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 759,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C668() {
      return C668 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 13,
        [_Location_line]: 754,
        [_Location_file]: null
      });
    },
    get C667() {
      return C667 = dart.constList([C668 || CT.C668], widget_inspector._Location);
    },
    get C666() {
      return C666 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C667 || CT.C667,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 753,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C671() {
      return C671 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 13,
        [_Location_line]: 763,
        [_Location_file]: null
      });
    },
    get C670() {
      return C670 = dart.constList([C671 || CT.C671], widget_inspector._Location);
    },
    get C669() {
      return C669 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C670 || CT.C670,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 762,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C674() {
      return C674 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 20,
        [_Location_line]: 767,
        [_Location_file]: null
      });
    },
    get C675() {
      return C675 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 37,
        [_Location_line]: 767,
        [_Location_file]: null
      });
    },
    get C673() {
      return C673 = dart.constList([C674 || CT.C674, C675 || CT.C675], widget_inspector._Location);
    },
    get C672() {
      return C672 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C673 || CT.C673,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 767,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C678() {
      return C678 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "width",
        [_Location_column]: 17,
        [_Location_line]: 769,
        [_Location_file]: null
      });
    },
    get C677() {
      return C677 = dart.constList([C678 || CT.C678], widget_inspector._Location);
    },
    get C676() {
      return C676 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C677 || CT.C677,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 768,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C681() {
      return C681 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 17,
        [_Location_line]: 772,
        [_Location_file]: null
      });
    },
    get C682() {
      return C682 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "style",
        [_Location_column]: 17,
        [_Location_line]: 773,
        [_Location_file]: null
      });
    },
    get C680() {
      return C680 = dart.constList([C681 || CT.C681, C682 || CT.C682], widget_inspector._Location);
    },
    get C679() {
      return C679 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C680 || CT.C680,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 771,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C685() {
      return C685 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 13,
        [_Location_line]: 766,
        [_Location_file]: null
      });
    },
    get C684() {
      return C684 = dart.constList([C685 || CT.C685], widget_inspector._Location);
    },
    get C683() {
      return C683 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C684 || CT.C684,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 765,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C688() {
      return C688 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 13,
        [_Location_line]: 778,
        [_Location_file]: null
      });
    },
    get C687() {
      return C687 = dart.constList([C688 || CT.C688], widget_inspector._Location);
    },
    get C686() {
      return C686 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C687 || CT.C687,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 777,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C691() {
      return C691 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 17,
        [_Location_line]: 782,
        [_Location_file]: null
      });
    },
    get C690() {
      return C690 = dart.constList([C691 || CT.C691], widget_inspector._Location);
    },
    get C689() {
      return C689 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C690 || CT.C690,
        [_Location_name]: null,
        [_Location_column]: 20,
        [_Location_line]: 781,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C694() {
      return C694 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 781,
        [_Location_file]: null
      });
    },
    get C693() {
      return C693 = dart.constList([C694 || CT.C694], widget_inspector._Location);
    },
    get C692() {
      return C692 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C693 || CT.C693,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 780,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C697() {
      return C697 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "height",
        [_Location_column]: 13,
        [_Location_line]: 785,
        [_Location_file]: null
      });
    },
    get C696() {
      return C696 = dart.constList([C697 || CT.C697], widget_inspector._Location);
    },
    get C695() {
      return C695 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C696 || CT.C696,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 784,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C700() {
      return C700 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 9,
        [_Location_line]: 737,
        [_Location_file]: null
      });
    },
    get C699() {
      return C699 = dart.constList([C700 || CT.C700], widget_inspector._Location);
    },
    get C698() {
      return C698 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C699 || CT.C699,
        [_Location_name]: null,
        [_Location_column]: 14,
        [_Location_line]: 736,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    },
    get C703() {
      return C703 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 7,
        [_Location_line]: 736,
        [_Location_file]: null
      });
    },
    get C702() {
      return C702 = dart.constList([C703 || CT.C703], widget_inspector._Location);
    },
    get C701() {
      return C701 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C702 || CT.C702,
        [_Location_name]: null,
        [_Location_column]: 12,
        [_Location_line]: 735,
        [_Location_file]: "org-dartlang-app:///packages/bfnmobile/ui/list_tabs.dart"
      });
    }
  });
  const invoice$ = dart.privateName(create_offer, "CreateOffer.invoice");
  create_offer.CreateOffer = class CreateOffer extends framework.StatefulWidget {
    get invoice() {
      return this[invoice$];
    }
    set invoice(value) {
      super.invoice = value;
    }
    createState() {
      return new create_offer._CreateOfferState.new();
    }
  };
  (create_offer.CreateOffer.new = function(invoice, opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[invoice$] = invoice;
    create_offer.CreateOffer.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = create_offer.CreateOffer.prototype;
  dart.addTypeTests(create_offer.CreateOffer);
  dart.setMethodSignature(create_offer.CreateOffer, () => ({
    __proto__: dart.getMethods(create_offer.CreateOffer.__proto__),
    createState: dart.fnType(create_offer._CreateOfferState, [])
  }));
  dart.setLibraryUri(create_offer.CreateOffer, "package:bfnmobile/ui/create_offer.dart");
  dart.setFieldSignature(create_offer.CreateOffer, () => ({
    __proto__: dart.getFields(create_offer.CreateOffer.__proto__),
    invoice: dart.finalFieldType(invoice.Invoice)
  }));
  const _key = dart.privateName(create_offer, "_key");
  const _formKey = dart.privateName(create_offer, "_formKey");
  const _getAccount = dart.privateName(create_offer, "_getAccount");
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C1;
  let C0;
  let C5;
  let C6;
  let C7;
  let C8;
  let C4;
  let C3;
  let C11;
  let C10;
  let C9;
  let C14;
  let C15;
  let C13;
  let C12;
  let C18;
  let C19;
  let C20;
  let C17;
  let C16;
  let C23;
  let C22;
  let C21;
  let C26;
  let C25;
  let C24;
  let C29;
  let C30;
  let C28;
  let C27;
  let C33;
  let C34;
  let C32;
  let C31;
  const _getBody = dart.privateName(create_offer, "_getBody");
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
  let C44;
  let C43;
  let C42;
  let C47;
  let C48;
  let C46;
  let C45;
  let C51;
  let C52;
  let C50;
  let C49;
  let C53;
  let C56;
  let C55;
  let C54;
  const _getTradingAccount = dart.privateName(create_offer, "_getTradingAccount");
  let C59;
  let C60;
  let C58;
  let C57;
  let C63;
  let C64;
  let C62;
  let C61;
  let C66;
  let C65;
  let C69;
  let C70;
  let C68;
  let C67;
  let C73;
  let C72;
  let C71;
  let C74;
  let C77;
  let C78;
  let C76;
  let C75;
  let C81;
  let C80;
  let C79;
  let C82;
  let C83;
  const _onDiscountChanged = dart.privateName(create_offer, "_onDiscountChanged");
  let C86;
  let C87;
  let C88;
  let C89;
  let C90;
  let C85;
  let C84;
  let C93;
  let C94;
  let C92;
  let C91;
  let C95;
  const _submitOffer = dart.privateName(create_offer, "_submitOffer");
  let C98;
  let C99;
  let C97;
  let C96;
  let C102;
  let C103;
  let C101;
  let C100;
  let C106;
  let C107;
  let C108;
  let C109;
  let C105;
  let C104;
  let C112;
  let C111;
  let C110;
  let C115;
  let C114;
  let C113;
  let C118;
  let C119;
  let C117;
  let C116;
  let C122;
  let C123;
  let C121;
  let C120;
  let C126;
  let C125;
  let C124;
  let C127;
  create_offer._CreateOfferState = class _CreateOfferState extends framework.State$(create_offer.CreateOffer) {
    initState() {
      super.initState();
      this[_getAccount]();
    }
    [_getAccount]() {
      return async.async(dart.dynamic, (function* _getAccount() {
        this.account = (yield prefs.Prefs.getAccount());
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    build(context) {
      return new scaffold.Scaffold.new({key: this[_key], appBar: new app_bar.AppBar.new({title: new text.Text.new("Create Offer", {$creationLocationd_0dea112b090073317d4: C0 || CT.C0}), bottom: new preferred_size.PreferredSize.new({preferredSize: new ui.Size.fromHeight(100.0), child: new basic.Column.new({children: JSArrayOfWidget().of([new buy_offer.NameBadge.new({account: this.account, nodeStyle: functions.Styles.whiteSmall, nameStyle: functions.Styles.blackBoldMedium, elevation: 2.0, $creationLocationd_0dea112b090073317d4: C3 || CT.C3}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C9 || CT.C9}), new (StreamBuilderOfString()).new({stream: StreamOfString()._check(bloc.bfnBloc.fcmStream), initialData: "No network message yet", builder: dart.fn((context, snapshot) => {
                    if (dart.test(snapshot.hasData)) {
                      print.debugPrint("😡  😡  😡  😡  CreateOffer: FCM message arrived on Stream: " + dart.str(snapshot.data) + "  😡  😡  😡  😡 ");
                      this.message = snapshot.data;
                    }
                    return new text.Text.new(dart.str(this.message), {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C12 || CT.C12});
                  }, BuildContextAndAsyncSnapshotOfStringToText()), $creationLocationd_0dea112b090073317d4: C16 || CT.C16}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C21 || CT.C21})]), $creationLocationd_0dea112b090073317d4: C24 || CT.C24}), $creationLocationd_0dea112b090073317d4: C27 || CT.C27}), $creationLocationd_0dea112b090073317d4: C31 || CT.C31}), backgroundColor: colors.Colors.brown._get(50), body: this[_getBody](), $creationLocationd_0dea112b090073317d4: C35 || CT.C35});
    }
    [_getBody]() {
      return new scroll_view.ListView.new({children: JSArrayOfWidget().of([new basic.Padding.new({padding: C41 || CT.C41, child: new card.Card.new({color: colors.Colors.grey._get(200), child: new list_tabs.InvoiceDetail.new(this.widget.invoice, {$creationLocationd_0dea112b090073317d4: C42 || CT.C42}), $creationLocationd_0dea112b090073317d4: C45 || CT.C45}), $creationLocationd_0dea112b090073317d4: C49 || CT.C49}), new basic.Padding.new({padding: C53 || CT.C53, child: new card.Card.new({elevation: 2.0, child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C54 || CT.C54}), new flat_button.FlatButton.new({onPressed: dart.bind(this, _getTradingAccount), child: new text.Text.new("Select Investor", {style: functions.Styles.blueMedium, $creationLocationd_0dea112b090073317d4: C57 || CT.C57}), $creationLocationd_0dea112b090073317d4: C61 || CT.C61}), this.tradingAccount == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C65 || CT.C65}) : new text.Text.new(this.tradingAccount.name, {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C67 || CT.C67}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C71 || CT.C71}), this.discount == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C74 || CT.C74}) : new text.Text.new(functions.getFormattedAmount(this.discountAmount, this.context), {style: functions.Styles.tealBoldMedium, $creationLocationd_0dea112b090073317d4: C75 || CT.C75}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C79 || CT.C79}), this.tradingAccount == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C82 || CT.C82}) : new basic.Padding.new({padding: C83 || CT.C83, child: new text_field.TextField.new({controller: create_offer._controller, style: functions.Styles.blackBoldMedium, keyboardType: new text_input.TextInputType.numberWithOptions({decimal: true}), decoration: new input_decorator.InputDecoration.new({labelText: "Discount %", hintText: "0.0", hintStyle: functions.Styles.blackBoldMedium}), onChanged: dart.bind(this, _onDiscountChanged), $creationLocationd_0dea112b090073317d4: C84 || CT.C84}), $creationLocationd_0dea112b090073317d4: C91 || CT.C91}), this.tradingAccount == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C95 || CT.C95}) : new raised_button.RaisedButton.new({color: colors.Colors.indigo, elevation: 8.0, onPressed: dart.bind(this, _submitOffer), child: new basic.Padding.new({padding: C41 || CT.C41, child: new text.Text.new("Submit Offer", {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C96 || CT.C96}), $creationLocationd_0dea112b090073317d4: C100 || CT.C100}), $creationLocationd_0dea112b090073317d4: C104 || CT.C104}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C110 || CT.C110})]), $creationLocationd_0dea112b090073317d4: C113 || CT.C113}), $creationLocationd_0dea112b090073317d4: C116 || CT.C116}), $creationLocationd_0dea112b090073317d4: C120 || CT.C120})]), $creationLocationd_0dea112b090073317d4: C124 || CT.C124});
    }
    [_submitOffer]() {
      return async.async(dart.void, (function* _submitOffer() {
        core.print("_submitOffer  🌺  😎 😎 discount is : " + dart.str(this.discount));
        if (this.discount == null || this.discount[$isEmpty]) {
          snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: "Please enter Discount", actionLabel: "Error"});
          return;
        }
        let myDisc = core.double.parse(this.discount);
        if (myDisc === 0.0) {
          snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: "Please enter valid Discount > 0", actionLabel: "Error"});
          return;
        }
        let acct = (yield prefs.Prefs.getAccount());
        let invoiceOffer = new invoice_offer.InvoiceOffer.new({discount: myDisc, investor: this.tradingAccount, supplier: this.widget.invoice.supplier, customer: this.widget.invoice.customer, owner: this.widget.invoice.supplier, originalAmount: this.widget.invoice.totalAmount, invoiceId: this.widget.invoice.invoiceId});
        snack.AppSnackbar.showSnackbarWithProgressIndicator({scaffoldKey: this[_key], message: "Submitting Offer ...", textColor: colors.Colors.lightGreen, backgroundColor: colors.Colors.black});
        try {
          invoiceOffer = (yield net.Net.startInvoiceOfferFlow(invoiceOffer));
          this.invoiceOfferResult = invoiceOffer;
          snack.AppSnackbar.showSnackbarWithAction({scaffoldKey: this[_key], message: "Offer submitted OK", textColor: colors.Colors.white, backgroundColor: colors.Colors.teal, actionLabel: "OK", listener: this});
        } catch (e$) {
          let e = dart.getThrown(e$);
          snack.AppSnackbar.showErrorSnackbar({scaffoldKey: this[_key], message: "Submission failed", actionLabel: ""});
        }
      }).bind(this));
    }
    [_getTradingAccount]() {
      return async.async(dart.void, (function* _getTradingAccount() {
        let result = (yield navigator.Navigator.push(dart.dynamic, this.context, new slide_right.SlideRightRoute.new({widget: new network_accounts.NetworkAccountsPage.new({$creationLocationd_0dea112b090073317d4: C127 || CT.C127})})));
        if (account.AccountInfo.is(result)) {
          this.setState(dart.fn(() => {
            this.tradingAccount = result;
          }, VoidToNull()));
        }
      }).bind(this));
    }
    [_onDiscountChanged](value) {
      this.discount = value;
      let num = core.double.parse(this.discount);
      let m = dart.notNull(this.widget.invoice.totalAmount) * (dart.notNull(num) / 100);
      core.print(" 😡  😡 discount: " + dart.str(this.discount) + " 👽 👽 discount amount: " + dart.str(m));
      this.setState(dart.fn(() => {
        this.discountAmount = m[$toString]();
      }, VoidToNull()));
    }
    onActionPressed(action) {
      navigator.Navigator.pop(invoice_offer.InvoiceOffer, this.context, this.invoiceOfferResult);
    }
  };
  (create_offer._CreateOfferState.new = function() {
    this[_key] = GlobalKeyOfScaffoldState().new();
    this[_formKey] = GlobalKeyOfFormState().new();
    this.account = null;
    this.discount = null;
    this.message = null;
    this.tradingAccount = null;
    this.invoiceOfferResult = null;
    this.discountAmount = null;
    create_offer._CreateOfferState.__proto__.new.call(this);
    ;
  }).prototype = create_offer._CreateOfferState.prototype;
  dart.addTypeTests(create_offer._CreateOfferState);
  create_offer._CreateOfferState[dart.implements] = () => [snack.SnackBarListener];
  dart.setMethodSignature(create_offer._CreateOfferState, () => ({
    __proto__: dart.getMethods(create_offer._CreateOfferState.__proto__),
    [_getAccount]: dart.fnType(dart.dynamic, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    [_getBody]: dart.fnType(framework.Widget, []),
    [_submitOffer]: dart.fnType(dart.void, []),
    [_getTradingAccount]: dart.fnType(dart.void, []),
    [_onDiscountChanged]: dart.fnType(dart.void, [core.String]),
    onActionPressed: dart.fnType(dart.dynamic, [core.int])
  }));
  dart.setLibraryUri(create_offer._CreateOfferState, "package:bfnmobile/ui/create_offer.dart");
  dart.setFieldSignature(create_offer._CreateOfferState, () => ({
    __proto__: dart.getFields(create_offer._CreateOfferState.__proto__),
    [_key]: dart.fieldType(framework.GlobalKey$(scaffold.ScaffoldState)),
    [_formKey]: dart.finalFieldType(framework.GlobalKey$(form.FormState)),
    account: dart.fieldType(account.AccountInfo),
    discount: dart.fieldType(core.String),
    message: dart.fieldType(core.String),
    tradingAccount: dart.fieldType(account.AccountInfo),
    invoiceOfferResult: dart.fieldType(invoice_offer.InvoiceOffer),
    discountAmount: dart.fieldType(core.String)
  }));
  dart.defineLazy(create_offer, {
    /*create_offer._controller*/get _controller() {
      return new editable_text.TextEditingController.new();
    },
    set _controller(_) {}
  });
  list_tabs.InvoicesPage = class InvoicesPage extends framework.StatefulWidget {
    createState() {
      return new list_tabs._InvoicesPageState.new();
    }
  };
  (list_tabs.InvoicesPage.new = function(opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    list_tabs.InvoicesPage.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = list_tabs.InvoicesPage.prototype;
  dart.addTypeTests(list_tabs.InvoicesPage);
  dart.setMethodSignature(list_tabs.InvoicesPage, () => ({
    __proto__: dart.getMethods(list_tabs.InvoicesPage.__proto__),
    createState: dart.fnType(list_tabs._InvoicesPageState, [])
  }));
  dart.setLibraryUri(list_tabs.InvoicesPage, "package:bfnmobile/ui/list_tabs.dart");
  const _getInvoicesAndOffers = dart.privateName(list_tabs, "_getInvoicesAndOffers");
  let C130;
  let C129;
  let C128;
  let C133;
  let C134;
  let C132;
  let C131;
  let C137;
  let C136;
  let C135;
  let C140;
  let C141;
  let C139;
  let C138;
  let C142;
  let C145;
  let C146;
  let C147;
  let C148;
  let C144;
  let C143;
  let C151;
  let C150;
  let C149;
  let C154;
  let C155;
  let C153;
  let C152;
  let C158;
  let C159;
  let C160;
  let C157;
  let C156;
  let C163;
  let C162;
  let C161;
  let C166;
  let C165;
  let C164;
  let C169;
  let C170;
  let C168;
  let C167;
  let C173;
  let C172;
  let C171;
  let C176;
  let C177;
  let C175;
  let C174;
  let C180;
  let C179;
  let C178;
  let C183;
  let C184;
  let C182;
  let C181;
  let C187;
  let C186;
  let C185;
  let C190;
  let C189;
  let C188;
  let C193;
  let C194;
  let C192;
  let C191;
  let C197;
  let C196;
  let C195;
  let C200;
  let C201;
  let C202;
  let C203;
  let C199;
  let C198;
  let C206;
  let C205;
  let C204;
  let C209;
  let C210;
  let C211;
  let C212;
  let C208;
  let C207;
  let C213;
  let C216;
  let C215;
  let C214;
  let C219;
  let C218;
  let C217;
  let C222;
  let C223;
  let C224;
  let C221;
  let C220;
  let C227;
  let C228;
  let C226;
  let C225;
  let C231;
  let C232;
  let C233;
  let C230;
  let C229;
  let C236;
  let C237;
  let C238;
  let C235;
  let C234;
  const State_SingleTickerProviderStateMixin$36 = class State_SingleTickerProviderStateMixin extends framework.State$(list_tabs.InvoicesPage) {};
  (State_SingleTickerProviderStateMixin$36.new = function() {
    ticker_provider.SingleTickerProviderStateMixin$(list_tabs.InvoicesPage)[dart.mixinNew].call(this);
    State_SingleTickerProviderStateMixin$36.__proto__.new.call(this);
  }).prototype = State_SingleTickerProviderStateMixin$36.prototype;
  dart.applyMixin(State_SingleTickerProviderStateMixin$36, ticker_provider.SingleTickerProviderStateMixin$(list_tabs.InvoicesPage));
  list_tabs._InvoicesPageState = class _InvoicesPageState extends State_SingleTickerProviderStateMixin$36 {
    initState() {
      super.initState();
      this.tabController = new tab_controller.TabController.new({length: 3, vsync: this});
      this[_getInvoicesAndOffers]();
    }
    dispose() {
      this.tabController.dispose();
      super.dispose();
    }
    [_getInvoicesAndOffers]() {
      return async.async(dart.dynamic, (function* _getInvoicesAndOffers() {
        this.account = (yield bloc.bfnBloc.getMyAccount());
        if (this.account.host[$contains]("Regulator")) {
          this.offers = (yield bloc.bfnBloc.getInvoiceOffers({consumed: false}));
          this.invoices = (yield bloc.bfnBloc.getInvoices());
        } else {
          this.offers = (yield bloc.bfnBloc.getInvoiceOffers({accountId: bloc.bfnBloc.account.identifier, consumed: false}));
          this.invoices = (yield bloc.bfnBloc.getInvoices({accountId: bloc.bfnBloc.account.identifier}));
        }
        this.offers[$sort](dart.fn((a, b) => b.offerDate[$compareTo](a.offerDate), InvoiceOfferAndInvoiceOfferToint()));
        this.invoices[$sort](dart.fn((a, b) => b.dateRegistered[$compareTo](a.dateRegistered), InvoiceAndInvoiceToint()));
        this.setState(dart.fn(() => {
        }, VoidToNull()));
      }).bind(this));
    }
    build(context) {
      return new (StreamBuilderOfint()).new({initialData: theme_bloc.themeBloc.themeIndex, stream: StreamOfint()._check(theme_bloc.themeBloc.newThemeStream), builder: dart.fn((context, snapshot) => {
          core.print("👽 👽 👽 👽 main.dart;  snapShot theme index: 👽  " + dart.str(snapshot.data) + " 👽 ");
          return new app.MaterialApp.new({debugShowCheckedModeBanner: false, theme: snapshot.data == null ? theme_bloc.ThemeUtil.getTheme({themeIndex: 0}) : theme_bloc.ThemeUtil.getTheme({themeIndex: snapshot.data}), home: new tab_controller.DefaultTabController.new({length: 3, child: new scaffold.Scaffold.new({appBar: new app_bar.AppBar.new({actions: JSArrayOfWidget().of([new icon_button.IconButton.new({icon: new icon.Icon.new(icons.Icons.refresh, {$creationLocationd_0dea112b090073317d4: C128 || CT.C128}), onPressed: dart.bind(this, _getInvoicesAndOffers), $creationLocationd_0dea112b090073317d4: C131 || CT.C131})]), leading: new icon_button.IconButton.new({icon: new icon.Icon.new(icons.Icons.arrow_back, {$creationLocationd_0dea112b090073317d4: C135 || CT.C135}), onPressed: dart.fn(() => {
                      navigator.Navigator.pop(core.Object, context);
                    }, VoidToNull()), $creationLocationd_0dea112b090073317d4: C138 || CT.C138}), bottom: new preferred_size.PreferredSize.new({child: new basic.Column.new({children: JSArrayOfWidget().of([this.account == null ? new container.Container.new({$creationLocationd_0dea112b090073317d4: C142 || CT.C142}) : new buy_offer.NameBadge.new({account: this.account, nodeStyle: functions.Styles.whiteSmall, nameStyle: functions.Styles.whiteBoldMedium, elevation: 3.0, $creationLocationd_0dea112b090073317d4: C143 || CT.C143}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C149 || CT.C149}), new (StreamBuilderOfString()).new({stream: StreamOfString()._check(bloc.bfnBloc.fcmStream), initialData: "No network message yet", builder: dart.fn((context, snapshot) => {
                            if (dart.test(snapshot.hasData)) {
                              print.debugPrint("😡  😡  😡  😡  FCM message arrived on Stream: " + dart.str(snapshot.data) + "  😡  😡  😡  😡 ");
                              this.message = snapshot.data;
                            }
                            return new text.Text.new(dart.str(this.message), {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C152 || CT.C152});
                          }, BuildContextAndAsyncSnapshotOfStringToText()), $creationLocationd_0dea112b090073317d4: C156 || CT.C156}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C161 || CT.C161}), new tabs.TabBar.new({tabs: JSArrayOfWidget().of([new tabs.Tab.new({icon: new icon.Icon.new(icons.Icons.list, {$creationLocationd_0dea112b090073317d4: C164 || CT.C164}), text: "Offers", $creationLocationd_0dea112b090073317d4: C167 || CT.C167}), new tabs.Tab.new({icon: new icon.Icon.new(icons.Icons.apps, {$creationLocationd_0dea112b090073317d4: C171 || CT.C171}), text: "Invoices", $creationLocationd_0dea112b090073317d4: C174 || CT.C174}), new tabs.Tab.new({icon: new icon.Icon.new(icons.Icons.history, {$creationLocationd_0dea112b090073317d4: C178 || CT.C178}), text: "Journal", $creationLocationd_0dea112b090073317d4: C181 || CT.C181})]), $creationLocationd_0dea112b090073317d4: C185 || CT.C185})]), $creationLocationd_0dea112b090073317d4: C188 || CT.C188}), preferredSize: new ui.Size.fromHeight(200.0), $creationLocationd_0dea112b090073317d4: C191 || CT.C191}), title: new text.Text.new("Invoices & Offers", {$creationLocationd_0dea112b090073317d4: C195 || CT.C195}), $creationLocationd_0dea112b090073317d4: C198 || CT.C198}), backgroundColor: colors.Colors.brown._get(100), body: new tabs.TabBarView.new({children: JSArrayOfWidget().of([new list_tabs.OfferList.new(this.offers, {$creationLocationd_0dea112b090073317d4: C204 || CT.C204}), new list_tabs.InvoiceList.new({account: this.account, context: context, invoices: this.invoices, invoiceListener: this, $creationLocationd_0dea112b090073317d4: C207 || CT.C207}), new card.Card.new({child: new list_tabs.CreateMenu.new({$creationLocationd_0dea112b090073317d4: C213 || CT.C213}), $creationLocationd_0dea112b090073317d4: C214 || CT.C214})]), $creationLocationd_0dea112b090073317d4: C217 || CT.C217}), $creationLocationd_0dea112b090073317d4: C220 || CT.C220}), $creationLocationd_0dea112b090073317d4: C225 || CT.C225}), $creationLocationd_0dea112b090073317d4: C229 || CT.C229});
        }, BuildContextAndAsyncSnapshotOfintToMaterialApp()), $creationLocationd_0dea112b090073317d4: C234 || CT.C234});
    }
    onInvoice(invoice) {
      this.setState(dart.fn(() => {
        this.invoices[$add](invoice);
      }, VoidToNull()));
    }
  };
  (list_tabs._InvoicesPageState.new = function() {
    this.offers = JSArrayOfInvoiceOffer().of([]);
    this.invoices = JSArrayOfInvoice().of([]);
    this.account = null;
    this.tabController = null;
    this.message = null;
    list_tabs._InvoicesPageState.__proto__.new.call(this);
    ;
  }).prototype = list_tabs._InvoicesPageState.prototype;
  dart.addTypeTests(list_tabs._InvoicesPageState);
  list_tabs._InvoicesPageState[dart.implements] = () => [list_tabs.InvoiceListener];
  dart.setMethodSignature(list_tabs._InvoicesPageState, () => ({
    __proto__: dart.getMethods(list_tabs._InvoicesPageState.__proto__),
    [_getInvoicesAndOffers]: dart.fnType(dart.dynamic, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    onInvoice: dart.fnType(dart.void, [invoice.Invoice])
  }));
  dart.setLibraryUri(list_tabs._InvoicesPageState, "package:bfnmobile/ui/list_tabs.dart");
  dart.setFieldSignature(list_tabs._InvoicesPageState, () => ({
    __proto__: dart.getFields(list_tabs._InvoicesPageState.__proto__),
    offers: dart.fieldType(core.List$(invoice_offer.InvoiceOffer)),
    invoices: dart.fieldType(core.List$(invoice.Invoice)),
    account: dart.fieldType(account.AccountInfo),
    tabController: dart.fieldType(tab_controller.TabController),
    message: dart.fieldType(core.String)
  }));
  const offers$ = dart.privateName(list_tabs, "OfferList.offers");
  list_tabs.OfferList = class OfferList extends framework.StatefulWidget {
    get offers() {
      return this[offers$];
    }
    set offers(value) {
      super.offers = value;
    }
    createState() {
      return new list_tabs._OfferListState.new();
    }
  };
  (list_tabs.OfferList.new = function(offers, opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[offers$] = offers;
    list_tabs.OfferList.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = list_tabs.OfferList.prototype;
  dart.addTypeTests(list_tabs.OfferList);
  dart.setMethodSignature(list_tabs.OfferList, () => ({
    __proto__: dart.getMethods(list_tabs.OfferList.__proto__),
    createState: dart.fnType(list_tabs._OfferListState, [])
  }));
  dart.setLibraryUri(list_tabs.OfferList, "package:bfnmobile/ui/list_tabs.dart");
  dart.setFieldSignature(list_tabs.OfferList, () => ({
    __proto__: dart.getFields(list_tabs.OfferList.__proto__),
    offers: dart.finalFieldType(core.List$(invoice_offer.InvoiceOffer))
  }));
  const _getAccount$ = dart.privateName(list_tabs, "_getAccount");
  let C239;
  const _onOfferTapped = dart.privateName(list_tabs, "_onOfferTapped");
  let C242;
  let C243;
  let C241;
  let C240;
  let C246;
  let C247;
  let C245;
  let C244;
  let C250;
  let C249;
  let C248;
  let C253;
  let C254;
  let C252;
  let C251;
  let C257;
  let C256;
  let C255;
  let C260;
  let C259;
  let C258;
  let C263;
  let C262;
  let C261;
  let C266;
  let C267;
  let C265;
  let C264;
  let C270;
  let C269;
  let C268;
  let C273;
  let C272;
  let C271;
  let C276;
  let C275;
  let C274;
  let C279;
  let C280;
  let C278;
  let C277;
  let C283;
  let C282;
  let C281;
  let C286;
  let C287;
  let C285;
  let C284;
  let C290;
  let C289;
  let C288;
  let C293;
  let C294;
  let C292;
  let C291;
  let C297;
  let C296;
  let C295;
  let C300;
  let C299;
  let C298;
  let C303;
  let C302;
  let C301;
  let C306;
  let C307;
  let C305;
  let C304;
  let C310;
  let C309;
  let C308;
  let C313;
  let C314;
  let C312;
  let C311;
  let C317;
  let C316;
  let C315;
  let C320;
  let C319;
  let C318;
  let C323;
  let C324;
  let C322;
  let C321;
  let C327;
  let C326;
  let C325;
  let C330;
  let C331;
  let C329;
  let C328;
  let C334;
  let C333;
  let C332;
  let C337;
  let C336;
  let C335;
  let C340;
  let C339;
  let C338;
  let C343;
  let C344;
  let C345;
  let C342;
  let C341;
  let C348;
  let C349;
  let C350;
  let C347;
  let C346;
  let C353;
  let C354;
  let C352;
  let C351;
  let C357;
  let C358;
  let C356;
  let C355;
  let C361;
  let C362;
  let C360;
  let C359;
  let C365;
  let C366;
  let C364;
  let C363;
  let C369;
  let C368;
  let C367;
  let C372;
  let C373;
  let C374;
  let C371;
  let C370;
  let C377;
  let C378;
  let C379;
  let C376;
  let C375;
  let C382;
  let C383;
  let C384;
  let C381;
  let C380;
  let C387;
  let C386;
  let C385;
  let C390;
  let C391;
  let C389;
  let C388;
  let C394;
  let C393;
  let C392;
  list_tabs._OfferListState = class _OfferListState extends framework.State$(list_tabs.OfferList) {
    initState() {
      super.initState();
      this[_getAccount$]();
    }
    [_getAccount$]() {
      return async.async(dart.dynamic, (function* _getAccount() {
        this.account = (yield prefs.Prefs.getAccount());
      }).bind(this));
    }
    build(context) {
      let x = 0;
      this.widget.offers[$forEach](dart.fn(o => {
        x = x + 1;
      }, InvoiceOfferToNull()));
      return new (StreamBuilderOfInvoiceOffer()).new({stream: StreamOfInvoiceOffer()._check(bloc.bfnBloc.offerStream), builder: dart.fn((context, snapshot) => {
          if (dart.test(snapshot.hasData)) {
            let offer = snapshot.data;
            if (offer.investor.identifier == this.account.identifier) {
              this.widget.offers[$insert](0, offer);
            }
          }
          return new basic.Stack.new({children: JSArrayOfWidget().of([new scroll_view.ListView.builder({itemCount: this.widget.offers[$length], itemBuilder: dart.fn((context, index) => {
                  let color = colors.Colors.blue._get(700);
                  let backColor = colors.Colors.white;
                  let offer = this.widget.offers[$elementAt](index);
                  if (bloc.bfnBloc.account.identifier == offer.supplier.identifier) {
                    color = colors.Colors.black;
                  }
                  if (bloc.bfnBloc.account.identifier == offer.customer.identifier) {
                    color = colors.Colors.grey._get(400);
                  }
                  if (bloc.bfnBloc.account.identifier == offer.investor.identifier) {
                    color = colors.Colors.pink._get(800);
                    backColor = colors.Colors.pink._get(50);
                  }
                  return new basic.Padding.new({padding: C239 || CT.C239, child: new gesture_detector.GestureDetector.new({onTap: dart.fn(() => {
                        if (bloc.bfnBloc.account.host[$contains]("Regulator")) {
                        } else {
                          this[_onOfferTapped](offer, context);
                        }
                      }, VoidToNull()), child: new card.Card.new({elevation: 4.0, color: backColor, child: new list_tile.ListTile.new({leading: new icon.Icon.new(icons.Icons.apps, {color: color, $creationLocationd_0dea112b090073317d4: C240 || CT.C240}), title: new text.Text.new(this.getCurrency(offer.offerAmount, context), {style: new text_style.TextStyle.new({color: color, fontWeight: ui.FontWeight.w900, fontSize: 20.0}), $creationLocationd_0dea112b090073317d4: C244 || CT.C244}), subtitle: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C248 || CT.C248}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Customer", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C251 || CT.C251}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C255 || CT.C255}), new text.Text.new(offer.customer.name, {$creationLocationd_0dea112b090073317d4: C258 || CT.C258})]), $creationLocationd_0dea112b090073317d4: C261 || CT.C261}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Supplier", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C264 || CT.C264}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C268 || CT.C268}), new text.Text.new(offer.supplier.name, {$creationLocationd_0dea112b090073317d4: C271 || CT.C271})]), $creationLocationd_0dea112b090073317d4: C274 || CT.C274}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Buyer", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C277 || CT.C277}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C281 || CT.C281}), new text.Text.new(offer.investor.name, {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C284 || CT.C284})]), $creationLocationd_0dea112b090073317d4: C288 || CT.C288}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Invoice Amount", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C291 || CT.C291}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C295 || CT.C295}), new text.Text.new(this.getCurrency(offer.originalAmount, context), {$creationLocationd_0dea112b090073317d4: C298 || CT.C298})]), $creationLocationd_0dea112b090073317d4: C301 || CT.C301}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Discount", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C304 || CT.C304}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C308 || CT.C308}), new text.Text.new(dart.str(this.getCurrency(offer.discount, context)) + " %", {style: functions.Styles.tealBoldSmall, $creationLocationd_0dea112b090073317d4: C311 || CT.C311})]), $creationLocationd_0dea112b090073317d4: C315 || CT.C315}), new basic.SizedBox.new({height: 12.0, $creationLocationd_0dea112b090073317d4: C318 || CT.C318}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Offered", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C321 || CT.C321}), new basic.SizedBox.new({width: 4.0, $creationLocationd_0dea112b090073317d4: C325 || CT.C325}), new text.Text.new(functions.getFormattedDateShortWithTime(offer.offerDate, context), {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C328 || CT.C328})]), $creationLocationd_0dea112b090073317d4: C332 || CT.C332}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C335 || CT.C335})]), $creationLocationd_0dea112b090073317d4: C338 || CT.C338}), $creationLocationd_0dea112b090073317d4: C341 || CT.C341}), $creationLocationd_0dea112b090073317d4: C346 || CT.C346}), $creationLocationd_0dea112b090073317d4: C351 || CT.C351}), $creationLocationd_0dea112b090073317d4: C355 || CT.C355});
                }, BuildContextAndintToPadding()), $creationLocationd_0dea112b090073317d4: C359 || CT.C359}), new basic.Positioned.new({top: 20.0, right: 0.0, child: new container.Container.new({height: 60.0, width: 80.0, child: new card.Card.new({elevation: 20.0, color: colors.Colors.yellow, child: new basic.Center.new({child: new text.Text.new(dart.str(this.widget.offers[$length]), {style: functions.Styles.pinkBoldMedium, $creationLocationd_0dea112b090073317d4: C363 || CT.C363}), $creationLocationd_0dea112b090073317d4: C367 || CT.C367}), $creationLocationd_0dea112b090073317d4: C370 || CT.C370}), $creationLocationd_0dea112b090073317d4: C375 || CT.C375}), $creationLocationd_0dea112b090073317d4: C380 || CT.C380})]), $creationLocationd_0dea112b090073317d4: C385 || CT.C385});
        }, BuildContextAndAsyncSnapshotOfInvoiceOfferToStack()), $creationLocationd_0dea112b090073317d4: C388 || CT.C388});
    }
    [_onOfferTapped](offer, context) {
      return async.async(dart.dynamic, function* _onOfferTapped() {
        if (bloc.bfnBloc.account.identifier == offer.supplier.identifier) {
        }
        if (bloc.bfnBloc.account.identifier == offer.customer.identifier) {
        }
        if (bloc.bfnBloc.account.identifier == offer.investor.identifier) {
          navigator.Navigator.push(dart.dynamic, context, new slide_right.SlideRightRoute.new({widget: new buy_offer.BuyOffer.new(offer, {$creationLocationd_0dea112b090073317d4: C392 || CT.C392})}));
        }
      });
    }
    getCurrency(amt, context) {
      return functions.getFormattedAmount(dart.toString(amt), context);
    }
  };
  (list_tabs._OfferListState.new = function() {
    this.account = null;
    list_tabs._OfferListState.__proto__.new.call(this);
    ;
  }).prototype = list_tabs._OfferListState.prototype;
  dart.addTypeTests(list_tabs._OfferListState);
  dart.setMethodSignature(list_tabs._OfferListState, () => ({
    __proto__: dart.getMethods(list_tabs._OfferListState.__proto__),
    [_getAccount$]: dart.fnType(dart.dynamic, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    [_onOfferTapped]: dart.fnType(dart.dynamic, [invoice_offer.InvoiceOffer, framework.BuildContext]),
    getCurrency: dart.fnType(core.String, [core.double, framework.BuildContext])
  }));
  dart.setLibraryUri(list_tabs._OfferListState, "package:bfnmobile/ui/list_tabs.dart");
  dart.setFieldSignature(list_tabs._OfferListState, () => ({
    __proto__: dart.getFields(list_tabs._OfferListState.__proto__),
    account: dart.fieldType(account.AccountInfo)
  }));
  let C397;
  let C396;
  let C395;
  let C398;
  let C401;
  let C400;
  let C399;
  let C404;
  let C405;
  let C403;
  let C402;
  let C408;
  let C407;
  let C406;
  let C409;
  let C412;
  let C413;
  let C411;
  let C410;
  let C416;
  let C417;
  let C415;
  let C414;
  const _createInvoicePressed = dart.privateName(list_tabs, "_createInvoicePressed");
  let C420;
  let C421;
  let C422;
  let C423;
  let C419;
  let C418;
  let C426;
  let C425;
  let C424;
  let C429;
  let C428;
  let C427;
  let C432;
  let C433;
  let C431;
  let C430;
  let C436;
  let C435;
  let C434;
  let C439;
  let C440;
  let C438;
  let C437;
  let C443;
  let C444;
  let C442;
  let C441;
  const _createInvoiceOfferPressed = dart.privateName(list_tabs, "_createInvoiceOfferPressed");
  let C447;
  let C448;
  let C449;
  let C450;
  let C446;
  let C445;
  let C453;
  let C452;
  let C451;
  let C456;
  let C455;
  let C454;
  let C459;
  let C458;
  let C457;
  list_tabs.CreateMenu = class CreateMenu extends framework.StatelessWidget {
    build(context) {
      return new card.Card.new({child: new basic.Center.new({child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 40.0, $creationLocationd_0dea112b090073317d4: C395 || CT.C395}), new basic.Padding.new({padding: C398 || CT.C398, child: new text.Text.new("Every invoice recorded on the Network should be from a customer who is already part of the Network. To create an invoice you must select your customer from the Accounts list", {$creationLocationd_0dea112b090073317d4: C399 || CT.C399}), $creationLocationd_0dea112b090073317d4: C402 || CT.C402}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C406 || CT.C406}), new raised_button.RaisedButton.new({color: colors.Colors.pink, elevation: 4.0, child: new basic.Padding.new({padding: C409 || CT.C409, child: new text.Text.new("Create Invoice", {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C410 || CT.C410}), $creationLocationd_0dea112b090073317d4: C414 || CT.C414}), onPressed: dart.bind(this, _createInvoicePressed), $creationLocationd_0dea112b090073317d4: C418 || CT.C418}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C424 || CT.C424}), new basic.Padding.new({padding: C398 || CT.C398, child: new text.Text.new("Every invoice recorded on the Network should be from a customer who is already part of the Network. To create an invoice you must select your customer from the Accounts list", {$creationLocationd_0dea112b090073317d4: C427 || CT.C427}), $creationLocationd_0dea112b090073317d4: C430 || CT.C430}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C434 || CT.C434}), new raised_button.RaisedButton.new({color: colors.Colors.indigo, elevation: 4.0, child: new basic.Padding.new({padding: C409 || CT.C409, child: new text.Text.new("Create Offer", {style: functions.Styles.whiteSmall, $creationLocationd_0dea112b090073317d4: C437 || CT.C437}), $creationLocationd_0dea112b090073317d4: C441 || CT.C441}), onPressed: dart.bind(this, _createInvoiceOfferPressed), $creationLocationd_0dea112b090073317d4: C445 || CT.C445})]), $creationLocationd_0dea112b090073317d4: C451 || CT.C451}), $creationLocationd_0dea112b090073317d4: C454 || CT.C454}), $creationLocationd_0dea112b090073317d4: C457 || CT.C457});
    }
    [_createInvoicePressed]() {
    }
    [_createInvoiceOfferPressed]() {
    }
  };
  (list_tabs.CreateMenu.new = function(opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    list_tabs.CreateMenu.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = list_tabs.CreateMenu.prototype;
  dart.addTypeTests(list_tabs.CreateMenu);
  dart.setMethodSignature(list_tabs.CreateMenu, () => ({
    __proto__: dart.getMethods(list_tabs.CreateMenu.__proto__),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    [_createInvoicePressed]: dart.fnType(dart.void, []),
    [_createInvoiceOfferPressed]: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(list_tabs.CreateMenu, "package:bfnmobile/ui/list_tabs.dart");
  list_tabs.InvoiceListener = class InvoiceListener extends core.Object {};
  (list_tabs.InvoiceListener.new = function() {
    ;
  }).prototype = list_tabs.InvoiceListener.prototype;
  dart.addTypeTests(list_tabs.InvoiceListener);
  dart.setLibraryUri(list_tabs.InvoiceListener, "package:bfnmobile/ui/list_tabs.dart");
  const invoices$ = dart.privateName(list_tabs, "InvoiceList.invoices");
  const context$ = dart.privateName(list_tabs, "InvoiceList.context");
  const account$ = dart.privateName(list_tabs, "InvoiceList.account");
  const invoiceListener$ = dart.privateName(list_tabs, "InvoiceList.invoiceListener");
  list_tabs.InvoiceList = class InvoiceList extends framework.StatefulWidget {
    get invoices() {
      return this[invoices$];
    }
    set invoices(value) {
      super.invoices = value;
    }
    get context() {
      return this[context$];
    }
    set context(value) {
      super.context = value;
    }
    get account() {
      return this[account$];
    }
    set account(value) {
      super.account = value;
    }
    get invoiceListener() {
      return this[invoiceListener$];
    }
    set invoiceListener(value) {
      super.invoiceListener = value;
    }
    createState() {
      return new list_tabs._InvoiceListState.new();
    }
  };
  (list_tabs.InvoiceList.new = function(opts) {
    let invoices = opts && 'invoices' in opts ? opts.invoices : null;
    let context = opts && 'context' in opts ? opts.context : null;
    let account = opts && 'account' in opts ? opts.account : null;
    let invoiceListener = opts && 'invoiceListener' in opts ? opts.invoiceListener : null;
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[invoices$] = invoices;
    this[context$] = context;
    this[account$] = account;
    this[invoiceListener$] = invoiceListener;
    list_tabs.InvoiceList.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = list_tabs.InvoiceList.prototype;
  dart.addTypeTests(list_tabs.InvoiceList);
  dart.setMethodSignature(list_tabs.InvoiceList, () => ({
    __proto__: dart.getMethods(list_tabs.InvoiceList.__proto__),
    createState: dart.fnType(list_tabs._InvoiceListState, [])
  }));
  dart.setLibraryUri(list_tabs.InvoiceList, "package:bfnmobile/ui/list_tabs.dart");
  dart.setFieldSignature(list_tabs.InvoiceList, () => ({
    __proto__: dart.getFields(list_tabs.InvoiceList.__proto__),
    invoices: dart.finalFieldType(core.List$(invoice.Invoice)),
    context: dart.finalFieldType(framework.BuildContext),
    account: dart.finalFieldType(account.AccountInfo),
    invoiceListener: dart.finalFieldType(list_tabs.InvoiceListener)
  }));
  const _checkOffers = dart.privateName(list_tabs, "_checkOffers");
  let C462;
  let C461;
  let C460;
  let C465;
  let C464;
  let C463;
  let C468;
  let C469;
  let C467;
  let C466;
  let C472;
  let C473;
  let C471;
  let C470;
  let C476;
  let C477;
  let C478;
  let C475;
  let C474;
  let C481;
  let C480;
  let C479;
  let C484;
  let C483;
  let C482;
  let C487;
  let C488;
  let C486;
  let C485;
  const _sendMessage = dart.privateName(list_tabs, "_sendMessage");
  let C491;
  let C490;
  let C489;
  let C494;
  let C495;
  let C493;
  let C492;
  const _createOffer = dart.privateName(list_tabs, "_createOffer");
  let C498;
  let C499;
  let C497;
  let C496;
  let C502;
  let C503;
  let C501;
  let C500;
  let C506;
  let C507;
  let C508;
  let C505;
  let C504;
  const _displayDialog = dart.privateName(list_tabs, "_displayDialog");
  let C509;
  let C512;
  let C513;
  let C511;
  let C510;
  let C516;
  let C517;
  let C515;
  let C514;
  let C520;
  let C519;
  let C518;
  let C523;
  let C524;
  let C522;
  let C521;
  let C527;
  let C526;
  let C525;
  let C530;
  let C531;
  let C529;
  let C528;
  let C534;
  let C533;
  let C532;
  let C537;
  let C536;
  let C535;
  let C540;
  let C541;
  let C539;
  let C538;
  let C544;
  let C543;
  let C542;
  let C547;
  let C548;
  let C546;
  let C545;
  let C551;
  let C550;
  let C549;
  let C554;
  let C553;
  let C552;
  let C557;
  let C556;
  let C555;
  let C560;
  let C559;
  let C558;
  let C563;
  let C562;
  let C561;
  let C566;
  let C565;
  let C564;
  let C569;
  let C570;
  let C571;
  let C568;
  let C567;
  let C574;
  let C575;
  let C573;
  let C572;
  let C578;
  let C579;
  let C577;
  let C576;
  let C582;
  let C583;
  let C581;
  let C580;
  let C586;
  let C587;
  let C585;
  let C584;
  const _onTotalRequested = dart.privateName(list_tabs, "_onTotalRequested");
  let C590;
  let C591;
  let C589;
  let C588;
  let C594;
  let C593;
  let C592;
  let C597;
  let C598;
  let C599;
  let C596;
  let C595;
  let C602;
  let C603;
  let C601;
  let C600;
  let C606;
  let C607;
  let C608;
  let C605;
  let C604;
  let C611;
  let C612;
  let C613;
  let C610;
  let C609;
  let C616;
  let C615;
  let C614;
  const _onAddInvoice = dart.privateName(list_tabs, "_onAddInvoice");
  let C619;
  let C620;
  let C621;
  let C622;
  let C618;
  let C617;
  let C625;
  let C626;
  let C627;
  let C624;
  let C623;
  let C630;
  let C629;
  let C628;
  let C633;
  let C634;
  let C632;
  let C631;
  let C635;
  let C638;
  let C637;
  let C636;
  list_tabs._InvoiceListState = class _InvoiceListState extends framework.State$(list_tabs.InvoiceList) {
    initState() {
      super.initState();
      this[_getAccount$]();
    }
    [_getAccount$]() {
      return async.async(dart.dynamic, (function* _getAccount() {
        this.account = (yield prefs.Prefs.getAccount());
      }).bind(this));
    }
    [_checkOffers](invoice) {
      core.print("checkOffers  😎 😎  😎 😎  😎 😎 " + dart.str(invoice.invoiceNumber));
      navigator.Navigator.pop(core.Object, this.widget.context);
    }
    [_displayDialog](invoice) {
      return async.async(dart.void, (function* _displayDialog() {
        if (invoice.customer.identifier == this.widget.account.identifier) {
          dialog.showDialog(dart.dynamic, {context: this.widget.context, builder: dart.fn(context => new dialog.AlertDialog.new({title: new text.Text.new("My Invoice Detail", {$creationLocationd_0dea112b090073317d4: C460 || CT.C460}), content: new list_tabs.InvoiceDetail.new(invoice, {$creationLocationd_0dea112b090073317d4: C463 || CT.C463}), actions: JSArrayOfWidget().of([new flat_button.FlatButton.new({onPressed: dart.fn(() => {
                    this[_checkOffers](invoice);
                  }, VoidToNull()), child: new text.Text.new("Check Offers", {style: functions.Styles.blueBoldSmall, $creationLocationd_0dea112b090073317d4: C466 || CT.C466}), $creationLocationd_0dea112b090073317d4: C470 || CT.C470})]), $creationLocationd_0dea112b090073317d4: C474 || CT.C474}), BuildContextToAlertDialog())});
        } else {
          dialog.showDialog(dart.dynamic, {context: this.widget.context, builder: dart.fn(context => new dialog.AlertDialog.new({title: new text.Text.new("Invoice Actions", {$creationLocationd_0dea112b090073317d4: C479 || CT.C479}), content: new container.Container.new({height: 200.0, child: new list_tabs.InvoiceDetail.new(invoice, {$creationLocationd_0dea112b090073317d4: C482 || CT.C482}), $creationLocationd_0dea112b090073317d4: C485 || CT.C485}), actions: JSArrayOfWidget().of([new flat_button.FlatButton.new({onPressed: dart.fn(() => {
                    this[_sendMessage](invoice);
                  }, VoidToNull()), child: new text.Text.new("Send Message", {$creationLocationd_0dea112b090073317d4: C489 || CT.C489}), $creationLocationd_0dea112b090073317d4: C492 || CT.C492}), new flat_button.FlatButton.new({onPressed: dart.fn(() => {
                    this[_createOffer](invoice);
                  }, VoidToNull()), child: new text.Text.new("Create Offer", {style: functions.Styles.blueBoldSmall, $creationLocationd_0dea112b090073317d4: C496 || CT.C496}), $creationLocationd_0dea112b090073317d4: C500 || CT.C500})]), $creationLocationd_0dea112b090073317d4: C504 || CT.C504}), BuildContextToAlertDialog())});
        }
      }).bind(this));
    }
    build(context) {
      return new (StreamBuilderOfInvoice()).new({stream: StreamOfInvoice()._check(bloc.bfnBloc.invoiceStream), builder: dart.fn((context, snapshot) => {
          if (dart.test(snapshot.hasData)) {
            let invoice = snapshot.data;
            if (invoice.supplier.identifier == this.account.identifier) {
              this.widget.invoices[$insert](0, invoice);
              core.print("_InvoiceListState StreamBuilder:  😎 😎  😎 😎  😎 😎 invoice arrived: " + dart.str(invoice.invoiceNumber));
            }
          }
          return new basic.Stack.new({children: JSArrayOfWidget().of([new scroll_view.ListView.builder({itemCount: this.widget.invoices[$length], itemBuilder: dart.fn((context, index) => {
                  let color = colors.Colors.pink._get(700);
                  let invoice = this.widget.invoices[$elementAt](index);
                  if (bloc.bfnBloc.account.identifier == invoice.customer.identifier) {
                    color = colors.Colors.blue._get(700);
                  }
                  return new basic.Padding.new({padding: C509 || CT.C509, child: new gesture_detector.GestureDetector.new({onTap: dart.fn(() => {
                        if (bloc.bfnBloc.account.host[$contains]("Regulator")) {
                        } else {
                          this[_displayDialog](this.widget.invoices[$elementAt](index));
                        }
                      }, VoidToNull()), child: new card.Card.new({elevation: 4.0, child: new list_tile.ListTile.new({leading: new icon.Icon.new(icons.Icons.account_balance, {color: colors.Colors.black, $creationLocationd_0dea112b090073317d4: C510 || CT.C510}), title: new text.Text.new(this.getCurrency(invoice.totalAmount, context), {style: new text_style.TextStyle.new({color: color, fontWeight: ui.FontWeight.w900, fontSize: 20.0}), $creationLocationd_0dea112b090073317d4: C514 || CT.C514}), subtitle: new basic.Column.new({children: JSArrayOfWidget().of([new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C518 || CT.C518}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("From:", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C521 || CT.C521}), new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C525 || CT.C525}), new text.Text.new(invoice.customer.name, {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C528 || CT.C528})]), $creationLocationd_0dea112b090073317d4: C532 || CT.C532}), new basic.SizedBox.new({height: 2.0, $creationLocationd_0dea112b090073317d4: C535 || CT.C535}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new("Issued To:", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C538 || CT.C538}), new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C542 || CT.C542}), new text.Text.new(invoice.supplier.name, {style: functions.Styles.blackBoldSmall, $creationLocationd_0dea112b090073317d4: C545 || CT.C545})]), $creationLocationd_0dea112b090073317d4: C549 || CT.C549}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C552 || CT.C552}), new basic.Row.new({children: JSArrayOfWidget().of([new text.Text.new(functions.getFormattedDateLongWithTime(invoice.dateRegistered, context), {$creationLocationd_0dea112b090073317d4: C555 || CT.C555})]), $creationLocationd_0dea112b090073317d4: C558 || CT.C558}), new basic.SizedBox.new({height: 20.0, $creationLocationd_0dea112b090073317d4: C561 || CT.C561})]), $creationLocationd_0dea112b090073317d4: C564 || CT.C564}), $creationLocationd_0dea112b090073317d4: C567 || CT.C567}), $creationLocationd_0dea112b090073317d4: C572 || CT.C572}), $creationLocationd_0dea112b090073317d4: C576 || CT.C576}), $creationLocationd_0dea112b090073317d4: C580 || CT.C580});
                }, BuildContextAndintToPadding()), $creationLocationd_0dea112b090073317d4: C584 || CT.C584}), new basic.Positioned.new({top: 20.0, right: 0.0, child: new container.Container.new({height: 60.0, width: 80.0, child: new gesture_detector.GestureDetector.new({onTap: dart.bind(this, _onTotalRequested), child: new card.Card.new({elevation: 20.0, color: colors.Colors.teal._get(200), child: new basic.Center.new({child: new text.Text.new(dart.str(this.widget.invoices[$length]), {style: functions.Styles.whiteBoldMedium, $creationLocationd_0dea112b090073317d4: C588 || CT.C588}), $creationLocationd_0dea112b090073317d4: C592 || CT.C592}), $creationLocationd_0dea112b090073317d4: C595 || CT.C595}), $creationLocationd_0dea112b090073317d4: C600 || CT.C600}), $creationLocationd_0dea112b090073317d4: C604 || CT.C604}), $creationLocationd_0dea112b090073317d4: C609 || CT.C609}), new basic.Positioned.new({bottom: 12.0, right: 12.0, child: new floating_action_button.FloatingActionButton.new({backgroundColor: colors.Colors.pink._get(700), elevation: 16.0, child: new icon.Icon.new(icons.Icons.account_balance, {$creationLocationd_0dea112b090073317d4: C614 || CT.C614}), onPressed: dart.bind(this, _onAddInvoice), $creationLocationd_0dea112b090073317d4: C617 || CT.C617}), $creationLocationd_0dea112b090073317d4: C623 || CT.C623})]), $creationLocationd_0dea112b090073317d4: C628 || CT.C628});
        }, BuildContextAndAsyncSnapshotOfInvoiceToStack()), $creationLocationd_0dea112b090073317d4: C631 || CT.C631});
    }
    getCurrency(amt, context) {
      return functions.getFormattedAmount(dart.toString(amt), context);
    }
    [_onAddInvoice]() {
      return async.async(dart.void, (function* _onAddInvoice() {
        core.print("onAddInvoice 🍊 🍊 🍊 🍊 🍊 🍊 🍊 ");
        let res = (yield navigator.Navigator.push(dart.dynamic, this.widget.context, new slide_right.SlideRightRoute.new({widget: new create_invoice.CreateInvoice.new({$creationLocationd_0dea112b090073317d4: C635 || CT.C635})})));
        if (invoice.Invoice.is(res)) {
          core.print("🧩 🧩 🧩 🧩 🧩 Yebo!! - invoice created and returned: 🧩 🧩 🧩 🧩 🧩 " + dart.str(res.toJson()) + " 🧩 🧩 🧩 🧩 🧩 ");
          this.widget.invoiceListener.onInvoice(res);
        }
      }).bind(this));
    }
    [_onTotalRequested]() {
      core.print("_onTotalRequested  😎 😎");
    }
    [_sendMessage](invoice) {
      core.print(" 🌺  🌺  🌺 _sendMessage ...............");
      navigator.Navigator.pop(core.Object, this.widget.context);
    }
    [_createOffer](invoice) {
      core.print(" 🌺  🌺  🌺 _createOffer ...............");
      navigator.Navigator.pop(core.Object, this.widget.context);
      navigator.Navigator.push(dart.dynamic, this.widget.context, new slide_right.SlideRightRoute.new({widget: new create_offer.CreateOffer.new(invoice, {$creationLocationd_0dea112b090073317d4: C636 || CT.C636})}));
    }
  };
  (list_tabs._InvoiceListState.new = function() {
    this.account = null;
    list_tabs._InvoiceListState.__proto__.new.call(this);
    ;
  }).prototype = list_tabs._InvoiceListState.prototype;
  dart.addTypeTests(list_tabs._InvoiceListState);
  dart.setMethodSignature(list_tabs._InvoiceListState, () => ({
    __proto__: dart.getMethods(list_tabs._InvoiceListState.__proto__),
    [_getAccount$]: dart.fnType(dart.dynamic, []),
    [_checkOffers]: dart.fnType(dart.dynamic, [invoice.Invoice]),
    [_displayDialog]: dart.fnType(dart.void, [invoice.Invoice]),
    build: dart.fnType(framework.Widget, [framework.BuildContext]),
    getCurrency: dart.fnType(core.String, [core.double, framework.BuildContext]),
    [_onAddInvoice]: dart.fnType(dart.void, []),
    [_onTotalRequested]: dart.fnType(dart.void, []),
    [_sendMessage]: dart.fnType(dart.void, [invoice.Invoice]),
    [_createOffer]: dart.fnType(dart.void, [invoice.Invoice])
  }));
  dart.setLibraryUri(list_tabs._InvoiceListState, "package:bfnmobile/ui/list_tabs.dart");
  dart.setFieldSignature(list_tabs._InvoiceListState, () => ({
    __proto__: dart.getFields(list_tabs._InvoiceListState.__proto__),
    account: dart.fieldType(account.AccountInfo)
  }));
  let C641;
  let C642;
  let C640;
  let C639;
  let C645;
  let C644;
  let C643;
  let C648;
  let C647;
  let C646;
  let C651;
  let C650;
  let C649;
  let C654;
  let C653;
  let C652;
  let C657;
  let C658;
  let C656;
  let C655;
  let C661;
  let C660;
  let C659;
  let C664;
  let C665;
  let C663;
  let C662;
  let C668;
  let C667;
  let C666;
  let C671;
  let C670;
  let C669;
  let C674;
  let C675;
  let C673;
  let C672;
  let C678;
  let C677;
  let C676;
  let C681;
  let C682;
  let C680;
  let C679;
  let C685;
  let C684;
  let C683;
  let C688;
  let C687;
  let C686;
  let C691;
  let C690;
  let C689;
  let C694;
  let C693;
  let C692;
  let C697;
  let C696;
  let C695;
  let C700;
  let C699;
  let C698;
  let C703;
  let C702;
  let C701;
  const invoice$0 = dart.privateName(list_tabs, "InvoiceDetail.invoice");
  list_tabs.InvoiceDetail = class InvoiceDetail extends framework.StatelessWidget {
    get invoice() {
      return this[invoice$0];
    }
    set invoice(value) {
      super.invoice = value;
    }
    build(context) {
      return new container.Container.new({child: new basic.Column.new({children: JSArrayOfWidget().of([new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new("Customer:", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C639 || CT.C639}), new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C643 || CT.C643}), new text.Text.new(this.invoice.customer.name, {$creationLocationd_0dea112b090073317d4: C646 || CT.C646})]), $creationLocationd_0dea112b090073317d4: C649 || CT.C649}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C652 || CT.C652}), new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new("Supplier:", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C655 || CT.C655}), new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C659 || CT.C659}), new text.Text.new(this.invoice.supplier.name, {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C662 || CT.C662})]), $creationLocationd_0dea112b090073317d4: C666 || CT.C666}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C669 || CT.C669}), new basic.Column.new({children: JSArrayOfWidget().of([new text.Text.new("Total Amount:", {style: functions.Styles.greyLabelSmall, $creationLocationd_0dea112b090073317d4: C672 || CT.C672}), new basic.SizedBox.new({width: 8.0, $creationLocationd_0dea112b090073317d4: C676 || CT.C676}), new text.Text.new(functions.getFormattedAmount(dart.str(this.invoice.totalAmount), context), {style: functions.Styles.blackBoldMedium, $creationLocationd_0dea112b090073317d4: C679 || CT.C679})]), $creationLocationd_0dea112b090073317d4: C683 || CT.C683}), new basic.SizedBox.new({height: 8.0, $creationLocationd_0dea112b090073317d4: C686 || CT.C686}), new basic.Center.new({child: new text.Text.new(functions.getFormattedDateLongWithTime(this.invoice.dateRegistered, context), {$creationLocationd_0dea112b090073317d4: C689 || CT.C689}), $creationLocationd_0dea112b090073317d4: C692 || CT.C692}), new basic.SizedBox.new({height: 16.0, $creationLocationd_0dea112b090073317d4: C695 || CT.C695})]), $creationLocationd_0dea112b090073317d4: C698 || CT.C698}), $creationLocationd_0dea112b090073317d4: C701 || CT.C701});
    }
  };
  (list_tabs.InvoiceDetail.new = function(invoice, opts) {
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[invoice$0] = invoice;
    list_tabs.InvoiceDetail.__proto__.new.call(this, {$creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = list_tabs.InvoiceDetail.prototype;
  dart.addTypeTests(list_tabs.InvoiceDetail);
  dart.setMethodSignature(list_tabs.InvoiceDetail, () => ({
    __proto__: dart.getMethods(list_tabs.InvoiceDetail.__proto__),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setLibraryUri(list_tabs.InvoiceDetail, "package:bfnmobile/ui/list_tabs.dart");
  dart.setFieldSignature(list_tabs.InvoiceDetail, () => ({
    __proto__: dart.getFields(list_tabs.InvoiceDetail.__proto__),
    invoice: dart.finalFieldType(invoice.Invoice)
  }));
  dart.trackLibraries("packages/bfnmobile/ui/create_offer", {
    "package:bfnmobile/ui/create_offer.dart": create_offer,
    "package:bfnmobile/ui/list_tabs.dart": list_tabs
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["create_offer.dart","list_tabs.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAiBgB;;;;;;;AAKqB;IAAmB;;2CAHrC;;;AAAjB;;EAAyB;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAcN,MAAX;AACO,MAAb;IACF;;AAEW;AACyB,QAAlC,gBAAU,MAAY;AACP,QAAf,cAAS;;MACX;;UAI0B;AACxB,YAAO,iCACA,oBACG,+BACC,kBAAK,gFACJ,qDACc,uBAAW,eACxB,gCACa,sBAChB,sCACW,yBACS,wCACA,6CACP,4DAEb,gCACU,6DAEV,mEACY,AAAQ,sCACH,mCACJ,SAAC,SAAS;AACjB,kCAAI,AAAS,QAAD;AAE0F,sBADpG,AAAU,iBACN,AAA+F,sEAAhC,AAAS,QAAD,SAAM;AAC1D,sBAAvB,eAAU,AAAS,QAAD;;AAEpB,0BAAO,mBACK,SAAR,uBACY;6HAGtB,gCACU,4PAMM,AAAK,yBAAC,WACxB;IAEV;;AAGE,YAAO,yCACa,sBAChB,sDAES,0BACW,AAAI,wBAAC,aAAa,gCAAc,AAAO,iMAE3D,sDAES,8BACM,YACJ,gCACa,sBAChB,gCACU,+DAEV,qDACa,kCACJ,kBACL,2BACc,+IAGlB,AAAe,uBAAG,OACZ,uFACA,kBACE,AAAe,kCACD,2FAEtB,gCACU,8DAEV,AAAS,iBAAG,OACN,uFACA,kBACE,6BAAmB,qBAAgB,uBACrB,0FAEtB,gCACU,8DAEV,AAAe,uBAAG,OACZ,uFACA,sDAGS,0CACO,iCACE,gDAEI,yDAA2B,oBACjC,oDACG,wBACD,kBACQ,yDACX,6IAGrB,AAAe,uBAAG,OACZ,uFACA,2CACgB,iCACH,0BACA,4BACJ,sDAEE,kBACL,wBACc,4MAI1B,gCACU;IAQxB;;AAEiB;AACyC,QAAxD,WAAM,AAAiD,iDAAT;AAC9C,YAAI,AAAS,iBAAG,QAAQ,AAAS;AAIN,UAHb,kDACK,qBACJ,sCACI;AACjB;;AAEK,qBAAgB,kBAAM;AAC7B,YAAI,AAAO,MAAD,KAAI;AAIa,UAHb,kDACK,qBACJ,gDACI;AACjB;;AAEE,oBAAO,MAAY;AACnB,2BAAe,8CACP,MAAM,YACN,+BACA,AAAO,AAAQ,wCACf,AAAO,AAAQ,qCAClB,AAAO,AAAQ,8CACN,AAAO,AAAQ,4CACpB,AAAO,AAAQ;AAMM,QAJtB,kEACK,qBACJ,mCACS,2CACM;AAC5B;AAC8D,UAA5D,gBAAe,MAAU,8BAAsB,YAAY;AAC1B,UAAjC,0BAAqB,YAAY;AAOd,UANP,uDACK,qBACJ,iCACS,sCACM,iCACX,gBACH;;cACP;AAE8D,UADzD,kDACK,qBAAe,kCAAkC;;MAEtE;;;AAMuB;AACjB,sBAAS,MAAgB,uCACzB,cACA,6CACU;AAEd,YAAW,uBAAP,MAAM;AAGN,UAFF,cAAS;AACgB,YAAvB,sBAAiB,MAAM;;;MAG7B;;yBAE+B;AACb,MAAhB,gBAAW,KAAK;AAEZ,gBAAa,kBAAM;AACnB,cAA+B,aAA3B,AAAO,AAAQ,oCAAmB,aAAJ,GAAG,IAAG;AACkB,MAA9D,WAAM,AAAuD,8BAAnC,iBAAQ,oCAAyB,CAAC;AAG1D,MAFF,cAAS;AACsB,QAA7B,sBAAiB,AAAE,CAAD;;IAEtB;oBAGoB;AACwB,MAAhC,oDAAI,cAAS;IACzB;;;IA/NI,aAAO;IACL,iBAAW;IACL;IAYL;IAAU;IAkLL;IACC;IACN;;;EA8BT;;;;;;;;;;;;;;;;;;;;;;;;;;MAnOsB,wBAAW;YAAG;;;;;;ACVE;IAAoB;;;;;;EAC1D;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAYqB,MAAX;AAC+C,MAArD,qBAAgB,8CAAsB,UAAU;AACzB,MAAvB;IACF;;AAIyB,MAAvB,AAAc;AACC,MAAT;IACR;;AAEqB;AACmB,QAAtC,gBAAU,MAAM,AAAQ;AAExB,YAAI,AAAQ,AAAK,6BAAS;AACgC,UAAxD,eAAS,MAAM,AAAQ,yCAA2B;AACZ,UAAtC,iBAAW,MAAM,AAAQ;;AAGkC,UAD3D,eAAS,MAAM,AAAQ,0CACR,AAAQ,AAAQ,2CAAsB;AAEe,UADpE,iBACI,MAAM,AAAQ,qCAAuB,AAAQ,AAAQ;;AAEF,QAAzD,AAAO,mBAAK,SAAC,GAAG,MAAM,AAAE,AAAU,CAAX,uBAAqB,AAAE,CAAD;AACwB,QAArE,AAAS,qBAAK,SAAC,GAAG,MAAM,AAAE,AAAe,CAAhB,4BAA0B,AAAE,CAAD;AACrC,QAAf,cAAS;;MACX;;UAK0B;AACxB,YAAO,8CACU,AAAU,8DACf,AAAU,+CACT,SAAC,SAAS;AAE4D,UAD7E,WACI,AAAwE,2DAAnB,AAAS,QAAD,SAAM;AACvE,gBAAO,sDACuB,cACrB,AAAS,AAAK,QAAN,SAAS,OACR,2CAAqB,MACrB,2CAAqB,AAAS,QAAD,eACvC,qDACI,UACD,mCACG,iCACW,sBACf,sCACQ,kBAAW,sGACN,oGAGN,sCACD,kBAAW,+FACN;AACa,sBAAZ,qCAAI,OAAO;yGAGjB,6CACG,gCACa,sBAChB,AAAQ,gBAAG,OACL,yFACA,sCACW,yBACS,wCACA,6CACP,gEAEnB,gCACU,gEAEV,mEACY,AAAQ,sCACH,mCACJ,SAAC,SAAS;AACjB,0CAAI,AAAS,QAAD;AAE6E,8BADvF,AAAU,iBACN,AAAkF,yDAAhC,AAAS,QAAD,SAAM;AAC7C,8BAAvB,eAAU,AAAS,QAAD;;AAEpB,kCAAO,mBACK,SAAR,uBACY;uIAGtB,gCACU,iEAEV,2BACQ,sBACJ,wBACQ,kBAAW,oFACX,qEAER,wBACQ,kBAAW,oFACX,uEAER,wBACQ,kBAAW,uFACX,+MAMI,uBAAW,0EAC5B,kBAAK,6JAEU,AAAK,yBAAC,YACxB,mCACM,sBACR,4BAAU,yEACV,wCACW,uBACA,OAAO,YACN,gCACO,iEAEnB,0BACS;;IAQ3B;cAGuB;AAGnB,MAFF,cAAS;AACc,QAArB,AAAS,oBAAI,OAAO;;IAExB;;;IAhJmB,cAAS;IACd,gBAAW;IACb;IACE;IAgCP;;;EA8GT;;;;;;;;;;;;;;;;;;;;IAG2B;;;;;;;AAKQ;IAAiB;;sCAHnC;;;AAAf;;EAAsB;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAUH,MAAX;AACO,MAAb;IACF;;AAEW;AACyB,QAAlC,gBAAU,MAAY;MACxB;;UAG0B;AACpB,cAAI;AAIN,MAHF,AAAO,AAAO,6BAAQ,QAAC;AAClB,QAAH,IAAA,AAAC,CAAA;;AAGH,YAAO,gFACK,AAAQ,oCACP,SAAC,SAAS;AACjB,wBAAI,AAAS,QAAD;AACN,wBAAQ,AAAS,QAAD;AACpB,gBAAI,AAAM,AAAS,AAAW,KAArB,wBAAwB,AAAQ;AACT,cAA9B,AAAO,AAAO,4BAAO,GAAG,KAAK;;;AAGjC,gBAAO,gCACa,sBACP,6CACM,AAAO,AAAO,0CACZ,SAAC,SAAS;AACjB,8BAAe,AAAI,wBAAC;AAClB,kCAAmB;AACrB,8BAAQ,AAAO,AAAO,+BAAU,KAAK;AACzC,sBAAI,AAAQ,AAAQ,AAAW,mCAC3B,AAAM,AAAS,KAAV;AACa,oBAApB,QAAe;;AAEjB,sBAAI,AAAQ,AAAQ,AAAW,mCAC3B,AAAM,AAAS,KAAV;AACiB,oBAAxB,QAAe,AAAI,wBAAC;;AAEtB,sBAAI,AAAQ,AAAQ,AAAW,mCAC3B,AAAM,AAAS,KAAV;AACiB,oBAAxB,QAAe,AAAI,wBAAC;AACO,oBAA3B,YAAmB,AAAI,wBAAC;;AAE1B,wBAAO,yDAGE,iDACE;AACL,4BAAI,AAAQ,AAAQ,AAAK,qCAAS;;AAEF,0BAA9B,qBAAe,KAAK,EAAE,OAAO;;+CAG1B,8BACM,YACJ,SAAS,SACT,qCACI,kBACD,0BACC,KAAK,oEAEP,kBACL,iBAAY,AAAM,KAAD,cAAc,OAAO,WAC/B,qCACI,KAAK,cACW,8BACb,6EAEN,gCACU,sBAChB,gCACU,gEAEV,6BACoB,sBAChB,kBACE,oBACc,4FAEhB,+BACS,gEAET,kBAAK,AAAM,AAAS,KAAV,yIAGd,6BACoB,sBAChB,kBACE,oBACc,4FAEhB,+BACS,gEAET,kBAAK,AAAM,AAAS,KAAV,yIAGd,6BACoB,sBAChB,kBACE,iBACc,4FAEhB,+BACS,gEAET,kBACE,AAAM,AAAS,KAAV,wBACS,yJAIpB,6BACoB,sBAChB,kBACE,0BACc,4FAEhB,+BACS,gEAET,kBAAK,iBACD,AAAM,KAAD,iBAAiB,OAAO,4HAGrC,6BACoB,sBAChB,kBACE,oBACc,4FAEhB,+BACS,gEAET,kBAC6C,SAAxC,iBAAY,AAAM,KAAD,WAAW,OAAO,KAAE,cAC1B,wJAIpB,gCACU,iEAEV,6BACoB,sBAChB,kBACE,mBACc,4FAEhB,+BACS,gEAET,kBACE,wCACI,AAAM,KAAD,YAAY,OAAO,WACd,yJAIpB,gCACU;8GAS5B,+BACO,aACE,YACA,qCACG,aACD,aACA,8BACM,aACG,6BACP,6BACE,kBACoB,SAAtB,AAAO,AAAO,sCACH;;IASpC;qBAE4B,OAAoB;AAAlC;AAEZ,YAAI,AAAQ,AAAQ,AAAW,mCAAG,AAAM,AAAS,KAAV;;AAGvC,YAAI,AAAQ,AAAQ,AAAW,mCAAG,AAAM,AAAS,KAAV;;AAGvC,YAAI,AAAQ,AAAQ,AAAW,mCAAG,AAAM,AAAS,KAAV;AAM/B,UAJI,uCACN,OAAO,EACP,6CACU,2BAAS,KAAK;;MAGhC;;gBAE0B,KAAkB;AAC1C,YAAO,8BAAuB,cAAJ,GAAG,GAAa,OAAO;IACnD;;;IAzNY;;;EA0Nd;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;UAI4B;AACxB,YAAO,2BACE,6BACE,gCACa,sBAChB,gCACU,iEAEV,wDAES,kBACH,wSAEN,gCACU,iEAEV,2CACgB,+BACH,YACJ,wDAEE,kBACL,0BACc,wKAGP,yFAEb,gCACU,iEAEV,wDAES,kBACH,wSAEN,gCACU,iEAEV,2CACgB,iCACH,YACJ,wDAEE,kBACL,wBACc,wKAGP;IAMvB;;IAE8B;;IAEK;;;;;;EACrC;;;;;;;;;;;;EAIA;;;;;;;;IAGsB;;;;;;IACD;;;;;;IACD;;;;;;IACI;;;;;;;AAMa;IAAmB;;;QAH5C;QAAe;QAAc;QAAc;;IAA3C;IAAe;IAAc;IAAc;AADrD;;EACsE;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAUnD,MAAX;AACO,MAAb;IACF;;AAEW;AACyB,QAAlC,gBAAU,MAAY;MACxB;;mBAEqB;AAC+C,MAAlE,WAAM,AAA2D,yCAAvB,AAAQ,OAAD;AACpB,MAAnB,qCAAI,AAAO;IACvB;qBAE4B;AAAT;AAGjB,YAAI,AAAQ,AAAS,AAAW,OAArB,wBAAwB,AAAO,AAAQ;AAmB1C,UAlBN,0CACa,AAAO,8BACP,QAAC,WACD,mCACE,kBAAK,0FACC,gCAAc,OAAO,uEACjB,sBACf,2CACa;AACY,oBAArB,mBAAa,OAAO;2CAEf,kBACL,wBACc;;AA+BtB,UAxBN,0CACa,AAAO,8BACP,QAAC,WACD,mCACE,kBAAK,wFAER,qCAAkB,cAAgB,gCAAc,OAAO,kIAC1C,sBACf,2CACe;AACY,oBAArB,mBAAa,OAAO;2CAEf,kBAAK,uIAChB,2CACa;AACY,oBAArB,mBAAa,OAAO;2CAEf,kBACL,wBACc;;MAOhC;;UAG0B;AACxB,YAAO,sEACK,AAAQ,sCACP,SAAC,SAAS;AACjB,wBAAI,AAAS,QAAD;AACN,0BAAU,AAAS,QAAD;AACtB,gBAAI,AAAQ,AAAS,AAAW,OAArB,wBAAwB,AAAQ;AACP,cAAlC,AAAO,AAAS,8BAAO,GAAG,OAAO;AAEqE,cADtG,WACI,AAAiG,+EAAvB,AAAQ,OAAD;;;AAGzF,gBAAO,gCACa,sBACP,6CACM,AAAO,AAAS,4CACd,SAAC,SAAS;AACjB,8BAAe,AAAI,wBAAC;AACpB,gCAAU,AAAO,AAAS,iCAAU,KAAK;AAC7C,sBAAI,AAAQ,AAAQ,AAAW,mCAC3B,AAAQ,AAAS,OAAV;AACe,oBAAxB,QAAe,AAAI,wBAAC;;AAEtB,wBAAO,yDAGE,iDACE;AACL,4BAAI,AAAQ,AAAQ,AAAK,qCAAS;;AAEgB,0BAAhD,qBAAe,AAAO,AAAS,iCAAU,KAAK;;+CAG3C,8BACM,YACJ,qCACI,kBACD,qCACQ,uFAET,kBACL,iBAAY,AAAQ,OAAD,cAAc,OAAO,WACjC,qCACI,KAAK,cACW,8BACb,6EAEN,gCACU,sBAChB,gCACU,gEAEV,6BACoB,sBAChB,kBACE,iBACc,4FAEhB,+BACS,gEAET,kBACE,AAAQ,AAAS,OAAV,wBACO,yJAIpB,gCACU,gEAEV,6BACoB,sBAChB,kBACE,sBACc,4FAEhB,+BACS,gEAET,kBACE,AAAQ,AAAS,OAAV,wBACO,yJAIpB,gCACU,gEAEV,6BACoB,sBAChB,kBAAK,uCACD,AAAQ,OAAD,iBAAiB,OAAO,4HAGvC,gCACU;8GAS5B,+BACO,aACE,YACA,qCACG,aACD,aACA,2DACE,iCACA,8BACM,aACG,AAAI,wBAAC,aACZ,6BACE,kBACsB,SAAxB,AAAO,AAAS,wCACL,oYAO1B,kCACU,aACD,aACA,sEACmB,AAAI,wBAAC,iBAClB,aACJ,kBAAW,8GACP;;IAM3B;gBAE0B,KAAkB;AAC1C,YAAO,8BAAuB,cAAJ,GAAG,GAAa,OAAO;IACnD;;AAEkB;AAC2B,QAA3C,WAAM;AACF,mBAAM,MAAgB,uCACtB,AAAO,qBACP,6CACU;AAEd,YAAQ,mBAAJ,GAAG;AAEsG,UAD3G,WACI,AAAsG,yEAA9B,AAAI,GAAD,aAAU;AACpD,UAArC,AAAO,AAAgB,sCAAU,GAAG;;MAExC;;;AAGmC,MAAjC,WAAM;IACR;mBAE0B;AACyB,MAAjD,WAAM;AACuB,MAAnB,qCAAI,AAAO;IACvB;mBAE0B;AACyB,MAAjD,WAAM;AACuB,MAAnB,qCAAI,AAAO;AAKf,MAJI,uCACN,AAAO,qBACP,6CACU,iCAAY,OAAO;IAEnC;;;IApPY;;;EAqPd;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAGgB;;;;;;UAKY;AACxB,YAAO,qCACE,gCACa,sBAChB,gCACoB,sBAChB,kBACE,qBACc,4FAEhB,+BACS,gEAET,kBAAK,AAAQ,AAAS,qJAG1B,gCACU,gEAEV,gCACoB,sBAChB,kBAAK,qBAA2B,4FAChC,+BACS,gEAET,kBAAK,AAAQ,AAAS,oCAAoB,0JAG9C,gCACU,gEAEV,gCACoB,sBAChB,kBAAK,yBAA+B,4FACpC,+BACS,gEAET,kBACE,6BAA2C,SAArB,AAAQ,2BAAe,OAAO,WACtC,0JAIpB,gCACU,gEAEV,6BACS,kBACH,uCAA6B,AAAQ,6BAAgB,OAAO,0HAElE,gCACU;IAKlB;;0CA3DmB;;;AAAnB;;EAA2B","file":"create_offer.ddc.js"}');
  // Exports:
  return {
    ui__create_offer: create_offer,
    ui__list_tabs: list_tabs
  };
});

//# sourceMappingURL=create_offer.ddc.js.map
