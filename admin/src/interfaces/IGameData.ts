export interface IGameData {
  id: string;
  name: string;
  releaseYear: number;
  publisher: string;
  players: {
    min: number;
    max: number;
  };
  expansions: string[];
  type: string;
  baseGame?: string;
  standalone?: boolean;
}
