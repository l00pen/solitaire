const initialState = [];

const highscore = (state = initialState, action) => {
  switch(action.type) {
    case '@@INIT':
      const localState = window.localStorage.getItem('highscore');
      if (localState) {
        return JSON.parse(localState);
      }
      return state;
    case 'YATZY_GAME_FINISHED':
      const potHighScore = action.data.total;
      const hasNewHighScore = potHighScore >= state.highScore;
      const tmp = state;
      tmp.push({ score: action.data.total, userName: action.data.userName });
      const newHighscore = tmp.sort((a, b) => (b.score - a.score));
      window.localStorage.setItem('highscore', JSON.stringify(newHighscore));
      return newHighscore;
    default:
      return state;
  }
  return state;
}

export default highscore;