/***************************************
* @preserve
* ForeSee Web SDK: Storage Upgrade
* Built April 27, 19 21:31:50
* Code version: 19.7.3
* Template version: 19.7.3
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js")],function(t,fs,utils){var i=function(t){t._data.keys&&t._data.keys.cp&&(delete t._data.keys.cp.v.trigger_version,t._data.keys.cp.v.code=fs.config.codeVer)},a=function(t){for(var s=["_fsspl_","acs.t","_4c_","fsr.s","fsr.t","fsr.r","fsr.a"],e=0;e<s.length;e++)t.kill(s[e])},r=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("acs.t")||s.get("fsr.t")};r.prototype.upgrade=function(){if(this.val)try{var t=JSON.parse(this.val),s=Object.keys(t);if(t.rid=this.stg.uid,0<s.length){if(fs.isDefined(t[s[0]].v))this.stg._data.keys=t;else for(var e=0;e<s.length;e++)this.stg.set(s[e],t[s[e]]);this.stg.save(!0)}}catch(t){}i(this.stg),a(this.ckie)};var h=function(t,s){this.stg=t,this.ckie=s,this.val=utils.Compress.decompress(decodeURIComponent(s.get("_4c_")))};h.prototype.upgrade=function(){if(this.val)try{var t=JSON.parse(this.val).keys,s=Object.keys(t);if(t.cp||(t.cp={v:{}}),t.rid.v=this.stg.uid,0<s.length){if(fs.isDefined(t[s[0]].v))this.stg._data.keys=t;else for(var e=0;e<s.length;e++)this.stg.set(s[e],t[s[e]]);this.stg.save(!0)}}catch(t){}i(this.stg),a(this.ckie)};var g=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("fsr.r")};g.prototype.upgrade=function(){if(this.val)try{var t=JSON.parse(this.val),s=864e5;this.stg.set("i","x"),t.d&&t.e?this.stg.setMaxKeyExpiration(7*s+t.d*s):t.d?this.stg.setMaxKeyExpiration(t.d/2*s):this.stg.setMaxKeyExpiration(45*s),this.stg.save(!0)}catch(t){}i(this.stg),a(this.ckie)};var c=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("_fsspl_")};c.prototype.upgrade=function(){if(this.val)try{var t=JSON.parse(this.val);t.keys.rid.v=this.stg.uid,this.stg._data.keys=t.keys,this.stg.save(!0)}catch(t){}i(this.stg),a(this.ckie)};return function(t,s,e){s.get("_fsspl_")&&new c(t,s).upgrade();s.get("fsr.r")&&s.get("fsr.s")&&new g(t,s).upgrade();(s.get("acs.t")||s.get("fsr.t"))&&new r(t,s).upgrade();s.get("_4c_")&&new h(t,s).upgrade();var i=t.get("cp");i&&t.set("cp",i,864e5),t._maint(),e&&e()}});