const isDev = 'production' !== process.env.NODE_ENV;

export class Dispatcher {
  constructor(store) {
    this.store = store;
    this.state = store();
  }

  dispatch(action) {
    if (typeof action === 'function') {
      action(::this.dispatch, this.state);
    } else if (typeof action === 'undefined') {
      return;
    } else {
      if (isDev) console.log(action);
      this.state = this.store(this.state, action);
      this.onChange && this.onChange(this.state);
    }
  }

  load(state) {
    this.state = this.store(state);
    this.onChange && this.onChange(this.state);
  }
}
