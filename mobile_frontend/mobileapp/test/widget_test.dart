// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobileapp/pages/bill.dart';
import 'package:mobileapp/pages/in_out.dart';
import 'package:mobileapp/main.dart';
import 'package:mobileapp/pages/tank.dart';
import 'package:mobileapp/Auth/login.dart';
import 'package:mobileapp/pages/home.dart';
import 'package:mobileapp/pages/usage.dart';

void main() {
  
  
  testWidgets('Home widget test', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: Home()));

    final appBarFinder = find.byType(AppBar);
    expect(appBarFinder, findsOneWidget);

    final imageFinder = find.byType(Image);
    expect(imageFinder, findsOneWidget);

    final titleFinder = find.text('WATER TANK');
    expect(titleFinder, findsOneWidget);
  });
   testWidgets('Bill widget test', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: Bill()));

    // Add your test assertions here
    expect(find.text('Your monthly bill so far:'), findsOneWidget);
    expect(find.text('Your monthly bill margin:'), findsOneWidget);
  });

   testWidgets('In_out widget test', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: In_out()));

    // Add your test assertions here
    expect(find.text('Inlet Value'), findsOneWidget);
    expect(find.text('Outlet Value'), findsOneWidget);
    expect(find.text('Water Pump'), findsOneWidget);
    expect(find.text('Check-up the tank'), findsOneWidget);
  });

   testWidgets('Tank widget test', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: Tank()));

    // Add your test assertions here
    expect(find.text('Water   in:'), findsOneWidget);
    expect(find.text('Water out:'), findsOneWidget);
  });
}



