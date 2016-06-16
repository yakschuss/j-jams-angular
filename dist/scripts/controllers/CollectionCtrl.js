(function () {
  function CollectionCtrl(Fixtures){
   this.albums = Fixtures.getCollection(12); 
  }


  angular
    .module('jJams')
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);

})();
    
