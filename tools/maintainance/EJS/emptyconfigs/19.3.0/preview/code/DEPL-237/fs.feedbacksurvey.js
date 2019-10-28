/***************************************
* @preserve
* ForeSee Web SDK: Feedback Standalone Survey
* Built February 06, 17 18:46:10
* Code version: DEPL-237
* Template version: 19.3.0
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),_fsNormalizeUrl("$fs.survey.js"),_fsNormalizeUrl("gatewayconfig.min.js")],function(e,t,i,r,n){function s(e,t,r,n){if(h[e])return h[e].success.subscribe(t||function(){},!0,!0),void h[e].fail.subscribe(r||function(){},!0,!0);var s,o,a,c=!1;this.count=this.count?++this.count:1,s=this.count,o="load-css-"+s,a=document.createElement("link"),a.setAttribute("id",o),a.setAttribute("rel","stylesheet"),a.setAttribute("type","text/css");var u={link:a,url:e,didfail:!1,didsucceed:!1,success:new i.FSEvent,fail:new i.FSEvent};return u.success.subscribe(t,!0,!0),u.fail.subscribe(r,!0,!0),h[e]=u,"undefined"!=typeof a.addEventListener?"Android"==n.os.name&&n.os.version<4.4?setTimeout(function(){c=!0,u.didsucceed=!0,u.success.fire(a)},250):(a.addEventListener("load",function(){c=!0,u.didsucceed=!0,u.success.fire(a)},!1),a.addEventListener("error",function(){u.didfail=!0,u.fail.fire(a)},!1)):"undefined"!=typeof a.attachEvent&&a.attachEvent("onload",function(){var e,t,i=document.styleSheets.length;try{for(;i--;)if(t=document.styleSheets[i],t.id===o)return e=t.cssText,c=!0,u.didsucceed=!0,void u.success.fire(a)}catch(e){}c||(u.didfail=!0,u.fail.fire(a))}),document.getElementsByTagName("head")[0].appendChild(a),a.setAttribute("href",e),a}var config={};config={a:1};/**
   * @preserve
   * @@CONFIG_GOES_HERE@@
   */
