import { getGameElem, getPageElem } from '../utils/getPageElem.js';
import { WINNING_COMBINATIONS } from '../utils/constants.js';

const { uiButtons, uiButton, modalWrapper, selectSymbolModal, gameDescModal, selectLevelModal, gameResultModal } = getPageElem();
const { gameTurn, gameBoard, gameCells, } = getGameElem();

/** 게임 현황 저장 객체 */
const game = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  currentPlayer: null,
  userSymbol: null,
  aiSymbol: null,
  aiLevel: 'easy',
  isGameOver: false,
  turnCount: 0,
  winner: null
};

// AI 차례 지연 정도
const AI_TURN_TIMEOUT = 300;

const handleSymbolSelect = (e) => {
  let button = e.target.closest('.symbol-button')
  if (e.target !== button) return;

  [game.userSymbol, game.aiSymbol, game.currentPlayer] = 
    e.target.textContent === 'O' ? ['O', 'X', 'ai'] : ['X', 'O', 'user'];

  closeModal();
  handleCellClick(game.currentPlayer);
};

const handleBoardClick = (e) => {
  if (game.currentPlayer !== 'user' || game.isGameOver) return;

  let cell = e.target.closest('.cell');
  let row = cell.dataset.row;
  let col = cell.dataset.col;

  if (!cell || cell.textContent) return;
  
  cell.textContent = game.userSymbol;
  game.board[row][col] = cell.textContent;
  game.turnCount++;

  let winner = checkWinner();
  if (winner) {
    showGameResult(winner);
    return
  }

  if (game.turnCount >= 9) {
    game.isGameOver = true;
    showGameResult('draw');
    return;
  }

  handleCellClick('ai');
};

/** 틱택토 게임 */
export const tictactoe = () => {
  initGame();
};

/** 버튼 이벤트 */
export const setupUIEvents = () => {
  const closeButton = document.querySelector('.close');

  uiButtons.addEventListener('click', (e) => {
    const button = e.target.closest('.ui-button');
    if (e.target !== button) return;
    
    modalWrapper.classList.add('show');
    if (button.classList.contains('game-desc')) {
      gameDescModal.classList.add('show');
    } else if (button.classList.contains('select-level')) {
      selectLevelModal.classList.add('show');
    } else if (button.classList.contains('reset')) {
      initGame();
    }
  });

  closeButton.addEventListener('click', closeModal);
};

/** 게임 이벤트 */
export const setupGameEvents = () => {
  selectSymbolModal.addEventListener('click', handleSymbolSelect);
  gameBoard.addEventListener('click', handleBoardClick);
};

/** 모달 창 닫기 */
const closeModal = () => {
  modalWrapper.classList.remove('show');
  selectSymbolModal.classList.remove('show');
  gameDescModal.classList.remove('show');
  selectLevelModal.classList.remove('show');
};

/** 게임 시작/초기화 */
const initGame = () => {
  game.board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  game.currentPlayer = null;
  game.userSymbol = null;
  game.aiSymbol = null;
  game.isGameOver = false;
  game.turnCount = 0;
  game.winner = null;

  gameCells.forEach(el => el.textContent = '');

  setPlayerSymbol();
};

/** 유저/AI 선공 심볼 선택 */
const setPlayerSymbol = () => {  
  const selectSymbolButtons = selectSymbolModal.querySelector('.modal__content');

  modalWrapper.classList.add('show');
  selectSymbolModal.classList.add('show');
};

/** 조작 핸들링, DOM업데이트 */
const handleCellClick = (player) => {
  if (game.isGameOver) return;

  switch (player) {
    case 'user':
      game.currentPlayer = 'user';
      gameTurn.classList.add('show');
      gameBoard.classList.remove('click-disable');
      break;

    case 'ai':
      game.currentPlayer = 'ai';
      gameTurn.classList.remove('show');
      gameBoard.classList.add('click-disable');
      
      // ai 로직
      setTimeout(() => {
        if (game.isGameOver) return;
        let [aiRow, aiCol] = decideAIMove(game.aiLevel);

        const aiCell = document.querySelector(`[data-row="${aiRow}"][data-col="${aiCol}"]`);
        aiCell.textContent = game.aiSymbol;
        game.board[aiRow][aiCol] = aiCell.textContent;

        let winner = checkWinner();
        if (winner) {
          showGameResult(winner);
          return
        }

        if (game.turnCount >= 9) {
          game.isGameOver = true;
          showGameResult('draw');
          return;
        }

        handleCellClick('user');
      }, AI_TURN_TIMEOUT);

    default:
      return;
  }
};

/** 승리 판단 */
const checkWinner = () => {
  for (let combination of WINNING_COMBINATIONS) {
    let [pos1, pos2, pos3] = combination;

    let val1 = game.board[pos1.row][pos1.col];
    let val2 = game.board[pos2.row][pos2.col];
    let val3 = game.board[pos3.row][pos3.col];

    if (val1 && val1 === val2 && val2 === val3) {
      game.isGameOver = true;
      return val1 === game.userSymbol ? 'user' : 'ai';
    }
  }

  return null;
};

const showGameResult = (winner) => {
  const result = gameResultModal.querySelector('.result');
  let message = '';
  
  switch (winner) {
    case 'user':
      message = '승리하셨습니다!';
      break;
    case 'ai':
      message = '패배하셨습니다!';
      break;
    case 'draw':
      message = '무승부입니다!';
      break;
  }

  result.textContent = message;
  
  modalWrapper.classList.add('show');
  gameResultModal.classList.add('show');

  setTimeout(() => {
    modalWrapper.classList.remove('show');
    gameResultModal.classList.remove('show');
    initGame();
  }, 1000);

};

/** ai 자리결정 */
const decideAIMove = (level) => {
  const emptyCell = [];
  
  game.board.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === '') {
        emptyCell.push([i, j])
      };
    })
  });
  
  if (!emptyCell.length) {
    return [0, 0];
  };

  switch (level) {
    case 'easy': 
      return emptyCell[Math.floor(Math.random() * emptyCell.length)];

    case 'normal':
      let center = emptyCell.find(([row, col]) => row === 1 && col === 1);
      if (center) return center;

      // 구현 예정

      return emptyCell[Math.floor(Math.random() * emptyCell.length)]; 

    case 'hard':

      // 구현 예정

      return emptyCell[Math.floor(Math.random() * emptyCell.length)]

    default:
      return emptyCell[0];
  }
};