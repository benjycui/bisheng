'use strict';

module.exports = function(collector) {
  return function(Component) {
    Component.collector = collector;
    return Component;
  };
};
