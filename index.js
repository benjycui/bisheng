webpackJsonp([2],{

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(86)(false);
// imports


// module
exports.push([module.i, "/* Make clicks pass-through */\n#nprogress {\n  pointer-events: none;\n}\n\n#nprogress .bar {\n  background: #29d;\n\n  position: fixed;\n  z-index: 1031;\n  top: 0;\n  left: 0;\n\n  width: 100%;\n  height: 2px;\n}\n\n/* Fancy blur effect */\n#nprogress .peg {\n  display: block;\n  position: absolute;\n  right: 0px;\n  width: 100px;\n  height: 100%;\n  -webkit-box-shadow: 0 0 10px #29d, 0 0 5px #29d;\n          box-shadow: 0 0 10px #29d, 0 0 5px #29d;\n  opacity: 1.0;\n\n  -webkit-transform: rotate(3deg) translate(0px, -4px);\n      -ms-transform: rotate(3deg) translate(0px, -4px);\n          transform: rotate(3deg) translate(0px, -4px);\n}\n\n/* Remove these to get rid of the spinner */\n#nprogress .spinner {\n  display: block;\n  position: fixed;\n  z-index: 1031;\n  top: 15px;\n  right: 15px;\n}\n\n#nprogress .spinner-icon {\n  width: 18px;\n  height: 18px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n\n  border: solid 2px transparent;\n  border-top-color: #29d;\n  border-left-color: #29d;\n  border-radius: 50%;\n\n  -webkit-animation: nprogress-spinner 400ms linear infinite;\n          animation: nprogress-spinner 400ms linear infinite;\n}\n\n.nprogress-custom-parent {\n  overflow: hidden;\n  position: relative;\n}\n\n.nprogress-custom-parent #nprogress .spinner,\n.nprogress-custom-parent #nprogress .bar {\n  position: absolute;\n}\n\n@-webkit-keyframes nprogress-spinner {\n  0%   { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n@keyframes nprogress-spinner {\n  0%   { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n}\n\n", ""]);

// exports


/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(52);

var _react2 = _interopRequireDefault(_react);

var _reactDocumentTitle = __webpack_require__(90);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _Layout = __webpack_require__(60);

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (props) {
  return _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Not Found | BiSheng Theme One' }, _react2.default.createElement(_Layout2.default, props, _react2.default.createElement('h1', { className: 'entry-title' }, '404 Not Found!')));
};

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(86)(false);
// imports


// module
exports.push([module.i, "/**\n * yue.css\n *\n * yue.css is designed for readable content.\n *\n * Copyright (c) 2013 - 2014 by Hsiaoming Yang.\n */\n\n.yue {\n  font: 400 18px/1.62 \"Georgia\", \"Xin Gothic\", \"Hiragino Sans GB\", \"Droid Sans Fallback\", \"Microsoft YaHei\", sans-serif;\n  color: #444443;\n}\n\n.windows .yue {\n  font-size: 16px;\n  font-family: \"Georgia\", \"SimSun\", sans-serif;\n}\n\n.yue ::-moz-selection {\n  background-color: rgba(0,0,0,0.2);\n}\n\n.yue ::selection {\n  background-color: rgba(0,0,0,0.2);\n}\n\n.yue h1,\n.yue h2,\n.yue h3,\n.yue h4,\n.yue h5,\n.yue h6 {\n  font-family: \"Georgia\", \"Xin Gothic\", \"Hiragino Sans GB\", \"Droid Sans Fallback\", \"Microsoft YaHei\", \"SimSun\", sans-serif;\n  color: #222223;\n}\n\n.yue h1 {\n  font-size: 1.8em;\n  margin: 0.67em 0;\n}\n\n.yue > h1 {\n  margin-top: 0;\n  font-size: 2em;\n}\n\n.yue h2 {\n  font-size: 1.5em;\n  margin: 0.83em 0;\n}\n\n.yue h3 {\n  font-size: 1.17em;\n  margin: 1em 0;\n}\n\n.yue h4,\n.yue h5,\n.yue h6 {\n  font-size: 1em;\n  margin: 1.6em 0 1em 0;\n}\n\n.yue h6 {\n  font-weight: 500;\n}\n\n.yue p {\n  margin-top: 0;\n  margin-bottom: 1.46em;\n}\n\n.yue a {\n  color: #111;\n  word-wrap: break-word;\n  -webkit-text-decoration-color: rgba(0, 0, 0, 0.4);\n          text-decoration-color: rgba(0, 0, 0, 0.4);\n}\n\n.yue a:hover {\n  color: #555;\n  -webkit-text-decoration-color: rgba(0, 0, 0, 0.6);\n          text-decoration-color: rgba(0, 0, 0, 0.6);\n}\n\n.yue h1 a,\n.yue h2 a,\n.yue h3 a {\n  text-decoration: none;\n}\n\n.yue strong,\n.yue b {\n  font-weight: 700;\n  color: #222223;\n}\n\n.yue em,\n.yue i {\n  font-style: italic;\n  color: #222223;\n}\n\n.yue img {\n  max-width: 100%;\n  height: auto;\n  margin: 0.2em 0;\n}\n\n.yue a img {\n  /* Remove border on IE */\n  border: none;\n}\n\n.yue figure {\n  position: relative;\n  clear: both;\n  outline: 0;\n  margin: 10px 0 30px;\n  padding: 0;\n  min-height: 100px;\n}\n\n.yue figure img {\n  display: block;\n  max-width: 100%;\n  margin: auto auto 4px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.yue figure figcaption {\n  position: relative;\n  width: 100%;\n  text-align: center;\n  left: 0;\n  margin-top: 10px;\n  font-weight: 400;\n  font-size: 14px;\n  color: #666665;\n}\n\n.yue figure figcaption a {\n  text-decoration: none;\n  color: #666665;\n}\n\n.yue hr {\n  display: block;\n  width: 14%;\n  margin: 40px auto 34px;\n  border: 0 none;\n  border-top: 3px solid #dededc;\n}\n\n.yue blockquote {\n  margin: 0 0 1.64em 0;\n  border-left: 3px solid #dadada;\n  padding-left: 12px;\n  color: #666664;\n}\n\n.yue blockquote a {\n  color: #666664;\n}\n\n.yue ul,\n.yue ol {\n  margin: 0 0 24px 6px;\n  padding-left: 16px;\n}\n\n.yue ul {\n  list-style-type: square;\n}\n\n.yue ol {\n  list-style-type: decimal;\n}\n\n.yue li {\n  margin-bottom: 0.2em;\n}\n\n.yue li ul,\n.yue li ol {\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-left: 14px;\n}\n\n.yue li ul {\n  list-style-type: disc;\n}\n\n.yue li ul ul {\n  list-style-type: circle;\n}\n\n.yue li p {\n  margin: 0.4em 0 0.6em;\n}\n\n.yue .unstyled {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.yue code,\n.yue tt {\n  color: #808080;\n  font-size: 0.96em;\n  background-color: #f9f9f7;\n  padding: 1px 2px;\n  border: 1px solid #dadada;\n  border-radius: 3px;\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  word-wrap: break-word;\n}\n\n.yue pre {\n  margin: 1.64em 0;\n  padding: 7px;\n  border: none;\n  border-left: 3px solid #dadada;\n  padding-left: 10px;\n  overflow: auto;\n  line-height: 1.5;\n  font-size: 0.96em;\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  color: #4c4c4c;\n  background-color: #f9f9f7;\n}\n\n.yue pre code,\n.yue pre tt {\n  color: #4c4c4c;\n  border: none;\n  background: none;\n  padding: 0;\n}\n\n.yue table {\n  width: 100%;\n  max-width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  margin-bottom: 1.5em;\n  font-size: 0.96em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.yue th,\n.yue td {\n  text-align: left;\n  padding: 4px 8px 4px 10px;\n  border: 1px solid #dadada;\n}\n\n.yue td {\n  vertical-align: top;\n}\n\n.yue tr:nth-child(even) {\n  background-color: #efefee;\n}\n\n.yue iframe {\n  display: block;\n  max-width: 100%;\n  margin-bottom: 30px;\n}\n\n.yue figure iframe {\n  margin: auto;\n}\n\n.yue table pre {\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n}\n\n@media (min-width: 1100px) {\n  .yue blockquote {\n    margin-left: -24px;\n    padding-left: 20px;\n    border-width: 4px;\n  }\n\n  .yue blockquote blockquote {\n    margin-left: 0;\n  }\n}", ""]);

// exports


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(86)(false);
// imports


// module
exports.push([module.i, "/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n        color: black;\n        background: none;\n        text-shadow: 0 1px white;\n        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n        direction: ltr;\n        text-align: left;\n        white-space: pre;\n        word-spacing: normal;\n        word-break: normal;\n        word-wrap: normal;\n        line-height: 1.5;\n\n        -moz-tab-size: 4;\n        -o-tab-size: 4;\n        tab-size: 4;\n\n        -webkit-hyphens: none;\n        -ms-hyphens: none;\n        hyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n        text-shadow: none;\n        background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n        text-shadow: none;\n        background: #b3d4fc;\n}\n\n@media print {\n        code[class*=\"language-\"],\n        pre[class*=\"language-\"] {\n                text-shadow: none;\n        }\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n        padding: 1em;\n        margin: .5em 0;\n        overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n        background: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n        padding: .1em;\n        border-radius: .3em;\n        white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n        color: slategray;\n}\n\n.token.punctuation {\n        color: #999;\n}\n\n.namespace {\n        opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n        color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n        color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n        color: #a67f59;\n        background: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n        color: #07a;\n}\n\n.token.function {\n        color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n        color: #e90;\n}\n\n.token.important,\n.token.bold {\n        font-weight: bold;\n}\n.token.italic {\n        font-style: italic;\n}\n\n.token.entity {\n        cursor: help;\n}\n", ""]);

// exports


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(86)(false);
// imports


// module
exports.push([module.i, "html, body {\n  padding: 0;\n  margin: 0;\n}\n\n.sep {\n  margin: 0 18px;\n}\n/* layout */\n.header {\n  font-size: 16px;\n  font-family: \"Optima\", \"Avenir\", \"Helvetica Neue\", sans-serif;\n  padding: 20px 10px;\n}\n.header a {\n  color: #323233;\n}\n.header a:hover {\n  opacity: 0.6;\n}\n.header .menu {\n  text-align: right;\n}\n.header .brand {\n  float: left;\n  margin-right: 30px;\n  text-transform: uppercase;\n}\n.brand:before {\n  content: '\\BB';\n}\n.brand a {\n  text-decoration: none;\n}\n.menu a {\n  margin-left: 14px;\n}\n.container {\n  max-width: 640px;\n  *width: 650px;\n  margin: 0 auto;\n  zoom: 1;\n}\n.container:after {\n  content: \" \";\n  display: block;\n  visibility: none;\n  clear: both;\n}\n.document {\n  max-width: 640px;\n  *width: 650px;\n  margin: 0 auto;\n  padding: 30px 10px;\n}\n.footer {\n  margin: 0 auto;\n  max-width: 500px;\n  *width: 500px;\n  color: #555;\n  color: rgba(0, 0, 0, 0.5);\n  font-size: 15px;\n  line-height: 1.3;\n  padding: 20px 20px 30px;\n}\n.copyright {\n  text-align: center;\n  color: #ddd;\n}\n.copyright a {\n  color: #ddd;\n}\n@media (max-width: 650px) {\n  .footer {\n    padding-bottom: 10px;\n  }\n}\n\n/* entry */\n.entry-meta {\n  border-top: 1px solid #eee;\n  padding-top: 10px;\n  color: #565655;\n  font-size: smaller;\n}\n.entry-description {\n  color: #676867;\n  font-size: larger;\n}\n.entry-tags a:before {\n  content: '#';\n  color: #ccc;\n}\n.entry-list .item {\n  margin-bottom: 1em;\n}\n.entry-list .item-title {\n  font-size: 16px;\n  margin-bottom: 0;\n}\n.entry-list .item-description {\n  color: #565655;\n  font-size: 16px;\n  padding-left: 84px;\n}\n.entry-list .item-description p {\n  margin: 0;\n}\n.entry-list .item time {\n  display: inline-block;\n  width: 80px;\n  font: normal 12px monospace;\n  color: #999;\n}\n\n.document a.title-permalink {\n  margin-left: 4px;\n  padding: 0 4px;\n  text-decoration: none;\n  color: #f0f0f2;\n}\n.document a.title-permalink:hover {\n  color: #5784bf;\n  background-color: #eee;\n}\n\n/* pagination */\n.pagination {\n  position: relative;\n  margin-top: 40px;\n  font-size: 12px;\n  text-transform: uppercase;\n  font-weight: 700;\n  font-family: \"Optima\", \"Avenir\", \"Helvetica Neue\", sans-serif;\n}\n.pagination .newer {\n  position: absolute;\n  text-decoration: none;\n  left: 0;\n}\n.pagination .older {\n  position: absolute;\n  text-decoration: none;\n  right: 0;\n}\n.pagination .newer:before {\n  content: \"\\AB\";\n}\n.pagination .older:after {\n  content: \"\\BB\"\n}\n\n/* extra widget */\n.github {\n  position: fixed;\n  top: 40px;\n  right: -50px;\n  border: 2px solid #121622;\n  -webkit-box-shadow: 0 0 8px #555;\n          box-shadow: 0 0 8px #555;\n  -webkit-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n.github:hover {\n  -webkit-box-shadow: 0 0 12px #444;\n          box-shadow: 0 0 12px #444;\n}\n.github .github-link {\n  display: block;\n  font-family: \"Lato\", sans-serif;\n  font-size: 14px;\n  padding: 2px 0;\n  width: 200px;\n  border: 1px dotted #383C46;\n  background-color: #121622;\n  color: #ECEDEE;\n  text-decoration: none;\n  text-align: center;\n}\n@media (max-width: 890px) {\n  .github {\n    display: none;\n  }\n}\n\n.document a.button {\n  display: inline-block;\n  padding: 1em;\n  margin: 0;\n  background-color: #222223;\n  color: #fcfcfd;\n  text-transform: uppercase;\n  border: none;\n  text-decoration: none;\n  outline: none;\n  border-radius: 3px;\n  text-align: center;\n  letter-spacing: 0.1em;\n  font: bold 0.7em/1 \"Arial\", sans-serif;\n  cursor: pointer;\n  vertical-align: middle;\n}\n.document a.button:hover {\n  opacity: 0.9;\n  color: white;\n}\n\n.tagcloud {\n  margin-bottom: 2em;\n}\n.tagcloud .count {\n  font-size: 12px;\n}\n.tagcloud a {\n  display: inline-block;\n  margin: 0.2em 0.4em;\n  opacity: 0.6;\n}\n.tagcloud a:hover {\n  opacity: 1;\n}\n", ""]);

// exports


/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(52);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(91);

var _reactDocumentTitle = __webpack_require__(90);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _Layout = __webpack_require__(60);

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function getTime(date) {
  return new Date(date).getTime();
}

exports.default = function (props) {
  var toReactComponent = props.utils.toReactComponent;
  var posts = props.picked.posts.sort(function (a, b) {
    return getTime(b.meta.publishDate) - getTime(a.meta.publishDate);
  });

  var year = NaN;
  var entryList = [];
  posts.forEach(function (_ref, index) {
    var meta = _ref.meta,
        description = _ref.description;

    if (!meta.publishDate) {
      console.error('You must set \'publishDate\' in meta data for ' + meta.filename + '.');
      return;
    }
    var publishYear = meta.publishDate.slice(0, 4);
    if (year !== publishYear) {
      year = publishYear;
      entryList.push(_react2.default.createElement('a', { className: 'item-year', href: '#' + publishYear, key: publishYear, id: publishYear }, publishYear));
    }

    entryList.push(_react2.default.createElement('div', { className: 'item', key: index }, _react2.default.createElement('h2', { className: 'item-title', id: meta.title }, _react2.default.createElement('time', null, meta.publishDate.slice(0, 10) + ' '), _react2.default.createElement(_router.Link, { to: '/' + meta.filename.replace(/\.md$/i, '') }, meta.title)), !description ? null : _react2.default.createElement('div', { className: 'item-description' }, toReactComponent(description))));
  });
  return _react2.default.createElement(_reactDocumentTitle2.default, { title: 'BiSheng Theme One' }, _react2.default.createElement(_Layout2.default, props, _react2.default.createElement('h1', { className: 'entry-title' }, 'Archive'), _react2.default.createElement('div', { className: 'entry-list' }, entryList)));
};

// TODO
// <div class="pagination">
//   {%- if pagination.has_prev %}
//   <a class="newer" href="{{ pagination_url(pagination.prev_num) }}">Newer</a>
//   {%- endif %}

//   {%- if pagination.has_next %}
//   <a class="older" href="{{ pagination_url(pagination.next_num) }}">Older</a>
//   {%- endif %}
// </div>

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(52);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(91);

var _collect = __webpack_require__(513);

var _collect2 = _interopRequireDefault(_collect);

var _reactDocumentTitle = __webpack_require__(90);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _Layout = __webpack_require__(60);

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

var Post = function Post(props) {
  var pageData = props.pageData,
      utils = props.utils;
  var meta = pageData.meta,
      description = pageData.description,
      content = pageData.content;

  return _react2.default.createElement(_reactDocumentTitle2.default, { title: meta.title + ' | BiSheng Theme One' }, _react2.default.createElement(_Layout2.default, props, _react2.default.createElement('div', { className: 'hentry' }, _react2.default.createElement('h1', { className: 'entry-title' }, meta.title), !description ? null : _react2.default.createElement('div', { className: 'entry-description' }, utils.toReactComponent(description)), _react2.default.createElement('div', { className: 'entry-content' }, utils.toReactComponent(content)), _react2.default.createElement('div', { className: 'entry-meta' }, _react2.default.createElement('time', { className: 'updated' }, meta.publishDate.slice(0, 10) + ' '), !meta.tags ? null : _react2.default.createElement('span', null, 'in ', _react2.default.createElement('span', { className: 'entry-tags' }, meta.tags.map(function (tag, index) {
    return _react2.default.createElement(_router.Link, { to: '/tags#' + tag, key: index }, tag);
  }))), !meta.source ? null : _react2.default.createElement('a', { className: 'source sep', href: meta.source }, meta.source)))));
};

exports.default = (0, _collect2.default)(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(nextProps) {
    var pageData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (nextProps.pageData) {
              _context.next = 2;
              break;
            }

            throw 404;

          case 2:
            _context.next = 4;
            return nextProps.pageData();

          case 4:
            pageData = _context.sent;
            return _context.abrupt('return', { pageData: pageData });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())(Post);

// TODO
// {%- if config.disqus %}
// {%- include "_disqus.html" %}
// {%- endif %}
// {%- if config.duoshuo %}
// {%- include "_duoshuo.html" %}
// {%- endif %}

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(52);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(91);

var _reactDocumentTitle = __webpack_require__(90);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _Layout = __webpack_require__(60);

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function getTags(posts) {
  var tags = {};
  Object.keys(posts).forEach(function (filename) {
    var post = posts[filename];
    var postTags = post.meta.tags;
    if (postTags) {
      postTags.forEach(function (tag) {
        if (tags[tag]) {
          tags[tag].push(post);
        } else {
          tags[tag] = [post];
        }
      });
    }
  });
  return tags;
}

exports.default = function (props) {
  var toReactComponent = props.utils.toReactComponent;
  var tags = getTags(props.picked.posts);

  return _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Tag Cloud | BiSheng Theme One' }, _react2.default.createElement(_Layout2.default, props, _react2.default.createElement('h1', { className: 'entry-title' }, 'Tags'), _react2.default.createElement('div', { className: 'tagcloud' }, Object.keys(tags).map(function (tag, index) {
    return _react2.default.createElement('a', { href: '#' + tag, key: index }, tag, ' ', _react2.default.createElement('span', { className: 'count' }, tags[tag].length));
  })), _react2.default.createElement('div', { className: 'entry-list' }, Object.keys(tags).map(function (tag) {
    return [_react2.default.createElement('a', { className: 'item-tag', href: '#' + tag, id: tag, key: 'tag' }, tag)].concat(tags[tag].map(function (_ref, index) {
      var meta = _ref.meta,
          description = _ref.description;
      return _react2.default.createElement('div', { className: 'item', key: index }, _react2.default.createElement('h2', { className: 'item-title' }, _react2.default.createElement('time', null, meta.publishDate.slice(0, 10)), _react2.default.createElement(_router.Link, { to: '' + meta.filename.replace(/\.md/, '') }, meta.title)), !description ? null : _react2.default.createElement('div', { className: 'item-description' }, toReactComponent(description)));
    }));
  }))));
};

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(210);
__webpack_require__(230);
module.exports = __webpack_require__(232);


