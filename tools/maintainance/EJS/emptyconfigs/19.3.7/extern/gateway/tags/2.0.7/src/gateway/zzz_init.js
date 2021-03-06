domReady(function () {
  /* pragma:DEBUG_START */
  console.warn("gw: domReady");
  /* pragma:DEBUG_END */

  // Everything has to be done on nextTick to avoid race conditions
  nextTick(function () {
    var dm,
      i,
      fsrd = 'fsReady';

    if (locator.gwScript) {
      dm = attr(locator.gwScript, "data-module");
    }

    // This is a temporary measure for legacy embed snippets
    if (isDefined(_W["acsReady"])) {
      _W[fsrd] = _W["acsReady"];
    }
    if (!isDefined(_W["acsReady"])) {
      var altR = function () {
        var aT = '__' + fsrd + '_stk__';
        _W[aT] = _W[aT] || [];
        _W[aT].push(arguments);
      };
      _W["acsReady"] = _W[fsrd] || altR;
    }

    var dependencies = [];

    /**
     * This will be called at the end regardless
     */
    var finalSetup = function () {
      if (globalConfig.minGatewayVersion && gatewayVersion) {
        /* pragma:DEBUG_START */
        console.warn("gw: minimum gateway version is " + globalConfig.minGatewayVersion + " but the actual version is " + gatewayVersion + " - bombing out");
        /* pragma:DEBUG_END */
        if (globalConfig.minGatewayVersion > gatewayVersion) {
          return;
        }
      }
      // Iterate over the products
      eachProp(productConfig, function (obj, prop) {
        if (isDefined(globalConfig.products[prop.toLowerCase()]) && globalConfig.products[prop.toLowerCase()] === false) {
          obj.check = false;
        }
        if (isFunction(obj.check)) {
          obj.check = obj.check.call(obj);
        }
        if (!isDefined(obj.check)) {
          obj.check = true;
        }
        if (!isDefined(obj.dependencies)) {
          obj.dependencies = [];
        }
        /* pragma:DEBUG_START */
        console.log("gw: checked " + prop + ", result was", obj.check);
        /* pragma:DEBUG_END */
        if (obj.check) {
          dependencies = dependencies.concat(obj.dependencies);
        }
      });

      if (!dm) {
        /* pragma:DEBUG_START */
        console.log("gw: dependencies", dependencies);
        /* pragma:DEBUG_END */

        for (i = 0; i < dependencies.length; i++) {
          dependencies[i] = locator.normalizeUrl(dependencies[i]);
        }
        _fsRequire(dependencies, function () {
          if (!_W['__' + fsrd + '__']) {
            // Legacy acsReady/fsReady functionality
            _W['__' + fsrd + '__'] = _W['__acsReady__'] = _W['fsReady'] = _W['acsReady'] = function () {
              var args = arguments;
              nextTick(function () {
                for (var p = 0; p < args.length; p++) {
                  args[p].call(_W);
                }
              });
            };
            var ns = _W['__' + fsrd + '_stk__'],
              fnmaker = function (cb) {
                return function () {
                  for (var p = 0; p < cb.length; p++) {
                    cb[p].call(_W);
                  }
                };
              };
            if (ns) {
              for (var i = 0; i < ns.length; i++) {
                nextTick(fnmaker(ns[i]));
              }
              delete _W['__' + fsrd + '_stk__'];
            }
          }
        });
      } else if (dm) {
        nextTick(function () {
          /* pragma:DEBUG_START */
          console.log("gw: loading " + dm + " as data-module");
          /* pragma:DEBUG_END */
          _fsRequire([_fsNormalizeUrl(dm)], function () {
            /* pragma:DEBUG_START */
            console.log("gw: loaded " + dm + " successfully");
            /* pragma:DEBUG_END */
          });
        });
      }
    };

    // Are we in a self-host situation?
    if (globalConfig.selfHosted) {
      /* pragma:DEBUG_START */
      console.log("gw: self hosted flow started");
      /* pragma:DEBUG_END */

      _fsRequire([locator.normalizeUrl("$fs.utils.js")], function (utils) {
        var winStor = new utils.WindowStorage('fssetts', false),
          appSett = winStor.get('setts');

        if (!appSett) {
          var transprt = new utils.AjaxTransport();
          transprt.send({
            method: "GET",
            url: location.protocol + "//" + globalConfig.configLocation + "/" + locator.environment + "/config.json",
            success: function (data) {
              if (data) {
                winStor.set('setts', data);
                appSett = JSON.parse(data);
                ext(globalConfig, appSett.global);
                ext(productConfig, appSett);
                delete productConfig.global;
                winStor.commit();
                finishSelfHost(appSett);
              }
            }
          });
        } else {
          appSett = JSON.parse(appSett);
          ext(globalConfig, appSett.global);
          ext(productConfig, appSett);
          delete productConfig.global;
          nextTick(function () {
            finishSelfHost(appSett);
          });
        }

        /**
         * finish the self-host setup
         */
        var finishSelfHost = function (setts) {
          setts.global.codeVer = globalConfig.codeVer;
          ext(globalConfig, setts.global);
          productConfig = {};
          eachProp(setts, function (obj, prop) {
            if (prop != 'global' && !(isDefined(globalConfig.products[prop]) && globalConfig.products[prop] === false)) {
              dependencies.push('$fs.' + prop + '.js');
              productConfig[prop] = {
                check: function (prp, bj) {
                  return function () {
                    define(prp + 'config', function() {
                      return bj;
                    });
                  };
                }(prop, obj)
              };
            }
          });
          finalSetup();
        };
      });
    } else {
      finalSetup();
    }
  });
});