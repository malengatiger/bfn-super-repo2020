class UserDTO {
  String name;
  String email;
  String password, uid;
  String cellphone;

  UserDTO(this.name, this.email, this.password, this.cellphone, this.uid);

  UserDTO.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    uid = json['uid'];
    email = json['email'];
    cellphone = json['cellphone'];
    password = json['password'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['email'] = this.email;
    data['cellphone'] = this.cellphone;
    data['password'] = this.password;
    data['uid'] = this.uid;

    return data;
  }
}
