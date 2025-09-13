import httpClient from "./httpClient";

class CategoryService {

    path = '/api/category';

    create(category) {
        return httpClient.post(this.path, category);
    }

    update(category, id) {
        return httpClient.put(`${this.path}/${id}`, category);
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

const categoryService = new CategoryService();

export default categoryService;