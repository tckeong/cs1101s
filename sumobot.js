function GetDistance(){
    return math_floor(ev3_ultrasonicSensorDistance(ultraSensor)/10);
}

function GetAngle() {
    return ev3_gyroSensorAngle(gyroSensor);
}

function IsCollide() {
    return GetDistance() <= 13;
}


function IsEnemyInfront(){
    return GetDistance() <= DETECTRAD;
} 

function AtEdge(){
    // if reached yellow or reached red space
    return GetColor() === 2  GetColor() === 1; 
}

function Rush(){
    ev3_motorSetSpeed(leftwheel, SPEED);
    ev3_motorSetSpeed(rightwheel, SPEED);
    while(IsCollide()  !AtEdge() ){
        // display("Rushhh");
        if(!IsEnemyInfront()&&!IsCollide()){
            break;
        }
        MotorStart();
    }
    MotorStop();
    SetMotorDefaultSpeed();
}

function MotorStop(){
    ev3_motorStop(leftwheel);
    ev3_motorStop(rightwheel);
}

function MotorStart(){
    ev3_motorStart(leftwheel);
    ev3_motorStart(rightwheel);
}

function IsPushed() {
    // TODO
    angle = GetAngle();
    ev3_pause(1000);
    angle = GetAngle() - angle;
    if(!(angle >= 0 && angle <= 5)) {
        return true;
    }
    return false;
}


Main();
// display(ev3_gyroSensorAngle(gyroSensor));
// turn(100);
// display(ev3_gyroSensorAngle(gyroSensor));

// ev3_motorStart(motor_d);
// ev3_pause(10000);
