import httpClient from "./httpClient";

class CommentService {

    path = '/api/comment';

    create(comment) {
        return httpClient.post(this.path, comment);
    }

    update(comment, id) {
        return httpClient.put(`${this.path}/${id}`, comment);
    }

    get(id) {
        return httpClient.get(`${this.path}/${id}`);
    }

    getAll() {
        return httpClient.get(this.path);
    }

    delete(id) {
        return httpClient.delete(`${this.path}/${id}`);
    }
}

const commentService = new CommentService();

export default commentService;