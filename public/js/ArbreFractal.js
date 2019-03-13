/* Une feuille représente un point vers lequel les branches vont pousser */
class Feuille {
    constructor(p){
        this.p = p;
        this.manger = false;
        this.pos = p.createVector(p.random(p.width), p.random(p.height - 150))
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
        this.pos = pos;
        this.dir = dir; // Direction de la branche
        this.dirOriginale = dir.copy(); 
        this.compte = 0;
        this.longueur = 5;
    }
    reinitialiser(){
        this.dir = this.dirOriginale.copy();
        this.compte = 0;
    }
    dessiner(){
        let p = this.p;
        if(this.parent != null){
            p.stroke(0);
            p.strokeWeight(3);
            p.line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
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
        this.dist_min = 10;
        this.nbPousse = 0;
        this.nbPousseMax = 90;
        this.arreterDePousser = false;
        this.feuilles = [];
        this.branches = [];

        for(let x = 0; x < 300; x++){
            this.feuilles.push(new Feuille(p));
        }

        let pos = p.createVector(p.width/2, p.height);
        let dir = p.createVector(0, -1); // Pointe vers le haut
        let racine = new Branche(p, null, pos, dir);

        this.branches.push(racine);

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
                this.branches.push(branche);
            }
            if(it>maxIt)
                break;
        }

    }
    pousser(){
        let p = this.p;
        this.nbPousse++;
        if(this.nbPousse >= this.nbPousseMax)
        this.arreterDePousser = true;
        for(let x = 0; x < this.feuilles.length; x++){
            let feuille = this.feuilles[x];
            let branchePlusProche = null;
            let record = 1000000;
            for(let y = 0; y < this.branches.length; y++){
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
        this.decY = window.innerHeight / 2;
        /* for(let x = 0; x < this.feuilles.length; x++){
            this.feuilles[x].dessiner();
        } */
        for(let x = 0; x < this.branches.length; x++){
            this.branches[x].dessiner();
        }
        if(!this.arreterDePousser)
            this.pousser();
    }
}