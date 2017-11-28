const path = require('path');

module.exports = {
    source: {
        guide: './docs/guide',
        components: './docs/components',
        resource: './docs/resource'
    },
    theme: path.join(__dirname, '..', 'eocky-theme-sanmui'),
    themeConfig: {
        home: '/',
        sitename: 'Just a eocky demo site',
        tagline: 'Just a eocky demo site'
    },
    port: 8000,
    root: '/static/'
};
