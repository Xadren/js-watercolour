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
        const min_sides: number =  5;
        const max_sides: number = 20;
        const min_size: number = 10;
        const max_size: number = 200;
        const polygon_x_center: number = Math.floor(Math.random() * (1900 - 25 + 1)) + 25;
        const polygon_y_center: number = Math.floor(Math.random() * (1020 - 25 + 1)) + 25;
        const r: number = Math.floor(Math.random() * Math.floor(255));
        const g: number = Math.floor(Math.random() * Math.floor(255));
        const b: number = Math.floor(Math.random() * Math.floor(255));
        const opacity: number = Math.random() * Math.floor(1);
        // debugger;
        
        let num_sides = Math.floor(Math.random() * (max_sides - min_sides + 1)) + min_sides;
        let size: number = Math.floor(Math.random() * (max_size - min_size + 1)) + min_size;


        let xCenter: number = polygon_x_center + size;
        let yCenter: number = polygon_y_center + size;

        context.fillStyle = `rgb(${r}, ${g}, ${b}, ${opacity})`;
        context.globalCompositeOperation = "lighten";
        context.beginPath();
        context.moveTo(xCenter + size * Math.cos(0), yCenter + size * Math.sin(0));
        
        for(let i = 0; i <= num_sides; i++){
            context.lineTo(xCenter + (size * Math.cos(i * 2 * Math.PI / num_sides)), yCenter + size * Math.sin(i * 2 * Math.PI / num_sides));
        }

        context.closePath();
        context.fill();
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
    }, 500);
    // waterColour.draw(); 
})