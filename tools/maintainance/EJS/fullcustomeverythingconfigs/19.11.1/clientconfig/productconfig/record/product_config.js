/**
 * Record Configuration *****************************************************
 */
module.exports = {
  /**
   * Disable record on pages under specific conditions.
   *
   * Example:
   *   blacklist: {
   *     text: ["*test1.html"],
   *     variables: [{
   *       "name": "name1",
   *       value: "value1",
   *     },
   *     {
   *       name: "name2",
   *       value: "value2",
   *     }],
   *     cookies: [{
   *       "name": "cookie3",
   *       value: "value3",
   *     }],
   *   }
   */
  blacklist: {
    text: ["*custom_blacklisttext*"],
    variables: [
      {
        name: "custom_blacklistvariablename",
        value: "custom_blacklistvariablevalue",
      },
    ],
    cookies: [
      {
        name: "custom_blacklistcookiename",
        value: "custom_blacklistcookievalue",
      },
    ],
  },

  /**
   * URL whitelisting, so you can enable record on pages you actually want it to run on.
   */
  whitelist: {
    text: ["*custom_whitelisttext*"],
    variables: [
      {
        name: "custom_whitelistvariablename",
        value: "custom_whitelistvariablevalue",
      },
    ],
    cookies: [
      {
        name: "custom_whitelistcookiename",
        value: "custom_whitelistcookievalue",
      },
    ],
  },

  // clientId is now client.replayid in client_properties

  /**
   * Other settings
   */
  advancedSettings: {
    /**
     * Use SessionStorage instead of window.name to store replay data.
     * This will make sure window.name is no longer touched, but it will
     * no longer be able to follow the session between domains as a new
     * SessionStorage is created for each new domain.
     */
    useSessionStorage: true,

    /**
     * Maximum number of megabytes of storage to use for replay. By default
     * this is 4.5 megabytes for session storage and 10 megabytes for window
     * storage.
     */
    maxStorageMB: 99,

    /**
     * Set up cxReplay pools, which apply before cxR is activated. This is a sticky state and once
     * you are out, you're out (unless you get re-pooled back in)
     */
    replay_pools: [
      {
        /**
         * Which path to apply this rule to
         */
        path: "custom_replay_poolspath",
        /**
         * This is a special pooling number (like a sampling percentage) that applies before
         * any sampling, loyalty factor, or anything else. It's used mainly only to reduce
         * capture when using cxReplay
         */
        sp: 99,
      },
    ],

    /**
     * Global exclude. These supercede anything else. Once a user has been excluded, that's it.
     * They don't have another opportunity to be re-included until the repeat days pass.
     */
    exclude: {
      urls: ["*custom_excludeurl*", "*custom_excludeurl2*"],
      referrers: ["*custom_excludereferrers*", "*custom_excludereferrers2*"],
      userAgents: ["custom_excludeuseragent"],
      browsers: [{ name: "AOL Shield Browser", comparison: "lt", version: 3 }],
      cookies: [{ name: "custom_excludecookiename", value: "custom_excludecookievalue" }],
      variables: [{ name: "custom_excludevariablename", value: "custom_excludevariablevalue" }],
    },

    /**
     * List of supported browsers
     * Note: IE 𝓍 means we support 𝓍 and above
     * Note: Firefox 14+ due to MutationObservers
     */
    browser_cutoff: {
      IE: 1,
      Edge: 0,
      Safari: 1,
      Firefox: 1,
      Chrome: 1,
      "Chrome Mobile": 1,
      Opera: 1,
    },

    /**
     * List of supported platforms
     * Note: Android 4 means we support 4 and above
     * Note: Android 4.4 because of MutationObserver
     * Note: No support for Windows phone
     */
    platform_cutoff: {
      Android: 1,
      Winphone: 1,
      iPod: 1,
      iPhone: 1,
      iPad: 1,
    },

    /**
     * We can exclude some device types for record only here
     * If undefined, this will default to all devices true.
     * cxRecord needs to be set to true in trigger_config.js
     */
    device_type_support: {
      desktop: false,
      phone: false,
      tablet: false,
    },

    /**
     * Name of device and the token to look for in the user agent string. Not case sensitive
     */
    device_blacklist: ["custom_recorddevice_blacklist"],

    /**
     * @name pii The PII JSON that targets which elements should be masked/unmasked. Note that we now use
     * masking syntax. EG: "*myURLFragment*". See utils.testAgainstSearch() for docs.
     *
     * Note: by default, all contents of all pages are masked, including all text inputs. Everything
     * that follows is about loosening that restriction.
     *
     * Also Note: inputs are always masked by default (whitelisting mode), even if the rest of the page
     * is in the pagesToSelectiveMask list and has selectiveMaskZones set up. This is to make really sure
     * that inputs cannot accidently leak PII. If a new field is added to a form, it will always be masked
     * unless configured otherwise with visibleInputs
     *
     * UPGRADING: The code has a very simple algorithm to assist in upgrading old configs. Simply run record
     * with the old configs and it will emit a helpful console message (even in production) with a crude
     * guess of what the config should be. It just copy-pastes some of the old configs into the new fields.
     * Just copy-paste that into the pii block below and go from there. You may need to clean up some bad
     * guesses and properly configure pagesToSelectiveMask.
     *
     * @prop {String} [maskCharacters] a string containing the character or characters to be randomly
     * chosen to be the replacement for masked characters on the page. Optional, random letters and
     * numbers will be used if this is missing or falsey. Using "****." will mostly use asterisks with
     * the occasional dot to offset the width of the asterisk.
     *
     * @prop {Object} selectiveUnMaskZones this defines areas of pages to be UNMASKED on pages that
     * would normally be completely masked (whitelisting).
     *
     * @prop {Array<String>} pagesToSelectiveMask This identifies page URL's (by wildcard) that switch from automatic
     * mask-everything (whitelisting) to blacklisting. If a page falls into this category, we ignore
     * all rules inside selectiveUnMaskZones and look instead at selectiveMaskZones.
     *
     * @prop {Object} selectiveMaskZones Identifies elements on pages to mask for pages that are in pagesToSelectiveMask.
     * A page must already be in the pagesToSelectiveMask list to qualify for this type of masking.
     *
     * @prop {Object} visibleInputs Identifies inputs, textareas and selects to unblock. Works even when elements are
     *  inserted into document. Only use this when necessary, it's not as efficient.
     *
     * @prop {Object} redactZones Identifies elements to obscuring. This will result in everything inside it to
     * be blacked out, including images and text. This still could reasult in the contents being transmitted
     * to the server, but the viewer will not see it. Useful for profile images and the like.
     */
    pii: {
      maskCharacters: "custom_maskCharacters",
      selectiveUnMaskZones: {
        "*custom_selectiveUnMaskZonesurl*": "#selectiveUnMaskZonescustom_cssselector",
      },
      pagesToSelectiveMask: ["*custom_pagesToSelectiveMaskurl*"],
      selectiveMaskZones: {
        "*custom_selectiveMaskZonesurl*": "#custom_selectiveMaskZonescssselector",
      },
      visibleInputs: { "*custom_visibleInputsurl*": "#custom_visibleInputscssselector" },
      redactZones: { "*custom_redactZonesurl*": "#custom_redactZonescssselector" },
    },

    /**
     * Should we skip the tracking of iFrames
     */
    skipIframes: true,
  },
};
