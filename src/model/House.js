import CObject from "../core/CNode.js";
import define from "../util/define.js";

class House extends CObject {
    constructor() {
        super();

        this._key = define.MODEL.PERSONKEY;

        this._data = {
            house:null,
            subHouse:null
        }

        this._house_dataSource = null;
        this._sub_house_dataSource = null;
    }

    setDataSource(dataSource){
        if(dataSource.id == define.URL.HOUSEKEY){
            this._house_dataSource = dataSource;
        }
        if(dataSource.id == define.URL.SUBHOUSEKEY){
            this._sub_house_dataSource = dataSource;
        }
    }

    onDataUpdate(dataSource,data){
        if(dataSource.id == define.URL.HOUSEKEY){
            this._data.house = data.data;
        }
        if(dataSource.id == define.URL.SUBHOUSEKEY){
            this._data.subHouse = data.data;
        }
        //ready to render
        this.setFrozen(false);
    }

    isReady(){
        if(this._data.house){
            return true;
        }
        return false;
    }
}
export default House;