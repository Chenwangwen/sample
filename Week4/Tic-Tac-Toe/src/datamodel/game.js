const getInitialGameState = () => [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  
  const checkForWinner = (state, player) => {
    for (let i = 0; i < 3; i++) {
      if (state[i].every(cell => cell === player)) return true;
      if (state.map(row => row[i]).every(cell => cell === player)) return true;
    }
    if ([0, 1, 2].map(i => state[i][i]).every(cell => cell === player)) return true;
    if ([0, 1, 2].map(i => state[2 - i][i]).every(cell => cell === player)) return true;
    
    return false;
  };
  
  const checkForDraw = (state) => {
    return state.flat().every(cell => cell !== ' ');
  };

const createHistory = () => [{ state: getInitialGameState(), currentPlayer: 'X' }];

const addStateToHistory = (history, newState, newPlayer) => {
  return [...history, { state: newState, currentPlayer: newPlayer }];
};

const getCurrentState = (history) => {
  return history[history.length - 1].state;
};

const getCurrentPlayer = (history) => {
  return history[history.length - 1].currentPlayer;
};

export {
  getInitialGameState,
  checkForWinner,
  checkForDraw,
  createHistory,
  addStateToHistory,
  getCurrentState,
  getCurrentPlayer,
};