/***************************************
* @preserve
* ForeSee Web SDK: Storage Upgrade
* Built April 27, 19 22:58:42
* Code version: 19.3.5
* Template version: 19.3.5
***************************************/
_fsDefine(["require","fs",_fsNormalizeUrl("$fs.utils.js")],function(t,s,i){var e=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("acs.t")||s.get("fsr.t")};e.prototype.upgrade=function(){if(this.val){try{var t=JSON.parse(this.val),i=Object.keys(t);if(i.length>0){if(s.isDefined(t[i[0]].v))this.stg._data.keys=t;else for(var e=0;e<i.length;e++)this.stg.set(i[e],t[i[e]]);this.stg.save(!0)}}catch(t){}this.ckie.kill("acs.t"),this.ckie.kill("fsr.t")}};var a=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("fsr.r")};a.prototype.upgrade=function(){if(this.val){try{var t=JSON.parse(this.val);this.stg.set("i","x"),t.d&&t.e?this.stg.setMaxKeyExpiration(6048e5+864e5*t.d):t.d?this.stg.setMaxKeyExpiration(t.d/2*864e5):this.stg.setMaxKeyExpiration(3888e6),this.stg.save(!0)}catch(t){}this.ckie.kill("fsr.r"),this.ckie.kill("fsr.s"),this.ckie.kill("fsr.a")}};var r=function(t,s){this.stg=t,this.ckie=s,this.val=s.get("_fsspl_")};return r.prototype.upgrade=function(){if(this.val){try{var t=JSON.parse(this.val);this.stg._data.keys=t.keys,this.stg.save(!0)}catch(t){}this.ckie.kill("_fsspl_")}},function(t,s,i){if(s.get("_fsspl_")){new r(t,s).upgrade()}if(s.get("fsr.r")){new a(t,s).upgrade()}if(s.get("acs.t")||s.get("fsr.t")){new e(t,s).upgrade()}var h=t.get("cp");h&&t.set("cp",h,864e5),t._maint(),i&&i()}});