/*! For license information please see 6062.be7c6757.js.LICENSE.txt */
(self.webpackChunk_sumyblog_rspress_blog=self.webpackChunk_sumyblog_rspress_blog||[]).push([["6062"],{7034:function(e,n,r){"use strict";r.r(n);var d=r("35250"),s=r("51325");function i(e){let n=Object.assign({h1:"h1",a:"a",p:"p",h2:"h2",code:"code",h3:"h3",pre:"pre",h4:"h4",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",ul:"ul",li:"li"},(0,s.useMDXComponents)(),e.components);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(n.h1,{id:"android\u4E0Bsmali\u5E38\u7528\u6CE8\u5165\u4EE3\u7801",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#android\u4E0Bsmali\u5E38\u7528\u6CE8\u5165\u4EE3\u7801",children:"#"}),"Android\u4E0Bsmali\u5E38\u7528\u6CE8\u5165\u4EE3\u7801"]}),"\n",(0,d.jsx)(n.p,{children:"\u8FD9\u51E0\u5929\u505AAndroid\u7684CTF\uFF0C\u53D1\u73B0\u4F7F\u7528smali\u6CE8\u5165\u7684\u65B9\u5F0F\u83B7\u53D6Flag\u7684\u65B9\u6CD5\u6BD4\u8F83\u901A\u7528\uFF0C\u6240\u4EE5\u5199\u51FA\u6765\u53C2\u8003\u4E00\u4E0B\u3002"}),"\n",(0,d.jsxs)(n.h2,{id:"\u7B80\u4ECB",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#\u7B80\u4ECB",children:"#"}),"\u7B80\u4ECB"]}),"\n",(0,d.jsxs)(n.p,{children:["\u901A\u8FC7\u6CE8\u5165\u53EF\u4EE5\u5C06\u4E00\u4E9B\u5185\u90E8\u53D8\u91CF\u8F93\u51FA\u5230\u5916\u90E8\u6765\uFF0C\u4F7F\u4E00\u4E9B\u770B\u4E0D\u5230\u7684\u5185\u5BB9\u770B\u5230\u3002\u5728Android\u4E00\u822C\u8F93\u51FA\u7684\u5A92\u4ECB\u6709",(0,d.jsx)(n.code,{children:"Toast"}),"\u548C",(0,d.jsx)(n.code,{children:"Logcat"}),"\u3002"]}),"\n",(0,d.jsxs)(n.h2,{id:"\u6CE8\u5165\u65B9\u5F0F",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#\u6CE8\u5165\u65B9\u5F0F",children:"#"}),"\u6CE8\u5165\u65B9\u5F0F"]}),"\n",(0,d.jsxs)(n.h3,{id:"toast\u65B9\u5F0F",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#toast\u65B9\u5F0F",children:"#"}),"Toast\u65B9\u5F0F"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-smali",meta:"",children:'const-string v4, "test"\nconst/4 v5, 0x1\ninvoke-static {p0, v4, v5}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;\n'})}),"\n",(0,d.jsxs)(n.p,{children:["\u53EF\u4EE5\u5C06\u7B2C\u4E09\u884C\u7684",(0,d.jsx)(n.code,{children:"v4"}),"\u5BC4\u5B58\u5668\u6362\u6210\u9700\u8981\u67E5\u770B\u7684\u5BC4\u5B58\u5668\u3002"]}),"\n",(0,d.jsxs)(n.h3,{id:"logcat\u65B9\u5F0F",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#logcat\u65B9\u5F0F",children:"#"}),"Logcat\u65B9\u5F0F"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-smali",meta:"",children:'const-string v3, "Log Tag"\ninvoke-static {v3, v1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I\n'})}),"\n",(0,d.jsxs)(n.p,{children:["\u540C\u6837\u53EF\u4EE5\u5C06\u7B2C\u4E8C\u884C",(0,d.jsx)(n.code,{children:"v1"}),"\u5BC4\u5B58\u5668\u6362\u6210\u9700\u8981\u7684\u5BC4\u5B58\u5668\u3002"]}),"\n",(0,d.jsxs)(n.h2,{id:"\u6CE8\u610F\u4E8B\u9879",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#\u6CE8\u610F\u4E8B\u9879",children:"#"}),"\u6CE8\u610F\u4E8B\u9879"]}),"\n",(0,d.jsxs)(n.h3,{id:"\u5BC4\u5B58\u5668\u6570\u91CF",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#\u5BC4\u5B58\u5668\u6570\u91CF",children:"#"}),"\u5BC4\u5B58\u5668\u6570\u91CF"]}),"\n",(0,d.jsxs)(n.p,{children:["\u5728smali\u4E2D\uFF0C\u6BCF\u4E2A ",(0,d.jsx)(n.code,{children:".method"})," \u65B9\u6CD5\u4E2D\u90FD\u4F1A\u7528 ",(0,d.jsx)(n.code,{children:".locals"})," \u58F0\u660E\u9700\u8981\u5BC4\u5B58\u5668\u7684\u6570\u91CF\uFF0C\u5728\u6CE8\u5165\u7684\u65F6\u5019\u8981\u4FEE\u6539\u5BC4\u5B58\u5668\u7684\u6570\u91CF\u8FDB\u884C\u6269\u5145\u3002"]}),"\n",(0,d.jsxs)(n.h3,{id:"\u683C\u5F0F\u8F6C\u6362",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#\u683C\u5F0F\u8F6C\u6362",children:"#"}),"\u683C\u5F0F\u8F6C\u6362"]}),"\n",(0,d.jsxs)(n.p,{children:["\u8981\u67E5\u770B\u7684\u5BC4\u5B58\u5668\u7684\u5185\u5BB9\u9700\u8981\u4E3A ",(0,d.jsx)(n.code,{children:"String"})," \u7C7B\u578B\uFF0C\u5982\u679C\u4E0D\u662F\u5C31\u9700\u8981\u8F6C\u6362\u3002"]}),"\n",(0,d.jsxs)(n.h4,{id:"int\u8F6Cstring",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#int\u8F6Cstring",children:"#"}),"int\u8F6CString"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-smali",meta:"",children:"invoke-static {v1}, Ljava/lang/Integer;->toString(I)Ljava/lang/String;\nmove-result-object v4\n"})}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"v1"})," \u4E3A\u9700\u8981\u67E5\u770B\u7684int\u7C7B\u578B\u5BC4\u5B58\u5668\uFF0C\u8F6C\u6362\u540E\u7684\u7ED3\u679C\u5B58\u653E\u5230 ",(0,d.jsx)(n.code,{children:"v4"})," \u4E2D\u3002"]}),"\n",(0,d.jsxs)(n.h4,{id:"boolean\u8F6Cstring",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#boolean\u8F6Cstring",children:"#"}),"boolean\u8F6CString"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-smali",meta:"",children:"invoke-static {v1}, Ljava/lang/Boolean;->toString(Z)Ljava/lang/String;\nmove-result-object v4\n"})}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"v1"})," \u4E3A\u9700\u8981\u4EA7\u770B\u7684boolean\u7C7B\u578B\u5BC4\u5B58\u5668\uFF0C\u8F6C\u6362\u540E\u7684\u7ED3\u679C\u5B58\u653E\u5230 ",(0,d.jsx)(n.code,{children:"v4"})," \u4E2D\u3002"]}),"\n",(0,d.jsxs)(n.h3,{id:"\u5E38\u7528\u6570\u636E\u7C7B\u578B",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#\u5E38\u7528\u6570\u636E\u7C7B\u578B",children:"#"}),"\u5E38\u7528\u6570\u636E\u7C7B\u578B"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"smali"}),(0,d.jsx)(n.th,{children:"Java"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"V"}),(0,d.jsx)(n.td,{children:"void \u53EA\u80FD\u7528\u4E8E\u8FD4\u56DE\u503C\u7C7B\u578B"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"Z"}),(0,d.jsx)(n.td,{children:"boolean"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"B"}),(0,d.jsx)(n.td,{children:"byte"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"S"}),(0,d.jsx)(n.td,{children:"short"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"C"}),(0,d.jsx)(n.td,{children:"char"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"I"}),(0,d.jsx)(n.td,{children:"int"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"J"}),(0,d.jsx)(n.td,{children:"long (64 bits)"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"F"}),(0,d.jsx)(n.td,{children:"float"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"D"}),(0,d.jsx)(n.td,{children:"double (64 bits)"})]})]})]}),"\n",(0,d.jsxs)(n.h2,{id:"\u53C2\u8003\u5185\u5BB9",children:[(0,d.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#\u53C2\u8003\u5185\u5BB9",children:"#"}),"\u53C2\u8003\u5185\u5BB9"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"http://www.xuebuyuan.com/2174077.html",target:"_blank",rel:"noopener noreferrer",children:"Android \u53CD\u6C47\u7F16Smali\u8BED\u8A00\u4E2D\u63D2\u5165log\u6253\u5370 | \u5B66\u6B65\u56ED"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"http://liuzhichao.com/p/912.html",target:"_blank",rel:"noopener noreferrer",children:"Smali\u8BED\u6CD5\uFF1A\u6570\u636E\u7C7B\u578B\u3001\u65B9\u6CD5\u548C\u5B57\u6BB5"})}),"\n"]})]})}function t(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,s.useMDXComponents)(),e.components);return n?(0,d.jsx)(n,Object.assign({},e,{children:(0,d.jsx)(i,e)})):i(e)}n.default=t,t.__RSPRESS_PAGE_META={},t.__RSPRESS_PAGE_META["..%2Fsource%2F_posts%2F2015-05-18-android-smali-inject.md"]={toc:[{id:"\u7B80\u4ECB",text:"\u7B80\u4ECB",depth:2},{id:"\u6CE8\u5165\u65B9\u5F0F",text:"\u6CE8\u5165\u65B9\u5F0F",depth:2},{id:"toast\u65B9\u5F0F",text:"Toast\u65B9\u5F0F",depth:3},{id:"logcat\u65B9\u5F0F",text:"Logcat\u65B9\u5F0F",depth:3},{id:"\u6CE8\u610F\u4E8B\u9879",text:"\u6CE8\u610F\u4E8B\u9879",depth:2},{id:"\u5BC4\u5B58\u5668\u6570\u91CF",text:"\u5BC4\u5B58\u5668\u6570\u91CF",depth:3},{id:"\u683C\u5F0F\u8F6C\u6362",text:"\u683C\u5F0F\u8F6C\u6362",depth:3},{id:"int\u8F6Cstring",text:"int\u8F6CString",depth:4},{id:"boolean\u8F6Cstring",text:"boolean\u8F6CString",depth:4},{id:"\u5E38\u7528\u6570\u636E\u7C7B\u578B",text:"\u5E38\u7528\u6570\u636E\u7C7B\u578B",depth:3},{id:"\u53C2\u8003\u5185\u5BB9",text:"\u53C2\u8003\u5185\u5BB9",depth:2}],title:"Android\u4E0Bsmali\u5E38\u7528\u6CE8\u5165\u4EE3\u7801",frontmatter:{layout:"post",title:"Android\u4E0Bsmali\u5E38\u7528\u6CE8\u5165\u4EE3\u7801",date:"2015-05-18 09:44:17",categories:["\u7F16\u7A0B\u8BED\u8A00"],tags:["smali","android","ctf"]}}}}]);