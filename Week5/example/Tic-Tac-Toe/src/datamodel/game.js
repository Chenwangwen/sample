import { loadData, saveData } from "./savedata";


export const ticTacToeArray = ["", "", "", "", "", "", "", "", ""];

export const sortTicTacToe = (tictactoe, movements) => {
    const actualMovementIndex = movements.findIndex(movement => movement.actual === "True");
    if (actualMovementIndex === -1) return ticTacToeArray;
    return tictactoe.map((item, index) => {
        const movement = movements.slice(0, actualMovementIndex + 1).find(movement => movement.index === index);
        return movement ? movement.player : "";
    })
};
export const forward = (movement) => {
    const actualMovementIndex = movement.findIndex(item => item.actual === "True");
    if (actualMovementIndex === -1 && movement.length > 0) movement[0].actual = "True";
    if (actualMovementIndex < movement.length - 1 && actualMovementIndex >= 0) {
      const actualMovement = movement[actualMovementIndex];
      actualMovement.actual = "False";
      movement[actualMovementIndex + 1].actual = "True";
    }
    return [...movement];
}


export const backWard = (movement) => {
    const actualMovementIndex = movement.findIndex(item => item.actual === "True");
    if (actualMovementIndex >= 0) {
      const actualMovement = movement[actualMovementIndex];
      actualMovement.actual = "False";
    }
    if (actualMovementIndex > 0) {
      movement[actualMovementIndex - 1].actual = "True";
    }
    return [...movement];
}

export const rearrangeBoard = (winner, player, index, movement) => {
    if (winner !== "") return  [...movement];
    const newMovement = { player, index, actual: "True" };
    const actualMovementIndex = movement.findIndex(item => item.actual === "True");
    const subArray = movement.slice(0, actualMovementIndex + 1);
    if (subArray.find(item => item.index === index)) return [...movement];
    if (movement.length > 0) {
      for (let i = 0; i <= actualMovementIndex; i++) {
        movement[i].actual = "False";
      }
    }
    return [...subArray, newMovement];
}
export const checkWinner = (movement) => {
    const win = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];
    for (let i = 0; i < win.length; i++) {
        if (movement.filter(item => win[i].includes(item.index) && item.player === "X").length === 3) return {winner: "X", winnerMovements: win[i]};
        if (movement.filter(item => win[i].includes(item.index) && item.player === "O").length === 3) return {winner: "O", winnerMovements: win[i]};
    }
    if (movement.length === 9) return {winner: "Tie", winnerMovements: null};
    return "";
}

export const checkGameCondition = (movement) =>{
    if (movement.length === 0){
        return {
            backWard: false,
            forward: false,
            reset: false,
        }
    }else{
        const actualMovementIndex = movement.findIndex(item => item.actual === "True");
        return {
            backWard: actualMovementIndex >= 0,
            forward: actualMovementIndex < movement.length - 1,
            reset: true,
        }
    };
}
export const changePlayer = (player) => player === "X" ? "O" : "X";


export const saveGame = async (game) => {
    const data = await loadData();
    game.id = data.length + 1;
    if (data) {

        data.unshift(game);
        await saveData(data);
    } else {
        await saveData([game]);
    }

}