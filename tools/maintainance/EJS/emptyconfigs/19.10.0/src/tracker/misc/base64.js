/**
 * Base64 Shim
 *
 * (c) Copyright 2015 ForeSee, Inc.
 *
 * @author Alexei White (alexei.white@foresee.com)
 * @author Alexei White: alexei.white $
 *
 */

// Only do something if we don't already have a definition for btoa (base64)
if (!window.btoa) {
  const ___t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  const ___o = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    62,
    -1,
    -1,
    -1,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    -1,
    -1,
    -1,
    -1,
    -1,
  ];

  window.btoa = r => {
    let a;
    let o;
    let e;
    let h;
    let i;
    let n;
    for (e = r.length, o = 0, a = ""; e > o; ) {
      if (((h = 255 & r.charCodeAt(o++)), o == e)) {
        a += ___t.charAt(h >> 2);
        a += ___t.charAt((3 & h) << 4);
        a += "==";
        break;
      }
      if (((i = r.charCodeAt(o++)), o == e)) {
        a += ___t.charAt(h >> 2);
        a += ___t.charAt(((3 & h) << 4) | ((240 & i) >> 4));
        a += ___t.charAt((15 & i) << 2);
        a += "=";
        break;
      }
      n = r.charCodeAt(o++);
      a += ___t.charAt(h >> 2);
      a += ___t.charAt(((3 & h) << 4) | ((240 & i) >> 4));
      a += ___t.charAt(((15 & i) << 2) | ((192 & n) >> 6));
      a += ___t.charAt(63 & n);
    }
    return a;
  };

  window.atob = r => {
    let a;
    let t;
    let e;
    let h;
    let i;
    let n;
    let c;
    for (n = r.length, i = 0, c = ""; n > i; ) {
      do a = ___o[255 & r.charCodeAt(i++)];
      while (n > i && -1 == a);
      if (-1 == a) {
        break;
      }
      do t = ___o[255 & r.charCodeAt(i++)];
      while (n > i && -1 == t);
      if (-1 == t) {
        break;
      }
      c += String.fromCharCode((a << 2) | ((48 & t) >> 4));
      do {
        if (((e = 255 & r.charCodeAt(i++)), 61 == e)) {
          return c;
        }
        e = ___o[e];
      } while (n > i && -1 == e);
      if (-1 == e) break;
      c += String.fromCharCode(((15 & t) << 4) | ((60 & e) >> 2));
      do {
        if (((h = 255 & r.charCodeAt(i++)), 61 == h)) {
          return c;
        }
        h = ___o[h];
      } while (n > i && -1 == h);
      if (-1 == h) {
        break;
      }
      c += String.fromCharCode(((3 & e) << 6) | h);
    }
    return c;
  };
}
