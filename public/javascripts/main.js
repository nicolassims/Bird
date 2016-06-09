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
            const XHR = new XMLHttpRequest();
            XHR.open('POST', document.url, true);
            XHR.setRequestHeader('X-Requested-load', 'XMLHttpRequest0');
            XHR.send(pigeonName);
            XHR.onload = () => {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    alert(XHR.responseText);
                }
            }
        });
    }
}

window.addEventListener('load', () => {
    new main();
});