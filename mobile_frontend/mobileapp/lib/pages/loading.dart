import 'package:flutter/material.dart';
import 'package:mobileapp/handle/userPro.dart';
import 'package:provider/provider.dart';

class Loading extends StatefulWidget{
  @override
  _load createState() => _load();
}

class _load extends State<Loading>{
  @override
  Widget build(BuildContext context){
    final screenSize = MediaQuery.of(context).size; // Define screenSize variable
   
        return Scaffold(
          appBar:AppBar(
            title: SizedBox(
              height: screenSize.height * 0.08, // Set maximum height for the image
              child: Image.asset(
                'assets/logo.png',
                fit: BoxFit.contain,
              ),
            ),
            //centerTitle: true,
            actions:[ 
              // ignore: prefer_const_constructors
              IconButton(onPressed:(){Navigator.pushNamed(context, '/home');}, icon: Icon(Icons.arrow_drop_down_sharp)
              ,
              color: Colors.black,), ],
            backgroundColor: Colors.white,
            

          ) ,
          body:Center(
        
            child: Image.asset(
              'assets/logo.png',)
           
          ),
        );
      }

  }
  
