/**
 * Reading and writing SessionStorage
 *
 * (c) Copyright 2018 ForeSee, Inc.
 *
 */

fs.provide("fs.Utils.Storage.SeshStorage");

fs.require("fs.Top");
fs.require("fs.Utils.Storage.DomStorage");
fs.require("fs.Utils.Misc.Basic");
fs.require("fs.Utils.Dom.Event");

(function (utils) {

  /**
   * @class Creates a SessionStorage DOM storage object
   * @param guid {String} The unique ID of the storage object. This helps separate storage instances between tabs, etc. Optional.
   * @constructor
   */
  var SeshStorage = function (guid, autocommit) {
    DomStorage.call(this, guid, autocommit);
  };

  // Set up prototype chain, restore the constructor
  SeshStorage.prototype = Object.create(DomStorage.prototype);
  SeshStorage.prototype.constructor = SeshStorage;

  /**
   * Test if this storage method is supported
   * @return {Boolean}
   */
  SeshStorage.isSupported = function () {
    return fs.supportsDomStorage;
  };

  /**
   * Read from window.name to the cache
   * @private
   */
  SeshStorage.prototype.sync = function () {
    var data;
    try {
      data = sessionStorage.getItem(this.guid + '_OBJ');
      if (data && data.length > 0) {
        this._data_obj = JSON.parse(data);
        this.storageBytesObj = data.length;
        this.isNewStorage = false;
      }
    } catch (e) {
    }

    try {
      data = sessionStorage.getItem(this.guid + '_BLOB');
      if (data && data.length > 0) {
        this._data_blob = data;
        this.storageBytesBlob = data.length;
        this.isNewStorage = false;
      }
    } catch (e) {
    }
  };

  /**
   * Write the cache to the actual DOM
   */
  SeshStorage.prototype.commit = function () {
    try {
      // Write it out
      sessionStorage.setItem(this.guid + '_OBJ', JSON.stringify(this._data_obj));
      sessionStorage.setItem(this.guid + '_BLOB', this._data_blob);
    } catch (e) {
    }
  };

  // Add it to the utils global
  utils.SeshStorage = SeshStorage;

})(utils);