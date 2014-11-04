/*
 *  Crée le 26/10/2014
 * 
 *  Version initiale 1.0
 * 
 * 
 */

(function() {

    // Creation du module
    var app = angular.module('collection', []);

    // Controleur
    app.controller('CollectionController', [ '$http',function($http) {
            
        var liste = this;
        this.i = 0;
        
        liste.product = [];
            
        $http.get('http://localhost/WS/Albums/album.php').success(function(data){
            liste.product = data;
            
        });
        
        //======================================================================
        // Fonctions
        this.inc = function(){
            this.i < this.product.length - 1? this.i++ :this.i = 0;
        }; 
     
        this.desc = function(){
            this.i > 0 ? this.i-- :this.i = this.product.length - 1;
        };
        
        this.estFini = function(fini){
            return (fini == 1);
        };
        
        this.estAJour = function(possede,total){
            return (possede == total);
        };
        
        this.addTome = function(tome){
            $http.post('http://localhost/WS/Albums/album.php',{action:'add', titre:tome.titre}).success(function(data){
               console.log(data); 
               tome.possede++;
            }).error(function(){
                liste.error = true;
                liste.error_text = 'Erreur lors de l\'ajout';
            });
        };
        
        //======================================================================
        
    }]);
})();