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
	constructor: function(config){
		// <debug>
			console.log('Inside Ext.ux.JPlayerSWF constructor');
			console.log('config', config);
		// </debug>
		return this.callParent(config);	
	}
}, function(){
	Ext.apply(this.prototype, {
		config: {
			LOLTests: true
		}
	});
});