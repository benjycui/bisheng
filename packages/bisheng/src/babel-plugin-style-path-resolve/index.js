module.exports = function () {
    return {
        visitor: {
            ImportDeclaration(path) {
                if (path.node.source && (path.node.source.value === './style' || path.node.source.value === './style/index')) {
                    path.node.source.value = './style/index.less';
                }
            },
        }
    }
}
