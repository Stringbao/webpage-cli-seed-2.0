
import CDataManager from "./data/CDataManager.js";
import Util from "../util/util.js";

class Engine{
    constructor(){
        this._modelList = [];
        this._viewList = [];
        this._dataManage = new CDataManager();
    }

    addView(view){
        this._viewList.push(view);
        this._modelList.push(view._model);
    }

    init(){
        for(let i =0;i<this._viewList.length;i++){
            this._viewList[i].init();
        }
        return this;
    }
    
    update(){
        
    }

    render(){
        for(let i =0;i<this._viewList.length;i++){
            if(this._viewList[i]._model.isReady() && !this._viewList[i]._model._frozen){
                this._viewList[i].render();
                console.log("render",this._viewList[i].constructor.name);
            }
        }
    }

    start(){
        let that = this;
        requestAnimationFrame(function f(){
            that._dataManage.update();
            that.update();
            that.render();
            requestAnimationFrame(f);
        });
    }
}

export default Engine;