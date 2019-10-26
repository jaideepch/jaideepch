/***************************************
* @preserve
* ForeSee Web SDK: Invitation Presenter Plugin
* Built April 27, 19 21:30:30
* Code version: 19.7.4
* Template version: 19.7.4
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js"),"triggerconfig"],function(e,fs,utils,t){var k,i=function(e,t,i,s,n,a){this.cfg=e,this.def=fs.ext({},t),this.display=s,this.template=this.display.template,this.brwsr=i,this._inviteEls=[],this.locale=n.get("locale")||"en",this.lastActiveEl=null,this.lastScroll=null,k=a,this.isCustom=0<k.customInvitationRequested.subscriptions.length,this.inviteStage=0,this.declined=new utils.FSEvent,this.declined.subscribe(function(){this._removeEls()}.bind(this)),this.abandoned=new utils.FSEvent,this.abandoned.subscribe(function(){this._removeEls()}.bind(this)),this.accepted=new utils.FSEvent,this.completed=new utils.FSEvent,this.completed.subscribe(function(e){e&&this._removeEls()}.bind(this))};return i.prototype.loadResources=function(e){var t=this.display;if(this.isCustom)e.fire();else{var i=t.template,s=fs.makeURI("$templates/trigger/"+i+"/"+(t.dialog.theme?t.dialog.theme:"main")+".css"),n=fs.makeURI("$templates/trigger/"+i+"/invite.html"),a=!1,l=!1,o=function(){a&&l&&e&&e.fire()};0===i.indexOf("@")&&(i=i.substr(1),s=fs.makeAssetURI("trigger/templates/"+i+"/"+(t.dialog.theme?t.dialog.theme:"main")+".css"),n=fs.makeAssetURI("trigger/templates/"+i+"/invite.html")),utils.loadCSS(s,function(e){a=!0,o()}.bind(this),null,this.brwsr),new utils.JSONP({success:function(e){l=!0,this.invitetemplate=e,o()}.bind(this)}).get(n,"templates_trigger_"+i+"_")}},i.prototype._validateMobileInput=function(e){var t=document.getElementById("acsEmailSMSInput").value,i=function(e){return/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e)},s=function(e){var t=e.replace(/[ -.\(\)]+/g,"").match(/^(\+44|44|0044|0)([1-9]\d{8,9})$/);return t?"+44"+t[2]:null},n=function(e){return(e=e.split(" ").join("")).match(/^(\+1|1)?[-.]?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/)&&e.length<=15||!!s(e)},a=function(){utils.removeClass(document.getElementById("acsInvalidInput"),"acsNoDisplay"),document.getElementById("acsEmailSMSInput").focus()},l=function(){utils.addClass(document.getElementById("acsInvalidInput"),"acsNoDisplay"),setTimeout(function(){e(s(t)||t)},250)};switch(e=e||function(){},this.display.inviteType){case"SMS":n(t)?l():a();break;case"EMAIL":i(t)?l():a();break;case"SMSEMAIL":"mobile"!==fs.toLowerCase(this.template)?i(t)||n(t)?l():a():utils.hasClass(document.getElementById("acsEmailSMSInput"),"acsSMSValue")?n(t)?l():a():i(t)?l():a()}},i.prototype._switchToMobileOnExitStageInvite=function(){var e=document,t=e.querySelector("#acsMainInvite"),i=e.querySelector("#acsOnExitMobileInvite"),s=e.querySelector("#acsFullScreenContainer");s&&(utils.addClass(e.body,"acsFullScreen"),utils.addClass(e.documentElement,"acsFullScreen"),utils.addClass(s,"acsFullScreen"),utils.addClass(i,"acsClassicInvite--fullscreen")),utils.addClass(t,"acsNoDisplay"),utils.removeClass(i,"acsNoDisplay"),s||e.querySelector("#acsEmailSMSInput").focus(),this.inviteStage+=1},i.prototype._switchToThankYouPage=function(){var t,e=document,i=e.getElementById("acsOnExitMobileInvite"),s=e.getElementById("acsOnExitThankYou"),n=e.getElementById("acsFullScreenContainer"),a=e.getElementsByClassName("acsDeclineButton"),l=1e3*Number(this.display.dialog.onexitcounterval)||8e3,o=function(e){utils.preventDefault(e),this.completed.fire(!0)}.bind(this);if(n){for(var c=0;c<a.length;c++)utils.Unbind(a[c],"invite:click"),utils.Bind(a[c],"invite:click",o),utils.removeClass(a[c],"acsDeclineButton");utils.removeClass(n,"__acs__input-clicked"),utils.addClass(i,"acsNoDisplay"),utils.removeClass(s,"acsNoDisplay"),this.closeTimeOut=setTimeout(function(){this.completed.fire(!0)}.bind(this),l+1e3),this.counterInterval=setInterval(function(){var e=document.getElementsByClassName("counter");n&&e&&(t=Number(e[0].innerHTML),e[0].innerHTML=t-1,1===Number(t)&&utils.addClass(n,"__acs--complete"))}.bind(this),1e3)}this.inviteStage+=1},i.prototype._handleAcceptCurrentStage=function(){var t=document.getElementById("acsFullScreenContainer");switch(this.display.inviteType){case"TRACKER":case"INSESSION":this.accepted.fire(this.display.inviteType),this.completed.fire(!0);break;case"SMS":case"EMAIL":case"SMSEMAIL":0===this.inviteStage?(this._switchToMobileOnExitStageInvite(),this._trapKeyBoardMobile(t)):1===this.inviteStage&&this._validateMobileInput(function(e){this.accepted.fire(this.display.inviteType,e),t&&this._switchToThankYouPage()}.bind(this))}},i.prototype._removeEls=function(){for(clearTimeout(this.closeTimeOut),clearInterval(this.counterInterval),utils.removeClass(document.body,"acsFullScreen"),utils.removeClass(document.documentElement,"acsFullScreen");0<this._inviteEls.length;){var e=this._inviteEls.pop();e.parentNode.removeChild(e)}utils.Unbind("invite:*")},i.prototype._trapKeyBoard=function(i,s){utils.Bind(document.body,"invite:focus",function(e){var t=(e=e||window.event).target||e.srcElement;utils.DOMContains(i,t)||(e.stopPropagation(),s.focus())},!1)},i.prototype._trapKeyBoardMobile=function(t,i,s){var n,a,l;0===this.inviteStage?(a=document.getElementById("acsinviteCloseButton"),n=function(e){return!(!(l=t.getAttribute("data-trapkeyboard"))||"false"==l)&&(!utils.DOMContains(i,e)&&!utils.DOMContains(a,e)||!t)}):1===this.inviteStage&&(utils.Unbind(document.body,"invite:focus"),i=document.getElementById("acsFullScreenContainer")||document.getElementById("fsrFullScreenContainer"),s=document.getElementById("acsFirstFocus")||document.getElementById("fsrFirstFocus"),n=function(e){return!utils.DOMContains(i,e)||!t}),utils.Bind(document.body,"invite:focus",function(e){var t;t=(e=e||window.event).target||e.srcElement,n(t)&&s&&(e.stopPropagation(),s.focus())},!1)},i.prototype.present=function(){if(this.lastActiveEl||(this.lastActiveEl=document.activeElement,this.lastScroll={x:window.scrollX,y:window.scrollY}),this.isCustom)this.inviteStage=1,k.customInvitationRequested.fire(this.display.inviteType,function(e){this.accepted.fire(this.display.inviteType,e),this.completed.fire(!0)}.bind(this),function(){this.declined.fire()}.bind(this),function(){this.abandoned.fire()}.bind(this));else{this.display.inviteType=this.display.inviteType.toUpperCase();var n=fs.ext({supportsSVG:this.brwsr.supportsSVG},this.display,this.cfg.config);n.inviteLogo&&n.inviteLogo.length&&(n.inviteLogo=fs.makeAssetURI("trigger/"+n.inviteLogo)),n.inviteBanner&&n.inviteBanner.length&&(n.inviteBanner=fs.makeAssetURI("trigger/"+n.inviteBanner)),n.trackerLogo&&n.trackerLogo.length&&(n.trackerLogo=fs.makeAssetURI("trigger/"+n.trackerLogo)),n.vendorLogo&&n.vendorLogo.length&&(n.vendorLogo=fs.makeURI("$"+n.vendorLogo)),n.vendorLogoPNG&&n.vendorLogoPNG.length&&(n.vendorLogoPNG=fs.makeURI("$"+n.vendorLogoPNG)),n.trusteLogo&&n.trusteLogo.length&&(n.trusteLogo=fs.makeURI("$"+n.trusteLogo)),n.style=fs.ext({invite:{},tracker:{},presetStyles:""},n.style),n.style.invite.backgroundImage&&(n.style.invite.backgroundImage=fs.makeURI("$"+n.style.invite.backgroundImage)),n.style.tracker.backgroundImage&&(n.style.tracker.backgroundImage=fs.makeURI("$"+n.style.tracker.backgroundImage));var e=(S=this.invitetemplate,_=n,B=new window.Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+S.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"),_?B(_):B),t=document.createElement("div");t.innerHTML=e;for(var i=0;i<t.childNodes.length;i++)this._inviteEls.push(t.childNodes[i]),document.body.appendChild(t.childNodes[i]);var s=document.getElementById("acsEmailSMSInput"),a=document.getElementById("acsMainInvite")||document.getElementById("fsrInvite"),l=document.getElementById("acsFullScreenContainer")||document.getElementById("fsrFullScreenContainer"),o=document.getElementById("acsFocusFirst")||document.getElementById("fsrFocusFirst");o.focus(),this.brwsr.isMobile?this._trapKeyBoardMobile(l,a,o):this._trapKeyBoard(a,o);for(var c=document.querySelectorAll(".acsDeclineButton, .fsrDeclineButton"),r=function(e){utils.preventDefault(e),this.declined.fire("INVITE_DECLINED_BTN")}.bind(this),d=0;d<c.length;d++)utils.Bind(c[d],"invite:click",r);for(var u=document.querySelectorAll(".acsAcceptButton, .fsrAcceptButton"),m=document.getElementsByClassName("acsSubmitBtn"),h=document.getElementsByClassName("acsClassicInvite--fullscreen__container"),p=document.getElementsByClassName("acsClassicInner--description"),v=document.getElementsByClassName("acsClassingInner--policyLink"),g=function(e){var t=e.target||e.srcElement;if(l){utils.addClass(h[0],"acsClassicInvite--fullscreen__input-clicked");var i=function(e){var t;if(e){if(utils.hasClass(e,"acsClassicInvite--placeholder"))return e;for(var i=e.parentNode.childNodes,s=0;s<i.length;s++)if(utils.hasClass(i[s],"acsClassicInvite--placeholder")){t=i[s];break}if(!t)for(var n=e.childNodes,a=0;a<n.length;a++)if(utils.hasClass(n[a],"acsClassicInvite--placeholder")){t=n[a];break}}return t}(t);i&&utils.addClass(i,"acsClassicInvite--placeholder__clicked"),utils.addClass(l,"__acs__input-clicked")}}.bind(this),f=function(e){var t=(e.target||e.srcElement).value.replace(/\s/g,""),i=e.keyCode||e.which;0<t.length&&27!==i&&utils.hasClass(m[0],"acsClassicInner--btn__grey")&&utils.removeClass(m[0],"acsClassicInner--btn__grey")}.bind(this),y=function(e){utils.preventDefault(e);var t=e.target||e.srcElement;if(utils.hasClass(t,"acsEmailInput")||utils.hasClass(t.parentNode,"acsEmailInput")){var i=document.getElementsByClassName("acsClassicInvite--placeholder")[0];i&&(i.innerHTML=this.display.dialog.emailPlaceholder||""),s.type="email",utils.hasClass(s,"acsClassicInvite__input--spaced")&&utils.removeClass(s,"acsClassicInvite__input--spaced"),utils.hasClass(s,"acsSMSValue")&&(utils.removeClass(s,"acsSMSValue"),utils.addClass(s,"acsEmailValue")),document.getElementById("acsInvalidInput").innerHTML=this.display.dialog.emailInvalidation||"",this.display.dialog.emailDisclaimer?p[0].innerHTML=this.display.dialog.emailDisclaimer:p[0]&&utils.addClass(p[0],"acsNoDisplay"),utils.addClass(v[0],"acsNoDisplay"),utils.removeClass(v[1],"acsNoDisplay")}utils.hasClass(t,"acsClassicInner--btn__grey")||this._handleAcceptCurrentStage()}.bind(this),I=0;I<u.length;I++)utils.Bind(u[I],"invite:click",y);l&&(utils.Bind(s,"invite:focus",g),utils.Bind(s,"invite:keydown",f)),this.__kpEscape=function(e){27==e.keyCode&&(utils.preventDefault(e),this.declined.fire("INVITE_DECLINED_ESC"))}.bind(this),utils.Bind(document.body,"invite:keydown",this.__kpEscape);for(var C=function(e){for(var t=e.target||e.srcElement,i=!1;t;){if(t.tagName&&"A"==t.tagName&&(utils.hasClass(t,"acsAllowDefault")||utils.hasClass(t,"fsrAllowDefault"))){i=!0;break}t=t.parentNode}i||utils.preventDefault(e);var s=e.target||e.srcElement;!utils.hasClass(s,"acsAbandonButton")&&!utils.hasClass(s,"fsrAbandonButton")||"true"==s.getAttribute("data-isbackdrop")&&!n.closeClickOnBackdrop||this.abandoned.fire()}.bind(this),b=document.querySelectorAll(".acsAbandonButton, .fsrAbandonButton"),E=0;E<b.length;E++)utils.Bind(b[E],"invite:click",C)}var S,_,B;k._triggerResetLock=!1},i.prototype.dispose=function(){this.disposed||(this.disposed=!0,this._removeEls(),utils.Unbind("invite:*"),this.restoreUserFocus(),this.restoreUserScroll())},i.prototype.restoreUserFocus=function(){null!==this.lastActiveEl?this.lastActiveEl.focus():document.body.focus()},i.prototype.restoreUserScroll=function(){this.lastScroll&&window.scroll(this.lastScroll.x,this.lastScroll.y)},i});