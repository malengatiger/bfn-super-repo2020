define(['dart_sdk', 'packages/collection/src/comparators', 'packages/firebase_core/firebase_core', 'packages/flutter/src/gestures/arena'], function(dart_sdk, packages__collection__src__comparators, packages__firebase_core__firebase_core, packages__flutter__src__gestures__arena) {
  'use strict';
  const core = dart_sdk.core;
  const math = dart_sdk.math;
  const ui = dart_sdk.ui;
  const typed_data = dart_sdk.typed_data;
  const async = dart_sdk.async;
  const _interceptors = dart_sdk._interceptors;
  const _js_helper = dart_sdk._js_helper;
  const collection = dart_sdk.collection;
  const convert = dart_sdk.convert;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const equality = packages__collection__src__comparators.src__equality;
  const firebase_app = packages__firebase_core__firebase_core.src__firebase_app;
  const message_codec = packages__flutter__src__gestures__arena.src__services__message_codec;
  const platform_channel = packages__flutter__src__gestures__arena.src__services__platform_channel;
  const message_codecs = packages__flutter__src__gestures__arena.src__services__message_codecs;
  const auto_id_generator = Object.create(dart.library);
  const cloud_firestore = Object.create(dart.library);
  const $_get = dartx._get;
  const $isEmpty = dartx.isEmpty;
  const $last = dartx.last;
  const $length = dartx.length;
  const $removeLast = dartx.removeLast;
  const $add = dartx.add;
  const $split = dartx.split;
  const $addAll = dartx.addAll;
  const $join = dartx.join;
  const $_set = dartx._set;
  const $remove = dartx.remove;
  const $where = dartx.where;
  const $containsKey = dartx.containsKey;
  const $firstWhere = dartx.firstWhere;
  const $contains = dartx.contains;
  const $floor = dartx.floor;
  const $compareTo = dartx.compareTo;
  let ListOfString = () => (ListOfString = dart.constFn(core.List$(core.String)))();
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
  let ListOfList = () => (ListOfList = dart.constFn(core.List$(core.List)))();
  let JSArrayOfList = () => (JSArrayOfList = dart.constFn(_interceptors.JSArray$(core.List)))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  let LinkedHashMapOfString$dynamic = () => (LinkedHashMapOfString$dynamic = dart.constFn(collection.LinkedHashMap$(core.String, dart.dynamic)))();
  let StreamControllerOfQuerySnapshot = () => (StreamControllerOfQuerySnapshot = dart.constFn(async.StreamController$(cloud_firestore.QuerySnapshot)))();
  let FutureOrOfint = () => (FutureOrOfint = dart.constFn(async.FutureOr$(core.int)))();
  let dynamicToFutureOrOfint = () => (dynamicToFutureOrOfint = dart.constFn(dart.fnType(FutureOrOfint(), [dart.dynamic])))();
  let intToNull = () => (intToNull = dart.constFn(dart.fnType(core.Null, [core.int])))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let FutureOfNull = () => (FutureOfNull = dart.constFn(async.Future$(core.Null)))();
  let intToFutureOfNull = () => (intToFutureOfNull = dart.constFn(dart.fnType(FutureOfNull(), [core.int])))();
  let DefaultEqualityOfNull = () => (DefaultEqualityOfNull = dart.constFn(equality.DefaultEquality$(core.Null)))();
  let ListTobool = () => (ListTobool = dart.constFn(dart.fnType(core.bool, [core.List])))();
  let dynamicAndStringAnddynamicTovoid = () => (dynamicAndStringAnddynamicTovoid = dart.constFn(dart.fnType(dart.void, [dart.dynamic, core.String, dart.dynamic])))();
  let VoidTobool = () => (VoidTobool = dart.constFn(dart.fnType(core.bool, [])))();
  let DocumentChangeTypeTobool = () => (DocumentChangeTypeTobool = dart.constFn(dart.fnType(core.bool, [cloud_firestore.DocumentChangeType])))();
  let IdentityMapOfString$bool = () => (IdentityMapOfString$bool = dart.constFn(_js_helper.IdentityMap$(core.String, core.bool)))();
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  let StreamControllerOfDocumentSnapshot = () => (StreamControllerOfDocumentSnapshot = dart.constFn(async.StreamController$(cloud_firestore.DocumentSnapshot)))();
  let MethodCallToFuture = () => (MethodCallToFuture = dart.constFn(dart.fnType(async.Future, [message_codec.MethodCall])))();
  let IdentityMapOfint$StreamControllerOfQuerySnapshot = () => (IdentityMapOfint$StreamControllerOfQuerySnapshot = dart.constFn(_js_helper.IdentityMap$(core.int, StreamControllerOfQuerySnapshot())))();
  let IdentityMapOfint$StreamControllerOfDocumentSnapshot = () => (IdentityMapOfint$StreamControllerOfDocumentSnapshot = dart.constFn(_js_helper.IdentityMap$(core.int, StreamControllerOfDocumentSnapshot())))();
  let TransactionToFuture = () => (TransactionToFuture = dart.constFn(dart.fnType(async.Future, [cloud_firestore.Transaction])))();
  let IdentityMapOfint$TransactionToFuture = () => (IdentityMapOfint$TransactionToFuture = dart.constFn(_js_helper.IdentityMap$(core.int, TransactionToFuture())))();
  let ListOfDocumentSnapshot = () => (ListOfDocumentSnapshot = dart.constFn(core.List$(cloud_firestore.DocumentSnapshot)))();
  let intToDocumentSnapshot = () => (intToDocumentSnapshot = dart.constFn(dart.fnType(cloud_firestore.DocumentSnapshot, [core.int])))();
  let ListOfDocumentChange = () => (ListOfDocumentChange = dart.constFn(core.List$(cloud_firestore.DocumentChange)))();
  let intToDocumentChange = () => (intToDocumentChange = dart.constFn(dart.fnType(cloud_firestore.DocumentChange, [core.int])))();
  let JSArrayOfFuture = () => (JSArrayOfFuture = dart.constFn(_interceptors.JSArray$(async.Future)))();
  let dynamicToNull = () => (dynamicToNull = dart.constFn(dart.fnType(core.Null, [dart.dynamic])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C1() {
      return C1 = dart.const({
        __proto__: equality.DefaultEquality.prototype
      });
    },
    get C0() {
      return C0 = dart.const({
        __proto__: equality.DeepCollectionEquality.prototype,
        [DeepCollectionEquality__unordered]: false,
        [DeepCollectionEquality__base]: C1 || CT.C1
      });
    },
    get C2() {
      return C2 = dart.const({
        __proto__: cloud_firestore.Source.prototype,
        [_name$]: "Source.serverAndCache",
        index: 0
      });
    },
    get C4() {
      return C4 = dart.const({
        __proto__: DefaultEqualityOfNull().prototype
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: equality.ListEquality.prototype,
        [ListEquality__elementEquality]: C4 || CT.C4
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: cloud_firestore.DocumentChangeType.prototype,
        [_name$]: "DocumentChangeType.added",
        index: 0
      });
    },
    get C6() {
      return C6 = dart.const({
        __proto__: cloud_firestore.DocumentChangeType.prototype,
        [_name$]: "DocumentChangeType.modified",
        index: 1
      });
    },
    get C7() {
      return C7 = dart.const({
        __proto__: cloud_firestore.DocumentChangeType.prototype,
        [_name$]: "DocumentChangeType.removed",
        index: 2
      });
    },
    get C8() {
      return C8 = dart.constList([C5 || CT.C5, C6 || CT.C6, C7 || CT.C7], cloud_firestore.DocumentChangeType);
    },
    get C9() {
      return C9 = dart.const({
        __proto__: cloud_firestore._FieldPathType.prototype,
        [_name$]: "_FieldPathType.documentId",
        index: 0
      });
    },
    get C10() {
      return C10 = dart.constList([C9 || CT.C9], cloud_firestore._FieldPathType);
    },
    get C11() {
      return C11 = dart.const({
        __proto__: cloud_firestore.FieldPath.prototype,
        [FieldPath_type]: C9 || CT.C9
      });
    },
    get C12() {
      return C12 = dart.const({
        __proto__: cloud_firestore.FieldValueType.prototype,
        [_name$]: "FieldValueType.arrayUnion",
        index: 0
      });
    },
    get C13() {
      return C13 = dart.const({
        __proto__: cloud_firestore.FieldValueType.prototype,
        [_name$]: "FieldValueType.arrayRemove",
        index: 1
      });
    },
    get C14() {
      return C14 = dart.const({
        __proto__: cloud_firestore.FieldValueType.prototype,
        [_name$]: "FieldValueType.delete",
        index: 2
      });
    },
    get C15() {
      return C15 = dart.const({
        __proto__: cloud_firestore.FieldValueType.prototype,
        [_name$]: "FieldValueType.serverTimestamp",
        index: 3
      });
    },
    get C16() {
      return C16 = dart.const({
        __proto__: cloud_firestore.FieldValueType.prototype,
        [_name$]: "FieldValueType.incrementDouble",
        index: 4
      });
    },
    get C17() {
      return C17 = dart.const({
        __proto__: cloud_firestore.FieldValueType.prototype,
        [_name$]: "FieldValueType.incrementInteger",
        index: 5
      });
    },
    get C18() {
      return C18 = dart.constList([C12 || CT.C12, C13 || CT.C13, C14 || CT.C14, C15 || CT.C15, C16 || CT.C16, C17 || CT.C17], cloud_firestore.FieldValueType);
    },
    get C19() {
      return C19 = dart.const({
        __proto__: core.Duration.prototype,
        [Duration__duration]: 5000000
      });
    },
    get C22() {
      return C22 = dart.const({
        __proto__: cloud_firestore.FirestoreMessageCodec.prototype
      });
    },
    get C21() {
      return C21 = dart.const({
        __proto__: message_codecs.StandardMethodCodec.prototype,
        [StandardMethodCodec_messageCodec]: C22 || CT.C22
      });
    },
    get C20() {
      return C20 = dart.const({
        __proto__: platform_channel.MethodChannel.prototype,
        [MethodChannel__binaryMessenger]: null,
        [MethodChannel_codec]: C21 || CT.C21,
        [MethodChannel_name]: "plugins.flutter.io/cloud_firestore"
      });
    },
    get C23() {
      return C23 = dart.constMap(cloud_firestore.FieldValueType, core.int, [C12 || CT.C12, 132, C13 || CT.C13, 133, C14 || CT.C14, 134, C15 || CT.C15, 135, C16 || CT.C16, 137, C17 || CT.C17, 138]);
    },
    get C24() {
      return C24 = dart.constMap(cloud_firestore._FieldPathType, core.int, [C9 || CT.C9, 139]);
    },
    get C25() {
      return C25 = dart.const({
        __proto__: cloud_firestore.Source.prototype,
        [_name$]: "Source.server",
        index: 1
      });
    },
    get C26() {
      return C26 = dart.const({
        __proto__: cloud_firestore.Source.prototype,
        [_name$]: "Source.cache",
        index: 2
      });
    },
    get C27() {
      return C27 = dart.constList([C2 || CT.C2, C25 || CT.C25, C26 || CT.C26], cloud_firestore.Source);
    }
  });
  auto_id_generator.AutoIdGenerator = class AutoIdGenerator extends core.Object {
    static autoId() {
      let stringBuffer = new core.StringBuffer.new();
      let maxRandom = auto_id_generator.AutoIdGenerator._AUTO_ID_ALPHABET.length;
      for (let i = 0; i < 20; i = i + 1) {
        stringBuffer.write(auto_id_generator.AutoIdGenerator._AUTO_ID_ALPHABET[$_get](auto_id_generator.AutoIdGenerator._random.nextInt(maxRandom)));
      }
      return stringBuffer.toString();
    }
  };
  (auto_id_generator.AutoIdGenerator.new = function() {
    ;
  }).prototype = auto_id_generator.AutoIdGenerator.prototype;
  dart.addTypeTests(auto_id_generator.AutoIdGenerator);
  dart.setLibraryUri(auto_id_generator.AutoIdGenerator, "package:cloud_firestore/src/utils/auto_id_generator.dart");
  dart.defineLazy(auto_id_generator.AutoIdGenerator, {
    /*auto_id_generator.AutoIdGenerator._AUTO_ID_LENGTH*/get _AUTO_ID_LENGTH() {
      return 20;
    },
    /*auto_id_generator.AutoIdGenerator._AUTO_ID_ALPHABET*/get _AUTO_ID_ALPHABET() {
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    },
    /*auto_id_generator.AutoIdGenerator._random*/get _random() {
      return math.Random.new();
    }
  });
  const DeepCollectionEquality__unordered = dart.privateName(equality, "DeepCollectionEquality._unordered");
  let C1;
  const DeepCollectionEquality__base = dart.privateName(equality, "DeepCollectionEquality._base");
  let C0;
  const bytes$ = dart.privateName(cloud_firestore, "Blob.bytes");
  cloud_firestore.Blob = class Blob extends core.Object {
    get bytes() {
      return this[bytes$];
    }
    set bytes(value) {
      super.bytes = value;
    }
    _equals(other) {
      if (other == null) return false;
      return cloud_firestore.Blob.is(other) && dart.test((C0 || CT.C0).equals(other.bytes, this.bytes));
    }
    get hashCode() {
      return ui.hashList(this.bytes);
    }
  };
  (cloud_firestore.Blob.new = function(bytes) {
    this[bytes$] = bytes;
    ;
  }).prototype = cloud_firestore.Blob.prototype;
  dart.addTypeTests(cloud_firestore.Blob);
  dart.setLibraryUri(cloud_firestore.Blob, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.Blob, () => ({
    __proto__: dart.getFields(cloud_firestore.Blob.__proto__),
    bytes: dart.finalFieldType(typed_data.Uint8List)
  }));
  dart.defineExtensionMethods(cloud_firestore.Blob, ['_equals']);
  dart.defineExtensionAccessors(cloud_firestore.Blob, ['hashCode']);
  const _pathComponents = dart.privateName(cloud_firestore, "_pathComponents");
  const _path$ = dart.privateName(cloud_firestore, "_path");
  const _isCollectionGroup = dart.privateName(cloud_firestore, "_isCollectionGroup");
  const _parameters = dart.privateName(cloud_firestore, "_parameters");
  const _copyWithParameters = dart.privateName(cloud_firestore, "_copyWithParameters");
  const _name$ = dart.privateName(cloud_firestore, "_name");
  let C2;
  let C4;
  const ListEquality__elementEquality = dart.privateName(equality, "ListEquality._elementEquality");
  let C3;
  const firestore$ = dart.privateName(cloud_firestore, "Query.firestore");
  cloud_firestore.Query = class Query extends core.Object {
    get firestore() {
      return this[firestore$];
    }
    set firestore(value) {
      super.firestore = value;
    }
    get [_path$]() {
      return this[_pathComponents][$join]("/");
    }
    [_copyWithParameters](parameters) {
      let t0;
      return new cloud_firestore.Query.__({firestore: this.firestore, isCollectionGroup: this[_isCollectionGroup], pathComponents: this[_pathComponents], parameters: MapOfString$dynamic().unmodifiable((t0 = LinkedHashMapOfString$dynamic().from(this[_parameters]), t0[$addAll](parameters), t0))});
    }
    buildArguments() {
      let t0;
      t0 = LinkedHashMapOfString$dynamic().from(this[_parameters]);
      t0[$addAll](new (IdentityMapOfString$dynamic()).from(["path", this[_path$]]));
      return t0;
    }
    snapshots(opts) {
      let includeMetadataChanges = opts && 'includeMetadataChanges' in opts ? opts.includeMetadataChanges : false;
      if (!(includeMetadataChanges != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 54, 12, "includeMetadataChanges != null");
      let _handle = null;
      let controller = null;
      controller = StreamControllerOfQuerySnapshot().broadcast({onListen: dart.fn(() => {
          _handle = cloud_firestore.Firestore.channel.invokeMethod(core.int, "Query#addSnapshotListener", new (IdentityMapOfString$dynamic()).from(["app", this.firestore.app.name, "path", this[_path$], "isCollectionGroup", this[_isCollectionGroup], "parameters", this[_parameters], "includeMetadataChanges", includeMetadataChanges])).then(core.int, dart.fn(result => FutureOrOfint()._check(result), dynamicToFutureOrOfint()));
          _handle.then(core.Null, dart.fn(handle => {
            cloud_firestore.Firestore._queryObservers[$_set](handle, controller);
          }, intToNull()));
        }, VoidToNull()), onCancel: dart.fn(() => {
          _handle.then(core.Null, dart.fn(handle => async.async(core.Null, function*() {
            yield cloud_firestore.Firestore.channel.invokeMethod(dart.void, "removeListener", new (IdentityMapOfString$dynamic()).from(["handle", handle]));
            cloud_firestore.Firestore._queryObservers[$remove](handle);
          }), intToFutureOfNull()));
        }, VoidToNull())});
      return controller.stream;
    }
    getDocuments(opts) {
      let source = opts && 'source' in opts ? opts.source : C2 || CT.C2;
      return async.async(cloud_firestore.QuerySnapshot, (function* getDocuments() {
        if (!(source != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 91, 12, "source != null");
        let data = (yield cloud_firestore.Firestore.channel.invokeMapMethod(core.String, dart.dynamic, "Query#getDocuments", new (IdentityMapOfString$dynamic()).from(["app", this.firestore.app.name, "path", this[_path$], "isCollectionGroup", this[_isCollectionGroup], "parameters", this[_parameters], "source", cloud_firestore._getSourceString(source)])));
        return new cloud_firestore.QuerySnapshot.__(data, this.firestore);
      }).bind(this));
    }
    reference() {
      return new cloud_firestore.CollectionReference.__(this.firestore, this[_pathComponents]);
    }
    where(field, opts) {
      let isEqualTo = opts && 'isEqualTo' in opts ? opts.isEqualTo : null;
      let isLessThan = opts && 'isLessThan' in opts ? opts.isLessThan : null;
      let isLessThanOrEqualTo = opts && 'isLessThanOrEqualTo' in opts ? opts.isLessThanOrEqualTo : null;
      let isGreaterThan = opts && 'isGreaterThan' in opts ? opts.isGreaterThan : null;
      let isGreaterThanOrEqualTo = opts && 'isGreaterThanOrEqualTo' in opts ? opts.isGreaterThanOrEqualTo : null;
      let arrayContains = opts && 'arrayContains' in opts ? opts.arrayContains : null;
      let arrayContainsAny = opts && 'arrayContainsAny' in opts ? opts.arrayContainsAny : null;
      let whereIn = opts && 'whereIn' in opts ? opts.whereIn : null;
      let isNull = opts && 'isNull' in opts ? opts.isNull : null;
      if (!(typeof field == 'string' || cloud_firestore.FieldPath.is(field))) dart.assertFailed("Supported [field] types are [String] and [FieldPath].", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 133, 12, "field is String || field is FieldPath");
      let equality = C3 || CT.C3;
      let conditions = ListOfList().from(core.Iterable._check(this[_parameters][$_get]("where")));
      function addCondition(field, operator, value) {
        let condition = [field, operator, value];
        if (!dart.test(conditions[$where](dart.fn(item => equality.equals(condition, item), ListTobool()))[$isEmpty])) dart.assertFailed("Condition " + dart.str(condition) + " already exists in this query.", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 143, 11, "conditions\n              .where((List<dynamic> item) => equality.equals(condition, item))\n              .isEmpty");
        conditions[$add](condition);
      }
      dart.fn(addCondition, dynamicAndStringAnddynamicTovoid());
      if (isEqualTo != null) addCondition(field, "==", isEqualTo);
      if (isLessThan != null) addCondition(field, "<", isLessThan);
      if (isLessThanOrEqualTo != null) addCondition(field, "<=", isLessThanOrEqualTo);
      if (isGreaterThan != null) addCondition(field, ">", isGreaterThan);
      if (isGreaterThanOrEqualTo != null) addCondition(field, ">=", isGreaterThanOrEqualTo);
      if (arrayContains != null) addCondition(field, "array-contains", arrayContains);
      if (arrayContainsAny != null) addCondition(field, "array-contains-any", arrayContainsAny);
      if (whereIn != null) addCondition(field, "in", whereIn);
      if (isNull != null) {
        if (!dart.test(isNull)) dart.assertFailed("isNull can only be set to true. " + "Use isEqualTo to filter on non-null values.", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 164, 11, "isNull");
        addCondition(field, "==", null);
      }
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["where", conditions]));
    }
    orderBy(field, opts) {
      let descending = opts && 'descending' in opts ? opts.descending : false;
      if (!(field != null && descending != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 184, 12, "field != null && descending != null");
      if (!(typeof field == 'string' || cloud_firestore.FieldPath.is(field))) dart.assertFailed("Supported [field] types are [String] and [FieldPath].", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 185, 12, "field is String || field is FieldPath");
      let orders = ListOfList().from(core.Iterable._check(this[_parameters][$_get]("orderBy")));
      let order = [field, descending];
      if (!dart.test(orders[$where](dart.fn(item => dart.equals(field, item[$_get](0)), ListTobool()))[$isEmpty])) dart.assertFailed("OrderBy " + dart.str(field) + " already exists in this query", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 192, 12, "orders.where((List<dynamic> item) => field == item[0]).isEmpty");
      if (!dart.test(dart.fn(() => {
        if (dart.equals(field, cloud_firestore.FieldPath.documentId)) {
          return !(dart.test(this[_parameters][$containsKey]("startAfterDocument")) || dart.test(this[_parameters][$containsKey]("startAtDocument")) || dart.test(this[_parameters][$containsKey]("endAfterDocument")) || dart.test(this[_parameters][$containsKey]("endAtDocument")));
        }
        return true;
      }, VoidTobool())())) dart.assertFailed("{start/end}{At/After/Before}Document order by document id themselves. " + "Hence, you may not use an order by [FieldPath.documentId] when using any of these methods for a query.", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 195, 12, "() {\n      if (field == FieldPath.documentId) {\n        return !(_parameters.containsKey('startAfterDocument') ||\n            _parameters.containsKey('startAtDocument') ||\n            _parameters.containsKey('endAfterDocument') ||\n            _parameters.containsKey('endAtDocument'));\n      }\n      return true;\n    }()");
      orders[$add](order);
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["orderBy", orders]));
    }
    startAfterDocument(documentSnapshot) {
      if (!(documentSnapshot != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 226, 12, "documentSnapshot != null");
      if (!!dart.test(this[_parameters][$containsKey]("startAfter"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 227, 12, "!_parameters.containsKey('startAfter')");
      if (!!dart.test(this[_parameters][$containsKey]("startAt"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 228, 12, "!_parameters.containsKey('startAt')");
      if (!!dart.test(this[_parameters][$containsKey]("startAfterDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 229, 12, "!_parameters.containsKey('startAfterDocument')");
      if (!!dart.test(this[_parameters][$containsKey]("startAtDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 230, 12, "!_parameters.containsKey('startAtDocument')");
      if (!dart.test(ListOfList().from(core.Iterable._check(this[_parameters][$_get]("orderBy")))[$where](dart.fn(item => dart.equals(item[$_get](0), cloud_firestore.FieldPath.documentId), ListTobool()))[$isEmpty])) dart.assertFailed("[startAfterDocument] orders by document id itself. " + "Hence, you may not use an order by [FieldPath.documentId] when using [startAfterDocument].", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 232, 9, "List<List<dynamic>>.from(_parameters['orderBy'])\n            .where((List<dynamic> item) => item[0] == FieldPath.documentId)\n            .isEmpty");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["startAfterDocument", new (IdentityMapOfString$dynamic()).from(["id", documentSnapshot.documentID, "path", documentSnapshot.reference.path, "data", documentSnapshot.data])]));
    }
    startAtDocument(documentSnapshot) {
      if (!(documentSnapshot != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 261, 12, "documentSnapshot != null");
      if (!!dart.test(this[_parameters][$containsKey]("startAfter"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 262, 12, "!_parameters.containsKey('startAfter')");
      if (!!dart.test(this[_parameters][$containsKey]("startAt"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 263, 12, "!_parameters.containsKey('startAt')");
      if (!!dart.test(this[_parameters][$containsKey]("startAfterDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 264, 12, "!_parameters.containsKey('startAfterDocument')");
      if (!!dart.test(this[_parameters][$containsKey]("startAtDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 265, 12, "!_parameters.containsKey('startAtDocument')");
      if (!dart.test(ListOfList().from(core.Iterable._check(this[_parameters][$_get]("orderBy")))[$where](dart.fn(item => dart.equals(item[$_get](0), cloud_firestore.FieldPath.documentId), ListTobool()))[$isEmpty])) dart.assertFailed("[startAtDocument] orders by document id itself. " + "Hence, you may not use an order by [FieldPath.documentId] when using [startAtDocument].", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 267, 9, "List<List<dynamic>>.from(_parameters['orderBy'])\n            .where((List<dynamic> item) => item[0] == FieldPath.documentId)\n            .isEmpty");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["startAtDocument", new (IdentityMapOfString$dynamic()).from(["id", documentSnapshot.documentID, "path", documentSnapshot.reference.path, "data", documentSnapshot.data])]));
    }
    startAfter(values) {
      if (!(values != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 290, 12, "values != null");
      if (!!dart.test(this[_parameters][$containsKey]("startAfter"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 291, 12, "!_parameters.containsKey('startAfter')");
      if (!!dart.test(this[_parameters][$containsKey]("startAt"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 292, 12, "!_parameters.containsKey('startAt')");
      if (!!dart.test(this[_parameters][$containsKey]("startAfterDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 293, 12, "!_parameters.containsKey('startAfterDocument')");
      if (!!dart.test(this[_parameters][$containsKey]("startAtDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 294, 12, "!_parameters.containsKey('startAtDocument')");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["startAfter", values]));
    }
    startAt(values) {
      if (!(values != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 307, 12, "values != null");
      if (!!dart.test(this[_parameters][$containsKey]("startAfter"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 308, 12, "!_parameters.containsKey('startAfter')");
      if (!!dart.test(this[_parameters][$containsKey]("startAt"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 309, 12, "!_parameters.containsKey('startAt')");
      if (!!dart.test(this[_parameters][$containsKey]("startAfterDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 310, 12, "!_parameters.containsKey('startAfterDocument')");
      if (!!dart.test(this[_parameters][$containsKey]("startAtDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 311, 12, "!_parameters.containsKey('startAtDocument')");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["startAt", values]));
    }
    endAtDocument(documentSnapshot) {
      if (!(documentSnapshot != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 330, 12, "documentSnapshot != null");
      if (!!dart.test(this[_parameters][$containsKey]("endBefore"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 331, 12, "!_parameters.containsKey('endBefore')");
      if (!!dart.test(this[_parameters][$containsKey]("endAt"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 332, 12, "!_parameters.containsKey('endAt')");
      if (!!dart.test(this[_parameters][$containsKey]("endBeforeDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 333, 12, "!_parameters.containsKey('endBeforeDocument')");
      if (!!dart.test(this[_parameters][$containsKey]("endAtDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 334, 12, "!_parameters.containsKey('endAtDocument')");
      if (!dart.test(ListOfList().from(core.Iterable._check(this[_parameters][$_get]("orderBy")))[$where](dart.fn(item => dart.equals(item[$_get](0), cloud_firestore.FieldPath.documentId), ListTobool()))[$isEmpty])) dart.assertFailed("[endAtDocument] orders by document id itself. " + "Hence, you may not use an order by [FieldPath.documentId] when using [endAtDocument].", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 336, 9, "List<List<dynamic>>.from(_parameters['orderBy'])\n            .where((List<dynamic> item) => item[0] == FieldPath.documentId)\n            .isEmpty");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["endAtDocument", new (IdentityMapOfString$dynamic()).from(["id", documentSnapshot.documentID, "path", documentSnapshot.reference.path, "data", documentSnapshot.data])]));
    }
    endAt(values) {
      if (!(values != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 359, 12, "values != null");
      if (!!dart.test(this[_parameters][$containsKey]("endBefore"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 360, 12, "!_parameters.containsKey('endBefore')");
      if (!!dart.test(this[_parameters][$containsKey]("endAt"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 361, 12, "!_parameters.containsKey('endAt')");
      if (!!dart.test(this[_parameters][$containsKey]("endBeforeDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 362, 12, "!_parameters.containsKey('endBeforeDocument')");
      if (!!dart.test(this[_parameters][$containsKey]("endAtDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 363, 12, "!_parameters.containsKey('endAtDocument')");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["endAt", values]));
    }
    endBeforeDocument(documentSnapshot) {
      if (!(documentSnapshot != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 382, 12, "documentSnapshot != null");
      if (!!dart.test(this[_parameters][$containsKey]("endBefore"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 383, 12, "!_parameters.containsKey('endBefore')");
      if (!!dart.test(this[_parameters][$containsKey]("endAt"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 384, 12, "!_parameters.containsKey('endAt')");
      if (!!dart.test(this[_parameters][$containsKey]("endBeforeDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 385, 12, "!_parameters.containsKey('endBeforeDocument')");
      if (!!dart.test(this[_parameters][$containsKey]("endAtDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 386, 12, "!_parameters.containsKey('endAtDocument')");
      if (!dart.test(ListOfList().from(core.Iterable._check(this[_parameters][$_get]("orderBy")))[$where](dart.fn(item => dart.equals(item[$_get](0), cloud_firestore.FieldPath.documentId), ListTobool()))[$isEmpty])) dart.assertFailed("[endBeforeDocument] orders by document id itself. " + "Hence, you may not use an order by [FieldPath.documentId] when using [endBeforeDocument].", "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 388, 9, "List<List<dynamic>>.from(_parameters['orderBy'])\n            .where((List<dynamic> item) => item[0] == FieldPath.documentId)\n            .isEmpty");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["endBeforeDocument", new (IdentityMapOfString$dynamic()).from(["id", documentSnapshot.documentID, "path", documentSnapshot.reference.path, "data", documentSnapshot.data])]));
    }
    endBefore(values) {
      if (!(values != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 411, 12, "values != null");
      if (!!dart.test(this[_parameters][$containsKey]("endBefore"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 412, 12, "!_parameters.containsKey('endBefore')");
      if (!!dart.test(this[_parameters][$containsKey]("endAt"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 413, 12, "!_parameters.containsKey('endAt')");
      if (!!dart.test(this[_parameters][$containsKey]("endBeforeDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 414, 12, "!_parameters.containsKey('endBeforeDocument')");
      if (!!dart.test(this[_parameters][$containsKey]("endAtDocument"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 415, 12, "!_parameters.containsKey('endAtDocument')");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["endBefore", values]));
    }
    limit(length) {
      if (!!dart.test(this[_parameters][$containsKey]("limit"))) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 422, 12, "!_parameters.containsKey('limit')");
      return this[_copyWithParameters](new (IdentityMapOfString$dynamic()).from(["limit", length]));
    }
  };
  (cloud_firestore.Query.__ = function(opts) {
    let t0;
    let firestore = opts && 'firestore' in opts ? opts.firestore : null;
    let pathComponents = opts && 'pathComponents' in opts ? opts.pathComponents : null;
    let isCollectionGroup = opts && 'isCollectionGroup' in opts ? opts.isCollectionGroup : false;
    let parameters = opts && 'parameters' in opts ? opts.parameters : null;
    this[firestore$] = firestore;
    this[_pathComponents] = pathComponents;
    this[_isCollectionGroup] = isCollectionGroup;
    this[_parameters] = (t0 = parameters, t0 == null ? MapOfString$dynamic().unmodifiable(new (IdentityMapOfString$dynamic()).from(["where", ListOfList().unmodifiable(JSArrayOfList().of([])), "orderBy", ListOfList().unmodifiable(JSArrayOfList().of([]))])) : t0);
    if (!(firestore != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 21, 16, "firestore != null");
    if (!(pathComponents != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/query.dart", 22, 16, "pathComponents != null");
    ;
  }).prototype = cloud_firestore.Query.prototype;
  dart.addTypeTests(cloud_firestore.Query);
  dart.setMethodSignature(cloud_firestore.Query, () => ({
    __proto__: dart.getMethods(cloud_firestore.Query.__proto__),
    [_copyWithParameters]: dart.fnType(cloud_firestore.Query, [core.Map$(core.String, dart.dynamic)]),
    buildArguments: dart.fnType(core.Map$(core.String, dart.dynamic), []),
    snapshots: dart.fnType(async.Stream$(cloud_firestore.QuerySnapshot), [], {includeMetadataChanges: core.bool}, {}),
    getDocuments: dart.fnType(async.Future$(cloud_firestore.QuerySnapshot), [], {source: cloud_firestore.Source}, {}),
    reference: dart.fnType(cloud_firestore.CollectionReference, []),
    where: dart.fnType(cloud_firestore.Query, [dart.dynamic], {arrayContains: dart.dynamic, arrayContainsAny: core.List, isEqualTo: dart.dynamic, isGreaterThan: dart.dynamic, isGreaterThanOrEqualTo: dart.dynamic, isLessThan: dart.dynamic, isLessThanOrEqualTo: dart.dynamic, isNull: core.bool, whereIn: core.List}, {}),
    orderBy: dart.fnType(cloud_firestore.Query, [dart.dynamic], {descending: core.bool}, {}),
    startAfterDocument: dart.fnType(cloud_firestore.Query, [cloud_firestore.DocumentSnapshot]),
    startAtDocument: dart.fnType(cloud_firestore.Query, [cloud_firestore.DocumentSnapshot]),
    startAfter: dart.fnType(cloud_firestore.Query, [core.List]),
    startAt: dart.fnType(cloud_firestore.Query, [core.List]),
    endAtDocument: dart.fnType(cloud_firestore.Query, [cloud_firestore.DocumentSnapshot]),
    endAt: dart.fnType(cloud_firestore.Query, [core.List]),
    endBeforeDocument: dart.fnType(cloud_firestore.Query, [cloud_firestore.DocumentSnapshot]),
    endBefore: dart.fnType(cloud_firestore.Query, [core.List]),
    limit: dart.fnType(cloud_firestore.Query, [core.int])
  }));
  dart.setGetterSignature(cloud_firestore.Query, () => ({
    __proto__: dart.getGetters(cloud_firestore.Query.__proto__),
    [_path$]: core.String
  }));
  dart.setLibraryUri(cloud_firestore.Query, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.Query, () => ({
    __proto__: dart.getFields(cloud_firestore.Query.__proto__),
    firestore: dart.finalFieldType(cloud_firestore.Firestore),
    [_pathComponents]: dart.finalFieldType(core.List$(core.String)),
    [_parameters]: dart.finalFieldType(core.Map$(core.String, dart.dynamic)),
    [_isCollectionGroup]: dart.finalFieldType(core.bool)
  }));
  cloud_firestore.CollectionReference = class CollectionReference extends cloud_firestore.Query {
    get id() {
      return dart.test(this[_pathComponents][$isEmpty]) ? null : this[_pathComponents][$last];
    }
    parent() {
      let t0;
      if (dart.notNull(this[_pathComponents][$length]) < 2) {
        return null;
      }
      return new cloud_firestore.DocumentReference.__(this.firestore, (t0 = ListOfString().from(this[_pathComponents]), t0[$removeLast](), t0));
    }
    get path() {
      return this[_path$];
    }
    document(path = null) {
      let t0, t0$;
      let childPath = null;
      if (path == null) {
        let key = auto_id_generator.AutoIdGenerator.autoId();
        childPath = (t0 = ListOfString().from(this[_pathComponents]), t0[$add](key), t0);
      } else {
        childPath = (t0$ = ListOfString().from(this[_pathComponents]), t0$[$addAll](path[$split]("/")), t0$);
      }
      return new cloud_firestore.DocumentReference.__(this.firestore, childPath);
    }
    add(data) {
      return async.async(cloud_firestore.DocumentReference, (function* add() {
        let newDocument = this.document();
        yield newDocument.setData(data);
        return newDocument;
      }).bind(this));
    }
  };
  (cloud_firestore.CollectionReference.__ = function(firestore, pathComponents) {
    cloud_firestore.CollectionReference.__proto__.__.call(this, {firestore: firestore, pathComponents: pathComponents});
    ;
  }).prototype = cloud_firestore.CollectionReference.prototype;
  dart.addTypeTests(cloud_firestore.CollectionReference);
  dart.setMethodSignature(cloud_firestore.CollectionReference, () => ({
    __proto__: dart.getMethods(cloud_firestore.CollectionReference.__proto__),
    parent: dart.fnType(cloud_firestore.DocumentReference, []),
    document: dart.fnType(cloud_firestore.DocumentReference, [], [core.String]),
    add: dart.fnType(async.Future$(cloud_firestore.DocumentReference), [core.Map$(core.String, dart.dynamic)])
  }));
  dart.setGetterSignature(cloud_firestore.CollectionReference, () => ({
    __proto__: dart.getGetters(cloud_firestore.CollectionReference.__proto__),
    id: core.String,
    path: core.String
  }));
  dart.setLibraryUri(cloud_firestore.CollectionReference, "package:cloud_firestore/cloud_firestore.dart");
  let C5;
  let C6;
  let C7;
  let C8;
  cloud_firestore.DocumentChangeType = class DocumentChangeType extends core.Object {
    toString() {
      return this[_name$];
    }
  };
  (cloud_firestore.DocumentChangeType.new = function(index, _name) {
    this.index = index;
    this[_name$] = _name;
    ;
  }).prototype = cloud_firestore.DocumentChangeType.prototype;
  dart.addTypeTests(cloud_firestore.DocumentChangeType);
  dart.setLibraryUri(cloud_firestore.DocumentChangeType, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.DocumentChangeType, () => ({
    __proto__: dart.getFields(cloud_firestore.DocumentChangeType.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(cloud_firestore.DocumentChangeType, ['toString']);
  cloud_firestore.DocumentChangeType.added = C5 || CT.C5;
  cloud_firestore.DocumentChangeType.modified = C6 || CT.C6;
  cloud_firestore.DocumentChangeType.removed = C7 || CT.C7;
  cloud_firestore.DocumentChangeType.values = C8 || CT.C8;
  const type = dart.privateName(cloud_firestore, "DocumentChange.type");
  const oldIndex = dart.privateName(cloud_firestore, "DocumentChange.oldIndex");
  const newIndex = dart.privateName(cloud_firestore, "DocumentChange.newIndex");
  const document = dart.privateName(cloud_firestore, "DocumentChange.document");
  cloud_firestore.DocumentChange = class DocumentChange extends core.Object {
    get type() {
      return this[type];
    }
    set type(value) {
      super.type = value;
    }
    get oldIndex() {
      return this[oldIndex];
    }
    set oldIndex(value) {
      super.oldIndex = value;
    }
    get newIndex() {
      return this[newIndex];
    }
    set newIndex(value) {
      super.newIndex = value;
    }
    get document() {
      return this[document];
    }
    set document(value) {
      super.document = value;
    }
  };
  (cloud_firestore.DocumentChange.__ = function(data, firestore) {
    this[oldIndex] = core.int._check(data[$_get]("oldIndex"));
    this[newIndex] = core.int._check(data[$_get]("newIndex"));
    this[document] = new cloud_firestore.DocumentSnapshot.__(core.String._check(data[$_get]("path")), cloud_firestore._asStringKeyedMap(core.Map._check(data[$_get]("document"))), new cloud_firestore.SnapshotMetadata.__(core.bool._check(dart.dsend(data[$_get]("metadata"), '_get', ["hasPendingWrites"])), core.bool._check(dart.dsend(data[$_get]("metadata"), '_get', ["isFromCache"]))), firestore);
    this[type] = cloud_firestore.DocumentChangeType.values[$firstWhere](dart.fn(type => core.identical(dart.toString(type), data[$_get]("type")), DocumentChangeTypeTobool()));
    ;
  }).prototype = cloud_firestore.DocumentChange.prototype;
  dart.addTypeTests(cloud_firestore.DocumentChange);
  dart.setLibraryUri(cloud_firestore.DocumentChange, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.DocumentChange, () => ({
    __proto__: dart.getFields(cloud_firestore.DocumentChange.__proto__),
    type: dart.finalFieldType(cloud_firestore.DocumentChangeType),
    oldIndex: dart.finalFieldType(core.int),
    newIndex: dart.finalFieldType(core.int),
    document: dart.finalFieldType(cloud_firestore.DocumentSnapshot)
  }));
  const firestore$0 = dart.privateName(cloud_firestore, "DocumentReference.firestore");
  cloud_firestore.DocumentReference = class DocumentReference extends core.Object {
    get firestore() {
      return this[firestore$0];
    }
    set firestore(value) {
      super.firestore = value;
    }
    _equals(o) {
      if (o == null) return false;
      return cloud_firestore.DocumentReference.is(o) && dart.equals(o.firestore, this.firestore) && o.path == this.path;
    }
    get hashCode() {
      return ui.hashList(this[_pathComponents]);
    }
    parent() {
      let t0;
      return new cloud_firestore.CollectionReference.__(this.firestore, (t0 = ListOfString().from(this[_pathComponents]), t0[$removeLast](), t0));
    }
    get path() {
      return this[_pathComponents][$join]("/");
    }
    get documentID() {
      return this[_pathComponents][$last];
    }
    setData(data, opts) {
      let merge = opts && 'merge' in opts ? opts.merge : false;
      return cloud_firestore.Firestore.channel.invokeMethod(dart.void, "DocumentReference#setData", new (IdentityMapOfString$dynamic()).from(["app", this.firestore.app.name, "path", this.path, "data", data, "options", new (IdentityMapOfString$bool()).from(["merge", merge])]));
    }
    updateData(data) {
      return cloud_firestore.Firestore.channel.invokeMethod(dart.void, "DocumentReference#updateData", new (IdentityMapOfString$dynamic()).from(["app", this.firestore.app.name, "path", this.path, "data", data]));
    }
    get(opts) {
      let source = opts && 'source' in opts ? opts.source : C2 || CT.C2;
      return async.async(cloud_firestore.DocumentSnapshot, (function* get() {
        let data = (yield cloud_firestore.Firestore.channel.invokeMapMethod(core.String, dart.dynamic, "DocumentReference#get", new (IdentityMapOfString$dynamic()).from(["app", this.firestore.app.name, "path", this.path, "source", cloud_firestore._getSourceString(source)])));
        return new cloud_firestore.DocumentSnapshot.__(core.String._check(data[$_get]("path")), cloud_firestore._asStringKeyedMap(core.Map._check(data[$_get]("data"))), new cloud_firestore.SnapshotMetadata.__(core.bool._check(dart.dsend(data[$_get]("metadata"), '_get', ["hasPendingWrites"])), core.bool._check(dart.dsend(data[$_get]("metadata"), '_get', ["isFromCache"]))), this.firestore);
      }).bind(this));
    }
    delete() {
      return cloud_firestore.Firestore.channel.invokeMethod(dart.void, "DocumentReference#delete", new (IdentityMapOfString$dynamic()).from(["app", this.firestore.app.name, "path", this.path]));
    }
    collection(collectionPath) {
      return this.firestore.collection(JSArrayOfString().of([this.path, collectionPath])[$join]("/"));
    }
    snapshots(opts) {
      let includeMetadataChanges = opts && 'includeMetadataChanges' in opts ? opts.includeMetadataChanges : false;
      if (!(includeMetadataChanges != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/document_reference.dart", 120, 12, "includeMetadataChanges != null");
      let _handle = null;
      let controller = null;
      controller = StreamControllerOfDocumentSnapshot().broadcast({onListen: dart.fn(() => {
          _handle = cloud_firestore.Firestore.channel.invokeMethod(core.int, "DocumentReference#addSnapshotListener", new (IdentityMapOfString$dynamic()).from(["app", this.firestore.app.name, "path", this.path, "includeMetadataChanges", includeMetadataChanges])).then(core.int, dart.fn(result => FutureOrOfint()._check(result), dynamicToFutureOrOfint()));
          _handle.then(core.Null, dart.fn(handle => {
            cloud_firestore.Firestore._documentObservers[$_set](handle, controller);
          }, intToNull()));
        }, VoidToNull()), onCancel: dart.fn(() => {
          _handle.then(core.Null, dart.fn(handle => async.async(core.Null, function*() {
            yield cloud_firestore.Firestore.channel.invokeMethod(dart.void, "removeListener", new (IdentityMapOfString$dynamic()).from(["handle", handle]));
            cloud_firestore.Firestore._documentObservers[$remove](handle);
          }), intToFutureOfNull()));
        }, VoidToNull())});
      return controller.stream;
    }
  };
  (cloud_firestore.DocumentReference.__ = function(firestore, pathComponents) {
    this[firestore$0] = firestore;
    this[_pathComponents] = pathComponents;
    if (!(firestore != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/document_reference.dart", 16, 16, "firestore != null");
    ;
  }).prototype = cloud_firestore.DocumentReference.prototype;
  dart.addTypeTests(cloud_firestore.DocumentReference);
  dart.setMethodSignature(cloud_firestore.DocumentReference, () => ({
    __proto__: dart.getMethods(cloud_firestore.DocumentReference.__proto__),
    parent: dart.fnType(cloud_firestore.CollectionReference, []),
    setData: dart.fnType(async.Future$(dart.void), [core.Map$(core.String, dart.dynamic)], {merge: core.bool}, {}),
    updateData: dart.fnType(async.Future$(dart.void), [core.Map$(core.String, dart.dynamic)]),
    get: dart.fnType(async.Future$(cloud_firestore.DocumentSnapshot), [], {source: cloud_firestore.Source}, {}),
    delete: dart.fnType(async.Future$(dart.void), []),
    collection: dart.fnType(cloud_firestore.CollectionReference, [core.String]),
    snapshots: dart.fnType(async.Stream$(cloud_firestore.DocumentSnapshot), [], {includeMetadataChanges: core.bool}, {})
  }));
  dart.setGetterSignature(cloud_firestore.DocumentReference, () => ({
    __proto__: dart.getGetters(cloud_firestore.DocumentReference.__proto__),
    path: core.String,
    documentID: core.String
  }));
  dart.setLibraryUri(cloud_firestore.DocumentReference, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.DocumentReference, () => ({
    __proto__: dart.getFields(cloud_firestore.DocumentReference.__proto__),
    firestore: dart.finalFieldType(cloud_firestore.Firestore),
    [_pathComponents]: dart.finalFieldType(core.List$(core.String))
  }));
  dart.defineExtensionMethods(cloud_firestore.DocumentReference, ['_equals']);
  dart.defineExtensionAccessors(cloud_firestore.DocumentReference, ['hashCode']);
  const _firestore$ = dart.privateName(cloud_firestore, "_firestore");
  const data$ = dart.privateName(cloud_firestore, "DocumentSnapshot.data");
  const metadata$ = dart.privateName(cloud_firestore, "DocumentSnapshot.metadata");
  cloud_firestore.DocumentSnapshot = class DocumentSnapshot extends core.Object {
    get data() {
      return this[data$];
    }
    set data(value) {
      super.data = value;
    }
    get metadata() {
      return this[metadata$];
    }
    set metadata(value) {
      super.metadata = value;
    }
    get reference() {
      return this[_firestore$].document(this[_path$]);
    }
    _get(key) {
      return this.data[$_get](key);
    }
    get documentID() {
      return this[_path$][$split]("/")[$last];
    }
    get exists() {
      return this.data != null;
    }
  };
  (cloud_firestore.DocumentSnapshot.__ = function(_path, data, metadata, _firestore) {
    this[_path$] = _path;
    this[data$] = data;
    this[metadata$] = metadata;
    this[_firestore$] = _firestore;
    ;
  }).prototype = cloud_firestore.DocumentSnapshot.prototype;
  dart.addTypeTests(cloud_firestore.DocumentSnapshot);
  dart.setMethodSignature(cloud_firestore.DocumentSnapshot, () => ({
    __proto__: dart.getMethods(cloud_firestore.DocumentSnapshot.__proto__),
    _get: dart.fnType(dart.dynamic, [core.String])
  }));
  dart.setGetterSignature(cloud_firestore.DocumentSnapshot, () => ({
    __proto__: dart.getGetters(cloud_firestore.DocumentSnapshot.__proto__),
    reference: cloud_firestore.DocumentReference,
    documentID: core.String,
    exists: core.bool
  }));
  dart.setLibraryUri(cloud_firestore.DocumentSnapshot, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.DocumentSnapshot, () => ({
    __proto__: dart.getFields(cloud_firestore.DocumentSnapshot.__proto__),
    [_path$]: dart.finalFieldType(core.String),
    [_firestore$]: dart.finalFieldType(cloud_firestore.Firestore),
    data: dart.finalFieldType(core.Map$(core.String, dart.dynamic)),
    metadata: dart.finalFieldType(cloud_firestore.SnapshotMetadata)
  }));
  let C9;
  let C10;
  cloud_firestore._FieldPathType = class _FieldPathType extends core.Object {
    toString() {
      return this[_name$];
    }
  };
  (cloud_firestore._FieldPathType.new = function(index, _name) {
    this.index = index;
    this[_name$] = _name;
    ;
  }).prototype = cloud_firestore._FieldPathType.prototype;
  dart.addTypeTests(cloud_firestore._FieldPathType);
  dart.setLibraryUri(cloud_firestore._FieldPathType, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore._FieldPathType, () => ({
    __proto__: dart.getFields(cloud_firestore._FieldPathType.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(cloud_firestore._FieldPathType, ['toString']);
  cloud_firestore._FieldPathType.documentId = C9 || CT.C9;
  cloud_firestore._FieldPathType.values = C10 || CT.C10;
  const FieldPath_type = dart.privateName(cloud_firestore, "FieldPath.type");
  let C11;
  cloud_firestore.FieldPath = class FieldPath extends core.Object {
    get type() {
      return this[type$];
    }
    set type(value) {
      super.type = value;
    }
    static get documentId() {
      return C11 || CT.C11;
    }
  };
  (cloud_firestore.FieldPath.__ = function(type) {
    this[type$] = type;
    ;
  }).prototype = cloud_firestore.FieldPath.prototype;
  dart.addTypeTests(cloud_firestore.FieldPath);
  const type$ = FieldPath_type;
  dart.setLibraryUri(cloud_firestore.FieldPath, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.FieldPath, () => ({
    __proto__: dart.getFields(cloud_firestore.FieldPath.__proto__),
    type: dart.finalFieldType(cloud_firestore._FieldPathType)
  }));
  let C12;
  let C13;
  let C14;
  let C15;
  let C16;
  let C17;
  let C18;
  cloud_firestore.FieldValueType = class FieldValueType extends core.Object {
    toString() {
      return this[_name$];
    }
  };
  (cloud_firestore.FieldValueType.new = function(index, _name) {
    this.index = index;
    this[_name$] = _name;
    ;
  }).prototype = cloud_firestore.FieldValueType.prototype;
  dart.addTypeTests(cloud_firestore.FieldValueType);
  dart.setLibraryUri(cloud_firestore.FieldValueType, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.FieldValueType, () => ({
    __proto__: dart.getFields(cloud_firestore.FieldValueType.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(cloud_firestore.FieldValueType, ['toString']);
  cloud_firestore.FieldValueType.arrayUnion = C12 || CT.C12;
  cloud_firestore.FieldValueType.arrayRemove = C13 || CT.C13;
  cloud_firestore.FieldValueType.delete = C14 || CT.C14;
  cloud_firestore.FieldValueType.serverTimestamp = C15 || CT.C15;
  cloud_firestore.FieldValueType.incrementDouble = C16 || CT.C16;
  cloud_firestore.FieldValueType.incrementInteger = C17 || CT.C17;
  cloud_firestore.FieldValueType.values = C18 || CT.C18;
  const type$0 = dart.privateName(cloud_firestore, "FieldValue.type");
  const value$ = dart.privateName(cloud_firestore, "FieldValue.value");
  cloud_firestore.FieldValue = class FieldValue extends core.Object {
    get type() {
      return this[type$0];
    }
    set type(value) {
      super.type = value;
    }
    get value() {
      return this[value$];
    }
    set value(value) {
      super.value = value;
    }
    static arrayUnion(elements) {
      return new cloud_firestore.FieldValue.__(cloud_firestore.FieldValueType.arrayUnion, elements);
    }
    static arrayRemove(elements) {
      return new cloud_firestore.FieldValue.__(cloud_firestore.FieldValueType.arrayRemove, elements);
    }
    static delete() {
      return new cloud_firestore.FieldValue.__(cloud_firestore.FieldValueType.delete, null);
    }
    static serverTimestamp() {
      return new cloud_firestore.FieldValue.__(cloud_firestore.FieldValueType.serverTimestamp, null);
    }
    static increment(value) {
      if (!(core.int.is(value) || typeof value == 'number')) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/field_value.dart", 60, 12, "value is int || value is double");
      if (typeof value == 'number') {
        return new cloud_firestore.FieldValue.__(cloud_firestore.FieldValueType.incrementDouble, value);
      } else if (core.int.is(value)) {
        return new cloud_firestore.FieldValue.__(cloud_firestore.FieldValueType.incrementInteger, value);
      }
      return null;
    }
  };
  (cloud_firestore.FieldValue.__ = function(type, value) {
    this[type$0] = type;
    this[value$] = value;
    ;
  }).prototype = cloud_firestore.FieldValue.prototype;
  dart.addTypeTests(cloud_firestore.FieldValue);
  dart.setLibraryUri(cloud_firestore.FieldValue, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.FieldValue, () => ({
    __proto__: dart.getFields(cloud_firestore.FieldValue.__proto__),
    type: dart.finalFieldType(cloud_firestore.FieldValueType),
    value: dart.finalFieldType(dart.dynamic)
  }));
  const _finish = dart.privateName(cloud_firestore, "_finish");
  const Duration__duration = dart.privateName(core, "Duration._duration");
  let C19;
  const app$ = dart.privateName(cloud_firestore, "Firestore.app");
  const MethodChannel__binaryMessenger = dart.privateName(platform_channel, "MethodChannel._binaryMessenger");
  let C22;
  const StandardMethodCodec_messageCodec = dart.privateName(message_codecs, "StandardMethodCodec.messageCodec");
  let C21;
  const MethodChannel_codec = dart.privateName(platform_channel, "MethodChannel.codec");
  const MethodChannel_name = dart.privateName(platform_channel, "MethodChannel.name");
  let C20;
  cloud_firestore.Firestore = class Firestore extends core.Object {
    get app() {
      return this[app$];
    }
    set app(value) {
      super.app = value;
    }
    _equals(o) {
      if (o == null) return false;
      return cloud_firestore.Firestore.is(o) && dart.equals(o.app, this.app);
    }
    get hashCode() {
      return dart.hashCode(this.app);
    }
    collection(path) {
      if (!(path != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/firestore.dart", 72, 12, "path != null");
      return new cloud_firestore.CollectionReference.__(this, path[$split]("/"));
    }
    collectionGroup(path) {
      if (!(path != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/firestore.dart", 78, 12, "path != null");
      if (!!path[$contains]("/")) dart.assertFailed("Collection IDs must not contain '/'.", "org-dartlang-app:///packages/cloud_firestore/src/firestore.dart", 79, 12, "!path.contains(\"/\")");
      return new cloud_firestore.Query.__({firestore: this, isCollectionGroup: true, pathComponents: path[$split]("/")});
    }
    document(path) {
      if (!(path != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/firestore.dart", 89, 12, "path != null");
      return new cloud_firestore.DocumentReference.__(this, path[$split]("/"));
    }
    batch() {
      return new cloud_firestore.WriteBatch.__(this);
    }
    runTransaction(transactionHandler, opts) {
      let timeout = opts && 'timeout' in opts ? opts.timeout : C19 || CT.C19;
      return async.async(MapOfString$dynamic(), (function* runTransaction() {
        let t0, t0$;
        if (!(dart.notNull(timeout.inMilliseconds) > 0)) dart.assertFailed("Transaction timeout must be more than 0 milliseconds", "org-dartlang-app:///packages/cloud_firestore/src/firestore.dart", 124, 12, "timeout.inMilliseconds > 0");
        let transactionId = (t0 = cloud_firestore.Firestore._transactionHandlerId, cloud_firestore.Firestore._transactionHandlerId = dart.notNull(t0) + 1, t0);
        cloud_firestore.Firestore._transactionHandlers[$_set](transactionId, transactionHandler);
        let result = (yield cloud_firestore.Firestore.channel.invokeMapMethod(core.String, dart.dynamic, "Firestore#runTransaction", new (IdentityMapOfString$dynamic()).from(["app", this.app.name, "transactionId", transactionId, "transactionTimeout", timeout.inMilliseconds])));
        t0$ = result;
        return t0$ == null ? new (IdentityMapOfString$dynamic()).new() : t0$;
      }).bind(this));
    }
    enablePersistence(enable) {
      return async.async(dart.void, (function* enablePersistence() {
        if (!(enable != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/firestore.dart", 140, 12, "enable != null");
        yield cloud_firestore.Firestore.channel.invokeMethod(dart.void, "Firestore#enablePersistence", new (IdentityMapOfString$dynamic()).from(["app", this.app.name, "enable", enable]));
      }).bind(this));
    }
    settings(opts) {
      let persistenceEnabled = opts && 'persistenceEnabled' in opts ? opts.persistenceEnabled : null;
      let host = opts && 'host' in opts ? opts.host : null;
      let sslEnabled = opts && 'sslEnabled' in opts ? opts.sslEnabled : null;
      let cacheSizeBytes = opts && 'cacheSizeBytes' in opts ? opts.cacheSizeBytes : null;
      return async.async(dart.void, (function* settings() {
        yield cloud_firestore.Firestore.channel.invokeMethod(dart.void, "Firestore#settings", new (IdentityMapOfString$dynamic()).from(["app", this.app.name, "persistenceEnabled", persistenceEnabled, "host", host, "sslEnabled", sslEnabled, "cacheSizeBytes", cacheSizeBytes]));
      }).bind(this));
    }
  };
  (cloud_firestore.Firestore.new = function(opts) {
    let t0;
    let app = opts && 'app' in opts ? opts.app : null;
    this[app$] = (t0 = app, t0 == null ? firebase_app.FirebaseApp.instance : t0);
    if (dart.test(cloud_firestore.Firestore._initialized)) return;
    cloud_firestore.Firestore.channel.setMethodCallHandler(dart.fn(call => async.async(dart.dynamic, (function*() {
      if (call.method === "QuerySnapshot") {
        let snapshot = new cloud_firestore.QuerySnapshot.__(core.Map._check(call.arguments), this);
        cloud_firestore.Firestore._queryObservers[$_get](dart.dsend(call.arguments, '_get', ["handle"])).add(snapshot);
      } else if (call.method === "DocumentSnapshot") {
        let snapshot = new cloud_firestore.DocumentSnapshot.__(core.String._check(dart.dsend(call.arguments, '_get', ["path"])), cloud_firestore._asStringKeyedMap(core.Map._check(dart.dsend(call.arguments, '_get', ["data"]))), new cloud_firestore.SnapshotMetadata.__(core.bool._check(dart.dsend(dart.dsend(call.arguments, '_get', ["metadata"]), '_get', ["hasPendingWrites"])), core.bool._check(dart.dsend(dart.dsend(call.arguments, '_get', ["metadata"]), '_get', ["isFromCache"]))), this);
        cloud_firestore.Firestore._documentObservers[$_get](dart.dsend(call.arguments, '_get', ["handle"])).add(snapshot);
      } else if (call.method === "DoTransaction") {
        let transactionId = core.int._check(dart.dsend(call.arguments, '_get', ["transactionId"]));
        let transaction = new cloud_firestore.Transaction.new(transactionId, this);
        let result = (yield cloud_firestore.Firestore._transactionHandlers[$_get](transactionId)(transaction));
        yield transaction[_finish]();
        return result;
      }
    }).bind(this)), MethodCallToFuture()));
    cloud_firestore.Firestore._initialized = true;
  }).prototype = cloud_firestore.Firestore.prototype;
  dart.addTypeTests(cloud_firestore.Firestore);
  dart.setMethodSignature(cloud_firestore.Firestore, () => ({
    __proto__: dart.getMethods(cloud_firestore.Firestore.__proto__),
    collection: dart.fnType(cloud_firestore.CollectionReference, [core.String]),
    collectionGroup: dart.fnType(cloud_firestore.Query, [core.String]),
    document: dart.fnType(cloud_firestore.DocumentReference, [core.String]),
    batch: dart.fnType(cloud_firestore.WriteBatch, []),
    runTransaction: dart.fnType(async.Future$(core.Map$(core.String, dart.dynamic)), [dart.fnType(async.Future, [cloud_firestore.Transaction])], {timeout: core.Duration}, {}),
    enablePersistence: dart.fnType(async.Future$(dart.void), [core.bool]),
    settings: dart.fnType(async.Future$(dart.void), [], {cacheSizeBytes: core.int, host: core.String, persistenceEnabled: core.bool, sslEnabled: core.bool}, {})
  }));
  dart.setLibraryUri(cloud_firestore.Firestore, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.Firestore, () => ({
    __proto__: dart.getFields(cloud_firestore.Firestore.__proto__),
    app: dart.finalFieldType(firebase_app.FirebaseApp)
  }));
  dart.defineExtensionMethods(cloud_firestore.Firestore, ['_equals']);
  dart.defineExtensionAccessors(cloud_firestore.Firestore, ['hashCode']);
  dart.defineLazy(cloud_firestore.Firestore, {
    /*cloud_firestore.Firestore.instance*/get instance() {
      return new cloud_firestore.Firestore.new();
    },
    /*cloud_firestore.Firestore._initialized*/get _initialized() {
      return false;
    },
    set _initialized(_) {},
    /*cloud_firestore.Firestore.channel*/get channel() {
      return C20 || CT.C20;
    },
    /*cloud_firestore.Firestore._queryObservers*/get _queryObservers() {
      return new (IdentityMapOfint$StreamControllerOfQuerySnapshot()).new();
    },
    /*cloud_firestore.Firestore._documentObservers*/get _documentObservers() {
      return new (IdentityMapOfint$StreamControllerOfDocumentSnapshot()).new();
    },
    /*cloud_firestore.Firestore._transactionHandlers*/get _transactionHandlers() {
      return new (IdentityMapOfint$TransactionToFuture()).new();
    },
    /*cloud_firestore.Firestore._transactionHandlerId*/get _transactionHandlerId() {
      return 0;
    },
    set _transactionHandlerId(_) {}
  });
  let C23;
  let C24;
  cloud_firestore.FirestoreMessageCodec = class FirestoreMessageCodec extends message_codecs.StandardMessageCodec {
    writeValue(buffer, value) {
      if (core.DateTime.is(value)) {
        buffer.putUint8(128);
        buffer.putInt64(value.millisecondsSinceEpoch);
      } else if (cloud_firestore.Timestamp.is(value)) {
        buffer.putUint8(136);
        buffer.putInt64(value.seconds);
        buffer.putInt32(value.nanoseconds);
      } else if (cloud_firestore.GeoPoint.is(value)) {
        buffer.putUint8(129);
        buffer.putFloat64(value.latitude);
        buffer.putFloat64(value.longitude);
      } else if (cloud_firestore.DocumentReference.is(value)) {
        buffer.putUint8(130);
        let appName = convert.utf8.encoder.convert(value.firestore.app.name);
        this.writeSize(buffer, appName[$length]);
        buffer.putUint8List(typed_data.Uint8List._check(appName));
        let bytes = convert.utf8.encoder.convert(value.path);
        this.writeSize(buffer, bytes[$length]);
        buffer.putUint8List(typed_data.Uint8List._check(bytes));
      } else if (cloud_firestore.Blob.is(value)) {
        buffer.putUint8(131);
        this.writeSize(buffer, value.bytes[$length]);
        buffer.putUint8List(value.bytes);
      } else if (cloud_firestore.FieldValue.is(value)) {
        let code = cloud_firestore.FirestoreMessageCodec._kFieldValueCodes[$_get](value.type);
        if (!(code != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/firestore_message_codec.dart", 66, 14, "code != null");
        buffer.putUint8(code);
        if (value.value != null) this.writeValue(buffer, value.value);
      } else if (cloud_firestore.FieldPath.is(value)) {
        let code = cloud_firestore.FirestoreMessageCodec._kFieldPathCodes[$_get](value.type);
        if (!(code != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/firestore_message_codec.dart", 71, 14, "code != null");
        buffer.putUint8(code);
      } else {
        super.writeValue(buffer, value);
      }
    }
    readValueOfType(type, buffer) {
      switch (type) {
        case 128:
        {
          return new core.DateTime.fromMillisecondsSinceEpoch(buffer.getInt64());
        }
        case 136:
        {
          return new cloud_firestore.Timestamp.new(buffer.getInt64(), buffer.getInt32());
        }
        case 129:
        {
          return new cloud_firestore.GeoPoint.new(buffer.getFloat64(), buffer.getFloat64());
        }
        case 130:
        {
          let appNameLength = this.readSize(buffer);
          let appName = convert.utf8.decoder.convert(buffer.getUint8List(appNameLength));
          let app = new firebase_app.FirebaseApp.new({name: appName});
          let firestore = new cloud_firestore.Firestore.new({app: app});
          let pathLength = this.readSize(buffer);
          let path = convert.utf8.decoder.convert(buffer.getUint8List(pathLength));
          return firestore.document(path);
        }
        case 131:
        {
          let length = this.readSize(buffer);
          let bytes = buffer.getUint8List(length);
          return new cloud_firestore.Blob.new(typed_data.Uint8List._check(bytes));
        }
        case 132:
        {
          let value = core.List._check(this.readValue(buffer));
          return cloud_firestore.FieldValue.arrayUnion(value);
        }
        case 133:
        {
          let value = core.List._check(this.readValue(buffer));
          return cloud_firestore.FieldValue.arrayRemove(value);
        }
        case 134:
        {
          return cloud_firestore.FieldValue.delete();
        }
        case 135:
        {
          return cloud_firestore.FieldValue.serverTimestamp();
        }
        case 137:
        {
          let value = core.double._check(this.readValue(buffer));
          return cloud_firestore.FieldValue.increment(value);
        }
        case 138:
        {
          let value = core.int._check(this.readValue(buffer));
          return cloud_firestore.FieldValue.increment(value);
        }
        case 139:
        {
          return cloud_firestore.FieldPath.documentId;
        }
        default:
        {
          return super.readValueOfType(type, buffer);
        }
      }
    }
  };
  (cloud_firestore.FirestoreMessageCodec.new = function() {
    cloud_firestore.FirestoreMessageCodec.__proto__.new.call(this);
    ;
  }).prototype = cloud_firestore.FirestoreMessageCodec.prototype;
  dart.addTypeTests(cloud_firestore.FirestoreMessageCodec);
  dart.setLibraryUri(cloud_firestore.FirestoreMessageCodec, "package:cloud_firestore/cloud_firestore.dart");
  dart.defineLazy(cloud_firestore.FirestoreMessageCodec, {
    /*cloud_firestore.FirestoreMessageCodec._kDateTime*/get _kDateTime() {
      return 128;
    },
    /*cloud_firestore.FirestoreMessageCodec._kGeoPoint*/get _kGeoPoint() {
      return 129;
    },
    /*cloud_firestore.FirestoreMessageCodec._kDocumentReference*/get _kDocumentReference() {
      return 130;
    },
    /*cloud_firestore.FirestoreMessageCodec._kBlob*/get _kBlob() {
      return 131;
    },
    /*cloud_firestore.FirestoreMessageCodec._kArrayUnion*/get _kArrayUnion() {
      return 132;
    },
    /*cloud_firestore.FirestoreMessageCodec._kArrayRemove*/get _kArrayRemove() {
      return 133;
    },
    /*cloud_firestore.FirestoreMessageCodec._kDelete*/get _kDelete() {
      return 134;
    },
    /*cloud_firestore.FirestoreMessageCodec._kServerTimestamp*/get _kServerTimestamp() {
      return 135;
    },
    /*cloud_firestore.FirestoreMessageCodec._kTimestamp*/get _kTimestamp() {
      return 136;
    },
    /*cloud_firestore.FirestoreMessageCodec._kIncrementDouble*/get _kIncrementDouble() {
      return 137;
    },
    /*cloud_firestore.FirestoreMessageCodec._kIncrementInteger*/get _kIncrementInteger() {
      return 138;
    },
    /*cloud_firestore.FirestoreMessageCodec._kDocumentId*/get _kDocumentId() {
      return 139;
    },
    /*cloud_firestore.FirestoreMessageCodec._kFieldValueCodes*/get _kFieldValueCodes() {
      return C23 || CT.C23;
    },
    /*cloud_firestore.FirestoreMessageCodec._kFieldPathCodes*/get _kFieldPathCodes() {
      return C24 || CT.C24;
    }
  });
  const latitude$ = dart.privateName(cloud_firestore, "GeoPoint.latitude");
  const longitude$ = dart.privateName(cloud_firestore, "GeoPoint.longitude");
  cloud_firestore.GeoPoint = class GeoPoint extends core.Object {
    get latitude() {
      return this[latitude$];
    }
    set latitude(value) {
      super.latitude = value;
    }
    get longitude() {
      return this[longitude$];
    }
    set longitude(value) {
      super.longitude = value;
    }
    _equals(o) {
      if (o == null) return false;
      return cloud_firestore.GeoPoint.is(o) && o.latitude == this.latitude && o.longitude == this.longitude;
    }
    get hashCode() {
      return ui.hashValues(this.latitude, this.longitude);
    }
  };
  (cloud_firestore.GeoPoint.new = function(latitude, longitude) {
    this[latitude$] = latitude;
    this[longitude$] = longitude;
    ;
  }).prototype = cloud_firestore.GeoPoint.prototype;
  dart.addTypeTests(cloud_firestore.GeoPoint);
  dart.setLibraryUri(cloud_firestore.GeoPoint, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.GeoPoint, () => ({
    __proto__: dart.getFields(cloud_firestore.GeoPoint.__proto__),
    latitude: dart.finalFieldType(core.double),
    longitude: dart.finalFieldType(core.double)
  }));
  dart.defineExtensionMethods(cloud_firestore.GeoPoint, ['_equals']);
  dart.defineExtensionAccessors(cloud_firestore.GeoPoint, ['hashCode']);
  const documents = dart.privateName(cloud_firestore, "QuerySnapshot.documents");
  const documentChanges = dart.privateName(cloud_firestore, "QuerySnapshot.documentChanges");
  const metadata = dart.privateName(cloud_firestore, "QuerySnapshot.metadata");
  cloud_firestore.QuerySnapshot = class QuerySnapshot extends core.Object {
    get documents() {
      return this[documents];
    }
    set documents(value) {
      super.documents = value;
    }
    get documentChanges() {
      return this[documentChanges];
    }
    set documentChanges(value) {
      super.documentChanges = value;
    }
    get metadata() {
      return this[metadata];
    }
    set metadata(value) {
      super.metadata = value;
    }
  };
  (cloud_firestore.QuerySnapshot.__ = function(data, firestore) {
    this[documents] = ListOfDocumentSnapshot().generate(core.int._check(dart.dload(data[$_get]("documents"), 'length')), dart.fn(index => new cloud_firestore.DocumentSnapshot.__(core.String._check(dart.dsend(data[$_get]("paths"), '_get', [index])), cloud_firestore._asStringKeyedMap(core.Map._check(dart.dsend(data[$_get]("documents"), '_get', [index]))), new cloud_firestore.SnapshotMetadata.__(core.bool._check(dart.dsend(dart.dsend(data[$_get]("metadatas"), '_get', [index]), '_get', ["hasPendingWrites"])), core.bool._check(dart.dsend(dart.dsend(data[$_get]("metadatas"), '_get', [index]), '_get', ["isFromCache"]))), firestore), intToDocumentSnapshot()));
    this[documentChanges] = ListOfDocumentChange().generate(core.int._check(dart.dload(data[$_get]("documentChanges"), 'length')), dart.fn(index => new cloud_firestore.DocumentChange.__(core.Map._check(dart.dsend(data[$_get]("documentChanges"), '_get', [index])), firestore), intToDocumentChange()));
    this[metadata] = new cloud_firestore.SnapshotMetadata.__(core.bool._check(dart.dsend(data[$_get]("metadata"), '_get', ["hasPendingWrites"])), core.bool._check(dart.dsend(data[$_get]("metadata"), '_get', ["isFromCache"])));
    ;
  }).prototype = cloud_firestore.QuerySnapshot.prototype;
  dart.addTypeTests(cloud_firestore.QuerySnapshot);
  dart.setLibraryUri(cloud_firestore.QuerySnapshot, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.QuerySnapshot, () => ({
    __proto__: dart.getFields(cloud_firestore.QuerySnapshot.__proto__),
    documents: dart.finalFieldType(core.List$(cloud_firestore.DocumentSnapshot)),
    documentChanges: dart.finalFieldType(core.List$(cloud_firestore.DocumentChange)),
    metadata: dart.finalFieldType(cloud_firestore.SnapshotMetadata)
  }));
  const hasPendingWrites$ = dart.privateName(cloud_firestore, "SnapshotMetadata.hasPendingWrites");
  const isFromCache$ = dart.privateName(cloud_firestore, "SnapshotMetadata.isFromCache");
  cloud_firestore.SnapshotMetadata = class SnapshotMetadata extends core.Object {
    get hasPendingWrites() {
      return this[hasPendingWrites$];
    }
    set hasPendingWrites(value) {
      super.hasPendingWrites = value;
    }
    get isFromCache() {
      return this[isFromCache$];
    }
    set isFromCache(value) {
      super.isFromCache = value;
    }
  };
  (cloud_firestore.SnapshotMetadata.__ = function(hasPendingWrites, isFromCache) {
    this[hasPendingWrites$] = hasPendingWrites;
    this[isFromCache$] = isFromCache;
    ;
  }).prototype = cloud_firestore.SnapshotMetadata.prototype;
  dart.addTypeTests(cloud_firestore.SnapshotMetadata);
  dart.setLibraryUri(cloud_firestore.SnapshotMetadata, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.SnapshotMetadata, () => ({
    __proto__: dart.getFields(cloud_firestore.SnapshotMetadata.__proto__),
    hasPendingWrites: dart.finalFieldType(core.bool),
    isFromCache: dart.finalFieldType(core.bool)
  }));
  const _seconds$ = dart.privateName(cloud_firestore, "_seconds");
  const _nanoseconds$ = dart.privateName(cloud_firestore, "_nanoseconds");
  cloud_firestore.Timestamp = class Timestamp extends core.Object {
    static fromMillisecondsSinceEpoch(milliseconds) {
      let seconds = (dart.notNull(milliseconds) / 1000)[$floor]();
      let nanoseconds = (dart.notNull(milliseconds) - seconds * 1000) * 1000000;
      return new cloud_firestore.Timestamp.new(seconds, nanoseconds);
    }
    static fromMicrosecondsSinceEpoch(microseconds) {
      let seconds = (dart.notNull(microseconds) / 1000000)[$floor]();
      let nanoseconds = (dart.notNull(microseconds) - seconds * 1000000) * 1000;
      return new cloud_firestore.Timestamp.new(seconds, nanoseconds);
    }
    static fromDate(date) {
      return cloud_firestore.Timestamp.fromMicrosecondsSinceEpoch(date.microsecondsSinceEpoch);
    }
    static now() {
      return cloud_firestore.Timestamp.fromMicrosecondsSinceEpoch(new core.DateTime.now().microsecondsSinceEpoch);
    }
    get seconds() {
      return this[_seconds$];
    }
    get nanoseconds() {
      return this[_nanoseconds$];
    }
    get millisecondsSinceEpoch() {
      return (dart.notNull(this.seconds) * 1000 + dart.notNull(this.nanoseconds) / 1000000)[$floor]();
    }
    get microsecondsSinceEpoch() {
      return (dart.notNull(this.seconds) * 1000000 + dart.notNull(this.nanoseconds) / 1000)[$floor]();
    }
    toDate() {
      return new core.DateTime.fromMicrosecondsSinceEpoch(this.microsecondsSinceEpoch);
    }
    get hashCode() {
      return ui.hashValues(this.seconds, this.nanoseconds);
    }
    _equals(o) {
      if (o == null) return false;
      return cloud_firestore.Timestamp.is(o) && o.seconds == this.seconds && o.nanoseconds == this.nanoseconds;
    }
    compareTo(other) {
      cloud_firestore.Timestamp._check(other);
      if (this.seconds == other.seconds) {
        return this.nanoseconds[$compareTo](other.nanoseconds);
      }
      return this.seconds[$compareTo](other.seconds);
    }
    toString() {
      return "Timestamp(seconds=" + dart.str(this.seconds) + ", nanoseconds=" + dart.str(this.nanoseconds) + ")";
    }
    static _validateRange(seconds, nanoseconds) {
      cloud_firestore._check(dart.notNull(nanoseconds) >= 0, "nanoseconds", nanoseconds);
      cloud_firestore._check(dart.notNull(nanoseconds) < 1000000000, "nanoseconds", nanoseconds);
      cloud_firestore._check(dart.notNull(seconds) >= -62135596800.0, "seconds", seconds);
      cloud_firestore._check(dart.notNull(seconds) < 253402300800.0, "seconds", seconds);
    }
  };
  (cloud_firestore.Timestamp.new = function(_seconds, _nanoseconds) {
    this[_seconds$] = _seconds;
    this[_nanoseconds$] = _nanoseconds;
    cloud_firestore.Timestamp._validateRange(this[_seconds$], this[_nanoseconds$]);
  }).prototype = cloud_firestore.Timestamp.prototype;
  dart.addTypeTests(cloud_firestore.Timestamp);
  cloud_firestore.Timestamp[dart.implements] = () => [core.Comparable$(cloud_firestore.Timestamp)];
  dart.setMethodSignature(cloud_firestore.Timestamp, () => ({
    __proto__: dart.getMethods(cloud_firestore.Timestamp.__proto__),
    toDate: dart.fnType(core.DateTime, []),
    compareTo: dart.fnType(core.int, [core.Object]),
    [$compareTo]: dart.fnType(core.int, [core.Object])
  }));
  dart.setGetterSignature(cloud_firestore.Timestamp, () => ({
    __proto__: dart.getGetters(cloud_firestore.Timestamp.__proto__),
    seconds: core.int,
    nanoseconds: core.int,
    millisecondsSinceEpoch: core.int,
    microsecondsSinceEpoch: core.int
  }));
  dart.setLibraryUri(cloud_firestore.Timestamp, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.Timestamp, () => ({
    __proto__: dart.getFields(cloud_firestore.Timestamp.__proto__),
    [_seconds$]: dart.finalFieldType(core.int),
    [_nanoseconds$]: dart.finalFieldType(core.int)
  }));
  dart.defineExtensionMethods(cloud_firestore.Timestamp, ['_equals', 'compareTo', 'toString']);
  dart.defineExtensionAccessors(cloud_firestore.Timestamp, ['hashCode']);
  dart.defineLazy(cloud_firestore.Timestamp, {
    /*cloud_firestore.Timestamp._kStartOfTime*/get _kStartOfTime() {
      return -62135596800.0;
    },
    /*cloud_firestore.Timestamp._kEndOfTime*/get _kEndOfTime() {
      return 253402300800.0;
    }
  });
  const _pendingResults = dart.privateName(cloud_firestore, "_pendingResults");
  const _transactionId$ = dart.privateName(cloud_firestore, "_transactionId");
  const _get = dart.privateName(cloud_firestore, "_get");
  const _delete = dart.privateName(cloud_firestore, "_delete");
  const _update = dart.privateName(cloud_firestore, "_update");
  const _set = dart.privateName(cloud_firestore, "_set");
  cloud_firestore.Transaction = class Transaction extends core.Object {
    [_finish]() {
      return async.Future.wait(dart.void, this[_pendingResults]);
    }
    get(documentReference) {
      let result = this[_get](documentReference);
      this[_pendingResults][$add](result);
      return result;
    }
    [_get](documentReference) {
      return async.async(cloud_firestore.DocumentSnapshot, (function* _get() {
        let t0;
        let result = (yield cloud_firestore.Firestore.channel.invokeMapMethod(core.String, dart.dynamic, "Transaction#get", new (IdentityMapOfString$dynamic()).from(["app", this[_firestore$].app.name, "transactionId", this[_transactionId$], "path", documentReference.path])));
        if (result != null) {
          return new cloud_firestore.DocumentSnapshot.__(documentReference.path, MapOfString$dynamic()._check((t0 = result[$_get]("data"), t0 == null ? null : dart.dgsend(t0, [core.String, dart.dynamic], 'cast', []))), new cloud_firestore.SnapshotMetadata.__(core.bool._check(dart.dsend(result[$_get]("metadata"), '_get', ["hasPendingWrites"])), core.bool._check(dart.dsend(result[$_get]("metadata"), '_get', ["isFromCache"]))), this[_firestore$]);
        } else {
          return null;
        }
      }).bind(this));
    }
    delete(documentReference) {
      let result = this[_delete](documentReference);
      this[_pendingResults][$add](result);
      return result;
    }
    [_delete](documentReference) {
      return async.async(dart.void, (function* _delete() {
        return cloud_firestore.Firestore.channel.invokeMethod(dart.void, "Transaction#delete", new (IdentityMapOfString$dynamic()).from(["app", this[_firestore$].app.name, "transactionId", this[_transactionId$], "path", documentReference.path]));
      }).bind(this));
    }
    update(documentReference, data) {
      return async.async(dart.void, (function* update() {
        let result = this[_update](documentReference, data);
        this[_pendingResults][$add](result);
        return result;
      }).bind(this));
    }
    [_update](documentReference, data) {
      return async.async(dart.void, (function* _update() {
        return cloud_firestore.Firestore.channel.invokeMethod(dart.void, "Transaction#update", new (IdentityMapOfString$dynamic()).from(["app", this[_firestore$].app.name, "transactionId", this[_transactionId$], "path", documentReference.path, "data", data]));
      }).bind(this));
    }
    set(documentReference, data) {
      let result = this[_set](documentReference, data);
      this[_pendingResults][$add](result);
      return result;
    }
    [_set](documentReference, data) {
      return async.async(dart.void, (function* _set() {
        return cloud_firestore.Firestore.channel.invokeMethod(dart.void, "Transaction#set", new (IdentityMapOfString$dynamic()).from(["app", this[_firestore$].app.name, "transactionId", this[_transactionId$], "path", documentReference.path, "data", data]));
      }).bind(this));
    }
  };
  (cloud_firestore.Transaction.new = function(_transactionId, _firestore) {
    this[_pendingResults] = JSArrayOfFuture().of([]);
    this[_transactionId$] = _transactionId;
    this[_firestore$] = _firestore;
    ;
  }).prototype = cloud_firestore.Transaction.prototype;
  dart.addTypeTests(cloud_firestore.Transaction);
  dart.setMethodSignature(cloud_firestore.Transaction, () => ({
    __proto__: dart.getMethods(cloud_firestore.Transaction.__proto__),
    [_finish]: dart.fnType(async.Future$(dart.void), []),
    get: dart.fnType(async.Future$(cloud_firestore.DocumentSnapshot), [cloud_firestore.DocumentReference]),
    [_get]: dart.fnType(async.Future$(cloud_firestore.DocumentSnapshot), [cloud_firestore.DocumentReference]),
    delete: dart.fnType(async.Future$(dart.void), [cloud_firestore.DocumentReference]),
    [_delete]: dart.fnType(async.Future$(dart.void), [cloud_firestore.DocumentReference]),
    update: dart.fnType(async.Future$(dart.void), [cloud_firestore.DocumentReference, core.Map$(core.String, dart.dynamic)]),
    [_update]: dart.fnType(async.Future$(dart.void), [cloud_firestore.DocumentReference, core.Map$(core.String, dart.dynamic)]),
    set: dart.fnType(async.Future$(dart.void), [cloud_firestore.DocumentReference, core.Map$(core.String, dart.dynamic)]),
    [_set]: dart.fnType(async.Future$(dart.void), [cloud_firestore.DocumentReference, core.Map$(core.String, dart.dynamic)])
  }));
  dart.setLibraryUri(cloud_firestore.Transaction, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.Transaction, () => ({
    __proto__: dart.getFields(cloud_firestore.Transaction.__proto__),
    [_transactionId$]: dart.fieldType(core.int),
    [_firestore$]: dart.fieldType(cloud_firestore.Firestore),
    [_pendingResults]: dart.fieldType(core.List$(async.Future))
  }));
  const _actions = dart.privateName(cloud_firestore, "_actions");
  const _committed = dart.privateName(cloud_firestore, "_committed");
  const _handle = dart.privateName(cloud_firestore, "_handle");
  cloud_firestore.WriteBatch = class WriteBatch extends core.Object {
    commit() {
      return async.async(dart.void, (function* commit() {
        if (!dart.test(this[_committed])) {
          this[_committed] = true;
          yield async.Future.wait(dart.dynamic, this[_actions]);
          yield cloud_firestore.Firestore.channel.invokeMethod(dart.void, "WriteBatch#commit", new (IdentityMapOfString$dynamic()).from(["handle", (yield this[_handle])]));
        } else {
          dart.throw(new core.StateError.new("This batch has already been committed."));
        }
      }).bind(this));
    }
    delete(document) {
      if (!dart.test(this[_committed])) {
        this[_handle].then(core.Null, dart.fn(handle => {
          this[_actions][$add](cloud_firestore.Firestore.channel.invokeMethod(dart.void, "WriteBatch#delete", new (IdentityMapOfString$dynamic()).from(["app", this[_firestore$].app.name, "handle", handle, "path", document.path])));
        }, dynamicToNull()));
      } else {
        dart.throw(new core.StateError.new("This batch has been committed and can no longer be changed."));
      }
    }
    setData(document, data, opts) {
      let merge = opts && 'merge' in opts ? opts.merge : false;
      if (!dart.test(this[_committed])) {
        this[_handle].then(core.Null, dart.fn(handle => {
          this[_actions][$add](cloud_firestore.Firestore.channel.invokeMethod(dart.void, "WriteBatch#setData", new (IdentityMapOfString$dynamic()).from(["app", this[_firestore$].app.name, "handle", handle, "path", document.path, "data", data, "options", new (IdentityMapOfString$bool()).from(["merge", merge])])));
        }, dynamicToNull()));
      } else {
        dart.throw(new core.StateError.new("This batch has been committed and can no longer be changed."));
      }
    }
    updateData(document, data) {
      if (!dart.test(this[_committed])) {
        this[_handle].then(core.Null, dart.fn(handle => {
          this[_actions][$add](cloud_firestore.Firestore.channel.invokeMethod(dart.void, "WriteBatch#updateData", new (IdentityMapOfString$dynamic()).from(["app", this[_firestore$].app.name, "handle", handle, "path", document.path, "data", data])));
        }, dynamicToNull()));
      } else {
        dart.throw(new core.StateError.new("This batch has been committed and can no longer be changed."));
      }
    }
  };
  (cloud_firestore.WriteBatch.__ = function(_firestore) {
    this[_actions] = JSArrayOfFuture().of([]);
    this[_committed] = false;
    this[_firestore$] = _firestore;
    this[_handle] = cloud_firestore.Firestore.channel.invokeMethod(dart.dynamic, "WriteBatch#create", new (IdentityMapOfString$dynamic()).from(["app", _firestore.app.name]));
    ;
  }).prototype = cloud_firestore.WriteBatch.prototype;
  dart.addTypeTests(cloud_firestore.WriteBatch);
  dart.setMethodSignature(cloud_firestore.WriteBatch, () => ({
    __proto__: dart.getMethods(cloud_firestore.WriteBatch.__proto__),
    commit: dart.fnType(async.Future$(dart.void), []),
    delete: dart.fnType(dart.void, [cloud_firestore.DocumentReference]),
    setData: dart.fnType(dart.void, [cloud_firestore.DocumentReference, core.Map$(core.String, dart.dynamic)], {merge: core.bool}, {}),
    updateData: dart.fnType(dart.void, [cloud_firestore.DocumentReference, core.Map$(core.String, dart.dynamic)])
  }));
  dart.setLibraryUri(cloud_firestore.WriteBatch, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.WriteBatch, () => ({
    __proto__: dart.getFields(cloud_firestore.WriteBatch.__proto__),
    [_firestore$]: dart.finalFieldType(cloud_firestore.Firestore),
    [_handle]: dart.fieldType(async.Future),
    [_actions]: dart.finalFieldType(core.List$(async.Future)),
    [_committed]: dart.fieldType(core.bool)
  }));
  let C25;
  let C26;
  let C27;
  cloud_firestore.Source = class Source extends core.Object {
    toString() {
      return this[_name$];
    }
  };
  (cloud_firestore.Source.new = function(index, _name) {
    this.index = index;
    this[_name$] = _name;
    ;
  }).prototype = cloud_firestore.Source.prototype;
  dart.addTypeTests(cloud_firestore.Source);
  dart.setLibraryUri(cloud_firestore.Source, "package:cloud_firestore/cloud_firestore.dart");
  dart.setFieldSignature(cloud_firestore.Source, () => ({
    __proto__: dart.getFields(cloud_firestore.Source.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(cloud_firestore.Source, ['toString']);
  cloud_firestore.Source.serverAndCache = C2 || CT.C2;
  cloud_firestore.Source.server = C25 || CT.C25;
  cloud_firestore.Source.cache = C26 || CT.C26;
  cloud_firestore.Source.values = C27 || CT.C27;
  cloud_firestore._asStringKeyedMap = function _asStringKeyedMap(map) {
    if (map == null) return null;
    if (MapOfString$dynamic().is(map)) {
      return map;
    } else {
      return LinkedHashMapOfString$dynamic().from(map);
    }
  };
  cloud_firestore._getSourceString = function _getSourceString(source) {
    if (!(source != null)) dart.assertFailed(null, "org-dartlang-app:///packages/cloud_firestore/src/source.dart", 29, 10, "source != null");
    if (dart.equals(source, cloud_firestore.Source.server)) {
      return "server";
    }
    if (dart.equals(source, cloud_firestore.Source.cache)) {
      return "cache";
    }
    return "default";
  };
  cloud_firestore._check = function _check(expr, name, value) {
    if (!dart.test(expr)) {
      dart.throw(new core.ArgumentError.new("Timestamp " + dart.str(name) + " out of range: " + dart.str(value)));
    }
  };
  dart.defineLazy(cloud_firestore, {
    /*cloud_firestore._kThousand*/get _kThousand() {
      return 1000;
    },
    /*cloud_firestore._kMillion*/get _kMillion() {
      return 1000000;
    },
    /*cloud_firestore._kBillion*/get _kBillion() {
      return 1000000000;
    }
  });
  dart.trackLibraries("packages/cloud_firestore/cloud_firestore", {
    "package:cloud_firestore/src/utils/auto_id_generator.dart": auto_id_generator,
    "package:cloud_firestore/cloud_firestore.dart": cloud_firestore
  }, {
    "package:cloud_firestore/cloud_firestore.dart": ["src/blob.dart", "src/collection_reference.dart", "src/document_change.dart", "src/document_reference.dart", "src/document_snapshot.dart", "src/field_path.dart", "src/field_value.dart", "src/firestore.dart", "src/firestore_message_codec.dart", "src/geo_point.dart", "src/query.dart", "src/query_snapshot.dart", "src/snapshot_metadata.dart", "src/timestamp.dart", "src/transaction.dart", "src/write_batch.dart", "src/source.dart"]
  }, '{"version":3,"sourceRoot":"","sources":["src/utils/auto_id_generator.dart","src/blob.dart","src/query.dart","src/collection_reference.dart","src/document_change.dart","src/document_reference.dart","src/document_snapshot.dart","src/field_path.dart","src/field_value.dart","src/firestore.dart","src/firestore_message_codec.dart","src/geo_point.dart","src/query_snapshot.dart","src/snapshot_metadata.dart","src/timestamp.dart","src/transaction.dart","src/write_batch.dart","src/source.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAwBuB,yBAAe;AACxB,sBAAY,AAAkB;AAExC,eAAS,IAAI,GAAG,AAAE,CAAD,OAAsB,IAAF,AAAE,CAAC,GAAH;AAC8B,QAAjE,AAAa,YAAD,OAAO,AAAiB,2DAAC,AAAQ,kDAAQ,SAAS;;AAGhE,YAAO,AAAa,aAAD;IACrB;;;;EACF;;;;MAjBmB,iDAAe;;;MAEZ,mDAAiB;;;MAGjB,yCAAO;YAAG;;;;;;;;;ICZd;;;;;;;UAGS;AACrB,YAAM,AAAQ,yBAAd,KAAK,eAC0B,qBAAO,AAAM,KAAD,QAAQ;IAAM;;AAGzC,yBAAS;IAAM;;;IAVnB;;EAAM;;;;;;;;;;;;;;;;;;;;;ICiBN;;;;;;;AAMI,YAAA,AAAgB,8BAAK;IAAI;0BAEE;;AAC7C,YAAa,0CACA,mCACQ,0CACH,mCACN,yCAAmC,qCACjB,oBAAc,YAAO,UAAU;IAG/D;;;AAGE,gDAAiC;MAC7B,YAAwB,0CACxB,QAAQ;;IAEd;;UAIsC;AACpC,YAAO,AAAuB,sBAAD,IAAI;AACrB;AAGoB;AA0B/B,MAzBD,aAAW,uDACC;AAU+B,UATvC,UAAoB,AAAQ,AAS1B,yDARA,6BACiB,0CACf,OAAO,AAAU,AAAI,yBACrB,QAAQ,cACR,qBAAqB,0BACrB,cAAc,mBACd,0BAA0B,sBAAsB,mBAExC,QAAS,iCAAW,MAAM;AAGpC,UAFF,AAAQ,OAAD,iBAAM,QAAK;AAC8B,YAApC,AAAe,iDAAC,MAAM,EAAI,UAAU;;oCAGxC;AAON,UANF,AAAQ,OAAD,iBAAM,QAAK;AAIf,YAHD,MAAgB,AAAQ,0DACtB,kBACiB,0CAAC,UAAU,MAAM;AAEI,YAA9B,AAAgB,mDAAO,MAAM;UACxC;;AAGL,YAAO,AAAW,WAAD;IACnB;;UAIY;AADsB;AAEhC,cAAO,AAAO,MAAD,IAAI;AACW,oBACxB,MAAgB,AAAQ,6EAC1B,sBACiB,0CACf,OAAO,AAAU,AAAI,yBACrB,QAAQ,cACR,qBAAqB,0BACrB,cAAc,mBACd,UAAU,iCAAiB,MAAM;AAGrC,cAAqB,sCAAE,IAAI,EAAE;MAC/B;;;AAII,YAAoB,4CAAE,gBAAW;IAAgB;UAc3C;UACA;UACA;UACA;UACA;UACA;UACA;UACM;UACA;UACT;AAEL,YAAa,AAAU,OAAhB,KAAK,gBAAoB,6BAAN,KAAK,sBAC3B;AAEwB;AACF,uBAAW,uCACR,AAAW,yBAAC;AAEzC,eAAK,aAAqB,OAAc,UAAkB;AACpC,wBAAqB,CAAC,KAAK,EAAE,QAAQ,EAAE,KAAK;AAChE,uBACI,AACK,AACA,UAFK,SACC,QAAe,QAAS,AAAS,QAAD,QAAQ,SAAS,EAAE,IAAI,gDAElE,AAAoD,wBAAxC,SAAS;AACA,QAAzB,AAAW,UAAD,OAAK,SAAS;;;AAG1B,UAAI,SAAS,IAAI,MAAM,AAAY,AAAwB,YAAxB,CAAC,KAAK,EAAE,MAAM,SAAS;AAC1D,UAAI,UAAU,IAAI,MAAM,AAAY,AAAwB,YAAxB,CAAC,KAAK,EAAE,KAAK,UAAU;AAC3D,UAAI,mBAAmB,IAAI,MACzB,AAAY,AAAkC,YAAlC,CAAC,KAAK,EAAE,MAAM,mBAAmB;AAC/C,UAAI,aAAa,IAAI,MAAM,AAAY,AAA2B,YAA3B,CAAC,KAAK,EAAE,KAAK,aAAa;AACjE,UAAI,sBAAsB,IAAI,MAC5B,AAAY,AAAqC,YAArC,CAAC,KAAK,EAAE,MAAM,sBAAsB;AAClD,UAAI,aAAa,IAAI,MACnB,AAAY,AAAwC,YAAxC,CAAC,KAAK,EAAE,kBAAkB,aAAa;AACrD,UAAI,gBAAgB,IAAI,MACtB,AAAY,AAA+C,YAA/C,CAAC,KAAK,EAAE,sBAAsB,gBAAgB;AAC5D,UAAI,OAAO,IAAI,MAAM,AAAY,AAAsB,YAAtB,CAAC,KAAK,EAAE,MAAM,OAAO;AACtD,UAAI,MAAM,IAAI;AACZ,uBACI,MAAM,qBACN,qCACA;AAC2B,QAA/B,AAAY,YAAA,CAAC,KAAK,EAAE,MAAM;;AAG5B,YAAO,2BAAqC,0CAAC,SAAS,UAAU;IAClE;YAYsB;UAAa;AACjC,YAAO,AAAc,KAAT,IAAI,QAAQ,UAAU,IAAI;AACtC,YAAa,AAAU,OAAhB,KAAK,gBAAoB,6BAAN,KAAK,sBAC3B;AAEsB,mBAAO,uCACJ,AAAW,yBAAC;AAErB,kBAAiB,CAAC,KAAK,EAAE,UAAU;AACvD,qBAAO,AAAO,AAAgD,MAAjD,SAAO,QAAe,QAAe,YAAN,KAAK,EAAI,AAAI,IAAA,QAAC,kDACtD,AAA6C,sBAAnC,KAAK;AAEnB,qBAAO,AAQN;AAPC,YAAU,YAAN,KAAK,EAAc;AACrB,gBAAO,aAAE,AAAY,gCAAY,oCAC7B,AAAY,gCAAY,iCACxB,AAAY,gCAAY,kCACxB,AAAY,gCAAY;;AAE9B,cAAO;6CACN,AACC,2EACA;AAEa,MAAjB,AAAO,MAAD,OAAK,KAAK;AAChB,YAAO,2BAAqC,0CAAC,WAAW,MAAM;IAChE;uBAgB0C;AACxC,YAAO,AAAiB,gBAAD,IAAI;AAC3B,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,qBAAM,AAEG,AACA,uCAFoB,AAAW,yBAAC,qBAC1B,QAAe,QAAiB,YAAR,AAAI,IAAA,QAAC,IAAgB,oFAC5C,AACZ,wDACA;AACJ,YAAO,2BAAqC,0CAC1C,sBAAuC,0CACrC,MAAM,AAAiB,gBAAD,aACtB,QAAQ,AAAiB,AAAU,gBAAX,iBACxB,QAAQ,AAAiB,gBAAD;IAG9B;oBAgBuC;AACrC,YAAO,AAAiB,gBAAD,IAAI;AAC3B,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,qBAAM,AAEG,AACA,uCAFoB,AAAW,yBAAC,qBAC1B,QAAe,QAAiB,YAAR,AAAI,IAAA,QAAC,IAAgB,oFAC5C,AACZ,qDACA;AACJ,YAAO,2BAAqC,0CAC1C,mBAAoC,0CAClC,MAAM,AAAiB,gBAAD,aACtB,QAAQ,AAAiB,AAAU,gBAAX,iBACxB,QAAQ,AAAiB,gBAAD;IAG9B;eAU+B;AAC7B,YAAO,AAAO,MAAD,IAAI;AACjB,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,YAAO,2BAAqC,0CAAC,cAAc,MAAM;IACnE;YAU4B;AAC1B,YAAO,AAAO,MAAD,IAAI;AACjB,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,YAAO,2BAAqC,0CAAC,WAAW,MAAM;IAChE;kBAgBqC;AACnC,YAAO,AAAiB,gBAAD,IAAI;AAC3B,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,qBAAM,AAEG,AACA,uCAFoB,AAAW,yBAAC,qBAC1B,QAAe,QAAiB,YAAR,AAAI,IAAA,QAAC,IAAgB,oFAC5C,AACZ,mDACA;AACJ,YAAO,2BAAqC,0CAC1C,iBAAkC,0CAChC,MAAM,AAAiB,gBAAD,aACtB,QAAQ,AAAiB,AAAU,gBAAX,iBACxB,QAAQ,AAAiB,gBAAD;IAG9B;UAU0B;AACxB,YAAO,AAAO,MAAD,IAAI;AACjB,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,YAAO,2BAAqC,0CAAC,SAAS,MAAM;IAC9D;sBAgByC;AACvC,YAAO,AAAiB,gBAAD,IAAI;AAC3B,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,qBAAM,AAEG,AACA,uCAFoB,AAAW,yBAAC,qBAC1B,QAAe,QAAiB,YAAR,AAAI,IAAA,QAAC,IAAgB,oFAC5C,AACZ,uDACA;AACJ,YAAO,2BAAqC,0CAC1C,qBAAsC,0CACpC,MAAM,AAAiB,gBAAD,aACtB,QAAQ,AAAiB,AAAU,gBAAX,iBACxB,QAAQ,AAAiB,gBAAD;IAG9B;cAU8B;AAC5B,YAAO,AAAO,MAAD,IAAI;AACjB,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,WAAO,WAAC,AAAY,gCAAY;AAChC,YAAO,2BAAqC,0CAAC,aAAa,MAAM;IAClE;UAIgB;AACd,WAAO,WAAC,AAAY,gCAAY;AAChC,YAAO,2BAAqC,0CAAC,SAAS,MAAM;IAC9D;;;;QA9ZoB;QACO;QAClB;QACgB;IAHL;IAIE,wBAAE,cAAc;IACb,2BAAE,iBAAiB;IAC1B,qBAAa,KAAX,UAAU,QAAV,OAAW,mCAC8B,0CACjD,SAAO,0BAAkD,yBACzD,WAAS,0BAAkD;UAE1D,AAAU,SAAD,IAAI;UACb,AAAe,cAAD,IAAI;;EAAK;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ACPnB,uBAAA,AAAgB,mCAAU,OAAO,AAAgB;IAAI;;;AAMpE,UAA2B,aAAvB,AAAgB,kCAAS;AAC3B,cAAO;;AAET,YAAyB,0CACvB,sBACA,oBAAmB,wBAAkB;IAEzC;;AAImB;IAAK;aAQW;;AACpB;AACb,UAAI,AAAK,IAAD,IAAI;AACG,kBAAsB;AACqB,QAAxD,kBAAU,oBAAoB,wBAAkB,SAAI,GAAG;;AAEkB,QAAzE,mBAAU,oBAAoB,wBAAkB,aAAO,AAAK,IAAD,SAAQ;;AAErE,YAAyB,0CAAE,gBAAW,SAAS;IACjD;QAOmD;AAAtB;AACH,0BAAc;AACP,QAA/B,MAAM,AAAY,WAAD,SAAS,IAAI;AAC9B,cAAO,YAAW;MACpB;;;qDAjDgC,WAAwB;AAC5C,4EAAa,SAAS,kBAAkB,cAAc;;EAAC;;;;;;;;;;;;;;;;;;;;;ICOrE;;4DAXK;;;;EAWL;;;;;;;;;;;;;;;;;;IAsB2B;;;;;;IAOf;;;;;;IAOA;;;;;;IAGa;;;;;;;gDAhCgB,MAAgB;qBACxC,gBAAE,AAAI,IAAA,QAAC;qBACP,gBAAE,AAAI,IAAA,QAAC;IACP,iBAAmB,2DAC1B,AAAI,IAAA,QAAC,UACL,kDAAkB,AAAI,IAAA,QAAC,eACN,yDAAkB,WAAhB,AAAI,IAAA,QAAC,sBAAY,wCAChB,WAAhB,AAAI,IAAA,QAAC,sBAAY,mBACrB,SAAS;IAEN,aAAqB,AAAO,uDAAW,QAAoB,QACvC,eAAX,cAAL,IAAI,GAAe,AAAI,IAAA,QAAC;;EAC/B;;;;;;;;;;;;ICnBQ;;;;;;;UAKS;AACrB,YAAE,AAAiD,sCAAnD,CAAC,KAAqC,YAAZ,AAAE,CAAD,YAAc,mBAAa,AAAE,AAAK,CAAN,SAAS;IAAI;;AAGpD,yBAAS;IAAgB;;;AAI3C,YAA2B,4CACzB,sBACA,oBAAmB,wBAAkB;IAEzC;;AAGmB,YAAA,AAAgB,8BAAK;IAAI;;AAGnB,YAAA,AAAgB;IAAI;YAQH;UAAY;AACpD,YAAiB,AAAQ,2DACvB,6BACiB,0CACf,OAAO,AAAU,AAAI,yBACrB,QAAQ,WACR,QAAQ,IAAI,EACZ,WAAyB,uCAAC,SAAS,KAAK;IAG9C;eAQ6C;AAC3C,YAAiB,AAAQ,2DACvB,gCACiB,0CACf,OAAO,AAAU,AAAI,yBACrB,QAAQ,WACR,QAAQ,IAAI;IAGlB;;UAKqC;AAAT;AACC,oBACvB,MAAgB,AAAQ,6EAC1B,yBACiB,0CACf,OAAO,AAAU,AAAI,yBACrB,QAAQ,WACR,UAAU,iCAAiB,MAAM;AAGrC,cAAwB,4DACtB,AAAI,IAAA,QAAC,UACL,kDAAkB,AAAI,IAAA,QAAC,WACN,yDAAkB,WAAhB,AAAI,IAAA,QAAC,sBAAY,wCAChB,WAAhB,AAAI,IAAA,QAAC,sBAAY,mBACrB;MAEJ;;;AAIE,YAAiB,AAAQ,2DACvB,4BACiB,0CAAC,OAAO,AAAU,AAAI,yBAAM,QAAQ;IAEzD;eAIsC;AACpC,YAAO,AAAU,2BACP,AAAuB,sBAAtB,WAAM,cAAc,UAAO;IAExC;;UAIyC;AACvC,YAAO,AAAuB,sBAAD,IAAI;AACrB;AAGuB;AAwBlC,MAvBD,aAAW,0DACC;AAQ+B,UAPvC,UAAoB,AAAQ,AAO1B,yDANA,yCACiB,0CACf,OAAO,AAAU,AAAI,yBACrB,QAAQ,WACR,0BAA0B,sBAAsB,mBAExC,QAAS,iCAAW,MAAM;AAGpC,UAFF,AAAQ,OAAD,iBAAM,QAAK;AACiC,YAAvC,AAAkB,oDAAC,MAAM,EAAI,UAAU;;oCAG3C;AAON,UANF,AAAQ,OAAD,iBAAM,QAAK;AAIf,YAHD,MAAgB,AAAQ,0DACtB,kBACiB,0CAAC,UAAU,MAAM;AAEO,YAAjC,AAAmB,sDAAO,MAAM;UAC3C;;AAGL,YAAO,AAAW,WAAD;IACnB;;mDAxIyB,WAAwB;IAAxB;IACH,wBAAE,cAAc;UACzB,AAAU,SAAD,IAAI;;EAAK;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ICMJ;;;;;;IAIJ;;;;;;;AAPY,YAAA,AAAW,4BAAS;IAAM;SAUlC;AAAQ,YAAA,AAAI,kBAAC,GAAG;IAAC;;AAGnB,YAAA,AAAM,AAAW,sBAAL;IAAS;;AAG3B,YAAA,AAAK,cAAG;IAAI;;kDAtBP,OAAY,MAAW,UAAe;IAAtC;IAAY;IAAW;IAAe;;EAAW;;;;;;;;;;;;;;;;;;;;;;;;;ICJ3E;;wDAFK;;;;EAEL;;;;;;;;;;;;;;IAOuB;;;;;;;AAIjB;IAA4C;;;IAPzB;;EAAK;;;;;;;;;;;;;;;;;;;;wDCLzB;;;;EAOL;;;;;;;;;;;;;;;;;;;IAQuB;;;;;;IAGP;;;;;;sBAS6B;AACvC,YAAW,mCAAiB,2CAAY,QAAQ;IAAC;uBAQT;AACxC,YAAW,mCAAiB,4CAAa,QAAQ;IAAC;;AAGxB,YAAW,mCAAiB,uCAAQ;IAAK;;AAKnE,YAAW,mCAAiB,gDAAiB;IAAK;qBAItB;AAG9B,YAAa,AAAO,YAAb,KAAK,KAAiB,OAAN,KAAK;AAC5B,UAAU,OAAN,KAAK;AACP,cAAkB,mCAAiB,gDAAiB,KAAK;YACpD,KAAU,YAAN,KAAK;AACd,cAAkB,mCAAiB,iDAAkB,KAAK;;AAE5D,YAAO;IACT;;4CA/CkB,MAAW;IAAX;IAAW;;EAAM;;;;;;;;;;;;;;;;;;;;ICwBjB;;;;;;;UAqBO;AAAM,YAAE,AAAa,8BAAf,CAAC,KAAuB,YAAN,AAAE,CAAD,MAAQ;IAAG;;AAGzC,YAAI,eAAJ;IAAY;eAGM;AACpC,YAAO,AAAK,IAAD,IAAI;AACf,YAA2B,4CAAE,MAAM,AAAK,IAAD,SAAO;IAChD;oBAG6B;AAC3B,YAAO,AAAK,IAAD,IAAI;AACf,WAAO,CAAC,AAAK,IAAD,YAAU,wBAAM;AAC5B,YAAa,0CACA,yBACQ,sBACH,AAAK,IAAD,SAAO;IAE/B;aAGkC;AAChC,YAAO,AAAK,IAAD,IAAI;AACf,YAAyB,0CAAE,MAAM,AAAK,IAAD,SAAO;IAC9C;;AAOsB,YAAW,mCAAE;IAAK;mBAwBjB;UACT;AAF6B;;AAGzC,cAA8B,aAAvB,AAAQ,OAAD,mBAAkB,sBAC5B;AACM,6BAAqC,KAArB,sHAAqB;AACS,QAAxD,AAAoB,sDAAC,aAAa,EAAI,kBAAkB;AAC7B,sBAAS,MAAM,AACrC,6EACG,4BAA6C,0CACnD,OAAO,AAAI,eACX,iBAAiB,aAAa,EAC9B,sBAAsB,AAAQ,OAAD;AAE/B,cAAO,MAAM;sBAAN,OAA2B;MACpC;;sBAGoC;AAAN;AAC5B,cAAO,AAAO,MAAD,IAAI;AAKf,QAJF,MAAM,AACD,0DAAmB,+BAAgD,0CACtE,OAAO,AAAI,eACX,UAAU,MAAM;MAEpB;;;UAGU;UACC;UACF;UACD;AAJa;AAWjB,QANF,MAAM,AAAQ,0DAAmB,sBAAuC,0CACtE,OAAO,AAAI,eACX,sBAAsB,kBAAkB,EACxC,QAAQ,IAAI,EACZ,cAAc,UAAU,EACxB,kBAAkB,cAAc;MAEpC;;;;;QArJuB;IAAY,cAAM,KAAJ,GAAG,QAAH,OAAmB;AACtD,kBAAI,yCAAc;AAsBhB,IArBF,AAAQ,uDAAqB,QAAY;AACvC,UAAI,AAAK,AAAO,IAAR,YAAW;AACG,uBAAyB,qDAAE,AAAK,IAAD,aAAY;AACR,QAAvD,AAAe,AAA2B,iDAAZ,WAAd,AAAK,IAAD,qBAAW,gBAAe,QAAQ;YACjD,KAAI,AAAK,AAAO,IAAR,YAAW;AACD,uBAA4B,2DACnC,WAAd,AAAK,IAAD,qBAAW,WACf,kDAAgC,WAAd,AAAK,IAAD,qBAAW,YAChB,yDAA4B,WAAZ,WAAd,AAAK,IAAD,qBAAW,uBAAY,wCAChB,WAAZ,WAAd,AAAK,IAAD,qBAAW,uBAAY,mBAC/B;AAEwD,QAA1D,AAAkB,AAA2B,oDAAZ,WAAd,AAAK,IAAD,qBAAW,gBAAe,QAAQ;YACpD,KAAI,AAAK,AAAO,IAAR,YAAW;AACd,4CAA8B,WAAd,AAAK,IAAD,qBAAW;AACvB,0BAAc,oCAAY,aAAa,EAAE;AAC7C,sBACV,MAAM,AAAoB,AAAe,sDAAd,aAAa,EAAE,WAAW;AAC9B,QAA3B,MAAM,AAAY,WAAD;AACjB,cAAO,OAAM;;IAEhB;AACkB,IAAnB,yCAAe;EACjB;;;;;;;;;;;;;;;;;;;;MAGuB,kCAAQ;YAAG;;MAOtB,sCAAY;YAAG;;;MAGA,iCAAO;;;MAKqB,yCAAe;YAC5B;;MAEgB,4CAAkB;YAC/B;;MAEH,8CAAoB;YACjC;;MAClB,+CAAqB;YAAG;;;;;;;eCtBP,QAAgB;AAC1C,UAAU,iBAAN,KAAK;AACoB,QAA3B,AAAO,MAAD;AACuC,QAA7C,AAAO,MAAD,UAAU,AAAM,KAAD;YAChB,KAAU,6BAAN,KAAK;AACc,QAA5B,AAAO,MAAD;AACwB,QAA9B,AAAO,MAAD,UAAU,AAAM,KAAD;AACa,QAAlC,AAAO,MAAD,UAAU,AAAM,KAAD;YAChB,KAAU,4BAAN,KAAK;AACa,QAA3B,AAAO,MAAD;AAC2B,QAAjC,AAAO,MAAD,YAAY,AAAM,KAAD;AACW,QAAlC,AAAO,MAAD,YAAY,AAAM,KAAD;YAClB,KAAU,qCAAN,KAAK;AACsB,QAApC,AAAO,MAAD;AACU,sBAAU,AAAK,AAAQ,6BAAQ,AAAM,AAAU,AAAI,KAAf;AACnB,QAAjC,eAAU,MAAM,EAAE,AAAQ,OAAD;AACG,QAA5B,AAAO,MAAD,0CAAc,OAAO;AACX,oBAAQ,AAAK,AAAQ,6BAAQ,AAAM,KAAD;AACnB,QAA/B,eAAU,MAAM,EAAE,AAAM,KAAD;AACG,QAA1B,AAAO,MAAD,0CAAc,KAAK;YACpB,KAAU,wBAAN,KAAK;AACS,QAAvB,AAAO,MAAD;AAC+B,QAArC,eAAU,MAAM,EAAE,AAAM,AAAM,KAAP;AACS,QAAhC,AAAO,MAAD,cAAc,AAAM,KAAD;YACpB,KAAU,8BAAN,KAAK;AACJ,mBAAO,AAAiB,+DAAC,AAAM,KAAD;AACxC,cAAO,AAAK,IAAD,IAAI;AACM,QAArB,AAAO,MAAD,UAAU,IAAI;AACpB,YAAI,AAAM,KAAD,UAAU,MAAM,AAA+B,gBAApB,MAAM,EAAE,AAAM,KAAD;YAC5C,KAAU,6BAAN,KAAK;AACJ,mBAAO,AAAgB,8DAAC,AAAM,KAAD;AACvC,cAAO,AAAK,IAAD,IAAI;AACM,QAArB,AAAO,MAAD,UAAU,IAAI;;AAEW,QAAzB,iBAAW,MAAM,EAAE,KAAK;;IAElC;oBAG4B,MAAiB;AAC3C,cAAQ,IAAI;;;AAER,gBAAgB,8CAA2B,AAAO,MAAD;;;;AAEjD,gBAAO,mCAAU,AAAO,MAAD,aAAa,AAAO,MAAD;;;;AAE1C,gBAAO,kCAAS,AAAO,MAAD,eAAe,AAAO,MAAD;;;;AAEjC,8BAAgB,cAAS,MAAM;AAC5B,wBACT,AAAK,AAAQ,6BAAQ,AAAO,MAAD,cAAc,aAAa;AACxC,oBAAM,wCAAkB,OAAO;AACjC,0BAAY,wCAAe,GAAG;AACpC,2BAAa,cAAS,MAAM;AACzB,qBACT,AAAK,AAAQ,6BAAQ,AAAO,MAAD,cAAc,UAAU;AACvD,gBAAO,AAAU,UAAD,UAAU,IAAI;;;;AAEpB,uBAAS,cAAS,MAAM;AAClB,sBAAQ,AAAO,MAAD,cAAc,MAAM;AAClD,gBAAO,0DAAK,KAAK;;;;AAEG,uCAAQ,eAAU,MAAM;AAC5C,gBAAkB,uCAAW,KAAK;;;;AAEd,uCAAQ,eAAU,MAAM;AAC5C,gBAAkB,wCAAY,KAAK;;;;AAEnC,gBAAkB;;;;AAElB,gBAAkB;;;;AAEL,yCAAQ,eAAU,MAAM;AACrC,gBAAkB,sCAAU,KAAK;;;;AAEvB,sCAAQ,eAAU,MAAM;AAClC,gBAAkB,sCAAU,KAAK;;;;AAEjC,gBAAiB;;;;AAEjB,gBAAa,uBAAgB,IAAI,EAAE,MAAM;;;IAE/C;;;AAjHM;;EAAuB;;;;MAEZ,gDAAU;;;MACV,gDAAU;;;MACV,yDAAmB;;;MACnB,4CAAM;;;MACN,kDAAY;;;MACZ,mDAAa;;;MACb,8CAAQ;;;MACR,uDAAiB;;;MACjB,iDAAW;;;MACX,uDAAiB;;;MACjB,wDAAkB;;;MAClB,kDAAY;;;MAES,uDAAiB;;;MAUjB,sDAAgB;;;;;;;ICxBzC;;;;;;IACA;;;;;;;UAGY;AACrB,YAAE,AAAsC,6BAAxC,CAAC,KAAgB,AAAE,AAAS,CAAV,aAAa,iBAAY,AAAE,AAAU,CAAX,cAAc;IAAS;;AAGnD,2BAAW,eAAU;IAAU;;2CAV/B,UAAe;IAAf;IAAe;;EAAU;;;;;;;;;;;;;;IC2BhB;;;;;;IAIF;;;;;;IAEJ;;;;;;;+CAhCe,MAAgB;sBACtC,kDAAoD,WAAlB,AAAI,IAAA,QAAC,0BAC7C,QAAK,SACiB,2DACT,WAAb,AAAI,IAAA,QAAC,mBAAS,KAAK,KACnB,kDAAmC,WAAjB,AAAI,IAAA,QAAC,uBAAa,KAAK,MACxB,yDACS,WAAP,WAAjB,AAAI,IAAA,QAAC,uBAAa,KAAK,aAAE,wCACD,WAAP,WAAjB,AAAI,IAAA,QAAC,uBAAa,KAAK,aAAE,mBAE3B,SAAS;4BAGG,gDACY,WAAxB,AAAI,IAAA,QAAC,gCAA2B,QAAK,SACjB,sDACG,WAAvB,AAAI,IAAA,QAAC,6BAAmB,KAAK,KAC7B,SAAS;IAGJ,iBAAmB,yDACV,WAAhB,AAAI,IAAA,QAAC,sBAAY,wCACD,WAAhB,AAAI,IAAA,QAAC,sBAAY;;EAClB;;;;;;;;;;;;ICdI;;;;;;IASA;;;;;;;kDAlBa,kBAAuB;IAAvB;IAAuB;;EAAY;;;;;;;;;;;sCCuBV;AACrC,oBAAsC,CAAd,aAAb,YAAY;AACvB,wBAAoD,CAAxB,aAAb,YAAY,IAAG,AAAQ,OAAD;AAC/C,YAAO,mCAAU,OAAO,EAAE,WAAW;IACvC;sCAEiD;AACrC,oBAAqC,CAAb,aAAb,YAAY;AACvB,wBAAmD,CAAvB,aAAb,YAAY,IAAG,AAAQ,OAAD;AAC/C,YAAO,mCAAU,OAAO,EAAE,WAAW;IACvC;oBAEoC;AAClC,YAAiB,sDAA2B,AAAK,IAAD;IAClD;;AAGE,YAAiB,sDACJ,AAAM;IACrB;;AAQmB;IAAQ;;AAEJ;IAAY;;AAG/B,YAAiD,EAAxC,AAAa,aAArB,uBAAmC,aAAZ;IAAgC;;AAGxD,YAAiD,EAAxC,AAAY,aAApB,0BAAkC,aAAZ;IAAiC;;AAG1D,YAAgB,8CAA2B;IAC7C;;AAGoB,2BAAW,cAAS;IAAY;;UAE3B;AACrB,YAAE,AAAqC,8BAAvC,CAAC,KAAiB,AAAE,AAAQ,CAAT,YAAY,gBAAW,AAAE,AAAY,CAAb,gBAAgB;IAAW;;uCAElD;AACtB,UAAI,AAAQ,gBAAG,AAAM,KAAD;AAClB,cAAO,AAAY,8BAAU,AAAM,KAAD;;AAGpC,YAAO,AAAQ,0BAAU,AAAM,KAAD;IAChC;;AAIE,YAAO,AAAuD,iCAAnC,gBAAO,4BAAe,oBAAW;IAC9D;0BAE+B,SAAa;AACU,MAApD,uBAAmB,aAAZ,WAAW,KAAI,GAAG,eAAe,WAAW;AACQ,MAA3D,uBAAmB,aAAZ,WAAW,gBAAc,eAAe,WAAW;AACN,MAApD,uBAAe,aAAR,OAAO,qBAAmB,WAAW,OAAO;AACF,MAAjD,uBAAe,aAAR,OAAO,oBAAgB,WAAW,OAAO;IAClD;;4CArEe,UAAe;IAAf;IAAe;AACU,IAAtC,yCAAe,iBAAU;EAC3B;;;;;;;;;;;;;;;;;;;;;;;;;MA0BiB,uCAAa;;;MACb,qCAAW;;;;;;;;;;;;ACzCF,YAAO,8BAAW;IAAgB;QAGb;AACd,mBAAS,WAAK,iBAAiB;AACnC,MAA3B,AAAgB,4BAAI,MAAM;AAC1B,YAAO,OAAM;IACf;WAEgD;AAAnB;;AACA,sBAAS,MAAgB,AAC/C,6EAAiC,mBAAoC,0CACxE,OAAO,AAAW,AAAI,4BACtB,iBAAiB,uBACjB,QAAQ,AAAkB,iBAAD;AAE3B,YAAI,MAAM,IAAI;AACZ,gBAAwB,yCACpB,AAAkB,iBAAD,0CACjB,AAAM,MAAA,QAAC,sBAAD,OAAU,4DACC,yDAAoB,WAAlB,AAAM,MAAA,QAAC,sBAAY,wCAChB,WAAlB,AAAM,MAAA,QAAC,sBAAY,mBACvB;;AAEJ,gBAAO;;MAEX;;WAMsC;AACjB,mBAAS,cAAQ,iBAAiB;AAC1B,MAA3B,AAAgB,4BAAI,MAAM;AAC1B,YAAO,OAAM;IACf;cAEuC;AAAnB;AAClB,cAAiB,AACZ,2DAAmB,sBAAuC,0CAC7D,OAAO,AAAW,AAAI,4BACtB,iBAAiB,uBACjB,QAAQ,AAAkB,iBAAD;MAE7B;;WAQsB,mBAAwC;AAD3C;AAEE,qBAAS,cAAQ,iBAAiB,EAAE,IAAI;AAChC,QAA3B,AAAgB,4BAAI,MAAM;AAC1B,cAAO,OAAM;MACf;;cAGsB,mBAAwC;AAD1C;AAElB,cAAiB,AACZ,2DAAmB,sBAAuC,0CAC7D,OAAO,AAAW,AAAI,4BACtB,iBAAiB,uBACjB,QAAQ,AAAkB,iBAAD,OACzB,QAAQ,IAAI;MAEhB;;QASsB,mBAAwC;AACzC,mBAAS,WAAK,iBAAiB,EAAE,IAAI;AAC7B,MAA3B,AAAgB,4BAAI,MAAM;AAC1B,YAAO,OAAM;IACf;WAGsB,mBAAwC;AAD7C;AAEf,cAAiB,AACZ,2DAAmB,mBAAoC,0CAC1D,OAAO,AAAW,AAAI,4BACtB,iBAAiB,uBACjB,QAAQ,AAAkB,iBAAD,OACzB,QAAQ,IAAI;MAEhB;;;8CAjGiB,gBAAqB;IAIhB,wBAAmC;IAJxC;IAAqB;;EAAW;;;;;;;;;;;;;;;;;;;;;;;;;;ACiB9B;AACjB,uBAAK;AACc,UAAjB,mBAAa;AACuB,UAApC,MAAa,gCAAc;AAEyC,UADpE,MAAgB,AAAQ,0DACpB,qBAAsC,0CAAC,WAAU,MAAM;;AAED,UAA1D,WAAM,wBAAW;;MAErB;;WAG8B;AAC5B,qBAAK;AAYD,QAXF,AAAQ,8BAAK,QAAS;AAUnB,UATD,AAAS,qBACG,AAAQ,0DAChB,qBACiB,0CACf,OAAO,AAAW,AAAI,4BACtB,UAAU,MAAM,EAChB,QAAQ,AAAS,QAAD;;;AAO0C,QADlE,WAAM,wBACF;;IAER;YAQ+B,UAA+B;UACpD;AACR,qBAAK;AAcD,QAbF,AAAQ,8BAAK,QAAS;AAYnB,UAXD,AAAS,qBACG,AAAQ,0DAChB,sBACiB,0CACf,OAAO,AAAW,AAAI,4BACtB,UAAU,MAAM,EAChB,QAAQ,AAAS,QAAD,OAChB,QAAQ,IAAI,EACZ,WAAyB,uCAAC,SAAS,KAAK;;;AAOkB,QADlE,WAAM,wBACF;;IAER;eAKkC,UAA+B;AAC/D,qBAAK;AAaD,QAZF,AAAQ,8BAAK,QAAS;AAWnB,UAVD,AAAS,qBACG,AAAQ,0DAChB,yBACiB,0CACf,OAAO,AAAW,AAAI,4BACtB,UAAU,MAAM,EAChB,QAAQ,AAAS,QAAD,OAChB,QAAQ,IAAI;;;AAO8C,QADlE,WAAM,wBACF;;IAER;;4CAjGkB;IAMU,iBAA4B;IAGnD,mBAAa;IATA;IACJ,gBAAY,AAAQ,6DACxB,qBAAsC,0CAAC,OAAO,AAAW,AAAI,UAAL;;EAAW;;;;;;;;;;;;;;;;;;;;;;;ICS/E;;gDAjBK;;;;EAiBL;;;;;;;;;;;;;iEXa6D;AAC3D,QAAI,AAAI,GAAD,IAAI,MAAM,MAAO;AACxB,QAAQ,yBAAJ,GAAG;AACL,YAAO,IAAG;;AAEV,kDAAiC,GAAG;;EAExC;+DWjB+B;AAC7B,UAAO,AAAO,MAAD,IAAI;AACjB,QAAW,YAAP,MAAM,EAAW;AACnB,YAAO;;AAET,QAAW,YAAP,MAAM,EAAW;AACnB,YAAO;;AAET,UAAO;EACT;2CH1BiB,MAAa,MAAU;AACtC,mBAAK,IAAI;AACoD,MAA3D,WAAM,2BAAc,AAAsC,wBAA1B,IAAI,iCAAgB,KAAK;;EAE7D;;MARU,0BAAU;;;MACV,yBAAS;;;MACT,yBAAS","file":"cloud_firestore.ddc.js"}');
  // Exports:
  return {
    src__utils__auto_id_generator: auto_id_generator,
    cloud_firestore: cloud_firestore
  };
});

//# sourceMappingURL=cloud_firestore.ddc.js.map
