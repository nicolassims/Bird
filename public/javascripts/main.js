/**
 * Created by Administrator on 3/14/2016.
 */

'use strict';

class main {
    constructor() {
        this.hoverHandler();
    }

    hoverHandler() {
        document.getElementById('pigeony').addEventListener('click', () => {
            let pigeonName = prompt('Name this pigeon.');
            console.log(pigeonName);
            //let bustCache = '?' + new Date().getTime();
            const XHR = new XMLHttpRequest();
            XHR.open('POST', document.url, true);
            XHR.setRequestHeader('x-requested-load', 'XMLHttpRequest0');
            XHR.send(pigeonName);
            XHR.onload = () => {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    alert(XHR.responseText);
                }
            };
        });
    }
}

window.addEventListener('load', () => {
    new main();
});