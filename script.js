
//======== Tic-Tac-Toe =========
//Dotscreen
//Kilian Cannet 2021

const playerSign = ["X","O"]
currentPlayer = 0;//switch between 0 and 1
nbTurn = 0;
scores = [0,0];
scoresElem = [document.getElementById("p1_score"),document.getElementById("p2_score")];
arrowElem = [document.getElementById("p1_arrow"),document.getElementById("p2_arrow")];
board = initBoard();

function updateScores(){
    scoresElem[0].innerText = scores[0];
    scoresElem[1].innerText = scores[1];
}

function switchArrow(){
    otherPlayer = (currentPlayer+1)%2;
    arrowElem[currentPlayer].style.visibility = "visible";
    arrowElem[otherPlayer].style.visibility = "hidden";
}

function changeTurn(){
    currentPlayer = (currentPlayer+1)%2;
}

function initBoard(){
    return [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
}

function hasWon(){
    for(i=0;i<2;i++){
        //check rows
        if (board[i][0] != "" &&
            board[i][0] == board[i][1] &&
            board[i][1] == board[i][2])
            return true;
        //check columns
        if (board[0][i] != "" &&
            board[0][i] == board[1][i] &&
            board[1][i] == board[2][i])
            return true;
    }
    //check diags
    if (board[0][0] != "" &&
        board[0][0] == board[1][1] &&
        board[1][1] == board[2][2])
            return true;

    if (board[0][2] != "" &&
        board[0][2] == board[1][1] &&
        board[1][1] == board[2][0])
            return true;

    return false;
}

function clearCells(){
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = "");
}

function isBoardFull(){
    return nbTurn==9;
}

function resetGame(){
    board = initBoard();
    nbTurn = 0;
    currentPlayer=0;
    clearCells();
}

function cellClick(e) {

    target = e.target;
    x = target.getAttribute("x_index");
    y = target.getAttribute("y_index");
    if (board[x][y] == ""){
        target.innerText = playerSign[currentPlayer];
        board[x][y] = playerSign[currentPlayer];
        nbTurn++;
        if (hasWon()){
            scores[currentPlayer]+=1;
            updateScores();
            resetGame();
            return;
        }else if (isBoardFull()){
            resetGame();
            return;
        }
        changeTurn();
        switchArrow();
    }

}


document.querySelectorAll('.cell').forEach(cell => 
    cell.addEventListener('click', cellClick)
);

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        if (minutes < 10)
            minutes = "0"+minutes;
        if (seconds < 10)
            seconds = "0"+seconds;

        display.textContent = minutes + ":" + seconds;
        timer--;
        if (timer < 0) {
            if (scores[0] > scores[1])
                alert("Winner: Player 1 "+scores[0]+"/"+scores[1]+"!");
            else if (scores[1] > scores[0])
                alert("Winner: Player 2 "+scores[1]+"/"+scores[0]+"!");
            else
                alert("No Winner "+scores[0]+"/"+scores[1]+"!");
                clearInterval(interval);
        }
    }, 1000);
}
switchArrow();
updateScores();
startTimer(60*3,document.getElementById("clock"));
