// define a pencil brush for drawing free-hand lines
var PencilBrush = new Class({
    initialize: function (lineWidth, drawingCxt) {
        this.lineWidth = lineWidth;

        // get the cursor associated with the pencil brush
        this.getCursor = function () {
            return "url(cursors/pencil_cursor.cur), crosshair";
        };

        this.setColour = function (colour) {
            drawingCxt.fillStyle = drawingCxt.strokeStyle = colour;
            drawingCxt.lineWidth = this.lineWidth;
            drawingCxt.lineCap = "round";
            drawingCxt.lineJoin = "round";
        };

        // draws a line to the x and y coordinates of the specified position
        function drawLine(position) {
            drawingCxt.lineTo(position.X, position.Y);
            drawingCxt.stroke();
        }

        this.startDrawing = function (position) {
            // start drawing by moving to the specified x and y coordinates
            drawingCxt.beginPath();
            drawingCxt.moveTo(position.X--, position.Y--);
            drawLine(position);
        };

        this.draw = function (position) {
            drawLine(position);
        };

        this.finishDrawing = function (position) {
            // draw the line to the finishing coordinates
            drawLine(position);
            drawingCxt.closePath();
        };
    }
});

// define a spray brush for spraying on the canvas
var SprayBrush = new Class({
    initialize: function (radius, density, drawingCxt) {
        // the radius of the spray circle
        this.radius = radius;

        // how many dots are sprayed in the circle per interval
        this.density = density;

        var _intervalId,    // used to track the current interval ID
            _center;        // the current center to spray

        function getRandomOffset() {
            var randomAngle = Math.random() * 360;
            var randomRadius = Math.random() * radius;

            return {
                x: Math.cos(randomAngle) * randomRadius,
                y: Math.sin(randomAngle) * randomRadius
            };
        }

        // get the cursor associated with the pencil brush
        this.getCursor = function () {
            return "url(cursors/spray_cursor.cur), crosshair";
        };

        this.setColour = function (colour) {
            drawingCxt.fillStyle = colour;
        };

        this.startDrawing = function (position) {
            _center = position;

            // spray once every 200 milliseconds
            _intervalId = setInterval(this.spray, 10);
        };

        this.draw = function (position) {
            // change the center of the spray
            _center = position;
        };

        this.finishDrawing = function (position) {
            clearInterval(_intervalId);
        };

        this.spray = function () {
            var centerX = _center.X, centerY = _center.Y, i;

            for (i = 0; i < density; i++) {
                var offset = getRandomOffset();
                var x = centerX + offset.x, y = centerY + offset.y;

                drawingCxt.fillRect(x, y, 1, 1);
            }
        };
    }
});

// define an eraser brush which clears part of the canvas with rectangles
var EraserBrush = new Class({
    Extends: PencilBrush,
    initialize: function (lineWidth, drawingCxt) {
        // invoke the base constructor
        this.parent(lineWidth, drawingCxt);

        // get the cursor associated with the pencil brush
        this.getCursor = function () {
            return "url(cursors/eraser_cursor.cur), crosshair";
        };

        this.setColour = function (colour) {
            drawingCxt.fillStyle = drawingCxt.strokeStyle = backgroundColour;
            drawingCxt.lineWidth = this.lineWidth;
            drawingCxt.lineCap = "round";
            drawingCxt.lineJoin = "round";
        };
    }
});

// define a brush like the one you use to paint the wall
var PaintBrush = new Class({
    Extends: PencilBrush,
    initialize: function (lineWidth, drawingCxt) {
        // invoke the base constructor
        this.parent(lineWidth, drawingCxt);

        // get the cursor associated with the pencil brush
        this.getCursor = function () {
            return "url(cursors/paint_cursor.cur), crosshair";
        };

        this.setColour = function (colour) {
            drawingCxt.fillStyle = drawingCxt.strokeStyle = colour;
            drawingCxt.lineWidth = this.lineWidth;
            drawingCxt.lineCap = "butt";
            drawingCxt.lineJoin = "bevel";
        };

        this.startDrawing = function (position) {
            // start drawing by moving to the specified x and y coordinates
            drawingCxt.beginPath();
            drawingCxt.moveTo(position.X, position.Y);
        };
    }
});

// define a colour pick
var ColourPicker = new Class({
    initialize: function (drawingCxt, onFinish) {
        // get the cursor associated with the pencil brush
        this.getCursor = function () {
            return "url(cursors/colour_picker_cursor.cur), crosshair";
        };

        var _colour;

        function colourToHex(colourValue) {
            var colourMap = "0123456789abcdef";
            var multiplier = Math.floor(colourValue / 16), rem = colourValue % 16;

            return colourMap[multiplier] + colourMap[rem];
        }

        this.setColour = function (colour) {
        };

        this.startDrawing = function (position) {
        };

        this.draw = function (position) {
        };

        this.finishDrawing = function (position) {
            // get the image data for the pixel
            var rgba = drawingCxt.getImageData(position.X, position.Y, 1, 1).data;

            var r = rgba[0], g = rgba[1], b = rgba[2], a = rgba[3] / 255.0;
            _colour = colourToHex(r) + colourToHex(g) + colourToHex(b);

            onFinish("#" + _colour);
        };
    }
});