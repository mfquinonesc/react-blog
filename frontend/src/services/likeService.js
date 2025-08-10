import httpClient from "./httpClient";

class LikeService {

    path = '/api/like';

    create(like) {
        return httpClient.post(this.path, like);
    }

    delete(likeId) {
        return httpClient.delete(`${this.path}/${likeId}`);
    }
}

const likeService = new LikeService();

export default likeService;