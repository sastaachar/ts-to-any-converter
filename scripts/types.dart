@JsonEnum(valueField: 'value')
enum UserStatus {
  ACTIVE("ACTIVE"), 
  INACTIVE("INACTIVE"), 
  BLOCKED("BLOCKED");

  final String value;
  const UserStatus(this.value);
}

@JsonEnum(valueField: 'value')
enum UserStatus {
  ACTIVE("ACTIVE"), 
  INACTIVE("INACTIVE"), 
  BLOCKED("BLOCKED");

  final String value;
  const UserStatus(this.value);
}

class ToSkip {
   
  String skip;

  ToSkip(
    {
    
    required this.skip
    }
  );
    factory ToSkip.fromJson(Map<String, dynamic> json) => _$ToSkipFromJson(json);
    Map<String, dynamic> toJson() => _$ToSkipToJson(this);
}

class ToSkip2 {
   
  ToSkip skip2;

  ToSkip2(
    {
    
    required this.skip2
    }
  );
    factory ToSkip2.fromJson(Map<String, dynamic> json) => _$ToSkip2FromJson(json);
    Map<String, dynamic> toJson() => _$ToSkip2ToJson(this);
}

class GrandParent {
   
  GrandParent__fromGrandParent fromGrandParent;

  GrandParent(
    {
    
    required this.fromGrandParent
    }
  );
    factory GrandParent.fromJson(Map<String, dynamic> json) => _$GrandParentFromJson(json);
    Map<String, dynamic> toJson() => _$GrandParentToJson(this);
}

class Base {
   
  Base__fromGrandParent fromGrandParent;
   
  Base__address address;
   
  Base__age? age;

  Base(
    {
    
    required this.fromGrandParent,
    
    required this.address,
    
     this.age
    }
  );
    factory Base.fromJson(Map<String, dynamic> json) => _$BaseFromJson(json);
    Map<String, dynamic> toJson() => _$BaseToJson(this);
}

class MyUser {
   
  MyUser__fromGrandParent fromGrandParent;
   
  String phone;
   
  String email;
   
  MyUser__age? age;

  MyUser(
    {
    
    required this.fromGrandParent,
    
    required this.phone,
    
    required this.email,
    
     this.age
    }
  );
    factory MyUser.fromJson(Map<String, dynamic> json) => _$MyUserFromJson(json);
    Map<String, dynamic> toJson() => _$MyUserToJson(this);
}

class WhatsUp {
   
  List<WhatsUp__statusAll2> statusAll2;
   
  List<UserStatus> statusAll;
   
  UserStatus status;
   
  WhatsUp__customType customType;
   @JsonKey(ignore: true)
  WhatsUp__getToken getToken;
   
  int test;
   
  String email;
   
  WhatsUp__phone phone;
   
  WhatsUp__address address;

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
    factory WhatsUp.fromJson(Map<String, dynamic> json) => _$WhatsUpFromJson(json);
    Map<String, dynamic> toJson() => _$WhatsUpToJson(this);
}

class ToSkip {
   
  String skip;

  ToSkip(
    {
    
    required this.skip
    }
  );
    factory ToSkip.fromJson(Map<String, dynamic> json) => _$ToSkipFromJson(json);
    Map<String, dynamic> toJson() => _$ToSkipToJson(this);
}

class ToSkip2 {
   
  ToSkip skip2;

  ToSkip2(
    {
    
    required this.skip2
    }
  );
    factory ToSkip2.fromJson(Map<String, dynamic> json) => _$ToSkip2FromJson(json);
    Map<String, dynamic> toJson() => _$ToSkip2ToJson(this);
}

class GrandParent {
   
  GrandParent__fromGrandParent fromGrandParent;

  GrandParent(
    {
    
    required this.fromGrandParent
    }
  );
    factory GrandParent.fromJson(Map<String, dynamic> json) => _$GrandParentFromJson(json);
    Map<String, dynamic> toJson() => _$GrandParentToJson(this);
}

class Base {
   
  Base__fromGrandParent fromGrandParent;
   
  Base__address address;
   
  Base__age? age;

  Base(
    {
    
    required this.fromGrandParent,
    
    required this.address,
    
     this.age
    }
  );
    factory Base.fromJson(Map<String, dynamic> json) => _$BaseFromJson(json);
    Map<String, dynamic> toJson() => _$BaseToJson(this);
}

