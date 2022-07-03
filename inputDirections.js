//String that determines the character position and receiveis all claimed positions, avoiding him to go on those
export let directions = {
  claimedPositions: "",
  x: 10,
  y: 10
};

//Function that will check if the next position is claimed. If it's not, the character is allowed to move
function checkIfNextPositionIsClaimed(afterFunction) {
  //Move the character it doesn't matter if the next position is claimed or no. The program will rollback him if it is by checking it later
  const afterFunctionName = afterFunction.name;
  afterFunction();

  const claimedPositions = directions.claimedPositions;

  //Get all the places inside of "claimedPositions" in "directions" string by splitting them through "{" (each "{" represents a different place)
  const places = claimedPositions.split("{");
  places.map((place) => {
    if (place) {
      //Get the X,Y, entrance and isInside from that current place.
      const getXY = place.split("["); //Each part of the string is separated by "[", and each part has a different meaning.
      const XYs = {
        x: getXY[0],
        y: getXY[1],
        entrance: getXY[2],
        isInside: getXY[3],
      };
      const eachClaimedPositionX = XYs.x.split(",");
      const eachClaimedPositionY = XYs.y.split(",");
      const currentPositionX = directions.x.toString();
      const currentPositionY = directions.y.toString();
      let isCurrentPositionClaimedX = false;
      let isCurrentPositionClaimedY = false;

      let isOnBorderX = false;
      let isOnBorderY = false;

      //Map functions to check if the current position of the character is the same as one of the places
      eachClaimedPositionX.map((pos) => {
        if (!eachClaimedPositionX) return;
        if (currentPositionX === pos) {
          isCurrentPositionClaimedX = true;
        }
      });

      eachClaimedPositionY.map((pos) => {
        if (!eachClaimedPositionY) return;
        if (currentPositionY === pos) {
          isCurrentPositionClaimedY = true;
        }
      });

      //If both strings return "true", that means that the character is trying to get inside of a place
      let isEntrance = false;
      let isInside = false;
      if (
        isCurrentPositionClaimedX === true &&
        isCurrentPositionClaimedY === true
      ) {
        //The character is only allowed to enter in a place through it's entrance. If he's trying to enter anywhere else, the string "isEntrance" will keep as "false" and the program will rollback him
        if (XYs.entrance) {
          // GUIDE ABOUT "entranceSplit"
          // entranceSplit[0] === it represents the first block of the entrance's grid row (Ex: 7) // It's always shorter than entranceSplit[1]
          // entranceSplit[1] === it represents the lastblock of the entrance's grid row (Ex: 10) // It's always bigger than the entranceSplit[0]
          // entranceSplit[2] === it represents the column of the entrance's grid (Ex: 3) // It's the column where the entrance will be localized
          const entranceSplit = XYs.entrance.split("-");
          let entrancePositions;
          if (entranceSplit[0] === entranceSplit[1]) {
            //If the entrance is one-block length
            entrancePositions = `${entranceSplit[0]},${entranceSplit[1]}`;
          } else {
            //If the entrance is more than one-block length
            for (let i = entranceSplit[0]; i < entranceSplit[1]; i++) {
              if (entrancePositions) {
                entrancePositions += `,${i}`;
              } else {
                entrancePositions = `${i}`;
              }
            }
          }

          const entrancePositionsSplit = entrancePositions.split(",");
          entrancePositionsSplit.map((pos) => {
            //Check if the character position is exactly the same as one of the entrance blocks
            if (
              directions.y.toString() === pos &&
              directions.x.toString() === entranceSplit[2]
            ) {
              //If the character is really inside the entrance, then
              //the string "isEntrance" will return as "true" and the character will be able to enter in that place
              isEntrance = true;

              //The option "isInside" will have it's value changed for "1" (that the program will read as "true") and the character will be able to move inside of that place without rollbacking
              XYs.isInside = "1";
              const setIsInsideAsTrue = place.replace("[0", "[1");
              const newDirections = directions.claimedPositions.replace(
                place,
                setIsInsideAsTrue
              );
              directions.claimedPositions = newDirections;
            }
          });
        }

        //If the character is not inside of the place that he's trying to enter, he won't be allowed to enter in it, then he will "colides" with the wall.
        if (XYs.isInside) {
          if (XYs.isInside === "1") {
            isInside = true;
          }
        }
        //He won't rollback the character if the character
        const borderValueX = eachClaimedPositionX[eachClaimedPositionX.length - 1];
        const borderValueY = eachClaimedPositionY[eachClaimedPositionY.length - 1];
        if(borderValueX === directions.x.toString() || borderValueY === directions.y.toString()) {
            if(isInside) {
                console.log("It's on border!");
            }
        }
        if (isEntrance) return;
        if (isInside) return;


        //If all strings returned as "false", rollback the character according to the name of the function executed to move him (afterFunction())
        if (afterFunctionName === "moveXMinus") directions.x++;
        if (afterFunctionName === "moveXPlus") directions.x--;
        if (afterFunctionName === "moveYMinus") directions.y++;
        if (afterFunctionName === "moveYPlus") directions.y--;
      } else {
        const setIsInsideAsTrue = place.replace("[1", "[0");
        const newDirections = directions.claimedPositions.replace(
          place,
          setIsInsideAsTrue
        );
        directions.claimedPositions = newDirections;
      }
    }
  });
}

const moveCharacter = {
  ArrowUp: function () {
    if (directions.x === 0) return;
    function moveXMinus() {
      directions.x--;
    }
    checkIfNextPositionIsClaimed(moveXMinus);
  },
  ArrowDown: function () {
    if (directions.x === 21) return;
    function moveXPlus() {
      directions.x++;
    }
    checkIfNextPositionIsClaimed(moveXPlus);
  },
  ArrowLeft: function () {
    if (directions.y === 0) return;
    function moveYMinus() {
      directions.y--;
    }
    checkIfNextPositionIsClaimed(moveYMinus);
  },
  ArrowRight: function () {
    if (directions.y === 21) return;
    function moveYPlus() {
      directions.y++;
    }
    checkIfNextPositionIsClaimed(moveYPlus);
  },
};

export function saveClaimedPositions(positions) {
  directions.claimedPositions += `${positions}`;
}

export default function executeMovement(e) {
  const movePlayer = moveCharacter[e.key];
  if (!movePlayer) return;
  movePlayer();
}
