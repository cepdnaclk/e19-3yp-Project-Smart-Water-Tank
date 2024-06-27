import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
//pacakages 
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Water Tank Analysis',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Water Tank Analysis Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              height: 550,
              child: SfCartesianChart(
                title: ChartTitle(text: "Water tank analysis"),
                primaryXAxis: CategoryAxis(
                  title: AxisTitle(text: "Week Days"),
                ),
                primaryYAxis: NumericAxis(
                  title: AxisTitle(text: "Liters"),
                ),
                series: <CartesianSeries>[
                  ColumnSeries<WaterData, String>(
                    dataSource: getColumnData(),
                    xValueMapper: (WaterData level, _) => level.x,
                    yValueMapper: (WaterData level, _) => level.y,
                    dataLabelSettings: const DataLabelSettings(isVisible: true),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class WaterData {
  String x; // Week days
  double y; // Liters
  WaterData(this.x, this.y);
}

List<WaterData> getColumnData() {
  // This function returns a list of WaterData which represents the data for each day of the week (x-axis) and the amount of water in liters (y-axis).
  List<WaterData> columnData = <WaterData>[
    WaterData('Monday', 35),
    WaterData('Tuesday', 28),
    WaterData('Wednesday', 34),
    WaterData('Thursday', 32),
    WaterData('Friday', 40),
    WaterData('Saturday', 45),
    WaterData('Sunday', 50),
  ];
  return columnData;
}