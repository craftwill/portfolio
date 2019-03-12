export class ArbreFractal {
    constructor(p5js){
        this.p = p5js; // Objet p5 utilisé pour le rendu du sketch P5JS
        this.nbMaxBranches = 25;
        this.angle = 0;
        this.slider = p5js.createSlider(0, p5js.TWO_PI, p5js.PI/4, 0.01);
    }
    dessinerArbre(){
        let p = this.p;
        this.decalageX = window.innerWidth / 2;
        this.decalageY = window.innerHeight / 2;
        this.angle += 0.001;
        p.stroke(0, 0, 0);
        p.strokeWeight(3);
        let len = 100;
        p.translate(this.decalageX, p.height);
        this.branche(len);
    }
    branche(len){
        let p = this.p;
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        if(len > 4){
            p.push();
            p.rotate(this.angle);
            this.branche(len * 0.67);
            p.pop();
            p.push();
            p.rotate(-this.angle);
            this.branche(len * 0.67);
            p.pop();
        }
        // p.line(0, 0, 0, -len*0.67);
    }
}