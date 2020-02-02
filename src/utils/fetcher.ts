import axios from 'axios';
import { host } from 'envConfig';

const instance = axios.create({
  baseURL: `${host}/api`, // TODO: api 나오면 교체
});

export default instance;
