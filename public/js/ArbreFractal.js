import { Utils } from './Utils.js';

var longueur_branches = Utils.random(1.4, 1.7) * 2;

const TAILLE_BRANCHES = 11;
const NB_FEUILLES = Utils.random(100, 150);
const FACTEUR_POUSSE = Utils.random(50, 75);

console.log(FACTEUR_POUSSE);

/* Une feuille représente un point vers lequel les branches vont pousser */
class Feuille {
    constructor(p, decX, decY){
        this.p = p;
        this.manger = false;
        this.pos = p.createVector(p.random(decX+(decX/2)) + (decX-(decX/2))/2 - decX, p.random(decY) + decY/2 + decY/12)
    }
    dessiner(){
        let p = this.p;
        p.fill(0);
        p.noStroke();
        p.ellipse(this.pos.x, this.pos.y, 4, 4);
    }
}

class Branche {
    constructor(p, parent, pos, dir){
        this.p = p;
        this.parent = parent;
        this.generation = (parent!=null) ? parent.generation + 1 : 1;
        this.pos = pos;
        this.dir = dir; // Direction de la branche
        this.dirOriginale = dir.copy(); 
        this.compte = 0;
        this.longueur = longueur_branches;
    }
    reinitialiser(){
        this.dir = this.dirOriginale.copy();
        this.compte = 0;
    }
    dessiner(decX, decY){
        let p = this.p;
        if(this.parent != null){
            p.stroke(0);
            p.strokeWeight(Math.max(TAILLE_BRANCHES - (this.generation/(TAILLE_BRANCHES+1)), 0.01));
            let decYFinal = decY/8.5;
            p.line(this.pos.x + decX, this.pos.y + decYFinal, this.parent.pos.x + decX, this.parent.pos.y + decYFinal);
        }
    }
    prochaineBranche(){
        let p = this.p;
        // this.dir.normalize();
        let prochaineDir = p5.Vector.mult(this.dir, this.longueur);
        let prochainePos = p5.Vector.add(this.pos, prochaineDir);
        let nouvelleBranche = new Branche(p, this, prochainePos, this.dir.copy());
        return nouvelleBranche;
    }
}

export class ArbreFractal {
    constructor(p){
        this.p = p; // Objet p5 utilisé pour le rendu du sketch P5JS
        this.dist_max = 150;
        this.dist_min = 18;
        this.nbFrames = 0;
        this.nbPousse = 0;
        this.nbPousseMax = 200;
        this.arreterDePousser = false;
        this.racine = null;
        this.feuilles = [];
        this.branches = [];
        this.decX = window.innerWidth / 2;
        this.decY = window.innerHeight / 2;

        for(let x = 0; x < NB_FEUILLES; x++){
            this.feuilles.push(new Feuille(p, this.decX, this.decY));
        }

        let pos = p.createVector(0, this.decY + this.decY/1.1);
        let dir = p.createVector(0, -1); // Pointe vers le haut
        let racine = new Branche(p, null, pos, dir);

        this.branches.push(racine);
        this.racine = racine;

        var actuel = racine;
        var trouver = false;

        let it= 0;
        let maxIt = 50;
        while(!trouver){
            it++;
            for(let x = 0; x < this.feuilles.length; x++){
                let d = p5.Vector.dist(racine.pos, this.feuilles[x].pos);
                if(d < this.dist_max){
                    trouver = true;
                }
            }
            // Créer une nouvelle branche
            if(!trouver){
                let branche = actuel.prochaineBranche();
                actuel = branche;
                branche.longueur = 2;
                this.branches.push(branche);
            }
            if(it>maxIt)
                break;
        }

    }
    pousser(){
        longueur_branches *= 0.995;
        let p = this.p;
        if(this.nbPousse >= this.nbPousseMax){
            this.arreterDePousser = true;
            return;
        }
        this.nbPousse++;
        for(let x = 0; x < this.feuilles.length; x++){
            let feuille = this.feuilles[x];
            let branchePlusProche = null;
            let record = 1000000;
            for(let y = 0; y < this.branches.length; y++){
                if(p.random(1, 100) < FACTEUR_POUSSE)
                    continue;
                let branche = this.branches[y];
                let d = p5.Vector.dist(feuille.pos, branche.pos);
                if(d < this.dist_min){
                    feuille.manger = true;
                    branchePlusProche = null;
                    break;
                } else if(d > this.dist_max){
                    // On ignore cette branche
                    // continue;
                } else if(branchePlusProche == null || d < record) {
                    branchePlusProche = branche;
                    record = d;
                }
            }
            if(branchePlusProche != null) {
                let nouvelleDir = p5.Vector.sub(feuille.pos, branchePlusProche.pos);
                nouvelleDir.normalize();
                // Tourne la branche en direction de la feuille
                branchePlusProche.dir.add(nouvelleDir);
                // Le compte permet de faire la moyenne de toute les feuilles qui influencent la direction de la branche
                branchePlusProche.compte++;
            }
        }
        // Supprimer les feuilles qui ont été mangées
        for(let x = this.feuilles.length-1; x >= 0; x--){
            if(this.feuilles[x].manger) {
                this.feuilles.splice(x, 1);
            }
        }
        // Attacher une nouvelle branche à celle-ci si elle à été attirée au moin une fois par une feuille
        for(let x = this.branches.length-1; x >= 0; x--){
            let branche = this.branches[x];
            if(branche.compte > 0) {
                branche.dir.div(branche.compte);
                this.branches.push(branche.prochaineBranche());
            }
            branche.reinitialiser();
        }
    }
    dessinerArbre(){
        let p = this.p;
        this.decX = window.innerWidth / 2;
        this.decY = window.innerHeight / 2 - 50;
        //for(let x = 0; x < this.feuilles.length; x++){
        //    this.feuilles[x].dessiner();
        //}
        for(let x = 0; x < this.branches.length; x++){
            let b = this.branches[x];
            //b.pos = p.createVector();
            b.dessiner(this.decX, this.decY);
        }
        if(!this.arreterDePousser && this.nbFrames % 3 == 0)
            this.pousser();
        this.nbFrames++;
        // console.log(this.nbPousse);
    }
}