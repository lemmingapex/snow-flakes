class Flake {
	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.reset();
		this.y = Math.round(Math.random()*this.canvasHeight);
		this.color = "#EFF";
	}

	reset() {
		this.x = Math.round(Math.random()*this.canvasWidth);
		this.y = 0;
		this.s = 0.1*Math.random() + 0.05;
		this.cs = this.s;
		this.radius = Math.round(Math.random()*3);
		this.speed = Math.random() + Math.sqrt(this.radius);
		this.wind = 1;
	}

	takeStep() {
		this.y += this.speed;
		if(this.y >= this.canvasHeight) {
			this.reset();
		} else {
			const dx = this.wind + this.speed * Math.cos(this.cs)+Math.sin(this.cs)*Math.random();
			this.x = (this.x + dx + this.canvasWidth)%this.canvasWidth;
			this.cs += this.s;
		}
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, 0);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

let _flakes = [];
let _canvas;
let _ctx;

function render() {
	_ctx.fillStyle = "#040444";
	_ctx.fillRect(0, 0, _canvas.width, _canvas.height);
	for(let flake of _flakes) {
		flake.takeStep();
		flake.draw(_ctx);
	}

	window.requestAnimationFrame(render, _canvas);
}

function init() {
	const numberOfFlakes = 250;

	_canvas = document.getElementById('canvas');
	_canvas.style.left = "0px";
	_canvas.style.top = "0px";
	_canvas.style.width = "100%";
	_canvas.style.height = "100%";
	_canvas.style.zIndex = 0;
	_canvas.width = _canvas.offsetWidth;
	_canvas.height = _canvas.offsetHeight;

	_ctx = _canvas.getContext('2d');

	for(let i=0; i<numberOfFlakes; i++) {
		_flakes.push(new Flake(_canvas.width, _canvas.height));
	}
	render();
}

window.onload = init;
