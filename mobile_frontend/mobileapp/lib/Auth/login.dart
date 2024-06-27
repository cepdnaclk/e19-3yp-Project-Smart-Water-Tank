import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';
import 'package:mobileapp/handle/userPro.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  Future<void> loginUser() async {
    final String email = _emailController.text;
    final String password = _passwordController.text;

    try {
      final response = await http.post(
        Uri.parse('http://54.208.4.191/api/user/login'),
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
        },
        body: json.encode({
          'email': email,
          'password': password,
        }),
      );

      final responseData = json.decode(response.body);
      print(responseData);

      if (response.statusCode == 200 && responseData['success']) {
        print(responseData['message']);
        //final userId = responseData['data']['userId'];
        final token = responseData['data']; // Extract the token from the response
        //print('user: $userId');
        //// Store the token for future use
        // You can use a state management solution like Provider or Riverpod to store the token globally
        // For simplicity, I'll store it in shared preferences
        // Make sure to import the shared_preferences package
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token);

        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Success'),
              content: Text('User logged in successfully'),
              actions: [
                TextButton(
                  child: Text('OK'),
                  onPressed: () {
                    Navigator.of(context).pop();
                    getUserInfoById(token);
                    Navigator.pushNamed(context, '/home');
                  },
                ),
              ],
            );
          },
        );
      } else if (response.statusCode == 200 && !responseData['success']) {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Error'),
              content: Text('Invalid email or password'),
              actions: [
                TextButton(
                  child: Text('OK'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                ),
              ],
            );
          },
        );
      } else {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Error'),
              content: Text('Error logging in: ${responseData['message']}'),
              actions: [
                TextButton(
                  child: Text('OK'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                ),
              ],
            );
          },
        );
      }
    } catch (e) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Error'),
            content: Text('Error: $e'),
            actions: [
              TextButton(
                child: Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    }
  }

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
    final userID= responseData['data']['_id'];
    final name=responseData['data']['fullName'];

    if (success) {
      // User exists, handle the data
      print('User Info: $data');
      Provider.of<userpro>(context, listen: false).setuser(userID);
      Provider.of<userpro>(context, listen: false).setname(name); 
    } else {
      // User doesn't exist
      final message = responseData['message'];
      print('User Info Error: $message');
    }

  }
  else{
    print('User Info Error: ${response.statusCode}');
  }}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              decoration: InputDecoration(
                labelText: 'Email',
              ),
            ),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                labelText: 'Password',
              ),
              obscureText: true,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: loginUser,
              child: Text('Login'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/signin');
              },
              child: Text('Sign Up'),
            )
          ],
        ),
      ),
    );
  }
}