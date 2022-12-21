/* eslint-disable no-unused-vars */
import _ from 'lodash';
import './style.css';
import { refreshTable, addNewScore } from './capAPI.js';

let gameId = '';
fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
  method: 'POST',
  body: JSON.stringify({
    name: 'fantasy football',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    const res = json.result;
    gameId = res.slice(14, res.lastIndexOf(' '));
  });

const refresh = document.querySelector('.refresh');

refresh.addEventListener('click', () => {
  refreshTable(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`,
  );
});

const addscore = document.getElementById('submit');
const name = document.getElementById('name');
const score = document.getElementById('score');

addscore.addEventListener('click', () => {
  if (name.value !== '' && score.value !== '') {
    addNewScore(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`,
      name.value,
      score.value,
    );
    document.forms[0].reset();
  }
});

// To generate background
function randomBackground() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);

  const bgColor = `rgb(${x},${y},${z})`;

  document.body.style.background = bgColor;
}
randomBackground();