/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

/* global __resourceQuery WorkerGlobalScope self */
/* eslint prefer-destructuring: off */

var url = __webpack_require__(211);
var stripAnsi = __webpack_require__(218);
var log = __webpack_require__(220).getLogger('webpack-dev-server');
var socket = __webpack_require__(221);
var overlay = __webpack_require__(223);

function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute('src');
  }
  // Fall back to getting all scripts in the document.
  var scriptElements = document.scripts || [];
  var currentScript = scriptElements[scriptElements.length - 1];
  if (currentScript) {
    return currentScript.getAttribute('src');
  }
  // Fail as there was no script to use.
  throw new Error('[WDS] Failed to get current script source.');
}

var urlParts = void 0;
var hotReload = true;
if (typeof window !== 'undefined') {
  var qs = window.location.search.toLowerCase();
  hotReload = qs.indexOf('hotreload=false') === -1;
}
if (true) {
  // If this bundle is inlined, use the resource query to get the correct url.
  urlParts = url.parse(__resourceQuery.substr(1));
} else {
  // Else, get the url from the <script> this file was called with.
  var scriptHost = getCurrentScriptSource();
  // eslint-disable-next-line no-useless-escape
  scriptHost = scriptHost.replace(/\/[^\/]+$/, '');
  urlParts = url.parse(scriptHost || '/', false, true);
}

