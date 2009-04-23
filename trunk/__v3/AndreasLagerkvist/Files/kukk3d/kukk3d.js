/**
 * Kukk3D - Javascript 3D Engine
 *
 * Copyright (c) 2009 Andreas Lagerkvist
 **/
var Kukk3D = {
	canvas:		false,	// Kukk3D Canvas
	context:	false,	// Canvas 2D Context
	objects:	[],		// Objects currently in the scene
	objectID:	0,		// Object ID tracker

	/**
	 * init
	 *
	 **/
	init: function (el, width, height) {
		if (!document.createElement('canvas').getContext) {
			alert('Your browser does not support the canvas element');

			return false;
		}

		this.canvas			= typeof(el) == 'string' ? document.getElementById(el) : el;
		this.canvas.width	= width || 640;
		this.canvas.height	= height || 480;
		this.context		= this.canvas.getContext('2d');
	}, 

	/**
	 * render
	 *
	 **/
	render: function (fillColor) {
		var numObjects = this.objects.length;
		var numVectors, i, j;

		if (fillColor) {
			this.fill(fillColor);
		}
		else {
			this.clear();
		}

		// Render every object
		for (i = 0; i < numObjects; i++) {
			numVectors = this.objects[i].vectors.length;

			// Render every vector in every object
			for (j = 0; j < numVectors; j++) {
				// Unless it's behind the camera
				if (this.objects[i].position.z + this.objects[i].vectors[j].z >= 0) {
					this.objects[i].vectors[j].xy = this.xyz2xy({
						x: this.objects[i].position.x + this.objects[i].vectors[j].x, 
						y: this.objects[i].position.y + this.objects[i].vectors[j].y, 
						z: this.objects[i].position.z + this.objects[i].vectors[j].z
					});

					this.plot(this.objects[i].vectors[j].xy.x, this.objects[i].vectors[j].xy.y, {
						r: 255, 
						g: 0, 
						b: 0, 
						a: 1 - this.objects[i].vectors[j].z / 2500
					});

				//	console.log('Rendering object:');
				//	console.dir(this.objects[i]);
				}
			}
		}
	}, 

	/**
	 * starField
	 *
	 **/
	starField: function (numStars) {
		var i;
		var self	= this;
		var num		= numStars || 500;
		var stars	= [];
		var rand	= function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		// Give all the stars random positions
		for (i = 0; i < num; i++) {
			stars[i] = {
				x:		rand(-2500, 2500), 
				y:		rand(-2500, 2500), 
				z:		rand(0, 2500)
			};
		}

		// The frame loop
		setInterval(function () {
			// Black BG
			self.fill({r: 0, g: 0, b: 0, a: 1});

			// Move and draw stars
			for (i = 0; i < num; i++) {
				if (stars[i].z < 0) {
					stars[i].z = 2500;
				}

				stars[i].z -= 100;

				stars[i].xy = self.xyz2xy(stars[i]);

				self.plot(stars[i].xy.x, stars[i].xy.y, {
					r: 255, 
					g: 255, 
					b: 255, 
					a: 1 - stars[i].z / 2500
				});
			}
		}, 25);
	}, 

	/**
	 * xyz2xy
	 *
	 **/
	xyz2xy: function (xyz) {
		var halfW = this.canvas.width / 2;
		var halfH = this.canvas.height / 2;

		return {
			x: Math.round(halfW * (xyz.x / xyz.z) + halfW), 
			y: Math.round(halfH * (xyz.y / xyz.z) + halfH)
		};
	}, 

	/**
	 * plot
	 *
	 **/
	plot: function (x, y, c) {
		if (x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height) {
			return false;
		}

		this.context.fillStyle = 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

		this.context.fillRect(x, y, 1, 1);
	}, 

	/**
	 * fill
	 *
	 **/
	fill: function (c) {
		this.context.fillStyle = 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);	
	}, 

	/**
	 * clear
	 *
	 **/
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);	
	}, 

	/**
	 * addObject
	 *
	 **/
	addObject: function (object) {
		return this.objects[this.objects.push({
			objectID:	++this.objectID, 
			vectors:	object.vectors, 
			position:	object.position, 
			rotation:	object.rotation
		})-1];
	}, 

	/**
	 * removeObject
	 *
	 **/
	removeObject: function (id) {
		var numObjects = this.objects.length;

		for (var i = 0; i < numObjects; i++) {
			if (this.objects[i].objectID == id) {
				this.objects.splice(i, 1);

				return true;
			}
		}

		return false;
	}
};