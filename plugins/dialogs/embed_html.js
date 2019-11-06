CKEDITOR.dialog.add( 'embed_html', function( editor ) {
    return {
        // Dialog window definition will be added here.
        title: 'Embed HTML',
        minWidth: 600,
        minHeight: 400,
        contents: [
            {
                id: 'info',
                elements: [
                    // Dialog window UI elements.
                    {
                        id: 'html_code',
                        type: 'textarea',
                        label: 'HTML code to be embed',
                        allowedContent: {
                            script: true,
                            div: true,
                        },
                        inputStyle: 'cursor:auto;' +
					        'width:' + '600' + 'px;' +
					       'height:' + '400' + 'px;' +
					      'tab-size:4;' +
					     'text-align:left;',
                        setup: function(widget){
                            this.setValue (widget.data.html_code);
                        },
                        commit: function(widget){
                            widget.setData ('html_code', this.getValue() );
                        } 
                    }
                ]
            }
        ]
    };
} );