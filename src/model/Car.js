import CObject from "../core/CNode.js";
import define from "../util/define.js";

class Car extends CObject {
    constructor() {
        super();

        this._key = define.MODEL.CARKEY;

        this._data = {
            person:null,
            car:null
        }

        this._person_dataSource = null;
        this._car_dataSource = null;
    }

    setDataSource(dataSource){
        if(dataSource.id == define.URL.PERSONKEY){
            this._person_dataSource = dataSource;
        }
        if(dataSource.id == define.URL.CARKEY){
            this._car_dataSource = dataSource;
        }
    }

    onDataUpdate(dataSource,data){
        if(dataSource.id == define.URL.PERSONKEY){
            this._data.person = data.data;
        }
        if(dataSource.id == define.URL.CARKEY){
            this._data.car = data.data;
        }
        this.setFrozen(false);
    }


    isReady(){
        if(this._data.person && this._data.car){
            return true;
        }
        return false;
    }
}
export default Car;