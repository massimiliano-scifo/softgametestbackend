import { wrapAsync, createRouter } from '../../../utils/index.js';
import { getGames, createGame, updateGame, deleteGame } from '../../../apis/firestore/games.js';

export const gamesRouter = createRouter();

gamesRouter.get(
  '/',
  wrapAsync(() => getGames()),
);

gamesRouter.post(
  '/',
  wrapAsync((req) => createGame(req.body)),
);

gamesRouter.put(
  '/:id',
  wrapAsync((req) => {
    const id = req.params.id;
    if (!id) throw new Error('Missing game id');
    return updateGame(req.body, id?.toString());
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