import drawElement from "../DrawScenariosFunctions/DrawElement.js";

const gridRow = {
    entrance: "8-4-8-7",
    start: 2,
    end: 9
}

const gridColumn = {
    start: 2,
    end: 9
}

export default function drawHouse(gameBoard) {
    drawElement("house", gridRow, gridColumn, gameBoard);
}