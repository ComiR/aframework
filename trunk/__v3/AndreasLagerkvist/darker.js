

/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/1-jquery-1.3.2.js ] ==== */
/*!
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){

var 
	// Will speed up references to window, and allows munging its name.
	window = this,
	// Will speed up references to undefined, and allows munging its name.
	undefined,
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,
	// Map over the $ in case of overwrite
	_$ = window.$,

	jQuery = window.jQuery = window.$ = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context );
	},

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		// Make sure that a selection was provided
		selector = selector || document;

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this[0] = selector;
			this.length = 1;
			this.context = selector;
			return this;
		}
		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			var match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] )
					selector = jQuery.clean( [ match[1] ], context );

				// HANDLE: $("#id")
				else {
					var elem = document.getElementById( match[3] );

					// Handle the case where IE and Opera return items
					// by name instead of ID
					if ( elem && elem.id != match[3] )
						return jQuery().find( selector );

					// Otherwise, we inject the element directly into the jQuery object
					var ret = jQuery( elem || [] );
					ret.context = document;
					ret.selector = selector;
					return ret;
				}

			// HANDLE: $(expr, [context])
			// (which is just equivalent to: $(content).find(expr)
			} else
				return jQuery( context ).find( selector );

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) )
			return jQuery( document ).ready( selector );

		// Make sure that old selector state is passed along
		if ( selector.selector && selector.context ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return this.setArray(jQuery.isArray( selector ) ?
			selector :
			jQuery.makeArray(selector));
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.3.2",

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num === undefined ?

			// Return a 'clean' array
			Array.prototype.slice.call( this ) :

			// Return just the object
			this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = jQuery( elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" )
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		else if ( name )
			ret.selector = this.selector + "." + name + "(" + selector + ")";

		// Return the newly-formed element set
		return ret;
	},

	// Force the current matched set of elements to become
	// the specified array of elements (destroying the stack in the process)
	// You should use pushStack() in order to do this, but maintain the stack
	setArray: function( elems ) {
		// Resetting the length to 0, then using the native Array push
		// is a super-fast way to populate an object with array-like properties
		this.length = 0;
		Array.prototype.push.apply( this, elems );

		return this;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem && elem.jquery ? elem[0] : elem
		, this );
	},

	attr: function( name, value, type ) {
		var options = name;

		// Look for the case where we're accessing a style value
		if ( typeof name === "string" )
			if ( value === undefined )
				return this[0] && jQuery[ type || "attr" ]( this[0], name );

			else {
				options = {};
				options[ name ] = value;
			}

		// Check to see if we're setting style values
		return this.each(function(i){
			// Set all the styles
			for ( name in options )
				jQuery.attr(
					type ?
						this.style :
						this,
					name, jQuery.prop( this, options[ name ], type, i, name )
				);
		});
	},

	css: function( key, value ) {
		// ignore negative width and height values
		if ( (key == 'width' || key == 'height') && parseFloat(value) < 0 )
			value = undefined;
		return this.attr( key, value, "curCSS" );
	},

	text: function( text ) {
		if ( typeof text !== "object" && text != null )
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );

		var ret = "";

		jQuery.each( text || this, function(){
			jQuery.each( this.childNodes, function(){
				if ( this.nodeType != 8 )
					ret += this.nodeType != 1 ?
						this.nodeValue :
						jQuery.fn.text( [ this ] );
			});
		});

		return ret;
	},

	wrapAll: function( html ) {
		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).clone();

			if ( this[0].parentNode )
				wrap.insertBefore( this[0] );

			wrap.map(function(){
				var elem = this;

				while ( elem.firstChild )
					elem = elem.firstChild;

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		return this.each(function(){
			jQuery( this ).contents().wrapAll( html );
		});
	},

	wrap: function( html ) {
		return this.each(function(){
			jQuery( this ).wrapAll( html );
		});
	},

	append: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.appendChild( elem );
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.insertBefore( elem, this.firstChild );
		});
	},

	before: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this );
		});
	},

	after: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});
	},

	end: function() {
		return this.prevObject || jQuery( [] );
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: [].push,
	sort: [].sort,
	splice: [].splice,

	find: function( selector ) {
		if ( this.length === 1 ) {
			var ret = this.pushStack( [], "find", selector );
			ret.length = 0;
			jQuery.find( selector, this[0], ret );
			return ret;
		} else {
			return this.pushStack( jQuery.unique(jQuery.map(this, function(elem){
				return jQuery.find( selector, elem );
			})), "find", selector );
		}
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function(){
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML;
				if ( !html ) {
					var div = this.ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0];
			} else
				return this.cloneNode(true);
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			var orig = this.find("*").andSelf(), i = 0;

			ret.find("*").andSelf().each(function(){
				if ( this.nodeName !== orig[i].nodeName )
					return;

				var events = jQuery.data( orig[i], "events" );

				for ( var type in events ) {
					for ( var handler in events[ type ] ) {
						jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
					}
				}

				i++;
			});
		}

		// Return the cloned set
		return ret;
	},

	filter: function( selector ) {
		return this.pushStack(
			jQuery.isFunction( selector ) &&
			jQuery.grep(this, function(elem, i){
				return selector.call( elem, i );
			}) ||

			jQuery.multiFilter( selector, jQuery.grep(this, function(elem){
				return elem.nodeType === 1;
			}) ), "filter", selector );
	},

	closest: function( selector ) {
		var pos = jQuery.expr.match.POS.test( selector ) ? jQuery(selector) : null,
			closer = 0;

		return this.map(function(){
			var cur = this;
			while ( cur && cur.ownerDocument ) {
				if ( pos ? pos.index(cur) > -1 : jQuery(cur).is(selector) ) {
					jQuery.data(cur, "closest", closer);
					return cur;
				}
				cur = cur.parentNode;
				closer++;
			}
		});
	},

	not: function( selector ) {
		if ( typeof selector === "string" )
			// test special case where just one selector is passed in
			if ( isSimple.test( selector ) )
				return this.pushStack( jQuery.multiFilter( selector, this, true ), "not", selector );
			else
				selector = jQuery.multiFilter( selector, this );

		var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
		return this.filter(function() {
			return isArrayLike ? jQuery.inArray( this, selector ) < 0 : this != selector;
		});
	},

	add: function( selector ) {
		return this.pushStack( jQuery.unique( jQuery.merge(
			this.get(),
			typeof selector === "string" ?
				jQuery( selector ) :
				jQuery.makeArray( selector )
		)));
	},

	is: function( selector ) {
		return !!selector && jQuery.multiFilter( selector, this ).length > 0;
	},

	hasClass: function( selector ) {
		return !!selector && this.is( "." + selector );
	},

	val: function( value ) {
		if ( value === undefined ) {			
			var elem = this[0];

			if ( elem ) {
				if( jQuery.nodeName( elem, 'option' ) )
					return (elem.attributes.value || {}).specified ? elem.value : elem.text;
				
				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type == "select-one";

					// Nothing was selected
					if ( index < 0 )
						return null;

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							// Get the specifc value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one )
								return value;

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;				
				}

				// Everything else, we just grab the value
				return (elem.value || "").replace(/\r/g, "");

			}

			return undefined;
		}

		if ( typeof value === "number" )
			value += '';

		return this.each(function(){
			if ( this.nodeType != 1 )
				return;

			if ( jQuery.isArray(value) && /radio|checkbox/.test( this.type ) )
				this.checked = (jQuery.inArray(this.value, value) >= 0 ||
					jQuery.inArray(this.name, value) >= 0);

			else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(value);

				jQuery( "option", this ).each(function(){
					this.selected = (jQuery.inArray( this.value, values ) >= 0 ||
						jQuery.inArray( this.text, values ) >= 0);
				});

				if ( !values.length )
					this.selectedIndex = -1;

			} else
				this.value = value;
		});
	},

	html: function( value ) {
		return value === undefined ?
			(this[0] ?
				this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") :
				null) :
			this.empty().append( value );
	},

	replaceWith: function( value ) {
		return this.after( value ).remove();
	},

	eq: function( i ) {
		return this.slice( i, +i + 1 );
	},

	slice: function() {
		return this.pushStack( Array.prototype.slice.apply( this, arguments ),
			"slice", Array.prototype.slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function(elem, i){
			return callback.call( elem, i, elem );
		}));
	},

	andSelf: function() {
		return this.add( this.prevObject );
	},

	domManip: function( args, table, callback ) {
		if ( this[0] ) {
			var fragment = (this[0].ownerDocument || this[0]).createDocumentFragment(),
				scripts = jQuery.clean( args, (this[0].ownerDocument || this[0]), fragment ),
				first = fragment.firstChild;

			if ( first )
				for ( var i = 0, l = this.length; i < l; i++ )
					callback.call( root(this[i], first), this.length > 1 || i > 0 ?
							fragment.cloneNode(true) : fragment );
		
			if ( scripts )
				jQuery.each( scripts, evalScript );
		}

		return this;
		
		function root( elem, cur ) {
			return table && jQuery.nodeName(elem, "table") && jQuery.nodeName(cur, "tr") ?
				(elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
				elem;
		}
	}
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

function evalScript( i, elem ) {
	if ( elem.src )
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});

	else
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );

	if ( elem.parentNode )
		elem.parentNode.removeChild( elem );
}

function now(){
	return +new Date;
}

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) )
		target = {};

	// extend jQuery itself if only one argument is passed
	if ( length == i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				var src = target[ name ], copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy )
					continue;

				// Recurse if we're merging object values
				if ( deep && copy && typeof copy === "object" && !copy.nodeType )
					target[ name ] = jQuery.extend( deep, 
						// Never move original objects, clone them
						src || ( copy.length != null ? [ ] : { } )
					, copy );

				// Don't bring in undefined values
				else if ( copy !== undefined )
					target[ name ] = copy;

			}

	// Return the modified object
	return target;
};

// exclude the following css properties to add px
var	exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	// cache defaultView
	defaultView = document.defaultView || {},
	toString = Object.prototype.toString;

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep )
			window.jQuery = _jQuery;

		return jQuery;
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return toString.call(obj) === "[object Function]";
	},

	isArray: function( obj ) {
		return toString.call(obj) === "[object Array]";
	},

	// check if an element is in a (or is an) XML document
	isXMLDoc: function( elem ) {
		return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
			!!elem.ownerDocument && jQuery.isXMLDoc( elem.ownerDocument );
	},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && /\S/.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";
			if ( jQuery.support.scriptEval )
				script.appendChild( document.createTextNode( data ) );
			else
				script.text = data;

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0, length = object.length;

		if ( args ) {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.apply( object[ name ], args ) === false )
						break;
			} else
				for ( ; i < length; )
					if ( callback.apply( object[ i++ ], args ) === false )
						break;

		// A special, fast, case for the most common use of each
		} else {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.call( object[ name ], name, object[ name ] ) === false )
						break;
			} else
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}
		}

		return object;
	},

	prop: function( elem, value, type, i, name ) {
		// Handle executable functions
		if ( jQuery.isFunction( value ) )
			value = value.call( elem, i );

		// Handle passing in a number to a CSS property
		return typeof value === "number" && type == "curCSS" && !exclude.test( name ) ?
			value + "px" :
			value;
	},

	className: {
		// internal only, use addClass("class")
		add: function( elem, classNames ) {
			jQuery.each((classNames || "").split(/\s+/), function(i, className){
				if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
					elem.className += (elem.className ? " " : "") + className;
			});
		},

		// internal only, use removeClass("class")
		remove: function( elem, classNames ) {
			if (elem.nodeType == 1)
				elem.className = classNames !== undefined ?
					jQuery.grep(elem.className.split(/\s+/), function(className){
						return !jQuery.className.has( classNames, className );
					}).join(" ") :
					"";
		},

		// internal only, use hasClass("class")
		has: function( elem, className ) {
			return elem && jQuery.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};
		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( var name in options )
			elem.style[ name ] = old[ name ];
	},

	css: function( elem, name, force, extra ) {
		if ( name == "width" || name == "height" ) {
			var val, props = { position: "absolute", visibility: "hidden", display:"block" }, which = name == "width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ];

			function getWH() {
				val = name == "width" ? elem.offsetWidth : elem.offsetHeight;

				if ( extra === "border" )
					return;

				jQuery.each( which, function() {
					if ( !extra )
						val -= parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					if ( extra === "margin" )
						val += parseFloat(jQuery.curCSS( elem, "margin" + this, true)) || 0;
					else
						val -= parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
				});
			}

			if ( elem.offsetWidth !== 0 )
				getWH();
			else
				jQuery.swap( elem, props, getWH );

			return Math.max(0, Math.round(val));
		}

		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret, style = elem.style;

		// We need to handle opacity special in IE
		if ( name == "opacity" && !jQuery.support.opacity ) {
			ret = jQuery.attr( style, "opacity" );

			return ret == "" ?
				"1" :
				ret;
		}

		// Make sure we're using the right name for getting the float value
		if ( name.match( /float/i ) )
			name = styleFloat;

		if ( !force && style && style[ name ] )
			ret = style[ name ];

		else if ( defaultView.getComputedStyle ) {

			// Only "float" is needed here
			if ( name.match( /float/i ) )
				name = "float";

			name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle )
				ret = computedStyle.getPropertyValue( name );

			// We should always get a number back from opacity
			if ( name == "opacity" && ret == "" )
				ret = "1";

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(/\-(\w)/g, function(all, letter){
				return letter.toUpperCase();
			});

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = ret || 0;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},

	clean: function( elems, context, fragment ) {
		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" )
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;

		// If a single string is passed in and it's a single tag
		// just do a createElement and skip the rest
		if ( !fragment && elems.length === 1 && typeof elems[0] === "string" ) {
			var match = /^<(\w+)\s*\/?>$/.exec(elems[0]);
			if ( match )
				return [ context.createElement( match[1] ) ];
		}

		var ret = [], scripts = [], div = context.createElement("div");

		jQuery.each(elems, function(i, elem){
			if ( typeof elem === "number" )
				elem += '';

			if ( !elem )
				return;

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag){
					return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ?
						all :
						front + "></" + tag + ">";
				});

				// Trim whitespace, otherwise indexOf won't work as expected
				var tags = elem.replace(/^\s+/, "").substring(0, 10).toLowerCase();

				var wrap =
					// option or optgroup
					!tags.indexOf("<opt") &&
					[ 1, "<select multiple='multiple'>", "</select>" ] ||

					!tags.indexOf("<leg") &&
					[ 1, "<fieldset>", "</fieldset>" ] ||

					tags.match(/^<(thead|tbody|tfoot|colg|cap)/) &&
					[ 1, "<table>", "</table>" ] ||

					!tags.indexOf("<tr") &&
					[ 2, "<table><tbody>", "</tbody></table>" ] ||

				 	// <thead> matched above
					(!tags.indexOf("<td") || !tags.indexOf("<th")) &&
					[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] ||

					!tags.indexOf("<col") &&
					[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ] ||

					// IE can't serialize <link> and <script> tags normally
					!jQuery.support.htmlSerialize &&
					[ 1, "div<div>", "</div>" ] ||

					[ 0, "", "" ];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( wrap[0]-- )
					div = div.lastChild;

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !jQuery.support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					var hasBody = /<tbody/i.test(elem),
						tbody = !tags.indexOf("<table") && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

						// String was a bare <thead> or <tfoot>
						wrap[1] == "<table>" && !hasBody ?
							div.childNodes :
							[];

					for ( var j = tbody.length - 1; j >= 0 ; --j )
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length )
							tbody[ j ].parentNode.removeChild( tbody[ j ] );

					}

				// IE completely kills leading whitespace when innerHTML is used
				if ( !jQuery.support.leadingWhitespace && /^\s/.test( elem ) )
					div.insertBefore( context.createTextNode( elem.match(/^\s*/)[0] ), div.firstChild );
				
				elem = jQuery.makeArray( div.childNodes );
			}

			if ( elem.nodeType )
				ret.push( elem );
			else
				ret = jQuery.merge( ret, elem );

		});

		if ( fragment ) {
			for ( var i = 0; ret[i]; i++ ) {
				if ( jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				} else {
					if ( ret[i].nodeType === 1 )
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					fragment.appendChild( ret[i] );
				}
			}
			
			return scripts;
		}

		return ret;
	},

	attr: function( elem, name, value ) {
		// don't set attributes on text and comment nodes
		if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
			return undefined;

		var notxml = !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// Only do all the following if this is a node (faster for style)
		// IE elem.getAttribute passes even for style
		if ( elem.tagName ) {

			// These attributes require special treatment
			var special = /href|src|style/.test( name );

			// Safari mis-reports the default selected property of a hidden option
			// Accessing the parent's selectedIndex property fixes it
			if ( name == "selected" && elem.parentNode )
				elem.parentNode.selectedIndex;

			// If applicable, access the attribute via the DOM 0 way
			if ( name in elem && notxml && !special ) {
				if ( set ){
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( name == "type" && jQuery.nodeName( elem, "input" ) && elem.parentNode )
						throw "type property can't be changed";

					elem[ name ] = value;
				}

				// browsers index elements by id/name on forms, give priority to attributes.
				if( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) )
					return elem.getAttributeNode( name ).nodeValue;

				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				if ( name == "tabIndex" ) {
					var attributeNode = elem.getAttributeNode( "tabIndex" );
					return attributeNode && attributeNode.specified
						? attributeNode.value
						: elem.nodeName.match(/(button|input|object|select|textarea)/i)
							? 0
							: elem.nodeName.match(/^(a|area)$/i) && elem.href
								? 0
								: undefined;
				}

				return elem[ name ];
			}

			if ( !jQuery.support.style && notxml &&  name == "style" )
				return jQuery.attr( elem.style, "cssText", value );

			if ( set )
				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, "" + value );

			var attr = !jQuery.support.hrefNormalized && notxml && special
					// Some attributes require a special call on IE
					? elem.getAttribute( name, 2 )
					: elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}

		// elem is actually elem.style ... set the style

		// IE uses filters for opacity
		if ( !jQuery.support.opacity && name == "opacity" ) {
			if ( set ) {
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				elem.zoom = 1;

				// Set the alpha filter to set the opacity
				elem.filter = (elem.filter || "").replace( /alpha\([^)]*\)/, "" ) +
					(parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
			}

			return elem.filter && elem.filter.indexOf("opacity=") >= 0 ?
				(parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':
				"";
		}

		name = name.replace(/-([a-z])/ig, function(all, letter){
			return letter.toUpperCase();
		});

		if ( set )
			elem[ name ] = value;

		return elem[ name ];
	},

	trim: function( text ) {
		return (text || "").replace( /^\s+|\s+$/g, "" );
	},

	makeArray: function( array ) {
		var ret = [];

		if( array != null ){
			var i = array.length;
			// The window, strings (and functions) also have 'length'
			if( i == null || typeof array === "string" || jQuery.isFunction(array) || array.setInterval )
				ret[0] = array;
			else
				while( i )
					ret[--i] = array[i];
		}

		return ret;
	},

	inArray: function( elem, array ) {
		for ( var i = 0, length = array.length; i < length; i++ )
		// Use === because on IE, window == document
			if ( array[ i ] === elem )
				return i;

		return -1;
	},

	merge: function( first, second ) {
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName
		var i = 0, elem, pos = first.length;
		// Also, we need to make sure that the correct elements are being returned
		// (IE returns comment nodes in a '*' query)
		if ( !jQuery.support.getAll ) {
			while ( (elem = second[ i++ ]) != null )
				if ( elem.nodeType != 8 )
					first[ pos++ ] = elem;

		} else
			while ( (elem = second[ i++ ]) != null )
				first[ pos++ ] = elem;

		return first;
	},

	unique: function( array ) {
		var ret = [], done = {};

		try {

			for ( var i = 0, length = array.length; i < length; i++ ) {
				var id = jQuery.data( array[ i ] );

				if ( !done[ id ] ) {
					done[ id ] = true;
					ret.push( array[ i ] );
				}
			}

		} catch( e ) {
			ret = array;
		}

		return ret;
	},

	grep: function( elems, callback, inv ) {
		var ret = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ )
			if ( !inv != !callback( elems[ i ], i ) )
				ret.push( elems[ i ] );

		return ret;
	},

	map: function( elems, callback ) {
		var ret = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			var value = callback( elems[ i ], i );

			if ( value != null )
				ret[ ret.length ] = value;
		}

		return ret.concat.apply( [], ret );
	}
});

// Use of jQuery.browser is deprecated.
// It's included for backwards compatibility and plugins,
// although they should work to migrate away.

var userAgent = navigator.userAgent.toLowerCase();

// Figure out what browser is being used
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	safari: /webkit/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};

jQuery.each({
	parent: function(elem){return elem.parentNode;},
	parents: function(elem){return jQuery.dir(elem,"parentNode");},
	next: function(elem){return jQuery.nth(elem,2,"nextSibling");},
	prev: function(elem){return jQuery.nth(elem,2,"previousSibling");},
	nextAll: function(elem){return jQuery.dir(elem,"nextSibling");},
	prevAll: function(elem){return jQuery.dir(elem,"previousSibling");},
	siblings: function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},
	children: function(elem){return jQuery.sibling(elem.firstChild);},
	contents: function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}
}, function(name, fn){
	jQuery.fn[ name ] = function( selector ) {
		var ret = jQuery.map( this, fn );

		if ( selector && typeof selector == "string" )
			ret = jQuery.multiFilter( selector, ret );

		return this.pushStack( jQuery.unique( ret ), name, selector );
	};
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function(name, original){
	jQuery.fn[ name ] = function( selector ) {
		var ret = [], insert = jQuery( selector );

		for ( var i = 0, l = insert.length; i < l; i++ ) {
			var elems = (i > 0 ? this.clone(true) : this).get();
			jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
			ret = ret.concat( elems );
		}

		return this.pushStack( ret, name, selector );
	};
});

jQuery.each({
	removeAttr: function( name ) {
		jQuery.attr( this, name, "" );
		if (this.nodeType == 1)
			this.removeAttribute( name );
	},

	addClass: function( classNames ) {
		jQuery.className.add( this, classNames );
	},

	removeClass: function( classNames ) {
		jQuery.className.remove( this, classNames );
	},

	toggleClass: function( classNames, state ) {
		if( typeof state !== "boolean" )
			state = !jQuery.className.has( this, classNames );
		jQuery.className[ state ? "add" : "remove" ]( this, classNames );
	},

	remove: function( selector ) {
		if ( !selector || jQuery.filter( selector, [ this ] ).length ) {
			// Prevent memory leaks
			jQuery( "*", this ).add([this]).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			if (this.parentNode)
				this.parentNode.removeChild( this );
		}
	},

	empty: function() {
		// Remove element nodes and prevent memory leaks
		jQuery(this).children().remove();

		// Remove any remaining nodes
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(name, fn){
	jQuery.fn[ name ] = function(){
		return this.each( fn, arguments );
	};
});

// Helper function used by the dimensions and offset modules
function num(elem, prop) {
	return elem[0] && parseInt( jQuery.curCSS(elem[0], prop, true), 10 ) || 0;
}
var expando = "jQuery" + now(), uuid = 0, windowData = {};

jQuery.extend({
	cache: {},

	data: function( elem, name, data ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// Compute a unique ID for the element
		if ( !id )
			id = elem[ expando ] = ++uuid;

		// Only generate the data cache if we're
		// trying to access or manipulate it
		if ( name && !jQuery.cache[ id ] )
			jQuery.cache[ id ] = {};

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined )
			jQuery.cache[ id ][ name ] = data;

		// Return the named cache data, or the ID for the element
		return name ?
			jQuery.cache[ id ][ name ] :
			id;
	},

	removeData: function( elem, name ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( jQuery.cache[ id ] ) {
				// Remove the section of cache data
				delete jQuery.cache[ id ][ name ];

				// If we've removed all the data, remove the element's cache
				name = "";

				for ( name in jQuery.cache[ id ] )
					break;

				if ( !name )
					jQuery.removeData( elem );
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			// Clean up the element expando
			try {
				delete elem[ expando ];
			} catch(e){
				// IE has trouble directly removing the expando
				// but it's ok with using removeAttribute
				if ( elem.removeAttribute )
					elem.removeAttribute( expando );
			}

			// Completely remove the data cache
			delete jQuery.cache[ id ];
		}
	},
	queue: function( elem, type, data ) {
		if ( elem ){
	
			type = (type || "fx") + "queue";
	
			var q = jQuery.data( elem, type );
	
			if ( !q || jQuery.isArray(data) )
				q = jQuery.data( elem, type, jQuery.makeArray(data) );
			else if( data )
				q.push( data );
	
		}
		return q;
	},

	dequeue: function( elem, type ){
		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();
		
		if( !type || type === "fx" )
			fn = queue[0];
			
		if( fn !== undefined )
			fn.call(elem);
	}
});

jQuery.fn.extend({
	data: function( key, value ){
		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length )
				data = jQuery.data( this[0], key );

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;
		} else
			return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function(){
				jQuery.data( this, key, value );
			});
	},

	removeData: function( key ){
		return this.each(function(){
			jQuery.removeData( this, key );
		});
	},
	queue: function(type, data){
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined )
			return jQuery.queue( this[0], type );

		return this.each(function(){
			var queue = jQuery.queue( this, type, data );
			
			 if( type == "fx" && queue.length == 1 )
				queue[0].call(this);
		});
	},
	dequeue: function(type){
		return this.each(function(){
			jQuery.dequeue( this, type );
		});
	}
});/*!
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
	done = 0,
	toString = Object.prototype.toString;

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 )
		return [];
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, check, mode, extra, prune = true;
	
	// Reset the position of the chunker regexp (start from head)
	chunker.lastIndex = 0;
	
	while ( (m = chunker.exec(selector)) !== null ) {
		parts.push( m[1] );
		
		if ( m[2] ) {
			extra = RegExp.rightContext;
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] )
					selector += parts.shift();

				set = posProcess( selector, set );
			}
		}
	} else {
		var ret = seed ?
			{ expr: parts.pop(), set: makeArray(seed) } :
			Sizzle.find( parts.pop(), parts.length === 1 && context.parentNode ? context.parentNode : context, isXML(context) );
		set = Sizzle.filter( ret.expr, ret.set );

		if ( parts.length > 0 ) {
			checkSet = makeArray(set);
		} else {
			prune = false;
		}

		while ( parts.length ) {
			var cur = parts.pop(), pop = cur;

			if ( !Expr.relative[ cur ] ) {
				cur = "";
			} else {
				pop = parts.pop();
			}

			if ( pop == null ) {
				pop = context;
			}

			Expr.relative[ cur ]( checkSet, pop, isXML(context) );
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, context, results, seed );

		if ( sortOrder ) {
			hasDuplicate = false;
			results.sort(sortOrder);

			if ( hasDuplicate ) {
				for ( var i = 1; i < results.length; i++ ) {
					if ( results[i] === results[i-1] ) {
						results.splice(i--, 1);
					}
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;
		
		if ( (match = Expr.match[ type ].exec( expr )) ) {
			var left = RegExp.leftContext;

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var filter = Expr.filter[ type ], found, item;
				anyFound = false;

				if ( curLoop == result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr == old ) {
			if ( anyFound == null ) {
				throw "Syntax error, unrecognized expression: " + expr;
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag && !isXML ) {
				part = part.toUpperCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = isXML ? part : part.toUpperCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context, isXML){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
						if ( !inplace )
							result.push( elem );
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			for ( var i = 0; curLoop[i] === false; i++ ){}
			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
		},
		CHILD: function(match){
			if ( match[1] == "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( match[3].match(chunker).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 == i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 == i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while (node = node.previousSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					if ( type == 'first') return true;
					node = elem;
				case 'last':
					while (node = node.nextSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first == 1 && last == 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;
					if ( first == 0 ) {
						return diff == 0;
					} else {
						return ( diff % first == 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value != check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
try {
	Array.prototype.slice.call( document.documentElement.childNodes );

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.selectNode(a);
		aRange.collapse(true);
		bRange.selectNode(b);
		bRange.collapse(true);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("form"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<input name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( !!document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}
})();

if ( document.querySelectorAll ) (function(){
	var oldSizzle = Sizzle, div = document.createElement("div");
	div.innerHTML = "<p class='TEST'></p>";

	// Safari can't handle uppercase or unicode characters when
	// in quirks mode.
	if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
		return;
	}
	
	Sizzle = function(query, context, extra, seed){
		context = context || document;

		// Only use querySelectorAll on non-XML documents
		// (ID selectors don't work in non-HTML documents)
		if ( !seed && context.nodeType === 9 && !isXML(context) ) {
			try {
				return makeArray( context.querySelectorAll(query), extra );
			} catch(e){}
		}
		
		return oldSizzle(query, context, extra, seed);
	};

	Sizzle.find = oldSizzle.find;
	Sizzle.filter = oldSizzle.filter;
	Sizzle.selectors = oldSizzle.selectors;
	Sizzle.matches = oldSizzle.matches;
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
	var div = document.createElement("div");
	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	if ( div.getElementsByClassName("e").length === 0 )
		return;

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 )
		return;

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ){
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ) {
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ?  function(a, b){
	return a.compareDocumentPosition(b) & 16;
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
		!!elem.ownerDocument && isXML( elem.ownerDocument );
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.filter = Sizzle.filter;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;

Sizzle.selectors.filters.hidden = function(elem){
	return elem.offsetWidth === 0 || elem.offsetHeight === 0;
};

Sizzle.selectors.filters.visible = function(elem){
	return elem.offsetWidth > 0 || elem.offsetHeight > 0;
};

Sizzle.selectors.filters.animated = function(elem){
	return jQuery.grep(jQuery.timers, function(fn){
		return elem === fn.elem;
	}).length;
};

jQuery.multiFilter = function( expr, elems, not ) {
	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return Sizzle.matches(expr, elems);
};

jQuery.dir = function( elem, dir ){
	var matched = [], cur = elem[dir];
	while ( cur && cur != document ) {
		if ( cur.nodeType == 1 )
			matched.push( cur );
		cur = cur[dir];
	}
	return matched;
};

jQuery.nth = function(cur, result, dir, elem){
	result = result || 1;
	var num = 0;

	for ( ; cur; cur = cur[dir] )
		if ( cur.nodeType == 1 && ++num == result )
			break;

	return cur;
};

jQuery.sibling = function(n, elem){
	var r = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType == 1 && n != elem )
			r.push( n );
	}

	return r;
};

return;

window.Sizzle = Sizzle;

})();
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function(elem, types, handler, data) {
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( elem.setInterval && elem != window )
			elem = window;

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;

		// if data is passed, bind to handler
		if ( data !== undefined ) {
			// Create temporary function pointer to original handler
			var fn = handler;

			// Create unique handler function, wrapped around original handler
			handler = this.proxy( fn );

			// Store data in unique handler
			handler.data = data;
		}

		// Init the element's event structure
		var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
			handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function(){
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply(arguments.callee.elem, arguments) :
					undefined;
			});
		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native
		// event in IE.
		handle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		jQuery.each(types.split(/\s+/), function(index, type) {
			// Namespaced event handlers
			var namespaces = type.split(".");
			type = namespaces.shift();
			handler.type = namespaces.slice().sort().join(".");

			// Get the current list of functions bound to this event
			var handlers = events[type];
			
			if ( jQuery.event.specialAll[type] )
				jQuery.event.specialAll[type].setup.call(elem, data, namespaces);

			// Init the event handler queue
			if (!handlers) {
				handlers = events[type] = {};

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem, data, namespaces) === false ) {
					// Bind the global event handler to the element
					if (elem.addEventListener)
						elem.addEventListener(type, handle, false);
					else if (elem.attachEvent)
						elem.attachEvent("on" + type, handle);
				}
			}

			// Add the function to the element's handler list
			handlers[handler.guid] = handler;

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[type] = true;
		});

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	guid: 1,
	global: {},

	// Detach an event or set of events from an element
	remove: function(elem, types, handler) {
		// don't do events on text and comment nodes
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		var events = jQuery.data(elem, "events"), ret, index;

		if ( events ) {
			// Unbind all events for the element
			if ( types === undefined || (typeof types === "string" && types.charAt(0) == ".") )
				for ( var type in events )
					this.remove( elem, type + (types || "") );
			else {
				// types is actually an event object here
				if ( types.type ) {
					handler = types.handler;
					types = types.type;
				}

				// Handle multiple events seperated by a space
				// jQuery(...).unbind("mouseover mouseout", fn);
				jQuery.each(types.split(/\s+/), function(index, type){
					// Namespaced event handlers
					var namespaces = type.split(".");
					type = namespaces.shift();
					var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

					if ( events[type] ) {
						// remove the given handler for the given type
						if ( handler )
							delete events[type][handler.guid];

						// remove all handlers for the given type
						else
							for ( var handle in events[type] )
								// Handle the removal of namespaced events
								if ( namespace.test(events[type][handle].type) )
									delete events[type][handle];
									
						if ( jQuery.event.specialAll[type] )
							jQuery.event.specialAll[type].teardown.call(elem, namespaces);

						// remove generic event handler if no more handlers exist
						for ( ret in events[type] ) break;
						if ( !ret ) {
							if ( !jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem, namespaces) === false ) {
								if (elem.removeEventListener)
									elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
								else if (elem.detachEvent)
									elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
							}
							ret = null;
							delete events[type];
						}
					}
				});
			}

			// Remove the expando if it's no longer used
			for ( ret in events ) break;
			if ( !ret ) {
				var handle = jQuery.data( elem, "handle" );
				if ( handle ) handle.elem = null;
				jQuery.removeData( elem, "events" );
				jQuery.removeData( elem, "handle" );
			}
		}
	},

	// bubbling is internal
	trigger: function( event, data, elem, bubbling ) {
		// Event object or event type
		var type = event.type || event;

		if( !bubbling ){
			event = typeof event === "object" ?
				// jQuery.Event object
				event[expando] ? event :
				// Object literal
				jQuery.extend( jQuery.Event(type), event ) :
				// Just the event type (string)
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			// Handle a global trigger
			if ( !elem ) {
				// Don't bubble custom events when global (to avoid too much overhead)
				event.stopPropagation();
				// Only trigger if we've ever bound an event for it
				if ( this.global[type] )
					jQuery.each( jQuery.cache, function(){
						if ( this.events && this.events[type] )
							jQuery.event.trigger( event, data, this.handle.elem );
					});
			}

			// Handle triggering a single element

			// don't do events on text and comment nodes
			if ( !elem || elem.nodeType == 3 || elem.nodeType == 8 )
				return undefined;
			
			// Clean up in case it is reused
			event.result = undefined;
			event.target = elem;
			
			// Clone the incoming data, if any
			data = jQuery.makeArray(data);
			data.unshift( event );
		}

		event.currentTarget = elem;

		// Trigger the event, it is assumed that "handle" is a function
		var handle = jQuery.data(elem, "handle");
		if ( handle )
			handle.apply( elem, data );

		// Handle triggering native .onfoo handlers (and on links since we don't call .click() for links)
		if ( (!elem[type] || (jQuery.nodeName(elem, 'a') && type == "click")) && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
			event.result = false;

		// Trigger the native events (except for clicks on links)
		if ( !bubbling && elem[type] && !event.isDefaultPrevented() && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
			this.triggered = true;
			try {
				elem[ type ]();
			// prevent IE from throwing an error for some hidden elements
			} catch (e) {}
		}

		this.triggered = false;

		if ( !event.isPropagationStopped() ) {
			var parent = elem.parentNode || elem.ownerDocument;
			if ( parent )
				jQuery.event.trigger(event, data, parent, true);
		}
	},

	handle: function(event) {
		// returned undefined or false
		var all, handlers;

		event = arguments[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;
		
		// Namespaced event handlers
		var namespaces = event.type.split(".");
		event.type = namespaces.shift();

		// Cache this now, all = true means, any handler
		all = !namespaces.length && !event.exclusive;
		
		var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

		handlers = ( jQuery.data(this, "events") || {} )[event.type];

		for ( var j in handlers ) {
			var handler = handlers[j];

			// Filter the functions by class
			if ( all || namespace.test(handler.type) ) {
				// Pass in a reference to the handler function itself
				// So that we can later remove it
				event.handler = handler;
				event.data = handler.data;

				var ret = handler.apply(this, arguments);

				if( ret !== undefined ){
					event.result = ret;
					if ( ret === false ) {
						event.preventDefault();
						event.stopPropagation();
					}
				}

				if( event.isImmediatePropagationStopped() )
					break;

			}
		}
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function(event) {
		if ( event[expando] )
			return event;

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ){
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target )
			event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either

		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 )
			event.target = event.target.parentNode;

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement )
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
		}

		// Add which for key events
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) )
			event.which = event.charCode || event.keyCode;

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey )
			event.metaKey = event.ctrlKey;

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));

		return event;
	},

	proxy: function( fn, proxy ){
		proxy = proxy || function(){ return fn.apply(this, arguments); };
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || this.guid++;
		// So proxy can be declared as an argument
		return proxy;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: bindReady,
			teardown: function() {}
		}
	},
	
	specialAll: {
		live: {
			setup: function( selector, namespaces ){
				jQuery.event.add( this, namespaces[0], liveHandler );
			},
			teardown:  function( namespaces ){
				if ( namespaces.length ) {
					var remove = 0, name = RegExp("(^|\\.)" + namespaces[0] + "(\\.|$)");
					
					jQuery.each( (jQuery.data(this, "events").live || {}), function(){
						if ( name.test(this.type) )
							remove++;
					});
					
					if ( remove < 1 )
						jQuery.event.remove( this, namespaces[0], liveHandler );
				}
			}
		}
	}
};

jQuery.Event = function( src ){
	// Allow instantiation without the 'new' keyword
	if( !this.preventDefault )
		return new jQuery.Event(src);
	
	// Event object
	if( src && src.type ){
		this.originalEvent = src;
		this.type = src.type;
	// Event type
	}else
		this.type = src;

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = now();
	
	// Mark it as fixed
	this[expando] = true;
};

function returnFalse(){
	return false;
}
function returnTrue(){
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if preventDefault exists run it on the original event
		if (e.preventDefault)
			e.preventDefault();
		// otherwise set the returnValue property of the original event to false (IE)
		e.returnValue = false;
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if stopPropagation exists run it on the original event
		if (e.stopPropagation)
			e.stopPropagation();
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation:function(){
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};
// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function(event) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;
	// Traverse up the tree
	while ( parent && parent != this )
		try { parent = parent.parentNode; }
		catch(e) { parent = this; }
	
	if( parent != this ){
		// set the correct event type
		event.type = event.data;
		// handle event if we actually just moused on to a non sub-element
		jQuery.event.handle.apply( this, arguments );
	}
};
	
jQuery.each({ 
	mouseover: 'mouseenter', 
	mouseout: 'mouseleave'
}, function( orig, fix ){
	jQuery.event.special[ fix ] = {
		setup: function(){
			jQuery.event.add( this, orig, withinElement, fix );
		},
		teardown: function(){
			jQuery.event.remove( this, orig, withinElement );
		}
	};			   
});

jQuery.fn.extend({
	bind: function( type, data, fn ) {
		return type == "unload" ? this.one(type, data, fn) : this.each(function(){
			jQuery.event.add( this, type, fn || data, fn && data );
		});
	},

	one: function( type, data, fn ) {
		var one = jQuery.event.proxy( fn || data, function(event) {
			jQuery(this).unbind(event, one);
			return (fn || data).apply( this, arguments );
		});
		return this.each(function(){
			jQuery.event.add( this, type, one, fn && data);
		});
	},

	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},

	trigger: function( type, data ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if( this[0] ){
			var event = jQuery.Event(type);
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}		
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments, i = 1;

		// link all the functions, so any of them can unbind this click handler
		while( i < args.length )
			jQuery.event.proxy( fn, args[i++] );

		return this.click( jQuery.event.proxy( fn, function(event) {
			// Figure out which function to execute
			this.lastToggle = ( this.lastToggle || 0 ) % i;

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ this.lastToggle++ ].apply( this, arguments ) || false;
		}));
	},

	hover: function(fnOver, fnOut) {
		return this.mouseenter(fnOver).mouseleave(fnOut);
	},

	ready: function(fn) {
		// Attach the listeners
		bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		else
			// Add the function to the wait list
			jQuery.readyList.push( fn );

		return this;
	},
	
	live: function( type, fn ){
		var proxy = jQuery.event.proxy( fn );
		proxy.guid += this.selector + type;

		jQuery(document).bind( liveConvert(type, this.selector), this.selector, proxy );

		return this;
	},
	
	die: function( type, fn ){
		jQuery(document).unbind( liveConvert(type, this.selector), fn ? { guid: fn.guid + this.selector + type } : null );
		return this;
	}
});

function liveHandler( event ){
	var check = RegExp("(^|\\.)" + event.type + "(\\.|$)"),
		stop = true,
		elems = [];

	jQuery.each(jQuery.data(this, "events").live || [], function(i, fn){
		if ( check.test(fn.type) ) {
			var elem = jQuery(event.target).closest(fn.data)[0];
			if ( elem )
				elems.push({ elem: elem, fn: fn });
		}
	});

	elems.sort(function(a,b) {
		return jQuery.data(a.elem, "closest") - jQuery.data(b.elem, "closest");
	});
	
	jQuery.each(elems, function(){
		if ( this.fn.call(this.elem, event, this.fn.data) === false )
			return (stop = false);
	});

	return stop;
}

function liveConvert(type, selector){
	return ["live", type, selector.replace(/\./g, "`").replace(/ /g, "|")].join(".");
}

jQuery.extend({
	isReady: false,
	readyList: [],
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				jQuery.each( jQuery.readyList, function(){
					this.call( document, jQuery );
				});

				// Reset the list of functions
				jQuery.readyList = null;
			}

			// Trigger any bound ready events
			jQuery(document).triggerHandler("ready");
		}
	}
});

var readyBound = false;

function bindReady(){
	if ( readyBound ) return;
	readyBound = true;

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", function(){
			document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
			jQuery.ready();
		}, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", arguments.callee );
				jQuery.ready();
			}
		});

		// If IE and not an iframe
		// continually check to see if the document is ready
		if ( document.documentElement.doScroll && window == window.top ) (function(){
			if ( jQuery.isReady ) return;

			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch( error ) {
				setTimeout( arguments.callee, 0 );
				return;
			}

			// and execute any waiting functions
			jQuery.ready();
		})();
	}

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
}

jQuery.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
	"change,select,submit,keydown,keypress,keyup,error").split(","), function(i, name){

	// Handle event binding
	jQuery.fn[name] = function(fn){
		return fn ? this.bind(name, fn) : this.trigger(name);
	};
});

// Prevent memory leaks in IE
// And prevent errors on refresh with events like mouseover in other browsers
// Window isn't included so as not to unbind existing unload events
jQuery( window ).bind( 'unload', function(){ 
	for ( var id in jQuery.cache )
		// Skip the window
		if ( id != 1 && jQuery.cache[ id ].handle )
			jQuery.event.remove( jQuery.cache[ id ].handle.elem );
}); 
(function(){

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + (new Date).getTime();

	div.style.display = "none";
	div.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType == 3,
		
		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,
		
		// Make sure that you can get all elements in an <object> element
		// IE 7 always returns no results
		objectAll: !!div.getElementsByTagName("object")[0]
			.getElementsByTagName("*").length,
		
		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,
		
		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style: /red/.test( a.getAttribute("style") ),
		
		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",
		
		// Make sure that element opacity exists
		// (IE uses filter instead)
		opacity: a.style.opacity === "0.5",
		
		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Will be defined later
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null
	};
	
	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e){}

	root.insertBefore( script, root.firstChild );
	
	// Make sure that the execution of code works by injecting a script
	// tag with appendChild/createTextNode
	// (IE doesn't support this, fails, and uses .text instead)
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function(){
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", arguments.callee);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	// Figure out if the W3C box model works as expected
	// document.body must exist before we can do this
	jQuery(function(){
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';
	});
})();

var styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat";

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	"float": styleFloat,
	cssFloat: styleFloat,
	styleFloat: styleFloat,
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	tabindex: "tabIndex"
};
jQuery.fn.extend({
	// Keep a copy of the old load
	_load: jQuery.fn.load,

	load: function( url, params, callback ) {
		if ( typeof url !== "string" )
			return this._load( url );

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params )
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else if( typeof params === "object" ) {
				params = jQuery.param( params );
				type = "POST";
			}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function(res, status){
				// If successful, inject the HTML into all the matched elements
				if ( status == "success" || status == "notmodified" )
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div/>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(/<script(.|\s)*?\/script>/g, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );

				if( callback )
					self.each( callback, [res.responseText, status, res] );
			}
		});
		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				(this.checked || /select|textarea/i.test(this.nodeName) ||
					/text|hidden|password|search/i.test(this.type));
		})
		.map(function(i, elem){
			var val = jQuery(this).val();
			return val == null ? null :
				jQuery.isArray(val) ?
					jQuery.map( val, function(val, i){
						return {name: elem.name, value: val};
					}) :
					{name: elem.name, value: val};
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i,o){
	jQuery.fn[o] = function(f){
		return this.bind(o, f);
	};
});

var jsc = now();

jQuery.extend({
  
	get: function( url, data, callback, type ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		username: null,
		password: null,
		*/
		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
		// This function can be overriden by calling jQuery.ajaxSetup
		xhr:function(){
			return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	// Last-Modified header cache for next request
	lastModified: {},

	ajax: function( s ) {
		// Extend the settings, but re-extend 's' so that it can be
		// checked again later (in the test suite, specifically)
		s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings, s));

		var jsonp, jsre = /=\?(&|$)/g, status, data,
			type = s.type.toUpperCase();

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" )
			s.data = jQuery.param(s.data);

		// Handle JSONP Parameter Callbacks
		if ( s.dataType == "jsonp" ) {
			if ( type == "GET" ) {
				if ( !s.url.match(jsre) )
					s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?";
			} else if ( !s.data || !s.data.match(jsre) )
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre)) ) {
			jsonp = "jsonp" + jsc++;

			// Replace the =? sequence both in the query string and the data
			if ( s.data )
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			window[ jsonp ] = function(tmp){
				data = tmp;
				success();
				complete();
				// Garbage collect
				window[ jsonp ] = undefined;
				try{ delete window[ jsonp ]; } catch(e){}
				if ( head )
					head.removeChild( script );
			};
		}

		if ( s.dataType == "script" && s.cache == null )
			s.cache = false;

		if ( s.cache === false && type == "GET" ) {
			var ts = now();
			// try replacing _= if it is there
			var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for get requests
		if ( s.data && type == "GET" ) {
			s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;

			// IE likes to send both get and post data, prevent this
			s.data = null;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		// Matches an absolute URL, and saves the domain
		var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec( s.url );

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType == "script" && type == "GET" && parts
			&& ( parts[1] && parts[1] != location.protocol || parts[2] != location.host )){

			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = s.url;
			if (s.scriptCharset)
				script.charset = s.scriptCharset;

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function(){
					if ( !done && (!this.readyState ||
							this.readyState == "loaded" || this.readyState == "complete") ) {
						done = true;
						success();
						complete();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						head.removeChild( script );
					}
				};
			}

			head.appendChild(script);

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if( s.username )
			xhr.open(type, s.url, s.async, s.username, s.password);
		else
			xhr.open(type, s.url, s.async);

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set the correct header, if data is being sent
			if ( s.data )
				xhr.setRequestHeader("Content-Type", s.contentType);

			// Set the If-Modified-Since header, if ifModified mode.
			if ( s.ifModified )
				xhr.setRequestHeader("If-Modified-Since",
					jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

			// Set header so the called script knows that it's an XMLHttpRequest
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e){}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && s.beforeSend(xhr, s) === false ) {
			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global )
			jQuery.event.trigger("ajaxSend", [xhr, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The request was aborted, clear the interval and decrement jQuery.active
			if (xhr.readyState == 0) {
				if (ival) {
					// clear poll interval
					clearInterval(ival);
					ival = null;
					// Handle the global AJAX counter
					if ( s.global && ! --jQuery.active )
						jQuery.event.trigger( "ajaxStop" );
				}
			// The transfer is complete and the data is available, or the request timed out
			} else if ( !requestDone && xhr && (xhr.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;

				// clear poll interval
				if (ival) {
					clearInterval(ival);
					ival = null;
				}

				status = isTimeout == "timeout" ? "timeout" :
					!jQuery.httpSuccess( xhr ) ? "error" :
					s.ifModified && jQuery.httpNotModified( xhr, s.url ) ? "notmodified" :
					"success";

				if ( status == "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch(e) {
						status = "parsererror";
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status == "success" ) {
					// Cache Last-Modified header, if ifModified mode.
					var modRes;
					try {
						modRes = xhr.getResponseHeader("Last-Modified");
					} catch(e) {} // swallow exception thrown by FF if header is not available

					if ( s.ifModified && modRes )
						jQuery.lastModified[s.url] = modRes;

					// JSONP handles its own success callback
					if ( !jsonp )
						success();
				} else
					jQuery.handleError(s, xhr, status);

				// Fire the complete handlers
				complete();

				if ( isTimeout )
					xhr.abort();

				// Stop memory leaks
				if ( s.async )
					xhr = null;
			}
		};

		if ( s.async ) {
			// don't attach the handler to the request, just poll it instead
			var ival = setInterval(onreadystatechange, 13);

			// Timeout checker
			if ( s.timeout > 0 )
				setTimeout(function(){
					// Check to see if the request is still happening
					if ( xhr && !requestDone )
						onreadystatechange( "timeout" );
				}, s.timeout);
		}

		// Send the data
		try {
			xhr.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xhr, null, e);
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async )
			onreadystatechange();

		function success(){
			// If a local callback was specified, fire it and pass it the data
			if ( s.success )
				s.success( data, status );

			// Fire the global callback
			if ( s.global )
				jQuery.event.trigger( "ajaxSuccess", [xhr, s] );
		}

		function complete(){
			// Process result
			if ( s.complete )
				s.complete(xhr, status);

			// The request was completed
			if ( s.global )
				jQuery.event.trigger( "ajaxComplete", [xhr, s] );

			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xhr, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xhr, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol == "file:" ||
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		try {
			var xhrRes = xhr.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xhr.status == 304 || xhrRes == jQuery.lastModified[url];
		} catch(e){}
		return false;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type"),
			xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";
			
		// Allow a pre-filtering function to sanitize the response
		// s != null is checked to keep backwards compatibility
		if( s && s.dataFilter )
			data = s.dataFilter( data, type );

		// The filter can actually parse the response
		if( typeof data === "string" ){

			// If the type is "script", eval it in global context
			if ( type == "script" )
				jQuery.globalEval( data );

			// Get the JavaScript object, if JSON is used.
			if ( type == "json" )
				data = window["eval"]("(" + data + ")");
		}
		
		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [ ];

		function add( key, value ){
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		};

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( jQuery.isArray(a) || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				add( this.name, this.value );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( jQuery.isArray(a[j]) )
					jQuery.each( a[j], function(){
						add( j, this );
					});
				else
					add( j, jQuery.isFunction(a[j]) ? a[j]() : a[j] );

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

});
var elemdisplay = {},
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	];

function genFx( type, num ){
	var obj = {};
	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function(){
		obj[ this ] = type;
	});
	return obj;
}

jQuery.fn.extend({
	show: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("show", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				
				this[i].style.display = old || "";
				
				if ( jQuery.css(this[i], "display") === "none" ) {
					var tagName = this[i].tagName, display;
					
					if ( elemdisplay[ tagName ] ) {
						display = elemdisplay[ tagName ];
					} else {
						var elem = jQuery("<" + tagName + " />").appendTo("body");
						
						display = elem.css("display");
						if ( display === "none" )
							display = "block";
						
						elem.remove();
						
						elemdisplay[ tagName ] = display;
					}
					
					jQuery.data(this[i], "olddisplay", display);
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = jQuery.data(this[i], "olddisplay") || "";
			}
			
			return this;
		}
	},

	hide: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("hide", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				if ( !old && old !== "none" )
					jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2 ){
		var bool = typeof fn === "boolean";

		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle.apply( this, arguments ) :
			fn == null || bool ?
				this.each(function(){
					var state = bool ? fn : jQuery(this).is(":hidden");
					jQuery(this)[ state ? "show" : "hide" ]();
				}) :
				this.animate(genFx("toggle", 3), fn, fn2);
	},

	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		return this[ optall.queue === false ? "each" : "queue" ](function(){
		
			var opt = jQuery.extend({}, optall), p,
				hidden = this.nodeType == 1 && jQuery(this).is(":hidden"),
				self = this;
	
			for ( p in prop ) {
				if ( prop[p] == "hide" && hidden || prop[p] == "show" && !hidden )
					return opt.complete.call(this);

				if ( ( p == "height" || p == "width" ) && this.style ) {
					// Store display property
					opt.display = jQuery.css(this, "display");

					// Make sure that nothing sneaks out
					opt.overflow = this.style.overflow;
				}
			}

			if ( opt.overflow != null )
				this.style.overflow = "hidden";

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function(name, val){
				var e = new jQuery.fx( self, opt, name );

				if ( /toggle|show|hide/.test(val) )
					e[ val == "toggle" ? hidden ? "show" : "hide" : val ]( prop );
				else {
					var parts = val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
						start = e.cur(true) || 0;

					if ( parts ) {
						var end = parseFloat(parts[2]),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit != "px" ) {
							self.style[ name ] = (end || 1) + unit;
							start = ((end || 1) / e.cur(true)) * start;
							self.style[ name ] = start + unit;
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] )
							end = ((parts[1] == "-=" ? -1 : 1) * end) + start;

						e.custom( start, end, unit );
					} else
						e.custom( start, val, "" );
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	stop: function(clearQueue, gotoEnd){
		var timers = jQuery.timers;

		if (clearQueue)
			this.queue([]);

		this.each(function(){
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- )
				if ( timers[i].elem == this ) {
					if (gotoEnd)
						// force the next step to be the last
						timers[i](true);
					timers.splice(i, 1);
				}
		});

		// start the next in the queue if the last step wasn't forced
		if (!gotoEnd)
			this.dequeue();

		return this;
	}

});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" }
}, function( name, props ){
	jQuery.fn[ name ] = function( speed, callback ){
		return this.animate( props, speed, callback );
	};
});

jQuery.extend({

	speed: function(speed, easing, fn) {
		var opt = typeof speed === "object" ? speed : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			if ( opt.queue !== false )
				jQuery(this).dequeue();
			if ( jQuery.isFunction( opt.old ) )
				opt.old.call( this );
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ){
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig )
			options.orig = {};
	}

});

jQuery.fx.prototype = {

	// Simple function for setting a style value
	update: function(){
		if ( this.options.step )
			this.options.step.call( this.elem, this.now, this );

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		// Set display property to block for height/width animations
		if ( ( this.prop == "height" || this.prop == "width" ) && this.elem.style )
			this.elem.style.display = "block";
	},

	// Get the current size
	cur: function(force){
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) )
			return this.elem[ this.prop ];

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	// Start an animation from one number to another
	custom: function(from, to, unit){
		this.startTime = now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(function(){
				var timers = jQuery.timers;

				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval( timerId );
					timerId = undefined;
				}
			}, 13);
		}
	},

	// Simple 'show' function
	show: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery(this.elem).show();
	},

	// Simple 'hide' function
	hide: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function(gotoEnd){
		var t = now();

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			var done = true;
			for ( var i in this.options.curAnim )
				if ( this.options.curAnim[i] !== true )
					done = false;

			if ( done ) {
				if ( this.options.display != null ) {
					// Reset the overflow
					this.elem.style.overflow = this.options.overflow;

					// Reset the display
					this.elem.style.display = this.options.display;
					if ( jQuery.css(this.elem, "display") == "none" )
						this.elem.style.display = "block";
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide )
					jQuery(this.elem).hide();

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show )
					for ( var p in this.options.curAnim )
						jQuery.attr(this.elem.style, p, this.options.orig[p]);
					
				// Execute the complete function
				this.options.complete.call( this.elem );
			}

			return false;
		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			this.pos = jQuery.easing[this.options.easing || (jQuery.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}

};

jQuery.extend( jQuery.fx, {
	speeds:{
		slow: 600,
 		fast: 200,
 		// Default speed
 		_default: 400
	},
	step: {

		opacity: function(fx){
			jQuery.attr(fx.elem.style, "opacity", fx.now);
		},

		_default: function(fx){
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null )
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			else
				fx.elem[ fx.prop ] = fx.now;
		}
	}
});
if ( document.documentElement["getBoundingClientRect"] )
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		var box  = this[0].getBoundingClientRect(), doc = this[0].ownerDocument, body = doc.body, docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top  = box.top  + (self.pageYOffset || jQuery.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
			left = box.left + (self.pageXOffset || jQuery.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;
		return { top: top, left: left };
	};
else 
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		jQuery.offset.initialized || jQuery.offset.initialize();

		var elem = this[0], offsetParent = elem.offsetParent, prevOffsetParent = elem,
			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
			body = doc.body, defaultView = doc.defaultView,
			prevComputedStyle = defaultView.getComputedStyle(elem, null),
			top = elem.offsetTop, left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			computedStyle = defaultView.getComputedStyle(elem, null);
			top -= elem.scrollTop, left -= elem.scrollLeft;
			if ( elem === offsetParent ) {
				top += elem.offsetTop, left += elem.offsetLeft;
				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.tagName)) )
					top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
			}
			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" )
				top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
				left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" )
			top  += body.offsetTop,
			left += body.offsetLeft;

		if ( prevComputedStyle.position === "fixed" )
			top  += Math.max(docElem.scrollTop, body.scrollTop),
			left += Math.max(docElem.scrollLeft, body.scrollLeft);

		return { top: top, left: left };
	};

jQuery.offset = {
	initialize: function() {
		if ( this.initialized ) return;
		var body = document.body, container = document.createElement('div'), innerDiv, checkDiv, table, td, rules, prop, bodyMarginTop = body.style.marginTop,
			html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

		rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
		for ( prop in rules ) container.style[prop] = rules[prop];

		container.innerHTML = html;
		body.insertBefore(container, body.firstChild);
		innerDiv = container.firstChild, checkDiv = innerDiv.firstChild, td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		innerDiv.style.overflow = 'hidden', innerDiv.style.position = 'relative';
		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		body.style.marginTop = '1px';
		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
		body.style.marginTop = bodyMarginTop;

		body.removeChild(container);
		this.initialized = true;
	},

	bodyOffset: function(body) {
		jQuery.offset.initialized || jQuery.offset.initialize();
		var top = body.offsetTop, left = body.offsetLeft;
		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset )
			top  += parseInt( jQuery.curCSS(body, 'marginTop',  true), 10 ) || 0,
			left += parseInt( jQuery.curCSS(body, 'marginLeft', true), 10 ) || 0;
		return { top: top, left: left };
	}
};


jQuery.fn.extend({
	position: function() {
		var left = 0, top = 0, results;

		if ( this[0] ) {
			// Get *real* offsetParent
			var offsetParent = this.offsetParent(),

			// Get correct offsets
			offset       = this.offset(),
			parentOffset = /^body|html$/i.test(offsetParent[0].tagName) ? { top: 0, left: 0 } : offsetParent.offset();

			// Subtract element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft 
			// are the same in Safari causing offset.left to incorrectly be 0
			offset.top  -= num( this, 'marginTop'  );
			offset.left -= num( this, 'marginLeft' );

			// Add offsetParent borders
			parentOffset.top  += num( offsetParent, 'borderTopWidth'  );
			parentOffset.left += num( offsetParent, 'borderLeftWidth' );

			// Subtract the two offsets
			results = {
				top:  offset.top  - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		}

		return results;
	},

	offsetParent: function() {
		var offsetParent = this[0].offsetParent || document.body;
		while ( offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && jQuery.css(offsetParent, 'position') == 'static') )
			offsetParent = offsetParent.offsetParent;
		return jQuery(offsetParent);
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ['Left', 'Top'], function(i, name) {
	var method = 'scroll' + name;
	
	jQuery.fn[ method ] = function(val) {
		if (!this[0]) return null;

		return val !== undefined ?

			// Set the scroll offset
			this.each(function() {
				this == window || this == document ?
					window.scrollTo(
						!i ? val : jQuery(window).scrollLeft(),
						 i ? val : jQuery(window).scrollTop()
					) :
					this[ method ] = val;
			}) :

			// Return the scroll offset
			this[0] == window || this[0] == document ?
				self[ i ? 'pageYOffset' : 'pageXOffset' ] ||
					jQuery.boxModel && document.documentElement[ method ] ||
					document.body[ method ] :
				this[0][ method ];
	};
});
// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function(i, name){

	var tl = i ? "Left"  : "Top",  // top or left
		br = i ? "Right" : "Bottom", // bottom or right
		lower = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function(){
		return this[0] ?
			jQuery.css( this[0], lower, false, "padding" ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function(margin) {
		return this[0] ?
			jQuery.css( this[0], lower, false, margin ? "margin" : "border" ) :
			null;
	};
	
	var type = name.toLowerCase();

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		return this[0] == window ?
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			document.compatMode == "CSS1Compat" && document.documentElement[ "client" + name ] ||
			document.body[ "client" + name ] :

			// Get document width or height
			this[0] == document ?
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				Math.max(
					document.documentElement["client" + name],
					document.body["scroll" + name], document.documentElement["scroll" + name],
					document.body["offset" + name], document.documentElement["offset" + name]
				) :

				// Get or set width or height on the element
				size === undefined ?
					// Get width or height on the element
					(this.length ? jQuery.css( this[0], type ) : null) :

					// Set the width or height on the element (default to pixels if value is unitless)
					this.css( type, typeof size === "string" ? size : size + "px" );
	};

});
})();



/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/aframework.js ] ==== */
var aFramework = {
	run: function () {
		jQuery(document.body)
			.imageZoom()
			.maxLengthFormControls()
			.formHints();

		jQuery('p.code-block').codeBlockToolbar();

		this.jQueryLiveValidation = {
			valid:		Lang.get('Valid'), 
			invalid:	Lang.get('Invalid'), 
			validIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-valid.png', 
			invalidIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-invalid.png'
		};
	}, 

	jQueryLiveValidation: {}, 

	runModules: function () {
		// Run through all modules
		for (var module in aFramework.modules) {
			// Work out the HTML-ID based on the module-name (RecentArticles == recent-articles)
			var id = module.replace(/([A-Z])/g, '-$1').toLowerCase();

			id = id.substring(0, 1) == '-' ? id.substring(1) : id;

			// Only run modules that are used and don't run ajax-run-modules
			if ( 
					jQuery('#' + id).length && 
					!jQuery('#' + id).is('.ajax-run') && 
					typeof(aFramework.modules[module]) != 'undefined' && 
					typeof(aFramework.modules[module].run) == 'function' 
			) {
				aFramework.modules[module].run();
			}
		}
	}, 

	ajaxRun: function () {
		// Now pull all the ajaxrun-modules in using XHR and then run them
		jQuery('div.ajax-run').each(function () {
			var t				= jQuery(this);
			var moduleChunks	= t.attr('id').split('-');
			var moduleName		= '';
			var niceName		= '';

			// Work out the module-name based on the ID
			for (var i in moduleChunks) {
				var firstLetter	= moduleChunks[i].substr(0, 1).toUpperCase();
				var theRest	= moduleChunks[i].substr(1);

				moduleName	+= firstLetter + theRest;
				niceName	+= firstLetter + theRest + ' ';
			}

			niceName = jQuery.trim(niceName);

			t.html('Loading ' + niceName + '...');

			// Load the module with ajax
			jQuery.get(urlForModule(moduleName), function(data) {
				t.html(data);

				if (aFramework.modules[moduleName] && typeof(aFramework.modules[moduleName].run) == 'function') {
					aFramework.modules[moduleName].run();
				}
			});
		});
	}, 

	modules: []
};

jQuery(function () {
	aFramework.run();
	aFramework.runModules();
	// aFramework.ajaxRun();
});


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery-ui-1.7.1.custom.min.js ] ==== */
/*
 * jQuery UI 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */jQuery.ui||(function(c){var i=c.fn.remove,d=c.browser.mozilla&&(parseFloat(c.browser.version)<1.9);c.ui={version:"1.7.1",plugin:{add:function(k,l,n){var m=c.ui[k].prototype;for(var j in n){m.plugins[j]=m.plugins[j]||[];m.plugins[j].push([l,n[j]])}},call:function(j,l,k){var n=j.plugins[l];if(!n||!j.element[0].parentNode){return}for(var m=0;m<n.length;m++){if(j.options[n[m][0]]){n[m][1].apply(j.element,k)}}}},contains:function(k,j){return document.compareDocumentPosition?k.compareDocumentPosition(j)&16:k!==j&&k.contains(j)},hasScroll:function(m,k){if(c(m).css("overflow")=="hidden"){return false}var j=(k&&k=="left")?"scrollLeft":"scrollTop",l=false;if(m[j]>0){return true}m[j]=1;l=(m[j]>0);m[j]=0;return l},isOverAxis:function(k,j,l){return(k>j)&&(k<(j+l))},isOver:function(o,k,n,m,j,l){return c.ui.isOverAxis(o,n,j)&&c.ui.isOverAxis(k,m,l)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};if(d){var f=c.attr,e=c.fn.removeAttr,h="http://www.w3.org/2005/07/aaa",a=/^aria-/,b=/^wairole:/;c.attr=function(k,j,l){var m=l!==undefined;return(j=="role"?(m?f.call(this,k,j,"wairole:"+l):(f.apply(this,arguments)||"").replace(b,"")):(a.test(j)?(m?k.setAttributeNS(h,j.replace(a,"aaa:"),l):f.call(this,k,j.replace(a,"aaa:"))):f.apply(this,arguments)))};c.fn.removeAttr=function(j){return(a.test(j)?this.each(function(){this.removeAttributeNS(h,j.replace(a,""))}):e.call(this,j))}}c.fn.extend({remove:function(){c("*",this).add(this).each(function(){c(this).triggerHandler("remove")});return i.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var j;if((c.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){j=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(c.curCSS(this,"position",1))&&(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}else{j=this.parents().filter(function(){return(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!j.length?c(document):j}});c.extend(c.expr[":"],{data:function(l,k,j){return !!c.data(l,j[3])},focusable:function(k){var l=k.nodeName.toLowerCase(),j=c.attr(k,"tabindex");return(/input|select|textarea|button|object/.test(l)?!k.disabled:"a"==l||"area"==l?k.href||!isNaN(j):!isNaN(j))&&!c(k)["area"==l?"parents":"closest"](":hidden").length},tabbable:function(k){var j=c.attr(k,"tabindex");return(isNaN(j)||j>=0)&&c(k).is(":focusable")}});function g(m,n,o,l){function k(q){var p=c[m][n][q]||[];return(typeof p=="string"?p.split(/,?\s+/):p)}var j=k("getter");if(l.length==1&&typeof l[0]=="string"){j=j.concat(k("getterSetter"))}return(c.inArray(o,j)!=-1)}c.widget=function(k,j){var l=k.split(".")[0];k=k.split(".")[1];c.fn[k]=function(p){var n=(typeof p=="string"),o=Array.prototype.slice.call(arguments,1);if(n&&p.substring(0,1)=="_"){return this}if(n&&g(l,k,p,o)){var m=c.data(this[0],k);return(m?m[p].apply(m,o):undefined)}return this.each(function(){var q=c.data(this,k);(!q&&!n&&c.data(this,k,new c[l][k](this,p))._init());(q&&n&&c.isFunction(q[p])&&q[p].apply(q,o))})};c[l]=c[l]||{};c[l][k]=function(o,n){var m=this;this.namespace=l;this.widgetName=k;this.widgetEventPrefix=c[l][k].eventPrefix||k;this.widgetBaseClass=l+"-"+k;this.options=c.extend({},c.widget.defaults,c[l][k].defaults,c.metadata&&c.metadata.get(o)[k],n);this.element=c(o).bind("setData."+k,function(q,p,r){if(q.target==o){return m._setData(p,r)}}).bind("getData."+k,function(q,p){if(q.target==o){return m._getData(p)}}).bind("remove",function(){return m.destroy()})};c[l][k].prototype=c.extend({},c.widget.prototype,j);c[l][k].getterSetter="option"};c.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")},option:function(l,m){var k=l,j=this;if(typeof l=="string"){if(m===undefined){return this._getData(l)}k={};k[l]=m}c.each(k,function(n,o){j._setData(n,o)})},_getData:function(j){return this.options[j]},_setData:function(j,k){this.options[j]=k;if(j=="disabled"){this.element[k?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",k)}},enable:function(){this._setData("disabled",false)},disable:function(){this._setData("disabled",true)},_trigger:function(l,m,n){var p=this.options[l],j=(l==this.widgetEventPrefix?l:this.widgetEventPrefix+l);m=c.Event(m);m.type=j;if(m.originalEvent){for(var k=c.event.props.length,o;k;){o=c.event.props[--k];m[o]=m.originalEvent[o]}}this.element.trigger(m,n);return !(c.isFunction(p)&&p.call(this.element[0],m,n)===false||m.isDefaultPrevented())}};c.widget.defaults={disabled:false};c.ui.mouse={_mouseInit:function(){var j=this;this.element.bind("mousedown."+this.widgetName,function(k){return j._mouseDown(k)}).bind("click."+this.widgetName,function(k){if(j._preventClickEvent){j._preventClickEvent=false;k.stopImmediatePropagation();return false}});if(c.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");this.element.attr("unselectable","on")}this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);(c.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))},_mouseDown:function(l){l.originalEvent=l.originalEvent||{};if(l.originalEvent.mouseHandled){return}(this._mouseStarted&&this._mouseUp(l));this._mouseDownEvent=l;var k=this,m=(l.which==1),j=(typeof this.options.cancel=="string"?c(l.target).parents().add(l.target).filter(this.options.cancel).length:false);if(!m||j||!this._mouseCapture(l)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){k.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(l)&&this._mouseDelayMet(l)){this._mouseStarted=(this._mouseStart(l)!==false);if(!this._mouseStarted){l.preventDefault();return true}}this._mouseMoveDelegate=function(n){return k._mouseMove(n)};this._mouseUpDelegate=function(n){return k._mouseUp(n)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);(c.browser.safari||l.preventDefault());l.originalEvent.mouseHandled=true;return true},_mouseMove:function(j){if(c.browser.msie&&!j.button){return this._mouseUp(j)}if(this._mouseStarted){this._mouseDrag(j);return j.preventDefault()}if(this._mouseDistanceMet(j)&&this._mouseDelayMet(j)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,j)!==false);(this._mouseStarted?this._mouseDrag(j):this._mouseUp(j))}return !this._mouseStarted},_mouseUp:function(j){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=(j.target==this._mouseDownEvent.target);this._mouseStop(j)}return false},_mouseDistanceMet:function(j){return(Math.max(Math.abs(this._mouseDownEvent.pageX-j.pageX),Math.abs(this._mouseDownEvent.pageY-j.pageY))>=this.options.distance)},_mouseDelayMet:function(j){return this.mouseDelayMet},_mouseStart:function(j){},_mouseDrag:function(j){},_mouseStop:function(j){},_mouseCapture:function(j){return true}};c.ui.mouse.defaults={cancel:null,distance:1,delay:0}})(jQuery);;/*
 * jQuery UI Draggable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	ui.core.js
 */(function(a){a.widget("ui.draggable",a.extend({},a.ui.mouse,{_init:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"}(this.options.addClasses&&this.element.addClass("ui-draggable"));(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));this._mouseInit()},destroy:function(){if(!this.element.data("draggable")){return}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy()},_mouseCapture:function(b){var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")){return false}this.handle=this._getHandle(b);if(!this.handle){return false}return true},_mouseStart:function(b){var c=this.options;this.helper=this._createHelper(b);this._cacheHelperProportions();if(a.ui.ddmanager){a.ui.ddmanager.current=this}this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(b);this.originalPageX=b.pageX;this.originalPageY=b.pageY;if(c.cursorAt){this._adjustOffsetFromHelper(c.cursorAt)}if(c.containment){this._setContainment()}this._trigger("start",b);this._cacheHelperProportions();if(a.ui.ddmanager&&!c.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,b)}this.helper.addClass("ui-draggable-dragging");this._mouseDrag(b,true);return true},_mouseDrag:function(b,d){this.position=this._generatePosition(b);this.positionAbs=this._convertPositionTo("absolute");if(!d){var c=this._uiHash();this._trigger("drag",b,c);this.position=c.position}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}if(a.ui.ddmanager){a.ui.ddmanager.drag(this,b)}return false},_mouseStop:function(c){var d=false;if(a.ui.ddmanager&&!this.options.dropBehaviour){d=a.ui.ddmanager.drop(this,c)}if(this.dropped){d=this.dropped;this.dropped=false}if((this.options.revert=="invalid"&&!d)||(this.options.revert=="valid"&&d)||this.options.revert===true||(a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d))){var b=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){b._trigger("stop",c);b._clear()})}else{this._trigger("stop",c);this._clear()}return false},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==b.target){c=true}});return c},_createHelper:function(c){var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c])):(d.helper=="clone"?this.element.clone():this.element);if(!b.parents("body").length){b.appendTo((d.appendTo=="parent"?this.element[0].parentNode:d.appendTo))}if(b[0]!=this.element[0]&&!(/(fixed|absolute)/).test(b.css("position"))){b.css("position","absolute")}return b},_adjustOffsetFromHelper:function(b){if(b.left!=undefined){this.offset.click.left=b.left+this.margins.left}if(b.right!=undefined){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left}if(b.top!=undefined){this.offset.click.top=b.top+this.margins.top}if(b.bottom!=undefined){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)){b={top:0,left:0}}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.element.position();return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e=this.options;if(e.containment=="parent"){e.containment=this.helper[0].parentNode}if(e.containment=="document"||e.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(e.containment)&&e.containment.constructor!=Array){var c=a(e.containment)[0];if(!c){return}var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}else{if(e.containment.constructor==Array){this.containment=e.containment}}},_convertPositionTo:function(f,h){if(!h){h=this.position}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))}},_generatePosition:function(e){var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()}var d=e.pageX;var c=e.pageY;if(this.originalPosition){if(this.containment){if(e.pageX-this.offset.click.left<this.containment[0]){d=this.containment[0]+this.offset.click.left}if(e.pageY-this.offset.click.top<this.containment[1]){c=this.containment[1]+this.offset.click.top}if(e.pageX-this.offset.click.left>this.containment[2]){d=this.containment[2]+this.offset.click.left}if(e.pageY-this.offset.click.top>this.containment[3]){c=this.containment[3]+this.offset.click.top}}if(h.grid){var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f}}return{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()}this.helper=null;this.cancelHelperRemoval=false},_trigger:function(b,c,d){d=d||this._uiHash();a.ui.plugin.call(this,b,[c,d]);if(b=="drag"){this.positionAbs=this._convertPositionTo("absolute")}return a.widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(b){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,offset:this.positionAbs}}}));a.extend(a.ui.draggable,{version:"1.7.1",eventPrefix:"drag",defaults:{addClasses:true,appendTo:"parent",axis:false,cancel:":input,option",connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false}});a.ui.plugin.add("draggable","connectToSortable",{start:function(c,e){var d=a(this).data("draggable"),f=d.options,b=a.extend({},e,{item:d.element});d.sortables=[];a(f.connectToSortable).each(function(){var g=a.data(this,"sortable");if(g&&!g.options.disabled){d.sortables.push({instance:g,shouldRevert:g.options.revert});g._refreshItems();g._trigger("activate",c,b)}})},stop:function(c,e){var d=a(this).data("draggable"),b=a.extend({},e,{item:d.element});a.each(d.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;d.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert){this.instance.options.revert=true}this.instance._mouseStop(c);this.instance.options.helper=this.instance.options._helper;if(d.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})}}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",c,b)}})},drag:function(c,f){var e=a(this).data("draggable"),b=this;var d=function(i){var n=this.offset.click.top,m=this.offset.click.left;var g=this.positionAbs.top,k=this.positionAbs.left;var j=i.height,l=i.width;var p=i.top,h=i.left;return a.ui.isOver(g+n,k+m,p,h,j,l)};a.each(e.sortables,function(g){this.instance.positionAbs=e.positionAbs;this.instance.helperProportions=e.helperProportions;this.instance.offset.click=e.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=a(b).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return f.helper[0]};c.target=this.instance.currentItem[0];this.instance._mouseCapture(c,true);this.instance._mouseStart(c,true,true);this.instance.offset.click.top=e.offset.click.top;this.instance.offset.click.left=e.offset.click.left;this.instance.offset.parent.left-=e.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=e.offset.parent.top-this.instance.offset.parent.top;e._trigger("toSortable",c);e.dropped=this.instance.element;e.currentItem=e.element;this.instance.fromOutside=e}if(this.instance.currentItem){this.instance._mouseDrag(c)}}else{if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",c,this.instance._uiHash(this.instance));this.instance._mouseStop(c,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder){this.instance.placeholder.remove()}e._trigger("fromSortable",c);e.dropped=false}}})}});a.ui.plugin.add("draggable","cursor",{start:function(c,d){var b=a("body"),e=a(this).data("draggable").options;if(b.css("cursor")){e._cursor=b.css("cursor")}b.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._cursor){a("body").css("cursor",d._cursor)}}});a.ui.plugin.add("draggable","iframeFix",{start:function(b,c){var d=a(this).data("draggable").options;a(d.iframeFix===true?"iframe":d.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")})},stop:function(b,c){a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});a.ui.plugin.add("draggable","opacity",{start:function(c,d){var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("opacity")){e._opacity=b.css("opacity")}b.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._opacity){a(c.helper).css("opacity",d._opacity)}}});a.ui.plugin.add("draggable","scroll",{start:function(c,d){var b=a(this).data("draggable");if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){b.overflowOffset=b.scrollParent.offset()}},drag:function(d,e){var c=a(this).data("draggable"),f=c.options,b=false;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){if(!f.axis||f.axis!="x"){if((c.overflowOffset.top+c.scrollParent[0].offsetHeight)-d.pageY<f.scrollSensitivity){c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop+f.scrollSpeed}else{if(d.pageY-c.overflowOffset.top<f.scrollSensitivity){c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop-f.scrollSpeed}}}if(!f.axis||f.axis!="y"){if((c.overflowOffset.left+c.scrollParent[0].offsetWidth)-d.pageX<f.scrollSensitivity){c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft+f.scrollSpeed}else{if(d.pageX-c.overflowOffset.left<f.scrollSensitivity){c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft-f.scrollSpeed}}}}else{if(!f.axis||f.axis!="x"){if(d.pageY-a(document).scrollTop()<f.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()-f.scrollSpeed)}else{if(a(window).height()-(d.pageY-a(document).scrollTop())<f.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()+f.scrollSpeed)}}}if(!f.axis||f.axis!="y"){if(d.pageX-a(document).scrollLeft()<f.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()-f.scrollSpeed)}else{if(a(window).width()-(d.pageX-a(document).scrollLeft())<f.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()+f.scrollSpeed)}}}}if(b!==false&&a.ui.ddmanager&&!f.dropBehaviour){a.ui.ddmanager.prepareOffsets(c,d)}}});a.ui.plugin.add("draggable","snap",{start:function(c,d){var b=a(this).data("draggable"),e=b.options;b.snapElements=[];a(e.snap.constructor!=String?(e.snap.items||":data(draggable)"):e.snap).each(function(){var g=a(this);var f=g.offset();if(this!=b.element[0]){b.snapElements.push({item:this,width:g.outerWidth(),height:g.outerHeight(),top:f.top,left:f.left})}})},drag:function(u,p){var g=a(this).data("draggable"),q=g.options;var y=q.snapTolerance;var x=p.offset.left,w=x+g.helperProportions.width,f=p.offset.top,e=f+g.helperProportions.height;for(var v=g.snapElements.length-1;v>=0;v--){var s=g.snapElements[v].left,n=s+g.snapElements[v].width,m=g.snapElements[v].top,A=m+g.snapElements[v].height;if(!((s-y<x&&x<n+y&&m-y<f&&f<A+y)||(s-y<x&&x<n+y&&m-y<e&&e<A+y)||(s-y<w&&w<n+y&&m-y<f&&f<A+y)||(s-y<w&&w<n+y&&m-y<e&&e<A+y))){if(g.snapElements[v].snapping){(g.options.snap.release&&g.options.snap.release.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=false;continue}if(q.snapMode!="inner"){var c=Math.abs(m-e)<=y;var z=Math.abs(A-f)<=y;var j=Math.abs(s-w)<=y;var k=Math.abs(n-x)<=y;if(c){p.position.top=g._convertPositionTo("relative",{top:m-g.helperProportions.height,left:0}).top-g.margins.top}if(z){p.position.top=g._convertPositionTo("relative",{top:A,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s-g.helperProportions.width}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n}).left-g.margins.left}}var h=(c||z||j||k);if(q.snapMode!="outer"){var c=Math.abs(m-f)<=y;var z=Math.abs(A-e)<=y;var j=Math.abs(s-x)<=y;var k=Math.abs(n-w)<=y;if(c){p.position.top=g._convertPositionTo("relative",{top:m,left:0}).top-g.margins.top}if(z){p.position.top=g._convertPositionTo("relative",{top:A-g.helperProportions.height,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n-g.helperProportions.width}).left-g.margins.left}}if(!g.snapElements[v].snapping&&(c||z||j||k||h)){(g.options.snap.snap&&g.options.snap.snap.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=(c||z||j||k||h)}}});a.ui.plugin.add("draggable","stack",{start:function(b,c){var e=a(this).data("draggable").options;var d=a.makeArray(a(e.stack.group)).sort(function(g,f){return(parseInt(a(g).css("zIndex"),10)||e.stack.min)-(parseInt(a(f).css("zIndex"),10)||e.stack.min)});a(d).each(function(f){this.style.zIndex=e.stack.min+f});this[0].style.zIndex=e.stack.min+d.length}});a.ui.plugin.add("draggable","zIndex",{start:function(c,d){var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("zIndex")){e._zIndex=b.css("zIndex")}b.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._zIndex){a(c.helper).css("zIndex",d._zIndex)}}})})(jQuery);;/*
 * jQuery UI Droppable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 */(function(a){a.widget("ui.droppable",{_init:function(){var c=this.options,b=c.accept;this.isover=0;this.isout=1;this.options.accept=this.options.accept&&a.isFunction(this.options.accept)?this.options.accept:function(e){return e.is(b)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};a.ui.ddmanager.droppables[this.options.scope]=a.ui.ddmanager.droppables[this.options.scope]||[];a.ui.ddmanager.droppables[this.options.scope].push(this);(this.options.addClasses&&this.element.addClass("ui-droppable"))},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++){if(b[c]==this){b.splice(c,1)}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable")},_setData:function(b,c){if(b=="accept"){this.options.accept=c&&a.isFunction(c)?c:function(e){return e.is(c)}}else{a.widget.prototype._setData.apply(this,arguments)}},_activate:function(c){var b=a.ui.ddmanager.current;if(this.options.activeClass){this.element.addClass(this.options.activeClass)}(b&&this._trigger("activate",c,this.ui(b)))},_deactivate:function(c){var b=a.ui.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}(b&&this._trigger("deactivate",c,this.ui(b)))},_over:function(c){var b=a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)}this._trigger("over",c,this.ui(b))}},_out:function(c){var b=a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("out",c,this.ui(b))}},_drop:function(c,d){var b=d||a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return false}var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var f=a.data(this,"droppable");if(f.options.greedy&&a.ui.intersect(b,a.extend(f,{offset:f.element.offset()}),f.options.tolerance)){e=true;return false}});if(e){return false}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("drop",c,this.ui(b));return this.element}return false},ui:function(b){return{draggable:(b.currentItem||b.element),helper:b.helper,position:b.position,absolutePosition:b.positionAbs,offset:b.positionAbs}}});a.extend(a.ui.droppable,{version:"1.7.1",eventPrefix:"drop",defaults:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"}});a.ui.intersect=function(q,j,o){if(!j.offset){return false}var e=(q.positionAbs||q.position.absolute).left,d=e+q.helperProportions.width,n=(q.positionAbs||q.position.absolute).top,m=n+q.helperProportions.height;var g=j.offset.left,c=g+j.proportions.width,p=j.offset.top,k=p+j.proportions.height;switch(o){case"fit":return(g<e&&d<c&&p<n&&m<k);break;case"intersect":return(g<e+(q.helperProportions.width/2)&&d-(q.helperProportions.width/2)<c&&p<n+(q.helperProportions.height/2)&&m-(q.helperProportions.height/2)<k);break;case"pointer":var h=((q.positionAbs||q.position.absolute).left+(q.clickOffset||q.offset.click).left),i=((q.positionAbs||q.position.absolute).top+(q.clickOffset||q.offset.click).top),f=a.ui.isOver(i,h,p,g,j.proportions.height,j.proportions.width);return f;break;case"touch":return((n>=p&&n<=k)||(m>=p&&m<=k)||(n<p&&m>k))&&((e>=g&&e<=c)||(d>=g&&d<=c)||(e<g&&d>c));break;default:return false;break}};a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,g){var b=a.ui.ddmanager.droppables[e.options.scope];var f=g?g.type:null;var h=(e.currentItem||e.element).find(":data(droppable)").andSelf();droppablesLoop:for(var d=0;d<b.length;d++){if(b[d].options.disabled||(e&&!b[d].options.accept.call(b[d].element[0],(e.currentItem||e.element)))){continue}for(var c=0;c<h.length;c++){if(h[c]==b[d].element[0]){b[d].proportions.height=0;continue droppablesLoop}}b[d].visible=b[d].element.css("display")!="none";if(!b[d].visible){continue}b[d].offset=b[d].element.offset();b[d].proportions={width:b[d].element[0].offsetWidth,height:b[d].element[0].offsetHeight};if(f=="mousedown"){b[d]._activate.call(b[d],g)}}},drop:function(b,c){var d=false;a.each(a.ui.ddmanager.droppables[b.options.scope],function(){if(!this.options){return}if(!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)){d=this._drop.call(this,c)}if(!this.options.disabled&&this.visible&&this.options.accept.call(this.element[0],(b.currentItem||b.element))){this.isout=1;this.isover=0;this._deactivate.call(this,c)}});return d},drag:function(b,c){if(b.options.refreshPositions){a.ui.ddmanager.prepareOffsets(b,c)}a.each(a.ui.ddmanager.droppables[b.options.scope],function(){if(this.options.disabled||this.greedyChild||!this.visible){return}var e=a.ui.intersect(b,this,this.options.tolerance);var g=!e&&this.isover==1?"isout":(e&&this.isover==0?"isover":null);if(!g){return}var f;if(this.options.greedy){var d=this.element.parents(":data(droppable):eq(0)");if(d.length){f=a.data(d[0],"droppable");f.greedyChild=(g=="isover"?1:0)}}if(f&&g=="isover"){f.isover=0;f.isout=1;f._out.call(f,c)}this[g]=1;this[g=="isout"?"isover":"isout"]=0;this[g=="isover"?"_over":"_out"].call(this,c);if(f&&g=="isout"){f.isout=0;f.isover=1;f._over.call(f,c)}})}}})(jQuery);;/*
 * jQuery UI Resizable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	ui.core.js
 */(function(c){c.widget("ui.resizable",c.extend({},c.ui.mouse,{_init:function(){var e=this,j=this.options;this.element.addClass("ui-resizable");c.extend(this,{_aspectRatio:!!(j.aspectRatio),aspectRatio:j.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:j.helper||j.ghost||j.animate?j.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){if(/relative/.test(this.element.css("position"))&&c.browser.opera){this.element.css({position:"relative",top:"auto",left:"auto"})}this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=j.handles||(!c(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"}var k=this.handles.split(",");this.handles={};for(var f=0;f<k.length;f++){var h=c.trim(k[f]),d="ui-resizable-"+h;var g=c('<div class="ui-resizable-handle '+d+'"></div>');if(/sw|se|ne|nw/.test(h)){g.css({zIndex:++j.zIndex})}if("se"==h){g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")}this.handles[h]=".ui-resizable-"+h;this.element.append(g)}}this._renderAxis=function(p){p=p||this.element;for(var m in this.handles){if(this.handles[m].constructor==String){this.handles[m]=c(this.handles[m],this.element).show()}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var n=c(this.handles[m],this.element),o=0;o=/sw|ne|nw|se|n|s/.test(m)?n.outerHeight():n.outerWidth();var l=["padding",/ne|nw|n/.test(m)?"Top":/se|sw|s/.test(m)?"Bottom":/^e$/.test(m)?"Right":"Left"].join("");p.css(l,o);this._proportionallyResize()}if(!c(this.handles[m]).length){continue}}};this._renderAxis(this.element);this._handles=c(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function(){if(!e.resizing){if(this.className){var i=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)}e.axis=i&&i[1]?i[1]:"se"}});if(j.autoHide){this._handles.hide();c(this.element).addClass("ui-resizable-autohide").hover(function(){c(this).removeClass("ui-resizable-autohide");e._handles.show()},function(){if(!e.resizing){c(this).addClass("ui-resizable-autohide");e._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var d=function(f){c(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){d(this.element);var e=this.element;e.parent().append(this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")})).end().remove()}this.originalElement.css("resize",this.originalResizeStyle);d(this.originalElement)},_mouseCapture:function(e){var f=false;for(var d in this.handles){if(c(this.handles[d])[0]==e.target){f=true}}return this.options.disabled||!!f},_mouseStart:function(f){var i=this.options,e=this.element.position(),d=this.element;this.resizing=true;this.documentScroll={top:c(document).scrollTop(),left:c(document).scrollLeft()};if(d.is(".ui-draggable")||(/absolute/).test(d.css("position"))){d.css({position:"absolute",top:e.top,left:e.left})}if(c.browser.opera&&(/relative/).test(d.css("position"))){d.css({position:"relative",top:"auto",left:"auto"})}this._renderProxy();var j=b(this.helper.css("left")),g=b(this.helper.css("top"));if(i.containment){j+=c(i.containment).scrollLeft()||0;g+=c(i.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:j,top:g};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:j,top:g};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:f.pageX,top:f.pageY};this.aspectRatio=(typeof i.aspectRatio=="number")?i.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);var h=c(".ui-resizable-"+this.axis).css("cursor");c("body").css("cursor",h=="auto"?this.axis+"-resize":h);d.addClass("ui-resizable-resizing");this._propagate("start",f);return true},_mouseDrag:function(d){var g=this.helper,f=this.options,l={},p=this,i=this.originalMousePosition,m=this.axis;var q=(d.pageX-i.left)||0,n=(d.pageY-i.top)||0;var h=this._change[m];if(!h){return false}var k=h.apply(this,[d,q,n]),j=c.browser.msie&&c.browser.version<7,e=this.sizeDiff;if(this._aspectRatio||d.shiftKey){k=this._updateRatio(k,d)}k=this._respectSize(k,d);this._propagate("resize",d);g.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()}this._updateCache(k);this._trigger("resize",d,this.ui());return false},_mouseStop:function(g){this.resizing=false;var h=this.options,l=this;if(this._helper){var f=this._proportionallyResizeElements,d=f.length&&(/textarea/i).test(f[0].nodeName),e=d&&c.ui.hasScroll(f[0],"left")?0:l.sizeDiff.height,j=d?0:l.sizeDiff.width;var m={width:(l.size.width-j),height:(l.size.height-e)},i=(parseInt(l.element.css("left"),10)+(l.position.left-l.originalPosition.left))||null,k=(parseInt(l.element.css("top"),10)+(l.position.top-l.originalPosition.top))||null;if(!h.animate){this.element.css(c.extend(m,{top:k,left:i}))}l.helper.height(l.size.height);l.helper.width(l.size.width);if(this._helper&&!h.animate){this._proportionallyResize()}}c("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",g);if(this._helper){this.helper.remove()}return false},_updateCache:function(d){var e=this.options;this.offset=this.helper.offset();if(a(d.left)){this.position.left=d.left}if(a(d.top)){this.position.top=d.top}if(a(d.height)){this.size.height=d.height}if(a(d.width)){this.size.width=d.width}},_updateRatio:function(g,f){var h=this.options,i=this.position,e=this.size,d=this.axis;if(g.height){g.width=(e.height*this.aspectRatio)}else{if(g.width){g.height=(e.width/this.aspectRatio)}}if(d=="sw"){g.left=i.left+(e.width-g.width);g.top=null}if(d=="nw"){g.top=i.top+(e.height-g.height);g.left=i.left+(e.width-g.width)}return g},_respectSize:function(k,f){var i=this.helper,h=this.options,q=this._aspectRatio||f.shiftKey,p=this.axis,s=a(k.width)&&h.maxWidth&&(h.maxWidth<k.width),l=a(k.height)&&h.maxHeight&&(h.maxHeight<k.height),g=a(k.width)&&h.minWidth&&(h.minWidth>k.width),r=a(k.height)&&h.minHeight&&(h.minHeight>k.height);if(g){k.width=h.minWidth}if(r){k.height=h.minHeight}if(s){k.width=h.maxWidth}if(l){k.height=h.maxHeight}var e=this.originalPosition.left+this.originalSize.width,n=this.position.top+this.size.height;var j=/sw|nw|w/.test(p),d=/nw|ne|n/.test(p);if(g&&j){k.left=e-h.minWidth}if(s&&j){k.left=e-h.maxWidth}if(r&&d){k.top=n-h.minHeight}if(l&&d){k.top=n-h.maxHeight}var m=!k.width&&!k.height;if(m&&!k.left&&k.top){k.top=null}else{if(m&&!k.top&&k.left){k.left=null}}return k},_proportionallyResize:function(){var j=this.options;if(!this._proportionallyResizeElements.length){return}var f=this.helper||this.element;for(var e=0;e<this._proportionallyResizeElements.length;e++){var g=this._proportionallyResizeElements[e];if(!this.borderDif){var d=[g.css("borderTopWidth"),g.css("borderRightWidth"),g.css("borderBottomWidth"),g.css("borderLeftWidth")],h=[g.css("paddingTop"),g.css("paddingRight"),g.css("paddingBottom"),g.css("paddingLeft")];this.borderDif=c.map(d,function(k,m){var l=parseInt(k,10)||0,n=parseInt(h[m],10)||0;return l+n})}if(c.browser.msie&&!(!(c(f).is(":hidden")||c(f).parents(":hidden").length))){continue}g.css({height:(f.height()-this.borderDif[0]-this.borderDif[2])||0,width:(f.width()-this.borderDif[1]-this.borderDif[3])||0})}},_renderProxy:function(){var e=this.element,h=this.options;this.elementOffset=e.offset();if(this._helper){this.helper=this.helper||c('<div style="overflow:hidden;"></div>');var d=c.browser.msie&&c.browser.version<7,f=(d?1:0),g=(d?2:-1);this.helper.addClass(this._helper).css({width:this.element.outerWidth()+g,height:this.element.outerHeight()+g,position:"absolute",left:this.elementOffset.left-f+"px",top:this.elementOffset.top-f+"px",zIndex:++h.zIndex});this.helper.appendTo("body").disableSelection()}else{this.helper=this.element}},_change:{e:function(f,e,d){return{width:this.originalSize.width+e}},w:function(g,e,d){var i=this.options,f=this.originalSize,h=this.originalPosition;return{left:h.left+e,width:f.width-e}},n:function(g,e,d){var i=this.options,f=this.originalSize,h=this.originalPosition;return{top:h.top+d,height:f.height-d}},s:function(f,e,d){return{height:this.originalSize.height+d}},se:function(f,e,d){return c.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[f,e,d]))},sw:function(f,e,d){return c.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[f,e,d]))},ne:function(f,e,d){return c.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[f,e,d]))},nw:function(f,e,d){return c.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[f,e,d]))}},_propagate:function(e,d){c.ui.plugin.call(this,e,[d,this.ui()]);(e!="resize"&&this._trigger(e,d,this.ui()))},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}));c.extend(c.ui.resizable,{version:"1.7.1",eventPrefix:"resize",defaults:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,cancel:":input,option",containment:false,delay:0,distance:1,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000}});c.ui.plugin.add("resizable","alsoResize",{start:function(e,f){var d=c(this).data("resizable"),g=d.options;_store=function(h){c(h).each(function(){c(this).data("resizable-alsoresize",{width:parseInt(c(this).width(),10),height:parseInt(c(this).height(),10),left:parseInt(c(this).css("left"),10),top:parseInt(c(this).css("top"),10)})})};if(typeof(g.alsoResize)=="object"&&!g.alsoResize.parentNode){if(g.alsoResize.length){g.alsoResize=g.alsoResize[0];_store(g.alsoResize)}else{c.each(g.alsoResize,function(h,i){_store(h)})}}else{_store(g.alsoResize)}},resize:function(f,h){var e=c(this).data("resizable"),i=e.options,g=e.originalSize,k=e.originalPosition;var j={height:(e.size.height-g.height)||0,width:(e.size.width-g.width)||0,top:(e.position.top-k.top)||0,left:(e.position.left-k.left)||0},d=function(l,m){c(l).each(function(){var p=c(this),q=c(this).data("resizable-alsoresize"),o={},n=m&&m.length?m:["width","height","top","left"];c.each(n||["width","height","top","left"],function(r,t){var s=(q[t]||0)+(j[t]||0);if(s&&s>=0){o[t]=s||null}});if(/relative/.test(p.css("position"))&&c.browser.opera){e._revertToRelativePosition=true;p.css({position:"absolute",top:"auto",left:"auto"})}p.css(o)})};if(typeof(i.alsoResize)=="object"&&!i.alsoResize.nodeType){c.each(i.alsoResize,function(l,m){d(l,m)})}else{d(i.alsoResize)}},stop:function(e,f){var d=c(this).data("resizable");if(d._revertToRelativePosition&&c.browser.opera){d._revertToRelativePosition=false;el.css({position:"relative"})}c(this).removeData("resizable-alsoresize-start")}});c.ui.plugin.add("resizable","animate",{stop:function(h,m){var n=c(this).data("resizable"),i=n.options;var g=n._proportionallyResizeElements,d=g.length&&(/textarea/i).test(g[0].nodeName),e=d&&c.ui.hasScroll(g[0],"left")?0:n.sizeDiff.height,k=d?0:n.sizeDiff.width;var f={width:(n.size.width-k),height:(n.size.height-e)},j=(parseInt(n.element.css("left"),10)+(n.position.left-n.originalPosition.left))||null,l=(parseInt(n.element.css("top"),10)+(n.position.top-n.originalPosition.top))||null;n.element.animate(c.extend(f,l&&j?{top:l,left:j}:{}),{duration:i.animateDuration,easing:i.animateEasing,step:function(){var o={width:parseInt(n.element.css("width"),10),height:parseInt(n.element.css("height"),10),top:parseInt(n.element.css("top"),10),left:parseInt(n.element.css("left"),10)};if(g&&g.length){c(g[0]).css({width:o.width,height:o.height})}n._updateCache(o);n._propagate("resize",h)}})}});c.ui.plugin.add("resizable","containment",{start:function(e,q){var s=c(this).data("resizable"),i=s.options,k=s.element;var f=i.containment,j=(f instanceof c)?f.get(0):(/parent/.test(f))?k.parent().get(0):f;if(!j){return}s.containerElement=c(j);if(/document/.test(f)||f==document){s.containerOffset={left:0,top:0};s.containerPosition={left:0,top:0};s.parentData={element:c(document),left:0,top:0,width:c(document).width(),height:c(document).height()||document.body.parentNode.scrollHeight}}else{var m=c(j),h=[];c(["Top","Right","Left","Bottom"]).each(function(p,o){h[p]=b(m.css("padding"+o))});s.containerOffset=m.offset();s.containerPosition=m.position();s.containerSize={height:(m.innerHeight()-h[3]),width:(m.innerWidth()-h[1])};var n=s.containerOffset,d=s.containerSize.height,l=s.containerSize.width,g=(c.ui.hasScroll(j,"left")?j.scrollWidth:l),r=(c.ui.hasScroll(j)?j.scrollHeight:d);s.parentData={element:j,left:n.left,top:n.top,width:g,height:r}}},resize:function(f,p){var s=c(this).data("resizable"),h=s.options,e=s.containerSize,n=s.containerOffset,l=s.size,m=s.position,q=s._aspectRatio||f.shiftKey,d={top:0,left:0},g=s.containerElement;if(g[0]!=document&&(/static/).test(g.css("position"))){d=n}if(m.left<(s._helper?n.left:0)){s.size.width=s.size.width+(s._helper?(s.position.left-n.left):(s.position.left-d.left));if(q){s.size.height=s.size.width/h.aspectRatio}s.position.left=h.helper?n.left:0}if(m.top<(s._helper?n.top:0)){s.size.height=s.size.height+(s._helper?(s.position.top-n.top):s.position.top);if(q){s.size.width=s.size.height*h.aspectRatio}s.position.top=s._helper?n.top:0}s.offset.left=s.parentData.left+s.position.left;s.offset.top=s.parentData.top+s.position.top;var k=Math.abs((s._helper?s.offset.left-d.left:(s.offset.left-d.left))+s.sizeDiff.width),r=Math.abs((s._helper?s.offset.top-d.top:(s.offset.top-n.top))+s.sizeDiff.height);var j=s.containerElement.get(0)==s.element.parent().get(0),i=/relative|absolute/.test(s.containerElement.css("position"));if(j&&i){k-=s.parentData.left}if(k+s.size.width>=s.parentData.width){s.size.width=s.parentData.width-k;if(q){s.size.height=s.size.width/s.aspectRatio}}if(r+s.size.height>=s.parentData.height){s.size.height=s.parentData.height-r;if(q){s.size.width=s.size.height*s.aspectRatio}}},stop:function(e,m){var p=c(this).data("resizable"),f=p.options,k=p.position,l=p.containerOffset,d=p.containerPosition,g=p.containerElement;var i=c(p.helper),q=i.offset(),n=i.outerWidth()-p.sizeDiff.width,j=i.outerHeight()-p.sizeDiff.height;if(p._helper&&!f.animate&&(/relative/).test(g.css("position"))){c(this).css({left:q.left-d.left-l.left,width:n,height:j})}if(p._helper&&!f.animate&&(/static/).test(g.css("position"))){c(this).css({left:q.left-d.left-l.left,width:n,height:j})}}});c.ui.plugin.add("resizable","ghost",{start:function(f,g){var d=c(this).data("resizable"),h=d.options,e=d.size;d.ghost=d.originalElement.clone();d.ghost.css({opacity:0.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof h.ghost=="string"?h.ghost:"");d.ghost.appendTo(d.helper)},resize:function(e,f){var d=c(this).data("resizable"),g=d.options;if(d.ghost){d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})}},stop:function(e,f){var d=c(this).data("resizable"),g=d.options;if(d.ghost&&d.helper){d.helper.get(0).removeChild(d.ghost.get(0))}}});c.ui.plugin.add("resizable","grid",{resize:function(d,l){var n=c(this).data("resizable"),g=n.options,j=n.size,h=n.originalSize,i=n.originalPosition,m=n.axis,k=g._aspectRatio||d.shiftKey;g.grid=typeof g.grid=="number"?[g.grid,g.grid]:g.grid;var f=Math.round((j.width-h.width)/(g.grid[0]||1))*(g.grid[0]||1),e=Math.round((j.height-h.height)/(g.grid[1]||1))*(g.grid[1]||1);if(/^(se|s|e)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e}else{if(/^(ne)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e;n.position.top=i.top-e}else{if(/^(sw)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e;n.position.left=i.left-f}else{n.size.width=h.width+f;n.size.height=h.height+e;n.position.top=i.top-e;n.position.left=i.left-f}}}}});var b=function(d){return parseInt(d,10)||0};var a=function(d){return !isNaN(parseInt(d,10))}})(jQuery);;/*
 * jQuery UI Selectable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	ui.core.js
 */(function(a){a.widget("ui.selectable",a.extend({},a.ui.mouse,{_init:function(){var b=this;this.element.addClass("ui-selectable");this.dragged=false;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]);c.each(function(){var d=a(this);var e=d.offset();a.data(this,"selectable-item",{element:this,$element:d,left:e.left,top:e.top,right:e.left+d.outerWidth(),bottom:e.top+d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")})})};this.refresh();this.selectees=c.addClass("ui-selectee");this._mouseInit();this.helper=a(document.createElement("div")).css({border:"1px dotted black"}).addClass("ui-selectable-helper")},destroy:function(){this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy()},_mouseStart:function(d){var b=this;this.opos=[d.pageX,d.pageY];if(this.options.disabled){return}var c=this.options;this.selectees=a(c.filter,this.element[0]);this._trigger("start",d);a(c.appendTo).append(this.helper);this.helper.css({"z-index":100,position:"absolute",left:d.clientX,top:d.clientY,width:0,height:0});if(c.autoRefresh){this.refresh()}this.selectees.filter(".ui-selected").each(function(){var e=a.data(this,"selectable-item");e.startselected=true;if(!d.metaKey){e.$element.removeClass("ui-selected");e.selected=false;e.$element.addClass("ui-unselecting");e.unselecting=true;b._trigger("unselecting",d,{unselecting:e.element})}});a(d.target).parents().andSelf().each(function(){var e=a.data(this,"selectable-item");if(e){e.$element.removeClass("ui-unselecting").addClass("ui-selecting");e.unselecting=false;e.selecting=true;e.selected=true;b._trigger("selecting",d,{selecting:e.element});return false}})},_mouseDrag:function(i){var c=this;this.dragged=true;if(this.options.disabled){return}var e=this.options;var d=this.opos[0],h=this.opos[1],b=i.pageX,g=i.pageY;if(d>b){var f=b;b=d;d=f}if(h>g){var f=g;g=h;h=f}this.helper.css({left:d,top:h,width:b-d,height:g-h});this.selectees.each(function(){var j=a.data(this,"selectable-item");if(!j||j.element==c.element[0]){return}var k=false;if(e.tolerance=="touch"){k=(!(j.left>b||j.right<d||j.top>g||j.bottom<h))}else{if(e.tolerance=="fit"){k=(j.left>d&&j.right<b&&j.top>h&&j.bottom<g)}}if(k){if(j.selected){j.$element.removeClass("ui-selected");j.selected=false}if(j.unselecting){j.$element.removeClass("ui-unselecting");j.unselecting=false}if(!j.selecting){j.$element.addClass("ui-selecting");j.selecting=true;c._trigger("selecting",i,{selecting:j.element})}}else{if(j.selecting){if(i.metaKey&&j.startselected){j.$element.removeClass("ui-selecting");j.selecting=false;j.$element.addClass("ui-selected");j.selected=true}else{j.$element.removeClass("ui-selecting");j.selecting=false;if(j.startselected){j.$element.addClass("ui-unselecting");j.unselecting=true}c._trigger("unselecting",i,{unselecting:j.element})}}if(j.selected){if(!i.metaKey&&!j.startselected){j.$element.removeClass("ui-selected");j.selected=false;j.$element.addClass("ui-unselecting");j.unselecting=true;c._trigger("unselecting",i,{unselecting:j.element})}}}});return false},_mouseStop:function(d){var b=this;this.dragged=false;var c=this.options;a(".ui-unselecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-unselecting");e.unselecting=false;e.startselected=false;b._trigger("unselected",d,{unselected:e.element})});a(".ui-selecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-selecting").addClass("ui-selected");e.selecting=false;e.selected=true;e.startselected=true;b._trigger("selected",d,{selected:e.element})});this._trigger("stop",d);this.helper.remove();return false}}));a.extend(a.ui.selectable,{version:"1.7.1",defaults:{appendTo:"body",autoRefresh:true,cancel:":input,option",delay:0,distance:0,filter:"*",tolerance:"touch"}})})(jQuery);;/*
 * jQuery UI Sortable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	ui.core.js
 */(function(a){a.widget("ui.sortable",a.extend({},a.ui.mouse,{_init:function(){var b=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?(/left|right/).test(this.items[0].item.css("float")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--){this.items[b].item.removeData("sortable-item")}},_mouseCapture:function(e,f){if(this.reverting){return false}if(this.options.disabled||this.options.type=="static"){return false}this._refreshItems(e);var d=null,c=this,b=a(e.target).parents().each(function(){if(a.data(this,"sortable-item")==c){d=a(this);return false}});if(a.data(e.target,"sortable-item")==c){d=a(e.target)}if(!d){return false}if(this.options.handle&&!f){var g=false;a(this.options.handle,d).find("*").andSelf().each(function(){if(this==e.target){g=true}});if(!g){return false}}this.currentItem=d;this._removeCurrentsFromItems();return true},_mouseStart:function(e,f,b){var g=this.options,c=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(e);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");a.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(e);this.originalPageX=e.pageX;this.originalPageY=e.pageY;if(g.cursorAt){this._adjustOffsetFromHelper(g.cursorAt)}this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()}this._createPlaceholder();if(g.containment){this._setContainment()}if(g.cursor){if(a("body").css("cursor")){this._storedCursor=a("body").css("cursor")}a("body").css("cursor",g.cursor)}if(g.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")}this.helper.css("opacity",g.opacity)}if(g.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")}this.helper.css("zIndex",g.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()}this._trigger("start",e,this._uiHash());if(!this._preserveHelperProportions){this._cacheHelperProportions()}if(!b){for(var d=this.containers.length-1;d>=0;d--){this.containers[d]._trigger("activate",e,c._uiHash(this))}}if(a.ui.ddmanager){a.ui.ddmanager.current=this}if(a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,e)}this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(e);return true},_mouseDrag:function(f){this.position=this._generatePosition(f);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs}if(this.options.scroll){var g=this.options,b=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-f.pageY<g.scrollSensitivity){this.scrollParent[0].scrollTop=b=this.scrollParent[0].scrollTop+g.scrollSpeed}else{if(f.pageY-this.overflowOffset.top<g.scrollSensitivity){this.scrollParent[0].scrollTop=b=this.scrollParent[0].scrollTop-g.scrollSpeed}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-f.pageX<g.scrollSensitivity){this.scrollParent[0].scrollLeft=b=this.scrollParent[0].scrollLeft+g.scrollSpeed}else{if(f.pageX-this.overflowOffset.left<g.scrollSensitivity){this.scrollParent[0].scrollLeft=b=this.scrollParent[0].scrollLeft-g.scrollSpeed}}}else{if(f.pageY-a(document).scrollTop()<g.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()-g.scrollSpeed)}else{if(a(window).height()-(f.pageY-a(document).scrollTop())<g.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()+g.scrollSpeed)}}if(f.pageX-a(document).scrollLeft()<g.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()-g.scrollSpeed)}else{if(a(window).width()-(f.pageX-a(document).scrollLeft())<g.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()+g.scrollSpeed)}}}if(b!==false&&a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,f)}}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}for(var d=this.items.length-1;d>=0;d--){var e=this.items[d],c=e.item[0],h=this._intersectsWithPointer(e);if(!h){continue}if(c!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=c&&!a.ui.contains(this.placeholder[0],c)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],c):true)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(e)){this._rearrange(f,e)}else{break}this._trigger("change",f,this._uiHash());break}}this._contactContainers(f);if(a.ui.ddmanager){a.ui.ddmanager.drag(this,f)}this._trigger("sort",f,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(c,d){if(!c){return}if(a.ui.ddmanager&&!this.options.dropBehaviour){a.ui.ddmanager.drop(this,c)}if(this.options.revert){var b=this;var e=b.placeholder.offset();b.reverting=true;a(this.helper).animate({left:e.left-this.offset.parent.left-b.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-b.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){b._clear(c)})}else{this._clear(c,d)}return false},cancel:function(){var b=this;if(this.dragging){this._mouseUp();if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else{this.currentItem.show()}for(var c=this.containers.length-1;c>=0;c--){this.containers[c]._trigger("deactivate",null,b._uiHash(this));if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",null,b._uiHash(this));this.containers[c].containerCache.over=0}}}if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()}a.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});if(this.domPosition.prev){a(this.domPosition.prev).after(this.currentItem)}else{a(this.domPosition.parent).prepend(this.currentItem)}return true},serialize:function(d){var b=this._getItemsAsjQuery(d&&d.connected);var c=[];d=d||{};a(b).each(function(){var e=(a(d.item||this).attr(d.attribute||"id")||"").match(d.expression||(/(.+)[-=_](.+)/));if(e){c.push((d.key||e[1]+"[]")+"="+(d.key&&d.expression?e[1]:e[2]))}});return c.join("&")},toArray:function(d){var b=this._getItemsAsjQuery(d&&d.connected);var c=[];d=d||{};b.each(function(){c.push(a(d.item||this).attr(d.attribute||"id")||"")});return c},_intersectsWith:function(m){var e=this.positionAbs.left,d=e+this.helperProportions.width,k=this.positionAbs.top,j=k+this.helperProportions.height;var f=m.left,c=f+m.width,n=m.top,i=n+m.height;var o=this.offset.click.top,h=this.offset.click.left;var g=(k+o)>n&&(k+o)<i&&(e+h)>f&&(e+h)<c;if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>m[this.floating?"width":"height"])){return g}else{return(f<e+(this.helperProportions.width/2)&&d-(this.helperProportions.width/2)<c&&n<k+(this.helperProportions.height/2)&&j-(this.helperProportions.height/2)<i)}},_intersectsWithPointer:function(d){var e=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,d.top,d.height),c=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,d.left,d.width),g=e&&c,b=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();if(!g){return false}return this.floating?(((f&&f=="right")||b=="down")?2:1):(b&&(b=="down"?2:1))},_intersectsWithSides:function(e){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+(e.height/2),e.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+(e.width/2),e.width),b=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();if(this.floating&&f){return((f=="right"&&d)||(f=="left"&&!d))}else{return b&&((b=="down"&&c)||(b=="up"&&!c))}},_getDragVerticalDirection:function(){var b=this.positionAbs.top-this.lastPositionAbs.top;return b!=0&&(b>0?"down":"up")},_getDragHorizontalDirection:function(){var b=this.positionAbs.left-this.lastPositionAbs.left;return b!=0&&(b>0?"right":"left")},refresh:function(b){this._refreshItems(b);this.refreshPositions()},_connectWith:function(){var b=this.options;return b.connectWith.constructor==String?[b.connectWith]:b.connectWith},_getItemsAsjQuery:function(b){var l=this;var g=[];var e=[];var h=this._connectWith();if(h&&b){for(var d=h.length-1;d>=0;d--){var k=a(h[d]);for(var c=k.length-1;c>=0;c--){var f=a.data(k[c],"sortable");if(f&&f!=this&&!f.options.disabled){e.push([a.isFunction(f.options.items)?f.options.items.call(f.element):a(f.options.items,f.element).not(".ui-sortable-helper"),f])}}}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper"),this]);for(var d=e.length-1;d>=0;d--){e[d][0].each(function(){g.push(this)})}return a(g)},_removeCurrentsFromItems:function(){var d=this.currentItem.find(":data(sortable-item)");for(var c=0;c<this.items.length;c++){for(var b=0;b<d.length;b++){if(d[b]==this.items[c].item[0]){this.items.splice(c,1)}}}},_refreshItems:function(b){this.items=[];this.containers=[this];var h=this.items;var p=this;var f=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]];var l=this._connectWith();if(l){for(var e=l.length-1;e>=0;e--){var m=a(l[e]);for(var d=m.length-1;d>=0;d--){var g=a.data(m[d],"sortable");if(g&&g!=this&&!g.options.disabled){f.push([a.isFunction(g.options.items)?g.options.items.call(g.element[0],b,{item:this.currentItem}):a(g.options.items,g.element),g]);this.containers.push(g)}}}}for(var e=f.length-1;e>=0;e--){var k=f[e][1];var c=f[e][0];for(var d=0,n=c.length;d<n;d++){var o=a(c[d]);o.data("sortable-item",k);h.push({item:o,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()}for(var d=this.items.length-1;d>=0;d--){var e=this.items[d];if(e.instance!=this.currentContainer&&this.currentContainer&&e.item[0]!=this.currentItem[0]){continue}var c=this.options.toleranceElement?a(this.options.toleranceElement,e.item):e.item;if(!b){e.width=c.outerWidth();e.height=c.outerHeight()}var f=c.offset();e.left=f.left;e.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)}else{for(var d=this.containers.length-1;d>=0;d--){var f=this.containers[d].element.offset();this.containers[d].containerCache.left=f.left;this.containers[d].containerCache.top=f.top;this.containers[d].containerCache.width=this.containers[d].element.outerWidth();this.containers[d].containerCache.height=this.containers[d].element.outerHeight()}}},_createPlaceholder:function(d){var b=d||this,e=b.options;if(!e.placeholder||e.placeholder.constructor==String){var c=e.placeholder;e.placeholder={element:function(){var f=a(document.createElement(b.currentItem[0].nodeName)).addClass(c||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!c){f.style.visibility="hidden"}return f},update:function(f,g){if(c&&!e.forcePlaceholderSize){return}if(!g.height()){g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10))}if(!g.width()){g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}}b.placeholder=a(e.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);e.placeholder.update(b,b.placeholder)},_contactContainers:function(d){for(var c=this.containers.length-1;c>=0;c--){if(this._intersectsWith(this.containers[c].containerCache)){if(!this.containers[c].containerCache.over){if(this.currentContainer!=this.containers[c]){var h=10000;var g=null;var e=this.positionAbs[this.containers[c].floating?"left":"top"];for(var b=this.items.length-1;b>=0;b--){if(!a.ui.contains(this.containers[c].element[0],this.items[b].item[0])){continue}var f=this.items[b][this.containers[c].floating?"left":"top"];if(Math.abs(f-e)<h){h=Math.abs(f-e);g=this.items[b]}}if(!g&&!this.options.dropOnEmpty){continue}this.currentContainer=this.containers[c];g?this._rearrange(d,g,null,true):this._rearrange(d,null,this.containers[c].element,true);this._trigger("change",d,this._uiHash());this.containers[c]._trigger("change",d,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder)}this.containers[c]._trigger("over",d,this._uiHash(this));this.containers[c].containerCache.over=1}}else{if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",d,this._uiHash(this));this.containers[c].containerCache.over=0}}}},_createHelper:function(c){var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c,this.currentItem])):(d.helper=="clone"?this.currentItem.clone():this.currentItem);if(!b.parents("body").length){a(d.appendTo!="parent"?d.appendTo:this.currentItem[0].parentNode)[0].appendChild(b[0])}if(b[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}}if(b[0].style.width==""||d.forceHelperSize){b.width(this.currentItem.width())}if(b[0].style.height==""||d.forceHelperSize){b.height(this.currentItem.height())}return b},_adjustOffsetFromHelper:function(b){if(b.left!=undefined){this.offset.click.left=b.left+this.margins.left}if(b.right!=undefined){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left}if(b.top!=undefined){this.offset.click.top=b.top+this.margins.top}if(b.bottom!=undefined){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)){b={top:0,left:0}}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.currentItem.position();return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e=this.options;if(e.containment=="parent"){e.containment=this.helper[0].parentNode}if(e.containment=="document"||e.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(e.containment)){var c=a(e.containment)[0];var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(f,h){if(!h){h=this.position}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))}},_generatePosition:function(e){var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()}var d=e.pageX;var c=e.pageY;if(this.originalPosition){if(this.containment){if(e.pageX-this.offset.click.left<this.containment[0]){d=this.containment[0]+this.offset.click.left}if(e.pageY-this.offset.click.top<this.containment[1]){c=this.containment[1]+this.offset.click.top}if(e.pageX-this.offset.click.left>this.containment[2]){d=this.containment[2]+this.offset.click.left}if(e.pageY-this.offset.click.top>this.containment[3]){c=this.containment[3]+this.offset.click.top}}if(h.grid){var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f}}return{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))}},_rearrange:function(g,f,c,e){c?c[0].appendChild(this.placeholder[0]):f.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?f.item[0]:f.item[0].nextSibling));this.counter=this.counter?++this.counter:1;var d=this,b=this.counter;window.setTimeout(function(){if(b==d.counter){d.refreshPositions(!e)}},0)},_clear:function(d,e){this.reverting=false;var f=[],b=this;if(!this._noFinalSort&&this.currentItem[0].parentNode){this.placeholder.before(this.currentItem)}this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var c in this._storedCSS){if(this._storedCSS[c]=="auto"||this._storedCSS[c]=="static"){this._storedCSS[c]=""}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else{this.currentItem.show()}if(this.fromOutside&&!e){f.push(function(g){this._trigger("receive",g,this._uiHash(this.fromOutside))})}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!e){f.push(function(g){this._trigger("update",g,this._uiHash())})}if(!a.ui.contains(this.element[0],this.currentItem[0])){if(!e){f.push(function(g){this._trigger("remove",g,this._uiHash())})}for(var c=this.containers.length-1;c>=0;c--){if(a.ui.contains(this.containers[c].element[0],this.currentItem[0])&&!e){f.push((function(g){return function(h){g._trigger("receive",h,this._uiHash(this))}}).call(this,this.containers[c]));f.push((function(g){return function(h){g._trigger("update",h,this._uiHash(this))}}).call(this,this.containers[c]))}}}for(var c=this.containers.length-1;c>=0;c--){if(!e){f.push((function(g){return function(h){g._trigger("deactivate",h,this._uiHash(this))}}).call(this,this.containers[c]))}if(this.containers[c].containerCache.over){f.push((function(g){return function(h){g._trigger("out",h,this._uiHash(this))}}).call(this,this.containers[c]));this.containers[c].containerCache.over=0}}if(this._storedCursor){a("body").css("cursor",this._storedCursor)}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)}this.dragging=false;if(this.cancelHelperRemoval){if(!e){this._trigger("beforeStop",d,this._uiHash());for(var c=0;c<f.length;c++){f[c].call(this,d)}this._trigger("stop",d,this._uiHash())}return false}if(!e){this._trigger("beforeStop",d,this._uiHash())}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(this.helper[0]!=this.currentItem[0]){this.helper.remove()}this.helper=null;if(!e){for(var c=0;c<f.length;c++){f[c].call(this,d)}this._trigger("stop",d,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){if(a.widget.prototype._trigger.apply(this,arguments)===false){this.cancel()}},_uiHash:function(c){var b=c||this;return{helper:b.helper,placeholder:b.placeholder||a([]),position:b.position,absolutePosition:b.positionAbs,offset:b.positionAbs,item:b.currentItem,sender:c?c.element:null}}}));a.extend(a.ui.sortable,{getter:"serialize toArray",version:"1.7.1",eventPrefix:"sort",defaults:{appendTo:"parent",axis:false,cancel:":input,option",connectWith:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000}})})(jQuery);;/*
 * jQuery UI Accordion 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	ui.core.js
 */(function(a){a.widget("ui.accordion",{_init:function(){var d=this.options,b=this;this.running=0;if(d.collapsible==a.ui.accordion.defaults.collapsible&&d.alwaysOpen!=a.ui.accordion.defaults.alwaysOpen){d.collapsible=!d.alwaysOpen}if(d.navigation){var c=this.element.find("a").filter(d.navigationFilter);if(c.length){if(c.filter(d.header).length){this.active=c}else{this.active=c.parent().parent().prev();c.addClass("ui-accordion-content-active")}}}this.element.addClass("ui-accordion ui-widget ui-helper-reset");if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")}this.headers=this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){a(this).removeClass("ui-state-focus")});this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");this.active=this._findActive(this.active||d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");this.active.next().addClass("ui-accordion-content-active");a("<span/>").addClass("ui-icon "+d.icons.header).prependTo(this.headers);this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);if(a.browser.msie){this.element.find("a").css("zoom","1")}this.resize();this.element.attr("role","tablist");this.headers.attr("role","tab").bind("keydown",function(e){return b._keydown(e)}).next().attr("role","tabpanel");this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")}if(!a.browser.safari){this.headers.find("a").attr("tabIndex","-1")}if(d.event){this.headers.bind((d.event)+".accordion",function(e){return b._clickHandler.call(b,e,this)})}},destroy:function(){var c=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");this.headers.find("a").removeAttr("tabindex");this.headers.children(".ui-icon").remove();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");if(c.autoHeight||c.fillHeight){b.css("height","")}},_setData:function(b,c){if(b=="alwaysOpen"){b="collapsible";c=!c}a.widget.prototype._setData.apply(this,arguments)},_keydown:function(e){var g=this.options,f=a.ui.keyCode;if(g.disabled||e.altKey||e.ctrlKey){return}var d=this.headers.length;var b=this.headers.index(e.target);var c=false;switch(e.keyCode){case f.RIGHT:case f.DOWN:c=this.headers[(b+1)%d];break;case f.LEFT:case f.UP:c=this.headers[(b-1+d)%d];break;case f.SPACE:case f.ENTER:return this._clickHandler({target:e.target},e.target)}if(c){a(e.target).attr("tabIndex","-1");a(c).attr("tabIndex","0");c.focus();return false}return true},resize:function(){var e=this.options,d;if(e.fillSpace){if(a.browser.msie){var b=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}d=this.element.parent().height();if(a.browser.msie){this.element.parent().css("overflow",b)}this.headers.each(function(){d-=a(this).outerHeight()});var c=0;this.headers.next().each(function(){c=Math.max(c,a(this).innerHeight()-a(this).height())}).height(Math.max(0,d-c)).css("overflow","auto")}else{if(e.autoHeight){d=0;this.headers.next().each(function(){d=Math.max(d,a(this).outerHeight())}).height(d)}}},activate:function(b){var c=this._findActive(b)[0];this._clickHandler({target:c},c)},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===false?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,f){var d=this.options;if(d.disabled){return false}if(!b.target&&d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var h=this.active.next(),e={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:h},c=(this.active=a([]));this._toggle(c,h,e);return false}var g=a(b.currentTarget||f);var i=g[0]==this.active[0];if(this.running||(!d.collapsible&&i)){return false}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");if(!i){g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);g.next().addClass("ui-accordion-content-active")}var c=g.next(),h=this.active.next(),e={options:d,newHeader:i&&d.collapsible?a([]):g,oldHeader:this.active,newContent:i&&d.collapsible?a([]):c.find("> *"),oldContent:h.find("> *")},j=this.headers.index(this.active[0])>this.headers.index(g[0]);this.active=i?a([]):g;this._toggle(c,h,e,i,j);return false},_toggle:function(b,i,g,j,k){var d=this.options,m=this;this.toShow=b;this.toHide=i;this.data=g;var c=function(){if(!m){return}return m._completed.apply(m,arguments)};this._trigger("changestart",null,this.data);this.running=i.size()===0?b.size():i.size();if(d.animated){var f={};if(d.collapsible&&j){f={toShow:a([]),toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}}else{f={toShow:b,toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}}if(!d.proxied){d.proxied=d.animated}if(!d.proxiedDuration){d.proxiedDuration=d.duration}d.animated=a.isFunction(d.proxied)?d.proxied(f):d.proxied;d.duration=a.isFunction(d.proxiedDuration)?d.proxiedDuration(f):d.proxiedDuration;var l=a.ui.accordion.animations,e=d.duration,h=d.animated;if(!l[h]){l[h]=function(n){this.slide(n,{easing:h,duration:e||700})}}l[h](f)}else{if(d.collapsible&&j){b.toggle()}else{i.hide();b.show()}c(true)}i.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();b.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()},_completed:function(b){var c=this.options;this.running=b?0:--this.running;if(this.running){return}if(c.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})}this._trigger("change",null,this.data)}});a.extend(a.ui.accordion,{version:"1.7.1",defaults:{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()}},animations:{slide:function(j,h){j=a.extend({easing:"swing",duration:300},j,h);if(!j.toHide.size()){j.toShow.animate({height:"show"},j);return}if(!j.toShow.size()){j.toHide.animate({height:"hide"},j);return}var c=j.toShow.css("overflow"),g,d={},f={},e=["height","paddingTop","paddingBottom"],b;var i=j.toShow;b=i[0].style.width;i.width(parseInt(i.parent().width(),10)-parseInt(i.css("paddingLeft"),10)-parseInt(i.css("paddingRight"),10)-(parseInt(i.css("borderLeftWidth"),10)||0)-(parseInt(i.css("borderRightWidth"),10)||0));a.each(e,function(k,m){f[m]="hide";var l=(""+a.css(j.toShow[0],m)).match(/^([\d+-.]+)(.*)$/);d[m]={value:l[1],unit:l[2]||"px"}});j.toShow.css({height:0,overflow:"hidden"}).show();j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f,{step:function(k,l){if(l.prop=="height"){g=(l.now-l.start)/(l.end-l.start)}j.toShow[0].style[l.prop]=(g*d[l.prop].value)+d[l.prop].unit},duration:j.duration,easing:j.easing,complete:function(){if(!j.autoHeight){j.toShow.css("height","")}j.toShow.css("width",b);j.toShow.css({overflow:c});j.complete()}})},bounceslide:function(b){this.slide(b,{easing:b.down?"easeOutBounce":"swing",duration:b.down?1000:200})},easeslide:function(b){this.slide(b,{easing:"easeinout",duration:700})}}})})(jQuery);;/*
 * jQuery UI Dialog 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */(function(c){var b={dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"},a="ui-dialog ui-widget ui-widget-content ui-corner-all ";c.widget("ui.dialog",{_init:function(){this.originalTitle=this.element.attr("title");var l=this,m=this.options,j=m.title||this.originalTitle||"&nbsp;",e=c.ui.dialog.getTitleId(this.element),k=(this.uiDialog=c("<div/>")).appendTo(document.body).hide().addClass(a+m.dialogClass).css({position:"absolute",overflow:"hidden",zIndex:m.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(n){(m.closeOnEscape&&n.keyCode&&n.keyCode==c.ui.keyCode.ESCAPE&&l.close(n))}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(n){l.moveToTop(false,n)}),g=this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k),f=(this.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),i=c('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){i.addClass("ui-state-hover")},function(){i.removeClass("ui-state-hover")}).focus(function(){i.addClass("ui-state-focus")}).blur(function(){i.removeClass("ui-state-focus")}).mousedown(function(n){n.stopPropagation()}).click(function(n){l.close(n);return false}).appendTo(f),h=(this.uiDialogTitlebarCloseText=c("<span/>")).addClass("ui-icon ui-icon-closethick").text(m.closeText).appendTo(i),d=c("<span/>").addClass("ui-dialog-title").attr("id",e).html(j).prependTo(f);f.find("*").add(f).disableSelection();(m.draggable&&c.fn.draggable&&this._makeDraggable());(m.resizable&&c.fn.resizable&&this._makeResizable());this._createButtons(m.buttons);this._isOpen=false;(m.bgiframe&&c.fn.bgiframe&&k.bgiframe());(m.autoOpen&&this.open())},destroy:function(){(this.overlay&&this.overlay.destroy());this.uiDialog.hide();this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");this.uiDialog.remove();(this.originalTitle&&this.element.attr("title",this.originalTitle))},close:function(e){var d=this;if(false===d._trigger("beforeclose",e)){return}(d.overlay&&d.overlay.destroy());d.uiDialog.unbind("keypress.ui-dialog");(d.options.hide?d.uiDialog.hide(d.options.hide,function(){d._trigger("close",e)}):d.uiDialog.hide()&&d._trigger("close",e));c.ui.dialog.overlay.resize();d._isOpen=false},isOpen:function(){return this._isOpen},moveToTop:function(f,e){if((this.options.modal&&!f)||(!this.options.stack&&!this.options.modal)){return this._trigger("focus",e)}if(this.options.zIndex>c.ui.dialog.maxZ){c.ui.dialog.maxZ=this.options.zIndex}(this.overlay&&this.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=++c.ui.dialog.maxZ));var d={scrollTop:this.element.attr("scrollTop"),scrollLeft:this.element.attr("scrollLeft")};this.uiDialog.css("z-index",++c.ui.dialog.maxZ);this.element.attr(d);this._trigger("focus",e)},open:function(){if(this._isOpen){return}var e=this.options,d=this.uiDialog;this.overlay=e.modal?new c.ui.dialog.overlay(this):null;(d.next().length&&d.appendTo("body"));this._size();this._position(e.position);d.show(e.show);this.moveToTop(true);(e.modal&&d.bind("keypress.ui-dialog",function(h){if(h.keyCode!=c.ui.keyCode.TAB){return}var g=c(":tabbable",this),i=g.filter(":first")[0],f=g.filter(":last")[0];if(h.target==f&&!h.shiftKey){setTimeout(function(){i.focus()},1)}else{if(h.target==i&&h.shiftKey){setTimeout(function(){f.focus()},1)}}}));c([]).add(d.find(".ui-dialog-content :tabbable:first")).add(d.find(".ui-dialog-buttonpane :tabbable:first")).add(d).filter(":first").focus();this._trigger("open");this._isOpen=true},_createButtons:function(g){var f=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");this.uiDialog.find(".ui-dialog-buttonpane").remove();(typeof g=="object"&&g!==null&&c.each(g,function(){return !(d=true)}));if(d){c.each(g,function(h,i){c('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(h).click(function(){i.apply(f.element[0],arguments)}).hover(function(){c(this).addClass("ui-state-hover")},function(){c(this).removeClass("ui-state-hover")}).focus(function(){c(this).addClass("ui-state-focus")}).blur(function(){c(this).removeClass("ui-state-focus")}).appendTo(e)});e.appendTo(this.uiDialog)}},_makeDraggable:function(){var d=this,f=this.options,e;this.uiDialog.draggable({cancel:".ui-dialog-content",handle:".ui-dialog-titlebar",containment:"document",start:function(){e=f.height;c(this).height(c(this).height()).addClass("ui-dialog-dragging");(f.dragStart&&f.dragStart.apply(d.element[0],arguments))},drag:function(){(f.drag&&f.drag.apply(d.element[0],arguments))},stop:function(){c(this).removeClass("ui-dialog-dragging").height(e);(f.dragStop&&f.dragStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()}})},_makeResizable:function(g){g=(g===undefined?this.options.resizable:g);var d=this,f=this.options,e=typeof g=="string"?g:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",alsoResize:this.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:f.minHeight,start:function(){c(this).addClass("ui-dialog-resizing");(f.resizeStart&&f.resizeStart.apply(d.element[0],arguments))},resize:function(){(f.resize&&f.resize.apply(d.element[0],arguments))},handles:e,stop:function(){c(this).removeClass("ui-dialog-resizing");f.height=c(this).height();f.width=c(this).width();(f.resizeStop&&f.resizeStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()}}).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_position:function(i){var e=c(window),f=c(document),g=f.scrollTop(),d=f.scrollLeft(),h=g;if(c.inArray(i,["center","top","right","bottom","left"])>=0){i=[i=="right"||i=="left"?i:"center",i=="top"||i=="bottom"?i:"middle"]}if(i.constructor!=Array){i=["center","middle"]}if(i[0].constructor==Number){d+=i[0]}else{switch(i[0]){case"left":d+=0;break;case"right":d+=e.width()-this.uiDialog.outerWidth();break;default:case"center":d+=(e.width()-this.uiDialog.outerWidth())/2}}if(i[1].constructor==Number){g+=i[1]}else{switch(i[1]){case"top":g+=0;break;case"bottom":g+=e.height()-this.uiDialog.outerHeight();break;default:case"middle":g+=(e.height()-this.uiDialog.outerHeight())/2}}g=Math.max(g,h);this.uiDialog.css({top:g,left:d})},_setData:function(e,f){(b[e]&&this.uiDialog.data(b[e],f));switch(e){case"buttons":this._createButtons(f);break;case"closeText":this.uiDialogTitlebarCloseText.text(f);break;case"dialogClass":this.uiDialog.removeClass(this.options.dialogClass).addClass(a+f);break;case"draggable":(f?this._makeDraggable():this.uiDialog.draggable("destroy"));break;case"height":this.uiDialog.height(f);break;case"position":this._position(f);break;case"resizable":var d=this.uiDialog,g=this.uiDialog.is(":data(resizable)");(g&&!f&&d.resizable("destroy"));(g&&typeof f=="string"&&d.resizable("option","handles",f));(g||this._makeResizable(f));break;case"title":c(".ui-dialog-title",this.uiDialogTitlebar).html(f||"&nbsp;");break;case"width":this.uiDialog.width(f);break}c.widget.prototype._setData.apply(this,arguments)},_size:function(){var e=this.options;this.element.css({height:0,minHeight:0,width:"auto"});var d=this.uiDialog.css({height:"auto",width:e.width}).height();this.element.css({minHeight:Math.max(e.minHeight-d,0),height:e.height=="auto"?"auto":Math.max(e.height-d,0)})}});c.extend(c.ui.dialog,{version:"1.7.1",defaults:{autoOpen:true,bgiframe:false,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:"center",resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},getter:"isOpen",uuid:0,maxZ:0,getTitleId:function(d){return"ui-dialog-title-"+(d.attr("id")||++this.uuid)},overlay:function(d){this.$el=c.ui.dialog.overlay.create(d)}});c.extend(c.ui.dialog.overlay,{instances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(d){return d+".dialog-overlay"}).join(" "),create:function(e){if(this.instances.length===0){setTimeout(function(){c(document).bind(c.ui.dialog.overlay.events,function(f){var g=c(f.target).parents(".ui-dialog").css("zIndex")||0;return(g>c.ui.dialog.overlay.maxZ)})},1);c(document).bind("keydown.dialog-overlay",function(f){(e.options.closeOnEscape&&f.keyCode&&f.keyCode==c.ui.keyCode.ESCAPE&&e.close(f))});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var d=c("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({width:this.width(),height:this.height()});(e.options.bgiframe&&c.fn.bgiframe&&d.bgiframe());this.instances.push(d);return d},destroy:function(d){this.instances.splice(c.inArray(this.instances,d),1);if(this.instances.length===0){c([document,window]).unbind(".dialog-overlay")}d.remove()},height:function(){if(c.browser.msie&&c.browser.version<7){var e=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);var d=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(e<d){return c(window).height()+"px"}else{return e+"px"}}else{return c(document).height()+"px"}},width:function(){if(c.browser.msie&&c.browser.version<7){var d=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);var e=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(d<e){return c(window).width()+"px"}else{return d+"px"}}else{return c(document).width()+"px"}},resize:function(){var d=c([]);c.each(c.ui.dialog.overlay.instances,function(){d=d.add(this)});d.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;/*
 * jQuery UI Slider 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	ui.core.js
 */(function(a){a.widget("ui.slider",a.extend({},a.ui.mouse,{_init:function(){var b=this,c=this.options;this._keySliding=false;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");this.range=a([]);if(c.range){if(c.range===true){this.range=a("<div></div>");if(!c.values){c.values=[this._valueMin(),this._valueMin()]}if(c.values.length&&c.values.length!=2){c.values=[c.values[0],c.values[0]]}}else{this.range=a("<div></div>")}this.range.appendTo(this.element).addClass("ui-slider-range");if(c.range=="min"||c.range=="max"){this.range.addClass("ui-slider-range-"+c.range)}this.range.addClass("ui-widget-header")}if(a(".ui-slider-handle",this.element).length==0){a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")}if(c.values&&c.values.length){while(a(".ui-slider-handle",this.element).length<c.values.length){a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")}}this.handles=a(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(d){d.preventDefault()}).hover(function(){a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");a(this).addClass("ui-state-focus")}).blur(function(){a(this).removeClass("ui-state-focus")});this.handles.each(function(d){a(this).data("index.ui-slider-handle",d)});this.handles.keydown(function(i){var f=true;var e=a(this).data("index.ui-slider-handle");if(b.options.disabled){return}switch(i.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:f=false;if(!b._keySliding){b._keySliding=true;a(this).addClass("ui-state-active");b._start(i,e)}break}var g,d,h=b._step();if(b.options.values&&b.options.values.length){g=d=b.values(e)}else{g=d=b.value()}switch(i.keyCode){case a.ui.keyCode.HOME:d=b._valueMin();break;case a.ui.keyCode.END:d=b._valueMax();break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g==b._valueMax()){return}d=g+h;break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g==b._valueMin()){return}d=g-h;break}b._slide(i,e,d);return f}).keyup(function(e){var d=a(this).data("index.ui-slider-handle");if(b._keySliding){b._stop(e,d);b._change(e,d);b._keySliding=false;a(this).removeClass("ui-state-active")}});this._refreshValue()},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy()},_mouseCapture:function(d){var e=this.options;if(e.disabled){return false}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();var h={x:d.pageX,y:d.pageY};var j=this._normValueFromMouse(h);var c=this._valueMax()-this._valueMin()+1,f;var k=this,i;this.handles.each(function(l){var m=Math.abs(j-k.values(l));if(c>m){c=m;f=a(this);i=l}});if(e.range==true&&this.values(1)==e.min){f=a(this.handles[++i])}this._start(d,i);k._handleIndex=i;f.addClass("ui-state-active").focus();var g=f.offset();var b=!a(d.target).parents().andSelf().is(".ui-slider-handle");this._clickOffset=b?{left:0,top:0}:{left:d.pageX-g.left-(f.width()/2),top:d.pageY-g.top-(f.height()/2)-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};j=this._normValueFromMouse(h);this._slide(d,i,j);return true},_mouseStart:function(b){return true},_mouseDrag:function(d){var b={x:d.pageX,y:d.pageY};var c=this._normValueFromMouse(b);this._slide(d,this._handleIndex,c);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._handleIndex=null;this._clickOffset=null;return false},_detectOrientation:function(){this.orientation=this.options.orientation=="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(d){var c,h;if("horizontal"==this.orientation){c=this.elementSize.width;h=d.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{c=this.elementSize.height;h=d.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}var f=(h/c);if(f>1){f=1}if(f<0){f=0}if("vertical"==this.orientation){f=1-f}var e=this._valueMax()-this._valueMin(),i=f*e,b=i%this.options.step,g=this._valueMin()+i-b;if(b>(this.options.step/2)){g+=this.options.step}return parseFloat(g.toFixed(5))},_start:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("start",d,b)},_slide:function(f,e,d){var g=this.handles[e];if(this.options.values&&this.options.values.length){var b=this.values(e?0:1);if((e==0&&d>=b)||(e==1&&d<=b)){d=b}if(d!=this.values(e)){var c=this.values();c[e]=d;var h=this._trigger("slide",f,{handle:this.handles[e],value:d,values:c});var b=this.values(e?0:1);if(h!==false){this.values(e,d,(f.type=="mousedown"&&this.options.animate),true)}}}else{if(d!=this.value()){var h=this._trigger("slide",f,{handle:this.handles[e],value:d});if(h!==false){this._setData("value",d,(f.type=="mousedown"&&this.options.animate))}}}},_stop:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("stop",d,b)},_change:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("change",d,b)},value:function(b){if(arguments.length){this._setData("value",b);this._change(null,0)}return this._value()},values:function(b,e,c,d){if(arguments.length>1){this.options.values[b]=e;this._refreshValue(c);if(!d){this._change(null,b)}}if(arguments.length){if(this.options.values&&this.options.values.length){return this._values(b)}else{return this.value()}}else{return this._values()}},_setData:function(b,d,c){a.widget.prototype._setData.apply(this,arguments);switch(b){case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue(c);break;case"value":this._refreshValue(c);break}},_step:function(){var b=this.options.step;return b},_value:function(){var b=this.options.value;if(b<this._valueMin()){b=this._valueMin()}if(b>this._valueMax()){b=this._valueMax()}return b},_values:function(b){if(arguments.length){var c=this.options.values[b];if(c<this._valueMin()){c=this._valueMin()}if(c>this._valueMax()){c=this._valueMax()}return c}else{return this.options.values}},_valueMin:function(){var b=this.options.min;return b},_valueMax:function(){var b=this.options.max;return b},_refreshValue:function(c){var f=this.options.range,d=this.options,l=this;if(this.options.values&&this.options.values.length){var i,h;this.handles.each(function(p,n){var o=(l.values(p)-l._valueMin())/(l._valueMax()-l._valueMin())*100;var m={};m[l.orientation=="horizontal"?"left":"bottom"]=o+"%";a(this).stop(1,1)[c?"animate":"css"](m,d.animate);if(l.options.range===true){if(l.orientation=="horizontal"){(p==0)&&l.range.stop(1,1)[c?"animate":"css"]({left:o+"%"},d.animate);(p==1)&&l.range[c?"animate":"css"]({width:(o-lastValPercent)+"%"},{queue:false,duration:d.animate})}else{(p==0)&&l.range.stop(1,1)[c?"animate":"css"]({bottom:(o)+"%"},d.animate);(p==1)&&l.range[c?"animate":"css"]({height:(o-lastValPercent)+"%"},{queue:false,duration:d.animate})}}lastValPercent=o})}else{var j=this.value(),g=this._valueMin(),k=this._valueMax(),e=k!=g?(j-g)/(k-g)*100:0;var b={};b[l.orientation=="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[c?"animate":"css"](b,d.animate);(f=="min")&&(this.orientation=="horizontal")&&this.range.stop(1,1)[c?"animate":"css"]({width:e+"%"},d.animate);(f=="max")&&(this.orientation=="horizontal")&&this.range[c?"animate":"css"]({width:(100-e)+"%"},{queue:false,duration:d.animate});(f=="min")&&(this.orientation=="vertical")&&this.range.stop(1,1)[c?"animate":"css"]({height:e+"%"},d.animate);(f=="max")&&(this.orientation=="vertical")&&this.range[c?"animate":"css"]({height:(100-e)+"%"},{queue:false,duration:d.animate})}}}));a.extend(a.ui.slider,{getter:"value values",version:"1.7.1",eventPrefix:"slide",defaults:{animate:false,delay:0,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null}})})(jQuery);;/*
 * jQuery UI Tabs 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	ui.core.js
 */(function(a){a.widget("ui.tabs",{_init:function(){if(this.options.deselectable!==undefined){this.options.collapsible=this.options.deselectable}this._tabify(true)},_setData:function(b,c){if(b=="selected"){if(this.options.collapsible&&c==this.options.selected){return}this.select(c)}else{this.options[b]=c;if(b=="deselectable"){this.options.collapsible=c}this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+a.data(b)},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+a.data(this.list[0]));return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(c,b){return{tab:c,panel:b,index:this.anchors.index(c)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(n){this.list=this.element.children("ul:first");this.lis=a("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return a("a",this)[0]});this.panels=a([]);var p=this,d=this.options;var c=/^#.+/;this.anchors.each(function(r,o){var q=a(o).attr("href");var s=q.split("#")[0],u;if(s&&(s===location.toString().split("#")[0]||(u=a("base")[0])&&s===u.href)){q=o.hash;o.href=q}if(c.test(q)){p.panels=p.panels.add(p._sanitizeSelector(q))}else{if(q!="#"){a.data(o,"href.tabs",q);a.data(o,"load.tabs",q.replace(/#.*$/,""));var w=p._tabId(o);o.href="#"+w;var v=a("#"+w);if(!v.length){v=a(d.panelTemplate).attr("id",w).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(p.panels[r-1]||p.list);v.data("destroy.tabs",true)}p.panels=p.panels.add(v)}else{d.disabled.push(r)}}});if(n){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(d.selected===undefined){if(location.hash){this.anchors.each(function(q,o){if(o.hash==location.hash){d.selected=q;return false}})}if(typeof d.selected!="number"&&d.cookie){d.selected=parseInt(p._cookie(),10)}if(typeof d.selected!="number"&&this.lis.filter(".ui-tabs-selected").length){d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}d.selected=d.selected||0}else{if(d.selected===null){d.selected=-1}}d.selected=((d.selected>=0&&this.anchors[d.selected])||d.selected<0)?d.selected:0;d.disabled=a.unique(d.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(q,o){return p.lis.index(q)}))).sort();if(a.inArray(d.selected,d.disabled)!=-1){d.disabled.splice(a.inArray(d.selected,d.disabled),1)}this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(d.selected>=0&&this.anchors.length){this.panels.eq(d.selected).removeClass("ui-tabs-hide");this.lis.eq(d.selected).addClass("ui-tabs-selected ui-state-active");p.element.queue("tabs",function(){p._trigger("show",null,p._ui(p.anchors[d.selected],p.panels[d.selected]))});this.load(d.selected)}a(window).bind("unload",function(){p.lis.add(p.anchors).unbind(".tabs");p.lis=p.anchors=p.panels=null})}else{d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}this.element[d.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");if(d.cookie){this._cookie(d.selected,d.cookie)}for(var g=0,m;(m=this.lis[g]);g++){a(m)[a.inArray(g,d.disabled)!=-1&&!a(m).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")}if(d.cache===false){this.anchors.removeData("cache.tabs")}this.lis.add(this.anchors).unbind(".tabs");if(d.event!="mouseover"){var f=function(o,i){if(i.is(":not(.ui-state-disabled)")){i.addClass("ui-state-"+o)}};var j=function(o,i){i.removeClass("ui-state-"+o)};this.lis.bind("mouseover.tabs",function(){f("hover",a(this))});this.lis.bind("mouseout.tabs",function(){j("hover",a(this))});this.anchors.bind("focus.tabs",function(){f("focus",a(this).closest("li"))});this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var b,h;if(d.fx){if(a.isArray(d.fx)){b=d.fx[0];h=d.fx[1]}else{b=h=d.fx}}function e(i,o){i.css({display:""});if(a.browser.msie&&o.opacity){i[0].style.removeAttribute("filter")}}var k=h?function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.hide().removeClass("ui-tabs-hide").animate(h,h.duration||"normal",function(){e(o,h);p._trigger("show",null,p._ui(i,o[0]))})}:function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.removeClass("ui-tabs-hide");p._trigger("show",null,p._ui(i,o[0]))};var l=b?function(o,i){i.animate(b,b.duration||"normal",function(){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");e(i,b);p.element.dequeue("tabs")})}:function(o,i,q){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");p.element.dequeue("tabs")};this.anchors.bind(d.event+".tabs",function(){var o=this,r=a(this).closest("li"),i=p.panels.filter(":not(.ui-tabs-hide)"),q=a(p._sanitizeSelector(this.hash));if((r.hasClass("ui-tabs-selected")&&!d.collapsible)||r.hasClass("ui-state-disabled")||r.hasClass("ui-state-processing")||p._trigger("select",null,p._ui(this,q[0]))===false){this.blur();return false}d.selected=p.anchors.index(this);p.abort();if(d.collapsible){if(r.hasClass("ui-tabs-selected")){d.selected=-1;if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){l(o,i)}).dequeue("tabs");this.blur();return false}else{if(!i.length){if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this));this.blur();return false}}}if(d.cookie){p._cookie(d.selected,d.cookie)}if(q.length){if(i.length){p.element.queue("tabs",function(){l(o,i)})}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this))}else{throw"jQuery UI Tabs: Mismatching fragment identifier."}if(a.browser.msie){this.blur()}});this.anchors.bind("click.tabs",function(){return false})},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var c=a.data(this,"href.tabs");if(c){this.href=c}var d=a(this).unbind(".tabs");a.each(["href","load","cache"],function(e,f){d.removeData(f+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){if(a.data(this,"destroy.tabs")){a(this).remove()}else{a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}});if(b.cookie){this._cookie(null,b.cookie)}},add:function(e,d,c){if(c===undefined){c=this.anchors.length}var b=this,g=this.options,i=a(g.tabTemplate.replace(/#\{href\}/g,e).replace(/#\{label\}/g,d)),h=!e.indexOf("#")?e.replace("#",""):this._tabId(a("a",i)[0]);i.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var f=a("#"+h);if(!f.length){f=a(g.panelTemplate).attr("id",h).data("destroy.tabs",true)}f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(c>=this.lis.length){i.appendTo(this.list);f.appendTo(this.list[0].parentNode)}else{i.insertBefore(this.lis[c]);f.insertBefore(this.panels[c])}g.disabled=a.map(g.disabled,function(k,j){return k>=c?++k:k});this._tabify();if(this.anchors.length==1){i.addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[0],b.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[c],this.panels[c]))},remove:function(b){var d=this.options,e=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();if(e.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(b+(b+1<this.anchors.length?1:-1))}d.disabled=a.map(a.grep(d.disabled,function(g,f){return g!=b}),function(g,f){return g>=b?--g:g});this._tabify();this._trigger("remove",null,this._ui(e.find("a")[0],c[0]))},enable:function(b){var c=this.options;if(a.inArray(b,c.disabled)==-1){return}this.lis.eq(b).removeClass("ui-state-disabled");c.disabled=a.grep(c.disabled,function(e,d){return e!=b});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]))},disable:function(c){var b=this,d=this.options;if(c!=d.selected){this.lis.eq(c).addClass("ui-state-disabled");d.disabled.push(c);d.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[c],this.panels[c]))}},select:function(b){if(typeof b=="string"){b=this.anchors.index(this.anchors.filter("[href$="+b+"]"))}else{if(b===null){b=-1}}if(b==-1&&this.options.collapsible){b=this.options.selected}this.anchors.eq(b).trigger(this.options.event+".tabs")},load:function(e){var c=this,g=this.options,b=this.anchors.eq(e)[0],d=a.data(b,"load.tabs");this.abort();if(!d||this.element.queue("tabs").length!==0&&a.data(b,"cache.tabs")){this.element.dequeue("tabs");return}this.lis.eq(e).addClass("ui-state-processing");if(g.spinner){var f=a("span",b);f.data("label.tabs",f.html()).html(g.spinner)}this.xhr=a.ajax(a.extend({},g.ajaxOptions,{url:d,success:function(i,h){a(c._sanitizeSelector(b.hash)).html(i);c._cleanup();if(g.cache){a.data(b,"cache.tabs",true)}c._trigger("load",null,c._ui(c.anchors[e],c.panels[e]));try{g.ajaxOptions.success(i,h)}catch(j){}c.element.dequeue("tabs")}}))},abort:function(){this.element.queue([]);this.panels.stop(false,true);if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup()},url:function(c,b){this.anchors.eq(c).removeData("cache.tabs").data("load.tabs",b)},length:function(){return this.anchors.length}});a.extend(a.ui.tabs,{version:"1.7.1",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,collapsible:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(d,f){var b=this,g=this.options;var c=b._rotate||(b._rotate=function(h){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var i=g.selected;b.select(++i<b.anchors.length?i:0)},d);if(h){h.stopPropagation()}});var e=b._unrotate||(b._unrotate=!f?function(h){if(h.clientX){b.rotate(null)}}:function(h){t=g.selected;c()});if(d){this.element.bind("tabsshow",c);this.anchors.bind(g.event+".tabs",e);c()}else{clearTimeout(b.rotation);this.element.unbind("tabsshow",c);this.anchors.unbind(g.event+".tabs",e);delete this._rotate;delete this._unrotate}}})})(jQuery);;/*
 * jQuery UI Datepicker 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	ui.core.js
 */(function($){$.extend($.ui,{datepicker:{version:"1.7.1"}});var PROP_NAME="datepicker";function Datepicker(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._datepickerShowing=false;this._inDialog=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],dateFormat:"mm/dd/yy",firstDay:0,isRTL:false};this._defaults={showOn:"focus",showAnim:"show",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,showMonthAfterYear:false,yearRange:"-10:+10",showOtherMonths:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"normal",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false};$.extend(this._defaults,this.regional[""]);this.dpDiv=$('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",log:function(){if(this.debug){console.log.apply("",arguments)}},setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase();var inline=(nodeName=="div"||nodeName=="span");if(!target.id){target.id="dp"+(++this.uuid)}var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{});if(nodeName=="input"){this._connectDatepicker(target,inst)}else{if(inline){this._inlineDatepicker(target,inst)}}},_newInst:function(target,inline){var id=target[0].id.replace(/([:\[\]\.])/g,"\\\\$1");return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:$('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(target,inst){var input=$(target);inst.trigger=$([]);if(input.hasClass(this.markerClassName)){return}var appendText=this._get(inst,"appendText");var isRTL=this._get(inst,"isRTL");if(appendText){input[isRTL?"before":"after"]('<span class="'+this._appendClass+'">'+appendText+"</span>")}var showOn=this._get(inst,"showOn");if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");var buttonImage=this._get(inst,"buttonImage");inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));input[isRTL?"before":"after"](inst.trigger);inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==target){$.datepicker._hideDatepicker()}else{$.datepicker._showDatepicker(target)}return false})}input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst)},_inlineDatepicker:function(target,inst){var divSpan=$(target);if(divSpan.hasClass(this.markerClassName)){return}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst);this._setDate(inst,this._getDefaultDate(inst));this._updateDatepicker(inst);this._updateAlternate(inst)},_dialogDatepicker:function(input,dateText,onSelect,settings,pos){var inst=this._dialogInst;if(!inst){var id="dp"+(++this.uuid);this._dialogInput=$('<input type="text" id="'+id+'" size="1" style="position: absolute; top: -100px;"/>');this._dialogInput.keydown(this._doKeyDown);$("body").append(this._dialogInput);inst=this._dialogInst=this._newInst(this._dialogInput,false);inst.settings={};$.data(this._dialogInput[0],PROP_NAME,inst)}extendRemove(inst.settings,settings||{});this._dialogInput.val(dateText);this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);if(!this._pos){var browserWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;var browserHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]}this._dialogInput.css("left",this._pos[0]+"px").css("top",this._pos[1]+"px");inst.settings.onSelect=onSelect;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);if($.blockUI){$.blockUI(this.dpDiv)}$.data(this._dialogInput[0],PROP_NAME,inst);return this},_destroyDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();$.removeData(target,PROP_NAME);if(nodeName=="input"){inst.trigger.remove();$target.siblings("."+this._appendClass).remove().end().removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress)}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()}}},_enableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=false;inst.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().removeClass("ui-state-disabled")}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)})},_disableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=true;inst.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().addClass("ui-state-disabled")}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)});this._disabledInputs[this._disabledInputs.length]=target},_isDisabledDatepicker:function(target){if(!target){return false}for(var i=0;i<this._disabledInputs.length;i++){if(this._disabledInputs[i]==target){return true}}return false},_getInst:function(target){try{return $.data(target,PROP_NAME)}catch(err){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(target,name,value){var settings=name||{};if(typeof name=="string"){settings={};settings[name]=value}var inst=this._getInst(target);if(inst){if(this._curInst==inst){this._hideDatepicker(null)}extendRemove(inst.settings,settings);var date=new Date();extendRemove(inst,{rangeStart:null,endDay:null,endMonth:null,endYear:null,selectedDay:date.getDate(),selectedMonth:date.getMonth(),selectedYear:date.getFullYear(),currentDay:date.getDate(),currentMonth:date.getMonth(),currentYear:date.getFullYear(),drawMonth:date.getMonth(),drawYear:date.getFullYear()});this._updateDatepicker(inst)}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)},_refreshDatepicker:function(target){var inst=this._getInst(target);if(inst){this._updateDatepicker(inst)}},_setDateDatepicker:function(target,date,endDate){var inst=this._getInst(target);if(inst){this._setDate(inst,date,endDate);this._updateDatepicker(inst);this._updateAlternate(inst)}},_getDateDatepicker:function(target){var inst=this._getInst(target);if(inst&&!inst.inline){this._setDateFromField(inst)}return(inst?this._getDate(inst):null)},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);var handled=true;var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");inst._keyEvent=true;if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker(null,"");break;case 13:var sel=$("td."+$.datepicker._dayOverClass+", td."+$.datepicker._currentClass,inst.dpDiv);if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])}else{$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"))}return false;break;case 27:$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"));break;case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");break;case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");break;case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)}handled=event.ctrlKey||event.metaKey;break;case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)}handled=event.ctrlKey||event.metaKey;break;case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")}break;case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")}handled=event.ctrlKey||event.metaKey;break;case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")}break;case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")}handled=event.ctrlKey||event.metaKey;break;default:handled=false}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)}else{handled=false}}if(handled){event.preventDefault();event.stopPropagation()}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);return event.ctrlKey||(chr<" "||!chars||chars.indexOf(chr)>-1)}},_showDatepicker:function(input){input=input.target||input;if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return}var inst=$.datepicker._getInst(input);var beforeShow=$.datepicker._get(inst,"beforeShow");extendRemove(inst.settings,(beforeShow?beforeShow.apply(input,[input,inst]):{}));$.datepicker._hideDatepicker(null,"");$.datepicker._lastInput=input;$.datepicker._setDateFromField(inst);if($.datepicker._inDialog){input.value=""}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);$.datepicker._pos[1]+=input.offsetHeight}var isFixed=false;$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";return !isFixed});if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;$.datepicker._pos[1]-=document.documentElement.scrollTop}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null;inst.rangeStart=null;inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});$.datepicker._updateDatepicker(inst);offset=$.datepicker._checkOffset(inst,offset,isFixed);inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim")||"show";var duration=$.datepicker._get(inst,"duration");var postProcess=function(){$.datepicker._datepickerShowing=true;if($.browser.msie&&parseInt($.browser.version,10)<7){$("iframe.ui-datepicker-cover").css({width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4})}};if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[showAnim](duration,postProcess)}if(duration==""){postProcess()}if(inst.input[0].type!="hidden"){inst.input[0].focus()}$.datepicker._curInst=inst}},_updateDatepicker:function(inst){var dims={width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4};var self=this;inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({width:dims.width,height:dims.height}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){$(this).removeClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).removeClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).removeClass("ui-datepicker-next-hover")}}).bind("mouseover",function(){if(!self._isDisabledDatepicker(inst.inline?inst.dpDiv.parent()[0]:inst.input[0])){$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");$(this).addClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).addClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).addClass("ui-datepicker-next-hover")}}}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();var numMonths=this._getNumberOfMonths(inst);var cols=numMonths[1];var width=17;if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width",(width*cols)+"em")}else{inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");if(inst.input&&inst.input[0].type!="hidden"&&inst==$.datepicker._curInst){$(inst.input[0]).focus()}},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();var dpHeight=inst.dpDiv.outerHeight();var inputWidth=inst.input?inst.input.outerWidth():0;var inputHeight=inst.input?inst.input.outerHeight():0;var viewWidth=(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)+$(document).scrollLeft();var viewHeight=(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)+$(document).scrollTop();offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;offset.left-=(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0;offset.top-=(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(offset.top+dpHeight+inputHeight*2-viewHeight):0;return offset},_findPos:function(obj){while(obj&&(obj.type=="hidden"||obj.nodeType!=1)){obj=obj.nextSibling}var position=$(obj).offset();return[position.left,position.top]},_hideDatepicker:function(input,duration){var inst=this._curInst;if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return}if(inst.stayOpen){this._selectDate("#"+inst.id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))}inst.stayOpen=false;if(this._datepickerShowing){duration=(duration!=null?duration:this._get(inst,"duration"));var showAnim=this._get(inst,"showAnim");var postProcess=function(){$.datepicker._tidyDialog(inst)};if(duration!=""&&$.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[(duration==""?"hide":(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide")))](duration,postProcess)}if(duration==""){this._tidyDialog(inst)}var onClose=this._get(inst,"onClose");if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])}this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if($.blockUI){$.unblockUI();$("body").append(this.dpDiv)}}this._inDialog=false}this._curInst=null},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(event){if(!$.datepicker._curInst){return}var $target=$(event.target);if(($target.parents("#"+$.datepicker._mainDivId).length==0)&&!$target.hasClass($.datepicker.markerClassName)&&!$target.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)){$.datepicker._hideDatepicker(null,"")}},_adjustDate:function(id,offset,period){var target=$(id);var inst=this._getInst(target[0]);if(this._isDisabledDatepicker(target[0])){return}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);this._updateDatepicker(inst)},_gotoToday:function(id){var target=$(id);var inst=this._getInst(target[0]);if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;inst.drawMonth=inst.selectedMonth=inst.currentMonth;inst.drawYear=inst.selectedYear=inst.currentYear}else{var date=new Date();inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear()}this._notifyChange(inst);this._adjustDate(target)},_selectMonthYear:function(id,select,period){var target=$(id);var inst=this._getInst(target[0]);inst._selectingMonthYear=false;inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);this._notifyChange(inst);this._adjustDate(target)},_clickMonthYear:function(id){var target=$(id);var inst=this._getInst(target[0]);if(inst.input&&inst._selectingMonthYear&&!$.browser.msie){inst.input[0].focus()}inst._selectingMonthYear=!inst._selectingMonthYear},_selectDay:function(id,month,year,td){var target=$(id);if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return}var inst=this._getInst(target[0]);inst.selectedDay=inst.currentDay=$("a",td).html();inst.selectedMonth=inst.currentMonth=month;inst.selectedYear=inst.currentYear=year;if(inst.stayOpen){inst.endDay=inst.endMonth=inst.endYear=null}this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear));if(inst.stayOpen){inst.rangeStart=this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));this._updateDatepicker(inst)}},_clearDate:function(id){var target=$(id);var inst=this._getInst(target[0]);inst.stayOpen=false;inst.endDay=inst.endMonth=inst.endYear=inst.rangeStart=null;this._selectDate(target,"")},_selectDate:function(id,dateStr){var target=$(id);var inst=this._getInst(target[0]);dateStr=(dateStr!=null?dateStr:this._formatDate(inst));if(inst.input){inst.input.val(dateStr)}this._updateAlternate(inst);var onSelect=this._get(inst,"onSelect");if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])}else{if(inst.input){inst.input.trigger("change")}}if(inst.inline){this._updateDatepicker(inst)}else{if(!inst.stayOpen){this._hideDatepicker(null,this._get(inst,"duration"));this._lastInput=inst.input[0];if(typeof(inst.input[0])!="object"){inst.input[0].focus()}this._lastInput=null}}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");var date=this._getDate(inst);dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));$(altField).each(function(){$(this).val(dateStr)})}},noWeekends:function(date){var day=date.getDay();return[(day>0&&day<6),""]},iso8601Week:function(date){var checkDate=new Date(date.getFullYear(),date.getMonth(),date.getDate());var firstMon=new Date(checkDate.getFullYear(),1-1,4);var firstDay=firstMon.getDay()||7;firstMon.setDate(firstMon.getDate()+1-firstDay);if(firstDay<4&&checkDate<firstMon){checkDate.setDate(checkDate.getDate()-3);return $.datepicker.iso8601Week(checkDate)}else{if(checkDate>new Date(checkDate.getFullYear(),12-1,28)){firstDay=new Date(checkDate.getFullYear()+1,1-1,4).getDay()||7;if(firstDay>4&&(checkDate.getDay()||7)<firstDay-3){return 1}}}return Math.floor(((checkDate-firstMon)/86400000)/7)+1},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"}value=(typeof value=="object"?value.toString():value+"");if(value==""){return null}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var year=-1;var month=-1;var day=-1;var doy=-1;var literal=false;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var getNumber=function(match){lookAhead(match);var origSize=(match=="@"?14:(match=="y"?4:(match=="o"?3:2)));var size=origSize;var num=0;while(size>0&&iValue<value.length&&value.charAt(iValue)>="0"&&value.charAt(iValue)<="9"){num=num*10+parseInt(value.charAt(iValue++),10);size--}if(size==origSize){throw"Missing number at position "+iValue}return num};var getName=function(match,shortNames,longNames){var names=(lookAhead(match)?longNames:shortNames);var size=0;for(var j=0;j<names.length;j++){size=Math.max(size,names[j].length)}var name="";var iInit=iValue;while(size>0&&iValue<value.length){name+=value.charAt(iValue++);for(var i=0;i<names.length;i++){if(name==names[i]){return i+1}}size--}throw"Unknown name at position "+iInit};var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue}iValue++};var iValue=0;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{checkLiteral()}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");break;case"D":getName("D",dayNamesShort,dayNames);break;case"o":doy=getNumber("o");break;case"m":month=getNumber("m");break;case"M":month=getName("M",monthNamesShort,monthNames);break;case"y":year=getNumber("y");break;case"@":var date=new Date(getNumber("@"));year=date.getFullYear();month=date.getMonth()+1;day=date.getDate();break;case"'":if(lookAhead("'")){checkLiteral()}else{literal=true}break;default:checkLiteral()}}}if(year==-1){year=new Date().getFullYear()}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)}}if(doy>-1){month=1;day=doy;do{var dim=this._getDaysInMonth(year,month-1);if(day<=dim){break}month++;day-=dim}while(true)}var date=this._daylightSavingAdjust(new Date(year,month-1,day));if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"}return date},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TIMESTAMP:"@",W3C:"yy-mm-dd",formatDate:function(format,date,settings){if(!date){return""}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var formatNumber=function(match,value,len){var num=""+value;if(lookAhead(match)){while(num.length<len){num="0"+num}}return num};var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])};var output="";var literal=false;if(date){for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{output+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);break;case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);break;case"o":var doy=date.getDate();for(var m=date.getMonth()-1;m>=0;m--){doy+=this._getDaysInMonth(date.getFullYear(),m)}output+=formatNumber("o",doy,3);break;case"m":output+=formatNumber("m",date.getMonth()+1,2);break;case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);break;case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);break;case"@":output+=date.getTime();break;case"'":if(lookAhead("'")){output+="'"}else{literal=true}break;default:output+=format.charAt(iFormat)}}}}return output},_possibleChars:function(format){var chars="";var literal=false;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{chars+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";break;case"D":case"M":return null;case"'":if(lookAhead("'")){chars+="'"}else{literal=true}break;default:chars+=format.charAt(iFormat)}}}return chars},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]},_setDateFromField:function(inst){var dateFormat=this._get(inst,"dateFormat");var dates=inst.input?inst.input.val():null;inst.endDay=inst.endMonth=inst.endYear=null;var date=defaultDate=this._getDefaultDate(inst);var settings=this._getFormatConfig(inst);try{date=this.parseDate(dateFormat,dates,settings)||defaultDate}catch(event){this.log(event);date=defaultDate}inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();inst.currentDay=(dates?date.getDate():0);inst.currentMonth=(dates?date.getMonth():0);inst.currentYear=(dates?date.getFullYear():0);this._adjustInstDate(inst)},_getDefaultDate:function(inst){var date=this._determineDate(this._get(inst,"defaultDate"),new Date());var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);return date},_determineDate:function(date,defaultDate){var offsetNumeric=function(offset){var date=new Date();date.setDate(date.getDate()+offset);return date};var offsetString=function(offset,getDaysInMonth){var date=new Date();var year=date.getFullYear();var month=date.getMonth();var day=date.getDate();var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;var matches=pattern.exec(offset);while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);break;case"w":case"W":day+=parseInt(matches[1],10)*7;break;case"m":case"M":month+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));break;case"y":case"Y":year+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));break}matches=pattern.exec(offset)}return new Date(year,month,day)};date=(date==null?defaultDate:(typeof date=="string"?offsetString(date,this._getDaysInMonth):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):date)));date=(date&&date.toString()=="Invalid Date"?defaultDate:date);if(date){date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0)}return this._daylightSavingAdjust(date)},_daylightSavingAdjust:function(date){if(!date){return null}date.setHours(date.getHours()>12?date.getHours()+2:0);return date},_setDate:function(inst,date,endDate){var clear=!(date);var origMonth=inst.selectedMonth;var origYear=inst.selectedYear;date=this._determineDate(date,new Date());inst.selectedDay=inst.currentDay=date.getDate();inst.drawMonth=inst.selectedMonth=inst.currentMonth=date.getMonth();inst.drawYear=inst.selectedYear=inst.currentYear=date.getFullYear();if(origMonth!=inst.selectedMonth||origYear!=inst.selectedYear){this._notifyChange(inst)}this._adjustInstDate(inst);if(inst.input){inst.input.val(clear?"":this._formatDate(inst))}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return startDate},_generateHTML:function(inst){var today=new Date();today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));var isRTL=this._get(inst,"isRTL");var showButtonPanel=this._get(inst,"showButtonPanel");var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");var numMonths=this._getNumberOfMonths(inst);var showCurrentAtPos=this._get(inst,"showCurrentAtPos");var stepMonths=this._get(inst,"stepMonths");var stepBigMonths=this._get(inst,"stepBigMonths");var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");var drawMonth=inst.drawMonth-showCurrentAtPos;var drawYear=inst.drawYear;if(drawMonth<0){drawMonth+=12;drawYear--}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-numMonths[1]+1,maxDate.getDate()));maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;if(drawMonth<0){drawMonth=11;drawYear--}}}inst.drawMonth=drawMonth;inst.drawYear=drawYear;var prevText=this._get(inst,"prevText");prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', -"+stepMonths+", 'M');\" title=\""+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));var nextText=this._get(inst,"nextText");nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', +"+stepMonths+", 'M');\" title=\""+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));var currentText=this._get(inst,"currentText");var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">'+this._get(inst,"closeText")+"</button>":"");var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#'+inst.id+"');\">"+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";var firstDay=parseInt(this._get(inst,"firstDay"),10);firstDay=(isNaN(firstDay)?0:firstDay);var dayNames=this._get(inst,"dayNames");var dayNamesShort=this._get(inst,"dayNamesShort");var dayNamesMin=this._get(inst,"dayNamesMin");var monthNames=this._get(inst,"monthNames");var monthNamesShort=this._get(inst,"monthNamesShort");var beforeShowDay=this._get(inst,"beforeShowDay");var showOtherMonths=this._get(inst,"showOtherMonths");var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;var endDate=inst.endDay?this._daylightSavingAdjust(new Date(inst.endYear,inst.endMonth,inst.endDay)):currentDate;var defaultDate=this._getDefaultDate(inst);var html="";for(var row=0;row<numMonths[0];row++){var group="";for(var col=0;col<numMonths[1];col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));var cornerClass=" ui-corner-all";var calender="";if(isMultiMonth){calender+='<div class="ui-datepicker-group ui-datepicker-group-';switch(col){case 0:calender+="first";cornerClass=" ui-corner-"+(isRTL?"right":"left");break;case numMonths[1]-1:calender+="last";cornerClass=" ui-corner-"+(isRTL?"left":"right");break;default:calender+="middle";cornerClass="";break}calender+='">'}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var thead="";for(var dow=0;dow<7;dow++){var day=(dow+firstDay)%7;thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"}calender+=thead+"</tr></thead><tbody>";var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;var numRows=(isMultiMonth?6:Math.ceil((leadDays+daysInMonth)/7));var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));for(var dRow=0;dRow<numRows;dRow++){calender+="<tr>";var tbody="";for(var dow=0;dow<7;dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);var otherMonth=(printDate.getMonth()!=drawMonth);var unselectable=otherMonth||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":" onclick=\"DP_jQuery.datepicker._selectDay('#"+inst.id+"',"+drawMonth+","+drawYear+', this);return false;"')+">"+(otherMonth?(showOtherMonths?printDate.getDate():"&#xa0;"):(unselectable?'<span class="ui-state-default">'+printDate.getDate()+"</span>":'<a class="ui-state-default'+(printDate.getTime()==today.getTime()?" ui-state-highlight":"")+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" ui-state-active":"")+'" href="#">'+printDate.getDate()+"</a>"))+"</td>";printDate.setDate(printDate.getDate()+1);printDate=this._daylightSavingAdjust(printDate)}calender+=tbody+"</tr>"}drawMonth++;if(drawMonth>11){drawMonth=0;drawYear++}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");group+=calender}html+=group}html+=buttonPanel+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");inst._keyEvent=false;return html},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,secondary,monthNames,monthNamesShort){minDate=(inst.rangeStart&&minDate&&selectedDate<minDate?selectedDate:minDate);var changeMonth=this._get(inst,"changeMonth");var changeYear=this._get(inst,"changeYear");var showMonthAfterYear=this._get(inst,"showMonthAfterYear");var html='<div class="ui-datepicker-title">';var monthHtml="";if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span> "}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);monthHtml+='<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";for(var month=0;month<12;month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"}}monthHtml+="</select>"}if(!showMonthAfterYear){html+=monthHtml+((secondary||changeMonth||changeYear)&&(!(changeMonth&&changeYear))?"&#xa0;":"")}if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"}else{var years=this._get(inst,"yearRange").split(":");var year=0;var endYear=0;if(years.length!=2){year=drawYear-10;endYear=drawYear+10}else{if(years[0].charAt(0)=="+"||years[0].charAt(0)=="-"){year=drawYear+parseInt(years[0],10);endYear=drawYear+parseInt(years[1],10)}else{year=parseInt(years[0],10);endYear=parseInt(years[1],10)}}year=(minDate?Math.max(year,minDate.getFullYear()):year);endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);html+='<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";for(;year<=endYear;year++){html+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"}html+="</select>"}if(showMonthAfterYear){html+=(secondary||changeMonth||changeYear?"&#xa0;":"")+monthHtml}html+="</div>";return html},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);var month=inst.drawMonth+(period=="M"?offset:0);var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);var date=this._daylightSavingAdjust(new Date(year,month,day));var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();if(period=="M"||period=="Y"){this._notifyChange(inst)}},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))},_getMinMaxDate:function(inst,minMax,checkRange){var date=this._determineDate(this._get(inst,minMax+"Date"),null);return(!checkRange||!inst.rangeStart?date:(!date||inst.rangeStart>date?inst.rangeStart:date))},_getDaysInMonth:function(year,month){return 32-new Date(year,month,32).getDate()},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[1]),1));if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))}return this._isInRange(inst,date)},_isInRange:function(inst,date){var newMinDate=(!inst.rangeStart?null:this._daylightSavingAdjust(new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay)));newMinDate=(newMinDate&&inst.rangeStart<newMinDate?inst.rangeStart:newMinDate);var minDate=newMinDate||this._getMinMaxDate(inst,"min");var maxDate=this._getMinMaxDate(inst,"max");return((!minDate||date>=minDate)&&(!maxDate||date<=maxDate))},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;inst.currentMonth=inst.selectedMonth;inst.currentYear=inst.selectedYear}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))}});function extendRemove(target,props){$.extend(target,props);for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]}}return target}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))}$.fn.datepicker=function(options){if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);$.datepicker.initialized=true}var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=="string"&&(options=="isDisabled"||options=="getDate")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)})};$.datepicker=new Datepicker();$.datepicker.initialized=false;$.datepicker.uuid=new Date().getTime();$.datepicker.version="1.7.1";window.DP_jQuery=$})(jQuery);;/*
 * jQuery UI Progressbar 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   ui.core.js
 */(function(a){a.widget("ui.progressbar",{_init:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});this.valueDiv=a('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");this.valueDiv.remove();a.widget.prototype.destroy.apply(this,arguments)},value:function(b){arguments.length&&this._setData("value",b);return this._value()},_setData:function(b,c){switch(b){case"value":this.options.value=c;this._refreshValue();this._trigger("change",null,{});break}a.widget.prototype._setData.apply(this,arguments)},_value:function(){var b=this.options.value;if(b<this._valueMin()){b=this._valueMin()}if(b>this._valueMax()){b=this._valueMax()}return b},_valueMin:function(){var b=0;return b},_valueMax:function(){var b=100;return b},_refreshValue:function(){var b=this.value();this.valueDiv[b==this._valueMax()?"addClass":"removeClass"]("ui-corner-right");this.valueDiv.width(b+"%");this.element.attr("aria-valuenow",b)}});a.extend(a.ui.progressbar,{version:"1.7.1",defaults:{value:0}})})(jQuery);;/*
 * jQuery UI Effects 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */jQuery.effects||(function(d){d.effects={version:"1.7.1",save:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.data("ec.storage."+h[f],g[0].style[h[f]])}}},restore:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.css(h[f],g.data("ec.storage."+h[f]))}}},setMode:function(f,g){if(g=="toggle"){g=f.is(":hidden")?"show":"hide"}return g},getBaseline:function(g,h){var i,f;switch(g[0]){case"top":i=0;break;case"middle":i=0.5;break;case"bottom":i=1;break;default:i=g[0]/h.height}switch(g[1]){case"left":f=0;break;case"center":f=0.5;break;case"right":f=1;break;default:f=g[1]/h.width}return{x:f,y:i}},createWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent()}var g={width:f.outerWidth(true),height:f.outerHeight(true),"float":f.css("float")};f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');var j=f.parent();if(f.css("position")=="static"){j.css({position:"relative"});f.css({position:"relative"})}else{var i=f.css("top");if(isNaN(parseInt(i,10))){i="auto"}var h=f.css("left");if(isNaN(parseInt(h,10))){h="auto"}j.css({position:f.css("position"),top:i,left:h,zIndex:f.css("z-index")}).show();f.css({position:"relative",top:0,left:0})}j.css(g);return j},removeWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent().replaceWith(f)}return f},setTransition:function(g,i,f,h){h=h||{};d.each(i,function(k,j){unit=g.cssUnit(j);if(unit[0]>0){h[j]=unit[0]*f+unit[1]}});return h},animateClass:function(h,i,k,j){var f=(typeof k=="function"?k:(j?j:null));var g=(typeof k=="string"?k:null);return this.each(function(){var q={};var o=d(this);var p=o.attr("style")||"";if(typeof p=="object"){p=p.cssText}if(h.toggle){o.hasClass(h.toggle)?h.remove=h.toggle:h.add=h.toggle}var l=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.addClass(h.add)}if(h.remove){o.removeClass(h.remove)}var m=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.removeClass(h.add)}if(h.remove){o.addClass(h.remove)}for(var r in m){if(typeof m[r]!="function"&&m[r]&&r.indexOf("Moz")==-1&&r.indexOf("length")==-1&&m[r]!=l[r]&&(r.match(/color/i)||(!r.match(/color/i)&&!isNaN(parseInt(m[r],10))))&&(l.position!="static"||(l.position=="static"&&!r.match(/left|top|bottom|right/)))){q[r]=m[r]}}o.animate(q,i,g,function(){if(typeof d(this).attr("style")=="object"){d(this).attr("style")["cssText"]="";d(this).attr("style")["cssText"]=p}else{d(this).attr("style",p)}if(h.add){d(this).addClass(h.add)}if(h.remove){d(this).removeClass(h.remove)}if(f){f.apply(this,arguments)}})})}};function c(g,f){var i=g[1]&&g[1].constructor==Object?g[1]:{};if(f){i.mode=f}var h=g[1]&&g[1].constructor!=Object?g[1]:(i.duration?i.duration:g[2]);h=d.fx.off?0:typeof h==="number"?h:d.fx.speeds[h]||d.fx.speeds._default;var j=i.callback||(d.isFunction(g[1])&&g[1])||(d.isFunction(g[2])&&g[2])||(d.isFunction(g[3])&&g[3]);return[g[0],i,h,j]}d.fn.extend({_show:d.fn.show,_hide:d.fn.hide,__toggle:d.fn.toggle,_addClass:d.fn.addClass,_removeClass:d.fn.removeClass,_toggleClass:d.fn.toggleClass,effect:function(g,f,h,i){return d.effects[g]?d.effects[g].call(this,{method:g,options:f||{},duration:h,callback:i}):null},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"show"))}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"hide"))}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(arguments[0].constructor==Function)){return this.__toggle.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"toggle"))}},addClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{add:g},f,i,h]):this._addClass(g)},removeClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{remove:g},f,i,h]):this._removeClass(g)},toggleClass:function(g,f,i,h){return((typeof f!=="boolean")&&f)?d.effects.animateClass.apply(this,[{toggle:g},f,i,h]):this._toggleClass(g,f)},morph:function(f,h,g,j,i){return d.effects.animateClass.apply(this,[{add:h,remove:f},g,j,i])},switchClass:function(){return this.morph.apply(this,arguments)},cssUnit:function(f){var g=this.css(f),h=[];d.each(["em","px","%","pt"],function(j,k){if(g.indexOf(k)>0){h=[parseFloat(g),k]}});return h}});d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(g,f){d.fx.step[f]=function(h){if(h.state==0){h.start=e(h.elem,f);h.end=b(h.end)}h.elem.style[f]="rgb("+[Math.max(Math.min(parseInt((h.pos*(h.end[0]-h.start[0]))+h.start[0],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[1]-h.start[1]))+h.start[1],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[2]-h.start[2]))+h.start[2],10),255),0)].join(",")+")"}});function b(g){var f;if(g&&g.constructor==Array&&g.length==3){return g}if(f=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)){return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)]}if(f=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)){return[parseFloat(f[1])*2.55,parseFloat(f[2])*2.55,parseFloat(f[3])*2.55]}if(f=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)){return[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16)]}if(f=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)){return[parseInt(f[1]+f[1],16),parseInt(f[2]+f[2],16),parseInt(f[3]+f[3],16)]}if(f=/rgba\(0, 0, 0, 0\)/.exec(g)){return a.transparent}return a[d.trim(g).toLowerCase()]}function e(h,f){var g;do{g=d.curCSS(h,f);if(g!=""&&g!="transparent"||d.nodeName(h,"body")){break}f="backgroundColor"}while(h=h.parentNode);return b(g)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};d.easing.jswing=d.easing.swing;d.extend(d.easing,{def:"easeOutQuad",swing:function(g,h,f,j,i){return d.easing[d.easing.def](g,h,f,j,i)},easeInQuad:function(g,h,f,j,i){return j*(h/=i)*h+f},easeOutQuad:function(g,h,f,j,i){return -j*(h/=i)*(h-2)+f},easeInOutQuad:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h+f}return -j/2*((--h)*(h-2)-1)+f},easeInCubic:function(g,h,f,j,i){return j*(h/=i)*h*h+f},easeOutCubic:function(g,h,f,j,i){return j*((h=h/i-1)*h*h+1)+f},easeInOutCubic:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h+f}return j/2*((h-=2)*h*h+2)+f},easeInQuart:function(g,h,f,j,i){return j*(h/=i)*h*h*h+f},easeOutQuart:function(g,h,f,j,i){return -j*((h=h/i-1)*h*h*h-1)+f},easeInOutQuart:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h+f}return -j/2*((h-=2)*h*h*h-2)+f},easeInQuint:function(g,h,f,j,i){return j*(h/=i)*h*h*h*h+f},easeOutQuint:function(g,h,f,j,i){return j*((h=h/i-1)*h*h*h*h+1)+f},easeInOutQuint:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h*h+f}return j/2*((h-=2)*h*h*h*h+2)+f},easeInSine:function(g,h,f,j,i){return -j*Math.cos(h/i*(Math.PI/2))+j+f},easeOutSine:function(g,h,f,j,i){return j*Math.sin(h/i*(Math.PI/2))+f},easeInOutSine:function(g,h,f,j,i){return -j/2*(Math.cos(Math.PI*h/i)-1)+f},easeInExpo:function(g,h,f,j,i){return(h==0)?f:j*Math.pow(2,10*(h/i-1))+f},easeOutExpo:function(g,h,f,j,i){return(h==i)?f+j:j*(-Math.pow(2,-10*h/i)+1)+f},easeInOutExpo:function(g,h,f,j,i){if(h==0){return f}if(h==i){return f+j}if((h/=i/2)<1){return j/2*Math.pow(2,10*(h-1))+f}return j/2*(-Math.pow(2,-10*--h)+2)+f},easeInCirc:function(g,h,f,j,i){return -j*(Math.sqrt(1-(h/=i)*h)-1)+f},easeOutCirc:function(g,h,f,j,i){return j*Math.sqrt(1-(h=h/i-1)*h)+f},easeInOutCirc:function(g,h,f,j,i){if((h/=i/2)<1){return -j/2*(Math.sqrt(1-h*h)-1)+f}return j/2*(Math.sqrt(1-(h-=2)*h)+1)+f},easeInElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return -(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f},easeOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return h*Math.pow(2,-10*i)*Math.sin((i*l-j)*(2*Math.PI)/k)+m+f},easeInOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l/2)==2){return f+m}if(!k){k=l*(0.3*1.5)}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}if(i<1){return -0.5*(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f}return h*Math.pow(2,-10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k)*0.5+m+f},easeInBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*(h/=j)*h*((i+1)*h-i)+f},easeOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*((h=h/j-1)*h*((i+1)*h+i)+1)+f},easeInOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}if((h/=j/2)<1){return k/2*(h*h*(((i*=(1.525))+1)*h-i))+f}return k/2*((h-=2)*h*(((i*=(1.525))+1)*h+i)+2)+f},easeInBounce:function(g,h,f,j,i){return j-d.easing.easeOutBounce(g,i-h,0,j,i)+f},easeOutBounce:function(g,h,f,j,i){if((h/=i)<(1/2.75)){return j*(7.5625*h*h)+f}else{if(h<(2/2.75)){return j*(7.5625*(h-=(1.5/2.75))*h+0.75)+f}else{if(h<(2.5/2.75)){return j*(7.5625*(h-=(2.25/2.75))*h+0.9375)+f}else{return j*(7.5625*(h-=(2.625/2.75))*h+0.984375)+f}}}},easeInOutBounce:function(g,h,f,j,i){if(h<i/2){return d.easing.easeInBounce(g,h*2,0,j,i)*0.5+f}return d.easing.easeOutBounce(g,h*2-i,0,j,i)*0.5+j*0.5+f}})})(jQuery);;/*
 * jQuery UI Effects Blind 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.blind=function(b){return this.queue(function(){var d=a(this),c=["position","top","left"];var h=a.effects.setMode(d,b.options.mode||"hide");var g=b.options.direction||"vertical";a.effects.save(d,c);d.show();var j=a.effects.createWrapper(d).css({overflow:"hidden"});var e=(g=="vertical")?"height":"width";var i=(g=="vertical")?j.height():j.width();if(h=="show"){j.css(e,0)}var f={};f[e]=h=="show"?i:0;j.animate(f,b.duration,b.options.easing,function(){if(h=="hide"){d.hide()}a.effects.restore(d,c);a.effects.removeWrapper(d);if(b.callback){b.callback.apply(d[0],arguments)}d.dequeue()})})}})(jQuery);;/*
 * jQuery UI Effects Bounce 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.bounce=function(b){return this.queue(function(){var e=a(this),l=["position","top","left"];var k=a.effects.setMode(e,b.options.mode||"effect");var n=b.options.direction||"up";var c=b.options.distance||20;var d=b.options.times||5;var g=b.duration||250;if(/show|hide/.test(k)){l.push("opacity")}a.effects.save(e,l);e.show();a.effects.createWrapper(e);var f=(n=="up"||n=="down")?"top":"left";var p=(n=="up"||n=="left")?"pos":"neg";var c=b.options.distance||(f=="top"?e.outerHeight({margin:true})/3:e.outerWidth({margin:true})/3);if(k=="show"){e.css("opacity",0).css(f,p=="pos"?-c:c)}if(k=="hide"){c=c/(d*2)}if(k!="hide"){d--}if(k=="show"){var h={opacity:1};h[f]=(p=="pos"?"+=":"-=")+c;e.animate(h,g/2,b.options.easing);c=c/2;d--}for(var j=0;j<d;j++){var o={},m={};o[f]=(p=="pos"?"-=":"+=")+c;m[f]=(p=="pos"?"+=":"-=")+c;e.animate(o,g/2,b.options.easing).animate(m,g/2,b.options.easing);c=(k=="hide")?c*2:c/2}if(k=="hide"){var h={opacity:0};h[f]=(p=="pos"?"-=":"+=")+c;e.animate(h,g/2,b.options.easing,function(){e.hide();a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}})}else{var o={},m={};o[f]=(p=="pos"?"-=":"+=")+c;m[f]=(p=="pos"?"+=":"-=")+c;e.animate(o,g/2,b.options.easing).animate(m,g/2,b.options.easing,function(){a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}})}e.queue("fx",function(){e.dequeue()});e.dequeue()})}})(jQuery);;/*
 * jQuery UI Effects Clip 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.clip=function(b){return this.queue(function(){var f=a(this),j=["position","top","left","height","width"];var i=a.effects.setMode(f,b.options.mode||"hide");var k=b.options.direction||"vertical";a.effects.save(f,j);f.show();var c=a.effects.createWrapper(f).css({overflow:"hidden"});var e=f[0].tagName=="IMG"?c:f;var g={size:(k=="vertical")?"height":"width",position:(k=="vertical")?"top":"left"};var d=(k=="vertical")?e.height():e.width();if(i=="show"){e.css(g.size,0);e.css(g.position,d/2)}var h={};h[g.size]=i=="show"?d:0;h[g.position]=i=="show"?0:d/2;e.animate(h,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){f.hide()}a.effects.restore(f,j);a.effects.removeWrapper(f);if(b.callback){b.callback.apply(f[0],arguments)}f.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Drop 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.drop=function(b){return this.queue(function(){var e=a(this),d=["position","top","left","opacity"];var i=a.effects.setMode(e,b.options.mode||"hide");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e);var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true})/2:e.outerWidth({margin:true})/2);if(i=="show"){e.css("opacity",0).css(f,c=="pos"?-j:j)}var g={opacity:i=="show"?1:0};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Explode 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.explode=function(b){return this.queue(function(){var k=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;var e=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?(a(this).is(":visible")?"hide":"show"):b.options.mode;var h=a(this).show().css("visibility","hidden");var l=h.offset();l.top-=parseInt(h.css("marginTop"),10)||0;l.left-=parseInt(h.css("marginLeft"),10)||0;var g=h.outerWidth(true);var c=h.outerHeight(true);for(var f=0;f<k;f++){for(var d=0;d<e;d++){h.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-d*(g/e),top:-f*(c/k)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g/e,height:c/k,left:l.left+d*(g/e)+(b.options.mode=="show"?(d-Math.floor(e/2))*(g/e):0),top:l.top+f*(c/k)+(b.options.mode=="show"?(f-Math.floor(k/2))*(c/k):0),opacity:b.options.mode=="show"?0:1}).animate({left:l.left+d*(g/e)+(b.options.mode=="show"?0:(d-Math.floor(e/2))*(g/e)),top:l.top+f*(c/k)+(b.options.mode=="show"?0:(f-Math.floor(k/2))*(c/k)),opacity:b.options.mode=="show"?1:0},b.duration||500)}}setTimeout(function(){b.options.mode=="show"?h.css({visibility:"visible"}):h.css({visibility:"visible"}).hide();if(b.callback){b.callback.apply(h[0])}h.dequeue();a("div.ui-effects-explode").remove()},b.duration||500)})}})(jQuery);;/*
 * jQuery UI Effects Fold 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.fold=function(b){return this.queue(function(){var e=a(this),k=["position","top","left"];var h=a.effects.setMode(e,b.options.mode||"hide");var o=b.options.size||15;var n=!(!b.options.horizFirst);var g=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(e,k);e.show();var d=a.effects.createWrapper(e).css({overflow:"hidden"});var i=((h=="show")!=n);var f=i?["width","height"]:["height","width"];var c=i?[d.width(),d.height()]:[d.height(),d.width()];var j=/([0-9]+)%/.exec(o);if(j){o=parseInt(j[1],10)/100*c[h=="hide"?0:1]}if(h=="show"){d.css(n?{height:0,width:o}:{height:o,width:0})}var m={},l={};m[f[0]]=h=="show"?c[0]:o;l[f[1]]=h=="show"?c[1]:0;d.animate(m,g,b.options.easing).animate(l,g,b.options.easing,function(){if(h=="hide"){e.hide()}a.effects.restore(e,k);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(e[0],arguments)}e.dequeue()})})}})(jQuery);;/*
 * jQuery UI Effects Highlight 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.highlight=function(b){return this.queue(function(){var e=a(this),d=["backgroundImage","backgroundColor","opacity"];var h=a.effects.setMode(e,b.options.mode||"show");var c=b.options.color||"#ffff99";var g=e.css("backgroundColor");a.effects.save(e,d);e.show();e.css({backgroundImage:"none",backgroundColor:c});var f={backgroundColor:g};if(h=="hide"){f.opacity=0}e.animate(f,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(h=="hide"){e.hide()}a.effects.restore(e,d);if(h=="show"&&a.browser.msie){this.style.removeAttribute("filter")}if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Pulsate 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.pulsate=function(b){return this.queue(function(){var d=a(this);var g=a.effects.setMode(d,b.options.mode||"show");var f=b.options.times||5;var e=b.duration?b.duration/2:a.fx.speeds._default/2;if(g=="hide"){f--}if(d.is(":hidden")){d.css("opacity",0);d.show();d.animate({opacity:1},e,b.options.easing);f=f-2}for(var c=0;c<f;c++){d.animate({opacity:0},e,b.options.easing).animate({opacity:1},e,b.options.easing)}if(g=="hide"){d.animate({opacity:0},e,b.options.easing,function(){d.hide();if(b.callback){b.callback.apply(this,arguments)}})}else{d.animate({opacity:0},e,b.options.easing).animate({opacity:1},e,b.options.easing,function(){if(b.callback){b.callback.apply(this,arguments)}})}d.queue("fx",function(){d.dequeue()});d.dequeue()})}})(jQuery);;/*
 * jQuery UI Effects Scale 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.puff=function(b){return this.queue(function(){var f=a(this);var c=a.extend(true,{},b.options);var h=a.effects.setMode(f,b.options.mode||"hide");var g=parseInt(b.options.percent,10)||150;c.fade=true;var e={height:f.height(),width:f.width()};var d=g/100;f.from=(h=="hide")?e:{height:e.height*d,width:e.width*d};c.from=f.from;c.percent=(h=="hide")?g:100;c.mode=h;f.effect("scale",c,b.duration,b.callback);f.dequeue()})};a.effects.scale=function(b){return this.queue(function(){var g=a(this);var d=a.extend(true,{},b.options);var j=a.effects.setMode(g,b.options.mode||"effect");var h=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:(j=="hide"?0:100));var i=b.options.direction||"both";var c=b.options.origin;if(j!="effect"){d.origin=c||["middle","center"];d.restore=true}var f={height:g.height(),width:g.width()};g.from=b.options.from||(j=="show"?{height:0,width:0}:f);var e={y:i!="horizontal"?(h/100):1,x:i!="vertical"?(h/100):1};g.to={height:f.height*e.y,width:f.width*e.x};if(b.options.fade){if(j=="show"){g.from.opacity=0;g.to.opacity=1}if(j=="hide"){g.from.opacity=1;g.to.opacity=0}}d.from=g.from;d.to=g.to;d.mode=j;g.effect("size",d,b.duration,b.callback);g.dequeue()})};a.effects.size=function(b){return this.queue(function(){var c=a(this),n=["position","top","left","width","height","overflow","opacity"];var m=["position","top","left","overflow","opacity"];var j=["width","height","overflow"];var p=["fontSize"];var k=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];var f=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];var g=a.effects.setMode(c,b.options.mode||"effect");var i=b.options.restore||false;var e=b.options.scale||"both";var o=b.options.origin;var d={height:c.height(),width:c.width()};c.from=b.options.from||d;c.to=b.options.to||d;if(o){var h=a.effects.getBaseline(o,d);c.from.top=(d.height-c.from.height)*h.y;c.from.left=(d.width-c.from.width)*h.x;c.to.top=(d.height-c.to.height)*h.y;c.to.left=(d.width-c.to.width)*h.x}var l={from:{y:c.from.height/d.height,x:c.from.width/d.width},to:{y:c.to.height/d.height,x:c.to.width/d.width}};if(e=="box"||e=="both"){if(l.from.y!=l.to.y){n=n.concat(k);c.from=a.effects.setTransition(c,k,l.from.y,c.from);c.to=a.effects.setTransition(c,k,l.to.y,c.to)}if(l.from.x!=l.to.x){n=n.concat(f);c.from=a.effects.setTransition(c,f,l.from.x,c.from);c.to=a.effects.setTransition(c,f,l.to.x,c.to)}}if(e=="content"||e=="both"){if(l.from.y!=l.to.y){n=n.concat(p);c.from=a.effects.setTransition(c,p,l.from.y,c.from);c.to=a.effects.setTransition(c,p,l.to.y,c.to)}}a.effects.save(c,i?n:m);c.show();a.effects.createWrapper(c);c.css("overflow","hidden").css(c.from);if(e=="content"||e=="both"){k=k.concat(["marginTop","marginBottom"]).concat(p);f=f.concat(["marginLeft","marginRight"]);j=n.concat(k).concat(f);c.find("*[width]").each(function(){child=a(this);if(i){a.effects.save(child,j)}var q={height:child.height(),width:child.width()};child.from={height:q.height*l.from.y,width:q.width*l.from.x};child.to={height:q.height*l.to.y,width:q.width*l.to.x};if(l.from.y!=l.to.y){child.from=a.effects.setTransition(child,k,l.from.y,child.from);child.to=a.effects.setTransition(child,k,l.to.y,child.to)}if(l.from.x!=l.to.x){child.from=a.effects.setTransition(child,f,l.from.x,child.from);child.to=a.effects.setTransition(child,f,l.to.x,child.to)}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function(){if(i){a.effects.restore(child,j)}})})}c.animate(c.to,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(g=="hide"){c.hide()}a.effects.restore(c,i?n:m);a.effects.removeWrapper(c);if(b.callback){b.callback.apply(this,arguments)}c.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Shake 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.shake=function(b){return this.queue(function(){var e=a(this),l=["position","top","left"];var k=a.effects.setMode(e,b.options.mode||"effect");var n=b.options.direction||"left";var c=b.options.distance||20;var d=b.options.times||3;var g=b.duration||b.options.duration||140;a.effects.save(e,l);e.show();a.effects.createWrapper(e);var f=(n=="up"||n=="down")?"top":"left";var p=(n=="up"||n=="left")?"pos":"neg";var h={},o={},m={};h[f]=(p=="pos"?"-=":"+=")+c;o[f]=(p=="pos"?"+=":"-=")+c*2;m[f]=(p=="pos"?"-=":"+=")+c*2;e.animate(h,g,b.options.easing);for(var j=1;j<d;j++){e.animate(o,g,b.options.easing).animate(m,g,b.options.easing)}e.animate(o,g,b.options.easing).animate(h,g/2,b.options.easing,function(){a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}});e.queue("fx",function(){e.dequeue()});e.dequeue()})}})(jQuery);;/*
 * jQuery UI Effects Slide 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.slide=function(b){return this.queue(function(){var e=a(this),d=["position","top","left"];var i=a.effects.setMode(e,b.options.mode||"show");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e).css({overflow:"hidden"});var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true}):e.outerWidth({margin:true}));if(i=="show"){e.css(f,c=="pos"?-j:j)}var g={};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Transfer 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.transfer=function(b){return this.queue(function(){var f=a(this),h=a(b.options.to),e=h.offset(),g={top:e.top,left:e.left,height:h.innerHeight(),width:h.innerWidth()},d=f.offset(),c=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:d.top,left:d.left,height:f.innerHeight(),width:f.innerWidth(),position:"absolute"}).animate(g,b.duration,b.options.easing,function(){c.remove();(b.callback&&b.callback.apply(f[0],arguments));f.dequeue()})})}})(jQuery);;


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.ajaxloader.js ] ==== */
/***
@title:
Ajax Loader

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-09-25

@url:
http://andreaslagerkvist.com/jquery/ajax-loader/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.ajaxLoader.css, jquery.ajaxLoader.gif

@does:
Use this plug-in when you want to inform your visitors that a certain part of your page is currently loading. The plug-in adds a faded 'loading-div' on top of the selected element(s). The div is of course completely stylable.

@howto:
jQuery('#contact').ajaxLoader(); would add the overlay on top of the #contact-element.

When you want to remove the loader simply run jQuery('#contact').ajaxLoaderRemove();

@exampleHTML:
I should start loading after a couple of seconds, then load for a couple more and then stop loading only to start again after a couple of seconds. And so on.

@exampleJS:
setInterval(function () {
	jQuery('#jquery-ajax-loader-example').ajaxLoader();
	setTimeout(function () {
		jQuery('#jquery-ajax-loader-example').ajaxLoaderRemove();
	}, 2000);
}, 4000);
***/
jQuery.fn.ajaxLoader = function (conf) {
	var config = jQuery.extend({
		className:	'jquery-ajax-loader'
	}, conf);

	return this.each(function () {
		var t = jQuery(this);

		if (!this.ajaxLoader) {
			var offset = t.offset();
			var dim = {
				left:	offset.left, 
				top:	offset.top, 
				width:	t.outerWidth(), 
				height:	t.outerHeight()
			};

			this.ajaxLoader = jQuery('<div class="' + config.className + '"></div>').css({
				position:	'absolute', 
				left:		dim.left + 'px', 
				top:		dim.top + 'px',
				width:		dim.width + 'px',
				height:		dim.height + 'px'
			}).appendTo(document.body).hide();
		}

		this.ajaxLoader.fadeIn(500);
	});
};

jQuery.fn.ajaxLoaderRemove = function () {
	return this.each(function () {
		if (this.ajaxLoader) {
			this.ajaxLoader.fadeOut(500);
		}
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.captcharefresh.js ] ==== */
/***
@title:
Captcha Refresh

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-09-19

@url:
http://andreaslagerkvist.com/jquery/captcha-refresh/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
If you use a so called CAPTCHA-image on your site then you can use this plug-in to allow users to click your CAPTCHA in order to generate a new random string - provided your CAPTHA-script generates a random image every time it is called.

@howto:
jQuery(document.body).captchaRefresh({src: '/captcha.png'}); Would make all images with '/captcha.png' as their source in the document clickable.

Run Captcha Refresh on a parent-element of the captcha image(s). Running it on document.body affects every CAPTCHA-image in the document.

@exampleHTML:
<img src="/?module=Captcha" alt="" />

@exampleJS:
// I'm not running it because I already use captchaRefresh on my site
// jQuery(document.body).captchaRefresh({src: WEBROOT + '?module=Captcha'});
***/
jQuery.fn.captchaRefresh = function (conf) {
	var config = jQuery.extend({
		src:	'/captcha.png', 
		title:	'Can\'t see what it says? Click me to get a new string.'
	}, conf);

	return this.each(function () {
		jQuery('img[src^="' + config.src + '"]', this).attr('title', config.title);

		jQuery(this).click(function(event) {
			var clicked = jQuery(event.target);

			if (clicked.is('img[src^="' + config.src + '"]')) {
				var now			= new Date();
				var separator	= config.src.indexOf('?') == -1 ? '?' : '&';

				clicked.attr('src', config.src + separator + now.getTime());
			}
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.center.js ] ==== */
/***
@title:
Center

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-09-17

@url:
http://andreaslagerkvist.com/jquery/center/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This little pluggy centers an element on the screen using either fixed or absolute positioning. Can be used to display messages, pop up images etc.

@howto:
jQuery('#my-element').center(true); would center the element with ID 'my-element' using absolute position (leave empty for fixed).

@exampleHTML:
<p>I should be fixed centered</p>

<p>The paragraph above and the paragraph beneath this one are centered. They should be in the middle of the viewport.</p>

<p>I should be absolutely centered</p>

@exampleJS:
jQuery('#jquery-center-example p:first-child').center();
jQuery('#jquery-center-example p:last-child').center(true);
***/
jQuery.fn.center = function (absolute) {
	return this.each(function () {
		var t = jQuery(this);

		t.css({
			position:	absolute ? 'absolute' : 'fixed', 
			left:		'50%', 
			top:		'50%', 
			zIndex:		'99'
		}).css({
			marginLeft:	'-' + (t.outerWidth() / 2) + 'px', 
			marginTop:	'-' + (t.outerHeight() / 2) + 'px'
		});

		if (absolute) {
			t.css({
				marginTop:	parseInt(t.css('marginTop'), 10) + jQuery(window).scrollTop(), 
				marginLeft:	parseInt(t.css('marginLeft'), 10) + jQuery(window).scrollLeft()
			});
		}
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.checkedcheckboxparent.js ] ==== */
/***
@title:
Checked checkbox-parent

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-11-13

@url:
http://andreaslagerkvist.com/jquery/checked-checkbox-parent/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This tiny plug-in adds and removes a 'checked'-class to input[type=checkbox]'s parents. Very useful if you want to style the entire wrapping <label>-element when its child-checkbox is checked.

@howto:
jQuery('form').checkedCheckboxParent(); would apply the plug-in to every checkbox in 'form'.

@exampleHTML:
<p>
	<label>
		<input type="checkbox" name="dummy" /> Click me to try it
	</labe>
</p>

@exampleJS:
jQuery('#jquery-checked-checkbox-parent-example').checkedCheckboxParent();
***/
jQuery.fn.checkedCheckboxParent = function () {
	return this.each(function () {
		jQuery(':checkbox', this).each(function () {
			var check = $(this);

			var checkParent = function () {
				if (check.is(':checked')) {
					check.parent().addClass('checked');
				}
				else {
					check.parent().removeClass('checked');
				}
			};

			checkParent();
			check.click(checkParent);
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.codeblocktoolbar.js ] ==== */
/***
@title:
Code Block Toolbar

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/code-block-toolbar/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.codeBlockToolbar.css, jquery.codeBlockToolbar.png

@does:
If you post code-examples on your site you can use this plug-in to add some nifty buttons below each code-example that allows the user to, for example, switch to plain text or increase the font-size.

@howto:
jQuery('p.code-block').codeBlockToolbar(); Would add the toolbar to every paragraph with a class of 'code-block'.

@exampleHTML:
<p class="code">
	<code>
		I'm a piece of example-code<br />
		I should have some buttons beneath me if JS is enabled.
	</code>
</p>

@exampleJS:
jQuery('#jquery-code-block-toolbar-example p.code').codeBlockToolbar();
***/
jQuery.fn.codeBlockToolbar = function (conf) {
	var config = jQuery.extend({
		className:		'jquery-code-block-toolbar', 
		increaseText:	'Increase code font-size', 
		decreaseText:	'Decrease code font-size', 
		expandText:		'Expand code-block', 
		textareaText:	'Switch to textarea', 
		textareaText2:	'Switch back'
		
	}, conf);

	return this.each(function () {
		var codeBlock		= jQuery(this);
		var cbMaxHeight		= parseInt(codeBlock.css('max-height'), 10);
		var cbHeight		= codeBlock.outerHeight();
		var cbHTML			= codeBlock.html();
		var cbText			= codeBlock.html().replace(/\n/ig, '').replace(/<br.*?>/ig, '\n').replace(/<.*?>/ig, '');
		var ul				= jQuery('<ul class="' + config.className + '"></ul>').insertAfter(codeBlock);
		var textarea		= jQuery('<p><textarea rows="4" cols="60" class="' 
								+ config.className 
								+ '" style="height: ' 
								+ (cbHeight - 10) 
								+ 'px;">' 
								+ cbText 
								+ '</textarea></p>').insertAfter(codeBlock).hide();

		jQuery('<li class="increase"><a href="#">' + config.increaseText + '</a></li>').appendTo(ul).find('a').click(function () {
			codeBlock.css('font-size', parseFloat(codeBlock.css('font-size'), 10) * 1.2);

			return false;
		});

		jQuery('<li class="decrease"><a href="#">' + config.decreaseText + '</a></li>').appendTo(ul).find('a').click(function () {
			codeBlock.css('font-size', parseFloat(codeBlock.css('font-size'), 10) * .8);

			return false;
		});

		jQuery('<li class="textarea"><a href="#">' + config.textareaText + '</a></li>').appendTo(ul).find('a').toggle(function () {
			jQuery(this).text(config.textareaText2);
			codeBlock.hide();
			textarea.show();
			textarea.find('textarea')[0].focus();
			textarea.find('textarea')[0].select();

			return false;
		}, function () {
			jQuery(this).text(config.textareaText);
			textarea.hide();
			codeBlock.show();

			return false;
		});

		if (cbHeight > cbMaxHeight) {
			jQuery('<li class="expand"><a href="#">' + config.expandText + '</a></li>').appendTo(ul).find('a').click(function () {
				codeBlock.css('max-height', 'none');
				jQuery(this).parent().remove();

				return false;
			});
		}
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.colourpicker.js ] ==== */
/***
@title:
Colour Picker

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-09-16

@url:
http://andreaslagerkvist.com/jquery/colour-picker/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.colourPicker.css, jquery.colourPicker.gif

@does:
Use this plug-in on a normal <select>-element filled with colours to turn it in to a colour-picker widget that allows users to view all the colours in the drop-down as well as enter their own, preferred, custom colour.

@howto:
jQuery('select[name="colour"]').colourPicker({ico: 'my-icon.gif', title: 'Select a colour from the list'}); Would replace the select with 'my-icon.gif' which, when clicked, would open a dialogue with the title 'Select a colour from the list'.

You can close the colour-picker without selecting a colour by clicking anywhere outside the colour-picker box.

Here's a handy PHP-function to generate a list of "web-safe" colours:

[code]
function gwsc() {
	$cs = array('00', '33', '66', '99', 'CC', 'FF');

	for($i=0; $i<6; $i++) {
		for($j=0; $j<6; $j++) {
			for($k=0; $k<6; $k++) {
				$c = $cs[$i] .$cs[$j] .$cs[$k];
				echo "<option value=\"$c\">#$c</option>\n";
			}
		}
	}
}
[/code]

Use it like this: <select name="colour"><?php gwsc(); ?></select>.

@exampleHTML:
<p>
	<label>
		Pick a colour<br />
		<select name="colour_1">
			<option value="ffffff">White</option>
			<option value="ff0000">Red</option>
			<option value="00ff00">Green</option>
			<option value="0000ff">Blue</option>
			<option value="000000">Black</option>
		</select>
	</label>
</p>

<p>
	<label>
		And one more<br />
		<select name="colour_2">
			<option value="ffffff">White</option>
			<option value="ff0000">Red</option>
			<option value="00ff00">Green</option>
			<option value="0000ff">Blue</option>
			<option value="000000">Black</option>
		</select>
	</label>
</p>

@exampleJS:
jQuery('#jquery-colour-picker-example select').colourPicker({ico: WEBROOT +'aFramework/Styles/__common/gfx/jquery.colourPicker.gif'});
***/
jQuery.fn.colourPicker = function (conf) {
	// Config for plug
	var config = jQuery.extend({
		id:			'jquery-colour-picker',	// id of colour-picker container
		ico:		'ico.gif',				// SRC to colour-picker icon
		title:		'Pick a colour',		// Default dialogue title
		inputBG:	true,					// Whether to change the input's background to the selected colour's
		speed:		500,					// Speed of dialogue-animation
		openTxt:	'Open colour picker'
	}, conf);

	// Inverts a hex-colour
	var hexInvert = function (hex) {
		var r = hex.substr(0, 2);
		var g = hex.substr(2, 2);
		var b = hex.substr(4, 2);

		return 0.212671 * r + 0.715160 * g + 0.072169 * b < 0.5 ? 'ffffff' : '000000'
	};

	// Add the colour-picker dialogue if not added
	var colourPicker = jQuery('#' + config.id);

	if (!colourPicker.length) {
		colourPicker = jQuery('<div id="' + config.id + '"></div>').appendTo(document.body).hide();

		// Remove the colour-picker if you click outside it (on body)
		jQuery(document.body).click(function(event) {
			if (!(jQuery(event.target).is('#' + config.id) || jQuery(event.target).parents('#' + config.id).length)) {
				colourPicker.hide(config.speed);
			}
		});
	}

	// For every select passed to the plug-in
	return this.each(function () {
		// Insert icon and input
		var select	= jQuery(this);
		var icon	= jQuery('<a href="#"><img src="' + config.ico + '" alt="' + config.openTxt + '" /></a>').insertAfter(select);
		var input	= jQuery('<input type="text" name="' + select.attr('name') + '" value="' + select.val() + '" size="6" />').insertAfter(select);
		var loc		= '';

		// Build a list of colours based on the colours in the select
		jQuery('option', select).each(function () {
			var option	= jQuery(this);
			var hex		= option.val();
			var title	= option.text();

			loc += '<li><a href="#" title="' 
					+ title 
					+ '" rel="' 
					+ hex 
					+ '" style="background: #' 
					+ hex 
					+ '; colour: ' 
					+ hexInvert(hex) 
					+ ';">' 
					+ title 
					+ '</a></li>';
		});

		// Remove select
		select.remove();

		// If user wants to, change the input's BG to reflect the newly selected colour
		if (config.inputBG) {
			input.change(function () {
				input.css({background: '#' + input.val(), color: '#' + hexInvert(input.val())});
			});
		}

		// When you click the icon
		icon.click(function () {
			// Show the colour-picker next to the icon and fill it with the colours in the select that used to be there
			var iconPos	= icon.offset();
			var heading	= config.title ? '<h2>' + config.title + '</h2>' : '';

			colourPicker.html(heading + '<ul>' + loc + '</ul>').css({
				position: 'absolute', 
				left: iconPos.left + 'px', 
				top: iconPos.top + 'px'
			}).show(config.speed);

			// When you click a colour in the colour-picker
			jQuery('a', colourPicker).click(function () {
				// The hex is stored in the link's rel-attribute
				var hex = jQuery(this).attr('rel');

				input.val(hex);

				// If user wants to, change the input's BG to reflect the newly selected colour
				if (config.inputBG) {
					input.css({background: '#' + hex, color: '#' + hexInvert(hex)});
				}

				// Trigger change-event on input
				input.change();

				// Hide the colour-picker and return false
				colourPicker.hide(config.speed);

				return false;
			});

			return false;
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.disabletextselect.js ] ==== */
/**
 * .disableTextSelect - Disable Text Select Plugin
 *
 * Version: 1.1
 * Updated: 2007-11-28
 *
 * Used to stop users from selecting text
 *
 * Copyright (c) 2007 James Dempster (letssurf@gmail.com, http://www.jdempster.com/category/jquery/disabletextselect/)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 **/

/**
 * Requirements:
 * - jQuery (John Resig, http://www.jquery.com/)
 **/
(function($) {
    if ($.browser.mozilla) {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).css({
                    'MozUserSelect' : 'none'
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).css({
                    'MozUserSelect' : ''
                });
            });
        };
    } else if ($.browser.msie) {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).bind('selectstart.disableTextSelect', function() {
                    return false;
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).unbind('selectstart.disableTextSelect');
            });
        };
    } else {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).bind('mousedown.disableTextSelect', function() {
                    return false;
                });
            });
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).unbind('mousedown.disableTextSelect');
            });
        };
    }
})(jQuery);



/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.dragtoselect.js ] ==== */
/***
@title:
Drag to Select

@version:
1.1

@author:
Andreas Lagerkvist

@date:
2009-04-06

@url:
http://andreaslagerkvist.com/jquery/drag-to-select/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.dragToSelect.css

@does:
Use this plug-in to allow your users to select certain elements by dragging a "select box". Works very similar to how you can drag-n-select files and folders in most OS:es.

@howto:
$('#my-files').dragToSelect(selectables: 'li'); would make every li in the #my-files-element selectable by dragging. The li:s will recieve a "selected"-class when they are within range of the select box when user drops.

Make sure a parent-element of the selectables has position: relative as well as overflow: auto or scroll.

@exampleHTML:
<ul>
	<li><img src="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01_small.jpg" alt="Lamp and Mates" /></li>
	<li><img src="http://exscale.se/__files/3d/stugan-winter_small.jpg" alt="The Cottage - Winter time" /></li>
	<li><img src="http://exscale.se/__files/3d/ps2_small.jpg" alt="PS2" /></li>
</ul>

@exampleJS:
$('#jquery-drag-to-select-example').dragToSelect({
	selectables: 'li', 
	onHide: function () {
		alert($('#jquery-drag-to-select-example li.selected').length + ' selected');
	}
});
***/
jQuery.fn.dragToSelect = function (conf) {
	var c = typeof(conf) == 'object' ? conf : {};

	// Config
	var config = jQuery.extend({
		className:		'jquery-drag-to-select', 
		activeClass:	'active', 
		disabledClass:	'disabled', 
		selectedClass:	'selected', 
		scrollTH:		10, 
		percentCovered:	25, 
		selectables:	false, 
		autoScroll:		false, 
		selectOnMove:	false, 
		onShow:			function () {return true;}, 
		onHide:			function () {return true;}, 
		onRefresh:		function () {return true;}
	}, c);

	var realParent	= jQuery(this);
	var parent		= realParent;

	do {
		if (/auto|scroll|hidden/.test(parent.css('overflow'))) {
			break;
		}
		parent = parent.parent();
	} while (parent[0].parentNode);

	// Does user want to disable dragToSelect
	if (conf == 'disable') {
		parent.addClass(config.disabledClass);
		return this;
	}
	else if (conf == 'enable') {
		parent.removeClass(config.disabledClass);
		return this;
	}

	var parentOffset	= parent.offset();
	var parentDim		= {
		left:	parentOffset.left, 
		top:	parentOffset.top, 
		width:	parent.width(), 
		height:	parent.height()
	};

	// Current origin of select box
	var selectBoxOrigin = {
		left:	0, 
		top:	0
	};

	// Create select box
	var selectBox = jQuery('<div/>')
						.appendTo(parent)
						.attr('class', config.className)
						.css('position', 'absolute');

	// Shows the select box
	var showSelectBox = function (e) {
		if (parent.is('.' + config.disabledClass)) {
			return;
		}

		selectBoxOrigin.left	= e.pageX - parentDim.left + parent[0].scrollLeft;
		selectBoxOrigin.top		= e.pageY - parentDim.top + parent[0].scrollTop;

		var css = {
			left:		selectBoxOrigin.left + 'px', 
			top:		selectBoxOrigin.top + 'px', 
			width:		'1px', 
			height:		'1px'
		};
		selectBox.addClass(config.activeClass).css(css);

		config.onShow();
	};

	// Refreshes the select box dimensions and possibly position
	var refreshSelectBox = function (e) {
		if (!selectBox.is('.' + config.activeClass) || parent.is('.' + config.disabledClass)) {
			return;
		}

		var left		= e.pageX - parentDim.left + parent[0].scrollLeft;
		var top			= e.pageY - parentDim.top + parent[0].scrollTop;
		var newLeft		= left;
		var newTop		= top;
		var newWidth	= selectBoxOrigin.left - newLeft;
		var newHeight	= selectBoxOrigin.top - newTop;

		if (left > selectBoxOrigin.left) {
			newLeft		= selectBoxOrigin.left;
			newWidth	= left - selectBoxOrigin.left;
		}

		if (top > selectBoxOrigin.top) {
			newTop		= selectBoxOrigin.top;
			newHeight	= top - selectBoxOrigin.top;
		}

		var css = {
			left:	newLeft + 'px', 
			top:	newTop + 'px', 
			width:	newWidth + 'px', 
			height:	newHeight + 'px'
		};
		selectBox.css(css);

		config.onRefresh();
	};

	// Hides the select box
	var hideSelectBox = function (e) {
		if (!selectBox.is('.' + config.activeClass) || parent.is('.' + config.disabledClass)) {
			return;
		}
		if (config.onHide(selectBox) !== false) {
			selectBox.removeClass(config.activeClass);
		}
	};

	// Scrolls parent if needed
	var scrollPerhaps = function (e) {
		if (!selectBox.is('.' + config.activeClass) || parent.is('.' + config.disabledClass)) {
			return;
		}

		// Scroll down
		if ((e.pageY + config.scrollTH) > (parentDim.top + parentDim.height)) {
			parent[0].scrollTop += config.scrollTH;
		}
		// Scroll up
		if ((e.pageY - config.scrollTH) < parentDim.top) {
			parent[0].scrollTop -= config.scrollTH;
		}
		// Scroll right
		if ((e.pageX + config.scrollTH) > (parentDim.left + parentDim.width)) {
			parent[0].scrollLeft += config.scrollTH;
		}
		// Scroll left
		if ((e.pageX - config.scrollTH) < parentDim.left) {
			parent[0].scrollLeft -= config.scrollTH;
		}
	};

	// Selects all the elements in the select box's range
	var selectElementsInRange = function () {
		if (!selectBox.is('.' + config.activeClass) || parent.is('.' + config.disabledClass)) {
			return;
		}

		var selectables		= realParent.find(config.selectables);
		var selectBoxOffset	= selectBox.offset();
		var selectBoxDim	= {
			left:	selectBoxOffset.left, 
			top:	selectBoxOffset.top, 
			width:	selectBox.width(), 
			height:	selectBox.height()
		};

		selectables.each(function (i) {
			var el			= $(this);
			var elOffset	= el.offset();
			var elDim		= {
				left:	elOffset.left, 
				top:	elOffset.top, 
				width:	el.width(), 
				height:	el.height()
			};

			if (percentCovered(selectBoxDim, elDim) > config.percentCovered) {
				el.addClass(config.selectedClass);
			}
			else {
				el.removeClass(config.selectedClass);
			}
		});
	};

	// Returns the amount (in %) that dim1 covers dim2
	var percentCovered = function (dim1, dim2) {
		// The whole thing is covering the whole other thing
		if (
			(dim1.left <= dim2.left) && 
			(dim1.top <= dim2.top) && 
			((dim1.left + dim1.width) >= (dim2.left + dim2.width)) && 
			((dim1.top + dim1.height) > (dim2.top + dim2.height))
		) {
			return 100;
		}
		// Only parts may be covered, calculate percentage
		else {
			dim1.right		= dim1.left + dim1.width;
			dim1.bottom		= dim1.top + dim1.height;
			dim2.right		= dim2.left + dim2.width;
			dim2.bottom		= dim2.top + dim2.height;

			var l = Math.max(dim1.left, dim2.left);
			var r = Math.min(dim1.right, dim2.right);
			var t = Math.max(dim1.top, dim2.top);
			var b = Math.min(dim1.bottom, dim2.bottom);

			if (b >= t && r >= l) {
			/*	$('<div/>').appendTo(document.body).css({
					background:	'red', 
					position:	'absolute',
					left:		l + 'px', 
					top:		t + 'px', 
					width:		(r - l) + 'px', 
					height:		(b - t) + 'px', 
					zIndex:		100
				}); */

				var percent = (((r - l) * (b - t)) / (dim2.width * dim2.height)) * 100;

			//	alert(percent + '% covered')

				return percent;
			}
		}
		// Nothing covered, return 0
		return 0;
	};

	// Do the right stuff then return this
	selectBox
		.mousemove(function (e) {
			refreshSelectBox(e);

			if (config.selectables && config.selectOnMove) {			
				selectElementsInRange();
			}

			if (config.autoScroll) {
				scrollPerhaps(e);
			}

			e.preventDefault();
		})
		.mouseup(function(e) {
			if (config.selectables) {			
				selectElementsInRange();
			}

			hideSelectBox(e);

			e.preventDefault();
		});

	if (jQuery.fn.disableTextSelect) {
		parent.disableTextSelect();
	}

	parent
		.mousedown(function (e) {
			// Make sure user isn't clicking scrollbar (or disallow clicks far to the right actually)
			if ((e.pageX + 20) > jQuery(document.body).width()) {
				return;
			}

			showSelectBox(e);

			e.preventDefault();
		})
		.mousemove(function (e) {
			refreshSelectBox(e);

			if (config.selectables && config.selectOnMove) {			
				selectElementsInRange();
			}

			if (config.autoScroll) {
				scrollPerhaps(e);
			}

			e.preventDefault();
		})
		.mouseup(function (e) {
			if (config.selectables) {			
				selectElementsInRange();
			}

			hideSelectBox(e);

			e.preventDefault();
		});

	// Be nice
	return this;
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.easing.js ] ==== */
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.equalheight.js ] ==== */
/***
@title:
Equal Height

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-09-16

@url:
http://andreaslagerkvist.com/jquery/equal-height/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This plug-in makes HTML-elements equal height by adjusting their min-height CSS properties. Of course IE6 has no clue what min-height means so the plug-in uses height for that crappy old dinosaur.

@howto:
jQuery('#content, #secondary-content').equalHeight(); would make the elements with IDs 'content' and 'secondary-content' equal height.

@exampleHTML:
<p>Hi</p>

<p>Hi<br />Bye!</p>

@exampleJS:
jQuery('#jquery-equal-height-example p').equalHeight();
***/
jQuery.fn.equalHeight = function () {
	var height		= 0;
	var maxHeight	= 0;

	// Store the tallest element's height
	this.each(function () {
		height		= jQuery(this).outerHeight();
		maxHeight	= (height > maxHeight) ? height : maxHeight;
	});

	// Set element's min-height to tallest element's height
	return this.each(function () {
		var t			= jQuery(this);
		var innerHeight	= t.innerHeight();
		var outerHeight	= t.outerHeight();
		var notHeight	= outerHeight - innerHeight;
		var minHeight	= maxHeight - notHeight;
		var property	= jQuery.browser.msie && jQuery.browser.version < 7 ? 'height' : 'min-height';

		t.css(property, minHeight + 'px');
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.favicons.js ] ==== */
/***
@title:
Favicons

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-09-16

@url:
http://andreaslagerkvist.com/jquery/favicons/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This little plug-in will insert favicons to all external links found on your site. The plug-in scans the URL the link is pointing to for a favicon and, if it can't find one, displays any generic favicon-image you like instead.

@howto:
jQuery(document.body).favicons({insert: 'prependTo'}); would prepend favicons to every external link in the document.

You wanna run the plug-in on a parent-element of the external links. Unless you want certain external links _not_ to have a favicon there's no reason not to run the plug-in on document.body.

@exampleHTML:
<ul>
	<li><a href="http://www.codinghorror.com/blog/">Coding Horror</a></li>
	<li><a href="http://remysharp.com">remy sharp's b:log</a></li>
	<li><a href="http://snook.ca/jonathan/">Snook.ca</a></li>
	<li><a href="http://www.danwebb.net">DanWebb.net</a></li>
	<li><a href="http://www.dustindiaz.com/">DustinDiaz.com</a></li>
</ul>

@exampleJS:
jQuery('#jquery-favicons-example').favicons({insert: 'insertBefore', defaultIco: WEBROOT +'aFramework/Styles/__common/gfx/jquery.favicons.png'});
***/
jQuery.fn.favicons = function (conf) {
	var config = jQuery.extend({
		insert:		'appendTo', 
		defaultIco: 'favicon.png'
	}, conf);

	return this.each(function () {
		jQuery('a[href^="http://"]', this).each(function () {
			var link		= jQuery(this);
			var faviconURL	= link.attr('href').replace(/^(http:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';
			var faviconIMG	= jQuery('<img src="' + config.defaultIco + '" alt="" />')[config.insert](link);
			var extImg		= new Image();

			extImg.src = faviconURL;

			if (extImg.complete) {
				faviconIMG.attr('src', faviconURL);
			}
			else {
				extImg.onload = function () {
					faviconIMG.attr('src', faviconURL);
				};
			}
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.form.js ] ==== */
	/*
 * jQuery Form Plugin
 * version: 2.12 (06/07/2008)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 */
(function($) {

/*
    Usage Note:  
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').bind('submit', function() {
            $(this).ajaxSubmit({
                target: '#output'
            });
            return false; // <-- important!
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });
        
    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.  
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting 
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    if (typeof options == 'function')
        options = { success: options };

    options = $.extend({
        url:  this.attr('action') || window.location.toString(),
        type: this.attr('method') || 'GET'
    }, options || {});

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
   }

    var a = this.formToArray(options.semantic);
    if (options.data) {
        options.extraData = options.data;
        for (var n in options.data)
            a.push( { name: n, value: options.data[n] } );
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }    

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }    

    var q = $.param(a);

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else
        options.data = q; // data is the query string for 'post'

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            $(options.target).html(data).each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i](data, status, $form);
    };

    // are there files to upload?
    var files = $('input:file', this).fieldValue();
    var found = false;
    for (var j=0; j < files.length; j++)
        if (files[j])
            found = true;

    // options.iframe allows user to force iframe mode
   if (options.iframe || found) { 
       // hack to fix Safari hang (thanks to Tim Molendijk for this)
       // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
       if ($.browser.safari && options.closeKeepAlive)
           $.get(options.closeKeepAlive, fileUpload);
       else
           fileUpload();
       }
   else
       $.ajax(options);

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;


    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUpload() {
        var form = $form[0];
        
        if ($(':input[@name=submit]', form).length) {
            alert('Error: Form elements must not be named "submit".');
            return;
        }
        
        var opts = $.extend({}, $.ajaxSettings, options);

        var id = 'jqFormIO' + (new Date().getTime());
        var $io = $('<iframe id="' + id + '" name="' + id + '" />');
        var io = $io[0];

        if ($.browser.msie || $.browser.opera) 
            io.src = 'javascript:false;document.write("");';
        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

        var xhr = { // mock object
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {}
        };

        var g = opts.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && ! $.active++) $.event.trigger("ajaxStart");
        if (g) $.event.trigger("ajaxSend", [xhr, opts]);

        var cbInvoked = 0;
        var timedOut = 0;

        // add submitting element to data if we know it
        var sub = form.clk;
        if (sub) {
            var n = sub.name;
            if (n && !sub.disabled) {
                options.extraData = options.extraData || {};
                options.extraData[n] = sub.value;
                if (sub.type == "image") {
                    options.extraData[name+'.x'] = form.clk_x;
                    options.extraData[name+'.y'] = form.clk_y;
                }
            }
        }
        
        // take a breath so that pending repaints get some cpu time before the upload starts
        setTimeout(function() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');
            $form.attr({
                target:   id,
                encoding: 'multipart/form-data',
                enctype:  'multipart/form-data',
                method:   'POST',
                action:   opts.url
            });

            // support timout
            if (opts.timeout)
                setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (options.extraData)
                    for (var n in options.extraData)
                        extraInputs.push(
                            $('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
                                .appendTo(form)[0]);
            
                // add iframe to doc and submit the form
                $io.appendTo('body');
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
                $form.attr('action', a);
                t ? $form.attr('target', t) : $form.removeAttr('target');
                $(extraInputs).remove();
            }
        }, 10);

        function cb() {
            if (cbInvoked++) return;
            
            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

            var operaHack = 0;
            var ok = true;
            try {
                if (timedOut) throw 'timeout';
                // extract the server response from the iframe
                var data, doc;

                doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
                
                if (doc.body == null && !operaHack && $.browser.opera) {
                    // In Opera 9.2.x the iframe DOM is not always traversable when
                    // the onload callback fires so we give Opera 100ms to right itself
                    operaHack = 1;
                    cbInvoked--;
                    setTimeout(cb, 100);
                    return;
                }
                
                xhr.responseText = doc.body ? doc.body.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': opts.dataType};
                    return headers[header];
                };

                if (opts.dataType == 'json' || opts.dataType == 'script') {
                    var ta = doc.getElementsByTagName('textarea')[0];
                    xhr.responseText = ta ? ta.value : xhr.responseText;
                }
                else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                    xhr.responseXML = toXml(xhr.responseText);
                }
                data = $.httpData(xhr, opts.dataType);
            }
            catch(e){
                ok = false;
                $.handleError(opts, xhr, 'error', e);
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (ok) {
                opts.success(data, 'success');
                if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
            }
            if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
            if (g && ! --$.active) $.event.trigger("ajaxStop");
            if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

            // clean up
            setTimeout(function() {
                $io.remove();
                xhr.responseXML = null;
            }, 100);
        };

        function toXml(s, doc) {
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
        };
    };
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */ 
$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().bind('submit.form-plugin',function() {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function() {
        // store options in hash
        $(":submit,input:image", this).bind('click.form-plugin',function(e) {
            var $form = this.form;
            $form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    $form.clk_x = e.offsetX;
                    $form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $(this).offset();
                    $form.clk_x = e.pageX - offset.left;
                    $form.clk_y = e.pageY - offset.top;
                } else {
                    $form.clk_x = e.pageX - this.offsetLeft;
                    $form.clk_y = e.pageY - this.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function() { $form.clk = $form.clk_x = $form.clk_y = null; }, 10);
        });
    });
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    this.unbind('submit.form-plugin');
    return this.each(function() {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });

};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle them here
        var inputs = form.getElementsByTagName("input");
        for(var i=0, max=inputs.length; i < max; i++) {
            var input = inputs[i];
            var n = input.name;
            if(n && !input.disabled && input.type == "image" && form.clk == input)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                // extra pain for IE...
                var v = $.browser.msie && !(op.attributes['value'].specified) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) { 
    if (b == undefined) b = true;
    return this.each(function() { 
        this.disabled = !b 
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.select = function(select) {
    if (select == undefined) select = true;
    return this.each(function() { 
        var t = this.type;
        if (t == 'checkbox' || t == 'radio')
            this.checked = select;
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').select(false);
            }
            this.selected = select;
        }
    });
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
    if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
        window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.formhints.js ] ==== */
/***
@title:
Form Hints

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-09-16

@url:
http://andreaslagerkvist.com/jquery/form-hints/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Using this plug-in you can add a descriptive hint to any form-control you may have on your site.  
Add a hint by giving the form-control a title-attribute. The hint will disappear and reappear as the user clicks the control.

@howto:
jQuery(document.body).formHints(); would give every form-control with a title-attribute a hint.

Run the plug-in on a parent-element of the form-controls you want to affect. If you run it on document.body every form-control with a title-attribute will get a hint.

@exampleHTML:
<form method="post" action="">

	<p>
		<label>
			Dummy<br />
			<input type="text" name="dummy" title="E.G. Dummy" />
		</label>
	</p>

	<p><input type="submit" value="Ok" /></p>

</form>

@exampleJS:
// I'm not actually running it because my site already uses formHints
// jQuery('#jquery-form-hints-example').formHints();
***/
jQuery.fn.formHints = function (conf) {
	var config = jQuery.extend({
		formControls:	'input[title], textarea[title]',
		className:		'default-value'
	}, conf);

	return this.each(function () {
		jQuery(config.formControls, this).each(function () {
			var t = jQuery(this);

			t.formHint = t.attr('title');
			t.attr('title', '');

			if (t.val() === '' || t.val() == t.formHint) {
				t.addClass(config.className).val(t.formHint);
			}

			t.focus(function () {
				if (t.val() == t.formHint) {
					t.val('').removeClass(config.className);
				}
			});
			
			t.blur(function () {
				if (t.val() === '' || t.val() == t.formHint) {
					t.addClass(config.className).val(t.formHint);
				}
			});
		});

		// Remove hints on form submission
		jQuery('form', this).submit(function () {
			jQuery('.' + config.className, this).removeClass(config.className).val('');
		});
	});
};



/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.imageviewer.js ] ==== */
/***
@title:
TODO: Image Viewer

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/image-viewer/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.center.js

@does:
Makes links pointing to images open in the "Image Viewer". The Image Viewer centers on screen and displays all the other images in the same scope beneath the currently displayed image. Lorem ipsum dolor sit amet.

@howto:
jQuery('#holiday-photos, #flickr-images').imageViewer(); would create Image Viewer-albums from the two elements #holiday-photos and #flickr-images

@exampleHTML:
<ul>
	<li><a href="http://exscale.se/__files/3d/bloodcells.jpg">Bloodcells</a></li>
	<li><a href="http://exscale.se/__files/3d/x-wing.jpg">X-Wing</a></li>
	<li><a href="http://exscale.se/__files/3d/weve-moved.jpg">We've moved</a></li>
</ul>

<ul>
	<li><a href="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01.jpg"><img src="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01_small.jpg" alt="Lamp and Mates" /></a></li>
	<li><a href="http://exscale.se/__files/3d/stugan-winter.jpg"><img src="http://exscale.se/__files/3d/stugan-winter_small.jpg" alt="The Cottage - Winter time" /></a></li>
	<li><a href="http://exscale.se/__files/3d/ps2.jpg"><img src="http://exscale.se/__files/3d/ps2_small.jpg" alt="PS2" /></a></li>
</ul>

@exampleJS:
jQuery('#jquery-image-viewer-example ul').imageViewer();
***/


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.imagezoom.js ] ==== */
/***
@title:
Image Zoom

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/image-zoom/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.imageZoom.css, jquery.imageZoom.png

@does:
This plug-in makes links pointing to images open in the "Image Zoom". Clicking a link will zoom out the clicked image to its target-image. Click anywhere on the image or the close-button to zoom the image back in.

@howto:
jQuery(document.body).imageZoom(); Would make every link pointing to an image in the document open in the zoom.

@exampleHTML:
<ul>
	<li><a href="http://exscale.se/__files/3d/bloodcells.jpg">Bloodcells</a></li>
	<li><a href="http://exscale.se/__files/3d/x-wing.jpg">X-Wing</a></li>
	<li><a href="http://exscale.se/__files/3d/weve-moved.jpg">We've moved</a></li>
</ul>

<ul>
	<li><a href="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01.jpg"><img src="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01_small.jpg" alt="Lamp and Mates" /></a></li>
	<li><a href="http://exscale.se/__files/3d/stugan-winter.jpg"><img src="http://exscale.se/__files/3d/stugan-winter_small.jpg" alt="The Cottage - Winter time" /></a></li>
	<li><a href="http://exscale.se/__files/3d/ps2.jpg"><img src="http://exscale.se/__files/3d/ps2_small.jpg" alt="PS2" /></a></li>
</ul>

@exampleJS:
// I don't run it because my site already uses imgZoom
// jQuery(document.body).imageZoom();
***/
jQuery.fn.imageZoom = function (conf) {
	// Some config. If you set dontFadeIn: 0 and hideClicked: 0 imgzoom will act exactly like fancyzoom
	var config = jQuery.extend({
		speed:			200,	// Animation-speed of zoom
		dontFadeIn:		1,		// 1 = Do not fade in, 0 = Do fade in
		hideClicked:	1,		// Whether to hide the image that was clicked to bring up the imgzoom
		imageMargin:	30,		// Margin from image-edge to window-edge if image is larger than screen
		className:		'jquery-image-zoom', 
		loading:		'Loading...'
	}, conf);
	config.doubleSpeed = config.speed / 4; // Used for fading in the close-button

	return this.click(function(e) {
		// Make sure the target-element is a link (or an element inside a link)
		var clickedElement	= jQuery(e.target); // The element that was actually clicked
		var clickedLink		= clickedElement.is('a') ? clickedElement : clickedElement.parents('a'); // If it's not an a, check if any of its parents is
			clickedLink		= (clickedLink && clickedLink.is('a') && clickedLink.attr('href').search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)$/gi) != -1) ? clickedLink : false; // If it was an a or child of an a, make sure it points to an image
		var clickedImg		= (clickedLink && clickedLink.find('img').length) ? clickedLink.find('img') : false; // See if the clicked link contains and image

		// Only continue if a link pointing to an image was clicked
		if (clickedLink) {
			// These functions are used when the imaeg starts and stops loading (displays either 'loading..' or fades out the clicked img slightly)
			clickedLink.oldText	= clickedLink.text();

			clickedLink.setLoadingImg = function () {
				if (clickedImg) {
					clickedImg.css({opacity: '0.5'});
				}
				else {
					clickedLink.text(config.loading);
				}
			};

			clickedLink.setNotLoadingImg = function () {
				if (clickedImg) {
					clickedImg.css({opacity: '1'});
				}
				else {
					clickedLink.text(clickedLink.oldText);
				}
			};

			// The URI to the image we are going to display
			var displayImgSrc = clickedLink.attr('href');

			// If an imgzoom wiv this image is already open dont do nathin
			if (jQuery('div.' + config.className + ' img[src="' + displayImgSrc + '"]').length) {
				return false;
			}

			// This function is run once the displayImgSrc-img has loaded (below)
			var preloadOnload = function () {
				// The clicked-link is faded out during loading, fade it back in
				clickedLink.setNotLoadingImg();

				// Now set some vars we need
				var dimElement		= clickedImg ? clickedImg : clickedLink; // The element used to retrieve dimensions of imgzoom before zoom (either clicked link or img inside)
				var hideClicked		= clickedImg ? config.hideClicked : 0; // Whether to hide clicked link (set in config but always true for non-image-links)
				var offset			= dimElement.offset(); // Offset of clicked link (or image inside)
				var imgzoomBefore	= { // The dimensions of the imgzoom _before_ it is zoomed out
					width:		dimElement.outerWidth(), 
					height:		dimElement.outerHeight(), 
					left:		offset.left, 
					top:		offset.top/*, 
					opacity:	config.dontFadeIn*/
				};
				var imgzoom			= jQuery('<div><img src="' + displayImgSrc + '" alt="" /></div>').css('position', 'absolute').appendTo(document.body); // We don't want any class-name or any other contents part from the image when we calculate the new dimensions of the imgzoom
				var imgzoomAfter	= { // The dimensions of the imgzoom _after_ it is zoomed out
					width:		imgzoom.outerWidth(), 
					height:		imgzoom.outerHeight()/*, 
					opacity:	1*/
				};
				var windowDim = {
					width:	jQuery(window).width(), 
					height:	jQuery(window).height()
				};
				// Make sure imgzoom isn't wider than screen
				if (imgzoomAfter.width > (windowDim.width - config.imageMargin * 2)) {
					var nWidth			= windowDim.width - config.imageMargin * 2;
					imgzoomAfter.height	= (nWidth / imgzoomAfter.width) * imgzoomAfter.height;
					imgzoomAfter.width	= nWidth;
				}
				// Now make sure it isn't taller
				if (imgzoomAfter.height > (windowDim.height - config.imageMargin * 2)) {
					var nHeight			= windowDim.height - config.imageMargin * 2;
					imgzoomAfter.width	= (nHeight / imgzoomAfter.height) * imgzoomAfter.width;
					imgzoomAfter.height	= nHeight;
				}
				// Center imgzoom
				imgzoomAfter.left	= (windowDim.width - imgzoomAfter.width) / 2 + jQuery(window).scrollLeft();
				imgzoomAfter.top	= (windowDim.height - imgzoomAfter.height) / 2 + jQuery(window).scrollTop();
				var closeButton		= jQuery('<a href="#">Close</a>').appendTo(imgzoom).hide(); // The button that closes the imgzoom (we're adding this after the calculation of the dimensions)

				// Hide the clicked link if set so in config
				if (hideClicked) {
					clickedLink.css('visibility', 'hidden');
				}

				// Now animate the imgzoom from its small size to its large size, and then fade in the close-button
				imgzoom.addClass(config.className).css(imgzoomBefore).animate(imgzoomAfter, config.speed, function () {
					closeButton.fadeIn(config.doubleSpeed);
				});

				// This function closes the imgzoom
				var hideImgzoom = function () {
					closeButton.fadeOut(config.doubleSpeed, function () {
						imgzoom.animate(imgzoomBefore, config.speed, function () {
							clickedLink.css('visibility', 'visible');
							imgzoom.remove();
						});
					});

					return false;
				};

				// Close imgzoom when you click the closeButton or the imgzoom
				imgzoom.click(hideImgzoom);
				closeButton.click(hideImgzoom);
			};

			// Preload image
			var preload = new Image();
				preload.src = displayImgSrc;

			if (preload.complete) {
				preloadOnload();
			}
			else {
				clickedLink.setLoadingImg();
				preload.onload = preloadOnload;
			}

			// Finally return false from the click so the browser doesn't actually follow the link...
			return false;
		}
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.livesearch.js ] ==== */
/***
@title:
Live Search

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/live-search/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.liveSearch.css

@does:
Use this plug-in to turn a normal form-input in to a live ajax search widget. The plug-in displays any HTML you like in the results and the search-results are updated live as the user types.

@howto:
jQuery('#q').liveSearch({url: '/ajax/search.php?q='}); would add the live-search container next to the input#q element and fill it with the contents of /ajax/search.php?q=THE-INPUTS-VALUE onkeyup of the input.

@exampleHTML:
<form method="post" action="/search/">

	<p>
		<label>
			Enter search terms<br />
			<input type="text" name="q" />
		</label> <input type="submit" value="Go" />
	</p>

</form>

@exampleJS:
jQuery('#jquery-live-search-example input[name="q"]').liveSearch({url: WEBROOT +'?module=SearchResults&q='});
***/
jQuery.fn.liveSearch = function (conf) {
	var config = jQuery.extend({
		url:			'/?module=SearchResults&q=', 
		id:				'jquery-live-search', 
		duration:		400, 
		typeDelay:		200,
		loadingClass:	'loading', 
		onSlideUp:		function () {}
	}, conf);
	var liveSearch	= jQuery('#' + config.id);

	if (!liveSearch.length) {
		liveSearch = jQuery('<div id="' + config.id + '"></div>').appendTo(document.body).hide().slideUp(0);

		jQuery(document.body).click(function(event) {
			var clicked = jQuery(event.target);

			if (!(clicked.is('#' + config.id) || clicked.parents('#' + config.id).length || clicked.is('input'))) {
				liveSearch.slideUp(config.duration, function () {
					config.onSlideUp();
				});
			}
		});
	}

	return this.each(function () {
		var input		= jQuery(this).attr('autocomplete', 'off');
		var resultsShit	= parseInt(liveSearch.css('paddingLeft'), 10) + parseInt(liveSearch.css('paddingRight'), 10) + parseInt(liveSearch.css('borderLeftWidth'), 10) + parseInt(liveSearch.css('borderRightWidth'), 10);

		input
			.focus(function () {
				if (this.value !== '') {
					if (liveSearch.html() == '') {
						this.lastValue = '';
						input.keyup();
					}
					else {
						liveSearch.slideDown(config.duration);
					}
				}
			})
			.keyup(function () {
				if (this.value != this.lastValue) {
					input.addClass(config.loadingClass);

					var q = this.value;

					if (this.timer) {
						clearTimeout(this.timer);
					}

					this.timer = setTimeout(function () {
						jQuery.get(config.url + q, function (data) {
							input.removeClass(config.loadingClass);

							if (data.length && q.length) {
								var tmpOffset	= input.offset();
								var inputDim	= {
									left:		tmpOffset.left, 
									top:		tmpOffset.top, 
									width:		input.outerWidth(), 
									height:		input.outerHeight()
								};

								inputDim.topNHeight	= inputDim.top + inputDim.height;
								inputDim.widthNShit	= inputDim.width - resultsShit;

								liveSearch.css({
									position:	'absolute', 
									left:		inputDim.left + 'px', 
									top:		inputDim.topNHeight + 'px',
									width:		inputDim.widthNShit + 'px'
								});

								liveSearch.html(data).slideDown(config.duration);
							}
							else {
								liveSearch.slideUp(config.duration, function () {
									config.onSlideUp();
								});
							}
						});
					}, config.typeDelay);

					this.lastValue = this.value;
				}
			});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.livevalidation.js ] ==== */
/***
@title:
Live Validation

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/live-validation/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.liveValidation-valid.png, jquery.liveValidation-invalid.png

@does:
Use this plug-in to add live validation to any form on your page. The plug-in indicates whether a form control is valid or not by switching between any icons of you choosing as the user types.

@howto:
jQuery(document.body).liveValidation();

Run the plug-in on a parent-element of the form-controls you want to affect. If you run it on document.body every form-control in the document will get live validation.

@exampleHTML:
<form method="post" action="">

	<p>
		<label>
			Name<br />
			<input type="text" name="name" />
		</label>
	</p>

	<p>
		<label>
			Email<br />
			<input type="text" name="email" />
		</label>
	</p>

	<p>
		<label>
			Foo<br />
			<input type="text" name="foo" />
		</label>
	</p>

	<p>
		<label>
			Bar<br />
			<input type="text" name="bar" />
		</label>
	</p>

	<p><input type="submit" value="Ok" /></p>

</form>

@exampleJS:
jQuery('#jquery-live-validation-example').liveValidation({
	validIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-valid.png', 
	invalidIco: WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-invalid.png', 
	required:	['name', 'email', 'foo'], 
	fields:		{foo: /^\S.*$/}
});
***/
jQuery.fn.liveValidation = function (conf, addedFields) {
	var config = jQuery.extend({
		validIco:		'',													// src to valid icon
		invalidIco:		'',													// src to invalid ico
		valid:			'Valid',											// alt for valid icon
		invalid:		'Invalid',											// alt for invalid icon
		validClass:		'valid',											// valid class
		invalidClass:	'invalid',											// invalid class
		required:		[],													// json/array of required fields
		fields:			{}													// json of fields and regexps
	}, conf);

	var fields = jQuery.extend({
		name: 			/^\S.*$/,											// name (at least one character)
		title: 			/^\S.*$/,											// title (at least one character)
		author: 		/^\S.*$/,											// author (at least one character)
		message: 		/^\S.*$/,											// message (at least one character)
		comment: 		/^\S.*$/,											// comment (at least one character)
		content: 		/^\S.*$/,											// "content" (at least one character)
		description:	/^\S.*$/,											// description (at least one character)
		dimensions:		/^\d+x\d+$/,										// dimensions (DIGITxDIGIT)
		price:			/^\d+$/,											// price (at least one digit)
		url: 			/^(http:\/\/)?(www)?([^ |\.]*?)\.([^ ]){2,5}$/,		// url
		email: 			/^.+?@.+?\..{2,4}$/									// email
	}, config.fields);

	var formControls = config.required;

	if (!formControls.length) {
		return this;
	}

	for (var i in formControls) {
		formControls[i] = ':input[name=' + formControls[i] + ']';
	}

	formControls = formControls.join(',');

	return this.each(function () {
		jQuery(formControls, this).each(function () {
			var t = jQuery(this);

			if (t.is('.jquery-live-validation-on')) {
				return;
			}
			else {
				t.addClass('jquery-live-validation-on');
			}

			// Add invalid icon
			var validator = jQuery('<img src="' + config.invalidIco + '" alt="' + config.invalid + '" />').insertAfter(t.addClass(config.invalidClass));

			// This function is run now and on key up
			var validate = function () {
				var key = t.attr('name');
				var val = t.val();
				var tit = t.attr('title');

				// If value and title are the same it is assumed formHints is used
				// set value to empty so validation isn't done on the hint
				val = tit == val ? '' : val;

				// Make sure the value matches
				if (val.match(fields[key])) {
					// If it's not already valid
					if (validator.attr('alt') != config.valid) {
						validator.attr('src', config.validIco);
						validator.attr('alt', config.valid);
						t.removeClass(config.invalidClass).addClass(config.validClass);
					}
				}
				// It didn't validate
				else {
					// If it's not already invalid 
					if (validator.attr('alt') != config.invalid) {
						validator.attr('src', config.invalidIco);
						validator.attr('alt', config.invalid);
						t.removeClass(config.validClass).addClass(config.invalidClass);
					}
				}
			};

			validate();
			t.keyup(validate);
		});

		// If form contains any invalid icon on submission, return false
		jQuery('form', this).submit(function () {
			return !jQuery(this).find('img[alt="' + config.invalid + '"]').length;
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.maxlengthformcontrols.js ] ==== */
/***
@title:
Max Length Form Controls

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/max-length-form-controls/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Gives form-controls with a 'maxlength-XXX'-class a max-length and prohibits user from entering more than set amount. It also displays number of characters user has left next to the control.

@howto:
jQuery(document.body).maxLengthFormControls();

Run the plug-in on a parent-element of the form-controls.

@exampleHTML:
<p>
	<label>
		Dummy<br />
		<input type="text" name="dummy" class="maxlength-8" />
	</label>
</p>

@exampleJS:
// I already use it on my site...
// jQuery(document.body).maxLengthFormControls();
***/
jQuery.fn.maxLengthFormControls = function (conf) {
	var config = jQuery.extend({
		remainingStr:	'remaining', 
		className:		'characters-remaining'
	}, conf);

	return this.each(function () {
		jQuery('*[class*="maxlength-"]', this).each(function () {
			var t				= $(this);
			var maxLength		= parseInt(t.attr('class').replace(/.*?maxlength-([0-9]+)/, '$1'), 10);
			var remaining		= maxLength - t.val().length;
			var charRemaining	= jQuery('<span class="' + config.className + '">' + remaining + ' ' + config.remainingStr + '</span>').insertAfter(t);

			t.keyup(function () {
				if (t.val().length > maxLength) {
					t.val(t.val().substring(0, maxLength));
				}

				charRemaining.text((maxLength - t.val().length) + ' ' + config.remainingStr);
			});
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.numericdl.js ] ==== */
/***
@title:
Numeric DL

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/numeric-dl/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This tiny plug-in numbers definitions in a definition-list if there are more than one definition for a term. Can be useful for FAQs, actual lists of definitions etc.

@howto:
jQuery('#glossary dl').numericDL();

@exampleHTML:
<dl>
	<dt>Jug</dt>
	<dd>A small pitcher.</dd>
	<dd>Vulgar Slang. A woman's breasts.</dd>
	<dt>Bird</dt>
	<dd>The animal of the skies</dd>
</dl>

@exampleJS:
jQuery('#jquery-numeric-dl-example dl').numericDL();
***/
jQuery.fn.numericDL = function () {
	return this.each(function () {
		jQuery('dt', this).each(function () {
			var numDDs	= 0;
			var dt		= jQuery(this);
			var dd		= dt.next('dd');
			var i		= 1;

			while (dd.length) {
				dd = dd.next('dd');
				numDDs++;
			}

			if (numDDs > 1) {
				dd = dt.next('dd');

				while (dd.length) {
					dd.text('(' + i++ + ') ' + dd.text());
					dd = dd.next('dd');
				}
			}
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.pixasticeditor.js ] ==== */
/***
@title:
Pixastic Editor

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2009-04-18

@url:
http://andreaslagerkvist.com/jquery/pixastic-editor/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.pixasticEditor.css, jquery.form.js, pixastic.custom.js

@does:
This app/plug-in inserts a (completely stylable) toolbar next to any image in your document that allows the user to apply different [Pixastic](http://pixastic.com)-effects to the image.

@howto:
$('#my-image').pixasticEditor(); would insert the editor in the #my-image-element and affect an img-element within #my-image. Since it's not possible to append a list or div or any other element directly to an image, the plug-in should be run on a parent-element (preferably div) of the img-element. If you have a list of images you could run it on each li of the list.

@exampleHTML:
<img src="/~ante/afw/AndreasLagerkvist/Files/lamp-and-mates.jpg" alt="Lamp and Mates" />

@exampleJS:
$(function () {
	var img = $('#jquery-pixastic-editor-example').addClass('horizontal-toolbar horizontal-form').find('img')[0];

	if (img.complete) {
		$('#jquery-pixastic-editor-example').pixasticEditor();
	}
	else {
		img.onload = function () {
			$('#jquery-pixastic-editor-example').pixasticEditor();
		};
	}
});

$('#jquery-pixastic-editor-example').pixasticEditor();
***/
jQueryPixasticEditorOptions = {"blend":[{"key":"amount","title":"Amount","description":"Amount of the image to blend. Value between 0 and 1.","type":"float","min":"0","max":"1"},{"key":"mode","title":"Mode","description":"The blend mode. One of \"normal\", \"multiply\", \"lighten\", \"darken\", \"lightercolor\", \"darkercolor\", \"difference\", \"screen\", \"exclusion\", \"overlay\", \"softlight\", \"hardlight\", \"colordodge\", \"colorburn\", \"lineardodge\", \"linearburn\", \"linearlight\", \"vividlight\", \"pinlight\", \"hardmix\".","type":"string"},{"key":"image","title":"Image","description":"Image element to blend with original image.","type":"image"}],"blur":[{"key":"fixMargin","title":"FixMargin","description":"If true, the image marginLeft\/Top will be adjusted to compensate for IE making the image slightly larger. Defaults to true.","type":"bool","default":"true"}],"blurfast":[{"key":"amount","title":"Amount","description":"The strength of the blur effect. Value between 0 and 5.","type":"float","min":"0","max":"5"}],"brightness":[{"key":"brightness","title":"Brightness","description":"The brightness value used, -150 to 150.","type":"int","min":"-150","max":"150"},{"key":"contrast","title":"Contrast","description":"The contrast value, -1 to infinity, where a negative value decreases contrast, zero does nothing and positive values increase contrast.","type":"float"},{"key":"legacy","title":"Legacy","description":"If true, brightness will be adjusted the same way Photoshop used to prior to CS3 (now called \"Legacy\" in the B&amp;C dialog). This means the brightness value is simply added to the pixel value, in effect shifting the entire histogram left or right.","type":"bool"}],"coloradjust":[{"key":"red","title":"Red","description":"Amount to shift red, value from -1 to 1.","type":"float","min":"-1","max":"1"},{"key":"green","title":"Green","description":"Amount to shift green, value from -1 to 1.","type":"float","min":"-1","max":"1"},{"key":"blue","title":"Blue","description":"Amount to shift blue, value from -1 to 1.","type":"float","min":"-1","max":"1"}],"colorhistogram":[{"key":"paint","title":"Paint","description":"If true, the histograms will be painted on the image","type":"bool"},{"key":"returnValue","title":"ReturnValue","description":"An return value object which will hold the values (in the \"values\" property) of the histogram after execution.","type":"array"}],"crop":[],"desaturate":[{"key":"average","title":"Average","description":"If true, (R+G+B)\/3 will be used as the brigtness value","type":"bool"}],"edges":[{"key":"mono","title":"Mono","description":"Set to true to convert image to greyscale.","type":"bool"},{"key":"invert","title":"Invert","description":"Set to true to invert image.","type":"bool"}],"edges2":[],"emboss":[{"key":"strength","title":"Strength","description":"The strength of the effect. Value between 0 and 10.","type":"float","min":"0","max":"10"},{"key":"greyLevel","title":"GreyLevel","description":"The standard level of grey in the final image. A value between 0 and 255. Defaults to 180.","type":"int","min":"0","max":"255","default":"180"},{"key":"direction","title":"Direction","description":"The \"direction\" of the light source. One of \"topleft\", \"top\", \"topright\", \"right\", \"bottomright\", \"bottom\", \"bottomleft\" or \"left\".","type":"string"},{"key":"blend","title":"Blend","description":"If true, the embossed image will be blended with the original image rather than producing a greyscale image.","type":"bool"}],"exposure":[{"key":"level","title":"Level","description":"Exposure level, value from 0 to 10.","type":"float","min":"0","max":"10"}],"fliph":[],"flipv":[],"glow":[{"key":"amount","title":"Amount","description":"The strength of the glow effect. Value between 0 and 1.","type":"float","min":"0","max":"1"},{"key":"radius","title":"Radius","description":"The radius of the blur effect used to create the glow. Value between 0 and 1.","type":"float","min":"0","max":"1"}],"histogram":[{"key":"average","title":"Average","description":"How to convert RGB to greyscale, as explained in the <a href=\"Desaturate\">Desaturate<\/a> action.","type":"bool"},{"key":"paint","title":"Paint","description":"If true, the histogram will be painted on the image","type":"bool"},{"key":"color","title":"Color","description":"The color of the histogram that is drawn. Ie. \"rgb(255,255,255)\" for white.","type":"string"},{"key":"returnValue","title":"ReturnValue","description":"An return value object which will hold the values (in the \"values\" property) of the histogram after execution.","type":"array"}],"hsl":[{"key":"hue","title":"Hue","description":"Hue shift, -180 to 180","type":"int","min":"-180","max":"180"},{"key":"saturation","title":"Saturation","description":"Saturation, -100 to 100","type":"int","min":"-100","max":"100"},{"key":"lightness","title":"Lightness","description":"Lightness, -100 to 100","type":"int","min":"-100","max":"100"}],"invert":[],"laplace":[{"key":"greyLevel","title":"GreyLevel","description":"Level of grey added to image.","type":"int"},{"key":"edgeStrength","title":"EdgeStrength","description":"A positive value indicating the \"density\" of the edges.","type":"float"},{"key":"invert","title":"Invert","description":"Set to true to invert the final image.","type":"bool"}],"lighten":[{"key":"amount","title":"Amount","description":"The strength of the lighten\/darken effect. A value between -1 and 1, where positive values lighten the image and negative values darken the image.","type":"float","min":"-1","max":"1"}],"mosaic":[{"key":"blockSize","title":"BlockSize","description":"Size of the pixelated blocks, value greater than 1.","type":"int"}],"noise":[{"key":"amount","title":"Amount","description":"The amount of noise added to the image. Value between 0 and 1, ie. a value of 0.5 means that every other pixel is affected.","type":"float","min":"0","max":"1"},{"key":"strength","title":"Strength","description":"The strength of the noise. Value between 0 and 1.","type":"float","min":"0","max":"1"},{"key":"mono","title":"Mono","description":"Set to true to enable greyscale\/monochromatic noise.","type":"bool"}],"pointillize":[{"key":"radius","title":"Radius","description":"Radius of the points, value greater than 1.","type":"int"},{"key":"density","title":"Density","description":"Density of the points. Value from 0 to 5. A value of 1 gives a total of (width * height \/ diameter) points.","type":"float","min":"0","max":"5"},{"key":"noise","title":"Noise","description":"Noise in the distribution of the points, value equal to or greater than 0.","type":"float"},{"key":"transparent","title":"Transparent","description":"If true, the points will be painted on a transparent background, otherwise they are painted on top of the original image.","type":"bool"}],"posterize":[{"key":"levels","title":"Levels","description":"Number of levels, 0 to 255","type":"int","min":"0","max":"255"}],"removenoise":[],"sepia":[],"sharpen":[{"key":"amount","title":"Amount","description":"The amount of sharpening. Value between 0 and 1.","type":"float","min":"0","max":"1"}],"solarize":[],"unsharpmask":[{"key":"amount","title":"Amount","description":"The strength of the sharpening effect. Value between 0 and 500.","type":"float","min":"0","max":"500"},{"key":"radius","title":"Radius","description":"The radius of the blur effect used in the unsharp mask. Value between 0 and 5.","type":"float","min":"0","max":"5"},{"key":"threshold","title":"Threshold","description":"The threshold of the sharpening effect. Value between 0 and 255.","type":"float","min":"0","max":"255"}]};
jQuery.fn.pixasticEditor = function (conf, cb) {
	var c = typeof(conf) == 'object' ? conf : {};

	var config = jQuery.extend({
		className:			'jquery-pixastic-editor', 
		loadingClass:		'loading', 
		submitButtonText:	'Apply effect', 
		cancelButtonText:	'Cancel', 
		boolTrueText:		'True', 
		boolFalseText:		'False', 
		legendText:			'Settings for', 
		noOptionsText:		'No options required.', 
		previewWidth:		160, 
		previewHeight:		120, 
		fullPreview:		false, 
		ignoreEffects:		{}
	}, c);

	return this.each(function () {
		// First run
		if (!this.pixasticEditor) {
			var container	= jQuery(this).addClass(config.className);
			var image		= jQuery(this).find('img').addClass(config.className + '-image')[0];

			// Wrap the image in a container and run DragToSelect on it
			// - every effect can be applied to just a portion of the image
			if (jQuery.fn.dragToSelect) {
				jQuery(image).wrap('<div/>').parent().addClass(config.className + '-drag-to-select').dragToSelect({
					onHide: function (box) {
						if (box.width() < 2) {
							box.removeClass('fake-active');
						}
						else {
							box.addClass('fake-active');
						}
					}
				});
			}

			/**
			 * This element's pixastic editor
			 **/
			this.pixasticEditor = {
				image:		image, 
				canvas:		false, 
				toolbar:	false, 

				/**
				 * Initializes the editor
				 **/
				init: function () {
					this.buildToolbar();
					this.hijaxToolbar();
					this.clickToSave();
				}, 

				/**
				 * Allows user to click image to save it
				 **/
				clickToSave: function () {
					var self = this;

					container.click(function (e) {
						var clicked = jQuery(e.target);

						if (clicked.is('canvas.' + config.className + '-image')) {
							self.saveImage();
						}
					});
				}, 

				/**
				 * Builds the toolbar
				 **/
				buildToolbar: function () {
					var toolbar	= '<ul class="' + config.className + '-toolbar">';
					var tmp		= '';

					// Go through every action Pixastic offers
					for (var i in Pixastic.Actions) {
						tmp = i.charAt(0).toUpperCase() + i.substr(1); // ucfirst

						// Skip the ones the user wants to ignore
						if (typeof(config.ignoreEffects[i]) == 'undefined') {
							toolbar += '<li><a href="#" class="' 
											+ i 
											+'" title="'	// I normally wouldn't do this but we're
											+ tmp			// replacing all the links with icons so...
											+ '">' 
											+ tmp 
											+ '</a></li>';
						}
					}

					this.toolbar = jQuery(toolbar + '</ul>').appendTo(container);
				}, 

				/**
				 * Hijaxes the toolbar-links
				 **/
				hijaxToolbar: function () {
					var self = this;

					this.toolbar.click(function (e) {
						var clicked = jQuery(e.target);

						// Make sure a link was clicked
						if (clicked.is('a')) {
							// The effect-name is stored in the class-name
							var effect = clicked.attr('class');

							// Applies the effect to the image
							var doEffect = function (opts) {
								var o = opts || null;

								// Some effects take a while, add a loading-class
								clicked.addClass(config.loadingClass);

								// If drag to select is used, set the rect-option from its size
								if (container.find('div.jquery-drag-to-select.fake-active').length) {
									o.rect = self.getRectFromBox();
								}
								else {
									o.rect = self.getRectFromImage();
								}

								// Store the canvas for later use and run the effect on either previous canvas or image (first run)
								self.canvas = Pixastic.process(self.canvas || self.image, effect, o, function () {
									// When done, remove loading-class and rect
									clicked.removeClass(config.loadingClass);
									container.find('div.jquery-drag-to-select.fake-active').removeClass('fake-active');
								});
							};

							// Get the various options (if any) for this effect
							var opts = jQueryPixasticEditorOptions[effect];

							// Make sure options are required
							// No, always generate a form with preview, 
							// even if options aren't required
							// so that user gets to confirm effect
							if (true) { // (options.length) {
								var form = self.generateForm(opts, effect);

								self.insertLivePreview(form, effect);

								form
									.submit(function () {
										form.remove();
										jQuery('canvas.' + config.className + '-preview').remove();
										doEffect(self.formArrayToOptions(form.formToArray()));

										return false;
									})
									.find('input[type=reset]').click(function () {
										form.remove();
										jQuery('canvas.' + config.className + '-preview').remove();
									})
									.end()
									.find(':input:first').focus();
							}
							// No options required, do the effect right away
							else {
								doEffect();
							}

							return false;
						}
					});
				}, 

				/**
				 * Turns an array of form elements (returned from formToArray())
				 * into a valid pixastic options object
				 **/
				formArrayToOptions: function (formArray) {
					var opts = [];

					for (i = 0; formArray[i]; i++) {
						opts[formArray[i].name] = formArray[i].value;

						if (opts[formArray[i].name] === '0' || opts[formArray[i].name] === '1') {
							opts[formArray[i].name] = opts[formArray[i].name] === '0' ? false : true;
						}
					}

					return opts;
				}, 

				/**
				 * Returns a rect-object based on a drag to select div's dimensions
				 **/
				getRectFromBox: function () {
					var imageOffset	= container.find('div.' + config.className + '-drag-to-select').offset();
					var box			= container.find('div.jquery-drag-to-select')
					var boxOffset	= box.offset();

					return {
						left:	boxOffset.left - imageOffset.left, 
						top:	boxOffset.top - imageOffset.top, 
						width:	box.width(), 
						height:	box.height()
					};
				}, 

				/**
				 * Returns a rect-object based on the image's dimensions
				 **/
				getRectFromImage: function () {
					var img	= container.find('.' + config.className + '-image');

					return {
						left:	0, 
						top:	0, 
						width:	img.width(), 
						height:	img.height()
					};
				}, 

				/**
				 * Inserts a live preview into 'form'
				 **/
				insertLivePreview: function (form, effect) {
					var self = this;

					// Create new canvas and append to the form
					var previewCanvas	= document.createElement('canvas');
					var currentCanvas	= this.canvas || this.image;
					var previewWidth	= config.fullPreview ? currentCanvas.width : config.previewWidth;
					var previewHeight	= config.fullPreview ? currentCanvas.height : config.previewHeight;

					previewCanvas.width	= previewWidth;
					previewCanvas.height= previewHeight;

					if (config.fullPreview) {
						var currentCanvasOffset	= jQuery(currentCanvas).offset();

						jQuery(previewCanvas)
							.appendTo(document.body)
							.addClass(config.className + '-preview')
							.css({
								left:	currentCanvasOffset.left + 'px', 
								top:	currentCanvasOffset.top + 'px'
							});
					}
					else {
						jQuery(previewCanvas).insertAfter(form.find('legend'));
					}

					// This resets the preview, applies the effect and updates it
					var applyEffect = function () {
						// Update preview with original (no effect that wasn't in original)
						previewCanvas.getContext('2d').drawImage(currentCanvas, 0, 0, currentCanvas.width, currentCanvas.height, 0, 0, previewWidth, previewHeight);

						// Apply effect to (reset:ed) preview and store in temporary canvas
						var tmpCanvas = Pixastic.process(
							previewCanvas, 
							effect, 
							jQuery.extend(
								self.formArrayToOptions(form.formToArray()), {
									leaveDOM: true
								}
							)
						);

						// Draw temp canvas on preview
						previewCanvas.getContext('2d').drawImage(tmpCanvas, 0, 0, previewWidth, previewHeight);
					};

					// Apply effect now
					setTimeout(applyEffect, 1000);

					// And when form-field changes
					form.find(':input').change(function () {
						applyEffect();
					});
				}, 

				/**
				 * Generates a form (jQuery object with form-element)
				 * based on different options, appends it to body and returns it
				 **/
				generateForm: function (opts, effectName) {
					// Remove old form
					container.find('form.' + config.className + '-form').remove();

					// Build new
					var numOptions	= opts.length;
					var formItem	= '';
					var newFormItem	= false;
					var form		= jQuery(
										'<form method="post" action="" class="' 
										+ config.className 
										+ '-form"><fieldset><legend>' 
										+ config.legendText 
										+ ' ' 
										+ effectName 
										+ '</legend></fieldset></form>')
											.appendTo(container);

					for (var i = 0; i < numOptions; i++) {
						// Give bool-settings true/false radios
						if (opts[i].type == 'bool') {
							formItem	= '<p>'
										+ opts[i].title
										+ '<br /><small>' 
										+ opts[i].description 
										+ '</small><br /><label><input type="radio" name="' 
										+ opts[i].key 
										+ '" value="1"';

							// And preselect the correct one
							if (!opts[i]['default'] || opts[i]['default'] == 'true') {
								formItem += ' checked="checked"';
							}

							formItem	+= ' /> ' 
										+ config.boolTrueText 
										+ '</label> <label><input type="radio" name="' 
										+ opts[i].key 
										+ '" value="0"';

							if (opts[i]['default'] && opts[i]['default'] != 'true') {
								formItem += ' checked="checked"';
							}

							formItem	+= ' /> ' 
										+ config.boolFalseText 
										+ '</label></p>';
						}
						// Everything else gets text-fields
						else {
							formItem	= '<p><label>' 
										+ opts[i].title 
										+ '<br /><small>' 
										+ opts[i].description 
										+ '</small><br /><input type="text" name="' 
										+ opts[i].key 
										+ '"'; 

							// Set default value
							if (opts[i]['default']) {
								formItem+= ' value="' + opts[i]['default'] + '"';
							}
							else if (opts[i].min) {
								formItem += ' value="' + Math.round((parseInt(opts[i].min, 10) + parseInt(opts[i].max, 10)) / 2) + '"';
							}

							formItem	+= ' /></label></p>';
						}

						newFormItem = jQuery(formItem).appendTo(form.find('fieldset'));

						// If this option has a min/max-value and the
						// user has UI slider installed, create a slider
						if (opts[i].min && jQuery.fn.slider) {
							jQuery('<div class="' + config.className + '-slider"><div class="ui-slider"><div class="ui-slider-handle"></div></div></div>')
								.appendTo(newFormItem)
								.find('div.ui-slider')
								.slider({
									min:		parseInt(opts[i].min, 10), 
									max:		parseInt(opts[i].max, 10), 
									value:		parseInt(newFormItem.find(':input').val(), 10), 
								//	stepping:	options[i].type == 'float' ? 0.1 : 1, 
									slide:		function (e, ui) {
										jQuery(ui.handle)
											.parents('p')
											.eq(0)
												.find(':input')
													.val(ui.value);
									}, 
									change:		function (e, ui) {
										jQuery(ui.handle)
											.parents('p')
											.eq(0)
												.find(':input')
													.val(ui.value)
													.change(); // Only trigger change when user stops sliding
									}
								});

							// Update the slider when the input changes
							newFormItem.find(':input').keyup(function () {
								jQuery(this)
									.parents('p')
									.find('div.ui-slider')
									.slider('option', 'value', jQuery(this).val());
							});
						}
					}

					// If no options are required, say so
					if (numOptions == 0) {
						jQuery('<p>' + config.noOptionsText + '</p>').appendTo(form.find('fieldset'));
					}

					// Add submit and reset buttons last
					jQuery(
						'<p><input type="submit" value="' 
						+ config.submitButtonText 
						+ '" class="submit" /><input type="reset" value="' 
						+ config.cancelButtonText 
						+ '" class="reset" /></p>'
					).appendTo(form.find('fieldset'));

					return form;
				}, 

				/**
				 * "Saves" the image
				 **/
				saveImage: function (callback) {
					if (this.canvas) {
						var dataURL = this.canvas.toDataURL();

						if (typeof(callback) == 'function') {
							callback(dataURL);
						}
						else {
							window.open(dataURL);
						}
					}
				}
			};

			this.pixasticEditor.init();
		}
		// Save call
		else if (conf == 'save') {
			this.pixasticEditor.saveImage(cb);
		}
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.scrollto.js ] ==== */
/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 9/11/2008
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Tested with jQuery 1.2.6. On FF 2/3, IE 6/7, Opera 9.2/5 and Safari 3. on Windows.
 *
 * @author Ariel Flesler
 * @version 1.4
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'y',
		duration:1
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window).scrollable();
	};

	// Hack, hack, hack... stay away!
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn.scrollable = function(){
		return this.map(function(){
			// Just store it, we might need it
			var win = this.parentWindow || this.defaultView,
				// If it's a document, get its iframe or the window if it's THE document
				elem = this.nodeName == '#document' ? win.frameElement || win : this,
				// Get the corresponding document
				doc = elem.contentDocument || (elem.contentWindow || elem).document,
				isWin = elem.setInterval;

			return elem.nodeName == 'IFRAME' || isWin && $.browser.safari ? doc.body
				: isWin ? doc.documentElement
				: this;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this.scrollable().each(function(){
			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(px)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					Dim = axis == 'x' ? 'Width' : 'Height',
					dim = Dim.toLowerCase();

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[dim]() * settings.over[pos];
				}else
					attr[key] = targ[pos];

				// Number or 'number'
				if( /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max(Dim) );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});			
			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};
			function max( Dim ){
				var attr ='scroll'+Dim,
					doc = elem.ownerDocument;
				
				return win
						? Math.max( doc.documentElement[attr], doc.body[attr]  )
						: elem[attr];
			};
		}).end();
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.showpassword.js ] ==== */
/***
@title:
Show Password

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2009-03-11

@url:
http://andreaslagerkvist.com/jquery/show-password/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This little plug inserts a "View password"-checkbox next to inputs of type password that allows the user to toggle the password's visibility. When the checkbox is checked the password is displayed in plain text.

@howto:
jQuery('#my-form').showPassword(); would insert "password togglers" in every input[type=password] within #my-form.

@exampleHTML:
<input type="password" value="oioioi"/>

@exampleJS:
jQuery('#jquery-show-password-example').showPassword();
***/
jQuery.fn.showPassword = function (conf) {
	var config = $.extend({
		str:		'Show password', 
		className:	'password-toggler'
	}, conf);

	return this.each(function () {
		jQuery('input[type=password]', this).each(function () {
			var field		= jQuery(this);
			var fakeField	= jQuery('<input type="text" class="' + config.className + '" value="' + field.val() + '" />').insertAfter(field).hide(); // only IE really needs this
			var check		= jQuery('<label class="' + config.className + '"><input type="checkbox" /> ' + config.str + '</label>');
			var parentLabel	= field.parents('label');

			if (parentLabel.length) {
				check.insertAfter(parentLabel);
			}
			else {
				check.insertAfter(fakeField); // field
			}

			check.find('input').click(function() {
				if (jQuery(this).is(':checked')) {
				//	field.attr('type', 'text'); // strange, this threw errors
				//	field[0].type = 'text'; // and this doesn't work in IE
					field.hide();
					fakeField.val(field.val()).show();
				}
				else {
				//	field.attr('type', 'password');
				//	field[0].type = 'password';
					field.show();
					fakeField.hide();
				}
			});

			fakeField.change(function() {
				field.val(fakeField.val());
			});
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.supersimpletabs.js ] ==== */
/***
@title:
Super Simple Tabs

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2009-06-01

@url:
http://andreaslagerkvist.com/jquery/super-simple-tabs/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This is an extremely basic tabs-plugin which allows you to create tabbed content from the ever-so-common list of in-page-links. Atm the plug-in takes no configuration and simply hides/shows the content the links are pointing to as the user clicks.

@howto:
jQuery('ul.tabs').superSimpleTabs(); would make every ul with the class 'tabs' hide show the content its links are pointing to.

@exampleHTML:
<ul>
	<li><a href="#jquery-super-simple-tabs-example-1">Content 1</a></li>
	<li><a href="#jquery-super-simple-tabs-example-2">Content 2</a></li>
	<li><a href="#jquery-super-simple-tabs-example-3">Content 3</a></li>
</ul>
<div id="jquery-super-simple-tabs-example-1">
	Content 1
</div>
<div id="jquery-super-simple-tabs-example-2">
	Content 2
</div>
<div id="jquery-super-simple-tabs-example-3">
	Content 3
</div>

@exampleJS:
jQuery('#jquery-super-simple-tabs-example ul').superSimpleTabs();
***/
jQuery.fn.superSimpleTabs = function () {
	return this.each(function () {
		var ul = jQuery(this);

		// Go through all the in-page links in the ul
		ul.find('a[href^=#]').each(function (i) {
			var link = jQuery(this);

			// Hide all containers cept the first
			if (i) {
				jQuery(link.attr('href')).hide();
			}
			else {
				link.addClass('selected');
			}

			// When clicking link
			link.click(function () {
				// Hide selected link's containers
				jQuery(ul.find('a.selected').removeClass('selected').attr('href')).hide();

				// Show this one's
				jQuery(link.addClass('selected').attr('href')).show();

				return false;
			});
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.tagsizes.js ] ==== */
/***
@title:
Tag Sizes

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-11-20

@url:
http://andreaslagerkvist.com/jquery/tag-sizes/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Use this plug-in on a list of tags (li:s) and it will use whatever numbers found in the list to give each tag a corresponding size.

@howto:
jQuery('#tags').tagSizes('span'); would apply sizes too all li:s in #tags and look for numbers in a span element in each li.

@exampleHTML:
<ul>
	<li>Foo (3)</li>
	<li>Bar (12)</li>
	<li>Baz (5)</li>
</ul>

@exampleJS:
// No 'number element' passed in - the plug-in will look for numbers directly in the li:s
jQuery('#jquery-tag-sizes-example').tagSizes();
***/
jQuery.fn.tagSizes = function (numberElement, maxSize, minSize) {
	return this.each(function () {
		var maxSize		= maxSize || 24;
		var minSize		= minSize || parseInt(jQuery('li', this).css('font-size'), 10);
		var max			= 0;
		var min			= 10000;
		var slope;
		var middle;

		jQuery(this).find('li').each(function () {
			var numEl		= numberElement ? jQuery(this).find(numberElement) : jQuery(this);
			var weight		= parseInt(numEl.text().replace(/[^0-9]*/g, ''), 10) || 1;
			var logWeight	= Math.log(weight);

			jQuery.data(this, 'tagsizes', {
				logWeight:	logWeight, 
				weight:		weight
			});

			if (logWeight < min) {
				min = logWeight;
			}
			if (logWeight > max) {
				max = logWeight;
			}
		});

		if (max > min) {
			slope = (maxSize - minSize) / (max - min);
		}

		middle = (minSize + maxSize) / 2;

		jQuery(this).find('li').each(function () {
			var li		= jQuery(this);
			var data	= jQuery.data(this, 'tagsizes');

			if (max <= min) {
				li.css('font-size', middle + 'px');
			}
			else {
				var distance	= data.logWeight - min;
				var result		= slope * distance + minSize;

				if (result < minSize) {
					result = minSize;
				}
				if (result > maxSize) {
					result = maxSize;
				}

				li.css('font-size', result + 'px');
			}
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.textshadow.js ] ==== */
/***
@title:
Text Shadow

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-10-17

@url:
http://andreaslagerkvist.com/jquery/text-shadow/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.textShadow.css

@does:
Frankly a rather crappy text-shadow plug-in (can one be done well? :) but nevertheless it does the job in some cases.

@howto:
jQuery('h2').textShadow(); would give every h2 a shadow.

@exampleHTML:
<p>I should have a shadow.</p>

@exampleJS:
jQuery('#jquery-text-shadow-example p').textShadow();
***/
jQuery.fn.textShadow = function () {
	return this.each(function () {
		var el = $(this);

		el.html('<span class="jquery-text-shadow-text">' + el.html() + '</span>').css('position', 'relative');
		jQuery('<span class="jquery-text-shadow">' + el.text() + '</span>').appendTo(el);
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.togglabledl.js ] ==== */
/***
@title:
Togglable DL

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/togglable-dl/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Use this plug-in on your definition-lists (dl-elements) to allow the dd:s for a dt to be toggled when clicking the dt.

@howto:
jQuery('#faq dl').togglableDL(); would make every dl in #faq 'togglable'.

@exampleHTML:
<dl>
	<dt>Who are you?</dt>
	<dd>Me</dd>
	<dt>Where do you live?</dt>
	<dd>Here</dd>
</dl>

@exampleJS:
jQuery('#jquery-togglable-dl-example dl').togglableDL();
***/
jQuery.fn.togglableDL = function (conf) {
	var config = jQuery.extend({
		speed: 	100
	}, conf);

	return this.each(function () {
		var dds = jQuery('dd', this).slideUp(config.speed);

		jQuery('dt', this).each(function () {
			var dt = jQuery(this);

			dt.html('<a href="#">' + dt.html() + '</a>').find('a').toggle(function () {
				var isDT = false;

				dt.nextAll().each(function () {
					if (isDT || jQuery(this).is('dt')) {
						isDT = true;
						return;
					}

					jQuery(this).slideDown(config.speed);
				});
			}, 
			function () {
				var isDT = false;

				dt.nextAll().each(function () {
					if (isDT || jQuery(this).is('dt')) {
						isDT = true;
						return;
					}

					jQuery(this).slideUp(config.speed);
				});
			});
		});
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/jquery.vibrate.js ] ==== */
/***
@title:
Vibrate

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/vibrate/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This plug-in makes any element you want "vibrate" every now and then. Can be used in conjunction with blink for maximum annoyance!

@howto:
jQuery('#ad-area').vibrate(); would make #ad-area vibrate every now and then, options are available, please check the source.

Vibrate currently only works with elements positioned 'static'.

@exampleHTML:
I should vibrate every now and then

@exampleJS:
jQuery('#jquery-vibrate-example').vibrate();
***/
jQuery.fn.vibrate = function (conf) {
	var config = jQuery.extend({
		speed:		30, 
		duration:	2000, 
		frequency:	5000, 
		spread:		3
	}, conf);

	return this.each(function () {
		var t = jQuery(this);

		var vibrate = function () {
			var topPos	= Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
			var leftPos	= Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
			var rotate	= Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);

			t.css({
				position:			'relative', 
				left:				leftPos + 'px', 
				top:				topPos + 'px', 
				WebkitTransform:	'rotate(' + rotate + 'deg)'  // cheers to erik@birdy.nu for the rotation-idea
			});
		};

		var doVibration = function () {
			var vibrationInterval = setInterval(vibrate, config.speed);

			var stopVibration = function () {
				clearInterval(vibrationInterval);
				t.css({
					position:			'static', 
					WebkitTransform:	'rotate(0deg)'
				});
			};

			setTimeout(stopVibration, config.duration);
		};

		setInterval(doVibration, config.frequency);
	});
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/lang.js ] ==== */
var Lang = {
	lang: {}, 
	get: function (str) {
		return typeof(this.lang[str]) != 'undefined' ? this.lang[str] : '[' + str + ']';
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/base/pixastic.custom.js ] ==== */
/*
 * Pixastic Lib - Core Functions - v0.1.2
 * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

var Pixastic = (function() {


	function addEvent(el, event, handler) {
		if (el.addEventListener)
			el.addEventListener(event, handler, false); 
		else if (el.attachEvent)
			el.attachEvent("on" + event, handler); 
	}

	function onready(handler) {
		var handlerDone = false;
		var execHandler = function() {
			if (!handlerDone) {
				handlerDone = true;
				handler();
			}
		}
		document.write("<"+"script defer src=\"//:\" id=\"__onload_ie_sumbox__\"></"+"script>");
		var script = document.getElementById("__onload_ie_sumbox__");
		script.onreadystatechange = function() {
			if (script.readyState == "complete") {
				script.parentNode.removeChild(script);
				execHandler();
			}
		}
		if (document.addEventListener)
			document.addEventListener("DOMContentLoaded", execHandler, false); 
		addEvent(window, "load", execHandler);
	}

	function init() {
		if (!Pixastic.parseOnLoad) return;
		var imgEls = getElementsByClass("pixastic", null, "img");
		var canvasEls = getElementsByClass("pixastic", null, "canvas");
		var elements = imgEls.concat(canvasEls);
		for (var i=0;i<elements.length;i++) {
			(function() {

			var el = elements[i];
			var actions = [];
			var classes = el.className.split(" ");
			for (var c=0;c<classes.length;c++) {
				var cls = classes[c];
				if (cls.substring(0,9) == "pixastic-") {
					var actionName = cls.substring(9);
					if (actionName != "")
						actions.push(actionName);
				}
			}
			if (actions.length) {
				if (el.tagName.toLowerCase() == "img") {
					var dataImg = new Image();
					dataImg.src = el.src;
					if (dataImg.complete) {
						for (var a=0;a<actions.length;a++) {
							var res = Pixastic.applyAction(el, el, actions[a], null);
							if (res) 
								el = res;
						}
					} else {
						dataImg.onload = function() {
							for (var a=0;a<actions.length;a++) {
								var res = Pixastic.applyAction(el, el, actions[a], null)
								if (res) 
									el = res;
							}
						}
					}
				} else {
					setTimeout(function() {
						for (var a=0;a<actions.length;a++) {
							var res = Pixastic.applyAction(
								el, el, actions[a], null
							);
							if (res) 
								el = res;
						}
					},1);
				}
			}

			})();
		}
	}

	onready(init);

	// getElementsByClass by Dustin Diaz, http://www.dustindiaz.com/getelementsbyclass/
	function getElementsByClass(searchClass,node,tag) {
	        var classElements = new Array();
	        if ( node == null )
	                node = document;
	        if ( tag == null )
	                tag = '*';

	        var els = node.getElementsByTagName(tag);
	        var elsLen = els.length;
	        var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	        for (i = 0, j = 0; i < elsLen; i++) {
	                if ( pattern.test(els[i].className) ) {
	                        classElements[j] = els[i];
	                        j++;
	                }
	        }
	        return classElements;
	}

	var debugElement;

	function writeDebug(text, level) {
		if (!Pixastic.debug) return;
		try {
			switch (level) {
				case "warn" : 
					console.warn("Pixastic:", text);
					break;
				case "error" :
					console.error("Pixastic:", text);
					break;
				default:
					console.log("Pixastic:", text);
			}
		} catch(e) {
		}
		if (!debugElement) {
			
		}
	}


	return {

		parseOnLoad : false,

		debug : false,
		
		applyAction : function(img, dataImg, actionName, options) {

			options = options || {};

			var imageIsCanvas = (img.tagName.toLowerCase() == "canvas");
			if (imageIsCanvas && Pixastic.Client.isIE()) {
				if (Pixastic.debug) writeDebug("Tried to process a canvas element but browser is IE.");
				return false;
			}

			var canvas, ctx;
			if (Pixastic.Client.hasCanvas()) {
				canvas = document.createElement("canvas");
				ctx = canvas.getContext("2d");
			}

			var w = parseInt(img.offsetWidth);
			var h = parseInt(img.offsetHeight);

			if (actionName.indexOf("(") > -1) {
				var tmp = actionName;
				actionName = tmp.substr(0, tmp.indexOf("("));
				var arg = tmp.match(/\((.*?)\)/);
				if (arg[1]) {
					arg = arg[1].split(";");
					for (var a=0;a<arg.length;a++) {
						thisArg = arg[a].split("=");
						if (thisArg.length == 2) {
							if (thisArg[0] == "rect") {
								var rectVal = thisArg[1].split(",");
								options[thisArg[0]] = {
									left : parseInt(rectVal[0],10)||0,
									top : parseInt(rectVal[1],10)||0,
									width : parseInt(rectVal[2],10)||0,
									height : parseInt(rectVal[3],10)||0
								}
							} else {
								options[thisArg[0]] = thisArg[1];
							}
						}
					}
				}
			}

			if (!options.rect) {
				options.rect = {
					left : 0, top : 0, width : w, height : h
				};
			}
			var validAction = false;
			if (Pixastic.Actions[actionName] && typeof Pixastic.Actions[actionName].process == "function") {
				validAction = true;
			}
			if (!validAction) {
				if (Pixastic.debug) writeDebug("Invalid action \"" + actionName + "\". Maybe file not included?");
				return false;
			}
			if (!Pixastic.Actions[actionName].checkSupport()) {
				if (Pixastic.debug) writeDebug("Action \"" + actionName + "\" not supported by this browser.");
				return false;
			}

			if (Pixastic.Client.hasCanvas()) {
				canvas.width = w;
				canvas.height = h;
				canvas.style.width = w+"px";
				canvas.style.height = h+"px";
				ctx.drawImage(dataImg,0,0,w,h);

				if (!img.__pixastic_org_image) {
					canvas.__pixastic_org_image = img;
					canvas.__pixastic_org_width = w;
					canvas.__pixastic_org_height = h;
				} else {
					canvas.__pixastic_org_image = img.__pixastic_org_image;
					canvas.__pixastic_org_width = img.__pixastic_org_width;
					canvas.__pixastic_org_height = img.__pixastic_org_height;
				}

			} else if (Pixastic.Client.isIE() && typeof img.__pixastic_org_style == "undefined") {
				img.__pixastic_org_style = img.style.cssText;
			}

			var params = {
				image : img,
				canvas : canvas,
				width : w,
				height : h,
				useData : true,
				options : options
			}

			// Ok, let's do it!

			var res = Pixastic.Actions[actionName].process(params);

			if (!res) {
				return false;
			}

			if (Pixastic.Client.hasCanvas()) {
				if (params.useData) {
					if (Pixastic.Client.hasCanvasImageData()) {
						canvas.getContext("2d").putImageData(params.canvasData, options.rect.left, options.rect.top);

						// Opera doesn't seem to update the canvas until we draw something on it, lets draw a 0x0 rectangle.
						canvas.getContext("2d").fillRect(0,0,0,0);
					}
				}

				if (!options.leaveDOM) {
					// copy properties and stuff from the source image
					canvas.title = img.title;
					canvas.imgsrc = img.imgsrc;
					if (!imageIsCanvas) canvas.alt  = img.alt;
					if (!imageIsCanvas) canvas.imgsrc = img.src;
					canvas.className = img.className;
					canvas.style.cssText = img.style.cssText;
					canvas.name = img.name;
					canvas.tabIndex = img.tabIndex;
					canvas.id = img.id;
					if (img.parentNode && img.parentNode.replaceChild) {
						img.parentNode.replaceChild(canvas, img);
					}
				}

				options.resultCanvas = canvas;

				return canvas;
			}

			return img;
		},

		prepareData : function(params, getCopy) {
			var ctx = params.canvas.getContext("2d");
			var rect = params.options.rect;
			var dataDesc = ctx.getImageData(rect.left, rect.top, rect.width, rect.height);
			var data = dataDesc.data;
			if (!getCopy) params.canvasData = dataDesc;
			return data;
		},

		// load the image file
		process : function(img, actionName, options, callback)
		{
			if (img.tagName.toLowerCase() == "img") {
				var dataImg = new Image();
				dataImg.src = img.src;
				if (dataImg.complete) {
					var res = Pixastic.applyAction(img, dataImg, actionName, options);
					if (callback) callback(res);
					return res;
				} else {
					dataImg.onload = function() {
						var res = Pixastic.applyAction(img, dataImg, actionName, options)
						if (callback) callback(res);
					}
				}
			}
			if (img.tagName.toLowerCase() == "canvas") {
				var res = Pixastic.applyAction(img, img, actionName, options);
				if (callback) callback(res);
				return res;
			}
		},

		revert : function(img) {
			if (Pixastic.Client.hasCanvas()) {
				if (img.tagName.toLowerCase() == "canvas" && img.__pixastic_org_image) {
					img.width = img.__pixastic_org_width;
					img.height = img.__pixastic_org_height;
					img.getContext("2d").drawImage(img.__pixastic_org_image, 0, 0);

					if (img.parentNode && img.parentNode.replaceChild) {
						img.parentNode.replaceChild(img.__pixastic_org_image, img);
					}

					return img;
				}
			} else if (Pixastic.Client.isIE() && typeof img.__pixastic_org_style != "undefined") {
				img.style.cssText = img.__pixastic_org_style;
			}
		},

		Client : {
			hasCanvas : (function() {
				var c = document.createElement("canvas");
				var val = false;
				try {
					val = !!((typeof c.getContext == "function") && c.getContext("2d"));
				} catch(e) {}
				return function() {
					return val;
				}
			})(),

			hasCanvasImageData : (function() {
				var c = document.createElement("canvas");
				var val = false;
				var ctx;
				try {
					if (typeof c.getContext == "function" && (ctx = c.getContext("2d"))) {
						val = (typeof ctx.getImageData == "function");
					}
				} catch(e) {}
				return function() {
					return val;
				}
			})(),

			isIE : function() {
				return !!document.all && !!window.attachEvent && !window.opera;
			}
		},

		Actions : {}
	}


})();
/*
 * Pixastic Lib - Blend - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.blend = {

	process : function(params) {
		var amount = parseFloat(params.options.amount);
		var mode = (params.options.mode || "normal").toLowerCase();
		var image = params.options.image;

		amount = Math.max(0,Math.min(1,amount));

		if (!image) return false;

		if (Pixastic.Client.hasCanvasImageData()) {
			var rect = params.options.rect;
			var data = Pixastic.prepareData(params);
			var w = rect.width;
			var h = rect.height;

			params.useData = false;

			var otherCanvas = document.createElement("canvas");
			otherCanvas.width = params.canvas.width;
			otherCanvas.height = params.canvas.height;
			var otherCtx = otherCanvas.getContext("2d");
			otherCtx.drawImage(image,0,0);

			var params2 = {canvas:otherCanvas,options:params.options};
			var data2 = Pixastic.prepareData(params2);
			var dataDesc2 = params2.canvasData;

			var p = w*h;
			var pix = p*4;
			var pix1, pix2;
			var r1, g1, b1;
			var r2, g2, b2;
			var r3, g3, b3;
			var r4, g4, b4;

			var dataChanged = false;

			switch (mode) {
				case "normal" : 
					//while (p--) {
					//	data2[pix-=4] = data2[pix];
					//	data2[pix1=pix+1] = data2[pix1];
					//	data2[pix2=pix+2] = data2[pix2];
					//}
					break;

				case "multiply" : 
					while (p--) {
						data2[pix-=4] = data[pix] * data2[pix] / 255;
						data2[pix1=pix+1] = data[pix1] * data2[pix1] / 255;
						data2[pix2=pix+2] = data[pix2] * data2[pix2] / 255;
					}
					dataChanged = true;
					break;

				case "lighten" : 
					while (p--) {
						if ((r1 = data[pix-=4]) > data2[pix])
							data2[pix] = r1;
						if ((g1 = data[pix1=pix+1]) > data2[pix1])
							data2[pix1] = g1;
						if ((b1 = data[pix2=pix+2]) > data2[pix2])
							data2[pix2] = b1;
					}
					dataChanged = true;
					break;

				case "darken" : 
					while (p--) {
						if ((r1 = data[pix-=4]) < data2[pix])
							data2[pix] = r1;
						if ((g1 = data[pix1=pix+1]) < data2[pix1])
							data2[pix1] = g1;
						if ((b1 = data[pix2=pix+2]) < data2[pix2])
							data2[pix2] = b1;

					}
					dataChanged = true;
					break;

				case "darkercolor" : 
					while (p--) {
						if (((r1 = data[pix-=4])*0.3+(g1 = data[pix1=pix+1])*0.59+(b1 = data[pix2=pix+2])*0.11) <= (data2[pix]*0.3+data2[pix1]*0.59+data2[pix2]*0.11)) {
							data2[pix] = r1;
							data2[pix1] = g1;
							data2[pix2] = b1;
						}
					}
					dataChanged = true;
					break;

				case "lightercolor" : 
					while (p--) {
						if (((r1 = data[pix-=4])*0.3+(g1 = data[pix1=pix+1])*0.59+(b1 = data[pix2=pix+2])*0.11) > (data2[pix]*0.3+data2[pix1]*0.59+data2[pix2]*0.11)) {
							data2[pix] = r1;
							data2[pix1] = g1;
							data2[pix2] = b1;
						}
					}
					dataChanged = true;
					break;

				case "lineardodge" : 
					otherCtx.globalCompositeOperation = "source-over";
					otherCtx.drawImage(params.canvas, 0, 0);
					otherCtx.globalCompositeOperation = "lighter";
					otherCtx.drawImage(image, 0, 0);

					/*
					while (p--) {
						if ((r3 = data[pix-=4] + data2[pix]) > 255)
							data2[pix] = 255;
						else
							data2[pix] = r3;
						if ((g3 = data[pix1=pix+1] + data2[pix1]) > 255)
							data2[pix1] = 255;
						else
							data2[pix1] = g3;
						if ((b3 = data[pix2=pix+2] + data2[pix2]) > 255)
							data2[pix2] = 255;
						else
							data2[pix2] = b3;
					}
					dataChanged = true;
					*/

					break;

				case "linearburn" : 
					while (p--) {
						if ((r3 = data[pix-=4] + data2[pix]) < 255)
							data2[pix] = 0;
						else
							data2[pix] = (r3 - 255);
						if ((g3 = data[pix1=pix+1] + data2[pix1]) < 255)
							data2[pix1] = 0;
						else
							data2[pix1] = (g3 - 255);
						if ((b3 = data[pix2=pix+2] + data2[pix2]) < 255)
							data2[pix2] = 0;
						else
							data2[pix2] = (b3 - 255);
					}
					dataChanged = true;
					break;

				case "difference" : 
					while (p--) {
						if ((r3 = data[pix-=4] - data2[pix]) < 0)
							data2[pix] = -r3;
						else
							data2[pix] = r3;
						if ((g3 = data[pix1=pix+1] - data2[pix1]) < 0)
							data2[pix1] = -g3;
						else
							data2[pix1] = g3;
						if ((b3 = data[pix2=pix+2] - data2[pix2]) < 0)
							data2[pix2] = -b3;
						else
							data2[pix2] = b3;
					}
					dataChanged = true;
					break;

				case "screen" : 
					while (p--) {
						data2[pix-=4] = (255 - ( ((255-data2[pix])*(255-data[pix])) >> 8));
						data2[pix1=pix+1] = (255 - ( ((255-data2[pix1])*(255-data[pix1])) >> 8));
						data2[pix2=pix+2] = (255 - ( ((255-data2[pix2])*(255-data[pix2])) >> 8));
					}
					dataChanged = true;
					break;

				case "exclusion" : 
					var div_2_255 = 2 / 255;
					while (p--) {
						data2[pix-=4] = (r1 = data[pix]) - (r1 * div_2_255 - 1) * data2[pix];
						data2[pix1=pix+1] = (g1 = data[pix1]) - (g1 * div_2_255 - 1) * data2[pix1];
						data2[pix2=pix+2] = (b1 = data[pix2]) - (b1 * div_2_255 - 1) * data2[pix2];
					}
					dataChanged = true;
					break;

				case "overlay" : 
					var div_2_255 = 2 / 255;
					while (p--) {
						if ((r1 = data[pix-=4]) < 128)
							data2[pix] = data2[pix]*r1*div_2_255;
						else
							data2[pix] = 255 - (255-data2[pix])*(255-r1)*div_2_255;

						if ((g1 = data[pix1=pix+1]) < 128)
							data2[pix1] = data2[pix1]*g1*div_2_255;
						else
							data2[pix1] = 255 - (255-data2[pix1])*(255-g1)*div_2_255;

						if ((b1 = data[pix2=pix+2]) < 128)
							data2[pix2] = data2[pix2]*b1*div_2_255;
						else
							data2[pix2] = 255 - (255-data2[pix2])*(255-b1)*div_2_255;

					}
					dataChanged = true;
					break;

				case "softlight" : 
					var div_2_255 = 2 / 255;
					while (p--) {
						if ((r1 = data[pix-=4]) < 128)
							data2[pix] = ((data2[pix]>>1) + 64) * r1 * div_2_255;
						else
							data2[pix] = 255 - (191 - (data2[pix]>>1)) * (255-r1) * div_2_255;

						if ((g1 = data[pix1=pix+1]) < 128)
							data2[pix1] = ((data2[pix1]>>1)+64) * g1 * div_2_255;
						else
							data2[pix1] = 255 - (191 - (data2[pix1]>>1)) * (255-g1) * div_2_255;

						if ((b1 = data[pix2=pix+2]) < 128)
							data2[pix2] = ((data2[pix2]>>1)+64) * b1 * div_2_255;
						else
							data2[pix2] = 255 - (191 - (data2[pix2]>>1)) * (255-b1) * div_2_255;

					}
					dataChanged = true;
					break;

				case "hardlight" : 
					var div_2_255 = 2 / 255;
					while (p--) {
						if ((r2 = data2[pix-=4]) < 128)
							data2[pix] = data[pix] * r2 * div_2_255;
						else
							data2[pix] = 255 - (255-data[pix]) * (255-r2) * div_2_255;

						if ((g2 = data2[pix1=pix+1]) < 128)
							data2[pix1] = data[pix1] * g2 * div_2_255;
						else
							data2[pix1] = 255 - (255-data[pix1]) * (255-g2) * div_2_255;

						if ((b2 = data2[pix2=pix+2]) < 128)
							data2[pix2] = data[pix2] * b2 * div_2_255;
						else
							data2[pix2] = 255 - (255-data[pix2]) * (255-b2) * div_2_255;

					}
					dataChanged = true;
					break;

				case "colordodge" : 
					while (p--) {
						if ((r3 = (data[pix-=4]<<8)/(255-(r2 = data2[pix]))) > 255 || r2 == 255)
							data2[pix] = 255;
						else
							data2[pix] = r3;

						if ((g3 = (data[pix1=pix+1]<<8)/(255-(g2 = data2[pix1]))) > 255 || g2 == 255)
							data2[pix1] = 255;
						else
							data2[pix1] = g3;

						if ((b3 = (data[pix2=pix+2]<<8)/(255-(b2 = data2[pix2]))) > 255 || b2 == 255)
							data2[pix2] = 255;
						else
							data2[pix2] = b3;
					}
					dataChanged = true;
					break;

				case "colorburn" : 
					while (p--) {
						if ((r3 = 255-((255-data[pix-=4])<<8)/data2[pix]) < 0 || data2[pix] == 0)
							data2[pix] = 0;
						else
							data2[pix] = r3;

						if ((g3 = 255-((255-data[pix1=pix+1])<<8)/data2[pix1]) < 0 || data2[pix1] == 0)
							data2[pix1] = 0;
						else
							data2[pix1] = g3;

						if ((b3 = 255-((255-data[pix2=pix+2])<<8)/data2[pix2]) < 0 || data2[pix2] == 0)
							data2[pix2] = 0;
						else
							data2[pix2] = b3;
					}
					dataChanged = true;
					break;

				case "linearlight" : 
					while (p--) {
						if ( ((r3 = 2*(r2=data2[pix-=4])+data[pix]-256) < 0) || (r2 < 128 && r3 < 0)) {
							data2[pix] = 0
						} else {
							if (r3 > 255)
								data2[pix] = 255;
							else
								data2[pix] = r3;
						}
						if ( ((g3 = 2*(g2=data2[pix1=pix+1])+data[pix1]-256) < 0) || (g2 < 128 && g3 < 0)) {
							data2[pix1] = 0
						} else {
							if (g3 > 255)
								data2[pix1] = 255;
							else
								data2[pix1] = g3;
						}
						if ( ((b3 = 2*(b2=data2[pix2=pix+2])+data[pix2]-256) < 0) || (b2 < 128 && b3 < 0)) {
							data2[pix2] = 0
						} else {
							if (b3 > 255)
								data2[pix2] = 255;
							else
								data2[pix2] = b3;
						}
					}
					dataChanged = true;
					break;

				case "vividlight" : 
					while (p--) {
						if ((r2=data2[pix-=4]) < 128) {
							if (r2) {
								if ((r3 = 255 - ((255-data[pix])<<8) / (2*r2)) < 0) 
									data2[pix] = 0;
								else
									data2[pix] = r3
							} else {
								data2[pix] = 0;
							}
						} else if ((r3 = (r4=2*r2-256)) < 255) {
							if ((r3 = (data[pix]<<8)/(255-r4)) > 255) 
								data2[pix] = 255;
							else
								data2[pix] = r3;
						} else {
							if (r3 < 0) 
								data2[pix] = 0;
							else
								data2[pix] = r3
						}

						if ((g2=data2[pix1=pix+1]) < 128) {
							if (g2) {
								if ((g3 = 255 - ((255-data[pix1])<<8) / (2*g2)) < 0) 
									data2[pix1] = 0;
								else
									data2[pix1] = g3;
							} else {
								data2[pix1] = 0;
							}
						} else if ((g3 = (g4=2*g2-256)) < 255) {
							if ((g3 = (data[pix1]<<8)/(255-g4)) > 255)
								data2[pix1] = 255;
							else
								data2[pix1] = g3;
						} else {
							if (g3 < 0) 
								data2[pix1] = 0;
							else
								data2[pix1] = g3;
						}

						if ((b2=data2[pix2=pix+2]) < 128) {
							if (b2) {
								if ((b3 = 255 - ((255-data[pix2])<<8) / (2*b2)) < 0) 
									data2[pix2] = 0;
								else
									data2[pix2] = b3;
							} else {
								data2[pix2] = 0;
							}
						} else if ((b3 = (b4=2*b2-256)) < 255) {
							if ((b3 = (data[pix2]<<8)/(255-b4)) > 255) 
								data2[pix2] = 255;
							else
								data2[pix2] = b3;
						} else {
							if (b3 < 0) 
								data2[pix2] = 0;
							else
								data2[pix2] = b3;
						}
					}
					dataChanged = true;
					break;

				case "pinlight" : 
					while (p--) {
						if ((r2=data2[pix-=4]) < 128)
							if ((r1=data[pix]) < (r4=2*r2))
								data2[pix] = r1;
							else
								data2[pix] = r4;
						else
							if ((r1=data[pix]) > (r4=2*r2-256))
								data2[pix] = r1;
							else
								data2[pix] = r4;

						if ((g2=data2[pix1=pix+1]) < 128)
							if ((g1=data[pix1]) < (g4=2*g2))
								data2[pix1] = g1;
							else
								data2[pix1] = g4;
						else
							if ((g1=data[pix1]) > (g4=2*g2-256))
								data2[pix1] = g1;
							else
								data2[pix1] = g4;

						if ((r2=data2[pix2=pix+2]) < 128)
							if ((r1=data[pix2]) < (r4=2*r2))
								data2[pix2] = r1;
							else
								data2[pix2] = r4;
						else
							if ((r1=data[pix2]) > (r4=2*r2-256))
								data2[pix2] = r1;
							else
								data2[pix2] = r4;
					}
					dataChanged = true;
					break;

				case "hardmix" : 
					while (p--) {
						if ((r2 = data2[pix-=4]) < 128)
							if (255 - ((255-data[pix])<<8)/(2*r2) < 128 || r2 == 0)
								data2[pix] = 0;
							else
								data2[pix] = 255;
						else if ((r4=2*r2-256) < 255 && (data[pix]<<8)/(255-r4) < 128)
							data2[pix] = 0;
						else
							data2[pix] = 255;

						if ((g2 = data2[pix1=pix+1]) < 128)
							if (255 - ((255-data[pix1])<<8)/(2*g2) < 128 || g2 == 0)
								data2[pix1] = 0;
							else
								data2[pix1] = 255;
						else if ((g4=2*g2-256) < 255 && (data[pix1]<<8)/(255-g4) < 128)
							data2[pix1] = 0;
						else
							data2[pix1] = 255;

						if ((b2 = data2[pix2=pix+2]) < 128)
							if (255 - ((255-data[pix2])<<8)/(2*b2) < 128 || b2 == 0)
								data2[pix2] = 0;
							else
								data2[pix2] = 255;
						else if ((b4=2*b2-256) < 255 && (data[pix2]<<8)/(255-b4) < 128)
							data2[pix2] = 0;
						else
							data2[pix2] = 255;
					}
					dataChanged = true;
					break;
			}

			if (dataChanged) 
				otherCtx.putImageData(dataDesc2,0,0);

			var ctx = params.canvas.getContext("2d");
			ctx.save();
			ctx.globalAlpha = amount;
			ctx.drawImage(
				otherCanvas,
				0,0,rect.width,rect.height,
				rect.left,rect.top,rect.width,rect.height
			);
			ctx.globalAlpha = 1;
			ctx.restore();

			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}/*
 * Pixastic Lib - Blur filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.blur = {
	process : function(params) {

		if (typeof params.options.fixMargin == "undefined")
			params.options.fixMargin = true;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var dataCopy = Pixastic.prepareData(params, true)

			/*
			var kernel = [
				[0.5, 	1, 	0.5],
				[1, 	2, 	1],
				[0.5, 	1, 	0.5]
			];
			*/

			var kernel = [
				[0, 	1, 	0],
				[1, 	2, 	1],
				[0, 	1, 	0]
			];

			var weight = 0;
			for (var i=0;i<3;i++) {
				for (var j=0;j<3;j++) {
					weight += kernel[i][j];
				}
			}

			weight = 1 / (weight*2);

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;

				var prevY = (y == 1) ? 0 : y-2;
				var nextY = (y == h) ? y - 1 : y;

				var offsetYPrev = prevY*w*4;
				var offsetYNext = nextY*w*4;

				var x = w;
				do {
					var offset = offsetY + (x*4-4);

					var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x-2) * 4;
					var offsetNext = offsetYNext + ((x == w) ? x-1 : x) * 4;
	
					data[offset] = (
						/*
						dataCopy[offsetPrev - 4]
						+ dataCopy[offsetPrev+4] 
						+ dataCopy[offsetNext - 4]
						+ dataCopy[offsetNext+4]
						+ 
						*/
						(dataCopy[offsetPrev]
						+ dataCopy[offset-4]
						+ dataCopy[offset+4]
						+ dataCopy[offsetNext])		* 2
						+ dataCopy[offset] 		* 4
						) * weight;

					data[offset+1] = (
						/*
						dataCopy[offsetPrev - 3]
						+ dataCopy[offsetPrev+5] 
						+ dataCopy[offsetNext - 3] 
						+ dataCopy[offsetNext+5]
						+ 
						*/
						(dataCopy[offsetPrev+1]
						+ dataCopy[offset-3]
						+ dataCopy[offset+5]
						+ dataCopy[offsetNext+1])	* 2
						+ dataCopy[offset+1] 		* 4
						) * weight;

					data[offset+2] = (
						/*
						dataCopy[offsetPrev - 2] 
						+ dataCopy[offsetPrev+6] 
						+ dataCopy[offsetNext - 2] 
						+ dataCopy[offsetNext+6]
						+ 
						*/
						(dataCopy[offsetPrev+2]
						+ dataCopy[offset-2]
						+ dataCopy[offset+6]
						+ dataCopy[offsetNext+2])	* 2
						+ dataCopy[offset+2] 		* 4
						) * weight;

				} while (--x);
			} while (--y);

			return true;

		} else if (Pixastic.Client.isIE()) {
			params.image.style.filter += " progid:DXImageTransform.Microsoft.Blur(pixelradius=1.5)";

			if (params.options.fixMargin) {
				params.image.style.marginLeft = (parseInt(params.image.style.marginLeft,10)||0) - 2 + "px";
				params.image.style.marginTop = (parseInt(params.image.style.marginTop,10)||0) - 2 + "px";
			}

			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
	}
}/*
 * Pixastic Lib - Blur Fast - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.blurfast = {
	process : function(params) {

		var amount = parseFloat(params.options.amount)||0;

		amount = Math.max(0,Math.min(5,amount));

		if (Pixastic.Client.hasCanvas()) {
			var rect = params.options.rect;

			var ctx = params.canvas.getContext("2d");
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(rect.left,rect.top);
			ctx.lineTo(rect.left+rect.width,rect.top);
			ctx.lineTo(rect.left+rect.width,rect.top+rect.height);
			ctx.lineTo(rect.left,rect.top+rect.height);
			ctx.lineTo(rect.left,rect.top);
			ctx.closePath();
			ctx.clip();

			var scale = 2;
			var smallWidth = Math.round(params.width / scale);
			var smallHeight = Math.round(params.height / scale);

			var copy = document.createElement("canvas");
			copy.width = smallWidth;
			copy.height = smallHeight;

			var clear = true;
			var steps = Math.round(amount * 20);

			var copyCtx = copy.getContext("2d");
			for (var i=0;i<steps;i++) {
				var scaledWidth = Math.max(1,Math.round(smallWidth - i));
				var scaledHeight = Math.max(1,Math.round(smallHeight - i));
	
				copyCtx.clearRect(0,0,smallWidth,smallHeight);
	
				copyCtx.drawImage(
					params.canvas,
					0,0,params.width,params.height,
					0,0,scaledWidth,scaledHeight
				);
	
				if (clear)
					ctx.clearRect(rect.left,rect.top,rect.width,rect.height);
	
				ctx.drawImage(
					copy,
					0,0,scaledWidth,scaledHeight,
					0,0,params.width,params.height
				);
			}

			ctx.restore();

			params.useData = false;
			return true;
		} else if (Pixastic.Client.isIE()) {
			var radius = 10 * amount;
			params.image.style.filter += " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + radius + ")";

			if (params.options.fixMargin || 1) {
				params.image.style.marginLeft = (parseInt(params.image.style.marginLeft,10)||0) - Math.round(radius) + "px";
				params.image.style.marginTop = (parseInt(params.image.style.marginTop,10)||0) - Math.round(radius) + "px";
			}

			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
	}
}
/*
 * Pixastic Lib - Brightness/Contrast filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.brightness = {

	process : function(params) {

		var brightness = parseInt(params.options.brightness,10) || 0;
		var contrast = parseFloat(params.options.contrast)||0;
		var legacy = !!(params.options.legacy);

		if (legacy) {
			brightness = Math.min(150,Math.max(-150,brightness));
		} else {
			var brightMul = 1 + Math.min(150,Math.max(-150,brightness)) / 150;
		}
		contrast = Math.max(0,contrast+1);

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var p = w*h;
			var pix = p*4, pix1, pix2;

			var mul, add;
			if (contrast != 1) {
				if (legacy) {
					mul = contrast;
					add = (brightness - 128) * contrast + 128;
				} else {
					mul = brightMul * contrast;
					add = - contrast * 128 + 128;
				}
			} else {
				if (legacy) {
					mul = 1;
					add = brightness;
				} else {
					mul = brightMul;
					add = 0;
				}
			}
			var r, g, b;
			while (p--) {
				if ((r = data[pix-=4] * mul + add) > 255 )
					data[pix] = 255;
				else if (r < 0)
					data[pix] = 0;
				else
 					data[pix] = r;

				if ((g = data[pix1=pix+1] * mul + add) > 255 ) 
					data[pix1] = 255;
				else if (g < 0)
					data[pix1] = 0;
				else
					data[pix1] = g;

				if ((b = data[pix2=pix+2] * mul + add) > 255 ) 
					data[pix2] = 255;
				else if (b < 0)
					data[pix2] = 0;
				else
					data[pix2] = b;
			}
			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}

/*
 * Pixastic Lib - Color adjust filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.coloradjust = {

	process : function(params) {
		var red = parseFloat(params.options.red) || 0;
		var green = parseFloat(params.options.green) || 0;
		var blue = parseFloat(params.options.blue) || 0;

		red = Math.round(red*255);
		green = Math.round(green*255);
		blue = Math.round(blue*255);

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var rect = params.options.rect;

			var p = rect.width*rect.height;
			var pix = p*4, pix1, pix2;

			var r, g, b;
			while (p--) {
				pix -= 4;

				if (red) {
					if ((r = data[pix] + red) < 0 ) 
						data[pix] = 0;
					else if (r > 255 ) 
						data[pix] = 255;
					else
						data[pix] = r;
				}

				if (green) {
					if ((g = data[pix1=pix+1] + green) < 0 ) 
						data[pix1] = 0;
					else if (g > 255 ) 
						data[pix1] = 255;
					else
						data[pix1] = g;
				}

				if (blue) {
					if ((b = data[pix2=pix+2] + blue) < 0 ) 
						data[pix2] = 0;
					else if (b > 255 ) 
						data[pix2] = 255;
					else
						data[pix2] = b;
				}
			}
			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvasImageData());
	}
}
/*
* Pixastic Lib - Histogram - v0.1.0
* Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
* MIT License [http://www.opensource.org/licenses/mit-license.php]
*/


Pixastic.Actions.colorhistogram = {

	array256 : function(default_value) {
		arr = [];
		for (var i=0; i<256; i++) { arr[i] = default_value; }
		return arr
	},
 
	process : function(params) {
		var values = [];
		if (typeof params.options.returnValue != "object") {
			params.options.returnValue = {rvals:[], gvals:[], bvals:[]};
		}
		var paint = !!(params.options.paint);

		var returnValue = params.options.returnValue;
		if (typeof returnValue.values != "array") {
			returnValue.rvals = [];
			returnValue.gvals = [];
			returnValue.bvals = [];
		}
 
		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			params.useData = false;
 
			var rvals = this.array256(0);
			var gvals = this.array256(0);
			var bvals = this.array256(0);
 
			var rect = params.options.rect;

			var p = rect.width*rect.height;
			var pix = p*4;
			while (p--) {
				rvals[data[pix-=4]]++;
				gvals[data[pix+1]]++;
				bvals[data[pix+2]]++;
			}
 
			returnValue.rvals = rvals;
			returnValue.gvals = gvals;
			returnValue.bvals = bvals;

			if (paint) {
				var ctx = params.canvas.getContext("2d");
				var vals = [rvals, gvals, bvals];
				for (var v=0;v<3;v++) {
					var yoff = (v+1) * params.height / 3;
					var maxValue = 0;
					for (var i=0;i<256;i++) {
						if (vals[v][i] > maxValue)
							maxValue = vals[v][i];
					}
					var heightScale = params.height / 3 / maxValue;
					var widthScale = params.width / 256;
					if (v==0) ctx.fillStyle = "rgba(255,0,0,0.5)";
					else if (v==1) ctx.fillStyle = "rgba(0,255,0,0.5)";
					else if (v==2) ctx.fillStyle = "rgba(0,0,255,0.5)";
					for (var i=0;i<256;i++) {
						ctx.fillRect(
							i * widthScale, params.height - heightScale * vals[v][i] - params.height + yoff,
							widthScale, vals[v][i] * heightScale
						);
					}
				}
			}
			return true;
		}
	},

	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}/*
 * Pixastic Lib - Crop - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.crop = {
	process : function(params) {
		if (Pixastic.Client.hasCanvas()) {
			var rect = params.options.rect;

			var copy = document.createElement("canvas");
			copy.width = params.width;
			copy.height = params.height;
			copy.getContext("2d").drawImage(params.canvas,0,0);

			params.canvas.width = rect.width;
			params.canvas.height = rect.height;
			params.canvas.getContext("2d").clearRect(0,0,rect.width,rect.height);

			params.canvas.getContext("2d").drawImage(copy,
				rect.left,rect.top,rect.width,rect.height,
				0,0,rect.width,rect.height
			);

			params.useData = false;
			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvas();
	}
}


/*
 * Pixastic Lib - Desaturation filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.desaturate = {

	process : function(params) {
		var useAverage = !!params.options.average;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var p = w*h;
			var pix = p*4, pix1, pix2;

			if (useAverage) {
				while (p--) 
					data[pix-=4] = data[pix1=pix+1] = data[pix2=pix+2] = (data[pix]+data[pix1]+data[pix2])/3
			} else {
				while (p--)
					data[pix-=4] = data[pix1=pix+1] = data[pix2=pix+2] = (data[pix]*0.3 + data[pix1]*0.59 + data[pix2]*0.11);
			}
			return true;
		} else if (Pixastic.Client.isIE()) {
			params.image.style.filter += " gray";
			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
	}
}/*
 * Pixastic Lib - Edge detection filter - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.edges = {
	process : function(params) {

		var mono = !!(params.options.mono);

		var strength = 1.0;

		//if (typeof params.options.strength != "undefined")
		//	strength = parseFloat(params.options.strength)||0;

		var invert = !!(params.options.invert);

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var dataCopy = Pixastic.prepareData(params, true)

			var c = -strength/8;
			var kernel = [
				[c, 	c, 	c],
				[c, 	1, 	c],
				[c, 	c, 	c]
			];

			weight = 1/c;

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;

				var nextY = (y == h) ? y - 1 : y;
				var prevY = (y == 1) ? 0 : y-2;

				var offsetYPrev = prevY*w*4;
				var offsetYNext = nextY*w*4;

				var x = w;
				do {
					var offset = offsetY + (x*4-4);

					var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x-2) * 4;
					var offsetNext = offsetYNext + ((x == w) ? x-1 : x) * 4;
	
					var r = ((dataCopy[offsetPrev-4]
						+ dataCopy[offsetPrev]
						+ dataCopy[offsetPrev+4]
						+ dataCopy[offset-4]
						+ dataCopy[offset+4]
						+ dataCopy[offsetNext-4]
						+ dataCopy[offsetNext]
						+ dataCopy[offsetNext+4]) * c
						+ dataCopy[offset]
						) 
						* weight;
	
					var g = ((dataCopy[offsetPrev-3]
						+ dataCopy[offsetPrev+1]
						+ dataCopy[offsetPrev+5]
						+ dataCopy[offset-3]
						+ dataCopy[offset+5]
						+ dataCopy[offsetNext-3]
						+ dataCopy[offsetNext+1]
						+ dataCopy[offsetNext+5]) * c
						+ dataCopy[offset+1])
						* weight;
	
					var b = ((dataCopy[offsetPrev-2]
						+ dataCopy[offsetPrev+2]
						+ dataCopy[offsetPrev+6]
						+ dataCopy[offset-2]
						+ dataCopy[offset+6]
						+ dataCopy[offsetNext-2]
						+ dataCopy[offsetNext+2]
						+ dataCopy[offsetNext+6]) * c
						+ dataCopy[offset+2])
						* weight;

					if (mono) {
						var brightness = (r*0.3 + g*0.59 + b*0.11)||0;
						if (invert) brightness = 255 - brightness;
						if (brightness < 0 ) brightness = 0;
						if (brightness > 255 ) brightness = 255;
						r = g = b = brightness;
					} else {
						if (invert) {
							r = 255 - r;
							g = 255 - g;
							b = 255 - b;
						}
						if (r < 0 ) r = 0;
						if (g < 0 ) g = 0;
						if (b < 0 ) b = 0;
						if (r > 255 ) r = 255;
						if (g > 255 ) g = 255;
						if (b > 255 ) b = 255;
					}

					data[offset] = r;
					data[offset+1] = g;
					data[offset+2] = b;

				} while (--x);
			} while (--y);

			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}/*
 * Pixastic Lib - Edge detection 2 - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 * 
 * Contribution by Oliver Hunt (http://nerget.com/, http://nerget.com/canvas/edgeDetection.js). Thanks Oliver!
 *
 */

Pixastic.Actions.edges2 = {
	process : function(params) {

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var dataCopy = Pixastic.prepareData(params, true)

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var w4 = w * 4;
			var pixel = w4 + 4; // Start at (1,1)
			var hm1 = h - 1;
			var wm1 = w - 1;
			for (var y = 1; y < hm1; ++y) {
				// Prepare initial cached values for current row
				var centerRow = pixel - 4;
				var priorRow = centerRow - w4;
				var nextRow = centerRow + w4;
				
				var r1 = - dataCopy[priorRow]   - dataCopy[centerRow]   - dataCopy[nextRow];
				var g1 = - dataCopy[++priorRow] - dataCopy[++centerRow] - dataCopy[++nextRow];
				var b1 = - dataCopy[++priorRow] - dataCopy[++centerRow] - dataCopy[++nextRow];
				
				var rp = dataCopy[priorRow += 2];
				var gp = dataCopy[++priorRow];
				var bp = dataCopy[++priorRow];
				
				var rc = dataCopy[centerRow += 2];
				var gc = dataCopy[++centerRow];
				var bc = dataCopy[++centerRow];
				
				var rn = dataCopy[nextRow += 2];
				var gn = dataCopy[++nextRow];
				var bn = dataCopy[++nextRow];
				
				var r2 = - rp - rc - rn;
				var g2 = - gp - gc - gn;
				var b2 = - bp - bc - bn;
				
				// Main convolution loop
				for (var x = 1; x < wm1; ++x) {
					centerRow = pixel + 4;
					priorRow = centerRow - w4;
					nextRow = centerRow + w4;
					
					var r = 127 + r1 - rp - (rc * -8) - rn;
					var g = 127 + g1 - gp - (gc * -8) - gn;
					var b = 127 + b1 - bp - (bc * -8) - bn;
					
					r1 = r2;
					g1 = g2;
					b1 = b2;
					
					rp = dataCopy[  priorRow];
					gp = dataCopy[++priorRow];
					bp = dataCopy[++priorRow];
					
					rc = dataCopy[  centerRow];
					gc = dataCopy[++centerRow];
					bc = dataCopy[++centerRow];
					
					rn = dataCopy[  nextRow];
					gn = dataCopy[++nextRow];
					bn = dataCopy[++nextRow];
					
					r += (r2 = - rp - rc - rn);
					g += (g2 = - gp - gc - gn);
					b += (b2 = - bp - bc - bn);

					if (r > 255) r = 255;
					if (g > 255) g = 255;
					if (b > 255) b = 255;
					if (r < 0) r = 0;
					if (g < 0) g = 0;
					if (b < 0) b = 0;

					data[pixel] = r;
					data[++pixel] = g;
					data[++pixel] = b;
					//data[++pixel] = 255; // alpha

					pixel+=2;
				}
				pixel += 8;
			}
			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}/*
 * Pixastic Lib - Emboss filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.emboss = {
	process : function(params) {

		var strength = parseFloat(params.options.strength)||1;
		var greyLevel = typeof params.options.greyLevel != "undefined" ? parseInt(params.options.greyLevel) : 180;
		var direction = params.options.direction||"topleft";
		var blend = !!params.options.blend;

		var dirY = 0;
		var dirX = 0;

		switch (direction) {
			case "topleft":			// top left
				dirY = -1;
				dirX = -1;
				break;
			case "top":			// top
				dirY = -1;
				dirX = 0;
				break;
			case "topright":			// top right
				dirY = -1;
				dirX = 1;
				break;
			case "right":			// right
				dirY = 0;
				dirX = 1;
				break;
			case "bottomright":			// bottom right
				dirY = 1;
				dirX = 1;
				break;
			case "bottom":			// bottom
				dirY = 1;
				dirX = 0;
				break;
			case "bottomleft":			// bottom left
				dirY = 1;
				dirX = -1;
				break;
			case "left":			// left
				dirY = 0;
				dirX = -1;
				break;
		}

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var dataCopy = Pixastic.prepareData(params, true)

			var invertAlpha = !!params.options.invertAlpha;
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;

				var otherY = dirY;
				if (y + otherY < 1) otherY = 0;
				if (y + otherY > h) otherY = 0;

				var offsetYOther = (y-1+otherY)*w*4;

				var x = w;
				do {
						var offset = offsetY + (x-1)*4;

						var otherX = dirX;
						if (x + otherX < 1) otherX = 0;
						if (x + otherX > w) otherX = 0;

						var offsetOther = offsetYOther + (x-1+otherX)*4;

						var dR = dataCopy[offset] - dataCopy[offsetOther];
						var dG = dataCopy[offset+1] - dataCopy[offsetOther+1];
						var dB = dataCopy[offset+2] - dataCopy[offsetOther+2];

						var dif = dR;
						var absDif = dif > 0 ? dif : -dif;

						var absG = dG > 0 ? dG : -dG;
						var absB = dB > 0 ? dB : -dB;

						if (absG > absDif) {
							dif = dG;
						}
						if (absB > absDif) {
							dif = dB;
						}

						dif *= strength;

						if (blend) {
							var r = data[offset] + dif;
							var g = data[offset+1] + dif;
							var b = data[offset+2] + dif;

							data[offset] = (r > 255) ? 255 : (r < 0 ? 0 : r);
							data[offset+1] = (g > 255) ? 255 : (g < 0 ? 0 : g);
							data[offset+2] = (b > 255) ? 255 : (b < 0 ? 0 : b);
						} else {
							var grey = greyLevel - dif;
							if (grey < 0) {
								grey = 0;
							} else if (grey > 255) {
								grey = 255;
							}

							data[offset] = data[offset+1] = data[offset+2] = grey;
						}

				} while (--x);
			} while (--y);
			return true;

		} else if (Pixastic.Client.isIE()) {
			params.image.style.filter += " progid:DXImageTransform.Microsoft.emboss()";
			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
	}

}
/*
 * Pixastic Lib - Horizontal flip - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.fliph = {
	process : function(params) {
		if (Pixastic.Client.hasCanvas()) {
			var rect = params.options.rect;
			var copyCanvas = document.createElement("canvas");
			copyCanvas.width = rect.width;
			copyCanvas.height = rect.height;
			copyCanvas.getContext("2d").drawImage(params.image, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);

			var ctx = params.canvas.getContext("2d");
			ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
			ctx.scale(-1,1);
			ctx.drawImage(copyCanvas, -rect.left-rect.width, rect.top, rect.width, rect.height)
			params.useData = false;

			return true;		

		} else if (Pixastic.Client.isIE()) {
			params.image.style.filter += " fliph";
			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
	}
}

/*
 * Pixastic Lib - Vertical flip - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.flipv = {
	process : function(params) {
		if (Pixastic.Client.hasCanvas()) {
			var rect = params.options.rect;
			var copyCanvas = document.createElement("canvas");
			copyCanvas.width = rect.width;
			copyCanvas.height = rect.height;
			copyCanvas.getContext("2d").drawImage(params.image, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);

			var ctx = params.canvas.getContext("2d");
			ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
			ctx.scale(1,-1);
			ctx.drawImage(copyCanvas, rect.left, -rect.top-rect.height, rect.width, rect.height)
			params.useData = false;

			return true;		

		} else if (Pixastic.Client.isIE()) {
			params.image.style.filter += " flipv";
			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvas() || Pixastic.Client.isIE());
	}
}

/*
 * Pixastic Lib - Glow - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */


Pixastic.Actions.glow = {
	process : function(params) {

		var amount = (parseFloat(params.options.amount)||0);
		var blurAmount = parseFloat(params.options.radius)||0;

		amount = Math.min(1,Math.max(0,amount));
		blurAmount = Math.min(5,Math.max(0,blurAmount));

		if (Pixastic.Client.hasCanvasImageData()) {
			var rect = params.options.rect;

			var blurCanvas = document.createElement("canvas");
			blurCanvas.width = params.width;
			blurCanvas.height = params.height;
			var blurCtx = blurCanvas.getContext("2d");
			blurCtx.drawImage(params.canvas,0,0);

			var scale = 2;
			var smallWidth = Math.round(params.width / scale);
			var smallHeight = Math.round(params.height / scale);

			var copy = document.createElement("canvas");
			copy.width = smallWidth;
			copy.height = smallHeight;

			var clear = true;
			var steps = Math.round(blurAmount * 20);

			var copyCtx = copy.getContext("2d");
			for (var i=0;i<steps;i++) {
				var scaledWidth = Math.max(1,Math.round(smallWidth - i));
				var scaledHeight = Math.max(1,Math.round(smallHeight - i));
	
				copyCtx.clearRect(0,0,smallWidth,smallHeight);
	
				copyCtx.drawImage(
					blurCanvas,
					0,0,params.width,params.height,
					0,0,scaledWidth,scaledHeight
				);
	
				blurCtx.clearRect(0,0,params.width,params.height);
	
				blurCtx.drawImage(
					copy,
					0,0,scaledWidth,scaledHeight,
					0,0,params.width,params.height
				);
			}

			var data = Pixastic.prepareData(params);
			var blurData = Pixastic.prepareData({canvas:blurCanvas,options:params.options});
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x*4-4);

					var r = data[offset] + amount * blurData[offset];
					var g = data[offset+1] + amount * blurData[offset+1];
					var b = data[offset+2] + amount * blurData[offset+2];
	
					if (r > 255) r = 255;
					if (g > 255) g = 255;
					if (b > 255) b = 255;
					if (r < 0) r = 0;
					if (g < 0) g = 0;
					if (b < 0) b = 0;

					data[offset] = r;
					data[offset+1] = g;
					data[offset+2] = b;

				} while (--x);
			} while (--y);

			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}



/*
 * Pixastic Lib - Histogram - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.histogram = {
	process : function(params) {

		var average = !!(params.options.average);
		var paint = !!(params.options.paint);
		var color = params.options.color || "rgba(255,255,255,0.5)";
		var values = [];
		if (typeof params.options.returnValue != "object") {
			params.options.returnValue = {values:[]};
		}
		var returnValue = params.options.returnValue;
		if (typeof returnValue.values != "array") {
			returnValue.values = [];
		}
		values = returnValue.values;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			params.useData = false;

			for (var i=0;i<256;i++) {
				values[i] = 0;
			}

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x*4-4);
					var brightness = average ? 
						Math.round((data[offset]+data[offset+1]+data[offset+2])/3)
						: Math.round(data[offset]*0.3 + data[offset+1]*0.59 + data[offset+2]*0.11);
					values[brightness]++;

				} while (--x);
			} while (--y);

			if (paint) {
				var maxValue = 0;
				for (var i=0;i<256;i++) {
					if (values[i] > maxValue) {
						maxValue = values[i];
					}
				}
				var heightScale = params.height / maxValue;
				var widthScale = params.width / 256;
				var ctx = params.canvas.getContext("2d");
				ctx.fillStyle = color;
				for (var i=0;i<256;i++) {
					ctx.fillRect(
						i * widthScale, params.height - heightScale * values[i],
						widthScale, values[i] * heightScale
					);
				}
			}

			returnValue.values = values;

			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}
/*
 * Pixastic Lib - HSL Adjust  - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.hsl = {
	process : function(params) {

		var hue = parseInt(params.options.hue,10)||0;
		var saturation = (parseInt(params.options.saturation,10)||0) / 100;
		var lightness = (parseInt(params.options.lightness,10)||0) / 100;


		// this seems to give the same result as Photoshop
		if (saturation < 0) {
			var satMul = 1+saturation;
		} else {
			var satMul = 1+saturation*2;
		}

		hue = (hue%360) / 360;
		var hue6 = hue * 6;

		var rgbDiv = 1 / 255;

		var light255 = lightness * 255;
		var lightp1 = 1 + lightness;
		var lightm1 = 1 - lightness;
		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var w4 = w*4;
			var y = h;

			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x*4-4);

					var r = data[offset];
					var g = data[offset+1];
					var b = data[offset+2];

					if (hue != 0 || saturation != 0) {
						// ok, here comes rgb to hsl + adjust + hsl to rgb, all in one jumbled mess. 
						// It's not so pretty, but it's been optimized to get somewhat decent performance.
						// The transforms were originally adapted from the ones found in Graphics Gems, but have been heavily modified.
						var vs = r;
						if (g > vs) vs = g;
						if (b > vs) vs = b;
						var ms = r;
						if (g < ms) ms = g;
						if (b < ms) ms = b;
						var vm = (vs-ms);
						var l = (ms+vs)/255 * 0.5;
						if (l > 0) {
							if (vm > 0) {
								if (l <= 0.5) {
									var s = vm / (vs+ms) * satMul;
									if (s > 1) s = 1;
									var v = (l * (1+s));
								} else {
									var s = vm / (510-vs-ms) * satMul;
									if (s > 1) s = 1;
									var v = (l+s - l*s);
								}
								if (r == vs) {
									if (g == ms)
										var h = 5 + ((vs-b)/vm) + hue6;
									else
										var h = 1 - ((vs-g)/vm) + hue6;
								} else if (g == vs) {
									if (b == ms)
										var h = 1 + ((vs-r)/vm) + hue6;
									else
										var h = 3 - ((vs-b)/vm) + hue6;
								} else {
									if (r == ms)
										var h = 3 + ((vs-g)/vm) + hue6;
									else
										var h = 5 - ((vs-r)/vm) + hue6;
								}
								if (h < 0) h+=6;
								if (h >= 6) h-=6;
								var m = (l+l-v);
								var sextant = h>>0;
								switch (sextant) {
									case 0: r = v*255; g = (m+((v-m)*(h-sextant)))*255; b = m*255; break;
									case 1: r = (v-((v-m)*(h-sextant)))*255; g = v*255; b = m*255; break;
									case 2: r = m*255; g = v*255; b = (m+((v-m)*(h-sextant)))*255; break;
									case 3: r = m*255; g = (v-((v-m)*(h-sextant)))*255; b = v*255; break;
									case 4: r = (m+((v-m)*(h-sextant)))*255; g = m*255; b = v*255; break;
									case 5: r = v*255; g = m*255; b = (v-((v-m)*(h-sextant)))*255; break;
								}
							}
						}
					}

					if (lightness < 0) {
						r *= lightp1;
						g *= lightp1;
						b *= lightp1;
					} else if (lightness > 0) {
						r = r * lightm1 + light255;
						g = g * lightm1 + light255;
						b = b * lightm1 + light255;
					}

					if (r < 0) r = 0;
					if (g < 0) g = 0;
					if (b < 0) b = 0;
					if (r > 255) r = 255;
					if (g > 255) g = 255;
					if (b > 255) b = 255;

					data[offset] = r;
					data[offset+1] = g;
					data[offset+2] = b;

				} while (--x);
			} while (--y);
			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}

}
/*
 * Pixastic Lib - Invert filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.invert = {
	process : function(params) {
		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);

			var invertAlpha = !!params.options.invertAlpha;
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x-1)*4;
					data[offset] = 255 - data[offset];
					data[offset+1] = 255 - data[offset+1];
					data[offset+2] = 255 - data[offset+2];
					if (invertAlpha) data[offset+3] = 255 - data[offset+3];
				} while (--x);
			} while (--y);

			return true;
		} else if (Pixastic.Client.isIE()) {
			params.image.style.filter += " invert";
			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
	}
}
/*
 * Pixastic Lib - Laplace filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.laplace = {
	process : function(params) {

		var strength = 1.0;
		var invert = !!(params.options.invert);
		var contrast = parseFloat(params.options.edgeStrength)||0;

		var greyLevel = parseInt(params.options.greyLevel)||0;

		contrast = -contrast;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var dataCopy = Pixastic.prepareData(params, true)

			var kernel = [
				[-1, 	-1, 	-1],
				[-1, 	8, 	-1],
				[-1, 	-1, 	-1]
			];

			var weight = 1/8;

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;

				var nextY = (y == h) ? y - 1 : y;
				var prevY = (y == 1) ? 0 : y-2;

				var offsetYPrev = prevY*w*4;
				var offsetYNext = nextY*w*4;

				var x = w;
				do {
					var offset = offsetY + (x*4-4);

					var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x-2) * 4;
					var offsetNext = offsetYNext + ((x == w) ? x-1 : x) * 4;
	
					var r = ((-dataCopy[offsetPrev-4]
						- dataCopy[offsetPrev]
						- dataCopy[offsetPrev+4]
						- dataCopy[offset-4]
						- dataCopy[offset+4]
						- dataCopy[offsetNext-4]
						- dataCopy[offsetNext]
						- dataCopy[offsetNext+4])
						+ dataCopy[offset] * 8) 
						* weight;
	
					var g = ((-dataCopy[offsetPrev-3]
						- dataCopy[offsetPrev+1]
						- dataCopy[offsetPrev+5]
						- dataCopy[offset-3]
						- dataCopy[offset+5]
						- dataCopy[offsetNext-3]
						- dataCopy[offsetNext+1]
						- dataCopy[offsetNext+5])
						+ dataCopy[offset+1] * 8)
						* weight;
	
					var b = ((-dataCopy[offsetPrev-2]
						- dataCopy[offsetPrev+2]
						- dataCopy[offsetPrev+6]
						- dataCopy[offset-2]
						- dataCopy[offset+6]
						- dataCopy[offsetNext-2]
						- dataCopy[offsetNext+2]
						- dataCopy[offsetNext+6])
						+ dataCopy[offset+2] * 8)
						* weight;

					var brightness = ((r + g + b)/3) + greyLevel;

					if (contrast != 0) {
						if (brightness > 127) {
							brightness += ((brightness + 1) - 128) * contrast;
						} else if (brightness < 127) {
							brightness -= (brightness + 1) * contrast;
						}
					}
					if (invert) {
						brightness = 255 - brightness;
					}
					if (brightness < 0 ) brightness = 0;
					if (brightness > 255 ) brightness = 255;

					data[offset] = data[offset+1] = data[offset+2] = brightness;

				} while (--x);
			} while (--y);

			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}

/*
 * Pixastic Lib - Lighten filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.lighten = {

	process : function(params) {
		var amount = parseFloat(params.options.amount) || 0;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x-1)*4;

					var r = data[offset];
					var g = data[offset+1];
					var b = data[offset+2];

					r += r*amount;
					g += g*amount;
					b += b*amount;

					if (r < 0 ) r = 0;
					if (g < 0 ) g = 0;
					if (b < 0 ) b = 0;
					if (r > 255 ) r = 255;
					if (g > 255 ) g = 255;
					if (b > 255 ) b = 255;

					data[offset] = r;
					data[offset+1] = g;
					data[offset+2] = b;

				} while (--x);
			} while (--y);
			return true;

		} else if (Pixastic.Client.isIE()) {
			var img = params.image;
			if (amount < 0) {
				img.style.filter += " light()";
				img.filters[img.filters.length-1].addAmbient(
					255,255,255,
					100 * -amount
				);
			} else if (amount > 0) {
				img.style.filter += " light()";
				img.filters[img.filters.length-1].addAmbient(
					255,255,255,
					100
				);
				img.filters[img.filters.length-1].addAmbient(
					255,255,255,
					100 * amount
				);
			}
			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE());
	}
}
/*
 * Pixastic Lib - Mosaic filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.mosaic = {

	process : function(params) {
		var blockSize = Math.max(1,parseInt(params.options.blockSize,10));

		if (Pixastic.Client.hasCanvasImageData()) {
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;

			var ctx = params.canvas.getContext("2d");

			var pixel = document.createElement("canvas");
			pixel.width = pixel.height = 1;
			var pixelCtx = pixel.getContext("2d");

			var copy = document.createElement("canvas");
			copy.width = w;
			copy.height = h;
			var copyCtx = copy.getContext("2d");
			copyCtx.drawImage(params.canvas,rect.left,rect.top,w,h, 0,0,w,h);

			for (var y=0;y<h;y+=blockSize) {
				for (var x=0;x<w;x+=blockSize) {
					pixelCtx.drawImage(copy, x, y, blockSize, blockSize, 0, 0, 1, 1);
					var data = pixelCtx.getImageData(0,0,1,1).data;
					ctx.fillStyle = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";
					ctx.fillRect(rect.left + x, rect.top + y, blockSize, blockSize);
				}
			}

			params.useData = false;

			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvasImageData());
	}
}/*
 * Pixastic Lib - Noise filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.noise = {

	process : function(params) {
		var amount = 0;
		var strength = 0;
		var mono = false;

		if (typeof params.options.amount != "undefined")
			amount = parseFloat(params.options.amount)||0;
		if (typeof params.options.strength != "undefined")
			strength = parseFloat(params.options.strength)||0;
		if (typeof params.options.mono != "undefined")
			mono = !!(params.options.mono);

		amount = Math.max(0,Math.min(1,amount));
		strength = Math.max(0,Math.min(1,strength));

		var noise = 128 * strength;
		var noise2 = noise / 2;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;
			var random = Math.random;

			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x-1)*4;
					if (random() < amount) {
						if (mono) {
							var pixelNoise = - noise2 + random() * noise;
							var r = data[offset] + pixelNoise;
							var g = data[offset+1] + pixelNoise;
							var b = data[offset+2] + pixelNoise;
						} else {
							var r = data[offset] - noise2 + (random() * noise);
							var g = data[offset+1] - noise2 + (random() * noise);
							var b = data[offset+2] - noise2 + (random() * noise);
						}

						if (r < 0 ) r = 0;
						if (g < 0 ) g = 0;
						if (b < 0 ) b = 0;
						if (r > 255 ) r = 255;
						if (g > 255 ) g = 255;
						if (b > 255 ) b = 255;

						data[offset] = r;
						data[offset+1] = g;
						data[offset+2] = b;
					}
				} while (--x);
			} while (--y);
			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}

/*
 * Pixastic Lib - Posterize effect - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.posterize = {

	process : function(params) {

		
		var numLevels = 256;
		if (typeof params.options.levels != "undefined")
			numLevels = parseInt(params.options.levels,10)||1;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);

			numLevels = Math.max(2,Math.min(256,numLevels));
	
			var numAreas = 256 / numLevels;
			var numValues = 256 / (numLevels-1);

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x-1)*4;

					var r = numValues * ((data[offset] / numAreas)>>0);
					var g = numValues * ((data[offset+1] / numAreas)>>0);
					var b = numValues * ((data[offset+2] / numAreas)>>0);

					if (r > 255) r = 255;
					if (g > 255) g = 255;
					if (b > 255) b = 255;

					data[offset] = r;
					data[offset+1] = g;
					data[offset+2] = b;

				} while (--x);
			} while (--y);
			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}


/*
 * Pixastic Lib - Pointillize filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.pointillize = {

	process : function(params) {
		var radius = Math.max(1,parseInt(params.options.radius,10));
		var density = Math.min(5,Math.max(0,parseFloat(params.options.density)||0));
		var noise = Math.max(0,parseFloat(params.options.noise)||0);
		var transparent = !!params.options.transparent;

		if (Pixastic.Client.hasCanvasImageData()) {
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;

			var ctx = params.canvas.getContext("2d");

			var pixel = document.createElement("canvas");
			pixel.width = pixel.height = 1;
			var pixelCtx = pixel.getContext("2d");

			var copy = document.createElement("canvas");
			copy.width = w;
			copy.height = h;
			var copyCtx = copy.getContext("2d");
			copyCtx.drawImage(params.canvas,rect.left,rect.top,w,h, 0,0,w,h);

			var diameter = radius * 2;

			if (transparent)
				ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

			var noiseRadius = radius * noise;

			var dist = 1 / density;

			for (var y=0;y<h+radius;y+=diameter*dist) {
				for (var x=0;x<w+radius;x+=diameter*dist) {
					rndX = noise ? (x+((Math.random()*2-1) * noiseRadius))>>0 : x;
					rndY = noise ? (y+((Math.random()*2-1) * noiseRadius))>>0 : y;

					var pixX = rndX - radius;
					var pixY = rndY - radius;
					if (pixX < 0) pixX = 0;
					if (pixY < 0) pixY = 0;

					pixelCtx.drawImage(copy, pixX, pixY, diameter, diameter, 0, 0, 1, 1);
					var data = pixelCtx.getImageData(0,0,1,1).data;
					ctx.fillStyle = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";
					ctx.beginPath();
					ctx.arc(rect.left + rndX,rect.top + rndY, radius, 0, Math.PI*2, true);
					ctx.closePath();
					ctx.fill();
				}
			}

			params.useData = false;

			return true;
		}
	},
	checkSupport : function() {
		return (Pixastic.Client.hasCanvasImageData());
	}
}/*
 * Pixastic Lib - Remove noise - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.removenoise = {
	process : function(params) {

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;

				var nextY = (y == h) ? y - 1 : y;
				var prevY = (y == 1) ? 0 : y-2;

				var offsetYPrev = prevY*w*4;
				var offsetYNext = nextY*w*4;

				var x = w;
				do {
					var offset = offsetY + (x*4-4);

					var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x-2) * 4;
					var offsetNext = offsetYNext + ((x == w) ? x-1 : x) * 4;

					var minR, maxR, minG, maxG, minB, maxB;

					minR = maxR = data[offsetPrev];
					var r1 = data[offset-4], r2 = data[offset+4], r3 = data[offsetNext];
					if (r1 < minR) minR = r1;
					if (r2 < minR) minR = r2;
					if (r3 < minR) minR = r3;
					if (r1 > maxR) maxR = r1;
					if (r2 > maxR) maxR = r2;
					if (r3 > maxR) maxR = r3;

					minG = maxG = data[offsetPrev+1];
					var g1 = data[offset-3], g2 = data[offset+5], g3 = data[offsetNext+1];
					if (g1 < minG) minG = g1;
					if (g2 < minG) minG = g2;
					if (g3 < minG) minG = g3;
					if (g1 > maxG) maxG = g1;
					if (g2 > maxG) maxG = g2;
					if (g3 > maxG) maxG = g3;

					minB = maxB = data[offsetPrev+2];
					var b1 = data[offset-2], b2 = data[offset+6], b3 = data[offsetNext+2];
					if (b1 < minB) minB = b1;
					if (b2 < minB) minB = b2;
					if (b3 < minB) minB = b3;
					if (b1 > maxB) maxB = b1;
					if (b2 > maxB) maxB = b2;
					if (b3 > maxB) maxB = b3;

					if (data[offset] > maxR) {
						data[offset] = maxR;
					} else if (data[offset] < minR) {
						data[offset] = minR;
					}
					if (data[offset+1] > maxG) {
						data[offset+1] = maxG;
					} else if (data[offset+1] < minG) {
						data[offset+1] = minG;
					}
					if (data[offset+2] > maxB) {
						data[offset+2] = maxB;
					} else if (data[offset+2] < minB) {
						data[offset+2] = minB;
					}

				} while (--x);
			} while (--y);

			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}/*
 * Pixastic Lib - Sepia filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.sepia = {

	process : function(params) {
		var mode = (parseInt(params.options.mode,10)||0);
		if (mode < 0) mode = 0;
		if (mode > 1) mode = 1;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x-1)*4;

					if (mode) {
						// a bit faster, but not as good
						var d = data[offset] * 0.299 + data[offset+1] * 0.587 + data[offset+2] * 0.114;
						var r = (d + 39);
						var g = (d + 14);
						var b = (d - 36);
					} else {
						// Microsoft
						var or = data[offset];
						var og = data[offset+1];
						var ob = data[offset+2];
	
						var r = (or * 0.393 + og * 0.769 + ob * 0.189);
						var g = (or * 0.349 + og * 0.686 + ob * 0.168);
						var b = (or * 0.272 + og * 0.534 + ob * 0.131);
					}

					if (r < 0) r = 0; if (r > 255) r = 255;
					if (g < 0) g = 0; if (g > 255) g = 255;
					if (b < 0) b = 0; if (b > 255) b = 255;

					data[offset] = r;
					data[offset+1] = g;
					data[offset+2] = b;

				} while (--x);
			} while (--y);
			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}/*
 * Pixastic Lib - Sharpen filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

Pixastic.Actions.sharpen = {
	process : function(params) {

		var strength = 0;
		if (typeof params.options.amount != "undefined")
			strength = parseFloat(params.options.amount)||0;

		if (strength < 0) strength = 0;
		if (strength > 1) strength = 1;

		if (Pixastic.Client.hasCanvasImageData()) {
			var data = Pixastic.prepareData(params);
			var dataCopy = Pixastic.prepareData(params, true)

			var mul = 15;
			var mulOther = 1 + 3*strength;

			var kernel = [
				[0, 	-mulOther, 	0],
				[-mulOther, 	mul, 	-mulOther],
				[0, 	-mulOther, 	0]
			];

			var weight = 0;
			for (var i=0;i<3;i++) {
				for (var j=0;j<3;j++) {
					weight += kernel[i][j];
				}
			}

			weight = 1 / weight;

			var rect = params.options.rect;
			var w = rect.width;
			var h = rect.height;

			mul *= weight;
			mulOther *= weight;

			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;

				var nextY = (y == h) ? y - 1 : y;
				var prevY = (y == 1) ? 0 : y-2;

				var offsetYPrev = prevY*w4;
				var offsetYNext = nextY*w4;

				var x = w;
				do {
					var offset = offsetY + (x*4-4);

					var offsetPrev = offsetYPrev + ((x == 1) ? 0 : x-2) * 4;
					var offsetNext = offsetYNext + ((x == w) ? x-1 : x) * 4;

					var r = ((
						- dataCopy[offsetPrev]
						- dataCopy[offset-4]
						- dataCopy[offset+4]
						- dataCopy[offsetNext])		* mulOther
						+ dataCopy[offset] 	* mul
						);

					var g = ((
						- dataCopy[offsetPrev+1]
						- dataCopy[offset-3]
						- dataCopy[offset+5]
						- dataCopy[offsetNext+1])	* mulOther
						+ dataCopy[offset+1] 	* mul
						);

					var b = ((
						- dataCopy[offsetPrev+2]
						- dataCopy[offset-2]
						- dataCopy[offset+6]
						- dataCopy[offsetNext+2])	* mulOther
						+ dataCopy[offset+2] 	* mul
						);


					if (r < 0 ) r = 0;
					if (g < 0 ) g = 0;
					if (b < 0 ) b = 0;
					if (r > 255 ) r = 255;
					if (g > 255 ) g = 255;
					if (b > 255 ) b = 255;

					data[offset] = r;
					data[offset+1] = g;
					data[offset+2] = b;

				} while (--x);
			} while (--y);

			return true;

		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}
/*
 * Pixastic Lib - USM - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */


Pixastic.Actions.unsharpmask = {
	process : function(params) {

		var amount = (parseFloat(params.options.amount)||0);
		var blurAmount = parseFloat(params.options.radius)||0;
		var threshold = parseFloat(params.options.threshold)||0;

		amount = Math.min(500,Math.max(0,amount)) / 2;
		blurAmount = Math.min(5,Math.max(0,blurAmount)) / 10;
		threshold = Math.min(255,Math.max(0,threshold));

		threshold--;
		var thresholdNeg = -threshold;

		amount *= 0.016;
		amount++;

		if (Pixastic.Client.hasCanvasImageData()) {
			var rect = params.options.rect;

			var blurCanvas = document.createElement("canvas");
			blurCanvas.width = params.width;
			blurCanvas.height = params.height;
			var blurCtx = blurCanvas.getContext("2d");
			blurCtx.drawImage(params.canvas,0,0);

			var scale = 2;
			var smallWidth = Math.round(params.width / scale);
			var smallHeight = Math.round(params.height / scale);

			var copy = document.createElement("canvas");
			copy.width = smallWidth;
			copy.height = smallHeight;

			var steps = Math.round(blurAmount * 20);

			var copyCtx = copy.getContext("2d");
			for (var i=0;i<steps;i++) {
				var scaledWidth = Math.max(1,Math.round(smallWidth - i));
				var scaledHeight = Math.max(1,Math.round(smallHeight - i));

				copyCtx.clearRect(0,0,smallWidth,smallHeight);

				copyCtx.drawImage(
					blurCanvas,
					0,0,params.width,params.height,
					0,0,scaledWidth,scaledHeight
				);
	
				blurCtx.clearRect(0,0,params.width,params.height);
	
				blurCtx.drawImage(
					copy,
					0,0,scaledWidth,scaledHeight,
					0,0,params.width,params.height
				);
			}

			var data = Pixastic.prepareData(params);
			var blurData = Pixastic.prepareData({canvas:blurCanvas,options:params.options});
			var w = rect.width;
			var h = rect.height;
			var w4 = w*4;
			var y = h;
			do {
				var offsetY = (y-1)*w4;
				var x = w;
				do {
					var offset = offsetY + (x*4-4);

					var difR = data[offset] - blurData[offset];
					if (difR > threshold || difR < thresholdNeg) {
						var blurR = blurData[offset];
						blurR = amount * difR + blurR;
						data[offset] = blurR > 255 ? 255 : (blurR < 0 ? 0 : blurR);
					}

					var difG = data[offset+1] - blurData[offset+1];
					if (difG > threshold || difG < thresholdNeg) {
						var blurG = blurData[offset+1];
						blurG = amount * difG + blurG;
						data[offset+1] = blurG > 255 ? 255 : (blurG < 0 ? 0 : blurG);
					}

					var difB = data[offset+2] - blurData[offset+2];
					if (difB > threshold || difB < thresholdNeg) {
						var blurB = blurData[offset+2];
						blurB = amount * difB + blurB;
						data[offset+2] = blurB > 255 ? 255 : (blurB < 0 ? 0 : blurB);
					}

				} while (--x);
			} while (--y);

			return true;
		}
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvasImageData();
	}
}






/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/contact/contact.js ] ==== */
aFramework.modules.Contact = {
	run: function () {
		this.hijaxForm();
	}, 

	hijaxForm: function () {
		var contact = jQuery('#contact form');

		contact
			.liveValidation({
				validIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-valid.png', 
				invalidIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-invalid.png', 
				required:	['name', 'email']
			})
			.ajaxForm({
				url:		WEBROOT + '?module=Contact', 
				beforeSubmit: function () {
					if (!contact.find('img[alt=' + aFramework.jQueryLiveValidation.invalid + ']').length) {
						contact.find('input[type=submit]').val(Lang.get('Sending') + '...');

						return true;
					}

					return false;
				}, 
				success:	function (data) {
					jQuery('#contact').html(data);
					aFramework.modules.Contact.run();
				}
			});
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/live/live.js ] ==== */
aFramework.modules.Live = {
	run: function() {
		this.doToggleLink();
	}, 

	doToggleLink: function() {
		var show = Lang.get('Show live cam');
		var hide = Lang.get('Hide live cam');
		var live = jQuery('#live object');

		jQuery('<p><a href="#" id="live-toggler">' + show + '</a></p>').insertAfter('#live h2');
		live.hide();

		$('#live-toggler').toggle(function() {
			$(this).text(hide);
			live.show();
		}, function() {
			$(this).text(show);
			live.hide();
		});
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/moduleadmin/moduleadmin.js ] ==== */
aFramework.modules.ModuleAdmin = {
	run: function () {
		// Only run if admin
		if (jQuery('body.admin').length) {
			this.makeModulesDraggable();
			this.addRemoveButtonsToUsedModulesAndMakeDroppable();
		}
	}, 

	// Makes modules in module-admin, as well as module-admin itself, draggable
	makeModulesDraggable: function () {
		jQuery('#module-admin').draggable({
			handle:			'h2'
		});

		jQuery('#module-admin div').draggable({
			handle:			'h3',		
			revert:			'invalid', 
			revertDuration:	100, 
			opacity:		.5
		});
	}, 

	// Adds a [remove]-button to every module currently in use on the page
	// Also make them "droppable"
	addRemoveButtonsToUsedModulesAndMakeDroppable: function () {
		// Add remove-button to all modules in use and remove the module when you click it
		var addRemoveButton = function (module, moduleName, controllerInUse) {
			var info	= 'Remove module ' + moduleName + ' from controller ' + controllerInUse;
			var remove	= jQuery('<button title="' + info + '">X</button>').appendTo(module);

			// When you click the remove-button
			remove.click(function () {
				// Remove the in-use class from the module in the module-list so user can re-add it
				jQuery('#mod-' +module.attr('id')).removeClass('in-use');

				// See if module contained any children (look for remove-buttons), if so re-add them to list as-well
				module.find('div button[title^="Remove module "]').each(function() {
					jQuery('#mod-' + jQuery(this).parents('div').eq(0).attr('id')).removeClass('in-use');
				});

				// Remove the module-div from the page
				module.remove();

				// Ajax the change of the controller
				jQuery.post(WEBROOT + '?module=ModuleAdmin', {
					module_admin_remove_module:	1,
					module_to_remove:	moduleName, 
					controller_in_use:	controllerInUse
				});
			});
		};

		// Make every module droppable so you can drag modules from the list into other modules
		var makeDroppable = function (module, moduleName, controllerInUse) {
			var beforeClass = 'module-admin-insert-module-before';
			var appendClass = 'module-admin-append-module-to';

			module.droppable({
				accept:		'div[id]:not(#module-admin)', 
				tolerance:	'intersect', 
				greedy:		true, 
				// When a module is dragged over another
				over: function (ev, ui) {
					// Remove any existing markers
					jQuery('.' + beforeClass).removeClass(beforeClass);
					jQuery('.' + appendClass).removeClass(appendClass);

					// Get the position of the module
					var targetOffset = ui.element.offset();

					// If the module being dragged is above the module
					if (ui.absolutePosition.top < targetOffset.top) {
						module.addClass(beforeClass);
					}
					// It's inside
					else {
						module.addClass(appendClass);
					}
				}, 
				// When dragging out
				out: function () {
					// Remove any existing markers
					jQuery('.' + beforeClass).removeClass(beforeClass);
					jQuery('.' + appendClass).removeClass(appendClass);
				}, 
				// When dropping module
				drop: function (ev, ui) {
					var moduleToAdd		= ui.draggable.find('h3').text();
					var moduleToAddID	= ui.draggable.attr('id').replace(/^mod-/, '');
					var info			= 'Add ' + moduleToAdd + ' to ' + moduleName + ' in ' + controllerInUse;

					// Ajax the change of the controller
					var ajaxPostData = {
						module_admin_add_module:	1, 
						add_type:					jQuery('.' + beforeClass).length ? 'before' : 'append', 
						target:						moduleName, 
						module_to_add:				moduleToAdd, 
						controller_in_use:			controllerInUse
					};

					// Remove any existing markers
					jQuery('.' + beforeClass).removeClass(beforeClass);
					jQuery('.' + appendClass).removeClass(appendClass);

					// Hide the newly added module from the module-list
					ui.draggable.addClass('in-use').css({left: 0, top: 0});

					// Use the ghost-div for the new module
					var newMod = jQuery('<div id="' + moduleToAddID + '"><p>Loading...</p></div>');

					if (ajaxPostData.add_type == 'before') {
						newMod.insertBefore(module);
					}
					else {
						newMod.appendTo(module);
					}

					// Now fill the div with the module's stuff
					jQuery.get(WEBROOT + '?module=' + moduleToAdd, function (data) {
						newMod.html(data).addClass('module-admin-used-module');

						if (aFramework.modules[ajaxPostData.module_to_add] && typeof(aFramework.modules[ajaxPostData.module_to_add].run) == 'function') {
							aFramework.modules[ajaxPostData.module_to_add].run();
						}

						addRemoveButton(newMod, moduleToAdd, controllerInUse);
						makeDroppable(newMod, moduleToAdd, controllerInUse);
					});

					jQuery.post(WEBROOT + '?module=ModuleAdmin', ajaxPostData);
				}
			});
		};

		// We need to know the name of the controller for the ajax-calls
		var controllerInUse = jQuery('#module-admin input[name="controller_in_use"]').val();

		// Go through every module that is used in this controller
		jQuery('#module-admin select[name="target"]').eq(0).find('option').each(function () {
			var moduleID	= jQuery(this).attr('class');
			var module		= moduleID == 'base' ? jQuery(document.body) : jQuery('#' + moduleID);
			var moduleName	= jQuery(this).val();

			if (moduleName != 'Base' && moduleName.indexOf('Wrapper:') === -1) {
				addRemoveButton(module, moduleName, controllerInUse);
			}
			if (moduleName != 'Base') { // tmp...
				makeDroppable(module, moduleName, controllerInUse);
				module.addClass('module-admin-used-module');
			}
		});

		jQuery('#module-admin form').remove();
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/aframework/modules/search/search.js ] ==== */
aFramework.modules.Search = {
	run: function () {
		jQuery('#q').liveSearch({
			url: WEBROOT + '?module=SearchResults&q='
		});
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/ablog/modules/postcomment/postcomment.js ] ==== */
aFramework.modules.PostComment = {
	run: function () {
		this.liveValidation();
		this.hijaxForm();
	}, 

	liveValidation: function () {
		jQuery('#post-comment').liveValidation(jQuery.extend(aFramework.jQueryLiveValidation, {
			required: ['author', 'content']
		}));
	}, 

	hijaxForm: function () {
		var postComment = jQuery('#post-comment');

		postComment.find('form').ajaxForm({
			url: WEBROOT + '?module=PostComment', 
			beforeSubmit: function () {
				if (!postComment.find('img[alt=' + aFramework.jQueryLiveValidation.invalid + ']').length) {
					postComment.find('input[type=submit]').val(Lang.get('Posting') + '...');

					return true;
				}

				return false;
			}, 
			success: function (data) {
				jQuery.get(WEBROOT + '?module=Comments&articles_id=' + postComment.find('input[name=articles_id]').val(), function (newComments) {
					jQuery('#comments').html(newComments);
				//	aFramework.modules.Comments.run(); // doesn't have one as of yet
				});

				postComment.html(data);
				aFramework.modules.PostComment.run();
			}
		});
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/ablog/modules/randomlinks/randomlinks.js ] ==== */
aFramework.modules.RandomLinks = {
	run: function () {
		this.addFavicons();
		this.addRefreshLink();
	}, 

	addFavicons: function () {
		jQuery('#random-links').favicons({
			insert:		'insertAfter', 
			defaultIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.favicons.png'
		});
	}, 

	addRefreshLink: function () {
		jQuery('<p><a href="#">' + Lang.get('Get some new links') + '</a></p>')
			.appendTo('#random-links')
			.find('a')
			.click(function () {
				jQuery(this).text(Lang.get('Loading') + '...');

				jQuery('#random-links').load(WEBROOT + '?module=RandomLinks', function () {
					aFramework.modules.RandomLinks.run();
				});

				return false;
			});
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/ablog/modules/recentcomments/recentcomments.js ] ==== */
aFramework.modules.RecentComments = {
	run: function () {
		this.hijaxPrevNextLinks();
	}, 

	hijaxPrevNextLinks: function () {
		jQuery('#recent-comments ul a').click(function () {
			var clicked = jQuery(this);
			var oldText = clicked.text();

			clicked.text(Lang.get('Loading') + '...');

			jQuery.get(clicked.attr('href') + '&module=RecentComments', function (data) {
				if (data == '') {
					clicked.parent().html(oldText);
				}
				else {
					jQuery('#recent-comments').html(data);
					aFramework.modules.RecentComments.run();
				}
			});

			return false;
		});
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/ablog/modules/tagcloud/tagcloud.js ] ==== */
aFramework.modules.TagCloud = {
	run: function () {
		$('#tag-cloud').tagSizes('strong');
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/andreaslagerkvist/modules/jqueryplugin/jqueryplugin.js ] ==== */
aFramework.modules.JqueryPlugin = {
	run: function () {
		$('#jquery-plugin-example-and-code > ul').superSimpleTabs();
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/andreaslagerkvist/modules/randomjqueryplugins/randomjqueryplugins.js ] ==== */
aFramework.modules.RandomJqueryPlugins = {
	run: function () {
		this.hijaxMoreLink();
	}, 

	hijaxMoreLink: function () {
		jQuery('#random-jquery-plugins > p a').click(function () {
			jQuery(this).text(Lang.get('Loading') + '...');

			jQuery('#random-jquery-plugins').load(WEBROOT + '?module=RandomJqueryPlugins', function () {
				aFramework.modules.RandomJqueryPlugins.run();
			});

			return false;
		});
	}
};


/* ==== [ c:\server\www\myserver.dev\public_html\af/andreaslagerkvist/styles/darker/design.js ] ==== */
DarkerStyle = {
	run: function () {
		this.collapsableArticleByDateMonths();
		this.fadedFooter();
	//	this.postCommentHints();
	}, 

	fadedFooter: function () {
		jQuery('<div/>').attr('id', 'faded-footer').appendTo(document.body);
	}, 

	postCommentHints: function () {
		jQuery('#post-comment label').each(function () {
			jQuery(this).find('input').attr('title', jQuery(this).text()).end().text('');
		});
	}, 

	collapsableArticleByDateMonths: function () {
		jQuery('#articles-by-date h3').each(function () {
			var t	= jQuery(this);
			var a	= t.find('a');
			var ul	= t.nextAll('ul').eq(0).slideUp(0);

			a.click(function () {
				ul.slideToggle(500);
				return false;
			});
		});
	}
};

DarkerStyle.run();

/* We want some animation in search so we have to override the original search-module
aFramework.modules.Search = {
	run: function () {
		$('#q')
			.focus(function () {
				$(this).animate({
					width: '290px'
				}, 300);
			})
			.blur(function () {
				if (!$('#jquery-live-search').is(':visible')) {
					$(this).animate({
						width: '145px'
					}, 300);
				}
			})
			.liveSearch({
				url:		WEBROOT +'?module=SearchResults&q=', 
				duration:	300, 
				onSlideUp:	function () {
					$('#q').blur();
				}
			}
		);
	}
}; */
Lang.lang = {'Valid': 'Valid', 
'Invalid': 'Invalid', 
'Sending': 'Sending', 
'Show live cam': 'Show live cam', 
'Hide live cam': 'Hide live cam', 
'Posting': 'Posting', 
'Get some new links': 'Get some new links', 
'Loading': 'Loading', 
'Please Sign In': 'Please Sign In', 
'Wrong username or password.': 'Wrong username or password.', 
'Please try again.': 'Please try again.', 
'Username': 'Username', 
'Password': 'Password', 
'Remember me': 'Remember me', 
'Login': 'Login', 
'You are Logged In': 'You are Logged In', 
'What would you like to do?': 'What would you like to do?', 
'Log out': 'Log out', 
'Go to Home Page': 'Go to Home Page', 
'Contact': 'Contact', 
'Thanks': 'Thanks', 
'The form contains errors.': 'The form contains errors.', 
'Please make sure you have filled out everything correctly.': 'Please make sure you have filled out everything correctly.', 
'Your Name': 'Your Name', 
'E-mail': 'E-mail', 
'And Message': 'And Message', 
'Remember Me': 'Remember Me', 
'Send': 'Send', 
'Thank you.': 'Thank you.', 
'Copyright': 'Copyright', 
'All contents are released under a CCv3': 'All contents are released under a CCv3', 
'Some Rights Reserved.': 'Some Rights Reserved.', 
'is powered by': 'is powered by', 
'and': 'and', 
'seconds': 'seconds', 
'queries': 'queries', 
'cached': 'cached', 
'Top of Page': 'Top of Page', 
'Top': 'Top', 
'Contact Me': 'Contact Me', 
'Get Firefox!': 'Get Firefox!', 
'Valid XHTML 1.0 Strict': 'Valid XHTML 1.0 Strict', 
'(Mostly) Valid CSS': '(Mostly) Valid CSS', 
'Logout': 'Logout', 
'Home Page': 'Home Page', 
'Module admin': 'Module admin', 
'Remove module from controller': 'Remove module from controller', 
'Add to': 'Add to', 
'Or': 'Or', 
'Insert before': 'Insert before', 
'Search': 'Search', 
'Search Terms': 'Search Terms', 
'Find': 'Find', 
'Previous': 'Previous', 
'Next': 'Next', 
'No Query': 'No Query', 
'No Search Results for': 'No Search Results for', 
'Your search': 'Your search', 
'did not match any documents.': 'did not match any documents.', 
'Search Results for': 'Search Results for', 
'Results': 'Results', 
'of about': 'of about', 
'for': 'for', 
'Please Enter a Search Query': 'Please Enter a Search Query', 
'Suggestions': 'Suggestions', 
'Make sure all your words are spelled correctly': 'Make sure all your words are spelled correctly', 
'Try different keywords': 'Try different keywords', 
'Try more general keywords': 'Try more general keywords', 
'Happy hunting!': 'Happy hunting!', 
'Read more': 'Read more', 
'Skip to': 'Skip to', 
'Navigation': 'Navigation', 
'Bookmark this URL': 'Bookmark this URL', 
'Add this URL to your favourite bookmarking service.': 'Add this URL to your favourite bookmarking service.', 
'url.admin': 'admin', 
'url.contact': 'contact', 
'url.search': 'search', 
'Home': 'Home', 
'Add Page': 'Add Page', 
'Edit Page': 'Edit Page', 
'URL String': 'URL String', 
'Show in Navigation': 'Show in Navigation', 
'Yes': 'Yes', 
'No': 'No', 
'Priority': 'Priority', 
'A lower number places page early in the list': 'A lower number places page early in the list', 
'Page Title': 'Page Title', 
'Meta Description': 'Meta Description', 
'Meta Keywords': 'Meta Keywords', 
'Page Content': 'Page Content', 
'Save Changes': 'Save Changes', 
'or': 'or', 
'Delete this Page': 'Delete this Page', 
'Add a page': 'Add a page', 
'url.add-page': 'add-page', 
'Published': 'Published', 
'Tags': 'Tags', 
'No tags': 'No tags', 
'Comments': 'Comments', 
'No comments': 'No comments', 
'The article was successfully saved!': 'The article was successfully saved!', 
'The article was successfully deleted!': 'The article was successfully deleted!', 
'Title': 'Title', 
'Publish Date': 'Publish Date', 
'Article Content': 'Article Content', 
'Allow Comments': 'Allow Comments', 
'Allow Rating': 'Allow Rating', 
'Add Article': 'Add Article', 
'Delete this Article': 'Delete this Article', 
'Add an article': 'Add an article', 
'Edit Article': 'Edit Article', 
'Join': 'Join', 
'others and': 'others and', 
'Be the first to': 'Be the first to', 
'post a comment': 'post a comment', 
'Articles Tagged with': 'Articles Tagged with', 
'You are currently browsing': 'You are currently browsing', 
'articles tagged with': 'articles tagged with', 
'Archives for': 'Archives for', 
'articles posted in': 'articles posted in', 
'articles posted on': 'articles posted on', 
'The Latest Articles': 'The Latest Articles', 
'Continue reading': 'Continue reading', 
'Articles by Date': 'Articles by Date', 
'No comments yet, why not': 'No comments yet, why not', 
'be the first to post one': 'be the first to post one', 
'Older Articles': 'Older Articles', 
'Post a Comment': 'Post a Comment', 
'Website': 'Website', 
'And Comment': 'And Comment', 
'Post Comment': 'Post Comment', 
'Newer': 'Newer', 
'Older': 'Older', 
'Say This': 'Say This', 
'Post It': 'Post It', 
'From': 'From', 
'to': 'to', 
'Delete': 'Delete', 
'Add a Link': 'Add a Link', 
'Description': 'Description', 
'URL': 'URL', 
'Add': 'Add', 
'Random Links': 'Random Links', 
'Recent Comments': 'Recent Comments', 
'on': 'on', 
'Bookmark this Article': 'Bookmark this Article', 
'Tag Cloud': 'Tag Cloud', 
'url.archives': 'archives', 
'Send Us a Letter': 'Send Us a Letter', 
'Write something in the form below.': 'Write something in the form below.', 
'I will get back to you as soon as possible.': 'I will get back to you as soon as possible.', 
'Created': 'Created', 
'by': 'by', 
'What it Does': 'What it Does', 
'How to Use': 'How to Use', 
'Example': 'Example', 
'Example Code': 'Example Code', 
'Plug-in Code': 'Plug-in Code', 
'Source Code': 'Source Code', 
'Download': 'Download', 
'Plug-in': 'Plug-in', 
'Unpacked': 'Unpacked', 
'Minified': 'Minified', 
'Requires': 'Requires', 
'Other Resources': 'Other Resources', 
'Author': 'Author', 
'Version': 'Version', 
'Zip': 'Zip', 
'Details': 'Details', 
'Archives': 'Archives', 
'Jquery': 'Jquery', 
'Slightly Older Articles': 'Slightly Older Articles', 
'More Plug-ins': 'More Plug-ins', 
'Random jQuery Plug-ins': 'Random jQuery Plug-ins'

};