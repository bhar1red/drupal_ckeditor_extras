CKEDITOR.plugins.add('basic_button', {
    // CSS Grid widget code.
    requires: 'widget',

    icons: 'basic_button',

    init: function (editor) {
        var colors = [
            ['Black', '-skinBlack'],
            ['Blue', '-skinBlue'],
            ['Blue Lighter', '-skinBlueLighter'],
            ['Gray', '-skinGray'],
            ['Charcoal', '-skinCharcoal'],
            ['Green', '-skinGreen'],
            ['Green Darker', '-skinGreenDarker'],
            ['Green Lighter', '-skinGreenLighter'],
            ['Orange', '-skinOrange'],
            ['Orange Lighter', '-skinOrangeLighter'],
            ['Purple', '-skinPurple'],
            ['Purple Lighter', '-skinPurpleLighter'],
            ['Red', '-skinRed'],
            ['Red Darker', '-skinRedDarker'],
            ['Teal', '-skinTeal'],
            ['Teal Darker', '-skinTealDarker'],
        ];
        var pluginDirectory = this.path;
        CKEDITOR.dialog.add('basic_button', pluginDirectory + 'dialogs/basic_button.js');

        if (editor.ui.addButton) {
            editor.ui.addButton('basic_button', {
                label: 'Button',
                id: 'basic_button',
                command: 'basic_button'
            });
        }

        editor.addCommand('basicButtonDelete', {
            exec: function (editor) {
                element = editor.getSelection().getSelectedElement();
                element.remove();
            }
        });

        if (editor.contextMenu) {
            editor.addMenuGroup('basic_button');
            editor.addMenuItem('basicbuttondelete', {
                label: 'Delete Button',
                command: 'basicButtonDelete',
                group: 'basic_button'
            });
            editor.addMenuItem('basicbuttonedit', {
                label: 'Edit Button Properties',
                command: 'basic_button',
                group: 'basic_button'
            });

        }

        if (editor.contextMenu) {
            editor.contextMenu.addListener(function (element, selection) {
                // menu item state is resolved on commands.
                if (element.hasClass('cke_widget_wrapper_ac-basicButton')) {
                    return {
                        basicbuttondelete: CKEDITOR.TRISTATE_OFF,
                        basicbuttonedit: CKEDITOR.TRISTATE_OFF,
                    };
                }
            });
        }

        editor.widgets.add('basic_button', {
            button: 'Add a button',
            template: editor.config.basicbutton_template,
            dialog: 'basic_button',

            allowedContent: 'a(SolidButtonDefault, SolidButtonDefaultInvert, outlineButtonDefault, outlineButtonDefaultInvert, textButtonDefault, textButtonDefaultInvert )',

            upcast: function (element) {
                return element.name == 'div' && element.hasClass('ac-basicButton');
            },

            init: function () {
                if ( this.element.hasClass( 'align-left' ) )
                    this.setData( 'align', 'left' );
                if ( this.element.hasClass( 'align-right' ) )
                    this.setData( 'align', 'right' );
                if ( this.element.hasClass( 'align-center' ) )
                    this.setData( 'align', 'center' );
                //set Style 
                if (this.element.getChild(0).getChild(0).getChild(0).tagName = 'ACLASS="AF-LINK"') {
                    var aclass = this.element.getChild(0).getChild(0).getChild(0);
                    if (aclass.hasAttribute('href')) {
                        this.setData('cta', aclass.getAttribute('href'));
                    }
                    if (aclass.hasAttribute('aria-label')) {
                        this.setData('label', aclass.getAttribute('aria-label'));
                    }
                    if (aclass.hasAttribute('target')) {
                        this.setData('target', aclass.getAttribute('target'));
                    }
                    else {
                        this.setData('target', '_self');
                    }
                    //Set Default Values
                    this.setData('style','solidButtonDefault');
                    this.setData('skin','-skinTeal');

                    if (aclass.hasClass('solidButtonDefault'))
                        this.setData('style', 'solidButtonDefault');
                    if (aclass.hasClass('solidButtonDefaultInvert'))
                        this.setData('style', 'solidButtonDefaultInvert');
                    if (aclass.hasClass('outlineButtonDefault'))
                        this.setData('style', 'outlineButtonDefault');
                    if (aclass.hasClass('outlineButtonDefaultInvert'))
                        this.setData('style', 'outlineButtonDefaultInvert');
                    if (aclass.hasClass('textButtonDefault'))
                        this.setData('style', 'textButtonDefault');
                    if (aclass.hasClass('textButtonDefaultInvert'))
                        this.setData('style', 'textButtonDefaultInvert');
                    //set Skin
                    colors.forEach(element => {
                        if (aclass.hasClass(element[1]))
                            this.setData('skin', element[1]);
                    });
                }
            },

            data: function () {
                this.element.removeClass( 'align-left' );
                this.element.removeClass( 'align-right' );
                this.element.removeClass( 'align-center' );
                if ( this.data.align )
                    this.element.addClass( 'align-' + this.data.align );  
                    
                if (this.element.getChild(0).getChild(0).tagName = 'ACLASS="AF-LINK"') {
                    this.element.getChild(0).getChild(0).getChild(0).removeClass('solidButtonDefault');
                    this.element.getChild(0).getChild(0).getChild(0).removeClass('solidButtonDefaultInvert');
                    this.element.getChild(0).getChild(0).getChild(0).removeClass('outlineButtonDefault');
                    this.element.getChild(0).getChild(0).getChild(0).removeClass('outlineButtonDefaultInvert');
                    this.element.getChild(0).getChild(0).getChild(0).removeClass('textButtonDefault');
                    this.element.getChild(0).getChild(0).getChild(0).removeClass('textButtonDefaultInvert');
                    if (this.data.style) {
                        this.element.getChild(0).getChild(0).getChild(0).addClass(this.data.style);
                    }


                    //Set Skin
                    colors.forEach(element => {
                        this.element.getChild(0).getChild(0).getChild(0).removeClass(element[1]);
                    });
                    if (this.data.skin)
                        this.element.getChild(0).getChild(0).getChild(0).addClass(this.data.skin);


                    this.element.getChild(0).getChild(0).getChild(0).removeAttribute('href');

                    if (this.data.cta) {
                        this.element.getChild(0).getChild(0).getChild(0).setAttribute('href', this.data.cta);
                    }
                    if (this.element.getChild(0).getChild(0).getChild(0).getAttribute('data-cke-saved-href')) {
                        this.element.getChild(0).getChild(0).getChild(0).setAttribute('data-cke-saved-href', this.data.cta);
                    }
                    this.element.getChild(0).getChild(0).getChild(0).removeAttribute('aria-label');
                    if (this.data.label) {
                        this.element.getChild(0).getChild(0).getChild(0).setAttribute('aria-label', this.data.label);
                        this.element.getChild(0).getChild(0).getChild(0).getChild(0).setHtml(this.data.label);
                    }

                    this.element.getChild(0).getChild(0).getChild(0).removeAttribute('target');
                    this.element.getChild(0).getChild(0).getChild(0).removeAttribute('rel');
                    if (this.data.target) {
                        this.element.getChild(0).getChild(0).getChild(0).setAttribute('target', this.data.target);
                        if (this.data.target == "_blank") {
                            this.element.getChild(0).getChild(0).getChild(0).setAttribute('rel', "noopener noreferrer");
                        }
                    }
                }
            }
        });
    }
});
