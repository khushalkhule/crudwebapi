import Configuration from "./../Configuration/Configuration"
import Axios from "./AxiosService"

const axios = new Axios();
//const config = new Configuration();

export default class CrudService  {
  CreateRecord(data){
    console.log("data : ",data,"url: ", Configuration.CreateRecord );
    return  axios.post(Configuration.CreateRecord, data, false)
  }

  
  ReadRecord(){
    console.log("Url:",Configuration.GetRecord)
    return axios.get(Configuration.GetRecord, false)
  }

  UpdateRecord(data){
    console.log("Url: ",Configuration.UpdateRecord)
    return axios.put(Configuration.UpdateRecord, data, false)

  }
}
