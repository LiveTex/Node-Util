var util = require('util');
var async = require('async');
'use strict';util.VERSION="0.0.1";util.async={};util.cache={};util.encodeJsonData=function(object){try{return JSON.stringify(object)}catch(error){console.error(error)}return""};util.decodeJsonData=function(data){try{return JSON.parse(data)}catch(error){console.error(error)}return null};util.encodeBase64Data=function(string,opt_forUrl){var result=(new Buffer(string)).toString("base64");if(opt_forUrl)result=result.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+\s*$/g,"");return result};
util.decodeBase64Data=function(string,opt_forUrl){if(opt_forUrl)string=string.replace(/-/g,"+").replace(/_/g,"/")+"===".slice(0,string.length%4);return(new Buffer(string,"base64")).toString()};util.encodeFormData=function(object){return util.__splitUrlData(object).join("&")};
util.decodeFormData=function(data){var result=new util.SafeObject({});var values=decodeURIComponent(data).split("&");var i=0,l=values.length;var pair=[];while(i<l){pair=values[i].split("=");if(pair[1]!==undefined)result.setByPath(pair[1],util.__parseFormDataToken(pair[0]));i++}return result.getCore()};util.escape=function(url){return encodeURIComponent(url)};util.unescape=function(url){try{return decodeURIComponent(url)}catch(error){console.error("Malformed url:",url)}return""};
util.__parseFormDataToken=function(token){if(token.charAt(token.length-1)!=="]")return[token];var nameLength=token.indexOf("[");return[token.substring(0,nameLength)].concat(token.substring(nameLength+1,token.length-1).split("]["))};
util.__splitUrlData=function(object,opt_path){var result=[];if(opt_path===undefined)opt_path=[];if(typeof object==="object")for(var key in object){var newPath=opt_path.length===0?[key]:(opt_path.join(",")+","+key).split(",");result=result.concat(util.__splitUrlData(object[key],newPath))}else result=[opt_path.shift()+(opt_path.length>0?"["+opt_path.join("][")+"]=":"=")+util.escape(String(object))];return result};
util.indexOf=function(element,array){if(array.indexOf!==undefined)return array.indexOf(element);else{var i=0,l=array.length;while(i<l){if(array[i]===element)return i;i++}}return-1};util.unique=function(set){var result={};for(var i=0,l=set.length;i<l;i+=1)result[set[i]]=true;return Object.keys(result)||[]};util.glue=function(keys,values){var result={};var i=0,l=keys.length;while(i<l){result[keys[i]]=values[i];i+=1}return result};
util.fill=function(array,value){var i=0,l=array.length;while(i<l){array[i]=value;i+=1}return array};util.createArray=function(length,opt_defaultValue){var defaultValue=null;if(opt_defaultValue!==undefined)defaultValue=opt_defaultValue;return util.fill(new Array(length),defaultValue)};util.cloneArray=function(array){return array.slice(0)};util.toArray=function(list){return Array.prototype.slice.call(list)};
util.toStringArray=function(array){var i=0,l=array.length;var result=new Array(l);while(i<l){result[i]=String(array[i]);i+=1}return result};util.toObjectArray=function(array){var i=0,l=array.length;var result=new Array(l);while(i<l){result[i]=Object(array[i]);i+=1}return result};util.getRandomItem=function(items,complete,cancel){complete(items[Math.floor(Math.random()*items.length)]||null)};util.safe=function(obj){return new util.SafeObject(obj||{})};util.clone=function(object){try{return JSON.parse(JSON.stringify(object))}catch(error){console.error(error)}return null};
util.merge=function(base,target){for(var key in target)base[key]=target[key]};util.areEqual=function(first,second){try{return first===second||JSON.stringify(first)===JSON.stringify(second)}catch(error){console.error(error)}return false};util.bind=function(func,context){return function(){return func.apply(context,arguments)}};util.getRandomNumber=function(threshold){return Math.floor(threshold*Math.random())};
util.hashMurmur=function(str,seed){var l=str.length;var h=seed^l;var i=0;var k=0;while(l>=4){k=str.charCodeAt(i)&255|(str.charCodeAt(i+1)&255)<<8|(str.charCodeAt(i+2)&255)<<16|(str.charCodeAt(i+3)&255)<<24;k=(k&65535)*1540483477+(((k>>>16)*1540483477&65535)<<16);k^=k>>>24;k=(k&65535)*1540483477+(((k>>>16)*1540483477&65535)<<16);h=(h&65535)*1540483477+(((h>>>16)*1540483477&65535)<<16)^k;l-=4;i+=4}switch(l){case 3:h^=(str.charCodeAt(i+2)&255)<<16;case 2:h^=(str.charCodeAt(i+1)&255)<<8;case 1:h^=str.charCodeAt(i)&
255;h=(h&65535)*1540483477+(((h>>>16)*1540483477&65535)<<16)}h^=h>>>13;h=(h&65535)*1540483477+(((h>>>16)*1540483477&65535)<<16);h^=h>>>15;return h>>>0};util.parseInt=function(number){return parseInt(number,10)};util.SafeObject=function(data){this.__core=data};util.SafeObject.prototype.getCore=function(){return this.__core};util.SafeObject.prototype.get=function(var_keys){return this.getByPath(Array.prototype.slice.call(arguments))};util.SafeObject.prototype.set=function(value,var_keys){var path=Array.prototype.slice.call(arguments);this.setByPath(path.shift(),path)};
util.SafeObject.prototype.getByPath=function(path){var result=this.__core;var i=0,l=path.length;var value=null;while(i<l){if(result===null||path[i]==="")break;value=result[path[i]];if(value!==undefined)result=value;else result=null;i++}return result};
util.SafeObject.prototype.setByPath=function(value,path){var scope=this.__core;var i=0,l=path.length;var key=null;while(i<l){key=path[i+=1];if(key===""){key=0;while(scope[key]!==undefined)key++}if(i===l)scope[key]=value;else if(scope[key]===undefined)scope[key]=isNaN(path[i])?{}:[];scope=scope[key]}};util.SafeObject.prototype.getString=function(var_keys){var result=this.__core.getByPath(util.toArray(arguments));if(result!==null)return String(result);return""};
util.SafeObject.prototype.getNumber=function(var_keys){var result=this.__core.getByPath(util.toArray(arguments));if(result!==null)return Number(result);return NaN};util.SafeObject.prototype.getBoolean=function(var_keys){return!!this.__core.getByPath(util.toArray(arguments))};util.SafeObject.prototype.getObject=function(var_keys){var result=this.__core.getByPath(util.toArray(arguments));if(typeof result==="object")return result;return null};
util.SafeObject.prototype.getArray=function(var_keys){var result=this.__core.getByPath(util.toArray(arguments));if(result instanceof Array)return result;return[]};util.async.randomizeArray=function(array,complete,cancel){complete(util.randomizeArray(array))};util.async.getRandomItem=function(items,complete,cancel){complete(items[Math.floor(Math.random()*items.length)]||null)};util.async.delayActor=function(delay){return function(data,complete,cancel){setTimeout(function(){complete(data)},delay)}};util.async.timeMeasureStartActor=function(name){return function(data,complete,cancel){console.time(name);complete(data)}};
util.async.timeMeasureStopActor=function(name){return function(data,complete,cancel){console.timeEnd(name);complete(data)}};util.cache.ArrayCache=function(){this.__data={};this.__expires={}};util.cache.ArrayCache.prototype.get=function(key){if(this.__data[key]!==undefined){var ttl=this.ttl(key);if(ttl<=0)this.remove(key);else return this.__data[key]}return[]};util.cache.ArrayCache.prototype.set=function(key,data,timeout){if(timeout>0){this.__data[key]=data;this.__expires[key]=Date.now()+timeout}};util.cache.ArrayCache.prototype.remove=function(key){delete this.__expires[key];delete this.__data[key]};
util.cache.ArrayCache.prototype.has=function(key){return this.ttl(key)>0};util.cache.ArrayCache.prototype.ttl=function(key){if(this.__expires[key]!==undefined)return this.__expires[key]-Date.now();return 0};util.cache.ObjectCache=function(){this.__data={};this.__expires={}};util.cache.ObjectCache.prototype.get=function(key){if(this.__data[key]!==undefined){var ttl=this.ttl(key);if(ttl<=0)this.remove(key);else return this.__data[key]}return null};util.cache.ObjectCache.prototype.set=function(key,data,timeout){if(timeout>0){this.__data[key]=data;this.__expires[key]=Date.now()+timeout}};util.cache.ObjectCache.prototype.remove=function(key){delete this.__expires[key];delete this.__data[key]};
util.cache.ObjectCache.prototype.has=function(key){return this.ttl(key)>0};util.cache.ObjectCache.prototype.ttl=function(key){if(this.__expires[key]!==undefined)return this.__expires[key]-Date.now();return 0};util.cache.StringCache=function(){this.__data={};this.__expires={}};util.cache.StringCache.prototype.get=function(key){if(this.__data[key]!==undefined){var ttl=this.ttl(key);if(ttl<=0)this.remove(key);else return this.__data[key]}return""};util.cache.StringCache.prototype.set=function(key,data,timeout){if(timeout>0){this.__data[key]=data;this.__expires[key]=Date.now()+timeout}};util.cache.StringCache.prototype.remove=function(key){delete this.__expires[key];delete this.__data[key]};
util.cache.StringCache.prototype.has=function(key){return this.ttl(key)>0};util.cache.StringCache.prototype.ttl=function(key){if(this.__expires[key]!==undefined)return this.__expires[key]-Date.now();return 0};


module.exports =  util;