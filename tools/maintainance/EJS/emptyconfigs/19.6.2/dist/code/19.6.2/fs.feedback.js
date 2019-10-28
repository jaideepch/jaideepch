/***************************************
* @preserve
* ForeSee Web SDK: Feedback
* Built April 27, 19 21:50:58
* Code version: 19.6.2
* Template version: 19.6.2
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),_fsNormalizeUrl("$fs.survey.js"),"feedbackconfig"],function(e,t,i,s,config){var r=t.toLowerCase(window.location.href.toString()),n={};if((r.indexOf("buildabear.c")>-1||r.indexOf("bab-dev-store.sparkred.")>-1||r.indexOf("humana.c")>-1||r.indexOf(".dteenergy.c"))&&(n.FBALTPOSITION=!0),(r.indexOf(".peco.c")>-1||r.indexOf(".bge.com")>-1||r.indexOf(".comed.com")>-1)&&(n.FBALTOVERFLOW=!0),!(r.indexOf("argos.co")>-1&&window!==window.top)){var o={config:JSON.parse(JSON.stringify(config)),onFeedbackSubmitted:new i.FSEvent,onModalCssRetrieved:new i.FSEvent};if(t.fsCmd("feedbackreport")||t.supportsDomStorage&&"true"==sessionStorage.getItem("fsFeedbackLoaded"))return t.supportsDomStorage&&sessionStorage.setItem("fsFeedbackLoaded","true"),void e([t.makeURI("$fs.feedbackreport.js")],function(e){});var a={remove:function(){this.parentNode&&this.parentNode.removeChild(this)},hasClass:function(e){return this.className.indexOf(e)>-1},addClass:function(e){this.hasClass(e)||(this.className+=" "+e)},removeClass:function(e){this.className=(this.className||"").replace(e,""),this.className=this.className.replace(/[ ]+$/g,"")},$:function(e){return this.querySelectorAll(e)},css:function(e){for(var t in e)e.hasOwnProperty(t)&&(this.style[t]=e[t])}},c=function(e){if("string"==typeof e&&-1==e.indexOf("<"))return document.querySelectorAll(e);if("string"==typeof e){var t=document.createElement("div");t.innerHTML=e,e=t.firstChild}for(var i in a)a.hasOwnProperty(i)&&(e[i]=a[i]);return e},h=function(e,t){return new window.Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');")(t||{})},d=function(e){function s(e){if(!Array.isArray(e))return!1;for(r=0;r<e.length;r++)if(i.testAgainstSearch(e[r],n))return!0;return!1}var r,n=window._acsURL||window.location.toString();return n=t.toLowerCase(n),(!e.whitelistActive||s(e.whitelistData))&&(!e.blacklistActive||!s(e.blacklistData))},l=function(e,s,r,n,o,a){this.cfg=e,this.cpps=r,this.jrny=e.jrny;var c="acsFeedbackResultsCounter",h=e.previewMode?e.previewMode.toLowerCase():"";if(this.btncfg=e,this.badgeClicked=new i.FSEvent,this.surveyTriggered=new i.FSEvent,this.br=s,e.devices&&e.devices.overridesEnabled){var d;d=s.isTablet||"tablet"===h?e.devices.tablet:s.isMobile||"mobile"===h?e.devices.mobile:e.devices.desktop,t.ext(this.cfg,d),this.cfg.icon.lastIndexOf(".png")>-1&&(this.btncfg.icon=this.cfg.icon.replace(".png",".svg"))}this.animationMove=4,e.counter&&(this.counter=0,sessionStorage.getItem(c)&&(this.counter=Math.round(parseFloat(sessionStorage.getItem(c))),this.counter=isNaN(this.counter)?0:this.counter),this.btncfg.counter=this.counter,this.btncfg.counterLocale=e.counter.toLocaleString()),this.btncfg.fbsize=this.cfg.fbsize||"medium",this.btncfg.btnClass="_acs _acs"+e.fbtype+"--"+e.template+" _acsbadge--"+this.btncfg.fbsize+" _acs"+e.fblocation,this.btncfg.fbcolortext=this.btncfg.fbcolortext||"#fff",this.btnTemplate=n,this.emtemplate=o,this.enabled=!!a};l.prototype.setBtnTemplate=function(){var e={btncfg:this.btncfg},s=h(this.btnTemplate,e),r=this;r.badgeClicked.subscribe(function(){r.jrny&&r.jrny.addEventObj({name:"feedback_clicked"+(r.br.isMobile?"_mobile":""),properties:{mid:[r.cfg.mid]}}),r.surveyTriggered.fire({emtemplate:r.emtemplate})},!1,!0),this.$el=document.createElement("div"),this.$el.innerHTML=s,this.$el=c(this.$el.querySelectorAll("div._acs")[0]),this.enabled&&(i.Bind(this.$el,"feedback:click",function(){r._unhover(),r.badgeClicked.fire(r.cfg)}),i.Bind(this.$el,"feedback:keypress",function(e){var t=i.getKeyCode(e);"enter"!==t&&" "!==t&&"spacebar"!==t||(r._unhover(),r.badgeClicked.fire(r.cfg))})),this.cfg.fbanimate&&(i.Bind(this.$el,"feedback:mouseenter",function(){r._hover()}),i.Bind(this.$el,"feedback:mouseleave",function(){r._unhover()})),this.btncfg.label.length||(this.$el.querySelector("._acsBadgeLabel").style.paddingLeft=0),document.body.appendChild(this.$el),n&&!n.FBALTPOSITION&&i.addClass(document.documentElement,"fsfb fsfb-relbody"),this.cfg.delay&&this.cfg.delay>0?setTimeout(t.proxy(function(){this.init()},this),this.cfg.delay):this.init()},l.prototype._hover=function(){this.cfg.fbanimate&&this.$el.addClass("_acsHover")},l.prototype._unhover=function(){this.cfg.fbanimate&&this.$el.removeClass("_acsHover")},l.prototype.init=function(e){var t=this.$el.$("._acsBadgeLabel"),s=this,r=(s.cfg,i.getGeneralStorage(this.br));if(e=e||function(){},s.jrny&&!r.get("fbb")&&(r.set("fbb","s",864e5),s.jrny.addEventObj({name:"feedback_button_shown",properties:{mid:[s.cfg.mid]}})),this.$el.css({visibility:"hidden"}),t&&t.length>0){if(e){var n=this.$el;setTimeout(function(){s._unhover(),setTimeout(function(){n.addClass("_acsAnimate"),e()},250)},250),"vertical"==this.cfg.fbdirection&&(this.cfg.fblocation.indexOf("right")>-1?this.$el.addClass("_acsVertical_right"):this.$el.addClass("_acsVertical_left")),this.cfg.fbfixed&&this.$el.addClass("_acsFixed")}"none"===this.cfg.fbtype?this.$el.css({display:"none"}):this.$el.css({visibility:"visible"}),s.br.isMobile&&this.$el.setAttribute("role","link")}},l.prototype.remove=function(){this.enabled=!1,this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)},l.prototype.dispose=function(){this.remove(),this.disposed=!0};var p,f,u=function(config,e){config=config||this.cfg,e=e||this.br;var t=config.previewMode?config.previewMode.toLowerCase():"",i=config.fbtype;return config&&e?(config.devices&&config.devices.overridesEnabled&&(i=e.isTablet||"tablet"===t?config.devices.tablet.fbtype||config.fbtype:e.isMobile||"mobile"===t?config.devices.mobile.fbtype||config.fbtype:config.devices.desktop.fbtype||config.fbtype),i):i},m=new i.FSEvent;t.API.expose("CPPS",{set:function(){m.subscribe(function(e){return function(){o.CPPS.set.apply(o.CPPS,e)}}(arguments),!0,!0)},get:function(e,t){t=t||function(){},m.subscribe(function(e){return function(){t(o.CPPS.get.apply(o.CPPS,e[0]))}}([arguments]),!0,!0)},all:function(e){e=e||function(){},m.subscribe(function(t){return function(){e(o.CPPS.all.apply(o.CPPS))}}(),!0,!0)}}),t.API.expose("clearStateFeedback",function(){m.subscribe(function(){o.stg.reset(),o.rec&&o.rec.recorder&&o.rec.recorder.clearState()},!0,!0)});var v=function(e){var s=!1,r=!1,n=config.instances;clearTimeout(p),clearTimeout(f),i._preventUnloadFor(500);for(var a=0;a<n.length;a++)if(n[a].mid==e){a,s=n[a];break}if(s&&s.disabled)return"This feedback has been disabled.";if(s.topics&&s.topics.length)for(var c=0;c<s.topics.length;c++)if(d(s.topics[c])){r=!0;break}if(!s)return"Error: MID provided is not valid";if(!r&&0!==s.topics.length)return"Error: Either this measure is disabled or there are no active topics";if((r||0===s.topics.length)&&!s.disabled){s.surveytype||void 0===s.popup||(s.surveytype=s.popup?"popup":"modal"),s.template||(s.template="default");var h={},l=function(e,s,r,n){var o=t.makeURI("$templates/feedback/"+(e||"default")+"/"+s+".html");new i.JSONP({success:t.proxy(function(e){n(e),r&&r.resolve()},this),failure:t.proxy(function(e){r&&r.error()},this)}).get(o,"templates_feedback_"+(e||"default")+"_")},u=new i.Async(!0,t.proxy(function(){void 0===o.browser&&(o.browser=new i.Browser),void 0===o.CPPS&&(o.CPPS=new i.CPPS(i.getGeneralStorage(o.browser)));$.initialize(s,o.browser,o.CPPS,h.emTemplate,h.svContentsTemplate,h.epTemplate)},this),t.proxy(function(){},this));u.enqueue(function(e){l(s.template,"epilogue",e,function(e){h.epTemplate=e})}),u.enqueue(function(e){l(s.template,"surveycontents",e,function(e){h.svContentsTemplate=e})}),u.enqueue(function(e){l(s.template,"serviceunavailable",e,function(e){h.emTemplate=e})})}};t.API.expose("launchFeedback",v),t.API.expose("launchACSFeedback",v),t.API.expose("resetFeedback",function(){clearTimeout(f),p&&(clearTimeout(p),p=null),p=setTimeout(function(){for(p=null;j.length>0;){var e=j.pop();e.badge&&e.badge.dispose()}i.Unbind("feedback:*"),i.Unbind("feedbackModal:*"),i.pageNavEvent.unsubscribe(o.pageResetFn),B.dispose(),$.disposePopups(),f=t.nextTick(function(){O()})},200)}),t.API.expose("onFeedbackSubmitted",o.onFeedbackSubmitted);var b={completeAPI:function(e,t,i){o.CPPS=e,o.browser=t,o.stg=i,m.fire()}},g=function(){var e=c('<img src="'+t.makeURI("$loader.gif")+'" class="acs-loader">');e.setAttribute("alt","loading survey"),this.$el=e};g.prototype.center=function(e){var t=this.$el.parentNode.offsetWidth,i=(this.$el.parentNode.offsetHeight,this.$el.offsetWidth);this.$el.offsetHeight;this.$el.css({left:(t-i)/2+"px",top:e?(t-i)/2+"px":"auto"})},g.prototype.remove=function(){this.$el.parentNode.removeChild(this.$el)};(function(e,t,i){this.from=e,this.to=t,this.diff=this.to-this.from,this.callback=i||function(){}}).prototype={_tween:function(e){return--e*e*e+1},go:function(e){this.stop(),this.tm=e,this.startTime=new Date,this.timer=setInterval(t.proxy(function(){var e=new Date,t=e-this.startTime,i=Math.min(t/this.tm,1),s=this._tween(i);i>=1&&(clearInterval(this.timer),this.timer=null),this.val=s*this.diff+this.from,this.callback(this.val)},this),20)},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}};var y=function(e,t){this.br=e,this.cfg=t};y.prototype.platformOK=function(){var e=this.cfg,t=this.br;return!(e.browser_cutoff[t.browser.name]&&t.browser.actualVersion<e.browser_cutoff[t.browser.name])&&!(e.platform_cutoff[t.os.name]&&t.os.version<e.platform_cutoff[t.os.name])};var w=function(e,t,i){this.template=i,this.br=e,this.cpps=t,this.emTemplate=null,this.css=null,this.typeTemplate=null,this.svContentsTemplate=null,this.epTemplate=null};w.prototype.getCss=function(e){i.loadCSS(t.makeURI("$templates/feedback/"+(this.template||"default")+"/main.css"),function(t){t?(e&&e.resolve(),o.onModalCssRetrieved.fire()):e&&e.error()},null,this.br)},w.prototype.getTemplate=function(e,s,r){var n=t.makeURI("$templates/feedback/"+(this.template||"default")+"/"+e+".html"),o="templates_feedback_"+(this.template||"default")+"_";new i.JSONP({success:t.proxy(function(e){r&&r(e),s&&s.resolve()},this),failure:t.proxy(function(e){s&&s.error()},this)}).get(n,o)},w.prototype.grabTemplates=function(e){this.queue=new i.Async(!0,t.proxy(function(){e&&e({typeTemplate:this.typeTemplate,emTemplate:this.emTemplate,epTemplate:this.epTemplate,svContentsTemplate:this.svContentsTemplate})},this),t.proxy(function(){},this)),this.queue.enqueue(t.proxy(function(e){this.getCss(e)},this)),this.queue.enqueue(t.proxy(function(e){this.getTemplate("badge",e,t.proxy(function(e){this.typeTemplate=e},this))},this)),this.queue.enqueue(t.proxy(function(e){this.getTemplate("serviceunavailable",e,t.proxy(function(e){this.emTemplate=e},this))},this)),this.queue.enqueue(t.proxy(function(e){this.getTemplate("epilogue",e,t.proxy(function(e){this.epTemplate=e},this))},this)),this.queue.enqueue(t.proxy(function(e){this.getTemplate("surveycontents",e,t.proxy(function(e){this.svContentsTemplate=e},this))},this))};var _=function(e,s,r){this.br=e,this.cpps=s,this.templateHolder={},this.loadSuccess=new i.FSEvent,this.loadFailure=new i.FSEvent;for(var n=new i.Async(!0,t.proxy(function(){this.loadSuccess.fire(this.templateHolder)},this),t.proxy(function(){this.loadFailure.fire()},this)),o=0;o<r.length;o++)n.enqueue(t.proxy(function(e){return function(i){new w(this.br,this.cpps,e).grabTemplates(t.proxy(function(t){t?(this.templateHolder[e]=t,i.resolve()):i.error()},this))}}(r[o]),this))},k=function(e,t,s,r,n,o){this.sv=e,this.br=t,this.cfg=s,this.jrny=s.jrny,this.errTemplate=r,this.svTemplate=n,this.epTemplate=o,this.$domContent=[],this.$btns=[],this.networkError=new i.FSEvent,this.SurveySubmitted=new i.FSEvent,this.cors=new i.CORS(t);for(var a=a||window,h=a.document.body.childNodes,d=0;d<h.length;d++)1===h[d].nodeType&&c(h[d]).hasClass("_acs")?this.$btns.push(h[d]):this.$domContent.push(h[d]);this.$el=c('<div class="acsMainContainerFullPage--'+this.sv.cfg.template+'"></div>'),this.sv.cfg.privacyuri=this.sv.cfg.privacyuri?this.sv.cfg.privacyuri:"http://www.foresee.com/about-us/privacy-policy/",this.sv.cfg.privacytext=this.sv.cfg.privacytext?this.sv.cfg.privacytext:"Privacy policy",this.sv.SubmitClicked.subscribe(function(){this.$content.removeClass("acsVisible"),this._showWait(),this._postSurveyData(function(){this.jrny.addEventObj({name:"feedback_submitted",properties:{mid:[s.mid]}}),this.$content.addClass("acsVisible"),this._showThankyou(),this._removeWait(),this.SurveySubmitted.fire()}.bind(this))}),this.networkError.subscribe(this.onNetworkError.bind(this)),this._getSurveyData(function(e){this.survey=e,this.show()}.bind(this))};k.prototype.onNetworkError=function(e){this._removeWait(),e&&e.type?this.jrny&&this.jrny.addEventObj({name:"feedback_survey_"+e.type,properties:{mid:[s.cfg.mid]}}):this.jrny&&this.jrny.addEventObj({name:"feedback_server_error",properties:{mid:[s.cfg.mid]}}),this.$content=c('<div class="acsMainContainerMobile--'+this.sv.cfg.template+'"></div>'),this.$el=c('<div class="acsMainContainerFullPage--'+this.sv.cfg.template+'"></div>'),this.$closebtn=c('<span><img src="'+t.makeURI("$templates/feedback"+(this.sv.cfg.template||"default")+"/closeBtn.svg")+'" class="acsModalCloseButton"></span>'),this.$content.innerHTML=h(this.errTemplate,this.survey);var r=this.$content.$(".acs-serviceunavailable__message")[0];if("expired"===e.type){for(;r.firstChild;)r.removeChild(r.firstChild);this.sv.cfg.fbexpiremessage?r.appendChild(c("<p>"+this.sv.cfg.fbexpiremessage+"</p>")):r.appendChild(c("<p>This is an expired survey!</p>"))}else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(c("<p>Feedback isn't available right now.</p><p>Please check back later.</p>"))}i.Bind(this.$closebtn,"feedback:click",function(){this.hide(!0)}.bind(this)),this.$el.appendChild(this.$closebtn),this.$el.appendChild(this.$content);var n=this.$el.$(".acs-close-button")[0];i.Bind(n,"feedback:click",function(){this.hide(!0)}.bind(this)),this.$content.addClass("acsVisible"),window.document.body.innerHTML="",window.document.body.appendChild(this.$el)},k.prototype._renderSurvey=function(){var e=e||window,s=(this.sv.cfg,this),r=e.document.body;if(!this.sv.cfg.preview){var n=function(e){27==e.keyCode&&(s.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[s.cfg.mid]}}),s.hide(!1)),i.Unbind(document.body,"feedback:keyup",n)};i.Bind(document.body,"feedback:keyup",n)}r.innerHTML="",0===this.$el.children.length&&(this.$closebtn=c('<span><img src="'+t.makeURI("$templates/feedback/"+(this.sv.cfg.template||"default")+"/closeBtn.svg")+'" class="acsModalCloseButton"></span>'),this.$content=c('<div class="acsMainContainerMobile--'+this.sv.cfg.template+'"></div>'),this.$el.appendChild(this.$closebtn),this.$el.appendChild(this.$content)),r.appendChild(this.$el),this.sv.cfg.preview||i.Bind(this.$closebtn,"feedback:click",function(){this.hide(!1)}.bind(this)),this._showWait()},k.prototype._showWait=function(){this._removeWait(),this._wait=new g,this.$el.appendChild(this._wait.$el),this._wait.center();var e=i.getScroll(window),t=i.getSize(window);this._wait.$el.css({position:"absolute",top:e.y+(t.h-this._wait.$el.offsetHeight)/2+"px",left:e.x+(t.w-this._wait.$el.offsetWidth)/2+"px"})},k.prototype._removeWait=function(){this._wait&&(this._wait.remove(),this._wait=null)},k.prototype.hide=function(e){window.document.body.innerHTML="";for(var t=0;t<this.$domContent.length;t++)window.document.body.appendChild(this.$domContent[t]);this.jrny&&this.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[this.cfg.mid]}}),e||this._showBtns()},k.prototype.remove=k.prototype.hide,k.prototype._showBtns=function(){for(var e=0;e<this.$btns.length;e++)window.document.body.appendChild(this.$btns[e])},k.prototype.show=function(){if(this._renderSurvey(),this._removeWait(),this.survey.ansLogoSrc=t.makeURI("$p_b_foresee.svg"),0===this.$content.children.length){var e=h(this.svTemplate,this.survey);this.$content.innerHTML=e,this.sv.bind(this.$content)}this.$content.addClass("acsVisible"),this.$el.addClass("acsVisible"),this.sv.SurveyUIUpdated.fire(),this.jrny&&this.jrny.addEventObj({name:"feedback_survey_shown",properties:{mid:[this.sv.cfg.mid]}})},k.prototype._showThankyou=function(){this._removeWait();var e=h(this.epTemplate,this.survey);this.$closebtn=c('<span><img src="'+t.makeURI("$templates/feedback/"+(this.sv.cfg.template||"default")+"/closeBtn.svg")+'" class="acsModalCloseButton"></span>'),this.sv.cfg.preview||i.Bind(this.$closebtn,"feedback:click",function(){this.hide(!0)}.bind(this),!0),this.$content.innerHTML=e,this.jrny&&this.jrny.addEventObj({name:"feedback_thankyou_shown",properties:{mid:[this.cfg.mid]}}),this.$el.removeChild(this.$el.childNodes[0]),this.$el.removeChild(this.$el.childNodes[0]),this.$el.appendChild(this.$closebtn),this.$el.appendChild(this.$content);for(var s=this.$el.$(".acs-close-button")[0],r=this.$el.$("h1"),n=0;n<r.length;n++)c(r[n]).addClass("acs-feedback__heading acs-feedback__heading--h1");this.sv.cfg.preview||i.Bind(s,"feedback:click",function(){this.hide(!0)}.bind(this))},k.prototype._getSurveyData=function(){if(this.sv.isExpired())this.networkError.fire({type:"expired"});else{var e={mid:this.sv.cfg.mid,cachebust:(new Date).getTime()};this.sv.cfg.version&&(e.version=this.sv.cfg.version),this._surveyTimer=setTimeout(function(){this.networkError.fire({type:"timedout"})}.bind(this),1e4),this.cors.send({method:"GET",url:this.cfg.datauri,data:e,success:function(e){clearTimeout(this._surveyTimer),this.sv.SurveyData.fire(e,function(e){this.survey=e,this.show()}.bind(this))}.bind(this),failure:function(e){this.networkError.fire({type:"getdata_failed"})}.bind(this)})}},k.prototype._postSurveyData=function(e){if(this.sv.cfg.preview)return void setTimeout(function(){e&&e()},100);this._surveyTimer=setTimeout(function(){this.networkError.fire({type:"timedout"})}.bind(this),1e4),this.cors.send({method:"POST",url:this.cfg.posturi,data:JSON.parse(this.sv._serialize()),contentType:"application/json",success:function(t){clearTimeout(this._surveyTimer),e&&e()}.bind(this),failure:function(e){clearTimeout(this._surveyTimer),sessionStorage.setItem("acsFeedbackSubmitted","true"),this.networkError.fire({type:"postdata_failed"})}.bind(this)})};var C=function(e,t,s,r,n,o){this.cfg=e,this.br=t,this.cpps=s,this.errortemplate=r,this.modaltemplate=n,this.eptemplate=o,this.jrny=e.jrny,this.init(),this.SurveySubmitted=new i.FSEvent,this.NetworkError=new i.FSEvent};C.prototype.init=function(){var e=this,r=i.getSize(window);switch("fullpage"!==this.cfg.surveytype&&(this.br.isMobile||r.w<=500)&&(this.cfg.surveytype="popup"),this.cfg.surveytype){case"popup":this.chrome=new E(new s.SurveyBuilder(this.cfg,this.cpps,this.br),this.cfg,this.br),this.chrome.SurveySubmitted.subscribe(function(){e.SurveySubmitted.fire()}),this.chrome.show();break;case"modal":t.isDefined(this.chrome)?this.chrome.show():(this.survey=new s.SurveyBuilder(this.cfg,this.cpps,this.br),this.chrome=new x(this.survey,this.br,this.cfg,this.errortemplate,this.modaltemplate,this.eptemplate),this.chrome.SurveySubmitted.subscribe(function(){e.SurveySubmitted.fire()}),this.chrome.networkError.subscribe(function(){e.NetworkError.fire()}));break;case"fullpage":t.isDefined(this.chrome)?this.chrome.show():(this.survey=new s.SurveyBuilder(this.cfg,this.cpps,this.br),this.chrome=new k(this.survey,this.br,this.cfg,this.errortemplate,this.modaltemplate,this.eptemplate),this.chrome.SurveySubmitted.subscribe(function(){e.SurveySubmitted.fire()}),this.chrome.networkError.subscribe(function(){e.NetworkError.fire()}))}},C.prototype.show=function(){this.chrome.show()},C.prototype.remove=function(){this.chrome&&this.chrome.remove&&this.chrome.remove()};var S=function(e){this.br=e,this.mid=i.getHashParm("mid"),this.previewmode=t.toLowerCase(i.getHashParm("previewmode")),this.datauri=i.getHashParm("datauri"),this.template=i.getHashParm("template")||"default",this.surveytype=i.getHashParm("surveytype")?i.getHashParm("surveytype"):"modal",this.tempHolder={}};S.prototype.show=function(){if(this.mid&&this.previewmode&&this.datauri){var e=new _(this.br,{},[this.template]);e.loadSuccess.subscribe(t.proxy(function(e){this.tempHolder=e[this.template];$.initialize({mid:this.mid,datauri:this.datauri,posturi:"",reporturi:"",surveytype:this.surveytype,autowhitelist:!0,preview:!0,template:this.template,replay:!1},this.br,null,this.tempHolder.emTemplate,this.tempHolder.svContentsTemplate,this.tempHolder.epTemplate)},this)),e.loadFailure.subscribe(t.proxy(function(){},this))}else alert("You need mid, previewmode, and datauri.")};var T=function(e,t,i,s){this.cfg=e,this.br=t,this.cpps=i,this.cfg.template=void 0!==this.cfg.template?this.cfg.template:"default",this.cfg.surveytype=void 0!==this.cfg.surveytype?this.cfg.surveytype:"modal",this.cfg.fbcolor=void 0!==this.cfg.fbcolor?this.cfg.fbcolor:"#F24554",this.cfg.fbcolortext=void 0!==this.cfg.fbcolortext?this.cfg.fbcolortext:"#FFFFFF",this.cfg.replay=void 0!==this.cfg.replay&&this.cfg.replay};T.prototype.renderBadge=function(){var e=new _(this.br,this.cpps,[this.cfg.template]);e.loadSuccess.subscribe(t.proxy(function(e){var t=e[this.cfg.template];this.cfg.badge=new l(this.cfg,this.br,this.cpps,t.typeTemplate,t.emTemplate,!1),this.cfg.badge.setBtnTemplate()},this)),e.loadFailure.subscribe(t.proxy(function(){}))};var $={Current:null};$.getPopup=function(e){return!(i.getSize(window).w<=500)&&!(!$.Current||$.Current.cfg.mid!=e)&&$.Current},$.disposePopups=function(){$.Current&&$.Current.remove(),$.Current=null},$.removePopup=function(e){$.Current&&$.Current.cfg.mid==e&&($.Current.remove(),$.Current=null)},$.initialize=function(e,t,i,s,r,n){$.disposePopups(),e.surveytype||void 0===e.popup||(e.surveytype=e.popup?"popup":"modal");var o=$.getPopup(e.mid);return o&&!o.cfg.popup?o.show():(o=new C(e,t,i,s,r,n),$.Current=o,o.SurveySubmitted.subscribe(function(e){return function(){$.SurveySubmitted.fire(e)}}(e)),o.NetworkError.subscribe(function(){$.NetworkError.fire()})),o},$.SurveySubmitted=new i.FSEvent,$.NetworkError=new i.FSEvent;var x=function(e,s,r,n,o,a){this.sv=e,this.cfg=e.cfg,this.instcfg=r,this.browser=s,this.em=n,this.noserv=n,this.eptemplate=a,this.jrny=e.cfg.jrny,this.add(),this.modaltemplate=o,this.cors=new i.CORS(s),this.sv.cfg.privacyuri=this.sv.cfg.privacyuri?this.sv.cfg.privacyuri:"http://www.foresee.com/about-us/privacy-policy/",this.sv.cfg.privacytext=this.sv.cfg.privacytext?this.sv.cfg.privacytext:"Privacy policy",this.SurveySubmitted=new i.FSEvent,this.networkError=new i.FSEvent;this.sv.SubmitClicked.subscribe(t.proxy(function(){this.$content.removeClass("acsVisible"),this._showWait(),this._postSurveyData(t.proxy(function(){this.jrny&&this.jrny.addEventObj({name:"feedback_submitted",properties:{mid:[this.cfg.mid]}}),this.$content.addClass("acsVisible"),this._showThankyou(),this.SurveySubmitted.fire(),this._removeWait()},this))},this)),this.networkError.subscribe(t.proxy(function(e){this._removeWait(),e&&e.type?this.jrny&&this.jrny.addEventObj({name:"feedback_survey_"+e.type,properties:{mid:[this.cfg.mid]}}):this.jrny&&this.jrny.addEventObj({name:"feedback_server_error",properties:{mid:[this.cfg.mid]}}),this.$content.innerHTML=h(this.noserv,this.survey);var s=this.$content.$("h1"),r=this.$content.$(".acs-close-button")[0],n=this.$content.$(".acs-serviceunavailable__message")[0];if("expired"===e.type){for(;n.firstChild;)n.removeChild(n.firstChild);if(this.sv.cfg.fbexpiremessage)n.appendChild(c("<p>"+this.sv.cfg.fbexpiremessage+"</p>"));else{var o=this._unencodeHTML(this.sv.defaultCfg.expired);n.appendChild(c(o))}}else{for(;n.firstChild;)n.removeChild(n.firstChild);var a=this._unencodeHTML(this.sv.defaultCfg.unavailable);n.appendChild(c(a))}for(var d=0;d<s.length;d++)c(s[d]).addClass("acs-feedback__heading acs-feedback__heading--h1");this.cfg.preview||(this.positionModal(),i.Bind(r,"feedbackModal:click",t.proxy(function(){this.remove()},this))),this.$content.addClass("acsVisible")},this)),this._getSurveyData()};x.prototype._showThankyou=function(){var e=h(this.eptemplate,this.survey);this.$content.innerHTML=e;for(var s=this.$content.$("h1"),r=this.$content.$(".acs-close-button")[0],n=document.getElementById("fsrModalFocus"),o=0;o<s.length;o++)i.addClass(s[o],"acs-feedback__heading acs-feedback__heading--h1");this.positionModal(),this.cfg.preview||i.Bind(r,"feedbackModal:click",t.proxy(function(){this.remove()},this)),n.focus()},x.prototype._unencodeHTML=function(e){var t=/&lt;/gi,i=/&gt;/gi;return e.replace(t,"<").replace(i,">")},x.prototype._showWait=function(){this._removeWait(),this._wait=new g,this.$el.appendChild(this._wait.$el),this._wait.center();var e=i.getScroll(window),t=i.getSize(window);this._wait.$el.css({top:e.y+(t.h-this._wait.$el.offsetHeight)/2+"px"})},x.prototype._removeWait=function(){this._wait&&(this._wait.remove(),this._wait=null)},x.prototype.remove=function(){this.$el&&this.$el.parentNode&&(i.Unbind("feedbackModal:*"),this.$el.parentNode.removeChild(this.$el))},x.prototype.add=function(e){e=e||window;var s=e.document.body,r=e.document.documentElement,n=Math.max(s.scrollHeight,s.offsetHeight,r.clientHeight,r.scrollHeight,r.offsetHeight),o="acsModalContainer--"+this.instcfg.template,a=this.sv.cfg,h=c('<div class="acsModalBackFace"></div>'),d=c('<div class="acsModalChrome"></div>');if(this.browser.isIE&&10==this.browser.browser.version&&(o+=" acsIE10"),this.$el=c('<div class="'+o+'"></div>'),this.$el.css({height:n}),!this.cfg.preview){var l=this;i.Bind(h,"feedbackModal:click",t.proxy(function(e){(this.survey||this.networkError.didFire)&&(l.jrny&&l.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[a.mid]}}),this.remove())},this));var p=function(e){27==e.keyCode&&(l.jrny&&l.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[a.mid]}}),l.remove(),l.focusOnBadge())};i.Bind(document.body,"feedbackModal:keyup",p),i.Bind(d,"feedbackModal:click",function(e){var t=e.target;t&&t==d&&(l.jrny&&l.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[a.mid]}}),l.remove(),l.focusOnBadge())})}var f=this.head=c('<div class="acsModalContent" id="acsModalContent" role="dialog" aria-labelledby="acsFeedbackDialogTitle" aria-describedby="acsFeedbackDialogDesc"></div>'),u=c('<div class="acsModalHead" role="presentation"></div>'),m=c('<img id="fsrModalFocus" src="'+t.makeURI("$templates/feedback/"+(this.instcfg.template||"default")+"/closeBtn.svg")+'" class="acsModalCloseButton" alt="Close Button" tabindex="0">');this.$head=u,u.appendChild(m),f.appendChild(u),this.$content=c('<div class="acsModalInnerContent" role="presentation"></div>'),f.appendChild(this.$content),d.appendChild(f),this.$el.appendChild(h),this.$el.appendChild(d),e.document.body.appendChild(this.$el),this.cfg.preview||(i.Bind(m,"feedbackModal:click",t.proxy(function(e){this.jrny&&this.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[this.cfg.mid]}}),this.remove(),this.focusOnBadge()},this)),i.Bind(m,"feedbackModal:keypress",t.proxy(function(e){(13===e.keyCode||"Enter"===e.key)&&(this.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[this.cfg.mid]}}),this.remove(),this.focusOnBadge())},this))),t.nextTick(function(){h.addClass("_acsActive")}),this._showWait(),this._trapKeyBoard(f,m)},x.prototype.renderSurvey=function(){var e;this._removeWait(),this.$head.addClass("acsVisible"),this.survey.ansLogoSrc=t.makeURI("$p_b_foresee.svg"),this.survey.meta.prologuetext=this._addTitleDescIds(this.survey.meta.prologuetext),this.survey.meta.epiloguetext=this._addTitleDescIds(this.survey.meta.epiloguetext),e=h(this.modaltemplate,this.survey),this.$content.innerHTML=e,this.sv.bind(this.$content),this.positionModal(),this.$content.addClass("acsVisible"),this.jrny&&this.jrny.addEventObj({name:"feedback_survey_shown",properties:{mid:[this.cfg.mid]}}),o.onModalCssRetrieved.subscribe(function(){document.getElementById("fsrModalFocus").focus()}.bind(this),!0,!0)},x.prototype._addTitleDescIds=function(e){var t=document.createElement("div");t.innerHTML=e;var i=t.childNodes[0],s=t.childNodes[1],r="";if(t.childNodes.length>2)for(t.removeChild(t.childNodes[0]),s=document.createElement("div"),s.setAttribute("style","padding: 0; margin: 0;");t.hasChildNodes();){var n=t.firstChild;t.removeChild(n),s.appendChild(n)}return i.setAttribute("id","acsFeedbackDialogTitle"),r=i.outerHTML,s&&(s.setAttribute("id","acsFeedbackDialogDesc"),r+=s.outerHTML),r},x.prototype.positionModal=function(){var e,t=i.getScroll(window),s=i.getSize(window),r=this.$content.offsetHeight||this.prevOffsetHeight;e=s.h>r?Math.max(0,t.y+(s.h-r-50)/2)+"px":t.y+"px",this.head.style.marginTop=e,n&&n.FBALTOVERFLOW&&this.$el.css({"overflow-y":"scroll",display:"block"})},x.prototype.show=function(){this.positionModal(),this.$el.css({display:"block"})},x.prototype.focusOnBadge=function(){var e=this.instcfg.badge&&this.instcfg.badge.$el;e&&e.focus()},x.prototype._trapKeyBoard=function(e,t){t=t||e,i.Unbind("invite:focus"),i.Bind(document.body,"feedbackModal:focus",function(i){i=i||window.event;var s=i.target||i.srcElement;e.contains(s)||t&&(i.stopPropagation(),t.focus())},!1)},x.prototype._getSurveyData=function(){this.sv.isExpired()?this.networkError.fire({type:"expired"}):this.cors.ready.subscribe(t.proxy(function(){var e={mid:this.sv.cfg.mid,cachebust:(new Date).getTime()};this.sv.cfg.version&&(e.version=this.sv.cfg.version),this._surveyTimer=setTimeout(t.proxy(function(){this.networkError.fire({type:"timedout"})},this),1e4),this.cors.send({url:this.sv.cfg.datauri,data:e,method:"GET",skipEncode:!1,success:t.proxy(function(e){this.networkError.didFire||(clearTimeout(this._surveyTimer),this.sv.SurveyData.fire(e,t.proxy(function(e){this.survey=e,this.renderSurvey()},this)))},this),failure:t.proxy(function(e){this.networkError.didFire||this.networkError.fire({type:"getdata_failed"})},this)})},this),!0,!0)},x.prototype._postSurveyData=function(e){if(this.cfg.preview)return void t.nextTick(function(){e&&e()});var i=JSON.parse(this.sv._serialize());t.isArray(i.responses)&&i.responses.push({questionId:"deployment_type",answerText:"BADGE"}),o.onFeedbackSubmitted.fire(t.ext({rating:this.sv._getScore()},i)),this._surveyTimer=setTimeout(t.proxy(function(){this.networkError.fire({type:"timedout"})},this),1e4),this.cors.send({method:"POST",url:this.cfg.posturi,data:i,contentType:"application/json",success:t.proxy(function(t){clearTimeout(this._surveyTimer),e&&e()},this),failure:t.proxy(function(e){clearTimeout(this._surveyTimer),sessionStorage.setItem("acsFeedbackSubmitted","true"),this.networkError.fire({type:"postdata_failed"})},this)})};var E=function(e,t,s){this.height=600,this.width=400,this.survey=e,this.cfg=t,this.cpps=e.cpps,this.SurveySubmitted=new i.FSEvent,this.br=s,this.jrny=t.jrny,this.networkError=i.FSEvent()};E.prototype._getCXRParams=function(){var e="";return!0===this.cfg.replay&&void 0!==P&&P.recorder&&(e+="cxrid="+t.enc(P.recorder.getGlobalId())+"&cxrurl="+t.enc(t.config.recUrl)),e},E.prototype.show=function(){if(!this.winRef){var e,s=this.cfg.preview?null:JSON.stringify(this.cpps.all()),r=this._getCXRParams(),n=this,a=window,c=this.cfg.badge&&this.cfg.badge.btncfg&&this.cfg.badge.btncfg.mid?this.cfg.badge.btncfg.mid:this.cfg.mid,h={global:function(e){return t.diff(e,i.defaultConfigs.global)}(t.config),product:this.cfg.preview?null:function(e,s){for(var r=t.ext({},s),n=0;n<r.instances.length;n++)if(e===r.instances[n].mid){r.instances=[t.diff(r.instances[n],i.defaultConfigs.survey)];break}return r}(c,o.config)},d=["&_gwl_=",t.enc(t.home),"&_cv_=",t.enc(t.config.codeVer),"&_au_=",t.enc(t.config.analyticsUrl),"&_vt_=",t.enc(t.tagVersion),"&_issh_=",t.enc(t.isSelfHosted),"&_pa_=",t.enc(t.assetLocation),t.codeLocation?"&_cl_="+t.enc(t.codeLocation):""].join("")
;this.cfg.preview?e=t.makeURI(["$fs.feedbacksurvey.html?mid=",t.enc(this.survey.cfg.mid),"&t=",t.enc(this.cfg.template||"default"),"&datauri=",t.getParam("datauri"),"&ns=",t.enc("preview"),"&_gcfg_=",t.enc(i.Compress.compress(t.enc(JSON.stringify(h)))),d].join("")):(e=t.makeURI(["$fs.feedbacksurvey.html?","&t=",t.enc(this.cfg.template||"default"),"&fsUrl=",t.enc(a.location.href),"&uid=",t.enc(this.jrny.data.userId),"&ns=",t.enc(t.config.siteKey),"&brain=",t.enc(t.config.brainUrl),d,"&",r].join("")),i.getBrainStorage(this.br,this.jrny.data.userId,this.cfg.preview?"preview":t.config.siteKey).set("fscfg",{gcfg:t.enc(i.Compress.compress(t.enc(JSON.stringify(h)))),cid:t.enc(this.jrny.data.customerId),mid:c,cpps:t.enc(i.Compress.compress(s))})),this.br.isIE&&this.br.browser.actualVersion<=11&&("//"==e.substr(0,2)&&(e="https:"+e),"http"==e.substr(0,4)&&e.replace("http","https")),this.cfg.preview&&(a!==a.top||a.location.toString().indexOf("fscommand=feedbackpreview")>-1)?a.location.href=e:(this.winRef=a.open(e,"_system"),this._checker=setInterval(function(){try{var e=n.winRef.location+"",t="fsSurveyComplete=";if(e.indexOf(t)>-1){clearInterval(n._checker);var s=i.Compress.decompress(decodeURIComponent(e.substr(e.indexOf(t)+t.length)));o.onFeedbackSubmitted.fire(JSON.parse(s)),n.SurveySubmitted.fire(JSON.parse(s))}}catch(e){clearInterval(n._checker),n.SurveySubmitted.fire()}},500))}},i.registerProduct("feedback"),config=t.ext({browser_cutoff:{IE:11,IEMobile:10,Safari:5.2,Firefox:25,Chrome:30,Opera:1e3},platform_cutoff:{Android:5,Winphone:7.4,iPod:9,iPhone:9,iPad:9},config:{persistence:i.products.foresee?i.products.foresee.config.persistence:i.storageTypes.CK}},config);var j=[],M=window.location,O=function(){var e,r=!!i.getHashParm("previewmode"),n=!!t.getParam("previewbadgemode"),a=config.instances,c=[],h=!1;if(M=JSON.parse(JSON.stringify(window.location)),a||r||n){var d=new i.Browser;d.ready.subscribe(function(){var p=i.getGeneralStorage(d);p.ready.subscribe(t.proxy(function(){if(r){return void new S(d).show()}var f=new y(d,config),m=new i.CPPS(p),v=t.config.adobeRsid;m.set("code",t.config.codeVer),m.set("tz",-(new Date).getTimezoneOffset()),m.set("env",t.isProduction?"prd":"stg"),m.set("fp",d.fp),i.INT.GA.has()&&i.INT.GA.uid(function(e){e&&m.set("GA_ID",e)});var g=function(e){m.set(e.name,e.value)};v&&(i.INT.OM.uid(v,g),i.INT.OM.mcid(v,g));var w=i.INT.OM.beacon();if(w&&m.set("OMTR_BEACON",w),n){var k=JSON.parse(t.getParam("cfg")),C=t.getQueryString("previewbadgemode")||"desktop";return void(k.mid&&(k.previewMode=C,e=new T(k,d,m),e.renderBadge()))}if(f.platformOK()){b.completeAPI(m,d,p),o.pageResetFn=function(){var e,i=window,s=i.location,r=function(e){e=e||"";var t=e.split("#");return t.length>2?t[0]+t[1]:e.replace(/#/gi,"")};r(M.hash)==r(s.hash)&&M.pathname==s.pathname||fsReady(function(){clearTimeout(e),e=setTimeout(function(){var e=t.API.retrieveFromAPI("resetFeedback");t.isFunction(e)&&e()},1e3)})},i.pageNavEvent.subscribe(o.pageResetFn,!1,!1);for(var x=0;x<a.length;x++){var E=a[x],O=!1;if(s.TopicTester(E)&&E.topics&&E.topics.length)for(var P=0;P<E.topics.length;P++)if(s.TopicTester(E.topics[P])){O=!0;break}if(!0===E.replay&&!1===E.disabled&&(h=!0,"y"!=p.get("fbr")&&p.set("fbr","y")),(O||E.topics&&0===E.topics.length)&&!E.disabled&&window==window.top){var I=!1;E.template||(E.template="default");for(var N=0;N<c.length;N++)c[N]===E.template&&(I=!0);I||c.push(E.template);var H=t.config.customerId||config.id||i.getRootDomain();E.jrny=new i.Journey(H,i.APPID.FEEDBACK,p.uid,d,1e3),j.push(E)}}if(j.length>0){var A,L=c.length>0?c:["default"],D=new _(d,m,L);D.loadSuccess.subscribe(t.proxy(function(e){for(var t=0;t<j.length;t++){var i=j[t];if("badge"===u(i,d)){0==t&&d.isIE&&(A=document.createElement("div"),A.className="acs-feedback__forcefont",document.body.appendChild(A));var s=e[i.template];i.badge=new l(i,d,m,s.typeTemplate,s.emTemplate,!0),i.badge.setBtnTemplate(),i.badge.surveyTriggered.subscribe(function(e){return function(){!0===e.replay&&B.startTransmitting(d,m,e),$.initialize(e,d,m,s.emTemplate,s.svContentsTemplate,s.epTemplate)}}(i),!1,!1)}}$.SurveySubmitted.subscribe(function(e){var t,i;if(e&&e.mid)for(B.startProcessing(d,m,e),t=0;t<j.length;t++)j[t].badge&&j[t].mid===e.mid&&j[t].badge.remove();else for(i=0;i<j.length;i++)j[i].badge&&j[i].badge.remove()})},this),!0,!0)}h&&B&&B.setup(d,m,j[0],function(e){for(var t=0;t<j.length;t++)j[t].stg=F,j[t].record=e})}},this),!0,!0)},!0,!0)}};t.domReady(O);var P=null,F=null,I=null,N=i.now(),B={setup:function(s,r,n,o){t.isDefined(t.config.products.record)&&!1===t.config.products.record||!t.productConfig.record?t.nextTick(o):e([t.makeURI("$fs.record.js"),"recordconfig"],function(e,t){I=t,F||(F=i.getGeneralStorage(s));var n={id:t.id};P=e.getInstance(s,window,F,n,r),o(P)})},startProcessing:function(e,t,s){B.startTransmitting(e,t,s,function(e){e&&e.recorder&&e.recorder.processImmediately(Math.max(2e4-(i.now()-N),0))})},dispose:function(){P&&(P.dispose(),P=null)},startTransmitting:function(e,t,s,r){N=i.now(),!0===s.replay&&(P?(P.beginTransmitting(),r&&r(P)):B.setup(e,t,s,function(e){e.setTransmitOK(),r&&r(e)}))}}}});