if (!urlParts.port || urlParts.port === '0') {
  urlParts.port = self.location.port;
}

var _hot = false;
var initial = true;
var currentHash = '';
var useWarningOverlay = false;
var useErrorOverlay = false;
var useProgress = false;

var INFO = 'info';
var WARNING = 'warning';
var ERROR = 'error';
var NONE = 'none';

// Set the default log level
log.setDefaultLevel(INFO);

// Send messages to the outside, so plugins can consume it.
function sendMsg(type, data) {
  if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: 'webpack' + type,
      data: data
    }, '*');
  }
}

var onSocketMsg = {
  hot: function hot() {
    _hot = true;
    log.info('[WDS] Hot Module Replacement enabled.');
  },
  invalid: function invalid() {
    log.info('[WDS] App updated. Recompiling...');
    // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (useWarningOverlay || useErrorOverlay) overlay.clear();
    sendMsg('Invalid');
  },
  hash: function hash(_hash) {
    currentHash = _hash;
  },

  'still-ok': function stillOk() {
    log.info('[WDS] Nothing changed.');
    if (useWarningOverlay || useErrorOverlay) overlay.clear();
    sendMsg('StillOk');
  },
  'log-level': function logLevel(level) {
    var hotCtx = __webpack_require__(228);
    if (hotCtx.keys().indexOf('./log') !== -1) {
      hotCtx('./log').setLogLevel(level);
    }
    switch (level) {
      case INFO:
      case ERROR:
        log.setLevel(level);
        break;
      case WARNING:
        // loglevel's warning name is different from webpack's
        log.setLevel('warn');
        break;
      case NONE:
        log.disableAll();
        break;
      default:
        log.error('[WDS] Unknown clientLogLevel \'' + level + '\'');
    }
  },
  overlay: function overlay(value) {
    if (typeof document !== 'undefined') {
      if (typeof value === 'boolean') {
        useWarningOverlay = false;
        useErrorOverlay = value;
      } else if (value) {
        useWarningOverlay = value.warnings;
        useErrorOverlay = value.errors;
      }
    }
  },
  progress: function progress(_progress) {
    if (typeof document !== 'undefined') {
      useProgress = _progress;
    }
  },

  'progress-update': function progressUpdate(data) {
    if (useProgress) log.info('[WDS] ' + data.percent + '% - ' + data.msg + '.');
  },
  ok: function ok() {
    sendMsg('Ok');
    if (useWarningOverlay || useErrorOverlay) overlay.clear();
    if (initial) return initial = false; // eslint-disable-line no-return-assign
    reloadApp();
  },

  'content-changed': function contentChanged() {
    log.info('[WDS] Content base changed. Reloading...');
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn('[WDS] Warnings while compiling.');
    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning);
    });
    sendMsg('Warnings', strippedWarnings);
    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }
    if (useWarningOverlay) overlay.showMessage(_warnings);

    if (initial) return initial = false; // eslint-disable-line no-return-assign
    reloadApp();
  },
  errors: function errors(_errors) {
    log.error('[WDS] Errors while compiling. Reload prevented.');
    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error);
    });
    sendMsg('Errors', strippedErrors);
    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }
    if (useErrorOverlay) overlay.showMessage(_errors);
    initial = false;
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.error('[WDS] Disconnected!');
    sendMsg('Close');
  }
};

