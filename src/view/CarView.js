
import View from "../core/CView.js";
import $ from "jquery";
import Util from "../util/util.js";

class CarView extends View {
    constructor(model){
        super();
        
        this.el = $(".div2");

        this._model = model;
    }

    init(){
        let html = '<span>人数总条数为：<span class="person_count"></span></span>';
        html += '<span>车辆总条数为：<span class="car_count"></span></span>';
        html += '<input type="button" class="getCarList" value="GetCarList" />';
        this.el.append($(html));
        this.regEvent();
    }

    render(){
        $('span.person_count').text(this._model._data.person.total);
        $('span.car_count').text(this._model._data.car.total);
        this._model.setFrozen(true);
    }

    regEvent(){
        console.log("CarView register event finished");
        let that = this;
        $(".getCarList").click(function(){
            that._model._car_dataSource.ajax();
        })
    }
}

export default CarView;