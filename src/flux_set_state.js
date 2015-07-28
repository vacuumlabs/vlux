export const ACTION_SET_STATE = '@@actionSetState';

export function setStateStore(state, action, payload) {
  if (action === ACTION_SET_STATE) return state.mergeIn(payload.path, payload.state);
  else return state;
}

export function createFluxSetState(dispatch) {
  return (path, state) => dispatch(ACTION_SET_STATE, {path, state});
}