var hostname = urlParts.hostname;
var protocol = urlParts.protocol;

// check ipv4 and ipv6 `all hostname`
if (hostname === '0.0.0.0' || hostname === '::') {
  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  // eslint-disable-next-line no-bitwise
  if (self.location.hostname && !!~self.location.protocol.indexOf('http')) {
    hostname = self.location.hostname;
  }
}

// `hostname` can be empty when the script path is relative. In that case, specifying
// a protocol would result in an invalid URL.
// When https is used in the app, secure websockets are always necessary
// because the browser doesn't accept non-secure websockets.
if (hostname && (self.location.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
  protocol = self.location.protocol;
}

var socketUrl = url.format({
  protocol: protocol,
  auth: urlParts.auth,
  hostname: hostname,
  port: urlParts.port,
  pathname: urlParts.path == null || urlParts.path === '/' ? '/sockjs-node' : urlParts.path
});

socket(socketUrl, onSocketMsg);

var isUnloading = false;
self.addEventListener('beforeunload', function () {
  isUnloading = true;
});

function reloadApp() {
  if (isUnloading || !hotReload) {
    return;
  }
  if (_hot) {
    log.info('[WDS] App hot update...');
    // eslint-disable-next-line global-require
    var hotEmitter = __webpack_require__(143);
    hotEmitter.emit('webpackHotUpdate', currentHash);
    if (typeof self !== 'undefined' && self.window) {
      // broadcast update to window
      self.postMessage('webpackHotUpdate' + currentHash, '*');
    }
  } else {
    var rootWindow = self;
    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== 'about:') {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }

  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    log.info('[WDS] App updated. Reloading...');
    rootWindow.location.reload();
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, "?http://localhost"))

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": 92
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 228;

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(233);
__webpack_require__(435);

