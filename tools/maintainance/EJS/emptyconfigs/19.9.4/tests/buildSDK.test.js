const SDKConfigs = require("../scripts/SDKConfigs");

const rxAnalyticsUrl = new RegExp(/https:\/\/.*analytics/);

describe.each([["dev", 0], ["qa", 1], ["qa2", 2], ["stg", 3], ["prod", 4], ["local", 5]])(
  "%s global config",
  (name, id) => {
    test(`has a valid analytics URL`, () => {
      const cfg = SDKConfigs.getGlobalConfig(id);
      expect(cfg.analyticsUrl).toEqual(expect.stringMatching(rxAnalyticsUrl));
    });
  }
);
