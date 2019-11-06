CKEDITOR.plugins.add( 'embed_html', {
    // Simple Box widget code.
    requires: 'widget',

    icons: 'embed_html',

    init: function( editor ) {
        var pluginDirectory = this.path;
        editor.addContentsCss(pluginDirectory + 'css/embed_html.css');
        CKEDITOR.dialog.add('embed_html',pluginDirectory + 'dialogs/embed_html.js');
        

        if ( editor.ui.addButton ) {
            editor.ui.addButton( 'embed_html', {
                label: 'Embed HTML',
                id: 'embed_html',
                command: 'embed_html'
            } );
        }

        editor.addCommand( 'deleteEmbedScript', {
			exec: function( editor ) {
                element = editor.getSelection().getSelectedElement();
                element.remove();	
			}
        } );
        
        if ( editor.contextMenu ) {
            editor.addMenuGroup( 'embed_html' );
            editor.addMenuItem( 'deleteembedscript', {
                label: 'Delete Script',
                command: 'deleteEmbedScript',
                group: 'embed_html'
            });
            editor.addMenuItem('editembedscript', {
                label: 'Edit Script',
                command: 'embed_html',
                group: 'embed_html'
            });
        }

		if ( editor.contextMenu ) {
			editor.contextMenu.addListener( function(element, selection) {
                // menu item state is resolved on commands.
                if( element.hasClass( 'cke_widget_wrapper_ck_embeddedhtml' ) ){
                    return {
                        deleteembedscript: CKEDITOR.TRISTATE_OFF,
                        editembedscript: CKEDITOR.TRISTATE_OFF,
                    };
                }
			} );
		}

        editor.widgets.add('embed_html',{
            button: 'Embed html',

            template:
            '<div class="ck_embeddedhtml">' +
            '</div>',

            dialog: 'embed_html',

            allowedContent: {
                script: true,
                div: true,
            }, 

            parts: {
                embed_html: 'div.ck_embeddedhtml',
            },

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'ck_embeddedhtml' );
            },

            init: function(){
                var innerHTML = unescape(this.element.getHtml());
                if(innerHTML){
                    this.setData('html_code', innerHTML);
                }

            },

            data: function(){
                var row = this.parts['embed_html'];
                if(this.data.html_code){
                    row.setHtml(this.data.html_code);
                }
            }
        });

        

    }
});

