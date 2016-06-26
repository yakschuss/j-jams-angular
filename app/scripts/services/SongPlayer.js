(function () {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};


    /**
     * @desc Collection of songs
     * @type {Colletion}
     */

    var currentAlbum = Fixtures.getAlbum();

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as
     * currentBuzzObject
     * @param {Object} song
     */

    var setSong = function(song) {
      if (currentBuzzObject) {
       stopSong(song);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });


      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };

    /**
     * @function playSong
     * @desc Plays the currentBuzzObject, and sets the playing variable to true
     * @param {Object} song
     */

    var playSong = function(song) {
      currentBuzzObject.play();
      SongPlayer.currentSong.playing = true;
    };

    /**
     * @function pauseSong
     * @desc Stops the currentBuzzObject, and sets the playing variable to false
     * @param {Object} song
     */


    var pauseSong = function(song) {
      currentBuzzObject.pause();
      SongPlayer.currentSong.playing = null;
    };


    var stopSong = function(song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /*
     * @function getSongIndex
     * @desc Allows us to get the index of the current song for navigation
     * purposes
     * @param {Object} song
     */

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };


    /**
     * @desc holds currently playing song 
     * @type {Object}
     */

    SongPlayer.currentSong = null;

    /**
     * @desc Current playback time (in seconds) of current playing song
     * @type {Number}
     */

    SongPlayer.currentTime = null;


    /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */

    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };


    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);

      } else if ( SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };


    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      pauseSong(song);
    };


    /*
     * @function SongPlayer.previous
     * @desc decrements songIndex so that current playing song moves down one
     */ 

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(song);


      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /*
     * @function SongPlayer.next
     * @desc increments songIndex so that current playing song moves up one
     */

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > currentAlbum.songs.length) {
        stopSong(song);

      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };

    return SongPlayer;
  }



  angular
    .module('jJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures',  SongPlayer ]);



})();
