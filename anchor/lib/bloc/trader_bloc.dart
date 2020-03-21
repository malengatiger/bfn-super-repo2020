import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/data/node_info.dart';
import 'package:flutter/material.dart';

class TraderBloc extends ChangeNotifier {
  Anchor _anchor;
  NodeInfo _node;
  List<NodeInfo> _nodes = List();
  String _url;

  Anchor get anchor => _anchor;
  NodeInfo get node => _node;
  List<NodeInfo> get nodes => _nodes;
  String get url => _url;

  TraderBloc() {
    debugPrint(
        '🔱 🔱 🔱 🔱 🔱 🔱 TraderBloc Constructor  🌸 calling _init  🌸 ');
    _init();
  }
  _init() async {
    debugPrint('🥏 🥏 🥏 _init: TraderBloc 🥏 nothing happening so far ...');
//    _anchor = await Prefs.getAnchor();
//    _nodes = await Net.getNodesFromFirestore();
//    debugPrint(_anchor == null
//        ? '🔱 🔱 🔱 AnchorBloc 🔴 No anchor found in Prefs'
//        : '🔶🔶🔶 Anchor from Prefs: 🔶 ${_anchor.name} 🔶');
//    debugPrint('🛎 🛎 🛎 TraderBloc _init: 🛎 ${_nodes.length} 🛎 nodes found  🍎 ...');
//    debugPrint('🌸 🌸 🌸 TraderBloc Constructor 🔱 about to notifyListeners  🍎 ...');
//    notifyListeners();
  }

  Future<String> buildUrl() async {
    if (_node == null) {
      throw Exception('Node not found in Prefs');
    }
    var mx = '${_node.webServerAddress}';
    debugPrint("🍊 🍊 🍊  🌸 🌸 🌸 ${_node.toJson()}  🌸 🌸 🌸  🍊 🍊 🍊 ");
    if (_node.webServerPort != null || _node.webServerPort > 0) {
      mx += ':${_node.webServerPort}/';
    } else {
      mx += '/';
    }
    return mx;
  }
}
