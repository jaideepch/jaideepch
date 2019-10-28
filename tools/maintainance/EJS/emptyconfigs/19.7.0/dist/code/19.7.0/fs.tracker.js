/***************************************
* @preserve
* ForeSee Web SDK: Tracker Window
* Built April 27, 19 21:36:34
* Code version: 19.7.0
* Template version: 19.7.0
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("fs.utils.js")],function(e,fs,utils){fs.config.brainUrl=fs.getParam("brain_url")||fs.config.brainUrl;var r="fs_trackerShown",a="fs_trackerClicked",t="fs_qualifierAccepted",i="fs_qualifierDeclined",s="fs_qualifierShown",n="fs_reminderShown",o="fs_reminderAccepted",c=function(e,t){var i;return i=new window.Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"),t?i(t):i},l=function(e,t,i,r,s,n){this.br=e,this.data=i,this.qual=r,this.cpps=t,this.templatehtml=s,this.displayOpts=n,this.userLocale=this.data.cfg.active_surveydef.language.locale||"en",this.qualified=new utils.FSEvent,this.disqualified=new utils.FSEvent,this.validationFailed=new utils.FSEvent,this.qualifiesValue=null,"en"!==this.userLocale&&fs.isDefined(this.data.cfg.active_surveydef.qualifier.survey.locales[this.userLocale])&&(this.qual.survey=fs.ext({},this.data.cfg.active_surveydef.qualifier.survey.locales[this.userLocale]));for(var a,o=this.qual.survey.questions.length,c=0;c<o;c++){a=this.qual.survey.questions[c];for(var l=0;l<a.choices.length;l++)fs.ext(a.choices[l],{id:"q"+c+"c"+l,value:"q"+c+"c"+l,name:"q"+c,type:fs.toLowerCase(a.questionType)})}this.disqualified.subscribe(function(){this.showNoThanks()}.bind(this)),this.validationFailed.subscribe(function(e){alert(e)}.bind(this))};l.prototype.render=function(){var e=fs.ext({},this.displayOpts,{qual:this.qual});document.documentElement.setAttribute("id","fsrQualifier"),document.body.innerHTML=c(this.templatehtml,e),utils.Bind(document.getElementById("qualifierForm"),"qualifier:submit",function(e){utils.preventDefault(e),this.validateAndSubmit()}.bind(this)),utils.Bind(document.getElementById("qualCancelButton"),"qualifier:click",function(e){utils.preventDefault(e),this.disqualified.fire()}.bind(this)),utils.Bind(document.getElementById("qualCloseButton"),"qualifier:click",function(e){utils.preventDefault(e),window.close()}.bind(this))},l.prototype.validateAndSubmit=function(){for(var e=document.querySelectorAll(".activeQuestion"),t=[],i=!1,r=0;r<e.length;r++){var s=parseInt(e[r].getAttribute("questionNum")),n=this.qual.survey.questions[s];if("RADIO"==n.questionType){for(var a=document.getElementsByName("q"+s),o=!1,c=0;c<a.length;c++)if(a[c].checked){o=!0,t.push(n.choices[c]);break}if(!o){i=!0;break}}}if(i)this.validationFailed.fire(this.qual.survey.validationFailedMsg);else{for(var l=!1,d=0;d<t.length;d++){var u=t[d];if(this.qualifiesValue=u.qualifies||null,u.cpps&&0<u.cpps.length)for(var h=0;h<u.cpps.length;h++)for(var f in u.cpps[h])this.cpps.set(f,u.cpps[h][f]);if(!1===u.qualifies){l=!0;break}}!0===l?this.disqualified.fire():this.qualified.fire()}},l.prototype.showNoThanks=function(){utils.addClass(document.getElementById("fsrQualifierMain"),"acsNoDisplay"),utils.removeClass(document.getElementById("fsrQualifierNoThanks"),"acsNoDisplay")};var d=function(e,t,i,r,s,n){this.br=e,this.data=i,this.rmdr=r,this.lng=i.cfg.active_surveydef.language.locale,this.cpps=t,this.templatehtml=s,this.displayOpts=n,this.accepted=new utils.FSEvent};d.prototype.render=function(){var e,t,i;document.documentElement.setAttribute("id","fsrReminder"),t=fs.ext({},this.rmdr),"en"!==this.lng&&fs.isDefined(this.rmdr.display.locales[this.lng])&&(t.display=this.rmdr.display.locales[this.lng]),e=fs.ext({},this.displayOpts,{rmdr:t}),document.body.innerHTML=c(this.templatehtml,e);var r=document.getElementById("reminderForm");r?i="submit":(i="click",r=document.querySelector(".fsrBeginSurvey")),utils.Bind(r,"reminder:"+i,function(e){utils.preventDefault(e),this.accepted.fire()}.bind(this))};var u=function(e,t,i,r){this.cfg=e,this.globalConfig=e.globalConfig||fs.config,this.cpps=t,this.def=i,this.locale=t.get("locale")||"en",this.qual=r};u.prototype.decideModernSurvey=function(){var e=this.cfg.config.abSurveyType,t=e&&e.shouldTest&&this.globalConfig.modernSurveyUrl&&function(e,t){var i,r,s,n=t.name||"";for(n+="-"+(t.section||""),n+="-"+(t.site||""),i=0;i<e.defs.length;i++)if(r=(s=e.defs[i]).name||"",r+="-"+(s.section||""),(r+="-"+(s.site||""))===n)return s;return null}(e,this.def);return this.cfg.config.onlyModernSurvey?{modernChosen:!0,modernPercentage:100}:t?{modernChosen:t.modernPercentage>=Math.floor(100*Math.random()),modernPercentage:t.modernPercentage}:{modernChosen:!1,modernPercentage:0}},u.prototype.getUrl=function(){var e,t=this.def,i=utils.now()+"_"+Math.round(1e13*Math.random()),r=t.name+"-"+(fs.isDefined(t.site)?t.site+"-":"")+(fs.isDefined(t.section)?this.def.section+"-":"")+this.locale,s=this.decideModernSurvey();this.qual&&(r+="-"+this.qual.qualifiesValue);var n={sid:r,cid:this.cfg.config.id,pattern:this.cpps.get(t.pattern)||t.pattern,a:i,b:utils.hash(i),c:864e5,mp:s.modernPercentage};for(var a in e=s.modernChosen?this.globalConfig.modernSurveyUrl:this.globalConfig.surveyUrl,e+="?",n)e+=fs.enc(a)+"="+fs.enc(n[a])+"&";return e+=this.cpps.toQueryString()};var h=function(e){this.gs=e};h.prototype={_extras:{},set:function(e,t){this.all()[e]=t,this._extras[e]=t},get:function(e){return this.all()[e]},all:function(){return fs.ext({},this.gs.get("cp")||{},this._extras)},toQueryString:function(){var e=[],t=this.all();for(var i in t)e.push("cpp["+fs.enc(i)+"]="+fs.enc(t[i]));return e.join("&")},erase:function(e){var t=this.all();delete t[e],this.gs.set("cp",t)},append:function(e,t,i){var r=this.gs.get("cp")||{};if(r[e]=(r[e]||"")+","+t,i){var s=r[e].split(","),n=s.length-1,a=s.length>i?s.length-i:0;r[e]=s.splice(a,n-a+1).join()}this.gs.set("cp",r)}};"undefined"!=typeof config&&config.config.surveyAsyncCurl;if(!window.btoa){var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",g=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);window.btoa=function(e){var t,i,r,s,n,a;for(r=e.length,i=0,t="";i<r;){if(s=255&e.charCodeAt(i++),i==r){t+=f.charAt(s>>2),t+=f.charAt((3&s)<<4),t+="==";break}if(n=e.charCodeAt(i++),i==r){t+=f.charAt(s>>2),t+=f.charAt((3&s)<<4|(240&n)>>4),t+=f.charAt((15&n)<<2),t+="=";break}a=e.charCodeAt(i++),t+=f.charAt(s>>2),t+=f.charAt((3&s)<<4|(240&n)>>4),t+=f.charAt((15&n)<<2|(192&a)>>6),t+=f.charAt(63&a)}return t},window.atob=function(e){var t,i,r,s,n,a,o;for(a=e.length,n=0,o="";n<a;){for(;t=g[255&e.charCodeAt(n++)],n<a&&-1==t;);if(-1==t)break;for(;i=g[255&e.charCodeAt(n++)],n<a&&-1==i;);if(-1==i)break;o+=String.fromCharCode(t<<2|(48&i)>>4);do{if(61==(r=255&e.charCodeAt(n++)))return o;r=g[r]}while(n<a&&-1==r);if(-1==r)break;o+=String.fromCharCode((15&i)<<4|(60&r)>>2);do{if(61==(s=255&e.charCodeAt(n++)))return o;s=g[s]}while(n<a&&-1==s);if(-1==s)break;o+=String.fromCharCode((3&r)<<6|s)}return o}}var p=function(e,t,i){var r=i.cfg.config;this.br=e,this.stg=t,this.data=i,this._stage=1,this.jrny=new utils.Journey(r.id||utils.getRootDomain()||"tracker_customerId",utils.APPID.TRIGGER,t.get("rid"),e,50);var s=this.data.cfg.active_surveydef;this.jrny.addEventsDefault("properties",{fs_site:[utils.getRootDomain()],fs_repeatDaysAccept:[r.repeatDays.accept],fs_repeatDaysDecline:[r.repeatDays.decline],fs_reinviteDelayAfterInviteAbandon:[r.reinviteDelayAfterInviteAbandon],fs_defName:[s.name],fs_section:[s.section],fs_displayName:[this.data.display.displayname],fs_displayTemplate:[this.data.display.template],fs_language:[s.locale],fs_samplePercentage:[s.criteria.sp.reg],fs_loyaltyFactor:[s.criteria.lf]}),this.cpps=new h(this.stg),fs.ext(this.cpps._extras,i.cpps),this._loadResources(function(){document.documentElement.style.backgroundImage="none",this.ready.fire(),t.onCommit.subscribe(function(){t.get("page_hb")||(t.onCommit.unsubscribeAll(),this.launchSurveyOrQualifier(),this.data.display.removeSurveyAlerts||setTimeout(function(){var e=fs.toLowerCase(navigator.userAgent);-1==e.indexOf("msie")&&-1==e.indexOf("edge")&&-1==e.indexOf("firefox")&&this.data.display.dialog&&alert(this.data.display.dialog.surveyavailable)}.bind(this),200))}.bind(this))}.bind(this)),this.ready=new utils.FSEvent};function m(){window.close()}function v(e){0<e._serverFails&&window.close()}p.prototype.update=function(e,t,i){this.br=e,this.stg=t,this.data=i},p.prototype.setCPPS=function(e){if(e)for(var t in this.jrny.addEventsDefault("properties",{fs_pvInvited:[e.pv]}),e)this.cpps.set(t,e[t])},p.prototype._loadResources=function(e){if(this.data&&this.data.template&&"string"==typeof this.data.template){var i=this.data.template,t=-1<i.indexOf("@"),r=fs.makeURI("templates/trigger/"+i+"/main.css"),s=fs.makeURI("templates/trigger/"+i+"/tracker.html"),n=fs.makeURI("templates/trigger/"+i+"/qualifier.html"),a=fs.makeURI("templates/trigger/"+i+"/reminder.html"),o=fs.getParam("gw");t&&(i=i.substr(1),a=fs.isSelfHosted?(r=fs.makeAssetURI("trigger/templates/"+i+"/main.css"),s=fs.makeAssetURI("trigger/templates/"+i+"/tracker.html"),n=fs.makeAssetURI("trigger/templates/"+i+"/qualifier.html"),fs.makeAssetURI("trigger/templates/"+i+"/reminder.html")):(r=o.replace(/__gwtest__/g,"templates/"+i+"/main.css"),s=o.replace(/__gwtest__/g,"templates/"+i+"/tracker.html"),n=o.replace(/__gwtest__/g,"templates/"+i+"/qualifier.html"),o.replace(/__gwtest__/g,"templates/"+i+"/reminder.html"))),this.queue=new utils.Async(!0,function(){e&&e()}.bind(this),function(){}.bind(this)),this.queue.enqueue(function(t){utils.loadCSS(r,function(e){this._cssLink=e,t&&t.resolve()}.bind(this),null,this.br)}.bind(this)),this.queue.enqueue(function(t){new utils.JSONP({success:function(e){this.templatehtml=e,t&&t.resolve()}.bind(this)}).get(s,"templates_trigger_"+i+"_")}.bind(this)),this.queue.enqueue(function(t){new utils.JSONP({success:function(e){this.qualhtml=e,t&&t.resolve()}.bind(this)}).get(n,"templates_trigger_"+i+"_")}.bind(this)),this.queue.enqueue(function(t){new utils.JSONP({success:function(e){this.rmdrhtml=e,t&&t.resolve()}.bind(this)}).get(a,"templates_trigger_"+i+"_")}.bind(this))}},p.prototype.renderTemplate=function(){var e=this.data.cfg.active_surveydef.language.locale||"en";this.data.display.inviteType=this.data.display.inviteType.toUpperCase();var t=fs.ext({copyrightDate:(new Date).getFullYear().toString(),supportsSVG:document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")},this.data.display,this.data.cfg.config),i=fs.getParam("gw");t.trackerLogo&&t.trackerLogo.length&&(fs.isDefined(fs.assetLocation)&&"undefined"!=fs.assetLocation?t.trackerLogo=fs.makeAssetURI("trigger/"+t.trackerLogo):t.trackerLogo=i.replace(/__gwtest__/g,t.trackerLogo)),t.trackerBanner&&t.trackerBanner.length&&(fs.isDefined(fs.assetLocation)&&"undefined"!=fs.assetLocation?t.trackerBanner=fs.makeAssetURI("trigger/"+t.trackerBanner):t.trackerBanner=i.replace(/__gwtest__/g,t.trackerBanner)),t.vendorLogo&&t.vendorLogo.length&&(t.vendorLogo=fs.makeAssetURI(t.vendorLogo)),t.vendorLogoPNG&&t.vendorLogoPNG.length&&(t.vendorLogoPNG=fs.makeAssetURI(t.vendorLogoPNG)),t.trusteLogo&&t.trusteLogo.length&&(t.trusteLogo=fs.makeAssetURI(t.trusteLogo)),t.loadImg=fs.makeURI("loadimg.gif"),this._displayOpts=t,document.title=t.dialog.trackerTitle,document.body.innerHTML=c(this.templatehtml,t),document.documentElement.setAttribute("lang",e),this._doSizing(),this._cvTimeout?2==this._stage&&this._convertTracker():this._cvTimeout=setTimeout(function(){this._stage=2,this._convertTracker()}.bind(this),this.data.cfg.config.trackerConvertsAfter),utils.Bind(window,"tracker:resize",function(){this._doSizing()}.bind(this)),this.jrny.addEventString(r)},p.prototype._doSizing=function(){var e=document.querySelectorAll("*[acsfill=true]"),t=utils.getSize(window);if(e)for(var i=0;i<e.length;i++){var r=e[i],s=r.offsetLeft,n=r.offsetTop;r.style.height=t.h-n-1*s+"px"}var a=document.querySelectorAll("*[acscentervertically=true]");if(a)for(var o=0;o<a.length;o++){var c=a[o],l=c.offsetHeight,d=c.parentNode.offsetHeight;c.style.marginTop=(d-l)/2+"px"}},p.prototype._convertTracker=function(){var e,t=document.querySelectorAll(".initialContent");for(e=0;e<t.length;e++)utils.addClass(t[e],"acsNoDisplay fsrNoDisplay");var i=document.querySelectorAll(".showLater");for(e=0;e<i.length;e++)utils.addClass(i[e],"acsDisplay fsrDisplay");this._doSizing(),utils.addClass(document.body,"acsActiveTracker");var r=document.querySelectorAll("*[acsactivatebutton=true], .fsrBeginSurvey"),s=function(){this.jrny.addEventString(a),this.launchSurveyOrQualifier()}.bind(this),n=function(e){13===(window.event?e.which:e.keyCode)&&s()};for(e=0;e<r.length;e++)utils.Bind(r[e],"click",s),utils.Bind(r[e],"keydown",n)},p.prototype.launchSurveyOrQualifier=function(){this._cvTimeout&&(clearTimeout(this._cvTimeout),this._cvTimeout=null);for(var e=document.querySelectorAll("*[acsshowwhenloading=true]"),t=0;t<e.length;t++)utils.addClass(e[t],"acsDisplay");for(var i=document.querySelectorAll("*[acshidewhenloading=true]"),r=0;r<i.length;r++)utils.removeClass(i[r],"acsDisplay"),utils.addClass(i[r],"acsNoDisplay");var s=this.data.cfg.active_surveydef.qualifier,n=this.data.cfg.active_surveydef.reminder,a=!!document.querySelector("main.fsrTracker");s&&s.useQualifier?a?this.goToSurvey():this.goToQualifier():n&&n.useReminder?this.goToReminder():this.goToSurvey()},p.prototype.goToQualifier=function(){this.qualifier=new l(this.br,this.cpps,this.data,this.data.cfg.active_surveydef.qualifier,this.qualhtml,this._displayOpts),this.qualifier.qualified.subscribe(function(){this.jrny.addEventString(t),this.goToSurvey(this.qualifier)}.bind(this),!0,!1),this.qualifier.disqualified.subscribe(function(){this.jrny.addEventString(i)}.bind(this),!0,!1),this.qualifier.render(),this.jrny.addEventString(s)},p.prototype.goToReminder=function(){this.reminder=new d(this.br,this.cpps,this.data,this.data.cfg.active_surveydef.reminder,this.rmdrhtml,this._displayOpts),this.reminder.accepted.subscribe(function(){this.jrny.addEventString(o),this.goToSurvey()}.bind(this),!0,!1),this.reminder.render(),this.jrny.addEventString(n)},p.prototype.goToSurvey=function(e){var t=new u(this.data.cfg,this.cpps,this.data.cfg.active_surveydef,this.qualifier).getUrl();window.resizeBy(0,200),window.focus(),setTimeout(function(){this._doSizing(),window.location=t}.bind(this),100)},fs.winReady(function(){var o,c=setTimeout(function(){window.close()},13e3),l=new utils.Browser;l.ready.subscribe(function(){var a=utils.getBrainStorage(l,fs.getParam("uid")),e=window.setTimeout(m,3e4);a._readyState.subscribe(v,!1,!0),a.ready.subscribe(function(){a._readyState.unsubscribe(v),window.clearTimeout(e);var s=window.setInterval(function(){var e=a.get("trackerinfo");e?(delete a._data.keys.page_hb,a.set("tracker_hb",e.cfg.active_surveydef.index,2*trackerInfo.hb_i,!0)):a._sync()},1e3);function n(e,t,i){if(e&&t&&i){var r=new p(e,t,i);return r.ready.subscribe(function(){clearTimeout(c),r.renderTemplate()},!0,!0),clearInterval(s),s=window.setInterval(function(){delete a._data.keys.page_hb,a.set("tracker_hb",i.cfg.active_surveydef.index,2*i.hb_i,!0)},5e3),r}}o=n(l,a,a.get("trackerinfo")),a.watchForChanges(["trackerinfo","trackercmd","ckcpps"],function(e,t,i){if("trackercmd"==e)switch(i.method){case"close":window.close();break;case"survey":o&&o.goToSurvey&&o.goToSurvey()}else if("ckcpps"==e&&o)fs.ext(o.cpps._extras,i);else if("trackerinfo"==e)if(fs.isDefined(o)){var r=o.data.cfg.active_surveydef,s=i.cfg.active_surveydef;(r.name!==s.name||r.site!==s.site||r.section!==s.section||r.language&&r.language.locale!=s.language.locale)&&(o.update(l,a,i),o.renderTemplate())}else o=n(l,a,i)}.bind(this),!1,!0)}.bind(this),!0,!0)},!0,!0)})});