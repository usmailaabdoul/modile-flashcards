export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const UPDATE_DECKS = 'UPDATE_DECKS';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';

export function getAllDecks (decks) {
  return {
    type: GET_ALL_DECKS,
    decks,
  }
}

export function updateDecks (decks) {
  return {
    type: UPDATE_DECKS,
    decks,
  }
}

export function addNewDeck (deck) {
  return {
    type: ADD_NEW_DECK,
    deck,
  }
}