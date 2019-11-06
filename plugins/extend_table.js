CKEDITOR.plugins.add('extend_table', {
    init: function (editor) {
        var pluginDirectory = this.path;
        editor.addContentsCss(pluginDirectory + 'css/cssgrid.css');
        editor.filter.allow('ac-table(-lgSquash,-lgScroll,-mdSquash,-mdScroll,-mdCollapseRow,-smSquash,-smScroll,-smCollapseRow,-teal,-blue,-purple,-orange, -columnFixed, -columnAuto)', 'TableExtended');
        editor.filter.allow('ac-table; act-component; ac-table__rgnInner act-component-inner', 'TableExtended');
        CKEDITOR.on('dialogDefinition', function (ev) {
            var colors = [
                ['Black', '-black'],
                ['Blue', '-blue'],
                ['Blue Lighter', '-blueLighter'],
                ['Green', '-green'],
                ['Green Darker', '-greenDarker'],
                ['Green Lighter', '-greenLighter'],                                
                ['Gray', '-gray'],
                ['Charcoal', '-charcoal'],
                ['Orange', '-orange'],
                ['Orange Lighter', '-orangeLighter'],
                ['Purple', '-purple'],
                ['Purple Lighter', '-purpleLighter'],                                
                ['Red', '-red'],                                
                ['Red Darker', '-redDarker'],
                ['Teal', '-teal'],
                ['Teal Darker', '-tealDarker']
            ];      
            var dialogName = ev.data.name;
            var dialogDefinition = ev.data.definition;
            if (dialogName == "table" || dialogName == "tableProperties") {
                ev.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_NONE;
                var infoTab = dialogDefinition.getContents('info');
                if(infoTab.get('act-table')) return;
                infoTab.get('selHeaders')['default'] = 'row';
                infoTab.get('txtWidth')['default'] = '';
                infoTab.get('txtCaption')['default'] = 'Table Title';
                infoTab.add({
                    id: 'act-table',
                    type: 'checkbox',
                    label: 'ACT Table',
                    default: 'checked',
                    onClick: function () {
                        var dialog = this.getDialog();
                        var ch = this.getValue();
                        ch ? dialog.showPage('extProperties') : dialog.hidePage('extProperties');
                    }
                });
                dialogDefinition.onShow = function(){
                    this.selectPage( 'extProperties' );

                };
                dialogDefinition.addContents({
                    id: 'extProperties',
                    label: 'Extended Properties',
                    accessKey: 'M',
                    elements: [
                        {
                            id: 'bst_desktop',
                            type: 'select',
                            label: 'Class for Desktop',
                            items: [
                                ["None", ''],
                                ['Squash', '-lgSquash'],
                                ['Scroll', '-lgScroll']
                            ],
                            default: '-lgSquash'
                        },
                        {
                            id: 'bst_tablet',
                            type: 'select',
                            label: 'Class for Tablet',
                            items: [
                                ["None", ''],
                                ['Squash', '-mdSquash'],
                                ['Scroll', '-mdScroll'],
                                ['Collapse Row', '-mdCollapseRow']
                            ],
                            default: '-mdScroll'
                        },
                        {
                            id: 'bst_mobile',
                            type: 'select',
                            label: 'Class for Phone',
                            items: [
                                ["None", ''],
                                ['Squash', '-smSquash'],
                                ['Scroll', '-smScroll'],
                                ['Collapse Row', '-smCollapseRow']
                            ],
                            default: '-smCollapseRow'
                        },
                        {
                            id: 'bst_skin',
                            type: 'select',
                            label: 'Skin Choice',
                            items: colors,
                            default: '-teal'
                        },
                        {
                            id: 'bst_columns',
                            type: 'select',
                            label: 'Column Width',
                            items: [
                                ['Fixed Column Width', '-columnFixed'],
                                ['Automatic Column Width', '-columnAuto'],
                            ],
                            default: '-columnFixed'
                        },
                    ]
                });

                var makeElement = function (name) {
                    return new CKEDITOR.dom.element(name, editor.document);
                };

                var addExtendedClasses = function (table, dialog) {
                    if (table && table.getParent()) {
                        //Set Values to Table
                        ac_table = table.getParent().hasClass('ac-table') ? table.getParent() : '';
                        if (ac_table) {
                            bst_desktop = dialog.getValueOf('extProperties', 'bst_desktop');
                            bst_tablet = dialog.getValueOf('extProperties', 'bst_tablet');
                            bst_mobile = dialog.getValueOf('extProperties', 'bst_mobile');
                            bst_skin = dialog.getValueOf('extProperties', 'bst_skin');
                            bst_columns = dialog.getValueOf('extProperties', 'bst_columns')

                            //Remove Existing Classes 
                            ac_table.removeClass("-lgSquash");
                            ac_table.removeClass("-lgScroll");
                            ac_table.removeClass("-mdSquash");
                            ac_table.removeClass("-mdScroll");
                            ac_table.removeClass("-mdCollapseRow");
                            ac_table.removeClass("-smSquash");
                            ac_table.removeClass("-smScroll");
                            ac_table.removeClass("-smCollapseRow");

                            colors.forEach(function (element) {
                                ac_table.removeClass(element[1]);
                            });

                            ac_table.removeClass("-columnFixed");
                            ac_table.removeClass("-columnAuto");

                            table.removeAttribute('border');

                            bst_desktop ? ac_table.addClass(bst_desktop) : '';
                            bst_tablet ? ac_table.addClass(bst_tablet) : '';
                            bst_mobile ? ac_table.addClass(bst_mobile) : '';
                            bst_skin ? ac_table.addClass(bst_skin) : '';
                            bst_columns ? ac_table.addClass(bst_columns) : '';
                        }

                    }
                };

                dialogDefinition.onShow = function () {
                    if (dialogName == 'table'){
                        this.showPage('extProperties');
                    }
                    this.showPage('extProperties');
                    // Detect if there's a selected table.
                    var selection = editor.getSelection(),
                        ranges = selection.getRanges(),
                        table;

                    var rowsInput = this.getContentElement('info', 'txtRows'),
                        colsInput = this.getContentElement('info', 'txtCols'),
                        widthInput = this.getContentElement('info', 'txtWidth'),
                        heightInput = this.getContentElement('info', 'txtHeight');

                    if (dialogName == 'tableProperties') {
                        this.getContentElement('info', 'act-table').disable(); //Disable change of table to act table
                        var selected = selection.getSelectedElement();
                        if (selected && selected.is('table'))
                            table = selected;
                        else if (ranges.length > 0) {
                            // Webkit could report the following range on cell selection (https://dev.ckeditor.com/ticket/4948):
                            // <table><tr><td>[&nbsp;</td></tr></table>]
                            if (CKEDITOR.env.webkit)
                                ranges[0].shrink(CKEDITOR.NODE_ELEMENT);

                            table = editor.elementPath(ranges[0].getCommonAncestor(true)).contains('table', 1);
                        }

                        // Save a reference to the selected table, and push a new set of default values.
                        this._.selectedElement = table;

                        var ac_table = table.getParent().hasClass('ac-table') ? table.getParent() : '';
                    }


                    // Enable or disable the row, cols, width fields.
                    if (table) {
                        this.setupContent(table);
                        if (ac_table) {
                            this.showPage('extProperties');

                            //Set existing styles of table to dialog
                            dialog_ac_table = this.getContentElement('info', 'act-table');
                            dialog_ac_table.setValue('checked');
                            dialog_bst_desktop = this.getContentElement('extProperties', 'bst_desktop');
                            dialog_bst_tablet = this.getContentElement('extProperties', 'bst_tablet');
                            dialog_bst_mobile = this.getContentElement('extProperties', 'bst_mobile');
                            dialog_bst_skin = this.getContentElement('extProperties', 'bst_skin');
                            dialog_bst_columns = this.getContentElement('extProperties','bst_columns')

                            ac_table.hasClass('-lgSquash') ? dialog_bst_desktop.setValue('-lgSquash') : '';
                            ac_table.hasClass('-lgScroll') ? dialog_bst_desktop.setValue('-lgScroll') : '';
                            ac_table.hasClass('-lgSquash') || ac_table.hasClass('-lgScroll') ? '' : dialog_bst_desktop.setValue('');

                            ac_table.hasClass('-mdSquash') ? dialog_bst_tablet.setValue('-mdSquash') : '';
                            ac_table.hasClass('-mdScroll') ? dialog_bst_tablet.setValue('-mdScroll') : '';
                            ac_table.hasClass('-mdCollapseRow') ? dialog_bst_tablet.setValue('-mdCollapseRow') : '';
                            ac_table.hasClass('-mdSquash') || ac_table.hasClass('-mdScroll') || ac_table.hasClass('-mdCollapseRow') ? '' : dialog_bst_tablet.setValue('');

                            ac_table.hasClass('-smSquash') ? dialog_bst_mobile.setValue('-smSquash') : '';
                            ac_table.hasClass('-smScroll') ? dialog_bst_mobile.setValue('-smScroll') : '';
                            ac_table.hasClass('-smCollapseRow') ? dialog_bst_mobile.setValue('-smCollapseRow') : '';
                            ac_table.hasClass('-smSquash') || ac_table.hasClass('-smScroll') || ac_table.hasClass('-smCollapseRow') ? '' : dialog_bst_mobile.setValue('');

                            dialog_bst_skin.setValue('');
                            colors.forEach(function (element){
                                ac_table.hasClass(element[1]) ? dialog_bst_skin.setValue(element[1]) : '';
                            });

                            ac_table.hasClass('-columnFixed') ? dialog_bst_columns.setValue('-columnFixed') : '';
                            ac_table.hasClass('-columnAuto') ? dialog_bst_columns.setValue('-columnAuto') : '';
                            ac_table.hasClass('-columnFixed') || ac_table.hasClass('-columnAuto') ? '' : dialog_bst_columns.setValue('');

                            ac_table.getStyle('width') ? widthInput.setValue(ac_table.getStyle('width')) : '';
                            ac_table.getStyle('height') ? heightInput.setValue(ac_table.getStyle('height')) : '';


                        }
                        else {
                            dialog_ac_table = this.getContentElement('info', 'act-table');
                            dialog_ac_table.setValue(false);

                            this.hidePage('extProperties');
                        }

                        rowsInput && rowsInput.disable();
                        colsInput && colsInput.disable();
                    } else {
                        rowsInput && rowsInput.enable();
                        colsInput && colsInput.enable();
                    }

                    // Call the onChange method for the widht and height fields so
                    // they get reflected into the Advanced tab.
                    widthInput && widthInput.onChange();
                    heightInput && heightInput.onChange();
                }

                dialogDefinition.onOk = function () {

                    var selection = editor.getSelection(),
                        bms = this._.selectedElement && selection.createBookmarks();

                    var table = this._.selectedElement || makeElement('table'),
                        data = {};

                    var extProperties = dialogDefinition.getContents('extProperties');

                    this.commitContent(data, table);

                    if (data.info) {
                        var info = data.info;

                        // Generate the rows and cols.
                        if (!this._.selectedElement) {
                            var tbody = table.append(makeElement('tbody')),
                                rows = parseInt(info.txtRows, 10) || 0,
                                cols = parseInt(info.txtCols, 10) || 0;

                            for (var i = 0; i < rows; i++) {
                                var row = tbody.append(makeElement('tr'));
                                for (var j = 0; j < cols; j++) {
                                    var cell = row.append(makeElement('td'));
                                    cell.appendBogus();
                                }
                            }
                        }

                        // Modify the table headers. Depends on having rows and cols generated
                        // correctly so it can't be done in commit functions.

                        // Should we make a <thead>?
                        var headers = info.selHeaders;
                        if (!table.$.tHead && (headers == 'row' || headers == 'both')) {
                            var thead = table.getElementsByTag('thead').getItem(0);
                            tbody = table.getElementsByTag('tbody').getItem(0);
                            var theRow = tbody.getElementsByTag('tr').getItem(0);

                            if (!thead) {
                                thead = new CKEDITOR.dom.element('thead');
                                thead.insertBefore(tbody);
                            }

                            // Change TD to TH:
                            for (i = 0; i < theRow.getChildCount(); i++) {
                                var th = theRow.getChild(i);
                                // Skip bookmark nodes. (https://dev.ckeditor.com/ticket/6155)
                                if (th.type == CKEDITOR.NODE_ELEMENT && !th.data('cke-bookmark')) {
                                    th.renameNode('th');
                                    th.setAttribute('scope', 'col');
                                }
                            }
                            thead.append(theRow.remove());
                        }

                        if (table.$.tHead !== null && !(headers == 'row' || headers == 'both')) {
                            // Move the row out of the THead and put it in the TBody:
                            thead = new CKEDITOR.dom.element(table.$.tHead);
                            tbody = table.getElementsByTag('tbody').getItem(0);

                            while (thead.getChildCount() > 0) {
                                theRow = thead.getFirst();
                                for (i = 0; i < theRow.getChildCount(); i++) {
                                    var newCell = theRow.getChild(i);
                                    if (newCell.type == CKEDITOR.NODE_ELEMENT) {
                                        newCell.renameNode('td');
                                        newCell.removeAttribute('scope');
                                    }
                                }

                                // Append the row to the start (#1397).
                                tbody.append(theRow, true);
                            }
                            thead.remove();
                        }

                        // Should we make all first cells in a row TH?
                        if (!this.hasColumnHeaders && (headers == 'col' || headers == 'both')) {
                            for (row = 0; row < table.$.rows.length; row++) {
                                newCell = new CKEDITOR.dom.element(table.$.rows[row].cells[0]);
                                newCell.renameNode('th');
                                newCell.setAttribute('scope', 'row');
                            }
                        }

                        // Should we make all first TH-cells in a row make TD? If 'yes' we do it the other way round :-)
                        if ((this.hasColumnHeaders) && !(headers == 'col' || headers == 'both')) {
                            for (i = 0; i < table.$.rows.length; i++) {
                                row = new CKEDITOR.dom.element(table.$.rows[i]);
                                if (row.getParent().getName() == 'tbody') {
                                    newCell = new CKEDITOR.dom.element(row.$.cells[0]);
                                    newCell.renameNode('td');
                                    newCell.removeAttribute('scope');
                                }
                            }
                        }

                        var dialog = this;
                        addExtendedClasses(table, dialog);


                        if(!table.hasClass('table')){
                            table.addClass('table');
                        }

                        if (!table.getAttribute('style'))
                            table.removeAttribute('style');
                    }

                    // Insert the table element if we're creating one.
                    if (!this._.selectedElement) {
                        if (this.getContentElement('info', 'act-table').getValue() == true) {
                            //Create Parent Elements for act table
                            var act_table = makeElement('div');
                            act_table.addClass('ac-table');
                            act_table.addClass('act-component');
                            act_table.append(table);


                            // Set the width and height.
                            info.txtHeight ? act_table.setStyle('height', info.txtHeight) : act_table.removeStyle('height');
                            info.txtWidth ? act_table.setStyle('width', info.txtWidth) : act_table.removeStyle('width');

                            editor.insertElement(act_table);

                            var dialog = this;

                            addExtendedClasses(table, dialog);

                        }
                        else {
                            editor.insertElement(table);
                        }

                        // Override the default cursor position after insertElement to place
                        // cursor inside the first cell (https://dev.ckeditor.com/ticket/7959), IE needs a while.
                        setTimeout(function () {
                            var firstCell = new CKEDITOR.dom.element(table.$.rows[0].cells[0]);
                            var range = editor.createRange();
                            range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
                            range.select();
                        }, 0);
                    }
                    // Properly restore the selection, (https://dev.ckeditor.com/ticket/4822) but don't break
                    // because of this, e.g. updated table caption.
                    else {
                        try {
                            selection.selectBookmarks(bms);
                        } catch (er) {
                        }
                    }
                }

            }

        });
    }
});