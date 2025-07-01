import { GameData } from "functions_shared";

export class HttpService {
    private static baseUrl = 'http://localhost:5001/softgames-test-464507/europe-west3/api/v1';
    
    public async getGames() {
        const response = await fetch(`${HttpService.baseUrl}/games`);
        return response.json();
    }

    public async createGame(gameData: GameData) {
        const response = await fetch(`${HttpService.baseUrl}/games`, {
            method: 'POST',
            body: JSON.stringify(gameData),
        });
        return response.json();
    }

    public async updateGame(gameData: GameData) {
        const response = await fetch(`${HttpService.baseUrl}/games`, {
            method: 'PUT',
            body: JSON.stringify(gameData),
        });
        return response.json();
    }
    
    public async deleteGame(id: string) {
        const response = await fetch(`${HttpService.baseUrl}/games/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }
}