import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobileapp/handle/userPro.dart';
import 'package:provider/provider.dart';
import 'dart:convert';
import 'dart:io';
import 'package:liquid_progress_indicator_v2/liquid_progress_indicator.dart';


class Tank extends StatefulWidget{
  @override
  _tank createState() => _tank();
}

class _tank extends State<Tank>{

  int inlet_v=0;
  int outlet_v=0;
  double waterLevel=0.25;
 

  @override
  Widget build(BuildContext context){
    final screenSize = MediaQuery.of(context).size; // Define screenSize variable
    String uid= Provider.of<userpro>(context).id;
    String user= Provider.of<userpro>(context).name;
    waterLevel= double.parse(Provider.of<userpro>(context).level);
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
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
           Text('CURRENT WATER LEVEL',style: TextStyle(
            fontSize: 20,
            fontFamily: 'Rubik',
          ),),
        
          Text('Hi $user!!!',style: TextStyle(
            fontSize: 20,
            fontFamily: 'Rubik',
          ),),
         Container(


           
           
            margin: EdgeInsets.fromLTRB(20, 5, 20, 5),
            //color: Colors.amber,
            child:SizedBox(
          height: screenSize.height * 0.4,
          width: screenSize.width*0.5, // Set maximum height for the image
         child:  LiquidCircularProgressIndicator(
          value: waterLevel, // Set the progress value between 0.0 and 1.0
          valueColor: AlwaysStoppedAnimation(Color.fromARGB(207, 27, 123, 201)),
          backgroundColor: Colors.white,
          direction: Axis.vertical,
          center: Text("$waterLevel"),
          borderColor: const Color.fromARGB(255, 15, 41, 63),
          borderWidth: 5,
        ),
              ),
        ),
            
         
          Container(
             
            color: Colors.cyan,
            child:Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                DropdownButton<String>(
  items: const [
    DropdownMenuItem<String>(value: '10',child: Text('10%'),),
    DropdownMenuItem<String>(value: '20',child: Text('20%'),),
    DropdownMenuItem<String>(value: '30',child: Text('30%'),),
    DropdownMenuItem<String>(value: '40',child: Text('40%'),),
    DropdownMenuItem<String>(value: '50',child: Text('50%'),),
    DropdownMenuItem<String>(value: '60',child: Text('60%'),),
  ],
  hint: const Text('Select lower margin'),
  onChanged: (String? value) {},
),
DropdownButton<String>(
  items: const [
    DropdownMenuItem<String>(value: '50',child: Text('50%'),),
    DropdownMenuItem<String>(value: '60',child: Text('60%'),),
    DropdownMenuItem<String>(value: '70',child: Text('70%'),),
    DropdownMenuItem<String>(value: '80',child: Text('80%'),),
    DropdownMenuItem<String>(value: '90',child: Text('90%'),),
    DropdownMenuItem<String>(value: '100',child: Text('100%'),),
  ],
  hint: const Text('Select higher margin'),
  onChanged: (String? value) {},
),
              ],
            ),
          ),
          Container(
            child:
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                crossAxisAlignment: CrossAxisAlignment.center,
                      
                
                children: [
                Container(
                  padding: EdgeInsets.all(20),
                    child: Row(
                       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                       crossAxisAlignment: CrossAxisAlignment.center,
                      
                      children: [
                    Text('Water   in:',style: TextStyle(
                      fontSize: 20,
                      fontFamily: 'Rubik',
                     ),),
                    Text('$inlet_v'+'l',style: TextStyle(
                    fontSize: 20,
                    fontFamily: 'Rubik',
                    ),),
                    IconButton(onPressed: () {
                      setState(() {
                        inlet_v=0;
                      });
                    },
                    icon:Icon(Icons.undo),)],

                ),),
            
                  Row(
                       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                       crossAxisAlignment: CrossAxisAlignment.center,
                      
                      children: [
                    Text('Water out:',
                      style: TextStyle(
                      fontSize: 20,
                      fontFamily: 'Rubik',
                      ),),
                    Text('$outlet_v'+'l',style: TextStyle(
                    fontSize: 20,
                      fontFamily: 'Rubik',
                      ),),
                    IconButton(onPressed:(){
                     setState(() {
                       outlet_v=0;
                     }); 
                    }, icon: Icon(Icons.undo))],

                ),
                 Consumer<userpro>(
              builder: (context, userpro, child) {
                return ElevatedButton(
                  onPressed: () {
                    //userpro.Setupdata(uid);
                    userpro.getwaterLevel();
                    
                  },
                  child: Text('get data'),
                );
              },
            ),
              ],)
              ),
               
              ],
            ),
             
          );

    
  }
}