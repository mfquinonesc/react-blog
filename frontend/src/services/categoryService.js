import httpClient from "./httpClient";

class CategoryService {

    path = '/api/category';

    create(category) {
        return httpClient.post(this.path, category);
    }

    update(category, categoryId) {
        return httpClient.put(`${this.path}/${categoryId}`, category);
    }

    get(categoryId) {
        return httpClient.get(`${this.path}/${categoryId}`);
    }

    getAll() {
        return httpClient.get(this.path);
    }   

    delete(categoryId) {
        return httpClient.delete(`${this.path}/${categoryId}`);
    }
}

const categoryService = new CategoryService();

export default categoryService;