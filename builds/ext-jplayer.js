/*
* JPlayerSWF
* Singleton instance of the JPlayer Flash Object, because you only need one if you're clever.
*/
/*
@inheritdoc {@link Ext.flash.Component}
*/
Ext.define('Ext.flash.JPlayerSWF',{
	extend: ['Ext.flash.Component'],
	/* alias: ['widget.jplayerswf'] // no alias on a Singleton*/
	singleton: true,
	requires: ['Ext.flash.Component'],
	constructor: function(config){
		return this.callParent(config);	
	}
});


Ext.define('Ext.ux.jplayer', {
	extend: 'Ext.Component',
	alias: ['widget.jplayer'],
	uses: [],
	requires: ['Ext.flash.JPlayerSWF'],
	// singleton: true,
	constructor: function(config){
		console.log('inside ExtJplayer')
        this.initConfig(config);
        console.log('config->', config);

        console.log('Ext.supports',Ext.supports);
        if(Ext.supports.AudioTag){
        	this.requireFlash = false;
        }

        return this.callParent(config);
	},
	pause: function() {
		// 		element.jPlayer("pause");
	}
});

/* 
jPlayer Flash Events that need to be captured: 

		ready: "jPlayer_ready",
		flashreset: "jPlayer_flashreset", // Similar to the ready event if the Flash solution is set to display:none and then shown again or if it's reloaded for another reason by the browser. For example, using CSS position:fixed on Firefox for the full screen feature.
		resize: "jPlayer_resize", // Occurs when the size changes through a full/restore screen operation or if the size/sizeFull options are changed.
		repeat: "jPlayer_repeat", // Occurs when the repeat status changes. Usually through clicks on the repeat button of the interface.
		click: "jPlayer_click", // Occurs when the user clicks on one of the following: poster image, html video, flash video.
		error: "jPlayer_error", // Event error code in event.jPlayer.error.type. See $.jPlayer.error
		warning: "jPlayer_warning", // Event warning code in event.jPlayer.warning.type. See $.jPlayer.warning

		// Other events match HTML5 spec.
		loadstart: "jPlayer_loadstart",
		progress: "jPlayer_progress",
		suspend: "jPlayer_suspend",
		abort: "jPlayer_abort",
		emptied: "jPlayer_emptied",
		stalled: "jPlayer_stalled",
		play: "jPlayer_play",
		pause: "jPlayer_pause",
		loadedmetadata: "jPlayer_loadedmetadata",
		loadeddata: "jPlayer_loadeddata",
		waiting: "jPlayer_waiting",
		playing: "jPlayer_playing",
		canplay: "jPlayer_canplay",
		canplaythrough: "jPlayer_canplaythrough",
		seeking: "jPlayer_seeking",
		seeked: "jPlayer_seeked",
		timeupdate: "jPlayer_timeupdate",
		ended: "jPlayer_ended",
		ratechange: "jPlayer_ratechange",
		durationchange: "jPlayer_durationchange",
		volumechange: "jPlayer_volumechange"

htmlEvent = [ // These HTML events are bubbled through to the jPlayer event, without any internal action.
		"loadstart",
		// "progress", // jPlayer uses internally before bubbling.
		// "suspend", // jPlayer uses internally before bubbling.
		"abort",
		// "error", // jPlayer uses internally before bubbling.
		"emptied",
		"stalled",
		// "play", // jPlayer uses internally before bubbling.
		// "pause", // jPlayer uses internally before bubbling.
		"loadedmetadata",
		"loadeddata",
		// "waiting", // jPlayer uses internally before bubbling.
		// "playing", // jPlayer uses internally before bubbling.
		"canplay",
		"canplaythrough",
		// "seeking", // jPlayer uses internally before bubbling.
		// "seeked", // jPlayer uses internally before bubbling.
		// "timeupdate", // jPlayer uses internally before bubbling.
		// "ended", // jPlayer uses internally before bubbling.
		"ratechange"
		// "durationchange" // jPlayer uses internally before bubbling.
		// "volumechange" // jPlayer uses internally before bubbling.
	]; */