var o={remove:function(){this.parentNode&&this.parentNode.removeChild(this)},hasClass:function(e){return this.className.indexOf(e)>-1},addClass:function(e){this.hasClass(e)||(this.className+=" "+e)},removeClass:function(e){this.className=(this.className||"").replace(e,""),this.className=this.className.replace(/[ ]+$/g,"")},$:function(e){return this.querySelectorAll(e)},css:function(e){for(var t in e)e.hasOwnProperty(t)&&(this.style[t]=e[t])}},a=function(e){if("string"==typeof e&&e.indexOf("<")==-1)return document.querySelectorAll(e);if("string"==typeof e){var t=document.createElement("div");t.innerHTML=e,e=t.firstChild}for(var i in o)o.hasOwnProperty(i)&&(e[i]=o[i]);return e},c=function(){this.$el=a('<img src="'+_fsNormalizeUrl("$loader.gif")+'" class="acs-loader">'),this.moveOffScreen()};c.prototype.center=function(){var e=i.getSize(window),t=i.getScroll(window),r=this.$el.offsetWidth,n=this.$el.offsetHeight;this.$el.css({left:(e.w-r)/2+"px",top:(e.h-n)/2+t.y+"px",opacity:1,position:"absolute"})},c.prototype.moveOffScreen=function(){this.$el.css({left:"-999px",top:"-999px",opacity:0})},c.prototype.remove=function(){this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)};var u="Func",f="ion",l=function(e,t){var i;return i=new window[u+"t"+f]("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"),t?i(t):i};i.eitherOr=function(e,t,i){return e[t]||e[i]},t.isDefined=function(e){return null!==e&&"undefined"!=typeof e},t.isFunction=function(e){return"function"==typeof e},t.isObject=function(e){return"object"==typeof e},t.isArray=function(e){return"[object Array]"==Object.prototype.toString.call(e)},i.escapeRegExp=function(e){return e.toString().replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")},i.trim=function(e){return e.toString().replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")},t.proxy=function(e,t){var i,r,n=Function.prototype.bind,s=Array.prototype.slice;return n&&e.bind===n?n.apply(e,s.call(arguments,1)):(i=s.call(arguments,2),r=function(){if(!(this instanceof r))return e.apply(t,i.concat(s.call(arguments)));ctor.prototype=e.prototype;var n=ctor();ctor.prototype=null;var o=e.apply(n,i.concat(s.call(arguments)));return Object(o)===o?o:n})},t.dispose=function(e){if(e){if(e.length)for(var t=e.length-1;t>=0;t--)e[t]=null;for(var i in e){var r=typeof e[i];"function"!=r&&"object"!=r||(e[i]=null)}}e=null},t.ext=function(){var e,i,r,n=arguments,s=n[0]||{},o=1,a=arguments.length;for("object"==typeof s||t.isFunction(s)||(s={}),a===o&&(s=this,--o);o<a;o++)if(t.isDefined(e=n[o]))for(i in e)r=e[i],s!==r&&void 0!==r&&(s[i]=r);return s},t.toQueryString=function(e,i){var r,n=t.isDefined(i)?i+(i.indexOf("?")>-1?"&":"?"):"";if(e)for(var s in e)r=e[s],t.isString(r)||(r=JSON.stringify(r)),n+=t.enc(s)+"="+t.enc(r)+"&";return n},i.hashCode=function(e){var t,i=0,r="";if(0===e.length)return i;for(t=0;t<e.length;t++)r=e.charCodeAt(t),i=(i<<5)-i+r,i&=i;return i},i.copyIfDefined=function(e,r,n){for(var s,o=e.split("."),a=r[i.shift(o)],c=n;t.isDefined(a)&&o.length>0;)a=a[i.shift(o)];if(a){for(o=e.split(".");o.length&&(s=i.shift(o));)c=c[s]?c[s]:c[s]={};for(o=e.split("."),c=n;o.length&&(s=i.shift(o));)o.length>0?c=c[s]:c[s]=a}},i.merge=function(){for(var e={},r=arguments,n=0,s=r.length;n<s;n++){var o=r[n];if(t.isPlainObject(o))for(var a in o){var c=o[a],u=e[a];e[a]=u&&t.isPlainObject(c)&&t.isPlainObject(u)?i.merge(u,c):i.unlink(c)}}return e},i.unlink=function(e){var r;if(t.isPlainObject(e)){r={};for(var n in e)r[n]=i.unlink(e[n])}else if(t.isArray(e)){r=[];for(var s=0,o=e.length;s<o;s++)r[s]=i.unlink(e[s])}else r=e;return r},t.isPlainObject=function(e){if(!e||"[object Object]"!==Object.prototype.toString.call(e)||e.nodeType||e.setInterval)return!1;if(e.constructor&&!hasOwnProperty.call(e,"constructor")&&!hasOwnProperty.call(e.constructor.prototype,"isPrototypeOf"))return!1;var t;for(t in e);return void 0===t||hasOwnProperty.call(e,t)||!hasOwnProperty.call(e,t)&&hasOwnProperty.call(Object.prototype,t)};var h={},p={cxrid:t.getParam("cxrid"),cxrurl:t.getParam("cxrurl"),processImmediate:function(){if(p.cxrid&&p.cxrurl){var e=new i.AjaxTransport;e.send({method:"GET",url:i.sign(p.cxrurl+"process/"+t.enc(p.cxrid)),failure:t.proxy(function(e){},this),success:t.proxy(function(e){},this)})}}},d=function(e){this.ns=e};d.prototype={set:function(e,t){var i=JSON.parse(localStorage.getItem(this.ns)||"{}");i[e]=t,localStorage.setItem(this.ns,JSON.stringify(i))},get:function(e){var t=JSON.parse(localStorage.getItem(this.ns)||"{}");return t[e]},all:function(){var e=JSON.parse(localStorage.getItem(this.ns)||"{}");return e}};var v=function(e,n,s){var o,u=e.mid||t.getParam("mid"),f=t.getParam("cpps"),l="IE"==n.browser.name&&n.browser.version<9,h=t.getParam("ns");if(this.cpps=new d(h),this.networkError=new i.FSEvent,f&&f.length>2){f=JSON.parse(decodeURIComponent(i.Compress.decompress(f)));for(var p in f)this.cpps.set(p,f[p])}if(this.br=n,this.didSubmit=!1,this.loader=new c,document.body.appendChild(this.loader.$el),e&&e.instances&&e.instances.length)for(var v=0;v<e.instances.length;v++)if(e.instances[v].mid==u){o=this.cfg=e.instances[v];break}if("undefined"==typeof o&&(e.preview||"preview"===h)){var y=t.getParam("datauri"),m=t.getParam("template")||"default";o=this.cfg={mid:u,datauri:y,posturi:"",reporturi:"",surveytype:"popup",autowhitelist:!0,preview:!0,template:m,replay:!1}}if(o){var g=this;document.title=this.cfg.label,this.jrny=s,this.sv=new r.SurveyBuilder(this.cfg,this.cpps,this.br),this.sv.cfg.privacyuri=this.sv.cfg.privacyuri?this.sv.cfg.privacyuri:"http://www.foresee.com/about-us/privacy-policy/",this.sv.cfg.privacytext=this.sv.cfg.privacytext?this.sv.cfg.privacytext:"Privacy policy",this.$content=a('<div class="acsMainContainerMobile--'+o.template+(l?" ie8":"")+'"></div>'),n.isMobile&&g.jrny.addEventObj({name:"feedback_clicked",properties:{mid:[g.cfg.mid]}}),this.networkError.subscribe(t.proxy(function(e){e&&e.type?g.jrny.addEventObj({name:"survey_"+e.type,properties:{mid:[g.cfg.mid]}}):g.jrny.addEventObj({name:"server_error",properties:{mid:[g.cfg.mid]}}),this.renderError(e.type)},this)),this.initQ=new i.Async((!0),t.proxy(function(){this._getTemplatesAndRender()},this),t.proxy(function(){window.close()},this)),this.initQ.enqueue(t.proxy(function(e){this._getCSS(e)},this)),this.initQ.enqueue(t.proxy(function(e){this._getTemplate("serviceunavailable",e,t.proxy(function(e){this.errTemplate=e},this))},this))}i.Bind(window,"unload",function(){g.didSubmit||g.jrny.addEventObj({name:"feedback_abandoned",properties:{mid:[g.cfg.mid]}})})};v.prototype._getTemplatesAndRender=function(){var e=new i.Async((!0),t.proxy(function(){this.renderSurvey()},this),t.proxy(function(){this.renderError()},this));e.enqueue(t.proxy(function(e){this._getSurveyData(t.proxy(function(t){this.survey=t,e.resolve()},this))},this)),e.enqueue(t.proxy(function(e){this._getTemplate("epilogue",e,t.proxy(function(e){this.epTemplate=e},this))},this)),e.enqueue(t.proxy(function(e){this._getTemplate("surveycontents",e,t.proxy(function(e){this.svContentsTemplate=e},this))},this)),e.enqueue(t.proxy(function(e){i.Healthy(this.br,["survey","static"],e.resolve,e.error)},this))},v.prototype._getCSS=function(e){s(_fsNormalizeUrl("$templates/feedback/"+(this.sv.cfg.template||"default")+"/fs.feedback.css"),function(t){t?e.resolve():e.error()},null,this.br)},v.prototype._getTemplate=function(e,r,n){var s=this.cfg.template||"default",o=_fsNormalizeUrl("$templates/feedback/"+s+"/"+e+".html"),a=new i.JSONP({success:t.proxy(function(e){n(e),r&&r.resolve()},this),failure:t.proxy(function(e){r&&r.error()},this)});a.get(o,"templates_feedback_"+s+"_")},v.prototype._showThankyou=function(){var e=this,t=l(this.epTemplate,this.survey);e.didSubmit=!0,this.$content.innerHTML=t;for(var r=this.$content.$("h1"),n=0;n<r.length;n++)a(r[n]).addClass("acs-feedback__heading acs-feedback__heading--h1");var s=this.$content.$(".acs-close-button")[0];this.cfg.preview||i.Bind(s,"click",function(){window.close()}),window.location.hash="acsSurveyComplete",this.hideLoad()},v.prototype.showLoad=function(){this.loader.center(),this.$content.css({opacity:0})},v.prototype.hideLoad=function(){this.loader.moveOffScreen(),this.$content.css({opacity:1})},v.prototype.renderSurvey=function(){var e=this;e.jrny.addEventObj({name:"survey_shown",properties:{mid:[e.cfg.mid]}});var r=a("#acsPleaseWaitTable")[0];r.parentNode.removeChild(r),this.survey.ansLogoSrc="undefined"!=typeof acs?_fsNormalizeUrl("p_b_foresee.svg"):"p_b_foresee.svg";var n=l(this.svContentsTemplate,this.survey);this.$content.innerHTML=n,window.document.body.appendChild(this.$content),this.sv.bind(this.$content),this.sv.SubmitClicked.subscribe(t.proxy(function(){this.showLoad(),e.jrny.addEventObj({name:"feedback_submitted",properties:{mid:[e.cfg.mid]}}),i.Healthy(this.br,["survey","static"],t.proxy(function(){this._postSurveyData(t.proxy(function(e){e?(this.cfg.preview||p.processImmediate(),this._showThankyou()):this.networkError.fire({type:"postdata_failed"})},this))},this),t.proxy(function(){this.networkError.fire({type:"postdata_failed"})},this))},this)),this.hideLoad()},v.prototype.renderError=function(e){this.$content.innerHTML=l(this.errTemplate,this.sv);var t=this.$content.$(".acs-serviceunavailable__message")[0];if("expired"===e){for(;t.firstChild;)t.removeChild(t.firstChild);this.sv.cfg.fbexpiremessage?t.appendChild(a("<p>"+this.sv.cfg.fbexpiremessage+"</p>")):t.appendChild(a(this._unencodeHTML(this.sv.defaultCfg.expired)))}else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(a(this._unencodeHTML(this.sv.defaultCfg.unavailable)))}document.body.appendChild(this.$content);for(var r=this.$content.$("h3"),n=0;n<r.length;n++)a(r[n]).addClass("acs-feedback__heading acs-feedback__heading--h1");var s=this.$content.$(".acs-close-button")[0];this.cfg.preview||i.Bind(s,"click",function(){window.close()}),this.hideLoad();var o=a("#acsPleaseWaitTable")[0];o&&o.parentNode.removeChild(o)},v.prototype._unencodeHTML=function(e){var t=/&lt;/gi,i=/&gt;/gi;return e.replace(t,"<").replace(i,">")},v.prototype._getSurveyData=function(e){if(this.sv.isExpired())this.networkError.fire({type:"expired"});else{this._surveyTimer=setTimeout(t.proxy(function(){this.networkError.fire({type:"timedout"})},this),1e4);var r=new i.AjaxTransport({url:this.cfg.datauri,method:"GET",success:t.proxy(function(i){this.networkError.didFire||(clearTimeout(this._surveyTimer),this.sv.SurveyData.fire(i,t.proxy(function(t){e&&e(t)},this)))},this),failure:t.proxy(function(e){clearTimeout(this._surveyTimer),this.networkError.fire({type:"getdata_failed"})},this)});r.send({data:{mid:this.cfg.mid,cachebust:(new Date).getTime(),version:this.cfg.version}})}},v.prototype._postSurveyData=function(e){if(this.cfg.preview)return void t.nextTick(function(){e&&e(!0)});this._surveyTimer=setTimeout(t.proxy(function(){this.networkError.fire({type:"timedout"})},this),1e4);var r=new i.AjaxTransport({url:this.sv.cfg.posturi,method:"POST",success:t.proxy(function(t){clearTimeout(this._surveyTimer),e&&e(!0)},this),failure:t.proxy(function(t){clearTimeout(this._surveyTimer),sessionStorage.setItem("acsFeedbackSubmitted","true"),e&&e(!1)},this)});r.send({data:JSON.parse(this.sv._serialize()),skipEncode:!0,contentType:"application/json"})};var y=function(e,t,i){this.from=e,this.to=t,this.diff=this.to-this.from,this.callback=i||function(){}};y.prototype={_tween:function(e){return--e*e*e+1},go:function(e){this.stop(),this.tm=e,this.startTime=new Date,this.timer=setInterval(Utils.bind(function(){var e=new Date,t=e-this.startTime,i=Math.min(t/this.tm,1),r=this._tween(i);i>=1&&(clearInterval(this.timer),this.timer=null),this.val=r*this.diff+this.from,this.callback(this.val)},this),20)},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}},t.winReady(function(){var r=new i.Browser;r.ready.subscribe(function(){var s=t.getParam("cid"),o=t.getParam("mid"),a=t.getParam("uid"),c=new i.Journey(s,o,a,r);n.product.feedback.check(),e(["feedbackconfig"],function(config){new v(config,r,c)})},!0,!0)})});