// some useful variables
const cardContainer = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards);
const restart = document.querySelector('.fa-redo');
let cardListInner = [];
let cardListOuter = [];
let openCards = 0;
const modalYes = document.querySelector('.btn-primary');
const modalNo = document.querySelector('.btn-secondary');

// displaying and shuffling cards
function showAllCards() {
	shuffle(cardsArray);
	let fragment = document.createDocumentFragment();
	cardsArray.forEach(function(e) {
		fragment.appendChild(e);
		e.classList.remove('show', 'open', 'match');
	});
	cardContainer.appendChild(fragment);
	console.log(cardContainer);
}
showAllCards();

cardContainer.addEventListener('click', function(evt) {
if(evt.target.nodeName.toLowerCase() === "ul") {
	return;
}

// opening cards
function openCard() {
	evt.target.classList.add('open', 'show');
	let cardElParent = evt.target;
	let cardEl = evt.target.innerHTML;

// checking if cards are matched
	function matchCards() {
		if(cardListInner.length === 0) {
		cardListOuter.push(cardElParent);
		cardListInner.push(cardEl);
		} else if (cardListInner.length === 1) {
		cardListOuter.push(cardElParent);
		cardListInner.push(cardEl);
		}
		if (cardListInner[0] === cardListInner[1]) {
		evt.target.classList.add('match');
		console.log(cardListInner);
		console.log(cardListOuter);

		cardListOuter.forEach(function(e) {
			e.classList.add('match');
		});
		openCards += 2;
		cardListInner.splice(0, 2);
		cardListOuter.splice(0, 2);
		console.log(openCards);
			if(openCards === 16) {
				$('.modal').modal('show');
			}
		} else {
			setTimeout(noMatch, 1000);
		}
	}
	matchCards();

// checking if cards aren't matched
	function noMatch() {
		if (cardListInner[0] !== cardListInner[1] && cardListInner.length > 1) {
		evt.target.classList.remove('show', 'open');
		console.log(cardListInner);
		console.log(cardListOuter);

		cardListOuter.forEach(function(e) {
			e.classList.remove('show', 'open');
		});
		// openCards += 2;
		cardListInner.splice(0, 2);
		cardListOuter.splice(0, 2);
		console.log(openCards);
		}
	}
}
openCard();
});

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

// reshuffling all cards and opening them temporarily to remember
function restartGame() {
	showAllCards();
	cardsArray.forEach(function(e) {
		e.classList.add('show', 'open');
		setTimeout(function() {
			e.classList.remove('show', 'open');
		}, 5000);
	});
		openCards = 0;
	}


restart.addEventListener('click', function() {
		restartGame();
	});



modalYes.addEventListener('click', function() {
	$('.modal').modal('hide');
	restartGame();
});

/*
* set up the event listener for a card. If a card is clicked: !!!
*  - display the card's symbol (put this functionality in another function that you call from this one)!!!
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/


