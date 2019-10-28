/***************************************
* @preserve
* ForeSee Web SDK: Invitation Presenter Plugin
* Built March 01, 17 13:19:31
* Code version: 19.3.3-rc.2
* Template version: 19.3.3-rc.2
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"triggerconfig"],function(e,t,i,config){function s(e,t,i){var s,n,a,o,l=!1;return this.count=this.count?++this.count:1,s=this.count,n="load-css-"+s,a=document.createElement("link"),a.setAttribute("id",n),a.setAttribute("rel","stylesheet"),a.setAttribute("type","text/css"),"undefined"!=typeof a.addEventListener?(a.addEventListener("load",function(){l||(l=!0,o&&clearTimeout(o),t(a))},!1),a.addEventListener("error",function(){o&&clearTimeout(o),i(a)},!1),o=setTimeout(function(){l=!0,t(a)},2e3)):"undefined"!=typeof a.attachEvent&&a.attachEvent("onload",function(){var e,s,o=document.styleSheets.length;try{for(;o--;)if(s=document.styleSheets[o],s.id===n)return e=s.cssText,l=!0,void t(a)}catch(e){}l||i(a)}),document.getElementsByTagName("head")[0].appendChild(a),a.setAttribute("href",e),a}var n,a="Func",o="ion",l=function(e,t){var i;return i=new window[a+"t"+o]("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"),t?i(t):i},r=function(config,e,s,a,o,l,r){this.cfg=config,this.def=t.ext({},e),this.brwsr=s,this.locale=l.get("locale")||"en",this.displayoverride=o,this.lastActiveEl=null,n=r,this.isCustom=n.customInvitationRequested.subscriptions.length>0;var c,d={},u={};if(this.fstr=a,this.inviteStage=0,this.declined=new i.FSEvent,this.declined.subscribe(t.proxy(function(){this._removeEls()},this)),this.abandoned=new i.FSEvent,this.abandoned.subscribe(t.proxy(function(){this._removeEls()},this)),this.accepted=new i.FSEvent,this.completed=new i.FSEvent,this.completed.subscribe(t.proxy(function(e){e&&this._removeEls()},this)),this._inviteEls=[],this.def.display.desktop)for(c=0;c<this.def.display.desktop.length;c++)u=d.dialog||{},d=t.ext({},d),d=t.ext(d,this.def.display.desktop[c]),this.def.display.desktop[c].dialog&&d.dialog&&(d.dialog=t.ext(t.ext({},u),this.def.display.desktop[c].dialog)),this.def.display.desktop[c]=d;if(this.def.display.mobile)for(d={},u={},c=0;c<this.def.display.mobile.length;c++)u=d.dialog||{},d=t.ext({},d),d=t.ext(d,this.def.display.mobile[c]),this.def.display.mobile[c].dialog&&d.dialog&&(d.dialog=t.ext(t.ext({},u),this.def.display.mobile[c].dialog)),this.def.display.mobile[c]=d;var h;if(this.brwsr.isMobile)if(this.displayoverride){for(c=0;c<this.def.display.mobile.length;c++)if(this.def.display.mobile[c].displayname==this.displayoverride){h=this.def.display.mobile[c];break}}else h=this.def.display.mobile[Math.round(999999999999*Math.random())%this.def.display.mobile.length];else if(this.displayoverride){for(c=0;c<this.def.display.desktop.length;c++)if(this.def.display.desktop[c].displayname==this.displayoverride){h=this.def.display.desktop[c];break}}else h=this.def.display.desktop[Math.round(999999999999*Math.random())%this.def.display.desktop.length];h.dialog.locales&&h.dialog.locales[this.locale]&&(h.dialog=t.ext(h.dialog,h.dialog.locales[this.locale])),h=t.ext({inviteLogo:"",trackerLogo:"",siteLogoAlt:""},h),this.display=h,this.template=h.template};return r.prototype.loadResources=function(e){var n=this.display;if(this.isCustom)e();else{var a=t.makeURI("$templates/trigger/"+n.template+"/"+(n.dialog.theme?n.dialog.theme:"main")+".css"),o=t.makeURI("$templates/trigger/"+n.template+"/invite.html"),l=!1,r=!1,c=function(){l&&r&&e&&e()};s(a,t.proxy(function(e){l=!0,this._inviteEls.push(e),c()},this));var d=new i.JSONP({success:t.proxy(function(e){r=!0,this.invitetemplate=e,c()},this)});d.get(o,"templates_trigger_"+n.template+"_")}},r.prototype._validateMobileInput=function(e){var t=document.getElementById("acsEmailSMSInput").value,s=function(e){var t=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return t.test(e)},n=function(e){e=e.split(" ").join("");var t=/^(\+1|1)?[-.]?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;return!!(e.match(t)&&e.length<=15)},a=function(){i.removeClass(document.getElementById("acsInvalidInput"),"acsNoDisplay"),document.getElementById("acsEmailSMSInput").focus()},o=function(){i.addClass(document.getElementById("acsInvalidInput"),"acsNoDisplay"),setTimeout(function(){e(t)},250)};switch(e=e||function(){},this.display.inviteType){case"SMS":n(t)?o():a();break;case"EMAIL":s(t)?o():a();break;case"SMSEMAIL":"mobile"!==this.template.toLowerCase()?s(t)||n(t)?o():a():i.hasClass(document.getElementById("acsEmailSMSInput"),"acsSMSValue")?n(t)?o():a():s(t)?o():a()}},r.prototype._switchToMobileOnExitStageInvite=function(){var e=document.querySelector("#acsMainInvite"),t=document.querySelector("#acsOnExitMobileInvite"),s=document.querySelector("#acsFullScreenContainer");s&&(i.addClass(document.body,"acsFullScreen"),i.addClass(document.documentElement,"acsFullScreen"),i.addClass(s,"acsFullScreen"),i.addClass(t,"acsClassicInvite--fullscreen")),i.addClass(e,"acsNoDisplay"),i.removeClass(t,"acsNoDisplay"),s||document.querySelector("#acsEmailSMSInput").focus(),this.inviteStage+=1},r.prototype._switchToThankYouPage=function(){var e,s=document.getElementById("acsOnExitMobileInvite"),n=document.getElementById("acsOnExitThankYou"),a=document.getElementById("acsFullScreenContainer"),o=document.getElementsByClassName("acsDeclineButton"),l=1e3*Number(this.display.dialog.onexitcounterval)||8e3,r=t.proxy(function(e){i.preventDefault(e),this.completed.fire(!0)},this);if(a){for(var c=0;c<o.length;c++)i.Unbind(o[c],"invite:click"),i.Bind(o[c],"invite:click",r),i.removeClass(o[c],"acsDeclineButton");i.removeClass(a,"__acs__input-clicked"),i.addClass(s,"acsNoDisplay"),i.removeClass(n,"acsNoDisplay"),this.closeTimeOut=setTimeout(t.proxy(function(){this.completed.fire(!0)},this),l+1e3),this.counterInterval=setInterval(t.proxy(function(){var t=document.getElementsByClassName("counter");a&&t&&(e=Number(t[0].innerHTML),t[0].innerHTML=e-1,1===Number(e)&&i.addClass(a,"__acs--complete"))},this),1e3)}this.inviteStage+=1},r.prototype._handleAcceptCurrentStage=function(){var e=document.getElementById("acsFullScreenContainer");switch(this.display.inviteType){case"TRACKER":this.accepted.fire(this.display.inviteType),this.completed.fire(!0),this.returnUserFocus();break;case"INSESSION":this.accepted.fire(this.display.inviteType),this.completed.fire(!0);break;case"SMS":0===this.inviteStage?(this._switchToMobileOnExitStageInvite(),this._trapKeyBoardMobile(e)):1===this.inviteStage&&this._validateMobileInput(t.proxy(function(t){this.accepted.fire(this.display.inviteType,t),e&&this._switchToThankYouPage()},this));break;case"EMAIL":0===this.inviteStage?(this._switchToMobileOnExitStageInvite(),this._trapKeyBoardMobile(e)):1===this.inviteStage&&this._validateMobileInput(t.proxy(function(t){this.accepted.fire(this.display.inviteType,t),e&&this._switchToThankYouPage()},this));break;case"SMSEMAIL":0===this.inviteStage?(this._switchToMobileOnExitStageInvite(),this._trapKeyBoardMobile(e)):1===this.inviteStage&&this._validateMobileInput(t.proxy(function(t){this.accepted.fire(this.display.inviteType,t),e&&this._switchToThankYouPage()},this))}},r.prototype._removeEls=function(){var e=document.getElementById("acsFullScreenContainer"),s=t.proxy(function(){for(clearTimeout(this.closeTimeOut),clearInterval(this.counterInterval),i.removeClass(document.body,"acsFullScreen"),i.removeClass(document.documentElement,"acsFullScreen");this._inviteEls.length>0;){var e=this._inviteEls.pop();e.parentNode.removeChild(e)}i.Unbind("invite:*")},this);e?(i.addClass(e,"__acs--complete"),setTimeout(s,500)):s()},r.prototype._trapKeyBoard=function(e,t,s){i.Bind(document.body,"invite:focus",function(i){i=i||window.event;var n=i.target||i.srcElement;t.contains(n)||e||s&&(i.stopPropagation(),s.focus())},!1)},r.prototype._trapKeyBoardMobile=function(e,t,s){var n,a;0===this.inviteStage?(a=document.getElementById("acsinviteCloseButton"),n=function(i){return!t.contains(i)&&!a.contains(i)||!e}):1===this.inviteStage&&(i.Unbind(document.body,"invite:focus"),t=document.getElementById("acsFullScreenContainer"),s=document.getElementById("acsFirstFocus"),n=function(i){return!t.contains(i)||!e}),i.Bind(document.body,"invite:focus",function(e){e=e||window.event;var t=e.target||e.srcElement;n(t)&&s&&(e.stopPropagation(),s.focus())},!1)},r.prototype.present=function(){i.Healthy(this.brwsr,["survey","static"],t.proxy(function(){i.HealthStatus(this.brwsr,["trust"],t.proxy(function(e){if(this.lastActiveEl||(this.lastActiveEl=document.activeElement),this.isCustom)this.inviteStage=1,n.customInvitationRequested.fire(this.display.inviteType,t.proxy(function(e){this.accepted.fire(this.display.inviteType,e),this.completed.fire(!0)},this),t.proxy(function(){this.declined.fire()},this),t.proxy(function(){this.abandoned.fire()},this));else{this.display.inviteType=this.display.inviteType.toUpperCase();var s=t.ext({supportsSVG:this.brwsr.supportsSVG,isIE8:this.brwsr.isIE&&8==this.brwsr.browser.actualVersion},this.display,this.cfg.config);s.trust=e.trust,s.inviteLogo&&s.inviteLogo.length>0&&(s.inviteLogo=t.makeURI("trigger/"+s.inviteLogo)),s.trackerLogo&&s.trackerLogo.length>0&&(s.trackerLogo=t.makeURI("trigger/"+s.trackerLogo)),s.vendorLogo&&s.vendorLogo.length>0&&(s.vendorLogo=t.makeURI("$"+s.vendorLogo)),s.vendorLogoPNG&&s.vendorLogoPNG.length>0&&(s.vendorLogoPNG=t.makeURI("$"+s.vendorLogoPNG)),s.trusteLogo&&s.trusteLogo.length>0&&(s.trusteLogo=t.makeURI("$"+s.trusteLogo));var a=l(this.invitetemplate,s),o=document.createElement("div");o.innerHTML=a;for(var r=0;r<o.childNodes.length;r++)this._inviteEls.push(o.childNodes[r]),document.body.appendChild(o.childNodes[r]);var c=document.getElementById("acsFocusFirst"),d=document.getElementById("acsEmailSMSInput"),u=function(e){var t;if(e){if(i.hasClass(e,"acsClassicInvite--placeholder"))return e;for(var s=e.parentNode.childNodes,n=0;n<s.length;n++)if(i.hasClass(s[n],"acsClassicInvite--placeholder")){t=s[n];break}if(!t)for(var a=e.childNodes,o=0;o<a.length;o++)if(i.hasClass(a[o],"acsClassicInvite--placeholder")){t=a[o];break}}return t},h=document.getElementById("acsMainInvite"),p=document.getElementById("acsFullScreenContainer");if(c&&c.focus(),this.brwsr.isMobile?this._trapKeyBoardMobile(p,h,c):this._trapKeyBoard(p,h,c),s.isIE8){var m=document.querySelectorAll(".acsIE8VerticalCenter");if(m.length>0){var v=function(){for(var e=0;e<m.length;e++){var t=m[e],i=t.parentNode,s=i.offsetHeight,n=t.offsetHeight;t.style.top=(s-n)/2+"px"}};v(),setInterval(v,500)}}for(var f=document.querySelectorAll(".acsDeclineButton"),y=t.proxy(function(e){i.preventDefault(e),this.declined.fire("INVITE_DECLINED_BTN"),this.returnUserFocus()},this),g=0;g<f.length;g++)i.Bind(f[g],"invite:click",y);for(var E=document.querySelectorAll(".acsAcceptButton"),b=document.getElementsByClassName("acsSubmitBtn"),I=document.getElementsByClassName("acsClassicInvite--fullscreen__container"),C=document.getElementsByClassName("acsClassicInner--description"),S=t.proxy(function(e){var t=e.target||e.srcElement;if(p){i.addClass(I[0],"acsClassicInvite--fullscreen__input-clicked");var s=u(t);s&&i.addClass(s,"acsClassicInvite--placeholder__clicked"),i.addClass(p,"__acs__input-clicked")}},this),_=t.proxy(function(e){var t=e.target||e.srcElement,s=t.value.replace(/\s/g,""),n=e.keyCode||e.which;s.length>0&&27!==n&&i.hasClass(b[0],"acsClassicInner--btn__grey")&&i.removeClass(b[0],"acsClassicInner--btn__grey")},this),k=t.proxy(function(e){i.preventDefault(e);var t=e.target||e.srcElement;if(i.hasClass(t,"acsEmailInput")||i.hasClass(t.parentNode,"acsEmailInput")){var s=document.getElementsByClassName("acsClassicInvite--placeholder")[0];s&&(s.innerHTML=this.display.dialog.emailPlaceholder||""),d.type="email",i.hasClass(d,"acsClassicInvite__input--spaced")&&i.removeClass(d,"acsClassicInvite__input--spaced"),i.hasClass(d,"acsSMSValue")&&(i.removeClass(d,"acsSMSValue"),i.addClass(d,"acsEmailValue")),document.getElementById("acsInvalidInput").innerHTML=this.display.dialog.emailInvalidation||"",this.display.dialog.emailDisclaimer?C[0].innerHTML=this.display.dialog.emailDisclaimer:i.addClass(C[0],"acsNoDisplay")}i.hasClass(t,"acsClassicInner--btn__grey")||this._handleAcceptCurrentStage()},this),B=0;B<E.length;B++)i.Bind(E[B],"invite:click",k);p&&(i.Bind(d,"invite:focus",S),i.Bind(d,"invite:keydown",_)),this.__kpEscape=t.proxy(function(e){27==e.keyCode&&(i.preventDefault(e),this.declined.fire("INVITE_DECLINED_ESC"),this.returnUserFocus())},this),i.Bind(document.body,"invite:keydown",this.__kpEscape);for(var x=document.querySelectorAll(".acsAbandonButton"),M=t.proxy(function(e){for(var t=e.target||e.srcElement,n=!1;t;){if(t.tagName&&"A"==t.tagName&&i.hasClass(t,"acsAllowDefault")){n=!0;break}t=t.parentNode}n||i.preventDefault(e);var a=e.target||e.srcElement;i.hasClass(a,"acsAbandonButton")&&("true"!=a.getAttribute("data-isbackdrop")||s.closeClickOnBackdrop)&&(this.abandoned.fire(),this.returnUserFocus())},this),T=0;T<x.length;T++)i.Bind(x[T],"invite:click",M)}},this))},this))},r.prototype.dispose=function(){this.disposed||(this.disposed=!0,this._removeEls(),i.Unbind("invite:*"))},r.prototype.returnUserFocus=function(){null!==this.lastActiveEl?this.lastActiveEl.focus():document.body.focus()},r});