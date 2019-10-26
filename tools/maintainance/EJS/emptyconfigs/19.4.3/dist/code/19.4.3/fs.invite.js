/***************************************
* @preserve
* ForeSee Web SDK: Invitation Presenter Plugin
* Built April 27, 19 22:00:31
* Code version: 19.4.3
* Template version: 19.4.3
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"triggerconfig"],function(e,t,i,config){var s,n=function(e,t){var i;return i=new window.Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"),t?i(t):i},a=function(config,e,n,a,o,l,r){this.cfg=config,this.def=t.ext({},e),this.displayoverride=o,this.brwsr=n,this._inviteEls=[],this.locale=l.get("locale")||"en",this.lastActiveEl=null,s=r,this.isCustom=s.customInvitationRequested.subscriptions.length>0;var c,d,u,h,p={},m={};if(this.fstr=a,this.inviteStage=0,this.declined=new i.FSEvent,this.declined.subscribe(t.proxy(function(){this._removeEls()},this)),this.abandoned=new i.FSEvent,this.abandoned.subscribe(t.proxy(function(){this._removeEls()},this)),this.accepted=new i.FSEvent,this.completed=new i.FSEvent,this.completed.subscribe(t.proxy(function(e){e&&this._removeEls()},this)),this.brwsr.isMobile&&this.def.display.mobile?(p={},m={},c=this.def.display.mobile):c=this.def.display.desktop,c)for(h=0;h<c.length;h++)m=p.dialog||{},p=t.ext({},p),p=t.ext(p,c[h]),c[h].dialog&&p.dialog&&(p.dialog=t.ext(t.ext({},m),c[h].dialog)),c[h]=p;if(this.displayoverride){for(h=0;h<c.length;h++)if(c[h].displayname==this.displayoverride){u=c[h];break}}else u=c[Math.round(999999999999*Math.random())%c.length];u.dialog.locales&&u.dialog.locales[this.locale]&&(d=u.dialog.locales[this.locale],u.dialog=t.ext(u.dialog,d),d.localeImages&&(u=t.ext(u,d.localeImages))),u=t.ext({inviteLogo:"",trackerLogo:"",siteLogoAlt:""},u),this.display=u,this.template=u.template};return a.prototype.loadResources=function(e){var s=this.display;if(this.isCustom)e();else{var n=s.template,a=t.makeURI("$templates/trigger/"+n+"/"+(s.dialog.theme?s.dialog.theme:"main")+".css"),o=t.makeURI("$templates/trigger/"+n+"/invite.html"),l=!1,r=!1,c=function(){l&&r&&e&&e()};0===n.indexOf("@")&&(n=n.substr(1),a=t.makeAssetURI("trigger/templates/"+n+"/"+(s.dialog.theme?s.dialog.theme:"main")+".css"),o=t.makeAssetURI("trigger/templates/"+n+"/invite.html")),i.loadCSS(a,t.proxy(function(e){l=!0,this._inviteEls.push(e),c()},this),null,this.brwsr);new i.JSONP({success:t.proxy(function(e){r=!0,this.invitetemplate=e,c()},this)}).get(o,"templates_trigger_"+n+"_")}},a.prototype._validateMobileInput=function(e){var s=document.getElementById("acsEmailSMSInput").value,n=function(e){return/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e)},a=function(e){e=e.split(" ").join("");var t=/^(\+1|1)?[-.]?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;return!!(e.match(t)&&e.length<=15)},o=function(){i.removeClass(document.getElementById("acsInvalidInput"),"acsNoDisplay"),document.getElementById("acsEmailSMSInput").focus()},l=function(){i.addClass(document.getElementById("acsInvalidInput"),"acsNoDisplay"),setTimeout(function(){e(s)},250)};switch(e=e||function(){},this.display.inviteType){case"SMS":a(s)?l():o();break;case"EMAIL":n(s)?l():o();break;case"SMSEMAIL":"mobile"!==t.toLowerCase(this.template)?n(s)||a(s)?l():o():i.hasClass(document.getElementById("acsEmailSMSInput"),"acsSMSValue")?a(s)?l():o():n(s)?l():o()}},a.prototype._switchToMobileOnExitStageInvite=function(){var e=document,t=e.querySelector("#acsMainInvite"),s=e.querySelector("#acsOnExitMobileInvite"),n=e.querySelector("#acsFullScreenContainer");n&&(i.addClass(e.body,"acsFullScreen"),i.addClass(e.documentElement,"acsFullScreen"),i.addClass(n,"acsFullScreen"),i.addClass(s,"acsClassicInvite--fullscreen")),i.addClass(t,"acsNoDisplay"),i.removeClass(s,"acsNoDisplay"),n||e.querySelector("#acsEmailSMSInput").focus(),this.inviteStage+=1},a.prototype._switchToThankYouPage=function(){var e,s=document,n=s.getElementById("acsOnExitMobileInvite"),a=s.getElementById("acsOnExitThankYou"),o=s.getElementById("acsFullScreenContainer"),l=s.getElementsByClassName("acsDeclineButton"),r=1e3*Number(this.display.dialog.onexitcounterval)||8e3,c=t.proxy(function(e){i.preventDefault(e),this.completed.fire(!0)},this);if(o){for(var d=0;d<l.length;d++)i.Unbind(l[d],"invite:click"),i.Bind(l[d],"invite:click",c),i.removeClass(l[d],"acsDeclineButton");i.removeClass(o,"__acs__input-clicked"),i.addClass(n,"acsNoDisplay"),i.removeClass(a,"acsNoDisplay"),this.closeTimeOut=setTimeout(t.proxy(function(){this.completed.fire(!0)},this),r+1e3),this.counterInterval=setInterval(t.proxy(function(){var t=document.getElementsByClassName("counter");o&&t&&(e=Number(t[0].innerHTML),t[0].innerHTML=e-1,1===Number(e)&&i.addClass(o,"__acs--complete"))},this),1e3)}this.inviteStage+=1},a.prototype._handleAcceptCurrentStage=function(){var e=document.getElementById("acsFullScreenContainer");switch(this.display.inviteType){case"TRACKER":this.accepted.fire(this.display.inviteType),this.completed.fire(!0),this.returnUserFocus();break;case"INSESSION":this.accepted.fire(this.display.inviteType),this.completed.fire(!0);break;case"SMS":case"EMAIL":case"SMSEMAIL":0===this.inviteStage?(this._switchToMobileOnExitStageInvite(),this._trapKeyBoardMobile(e)):1===this.inviteStage&&this._validateMobileInput(t.proxy(function(t){this.accepted.fire(this.display.inviteType,t),e&&this._switchToThankYouPage()},this))}},a.prototype._removeEls=function(){for(clearTimeout(this.closeTimeOut),clearInterval(this.counterInterval),i.removeClass(document.body,"acsFullScreen"),i.removeClass(document.documentElement,"acsFullScreen");this._inviteEls.length>0;){var e=this._inviteEls.pop();e.parentNode.removeChild(e)}i.Unbind("invite:*")},a.prototype._trapKeyBoard=function(e,t,s){i.Bind(document.body,"invite:focus",function(i){i=i||window.event;var n=i.target||i.srcElement;t.contains(n)||e||s&&(i.stopPropagation(),s.focus())},!1)},a.prototype._trapKeyBoardMobile=function(e,t,s){var n,a,o;0===this.inviteStage?(a=document.getElementById("acsinviteCloseButton"),n=function(i){return!(!(o=e.getAttribute("data-trapkeyboard"))||"false"==o)&&(!t.contains(i)&&!a.contains(i)||!e)}):1===this.inviteStage&&(i.Unbind(document.body,"invite:focus"),t=document.getElementById("acsFullScreenContainer"),s=document.getElementById("acsFirstFocus"),n=function(i){return!t.contains(i)||!e}),i.Bind(document.body,"invite:focus",function(e){var t;e=e||window.event,t=e.target||e.srcElement,n(t)&&s&&(e.stopPropagation(),s.focus())},!1)},a.prototype.present=function(){i.Healthy(this.brwsr,["survey","static"],t.proxy(function(){i.HealthStatus(this.brwsr,["trust"],t.proxy(function(e){if(this.lastActiveEl||(this.lastActiveEl=document.activeElement),this.isCustom)this.inviteStage=1,s.customInvitationRequested.fire(this.display.inviteType,t.proxy(function(e){this.accepted.fire(this.display.inviteType,e),this.completed.fire(!0)},this),t.proxy(function(){this.declined.fire()},this),t.proxy(function(){this.abandoned.fire()},this));else{this.display.inviteType=this.display.inviteType.toUpperCase();var a=t.ext({supportsSVG:this.brwsr.supportsSVG},this.display,this.cfg.config);a.trust=e.trust,a.inviteLogo&&a.inviteLogo.length>0&&(a.inviteLogo=t.makeAssetURI("trigger/"+a.inviteLogo)),a.trackerLogo&&a.trackerLogo.length>0&&(a.trackerLogo=t.makeAssetURI("trigger/"+a.trackerLogo)),a.vendorLogo&&a.vendorLogo.length>0&&(a.vendorLogo=t.makeURI("$"+a.vendorLogo)),a.vendorLogoPNG&&a.vendorLogoPNG.length>0&&(a.vendorLogoPNG=t.makeURI("$"+a.vendorLogoPNG)),a.trusteLogo&&a.trusteLogo.length>0&&(a.trusteLogo=t.makeURI("$"+a.trusteLogo));var o=n(this.invitetemplate,a),l=document.createElement("div");l.innerHTML=o;for(var r=0;r<l.childNodes.length;r++)this._inviteEls.push(l.childNodes[r]),document.body.appendChild(l.childNodes[r]);var c=document.getElementById("acsFocusFirst"),d=document.getElementById("acsEmailSMSInput"),u=function(e){var t;if(e){if(i.hasClass(e,"acsClassicInvite--placeholder"))return e;for(var s=e.parentNode.childNodes,n=0;n<s.length;n++)if(i.hasClass(s[n],"acsClassicInvite--placeholder")){t=s[n];break}if(!t)for(var a=e.childNodes,o=0;o<a.length;o++)if(i.hasClass(a[o],"acsClassicInvite--placeholder")){t=a[o];break}}return t},h=document.getElementById("acsMainInvite"),p=document.getElementById("acsFullScreenContainer");c&&c.focus(),this.brwsr.isMobile?this._trapKeyBoardMobile(p,h,c):this._trapKeyBoard(p,h,c);for(var m=document.querySelectorAll(".acsDeclineButton"),v=t.proxy(function(e){i.preventDefault(e),this.declined.fire("INVITE_DECLINED_BTN"),this.returnUserFocus()},this),g=0;g<m.length;g++)i.Bind(m[g],"invite:click",v);for(var y=document.querySelectorAll(".acsAcceptButton"),f=document.getElementsByClassName("acsSubmitBtn"),I=document.getElementsByClassName("acsClassicInvite--fullscreen__container"),E=document.getElementsByClassName("acsClassicInner--description"),C=t.proxy(function(e){var t=e.target||e.srcElement;if(p){i.addClass(I[0],"acsClassicInvite--fullscreen__input-clicked");var s=u(t);s&&i.addClass(s,"acsClassicInvite--placeholder__clicked"),i.addClass(p,"__acs__input-clicked")}},this),b=t.proxy(function(e){var t=e.target||e.srcElement,s=t.value.replace(/\s/g,""),n=e.keyCode||e.which;s.length>0&&27!==n&&i.hasClass(f[0],"acsClassicInner--btn__grey")&&i.removeClass(f[0],"acsClassicInner--btn__grey")},this),S=t.proxy(function(e){i.preventDefault(e);var t=e.target||e.srcElement;if(i.hasClass(t,"acsEmailInput")||i.hasClass(t.parentNode,"acsEmailInput")){var s=document.getElementsByClassName("acsClassicInvite--placeholder")[0];s&&(s.innerHTML=this.display.dialog.emailPlaceholder||""),d.type="email",i.hasClass(d,"acsClassicInvite__input--spaced")&&i.removeClass(d,"acsClassicInvite__input--spaced"),i.hasClass(d,"acsSMSValue")&&(i.removeClass(d,"acsSMSValue"),i.addClass(d,"acsEmailValue")),document.getElementById("acsInvalidInput").innerHTML=this.display.dialog.emailInvalidation||"",this.display.dialog.emailDisclaimer?E[0].innerHTML=this.display.dialog.emailDisclaimer:E[0]&&i.addClass(E[0],"acsNoDisplay")}i.hasClass(t,"acsClassicInner--btn__grey")||this._handleAcceptCurrentStage()},this),_=0;_<y.length;_++)i.Bind(y[_],"invite:click",S);p&&(i.Bind(d,"invite:focus",C),i.Bind(d,"invite:keydown",b)),this.__kpEscape=t.proxy(function(e){27==e.keyCode&&(i.preventDefault(e),this.declined.fire("INVITE_DECLINED_ESC"),this.returnUserFocus())},this),i.Bind(document.body,"invite:keydown",this.__kpEscape);for(var B=document.querySelectorAll(".acsAbandonButton"),k=t.proxy(function(e){for(var t=e.target||e.srcElement,s=!1;t;){if(t.tagName&&"A"==t.tagName&&i.hasClass(t,"acsAllowDefault")){s=!0;break}t=t.parentNode}s||i.preventDefault(e);var n=e.target||e.srcElement;i.hasClass(n,"acsAbandonButton")&&("true"!=n.getAttribute("data-isbackdrop")||a.closeClickOnBackdrop)&&(this.abandoned.fire(),this.returnUserFocus())},this),N=0;N<B.length;N++)i.Bind(B[N],"invite:click",k)}s._triggerResetLock=!1},this))},this))},a.prototype.dispose=function(){this.disposed||(this.disposed=!0,this._removeEls(),i.Unbind("invite:*"))},a.prototype.returnUserFocus=function(){null!==this.lastActiveEl?this.lastActiveEl.focus():document.body.focus()},a});