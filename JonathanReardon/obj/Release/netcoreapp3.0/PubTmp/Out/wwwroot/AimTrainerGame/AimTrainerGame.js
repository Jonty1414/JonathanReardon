/*
 * Author: Jonathan Reardon.
 * Project: AimTrainerGame.
 * 
 * Summary: this project is heavily inspire by a flash based game "http://www.aimbooster.com/", all visual aspects are being created using the p5.js library "https://p5js.org/".
 */


//declaring variables needed for the program to run.
let Targets = [];               //array of "Target" Objects;.

let lives = 3;                  //int; to keep track of lives lost.

let targetPerSec = 1.00;        //float; ammount of targets that will spawn per second at the start of the game.

let Num = 2;                    //int; used in calculation for targets per second (1/(4 * log(Num)))/(targetPerSec/2).

let targetTimer = 0.00;         //float; used to keep track of how much time has passed since the previous target spawned.

let timer = 0;                  //int; number of seconds that have passed since the game started.

let numTargets = 0;             //int; number of targets that have been added to the array of Targets.

let accuracy = 100.00;          //float; accuracy of click's as a percentage.

let totalShots = 0;             //int; total clicks since game has started used for accuracy calc's.

let hits = 0;                   //int; total hits since game has started used for accuracy calc's.

let started = false;            //boolean; stores the game's state, true == game has started, false == game is in the "start" or "retry" screen.

let maxTime = 0;                //int; stores the longest time the game has been played for since the page was last loaded.

let maxAccuracy = 0.00;         //float; store the accuracy from the longest time played since  the page was last loaded.

let maxTargetsPerSecond = 0.00; //float; store the highest targets per second from the longest time played since the page was last loaded.

let hitSound;                   //hit sound, .ogg sound file

let missSound;                  //miss sound, .ogg sound file

let AccuracyVisual;             //"Button" object for showing AccuracyVisual

let TimerVisual;                //"Button" object for showing TimerVisual 

let StartRetryVisual;           //"Button" object for showing StartRetryVisual 

let TargetsPerSecondVisual;     //"Button" object for showing TargetsPerSecondVisual 

let maxHighscoreVisual;         //"Button" object for showing maxHighscoreVisual 

let maxAccuracyVisual           //"Button" object for showing maxAccuracyVisual 

let maxTimerVisual;             //"Button" object for showing maxTimerVisual 

let maxTargetsPerSecondVisual;  //"Button" object for showing maxTargetsPerSecondVisual

let gameOverVisual;             //"Button" object for showing gameOverVisual;


/* ::setup function::
 * this function is that start point for the program, this will run once the preload function is finished, 
 * this creats the canvas on which the game will be displayed, positions it in the middle of the page
 * and sets up the Button object's used for the UI, timer, accuracy, and target per second.
 */
function setup() {

    //create and position canvas.
    var cvn = createCanvas(750, 500);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cvn.position(x, y);
    frameRate(60);  //lock framerate to 60 frames per second.

    //"Button" objects that will diplay on screen
    AccuracyVisual = new Button(accuracy, 18, false, 225, 20);
    TimerVisual = new Button(timer, 18, false, 10, 20);
    StartRetryVisual = new Button("start", 18, true, width/2 - 20, height/2 - 30);
    TargetsPerSecondVisual = new Button("Targets per second = ", 18, false, 500, 20);

    //"Button" objects that will display the highscore screen.
    gameOverVisual = new Button("Game Over", 25, false, 9999999, 150);
    maxHighscoreVisual = new Button("highscore of current session", 25, false, 215, 325);
    maxAccuracyVisual = new Button(maxAccuracy, 18, false, 225, 350);
    maxTimerVisual = new Button(maxTime, 18, false, 125, 350);
    maxTargetsPerSecondVisual = new Button("Targets per second = ", 18, false, 400, 350);
}


/* ::windowResized function::
 * this runs when the window is resized, this will simply make sure the game is in the middle of the page after the window has been resized.
 */
function windowResized() {
    cvn = createCanvas(750, 500);
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    cvn.position(x, y);
    frameRate(60);
}


/* ::draw function::
 * this function is the main draw loop, the will continuously loop until the game has ended, this function gets called 60 times every second
 * due to the framerate being locked to 60 frames per second.
 */
