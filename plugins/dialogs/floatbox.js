CKEDITOR.dialog.add( 'floatbox', function( editor ) {
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
    return {
        // Dialog window definition will be added here.
        title: 'Edit Floatbox',
        minWidth: 400,
        minHeight: 400,
        contents: [
            {
                id: 'info',
                elements: [
                    // Dialog window UI elements.
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
                        id: 'width',
                        type: 'text',
                        label: 'Width',
                        width: '50px',
                        setup: function(widget){
                            this.setValue (widget.data.width);
                        },
                        commit: function(widget){
                            widget.setData('width',this.getValue());
                        }
                    },
                    {
                        id: 'border',
                        type: 'checkbox',
                        label: 'Border',
                        setup: function(widget){
                            this.setValue (widget.data.border);
                        },
                        commit: function(widget){
                            widget.setData('border',this.getValue());
                        }
                    },
                    {
                        id: 'skin',
                        type: 'select',
                        label: 'Skin',
                        items: colors,
                        default: '-skinWhite',
                        setup: function(widget){
                            this.setValue (widget.data.skin);
                        },
                        commit: function(widget){
                            widget.setData ('skin', this.getValue() );
                        } 
                    },                    
                ]
            }
        ]
    };
} );