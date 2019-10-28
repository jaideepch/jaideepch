/***************************************
* @preserve
* ForeSee Web SDK: mouseoff
* Built April 27, 19 21:41:45
* Code version: 19.6.8
* Template version: 19.6.8
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js")],function(e,t,s){var o=function(e,s,o,i,n){t.ext(this,{browser:o,gstg:i,journey:n,trigger:e,surveydef:s,mode:t.toLowerCase(s.mouseoff.mode)},!1),t.supportsDomStorage?"lasttab"!=this.mode||!o.isIE&&"Edge"!=o.browser.name||(this.mode="multitab"):this.mode="off"};return o.prototype.initialize=function(){var e,t,o,i,n,a=0,u=0,f=s.now(),r=f,m=function(s,o,a,u){return t=window.pageYOffset,e=window.pageXOffset,pagewidth=window.innerWidth,i=(u-o)/(a-s),n=(t-(u-i*a))/i-e,isNaN(n)&&(n=a),u<o&&n>=0&&n<=pagewidth};this.mousemoveHandler=function(e){(f=s.now())-r>100&&(o=Math.sqrt(Math.pow(e.pageX-a,2)+Math.pow(e.pageY-u,2))/(f-r),a=e.pageX,u=e.pageY,r=f)}.bind(this),this.mouseleaveHandler=function(e){document.hasFocus()&&m(a,u,e.pageX,e.pageY)&&(this.dispose(),this.gstg._sync(function(){this.gstg.get("i")||(this.trigger.cpps.set("mouseoff",!0),this.journey.addEventsDefault("properties",{fs_inviteType:["mouseoff"]}),this.journey.addEventObj({name:"fs_mouseoff",metrics:{fs_mouseoff_speed:o,fs_mouseoff_slope:Math.max(i,-9999),fs_mouseoff_pagewidth:pagewidth,fs_mouseoff_xintercept:n,fs_mouseoff_xpercentage:n/pagewidth,fs_mouseoff_pagenumber:this.gstg.get("pv")}}),this.successCb())}.bind(this)))}.bind(this)},o.prototype.startListening=function(e,t){var o,i=this.surveydef.mouseoff.minPageTime||0,n=this.surveydef.mouseoff.minSiteTime||0,a=this.gstg.get("sst")+n-s.now(),u=Math.max(i,a);if(this.storagePrefix="lthb_",this.startCb=e||function(){},this.successCb=t||function(){},"multitab"===this.mode)o=this.startListeningMultiTab;else{if("lasttab"!==this.mode)return;this.setupStorageKeys(),o=this.startListeningLastTab}this.timeout=setTimeout(o.bind(this),u)},o.prototype.startListeningMultiTab=function(){this.startCb(),s.Bind(document.documentElement,"mouseoff:mousemove",this.mousemoveHandler,!0),s.Bind(document.documentElement,"mouseoff:mouseleave",this.mouseleaveHandler,!0),this.setupInviteStatusWatching()},o.prototype.setupStorageKeys=function(){var e="safari"===this.br?"onbeforeunload":"unload",t=this.tabKey=sessionStorage.getItem("fsrMouseOff"),o=this.storagePrefix;t&&!function(e){for(var t in localStorage)if(t===o+e)return!0;return!1}(t)||(t=Math.round(1e6*Math.random()),sessionStorage.setItem("fsrMouseOff",t)),localStorage.setItem(o+t,1),s.Bind(window,"mouseoff:"+e,function(){localStorage.removeItem(o+t)})},o.prototype.startListeningLastTab=function(){var e,t,o,i=this.storagePrefix,n=function(){e=0,t=[];for(var s in localStorage)0===s.indexOf(i)&&(++e,t.push(s));return 1===e},a=function(e){e&&0!==e.key.indexOf(i)||(o=n(),this.gstg.get("i")?this.dispose():o&&!this.listening?(this.startCb(),s.Bind(document.documentElement,"mouseoff:mousemove",this.mousemoveHandler,!0),s.Bind(document.documentElement,"mouseoff:mouseleave",this.mouseleaveHandler,!0),this.listening=!0):o||(s.Unbind(document.documentElement,"mouseoff:mousemove",this.mousemoveHandler),s.Unbind(document.documentElement,"mouseoff:mouseleave",this.mouseleaveHandler),this.listening=!1))}.bind(this);this.setupInviteStatusWatching(),a(),s.Bind(window,"mouseoff:storage",a)},o.prototype.setupInviteStatusWatching=function(){this.gstg.setUpdateInterval(1e4),this.gstg.watchForChanges(["i"],function(e,t,s){this.gstg.setUpdateInterval(6e4),this.dispose()}.bind(this),!0,!0)},o.prototype.dispose=function(){s.Unbind("mouseoff:*"),clearTimeout(this.timeout),localStorage.removeItem(this.storagePrefix+this.tabKey)},o});