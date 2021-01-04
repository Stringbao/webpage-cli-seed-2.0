import Util from "../../util/util.js";

class DataSource{
    //url,params,type,errorcallback
    constructor(options){
        this._type = options.type?options.type:"get";
        this._url = options.url;
        this._params = options.params?options.params:null;
        this._data = null;
        this.id = options.id;//记录当前DataSource对象的key
        /**
            CREATED:1,
            LOADING:2,
            LOAD_FINISHED:3,
            LOAD_FAILURE:4,
            PUSHED:5 */
        this._dataState = 1;
        this.applyArr = [];

        this._errorInfo = null;
        this._errorcallback = options.errorcallback?options.errorcallback:null;

        this.autoOpen = options.autoOpen!=undefined?false:true;
    }

    reSetOptions(options){
        this._url = options.url?options.url:this._url;
        this._params = options.params?options.params:this._params;
        this._type = options.type?options.type:this._type;
    }

    onLoadDataSuccess(data){
        this._data = data;
        this._dataState = 3;
    }

    setAutoOpen(flag){
        this.autoOpen = flag;
        if(this.autoOpen){
            this._dataState = 1;
        }
    }

    update(){
        if(!this.autoOpen){
            return;
        }
        if(this._dataState == 1){
            this.ajax();
            this._dataState = 2;
        }else if(this._dataState == 3){
            this.applyArr.forEach(item=>{
                item.target.onDataUpdate(this,this._data);
                if(item.resolve){
                    item.resolve(this._data);
                }
            });
            this._dataState = 5;
            this.autoOpen = true;
        }
    }

    onLoadDataError(error){
        this._dataState = 4;
        this._errorInfo = error.tipMsg;
    }

    apply(target,resolve){
        this.applyArr.push(
            {
                target:target,
                resolve:resolve
            }
        );
        target.setDataSource(this);
    }

    ajax(){
        let that = this;

        let symbol = this._url.indexOf('?') == -1?"?":"&";
        this._url = this._url + symbol + "ran="+Math.random();
        
        let _promise = Util.http(this._url,this._type,this._params);;
        
        _promise.then(data=>{
            that.onLoadDataSuccess(data);
        }).catch(err=>{
            that.onLoadDataError(err);
            this._errorcallback && this._errorcallback(err);
        })
        return this;
    }
}

export default DataSource;