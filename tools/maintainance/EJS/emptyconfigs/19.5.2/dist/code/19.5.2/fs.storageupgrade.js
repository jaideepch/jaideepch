/***************************************
* @preserve
* ForeSee Web SDK: Storage Upgrade
* Built April 27, 19 21:55:14
* Code version: 19.5.2
* Template version: 19.5.2
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js")],function(t,s,e){var i=function(t){t._general.data.keys&&t._general.data.keys.cp&&(delete t._general.data.keys.cp.v.trigger_version,t._general.data.keys.cp.v.code=s.config.codeVer)},a=function(t){for(var s=["_fsspl_","acs.t","_4c_","fsr.s","fsr.t","fsr.r","fsr.a"],e=0;e<s.length;e++)t.kill(s[e])},r=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("acs.t")||s.get("fsr.t")};r.prototype.upgrade=function(){if(this.val)try{var t=JSON.parse(this.val),e=Object.keys(t);if(t.rid=this.stg.uid,e.length>0){if(s.isDefined(t[e[0]].v))this.stg._general.data.keys=t;else for(var r=0;r<e.length;r++)this.stg.set(e[r],t[e[r]]);this.stg.save(!0)}}catch(t){}i(this.stg),a(this.ckie)};var g=function(t,s){this.stg=t,this.ckie=s,this.val=e.Compress.decompress(decodeURIComponent(s.get("_4c_")))};g.prototype.upgrade=function(){if(this.val)try{var t=JSON.parse(this.val).keys,e=Object.keys(t);if(t.cp||(t.cp={v:{}}),t.rid.v=this.stg.uid,e.length>0){if(s.isDefined(t[e[0]].v))this.stg._general.data.keys=t;else for(var r=0;r<e.length;r++)this.stg.set(e[r],t[e[r]]);this.stg.save(!0)}}catch(t){}i(this.stg),a(this.ckie)};var h=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("fsr.r")};h.prototype.upgrade=function(){if(this.val)try{var t=JSON.parse(this.val);this.stg.set("i","x"),t.d&&t.e?this.stg.setMaxKeyExpiration(6048e5+864e5*t.d):t.d?this.stg.setMaxKeyExpiration(t.d/2*864e5):this.stg.setMaxKeyExpiration(3888e6),this.stg.save(!0)}catch(t){}i(this.stg),a(this.ckie)};var n=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("_fsspl_")};return n.prototype.upgrade=function(){if(this.val)try{var t=JSON.parse(this.val);t.keys.rid.v=this.stg.uid,this.stg._general.data.keys=t.keys,this.stg.save(!0)}catch(t){}i(this.stg),a(this.ckie)},function(t,s,e){if(s.get("_fsspl_")){new n(t,s).upgrade()}if(s.get("fsr.r")&&s.get("fsr.s")){new h(t,s).upgrade()}if(s.get("acs.t")||s.get("fsr.t")){new r(t,s).upgrade()}if(s.get("_4c_")){new g(t,s).upgrade()}var i=t.get("cp");i&&t.set("cp",i,864e5),t._maint(),e&&e()}});