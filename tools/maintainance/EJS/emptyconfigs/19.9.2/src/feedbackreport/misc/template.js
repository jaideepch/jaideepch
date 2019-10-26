/**
 * HTML Templating
 *
 * (c) Copyright 2015 ForeSee, Inc.
 *
 * @author Alexei White (alexei.white@foresee.com)
 * @author Alexei White: alexei.white $
 *
 */

/**
 * The HTML templater
 * @param str
 * @param data
 * @returns {*}
 */
const Templater = (str, data) => {
  const fn = new Function(
    "obj",
    `var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('${str
      .replace(/[\r\t\n]/g, " ")
      .split("<%")
      .join("\t")
      .replace(/((^|%>)[^\t]*)'/g, "$1\r")
      .replace(/\t=(.*?)%>/g, "',$1,'")
      .split("\t")
      .join("');")
      .split("%>")
      .join("p.push('")
      .split("\r")
      .join("\\'")}');}return p.join('');`
  );
  return fn(data || {});
};

export { Templater };
