/*
 * Author: Jonathan Reardon.
 * Project: AimTrainerGame.
 *
 * Summary: this project is heavily inspire by a flash based game "http://www.aimbooster.com/", all visual aspects are being created using the p5.js library "https://p5js.org/".
 */


/* target class
 * this will store and show the targets
 */
class Target {
    //this construcor will generate a random location for each new target
    constructor() {
        this.x = random(50, 700);
        this.y = random(50, 450);
        this.r = 1;
        this.multiplyer = 1;
    }

    //update method will update the radius of the target and will also keep track of how many targets have dissapeared (lives lost)
    update() {
        if (this.r > 65) {
            this.multiplyer = -1;
        }
        else if (this.r < 0) {
            this.r = 0;
            this.x = 999999;
            this.multiplyer = 0;
            lives--;
        }
        this.r = this.r + (0.35 * this.multiplyer);
    }

    //check method will check for hit detection if mouse location is within target area returns true
    check() {
        if (mouseX < this.x + this.r / 2 && mouseX > this.x - this.r / 2 && mouseY < this.y + this.r / 2 && mouseY > this.y - this.r / 2) {
            return true;
        }
        else {
            return false;
        }
    }

    //show method displays the target onto the screen
    show() {
        fill(255);
        ellipse(this.x, this.y, this.r, this.r);
    }
}