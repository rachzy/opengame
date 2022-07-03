//Default strings
const gameBoard = document.querySelector("#game-board");
let gameBoardHtml;

//Render strings
let GAME_SPEED = 5;
let lastRender;

//Import functions
import executeMovement from './inputDirections.js';
import drawCharacter from './character.js';

//Main function that will render the game
function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRender) / 1000;
    if(secondsSinceLastRender < 1 / GAME_SPEED) return;
    lastRender = currentTime;

    update();
}

//Draw First Scenario
import drawFirstScenario from './Scenarios/First.js';
drawFirstScenario(gameBoard);

//Get the html of the current scenario to avoid deleting places of that scenario
function getCurrentPlaceHtml() {
    gameBoardHtml = gameBoard.innerHTML;
}
getCurrentPlaceHtml();

//Move the character according to the key that was pressed
document.addEventListener("keydown", function(e) {
    executeMovement(e);
    update();
});

//Function that draws the character and re-draws all the scenario elements
function draw() {
    const additionalPlaces = gameBoardHtml.replace('<div id="character" class="character"></div>', '');
    gameBoard.innerHTML = additionalPlaces;
    drawCharacter(gameBoard);
}

//Function responsible to render everything on the viewport
function update() {
    draw();
}

main();