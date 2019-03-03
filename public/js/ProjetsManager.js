// Structure d'un objet 'Projet'
class Projet {
    constructor(nom, description, srcImage){
        this.nom = nom;
        this.description = description;
        this.srcImage = srcImage;
    }
}
// Contient les projets et les fonctions permettant d'y accéder
export class ProjetsManager {
    constructor(){
        this.listeProjets = [];
        this.initialisationProjets();
    }
    getProjetParNom(nom){
        return this.listeProjets.find((p)=>{return (p.nom == nom)});
    }
    initialisationProjets(){
        // Projet 01
        this.listeProjets.push(new Projet(
            "projet01_titreTest",
            `projet01_descriptionTest para 1\n
             projet01_descriptionTest para 2\n
             projet01_descriptionTest para 3`,
            "projet01"
        ));
        // Projet 02
        this.listeProjets.push(new Projet(
            "projet02_titreTest",
            `projet02_descriptionTest para 1\n
             projet02_descriptionTest para 2\n
             projet02_descriptionTest para 3`,
            "projet02"
        ));
        // Projet 03
        this.listeProjets.push(new Projet(
            "projet03_titreTest",
            `projet03_descriptionTest para 1\n
             projet03_descriptionTest para 2\n
             projet03_descriptionTest para 3`,
            "projet03"
        ));
    }
}