export const useGameState = () => {
  const hasStartedGame = "hasStarted";
  const gameStarted = () => {
    localStorage.setItem(hasStartedGame, "true");
  };

  const resetGame = () => {
    localStorage.removeItem(hasStartedGame);
  };

  const isStarted = () => localStorage.getItem(hasStartedGame) === "true";
  return { gameStarted, resetGame, isStarted };
};

export type GameContext = ReturnType<typeof useGameState>;
