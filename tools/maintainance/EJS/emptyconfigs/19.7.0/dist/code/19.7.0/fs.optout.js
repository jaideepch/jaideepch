/***************************************
* @preserve
* ForeSee Web SDK: Opt-Out Module
* Built April 27, 19 21:36:34
* Code version: 19.7.0
* Template version: 19.7.0
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"triggerconfig"],function(t,fs,utils,e){utils.registerProduct("foresee",e);var n=function(t){this.browser=t,this.stg=utils.getGeneralStorage(t)};n.prototype.loadResources=function(r){this.stg.ready.subscribe(function(){var t=fs.makeURI("$templates/trigger/admintools/main.css"),e=fs.makeURI("$templates/trigger/admintools/optout.html"),n=!1,s=!1,o=function(){n&&s&&r&&r()};utils.loadCSS(t,function(t){n=!0,o()},null,this.browser),new utils.JSONP({success:function(t){s=!0,this.template=t,o()}.bind(this)}).get(e,"templates_trigger_admintools_")}.bind(this),!0,!0)},n.prototype._applyOptOutState=function(){this.stg.ready.subscribe(function(t){var e=document,n=this.stg.get("optout");if(fs.isDefined(n)&&"false"!=n){e.querySelector(".acsOptOutControls").style.display="none",e.querySelector(".acsOptInControls").style.display="block";var s=new Date;s.setTime(t._data.keys.optout.x);var o=s.getDate(),r=s.getMonth(),i=s.getFullYear();e.getElementById("acswhenexpires").innerHTML=["January","February","March","April","May","June","July","August","September","October","November","December"][r]+" "+o+", "+i}else e.querySelector(".acsOptOutControls").style.display="block",e.querySelector(".acsOptInControls").style.display="none"}.bind(this),!0,!0)},n.prototype.render=function(){document.title="ForeSee Opt-Out Tool";var t,e,n,s=fs.ext(this.browser,{siteLogo:fs.config.staticUrl+"/logos/foresee/foresee.svg"}),o=(t=this.template,e=s,n=new window.Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"),e?n(e):n);document.body.innerHTML=o;var r=document.getElementById("acsOptOutButton"),i=document.getElementById("acsOptInButton");utils.Bind(r,"click",function(t){utils.preventDefault(t),this.stg.set("optout",!0,31536e6,!0),this._applyOptOutState()}.bind(this)),utils.Bind(i,"click",function(t){utils.preventDefault(t),this.stg.erase("optout",null,!0),this._applyOptOutState()}.bind(this)),this._applyOptOutState()},fs.domReady(function(){var e=new utils.Browser;e.ready.subscribe(function(){var t=new n(e);t.loadResources(function(){t.render()})},!0,!0)})});