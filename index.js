'use strict';

const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current_score-0');
const current1El = document.getElementById('current_score-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.new_game');
const btnRoll = document.querySelector('.roll_dice');
const btnHold = document.querySelector('.hold');
const player_one = document.querySelector('section.player_one');
const player_two = document.querySelector('section.player_two');
const win_mess = document.querySelector('.win_mess_header');
const win_mess_layer = document.querySelector('.win_mess');
let scores = [[0, 0], [0, 0]];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
current0El.textContent = 0;
current1El.textContent = 0;

btnRoll.addEventListener('click', function() {
    if (playing) {
        let dice = Math.floor((Math.random() * 6) + 1);
        diceEl.classList.remove('hidden');
        diceEl.src = `./imgs/dice_${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current_score-${activePlayer}`).textContent = currentScore;
            console.log(activePlayer);
            if ((scores[activePlayer][1] + currentScore) >= 10) {
                showWinMess(activePlayer);
                playing = false;
            }
        } else {
            currentScore = 0;
            document.getElementById(`current_score-${activePlayer}`).textContent = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            changeActivePlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        if (currentScore) {
            scores[activePlayer][1] += currentScore;
            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer][1];
            currentScore = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            current0El.textContent = 0;
            current1El.textContent = 0;
            changeActivePlayer();
        }
    }
});

function showWinMess(player) {
    win_mess_layer.classList.remove('hidden');
    win_mess.textContent = player === 0 ? `WON PLAYER ONE` : `WON PLAYER TWO`;
}

function changeActivePlayer() {
    if (activePlayer === 0) {
        player_one.classList.add('active');
        player_two.classList.remove('active');
    } else {
        player_two.classList.add('active');
        player_one.classList.remove('active');
    }
}

btnNew.addEventListener('click', function () {
    win_mess_layer.classList.add('hidden');
    win_mess.textContent = "";
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    scores = [[0, 0], [0, 0]];
    currentScore = 0;
    activePlayer = 0;
    diceEl.classList.add('hidden');
    playing = true;
    changeActivePlayer();
});