import httpClient from "./httpClient";

class UserService {

    path = '/api/user';

    get(userId) {
        return httpClient.get(`${this.path}/${userId}`);
    }

    getAll(){
        return httpClient.get(this.path);
    }
}

const userService = new UserService();

export default userService;