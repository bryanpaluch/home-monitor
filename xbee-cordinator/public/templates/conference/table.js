define(["jade-runtime"], function() { return function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "app/views/conference/table.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
// iterate users
;(function(){
  if ('number' == typeof users.length) {

    for (var $index = 0, $$l = users.length; $index < $$l; $index++) {
      var member = users[$index];

__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('<tr class="success">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<td>');
var __val__ = member.name
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('<td>');
var __val__ = member.phoneNumber
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<td>');
var __val__ = member.status
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('<td>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
if ( member.status == 'offline')
{
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('mute'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "mute"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else if ( member.status == 'hungup')
{
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('mute'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "mute"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
 else if (!member.speak)
{
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('unmute'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-info') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "unmute"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('mute'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "mute"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
buf.push('<td>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
if ( member.status == 'offline')
{
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('kick'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "kick"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else if ( member.status == 'hungup')
{
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('kick'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "kick"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('kick'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "kick"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 23, filename: __jade[0].filename });
buf.push('<td>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 23, filename: __jade[0].filename });
if ( member.status == 'offline')
{
__jade.unshift({ lineno: 24, filename: __jade[0].filename });
__jade.unshift({ lineno: 24, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('deafen'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "deafen"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else if ( member.status == 'hungup')
{
__jade.unshift({ lineno: 26, filename: __jade[0].filename });
__jade.unshift({ lineno: 26, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('deafen'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "deafen"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
 else if (!member.hear)
{
__jade.unshift({ lineno: 28, filename: __jade[0].filename });
__jade.unshift({ lineno: 28, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('undeafen'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-info') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "undeafen"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 30, filename: __jade[0].filename });
__jade.unshift({ lineno: 30, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('deafen'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "deafen"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.shift();
buf.push('</tr>');
__jade.shift();
__jade.shift();
    }

  } else {
    for (var $index in users) {
      var member = users[$index];

__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('<tr class="success">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<td>');
var __val__ = member.name
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('<td>');
var __val__ = member.phoneNumber
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<td>');
var __val__ = member.status
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('<td>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
if ( member.status == 'offline')
{
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('mute'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "mute"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else if ( member.status == 'hungup')
{
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('mute'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "mute"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
 else if (!member.speak)
{
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('unmute'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-info') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "unmute"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('mute'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "mute"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
buf.push('<td>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
if ( member.status == 'offline')
{
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('kick'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "kick"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else if ( member.status == 'hungup')
{
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('kick'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "kick"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('kick'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "kick"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 23, filename: __jade[0].filename });
buf.push('<td>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 23, filename: __jade[0].filename });
if ( member.status == 'offline')
{
__jade.unshift({ lineno: 24, filename: __jade[0].filename });
__jade.unshift({ lineno: 24, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('deafen'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "deafen"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else if ( member.status == 'hungup')
{
__jade.unshift({ lineno: 26, filename: __jade[0].filename });
__jade.unshift({ lineno: 26, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('deafen'), 'target':(member.memberid), 'disabled':('disabled'), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true,"disabled":true}));
buf.push('>');
var __val__ = "deafen"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
 else if (!member.hear)
{
__jade.unshift({ lineno: 28, filename: __jade[0].filename });
__jade.unshift({ lineno: 28, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('undeafen'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-info') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "undeafen"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 30, filename: __jade[0].filename });
__jade.unshift({ lineno: 30, filename: __jade[0].filename });
buf.push('<button');
buf.push(attrs({ 'action':('deafen'), 'target':(member.memberid), "class": ('btn') + ' ' + ('btn-danger') }, {"action":true,"target":true}));
buf.push('>');
var __val__ = "deafen"
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.shift();
buf.push('</tr>');
__jade.shift();
__jade.shift();
   }
  }
}).call(this);

__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
} });