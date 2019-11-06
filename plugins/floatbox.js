CKEDITOR.plugins.add( 'floatbox', {
    // Floatbox widget code.
    requires: 'widget',

    icons: 'floatbox',

    init: function( editor ) {
        var colors = [
            ['none', '-none'],
            ['White', '-white'],
            ['Black', '-black'],
            ['Blue', '-blue'],
            ['Blue Lighter', '-blueLighter'],
            ['Green', '-green'],
            ['Green Darker', '-greenDarker'],
            ['Green Lighter', '-greenLighter'],                                
            ['Gray', '-gray'],
            ['Charcoal', '-charcoal'],
            ['Gray Lighter', '-grayLighter'],
            ['Orange', '-orange'],
            ['Orange Lighter', '-orangeLighter'],
            ['Purple', '-purple'],
            ['Purple Lighter', '-purpleLighter'],                                
            ['Red', '-red'],                                
            ['Red Darker', '-redDarker'],
            ['Teal', '-teal'],
            ['Teal Darker', '-tealDarker']
        ];   
        var pluginDirectory = this.path;
        CKEDITOR.dialog.add('floatbox',pluginDirectory + 'dialogs/floatbox.js');
        
		if ( editor.ui.addButton ) {
            editor.ui.addButton( 'floatbox', {
                label: 'Floatbox',
                id: 'floatbox',
                command: 'floatbox'
            } );
        }
        editor.addCommand( 'floatboxDelete', {
			exec: function( editor ) {
                floatbox = editor.getSelection().getSelectedElement();
                floatbox.remove();	
			}
        } );
        
        if ( editor.contextMenu ) {
            editor.addMenuGroup( 'floatbox' );
            editor.addMenuItem( 'floatboxdelete', {
                label: 'Delete Floatbox',
                command: 'floatboxDelete',
                group: 'floatbox'
            });
            editor.addMenuItem( 'floatboxedit', {
                label: 'Edit Floatbox Properties',
                command: 'floatbox',
                group: 'floatbox'
            });
        }

		if ( editor.contextMenu ) {
			editor.contextMenu.addListener( function(element, selection) {
                // menu item state is resolved on commands.
                if( element.hasClass( 'cke_widget_wrapper_ac-floatbox' ) ){
                    return {
                        floatboxdelete: CKEDITOR.TRISTATE_OFF,
                        floatboxedit: CKEDITOR.TRISTATE_OFF,
                    };
                }
			} );
		}

        editor.widgets.add('floatbox',{
            button: 'Create a Floatbox',

            template: editor.config.floatbox_template,
            
            editables:{
                content: {
                    selector: '.floatbox-content',
                }
            }, 

            allowedContent:
            'div(!ac-floatbox,align-left,align-right,align-center){width};'+
            'div(!ac-floatbox-content); h2(!ac-floatbox-title)',

            requiredContent: 'div(ac-floatbox)',

            dialog: 'floatbox',
            
            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'ac-floatbox' );
            },

            init: function(){
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
                if (this.element.hasClass( '-greyBorder' ) )
                    this.setData('border', true);

                //set Skin
                this.setData('skin','-none');
                colors.forEach(color => {
                   this.element.hasClass(color[1]) ? this.setData('skin',color[1]) : '';
              });
       /*         this.element.hasClass('-white') ? this.setData('skin','-white') : '';
                this.element.hasClass('-black') ? this.setData('skin','-black') : '';
                this.element.hasClass('-blue') ? this.setData('skin','-blue') : '';
                this.element.hasClass('-blue-darker') ? this.setData('skin','-blue-darker') : '';
                this.element.hasClass('-green-darker') ? this.setData('skin','-green-darker') : '';
                this.element.hasClass('-green-lighter') ? this.setData('skin','-green-lighter') : '';
                this.element.hasClass('-teal') ? this.setData('skin','-teal') : '';
                this.element.hasClass('-teal-darker') ? this.setData('skin','-teal-darker') : '';
                this.element.hasClass('-orange') ? this.setData('skin','-orange') : '';
                this.element.hasClass('-orange-lighter') ? this.setData('skin','-orange-lighter') : '';
                this.element.hasClass('-red-darker') ? this.setData('skin','-red-darker') : '';
                this.element.hasClass('-purple') ? this.setData('skin','-purple') : '';
                this.element.hasClass('-purple-lighter') ? this.setData('skin','-purple-lighter') : '';
                this.element.hasClass('-gray-darker') ? this.setData('skin','-gray-darker') : '';
                this.element.hasClass('-gray') ? this.setData('skin','-gray') : '';
                this.element.hasClass('-gray-lighter') ? this.setData('skin','-gray-lighter') : '';  */

            },

            data: function() {

                if ( this.data.width == '' )
                    this.element.removeStyle( 'width' );
                else
                    this.element.setStyle( 'width', this.data.width );
        
                this.element.removeClass( 'align-left' );
                this.element.removeClass( 'align-right' );
                this.element.removeClass( 'align-center' );
                if ( this.data.align )
                    this.element.addClass( 'align-' + this.data.align );

                this.element.removeClass( '-greyBorder' );
                if(this.data.border){
                    this.element.addClass('-greyBorder');
                }
                
                //Set Skin
                colors.forEach(color => {
                    this.element.removeClass(color[1]);
                });
/*                this.element.removeClass('-none');
                this.element.removeClass('-white');
                this.element.removeClass('-black');
                this.element.removeClass('-blue');
                this.element.removeClass('-blue-darker');
                this.element.removeClass('-green-darker');
                this.element.removeClass('-green-lighter');
                this.element.removeClass('-teal');
                this.element.removeClass('-teal-darker');
                this.element.removeClass('-orange');
                this.element.removeClass('-orange-lighter');
                this.element.removeClass('-red-darker');
                this.element.removeClass('-purple');
                this.element.removeClass('-purple-lighter');
                this.element.removeClass('-gray-darker');
                this.element.removeClass('-gray');
                this.element.removeClass('-gray-lighter');*/ 
                if ( this.data.skin )
                    this.element.addClass( this.data.skin );
            } 

        
        });
    }
} );