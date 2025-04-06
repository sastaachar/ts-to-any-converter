



@JsonSerializable(explicitToJson: true, includeIfNull: false)
class MyFunctionInter {
  String lol;
  MyFunctionInterTest test;
  MyFunctionInterGetToken getToken;

  MyFunctionInter(
    {
    
    
    required this.lol,
    
    @JsonKey(ignore: true)
    required this.test,
    
    @JsonKey(ignore: true)
    required this.getToken
    }
  );

    factory MyFunctionInter.fromJson(Map<String, dynamic> json) => _$MyFunctionInterFromJson(json);

    Map<String, dynamic> toJson() => _$MyFunctionInterToJson(this);
}



@JsonSerializable(explicitToJson: true, includeIfNull: false)
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



@JsonSerializable(explicitToJson: true, includeIfNull: false)
abstract class MyFunctionInterTest {
  String operate(
    String a
  );

  factory MyFunctionInterTest.fromJson(Map<String, dynamic> json) => _$MyFunctionInterTestFromJson(json);

  bool toJson() => true;
}


@JsonSerializable(explicitToJson: true, includeIfNull: false)
abstract class MyFunctionInterGetToken {
  String operate(
    List<String> a
  );

  factory MyFunctionInterGetToken.fromJson(Map<String, dynamic> json) => _$MyFunctionInterGetTokenFromJson(json);

  bool toJson() => true;
}

