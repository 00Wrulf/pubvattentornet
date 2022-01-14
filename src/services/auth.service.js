import axios from "axios";

const API_URL = "http://localhost:8080/auth";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "loginAdmin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("admin", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "registerAdmin", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('admin'));;
  }
}

export default new AuthService();