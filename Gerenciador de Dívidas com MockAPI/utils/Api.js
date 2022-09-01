import axios from "axios";

const api = axios.create({
    baseURL: "https://630ce51553a833c53437e07c.mockapi.io/"
});

export default api;