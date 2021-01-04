
export default class CObject{
    constructor(){
        this._data = null;
        this._frozen = false;
        this.selectItem = null;
    }

    isReady(){
        return false;
    }

    setSelectItem(item){
        this.selectItem = item;
    }

    setFrozen(value){
        this._frozen = value;
    }

    setDataSource(){
        
    }

    onDataUpdate(){
        
    }

    init(){
        
    }

    getData(){
        return this._data;
    }

    setData(data){
        this._data = data;
        this.setFrozen(false);
    }
}