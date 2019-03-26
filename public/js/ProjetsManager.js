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
        this.surMobile = 'ontouchstart' in document.documentElement;
        this.projetOuvert = false;
        this.listeProjets = [];
        this.contentDiv = document.querySelector(".content");
        this.visionnementProjet = document.querySelector(".visionnementProjet");
        this.voileNoir = document.querySelector(".voileNoir");
        this.listeDivs = document.querySelector(".conteneurProjets").querySelectorAll(".boiteProjet");
        this.visionnementProjetSortir = this.visionnementProjet.querySelector(".visionnementProjetSortir");
        this.nbDivs = this.listeDivs.length;
        for(let x = 0; x < this.nbDivs; x++){
            let div = this.listeDivs[x];
            div.setAttribute("data-id", (x+1));
            div.classList.add("p" + (x+1));
            div.addEventListener("click", (e)=>{this.ouvrirProjet(e, div);});
        }
        this.initialisationProjets();
        if(this.surMobile){
            // Injection de style css pour arranger un problème d'espacement lié au visionneur de projet
            //var node = document.createElement("style");
            //node.innerHTML = `
            //    .content > .visionnementProjet > div:nth-child(1) > div p{
            //        margin-bottom: 80vh;
            //    }
            //`;
            //document.body.appendChild(node);
        }
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
        //document.body.style.marginRight = "30px";
        this.visionnementProjetSortir.style.left = "0vw";

        let boites = document.querySelectorAll(".boiteContent");
        // Optimisation pour mobile
        if(this.surMobile == false){
            for(let x = 0; x < boites.length; x++){
                boites[x].style.filter = "blur(2px)";
            }
        }
        for(let x = 0; x < this.nbDivs; x++){
            let imgElm = this.listeDivs[x].querySelector("img");
            imgElm.style.opacity = "0.1";
            this.listeDivs[x].style.pointerEvents = "none";
        }

        // Gérer l'appairiton du contenu dans la page de visionnement
        let idProjet = div.getAttribute("data-id");
        let p = this.getProjetParID(idProjet);
        this.visionnementProjet.querySelector("div").innerHTML = p.description;

        // Ajouter l'évènement pour refermer la page de visionnement
        e.stopPropagation();
        this.voileNoir.addEventListener("click", (ev)=>{this.fermerProjet(ev)});
        this.visionnementProjetSortir.addEventListener("click", (ev)=>{this.fermerProjet(ev)});
    }
    fermerProjet(e){
        this.projetOuvert = false;

        // Enlever l'évènement
        this.voileNoir.removeEventListener("click", this.fermerProjet);
        this.visionnementProjetSortir.removeEventListener("click", this.fermerProjet);
        e.stopPropagation();

        // Fermer visuellement
        this.visionnementProjet.style.right = "-100vw";
        this.voileNoir.style.opacity = 0;
        this.voileNoir.style.pointerEvents = "none";
        document.body.style.overflowY = "auto";
        //document.body.style.marginRight = "-0px";
        this.visionnementProjetSortir.style.left = "-18vw";

        // window.scrollBy(0, 25);

        let boites = document.querySelectorAll(".boiteContent");
        // Optimisation pour mobile
        if(this.surMobile == false){
            for(let x = 0; x < boites.length; x++){
                boites[x].style.filter = "blur(0px)";
            }
        }
        for(let x = 0; x < this.nbDivs; x++){
            let imgElm = this.listeDivs[x].querySelector("img");
            imgElm.style.opacity = "1";
            this.listeDivs[x].style.pointerEvents = "all";
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

                    <h1>Massacre à l'auberg-inn</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>

                    <h1>Massacre à l'auberg-inn</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Ils sont les fiers représentants de la lignées des vastayans et ils sont aussi un couple d'amoureux fou, ils se disent souvent qu'ils seront la cause de la mort d'un ou de l'autre, mais les deux s'entendent pour dire qu'ils ne sont pas contre l'idée.</p>
                    </div>

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
            "Générateur de terrain avec OpenGL",
            `
                <div>
                    <h1>Générateur de terrain avec OpenGL</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>J'ai eu, pendant l'été 2018, la chance de travailler avec CREO inc. en tant que programmeur Unity. Le projet sur lequel j'ai travaillé tout au long est la refonte de 'livré par navire' qui est en fait une section d'un jeu multijoueur nommé Science en Jeu. Le jeu cible une audience jeune et est particulièrement développé dans un but éducatif.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_01.png" alt="">
                    <div>
                        <p>Le jeu original est fait en Flash tandis que les 3 mini-jeux de livré par navire sont en Typescript qui se compile en javascript avec la librairie Phaser. Tout d'abord, nous avons décidé de refaire entièrement la partie Flash à l'aide d'Unity en C#, par contre, refaire les jeux qui marchaient déjà aurait été une perte de temps.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_02.png" alt="">
                    <div>
                        <p>Nous avons donc cherché un plugin externe qui nous permet de simuler une page web directement dans Unity, ce qui nous a ensuite permis de faire fonctionner les 3 mini-jeux dans Unity alors qu'ils même qu'ils sont en Javascript. Nous avons eu beaucoup de problèmes de performances et il a aussi fallu permettre à Unity de faire une communication as.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_03.png" alt="">
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_04.png" alt="">
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
            "Livré par Navire",
            `
                <div>
                    <h1>Livré par Navire</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>J'ai eu, pendant l'été 2018, la chance de travailler avec CREO inc. en tant que programmeur Unity. Le projet sur lequel j'ai travaillé tout au long est la refonte de 'livré par navire' qui est en fait une section d'un jeu multijoueur nommé Science en Jeu. Le jeu cible une audience jeune et est particulièrement développé dans un but éducatif.</p>
                    </div>

                    <img src="images/projets/projet${idCompte+1}/p7_01.png" alt="">
                    <div>
                        <p>Le jeu original est fait en Flash tandis que les 3 mini-jeux de livré par navire sont en Typescript qui se compile en javascript avec la librairie Phaser. Tout d'abord, nous avons décidé de refaire entièrement la partie Flash à l'aide d'Unity en C#, par contre, refaire les jeux qui marchaient déjà aurait été une perte de temps.</p>
                    </div>

                    <img src="images/projets/projet${idCompte+1}/p7_02.png" alt="">
                    <div>
                        <p>Nous avons donc cherché un plugin externe qui nous permet de simuler une page web directement dans Unity, ce qui nous a ensuite permis de faire fonctionner les 3 mini-jeux dans Unity alors qu'ils même qu'ils sont en Javascript. Nous avons eu beaucoup de problèmes de performances et il a aussi fallu permettre à Unity de faire une communication asynchrone entre le mini-jeu et Unity afin de transmettre des données à celui-ci. </p>
                    </div>

                    <img src="images/projets/projet${idCompte+1}/p7_03.png" alt="">
                    <div>
                        <p>Bref, ce défi n'a pas été facile, mais j'ai beaucoup appris sur la façon le travail en entreprise en tant que programmeur de jeux et sur mon rôle en tant qu'expert dans mon domaine. Ce jeu est de CREO inc. Vous pouvez présentement le trouver sur l'apple store et sur l'android store en recherchant 'Livré par navire'.</p>
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