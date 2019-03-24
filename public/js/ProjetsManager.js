var idCompte = 0;
// Structure d'un objet 'Projet'
class Projet {
    constructor(nom, description, srcImageApercu, srcImages){
        this.nom = nom;
        this.description = description;
        this.srcImageApercu = srcImageApercu;
        this.srcImages = srcImages;
        this.id = ++idCompte;
    }
}
// Contient les projets et les fonctions permettant d'y accéder
export class ProjetsManager {
    constructor(){
        this.projetOuvert = false;
        this.listeProjets = [];
        this.visionnementProjet = document.querySelector(".visionnementProjet");
        this.voileNoir = document.querySelector(".voileNoir");
        this.listeDivs = document.querySelector(".conteneurProjets").querySelectorAll(".boiteProjet");
        this.nbDivs = this.listeDivs.length;
        for(let x = 0; x < this.nbDivs; x++){
            let div = this.listeDivs[x];
            div.setAttribute("data-id", (x+1));
            div.classList.add("p" + (x+1));
            div.addEventListener("click", (e)=>{this.ouvrirProjet(e, div);});
        }
        this.initialisationProjets();
    }
    ouvrirProjet(e, div){
        this.projetOuvert = !this.projetOuvert;

        // Dans le cas ou l'utilisateur réappuie sur le projet
        if(this.projetOuvert == false){
            this.fermerProjet(e);
            return;
        }

        // Ouvrir visuellement
        this.visionnementProjet.style.right = "0vw";
        this.voileNoir.style.opacity = 0.9;
        this.voileNoir.style.pointerEvents = "all";
        document.body.style.overflowY = "hidden";
        //document.body.style.marginBottom = "-130px";
        document.body.style.marginRight = "30px";
        let boites = document.querySelectorAll(".boiteContent");
        for(let x = 0; x < boites.length; x++){
            boites[x].style.filter = "blur(2px)";
        }
        for(let x = 0; x < this.nbDivs; x++){
            this.listeDivs[x].querySelector("img").style.filter = "brightness(11%)";
        }

        // Gérer l'appairiton du contenu dans la page de visionnement
        let idProjet = div.getAttribute("data-id");
        let p = this.getProjetParID(idProjet);
        this.visionnementProjet.querySelector("div").innerHTML = p.description;

        // Ajouter l'évènement pour refermer la page de visionnement
        e.stopPropagation();
        this.voileNoir.addEventListener("click", (ev)=>{this.fermerProjet(ev)});
    }
    fermerProjet(e){
        this.projetOuvert = false;

        // Enlever l'évènement
        this.voileNoir.removeEventListener("click", this.fermerProjet);
        e.stopPropagation();

        // Fermer visuellement
        this.visionnementProjet.style.right = "-100vw";
        this.voileNoir.style.opacity = 0;
        this.voileNoir.style.pointerEvents = "none";
        document.body.style.overflowY = "auto";
        document.body.style.marginRight = "-0px";

        window.scrollBy(0, 1);

        let boites = document.querySelectorAll(".boiteContent");
        for(let x = 0; x < boites.length; x++){
            boites[x].style.filter = "blur(0px)";
        }
        for(let x = 0; x < this.nbDivs; x++){
            this.listeDivs[x].querySelector("img").style.filter = "brightness(100%)";
        }
    }
    getProjetParID(id){
        return this.listeProjets.find((p)=>{return (p.id == id)});
    }
    initialisationProjets(){
        // Projet 01
        this.listeProjets.push(new Projet(
            "Massacre à l'auberg-inn",
            `
                <div>
                    <h1>Massacre à l'auberg-inn</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            
            
                <div>
                    <h1>Massacre à l'auberg-inn</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            
            
                <div>
                    <h1>Massacre à l'auberg-inn</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            
            
                <div>
                    <h1>Massacre à l'auberg-inn</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 02
        this.listeProjets.push(new Projet(
            "Massacre à l'auberg-inn",
            `
                <div>
                    <h1>Générateur de terrain avec OpenGL</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 03
        this.listeProjets.push(new Projet(
            "Défend ton château!",
            `
                <div>
                    <h1>Défend ton château!</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 04
        this.listeProjets.push(new Projet(
            "Deadly Nightmare",
            `
                <div>
                    <h1>Deadly Nightmare</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 05
        this.listeProjets.push(new Projet(
            "Gladiatorio.club",
            `
                <div>
                    <h1>Gladiatorio.club</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 06
        this.listeProjets.push(new Projet(
            "Woodie clone",
            `
                <div>
                    <h1>Woodie clone</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 07
        this.listeProjets.push(new Projet(
            "Jeu d'échec",
            `
                <div>
                    <h1>Jeu d'échec</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 08
        this.listeProjets.push(new Projet(
            "Matte painting 01",
            `
                <div>
                    <h1>Matte painting 01</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.jpg" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 09
        this.listeProjets.push(new Projet(
            "Matte painting 02",
            `
                <div>
                    <h1>Matte painting 02</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.jpg" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 10
        this.listeProjets.push(new Projet(
            "Concept - Capitalist alien$",
            `
                <div>
                    <h1>Concept - Capitalist alien$</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
    }
}