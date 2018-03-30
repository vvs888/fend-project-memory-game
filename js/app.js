// useful variables
const cardContainer = document.querySelector('.deck');
const cardsArr = Array.from(document.querySelectorAll('.card'));
const restart = document.querySelector('.fa-redo');
let cardListInner = [];
let cardListOuter = [];
let clickedCard = [];
let openCards = 0;
const modalYes = document.querySelector('.btn-primary');
const move = document.querySelector('.moves');
let modalText = document.querySelector('.modal-text');
let timerElement = document.querySelector('.timer');
const stars = document.querySelectorAll('.stars li i');
const starsArr = Array.from(document.querySelectorAll('.stars li i'));
let star1 = document.querySelector('.stars li:first-child i');
let star2 = document.querySelector('.stars li:nth-child(2) i');
let star3 = document.querySelector('.stars li:last-child i');
let t;
// cloned stars for Modal
let clnStar1 = star1.cloneNode();
let clnStar2 = star2.cloneNode();
let clnStar3 = star3.cloneNode();

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

// shuffling cards
function shuffleCards() {
	shuffle(cardsArr);
	let fragment = document.createDocumentFragment();
	cardsArr.forEach(function(e) {
		fragment.appendChild(e);
		e.classList.remove('show', 'open', 'match');
	});
	cardContainer.appendChild(fragment);

}
shuffleCards();

cardContainer.addEventListener('click', function(evt) {

// preventing false counter events if parent element clicked
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

		cardListOuter.forEach(function(e) {
			e.classList.add('match');
			// to prevent comparing the same card
			if(cardListOuter[0] === cardListOuter[1]) {
				e.classList.remove('match', 'show', 'open');
				openCards--;
			}
		});

		openCards += 2;
		cardListInner = [];
		cardListOuter = [];
			if(openCards === 16) {
				$('.modal').modal('show');
				stopTimer();
			}
		} else {
			setTimeout(noMatch, 800);
		}
	}
	matchCards();

// check cards aren't matched
	function noMatch() {
		if (cardListInner[0] !== cardListInner[1] && cardListInner.length > 1) {
		evt.target.classList.remove('show', 'open');

		cardListOuter.forEach(function(e) {
			e.classList.remove('show', 'open');
		});
		cardListInner = [];
		cardListOuter = [];
		}
	}
}
openCard();

// check all clicked cards
function clickCard() {
	let card = evt.target;
	clickedCard.push(card);

	function moveCounter() {
		let	counter = 0;
		counter += clickedCard.length / 2 - 0.5;
		if(counter > 8 && counter <= 12) {
			star3.classList.remove('fas');
			star3.classList.add('far');
			clnStar3.classList.remove('fas');
			clnStar3.classList.add('far');
		} else if (counter > 12 && counter <= 16) {
			star2.classList.remove('fas');
			star2.classList.add('far');
			clnStar2.classList.remove('fas');
			clnStar2.classList.add('far');
		} else if(counter > 16) {
			star1.classList.remove('fas');
			star1.classList.add('far');
			clnStar1.classList.remove('fas');
			clnStar1.classList.add('far');
		}

		modalText.textContent = "It took  " + counter.toFixed().toString() + " moves, " + timerElement.textContent + " seconds. Your score is ";
		modalText.appendChild(clnStar1);
		modalText.appendChild(clnStar2);
		modalText.appendChild(clnStar3);
		move.textContent = counter.toFixed().toString();

		console.log(modalText);
		console.log(counter);
	}
	moveCounter();
}
clickCard();
});

function resetCounter() {
	clickedCard = [];
	counter = 0;
	move.textContent = counter.toFixed().toString();
}

// timer function from https://www.sitepoint.com/creating-accurate-timers-in-javascript/
function timer() {
	let start = new Date().getTime();
	let elapsed = '0:0';
	t = setInterval(function() {
		let time = new Date().getTime() - start;
		elapsed = Math.floor(time / 100) / 10;
		if(Math.round(elapsed) == elapsed) {
			elapsed += '.0';
		}
		timerElement.textContent = elapsed;
	}, 100);
}

function stopTimer() {
    clearInterval(t);
}

// reshuffling all cards and opening them temporarily to remember
function restartGame() {
	shuffleCards();
	cardsArr.forEach(function(e) {
		console.log(e);
		e.classList.add('show', 'open');

		function removeClass() {
			e.classList.remove('show', 'open');
		}
		starsArr.forEach(function(e) {
			e.classList.remove('far');
			e.classList.add('fas');
		});
		setTimeout(removeClass, 2000);
	});
		openCards = 0;
		resetCounter();
	}

restart.addEventListener('click', function() {
		restartGame();
		setTimeout(timer, 2000);
		this ? stopTimer() : timer();
	});

modalYes.addEventListener('click', function() {
	$('.modal').modal('hide');
	restartGame();
	setTimeout(timer, 2000);
});
