/*! For license information please see 6258.4152475c.js.LICENSE.txt */
(self.webpackChunk_sumyblog_rspress_blog=self.webpackChunk_sumyblog_rspress_blog||[]).push([["6258"],{15329:function(e,o,n){"use strict";n.r(o);var s=n("35250"),r=n("51325");function t(e){let o=Object.assign({h1:"h1",a:"a",p:"p",pre:"pre",code:"code",ul:"ul",li:"li",iframe:"iframe",h2:"h2"},(0,r.useMDXComponents)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(o.h1,{id:"\u4F7F\u7528bootstrap\u7684popovers\u65F6\u9F20\u6807\u79FB\u52A8\u5230tips\u4E5F\u4FDD\u6301\u5C55\u793A",children:[(0,s.jsx)(o.a,{className:"header-anchor","aria-hidden":"true",href:"#\u4F7F\u7528bootstrap\u7684popovers\u65F6\u9F20\u6807\u79FB\u52A8\u5230tips\u4E5F\u4FDD\u6301\u5C55\u793A",children:"#"}),"\u4F7F\u7528Bootstrap\u7684popovers\u65F6\u9F20\u6807\u79FB\u52A8\u5230tips\u4E5F\u4FDD\u6301\u5C55\u793A"]}),"\n",(0,s.jsx)(o.p,{children:"\u76EE\u7684\u662F\u9700\u8981\u5236\u4F5C\u4E00\u4E2A\u70B9\u51FB\u53EF\u4EE5\u6253\u5F00OA\u8FDB\u884C\u804A\u5929\u7684\u94FE\u63A5\uFF0C\u9F20\u6807\u653E\u7F6E\u4E0A\u53BB\u53EF\u4EE5\u5C55\u793A\u5F53\u524D\u4EBA\u7684\u90AE\u7BB1\u7B49\u8054\u7CFB\u65B9\u5F0F\u3002"}),"\n",(0,s.jsx)(o.p,{children:"\u4EE5\u524D\u7684\u5E73\u53F0\u4F7F\u7528\u7684\u662FBootstrap\u7684\u524D\u7AEF\u63A7\u4EF6\uFF0C\u6240\u4EE5\u9009\u62E9popover\u63A7\u4EF6\u4F5C\u4E3A\u5B9E\u73B0\u7684\u57FA\u7840\u63A7\u4EF6\u3002\u4F46\u662F\u4F7F\u7528\u65F6\u53D1\u73B0\uFF0Cpopover\u63A7\u4EF6\u63D0\u4F9B\u7684\u51E0\u79CD\u65B9\u5F0F\uFF0Chover\u6A21\u5F0F\u4E0B\u9F20\u6807\u79FB\u5F00\u4E4B\u540Etips\u5C31\u4F1A\u5173\u95ED\uFF0C\u800Cclick\u7684\u4F53\u9A8C\u4E0D\u592A\u597D\u3002\u60F3\u8981\u7684\u6548\u679C\u662F\uFF0C\u9F20\u6807\u79FB\u52A8\u5C55\u793A\u90AE\u7BB1tips\uFF0C\u9F20\u6807\u79FB\u52A8\u5230tips\u4E0A\u53EF\u4EE5\u8FDB\u4E00\u6B65\u64CD\u4F5C\uFF08\u9009\u4E2D\u590D\u5236\u90AE\u7BB1\u7B49\uFF09\u3002"}),"\n",(0,s.jsx)(o.p,{children:"\u53C2\u8003\u4E86Stack Overflow\u4E0A\u7684\u4E00\u4E2A\u95EE\u9898\uFF0C\u6700\u7EC8\u5B9E\u73B0\u4E86\u8BE5\u529F\u80FD\u3002"}),"\n",(0,s.jsx)(o.p,{children:"\u6838\u5FC3\u4EE3\u7801\u5982\u4E0B\uFF1A"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-javascript",meta:"",children:"$('.pop').popover({\n    trigger: 'manual',\n    html: true,\n    animation: false\n})\n.on('mouseenter', function () {\n    var _this = this;\n    $(this).popover('show');\n    $('.popover').on('mouseleave', function () {\n      $(_this).popover('hide');\n    });\n}).on('mouseleave', function () {\n    var _this = this;\n    setTimeout(function () {\n        if (!$('.popover:hover').length) {\n          $(_this).popover('hide');\n        }\n    }, 300);\n});\n"})}),"\n",(0,s.jsx)(o.p,{children:"\u5B9E\u73B0\u7684\u5927\u4F53\u601D\u60F3\u662F\uFF0C\u5C06popover\u7684\u89E6\u53D1\u6A21\u5F0F\u6539\u4E3A\u624B\u52A8manual\u3002\u7136\u540E\u76D1\u542C\u9F20\u6807\u8FDB\u5165\u79BB\u5F00\u7684\u4E8B\u4EF6\u3002"}),"\n",(0,s.jsxs)(o.ul,{children:["\n",(0,s.jsx)(o.li,{children:"\u5982\u679C\u9F20\u6807\u8FDB\u5165\u89E6\u53D1\u4F4D\u7F6E\uFF0C\u5219\u5F39\u51FApopover\uFF0C\u5E76\u6CE8\u518C\u4E00\u4E2A\u79BB\u5F00tips\u5219\u9690\u85CF\u7684\u4E8B\u4EF6"}),"\n",(0,s.jsx)(o.li,{children:"\u5982\u679C\u9F20\u6807\u79BB\u5F00\u89E6\u53D1\u4F4D\u7F6E\uFF0C\u5219300ms\u540E\u5224\u65AD\uFF0C\u9F20\u6807\u4E0D\u5728tips\u65F6\u5219\u9690\u85CF"}),"\n",(0,s.jsx)(o.li,{children:"\u9F20\u6807\u79BB\u5F00tips\u65F6\uFF0C\u89E6\u53D1\u8FDB\u5165\u65F6\u6CE8\u518C\u7684\u4E8B\u4EF6\uFF0C\u8FDB\u884C\u9690\u85CF"}),"\n"]}),"\n",(0,s.jsx)(o.p,{children:"\u5B9E\u73B0\u6548\u679C\uFF1A"}),"\n",(0,s.jsx)(o.iframe,{height:"532",style:{width:"100%"},scrolling:"no",title:"QWGRqbw",src:"https://codepen.io/sumy7/embed/preview/QWGRqbw?height=532&theme-id=light&default-tab=result",frameBorder:"no",loading:"lazy",allowTransparency:"true",allowFullScreen:"true",children:"\n  See the Pen <a href='https://codepen.io/sumy7/pen/QWGRqbw'>QWGRqbw</a> by sumy\n  (<a href='https://codepen.io/sumy7'>@sumy7</a>) on <a href='https://codepen.io'>CodePen</a>.\n"}),"\n",(0,s.jsx)(o.p,{children:"\u76F4\u63A5\u4F7F\u7528\u7684\u662FStack Overflow\u7684\u6817\u5B50\uFF0C\u53EF\u4EE5\u8FDB\u884C\u9002\u5F53\u6539\u8FDB\uFF0C\u539F\u7406\u8FD8\u662F\u5DEE\u4E0D\u591A\u7684\u3002\u5982\u679C\u6709\u5E78\u80FD\u627E\u5230\u4EE5\u524D\u7684\u4EE3\u7801\uFF0C\u4F1A\u518D\u4FEE\u6539\u5B8C\u5584\u4E00\u4E0B\u3002"}),"\n",(0,s.jsxs)(o.h2,{id:"\u53C2\u8003\u5185\u5BB9",children:[(0,s.jsx)(o.a,{className:"header-anchor","aria-hidden":"true",href:"#\u53C2\u8003\u5185\u5BB9",children:"#"}),"\u53C2\u8003\u5185\u5BB9"]}),"\n",(0,s.jsxs)(o.ul,{children:["\n",(0,s.jsx)(o.li,{children:(0,s.jsx)(o.a,{href:"https://stackoverflow.com/questions/15989591/how-can-i-keep-bootstrap-popovers-alive-while-being-hovered",target:"_blank",rel:"noopener noreferrer",children:"jquery - How can I keep Bootstrap popovers alive while being hovered? - Stack Overflow"})}),"\n"]})]})}function p(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:o}=Object.assign({},(0,r.useMDXComponents)(),e.components);return o?(0,s.jsx)(o,Object.assign({},e,{children:(0,s.jsx)(t,e)})):t(e)}o.default=p,p.__RSPRESS_PAGE_META={},p.__RSPRESS_PAGE_META["..%2Fsource%2F_posts%2F2021-03-17-keep-bootstrap-popovers-alive-while-hovered-tips%2F2021-03-17-keep-bootstrap-popovers-alive-while-hovered-tips.md"]={toc:[{id:"\u53C2\u8003\u5185\u5BB9",text:"\u53C2\u8003\u5185\u5BB9",depth:2}],title:"\u4F7F\u7528Bootstrap\u7684popovers\u65F6\u9F20\u6807\u79FB\u52A8\u5230tips\u4E5F\u4FDD\u6301\u5C55\u793A",frontmatter:{layout:"post",title:"\u4F7F\u7528Bootstrap\u7684popovers\u65F6\u9F20\u6807\u79FB\u52A8\u5230tips\u4E5F\u4FDD\u6301\u5C55\u793A",date:"2021-03-17 23:24:45",categories:["\u679C\u7136\u8FD8\u662F\u524D\u7AEF"],tags:["bootstrap","jquery","popover"]}}}}]);