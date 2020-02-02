class Anchor {
  String accountId, issuedBy;
  int tradeFrequencyInMinutes;
  double defaultOfferDiscount;
  String date, email, password;
  String cellphone, name;
  double minimumInvoiceAmount, maximumInvoiceAmount, maximumInvestment;
  List<TradeMatrix> tradeMatrices;

  Anchor(
      {this.accountId,
      this.tradeFrequencyInMinutes,
      this.defaultOfferDiscount,
      this.date,
      this.email,
      this.cellphone,
      this.minimumInvoiceAmount,
      this.maximumInvoiceAmount,
      this.maximumInvestment,
      this.password,
      this.tradeMatrices,
      this.name,
      this.issuedBy});

  Anchor.fromJson(Map data) {
    this.accountId = data['accountId'];
    this.name = data['name'];
    this.issuedBy = data['issuedBy'];
    this.tradeFrequencyInMinutes = data['tradeFrequencyInMinutes'];
    this.date = data['date'];
    this.email = data['email'];
    this.password = data['password'];
    this.cellphone = data['cellphone'];
    if (data['minimumInvoiceAmount'] is int) {
      this.minimumInvoiceAmount = data['minimumInvoiceAmount'] * 1.00;
    }
    if (data['minimumInvoiceAmount'] is double) {
      this.minimumInvoiceAmount = data['minimumInvoiceAmount'];
    }
    if (data['maximumInvoiceAmount'] is int) {
      this.maximumInvoiceAmount = data['maximumInvoiceAmount'] * 1.00;
    }
    if (data['maximumInvoiceAmount'] is double) {
      this.maximumInvoiceAmount = data['maximumInvoiceAmount'];
    }
    if (data['maximumInvestment'] is int) {
      this.maximumInvestment = data['maximumInvestment'] * 1.00;
    }
    if (data['maximumInvestment'] is double) {
      this.maximumInvestment = data['maximumInvestment'];
    }
    if (data['defaultOfferDiscount'] is int) {
      this.defaultOfferDiscount = data['defaultOfferDiscount'] * 1.00;
    }
    if (data['defaultOfferDiscount'] is double) {
      this.defaultOfferDiscount = data['defaultOfferDiscount'];
    }
    this.tradeMatrices = List();
    if (data['tradeMatrices'] != null) {
      List mList = data['tradeMatrices'];
      mList.forEach((m) {
        var matrix = TradeMatrix.fromJson(m);
        tradeMatrices.add(matrix);
      });
    }
  }

  Map<String, dynamic> toJson() {
    List<Map<String, dynamic>> matrices = List();
    if (tradeMatrices != null && tradeMatrices.isNotEmpty) {
      tradeMatrices.forEach((element) {
        matrices.add(element.toJson());
      });
    }

    Map<String, dynamic> mmp = Map();
    mmp['name'] = name;
    mmp['issuedBy'] = issuedBy;
    mmp['accountId'] = accountId;
    mmp['tradeFrequencyInMinutes'] = tradeFrequencyInMinutes;
    mmp['defaultOfferDiscount'] = defaultOfferDiscount;
    mmp['date'] = date;
    mmp['minimumInvoiceAmount'] = minimumInvoiceAmount;
    mmp['maximumInvoiceAmount'] = maximumInvoiceAmount;
    mmp['maximumInvestment'] = maximumInvestment;
    mmp['cellphone'] = cellphone;
    mmp['email'] = email;
    mmp['password'] = password;
    mmp['tradeMatrices'] = matrices;
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
