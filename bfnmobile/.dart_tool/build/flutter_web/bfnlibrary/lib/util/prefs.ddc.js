define(['dart_sdk', 'packages/shared_preferences/shared_preferences', 'packages/bfnlibrary/data/account', 'packages/bfnlibrary/data/node_info'], function(dart_sdk, packages__shared_preferences__shared_preferences, packages__bfnlibrary__data__account, packages__bfnlibrary__data__node_info) {
  'use strict';
  const core = dart_sdk.core;
  const convert = dart_sdk.convert;
  const async = dart_sdk.async;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const shared_preferences = packages__shared_preferences__shared_preferences.shared_preferences;
  const account = packages__bfnlibrary__data__account.data__account;
  const node_info = packages__bfnlibrary__data__node_info.data__node_info;
  const prefs = Object.create(dart.library);
  const $add = dartx.add;
  const $forEach = dartx.forEach;
  const $length = dartx.length;
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  let NodeInfoToNull = () => (NodeInfoToNull = dart.constFn(dart.fnType(core.Null, [node_info.NodeInfo])))();
  let JSArrayOfNodeInfo = () => (JSArrayOfNodeInfo = dart.constFn(_interceptors.JSArray$(node_info.NodeInfo)))();
  let StringToNull = () => (StringToNull = dart.constFn(dart.fnType(core.Null, [core.String])))();
  let ListOfNodeInfo = () => (ListOfNodeInfo = dart.constFn(core.List$(node_info.NodeInfo)))();
  const CT = Object.create(null);
  prefs.Prefs = class Prefs extends core.Object {
    static saveAccount(account) {
      return async.async(dart.dynamic, function* saveAccount() {
        let prefs = (yield shared_preferences.SharedPreferences.getInstance());
        let map = account.toJson();
        let jx = convert.json.encode(map);
        prefs.setString("account", jx);
        core.print("🌽 🌽 🌽 Account:  SAVED: 🌽: " + dart.str(jx) + " ");
        return null;
      });
    }
    static getAccount() {
      return async.async(account.AccountInfo, function* getAccount() {
        let prefs = (yield shared_preferences.SharedPreferences.getInstance());
        let string = prefs.getString("account");
        if (string == null) {
          return null;
        }
        let jx = convert.json.decode(string);
        let association = new account.AccountInfo.fromJson(core.Map._check(jx));
        core.print("🌽 🌽 🌽 Account: retrieved : 🧩 🧩 🧩 🧩 🧩 " + dart.str(jx));
        return association;
      });
    }
    static saveNode(node) {
      return async.async(dart.dynamic, function* saveNode() {
        let prefs = (yield shared_preferences.SharedPreferences.getInstance());
        let map = node.toJson();
        let jx = convert.json.encode(map);
        prefs.setString("node", jx);
        core.print("🌽 🌽 🌽 Node:  SAVED: 🌽🧩 🧩 🧩 🧩 : " + dart.str(jx) + " ");
        return null;
      });
    }
    static getNode() {
      return async.async(node_info.NodeInfo, function* getNode() {
        let prefs = (yield shared_preferences.SharedPreferences.getInstance());
        let string = prefs.getString("node");
        if (string == null) {
          return null;
        }
        let jx = convert.json.decode(string);
        let association = new node_info.NodeInfo.fromJson(core.Map._check(jx));
        core.print("🌽 🌽 🌽 Node: retrieved : 🧩 🧩 🧩 🧩 🧩 " + dart.str(jx));
        return association;
      });
    }
    static saveNodes(nodes) {
      return async.async(dart.dynamic, function* saveNodes() {
        let prefs = (yield shared_preferences.SharedPreferences.getInstance());
        let list = JSArrayOfString().of([]);
        nodes[$forEach](dart.fn(node => {
          list[$add](convert.json.encode(node));
        }, NodeInfoToNull()));
        prefs.setStringList("nodes", list);
        return null;
      });
    }
    static getNodes() {
      return async.async(ListOfNodeInfo(), function* getNodes() {
        let prefs = (yield shared_preferences.SharedPreferences.getInstance());
        let strings = prefs.getStringList("nodes");
        let list = JSArrayOfNodeInfo().of([]);
        if (strings == null) {
          return null;
        }
        strings[$forEach](dart.fn(s => {
          list[$add](new node_info.NodeInfo.fromJson(core.Map._check(convert.json.decode(s))));
        }, StringToNull()));
        core.print("🌽 🌽 🌽  🧩  🧩  🧩  🧩 nodes: retrieved : 🧩 " + dart.str(list[$length]));
        return list;
      });
    }
    static setDemoString(isDemo) {
      return async.async(dart.void, function* setDemoString() {
        let preferences = (yield shared_preferences.SharedPreferences.getInstance());
        yield preferences.setString("boolKey", isDemo);
        core.print("🔵 🔵 🔵 demo string set to: " + dart.str(isDemo) + " 🍎 🍎 ");
      });
    }
    static getDemoString() {
      return async.async(core.String, function* getDemoString() {
        let preferences = (yield shared_preferences.SharedPreferences.getInstance());
        let b = preferences.getString("boolKey");
        if (b == null) {
          return null;
        } else {
          core.print("🔵 🔵 🔵  demo string retrieved: " + dart.str(b) + " 🍏 🍏 ");
          return b;
        }
      });
    }
    static setUrl(url) {
      return async.async(dart.void, function* setUrl() {
        let preferences = (yield shared_preferences.SharedPreferences.getInstance());
        yield preferences.setString("url", url);
        core.print("🔵 🔵 🔵 url string set to: " + dart.str(url) + " 🍎 🍎 ");
      });
    }
    static getUrl() {
      return async.async(core.String, function* getUrl() {
        let preferences = (yield shared_preferences.SharedPreferences.getInstance());
        let b = preferences.getString("url");
        if (b == null) {
          return null;
        } else {
          core.print("🔵 🔵 🔵  url string retrieved: " + dart.str(b) + " 🍏 🍏 ");
          return b;
        }
      });
    }
    static setThemeIndex(index) {
      return async.async(dart.void, function* setThemeIndex() {
        let preferences = (yield shared_preferences.SharedPreferences.getInstance());
        yield preferences.setInt("index", index);
        core.print("🔵 🔵 🔵 Prefs: theme index set to: " + dart.str(index) + " 🍎 🍎 ");
      });
    }
    static getThemeIndex() {
      return async.async(core.int, function* getThemeIndex() {
        let preferences = (yield shared_preferences.SharedPreferences.getInstance());
        let b = preferences.getInt("index");
        if (b == null) {
          return 0;
        } else {
          core.print("🔵 🔵 🔵  theme index retrieved: " + dart.str(b) + " 🍏 🍏 ");
          return b;
        }
      });
    }
  };
  (prefs.Prefs.new = function() {
    ;
  }).prototype = prefs.Prefs.prototype;
  dart.addTypeTests(prefs.Prefs);
  dart.setLibraryUri(prefs.Prefs, "package:bfnlibrary/util/prefs.dart");
  dart.defineLazy(prefs.Prefs, {
    /*prefs.Prefs.PATH*/get PATH() {
      return "/prefs";
    }
  });
  dart.trackLibraries("packages/bfnlibrary/util/prefs", {
    "package:bfnlibrary/util/prefs.dart": prefs
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["prefs.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;uBAOwC;AAAb;AACL,qBAAQ,MAAwB;AAE9C,kBAAM,AAAQ,OAAD;AACb,iBAAK,AAAK,oBAAO,GAAG;AACM,QAA9B,AAAM,KAAD,WAAW,WAAW,EAAE;AACc,QAA3C,WAAM,AAAoC,wCAAJ,EAAE;AACxC,cAAO;MACT;;;AAEqC;AAC/B,qBAAQ,MAAwB;AAChC,qBAAS,AAAM,KAAD,WAAW;AAC7B,YAAI,AAAO,MAAD,IAAI;AACZ,gBAAO;;AAEL,iBAAK,AAAK,oBAAO,MAAM;AACvB,0BAAkB,iDAAqB,EAAE;AACY,QAAzD,WAAM,AAAkD,mDAAH,EAAE;AACvD,cAAO,YAAW;MACpB;;oBAEgC;AAAV;AACF,qBAAQ,MAAwB;AAE9C,kBAAM,AAAK,IAAD;AACV,iBAAK,AAAK,oBAAO,GAAG;AACG,QAA3B,AAAM,KAAD,WAAW,QAAQ,EAAE;AAC0B,QAApD,WAAM,AAA6C,6CAAJ,EAAE;AACjD,cAAO;MACT;;;AAE+B;AACzB,qBAAQ,MAAwB;AAChC,qBAAS,AAAM,KAAD,WAAW;AAC7B,YAAI,AAAO,MAAD,IAAI;AACZ,gBAAO;;AAEL,iBAAK,AAAK,oBAAO,MAAM;AACvB,0BAAkB,gDAAkB,EAAE;AACY,QAAtD,WAAM,AAA+C,gDAAH,EAAE;AACpD,cAAO,YAAW;MACpB;;qBAEuC;AAAhB;AACH,qBAAQ,MAAwB;AAE9C,mBAAO;AAGT,QAFF,AAAM,KAAD,WAAS,QAAC;AACc,UAA3B,AAAK,IAAD,OAAK,AAAK,oBAAO,IAAI;;AAEO,QAAlC,AAAM,KAAD,eAAe,SAAS,IAAI;AAEjC,cAAO;MACT;;;AAEsC;AAChC,qBAAQ,MAAwB;AAChC,sBAAU,AAAM,KAAD,eAAe;AAC9B,mBAAO;AACX,YAAI,AAAQ,OAAD,IAAI;AACb,gBAAO;;AAIP,QAFF,AAAQ,OAAD,WAAS,QAAC;AAC4B,UAA3C,AAAK,IAAD,OAAc,gDAAS,AAAK,oBAAO,CAAC;;AAG4B,QAAtE,WAAM,AAA+D,qDAAb,AAAK,IAAD;AAC5D,cAAO,KAAI;MACb;;yBAIiC;AAAR;AACjB,2BAAc,MAAwB;AACE,QAA9C,MAAM,AAAY,WAAD,WAAW,WAAW,MAAM;AACO,QAApD,WAAM,AAA6C,wCAAd,MAAM;MAC7C;;;AAEmC;AAC3B,2BAAc,MAAwB;AACxC,gBAAI,AAAY,WAAD,WAAW;AAC9B,YAAI,AAAE,CAAD,IAAI;AACP,gBAAO;;AAE4C,UAAnD,WAAM,AAA4C,4CAAT,CAAC;AAC1C,gBAAO,EAAC;;MAEZ;;kBAE0B;AAAR;AACV,2BAAc,MAAwB;AACL,QAAvC,MAAM,AAAY,WAAD,WAAW,OAAO,GAAG;AACU,QAAhD,WAAM,AAAyC,uCAAX,GAAG;MACzC;;;AAE4B;AACpB,2BAAc,MAAwB;AACxC,gBAAI,AAAY,WAAD,WAAW;AAC9B,YAAI,AAAE,CAAD,IAAI;AACP,gBAAO;;AAE2C,UAAlD,WAAM,AAA2C,2CAAT,CAAC;AACzC,gBAAO,EAAC;;MAEZ;;yBAE8B;AAAL;AACjB,2BAAc,MAAwB;AACJ,QAAxC,MAAM,AAAY,WAAD,QAAQ,SAAS,KAAK;AACmB,QAA1D,WAAM,AAAmD,+CAAb,KAAK;MACnD;;;AAEgC;AACxB,2BAAc,MAAwB;AACxC,gBAAI,AAAY,WAAD,QAAQ;AAC3B,YAAI,AAAE,CAAD,IAAI;AACP,gBAAO;;AAE4C,UAAnD,WAAM,AAA4C,4CAAT,CAAC;AAC1C,gBAAO,EAAC;;MAEZ;;;;;EACF;;;;MApDe,gBAAI","file":"prefs.ddc.js"}');
  // Exports:
  return {
    util__prefs: prefs
  };
});

//# sourceMappingURL=prefs.ddc.js.map
