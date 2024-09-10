if (msg.payload == null)
    {
        return null;
    }
    
    var Solbattminimumconfig = global.get('solbattminimumconfig') || 10; 
    msg.solbattminimumconfig = Solbattminimumconfig;
    
    
    // Example PID controller function
    const Kp = 0.9; // Proportional gain
    const Ki = 0.06; // Integral gain
    const Kd = 0.1; // Derivative gain
    
    const MaxI = 80;
    let MaxIntegral = MaxI / Ki;
    
    let integral = global.get('msg.PID-integral')|| 0;
    
    // let prevError = 0;
    let prevError = global.get('msg.PID-prevError')|| 0;
    
    // Input: current process value (msg.payload) (aktuell wird zb nur 60 watt eingespeist)
    // const processValue = Math.round(global.get('solmateinjectpower'))|| 0;
    const processValue = msg.payload;
    
    global.set('msg.PID-processValue-Input', processValue);
    
    //const processValue = msg.payload;
    
    // Setpoint (desired value) (ziel zb 50 watt einspeisung)
    
    const setpoint = 10; // Adjust as needed (auf 5 watt Bezug hinregeln)
    
    // Calculate error (NEGATIV!)
    const error = - (setpoint - processValue);
    global.set('msg.PID-error', error);
    
    // Proportional term
    const P = Kp * error;
    
    // Integral term
    
    integral += error;
    integral = Math.max(-MaxIntegral, Math.min(MaxIntegral, integral));
    
    global.set('msg.PID-integral', integral);
    const I = Math.max(-MaxI, Math.min(MaxI, Ki * integral));
    global.set('msg.PID-I', I);
    
    
    // Derivative term
    const derivative = error - prevError;
    const D = Math.max(-10,Math.min(10, Kd * derivative));
    
    global.set('msg.PID-P', P);
    global.set('msg.PID-I', I);
    global.set('msg.PID-D', D);
    
    // Compute control output
    // const controlOutput = P + I + D;
    global.set('msg.PID-controlOutput-PID', P + I + D);
    global.set('msg.PID-controlOutput-PI', P + I );
    
    const controlOutput = P + I + D;
    
    // Update previous error
    prevError = error;
    global.set('msg.PID-prevError', error);
    
    
    // Output: control output (adjust actuator, e.g., motor speed)
    msg.payload = Math.round(controlOutput);
    
    global.set('msg.PID-controlOutput', msg.payload);
    
    msg.payload = Math.max(10,msg.payload);
    msg.payload = Math.min(190,msg.payload);
    
    var last_controlOutput = global.get('msg.PID-controlOutput-CUTOFF-FINAL');
    
    if (msg.payload < last_controlOutput)
    {
        msg.delay = 4000;
    }
    
    
    global.set('msg.PID-controlOutput-CUTOFF-FINAL', msg.payload);
    
    if (msg.noreturn == true)
    {
        return null;
    }
    
    return msg;
    