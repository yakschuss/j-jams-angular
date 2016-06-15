(function(){
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }


  angular
    .module('jJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
