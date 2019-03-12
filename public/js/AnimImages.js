import {Utils} from './Utils.js';
/* 
*  Classe qui s'occupe de gérer l'apparition des images au fur et a mesure que
*  l'utilisateur navigue vers les bas de la page.
*/
export class AnimImages{
    constructor(parentImages){
        this.parentImages = parentImages;
        this.divsProjets = this.parentImages.querySelectorAll(".boiteProjet");
        /* 
         Pour utiliser le .bind(this), il faut storer la fonction dans une variable
         pour ensuite pouvoir utiliser removeEventListener qui doit prendre la même fonction.
        */
        this.c_callback = this.scrollCallback.bind(this);
        this.ecouterScrollY();
        // Se déclenche une fois au début pour faire apparaitre les projets qui devraient déjà être visible
        this.scrollCallback();
    }
    ecouterScrollY(){
        for(var x = 0; x < this.divsProjets.length; x++){
            this.divsProjets[x].animJouer = false;
        }
        document.addEventListener('scroll', this.c_callback);
    }
    scrollCallback(){
        let animationFinie = true;
        let scrollY = Utils.getScrollY();
        for(var x = 0; x < this.divsProjets.length; x++){
            let img = this.divsProjets[x].querySelector("img");
            if(this.divsProjets[x].animJouer == false){
                animationFinie = false;
                // Le décalage est plus grand pour la version mobile pour que toute les images puisse apparaitres
                let decalageY = (!Utils.mediaMatch(540)) ? img.height + 360 : img.height + 350;
                // Le décalage est moin grand en plein écran
                if(Utils.mediaMatch(1025))
                    decalageY = 380;
                if(scrollY > img.offsetTop - decalageY){
                    this.animerImage(this.divsProjets[x]);
                }
            }
        }
        if(animationFinie)
            this.enleverEcouteur();
    }
    enleverEcouteur(){
        document.removeEventListener('scroll', this.c_callback);
    }
    animerImage(image){
        image.classList.add("animImage");
        image.animJouer = true;
    }
}