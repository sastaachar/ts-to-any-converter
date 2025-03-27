
enum UserStatus {
  ACTIVE("ACTIVE"), 
  INACTIVE("INACTIVE"), 
  BLOCKED("BLOCKED");

  final String value;
  const UserStatus(this.value);
}

class WhatsUp {
  List<WhatsUpStatusAll2> statusAll2;
  List<UserStatus> statusAll;
  UserStatus status;
  String customType;
  WhatsUpGetToken getToken;
  int test;
  String email;
  WhatsUpPhone phone;
  WhatsUpAddress address;

  WhatsUp(
    {
    required this.statusAll2,
    required this.statusAll,
    required this.status,
    required this.customType,
    required this.getToken,
    required this.test,
    required this.email,
    required this.phone,
    required this.address
    }
  );
}

class WhatsUpStatusAll2 {
  UserStatus status;

  WhatsUpStatusAll2(
    {
    required this.status
    }
  );
}

class WhatsUpPhone {
  String type;
  String number;

  WhatsUpPhone(
    {
    required this.type,
    required this.number
    }
  );
}

class WhatsUpAddressZipCountry {
  String code;
  String name;

  WhatsUpAddressZipCountry(
    {
    required this.code,
    required this.name
    }
  );
}

class WhatsUpAddressZip {
  WhatsUpAddressZipCountry country;
  String code;

  WhatsUpAddressZip(
    {
    required this.country,
    required this.code
    }
  );
}

class WhatsUpAddress {
  WhatsUpAddressZip zip;
  String state;
  String street;
  String? city;

  WhatsUpAddress(
    {
    required this.zip,
    required this.state,
    required this.street,
     this.city
    }
  );
}

class GetPhoneReturn {
  String number;
  String type;

  GetPhoneReturn(
    {
    required this.number,
    required this.type
    }
  );
}

class GetAddressZipCountry {
  String code;
  String name;

  GetAddressZipCountry(
    {
    required this.code,
    required this.name
    }
  );
}

class GetAddressZip {
  GetAddressZipCountry country;
  String code;

  GetAddressZip(
    {
    required this.country,
    required this.code
    }
  );
}

class GetAddressReturnZipCountry {
  String code;
  String name;

  GetAddressReturnZipCountry(
    {
    required this.code,
    required this.name
    }
  );
}

class GetAddressReturnZip {
  GetAddressReturnZipCountry country;
  String code;

  GetAddressReturnZip(
    {
    required this.country,
    required this.code
    }
  );
}

class GetAddressReturn {
  GetAddressReturnZip zip;
  String state;
  String city;
  String street;

  GetAddressReturn(
    {
    required this.zip,
    required this.state,
    required this.city,
    required this.street
    }
  );
}

abstract class getPhone {
  GetPhoneReturn operate(
    String number,
    String type
  );
}
abstract class getAddress {
  GetAddressReturn operate(
    GetAddressZip zip,
    String state,
    String street,
    String city
  );
}
abstract class WhatsUpGetToken {
  String operate(
    List<String> a
  );
}