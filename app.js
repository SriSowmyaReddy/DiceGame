/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector('.dice').style.display='none';

//addEventListener has two arguments 
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){ //if only we are palying
        //generate a random number 
    var dice = Math.floor(Math.random() * 6)+1;
    
    //displaying the dice and number generated
    var diceElement = document.querySelector('.dice'); //inorder to eleminate multiple selections everytime we need.
    diceElement.style.display = 'block';//for making the dice display
    diceElement.src = 'dice-'+ dice +'.png';
    
    if(dice !== 1)
        {
            roundScore +=dice;
            document.querySelector('#current-' + activePlayer).textContent= roundScore;
        }
    else{
        //calling the nextPlayer function
        nextPlayer();
    }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
         // Add CURRENT score to GLOBAL score (scores array)
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //checking the winner.
        if(scores[activePlayer]  >=20){
            document.querySelector('#name-' + activePlayer).textContent= 'Winner';
            document.querySelector('.dice').style.display='none';
            document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
            gamePlaying = 0;
        }
        else{
        //calling the nextPlayer function.
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

//writing this function for not repeating multiplt times
function nextPlayer(){
     activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
        roundScore = 0;
        
        //for making the current score to be zero initially while starting to play
        document.getElementById('current-0').textContent='0';
        document.getElementById('current-1').textContent='0';
        
        //for making the respective player be highlighted
        document.querySelector('.player-0-panel').classList.toggle('active');//adds or removes the class
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display='none';
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer =0;
    gamePlaying = true;

    //initially the values have to be zero.
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

