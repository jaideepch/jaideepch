/***************************************
* @preserve
* ForeSee Web SDK: Survey
* Built February 06, 17 18:46:10
* Code version: DEPL-237
* Template version: 19.3.0
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js")],function(t,e,i){var s={survey:{unavailable:"<p>Feedback isn't available right now.</p><p>Please check back later.</p>",expired:"<p>This is an expired survey!</p>"}},n={remove:function(){this.parentNode&&this.parentNode.removeChild(this)},hasClass:function(t){return this.className.indexOf(t)>-1},addClass:function(t){this.hasClass(t)||(this.className+=" "+t)},removeClass:function(t){this.className=(this.className||"").replace(t,"")},$:function(t){return this.querySelectorAll(t)},css:function(t){for(var e in t)t.hasOwnProperty(e)&&(this.style[e]=t[e])}},r=function(t){if("string"==typeof t&&t.indexOf("<")==-1)return document.querySelectorAll(t);if("string"==typeof t){var e=document.createElement("div");e.innerHTML=t,t=e.firstChild}for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i]);return t},a={questionType:{RADIO:3,TEXTAREA:1,SELECT:2,STAR:4,CHECKBOX:5}};SurveyQuestion=function(){},SurveyQuestion.prototype.initQuestion=function(t,e){if(this.qs=t,this.cfg=e,this.cfg.isPersistent=!!r(this.qs).hasClass("acs-persistent__block"),this.cfg.isVisible=!!this.cfg.isPersistent,this.cfg.isRequired="1"===e.r||this.cfg.isPersistent&&this.cfg.qt==a.questionType.STAR,this.cfg.isRequired=(!this.cfg.isPersistent||this.cfg.qt!=a.questionType.SELECT)&&this.cfg.isRequired,this.cfg.rules_info&&this.cfg.rules_info.length>0){var s=this.cfg.rules_info.replace(/&amp;/g,"&");s=s.replace(/&quot;/g,'"'),this.cfg.rules=JSON.parse(s)}else this.cfg.rules=[];this.answer=null,this.stateChanged=new i.FSEvent},SurveyQuestion.prototype.hide=function(){this.cfg.isVisible=!1,this.cfg.isPersistent||r(this.qs).addClass("acs-feedback__block--hidden")},SurveyQuestion.prototype.show=function(){this.cfg.isVisible=!0,this.cfg.isPersistent||r(this.qs).removeClass("acs-feedback__block--hidden")},SurveyQuestion.prototype.getQuestion=function(t,e){var i;return e.qt==a.questionType.TEXTAREA&&2==e.dt?(i=new a.TextAreaQuestion,i.initTextArea(t,e)):e.qt==a.questionType.TEXTAREA&&1==e.dt?(i=new a.InputTextQuestion,i.initInputText(t,e)):e.qt==a.questionType.SELECT?(i=new a.SelectQuestion,i.initSelect(t,e)):e.qt==a.questionType.RADIO?(i=new a.RadioQuestion,i.initRadio(t,e)):e.qt==a.questionType.STAR?(i=new a.StarQuestion,i.initStarRating(t,e)):e.qt==a.questionType.CHECKBOX&&(i=new a.CheckBoxQuestion,i.initCheckBox(t,e)),i?i:null},SurveyQuestion.prototype.validate=function(){var t=!0;return this.cfg.isVisible&&(this.cfg.isRequired&&(t=null!==this.answer&&this.answer.length>0),t?r(this.qs).removeClass("acs-feedback__block--invalid"):r(this.qs).addClass("acs-feedback__block--invalid")),t},SurveyQuestion.prototype.getAnswer=function(){return!(!this.cfg.isVisible||!this.answer||null===this.answer)&&{questionId:this.cfg.id,answerId:this.answer}},a.SelectQuestion=function(){},a.SelectQuestion.prototype=new SurveyQuestion,a.SelectQuestion.prototype.initSelect=function(t,e){this.initQuestion(t,e);var s=this,n=function(t,e){return function(i){var n=r(e).$("option")[e.selectedIndex];t.innerHTML=n.innerHTML,s.answer=n.value.toLowerCase().indexOf("choose")>-1?null:n.value,s.validate(),s.stateChanged.fire(s.cfg.id),i.stopPropagation()}},a=r(this.qs),o=a.$("select")[0],c=a.$("div.acs-feedback__select-button")[0],u=a.$("div.acs-feedback__select")[0];r(o).css({height:(u.offsetHeight||38)+"px"}),i.Bind(o,"feedback:change",n(c,o),!1)},a.SelectQuestion.prototype.updateSelects=function(){var t=r(this.qs),e=t.$("select")[0],i=t.$("div.acs-feedback__select")[0];t.offsetHeight>0&&r(e).css({height:(i.offsetHeight||38)+"px"})},a.SelectQuestion.prototype.checkRule=function(t){return null!==this.answer&&this.answer.length&&this.answer==t.answer},a.StarQuestion=function(){},a.StarQuestion.prototype=new SurveyQuestion,a.StarQuestion.prototype.initStarRating=function(t,e){this.initQuestion(t,e);var s=this,n=function(t){return function(){for(var e=0;e<t.length;e++)r(t[e]).removeClass("_acsHover")}},a=function(t,e){return function(t){for(var i=!1,s=t.srcElement||t.target,n=0;n<e.length;n++)i?r(e[n]).removeClass("_acsHover"):i||r(e[n]).addClass("_acsHover"),e[n]==s&&(i=!0)}},o=function(t,e,i){return function(n){n.stopPropagation(),i&&(s.validationPassed=!0);for(var a=!1,o=function(){t.removeClass("_acsRatingSet")},c=n.srcElement||n.originalTarget,u=0;u<e.length;u++)a?r(e[u]).removeClass("star-rating__star--fill"):a||r(e[u]).addClass("star-rating__star--fill"),e[u]==c&&(a=!0,c.checked=!0,s.answer=e[u].value,s.stateChanged.fire(s.cfg.id),s.validate()),t.addClass("_acsRatingSet"),setTimeout(o,250)}},c=r(this.qs),u=c.$("label"),h=c.$("input");i.Bind(c,"feedback:mouseleave",n(u));for(var l=0;l<u.length;l++)i.Bind(u[l],"feedback:mouseenter",a(c,u)),i.Bind(u[l],"feedback:click",function(t){t.stopPropagation()});for(var f=0;f<h.length;f++)i.Bind(h[f],"feedback:click",o(c,h,0===f))},a.StarQuestion.prototype.checkRule=function(t){var e=!1;if(null!==this.answer&&this.answer.length>0)switch(t.operator){case"equals":e=this.answer==t.answer;break;case"lt":e=this.answer<t.answer;break;case"gt":e=this.answer>t.answer}return e},a.CheckBoxQuestion=function(){},a.CheckBoxQuestion.prototype=new SurveyQuestion,a.CheckBoxQuestion.prototype.initCheckBox=function(t,e){this.initQuestion(t,e);for(var s=this,n=function(t){return function(e){for(var i=t.$("label"),n=0;n<i.length;n++){var a=r(i[n]),o=a.$("input[type=checkbox]")[0];if(o){if(o.checked)if(a.addClass("acsChecked"),null===s.answer)s.answer=[o.getAttribute("questionid")];else{for(var c=!1,u=0;u<s.answer.length;u++)if(s.answer[u]==o.getAttribute("questionid")){c=!0;break}c||(s.answer.push(o.getAttribute("questionid")),c=!1)}else if(a.removeClass("acsChecked"),s.answer){for(var h,l=0;l<s.answer.length;l++)if(s.answer[l]==o.getAttribute("questionid")){h=l;break}h>=0&&s.answer.splice(h,1)}s.validate(),s.stateChanged.fire(s.cfg.id)}}}},a=r(this.qs),o=a.$("input[type=checkbox]"),c=a.$("label"),u=function(t){t.stopPropagation()},h=0;h<o.length;h++)i.Bind(o[h],"feedback:change",n(a));for(var l=0;l<c.length;l++)i.Bind(c[l],"feedback:click",u)},a.CheckBoxQuestion.prototype.checkRule=function(t){if(null!==this.answer&&this.answer.length>0)for(var e=0;e<this.answer.length;e++)if(this.answer[e]==t.answer)return!0;return!1},a.CheckBoxQuestion.prototype.getAnswer=function(){if(this.cfg.isVisible&&null!==this.answer&&this.answer.length>0){for(var t=[],e=0;e<this.answer.length;e++)t.push({questionId:this.cfg.id,answerId:this.answer[e]});return t}return!1},a.InputTextQuestion=function(){},a.InputTextQuestion.prototype=new SurveyQuestion,a.InputTextQuestion.prototype.initInputText=function(t,e){this.initQuestion(t,e);var s=this.qs.$("input")[0];this.maxlen=parseInt(s.getAttribute("acsmaxlength"),10);var n=this,r=function(t){return function(t){t.stopPropagation();var e=t.target||t.srcElement;n.answer=e.value,n.validate(),n.stateChanged.fire(n.cfg.id)}}(this.maxlen),a=function(t){return function(e){e.stopPropagation();var i=e.target||e.srcElement,s=i.value.replace(/\s+/g," ").length,n=t-s-1,r=e.keyCode;if(n<0&&8!=r&&16!=r&&!(r>=37&&r<=41))return e.preventDefault(),!1}}(this.maxlen),o=function(t){t.stopPropagation()};/^[0-9]+$/.test(s.getAttribute("acsmaxlength"))&&(i.Bind(s,"feedback:keydown",a),i.Bind(s,"feedback:keyup",r),i.Bind(s,"feedback:keypress",o))},a.InputTextQuestion.prototype.checkRule=function(t){var e=!1;if(null!==this.answer&&this.answer.length>0)switch(t.operator){case"equals":e=t.answer==this.answer;break;case"contains":e=this.answer.toLowerCase().indexOf(t.answer.toLowerCase())>-1}return e},a.InputTextQuestion.prototype.getAnswer=function(){if(this.cfg.isVisible&&null!==this.answer&&this.answer.length>0){var t=this.answer.replace(/\s+/g," ");return" "!=t&&{questionId:this.cfg.id,answerText:c.cleanUpText(t,this.maxlen)}}return!1};var o=function(){var t=r('<img src="'+e.makeURI("$loader.gif")+'" class="acs-loader">');this.$el=t};o.prototype.center=function(t){var e=this.$el.parentNode.offsetWidth,i=(this.$el.parentNode.offsetHeight,this.$el.offsetWidth);this.$el.offsetHeight;this.$el.css({left:(e-i)/2+"px",top:t?(e-i)/2+"px":"auto"})},o.prototype.remove=function(){this.$el.parentNode.removeChild(this.$el)};var c=function(){};c.cleanUpText=function(t,e){if(0===e)return"";if(t.length>13){var i={electron:/(4026|417500|4405|4508|4844|4913|4917)[0-9]{11,12}/g,maestro:/(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)[0-9]{12}/g,dankort:/(5019)[0-9]{12}/g,instaPayment:/(637|638|639)[0-9]{13}/g,visa:/4[0-9]{12}(?:[0-9]{3})?/g,mastercard:/5[1-5][0-9]{14}/g,amex:/3[47][0-9]{13}/g,diners:/3(?:0[0-5]|[68][0-9])[0-9]{11}/g,discover:/6(?:011|5[0-9]{2}|22[19]|4[56789][0-9]{1})[0-9]{12}/g,jcb:/(?:2131|1800|35\d{3})\d{11}/g};t=t.replace(/[\d\-\.\s\\\/]+/g,function(t){if(t.length>=13){var e=t;for(var s in i)if(i[s].test(t)){e=e.replace(/\d/g,"X");break}return e}return t})}return e&&t.length>=this.maxlen&&(t=t.substr(0,this.maxlen-1)),t},a.TextAreaQuestion=function(){},a.TextAreaQuestion.prototype=new SurveyQuestion,a.TextAreaQuestion.prototype.initTextArea=function(t,e){this.initQuestion(t,e);var s=this.qs.$("textarea")[0];this.maxlen=parseInt(s.getAttribute("acsmaxlength"),10);var n=this,a=function(t){return function(e){e.stopPropagation();var i=e.target||e.srcElement,s=i.value.replace(/\s+/g," ").length,a=t-s,o=r(i.parentNode),c=o.$(".acs-feedback__textarea--count")[0];return c.innerHTML=Math.max(0,a),a<0?(i.value=i.value.substr(0,i.value.length+a),!1):(n.answer=i.value,n.validate(),n.stateChanged.fire(n.cfg.id),void 0)}}(this.maxlen),o=function(t){return function(e){e.stopPropagation();var i=e.target||e.srcElement,s=i.value.replace(/\s+/g," ").length,n=t-s-1,r=e.keyCode;if(n<0&&8!=r&&16!=r&&!(r>=37&&r<=41))return e.preventDefault(),!1}}(this.maxlen),c=function(t){t.stopPropagation()};/^[0-9]+$/.test(s.getAttribute("acsmaxlength"))&&(i.Bind(s,"feedback:keydown",o),i.Bind(s,"feedback:keyup",a),i.Bind(s,"feedback:keypress",c))},a.TextAreaQuestion.prototype.checkRule=function(t){var e=!1;if(null!==this.answer&&this.answer.length>0)switch(t.operator){case"equals":e=t.answer==this.answer;break;case"contains":e=this.answer.toLowerCase().indexOf(t.answer.toLowerCase())>-1}return e},a.TextAreaQuestion.prototype.getAnswer=function(){if(this.cfg.isVisible&&null!==this.answer&&this.answer.length>0){var t=this.answer.replace(/\s+/g," ");return" "!=t&&{questionId:this.cfg.id,answerText:c.cleanUpText(t)}}return!1},a.RadioQuestion=function(){},a.RadioQuestion.prototype=new SurveyQuestion,a.RadioQuestion.prototype.initRadio=function(t,e){this.initQuestion(t,e);for(var s=this,n=function(t){return function(e){e.stopPropagation();for(var i=t.$("label"),n=0;n<i.length;n++){var a=r(i[n]),o=a.$("input[type=radio]")[0];o&&(o.checked?(a.addClass("acsChecked"),s.answer=[{answerId:o.value,answerText:o.getAttribute("label"),questionId:s.cfg.id}]):a.removeClass("acsChecked"),s.validate(),s.stateChanged.fire(s.cfg.id))}}},a=r(this.qs),o=a.$("input[type=radio]"),c=a.$("label"),u=function(t){t.stopPropagation()},h=0;h<o.length;h++)i.Bind(o[h],"feedback:change",n(a));for(var l=0;l<c.length;l++)i.Bind(c[l],"feedback:click",u)},a.RadioQuestion.prototype.checkRule=function(t){return null!==this.answer&&this.answer[0].answerId==t.answer},a.RadioQuestion.prototype.getAnswer=function(){return!!(this.cfg.isVisible&&null!==this.answer&&this.answer.length>0)&&this.answer[0]};var u=function(t){function e(t){for(s=0;s<t.length;s++)if(i.testAgainstSearch(t[s],n))return!0;return!1}var s,n=window._acsURL||window.location.toString();return n=n.toLowerCase(),!t.whitelistActive||e(t.whitelistData)},h=function(t,n,r){this.cfg=t,this.data=null,this.cpps=n,this.browser=r,this.qs=[],this._topic=!1,this.SurveyUIUpdated=new i.FSEvent,this.SubmitClicked=new i.FSEvent,this.SurveyData=new i.FSEvent,this.defaultCfg=s.survey,this.SurveyData.subscribe(e.proxy(function(t,e){this.data=this._transpileJSONDef(JSON.parse(t)),this.data.meta.privacyurl=this.cfg.privacyuri,this.data.meta.privacytext=this.cfg.privacytext;var s=this,n=this.data.meta,r=!!n.logo2graphic,a=!!n.logo1graphic,o=!1,c=!1,u=function(){e&&e(s.data)};r||a?(r&&i.imgInfo(n.logo2graphic,function(t,e){o=!0,(!a||a&&c)&&u()}),a&&i.imgInfo(n.logo1graphic,function(t,e){c=!0,(!r||r&&o)&&u()})):u()},this),!0,!0)};return h.prototype._transpileJSONDef=function(t){function i(t,e){for(var i=0;i<e.length;i++){var s=e[i];if(t[s]){for(var n=t[s];n.indexOf("&amp;")>-1;)n=n.replace(d,"&");t[s]=n.replace(g,"<").replace(v,">").replace(w,'"').replace(y," ")}}}var s,n,r,o,c=t.survey.content.main,h=c.cq,l=c.ca,f=c.ncq,p={meta:t.survey.content.meta.info,ext:t.survey.content.meta["ext-info"],notopic:[],topics:[]},d=/&amp;/gi,g=/&lt;/gi,v=/&gt;/gi,w=/&quot;/gi,y=/&nbsp;/gi,b={};if(f&&"string"!=typeof f||(f={qstn:[]}),f.qstn&&"undefined"==typeof f.qstn.length&&(f.qstn=[f.qstn]),!this.cfg.autowhitelist&&this.cfg.topics.length>0){window._acsURL=e.getParam("fsUrl");for(var q=0;q<this.cfg.topics.length;q++){var k=this.cfg.topics[q];u(k)&&(b[k.answerId]=!0)}}for(i(p.meta,["epiloguetext","prologuetext"]),s=0;s<h.qstn.length;s++)for(r=h.qstn[s],i(r,["txt","lbl"]),p.notopic.push(r),r.answers=[],n=0;n<l.ans.length;n++)o=l.ans[n],o.qid==r.id&&(p.topics.push(o),r.answers.push(o));for(s=0;s<f.qstn.length;s++)for(r=f.qstn[s],i(r,["txt","lbl"]),r.answers=[],n=0;n<l.ans.length;n++)o=l.ans[n],o.qid==r.id&&r.answers.push(o);if(!this.cfg.autowhitelist&&this.cfg.topics.length>0){for(n=0;n<p.topics.length;n++)b[p.topics[n].id]||p.topics.splice(n--,1);for(n=0;n<p.notopic.length;n++)if(p.notopic[n].qt==a.questionType.SELECT)for(s=0;s<p.notopic[n].answers.length;s++)b[p.notopic[n].answers[s].id]||p.notopic[n].answers.splice(s--,1)}for(s=0;s<p.topics.length;s++){var x=p.topics[s];if(x.questions=[],f.qstn)for(n=0;n<f.qstn.length;n++)f.qstn[n].aid==x.id&&(i(f.qstn[n],["txt","lbl"]),x.questions.push(f.qstn[n]))}var _=[];for(s=0;s<p.notopic.length;s++)p.notopic[s].qt==a.questionType.SELECT&&(_=p.notopic[s].answers);return p.vistopics=_,p.ncq=f,p},h.prototype._serialize=function(){var t={mid:this.cfg.mid,url:window.location.toString().indexOf("&fsUrl")>-1?e.getParam("fsUrl"):window.location.toString(),responses:[]},i=t.responses,s=this.qs;if(1==this.data.vistopics.length)for(var n=0;n<this.data.notopic.length;n++){var r=this.data.notopic[n];if(r.qt==a.questionType.SELECT){i.push({questionId:r.id,answerId:r.answers[0].id});break}}for(var o=0;o<s.length;o++){var c=s[o].cfg.id,u=s[o].cfg.qt;if(c){var h=s[o].getAnswer();h&&(h&&u==a.questionType.CHECKBOX?i.push.apply(i,h):i.push(h))}}var l=this.cpps.all();for(var f in l)i.push({questionId:f,answerText:l[f]});return this.cfg.version&&(t.version=this.cfg.version),this.cfg.replay===!0&&"undefined"!=typeof this.cfg.record&&"undefined"!=typeof this.cfg.record.recorder&&null!==this.cfg.record.recorder&&(t.globalId=this.cfg.record.recorder.getGlobalId(),t.sessionId=""),"undefined"!=typeof Replay&&Replay.cxrid&&null!==Replay&&(t.globalId=Replay.cxrid,t.sessionId=""),t=JSON.stringify(t)},h.prototype._getQConfig=function(t){var e,i,s=this.data.notopic;for(e=0;e<s.length;e++)if(t==s[e].id)return s[e];for(s=this.data.ncq.qstn,i=0;i<s.length;i++)if(t==s[i].id)return s[i]},h.prototype._getQObject=function(t){if(this.qs.length>0&&t)for(var e=0;e<this.qs.length;e++)if(this.qs[e].cfg.id==t)return this.qs[e];return!1},h.prototype._renderSurvey=function(t){var e,i=this._getQObject(t);if(i&&(e=this._checkTopicChange(i.getAnswer())),e){this._runSkipLogic(this.data.vistopics[e-1].questions);for(var s=0;s<this.data.vistopics.length;s++)if(s!==e-1)for(var n=this.data.vistopics[s].questions,r=0;r<n.length;r++){var a=this._getQObject(n[r].id);a.hide()}}else for(var o=0;o<this.data.vistopics.length;o++){var c=this._checkWhatTopic(t);if(c)this._runSkipLogic(this.data.vistopics[c-1].questions);else if(this._topic)for(var u=0;u<this.data.vistopics.length;u++)this.data.vistopics[u].id==this._topic&&this._runSkipLogic(this.data.vistopics[u].questions)}},h.prototype._checkTopicChange=function(t){var e=t.answerId;if("string"!=typeof e)return!1;for(var i=0;i<this.data.vistopics.length;i++)if(this.data.vistopics[i].id==e)return i+1;return!1},h.prototype._checkWhatTopic=function(t){for(var e=0;e<this.data.vistopics.length;e++)for(var i=this.data.vistopics[e].questions,s=0;s<i.length;s++)if(i[s].id==t)return e+1;return!1},h.prototype._runSkipLogic=function(t){e.isArray(t)||(t=[t]);for(var i=0;i<t.length;i++){var s=this._getQObject(t[i].id),n=s.cfg.rules,r=!1;if(n.length>0)for(var a=0;a<n.length;a++){var o=this._getQObject(n[a].question);o&&(r=r||o.checkRule(n[a])&&!!o.cfg.isVisible)}else r=!0;r?s.show():s.hide()}},h.prototype._validateSurvey=function(){var t=!0;if(this.qs&&this.qs.length>0)for(var e=this.qs.length-1;e>=0;e--)this.qs[e].validate()||(t=t&&!1);return this._validationStatus(!t),t},h.prototype.bind=function(t){var s=this;s.submitted=!1,t=r(t);for(var n=t.$(".acs-feedback__block"),o=new SurveyQuestion,c=0;c<n.length;c++){var u=this._getQConfig(n[c].getAttribute("questionid"));if(u){var h=o.getQuestion(n[c],u);this.qs.push(h),this.qs[this.qs.length-1].stateChanged.subscribe(e.proxy(this._renderSurvey,this),!1,!0)}}var l=e.proxy(function(){for(var t=0;t<this.qs.length;t++)this.qs[t].cfg.qt==a.questionType.SELECT&&this.qs[t].updateSelects()},this);this.SurveyUIUpdated.subscribe(function(){setTimeout(l,100)}),s.$el=t;for(var f=t.$(".acs-headingzone h1"),p=0;p<f.length;p++)r(f[p]).addClass("acs-feedback__heading acs-feedback__heading--h1");var d=t.$(".acs-topic__selector")[0],g=e.proxy(function(e){for(var i=t.$(".acs-feedback__topic"),n=0;n<i.length;n++)r(i[n]).removeClass("acs-visible__topic");try{r(document.getElementById("topk_"+e)).addClass("acs-visible__topic"),s._topic=e}catch(t){}s.SurveyUIUpdated.fire()},this);d&&i.Bind(d,"feedback:change",function(t){g(t.target.value)}),1==this.data.vistopics.length&&(this._topic=this.data.vistopics[0].id,this._renderSurvey(),r(document.getElementById("topk_"+this.data.vistopics[0].id)).addClass("acs-visible__topic"),l()),i.Bind(t.$(".acs-submit-feedback__button")[0],"click",e.proxy(function(t){var e=this._validateSurvey();return e&&!this.submitted&&(this.SubmitClicked.fire(),this.submitted=!0),t&&t.preventDefault&&t.preventDefault(),!1},this));for(var v=function(){i._preventUnloadFor(10)},w=document.querySelectorAll('a[href^="mailto"]'),y=0;y<w.length;y++)i.Bind(w[y],"feedback:click",v);for(var b=document.querySelectorAll(".acs-feedback__label p"),q=0;q<b.length;q++)r(b[q]).css({display:"inline"})},h.prototype.isExpired=function(){var t,e=new Date,i=new Date(e.getFullYear(),e.getMonth(),e.getDate());return!!this.cfg.fbexpiredate&&(exp=this.cfg.fbexpiredate.split("-"),t=new Date(exp[0],Number(exp[1])-1,exp[2]),t<i)},h.prototype._validationStatus=function(t){var e=r(this.$el.$(".acs-validation-block")[0]);t?e.css({display:"block"}):e.css({display:"none"})},{SurveyBuilder:h,TopicTester:u}});