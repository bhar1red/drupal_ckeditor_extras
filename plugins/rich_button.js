CKEDITOR.plugins.add('rich_button', {
    // CSS Grid widget code.
    requires: 'widget',

    icons: 'rich_button',

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
            ['White', '-skinWhite'],
        ];

        var pluginDirectory = this.path;
        CKEDITOR.dialog.add('rich_button', pluginDirectory + 'dialogs/rich_button.js');

        if (editor.ui.addButton) {
            editor.ui.addButton('rich_button', {
                label: 'Button',
                id: 'rich_button',
                command: 'rich_button'
            });
        }

        editor.addCommand('richButtonDelete', {
            exec: function (editor) {
                element = editor.getSelection().getSelectedElement();
                element.remove();
            }
        });

        if (editor.contextMenu) {
            editor.addMenuGroup('rich_button');
            editor.addMenuItem('richbuttondelete', {
                label: 'Delete Button',
                command: 'richButtonDelete',
                group: 'rich_button'
            });
            editor.addMenuItem('richbuttonedit', {
                label: 'Edit Button Properties',
                command: 'rich_button',
                group: 'rich_button'
            });
        }

        if (editor.contextMenu) {
            editor.contextMenu.addListener(function (element, selection) {
                if (element.hasClass('cke_widget_wrapper_ac-btnRich')) {
                    return {
                        richbuttondelete: CKEDITOR.TRISTATE_OFF,
                        richbuttonedit: CKEDITOR.TRISTATE_OFF,
                    };
                }
            });
        }

        editor.widgets.add('rich_button', {
            button: 'Add a button',
            template: editor.config.richbutton_template,
            dialog: 'rich_button',

            upcast: function (element) {
                return element.name == 'div' && element.hasClass('ac-btnRich');
            },

            init: function () {
                var width = this.element.getStyle('width');
                if (width) {
                    this.setData('width', width);
                }
                if ( this.element.hasClass( 'align-left' ) )
                    this.setData( 'align', 'left' );
                if ( this.element.hasClass( 'align-right' ) )
                    this.setData( 'align', 'right' );
                if ( this.element.hasClass( 'align-center' ) )
                    this.setData( 'align', 'center' );
                //set Skin
                colors.forEach(element => {
                    if (this.element.hasClass(element[1]))
                        this.setData('skin', element[1]);
                });

                //Set Label and CTA 
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
                }

            },

            data: function () {

                if (this.data.width == '')
                    this.element.removeStyle('width');
                else
                    this.element.setStyle('width', this.data.width);

                this.element.removeClass( 'align-left' );
                this.element.removeClass( 'align-right' );
                this.element.removeClass( 'align-center' );
                if ( this.data.align )
                    this.element.addClass( 'align-' + this.data.align );                    
                
                //Set Skin
                colors.forEach(element => {
                    this.element.removeClass(element[1]);
                });

                if (this.data.skin)
                    this.element.addClass(this.data.skin);

                if (this.element.getChild(0).getChild(0).getChild(0).tagName = 'ACLASS="AF-LINK"') {

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
                        this.element.getChild(0).getChild(0).getChild(0).setHtml(this.data.label);
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
