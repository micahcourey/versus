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

});
