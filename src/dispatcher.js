import EventEmitter from 'eventemitter3';

function partition(n, list) {
  let result = [];
  for (let i = 0; i < list.length; i+=n) {
    result.push(list.slice(i, i+n));
  }
  return result;
}

export class Dispatcher extends EventEmitter {
  constructor(store, state) {
    super();
    this.store = store;
    this.state = store(state);
  }

  dispatch(...actions) {
    this.state = partition(2, actions).reduce(
        (state, [action, payload]) => this.store(state, action, payload),
        this.state);

    this.emit('change', this.state);
  }

  load(state) {
    this.state = this.store(state);
    this.emit('change', this.state);
  }
}
