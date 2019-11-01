
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
        this.visionnementImage = document.querySelector(".visionnementImage");
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
            if(true){ //div.getAttribute("data-reader-type") != "image"
                div.addEventListener("click", (e)=>{this.ouvrirProjet(e, div);});
            }else{
                div.addEventListener("click", (e)=>{this.ouvrirImage(e, div);});
            }
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

        // Gérer l'apparition du contenu dans la page de visionnement
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
    ouvrirImage(e, div){
        console.log("Ouvrir visionneuse image");

        let imageDiv = this.visionnementImage.getElementsByTagName('div')[0];

        this.visionnementImage.style.pointerEvents = "default";
        imageDiv.style.pointerEvents = "default";
        imageDiv.style.opacity = '1.0';

        // Ouvrir visuellement
        this.voileNoir.style.opacity = 0.9;
        this.voileNoir.style.pointerEvents = "all";
        document.body.style.overflowY = "hidden";
        // Règle un problème d'affichage avec le footer qui se place devant le visionneur
        this.footer.style.zIndex = "-2";

        this.visionnementImage.addEventListener("click", (ev)=>{this.fermerImage(ev)});

    }
    fermerImage(e, div){
        console.log("Fermer visionneuse image");

        this.visionnementImage.style.pointerEvents = "none";
        imageDiv.style.pointerEvents = "none";
        imageDiv.style.opacity = '0.0';

        // Fermer visuellement
        this.visionnementProjet.style.right = "-100vw";
        this.voileNoir.style.opacity = 0;
        this.voileNoir.style.pointerEvents = "none";
        document.body.style.overflowY = "auto";
        
        // Règle un problème d'affichage avec le footer qui se place devant le visionneur
        setTimeout(() => {
            this.footer.style.zIndex = "0";
        }, 800);

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
                        <p>Ceci est mon projet de fin d'études en Techniques d'intégrations multimédia. J'ai créé un prototype qui produit un terrain généré de manière procédurale à l’aide de technologies qui n’ont jamais été vue dans ma technique.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_01.png" alt="">
                    <div>
                        <p>L’utilisateur peut contrôler une caméra pour se déplacer et visualiser la génération du terrain. Il a également le choix de personnaliser la génération du terrain. </p>
                    </div>
                    <div>
                        <p>Mon but était de montrer que je suis capable de programmer l’affichage de graphiques sans support autre qu’OpenGL et LWJGL qui sont de bien plus bas niveau que Unity qui offre déjà le rendu d’objets 3D, de textures, d’effets visuels complexes et plus.</p>
                    </div>
                    <img src="images/projets/projet${idCompte+1}/p${idCompte+1}_02.png" alt="">
                    <div>
                        <p>J'ai suivi beaucoup de tutoriels différents pour arriver à ce résultat dont <a href="https://www.youtube.com/user/ThinMatrix">ThinMatrix</a> qui est la source principale de mes sources. J'ai vraiment beaucoup appris dans la façon dont un projet doit être structuré en Java de façon orienté objet.</p>
                    </div>
                    <div>
                        <p>Par exemple, il y a la classe Entity qui s'occupe du rendu de celui-ci en appelant des méthodes du moteur de rendu qui est lui aussi divisé en plusieurs classes. Toutes mes classes sont encapsulées pour empêcher le programmeur de devoir comprendre tout ce qui se passe en arrière.</p>
                    </div>
                    <div>
                        <p>Ce que je trouve le plus intéressant avec mon projet, c'est aussi qu'il est presque modulaire dans le sens où je peux le reprendre et l'utiliser comme un moteur de jeu personnalisé.</p>
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
                        <p>Voici un jeu que j'ai créé avec Unity dans mes temps libres. Vous avez volé la première copie d'un jeu tant attendu par les fans, Half-Life 3! Vous vous êtes ainsi mis toute la terre à dos! Vous décidez donc de vous réfugier dans le château de votre défunt oncle afin défendre chèrement votre peau!</p>
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
                        <p>Deadly Nightmare est le résultat d'un Travail Pratique dans le cours de programmation d'animation 2 en Techniques d'intégration multimédia. Le jeu est fait avec Unity et C#. J'ai programmé la majorité des fonctionnalitées et mon collègue s'est occupé de l'architecture du niveau et de la modélisation.</p>
                    </div>
                    <div>
                        <p>Mon but en produisant ce jeu était de voir si j'était capable de programmer une système de fusils dynamiques et amusant. Je crois avoir bien réussi le défi, car quand je joue à Deadly Nightmare, j'ai l'impression de jouer à un Call of Duty en mode Zombie.</p>
                    </div>
                    <div>
                        <p>J'ai aussi programmé un système de difficulté pour l'apparition des zombies, l'interaction avec les portes, l'achat des armes et aussi le démembrement des zombies.</p>
                    </di>
                    <div>
                        <p>Bref, ce jeu m'a surtout fait comprendre ce que je pouvais faire sur Unity en 3D et ce fût une expérience enrichissante pour apprendre de mes erreurs.</p>
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
                        <p>Gladiatorio est un jeu que j'ai développé dans mes temps libres en Phaser avec NodeJS, Socket.io et Express. Le jeu est plus un prototype qu'autre chose, il contient plusieurs bugs et le code est mal écrit. Cependant je suis fier d'avoir réussi à programmer un tel jeu par mes propres moyens.</p>
                    </div>
                    <div>
                        <p>C'est également grace à ce projet que j'ai appris à mettre en ligne une application NodeJS à l'aide d'Herokuapp.com. Vous pouvez y jouer ici si vous êtes au moins deux personne: <a href=http://gladiatorio.fun>gladiatorio.fun</a>. Avec les touches 1-2-3 vous pouvez changer d'arme et vous pouvez frapper les autres joueurs avec la souris.</p>
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
                        <p>Woodie est un jeu sur l'Apple store et je me suis demandé un jour si je pourrais le refaire en Javascript sans librairies. C'est donc ce que j'ai fait durant une fin de semaine. J'ai aussi réussi à le rendre utilisable en version mobile. Le but est de survivre le plus longtemps possible en fesant éclater des colonnes et des rangées de pièces.</p>
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
                        <p>Nous avons donc cherché un plugin externe qui nous permet de simuler une page web directement dans Unity, ce qui nous a ensuite permis de faire fonctionner les 3 mini-jeux dans Unity alors même qu'ils étaient en Javascript. Nous avons eu beaucoup de problèmes de performances et il a aussi fallu permettre à Unity de faire une communication asynchrone avec les mini-jeu afin de transmettre des données. </p>
                    </div>

                    <img src="images/projets/projet${idCompte+1}/p7_03.png" alt="">
                    <div>
                        <p>Bref, ce défi n'a pas été facile, mais j'ai beaucoup appris sur le travail en entreprise en tant que programmeur de jeux et sur mon rôle en tant qu'expert dans mon domaine. Ce jeu est de CREO inc. Vous pouvez présentement le trouver sur l'apple store et sur l'android store en recherchant 'Livré par navire'.</p>
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
                        <p>Un matte painting réalisé durant mon premier cours de photoshop à l'aide de pinceaux.</p>
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
                        <p>Un matte painting réalisé pour le plaisir de créer un simple contraste d'éclairage.</p>
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
                        <p>Concept d'un jeu effectué dans mes temps libres. Le joueur doit gérer son entreprise qui commence avec une alien venu de l'espace afin de faire fortune. Il commence son aventure en tant que classique vendeur de limonade, mais qui sait jusqu'où il ira pour continuer de s'enrichir...</p>
                    </div>
                </div>
            `,
            "apercuProjet"+idCompte+".png"
        ));
    }
}