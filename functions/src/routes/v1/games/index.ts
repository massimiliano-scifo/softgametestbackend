import { wrapAsync, createRouter } from '../../../utils/index.js';
import { getGames, createGame, updateGame, deleteGame } from '../../../apis/firestore/games.js';
import { GameData, gameDataConverter } from '../../../../shared/index.js';

export const gamesRouter = createRouter();

gamesRouter.get(
  '/',
  wrapAsync(() => getGames()),
);

gamesRouter.post(
  '/',
  wrapAsync((req) => {
    return createGame(gameDataConverter.fromObject(JSON.parse(req.body)));
  }),
);

gamesRouter.put(
  '/',
  wrapAsync((req) => {
    const data : GameData = gameDataConverter.fromObject(JSON.parse(req.body));
    return updateGame(data);
  }),
);

gamesRouter.delete(
  '/:id',
  wrapAsync((req) => {
    const id = req.params.id;
    if (!id) throw new Error('Missing game id');

    return deleteGame(id?.toString());
  }),
);