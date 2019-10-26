/**
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 *
 * Taken from https://github.com/ericf/css-mediaquery/blob/master/index.js
 *
 * Modified slightly (c) 2018, ForeSee Results, Inc.
 */

// ES6 methods are safe to use in replay
/* eslint-disable es5/no-es6-methods, es5/no-es6-static-methods */

/**
 * This is a MediaQuery level 1-3 parser using regex.
 */
const MediaQuery = (() => {
  const RE_MEDIA_QUERY = /^(?:(only|not)?\s*([_a-z][_a-z0-9-]*)|(\([^)]+\)))(?:\s*and\s*(.*))?$/i;
  const RE_MQ_EXPRESSION = /^\(\s*(?:-webkit-)?([_a-z-][_a-z0-9-]*)\s*(?::\s*([^)]+))?\s*\)$/;
  const RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/;
  const RE_LENGTH_UNIT = /(em|rem|px|cm|mm|in|pt|pc)?\s*$/;
  const RE_RESOLUTION_UNIT = /(dpi|dpcm|dppx)?\s*$/;

  function matchQuery(mediaQuery, values) {
    return parseQuery(mediaQuery).some(query => {
      const inverse = query.inverse;

      // Either the parsed or specified `type` is "all", or the types must be
      // equal for a match.
      const typeMatch = query.type === "all" || values.type === query.type;

      // Quit early when `type` doesn't match, but take "not" into account.
      if ((typeMatch && inverse) || !(typeMatch || inverse)) {
        return false;
      }

      const expressionsMatch = query.expressions.every(expression => {
        const feature = expression.feature;
        const modifier = expression.modifier;
        let expValue = expression.value;
        let value = values[feature];

        // Missing or falsy values don't match.
        if (!value) {
          throw new Error(`Missing value for ${feature}`);
        }

        switch (feature) {
          case "orientation":
          case "scan":
            return value.toLowerCase() === expValue.toLowerCase();

          case "width":
          case "height":
          case "device-width":
          case "device-height":
            expValue = toPx(expValue);
            value = toPx(value);
            break;

          case "resolution":
            expValue = toDpi(expValue);
            value = toDpi(value);
            break;

          case "aspect-ratio":
          case "device-aspect-ratio":
          case /* Deprecated */ "device-pixel-ratio":
            expValue = toDecimal(expValue);
            value = toDecimal(value);
            break;

          case "grid":
          case "color":
          case "color-index":
          case "monochrome":
            expValue = parseInt(expValue, 10) || 1;
            value = parseInt(value, 10) || 0;
            break;

          default:
          //ignore
        }

        switch (modifier) {
          case "min":
            return value >= expValue;
          case "max":
            return value <= expValue;
          default:
            return value === expValue;
        }
      });

      return (expressionsMatch && !inverse) || (!expressionsMatch && inverse);
    });
  }

  function parseQuery(mediaQuery) {
    return mediaQuery.split(",").map(query => {
      query = query.trim();

      const captures = query.match(RE_MEDIA_QUERY);

      // Media Query must be valid.
      if (!captures) {
        throw new SyntaxError(`Unable to parse query: "${query}"`);
      }

      const modifier = captures[1];
      const type = captures[2];
      let expressions = ((captures[3] || "") + (captures[4] || "")).trim();
      const parsed = {};

      parsed.inverse = !!modifier && modifier.toLowerCase() === "not";
      parsed.type = type ? type.toLowerCase() : "all";

      // Check for media query expressions.
      if (!expressions) {
        parsed.expressions = [];
        return parsed;
      }

      // Split expressions into a list.
      expressions = expressions.match(/\([^)]+\)/g);

      // Media Query must be valid.
      if (!expressions) {
        throw new SyntaxError(`Unable to parse expressions: "${query}"`);
      }

      parsed.expressions = expressions.map(expression => {
        const captures = expression.match(RE_MQ_EXPRESSION);

        // Media Query must be valid.
        if (!captures) {
          throw new SyntaxError(`Unabled to parse expression: "${expression}"`);
        }

        const feature = captures[1].toLowerCase().match(RE_MQ_FEATURE);

        return {
          modifier: feature[1],
          feature: feature[2],
          value: captures[2],
        };
      });

      return parsed;
    });
  }

  // -- Utilities ----------------------------------------------------------------

  function toDecimal(ratio) {
    let decimal = Number(ratio);
    let numbers;

    if (Number.isNaN(decimal)) {
      numbers = ratio.match(/^(\d+)\s*\/\s*(\d+)$/);
      decimal = numbers[1] / numbers[2];
    }

    return decimal;
  }

  function toDpi(resolution) {
    const value = parseFloat(resolution);
    const units = String(resolution).match(RE_RESOLUTION_UNIT)[1];

    switch (units) {
      case "dpcm":
        return value / 2.54;
      case "dppx":
        return value * 96;
      default:
        return value;
    }
  }

  function toPx(length) {
    const value = parseFloat(length);
    const units = String(length).match(RE_LENGTH_UNIT)[1];

    switch (units) {
      case "em":
        return value * 16;
      case "rem":
        return value * 16;
      case "cm":
        return (value * 96) / 2.54;
      case "mm":
        return (value * 96) / 2.54 / 10;
      case "in":
        return value * 96;
      case "pt":
        return value * 72;
      case "pc":
        return (value * 72) / 12;
      default:
        return value;
    }
  }

  return {
    matchQuery,
  };
})();

export { MediaQuery };
