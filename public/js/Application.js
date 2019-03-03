import { Utils } from './Utils.js';
import { P5Sketch } from "./P5Sketch.js";
import { SocketManager } from "./SocketManager.js";
import { ProjetsManager } from './ProjetsManager.js';

(function(){
    
    // P5JS sketch manager
    let p5Sketch = new P5Sketch();
    // Socket manager
    let sManager = new SocketManager();
    // Projets manager
    let pManager = new ProjetsManager();

    console.log(pManager.getProjetParNom("projet01_titreTest"));

})();