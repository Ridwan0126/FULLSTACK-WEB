import axios from "axios";
const API_BASE_URL = "http://localhost:8080/data/api/Customer";

class customertService {
  getAllCustomer = () => {
    return axios.get(API_BASE_URL);
  };
}

export default new customertService();
