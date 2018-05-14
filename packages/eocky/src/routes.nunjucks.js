import {router} from 'san-router';
const createSanComponent = require('../lib/utils/create-san-element');

const themeConfig = JSON.parse('{{ themeConfig | safe }}');

const theme = require('{{ themePathConfig }}');

function generateUtils(data) {
    const plugins = data.plugins;
    const utils = {
        createSanComponent
    };
    plugins.map(plugin => plugin.utils || {})
        .forEach(u => Object.assign(utils, u));
    return utils;
}

module.exports = function getRoutes(data) {
    const routes = require('{{ themePathRoute }}');
    const utils = generateUtils(data);
    routes.forEach(item => {
        router.add({
            ...item,
            target: '#content',
            themeConfig,
            data: data.markdown,
            picked: data.picked,
            utils
        });
    });

    router.start();
}