class MyUser {
   
  MyUser__fromGrandParent fromGrandParent;
   
  String phone;
   
  String email;
   
  MyUser__age? age;

  MyUser(
    {
    
    required this.fromGrandParent,
    
    required this.phone,
    
    required this.email,
    
     this.age
    }
  );
    factory MyUser.fromJson(Map<String, dynamic> json) => _$MyUserFromJson(json);
    Map<String, dynamic> toJson() => _$MyUserToJson(this);
}

class MyFunctionInter {
   
  String lol;
   @JsonKey(ignore: true)
  MyFunctionInter__test test;
   @JsonKey(ignore: true)
  MyFunctionInter__getToken getToken;

  MyFunctionInter(
    {
    
    required this.lol,
    
    required this.test,
    
    required this.getToken
    }
  );
    factory MyFunctionInter.fromJson(Map<String, dynamic> json) => _$MyFunctionInterFromJson(json);
    Map<String, dynamic> toJson() => _$MyFunctionInterToJson(this);
}

class MyFunctionInter2 {
   
  MyFunctionInter ok;
   
  int test;

  MyFunctionInter2(
    {
    
    required this.ok,
    
    required this.test
    }
  );
    factory MyFunctionInter2.fromJson(Map<String, dynamic> json) => _$MyFunctionInter2FromJson(json);
    Map<String, dynamic> toJson() => _$MyFunctionInter2ToJson(this);
}

class Base__address__street__Type__5 {
   
  String a;

  Base__address__street__Type__5(
    {
    
    required this.a
    }
  );
    factory Base__address__street__Type__5.fromJson(Map<String, dynamic> json) => _$Base__address__street__Type__5FromJson(json);
    Map<String, dynamic> toJson() => _$Base__address__street__Type__5ToJson(this);
}

class Base__address__street__Type__6 {
   
  String c;

  Base__address__street__Type__6(
    {
    
    required this.c
    }
  );
    factory Base__address__street__Type__6.fromJson(Map<String, dynamic> json) => _$Base__address__street__Type__6FromJson(json);
    Map<String, dynamic> toJson() => _$Base__address__street__Type__6ToJson(this);
}

class Base__address__street__Type__7 {
   
  String b;

  Base__address__street__Type__7(
    {
    
    required this.b
    }
  );
    factory Base__address__street__Type__7.fromJson(Map<String, dynamic> json) => _$Base__address__street__Type__7FromJson(json);
    Map<String, dynamic> toJson() => _$Base__address__street__Type__7ToJson(this);
}

class Base__address {
   
  String zip;
   
  String state;
   
  String city;
   
  Base__address__street? street;

  Base__address(
    {
    
    required this.zip,
    
    required this.state,
    
    required this.city,
    
     this.street
    }
  );
    factory Base__address.fromJson(Map<String, dynamic> json) => _$Base__addressFromJson(json);
    Map<String, dynamic> toJson() => _$Base__addressToJson(this);
}

class Base__age {
   
  String unit;
   
  int? value;

  Base__age(
    {
    
    required this.unit,
    
     this.value
    }
  );
    factory Base__age.fromJson(Map<String, dynamic> json) => _$Base__ageFromJson(json);
    Map<String, dynamic> toJson() => _$Base__ageToJson(this);
}

class MyUser__age {
   
  String unit;
   
  int? value;

  MyUser__age(
    {
    
    required this.unit,
    
     this.value
    }
  );
    factory MyUser__age.fromJson(Map<String, dynamic> json) => _$MyUser__ageFromJson(json);
    Map<String, dynamic> toJson() => _$MyUser__ageToJson(this);
}

class WhatsUp__statusAll2 {
   
  UserStatus status;

  WhatsUp__statusAll2(
    {
    
    required this.status
    }
  );
    factory WhatsUp__statusAll2.fromJson(Map<String, dynamic> json) => _$WhatsUp__statusAll2FromJson(json);
    Map<String, dynamic> toJson() => _$WhatsUp__statusAll2ToJson(this);
}

class WhatsUp__phone {
   
  String type;
   
  String number;

