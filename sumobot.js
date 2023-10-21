// ev3_waitForButtonPress();

// Constants
const SPEED = 500;
const VIBRATESPEED = 1000;
const DETECTRAD = 40;

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
let previous_color = 0;
let direction = 1;
let firstrun = true;
let atCenter = false;

function colorCalibrator(){
    let r = 0;
    let g = 0;
    let b = 0;
    let time = 0;
    function getColor() {
        r = r + ev3_colorSensorRed(colorSensor);
        g = g + ev3_colorSensorGreen(colorSensor);
        b = b + ev3_colorSensorBlue(colorSensor);
    }
    
    for (let i = 0; i < 100; i = i +1) {
        getColor();
        ev3_pause(50);
        time = time + 1;
    }
    display(r / time);
    display(g / time);
    display(b / time);
}

function Main(){
    Setup();
    prev_color = GetColor();
    
    /*
    while(true){
        display(GetColor());
        ev3_pause(1000);
    }*/
    // SpinUntilFoundEnemy();
    // Rush();
    while(true){
        // if detected enemy, then rush
        if(IsEnemyInfront()) {
            Rush();
        } 
        // if cannot detect enemy, then move toward center
        if(GetColor() >= 5){
            SpinUntilFoundEnemy();
        }else {
            if (MoveTowardCenter() === 0){
                Rush();
            }
        }
    
    }
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
    // ev3_motorStart(vibrator);
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
    let color = 0;
    let shouldrush = 1;
    if(GetColor() <= 5) {
        MotorStart();
        prev_color = GetColor();
        if(IsEnemyInfront()) {
            Rush();
        }
        
        // at center
        if(color === 1){
            ev3_motorSetSpeed(leftwheel, SPEED);
            ev3_motorSetSpeed(rightwheel, -SPEED);
            MotorStart();
            while(GetColor()<=prev_color){
                if (IsEnemyInfront()){
                    shouldrush = 0;
                    break;
                }
            }
            SetMotorDefaultSpeed();
            atCenter = false;
        }else if(color === 6){
            atCenter = true;
            return 0;
        }else {
            ev3_motorSetSpeed(leftwheel, SPEED);
            ev3_motorSetSpeed(rightwheel, -SPEED);
            MotorStart();
            while(true){ 
                ev3_motorSetSpeed(leftwheel, direction*SPEED);
                ev3_motorSetSpeed(rightwheel, -direction*SPEED);
                color = GetColor();
                if (IsEnemyInfront()){
                    shouldrush = 0;
                    break;
                }
                // Green
                if(color>prev_color){
                    Turn(direction*60);
                    Move(30);
                    break;
                }
                if(color<=prev_color-2){
                    Turn(180);
                    break;
                }
                if(color < prev_color){
                    direction = -1;
                }else {
                    direction = 1;
                }
                
            }
            SetMotorDefaultSpeed();
        } 
        // Check enemy
        
    }
    return shouldrush;
    
}

function Turn(angle){
    // clockwise positive
    const initial_angle = ev3_gyroSensorAngle(gyroSensor);
    const direction = angle / math_abs(angle);
    ev3_motorSetSpeed(leftwheel, SPEED * direction);
    ev3_motorSetSpeed(rightwheel, - SPEED * direction);
    while(math_abs(ev3_gyroSensorAngle(gyroSensor) - initial_angle) < math_abs(angle) - 10*angle/90){
        MotorStart();
        
        // Check enemy
        if(IsEnemyInfront()) {
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
    while(!IsEnemyInfront() && !(GetColor() <= 3)){
        display("Not found");
    }
    Rush();
    SetMotorDefaultSpeed();
}

const standardR = [undefined,178,256,46,72,34,128];
const standardG = [undefined,32,199,80,153,47,31];
const standardB = [undefined,66,77,58,200,111,107];
// set prev color to current color
function GetColor() {
    const Red = ev3_colorSensorRed(colorSensor);
    const Green = ev3_colorSensorGreen(colorSensor);
    const Blue = ev3_colorSensorBlue(colorSensor);
    
    let minValue = 10000;
    let possible_index = 0;
    let delta = 0;
    for(let i = 1; i < 7; i = i + 1 ){
        delta = math_abs(Red - standardR[i]) + math_abs(Green - standardG[i]) + math_abs(Blue - standardB[i]);
        if(delta < minValue){
            minValue = delta;
            possible_index = i;
        }
    }
    if(math_abs(previous_color-possible_index) > 1 && !firstrun){
        firstrun = false;
        return previous_color;
    }
    previous_color = possible_index;
    return possible_index;
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
    if(GetDistance() <= DETECTRAD){
        display("found!!");
        return true;
    }
    return false;
} 

function AtEdge(){
    // if reached yellow or reached red space
    return GetColor() === 2 || GetColor() === 1; 
}

function Rush(){
    ev3_motorSetSpeed(leftwheel, SPEED);
    ev3_motorSetSpeed(rightwheel, SPEED);
    ev3_motorStart(vibrator);
    MotorStart();
    while(IsEnemyInfront()){
        if(GetColor() === 1){
            Turn(180);
            break;
        }
        if(GetColor() <= 2 && !IsCollide()){
            break;
        }
    }
    ev3_motorStop(vibrator);
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