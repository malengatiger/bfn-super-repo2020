/* ENTRYPOINT_EXTENTION_MARKER */
(function() {
var _currentDirectory = (function () {
  var _url;
  var lines = new Error().stack.split('\n');
  function lookupUrl() {
    if (lines.length > 2) {
      var match = lines[1].match(/^\s+at (.+):\d+:\d+$/);
      // Chrome.
      if (match) return match[1];
      // Chrome nested eval case.
      match = lines[1].match(/^\s+at eval [(](.+):\d+:\d+[)]$/);
      if (match) return match[1];
      // Edge.
      match = lines[1].match(/^\s+at.+\((.+):\d+:\d+\)$/);
      if (match) return match[1];
      // Firefox.
      match = lines[0].match(/[<][@](.+):\d+:\d+$/)
      if (match) return match[1];
    }
    // Safari.
    return lines[0].match(/(.+):\d+:\d+$/)[1];
  }
  _url = lookupUrl();
  var lastSlash = _url.lastIndexOf('/');
  if (lastSlash == -1) return _url;
  var currentDirectory = _url.substring(0, lastSlash + 1);
  return currentDirectory;
})();

var baseUrl = (function () {
  // Attempt to detect --precompiled mode for tests, and set the base url
  // appropriately, otherwise set it to '/'.
  var pathParts = location.pathname.split("/");
  if (pathParts[0] == "") {
    pathParts.shift();
  }
  if (pathParts.length > 1 && pathParts[1] == "test") {
    return "/" + pathParts.slice(0, 2).join("/") + "/";
  }
  // Attempt to detect base url using <base href> html tag
  // base href should start and end with "/"
  if (typeof document !== 'undefined') {
    var el = document.getElementsByTagName('base');
    if (el && el[0] && el[0].getAttribute("href") && el[0].getAttribute
    ("href").startsWith("/") && el[0].getAttribute("href").endsWith("/")){
      return el[0].getAttribute("href");
    }
  }
  // return default value
  return "/";
}());

let modulePaths = {
 "dart_sdk": "packages/build_web_compilers/src/dev_compiler/dart_sdk",
 "packages/bfnlibrary/data/account": "packages/bfnlibrary/data/account.ddc",
 "packages/bfnlibrary/data/dashboard_data": "packages/bfnlibrary/data/dashboard_data.ddc",
 "packages/bfnlibrary/data/fb_user": "packages/bfnlibrary/data/fb_user.ddc",
 "packages/bfnlibrary/data/invoice": "packages/bfnlibrary/data/invoice.ddc",
 "packages/bfnlibrary/data/invoice_offer": "packages/bfnlibrary/data/invoice_offer.ddc",
 "packages/bfnlibrary/data/node_info": "packages/bfnlibrary/data/node_info.ddc",
 "packages/bfnlibrary/data/profile": "packages/bfnlibrary/data/profile.ddc",
 "packages/bfnlibrary/data/user": "packages/bfnlibrary/data/user.ddc",
 "packages/bfnlibrary/util/functions": "packages/bfnlibrary/util/functions.ddc",
 "packages/bfnlibrary/util/net": "packages/bfnlibrary/util/net.ddc",
 "packages/bfnlibrary/util/prefs": "packages/bfnlibrary/util/prefs.ddc",
 "packages/bfnlibrary/util/slide_right": "packages/bfnlibrary/util/slide_right.ddc",
 "packages/bfnlibrary/util/snack": "packages/bfnlibrary/util/snack.ddc",
 "packages/bfnlibrary/util/theme_bloc": "packages/bfnlibrary/util/theme_bloc.ddc",
 "packages/bfnlibrary/util/theme_util": "packages/bfnlibrary/util/theme_util.ddc",
 "packages/bfnmobile/bloc": "packages/bfnmobile/bloc.ddc",
 "packages/bfnmobile/generated_plugin_registrant": "packages/bfnmobile/generated_plugin_registrant.ddc",
 "packages/bfnmobile/main": "packages/bfnmobile/main.ddc",
 "packages/bfnmobile/main_web_entrypoint": "packages/bfnmobile/main_web_entrypoint.ddc",
 "packages/bfnmobile/ui/buy_offer": "packages/bfnmobile/ui/buy_offer.ddc",
 "packages/bfnmobile/ui/create_invoice": "packages/bfnmobile/ui/create_invoice.ddc",
 "packages/bfnmobile/ui/create_offer": "packages/bfnmobile/ui/create_offer.ddc",
 "packages/bfnmobile/ui/dashboard": "packages/bfnmobile/ui/dashboard.ddc",
 "packages/bfnmobile/ui/network_accounts": "packages/bfnmobile/ui/network_accounts.ddc",
 "packages/bfnmobile/ui/sign_up": "packages/bfnmobile/ui/sign_up.ddc",
 "packages/charcode/ascii": "packages/charcode/ascii.ddc",
 "packages/charcode/charcode": "packages/charcode/charcode.ddc",
 "packages/charcode/html_entity": "packages/charcode/html_entity.ddc",
 "packages/cloud_firestore/cloud_firestore": "packages/cloud_firestore/cloud_firestore.ddc",
 "packages/collection/collection": "packages/collection/collection.ddc",
 "packages/collection/src/algorithms": "packages/collection/src/algorithms.ddc",
 "packages/collection/src/canonicalized_map": "packages/collection/src/canonicalized_map.ddc",
 "packages/collection/src/comparators": "packages/collection/src/comparators.ddc",
 "packages/collection/src/iterable_zip": "packages/collection/src/iterable_zip.ddc",
 "packages/collection/src/priority_queue": "packages/collection/src/priority_queue.ddc",
 "packages/collection/src/utils": "packages/collection/src/utils.ddc",
 "packages/dynamic_theme/dynamic_theme": "packages/dynamic_theme/dynamic_theme.ddc",
 "packages/firebase/firebase": "packages/firebase/firebase.ddc",
 "packages/firebase/src/app": "packages/firebase/src/app.ddc",
 "packages/firebase_auth/firebase_auth": "packages/firebase_auth/firebase_auth.ddc",
 "packages/firebase_auth_platform_interface/firebase_auth_platform_interface": "packages/firebase_auth_platform_interface/firebase_auth_platform_interface.ddc",
 "packages/firebase_auth_web/firebase_auth_web": "packages/firebase_auth_web/firebase_auth_web.ddc",
 "packages/firebase_core/firebase_core": "packages/firebase_core/firebase_core.ddc",
 "packages/firebase_core_platform_interface/firebase_core_platform_interface": "packages/firebase_core_platform_interface/firebase_core_platform_interface.ddc",
 "packages/firebase_core_web/firebase_core_web": "packages/firebase_core_web/firebase_core_web.ddc",
 "packages/firebase_messaging/firebase_messaging": "packages/firebase_messaging/firebase_messaging.ddc",
 "packages/flutter/animation": "packages/flutter/animation.ddc",
 "packages/flutter/cupertino": "packages/flutter/cupertino.ddc",
 "packages/flutter/foundation": "packages/flutter/foundation.ddc",
 "packages/flutter/gestures": "packages/flutter/gestures.ddc",
 "packages/flutter/material": "packages/flutter/material.ddc",
 "packages/flutter/painting": "packages/flutter/painting.ddc",
 "packages/flutter/physics": "packages/flutter/physics.ddc",
 "packages/flutter/rendering": "packages/flutter/rendering.ddc",
 "packages/flutter/semantics": "packages/flutter/semantics.ddc",
 "packages/flutter/src/animation/animation": "packages/flutter/src/animation/animation.ddc",
 "packages/flutter/src/cupertino/action_sheet": "packages/flutter/src/cupertino/action_sheet.ddc",
 "packages/flutter/src/foundation/_bitfield_web": "packages/flutter/src/foundation/_bitfield_web.ddc",
 "packages/flutter/src/gestures/arena": "packages/flutter/src/gestures/arena.ddc",
 "packages/flutter/src/painting/_network_image_web": "packages/flutter/src/painting/_network_image_web.ddc",
 "packages/flutter/src/physics/clamped_simulation": "packages/flutter/src/physics/clamped_simulation.ddc",
 "packages/flutter/src/rendering/animated_size": "packages/flutter/src/rendering/animated_size.ddc",
 "packages/flutter/src/semantics/binding": "packages/flutter/src/semantics/binding.ddc",
 "packages/flutter/src/widgets/actions": "packages/flutter/src/widgets/actions.ddc",
 "packages/flutter/widgets": "packages/flutter/widgets.ddc",
 "packages/flutter_dotenv/flutter_dotenv": "packages/flutter_dotenv/flutter_dotenv.ddc",
 "packages/flutter_web_plugins/flutter_web_plugins": "packages/flutter_web_plugins/flutter_web_plugins.ddc",
 "packages/http/http": "packages/http/http.ddc",
 "packages/http/src/base_client": "packages/http/src/base_client.ddc",
 "packages/http_parser/http_parser": "packages/http_parser/http_parser.ddc",
 "packages/intl/date_symbols": "packages/intl/date_symbols.ddc",
 "packages/intl/intl": "packages/intl/intl.ddc",
 "packages/intl/number_symbols": "packages/intl/number_symbols.ddc",
 "packages/intl/number_symbols_data": "packages/intl/number_symbols_data.ddc",
 "packages/intl/src/plural_rules": "packages/intl/src/plural_rules.ddc",
 "packages/js/js": "packages/js/js.ddc",
 "packages/js/js_util": "packages/js/js_util.ddc",
 "packages/meta/meta": "packages/meta/meta.ddc",
 "packages/path/path": "packages/path/path.ddc",
 "packages/pedantic/pedantic": "packages/pedantic/pedantic.ddc",
 "packages/platform/platform": "packages/platform/platform.ddc",
 "packages/quiver/core": "packages/quiver/core.ddc",
 "packages/shared_preferences/shared_preferences": "packages/shared_preferences/shared_preferences.ddc",
 "packages/shared_preferences_platform_interface/method_channel_shared_preferences": "packages/shared_preferences_platform_interface/method_channel_shared_preferences.ddc",
 "packages/shared_preferences_web/shared_preferences_web": "packages/shared_preferences_web/shared_preferences_web.ddc",
 "packages/source_span/source_span": "packages/source_span/source_span.ddc",
 "packages/string_scanner/src/eager_span_scanner": "packages/string_scanner/src/eager_span_scanner.ddc",
 "packages/term_glyph/src/generated/ascii_glyph_set": "packages/term_glyph/src/generated/ascii_glyph_set.ddc",
 "packages/typed_data/typed_buffers": "packages/typed_data/typed_buffers.ddc",
 "packages/typed_data/typed_data": "packages/typed_data/typed_data.ddc",
 "packages/vector_math/hash": "packages/vector_math/hash.ddc",
 "packages/vector_math/vector_math_64": "packages/vector_math/vector_math_64.ddc"
};
if(!window.$dartLoader) {
   window.$dartLoader = {
     appDigests: _currentDirectory + 'main_web_entrypoint.digests',
     moduleIdToUrl: new Map(),
     urlToModuleId: new Map(),
     rootDirectories: new Array(),
     // Used in package:build_runner/src/server/build_updates_client/hot_reload_client.dart
     moduleParentsGraph: new Map(),
     moduleLoadingErrorCallbacks: new Map(),
     forceLoadModule: function (moduleName, callback, onError) {
       // dartdevc only strips the final extension when adding modules to source
       // maps, so we need to do the same.
       if (moduleName.endsWith('.ddc')) {
         moduleName = moduleName.substring(0, moduleName.length - 4);
       }
       if (typeof onError != 'undefined') {
         var errorCallbacks = $dartLoader.moduleLoadingErrorCallbacks;
         if (!errorCallbacks.has(moduleName)) {
           errorCallbacks.set(moduleName, new Set());
         }
         errorCallbacks.get(moduleName).add(onError);
       }
       requirejs.undef(moduleName);
       requirejs([moduleName], function() {
         if (typeof onError != 'undefined') {
           errorCallbacks.get(moduleName).delete(onError);
         }
         if (typeof callback != 'undefined') {
           callback();
         }
       });
     },
     getModuleLibraries: null, // set up by _initializeTools
   };
}
let customModulePaths = {};
window.$dartLoader.rootDirectories.push(window.location.origin + baseUrl);
for (let moduleName of Object.getOwnPropertyNames(modulePaths)) {
  let modulePath = modulePaths[moduleName];
  if (modulePath != moduleName) {
    customModulePaths[moduleName] = modulePath;
  }
  var src = window.location.origin + '/' + modulePath + '.js';
  if (window.$dartLoader.moduleIdToUrl.has(moduleName)) {
    continue;
  }
  $dartLoader.moduleIdToUrl.set(moduleName, src);
  $dartLoader.urlToModuleId.set(src, moduleName);
}
// Whenever we fail to load a JS module, try to request the corresponding
// `.errors` file, and log it to the console.
(function() {
  var oldOnError = requirejs.onError;
  requirejs.onError = function(e) {
    if (e.requireModules) {
      if (e.message) {
        // If error occurred on loading dependencies, we need to invalidate ancessor too.
        var ancesor = e.message.match(/needed by: (.*)/);
        if (ancesor) {
          e.requireModules.push(ancesor[1]);
        }
      }
      for (const module of e.requireModules) {
        var errorCallbacks = $dartLoader.moduleLoadingErrorCallbacks.get(module);
        if (errorCallbacks) {
          for (const callback of errorCallbacks) callback(e);
          errorCallbacks.clear();
        }
      }
    }
    if (e.originalError && e.originalError.srcElement) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          var message;
          if (this.status == 200) {
            message = this.responseText;
          } else {
            message = "Unknown error loading " + e.originalError.srcElement.src;
          }
          console.error(message);
          var errorEvent = new CustomEvent(
            'dartLoadException', { detail: message });
          window.dispatchEvent(errorEvent);
        }
      };
      xhr.open("GET", e.originalError.srcElement.src + ".errors", true);
      xhr.send();
    }
    // Also handle errors the normal way.
    if (oldOnError) oldOnError(e);
  };
}());

