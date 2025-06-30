export class HttpService {
    private static baseUrl = 'http://localhost:5004/softgames-test-464507/europe-west3/api/v1';
    
    public async getGames() {
        const response = await fetch(`${HttpService.baseUrl}/games`);
        return response.json();
    }
}