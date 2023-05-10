import axios from 'axios';

export default axios.create({
  baseURL: 'https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
