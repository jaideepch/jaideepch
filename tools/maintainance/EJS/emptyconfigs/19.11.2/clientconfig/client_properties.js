module.exports = {
  /**
   * Variables that go into the build that apply to this client in particular
   */
  client: {
    /**
     * Most commonly edited values
     */
    id: null, //"FSRTESTINGCODECID12345==",

    /**
     * FCP info
     */
    clientid: 1, //null,//919191,
    sitekey: "emptyconfigs", //null,//"htest",

    replayid: "", //"testsite",
    siteid: "", //"testsite",

    /**
     * Products to build. Used mostly for testing
     * trigger, feedback, record
     */
    productsToBuild: [
      "trigger",
      "record",
      // , "feedback"
    ],

    /**
     * Omniture ID provided by client to capture OMTR_VID CPP. If undefined, the CPP will not be captured.
     */
    adobersid: null, //'fsekevin.reportsuite',

    /**
     * Tells us what type of persistent storage to use for state. In order of preference:
     *  1. 'COOKIE': Traditional. No server-side tracking. 1st and 3rd party cookies only.
     *  2. 'MICROCOOKIE': Preferred. A very small cookie is set (~38 bytes). Server tracking keeps most of the state.
     *  3. 'DOMSTORAGE': Should rarely be used. Only use this if: No cross-subdomain changes, No http->https changes, No inPrivate browsing.
     */
    persistence: "COOKIE",

    /**
     * true to create the cookie with the secure flag (HTTPS).
     * /!\ A secure cookie will only be created if the website is itself on HTTPS.
     */
    cookieSecure: false,

    /**
     * Cookies' domain.
     * Set our cookie on a specific domain for certain URLs.
     * Note: keep this commented or delete it to have the same behavior as pre 19.5.0
     *  (e.g. the domain used will always be the root domain)
     * Note: the URL (path) can use wildcards.
     * Note: the first match will be used, starting from the top.
     */
    cookieDomain: [
      //   {
      //     path: "https://m.*",
      //     domain: "m.macys.com"
      //   },
      //   {
      //     path: "*",
      //     domain: ".macys.com"
      //   }
    ],

    /**
     * The number of days after which a ForeSee cookie should expire.
     * Default if not set is 2 years (730 days).
     */
    cookieExpiration: null, //730,

    /**
     * Configuration for which journey events we want to send to the
     * analytics (big data) endpoint.
     */
    journeyEvents: {
      /**
       * In "never" mode, we never transmit the listed events. To transmit all
       * events, set transmit to "never" and have an empty list.
       *
       * In "only" mode, we only transmit the listed events and no others. To
       * transmit no events, set transmit to "only" and have an empty list.
       */
      transmit: "never", // "never" or "only"

      /**
       * The list of event names.
       * eg. ["fs_pageView", "fs_mouseoff", "fs_inviteShown", "fs_inviteAccepted"]
       */
      list: [],
    },

    /**
     * List of CPPs to disable. These will be disabled in trigger, feedback,
     * in the tracker window and in feedback popups.
     *
     * Examples of CPPS
     * url, browser, os, referrer, site, code, GA_ID, OMTR_VID, OMTR_BEACON
     *
     * If commented out or empty, nothing will be disabled
     */
    disable_cpps: [],

    /**
     * This setting is used in on-prem only, and becomes hard-coded into
     * the on-prem bundle. Make sure to set this before generating the
     * on-prem bundle with `gulp get_self_hosted`. This is a path to
     * a variable on `window` that contains an array of integrity hashes
     * generated by the `./run hash` command. If this setting is null
     * or undefined, the integrity checking is skipped. If this variable
     * is undefined on `window` the SDK will refuse to load (for security
     * reasons.)
     *
     * This variable is meant to be set in a tag manager or CRM so that
     * it is easy to update. It can contain many integrity hashes and
     * only one of them needs to match the `config.json` for it to work.
     * This allows "rolling updates."
     *
     * Note: This value is never sent to FCP and this can't be set from
     * CxSuite. This is a local setting only.
     */
    integrityHashLocation: null, //"fsrConfigIntegrityHashes",
  },
};