/* eslint-disable no-unused-vars */
var React = __webpack_require__(13);
/* eslint-enable no-unused-vars */
var ReactDOM = __webpack_require__(439);
var ReactRouter = __webpack_require__(182);
var history = __webpack_require__(473);
var data = __webpack_require__(475);
var createElement = __webpack_require__(477);
var routes = __webpack_require__(478)(data);

var _window$location = window.location,
    pathname = _window$location.pathname,
    search = _window$location.search,
    hash = _window$location.hash;

var location = '' + pathname + search + hash;
var basename = '/';
ReactRouter.match({ routes: routes, location: location, basename: basename }, function () {
  var router = React.createElement(ReactRouter.Router, {
    history: ReactRouter.useRouterHistory(history.createHistory)({ basename: basename }),
    routes: routes,
    createElement: createElement
  });
  ReactDOM.render(router, document.getElementById('react-content'));
});

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(87)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(119, function() {
			var newContent = __webpack_require__(119);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  markdown: {
    'good-bye': function goodBye() {
      return new Promise(function (resolve) {
        __webpack_require__.e/* require.ensure */(1).then((function (require) {
          resolve(__webpack_require__(514));
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
      });
    },
    'hello-world': function helloWorld() {
      return new Promise(function (resolve) {
        __webpack_require__.e/* require.ensure */(0).then((function (require) {
          resolve(__webpack_require__(515));
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
      });
    }
  },
  picked: {
    "posts": [{
      "meta": {
        "title": "Good bye!",
        "publishDate": "2015-05-05T00:00:00.000Z",
        "filename": "posts/good-bye.md"
      },
      "description": ["section", ["p", "The second article which is posted by BiSheng."]]
    }, {
      "meta": {
        "title": "Hello world!",
        "publishDate": "2016-05-05T00:00:00.000Z",
        "tags": ["test"],
        "filename": "posts/hello-world.md"
      },
      "description": ["section", ["p", "The first article which is posted by BiSheng."]]
    }]
  },
  plugins: [[__webpack_require__(476), {}]]
};

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-var */

var React = __webpack_require__(13);
var JsonML = __webpack_require__(195);

module.exports = function () {
  return {
    converters: [[function (node) {
      return JsonML.isElement(node) && JsonML.getTagName(node) === 'pre';
    }, function (node, index) {
      var attr = JsonML.getAttributes(node);
      return React.createElement('pre', {
        key: index,
        className: 'language-' + attr.lang
      }, React.createElement('code', {
        dangerouslySetInnerHTML: { __html: attr.highlighted }
      }));
    }]]
  };
};

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/* eslint-disable no-unused-vars */
var React = __webpack_require__(13);
/* eslint-enable no-unused-vars */
var NProgress = __webpack_require__(196);

module.exports = function createElement(Component, props) {
  NProgress.done();
  var dynamicPropsKey = props.location.pathname;
  return React.createElement(Component, _extends({}, props, Component[dynamicPropsKey]));
};

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var defaultCollector = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(nextProps) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', nextProps);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function defaultCollector(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

var chain = __webpack_require__(479);
var toReactElement = __webpack_require__(495);
var exist = __webpack_require__(498);
var NProgress = __webpack_require__(196);
var NotFound = __webpack_require__(135);
var themeConfig = JSON.parse('{"home":"/","sitename":"One","tagline":"The one theme for bisheng","github":"https://github.com/benjycui/bisheng"}');

function calcPropsPath(dataPath, params) {
  return typeof dataPath === 'function' ? dataPath(params) : Object.keys(params).reduce(function (path, param) {
    return path.replace(':' + param, params[param]);
  }, dataPath);
}

function generateUtils(data, props) {
  var plugins = data.plugins.map(function (pluginTupple) {
    return pluginTupple[0](pluginTupple[1], props);
  });
  var converters = chain(function (plugin) {
    return plugin.converters || [];
  }, plugins);
  var utils = {
    get: exist.get,
    toReactComponent: function toReactComponent(jsonml) {
      return toReactElement(jsonml, converters);
    }
  };
  plugins.map(function (plugin) {
    return plugin.utils || {};
  }).forEach(function (u) {
    return Object.assign(utils, u);
  });
  return utils;
}

module.exports = function getRoutes(data) {
  function templateWrapper(template) {
    var dataPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var Template = __webpack_require__(512)("./template" + template.replace(/^\.\/template/, ''));

    return function (nextState, callback) {
      var propsPath = calcPropsPath(dataPath, nextState.params);
      var pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').split('/'));
      var utils = generateUtils(data, nextState);

      var collector = (Template.default || Template).collector || defaultCollector;
      var dynamicPropsKey = nextState.location.pathname;
      var nextProps = _extends({}, nextState, {
        themeConfig: themeConfig,
        data: data.markdown,
        picked: data.picked,
        pageData: pageData,
        utils: utils
      });
      collector(nextProps).then(function (collectedValue) {
        try {
          var Comp = Template.default || Template;
          Comp[dynamicPropsKey] = _extends({}, nextProps, collectedValue);
          callback(null, Comp);
        } catch (e) {
          console.error(e);
        }
      }).catch(function (err) {
        var Comp = NotFound.default || NotFound;
        Comp[dynamicPropsKey] = nextProps;
        callback(err === 404 ? null : err, Comp);
      });
    };
  }

  var themeRoutes = JSON.parse('[{"path":"/","component":"./template/Archive"},{"path":"/posts/:post","dataPath":"/:post","component":"./template/Post"},{"path":"/tags","component":"./template/TagCloud"}]');
  var routes = Array.isArray(themeRoutes) ? themeRoutes : [themeRoutes];

  function processRoutes(route) {
    if (Array.isArray(route)) {
      return route.map(processRoutes);
    }

    return Object.assign({}, route, {
      onEnter: function onEnter() {
        if (typeof document !== 'undefined') {
          NProgress.start();
        }
      },
      component: undefined,
      getComponent: templateWrapper(route.component, route.dataPath || route.path),
      indexRoute: route.indexRoute && Object.assign({}, route.indexRoute, {
        component: undefined,
        getComponent: templateWrapper(route.indexRoute.component, route.indexRoute.dataPath || route.indexRoute.path)
      }),
      childRoutes: route.childRoutes && route.childRoutes.map(processRoutes)
    });
  }

  var processedRoutes = processRoutes(routes);
  processedRoutes.push({
    path: '*',
    getComponents: templateWrapper('./template/NotFound')
  });

  return processedRoutes;
};

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(509);
__webpack_require__(510);
__webpack_require__(511);

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(139);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(87)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(139, function() {
			var newContent = __webpack_require__(139);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(140);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(87)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(140, function() {
			var newContent = __webpack_require__(140);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(141);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(87)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(141, function() {
			var newContent = __webpack_require__(141);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./template/Archive": 206,
	"./template/Archive.js": 206,
	"./template/Layout": 60,
	"./template/Layout.js": 60,
	"./template/NotFound": 135,
	"./template/NotFound.js": 135,
	"./template/Post": 207,
	"./template/Post.js": 207,
	"./template/TagCloud": 208,
	"./template/TagCloud.js": 208
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 512;

/***/ }),

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (collector) {
  return function (Component) {
    Component.collector = collector;
    return Component;
  };
};

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(52);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(91);

__webpack_require__(508);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (_ref) {
  var themeConfig = _ref.themeConfig,
      children = _ref.children;

  return _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'header' }, _react2.default.createElement('div', { className: 'container' }, _react2.default.createElement('div', { className: 'brand' }, _react2.default.createElement(_router.Link, { className: 'home', to: themeConfig.home }, themeConfig.sitename), !themeConfig.tagline ? null : _react2.default.createElement('span', null, '- ', _react2.default.createElement('span', { className: 'tagline' }, themeConfig.tagline))), !themeConfig.navigation ? null : _react2.default.createElement('div', { className: 'menu', role: 'navigation' }, themeConfig.navigation.map(function (item, index) {
    return _react2.default.createElement(_router.Link, { to: item.link, key: index }, item.title);
  })))), _react2.default.createElement('div', { className: 'document yue' }, children), _react2.default.createElement('div', { className: 'footer' }, themeConfig.footer ? themeConfig.footer : null, themeConfig.hideBisheng ? null : _react2.default.createElement('p', { className: 'copyright' }, 'powered by ', _react2.default.createElement('a', { href: 'https://github.com/benjycui/bisheng' }, 'BiSheng'))), !themeConfig.github ? null : _react2.default.createElement('div', { className: 'github' }, _react2.default.createElement('a', { className: 'github-link', href: themeConfig.github }, 'Fork me on GitHub')));
};

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var router = __webpack_require__(182);

module.exports = router;

/***/ })

},[209]);