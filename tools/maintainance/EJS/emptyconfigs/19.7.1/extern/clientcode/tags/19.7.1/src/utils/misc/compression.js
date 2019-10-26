/**
 * Provides interfaces to compression code (Zlib primarily)
 *
 * (c) Copyright 2015 ForeSee, Inc.
 *
 * @author Alexei White (alexei.white@foresee.com)
 * @author Alexei White: alexei.white $
 *
 */

fs.provide("fs.Utils.Misc.Compression");

fs.require("fs.Top");
fs.require("fs.Utils.Misc.Zlib");

(function (utils) {

  /**
   * A compression module (GZIP DEFLATE/INFLATE)
   * @type {{byteArrayToString: byteArrayToString, stringToByteArray: stringToByteArray, _utf8_encode: _utf8_encode, compress: compress, fragmentAndCompress: fragmentAndCompress, decompress: decompress}}
   */
  var Compress = {
    /**
     * Translate a byte array to a string
     * @param byte_array
     * @returns {string}
     */
    byteArrayToString: function (byte_array) {
      var ret = "",
        i;
      for (i = 0; i < byte_array.length; i++) {
        ret += String.fromCharCode(byte_array[i]);
      }
      return ret;
    },

    /**
     * Translate a string to a byte array
     * @param string
     * @returns {Array}
     */
    stringToByteArray: function (string) {
      var byte_array = new Uint8Array(string.length),
        i;
      for (i = 0; i < string.length; i++) {
        byte_array[i] = string.charCodeAt(i);
      }
      return byte_array;
    },

    /**
     * Convert to utf8
     * @param string
     * @returns {string}
     * @private
     */
    _utf8_encode: function (s) {
      return unescape(encodeURIComponent(s));
    },

    /**
     * Convert to original
     * @param string
     * @returns {string}
     * @private
     */
    _utf8_decode: function (s) {
      return decodeURIComponent(escape(s));
    },

    /**
     * Compress it
     * @param data
     * @param encodingFn  ex: fs.enc, Compress._utf8_encode (default)
     */
    compress: function (data) {
      var input = Compress.stringToByteArray(Compress._utf8_encode(data));

      var deflated = utils.Zlib.zlibDeflate(input, { raw: true, to: "string" });

      utils.Zlib.zlibInflate(Compress.stringToByteArray(deflated), { raw: true, to: "string" });

      // Translate the compressed byte array to a base-64 encoded string
      return btoa(deflated);
    },

    /**
     * Convert to compressed fragments.
     * TODO: REMOVE THIS AFTER WE DEPRECATE THE OLD RECORDER
     * @param data
     * @param fragment_size
     * @returns {string}
     */
    fragmentAndCompress: function (data, fragment_size) {
      fragment_size = fragment_size || 100000;

      var ret = "",
        fragment_count = parseInt(data.length / fragment_size) + 1,
        i,
        compressed_string;

      // Compress it as fragments of 100000 separated by _CMP_ tokens
      for (i = 0; i < fragment_count; i++) {
        // Translate the compressed byte array to a base-64 encoded string
        compressed_string = Compress.compress(data.substring(i * fragment_size, (i + 1) * fragment_size));

        // Add the compressed string to the payload
        ret += ("_CMP_" + compressed_string);
      }

      return ret;
    },

    /**
     * Decompress a string
     * @param datastr
     * @param decodingFn  ex: fs.enc, Compress._utf8_encode (default)
     */
    decompress: function (datastr) {
      if (datastr) {
        var buffer = Compress.stringToByteArray(atob(datastr));
        var inflated = utils.Zlib.zlibInflate(buffer, { raw: true, to: "string" });

        return Compress._utf8_decode(inflated);
      }
    }
  };

  /**
   * Expose it to the world
   * @type {{byteArrayToString: byteArrayToString, stringToByteArray: stringToByteArray, _utf8_encode: _utf8_encode, compress: compress, fragmentAndCompress: fragmentAndCompress, decompress: decompress}}
   */
  utils.Compress = Compress;

})(utils);