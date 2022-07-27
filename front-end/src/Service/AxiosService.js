const Axios = require('axios').default
export default class AxiosService  {

    post(url,data,header){
        return Axios.post(url, data, header);
    }
  
    get(url, IsRequired=false, Header){
        return Axios.get(url, IsRequired&&Header);
    }

    put(url, data, IsRequired = false, Header){
        return Axios.put(url, data, IsRequired && Header)
    }
}
