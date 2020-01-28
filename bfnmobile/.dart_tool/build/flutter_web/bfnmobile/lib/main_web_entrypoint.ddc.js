define(['dart_sdk', 'packages/bfnmobile/generated_plugin_registrant', 'packages/flutter_web_plugins/flutter_web_plugins', 'packages/bfnmobile/main'], function(dart_sdk, packages__bfnmobile__generated_plugin_registrant, packages__flutter_web_plugins__flutter_web_plugins, packages__bfnmobile__main) {
  'use strict';
  const core = dart_sdk.core;
  const ui = dart_sdk.ui;
  const async = dart_sdk.async;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const generated_plugin_registrant = packages__bfnmobile__generated_plugin_registrant.generated_plugin_registrant;
  const plugin_registry = packages__flutter_web_plugins__flutter_web_plugins.src__plugin_registry;
  const main = packages__bfnmobile__main.main;
  const main_web_entrypoint = Object.create(dart.library);
  const CT = Object.create(null);
  main_web_entrypoint.main = function main$() {
    return async.async(dart.void, function* main$() {
      generated_plugin_registrant.registerPlugins(plugin_registry.webPluginRegistry);
      if (true) {
        yield ui.webOnlyInitializePlatform();
      }
      main.main();
    });
  };
  dart.trackLibraries("packages/bfnmobile/main_web_entrypoint", {
    "package:bfnmobile/main_web_entrypoint.dart": main_web_entrypoint
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["main_web_entrypoint.dart"],"names":[],"mappings":";;;;;;;;;;;;;AAOiB;AACmB,MAAlC,4CAAgB;AAChB,UAAI;AACkC,QAApC,MAAM;;AAES,MAAjB;IACF","file":"main_web_entrypoint.ddc.js"}');
  // Exports:
  return {
    main_web_entrypoint: main_web_entrypoint
  };
});

//# sourceMappingURL=main_web_entrypoint.ddc.js.map
