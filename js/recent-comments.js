// from https://codepen.io/jaimeiniesta/pen/DhKrd
var DisqusRecent = {
  init: function (config) {
    this.api_key = config.api_key;
    this.forum = config.forum;
    this.container = config.container;
    this.initCssStyle();
    this.fetchRecentComments();
  },

  initCssStyle: function () {
    var style_rules = [
      'ul#comments {\
        list-style-type: none;\
        font-family: "Helvetica Neue",arial,sans-serif;\
        font-size: 15px;\
        color: #a5b2b9;\
      }',
      "ul#comments li { margin-bottom: 30px; position: relative; }",
      "ul#comments li a { text-decoration: none; color: rgb(102, 204, 204); }",

      ".avatar-container { width: 40px; box-sizing: border-box; }",
      ".avatar { width: 30px; height: 30px; border-radius: 5px; float: left; margin: 5px; }",

      ".post-container { padding-top: 3px; box-sizing: border-box; }",
      ".post-container p { color: #3f4549; margin:0; }",
      ".author_name { font-weight: bold; font-size: 13px; }",

      ".timeago, .posted {\
        font-weight: 500;\
        font-size: 12px;\
        color: #a5b2b9;\
        color: rgba(0,39,59,.35);\
        overflow: hidden;\
        text-overflow: ellipsis;\
        white-space: nowrap;\
      }",
      ".bullet {\
        padding: 0 2px;\
        font-size: 10px;\
        color: #ccc;\
        line-height: 1.4;\
      }"
    ];
    var style = '<style type="text/css">' + style_rules.join("\n") + "</style>";
    $("head").append(style);
  },

  getTemplate: function () {
    return '<ul id="comments">\
      {{#each response}}\
        <li>\
          <div class="head-container">\
            <div class="avatar-container">\
              <a href="{{author.profileUrl}}" target="_blank">\
                <img src="{{author.avatar.small.permalink}}" class="avatar" alt="avatar" />\
              </a>\
            </div>\
            <div class="name-container">\
              <a href="{{author.profileUrl}}" class="author_name" target="_blank">\
                <span class="author_name">{{author.name}}\
              </a>\
              <div class="timeago" title="{{createdAt}}Z">{{createdAt}}</div>\
            </div>\
          </div>\
          <div class="post-container">\
            <div>{{{message}}}</div>\
            <div class="posted">posted on <a href="{{thread.link}}" target="_blank">{{thread.title}}</a></div>\
          </div>\
        </li>\
      {{/each}}\
  </ul>';
  },

  fetchRecentComments: function () {
    $.ajax({
      url: "https://disqus.com/api/3.0/forums/listPosts.jsonp?limit=5&forum=" + this.forum + "&related=thread&api_key=" + this.api_key,
      dataType: "jsonp",
      context: this,
      success: function (commentsresult) {
        var template = Handlebars.compile(this.getTemplate());
        $(this.container).html(template(commentsresult));
      }
    });
  }
}

$(function () {
  DisqusRecent.init({
    api_key: 'RldM8ekjRODFQ52QuRJPTwZQ98Vvz9uSingGVhC5Jb4y0qpB01gdncJXHITUYSFQ',
    forum: 'sumyblog',
    container: '#disqus-recent-comments-content'
  });
});