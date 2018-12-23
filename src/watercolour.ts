class WaterColour{
    constructor(public canvas: HTMLCanvasElement, public context: CanvasRenderingContext2D){
        this.canvas = canvas;
        this.context = context;
    }

    draw(){
        for(let i = 0; i < 10; i++){
            this.drawPolygon(this.context);
        }
        return;
    }
    // Draws a polygon at a random x/y position with a random amount of sides with a random size.
    drawPolygon(context: CanvasRenderingContext2D){
        // Define the constant variables that are used to draw the polygon.
        const min_sides: number =  5;
        const max_sides: number = 20;
        const min_size: number = 10;
        const max_size: number = 200;
        const polygon_x_center: number = Math.floor(Math.random() * (1900 - 25 + 1));
        const polygon_y_center: number = Math.floor(Math.random() * (1020 - 25 + 1));
        const r: number = Math.floor(Math.random() * Math.floor(255));
        const g: number = Math.floor(Math.random() * Math.floor(255));
        const b: number = Math.floor(Math.random() * Math.floor(255));
        const opacity: number = Math.random() * Math.floor(1);
        const num_sides = Math.floor(Math.random() * (max_sides - min_sides + 1)) + min_sides;
        const size: number = Math.floor(Math.random() * (max_size - min_size + 1)) + min_size;
        const xCenter: number = polygon_x_center + size;
        const yCenter: number = polygon_y_center + size;

        // Here we set the fill style, the blend mode, and begin drawing the polygon based on a series of points.   
        // This code is based on this post - http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
        // The only tweak I really made to this was to modify to allow for the above variables to be passed in
        // rather than using hard coded values.
        const points: number[][] = new Array();
        context.fillStyle = `rgb(${r}, ${g}, ${b}, ${opacity})`;
        context.globalCompositeOperation = "lighten";
        
        for(let i = 0; i <= num_sides; i++){
            let x: number = xCenter + (size * Math.cos(i * 2 * Math.PI / num_sides));
            let y: number = yCenter + (size * Math.sin(i * 2 * Math.PI / num_sides));
            points.push([x, y]);
        }
        
        for(let i = 0; i < 5; i++){
            let points_with_noise: number[][] = this.addNoiseToPolygon(points, 0);
            context.beginPath();
            context.moveTo(points_with_noise[0][0], points_with_noise[0][1]);
            points_with_noise.forEach(xy => {
                context.lineTo(xy[0], xy[1]);
            })
            context.closePath();
            context.fill();
        }
    }

    // Take an array of co-ordinates, and add 
    addNoiseToPolygon(points: number[][], recursion_depth: number){
        const recursion_limit = 6;
        let points_with_noise: number[][] = new Array();
        points.forEach((xy, index) => {
            if(index + 1 < points.length){
                let midpoint_x: number = (xy[0] + points[index+1][0])/2;
                let midpoint_y: number = (xy[1] + points[index+1][1])/2;
                let x1_diff_squared = Math.pow(xy[0] - midpoint_x, 2);
                let x2_diff_squared = Math.pow(points[index + 1][0] - midpoint_x, 2);
                let y1_diff_squared = Math.pow(xy[1] - midpoint_y, 2);
                let y2_diff_squared = Math.pow(points[index + 1][1] - midpoint_y, 2);
                let x_sum_of_diffs_sqaured = x1_diff_squared + x2_diff_squared;
                let y_sum_of_diffs_squared = y1_diff_squared + y2_diff_squared;
                let x_variance = x_sum_of_diffs_sqaured/3;
                let y_variance = y_sum_of_diffs_squared/3;
                let sigma_x = Math.sqrt(x_variance);
                let sigma_y = Math.sqrt(y_variance);

                let x3: number = Math.random() * ((midpoint_x + sigma_x) - (midpoint_x - sigma_x) + 1) + (midpoint_x - sigma_x);
                let y3: number = Math.random() * ((midpoint_y + sigma_y) - (midpoint_y - sigma_y) + 1) + (midpoint_y - sigma_y);

                points_with_noise.push([xy[0], xy[1]]);
                points_with_noise.push([x3, y3]);
            }
        })

        // if(recursion_depth < recursion_limit){
        //     recursion_depth++;
        //     this.addNoiseToPolygon(points_with_noise, recursion_depth);
        // } else {
            return points_with_noise;
        // }
    }
}

document.addEventListener("DOMContentLoaded", function(event){
    const canvas = <HTMLCanvasElement>document.getElementById("tutorial");
    const canvas_width = window.screen.width;
    const canvas_height = window.screen.height;
    const pixel_ratio = window.devicePixelRatio || 1;

    canvas.width = canvas_width * pixel_ratio;
    canvas.height = canvas_height * pixel_ratio;
    canvas.style.width = `${canvas_width}px`;
    canvas.style.height = `${canvas_height}px`;

    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false; /// future
    context.scale(pixel_ratio, pixel_ratio);

    let waterColour = new WaterColour(canvas, context);
    
    setInterval(() => {
        waterColour.drawPolygon(context)
    }, 2500);
})
