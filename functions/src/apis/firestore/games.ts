import { getFirestore } from './getFirestore.js';
import { memoize } from '../../utils/memoize.js';
import { HttpError } from '../../classes/HttpError.js';

const getCollection = memoize(() =>
  getFirestore().collection('games'),
);

export async function getGames() {
  try {
    const result = await getCollection().get();
    result.docs.map((snap) => snap.data());
  } catch (error) {
    throw new HttpError(500, 'Error while fetching games');
  }
}
