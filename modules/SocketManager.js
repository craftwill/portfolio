module.exports = {
    s: null,  // Socket
    connectionClient: function(p_socket){
        this.s = p_socket;
        console.log('connectionClient: ' + this.s.id);
        this.s.emit('connectionClient', {id: this.s.id});
        this.initialisationEcouteurs();
    },
    // c'est ici que le socket voit ses évènements être initialisés
    initialisationEcouteurs: function(){
        // Déconnection
        this.s.on('disconnect', ()=>{
            this.deconnectionClient();
        });
    },
    deconnectionClient: function(){
        this.s.emit('deconnectionClient', {id: this.s.id});
        console.log('deconnectionClient: ' + this.s.id);
    }
}