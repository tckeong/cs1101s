// ev3_waitForButtonPress();

// Constants
const SPEED = 500;
const VIBRATESPEED = 1000;
const DETECTRAD = 30;

// Motors
const vibrator = ev3_motorB();
const leftwheel = ev3_motorA();
const rightwheel = ev3_motorD();

// Sensors
const gyroSensor = ev3_gyroSensor();
const ultraSensor = ev3_ultrasonicSensor();
const colorSensor = ev3_colorSensor();

//  Colors      0           1      2        3      4      5        6
const COLORS = [undefined,"red","yellow","green","cyan","blue","magenta"];

// Variables
let prev_color = 0;
let angle = 0;
let desired_turn_angle = 0;
let initial_angle = 0;

function Main(){
    Setup();
    while(true){
        
        
        // SpinUntilFoundEnemy();
        // Rush();
    }
    // SpinUntilFoundEnemy();
    // Rush();
    // while(true){
        
        // display(GetDistance());
        // ev3_pause(1000);
        
        // // if detected enemy, then rush
        // if(IsEnemyInfront()) {
        //     Rush();
        // } else {
        //     // if cannot detect enemy, then move toward center
        //     MoveTowardCenter();
        // //     // when reached center, spin until found enemy
        //     SpinUntilFoundEnemy();
        //     // if meet enemy, then rush
        //     Rush();
        // }
}


function Setup() {
    // Connections
    ev3_connected(leftwheel) ? display("leftwheel connected") : display("leftwheel disconnect");
    ev3_connected(rightwheel) ? display("rightwheel connected") : display("rightwheel disconnect");
    ev3_connected(vibrator) ? display("vibrator connected") : display("vibrator disconnect");
    ev3_connected(colorSensor) ? display("colorSensor connected") : display("colorSensor disconnect");
    ev3_connected(ultraSensor) ? display("ultraSensor connected") : display("ultraSensor disconnect");
    ev3_connected(gyroSensor) ? display("gyroSensor connected") : display("gyroSensor disconnect");
    
    // Motors
    ev3_motorSetSpeed(vibrator, VIBRATESPEED);
    SetMotorDefaultSpeed();
    ev3_motorSetStopAction(leftwheel, "brake");
    ev3_motorSetStopAction(rightwheel, "brake");
    
    // Start vibrator
    ev3_motorStart(vibrator);
}

function SetMotorDefaultSpeed(){
    ev3_motorSetSpeed(leftwheel, SPEED);
    ev3_motorSetSpeed(rightwheel, SPEED);
}

function Move(distance){// distance in cm
    distance = distance*20;
    ev3_runToRelativePosition(leftwheel, distance, SPEED);
    ev3_runToRelativePosition(rightwheel, distance, SPEED);    
    ev3_pause(math_abs(distance/SPEED*1000));
}

function MoveTowardCenter(){
    let curr_color = GetColor();
    
    while(prev_color > 5) {
        Turn(30);
        if(IsMovingTowardCenter()) {
            Move(20);
        }
        GetColor();
        
        // Check enemy
        if(IsEnemyInfront()) {
            Rush();
            break;
        }
    }
    
}

function Turn(angle){
    // clockwise positive
    const initial_angle = ev3_gyroSensorAngle(gyroSensor);
    const direction = angle/math_abs(angle);
    ev3_motorSetSpeed(leftwheel, SPEED*direction);
    ev3_motorSetSpeed(rightwheel, -SPEED*direction);
    while(math_abs(ev3_gyroSensorAngle(gyroSensor)-initial_angle)<math_abs(angle)-10*angle/90){
        MotorStart();
        
        // Check enemy
        if(IsEnemyInfront()) {
            Rush();
            break;
        }
    }
    MotorStop();
    SetMotorDefaultSpeed();
}

function SpinUntilFoundEnemy(){
    ev3_motorSetSpeed(leftwheel, SPEED);
    ev3_motorSetSpeed(rightwheel, -SPEED);
    MotorStart();
    while(!IsEnemyInfront()){
        display("Not found");
    }
    MotorStop();
    SetMotorDefaultSpeed();
}

// red 5 115, 22, 42
// yellow 4
// green 32,52,40
// cyan 2
// blue 30, 50, 67
// magenta 5 74, 23, 64

// set prev color to current color
function GetColor() {
    // TODO
    const color_index = ev3_colorSensorGetColor();

    // TODO mapping color_index 
    if(color_index === 2) {
        // cyan
    } else if(color_index === 4) {
        // yellow
    } else {
         
    }
    return color_index;
}


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
