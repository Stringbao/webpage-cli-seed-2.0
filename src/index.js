import $ from "jquery";
import define from "./util/define.js";
import Util from "./util/util.js";

import Engine from "./core/Engine.js";
import CDataSource from "./core/data/CDataSource.js";

import Person from "./model/Person.js";
import PersonView from "./view/PersonView.js";

import Car from "./model/Car.js";
import CarView from "./view/CarView.js";

import House from "./model/House.js";
import HouseView from "./view/HouseView.js";

let _engine = new Engine();

/**
 * @description 普通单个请求
 */
let _person = new Person();
let _personView = new PersonView(_person);
let _person_dataSource = new CDataSource({
    id:define.URL.PERSONKEY,
    url:"/lanc/his/admin/query/prescription/v1?beginTime=&patientName=&page=1&rows=10",
});
_person_dataSource.apply(_person);
_engine._dataManage.add(_person_dataSource);
_engine.addView(_personView);


/**
 * @description 多个ajax依赖请求
 */
let _car = new Car();
let _carView = new CarView(_car);
_person_dataSource.apply(_car,(data)=>{
    let _car_dataSource = new CDataSource({
        id:define.URL.CARKEY,
        url:"/lanc/his/admin/Query/Doctor/v1?name=&account=&page=1&rows=10&id="+data.data.page,
    });
    _car_dataSource.apply(_car);
    _engine._dataManage.add(_car_dataSource);
});
_engine.addView(_carView);

/**
 * @description 多个ajax, 子数据异步请求, 跨模块事件通信
 */
let _house = new House();
let _houseView = new HouseView(_house);
let _house_dataSource = new CDataSource({
    id:define.URL.HOUSEKEY,
    url:"/lanc/his/admin/Query/RobotModel/v1?filter=&page=1&rows=10",
})
let _sub_house_dataSource = new CDataSource({
    id:define.URL.SUBHOUSEKEY,
    url:"/lanc/his/admin/Query/Patient/v1?name=&certificateNo=&socialSecurityNo=&page=1&rows=10",
    autoOpen:false
})
_house_dataSource.apply(_house);
_sub_house_dataSource.apply(_house);
_engine.addView(_houseView);
_engine._dataManage.add(_house_dataSource);
_engine._dataManage.add(_sub_house_dataSource);

_engine.init().start();


$(function(){
    $("#login").click(function(){
        $.ajax({
            type:"post",
            url:"/api/lanc/his/admin/Login/ByAccount/v1",
            contentType: 'application/json',
            data:JSON.stringify({account:"001",password:"123456"}),
            success:function(d){
                console.log('登录成功');
            },
            error:(err)=>{
                console.log('登录失败');
            }
        })
    })
})



