const path = require('path');

module.exports = {
    lazyLoad: false,
    plugins: [
        path.join(__dirname, '../../', 'eocky-plugin-san')
    ]
};
