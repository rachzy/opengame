import claimPositions from "./ClaimPositions.js";

export default function drawElement(classList, gridRow, gridColumn, gameBoard) {
    const newElement = document.createElement("div");
    newElement.classList.add(classList);
    newElement.style.gridRowStart = gridRow.start;
    newElement.style.gridRowEnd = gridRow.end;
    newElement.style.gridColumnStart = gridColumn.start;
    newElement.style.gridColumnEnd = gridColumn.end;

    gameBoard.appendChild(newElement);

    if(gridRow.entrance) {
        const entranceStart = gridRow.entrance.split('-');
        const newElementEntrance = document.createElement("div");
        newElementEntrance.style.gridArea = `${entranceStart[0]} / ${entranceStart[1]} / ${entranceStart[2]} / ${entranceStart[3]}`;
        newElementEntrance.style.backgroundColor = "rgba(3, 3, 3, 0.8)";

        gameBoard.appendChild(newElementEntrance);
    }

    claimPositions(classList, gridRow, gridColumn);
}