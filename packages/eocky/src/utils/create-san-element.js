import san from 'san';
import {toHTMLText} from 'jsonml.js/lib/html.js'

module.exports = function jsonml2san(jsonml) {
    let template = toHTMLText(jsonml, function (elem) {
        if (elem.tagName &&
            elem.tagName.toLowerCase() === 'pre' &&
            elem.getAttribute('highlighted')) {
            elem.innerHTML = `<code>${elem.getAttribute('highlighted')}</code>`;
            elem.className = 'language-' + elem.getAttribute('lang');
            elem.removeAttribute('highlighted');
        }
        return elem;
    });

    return san.defineComponent({
        template
    });
}
