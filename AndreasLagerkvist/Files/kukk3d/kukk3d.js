/**
 * Kukk3D - Javascript 3D Engine
 *
 * Copyright (c) 2009 Andreas Lagerkvist
 **/
var Kukk3D = {
	canvas:			false,	// Kukk3D Canvas
	context:		false,	// Canvas 2D Context
	objects:		[],		// Objects currently in the scene
	test:			[],
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
		var i, j, numVectors, numLines, numFaces, transformedVectors;

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
			for (j in this.objects[i].vectors) {
				transformedVectors[j] = this.transformVectorInObject(this.objects[i].vectors[j], this.objects[i]);

				// Turn X, Y and Z into just X and Y
				transformedVectors[j].xy = this.xyz2xy({
					x: transformedVectors[j].x, 
					y: transformedVectors[j].y, 
					z: transformedVectors[j].z
				});
			}

			// Solid (can also be wireframe)
			if (this.objects[i].drawFaces && this.objects[i].faces.length) {
				numFaces = this.objects[i].faces.length;

				for (j in this.objects[i].faces) {
					this.drawFace(
						transformedVectors[ this.objects[i].faces[j].a ].xy.x, 
						transformedVectors[ this.objects[i].faces[j].a ].xy.y, 
						transformedVectors[ this.objects[i].faces[j].b ].xy.x, 
						transformedVectors[ this.objects[i].faces[j].b ].xy.y, 
						transformedVectors[ this.objects[i].faces[j].c ].xy.x, 
						transformedVectors[ this.objects[i].faces[j].c ].xy.y, 
						transformedVectors[ this.objects[i].faces[j].d ].xy.x, 
						transformedVectors[ this.objects[i].faces[j].d ].xy.y, 
						{
							r: this.objects[i].fColor.r, 
							g: this.objects[i].fColor.g, 
							b: this.objects[i].fColor.b, 
							a: this.objects[i].fColor.a - this.objects[i].fColor.a * (transformedVectors[ this.objects[i].faces[j].a ].z / this.drawDistance)
						}, 
						this.objects[i].faceWire
					);
				}
			}

			// Wireframe with lines
			if (this.objects[i].drawLines && this.objects[i].lines.length) {
				numLines = this.objects[i].lines.length;

				for (j in this.objects[i].lines) {
					this.drawLine(
						transformedVectors[ this.objects[i].lines[j].a ].xy.x, 
						transformedVectors[ this.objects[i].lines[j].a ].xy.y, 
						transformedVectors[ this.objects[i].lines[j].b ].xy.x, 
						transformedVectors[ this.objects[i].lines[j].b ].xy.y, 
						{
							r: this.objects[i].lColor.r, 
							g: this.objects[i].lColor.g, 
							b: this.objects[i].lColor.b, 
							a: this.objects[i].lColor.a - this.objects[i].lColor.a * (transformedVectors[ this.objects[i].lines[j].a ].z / this.drawDistance)
						}
					);
				}
			}

			// Dots
			if (this.objects[i].drawVectors) {
				for (j in this.objects[i].vectors) {
					this.plot(transformedVectors[j].xy.x, transformedVectors[j].xy.y, {
						r: this.objects[i].vColor.r, 
						g: this.objects[i].vColor.g, 
						b: this.objects[i].vColor.b, 
						a: this.objects[i].vColor.a - this.objects[i].vColor.a * (transformedVectors[j].z / this.drawDistance)
					}, this.objects[i].vectorSize);
				}
			}
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
	plot: function (x, y, c, size) {
		var s	= size || 5;
		var hs	= Math.round(s / 2);

		this.context.fillStyle = 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

		this.context.fillRect(x - hs, y - hs, s, s);
	}, 

	/**
	 * drawLine
	 *
	 **/
	drawLine: function (x1, y1, x2, y2, c) {
		this.context.strokeStyle = 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.closePath();
		this.context.stroke();
	}, 

	/**
	 * drawLine
	 * TODO: variable number of corners (could be triangle)
	 **/
	drawFace: function (x1, y1, x2, y2, x3, y3, x4, y4, c, wireframe) {
		this.context.strokeStyle	= 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';
		this.context.fillStyle		= 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.lineTo(x3, y3);
		this.context.lineTo(x4, y4);
		this.context.closePath();

		if (wireframe) {
			this.context.stroke();
		}
		else {
			this.context.fill();
		}
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
		var numObjects = this.objects.length;

		this.objects[numObjects] = {
			vectorSize:		object.vectorSize	|| 1,

			vColor:			object.vColor		|| {r: 255, g: 0, b: 0, a: 1}, 
			lColor:			object.lColor		|| {r: 0, g: 255, b: 0, a: 1}, 
			fColor:			object.fColor		|| {r: 0, g: 0, b: 255, a: 1}, 

			position:		object.position		|| {x: 0, y: 0, z: 1000}, 
			rotation:		object.rotation		|| {x: 0, y: 0, z: 0},
			scale:			object.scale		|| {x: 1, y: 1, z: 1},

			lines:			object.lines		|| [], 
			faces:			object.faces		|| [],
			vectors:		object.vectors,

			drawVectors:	(typeof(object.drawVectors) != 'undefined' && object.drawVectors	=== false) ? false : true, 
			drawLines:		(typeof(object.drawLines)	!= 'undefined' && object.drawLines		=== false) ? false : true, 
			drawFaces:		(typeof(object.drawFaces)	!= 'undefined' && object.drawFaces		=== false) ? false : true, 

			faceWire:		object.faceWire ? (object.faceWire && object.faceWire === false ? false : true) : false
		};

		return this.objects[numObjects];
	}, 

	/**
	 * removeObject
	 *
	 **/
	removeObject: function (id) {
		this.objects.splice(id, 1);
	},

	/**
	 * calculateRotationMatrix
	 *
	 **/
	calculateRotationMatrix: function (rotation) {
		var rotX = this.calculateRotationMatrixForAxis(rotation.x, 'x');
		var rotY = this.calculateRotationMatrixForAxis(rotation.y, 'y');
		var rotZ = this.calculateRotationMatrixForAxis(rotation.z, 'z');

		return this.multiplyMatrixNMatrix(this.multiplyMatrixNMatrix(rotZ, rotY), rotX);
	},

	/**
	 * calculateRotationMatrixForAxis
	 *
	 **/
	calculateRotationMatrixForAxis: function (degrees, axis) {
		var radians	= degrees * Math.PI / 180;
		var sin		= Math.sin(radians);
		var cos		= Math.cos(radians);

		switch (axis) {
			case 'x' : 
				return [
					{x: 1, y: 0, z: 0}, 
					{x: 0, y: cos, z: -sin}, 
					{x: 0, y: sin, z: cos}
				];
			case 'y' : 
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

	objectSkeletons: {
		cube: function () {
			return {
				drawVectors:	true,
				drawLines:		true,
				drawFaces:		true,
				faceWire:		false,
				vectorSize:		7, // uneven number
				vColor: {
					r: 255, g: 0, b: 0, a: 1
				}, 
				lColor: {
					r: 0, g: 255, b: 0, a: 1
				}, 
				fColor: {
					r: 0, g: 0, b: 255, a: .4
				}, 
				position: {
					x: 0, y: 0, z: 1000
				}, 
				rotation: {
					x: 0, y: 0, z: 0
				}, 
				scale: {
					x: 1, y: 1, z: 1
				}, 
				vectors: [
					{x: -100,	y: -200,	z: -100}, 
					{x: 100,	y: -200,	z: -100}, 
					{x: 100,	y: 200,		z: -100}, 
					{x: -100,	y: 200,		z: -100}, 
					{x: -100,	y: -200,	z: 100}, 
					{x: 100,	y: -200,	z: 100}, 
					{x: 100,	y: 200,		z: 100}, 
					{x: -100,	y: 200,		z: 100}
				], 
				lines: [
					{a: 0,	b: 1}, 
					{a: 1,	b: 2}, 
					{a: 2,	b: 3},
					{a: 3,	b: 0}, 

					{a: 4,	b: 5}, 
					{a: 5,	b: 6}, 
					{a: 6,	b: 7}, 
					{a: 7,	b: 4}, 

					{a: 0,	b: 4}, 
					{a: 1,	b: 5}, 
					{a: 2,	b: 6}, 
					{a: 3,	b: 7}
				], 
				faces: [
					{a: 0,	b: 1, c: 2, d: 3}, 
					{a: 4,	b: 5, c: 6, d: 7}, 
					{a: 0,	b: 4, c: 7, d: 3}, 
					{a: 1,	b: 5, c: 6, d: 2}, 
					{a: 0,	b: 4, c: 5, d: 1}, 
					{a: 3,	b: 7, c: 6, d: 2}
				]
			};
		}, 

		sphere: function (_sides, _segments, _radius) {
			var sides		= _sides	|| 12;
			var segments	= _segments	|| 6;
			var radius		= _radius	|| 250;
			var object		= {vectors: [], lines: []};
			var aStep		= 1.0 / segments;
			var bStep		= 1.0 / sides;

			var i, j, a, b, rxy, rz;

			// Create vectors
			for (i = 0, a = 0; i <= segments; i++, a += aStep) {
				for (j = 0, b = 0; j < sides; j++, b += bStep) {
					rxy = Math.sin(a * Math.PI) * radius;
					rz  = Math.cos(a * Math.PI) * radius;

					object.vectors[i * sides + j] = {
						x: Math.cos(b * Math.PI * 2) * rxy, 
						y: Math.sin(b * Math.PI * 2) * rxy, 
						z: rz
					};
				}
			}

			// Create lines
			for (i = 0; i <= segments; i++) {
				for (j = 0; j < sides - 1; j++) {
					object.lines[i * sides + j] = {
						a: i * sides + j, 
						b: i * sides + j + 1
					};
				}

				// lägg till den sista manuellt... den går ju från den sista till den första igen
				object.lines[i * sides + sides - 1] = {
					a: i * sides + sides - 1, 
					b: i * sides + 0
				};
			}
	
			// de linjer som går mellan segmenten
			for (i = 0; i < segments; i++) {
				for (j = 0; j < sides; j++) {
					// lägg på det som användes för ringarna   |  vanlig	vanlig + en hel ring
					object.lines[(i * sides + j) + segments * sides + sides] = {
						a: i * sides + j,
						b: i * sides + j + sides
					};
				}
			}

			object.drawFaces = false;

			return object;
		}
	}
};