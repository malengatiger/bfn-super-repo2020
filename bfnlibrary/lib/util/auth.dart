import 'package:bfnlibrary/data/anchor.dart';
import 'package:bfnlibrary/net_util.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:google_sign_in/google_sign_in.dart';

class BFNAuth {
  static final GoogleSignIn _googleSignIn = GoogleSignIn();
  static final FirebaseAuth _auth = FirebaseAuth.instance;

  static Future<FirebaseUser> handleSignIn() async {
    print('🍎 🍎 🍎 🍎 🍎 🍎 BFNAuth: handleSignIn ... _googleSignIn.signIn()');
    try {
      final GoogleSignInAccount googleUser = await _googleSignIn.signIn();
      print(
          '🍎 🍎 🍎 🍎 🍎 🍎 BFNAuth: handleSignIn ... googleUser.authentication ...');
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;
      print(
          '🍋 🍋 🍋 🍋   BFNAuth: handleSignIn ... GoogleAuthProvider.getCredential ...');
      final AuthCredential credential = GoogleAuthProvider.getCredential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final FirebaseUser user =
          (await _auth.signInWithCredential(credential)).user;

      print('🌍 🌍  BFNAuth: FirebaseUser signed in ... ${user.displayName}');
      return user;
    } catch (e) {
      print('We fucked, Jack! we fucked!! $e');
    }
    return null;
  }

  static Future<Anchor> anchorSignIn(String email, String password) async {
    var authResult = await _auth.signInWithEmailAndPassword(
        email: email, password: password);
    if (authResult.user == null) {
      throw Exception("User authentication failed");
    }

    var anc = await Net.getAnchor(authResult.user.uid);
    debugPrint('Anchor retrieved: ${anc.toJson()}');
    return anc;
  }
}
