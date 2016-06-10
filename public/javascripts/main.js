/**
 * Created by Administrator on 3/14/2016.
 */

'use strict';

class main {
    constructor() {
        this.hoverHandler();
    }

    hoverHandler() {
        document.getElementById("pigeony").addEventListener("mouseenter", () => {
            let pigeonName = prompt("Name this pigeon.");
            let bustCache = '?' + new Date().getTime();
            const XHR = new XMLHttpRequest();
            XHR.open('POST', event.target.dataset.url + bustCache, true);
            XHR.setRequestHeader('X-Requested-load', 'XMLHttpRequest0');
            XHR.send(pigeonName);
            XHR.onload = function() {
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