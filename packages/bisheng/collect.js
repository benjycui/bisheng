'use strict';

module.exports = collector => Component => {
  Component.collector = collector;
  return Component;
}
