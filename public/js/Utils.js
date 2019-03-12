export class Utils{
    constructor(){
        this.settings = {
            hideLogs: false
        }
    }
    static random(min, max){
        if(min >= 0)
            return Math.floor(min+Math.random()*max)
        else
            return Math.floor(min+Math.random()*max) * (random(1,2)==1) ? -1 : 1;
    }
    static getScrollY(){
        return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
    static mediaMatch(largeurMin){
        return window.matchMedia("(min-width: "+largeurMin+"px)").matches;
    }
}