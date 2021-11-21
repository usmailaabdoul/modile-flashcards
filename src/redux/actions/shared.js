import Storage from '../../util/storage';
import {getAllDecks} from './decks';

export function getData() {
  return async (dispatch) => {
    try {
      const decks = await Storage.loadDataObj('DECKS');
      dispatch(getAllDecks(decks))
    } catch (error) {
      console.log(error);
    }
  }
}