jest.autoMockOff();

const Dispatcher = require('../dispatcher.js').Dispatcher;

describe('dispatcher', () => {
  it('uses store to get initial value', () => {
    const store = (state) => state * 2;
    const dispatcher = new Dispatcher(store, 3);
    expect(dispatcher.state).toEqual(6);
  });

  it('revives loaded value through stores', () => {
    const store = (state) => state && state * 2;
    const dispatcher = new Dispatcher(store);
    const onChange = jest.genMockFunction();

    dispatcher.on('change', onChange);
    dispatcher.load(15);

    expect(onChange.mock.calls.length).toEqual(1);
    expect(onChange).toBeCalledWith(30);
    expect(dispatcher.state).toEqual(30);
  });

  it('dispatches multiple actions atomically', () => {
    const store = (state, action, payload = 1) => {
      switch(action) {
        case 'inc':
          return state + payload;
        case 'dec':
          return state - payload;
        default:
          return state || 0;
      }
    };

    const dispatcher = new Dispatcher(store);
    const onChange = jest.genMockFunction();

    dispatcher.on('change', onChange);
    dispatcher.dispatch('inc', 10, 'unknown', 2, 'dec', 5, 'inc');

    
    expect(onChange.mock.calls.length).toEqual(1);
    expect(onChange).toBeCalledWith(6);
    expect(dispatcher.state).toEqual(6);
  });
});
