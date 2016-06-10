(function(){
  function AlbumCtrl() {
    this.albumData = angular.copy(albumPicasso);
  }


  angular
    .module('jJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
