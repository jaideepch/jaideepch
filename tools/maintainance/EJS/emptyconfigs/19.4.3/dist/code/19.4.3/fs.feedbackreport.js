/***************************************
* @preserve
* ForeSee Web SDK: Feedback Reporting UI
* Built April 27, 19 22:00:31
* Code version: 19.4.3
* Template version: 19.4.3
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"feedbackconfig"],function(e,t,i,config){var s=t.toLowerCase(window.location.href.toString()),n={};if((s.indexOf("buildabear.c")>-1||s.indexOf("bab-dev-store.sparkred.")>-1)&&(n.FBALTPOSITION=!0),(s.indexOf(".peco.c")>-1||s.indexOf(".bge.com")>-1||s.indexOf(".comed.com")>-1)&&(n.FBALTOVERFLOW=!0),!(s.indexOf("argos.co")>-1&&window!==window.top)){s.indexOf("/serve/")>-1&&(n.FBALTSCROLL=!0);var o={remove:function(){this.parentNode&&this.parentNode.removeChild(this)},hasClass:function(e){return this.className.indexOf(e)>-1},addClass:function(e){this.hasClass(e)||(this.className+=" "+e)},removeClass:function(e){this.className=(this.className||"").replace(e,""),this.className=this.className.replace(/[ ]+$/g,"")},$:function(e){return this.querySelectorAll(e)},css:function(e){for(var t in e)e.hasOwnProperty(t)&&(this.style[t]=e[t])}},a=function(e){if("string"==typeof e&&-1==e.indexOf("<"))return document.querySelectorAll(e);if("string"==typeof e){var t=document.createElement("div");t.innerHTML=e,e=t.firstChild}for(var i in o)o.hasOwnProperty(i)&&(e[i]=o[i]);return e},r=function(e,t){return new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');")(t||{})},c=function(e,s){this.cfg=e;var o=this,c="acsFeedbackResultsCounter";this.btncfg=e,this.badgeClicked=new i.FSEvent,this.br=s,this.animationMove=4,this.btncfg.imgsrc=t.makeURI("$templates/feedback/"+e.template+"/"+e.icon),e.counter?(this.isIcon=!1,this.counter=0,sessionStorage.getItem(c)&&(this.counter=Math.round(parseFloat(sessionStorage.getItem(c))),this.counter=isNaN(this.counter)?0:this.counter),this.btncfg.counter=this.counter,this.btncfg.counterLocale=e.counter.toLocaleString()):this.isIcon=!0,this.btncfg.btnClass="_acs _acs"+e.fbtype+"--"+e.template+" _acs"+e.fblocation,this.queue=new i.Async(!0,t.proxy(function(){},this),t.proxy(function(){},this)),this.queue.enqueue(t.proxy(function(s){this._getBtnTemplate(s,t.proxy(function(t){this.btnTemplate=t;var s={btncfg:o.btncfg},c=r(o.btnTemplate,s);this.$el=document.createElement("div"),this.$el.innerHTML=c,this.$el=a(this.$el.querySelectorAll("div._acs")[0]),i.Bind(o.$el,"feedback:click",function(){o._unhover(),o.badgeClicked.fire(e)},this),o.cfg.fbanimate&&(i.Bind(o.$el,"feedback:mouseenter",function(){o._hover()},this),i.Bind(o.$el,"feedback:mouseleave",function(){o._unhover()},this)),document.body.appendChild(this.$el),n&&!n.FBALTPOSITION&&i.addClass(document.documentElement,"fsfb fsfb-relbody"),this.init()},this))},this))};c.prototype._getBtnTemplate=function(e,s){var n=t.makeURI("$templates/feedback/"+(this.template||"default")+"/badge.html"),o="templates_feedback_"+(this.template||"default")+"_";new i.JSONP({success:t.proxy(function(t){s&&s(t),e&&e.resolve()},this)}).get(n,o)},c.prototype._hover=function(){this.busy=!0;var e=this.$el.$("._acsBadgeLabel");if("horizontal"==this.cfg.fbdirection)e&&e.length>0&&(this.cfg.fblocation.indexOf("right")>-1?this.$el.css({right:""}):this.$el.css({left:""}));else{var t=this.$el.offsetHeight,i=this.$el.offsetWidth,s=(i-t)/2;this.cfg.fblocation.indexOf("right")>-1?this.$el.css({right:-s+"px"}):this.$el.css({left:-s+"px"})}},c.prototype._unhover=function(){if(this.cfg.fbanimate&&"horizontal"==this.cfg.fbdirection){var e=this.$el.$("._acsBadgeLabel");e&&e.length>0&&(e=e[0].offsetWidth,this.cfg.fblocation.indexOf("right")>-1?this.$el.css({right:-e+"px"}):this.$el.css({left:-e+"px"}))}else if("vertical"==this.cfg.fbdirection){var t=this.$el.offsetHeight,i=this.$el.offsetWidth,s=(i-t)/2;this.cfg.fblocation.indexOf("right")>-1?this.$el.css({right:-(s+this.animationMove)+"px"}):this.$el.css({left:-(s+this.animationMove)+"px"})}this.busy=!1},c.prototype._positionVertical=function(e){var t=this.$el.offsetHeight,i=this.$el.offsetWidth,s=(i-t)/2,n=this.$el.offsetTop,o="innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight;this.cfg.fblocation.indexOf("top")>-1?this.$el.css({top:n+i+"px"}):this.cfg.fblocation.indexOf("bottom")>-1&&this.$el.css({bottom:o-n+t+"px"}),this.cfg.fblocation.indexOf("right")>-1?this.$el.css({right:-(s+this.animationMove)+"px"}):this.$el.css({left:-(s+this.animationMove)+"px"})},c.prototype.init=function(e){var t=this.$el.$("._acsBadgeLabel"),s=this,n=s.cfg;if(this.$el.css({visibility:"hidden"}),t&&t.length>0){if(e){if(s._unhover(),this.isIcon&&n.icon)i.imgInfo("templates/"+(n.template||"default")+"/"+n.icon,function(t){return function(i,n){setTimeout(function(){s._unhover(),setTimeout(function(){t.addClass("_acsAnimate"),e()},100),s._unhover()},100)}}(this.$el));else{s._unhover();var o=this.$el;setTimeout(function(){s._unhover(),setTimeout(function(){o.addClass("_acsAnimate"),e()},250)},250)}"vertical"==this.cfg.fbdirection&&(this.cfg.fblocation.indexOf("right")>-1?this.$el.addClass("_acsVertical_right"):this.$el.addClass("_acsVertical_left"),this._positionVertical()),this.cfg.fbfixed&&this.$el.addClass("_acsFixed")}this.$el.css({visibility:"visible"}),this.$el.css({opacity:1})}},c.prototype.setCounter=function(e){this.numTween&&(this.numTween.stop(),this.counter=this.numTween.val);var i=a(this.$el.$("._acsCounterInner")[0]);i.hasClass("_acsNum")||i.addClass("_acsNum"),this.numTween=new d(this.counter,e,t.proxy(function(e){i.innerHTML=Math.round(e).toLocaleString()},this)),this.numTween.go(1e3),sessionStorage.setItem("acsFeedbackResultsCounter",e)},c.prototype.disableCounter=function(){var e,i=this.cfg;if(this.$el&&(e=this.$el.$("._acsBadgeImg")[0]),e){var s=a(this.$el.$("._acsCounterInner")[0]);s&&s.hasClass("_acsNum")&&s.removeClass("_acsNum")}!e&&this.$el&&(this.$el.$("._acsCounterInner")[0].innerHTML="",a(this.$el.$("._acsCounterInner")[0]).css({background:"none"}),i.icon&&(e=a('<img style="position: relative;top: -2px;height: 19px;" src="'+t.makeURI("$templates/feedback/"+(i.template||"default")+"/"+i.icon)+'" class="_acsBadgeImg">'),this.$el.$("._acsCounterInner")[0].appendChild(e)))},c.prototype.enableCounter=function(){this.$el&&(this.$el.$("._acsCounterInner")[0].innerHTML="0",a(this.$el.$("._acsCounterInner")[0]).css({background:"#F87473"}))},c.prototype.remove=function(){this.$el.parentNode.removeChild(this.$el)};var h=function(e,t){this.br=e,this.cfg=t};h.prototype.platformOK=function(){var e=this.cfg,t=this.br;return!(e.browser_cutoff[t.browser.name]&&t.browser.actualVersion<e.browser_cutoff[t.browser.name])&&!(e.platform_cutoff[t.os.name]&&t.os.version<e.platform_cutoff[t.os.name])};var l=function(e,t){this.br=e,this.ready=new i.FSEvent,this.didInitialize=!1,this.didBuildUI=!1,this.cfg={counter:!0,label:"ForeSee",fbtype:"report",fblocation:"topright",template:"default",icon:"aspark100.png"},void 0===t&&config.instances[0]&&config.instances[0].reporturi?this.cfg.reporturi=config.instances[0].reporturi:this.cfg.reporturi=t.reporturi,console.log("config is - ",this.cfg)};l.prototype.initialize=function(){i.loadCSS(t.makeURI("$templates/feedback/default/fs.feedback.css"),t.proxy(function(e,t){this.didInitialize=!0,this.ready.fire()},this),null,this.br)},l.prototype.run=function(){this.didBuildUI||(this.wasLoggedInEver=!1,this._addiFrame(),this._addReportBadge(),i.Bind(window,"feedback:message",t.proxy(this.onMessageReceived,this)),this.didBuildUI=!0)},l.prototype.onMessageReceived=function(e){var t=e.data;t.location?sessionStorage.setItem("acsFeedbackRoute",t.location):!0===t.isLoggedIn?(this.badge.enableCounter(),this.wasLoggedInEver=!0,this.frame.contentWindow.postMessage({wPageUrl:window.location.toString()},"*")):!1===t.isLoggedIn?("true"===sessionStorage.getItem("acsReportFrameVisible")?this.showiFrame():(this.removeReport(),sessionStorage.setItem("acsFeedbackLoaded","false")),this.badge.disableCounter()):void 0!==t.feedbackResponses&&this.badge.setCounter(t.feedbackResponses)},l.prototype.removeReport=function(e){this.container.removeClass("acsVisibleFrame"),sessionStorage.setItem("acsReportFrameVisible","false")},l.prototype._addReportBadge=function(){this.badge||(this.badge=new c(this.cfg,this.br),this.badge.badgeClicked.subscribe(t.proxy(function(){this.showiFrame()},this)))},l.prototype.showiFrame=function(){this.didBuildUI&&(this.container.addClass("acsVisibleFrame"),sessionStorage.setItem("acsReportFrameVisible","true"))},l.prototype._addiFrame=function(){var e=document;if(!this.didBuildUI){this.container=a('<div class="acsFrameContainer--default"></div>'),"true"==sessionStorage.getItem("acsReportFrameVisible")&&this.container.addClass("acsVisibleFrame"),this.closeBtn=a('<a href="#" class="acsReportCloseBtn" title="Close"><span class="material-icons">&#xE5CD;</span></a>'),i.Bind(this.closeBtn,"feedback:click",t.proxy(function(e){return e.preventDefault(),this.removeReport(e),!1},this)),this.frame=a('<iframe class="acsReportFrame" frameBorder="0" allowfullscreen></iframe>'),this.frame.src=this.cfg.reporturi||sessionStorage.getItem("acsFeedbackRoute"),i.Bind(this.frame,"feedback:load",t.proxy(function(e){var t={};t.wIsLoggedIn="GET",this.frame.contentWindow&&this.frame.contentWindow.postMessage(t,"*")},this)),this.container.appendChild(this.frame),this.container.appendChild(this.closeBtn),e.body.appendChild(this.container);var s=function(e){e=e||window.event,e.preventDefault&&e.preventDefault(),e.returnValue=!1};i.Bind(this.container,"feedback:mouseenter",t.proxy(function(e){window.addEventListener&&window.addEventListener("DOMMouseScroll",s,!1),window.onmousewheel=document.onmousewheel=s},this)),i.Bind(this.container,"feedback:mouseleave",t.proxy(function(e){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",s,!1),window.onmousewheel=document.onmousewheel=document.onkeydown=null},this))}};var f=function(e){function s(e){for(n=0;n<e.length;n++)if(i.testAgainstSearch(e[n],o))return!0;return!1}var n,o=window._acsURL||window.location.toString().split("#acscommand=feedbackreport").join("");return o=t.toLowerCase(o),(!e.whitelistActive||s(e.whitelistData))&&(!e.blacklistActive||!s(e.blacklistData))},d=function(e,t,i){this.from=e,this.to=t,this.diff=this.to-this.from,this.callback=i||function(){}};d.prototype={_tween:function(e){return--e*e*e+1},go:function(e){this.stop(),this.tm=e,this.startTime=new Date,this.timer=setInterval(t.proxy(function(){var e=new Date,t=e-this.startTime,i=Math.min(t/this.tm,1),s=this._tween(i);i>=1&&(clearInterval(this.timer),this.timer=null),this.val=s*this.diff+this.from,this.callback(this.val)},this),20)},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}},config=t.ext({browser_cutoff:{IE:9,Safari:4,Firefox:11,Chrome:20,Opera:1e3},platform_cutoff:{Android:99,Winphone:99,iPod:99,iPhone:99,iPad:99}},config),t.domReady(function(){var e=new i.Browser,s=config.instances;s&&e.ready.subscribe(function(){if(new h(e,config).platformOK()){for(var i,n=0;n<s.length;n++){var o=s[n];if(o.topics&&o.topics.length)for(var a=0;a<o.topics.length;a++)if(f(o.topics[a])&&!o.disabled){i=o;break}if(i)break}var r=new l(e,i);r.ready.subscribe(t.proxy(function(){r.run()},this)),r.initialize()}},!0,!0)})}});