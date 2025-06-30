import { getFirestore } from './getFirestore.js';
import { memoize } from '../../utils/memoize.js';
import { HttpError } from '../../classes/HttpError.js';
import { GameData, gameDataConverter } from '../../../shared/GameData.js';

const getCollection = memoize(() =>
  getFirestore().collection('games'),
);

export async function getGames() {
  try {
    const result = await getCollection().get();
    return result.docs.map((snap) => gameDataConverter.fromFirestore(snap.data()));
  } catch (error) {
    throw new HttpError(500, 'Error while fetching games');
  }
}

export async function createGame(gameData: GameData) {
  try {
    const result = await getCollection().add(gameData);
    return result.id;
  } catch (error) {
    throw new HttpError(500, 'Error while creating game');
  }
}

export async function updateGame(gameData: GameData) {
  try {
    const result = await getCollection().doc(gameData.id).update(gameDataConverter.toFirestore(gameData));
    return result;
  } catch (error) {
    throw new HttpError(500, 'Error while updating game');
  }
}

export async function deleteGame(gameData: GameData) {
  try {
    const result = await getCollection().doc(gameData.id).delete();
    return result;
  } catch (error) {
    throw new HttpError(500, 'Error while deleting game');
  }
}