  WhatsUp__phone(
    {
    
    required this.type,
    
    required this.number
    }
  );
    factory WhatsUp__phone.fromJson(Map<String, dynamic> json) => _$WhatsUp__phoneFromJson(json);
    Map<String, dynamic> toJson() => _$WhatsUp__phoneToJson(this);
}

class WhatsUp__address__zip__country {
   
  String code;
   
  String name;

  WhatsUp__address__zip__country(
    {
    
    required this.code,
    
    required this.name
    }
  );
    factory WhatsUp__address__zip__country.fromJson(Map<String, dynamic> json) => _$WhatsUp__address__zip__countryFromJson(json);
    Map<String, dynamic> toJson() => _$WhatsUp__address__zip__countryToJson(this);
}

class WhatsUp__address__zip {
   
  WhatsUp__address__zip__country country;
   
  String code;

  WhatsUp__address__zip(
    {
    
    required this.country,
    
    required this.code
    }
  );
    factory WhatsUp__address__zip.fromJson(Map<String, dynamic> json) => _$WhatsUp__address__zipFromJson(json);
    Map<String, dynamic> toJson() => _$WhatsUp__address__zipToJson(this);
}

class WhatsUp__address {
   
  WhatsUp__address__zip zip;
   
  String state;
   
  String street;
   
  String? city;

  WhatsUp__address(
    {
    
    required this.zip,
    
    required this.state,
    
    required this.street,
    
     this.city
    }
  );
    factory WhatsUp__address.fromJson(Map<String, dynamic> json) => _$WhatsUp__addressFromJson(json);
    Map<String, dynamic> toJson() => _$WhatsUp__addressToJson(this);
}

class Base__address__street__Type__5 {
   
  String a;

  Base__address__street__Type__5(
    {
    
    required this.a
    }
  );
    factory Base__address__street__Type__5.fromJson(Map<String, dynamic> json) => _$Base__address__street__Type__5FromJson(json);
    Map<String, dynamic> toJson() => _$Base__address__street__Type__5ToJson(this);
}

class Base__address__street__Type__6 {
   
  String c;

  Base__address__street__Type__6(
    {
    
    required this.c
    }
  );
    factory Base__address__street__Type__6.fromJson(Map<String, dynamic> json) => _$Base__address__street__Type__6FromJson(json);
    Map<String, dynamic> toJson() => _$Base__address__street__Type__6ToJson(this);
}

class Base__address__street__Type__7 {
   
  String b;

  Base__address__street__Type__7(
    {
    
    required this.b
    }
  );
    factory Base__address__street__Type__7.fromJson(Map<String, dynamic> json) => _$Base__address__street__Type__7FromJson(json);
    Map<String, dynamic> toJson() => _$Base__address__street__Type__7ToJson(this);
}

class Base__address {
   
  String zip;
   
  String state;
   
  String city;
   
  Base__address__street? street;

  Base__address(
    {
    
    required this.zip,
    
    required this.state,
    
    required this.city,
    
     this.street
    }
  );
    factory Base__address.fromJson(Map<String, dynamic> json) => _$Base__addressFromJson(json);
    Map<String, dynamic> toJson() => _$Base__addressToJson(this);
}

class Base__age {
   
  String unit;
   
  int? value;

  Base__age(
    {
    
    required this.unit,
    
     this.value
    }
  );
    factory Base__age.fromJson(Map<String, dynamic> json) => _$Base__ageFromJson(json);
    Map<String, dynamic> toJson() => _$Base__ageToJson(this);
}

class MyUser__age {
   
  String unit;
   
  int? value;

  MyUser__age(
    {
    
    required this.unit,
    
     this.value
    }
  );
    factory MyUser__age.fromJson(Map<String, dynamic> json) => _$MyUser__ageFromJson(json);
    Map<String, dynamic> toJson() => _$MyUser__ageToJson(this);
}

class getPhone__return {
   
  String number;
   
  String type;

  getPhone__return(
    {
    
    required this.number,
    
    required this.type
    }
  );
    factory getPhone__return.fromJson(Map<String, dynamic> json) => _$getPhone__returnFromJson(json);
    Map<String, dynamic> toJson() => _$getPhone__returnToJson(this);
}

class getAddress__zip__country {
   
  String code;
   
  String name;

  getAddress__zip__country(
    {
    
    required this.code,
    
    required this.name
    }
  );
    factory getAddress__zip__country.fromJson(Map<String, dynamic> json) => _$getAddress__zip__countryFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__zip__countryToJson(this);
}

