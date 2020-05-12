// import axios
const axios = require("axios");

const api = {
  getUser(queryUrl) {
    return axios.get(queryUrl);
  }
};

module.exports = api;
