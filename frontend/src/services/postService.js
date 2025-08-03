import httpClient from "./httpClient";

class PostService {

    path = '/api/post';

    create(post) {
        return httpClient.post(this.path, post);
    }

    update(post, postId) {
        return httpClient.put(`${this.path}/${postId}`, post);
    }

    get(postId) {
        return httpClient.get(`${this.path}/${postId}`);
    }

    getAll() {
        return httpClient.get(this.path);
    }

    getByUserId(userId) {
        return httpClient.get(this.path, {
            params: { userId }
        });
    }

    delete(postId) {
        return httpClient.delete(`${this.path}/${postId}`);
    }
}

const postService = new PostService();

export default postService;