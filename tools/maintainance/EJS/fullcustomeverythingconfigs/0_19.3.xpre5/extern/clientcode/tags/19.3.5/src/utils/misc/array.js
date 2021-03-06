/**
 * Tools for working with arrays
 *
 * (c) Copyright 2015 ForeSee, Inc.
 *
 * @author Alexei White (alexei.white@foresee.com)
 * @author Alexei White: alexei.white $
 *
 */

fs.provide("fs.Utils.Misc.Array");

fs.require("fs.Top");

(function (utils) {

  /**
   * De-duplicates an array
   * @param arr {Array} The array
   */
  utils.dedupe = function (arr) {
    var i,
      j;
    for (i = arr.length - 1; i >= 0; i--) {
      for (j = i - 1; j >= 0; j--) {
        if (arr[j] == arr[i]) {
          arr.splice(i, 1);
        }
      }
    }
    return arr;
  };

  /**
   * Returns the index of the element in the object, or -1
   * if not found.  If the object is an array or object, the index
   * is found with the "in" operator.  All other values are treated
   * as strings.
   * @param {Object} e Element to locate in the array
   * @param {Object} obj The object to search
   * @return {Number}
   */
  utils.arrayIndexOf = function (e, obj) {
    for (var a in obj) {
      if (obj[a] === e) {
        return a;
      }
    }
    return -1;
  };

  /**
   * Returns <code>true</code> if the element is in the array
   * @param {Object} e Element to locate in the array
   * @param {Array} arr The array to search
   * @return {Boolean}
   */
  utils.inArray = function (e, arr) {
    return utils.arrayIndexOf(e, arr) != -1;
  };

})(utils);