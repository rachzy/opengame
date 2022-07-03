import { directions } from "./inputDirections.js";

export default function drawCharacter(characterDiv) {
    const newCharacter = document.createElement("div");
    newCharacter.classList.add("character");
    newCharacter.style.gridRowStart = directions.x;
    newCharacter.style.gridColumnStart = directions.y;
    characterDiv.appendChild(newCharacter);
}