class getAddress__zip {
   
  getAddress__zip__country country;
   
  String code;

  getAddress__zip(
    {
    
    required this.country,
    
    required this.code
    }
  );
    factory getAddress__zip.fromJson(Map<String, dynamic> json) => _$getAddress__zipFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__zipToJson(this);
}

class getAddress__return__zip__country {
   
  String code;
   
  String name;

  getAddress__return__zip__country(
    {
    
    required this.code,
    
    required this.name
    }
  );
    factory getAddress__return__zip__country.fromJson(Map<String, dynamic> json) => _$getAddress__return__zip__countryFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__return__zip__countryToJson(this);
}

class getAddress__return__zip {
   
  getAddress__return__zip__country country;
   
  String code;

  getAddress__return__zip(
    {
    
    required this.country,
    
    required this.code
    }
  );
    factory getAddress__return__zip.fromJson(Map<String, dynamic> json) => _$getAddress__return__zipFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__return__zipToJson(this);
}

class getAddress__return {
   
  getAddress__return__zip zip;
   
  String state;
   
  String city;
   
  String street;

  getAddress__return(
    {
    
    required this.zip,
    
    required this.state,
    
    required this.city,
    
    required this.street
    }
  );
    factory getAddress__return.fromJson(Map<String, dynamic> json) => _$getAddress__returnFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__returnToJson(this);
}

class getPhone__return {
   
  String number;
   
  String type;

  getPhone__return(
    {
    
    required this.number,
    
    required this.type
    }
  );
    factory getPhone__return.fromJson(Map<String, dynamic> json) => _$getPhone__returnFromJson(json);
    Map<String, dynamic> toJson() => _$getPhone__returnToJson(this);
}

class getAddress__zip__country {
   
  String code;
   
  String name;

  getAddress__zip__country(
    {
    
    required this.code,
    
    required this.name
    }
  );
    factory getAddress__zip__country.fromJson(Map<String, dynamic> json) => _$getAddress__zip__countryFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__zip__countryToJson(this);
}

class getAddress__zip {
   
  getAddress__zip__country country;
   
  String code;

  getAddress__zip(
    {
    
    required this.country,
    
    required this.code
    }
  );
    factory getAddress__zip.fromJson(Map<String, dynamic> json) => _$getAddress__zipFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__zipToJson(this);
}

class getAddress__return__zip__country {
   
  String code;
   
  String name;

  getAddress__return__zip__country(
    {
    
    required this.code,
    
    required this.name
    }
  );
    factory getAddress__return__zip__country.fromJson(Map<String, dynamic> json) => _$getAddress__return__zip__countryFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__return__zip__countryToJson(this);
}

class getAddress__return__zip {
   
  getAddress__return__zip__country country;
   
  String code;

  getAddress__return__zip(
    {
    
    required this.country,
    
    required this.code
    }
  );
    factory getAddress__return__zip.fromJson(Map<String, dynamic> json) => _$getAddress__return__zipFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__return__zipToJson(this);
}

class getAddress__return {
   
  getAddress__return__zip zip;
   
  String state;
   
  String city;
   
  String street;

  getAddress__return(
    {
    
    required this.zip,
    
    required this.state,
    
    required this.city,
    
    required this.street
    }
  );
    factory getAddress__return.fromJson(Map<String, dynamic> json) => _$getAddress__returnFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__returnToJson(this);
}

class getPhone__return {
   
  String number;
   
  String type;

  getPhone__return(
    {
    
    required this.number,
    
    required this.type
    }
  );
    factory getPhone__return.fromJson(Map<String, dynamic> json) => _$getPhone__returnFromJson(json);
    Map<String, dynamic> toJson() => _$getPhone__returnToJson(this);
}

class getAddress__zip__country {
   
  String code;
   
  String name;

  getAddress__zip__country(
    {
    
    required this.code,
    
    required this.name
    }
  );
    factory getAddress__zip__country.fromJson(Map<String, dynamic> json) => _$getAddress__zip__countryFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__zip__countryToJson(this);
}

class getAddress__zip {
   
  getAddress__zip__country country;
   
  String code;

