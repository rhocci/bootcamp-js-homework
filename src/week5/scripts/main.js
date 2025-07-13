import { setupGameEvents, setupUIEvents, tictactoe } from './modules/game.js'

(() => {
  setupUIEvents();
  setupGameEvents();
  tictactoe();
})();