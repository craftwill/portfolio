export class Utils{
    constructor(){
        this.settings = {
            hideLogs: false
        }
    }
    static random(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        if(min >= 0)
            return Math.floor(Math.random() * (max - min)) + min;
        else
            return Math.floor(Math.random() * (max - min)) + min * (random(1,2)==1) ? -1 : 1;
    }
    static getScrollY(){
        return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
    static mediaMatch(largeurMin){
        return window.matchMedia("(min-width: "+largeurMin+"px)").matches;
    }
}