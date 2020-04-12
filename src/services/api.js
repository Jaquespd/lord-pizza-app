import axios from "axios";

const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/Jaquespd/lord-pizza-db"
});

export default api;
