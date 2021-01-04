
import q from "q";
import $ from "jquery";
import define from "../util/define.js";

const proxy_key = window.location.href.indexOf('localhost') != -1?"/api/":"";

let Util = {
    IdBuilder:{
        id:10000,
        newId(){
            return Util.IdBuilder.id++;
        }
    },
    Primary:{
        addKey(data){
            data.forEach(item => {
                item.__tmpId = Util.IdBuilder.newId();
            });
            return data;
        },
        findKey(data,val,field){
            let _key = "";
            field?_key = field:_key = "__tmpId";
            let res = null;
            data.forEach(item => {
                if(item[_key] == val){
                    res=item;
                }
            });
            return res;
        }
    },
    cloneObj(source){
        if(source){
            return JSON.parse(JSON.stringify(source));
        }
        return null;
    },
    getUrlParam(name){
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        let r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return unescape(r[2]); return ""; //返回参数值
    },
    http(url,type,data){
        let defer = q.defer();
        $.ajax({
            url:proxy_key + url,
            type:type?type:"get",
            data:data?data:null,
            success:(data)=>{
                if(typeof data == "string"){
                    data = JSON.parse(data);
                }
                if(data.success || data.rc == "0"){
                    defer.resolve(data);
                }else{
                    defer.reject({msg:"ajax请求["+url+"]失败!",tipMsg:data.msg || data.resultMsg});
                }
            },
          
        })
        return defer.promise;
    },
}

export default Util;