export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('redux-state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch(err) {
    console.log(err);
    return undefined;
  }
}

export const saveState = () => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('redux-state', serializedState);
  } catch(err) {
    console.log('ERROR saving state: ', err);
  }
}
