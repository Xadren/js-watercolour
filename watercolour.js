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
        // Define the constant variables that are used to draw the polygon.
        var min_sides = 5;
        var max_sides = 20;
        var min_size = 10;
        var max_size = 200;
        var polygon_x_center = Math.floor(Math.random() * (1900 - 25 + 1));
        var polygon_y_center = Math.floor(Math.random() * (1020 - 25 + 1));
        var r = Math.floor(Math.random() * Math.floor(255));
        var g = Math.floor(Math.random() * Math.floor(255));
        var b = Math.floor(Math.random() * Math.floor(255));
        var opacity = Math.random() * Math.floor(1);
        var num_sides = Math.floor(Math.random() * (max_sides - min_sides + 1)) + min_sides;
        var size = Math.floor(Math.random() * (max_size - min_size + 1)) + min_size;
        var xCenter = polygon_x_center + size;
        var yCenter = polygon_y_center + size;
        // Here we set the fill style, the blend mode, and begin drawing the polygon based on a series of points.   
        // This code is based on this post - http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
        // The only tweak I really made to this was to modify to allow for the above variables to be passed in
        // rather than using hard coded values.
        var points = new Array();
        context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", " + opacity + ")";
        context.globalCompositeOperation = "lighten";
        for (var i = 0; i <= num_sides; i++) {
            var x = xCenter + (size * Math.cos(i * 2 * Math.PI / num_sides));
            var y = yCenter + (size * Math.sin(i * 2 * Math.PI / num_sides));
            points.push([x, y]);
        }
        for (var i = 0; i < 5; i++) {
            var points_with_noise = this.addNoiseToPolygon(points, 0);
            context.beginPath();
            context.moveTo(points_with_noise[0][0], points_with_noise[0][1]);
            points_with_noise.forEach(function (xy) {
                context.lineTo(xy[0], xy[1]);
            });
            context.closePath();
            context.fill();
        }
    };
    // Take an array of co-ordinates, and add 
    WaterColour.prototype.addNoiseToPolygon = function (points, recursion_depth) {
        var recursion_limit = 6;
        var points_with_noise = new Array();
        points.forEach(function (xy, index) {
            if (index + 1 < points.length) {
                var midpoint_x = (xy[0] + points[index + 1][0]) / 2;
                var midpoint_y = (xy[1] + points[index + 1][1]) / 2;
                var x1_diff_squared = Math.pow(xy[0] - midpoint_x, 2);
                var x2_diff_squared = Math.pow(points[index + 1][0] - midpoint_x, 2);
                var y1_diff_squared = Math.pow(xy[1] - midpoint_y, 2);
                var y2_diff_squared = Math.pow(points[index + 1][1] - midpoint_y, 2);
                var x_sum_of_diffs_sqaured = x1_diff_squared + x2_diff_squared;
                var y_sum_of_diffs_squared = y1_diff_squared + y2_diff_squared;
                var x_variance = x_sum_of_diffs_sqaured / 3;
                var y_variance = y_sum_of_diffs_squared / 3;
                var sigma_x = Math.sqrt(x_variance);
                var sigma_y = Math.sqrt(y_variance);
                var x3 = Math.random() * ((midpoint_x + sigma_x) - (midpoint_x - sigma_x) + 1) + (midpoint_x - sigma_x);
                var y3 = Math.random() * ((midpoint_y + sigma_y) - (midpoint_y - sigma_y) + 1) + (midpoint_y - sigma_y);
                points_with_noise.push([xy[0], xy[1]]);
                points_with_noise.push([x3, y3]);
            }
        });
        // if(recursion_depth < recursion_limit){
        //     recursion_depth++;
        //     this.addNoiseToPolygon(points_with_noise, recursion_depth);
        // } else {
        return points_with_noise;
        // }
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
    }, 2500);
});
