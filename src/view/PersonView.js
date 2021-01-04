
import View from "../core/CView.js";
import $ from "jquery";
import Util from "../util/util.js";
import define from "../util/define.js";

class PersonView extends View {
    constructor(model){
        super();
        
        this.el = $(".div1");

        this._model = model;
    }

    init(){
        let html = '<span>人数总条数为：<span class="count"></span></span>';
        html += '<input type="button" class="reloadHouse" value="Reload" />';
        html += '<span>收到House通知,reload Data Count:<span class="reloadCount"></span></span>';
        this.el.append($(html));
        this.regEvent();
    }

    render(){
        $('span.count').text(this._model._data.person.total);
        $('span.reloadCount').text(this._model._data.person.total);
        this._model.setFrozen(true);
    }

    regEvent(){
        console.log("PersonView register event finished");
        let that = this;
        $(".reloadHouse").click(function(){
            
        })

        _eventPublisher.on(define.EVENT.HOUSETOPERSONKEY,(d)=>{
            that._model._dataSource.ajax();
        })
    }

}

export default PersonView;