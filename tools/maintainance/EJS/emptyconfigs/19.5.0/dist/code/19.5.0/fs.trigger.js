/***************************************
* @preserve
* ForeSee Web SDK: Trigger
* Built April 27, 19 21:57:58
* Code version: 19.5.0
* Template version: 19.5.0
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"triggerconfig"],function(e,t,i,config){var r={loadedEmitter:new i.FSEvent,initializedEmitter:new i.FSEvent,inviteShownEmitter:new i.FSEvent,inviteAcceptedEmitter:new i.FSEvent,inviteDeclinedEmitter:new i.FSEvent,trackerShownEmitter:new i.FSEvent,customInvitationRequested:new i.FSEvent,CPPS:null,_triggerResetLock:null,state:{didInvite:!1}},s={INVITE_SHOWN:"fs_inviteShown",INVITE_ACCEPTED:"fs_inviteAccepted",INVITE_DECLINED:"fs_inviteDeclined",INVITE_ABANDONED:"fs_inviteAbandoned",LINKS_CANCEL:"fs_linksCancel",TRACKER_SHOWN:"fs_trackerShown",TRACKER_CLICKED:"fs_trackerClicked",QUALIFIER_ACCEPTED:"fs_qualifierAccepted",QUALIFIER_DECLINED:"fs_qualifierDeclined",QUALIFIER_SHOWN:"fs_qualifierShown",REMINDER_SHOWN:"fs_reminderShown",REMINDER_ACCEPTED:"fs_reminderAccepted",SURVEY_SHOWN:"fs_surveyShown"};if(config&&config.surveydefs)for(var n=0;n<config.surveydefs.length;n++)t.isString(config.surveydefs[n])&&(config.surveydefs[n]=i.compile(i.b64DecodeUnicode(config.surveydefs[n])));var o=window,a=new i.Cookie({path:"/",secure:!1,encode:!0}),c=i.Compress;if(t.fsCmd("fstest"))return void e([t.makeURI("$fs.svadmin.js")],function(e){});if(t.fsCmd("fsoptout"))return void e([t.makeURI("$fs.optout.js")],function(e){});var f=function(e,i,r,s,n){var a={width:700,height:350,left:50,top:50,resizable:"no",scrollbar:"1",scrollbars:"1",toolbar:"no",menubar:"no",location:"0",directories:"no",status:"no"},c=t.ext(a,r),f="";for(var u in c)f+=u+"="+c[u]+",";var l=this._win=o.open(e,i,f);if(l&&n)if(l.blur(),l.opener.window.focus(),window.self.window.focus(),o.focus(),"Firefox"==s.browser.name){var d=o.open("about:blank");d.focus(),d.close()}else s.isIE&&setTimeout(function(){l.blur(),l.opener.window.focus(),o.self.window.focus(),o.focus()},1e3);return l},u=function(){var e=this;this.isOver=!0,i.Bind(document,"trigger:mouseout",function(t){t=t||o.event;var i=t.relatedTarget||t.toElement;i&&"HTML"!=i.nodeName||e.isOver&&(e.isOver=!1)},!1),i.Bind(document,"trigger:mouseover",function(t){e.isOver||(e.isOver=!0)},!1),i.Bind(document,"trigger:mousemove",function(t){e.isOver||(e.isOver=!0)})},l=config.config.surveyAsyncCurl,d={SERVICE_TYPES:{mobileOnExitInitialize:{host:l,path:"/e",url:"/initialize"},mobileOnExitHeartbeat:{host:l,path:"/e",url:"/recordHeartbeat"}}};d.ping=function(e,t,r,s){var n=new i.ImageTransport,o="https://"+e.host+e.path+(e.url||"");n.send({url:o,success:r||function(){},failure:s||function(){},data:t})};var p=function(s,n,o,a,c,f,u){if(this.trig=s,this.browser=n,this.stg=o,this.cpps=a,this.displayoverride=c,this.jrny=f,r.state.didInvite=!0,t.isDefined(this.trig.surveydef.inviteExclude)&&t.isDefined(this.trig.crit)&&this.trig.crit.runAllTests(this.trig.surveydef.inviteExclude,this.browser,!1,!0))return!1;var l=this;i.Healthy(this.browser,["survey"],t.proxy(function(){fsReady(function(){s.invite&&s.invite.dispose(),e([t.makeURI("$fs.invite.js")],function(e){var t=l.invite=s.invite=new e(config,s.surveydef,n,o.fstg,c,a,r);o.set("dn",t.display.displayname),a.set("dn",t.display.displayname),u&&u.call(l)})})},this),t.proxy(function(){},this))},h=function(e,t,i){var r=new k(i,config,e.surveydef,e.cpps,e.stg.get("rid"),e.locale);e.stg.get("mhbi")?r.beginHeartbeat():r.init(t,function(){r.beginHeartbeat()})};p.prototype.initialize=function(){var e=this.trig,n=this.browser,o=this.stg,a=this.cpps,c=(this.displayoverride,this.invite),f=this.jrny;f.addEventsDefault("properties",{fs_defName:[e.surveydef.name],fs_section:[e.surveydef.section],fs_displayName:[c.display.displayname],fs_pvInvited:[e.pageViewCount],fs_language:[c.locale],fs_samplePercentage:[e.surveydef.criteria.sp.reg],fs_loyaltyFactor:[e.surveydef.criteria.lf]}),i.Healthy(n,["survey","static"],t.proxy(function(){c.loadResources(function(){setTimeout(function(){c.present(),"p"!==o.get("i")&&f.addEvent(s.INVITE_SHOWN),o.set("i","p"),r.state.inviteSituation="PRESENTED",r.inviteShownEmitter.fire(e.surveydef,o,config,a)},Math.max(0,config.config.inviteDelay-(i.now()-t.startTS)))}),c.declined.subscribe(function(i){var n=t.isDefined(config.active_surveydef)&&t.isDefined(config.active_surveydef.repeatDays)?config.active_surveydef.repeatDays:config.config.repeatDays;o.setMaxKeyExpiration(24*n.decline*60*60*1e3),f.addEventObj({name:s.INVITE_DECLINED,properties:{action:[i]}}),r.inviteDeclinedEmitter.fire(e.surveydef,o,config,a),e.surveydef.cxRecord&&r.rec&&"y"!=o.get("fbr")&&(r.rec.cancelRecord(),e.recordController=r.rec=null),o.set("i","d"),r.state.inviteSituation="DECLINED"}),c.abandoned.subscribe(function(){f.addEventString(s.INVITE_ABANDONED),o.set("i","a"),r.state.inviteSituation="ABANDONED",o.set("rw",i.now()+config.config.reinviteDelayAfterInviteAbandon)}),c.accepted.subscribe(function(n,u){var l=t.isDefined(config.active_surveydef)&&t.isDefined(config.active_surveydef.repeatDays)?config.active_surveydef.repeatDays:config.config.repeatDays;switch(o.setMaxKeyExpiration(24*l.accept*60*60*1e3),r.inviteAcceptedEmitter.fire(e.surveydef,o,config,a),e.surveydef.cxRecord&&r.rec&&r.rec.recorder&&r.rec.beginTransmitting(),f.addEventString(s.INVITE_ACCEPTED),o.set("i","x"),r.state.inviteSituation="ACCEPTED",o.set("ixw",i.now()),n){case"TRACKER":e.popTracker(c);break;case"INSESSION":e.popSurvey();break;case"SMS":case"EMAIL":case"SMSEMAIL":h(e,u,n),e.stg.set("mhbi",{ui:u,it:n})}})},this),t.proxy(function(){},this))};var g=function(config,e,t){this.cfg=config,this.cpps=e,this.def=t,this.locale=e.get("locale")||"en"};g.prototype.getUrl=function(){var e=t.enc,r=this.def,s=t.config.surveyUrl+"?",n=i.now()+"_"+Math.round(1e13*Math.random()),o=r.name+"-"+(t.isDefined(r.site)?r.site+"-":"")+(t.isDefined(r.section)?this.def.section+"-":"")+this.locale,a={sid:e(o),cid:e(this.cfg.config.id),pattern:e(this.cpps.get(r.pattern)),a:n,b:i.hash(n),c:864e5};for(var c in a)s+=t.enc(c)+"="+t.enc(a[c])+"&";return s+=this.cpps.toQueryString()};var v=function(e,s,n,a,c,f,l){r.tracker&&(r.tracker.dispose(),r.tracker=null),r.tracker=this,t.ext(this,{template:e,def:s,cfg:n,disp:f,_fcBindings:[]}),this.mtrk=new u,this.cpps=c,this.br=l,this.stg=a,this.forceLong=!1,e&&r.trackerShownEmitter.fire(s,a,n,c);var d=t.proxy(function(e){this.stg.set("page_hb",i.now(),this.forceLong?n.config.trackerHeartbeatLongTimeout:n.config.trackerHeartbeatTimeout,!e,i.persistDataType.TRACKER)},this);this._heartbeat=setInterval(d,Math.round(n.config.trackerHeartbeatTimeout/3)),d(!0),i.Bind(o,"unload",t.proxy(function(){this.forceLong=!0,this.stg.set("page_hb",i.now(),n.config.trackerHeartbeatLongTimeout,!0,i.persistDataType.TRACKER)},this));var p=t.enc;this._url=t.makeURI("$fs.tracker.html?uid="+p(a.uid||"")+"&sitekey="+p(i.siteKey)+"&domain="+p(i.getRootDomain())+"&stg="+p(this.stg.pers)+"&gw="+p(t.makeURI("trigger/__gwtest__"))+"&brain_url="+p(t.config.brainUrl)+"&fsrlocale="+p(c.get("locale")||"en")+"&_svu_="+p(t.config.surveyUrl)+"&_cv_="+p(t.config.codeVer)+"&_issh_="+p(t.isSelfHosted)+"&_vt_="+p(t.tagVersion)+"&_au_="+p(t.config.analyticsUrl)+"&_pa_="+p(t.assetLocation)),a.fr&&a.fr.isSSL&&(this._url=this._url.replace(/http:/gi,"https:").replace(/:\d{3,4}/,""),"//"==this._url.substr(0,2)?this._url="https:"+this._url:"http"!=this._url.substr(0,4)&&/^\//.test(this._url)&&(this._url="https://"+o.location.host+this._url),"localhost"===o.location.hostname&&(this._url=this._url.replace(/:8080/gi,":443"))),this.stg.pers==i.storageTypes.CK&&this.cpps.onSet.subscribe(t.proxy(function(e,t){var r={};r[e]=t,this.stg.set("ckcpps",r,2e5,!0,i.persistDataType.TRACKER)},this)),this._sendDefinition()};v.prototype._sendDefinition=function(){var e={method:"init",cfg:this.cfg,def:this.def};this.disp&&(e.display=this.disp),this.template&&(e.template=this.template),this.stg.set("page_hb",i.now(),this.cfg.config.trackerHeartbeatTimeout,!1,i.persistDataType.TRACKER),this.stg.set("hb_i",this.cfg.config.trackerHeartbeatTimeout,6e4,!1,i.persistDataType.TRACKER),this.stg.set("trackerinfo",e,6e4,!0,i.persistDataType.TRACKER),this.stg.pers==i.storageTypes.CK&&this.stg.set("ckcpps",this.cpps.all(),2e5,!0,i.persistDataType.TRACKER)},v.prototype.show=function(e){this.wref=f(this._url,"fsTracker",{width:700,height:450},e,!0)},v.prototype.applyExisting=function(e,t){this.wref=t,t.location=this._url},v.prototype.dispose=function(){for(var e=0;e<this._fcBindings.length;e++)this._fcBindings[e].unsubscribe();this.fstg=null};var y=function(e,config){this.stg=e,this.cfg=config};y.prototype.calcReplayPoolStatus=function(e){var r,s,n,a=this.cfg.config,c=a.replay_pools,f=o.location.toString();if(c&&0!==c.length&&!0!==this.pooloverride){if(s=this.stg.get("pl"),!t.isDefined(s))for(r=0;r<c.length;r++)i.testAgainstSearch(c[r].path,f)&&(s=100*Math.random()<c[r].sp?1:0,this.stg.set("pl",s,144e5));if(n=a.replay_repools,0===s&&n&&n.length>0)for(r=0;r<n.length;r++)i.testAgainstSearch(n[r].path,f)&&(s=100*Math.random()<n[r].sp?1:0,this.stg.set("pl",s,144e5));e(!!s)}else e(!0)},y.prototype.optoutCheck=function(e,i){this.stg.ready.subscribe(t.proxy(function(){!0===this.stg.get("optout")?i():e()},this),!0,!0)},y.prototype.browserCheck=function(e,t){return!(!e.isMobile&&t.config.browser_cutoff[e.browser.name]&&e.browser.actualVersion<t.config.browser_cutoff[e.browser.name])},y.prototype.featureCheck=function(e,t){return!(t.config.persistence==i.storageTypes.DS&&!e.supportsLocalStorage)},y.prototype.platformCheck=function(e,t){return!(t.config.platform_cutoff[e.os.name]&&e.os.version<t.config.platform_cutoff[e.os.name])},y.prototype.checkDeviceBlacklist=function(e,i){for(var r=0;r<i.config.device_blacklist.length;r++)if(t.toLowerCase(e.agent).indexOf(t.toLowerCase(i.config.device_blacklist[r]))>-1)return!1;return!0},y.prototype._match=function(e,t,i){var r=e.include,s=e[i||"globalExclude"];if(e.criteria){if(!e.criteria.supportsSmartPhones&&!t.isTablet&&t.isMobile)return!1;if(!e.criteria.supportsTablets&&t.isTablet)return!1;if(!e.criteria.supportsDesktop&&!t.isMobile)return!1}if(s){if(this.runAllTests(s,t,!1,!0))return!1}return!r||this.runAllTests(r,t,!1,!0)},y.prototype.runAllTests=function(e,r,s,n){var a,c=new i.Cookie({}),f=o.location.href.toString(),u=document.referrer.toString(),l={urls:f,referrers:u,userAgents:o.navigator.userAgent};for(var d in e){var p=e[d];if(p.length>0){if(a=!1,l[d])a=function(e,r){t.isArray(r)||(r=[r]);for(var s=0,n=r.length;s<n;s++)if("string"==typeof r[s]&&(r[s]=r[s].replace(/-_DS_-/gi,"$")),i.testAgainstSearch(r[s],e))return!0;return!1}(l[d],p);else if("browsers"==d)for(var h=r.browser.name,g=r.browser.actualVersion,v=0;v<p.length;v++)t.toLowerCase(h).indexOf(t.toLowerCase(p[v].name))>-1&&(p[v].comparison?"lt"==p[v].comparison&&g<p[v].version?a=!0:"eq"==p[v].comparison&&g==p[v].version?a=!0:"gt"==p[v].comparison&&g>p[v].version&&(a=!0):a=!0);else if("cookies"==d)for(var y=0;y<p.length;y++){var m=p[y],b=c.get(m.name);t.isDefined(m.value)&&b==m.value?a=!0:!t.isDefined(m.value)&&b&&(a=!0)}else if("variables"==d)for(var _=0;_<p.length;_++){var w,E=p[_],S=new[].constructor.constructor("var v1 = '';try { v1 = "+E.name+";}catch(err) {}return v1;"),I=S.call(o);I||(I="boolean"!=typeof I&&""),w=t.isDefined(E.value),w&&I===E.value?a=!0:w&&i.testAgainstSearch(E.value,I)?a=!0:!w&&I&&(a=!0)}if(!a&&s)return!0;if(a&&n)return!0}}return!1};var m=function(e){this.cfg=e};m.prototype._bindToLink=function(e,r){for(var s=document.querySelectorAll(e.selector),n=0;n<s.length;n++){var o,a=s[n],c=!0;if(e.attribute&&(o=a.getAttribute(e.attribute),c=!1,o&&(c=!0,e.patterns&&e.patterns.length>0))){c=!1;for(var f=0;f<e.patterns.length;f++)if(t.toLowerCase(o).indexOf(t.toLowerCase(e.patterns[f]))>-1){c=!0;break}}c&&i.Bind(a,"trigger:click",function(e,t,r){return function(s){t.preventDefault&&i.preventDefault(s),r.call(e,t)}}(this,e,r))}},m.prototype.performBindings=function(e){if(e&&this.cfg){var t,i=this.cfg;if(i.cancel&&i.cancel.length>0){var r=function(){e.cancelTracker(),e.jrny.addEventString(s.LINKS_CANCEL)};for(t=0;t<i.cancel.length;t++)this._bindToLink(i.cancel[t],r)}if(i.survey&&i.survey.length>0){var n=function(){e.popSurvey()};for(t=0;t<i.survey.length;t++)this._bindToLink(i.survey[t],n)}if(!e.browser.isMobile&&i.tracker&&i.tracker.length>0){var o=function(){e.popTracker()};for(t=0;t<i.tracker.length;t++)this._bindToLink(i.tracker[t],o)}}};var b,_=new i.FSEvent;t.API.expose("CPPS",{set:function(){_.subscribe(function(e){return function(){r.CPPS.set.apply(r.CPPS,e)}}(arguments),!0,!0)},get:function(e,t){t=t||function(){},_.subscribe(function(e){return function(){t(r.CPPS.get.apply(r.CPPS,e[0]))}}([arguments]),!0,!0)},all:function(e){e=e||function(){},_.subscribe(function(t){return function(){e(r.CPPS.all.apply(r.CPPS))}}(),!0,!0)}}),t.API.expose("clearState",function(){_.subscribe(function(){r.stg.reset(),r.rec&&r.rec.recorder&&r.rec.recorder.clearState()},!0,!0)}),t.API.expose("getState",function(e){_.subscribe(function(){e(r.state)},!0,!0)}),t.API.expose("getConfig",function(){return config}),t.API.expose("getConfigFormatted",function(){if(console&&console.info&&(console.info("************************** Trigger Configuration **************************"),console.info("Config: ",config.config),config.surveydefs&&config.surveydefs.length)){console.info("************************** Surveydefs Configuration **************************");for(var e=0;e<config.surveydefs.length;e++)console.info("************************** Surveydef "+(e+1)+" **************************"),console.info("Config: ",config.surveydefs[e])}}),t.API.expose("optOut",function(){var e=o.location.toString();o.location=e.indexOf("#")?e.substr(0,e.indexOf("#")-1)+"#fscommand=fsoptout":e+"#fscommand=fsoptout",o.location.reload()}),t.API.expose("test",function(){var e=o.location.toString();o.location=e.indexOf("#")?e.substr(0,e.indexOf("#")-1)+"#fscommand=fstest":e+"#fscommand=fstest",o.location.reload()});var w=function(){_.subscribe(function(){b&&(clearTimeout(b),b=null),b=setTimeout(function(){if(b=null,!r._triggerResetLock){r._triggerResetLock=!0;var e=r.trig;e&&(e.dispose(),r.trig=null),t.startTS=i.now(),t.nextTick(function(){C()})}},250)},!0,!0)};t.API.expose("run",w),t.API.expose("pageReset",w),t.API.expose("showInvite",function(e){_.subscribe(function(){var t=r.trig||I(r.stg,config,r.browser,r.crit,r.CPPS);if(t.init()&&t.surveydef){new p(t,r.browser,r.stg,r.CPPS,e,r.jrny,function(){this.initialize()})}},!0,!0)}),t.API.expose("onLoaded",r.loadedEmitter),t.API.expose("onInitialized",r.initializedEmitter),t.API.expose("onInviteShown",r.inviteShownEmitter),t.API.expose("onInviteAccepted",r.inviteAcceptedEmitter),t.API.expose("onInviteDeclined",r.inviteDeclinedEmitter),t.API.expose("onTrackerShown",r.trackerShownEmitter),t.API.expose("customInvitationRequested",r.customInvitationRequested),t.API.expose("Journey",{addEvent:function(){_.subscribe(function(e){return function(){r.jrny.addEvent.apply(r.jrny,e)}}(arguments),!0,!0)},addEventObj:function(){_.subscribe(function(e){return function(){r.jrny.addEventObj.apply(r.jrny,e)}}(arguments),!0,!0)},addEventString:function(){_.subscribe(function(e){return function(){r.jrny.addEventString.apply(r.jrny,e)}}(arguments),!0,!0)}}),t.API.expose("Storage",{get:function(e,t){t=t||function(){},_.subscribe(function(e){return function(){t(r.stg.get.apply(r.stg,e[0]))}}([arguments]),!0,!0)},all:function(e){e=e||function(){},_.subscribe(function(t){return function(){var t=r.stg.all();e(t)}}(),!0,!0)}}),t.API.expose("Cookie",{get:function(e,t){t=t||console.log||function(){},_.subscribe(function(e){return function(){try{t("_4c_"===e[0]?JSON.parse(c.decompress(decodeURIComponent(a.get(e[0])))):a.get(e[0]))}catch(t){console.error("trigger: couldn't read cookie",e[0])}}}(arguments),!0,!0)}});var E=function(e,i,s,n,o){t.ext(r,{CPPS:s,crit:i,stg:e,jrny:n,browser:o},!1),_.fire()},S=function(i,s,n,a,c,f){s&&a&&(t.isDefined(t.config.products.record)&&!1===t.config.products.record&&t.productConfig.record||e([t.makeURI("$fs.record.js")],function(e){n.set("rc","true"),r.RecordController=e,r.rec=e.getInstance(i,o,n,null,c),f&&(f.recordController=rec)}))},I=function(e,config,t,i,r,s){return new D(e,config,t,i,r,s)},D=function(e,r,s,n,o,a){this.stg=e,this.cfg=r,this.browser=s,this.crit=n,this.cpps=o,this.jrny=a;var c,f;if(!e.get("pv")){c={browser:s.browser.name+" "+s.browser.version,fp:s.fp,os:s.os.name,referrer:document.referrer.toString(),site:i.getRootDomain(),terms:this.decodeReferrer()||""};for(f in c)c.hasOwnProperty(f)&&o.set(f,c[f]);i.INT.GA.has()&&setTimeout(t.proxy(function(){i.INT.GA.uid(function(e){e&&o.set("GA_UID",e)})},this),2e3),i.INT.OM.has()&&setTimeout(t.proxy(function(){i.INT.OM.uid(function(e){e&&o.set("OMTR_VID",e)})},this),2e3);var u=i.INT.OM.beacon();u&&o.set("OMTR_BEACON",u)}this.heartbeatExpired=new i.FSEvent};D.prototype.doesPassCriteria=function(){var e=this.crit,t=this.cfg,i=r.state,s="DIDNOTPASSCRITERIA";if(e.platformCheck(this.browser,t))if(e.browserCheck(this.browser,t))if(e.checkDeviceBlacklist(this.browser,t)){if(e.featureCheck(this.browser,t))return!0;i.inviteStatus=s,i.reason="BROWSER"}else i.inviteStatus=s,i.reason="DEVICE";else i.inviteStatus=s,i.reason="BROWSER";else i.inviteStatus=s,i.reason="PLATFORM";return!1},D.prototype.popTracker=function(e){var t=this;if(this.stg.set("i","x"),r.state.inviteSituation="ACCEPTED",this.didPopTrackerAlready="y"==this.stg.get("dt"),r.state.didInvite=!0,!this.didPopTrackerAlready){this.stg.set("dt","y");if(e)!function(){t.tracker=new v(e.template,t.surveydef,config,t.stg,t.cpps,e.display,t.browser),t.tracker.show(t.browser)}();else{var i=f("about:blank","fsTracker",{width:700,height:400},this.browser,!0);new p(this,t.browser,t.stg,t.cpps,!1,t.jrny,function(){t.tracker=new v(this.invite.template,t.surveydef,config,t.stg,t.cpps,this.invite.display,t.browser),t.tracker.applyExisting(t.browser,i),t.surveydef.cxRecord&&r.rec&&r.rec.recorder&&r.rec.beginTransmitting()})}}},D.prototype.canDisplayInvitation=function(){return this.crit._match(this.cfg.config,this.browser,"inviteExclude")},D.prototype.popSurvey=function(){if(this.stg.set("i","x"),r.state.inviteSituation="ACCEPTED",this.didPopTrackerAlready="y"==this.stg.get("dt"),r.state.didInvite=!0,this.didPopTrackerAlready)this.stg&&this.stg.set("trackercmd",{method:"survey"},6e4,!0,i.persistDataType.TRACKER);else{this.stg.set("dt","y");var e=new g(config,this.cpps,this.surveydef),t=e.getUrl();f(t,"acsSurvey",{width:700,height:400},this.browser,!0);this.jrny.addEventString(s.SURVEY_SHOWN)}},D.prototype.init=function(){var e,i,r,s=this.cfg.surveydefs,n=this.stg.get("def");for(e=0;e<s.length;e++)r=s[e],i&&(r=t.ext(i,r),!s[e].site&&i.site&&delete r.site,!s[e].section&&i.section&&delete r.section,s[e]=r),i=t.ext({},r);if(t.isDefined(n)&&parseInt(n)>s.length-1&&(n=void 0),t.isDefined(n)&&"default"!=s[parseInt(n)].selectMode&&"pin"!=s[parseInt(n)].selectMode){if(t.isDefined(n)||"lock"==s[parseInt(n)].selectMode)return r=s[parseInt(n)],this.cfg.active_surveydef=r,this.surveydef=r,this._setupTrueConversionIfRequired(),this.locale=this._initLocale(),this.cpps.set("locale",this.locale),r.section&&this.cpps.set("section",r.section),r}else for(e=0;e<(t.isDefined(n)&&"default"!=s[parseInt(n)].selectMode?parseInt(n)+1:s.length);e++)if(r=s[e],t.isDefined(n)&&n==e&&"default"!=s[parseInt(n)].selectMode||this.crit._match(r,this.browser))return"x"===this.stg.get("i")&&this.stg.set("def",e,this.cfg.config.surveyDefResetTimeout||864e5),r.index=e,this.cfg.active_surveydef=r,this.surveydef=r,this._setupTrueConversionIfRequired(),this.locale=this._initLocale(),this.cpps.set("locale",this.locale),r.section&&this.cpps.set("section",r.section),this.inviteIndex=e,r;return!1},D.prototype._initLocale=function(){var e,r=this.surveydef,s=r.language;if(t.isDefined(s.src)&&t.isDefined(s.locales)){switch(s.src){case"variable":t.isDefined(s.name)&&(e=i.retrieveNestedVariable(window,s.name));break;case"cookie":if(t.isDefined(s.name)){e=new i.Cookie({}).get(s.name)}break;case"url":var n=s.locales;if(t.isDefined(n))for(var o=0,a=n.length;o<a;o++)if(t.isDefined(n[o].locale)&&t.isDefined(n[o].match)&&location.href.match(n[o].match))return this.locale=n[o].locale,n[o].criteria&&t.ext(this.surveydef.criteria,n[o].criteria),this.locale!==r.language.locale&&(r.language.locale=this.locale),n[o].locale}if(e)for(var c=0;c<s.locales.length;c++)if(s.locales[c].match==e)return s.locale=s.locales[c].locale,s.locales[c].criteria&&t.ext(this.surveydef.criteria,s.locales[c].criteria),s.locale}return s.locale||"en"},D.prototype.cancelTracker=function(){this.stg.set("trackercmd",{method:"close"},6e4,!0,i.persistDataType.TRACKER),this.stg.set("i","a"),r.state.inviteSituation="ABANDONED",t.isDefined(this.tracker)&&clearInterval(this.tracker._heartbeat)},D.prototype._setupTrueConversionIfRequired=function(){var i=(this.surveydef,this.cfg.config);i.trueconversion&&i.trueconversion.enabled&&e([t.makeURI("$fs.trueconversion.js")],t.proxy(function(e){this.trueconversion=new e(this)},this))},D.prototype.logState=function(){this.pageViewCount=(this.stg.get("pv")||0)+1,this.stg.set("pv",this.pageViewCount,config.config.pageViewsResetTimeout||864e5)},D.prototype.logDefState=function(){if(this.surveydef){var e=this.surveydef.name;e+=this.surveydef.section||"",e+=this.surveydef.site||"",this.defPageViewCount=(this.stg.get(e+"pv")||0)+1,this.stg.set(e+"pv",this.defPageViewCount,config.config.pageViewsResetTimeout||864e5)}},D.prototype.evalLoyaltySampling=function(){var e=this.surveydef,i=this.stg.get("pl"),r=t.isDefined(i)&&1!=i?e.criteria.sp.outreplaypool||0:e.criteria.sp.reg||0,s=100*Math.random();return this.defPageViewCount>=e.criteria.lf&&s<=r},D.prototype.decodeReferrer=function(){var e,t,i=document.referrer||"",r=null,s=["q","p","query"];for(t=0;t<s.length&&!(r=i.match(new RegExp("[?&]"+s[t]+"=([^&]*)")));t++);return r?(e=decodeURIComponent(r[1]),e&&(e=e.replace(/\+/g," ")),e):e},D.prototype.dispose=function(){this.disposed||(this.stg.save(!0),this.disposed=!0,this.trueconversion&&this.trueconversion.dispose(),this.invite&&this.invite.dispose(),r.rec&&(r.RecordController.disposeInstance(),r.RecordController=null,r.rec=null),i.Unbind("trigger:*"))};var k=function(e,i,r,s,n,o){this.itype=e,this.cfg=i,this.def=r,this.cpps=s,this.rid=n,this._measureName=this.def.name+"-"+(t.isDefined(this.def.site)?this.def.site+"-":"")+(t.isDefined(this.def.section)?this.def.section+"-":"")+(o||this.def.language.locale)};k.prototype.init=function(e,t){t=t||function(){};var r=i.now()+"_"+Math.round(1e13*Math.random());d.ping(d.SERVICE_TYPES.mobileOnExitInitialize,{a:r,notify:e,b:i.hash(r),c:864e5,cid:this.cfg.config.id,sid:this._measureName,rid:this.rid,uid:i.now(),support:"SMSEMAIL"==this.itype?"b":"EMAIL"==this.itype?"e":"s",cpps:"version="+encodeURIComponent(this.cfg.config.version)+"&"+this.cpps.toQueryString()},t,t)},k.prototype.beginHeartbeat=function(){this._timer&&(clearTimeout(this._timer),this._timer=null);var e=t.proxy(function(){d.ping(d.SERVICE_TYPES.mobileOnExitHeartbeat,{cid:this.cfg.config.id,sid:this._measureName,rid:this.rid,uid:i.now()},function(){},function(){})},this);this._timer=setInterval(e,config.config.onExitMobileHeartbeatInterval),e()},i.registerProduct("foresee",config);var T=window!=o.top;if(r.loadedEmitter.fire(),("dontRunOtherIframes"!==config.config.workInIframes&&config.config.workInIframes||!T)&&!(o.__fsrtracker||o.location.toString().indexOf("survey.foreseeresults.com")>-1)){var R={hash:o.location.hash,href:o.location.href,pathname:o.location.pathname},C=function(){if(r._triggerResetLock=!0,R.href.indexOf("fs.tracker.html")>-1)return void(r._triggerResetLock=!1);var e=new i.Browser;e.ready.subscribe(function(){var s,n=i.getGlobalStore(e),c=new y(n,config),f=new i.CPPS(n,config.config.cppsResetTimeout);f.addToBlacklist(config.config.disable_default_cpps||config.config.disable_cpps||[]),n.ready.subscribe(t.proxy(function(){n.upgradeOldStorage(function(){var u=r._journey=new i.Journey(config.config.id,i.APPID.TRIGGER,n.uid,e);u.addEventsDefault("properties",{fs_site:[i.getRootDomain()],fs_clientVersion:[t.config.codeVer],fs_repeatDaysAccept:[config.config.repeatDays.accept],fs_repeatDaysDecline:[config.config.repeatDays.decline],fs_reinviteDelayAfterInviteAbandon:[config.config.reinviteDelayAfterInviteAbandon]}),E(n,c,f,u,e);var l=n.get("i");setTimeout(t.proxy(function(){if(f.set("url",o.location.toString()),f.set("code",t.config.codeVer),config.config.cpps){var d,g,y=config.config.cpps;for(var b in y){var _=y[b];if(t.isObject(_))switch(_.source){case"param":var w=t.getParam(_.val)||_.init||null;if(t.isDefined(_.mode)&&"append"==_.mode){var E=_.delimiter||",",D=f.get(b),k=D?D.split(E):[];w=w||"",k[k.length-1]!==w&&(k.push(w),k.join(E),f.set(b,k))}else t.isDefined(w)&&null!==w?f.set(b,w):f.get(b)||f.set(b,"");break;case"variable":if(t.isDefined(_.name)){var R;d=_.exists,R=i.retrieveNestedVariable(o,_.name),t.isDefined(d)?f.get(b)!==d.success&&f.set(b,R?d.success:d.init):R?f.set(b,R):f.get(b)||f.set(b,_.init||"")}break;case"cookie":var C=a.get(_.val),A=t.isDefined(C);d=_.exists,t.isDefined(d)?f.get(b)!==d.success&&f.set(b,A?d.success:d.init):t.isDefined(C)&&null!==C?f.set(b,C):f.get(b)||f.set(b,_.init||"");break;case"url":for(var x=0,P=_.patterns.length;x<P;x++){var N=_.patterns[x].regex||_.patterns[x].match;g=_.patterns[x].value,t.isString(location.href)&&i.testAgainstSearch(N,location.href)?f.set(b,g):f.get(b)||f.set(b,_.init||"")}break;case"function":if(t.isFunction(_.value))try{g=_.value.call(o),f.set(b,g)}catch(e){}}else f.set(b,_)}}var L;if(n.get("ovr")&&(L=JSON.parse(n.get("ovr"))),L){for(var O=0;O<config.surveydefs.length;O++){var M=config.surveydefs[O].name;L.sp[M]&&(config.surveydefs[O].criteria.sp=L.sp[M]),L.lf[M]&&(config.surveydefs[O].criteria.lf=L.lf[M])}!0===L.pooloverride&&(c.pooloverride=!0)}if(r.state.codeVer=t.config.codeVer,r.state.siteKey=config.config.site_id,r.state.didInvite="xda".indexOf(l)>-1,r.state.inviteSituation={x:"ACCEPTED",d:"DECLINED",a:"ABANDONED",p:"PRESENTED"}[l],"a"==l){parseInt(n.get("rw"))<i.now()&&(n.erase("i"),n.erase("rw"),l=null)}if("runRecordOnly"===config.config.workInIframes&&T){for(var V=!1,j=0;j<config.surveydefs.length;j++){if(config.surveydefs[j].cxRecord){V=!0;break}}return S(e,V,n,!0,f),void(r._triggerResetLock=!1)}if("d"!=l&&"a"!=l)c.calcReplayPoolStatus(function(o){o&&(r.state.isinpool=o),c.optoutCheck(t.proxy(function(){if(c._match(config.config,e,"globalExclude")&&"y"!=n.get("gx"))if(null===n.selectCookieDomain(t.config.cookieDomain,window.location.toString()))r._triggerResetLock=!1;else{var a=r.trig=I(n,config,e,c,f,u);if(a.logState(),f.set("pv",a.pageViewCount,config.config.pageViewsResetTimeout||864e5),a.init())if(r.initializedEmitter.fire(),a.doesPassCriteria())if(a.surveydef){if(a.logDefState(),S(e,a.surveydef.cxRecord,n,o,f),"x"!=l)if(a.evalLoyaltySampling())if(a.canDisplayInvitation()){n.set("def",a.inviteIndex,a.cfg.config.surveyDefResetTimeout||864e5);new p(a,e,n,f,!1,u,function(){this.initialize()})}else r._triggerResetLock=!1;else r._triggerResetLock=!1;else{var d=a.stg.get("mhbi");d?h(a,d.ui,d.it):a.tracker=new v(null,a.surveydef,config,n,f,null,e),a.surveydef&&n.set("defupdate",{name:a.surveydef.name},2e4,!0,i.persistDataType.TRACKER),r._triggerResetLock=!1}a.surveydef.links&&(s=new m(a.surveydef.links),s.performBindings(a))}else r._triggerResetLock=!1;else r._triggerResetLock=!1;else r._triggerResetLock=!1}else n.set("gx","y"),r._triggerResetLock=!1},this),function(){r._triggerResetLock=!1})});else{if("a"==l){var U="true"==n.get("rc")||!0===n.get("rc");S(e,U,n,U,f)}r._triggerResetLock=!1}},this),Math.max(0,config.config.triggerDelay-(i.now()-t.startTS)))})},this),!0,!0)},!0,!0)};t.domReady(C);var A;config.config.ignoreNavigationEvents||i.pageNavEvent.subscribe(function(){var e=o,t=e.location,i=e[config.config.publicApiName||"FSR"],r=function(e){var t=e.split("#");return t.length>2?t[0]+t[1]:e.replace(/#/gi,"")},s=r(R.hash),n=r(t.hash);(i&&s!=n||R.pathname!=t.pathname)&&fsReady(function(){clearTimeout(A),A=setTimeout(function(){R={hash:o.location.hash,href:o.location.href,pathname:o.location.pathname},i.pageReset()},1e3)})},!1,!1)}});