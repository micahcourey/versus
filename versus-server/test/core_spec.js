import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entties to the state', () => {
      const state = Map();
      const entries = ['coffee', 'tea'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('coffee', 'tea')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote',() => {
      const state = Map({
        entries: List.of('coffee', 'tea', 'juice')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('coffee', 'tea')
        }),
        entries: List.of('juice')
      }));
    });{
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('coffee', 'tea')
        }),
        entries: List()
      });
      const nextState = vote(state, 'coffee');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('coffee', 'tea'),
          tally: Map({
            'coffee': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('coffee', 'tea'),
          tally: Map({
            'coffee': 3,
            'tea': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'coffee');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('coffee', 'tea'),
          tally: Map({
            'coffee': 4,
            'tea': 2
          })
        }),
        entries: List()
      }));
    });
  });

});
