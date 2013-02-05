/*
* @docauthor Steve Hatherley
* @inheritdoc {@link Ext.flash.Component}
*
* The JPlayerSWF component is specialized singleton which manages an instance of an {@link Ext.flash.Component}
* with event hooks and utility methods for the JPlayer Flash Object and it's API, version 2.0.2.
* 
*/
Ext.define('Ext.ux.JPlayerSWF',{
	extend: 'Ext.flash.Component',
	alias: ['widget.jplayerswf'],
	requires: ['Ext.flash.Component'],
	url: 'Jplayer.swf',
        media : {},
        wmode: 'window',
        flashParams: {
            allowScriptAccess: 'always'
        }, 
	initComponent: function(config){ 

            this.callParent(config);	
            
	},
    afterRender: function(){
        var me = this,
            flashParams = Ext.apply({}, me.flashParams), 
            flashVars = Ext.apply({}, me.flashVars);

        me.callParent();

        flashParams = Ext.apply({
            allowScriptAccess: 'always',
            bgcolor: me.backgroundColor,
            wmode: me.wmode
        }, flashParams);

        flashVars = Ext.apply({
            allowedDomain: document.location.hostname
        }, flashVars);

        new swfobject.embedSWF(
            me.url,
            me.getSwfId(),
            me.swfWidth,
            me.swfHeight,
            me.flashVersion,
            me.expressInstall ? me.statics.EXPRESS_INSTALL_URL : undefined,
            flashVars,
            flashParams,
            me.flashAttributes,
            Ext.bind(me.swfCallback, me)
        );            
    },
    listeners: {
        afterRender: function(t){
            console.log('afterRender t', t);
            console.log(this);
            console.log('this.swf',this.swf);
            console.log(document.getElementById(this.swfId));
            console.log('swfobject.getObjectById(this.swfId)',swfobject.getObjectById(this.swfId));
            var test = swfobject.getObjectById(this.swfId);
                //test.trigger();
           // document.getElementById(this.swfId).setFile("http://www.jplayer.org/audio/m4a/TSP-01-Cro_magnon_man.m4a");
            //this.swf.setFile();
            //this.swf.play();
        }
    }
}, function(){
	Ext.apply(this.prototype, {

    });
});
Ext.define('Ext.ux.jPlayer', {
    extend: 'Ext.Component',
    alternateClassName: 'jPlayer',    
    alias: ['widget.jplayer'],
    requires: ['Ext.ux.JPlayerSWF'],
    timeFormat: {
        showHour: false,
        showMin: true,
        showSec: true,
        padHour: false,
        padMin: true,
        padSec: true,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    },
    /**
    * @cfg {string} solution 
    * Defines which solutions to attempt to use. Valid solutions: html, flash. Order defines priority, 1st is highest
    */
    solution: "html, flash",
    supplied: "mp3", // Defines which formats jPlayer will try and support and the priority by the order. 1st is highest,
    preload: 'metadata',  // HTML5 Spec values: none, metadata, auto.
    volume: 0.8, // The volume. Number 0 to 1.
    muted: false,
    wmode: "opaque", // Valid wmode: window, transparent, opaque, direct, gpu. 
    backgroundColor: "#000000", // To define the jPlayer div and Flash background color.
    cssSelectorAncestor: "#jp_container_1",
    cssSelector: { // * denotes properties that should only be required when video media type required. _cssSelector() would require changes to enable splitting these into Audio and Video defaults.
        videoPlay: ".jp-video-play", // *
        play: ".jp-play",
        pause: ".jp-pause",
        stop: ".jp-stop",
        seekBar: ".jp-seek-bar",
        playBar: ".jp-play-bar",
        mute: ".jp-mute",
        unmute: ".jp-unmute",
        volumeBar: ".jp-volume-bar",
        volumeBarValue: ".jp-volume-bar-value",
        volumeMax: ".jp-volume-max",
        currentTime: ".jp-current-time",
        duration: ".jp-duration",
        fullScreen: ".jp-full-screen", // *
        restoreScreen: ".jp-restore-screen", // *
        repeat: ".jp-repeat",
        repeatOff: ".jp-repeat-off",
        gui: ".jp-gui", // The interface used with autohide feature.
        noSolution: ".jp-no-solution" // For error feedback when jPlayer cannot find a solution.
    },
    fullScreen: false,
    autohide: {
        restored: false, // Controls the interface autohide feature.
        full: true, // Controls the interface autohide feature.
        fadeIn: 200, // Milliseconds. The period of the fadeIn anim.
        fadeOut: 600, // Milliseconds. The period of the fadeOut anim.
        hold: 1000 // Milliseconds. The period of the pause before autohide beings.
    },
    loop: false,
    repeat: function(event) { // The default jPlayer repeat event handler
        if(event.jPlayer.options.loop) {
            // $(this).unbind(".jPlayerRepeat").bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
                // $(this).jPlayer("play");
            // });
        } else {
            // $(this).unbind(".jPlayerRepeat");
        }
    },
    nativeVideoControls: {
        // Works well on standard browsers.
        // Phone and tablet browsers can have problems with the controls disappearing.
    },
    noFullScreen: { // RegEx for feature matching.
        msie: /msie [0-6]/,
        ipad: /ipad.*?os [0-4]/,
        iphone: /iphone/,
        ipod: /ipod/,
        android_pad: /android [0-3](?!.*?mobile)/,
        android_phone: /android.*?mobile/,
        blackberry: /blackberry/,
        windows_ce: /windows ce/,
        webos: /webos/
    },
    noVolume: {
        ipad: /ipad/,
        iphone: /iphone/,
        ipod: /ipod/,
        android_pad: /android(?!.*?mobile)/,
        android_phone: /android.*?mobile/,
        blackberry: /blackberry/,
        windows_ce: /windows ce/,
        webos: /webos/,
        playbook: /playbook/
    },
    verticalVolume: false, // Calculate volume from the bottom of the volume bar. Default is from the left. Also volume affects either width or height.
    // globalVolume: false, // Not implemented: Set to make volume changes affect all jPlayer instances
    // globalMute: false, // Not implemented: Set to make mute changes affect all jPlayer instances
    idPrefix: "jp", // Prefix for the ids of html elements created by jPlayer. For flash, this must not include characters: . - + * / \
    noConflict: "jQuery",
    emulateHtml: false, // Emulates the HTML5 Media element on the jPlayer element.
    errorAlerts: false,
    warningAlerts: false,
    media: undefined,
    formats: [],
    require: {
        audio: false,
        video: false
    },
    status: {

    },
    constructor: function(config){
        var self = jPlayer;
        console.log('inside ExtjPlayer')

        Ext.apply(this, config);

        this.initConfig(config);
        console.log('config->', config);
        
        // Create the formats array, with prority based on the order of the supplied formats string
        if( !Ext.isArray(this.supplied) ){
            this.supplied = this.supplied.toLowerCase().split(",");
        }
        Ext.each(this.supplied, function(value1, index1) {
            var format = value1.replace(/^\s+|\s+$/g, ""); //trim
            if(self.format[format]) { // Check format is valid.
                var dupFound = false;
                Ext.each(self.formats, function( value2, index2 ) { // Check for duplicates
                    if(format === value2) {
                        dupFound = true;
                        return false;
                    }
                });
                if(!dupFound) {
                    self.formats.push(format);
                }
            }
        }, this);
        console.log('self.formats after iteration through supplied', self.formats);

        // Create the solutions array, with prority based on the order of the solution string
        if( !Ext.isArray(this.solution)){
            this.solution = this.solution.toLowerCase().split(",");
        }
        Ext.each(this.solution, function(value1, index1) {
            var solution = value1.replace(/^\s+|\s+$/g, ""); //trim
            if(self.solution[solution]) { // Check solution is valid.
                var dupFound = false;
                Ext.each(self.solutions, function(value2, index2) { // Check for duplicates
                    if(solution === value2) {
                        dupFound = true;
                        return false;
                    }
                });
                if(!dupFound) {
                    self.solutions.push(solution);
                }
            }
        },this);
        console.log('self.solutions after iteration through supplied', self.solutions);

        /********
        * code from jQuery version that isn't in use because
        *    1.) not sure its needed
        *    2.) Ext does most of this automatically
        *
        * left in place for reference in case of future errors
        */
        /*
        this.internal.instance = "jp_" + this.count;
        this.instances[this.internal.instance] = this.element;

        // Check the jPlayer div has an id and create one if required. Important for Flash to know the unique id for comms.
        if(!this.element.attr("id")) {
            this.element.attr("id", this.options.idPrefix + "_jPlayer_" + this.count);
        }

        this.internal.self = $.extend({}, {
            id: this.element.attr("id"),
            jq: this.element
        });
        this.internal.audio = $.extend({}, {
            id: this.options.idPrefix + "_audio_" + this.count,
            jq: undefined
        });
        this.internal.video = $.extend({}, {
            id: this.options.idPrefix + "_video_" + this.count,
            jq: undefined
        });
        this.internal.flash = $.extend({}, {
            id: this.options.idPrefix + "_flash_" + this.count,
            jq: undefined,
            swf: this.options.swfPath + (this.options.swfPath.toLowerCase().slice(-4) !== ".swf" ? (this.options.swfPath && this.options.swfPath.slice(-1) !== "/" ? "/" : "") + "jPlayer.swf" : "")
        });
        this.internal.poster = $.extend({}, {
            id: this.options.idPrefix + "_poster_" + this.count,
            jq: undefined
        });
        *******
        * End of unused Code!
        *******/

        // Register listeners defined in the constructor
        console.log('jPlayer.event',jPlayer.event);
        /**
        *   This isn't right. Re-do using this.addEvents(...)
        **/
        // Ext.each(jPlayer.event, function(eventType, eventName) {
        //     if(self.options[eventName] !== undefined) {
        //         self.element.bind(eventType + ".jPlayer", self.options[eventName]); // With .jPlayer namespace.
        //         self.options[eventName] = undefined; // Destroy the handler pointer copy on the options. Reason, events can be added/removed in other ways so this could be obsolete and misleading.
        //     }
        // },this);        

        // Determine if we require solutions for audio, video or both media types.
        console.log('self.formats',self.formats);
        Ext.each(self.formats, function(format, priority) {
            this.require[self.format[format].media] = true;
        }, this);
        console.log('this.require',this.require);
        
        // Now required types are known, finish the options default settings.
        if(this.require.video) {
            Ext.apply(this, (Ext.isDefined(config.optionsVideo) ? config.optionsVideo : self.optionsVideo));
        } else {
            Ext.apply(this, (Ext.isDefined(config.optionsAudio) ? config.optionsAudio : self.optionsAudio));            
        }
        console.log('this.size, this.sizeFull',this.size, this.sizeFull);

        // Determine the status for Blocklisted options.
        this.status.nativeVideoControls = self._uaBlocklist(this.nativeVideoControls);
        this.status.noFullScreen = self._uaBlocklist(this.noFullScreen);
        this.status.noVolume = self._uaBlocklist(this.noVolume);
        console.log('this.status', this.status);



        console.log('Ext.supports',Ext.supports);
        if(Ext.supports.AudioTag){
                this.requireFlash = false;
        }

        console.log('ending this in jPlayer, before callParent ',this);
        return this.callParent(config);
    },
    pause: function() {
            // 		element.jPlayer("pause");
    },
    convertTime: function(s) {
		var myTime = new Date(s * 1000);
		var hour = myTime.getUTCHours();
		var min = myTime.getUTCMinutes();
		var sec = myTime.getUTCSeconds();
		var strHour = (this.timeFormat.padHour && hour < 10) ? "0" + hour : hour;
		var strMin = (this.timeFormat.padMin && min < 10) ? "0" + min : min;
		var strSec = (this.timeFormat.padSec && sec < 10) ? "0" + sec : sec;
		return ((this.timeFormat.showHour) ? strHour + this.timeFormat.sepHour : "") + ((this.timeFormat.showMin) ? strMin + this.timeFormat.sepMin : "") + ((this.timeFormat.showSec) ? strSec + this.timeFormat.sepSec : "");
    },
    _limitValue: function(value, min, max) {
        return (value < min) ? min : ((value > max) ? max : value);
    },
    statics: {
        count: 0,
        version: { 
            script: "2.2.0",
            needFlash: "2.2.0",
            flash: "unknown"
        },
        solutions: [],  // Defines the solutions we're going to use based on browser compatibility
        solution: { // Static Object: Defines the solutions built in jPlayer.
            html: true,
            flash: true
        },
        
        formats: [], // What formats can support across all instances, based on browser compatibility
        // 'MPEG-4 support' : canPlayType('video/mp4; codecs="mp4v.20.8"')
        format: { // Static Object
            mp3: {
                codec: 'audio/mpeg; codecs="mp3"',
                flashCanPlay: true,
                media: 'audio'
            },
            m4a: { // AAC / MP4
                codec: 'audio/mp4; codecs="mp4a.40.2"',
                flashCanPlay: true,
                media: 'audio'
            },
            oga: { // OGG
                codec: 'audio/ogg; codecs="vorbis"',
                flashCanPlay: false,
                media: 'audio'
            },
            wav: { // PCM
                codec: 'audio/wav; codecs="1"',
                flashCanPlay: false,
                media: 'audio'
            },
            webma: { // WEBM
                codec: 'audio/webm; codecs="vorbis"',
                flashCanPlay: false,
                media: 'audio'
            },
            fla: { // FLV / F4A
                codec: 'audio/x-flv',
                flashCanPlay: true,
                media: 'audio'
            },
            rtmpa: { // RTMP AUDIO
                codec: 'audio/rtmp; codecs="rtmp"',
                flashCanPlay: true,
                media: 'audio'
            },
            m4v: { // H.264 / MP4
                codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: true,
                media: 'video'
            },
            ogv: { // OGG
                codec: 'video/ogg; codecs="theora, vorbis"',
                flashCanPlay: false,
                media: 'video'
            },
            webmv: { // WEBM
                codec: 'video/webm; codecs="vorbis, vp8"',
                flashCanPlay: false,
                media: 'video'
            },
            flv: { // FLV / F4V
                codec: 'video/x-flv',
                flashCanPlay: true,
                media: 'video'
            },
            rtmpv: { // RTMP VIDEO
                codec: 'video/rtmp; codecs="rtmp"',
                flashCanPlay: true,
                media: 'video'
            }
        },
        optionsAudio: {
            size: {
                width: "0px",
                height: "0px",
                cssClass: ""
            },
            sizeFull: {
                width: "0px",
                height: "0px",
                cssClass: ""
            }
        },
        optionsVideo: {
            size: {
                width: "480px",
                height: "270px",
                cssClass: "jp-video-270p"
            },
            sizeFull: {
                width: "100%",
                height: "100%",
                cssClass: "jp-video-full"
            }
        },
        _testCanPlayType: function(elem) {
            // IE9 on Win Server 2008 did not implement canPlayType(), but it has the property.
            try {
                elem.canPlayType(this.format.mp3.codec); // The type is irrelevant.
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        },
        _uaBlocklist: function(list) {
            // list : object with properties that are all regular expressions. Property names are irrelevant.
            // Returns true if the user agent is matched in list.
            var ua = navigator.userAgent.toLowerCase(),
                block = false;
                console.log(list);
            Ext.each(list, function(p, re) {
                if(re && re.test(ua)) {
                    block = true;
                    return false; // exit $.each.
                }
            });
            console.log('block ', block);
            return block;
        },
    }
}, function(){
    Ext.apply(this.prototype, {
        // Emulated HTML5 methods and properties
        emulateMethods: "load play pause",
        emulateStatus: "src readyState networkState currentTime duration paused ended playbackRate",
        emulateOptions: "muted volume",
        // Reserved event names generated by jPlayer that are not part of the HTML5 Media element spec
        reservedEvent: "ready flashreset resize repeat error warning"
    });
});
