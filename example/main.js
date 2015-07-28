import React from 'react';
import {bindState, Component} from '../src/state';
import {Dispatcher} from '../src/dispatcher';
import {setStateStore, createFluxSetState} from '../src/flux_set_state';
import {Map} from 'immutable';

const dispatcher = new Dispatcher(setStateStore, Map());
const setState = createFluxSetState(dispatcher.dispatch);

class Container extends React.Component {

  componentWillMount() {
    dispatcher.on('change', (state) => {
      this.forceUpdate();
      console.log('New state', state.toJS());
    })
  }

  render() {
    return (
      <Main {...bindState(setState, dispatcher.state)} />
    );
  }
}

class Main extends Component {
  
  render() {
    const key = this.key;
    return (
      <div>
        <Item {...key('top')} />
        <Item {...key('bottom')} />
        <Static text="Hello there!" />
      </div>
    );
  }
}

class Static extends Component {
  render() {
    return <div>{this.props.text}</div>
  }
}

class Item extends Component {

  render() {
    const key = this.key;
    return (
      <div>
        <Field {...key('left')} />
        <Field {...key('right')} />
      </div>
    );
  }
}


class Field extends Component {
  render() {
    const state = this.state || Map({value: ''});
    return <input
      onChange={(e) => {this.setState({value: e.target.value});}}
      value={state.get('value')}
    />;
  }
}

window.onload = () => {
  React.render(<Container />, window.document.getElementById('app'));
};
