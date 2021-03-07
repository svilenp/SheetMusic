(function (musicassistant, $) {

    musicassistant.globals = (function () {
        var delimiter = ':',
            elements = [],
            copiedElements = [],

            generals = {
                x: { key: 'X', val: '1' }, // Reference number
                m: { key: 'M', val: '4/4' },  // Meter
                k: { key: 'K', val: 'C' },  // Key
                c: { key: 'K', val: 'clef: treble' },
                l: { key: 'L', val: '1/8' },  // Unit note length
                t: { key: 'T', val: $('#sheetTitle').val() } // Title
            },

            addElement = function (el) {
            },

            addElementAtIndex = function (el, index) {
                if (index > -1)
                    elements.splice(index, 0, el);
            },

            sheet = function () {
                var sheetStr = (
                    getSheetProp(generals.x.key, generals.x.val) + "\n" +
                    getSheetProp(generals.m.key, generals.m.val) + "\n" +
                    getSheetProp(generals.k.key, generals.k.val) + "\n" +
                    getSheetProp(generals.c.key, generals.c.val) + "\n" +
                    getSheetProp(generals.l.key, generals.l.val) + "\n" +
                    getSheetProp(generals.t.key, generals.t.val) + "\n" +
                    elements.join('')
                );

                return sheetStr;
            },

            getSheetProp = function (a, b) {
                return a.concat(delimiter).concat(b);
            },

            showIndexes = function () {
                copiedElements = elements;
                elements = [];

                var counter = 0;

                for (i = 0; i < copiedElements.length; i++) {
                    elements.push('"' + counter + '"' + copiedElements[i]);

                    counter = counter + 1;
                }
            },

            updateElements = function () {
                elements = copiedElements;
                copiedElements = [];
            }

        return {
            generals: generals,
            sheet: sheet,
            delimiter: delimiter,
            getSheetProp: getSheetProp,
            elements: elements,
            addElement: addElement,
            showIndexes: showIndexes,
            updateElements: updateElements,
            addElementAtIndex: addElementAtIndex
        };
    })();

})(window.musicassistant = window.musicassistant || {}, window.jQuery);