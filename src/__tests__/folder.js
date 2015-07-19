jest.autoMockOff();

const {folder, path, get, getIn, PATH_KEY} = require('../folder');
const {fromJS} = require('immutable');

describe('folder', () => {
  it('sets PATH_KEY into Map and Object', () => {
    let data = {a: 'b', c: 'd'};
    let map = fromJS(data);

    let f = folder(map);
    expect(path(f).toJS()).toEqual([]);
    f = f.remove(PATH_KEY);
    expect(f.toJS()).toEqual(data);

    f = folder(map, ['app', 'auth']);
    expect(path(f).toJS()).toEqual(['app', 'auth']);
    f = f.remove(PATH_KEY);
    expect(f.toJS()).toEqual(data);

    f = folder(data, ['app', 'auth']);
    expect(f.a).toEqual('b');
    expect(f.c).toEqual('d');
    expect(path(f).toJS()).toEqual(['app', 'auth']);
  });

  it('retrieves nested structures', () => {
    let data = {a: {b: {c: {d: 10}}}};
    let map = fromJS(data);

    let f = folder(map, ['app']);
    f = getIn(f, ['a', 'b']);
    f = get(f, 'c');
    expect(path(f).toJS()).toEqual(['app', 'a', 'b', 'c']);
    f = f.remove(PATH_KEY);
    expect(f.toJS()).toEqual({d: 10});

    f = folder(data, ['app']);
    f = getIn(f, ['a', 'b']);
    f = get(f, 'c');
    expect(path(f).toJS()).toEqual(['app', 'a', 'b', 'c']);
    delete f[PATH_KEY];
    expect(f).toEqual({d: 10});

  });

});
