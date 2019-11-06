CKEDITOR.dialog.add( 'cssgrid', function( editor ) {
    return {
        // Dialog window definition will be added here.
        title: 'CSS Grid',
        minWidth: 600,
        minHeight: 300,
        contents: [
            {
                id: 'info',
                elements: [
                    // Dialog window UI elements.
                    {
                        id: 'itemCount',
                        type: 'text',
                        label: 'Number of Items',
                        setup: function(widget){
                            this.setValue (widget.data.itemCount);
                        },
                        commit: function(widget){
                            widget.setData ('itemCount', this.getValue() );
                        } 
                    },
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
                    }
                ]
            }
        ]
    };
} );