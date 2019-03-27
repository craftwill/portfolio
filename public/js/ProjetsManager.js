
/*
* William Gingras
* 2019/03/27
* Classe qui Gère l'ouverture du menu de visionnement des projets et l'affichage du contenu de ces projets
*/

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
        this.boitesContents = document.querySelectorAll(".boiteContent");
        this.footer = document.querySelector("footer");
        this.nbDivs = this.listeDivs.length;
        // Donne les évènements à chaque projet
        for(let x = 0; x < this.nbDivs; x++){
            let div = this.listeDivs[x];
            div.setAttribute("data-id", (x+1));
            div.classList.add("p" + (x+1));
            div.addEventListener("click", (e)=>{this.ouvrirProjet(e, div);});
        }
        this.initialisationProjets();
        // Injection de style css pour arranger un problème d'espacement lié au visionneur de projet en mobile
        if(this.surMobile){
            var node = document.createElement("style");
            node.innerHTML = `
                .content > .visionnementProjet > div:nth-child(1) > div:last-child {
                    margin-bottom: 45vh;
                }
            `;
            document.body.appendChild(node);
        }
    }
    // Ouvre le projet spécifié
    ouvrirProjet(e, div){
        this.projetOuvert = !this.projetOuvert;

        //div.parentElement.parentElement.scrollTo(0, 0);
        this.visionnementProjet.scrollTo(0,0);

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
        // Règle un problème d'affichage avec le footer qui se place devant le visionneur
        this.footer.style.zIndex = "-2";
        //document.body.style.marginRight = "30px";
        this.visionnementProjetSortir.style.left = "0vw";

        // Optimisation pour mobile, flou des boiteContent
        let nbBoites = this.boitesContents.length;
        if(this.surMobile == false){
            for(let x = 0; x < nbBoites; x++){
                this.boitesContents[x].style.filter = "blur(2px)";
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
    // Ferme le visionneur de projet et rétablit la page à son état normal
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
        
        // Règle un problème d'affichage avec le footer qui se place devant le visionneur
        setTimeout(() => {
            this.footer.style.zIndex = "0";
        }, 800);

        //document.body.style.marginRight = "-0px";
        this.visionnementProjetSortir.style.left = "-18vw";

        // window.scrollBy(0, 25);

        let nbBoites = this.boitesContents.length;
        // Optimisation pour mobile, flou des boiteContent
        if(this.surMobile == false){
            for(let x = 0; x < nbBoites; x++){
                this.boitesContents[x].style.filter = "blur(0px)";
            }
        }
        for(let x = 0; x < this.nbDivs; x++){
            let imgElm = this.listeDivs[x].querySelector("img");
            imgElm.style.opacity = "1";
            this.listeDivs[x].style.pointerEvents = "all";
        }
    }
    // Retourne un projet par son identifiant
    getProjetParID(id){
        return this.listeProjets.find((p)=>{return (p.id == id)});
    }
    // Initialise les données des projets un peu comme du JSON
    initialisationProjets(){
        // Projet 01
        this.listeProjets.push(new Projet(
            "Massacre à l'auberg-inn",
            `
                <div>
                    <h1>Massacre à l'auberg-inn</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Massacre à l'Auberg-inn est un jeu auquel j'ai participé à l'idéation, à l'intégration et surtout à la programmation. Nous étions une équipe de 7 lors du Gamejam de Valleyfield en janvier 2019 et nous avons fini en 2ème place parmi 14 équipes ce qui nous à octroyé un prix de 750$.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_01.jpg" alt="">
                    <div>
                        <p>Pour résumer, c'est un jeu de combat de style beat em' up où le joueur incarne un soulons qui veux continuer à boire tandis que les gens autour de lui tente de le calmer.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_02.jpg" alt="">
                    <div>
                        <p>S'ensuit ensuite un combat sanglant par vagues où il est possible de rammasser des armes et où il faut continuellement boire pour rester en vie. De plus, si le joueur boit trop, il se met à vomir et il est ainsi paralysé pendant quelques secondes.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_03.jpg" alt="">
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_05.jpg" alt="">
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_04.jpg" alt="">
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
            "Défends ton château!",
            `
                <div>
                    <h1>Défends ton château!</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Voici un jeu que j'ai créé avec Unity dans mes temps libres. Vous avez volé la première copie d'Half-Life 3, mais en faisant cela, vous vous êtes mis toute la terre à dos! Vous décidez donc de vous réfugier dans un château de votre défunt oncle pour défendre votre peau.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_01.png" alt="">
                    <div>
                        <p>Défendez votre château afin de survivre aux vagues d'ennemis de plus en plus nombreux, rapides et forts à l'aide de vos pouvoirs et de votre souris qui vous permet de tuer les ennemis en les envoyant en l'air pour qu'ils s'écrasent ensuite violemment au sol!</p>
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
                        <p>Deadly Nightmare est le résultat de mon Travail Pratique dans le cours de programmation d'animation l'en Techniques d'intégration multimédia. Le jeu est fait avec Unity et j'ai programmé la majorité des fonctionnalités tandis que mon collègue s'est occupé de l'architecture du niveau et de la modélisation.</p>
                    </div>
                    <div>
                        <p>L'idée de faire un tel jeu m'a traversé l'esprit surtout pour tester mes compétences en programmation. Ainsi, j'ai réussi à intégrer environs 11 fusils qui ont chacun leur propre modèle de recul et d'animation de recharge.</p>
                    </div>
                    <div>
                        <p>J'ai aussi compris comment programmer un système de difficulté pour l'apparition des zombies, l'interaction avec les portes et l'achat d'armes sur les murs et aussi le démembrement des zombies avec le tir des fusils.</p>
                    </di>
                    <div>
                        <p>Bref, ce jeu m'a surtout fait comprendre ce que je pouvais faire sur Unity en 3D à l'aide de la programmation et ce fût une expérience enrichissante pour apprendre de mes erreurs.</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
        // Projet 05
        this.listeProjets.push(new Projet(
            "Gladiatorio.fun",
            `
                <div>
                    <h1>Gladiatorio.fun</h1>
                    <img src="images/projets/apercuProjet${idCompte+1}.png" alt="">
                    <div>
                        <p>Gladiatorio fun est un jeu que j'ai développé dans mes temps libres en Phaser avec Node Js, Socket.io et Express. Le jeu est plus un prototype qu'autre chose, il contient plusieurs bugs et le code est mal écrit. Cependant je suis fier d'avoir réussi à programmer un tel jeu par mes propres moyens.</p>
                    </div>
                    <div>
                        <p>C'est également grace à ce projet que j'ai appris à mettre en ligne une application NodeJS à l'aide de Heroku.com. Vous pouvez y jouer ici si vous êtes au moins deux personne: <a href=http://gladiatorio.fun>gladiatorio.fun</a>. Avec les touches 1-2-3 vous pouvez changer d'arme et vous pouvez frapper les autres joueurs avec la souris.</p>
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
                        <p>Woodie est un jeu sur l'Apple store et je me suis demandé un jour si je pourrais le refaire en Javascript sans librairies. C'est donc ce que j'ai fait en 2 jours pendant une fin de semaine et j'ai même réussi à le rendre utilisable en version mobile. Le but est de survivre le plus longtemps possible en fesant éclater des colonnes et des rangées de pièces.</p>
                    </div>
                    <div>
                        <p>Vous pouvez y jouer ici: <a href="http://woodie-remake.herokuapp.com/">woodie clone</a></p>
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
        /*this.listeProjets.push(new Projet(
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
        ));*/
    }
}