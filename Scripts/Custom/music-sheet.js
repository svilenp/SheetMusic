(function (musicassistant, $, globals) {
    "use strict";

    musicassistant.selectedElement;

    musicassistant.musicsheet = (function () {
        
        var noteTime = '',
            noteNote = '',
            noteOctave = '',
            currentElement = '',
            currentChord = '',

        // using abcjs Editor 
        loadEditor = function () {
            new ABCJS.Editor("txtAbc", {
                canvas_id: "musicSheetCanvas",
                midi_id: "midi",
                warnings_id: "warnings",
                midi_options: {
                    program: 1,
                    qpm: 150,
                    type: "qt"
                }
            });
        },

        timesRepresentation = {
            "timeFullNote": "8",
            "timeHalfNote": "4",
            "timeFourthNote": "2",
            "timeEightNote": "",
            "timeSixteenthNote": "1/2",
            "timeThirtysecondNote": "1/4",
            "timeFullNoteDot": "9",
            "timeHalfNoteDot": "5",
            "timeFourthNoteDot": "3",
            "timeEightNoteDot": "7/5",
            "timeSixteenthNoteDot": "2/3",
            "timeThirtysecondNoteDot": "1/3",
            "default": ""
        },

        clefsRepresentation = {
            "optG": "clef: treble",
            "optF": "clef: bass",
            "optC": "clef: alto"
        },

        reloadSheet = function () {
            $('#txtAbc').val(globals.sheet);
            loadEditor();
        },

        setDefaults = function () {
            $('.metrics-count').val(4);
            $('.metrics-unit').val(4);
        },

        setSheetTitle = function () {
            globals.generals.t.val = $('#sheetTitle').val();

            reloadSheet();
        },

        addOtherElement = function (e) {
            var othersRepresentation = {
                "optBreakOne": "z8",
                "optBreakHalf": "z4",
                "optBreakFourth": "z2",
                "optBreakEight": "z",
                "optBreakSixteenth": "z1/2",
                "optBreakThirtysecond": "z1/4",
                "optRepeatBegin": "|:",
                "optRepeatEnd": ":|",
                "optLine": "|",
                "addLine": "\n",
                "default": ""
            }

            var el = othersRepresentation[e.target.id] || othersRepresentation["default"];
            var indexToAdd = $('#deleteAddIndex');
            
            if (indexToAdd.val() == '' || indexToAdd.val() == 'undefined')
                globals.addElement(el);
            else
                globals.addElementAtIndex(el, indexToAdd.val());

            indexToAdd.val('');
            reloadSheet();
        },

        timeSelected = function (e) {
            // store the selected value
            noteTime = e.target.id;

            // open the next tab
            $('.nav-pills > .active').next('li').find('a').trigger('click');
        },

        noteSelected = function (e) {
            // store the selected value
            noteNote = e.target.id;

            // open the next tab
            $('.nav-pills > .active').next('li').find('a').trigger('click');
        },

        clearOctaveCss = function () {
            $('#octave #1').removeClass('btn-primary');
            $('#octave #2').removeClass('btn-primary');
            $('#octave #3').removeClass('btn-primary');
            $('#octave #4').removeClass('btn-primary');
        },

        octaveSelected = function (e) {
            // store the selected value
            noteOctave = e.target.id;

            // clear the unneeded styles from the buttons
            clearOctaveCss();

            // mark the selected button
            $(e.target).addClass('btn-primary');

            // show the functions section
            $('#sheet-functions').removeClass('hidden');
        },

        setCurrentElement = function () {
            var octavesRepresentation = {
                "1": noteNote.toUpperCase().concat(","), // Capitalize
                "2": noteNote.toUpperCase(), // Capitalize
                "3": noteNote.toLowerCase(), // Lowerize
                "4": noteNote.toLowerCase().concat("'"), // Lowerize
                "default": ""
            };

            currentElement = octavesRepresentation[noteOctave] + timesRepresentation[noteTime];
        },

        addToSheet = function () {
            var indexToAdd = $('#updateIndex');

            if (indexToAdd.val() == '')
                globals.addElement(currentElement);
            else
                globals.addElementAtIndex(currentElement, indexToAdd.val());

            indexToAdd.val('');
            reloadSheet();
        },

        addNoteToSheet = function () {
            setCurrentElement();
            addToSheet();
            currentElement = '';

            // clear the unneeded styles from the buttons
            clearOctaveCss();

            // hide the functions section
            $('#sheet-functions').addClass('hidden');

            $('#notesTimeTab').find('a').trigger('click');
        },

        addNoteToChord = function () {
            $('#liFinishChord').removeClass('hidden');

            currentChord = currentElement;
            setCurrentElement();

            currentElement = currentChord.concat(currentElement);
        },

        addToChord = function () {
            addNoteToChord();

            // clear the unneeded styles from the buttons
            clearOctaveCss();
            $('#addToSheet').addClass('disabled-link opacity-half');

            // hide the functions section
            $('#sheet-functions').addClass('hidden');

            $('#notesNoteTab').find('a').trigger('click');
        },

        finishChord = function () {
            addNoteToChord();
            currentElement = '[' + currentElement.concat(']');
            addToSheet();
            currentElement = '';
            currentChord = '';

            // clear the unneeded styles from the buttons
            clearOctaveCss();
            $('#addToSheet').removeClass('disabled-link opacity-half');
            $('#liFinishChord').addClass('hidden');

            // hide the functions section
            $('#sheet-functions').addClass('hidden');

            $('#notesTimeTab').find('a').trigger('click');
        },

        showIndexes = function () {
            globals.showIndexes();
            reloadSheet();
            globals.updateElements();
        },

        deleteElement = function () {
            var indexToRemove = $('#deleteAddIndex');
            if (indexToRemove.val() == '')
                globals.elements.pop();
            else
                globals.elements.splice(indexToRemove.val(), 1);

            indexToRemove.val('');
            reloadSheet();
        },

        changeClef = function (e) {
            globals.generals.c.val = clefsRepresentation[e.target.id];
            reloadSheet();
        },

        changeKey = function (e) {
            globals.generals.k.val = e.target.value;
            reloadSheet();
        },

        changeMetrics = function () {
            var beatsPerBar = $('.metrics-count').val();
            var beatsUnit = $('.metrics-unit').val();

            if (beatsPerBar != '' && beatsPerBar != 'undefined' && beatsUnit != '' && beatsUnit != 'undefined') {
                globals.generals.m.val = beatsPerBar + '/' + beatsUnit;
                reloadSheet();
            }
        },

        exportToPdf = function () {
            var canvas = document.createElement('canvas');
            canvg(canvas, $('#musicSheetCanvas').html());
            var imgData = canvas.toDataURL();

            var namefile = prompt("insert name of file to save in png");
            if (namefile === "") {
                alert("You must enter name of file")
            } else {
                downloadCanvas(document.getElementById("exportToPdf"), imgData, namefile + ".png");
            }
        },

        openAbcEditor = function () {
            $('#spanAbcTab')[0].click();
            $('#liAbcTab').addClass('active');
            $('#showIndexes').addClass('disabled');
        },

        downloadCanvas = function (link, imgData, filename) {
            link.href = imgData;
            link.download = filename;
        },

        sheetTabsClick = function () {
            $('#showIndexes').removeClass('disabled');
        },

        init = function () {
            $(function () {
                setDefaults();
                reloadSheet();

                $('#sheetTitle').blur(setSheetTitle);
                $('#others .others-add a').click(addOtherElement);
                $('#notesTabContent #time a').click(timeSelected);
                $('#notesTabContent #note a').click(noteSelected);
                $('#notesTabContent #octave .btn-group a').click(octaveSelected);
                $('#addToSheet').click(addNoteToSheet);
                $('#addToChord').click(addToChord);
                $('#finishChord').click(finishChord);
                $('#showIndexes').click(showIndexes);
                $('#deleteElement').click(deleteElement);
                $('#general #clefsContainer input').change(changeClef);
                $('#general #Keys').change(changeKey);
                $('#metricsContainer input').blur(changeMetrics);
                $('#exportToPdf').click(exportToPdf);
                $('#abcOk').click(openAbcEditor);
                $('.nav.nav-tabs.sheet a[data-toggle="tab"]').click(sheetTabsClick);
            });
        }

        return {
            init: init
        };
    })();

    musicassistant.musicsheet.init();

})(window.musicassistant = window.musicassistant || {},
    window.jQuery,
    musicassistant.globals);

