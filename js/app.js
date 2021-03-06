 //* Create a list that holds all of your cards
 let moves = 0;
 let clockStopped = true;
 let time = 0;
 let stars=0;
 timeText='';
 let starCount = 0;
 let clockTimer;
 let matchedPairs = 0;
 const totalPairs = 8;
 
 // declare modal
var symbol = ['fa-diamond',
             'fa-paper-plane-o',
             'fa-bicycle',
             'fa-cube', 
             'fa-bomb',
             'fa-leaf',
             'fa-bolt',
             'fa-anchor'
            ];  
var cards=symbol.concat(symbol);
function generateCard(card){
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function initGame(){
    var deck=document.querySelector('.deck');
    var cardHTML = shuffle(cards).map(function(card){
        return generateCard(card);
    });
    deck.innerHTML=cardHTML.join('');
}
initGame();


 var allCards=document.querySelectorAll('.card');
 var openCards=[];
 allCards.forEach(function(card){
     card.addEventListener('click',function(e){
         if(!card.classList.contains('open')&& !card.classList.contains('show')&&!card.classList.contains('match')){
            if (clockStopped) {
                startClock();
                clockStopped = false;
            }
            openCards.push(card);
            card.classList.add('open','show');

            if (openCards.length==2){
                addMove();

                if(openCards[0].dataset.card == openCards[1].dataset.card){
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');
                     
                    matchedPairs++;
                    if (matchedPairs === totalPairs) {
                      gameOver();}
                    openCards=[];

                }   else{
                        setTimeout(function(){
                            openCards.forEach(function(card){
                                card.classList.remove('open','show');
                            });
                            openCards=[]; 
                            }
                        ,500);//HIDE
                
                }
         movesToStars();
      
         }
        }

    });
 
});
document.querySelector('.restart').addEventListener('click', restartGame);
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}


function subtractStar() {
    const starPanel = document.querySelectorAll('.stars li i');
    for (star of starPanel) {
        if (star.classList.contains('fa')) {
            star.classList.replace('fa', 'dimmed');
            break;
        }
    }
}
function startClock() {
    clockTimer = setInterval(function() {
        time++;
        clockText();
    }, 1000);
}
function stopClock() {
    clearInterval(clockTimer);
}
function clockText() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    clock.innerHTML = (seconds < 10) ? (`${minutes}:0${seconds}`) : (`${minutes}:${seconds}`);
    return timeText=clock.innerHTML;

}
function gameOver() {
    stopClock();

    Swal.fire({
        type: 'success',
        title: 'Congratulations! You Won!',
        html: `With ${moves} Moves and ${starCount} Star  and ${time} Seconds <br> Woooooo!`,
        confirmButtonText: 'Play Again',
        confirmButtonColor: '#47deb5'
      }).then(function() {
        restartGame()
    });
    
}


function numOfStars() {
     stars = document.querySelectorAll('.stars li i');
    for (star of stars) {
        if (!star.classList.contains('dimmed')) {
            starCount++;
        }

    }
}

function restartGame() {
    openCards=[];
    resetTimeClock();
    resetStars();
    resetMoves();
    resetCards();
    

    matchedPairs = 0;
}





function resetTimeClock() {
    stopClock();
    clockStopped = true;
    time = 0;
    clockText();
}
function movesToStars() {
if (moves === 14 || moves === 18) {
subtractStar();
}else{
//Do nothing
}
}

function resetStars() {
    const starPanel = document.querySelectorAll('.stars li i');
    for (star of starPanel) {
        star.classList.replace('dimmed', 'fa');
    }
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}



function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

