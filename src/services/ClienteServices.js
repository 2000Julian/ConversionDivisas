import axios from 'axios'

export default class ClienteService {

    URL = "http://localhost:9000/api/divisa/cliente/"
    async getAll() {
        return await axios.get(this.url + "all")
    }
}

