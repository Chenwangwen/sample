const getInitialGameState = () => [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  
  const checkForWinner = (state, player) => {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],  // Rows
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],  // Columns
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],  // Diagonals
      [[2, 0], [1, 1], [0, 2]]
    ];
  
    for (let line of lines) {
      if (line.every(([x, y]) => state[x][y] === player)) {
        return { winner: true, line };  // Return winning status and the line
      }
    }
    return false;  // No winner found
  };
  
  
  
  const checkForDraw = (state) => {
    return state.flat().every(cell => cell !== ' ');
  };

const createHistory = () => [{ state: getInitialGameState(), currentPlayer: 'X' }];

const addStateToHistory = (history, newState, newPlayer) => {
  return [...history, { state: newState, currentPlayer: newPlayer }];
};

const getCurrentState = (history, currentStep) => {
  return history[currentStep].state;
};

const getCurrentPlayer = (history, currentStep) => {
  return history[currentStep].currentPlayer;
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