  getAddress__zip(
    {
    
    required this.country,
    
    required this.code
    }
  );
    factory getAddress__zip.fromJson(Map<String, dynamic> json) => _$getAddress__zipFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__zipToJson(this);
}

class getAddress__return__zip__country {
   
  String code;
   
  String name;

  getAddress__return__zip__country(
    {
    
    required this.code,
    
    required this.name
    }
  );
    factory getAddress__return__zip__country.fromJson(Map<String, dynamic> json) => _$getAddress__return__zip__countryFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__return__zip__countryToJson(this);
}

class getAddress__return__zip {
   
  getAddress__return__zip__country country;
   
  String code;

  getAddress__return__zip(
    {
    
    required this.country,
    
    required this.code
    }
  );
    factory getAddress__return__zip.fromJson(Map<String, dynamic> json) => _$getAddress__return__zipFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__return__zipToJson(this);
}

class getAddress__return {
   
  getAddress__return__zip zip;
   
  String state;
   
  String city;
   
  String street;

  getAddress__return(
    {
    
    required this.zip,
    
    required this.state,
    
    required this.city,
    
    required this.street
    }
  );
    factory getAddress__return.fromJson(Map<String, dynamic> json) => _$getAddress__returnFromJson(json);
    Map<String, dynamic> toJson() => _$getAddress__returnToJson(this);
}

abstract class getToken {
  String (
    List<String> a
  );
}

abstract class getPhone {
  getPhone__return (
    String number,
    String type
  );
}

abstract class getAddress {
  getAddress__return (
    getAddress__zip zip,
    String state,
    String street,
    String city
  );
}

abstract class getToken {
  String (
    List<String> a
  );
}

abstract class getPhone {
  getPhone__return (
    String number,
    String type
  );
}

abstract class getAddress {
  getAddress__return (
    getAddress__zip zip,
    String state,
    String street,
    String city
  );
}

abstract class getToken {
  String (
    List<String> a
  );
}

abstract class getPhone {
  getPhone__return (
    String number,
    String type
  );
}

abstract class getAddress {
  getAddress__return (
    getAddress__zip zip,
    String state,
    String street,
    String city
  );
}

abstract class WhatsUp__getToken {
  String getToken(
    List<String> a
  );
}

abstract class MyFunctionInter__test {
  String test(
    String a
  );
}

abstract class MyFunctionInter__getToken {
  String getToken(
    List<String> a
  );
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class GrandParent__fromGrandParent {
  String value;

  GrandParent__fromGrandParent(this.value);


  factory GrandParent__fromGrandParent.fromJson(String json) => GrandParent__fromGrandParent(json);
  String toJson() => value;
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class Base__fromGrandParent {
  String value;

  Base__fromGrandParent(this.value);


  factory Base__fromGrandParent.fromJson(String json) => Base__fromGrandParent(json);
  String toJson() => value;
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class Base__address__street {
  String value;

  Base__address__street(this.value);


  factory Base__address__street.fromJson(String json) => Base__address__street(json);
  String toJson() => value;
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class MyUser__fromGrandParent {
  String value;

  MyUser__fromGrandParent(this.value);


  factory MyUser__fromGrandParent.fromJson(String json) => MyUser__fromGrandParent(json);
  String toJson() => value;
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class WhatsUp__customType {
  String value;

  WhatsUp__customType(this.value);


  factory WhatsUp__customType.fromJson(String json) => WhatsUp__customType(json);
  String toJson() => value;
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class GrandParent__fromGrandParent {
  String value;

  GrandParent__fromGrandParent(this.value);


  factory GrandParent__fromGrandParent.fromJson(String json) => GrandParent__fromGrandParent(json);
  String toJson() => value;
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class Base__fromGrandParent {
  String value;

  Base__fromGrandParent(this.value);


  factory Base__fromGrandParent.fromJson(String json) => Base__fromGrandParent(json);
  String toJson() => value;
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class Base__address__street {
  String value;

  Base__address__street(this.value);


  factory Base__address__street.fromJson(String json) => Base__address__street(json);
  String toJson() => value;
}

@JsonSerializable(explicitToJson: true, includeIfNull: false)
class MyUser__fromGrandParent {
  String value;

  MyUser__fromGrandParent(this.value);


  factory MyUser__fromGrandParent.fromJson(String json) => MyUser__fromGrandParent(json);
  String toJson() => value;
}