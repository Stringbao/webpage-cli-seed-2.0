
import define from "../../util/define.js";
import Util from "../../util/util.js";

class DataManager{
    constructor(){
        this._dataSoucre = [];
    }

    add(dataSoucre){
        this._dataSoucre.push(dataSoucre);
    }

    update(){
        this._dataSoucre.forEach(item=>{
            if(!item._errorInfo){
                item.update();
            }
        })
    }
}

export default DataManager;