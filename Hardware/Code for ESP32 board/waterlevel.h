float duration, distance;

void waterLevelPinSet(int trigPin, int echoPin){

  pinMode(echoPin,INPUT);
  pinMode(trigPin,OUTPUT);
}

int waterLevelCalculator(int trigPin, int echoPin){

    digitalWrite(trigPin,LOW);
    delayMicroseconds(2);

    digitalWrite(trigPin,HIGH);
    delayMicroseconds(20);

    digitalWrite(trigPin,LOW);

    float durationSum = 0;

    //for(int i=0;i<20;i++){
      //durationSum = durationSum + pulseIn(echoPin, HIGH);
    //}

    duration = pulseIn(echoPin, HIGH);

    distance = (duration / 2) * 0.343;

    Serial.println(distance);

    int level = map(distance,200,600,95,5);

    //int level = (int)(duration/100);

    if(level>100){
      level = 100;
    }
    if(level<0){
      level = 0;
    }

    if(level>90 && level!=100){
      inletValve = 0;
    }

    if(level<20 && level!=0){
      digitalWrite(OUTLETVALVE,LOW);
      digitalWrite(12,HIGH);
    }else{
      digitalWrite(OUTLETVALVE,HIGH);
      digitalWrite(12,LOW);
    }

    return level;
}
