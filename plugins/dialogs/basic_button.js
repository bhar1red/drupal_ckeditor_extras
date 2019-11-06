CKEDITOR.dialog.add( 'basic_button', function( editor ) {
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
    return {
        // Dialog window definition will be added here.
        title: 'Button',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'align',
                        type: 'select',
                        label: 'Align',
                        items: [
                            [ editor.lang.common.notSet, '' ],
                            [ editor.lang.common.alignLeft, 'left' ],
                            [ editor.lang.common.alignRight, 'right' ],
                            [ editor.lang.common.alignCenter, 'center' ]
                        ],
                        setup: function(widget){
                            this.setValue (widget.data.align);
                        },
                        commit: function(widget){
                            widget.setData ('align', this.getValue() );
                        } 
                    },
                    {
                        id: 'style',
                        type: 'select',
                        label: 'Button Style',
                        items: [
                            [ 'Solid', 'solidButtonDefault' ],
                            [ 'Solid Invert', 'solidButtonDefaultInvert' ],
                            [ 'Outline', 'outlineButtonDefault' ],
                            [ 'Outline Invert', 'outlineButtonDefaultInvert' ],
                            [ 'Text', 'textButtonDefault' ],
                            [ 'Text Invert', 'textButtonDefaultInvert' ],
                        ],
                        default: 'solidButtonDefault',
                        setup: function(widget){
                            this.setValue (widget.data.style);
                        },
                        commit: function(widget){
                            widget.setData ('style', this.getValue() );
                        } 
                    },
                    {
                        id: 'skin',
                        type: 'select',
                        label: 'Button Skin',
                        items: colors,
                        default: '-skinTeal',
                        setup: function(widget){
                            this.setValue (widget.data.skin);
                        },
                        commit: function(widget){
                            widget.setData ('skin', this.getValue() );
                        } 
                    },
                    {
                        id: 'label',
                        type: 'text',
                        label: 'Button Label',
                        setup: function(widget){
                            this.setValue (widget.data.label);
                        },
                        commit: function(widget){
                            widget.setData('label',this.getValue());
                        }
                    },
                    {
                        id: 'cta',
                        type: 'text',
                        label: 'CTA Link',
                        setup: function(widget){
                            this.setValue (widget.data.cta);
                        },
                        commit: function(widget){
                            widget.setData('cta',this.getValue());
                        }
                    },
                    {
                        id: 'target',
                        type: 'select',
                        label: 'Target',
                        items: [
                            [ 'Self', '_self' ],
                            [ 'New Window', '_blank' ],
                        ],
                        default: '_self',
                        setup: function(widget){
                            this.setValue (widget.data.target);
                        },
                        commit: function(widget){
                            widget.setData ('target', this.getValue() );
                        } 
                    },                    
                ]
            }
        ]
    };
} );