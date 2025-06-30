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
  wrapAsync((req) => updateGame(req.body)),
);

gamesRouter.delete(
  '/:id',
  wrapAsync((req) => deleteGame(req.body)),
);