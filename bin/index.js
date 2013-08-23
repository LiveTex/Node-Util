var util = require('node-util');
'use strict';var cli={};cli.VERSION="0.1.0";cli.args={};cli.Logger=function(){this.__level=cli.Logger.LEVEL_INFO};cli.Logger.LEVEL_INFO=3;cli.Logger.LEVEL_WARNING=2;cli.Logger.LEVEL_ERROR=1;cli.Logger.LEVEL_SILENT=0;cli.Logger.__COLOR={GREEN:"\u001b[32m",YELLOW:"\u001b[33m",RED:"\u001b[31m",MAGENTA:"\u001b[35m",LIGHT_GRAY:"\u001b[1;30m",RESET:"\u001b[0m"};cli.Logger.__LEVEL_COLORS={"INFO":cli.Logger.__COLOR.LIGHT_GRAY,"WARNING":cli.Logger.__COLOR.YELLOW,"ERROR":cli.Logger.__COLOR.RED};
cli.Logger.__getArgs=function(level,args){return[cli.Logger.__LEVEL_COLORS[level],"["+(new Date).toLocaleString().match(/[^\s]+/g).slice(1,5).join(" ")+"]","["+level+"]:"].concat(Array.prototype.slice.call(args),cli.Logger.__COLOR.RESET)};cli.Logger.prototype.setConsole=function(console){console.info=this.__info.bind(this);console.warn=this.__warn.bind(this);console.error=this.__error.bind(this)};cli.Logger.prototype.setLevel=function(level){this.__level=level};cli.Logger.prototype.getLevel=function(){return this.__level};
cli.Logger.prototype.__info=function(){this.__level>2&&console.log.apply(console,cli.Logger.__getArgs("INFO",arguments))};cli.Logger.prototype.__warn=function(){this.__level>1&&console.log.apply(console,cli.Logger.__getArgs("WARNING",arguments))};cli.Logger.prototype.__error=function(){this.__level>0&&console.log.apply(console,cli.Logger.__getArgs("ERROR",arguments))};cli.Config=function(){this.__safeCore=null;this.__config={}};cli.Config.prototype.load=function(filename){try{var config=require(filename);this.__config=util.mergeRecursive(this.__config,config)}catch(error){console.error("Unable to open config file: "+filename+".")}this.__safeCore=new util.object.SafeObject(this.__config)};cli.Config.prototype.getString=function(var_args){var result=this.__safeCore.getByPath(util.toArray(arguments));if(result!==null)return String(result);return""};
cli.Config.prototype.getNumber=function(var_args){var result=this.__safeCore.getByPath(util.toArray(arguments));if(result!==null)return Number(result);return NaN};cli.Config.prototype.getBoolean=function(var_args){return!!this.__safeCore.getByPath(util.toArray(arguments))};cli.Config.prototype.getObject=function(var_args){var result=this.__safeCore.getByPath(util.toArray(arguments));if(typeof result==="object")return result;return null};
cli.Config.prototype.getArray=function(var_args){var result=this.__safeCore.getByPath(util.toArray(arguments));if(result instanceof Array)return result;return[]};cli.Config.__instance=null;cli.Config.getInstance=function(){if(cli.Config.__instance===null)cli.Config.__instance=new cli.Config;return cli.Config.__instance};cli.args.__map={};cli.args.__defaults={};cli.args.registerValue=function(name,opt_defaultValue){cli.args.__map[name]=[];if(opt_defaultValue)cli.args.__defaults[name]=opt_defaultValue};cli.args.extractValues=function(agrv){var args=[];for(var i=0,l=agrv.length;i<l;i+=1)args=args.concat(agrv[i].split("="));var currentArg="";while(args.length>0)currentArg=cli.args.__applyArgument(args.shift(),currentArg)};
cli.args.getArray=function(name){if(cli.args.__map[name]!==undefined)return cli.args.__map[name].slice(0);if(cli.args.__defaults[name]!==undefined)return[].concat(cli.args.__defaults[name]);return null};cli.args.getString=function(name){if(cli.args.__map[name]!==undefined&&cli.args.__map[name][0]!==undefined)return cli.args.__map[name][0];if(cli.args.__defaults[name]!==undefined)return String(cli.args.__defaults[name]);return""};
cli.args.getNumber=function(name){if(cli.args.__map[name]!==undefined&&cli.args.__map[name][0]!==undefined)return Number(cli.args.__map[name][0]);if(cli.args.__defaults[name]!==undefined)return Number(cli.args.__defaults[name]);return 0};cli.args.getBoolean=function(name){if(cli.args.__map[name]===undefined)return Boolean(cli.args.__defaults[name]);return cli.args.__map[name].length>0&&cli.args.__map[name][0].toLowerCase()!=="false"&&Boolean(cli.args.__map[name][0])};
cli.args.__applyArgument=function(arg,currentArg){var value="";var newArg="";if(arg.indexOf("--")===0){var name=arg.substr(2);if(cli.args.__map[name]!==undefined)newArg=name}else value=arg;if(currentArg!==""){cli.args.__map[currentArg].push(value);currentArg=""}if(newArg!=="")currentArg=newArg;return currentArg};
module.exports = cli;

