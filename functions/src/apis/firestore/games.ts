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
    return result.docs.map((snap) => gameDataConverter.fromObject(snap.data()));
  } catch (error) {
    throw new HttpError(500, 'Error while fetching games');
  }
}

export async function createGame(gameData: GameData) {
  try {
    // Max: I don't like this way of giving the id, but is to keep it consistent with the data from games.json
    const query = await getCollection().count().get();
    gameData.id = (query.data().count + 1).toString();
    await getCollection().doc(gameData.id).set(gameDataConverter.toFirestore(gameData));
    return gameData.id;
  } catch (error) {
    throw new HttpError(500, 'Error while creating game');
  }
}

export async function updateGame(updateData: GameData) {
  try {
    const result = await getCollection().doc(updateData.id).update(gameDataConverter.toFirestore(updateData));
    return result;
  } catch (error) {
    throw new HttpError(500, 'Error while updating game');
  }
}

export async function deleteGame(id: string) {
  try {
    const result = await getCollection().doc(id).delete();
    return result;
  } catch (error) {
    throw new HttpError(500, 'Error while deleting game');
  }
}
