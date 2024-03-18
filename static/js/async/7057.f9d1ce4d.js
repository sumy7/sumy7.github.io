/*! For license information please see 7057.f9d1ce4d.js.LICENSE.txt */
(self.webpackChunk_sumyblog_rspress_blog=self.webpackChunk_sumyblog_rspress_blog||[]).push([["7057"],{42097:function(e,n,r){"use strict";r.r(n);var t=r("35250"),a=r("51325");function s(e){let n=Object.assign({h1:"h1",a:"a",p:"p",code:"code",pre:"pre",h2:"h2",ul:"ul",li:"li"},(0,a.useMDXComponents)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.h1,{id:"17-\u884C\u4EE3\u7801\u5B9E\u73B0\u7684\u7B80\u6613-javascript-\u5B57\u7B26\u4E32\u6A21\u677F",children:[(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#17-\u884C\u4EE3\u7801\u5B9E\u73B0\u7684\u7B80\u6613-javascript-\u5B57\u7B26\u4E32\u6A21\u677F",children:"#"}),"17 \u884C\u4EE3\u7801\u5B9E\u73B0\u7684\u7B80\u6613 Javascript \u5B57\u7B26\u4E32\u6A21\u677F"]}),"\n",(0,t.jsxs)(n.p,{children:["\u524D\u51E0\u5929\u5728\u5199\u535A\u5BA2\u6A21\u677F\u7684\u65F6\u5019\u9700\u8981\u7528 js \u5C06 JSON \u751F\u6210\u7F51\u9875\uFF0C\u5F53\u65F6\u5F88\u7EA0\u7ED3\u600E\u6837\u4F18\u96C5\u7684\u5B9E\u73B0\u6570\u636E\u7684\u586B\u5145\uFF0C\u56E0\u4E3A\u4E0D\u592A\u60F3\u7528 ",(0,t.jsx)(n.code,{children:"+"})," \u8FDE\u63A5\u6570\u636E\u548CHTML\u4EE3\u7801\u3002\u6B63\u5F53\u7EA0\u7ED3\u7684\u65F6\u5019\u5728\u5FAE\u535A\u4E0A\u53D1\u73B0\u4E86\u8FD9\u4E2AJavaScript\u5B57\u7B26\u4E32\u6A21\u677F\uFF0C\u9042\u62FF\u6765\u7528\u4E86\u7528\u3002\u81F3\u4E8E\u5176\u4E2D\u7684\u5404\u65B9\u9762\u539F\u7406\uFF0C\u8FD8\u9700\u8981\u7B49JS\u6C34\u5E73\u4E0A\u6765\u4E4B\u540E\u518D\u6162\u6162\u5206\u6790\u5427\u3002\u5F53\u524D\u5148\u7167\u846B\u82A6\u753B\u74E2\u3002"]}),"\n",(0,t.jsx)(n.p,{children:"\u4E0B\u9762\u662F\u6574\u4E2A\u5B9E\u73B0\u7684\u4EE3\u7801\uFF0C\u5177\u4F53\u8BB2\u89E3\u8BF7\u53C2\u8003\u3010\u53C2\u8003\u6587\u732E\u3011\u4E2D\u7684\u539F\u6587\u535A\u5BA2\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",meta:"",children:"function render(template, context) {\n\n    var tokenReg = /(\\\\)?\\{([^\\{\\}\\\\]+)(\\\\)?\\}/g;\n\n    return template.replace(tokenReg, function (word, slash1, token, slash2) {\n        if (slash1 || slash2) {  \n            return word.replace('\\\\', '');\n        }\n\n        var variables = token.replace(/\\s/g, '').split('.');\n        var currentObject = context;\n        var i, length, variable;\n\n        for (i = 0, length = variables.length, variable = variables[i]; i < length; ++i) {\n            currentObject = currentObject[variable];\n            if (currentObject === undefined || currentObject === null) return '';\n        }\n\n        return currentObject;\n    })\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u4F7F\u7528\u65B9\u5F0F\uFF0C\u5C06\u4EE3\u7801\u6302\u5728\u5B57\u7B26\u4E32\u7684\u539F\u578B\u94FE\u4E0B"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",meta:"",children:"String.prototype.render = function (context) {\n    return render(this, context);\n};\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u8C03\u7528\u65B9\u5F0F"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",meta:"",children:"render('My name is {name}'\uFF0C {\n    name: 'hsfzxjy'\n});  // My name is hsfzxjy\n\nrender('I am in {profile.location}', {\n    name: 'hsfzxjy',\n    profile: {\n        location: 'Guangzhou'\n    }\n}); // I am in Guangzhou\n\nrender('{ greeting }. \\\\{ This block will not be rendered }', {\n    greeting: 'Hi'\n}); // Hi. { This block will not be rendered }\n\n\"{greeting}! My name is { author.name }.\".render({\n    greeting: \"Hi\",\n    author: {\n        name: \"hsfzxjy\"\n    }\n});\n// Hi! My name is hsfzxjy.\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u611F\u8C22\u535A\u4E3B\u63D0\u4F9B\u7684\u9ED1\u79D1\u6280\uFF0C\u6709\u4E86\u8FD9\u4E48\u65B9\u4FBF\u7684\u529F\u80FD\u3002"}),"\n",(0,t.jsxs)(n.h2,{id:"\u53C2\u8003\u5185\u5BB9",children:[(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#\u53C2\u8003\u5185\u5BB9",children:"#"}),"\u53C2\u8003\u5185\u5BB9"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://segmentfault.com/a/1190000004428305",target:"_blank",rel:"noopener noreferrer",children:"17 \u884C\u4EE3\u7801\u5B9E\u73B0\u7684\u7B80\u6613 Javascript \u5B57\u7B26\u4E32\u6A21\u677F\uFF08SegmentFault\uFF09"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"http://hsfzxjy.github.io/a-simple-javascript-template-language/",target:"_blank",rel:"noopener noreferrer",children:"17 \u884C\u4EE3\u7801\u5B9E\u73B0\u7684\u7B80\u6613 Javascript \u5B57\u7B26\u4E32\u6A21\u677F\uFF08\u535A\u5BA2\uFF09"})}),"\n"]})]})}function i(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,a.useMDXComponents)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(s,e)})):s(e)}n.default=i,i.__RSPRESS_PAGE_META={},i.__RSPRESS_PAGE_META["..%2Fsource%2F_posts%2F2016-02-16-seventeen-line-to-complete-a-javascript-string-render-template.md"]={toc:[{id:"\u53C2\u8003\u5185\u5BB9",text:"\u53C2\u8003\u5185\u5BB9",depth:2}],title:"17 \u884C\u4EE3\u7801\u5B9E\u73B0\u7684\u7B80\u6613 Javascript \u5B57\u7B26\u4E32\u6A21\u677F",frontmatter:{layout:"post",title:"17 \u884C\u4EE3\u7801\u5B9E\u73B0\u7684\u7B80\u6613 Javascript \u5B57\u7B26\u4E32\u6A21\u677F",date:"2016-02-16 20:39:01",categories:["\u9AD8\u6548\u751F\u6D3B"],tags:["\u6A21\u677F","javascript"]}}}}]);