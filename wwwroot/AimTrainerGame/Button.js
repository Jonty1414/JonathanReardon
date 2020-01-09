/*
 * Author: Jonathan Reardon.
 * Project: AimTrainerGame.
 *
 * Summary: this project is heavily inspire by a flash based game "http://www.aimbooster.com/", all visual aspects are being created using the p5.js library "https://p5js.org/".
 */


/* button class
 * these object will store and show the text and buttons onto the screen
 */
class Button {
    //constructor requires 4 arguments (string text, int thieSize, boolean box, int x, int y) 
    constructor(text, theSize, box, x, y) {

        this.text = text;                           //string; the text to be displayed.

        this.box = box;                             //boolean; if the text has abox around it, true/false.

        this.x = x;                                 //int; x location within canvas.

        this.y = y;                                 //int; y location within canvas.

        this.boxWidth = 75;                         //int; box width.

        this.boxHeight = 50;                        //int; box height.

        this.theSize = theSize;                     //int; text font size.

        this.boxX = this.x - this.boxWidth / 4;     //float; the x location of the box within the canvas.

        this.boxY = this.y - this.boxWidth / 2.5;   //float; the y location of the box within the canvas.
    }

    //check method will check for hit detection if mouse location is within button area returns true.
    check() {
        if (mouseX < this.boxX + this.boxWidth && mouseX > this.boxX && mouseY < this.boxY + this.boxHeight && mouseY > this.boxY) {
            return true;
        }
        else {
            return false;
        }
    }

    //show method displays the target onto the screen.
    show() {
        fill(50);
        if (this.box) { rect(this.boxX, this.boxY, this.boxWidth, this.boxHeight) }
        fill(255);
        textSize(this.theSize);
        text(this.text, this.x, this.y);
    }
}