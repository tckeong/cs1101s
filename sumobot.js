const motor_b = ev3_motorB();
const motor_c = ev3_motorC();
const servo_motor = ev3_motorD();
const color_sensor = ev3_colorSensor();
const ultrasonic_sensor = ev3_ultrasonicSensor();
const gyro_sensor = ev3_gyroSensor();

const second = x => x * 1000;
const angle = ev3_gyroSensorAngle(gyro_sensor);

function setup() {
    ev3_connected(motor_b) ? display("motor_b connected") : display("motor_b disconnect");
    ev3_connected(motor_c) ? display("motor_c connected") : display("motor_c disconnect");
    ev3_connected(servo_motor) ? display("servo_motor connected") : display("servo_motor disconnect");
    ev3_connected(color_sensor) ? display("color_sensor connected") : display("color_sensor disconnect");
    ev3_connected(ultrasonic_sensor) ? display("ultrasonic_sensor connected") : display("ultrasonic_sensor disconnect");
    ev3_connected(gyro_sensor) ? display("gyro_sensor connected") : display("gyro_sensor disconnect");
}

function walk(command, speed) {
    if (command === "stop") {
        ev3_motorStop(motor_b);
        ev3_motorStop(motor_c);
    } else {
        ev3_motorSetSpeed(motor_b, speed);
        ev3_motorSetSpeed(motor_c, speed);
        
        ev3_motorStart(motor_b);
        ev3_motorStart(motor_c);
    }
}

function calc_angle() {
    return math_abs(math_abs(angle) - math_abs(ev3_gyroSensorAngle(gyro_sensor)));
}

function getDistance() {
    return ev3_ultrasonicSensorDistance(ultrasonic_sensor)/10;
}

function turnToDefault(speed) {
    walk("stop", 0);
    ev3_motorSetSpeed(motor_b, speed);
    ev3_motorSetSpeed(motor_c, -speed);
    ev3_motorStart(motor_b);
    ev3_motorStart(motor_c);
    while(true) {
        let cur_angle = calc_angle();
        if(cur_angle % 360 >= 0 && cur_angle % 360 <= 10) {
            break;
        }
    }
}

// red 5 115, 22, 42
// yellow 4
// green 32,52,40
// cyan 2
// blue 30, 50, 67
// magenta 5 74, 23, 64
function getColorDistance() {
    const index = ev3_colorSensorGetColor();
    
    if(index === 0) {
        display("no color");
    } else {
        // blue
        if(index === 2) {
            
        } else if(index === 3) {  // green 
            
        } else if (index === 4) {  // yellow 
            
        } else if (index === 5) {  // red
            
        } else if (index === 6) {  // white
             
        } else {
            
        }
    }
}

function main() {
    
}

walk("walk", 500);
ev3_pause(second(10));