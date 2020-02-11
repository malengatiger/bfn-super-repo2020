import 'package:bfnlibrary/data/invoice_offer.dart';
import 'package:bfnlibrary/data/profile.dart';

class SupplierPayment {
  InvoiceOffer acceptedOffer;
  SupplierProfile supplierProfile;
  bool paid;
  String date;

  SupplierPayment(
      {this.acceptedOffer, this.supplierProfile, this.paid, this.date});

  SupplierPayment.fromJson(Map data) {
    this.acceptedOffer = data['acceptedOffer'];
    if (data['supplierProfile'] != null) {
      this.supplierProfile = SupplierProfile.fromJson(data['supplierProfile']);
    }
    if (data['acceptedOffer'] != null) {
      this.acceptedOffer = InvoiceOffer.fromJson(data['acceptedOffer']);
    }
    this.date = data['date'];
    this.paid = data['paid'];
  }

  Map<String, dynamic> toJson() {
    Map<String, dynamic> mmp = Map();

    mmp['acceptedOffer'] =
        acceptedOffer == null ? null : acceptedOffer.toJson();
    mmp['supplierProfile'] =
        supplierProfile == null ? null : supplierProfile.toJson();
    mmp['paid'] = paid;
    mmp['date'] = date;

    return mmp;
  }
}

class TradeMatrix {
  double startInvoiceAmount;
  double endInvoiceAmount;
  double offerDiscount;
  String date;
  String id;
  int maximumInvoiceAgeInDays;

  TradeMatrix(
      {this.startInvoiceAmount,
      this.endInvoiceAmount,
      this.offerDiscount,
      this.date,
      this.id,
      this.maximumInvoiceAgeInDays});

  TradeMatrix.fromJson(Map data) {
    this.startInvoiceAmount = data['startInvoiceAmount'];
    this.endInvoiceAmount = data['endInvoiceAmount'];
    this.maximumInvoiceAgeInDays = data['maximumInvoiceAgeInDays'];
    this.offerDiscount = data['offerDiscount'];
    this.date = data['date'];
    this.id = data['id'];
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'startInvoiceAmount': startInvoiceAmount,
        'endInvoiceAmount': endInvoiceAmount,
        'maximumInvoiceAgeInDays': maximumInvoiceAgeInDays,
        'date': date,
        'id': id,
        'offerDiscount': offerDiscount,
      };
}