function draw() {
    //background colour is #757575
    background(75);

    //loops over each item in the Targets array, updates their location/size then draws them on the canvas.
    Targets.forEach(function(item){
        item.update();
        item.show();
    })

    //formatting the information that will be drawn onto the canvas, targets per second, accuracy, and timer.
    TargetsPerSecondVisual.text = "Targets per second = " + targetPerSec.toFixed(2);
    AccuracyVisual.text = "accuracy = " + accuracy.toFixed(2) + "%";
    TimerVisual.text = intToTime(timer);

    //drawing onto the canvas, targets per second, accuracy, and timer.
    TargetsPerSecondVisual.show();
    TimerVisual.show();
    AccuracyVisual.show();

    //if started == true, the game has been started.
    if (started) {
        //displaying number of lives as hearts
        for (let i = 0; i < lives; i++) {
            heart(700 - (i * 25), 475, 20);
        }

        //making sure the calculation for accuracy is never divide by 0;
        if (totalShots == 0){
            accuracy = 0;
        } else {
            accuracy = (hits/totalShots) * 100; // accuracy calculation.
        }

        //since its 60 frames per second, this will run once every 0.05 seconds.
        if (frameCount % 3 == 0){
            targetTimer += 0.05;
        }

        //if the length of time since the last target spawned (targetTimer) is greater than or equal to the current time between each target (1 / targetPerSec).
        if(targetTimer >= 1/targetPerSec){
            createTarget();     //spawns new target.

            targetTimer = 0;    //resets targetTimer.
        }

        //since its 60 frames per second, this will run once every 1 second.
        if(frameCount % 60 == 0){
            targetPerSec += (1/(4 * log(Num)))/(targetPerSec); //log graph to make sure the targets per second doesnt get too fast too quickly.
            Num += 10000;
            timer += 1;
        }

        //if lives is less than 1 the game is over.
        if (lives < 1) {
            //makes all remaining targets on the canvas disapear by setting their radius (r), to 0;
            Targets.forEach(function(item){
                item.r = 0;
                item.x = 999999;
                item.multiplyer = 0;
            })

            started = false;    //setting game state to false, false == game is in the "start" or "retry" screen.

            StartRetryVisual.text = "retry?";   //sets the button in the middle of the screen to be retry instead of start.

            gameOverVisual.x = 309;     //sets gameOverVisual x value to make it visable on screen

            //if timer is greater than maxTime, then this current run is a new highscore. new maxTime, maxAccuracy, and maxTargetsPerSecond have their new values set from this currednt run
            if (timer > maxTime) {
                maxTime = timer;
                maxAccuracy = accuracy;
                maxTargetsPerSecond = targetPerSec;
            }
        }
    } else { //game state is currently false, this sets formats and draws the highscore and retry button.
        maxTargetsPerSecondVisual.text = "Targets per second = " + maxTargetsPerSecond.toFixed(2);
        maxAccuracyVisual.text = "accuracy = " + maxAccuracy.toFixed(2) + "%";
        maxTimerVisual.text = intToTime(maxTime);

        StartRetryVisual.show();
        gameOverVisual.show();
        maxAccuracyVisual.show();
        maxTargetsPerSecondVisual.show();
        maxTimerVisual.show();
        maxHighscoreVisual.show();
    }
}


/* ::mousePressed function::
 * this function runs every time the mouse is clicked within the canvas.
 */
function mousePressed() {
    //if game state is true. increment the total shots by 1, then loops through each target in the "Targets" array.
    if (started){
        totalShots++;
        Targets.forEach(function (item) {
            //if the mouse is within the bounds of a target, that targets radius is reduced to 0 (not visable) and the number of "hits" is increments by 1.
            if (item.check()){
                item.r = 0;
                item.x = 999999;
                item.multiplyer = 0;
                hits++;
            }
        })
    }

    //if game state is false. checks if mouse is within the bounds on the start/retry button.
    else if (StartRetryVisual.check()) {
        //resets all variables to their initial values.
        resetGame();
    }
}



/* ::resetGame function::
 * this function simply resets the variables the their initial values
 */
function resetGame() {
    started = true;
    gameOverVisual.x = 999999;
    createTarget();
    lives = 3;
    Targets = [];
    totalShots = 0;
    hits = 0;
    timer = 0;
    Num = 2;
    accuracy = 100;
    targetPerSec = 1;
}


/* ::createTarget function::
 * this function simply creates a new "Target" object, add it to the "Targets" array, and increments the number of targets "numTargets" by 1;
 */
function createTarget() {
    Targets[numTargets] = new Target();
    numTargets++;
}