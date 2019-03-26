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

                /*
                START HERE
                */

                /*function Drop(){
                    this.x = p.random(window.innerWidth);
                    this.y = p.random(-200, 700);
                    this.z = p.random(1, 30);
                    this.yspeed = p.random(3, 35)/(this.z/1.4);
                    this.longueur = p.random(130, 50);
                    this.fall = function(){
                        this.y += this.yspeed;
                        if(this.y > p.height)
                            this.y = p.random(window.innerWidth);
                    }
                    this.show = function(){
                        p.stroke(210 + this.z, 210 - this.z, 210 - this.z);
                        p.line(this.x , this.y, this.x, this.y+this.longueur);
                    }
                }

                // Créationd des gouttes
                this.drops = [];
                for(var x = 0; x < 100; x++){
                    this.drops.push(new Drop());
                }
                */
                p.arbreFractal = new ArbreFractal(p);
            }
            p.draw = function () {
                if(p.arbreFractal.arreterDePousser)
                    return;
                p.background(255, 255, 255);
                console.log(p.arbreFractal);
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
