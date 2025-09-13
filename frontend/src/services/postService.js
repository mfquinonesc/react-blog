import httpClient from "./httpClient";

class PostService {

    path = '/api/post';

    create(post) {
        return httpClient.post(this.path, post);
    }

    update(post, id) {
        return httpClient.put(`${this.path}/${id}`, post);
    }

    get(id) {
        return httpClient.get(`${this.path}/${id}`);
    }

    getAll() {
        return httpClient.get(this.path);
    }

    getByUserId(userId) {
        return httpClient.get(this.path, {
            params: { userId }
        });
    }

    delete(id) {
        return httpClient.delete(`${this.path}/${id}`);
    }
}

const postService = new PostService();

export default postService;