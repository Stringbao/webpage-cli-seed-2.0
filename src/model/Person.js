import CObject from "../core/CNode.js";
import define from "../util/define.js";

class Person extends CObject {
    constructor() {
        super();

        this._key = define.MODEL.PERSONKEY;

        this._data = {
            person:null,
        }

        this._dataSource = null;
    }

    setDataSource(dataSource){
        if(dataSource.id == define.URL.PERSONKEY){
            this._dataSource = dataSource;
        }
    }

    onDataUpdate(dataSource,data){
        this._data.person = data.data;

        //ready to render
        this.setFrozen(false);
    }


    isReady(){
        if(this._data.person){
            return true;
        }
        return false;
    }
}
export default Person;