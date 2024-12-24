'use strict';

const score0El = document.querySelector('#score--0');
//below is same as above just used diffrent method
const score1El = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions-->
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0]; //to calculate total scores
  currentScore = 0; //stores the value of score
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  if (activePlayer === 1 || activePlayer == 0) {
    activePlayer = 0;
  }
};
init();

// diceEl.classList.add('hidden');
const swtichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling dice-->

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating Random Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check rolled 1 if true move to next player
    if (dice !== 1) {
      //Adding dice to current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //4. If 1 move to next player
      //below code switches the player
      swtichPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check score if it is >=100

    //if yes finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    }

    //if no (switch player)
    swtichPlayer();
  }
});

btnNew.addEventListener('click', init);
