/***************************************
* @preserve
* ForeSee Web SDK: Feedback
* Built March 01, 17 13:19:31
* Code version: 19.3.3-rc.2
* Template version: 19.3.3-rc.2
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),_fsNormalizeUrl("$fs.survey.js"),"feedbackconfig"],function(e,t,i,s,config){function r(e,t,s,r){if(f[e])return f[e].success.subscribe(t||function(){},!0,!0),void f[e].fail.subscribe(s||function(){},!0,!0);var n,o,a,c=!1;this.count=this.count?++this.count:1,n=this.count,o="load-css-"+n,a=document.createElement("link"),a.setAttribute("id",o),a.setAttribute("rel","stylesheet"),a.setAttribute("type","text/css");var h={link:a,url:e,didfail:!1,didsucceed:!1,success:new i.FSEvent,fail:new i.FSEvent};return h.success.subscribe(t,!0,!0),h.fail.subscribe(s,!0,!0),f[e]=h,"undefined"!=typeof a.addEventListener?"Android"==r.os.name&&r.os.version<4.4?setTimeout(function(){c=!0,h.didsucceed=!0,h.success.fire(a)},250):(a.addEventListener("load",function(){c=!0,h.didsucceed=!0,h.success.fire(a)},!1),a.addEventListener("error",function(){h.didfail=!0,h.fail.fire(a)},!1)):"undefined"!=typeof a.attachEvent&&a.attachEvent("onload",function(){var e,t,i=document.styleSheets.length;try{for(;i--;)if(t=document.styleSheets[i],t.id===o)return e=t.cssText,c=!0,h.didsucceed=!0,void h.success.fire(a)}catch(e){}c||(h.didfail=!0,h.fail.fire(a))}),document.getElementsByTagName("head")[0].appendChild(a),a.setAttribute("href",e),a}var n=window.location.href.toString().toLowerCase(),o={};if((n.indexOf("buildabear.c")>-1||n.indexOf("bab-dev-store.sparkred.")>-1||n.indexOf("humana.c")>-1||n.indexOf(".dteenergy.c"))&&(o.FBALTPOSITION=!0),(n.indexOf(".peco.c")>-1||n.indexOf(".bge.com")>-1||n.indexOf(".comed.com")>-1)&&(o.FBALTOVERFLOW=!0),!(n.indexOf("argos.co")>-1&&window!==window.top)){var a={onFeedbackSubmitted:new i.FSEvent},c={remove:function(){this.parentNode&&this.parentNode.removeChild(this)},hasClass:function(e){return this.className.indexOf(e)>-1},addClass:function(e){this.hasClass(e)||(this.className+=" "+e)},removeClass:function(e){this.className=(this.className||"").replace(e,""),this.className=this.className.replace(/[ ]+$/g,"")},$:function(e){return this.querySelectorAll(e)},css:function(e){for(var t in e)e.hasOwnProperty(t)&&(this.style[t]=e[t])}},h=function(e){if("string"==typeof e&&e.indexOf("<")==-1)return document.querySelectorAll(e);if("string"==typeof e){var t=document.createElement("div");t.innerHTML=e,e=t.firstChild}for(var i in c)c.hasOwnProperty(i)&&(e[i]=c[i]);return e},d="Func",p="ion",l=function(e,t){var i;return(i=new window[d+"t"+p]("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"))(t||{})},u=function(e){function t(e){for(s=0;s<e.length;s++)if(i.testAgainstSearch(e[s],r))return!0;return!1}var s,r=window._acsURL||window.location.toString();return r=r.toLowerCase(),(!e.whitelistActive||t(e.whitelistData))&&(!e.blacklistActive||!t(e.blacklistData))},f={},m=function(e,s,r,n,o,a){this.cfg=e,this.cpps=r,this.jrny=e.jrny;var c="acsFeedbackResultsCounter";this.btncfg=e,this.badgeClicked=new i.FSEvent,this.surveyTriggered=new i.FSEvent,this.br=s,this.animationMove=4,this.btncfg.imgsrc=t.makeURI("$templates/feedback/"+e.template+"/"+e.icon),e.counter?(this.isIcon=!1,this.counter=0,sessionStorage.getItem(c)&&(this.counter=Math.round(parseFloat(sessionStorage.getItem(c))),this.counter=isNaN(this.counter)?0:this.counter),this.btncfg.counter=this.counter,this.btncfg.counterLocale=e.counter.toLocaleString()):this.isIcon=!0,this.btncfg.btnClass="_acs _acs"+e.fbtype+"--"+e.template+" _acs"+e.fblocation,this.btnTemplate=n,this.emtemplate=o,this.enabled=!!a};m.prototype.setBtnTemplate=function(){var e={btncfg:this.btncfg},s=l(this.btnTemplate,e),r=this;r.badgeClicked.subscribe(function(){r.br.isMobile||r.jrny.addEventObj({name:"feedback_clicked",properties:{mid:[r.cfg.mid]}}),r.surveyTriggered.fire({emtemplate:r.emtemplate})},!1,!0),this.$el=document.createElement("div"),this.$el.innerHTML=s,this.$el=h(this.$el.querySelectorAll("div._acs")[0]),this.enabled&&i.Bind(this.$el,"feedback:click",function(){r._unhover(),r.badgeClicked.fire(r.cfg)}),this.cfg.fbanimate&&(i.Bind(this.$el,"feedback:mouseenter",function(){r._hover()}),i.Bind(this.$el,"feedback:mouseleave",function(){r._unhover()})),document.body.appendChild(this.$el),o&&!o.FBALTPOSITION&&i.addClass(document.documentElement,"fsfb fsfb-relbody"),this.cfg.delay&&this.cfg.delay>0?setTimeout(t.proxy(function(){this.init()},this),this.cfg.delay):this.init()},m.prototype._hover=function(){this.cfg.fbanimate&&this.$el.addClass("_acsHover")},m.prototype._unhover=function(){this.cfg.fbanimate&&this.$el.removeClass("_acsHover")},m.prototype.init=function(e){var t=this.$el.$("._acsBadgeLabel"),s=this,r=s.cfg;if(e=e||function(){},s.jrny.addEventObj({name:"feedback_button_shown",properties:{mid:[s.cfg.mid]}}),this.$el.css({visibility:"hidden"}),t&&t.length>0){if(e){if(s._unhover(),this.isIcon)i.imgInfo("templates/feedback/"+r.template+"/"+r.icon,function(t){return function(i,r){setTimeout(function(){s._unhover(),setTimeout(function(){t.addClass("_acsAnimate"),e()},50),s._unhover()},50)}}(this.$el));else{s._unhover();var n=this.$el;setTimeout(function(){s._unhover(),setTimeout(function(){n.addClass("_acsAnimate"),e()},250)},250)}"vertical"==this.cfg.fbdirection&&(this.cfg.fblocation.indexOf("right")>-1?this.$el.addClass("_acsVertical_right"):this.$el.addClass("_acsVertical_left")),this.cfg.fbfixed&&this.$el.addClass("_acsFixed")}"none"===this.cfg.fbtype?this.$el.css({display:"none"}):this.$el.css({visibility:"visible"})}},m.prototype.setCounter=function(e){this.numTween&&(this.numTween.stop(),this.counter=this.numTween.val);var i=this.$el.$("._acsCounterInner")[0];this.numTween=new k(this.counter,e,t.proxy(function(e){i.innerHTML=Math.round(e).toLocaleString()},this)),this.numTween.go(1e3),sessionStorage.setItem("acsFeedbackResultsCounter",e)},m.prototype.disableCounter=function(){var e=this.$el.$("._acsBadgeImg")[0],i=this.cfg;e||(this.$el.$("._acsCounterInner")[0].innerHTML="",h(this.$el.$("._acsCounterInner")[0]).css({background:"none"}),e=h('<img style="position: relative;top: -2px;height: 19px;" src="'+t.makeURI("$templates/feedback/"+i.template+"/"+i.icon)+'" class="_acsBadgeImg">'),this.$el.$("._acsCounterInner")[0].appendChild(e))},m.prototype.enableCounter=function(){var e=this.$el.$("._acsBadgeImg")[0];e&&(this.$el.$("._acsCounterInner")[0].innerHTML="0",h(this.$el.$("._acsCounterInner")[0]).css({background:"#F87473"}))},m.prototype.remove=function(){this.enabled=!1,this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)},m.prototype.dispose=function(){this.remove(),this.disposed=!0};var v,y,b=new i.FSEvent;t.API.expose("CPPS",{set:function(){b.subscribe(function(e){return function(){a.CPPS.set.apply(a.CPPS,e)}}(arguments),!0,!0)},get:function(e,t){t=t||function(){},b.subscribe(function(e){return function(){t(a.CPPS.get.apply(a.CPPS,e[0]))}}([arguments]),!0,!0)}});var g=function(e){var s,r=!1,n=!1,o=config.instances;clearTimeout(v),clearTimeout(y),i._preventUnloadFor(500);for(var a=0;a<o.length;a++)if(o[a].mid==e){s=a,r=o[a];break}if(r&&r.disabled)return"This feedback has been disabled.";if(r.topics&&r.topics.length)for(var c=0;c<r.topics.length;c++)if(u(r.topics[c])){n=!0;break}if(!r)return"Error: MID provided is not valid";if(!n&&0!==r.topics.length)return"Error: Either this measure is disabled or there are no active topics";if((n||0===r.topics.length)&&!r.disabled){r.surveytype||"undefined"==typeof r.popup||(r.surveytype=r.popup?"popup":"modal"),r.template||(r.template="default");var h={},d=function(e,s,r,n){var o=_fsNormalizeUrl("templates/feedback/"+e+"/"+s+".html"),a=new i.JSONP({success:t.proxy(function(e){n(e),r&&r.resolve()},this),failure:t.proxy(function(e){r&&r.error()},this)});a.get(o,"templates_feedback_"+(e||"default")+"_")},p=new i.Async(!0,t.proxy(function(){I.initialize(r,browser,cpps,h.emTemplate,h.svContentsTemplate,h.epTemplate)},this),t.proxy(function(){},this));p.enqueue(function(e){d(r.template,"epilogue",e,function(e){h.epTemplate=e})}),p.enqueue(function(e){d(r.template,"surveycontents",e,function(e){h.svContentsTemplate=e})}),p.enqueue(function(e){d(r.template,"serviceunavailable",e,function(e){h.emTemplate=e})})}};t.API.expose("launchFeedback",g),t.API.expose("launchACSFeedback",g),t.API.expose("resetFeedback",function(){clearTimeout(y),v&&(clearTimeout(v),v=null),v=setTimeout(function(){for(v=null;B.length>0;){var e=B.pop();e.badge&&e.badge.dispose()}i.Unbind("feedback:*"),i.pageNavEvent.unsubscribe(a.pageResetFn),N.dispose(),I.disposePopups(),y=t.nextTick(function(){L()})},200)}),t.API.expose("onFeedbackSubmitted",a.onFeedbackSubmitted);var w={completeAPI:function(e,t){a.CPPS=e,a.browser=t,b.fire()}},_=function(){var e=h('<img src="'+t.makeURI("$loader.gif")+'" class="acs-loader">');this.$el=e};_.prototype.center=function(e){var t=this.$el.parentNode.offsetWidth,i=(this.$el.parentNode.offsetHeight,this.$el.offsetWidth);this.$el.offsetHeight;this.$el.css({left:(t-i)/2+"px",top:e?(t-i)/2+"px":"auto"})},_.prototype.remove=function(){this.$el.parentNode.removeChild(this.$el)};var k=function(e,t,i){this.from=e,this.to=t,this.diff=this.to-this.from,this.callback=i||function(){}};k.prototype={_tween:function(e){return--e*e*e+1},go:function(e){this.stop(),this.tm=e,this.startTime=new Date,this.timer=setInterval(t.proxy(function(){var e=new Date,t=e-this.startTime,i=Math.min(t/this.tm,1),s=this._tween(i);i>=1&&(clearInterval(this.timer),this.timer=null),this.val=s*this.diff+this.from,this.callback(this.val)},this),20)},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}};var $=function(e,t){this.br=e,this.cfg=t};$.prototype.platformOK=function(){var e=this.cfg,t=this.br;return!(e.browser_cutoff[t.browser.name]&&t.browser.actualVersion<e.browser_cutoff[t.browser.name])&&!(e.platform_cutoff[t.os.name]&&t.os.version<e.platform_cutoff[t.os.name])};var C=function(e,t,i){this.template=i,this.br=e,this.cpps=t,this.emTemplate=null,this.css=null,this.typeTemplate=null,this.svContentsTemplate=null,this.epTemplate=null};C.prototype.getCss=function(e){r(t.makeURI("$templates/feedback/"+(this.template||"default")+"/fs.feedback.css"),function(t){t?e&&e.resolve():e&&e.error()},null,this.br)},C.prototype.getTemplate=function(e,s,r){var n=t.makeURI("$templates/feedback/"+(this.template||"default")+"/"+e+".html"),o="templates_feedback_"+(this.template||"default")+"_",a=new i.JSONP({success:t.proxy(function(e){r&&r(e),s&&s.resolve()},this),failure:t.proxy(function(e){s&&s.error()},this)});a.get(n,o)},C.prototype.grabTemplates=function(e){this.queue=new i.Async(!0,t.proxy(function(){e&&e({typeTemplate:this.typeTemplate,emTemplate:this.emTemplate,epTemplate:this.epTemplate,svContentsTemplate:this.svContentsTemplate})},this),t.proxy(function(){},this)),this.queue.enqueue(t.proxy(function(e){this.getCss(e)},this)),this.queue.enqueue(t.proxy(function(e){this.getTemplate("badge",e,t.proxy(function(e){this.typeTemplate=e},this))},this)),this.queue.enqueue(t.proxy(function(e){this.getTemplate("serviceunavailable",e,t.proxy(function(e){this.emTemplate=e},this))},this)),this.queue.enqueue(t.proxy(function(e){this.getTemplate("epilogue",e,t.proxy(function(e){this.epTemplate=e},this))},this)),this.queue.enqueue(t.proxy(function(e){this.getTemplate("surveycontents",e,t.proxy(function(e){this.svContentsTemplate=e},this))},this))};var T=function(e,s,r){this.br=e,this.cpps=s,this.templateHolder={},this.loadSuccess=new i.FSEvent,this.loadFailure=new i.FSEvent;var n=new i.Async(!0,t.proxy(function(){this.loadSuccess.fire(this.templateHolder)},this),t.proxy(function(){this.loadFailure.fire()},this));n.enqueue(t.proxy(function(e){i.Healthy(this.br,["survey","static"],e.resolve,e.error)},this));for(var o=0;o<r.length;o++)n.enqueue(t.proxy(function(e){return function(i){var s=new C(this.br,this.cpps,e);s.grabTemplates(t.proxy(function(t){t?(this.templateHolder[e]=t,i.resolve()):i.error()},this))}}(r[o]),this))},S=function(e,s,r,n,o,a){this.sv=e,this.br=s,this.cfg=r,this.jrny=r.jrny,this.errTemplate=n,this.svTemplate=o,this.epTemplate=a,this.$domContent=[],this.$btns=[],this.networkError=new i.FSEvent,this.SurveySubmitted=new i.FSEvent,this.cors=new i.CORS(s);for(var c=c||window,d=c.document.body.childNodes,p=0;p<d.length;p++)1===d[p].nodeType&&h(d[p]).hasClass("_acs")?this.$btns.push(d[p]):this.$domContent.push(d[p]);this.$el=h('<div class="acsMainContainerFullPage--'+this.sv.cfg.template+'"></div>'),this.sv.cfg.privacyuri=this.sv.cfg.privacyuri?this.sv.cfg.privacyuri:"http://www.foresee.com/about-us/privacy-policy/",this.sv.cfg.privacytext=this.sv.cfg.privacytext?this.sv.cfg.privacytext:"Privacy policy",this.sv.SubmitClicked.subscribe(t.proxy(function(){this.$content.removeClass("acsVisible"),this._showWait(),i.Healthy(this.br,["survey","static"],t.proxy(function(){this._postSurveyData(t.proxy(function(){this.jrny.addEventObj({name:"feedback_submitted",properties:{mid:[r.mid]}}),this.$content.addClass("acsVisible"),this._showThankyou(),this._removeWait(),this.SurveySubmitted.fire()},this))},this),t.proxy(function(){this.networkError.fire({type:"postdata_failed"})},this))},this)),this.networkError.subscribe(t.proxy(function(s){this._removeWait(),s&&s.type?this.jrny&&this.jrny.addEventObj({name:"feedback_survey_"+s.type,properties:{mid:[e.cfg.mid]}}):this.jrny&&this.jrny.addEventObj({name:"feedback_server_error",properties:{mid:[e.cfg.mid]}}),this.$content=h('<div class="acsMainContainerMobile--'+this.sv.cfg.template+'"></div>'),this.$el=h('<div class="acsMainContainerFullPage--'+this.sv.cfg.template+'"></div>'),this.$closebtn=h('<span><img src="'+t.makeURI("$templates/feedback"+(this.sv.cfg.template||"default")+"/closeBtn.svg")+'" class="acsModalCloseButton"></span>'),this.$content.innerHTML=l(this.errTemplate,this.survey);var r=this.$content.$(".acs-serviceunavailable__message")[0];if("expired"===s.type){for(;r.firstChild;)r.removeChild(r.firstChild);this.sv.cfg.fbexpiremessage?r.appendChild(h("<p>"+this.sv.cfg.fbexpiremessage+"</p>")):r.appendChild(h("<p>This is an expired survey!</p>"))}else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(h("<p>Feedback isn't available right now.</p><p>Please check back later.</p>"))}i.Bind(this.$closebtn,"feedback:click",t.proxy(function(){this.hide(!0)},this)),this.$el.appendChild(this.$closebtn),this.$el.appendChild(this.$content);var n=this.$el.$(".acs-close-button")[0];i.Bind(n,"feedback:click",t.proxy(function(){this.hide(!0)},this)),this.$content.addClass("acsVisible"),window.document.body.innerHTML="",window.document.body.appendChild(this.$el)},this)),i.Healthy(this.br,["survey","static"],t.proxy(function(){this._getSurveyData(t.proxy(function(e){this.survey=e,this.show()},this))},this),t.proxy(function(){this.networkError.didFire||this.networkError.fire({type:"getdata_failed"})},this))};S.prototype._renderSurvey=function(){var e=e||window,s=(this.sv.cfg,this),r=e.document.body;if(!this.sv.cfg.preview){var n=function(e){27==e.keyCode&&(s.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[s.cfg.mid]}}),s.hide(!1)),i.Unbind(document.body,"feedback:keyup",n)};i.Bind(document.body,"feedback:keyup",n)}r.innerHTML="",0===this.$el.children.length&&(this.$closebtn=h('<span><img src="'+t.makeURI("$templates/feedback/"+(this.sv.cfg.template||"default")+"/closeBtn.svg")+'" class="acsModalCloseButton"></span>'),this.$content=h('<div class="acsMainContainerMobile--'+this.sv.cfg.template+'"></div>'),this.$el.appendChild(this.$closebtn),this.$el.appendChild(this.$content)),r.appendChild(this.$el),this.sv.cfg.preview||i.Bind(this.$closebtn,"feedback:click",t.proxy(function(){this.hide(!1)},this)),this._showWait()},S.prototype._showWait=function(){this._removeWait(),this._wait=new _,this.$el.appendChild(this._wait.$el),this._wait.center();var e=i.getScroll(window),t=i.getSize(window);this._wait.$el.css({position:"absolute",top:e.y+(t.h-this._wait.$el.offsetHeight)/2+"px",left:e.x+(t.w-this._wait.$el.offsetWidth)/2+"px"})},S.prototype._removeWait=function(){this._wait&&(this._wait.remove(),this._wait=null)},S.prototype.hide=function(e){window.document.body.innerHTML="";for(var t=0;t<this.$domContent.length;t++)window.document.body.appendChild(this.$domContent[t]);this.jrny&&this.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[this.cfg.mid]}}),e||this._showBtns()},S.prototype.remove=S.prototype.hide,S.prototype._showBtns=function(){for(var e=0;e<this.$btns.length;e++)window.document.body.appendChild(this.$btns[e])},S.prototype.show=function(){if(this._renderSurvey(),this._removeWait(),this.survey.ansLogoSrc=t.makeURI("$p_b_foresee.svg"),0===this.$content.children.length){var e=l(this.svTemplate,this.survey);this.$content.innerHTML=e,this.sv.bind(this.$content)}this.$content.addClass("acsVisible"),this.$el.addClass("acsVisible"),this.sv.SurveyUIUpdated.fire(),this.jrny&&this.jrny.addEventObj({name:"feedback_survey_shown",properties:{mid:[this.sv.cfg.mid]}})},S.prototype._showThankyou=function(){this._removeWait();var e=l(this.epTemplate,this.survey);this.$closebtn=h('<span><img src="'+t.makeURI("$templates/feedback/"+(this.sv.cfg.template||"default")+"/closeBtn.svg")+'" class="acsModalCloseButton"></span>'),this.sv.cfg.preview||i.Bind(this.$closebtn,"feedback:click",t.proxy(function(){this.hide(!0)},this),!0),this.$content.innerHTML=e,this.jrny&&this.jrny.addEventObj({name:"feedback_thankyou_shown",properties:{mid:[this.cfg.mid]}}),this.$el.removeChild(this.$el.childNodes[0]),this.$el.removeChild(this.$el.childNodes[0]),this.$el.appendChild(this.$closebtn),this.$el.appendChild(this.$content);for(var s=this.$el.$(".acs-close-button")[0],r=this.$el.$("h1"),n=0;n<r.length;n++)h(r[n]).addClass("acs-feedback__heading acs-feedback__heading--h1");this.sv.cfg.preview||i.Bind(s,"feedback:click",t.proxy(function(){this.hide(!0)},this))},S.prototype._getSurveyData=function(){if(this.sv.isExpired())this.networkError.fire({type:"expired"});else{var e={mid:this.sv.cfg.mid,cachebust:(new Date).getTime()};this.sv.cfg.version&&(e.version=this.sv.cfg.version),this._surveyTimer=setTimeout(t.proxy(function(){this.networkError.fire({type:"timedout"})},this),1e4),this.cors.send({method:"GET",url:this.cfg.datauri,data:e,success:t.proxy(function(e){clearTimeout(this._surveyTimer),this.sv.SurveyData.fire(e,t.proxy(function(e){this.survey=e,this.show()},this))},this),failure:t.proxy(function(e){this.networkError.fire({type:"getdata_failed"})},this)})}},S.prototype._postSurveyData=function(e){return this.sv.cfg.preview?void setTimeout(function(){e&&e()},100):(this._surveyTimer=setTimeout(t.proxy(function(){this.networkError.fire({type:"timedout"})},this),1e4),void this.cors.send({method:"POST",url:this.cfg.posturi,data:JSON.parse(this.sv._serialize()),contentType:"application/json",success:t.proxy(function(t){clearTimeout(this._surveyTimer),e&&e()},this),failure:t.proxy(function(e){clearTimeout(this._surveyTimer),sessionStorage.setItem("acsFeedbackSubmitted","true"),this.networkError.fire({type:"postdata_failed"})},this)}))};var x=function(e,t,s,r,n,o){this.cfg=e,this.br=t,this.cpps=s,this.errortemplate=r,this.modaltemplate=n,this.eptemplate=o,this.jrny=e.jrny,this.init(),this.SurveySubmitted=new i.FSEvent,this.NetworkError=new i.FSEvent};x.prototype.init=function(){var e=this,r=i.getSize(window);switch("fullpage"!==this.cfg.surveytype&&(this.br.isMobile||r.w<=500)&&(this.cfg.surveytype="popup"),this.cfg.surveytype){case"popup":this.chrome=new O(new s.SurveyBuilder(this.cfg,this.cpps,this.br),this.cfg,this.br),this.chrome.SurveySubmitted.subscribe(function(){e.SurveySubmitted.fire()}),this.chrome.show();break;case"modal":t.isDefined(this.chrome)?this.chrome.show():(this.survey=new s.SurveyBuilder(this.cfg,this.cpps,this.br),this.chrome=new R(this.survey,this.br,this.cfg,this.errortemplate,this.modaltemplate,this.eptemplate),this.chrome.SurveySubmitted.subscribe(function(){e.SurveySubmitted.fire()}),this.chrome.networkError.subscribe(function(){e.NetworkError.fire()}));break;case"fullpage":t.isDefined(this.chrome)?this.chrome.show():(this.survey=new s.SurveyBuilder(this.cfg,this.cpps,this.br),this.chrome=new S(this.survey,this.br,this.cfg,this.errortemplate,this.modaltemplate,this.eptemplate),this.chrome.SurveySubmitted.subscribe(function(){e.SurveySubmitted.fire()}),this.chrome.networkError.subscribe(function(){e.NetworkError.fire()}))}this.jrny&&this.jrny.addEventObj({name:"feedback_survey_shown",properties:{mid:[this.cfg.mid]}})},x.prototype.show=function(){this.chrome.show()},x.prototype.remove=function(){this.chrome&&this.chrome.remove&&this.chrome.remove()};var E=function(e,t,i){this.cfg=e,this.br=t,this.cpps=i,this.cfg.template="undefined"!=typeof this.cfg.template?this.cfg.template:"default",this.cfg.surveytype="undefined"!=typeof this.cfg.surveytype?this.cfg.surveytype:"modal",this.cfg.fbcolor="undefined"!=typeof this.cfg.fbcolor?this.cfg.fbcolor:"#F24554",this.cfg.replay="undefined"!=typeof this.cfg.replay&&this.cfg.replay};E.prototype.renderBadge=function(){var e=new T(this.br,this.cpps,[this.cfg.template]);e.loadSuccess.subscribe(t.proxy(function(e){var t=e[this.cfg.template];this.cfg.badge=new m(this.cfg,this.br,this.cpps,t.typeTemplate,t.emTemplate,!1),this.cfg.badge.setBtnTemplate()},this)),e.loadFailure.subscribe(t.proxy(function(){}))};var I={Current:null};I.getPopup=function(e){var t=i.getSize(window);return!(t.w<=500)&&(!(!I.Current||I.Current.cfg.mid!=e)&&I.Current)},I.disposePopups=function(){I.Current&&I.Current.remove(),I.Current=null},I.removePopup=function(e){I.Current&&I.Current.cfg.mid==e&&(I.Current.remove(),I.Current=null)},I.initialize=function(e,t,i,s,r,n){I.disposePopups(),e.surveytype||"undefined"==typeof e.popup||(e.surveytype=e.popup?"popup":"modal");var o=I.getPopup(e.mid);return o&&!o.cfg.popup?o.show():(o=new x(e,t,i,s,r,n),I.Current=o,o.SurveySubmitted.subscribe(function(e){return function(){I.SurveySubmitted.fire(e)}}(e)),o.NetworkError.subscribe(function(){I.removePopup(e.mid),I.NetworkError.fire()})),o},I.SurveySubmitted=new i.FSEvent,I.NetworkError=new i.FSEvent;var j=function(e){this.br=e,this.mid=i.getHashParm("mid"),this.previewmode=i.getHashParm("previewmode").toLowerCase(),this.datauri=i.getHashParm("datauri"),this.template=i.getHashParm("template")||"default",this.surveytype=i.getHashParm("surveytype")?i.getHashParm("surveytype"):"modal",this.tempHolder={}};j.prototype.show=function(){if(this.mid&&this.previewmode&&this.datauri){var e=new T(this.br,{},[this.template]);e.loadSuccess.subscribe(t.proxy(function(e){this.tempHolder=e[this.template];I.initialize({mid:this.mid,datauri:this.datauri,posturi:"",reporturi:"",surveytype:this.surveytype,autowhitelist:!0,preview:!0,template:this.template,replay:!1},this.br,null,this.tempHolder.emTemplate,this.tempHolder.svContentsTemplate,this.tempHolder.epTemplate)},this)),e.loadFailure.subscribe(t.proxy(function(){},this))}else alert("You need mid, previewmode, and datauri.")};var O=function(e,t,s){this.height=600,this.width=400,this.survey=e,this.cfg=t,this.cpps=e.cpps,this.SurveySubmitted=new i.FSEvent,this.br=s,this.jrny=t.jrny,this.networkError=i.FSEvent()};O.prototype._getCXRParams=function(){var e="";return this.cfg.replay===!0&&"undefined"!=typeof F&&F.recorder&&(e+="cxrid="+t.enc(F.recorder.getGlobalId())+"&cxrurl="+t.enc(t.config.recUrl)),e},O.prototype.show=function(){if(!this.winRef){var e=this.cfg.preview?null:JSON.stringify(this.cpps.all()),s=this._getCXRParams(),r=this,n=window,o="&_gwl_="+t.enc(t.home)+"&_cv_="+t.enc(t.config.codeVer)+"&_au_="+t.enc(t.config.analyticsUrl)+"&_vt_="+t.enc(t.tagVersion),c=this.cfg.preview?t.makeURI("$fs.feedbacksurvey.html?mid="+t.enc(this.survey.cfg.mid)+"&t="+t.enc(this.cfg.template||"default")+"&datauri="+t.getParam("datauri")+"&ns="+t.enc("preview")+o):t.makeURI("$fs.feedbacksurvey.html?mid="+t.enc(this.survey.cfg.mid)+"&t="+t.enc(this.cfg.template||"default")+"&fsUrl="+t.enc(n.location.href)+"&cid="+t.enc(this.jrny.data.customerId)+"&uid="+t.enc(this.jrny.data.userId)+"&cpps="+t.enc(i.Compress.compress(e))+"&ns="+t.enc("site_id")+o+"&"+s);this.br.isIE&&this.br.browser.actualVersion<=11&&("//"==c.substr(0,2)&&(c="https:"+c),"http"==c.substr(0,4)&&c.replace("http","https")),this.cfg.preview&&(n!==n.top||n.location.toString().indexOf("fscommand=feedbackpreview")>-1)?n.location.href=c:(this.winRef=n.open(c,"_system"),this._checker=setInterval(function(){try{var e=r.winRef.location+"",t="fsSurveyComplete=";if(e.indexOf(t)>-1){clearInterval(r._checker);var s=i.Compress.decompress(decodeURIComponent(e.substr(e.indexOf(t)+t.length)));a.onFeedbackSubmitted.fire(JSON.parse(s)),r.SurveySubmitted.fire(JSON.parse(s))}}catch(e){clearInterval(r._checker),r.SurveySubmitted.fire()}},500))}};var F=null,P=null,M=null,H=i.now(),N={setup:function(s,r,n,o){e([t.makeURI("$fs.record.js"),"recordconfig"],function(e,t){M=t,P||(P=i.getGlobalStore(s)),F=e.getInstance(s,window,P),o(F)})},startProcessing:function(e,t,s){N.startTransmitting(e,t,s,function(e){e&&e.recorder&&e.recorder.processImmediately(Math.max(2e4-(i.now()-H),0))})},dispose:function(){F&&(F.dispose(),F=null)},startTransmitting:function(e,t,s,r){H=i.now(),s.replay===!0&&(F?(F.beginTransmitting(),r&&r(F)):N.setup(e,t,s,function(e){e.setTransmitOK(),r&&r(e)}))}};i.registerProduct("feedback"),config=t.ext({browser_cutoff:{IE:10,IEMobile:10,Safari:4,Firefox:11,Chrome:20,Opera:1e3},platform_cutoff:{Android:4,Winphone:7.4,iPod:7,iPhone:7,iPad:7},config:{persistence:i.products.foresee?i.products.foresee.config.persistence:i.storageTypes.CK}},config);var B=[],A=window.location,L=function(){var e,r=!!i.getHashParm("previewmode"),n=!!i.getHashParm("previewbadgemode"),o=config.instances,c=[],h=!1;new i.FSEvent;if(A=JSON.parse(JSON.stringify(window.location)),o||r||n){var d=new i.Browser;d.ready.subscribe(function(){var p=i.getGlobalStore(d);p.ready.subscribe(t.proxy(function(){if(r){var l=new j(d);return void l.show()}if("IE"==d.browser.name&&d.browser.version<9)for(var u=0;u<o.length;u++)"vertical"==o[u].fbdirection&&(o[u].fbdirection="horizontal");var f=new $(d,config),v=new i.CPPS(p,"feedback");v.set("code",t.config.codeVer),v.set("env",t.isProduction?"prd":"stg"),v.set("fp",d.fp),i.INT.GA.has()&&i.INT.GA.uid(function(e){e&&v.set("GA_ID",e)}),i.INT.OM.has()&&i.INT.OM.uid(function(e){e&&v.set("OMTR_VID",e)});var y=i.INT.OM.beacon();if(y&&v.set("OMTR_BEACON",y),n){var b=JSON.parse(decodeURIComponent(t.getParam("cfg")));return void(b.mid&&(e=new E(b,d,v),e.renderBadge()))}if(f.platformOK()){var g=i.getRootDomain();w.completeAPI(v,d),a.pageResetFn=function(){var e,i=window,s=i.location,r=function(e){var t=e.split("#");return t.length>2?t[0]+t[1]:e.replace(/#/gi,"")},n=r(A.hash),o=r(s.hash);n==o&&A.pathname==s.pathname||fsReady(function(){clearTimeout(e),e=setTimeout(function(){t.API.retrieveFromAPI("resetFeedback")()},1200)})},i.pageNavEvent.subscribe(a.pageResetFn,!1,!1);for(var _=0;_<o.length;_++){var k=o[_],C=!1;if(k.topics&&k.topics.length)for(var S=0;S<k.topics.length;S++)if(s.TopicTester(k.topics[S])){C=!0;break}if(k.replay===!0&&k.disabled===!1&&(h=!0),(C||k.topics&&0===k.topics.length)&&!k.disabled&&window==window.top){var x=!1;k.template||(k.template="default");for(var O=0;O<c.length;O++)c[O]===k.template&&(x=!0);x||c.push(k.template),k.jrny=new i.Journey(g,k.mid,p.uid,d),B.push(k)}}if(B.length>0){var F,M=c.length>0?c:["default"],H=new T(d,v,M);H.loadSuccess.subscribe(t.proxy(function(e){for(var t=0;t<B.length;t++)if("badge"===B[t].fbtype){0==t&&d.isIE&&(F=document.createElement("div"),F.className="acs-feedback__forcefont",document.body.appendChild(F));var i=e[B[t].template];B[t].badge=new m(B[t],d,v,i.typeTemplate,i.emTemplate,!0),B[t].badge.setBtnTemplate(),B[t].badge.surveyTriggered.subscribe(function(e){return function(){e.replay===!0&&N.startTransmitting(d,v,e),I.initialize(e,d,v,i.emTemplate,i.svContentsTemplate,i.epTemplate)}}(B[t]),!1,!1)}I.SurveySubmitted.subscribe(function(e){var t,i;if(e&&e.mid)for(N.startProcessing(d,v,e),t=0;t<B.length;t++)B[t].badge&&B[t].mid===e.mid&&B[t].badge.remove();else for(i=0;i<B.length;i++)B[i].badge&&B[i].badge.remove()})},this),!0,!0)}h&&N&&N.setup(d,v,B[0],function(e){for(var t=0;t<B.length;t++)B[t].stg=P,B[t].record=e})}},this),!0,!0)},!0,!0)}};t.domReady(L);var R=function(e,s,r,n,o,a){this.sv=e,this.cfg=e.cfg,this.instcfg=r,this.browser=s,this.em=n,this.noserv=n,this.eptemplate=a,this.jrny=e.cfg.jrny,this.IE8=s.isIE&&s.browser.version<9,this.add(),this.modaltemplate=o,this.cors=new i.CORS(s),this.sv.cfg.privacyuri=this.sv.cfg.privacyuri?this.sv.cfg.privacyuri:"http://www.foresee.com/about-us/privacy-policy/",this.sv.cfg.privacytext=this.sv.cfg.privacytext?this.sv.cfg.privacytext:"Privacy policy",this.SurveySubmitted=new i.FSEvent,this.networkError=new i.FSEvent;this.sv.SubmitClicked.subscribe(t.proxy(function(){this.$content.removeClass("acsVisible"),this._showWait(),i.Healthy(this.browser,["survey","static"],t.proxy(function(){this._postSurveyData(t.proxy(function(){this.jrny&&this.jrny.addEventObj({name:"feedback_submitted",properties:{mid:[this.cfg.mid]}}),this.$content.addClass("acsVisible"),this._showThankyou(),this.SurveySubmitted.fire(),this._removeWait()},this))},this),t.proxy(function(){this.networkError.didFire||this.networkError.fire({type:"postdata_failed"})},this))},this)),this.networkError.subscribe(t.proxy(function(e){this._removeWait(),e&&e.type?this.jrny&&this.jrny.addEventObj({name:"feedback_survey_"+e.type,properties:{mid:[this.cfg.mid]}}):this.jrny&&this.jrny.addEventObj({name:"feedback_server_error",properties:{mid:[this.cfg.mid]}}),this.$content.innerHTML=l(this.noserv,this.survey);var s=this.$content.$("h1"),r=this.$content.$(".acs-close-button")[0],n=this.$content.$(".acs-serviceunavailable__message")[0];if("expired"===e.type){for(;n.firstChild;)n.removeChild(n.firstChild);if(this.sv.cfg.fbexpiremessage)n.appendChild(h("<p>"+this.sv.cfg.fbexpiremessage+"</p>"));else{var o=this._unencodeHTML(this.sv.defaultCfg.expired);n.appendChild(h(o))}}else{for(;n.firstChild;)n.removeChild(n.firstChild);var a=this._unencodeHTML(this.sv.defaultCfg.unavailable);n.appendChild(h(a))}for(var c=0;c<s.length;c++)h(s[c]).addClass("acs-feedback__heading acs-feedback__heading--h1");this.cfg.preview||(this.positionModal(),i.Bind(r,"feedback:click",t.proxy(function(){this.remove()},this))),this.$content.addClass("acsVisible")},this)),i.Healthy(this.browser,["survey","static"],t.proxy(function(){this._getSurveyData()},this),t.proxy(function(){this.networkError.didFire||this.networkError.fire({type:"getdata_failed"})},this))};R.prototype._showThankyou=function(){var e=l(this.eptemplate,this.survey);this.$content.innerHTML=e;for(var s=this.$content.$("h1"),r=this.$content.$(".acs-close-button")[0],n=0;n<s.length;n++)h(s[n]).addClass("acs-feedback__heading acs-feedback__heading--h1");this.positionModal(),this.cfg.preview||i.Bind(r,"feedback:click",t.proxy(function(){this.jrny.addEventObj({name:"feedback_thankyou_clicked",properties:{mid:[this.cfg.mid]}}),this.remove()},this))},R.prototype._unencodeHTML=function(e){var t=/&lt;/gi,i=/&gt;/gi;return e.replace(t,"<").replace(i,">")},R.prototype._showWait=function(){this._removeWait(),this._wait=new _,this.$el.appendChild(this._wait.$el),this._wait.center();var e=i.getScroll(window),t=i.getSize(window);this._wait.$el.css({top:e.y+(t.h-this._wait.$el.offsetHeight)/2+"px"})},R.prototype._removeWait=function(){this._wait&&(this._wait.remove(),this._wait=null)},R.prototype.remove=function(){this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)},R.prototype.add=function(e){e=e||window;var s=e.document.body,r=e.document.documentElement,n=Math.max(s.scrollHeight,s.offsetHeight,r.clientHeight,r.scrollHeight,r.offsetHeight),o="acsModalContainer--"+this.instcfg.template,a=this.sv.cfg,c=h('<div class="acsModalBackFace"></div>'),d=h('<div class="acsModalChrome"></div>');
if(this.browser.isIE&&10==this.browser.browser.version&&(o+=" acsIE10"),this.$el=h('<div class="'+o+'"></div>'),this.$el.css({height:n}),!this.cfg.preview){var p=this;i.Bind(c,"feedback:click",t.proxy(function(e){(this.survey||this.networkError.didFire)&&(p.jrny&&p.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[a.mid]}}),this.remove())},this));var l=function(e){27==e.keyCode&&(p.jrny&&p.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[a.mid]}}),p.remove()),i.Unbind(document.body,"feedback:keyup",l)};i.Bind(document.body,"feedback:keyup",l),i.Bind(d,"feedback:click",function(e){var t=e.target;t&&t==d&&(p.jrny&&p.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[a.mid]}}),p.remove())})}var u=this.head=h('<div class="acsModalContent"></div>'),f=h('<div class="acsModalHead"></div>'),m=h('<img src="'+t.makeURI("$templates/feedback/"+(this.instcfg.template||"default")+"/closeBtn.svg")+'" class="acsModalCloseButton">');this.$head=f,f.appendChild(m),u.appendChild(f),this.$content=h('<div class="acsModalInnerContent"></div>'),u.appendChild(this.$content),d.appendChild(u),this.$el.appendChild(c),this.$el.appendChild(d);var v=e.document.body;v.appendChild(this.$el),this.cfg.preview||i.Bind(m,"feedback:click",t.proxy(function(e){this.jrny&&this.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[this.cfg.mid]}}),this.remove()},this)),t.nextTick(function(){c.addClass("_acsActive")}),this._showWait()},R.prototype.renderSurvey=function(){this._removeWait(),this.$head.addClass("acsVisible"),this.survey.ansLogoSrc=t.makeURI("$p_b_foresee.svg");var e=l(this.modaltemplate,this.survey);this.$content.innerHTML=e,this.sv.bind(this.$content),this.positionModal(),this.$content.addClass("acsVisible")},R.prototype.positionModal=function(){var e=i.getScroll(window),t=i.getSize(window),s=this.$content.offsetHeight||this.prevOffsetHeight,r=Math.max(0,e.y+(t.h-s-50)/2)+"px";this.head.style.marginTop=r,o&&o.FBALTOVERFLOW&&this.$el.css({"overflow-y":"scroll",display:"block"})},R.prototype.show=function(){this.positionModal(),this.$el.css({display:"block"})},R.prototype._getSurveyData=function(){this.sv.isExpired()?this.networkError.fire({type:"expired"}):this.cors.ready.subscribe(t.proxy(function(){var e={mid:this.sv.cfg.mid,cachebust:(new Date).getTime()};this.sv.cfg.version&&(e.version=this.sv.cfg.version),this._surveyTimer=setTimeout(t.proxy(function(){this.networkError.fire({type:"timedout"})},this),1e4),this.cors.send({url:this.sv.cfg.datauri,data:e,method:"GET",skipEncode:!1,success:t.proxy(function(e){this.networkError.didFire||(clearTimeout(this._surveyTimer),this.sv.SurveyData.fire(e,t.proxy(function(e){this.survey=e,this.renderSurvey()},this)))},this),failure:t.proxy(function(e){this.networkError.didFire||this.networkError.fire({type:"getdata_failed"})},this)})},this),!0,!0)},R.prototype._postSurveyData=function(e){if(this.cfg.preview)return void t.nextTick(function(){e&&e()});var i=JSON.parse(this.sv._serialize());a.onFeedbackSubmitted.fire(t.ext({rating:this.sv._getScore()},i)),this._surveyTimer=setTimeout(t.proxy(function(){this.networkError.fire({type:"timedout"})},this),1e4),this.cors.send({method:"POST",url:this.cfg.posturi,data:i,contentType:"application/json",success:t.proxy(function(t){clearTimeout(this._surveyTimer),e&&e()},this),failure:t.proxy(function(e){clearTimeout(this._surveyTimer),sessionStorage.setItem("acsFeedbackSubmitted","true"),this.networkError.fire({type:"postdata_failed"})},this)})}}});