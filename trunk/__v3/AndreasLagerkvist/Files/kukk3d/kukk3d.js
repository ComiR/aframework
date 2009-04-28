/**
 * Kukk3D - Javascript 3D Engine
 *
 * Copyright (c) 2009 Andreas Lagerkvist
 **/
var Kukk3D = {
	canvas:			false,	// Kukk3D Canvas
	context:		false,	// Canvas 2D Context
	objects:		[],		// Objects currently in the scene
	objectID:		0,		// Object ID tracker
	drawDistance:	2500,	// Draw distance (max z-index)
	camera:			{		// Kukk3D Camera
		position: {
			x: 0, 
			y: 0, 
			z: 0
		}, 
		rotation: {
			x: 0, 
			y: 0, 
			z: 0
		}
	}, 

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
		var numVectors, i, j, transformedObject;

		if (fillColor) {
			this.fillScene(fillColor);
		}
		else {
			this.clearScene();
		}

		// Render every object
		for (i = 0; i < numObjects; i++) {
			numVectors = this.objects[i].vectors.length;

			// Render every vector in every object
			for (j = 0; j < numVectors; j++) {
				transformedVector = this.transformVectorInObject(this.objects[i].vectors[j], this.objects[i]);

				// Unless it's behind the viewport
				if (transformedVector.z >= 0) {
					// Turn X, Y and Z into just X and Y
					transformedVector.xy = this.xyz2xy({
						x: transformedVector.x, 
						y: transformedVector.y, 
						z: transformedVector.z
					});

					// And plot the vector
					this.plot(transformedVector.xy.x, transformedVector.xy.y, {
						r: 255, 
						g: 0, 
						b: 0, 
						a: 1 - this.objects[i].vectors[j].z / this.drawDistance // Opacity based on distance
					});
				}
			}
		}
	}, 

	/**
	 * transformVectorInObject
	 *
	 **/
	transformVectorInObject: function (vector, object) {
		// Create new vector with object and camera position and object scale
		var newVector = {
			x: object.position.x + vector.x * object.scale.x - this.camera.position.x, 
			y: object.position.y + vector.y * object.scale.y - this.camera.position.y, 
			z: object.position.z + vector.z * object.scale.z - this.camera.position.z
		};

		// Object and camera rotation

		return newVector;
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
	 * fillScene
	 *
	 **/
	fillScene: function (c) {
		this.context.fillStyle = 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);	
	}, 

	/**
	 * clearScene
	 *
	 **/
	clearScene: function () {
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
			rotation:	object.rotation, 
			scale:		object.scale
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
				z:		rand(0, this.drawDistance)
			};
		}

		// The frame loop
		setInterval(function () {
			// Black BG
			self.fillScene({r: 0, g: 0, b: 0, a: 1});

			// Move and draw stars
			for (i = 0; i < num; i++) {
				if (stars[i].z < 0) {
					stars[i].z = self.drawDistance;
				}

				stars[i].z -= 100;

				stars[i].xy = self.xyz2xy(stars[i]);

				self.plot(stars[i].xy.x, stars[i].xy.y, {
					r: 255, 
					g: 255, 
					b: 255, 
					a: 1 - stars[i].z / this.drawDistance
				});
			}
		}, 25);
	}
};