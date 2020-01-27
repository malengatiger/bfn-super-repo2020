import 'package:flutter/cupertino.dart';

class InvestorProfile {
  String issuedBy;
  String accountId, date;
  double minimumInvoiceAmount, defaultDiscount;
  double maximumInvoiceAmount, totalInvestment;

  InvestorProfile(
      {this.issuedBy,
      @required this.accountId,
      @required this.minimumInvoiceAmount,
      @required this.totalInvestment,
      @required this.defaultDiscount,
      @required this.date,
      @required this.maximumInvoiceAmount});

  InvestorProfile.fromJson(Map data) {
    this.issuedBy = data['issuedBy'];
    this.accountId = data['accountId'];
    this.minimumInvoiceAmount = data['minimumInvoiceAmount'];
    this.maximumInvoiceAmount = data['maximumInvoiceAmount'];
    this.defaultDiscount = data['defaultDiscount'];
    this.date = data['date'];
    this.totalInvestment = data['totalInvestment'];
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'issuedBy': issuedBy,
        'accountId': accountId,
        'minimumInvoiceAmount': minimumInvoiceAmount,
        'maximumInvoiceAmount': maximumInvoiceAmount,
        'date': date,
        'defaultDiscount': defaultDiscount,
        'totalInvestment': totalInvestment,
      };
}

class SupplierProfile {
  String issuedBy;
  String accountId, date;
  double maximumDiscount;

  SupplierProfile(
      {this.issuedBy,
      @required this.accountId,
      @required this.date,
      @required this.maximumDiscount});

  SupplierProfile.fromJson(Map data) {
    this.issuedBy = data['issuedBy'];
    this.accountId = data['accountId'];
    this.maximumDiscount = data['maximumDiscount'];
    this.date = data['date'];
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'issuedBy': issuedBy,
        'accountId': accountId,
        'maximumDiscount': maximumDiscount,
        'date': date,
      };
}