var baseUrl = (function () {
  // Attempt to detect --precompiled mode for tests, and set the base url
  // appropriately, otherwise set it to '/'.
  var pathParts = location.pathname.split("/");
  if (pathParts[0] == "") {
    pathParts.shift();
  }
  if (pathParts.length > 1 && pathParts[1] == "test") {
    return "/" + pathParts.slice(0, 2).join("/") + "/";
  }
  // Attempt to detect base url using <base href> html tag
  // base href should start and end with "/"
  if (typeof document !== 'undefined') {
    var el = document.getElementsByTagName('base');
    if (el && el[0] && el[0].getAttribute("href") && el[0].getAttribute
    ("href").startsWith("/") && el[0].getAttribute("href").endsWith("/")){
      return el[0].getAttribute("href");
    }
  }
  // return default value
  return "/";
}());
;

require.config({
    baseUrl: baseUrl,
    waitSeconds: 0,
    paths: customModulePaths
});

const modulesGraph = new Map();
function getRegisteredModuleName(moduleMap) {
  if ($dartLoader.moduleIdToUrl.has(moduleMap.name + '.ddc')) {
    return moduleMap.name + '.ddc';
  }
  return moduleMap.name;
}
requirejs.onResourceLoad = function (context, map, depArray) {
  const name = getRegisteredModuleName(map);
  const depNameArray = depArray.map(getRegisteredModuleName);
  if (modulesGraph.has(name)) {
    // TODO Move this logic to better place
    var previousDeps = modulesGraph.get(name);
    var changed = previousDeps.length != depNameArray.length;
    changed = changed || depNameArray.some(function(depName) {
      return !previousDeps.includes(depName);
    });
    if (changed) {
      console.warn("Dependencies graph change for module '" + name + "' detected. " +
        "Dependencies was [" + previousDeps + "], now [" +  depNameArray.map((depName) => depName) +"]. " +
        "Page can't be hot-reloaded, firing full page reload.");
      window.location.reload();
    }
  } else {
    modulesGraph.set(name, []);
    for (const depName of depNameArray) {
      if (!$dartLoader.moduleParentsGraph.has(depName)) {
        $dartLoader.moduleParentsGraph.set(depName, []);
      }
      $dartLoader.moduleParentsGraph.get(depName).push(name);
      modulesGraph.get(name).push(depName);
    }
  }
};
define("main_web_entrypoint.dart.bootstrap", ["packages/bfnmobile/main_web_entrypoint", "dart_sdk"], function(app, dart_sdk) {
  dart_sdk.dart.setStartAsyncSynchronously(true);
  dart_sdk._isolate_helper.startRootIsolate(() => {}, []);
  var baseUrl = (function () {
  // Attempt to detect --precompiled mode for tests, and set the base url
  // appropriately, otherwise set it to '/'.
  var pathParts = location.pathname.split("/");
  if (pathParts[0] == "") {
    pathParts.shift();
  }
  if (pathParts.length > 1 && pathParts[1] == "test") {
    return "/" + pathParts.slice(0, 2).join("/") + "/";
  }
  // Attempt to detect base url using <base href> html tag
  // base href should start and end with "/"
  if (typeof document !== 'undefined') {
    var el = document.getElementsByTagName('base');
    if (el && el[0] && el[0].getAttribute("href") && el[0].getAttribute
    ("href").startsWith("/") && el[0].getAttribute("href").endsWith("/")){
      return el[0].getAttribute("href");
    }
  }
  // return default value
  return "/";
}());

  dart_sdk._debugger.registerDevtoolsFormatter();
  $dartLoader.getModuleLibraries = dart_sdk.dart.getModuleLibraries;
  if (window.$dartStackTraceUtility && !window.$dartStackTraceUtility.ready) {
    window.$dartStackTraceUtility.ready = true;
    let dart = dart_sdk.dart;
    window.$dartStackTraceUtility.setSourceMapProvider(
      function(url) {
        url = url.replace(baseUrl, '/');
        var module = window.$dartLoader.urlToModuleId.get(url);
        if (!module) return null;
        return dart.getSourceMap(module);
      });
  }
  if (typeof document != 'undefined') {
    window.postMessage({ type: "DDC_STATE_CHANGE", state: "start" }, "*");
  }

  /* MAIN_EXTENSION_MARKER */
  (app.lib__main_web_entrypoint || app.main_web_entrypoint).main();
  var bootstrap = {
      hot$onChildUpdate: function(childName, child) {
        // Special handling for the multi-root scheme uris. We need to strip
        // out the scheme and the top level directory, to match the source path
        // that chrome sees.
        if (childName.startsWith('org-dartlang-app:///')) {
          childName = childName.substring('org-dartlang-app:///'.length);
          var firstSlash = childName.indexOf('/');
          if (firstSlash == -1) return false;
          childName = childName.substring(firstSlash + 1);
        }
        if (childName === "package:bfnmobile/main_web_entrypoint.dart") {
          // Clear static caches.
          dart_sdk.dart.hotRestart();
          child.main();
          return true;
        }
      }
    }
  dart_sdk.dart.trackLibraries("main_web_entrypoint.dart.bootstrap", {
    "main_web_entrypoint.dart.bootstrap": bootstrap
  }, '');
  return {
    bootstrap: bootstrap
  };
});
})();
