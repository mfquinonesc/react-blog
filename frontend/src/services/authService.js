import httpClient from "./httpClient";

class AuthService {

   path = '/api/auth';

   signup(user) {
      return httpClient.post(`${this.path}/signup`, user);
   }

   login(login) {
      return httpClient.post(`${this.path}/login`, login);
   }

   demo(){
      return httpClient.post(`${this.path}/demo`);
   }

   verify(){
      return httpClient.get(`${this.path}/verify`);
   }
}

const authService = new AuthService();

export default authService;