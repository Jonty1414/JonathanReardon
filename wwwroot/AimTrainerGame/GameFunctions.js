/*
 * Author: Jonathan Reardon.
 * Project: AimTrainerGame.
 *
 * Summary: this project is heavily inspire by a flash based game "http://www.aimbooster.com/", all visual aspects are being created using the p5.js library "https://p5js.org/".
 */


/* ::intToTime function::
 * this function take in an integer (seconds) and converts it into a string in the format (hours : minutes : seconds) 00:00:00
 * e.g. 120 seconds would be 00:02:00
 * e.g. 130 seconds would be 00:02:10
 */
function intToTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}


/* ::heart function::
 * this function will create a red heart at int x, int y location of size int size;
 */
function heart(x, y, size) {
    fill(255, 50, 50);
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
    fill(255);
}