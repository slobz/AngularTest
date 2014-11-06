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
    app.controller('CollectionController', ['$http', function($http) {

            var liste = this;
            this.i = 0;

            liste.product = [];

            $http.get('http://localhost/WS/Albums/album.php').success(function(data) {
                liste.product = data;

            });

            //======================================================================
            // Fonctions
            this.inc = function() {
                this.i < this.product.length - 1 ? this.i++ : this.i = 0;
            };

            this.desc = function() {
                this.i > 0 ? this.i-- : this.i = this.product.length - 1;
            };

            this.estFini = function(fini) {
                return fini === 1;
            };

            this.estAJour = function(possede, total) {
                return possede == total;
            };
            
            this.estVide = function(nbrTome){
                return nbrTome === 0;
            };
            
            this.unTome = function(nbrTome){
                return nbrTome == 1;
            };

            //======================================================================

        }]);

    // Controleur des tab
    app.controller('PanelController', function() {

        this.tab = 1;

        this.selectTab = function(setTab) {
            this.tab = setTab;
        };

        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        };


    });

    // Controleur des paramètres
    app.controller('ParameterController',['$http', function($http) {

        var URL = 'http://localhost/WS/Albums/album.php';

        this.addTomePossede = function(tome) {
            $http.post(URL, {action: 'addPossede', titre: tome.titre}).success(function(data) {
                console.log(data);
                tome.possede++;
            }).error(function() {
                liste.error = true;
                liste.error_text = 'Erreur lors de l\'ajout';
            });
        };
        
        
        this.addTome = function(tome) {
            $http.post(URL, {action: 'add', titre: tome.titre}).success(function(data) {
                console.log(data);
                tome.total++;
            }).error(function() {
                liste.error = true;
                liste.error_text = 'Erreur lors de l\'ajout';
            });
        };
        
        this.removeTomePossede = function(tome) {
            $http.post(URL, {action: 'removePossede', titre: tome.titre}).success(function(data) {
                console.log(data);
                tome.possede--;
            }).error(function() {
                liste.error = true;
                liste.error_text = 'Erreur lors du retrait';
            });
        };
        
        this.removeTome = function(tome) {
            $http.post(URL, {action: 'remove', titre: tome.titre}).success(function(data) {
                console.log(data);
                
                if(tome.possede === tome.total)
                    tome.possede--;
                
                tome.total--;
            }).error(function() {
                liste.error = true;
                liste.error_text = 'Erreur lors du retrait';
            });
        };
        
    }]);


})();