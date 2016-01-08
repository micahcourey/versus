import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['coffee']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['coffee']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['coffee', 'tea']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['coffee']
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['coffee', 'tea']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'coffee'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['coffee', 'tea'],
        tally: {coffee: 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['coffee']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['coffee']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['coffee', 'tea']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'coffee'},
      {type: 'VOTE', entry: 'tea'},
      {type: 'VOTE', entry: 'coffee'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'coffee'
    }));
  });

});
