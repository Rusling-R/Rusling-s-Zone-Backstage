(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67d6220d"],{"07fa":function(e,t,a){},"24d2":function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return u})),a.d(t,"a",(function(){return p}));var r=a("c7eb"),n=a("1da1"),i=a("b775");function o(){return s.apply(this,arguments)}function s(){return s=Object(n["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["a"])({url:"/api/project",method:"get"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}function l(e){return c.apply(this,arguments)}function c(){return c=Object(n["a"])(Object(r["a"])().mark((function e(t){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["a"])({url:"/api/project/".concat(t),method:"delete"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),c.apply(this,arguments)}function u(e){return d.apply(this,arguments)}function d(){return d=Object(n["a"])(Object(r["a"])().mark((function e(t){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["a"])({url:"/api/project/".concat(t.id),method:"put",headers:{"Content-Type":"application/json"},data:t.data});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),d.apply(this,arguments)}function p(e){return m.apply(this,arguments)}function m(){return m=Object(n["a"])(Object(r["a"])().mark((function e(t){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["a"])({url:"/api/project",method:"post",headers:{"Content-Type":"application/json"},data:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}},"403d":function(e,t,a){},a05b:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"app-container"},[a("el-form",{attrs:{model:e.editForm,"label-position":"top"}},[a("el-form-item",{attrs:{label:"项目名称"}},[a("el-input",{model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),a("el-form-item",{attrs:{label:"项目描述"}},[a("el-input",{attrs:{type:"textarea",rows:"10"},model:{value:e.editForm.description,callback:function(t){e.$set(e.editForm,"description",t)},expression:"editForm.description"}})],1),a("el-form-item",{attrs:{label:"项目链接"}},[a("el-input",{model:{value:e.editForm.url,callback:function(t){e.$set(e.editForm,"url",t)},expression:"editForm.url"}})],1),a("el-form-item",{attrs:{label:"GitHub地址"}},[a("el-input",{model:{value:e.editForm.github,callback:function(t){e.$set(e.editForm,"github",t)},expression:"editForm.github"}})],1),a("div",{staticClass:"imgUpload"},[a("el-form-item",[a("Uploader",{attrs:{title:"项目预览图",URL:"/api/upload",imageUrl:e.editForm.thumb},on:{uploadFinsh:e.imgUploadHandle}})],1),a("el-form-item",{attrs:{label:"排序等级"}},[a("el-select",{attrs:{placeholder:"请选择级别"},model:{value:e.editForm.order,callback:function(t){e.$set(e.editForm,"order",t)},expression:"editForm.order"}},e._l(e.order,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),a("el-button",{attrs:{type:"primary"},on:{click:e.finshHandle}},[e._v("确 定")])],1)],1)},n=[],i=a("5530"),o=(a("a4d3"),a("e01a"),a("b0c0"),a("24d2")),s=a("c7f0"),l={components:{Uploader:s["a"]},data:function(){return{loading:!1,editForm:{description:"",name:"",url:"",github:"",thumb:"",order:""},order:[{label:"1级",value:1},{label:"2级",value:2},{label:"3级",value:3},{label:"4级",value:4},{label:"5级",value:5}]}},methods:{imgUploadHandle:function(e){this.editForm.thumb=e},finshHandle:function(){var e=this,t=!!this.editForm.name&&!!this.editForm.description&&!!this.editForm.order&&!!this.editForm.url&&!!this.editForm.github&&!!this.editForm.thumb;if(t){var a=Object(i["a"])({},this.editForm);a.description=a.description.split("\n"),this.loading=!0,Object(o["a"])(a).then((function(t){e.loading=!1,e.$message({message:"添加成功",type:"success"}),e.$router.push({path:"projectsList"})}))}else this.$message({type:"error",message:"必须填写名称、描述、等级"})}}},c=l,u=(a("b6dc"),a("2877")),d=Object(u["a"])(c,r,n,!1,null,"0e4ef2ca",null);t["default"]=d.exports},a846:function(e,t,a){"use strict";a("07fa")},b6dc:function(e,t,a){"use strict";a("403d")},c7f0:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload"},[a("p",{staticClass:"title"},[e._v(e._s(e.title))]),a("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"uploader",attrs:{"show-file-list":!1,action:e.URL,headers:e.headers,"on-success":e.afterUpload,"before-upload":e.beforeUpload}},[e.imageUrl?a("el-image",{staticClass:"imgPreview",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus uploader-icon"})],1)],1)},n=[],i=(a("ac1f"),a("00b4"),{name:"Uploader",props:{URL:{type:String,require:!0},title:{type:String,default:""},imageUrl:{type:String,default:""}},data:function(){return{loading:!1}},computed:{headers:function(){return{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}},methods:{afterUpload:function(e){this.loading=!1,!e.code&&e.data&&this.$emit("uploadFinsh",e.data)},beforeUpload:function(e){var t=/^image\/(.*)$/,a=t.test(e.type);return a?this.loading=!0:(this.$emit("uploadFinsh"),this.$message.error("文件不是图片!")),a}}}),o=i,s=(a("a846"),a("2877")),l=Object(s["a"])(o,r,n,!1,null,"76ff8386",null);t["a"]=l.exports}}]);