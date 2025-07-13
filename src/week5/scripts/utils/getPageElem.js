export const getPageElem = () => {
  const uiButtons = document.querySelector('.ui-buttons');
  const uiButton = document.querySelectorAll('.ui-button');
  const modalWrapper = document.querySelector('.modal__wrapper');
  const selectSymbolModal = modalWrapper.querySelector('.select-symbol');
  const gameDescModal = modalWrapper.querySelector('.game-desc');
  const selectLevelModal = modalWrapper.querySelector('.select-level');
  const gameResultModal = modalWrapper.querySelector('.game-result');

  return { uiButtons, uiButton, modalWrapper, selectSymbolModal, gameDescModal, selectLevelModal, gameResultModal };
};

export const getGameElem = () => {
  const gameTurn = document.querySelector('.game__turn');
  const gameBoard = document.querySelector('.game__board');
  const gameCells = gameBoard.querySelectorAll('.cell');

  return { gameTurn, gameBoard, gameCells };
}