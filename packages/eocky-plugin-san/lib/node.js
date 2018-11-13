const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const loaderUtils = require('loader-utils');
const himalaya = require('himalaya');
const transform = require('san-markdown-loader/lib/transform');

const parse = himalaya.parse;
const stringify = himalaya.stringify;
const parseOpts = {
    ...himalaya.parseDefaults,
    // himalaya 默认 template 标签包含不解析内容 这里重新配置
    childlessTags: ['style', 'script']
};

const tmpDir = path.join(__dirname, '__tmp__');

if (!fs.existsSync(tmpDir)) {
    fs.mkdir(tmpDir);
}

module.exports = function (markdownData, {
    lang = 'san-example'
}) {
    const content = markdownData.content;

    if (Array.isArray(content)) {
        markdownData.content = content.map(node => {
            const tagName = node[0];
            const attr = node[1];
            if (tagName === 'pre' && attr && attr.lang === lang) {
                const code = node[2][1];

                // 计算哈希作为结果文件的文件名
                const hash = crypto.createHash('md5').update(code).digest('hex');
                const targetPath = path.join(tmpDir, `${hash}.san`);
                const originPath = process.cwd() + '/' + markdownData.meta.filename;

                // 对code中的相对路径做转换
                const parsedSanAst = parse(code, parseOpts);
                parsedSanAst
                    .filter(el => (
                        el.type === 'element'
                        && el.tagName === 'script'
                        && el.attributes.every(el => el.key !== 'src')
                    ))
                    .forEach(script => {
                        const textNode = script.children[0];
                        textNode.content = transform.normalizeDependences({
                            code: textNode.content,
                            targetPath,
                            originPath,
                            components: []
                        });
                    });
                const parsedCode = stringify(parsedSanAst, parseOpts);

                fs.writeFileSync(targetPath, parsedCode, 'utf8');
                const moduleRes = loaderUtils.stringifyRequest(this, targetPath).slice(1, -1);

                node[3] = {
                    loadCodeAsModule: {
                        __BISHENG_EMBEDED_CODE: true,
                        code: `function () {
                            const component = require('!!san-loader!${moduleRes}');
                            return component;
                        }`
                    }
                }
            }
            return node;
        });
    }

    return markdownData;
}
