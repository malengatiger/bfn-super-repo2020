class NodeInfo {
  List<String> addresses;
  int platformVersion, webServerPort;
  int serial;
  String webServerAddress,
      host,
      springBootProfile,
      username,
      password,
      firebaseProjectId,
      firebaseUrl;

  NodeInfo(
      this.addresses,
      this.platformVersion,
      this.serial,
      this.webServerAddress,
      this.host,
      this.springBootProfile,
      this.webServerPort,
      this.firebaseProjectId,
      this.firebaseUrl,
      this.username,
      this.password);

  String get webAPIUrl {
    var mm = webServerAddress;
    if (webServerPort != null && webServerPort > 0) {
      mm += ":$webServerPort";
    }
    return mm;
  }

  NodeInfo.fromJson(Map data) {
    List list = data['addresses'];
    this.addresses = List();
    list.forEach((a) {
      this.addresses.add(a as String);
    });
    this.platformVersion = data['platformVersion'];
    this.serial = data['serial'];
    this.host = data['host'];
    this.webServerAddress = data['webServerAddress'];
    this.springBootProfile = data['springBootProfile'];
    this.webServerPort = data['webServerPort'];
    this.firebaseProjectId = data['firebaseProjectId'];
    this.firebaseUrl = data['firebaseUrl'];
    this.username = data['username'];
    this.password = data['password'];
    this.webServerAddress = data['webServerAddress'];
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'addresses': addresses,
        'platformVersion': platformVersion,
        'serial': serial,
        'webServerAddress': webServerAddress,
        'webServerPort': webServerPort,
        'springBootProfile': springBootProfile,
        'host': host,
        'firebaseProjectId': firebaseProjectId,
        'firebaseUrl': firebaseUrl,
        'username': username,
        'password': password,
      };
}
