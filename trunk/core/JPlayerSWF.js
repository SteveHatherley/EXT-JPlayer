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