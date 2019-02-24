/**
 * S'occupe de la partie socket.io du site
 */
export class SocketManager {
    constructor(){
        if(typeof io == "undefined"){
            console.log("Pas de connexion au serveur.");
            return;
        }
        this.socket = io();
        this.socket.on("connectionClient", data => this.connectionClient(data));
        this.socket.on("deconnectionClient", data => this.deconnectionClient(data));
    }
    connectionClient (data){
        console.log(data.id + " est connecté!");
    }
    deconnectionClient(data){
        console.log(data.id + " s'est déconnecté!");
    }
}