/***************************************
* @preserve
* ForeSee Web SDK: Survey Admin Module
* Built April 27, 19 21:52:36
* Code version: 19.6.1
* Template version: 19.6.1
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"triggerconfig"],function(e,t,r,config){if(r.registerProduct("foresee",config),config&&config.surveydefs)for(var n=0;n<config.surveydefs.length;n++)t.isString(config.surveydefs[n])&&(config.surveydefs[n]=r.compile(r.b64DecodeUnicode(config.surveydefs[n])));var o=function(e,t){var r;return r=new window.Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"),t?r(t):r},i=function(e){this.browser=e,this.stg=r.getGeneralStorage(e)};i.prototype.loadResources=function(e){this.stg.ready.subscribe(t.proxy(function(){var n=t.makeURI("$templates/trigger/admintools/main.css"),o=t.makeURI("$templates/trigger/admintools/admin.html"),i=!1,s=!1,l=function(){i&&s&&e&&e()};r.loadCSS(n,function(e){return function(e){i=!0,l()}}(),null,this.browser),new r.JSONP({success:t.proxy(function(e){s=!0,this.template=e,l()},this)}).get(o,"templates_trigger_admintools_")},this),!0,!0)},i.prototype._applyValues=function(){var e,r={sp:{},lf:{}},n=document.querySelectorAll(".acsSPOverride"),o=document.querySelectorAll(".acsLFOverride");for(e=0;e<n.length;e++){var i=n[e].id,s=n[e].value,l=i.replace("_spovr_","");s&&s.length>0&&(r.sp[l]={reg:parseInt(s,10),outreplaypool:parseInt(s,10)})}for(e=0;e<o.length;e++){var a=o[e].id,c=o[e].value,u=a.replace("_lfovr_","");c&&c.length>0&&(r.lf[u]=parseInt(c,10))}var d=!1;document.getElementById("acsOverridePooling").checked&&(d=!0),r.pooloverride=d,this.stg.set("ovr",JSON.stringify(r),null,!0,null,t.proxy(function(){this.writeMessage("Override saved.")},this))},i.prototype.writeMessage=function(e){var t=document.getElementById("fsMessage");clearTimeout(this.wmTimeout),t&&(t.innerHTML=e||"",this.wmTimeout=setTimeout(function(){t.innerHTML=""},3e3))},i.prototype.render=function(){document.title="ForeSee Survey Administration Tool";var e=t.ext(this.browser,{siteLogo:t.config.staticUrl+"/logos/foresee/foresee.svg"},{defs:config.surveydefs}),n=o(this.template,e);document.body.innerHTML=n;var i=document.getElementById("acsSetValues");i&&r.Bind(i,"click",t.proxy(function(e){r.preventDefault(e),this.stg.reset(t.proxy(function(){this._applyValues()},this),null,!0)},this));var s=document.getElementById("acsClearValues");s&&r.Bind(s,"click",t.proxy(function(e){r.preventDefault(e),this.stg.reset(function(){this.writeMessage("State cleared.")}.bind(this),function(){this.writeMessage("Failed to clear state.")}.bind(this));for(var t=document.querySelectorAll(".acsSPOverride, .acsLFOverride"),n=0;n<t.length;n++)t[n].value="";document.getElementById("acsOverridePooling").checked=!1},this));var l=document.getElementById("acsReturnToSite");l&&r.Bind(l,"click",t.proxy(function(e){r.preventDefault(e);var t=window.location.href+"";window.location=t.substr(0,t.indexOf("#"))},this));var a=this.stg.get("ovr");if(a){a=JSON.parse(a),document.getElementById("acsOverridePooling").checked=a.pooloverride;for(var c in a.sp)try{document.getElementById("_spovr_"+c).value=a.sp[c].reg}catch(e){}for(var u in a.lf)try{document.getElementById("_lfovr_"+u).value=a.lf[u]}catch(e){}}},t.domReady(function(){var e=new r.Browser;e.ready.subscribe(function(){var r=new i(e);r.loadResources(t.proxy(function(){r.render()},this))},!0,!0)})});