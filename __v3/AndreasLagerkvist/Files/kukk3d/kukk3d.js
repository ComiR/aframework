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
		var numVectors, i, j, transformedVectors;

		if (fillColor) {
			this.fillScene(fillColor);
		}
		else {
			this.clearScene();
		}

		// Go through every object
		for (i = 0; i < numObjects; i++) {
			transformedVectors	= [];
			numVectors			= this.objects[i].vectors.length;

			// Transform every vector in the object
			for (j = 0; j < numVectors; j++) {
				transformedVectors[j] = this.transformVectorInObject(this.objects[i].vectors[j], this.objects[i]);

				// Turn X, Y and Z into just X and Y
				transformedVectors[j].xy = this.xyz2xy({
					x: transformedVectors[j].x, 
					y: transformedVectors[j].y, 
					z: transformedVectors[j].z
				});
			}

			// Wireframe with lines
			if (this.objects[i].lines.length) {
				var numLines = this.objects[i].lines.length;

				for (j = 0; j < numLines; j++) {
					this.drawLine(
						transformedVectors[ this.objects[i].lines[j].a ].xy.x, 
						transformedVectors[ this.objects[i].lines[j].a ].xy.y, 
						transformedVectors[ this.objects[i].lines[j].b ].xy.x, 
						transformedVectors[ this.objects[i].lines[j].b ].xy.y, 
						this.objects[i].color
					);
				}
			}
			// Solid (can also be wireframe)
			else if (this.objects[i].faces.length) {
				
			}
			// Dots (no lines or faces specified)
		//	else {
				for (j = 0; j < numVectors; j++) {
					this.plot(transformedVectors[j].xy.x, transformedVectors[j].xy.y, {
						r: 255, 
						g: 0, 
						b: 0, 
						a: 1 - this.objects[i].vectors[j].z / this.drawDistance // Opacity based on distance
					});
				}
		//	}
		}
	}, 

	/**
	 * transformVectorInObject
	 *
	 **/
	transformVectorInObject: function (vector, object) {
		// Create new vector and scale it
		var newVector = {
			x: vector.x * object.scale.x, 
			y: vector.y * object.scale.y, 
			z: vector.z * object.scale.z
		};

		// Rotate object around self
		newVector = this.multiplyVectorNMatrix(newVector, this.calculateRotationMatrix(object.rotation));

		// Move vector to its 'real' positin
		newVector.x += object.position.x - this.camera.position.x;
		newVector.y += object.position.y - this.camera.position.y;
		newVector.z += object.position.z - this.camera.position.z;

		// Rotate object around camera
		newVector = this.multiplyVectorNMatrix(newVector, this.calculateRotationMatrix(this.camera.rotation));

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
	 * drawLine
	 *
	 **/
	drawLine: function (x1, y1, x2, y2, c) {
		if (x1 < 0 || x1 > this.canvas.width || y1 < 0 || y1 > this.canvas.height || x2 < 0 || x2 > this.canvas.width || y2 < 0 || y2 > this.canvas.height) {
			return false;
		}

		this.context.fillStyle = 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, x2);
		this.context.closePath();
		this.context.stroke();
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
			color:		object.color || {r: 255, g: 0, b: 0, a: 1}, 
			position:	object.position || {x: 0, y: 0, z: 0}, 
			rotation:	object.rotation || {x: 0, y: 0, z: 0},
			scale:		object.scale || {x: 0, y: 0, z: 0},
			vectors:	object.vectors, 
			lines:		object.lines, 
			faces:		object.faces
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
	 * calculateRotationMatrix
	 *
	 **/
	calculateRotationMatrix: function (rotation) {
		var rotX = this.calculateRotationMatrixForAxis(rotation.x, 'x');
		var rotY = this.calculateRotationMatrixForAxis(rotation.y, 'y');
		var rotZ = this.calculateRotationMatrixForAxis(rotation.z, 'z');

		rotZ = this.multiplyMatrixNMatrix(rotZ, rotY);

		return this.multiplyMatrixNMatrix(rotZ, rotX);
	},

	/**
	 * calculateRotationMatrixForAxis
	 *
	 **/
	calculateRotationMatrixForAxis: function (degrees, axis) {
		var radians	= degrees * Math.PI / 180;
		var sin		= Math.sin(radians);
		var cos		= Math.cos(radians);

		switch (axis.toLowerCase()) {
			case 'y' : 
				return [
					{x: 1, y: 0, z: 0}, 
					{x: 0, y: cos, z: -sin}, 
					{x: 0, y: sin, z: cos}
				];
			case 'x' : 
				return [
					{x: cos, y: 0, z: sin}, 
					{x: 0, y: 1, z: 0}, 
					{x: -sin, y: 0, z: cos}
				];
			case 'z' : 
				return [
					{x: cos, y: -sin, z: 0}, 
					{x: sin, y: cos, z: 0}, 
					{x: 0, y: 0, z: 1}
				];
		}
	},

	/**
	 * multiplyMatrixNMatrix
	 *
	 **/
	multiplyMatrixNMatrix: function (m1, m2) {
		return [
			{
				x: m1[0].x * m2[0].x + m1[0].y * m2[1].x + m1[0].z * m2[2].x, 
				y: m1[0].x * m2[0].y + m1[0].y * m2[1].y + m1[0].z * m2[2].y, 
				z: m1[0].x * m2[0].z + m1[0].z * m2[1].z + m1[0].z * m2[2].z
			}, 
			{
				x: m1[1].x * m2[0].x + m1[1].y * m2[1].x + m1[1].z * m2[2].x, 
				y: m1[1].x * m2[0].y + m1[1].y * m2[1].y + m1[1].z * m2[2].y, 
				z: m1[1].x * m2[0].z + m1[1].z * m2[1].z + m1[1].z * m2[2].z
			}, 
			{
				x: m1[2].x * m2[0].x + m1[2].y * m2[1].x + m1[2].z * m2[2].x, 
				y: m1[2].x * m2[0].y + m1[2].y * m2[1].y + m1[2].z * m2[2].y, 
				z: m1[2].x * m2[0].z + m1[2].z * m2[1].z + m1[2].z * m2[2].z
			}
		];
	}, 

	/**
	 * multiplyVectorNMatrix
	 *
	 **/
	multiplyVectorNMatrix: function (v, m) {
		return {
			x: v.x * m[0].x + v.y * m[0].y + v.z * m[0].z, 
			y: v.x * m[1].x + v.y * m[1].y + v.z * m[1].z, 
			z: v.x * m[2].x + v.y * m[2].y + v.z * m[2].z
		};
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