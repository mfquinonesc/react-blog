import httpClient from "./httpClient";

class RolService {

    path = '/api/rol';

    getAll() {
        return httpClient.get(this.path);
    }
}

const rolService = new RolService();

export default rolService;