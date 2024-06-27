import 'package:flutter/material.dart';
import 'pages/home.dart';
import 'pages/In_out.dart';
import 'pages/Tank.dart';
import 'pages/bill.dart';
import 'pages/loading.dart';
import 'pages/usage.dart';
import 'Auth/login.dart';
import 'Auth/signup.dart';
import 'package:provider/provider.dart';
import 'package:mobileapp/handle/userPro.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => userpro()),
      ],
      child: MyApp(),
    ),
  );
}


class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context)=>MaterialApp(
    // Your code here
  debugShowCheckedModeBanner: false,
  initialRoute: '/login',
  routes:{
    
    '/':(context) => Loading(),
    '/home':(context) => Home(),
    '/tank':(context) => Tank(),
    '/inout':(context) =>In_out(),
    '/bill':(context) => Bill(),
    '/usage':(context) => Usage(),
    '/login':(context) =>  LoginPage(),
    '/signin':(context) => RegisterPage(),
  }
);

}
