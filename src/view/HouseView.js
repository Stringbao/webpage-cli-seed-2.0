
import View from "../core/CView.js";
import $ from "jquery";
import Util from "../util/util.js";
import define from "../util/define.js";

class HouseView extends View {
    constructor(model){
        super();
        
        this.el = $(".div3");

        this._model = model;
    }

    init(){
        let html = '<span>房子总数为：<span class="houseCount"></span></span>';
        html += '<input type="button" class="loadSubHouse" value="LoadSubHouse" />';
        html += '<span>sub房子总数为：<span class="subhouseCount"></span></span>';
        this.el.append($(html));
        this.regEvent();
    }

    render(){
        $('span.houseCount').text(this._model._data.house.total);
        if(this._model._data.subHouse){
            $('span.subhouseCount').text(this._model._data.subHouse.total);
        }
        this._model.setFrozen(true);
    }

    regEvent(){
        console.log("HouseView register event finished");
        let that = this;
        $(".loadSubHouse").click(function(){
            that._model._sub_house_dataSource.setAutoOpen(true);
            _eventPublisher.broadcast(define.EVENT.HOUSETOPERSONKEY,that._model._sub_house_dataSource._data);
        })
    }

}

export default HouseView;