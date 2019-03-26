import { ArbreFractal } from "./ArbreFractal.js";

export class P5Sketch {
    constructor() {
        this.p5 = new p5(function (p) {
            p.setup = function () {
                // this.peasyCam = new Dw.EasyCam(this, 100);
                p.createCanvas(600, 600, p.P2D);
                var htmlCanvas = document.getElementById('defaultCanvas0');
                var context = htmlCanvas.getContext('2d');

                htmlCanvas.style = "";
                htmlCanvas.classList.add("animCanvasOuverture");
                initialize();

                function initialize() {
                    window.addEventListener('resize', resizeCanvas, false);
                    resizeCanvas();
                }

                function resizeCanvas() {
                    htmlCanvas.width = window.innerWidth;
                    htmlCanvas.height = window.innerHeight;
                    p.dessiner();
                }
                
                p.arbreFractal = new ArbreFractal(p);
                // Arrange un problème sur téléphone
                resizeCanvas();
            }
            p.draw = function () {
                if(p.arbreFractal.arreterDePousser)
                    return;
                p.background(255, 255, 255);
                //console.log(p.arbreFractal);
                // Rendu de l'arbre
                p.arbreFractal.dessinerArbre();
            }
            p.dessiner = function() {
                if(p.arbreFractal != null){
                    p.background(255, 255, 255);
                    p.arbreFractal.dessinerArbre();
                }
            }
        }, "sketch1");
    }
}
