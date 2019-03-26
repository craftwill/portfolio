import { Utils } from './Utils.js';
import { P5Sketch } from "./P5Sketch.js";
import { SocketManager } from "./SocketManager.js";
import { ProjetsManager } from './ProjetsManager.js';
import { AnimImages } from "./AnimImages.js";

(function(){
    
    // Emmène l'utilisateur au haut de la page
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.onload = function(){
        // P5JS sketch manager
        let p5Sketch = new P5Sketch();
        // Socket manager
        let sManager = new SocketManager();
        // Projets manager
        let pManager = new ProjetsManager();
        // Animation des projets
        let animProjets = new AnimImages(document.querySelector(".conteneurProjets"));
    }

})();