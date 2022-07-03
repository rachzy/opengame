import { saveClaimedPositions } from "../../inputDirections.js";

export default function claimPositions(title, gridRow, gridColumn) {
    let positionsThatWillBeClaimedX;
    let positionsThatWillBeClaimedY;

    let highestGridRow = gridRow.start;
    let highestGridColumn = gridColumn.start;

    let shortestGridRow = gridRow.end - 1;
    let shortestGridColumn = gridRow.end - 1;

    if (highestGridRow < gridRow.end) {
        highestGridRow = gridRow.end - 1;
        shortestGridRow = gridRow.start - 1;
    }
    if (highestGridColumn < gridColumn.end) {
        highestGridColumn = gridColumn.end - 1;
        shortestGridColumn = gridColumn.start - 1;
    }

    for (let i = (shortestGridRow + 1); i <= highestGridRow; i++) {
        if (!i) return;
        if (!positionsThatWillBeClaimedX) {
            positionsThatWillBeClaimedX = `{${i}`;
        } else {
            positionsThatWillBeClaimedX += `,${i}`;
        }
    }

    for (let i = (shortestGridColumn + 1); i <= highestGridColumn; i++) {
        if (!i) return;
        if (!positionsThatWillBeClaimedY) {
            positionsThatWillBeClaimedY = `[${i}`;
        } else {
            positionsThatWillBeClaimedY += `,${i}`;
        }
    }
    let allClaimedPositions = `${positionsThatWillBeClaimedX}${positionsThatWillBeClaimedY}`;

    if(gridRow.entrance) {
        const getEntrancePositions = gridRow.entrance.split('-');

        const getEntranceRowStart = Math.floor(getEntrancePositions[1]);
        const getEntranceRowEnd = Math.floor(getEntrancePositions[3]);
        
        let highestX = getEntranceRowStart;
        let lowestX = getEntranceRowEnd;
        if(lowestX > highestX) {
            lowestX = getEntranceRowStart;
            highestX = getEntranceRowEnd
        }

        let removeFromClaimX;
        for(let i = lowestX; i <= highestX; i++) {
            if(removeFromClaimX) {
                removeFromClaimX += `,${i}`
            } else {
                removeFromClaimX = `${i}`;
            }
        }
  
        const getEntranceColumnStart = Math.floor(getEntrancePositions[0]);
        allClaimedPositions += `[${lowestX}-${highestX}-${getEntranceColumnStart}[0`;
    }
    
    saveClaimedPositions(allClaimedPositions);
}