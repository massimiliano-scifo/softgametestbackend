export class GameData {
    constructor(
      public id: string,
      public name: string,
      public releaseYear: number,
      public publisher: string,
      public players: { min: number; max: number },
      public expansions: string[],
      public type: string,
      public baseGame?: string,
      public standalone?: boolean,
    ) {
      this.id = id;
      this.name = name;
      this.releaseYear = releaseYear;
      this.publisher = publisher;
      this.players = players;
      this.expansions = expansions;
      this.type = type;
      this.baseGame = baseGame;
      this.standalone = standalone;
    }
  }
  
  export const gameDataConverter = {
    toFirestore: (gameData: GameData) => {
      return {
        id: gameData.id,
        name: gameData.name,
        releaseYear: gameData.releaseYear,
        publisher: gameData.publisher,
        players: gameData.players,
        expansions: gameData.expansions,
        type: gameData.type,
        baseGame: gameData.baseGame,
        standalone: gameData.standalone,
      };
    },
    fromFirestore: (data: any) => {
      return new GameData(
        data.id,
        data.name,
        data.releaseYear,
        data.publisher,
        data.players,
        data.expansions,
        data.type,
      );
    },
  };
  