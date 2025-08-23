import httpClient from "./httpClient";

class CommentService {

    path = '/api/comment';

    getAll(){
        return httpClient.get(this.path);
    }
}

const commentService = new CommentService();

export default commentService;