let gameBoard = {}


const rows = 3;
const columns = 3;

const gameboard = new Array(rows);

for(let i =  0; i < rows; i ++){
    gameboard[i] = new Array(columns);
}
emptyBoard = gameboard;

let gameContainer = document.querySelector(`#container`);


const drawBoard = (function(){
    for(let row = 0; row < rows; row++){
        for(let column = 0; column < columns; column++){
            let cube = document.createElement(`div`);
            cube.classList.add(`cubeIn`);
            cube.dataset.row = row;
            cube.dataset.column = column;
            cube.style.backgroundColor = `green`;
            gameContainer.appendChild(cube);
        }
    } 

})();



//Factory function for creating player object.
function createPlayer(playerName, playerMarker){
    const playerHolder = {};



    playerHolder.playerName =  playerName;
    playerHolder.playerMarker = playerMarker;

    if(playerHolder.playerMarker == `X`){
        playerHolder.playerState = 1;
    } else if(playerHolder.playerMarker = `0`){
        playerHolder.playerState = 0;
    }

    playerHolder.checkInfo = function (){
        console.log(`Your name is ${playerHolder.playerName} and you chose ${playerHolder.playerMarker} and ${playerHolder.playerState}`);
    }

    return playerHolder;
}

//handles the eventlisteners for the inputs and creates the players based on  a given logic.


let playerSel =(function(){

    let firstPlayer =  document.querySelector(`#player1`);
    let firstPlayerN;

    let secondPlayer = document.querySelector(`#player2`);
    let secondPlayerN;

    firstPlayer.addEventListener(`input`, function(){
        firstPlayerN = firstPlayer.value;
    })

    secondPlayer.addEventListener(`input`, function(){
        secondPlayerN = secondPlayer.value;
    })

    let subInfo = document.querySelector(`#sbBt`);
    const markerStatus = document.querySelectorAll(`input[type="radio"]`);

    subInfo.addEventListener(`click`, function(event){
        event.preventDefault();
        let markerVal;

    for (let marker of markerStatus){
        if (marker.checked){
            markerVal = marker.value;
        }
        firstPlayerC(markerVal);
        secondPlayerC(markerVal);
        }
    })


    function firstPlayerC(markerVal) {
        if(firstPlayerN != undefined && secondPlayerN != undefined && markerVal != undefined){
            return player1 = createPlayer(firstPlayerN,markerVal);
        }
    }

    function secondPlayerC(markerVal){
        if(Object.keys(player1).length > 0 && secondPlayerN != undefined && markerVal == `X`){
            return player2 = createPlayer(secondPlayerN, `0`);
        } else if(Object.keys(player1).length > 0 && secondPlayerN != undefined && markerVal == `0`){
            return player2 =  createPlayer(secondPlayerN, `X`);
        }
    }

})();



//Controls the display of the values, and the population of the empty array
let displayControll = (function(){
    //event delegation to parent container
    gameContainer.addEventListener(`click`, function(event){
        if(event.target.classList.contains(`cubeIn`)){
            let row = event.target.dataset.row;
            let column = event.target.dataset.column;
            let changeDisp = document.querySelector(`[data-row = "${row}"][data-column = "${column}"]`);
            //console.log(emptyBoard[row][column]);
        if(emptyBoard[row][column] === ` ` || emptyBoard[row][column] == undefined && player1.playerState == 1){
            emptyBoard[row][column] = `X`;
            player1[`playerState`] = 0;
            player2[`playerState`] = 1;
            changeDisp.textContent = `X`;
            gameController.checkwinner();
        } else if(emptyBoard[row][column] === ` ` || emptyBoard[row][column] == undefined && player2.playerState == 1){
            emptyBoard[row][column] = `0`;
            player2[`playerState`] = 0;
            player1[`playerState`] = 1;
            changeDisp.textContent = `0`;
            gameController.checkwinner();
        }
    }
    })
})();

//controls the game flow and declares a winner 
let gameController = function(){

    function checkRowWin(marker){

    for(let row = 0; row < 3; row++){
        if(emptyBoard[row][0] == marker && emptyBoard[row][1] == marker && emptyBoard[row][2] == marker){
             return true;
        }
    }
   return false;
}

    function checkColumnWint(marker){

    for(let column = 0; column < 3; column++){
        if(emptyBoard[0][column] == marker && emptyBoard[1][column] ==  marker && emptyBoard[2][column] == marker){
            return true;
        }
    }
   return false;
    }

   function checkDiagL(marker){
    if(emptyBoard[0][0] == marker && emptyBoard[1][1] == marker && emptyBoard[2][2] == marker){
        return true;
        }
    return false;
    } 


    function checkDiagR(marker){
        if(emptyBoard[0][2] == marker && emptyBoard[1][1] == marker && emptyBoard[2][0] == marker){
            return true;
        }

    return false;
    }

function checkwinner(){

const player1Wins = checkRowWin(`X`) || checkColumnWint(`X`) || checkDiagL(`X`) || checkDiagR(`X`);
const player2Wins = checkRowWin(`0`) || checkColumnWint(`0`) || checkDiagL(`0`) || checkDiagR(`0`);

if(player1Wins){
    console.log(`${player1.playerName} Wins`);
} else if(player2Wins){
    console.log(`${player2.playerName} Wins`);
} else{
    console.log(`no winner yet`);
}

}

return{
    checkwinner
}

}();


//const player1 = createPlayer(`Person`,`X`);
//const player2 =  createPlayer(`Ai`, `0`);


