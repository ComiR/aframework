/**
 * jQuery YoutubeAPI 1.0
 *
 * Replaces any div with a 'youtube-ID-WIDTH-HEIGHT-QUALITY' class with that youtube-clip
 * adds navigation for play/pause as well as loading-progress bar and elapsed time
 * users can 'bookmark' a part of a clip by adding #youtube-ID-START-STOP to url
 * note that browser will not scroll down to clip as it doesn't have that ID
 *
 * Usage: $.youtubeAPI();
 *
 * @class youtubeAPI
 * @param {Object} conf, custom config-object
 *
 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
 */
jQuery.youtubeAPI = function() {
	jQuery('div[class^="youtube-"]').each(function() {
		var div = jQuery(this);
		var classNames = div.attr('class');
		var youtubeClassMatch = /youtube-([^ ]*)/i;
		var classAtts = youtubeClassMatch.exec(classNames)[1].split('-');
		var atts = {
			'id'		: classAtts[0],
			'width'		: classAtts[1] || 640,
			'height'	: classAtts[2] || 480,
			'quality'	: classAtts[3] || 9,
		};

		var time = new Date();
			time = time.getTime() +'-' +Math.floor(Math.random() * 900 + 100);
		var playerID = 'youtube-player-' +time;
		var containerID = 'youtube-player-container-' +time;

		div.html('<div id="' +containerID +'">' +div.html() +'</div>');
		div.addClass('youtube-player');

		swfobject.embedSWF(
		//	'http://www.youtube.com/v/' +atts.id, 
			'http://gdata.youtube.com/apiplayer?key=' 
					+aFramework.googleAPIKey
					+'&enablejsapi=1'
					+'&playerapiid='
					+playerID,
			containerID, 
			atts.width, 
			atts.height, 
			'8', 
			null, 
			null, 
			{allowScriptAccess: 'always', bgcolor: '#ffffff'}, 
			{id: playerID}
		);

		jQuery.onYouTubePlayerReady.players[playerID] = atts;
	});
};

function onYouTubePlayerReady(playerID) {
	jQuery.onYouTubePlayerReady.initGUI(playerID);
}

jQuery.onYouTubePlayerReady = {
	initGUI: function(playerID) {
		var player = document.getElementById(playerID);
		var atts = this.players[playerID];

		// Build the clip-navigation (play/pause/etc)
		var menu = jQuery('<ul></ul>').appendTo(player.parentNode);
		var playButton = jQuery('<li></li>').appendTo(menu).append('<a href="#" class="play">Play/Pause</a>').find('a');
		var stopButton = jQuery('<li></li>').appendTo(menu).append('<a href="#" class="stop">Stop</a>').find('a');
		var muteButton = jQuery('<li></li>').appendTo(menu).append('<a href="#" class="mute">Mute/Unmute</a>').find('a');

		// Cue the video and listen to its different states in...
		player.cueVideoById(atts.id, 0);
		player.addEventListener("onStateChange", "onPlayerStateChange");

		// .. this callback
		var	onPlayerStateChange = function (newState) {
			
		};

		playButton.toggle(function() {
			playButton.addClass('on');
			player.playVideo();
			return false;
		}, 
		function() {
			playButton.removeClass('on');
			player.pauseVideo();
			return false;
		});
	}, 

	players: []
};