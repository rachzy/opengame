import drawGarden from "./First/Garden.js";
import drawHouse from "./First/House.js";

export default function drawFirstScenario(gameBoard) {
    drawGarden(gameBoard);
    drawHouse(gameBoard);
}