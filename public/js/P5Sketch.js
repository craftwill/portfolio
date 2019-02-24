export class P5Sketch {
    constructor() {
        this.p5 = new p5(function (p) {
            p.setup = function () {
                p.createCanvas(600, 600);
                var
                    htmlCanvas = document.getElementById('defaultCanvas0'),
                    context = htmlCanvas.getContext('2d'),

                    relativeX = 150,
                    relativeY = 150,

                    mvmtX = 0,
                    mvmtY = 0;

                htmlCanvas.style = "";
                initialize();

                function initialize() {
                    window.addEventListener('resize', resizeCanvas, false);
                    resizeCanvas();
                }

                function resizeCanvas() {
                    htmlCanvas.width = window.innerWidth;
                    htmlCanvas.height = window.innerHeight;
                }
            }
            p.draw = function () {
                p.ellipse(window.innerWidth / 2, window.innerHeight / 2, 40, 40);
            }
        }, "sketch1");
    }
}
