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