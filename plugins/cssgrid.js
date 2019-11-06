CKEDITOR.plugins.add( 'cssgrid', {
    // CSS Grid widget code.
    requires: 'widget',

    icons: 'cssgrid',

    init: function( editor ) {
        var pluginDirectory = this.path;
        editor.addContentsCss(pluginDirectory + 'css/cssgrid.css');
        CKEDITOR.dialog.add('cssgrid',pluginDirectory + 'dialogs/cssgrid.js');

        if ( editor.ui.addButton ) {
            editor.ui.addButton( 'cssgrid', {
                label: 'CSS Grid',
                id: 'cssgrid',
                command: 'cssgrid'
            } );
        }

        editor.widgets.add('cssgrid',{
            button: 'A Simple CSS Grid',

            parts: {
                cssgrid: 'div.ckeditor-cssgrid',
            },

            template:
            '<div class="ckeditor-cssgrid">' +
            '</div>',

            editables: {
                content: '',
            },

            allowedContent: 'div(!ckeditor-cssgrid, align-left,align-right,align-center){width};div(!item, !item-*)', 
            requiredContent: 'div(ckeditor-cssgrid)',

            dialog: 'cssgrid',

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'ckeditor-cssgrid' );
            },

            init: function() {
                var itemCount = this.element.getChildCount();
                if(itemCount){
                    this.setData('itemCount', itemCount);
                    this.createEditable(0, itemCount);
                }

                //Width and Alignment
                var width = this.element.getStyle('width');
                if (width){
                    this.setData('width', width);
                }
                if ( this.element.hasClass( 'align-left' ) )
                    this.setData( 'align', 'left' );
                if ( this.element.hasClass( 'align-right' ) )
                    this.setData( 'align', 'right' );
                if ( this.element.hasClass( 'align-center' ) )
                    this.setData( 'align', 'center' );                        
            },

            data: function(){
                if(this.data.itemCount){
                    var itemCount = this.data.itemCount;
                    var row = this.parts['cssgrid'];
                    var childCount = this.element.getChildCount();
                    if(itemCount > childCount){
                        var content = '';
                        for( var i=childCount+1; i<=itemCount; i++){
                            content = content + 
                            '<div class="item ' + "item-"+i+'">'+
                            '<h4> Sample Title ' + i + '</h4><hr>' +
                            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> ' +
                            '</div>'; 
                        }
                        row.appendHtml(content);
                        this.createEditable(childCount, itemCount);
                    }
                    if(itemCount < childCount){
                        for(var i=childCount; i>itemCount; i--){
                            var ele = this.element.getChild(i-1);
                            ele.remove();    
                        }
                    }
                }
                //Width and Alignment
                if ( this.data.width == '' )
                    this.element.removeStyle( 'width' );
                else
                    this.element.setStyle( 'width', this.data.width );
        
                this.element.removeClass( 'align-left' );
                this.element.removeClass( 'align-right' );
                this.element.removeClass( 'align-center' );
                if ( this.data.align )
                    this.element.addClass( 'align-' + this.data.align );
                    
            },
            createEditable: function(childCount, itemCount){
                for(var i=childCount+1; i<=itemCount; i++){
                    this.initEditable('content' + i, {
                        selector: '.item-'+i
                    });    
                }
            }
        
        });
        // Plugin logic goes here...
    }
} );
