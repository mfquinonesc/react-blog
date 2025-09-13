import httpClient from "./httpClient";

class LikeService {

    path = '/api/like';

    create(like) {
        return httpClient.post(this.path, like);
    }

    delete(id) {
        return httpClient.delete(`${this.path}/${id}`);
    }
}

const likeService = new LikeService();

export default likeService;