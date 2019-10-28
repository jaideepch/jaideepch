/***************************************
* @preserve
* ForeSee Web SDK: Feedback Reporting UI
* Built April 27, 19 21:30:30
* Code version: 19.7.4
* Template version: 19.7.4
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"feedbackconfig"],function(e,fs,utils,r){var t=fs.toLowerCase(window.location.href.toString()),c={};if((-1<t.indexOf("buildabear.c")||-1<t.indexOf("bab-dev-store.sparkred."))&&(c.FBALTPOSITION=!0),(-1<t.indexOf(".peco.c")||-1<t.indexOf(".bge.com")||-1<t.indexOf(".comed.com"))&&(c.FBALTOVERFLOW=!0),!(-1<t.indexOf("argos.co")&&window!==window.top)){-1<t.indexOf("/serve/")&&(c.FBALTSCROLL=!0);var s={remove:function(){this.parentNode&&this.parentNode.removeChild(this)},hasClass:function(e){return-1<this.className.indexOf(e)},addClass:function(e){this.hasClass(e)||(this.className+=" "+e)},removeClass:function(e){this.className=(this.className||"").replace(e,""),this.className=this.className.replace(/[ ]+$/g,"")},$:function(e){return this.querySelectorAll(e)},css:function(e){for(var t in e)e.hasOwnProperty(t)&&(this.style[t]=e[t])}},d=function(e){if("string"==typeof e&&-1==e.indexOf("<"))return document.querySelectorAll(e);if("string"==typeof e){var t=document.createElement("div");t.innerHTML=e,e=t.firstChild}for(var i in s)s.hasOwnProperty(i)&&(e[i]=s[i]);return e},i=function(o,e){this.cfg=o;var a=this,t="acsFeedbackResultsCounter";this.btncfg=o,this.badgeClicked=new utils.FSEvent,this.br=e,this.animationMove=4,o.counter&&(this.counter=0,sessionStorage.getItem(t)&&(this.counter=Math.round(parseFloat(sessionStorage.getItem(t))),this.counter=isNaN(this.counter)?0:this.counter),this.btncfg.counter=this.counter,this.btncfg.counterLocale=o.counter.toLocaleString()),this.btncfg.btnClass="_acs _acs"+o.fbtype+"--"+o.template+" _acs"+o.fblocation,this.btncfg.fbsize=this.cfg.fbsize||"medium",this.btncfg.btnClass="_acs _acs"+o.fbtype+"--"+o.template+" _acsbadge--"+this.btncfg.fbsize+" _acs"+o.fblocation,this.btncfg.fbcolortext=this.btncfg.fbcolortext||"#fff",this.queue=new utils.Async(!0,function(){}.bind(this),function(){}.bind(this)),this.queue.enqueue(function(e){this._getBtnTemplate(e,function(e){this.btnTemplate=e;var t,i,s={btncfg:a.btncfg},n=(t=a.btnTemplate,i=s,new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');")(i||{}));this.$el=document.createElement("div"),this.$el.innerHTML=n,this.$el=d(this.$el.querySelectorAll("div._acs")[0]),utils.Bind(a.$el,"feedback:click",function(){a._unhover(),a.badgeClicked.fire(o)},!0),utils.Bind(a.$el,"feedback:keypress",function(e){var t=utils.getKeyCode(e);"enter"!==t&&" "!==t&&"spacebar"!==t||(a._unhover(),a.badgeClicked.fire(a.cfg))},!0),a.cfg.fbanimate&&(utils.Bind(a.$el,"feedback:mouseenter",function(){a._hover()},!0),utils.Bind(a.$el,"feedback:mouseleave",function(){a._unhover()},!0)),document.body.appendChild(this.$el),c&&!c.FBALTPOSITION&&utils.addClass(document.documentElement,"fsfb fsfb-relbody"),this.init()}.bind(this))}.bind(this))};i.prototype._getBtnTemplate=function(t,i){var e=fs.makeURI("$templates/feedback/"+(this.template||"default")+"/badge.html"),s="templates_feedback_"+(this.template||"default")+"_";new utils.JSONP({success:function(e){i&&i(e),t&&t.resolve()}.bind(this)}).get(e,s)},i.prototype._hover=function(){this.cfg.fbanimate&&this.$el.addClass("_acsHover")},i.prototype._unhover=function(){this.cfg.fbanimate&&this.$el.removeClass("_acsHover")},i.prototype.init=function(e){var t=this.$el.$("._acsBadgeLabel");this.cfg;if(this.$el.css({visibility:"hidden"}),t&&0<t.length){this.$el;this._unhover(),this.$el.addClass("_acsAnimate"),"vertical"==this.cfg.fbdirection&&(-1<this.cfg.fblocation.indexOf("right")?this.$el.addClass("_acsVertical_right"):this.$el.addClass("_acsVertical_left")),this.cfg.fbfixed&&this.$el.addClass("_acsFixed")}this.$el.css({visibility:"visible"}),this.$el.css({opacity:1}),e&&e()},i.prototype.setCounter=function(e){void 0===e&&(e=0),d(this.$el.$("._acsCounterInner")[0]).innerHTML=Math.round(e).toLocaleString(),sessionStorage.setItem("acsFeedbackResultsCounter",e)},i.prototype.disableCounter=function(){this.cfg;this.$el&&this.$el.$("._acsBadgeImg")[0]},i.prototype.enableCounter=function(){this.$el&&(this.$el.$("._acsCounterInner")[0].innerHTML="0",d(this.$el.$("._acsCounterInner")[0]).css({background:"#F87473"}))},i.prototype.remove=function(){this.$el.parentNode.removeChild(this.$el)};var l=function(e,t){this.br=e,this.cfg=t};l.prototype.platformOK=function(){var e=this.cfg,t=this.br;return!(e.browser_cutoff[t.browser.name]&&t.browser.actualVersion<e.browser_cutoff[t.browser.name])&&!(e.platform_cutoff[t.os.name]&&t.os.version<e.platform_cutoff[t.os.name])};var f=function(e,t){this.br=e,this.ready=new utils.FSEvent,this.didInitialize=!1,this.didBuildUI=!1,this.cfg={counter:!0,label:"ForeSee",fbtype:"report",fblocation:"topright",template:"default",icon:"aspark100.png"},void 0===t&&r.instances[0]&&r.instances[0].reporturi?this.cfg.reporturi=r.instances[0].reporturi:this.cfg.reporturi=t.reporturi};f.prototype.initialize=function(){utils.loadCSS(fs.makeURI("$templates/feedback/default/main.css"),function(e,t){this.didInitialize=!0,this.ready.fire()}.bind(this),null,this.br)},f.prototype.run=function(){this.didBuildUI||(this.wasLoggedInEver=!1,this._addiFrame(),this._addReportBadge(),utils.Bind(window,"feedback:message",this.onMessageReceived.bind(this)),this.didBuildUI=!0)},f.prototype.onMessageReceived=function(e){var t=e.data;t.location?sessionStorage.setItem("acsFeedbackRoute",t.location):!0===t.isLoggedIn?(this.badge.enableCounter(),this.wasLoggedInEver=!0,this.frame.contentWindow.postMessage({wPageUrl:window.location.toString()},"*")):!1===t.isLoggedIn?("true"===sessionStorage.getItem("acsReportFrameVisible")?this.showiFrame():(this.removeReport(),sessionStorage.setItem("acsFeedbackLoaded","false")),this.badge.disableCounter()):void 0!==t.feedbackResponses&&this.badge.setCounter(t.feedbackResponses)},f.prototype.removeReport=function(e){this.container.removeClass("acsVisibleFrame"),sessionStorage.setItem("acsReportFrameVisible","false")},f.prototype._addReportBadge=function(){this.badge||(this.badge=new i(this.cfg,this.br),this.badge.badgeClicked.subscribe(function(){this.showiFrame()}.bind(this)))},f.prototype.showiFrame=function(){this.didBuildUI&&(this.container.addClass("acsVisibleFrame"),sessionStorage.setItem("acsReportFrameVisible","true"))},f.prototype._addiFrame=function(){var e=document;if(!this.didBuildUI){this.container=d('<div class="acsFrameContainer--default"></div>'),"true"==sessionStorage.getItem("acsReportFrameVisible")&&this.container.addClass("acsVisibleFrame"),this.closeBtn=d('<a href="#" class="acsReportCloseBtn" title="Close"><span class="material-icons">&#xE5CD;</span></a>'),utils.Bind(this.closeBtn,"feedback:click",function(e){return e.preventDefault(),this.removeReport(e),!1}.bind(this)),this.frame=d('<iframe class="acsReportFrame" frameBorder="0" allowfullscreen></iframe>'),this.frame.src=this.cfg.reporturi||sessionStorage.getItem("acsFeedbackRoute"),utils.Bind(this.frame,"feedback:load",function(e){var t={wIsLoggedIn:"GET"};this.frame.contentWindow&&this.frame.contentWindow.postMessage(t,"*")}.bind(this)),this.container.appendChild(this.frame),this.container.appendChild(this.closeBtn),e.body.appendChild(this.container);var t=function(e){(e=e||window.event).preventDefault&&e.preventDefault(),e.returnValue=!1};utils.Bind(this.container,"feedback:mouseenter",function(e){window.addEventListener&&window.addEventListener("DOMMouseScroll",t,!1),window.onmousewheel=document.onmousewheel=t}.bind(this)),utils.Bind(this.container,"feedback:mouseleave",function(e){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",t,!1),window.onmousewheel=document.onmousewheel=document.onkeydown=null}.bind(this))}};var h=function(e){var t,i=window._acsURL||window.location.toString().split("#acscommand=feedbackreport").join("");function s(e){if(!Array.isArray(e))return!1;for(t=0;t<e.length;t++)if(utils.testAgainstSearch(e[t],i))return!0;return!1}return i=fs.toLowerCase(i),(!e.whitelistActive||s(e.whitelistData))&&(!e.blacklistActive||!s(e.blacklistData))};r=fs.ext({browser_cutoff:{Edge:1,IE:11,Safari:4,Firefox:30,Chrome:20,Opera:1e3},platform_cutoff:{Android:99,Winphone:99,iPod:99,iPhone:99,iPad:99}},r),fs.domReady(function(){var o=new utils.Browser,a=r.instances;a&&o.ready.subscribe(function(){if(new l(o,r).platformOK()){for(var e,t=0;t<a.length;t++){var i=a[t];if(i.topics&&i.topics.length)for(var s=0;s<i.topics.length;s++)if(h(i.topics[s])&&!i.disabled){e=i;break}if(e)break}var n=new f(o,e);n.ready.subscribe(function(){n.run()}.bind(this)),n.initialize()}},!0,!0)})}});