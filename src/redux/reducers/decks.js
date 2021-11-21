import { GET_ALL_DECKS, UPDATE_DECKS, ADD_NEW_DECK } from '../actions/decks';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_ALL_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case UPDATE_DECKS:
      return {
        ...action.decks
      }
    case ADD_NEW_DECK:
      return {
        ...state,
        ...action.deck
      }
    default:
      return state;
  }
}