/***************************************
* @preserve
* ForeSee Web SDK: Survey
* Built April 27, 19 21:57:58
* Code version: 19.5.0
* Template version: 19.5.0
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js")],function(t,e,i){var s={survey:{unavailable:"<p>Feedback isn't available right now.</p><p>Please check back later.</p>",expired:"<p>This is an expired survey!</p>",foreseeLogoAltText:"ForeSee Logo",exitBtnAltText:"Exit Survey"}},n={remove:function(){this.parentNode&&this.parentNode.removeChild(this)},hasClass:function(t){return this.className.indexOf(t)>-1},addClass:function(t){this.hasClass(t)||(this.className+=" "+t)},removeClass:function(t){this.className=(this.className||"").replace(t,"")},$:function(t){return this.querySelectorAll(t)},css:function(t){for(var e in t)t.hasOwnProperty(e)&&(this.style[e]=t[e])}},r=function(t){if("string"==typeof t&&-1==t.indexOf("<"))return document.querySelectorAll(t);if("string"==typeof t){var e=document.createElement("div");e.innerHTML=t,t=e.firstChild}for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i]);return t},a={questionType:{RADIO:3,TEXTAREA:1,SELECT:2,STAR:4,CHECKBOX:5}};SurveyQuestion=function(){},SurveyQuestion.prototype.initQuestion=function(t,e){if(this.qs=t,this.cfg=e,this.cfg.isPersistent=!!r(this.qs).hasClass("acs-persistent__block"),this.cfg.isVisible=!!this.cfg.isPersistent,this.cfg.isRequired="1"===e.r||this.cfg.isPersistent&&this.cfg.qt==a.questionType.STAR,this.cfg.rules_info&&this.cfg.rules_info.length>0){var s=this.cfg.rules_info.replace(/&amp;/g,"&");s=s.replace(/&quot;/g,'"'),this.cfg.rules=JSON.parse(s)}else this.cfg.rules=[];this.answer=null,this.stateChanged=new i.FSEvent},SurveyQuestion.prototype.hide=function(){this.cfg.isVisible=!1,this.cfg.isPersistent||r(this.qs).addClass("acs-feedback__block--hidden")},SurveyQuestion.prototype.show=function(){this.cfg.isVisible=!0,this.cfg.isPersistent||r(this.qs).removeClass("acs-feedback__block--hidden")},SurveyQuestion.prototype.getQuestion=function(t,e){var i;return e.qt==a.questionType.TEXTAREA&&2==e.dt?(i=new a.TextAreaQuestion,i.initTextArea(t,e)):e.qt==a.questionType.TEXTAREA&&1==e.dt?(i=new a.InputTextQuestion,i.initInputText(t,e)):e.qt==a.questionType.SELECT?(i=new a.SelectQuestion,i.initSelect(t,e)):e.qt==a.questionType.RADIO?(i=new a.RadioQuestion,i.initRadio(t,e)):e.qt==a.questionType.STAR?(i=new a.StarQuestion,i.initStarRating(t,e)):e.qt==a.questionType.CHECKBOX&&(i=new a.CheckBoxQuestion,i.initCheckBox(t,e)),i||null},SurveyQuestion.prototype.validate=function(){var t=!0;return this.cfg.isVisible&&(this.cfg.isRequired&&(t=null!==this.answer&&this.answer.length>0),t?r(this.qs).removeClass("acs-feedback__block--invalid"):r(this.qs).addClass("acs-feedback__block--invalid")),t},SurveyQuestion.prototype.getAnswer=function(){return!(!this.cfg.isVisible||!this.answer||null===this.answer)&&{questionId:this.cfg.id,answerId:this.answer}},a.SelectQuestion=function(){},a.SelectQuestion.prototype=new SurveyQuestion,a.SelectQuestion.prototype.initSelect=function(t,s){this.initQuestion(t,s);var n=this,a=r(this.qs),o=a.$("select")[0],c=a.$("div.acs-feedback__select")[0];r(o).css({height:(c.offsetHeight||38)+"px"}),i.Bind(o,"feedback:change",function(t){return function(i){for(var s=r(t).$("option"),a=r(t).$("option")[t.selectedIndex],o=0;o<s.length;o++)a===s[o]?a.setAttribute("selected","selected"):s[o].getAttribute("selected")&&s[o].removeAttribute("selected");n.answer=e.toLowerCase(a.value).indexOf("choose")>-1?null:a.value,n.validate(),n.stateChanged.fire(n.cfg.id),i.stopPropagation()}}(o),!1)},a.SelectQuestion.prototype.updateSelects=function(){var t=r(this.qs),e=t.$("select")[0],i=t.$("div.acs-feedback__select")[0];t.offsetHeight>0&&r(e).css({height:(i.offsetHeight||38)+"px"})},a.SelectQuestion.prototype.checkRule=function(t){return null!==this.answer&&this.answer.length&&this.answer==t.answer},a.StarQuestion=function(){},a.StarQuestion.prototype=new SurveyQuestion,a.StarQuestion.prototype._getRating=function(){return this.score},a.StarQuestion.prototype.initStarRating=function(t,s){this.initQuestion(t,s);var n=this;this.score=-1;var a=r(this.qs),o=a.$("input"),c=a.getElementsByClassName("star-rating")[0]||a.getElementsByTagName("fieldset"),u=c.children;i.Bind(a,"feedback:mouseleave",function(t){return function(){for(var e=0;e<t.length;e++)i.removeClass(t[e],"_acsHover")}}(u));for(var h=0;h<u.length;h++)i.Bind(u[h],"feedback:mouseenter",function(t,e){return function(t){for(var s=!1,n=t.srcElement||t.target,r=0;r<e.length;r++)s?i.removeClass(e[r],"_acsHover"):s||i.addClass(e[r],"_acsHover"),e[r]==n&&(s=!0)}}(0,u));var l=function(t,s){return function(r){for(var a=!1,c=function(){t.removeClass("_acsRatingSet")},u=r.srcElement||r.originalTarget,h=0;h<s.length;h++)a?(i.removeClass(s[h],"star-rating__star--fill"),s[h].setAttribute("aria-checked","false")):a||(n.score=h+1,i.addClass(s[h],"star-rating__star--fill"),s[h].setAttribute("aria-checked","true")),s[h]!=u&&o[h]!=u||(a=!0,o[h].checked=!0,n.answer=o[h].value,n.stateChanged.fire(n.cfg.id),n.validate()),i.addClass(t,"_acsRatingSet"),e.nextTick(c)}}(a,u);i.Bind(c,"feedback:change",function(t){"input"===t.target.tagName.toLowerCase()?l(t):t.stopPropagation()},!0),i.Bind(c,"feedback:click",function(t){"label"===t.target.tagName.toLowerCase()?l(t):t.stopPropagation()},!0),i.Bind(c,"feedback:keydown",function(t){var e=(t.target.tagName,i.getKeyCode(t));t.stopPropagation(),"enter"!==e&&" "!==e&&"spacebar"!==e||l(t)})},a.StarQuestion.prototype.checkRule=function(t){var e=!1;if(null!==this.answer&&this.answer.length>0)switch(t.operator){case"equals":e=this.answer==t.answer;break;case"lt":e=this.answer<t.answer;break;case"gt":e=this.answer>t.answer}return e},a.CheckBoxQuestion=function(){},a.CheckBoxQuestion.prototype=new SurveyQuestion,a.CheckBoxQuestion.prototype.initCheckBox=function(t,e){this.initQuestion(t,e);var s=this,n=r(this.qs),a=n.$("input[type=checkbox]"),o=function(t){t.stopPropagation()},c=function(t){return function(e){e&&e.stopPropagation();for(var i=t.$("label"),n=0;n<i.length;n++){var a=r(i[n]),o=a.$("input[type=checkbox]")[0];if(o){if(o.checked)if(a.setAttribute("aria-checked","true"),a.addClass("acsChecked"),null===s.answer)s.answer=[o.getAttribute("questionid")];else{for(var c=!1,u=0;u<s.answer.length;u++)if(s.answer[u]==o.getAttribute("questionid")){c=!0;break}c||(s.answer.push(o.getAttribute("questionid")),c=!1)}else if(a.setAttribute("aria-checked","false"),a.removeClass("acsChecked"),s.answer){for(var h,l=0;l<s.answer.length;l++)if(s.answer[l]==o.getAttribute("questionid")){h=l;break}h>=0&&s.answer.splice(h,1)}s.validate(),s.stateChanged.fire(s.cfg.id)}}}}(n);i.Bind(n,"feedback:keydown",function(t){t.stopPropagation();var e=i.getKeyCode(t);if("enter"===e||" "===e||"spacebar"===e){for(var s=0;s<a.length;s++)t.target.control!==a[s]&&t.target.firstElementChild!==a[s]||(a[s].checked=!a[s].checked,a[s].setAttribute("checked",a[s].checked));c()}}),i.Bind(n,"feedback:change",c),i.Bind(n,"feedback:click",o)},a.CheckBoxQuestion.prototype.checkRule=function(t){if(null!==this.answer&&this.answer.length>0)for(var e=0;e<this.answer.length;e++)if(this.answer[e]==t.answer)return!0;return!1},a.CheckBoxQuestion.prototype.getAnswer=function(){if(this.cfg.isVisible&&null!==this.answer&&this.answer.length>0){for(var t=[],e=0;e<this.answer.length;e++)t.push({questionId:this.cfg.id,answerId:this.answer[e]});return t}return!1},a.InputTextQuestion=function(){},a.InputTextQuestion.prototype=new SurveyQuestion,a.InputTextQuestion.prototype.initInputText=function(t,e){this.initQuestion(t,e);var s=this.qs.$("input")[0];this.maxlen=parseInt(s.getAttribute("acsmaxlength"),10);var n=this,r=function(t){return function(t){t.stopPropagation();var e=t.target||t.srcElement;n.answer=e.value,n.validate(),n.stateChanged.fire(n.cfg.id)}}(this.maxlen),a=function(t){return function(e){e.stopPropagation();var i=e.target||e.srcElement,s=i.value.replace(/\s+/g," ").length,n=t-s-1,r=e.keyCode;if(n<0&&8!=r&&16!=r&&!(r>=37&&r<=41))return e.preventDefault(),!1}}(this.maxlen),o=function(t){t.stopPropagation()};/^[0-9]+$/.test(s.getAttribute("acsmaxlength"))&&(i.Bind(s,"feedback:keydown",a),i.Bind(s,"feedback:keyup",r),i.Bind(s,"feedback:keypress",o))},a.InputTextQuestion.prototype.checkRule=function(t){var i=!1;if(null!==this.answer&&this.answer.length>0)switch(t.operator){case"equals":i=t.answer==this.answer;break;case"contains":i=e.toLowerCase(this.answer).indexOf(e.toLowerCase(t.answer))>-1}return i},a.InputTextQuestion.prototype.getAnswer=function(){if(this.cfg.isVisible&&null!==this.answer&&this.answer.length>0){var t=this.answer.replace(/\s+/g," ");return" "!=t&&{questionId:this.cfg.id,answerText:c.cleanUpText(t,this.maxlen)}}return!1};var o=function(){var t=r('<img src="'+e.makeURI("$loader.gif")+'" class="acs-loader">');t.setAttribute("alt","loading survey"),this.$el=t};o.prototype.center=function(t){var e=this.$el.parentNode.offsetWidth,i=(this.$el.parentNode.offsetHeight,this.$el.offsetWidth);this.$el.offsetHeight;this.$el.css({left:(e-i)/2+"px",top:t?(e-i)/2+"px":"auto"})},o.prototype.remove=function(){this.$el.parentNode.removeChild(this.$el)};var c=function(){};c.cleanUpText=function(t,e){if(0===e)return"";if(e<9)return t;if(t.length>9){var i={phone:/\b(?:(?:\(\d{3}\)?)|(?:\d{3}))[ -.\/\\]?\d{3}[ -.\/\\]?\d{4}\b/g},s={electron:/\b(4026|417500|4405|4508|4844|4913|4917)[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}\d{3,4}\b/g,maestro:/\b(?:5[0678]\d\d|6304|6390|67\d\d)[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?(?:\d{4})?[ -.\/\\]?(?:\d{1,3})?\b/g,dankort:/\b(5019)[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}\b/g,instaPayment:/\b(637|638|639)[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{1}\b/g,visa:/\b4\d{3}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{1,4}\b/g,mastercard:/\b5[1-5]\d{2}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}\b/g,amex:/\b3[47]\d{2}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{3}\b/g,diners:/\b3(?:0[0-5]|[68]\d)\d{1}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{2}\b/g,discover:/\b6(?:011|5\d{2}|22[19]|4[56789]\d{1})[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}\b/g,jcb:/\b(?:2131|1800|35\d[28-89])[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}[ -.\/\\]?\d{4}\b/g,ssn:/\b\d{3}[ -.\/\\]?\d{2}[ -.\/\\]?\d{4}\b/g},n=[];for(var r in i)t=t.replace(i[r],function(t,e){return this.push({i:e,m:t}),""}.bind(n));var a=function(t){return new Array(t.length+1).join("X")};for(var o in s)t=t.replace(s[o],a);for(var c in n)c=n[c],t=t.slice(0,c.i)+c.m+t.slice(c.i)}return e&&t.length>=this.maxlen&&(t=t.substr(0,this.maxlen-1)),t},a.TextAreaQuestion=function(){},a.TextAreaQuestion.prototype=new SurveyQuestion,a.TextAreaQuestion.prototype.initTextArea=function(t,e){this.initQuestion(t,e);var s=this.qs.$("textarea")[0];this.maxlen=parseInt(s.getAttribute("acsmaxlength"),10);var n=this,a=function(t){return function(e){e.stopPropagation();var i=e.target||e.srcElement,s=i.value.replace(/\s+/g," ").length,a=t-s,o=r(i.parentNode),c=o.$(".acs-feedback__textarea--count")[0],u=document.getElementById("fsrCharactersRemaining");if(c.innerHTML=Math.max(0,a),c.insertAdjacentElement("afterbegin",u),a<0)return i.value=i.value.substr(0,i.value.length+a),!1;n.answer=i.value,n.validate(),n.stateChanged.fire(n.cfg.id)}}(this.maxlen),o=function(t){return function(e){e.stopPropagation();var i=e.target||e.srcElement,s=i.value.replace(/\s+/g," ").length,n=t-s-1,r=e.keyCode;if(n<0&&8!=r&&16!=r&&!(r>=37&&r<=41))return e.preventDefault(),!1}}(this.maxlen),c=function(t){t.stopPropagation()};/^[0-9]+$/.test(s.getAttribute("acsmaxlength"))&&(i.Bind(s,"feedback:keydown",o),i.Bind(s,"feedback:keyup",a),i.Bind(s,"feedback:keypress",c))},a.TextAreaQuestion.prototype.checkRule=function(t){var i=!1;if(null!==this.answer&&this.answer.length>0)switch(t.operator){case"equals":i=t.answer==this.answer;break;case"contains":i=e.toLowerCase(this.answer).indexOf(e.toLowerCase(t.answer))>-1}return i},a.TextAreaQuestion.prototype.getAnswer=function(){if(this.cfg.isVisible&&null!==this.answer&&this.answer.length>0){var t=this.answer.replace(/\s+/g," ");return" "!=t&&{questionId:this.cfg.id,answerText:c.cleanUpText(t)}}return!1},a.RadioQuestion=function(){},a.RadioQuestion.prototype=new SurveyQuestion,a.RadioQuestion.prototype.initRadio=function(t,e){this.initQuestion(t,e);var s=this,n=r(this.qs),a=n.$("input[type=radio]"),o=n.$("label"),c=function(t){t.stopPropagation()},u=function(t){return function(e){for(var i=t.$("label"),n=0;n<i.length;n++){var a=r(i[n]),o=a.$("input[type=radio]")[0];o&&(o.checked||o===e?(a.addClass("acsChecked"),a.setAttribute("aria-checked","true"),s.answer=[{answerId:o.value,answerText:o.getAttribute("label"),questionId:s.cfg.id}]):(a.removeClass("acsChecked"),a.setAttribute("aria-checked","false")),s.validate(),s.stateChanged.fire(s.cfg.id))}}}(n);i.Bind(n,"feedback:keydown",function(t){var e=i.getKeyCode(t);t.stopPropagation();var s;if("enter"===e||" "===e||"spacebar"===e){for(var n=0;n<a.length;n++)t.target.control===a[n]||t.target.firstElementChild===a[n]?(a[n].checked=!0,a[n].setAttribute("checked",!0),s=a[n]):a[n].checked=!1;u(s)}else if("arrowleft"===e||"arrowright"===e)for(var r,o=t.target,c=t.target.parentNode.children,h=c.length-1,l=0;l<=h&&!r;l++)c[l]===o&&(r="arrowright"===e?l+1>h?0:l+1:l-1<0?h:l-1,c[r].focus())}),i.Bind(n,"feedback:change",u);for(var h=0;h<o.length;h++)i.Bind(o[h],"feedback:click",c)},a.RadioQuestion.prototype.checkRule=function(t){return null!==this.answer&&this.answer[0].answerId==t.answer},a.RadioQuestion.prototype.getAnswer=function(){return!!(this.cfg.isVisible&&null!==this.answer&&this.answer.length>0)&&this.answer[0]};var u=function(t){function s(t){if(!e.isArray(t))return!1;for(n=0;n<t.length;n++)if(i.testAgainstSearch(t[n],r))return!0;return!1}var n,r=window._acsURL||window.location.toString();return r=e.toLowerCase(r),(!t.whitelistActive||s(t.whitelistData))&&(!t.blacklistActive||!s(t.blacklistData))},h=function(t,n,r){this.cfg=t,this.data=null,this.cpps=n,this.browser=r,this.qs=[],this._topic=!1,this.SurveyUIUpdated=new i.FSEvent,this.SubmitClicked=new i.FSEvent,this.SurveyData=new i.FSEvent,this.defaultCfg=s.survey,this.SurveyData.subscribe(e.proxy(function(t,e){this.data=this._transpileJSONDef(JSON.parse(t)),this.data.meta.privacyurl=this.cfg.privacyuri,this.data.meta.privacytext=this.cfg.privacytext,this.data.meta.foreseeLogoAltText=this.defaultCfg.foreseeLogoAltText,this.data.meta.exitBtnAltText=this.defaultCfg.exitBtnAltText;var s=this,n=this.data.meta,r=!!n.logo2graphic,a=!!n.logo1graphic,o=!1,c=!1,u=function(){e&&e(s.data)};r||a?(r&&i.imgInfo(n.logo2graphic,function(t,e){o=!0,(!a||a&&c)&&u()}),a&&i.imgInfo(n.logo1graphic,function(t,e){c=!0,(!r||r&&o)&&u()})):u()},this),!0,!0)};return h.prototype._transpileJSONDef=function(t){function i(t,e){for(var i=0;i<e.length;i++){var s=e[i];if(t[s]){for(var n=t[s];n.indexOf("&amp;")>-1;)n=n.replace(p,"&");t[s]=n.replace(g,"<").replace(v,">").replace(b,'"').replace(w," ")}}}var s,n,r,o,c=t.survey.content.main,h=c.cq,l=c.ca,d=c.ncq,f={meta:t.survey.content.meta.info,ext:t.survey.content.meta["ext-info"],notopic:[],topics:[]},p=/&amp;/gi,g=/&lt;/gi,v=/&gt;/gi,b=/&quot;/gi,w=/&nbsp;/gi,y={};if(d&&"string"!=typeof d||(d={qstn:[]}),d.qstn&&void 0===d.qstn.length&&(d.qstn=[d.qstn]),!this.cfg.autowhitelist&&this.cfg.topics.length>0){window._acsURL=e.getParam("fsUrl");for(var k=0;k<this.cfg.topics.length;k++){var q=this.cfg.topics[k];u(q)&&(y[q.answerId]=!0)}}for(i(f.meta,["epiloguetext","prologuetext"]),s=0;s<h.qstn.length;s++)for(r=h.qstn[s],i(r,["txt","lbl"]),f.notopic.push(r),r.answers=[],n=0;n<l.ans.length;n++)o=l.ans[n],o.qid==r.id&&(f.topics.push(o),r.answers.push(o));for(s=0;s<d.qstn.length;s++)for(r=d.qstn[s],i(r,["txt","lbl"]),r.answers=[],n=0;n<l.ans.length;n++)o=l.ans[n],o.qid==r.id&&r.answers.push(o);if(!this.cfg.autowhitelist&&this.cfg.topics.length>0){for(n=0;n<f.topics.length;n++)y[f.topics[n].id]||f.topics.splice(n--,1);for(n=0;n<f.notopic.length;n++)if(f.notopic[n].qt==a.questionType.SELECT)for(s=0;s<f.notopic[n].answers.length;s++)y[f.notopic[n].answers[s].id]||f.notopic[n].answers.splice(s--,1)}for(s=0;s<f.topics.length;s++){var m=f.topics[s];if(m.questions=[],d.qstn)for(n=0;n<d.qstn.length;n++)d.qstn[n].aid==m.id&&(i(d.qstn[n],["txt","lbl"]),m.questions.push(d.qstn[n]))}var x=[];for(s=0;s<f.notopic.length;s++)f.notopic[s].qt==a.questionType.SELECT&&(x=f.notopic[s].answers);return f.vistopics=x,f.ncq=d,f},h.prototype._getScore=function(){var t=this.qs;return t[0]._getRating?t[0]._getRating():0},h.prototype._serialize=function(){var t,i,s={mid:this.cfg.mid,url:window.location.toString().indexOf("&fsUrl")>-1?e.getParam("fsUrl"):window.location.toString(),responses:[]},n=s.responses,r=this.qs;if(1==this.data.vistopics.length)for(var o=0;o<this.data.notopic.length;o++){var c=this.data.notopic[o];if(c.qt==a.questionType.SELECT){n.push({questionId:c.id,answerId:c.answers[0].id});break}}for(var u=0;u<r.length;u++){var h=r[u].cfg.id,l=r[u].cfg.qt;if(h){var d=r[u].getAnswer();d&&(d&&l==a.questionType.CHECKBOX?n.push.apply(n,d):n.push(d))}}t=this.cpps.all();for(var f in t)n.push({questionId:f,answerText:t[f]});return this.cfg.version&&(s.version=this.cfg.version),!0===this.cfg.replay&&void 0!==this.cfg.record&&void 0!==this.cfg.record.recorder&&null!==this.cfg.record.recorder&&(s.globalId=this.cfg.record.recorder.getGlobalId(),s.sessionId=""),i=window.location.href.match(/cxrid=([\d\w]*)&/),i&&i[1]&&(s.globalId=i[1],s.sessionId=""),s=JSON.stringify(s)},h.prototype._getQConfig=function(t){var e,i,s=this.data.notopic;for(e=0;e<s.length;e++)if(t==s[e].id)return s[e];for(s=this.data.ncq.qstn,i=0;i<s.length;i++)if(t==s[i].id)return s[i]},h.prototype._getQObject=function(t){if(this.qs.length>0&&t)for(var e=0;e<this.qs.length;e++)if(this.qs[e].cfg.id==t)return this.qs[e];return!1},h.prototype._renderSurvey=function(t){var e,i=this._getQObject(t);if(i&&(e=this._checkTopicChange(i.getAnswer())),e){this._runSkipLogic(this.data.vistopics[e-1].questions);for(var s=0;s<this.data.vistopics.length;s++)if(s!==e-1)for(var n=this.data.vistopics[s].questions,r=0;r<n.length;r++){var a=this._getQObject(n[r].id);a.hide()}}else for(var o=0;o<this.data.vistopics.length;o++){var c=this._checkWhatTopic(t);if(c)this._runSkipLogic(this.data.vistopics[c-1].questions);else if(this._topic)for(var u=0;u<this.data.vistopics.length;u++)this.data.vistopics[u].id==this._topic&&this._runSkipLogic(this.data.vistopics[u].questions)}},h.prototype._checkTopicChange=function(t){var e=t.answerId;if("string"!=typeof e)return!1;for(var i=0;i<this.data.vistopics.length;i++)if(this.data.vistopics[i].id==e)return i+1;return!1},h.prototype._checkWhatTopic=function(t){for(var e=0;e<this.data.vistopics.length;e++)for(var i=this.data.vistopics[e].questions,s=0;s<i.length;s++)if(i[s].id==t)return e+1;return!1},h.prototype._runSkipLogic=function(t){e.isArray(t)||(t=[t]);for(var i=0;i<t.length;i++){var s=this._getQObject(t[i].id),n=s.cfg.rules,r=!1;if(n.length>0)for(var a=0;a<n.length;a++){var o=this._getQObject(n[a].question);o&&(r=r||o.checkRule(n[a])&&!!o.cfg.isVisible)}else r=!0;r?s.show():s.hide()}},h.prototype._validateSurvey=function(){var t,e,i=!0;if(this.qs&&this.qs.length>0)for(var s=this.qs.length-1;s>=0;s--)e=this.qs[s].qs,this.qs[s].validate()?(e.setAttribute("aria-invalid","false"),e.getAttribute("aria-label")&&e.removeAttribute("aria-label")):(i=i&&!1,e.setAttribute("aria-invalid","true"),t||(t=this.qs[s].qs,t.setAttribute("tabindex","0")),e.setAttribute("aria-label","The submission for this section is invalid"));return t&&t.focus(),this._validationStatus(!i),i},h.prototype.bind=function(t){var s=this;s.submitted=!1,t=r(t);for(var n=t.$(".acs-feedback__block"),o=new SurveyQuestion,c=0;c<n.length;c++){var u=this._getQConfig(n[c].getAttribute("questionid"));if(u){var h=o.getQuestion(n[c],u);this.qs.push(h),this.qs[this.qs.length-1].stateChanged.subscribe(e.proxy(this._renderSurvey,this),!1,!0)}}var l=e.proxy(function(){for(var t=0;t<this.qs.length;t++)this.qs[t].cfg.qt==a.questionType.SELECT&&this.qs[t].updateSelects()},this);this.SurveyUIUpdated.subscribe(function(){setTimeout(l,100)}),s.$el=t;for(var d=t.$(".acs-headingzone h1"),f=0;f<d.length;f++)r(d[f]).addClass("acs-feedback__heading acs-feedback__heading--h1");var p=t.$(".acs-topic__selector")[0],g=e.proxy(function(e){for(var i=t.$(".acs-feedback__topic"),n=0;n<i.length;n++)r(i[n]).removeClass("acs-visible__topic");try{r(document.getElementById("topk_"+e)).addClass("acs-visible__topic"),s._topic=e}catch(t){}s.SurveyUIUpdated.fire()},this);p&&i.Bind(p,"feedback:change",function(t){g(t.target.value)}),1==this.data.vistopics.length&&(this._topic=this.data.vistopics[0].id,this._renderSurvey(),r(document.getElementById("topk_"+this.data.vistopics[0].id)).addClass("acs-visible__topic"),l()),i.Bind(t.$(".acs-submit-feedback__button")[0],"click",e.proxy(function(t){return this._validateSurvey()&&!this.submitted&&(this.SubmitClicked.fire(),this.submitted=!0),t&&t.preventDefault&&t.preventDefault(),!1},this));for(var v=function(){i._preventUnloadFor(10)},b=document.querySelectorAll('a[href^="mailto"]'),w=0;w<b.length;w++)i.Bind(b[w],"feedback:click",v);for(var y=document.querySelectorAll(".acs-feedback__label p"),k=0;k<y.length;k++)r(y[k]).css({display:"inline"})},h.prototype.isExpired=function(){var t,e=new Date,i=new Date(e.getFullYear(),e.getMonth(),e.getDate());return!!this.cfg.fbexpiredate&&(t=this.cfg.fbexpiredate.split("-"),new Date(t[0],Number(t[1])-1,t[2])<i)},h.prototype._validationStatus=function(t){var e=r(this.$el.$(".acs-validation-block")[0]);t?e.css({display:"block"}):e.css({display:"none"})},{SurveyBuilder:h,TopicTester:u}});