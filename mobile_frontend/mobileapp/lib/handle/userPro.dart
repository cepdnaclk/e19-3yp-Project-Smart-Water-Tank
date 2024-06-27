import 'package:http/http.dart' as http;
import 'package:flutter/material.dart' ;
import 'package:provider/provider.dart';
import 'dart:io';
import 'dart:convert';


Future<void> getUserInfoById(String token) async {
  print('user in: $token');
  const url = 'http://54.208.4.191/api/user/get-user-info-by-id';
  final response = await http.post(
    Uri.parse(url),
    headers: {
     'Authorization': 'Bearer $token',
    },
    body: {
      'token': token,
    },
  );

  if (response.statusCode == 200) {
    final responseData = json.decode(response.body);
    final success = responseData['success'];
    final data = responseData['data'];

    if (success) {
      // User exists, handle the data
      print('User Info: $data');
    } else {
      // User doesn't exist
      final message = responseData['message'];
      print('User Info Error: $message');
    }

  }
  else{
    print('User Info Error: ${response.statusCode}');
  }}


   Future<void> getWaterLevel(String userId) async {
  final url = 'http://54.208.4.191/api/user/hardware/receive-water-level?userId=$userId';
  final response = await http.get(Uri.parse(url),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json',
      },
      
    );
 if (response.statusCode == 200) {
    final responseData = json.decode(response.body);
    final success = responseData['success'];

    if (success) {
      final waterlevel = responseData['data']['waterLevel'];
      print('Water Level: $waterlevel');
    } else {
      final message = responseData['message'];
      print('Error: $message');
    }
  } else {
    print('Request failed: ${response.body}');
    
  }
}

class userpro extends ChangeNotifier{

  String _name = '';
  String _email = '';
  String _password = '';  
  String userId = '';
  bool inletvalue= false ;
  bool outletvalue= false ;
  bool motorpump= false ;
  String waterlevel = '0.0'; 
  String margin='';
  String tank_id = '';

  String get name => _name;
  String get email => _email;
  String get password => _password;
  String get id => userId;
  bool get inlet => inletvalue;
  bool get outlet => outletvalue;
  bool get pump => motorpump;
  String get level => waterlevel;
  String get marginlevel => margin;
  String get tankid => tank_id;
  
  void setuser(String value){
    userId = value;
    notifyListeners();
  }

  void setname(String arr){
    
    _name = arr;
    notifyListeners();
  }

  void Setupdata(String userId){
    //print('user: $userId');
    getUserInfoById(userId);
    notifyListeners();
  }

  void getwaterLevel(){
    userId = id;
    getWaterLevel(userId);
  
    notifyListeners();
  }

}
