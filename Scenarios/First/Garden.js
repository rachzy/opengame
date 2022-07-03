import drawElement from "../DrawScenariosFunctions/DrawElement.js";

const gridRow = {
    entrance: "20-21-20-21",
    start: 20,
    end: 21 
}

const gridColumn = {
    start: 13,
    end: 22
}

export default function drawGarden(gameBoard) {
    drawElement("garden", gridRow, gridColumn, gameBoard);
}
