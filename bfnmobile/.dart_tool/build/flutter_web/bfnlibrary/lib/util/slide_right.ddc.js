define(['dart_sdk', 'packages/flutter/src/widgets/actions', 'packages/flutter/src/animation/animation'], function(dart_sdk, packages__flutter__src__widgets__actions, packages__flutter__src__animation__animation) {
  'use strict';
  const core = dart_sdk.core;
  const ui = dart_sdk.ui;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter__src__widgets__actions.src__widgets__framework;
  const transitions = packages__flutter__src__widgets__actions.src__widgets__transitions;
  const widget_inspector = packages__flutter__src__widgets__actions.src__widgets__widget_inspector;
  const pages = packages__flutter__src__widgets__actions.src__widgets__pages;
  const animation = packages__flutter__src__animation__animation.src__animation__animation;
  const tween = packages__flutter__src__animation__animation.src__animation__tween;
  const slide_right = Object.create(dart.library);
  let AnimationOfdouble = () => (AnimationOfdouble = dart.constFn(animation.Animation$(core.double)))();
  let BuildContextAndAnimationOfdoubleAndAnimationOfdoubleToWidget = () => (BuildContextAndAnimationOfdoubleAndAnimationOfdoubleToWidget = dart.constFn(dart.fnType(framework.Widget, [framework.BuildContext, AnimationOfdouble(), AnimationOfdouble()])))();
  let TweenOfOffset = () => (TweenOfOffset = dart.constFn(tween.Tween$(ui.Offset)))();
  let BuildContextAndAnimationOfdoubleAndAnimationOfdouble__ToSlideTransition = () => (BuildContextAndAnimationOfdoubleAndAnimationOfdouble__ToSlideTransition = dart.constFn(dart.fnType(transitions.SlideTransition, [framework.BuildContext, AnimationOfdouble(), AnimationOfdouble(), framework.Widget])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.const({
        __proto__: ui.Offset.prototype,
        [OffsetBase__dy]: 0,
        [OffsetBase__dx]: -1
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "position",
        [_Location_column]: 13,
        [_Location_line]: 16,
        [_Location_file]: null
      });
    },
    get C4() {
      return C4 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 13,
        [_Location_line]: 20,
        [_Location_file]: null
      });
    },
    get C2() {
      return C2 = dart.constList([C3 || CT.C3, C4 || CT.C4], widget_inspector._Location);
    },
    get C1() {
      return C1 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C2 || CT.C2,
        [_Location_name]: null,
        [_Location_column]: 22,
        [_Location_line]: 15,
        [_Location_file]: "org-dartlang-app:///packages/bfnlibrary/util/slide_right.dart"
      });
    }
  });
  const OffsetBase__dy = dart.privateName(ui, "OffsetBase._dy");
  const OffsetBase__dx = dart.privateName(ui, "OffsetBase._dx");
  let C0;
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C3;
  let C4;
  let C2;
  let C1;
  const widget$ = dart.privateName(slide_right, "SlideRightRoute.widget");
  slide_right.SlideRightRoute = class SlideRightRoute extends pages.PageRouteBuilder {
    get widget() {
      return this[widget$];
    }
    set widget(value) {
      super.widget = value;
    }
  };
  (slide_right.SlideRightRoute.new = function(opts) {
    let widget = opts && 'widget' in opts ? opts.widget : null;
    this[widget$] = widget;
    slide_right.SlideRightRoute.__proto__.new.call(this, {pageBuilder: dart.fn((context, animation, secondaryAnimation) => widget, BuildContextAndAnimationOfdoubleAndAnimationOfdoubleToWidget()), transitionsBuilder: dart.fn((context, animation, secondaryAnimation, child) => new transitions.SlideTransition.new({position: new (TweenOfOffset()).new({begin: C0 || CT.C0, end: ui.Offset.zero}).animate(animation), child: child, $creationLocationd_0dea112b090073317d4: C1 || CT.C1}), BuildContextAndAnimationOfdoubleAndAnimationOfdouble__ToSlideTransition())});
    ;
  }).prototype = slide_right.SlideRightRoute.prototype;
  dart.addTypeTests(slide_right.SlideRightRoute);
  dart.setLibraryUri(slide_right.SlideRightRoute, "package:bfnlibrary/util/slide_right.dart");
  dart.setFieldSignature(slide_right.SlideRightRoute, () => ({
    __proto__: dart.getFields(slide_right.SlideRightRoute.__proto__),
    widget: dart.finalFieldType(framework.Widget)
  }));
  dart.trackLibraries("packages/bfnlibrary/util/slide_right", {
    "package:bfnlibrary/util/slide_right.dart": slide_right
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["slide_right.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAIe;;;;;;;;QAES;;AAChB,uEAAmB,SAAc,SAA2B,WACtC,uBACb,MAAM,uFACQ,SAAc,SACf,WACA,oBACX,UACE,+CACK,AAGZ,oDADY,yBACJ,SAAS,UACZ,KAAK;;EAEd","file":"slide_right.ddc.js"}');
  // Exports:
  return {
    util__slide_right: slide_right
  };
});

//# sourceMappingURL=slide_right.ddc.js.map
