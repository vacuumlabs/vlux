import {List} from 'immutable';

export const PATH_KEY = '@@folder/path';

function _set(coll, key, val) {
  if (coll.set) return coll.set(key, val);
  coll[key] = val;
  return coll;
}

function _getIn(coll, keys, notFound) {
  if (coll.getIn) return coll.getIn(keys, notFound);
  for (let i = 0; i < keys.length; i++) {
    if (!(keys[i] in coll)) return notFound;
    coll = coll[keys[i]];
  }
  return coll;
}

export function folder(coll, path = List()) {
  return _set(coll, PATH_KEY, List(path));
}

export function path(coll) {
  return _getIn(coll, [PATH_KEY]);
}

export function getIn(coll, keys, notFound) {
  let path = _getIn(coll, [PATH_KEY]).push(...keys);
  return _set(_getIn(coll, keys, notFound), PATH_KEY, path);
}

export function get(coll, key, notFound) {
  return getIn(coll, [key], notFound);
}
