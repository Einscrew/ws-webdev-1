;(function ($, window, document, undefined) {

    var options = {
        secret: 'xc3511',
        font: {
            families: ['Arial', 'Helvetica', 'Courier New', 'Courier', 'Times New Roman',
                    'Times', 'Palatino', 'Garamond', 'Bookman', 'Avant Garde'
            ],
            colors: ['Pink', 'Black', 'White', 'Yellow', 'Orange', 'Red', 'Purple',
                     'Blue', 'Brown', 'Grey', 'Green'
            ],
            size: {
                min: 10,
                max: 30
            }
        },
        refreshInterval: 250,
        fadeInterval: 100
    };
    var hasStarted = false;
    var eventData = '';
    var eventDataDelimiter = '.';
    var secretAscii = getAscii(options.secret, eventDataDelimiter);

    $(document).on('keypress', function(event) {
        if (!hasStarted) {
            eventData += event.which.toString() + eventDataDelimiter;

            // Check if correct secret has been entered
            if (eventData.indexOf(secretAscii) !== -1) {
                hasStarted = true;
                randomizeAtributes();
                setInterval(randomizeAtributes, options.fadeInterval + options.refreshInterval);
            }
        }
    });

    function randomizeAtributes() {
        $('*').each(function() {
            var attributes = getRndAttributes();

            $(this).fadeOut(0, function() {
                $(this).css({
                    'color': attributes.color,
                    'background-color': attributes.backgroundColor,
                    'font-family': attributes.fontFamily,
                    'font-size': attributes.fontSize
                });
            });

            $(this).fadeIn(options.fadeInterval);
        });
    }

    function getRndAttributes() {
        var backgroundColor, attributes = {};

        attributes.color = options.font.colors[getRndInt(0, options.font.colors.length)];

        // Background color should be different from the text color (otherwise you can't see the text)
        do {
            backgroundColor = options.font.colors[getRndInt(0, options.font.colors.length)];
        } while (backgroundColor == attributes.color);

        attributes.backgroundColor =  backgroundColor;

        attributes.fontFamily =  options.font.families[getRndInt(0, options.font.families.length)];
        attributes.fontSize =  getRndInt(options.font.size.min, options.font.size.max).toString() + 'px';

        return attributes;
    }

    function getRndInt(min, max) {
        return Math.floor((Math.random() * max) + min);
    }

    function getAscii(string, stringDelimiter) {
        var asciiString = '';

        for (var i = 0; i < string.length; i++) {
            asciiString += string.charCodeAt(i).toString() + stringDelimiter;
        }
        return asciiString;
    }
}(jQuery, window, document));
