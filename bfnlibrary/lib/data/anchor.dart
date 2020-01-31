class Anchor {
  String accountId, issuedBy;
  int tradeFrequencyInMinutes;
  double defaultOfferDiscount;
  String date, email, password;
  String cellphone;
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
      this.issuedBy});

  Anchor.fromJson(Map data) {
    this.accountId = data['accountId'];
    this.issuedBy = data['issuedBy'];
    this.tradeFrequencyInMinutes = data['tradeFrequencyInMinutes'];
    this.date = data['date'];
    this.email = data['email'];
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
    tradeMatrices.forEach((element) {
      matrices.add(element.toJson());
    });

    Map<String, dynamic> mmp = Map();
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
    mmp['tradeMatrices'] = matrices;
    return mmp;
  }
}

class TradeMatrix {
  double startInvoiceAmount, endInvoiceAmount, offerDiscount;
  String date;
  int maximumInvoiceAgeInDays;

  TradeMatrix.fromJson(Map data) {
    this.startInvoiceAmount = data['startInvoiceAmount'];
    this.endInvoiceAmount = data['endInvoiceAmount'];
    this.maximumInvoiceAgeInDays = data['maximumInvoiceAgeInDays'];
    if (data['date'] != null) {
      this.date = data['date'];
    }
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'startInvoiceAmount': startInvoiceAmount,
        'endInvoiceAmount': endInvoiceAmount,
        'maximumInvoiceAgeInDays': maximumInvoiceAgeInDays,
        'date': date,
      };
}
