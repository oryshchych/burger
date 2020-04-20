import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-3f5f0.firebaseio.com/"
});

export default instance;