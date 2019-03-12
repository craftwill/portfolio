import { Utils } from './Utils.js';
import { P5Sketch } from "./P5Sketch.js";
import { SocketManager } from "./SocketManager.js";
import { ProjetsManager } from './ProjetsManager.js';
import { AnimImages } from "./AnimImages.js";

(function(){
    
    // P5JS sketch manager
    let p5Sketch = new P5Sketch();
    // Socket manager
    let sManager = new SocketManager();
    // Projets manager
    let pManager = new ProjetsManager();
    // Animation des projets
    let animProjets = new AnimImages(document.querySelector(".conteneurProjets"));

    console.log(pManager.getProjetParNom("projet01_titreTest"));

})();