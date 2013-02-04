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

		return this.callParent(config);	
	},      
        listeners: {
            afterRender: function(t){
                console.log('afterRender t', t);
                console.log(this);
                console.log('this.swf',this.swf);
                console.log(document.getElementById(this.swfId));
                console.log('swfobject.getObjectById(this.swfId)',swfobject.getObjectById(this.swfId));
                var test = swfobject.getObjectById(this.swfId);
                    test.trigger();
               // document.getElementById(this.swfId).setFile("http://www.jplayer.org/audio/m4a/TSP-01-Cro_magnon_man.m4a");
                //this.swf.setFile();
                //this.swf.play();
            }
        }
}, function(){
	Ext.apply(this.prototype, {
		config: {
			LOLTests: true
		}
	});
});
Ext.define('Ext.ux.jplayer', {
    extend: 'Ext.Component',
    alias: ['widget.jplayer'],
    requires: ['Ext.ux.JPlayerSWF'],
    statics: {
            instance: Ext.ux.JPlayerSWF
    },
    constructor: function(config){
        console.log('inside ExtJplayer')
        this.initConfig(config);
        console.log('config->', config);

        console.log('Ext.supports',Ext.supports);
        if(Ext.supports.AudioTag){
                this.requireFlash = false;
        }
        console.log('this in jplayer',this);
        return this.callParent(config);
    },
    pause: function() {
            // 		element.jPlayer("pause");
    }
});
