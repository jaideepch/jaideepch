/***************************************
* @preserve
* ForeSee Web SDK: Opt-Out Module
* Built April 27, 19 21:53:40
* Code version: 19.6.0
* Template version: 19.6.0
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"triggerconfig"],function(t,e,o,config){o.registerProduct("foresee",config);var r=function(t,e){var o;return o=new window.Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"),e?o(e):o},s=function(t){this.browser=t,this.stg=o.getGeneralStorage(t)};s.prototype.loadResources=function(t){this.stg.ready.subscribe(e.proxy(function(){var r=e.makeURI("$templates/trigger/admintools/main.css"),s=e.makeURI("$templates/trigger/admintools/optout.html"),n=!1,i=!1,a=function(){n&&i&&t&&t()};o.loadCSS(r,function(t){n=!0,a()},null,this.browser),new o.JSONP({success:e.proxy(function(t){i=!0,this.template=t,a()},this)}).get(s,"templates_trigger_admintools_")},this),!0,!0)},s.prototype._applyOptOutState=function(){this.stg.ready.subscribe(e.proxy(function(t){var o=document,r=this.stg.get("optout");if(e.isDefined(r)&&"false"!=r){o.querySelector(".acsOptOutControls").style.display="none",o.querySelector(".acsOptInControls").style.display="block";var s=new Date,n=["January","February","March","April","May","June","July","August","September","October","November","December"];s.setTime(t._data.keys.optout.x);var i=s.getDate(),a=s.getMonth(),p=s.getFullYear();o.getElementById("acswhenexpires").innerHTML=n[a]+" "+i+", "+p}else o.querySelector(".acsOptOutControls").style.display="block",o.querySelector(".acsOptInControls").style.display="none"},this),!0,!0)},s.prototype.render=function(){document.title="ForeSee Opt-Out Tool";var t=e.ext(this.browser,{siteLogo:e.config.staticUrl+"/logos/foresee/foresee.svg"}),s=r(this.template,t);document.body.innerHTML=s;var n=document.getElementById("acsOptOutButton"),i=document.getElementById("acsOptInButton");o.Bind(n,"click",e.proxy(function(t){o.preventDefault(t),this.stg.set("optout",!0,31536e6,!0),this._applyOptOutState()},this)),o.Bind(i,"click",e.proxy(function(t){o.preventDefault(t),this.stg.erase("optout",null,!0),this._applyOptOutState()},this)),this._applyOptOutState()},e.domReady(function(){var t=new o.Browser;t.ready.subscribe(function(){var e=new s(t);e.loadResources(function(){e.render()})},!0,!0)})});