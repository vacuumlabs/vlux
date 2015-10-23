import {is, List, Map} from 'immutable';
import React from 'react'

function get(coll, name, notFound) {
  if (typeof coll === 'undefined' || coll === null) return notFound;
  if (coll.get) return coll.get(name, notFound);
  if (name in coll) return coll[name];
  return notFound;
}

export const STATE_KEY = '@@state';

export class Component extends React.Component {

  get __state() {return this.props[STATE_KEY]; }
  get state() {return this.__state && this.__state.get('state'); }

  /* React tries to write to state, just ignore it */
  set state(val) {} // eslint-disable-line no-unused-vars

  get path() {return this.__state.get('path'); }
  setState(state) {return this.__state.get('set')(this.path, state); }
  shouldComponentUpdate(nextProps) {return !is(Map(this.props), Map(nextProps)); }

  key = (name) => {
    return {
      key: name,
      [STATE_KEY]: Map({
        path: this.path.push(name),
        state: get(this.state, name, null),
        set: this.__state.get('set')
      })
    };
  }
}

export function bindState(set, data) {
  return {
    [STATE_KEY]: Map({
      path: List(),
      state: data,
      set: set
    })
  };
}
