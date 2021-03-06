/**
 * PopUp Window
 *
 * (c) Copyright 2015 ForeSee, Inc.
 *
 * @author Alexei White (alexei.white@foresee.com)
 * @author Alexei White: alexei.white $
 *
 */

fs.provide("fs.PopWindow");

fs.require("fs.Top");
fs.require("fs.Dom.MiniDOM");
fs.require("fs.Loader");
fs.require("fs.Misc.Template");

(function () {

  /**
   * This is the JS file that gets included in a standalone window when the pop mode is set to a popup (ie: on mobile devices)
   * @param survey
   * @constructor
   */
  var PopWindow = function (configs, browser, jrny, mid, cppo, namespace, isstandalone) {
    /* pragma:DEBUG_START */
    console.log("fbs: setting up PopWindow with ", configs);
    /* pragma:DEBUG_END */
    // The survey mid is ge
    var cfg;

    this.isStandalone = isstandalone;
    // Get a CPPS instance
    this.cpps = new CPPS(namespace);
    this.networkError = new utils.FSEvent();
    if (cppo && cppo.length > 2) {
      // Carry over any CPPS that were in the query string
      cppo = JSON.parse(decodeURIComponent(utils.Compress.decompress(cppo)));
      for (var nk in cppo) {
        this.cpps.set(nk, cppo[nk]);
      }
    }

    // Keep track of the browser
    this.br = browser;

    // Did we submit the results?
    this.didSubmit = false;

    this.loader = new Loader();
    document.body.appendChild(this.loader.$el);

    if (configs && !!configs.instances && !!configs.instances.length) {
      // Find the config object for this survey
      for (var i = 0; i < configs.instances.length; i++) {
        if (configs.instances[i].mid == mid) {
          cfg = this.cfg = configs.instances[i];
          break;
        }
      }
    }

    if (typeof cfg === 'undefined' && (configs.preview || namespace === "preview")) {
      var datauri = fs.getParam('datauri'),
        tmpl = fs.getParam('template') || 'default';

      cfg = this.cfg = {
        mid: mid,
        datauri: datauri,
        posturi: "",
        reporturi: "",
        surveytype: "popup",
        autowhitelist: true,
        preview: true,
        template: tmpl,
        replay: false
      };
    }

    if (cfg) {
      var ctx = this,
      // CC-3039 add IE10 class for customizations
        ie10Class = browser.isIE && browser.browser.actualVersion == 10 ? ' acsIE10' : '';
      document.title = this.cfg.label;
      // Keep track of journey
      this.jrny = jrny;

      this.sv = new survey.SurveyBuilder(this.cfg, this.cpps, this.br);

      this.sv.cfg.privacyuri = (!this.sv.cfg.privacyuri) ? "http://www.foresee.com/about-us/privacy-policy/" : this.sv.cfg.privacyuri;
      this.sv.cfg.privacytext = (!this.sv.cfg.privacytext) ? 'Privacy policy' : this.sv.cfg.privacytext;


      // Set up the main content node
      this.$content = $("<div class=\"acsMainContainerMobile--" + cfg.template + ie10Class + "\"></div>");

      // If we are on mobile, signal the journey event
      if (browser.isMobile && ctx.jrny) {
        ctx.jrny.addEventObj({
          "name": "feedback_clicked_mobile",
          "properties": {
            "mid": [ctx.cfg.mid]
          }
        });
      }

      // Bind to the event that fires when a network error occurred
      this.networkError.subscribe(fs.proxy(function (obj) {
        if (ctx.jrny) {
          if (obj && !!obj.type) {
            // Keeping this if the error is not covered in the code..
            ctx.jrny.addEventObj({
              "name": "survey_" + obj.type,
              "properties": {
                "mid": [ctx.cfg.mid]
              }
            });
          } else {
            ctx.jrny.addEventObj({
              "name": "server_error",
              "properties": {
                "mid": [ctx.cfg.mid]
              }
            });
          }
        }
        this.renderError(obj.type);
      }, this));

      this.initQ = new utils.Async(true, fs.proxy(function () {
        /* pragma:DEBUG_START */
        console.warn("fbs: fetched CSS and error template.");
        /* pragma:DEBUG_END */
        this._getTemplatesAndRender();
      }, this), fs.proxy(function () {
        /* pragma:DEBUG_START */
        console.warn("fbs: failed fetching CSS or error template.");
        /* pragma:DEBUG_END */
        window.close();
      }, this));

      this.initQ.enqueue(fs.proxy(function (prom) {
        this._getCSS(prom);
      }, this));

      this.initQ.enqueue(fs.proxy(function (prom) {
        this._getTemplate('serviceunavailable', prom, fs.proxy(function (template) {
          this.errTemplate = template;
        }, this));
      }, this));
    }

    // Before the window unloads, signal abandon
    utils.Bind(window, "unload", function () {
      if (!ctx.didSubmit && ctx.jrny) {
        // Signal the event to the eventing server
        ctx.jrny.addEventObj({
          "name": "feedback_abandoned",
          "properties": {
            "mid": [ctx.cfg.mid]
          }
        });
      }
    });
  };

  /*
   * Gets Survey, error and thank you templates.
   *
   */
  PopWindow.prototype._getTemplatesAndRender = function () {
    /* pragma:DEBUG_START */
    console.warn("fbs: getting templates.");
    /* pragma:DEBUG_END */
    var queue = new utils.Async(true, fs.proxy(function () {
      /* pragma:DEBUG_START */
      console.warn("fbs: fetched ", this.sv.cfg.template, " templates.");
      /* pragma:DEBUG_END */
      this.renderSurvey();
    }, this), fs.proxy(function () {
      /* pragma:DEBUG_START */
      console.warn("fbs: failed fetching ", this.sv.cfg.template, " templates.");
      /* pragma:DEBUG_END */
      this.renderError();
    }, this));

    queue.enqueue(fs.proxy(function (prom) {
      // Go get the survey data
      this._getSurveyData(fs.proxy(function (data) {
        this.survey = data;
        /* pragma:DEBUG_START */
        console.warn("fbs: fetched survey data.");
        /* pragma:DEBUG_END */
        prom.resolve();
      }, this));
    }, this));

    queue.enqueue(fs.proxy(function (prom) {
      this._getTemplate('epilogue', prom, fs.proxy(function (template) {
        this.epTemplate = template;
      }, this));
    }, this));

    queue.enqueue(fs.proxy(function (prom) {
      this._getTemplate('surveycontents', prom, fs.proxy(function (template) {
        this.svContentsTemplate = template;
      }, this));
    }, this));

    // Health Check..
    queue.enqueue(fs.proxy(function (prom) {
      utils.Healthy(this.br, ["survey", "static"], prom.resolve, prom.error);
    }, this));
  };
  /*
   * Get the css for the templates
   *
   */
  PopWindow.prototype._getCSS = function (prom) {
    /* pragma:DEBUG_START */
    console.log("fbs: getting css");
    /* pragma:DEBUG_END */
    utils.loadCSS(_fsNormalizeUrl("$templates/feedback/" + (this.sv.cfg.template || 'default') + '/fs.feedback.css'),
      function (link) {
        if (link) {
          /* pragma:DEBUG_START */
          console.log("fbs: css loaded");
          /* pragma:DEBUG_END */
          prom.resolve();
        } else {
          prom.error();
        }
      },
      null, this.br);
  };

  /*
   * Grabs a template by making a jsonp call.
   * @private
   * @return Object
   * @param type what kind of template
   * @param prom promise to be resolved to signal the caller
   */
  PopWindow.prototype._getTemplate = function (type, prom, cb) {
    var tmp = (this.cfg.template || 'default'),
      url = _fsNormalizeUrl("$templates/feedback/" + tmp + '/' + type + '.html');

    // Make a call to get the error template
    var jp = new utils.JSONP({
      success: fs.proxy(function (res) {
        cb(res);
        if (prom) {
          prom.resolve();
        }
      }, this),
      failure: fs.proxy(function (res) {
        if (prom) {
          /* pragma:DEBUG_START */
          console.warn("fbs: failed to fetch " + url);
          /* pragma:DEBUG_END */
          prom.error();
        }
      }, this)
    });
    jp.get(url, 'templates_feedback_' + tmp + '_');
  };

  /**
   * Show the thankyou page
   * @private
   */
  PopWindow.prototype._showThankyou = function () {
    var ctx = this,
      res = Templater(this.epTemplate, this.survey);

    ctx.didSubmit = true;
    this.$content.innerHTML = res;
    var h1s = this.$content.$("h1");
    for (var p = 0; p < h1s.length; p++) {
      $(h1s[p]).addClass("acs-feedback__heading acs-feedback__heading--h1");
    }
    var cbut = this.$content.$(".acs-close-button")[0];

    if (!this.cfg.preview) {
      utils.Bind(cbut, "click", function () {
        if (ctx.jrny) {
          // Signal the event to the eventing server
          ctx.jrny.addEventObj({
            "name": "feedback_thankyou_clicked",
            "properties": {
              "mid": [ctx.cfg.mid]
            }
          });
        }
        window.close();
      });
    }

    // Hide the loader
    this.hideLoad();
  };

  /**
   * Hide the content and show the loading indicator
   */
  PopWindow.prototype.showLoad = function () {
    this.loader.center();
    this.$content.css({opacity: 0});
  };

  /**
   * Show the content and hide the loading indicator
   */
  PopWindow.prototype.hideLoad = function () {
    this.loader.moveOffScreen();
    this.$content.css({opacity: 1});
  };

  /**
   * Add/Update content
   * @param $el
   */
  PopWindow.prototype.renderSurvey = function () {
    var ctx = this;
    // Signal the event to the eventing server

    if (ctx.jrny) {
      ctx.jrny.addEventObj({
        "name": "feedback_survey_shown",
        "properties": {
          "mid": [ctx.cfg.mid]
        }
      });
    }

    // Remove the table
    var oldtb = $("#acsPleaseWaitTable")[0];
    oldtb.parentNode.removeChild(oldtb);

    // Add the logo src
    this.survey.ansLogoSrc = _fsNormalizeUrl("$p_b_foresee.svg");
    var res = Templater(this.svContentsTemplate, this.survey);
    this.$content.innerHTML = res;
    window.document.body.appendChild(this.$content);
    this.sv.bind(this.$content);

    // Bind to when we start submitting
    this.sv.SubmitClicked.subscribe(fs.proxy(function () {
      this.showLoad();
      // Signal the event to the eventing server
      if (ctx.jrny) {
        ctx.jrny.addEventObj({
          "name": "feedback_submitted",
          "properties": {
            "mid": [ctx.cfg.mid]
          }
        });
      }

      // Verify that the survey and static asset endpoints are up
      utils.Healthy(this.br, ["survey", "static"],
        // Health Check success.
        fs.proxy(function () {
          this._postSurveyData(fs.proxy(function (success) {
            if (success) {
              if (!this.cfg.preview) {
                // Call processImmediate if required
                Replay.processImmediate();
              }
              // Show thankyou UI
              this._showThankyou();
            } else {
              this.networkError.fire({type: 'postdata_failed'});
            }
          }, this));
        }, this),
        // Health Check failure.
        fs.proxy(function () {
          this.networkError.fire({type: 'postdata_failed'});
        }, this)
      );
    }, this));

    // Hide the loader
    this.hideLoad();
  };

  /**
   * Show Error template
   * @param String type of error
   */
  PopWindow.prototype.renderError = function (type) {
    this.$content.innerHTML = Templater(this.errTemplate, this.sv);
    var msg = this.$content.$(".acs-serviceunavailable__message")[0];
    if (type === 'expired') {
      while (msg.firstChild) {
        msg.removeChild(msg.firstChild);
      }
      if (this.sv.cfg.fbexpiremessage) {
        msg.appendChild($('<p>' + this.sv.cfg.fbexpiremessage + '</p>'));
      } else {
        msg.appendChild($(this._unencodeHTML(this.sv.defaultCfg.expired)));
      }
    } else {
      while (msg.firstChild) {
        msg.removeChild(msg.firstChild);
      }
      msg.appendChild($(this._unencodeHTML(this.sv.defaultCfg.unavailable)));
    }
    document.body.appendChild(this.$content);
    var h3s = this.$content.$("h3");
    for (var p = 0; p < h3s.length; p++) {
      $(h3s[p]).addClass("acs-feedback__heading acs-feedback__heading--h1");
    }
    var cbut = this.$content.$(".acs-close-button")[0];

    if (!this.cfg.preview) {
      utils.Bind(cbut, "click", function () {
        window.close();
      });
    }

    this.hideLoad();
    var oldtb = $("#acsPleaseWaitTable")[0];
    if (oldtb) {
      oldtb.parentNode.removeChild(oldtb);
    }
  };
  /**
   * unencodes html when necessary.
   * @private
   */
  PopWindow.prototype._unencodeHTML = function (str) {
    var lt = /&lt;/ig,
      gt = /&gt;/ig;
    return str.replace(lt, "<").replace(gt, ">");
  };
  /**
   * GET the survey data.
   * @param function callback to be called when it's successful.
   * @private
   */
  PopWindow.prototype._getSurveyData = function (cb) {
    if (!this.sv.isExpired()) {
      // Set a timer to simulate a timeout on the ajax request
      this._surveyTimer = setTimeout(fs.proxy(function () {
        /* pragma:DEBUG_START */
        console.warn("fbs: timed out requesting data from the server");
        /* pragma:DEBUG_END */
        this.networkError.fire({type: 'timedout'});
      }, this), 10000);
      // Make a call to get the data
      var SurveyDataRequest = new utils.AjaxTransport({
        url: this.cfg.datauri,
        method: "GET",
        success: fs.proxy(function (res) {
          if (!this.networkError.didFire) {
            clearTimeout(this._surveyTimer);
            this.sv.SurveyData.fire(res, fs.proxy(function (data) {
              if (cb) {
                cb(data);
              }
            }, this));
          }
        }, this),
        failure: fs.proxy(function (res) {
          clearTimeout(this._surveyTimer);
          // Fire the network error event
          this.networkError.fire({type: 'getdata_failed'});
        }, this)
      });

      SurveyDataRequest.send({
        data: {
          'mid': this.cfg.mid,
          'cachebust': (new Date()).getTime(),
          'version': this.cfg.version
        }
      });
    } else {
      /* pragma:DEBUG_START */
      console.warn("fb: Survey is expired..");
      /* pragma:DEBUG_END */
      this.networkError.fire({type: 'expired'});
    }
  };
  /**
   * Make a request to POST Survey data
   * @private
   * @param function callback to be called when POST is successful.
   */
  PopWindow.prototype._postSurveyData = function (cb) {
    // Don't do anything if we are in preview mode
    if (this.cfg.preview) {
      fs.nextTick(function () {
        if (cb) {
          cb(true);
        }
      });
      // Bomb out
      return;
    } else {
      this._surveyTimer = setTimeout(fs.proxy(function () {
        /* pragma:DEBUG_START */
        console.warn("fb: timed out posting data to the server");
        /* pragma:DEBUG_END */
        this.networkError.fire({type: 'timedout'});
      }, this), 10000);
      var SurveyDataRequest = new utils.AjaxTransport({
        url: this.sv.cfg.posturi,
        method: "POST",
        success: fs.proxy(function (res) {
          clearTimeout(this._surveyTimer);
          if (cb) {
            cb(true);
          }
        }, this),
        failure: fs.proxy(function (res) {
          clearTimeout(this._surveyTimer);
          // Set a persistent value
          sessionStorage.setItem('acsFeedbackSubmitted', 'true');
          if (cb) {
            cb(false);
          }
        }, this)
      });

      var data = JSON.parse(this.sv._serialize()),
        tdata = utils.Compress.compress(JSON.stringify(fs.ext({rating: this.sv._getScore()}, data)));

      if (!this.isStandalone) {
        // Set the window hash
        window.location.hash = "fsSurveyComplete=" + encodeURIComponent(tdata);
      }

      // Post the data
      SurveyDataRequest.send({
        data: data,
        skipEncode: true,
        contentType: 'application/json'
      });
    }
  };
})();