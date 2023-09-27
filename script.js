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
    function drawFinal(){
    for(let row = 0; row < rows; row++){
        for(let column = 0; column < columns; column++){
            let cube = document.createElement(`div`);
            cube.classList.add(`cubeIn`);
            cube.dataset.row = row;
            cube.dataset.column = column;
            cube.style.backgroundColor = `#c51350`;
            gameContainer.appendChild(cube);
        }
    } 
}

return{
    drawFinal
}

})();



//Factory function for creating player object.
function createPlayer(playerName, playerMarker){
    const playerHolder = {};



    playerHolder.playerName =  playerName;
    playerHolder.playerMarker = playerMarker;
    playerHolder.playerScore = 0;

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

    document.querySelector(`#scoreCont`).style.display = `none`;

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

        document.querySelector(`#formcont`).style.display = `none`;
        drawBoard.drawFinal();
        document.querySelector(`#container`).style.display = `grid`;
    })

    let rstGame = document.querySelector(`#rstBtt`);

    rstGame.addEventListener(`click`,function(event){
        document.querySelectorAll(`#cubeIn`).textContent = ` `;
        document.querySelector(`#container`).style.display = `none`;
        document.querySelector(`#formcont`).style.display = `block`;
        clearBoard();
        deleteBoard();
        player1 = {};
        player2 = {};
        document.querySelector(`#winnerDecl`).textContent = ` `;
        document.querySelector(`#play1Scor`).textContent = ` `;
        document.querySelector(`#play2Scor`).textContent = ` `;
        document.querySelector(`#scoreCont`).style.display = `none`;
        displayControll.addingListenere();
    })

    let plyAgain =  document.querySelector(`#plyAg`);

    plyAgain.addEventListener(`click`, function(event){
        document.querySelectorAll(`#cubeIn`).textContent = ` `;
        clearBoard();
       /* if(player1.playerMarker == `X`){
            player1.playerState = 1;
            player2.playerState = 0;
        }else if(player2.playerMarker = `0`){
            player1.playerState = 0;
            player2.playerState = 1;
        }*/
        document.querySelector(`#scoreCont`).style.display = `none`;
        displayControll.addingListenere();
    })

    function clearBoard(){
        let rows = 3;
        let cols = 3;
        let defaultValue =  undefined;

        for(let i = 0; i < rows; i++){
            for(let j = 0;j < cols; j++){
                if(emptyBoard[i][j] != undefined || emptyBoard[i][j] == `0`){
                emptyBoard[i][j] = defaultValue;
                let changeDisp = document.querySelector(`[data-row = "${i}"][data-column = "${j}"]`);
                changeDisp.textContent = ` `;
                }
            }
        }
    }

    function deleteBoard(){
        while(gameContainer.firstChild){
            gameContainer.removeChild(gameContainer.firstChild)
        }
    }

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

    gameContainer.style.display = `none`;

    function addingListenere(){
    gameContainer.addEventListener(`click`, clickHandler)
    }

    let gameWon = false;
    let gameDraw = false;
    
        function clickHandler(event){
        if(event.target.classList.contains(`cubeIn`)){
            let row = event.target.dataset.row;
            let column = event.target.dataset.column;
            let changeDisp = document.querySelector(`[data-row = "${row}"][data-column = "${column}"]`);
            //console.log(emptyBoard[row][column]);
        if(emptyBoard[row][column] === ` ` || emptyBoard[row][column] == undefined && player1.playerState == 1){
            emptyBoard[row][column] = player1.playerMarker;
            player1[`playerState`] = 0;
            player2[`playerState`] = 1;
            changeDisp.textContent = `${player1.playerMarker}`;
            if(gameController.checkwinner() == `Win1`){
               gameWon = true;
            }
        } else if(emptyBoard[row][column] === ` ` || emptyBoard[row][column] == undefined && player2.playerState == 1){
            emptyBoard[row][column] = player2.playerMarker;
            player2[`playerState`] = 0;
            player1[`playerState`] = 1;
            changeDisp.textContent = `${player2.playerMarker}`;
            if(gameController.checkwinner() == `Win2`){
                gameWon = true;
            };
    
    
    }
}

    if(!gameWon){
        if(gameController.checkwinner() == `Draw`){
            gameDraw =  true;
        }
    }

    if(gameWon){
        gameContainer.removeEventListener(`click`, clickHandler);
        document.querySelector(`#scoreCont`).style.display = `block`;
        gameWon = false;
    }else if(gameDraw){
        gameContainer.removeEventListener(`click`, clickHandler);
        document.querySelector(`#scoreCont`).style.display = `block`;
        gameDraw = false;
    }
    }

    addingListenere();

    return{
        addingListenere
    }

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

    let firstMark = player1.playerMarker;

    let secondMark = player2.playerMarker;

    const player1Wins = checkRowWin(firstMark) || checkColumnWint(firstMark) || checkDiagL(firstMark) || checkDiagR(firstMark);
    const player2Wins = checkRowWin(secondMark) || checkColumnWint(secondMark) || checkDiagL(secondMark) || checkDiagR(secondMark);

  function isBoardFilled(board){
    for(let i = 0; i <  board.length; i++){
        for(let j = 0; j <  board[i].length; j++){
            if(board[i][j] ==  undefined){
                return false;
            }
        }
    }
    return true;
  }


  const isBoardDefined = isBoardFilled(emptyBoard);

if(player1Wins){
    console.log(`${player1.playerName} Wins`);
    player1.playerScore++;
    document.querySelector(`#winnerDecl`).textContent = `Congratulations ${player1.playerName} wins.`;
    document.querySelector(`#play1Scor`).textContent = `${player1.playerName} score is: ${player1.playerScore}`;
    document.querySelector(`#play2Scor`).textContent = `${player2.playerName} score is: ${player2.playerScore}`;
    return `Win1`;
} else if(player2Wins){
    console.log(`${player2.playerName} Wins`);
    player2.playerScore++;
    document.querySelector(`#winnerDecl`).textContent = `Congratulations ${player2.playerName} wins.`;
    document.querySelector(`#play1Scor`).textContent = `${player1.playerName} score is: ${player1.playerScore}`;
    document.querySelector(`#play2Scor`).textContent = `${player2.playerName} score is: ${player2.playerScore}`;
    return `Win2`;
} else if(isBoardDefined && !player1Wins && !player2Wins){
    console.log(`It's a draw nobody wins`);
    document.querySelector(`#winnerDecl`).textContent = `It's a draw nobody Wins`;
    document.querySelector(`#play1Scor`).textContent = `${player1.playerName} score is: ${player1.playerScore}`;
    document.querySelector(`#play2Scor`).textContent = `${player2.playerName} score is: ${player2.playerScore}`;
    return `Draw`;
}

}

return{
    checkwinner
}

}();


//const player1 = createPlayer(`Person`,`X`);
//const player2 =  createPlayer(`Ai`, `0`);


