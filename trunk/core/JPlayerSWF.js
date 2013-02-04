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
            // <debug>
                console.log('Inside Ext.ux.JPlayerSWF constructor');
                console.log('config', config);
            // </debug>

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
		config: {
			LOLTests: true
		}
	});
});