const fontHeightCache = {};

export default function getFontHeight(fontStyle = '') {
    let result = fontHeightCache[fontStyle];

    if(!result) {
        const body = document.getElementsByTagName('body')[0];
        const dummy = document.createElement('div');

        const dummyText = document.createTextNode('MÉq');
        dummy.appendChild(dummyText);
        dummy.setAttribute('style', `font:${fontStyle};position:absolute;top:0;left:0`);
        body.appendChild(dummy);
        result = dummy.offsetHeight;

        fontHeightCache[fontStyle] = result;
        body.removeChild(dummy);
    }

    return result;
}
