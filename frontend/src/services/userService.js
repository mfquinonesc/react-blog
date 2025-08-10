import httpClient from "./httpClient";

class UserService {

    path = '/api/user';

    get(userId) {
        return httpClient.get(`${this.path}/${userId}`);
    }
}

const userService = new UserService();

export default userService;