var WaterColour = /** @class */ (function () {
    function WaterColour(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.canvas = canvas;
        this.context = context;
    }
    WaterColour.prototype.draw = function () {
        for (var i = 0; i < 10; i++) {
            this.drawPolygon(this.context);
        }
        return;
    };
    // Draws a polygon at a random x/y position with a random amount of sides with a random size.
    WaterColour.prototype.drawPolygon = function (context) {
        var min_sides = 5;
        var max_sides = 20;
        var min_size = 10;
        var max_size = 200;
        var polygon_x_center = Math.floor(Math.random() * (1900 - 25 + 1)) + 25;
        var polygon_y_center = Math.floor(Math.random() * (1020 - 25 + 1)) + 25;
        var r = Math.floor(Math.random() * Math.floor(255));
        var g = Math.floor(Math.random() * Math.floor(255));
        var b = Math.floor(Math.random() * Math.floor(255));
        var opacity = Math.random() * Math.floor(1);
        // debugger;
        var num_sides = Math.floor(Math.random() * (max_sides - min_sides + 1)) + min_sides;
        var size = Math.floor(Math.random() * (max_size - min_size + 1)) + min_size;
        var xCenter = polygon_x_center + size;
        var yCenter = polygon_y_center + size;
        context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        context.globalCompositeOperation = "lighten";
        context.beginPath();
        context.moveTo(xCenter + size * Math.cos(0), yCenter + size * Math.sin(0));
        for (var i = 0; i <= num_sides; i++) {
            context.lineTo(xCenter + (size * Math.cos(i * 2 * Math.PI / num_sides)), yCenter + size * Math.sin(i * 2 * Math.PI / num_sides));
        }
        context.closePath();
        context.fill();
    };
    return WaterColour;
}());
document.addEventListener("DOMContentLoaded", function (event) {
    var canvas = document.getElementById("tutorial");
    var canvas_width = window.screen.width;
    var canvas_height = window.screen.height;
    var pixel_ratio = window.devicePixelRatio || 1;
    canvas.width = canvas_width * pixel_ratio;
    canvas.height = canvas_height * pixel_ratio;
    canvas.style.width = canvas_width + "px";
    canvas.style.height = canvas_height + "px";
    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false; /// future
    context.scale(pixel_ratio, pixel_ratio);
    var waterColour = new WaterColour(canvas, context);
    setInterval(function () {
        waterColour.drawPolygon(context);
    }, 500);
    // waterColour.draw(); 
});
