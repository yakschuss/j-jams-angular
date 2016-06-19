(function () {
  function SongPlayer() {
      var SongPlayer = {};
      
    /**
     * @desc holds currently playing song 
     * @type {Object}
     */

    var currentSong = null;

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
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

    /**
     * @function playSong
     * @desc Plays the currentBuzzObject, and sets the playing variable to true
     * @param {Object} song
     */

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    
    /**
     * @function stopSong
     * @desc Stops the currentBuzzObject, and sets the playing variable to false
     * @param {Object} song
     */


    var stopSong = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };




    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);

      } else if ( currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };


    SongPlayer.pause = function(song) {
      stopSong(song);
    };

    return SongPlayer;
  }



  angular
    .module('jJams')
    .factory('SongPlayer', SongPlayer);



})();
