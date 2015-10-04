(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],2:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],3:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = require('jquery');

var Api = (function () {
    function Api() {
        _classCallCheck(this, Api);
    }

    _createClass(Api, [{
        key: 'get',

        /**
         * GET call
         * @param  {string} url The request url
         * @return {object}     Promise containing the response
         */
        value: function get(url) {
            return new Promise(function (resolve, reject) {
                $.get(url, function (ret) {
                    resolve(ret);
                }).fail(function (err) {
                    reject(err);
                });
            });
        }
    }]);

    return Api;
})();

exports['default'] = Api;
module.exports = exports['default'];

},{"jquery":2}],4:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = require('jQuery');

/**
* The map instance and related methods
* @access public
*/

var Map = (function () {
    /**
     * Instantiates the Map instance
     * @return {bool}
     */

    function Map() {
        _classCallCheck(this, Map);

        this.map = {};
        return true;
    }

    /**
     * Adds geojson object to the map object
     * @param {JSON} geojson The geojson object to add
     * @return {object}      The map object
     */

    _createClass(Map, [{
        key: 'addGeojson',
        value: function addGeojson(geojson) {
            this.map.data.addGeoJson(geojson);
            return this;
        }

        /**
         * Adds kml layer to the map
         * @param {string} kmlLoc The location of the KML layer file
         * @return {object}       The map object
         */
    }, {
        key: 'addKmlLayer',
        value: function addKmlLayer(kmlLoc) {
            var map = this.map;
            var app = app || {};

            // geoXML callback
            function addEvents() {}
            // this.addCatchmentEvent(map, geoXml);

            // load the catchment data
            var geoXml = app.geoXML3.parser({
                map: map,
                zoom: true,
                singleInfoWindow: true,
                //markerOptions: {optimized: false},
                //createMarker: function() {},
                //the function called after parsing the kml file
                afterParse: addEvents.bind(this)
            });

            geoXml.parse(kmlLoc);

            return this;
        }

        /**
        * Add hover events to catchment layer
        * @param object geoXml  The catchment layer
        * @return {object}      The map object
        */
    }, {
        key: 'addCatchmentEvent',
        value: function addCatchmentEvent(map, geoXml) {
            var google = google || {};
            // the popups
            var ib = new InfoBubble({
                shadowStyle: 0,
                padding: 0,
                backgroundColor: 'white',
                borderRadius: 4,
                arrowSize: 0,
                borderWidth: 1,
                borderColor: 'black',
                disableAutoPan: true,
                hideCloseButton: true,
                arrowPosition: 50,
                arrowStyle: 0
            });

            // attached the event listener
            function polygonMouseover(poly, text) {
                google.maps.event.addListener(poly, 'mouseover', function (evt) {
                    ib.setContent(text);
                    ib.setPosition(evt.latLng);
                    ib.setMap(map);
                    ib.open();
                });

                google.maps.event.addListener(poly, 'mouseout', function (evt) {
                    ib.close();
                });
            }

            if (geoXml.docs && geoXml.docs.length > 0) {
                // iterates through the catchment zones and attaches event layers
                for (var i = 0; i < geoXml.docs[0].placemarks.length; i++) {
                    var placemark = geoXml.docs[0].placemarks[i];
                    placemark.name = 'TEST ' + i;
                    polygonMouseover(placemark.polygon, placemark.name);
                    $('#map_text').append(placemark.name + ', ');
                }
            }

            return true;
        }

        /**
         * Adds the bare map to the map
         * @param {string} loc The HTML #id to add the map to
         * @return {object}    The map object
         */
    }, {
        key: 'renderMap',
        value: function renderMap(loc) {
            var google = google || {};
            // default the map to Philly
            this.map = new google.maps.Map(document.getElementById(loc), {
                center: { lat: 39.9500, lng: -75.1667 },
                zoom: 11
            });

            return this;
        }
    }]);

    return Map;
})();

exports['default'] = Map;
module.exports = exports['default'];

},{"jQuery":1}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Metadata = (function () {
    function Metadata(args) {
        _classCallCheck(this, Metadata);

        args = args || {};
    }

    _createClass(Metadata, [{
        key: 'read',
        value: function read(src) {}
    }]);

    return Metadata;
})();

exports.Metadata = Metadata;

},{}],6:[function(require,module,exports){
/**
 * @fileOverview Renders KML on the Google Maps JavaScript API Version 3
 * @name GeoXML3
 * @author Sterling Udell, Larry Ross, Brendan Byrd
 * @see http://code.google.com/p/geoxml3/
 *
 * geoxml3.js
 *
 * Renders KML on the Google Maps JavaScript API Version 3
 * http://code.google.com/p/geoxml3/
 *
 * Copyright 2010 Sterling Udell, Larry Ross
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/**
 * A MultiGeometry object that will allow multiple polylines in a MultiGeometry
 * containing LineStrings to be treated as a single object
 *
 * @param {MutiGeometryOptions} anonymous object.  Available properties:
 * map: The map on which to attach the MultiGeometry
 * paths: the individual polylines
 * polylineOptions: options to use when constructing all the polylines
 *
 * @constructor
 */
// only if Google Maps API included
'use strict';

if (!!window.google && !!google.maps) {
  var _MultiGeometry = function _MultiGeometry(multiGeometryOptions) {
    function createPolyline(polylineOptions, mg) {
      var polyline = new google.maps.Polyline(polylineOptions);
      google.maps.event.addListener(polyline, 'click', function (evt) {
        google.maps.event.trigger(mg, 'click', evt);
      });
      google.maps.event.addListener(polyline, 'dblclick', function (evt) {
        google.maps.event.trigger(mg, 'dblclick', evt);
      });
      google.maps.event.addListener(polyline, 'mousedown', function (evt) {
        google.maps.event.trigger(mg, 'mousedown', evt);
      });
      google.maps.event.addListener(polyline, 'mousemove', function (evt) {
        google.maps.event.trigger(mg, 'mousemove', evt);
      });
      google.maps.event.addListener(polyline, 'mouseout', function (evt) {
        google.maps.event.trigger(mg, 'mouseout', evt);
      });
      google.maps.event.addListener(polyline, 'mouseover', function (evt) {
        google.maps.event.trigger(mg, 'mouseover', evt);
      });
      google.maps.event.addListener(polyline, 'mouseup', function (evt) {
        google.maps.event.trigger(mg, 'mouseup', evt);
      });
      google.maps.event.addListener(polyline, 'rightclick', function (evt) {
        google.maps.event.trigger(mg, 'rightclick', evt);
      });
      return polyline;
    }
    this.setValues(multiGeometryOptions);
    this.polylines = [];

    for (i = 0; i < this.paths.length; i++) {
      var polylineOptions = multiGeometryOptions;
      polylineOptions.path = this.paths[i];
      var polyline = createPolyline(polylineOptions, this);
      // Bind the polyline properties to the MultiGeometry properties
      this.polylines.push(polyline);
    }
  };

  _MultiGeometry.prototype = new google.maps.MVCObject();
  _MultiGeometry.prototype.changed = function (key) {
    // alert(key+" changed");
    if (this.polylines) {
      for (var i = 0; i < this.polylines.length; i++) {
        this.polylines[i].set(key, this.get(key));
      }
    }
  };
  _MultiGeometry.prototype.setMap = function (map) {
    this.set('map', map);
  };
  _MultiGeometry.prototype.getMap = function () {
    return this.get('map');
  };
}

// Extend the global String object with a method to remove leading and trailing whitespace
if (!String.prototype.trim) {
  /**
   * Remove leading and trailing whitespace.
   *
   * @augments String
   * @return {String}
   */
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

/**
 * @namespace The GeoXML3 namespace.
 */
geoXML3 = window.geoXML3 || { instances: [] };

/**
 * Constructor for the root KML parser object.
 *
 * <p>All top-level objects and functions are declared under a namespace of geoXML3.
 * The core object is geoXML3.parser; typically, you'll instantiate a one parser
 * per map.</p>
 *
 * @class Main XML parser.
 * @param {geoXML3.parserOptions} options
 */
geoXML3.parser = function (options) {
  // Inherit from Google MVC Object to include event handling
  google.maps.MVCObject.call(this);

  // Private variables
  var parserOptions = new geoXML3.parserOptions(options);
  var docs = []; // Individual KML documents
  var docsByUrl = {}; // Same docs as an hash by cleanURL
  var kmzMetaData = {}; // Extra files from KMZ data
  var styles = {}; // Global list of styles
  var lastPlacemark;
  var parserName;
  if (!parserOptions.infoWindow && parserOptions.singleInfoWindow) parserOptions.infoWindow = new google.maps.InfoWindow();

  var parseKmlString = function parseKmlString(kmlString, docSet) {
    // Internal values for the set of documents as a whole
    var internals = {
      parser: this,
      docSet: docSet || [],
      remaining: 1,
      parseOnly: !(parserOptions.afterParse || parserOptions.processStyles)
    };
    thisDoc = new Object();
    thisDoc.internals = internals;
    internals.docSet.push(thisDoc);
    render(geoXML3.xmlParse(kmlString), thisDoc);
  };

  var parse = function parse(urls, docSet) {
    // Process one or more KML documents
    if (!parserName) {
      parserName = 'geoXML3.instances[' + (geoXML3.instances.push(this) - 1) + ']';
    }

    if (typeof urls === 'string') {
      // Single KML document
      urls = [urls];
    }

    // Internal values for the set of documents as a whole
    var internals = {
      parser: this,
      docSet: docSet || [],
      remaining: urls.length,
      parseOnly: !(parserOptions.afterParse || parserOptions.processStyles)
    };
    var thisDoc, j;
    for (var i = 0; i < urls.length; i++) {
      var baseUrl = cleanURL(defileURL(location.pathname), urls[i]);
      if (docsByUrl[baseUrl]) {
        // Reloading an existing document
        thisDoc = docsByUrl[baseUrl];
        thisDoc.reload = true;
      } else {
        thisDoc = new Object();
        thisDoc.baseUrl = baseUrl;
        internals.docSet.push(thisDoc);
      }
      thisDoc.url = urls[i];
      thisDoc.internals = internals;
      fetchDoc(thisDoc.url, thisDoc);
    }
  };

  function fetchDoc(url, doc, resFunc) {
    resFunc = resFunc || function (responseXML) {
      render(responseXML, doc);
    };

    if (typeof ZipFile === 'function' && typeof JSIO === 'object' && typeof JSIO.guessFileType === 'function') {
      // KMZ support requires these modules loaded
      contentType = JSIO.guessFileType(doc.baseUrl);
      if (contentType == JSIO.FileType.Binary || contentType == JSIO.FileType.Unknown) {
        doc.isCompressed = true;
        doc.baseDir = doc.baseUrl + '/';
        geoXML3.fetchZIP(url, resFunc, doc.internals.parser);
        return;
      }
    }
    doc.isCompressed = false;
    doc.baseDir = defileURL(doc.baseUrl);
    geoXML3.fetchXML(url, resFunc);
  }

  var hideDocument = function hideDocument(doc) {
    if (!doc) doc = docs[0];
    // Hide the map objects associated with a document
    var i;
    if (!!doc.markers) {
      for (i = 0; i < doc.markers.length; i++) {
        if (!!doc.markers[i].infoWindow) doc.markers[i].infoWindow.close();
        doc.markers[i].setVisible(false);
      }
    }
    if (!!doc.ggroundoverlays) {
      for (i = 0; i < doc.ggroundoverlays.length; i++) {
        doc.ggroundoverlays[i].setOpacity(0);
      }
    }
    if (!!doc.gpolylines) {
      for (i = 0; i < doc.gpolylines.length; i++) {
        if (!!doc.gpolylines[i].infoWindow) doc.gpolylines[i].infoWindow.close();
        doc.gpolylines[i].setMap(null);
      }
    }
    if (!!doc.gpolygons) {
      for (i = 0; i < doc.gpolygons.length; i++) {
        if (!!doc.gpolygons[i].infoWindow) doc.gpolygons[i].infoWindow.close();
        doc.gpolygons[i].setMap(null);
      }
    }
  };

  var showDocument = function showDocument(doc) {
    if (!doc) doc = docs[0];
    // Show the map objects associated with a document
    var i;
    if (!!doc.markers) {
      for (i = 0; i < doc.markers.length; i++) {
        doc.markers[i].setVisible(true);
      }
    }
    if (!!doc.ggroundoverlays) {
      for (i = 0; i < doc.ggroundoverlays.length; i++) {
        doc.ggroundoverlays[i].setOpacity(doc.ggroundoverlays[i].percentOpacity_);
      }
    }
    if (!!doc.gpolylines) {
      for (i = 0; i < doc.gpolylines.length; i++) {
        doc.gpolylines[i].setMap(parserOptions.map);
      }
    }
    if (!!doc.gpolygons) {
      for (i = 0; i < doc.gpolygons.length; i++) {
        doc.gpolygons[i].setMap(parserOptions.map);
      }
    }
  };

  var defaultStyle = {
    balloon: {
      bgColor: 'ffffffff',
      textColor: 'ff000000',
      text: "<h3>$[name]</h3>\n<div>$[description]</div>\n<div>$[geDirections]</div>",
      displayMode: 'default'
    },
    icon: {
      scale: 1.0,
      dim: {
        x: 0,
        y: 0,
        w: -1,
        h: -1
      },
      hotSpot: {
        x: 0.5,
        y: 0.5,
        xunits: 'fraction',
        yunits: 'fraction'
      }
    },
    line: {
      color: 'ffffffff', // white (KML default)
      colorMode: 'normal',
      width: 1.0
    },
    poly: {
      color: 'ffffffff', // white (KML default)
      colorMode: 'normal',
      fill: true,
      outline: true
    }
  };

  var kmlNS = 'http://www.opengis.net/kml/2.2';
  var gxNS = 'http://www.google.com/kml/ext/2.2';
  var nodeValue = geoXML3.nodeValue;
  var getBooleanValue = geoXML3.getBooleanValue;
  var getElementsByTagNameNS = geoXML3.getElementsByTagNameNS;
  var getElementsByTagName = geoXML3.getElementsByTagName;

  function processStyleUrl(node) {
    var styleUrlStr = nodeValue(getElementsByTagName(node, 'styleUrl')[0]);
    if (!!styleUrlStr && styleUrlStr.indexOf('#') != -1) var styleUrl = styleUrlStr.split('#');else var styleUrl = ["", ""];
    return styleUrl;
  }

  function processStyle(thisNode, baseUrl, styleID, baseDir) {
    var style = baseUrl === '{inline}' ? clone(defaultStyle) : styles[baseUrl][styleID] = styles[baseUrl][styleID] || clone(defaultStyle);

    var styleNodes = getElementsByTagName(thisNode, 'BalloonStyle');
    if (!!styleNodes && styleNodes.length > 0) {
      style.balloon.bgColor = nodeValue(getElementsByTagName(styleNodes[0], 'bgColor')[0], style.balloon.bgColor);
      style.balloon.textColor = nodeValue(getElementsByTagName(styleNodes[0], 'textColor')[0], style.balloon.textColor);
      style.balloon.text = nodeValue(getElementsByTagName(styleNodes[0], 'text')[0], style.balloon.text);
      style.balloon.displayMode = nodeValue(getElementsByTagName(styleNodes[0], 'displayMode')[0], style.balloon.displayMode);
    }

    // style.list = (unsupported; doesn't make sense in Google Maps)

    var styleNodes = getElementsByTagName(thisNode, 'IconStyle');
    if (!!styleNodes && styleNodes.length > 0) {
      var icon = style.icon;

      icon.scale = parseFloat(nodeValue(getElementsByTagName(styleNodes[0], 'scale')[0], icon.scale));
      // style.icon.heading   = (unsupported; not supported in API)
      // style.icon.color     = (unsupported; not supported in API)
      // style.icon.colorMode = (unsupported; not supported in API)

      styleNodes = getElementsByTagName(styleNodes[0], 'hotSpot');
      if (!!styleNodes && styleNodes.length > 0) {
        icon.hotSpot = {
          x: styleNodes[0].getAttribute('x'),
          y: styleNodes[0].getAttribute('y'),
          xunits: styleNodes[0].getAttribute('xunits'),
          yunits: styleNodes[0].getAttribute('yunits')
        };
      }

      styleNodes = getElementsByTagName(thisNode, 'Icon');
      if (!!styleNodes && styleNodes.length > 0) {
        icon.href = nodeValue(getElementsByTagName(styleNodes[0], 'href')[0]);
        icon.url = cleanURL(baseDir, icon.href);
        // Detect images buried in KMZ files (and use a base64 encoded URL)
        if (kmzMetaData[icon.url]) icon.url = kmzMetaData[icon.url].dataUrl;

        // Support for icon palettes and exact size dimensions
        icon.dim = {
          x: parseInt(nodeValue(getElementsByTagNameNS(styleNodes[0], gxNS, 'x')[0], icon.dim.x)),
          y: parseInt(nodeValue(getElementsByTagNameNS(styleNodes[0], gxNS, 'y')[0], icon.dim.y)),
          w: parseInt(nodeValue(getElementsByTagNameNS(styleNodes[0], gxNS, 'w')[0], icon.dim.w)),
          h: parseInt(nodeValue(getElementsByTagNameNS(styleNodes[0], gxNS, 'h')[0], icon.dim.h))
        };

        // certain occasions where we need the pixel size of the image (like the default settings...)
        // (NOTE: Scale is applied to entire image, not just the section of the icon palette.  So,
        //  if we need scaling, we'll need the img dimensions no matter what.)
        if (true /* (icon.dim.w < 0 || icon.dim.h < 0) && (icon.xunits != 'pixels' || icon.yunits == 'fraction') || icon.scale != 1.0 */) {
            // (hopefully, this will load by the time we need it...)
            icon.img = new Image();
            icon.img.onload = function () {
              if (icon.dim.w < 0 || icon.dim.h < 0) {
                icon.dim.w = this.width;
                icon.dim.h = this.height;
              } else {
                icon.dim.th = this.height;
              }
            };
            icon.img.src = icon.url;

            // sometimes the file is already cached and it never calls onLoad
            if (icon.img.width > 0) {
              if (icon.dim.w < 0 || icon.dim.h < 0) {
                icon.dim.w = icon.img.width;
                icon.dim.h = icon.img.height;
              } else {
                icon.dim.th = icon.img.height;
              }
            }
          }
      }
    }

    // style.label = (unsupported; may be possible but not with API)

    styleNodes = getElementsByTagName(thisNode, 'LineStyle');
    if (!!styleNodes && styleNodes.length > 0) {
      style.line.color = nodeValue(getElementsByTagName(styleNodes[0], 'color')[0], style.line.color);
      style.line.colorMode = nodeValue(getElementsByTagName(styleNodes[0], 'colorMode')[0], style.line.colorMode);
      style.line.width = nodeValue(getElementsByTagName(styleNodes[0], 'width')[0], style.line.width);
      // style.line.outerColor      = (unsupported; not supported in API)
      // style.line.outerWidth      = (unsupported; not supported in API)
      // style.line.physicalWidth   = (unsupported; unneccesary in Google Maps)
      // style.line.labelVisibility = (unsupported; possible to implement)
    }

    styleNodes = getElementsByTagName(thisNode, 'PolyStyle');
    if (!!styleNodes && styleNodes.length > 0) {
      style.poly.color = nodeValue(getElementsByTagName(styleNodes[0], 'color')[0], style.poly.color);
      style.poly.colorMode = nodeValue(getElementsByTagName(styleNodes[0], 'colorMode')[0], style.poly.colorMode);
      style.poly.outline = getBooleanValue(getElementsByTagName(styleNodes[0], 'outline')[0], style.poly.outline);
      style.poly.fill = getBooleanValue(getElementsByTagName(styleNodes[0], 'fill')[0], style.poly.fill);
    }
    return style;
  }

  // from http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object
  // http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
  function clone(obj) {
    if (obj == null || typeof obj != 'object') return obj;
    if (obj.cloneNode) return obj.cloneNode(true);
    var temp = new obj.constructor();
    for (var key in obj) temp[key] = clone(obj[key]);
    return temp;
  }

  function processStyleMap(thisNode, baseUrl, styleID, baseDir) {
    var pairs = getElementsByTagName(thisNode, 'Pair');
    var map = new Object();

    // add each key to the map
    for (var pr = 0; pr < pairs.length; pr++) {
      var pairKey = nodeValue(getElementsByTagName(pairs[pr], 'key')[0]);
      var pairStyle = nodeValue(getElementsByTagName(pairs[pr], 'Style')[0]);
      var pairStyleUrl = processStyleUrl(pairs[pr]);
      var pairStyleBaseUrl = pairStyleUrl[0] ? cleanURL(baseDir, pairStyleUrl[0]) : baseUrl;
      var pairStyleID = pairStyleUrl[1];

      if (!!pairStyle) {
        map[pairKey] = processStyle(pairStyle, pairStyleBaseUrl, pairStyleID);
      } else if (!!pairStyleID && !!styles[pairStyleBaseUrl][pairStyleID]) {
        map[pairKey] = clone(styles[pairStyleBaseUrl][pairStyleID]);
      }
    }
    if (!!map["normal"]) {
      styles[baseUrl][styleID] = clone(map["normal"]);
    } else {
      styles[baseUrl][styleID] = clone(defaultStyle);
    }
    if (!!map["highlight"] && !!parserOptions.processStyles) {
      processStyleID(map["highlight"]);
    }
    styles[baseUrl][styleID].map = clone(map);
  }

  function processPlacemarkCoords(node, tag) {
    var parent = getElementsByTagName(node, tag);
    var coordListA = [];
    for (var i = 0; i < parent.length; i++) {
      var coordNodes = getElementsByTagName(parent[i], 'coordinates');
      if (!coordNodes) {
        if (coordListA.length > 0) {
          break;
        } else {
          return [{ coordinates: [] }];
        }
      }

      for (var j = 0; j < coordNodes.length; j++) {
        var coords = nodeValue(coordNodes[j]).trim();
        coords = coords.replace(/,\s+/g, ',');
        var path = coords.split(/\s+/g);
        var pathLength = path.length;
        var coordList = [];
        for (var k = 0; k < pathLength; k++) {
          coords = path[k].split(',');
          if (!isNaN(coords[0]) && !isNaN(coords[1])) {
            coordList.push({
              lat: parseFloat(coords[1]),
              lng: parseFloat(coords[0]),
              alt: parseFloat(coords[2])
            });
          }
        }
        coordListA.push({ coordinates: coordList });
      }
    }
    return coordListA;
  }

  var render = function render(responseXML, doc) {
    // Callback for retrieving a KML document: parse the KML and display it on the map
    if (!responseXML || responseXML == "failed parse") {
      // Error retrieving the data
      geoXML3.log('Unable to retrieve ' + doc.url);
      if (parserOptions.failedParse) parserOptions.failedParse(doc);
      doc.failed = true;
      return;
    } else if (responseXML.parseError && responseXML.parseError.errorCode != 0) {
      // IE parse error
      var err = responseXML.parseError;
      var msg = 'Parse error in line ' + err.line + ', col ' + err.linePos + ' (error code: ' + err.errorCode + ")\n" + "\nError Reason: " + err.reason + 'Error Line: ' + err.srcText;

      geoXML3.log('Unable to retrieve ' + doc.url + ': ' + msg);
      if (parserOptions.failedParse) parserOptions.failedParse(doc);
      doc.failed = true;
      return;
    } else if (responseXML.documentElement && responseXML.documentElement.nodeName == 'parsererror') {
      // Firefox parse error
      geoXML3.log('Unable to retrieve ' + doc.url + ': ' + responseXML.documentElement.childNodes[0].nodeValue);
      if (parserOptions.failedParse) parserOptions.failedParse(doc);
      doc.failed = true;
      return;
    } else if (!doc) {
      throw 'geoXML3 internal error: render called with null document';
    } else {
      //no errors
      var i;
      doc.placemarks = [];
      doc.groundoverlays = [];
      doc.ggroundoverlays = [];
      doc.networkLinks = [];
      doc.gpolygons = [];
      doc.gpolylines = [];

      // Check for dependent KML files
      var nodes = getElementsByTagName(responseXML, 'styleUrl');
      var docSet = doc.internals.docSet;

      for (var i = 0; i < nodes.length; i++) {
        var url = nodeValue(nodes[i]).split('#')[0];
        if (!url) continue; // #id (inside doc)
        var rUrl = cleanURL(doc.baseDir, url);
        if (rUrl === doc.baseUrl) continue; // self
        if (docsByUrl[rUrl]) continue; // already loaded

        var thisDoc;
        var j = docSet.indexOfObjWithItem('baseUrl', rUrl);
        if (j != -1) {
          // Already listed to be loaded, but probably in the wrong order.
          // Load it right away to immediately resolve dependency.
          thisDoc = docSet[j];
          if (thisDoc.failed) continue; // failed to load last time; don't retry it again
        } else {
            // Not listed at all; add it in
            thisDoc = new Object();
            thisDoc.url = rUrl; // url can't be trusted inside KMZ files, since it may .. outside of the archive
            thisDoc.baseUrl = rUrl;
            thisDoc.internals = doc.internals;

            doc.internals.docSet.push(thisDoc);
            doc.internals.remaining++;
          }

        // render dependent KML first then re-run renderer
        fetchDoc(rUrl, thisDoc, function (thisResXML) {
          render(thisResXML, thisDoc);
          render(responseXML, doc);
        });

        // to prevent cross-dependency issues, just load the one
        // file first and re-check the rest later
        return;
      }

      // Parse styles
      doc.styles = styles[doc.baseUrl] = styles[doc.baseUrl] || {};
      var styleID, styleNodes;
      nodes = getElementsByTagName(responseXML, 'Style');
      nodeCount = nodes.length;
      for (i = 0; i < nodeCount; i++) {
        thisNode = nodes[i];
        var styleID = thisNode.getAttribute('id');
        if (!!styleID) processStyle(thisNode, doc.baseUrl, styleID, doc.baseDir);
      }
      // Parse StyleMap nodes
      nodes = getElementsByTagName(responseXML, 'StyleMap');
      for (i = 0; i < nodes.length; i++) {
        thisNode = nodes[i];
        var styleID = thisNode.getAttribute('id');
        if (!!styleID) processStyleMap(thisNode, doc.baseUrl, styleID, doc.baseDir);
      }

      if (!!parserOptions.processStyles || !parserOptions.createMarker) {
        // Convert parsed styles into GMaps equivalents
        processStyles(doc);
      }

      // Parse placemarks
      if (!!doc.reload && !!doc.markers) {
        for (i = 0; i < doc.markers.length; i++) {
          doc.markers[i].active = false;
        }
      }
      var placemark, node, coords, path, marker, poly;
      var pathLength, marker, polygonNodes, coordList;
      var placemarkNodes = getElementsByTagName(responseXML, 'Placemark');
      for (pm = 0; pm < placemarkNodes.length; pm++) {
        // Init the placemark object
        node = placemarkNodes[pm];
        var styleUrl = processStyleUrl(node);
        placemark = {
          name: nodeValue(getElementsByTagName(node, 'name')[0]),
          description: nodeValue(getElementsByTagName(node, 'description')[0]),
          styleUrl: styleUrl.join('#'),
          styleBaseUrl: styleUrl[0] ? cleanURL(doc.baseDir, styleUrl[0]) : doc.baseUrl,
          styleID: styleUrl[1],
          visibility: getBooleanValue(getElementsByTagName(node, 'visibility')[0], true),
          balloonVisibility: getBooleanValue(getElementsByTagNameNS(node, gxNS, 'balloonVisibility')[0], !parserOptions.suppressInfoWindows),
          id: node.getAttribute('id')
        };
        placemark.style = styles[placemark.styleBaseUrl] && styles[placemark.styleBaseUrl][placemark.styleID] || clone(defaultStyle);
        // inline style overrides shared style
        var inlineStyles = getElementsByTagName(node, 'Style');
        if (inlineStyles && inlineStyles.length > 0) {
          var style = processStyle(node, '{inline}', '{inline}');
          processStyleID(style);
          if (style) placemark.style = style;
        }

        if (/^https?:\/\//.test(placemark.description)) {
          placemark.description = ['<a href="', placemark.description, '">', placemark.description, '</a>'].join('');
        }

        // record list of variables for substitution
        placemark.vars = {
          display: {
            name: 'Name',
            description: 'Description',
            address: 'Street Address',
            id: 'ID',
            Snippet: 'Snippet',
            geDirections: 'Directions'
          },
          val: {
            name: placemark.name || '',
            description: placemark.description || '',
            address: nodeValue(getElementsByTagName(node, 'address')[0], ''),
            id: node.getAttribute('id') || '',
            Snippet: nodeValue(getElementsByTagName(node, 'Snippet')[0], '')
          },
          directions: ['f=d', 'source=GeoXML3']
        };

        // add extended data to variables
        var extDataNodes = getElementsByTagName(node, 'ExtendedData');
        if (!!extDataNodes && extDataNodes.length > 0) {
          var dataNodes = getElementsByTagName(extDataNodes[0], 'Data');
          for (var d = 0; d < dataNodes.length; d++) {
            var dn = dataNodes[d];
            var name = dn.getAttribute('name');
            if (!name) continue;
            var dName = nodeValue(getElementsByTagName(dn, 'displayName')[0], name);
            var val = nodeValue(getElementsByTagName(dn, 'value')[0]);

            placemark.vars.val[name] = val;
            placemark.vars.display[name] = dName;
          }
        }

        // process MultiGeometry
        var GeometryNodes = getElementsByTagName(node, 'coordinates');
        var Geometry = null;
        if (!!GeometryNodes && GeometryNodes.length > 0) {
          for (var gn = 0; gn < GeometryNodes.length; gn++) {
            if (GeometryNodes[gn].parentNode && GeometryNodes[gn].parentNode.nodeName) {
              var GeometryPN = GeometryNodes[gn].parentNode;
              Geometry = GeometryPN.nodeName;

              // Extract the coordinates
              // What sort of placemark?
              switch (Geometry) {
                case "Point":
                  placemark.Point = processPlacemarkCoords(node, "Point")[0];
                  placemark.latlng = new google.maps.LatLng(placemark.Point.coordinates[0].lat, placemark.Point.coordinates[0].lng);
                  pathLength = 1;
                  break;
                case "LinearRing":
                  // Polygon/line
                  polygonNodes = getElementsByTagName(node, 'Polygon');
                  // Polygon
                  if (!placemark.Polygon) placemark.Polygon = [{
                    outerBoundaryIs: { coordinates: [] },
                    innerBoundaryIs: [{ coordinates: [] }]
                  }];
                  for (var pg = 0; pg < polygonNodes.length; pg++) {
                    placemark.Polygon[pg] = {
                      outerBoundaryIs: { coordinates: [] },
                      innerBoundaryIs: [{ coordinates: [] }]
                    };
                    placemark.Polygon[pg].outerBoundaryIs = processPlacemarkCoords(polygonNodes[pg], "outerBoundaryIs");
                    placemark.Polygon[pg].innerBoundaryIs = processPlacemarkCoords(polygonNodes[pg], "innerBoundaryIs");
                  }
                  coordList = placemark.Polygon[0].outerBoundaryIs;
                  break;

                case "LineString":
                  pathLength = 0;
                  placemark.LineString = processPlacemarkCoords(node, "LineString");
                  break;

                default:
                  break;
              }
            }
          }
        }

        // call the custom placemark parse function if it is defined
        if (!!parserOptions.pmParseFn) parserOptions.pmParseFn(node, placemark);
        doc.placemarks.push(placemark);

        // single marker
        if (placemark.Point) {
          if (!!google.maps) {
            doc.bounds = doc.bounds || new google.maps.LatLngBounds();
            doc.bounds.extend(placemark.latlng);
          }

          // Potential user-defined marker handler
          var pointCreateFunc = parserOptions.createMarker || createMarker;
          var found = false;
          if (!parserOptions.createMarker) {
            // Check to see if this marker was created on a previous load of this document
            if (!!doc) {
              doc.markers = doc.markers || [];
              if (doc.reload) {
                for (var j = 0; j < doc.markers.length; j++) {
                  if (doc.markers[j].id == placemark.id ||
                  // if no id, check position
                  !doc.markers[j].id && doc.markers[j].getPosition().equals(placemark.latlng)) {
                    found = doc.markers[j].active = true;
                    break;
                  }
                }
              }
            }
          }
          if (!found) {
            // Call the marker creator
            var marker = pointCreateFunc(placemark, doc);
            if (marker) {
              marker.active = placemark.visibility;
              marker.id = placemark.id;
            }
          }
        }
        // polygon/line
        var poly, line;
        if (!!doc) {
          if (placemark.Polygon) doc.gpolygons = doc.gpolygons || [];
          if (placemark.LineString) doc.gpolylines = doc.gpolylines || [];
        }

        var polyCreateFunc = parserOptions.createPolygon || createPolygon;
        var lineCreateFunc = parserOptions.createLineString || createPolyline;
        if (placemark.Polygon) {
          poly = polyCreateFunc(placemark, doc);
          if (poly) poly.active = placemark.visibility;
        }
        if (placemark.LineString) {
          line = lineCreateFunc(placemark, doc);
          if (line) line.active = placemark.visibility;
        }
        if (!!google.maps) {
          doc.bounds = doc.bounds || new google.maps.LatLngBounds();
          if (poly) doc.bounds.union(poly.bounds);
          if (line) doc.bounds.union(line.bounds);
        }
      } // placemark loop

      if (!!doc.reload && !!doc.markers) {
        for (i = doc.markers.length - 1; i >= 0; i--) {
          if (!doc.markers[i].active) {
            if (!!doc.markers[i].infoWindow) {
              doc.markers[i].infoWindow.close();
            }
            doc.markers[i].setMap(null);
            doc.markers.splice(i, 1);
          }
        }
      }

      // Parse ground overlays
      if (!!doc.reload && !!doc.groundoverlays) {
        for (i = 0; i < doc.groundoverlays.length; i++) {
          doc.groundoverlays[i].active = false;
        }
      }

      if (!!doc) {
        doc.groundoverlays = doc.groundoverlays || [];
      }
      // doc.groundoverlays =[];
      var groundOverlay, color, transparency, overlay;
      var groundNodes = getElementsByTagName(responseXML, 'GroundOverlay');
      for (i = 0; i < groundNodes.length; i++) {
        node = groundNodes[i];

        // Detect images buried in KMZ files (and use a base64 encoded URL)
        var gnUrl = cleanURL(doc.baseDir, nodeValue(getElementsByTagName(node, 'href')[0]));
        if (kmzMetaData[gnUrl]) gnUrl = kmzMetaData[gnUrl].dataUrl;

        // Init the ground overlay object
        groundOverlay = {
          name: nodeValue(getElementsByTagName(node, 'name')[0]),
          description: nodeValue(getElementsByTagName(node, 'description')[0]),
          icon: { href: gnUrl },
          latLonBox: {
            north: parseFloat(nodeValue(getElementsByTagName(node, 'north')[0])),
            east: parseFloat(nodeValue(getElementsByTagName(node, 'east')[0])),
            south: parseFloat(nodeValue(getElementsByTagName(node, 'south')[0])),
            west: parseFloat(nodeValue(getElementsByTagName(node, 'west')[0]))
          }
        };
        if (!!google.maps) {
          doc.bounds = doc.bounds || new google.maps.LatLngBounds();
          doc.bounds.union(new google.maps.LatLngBounds(new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west), new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east)));
        }

        // Opacity is encoded in the color node
        var colorNode = getElementsByTagName(node, 'color');
        if (colorNode && colorNode.length > 0) {
          groundOverlay.opacity = geoXML3.getOpacity(nodeValue(colorNode[0]));
        } else {
          groundOverlay.opacity = 1.0; // KML default
        }

        doc.groundoverlays.push(groundOverlay);
        if (!!parserOptions.createOverlay) {
          // User-defined overlay handler
          parserOptions.createOverlay(groundOverlay, doc);
        } else {
          // Check to see if this overlay was created on a previous load of this document
          var found = false;
          if (!!doc) {
            doc.groundoverlays = doc.groundoverlays || [];
            if (doc.reload) {
              overlayBounds = new google.maps.LatLngBounds(new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west), new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east));
              var overlays = doc.groundoverlays;
              for (i = overlays.length; i--;) {
                if (overlays[i].bounds().equals(overlayBounds) && overlays.url_ === groundOverlay.icon.href) {
                  found = overlays[i].active = true;
                  break;
                }
              }
            }
          }

          if (!found) {
            // Call the built-in overlay creator
            overlay = createOverlay(groundOverlay, doc);
            overlay.active = true;
          }
        }
        if (!!doc.reload && !!doc.groundoverlays && !!doc.groundoverlays.length) {
          var overlays = doc.groundoverlays;
          for (i = overlays.length; i--;) {
            if (!overlays[i].active) {
              overlays[i].remove();
              overlays.splice(i, 1);
            }
          }
          doc.groundoverlays = overlays;
        }
      }

      // Parse network links
      var networkLink;
      var docPath = document.location.pathname.split('/');
      docPath = docPath.splice(0, docPath.length - 1).join('/');
      var linkNodes = getElementsByTagName(responseXML, 'NetworkLink');
      for (i = 0; i < linkNodes.length; i++) {
        node = linkNodes[i];

        // Init the network link object
        networkLink = {
          name: nodeValue(getElementsByTagName(node, 'name')[0]),
          link: {
            href: nodeValue(getElementsByTagName(node, 'href')[0]),
            refreshMode: nodeValue(getElementsByTagName(node, 'refreshMode')[0])
          }
        };

        // Establish the specific refresh mode
        if (!networkLink.link.refreshMode) {
          networkLink.link.refreshMode = 'onChange';
        }
        if (networkLink.link.refreshMode === 'onInterval') {
          networkLink.link.refreshInterval = parseFloat(nodeValue(getElementsByTagName(node, 'refreshInterval')[0]));
          if (isNaN(networkLink.link.refreshInterval)) {
            networkLink.link.refreshInterval = 0;
          }
        } else if (networkLink.link.refreshMode === 'onChange') {
          networkLink.link.viewRefreshMode = nodeValue(getElementsByTagName(node, 'viewRefreshMode')[0]);
          if (!networkLink.link.viewRefreshMode) {
            networkLink.link.viewRefreshMode = 'never';
          }
          if (networkLink.link.viewRefreshMode === 'onStop') {
            networkLink.link.viewRefreshTime = nodeValue(getElementsByTagName(node, 'refreshMode')[0]);
            networkLink.link.viewFormat = nodeValue(getElementsByTagName(node, 'refreshMode')[0]);
            if (!networkLink.link.viewFormat) {
              networkLink.link.viewFormat = 'BBOX=[bboxWest],[bboxSouth],[bboxEast],[bboxNorth]';
            }
          }
        }

        if (!/^[\/|http]/.test(networkLink.link.href)) {
          // Fully-qualify the HREF
          networkLink.link.href = docPath + '/' + networkLink.link.href;
        }

        // Apply the link
        if (networkLink.link.refreshMode === 'onInterval' && networkLink.link.refreshInterval > 0) {
          // Reload at regular intervals
          setInterval(parserName + '.parse("' + networkLink.link.href + '")', 1000 * networkLink.link.refreshInterval);
        } else if (networkLink.link.refreshMode === 'onChange') {
          if (networkLink.link.viewRefreshMode === 'never') {
            // Load the link just once
            doc.internals.parser.parse(networkLink.link.href, doc.internals.docSet);
          } else if (networkLink.link.viewRefreshMode === 'onStop') {
            // Reload when the map view changes

          }
        }
      }
    }

    if (!!doc.bounds) {
      doc.internals.bounds = doc.internals.bounds || new google.maps.LatLngBounds();
      doc.internals.bounds.union(doc.bounds);
    }
    if (!!doc.markers || !!doc.groundoverlays || !!doc.gpolylines || !!doc.gpolygons) {
      doc.internals.parseOnly = false;
    }

    if (!doc.internals.parseOnly) {
      // geoXML3 is not being used only as a real-time parser, so keep the processed documents around
      if (doc.baseUrl) {
        // handle case from parseKmlString (no doc.baseUrl)
        if (!docsByUrl[doc.baseUrl]) {
          docs.push(doc);
          docsByUrl[doc.baseUrl] = doc;
        } else {
          // internal replacement, which keeps the same memory ref loc in docs and docsByUrl
          for (var i in docsByUrl[doc.baseUrl]) {
            docsByUrl[doc.baseUrl][i] = doc[i];
          }
        }
      }
    }

    doc.internals.remaining--;
    if (doc.internals.remaining === 0) {
      // We're done processing this set of KML documents
      // Options that get invoked after parsing completes
      if (parserOptions.zoom && !!doc.internals.bounds && !doc.internals.bounds.isEmpty() && !!parserOptions.map) {
        parserOptions.map.fitBounds(doc.internals.bounds);
      }
      if (parserOptions.afterParse) {
        parserOptions.afterParse(doc.internals.docSet);
      }
      google.maps.event.trigger(doc.internals.parser, 'parsed');
    }
  };

  var kmlColor = function kmlColor(kmlIn, colorMode) {
    var kmlColor = {};
    kmlIn = kmlIn || 'ffffffff'; // white (KML 2.2 default)

    var aa = kmlIn.substr(0, 2);
    var bb = kmlIn.substr(2, 2);
    var gg = kmlIn.substr(4, 2);
    var rr = kmlIn.substr(6, 2);

    kmlColor.opacity = parseInt(aa, 16) / 256;
    kmlColor.color = colorMode === 'random' ? randomColor(rr, gg, bb) : '#' + rr + gg + bb;
    return kmlColor;
  };

  // Implemented per KML 2.2 <ColorStyle> specs
  var randomColor = function randomColor(rr, gg, bb) {
    var col = { rr: rr, gg: gg, bb: bb };
    for (var k in col) {
      var v = col[k];
      if (v == null) v = 'ff';

      // RGB values are limiters for random numbers (ie: 7f would be a random value between 0 and 7f)
      v = Math.round(Math.random() * parseInt(rr, 16)).toString(16);
      if (v.length === 1) v = '0' + v;
      col[k] = v;
    }

    return '#' + col.rr + col.gg + col.bb;
  };

  var processStyleID = function processStyleID(style) {
    var icon = style.icon;
    if (!icon || !icon.href) return;

    if (icon.img && !icon.img.complete && icon.dim.w < 0 && icon.dim.h < 0) {
      // we're still waiting on the image loading (probably because we've been blocking since the declaration)
      // so, let's queue this function on the onload stack
      icon.markerBacklog = [];
      icon.img.onload = function () {
        if (icon.dim.w < 0 || icon.dim.h < 0) {
          icon.dim.w = this.width;
          icon.dim.h = this.height;
        } else {
          icon.dim.th = this.height;
        }
        processStyleID(style);

        // we will undoubtedly get some createMarker queuing, so set this up in advance
        for (var i = 0; i < icon.markerBacklog.length; i++) {
          var p = icon.markerBacklog[i][0];
          var d = icon.markerBacklog[i][1];
          createMarker(p, d);
          if (p.marker) p.marker.active = true;
        }
        delete icon.markerBacklog;
      };
      return;
    } else {
      //if (icon.dim.w < 0 || icon.dim.h < 0) {
      if (icon.img && icon.img.complete) {
        // sometimes the file is already cached and it never calls onLoad
        if (icon.dim.w < 0 || icon.dim.h < 0) {
          icon.dim.w = icon.img.width;
          icon.dim.h = icon.img.height;
        } else {
          icon.dim.th = icon.img.height;
        }
      } else {
        // settle for a default of 32x32
        icon.dim.whGuess = true;
        icon.dim.w = 32;
        icon.dim.h = 32;
        icon.dim.th = 32;
      }
    }

    // pre-scaled variables
    var rnd = Math.round;
    var y = icon.dim.y;
    if (typeof icon.dim.th !== 'undefined' && icon.dim.th != icon.dim.h) {
      // palette - reverse kml y for maps
      y = Math.abs(y - (icon.dim.th - icon.dim.h));
    }

    var scaled = {
      x: icon.dim.x * icon.scale,
      y: y * icon.scale,
      w: icon.dim.w * icon.scale,
      h: icon.dim.h * icon.scale,
      aX: icon.hotSpot.x * icon.scale,
      aY: icon.hotSpot.y * icon.scale,
      iW: (icon.img ? icon.img.width : icon.dim.w) * icon.scale,
      iH: (icon.img ? icon.img.height : icon.dim.h) * icon.scale
    };

    // Figure out the anchor spot
    // Origins, anchor positions and coordinates of the marker increase in the X direction to the right and in
    // the Y direction down.
    var aX, aY;
    switch (icon.hotSpot.xunits) {
      case 'fraction':
        aX = rnd(scaled.aX * icon.dim.w);break;
      case 'insetPixels':
        aX = rnd(icon.dim.w * icon.scale - scaled.aX);break;
      default:
        aX = rnd(scaled.aX);break; // already pixels
    }
    aY = scaled.h - rnd((icon.hotSpot.yunits === 'fraction' ? icon.dim.h : 1) * scaled.aY); // insetPixels Y = pixels Y
    var iconAnchor = new google.maps.Point(aX, aY);

    // Sizes
    // (NOTE: Scale is applied to entire image, not just the section of the icon palette.)
    var iconSize = icon.dim.whGuess ? null : new google.maps.Size(rnd(scaled.w), rnd(scaled.h));
    var iconScale = icon.scale == 1.0 ? null : icon.dim.whGuess ? new google.maps.Size(rnd(scaled.w), rnd(scaled.h)) : new google.maps.Size(rnd(scaled.iW), rnd(scaled.iH));
    var iconOrigin = new google.maps.Point(rnd(scaled.x), rnd(scaled.y));

    // Detect images buried in KMZ files (and use a base64 encoded URL)
    if (kmzMetaData[icon.url]) icon.url = kmzMetaData[icon.url].dataUrl;

    // Init the style object with the KML icon
    icon.marker = {
      url: icon.url, // url
      size: iconSize, // size
      origin: iconOrigin, // origin
      anchor: iconAnchor, // anchor
      scaledSize: iconScale // scaledSize
    };

    // Look for a predictable shadow
    var stdRegEx = /\/(red|blue|green|yellow|lightblue|purple|pink|orange)(-dot)?\.png/;
    var shadowSize = new google.maps.Size(59, 32);
    var shadowPoint = new google.maps.Point(16, 32);
    if (stdRegEx.test(icon.href)) {
      // A standard GMap-style marker icon
      icon.shadow = {
        url: 'http://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png', // url
        size: shadowSize, // size
        origin: null, // origin
        anchor: shadowPoint, // anchor
        scaledSize: shadowSize // scaledSize
      };
    } else if (icon.href.indexOf('-pushpin.png') > -1) {
        // Pushpin marker icon
        icon.shadow = {
          url: 'http://maps.google.com/mapfiles/ms/micons/pushpin_shadow.png', // url
          size: shadowSize, // size
          origin: null, // origin
          anchor: shadowPoint, // anchor
          scaledSize: shadowSize // scaledSize
        };
      } /* else {
        // Other MyMaps KML standard icon
        icon.shadow = new google.maps.MarkerImage(
          icon.href.replace('.png', '.shadow.png'),                        // url
          shadowSize,                                                      // size
          null,                                                            // origin
          anchorPoint,                                                     // anchor
          shadowSize                                                       // scaledSize
        );
        } */
  };

  var processStyles = function processStyles(doc) {
    for (var styleID in doc.styles) {
      processStyleID(doc.styles[styleID]);
    }
  };

  var createMarker = function createMarker(placemark, doc) {
    // create a Marker to the map from a placemark KML object
    var icon = placemark.style.icon;

    if (!icon.marker && icon.img) {
      // yay, single point of failure is holding up multiple markers...
      icon.markerBacklog = icon.markerBacklog || [];
      icon.markerBacklog.push([placemark, doc]);
      return;
    }

    // Load basic marker properties
    var markerOptions = geoXML3.combineOptions(parserOptions.markerOptions, {
      map: parserOptions.map,
      position: new google.maps.LatLng(placemark.Point.coordinates[0].lat, placemark.Point.coordinates[0].lng),
      title: placemark.name,
      zIndex: Math.round(placemark.Point.coordinates[0].lat * -100000) << 5,
      icon: icon.marker,
      shadow: icon.shadow,
      flat: !icon.shadow,
      visible: placemark.visibility
    });

    // Create the marker on the map
    var marker = new google.maps.Marker(markerOptions);
    if (!!doc) doc.markers.push(marker);

    // Set up and create the infowindow if it is not suppressed
    createInfoWindow(placemark, doc, marker);
    placemark.marker = marker;
    return marker;
  };

  var createOverlay = function createOverlay(groundOverlay, doc) {
    // Add a ProjectedOverlay to the map from a groundOverlay KML object

    if (!window.ProjectedOverlay) {
      throw 'geoXML3 error: ProjectedOverlay not found while rendering GroundOverlay from KML';
    }

    var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west), new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east));
    var overlayOptions = geoXML3.combineOptions(parserOptions.overlayOptions, { percentOpacity: groundOverlay.opacity * 100 });
    var overlay = new ProjectedOverlay(parserOptions.map, groundOverlay.icon.href, bounds, overlayOptions);

    if (!!doc) {
      doc.ggroundoverlays = doc.ggroundoverlays || [];
      doc.ggroundoverlays.push(overlay);
    }

    return overlay;
  };

  // Create Polyline
  var createPolyline = function createPolyline(placemark, doc) {
    var paths = [];
    var bounds = new google.maps.LatLngBounds();
    for (var j = 0; j < placemark.LineString.length; j++) {
      var path = [];
      var coords = placemark.LineString[j].coordinates;
      for (var i = 0; i < coords.length; i++) {
        var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
        path.push(pt);
        bounds.extend(pt);
      }
      paths.push(path);
    }
    // point to open the infowindow if triggered
    var point = paths[0][Math.floor(path.length / 2)];
    // Load basic polyline properties
    var kmlStrokeColor = kmlColor(placemark.style.line.color, placemark.style.line.colorMode);
    var polyOptions = geoXML3.combineOptions(parserOptions.polylineOptions, {
      map: parserOptions.map,
      path: path,
      strokeColor: kmlStrokeColor.color,
      strokeWeight: placemark.style.line.width,
      strokeOpacity: kmlStrokeColor.opacity,
      title: placemark.name,
      visible: placemark.visibility
    });
    if (paths.length > 1) {
      polyOptions.paths = paths;
      var p = new MultiGeometry(polyOptions);
    } else {
      polyOptions.path = paths[0];
      var p = new google.maps.Polyline(polyOptions);
    }
    p.bounds = bounds;

    // setup and create the infoWindow if it is not suppressed
    createInfoWindow(placemark, doc, p);
    if (!!doc) doc.gpolylines.push(p);
    placemark.polyline = p;
    return p;
  };

  // Create Polygon
  var createPolygon = function createPolygon(placemark, doc) {
    var bounds = new google.maps.LatLngBounds();
    var pathsLength = 0;
    var paths = [];
    for (var polygonPart = 0; polygonPart < placemark.Polygon.length; polygonPart++) {
      for (var j = 0; j < placemark.Polygon[polygonPart].outerBoundaryIs.length; j++) {
        var coords = placemark.Polygon[polygonPart].outerBoundaryIs[j].coordinates;
        var path = [];
        for (var i = 0; i < coords.length; i++) {
          var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
          path.push(pt);
          bounds.extend(pt);
        }
        paths.push(path);
        pathsLength += path.length;
      }
      for (var j = 0; j < placemark.Polygon[polygonPart].innerBoundaryIs.length; j++) {
        var coords = placemark.Polygon[polygonPart].innerBoundaryIs[j].coordinates;
        var path = [];
        for (var i = 0; i < coords.length; i++) {
          var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
          path.push(pt);
          bounds.extend(pt);
        }
        paths.push(path);
        pathsLength += path.length;
      }
    }

    // Load basic polygon properties
    var kmlStrokeColor = kmlColor(placemark.style.line.color, placemark.style.line.colorMode);
    var kmlFillColor = kmlColor(placemark.style.poly.color, placemark.style.poly.colorMode);
    if (!placemark.style.poly.fill) kmlFillColor.opacity = 0.0;
    var strokeWeight = placemark.style.line.width;
    if (!placemark.style.poly.outline) {
      strokeWeight = 0;
      kmlStrokeColor.opacity = 0.0;
    }
    var polyOptions = geoXML3.combineOptions(parserOptions.polygonOptions, {
      map: parserOptions.map,
      paths: paths,
      title: placemark.name,
      strokeColor: kmlStrokeColor.color,
      strokeWeight: strokeWeight,
      strokeOpacity: kmlStrokeColor.opacity,
      fillColor: kmlFillColor.color,
      fillOpacity: kmlFillColor.opacity,
      visible: placemark.visibility
    });
    var p = new google.maps.Polygon(polyOptions);
    p.bounds = bounds;

    createInfoWindow(placemark, doc, p);
    if (!!doc) doc.gpolygons.push(p);
    placemark.polygon = p;
    return p;
  };

  var createInfoWindow = function createInfoWindow(placemark, doc, gObj) {
    var bStyle = placemark.style.balloon;
    var vars = placemark.vars;

    if (!placemark.balloonVisibility || bStyle.displayMode === 'hide') return;

    // define geDirections
    if (placemark.latlng && (!parserOptions.suppressDirections || !parserOptions.suppressDirections)) {
      vars.directions.push('sll=' + placemark.latlng.toUrlValue());

      var url = 'http://maps.google.com/maps?' + vars.directions.join('&');
      var address = encodeURIComponent(vars.val.address || placemark.latlng.toUrlValue()).replace(/\%20/g, '+');

      vars.val.geDirections = '<a href="' + url + '&daddr=' + address + '" target=_blank>To Here</a> - <a href="' + url + '&saddr=' + address + '" target=_blank>From Here</a>';
    } else vars.val.geDirections = '';

    // add in the variables
    var iwText = bStyle.text.replace(/\$\[(\w+(\/displayName)?)\]/g, function (txt, n, dn) {
      return dn ? vars.display[n] : vars.val[n];
    });
    var classTxt = 'geoxml3_infowindow geoxml3_style_' + placemark.styleID;

    // color styles
    var styleArr = [];
    if (bStyle.bgColor != 'ffffffff') styleArr.push('background: ' + kmlColor(bStyle.bgColor).color + ';');
    if (bStyle.textColor != 'ff000000') styleArr.push('color: ' + kmlColor(bStyle.textColor).color + ';');
    var styleProp = styleArr.length ? ' style="' + styleArr.join(' ') + '"' : '';

    var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
      content: '<div class="' + classTxt + '"' + styleProp + '>' + iwText + '</div>',
      pixelOffset: new google.maps.Size(0, 2)
    });

    gObj.infoWindow = parserOptions.infoWindow || new google.maps.InfoWindow(infoWindowOptions);
    gObj.infoWindowOptions = infoWindowOptions;

    // Info Window-opening event handler
    google.maps.event.addListener(gObj, 'click', function (e) {
      var iW = this.infoWindow;
      iW.close();
      iW.setOptions(this.infoWindowOptions);

      if (e && e.latLng) iW.setPosition(e.latLng);else if (this.bounds) iW.setPosition(this.bounds.getCenter());

      iW.setContent("<div id='geoxml3_infowindow'>" + iW.getContent() + "</div>");
      google.maps.event.addListenerOnce(iW, "domready", function () {
        var node = document.getElementById('geoxml3_infowindow');
        var imgArray = node.getElementsByTagName('img');
        for (var i = 0; i < imgArray.length; i++) {
          var imgUrlIE = imgArray[i].getAttribute("src");
          var imgUrl = cleanURL(doc.baseDir, imgUrlIE);

          if (kmzMetaData[imgUrl]) {
            imgArray[i].src = kmzMetaData[imgUrl].dataUrl;
          } else if (kmzMetaData[imgUrlIE]) {
            imgArray[i].src = kmzMetaData[imgUrlIE].dataUrl;
          }
        }
      });
      iW.open(this.map, this.bounds ? null : this);
    });
  };

  return {
    // Expose some properties and methods

    options: parserOptions,
    docs: docs,
    docsByUrl: docsByUrl,
    kmzMetaData: kmzMetaData,

    parse: parse,
    render: render,
    parseKmlString: parseKmlString,
    hideDocument: hideDocument,
    showDocument: showDocument,
    processStyles: processStyles,
    createMarker: createMarker,
    createOverlay: createOverlay,
    createPolyline: createPolyline,
    createPolygon: createPolygon
  };
};
// End of KML Parser

// Helper objects and functions
geoXML3.getOpacity = function (kmlColor) {
  // Extract opacity encoded in a KML color value. Returns a number between 0 and 1.
  if (!!kmlColor && kmlColor !== '' && kmlColor.length == 8) {
    var transparency = parseInt(kmlColor.substr(0, 2), 16);
    return transparency / 255;
  } else {
    return 1;
  }
};

// Log a message to the debugging console, if one exists
geoXML3.log = function (msg) {
  if (!!window.console) {
    console.log(msg);
  } else {
    alert("log:" + msg);
  }
};

/**
 * Creates a new parserOptions object.
 * @class GeoXML3 parser options.
 * @param {Object} overrides Any options you want to declare outside of the defaults should be included here.
 * @property {google.maps.Map} map The API map on which geo objects should be rendered.
 * @property {google.maps.MarkerOptions} markerOptions If the parser is adding Markers to the map itself, any options specified here will be applied to them.
 * @property {google.maps.InfoWindowOptions} infoWindowOptions If the parser is adding Markers to the map itself, any options specified here will be applied to their attached InfoWindows.
 * @property {ProjectedOverlay.options} overlayOptions If the parser is adding ProjectedOverlays to the map itself, any options specified here will be applied to them.
 */
geoXML3.parserOptions = function (overrides) {
  this.map = null,
  /** If true, the parser will automatically move the map to a best-fit of the geodata after parsing of a KML document completes.
   * @type Boolean
   * @default true
   */
  this.zoom = true,
  /**#@+ @type Boolean
   *     @default false */
  /** If true, only a single Marker created by the parser will be able to have its InfoWindow open at once (simulating the behavior of GMaps API v2). */
  this.singleInfoWindow = false,
  /** If true, suppresses the rendering of info windows. */
  this.suppressInfoWindows = false,
  /**
   * Control whether to process styles now or later.
   *
   * <p>By default, the parser only processes KML &lt;Style&gt; elements into their GMaps equivalents
   * if it will be creating its own Markers (the createMarker option is null). Setting this option
   * to true will force such processing to happen anyway, useful if you're going to be calling parser.createMarker
   * yourself later. OTOH, leaving this option false removes runtime dependency on the GMaps API, enabling
   * the use of geoXML3 as a standalone KML parser.</p>
   */
  this.processStyles = false,
  /**#@-*/

  this.markerOptions = {}, this.infoWindowOptions = {}, this.overlayOptions = {},

  /**#@+ @event */
  /** This function will be called when parsing of a KML document is complete.
   * @param {geoXML3.parser#docs} doc Parsed KML data. */
  this.afterParse = null,
  /** This function will be called when parsing of a KML document is complete.
   * @param {geoXML3.parser#docs} doc Parsed KML data. */
  this.failedParse = null,
  /**
   * If supplied, this function will be called once for each marker <Placemark> in the KML document, instead of the parser adding its own Marker to the map.
   * @param {geoXML3.parser.render#placemark} placemark Placemark object.
   * @param {geoXML3.parser#docs} doc Parsed KML data.
   */
  this.createMarker = null,
  /**
   * If supplied, this function will be called once for each <GroundOverlay> in the KML document, instead of the parser adding its own ProjectedOverlay to the map.
   * @param {geoXML3.parser.render#groundOverlay} groundOverlay GroundOverlay object.
   * @param {geoXML3.parser#docs} doc Parsed KML data.
   */
  this.createOverlay = null;
  /**#@-*/

  if (overrides) {
    for (var prop in overrides) {
      if (overrides.hasOwnProperty(prop)) this[prop] = overrides[prop];
    }
  }
  return this;
};

/**
 * Combine two options objects: a set of default values and a set of override values.
 *
 * @deprecated This has been replaced with {@link geoXML3.parserOptions#combineOptions}.
 * @param {geoXML3.parserOptions|Object} overrides Override values.
 * @param {geoXML3.parserOptions|Object} defaults Default values.
 * @return {geoXML3.parserOptions} Combined result.
 */
geoXML3.combineOptions = function (overrides, defaults) {
  var result = {};
  if (!!overrides) {
    for (var prop in overrides) {
      if (overrides.hasOwnProperty(prop)) result[prop] = overrides[prop];
    }
  }
  if (!!defaults) {
    for (prop in defaults) {
      if (defaults.hasOwnProperty(prop) && result[prop] === undefined) result[prop] = defaults[prop];
    }
  }
  return result;
};

/**
 * Combine two options objects: a set of default values and a set of override values.
 *
 * @function
 * @param {geoXML3.parserOptions|Object} overrides Override values.
 * @param {geoXML3.parserOptions|Object} defaults Default values.
 * @return {geoXML3.parserOptions} Combined result.
 */
geoXML3.parserOptions.prototype.combineOptions = geoXML3.combineOptions;

// Retrieve an XML document from url and pass it to callback as a DOM document
geoXML3.fetchers = [];

/**
 * Parses a XML string.
 *
 * <p>Parses the given XML string and returns the parsed document in a
 * DOM data structure. This function will return an empty DOM node if
 * XML parsing is not supported in this browser.</p>
 *
 * @param {String} str XML string.
 * @return {Element|Document} DOM.
 */
geoXML3.xmlParse = function (str) {
  if (typeof ActiveXObject != 'undefined' || "ActiveXObject" in window) {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  }

  if (typeof DOMParser != 'undefined') {
    return new DOMParser().parseFromString(str, 'text/xml');
  }

  return document.createElement('div', null);
};

/**
 * Checks for XML parse error.
 *
 * @param {xmlDOM} XML DOM.
 * @return boolean.
 */
// from http://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross
geoXML3.isParseError = function (parsedDocument) {
  if (typeof ActiveXObject != 'undefined' || "ActiveXObject" in window) return false;
  // parser and parsererrorNS could be cached on startup for efficiency
  var p = new DOMParser(),
      errorneousParse = p.parseFromString('<', 'text/xml'),
      parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

  if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
    // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
    return parsedDocument.getElementsByTagName("parsererror").length > 0;
  }

  return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
};

/**
 * Fetches a XML document.
 *
 * <p>Fetches/parses the given XML URL and passes the parsed document (in a
 * DOM data structure) to the given callback.  Documents are downloaded
 * and parsed asynchronously.</p>
 *
 * @param {String} url URL of XML document.  Must be uncompressed XML only.
 * @param {Function(Document)} callback Function to call when the document is processed.
 */
geoXML3.fetchXML = function (url, callback) {
  function timeoutHandler() {
    callback();
  };

  var xhrFetcher = new Object();
  if (!!geoXML3.fetchers.length) xhrFetcher = geoXML3.fetchers.pop();else if (!!window.XMLHttpRequest) xhrFetcher.fetcher = new window.XMLHttpRequest(); // Most browsers
  else if (!!window.ActiveXObject) {
      // Some IE
      // the many versions of IE's XML fetchers
      var AXOs = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP', 'MSXML.XMLHTTP'];
      for (var i = 0; i < AXOs.length; i++) {
        try {
          xhrFetcher.fetcher = new ActiveXObject(AXOs[i]);break;
        } catch (e) {
          continue;
        }
      }
      if (!xhrFetcher.fetcher) {
        geoXML3.log('Unable to create XHR object');
        callback(null);
        return null;
      }
    }

  xhrFetcher.fetcher.open('GET', url, true);
  if (!!xhrFetcher.fetcher.overrideMimeType) xhrFetcher.fetcher.overrideMimeType('text/xml');
  xhrFetcher.fetcher.onreadystatechange = function () {
    if (xhrFetcher.fetcher.readyState === 4) {
      // Retrieval complete
      if (!!xhrFetcher.xhrtimeout) clearTimeout(xhrFetcher.xhrtimeout);
      if (xhrFetcher.fetcher.status >= 400) {
        geoXML3.log('HTTP error ' + xhrFetcher.fetcher.status + ' retrieving ' + url);
        callback();
      }
      // Returned successfully
      else {
          if (xhrFetcher.fetcher.responseXML) {
            // Sometimes IE will get the data, but won't bother loading it as an XML doc
            var xml = xhrFetcher.fetcher.responseXML;
            if (xml && !xml.documentElement && !xml.ownerElement) {
              xml.loadXML(xhrFetcher.fetcher.responseText);
            }
          } else {
            // handle valid xml sent with wrong MIME type
            xml = geoXML3.xmlParse(xhrFetcher.fetcher.responseText);
          }
          // handle parse errors
          if (xml.parseError && xml.parseError.errorCode != 0) {
            geoXML3.log("XML parse error " + xml.parseError.errorCode + ", " + xml.parseError.reason + "\nLine:" + xml.parseError.line + ", Position:" + xml.parseError.linepos + ", srcText:" + xml.parseError.srcText);
            xml = "failed parse";
          } else if (geoXML3.isParseError(xml)) {
            geoXML3.log("XML parse error");
            xml = "failed parse";
          }
          callback(xml);
        }
      // We're done with this fetcher object
      geoXML3.fetchers.push(xhrFetcher);
    }
  };

  xhrFetcher.xhrtimeout = setTimeout(timeoutHandler, 60000);
  xhrFetcher.fetcher.send(null);
  return null;
};

var IEversion = function IEversion() {
  // http://msdn.microsoft.com/workshop/author/dhtml/overview/browserdetection.asp
  // Returns the version of Internet Explorer or a -1
  // (indicating the use of another browser).
  var rv = -1; // Return value assumes failure
  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent;
    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) {
      rv = parseFloat(RegExp.$1);
    }
  }
  return rv;
};

/**
 * Fetches a KMZ document.
 *
 * <p>Fetches/parses the given ZIP URL, parses each image file, and passes
 * the parsed KML document to the given callback.  Documents are downloaded
 * and parsed asynchronously, though the KML file is always passed after the
 * images have been processed, in case the callback requires the image data.</p>
 *
 * @requires ZipFile.complete.js
 * @param {String} url URL of KMZ document.  Must be a valid KMZ/ZIP archive.
 * @param {Function(Document)} callback Function to call when the document is processed.
 * @param {geoXML3.parser} parser A geoXML3.parser object.  This is used to populate the KMZ image data.
 * @author Brendan Byrd
 * @see http://code.google.com/apis/kml/documentation/kmzarchives.html
 */
geoXML3.fetchZIP = function (url, callback, parser) {
  // Just need a single 'new' declaration with a really long function...
  var zipFile = new ZipFile(url, function (zip) {
    // Retrieval complete

    // Check for ERRORs in zip.status
    for (var i = 0; i < zip.status.length; i++) {
      var msg = zip.status[i];
      if (msg.indexOf("ERROR") == 0) {
        geoXML3.log('HTTP/ZIP error retrieving ' + url + ': ' + msg);
        callback();
        return;
      } else if (msg.indexOf("WARNING") == 0) {
        // non-fatal, but still might be useful
        geoXML3.log('HTTP/ZIP warning retrieving ' + url + ': ' + msg);
      }
    }

    // Make sure KMZ structure is according to spec (with a single KML file in the root dir)
    var KMLCount = 0;
    var KML;
    for (var i = 0; i < zip.entries.length; i++) {
      var name = zip.entries[i].name;
      if (!/\.kml$/.test(name)) continue;

      KMLCount++;
      if (KMLCount == 1) KML = i;else {
        geoXML3.log('KMZ warning retrieving ' + url + ': found extra KML "' + name + '" in KMZ; discarding...');
      }
    }

    // Returned successfully, but still needs extracting
    var baseUrl = cleanURL(defileURL(url), url) + '/';
    var kmlProcessing = { // this is an object just so it gets passed properly
      timer: null,
      extractLeft: 0,
      timerCalls: 0
    };
    var extractCb = function extractCb(entry, entryContent) {
      var mdUrl = cleanURL(baseUrl, entry.name);
      var ext = entry.name.substring(entry.name.lastIndexOf(".") + 1).toLowerCase();
      kmlProcessing.extractLeft--;

      if (typeof entryContent.description == "string" && entryContent.name == "Error") {
        geoXML3.log('KMZ error extracting ' + mdUrl + ': ' + entryContent.description);
        callback();
        return;
      }

      // MIME types that can be used in KML
      var mime;
      if (ext === 'jpg') ext = 'jpeg';
      if (/^(gif|jpeg|png)$/.test(ext)) mime = 'image/' + ext;else if (ext === 'mp3') mime = 'audio/mpeg';else if (ext === 'm4a') mime = 'audio/mp4';else if (ext === 'm4a') mime = 'audio/MP4-LATM';else mime = 'application/octet-stream';

      parser.kmzMetaData[mdUrl] = {};
      parser.kmzMetaData[mdUrl].entry = entry;
      // data:image/gif;base64,R0lGODlhEAAOALMA...
      parser.kmzMetaData[mdUrl].dataUrl = 'data:' + mime + ';base64,' + base64Encode(entryContent);
      // IE cannot handle GET requests beyond 2071 characters, even if it's an inline image
      if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
        if (IEversion() < 8.0 && parser.kmzMetaData[mdUrl].dataUrl.length > 2071 || IEversion < 9.0 && parser.kmzMetaData[mdUrl].dataUrl.length > 32767) {
          parser.kmzMetaData[mdUrl].dataUrl =
          // this is a simple IE icon; to hint at the problem...
          'data:image/gif;base64,R0lGODlhDwAQAOMPADBPvSpQ1Dpoyz1p6FhwvU2A6ECP63CM04CWxYCk+V6x+UK++Jao3rvC3fj7+v///yH5BAEKAA8ALAAAAAAPABAAAASC8Mk5mwCAUMlWwcLRHEelLA' + 'oGDMgzSsiyGCAhCETDPMh5XQCBwYBrNBIKWmg0MCQHj8MJU5IoroYCY6AAAgrDIbbQDGIK6DR5UPhlNo0JAlSUNAiDgH7eNAxEDWAKCQM2AAFheVxYAA0AIkFOJ1gBcQQaUQKKA5w7LpcEBwkJaKMUEQA7';
        }
      }
      parser.kmzMetaData[internalSrc(entry.name)] = parser.kmzMetaData[mdUrl];
    };
    var kmlExtractCb = function kmlExtractCb(entry, entryContent) {
      if (typeof entryContent.description == "string" && entryContent.name == "Error") {
        geoXML3.log('KMZ error extracting ' + mdUrl + ': ' + entryContent.description);
        callback();
        return;
      }

      // check to see if the KML is the last file extracted
      clearTimeout(kmlProcessing.timer);
      if (kmlProcessing.extractLeft <= 1) {
        kmlProcessing.extractLeft--;
        callback(geoXML3.xmlParse(entryContent));
        return;
      } else {
        // KML file isn't last yet; it may need to use those files, so wait a bit (100ms)
        kmlProcessing.timerCalls++;
        if (kmlProcessing.timerCalls < 100) {
          kmlProcessing.timer = setTimeout(function () {
            kmlExtractCb(entry, entryContent);
          }, 100);
        } else {
          geoXML3.log('KMZ warning extracting ' + url + ': entire ZIP has not been extracted after 10 seconds; running through KML, anyway...');
          kmlProcessing.extractLeft--;
          callback(geoXML3.xmlParse(entryContent));
        }
      }
      return;
    };
    for (var i = 0; i < zip.entries.length; i++) {
      var entry = zip.entries[i];
      var ext = entry.name.substring(entry.name.lastIndexOf(".") + 1).toLowerCase();
      if (!/^(gif|jpe?g|png|kml)$/.test(ext)) continue; // not going to bother to extract files we don't support
      if (ext === "kml" && i != KML) continue; // extra KMLs get discarded
      if (!parser && ext != "kml") continue; // cannot store images without a parser object

      // extract asynchronously
      kmlProcessing.extractLeft++;
      if (ext === "kml") entry.extract(kmlExtractCb);else entry.extract(extractCb);
    }
  });
};

/**
 * Extract the text value of a DOM node, with leading and trailing whitespace trimmed.
 *
 * @param {Element} node XML node/element.
 * @param {Any} delVal Default value if the node doesn't exist.
 * @return {String|Null}
 */
geoXML3.nodeValue = function (node, defVal) {
  var retStr = "";
  if (!node) {
    return typeof defVal === 'undefined' || defVal === null ? null : defVal;
  }
  if (node.nodeType == 3 || node.nodeType == 4 || node.nodeType == 2) {
    retStr += node.nodeValue;
  } else if (node.nodeType == 1 || node.nodeType == 9 || node.nodeType == 11) {
    for (var i = 0; i < node.childNodes.length; ++i) {
      retStr += arguments.callee(node.childNodes[i]);
    }
  }
  return retStr;
};

/**
 * Loosely translate various values of a DOM node to a boolean.
 *
 * @param {Element} node XML node/element.
 * @param {Boolean} delVal Default value if the node doesn't exist.
 * @return {Boolean|Null}
 */
geoXML3.getBooleanValue = function (node, defVal) {
  var nodeContents = geoXML3.nodeValue(node);
  if (nodeContents === null) return defVal || false;
  nodeContents = parseInt(nodeContents);
  if (isNaN(nodeContents)) return true;
  if (nodeContents == 0) return false;else return true;
};

/**
 * Browser-normalized version of getElementsByTagNameNS.
 *
 * <p>Required because IE8 doesn't define it.</p>
 *
 * @param {Element|Document} node DOM object.
 * @param {String} namespace Full namespace URL to search against.
 * @param {String} tagname XML local tag name.
 * @return {Array of Elements}
 * @author Brendan Byrd
 */
geoXML3.getElementsByTagNameNS = function (node, namespace, tagname) {
  if (node && typeof node.getElementsByTagNameNS != 'undefined') return node.getElementsByTagNameNS(namespace, tagname);
  if (!node) return [];

  var root = node.documentElement || node.ownerDocument && node.ownerDocument.documentElement;
  if (!root || !root.attributes) return [];

  // search for namespace prefix
  for (var i = 0; i < root.attributes.length; i++) {
    var attr = root.attributes[i];
    if (attr.prefix === 'xmlns' && attr.nodeValue === namespace) return node.getElementsByTagName(attr.baseName + ':' + tagname);else if (attr.nodeName === 'xmlns' && attr.nodeValue === namespace) {
      // default namespace
      if (typeof node.selectNodes != 'undefined') {
        // Newer IEs have the SelectionNamespace property that can be used with selectNodes
        if (!root.ownerDocument.getProperty('SelectionNamespaces')) root.ownerDocument.setProperty('SelectionNamespaces', "xmlns:defaultNS='" + namespace + "'");
        return node.selectNodes('.//defaultNS:' + tagname);
      } else {
        // Otherwise, you can still try to tack on the 'xmlns' attribute to root
        root.setAttribute('xmlns:defaultNS', namespace);
        return node.getElementsByTagName('defaultNS:' + tagname);
      }
    }
  }
  return geoXML3.getElementsByTagName(node, tagname); // try the unqualified version
};

/**
 * Browser-normalized version of getElementsByTagName.
 *
 * <p>Required because MSXML 6.0 will treat this function as a NS-qualified function,
 * despite the missing NS parameter.</p>
 *
 * @param {Element|Document} node DOM object.
 * @param {String} tagname XML local tag name.
 * @return {Array of Elements}
 * @author Brendan Byrd
 */
geoXML3.getElementsByTagName = function (node, tagname) {
  if (node && typeof node.getElementsByTagNameNS != 'undefined') return node.getElementsByTagName(tagname); // if it has both functions, it should be accurate
  //  if (node && typeof node.selectNodes != 'undefined')            return node.selectNodes(".//*[local-name()='" + tagname + "']");
  return node.getElementsByTagName(tagname); // hope for the best...
};

/**
 * Turn a directory + relative URL into an absolute one.
 *
 * @private
 * @param {String} d Base directory.
 * @param {String} s Relative URL.
 * @return {String} Absolute URL.
 * @author Brendan Byrd
 */
var toAbsURL = function toAbsURL(d, s) {
  var p, f, i;
  var h = location.protocol + "://" + location.host;

  if (!s.length) return '';
  if (/^\w+:/.test(s)) return s;
  if (s.indexOf('/') == 0) return h + s;

  p = d.replace(/\/[^\/]*$/, '');
  f = s.match(/\.\.\//g);
  if (f) {
    s = s.substring(f.length * 3);
    for (i = f.length; i--;) {
      p = p.substring(0, p.lastIndexOf('/'));
    }
  }

  return h + p + '/' + s;
};

var internalSrc = function internalSrc(src) {
  //this gets the full url
  var url = document.location.href;
  //this removes everything after the last slash in the path
  url = url.substring(0, url.lastIndexOf("/") + 1);
  var internalPath = url + src;
  return internalPath;
};

/**
 * Remove current host from URL
 *
 * @private
 * @param {String} s Absolute or relative URL.
 * @return {String} Root-based relative URL.
 * @author Brendan Byrd
 */
var dehostURL = function dehostURL(s) {
  var h = location.protocol + "://" + location.host;
  h = h.replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1'); // quotemeta
  return s.replace(new RegExp('^' + h, 'i'), '');
};

/**
 * Removes all query strings, #IDs, '../' references, and
 * hosts from a URL.
 *
 * @private
 * @param {String} d Base directory.
 * @param {String} s Absolute or relative URL.
 * @return {String} Root-based relative URL.
 * @author Brendan Byrd
 */
var cleanURL = function cleanURL(d, s) {
  return dehostURL(toAbsURL(d ? d.split('#')[0].split('?')[0] : defileURL(location.pathname), s ? s.split('#')[0].split('?')[0] : ''));
};
/**
 * Remove filename from URL
 *
 * @private
 * @param {String} s Relative URL.
 * @return {String} Base directory.
 * @author Brendan Byrd
 */
var defileURL = function defileURL(s) {
  return s ? s.substr(0, s.lastIndexOf('/') + 1) : '/';
};

// Some extra Array subs for ease of use
// http://stackoverflow.com/questions/143847/best-way-to-find-an-item-in-a-javascript-array
Array.prototype.hasObject = !Array.indexOf ? function (obj) {
  var l = this.length + 1;
  while (l--) {
    if (this[l - 1] === obj) return true;
  }
  return false;
} : function (obj) {
  return this.indexOf(obj) !== -1;
};
Array.prototype.hasItemInObj = function (name, item) {
  var l = this.length + 1;
  while (l--) {
    if (this[l - 1][name] === item) return true;
  }
  return false;
};
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
      fromIndex = 0;
    } else if (fromIndex < 0) {
      fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
      if (this[i] === obj) return i;
    }
    return -1;
  };
}
Array.prototype.indexOfObjWithItem = function (name, item, fromIndex) {
  if (fromIndex == null) {
    fromIndex = 0;
  } else if (fromIndex < 0) {
    fromIndex = Math.max(0, this.length + fromIndex);
  }
  for (var i = fromIndex, j = this.length; i < j; i++) {
    if (this[i][name] === item) return i;
  }
  return -1;
};

/**
 * Borrowed from jquery.base64.js, with some "Array as input" corrections
 *
 * @private
 * @param {Array of charCodes} input An array of byte ASCII codes (0-255).
 * @return {String} A base64-encoded string.
 * @author Brendan Byrd
 */
var base64Encode = function base64Encode(input) {
  var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  while (i < input.length) {
    chr1 = input[i++];
    chr2 = input[i++];
    chr3 = input[i++];
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
    enc4 = chr3 & 63;

    if (chr2 == undefined) enc3 = enc4 = 64;else if (chr3 == undefined) enc4 = 64;

    output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
  }
  return output;
};

},{}],7:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
function init() {
    var app = app || {};
    app.Map.render('map');
}

function test(Metadata) {
    var args = {};
    var meta = new Metadata(args);
    meta.read();
}

function _getData() {
    kmlLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/dist/data/catchments.kml';
    geojsonLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-map/master/dist/data/data.geojson';
}
exports.init = init;
exports.test = test;

// this.kmlLoc =

app.Api.get(src).then(function (geojson) {
    // if geojson exists, add it
    if (geojson !== undefined) {
        if (typeof geojson == 'string') {
            geojson = JSON.parse(geojson);
        }
    }
    return true;
}, function (error) {
    console.log(error);
    return false;
});

},{}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

// const InfoBubble = require('./infobubble');

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _Metadata = require('./Metadata');

var _Metadata2 = _interopRequireDefault(_Metadata);

var _init = require('./init');

var geoXML3 = require('./geoxml3');

var app = {
    'Api': new _API2['default'](),
    'Map': new _Map2['default'](),
    'Metadata': new _Metadata2['default'](),
    'geoXML3': geoXML3
};

/**
 * Runs the app
 */
var run = function run() {
    (0, _init.init)();
};

window.onload = run;

},{"./API":3,"./Map":4,"./Metadata":5,"./geoxml3":6,"./init":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvalF1ZXJ5L2Rpc3QvanF1ZXJ5LmpzIiwiL1VzZXJzL2ptZW5zY2gvRG9jdW1lbnRzL2xvY2FsL2ptL3BoaWxhZGVscGhpYS1zY2hvb2wtc2VhcmNoL3NyYy9zY3JpcHRzL0FQSS5qcyIsIi9Vc2Vycy9qbWVuc2NoL0RvY3VtZW50cy9sb2NhbC9qbS9waGlsYWRlbHBoaWEtc2Nob29sLXNlYXJjaC9zcmMvc2NyaXB0cy9NYXAuanMiLCIvVXNlcnMvam1lbnNjaC9Eb2N1bWVudHMvbG9jYWwvam0vcGhpbGFkZWxwaGlhLXNjaG9vbC1zZWFyY2gvc3JjL3NjcmlwdHMvTWV0YWRhdGEuanMiLCIvVXNlcnMvam1lbnNjaC9Eb2N1bWVudHMvbG9jYWwvam0vcGhpbGFkZWxwaGlhLXNjaG9vbC1zZWFyY2gvc3JjL3NjcmlwdHMvZ2VveG1sMy5qcyIsIi9Vc2Vycy9qbWVuc2NoL0RvY3VtZW50cy9sb2NhbC9qbS9waGlsYWRlbHBoaWEtc2Nob29sLXNlYXJjaC9zcmMvc2NyaXB0cy9pbml0LmpzIiwiL1VzZXJzL2ptZW5zY2gvRG9jdW1lbnRzL2xvY2FsL2ptL3BoaWxhZGVscGhpYS1zY2hvb2wtc2VhcmNoL3NyYy9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzEvUkEsWUFBWSxDQUFDOzs7Ozs7Ozs7QUFDYixJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBRVAsR0FBRzthQUFI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QUMsRUFBRSxDQUFDLENBQUMsQUFBQyxNQUFNO0tBQ2hEO0FBQ0QsTUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFFLENBQUMsQUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxVQUFVLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksTUFBTSxDQUFDLEVBQUUsQ0FBRSxDQUFDO0FBQzNGLFFBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7O0FBSS9DLFFBQUksUUFBUSxHQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLFFBQUksU0FBUyxHQUFJLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHLElBQUksR0FDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FDbkQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqRyxRQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7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QU8sQ0FBQyxDQUFDO1NBQ2pDO0tBRUo7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmLEVBQ0QsVUFBVSxLQUFLLEVBQUU7QUFDYixXQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25CLFdBQU8sS0FBSyxDQUFDO0NBQ2hCLENBQ0osQ0FBQzs7O0FDdENOLFlBQVksQ0FBQzs7OzttQkFDRyxPQUFPOzs7Ozs7bUJBRVAsT0FBTzs7Ozt3QkFDRixZQUFZOzs7O29CQUNaLFFBQVE7O0FBQzdCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFckMsSUFBTSxHQUFHLEdBQUc7QUFDUixTQUFLLEVBQUUsc0JBQVM7QUFDaEIsU0FBSyxFQUFFLHNCQUFTO0FBQ2hCLGNBQVUsRUFBRSwyQkFBYztBQUMxQixhQUFTLEVBQUUsT0FBTztDQUNyQixDQUFDOzs7OztBQUtGLElBQUksR0FBRyxHQUFHLFNBQU4sR0FBRyxHQUFjO0FBQ2pCLHFCQUFNLENBQUM7Q0FDVixDQUFDOztBQUlGLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIVxuICogalF1ZXJ5IEphdmFTY3JpcHQgTGlicmFyeSB2Mi4xLjRcbiAqIGh0dHA6Ly9qcXVlcnkuY29tL1xuICpcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xuICogaHR0cDovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgMjAwNSwgMjAxNCBqUXVlcnkgRm91bmRhdGlvbiwgSW5jLiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE1LTA0LTI4VDE2OjAxWlxuICovXG5cbihmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuXG5cdGlmICggdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0Ly8gRm9yIENvbW1vbkpTIGFuZCBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB3aGVyZSBhIHByb3BlciBgd2luZG93YFxuXHRcdC8vIGlzIHByZXNlbnQsIGV4ZWN1dGUgdGhlIGZhY3RvcnkgYW5kIGdldCBqUXVlcnkuXG5cdFx0Ly8gRm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBoYXZlIGEgYHdpbmRvd2Agd2l0aCBhIGBkb2N1bWVudGBcblx0XHQvLyAoc3VjaCBhcyBOb2RlLmpzKSwgZXhwb3NlIGEgZmFjdG9yeSBhcyBtb2R1bGUuZXhwb3J0cy5cblx0XHQvLyBUaGlzIGFjY2VudHVhdGVzIHRoZSBuZWVkIGZvciB0aGUgY3JlYXRpb24gb2YgYSByZWFsIGB3aW5kb3dgLlxuXHRcdC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcblx0XHQvLyBTZWUgdGlja2V0ICMxNDU0OSBmb3IgbW9yZSBpbmZvLlxuXHRcdG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmRvY3VtZW50ID9cblx0XHRcdGZhY3RvcnkoIGdsb2JhbCwgdHJ1ZSApIDpcblx0XHRcdGZ1bmN0aW9uKCB3ICkge1xuXHRcdFx0XHRpZiAoICF3LmRvY3VtZW50ICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJqUXVlcnkgcmVxdWlyZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFjdG9yeSggdyApO1xuXHRcdFx0fTtcblx0fSBlbHNlIHtcblx0XHRmYWN0b3J5KCBnbG9iYWwgKTtcblx0fVxuXG4vLyBQYXNzIHRoaXMgaWYgd2luZG93IGlzIG5vdCBkZWZpbmVkIHlldFxufSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oIHdpbmRvdywgbm9HbG9iYWwgKSB7XG5cbi8vIFN1cHBvcnQ6IEZpcmVmb3ggMTgrXG4vLyBDYW4ndCBiZSBpbiBzdHJpY3QgbW9kZSwgc2V2ZXJhbCBsaWJzIGluY2x1ZGluZyBBU1AuTkVUIHRyYWNlXG4vLyB0aGUgc3RhY2sgdmlhIGFyZ3VtZW50cy5jYWxsZXIuY2FsbGVlIGFuZCBGaXJlZm94IGRpZXMgaWZcbi8vIHlvdSB0cnkgdG8gdHJhY2UgdGhyb3VnaCBcInVzZSBzdHJpY3RcIiBjYWxsIGNoYWlucy4gKCMxMzMzNSlcbi8vXG5cbnZhciBhcnIgPSBbXTtcblxudmFyIHNsaWNlID0gYXJyLnNsaWNlO1xuXG52YXIgY29uY2F0ID0gYXJyLmNvbmNhdDtcblxudmFyIHB1c2ggPSBhcnIucHVzaDtcblxudmFyIGluZGV4T2YgPSBhcnIuaW5kZXhPZjtcblxudmFyIGNsYXNzMnR5cGUgPSB7fTtcblxudmFyIHRvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZztcblxudmFyIGhhc093biA9IGNsYXNzMnR5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBzdXBwb3J0ID0ge307XG5cblxuXG52YXJcblx0Ly8gVXNlIHRoZSBjb3JyZWN0IGRvY3VtZW50IGFjY29yZGluZ2x5IHdpdGggd2luZG93IGFyZ3VtZW50IChzYW5kYm94KVxuXHRkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcblxuXHR2ZXJzaW9uID0gXCIyLjEuNFwiLFxuXG5cdC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XG5cdGpRdWVyeSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblx0XHQvLyBUaGUgalF1ZXJ5IG9iamVjdCBpcyBhY3R1YWxseSBqdXN0IHRoZSBpbml0IGNvbnN0cnVjdG9yICdlbmhhbmNlZCdcblx0XHQvLyBOZWVkIGluaXQgaWYgalF1ZXJ5IGlzIGNhbGxlZCAoanVzdCBhbGxvdyBlcnJvciB0byBiZSB0aHJvd24gaWYgbm90IGluY2x1ZGVkKVxuXHRcdHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjFcblx0Ly8gTWFrZSBzdXJlIHdlIHRyaW0gQk9NIGFuZCBOQlNQXG5cdHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLFxuXG5cdC8vIE1hdGNoZXMgZGFzaGVkIHN0cmluZyBmb3IgY2FtZWxpemluZ1xuXHRybXNQcmVmaXggPSAvXi1tcy0vLFxuXHRyZGFzaEFscGhhID0gLy0oW1xcZGEtel0pL2dpLFxuXG5cdC8vIFVzZWQgYnkgalF1ZXJ5LmNhbWVsQ2FzZSBhcyBjYWxsYmFjayB0byByZXBsYWNlKClcblx0ZmNhbWVsQ2FzZSA9IGZ1bmN0aW9uKCBhbGwsIGxldHRlciApIHtcblx0XHRyZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG5cdH07XG5cbmpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgalF1ZXJ5IGJlaW5nIHVzZWRcblx0anF1ZXJ5OiB2ZXJzaW9uLFxuXG5cdGNvbnN0cnVjdG9yOiBqUXVlcnksXG5cblx0Ly8gU3RhcnQgd2l0aCBhbiBlbXB0eSBzZWxlY3RvclxuXHRzZWxlY3RvcjogXCJcIixcblxuXHQvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcblx0bGVuZ3RoOiAwLFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuXHQvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuXHRnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG5cdFx0cmV0dXJuIG51bSAhPSBudWxsID9cblxuXHRcdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuXHRcdFx0KCBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdICkgOlxuXG5cdFx0XHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG5cdFx0XHRzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuXHQvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcblx0cHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cblx0XHQvLyBCdWlsZCBhIG5ldyBqUXVlcnkgbWF0Y2hlZCBlbGVtZW50IHNldFxuXHRcdHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuXHRcdC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXG5cdFx0cmV0LnByZXZPYmplY3QgPSB0aGlzO1xuXHRcdHJldC5jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXG5cdC8vIChZb3UgY2FuIHNlZWQgdGhlIGFyZ3VtZW50cyB3aXRoIGFuIGFycmF5IG9mIGFyZ3MsIGJ1dCB0aGlzIGlzXG5cdC8vIG9ubHkgdXNlZCBpbnRlcm5hbGx5Lilcblx0ZWFjaDogZnVuY3Rpb24oIGNhbGxiYWNrLCBhcmdzICkge1xuXHRcdHJldHVybiBqUXVlcnkuZWFjaCggdGhpcywgY2FsbGJhY2ssIGFyZ3MgKTtcblx0fSxcblxuXHRtYXA6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeS5tYXAodGhpcywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuXHRcdH0pKTtcblx0fSxcblxuXHRzbGljZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBzbGljZS5hcHBseSggdGhpcywgYXJndW1lbnRzICkgKTtcblx0fSxcblxuXHRmaXJzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIDAgKTtcblx0fSxcblxuXHRsYXN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggLTEgKTtcblx0fSxcblxuXHRlcTogZnVuY3Rpb24oIGkgKSB7XG5cdFx0dmFyIGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0aiA9ICtpICsgKCBpIDwgMCA/IGxlbiA6IDAgKTtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGogPj0gMCAmJiBqIDwgbGVuID8gWyB0aGlzW2pdIF0gOiBbXSApO1xuXHR9LFxuXG5cdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKG51bGwpO1xuXHR9LFxuXG5cdC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cblx0Ly8gQmVoYXZlcyBsaWtlIGFuIEFycmF5J3MgbWV0aG9kLCBub3QgbGlrZSBhIGpRdWVyeSBtZXRob2QuXG5cdHB1c2g6IHB1c2gsXG5cdHNvcnQ6IGFyci5zb3J0LFxuXHRzcGxpY2U6IGFyci5zcGxpY2Vcbn07XG5cbmpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cblx0XHQvLyBTa2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWyBpIF0gfHwge307XG5cdFx0aSsrO1xuXHR9XG5cblx0Ly8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXG5cdGlmICggdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIiAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24odGFyZ2V0KSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGkgPT09IGxlbmd0aCApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdGktLTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAoIChvcHRpb25zID0gYXJndW1lbnRzWyBpIF0pICE9IG51bGwgKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBqUXVlcnkuaXNBcnJheShjb3B5KSkgKSApIHtcblx0XHRcdFx0XHRpZiAoIGNvcHlJc0FycmF5ICkge1xuXHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGpRdWVyeS5pc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG5cdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0fSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gY29weTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKHtcblx0Ly8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXG5cdGV4cGFuZG86IFwialF1ZXJ5XCIgKyAoIHZlcnNpb24gKyBNYXRoLnJhbmRvbSgpICkucmVwbGFjZSggL1xcRC9nLCBcIlwiICksXG5cblx0Ly8gQXNzdW1lIGpRdWVyeSBpcyByZWFkeSB3aXRob3V0IHRoZSByZWFkeSBtb2R1bGVcblx0aXNSZWFkeTogdHJ1ZSxcblxuXHRlcnJvcjogZnVuY3Rpb24oIG1zZyApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuXHR9LFxuXG5cdG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cblx0aXNGdW5jdGlvbjogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4galF1ZXJ5LnR5cGUob2JqKSA9PT0gXCJmdW5jdGlvblwiO1xuXHR9LFxuXG5cdGlzQXJyYXk6IEFycmF5LmlzQXJyYXksXG5cblx0aXNXaW5kb3c6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0cmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqLndpbmRvdztcblx0fSxcblxuXHRpc051bWVyaWM6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0Ly8gcGFyc2VGbG9hdCBOYU5zIG51bWVyaWMtY2FzdCBmYWxzZSBwb3NpdGl2ZXMgKG51bGx8dHJ1ZXxmYWxzZXxcIlwiKVxuXHRcdC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcblx0XHQvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cblx0XHQvLyBhZGRpbmcgMSBjb3JyZWN0cyBsb3NzIG9mIHByZWNpc2lvbiBmcm9tIHBhcnNlRmxvYXQgKCMxNTEwMClcblx0XHRyZXR1cm4gIWpRdWVyeS5pc0FycmF5KCBvYmogKSAmJiAob2JqIC0gcGFyc2VGbG9hdCggb2JqICkgKyAxKSA+PSAwO1xuXHR9LFxuXG5cdGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0Ly8gTm90IHBsYWluIG9iamVjdHM6XG5cdFx0Ly8gLSBBbnkgb2JqZWN0IG9yIHZhbHVlIHdob3NlIGludGVybmFsIFtbQ2xhc3NdXSBwcm9wZXJ0eSBpcyBub3QgXCJbb2JqZWN0IE9iamVjdF1cIlxuXHRcdC8vIC0gRE9NIG5vZGVzXG5cdFx0Ly8gLSB3aW5kb3dcblx0XHRpZiAoIGpRdWVyeS50eXBlKCBvYmogKSAhPT0gXCJvYmplY3RcIiB8fCBvYmoubm9kZVR5cGUgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoIG9iai5jb25zdHJ1Y3RvciAmJlxuXHRcdFx0XHQhaGFzT3duLmNhbGwoIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIFwiaXNQcm90b3R5cGVPZlwiICkgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGZ1bmN0aW9uIGhhc24ndCByZXR1cm5lZCBhbHJlYWR5LCB3ZSdyZSBjb25maWRlbnQgdGhhdFxuXHRcdC8vIHxvYmp8IGlzIGEgcGxhaW4gb2JqZWN0LCBjcmVhdGVkIGJ5IHt9IG9yIGNvbnN0cnVjdGVkIHdpdGggbmV3IE9iamVjdFxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIG5hbWU7XG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdHR5cGU6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0aWYgKCBvYmogPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBvYmogKyBcIlwiO1xuXHRcdH1cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMCwgaU9TPDYgKGZ1bmN0aW9uaXNoIFJlZ0V4cClcblx0XHRyZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgP1xuXHRcdFx0Y2xhc3MydHlwZVsgdG9TdHJpbmcuY2FsbChvYmopIF0gfHwgXCJvYmplY3RcIiA6XG5cdFx0XHR0eXBlb2Ygb2JqO1xuXHR9LFxuXG5cdC8vIEV2YWx1YXRlcyBhIHNjcmlwdCBpbiBhIGdsb2JhbCBjb250ZXh0XG5cdGdsb2JhbEV2YWw6IGZ1bmN0aW9uKCBjb2RlICkge1xuXHRcdHZhciBzY3JpcHQsXG5cdFx0XHRpbmRpcmVjdCA9IGV2YWw7XG5cblx0XHRjb2RlID0galF1ZXJ5LnRyaW0oIGNvZGUgKTtcblxuXHRcdGlmICggY29kZSApIHtcblx0XHRcdC8vIElmIHRoZSBjb2RlIGluY2x1ZGVzIGEgdmFsaWQsIHByb2xvZ3VlIHBvc2l0aW9uXG5cdFx0XHQvLyBzdHJpY3QgbW9kZSBwcmFnbWEsIGV4ZWN1dGUgY29kZSBieSBpbmplY3RpbmcgYVxuXHRcdFx0Ly8gc2NyaXB0IHRhZyBpbnRvIHRoZSBkb2N1bWVudC5cblx0XHRcdGlmICggY29kZS5pbmRleE9mKFwidXNlIHN0cmljdFwiKSA9PT0gMSApIHtcblx0XHRcdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblx0XHRcdFx0c2NyaXB0LnRleHQgPSBjb2RlO1xuXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKCBzY3JpcHQgKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzY3JpcHQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBPdGhlcndpc2UsIGF2b2lkIHRoZSBET00gbm9kZSBjcmVhdGlvbiwgaW5zZXJ0aW9uXG5cdFx0XHQvLyBhbmQgcmVtb3ZhbCBieSB1c2luZyBhbiBpbmRpcmVjdCBnbG9iYWwgZXZhbFxuXHRcdFx0XHRpbmRpcmVjdCggY29kZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXG5cdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0Ly8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuXHRjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG5cdH0sXG5cblx0bm9kZU5hbWU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHR9LFxuXG5cdC8vIGFyZ3MgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0ZWFjaDogZnVuY3Rpb24oIG9iaiwgY2FsbGJhY2ssIGFyZ3MgKSB7XG5cdFx0dmFyIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBvYmoubGVuZ3RoLFxuXHRcdFx0aXNBcnJheSA9IGlzQXJyYXlsaWtlKCBvYmogKTtcblxuXHRcdGlmICggYXJncyApIHtcblx0XHRcdGlmICggaXNBcnJheSApIHtcblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjay5hcHBseSggb2JqWyBpIF0sIGFyZ3MgKTtcblxuXHRcdFx0XHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KCBvYmpbIGkgXSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEEgc3BlY2lhbCwgZmFzdCwgY2FzZSBmb3IgdGhlIG1vc3QgY29tbW9uIHVzZSBvZiBlYWNoXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggaXNBcnJheSApIHtcblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKTtcblxuXHRcdFx0XHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApO1xuXG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xXG5cdHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdHJldHVybiB0ZXh0ID09IG51bGwgP1xuXHRcdFx0XCJcIiA6XG5cdFx0XHQoIHRleHQgKyBcIlwiICkucmVwbGFjZSggcnRyaW0sIFwiXCIgKTtcblx0fSxcblxuXHQvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcblx0XHR2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuXHRcdGlmICggYXJyICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlsaWtlKCBPYmplY3QoYXJyKSApICkge1xuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHJldCxcblx0XHRcdFx0XHR0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRbIGFyciBdIDogYXJyXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmNhbGwoIHJldCwgYXJyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHRpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuXHRcdHJldHVybiBhcnIgPT0gbnVsbCA/IC0xIDogaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcblx0fSxcblxuXHRtZXJnZTogZnVuY3Rpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG5cdFx0dmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRpID0gZmlyc3QubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGogXTtcblx0XHR9XG5cblx0XHRmaXJzdC5sZW5ndGggPSBpO1xuXG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9LFxuXG5cdGdyZXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGludmVydCApIHtcblx0XHR2YXIgY2FsbGJhY2tJbnZlcnNlLFxuXHRcdFx0bWF0Y2hlcyA9IFtdLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG5cdFx0Ly8gdGhhdCBwYXNzIHRoZSB2YWxpZGF0b3IgZnVuY3Rpb25cblx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayggZWxlbXNbIGkgXSwgaSApO1xuXHRcdFx0aWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuXHRcdFx0XHRtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0Y2hlcztcblx0fSxcblxuXHQvLyBhcmcgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBhcmcgKSB7XG5cdFx0dmFyIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRpc0FycmF5ID0gaXNBcnJheWxpa2UoIGVsZW1zICksXG5cdFx0XHRyZXQgPSBbXTtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCB0cmFuc2xhdGluZyBlYWNoIG9mIHRoZSBpdGVtcyB0byB0aGVpciBuZXcgdmFsdWVzXG5cdFx0aWYgKCBpc0FycmF5ICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBlbGVtcyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcblx0fSxcblxuXHQvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcblx0Z3VpZDogMSxcblxuXHQvLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcblx0Ly8gYXJndW1lbnRzLlxuXHRwcm94eTogZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuXHRcdHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRtcCA9IGZuWyBjb250ZXh0IF07XG5cdFx0XHRjb250ZXh0ID0gZm47XG5cdFx0XHRmbiA9IHRtcDtcblx0XHR9XG5cblx0XHQvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuXHRcdC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFNpbXVsYXRlZCBiaW5kXG5cdFx0YXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRcdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdFx0cHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKys7XG5cblx0XHRyZXR1cm4gcHJveHk7XG5cdH0sXG5cblx0bm93OiBEYXRlLm5vdyxcblxuXHQvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcblx0Ly8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cblx0c3VwcG9ydDogc3VwcG9ydFxufSk7XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbihpLCBuYW1lKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGlzQXJyYXlsaWtlKCBvYmogKSB7XG5cblx0Ly8gU3VwcG9ydDogaU9TIDguMiAobm90IHJlcHJvZHVjaWJsZSBpbiBzaW11bGF0b3IpXG5cdC8vIGBpbmAgY2hlY2sgdXNlZCB0byBwcmV2ZW50IEpJVCBlcnJvciAoZ2gtMjE0NSlcblx0Ly8gaGFzT3duIGlzbid0IHVzZWQgaGVyZSBkdWUgdG8gZmFsc2UgbmVnYXRpdmVzXG5cdC8vIHJlZ2FyZGluZyBOb2RlbGlzdCBsZW5ndGggaW4gSUVcblx0dmFyIGxlbmd0aCA9IFwibGVuZ3RoXCIgaW4gb2JqICYmIG9iai5sZW5ndGgsXG5cdFx0dHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblxuXHRpZiAoIHR5cGUgPT09IFwiZnVuY3Rpb25cIiB8fCBqUXVlcnkuaXNXaW5kb3coIG9iaiApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmICggb2JqLm5vZGVUeXBlID09PSAxICYmIGxlbmd0aCApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgbGVuZ3RoID09PSAwIHx8XG5cdFx0dHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwICYmICggbGVuZ3RoIC0gMSApIGluIG9iajtcbn1cbnZhciBTaXp6bGUgPVxuLyohXG4gKiBTaXp6bGUgQ1NTIFNlbGVjdG9yIEVuZ2luZSB2Mi4yLjAtcHJlXG4gKiBodHRwOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCAyMDA4LCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTQtMTItMTZcbiAqL1xuKGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbnZhciBpLFxuXHRzdXBwb3J0LFxuXHRFeHByLFxuXHRnZXRUZXh0LFxuXHRpc1hNTCxcblx0dG9rZW5pemUsXG5cdGNvbXBpbGUsXG5cdHNlbGVjdCxcblx0b3V0ZXJtb3N0Q29udGV4dCxcblx0c29ydElucHV0LFxuXHRoYXNEdXBsaWNhdGUsXG5cblx0Ly8gTG9jYWwgZG9jdW1lbnQgdmFyc1xuXHRzZXREb2N1bWVudCxcblx0ZG9jdW1lbnQsXG5cdGRvY0VsZW0sXG5cdGRvY3VtZW50SXNIVE1MLFxuXHRyYnVnZ3lRU0EsXG5cdHJidWdneU1hdGNoZXMsXG5cdG1hdGNoZXMsXG5cdGNvbnRhaW5zLFxuXG5cdC8vIEluc3RhbmNlLXNwZWNpZmljIGRhdGFcblx0ZXhwYW5kbyA9IFwic2l6emxlXCIgKyAxICogbmV3IERhdGUoKSxcblx0cHJlZmVycmVkRG9jID0gd2luZG93LmRvY3VtZW50LFxuXHRkaXJydW5zID0gMCxcblx0ZG9uZSA9IDAsXG5cdGNsYXNzQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHR0b2tlbkNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0Y29tcGlsZXJDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdHNvcnRPcmRlciA9IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiAwO1xuXHR9LFxuXG5cdC8vIEdlbmVyYWwtcHVycG9zZSBjb25zdGFudHNcblx0TUFYX05FR0FUSVZFID0gMSA8PCAzMSxcblxuXHQvLyBJbnN0YW5jZSBtZXRob2RzXG5cdGhhc093biA9ICh7fSkuaGFzT3duUHJvcGVydHksXG5cdGFyciA9IFtdLFxuXHRwb3AgPSBhcnIucG9wLFxuXHRwdXNoX25hdGl2ZSA9IGFyci5wdXNoLFxuXHRwdXNoID0gYXJyLnB1c2gsXG5cdHNsaWNlID0gYXJyLnNsaWNlLFxuXHQvLyBVc2UgYSBzdHJpcHBlZC1kb3duIGluZGV4T2YgYXMgaXQncyBmYXN0ZXIgdGhhbiBuYXRpdmVcblx0Ly8gaHR0cDovL2pzcGVyZi5jb20vdGhvci1pbmRleG9mLXZzLWZvci81XG5cdGluZGV4T2YgPSBmdW5jdGlvbiggbGlzdCwgZWxlbSApIHtcblx0XHR2YXIgaSA9IDAsXG5cdFx0XHRsZW4gPSBsaXN0Lmxlbmd0aDtcblx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGlmICggbGlzdFtpXSA9PT0gZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fSxcblxuXHRib29sZWFucyA9IFwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixcblxuXHQvLyBSZWd1bGFyIGV4cHJlc3Npb25zXG5cblx0Ly8gV2hpdGVzcGFjZSBjaGFyYWN0ZXJzIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXG5cdHdoaXRlc3BhY2UgPSBcIltcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdXCIsXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc3ludGF4LyNjaGFyYWN0ZXJzXG5cdGNoYXJhY3RlckVuY29kaW5nID0gXCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXFxceDAwLVxcXFx4YTBdKStcIixcblxuXHQvLyBMb29zZWx5IG1vZGVsZWQgb24gQ1NTIGlkZW50aWZpZXIgY2hhcmFjdGVyc1xuXHQvLyBBbiB1bnF1b3RlZCB2YWx1ZSBzaG91bGQgYmUgYSBDU1MgaWRlbnRpZmllciBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXNlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuXHQvLyBQcm9wZXIgc3ludGF4OiBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjdmFsdWUtZGVmLWlkZW50aWZpZXJcblx0aWRlbnRpZmllciA9IGNoYXJhY3RlckVuY29kaW5nLnJlcGxhY2UoIFwid1wiLCBcIncjXCIgKSxcblxuXHQvLyBBdHRyaWJ1dGUgc2VsZWN0b3JzOiBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2F0dHJpYnV0ZS1zZWxlY3RvcnNcblx0YXR0cmlidXRlcyA9IFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKSg/OlwiICsgd2hpdGVzcGFjZSArXG5cdFx0Ly8gT3BlcmF0b3IgKGNhcHR1cmUgMilcblx0XHRcIiooWypeJHwhfl0/PSlcIiArIHdoaXRlc3BhY2UgK1xuXHRcdC8vIFwiQXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIENTUyBpZGVudGlmaWVycyBbY2FwdHVyZSA1XSBvciBzdHJpbmdzIFtjYXB0dXJlIDMgb3IgY2FwdHVyZSA0XVwiXG5cdFx0XCIqKD86JygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwifChcIiArIGlkZW50aWZpZXIgKyBcIikpfClcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFwiKlxcXFxdXCIsXG5cblx0cHNldWRvcyA9IFwiOihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpKD86XFxcXCgoXCIgK1xuXHRcdC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XG5cdFx0Ly8gMS4gcXVvdGVkIChjYXB0dXJlIDM7IGNhcHR1cmUgNCBvciBjYXB0dXJlIDUpXG5cdFx0XCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG5cdFx0Ly8gMi4gc2ltcGxlIChjYXB0dXJlIDYpXG5cdFx0XCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIgKyBhdHRyaWJ1dGVzICsgXCIpKil8XCIgK1xuXHRcdC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcblx0XHRcIi4qXCIgK1xuXHRcdFwiKVxcXFwpfClcIixcblxuXHQvLyBMZWFkaW5nIGFuZCBub24tZXNjYXBlZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXB0dXJpbmcgc29tZSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHByZWNlZGluZyB0aGUgbGF0dGVyXG5cdHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuXHRydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArIHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cblx0cmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cdHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXG5cdHJhdHRyaWJ1dGVRdW90ZXMgPSBuZXcgUmVnRXhwKCBcIj1cIiArIHdoaXRlc3BhY2UgKyBcIiooW15cXFxcXSdcXFwiXSo/KVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFxdXCIsIFwiZ1wiICksXG5cblx0cnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcblx0cmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG5cdG1hdGNoRXhwciA9IHtcblx0XHRcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKVwiICksXG5cdFx0XCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKSxcblx0XHRcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBjaGFyYWN0ZXJFbmNvZGluZy5yZXBsYWNlKCBcIndcIiwgXCJ3KlwiICkgKyBcIilcIiApLFxuXHRcdFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcblx0XHRcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcblx0XHRcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWystXXwpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiApLFxuXHRcdFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuXHRcdC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxuXHRcdC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcblx0XHRcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgK1xuXHRcdFx0d2hpdGVzcGFjZSArIFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG5cdH0sXG5cblx0cmlucHV0cyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cblx0cm5hdGl2ZSA9IC9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sXG5cblx0Ly8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXG5cdHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuXHRyc2libGluZyA9IC9bK35dLyxcblx0cmVzY2FwZSA9IC8nfFxcXFwvZyxcblxuXHQvLyBDU1MgZXNjYXBlcyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG5cdHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFwoW1xcXFxkYS1mXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fChcIiArIHdoaXRlc3BhY2UgKyBcIil8LilcIiwgXCJpZ1wiICksXG5cdGZ1bmVzY2FwZSA9IGZ1bmN0aW9uKCBfLCBlc2NhcGVkLCBlc2NhcGVkV2hpdGVzcGFjZSApIHtcblx0XHR2YXIgaGlnaCA9IFwiMHhcIiArIGVzY2FwZWQgLSAweDEwMDAwO1xuXHRcdC8vIE5hTiBtZWFucyBub24tY29kZXBvaW50XG5cdFx0Ly8gU3VwcG9ydDogRmlyZWZveDwyNFxuXHRcdC8vIFdvcmthcm91bmQgZXJyb25lb3VzIG51bWVyaWMgaW50ZXJwcmV0YXRpb24gb2YgK1wiMHhcIlxuXHRcdHJldHVybiBoaWdoICE9PSBoaWdoIHx8IGVzY2FwZWRXaGl0ZXNwYWNlID9cblx0XHRcdGVzY2FwZWQgOlxuXHRcdFx0aGlnaCA8IDAgP1xuXHRcdFx0XHQvLyBCTVAgY29kZXBvaW50XG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggKyAweDEwMDAwICkgOlxuXHRcdFx0XHQvLyBTdXBwbGVtZW50YWwgUGxhbmUgY29kZXBvaW50IChzdXJyb2dhdGUgcGFpcilcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XG5cdH0sXG5cblx0Ly8gVXNlZCBmb3IgaWZyYW1lc1xuXHQvLyBTZWUgc2V0RG9jdW1lbnQoKVxuXHQvLyBSZW1vdmluZyB0aGUgZnVuY3Rpb24gd3JhcHBlciBjYXVzZXMgYSBcIlBlcm1pc3Npb24gRGVuaWVkXCJcblx0Ly8gZXJyb3IgaW4gSUVcblx0dW5sb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXHRcdHNldERvY3VtZW50KCk7XG5cdH07XG5cbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXG50cnkge1xuXHRwdXNoLmFwcGx5KFxuXHRcdChhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApKSxcblx0XHRwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuXHQpO1xuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuXHQvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG5cdGFyclsgcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoIF0ubm9kZVR5cGU7XG59IGNhdGNoICggZSApIHtcblx0cHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG5cdFx0Ly8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHRwdXNoX25hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKGVscykgKTtcblx0XHR9IDpcblxuXHRcdC8vIFN1cHBvcnQ6IElFPDlcblx0XHQvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0dmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuXHRcdFx0XHRpID0gMDtcblx0XHRcdC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuXHRcdFx0d2hpbGUgKCAodGFyZ2V0W2orK10gPSBlbHNbaSsrXSkgKSB7fVxuXHRcdFx0dGFyZ2V0Lmxlbmd0aCA9IGogLSAxO1xuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIG1hdGNoLCBlbGVtLCBtLCBub2RlVHlwZSxcblx0XHQvLyBRU0EgdmFyc1xuXHRcdGksIGdyb3Vwcywgb2xkLCBuaWQsIG5ld0NvbnRleHQsIG5ld1NlbGVjdG9yO1xuXG5cdGlmICggKCBjb250ZXh0ID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBwcmVmZXJyZWREb2MgKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0fVxuXG5cdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblx0bm9kZVR5cGUgPSBjb250ZXh0Lm5vZGVUeXBlO1xuXG5cdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiIHx8ICFzZWxlY3RvciB8fFxuXHRcdG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICYmIG5vZGVUeXBlICE9PSAxMSApIHtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0aWYgKCAhc2VlZCAmJiBkb2N1bWVudElzSFRNTCApIHtcblxuXHRcdC8vIFRyeSB0byBzaG9ydGN1dCBmaW5kIG9wZXJhdGlvbnMgd2hlbiBwb3NzaWJsZSAoZS5nLiwgbm90IHVuZGVyIERvY3VtZW50RnJhZ21lbnQpXG5cdFx0aWYgKCBub2RlVHlwZSAhPT0gMTEgJiYgKG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApKSApIHtcblx0XHRcdC8vIFNwZWVkLXVwOiBTaXp6bGUoXCIjSURcIilcblx0XHRcdGlmICggKG0gPSBtYXRjaFsxXSkgKSB7XG5cdFx0XHRcdGlmICggbm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKTtcblx0XHRcdFx0XHQvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xuXHRcdFx0XHRcdC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgKGpRdWVyeSAjNjk2Mylcblx0XHRcdFx0XHRpZiAoIGVsZW0gJiYgZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIElFLCBPcGVyYSwgYW5kIFdlYmtpdCByZXR1cm4gaXRlbXNcblx0XHRcdFx0XHRcdC8vIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0aWYgKCBlbGVtLmlkID09PSBtICkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBDb250ZXh0IGlzIG5vdCBhIGRvY3VtZW50XG5cdFx0XHRcdFx0aWYgKCBjb250ZXh0Lm93bmVyRG9jdW1lbnQgJiYgKGVsZW0gPSBjb250ZXh0Lm93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgJiZcblx0XHRcdFx0XHRcdGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiYgZWxlbS5pZCA9PT0gbSApIHtcblx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIFNwZWVkLXVwOiBTaXp6bGUoXCJUQUdcIilcblx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWzJdICkge1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBzZWxlY3RvciApICk7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHQvLyBTcGVlZC11cDogU2l6emxlKFwiLkNMQVNTXCIpXG5cdFx0XHR9IGVsc2UgaWYgKCAobSA9IG1hdGNoWzNdKSAmJiBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFFTQSBwYXRoXG5cdFx0aWYgKCBzdXBwb3J0LnFzYSAmJiAoIXJidWdneVFTQSB8fCAhcmJ1Z2d5UVNBLnRlc3QoIHNlbGVjdG9yICkpICkge1xuXHRcdFx0bmlkID0gb2xkID0gZXhwYW5kbztcblx0XHRcdG5ld0NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0bmV3U2VsZWN0b3IgPSBub2RlVHlwZSAhPT0gMSAmJiBzZWxlY3RvcjtcblxuXHRcdFx0Ly8gcVNBIHdvcmtzIHN0cmFuZ2VseSBvbiBFbGVtZW50LXJvb3RlZCBxdWVyaWVzXG5cdFx0XHQvLyBXZSBjYW4gd29yayBhcm91bmQgdGhpcyBieSBzcGVjaWZ5aW5nIGFuIGV4dHJhIElEIG9uIHRoZSByb290XG5cdFx0XHQvLyBhbmQgd29ya2luZyB1cCBmcm9tIHRoZXJlIChUaGFua3MgdG8gQW5kcmV3IER1cG9udCBmb3IgdGhlIHRlY2huaXF1ZSlcblx0XHRcdC8vIElFIDggZG9lc24ndCB3b3JrIG9uIG9iamVjdCBlbGVtZW50c1xuXHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gMSAmJiBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRcdGdyb3VwcyA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXG5cdFx0XHRcdGlmICggKG9sZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKFwiaWRcIikpICkge1xuXHRcdFx0XHRcdG5pZCA9IG9sZC5yZXBsYWNlKCByZXNjYXBlLCBcIlxcXFwkJlwiICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgbmlkICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bmlkID0gXCJbaWQ9J1wiICsgbmlkICsgXCInXSBcIjtcblxuXHRcdFx0XHRpID0gZ3JvdXBzLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0Z3JvdXBzW2ldID0gbmlkICsgdG9TZWxlY3RvciggZ3JvdXBzW2ldICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bmV3Q29udGV4dCA9IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHQ7XG5cdFx0XHRcdG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oXCIsXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIG5ld1NlbGVjdG9yICkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsXG5cdFx0XHRcdFx0XHRuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHR9IGNhdGNoKHFzYUVycm9yKSB7XG5cdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0aWYgKCAhb2xkICkge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBbGwgb3RoZXJzXG5cdHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge0Z1bmN0aW9uKHN0cmluZywgT2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICpcdHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKlx0ZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGtleXMgPSBbXTtcblxuXHRmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcblx0XHQvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxuXHRcdGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcblx0XHR9XG5cdFx0cmV0dXJuIChjYWNoZVsga2V5ICsgXCIgXCIgXSA9IHZhbHVlKTtcblx0fVxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG5cdGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuXHRyZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBkaXYgYW5kIGV4cGVjdHMgYSBib29sZWFuIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhc3NlcnQoIGZuICkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHR0cnkge1xuXHRcdHJldHVybiAhIWZuKCBkaXYgKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBmaW5hbGx5IHtcblx0XHQvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcblx0XHRpZiAoIGRpdi5wYXJlbnROb2RlICkge1xuXHRcdFx0ZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIGRpdiApO1xuXHRcdH1cblx0XHQvLyByZWxlYXNlIG1lbW9yeSBpbiBJRVxuXHRcdGRpdiA9IG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBzYW1lIGhhbmRsZXIgZm9yIGFsbCBvZiB0aGUgc3BlY2lmaWVkIGF0dHJzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcbiAqL1xuZnVuY3Rpb24gYWRkSGFuZGxlKCBhdHRycywgaGFuZGxlciApIHtcblx0dmFyIGFyciA9IGF0dHJzLnNwbGl0KFwifFwiKSxcblx0XHRpID0gYXR0cnMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdEV4cHIuYXR0ckhhbmRsZVsgYXJyW2ldIF0gPSBoYW5kbGVyO1xuXHR9XG59XG5cbi8qKlxuICogQ2hlY2tzIGRvY3VtZW50IG9yZGVyIG9mIHR3byBzaWJsaW5nc1xuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgbGVzcyB0aGFuIDAgaWYgYSBwcmVjZWRlcyBiLCBncmVhdGVyIHRoYW4gMCBpZiBhIGZvbGxvd3MgYlxuICovXG5mdW5jdGlvbiBzaWJsaW5nQ2hlY2soIGEsIGIgKSB7XG5cdHZhciBjdXIgPSBiICYmIGEsXG5cdFx0ZGlmZiA9IGN1ciAmJiBhLm5vZGVUeXBlID09PSAxICYmIGIubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdCggfmIuc291cmNlSW5kZXggfHwgTUFYX05FR0FUSVZFICkgLVxuXHRcdFx0KCB+YS5zb3VyY2VJbmRleCB8fCBNQVhfTkVHQVRJVkUgKTtcblxuXHQvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcblx0aWYgKCBkaWZmICkge1xuXHRcdHJldHVybiBkaWZmO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgYiBmb2xsb3dzIGFcblx0aWYgKCBjdXIgKSB7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLm5leHRTaWJsaW5nKSApIHtcblx0XHRcdGlmICggY3VyID09PSBiICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGEgPyAxIDogLTE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBpbnB1dCB0eXBlc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRQc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiAobmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIpICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIHBvc2l0aW9uYWxzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICovXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmbiApIHtcblx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggYXJndW1lbnQgKSB7XG5cdFx0YXJndW1lbnQgPSArYXJndW1lbnQ7XG5cdFx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcblx0XHRcdHZhciBqLFxuXHRcdFx0XHRtYXRjaEluZGV4ZXMgPSBmbiggW10sIHNlZWQubGVuZ3RoLCBhcmd1bWVudCApLFxuXHRcdFx0XHRpID0gbWF0Y2hJbmRleGVzLmxlbmd0aDtcblxuXHRcdFx0Ly8gTWF0Y2ggZWxlbWVudHMgZm91bmQgYXQgdGhlIHNwZWNpZmllZCBpbmRleGVzXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCBzZWVkWyAoaiA9IG1hdGNoSW5kZXhlc1tpXSkgXSApIHtcblx0XHRcdFx0XHRzZWVkW2pdID0gIShtYXRjaGVzW2pdID0gc2VlZFtqXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcbiAqIEByZXR1cm5zIHtFbGVtZW50fE9iamVjdHxCb29sZWFufSBUaGUgaW5wdXQgbm9kZSBpZiBhY2NlcHRhYmxlLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZVxuICovXG5mdW5jdGlvbiB0ZXN0Q29udGV4dCggY29udGV4dCApIHtcblx0cmV0dXJuIGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29udGV4dDtcbn1cblxuLy8gRXhwb3NlIHN1cHBvcnQgdmFycyBmb3IgY29udmVuaWVuY2VcbnN1cHBvcnQgPSBTaXp6bGUuc3VwcG9ydCA9IHt9O1xuXG4vKipcbiAqIERldGVjdHMgWE1MIG5vZGVzXG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBlbGVtIEFuIGVsZW1lbnQgb3IgYSBkb2N1bWVudFxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWZmIGVsZW0gaXMgYSBub24tSFRNTCBYTUwgbm9kZVxuICovXG5pc1hNTCA9IFNpenpsZS5pc1hNTCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHQvLyBkb2N1bWVudEVsZW1lbnQgaXMgdmVyaWZpZWQgZm9yIGNhc2VzIHdoZXJlIGl0IGRvZXNuJ3QgeWV0IGV4aXN0XG5cdC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxuXHR2YXIgZG9jdW1lbnRFbGVtZW50ID0gZWxlbSAmJiAoZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0pLmRvY3VtZW50RWxlbWVudDtcblx0cmV0dXJuIGRvY3VtZW50RWxlbWVudCA/IGRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgOiBmYWxzZTtcbn07XG5cbi8qKlxuICogU2V0cyBkb2N1bWVudC1yZWxhdGVkIHZhcmlhYmxlcyBvbmNlIGJhc2VkIG9uIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY3VycmVudCBkb2N1bWVudFxuICovXG5zZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKCBub2RlICkge1xuXHR2YXIgaGFzQ29tcGFyZSwgcGFyZW50LFxuXHRcdGRvYyA9IG5vZGUgPyBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSA6IHByZWZlcnJlZERvYztcblxuXHQvLyBJZiBubyBkb2N1bWVudCBhbmQgZG9jdW1lbnRFbGVtZW50IGlzIGF2YWlsYWJsZSwgcmV0dXJuXG5cdGlmICggZG9jID09PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50O1xuXHR9XG5cblx0Ly8gU2V0IG91ciBkb2N1bWVudFxuXHRkb2N1bWVudCA9IGRvYztcblx0ZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cdHBhcmVudCA9IGRvYy5kZWZhdWx0VmlldztcblxuXHQvLyBTdXBwb3J0OiBJRT44XG5cdC8vIElmIGlmcmFtZSBkb2N1bWVudCBpcyBhc3NpZ25lZCB0byBcImRvY3VtZW50XCIgdmFyaWFibGUgYW5kIGlmIGlmcmFtZSBoYXMgYmVlbiByZWxvYWRlZCxcblx0Ly8gSUUgd2lsbCB0aHJvdyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBhY2Nlc3NpbmcgXCJkb2N1bWVudFwiIHZhcmlhYmxlLCBzZWUgalF1ZXJ5ICMxMzkzNlxuXHQvLyBJRTYtOCBkbyBub3Qgc3VwcG9ydCB0aGUgZGVmYXVsdFZpZXcgcHJvcGVydHkgc28gcGFyZW50IHdpbGwgYmUgdW5kZWZpbmVkXG5cdGlmICggcGFyZW50ICYmIHBhcmVudCAhPT0gcGFyZW50LnRvcCApIHtcblx0XHQvLyBJRTExIGRvZXMgbm90IGhhdmUgYXR0YWNoRXZlbnQsIHNvIGFsbCBtdXN0IHN1ZmZlclxuXHRcdGlmICggcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ1bmxvYWRcIiwgdW5sb2FkSGFuZGxlciwgZmFsc2UgKTtcblx0XHR9IGVsc2UgaWYgKCBwYXJlbnQuYXR0YWNoRXZlbnQgKSB7XG5cdFx0XHRwYXJlbnQuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlciApO1xuXHRcdH1cblx0fVxuXG5cdC8qIFN1cHBvcnQgdGVzdHNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRkb2N1bWVudElzSFRNTCA9ICFpc1hNTCggZG9jICk7XG5cblx0LyogQXR0cmlidXRlc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gU3VwcG9ydDogSUU8OFxuXHQvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXNcblx0Ly8gKGV4Y2VwdGluZyBJRTggYm9vbGVhbnMpXG5cdHN1cHBvcnQuYXR0cmlidXRlcyA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdGRpdi5jbGFzc05hbWUgPSBcImlcIjtcblx0XHRyZXR1cm4gIWRpdi5nZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIik7XG5cdH0pO1xuXG5cdC8qIGdldEVsZW1lbnQocylCeSpcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSByZXR1cm5zIG9ubHkgZWxlbWVudHNcblx0c3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdGRpdi5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUNvbW1lbnQoXCJcIikgKTtcblx0XHRyZXR1cm4gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBTdXBwb3J0OiBJRTw5XG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKTtcblxuXHQvLyBTdXBwb3J0OiBJRTwxMFxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcblx0Ly8gVGhlIGJyb2tlbiBnZXRFbGVtZW50QnlJZCBtZXRob2RzIGRvbid0IHBpY2sgdXAgcHJvZ3JhbWF0aWNhbGx5LXNldCBuYW1lcyxcblx0Ly8gc28gdXNlIGEgcm91bmRhYm91dCBnZXRFbGVtZW50c0J5TmFtZSB0ZXN0XG5cdHN1cHBvcnQuZ2V0QnlJZCA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGRpdiApLmlkID0gZXhwYW5kbztcblx0XHRyZXR1cm4gIWRvYy5nZXRFbGVtZW50c0J5TmFtZSB8fCAhZG9jLmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBJRCBmaW5kIGFuZCBmaWx0ZXJcblx0aWYgKCBzdXBwb3J0LmdldEJ5SWQgKSB7XG5cdFx0RXhwci5maW5kW1wiSURcIl0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cdFx0XHRcdC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXG5cdFx0XHRcdC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgIzY5NjNcblx0XHRcdFx0cmV0dXJuIG0gJiYgbS5wYXJlbnROb2RlID8gWyBtIF0gOiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdEV4cHIuZmlsdGVyW1wiSURcIl0gPSBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IGF0dHJJZDtcblx0XHRcdH07XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHQvLyBTdXBwb3J0OiBJRTYvN1xuXHRcdC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcblx0XHRkZWxldGUgRXhwci5maW5kW1wiSURcIl07XG5cblx0XHRFeHByLmZpbHRlcltcIklEXCJdID0gIGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IFwidW5kZWZpbmVkXCIgJiYgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG5cdFx0XHRcdHJldHVybiBub2RlICYmIG5vZGUudmFsdWUgPT09IGF0dHJJZDtcblx0XHRcdH07XG5cdFx0fTtcblx0fVxuXG5cdC8vIFRhZ1xuXHRFeHByLmZpbmRbXCJUQUdcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID9cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG5cdFx0XHQvLyBEb2N1bWVudEZyYWdtZW50IG5vZGVzIGRvbid0IGhhdmUgZ0VCVE5cblx0XHRcdH0gZWxzZSBpZiAoIHN1cHBvcnQucXNhICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgKTtcblx0XHRcdH1cblx0XHR9IDpcblxuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0dG1wID0gW10sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHQvLyBCeSBoYXBweSBjb2luY2lkZW5jZSwgYSAoYnJva2VuKSBnRUJUTiBhcHBlYXJzIG9uIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgdG9vXG5cdFx0XHRcdHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xuXHRcdFx0aWYgKCB0YWcgPT09IFwiKlwiICkge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHR0bXAucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0bXA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHR9O1xuXG5cdC8vIENsYXNzXG5cdEV4cHIuZmluZFtcIkNMQVNTXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGZ1bmN0aW9uKCBjbGFzc05hbWUsIGNvbnRleHQgKSB7XG5cdFx0aWYgKCBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIGNsYXNzTmFtZSApO1xuXHRcdH1cblx0fTtcblxuXHQvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBRU0EgYW5kIG1hdGNoZXNTZWxlY3RvciBzdXBwb3J0XG5cblx0Ly8gbWF0Y2hlc1NlbGVjdG9yKDphY3RpdmUpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChJRTkvT3BlcmEgMTEuNSlcblx0cmJ1Z2d5TWF0Y2hlcyA9IFtdO1xuXG5cdC8vIHFTYSg6Zm9jdXMpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChDaHJvbWUgMjEpXG5cdC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxuXHQvLyB3aGVuZXZlciBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgYWNjZXNzZWQgb24gYW4gaWZyYW1lXG5cdC8vIFNvLCB3ZSBhbGxvdyA6Zm9jdXMgdG8gcGFzcyB0aHJvdWdoIFFTQSBhbGwgdGhlIHRpbWUgdG8gYXZvaWQgdGhlIElFIGVycm9yXG5cdC8vIFNlZSBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM3OFxuXHRyYnVnZ3lRU0EgPSBbXTtcblxuXHRpZiAoIChzdXBwb3J0LnFzYSA9IHJuYXRpdmUudGVzdCggZG9jLnF1ZXJ5U2VsZWN0b3JBbGwgKSkgKSB7XG5cdFx0Ly8gQnVpbGQgUVNBIHJlZ2V4XG5cdFx0Ly8gUmVnZXggc3RyYXRlZ3kgYWRvcHRlZCBmcm9tIERpZWdvIFBlcmluaVxuXHRcdGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdFx0Ly8gU2VsZWN0IGlzIHNldCB0byBlbXB0eSBzdHJpbmcgb24gcHVycG9zZVxuXHRcdFx0Ly8gVGhpcyBpcyB0byB0ZXN0IElFJ3MgdHJlYXRtZW50IG9mIG5vdCBleHBsaWNpdGx5XG5cdFx0XHQvLyBzZXR0aW5nIGEgYm9vbGVhbiBjb250ZW50IGF0dHJpYnV0ZSxcblx0XHRcdC8vIHNpbmNlIGl0cyBwcmVzZW5jZSBzaG91bGQgYmUgZW5vdWdoXG5cdFx0XHQvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZGl2ICkuaW5uZXJIVE1MID0gXCI8YSBpZD0nXCIgKyBleHBhbmRvICsgXCInPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBpZD0nXCIgKyBleHBhbmRvICsgXCItXFxmXScgbXNhbGxvd2NhcHR1cmU9Jyc+XCIgK1xuXHRcdFx0XHRcIjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOCwgT3BlcmEgMTEtMTIuMTZcblx0XHRcdC8vIE5vdGhpbmcgc2hvdWxkIGJlIHNlbGVjdGVkIHdoZW4gZW1wdHkgc3RyaW5ncyBmb2xsb3cgXj0gb3IgJD0gb3IgKj1cblx0XHRcdC8vIFRoZSB0ZXN0IGF0dHJpYnV0ZSBtdXN0IGJlIHVua25vd24gaW4gT3BlcmEgYnV0IFwic2FmZVwiIGZvciBXaW5SVFxuXHRcdFx0Ly8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2hoNDY1Mzg4LmFzcHgjYXR0cmlidXRlX3NlY3Rpb25cblx0XHRcdGlmICggZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbXNhbGxvd2NhcHR1cmVePScnXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuXHRcdFx0aWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooPzp2YWx1ZXxcIiArIGJvb2xlYW5zICsgXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lPDI5LCBBbmRyb2lkPDQuMissIFNhZmFyaTw3LjArLCBpT1M8Ny4wKywgUGhhbnRvbUpTPDEuOS43K1xuXHRcdFx0aWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwifj1cIik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiOmNoZWNrZWRcIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaChcIjpjaGVja2VkXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCssIGlPUyA4K1xuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNjg1MVxuXHRcdFx0Ly8gSW4tcGFnZSBgc2VsZWN0b3IjaWQgc2liaW5nLWNvbWJpbmF0b3Igc2VsZWN0b3JgIGZhaWxzXG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbCggXCJhI1wiICsgZXhwYW5kbyArIFwiKypcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCIuIy4rWyt+XVwiKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdFx0Ly8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXG5cdFx0XHQvLyBUaGUgdHlwZSBhbmQgbmFtZSBhdHRyaWJ1dGVzIGFyZSByZXN0cmljdGVkIGR1cmluZyAuaW5uZXJIVE1MIGFzc2lnbm1lbnRcblx0XHRcdHZhciBpbnB1dCA9IGRvYy5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XG5cdFx0XHRkaXYuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcblx0XHRcdGlmICggZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZT1kXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIipbKl4kfCF+XT89XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRkYgMy41IC0gOmVuYWJsZWQvOmRpc2FibGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGhpZGRlbiBlbGVtZW50cyBhcmUgc3RpbGwgZW5hYmxlZClcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPcGVyYSAxMC0xMSBkb2VzIG5vdCB0aHJvdyBvbiBwb3N0LWNvbW1hIGludmFsaWQgcHNldWRvc1xuXHRcdFx0ZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpO1xuXHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCIsLio6XCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCAoc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoIChtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XG5cdFx0ZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3IpICkpICkge1xuXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3Jcblx0XHRcdC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXG5cdFx0XHRzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBkaXYsIFwiZGl2XCIgKTtcblxuXHRcdFx0Ly8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxuXHRcdFx0Ly8gR2Vja28gZG9lcyBub3QgZXJyb3IsIHJldHVybnMgZmFsc2UgaW5zdGVhZFxuXHRcdFx0bWF0Y2hlcy5jYWxsKCBkaXYsIFwiW3MhPScnXTp4XCIgKTtcblx0XHRcdHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG5cdFx0fSk7XG5cdH1cblxuXHRyYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKFwifFwiKSApO1xuXHRyYnVnZ3lNYXRjaGVzID0gcmJ1Z2d5TWF0Y2hlcy5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5TWF0Y2hlcy5qb2luKFwifFwiKSApO1xuXG5cdC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0aGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG5cdC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuXHQvLyBQdXJwb3NlZnVsbHkgZG9lcyBub3QgaW1wbGVtZW50IGluY2x1c2l2ZSBkZXNjZW5kZW50XG5cdC8vIEFzIGluLCBhbiBlbGVtZW50IGRvZXMgbm90IGNvbnRhaW4gaXRzZWxmXG5cdGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29udGFpbnMgKSA/XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuXHRcdFx0XHRidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcblx0XHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgKFxuXHRcdFx0XHRhZG93bi5jb250YWlucyA/XG5cdFx0XHRcdFx0YWRvd24uY29udGFpbnMoIGJ1cCApIDpcblx0XHRcdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGJ1cCApICYgMTZcblx0XHRcdCkpO1xuXHRcdH0gOlxuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0aWYgKCBiICkge1xuXHRcdFx0XHR3aGlsZSAoIChiID0gYi5wYXJlbnROb2RlKSApIHtcblx0XHRcdFx0XHRpZiAoIGIgPT09IGEgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdC8qIFNvcnRpbmdcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIERvY3VtZW50IG9yZGVyIHNvcnRpbmdcblx0c29ydE9yZGVyID0gaGFzQ29tcGFyZSA/XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXG5cdFx0Ly8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuXHRcdHZhciBjb21wYXJlID0gIWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gLSAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbjtcblx0XHRpZiAoIGNvbXBhcmUgKSB7XG5cdFx0XHRyZXR1cm4gY29tcGFyZTtcblx0XHR9XG5cblx0XHQvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XG5cdFx0Y29tcGFyZSA9ICggYS5vd25lckRvY3VtZW50IHx8IGEgKSA9PT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cblx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuXHRcdFx0MTtcblxuXHRcdC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdGlmICggY29tcGFyZSAmIDEgfHxcblx0XHRcdCghc3VwcG9ydC5zb3J0RGV0YWNoZWQgJiYgYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYSApID09PSBjb21wYXJlKSApIHtcblxuXHRcdFx0Ly8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XG5cdFx0XHRpZiAoIGEgPT09IGRvYyB8fCBhLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGEpICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGIgPT09IGRvYyB8fCBiLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGIpICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcblx0XHRcdHJldHVybiBzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xuXHR9IDpcblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0Ly8gRXhpdCBlYXJseSBpZiB0aGUgbm9kZXMgYXJlIGlkZW50aWNhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRhdXAgPSBhLnBhcmVudE5vZGUsXG5cdFx0XHRidXAgPSBiLnBhcmVudE5vZGUsXG5cdFx0XHRhcCA9IFsgYSBdLFxuXHRcdFx0YnAgPSBbIGIgXTtcblxuXHRcdC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXG5cdFx0aWYgKCAhYXVwIHx8ICFidXAgKSB7XG5cdFx0XHRyZXR1cm4gYSA9PT0gZG9jID8gLTEgOlxuXHRcdFx0XHRiID09PSBkb2MgPyAxIDpcblx0XHRcdFx0YXVwID8gLTEgOlxuXHRcdFx0XHRidXAgPyAxIDpcblx0XHRcdFx0c29ydElucHV0ID9cblx0XHRcdFx0KCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXG5cdFx0Ly8gSWYgdGhlIG5vZGVzIGFyZSBzaWJsaW5ncywgd2UgY2FuIGRvIGEgcXVpY2sgY2hlY2tcblx0XHR9IGVsc2UgaWYgKCBhdXAgPT09IGJ1cCApIHtcblx0XHRcdHJldHVybiBzaWJsaW5nQ2hlY2soIGEsIGIgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2Ugd2UgbmVlZCBmdWxsIGxpc3RzIG9mIHRoZWlyIGFuY2VzdG9ycyBmb3IgY29tcGFyaXNvblxuXHRcdGN1ciA9IGE7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuXHRcdFx0YXAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXHRcdGN1ciA9IGI7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuXHRcdFx0YnAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcblx0XHR3aGlsZSAoIGFwW2ldID09PSBicFtpXSApIHtcblx0XHRcdGkrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gaSA/XG5cdFx0XHQvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3Jcblx0XHRcdHNpYmxpbmdDaGVjayggYXBbaV0sIGJwW2ldICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugbm9kZXMgaW4gb3VyIGRvY3VtZW50IHNvcnQgZmlyc3Rcblx0XHRcdGFwW2ldID09PSBwcmVmZXJyZWREb2MgPyAtMSA6XG5cdFx0XHRicFtpXSA9PT0gcHJlZmVycmVkRG9jID8gMSA6XG5cdFx0XHQwO1xuXHR9O1xuXG5cdHJldHVybiBkb2M7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0cmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0Ly8gTWFrZSBzdXJlIHRoYXQgYXR0cmlidXRlIHNlbGVjdG9ycyBhcmUgcXVvdGVkXG5cdGV4cHIgPSBleHByLnJlcGxhY2UoIHJhdHRyaWJ1dGVRdW90ZXMsIFwiPSckMSddXCIgKTtcblxuXHRpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG5cdFx0KCAhcmJ1Z2d5TWF0Y2hlcyB8fCAhcmJ1Z2d5TWF0Y2hlcy50ZXN0KCBleHByICkgKSAmJlxuXHRcdCggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cblx0XHRcdC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRcdGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcblx0XHRcdFx0XHQvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxuXHRcdFx0XHRcdC8vIGZyYWdtZW50IGluIElFIDlcblx0XHRcdFx0XHRlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHt9XG5cdH1cblxuXHRyZXR1cm4gU2l6emxlKCBleHByLCBkb2N1bWVudCwgbnVsbCwgWyBlbGVtIF0gKS5sZW5ndGggPiAwO1xufTtcblxuU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0fVxuXHRyZXR1cm4gY29udGFpbnMoIGNvbnRleHQsIGVsZW0gKTtcbn07XG5cblNpenpsZS5hdHRyID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0fVxuXG5cdHZhciBmbiA9IEV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG5cdFx0Ly8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG5cdFx0dmFsID0gZm4gJiYgaGFzT3duLmNhbGwoIEV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0Zm4oIGVsZW0sIG5hbWUsICFkb2N1bWVudElzSFRNTCApIDpcblx0XHRcdHVuZGVmaW5lZDtcblxuXHRyZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgP1xuXHRcdHZhbCA6XG5cdFx0c3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApIDpcblx0XHRcdCh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUobmFtZSkpICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xufTtcblxuU2l6emxlLmVycm9yID0gZnVuY3Rpb24oIG1zZyApIHtcblx0dGhyb3cgbmV3IEVycm9yKCBcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFwiICsgbXNnICk7XG59O1xuXG4vKipcbiAqIERvY3VtZW50IHNvcnRpbmcgYW5kIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7QXJyYXlMaWtlfSByZXN1bHRzXG4gKi9cblNpenpsZS51bmlxdWVTb3J0ID0gZnVuY3Rpb24oIHJlc3VsdHMgKSB7XG5cdHZhciBlbGVtLFxuXHRcdGR1cGxpY2F0ZXMgPSBbXSxcblx0XHRqID0gMCxcblx0XHRpID0gMDtcblxuXHQvLyBVbmxlc3Mgd2UgKmtub3cqIHdlIGNhbiBkZXRlY3QgZHVwbGljYXRlcywgYXNzdW1lIHRoZWlyIHByZXNlbmNlXG5cdGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XG5cdHNvcnRJbnB1dCA9ICFzdXBwb3J0LnNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuXHRyZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xuXG5cdGlmICggaGFzRHVwbGljYXRlICkge1xuXHRcdHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuXHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRyZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG5cdHNvcnRJbnB1dCA9IG51bGw7XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cbiAqL1xuZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHZhciBub2RlLFxuXHRcdHJldCA9IFwiXCIsXG5cdFx0aSA9IDAsXG5cdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdGlmICggIW5vZGVUeXBlICkge1xuXHRcdC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG5cdFx0d2hpbGUgKCAobm9kZSA9IGVsZW1baSsrXSkgKSB7XG5cdFx0XHQvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuXHRcdFx0cmV0ICs9IGdldFRleHQoIG5vZGUgKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAxIHx8IG5vZGVUeXBlID09PSA5IHx8IG5vZGVUeXBlID09PSAxMSApIHtcblx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0Ly8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1Mylcblx0XHRpZiAoIHR5cGVvZiBlbGVtLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdHJldCArPSBnZXRUZXh0KCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG5cdH1cblx0Ly8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cblx0cmV0dXJuIHJldDtcbn07XG5cbkV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzID0ge1xuXG5cdC8vIENhbiBiZSBhZGp1c3RlZCBieSB0aGUgdXNlclxuXHRjYWNoZUxlbmd0aDogNTAsXG5cblx0Y3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXG5cblx0bWF0Y2g6IG1hdGNoRXhwcixcblxuXHRhdHRySGFuZGxlOiB7fSxcblxuXHRmaW5kOiB7fSxcblxuXHRyZWxhdGl2ZToge1xuXHRcdFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCIgXCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiB9LFxuXHRcdFwiK1wiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxuXHR9LFxuXG5cdHByZUZpbHRlcjoge1xuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdC8vIE1vdmUgdGhlIGdpdmVuIHZhbHVlIHRvIG1hdGNoWzNdIHdoZXRoZXIgcXVvdGVkIG9yIHVucXVvdGVkXG5cdFx0XHRtYXRjaFszXSA9ICggbWF0Y2hbM10gfHwgbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIiApLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdGlmICggbWF0Y2hbMl0gPT09IFwifj1cIiApIHtcblx0XHRcdFx0bWF0Y2hbM10gPSBcIiBcIiArIG1hdGNoWzNdICsgXCIgXCI7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgNCApO1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuXHRcdFx0XHQxIHR5cGUgKG9ubHl8bnRofC4uLilcblx0XHRcdFx0MiB3aGF0IChjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHQzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuXHRcdFx0XHQ0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcblx0XHRcdFx0NSBzaWduIG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ2IHggb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuXHRcdFx0XHQ4IHkgb2YgeS1jb21wb25lbnRcblx0XHRcdCovXG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGlmICggbWF0Y2hbMV0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcblx0XHRcdFx0Ly8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcblx0XHRcdFx0aWYgKCAhbWF0Y2hbM10gKSB7XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG5cdFx0XHRcdC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcblx0XHRcdFx0bWF0Y2hbNF0gPSArKCBtYXRjaFs0XSA/IG1hdGNoWzVdICsgKG1hdGNoWzZdIHx8IDEpIDogMiAqICggbWF0Y2hbM10gPT09IFwiZXZlblwiIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICkgKTtcblx0XHRcdFx0bWF0Y2hbNV0gPSArKCAoIG1hdGNoWzddICsgbWF0Y2hbOF0gKSB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApO1xuXG5cdFx0XHQvLyBvdGhlciB0eXBlcyBwcm9oaWJpdCBhcmd1bWVudHNcblx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWzNdICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaDtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0dmFyIGV4Y2Vzcyxcblx0XHRcdFx0dW5xdW90ZWQgPSAhbWF0Y2hbNl0gJiYgbWF0Y2hbMl07XG5cblx0XHRcdGlmICggbWF0Y2hFeHByW1wiQ0hJTERcIl0udGVzdCggbWF0Y2hbMF0gKSApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXG5cdFx0XHRpZiAoIG1hdGNoWzNdICkge1xuXHRcdFx0XHRtYXRjaFsyXSA9IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCI7XG5cblx0XHRcdC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcblx0XHRcdFx0Ly8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcblx0XHRcdFx0KGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApKSAmJlxuXHRcdFx0XHQvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcblx0XHRcdFx0KGV4Y2VzcyA9IHVucXVvdGVkLmluZGV4T2YoIFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MgKSAtIHVucXVvdGVkLmxlbmd0aCkgKSB7XG5cblx0XHRcdFx0Ly8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcblx0XHRcdFx0bWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHRcdG1hdGNoWzJdID0gdW5xdW90ZWQuc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgMyApO1xuXHRcdH1cblx0fSxcblxuXHRmaWx0ZXI6IHtcblxuXHRcdFwiVEFHXCI6IGZ1bmN0aW9uKCBub2RlTmFtZVNlbGVjdG9yICkge1xuXHRcdFx0dmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lO1xuXHRcdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNMQVNTXCI6IGZ1bmN0aW9uKCBjbGFzc05hbWUgKSB7XG5cdFx0XHR2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGNsYXNzTmFtZSArIFwiIFwiIF07XG5cblx0XHRcdHJldHVybiBwYXR0ZXJuIHx8XG5cdFx0XHRcdChwYXR0ZXJuID0gbmV3IFJlZ0V4cCggXCIoXnxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIGNsYXNzTmFtZSArIFwiKFwiICsgd2hpdGVzcGFjZSArIFwifCQpXCIgKSkgJiZcblx0XHRcdFx0Y2xhc3NDYWNoZSggY2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gcGF0dGVybi50ZXN0KCB0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHwgdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIiApO1xuXHRcdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHRcdGlmICggcmVzdWx0ID09IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhb3BlcmF0b3IgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcIjtcblxuXHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0LnJlcGxhY2UoIHJ3aGl0ZXNwYWNlLCBcIiBcIiApICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcblx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIGFyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcblx0XHRcdHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXG5cdFx0XHRcdGZvcndhcmQgPSB0eXBlLnNsaWNlKCAtNCApICE9PSBcImxhc3RcIixcblx0XHRcdFx0b2ZUeXBlID0gd2hhdCA9PT0gXCJvZi10eXBlXCI7XG5cblx0XHRcdHJldHVybiBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwID9cblxuXHRcdFx0XHQvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiAhIWVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0fSA6XG5cblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgY2FjaGUsIG91dGVyQ2FjaGUsIG5vZGUsIGRpZmYsIG5vZGVJbmRleCwgc3RhcnQsXG5cdFx0XHRcdFx0XHRkaXIgPSBzaW1wbGUgIT09IGZvcndhcmQgPyBcIm5leHRTaWJsaW5nXCIgOiBcInByZXZpb3VzU2libGluZ1wiLFxuXHRcdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxuXHRcdFx0XHRcdFx0bmFtZSA9IG9mVHlwZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHR1c2VDYWNoZSA9ICF4bWwgJiYgIW9mVHlwZTtcblxuXHRcdFx0XHRcdGlmICggcGFyZW50ICkge1xuXG5cdFx0XHRcdFx0XHQvLyA6KGZpcnN0fGxhc3R8b25seSktKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdFx0XHRpZiAoIHNpbXBsZSApIHtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCBkaXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9IG5vZGVbIGRpciBdKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggb2ZUeXBlID8gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDogbm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcblx0XHRcdFx0XHRcdFx0XHRzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0ID0gWyBmb3J3YXJkID8gcGFyZW50LmZpcnN0Q2hpbGQgOiBwYXJlbnQubGFzdENoaWxkIF07XG5cblx0XHRcdFx0XHRcdC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXG5cdFx0XHRcdFx0XHRpZiAoIGZvcndhcmQgJiYgdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxuXHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gcGFyZW50WyBleHBhbmRvIF0gfHwgKHBhcmVudFsgZXhwYW5kbyBdID0ge30pO1xuXHRcdFx0XHRcdFx0XHRjYWNoZSA9IG91dGVyQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbMF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbMV07XG5cdFx0XHRcdFx0XHRcdGRpZmYgPSBjYWNoZVswXSA9PT0gZGlycnVucyAmJiBjYWNoZVsyXTtcblx0XHRcdFx0XHRcdFx0bm9kZSA9IG5vZGVJbmRleCAmJiBwYXJlbnQuY2hpbGROb2Rlc1sgbm9kZUluZGV4IF07XG5cblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHNlZWtpbmcgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0KGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBXaGVuIGZvdW5kLCBjYWNoZSBpbmRleGVzIG9uIGBwYXJlbnRgIGFuZCBicmVha1xuXHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiArK2RpZmYgJiYgbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgbm9kZUluZGV4LCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB1c2VDYWNoZSAmJiAoY2FjaGUgPSAoZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSkpWyB0eXBlIF0pICYmIGNhY2hlWzBdID09PSBkaXJydW5zICkge1xuXHRcdFx0XHRcdFx0XHRkaWZmID0gY2FjaGVbMV07XG5cblx0XHRcdFx0XHRcdC8vIHhtbCA6bnRoLWNoaWxkKC4uLikgb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSBzYW1lIGxvb3AgYXMgYWJvdmUgdG8gc2VlayBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblx0XHRcdFx0XHRcdFx0XHQoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdGlmICggKCBvZlR5cGUgPyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOiBub2RlLm5vZGVUeXBlID09PSAxICkgJiYgKytkaWZmICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0KG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pKVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEluY29ycG9yYXRlIHRoZSBvZmZzZXQsIHRoZW4gY2hlY2sgYWdhaW5zdCBjeWNsZSBzaXplXG5cdFx0XHRcdFx0XHRkaWZmIC09IGxhc3Q7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlmZiA9PT0gZmlyc3QgfHwgKCBkaWZmICUgZmlyc3QgPT09IDAgJiYgZGlmZiAvIGZpcnN0ID49IDAgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuXHRcdFx0Ly8gcHNldWRvLWNsYXNzIG5hbWVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXG5cdFx0XHQvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xuXHRcdFx0Ly8gUmVtZW1iZXIgdGhhdCBzZXRGaWx0ZXJzIGluaGVyaXRzIGZyb20gcHNldWRvc1xuXHRcdFx0dmFyIGFyZ3MsXG5cdFx0XHRcdGZuID0gRXhwci5wc2V1ZG9zWyBwc2V1ZG8gXSB8fCBFeHByLnNldEZpbHRlcnNbIHBzZXVkby50b0xvd2VyQ2FzZSgpIF0gfHxcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIHBzZXVkbyApO1xuXG5cdFx0XHQvLyBUaGUgdXNlciBtYXkgdXNlIGNyZWF0ZVBzZXVkbyB0byBpbmRpY2F0ZSB0aGF0XG5cdFx0XHQvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxuXHRcdFx0Ly8ganVzdCBhcyBTaXp6bGUgZG9lc1xuXHRcdFx0aWYgKCBmblsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRyZXR1cm4gZm4oIGFyZ3VtZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1dCBtYWludGFpbiBzdXBwb3J0IGZvciBvbGQgc2lnbmF0dXJlc1xuXHRcdFx0aWYgKCBmbi5sZW5ndGggPiAxICkge1xuXHRcdFx0XHRhcmdzID0gWyBwc2V1ZG8sIHBzZXVkbywgXCJcIiwgYXJndW1lbnQgXTtcblx0XHRcdFx0cmV0dXJuIEV4cHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eSggcHNldWRvLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0XHRcdFx0dmFyIGlkeCxcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuXHRcdFx0XHRcdFx0XHRpID0gbWF0Y2hlZC5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWR4ID0gaW5kZXhPZiggc2VlZCwgbWF0Y2hlZFtpXSApO1xuXHRcdFx0XHRcdFx0XHRzZWVkWyBpZHggXSA9ICEoIG1hdGNoZXNbIGlkeCBdID0gbWF0Y2hlZFtpXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pIDpcblx0XHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbiggZWxlbSwgMCwgYXJncyApO1xuXHRcdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbjtcblx0XHR9XG5cdH0sXG5cblx0cHNldWRvczoge1xuXHRcdC8vIFBvdGVudGlhbGx5IGNvbXBsZXggcHNldWRvc1xuXHRcdFwibm90XCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHQvLyBUcmltIHRoZSBzZWxlY3RvciBwYXNzZWQgdG8gY29tcGlsZVxuXHRcdFx0Ly8gdG8gYXZvaWQgdHJlYXRpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmdcblx0XHRcdC8vIHNwYWNlcyBhcyBjb21iaW5hdG9yc1xuXHRcdFx0dmFyIGlucHV0ID0gW10sXG5cdFx0XHRcdHJlc3VsdHMgPSBbXSxcblx0XHRcdFx0bWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSApO1xuXG5cdFx0XHRyZXR1cm4gbWF0Y2hlclsgZXhwYW5kbyBdID9cblx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQgPSBtYXRjaGVyKCBzZWVkLCBudWxsLCB4bWwsIFtdICksXG5cdFx0XHRcdFx0XHRpID0gc2VlZC5sZW5ndGg7XG5cblx0XHRcdFx0XHQvLyBNYXRjaCBlbGVtZW50cyB1bm1hdGNoZWQgYnkgYG1hdGNoZXJgXG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcblx0XHRcdFx0XHRcdFx0c2VlZFtpXSA9ICEobWF0Y2hlc1tpXSA9IGVsZW0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkgOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdGlucHV0WzBdID0gZWxlbTtcblx0XHRcdFx0XHRtYXRjaGVyKCBpbnB1dCwgbnVsbCwgeG1sLCByZXN1bHRzICk7XG5cdFx0XHRcdFx0Ly8gRG9uJ3Qga2VlcCB0aGUgZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdFx0XHRpbnB1dFswXSA9IG51bGw7XG5cdFx0XHRcdFx0cmV0dXJuICFyZXN1bHRzLnBvcCgpO1xuXHRcdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0XCJoYXNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIFNpenpsZSggc2VsZWN0b3IsIGVsZW0gKS5sZW5ndGggPiAwO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdFwiY29udGFpbnNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBlbGVtLmlubmVyVGV4dCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHQvLyBcIldoZXRoZXIgYW4gZWxlbWVudCBpcyByZXByZXNlbnRlZCBieSBhIDpsYW5nKCkgc2VsZWN0b3Jcblx0XHQvLyBpcyBiYXNlZCBzb2xlbHkgb24gdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZVxuXHRcdC8vIGJlaW5nIGVxdWFsIHRvIHRoZSBpZGVudGlmaWVyIEMsXG5cdFx0Ly8gb3IgYmVnaW5uaW5nIHdpdGggdGhlIGlkZW50aWZpZXIgQyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBcIi1cIi5cblx0XHQvLyBUaGUgbWF0Y2hpbmcgb2YgQyBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWUgaXMgcGVyZm9ybWVkIGNhc2UtaW5zZW5zaXRpdmVseS5cblx0XHQvLyBUaGUgaWRlbnRpZmllciBDIGRvZXMgbm90IGhhdmUgdG8gYmUgYSB2YWxpZCBsYW5ndWFnZSBuYW1lLlwiXG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNsYW5nLXBzZXVkb1xuXHRcdFwibGFuZ1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBsYW5nICkge1xuXHRcdFx0Ly8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxuXHRcdFx0aWYgKCAhcmlkZW50aWZpZXIudGVzdChsYW5nIHx8IFwiXCIpICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XG5cdFx0XHR9XG5cdFx0XHRsYW5nID0gbGFuZy5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBlbGVtTGFuZztcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdGlmICggKGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0XHRcdFx0ZWxlbS5sYW5nIDpcblx0XHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIikgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpKSApIHtcblxuXHRcdFx0XHRcdFx0ZWxlbUxhbmcgPSBlbGVtTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1MYW5nID09PSBsYW5nIHx8IGVsZW1MYW5nLmluZGV4T2YoIGxhbmcgKyBcIi1cIiApID09PSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSB3aGlsZSAoIChlbGVtID0gZWxlbS5wYXJlbnROb2RlKSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHQvLyBNaXNjZWxsYW5lb3VzXG5cdFx0XCJ0YXJnZXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcblx0XHRcdHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoIDEgKSA9PT0gZWxlbS5pZDtcblx0XHR9LFxuXG5cdFx0XCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG5cdFx0fSxcblxuXHRcdFwiZm9jdXNcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIWRvY3VtZW50Lmhhc0ZvY3VzIHx8IGRvY3VtZW50Lmhhc0ZvY3VzKCkpICYmICEhKGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgfHwgfmVsZW0udGFiSW5kZXgpO1xuXHRcdH0sXG5cblx0XHQvLyBCb29sZWFuIHByb3BlcnRpZXNcblx0XHRcImVuYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2U7XG5cdFx0fSxcblxuXHRcdFwiZGlzYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0XCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gSW4gQ1NTMywgOmNoZWNrZWQgc2hvdWxkIHJldHVybiBib3RoIGNoZWNrZWQgYW5kIHNlbGVjdGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0dmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIChub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmICEhZWxlbS5jaGVja2VkKSB8fCAobm9kZU5hbWUgPT09IFwib3B0aW9uXCIgJiYgISFlbGVtLnNlbGVjdGVkKTtcblx0XHR9LFxuXG5cdFx0XCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcblx0XHRcdC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRlbGVtLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uc2VsZWN0ZWQgPT09IHRydWU7XG5cdFx0fSxcblxuXHRcdC8vIENvbnRlbnRzXG5cdFx0XCJlbXB0eVwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jZW1wdHktcHNldWRvXG5cdFx0XHQvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXG5cdFx0XHQvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxuXHRcdFx0Ly8gbm9kZVR5cGUgPCA2IHdvcmtzIGJlY2F1c2UgYXR0cmlidXRlcyAoMikgZG8gbm90IGFwcGVhciBhcyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA8IDYgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0XCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gIUV4cHIucHNldWRvc1tcImVtcHR5XCJdKCBlbGVtICk7XG5cdFx0fSxcblxuXHRcdC8vIEVsZW1lbnQvaW5wdXQgdHlwZXNcblx0XHRcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJpbnB1dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XG5cdFx0fSxcblxuXHRcdFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBhdHRyO1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG5cdFx0XHRcdGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCIgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTw4XG5cdFx0XHRcdC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG5cdFx0XHRcdCggKGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09IG51bGwgfHwgYXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXG5cdFx0XCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgMCBdO1xuXHRcdH0pLFxuXG5cdFx0XCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIFsgbGVuZ3RoIC0gMSBdO1xuXHRcdH0pLFxuXG5cdFx0XCJlcVwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG5cdFx0fSksXG5cblx0XHRcImV2ZW5cIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMTtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyAtLWkgPj0gMDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJndFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pXG5cdH1cbn07XG5cbkV4cHIucHNldWRvc1tcIm50aFwiXSA9IEV4cHIucHNldWRvc1tcImVxXCJdO1xuXG4vLyBBZGQgYnV0dG9uL2lucHV0IHR5cGUgcHNldWRvc1xuZm9yICggaSBpbiB7IHJhZGlvOiB0cnVlLCBjaGVja2JveDogdHJ1ZSwgZmlsZTogdHJ1ZSwgcGFzc3dvcmQ6IHRydWUsIGltYWdlOiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlSW5wdXRQc2V1ZG8oIGkgKTtcbn1cbmZvciAoIGkgaW4geyBzdWJtaXQ6IHRydWUsIHJlc2V0OiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlQnV0dG9uUHNldWRvKCBpICk7XG59XG5cbi8vIEVhc3kgQVBJIGZvciBjcmVhdGluZyBuZXcgc2V0RmlsdGVyc1xuZnVuY3Rpb24gc2V0RmlsdGVycygpIHt9XG5zZXRGaWx0ZXJzLnByb3RvdHlwZSA9IEV4cHIuZmlsdGVycyA9IEV4cHIucHNldWRvcztcbkV4cHIuc2V0RmlsdGVycyA9IG5ldyBzZXRGaWx0ZXJzKCk7XG5cbnRva2VuaXplID0gU2l6emxlLnRva2VuaXplID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBwYXJzZU9ubHkgKSB7XG5cdHZhciBtYXRjaGVkLCBtYXRjaCwgdG9rZW5zLCB0eXBlLFxuXHRcdHNvRmFyLCBncm91cHMsIHByZUZpbHRlcnMsXG5cdFx0Y2FjaGVkID0gdG9rZW5DYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggY2FjaGVkICkge1xuXHRcdHJldHVybiBwYXJzZU9ubHkgPyAwIDogY2FjaGVkLnNsaWNlKCAwICk7XG5cdH1cblxuXHRzb0ZhciA9IHNlbGVjdG9yO1xuXHRncm91cHMgPSBbXTtcblx0cHJlRmlsdGVycyA9IEV4cHIucHJlRmlsdGVyO1xuXG5cdHdoaWxlICggc29GYXIgKSB7XG5cblx0XHQvLyBDb21tYSBhbmQgZmlyc3QgcnVuXG5cdFx0aWYgKCAhbWF0Y2hlZCB8fCAobWF0Y2ggPSByY29tbWEuZXhlYyggc29GYXIgKSkgKSB7XG5cdFx0XHRpZiAoIG1hdGNoICkge1xuXHRcdFx0XHQvLyBEb24ndCBjb25zdW1lIHRyYWlsaW5nIGNvbW1hcyBhcyB2YWxpZFxuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaFswXS5sZW5ndGggKSB8fCBzb0Zhcjtcblx0XHRcdH1cblx0XHRcdGdyb3Vwcy5wdXNoKCAodG9rZW5zID0gW10pICk7XG5cdFx0fVxuXG5cdFx0bWF0Y2hlZCA9IGZhbHNlO1xuXG5cdFx0Ly8gQ29tYmluYXRvcnNcblx0XHRpZiAoIChtYXRjaCA9IHJjb21iaW5hdG9ycy5leGVjKCBzb0ZhciApKSApIHtcblx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0dG9rZW5zLnB1c2goe1xuXHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0Ly8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXG5cdFx0XHRcdHR5cGU6IG1hdGNoWzBdLnJlcGxhY2UoIHJ0cmltLCBcIiBcIiApXG5cdFx0XHR9KTtcblx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmlsdGVyc1xuXHRcdGZvciAoIHR5cGUgaW4gRXhwci5maWx0ZXIgKSB7XG5cdFx0XHRpZiAoIChtYXRjaCA9IG1hdGNoRXhwclsgdHlwZSBdLmV4ZWMoIHNvRmFyICkpICYmICghcHJlRmlsdGVyc1sgdHlwZSBdIHx8XG5cdFx0XHRcdChtYXRjaCA9IHByZUZpbHRlcnNbIHR5cGUgXSggbWF0Y2ggKSkpICkge1xuXHRcdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdFx0bWF0Y2hlczogbWF0Y2hcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCAhbWF0Y2hlZCApIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbGVuZ3RoIG9mIHRoZSBpbnZhbGlkIGV4Y2Vzc1xuXHQvLyBpZiB3ZSdyZSBqdXN0IHBhcnNpbmdcblx0Ly8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXG5cdHJldHVybiBwYXJzZU9ubHkgP1xuXHRcdHNvRmFyLmxlbmd0aCA6XG5cdFx0c29GYXIgP1xuXHRcdFx0U2l6emxlLmVycm9yKCBzZWxlY3RvciApIDpcblx0XHRcdC8vIENhY2hlIHRoZSB0b2tlbnNcblx0XHRcdHRva2VuQ2FjaGUoIHNlbGVjdG9yLCBncm91cHMgKS5zbGljZSggMCApO1xufTtcblxuZnVuY3Rpb24gdG9TZWxlY3RvciggdG9rZW5zICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRzZWxlY3RvciA9IFwiXCI7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdHNlbGVjdG9yICs9IHRva2Vuc1tpXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG5cdHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcblx0XHRjaGVja05vbkVsZW1lbnRzID0gYmFzZSAmJiBkaXIgPT09IFwicGFyZW50Tm9kZVwiLFxuXHRcdGRvbmVOYW1lID0gZG9uZSsrO1xuXG5cdHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSA6XG5cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGFsbCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudHNcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIG9sZENhY2hlLCBvdXRlckNhY2hlLFxuXHRcdFx0XHRuZXdDYWNoZSA9IFsgZGlycnVucywgZG9uZU5hbWUgXTtcblxuXHRcdFx0Ly8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gZGlyIGNhY2hpbmdcblx0XHRcdGlmICggeG1sICkge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IGVsZW1bIGV4cGFuZG8gXSB8fCAoZWxlbVsgZXhwYW5kbyBdID0ge30pO1xuXHRcdFx0XHRcdFx0aWYgKCAob2xkQ2FjaGUgPSBvdXRlckNhY2hlWyBkaXIgXSkgJiZcblx0XHRcdFx0XHRcdFx0b2xkQ2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBvbGRDYWNoZVsgMSBdID09PSBkb25lTmFtZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBc3NpZ24gdG8gbmV3Q2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZVsgZGlyIF0gPSBuZXdDYWNoZTtcblxuXHRcdFx0XHRcdFx0XHQvLyBBIG1hdGNoIG1lYW5zIHdlJ3JlIGRvbmU7IGEgZmFpbCBtZWFucyB3ZSBoYXZlIHRvIGtlZXAgY2hlY2tpbmdcblx0XHRcdFx0XHRcdFx0aWYgKCAobmV3Q2FjaGVbIDIgXSA9IG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApIHtcblx0cmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgaSA9IG1hdGNoZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoICFtYXRjaGVyc1tpXSggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IDpcblx0XHRtYXRjaGVyc1swXTtcbn1cblxuZnVuY3Rpb24gbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gY29udGV4dHMubGVuZ3RoO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0c1tpXSwgcmVzdWx0cyApO1xuXHR9XG5cdHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBjb25kZW5zZSggdW5tYXRjaGVkLCBtYXAsIGZpbHRlciwgY29udGV4dCwgeG1sICkge1xuXHR2YXIgZWxlbSxcblx0XHRuZXdVbm1hdGNoZWQgPSBbXSxcblx0XHRpID0gMCxcblx0XHRsZW4gPSB1bm1hdGNoZWQubGVuZ3RoLFxuXHRcdG1hcHBlZCA9IG1hcCAhPSBudWxsO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuXHRcdFx0aWYgKCAhZmlsdGVyIHx8IGZpbHRlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdG5ld1VubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdGlmICggbWFwcGVkICkge1xuXHRcdFx0XHRcdG1hcC5wdXNoKCBpICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbmV3VW5tYXRjaGVkO1xufVxuXG5mdW5jdGlvbiBzZXRNYXRjaGVyKCBwcmVGaWx0ZXIsIHNlbGVjdG9yLCBtYXRjaGVyLCBwb3N0RmlsdGVyLCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKSB7XG5cdGlmICggcG9zdEZpbHRlciAmJiAhcG9zdEZpbHRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaWx0ZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmlsdGVyICk7XG5cdH1cblx0aWYgKCBwb3N0RmluZGVyICYmICFwb3N0RmluZGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbmRlciA9IHNldE1hdGNoZXIoIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApO1xuXHR9XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIHJlc3VsdHMsIGNvbnRleHQsIHhtbCApIHtcblx0XHR2YXIgdGVtcCwgaSwgZWxlbSxcblx0XHRcdHByZU1hcCA9IFtdLFxuXHRcdFx0cG9zdE1hcCA9IFtdLFxuXHRcdFx0cHJlZXhpc3RpbmcgPSByZXN1bHRzLmxlbmd0aCxcblxuXHRcdFx0Ly8gR2V0IGluaXRpYWwgZWxlbWVudHMgZnJvbSBzZWVkIG9yIGNvbnRleHRcblx0XHRcdGVsZW1zID0gc2VlZCB8fCBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciB8fCBcIipcIiwgY29udGV4dC5ub2RlVHlwZSA/IFsgY29udGV4dCBdIDogY29udGV4dCwgW10gKSxcblxuXHRcdFx0Ly8gUHJlZmlsdGVyIHRvIGdldCBtYXRjaGVyIGlucHV0LCBwcmVzZXJ2aW5nIGEgbWFwIGZvciBzZWVkLXJlc3VsdHMgc3luY2hyb25pemF0aW9uXG5cdFx0XHRtYXRjaGVySW4gPSBwcmVGaWx0ZXIgJiYgKCBzZWVkIHx8ICFzZWxlY3RvciApID9cblx0XHRcdFx0Y29uZGVuc2UoIGVsZW1zLCBwcmVNYXAsIHByZUZpbHRlciwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRlbGVtcyxcblxuXHRcdFx0bWF0Y2hlck91dCA9IG1hdGNoZXIgP1xuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIGEgcG9zdEZpbmRlciwgb3IgZmlsdGVyZWQgc2VlZCwgb3Igbm9uLXNlZWQgcG9zdEZpbHRlciBvciBwcmVleGlzdGluZyByZXN1bHRzLFxuXHRcdFx0XHRwb3N0RmluZGVyIHx8ICggc2VlZCA/IHByZUZpbHRlciA6IHByZWV4aXN0aW5nIHx8IHBvc3RGaWx0ZXIgKSA/XG5cblx0XHRcdFx0XHQvLyAuLi5pbnRlcm1lZGlhdGUgcHJvY2Vzc2luZyBpcyBuZWNlc3Nhcnlcblx0XHRcdFx0XHRbXSA6XG5cblx0XHRcdFx0XHQvLyAuLi5vdGhlcndpc2UgdXNlIHJlc3VsdHMgZGlyZWN0bHlcblx0XHRcdFx0XHRyZXN1bHRzIDpcblx0XHRcdFx0bWF0Y2hlckluO1xuXG5cdFx0Ly8gRmluZCBwcmltYXJ5IG1hdGNoZXNcblx0XHRpZiAoIG1hdGNoZXIgKSB7XG5cdFx0XHRtYXRjaGVyKCBtYXRjaGVySW4sIG1hdGNoZXJPdXQsIGNvbnRleHQsIHhtbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHBvc3RGaWx0ZXJcblx0XHRpZiAoIHBvc3RGaWx0ZXIgKSB7XG5cdFx0XHR0ZW1wID0gY29uZGVuc2UoIG1hdGNoZXJPdXQsIHBvc3RNYXAgKTtcblx0XHRcdHBvc3RGaWx0ZXIoIHRlbXAsIFtdLCBjb250ZXh0LCB4bWwgKTtcblxuXHRcdFx0Ly8gVW4tbWF0Y2ggZmFpbGluZyBlbGVtZW50cyBieSBtb3ZpbmcgdGhlbSBiYWNrIHRvIG1hdGNoZXJJblxuXHRcdFx0aSA9IHRlbXAubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggKGVsZW0gPSB0ZW1wW2ldKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyT3V0WyBwb3N0TWFwW2ldIF0gPSAhKG1hdGNoZXJJblsgcG9zdE1hcFtpXSBdID0gZWxlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgfHwgcHJlRmlsdGVyICkge1xuXHRcdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cdFx0XHRcdFx0Ly8gR2V0IHRoZSBmaW5hbCBtYXRjaGVyT3V0IGJ5IGNvbmRlbnNpbmcgdGhpcyBpbnRlcm1lZGlhdGUgaW50byBwb3N0RmluZGVyIGNvbnRleHRzXG5cdFx0XHRcdFx0dGVtcCA9IFtdO1xuXHRcdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSApIHtcblx0XHRcdFx0XHRcdFx0Ly8gUmVzdG9yZSBtYXRjaGVySW4gc2luY2UgZWxlbSBpcyBub3QgeWV0IGEgZmluYWwgbWF0Y2hcblx0XHRcdFx0XHRcdFx0dGVtcC5wdXNoKCAobWF0Y2hlckluW2ldID0gZWxlbSkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgKG1hdGNoZXJPdXQgPSBbXSksIHRlbXAsIHhtbCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTW92ZSBtYXRjaGVkIGVsZW1lbnRzIGZyb20gc2VlZCB0byByZXN1bHRzIHRvIGtlZXAgdGhlbSBzeW5jaHJvbml6ZWRcblx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgJiZcblx0XHRcdFx0XHRcdCh0ZW1wID0gcG9zdEZpbmRlciA/IGluZGV4T2YoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFtpXSkgPiAtMSApIHtcblxuXHRcdFx0XHRcdFx0c2VlZFt0ZW1wXSA9ICEocmVzdWx0c1t0ZW1wXSA9IGVsZW0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXJPdXQgPSBjb25kZW5zZShcblx0XHRcdFx0bWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XG5cdFx0XHRcdFx0bWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcblx0XHRcdFx0XHRtYXRjaGVyT3V0XG5cdFx0XHQpO1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIG1hdGNoZXJPdXQgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zICkge1xuXHR2YXIgY2hlY2tDb250ZXh0LCBtYXRjaGVyLCBqLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0bGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzBdLnR5cGUgXSxcblx0XHRpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbXCIgXCJdLFxuXHRcdGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcblxuXHRcdC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG5cdFx0bWF0Y2hDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBpbmRleE9mKCBjaGVja0NvbnRleHQsIGVsZW0gKSA+IC0xO1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaGVycyA9IFsgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciByZXQgPSAoICFsZWFkaW5nUmVsYXRpdmUgJiYgKCB4bWwgfHwgY29udGV4dCAhPT0gb3V0ZXJtb3N0Q29udGV4dCApICkgfHwgKFxuXHRcdFx0XHQoY2hlY2tDb250ZXh0ID0gY29udGV4dCkubm9kZVR5cGUgP1xuXHRcdFx0XHRcdG1hdGNoQ29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRcdG1hdGNoQW55Q29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgKTtcblx0XHRcdC8vIEF2b2lkIGhhbmdpbmcgb250byBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0Y2hlY2tDb250ZXh0ID0gbnVsbDtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSBdO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKG1hdGNoZXIgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbaV0udHlwZSBdKSApIHtcblx0XHRcdG1hdGNoZXJzID0gWyBhZGRDb21iaW5hdG9yKGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLCBtYXRjaGVyKSBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyID0gRXhwci5maWx0ZXJbIHRva2Vuc1tpXS50eXBlIF0uYXBwbHkoIG51bGwsIHRva2Vuc1tpXS5tYXRjaGVzICk7XG5cblx0XHRcdC8vIFJldHVybiBzcGVjaWFsIHVwb24gc2VlaW5nIGEgcG9zaXRpb25hbCBtYXRjaGVyXG5cdFx0XHRpZiAoIG1hdGNoZXJbIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0Ly8gRmluZCB0aGUgbmV4dCByZWxhdGl2ZSBvcGVyYXRvciAoaWYgYW55KSBmb3IgcHJvcGVyIGhhbmRsaW5nXG5cdFx0XHRcdGogPSArK2k7XG5cdFx0XHRcdGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuXHRcdFx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2pdLnR5cGUgXSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc2V0TWF0Y2hlcihcblx0XHRcdFx0XHRpID4gMSAmJiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSxcblx0XHRcdFx0XHRpID4gMSAmJiB0b1NlbGVjdG9yKFxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlIHByZWNlZGluZyB0b2tlbiB3YXMgYSBkZXNjZW5kYW50IGNvbWJpbmF0b3IsIGluc2VydCBhbiBpbXBsaWNpdCBhbnktZWxlbWVudCBgKmBcblx0XHRcdFx0XHRcdHRva2Vucy5zbGljZSggMCwgaSAtIDEgKS5jb25jYXQoeyB2YWx1ZTogdG9rZW5zWyBpIC0gMiBdLnR5cGUgPT09IFwiIFwiID8gXCIqXCIgOiBcIlwiIH0pXG5cdFx0XHRcdFx0KS5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksXG5cdFx0XHRcdFx0bWF0Y2hlcixcblx0XHRcdFx0XHRpIDwgaiAmJiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zLnNsaWNlKCBpLCBqICkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIG1hdGNoZXJGcm9tVG9rZW5zKCAodG9rZW5zID0gdG9rZW5zLnNsaWNlKCBqICkpICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlcnMucHVzaCggbWF0Y2hlciApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkge1xuXHR2YXIgYnlTZXQgPSBzZXRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdGJ5RWxlbWVudCA9IGVsZW1lbnRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdHN1cGVyTWF0Y2hlciA9IGZ1bmN0aW9uKCBzZWVkLCBjb250ZXh0LCB4bWwsIHJlc3VsdHMsIG91dGVybW9zdCApIHtcblx0XHRcdHZhciBlbGVtLCBqLCBtYXRjaGVyLFxuXHRcdFx0XHRtYXRjaGVkQ291bnQgPSAwLFxuXHRcdFx0XHRpID0gXCIwXCIsXG5cdFx0XHRcdHVubWF0Y2hlZCA9IHNlZWQgJiYgW10sXG5cdFx0XHRcdHNldE1hdGNoZWQgPSBbXSxcblx0XHRcdFx0Y29udGV4dEJhY2t1cCA9IG91dGVybW9zdENvbnRleHQsXG5cdFx0XHRcdC8vIFdlIG11c3QgYWx3YXlzIGhhdmUgZWl0aGVyIHNlZWQgZWxlbWVudHMgb3Igb3V0ZXJtb3N0IGNvbnRleHRcblx0XHRcdFx0ZWxlbXMgPSBzZWVkIHx8IGJ5RWxlbWVudCAmJiBFeHByLmZpbmRbXCJUQUdcIl0oIFwiKlwiLCBvdXRlcm1vc3QgKSxcblx0XHRcdFx0Ly8gVXNlIGludGVnZXIgZGlycnVucyBpZmYgdGhpcyBpcyB0aGUgb3V0ZXJtb3N0IG1hdGNoZXJcblx0XHRcdFx0ZGlycnVuc1VuaXF1ZSA9IChkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSksXG5cdFx0XHRcdGxlbiA9IGVsZW1zLmxlbmd0aDtcblxuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0ICE9PSBkb2N1bWVudCAmJiBjb250ZXh0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgcGFzc2luZyBlbGVtZW50TWF0Y2hlcnMgZGlyZWN0bHkgdG8gcmVzdWx0c1xuXHRcdFx0Ly8gS2VlcCBgaWAgYSBzdHJpbmcgaWYgdGhlcmUgYXJlIG5vIGVsZW1lbnRzIHNvIGBtYXRjaGVkQ291bnRgIHdpbGwgYmUgXCIwMFwiIGJlbG93XG5cdFx0XHQvLyBTdXBwb3J0OiBJRTw5LCBTYWZhcmlcblx0XHRcdC8vIFRvbGVyYXRlIE5vZGVMaXN0IHByb3BlcnRpZXMgKElFOiBcImxlbmd0aFwiOyBTYWZhcmk6IDxudW1iZXI+KSBtYXRjaGluZyBlbGVtZW50cyBieSBpZFxuXHRcdFx0Zm9yICggOyBpICE9PSBsZW4gJiYgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGJ5RWxlbWVudCAmJiBlbGVtICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbaisrXSkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHJhY2sgdW5tYXRjaGVkIGVsZW1lbnRzIGZvciBzZXQgZmlsdGVyc1xuXHRcdFx0XHRpZiAoIGJ5U2V0ICkge1xuXHRcdFx0XHRcdC8vIFRoZXkgd2lsbCBoYXZlIGdvbmUgdGhyb3VnaCBhbGwgcG9zc2libGUgbWF0Y2hlcnNcblx0XHRcdFx0XHRpZiAoIChlbGVtID0gIW1hdGNoZXIgJiYgZWxlbSkgKSB7XG5cdFx0XHRcdFx0XHRtYXRjaGVkQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBMZW5ndGhlbiB0aGUgYXJyYXkgZm9yIGV2ZXJ5IGVsZW1lbnQsIG1hdGNoZWQgb3Igbm90XG5cdFx0XHRcdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0XHRcdFx0dW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQXBwbHkgc2V0IGZpbHRlcnMgdG8gdW5tYXRjaGVkIGVsZW1lbnRzXG5cdFx0XHRtYXRjaGVkQ291bnQgKz0gaTtcblx0XHRcdGlmICggYnlTZXQgJiYgaSAhPT0gbWF0Y2hlZENvdW50ICkge1xuXHRcdFx0XHRqID0gMDtcblx0XHRcdFx0d2hpbGUgKCAobWF0Y2hlciA9IHNldE1hdGNoZXJzW2orK10pICkge1xuXHRcdFx0XHRcdG1hdGNoZXIoIHVubWF0Y2hlZCwgc2V0TWF0Y2hlZCwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0Ly8gUmVpbnRlZ3JhdGUgZWxlbWVudCBtYXRjaGVzIHRvIGVsaW1pbmF0ZSB0aGUgbmVlZCBmb3Igc29ydGluZ1xuXHRcdFx0XHRcdGlmICggbWF0Y2hlZENvdW50ID4gMCApIHtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoICEodW5tYXRjaGVkW2ldIHx8IHNldE1hdGNoZWRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHRcdHNldE1hdGNoZWRbaV0gPSBwb3AuY2FsbCggcmVzdWx0cyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRGlzY2FyZCBpbmRleCBwbGFjZWhvbGRlciB2YWx1ZXMgdG8gZ2V0IG9ubHkgYWN0dWFsIG1hdGNoZXNcblx0XHRcdFx0XHRzZXRNYXRjaGVkID0gY29uZGVuc2UoIHNldE1hdGNoZWQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2V0TWF0Y2hlZCApO1xuXG5cdFx0XHRcdC8vIFNlZWRsZXNzIHNldCBtYXRjaGVzIHN1Y2NlZWRpbmcgbXVsdGlwbGUgc3VjY2Vzc2Z1bCBtYXRjaGVycyBzdGlwdWxhdGUgc29ydGluZ1xuXHRcdFx0XHRpZiAoIG91dGVybW9zdCAmJiAhc2VlZCAmJiBzZXRNYXRjaGVkLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHQoIG1hdGNoZWRDb3VudCArIHNldE1hdGNoZXJzLmxlbmd0aCApID4gMSApIHtcblxuXHRcdFx0XHRcdFNpenpsZS51bmlxdWVTb3J0KCByZXN1bHRzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gT3ZlcnJpZGUgbWFuaXB1bGF0aW9uIG9mIGdsb2JhbHMgYnkgbmVzdGVkIG1hdGNoZXJzXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW5tYXRjaGVkO1xuXHRcdH07XG5cblx0cmV0dXJuIGJ5U2V0ID9cblx0XHRtYXJrRnVuY3Rpb24oIHN1cGVyTWF0Y2hlciApIDpcblx0XHRzdXBlck1hdGNoZXI7XG59XG5cbmNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgbWF0Y2ggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdHZhciBpLFxuXHRcdHNldE1hdGNoZXJzID0gW10sXG5cdFx0ZWxlbWVudE1hdGNoZXJzID0gW10sXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggIWNhY2hlZCApIHtcblx0XHQvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIG9mIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBlYWNoIGVsZW1lbnRcblx0XHRpZiAoICFtYXRjaCApIHtcblx0XHRcdG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0fVxuXHRcdGkgPSBtYXRjaC5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRjYWNoZWQgPSBtYXRjaGVyRnJvbVRva2VucyggbWF0Y2hbaV0gKTtcblx0XHRcdGlmICggY2FjaGVkWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHNldE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhY2hlIHRoZSBjb21waWxlZCBmdW5jdGlvblxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGUoIHNlbGVjdG9yLCBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSApO1xuXG5cdFx0Ly8gU2F2ZSBzZWxlY3RvciBhbmQgdG9rZW5pemF0aW9uXG5cdFx0Y2FjaGVkLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdH1cblx0cmV0dXJuIGNhY2hlZDtcbn07XG5cbi8qKlxuICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIEEgc2VsZWN0b3Igb3IgYSBwcmUtY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRleHRcbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHRzXVxuICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcbiAqL1xuc2VsZWN0ID0gU2l6emxlLnNlbGVjdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIGksIHRva2VucywgdG9rZW4sIHR5cGUsIGZpbmQsXG5cdFx0Y29tcGlsZWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxlY3Rvcixcblx0XHRtYXRjaCA9ICFzZWVkICYmIHRva2VuaXplKCAoc2VsZWN0b3IgPSBjb21waWxlZC5zZWxlY3RvciB8fCBzZWxlY3RvcikgKTtcblxuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuXHQvLyBUcnkgdG8gbWluaW1pemUgb3BlcmF0aW9ucyBpZiB0aGVyZSBpcyBubyBzZWVkIGFuZCBvbmx5IG9uZSBncm91cFxuXHRpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcblxuXHRcdC8vIFRha2UgYSBzaG9ydGN1dCBhbmQgc2V0IHRoZSBjb250ZXh0IGlmIHRoZSByb290IHNlbGVjdG9yIGlzIGFuIElEXG5cdFx0dG9rZW5zID0gbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCApO1xuXHRcdGlmICggdG9rZW5zLmxlbmd0aCA+IDIgJiYgKHRva2VuID0gdG9rZW5zWzBdKS50eXBlID09PSBcIklEXCIgJiZcblx0XHRcdFx0c3VwcG9ydC5nZXRCeUlkICYmIGNvbnRleHQubm9kZVR5cGUgPT09IDkgJiYgZG9jdW1lbnRJc0hUTUwgJiZcblx0XHRcdFx0RXhwci5yZWxhdGl2ZVsgdG9rZW5zWzFdLnR5cGUgXSApIHtcblxuXHRcdFx0Y29udGV4dCA9ICggRXhwci5maW5kW1wiSURcIl0oIHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZShydW5lc2NhcGUsIGZ1bmVzY2FwZSksIGNvbnRleHQgKSB8fCBbXSApWzBdO1xuXHRcdFx0aWYgKCAhY29udGV4dCApIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdC8vIFByZWNvbXBpbGVkIG1hdGNoZXJzIHdpbGwgc3RpbGwgdmVyaWZ5IGFuY2VzdHJ5LCBzbyBzdGVwIHVwIGEgbGV2ZWxcblx0XHRcdH0gZWxzZSBpZiAoIGNvbXBpbGVkICkge1xuXHRcdFx0XHRjb250ZXh0ID0gY29udGV4dC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWxlY3RvciA9IHNlbGVjdG9yLnNsaWNlKCB0b2tlbnMuc2hpZnQoKS52YWx1ZS5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGZXRjaCBhIHNlZWQgc2V0IGZvciByaWdodC10by1sZWZ0IG1hdGNoaW5nXG5cdFx0aSA9IG1hdGNoRXhwcltcIm5lZWRzQ29udGV4dFwiXS50ZXN0KCBzZWxlY3RvciApID8gMCA6IHRva2Vucy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0b2tlbiA9IHRva2Vuc1tpXTtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgd2UgaGl0IGEgY29tYmluYXRvclxuXHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyAodHlwZSA9IHRva2VuLnR5cGUpIF0gKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAoZmluZCA9IEV4cHIuZmluZFsgdHlwZSBdKSApIHtcblx0XHRcdFx0Ly8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXG5cdFx0XHRcdGlmICggKHNlZWQgPSBmaW5kKFxuXHRcdFx0XHRcdHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKSxcblx0XHRcdFx0XHRyc2libGluZy50ZXN0KCB0b2tlbnNbMF0udHlwZSApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG5cdFx0XHRcdCkpICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgc2VlZCBpcyBlbXB0eSBvciBubyB0b2tlbnMgcmVtYWluLCB3ZSBjYW4gcmV0dXJuIGVhcmx5XG5cdFx0XHRcdFx0dG9rZW5zLnNwbGljZSggaSwgMSApO1xuXHRcdFx0XHRcdHNlbGVjdG9yID0gc2VlZC5sZW5ndGggJiYgdG9TZWxlY3RvciggdG9rZW5zICk7XG5cdFx0XHRcdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZWVkICk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIENvbXBpbGUgYW5kIGV4ZWN1dGUgYSBmaWx0ZXJpbmcgZnVuY3Rpb24gaWYgb25lIGlzIG5vdCBwcm92aWRlZFxuXHQvLyBQcm92aWRlIGBtYXRjaGAgdG8gYXZvaWQgcmV0b2tlbml6YXRpb24gaWYgd2UgbW9kaWZpZWQgdGhlIHNlbGVjdG9yIGFib3ZlXG5cdCggY29tcGlsZWQgfHwgY29tcGlsZSggc2VsZWN0b3IsIG1hdGNoICkgKShcblx0XHRzZWVkLFxuXHRcdGNvbnRleHQsXG5cdFx0IWRvY3VtZW50SXNIVE1MLFxuXHRcdHJlc3VsdHMsXG5cdFx0cnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHQpO1xuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXG5cbi8vIFNvcnQgc3RhYmlsaXR5XG5zdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KFwiXCIpLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oXCJcIikgPT09IGV4cGFuZG87XG5cbi8vIFN1cHBvcnQ6IENocm9tZSAxNC0zNStcbi8vIEFsd2F5cyBhc3N1bWUgZHVwbGljYXRlcyBpZiB0aGV5IGFyZW4ndCBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25cbnN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcyA9ICEhaGFzRHVwbGljYXRlO1xuXG4vLyBJbml0aWFsaXplIGFnYWluc3QgdGhlIGRlZmF1bHQgZG9jdW1lbnRcbnNldERvY3VtZW50KCk7XG5cbi8vIFN1cHBvcnQ6IFdlYmtpdDw1MzcuMzIgLSBTYWZhcmkgNi4wLjMvQ2hyb21lIDI1IChmaXhlZCBpbiBDaHJvbWUgMjcpXG4vLyBEZXRhY2hlZCBub2RlcyBjb25mb3VuZGluZ2x5IGZvbGxvdyAqZWFjaCBvdGhlcipcbnN1cHBvcnQuc29ydERldGFjaGVkID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYxICkge1xuXHQvLyBTaG91bGQgcmV0dXJuIDEsIGJ1dCByZXR1cm5zIDQgKGZvbGxvd2luZylcblx0cmV0dXJuIGRpdjEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgKSAmIDE7XG59KTtcblxuLy8gU3VwcG9ydDogSUU8OFxuLy8gUHJldmVudCBhdHRyaWJ1dGUvcHJvcGVydHkgXCJpbnRlcnBvbGF0aW9uXCJcbi8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRkaXYuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XG5cdHJldHVybiBkaXYuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIiNcIiA7XG59KSApIHtcblx0YWRkSGFuZGxlKCBcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidHlwZVwiID8gMSA6IDIgKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZGVmYXVsdFZhbHVlIGluIHBsYWNlIG9mIGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXG5pZiAoICFzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRkaXYuaW5uZXJIVE1MID0gXCI8aW5wdXQvPlwiO1xuXHRkaXYuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuXHRyZXR1cm4gZGl2LmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcbn0pICkge1xuXHRhZGRIYW5kbGUoIFwidmFsdWVcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcbmlmICggIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRyZXR1cm4gZGl2LmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpID09IG51bGw7XG59KSApIHtcblx0YWRkSGFuZGxlKCBib29sZWFucywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciB2YWw7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdID09PSB0cnVlID8gbmFtZS50b0xvd2VyQ2FzZSgpIDpcblx0XHRcdFx0XHQodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkpICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0fVxuXHR9KTtcbn1cblxucmV0dXJuIFNpenpsZTtcblxufSkoIHdpbmRvdyApO1xuXG5cblxualF1ZXJ5LmZpbmQgPSBTaXp6bGU7XG5qUXVlcnkuZXhwciA9IFNpenpsZS5zZWxlY3RvcnM7XG5qUXVlcnkuZXhwcltcIjpcIl0gPSBqUXVlcnkuZXhwci5wc2V1ZG9zO1xualF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xualF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcbmpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcbmpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcblxuXG5cbnZhciBybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xuXG52YXIgcnNpbmdsZVRhZyA9ICgvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8pO1xuXG5cblxudmFyIHJpc1NpbXBsZSA9IC9eLlteOiNcXFtcXC4sXSokLztcblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbmZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwgbm90ICkge1xuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdC8qIGpzaGludCAtVzAxOCAqL1xuXHRcdFx0cmV0dXJuICEhcXVhbGlmaWVyLmNhbGwoIGVsZW0sIGksIGVsZW0gKSAhPT0gbm90O1xuXHRcdH0pO1xuXG5cdH1cblxuXHRpZiAoIHF1YWxpZmllci5ub2RlVHlwZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGVsZW0gPT09IHF1YWxpZmllciApICE9PSBub3Q7XG5cdFx0fSk7XG5cblx0fVxuXG5cdGlmICggdHlwZW9mIHF1YWxpZmllciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRpZiAoIHJpc1NpbXBsZS50ZXN0KCBxdWFsaWZpZXIgKSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzLCBub3QgKTtcblx0XHR9XG5cblx0XHRxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzICk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID49IDAgKSAhPT0gbm90O1xuXHR9KTtcbn1cblxualF1ZXJ5LmZpbHRlciA9IGZ1bmN0aW9uKCBleHByLCBlbGVtcywgbm90ICkge1xuXHR2YXIgZWxlbSA9IGVsZW1zWyAwIF07XG5cblx0aWYgKCBub3QgKSB7XG5cdFx0ZXhwciA9IFwiOm5vdChcIiArIGV4cHIgKyBcIilcIjtcblx0fVxuXG5cdHJldHVybiBlbGVtcy5sZW5ndGggPT09IDEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSA/XG5cdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBleHByICkgPyBbIGVsZW0gXSA6IFtdIDpcblx0XHRqUXVlcnkuZmluZC5tYXRjaGVzKCBleHByLCBqUXVlcnkuZ3JlcCggZWxlbXMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdFx0fSkpO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGZpbmQ6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgaSxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRzZWxmID0gdGhpcztcblxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkoIHNlbGVjdG9yICkuZmlsdGVyKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCBzZWxmWyBpIF0sIHRoaXMgKSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkgKTtcblx0XHR9XG5cblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQoIHNlbGVjdG9yLCBzZWxmWyBpIF0sIHJldCApO1xuXHRcdH1cblxuXHRcdC8vIE5lZWRlZCBiZWNhdXNlICQoIHNlbGVjdG9yLCBjb250ZXh0ICkgYmVjb21lcyAkKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKVxuXHRcdHJldCA9IHRoaXMucHVzaFN0YWNrKCBsZW4gPiAxID8galF1ZXJ5LnVuaXF1ZSggcmV0ICkgOiByZXQgKTtcblx0XHRyZXQuc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yID8gdGhpcy5zZWxlY3RvciArIFwiIFwiICsgc2VsZWN0b3IgOiBzZWxlY3Rvcjtcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyh0aGlzLCBzZWxlY3RvciB8fCBbXSwgZmFsc2UpICk7XG5cdH0sXG5cdG5vdDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KHRoaXMsIHNlbGVjdG9yIHx8IFtdLCB0cnVlKSApO1xuXHR9LFxuXHRpczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiAhIXdpbm5vdyhcblx0XHRcdHRoaXMsXG5cblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwb3NpdGlvbmFsL3JlbGF0aXZlIHNlbGVjdG9yLCBjaGVjayBtZW1iZXJzaGlwIGluIHRoZSByZXR1cm5lZCBzZXRcblx0XHRcdC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cblx0XHRcdHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICkgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHRzZWxlY3RvciB8fCBbXSxcblx0XHRcdGZhbHNlXG5cdFx0KS5sZW5ndGg7XG5cdH1cbn0pO1xuXG5cbi8vIEluaXRpYWxpemUgYSBqUXVlcnkgb2JqZWN0XG5cblxuLy8gQSBjZW50cmFsIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBqUXVlcnkoZG9jdW1lbnQpXG52YXIgcm9vdGpRdWVyeSxcblxuXHQvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuXHQvLyBQcmlvcml0aXplICNpZCBvdmVyIDx0YWc+IHRvIGF2b2lkIFhTUyB2aWEgbG9jYXRpb24uaGFzaCAoIzk1MjEpXG5cdC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uICgjMTEyOTA6IG11c3Qgc3RhcnQgd2l0aCA8KVxuXHRycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKikpJC8sXG5cblx0aW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHZhciBtYXRjaCwgZWxlbTtcblxuXHRcdC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuXHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0aWYgKCBzZWxlY3RvclswXSA9PT0gXCI8XCIgJiYgc2VsZWN0b3JbIHNlbGVjdG9yLmxlbmd0aCAtIDEgXSA9PT0gXCI+XCIgJiYgc2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG5cdFx0XHRcdC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXG5cdFx0XHRcdG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxuXHRcdFx0aWYgKCBtYXRjaCAmJiAobWF0Y2hbMV0gfHwgIWNvbnRleHQpICkge1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxuXHRcdFx0XHRpZiAoIG1hdGNoWzFdICkge1xuXHRcdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5ID8gY29udGV4dFswXSA6IGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBPcHRpb24gdG8gcnVuIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0XHQvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcblx0XHRcdFx0XHRcdG1hdGNoWzFdLFxuXHRcdFx0XHRcdFx0Y29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcblx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHQpICk7XG5cblx0XHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdFx0aWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWzFdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcblx0XHRcdFx0XHRcdGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFByb3BlcnRpZXMgb2YgY29udGV4dCBhcmUgY2FsbGVkIGFzIG1ldGhvZHMgaWYgcG9zc2libGVcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKCNpZClcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWzJdICk7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBCbGFja2JlcnJ5IDQuNlxuXHRcdFx0XHRcdC8vIGdFQklEIHJldHVybnMgbm9kZXMgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAoIzY5NjMpXG5cdFx0XHRcdFx0aWYgKCBlbGVtICYmIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRcdC8vIEluamVjdCB0aGUgZWxlbWVudCBkaXJlY3RseSBpbnRvIHRoZSBqUXVlcnkgb2JqZWN0XG5cdFx0XHRcdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0XHR0aGlzWzBdID0gZWxlbTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLmNvbnRleHQgPSBkb2N1bWVudDtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcblx0XHRcdH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuXHRcdFx0XHRyZXR1cm4gKCBjb250ZXh0IHx8IHJvb3RqUXVlcnkgKS5maW5kKCBzZWxlY3RvciApO1xuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgY29udGV4dClcblx0XHRcdC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSEFORExFOiAkKERPTUVsZW1lbnQpXG5cdFx0fSBlbHNlIGlmICggc2VsZWN0b3Iubm9kZVR5cGUgKSB7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSB0aGlzWzBdID0gc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdC8vIEhBTkRMRTogJChmdW5jdGlvbilcblx0XHQvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcblx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggc2VsZWN0b3IgKSApIHtcblx0XHRcdHJldHVybiB0eXBlb2Ygcm9vdGpRdWVyeS5yZWFkeSAhPT0gXCJ1bmRlZmluZWRcIiA/XG5cdFx0XHRcdHJvb3RqUXVlcnkucmVhZHkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHQvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdHNlbGVjdG9yKCBqUXVlcnkgKTtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yLnNlbGVjdG9yICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3Iuc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSBzZWxlY3Rvci5jb250ZXh0O1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciwgdGhpcyApO1xuXHR9O1xuXG4vLyBHaXZlIHRoZSBpbml0IGZ1bmN0aW9uIHRoZSBqUXVlcnkgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG5pbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxucm9vdGpRdWVyeSA9IGpRdWVyeSggZG9jdW1lbnQgKTtcblxuXG52YXIgcnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXG5cdC8vIE1ldGhvZHMgZ3VhcmFudGVlZCB0byBwcm9kdWNlIGEgdW5pcXVlIHNldCB3aGVuIHN0YXJ0aW5nIGZyb20gYSB1bmlxdWUgc2V0XG5cdGd1YXJhbnRlZWRVbmlxdWUgPSB7XG5cdFx0Y2hpbGRyZW46IHRydWUsXG5cdFx0Y29udGVudHM6IHRydWUsXG5cdFx0bmV4dDogdHJ1ZSxcblx0XHRwcmV2OiB0cnVlXG5cdH07XG5cbmpRdWVyeS5leHRlbmQoe1xuXHRkaXI6IGZ1bmN0aW9uKCBlbGVtLCBkaXIsIHVudGlsICkge1xuXHRcdHZhciBtYXRjaGVkID0gW10sXG5cdFx0XHR0cnVuY2F0ZSA9IHVudGlsICE9PSB1bmRlZmluZWQ7XG5cblx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICYmIGVsZW0ubm9kZVR5cGUgIT09IDkgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdGlmICggdHJ1bmNhdGUgJiYgalF1ZXJ5KCBlbGVtICkuaXMoIHVudGlsICkgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0bWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBtYXRjaGVkO1xuXHR9LFxuXG5cdHNpYmxpbmc6IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuXHRcdHZhciBtYXRjaGVkID0gW107XG5cblx0XHRmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xuXHRcdFx0aWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG5cdFx0XHRcdG1hdGNoZWQucHVzaCggbiApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVkO1xuXHR9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcblx0XHR2YXIgdGFyZ2V0cyA9IGpRdWVyeSggdGFyZ2V0LCB0aGlzICksXG5cdFx0XHRsID0gdGFyZ2V0cy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCB0aGlzLCB0YXJnZXRzW2ldICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRjbG9zZXN0OiBmdW5jdGlvbiggc2VsZWN0b3JzLCBjb250ZXh0ICkge1xuXHRcdHZhciBjdXIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSB0aGlzLmxlbmd0aCxcblx0XHRcdG1hdGNoZWQgPSBbXSxcblx0XHRcdHBvcyA9IHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3JzICkgfHwgdHlwZW9mIHNlbGVjdG9ycyAhPT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdGpRdWVyeSggc2VsZWN0b3JzLCBjb250ZXh0IHx8IHRoaXMuY29udGV4dCApIDpcblx0XHRcdFx0MDtcblxuXHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdGZvciAoIGN1ciA9IHRoaXNbaV07IGN1ciAmJiBjdXIgIT09IGNvbnRleHQ7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXHRcdFx0XHQvLyBBbHdheXMgc2tpcCBkb2N1bWVudCBmcmFnbWVudHNcblx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPCAxMSAmJiAocG9zID9cblx0XHRcdFx0XHRwb3MuaW5kZXgoY3VyKSA+IC0xIDpcblxuXHRcdFx0XHRcdC8vIERvbid0IHBhc3Mgbm9uLWVsZW1lbnRzIHRvIFNpenpsZVxuXHRcdFx0XHRcdGN1ci5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKGN1ciwgc2VsZWN0b3JzKSkgKSB7XG5cblx0XHRcdFx0XHRtYXRjaGVkLnB1c2goIGN1ciApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkLmxlbmd0aCA+IDEgPyBqUXVlcnkudW5pcXVlKCBtYXRjaGVkICkgOiBtYXRjaGVkICk7XG5cdH0sXG5cblx0Ly8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpbiB0aGUgc2V0XG5cdGluZGV4OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE5vIGFyZ3VtZW50LCByZXR1cm4gaW5kZXggaW4gcGFyZW50XG5cdFx0aWYgKCAhZWxlbSApIHtcblx0XHRcdHJldHVybiAoIHRoaXNbIDAgXSAmJiB0aGlzWyAwIF0ucGFyZW50Tm9kZSApID8gdGhpcy5maXJzdCgpLnByZXZBbGwoKS5sZW5ndGggOiAtMTtcblx0XHR9XG5cblx0XHQvLyBJbmRleCBpbiBzZWxlY3RvclxuXHRcdGlmICggdHlwZW9mIGVsZW0gPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdGhpc1sgMCBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gTG9jYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGVzaXJlZCBlbGVtZW50XG5cdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggdGhpcyxcblxuXHRcdFx0Ly8gSWYgaXQgcmVjZWl2ZXMgYSBqUXVlcnkgb2JqZWN0LCB0aGUgZmlyc3QgZWxlbWVudCBpcyB1c2VkXG5cdFx0XHRlbGVtLmpxdWVyeSA/IGVsZW1bIDAgXSA6IGVsZW1cblx0XHQpO1xuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayhcblx0XHRcdGpRdWVyeS51bmlxdWUoXG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcy5nZXQoKSwgalF1ZXJ5KCBzZWxlY3RvciwgY29udGV4dCApIClcblx0XHRcdClcblx0XHQpO1xuXHR9LFxuXG5cdGFkZEJhY2s6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5hZGQoIHNlbGVjdG9yID09IG51bGwgP1xuXHRcdFx0dGhpcy5wcmV2T2JqZWN0IDogdGhpcy5wcmV2T2JqZWN0LmZpbHRlcihzZWxlY3Rvcilcblx0XHQpO1xuXHR9XG59KTtcblxuZnVuY3Rpb24gc2libGluZyggY3VyLCBkaXIgKSB7XG5cdHdoaWxlICggKGN1ciA9IGN1cltkaXJdKSAmJiBjdXIubm9kZVR5cGUgIT09IDEgKSB7fVxuXHRyZXR1cm4gY3VyO1xufVxuXG5qUXVlcnkuZWFjaCh7XG5cdHBhcmVudDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRyZXR1cm4gcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMTEgPyBwYXJlbnQgOiBudWxsO1xuXHR9LFxuXHRwYXJlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcblx0fSxcblx0cGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiLCB1bnRpbCApO1xuXHR9LFxuXHRuZXh0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXY6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG5cdH0sXG5cdG5leHRBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldkFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dFVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0cHJldlVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHNpYmxpbmdzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LnNpYmxpbmcoICggZWxlbS5wYXJlbnROb2RlIHx8IHt9ICkuZmlyc3RDaGlsZCwgZWxlbSApO1xuXHR9LFxuXHRjaGlsZHJlbjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5zaWJsaW5nKCBlbGVtLmZpcnN0Q2hpbGQgKTtcblx0fSxcblx0Y29udGVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBqUXVlcnkubWVyZ2UoIFtdLCBlbGVtLmNoaWxkTm9kZXMgKTtcblx0fVxufSwgZnVuY3Rpb24oIG5hbWUsIGZuICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCB1bnRpbCwgc2VsZWN0b3IgKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuXHRcdGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuXHRcdFx0c2VsZWN0b3IgPSB1bnRpbDtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG1hdGNoZWQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgbWF0Y2hlZCApO1xuXHRcdH1cblxuXHRcdGlmICggdGhpcy5sZW5ndGggPiAxICkge1xuXHRcdFx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZXNcblx0XHRcdGlmICggIWd1YXJhbnRlZWRVbmlxdWVbIG5hbWUgXSApIHtcblx0XHRcdFx0alF1ZXJ5LnVuaXF1ZSggbWF0Y2hlZCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuXHRcdFx0aWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuXHRcdFx0XHRtYXRjaGVkLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQgKTtcblx0fTtcbn0pO1xudmFyIHJub3R3aGl0ZSA9ICgvXFxTKy9nKTtcblxuXG5cbi8vIFN0cmluZyB0byBPYmplY3Qgb3B0aW9ucyBmb3JtYXQgY2FjaGVcbnZhciBvcHRpb25zQ2FjaGUgPSB7fTtcblxuLy8gQ29udmVydCBTdHJpbmctZm9ybWF0dGVkIG9wdGlvbnMgaW50byBPYmplY3QtZm9ybWF0dGVkIG9uZXMgYW5kIHN0b3JlIGluIGNhY2hlXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkge1xuXHR2YXIgb2JqZWN0ID0gb3B0aW9uc0NhY2hlWyBvcHRpb25zIF0gPSB7fTtcblx0alF1ZXJ5LmVhY2goIG9wdGlvbnMubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdLCBmdW5jdGlvbiggXywgZmxhZyApIHtcblx0XHRvYmplY3RbIGZsYWcgXSA9IHRydWU7XG5cdH0pO1xuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG4vKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xualF1ZXJ5LkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdCggb3B0aW9uc0NhY2hlWyBvcHRpb25zIF0gfHwgY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIExhc3QgZmlyZSB2YWx1ZSAoZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0cylcblx0XHRtZW1vcnksXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblx0XHQvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG5cdFx0ZmlyaW5nLFxuXHRcdC8vIEZpcnN0IGNhbGxiYWNrIHRvIGZpcmUgKHVzZWQgaW50ZXJuYWxseSBieSBhZGQgYW5kIGZpcmVXaXRoKVxuXHRcdGZpcmluZ1N0YXJ0LFxuXHRcdC8vIEVuZCBvZiB0aGUgbG9vcCB3aGVuIGZpcmluZ1xuXHRcdGZpcmluZ0xlbmd0aCxcblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSByZW1vdmUgaWYgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4LFxuXHRcdC8vIEFjdHVhbCBjYWxsYmFjayBsaXN0XG5cdFx0bGlzdCA9IFtdLFxuXHRcdC8vIFN0YWNrIG9mIGZpcmUgY2FsbHMgZm9yIHJlcGVhdGFibGUgbGlzdHNcblx0XHRzdGFjayA9ICFvcHRpb25zLm9uY2UgJiYgW10sXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0XHRtZW1vcnkgPSBvcHRpb25zLm1lbW9yeSAmJiBkYXRhO1xuXHRcdFx0ZmlyZWQgPSB0cnVlO1xuXHRcdFx0ZmlyaW5nSW5kZXggPSBmaXJpbmdTdGFydCB8fCAwO1xuXHRcdFx0ZmlyaW5nU3RhcnQgPSAwO1xuXHRcdFx0ZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRmaXJpbmcgPSB0cnVlO1xuXHRcdFx0Zm9yICggOyBsaXN0ICYmIGZpcmluZ0luZGV4IDwgZmlyaW5nTGVuZ3RoOyBmaXJpbmdJbmRleCsrICkge1xuXHRcdFx0XHRpZiAoIGxpc3RbIGZpcmluZ0luZGV4IF0uYXBwbHkoIGRhdGFbIDAgXSwgZGF0YVsgMSBdICkgPT09IGZhbHNlICYmIG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cdFx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7IC8vIFRvIHByZXZlbnQgZnVydGhlciBjYWxscyB1c2luZyBhZGRcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZmlyaW5nID0gZmFsc2U7XG5cdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdGlmICggc3RhY2sgKSB7XG5cdFx0XHRcdFx0aWYgKCBzdGFjay5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCBzdGFjay5zaGlmdCgpICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYuZGlzYWJsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cdFx0XHQvLyBBZGQgYSBjYWxsYmFjayBvciBhIGNvbGxlY3Rpb24gb2YgY2FsbGJhY2tzIHRvIHRoZSBsaXN0XG5cdFx0XHRhZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0Ly8gRmlyc3QsIHdlIHNhdmUgdGhlIGN1cnJlbnQgbGVuZ3RoXG5cdFx0XHRcdFx0dmFyIHN0YXJ0ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIGFkZCggYXJncyApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmdzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIEluc3BlY3QgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRcdFx0XHRhZGQoIGFyZyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KSggYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0Ly8gRG8gd2UgbmVlZCB0byBhZGQgdGhlIGNhbGxiYWNrcyB0byB0aGVcblx0XHRcdFx0XHQvLyBjdXJyZW50IGZpcmluZyBiYXRjaD9cblx0XHRcdFx0XHRpZiAoIGZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmluZ0xlbmd0aCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdC8vIFdpdGggbWVtb3J5LCBpZiB3ZSdyZSBub3QgZmlyaW5nIHRoZW5cblx0XHRcdFx0XHQvLyB3ZSBzaG91bGQgY2FsbCByaWdodCBhd2F5XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggbWVtb3J5ICkge1xuXHRcdFx0XHRcdFx0ZmlyaW5nU3RhcnQgPSBzdGFydDtcblx0XHRcdFx0XHRcdGZpcmUoIG1lbW9yeSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBSZW1vdmUgYSBjYWxsYmFjayBmcm9tIHRoZSBsaXN0XG5cdFx0XHRyZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3VtZW50cywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdHZhciBpbmRleDtcblx0XHRcdFx0XHRcdHdoaWxlICggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QsIGluZGV4ICkgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRsaXN0LnNwbGljZSggaW5kZXgsIDEgKTtcblx0XHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGZpcmluZyBpbmRleGVzXG5cdFx0XHRcdFx0XHRcdGlmICggZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICggaW5kZXggPD0gZmlyaW5nTGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmlyaW5nTGVuZ3RoLS07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmICggaW5kZXggPD0gZmlyaW5nSW5kZXggKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaXJpbmdJbmRleC0tO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIENoZWNrIGlmIGEgZ2l2ZW4gY2FsbGJhY2sgaXMgaW4gdGhlIGxpc3QuXG5cdFx0XHQvLyBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgcmV0dXJuIHdoZXRoZXIgb3Igbm90IGxpc3QgaGFzIGNhbGxiYWNrcyBhdHRhY2hlZC5cblx0XHRcdGhhczogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRyZXR1cm4gZm4gPyBqUXVlcnkuaW5BcnJheSggZm4sIGxpc3QgKSA+IC0xIDogISEoIGxpc3QgJiYgbGlzdC5sZW5ndGggKTtcblx0XHRcdH0sXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxpc3QgPSBbXTtcblx0XHRcdFx0ZmlyaW5nTGVuZ3RoID0gMDtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSGF2ZSB0aGUgbGlzdCBkbyBub3RoaW5nIGFueW1vcmVcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsaXN0ID0gc3RhY2sgPSBtZW1vcnkgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIElzIGl0IGRpc2FibGVkP1xuXHRcdFx0ZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIWxpc3Q7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gTG9jayB0aGUgbGlzdCBpbiBpdHMgY3VycmVudCBzdGF0ZVxuXHRcdFx0bG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHN0YWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRpZiAoICFtZW1vcnkgKSB7XG5cdFx0XHRcdFx0c2VsZi5kaXNhYmxlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSXMgaXQgbG9ja2VkP1xuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICFzdGFjaztcblx0XHRcdH0sXG5cdFx0XHQvLyBDYWxsIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXJndW1lbnRzXG5cdFx0XHRmaXJlV2l0aDogZnVuY3Rpb24oIGNvbnRleHQsIGFyZ3MgKSB7XG5cdFx0XHRcdGlmICggbGlzdCAmJiAoICFmaXJlZCB8fCBzdGFjayApICkge1xuXHRcdFx0XHRcdGFyZ3MgPSBhcmdzIHx8IFtdO1xuXHRcdFx0XHRcdGFyZ3MgPSBbIGNvbnRleHQsIGFyZ3Muc2xpY2UgPyBhcmdzLnNsaWNlKCkgOiBhcmdzIF07XG5cdFx0XHRcdFx0aWYgKCBmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRzdGFjay5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGZpcmUoIGFyZ3MgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gQ2FsbCBhbGwgdGhlIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHNcblx0XHRcdGZpcmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmZpcmVXaXRoKCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5cbmpRdWVyeS5leHRlbmQoe1xuXG5cdERlZmVycmVkOiBmdW5jdGlvbiggZnVuYyApIHtcblx0XHR2YXIgdHVwbGVzID0gW1xuXHRcdFx0XHQvLyBhY3Rpb24sIGFkZCBsaXN0ZW5lciwgbGlzdGVuZXIgbGlzdCwgZmluYWwgc3RhdGVcblx0XHRcdFx0WyBcInJlc29sdmVcIiwgXCJkb25lXCIsIGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSwgXCJyZXNvbHZlZFwiIF0sXG5cdFx0XHRcdFsgXCJyZWplY3RcIiwgXCJmYWlsXCIsIGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSwgXCJyZWplY3RlZFwiIF0sXG5cdFx0XHRcdFsgXCJub3RpZnlcIiwgXCJwcm9ncmVzc1wiLCBqUXVlcnkuQ2FsbGJhY2tzKFwibWVtb3J5XCIpIF1cblx0XHRcdF0sXG5cdFx0XHRzdGF0ZSA9IFwicGVuZGluZ1wiLFxuXHRcdFx0cHJvbWlzZSA9IHtcblx0XHRcdFx0c3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YWx3YXlzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5kb25lKCBhcmd1bWVudHMgKS5mYWlsKCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblx0XHRcdFx0dGhlbjogZnVuY3Rpb24oIC8qIGZuRG9uZSwgZm5GYWlsLCBmblByb2dyZXNzICovICkge1xuXHRcdFx0XHRcdHZhciBmbnMgPSBhcmd1bWVudHM7XG5cdFx0XHRcdFx0cmV0dXJuIGpRdWVyeS5EZWZlcnJlZChmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBmbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBmbnNbIGkgXSApICYmIGZuc1sgaSBdO1xuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZFsgZG9uZSB8IGZhaWwgfCBwcm9ncmVzcyBdIGZvciBmb3J3YXJkaW5nIGFjdGlvbnMgdG8gbmV3RGVmZXJcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWzFdIF0oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJldHVybmVkID0gZm4gJiYgZm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggcmV0dXJuZWQgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJldHVybmVkLnByb21pc2UgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLnByb21pc2UoKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZG9uZSggbmV3RGVmZXIucmVzb2x2ZSApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5mYWlsKCBuZXdEZWZlci5yZWplY3QgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQucHJvZ3Jlc3MoIG5ld0RlZmVyLm5vdGlmeSApO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlclsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IHByb21pc2UgPyBuZXdEZWZlci5wcm9taXNlKCkgOiB0aGlzLCBmbiA/IFsgcmV0dXJuZWQgXSA6IGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGZucyA9IG51bGw7XG5cdFx0XHRcdFx0fSkucHJvbWlzZSgpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQvLyBHZXQgYSBwcm9taXNlIGZvciB0aGlzIGRlZmVycmVkXG5cdFx0XHRcdC8vIElmIG9iaiBpcyBwcm92aWRlZCwgdGhlIHByb21pc2UgYXNwZWN0IGlzIGFkZGVkIHRvIHRoZSBvYmplY3Rcblx0XHRcdFx0cHJvbWlzZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqICE9IG51bGwgPyBqUXVlcnkuZXh0ZW5kKCBvYmosIHByb21pc2UgKSA6IHByb21pc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWZlcnJlZCA9IHt9O1xuXG5cdFx0Ly8gS2VlcCBwaXBlIGZvciBiYWNrLWNvbXBhdFxuXHRcdHByb21pc2UucGlwZSA9IHByb21pc2UudGhlbjtcblxuXHRcdC8vIEFkZCBsaXN0LXNwZWNpZmljIG1ldGhvZHNcblx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cdFx0XHR2YXIgbGlzdCA9IHR1cGxlWyAyIF0sXG5cdFx0XHRcdHN0YXRlU3RyaW5nID0gdHVwbGVbIDMgXTtcblxuXHRcdFx0Ly8gcHJvbWlzZVsgZG9uZSB8IGZhaWwgfCBwcm9ncmVzcyBdID0gbGlzdC5hZGRcblx0XHRcdHByb21pc2VbIHR1cGxlWzFdIF0gPSBsaXN0LmFkZDtcblxuXHRcdFx0Ly8gSGFuZGxlIHN0YXRlXG5cdFx0XHRpZiAoIHN0YXRlU3RyaW5nICkge1xuXHRcdFx0XHRsaXN0LmFkZChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyBzdGF0ZSA9IFsgcmVzb2x2ZWQgfCByZWplY3RlZCBdXG5cdFx0XHRcdFx0c3RhdGUgPSBzdGF0ZVN0cmluZztcblxuXHRcdFx0XHQvLyBbIHJlamVjdF9saXN0IHwgcmVzb2x2ZV9saXN0IF0uZGlzYWJsZTsgcHJvZ3Jlc3NfbGlzdC5sb2NrXG5cdFx0XHRcdH0sIHR1cGxlc1sgaSBeIDEgXVsgMiBdLmRpc2FibGUsIHR1cGxlc1sgMiBdWyAyIF0ubG9jayApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBkZWZlcnJlZFsgcmVzb2x2ZSB8IHJlamVjdCB8IG5vdGlmeSBdXG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbMF0gXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbMF0gKyBcIldpdGhcIiBdKCB0aGlzID09PSBkZWZlcnJlZCA/IHByb21pc2UgOiB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9O1xuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWzBdICsgXCJXaXRoXCIgXSA9IGxpc3QuZmlyZVdpdGg7XG5cdFx0fSk7XG5cblx0XHQvLyBNYWtlIHRoZSBkZWZlcnJlZCBhIHByb21pc2Vcblx0XHRwcm9taXNlLnByb21pc2UoIGRlZmVycmVkICk7XG5cblx0XHQvLyBDYWxsIGdpdmVuIGZ1bmMgaWYgYW55XG5cdFx0aWYgKCBmdW5jICkge1xuXHRcdFx0ZnVuYy5jYWxsKCBkZWZlcnJlZCwgZGVmZXJyZWQgKTtcblx0XHR9XG5cblx0XHQvLyBBbGwgZG9uZSFcblx0XHRyZXR1cm4gZGVmZXJyZWQ7XG5cdH0sXG5cblx0Ly8gRGVmZXJyZWQgaGVscGVyXG5cdHdoZW46IGZ1bmN0aW9uKCBzdWJvcmRpbmF0ZSAvKiAsIC4uLiwgc3Vib3JkaW5hdGVOICovICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdHJlc29sdmVWYWx1ZXMgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcblx0XHRcdGxlbmd0aCA9IHJlc29sdmVWYWx1ZXMubGVuZ3RoLFxuXG5cdFx0XHQvLyB0aGUgY291bnQgb2YgdW5jb21wbGV0ZWQgc3Vib3JkaW5hdGVzXG5cdFx0XHRyZW1haW5pbmcgPSBsZW5ndGggIT09IDEgfHwgKCBzdWJvcmRpbmF0ZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggc3Vib3JkaW5hdGUucHJvbWlzZSApICkgPyBsZW5ndGggOiAwLFxuXG5cdFx0XHQvLyB0aGUgbWFzdGVyIERlZmVycmVkLiBJZiByZXNvbHZlVmFsdWVzIGNvbnNpc3Qgb2Ygb25seSBhIHNpbmdsZSBEZWZlcnJlZCwganVzdCB1c2UgdGhhdC5cblx0XHRcdGRlZmVycmVkID0gcmVtYWluaW5nID09PSAxID8gc3Vib3JkaW5hdGUgOiBqUXVlcnkuRGVmZXJyZWQoKSxcblxuXHRcdFx0Ly8gVXBkYXRlIGZ1bmN0aW9uIGZvciBib3RoIHJlc29sdmUgYW5kIHByb2dyZXNzIHZhbHVlc1xuXHRcdFx0dXBkYXRlRnVuYyA9IGZ1bmN0aW9uKCBpLCBjb250ZXh0cywgdmFsdWVzICkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdGNvbnRleHRzWyBpIF0gPSB0aGlzO1xuXHRcdFx0XHRcdHZhbHVlc1sgaSBdID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSA6IHZhbHVlO1xuXHRcdFx0XHRcdGlmICggdmFsdWVzID09PSBwcm9ncmVzc1ZhbHVlcyApIHtcblx0XHRcdFx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGNvbnRleHRzLCB2YWx1ZXMgKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCAhKCAtLXJlbWFpbmluZyApICkge1xuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNvbnRleHRzLCB2YWx1ZXMgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXG5cdFx0XHRwcm9ncmVzc1ZhbHVlcywgcHJvZ3Jlc3NDb250ZXh0cywgcmVzb2x2ZUNvbnRleHRzO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBEZWZlcnJlZCBzdWJvcmRpbmF0ZXM7IHRyZWF0IG90aGVycyBhcyByZXNvbHZlZFxuXHRcdGlmICggbGVuZ3RoID4gMSApIHtcblx0XHRcdHByb2dyZXNzVmFsdWVzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcblx0XHRcdHByb2dyZXNzQ29udGV4dHMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xuXHRcdFx0cmVzb2x2ZUNvbnRleHRzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIHJlc29sdmVWYWx1ZXNbIGkgXSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggcmVzb2x2ZVZhbHVlc1sgaSBdLnByb21pc2UgKSApIHtcblx0XHRcdFx0XHRyZXNvbHZlVmFsdWVzWyBpIF0ucHJvbWlzZSgpXG5cdFx0XHRcdFx0XHQuZG9uZSggdXBkYXRlRnVuYyggaSwgcmVzb2x2ZUNvbnRleHRzLCByZXNvbHZlVmFsdWVzICkgKVxuXHRcdFx0XHRcdFx0LmZhaWwoIGRlZmVycmVkLnJlamVjdCApXG5cdFx0XHRcdFx0XHQucHJvZ3Jlc3MoIHVwZGF0ZUZ1bmMoIGksIHByb2dyZXNzQ29udGV4dHMsIHByb2dyZXNzVmFsdWVzICkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQtLXJlbWFpbmluZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElmIHdlJ3JlIG5vdCB3YWl0aW5nIG9uIGFueXRoaW5nLCByZXNvbHZlIHRoZSBtYXN0ZXJcblx0XHRpZiAoICFyZW1haW5pbmcgKSB7XG5cdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggcmVzb2x2ZUNvbnRleHRzLCByZXNvbHZlVmFsdWVzICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fVxufSk7XG5cblxuLy8gVGhlIGRlZmVycmVkIHVzZWQgb24gRE9NIHJlYWR5XG52YXIgcmVhZHlMaXN0O1xuXG5qUXVlcnkuZm4ucmVhZHkgPSBmdW5jdGlvbiggZm4gKSB7XG5cdC8vIEFkZCB0aGUgY2FsbGJhY2tcblx0alF1ZXJ5LnJlYWR5LnByb21pc2UoKS5kb25lKCBmbiApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxualF1ZXJ5LmV4dGVuZCh7XG5cdC8vIElzIHRoZSBET00gcmVhZHkgdG8gYmUgdXNlZD8gU2V0IHRvIHRydWUgb25jZSBpdCBvY2N1cnMuXG5cdGlzUmVhZHk6IGZhbHNlLFxuXG5cdC8vIEEgY291bnRlciB0byB0cmFjayBob3cgbWFueSBpdGVtcyB0byB3YWl0IGZvciBiZWZvcmVcblx0Ly8gdGhlIHJlYWR5IGV2ZW50IGZpcmVzLiBTZWUgIzY3ODFcblx0cmVhZHlXYWl0OiAxLFxuXG5cdC8vIEhvbGQgKG9yIHJlbGVhc2UpIHRoZSByZWFkeSBldmVudFxuXHRob2xkUmVhZHk6IGZ1bmN0aW9uKCBob2xkICkge1xuXHRcdGlmICggaG9sZCApIHtcblx0XHRcdGpRdWVyeS5yZWFkeVdhaXQrKztcblx0XHR9IGVsc2Uge1xuXHRcdFx0alF1ZXJ5LnJlYWR5KCB0cnVlICk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcblx0cmVhZHk6IGZ1bmN0aW9uKCB3YWl0ICkge1xuXG5cdFx0Ly8gQWJvcnQgaWYgdGhlcmUgYXJlIHBlbmRpbmcgaG9sZHMgb3Igd2UncmUgYWxyZWFkeSByZWFkeVxuXHRcdGlmICggd2FpdCA9PT0gdHJ1ZSA/IC0talF1ZXJ5LnJlYWR5V2FpdCA6IGpRdWVyeS5pc1JlYWR5ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbWVtYmVyIHRoYXQgdGhlIERPTSBpcyByZWFkeVxuXHRcdGpRdWVyeS5pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdC8vIElmIGEgbm9ybWFsIERPTSBSZWFkeSBldmVudCBmaXJlZCwgZGVjcmVtZW50LCBhbmQgd2FpdCBpZiBuZWVkIGJlXG5cdFx0aWYgKCB3YWl0ICE9PSB0cnVlICYmIC0talF1ZXJ5LnJlYWR5V2FpdCA+IDAgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIGZ1bmN0aW9ucyBib3VuZCwgdG8gZXhlY3V0ZVxuXHRcdHJlYWR5TGlzdC5yZXNvbHZlV2l0aCggZG9jdW1lbnQsIFsgalF1ZXJ5IF0gKTtcblxuXHRcdC8vIFRyaWdnZXIgYW55IGJvdW5kIHJlYWR5IGV2ZW50c1xuXHRcdGlmICggalF1ZXJ5LmZuLnRyaWdnZXJIYW5kbGVyICkge1xuXHRcdFx0alF1ZXJ5KCBkb2N1bWVudCApLnRyaWdnZXJIYW5kbGVyKCBcInJlYWR5XCIgKTtcblx0XHRcdGpRdWVyeSggZG9jdW1lbnQgKS5vZmYoIFwicmVhZHlcIiApO1xuXHRcdH1cblx0fVxufSk7XG5cbi8qKlxuICogVGhlIHJlYWR5IGV2ZW50IGhhbmRsZXIgYW5kIHNlbGYgY2xlYW51cCBtZXRob2RcbiAqL1xuZnVuY3Rpb24gY29tcGxldGVkKCkge1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuXHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCwgZmFsc2UgKTtcblx0alF1ZXJ5LnJlYWR5KCk7XG59XG5cbmpRdWVyeS5yZWFkeS5wcm9taXNlID0gZnVuY3Rpb24oIG9iaiApIHtcblx0aWYgKCAhcmVhZHlMaXN0ICkge1xuXG5cdFx0cmVhZHlMaXN0ID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cblx0XHQvLyBDYXRjaCBjYXNlcyB3aGVyZSAkKGRvY3VtZW50KS5yZWFkeSgpIGlzIGNhbGxlZCBhZnRlciB0aGUgYnJvd3NlciBldmVudCBoYXMgYWxyZWFkeSBvY2N1cnJlZC5cblx0XHQvLyBXZSBvbmNlIHRyaWVkIHRvIHVzZSByZWFkeVN0YXRlIFwiaW50ZXJhY3RpdmVcIiBoZXJlLCBidXQgaXQgY2F1c2VkIGlzc3VlcyBsaWtlIHRoZSBvbmVcblx0XHQvLyBkaXNjb3ZlcmVkIGJ5IENocmlzUyBoZXJlOiBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjI4MiNjb21tZW50OjE1XG5cdFx0aWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgKSB7XG5cdFx0XHQvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgcmVhZHlcblx0XHRcdHNldFRpbWVvdXQoIGpRdWVyeS5yZWFkeSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gVXNlIHRoZSBoYW5keSBldmVudCBjYWxsYmFja1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCwgZmFsc2UgKTtcblxuXHRcdFx0Ly8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVhZHlMaXN0LnByb21pc2UoIG9iaiApO1xufTtcblxuLy8gS2ljayBvZmYgdGhlIERPTSByZWFkeSBjaGVjayBldmVuIGlmIHRoZSB1c2VyIGRvZXMgbm90XG5qUXVlcnkucmVhZHkucHJvbWlzZSgpO1xuXG5cblxuXG4vLyBNdWx0aWZ1bmN0aW9uYWwgbWV0aG9kIHRvIGdldCBhbmQgc2V0IHZhbHVlcyBvZiBhIGNvbGxlY3Rpb25cbi8vIFRoZSB2YWx1ZS9zIGNhbiBvcHRpb25hbGx5IGJlIGV4ZWN1dGVkIGlmIGl0J3MgYSBmdW5jdGlvblxudmFyIGFjY2VzcyA9IGpRdWVyeS5hY2Nlc3MgPSBmdW5jdGlvbiggZWxlbXMsIGZuLCBrZXksIHZhbHVlLCBjaGFpbmFibGUsIGVtcHR5R2V0LCByYXcgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBlbGVtcy5sZW5ndGgsXG5cdFx0YnVsayA9IGtleSA9PSBudWxsO1xuXG5cdC8vIFNldHMgbWFueSB2YWx1ZXNcblx0aWYgKCBqUXVlcnkudHlwZSgga2V5ICkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblx0XHRmb3IgKCBpIGluIGtleSApIHtcblx0XHRcdGpRdWVyeS5hY2Nlc3MoIGVsZW1zLCBmbiwgaSwga2V5W2ldLCB0cnVlLCBlbXB0eUdldCwgcmF3ICk7XG5cdFx0fVxuXG5cdC8vIFNldHMgb25lIHZhbHVlXG5cdH0gZWxzZSBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmF3ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoIGJ1bGsgKSB7XG5cdFx0XHQvLyBCdWxrIG9wZXJhdGlvbnMgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcblx0XHRcdGlmICggcmF3ICkge1xuXHRcdFx0XHRmbi5jYWxsKCBlbGVtcywgdmFsdWUgKTtcblx0XHRcdFx0Zm4gPSBudWxsO1xuXG5cdFx0XHQvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidWxrID0gZm47XG5cdFx0XHRcdGZuID0gZnVuY3Rpb24oIGVsZW0sIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJ1bGsuY2FsbCggalF1ZXJ5KCBlbGVtICksIHZhbHVlICk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRmbiggZWxlbXNbaV0sIGtleSwgcmF3ID8gdmFsdWUgOiB2YWx1ZS5jYWxsKCBlbGVtc1tpXSwgaSwgZm4oIGVsZW1zW2ldLCBrZXkgKSApICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNoYWluYWJsZSA/XG5cdFx0ZWxlbXMgOlxuXG5cdFx0Ly8gR2V0c1xuXHRcdGJ1bGsgP1xuXHRcdFx0Zm4uY2FsbCggZWxlbXMgKSA6XG5cdFx0XHRsZW4gPyBmbiggZWxlbXNbMF0sIGtleSApIDogZW1wdHlHZXQ7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGFuIG9iamVjdCBjYW4gaGF2ZSBkYXRhXG4gKi9cbmpRdWVyeS5hY2NlcHREYXRhID0gZnVuY3Rpb24oIG93bmVyICkge1xuXHQvLyBBY2NlcHRzIG9ubHk6XG5cdC8vICAtIE5vZGVcblx0Ly8gICAgLSBOb2RlLkVMRU1FTlRfTk9ERVxuXHQvLyAgICAtIE5vZGUuRE9DVU1FTlRfTk9ERVxuXHQvLyAgLSBPYmplY3Rcblx0Ly8gICAgLSBBbnlcblx0LyoganNoaW50IC1XMDE4ICovXG5cdHJldHVybiBvd25lci5ub2RlVHlwZSA9PT0gMSB8fCBvd25lci5ub2RlVHlwZSA9PT0gOSB8fCAhKCArb3duZXIubm9kZVR5cGUgKTtcbn07XG5cblxuZnVuY3Rpb24gRGF0YSgpIHtcblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LFxuXHQvLyBPbGQgV2ViS2l0IGRvZXMgbm90IGhhdmUgT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zL2ZyZWV6ZSBtZXRob2QsXG5cdC8vIHJldHVybiBuZXcgZW1wdHkgb2JqZWN0IGluc3RlYWQgd2l0aCBubyBbW3NldF1dIGFjY2Vzc29yXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcy5jYWNoZSA9IHt9LCAwLCB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdH0pO1xuXG5cdHRoaXMuZXhwYW5kbyA9IGpRdWVyeS5leHBhbmRvICsgRGF0YS51aWQrKztcbn1cblxuRGF0YS51aWQgPSAxO1xuRGF0YS5hY2NlcHRzID0galF1ZXJ5LmFjY2VwdERhdGE7XG5cbkRhdGEucHJvdG90eXBlID0ge1xuXHRrZXk6IGZ1bmN0aW9uKCBvd25lciApIHtcblx0XHQvLyBXZSBjYW4gYWNjZXB0IGRhdGEgZm9yIG5vbi1lbGVtZW50IG5vZGVzIGluIG1vZGVybiBicm93c2Vycyxcblx0XHQvLyBidXQgd2Ugc2hvdWxkIG5vdCwgc2VlICM4MzM1LlxuXHRcdC8vIEFsd2F5cyByZXR1cm4gdGhlIGtleSBmb3IgYSBmcm96ZW4gb2JqZWN0LlxuXHRcdGlmICggIURhdGEuYWNjZXB0cyggb3duZXIgKSApIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdHZhciBkZXNjcmlwdG9yID0ge30sXG5cdFx0XHQvLyBDaGVjayBpZiB0aGUgb3duZXIgb2JqZWN0IGFscmVhZHkgaGFzIGEgY2FjaGUga2V5XG5cdFx0XHR1bmxvY2sgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHQvLyBJZiBub3QsIGNyZWF0ZSBvbmVcblx0XHRpZiAoICF1bmxvY2sgKSB7XG5cdFx0XHR1bmxvY2sgPSBEYXRhLnVpZCsrO1xuXG5cdFx0XHQvLyBTZWN1cmUgaXQgaW4gYSBub24tZW51bWVyYWJsZSwgbm9uLXdyaXRhYmxlIHByb3BlcnR5XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRkZXNjcmlwdG9yWyB0aGlzLmV4cGFuZG8gXSA9IHsgdmFsdWU6IHVubG9jayB9O1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyggb3duZXIsIGRlc2NyaXB0b3IgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0XG5cdFx0XHQvLyBGYWxsYmFjayB0byBhIGxlc3Mgc2VjdXJlIGRlZmluaXRpb25cblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRkZXNjcmlwdG9yWyB0aGlzLmV4cGFuZG8gXSA9IHVubG9jaztcblx0XHRcdFx0alF1ZXJ5LmV4dGVuZCggb3duZXIsIGRlc2NyaXB0b3IgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBFbnN1cmUgdGhlIGNhY2hlIG9iamVjdFxuXHRcdGlmICggIXRoaXMuY2FjaGVbIHVubG9jayBdICkge1xuXHRcdFx0dGhpcy5jYWNoZVsgdW5sb2NrIF0gPSB7fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5sb2NrO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKCBvd25lciwgZGF0YSwgdmFsdWUgKSB7XG5cdFx0dmFyIHByb3AsXG5cdFx0XHQvLyBUaGVyZSBtYXkgYmUgYW4gdW5sb2NrIGFzc2lnbmVkIHRvIHRoaXMgbm9kZSxcblx0XHRcdC8vIGlmIHRoZXJlIGlzIG5vIGVudHJ5IGZvciB0aGlzIFwib3duZXJcIiwgY3JlYXRlIG9uZSBpbmxpbmVcblx0XHRcdC8vIGFuZCBzZXQgdGhlIHVubG9jayBhcyB0aG91Z2ggYW4gb3duZXIgZW50cnkgaGFkIGFsd2F5cyBleGlzdGVkXG5cdFx0XHR1bmxvY2sgPSB0aGlzLmtleSggb3duZXIgKSxcblx0XHRcdGNhY2hlID0gdGhpcy5jYWNoZVsgdW5sb2NrIF07XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIGtleSwgdmFsdWUgXSBhcmdzXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGNhY2hlWyBkYXRhIF0gPSB2YWx1ZTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwgeyBwcm9wZXJ0aWVzIH0gXSBhcmdzXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEZyZXNoIGFzc2lnbm1lbnRzIGJ5IG9iamVjdCBhcmUgc2hhbGxvdyBjb3BpZWRcblx0XHRcdGlmICggalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5leHRlbmQoIHRoaXMuY2FjaGVbIHVubG9jayBdLCBkYXRhICk7XG5cdFx0XHQvLyBPdGhlcndpc2UsIGNvcHkgdGhlIHByb3BlcnRpZXMgb25lLWJ5LW9uZSB0byB0aGUgY2FjaGUgb2JqZWN0XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBwcm9wIGluIGRhdGEgKSB7XG5cdFx0XHRcdFx0Y2FjaGVbIHByb3AgXSA9IGRhdGFbIHByb3AgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2FjaGU7XG5cdH0sXG5cdGdldDogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0Ly8gRWl0aGVyIGEgdmFsaWQgY2FjaGUgaXMgZm91bmQsIG9yIHdpbGwgYmUgY3JlYXRlZC5cblx0XHQvLyBOZXcgY2FjaGVzIHdpbGwgYmUgY3JlYXRlZCBhbmQgdGhlIHVubG9jayByZXR1cm5lZCxcblx0XHQvLyBhbGxvd2luZyBkaXJlY3QgYWNjZXNzIHRvIHRoZSBuZXdseSBjcmVhdGVkXG5cdFx0Ly8gZW1wdHkgZGF0YSBvYmplY3QuIEEgdmFsaWQgb3duZXIgb2JqZWN0IG11c3QgYmUgcHJvdmlkZWQuXG5cdFx0dmFyIGNhY2hlID0gdGhpcy5jYWNoZVsgdGhpcy5rZXkoIG93bmVyICkgXTtcblxuXHRcdHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRjYWNoZSA6IGNhY2hlWyBrZXkgXTtcblx0fSxcblx0YWNjZXNzOiBmdW5jdGlvbiggb3duZXIsIGtleSwgdmFsdWUgKSB7XG5cdFx0dmFyIHN0b3JlZDtcblx0XHQvLyBJbiBjYXNlcyB3aGVyZSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIE5vIGtleSB3YXMgc3BlY2lmaWVkXG5cdFx0Ly8gICAyLiBBIHN0cmluZyBrZXkgd2FzIHNwZWNpZmllZCwgYnV0IG5vIHZhbHVlIHByb3ZpZGVkXG5cdFx0Ly9cblx0XHQvLyBUYWtlIHRoZSBcInJlYWRcIiBwYXRoIGFuZCBhbGxvdyB0aGUgZ2V0IG1ldGhvZCB0byBkZXRlcm1pbmVcblx0XHQvLyB3aGljaCB2YWx1ZSB0byByZXR1cm4sIHJlc3BlY3RpdmVseSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIFRoZSBlbnRpcmUgY2FjaGUgb2JqZWN0XG5cdFx0Ly8gICAyLiBUaGUgZGF0YSBzdG9yZWQgYXQgdGhlIGtleVxuXHRcdC8vXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHQoKGtleSAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSApIHtcblxuXHRcdFx0c3RvcmVkID0gdGhpcy5nZXQoIG93bmVyLCBrZXkgKTtcblxuXHRcdFx0cmV0dXJuIHN0b3JlZCAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0c3RvcmVkIDogdGhpcy5nZXQoIG93bmVyLCBqUXVlcnkuY2FtZWxDYXNlKGtleSkgKTtcblx0XHR9XG5cblx0XHQvLyBbKl1XaGVuIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nLCBvciBib3RoIGEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vIGFyZSBzcGVjaWZpZWQsIHNldCBvciBleHRlbmQgKGV4aXN0aW5nIG9iamVjdHMpIHdpdGggZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBBbiBvYmplY3Qgb2YgcHJvcGVydGllc1xuXHRcdC8vICAgMi4gQSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly9cblx0XHR0aGlzLnNldCggb3duZXIsIGtleSwgdmFsdWUgKTtcblxuXHRcdC8vIFNpbmNlIHRoZSBcInNldFwiIHBhdGggY2FuIGhhdmUgdHdvIHBvc3NpYmxlIGVudHJ5IHBvaW50c1xuXHRcdC8vIHJldHVybiB0aGUgZXhwZWN0ZWQgZGF0YSBiYXNlZCBvbiB3aGljaCBwYXRoIHdhcyB0YWtlblsqXVxuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBrZXk7XG5cdH0sXG5cdHJlbW92ZTogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0dmFyIGksIG5hbWUsIGNhbWVsLFxuXHRcdFx0dW5sb2NrID0gdGhpcy5rZXkoIG93bmVyICksXG5cdFx0XHRjYWNoZSA9IHRoaXMuY2FjaGVbIHVubG9jayBdO1xuXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMuY2FjaGVbIHVubG9jayBdID0ge307XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGtleXNcblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIGtleSApICkge1xuXHRcdFx0XHQvLyBJZiBcIm5hbWVcIiBpcyBhbiBhcnJheSBvZiBrZXlzLi4uXG5cdFx0XHRcdC8vIFdoZW4gZGF0YSBpcyBpbml0aWFsbHkgY3JlYXRlZCwgdmlhIChcImtleVwiLCBcInZhbFwiKSBzaWduYXR1cmUsXG5cdFx0XHRcdC8vIGtleXMgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gY2FtZWxDYXNlLlxuXHRcdFx0XHQvLyBTaW5jZSB0aGVyZSBpcyBubyB3YXkgdG8gdGVsbCBfaG93XyBhIGtleSB3YXMgYWRkZWQsIHJlbW92ZVxuXHRcdFx0XHQvLyBib3RoIHBsYWluIGtleSBhbmQgY2FtZWxDYXNlIGtleS4gIzEyNzg2XG5cdFx0XHRcdC8vIFRoaXMgd2lsbCBvbmx5IHBlbmFsaXplIHRoZSBhcnJheSBhcmd1bWVudCBwYXRoLlxuXHRcdFx0XHRuYW1lID0ga2V5LmNvbmNhdCgga2V5Lm1hcCggalF1ZXJ5LmNhbWVsQ2FzZSApICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjYW1lbCA9IGpRdWVyeS5jYW1lbENhc2UoIGtleSApO1xuXHRcdFx0XHQvLyBUcnkgdGhlIHN0cmluZyBhcyBhIGtleSBiZWZvcmUgYW55IG1hbmlwdWxhdGlvblxuXHRcdFx0XHRpZiAoIGtleSBpbiBjYWNoZSApIHtcblx0XHRcdFx0XHRuYW1lID0gWyBrZXksIGNhbWVsIF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gSWYgYSBrZXkgd2l0aCB0aGUgc3BhY2VzIGV4aXN0cywgdXNlIGl0LlxuXHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgY3JlYXRlIGFuIGFycmF5IGJ5IG1hdGNoaW5nIG5vbi13aGl0ZXNwYWNlXG5cdFx0XHRcdFx0bmFtZSA9IGNhbWVsO1xuXHRcdFx0XHRcdG5hbWUgPSBuYW1lIGluIGNhY2hlID9cblx0XHRcdFx0XHRcdFsgbmFtZSBdIDogKCBuYW1lLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGkgPSBuYW1lLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRkZWxldGUgY2FjaGVbIG5hbWVbIGkgXSBdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aGFzRGF0YTogZnVuY3Rpb24oIG93bmVyICkge1xuXHRcdHJldHVybiAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoXG5cdFx0XHR0aGlzLmNhY2hlWyBvd25lclsgdGhpcy5leHBhbmRvIF0gXSB8fCB7fVxuXHRcdCk7XG5cdH0sXG5cdGRpc2NhcmQ6IGZ1bmN0aW9uKCBvd25lciApIHtcblx0XHRpZiAoIG93bmVyWyB0aGlzLmV4cGFuZG8gXSApIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmNhY2hlWyBvd25lclsgdGhpcy5leHBhbmRvIF0gXTtcblx0XHR9XG5cdH1cbn07XG52YXIgZGF0YV9wcml2ID0gbmV3IERhdGEoKTtcblxudmFyIGRhdGFfdXNlciA9IG5ldyBEYXRhKCk7XG5cblxuXG4vL1x0SW1wbGVtZW50YXRpb24gU3VtbWFyeVxuLy9cbi8vXHQxLiBFbmZvcmNlIEFQSSBzdXJmYWNlIGFuZCBzZW1hbnRpYyBjb21wYXRpYmlsaXR5IHdpdGggMS45LnggYnJhbmNoXG4vL1x0Mi4gSW1wcm92ZSB0aGUgbW9kdWxlJ3MgbWFpbnRhaW5hYmlsaXR5IGJ5IHJlZHVjaW5nIHRoZSBzdG9yYWdlXG4vL1x0XHRwYXRocyB0byBhIHNpbmdsZSBtZWNoYW5pc20uXG4vL1x0My4gVXNlIHRoZSBzYW1lIHNpbmdsZSBtZWNoYW5pc20gdG8gc3VwcG9ydCBcInByaXZhdGVcIiBhbmQgXCJ1c2VyXCIgZGF0YS5cbi8vXHQ0LiBfTmV2ZXJfIGV4cG9zZSBcInByaXZhdGVcIiBkYXRhIHRvIHVzZXIgY29kZSAoVE9ETzogRHJvcCBfZGF0YSwgX3JlbW92ZURhdGEpXG4vL1x0NS4gQXZvaWQgZXhwb3NpbmcgaW1wbGVtZW50YXRpb24gZGV0YWlscyBvbiB1c2VyIG9iamVjdHMgKGVnLiBleHBhbmRvIHByb3BlcnRpZXMpXG4vL1x0Ni4gUHJvdmlkZSBhIGNsZWFyIHBhdGggZm9yIGltcGxlbWVudGF0aW9uIHVwZ3JhZGUgdG8gV2Vha01hcCBpbiAyMDE0XG5cbnZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG5cdHJtdWx0aURhc2ggPSAvKFtBLVpdKS9nO1xuXG5mdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xuXHR2YXIgbmFtZTtcblxuXHQvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCBpbnRlcm5hbGx5LCB0cnkgdG8gZmV0Y2ggYW55XG5cdC8vIGRhdGEgZnJvbSB0aGUgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZVxuXHRpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJDFcIiApLnRvTG93ZXJDYXNlKCk7XG5cdFx0ZGF0YSA9IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGF0YSA9IGRhdGEgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6XG5cdFx0XHRcdFx0ZGF0YSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOlxuXHRcdFx0XHRcdGRhdGEgPT09IFwibnVsbFwiID8gbnVsbCA6XG5cdFx0XHRcdFx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0XHRcdFx0XHQrZGF0YSArIFwiXCIgPT09IGRhdGEgPyArZGF0YSA6XG5cdFx0XHRcdFx0cmJyYWNlLnRlc3QoIGRhdGEgKSA/IGpRdWVyeS5wYXJzZUpTT04oIGRhdGEgKSA6XG5cdFx0XHRcdFx0ZGF0YTtcblx0XHRcdH0gY2F0Y2goIGUgKSB7fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgd2Ugc2V0IHRoZSBkYXRhIHNvIGl0IGlzbid0IGNoYW5nZWQgbGF0ZXJcblx0XHRcdGRhdGFfdXNlci5zZXQoIGVsZW0sIGtleSwgZGF0YSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YTtcbn1cblxualF1ZXJ5LmV4dGVuZCh7XG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkYXRhX3VzZXIuaGFzRGF0YSggZWxlbSApIHx8IGRhdGFfcHJpdi5oYXNEYXRhKCBlbGVtICk7XG5cdH0sXG5cblx0ZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFfdXNlci5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhX3VzZXIucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH0sXG5cblx0Ly8gVE9ETzogTm93IHRoYXQgYWxsIGNhbGxzIHRvIF9kYXRhIGFuZCBfcmVtb3ZlRGF0YSBoYXZlIGJlZW4gcmVwbGFjZWRcblx0Ly8gd2l0aCBkaXJlY3QgY2FsbHMgdG8gZGF0YV9wcml2IG1ldGhvZHMsIHRoZXNlIGNhbiBiZSBkZXByZWNhdGVkLlxuXHRfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFfcHJpdi5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRfcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YV9wcml2LnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGRhdGE6IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBpLCBuYW1lLCBkYXRhLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cblx0XHQvLyBHZXRzIGFsbCB2YWx1ZXNcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB0aGlzLmxlbmd0aCApIHtcblx0XHRcdFx0ZGF0YSA9IGRhdGFfdXNlci5nZXQoIGVsZW0gKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgIWRhdGFfcHJpdi5nZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIgKSApIHtcblx0XHRcdFx0XHRpID0gYXR0cnMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRTExK1xuXHRcdFx0XHRcdFx0Ly8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXG5cdFx0XHRcdFx0XHRpZiAoIGF0dHJzWyBpIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG5cdFx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZS5zbGljZSg1KSApO1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFBdHRyKCBlbGVtLCBuYW1lLCBkYXRhWyBuYW1lIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkYXRhX3ByaXYuc2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcblx0XHRpZiAoIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhX3VzZXIuc2V0KCB0aGlzLCBrZXkgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBkYXRhLFxuXHRcdFx0XHRjYW1lbEtleSA9IGpRdWVyeS5jYW1lbENhc2UoIGtleSApO1xuXG5cdFx0XHQvLyBUaGUgY2FsbGluZyBqUXVlcnkgb2JqZWN0IChlbGVtZW50IG1hdGNoZXMpIGlzIG5vdCBlbXB0eVxuXHRcdFx0Ly8gKGFuZCB0aGVyZWZvcmUgaGFzIGFuIGVsZW1lbnQgYXBwZWFycyBhdCB0aGlzWyAwIF0pIGFuZCB0aGVcblx0XHRcdC8vIGB2YWx1ZWAgcGFyYW1ldGVyIHdhcyBub3QgdW5kZWZpbmVkLiBBbiBlbXB0eSBqUXVlcnkgb2JqZWN0XG5cdFx0XHQvLyB3aWxsIHJlc3VsdCBpbiBgdW5kZWZpbmVkYCBmb3IgZWxlbSA9IHRoaXNbIDAgXSB3aGljaCB3aWxsXG5cdFx0XHQvLyB0aHJvdyBhbiBleGNlcHRpb24gaWYgYW4gYXR0ZW1wdCB0byByZWFkIGEgZGF0YSBjYWNoZSBpcyBtYWRlLlxuXHRcdFx0aWYgKCBlbGVtICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gZ2V0IGRhdGEgZnJvbSB0aGUgY2FjaGVcblx0XHRcdFx0Ly8gd2l0aCB0aGUga2V5IGFzLWlzXG5cdFx0XHRcdGRhdGEgPSBkYXRhX3VzZXIuZ2V0KCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIGdldCBkYXRhIGZyb20gdGhlIGNhY2hlXG5cdFx0XHRcdC8vIHdpdGggdGhlIGtleSBjYW1lbGl6ZWRcblx0XHRcdFx0ZGF0YSA9IGRhdGFfdXNlci5nZXQoIGVsZW0sIGNhbWVsS2V5ICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBcImRpc2NvdmVyXCIgdGhlIGRhdGEgaW5cblx0XHRcdFx0Ly8gSFRNTDUgY3VzdG9tIGRhdGEtKiBhdHRyc1xuXHRcdFx0XHRkYXRhID0gZGF0YUF0dHIoIGVsZW0sIGNhbWVsS2V5LCB1bmRlZmluZWQgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSB0cmllZCByZWFsbHkgaGFyZCwgYnV0IHRoZSBkYXRhIGRvZXNuJ3QgZXhpc3QuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBkYXRhLi4uXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIEZpcnN0LCBhdHRlbXB0IHRvIHN0b3JlIGEgY29weSBvciByZWZlcmVuY2Ugb2YgYW55XG5cdFx0XHRcdC8vIGRhdGEgdGhhdCBtaWdodCd2ZSBiZWVuIHN0b3JlIHdpdGggYSBjYW1lbENhc2VkIGtleS5cblx0XHRcdFx0dmFyIGRhdGEgPSBkYXRhX3VzZXIuZ2V0KCB0aGlzLCBjYW1lbEtleSApO1xuXG5cdFx0XHRcdC8vIEZvciBIVE1MNSBkYXRhLSogYXR0cmlidXRlIGludGVyb3AsIHdlIGhhdmUgdG9cblx0XHRcdFx0Ly8gc3RvcmUgcHJvcGVydHkgbmFtZXMgd2l0aCBkYXNoZXMgaW4gYSBjYW1lbENhc2UgZm9ybS5cblx0XHRcdFx0Ly8gVGhpcyBtaWdodCBub3QgYXBwbHkgdG8gYWxsIHByb3BlcnRpZXMuLi4qXG5cdFx0XHRcdGRhdGFfdXNlci5zZXQoIHRoaXMsIGNhbWVsS2V5LCB2YWx1ZSApO1xuXG5cdFx0XHRcdC8vICouLi4gSW4gdGhlIGNhc2Ugb2YgcHJvcGVydGllcyB0aGF0IG1pZ2h0IF9hY3R1YWxseV9cblx0XHRcdFx0Ly8gaGF2ZSBkYXNoZXMsIHdlIG5lZWQgdG8gYWxzbyBzdG9yZSBhIGNvcHkgb2YgdGhhdFxuXHRcdFx0XHQvLyB1bmNoYW5nZWQgcHJvcGVydHkuXG5cdFx0XHRcdGlmICgga2V5LmluZGV4T2YoXCItXCIpICE9PSAtMSAmJiBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0ZGF0YV91c2VyLnNldCggdGhpcywga2V5LCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEsIG51bGwsIHRydWUgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRkYXRhX3VzZXIucmVtb3ZlKCB0aGlzLCBrZXkgKTtcblx0XHR9KTtcblx0fVxufSk7XG5cblxualF1ZXJ5LmV4dGVuZCh7XG5cdHF1ZXVlOiBmdW5jdGlvbiggZWxlbSwgdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgcXVldWU7XG5cblx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHR0eXBlID0gKCB0eXBlIHx8IFwiZnhcIiApICsgXCJxdWV1ZVwiO1xuXHRcdFx0cXVldWUgPSBkYXRhX3ByaXYuZ2V0KCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdC8vIFNwZWVkIHVwIGRlcXVldWUgYnkgZ2V0dGluZyBvdXQgcXVpY2tseSBpZiB0aGlzIGlzIGp1c3QgYSBsb29rdXBcblx0XHRcdGlmICggZGF0YSApIHtcblx0XHRcdFx0aWYgKCAhcXVldWUgfHwgalF1ZXJ5LmlzQXJyYXkoIGRhdGEgKSApIHtcblx0XHRcdFx0XHRxdWV1ZSA9IGRhdGFfcHJpdi5hY2Nlc3MoIGVsZW0sIHR5cGUsIGpRdWVyeS5tYWtlQXJyYXkoZGF0YSkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBkYXRhICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBxdWV1ZSB8fCBbXTtcblx0XHR9XG5cdH0sXG5cblx0ZGVxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCBlbGVtLCB0eXBlICksXG5cdFx0XHRzdGFydExlbmd0aCA9IHF1ZXVlLmxlbmd0aCxcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKSxcblx0XHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCB0eXBlICksXG5cdFx0XHRuZXh0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCBlbGVtLCB0eXBlICk7XG5cdFx0XHR9O1xuXG5cdFx0Ly8gSWYgdGhlIGZ4IHF1ZXVlIGlzIGRlcXVldWVkLCBhbHdheXMgcmVtb3ZlIHRoZSBwcm9ncmVzcyBzZW50aW5lbFxuXHRcdGlmICggZm4gPT09IFwiaW5wcm9ncmVzc1wiICkge1xuXHRcdFx0Zm4gPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0c3RhcnRMZW5ndGgtLTtcblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXG5cdFx0XHQvLyBBZGQgYSBwcm9ncmVzcyBzZW50aW5lbCB0byBwcmV2ZW50IHRoZSBmeCBxdWV1ZSBmcm9tIGJlaW5nXG5cdFx0XHQvLyBhdXRvbWF0aWNhbGx5IGRlcXVldWVkXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiApIHtcblx0XHRcdFx0cXVldWUudW5zaGlmdCggXCJpbnByb2dyZXNzXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xlYXIgdXAgdGhlIGxhc3QgcXVldWUgc3RvcCBmdW5jdGlvblxuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRmbi5jYWxsKCBlbGVtLCBuZXh0LCBob29rcyApO1xuXHRcdH1cblxuXHRcdGlmICggIXN0YXJ0TGVuZ3RoICYmIGhvb2tzICkge1xuXHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBOb3QgcHVibGljIC0gZ2VuZXJhdGUgYSBxdWV1ZUhvb2tzIG9iamVjdCwgb3IgcmV0dXJuIHRoZSBjdXJyZW50IG9uZVxuXHRfcXVldWVIb29rczogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dmFyIGtleSA9IHR5cGUgKyBcInF1ZXVlSG9va3NcIjtcblx0XHRyZXR1cm4gZGF0YV9wcml2LmdldCggZWxlbSwga2V5ICkgfHwgZGF0YV9wcml2LmFjY2VzcyggZWxlbSwga2V5LCB7XG5cdFx0XHRlbXB0eTogalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLmFkZChmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGF0YV9wcml2LnJlbW92ZSggZWxlbSwgWyB0eXBlICsgXCJxdWV1ZVwiLCBrZXkgXSApO1xuXHRcdFx0fSlcblx0XHR9KTtcblx0fVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRxdWV1ZTogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIHNldHRlciA9IDI7XG5cblx0XHRpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0ZGF0YSA9IHR5cGU7XG5cdFx0XHR0eXBlID0gXCJmeFwiO1xuXHRcdFx0c2V0dGVyLS07XG5cdFx0fVxuXG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoIDwgc2V0dGVyICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5xdWV1ZSggdGhpc1swXSwgdHlwZSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRhID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcyA6XG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgZGF0YSApO1xuXG5cdFx0XHRcdC8vIEVuc3VyZSBhIGhvb2tzIGZvciB0aGlzIHF1ZXVlXG5cdFx0XHRcdGpRdWVyeS5fcXVldWVIb29rcyggdGhpcywgdHlwZSApO1xuXG5cdFx0XHRcdGlmICggdHlwZSA9PT0gXCJmeFwiICYmIHF1ZXVlWzBdICE9PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fSxcblx0ZGVxdWV1ZTogZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0fSk7XG5cdH0sXG5cdGNsZWFyUXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcblx0fSxcblx0Ly8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuXHQvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcblx0cHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcblx0XHR2YXIgdG1wLFxuXHRcdFx0Y291bnQgPSAxLFxuXHRcdFx0ZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGVsZW1lbnRzID0gdGhpcyxcblx0XHRcdGkgPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJlc29sdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhKCAtLWNvdW50ICkgKSB7XG5cdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRvYmogPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0bXAgPSBkYXRhX3ByaXYuZ2V0KCBlbGVtZW50c1sgaSBdLCB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgKTtcblx0XHRcdGlmICggdG1wICYmIHRtcC5lbXB0eSApIHtcblx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0dG1wLmVtcHR5LmFkZCggcmVzb2x2ZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXNvbHZlKCk7XG5cdFx0cmV0dXJuIGRlZmVyLnByb21pc2UoIG9iaiApO1xuXHR9XG59KTtcbnZhciBwbnVtID0gKC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvKS5zb3VyY2U7XG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuID0gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuXHRcdC8vIGlzSGlkZGVuIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XG5cdFx0Ly8gaW4gdGhhdCBjYXNlLCBlbGVtZW50IHdpbGwgYmUgc2Vjb25kIGFyZ3VtZW50XG5cdFx0ZWxlbSA9IGVsIHx8IGVsZW07XG5cdFx0cmV0dXJuIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgPT09IFwibm9uZVwiIHx8ICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXHR9O1xuXG52YXIgcmNoZWNrYWJsZVR5cGUgPSAoL14oPzpjaGVja2JveHxyYWRpbykkL2kpO1xuXG5cblxuKGZ1bmN0aW9uKCkge1xuXHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG5cdFx0ZGl2ID0gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApLFxuXHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cblx0Ly8gU3VwcG9ydDogU2FmYXJpPD01LjFcblx0Ly8gQ2hlY2sgc3RhdGUgbG9zdCBpZiB0aGUgbmFtZSBpcyBzZXQgKCMxMTIxNylcblx0Ly8gU3VwcG9ydDogV2luZG93cyBXZWIgQXBwcyAoV1dBKVxuXHQvLyBgbmFtZWAgYW5kIGB0eXBlYCBtdXN0IHVzZSAuc2V0QXR0cmlidXRlIGZvciBXV0EgKCMxNDkwMSlcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwidFwiICk7XG5cblx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXG5cdC8vIFN1cHBvcnQ6IFNhZmFyaTw9NS4xLCBBbmRyb2lkPDQuMlxuXHQvLyBPbGRlciBXZWJLaXQgZG9lc24ndCBjbG9uZSBjaGVja2VkIHN0YXRlIGNvcnJlY3RseSBpbiBmcmFnbWVudHNcblx0c3VwcG9ydC5jaGVja0Nsb25lID0gZGl2LmNsb25lTm9kZSggdHJ1ZSApLmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5jaGVja2VkO1xuXG5cdC8vIFN1cHBvcnQ6IElFPD0xMStcblx0Ly8gTWFrZSBzdXJlIHRleHRhcmVhIChhbmQgY2hlY2tib3gpIGRlZmF1bHRWYWx1ZSBpcyBwcm9wZXJseSBjbG9uZWRcblx0ZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuXHRzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcbn0pKCk7XG52YXIgc3RydW5kZWZpbmVkID0gdHlwZW9mIHVuZGVmaW5lZDtcblxuXG5cbnN1cHBvcnQuZm9jdXNpbkJ1YmJsZXMgPSBcIm9uZm9jdXNpblwiIGluIHdpbmRvdztcblxuXG52YXJcblx0cmtleUV2ZW50ID0gL15rZXkvLFxuXHRybW91c2VFdmVudCA9IC9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudSl8Y2xpY2svLFxuXHRyZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLyxcblx0cnR5cGVuYW1lc3BhY2UgPSAvXihbXi5dKikoPzpcXC4oLispfCkkLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHR9IGNhdGNoICggZXJyICkgeyB9XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cblx0Z2xvYmFsOiB7fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgaGFuZGxlT2JqSW4sIGV2ZW50SGFuZGxlLCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YV9wcml2LmdldCggZWxlbSApO1xuXG5cdFx0Ly8gRG9uJ3QgYXR0YWNoIGV2ZW50cyB0byBub0RhdGEgb3IgdGV4dC9jb21tZW50IG5vZGVzIChidXQgYWxsb3cgcGxhaW4gb2JqZWN0cylcblx0XHRpZiAoICFlbGVtRGF0YSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYW4gb2JqZWN0IG9mIGN1c3RvbSBkYXRhIGluIGxpZXUgb2YgdGhlIGhhbmRsZXJcblx0XHRpZiAoIGhhbmRsZXIuaGFuZGxlciApIHtcblx0XHRcdGhhbmRsZU9iakluID0gaGFuZGxlcjtcblx0XHRcdGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xuXHRcdFx0c2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3Rvcjtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaGFuZGxlciBoYXMgYSB1bmlxdWUgSUQsIHVzZWQgdG8gZmluZC9yZW1vdmUgaXQgbGF0ZXJcblx0XHRpZiAoICFoYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRoYW5kbGVyLmd1aWQgPSBqUXVlcnkuZ3VpZCsrO1xuXHRcdH1cblxuXHRcdC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3Rcblx0XHRpZiAoICEoZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzKSApIHtcblx0XHRcdGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRpZiAoICEoZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUpICkge1xuXHRcdFx0ZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0Ly8gRGlzY2FyZCB0aGUgc2Vjb25kIGV2ZW50IG9mIGEgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoKSBhbmRcblx0XHRcdFx0Ly8gd2hlbiBhbiBldmVudCBpcyBjYWxsZWQgYWZ0ZXIgYSBwYWdlIGhhcyB1bmxvYWRlZFxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIGpRdWVyeSAhPT0gc3RydW5kZWZpbmVkICYmIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSA/XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBlbGVtLCBhcmd1bWVudHMgKSA6IHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgYnkgYSBzcGFjZVxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1t0XSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWzJdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoe1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRvcmlnVHlwZTogb3JpZ1R5cGUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0XHRcdGd1aWQ6IGhhbmRsZXIuZ3VpZCxcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApLFxuXHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbihcIi5cIilcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRpZiAoICEoaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSkgKSB7XG5cdFx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcblx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cblx0XHRcdFx0Ly8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG5cdFx0XHRcdGlmICggIXNwZWNpYWwuc2V0dXAgfHwgc3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdFx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUsIGZhbHNlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggc3BlY2lhbC5hZGQgKSB7XG5cdFx0XHRcdHNwZWNpYWwuYWRkLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXG5cdFx0XHRcdGlmICggIWhhbmRsZU9iai5oYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCA9IGhhbmRsZXIuZ3VpZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgdG8gdGhlIGVsZW1lbnQncyBoYW5kbGVyIGxpc3QsIGRlbGVnYXRlcyBpbiBmcm9udFxuXHRcdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50KyssIDAsIGhhbmRsZU9iaiApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEtlZXAgdHJhY2sgb2Ygd2hpY2ggZXZlbnRzIGhhdmUgZXZlciBiZWVuIHVzZWQsIGZvciBldmVudCBvcHRpbWl6YXRpb25cblx0XHRcdGpRdWVyeS5ldmVudC5nbG9iYWxbIHR5cGUgXSA9IHRydWU7XG5cdFx0fVxuXG5cdH0sXG5cblx0Ly8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XG5cdHJlbW92ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBzZWxlY3RvciwgbWFwcGVkVHlwZXMgKSB7XG5cblx0XHR2YXIgaiwgb3JpZ0NvdW50LCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YV9wcml2Lmhhc0RhdGEoIGVsZW0gKSAmJiBkYXRhX3ByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHRpZiAoICFlbGVtRGF0YSB8fCAhKGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cykgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gT25jZSBmb3IgZWFjaCB0eXBlLm5hbWVzcGFjZSBpbiB0eXBlczsgdHlwZSBtYXkgYmUgb21pdHRlZFxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1t0XSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWzJdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFVuYmluZCBhbGwgZXZlbnRzIChvbiB0aGlzIG5hbWVzcGFjZSwgaWYgcHJvdmlkZWQpIGZvciB0aGUgZWxlbWVudFxuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSArIHR5cGVzWyB0IF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSB8fCBbXTtcblx0XHRcdHRtcCA9IHRtcFsyXSAmJiBuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKFwiXFxcXC4oPzouKlxcXFwufClcIikgKyBcIihcXFxcLnwkKVwiICk7XG5cblx0XHRcdC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcblx0XHRcdG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGogXTtcblxuXHRcdFx0XHRpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXG5cdFx0XHRcdFx0KCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcblx0XHRcdFx0XHQoICF0bXAgfHwgdG1wLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApICYmXG5cdFx0XHRcdFx0KCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuXHRcdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaiwgMSApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGdlbmVyaWMgZXZlbnQgaGFuZGxlciBpZiB3ZSByZW1vdmVkIHNvbWV0aGluZyBhbmQgbm8gbW9yZSBoYW5kbGVycyBleGlzdFxuXHRcdFx0Ly8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG5cdFx0XHRpZiAoIG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnRlYXJkb3duIHx8IHNwZWNpYWwudGVhcmRvd24uY2FsbCggZWxlbSwgbmFtZXNwYWNlcywgZWxlbURhdGEuaGFuZGxlICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZXZlbnRzWyB0eXBlIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcblx0XHRpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBldmVudHMgKSApIHtcblx0XHRcdGRlbGV0ZSBlbGVtRGF0YS5oYW5kbGU7XG5cdFx0XHRkYXRhX3ByaXYucmVtb3ZlKCBlbGVtLCBcImV2ZW50c1wiICk7XG5cdFx0fVxuXHR9LFxuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCBldmVudCwgZGF0YSwgZWxlbSwgb25seUhhbmRsZXJzICkge1xuXG5cdFx0dmFyIGksIGN1ciwgdG1wLCBidWJibGVUeXBlLCBvbnR5cGUsIGhhbmRsZSwgc3BlY2lhbCxcblx0XHRcdGV2ZW50UGF0aCA9IFsgZWxlbSB8fCBkb2N1bWVudCBdLFxuXHRcdFx0dHlwZSA9IGhhc093bi5jYWxsKCBldmVudCwgXCJ0eXBlXCIgKSA/IGV2ZW50LnR5cGUgOiBldmVudCxcblx0XHRcdG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdChcIi5cIikgOiBbXTtcblxuXHRcdGN1ciA9IHRtcCA9IGVsZW0gPSBlbGVtIHx8IGRvY3VtZW50O1xuXG5cdFx0Ly8gRG9uJ3QgZG8gZXZlbnRzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBmb2N1cy9ibHVyIG1vcnBocyB0byBmb2N1c2luL291dDsgZW5zdXJlIHdlJ3JlIG5vdCBmaXJpbmcgdGhlbSByaWdodCBub3dcblx0XHRpZiAoIHJmb2N1c01vcnBoLnRlc3QoIHR5cGUgKyBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlLmluZGV4T2YoXCIuXCIpID49IDAgKSB7XG5cdFx0XHQvLyBOYW1lc3BhY2VkIHRyaWdnZXI7IGNyZWF0ZSBhIHJlZ2V4cCB0byBtYXRjaCBldmVudCB0eXBlIGluIGhhbmRsZSgpXG5cdFx0XHRuYW1lc3BhY2VzID0gdHlwZS5zcGxpdChcIi5cIik7XG5cdFx0XHR0eXBlID0gbmFtZXNwYWNlcy5zaGlmdCgpO1xuXHRcdFx0bmFtZXNwYWNlcy5zb3J0KCk7XG5cdFx0fVxuXHRcdG9udHlwZSA9IHR5cGUuaW5kZXhPZihcIjpcIikgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbihcIi5cIik7XG5cdFx0ZXZlbnQubmFtZXNwYWNlX3JlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKSArIFwiKFxcXFwufCQpXCIgKSA6XG5cdFx0XHRudWxsO1xuXG5cdFx0Ly8gQ2xlYW4gdXAgdGhlIGV2ZW50IGluIGNhc2UgaXQgaXMgYmVpbmcgcmV1c2VkXG5cdFx0ZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xuXHRcdGlmICggIWV2ZW50LnRhcmdldCApIHtcblx0XHRcdGV2ZW50LnRhcmdldCA9IGVsZW07XG5cdFx0fVxuXG5cdFx0Ly8gQ2xvbmUgYW55IGluY29taW5nIGRhdGEgYW5kIHByZXBlbmQgdGhlIGV2ZW50LCBjcmVhdGluZyB0aGUgaGFuZGxlciBhcmcgbGlzdFxuXHRcdGRhdGEgPSBkYXRhID09IG51bGwgP1xuXHRcdFx0WyBldmVudCBdIDpcblx0XHRcdGpRdWVyeS5tYWtlQXJyYXkoIGRhdGEsIFsgZXZlbnQgXSApO1xuXG5cdFx0Ly8gQWxsb3cgc3BlY2lhbCBldmVudHMgdG8gZHJhdyBvdXRzaWRlIHRoZSBsaW5lc1xuXHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiBzcGVjaWFsLnRyaWdnZXIgJiYgc3BlY2lhbC50cmlnZ2VyLmFwcGx5KCBlbGVtLCBkYXRhICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBldmVudCBwcm9wYWdhdGlvbiBwYXRoIGluIGFkdmFuY2UsIHBlciBXM0MgZXZlbnRzIHNwZWMgKCM5OTUxKVxuXHRcdC8vIEJ1YmJsZSB1cCB0byBkb2N1bWVudCwgdGhlbiB0byB3aW5kb3c7IHdhdGNoIGZvciBhIGdsb2JhbCBvd25lckRvY3VtZW50IHZhciAoIzk3MjQpXG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFzcGVjaWFsLm5vQnViYmxlICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0YnViYmxlVHlwZSA9IHNwZWNpYWwuZGVsZWdhdGVUeXBlIHx8IHR5cGU7XG5cdFx0XHRpZiAoICFyZm9jdXNNb3JwaC50ZXN0KCBidWJibGVUeXBlICsgdHlwZSApICkge1xuXHRcdFx0XHRjdXIgPSBjdXIucGFyZW50Tm9kZTtcblx0XHRcdH1cblx0XHRcdGZvciAoIDsgY3VyOyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIGN1ciApO1xuXHRcdFx0XHR0bXAgPSBjdXI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE9ubHkgYWRkIHdpbmRvdyBpZiB3ZSBnb3QgdG8gZG9jdW1lbnQgKGUuZy4sIG5vdCBwbGFpbiBvYmogb3IgZGV0YWNoZWQgRE9NKVxuXHRcdFx0aWYgKCB0bXAgPT09IChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKGN1ciA9IGV2ZW50UGF0aFtpKytdKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0ZXZlbnQudHlwZSA9IGkgPiAxID9cblx0XHRcdFx0YnViYmxlVHlwZSA6XG5cdFx0XHRcdHNwZWNpYWwuYmluZFR5cGUgfHwgdHlwZTtcblxuXHRcdFx0Ly8galF1ZXJ5IGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9ICggZGF0YV9wcml2LmdldCggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmIGRhdGFfcHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBqUXVlcnkuYWNjZXB0RGF0YSggY3VyICkgKSB7XG5cdFx0XHRcdGV2ZW50LnJlc3VsdCA9IGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGV2ZW50LnR5cGUgPSB0eXBlO1xuXG5cdFx0Ly8gSWYgbm9ib2R5IHByZXZlbnRlZCB0aGUgZGVmYXVsdCBhY3Rpb24sIGRvIGl0IG5vd1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cblx0XHRcdGlmICggKCFzcGVjaWFsLl9kZWZhdWx0IHx8IHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSkgJiZcblx0XHRcdFx0alF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIGVsZW1bIHR5cGUgXSApICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2Rcblx0XHRcdFx0XHR0bXAgPSBlbGVtWyBvbnR5cGUgXTtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG5cdFx0XHRcdFx0ZWxlbVsgdHlwZSBdKCk7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRkaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0Ly8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG5cdFx0ZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApO1xuXG5cdFx0dmFyIGksIGosIHJldCwgbWF0Y2hlZCwgaGFuZGxlT2JqLFxuXHRcdFx0aGFuZGxlclF1ZXVlID0gW10sXG5cdFx0XHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG5cdFx0XHRoYW5kbGVycyA9ICggZGF0YV9wcml2LmdldCggdGhpcywgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSB8fCBbXSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZXZlbnQudHlwZSBdIHx8IHt9O1xuXG5cdFx0Ly8gVXNlIHRoZSBmaXgtZWQgalF1ZXJ5LkV2ZW50IHJhdGhlciB0aGFuIHRoZSAocmVhZC1vbmx5KSBuYXRpdmUgZXZlbnRcblx0XHRhcmdzWzBdID0gZXZlbnQ7XG5cdFx0ZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuXHRcdGlmICggc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBoYW5kbGVyc1xuXHRcdGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuXHRcdC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAobWF0Y2hlZCA9IGhhbmRsZXJRdWV1ZVsgaSsrIF0pICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0ZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoIChoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSkgJiYgIWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cblx0XHRcdFx0Ly8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvciAyKSBoYXZlIG5hbWVzcGFjZShzKVxuXHRcdFx0XHQvLyBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cblx0XHRcdFx0aWYgKCAhZXZlbnQubmFtZXNwYWNlX3JlIHx8IGV2ZW50Lm5hbWVzcGFjZV9yZS50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSB7XG5cblx0XHRcdFx0XHRldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG5cdFx0XHRcdFx0cmV0ID0gKCAoalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9KS5oYW5kbGUgfHwgaGFuZGxlT2JqLmhhbmRsZXIgKVxuXHRcdFx0XHRcdFx0XHQuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdGlmICggKGV2ZW50LnJlc3VsdCA9IHJldCkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG5cdFx0aWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcblx0XHRcdHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRoYW5kbGVyczogZnVuY3Rpb24oIGV2ZW50LCBoYW5kbGVycyApIHtcblx0XHR2YXIgaSwgbWF0Y2hlcywgc2VsLCBoYW5kbGVPYmosXG5cdFx0XHRoYW5kbGVyUXVldWUgPSBbXSxcblx0XHRcdGRlbGVnYXRlQ291bnQgPSBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LFxuXHRcdFx0Y3VyID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0Ly8gRmluZCBkZWxlZ2F0ZSBoYW5kbGVyc1xuXHRcdC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICgjMTMxODApXG5cdFx0Ly8gQXZvaWQgbm9uLWxlZnQtY2xpY2sgYnViYmxpbmcgaW4gRmlyZWZveCAoIzM4NjEpXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50ICYmIGN1ci5ub2RlVHlwZSAmJiAoIWV2ZW50LmJ1dHRvbiB8fCBldmVudC50eXBlICE9PSBcImNsaWNrXCIpICkge1xuXG5cdFx0XHRmb3IgKCA7IGN1ciAhPT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcblx0XHRcdFx0aWYgKCBjdXIuZGlzYWJsZWQgIT09IHRydWUgfHwgZXZlbnQudHlwZSAhPT0gXCJjbGlja1wiICkge1xuXHRcdFx0XHRcdG1hdGNoZXMgPSBbXTtcblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGRlbGVnYXRlQ291bnQ7IGkrKyApIHtcblx0XHRcdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBpIF07XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG5cdFx0XHRcdFx0XHRzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcblxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVzWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzWyBzZWwgXSA9IGhhbmRsZU9iai5uZWVkc0NvbnRleHQgP1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggc2VsLCB0aGlzICkuaW5kZXgoIGN1ciApID49IDAgOlxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXNbIHNlbCBdICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG1hdGNoZXMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVzIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCB0aGUgcmVtYWluaW5nIChkaXJlY3RseS1ib3VuZCkgaGFuZGxlcnNcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgPCBoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRoYW5kbGVyUXVldWUucHVzaCh7IGVsZW06IHRoaXMsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVyUXVldWU7XG5cdH0sXG5cblx0Ly8gSW5jbHVkZXMgc29tZSBldmVudCBwcm9wcyBzaGFyZWQgYnkgS2V5RXZlbnQgYW5kIE1vdXNlRXZlbnRcblx0cHJvcHM6IFwiYWx0S2V5IGJ1YmJsZXMgY2FuY2VsYWJsZSBjdHJsS2V5IGN1cnJlbnRUYXJnZXQgZXZlbnRQaGFzZSBtZXRhS2V5IHJlbGF0ZWRUYXJnZXQgc2hpZnRLZXkgdGFyZ2V0IHRpbWVTdGFtcCB2aWV3IHdoaWNoXCIuc3BsaXQoXCIgXCIpLFxuXG5cdGZpeEhvb2tzOiB7fSxcblxuXHRrZXlIb29rczoge1xuXHRcdHByb3BzOiBcImNoYXIgY2hhckNvZGUga2V5IGtleUNvZGVcIi5zcGxpdChcIiBcIiksXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXG5cdFx0XHQvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcblx0XHRcdGlmICggZXZlbnQud2hpY2ggPT0gbnVsbCApIHtcblx0XHRcdFx0ZXZlbnQud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXZlbnQ7XG5cdFx0fVxuXHR9LFxuXG5cdG1vdXNlSG9va3M6IHtcblx0XHRwcm9wczogXCJidXR0b24gYnV0dG9ucyBjbGllbnRYIGNsaWVudFkgb2Zmc2V0WCBvZmZzZXRZIHBhZ2VYIHBhZ2VZIHNjcmVlblggc2NyZWVuWSB0b0VsZW1lbnRcIi5zcGxpdChcIiBcIiksXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXHRcdFx0dmFyIGV2ZW50RG9jLCBkb2MsIGJvZHksXG5cdFx0XHRcdGJ1dHRvbiA9IG9yaWdpbmFsLmJ1dHRvbjtcblxuXHRcdFx0Ly8gQ2FsY3VsYXRlIHBhZ2VYL1kgaWYgbWlzc2luZyBhbmQgY2xpZW50WC9ZIGF2YWlsYWJsZVxuXHRcdFx0aWYgKCBldmVudC5wYWdlWCA9PSBudWxsICYmIG9yaWdpbmFsLmNsaWVudFggIT0gbnVsbCApIHtcblx0XHRcdFx0ZXZlbnREb2MgPSBldmVudC50YXJnZXQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcblx0XHRcdFx0ZG9jID0gZXZlbnREb2MuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHRib2R5ID0gZXZlbnREb2MuYm9keTtcblxuXHRcdFx0XHRldmVudC5wYWdlWCA9IG9yaWdpbmFsLmNsaWVudFggKyAoIGRvYyAmJiBkb2Muc2Nyb2xsTGVmdCB8fCBib2R5ICYmIGJvZHkuc2Nyb2xsTGVmdCB8fCAwICkgLSAoIGRvYyAmJiBkb2MuY2xpZW50TGVmdCB8fCBib2R5ICYmIGJvZHkuY2xpZW50TGVmdCB8fCAwICk7XG5cdFx0XHRcdGV2ZW50LnBhZ2VZID0gb3JpZ2luYWwuY2xpZW50WSArICggZG9jICYmIGRvYy5zY3JvbGxUb3AgIHx8IGJvZHkgJiYgYm9keS5zY3JvbGxUb3AgIHx8IDAgKSAtICggZG9jICYmIGRvYy5jbGllbnRUb3AgIHx8IGJvZHkgJiYgYm9keS5jbGllbnRUb3AgIHx8IDAgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHdoaWNoIGZvciBjbGljazogMSA9PT0gbGVmdDsgMiA9PT0gbWlkZGxlOyAzID09PSByaWdodFxuXHRcdFx0Ly8gTm90ZTogYnV0dG9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyBkb24ndCB1c2UgaXRcblx0XHRcdGlmICggIWV2ZW50LndoaWNoICYmIGJ1dHRvbiAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRldmVudC53aGljaCA9ICggYnV0dG9uICYgMSA/IDEgOiAoIGJ1dHRvbiAmIDIgPyAzIDogKCBidXR0b24gJiA0ID8gMiA6IDAgKSApICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBldmVudDtcblx0XHR9XG5cdH0sXG5cblx0Zml4OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0aWYgKCBldmVudFsgalF1ZXJ5LmV4cGFuZG8gXSApIHtcblx0XHRcdHJldHVybiBldmVudDtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgYSB3cml0YWJsZSBjb3B5IG9mIHRoZSBldmVudCBvYmplY3QgYW5kIG5vcm1hbGl6ZSBzb21lIHByb3BlcnRpZXNcblx0XHR2YXIgaSwgcHJvcCwgY29weSxcblx0XHRcdHR5cGUgPSBldmVudC50eXBlLFxuXHRcdFx0b3JpZ2luYWxFdmVudCA9IGV2ZW50LFxuXHRcdFx0Zml4SG9vayA9IHRoaXMuZml4SG9va3NbIHR5cGUgXTtcblxuXHRcdGlmICggIWZpeEhvb2sgKSB7XG5cdFx0XHR0aGlzLmZpeEhvb2tzWyB0eXBlIF0gPSBmaXhIb29rID1cblx0XHRcdFx0cm1vdXNlRXZlbnQudGVzdCggdHlwZSApID8gdGhpcy5tb3VzZUhvb2tzIDpcblx0XHRcdFx0cmtleUV2ZW50LnRlc3QoIHR5cGUgKSA/IHRoaXMua2V5SG9va3MgOlxuXHRcdFx0XHR7fTtcblx0XHR9XG5cdFx0Y29weSA9IGZpeEhvb2sucHJvcHMgPyB0aGlzLnByb3BzLmNvbmNhdCggZml4SG9vay5wcm9wcyApIDogdGhpcy5wcm9wcztcblxuXHRcdGV2ZW50ID0gbmV3IGpRdWVyeS5FdmVudCggb3JpZ2luYWxFdmVudCApO1xuXG5cdFx0aSA9IGNvcHkubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0cHJvcCA9IGNvcHlbIGkgXTtcblx0XHRcdGV2ZW50WyBwcm9wIF0gPSBvcmlnaW5hbEV2ZW50WyBwcm9wIF07XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogQ29yZG92YSAyLjUgKFdlYktpdCkgKCMxMzI1NSlcblx0XHQvLyBBbGwgZXZlbnRzIHNob3VsZCBoYXZlIGEgdGFyZ2V0OyBDb3Jkb3ZhIGRldmljZXJlYWR5IGRvZXNuJ3Rcblx0XHRpZiAoICFldmVudC50YXJnZXQgKSB7XG5cdFx0XHRldmVudC50YXJnZXQgPSBkb2N1bWVudDtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgNi4wKywgQ2hyb21lPDI4XG5cdFx0Ly8gVGFyZ2V0IHNob3VsZCBub3QgYmUgYSB0ZXh0IG5vZGUgKCM1MDQsICMxMzE0Mylcblx0XHRpZiAoIGV2ZW50LnRhcmdldC5ub2RlVHlwZSA9PT0gMyApIHtcblx0XHRcdGV2ZW50LnRhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmaXhIb29rLmZpbHRlciA/IGZpeEhvb2suZmlsdGVyKCBldmVudCwgb3JpZ2luYWxFdmVudCApIDogZXZlbnQ7XG5cdH0sXG5cblx0c3BlY2lhbDoge1xuXHRcdGxvYWQ6IHtcblx0XHRcdC8vIFByZXZlbnQgdHJpZ2dlcmVkIGltYWdlLmxvYWQgZXZlbnRzIGZyb20gYnViYmxpbmcgdG8gd2luZG93LmxvYWRcblx0XHRcdG5vQnViYmxlOiB0cnVlXG5cdFx0fSxcblx0XHRmb2N1czoge1xuXHRcdFx0Ly8gRmlyZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzICE9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuZm9jdXMgKSB7XG5cdFx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcblx0XHR9LFxuXHRcdGJsdXI6IHtcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5ibHVyICkge1xuXHRcdFx0XHRcdHRoaXMuYmx1cigpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXG5cdFx0fSxcblx0XHRjbGljazoge1xuXHRcdFx0Ly8gRm9yIGNoZWNrYm94LCBmaXJlIG5hdGl2ZSBldmVudCBzbyBjaGVja2VkIHN0YXRlIHdpbGwgYmUgcmlnaHRcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiICYmIHRoaXMuY2xpY2sgJiYgalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR0aGlzLmNsaWNrKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBGb3IgY3Jvc3MtYnJvd3NlciBjb25zaXN0ZW5jeSwgZG9uJ3QgZmlyZSBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3Ncblx0XHRcdF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkubm9kZU5hbWUoIGV2ZW50LnRhcmdldCwgXCJhXCIgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YmVmb3JldW5sb2FkOiB7XG5cdFx0XHRwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDIwK1xuXHRcdFx0XHQvLyBGaXJlZm94IGRvZXNuJ3QgYWxlcnQgaWYgdGhlIHJldHVyblZhbHVlIGZpZWxkIGlzIG5vdCBzZXQuXG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQsIGJ1YmJsZSApIHtcblx0XHQvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmUuXG5cdFx0Ly8gRmFrZSBvcmlnaW5hbEV2ZW50IHRvIGF2b2lkIGRvbm9yJ3Mgc3RvcFByb3BhZ2F0aW9uLCBidXQgaWYgdGhlXG5cdFx0Ly8gc2ltdWxhdGVkIGV2ZW50IHByZXZlbnRzIGRlZmF1bHQgdGhlbiB3ZSBkbyB0aGUgc2FtZSBvbiB0aGUgZG9ub3IuXG5cdFx0dmFyIGUgPSBqUXVlcnkuZXh0ZW5kKFxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCgpLFxuXHRcdFx0ZXZlbnQsXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdGlzU2ltdWxhdGVkOiB0cnVlLFxuXHRcdFx0XHRvcmlnaW5hbEV2ZW50OiB7fVxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0aWYgKCBidWJibGUgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggZSwgbnVsbCwgZWxlbSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQuZGlzcGF0Y2guY2FsbCggZWxlbSwgZSApO1xuXHRcdH1cblx0XHRpZiAoIGUuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGhhbmRsZSApIHtcblx0aWYgKCBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0ZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlLCBoYW5kbGUsIGZhbHNlICk7XG5cdH1cbn07XG5cbmpRdWVyeS5FdmVudCA9IGZ1bmN0aW9uKCBzcmMsIHByb3BzICkge1xuXHQvLyBBbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgdGhlICduZXcnIGtleXdvcmRcblx0aWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQpICkge1xuXHRcdHJldHVybiBuZXcgalF1ZXJ5LkV2ZW50KCBzcmMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBFdmVudCBvYmplY3Rcblx0aWYgKCBzcmMgJiYgc3JjLnR5cGUgKSB7XG5cdFx0dGhpcy5vcmlnaW5hbEV2ZW50ID0gc3JjO1xuXHRcdHRoaXMudHlwZSA9IHNyYy50eXBlO1xuXG5cdFx0Ly8gRXZlbnRzIGJ1YmJsaW5nIHVwIHRoZSBkb2N1bWVudCBtYXkgaGF2ZSBiZWVuIG1hcmtlZCBhcyBwcmV2ZW50ZWRcblx0XHQvLyBieSBhIGhhbmRsZXIgbG93ZXIgZG93biB0aGUgdHJlZTsgcmVmbGVjdCB0aGUgY29ycmVjdCB2YWx1ZS5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHNyYy5kZWZhdWx0UHJldmVudGVkIHx8XG5cdFx0XHRcdHNyYy5kZWZhdWx0UHJldmVudGVkID09PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjBcblx0XHRcdFx0c3JjLnJldHVyblZhbHVlID09PSBmYWxzZSA/XG5cdFx0XHRyZXR1cm5UcnVlIDpcblx0XHRcdHJldHVybkZhbHNlO1xuXG5cdC8vIEV2ZW50IHR5cGVcblx0fSBlbHNlIHtcblx0XHR0aGlzLnR5cGUgPSBzcmM7XG5cdH1cblxuXHQvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuXHRpZiAoIHByb3BzICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRoaXMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBDcmVhdGUgYSB0aW1lc3RhbXAgaWYgaW5jb21pbmcgZXZlbnQgZG9lc24ndCBoYXZlIG9uZVxuXHR0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IGpRdWVyeS5ub3coKTtcblxuXHQvLyBNYXJrIGl0IGFzIGZpeGVkXG5cdHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xufTtcblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAzL1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDAzMDMzMS9lY21hLXNjcmlwdC1iaW5kaW5nLmh0bWxcbmpRdWVyeS5FdmVudC5wcm90b3R5cGUgPSB7XG5cdGlzRGVmYXVsdFByZXZlbnRlZDogcmV0dXJuRmFsc2UsXG5cdGlzUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblx0aXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiBlLnByZXZlbnREZWZhdWx0ICkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fSxcblx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmIGUuc3RvcFByb3BhZ2F0aW9uICkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiApIHtcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxufTtcblxuLy8gQ3JlYXRlIG1vdXNlZW50ZXIvbGVhdmUgZXZlbnRzIHVzaW5nIG1vdXNlb3Zlci9vdXQgYW5kIGV2ZW50LXRpbWUgY2hlY2tzXG4vLyBTdXBwb3J0OiBDaHJvbWUgMTUrXG5qUXVlcnkuZWFjaCh7XG5cdG1vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsXG5cdG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIixcblx0cG9pbnRlcmVudGVyOiBcInBvaW50ZXJvdmVyXCIsXG5cdHBvaW50ZXJsZWF2ZTogXCJwb2ludGVyb3V0XCJcbn0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cdGpRdWVyeS5ldmVudC5zcGVjaWFsWyBvcmlnIF0gPSB7XG5cdFx0ZGVsZWdhdGVUeXBlOiBmaXgsXG5cdFx0YmluZFR5cGU6IGZpeCxcblxuXHRcdGhhbmRsZTogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0dmFyIHJldCxcblx0XHRcdFx0dGFyZ2V0ID0gdGhpcyxcblx0XHRcdFx0cmVsYXRlZCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQsXG5cdFx0XHRcdGhhbmRsZU9iaiA9IGV2ZW50LmhhbmRsZU9iajtcblxuXHRcdFx0Ly8gRm9yIG1vdXNlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuXHRcdFx0Ly8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcblx0XHRcdGlmICggIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSkgKSB7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBoYW5kbGVPYmoub3JpZ1R5cGU7XG5cdFx0XHRcdHJldCA9IGhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGZpeDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXHR9O1xufSk7XG5cbi8vIFN1cHBvcnQ6IEZpcmVmb3gsIENocm9tZSwgU2FmYXJpXG4vLyBDcmVhdGUgXCJidWJibGluZ1wiIGZvY3VzIGFuZCBibHVyIGV2ZW50c1xuaWYgKCAhc3VwcG9ydC5mb2N1c2luQnViYmxlcyApIHtcblx0alF1ZXJ5LmVhY2goeyBmb2N1czogXCJmb2N1c2luXCIsIGJsdXI6IFwiZm9jdXNvdXRcIiB9LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXG5cdFx0Ly8gQXR0YWNoIGEgc2luZ2xlIGNhcHR1cmluZyBoYW5kbGVyIG9uIHRoZSBkb2N1bWVudCB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcblx0XHR2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBmaXgsIGV2ZW50LnRhcmdldCwgalF1ZXJ5LmV2ZW50LmZpeCggZXZlbnQgKSwgdHJ1ZSApO1xuXHRcdFx0fTtcblxuXHRcdGpRdWVyeS5ldmVudC5zcGVjaWFsWyBmaXggXSA9IHtcblx0XHRcdHNldHVwOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuXHRcdFx0XHRcdGF0dGFjaGVzID0gZGF0YV9wcml2LmFjY2VzcyggZG9jLCBmaXggKTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MuYWRkRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRhdGFfcHJpdi5hY2Nlc3MoIGRvYywgZml4LCAoIGF0dGFjaGVzIHx8IDAgKSArIDEgKTtcblx0XHRcdH0sXG5cdFx0XHR0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFfcHJpdi5hY2Nlc3MoIGRvYywgZml4ICkgLSAxO1xuXG5cdFx0XHRcdGlmICggIWF0dGFjaGVzICkge1xuXHRcdFx0XHRcdGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCBvcmlnLCBoYW5kbGVyLCB0cnVlICk7XG5cdFx0XHRcdFx0ZGF0YV9wcml2LnJlbW92ZSggZG9jLCBmaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGFfcHJpdi5hY2Nlc3MoIGRvYywgZml4LCBhdHRhY2hlcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXG5cdG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgLypJTlRFUk5BTCovIG9uZSApIHtcblx0XHR2YXIgb3JpZ0ZuLCB0eXBlO1xuXG5cdFx0Ly8gVHlwZXMgY2FuIGJlIGEgbWFwIG9mIHR5cGVzL2hhbmRsZXJzXG5cdFx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHQvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxuXHRcdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcblx0XHRcdFx0ZGF0YSA9IGRhdGEgfHwgc2VsZWN0b3I7XG5cdFx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggdHlwZSBpbiB0eXBlcyApIHtcblx0XHRcdFx0dGhpcy5vbiggdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0aWYgKCBkYXRhID09IG51bGwgJiYgZm4gPT0gbnVsbCApIHtcblx0XHRcdC8vICggdHlwZXMsIGZuIClcblx0XHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIGlmICggZm4gPT0gbnVsbCApIHtcblx0XHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHQvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuXHRcdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG5cdFx0XHRcdGZuID0gZGF0YTtcblx0XHRcdFx0ZGF0YSA9IHNlbGVjdG9yO1xuXHRcdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoICFmbiApIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdGlmICggb25lID09PSAxICkge1xuXHRcdFx0b3JpZ0ZuID0gZm47XG5cdFx0XHRmbiA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0Ly8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXG5cdFx0XHRcdGpRdWVyeSgpLm9mZiggZXZlbnQgKTtcblx0XHRcdFx0cmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHR9O1xuXHRcdFx0Ly8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cblx0XHRcdGZuLmd1aWQgPSBvcmlnRm4uZ3VpZCB8fCAoIG9yaWdGbi5ndWlkID0galF1ZXJ5Lmd1aWQrKyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIHR5cGVzLCBmbiwgZGF0YSwgc2VsZWN0b3IgKTtcblx0XHR9KTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgMSApO1xuXHR9LFxuXHRvZmY6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGZuICkge1xuXHRcdHZhciBoYW5kbGVPYmosIHR5cGU7XG5cdFx0aWYgKCB0eXBlcyAmJiB0eXBlcy5wcmV2ZW50RGVmYXVsdCAmJiB0eXBlcy5oYW5kbGVPYmogKSB7XG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID8gaGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDogaGFuZGxlT2JqLm9yaWdUeXBlLFxuXHRcdFx0XHRoYW5kbGVPYmouc2VsZWN0b3IsXG5cdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0Ly8gKCB0eXBlcyBbLCBmbl0gKVxuXHRcdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSk7XG5cdH0sXG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG5cdFx0fSk7XG5cdH0sXG5cdHRyaWdnZXJIYW5kbGVyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgZWxlbSA9IHRoaXNbMF07XG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCBlbGVtLCB0cnVlICk7XG5cdFx0fVxuXHR9XG59KTtcblxuXG52YXJcblx0cnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2dpLFxuXHRydGFnTmFtZSA9IC88KFtcXHc6XSspLyxcblx0cmh0bWwgPSAvPHwmIz9cXHcrOy8sXG5cdHJub0lubmVyaHRtbCA9IC88KD86c2NyaXB0fHN0eWxlfGxpbmspL2ksXG5cdC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxuXHRyY2hlY2tlZCA9IC9jaGVja2VkXFxzKig/OltePV18PVxccyouY2hlY2tlZC4pL2ksXG5cdHJzY3JpcHRUeXBlID0gL14kfFxcLyg/OmphdmF8ZWNtYSlzY3JpcHQvaSxcblx0cnNjcmlwdFR5cGVNYXNrZWQgPSAvXnRydWVcXC8oLiopLyxcblx0cmNsZWFuU2NyaXB0ID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nLFxuXG5cdC8vIFdlIGhhdmUgdG8gY2xvc2UgdGhlc2UgdGFncyB0byBzdXBwb3J0IFhIVE1MICgjMTMyMDApXG5cdHdyYXBNYXAgPSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRTlcblx0XHRvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcblxuXHRcdHRoZWFkOiBbIDEsIFwiPHRhYmxlPlwiLCBcIjwvdGFibGU+XCIgXSxcblx0XHRjb2w6IFsgMiwgXCI8dGFibGU+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuXHRcdHRyOiBbIDIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCIgXSxcblx0XHR0ZDogWyAzLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiIF0sXG5cblx0XHRfZGVmYXVsdDogWyAwLCBcIlwiLCBcIlwiIF1cblx0fTtcblxuLy8gU3VwcG9ydDogSUU5XG53cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cbndyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG53cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuLy8gU3VwcG9ydDogMS54IGNvbXBhdGliaWxpdHlcbi8vIE1hbmlwdWxhdGluZyB0YWJsZXMgcmVxdWlyZXMgYSB0Ym9keVxuZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuXHRyZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuXHRcdGpRdWVyeS5ub2RlTmFtZSggY29udGVudC5ub2RlVHlwZSAhPT0gMTEgPyBjb250ZW50IDogY29udGVudC5maXJzdENoaWxkLCBcInRyXCIgKSA/XG5cblx0XHRlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIilbMF0gfHxcblx0XHRcdGVsZW0uYXBwZW5kQ2hpbGQoIGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikgKSA6XG5cdFx0ZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcblx0ZWxlbS50eXBlID0gKGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSAhPT0gbnVsbCkgKyBcIi9cIiArIGVsZW0udHlwZTtcblx0cmV0dXJuIGVsZW07XG59XG5mdW5jdGlvbiByZXN0b3JlU2NyaXB0KCBlbGVtICkge1xuXHR2YXIgbWF0Y2ggPSByc2NyaXB0VHlwZU1hc2tlZC5leGVjKCBlbGVtLnR5cGUgKTtcblxuXHRpZiAoIG1hdGNoICkge1xuXHRcdGVsZW0udHlwZSA9IG1hdGNoWyAxIF07XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbi8vIE1hcmsgc2NyaXB0cyBhcyBoYXZpbmcgYWxyZWFkeSBiZWVuIGV2YWx1YXRlZFxuZnVuY3Rpb24gc2V0R2xvYmFsRXZhbCggZWxlbXMsIHJlZkVsZW1lbnRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZGF0YV9wcml2LnNldChcblx0XHRcdGVsZW1zWyBpIF0sIFwiZ2xvYmFsRXZhbFwiLCAhcmVmRWxlbWVudHMgfHwgZGF0YV9wcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuXHRcdCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xvbmVDb3B5RXZlbnQoIHNyYywgZGVzdCApIHtcblx0dmFyIGksIGwsIHR5cGUsIHBkYXRhT2xkLCBwZGF0YUN1ciwgdWRhdGFPbGQsIHVkYXRhQ3VyLCBldmVudHM7XG5cblx0aWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIDEuIENvcHkgcHJpdmF0ZSBkYXRhOiBldmVudHMsIGhhbmRsZXJzLCBldGMuXG5cdGlmICggZGF0YV9wcml2Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHBkYXRhT2xkID0gZGF0YV9wcml2LmFjY2Vzcyggc3JjICk7XG5cdFx0cGRhdGFDdXIgPSBkYXRhX3ByaXYuc2V0KCBkZXN0LCBwZGF0YU9sZCApO1xuXHRcdGV2ZW50cyA9IHBkYXRhT2xkLmV2ZW50cztcblxuXHRcdGlmICggZXZlbnRzICkge1xuXHRcdFx0ZGVsZXRlIHBkYXRhQ3VyLmhhbmRsZTtcblx0XHRcdHBkYXRhQ3VyLmV2ZW50cyA9IHt9O1xuXG5cdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBldmVudHNbIHR5cGUgXS5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gMi4gQ29weSB1c2VyIGRhdGFcblx0aWYgKCBkYXRhX3VzZXIuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0dWRhdGFPbGQgPSBkYXRhX3VzZXIuYWNjZXNzKCBzcmMgKTtcblx0XHR1ZGF0YUN1ciA9IGpRdWVyeS5leHRlbmQoIHt9LCB1ZGF0YU9sZCApO1xuXG5cdFx0ZGF0YV91c2VyLnNldCggZGVzdCwgdWRhdGFDdXIgKTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRBbGwoIGNvbnRleHQsIHRhZyApIHtcblx0dmFyIHJldCA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKSA6XG5cdFx0XHRjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyB8fCBcIipcIiApIDpcblx0XHRcdFtdO1xuXG5cdHJldHVybiB0YWcgPT09IHVuZGVmaW5lZCB8fCB0YWcgJiYgalF1ZXJ5Lm5vZGVOYW1lKCBjb250ZXh0LCB0YWcgKSA/XG5cdFx0alF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgcmV0ICkgOlxuXHRcdHJldDtcbn1cblxuLy8gRml4IElFIGJ1Z3MsIHNlZSBzdXBwb3J0IHRlc3RzXG5mdW5jdGlvbiBmaXhJbnB1dCggc3JjLCBkZXN0ICkge1xuXHR2YXIgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0Ly8gRmFpbHMgdG8gcGVyc2lzdCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiBhIGNsb25lZCBjaGVja2JveCBvciByYWRpbyBidXR0b24uXG5cdGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuXHRcdGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG5cdC8vIEZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcblx0XHRkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG5cdH1cbn1cblxualF1ZXJ5LmV4dGVuZCh7XG5cdGNsb25lOiBmdW5jdGlvbiggZWxlbSwgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0dmFyIGksIGwsIHNyY0VsZW1lbnRzLCBkZXN0RWxlbWVudHMsXG5cdFx0XHRjbG9uZSA9IGVsZW0uY2xvbmVOb2RlKCB0cnVlICksXG5cdFx0XHRpblBhZ2UgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gRml4IElFIGNsb25pbmcgaXNzdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCAmJiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEgKSAmJlxuXHRcdFx0XHQhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cDovL2pzcGVyZi5jb20vZ2V0YWxsLXZzLXNpenpsZS8yXG5cdFx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG5cdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG5cdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zml4SW5wdXQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuXHRcdGlmICggZGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdGlmICggZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRcdHNyY0VsZW1lbnRzID0gc3JjRWxlbWVudHMgfHwgZ2V0QWxsKCBlbGVtICk7XG5cdFx0XHRcdGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XG5cblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lLCBcInNjcmlwdFwiICk7XG5cdFx0aWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRidWlsZEZyYWdtZW50OiBmdW5jdGlvbiggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiApIHtcblx0XHR2YXIgZWxlbSwgdG1wLCB0YWcsIHdyYXAsIGNvbnRhaW5zLCBqLFxuXHRcdFx0ZnJhZ21lbnQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRcdG5vZGVzID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRlbGVtID0gZWxlbXNbIGkgXTtcblxuXHRcdFx0aWYgKCBlbGVtIHx8IGVsZW0gPT09IDAgKSB7XG5cblx0XHRcdFx0Ly8gQWRkIG5vZGVzIGRpcmVjdGx5XG5cdFx0XHRcdGlmICggalF1ZXJ5LnR5cGUoIGVsZW0gKSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBRdFdlYktpdCwgUGhhbnRvbUpTXG5cdFx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbIGVsZW0gXSA6IGVsZW0gKTtcblxuXHRcdFx0XHQvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcblx0XHRcdFx0fSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcblx0XHRcdFx0XHRub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcblxuXHRcdFx0XHQvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0bXAgPSB0bXAgfHwgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGNvbnRleHQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApO1xuXG5cdFx0XHRcdFx0Ly8gRGVzZXJpYWxpemUgYSBzdGFuZGFyZCByZXByZXNlbnRhdGlvblxuXHRcdFx0XHRcdHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXHRcdFx0XHRcdHRtcC5pbm5lckhUTUwgPSB3cmFwWyAxIF0gKyBlbGVtLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApICsgd3JhcFsgMiBdO1xuXG5cdFx0XHRcdFx0Ly8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG5cdFx0XHRcdFx0aiA9IHdyYXBbIDAgXTtcblx0XHRcdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0XHRcdHRtcCA9IHRtcC5sYXN0Q2hpbGQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogUXRXZWJLaXQsIFBoYW50b21KU1xuXHRcdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xuXG5cdFx0XHRcdFx0Ly8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXJcblx0XHRcdFx0XHR0bXAgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0XHRcdFx0Ly8gRW5zdXJlIHRoZSBjcmVhdGVkIG5vZGVzIGFyZSBvcnBoYW5lZCAoIzEyMzkyKVxuXHRcdFx0XHRcdHRtcC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgd3JhcHBlciBmcm9tIGZyYWdtZW50XG5cdFx0ZnJhZ21lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAoZWxlbSA9IG5vZGVzWyBpKysgXSkgKSB7XG5cblx0XHRcdC8vICM0MDg3IC0gSWYgb3JpZ2luIGFuZCBkZXN0aW5hdGlvbiBlbGVtZW50cyBhcmUgdGhlIHNhbWUsIGFuZCB0aGlzIGlzXG5cdFx0XHQvLyB0aGF0IGVsZW1lbnQsIGRvIG5vdCBkbyBhbnl0aGluZ1xuXHRcdFx0aWYgKCBzZWxlY3Rpb24gJiYgalF1ZXJ5LmluQXJyYXkoIGVsZW0sIHNlbGVjdGlvbiApICE9PSAtMSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnRhaW5zID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuXHRcdFx0Ly8gQXBwZW5kIHRvIGZyYWdtZW50XG5cdFx0XHR0bXAgPSBnZXRBbGwoIGZyYWdtZW50LmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcblxuXHRcdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdFx0aWYgKCBjb250YWlucyApIHtcblx0XHRcdFx0c2V0R2xvYmFsRXZhbCggdG1wICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcblx0XHRcdGlmICggc2NyaXB0cyApIHtcblx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSB0bXBbIGorKyBdKSApIHtcblx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIGVsZW0udHlwZSB8fCBcIlwiICkgKSB7XG5cdFx0XHRcdFx0XHRzY3JpcHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZnJhZ21lbnQ7XG5cdH0sXG5cblx0Y2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cdFx0dmFyIGRhdGEsIGVsZW0sIHR5cGUsIGtleSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbCxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoZWxlbSA9IGVsZW1zWyBpIF0pICE9PSB1bmRlZmluZWQ7IGkrKyApIHtcblx0XHRcdGlmICggalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblx0XHRcdFx0a2V5ID0gZWxlbVsgZGF0YV9wcml2LmV4cGFuZG8gXTtcblxuXHRcdFx0XHRpZiAoIGtleSAmJiAoZGF0YSA9IGRhdGFfcHJpdi5jYWNoZVsga2V5IF0pICkge1xuXHRcdFx0XHRcdGlmICggZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCB0eXBlIGluIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWxbIHR5cGUgXSApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIHNob3J0Y3V0IHRvIGF2b2lkIGpRdWVyeS5ldmVudC5yZW1vdmUncyBvdmVyaGVhZFxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIGRhdGFfcHJpdi5jYWNoZVsga2V5IF0gKSB7XG5cdFx0XHRcdFx0XHQvLyBEaXNjYXJkIGFueSByZW1haW5pbmcgYHByaXZhdGVgIGRhdGFcblx0XHRcdFx0XHRcdGRlbGV0ZSBkYXRhX3ByaXYuY2FjaGVbIGtleSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gRGlzY2FyZCBhbnkgcmVtYWluaW5nIGB1c2VyYCBkYXRhXG5cdFx0XHRkZWxldGUgZGF0YV91c2VyLmNhY2hlWyBlbGVtWyBkYXRhX3VzZXIuZXhwYW5kbyBdIF07XG5cdFx0fVxuXHR9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdHRleHQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS50ZXh0KCB0aGlzICkgOlxuXHRcdFx0XHR0aGlzLmVtcHR5KCkuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0YXBwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5kb21NYW5pcCggYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdHByZXBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZSggZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRiZWZvcmU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRhZnRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcy5uZXh0U2libGluZyApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCBrZWVwRGF0YSAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGVsZW1zID0gc2VsZWN0b3IgPyBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgdGhpcyApIDogdGhpcyxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRpZiAoICFrZWVwRGF0YSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0gKSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0aWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xuXHRcdFx0XHRcdHNldEdsb2JhbEV2YWwoIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7IChlbGVtID0gdGhpc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgcmVtYWluaW5nIG5vZGVzXG5cdFx0XHRcdGVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiggZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0ZGF0YUFuZEV2ZW50cyA9IGRhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGZhbHNlIDogZGF0YUFuZEV2ZW50cztcblx0XHRkZWVwRGF0YUFuZEV2ZW50cyA9IGRlZXBEYXRhQW5kRXZlbnRzID09IG51bGwgPyBkYXRhQW5kRXZlbnRzIDogZGVlcERhdGFBbmRFdmVudHM7XG5cblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmNsb25lKCB0aGlzLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGh0bWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmlubmVySFRNTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2VlIGlmIHdlIGNhbiB0YWtlIGEgc2hvcnRjdXQgYW5kIGp1c3QgdXNlIGlubmVySFRNTFxuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgIXJub0lubmVyaHRtbC50ZXN0KCB2YWx1ZSApICYmXG5cdFx0XHRcdCF3cmFwTWFwWyAoIHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCkgXSApIHtcblxuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXSB8fCB7fTtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW0gPSAwO1xuXG5cdFx0XHRcdC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuXHRcdFx0XHR9IGNhdGNoKCBlICkge31cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0XHR0aGlzLmVtcHR5KCkuYXBwZW5kKCB2YWx1ZSApO1xuXHRcdFx0fVxuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0cmVwbGFjZVdpdGg6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBhcmcgPSBhcmd1bWVudHNbIDAgXTtcblxuXHRcdC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuXHRcdHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRhcmcgPSB0aGlzLnBhcmVudE5vZGU7XG5cblx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XG5cblx0XHRcdGlmICggYXJnICkge1xuXHRcdFx0XHRhcmcucmVwbGFjZUNoaWxkKCBlbGVtLCB0aGlzICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBGb3JjZSByZW1vdmFsIGlmIHRoZXJlIHdhcyBubyBuZXcgY29udGVudCAoZS5nLiwgZnJvbSBlbXB0eSBhcmd1bWVudHMpXG5cdFx0cmV0dXJuIGFyZyAmJiAoYXJnLmxlbmd0aCB8fCBhcmcubm9kZVR5cGUpID8gdGhpcyA6IHRoaXMucmVtb3ZlKCk7XG5cdH0sXG5cblx0ZGV0YWNoOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVtb3ZlKCBzZWxlY3RvciwgdHJ1ZSApO1xuXHR9LFxuXG5cdGRvbU1hbmlwOiBmdW5jdGlvbiggYXJncywgY2FsbGJhY2sgKSB7XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0YXJncyA9IGNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuXHRcdHZhciBmcmFnbWVudCwgZmlyc3QsIHNjcmlwdHMsIGhhc1NjcmlwdHMsIG5vZGUsIGRvYyxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0c2V0ID0gdGhpcyxcblx0XHRcdGlOb0Nsb25lID0gbCAtIDEsXG5cdFx0XHR2YWx1ZSA9IGFyZ3NbIDAgXSxcblx0XHRcdGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHRcdC8vIFdlIGNhbid0IGNsb25lTm9kZSBmcmFnbWVudHMgdGhhdCBjb250YWluIGNoZWNrZWQsIGluIFdlYktpdFxuXHRcdGlmICggaXNGdW5jdGlvbiB8fFxuXHRcdFx0XHQoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHRcdCFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaW5kZXggKSB7XG5cdFx0XHRcdHZhciBzZWxmID0gc2V0LmVxKCBpbmRleCApO1xuXHRcdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdFx0YXJnc1sgMCBdID0gdmFsdWUuY2FsbCggdGhpcywgaW5kZXgsIHNlbGYuaHRtbCgpICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VsZi5kb21NYW5pcCggYXJncywgY2FsbGJhY2sgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICggbCApIHtcblx0XHRcdGZyYWdtZW50ID0galF1ZXJ5LmJ1aWxkRnJhZ21lbnQoIGFyZ3MsIHRoaXNbIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgdGhpcyApO1xuXHRcdFx0Zmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0XHRpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0XHRmcmFnbWVudCA9IGZpcnN0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGZpcnN0ICkge1xuXHRcdFx0XHRzY3JpcHRzID0galF1ZXJ5Lm1hcCggZ2V0QWxsKCBmcmFnbWVudCwgXCJzY3JpcHRcIiApLCBkaXNhYmxlU2NyaXB0ICk7XG5cdFx0XHRcdGhhc1NjcmlwdHMgPSBzY3JpcHRzLmxlbmd0aDtcblxuXHRcdFx0XHQvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtIGluc3RlYWQgb2YgdGhlIGZpcnN0IGJlY2F1c2UgaXQgY2FuIGVuZCB1cFxuXHRcdFx0XHQvLyBiZWluZyBlbXB0aWVkIGluY29ycmVjdGx5IGluIGNlcnRhaW4gc2l0dWF0aW9ucyAoIzgwNzApLlxuXHRcdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IGZyYWdtZW50O1xuXG5cdFx0XHRcdFx0aWYgKCBpICE9PSBpTm9DbG9uZSApIHtcblx0XHRcdFx0XHRcdG5vZGUgPSBqUXVlcnkuY2xvbmUoIG5vZGUsIHRydWUsIHRydWUgKTtcblxuXHRcdFx0XHRcdFx0Ly8gS2VlcCByZWZlcmVuY2VzIHRvIGNsb25lZCBzY3JpcHRzIGZvciBsYXRlciByZXN0b3JhdGlvblxuXHRcdFx0XHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBRdFdlYktpdFxuXHRcdFx0XHRcdFx0XHQvLyBqUXVlcnkubWVyZ2UgYmVjYXVzZSBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzXG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggc2NyaXB0cywgZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKCB0aGlzWyBpIF0sIG5vZGUsIGkgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblx0XHRcdFx0XHRkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRcdFx0Ly8gUmVlbmFibGUgc2NyaXB0c1xuXHRcdFx0XHRcdGpRdWVyeS5tYXAoIHNjcmlwdHMsIHJlc3RvcmVTY3JpcHQgKTtcblxuXHRcdFx0XHRcdC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcblx0XHRcdFx0XHRcdG5vZGUgPSBzY3JpcHRzWyBpIF07XG5cdFx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcblx0XHRcdFx0XHRcdFx0IWRhdGFfcHJpdi5hY2Nlc3MoIG5vZGUsIFwiZ2xvYmFsRXZhbFwiICkgJiYgalF1ZXJ5LmNvbnRhaW5zKCBkb2MsIG5vZGUgKSApIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUuc3JjICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIE9wdGlvbmFsIEFKQVggZGVwZW5kZW5jeSwgYnV0IHdvbid0IHJ1biBzY3JpcHRzIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuX2V2YWxVcmwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuX2V2YWxVcmwoIG5vZGUuc3JjICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5nbG9iYWxFdmFsKCBub2RlLnRleHRDb250ZW50LnJlcGxhY2UoIHJjbGVhblNjcmlwdCwgXCJcIiApICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSk7XG5cbmpRdWVyeS5lYWNoKHtcblx0YXBwZW5kVG86IFwiYXBwZW5kXCIsXG5cdHByZXBlbmRUbzogXCJwcmVwZW5kXCIsXG5cdGluc2VydEJlZm9yZTogXCJiZWZvcmVcIixcblx0aW5zZXJ0QWZ0ZXI6IFwiYWZ0ZXJcIixcblx0cmVwbGFjZUFsbDogXCJyZXBsYWNlV2l0aFwiXG59LCBmdW5jdGlvbiggbmFtZSwgb3JpZ2luYWwgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBlbGVtcyxcblx0XHRcdHJldCA9IFtdLFxuXHRcdFx0aW5zZXJ0ID0galF1ZXJ5KCBzZWxlY3RvciApLFxuXHRcdFx0bGFzdCA9IGluc2VydC5sZW5ndGggLSAxLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7IGkgPD0gbGFzdDsgaSsrICkge1xuXHRcdFx0ZWxlbXMgPSBpID09PSBsYXN0ID8gdGhpcyA6IHRoaXMuY2xvbmUoIHRydWUgKTtcblx0XHRcdGpRdWVyeSggaW5zZXJ0WyBpIF0gKVsgb3JpZ2luYWwgXSggZWxlbXMgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogUXRXZWJLaXRcblx0XHRcdC8vIC5nZXQoKSBiZWNhdXNlIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Ncblx0XHRcdHB1c2guYXBwbHkoIHJldCwgZWxlbXMuZ2V0KCkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHJldCApO1xuXHR9O1xufSk7XG5cblxudmFyIGlmcmFtZSxcblx0ZWxlbWRpc3BsYXkgPSB7fTtcblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgYWN0dWFsIGRpc3BsYXkgb2YgYSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBub2RlTmFtZSBvZiB0aGUgZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBEb2N1bWVudCBvYmplY3RcbiAqL1xuLy8gQ2FsbGVkIG9ubHkgZnJvbSB3aXRoaW4gZGVmYXVsdERpc3BsYXlcbmZ1bmN0aW9uIGFjdHVhbERpc3BsYXkoIG5hbWUsIGRvYyApIHtcblx0dmFyIHN0eWxlLFxuXHRcdGVsZW0gPSBqUXVlcnkoIGRvYy5jcmVhdGVFbGVtZW50KCBuYW1lICkgKS5hcHBlbmRUbyggZG9jLmJvZHkgKSxcblxuXHRcdC8vIGdldERlZmF1bHRDb21wdXRlZFN0eWxlIG1pZ2h0IGJlIHJlbGlhYmx5IHVzZWQgb25seSBvbiBhdHRhY2hlZCBlbGVtZW50XG5cdFx0ZGlzcGxheSA9IHdpbmRvdy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSAmJiAoIHN0eWxlID0gd2luZG93LmdldERlZmF1bHRDb21wdXRlZFN0eWxlKCBlbGVtWyAwIF0gKSApID9cblxuXHRcdFx0Ly8gVXNlIG9mIHRoaXMgbWV0aG9kIGlzIGEgdGVtcG9yYXJ5IGZpeCAobW9yZSBsaWtlIG9wdGltaXphdGlvbikgdW50aWwgc29tZXRoaW5nIGJldHRlciBjb21lcyBhbG9uZyxcblx0XHRcdC8vIHNpbmNlIGl0IHdhcyByZW1vdmVkIGZyb20gc3BlY2lmaWNhdGlvbiBhbmQgc3VwcG9ydGVkIG9ubHkgaW4gRkZcblx0XHRcdHN0eWxlLmRpc3BsYXkgOiBqUXVlcnkuY3NzKCBlbGVtWyAwIF0sIFwiZGlzcGxheVwiICk7XG5cblx0Ly8gV2UgZG9uJ3QgaGF2ZSBhbnkgZGF0YSBzdG9yZWQgb24gdGhlIGVsZW1lbnQsXG5cdC8vIHNvIHVzZSBcImRldGFjaFwiIG1ldGhvZCBhcyBmYXN0IHdheSB0byBnZXQgcmlkIG9mIHRoZSBlbGVtZW50XG5cdGVsZW0uZGV0YWNoKCk7XG5cblx0cmV0dXJuIGRpc3BsYXk7XG59XG5cbi8qKlxuICogVHJ5IHRvIGRldGVybWluZSB0aGUgZGVmYXVsdCBkaXNwbGF5IHZhbHVlIG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBub2RlTmFtZVxuICovXG5mdW5jdGlvbiBkZWZhdWx0RGlzcGxheSggbm9kZU5hbWUgKSB7XG5cdHZhciBkb2MgPSBkb2N1bWVudCxcblx0XHRkaXNwbGF5ID0gZWxlbWRpc3BsYXlbIG5vZGVOYW1lIF07XG5cblx0aWYgKCAhZGlzcGxheSApIHtcblx0XHRkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xuXG5cdFx0Ly8gSWYgdGhlIHNpbXBsZSB3YXkgZmFpbHMsIHJlYWQgZnJvbSBpbnNpZGUgYW4gaWZyYW1lXG5cdFx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiB8fCAhZGlzcGxheSApIHtcblxuXHRcdFx0Ly8gVXNlIHRoZSBhbHJlYWR5LWNyZWF0ZWQgaWZyYW1lIGlmIHBvc3NpYmxlXG5cdFx0XHRpZnJhbWUgPSAoaWZyYW1lIHx8IGpRdWVyeSggXCI8aWZyYW1lIGZyYW1lYm9yZGVyPScwJyB3aWR0aD0nMCcgaGVpZ2h0PScwJy8+XCIgKSkuYXBwZW5kVG8oIGRvYy5kb2N1bWVudEVsZW1lbnQgKTtcblxuXHRcdFx0Ly8gQWx3YXlzIHdyaXRlIGEgbmV3IEhUTUwgc2tlbGV0b24gc28gV2Via2l0IGFuZCBGaXJlZm94IGRvbid0IGNob2tlIG9uIHJldXNlXG5cdFx0XHRkb2MgPSBpZnJhbWVbIDAgXS5jb250ZW50RG9jdW1lbnQ7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFXG5cdFx0XHRkb2Mud3JpdGUoKTtcblx0XHRcdGRvYy5jbG9zZSgpO1xuXG5cdFx0XHRkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xuXHRcdFx0aWZyYW1lLmRldGFjaCgpO1xuXHRcdH1cblxuXHRcdC8vIFN0b3JlIHRoZSBjb3JyZWN0IGRlZmF1bHQgZGlzcGxheVxuXHRcdGVsZW1kaXNwbGF5WyBub2RlTmFtZSBdID0gZGlzcGxheTtcblx0fVxuXG5cdHJldHVybiBkaXNwbGF5O1xufVxudmFyIHJtYXJnaW4gPSAoL15tYXJnaW4vKTtcblxudmFyIHJudW1ub25weCA9IG5ldyBSZWdFeHAoIFwiXihcIiArIHBudW0gKyBcIikoPyFweClbYS16JV0rJFwiLCBcImlcIiApO1xuXG52YXIgZ2V0U3R5bGVzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0Ly8gU3VwcG9ydDogSUU8PTExKywgRmlyZWZveDw9MzArICgjMTUwOTgsICMxNDE1MClcblx0XHQvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcblx0XHQvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcblx0XHRpZiAoIGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5vcGVuZXIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKTtcblx0fTtcblxuXG5cbmZ1bmN0aW9uIGN1ckNTUyggZWxlbSwgbmFtZSwgY29tcHV0ZWQgKSB7XG5cdHZhciB3aWR0aCwgbWluV2lkdGgsIG1heFdpZHRoLCByZXQsXG5cdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdGNvbXB1dGVkID0gY29tcHV0ZWQgfHwgZ2V0U3R5bGVzKCBlbGVtICk7XG5cblx0Ly8gU3VwcG9ydDogSUU5XG5cdC8vIGdldFByb3BlcnR5VmFsdWUgaXMgb25seSBuZWVkZWQgZm9yIC5jc3MoJ2ZpbHRlcicpICgjMTI1MzcpXG5cdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0cmV0ID0gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSggbmFtZSApIHx8IGNvbXB1dGVkWyBuYW1lIF07XG5cdH1cblxuXHRpZiAoIGNvbXB1dGVkICkge1xuXG5cdFx0aWYgKCByZXQgPT09IFwiXCIgJiYgIWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgKSB7XG5cdFx0XHRyZXQgPSBqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUgKTtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBpT1MgPCA2XG5cdFx0Ly8gQSB0cmlidXRlIHRvIHRoZSBcImF3ZXNvbWUgaGFjayBieSBEZWFuIEVkd2FyZHNcIlxuXHRcdC8vIGlPUyA8IDYgKGF0IGxlYXN0KSByZXR1cm5zIHBlcmNlbnRhZ2UgZm9yIGEgbGFyZ2VyIHNldCBvZiB2YWx1ZXMsIGJ1dCB3aWR0aCBzZWVtcyB0byBiZSByZWxpYWJseSBwaXhlbHNcblx0XHQvLyB0aGlzIGlzIGFnYWluc3QgdGhlIENTU09NIGRyYWZ0IHNwZWM6IGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzc29tLyNyZXNvbHZlZC12YWx1ZXNcblx0XHRpZiAoIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiBybWFyZ2luLnRlc3QoIG5hbWUgKSApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0d2lkdGggPSBzdHlsZS53aWR0aDtcblx0XHRcdG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG5cdFx0XHRtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG5cdFx0XHQvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG5cdFx0XHRyZXQgPSBjb21wdXRlZC53aWR0aDtcblxuXHRcdFx0Ly8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XG5cdFx0XHRzdHlsZS5tYXhXaWR0aCA9IG1heFdpZHRoO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQgIT09IHVuZGVmaW5lZCA/XG5cdFx0Ly8gU3VwcG9ydDogSUVcblx0XHQvLyBJRSByZXR1cm5zIHpJbmRleCB2YWx1ZSBhcyBhbiBpbnRlZ2VyLlxuXHRcdHJldCArIFwiXCIgOlxuXHRcdHJldDtcbn1cblxuXG5mdW5jdGlvbiBhZGRHZXRIb29rSWYoIGNvbmRpdGlvbkZuLCBob29rRm4gKSB7XG5cdC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZGl0aW9uRm4oKSApIHtcblx0XHRcdFx0Ly8gSG9vayBub3QgbmVlZGVkIChvciBpdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgaXQgZHVlXG5cdFx0XHRcdC8vIHRvIG1pc3NpbmcgZGVwZW5kZW5jeSksIHJlbW92ZSBpdC5cblx0XHRcdFx0ZGVsZXRlIHRoaXMuZ2V0O1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhvb2sgbmVlZGVkOyByZWRlZmluZSBpdCBzbyB0aGF0IHRoZSBzdXBwb3J0IHRlc3QgaXMgbm90IGV4ZWN1dGVkIGFnYWluLlxuXHRcdFx0cmV0dXJuICh0aGlzLmdldCA9IGhvb2tGbikuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdH1cblx0fTtcbn1cblxuXG4oZnVuY3Rpb24oKSB7XG5cdHZhciBwaXhlbFBvc2l0aW9uVmFsLCBib3hTaXppbmdSZWxpYWJsZVZhbCxcblx0XHRkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuXHRcdGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSxcblx0XHRkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cblx0aWYgKCAhZGl2LnN0eWxlICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0Ly8gU3R5bGUgb2YgY2xvbmVkIGVsZW1lbnQgYWZmZWN0cyBzb3VyY2UgZWxlbWVudCBjbG9uZWQgKCM4OTA4KVxuXHRkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcImNvbnRlbnQtYm94XCI7XG5cdGRpdi5jbG9uZU5vZGUoIHRydWUgKS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiXCI7XG5cdHN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlID0gZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID09PSBcImNvbnRlbnQtYm94XCI7XG5cblx0Y29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcImJvcmRlcjowO3dpZHRoOjA7aGVpZ2h0OjA7dG9wOjA7bGVmdDotOTk5OXB4O21hcmdpbi10b3A6MXB4O1wiICtcblx0XHRcInBvc2l0aW9uOmFic29sdXRlXCI7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZGl2ICk7XG5cblx0Ly8gRXhlY3V0aW5nIGJvdGggcGl4ZWxQb3NpdGlvbiAmIGJveFNpemluZ1JlbGlhYmxlIHRlc3RzIHJlcXVpcmUgb25seSBvbmUgbGF5b3V0XG5cdC8vIHNvIHRoZXkncmUgZXhlY3V0ZWQgYXQgdGhlIHNhbWUgdGltZSB0byBzYXZlIHRoZSBzZWNvbmQgY29tcHV0YXRpb24uXG5cdGZ1bmN0aW9uIGNvbXB1dGVQaXhlbFBvc2l0aW9uQW5kQm94U2l6aW5nUmVsaWFibGUoKSB7XG5cdFx0ZGl2LnN0eWxlLmNzc1RleHQgPVxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveDwyOSwgQW5kcm9pZCAyLjNcblx0XHRcdC8vIFZlbmRvci1wcmVmaXggYm94LXNpemluZ1xuXHRcdFx0XCItd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDtcIiArXG5cdFx0XHRcImJveC1zaXppbmc6Ym9yZGVyLWJveDtkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6MSU7dG9wOjElO1wiICtcblx0XHRcdFwiYm9yZGVyOjFweDtwYWRkaW5nOjFweDt3aWR0aDo0cHg7cG9zaXRpb246YWJzb2x1dGVcIjtcblx0XHRkaXYuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBjb250YWluZXIgKTtcblxuXHRcdHZhciBkaXZTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYsIG51bGwgKTtcblx0XHRwaXhlbFBvc2l0aW9uVmFsID0gZGl2U3R5bGUudG9wICE9PSBcIjElXCI7XG5cdFx0Ym94U2l6aW5nUmVsaWFibGVWYWwgPSBkaXZTdHlsZS53aWR0aCA9PT0gXCI0cHhcIjtcblxuXHRcdGRvY0VsZW0ucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xuXHR9XG5cblx0Ly8gU3VwcG9ydDogbm9kZS5qcyBqc2RvbVxuXHQvLyBEb24ndCBhc3N1bWUgdGhhdCBnZXRDb21wdXRlZFN0eWxlIGlzIGEgcHJvcGVydHkgb2YgdGhlIGdsb2JhbCBvYmplY3Rcblx0aWYgKCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCBzdXBwb3J0LCB7XG5cdFx0XHRwaXhlbFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvLyBUaGlzIHRlc3QgaXMgZXhlY3V0ZWQgb25seSBvbmNlIGJ1dCB3ZSBzdGlsbCBkbyBtZW1vaXppbmdcblx0XHRcdFx0Ly8gc2luY2Ugd2UgY2FuIHVzZSB0aGUgYm94U2l6aW5nUmVsaWFibGUgcHJlLWNvbXB1dGluZy5cblx0XHRcdFx0Ly8gTm8gbmVlZCB0byBjaGVjayBpZiB0aGUgdGVzdCB3YXMgYWxyZWFkeSBwZXJmb3JtZWQsIHRob3VnaC5cblx0XHRcdFx0Y29tcHV0ZVBpeGVsUG9zaXRpb25BbmRCb3hTaXppbmdSZWxpYWJsZSgpO1xuXHRcdFx0XHRyZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcblx0XHRcdH0sXG5cdFx0XHRib3hTaXppbmdSZWxpYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggYm94U2l6aW5nUmVsaWFibGVWYWwgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRjb21wdXRlUGl4ZWxQb3NpdGlvbkFuZEJveFNpemluZ1JlbGlhYmxlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGJveFNpemluZ1JlbGlhYmxlVmFsO1xuXHRcdFx0fSxcblx0XHRcdHJlbGlhYmxlTWFyZ2luUmlnaHQ6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG5cdFx0XHRcdC8vIENoZWNrIGlmIGRpdiB3aXRoIGV4cGxpY2l0IHdpZHRoIGFuZCBubyBtYXJnaW4tcmlnaHQgaW5jb3JyZWN0bHlcblx0XHRcdFx0Ly8gZ2V0cyBjb21wdXRlZCBtYXJnaW4tcmlnaHQgYmFzZWQgb24gd2lkdGggb2YgY29udGFpbmVyLiAoIzMzMzMpXG5cdFx0XHRcdC8vIFdlYktpdCBCdWcgMTMzNDMgLSBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgd3JvbmcgdmFsdWUgZm9yIG1hcmdpbi1yaWdodFxuXHRcdFx0XHQvLyBUaGlzIHN1cHBvcnQgZnVuY3Rpb24gaXMgb25seSBleGVjdXRlZCBvbmNlIHNvIG5vIG1lbW9pemluZyBpcyBuZWVkZWQuXG5cdFx0XHRcdHZhciByZXQsXG5cdFx0XHRcdFx0bWFyZ2luRGl2ID0gZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuXHRcdFx0XHQvLyBSZXNldCBDU1M6IGJveC1zaXppbmc7IGRpc3BsYXk7IG1hcmdpbjsgYm9yZGVyOyBwYWRkaW5nXG5cdFx0XHRcdG1hcmdpbkRpdi5zdHlsZS5jc3NUZXh0ID0gZGl2LnN0eWxlLmNzc1RleHQgPVxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjksIEFuZHJvaWQgMi4zXG5cdFx0XHRcdFx0Ly8gVmVuZG9yLXByZWZpeCBib3gtc2l6aW5nXG5cdFx0XHRcdFx0XCItd2Via2l0LWJveC1zaXppbmc6Y29udGVudC1ib3g7LW1vei1ib3gtc2l6aW5nOmNvbnRlbnQtYm94O1wiICtcblx0XHRcdFx0XHRcImJveC1zaXppbmc6Y29udGVudC1ib3g7ZGlzcGxheTpibG9jazttYXJnaW46MDtib3JkZXI6MDtwYWRkaW5nOjBcIjtcblx0XHRcdFx0bWFyZ2luRGl2LnN0eWxlLm1hcmdpblJpZ2h0ID0gbWFyZ2luRGl2LnN0eWxlLndpZHRoID0gXCIwXCI7XG5cdFx0XHRcdGRpdi5zdHlsZS53aWR0aCA9IFwiMXB4XCI7XG5cdFx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0XHRcdHJldCA9ICFwYXJzZUZsb2F0KCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggbWFyZ2luRGl2LCBudWxsICkubWFyZ2luUmlnaHQgKTtcblxuXHRcdFx0XHRkb2NFbGVtLnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblx0XHRcdFx0ZGl2LnJlbW92ZUNoaWxkKCBtYXJnaW5EaXYgKTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KSgpO1xuXG5cbi8vIEEgbWV0aG9kIGZvciBxdWlja2x5IHN3YXBwaW5nIGluL291dCBDU1MgcHJvcGVydGllcyB0byBnZXQgY29ycmVjdCBjYWxjdWxhdGlvbnMuXG5qUXVlcnkuc3dhcCA9IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBjYWxsYmFjaywgYXJncyApIHtcblx0dmFyIHJldCwgbmFtZSxcblx0XHRvbGQgPSB7fTtcblxuXHQvLyBSZW1lbWJlciB0aGUgb2xkIHZhbHVlcywgYW5kIGluc2VydCB0aGUgbmV3IG9uZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdG9sZFsgbmFtZSBdID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9wdGlvbnNbIG5hbWUgXTtcblx0fVxuXG5cdHJldCA9IGNhbGxiYWNrLmFwcGx5KCBlbGVtLCBhcmdzIHx8IFtdICk7XG5cblx0Ly8gUmV2ZXJ0IHRoZSBvbGQgdmFsdWVzXG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSBvbGRbIG5hbWUgXTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59O1xuXG5cbnZhclxuXHQvLyBTd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxuXHQvLyBTZWUgaGVyZSBmb3IgZGlzcGxheSB2YWx1ZXM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ1NTL2Rpc3BsYXlcblx0cmRpc3BsYXlzd2FwID0gL14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFxuXHRybnVtc3BsaXQgPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKC4qKSRcIiwgXCJpXCIgKSxcblx0cnJlbE51bSA9IG5ldyBSZWdFeHAoIFwiXihbKy1dKT0oXCIgKyBwbnVtICsgXCIpXCIsIFwiaVwiICksXG5cblx0Y3NzU2hvdyA9IHsgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiwgZGlzcGxheTogXCJibG9ja1wiIH0sXG5cdGNzc05vcm1hbFRyYW5zZm9ybSA9IHtcblx0XHRsZXR0ZXJTcGFjaW5nOiBcIjBcIixcblx0XHRmb250V2VpZ2h0OiBcIjQwMFwiXG5cdH0sXG5cblx0Y3NzUHJlZml4ZXMgPSBbIFwiV2Via2l0XCIsIFwiT1wiLCBcIk1velwiLCBcIm1zXCIgXTtcblxuLy8gUmV0dXJuIGEgY3NzIHByb3BlcnR5IG1hcHBlZCB0byBhIHBvdGVudGlhbGx5IHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIHN0eWxlLCBuYW1lICkge1xuXG5cdC8vIFNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXG5cdGlmICggbmFtZSBpbiBzdHlsZSApIHtcblx0XHRyZXR1cm4gbmFtZTtcblx0fVxuXG5cdC8vIENoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcblx0dmFyIGNhcE5hbWUgPSBuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpLFxuXHRcdG9yaWdOYW1lID0gbmFtZSxcblx0XHRpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdG5hbWUgPSBjc3NQcmVmaXhlc1sgaSBdICsgY2FwTmFtZTtcblx0XHRpZiAoIG5hbWUgaW4gc3R5bGUgKSB7XG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3JpZ05hbWU7XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKSB7XG5cdHZhciBtYXRjaGVzID0gcm51bXNwbGl0LmV4ZWMoIHZhbHVlICk7XG5cdHJldHVybiBtYXRjaGVzID9cblx0XHQvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuXHRcdE1hdGgubWF4KCAwLCBtYXRjaGVzWyAxIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAyIF0gfHwgXCJweFwiICkgOlxuXHRcdHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEsIGlzQm9yZGVyQm94LCBzdHlsZXMgKSB7XG5cdHZhciBpID0gZXh0cmEgPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSA/XG5cdFx0Ly8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXG5cdFx0NCA6XG5cdFx0Ly8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xuXHRcdG5hbWUgPT09IFwid2lkdGhcIiA/IDEgOiAwLFxuXG5cdFx0dmFsID0gMDtcblxuXHRmb3IgKCA7IGkgPCA0OyBpICs9IDIgKSB7XG5cdFx0Ly8gQm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuXHRcdGlmICggZXh0cmEgPT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgZXh0cmEgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBpc0JvcmRlckJveCApIHtcblx0XHRcdC8vIGJvcmRlci1ib3ggaW5jbHVkZXMgcGFkZGluZywgc28gcmVtb3ZlIGl0IGlmIHdlIHdhbnQgY29udGVudFxuXHRcdFx0aWYgKCBleHRyYSA9PT0gXCJjb250ZW50XCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcblx0XHRcdGlmICggZXh0cmEgIT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50LCBzbyBhZGQgcGFkZGluZ1xuXHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50IG5vciBwYWRkaW5nLCBzbyBhZGQgYm9yZGVyXG5cdFx0XHRpZiAoIGV4dHJhICE9PSBcInBhZGRpbmdcIiApIHtcblx0XHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKSB7XG5cblx0Ly8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcblx0dmFyIHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlLFxuXHRcdHZhbCA9IG5hbWUgPT09IFwid2lkdGhcIiA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodCxcblx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKSxcblx0XHRpc0JvcmRlckJveCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCI7XG5cblx0Ly8gU29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXG5cdC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxuXHQvLyBNYXRoTUwgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00OTE2Njhcblx0aWYgKCB2YWwgPD0gMCB8fCB2YWwgPT0gbnVsbCApIHtcblx0XHQvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3Nhcnlcblx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuXHRcdGlmICggdmFsIDwgMCB8fCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdHZhbCA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cblx0XHQvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxuXHRcdGlmICggcm51bW5vbnB4LnRlc3QodmFsKSApIHtcblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgZm9yIHN0eWxlIGluIGNhc2UgYSBicm93c2VyIHdoaWNoIHJldHVybnMgdW5yZWxpYWJsZSB2YWx1ZXNcblx0XHQvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXG5cdFx0dmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmXG5cdFx0XHQoIHN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUoKSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xuXG5cdFx0Ly8gTm9ybWFsaXplIFwiXCIsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuXHRcdHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XG5cdH1cblxuXHQvLyBVc2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xuXHRyZXR1cm4gKCB2YWwgK1xuXHRcdGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxuXHRcdFx0ZWxlbSxcblx0XHRcdG5hbWUsXG5cdFx0XHRleHRyYSB8fCAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICksXG5cdFx0XHR2YWx1ZUlzQm9yZGVyQm94LFxuXHRcdFx0c3R5bGVzXG5cdFx0KVxuXHQpICsgXCJweFwiO1xufVxuXG5mdW5jdGlvbiBzaG93SGlkZSggZWxlbWVudHMsIHNob3cgKSB7XG5cdHZhciBkaXNwbGF5LCBlbGVtLCBoaWRkZW4sXG5cdFx0dmFsdWVzID0gW10sXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcblx0XHRpZiAoICFlbGVtLnN0eWxlICkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFsdWVzWyBpbmRleCBdID0gZGF0YV9wcml2LmdldCggZWxlbSwgXCJvbGRkaXNwbGF5XCIgKTtcblx0XHRkaXNwbGF5ID0gZWxlbS5zdHlsZS5kaXNwbGF5O1xuXHRcdGlmICggc2hvdyApIHtcblx0XHRcdC8vIFJlc2V0IHRoZSBpbmxpbmUgZGlzcGxheSBvZiB0aGlzIGVsZW1lbnQgdG8gbGVhcm4gaWYgaXQgaXNcblx0XHRcdC8vIGJlaW5nIGhpZGRlbiBieSBjYXNjYWRlZCBydWxlcyBvciBub3Rcblx0XHRcdGlmICggIXZhbHVlc1sgaW5kZXggXSAmJiBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGVsZW1lbnRzIHdoaWNoIGhhdmUgYmVlbiBvdmVycmlkZGVuIHdpdGggZGlzcGxheTogbm9uZVxuXHRcdFx0Ly8gaW4gYSBzdHlsZXNoZWV0IHRvIHdoYXRldmVyIHRoZSBkZWZhdWx0IGJyb3dzZXIgc3R5bGUgaXNcblx0XHRcdC8vIGZvciBzdWNoIGFuIGVsZW1lbnRcblx0XHRcdGlmICggZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuKCBlbGVtICkgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IGRhdGFfcHJpdi5hY2Nlc3MoIGVsZW0sIFwib2xkZGlzcGxheVwiLCBkZWZhdWx0RGlzcGxheShlbGVtLm5vZGVOYW1lKSApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRoaWRkZW4gPSBpc0hpZGRlbiggZWxlbSApO1xuXG5cdFx0XHRpZiAoIGRpc3BsYXkgIT09IFwibm9uZVwiIHx8ICFoaWRkZW4gKSB7XG5cdFx0XHRcdGRhdGFfcHJpdi5zZXQoIGVsZW0sIFwib2xkZGlzcGxheVwiLCBoaWRkZW4gPyBkaXNwbGF5IDogalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFNldCB0aGUgZGlzcGxheSBvZiBtb3N0IG9mIHRoZSBlbGVtZW50cyBpbiBhIHNlY29uZCBsb29wXG5cdC8vIHRvIGF2b2lkIHRoZSBjb25zdGFudCByZWZsb3dcblx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRlbGVtID0gZWxlbWVudHNbIGluZGV4IF07XG5cdFx0aWYgKCAhZWxlbS5zdHlsZSApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRpZiAoICFzaG93IHx8IGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIgfHwgZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICkge1xuXHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gc2hvdyA/IHZhbHVlc1sgaW5kZXggXSB8fCBcIlwiIDogXCJub25lXCI7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufVxuXG5qUXVlcnkuZXh0ZW5kKHtcblxuXHQvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcblx0Ly8gYmVoYXZpb3Igb2YgZ2V0dGluZyBhbmQgc2V0dGluZyBhIHN0eWxlIHByb3BlcnR5XG5cdGNzc0hvb2tzOiB7XG5cdFx0b3BhY2l0eToge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuXHRcdFx0XHRcdHZhciByZXQgPSBjdXJDU1MoIGVsZW0sIFwib3BhY2l0eVwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIERvbid0IGF1dG9tYXRpY2FsbHkgYWRkIFwicHhcIiB0byB0aGVzZSBwb3NzaWJseS11bml0bGVzcyBwcm9wZXJ0aWVzXG5cdGNzc051bWJlcjoge1xuXHRcdFwiY29sdW1uQ291bnRcIjogdHJ1ZSxcblx0XHRcImZpbGxPcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJmbGV4R3Jvd1wiOiB0cnVlLFxuXHRcdFwiZmxleFNocmlua1wiOiB0cnVlLFxuXHRcdFwiZm9udFdlaWdodFwiOiB0cnVlLFxuXHRcdFwibGluZUhlaWdodFwiOiB0cnVlLFxuXHRcdFwib3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwib3JkZXJcIjogdHJ1ZSxcblx0XHRcIm9ycGhhbnNcIjogdHJ1ZSxcblx0XHRcIndpZG93c1wiOiB0cnVlLFxuXHRcdFwiekluZGV4XCI6IHRydWUsXG5cdFx0XCJ6b29tXCI6IHRydWVcblx0fSxcblxuXHQvLyBBZGQgaW4gcHJvcGVydGllcyB3aG9zZSBuYW1lcyB5b3Ugd2lzaCB0byBmaXggYmVmb3JlXG5cdC8vIHNldHRpbmcgb3IgZ2V0dGluZyB0aGUgdmFsdWVcblx0Y3NzUHJvcHM6IHtcblx0XHRcImZsb2F0XCI6IFwiY3NzRmxvYXRcIlxuXHR9LFxuXG5cdC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXG5cdHN0eWxlOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIGV4dHJhICkge1xuXG5cdFx0Ly8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCAhZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG5cdFx0dmFyIHJldCwgdHlwZSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcblx0XHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRcdG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHwgKCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggc3R5bGUsIG9yaWdOYW1lICkgKTtcblxuXHRcdC8vIEdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb24sIHRoZW4gdW5wcmVmaXhlZCB2ZXJzaW9uXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBDaGVjayBpZiB3ZSdyZSBzZXR0aW5nIGEgdmFsdWVcblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0XHQvLyBDb252ZXJ0IFwiKz1cIiBvciBcIi09XCIgdG8gcmVsYXRpdmUgbnVtYmVycyAoIzczNDUpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKHJldCA9IHJyZWxOdW0uZXhlYyggdmFsdWUgKSkgKSB7XG5cdFx0XHRcdHZhbHVlID0gKCByZXRbMV0gKyAxICkgKiByZXRbMl0gKyBwYXJzZUZsb2F0KCBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICkgKTtcblx0XHRcdFx0Ly8gRml4ZXMgYnVnICM5MjM3XG5cdFx0XHRcdHR5cGUgPSBcIm51bWJlclwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBudWxsIGFuZCBOYU4gdmFsdWVzIGFyZW4ndCBzZXQgKCM3MTE2KVxuXHRcdFx0aWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIG51bWJlciwgYWRkICdweCcgdG8gdGhlIChleGNlcHQgZm9yIGNlcnRhaW4gQ1NTIHByb3BlcnRpZXMpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwibnVtYmVyXCIgJiYgIWpRdWVyeS5jc3NOdW1iZXJbIG9yaWdOYW1lIF0gKSB7XG5cdFx0XHRcdHZhbHVlICs9IFwicHhcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU5LTExK1xuXHRcdFx0Ly8gYmFja2dyb3VuZC0qIHByb3BzIGFmZmVjdCBvcmlnaW5hbCBjbG9uZSdzIHZhbHVlc1xuXHRcdFx0aWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKCBcImJhY2tncm91bmRcIiApID09PSAwICkge1xuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuXHRcdFx0aWYgKCAhaG9va3MgfHwgIShcInNldFwiIGluIGhvb2tzKSB8fCAodmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIG5vbi1jb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgZmFsc2UsIGV4dHJhICkpICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE90aGVyd2lzZSBqdXN0IGdldCB0aGUgdmFsdWUgZnJvbSB0aGUgc3R5bGUgb2JqZWN0XG5cdFx0XHRyZXR1cm4gc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cdH0sXG5cblx0Y3NzOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZXh0cmEsIHN0eWxlcyApIHtcblx0XHR2YXIgdmFsLCBudW0sIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcblx0XHRuYW1lID0galF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdIHx8ICggalF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIGVsZW0uc3R5bGUsIG9yaWdOYW1lICkgKTtcblxuXHRcdC8vIFRyeSBwcmVmaXhlZCBuYW1lIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIG5hbWVcblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICkge1xuXHRcdFx0dmFsID0gaG9va3MuZ2V0KCBlbGVtLCB0cnVlLCBleHRyYSApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSwgaWYgYSB3YXkgdG8gZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBleGlzdHMsIHVzZSB0aGF0XG5cdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBcIm5vcm1hbFwiIHRvIGNvbXB1dGVkIHZhbHVlXG5cdFx0aWYgKCB2YWwgPT09IFwibm9ybWFsXCIgJiYgbmFtZSBpbiBjc3NOb3JtYWxUcmFuc2Zvcm0gKSB7XG5cdFx0XHR2YWwgPSBjc3NOb3JtYWxUcmFuc2Zvcm1bIG5hbWUgXTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIG51bWVyaWMgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcblx0XHRpZiAoIGV4dHJhID09PSBcIlwiIHx8IGV4dHJhICkge1xuXHRcdFx0bnVtID0gcGFyc2VGbG9hdCggdmFsICk7XG5cdFx0XHRyZXR1cm4gZXh0cmEgPT09IHRydWUgfHwgalF1ZXJ5LmlzTnVtZXJpYyggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxufSk7XG5cbmpRdWVyeS5lYWNoKFsgXCJoZWlnaHRcIiwgXCJ3aWR0aFwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCwgZXh0cmEgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXG5cdFx0XHRcdC8vIENlcnRhaW4gZWxlbWVudHMgY2FuIGhhdmUgZGltZW5zaW9uIGluZm8gaWYgd2UgaW52aXNpYmx5IHNob3cgdGhlbVxuXHRcdFx0XHQvLyBidXQgaXQgbXVzdCBoYXZlIGEgY3VycmVudCBkaXNwbGF5IHN0eWxlIHRoYXQgd291bGQgYmVuZWZpdFxuXHRcdFx0XHRyZXR1cm4gcmRpc3BsYXlzd2FwLnRlc3QoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgKSAmJiBlbGVtLm9mZnNldFdpZHRoID09PSAwID9cblx0XHRcdFx0XHRqUXVlcnkuc3dhcCggZWxlbSwgY3NzU2hvdywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcblx0XHRcdFx0XHR9KSA6XG5cdFx0XHRcdFx0Z2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIGV4dHJhICkge1xuXHRcdFx0dmFyIHN0eWxlcyA9IGV4dHJhICYmIGdldFN0eWxlcyggZWxlbSApO1xuXHRcdFx0cmV0dXJuIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgZXh0cmEgP1xuXHRcdFx0XHRhdWdtZW50V2lkdGhPckhlaWdodChcblx0XHRcdFx0XHRlbGVtLFxuXHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0ZXh0cmEsXG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0XHRzdHlsZXNcblx0XHRcdFx0KSA6IDBcblx0XHRcdCk7XG5cdFx0fVxuXHR9O1xufSk7XG5cbi8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG5qUXVlcnkuY3NzSG9va3MubWFyZ2luUmlnaHQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5SaWdodCxcblx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnN3YXAoIGVsZW0sIHsgXCJkaXNwbGF5XCI6IFwiaW5saW5lLWJsb2NrXCIgfSxcblx0XHRcdFx0Y3VyQ1NTLCBbIGVsZW0sIFwibWFyZ2luUmlnaHRcIiBdICk7XG5cdFx0fVxuXHR9XG4pO1xuXG4vLyBUaGVzZSBob29rcyBhcmUgdXNlZCBieSBhbmltYXRlIHRvIGV4cGFuZCBwcm9wZXJ0aWVzXG5qUXVlcnkuZWFjaCh7XG5cdG1hcmdpbjogXCJcIixcblx0cGFkZGluZzogXCJcIixcblx0Ym9yZGVyOiBcIldpZHRoXCJcbn0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcblx0XHRleHBhbmQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBpID0gMCxcblx0XHRcdFx0ZXhwYW5kZWQgPSB7fSxcblxuXHRcdFx0XHQvLyBBc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcblx0XHRcdFx0cGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdChcIiBcIikgOiBbIHZhbHVlIF07XG5cblx0XHRcdGZvciAoIDsgaSA8IDQ7IGkrKyApIHtcblx0XHRcdFx0ZXhwYW5kZWRbIHByZWZpeCArIGNzc0V4cGFuZFsgaSBdICsgc3VmZml4IF0gPVxuXHRcdFx0XHRcdHBhcnRzWyBpIF0gfHwgcGFydHNbIGkgLSAyIF0gfHwgcGFydHNbIDAgXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGV4cGFuZGVkO1xuXHRcdH1cblx0fTtcblxuXHRpZiAoICFybWFyZ2luLnRlc3QoIHByZWZpeCApICkge1xuXHRcdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0Y3NzOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdFx0dmFyIHN0eWxlcywgbGVuLFxuXHRcdFx0XHRtYXAgPSB7fSxcblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIG5hbWUgKSApIHtcblx0XHRcdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICk7XG5cdFx0XHRcdGxlbiA9IG5hbWUubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdG1hcFsgbmFtZVsgaSBdIF0gPSBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lWyBpIF0sIGZhbHNlLCBzdHlsZXMgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBtYXA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lLCB2YWx1ZSApIDpcblx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgbmFtZSApO1xuXHRcdH0sIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXHRzaG93OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2hvd0hpZGUoIHRoaXMsIHRydWUgKTtcblx0fSxcblx0aGlkZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNob3dIaWRlKCB0aGlzICk7XG5cdH0sXG5cdHRvZ2dsZTogZnVuY3Rpb24oIHN0YXRlICkge1xuXHRcdGlmICggdHlwZW9mIHN0YXRlID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRcdHJldHVybiBzdGF0ZSA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGlmICggaXNIaWRkZW4oIHRoaXMgKSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuc2hvdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxuXG5mdW5jdGlvbiBUd2VlbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcgKSB7XG5cdHJldHVybiBuZXcgVHdlZW4ucHJvdG90eXBlLmluaXQoIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nICk7XG59XG5qUXVlcnkuVHdlZW4gPSBUd2VlbjtcblxuVHdlZW4ucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogVHdlZW4sXG5cdGluaXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZywgdW5pdCApIHtcblx0XHR0aGlzLmVsZW0gPSBlbGVtO1xuXHRcdHRoaXMucHJvcCA9IHByb3A7XG5cdFx0dGhpcy5lYXNpbmcgPSBlYXNpbmcgfHwgXCJzd2luZ1wiO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5zdGFydCA9IHRoaXMubm93ID0gdGhpcy5jdXIoKTtcblx0XHR0aGlzLmVuZCA9IGVuZDtcblx0XHR0aGlzLnVuaXQgPSB1bml0IHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApO1xuXHR9LFxuXHRjdXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBob29rcyA9IFR3ZWVuLnByb3BIb29rc1sgdGhpcy5wcm9wIF07XG5cblx0XHRyZXR1cm4gaG9va3MgJiYgaG9va3MuZ2V0ID9cblx0XHRcdGhvb2tzLmdldCggdGhpcyApIDpcblx0XHRcdFR3ZWVuLnByb3BIb29rcy5fZGVmYXVsdC5nZXQoIHRoaXMgKTtcblx0fSxcblx0cnVuOiBmdW5jdGlvbiggcGVyY2VudCApIHtcblx0XHR2YXIgZWFzZWQsXG5cdFx0XHRob29rcyA9IFR3ZWVuLnByb3BIb29rc1sgdGhpcy5wcm9wIF07XG5cblx0XHRpZiAoIHRoaXMub3B0aW9ucy5kdXJhdGlvbiApIHtcblx0XHRcdHRoaXMucG9zID0gZWFzZWQgPSBqUXVlcnkuZWFzaW5nWyB0aGlzLmVhc2luZyBdKFxuXHRcdFx0XHRwZXJjZW50LCB0aGlzLm9wdGlvbnMuZHVyYXRpb24gKiBwZXJjZW50LCAwLCAxLCB0aGlzLm9wdGlvbnMuZHVyYXRpb25cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucG9zID0gZWFzZWQgPSBwZXJjZW50O1xuXHRcdH1cblx0XHR0aGlzLm5vdyA9ICggdGhpcy5lbmQgLSB0aGlzLnN0YXJ0ICkgKiBlYXNlZCArIHRoaXMuc3RhcnQ7XG5cblx0XHRpZiAoIHRoaXMub3B0aW9ucy5zdGVwICkge1xuXHRcdFx0dGhpcy5vcHRpb25zLnN0ZXAuY2FsbCggdGhpcy5lbGVtLCB0aGlzLm5vdywgdGhpcyApO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgaG9va3Muc2V0ICkge1xuXHRcdFx0aG9va3Muc2V0KCB0aGlzICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdFR3ZWVuLnByb3BIb29rcy5fZGVmYXVsdC5zZXQoIHRoaXMgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG5cblR3ZWVuLnByb3RvdHlwZS5pbml0LnByb3RvdHlwZSA9IFR3ZWVuLnByb3RvdHlwZTtcblxuVHdlZW4ucHJvcEhvb2tzID0ge1xuXHRfZGVmYXVsdDoge1xuXHRcdGdldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuXHRcdFx0dmFyIHJlc3VsdDtcblxuXHRcdFx0aWYgKCB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gIT0gbnVsbCAmJlxuXHRcdFx0XHQoIXR3ZWVuLmVsZW0uc3R5bGUgfHwgdHdlZW4uZWxlbS5zdHlsZVsgdHdlZW4ucHJvcCBdID09IG51bGwpICkge1xuXHRcdFx0XHRyZXR1cm4gdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQYXNzaW5nIGFuIGVtcHR5IHN0cmluZyBhcyBhIDNyZCBwYXJhbWV0ZXIgdG8gLmNzcyB3aWxsIGF1dG9tYXRpY2FsbHlcblx0XHRcdC8vIGF0dGVtcHQgYSBwYXJzZUZsb2F0IGFuZCBmYWxsYmFjayB0byBhIHN0cmluZyBpZiB0aGUgcGFyc2UgZmFpbHMuXG5cdFx0XHQvLyBTaW1wbGUgdmFsdWVzIHN1Y2ggYXMgXCIxMHB4XCIgYXJlIHBhcnNlZCB0byBGbG9hdDtcblx0XHRcdC8vIGNvbXBsZXggdmFsdWVzIHN1Y2ggYXMgXCJyb3RhdGUoMXJhZClcIiBhcmUgcmV0dXJuZWQgYXMtaXMuXG5cdFx0XHRyZXN1bHQgPSBqUXVlcnkuY3NzKCB0d2Vlbi5lbGVtLCB0d2Vlbi5wcm9wLCBcIlwiICk7XG5cdFx0XHQvLyBFbXB0eSBzdHJpbmdzLCBudWxsLCB1bmRlZmluZWQgYW5kIFwiYXV0b1wiIGFyZSBjb252ZXJ0ZWQgdG8gMC5cblx0XHRcdHJldHVybiAhcmVzdWx0IHx8IHJlc3VsdCA9PT0gXCJhdXRvXCIgPyAwIDogcmVzdWx0O1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0XHQvLyBVc2Ugc3RlcCBob29rIGZvciBiYWNrIGNvbXBhdC5cblx0XHRcdC8vIFVzZSBjc3NIb29rIGlmIGl0cyB0aGVyZS5cblx0XHRcdC8vIFVzZSAuc3R5bGUgaWYgYXZhaWxhYmxlIGFuZCB1c2UgcGxhaW4gcHJvcGVydGllcyB3aGVyZSBhdmFpbGFibGUuXG5cdFx0XHRpZiAoIGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0gKSB7XG5cdFx0XHRcdGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0oIHR3ZWVuICk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0d2Vlbi5lbGVtLnN0eWxlICYmICggdHdlZW4uZWxlbS5zdHlsZVsgalF1ZXJ5LmNzc1Byb3BzWyB0d2Vlbi5wcm9wIF0gXSAhPSBudWxsIHx8IGpRdWVyeS5jc3NIb29rc1sgdHdlZW4ucHJvcCBdICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgdHdlZW4ubm93ICsgdHdlZW4udW5pdCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxuLy8gU3VwcG9ydDogSUU5XG4vLyBQYW5pYyBiYXNlZCBhcHByb2FjaCB0byBzZXR0aW5nIHRoaW5ncyBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblR3ZWVuLnByb3BIb29rcy5zY3JvbGxUb3AgPSBUd2Vlbi5wcm9wSG9va3Muc2Nyb2xsTGVmdCA9IHtcblx0c2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0aWYgKCB0d2Vlbi5lbGVtLm5vZGVUeXBlICYmIHR3ZWVuLmVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5lYXNpbmcgPSB7XG5cdGxpbmVhcjogZnVuY3Rpb24oIHAgKSB7XG5cdFx0cmV0dXJuIHA7XG5cdH0sXG5cdHN3aW5nOiBmdW5jdGlvbiggcCApIHtcblx0XHRyZXR1cm4gMC41IC0gTWF0aC5jb3MoIHAgKiBNYXRoLlBJICkgLyAyO1xuXHR9XG59O1xuXG5qUXVlcnkuZnggPSBUd2Vlbi5wcm90b3R5cGUuaW5pdDtcblxuLy8gQmFjayBDb21wYXQgPDEuOCBleHRlbnNpb24gcG9pbnRcbmpRdWVyeS5meC5zdGVwID0ge307XG5cblxuXG5cbnZhclxuXHRmeE5vdywgdGltZXJJZCxcblx0cmZ4dHlwZXMgPSAvXig/OnRvZ2dsZXxzaG93fGhpZGUpJC8sXG5cdHJmeG51bSA9IG5ldyBSZWdFeHAoIFwiXig/OihbKy1dKT18KShcIiArIHBudW0gKyBcIikoW2EteiVdKikkXCIsIFwiaVwiICksXG5cdHJydW4gPSAvcXVldWVIb29rcyQvLFxuXHRhbmltYXRpb25QcmVmaWx0ZXJzID0gWyBkZWZhdWx0UHJlZmlsdGVyIF0sXG5cdHR3ZWVuZXJzID0ge1xuXHRcdFwiKlwiOiBbIGZ1bmN0aW9uKCBwcm9wLCB2YWx1ZSApIHtcblx0XHRcdHZhciB0d2VlbiA9IHRoaXMuY3JlYXRlVHdlZW4oIHByb3AsIHZhbHVlICksXG5cdFx0XHRcdHRhcmdldCA9IHR3ZWVuLmN1cigpLFxuXHRcdFx0XHRwYXJ0cyA9IHJmeG51bS5leGVjKCB2YWx1ZSApLFxuXHRcdFx0XHR1bml0ID0gcGFydHMgJiYgcGFydHNbIDMgXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKSxcblxuXHRcdFx0XHQvLyBTdGFydGluZyB2YWx1ZSBjb21wdXRhdGlvbiBpcyByZXF1aXJlZCBmb3IgcG90ZW50aWFsIHVuaXQgbWlzbWF0Y2hlc1xuXHRcdFx0XHRzdGFydCA9ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdIHx8IHVuaXQgIT09IFwicHhcIiAmJiArdGFyZ2V0ICkgJiZcblx0XHRcdFx0XHRyZnhudW0uZXhlYyggalF1ZXJ5LmNzcyggdHdlZW4uZWxlbSwgcHJvcCApICksXG5cdFx0XHRcdHNjYWxlID0gMSxcblx0XHRcdFx0bWF4SXRlcmF0aW9ucyA9IDIwO1xuXG5cdFx0XHRpZiAoIHN0YXJ0ICYmIHN0YXJ0WyAzIF0gIT09IHVuaXQgKSB7XG5cdFx0XHRcdC8vIFRydXN0IHVuaXRzIHJlcG9ydGVkIGJ5IGpRdWVyeS5jc3Ncblx0XHRcdFx0dW5pdCA9IHVuaXQgfHwgc3RhcnRbIDMgXTtcblxuXHRcdFx0XHQvLyBNYWtlIHN1cmUgd2UgdXBkYXRlIHRoZSB0d2VlbiBwcm9wZXJ0aWVzIGxhdGVyIG9uXG5cdFx0XHRcdHBhcnRzID0gcGFydHMgfHwgW107XG5cblx0XHRcdFx0Ly8gSXRlcmF0aXZlbHkgYXBwcm94aW1hdGUgZnJvbSBhIG5vbnplcm8gc3RhcnRpbmcgcG9pbnRcblx0XHRcdFx0c3RhcnQgPSArdGFyZ2V0IHx8IDE7XG5cblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdC8vIElmIHByZXZpb3VzIGl0ZXJhdGlvbiB6ZXJvZWQgb3V0LCBkb3VibGUgdW50aWwgd2UgZ2V0ICpzb21ldGhpbmcqLlxuXHRcdFx0XHRcdC8vIFVzZSBzdHJpbmcgZm9yIGRvdWJsaW5nIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBzZWUgc2NhbGUgYXMgdW5jaGFuZ2VkIGJlbG93XG5cdFx0XHRcdFx0c2NhbGUgPSBzY2FsZSB8fCBcIi41XCI7XG5cblx0XHRcdFx0XHQvLyBBZGp1c3QgYW5kIGFwcGx5XG5cdFx0XHRcdFx0c3RhcnQgPSBzdGFydCAvIHNjYWxlO1xuXHRcdFx0XHRcdGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgcHJvcCwgc3RhcnQgKyB1bml0ICk7XG5cblx0XHRcdFx0Ly8gVXBkYXRlIHNjYWxlLCB0b2xlcmF0aW5nIHplcm8gb3IgTmFOIGZyb20gdHdlZW4uY3VyKCksXG5cdFx0XHRcdC8vIGJyZWFrIHRoZSBsb29wIGlmIHNjYWxlIGlzIHVuY2hhbmdlZCBvciBwZXJmZWN0LCBvciBpZiB3ZSd2ZSBqdXN0IGhhZCBlbm91Z2hcblx0XHRcdFx0fSB3aGlsZSAoIHNjYWxlICE9PSAoc2NhbGUgPSB0d2Vlbi5jdXIoKSAvIHRhcmdldCkgJiYgc2NhbGUgIT09IDEgJiYgLS1tYXhJdGVyYXRpb25zICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVwZGF0ZSB0d2VlbiBwcm9wZXJ0aWVzXG5cdFx0XHRpZiAoIHBhcnRzICkge1xuXHRcdFx0XHRzdGFydCA9IHR3ZWVuLnN0YXJ0ID0gK3N0YXJ0IHx8ICt0YXJnZXQgfHwgMDtcblx0XHRcdFx0dHdlZW4udW5pdCA9IHVuaXQ7XG5cdFx0XHRcdC8vIElmIGEgKz0vLT0gdG9rZW4gd2FzIHByb3ZpZGVkLCB3ZSdyZSBkb2luZyBhIHJlbGF0aXZlIGFuaW1hdGlvblxuXHRcdFx0XHR0d2Vlbi5lbmQgPSBwYXJ0c1sgMSBdID9cblx0XHRcdFx0XHRzdGFydCArICggcGFydHNbIDEgXSArIDEgKSAqIHBhcnRzWyAyIF0gOlxuXHRcdFx0XHRcdCtwYXJ0c1sgMiBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHdlZW47XG5cdFx0fSBdXG5cdH07XG5cbi8vIEFuaW1hdGlvbnMgY3JlYXRlZCBzeW5jaHJvbm91c2x5IHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcbmZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdGZ4Tm93ID0gdW5kZWZpbmVkO1xuXHR9KTtcblx0cmV0dXJuICggZnhOb3cgPSBqUXVlcnkubm93KCkgKTtcbn1cblxuLy8gR2VuZXJhdGUgcGFyYW1ldGVycyB0byBjcmVhdGUgYSBzdGFuZGFyZCBhbmltYXRpb25cbmZ1bmN0aW9uIGdlbkZ4KCB0eXBlLCBpbmNsdWRlV2lkdGggKSB7XG5cdHZhciB3aGljaCxcblx0XHRpID0gMCxcblx0XHRhdHRycyA9IHsgaGVpZ2h0OiB0eXBlIH07XG5cblx0Ly8gSWYgd2UgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAxIHRvIGRvIGFsbCBjc3NFeHBhbmQgdmFsdWVzLFxuXHQvLyBvdGhlcndpc2Ugc3RlcCB2YWx1ZSBpcyAyIHRvIHNraXAgb3ZlciBMZWZ0IGFuZCBSaWdodFxuXHRpbmNsdWRlV2lkdGggPSBpbmNsdWRlV2lkdGggPyAxIDogMDtcblx0Zm9yICggOyBpIDwgNCA7IGkgKz0gMiAtIGluY2x1ZGVXaWR0aCApIHtcblx0XHR3aGljaCA9IGNzc0V4cGFuZFsgaSBdO1xuXHRcdGF0dHJzWyBcIm1hcmdpblwiICsgd2hpY2ggXSA9IGF0dHJzWyBcInBhZGRpbmdcIiArIHdoaWNoIF0gPSB0eXBlO1xuXHR9XG5cblx0aWYgKCBpbmNsdWRlV2lkdGggKSB7XG5cdFx0YXR0cnMub3BhY2l0eSA9IGF0dHJzLndpZHRoID0gdHlwZTtcblx0fVxuXG5cdHJldHVybiBhdHRycztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHdlZW4oIHZhbHVlLCBwcm9wLCBhbmltYXRpb24gKSB7XG5cdHZhciB0d2Vlbixcblx0XHRjb2xsZWN0aW9uID0gKCB0d2VlbmVyc1sgcHJvcCBdIHx8IFtdICkuY29uY2F0KCB0d2VlbmVyc1sgXCIqXCIgXSApLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRpZiAoICh0d2VlbiA9IGNvbGxlY3Rpb25bIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBwcm9wLCB2YWx1ZSApKSApIHtcblxuXHRcdFx0Ly8gV2UncmUgZG9uZSB3aXRoIHRoaXMgcHJvcGVydHlcblx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFByZWZpbHRlciggZWxlbSwgcHJvcHMsIG9wdHMgKSB7XG5cdC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cblx0dmFyIHByb3AsIHZhbHVlLCB0b2dnbGUsIHR3ZWVuLCBob29rcywgb2xkZmlyZSwgZGlzcGxheSwgY2hlY2tEaXNwbGF5LFxuXHRcdGFuaW0gPSB0aGlzLFxuXHRcdG9yaWcgPSB7fSxcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGUsXG5cdFx0aGlkZGVuID0gZWxlbS5ub2RlVHlwZSAmJiBpc0hpZGRlbiggZWxlbSApLFxuXHRcdGRhdGFTaG93ID0gZGF0YV9wcml2LmdldCggZWxlbSwgXCJmeHNob3dcIiApO1xuXG5cdC8vIEhhbmRsZSBxdWV1ZTogZmFsc2UgcHJvbWlzZXNcblx0aWYgKCAhb3B0cy5xdWV1ZSApIHtcblx0XHRob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgXCJmeFwiICk7XG5cdFx0aWYgKCBob29rcy51bnF1ZXVlZCA9PSBudWxsICkge1xuXHRcdFx0aG9va3MudW5xdWV1ZWQgPSAwO1xuXHRcdFx0b2xkZmlyZSA9IGhvb2tzLmVtcHR5LmZpcmU7XG5cdFx0XHRob29rcy5lbXB0eS5maXJlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggIWhvb2tzLnVucXVldWVkICkge1xuXHRcdFx0XHRcdG9sZGZpcmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0aG9va3MudW5xdWV1ZWQrKztcblxuXHRcdGFuaW0uYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gRW5zdXJlIHRoZSBjb21wbGV0ZSBoYW5kbGVyIGlzIGNhbGxlZCBiZWZvcmUgdGhpcyBjb21wbGV0ZXNcblx0XHRcdGFuaW0uYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRob29rcy51bnF1ZXVlZC0tO1xuXHRcdFx0XHRpZiAoICFqUXVlcnkucXVldWUoIGVsZW0sIFwiZnhcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0XHRob29rcy5lbXB0eS5maXJlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gSGVpZ2h0L3dpZHRoIG92ZXJmbG93IHBhc3Ncblx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCJoZWlnaHRcIiBpbiBwcm9wcyB8fCBcIndpZHRoXCIgaW4gcHJvcHMgKSApIHtcblx0XHQvLyBNYWtlIHN1cmUgdGhhdCBub3RoaW5nIHNuZWFrcyBvdXRcblx0XHQvLyBSZWNvcmQgYWxsIDMgb3ZlcmZsb3cgYXR0cmlidXRlcyBiZWNhdXNlIElFOS0xMCBkbyBub3Rcblx0XHQvLyBjaGFuZ2UgdGhlIG92ZXJmbG93IGF0dHJpYnV0ZSB3aGVuIG92ZXJmbG93WCBhbmRcblx0XHQvLyBvdmVyZmxvd1kgYXJlIHNldCB0byB0aGUgc2FtZSB2YWx1ZVxuXHRcdG9wdHMub3ZlcmZsb3cgPSBbIHN0eWxlLm92ZXJmbG93LCBzdHlsZS5vdmVyZmxvd1gsIHN0eWxlLm92ZXJmbG93WSBdO1xuXG5cdFx0Ly8gU2V0IGRpc3BsYXkgcHJvcGVydHkgdG8gaW5saW5lLWJsb2NrIGZvciBoZWlnaHQvd2lkdGhcblx0XHQvLyBhbmltYXRpb25zIG9uIGlubGluZSBlbGVtZW50cyB0aGF0IGFyZSBoYXZpbmcgd2lkdGgvaGVpZ2h0IGFuaW1hdGVkXG5cdFx0ZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICk7XG5cblx0XHQvLyBUZXN0IGRlZmF1bHQgZGlzcGxheSBpZiBkaXNwbGF5IGlzIGN1cnJlbnRseSBcIm5vbmVcIlxuXHRcdGNoZWNrRGlzcGxheSA9IGRpc3BsYXkgPT09IFwibm9uZVwiID9cblx0XHRcdGRhdGFfcHJpdi5nZXQoIGVsZW0sIFwib2xkZGlzcGxheVwiICkgfHwgZGVmYXVsdERpc3BsYXkoIGVsZW0ubm9kZU5hbWUgKSA6IGRpc3BsYXk7XG5cblx0XHRpZiAoIGNoZWNrRGlzcGxheSA9PT0gXCJpbmxpbmVcIiAmJiBqUXVlcnkuY3NzKCBlbGVtLCBcImZsb2F0XCIgKSA9PT0gXCJub25lXCIgKSB7XG5cdFx0XHRzdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcblx0XHR9XG5cdH1cblxuXHRpZiAoIG9wdHMub3ZlcmZsb3cgKSB7XG5cdFx0c3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdGFuaW0uYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0c3R5bGUub3ZlcmZsb3cgPSBvcHRzLm92ZXJmbG93WyAwIF07XG5cdFx0XHRzdHlsZS5vdmVyZmxvd1ggPSBvcHRzLm92ZXJmbG93WyAxIF07XG5cdFx0XHRzdHlsZS5vdmVyZmxvd1kgPSBvcHRzLm92ZXJmbG93WyAyIF07XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBzaG93L2hpZGUgcGFzc1xuXHRmb3IgKCBwcm9wIGluIHByb3BzICkge1xuXHRcdHZhbHVlID0gcHJvcHNbIHByb3AgXTtcblx0XHRpZiAoIHJmeHR5cGVzLmV4ZWMoIHZhbHVlICkgKSB7XG5cdFx0XHRkZWxldGUgcHJvcHNbIHByb3AgXTtcblx0XHRcdHRvZ2dsZSA9IHRvZ2dsZSB8fCB2YWx1ZSA9PT0gXCJ0b2dnbGVcIjtcblx0XHRcdGlmICggdmFsdWUgPT09ICggaGlkZGVuID8gXCJoaWRlXCIgOiBcInNob3dcIiApICkge1xuXG5cdFx0XHRcdC8vIElmIHRoZXJlIGlzIGRhdGFTaG93IGxlZnQgb3ZlciBmcm9tIGEgc3RvcHBlZCBoaWRlIG9yIHNob3cgYW5kIHdlIGFyZSBnb2luZyB0byBwcm9jZWVkIHdpdGggc2hvdywgd2Ugc2hvdWxkIHByZXRlbmQgdG8gYmUgaGlkZGVuXG5cdFx0XHRcdGlmICggdmFsdWUgPT09IFwic2hvd1wiICYmIGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRoaWRkZW4gPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvcmlnWyBwcm9wIF0gPSBkYXRhU2hvdyAmJiBkYXRhU2hvd1sgcHJvcCBdIHx8IGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCApO1xuXG5cdFx0Ly8gQW55IG5vbi1meCB2YWx1ZSBzdG9wcyB1cyBmcm9tIHJlc3RvcmluZyB0aGUgb3JpZ2luYWwgZGlzcGxheSB2YWx1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkaXNwbGF5ID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdGlmICggIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBvcmlnICkgKSB7XG5cdFx0aWYgKCBkYXRhU2hvdyApIHtcblx0XHRcdGlmICggXCJoaWRkZW5cIiBpbiBkYXRhU2hvdyApIHtcblx0XHRcdFx0aGlkZGVuID0gZGF0YVNob3cuaGlkZGVuO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhU2hvdyA9IGRhdGFfcHJpdi5hY2Nlc3MoIGVsZW0sIFwiZnhzaG93XCIsIHt9ICk7XG5cdFx0fVxuXG5cdFx0Ly8gU3RvcmUgc3RhdGUgaWYgaXRzIHRvZ2dsZSAtIGVuYWJsZXMgLnN0b3AoKS50b2dnbGUoKSB0byBcInJldmVyc2VcIlxuXHRcdGlmICggdG9nZ2xlICkge1xuXHRcdFx0ZGF0YVNob3cuaGlkZGVuID0gIWhpZGRlbjtcblx0XHR9XG5cdFx0aWYgKCBoaWRkZW4gKSB7XG5cdFx0XHRqUXVlcnkoIGVsZW0gKS5zaG93KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFuaW0uZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5KCBlbGVtICkuaGlkZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGFuaW0uZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdHZhciBwcm9wO1xuXG5cdFx0XHRkYXRhX3ByaXYucmVtb3ZlKCBlbGVtLCBcImZ4c2hvd1wiICk7XG5cdFx0XHRmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgb3JpZ1sgcHJvcCBdICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Zm9yICggcHJvcCBpbiBvcmlnICkge1xuXHRcdFx0dHdlZW4gPSBjcmVhdGVUd2VlbiggaGlkZGVuID8gZGF0YVNob3dbIHByb3AgXSA6IDAsIHByb3AsIGFuaW0gKTtcblxuXHRcdFx0aWYgKCAhKCBwcm9wIGluIGRhdGFTaG93ICkgKSB7XG5cdFx0XHRcdGRhdGFTaG93WyBwcm9wIF0gPSB0d2Vlbi5zdGFydDtcblx0XHRcdFx0aWYgKCBoaWRkZW4gKSB7XG5cdFx0XHRcdFx0dHdlZW4uZW5kID0gdHdlZW4uc3RhcnQ7XG5cdFx0XHRcdFx0dHdlZW4uc3RhcnQgPSBwcm9wID09PSBcIndpZHRoXCIgfHwgcHJvcCA9PT0gXCJoZWlnaHRcIiA/IDEgOiAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdC8vIElmIHRoaXMgaXMgYSBub29wIGxpa2UgLmhpZGUoKS5oaWRlKCksIHJlc3RvcmUgYW4gb3ZlcndyaXR0ZW4gZGlzcGxheSB2YWx1ZVxuXHR9IGVsc2UgaWYgKCAoZGlzcGxheSA9PT0gXCJub25lXCIgPyBkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApIDogZGlzcGxheSkgPT09IFwiaW5saW5lXCIgKSB7XG5cdFx0c3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJvcEZpbHRlciggcHJvcHMsIHNwZWNpYWxFYXNpbmcgKSB7XG5cdHZhciBpbmRleCwgbmFtZSwgZWFzaW5nLCB2YWx1ZSwgaG9va3M7XG5cblx0Ly8gY2FtZWxDYXNlLCBzcGVjaWFsRWFzaW5nIGFuZCBleHBhbmQgY3NzSG9vayBwYXNzXG5cdGZvciAoIGluZGV4IGluIHByb3BzICkge1xuXHRcdG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBpbmRleCApO1xuXHRcdGVhc2luZyA9IHNwZWNpYWxFYXNpbmdbIG5hbWUgXTtcblx0XHR2YWx1ZSA9IHByb3BzWyBpbmRleCBdO1xuXHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRlYXNpbmcgPSB2YWx1ZVsgMSBdO1xuXHRcdFx0dmFsdWUgPSBwcm9wc1sgaW5kZXggXSA9IHZhbHVlWyAwIF07XG5cdFx0fVxuXG5cdFx0aWYgKCBpbmRleCAhPT0gbmFtZSApIHtcblx0XHRcdHByb3BzWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgaW5kZXggXTtcblx0XHR9XG5cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdO1xuXHRcdGlmICggaG9va3MgJiYgXCJleHBhbmRcIiBpbiBob29rcyApIHtcblx0XHRcdHZhbHVlID0gaG9va3MuZXhwYW5kKCB2YWx1ZSApO1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBuYW1lIF07XG5cblx0XHRcdC8vIE5vdCBxdWl0ZSAkLmV4dGVuZCwgdGhpcyB3b24ndCBvdmVyd3JpdGUgZXhpc3Rpbmcga2V5cy5cblx0XHRcdC8vIFJldXNpbmcgJ2luZGV4JyBiZWNhdXNlIHdlIGhhdmUgdGhlIGNvcnJlY3QgXCJuYW1lXCJcblx0XHRcdGZvciAoIGluZGV4IGluIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICEoIGluZGV4IGluIHByb3BzICkgKSB7XG5cdFx0XHRcdFx0cHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgaW5kZXggXTtcblx0XHRcdFx0XHRzcGVjaWFsRWFzaW5nWyBpbmRleCBdID0gZWFzaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNwZWNpYWxFYXNpbmdbIG5hbWUgXSA9IGVhc2luZztcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gQW5pbWF0aW9uKCBlbGVtLCBwcm9wZXJ0aWVzLCBvcHRpb25zICkge1xuXHR2YXIgcmVzdWx0LFxuXHRcdHN0b3BwZWQsXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGFuaW1hdGlvblByZWZpbHRlcnMubGVuZ3RoLFxuXHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCkuYWx3YXlzKCBmdW5jdGlvbigpIHtcblx0XHRcdC8vIERvbid0IG1hdGNoIGVsZW0gaW4gdGhlIDphbmltYXRlZCBzZWxlY3RvclxuXHRcdFx0ZGVsZXRlIHRpY2suZWxlbTtcblx0XHR9KSxcblx0XHR0aWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHN0b3BwZWQgKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHZhciBjdXJyZW50VGltZSA9IGZ4Tm93IHx8IGNyZWF0ZUZ4Tm93KCksXG5cdFx0XHRcdHJlbWFpbmluZyA9IE1hdGgubWF4KCAwLCBhbmltYXRpb24uc3RhcnRUaW1lICsgYW5pbWF0aW9uLmR1cmF0aW9uIC0gY3VycmVudFRpbWUgKSxcblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCAyLjNcblx0XHRcdFx0Ly8gQXJjaGFpYyBjcmFzaCBidWcgd29uJ3QgYWxsb3cgdXMgdG8gdXNlIGAxIC0gKCAwLjUgfHwgMCApYCAoIzEyNDk3KVxuXHRcdFx0XHR0ZW1wID0gcmVtYWluaW5nIC8gYW5pbWF0aW9uLmR1cmF0aW9uIHx8IDAsXG5cdFx0XHRcdHBlcmNlbnQgPSAxIC0gdGVtcCxcblx0XHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0XHRsZW5ndGggPSBhbmltYXRpb24udHdlZW5zLmxlbmd0aDtcblxuXHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCBwZXJjZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBwZXJjZW50LCByZW1haW5pbmcgXSk7XG5cblx0XHRcdGlmICggcGVyY2VudCA8IDEgJiYgbGVuZ3RoICkge1xuXHRcdFx0XHRyZXR1cm4gcmVtYWluaW5nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uIF0gKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YW5pbWF0aW9uID0gZGVmZXJyZWQucHJvbWlzZSh7XG5cdFx0XHRlbGVtOiBlbGVtLFxuXHRcdFx0cHJvcHM6IGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wZXJ0aWVzICksXG5cdFx0XHRvcHRzOiBqUXVlcnkuZXh0ZW5kKCB0cnVlLCB7IHNwZWNpYWxFYXNpbmc6IHt9IH0sIG9wdGlvbnMgKSxcblx0XHRcdG9yaWdpbmFsUHJvcGVydGllczogcHJvcGVydGllcyxcblx0XHRcdG9yaWdpbmFsT3B0aW9uczogb3B0aW9ucyxcblx0XHRcdHN0YXJ0VGltZTogZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcblx0XHRcdGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuXHRcdFx0dHdlZW5zOiBbXSxcblx0XHRcdGNyZWF0ZVR3ZWVuOiBmdW5jdGlvbiggcHJvcCwgZW5kICkge1xuXHRcdFx0XHR2YXIgdHdlZW4gPSBqUXVlcnkuVHdlZW4oIGVsZW0sIGFuaW1hdGlvbi5vcHRzLCBwcm9wLCBlbmQsXG5cdFx0XHRcdFx0XHRhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nWyBwcm9wIF0gfHwgYW5pbWF0aW9uLm9wdHMuZWFzaW5nICk7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnMucHVzaCggdHdlZW4gKTtcblx0XHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdFx0fSxcblx0XHRcdHN0b3A6IGZ1bmN0aW9uKCBnb3RvRW5kICkge1xuXHRcdFx0XHR2YXIgaW5kZXggPSAwLFxuXHRcdFx0XHRcdC8vIElmIHdlIGFyZSBnb2luZyB0byB0aGUgZW5kLCB3ZSB3YW50IHRvIHJ1biBhbGwgdGhlIHR3ZWVuc1xuXHRcdFx0XHRcdC8vIG90aGVyd2lzZSB3ZSBza2lwIHRoaXMgcGFydFxuXHRcdFx0XHRcdGxlbmd0aCA9IGdvdG9FbmQgPyBhbmltYXRpb24udHdlZW5zLmxlbmd0aCA6IDA7XG5cdFx0XHRcdGlmICggc3RvcHBlZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0XHRzdG9wcGVkID0gdHJ1ZTtcblx0XHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG5cdFx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIDEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlc29sdmUgd2hlbiB3ZSBwbGF5ZWQgdGhlIGxhc3QgZnJhbWU7IG90aGVyd2lzZSwgcmVqZWN0XG5cdFx0XHRcdGlmICggZ290b0VuZCApIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9KSxcblx0XHRwcm9wcyA9IGFuaW1hdGlvbi5wcm9wcztcblxuXHRwcm9wRmlsdGVyKCBwcm9wcywgYW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZyApO1xuXG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuXHRcdHJlc3VsdCA9IGFuaW1hdGlvblByZWZpbHRlcnNbIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBlbGVtLCBwcm9wcywgYW5pbWF0aW9uLm9wdHMgKTtcblx0XHRpZiAoIHJlc3VsdCApIHtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHR9XG5cblx0alF1ZXJ5Lm1hcCggcHJvcHMsIGNyZWF0ZVR3ZWVuLCBhbmltYXRpb24gKTtcblxuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBhbmltYXRpb24ub3B0cy5zdGFydCApICkge1xuXHRcdGFuaW1hdGlvbi5vcHRzLnN0YXJ0LmNhbGwoIGVsZW0sIGFuaW1hdGlvbiApO1xuXHR9XG5cblx0alF1ZXJ5LmZ4LnRpbWVyKFxuXHRcdGpRdWVyeS5leHRlbmQoIHRpY2ssIHtcblx0XHRcdGVsZW06IGVsZW0sXG5cdFx0XHRhbmltOiBhbmltYXRpb24sXG5cdFx0XHRxdWV1ZTogYW5pbWF0aW9uLm9wdHMucXVldWVcblx0XHR9KVxuXHQpO1xuXG5cdC8vIGF0dGFjaCBjYWxsYmFja3MgZnJvbSBvcHRpb25zXG5cdHJldHVybiBhbmltYXRpb24ucHJvZ3Jlc3MoIGFuaW1hdGlvbi5vcHRzLnByb2dyZXNzIClcblx0XHQuZG9uZSggYW5pbWF0aW9uLm9wdHMuZG9uZSwgYW5pbWF0aW9uLm9wdHMuY29tcGxldGUgKVxuXHRcdC5mYWlsKCBhbmltYXRpb24ub3B0cy5mYWlsIClcblx0XHQuYWx3YXlzKCBhbmltYXRpb24ub3B0cy5hbHdheXMgKTtcbn1cblxualF1ZXJ5LkFuaW1hdGlvbiA9IGpRdWVyeS5leHRlbmQoIEFuaW1hdGlvbiwge1xuXG5cdHR3ZWVuZXI6IGZ1bmN0aW9uKCBwcm9wcywgY2FsbGJhY2sgKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcHJvcHMgKSApIHtcblx0XHRcdGNhbGxiYWNrID0gcHJvcHM7XG5cdFx0XHRwcm9wcyA9IFsgXCIqXCIgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJvcHMgPSBwcm9wcy5zcGxpdChcIiBcIik7XG5cdFx0fVxuXG5cdFx0dmFyIHByb3AsXG5cdFx0XHRpbmRleCA9IDAsXG5cdFx0XHRsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcblx0XHRcdHByb3AgPSBwcm9wc1sgaW5kZXggXTtcblx0XHRcdHR3ZWVuZXJzWyBwcm9wIF0gPSB0d2VlbmVyc1sgcHJvcCBdIHx8IFtdO1xuXHRcdFx0dHdlZW5lcnNbIHByb3AgXS51bnNoaWZ0KCBjYWxsYmFjayApO1xuXHRcdH1cblx0fSxcblxuXHRwcmVmaWx0ZXI6IGZ1bmN0aW9uKCBjYWxsYmFjaywgcHJlcGVuZCApIHtcblx0XHRpZiAoIHByZXBlbmQgKSB7XG5cdFx0XHRhbmltYXRpb25QcmVmaWx0ZXJzLnVuc2hpZnQoIGNhbGxiYWNrICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFuaW1hdGlvblByZWZpbHRlcnMucHVzaCggY2FsbGJhY2sgKTtcblx0XHR9XG5cdH1cbn0pO1xuXG5qUXVlcnkuc3BlZWQgPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgZm4gKSB7XG5cdHZhciBvcHQgPSBzcGVlZCAmJiB0eXBlb2Ygc3BlZWQgPT09IFwib2JqZWN0XCIgPyBqUXVlcnkuZXh0ZW5kKCB7fSwgc3BlZWQgKSA6IHtcblx0XHRjb21wbGV0ZTogZm4gfHwgIWZuICYmIGVhc2luZyB8fFxuXHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIHNwZWVkICkgJiYgc3BlZWQsXG5cdFx0ZHVyYXRpb246IHNwZWVkLFxuXHRcdGVhc2luZzogZm4gJiYgZWFzaW5nIHx8IGVhc2luZyAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24oIGVhc2luZyApICYmIGVhc2luZ1xuXHR9O1xuXG5cdG9wdC5kdXJhdGlvbiA9IGpRdWVyeS5meC5vZmYgPyAwIDogdHlwZW9mIG9wdC5kdXJhdGlvbiA9PT0gXCJudW1iZXJcIiA/IG9wdC5kdXJhdGlvbiA6XG5cdFx0b3B0LmR1cmF0aW9uIGluIGpRdWVyeS5meC5zcGVlZHMgPyBqUXVlcnkuZnguc3BlZWRzWyBvcHQuZHVyYXRpb24gXSA6IGpRdWVyeS5meC5zcGVlZHMuX2RlZmF1bHQ7XG5cblx0Ly8gTm9ybWFsaXplIG9wdC5xdWV1ZSAtIHRydWUvdW5kZWZpbmVkL251bGwgLT4gXCJmeFwiXG5cdGlmICggb3B0LnF1ZXVlID09IG51bGwgfHwgb3B0LnF1ZXVlID09PSB0cnVlICkge1xuXHRcdG9wdC5xdWV1ZSA9IFwiZnhcIjtcblx0fVxuXG5cdC8vIFF1ZXVlaW5nXG5cdG9wdC5vbGQgPSBvcHQuY29tcGxldGU7XG5cblx0b3B0LmNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0Lm9sZCApICkge1xuXHRcdFx0b3B0Lm9sZC5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHQucXVldWUgKSB7XG5cdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgb3B0LnF1ZXVlICk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBvcHQ7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0ZmFkZVRvOiBmdW5jdGlvbiggc3BlZWQsIHRvLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXG5cdFx0Ly8gU2hvdyBhbnkgaGlkZGVuIGVsZW1lbnRzIGFmdGVyIHNldHRpbmcgb3BhY2l0eSB0byAwXG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCBpc0hpZGRlbiApLmNzcyggXCJvcGFjaXR5XCIsIDAgKS5zaG93KClcblxuXHRcdFx0Ly8gQW5pbWF0ZSB0byB0aGUgdmFsdWUgc3BlY2lmaWVkXG5cdFx0XHQuZW5kKCkuYW5pbWF0ZSh7IG9wYWNpdHk6IHRvIH0sIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG5cdH0sXG5cdGFuaW1hdGU6IGZ1bmN0aW9uKCBwcm9wLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHR2YXIgZW1wdHkgPSBqUXVlcnkuaXNFbXB0eU9iamVjdCggcHJvcCApLFxuXHRcdFx0b3B0YWxsID0galF1ZXJ5LnNwZWVkKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApLFxuXHRcdFx0ZG9BbmltYXRpb24gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gT3BlcmF0ZSBvbiBhIGNvcHkgb2YgcHJvcCBzbyBwZXItcHJvcGVydHkgZWFzaW5nIHdvbid0IGJlIGxvc3Rcblx0XHRcdFx0dmFyIGFuaW0gPSBBbmltYXRpb24oIHRoaXMsIGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wICksIG9wdGFsbCApO1xuXG5cdFx0XHRcdC8vIEVtcHR5IGFuaW1hdGlvbnMsIG9yIGZpbmlzaGluZyByZXNvbHZlcyBpbW1lZGlhdGVseVxuXHRcdFx0XHRpZiAoIGVtcHR5IHx8IGRhdGFfcHJpdi5nZXQoIHRoaXMsIFwiZmluaXNoXCIgKSApIHtcblx0XHRcdFx0XHRhbmltLnN0b3AoIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGRvQW5pbWF0aW9uLmZpbmlzaCA9IGRvQW5pbWF0aW9uO1xuXG5cdFx0cmV0dXJuIGVtcHR5IHx8IG9wdGFsbC5xdWV1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0dGhpcy5lYWNoKCBkb0FuaW1hdGlvbiApIDpcblx0XHRcdHRoaXMucXVldWUoIG9wdGFsbC5xdWV1ZSwgZG9BbmltYXRpb24gKTtcblx0fSxcblx0c3RvcDogZnVuY3Rpb24oIHR5cGUsIGNsZWFyUXVldWUsIGdvdG9FbmQgKSB7XG5cdFx0dmFyIHN0b3BRdWV1ZSA9IGZ1bmN0aW9uKCBob29rcyApIHtcblx0XHRcdHZhciBzdG9wID0gaG9va3Muc3RvcDtcblx0XHRcdGRlbGV0ZSBob29rcy5zdG9wO1xuXHRcdFx0c3RvcCggZ290b0VuZCApO1xuXHRcdH07XG5cblx0XHRpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0Z290b0VuZCA9IGNsZWFyUXVldWU7XG5cdFx0XHRjbGVhclF1ZXVlID0gdHlwZTtcblx0XHRcdHR5cGUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggY2xlYXJRdWV1ZSAmJiB0eXBlICE9PSBmYWxzZSApIHtcblx0XHRcdHRoaXMucXVldWUoIHR5cGUgfHwgXCJmeFwiLCBbXSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGVxdWV1ZSA9IHRydWUsXG5cdFx0XHRcdGluZGV4ID0gdHlwZSAhPSBudWxsICYmIHR5cGUgKyBcInF1ZXVlSG9va3NcIixcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0ZGF0YSA9IGRhdGFfcHJpdi5nZXQoIHRoaXMgKTtcblxuXHRcdFx0aWYgKCBpbmRleCApIHtcblx0XHRcdFx0aWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCApIHtcblx0XHRcdFx0XHRzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICggaW5kZXggaW4gZGF0YSApIHtcblx0XHRcdFx0XHRpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICYmIHJydW4udGVzdCggaW5kZXggKSApIHtcblx0XHRcdFx0XHRcdHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRpZiAoIHRpbWVyc1sgaW5kZXggXS5lbGVtID09PSB0aGlzICYmICh0eXBlID09IG51bGwgfHwgdGltZXJzWyBpbmRleCBdLnF1ZXVlID09PSB0eXBlKSApIHtcblx0XHRcdFx0XHR0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCBnb3RvRW5kICk7XG5cdFx0XHRcdFx0ZGVxdWV1ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhcnQgdGhlIG5leHQgaW4gdGhlIHF1ZXVlIGlmIHRoZSBsYXN0IHN0ZXAgd2Fzbid0IGZvcmNlZC5cblx0XHRcdC8vIFRpbWVycyBjdXJyZW50bHkgd2lsbCBjYWxsIHRoZWlyIGNvbXBsZXRlIGNhbGxiYWNrcywgd2hpY2hcblx0XHRcdC8vIHdpbGwgZGVxdWV1ZSBidXQgb25seSBpZiB0aGV5IHdlcmUgZ290b0VuZC5cblx0XHRcdGlmICggZGVxdWV1ZSB8fCAhZ290b0VuZCApIHtcblx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0ZmluaXNoOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRpZiAoIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGluZGV4LFxuXHRcdFx0XHRkYXRhID0gZGF0YV9wcml2LmdldCggdGhpcyApLFxuXHRcdFx0XHRxdWV1ZSA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlXCIgXSxcblx0XHRcdFx0aG9va3MgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgXSxcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0bGVuZ3RoID0gcXVldWUgPyBxdWV1ZS5sZW5ndGggOiAwO1xuXG5cdFx0XHQvLyBFbmFibGUgZmluaXNoaW5nIGZsYWcgb24gcHJpdmF0ZSBkYXRhXG5cdFx0XHRkYXRhLmZpbmlzaCA9IHRydWU7XG5cblx0XHRcdC8vIEVtcHR5IHRoZSBxdWV1ZSBmaXJzdFxuXHRcdFx0alF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBbXSApO1xuXG5cdFx0XHRpZiAoIGhvb2tzICYmIGhvb2tzLnN0b3AgKSB7XG5cdFx0XHRcdGhvb2tzLnN0b3AuY2FsbCggdGhpcywgdHJ1ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb29rIGZvciBhbnkgYWN0aXZlIGFuaW1hdGlvbnMsIGFuZCBmaW5pc2ggdGhlbVxuXHRcdFx0Zm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0aWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSB7XG5cdFx0XHRcdFx0dGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHRcdHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9vayBmb3IgYW55IGFuaW1hdGlvbnMgaW4gdGhlIG9sZCBxdWV1ZSBhbmQgZmluaXNoIHRoZW1cblx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdGlmICggcXVldWVbIGluZGV4IF0gJiYgcXVldWVbIGluZGV4IF0uZmluaXNoICkge1xuXHRcdFx0XHRcdHF1ZXVlWyBpbmRleCBdLmZpbmlzaC5jYWxsKCB0aGlzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVHVybiBvZmYgZmluaXNoaW5nIGZsYWdcblx0XHRcdGRlbGV0ZSBkYXRhLmZpbmlzaDtcblx0XHR9KTtcblx0fVxufSk7XG5cbmpRdWVyeS5lYWNoKFsgXCJ0b2dnbGVcIiwgXCJzaG93XCIsIFwiaGlkZVwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgY3NzRm4gPSBqUXVlcnkuZm5bIG5hbWUgXTtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHNwZWVkID09IG51bGwgfHwgdHlwZW9mIHNwZWVkID09PSBcImJvb2xlYW5cIiA/XG5cdFx0XHRjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxuXHRcdFx0dGhpcy5hbmltYXRlKCBnZW5GeCggbmFtZSwgdHJ1ZSApLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSk7XG5cbi8vIEdlbmVyYXRlIHNob3J0Y3V0cyBmb3IgY3VzdG9tIGFuaW1hdGlvbnNcbmpRdWVyeS5lYWNoKHtcblx0c2xpZGVEb3duOiBnZW5GeChcInNob3dcIiksXG5cdHNsaWRlVXA6IGdlbkZ4KFwiaGlkZVwiKSxcblx0c2xpZGVUb2dnbGU6IGdlbkZ4KFwidG9nZ2xlXCIpLFxuXHRmYWRlSW46IHsgb3BhY2l0eTogXCJzaG93XCIgfSxcblx0ZmFkZU91dDogeyBvcGFjaXR5OiBcImhpZGVcIiB9LFxuXHRmYWRlVG9nZ2xlOiB7IG9wYWNpdHk6IFwidG9nZ2xlXCIgfVxufSwgZnVuY3Rpb24oIG5hbWUsIHByb3BzICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gdGhpcy5hbmltYXRlKCBwcm9wcywgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fTtcbn0pO1xuXG5qUXVlcnkudGltZXJzID0gW107XG5qUXVlcnkuZngudGljayA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGltZXIsXG5cdFx0aSA9IDAsXG5cdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycztcblxuXHRmeE5vdyA9IGpRdWVyeS5ub3coKTtcblxuXHRmb3IgKCA7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0dGltZXIgPSB0aW1lcnNbIGkgXTtcblx0XHQvLyBDaGVja3MgdGhlIHRpbWVyIGhhcyBub3QgYWxyZWFkeSBiZWVuIHJlbW92ZWRcblx0XHRpZiAoICF0aW1lcigpICYmIHRpbWVyc1sgaSBdID09PSB0aW1lciApIHtcblx0XHRcdHRpbWVycy5zcGxpY2UoIGktLSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdGlmICggIXRpbWVycy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0b3AoKTtcblx0fVxuXHRmeE5vdyA9IHVuZGVmaW5lZDtcbn07XG5cbmpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uKCB0aW1lciApIHtcblx0alF1ZXJ5LnRpbWVycy5wdXNoKCB0aW1lciApO1xuXHRpZiAoIHRpbWVyKCkgKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0YXJ0KCk7XG5cdH0gZWxzZSB7XG5cdFx0alF1ZXJ5LnRpbWVycy5wb3AoKTtcblx0fVxufTtcblxualF1ZXJ5LmZ4LmludGVydmFsID0gMTM7XG5cbmpRdWVyeS5meC5zdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoICF0aW1lcklkICkge1xuXHRcdHRpbWVySWQgPSBzZXRJbnRlcnZhbCggalF1ZXJ5LmZ4LnRpY2ssIGpRdWVyeS5meC5pbnRlcnZhbCApO1xuXHR9XG59O1xuXG5qUXVlcnkuZnguc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHRjbGVhckludGVydmFsKCB0aW1lcklkICk7XG5cdHRpbWVySWQgPSBudWxsO1xufTtcblxualF1ZXJ5LmZ4LnNwZWVkcyA9IHtcblx0c2xvdzogNjAwLFxuXHRmYXN0OiAyMDAsXG5cdC8vIERlZmF1bHQgc3BlZWRcblx0X2RlZmF1bHQ6IDQwMFxufTtcblxuXG4vLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXG4vLyBodHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXG5qUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiggdGltZSwgdHlwZSApIHtcblx0dGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcblx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XG5cdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCBuZXh0LCB0aW1lICk7XG5cdFx0aG9va3Muc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG5cdFx0fTtcblx0fSk7XG59O1xuXG5cbihmdW5jdGlvbigpIHtcblx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICksXG5cdFx0c2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJzZWxlY3RcIiApLFxuXHRcdG9wdCA9IHNlbGVjdC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJvcHRpb25cIiApICk7XG5cblx0aW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcblxuXHQvLyBTdXBwb3J0OiBpT1M8PTUuMSwgQW5kcm9pZDw9NC4yK1xuXHQvLyBEZWZhdWx0IHZhbHVlIGZvciBhIGNoZWNrYm94IHNob3VsZCBiZSBcIm9uXCJcblx0c3VwcG9ydC5jaGVja09uID0gaW5wdXQudmFsdWUgIT09IFwiXCI7XG5cblx0Ly8gU3VwcG9ydDogSUU8PTExK1xuXHQvLyBNdXN0IGFjY2VzcyBzZWxlY3RlZEluZGV4IHRvIG1ha2UgZGVmYXVsdCBvcHRpb25zIHNlbGVjdFxuXHRzdXBwb3J0Lm9wdFNlbGVjdGVkID0gb3B0LnNlbGVjdGVkO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8PTIuM1xuXHQvLyBPcHRpb25zIGluc2lkZSBkaXNhYmxlZCBzZWxlY3RzIGFyZSBpbmNvcnJlY3RseSBtYXJrZWQgYXMgZGlzYWJsZWRcblx0c2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcblx0c3VwcG9ydC5vcHREaXNhYmxlZCA9ICFvcHQuZGlzYWJsZWQ7XG5cblx0Ly8gU3VwcG9ydDogSUU8PTExK1xuXHQvLyBBbiBpbnB1dCBsb3NlcyBpdHMgdmFsdWUgYWZ0ZXIgYmVjb21pbmcgYSByYWRpb1xuXHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXHRpbnB1dC52YWx1ZSA9IFwidFwiO1xuXHRpbnB1dC50eXBlID0gXCJyYWRpb1wiO1xuXHRzdXBwb3J0LnJhZGlvVmFsdWUgPSBpbnB1dC52YWx1ZSA9PT0gXCJ0XCI7XG59KSgpO1xuXG5cbnZhciBub2RlSG9vaywgYm9vbEhvb2ssXG5cdGF0dHJIYW5kbGUgPSBqUXVlcnkuZXhwci5hdHRySGFuZGxlO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0YXR0cjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5hdHRyLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcblx0XHR9KTtcblx0fVxufSk7XG5cbmpRdWVyeS5leHRlbmQoe1xuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIGhvb2tzLCByZXQsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBkb24ndCBnZXQvc2V0IGF0dHJpYnV0ZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCAhZWxlbSB8fCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdGlmICggdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlID09PSBzdHJ1bmRlZmluZWQgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnByb3AoIGVsZW0sIG5hbWUsIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsIGF0dHJpYnV0ZXMgYXJlIGxvd2VyY2FzZVxuXHRcdC8vIEdyYWIgbmVjZXNzYXJ5IGhvb2sgaWYgb25lIGlzIGRlZmluZWRcblx0XHRpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblx0XHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUgXSB8fFxuXHRcdFx0XHQoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApID8gYm9vbEhvb2sgOiBub2RlSG9vayApO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gbnVsbCApIHtcblx0XHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdFx0fSBlbHNlIGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgdmFsdWUgKyBcIlwiICk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApKSAhPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiByZXQ7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHQvLyBOb24tZXhpc3RlbnQgYXR0cmlidXRlcyByZXR1cm4gbnVsbCwgd2Ugbm9ybWFsaXplIHRvIHVuZGVmaW5lZFxuXHRcdFx0cmV0dXJuIHJldCA9PSBudWxsID9cblx0XHRcdFx0dW5kZWZpbmVkIDpcblx0XHRcdFx0cmV0O1xuXHRcdH1cblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0dmFyIG5hbWUsIHByb3BOYW1lLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRhdHRyTmFtZXMgPSB2YWx1ZSAmJiB2YWx1ZS5tYXRjaCggcm5vdHdoaXRlICk7XG5cblx0XHRpZiAoIGF0dHJOYW1lcyAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0d2hpbGUgKCAobmFtZSA9IGF0dHJOYW1lc1tpKytdKSApIHtcblx0XHRcdFx0cHJvcE5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG5cblx0XHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGdldCBzcGVjaWFsIHRyZWF0bWVudCAoIzEwODcwKVxuXHRcdFx0XHRpZiAoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApICkge1xuXHRcdFx0XHRcdC8vIFNldCBjb3JyZXNwb25kaW5nIHByb3BlcnR5IHRvIGZhbHNlXG5cdFx0XHRcdFx0ZWxlbVsgcHJvcE5hbWUgXSA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIG5hbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0YXR0ckhvb2tzOiB7XG5cdFx0dHlwZToge1xuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggIXN1cHBvcnQucmFkaW9WYWx1ZSAmJiB2YWx1ZSA9PT0gXCJyYWRpb1wiICYmXG5cdFx0XHRcdFx0alF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR2YXIgdmFsID0gZWxlbS52YWx1ZTtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG5cdFx0XHRcdFx0aWYgKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuXG4vLyBIb29rcyBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzXG5ib29sSG9vayA9IHtcblx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG5cdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHQvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgbmFtZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmFtZTtcblx0fVxufTtcbmpRdWVyeS5lYWNoKCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCggL1xcdysvZyApLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0dmFyIGdldHRlciA9IGF0dHJIYW5kbGVbIG5hbWUgXSB8fCBqUXVlcnkuZmluZC5hdHRyO1xuXG5cdGF0dHJIYW5kbGVbIG5hbWUgXSA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgcmV0LCBoYW5kbGU7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHQvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wIGJ5IHRlbXBvcmFyaWx5IHJlbW92aW5nIHRoaXMgZnVuY3Rpb24gZnJvbSB0aGUgZ2V0dGVyXG5cdFx0XHRoYW5kbGUgPSBhdHRySGFuZGxlWyBuYW1lIF07XG5cdFx0XHRhdHRySGFuZGxlWyBuYW1lIF0gPSByZXQ7XG5cdFx0XHRyZXQgPSBnZXR0ZXIoIGVsZW0sIG5hbWUsIGlzWE1MICkgIT0gbnVsbCA/XG5cdFx0XHRcdG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0XHRhdHRySGFuZGxlWyBuYW1lIF0gPSBoYW5kbGU7XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH07XG59KTtcblxuXG5cblxudmFyIHJmb2N1c2FibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0cHJvcDogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5wcm9wLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVQcm9wOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXNbIGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZSBdO1xuXHRcdH0pO1xuXHR9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG5cdHByb3BGaXg6IHtcblx0XHRcImZvclwiOiBcImh0bWxGb3JcIixcblx0XHRcImNsYXNzXCI6IFwiY2xhc3NOYW1lXCJcblx0fSxcblxuXHRwcm9wOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsIG5vdHhtbCxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIERvbid0IGdldC9zZXQgcHJvcGVydGllcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG5vdHhtbCA9IG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKTtcblxuXHRcdGlmICggbm90eG1sICkge1xuXHRcdFx0Ly8gRml4IG5hbWUgYW5kIGF0dGFjaCBob29rc1xuXHRcdFx0bmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblx0XHRcdGhvb2tzID0galF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybiBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkpICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRyZXQgOlxuXHRcdFx0XHQoIGVsZW1bIG5hbWUgXSA9IHZhbHVlICk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApKSAhPT0gbnVsbCA/XG5cdFx0XHRcdHJldCA6XG5cdFx0XHRcdGVsZW1bIG5hbWUgXTtcblx0XHR9XG5cdH0sXG5cblx0cHJvcEhvb2tzOiB7XG5cdFx0dGFiSW5kZXg6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmhhc0F0dHJpYnV0ZSggXCJ0YWJpbmRleFwiICkgfHwgcmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHwgZWxlbS5ocmVmID9cblx0XHRcdFx0XHRlbGVtLnRhYkluZGV4IDpcblx0XHRcdFx0XHQtMTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuXG5pZiAoICFzdXBwb3J0Lm9wdFNlbGVjdGVkICkge1xuXHRqUXVlcnkucHJvcEhvb2tzLnNlbGVjdGVkID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0aWYgKCBwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH07XG59XG5cbmpRdWVyeS5lYWNoKFtcblx0XCJ0YWJJbmRleFwiLFxuXHRcInJlYWRPbmx5XCIsXG5cdFwibWF4TGVuZ3RoXCIsXG5cdFwiY2VsbFNwYWNpbmdcIixcblx0XCJjZWxsUGFkZGluZ1wiLFxuXHRcInJvd1NwYW5cIixcblx0XCJjb2xTcGFuXCIsXG5cdFwidXNlTWFwXCIsXG5cdFwiZnJhbWVCb3JkZXJcIixcblx0XCJjb250ZW50RWRpdGFibGVcIlxuXSwgZnVuY3Rpb24oKSB7XG5cdGpRdWVyeS5wcm9wRml4WyB0aGlzLnRvTG93ZXJDYXNlKCkgXSA9IHRoaXM7XG59KTtcblxuXG5cblxudmFyIHJjbGFzcyA9IC9bXFx0XFxyXFxuXFxmXS9nO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0YWRkQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcblx0XHRcdHByb2NlZWQgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCB0aGlzLmNsYXNzTmFtZSApICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoIHByb2NlZWQgKSB7XG5cdFx0XHQvLyBUaGUgZGlzanVuY3Rpb24gaGVyZSBpcyBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIHJlbW92ZUNsYXNzKVxuXHRcdFx0Y2xhc3NlcyA9ICggdmFsdWUgfHwgXCJcIiApLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGVsZW0gPSB0aGlzWyBpIF07XG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBlbGVtLmNsYXNzTmFtZSA/XG5cdFx0XHRcdFx0KCBcIiBcIiArIGVsZW0uY2xhc3NOYW1lICsgXCIgXCIgKS5yZXBsYWNlKCByY2xhc3MsIFwiIFwiICkgOlxuXHRcdFx0XHRcdFwiIFwiXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoY2xhenogPSBjbGFzc2VzW2orK10pICkge1xuXHRcdFx0XHRcdFx0aWYgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPCAwICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgKz0gY2xhenogKyBcIiBcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBvbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBqUXVlcnkudHJpbSggY3VyICk7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLmNsYXNzTmFtZSAhPT0gZmluYWxWYWx1ZSApIHtcblx0XHRcdFx0XHRcdGVsZW0uY2xhc3NOYW1lID0gZmluYWxWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRyZW1vdmVDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBjbGFzc2VzLCBlbGVtLCBjdXIsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0cHJvY2VlZCA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW4gPSB0aGlzLmxlbmd0aDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5yZW1vdmVDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgdGhpcy5jbGFzc05hbWUgKSApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmICggcHJvY2VlZCApIHtcblx0XHRcdGNsYXNzZXMgPSAoIHZhbHVlIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRlbGVtID0gdGhpc1sgaSBdO1xuXHRcdFx0XHQvLyBUaGlzIGV4cHJlc3Npb24gaXMgaGVyZSBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIGFkZENsYXNzKVxuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggZWxlbS5jbGFzc05hbWUgP1xuXHRcdFx0XHRcdCggXCIgXCIgKyBlbGVtLmNsYXNzTmFtZSArIFwiIFwiICkucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApIDpcblx0XHRcdFx0XHRcIlwiXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoY2xhenogPSBjbGFzc2VzW2orK10pICkge1xuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlICphbGwqIGluc3RhbmNlc1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPj0gMCApIHtcblx0XHRcdFx0XHRcdFx0Y3VyID0gY3VyLnJlcGxhY2UoIFwiIFwiICsgY2xhenogKyBcIiBcIiwgXCIgXCIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSB2YWx1ZSA/IGpRdWVyeS50cmltKCBjdXIgKSA6IFwiXCI7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLmNsYXNzTmFtZSAhPT0gZmluYWxWYWx1ZSApIHtcblx0XHRcdFx0XHRcdGVsZW0uY2xhc3NOYW1lID0gZmluYWxWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR0b2dnbGVDbGFzczogZnVuY3Rpb24oIHZhbHVlLCBzdGF0ZVZhbCApIHtcblx0XHR2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuXHRcdGlmICggdHlwZW9mIHN0YXRlVmFsID09PSBcImJvb2xlYW5cIiAmJiB0eXBlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHN0YXRlVmFsID8gdGhpcy5hZGRDbGFzcyggdmFsdWUgKSA6IHRoaXMucmVtb3ZlQ2xhc3MoIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnRvZ2dsZUNsYXNzKCB2YWx1ZS5jYWxsKHRoaXMsIGksIHRoaXMuY2xhc3NOYW1lLCBzdGF0ZVZhbCksIHN0YXRlVmFsICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCB0eXBlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHQvLyBUb2dnbGUgaW5kaXZpZHVhbCBjbGFzcyBuYW1lc1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lLFxuXHRcdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRcdHNlbGYgPSBqUXVlcnkoIHRoaXMgKSxcblx0XHRcdFx0XHRjbGFzc05hbWVzID0gdmFsdWUubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHRcdHdoaWxlICggKGNsYXNzTmFtZSA9IGNsYXNzTmFtZXNbIGkrKyBdKSApIHtcblx0XHRcdFx0XHQvLyBDaGVjayBlYWNoIGNsYXNzTmFtZSBnaXZlbiwgc3BhY2Ugc2VwYXJhdGVkIGxpc3Rcblx0XHRcdFx0XHRpZiAoIHNlbGYuaGFzQ2xhc3MoIGNsYXNzTmFtZSApICkge1xuXHRcdFx0XHRcdFx0c2VsZi5yZW1vdmVDbGFzcyggY2xhc3NOYW1lICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNlbGYuYWRkQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBUb2dnbGUgd2hvbGUgY2xhc3MgbmFtZVxuXHRcdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gc3RydW5kZWZpbmVkIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdFx0XHRpZiAoIHRoaXMuY2xhc3NOYW1lICkge1xuXHRcdFx0XHRcdC8vIHN0b3JlIGNsYXNzTmFtZSBpZiBzZXRcblx0XHRcdFx0XHRkYXRhX3ByaXYuc2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiwgdGhpcy5jbGFzc05hbWUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElmIHRoZSBlbGVtZW50IGhhcyBhIGNsYXNzIG5hbWUgb3IgaWYgd2UncmUgcGFzc2VkIGBmYWxzZWAsXG5cdFx0XHRcdC8vIHRoZW4gcmVtb3ZlIHRoZSB3aG9sZSBjbGFzc25hbWUgKGlmIHRoZXJlIHdhcyBvbmUsIHRoZSBhYm92ZSBzYXZlZCBpdCkuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBicmluZyBiYWNrIHdoYXRldmVyIHdhcyBwcmV2aW91c2x5IHNhdmVkIChpZiBhbnl0aGluZyksXG5cdFx0XHRcdC8vIGZhbGxpbmcgYmFjayB0byB0aGUgZW1wdHkgc3RyaW5nIGlmIG5vdGhpbmcgd2FzIHN0b3JlZC5cblx0XHRcdFx0dGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZSB8fCB2YWx1ZSA9PT0gZmFsc2UgPyBcIlwiIDogZGF0YV9wcml2LmdldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIgKSB8fCBcIlwiO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdGhhc0NsYXNzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IFwiIFwiICsgc2VsZWN0b3IgKyBcIiBcIixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdGlmICggdGhpc1tpXS5ub2RlVHlwZSA9PT0gMSAmJiAoXCIgXCIgKyB0aGlzW2ldLmNsYXNzTmFtZSArIFwiIFwiKS5yZXBsYWNlKHJjbGFzcywgXCIgXCIpLmluZGV4T2YoIGNsYXNzTmFtZSApID49IDAgKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufSk7XG5cblxuXG5cbnZhciBycmV0dXJuID0gL1xcci9nO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0dmFsOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGhvb2tzLCByZXQsIGlzRnVuY3Rpb24sXG5cdFx0XHRlbGVtID0gdGhpc1swXTtcblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyBlbGVtLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0ID0gZWxlbS52YWx1ZTtcblxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0Ly8gSGFuZGxlIG1vc3QgY29tbW9uIHN0cmluZyBjYXNlc1xuXHRcdFx0XHRcdHJldC5yZXBsYWNlKHJyZXR1cm4sIFwiXCIpIDpcblx0XHRcdFx0XHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcblx0XHRcdFx0XHRyZXQgPT0gbnVsbCA/IFwiXCIgOiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0dmFyIHZhbDtcblxuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlICE9PSAxICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaXNGdW5jdGlvbiApIHtcblx0XHRcdFx0dmFsID0gdmFsdWUuY2FsbCggdGhpcywgaSwgalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUcmVhdCBudWxsL3VuZGVmaW5lZCBhcyBcIlwiOyBjb252ZXJ0IG51bWJlcnMgdG8gc3RyaW5nXG5cdFx0XHRpZiAoIHZhbCA9PSBudWxsICkge1xuXHRcdFx0XHR2YWwgPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWwgKz0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHR2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0Ly8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoXCJzZXRcIiBpbiBob29rcykgfHwgaG9va3Muc2V0KCB0aGlzLCB2YWwsIFwidmFsdWVcIiApID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcblx0dmFsSG9va3M6IHtcblx0XHRvcHRpb246IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWwgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInZhbHVlXCIgKTtcblx0XHRcdFx0cmV0dXJuIHZhbCAhPSBudWxsID9cblx0XHRcdFx0XHR2YWwgOlxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFMTAtMTErXG5cdFx0XHRcdFx0Ly8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxuXHRcdFx0XHRcdGpRdWVyeS50cmltKCBqUXVlcnkudGV4dCggZWxlbSApICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZWxlY3Q6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSwgb3B0aW9uLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0aW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG5cdFx0XHRcdFx0b25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIiB8fCBpbmRleCA8IDAsXG5cdFx0XHRcdFx0dmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuXHRcdFx0XHRcdG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoLFxuXHRcdFx0XHRcdGkgPSBpbmRleCA8IDAgP1xuXHRcdFx0XHRcdFx0bWF4IDpcblx0XHRcdFx0XHRcdG9uZSA/IGluZGV4IDogMDtcblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG5cdFx0XHRcdGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8vIElFNi05IGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxuXHRcdFx0XHRcdGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuXHRcdFx0XHRcdFx0XHQvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHRcdFx0XHRcdCggc3VwcG9ydC5vcHREaXNhYmxlZCA/ICFvcHRpb24uZGlzYWJsZWQgOiBvcHRpb24uZ2V0QXR0cmlidXRlKCBcImRpc2FibGVkXCIgKSA9PT0gbnVsbCApICYmXG5cdFx0XHRcdFx0XHRcdCggIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8ICFqUXVlcnkubm9kZU5hbWUoIG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGpRdWVyeSggb3B0aW9uICkudmFsKCk7XG5cblx0XHRcdFx0XHRcdC8vIFdlIGRvbid0IG5lZWQgYW4gYXJyYXkgZm9yIG9uZSBzZWxlY3RzXG5cdFx0XHRcdFx0XHRpZiAoIG9uZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuXHRcdFx0XHRcdFx0dmFsdWVzLnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgb3B0aW9uU2V0LCBvcHRpb24sXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHR2YWx1ZXMgPSBqUXVlcnkubWFrZUFycmF5KCB2YWx1ZSApLFxuXHRcdFx0XHRcdGkgPSBvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cdFx0XHRcdFx0aWYgKCAob3B0aW9uLnNlbGVjdGVkID0galF1ZXJ5LmluQXJyYXkoIG9wdGlvbi52YWx1ZSwgdmFsdWVzICkgPj0gMCkgKSB7XG5cdFx0XHRcdFx0XHRvcHRpb25TZXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG5cdFx0XHRcdGlmICggIW9wdGlvblNldCApIHtcblx0XHRcdFx0XHRlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSk7XG5cbi8vIFJhZGlvcyBhbmQgY2hlY2tib3hlcyBnZXR0ZXIvc2V0dGVyXG5qUXVlcnkuZWFjaChbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoZWxlbSkudmFsKCksIHZhbHVlICkgPj0gMCApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0aWYgKCAhc3VwcG9ydC5jaGVja09uICkge1xuXHRcdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLmdldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKFwidmFsdWVcIikgPT09IG51bGwgPyBcIm9uXCIgOiBlbGVtLnZhbHVlO1xuXHRcdH07XG5cdH1cbn0pO1xuXG5cblxuXG4vLyBSZXR1cm4galF1ZXJ5IGZvciBhdHRyaWJ1dGVzLW9ubHkgaW5jbHVzaW9uXG5cblxualF1ZXJ5LmVhY2goIChcImJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrIFwiICtcblx0XCJtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBcIiArXG5cdFwiY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvciBjb250ZXh0bWVudVwiKS5zcGxpdChcIiBcIiksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXG5cdC8vIEhhbmRsZSBldmVudCBiaW5kaW5nXG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMCA/XG5cdFx0XHR0aGlzLm9uKCBuYW1lLCBudWxsLCBkYXRhLCBmbiApIDpcblx0XHRcdHRoaXMudHJpZ2dlciggbmFtZSApO1xuXHR9O1xufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRob3ZlcjogZnVuY3Rpb24oIGZuT3ZlciwgZm5PdXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMubW91c2VlbnRlciggZm5PdmVyICkubW91c2VsZWF2ZSggZm5PdXQgfHwgZm5PdmVyICk7XG5cdH0sXG5cblx0YmluZDogZnVuY3Rpb24oIHR5cGVzLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIG51bGwsIGRhdGEsIGZuICk7XG5cdH0sXG5cdHVuYmluZDogZnVuY3Rpb24oIHR5cGVzLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vZmYoIHR5cGVzLCBudWxsLCBmbiApO1xuXHR9LFxuXG5cdGRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xuXHR9LFxuXHR1bmRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBmbiApIHtcblx0XHQvLyAoIG5hbWVzcGFjZSApIG9yICggc2VsZWN0b3IsIHR5cGVzIFssIGZuXSApXG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyB0aGlzLm9mZiggc2VsZWN0b3IsIFwiKipcIiApIDogdGhpcy5vZmYoIHR5cGVzLCBzZWxlY3RvciB8fCBcIioqXCIsIGZuICk7XG5cdH1cbn0pO1xuXG5cbnZhciBub25jZSA9IGpRdWVyeS5ub3coKTtcblxudmFyIHJxdWVyeSA9ICgvXFw/Lyk7XG5cblxuXG4vLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xuLy8gV29ya2Fyb3VuZCBmYWlsdXJlIHRvIHN0cmluZy1jYXN0IG51bGwgaW5wdXRcbmpRdWVyeS5wYXJzZUpTT04gPSBmdW5jdGlvbiggZGF0YSApIHtcblx0cmV0dXJuIEpTT04ucGFyc2UoIGRhdGEgKyBcIlwiICk7XG59O1xuXG5cbi8vIENyb3NzLWJyb3dzZXIgeG1sIHBhcnNpbmdcbmpRdWVyeS5wYXJzZVhNTCA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHR2YXIgeG1sLCB0bXA7XG5cdGlmICggIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRTlcblx0dHJ5IHtcblx0XHR0bXAgPSBuZXcgRE9NUGFyc2VyKCk7XG5cdFx0eG1sID0gdG1wLnBhcnNlRnJvbVN0cmluZyggZGF0YSwgXCJ0ZXh0L3htbFwiICk7XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdHhtbCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmICggIXhtbCB8fCB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwicGFyc2VyZXJyb3JcIiApLmxlbmd0aCApIHtcblx0XHRqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBYTUw6IFwiICsgZGF0YSApO1xuXHR9XG5cdHJldHVybiB4bWw7XG59O1xuXG5cbnZhclxuXHRyaGFzaCA9IC8jLiokLyxcblx0cnRzID0gLyhbPyZdKV89W14mXSovLFxuXHRyaGVhZGVycyA9IC9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKSQvbWcsXG5cdC8vICM3NjUzLCAjODEyNSwgIzgxNTI6IGxvY2FsIHByb3RvY29sIGRldGVjdGlvblxuXHRybG9jYWxQcm90b2NvbCA9IC9eKD86YWJvdXR8YXBwfGFwcC1zdG9yYWdlfC4rLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvLFxuXHRybm9Db250ZW50ID0gL14oPzpHRVR8SEVBRCkkLyxcblx0cnByb3RvY29sID0gL15cXC9cXC8vLFxuXHRydXJsID0gL14oW1xcdy4rLV0rOikoPzpcXC9cXC8oPzpbXlxcLz8jXSpAfCkoW15cXC8/IzpdKikoPzo6KFxcZCspfCl8KS8sXG5cblx0LyogUHJlZmlsdGVyc1xuXHQgKiAxKSBUaGV5IGFyZSB1c2VmdWwgdG8gaW50cm9kdWNlIGN1c3RvbSBkYXRhVHlwZXMgKHNlZSBhamF4L2pzb25wLmpzIGZvciBhbiBleGFtcGxlKVxuXHQgKiAyKSBUaGVzZSBhcmUgY2FsbGVkOlxuXHQgKiAgICAtIEJFRk9SRSBhc2tpbmcgZm9yIGEgdHJhbnNwb3J0XG5cdCAqICAgIC0gQUZURVIgcGFyYW0gc2VyaWFsaXphdGlvbiAocy5kYXRhIGlzIGEgc3RyaW5nIGlmIHMucHJvY2Vzc0RhdGEgaXMgdHJ1ZSlcblx0ICogMykga2V5IGlzIHRoZSBkYXRhVHlwZVxuXHQgKiA0KSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXG5cdCAqIDUpIGV4ZWN1dGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGNvbnRpbnVlIGRvd24gdG8gXCIqXCIgaWYgbmVlZGVkXG5cdCAqL1xuXHRwcmVmaWx0ZXJzID0ge30sXG5cblx0LyogVHJhbnNwb3J0cyBiaW5kaW5nc1xuXHQgKiAxKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG5cdCAqIDIpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcblx0ICogMykgc2VsZWN0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gZ28gdG8gXCIqXCIgaWYgbmVlZGVkXG5cdCAqL1xuXHR0cmFuc3BvcnRzID0ge30sXG5cblx0Ly8gQXZvaWQgY29tbWVudC1wcm9sb2cgY2hhciBzZXF1ZW5jZSAoIzEwMDk4KTsgbXVzdCBhcHBlYXNlIGxpbnQgYW5kIGV2YWRlIGNvbXByZXNzaW9uXG5cdGFsbFR5cGVzID0gXCIqL1wiLmNvbmNhdCggXCIqXCIgKSxcblxuXHQvLyBEb2N1bWVudCBsb2NhdGlvblxuXHRhamF4TG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uaHJlZixcblxuXHQvLyBTZWdtZW50IGxvY2F0aW9uIGludG8gcGFydHNcblx0YWpheExvY1BhcnRzID0gcnVybC5leGVjKCBhamF4TG9jYXRpb24udG9Mb3dlckNhc2UoKSApIHx8IFtdO1xuXG4vLyBCYXNlIFwiY29uc3RydWN0b3JcIiBmb3IgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIgYW5kIGpRdWVyeS5hamF4VHJhbnNwb3J0XG5mdW5jdGlvbiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSApIHtcblxuXHQvLyBkYXRhVHlwZUV4cHJlc3Npb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIFwiKlwiXG5cdHJldHVybiBmdW5jdGlvbiggZGF0YVR5cGVFeHByZXNzaW9uLCBmdW5jICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YVR5cGVFeHByZXNzaW9uICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0ZnVuYyA9IGRhdGFUeXBlRXhwcmVzc2lvbjtcblx0XHRcdGRhdGFUeXBlRXhwcmVzc2lvbiA9IFwiKlwiO1xuXHRcdH1cblxuXHRcdHZhciBkYXRhVHlwZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZGF0YVR5cGVzID0gZGF0YVR5cGVFeHByZXNzaW9uLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZnVuYyApICkge1xuXHRcdFx0Ly8gRm9yIGVhY2ggZGF0YVR5cGUgaW4gdGhlIGRhdGFUeXBlRXhwcmVzc2lvblxuXHRcdFx0d2hpbGUgKCAoZGF0YVR5cGUgPSBkYXRhVHlwZXNbaSsrXSkgKSB7XG5cdFx0XHRcdC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXG5cdFx0XHRcdGlmICggZGF0YVR5cGVbMF0gPT09IFwiK1wiICkge1xuXHRcdFx0XHRcdGRhdGFUeXBlID0gZGF0YVR5cGUuc2xpY2UoIDEgKSB8fCBcIipcIjtcblx0XHRcdFx0XHQoc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdKS51bnNoaWZ0KCBmdW5jICk7XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGFwcGVuZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdChzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10pLnB1c2goIGZ1bmMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXG5mdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xuXG5cdHZhciBpbnNwZWN0ZWQgPSB7fSxcblx0XHRzZWVraW5nVHJhbnNwb3J0ID0gKCBzdHJ1Y3R1cmUgPT09IHRyYW5zcG9ydHMgKTtcblxuXHRmdW5jdGlvbiBpbnNwZWN0KCBkYXRhVHlwZSApIHtcblx0XHR2YXIgc2VsZWN0ZWQ7XG5cdFx0aW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcblx0XHRqUXVlcnkuZWFjaCggc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdLCBmdW5jdGlvbiggXywgcHJlZmlsdGVyT3JGYWN0b3J5ICkge1xuXHRcdFx0dmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcblx0XHRcdGlmICggdHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiYgIXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFsgZGF0YVR5cGVPclRyYW5zcG9ydCBdICkge1xuXHRcdFx0XHRvcHRpb25zLmRhdGFUeXBlcy51bnNoaWZ0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHRcdGluc3BlY3QoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICggc2Vla2luZ1RyYW5zcG9ydCApIHtcblx0XHRcdFx0cmV0dXJuICEoIHNlbGVjdGVkID0gZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBzZWxlY3RlZDtcblx0fVxuXG5cdHJldHVybiBpbnNwZWN0KCBvcHRpb25zLmRhdGFUeXBlc1sgMCBdICkgfHwgIWluc3BlY3RlZFsgXCIqXCIgXSAmJiBpbnNwZWN0KCBcIipcIiApO1xufVxuXG4vLyBBIHNwZWNpYWwgZXh0ZW5kIGZvciBhamF4IG9wdGlvbnNcbi8vIHRoYXQgdGFrZXMgXCJmbGF0XCIgb3B0aW9ucyAobm90IHRvIGJlIGRlZXAgZXh0ZW5kZWQpXG4vLyBGaXhlcyAjOTg4N1xuZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XG5cdHZhciBrZXksIGRlZXAsXG5cdFx0ZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xuXG5cdGZvciAoIGtleSBpbiBzcmMgKSB7XG5cdFx0aWYgKCBzcmNbIGtleSBdICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHQoIGZsYXRPcHRpb25zWyBrZXkgXSA/IHRhcmdldCA6ICggZGVlcCB8fCAoZGVlcCA9IHt9KSApIClbIGtleSBdID0gc3JjWyBrZXkgXTtcblx0XHR9XG5cdH1cblx0aWYgKCBkZWVwICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRydWUsIHRhcmdldCwgZGVlcCApO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyogSGFuZGxlcyByZXNwb25zZXMgdG8gYW4gYWpheCByZXF1ZXN0OlxuICogLSBmaW5kcyB0aGUgcmlnaHQgZGF0YVR5cGUgKG1lZGlhdGVzIGJldHdlZW4gY29udGVudC10eXBlIGFuZCBleHBlY3RlZCBkYXRhVHlwZSlcbiAqIC0gcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICovXG5mdW5jdGlvbiBhamF4SGFuZGxlUmVzcG9uc2VzKCBzLCBqcVhIUiwgcmVzcG9uc2VzICkge1xuXG5cdHZhciBjdCwgdHlwZSwgZmluYWxEYXRhVHlwZSwgZmlyc3REYXRhVHlwZSxcblx0XHRjb250ZW50cyA9IHMuY29udGVudHMsXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXM7XG5cblx0Ly8gUmVtb3ZlIGF1dG8gZGF0YVR5cGUgYW5kIGdldCBjb250ZW50LXR5cGUgaW4gdGhlIHByb2Nlc3Ncblx0d2hpbGUgKCBkYXRhVHlwZXNbIDAgXSA9PT0gXCIqXCIgKSB7XG5cdFx0ZGF0YVR5cGVzLnNoaWZ0KCk7XG5cdFx0aWYgKCBjdCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0Y3QgPSBzLm1pbWVUeXBlIHx8IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8vIENoZWNrIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGtub3duIGNvbnRlbnQtdHlwZVxuXHRpZiAoIGN0ICkge1xuXHRcdGZvciAoIHR5cGUgaW4gY29udGVudHMgKSB7XG5cdFx0XHRpZiAoIGNvbnRlbnRzWyB0eXBlIF0gJiYgY29udGVudHNbIHR5cGUgXS50ZXN0KCBjdCApICkge1xuXHRcdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggdHlwZSApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhIHJlc3BvbnNlIGZvciB0aGUgZXhwZWN0ZWQgZGF0YVR5cGVcblx0aWYgKCBkYXRhVHlwZXNbIDAgXSBpbiByZXNwb25zZXMgKSB7XG5cdFx0ZmluYWxEYXRhVHlwZSA9IGRhdGFUeXBlc1sgMCBdO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFRyeSBjb252ZXJ0aWJsZSBkYXRhVHlwZXNcblx0XHRmb3IgKCB0eXBlIGluIHJlc3BvbnNlcyApIHtcblx0XHRcdGlmICggIWRhdGFUeXBlc1sgMCBdIHx8IHMuY29udmVydGVyc1sgdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWzBdIF0gKSB7XG5cdFx0XHRcdGZpbmFsRGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggIWZpcnN0RGF0YVR5cGUgKSB7XG5cdFx0XHRcdGZpcnN0RGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBPciBqdXN0IHVzZSBmaXJzdCBvbmVcblx0XHRmaW5hbERhdGFUeXBlID0gZmluYWxEYXRhVHlwZSB8fCBmaXJzdERhdGFUeXBlO1xuXHR9XG5cblx0Ly8gSWYgd2UgZm91bmQgYSBkYXRhVHlwZVxuXHQvLyBXZSBhZGQgdGhlIGRhdGFUeXBlIHRvIHRoZSBsaXN0IGlmIG5lZWRlZFxuXHQvLyBhbmQgcmV0dXJuIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG5cdGlmICggZmluYWxEYXRhVHlwZSApIHtcblx0XHRpZiAoIGZpbmFsRGF0YVR5cGUgIT09IGRhdGFUeXBlc1sgMCBdICkge1xuXHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIGZpbmFsRGF0YVR5cGUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3BvbnNlc1sgZmluYWxEYXRhVHlwZSBdO1xuXHR9XG59XG5cbi8qIENoYWluIGNvbnZlcnNpb25zIGdpdmVuIHRoZSByZXF1ZXN0IGFuZCB0aGUgb3JpZ2luYWwgcmVzcG9uc2VcbiAqIEFsc28gc2V0cyB0aGUgcmVzcG9uc2VYWFggZmllbGRzIG9uIHRoZSBqcVhIUiBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKSB7XG5cdHZhciBjb252MiwgY3VycmVudCwgY29udiwgdG1wLCBwcmV2LFxuXHRcdGNvbnZlcnRlcnMgPSB7fSxcblx0XHQvLyBXb3JrIHdpdGggYSBjb3B5IG9mIGRhdGFUeXBlcyBpbiBjYXNlIHdlIG5lZWQgdG8gbW9kaWZ5IGl0IGZvciBjb252ZXJzaW9uXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXMuc2xpY2UoKTtcblxuXHQvLyBDcmVhdGUgY29udmVydGVycyBtYXAgd2l0aCBsb3dlcmNhc2VkIGtleXNcblx0aWYgKCBkYXRhVHlwZXNbIDEgXSApIHtcblx0XHRmb3IgKCBjb252IGluIHMuY29udmVydGVycyApIHtcblx0XHRcdGNvbnZlcnRlcnNbIGNvbnYudG9Mb3dlckNhc2UoKSBdID0gcy5jb252ZXJ0ZXJzWyBjb252IF07XG5cdFx0fVxuXHR9XG5cblx0Y3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG5cdC8vIENvbnZlcnQgdG8gZWFjaCBzZXF1ZW50aWFsIGRhdGFUeXBlXG5cdHdoaWxlICggY3VycmVudCApIHtcblxuXHRcdGlmICggcy5yZXNwb25zZUZpZWxkc1sgY3VycmVudCBdICkge1xuXHRcdFx0anFYSFJbIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSBdID0gcmVzcG9uc2U7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgdGhlIGRhdGFGaWx0ZXIgaWYgcHJvdmlkZWRcblx0XHRpZiAoICFwcmV2ICYmIGlzU3VjY2VzcyAmJiBzLmRhdGFGaWx0ZXIgKSB7XG5cdFx0XHRyZXNwb25zZSA9IHMuZGF0YUZpbHRlciggcmVzcG9uc2UsIHMuZGF0YVR5cGUgKTtcblx0XHR9XG5cblx0XHRwcmV2ID0gY3VycmVudDtcblx0XHRjdXJyZW50ID0gZGF0YVR5cGVzLnNoaWZ0KCk7XG5cblx0XHRpZiAoIGN1cnJlbnQgKSB7XG5cblx0XHQvLyBUaGVyZSdzIG9ubHkgd29yayB0byBkbyBpZiBjdXJyZW50IGRhdGFUeXBlIGlzIG5vbi1hdXRvXG5cdFx0XHRpZiAoIGN1cnJlbnQgPT09IFwiKlwiICkge1xuXG5cdFx0XHRcdGN1cnJlbnQgPSBwcmV2O1xuXG5cdFx0XHQvLyBDb252ZXJ0IHJlc3BvbnNlIGlmIHByZXYgZGF0YVR5cGUgaXMgbm9uLWF1dG8gYW5kIGRpZmZlcnMgZnJvbSBjdXJyZW50XG5cdFx0XHR9IGVsc2UgaWYgKCBwcmV2ICE9PSBcIipcIiAmJiBwcmV2ICE9PSBjdXJyZW50ICkge1xuXG5cdFx0XHRcdC8vIFNlZWsgYSBkaXJlY3QgY29udmVydGVyXG5cdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyBjdXJyZW50IF0gfHwgY29udmVydGVyc1sgXCIqIFwiICsgY3VycmVudCBdO1xuXG5cdFx0XHRcdC8vIElmIG5vbmUgZm91bmQsIHNlZWsgYSBwYWlyXG5cdFx0XHRcdGlmICggIWNvbnYgKSB7XG5cdFx0XHRcdFx0Zm9yICggY29udjIgaW4gY29udmVydGVycyApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSWYgY29udjIgb3V0cHV0cyBjdXJyZW50XG5cdFx0XHRcdFx0XHR0bXAgPSBjb252Mi5zcGxpdCggXCIgXCIgKTtcblx0XHRcdFx0XHRcdGlmICggdG1wWyAxIF0gPT09IGN1cnJlbnQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gSWYgcHJldiBjYW4gYmUgY29udmVydGVkIHRvIGFjY2VwdGVkIGlucHV0XG5cdFx0XHRcdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyB0bXBbIDAgXSBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0Y29udmVydGVyc1sgXCIqIFwiICsgdG1wWyAwIF0gXTtcblx0XHRcdFx0XHRcdFx0aWYgKCBjb252ICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIENvbmRlbnNlIGVxdWl2YWxlbmNlIGNvbnZlcnRlcnNcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGNvbnYgPT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgY29udjIgXTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjb252ZXJ0ZXJzWyBjb252MiBdICE9PSB0cnVlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3VycmVudCA9IHRtcFsgMCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHRtcFsgMSBdICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXBwbHkgY29udmVydGVyIChpZiBub3QgYW4gZXF1aXZhbGVuY2UpXG5cdFx0XHRcdGlmICggY29udiAhPT0gdHJ1ZSApIHtcblxuXHRcdFx0XHRcdC8vIFVubGVzcyBlcnJvcnMgYXJlIGFsbG93ZWQgdG8gYnViYmxlLCBjYXRjaCBhbmQgcmV0dXJuIHRoZW1cblx0XHRcdFx0XHRpZiAoIGNvbnYgJiYgc1sgXCJ0aHJvd3NcIiBdICkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgc3RhdGU6IFwicGFyc2VyZXJyb3JcIiwgZXJyb3I6IGNvbnYgPyBlIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyBwcmV2ICsgXCIgdG8gXCIgKyBjdXJyZW50IH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xufVxuXG5qUXVlcnkuZXh0ZW5kKHtcblxuXHQvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcblx0YWN0aXZlOiAwLFxuXG5cdC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3Rcblx0bGFzdE1vZGlmaWVkOiB7fSxcblx0ZXRhZzoge30sXG5cblx0YWpheFNldHRpbmdzOiB7XG5cdFx0dXJsOiBhamF4TG9jYXRpb24sXG5cdFx0dHlwZTogXCJHRVRcIixcblx0XHRpc0xvY2FsOiBybG9jYWxQcm90b2NvbC50ZXN0KCBhamF4TG9jUGFydHNbIDEgXSApLFxuXHRcdGdsb2JhbDogdHJ1ZSxcblx0XHRwcm9jZXNzRGF0YTogdHJ1ZSxcblx0XHRhc3luYzogdHJ1ZSxcblx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcblx0XHQvKlxuXHRcdHRpbWVvdXQ6IDAsXG5cdFx0ZGF0YTogbnVsbCxcblx0XHRkYXRhVHlwZTogbnVsbCxcblx0XHR1c2VybmFtZTogbnVsbCxcblx0XHRwYXNzd29yZDogbnVsbCxcblx0XHRjYWNoZTogbnVsbCxcblx0XHR0aHJvd3M6IGZhbHNlLFxuXHRcdHRyYWRpdGlvbmFsOiBmYWxzZSxcblx0XHRoZWFkZXJzOiB7fSxcblx0XHQqL1xuXG5cdFx0YWNjZXB0czoge1xuXHRcdFx0XCIqXCI6IGFsbFR5cGVzLFxuXHRcdFx0dGV4dDogXCJ0ZXh0L3BsYWluXCIsXG5cdFx0XHRodG1sOiBcInRleHQvaHRtbFwiLFxuXHRcdFx0eG1sOiBcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixcblx0XHRcdGpzb246IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0XCJcblx0XHR9LFxuXG5cdFx0Y29udGVudHM6IHtcblx0XHRcdHhtbDogL3htbC8sXG5cdFx0XHRodG1sOiAvaHRtbC8sXG5cdFx0XHRqc29uOiAvanNvbi9cblx0XHR9LFxuXG5cdFx0cmVzcG9uc2VGaWVsZHM6IHtcblx0XHRcdHhtbDogXCJyZXNwb25zZVhNTFwiLFxuXHRcdFx0dGV4dDogXCJyZXNwb25zZVRleHRcIixcblx0XHRcdGpzb246IFwicmVzcG9uc2VKU09OXCJcblx0XHR9LFxuXG5cdFx0Ly8gRGF0YSBjb252ZXJ0ZXJzXG5cdFx0Ly8gS2V5cyBzZXBhcmF0ZSBzb3VyY2UgKG9yIGNhdGNoYWxsIFwiKlwiKSBhbmQgZGVzdGluYXRpb24gdHlwZXMgd2l0aCBhIHNpbmdsZSBzcGFjZVxuXHRcdGNvbnZlcnRlcnM6IHtcblxuXHRcdFx0Ly8gQ29udmVydCBhbnl0aGluZyB0byB0ZXh0XG5cdFx0XHRcIiogdGV4dFwiOiBTdHJpbmcsXG5cblx0XHRcdC8vIFRleHQgdG8gaHRtbCAodHJ1ZSA9IG5vIHRyYW5zZm9ybWF0aW9uKVxuXHRcdFx0XCJ0ZXh0IGh0bWxcIjogdHJ1ZSxcblxuXHRcdFx0Ly8gRXZhbHVhdGUgdGV4dCBhcyBhIGpzb24gZXhwcmVzc2lvblxuXHRcdFx0XCJ0ZXh0IGpzb25cIjogalF1ZXJ5LnBhcnNlSlNPTixcblxuXHRcdFx0Ly8gUGFyc2UgdGV4dCBhcyB4bWxcblx0XHRcdFwidGV4dCB4bWxcIjogalF1ZXJ5LnBhcnNlWE1MXG5cdFx0fSxcblxuXHRcdC8vIEZvciBvcHRpb25zIHRoYXQgc2hvdWxkbid0IGJlIGRlZXAgZXh0ZW5kZWQ6XG5cdFx0Ly8geW91IGNhbiBhZGQgeW91ciBvd24gY3VzdG9tIG9wdGlvbnMgaGVyZSBpZlxuXHRcdC8vIGFuZCB3aGVuIHlvdSBjcmVhdGUgb25lIHRoYXQgc2hvdWxkbid0IGJlXG5cdFx0Ly8gZGVlcCBleHRlbmRlZCAoc2VlIGFqYXhFeHRlbmQpXG5cdFx0ZmxhdE9wdGlvbnM6IHtcblx0XHRcdHVybDogdHJ1ZSxcblx0XHRcdGNvbnRleHQ6IHRydWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gQ3JlYXRlcyBhIGZ1bGwgZmxlZGdlZCBzZXR0aW5ncyBvYmplY3QgaW50byB0YXJnZXRcblx0Ly8gd2l0aCBib3RoIGFqYXhTZXR0aW5ncyBhbmQgc2V0dGluZ3MgZmllbGRzLlxuXHQvLyBJZiB0YXJnZXQgaXMgb21pdHRlZCwgd3JpdGVzIGludG8gYWpheFNldHRpbmdzLlxuXHRhamF4U2V0dXA6IGZ1bmN0aW9uKCB0YXJnZXQsIHNldHRpbmdzICkge1xuXHRcdHJldHVybiBzZXR0aW5ncyA/XG5cblx0XHRcdC8vIEJ1aWxkaW5nIGEgc2V0dGluZ3Mgb2JqZWN0XG5cdFx0XHRhamF4RXh0ZW5kKCBhamF4RXh0ZW5kKCB0YXJnZXQsIGpRdWVyeS5hamF4U2V0dGluZ3MgKSwgc2V0dGluZ3MgKSA6XG5cblx0XHRcdC8vIEV4dGVuZGluZyBhamF4U2V0dGluZ3Ncblx0XHRcdGFqYXhFeHRlbmQoIGpRdWVyeS5hamF4U2V0dGluZ3MsIHRhcmdldCApO1xuXHR9LFxuXG5cdGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycyApLFxuXHRhamF4VHJhbnNwb3J0OiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMgKSxcblxuXHQvLyBNYWluIG1ldGhvZFxuXHRhamF4OiBmdW5jdGlvbiggdXJsLCBvcHRpb25zICkge1xuXG5cdFx0Ly8gSWYgdXJsIGlzIGFuIG9iamVjdCwgc2ltdWxhdGUgcHJlLTEuNSBzaWduYXR1cmVcblx0XHRpZiAoIHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRvcHRpb25zID0gdXJsO1xuXHRcdFx0dXJsID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIEZvcmNlIG9wdGlvbnMgdG8gYmUgYW4gb2JqZWN0XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHR2YXIgdHJhbnNwb3J0LFxuXHRcdFx0Ly8gVVJMIHdpdGhvdXQgYW50aS1jYWNoZSBwYXJhbVxuXHRcdFx0Y2FjaGVVUkwsXG5cdFx0XHQvLyBSZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcsXG5cdFx0XHRyZXNwb25zZUhlYWRlcnMsXG5cdFx0XHQvLyB0aW1lb3V0IGhhbmRsZVxuXHRcdFx0dGltZW91dFRpbWVyLFxuXHRcdFx0Ly8gQ3Jvc3MtZG9tYWluIGRldGVjdGlvbiB2YXJzXG5cdFx0XHRwYXJ0cyxcblx0XHRcdC8vIFRvIGtub3cgaWYgZ2xvYmFsIGV2ZW50cyBhcmUgdG8gYmUgZGlzcGF0Y2hlZFxuXHRcdFx0ZmlyZUdsb2JhbHMsXG5cdFx0XHQvLyBMb29wIHZhcmlhYmxlXG5cdFx0XHRpLFxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBmaW5hbCBvcHRpb25zIG9iamVjdFxuXHRcdFx0cyA9IGpRdWVyeS5hamF4U2V0dXAoIHt9LCBvcHRpb25zICksXG5cdFx0XHQvLyBDYWxsYmFja3MgY29udGV4dFxuXHRcdFx0Y2FsbGJhY2tDb250ZXh0ID0gcy5jb250ZXh0IHx8IHMsXG5cdFx0XHQvLyBDb250ZXh0IGZvciBnbG9iYWwgZXZlbnRzIGlzIGNhbGxiYWNrQ29udGV4dCBpZiBpdCBpcyBhIERPTSBub2RlIG9yIGpRdWVyeSBjb2xsZWN0aW9uXG5cdFx0XHRnbG9iYWxFdmVudENvbnRleHQgPSBzLmNvbnRleHQgJiYgKCBjYWxsYmFja0NvbnRleHQubm9kZVR5cGUgfHwgY2FsbGJhY2tDb250ZXh0LmpxdWVyeSApID9cblx0XHRcdFx0alF1ZXJ5KCBjYWxsYmFja0NvbnRleHQgKSA6XG5cdFx0XHRcdGpRdWVyeS5ldmVudCxcblx0XHRcdC8vIERlZmVycmVkc1xuXHRcdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGNvbXBsZXRlRGVmZXJyZWQgPSBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksXG5cdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0c3RhdHVzQ29kZSA9IHMuc3RhdHVzQ29kZSB8fCB7fSxcblx0XHRcdC8vIEhlYWRlcnMgKHRoZXkgYXJlIHNlbnQgYWxsIGF0IG9uY2UpXG5cdFx0XHRyZXF1ZXN0SGVhZGVycyA9IHt9LFxuXHRcdFx0cmVxdWVzdEhlYWRlcnNOYW1lcyA9IHt9LFxuXHRcdFx0Ly8gVGhlIGpxWEhSIHN0YXRlXG5cdFx0XHRzdGF0ZSA9IDAsXG5cdFx0XHQvLyBEZWZhdWx0IGFib3J0IG1lc3NhZ2Vcblx0XHRcdHN0ckFib3J0ID0gXCJjYW5jZWxlZFwiLFxuXHRcdFx0Ly8gRmFrZSB4aHJcblx0XHRcdGpxWEhSID0ge1xuXHRcdFx0XHRyZWFkeVN0YXRlOiAwLFxuXG5cdFx0XHRcdC8vIEJ1aWxkcyBoZWFkZXJzIGhhc2h0YWJsZSBpZiBuZWVkZWRcblx0XHRcdFx0Z2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uKCBrZXkgKSB7XG5cdFx0XHRcdFx0dmFyIG1hdGNoO1xuXHRcdFx0XHRcdGlmICggc3RhdGUgPT09IDIgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICFyZXNwb25zZUhlYWRlcnMgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlSGVhZGVycyA9IHt9O1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIChtYXRjaCA9IHJoZWFkZXJzLmV4ZWMoIHJlc3BvbnNlSGVhZGVyc1N0cmluZyApKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnNbIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgXSA9IG1hdGNoWyAyIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1hdGNoID0gcmVzcG9uc2VIZWFkZXJzWyBrZXkudG9Mb3dlckNhc2UoKSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2ggPT0gbnVsbCA/IG51bGwgOiBtYXRjaDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSYXcgc3RyaW5nXG5cdFx0XHRcdGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlID09PSAyID8gcmVzcG9uc2VIZWFkZXJzU3RyaW5nIDogbnVsbDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYWNoZXMgdGhlIGhlYWRlclxuXHRcdFx0XHRzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0dmFyIGxuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdGlmICggIXN0YXRlICkge1xuXHRcdFx0XHRcdFx0bmFtZSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbIGxuYW1lIF0gPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBsbmFtZSBdIHx8IG5hbWU7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0SGVhZGVyc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlcyByZXNwb25zZSBjb250ZW50LXR5cGUgaGVhZGVyXG5cdFx0XHRcdG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdGlmICggIXN0YXRlICkge1xuXHRcdFx0XHRcdFx0cy5taW1lVHlwZSA9IHR5cGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRcdHN0YXR1c0NvZGU6IGZ1bmN0aW9uKCBtYXAgKSB7XG5cdFx0XHRcdFx0dmFyIGNvZGU7XG5cdFx0XHRcdFx0aWYgKCBtYXAgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHN0YXRlIDwgMiApIHtcblx0XHRcdFx0XHRcdFx0Zm9yICggY29kZSBpbiBtYXAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gTGF6eS1hZGQgdGhlIG5ldyBjYWxsYmFjayBpbiBhIHdheSB0aGF0IHByZXNlcnZlcyBvbGQgb25lc1xuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGVbIGNvZGUgXSA9IFsgc3RhdHVzQ29kZVsgY29kZSBdLCBtYXBbIGNvZGUgXSBdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBFeGVjdXRlIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja3Ncblx0XHRcdFx0XHRcdFx0anFYSFIuYWx3YXlzKCBtYXBbIGpxWEhSLnN0YXR1cyBdICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbmNlbCB0aGUgcmVxdWVzdFxuXHRcdFx0XHRhYm9ydDogZnVuY3Rpb24oIHN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0dmFyIGZpbmFsVGV4dCA9IHN0YXR1c1RleHQgfHwgc3RyQWJvcnQ7XG5cdFx0XHRcdFx0aWYgKCB0cmFuc3BvcnQgKSB7XG5cdFx0XHRcdFx0XHR0cmFuc3BvcnQuYWJvcnQoIGZpbmFsVGV4dCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb25lKCAwLCBmaW5hbFRleHQgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdC8vIEF0dGFjaCBkZWZlcnJlZHNcblx0XHRkZWZlcnJlZC5wcm9taXNlKCBqcVhIUiApLmNvbXBsZXRlID0gY29tcGxldGVEZWZlcnJlZC5hZGQ7XG5cdFx0anFYSFIuc3VjY2VzcyA9IGpxWEhSLmRvbmU7XG5cdFx0anFYSFIuZXJyb3IgPSBqcVhIUi5mYWlsO1xuXG5cdFx0Ly8gUmVtb3ZlIGhhc2ggY2hhcmFjdGVyICgjNzUzMTogYW5kIHN0cmluZyBwcm9tb3Rpb24pXG5cdFx0Ly8gQWRkIHByb3RvY29sIGlmIG5vdCBwcm92aWRlZCAocHJlZmlsdGVycyBtaWdodCBleHBlY3QgaXQpXG5cdFx0Ly8gSGFuZGxlIGZhbHN5IHVybCBpbiB0aGUgc2V0dGluZ3Mgb2JqZWN0ICgjMTAwOTM6IGNvbnNpc3RlbmN5IHdpdGggb2xkIHNpZ25hdHVyZSlcblx0XHQvLyBXZSBhbHNvIHVzZSB0aGUgdXJsIHBhcmFtZXRlciBpZiBhdmFpbGFibGVcblx0XHRzLnVybCA9ICggKCB1cmwgfHwgcy51cmwgfHwgYWpheExvY2F0aW9uICkgKyBcIlwiICkucmVwbGFjZSggcmhhc2gsIFwiXCIgKVxuXHRcdFx0LnJlcGxhY2UoIHJwcm90b2NvbCwgYWpheExvY1BhcnRzWyAxIF0gKyBcIi8vXCIgKTtcblxuXHRcdC8vIEFsaWFzIG1ldGhvZCBvcHRpb24gdG8gdHlwZSBhcyBwZXIgdGlja2V0ICMxMjAwNFxuXHRcdHMudHlwZSA9IG9wdGlvbnMubWV0aG9kIHx8IG9wdGlvbnMudHlwZSB8fCBzLm1ldGhvZCB8fCBzLnR5cGU7XG5cblx0XHQvLyBFeHRyYWN0IGRhdGFUeXBlcyBsaXN0XG5cdFx0cy5kYXRhVHlwZXMgPSBqUXVlcnkudHJpbSggcy5kYXRhVHlwZSB8fCBcIipcIiApLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXG5cdFx0Ly8gQSBjcm9zcy1kb21haW4gcmVxdWVzdCBpcyBpbiBvcmRlciB3aGVuIHdlIGhhdmUgYSBwcm90b2NvbDpob3N0OnBvcnQgbWlzbWF0Y2hcblx0XHRpZiAoIHMuY3Jvc3NEb21haW4gPT0gbnVsbCApIHtcblx0XHRcdHBhcnRzID0gcnVybC5leGVjKCBzLnVybC50b0xvd2VyQ2FzZSgpICk7XG5cdFx0XHRzLmNyb3NzRG9tYWluID0gISEoIHBhcnRzICYmXG5cdFx0XHRcdCggcGFydHNbIDEgXSAhPT0gYWpheExvY1BhcnRzWyAxIF0gfHwgcGFydHNbIDIgXSAhPT0gYWpheExvY1BhcnRzWyAyIF0gfHxcblx0XHRcdFx0XHQoIHBhcnRzWyAzIF0gfHwgKCBwYXJ0c1sgMSBdID09PSBcImh0dHA6XCIgPyBcIjgwXCIgOiBcIjQ0M1wiICkgKSAhPT1cblx0XHRcdFx0XHRcdCggYWpheExvY1BhcnRzWyAzIF0gfHwgKCBhamF4TG9jUGFydHNbIDEgXSA9PT0gXCJodHRwOlwiID8gXCI4MFwiIDogXCI0NDNcIiApICkgKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcblx0XHRpZiAoIHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmIHR5cGVvZiBzLmRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRzLmRhdGEgPSBqUXVlcnkucGFyYW0oIHMuZGF0YSwgcy50cmFkaXRpb25hbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHByZWZpbHRlcnNcblx0XHRpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXG5cdFx0aWYgKCBzdGF0ZSA9PT0gMiApIHtcblx0XHRcdHJldHVybiBqcVhIUjtcblx0XHR9XG5cblx0XHQvLyBXZSBjYW4gZmlyZSBnbG9iYWwgZXZlbnRzIGFzIG9mIG5vdyBpZiBhc2tlZCB0b1xuXHRcdC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIGpRdWVyeS5ldmVudCBpcyB1bmRlZmluZWQgaW4gYW4gQU1ELXVzYWdlIHNjZW5hcmlvICgjMTUxMTgpXG5cdFx0ZmlyZUdsb2JhbHMgPSBqUXVlcnkuZXZlbnQgJiYgcy5nbG9iYWw7XG5cblx0XHQvLyBXYXRjaCBmb3IgYSBuZXcgc2V0IG9mIHJlcXVlc3RzXG5cdFx0aWYgKCBmaXJlR2xvYmFscyAmJiBqUXVlcnkuYWN0aXZlKysgPT09IDAgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlcihcImFqYXhTdGFydFwiKTtcblx0XHR9XG5cblx0XHQvLyBVcHBlcmNhc2UgdGhlIHR5cGVcblx0XHRzLnR5cGUgPSBzLnR5cGUudG9VcHBlckNhc2UoKTtcblxuXHRcdC8vIERldGVybWluZSBpZiByZXF1ZXN0IGhhcyBjb250ZW50XG5cdFx0cy5oYXNDb250ZW50ID0gIXJub0NvbnRlbnQudGVzdCggcy50eXBlICk7XG5cblx0XHQvLyBTYXZlIHRoZSBVUkwgaW4gY2FzZSB3ZSdyZSB0b3lpbmcgd2l0aCB0aGUgSWYtTW9kaWZpZWQtU2luY2Vcblx0XHQvLyBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIgbGF0ZXIgb25cblx0XHRjYWNoZVVSTCA9IHMudXJsO1xuXG5cdFx0Ly8gTW9yZSBvcHRpb25zIGhhbmRsaW5nIGZvciByZXF1ZXN0cyB3aXRoIG5vIGNvbnRlbnRcblx0XHRpZiAoICFzLmhhc0NvbnRlbnQgKSB7XG5cblx0XHRcdC8vIElmIGRhdGEgaXMgYXZhaWxhYmxlLCBhcHBlbmQgZGF0YSB0byB1cmxcblx0XHRcdGlmICggcy5kYXRhICkge1xuXHRcdFx0XHRjYWNoZVVSTCA9ICggcy51cmwgKz0gKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuZGF0YSApO1xuXHRcdFx0XHQvLyAjOTY4MjogcmVtb3ZlIGRhdGEgc28gdGhhdCBpdCdzIG5vdCB1c2VkIGluIGFuIGV2ZW50dWFsIHJldHJ5XG5cdFx0XHRcdGRlbGV0ZSBzLmRhdGE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBhbnRpLWNhY2hlIGluIHVybCBpZiBuZWVkZWRcblx0XHRcdGlmICggcy5jYWNoZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdHMudXJsID0gcnRzLnRlc3QoIGNhY2hlVVJMICkgP1xuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhICdfJyBwYXJhbWV0ZXIsIHNldCBpdHMgdmFsdWVcblx0XHRcdFx0XHRjYWNoZVVSTC5yZXBsYWNlKCBydHMsIFwiJDFfPVwiICsgbm9uY2UrKyApIDpcblxuXHRcdFx0XHRcdC8vIE90aGVyd2lzZSBhZGQgb25lIHRvIHRoZSBlbmRcblx0XHRcdFx0XHRjYWNoZVVSTCArICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBcIl89XCIgKyBub25jZSsrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTW9kaWZpZWQtU2luY2VcIiwgalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApIHtcblx0XHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBjb3JyZWN0IGhlYWRlciwgaWYgZGF0YSBpcyBiZWluZyBzZW50XG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5oYXNDb250ZW50ICYmIHMuY29udGVudFR5cGUgIT09IGZhbHNlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuXHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoXG5cdFx0XHRcIkFjY2VwdFwiLFxuXHRcdFx0cy5kYXRhVHlwZXNbIDAgXSAmJiBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWzBdIF0gP1xuXHRcdFx0XHRzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWzBdIF0gKyAoIHMuZGF0YVR5cGVzWyAwIF0gIT09IFwiKlwiID8gXCIsIFwiICsgYWxsVHlwZXMgKyBcIjsgcT0wLjAxXCIgOiBcIlwiICkgOlxuXHRcdFx0XHRzLmFjY2VwdHNbIFwiKlwiIF1cblx0XHQpO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG5cdFx0Zm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcblx0XHRpZiAoIHMuYmVmb3JlU2VuZCAmJiAoIHMuYmVmb3JlU2VuZC5jYWxsKCBjYWxsYmFja0NvbnRleHQsIGpxWEhSLCBzICkgPT09IGZhbHNlIHx8IHN0YXRlID09PSAyICkgKSB7XG5cdFx0XHQvLyBBYm9ydCBpZiBub3QgZG9uZSBhbHJlYWR5IGFuZCByZXR1cm5cblx0XHRcdHJldHVybiBqcVhIUi5hYm9ydCgpO1xuXHRcdH1cblxuXHRcdC8vIEFib3J0aW5nIGlzIG5vIGxvbmdlciBhIGNhbmNlbGxhdGlvblxuXHRcdHN0ckFib3J0ID0gXCJhYm9ydFwiO1xuXG5cdFx0Ly8gSW5zdGFsbCBjYWxsYmFja3Mgb24gZGVmZXJyZWRzXG5cdFx0Zm9yICggaSBpbiB7IHN1Y2Nlc3M6IDEsIGVycm9yOiAxLCBjb21wbGV0ZTogMSB9ICkge1xuXHRcdFx0anFYSFJbIGkgXSggc1sgaSBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRyYW5zcG9ydFxuXHRcdHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XG5cdFx0aWYgKCAhdHJhbnNwb3J0ICkge1xuXHRcdFx0ZG9uZSggLTEsIFwiTm8gVHJhbnNwb3J0XCIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IDE7XG5cblx0XHRcdC8vIFNlbmQgZ2xvYmFsIGV2ZW50XG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4U2VuZFwiLCBbIGpxWEhSLCBzIF0gKTtcblx0XHRcdH1cblx0XHRcdC8vIFRpbWVvdXRcblx0XHRcdGlmICggcy5hc3luYyAmJiBzLnRpbWVvdXQgPiAwICkge1xuXHRcdFx0XHR0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGpxWEhSLmFib3J0KFwidGltZW91dFwiKTtcblx0XHRcdFx0fSwgcy50aW1lb3V0ICk7XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHN0YXRlID0gMTtcblx0XHRcdFx0dHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdFx0Ly8gUHJvcGFnYXRlIGV4Y2VwdGlvbiBhcyBlcnJvciBpZiBub3QgZG9uZVxuXHRcdFx0XHRpZiAoIHN0YXRlIDwgMiApIHtcblx0XHRcdFx0XHRkb25lKCAtMSwgZSApO1xuXHRcdFx0XHQvLyBTaW1wbHkgcmV0aHJvdyBvdGhlcndpc2Vcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbGJhY2sgZm9yIHdoZW4gZXZlcnl0aGluZyBpcyBkb25lXG5cdFx0ZnVuY3Rpb24gZG9uZSggc3RhdHVzLCBuYXRpdmVTdGF0dXNUZXh0LCByZXNwb25zZXMsIGhlYWRlcnMgKSB7XG5cdFx0XHR2YXIgaXNTdWNjZXNzLCBzdWNjZXNzLCBlcnJvciwgcmVzcG9uc2UsIG1vZGlmaWVkLFxuXHRcdFx0XHRzdGF0dXNUZXh0ID0gbmF0aXZlU3RhdHVzVGV4dDtcblxuXHRcdFx0Ly8gQ2FsbGVkIG9uY2Vcblx0XHRcdGlmICggc3RhdGUgPT09IDIgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhdGUgaXMgXCJkb25lXCIgbm93XG5cdFx0XHRzdGF0ZSA9IDI7XG5cblx0XHRcdC8vIENsZWFyIHRpbWVvdXQgaWYgaXQgZXhpc3RzXG5cdFx0XHRpZiAoIHRpbWVvdXRUaW1lciApIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KCB0aW1lb3V0VGltZXIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRGVyZWZlcmVuY2UgdHJhbnNwb3J0IGZvciBlYXJseSBnYXJiYWdlIGNvbGxlY3Rpb25cblx0XHRcdC8vIChubyBtYXR0ZXIgaG93IGxvbmcgdGhlIGpxWEhSIG9iamVjdCB3aWxsIGJlIHVzZWQpXG5cdFx0XHR0cmFuc3BvcnQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdC8vIENhY2hlIHJlc3BvbnNlIGhlYWRlcnNcblx0XHRcdHJlc3BvbnNlSGVhZGVyc1N0cmluZyA9IGhlYWRlcnMgfHwgXCJcIjtcblxuXHRcdFx0Ly8gU2V0IHJlYWR5U3RhdGVcblx0XHRcdGpxWEhSLnJlYWR5U3RhdGUgPSBzdGF0dXMgPiAwID8gNCA6IDA7XG5cblx0XHRcdC8vIERldGVybWluZSBpZiBzdWNjZXNzZnVsXG5cdFx0XHRpc1N1Y2Nlc3MgPSBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNDtcblxuXHRcdFx0Ly8gR2V0IHJlc3BvbnNlIGRhdGFcblx0XHRcdGlmICggcmVzcG9uc2VzICkge1xuXHRcdFx0XHRyZXNwb25zZSA9IGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udmVydCBubyBtYXR0ZXIgd2hhdCAodGhhdCB3YXkgcmVzcG9uc2VYWFggZmllbGRzIGFyZSBhbHdheXMgc2V0KVxuXHRcdFx0cmVzcG9uc2UgPSBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKTtcblxuXHRcdFx0Ly8gSWYgc3VjY2Vzc2Z1bCwgaGFuZGxlIHR5cGUgY2hhaW5pbmdcblx0XHRcdGlmICggaXNTdWNjZXNzICkge1xuXG5cdFx0XHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0XHRcdGlmICggcy5pZk1vZGlmaWVkICkge1xuXHRcdFx0XHRcdG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJMYXN0LU1vZGlmaWVkXCIpO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJldGFnXCIpO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIG5vIGNvbnRlbnRcblx0XHRcdFx0aWYgKCBzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcIm5vY29udGVudFwiO1xuXG5cdFx0XHRcdC8vIGlmIG5vdCBtb2RpZmllZFxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDMwNCApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xuXG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgZGF0YSwgbGV0J3MgY29udmVydCBpdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0ZTtcblx0XHRcdFx0XHRzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcblx0XHRcdFx0XHRlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuXHRcdFx0XHRcdGlzU3VjY2VzcyA9ICFlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gRXh0cmFjdCBlcnJvciBmcm9tIHN0YXR1c1RleHQgYW5kIG5vcm1hbGl6ZSBmb3Igbm9uLWFib3J0c1xuXHRcdFx0XHRlcnJvciA9IHN0YXR1c1RleHQ7XG5cdFx0XHRcdGlmICggc3RhdHVzIHx8ICFzdGF0dXNUZXh0ICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcImVycm9yXCI7XG5cdFx0XHRcdFx0aWYgKCBzdGF0dXMgPCAwICkge1xuXHRcdFx0XHRcdFx0c3RhdHVzID0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGRhdGEgZm9yIHRoZSBmYWtlIHhociBvYmplY3Rcblx0XHRcdGpxWEhSLnN0YXR1cyA9IHN0YXR1cztcblx0XHRcdGpxWEhSLnN0YXR1c1RleHQgPSAoIG5hdGl2ZVN0YXR1c1RleHQgfHwgc3RhdHVzVGV4dCApICsgXCJcIjtcblxuXHRcdFx0Ly8gU3VjY2Vzcy9FcnJvclxuXHRcdFx0aWYgKCBpc1N1Y2Nlc3MgKSB7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsgc3VjY2Vzcywgc3RhdHVzVGV4dCwganFYSFIgXSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0LCBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRqcVhIUi5zdGF0dXNDb2RlKCBzdGF0dXNDb2RlICk7XG5cdFx0XHRzdGF0dXNDb2RlID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggaXNTdWNjZXNzID8gXCJhamF4U3VjY2Vzc1wiIDogXCJhamF4RXJyb3JcIixcblx0XHRcdFx0XHRbIGpxWEhSLCBzLCBpc1N1Y2Nlc3MgPyBzdWNjZXNzIDogZXJyb3IgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb21wbGV0ZVxuXHRcdFx0Y29tcGxldGVEZWZlcnJlZC5maXJlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0IF0gKTtcblxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheENvbXBsZXRlXCIsIFsganFYSFIsIHMgXSApO1xuXHRcdFx0XHQvLyBIYW5kbGUgdGhlIGdsb2JhbCBBSkFYIGNvdW50ZXJcblx0XHRcdFx0aWYgKCAhKCAtLWpRdWVyeS5hY3RpdmUgKSApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlcihcImFqYXhTdG9wXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpxWEhSO1xuXHR9LFxuXG5cdGdldEpTT046IGZ1bmN0aW9uKCB1cmwsIGRhdGEsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBcImpzb25cIiApO1xuXHR9LFxuXG5cdGdldFNjcmlwdDogZnVuY3Rpb24oIHVybCwgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5nZXQoIHVybCwgdW5kZWZpbmVkLCBjYWxsYmFjaywgXCJzY3JpcHRcIiApO1xuXHR9XG59KTtcblxualF1ZXJ5LmVhY2goIFsgXCJnZXRcIiwgXCJwb3N0XCIgXSwgZnVuY3Rpb24oIGksIG1ldGhvZCApIHtcblx0alF1ZXJ5WyBtZXRob2QgXSA9IGZ1bmN0aW9uKCB1cmwsIGRhdGEsIGNhbGxiYWNrLCB0eXBlICkge1xuXHRcdC8vIFNoaWZ0IGFyZ3VtZW50cyBpZiBkYXRhIGFyZ3VtZW50IHdhcyBvbWl0dGVkXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZGF0YSApICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgY2FsbGJhY2s7XG5cdFx0XHRjYWxsYmFjayA9IGRhdGE7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkuYWpheCh7XG5cdFx0XHR1cmw6IHVybCxcblx0XHRcdHR5cGU6IG1ldGhvZCxcblx0XHRcdGRhdGFUeXBlOiB0eXBlLFxuXHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdHN1Y2Nlc3M6IGNhbGxiYWNrXG5cdFx0fSk7XG5cdH07XG59KTtcblxuXG5qUXVlcnkuX2V2YWxVcmwgPSBmdW5jdGlvbiggdXJsICkge1xuXHRyZXR1cm4galF1ZXJ5LmFqYXgoe1xuXHRcdHVybDogdXJsLFxuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0ZGF0YVR5cGU6IFwic2NyaXB0XCIsXG5cdFx0YXN5bmM6IGZhbHNlLFxuXHRcdGdsb2JhbDogZmFsc2UsXG5cdFx0XCJ0aHJvd3NcIjogdHJ1ZVxuXHR9KTtcbn07XG5cblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdHdyYXBBbGw6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciB3cmFwO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcEFsbCggaHRtbC5jYWxsKHRoaXMsIGkpICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoIHRoaXNbIDAgXSApIHtcblxuXHRcdFx0Ly8gVGhlIGVsZW1lbnRzIHRvIHdyYXAgdGhlIHRhcmdldCBhcm91bmRcblx0XHRcdHdyYXAgPSBqUXVlcnkoIGh0bWwsIHRoaXNbIDAgXS5vd25lckRvY3VtZW50ICkuZXEoIDAgKS5jbG9uZSggdHJ1ZSApO1xuXG5cdFx0XHRpZiAoIHRoaXNbIDAgXS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR3cmFwLmluc2VydEJlZm9yZSggdGhpc1sgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHdyYXAubWFwKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IHRoaXM7XG5cblx0XHRcdFx0d2hpbGUgKCBlbGVtLmZpcnN0RWxlbWVudENoaWxkICkge1xuXHRcdFx0XHRcdGVsZW0gPSBlbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGVsZW07XG5cdFx0XHR9KS5hcHBlbmQoIHRoaXMgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR3cmFwSW5uZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBJbm5lciggaHRtbC5jYWxsKHRoaXMsIGkpICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSBqUXVlcnkoIHRoaXMgKSxcblx0XHRcdFx0Y29udGVudHMgPSBzZWxmLmNvbnRlbnRzKCk7XG5cblx0XHRcdGlmICggY29udGVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRjb250ZW50cy53cmFwQWxsKCBodG1sICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCBodG1sICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0d3JhcDogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcblx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGlzRnVuY3Rpb24gPyBodG1sLmNhbGwodGhpcywgaSkgOiBodG1sICk7XG5cdFx0fSk7XG5cdH0sXG5cblx0dW53cmFwOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImJvZHlcIiApICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5yZXBsYWNlV2l0aCggdGhpcy5jaGlsZE5vZGVzICk7XG5cdFx0XHR9XG5cdFx0fSkuZW5kKCk7XG5cdH1cbn0pO1xuXG5cbmpRdWVyeS5leHByLmZpbHRlcnMuaGlkZGVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdC8vIFN1cHBvcnQ6IE9wZXJhIDw9IDEyLjEyXG5cdC8vIE9wZXJhIHJlcG9ydHMgb2Zmc2V0V2lkdGhzIGFuZCBvZmZzZXRIZWlnaHRzIGxlc3MgdGhhbiB6ZXJvIG9uIHNvbWUgZWxlbWVudHNcblx0cmV0dXJuIGVsZW0ub2Zmc2V0V2lkdGggPD0gMCAmJiBlbGVtLm9mZnNldEhlaWdodCA8PSAwO1xufTtcbmpRdWVyeS5leHByLmZpbHRlcnMudmlzaWJsZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4gIWpRdWVyeS5leHByLmZpbHRlcnMuaGlkZGVuKCBlbGVtICk7XG59O1xuXG5cblxuXG52YXIgcjIwID0gLyUyMC9nLFxuXHRyYnJhY2tldCA9IC9cXFtcXF0kLyxcblx0ckNSTEYgPSAvXFxyP1xcbi9nLFxuXHRyc3VibWl0dGVyVHlwZXMgPSAvXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksXG5cdHJzdWJtaXR0YWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtcblxuZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuXHR2YXIgbmFtZTtcblxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBvYmogKSApIHtcblx0XHQvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cblx0XHRqUXVlcnkuZWFjaCggb2JqLCBmdW5jdGlvbiggaSwgdiApIHtcblx0XHRcdGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cdFx0XHRcdC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cblx0XHRcdFx0YWRkKCBwcmVmaXgsIHYgKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSXRlbSBpcyBub24tc2NhbGFyIChhcnJheSBvciBvYmplY3QpLCBlbmNvZGUgaXRzIG51bWVyaWMgaW5kZXguXG5cdFx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArICggdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgPyBpIDogXCJcIiApICsgXCJdXCIsIHYsIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9IGVsc2UgaWYgKCAhdHJhZGl0aW9uYWwgJiYgalF1ZXJ5LnR5cGUoIG9iaiApID09PSBcIm9iamVjdFwiICkge1xuXHRcdC8vIFNlcmlhbGl6ZSBvYmplY3QgaXRlbS5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArIG5hbWUgKyBcIl1cIiwgb2JqWyBuYW1lIF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cblx0fSBlbHNlIHtcblx0XHQvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXG5cdFx0YWRkKCBwcmVmaXgsIG9iaiApO1xuXHR9XG59XG5cbi8vIFNlcmlhbGl6ZSBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzIG9yIGEgc2V0IG9mXG4vLyBrZXkvdmFsdWVzIGludG8gYSBxdWVyeSBzdHJpbmdcbmpRdWVyeS5wYXJhbSA9IGZ1bmN0aW9uKCBhLCB0cmFkaXRpb25hbCApIHtcblx0dmFyIHByZWZpeCxcblx0XHRzID0gW10sXG5cdFx0YWRkID0gZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0XHQvLyBJZiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpbnZva2UgaXQgYW5kIHJldHVybiBpdHMgdmFsdWVcblx0XHRcdHZhbHVlID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgPyB2YWx1ZSgpIDogKCB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICk7XG5cdFx0XHRzWyBzLmxlbmd0aCBdID0gZW5jb2RlVVJJQ29tcG9uZW50KCBrZXkgKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KCB2YWx1ZSApO1xuXHRcdH07XG5cblx0Ly8gU2V0IHRyYWRpdGlvbmFsIHRvIHRydWUgZm9yIGpRdWVyeSA8PSAxLjMuMiBiZWhhdmlvci5cblx0aWYgKCB0cmFkaXRpb25hbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHRyYWRpdGlvbmFsID0galF1ZXJ5LmFqYXhTZXR0aW5ncyAmJiBqUXVlcnkuYWpheFNldHRpbmdzLnRyYWRpdGlvbmFsO1xuXHR9XG5cblx0Ly8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cblx0aWYgKCBqUXVlcnkuaXNBcnJheSggYSApIHx8ICggYS5qcXVlcnkgJiYgIWpRdWVyeS5pc1BsYWluT2JqZWN0KCBhICkgKSApIHtcblx0XHQvLyBTZXJpYWxpemUgdGhlIGZvcm0gZWxlbWVudHNcblx0XHRqUXVlcnkuZWFjaCggYSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRhZGQoIHRoaXMubmFtZSwgdGhpcy52YWx1ZSApO1xuXHRcdH0pO1xuXG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgdHJhZGl0aW9uYWwsIGVuY29kZSB0aGUgXCJvbGRcIiB3YXkgKHRoZSB3YXkgMS4zLjIgb3Igb2xkZXJcblx0XHQvLyBkaWQgaXQpLCBvdGhlcndpc2UgZW5jb2RlIHBhcmFtcyByZWN1cnNpdmVseS5cblx0XHRmb3IgKCBwcmVmaXggaW4gYSApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXgsIGFbIHByZWZpeCBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSByZXN1bHRpbmcgc2VyaWFsaXphdGlvblxuXHRyZXR1cm4gcy5qb2luKCBcIiZcIiApLnJlcGxhY2UoIHIyMCwgXCIrXCIgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRzZXJpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnkucGFyYW0oIHRoaXMuc2VyaWFsaXplQXJyYXkoKSApO1xuXHR9LFxuXHRzZXJpYWxpemVBcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gQ2FuIGFkZCBwcm9wSG9vayBmb3IgXCJlbGVtZW50c1wiIHRvIGZpbHRlciBvciBhZGQgZm9ybSBlbGVtZW50c1xuXHRcdFx0dmFyIGVsZW1lbnRzID0galF1ZXJ5LnByb3AoIHRoaXMsIFwiZWxlbWVudHNcIiApO1xuXHRcdFx0cmV0dXJuIGVsZW1lbnRzID8galF1ZXJ5Lm1ha2VBcnJheSggZWxlbWVudHMgKSA6IHRoaXM7XG5cdFx0fSlcblx0XHQuZmlsdGVyKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHR5cGUgPSB0aGlzLnR5cGU7XG5cblx0XHRcdC8vIFVzZSAuaXMoIFwiOmRpc2FibGVkXCIgKSBzbyB0aGF0IGZpZWxkc2V0W2Rpc2FibGVkXSB3b3Jrc1xuXHRcdFx0cmV0dXJuIHRoaXMubmFtZSAmJiAhalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmRpc2FibGVkXCIgKSAmJlxuXHRcdFx0XHRyc3VibWl0dGFibGUudGVzdCggdGhpcy5ub2RlTmFtZSApICYmICFyc3VibWl0dGVyVHlwZXMudGVzdCggdHlwZSApICYmXG5cdFx0XHRcdCggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcblx0XHR9KVxuXHRcdC5tYXAoZnVuY3Rpb24oIGksIGVsZW0gKSB7XG5cdFx0XHR2YXIgdmFsID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cblx0XHRcdHJldHVybiB2YWwgPT0gbnVsbCA/XG5cdFx0XHRcdG51bGwgOlxuXHRcdFx0XHRqUXVlcnkuaXNBcnJheSggdmFsICkgP1xuXHRcdFx0XHRcdGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbCApIHtcblx0XHRcdFx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHR9KS5nZXQoKTtcblx0fVxufSk7XG5cblxualF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIgPSBmdW5jdGlvbigpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdH0gY2F0Y2goIGUgKSB7fVxufTtcblxudmFyIHhocklkID0gMCxcblx0eGhyQ2FsbGJhY2tzID0ge30sXG5cdHhoclN1Y2Nlc3NTdGF0dXMgPSB7XG5cdFx0Ly8gZmlsZSBwcm90b2NvbCBhbHdheXMgeWllbGRzIHN0YXR1cyBjb2RlIDAsIGFzc3VtZSAyMDBcblx0XHQwOiAyMDAsXG5cdFx0Ly8gU3VwcG9ydDogSUU5XG5cdFx0Ly8gIzE0NTA6IHNvbWV0aW1lcyBJRSByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XG5cdFx0MTIyMzogMjA0XG5cdH0sXG5cdHhoclN1cHBvcnRlZCA9IGpRdWVyeS5hamF4U2V0dGluZ3MueGhyKCk7XG5cbi8vIFN1cHBvcnQ6IElFOVxuLy8gT3BlbiByZXF1ZXN0cyBtdXN0IGJlIG1hbnVhbGx5IGFib3J0ZWQgb24gdW5sb2FkICgjNTI4MClcbi8vIFNlZSBodHRwczovL3N1cHBvcnQubWljcm9zb2Z0LmNvbS9rYi8yODU2NzQ2IGZvciBtb3JlIGluZm9cbmlmICggd2luZG93LmF0dGFjaEV2ZW50ICkge1xuXHR3aW5kb3cuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0Zm9yICggdmFyIGtleSBpbiB4aHJDYWxsYmFja3MgKSB7XG5cdFx0XHR4aHJDYWxsYmFja3NbIGtleSBdKCk7XG5cdFx0fVxuXHR9KTtcbn1cblxuc3VwcG9ydC5jb3JzID0gISF4aHJTdXBwb3J0ZWQgJiYgKCBcIndpdGhDcmVkZW50aWFsc1wiIGluIHhoclN1cHBvcnRlZCApO1xuc3VwcG9ydC5hamF4ID0geGhyU3VwcG9ydGVkID0gISF4aHJTdXBwb3J0ZWQ7XG5cbmpRdWVyeS5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHR2YXIgY2FsbGJhY2s7XG5cblx0Ly8gQ3Jvc3MgZG9tYWluIG9ubHkgYWxsb3dlZCBpZiBzdXBwb3J0ZWQgdGhyb3VnaCBYTUxIdHRwUmVxdWVzdFxuXHRpZiAoIHN1cHBvcnQuY29ycyB8fCB4aHJTdXBwb3J0ZWQgJiYgIW9wdGlvbnMuY3Jvc3NEb21haW4gKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbmQ6IGZ1bmN0aW9uKCBoZWFkZXJzLCBjb21wbGV0ZSApIHtcblx0XHRcdFx0dmFyIGksXG5cdFx0XHRcdFx0eGhyID0gb3B0aW9ucy54aHIoKSxcblx0XHRcdFx0XHRpZCA9ICsreGhySWQ7XG5cblx0XHRcdFx0eGhyLm9wZW4oIG9wdGlvbnMudHlwZSwgb3B0aW9ucy51cmwsIG9wdGlvbnMuYXN5bmMsIG9wdGlvbnMudXNlcm5hbWUsIG9wdGlvbnMucGFzc3dvcmQgKTtcblxuXHRcdFx0XHQvLyBBcHBseSBjdXN0b20gZmllbGRzIGlmIHByb3ZpZGVkXG5cdFx0XHRcdGlmICggb3B0aW9ucy54aHJGaWVsZHMgKSB7XG5cdFx0XHRcdFx0Zm9yICggaSBpbiBvcHRpb25zLnhockZpZWxkcyApIHtcblx0XHRcdFx0XHRcdHhoclsgaSBdID0gb3B0aW9ucy54aHJGaWVsZHNbIGkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPdmVycmlkZSBtaW1lIHR5cGUgaWYgbmVlZGVkXG5cdFx0XHRcdGlmICggb3B0aW9ucy5taW1lVHlwZSAmJiB4aHIub3ZlcnJpZGVNaW1lVHlwZSApIHtcblx0XHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZSggb3B0aW9ucy5taW1lVHlwZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gWC1SZXF1ZXN0ZWQtV2l0aCBoZWFkZXJcblx0XHRcdFx0Ly8gRm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cywgc2VlaW5nIGFzIGNvbmRpdGlvbnMgZm9yIGEgcHJlZmxpZ2h0IGFyZVxuXHRcdFx0XHQvLyBha2luIHRvIGEgamlnc2F3IHB1enpsZSwgd2Ugc2ltcGx5IG5ldmVyIHNldCBpdCB0byBiZSBzdXJlLlxuXHRcdFx0XHQvLyAoaXQgY2FuIGFsd2F5cyBiZSBzZXQgb24gYSBwZXItcmVxdWVzdCBiYXNpcyBvciBldmVuIHVzaW5nIGFqYXhTZXR1cClcblx0XHRcdFx0Ly8gRm9yIHNhbWUtZG9tYWluIHJlcXVlc3RzLCB3b24ndCBjaGFuZ2UgaGVhZGVyIGlmIGFscmVhZHkgcHJvdmlkZWQuXG5cdFx0XHRcdGlmICggIW9wdGlvbnMuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdICkge1xuXHRcdFx0XHRcdGhlYWRlcnNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdID0gXCJYTUxIdHRwUmVxdWVzdFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGhlYWRlcnNcblx0XHRcdFx0Zm9yICggaSBpbiBoZWFkZXJzICkge1xuXHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBoZWFkZXJzWyBpIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHhockNhbGxiYWNrc1sgaWQgXTtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSB4aHIub25sb2FkID0geGhyLm9uZXJyb3IgPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdGlmICggdHlwZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0XHRcdFx0XHRcdHhoci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcImVycm9yXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBmaWxlOiBwcm90b2NvbCBhbHdheXMgeWllbGRzIHN0YXR1cyAwOyBzZWUgIzg2MDUsICMxNDIwN1xuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXNUZXh0XG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZShcblx0XHRcdFx0XHRcdFx0XHRcdHhoclN1Y2Nlc3NTdGF0dXNbIHhoci5zdGF0dXMgXSB8fCB4aHIuc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1c1RleHQsXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRTlcblx0XHRcdFx0XHRcdFx0XHRcdC8vIEFjY2Vzc2luZyBiaW5hcnktZGF0YSByZXNwb25zZVRleHQgdGhyb3dzIGFuIGV4Y2VwdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gKCMxMTQyNilcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiB4aHIucmVzcG9uc2VUZXh0ID09PSBcInN0cmluZ1wiID8ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0ZXh0OiB4aHIucmVzcG9uc2VUZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHR9IDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gTGlzdGVuIHRvIGV2ZW50c1xuXHRcdFx0XHR4aHIub25sb2FkID0gY2FsbGJhY2soKTtcblx0XHRcdFx0eGhyLm9uZXJyb3IgPSBjYWxsYmFjayhcImVycm9yXCIpO1xuXG5cdFx0XHRcdC8vIENyZWF0ZSB0aGUgYWJvcnQgY2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2sgPSB4aHJDYWxsYmFja3NbIGlkIF0gPSBjYWxsYmFjayhcImFib3J0XCIpO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gRG8gc2VuZCB0aGUgcmVxdWVzdCAodGhpcyBtYXkgcmFpc2UgYW4gZXhjZXB0aW9uKVxuXHRcdFx0XHRcdHhoci5zZW5kKCBvcHRpb25zLmhhc0NvbnRlbnQgJiYgb3B0aW9ucy5kYXRhIHx8IG51bGwgKTtcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdFx0Ly8gIzE0NjgzOiBPbmx5IHJldGhyb3cgaWYgdGhpcyBoYXNuJ3QgYmVlbiBub3RpZmllZCBhcyBhbiBlcnJvciB5ZXRcblx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdGFib3J0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSk7XG5cblxuXG5cbi8vIEluc3RhbGwgc2NyaXB0IGRhdGFUeXBlXG5qUXVlcnkuYWpheFNldHVwKHtcblx0YWNjZXB0czoge1xuXHRcdHNjcmlwdDogXCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFwiXG5cdH0sXG5cdGNvbnRlbnRzOiB7XG5cdFx0c2NyaXB0OiAvKD86amF2YXxlY21hKXNjcmlwdC9cblx0fSxcblx0Y29udmVydGVyczoge1xuXHRcdFwidGV4dCBzY3JpcHRcIjogZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHRqUXVlcnkuZ2xvYmFsRXZhbCggdGV4dCApO1xuXHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0fVxuXHR9XG59KTtcblxuLy8gSGFuZGxlIGNhY2hlJ3Mgc3BlY2lhbCBjYXNlIGFuZCBjcm9zc0RvbWFpblxualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKCBzICkge1xuXHRpZiAoIHMuY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRzLmNhY2hlID0gZmFsc2U7XG5cdH1cblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHMudHlwZSA9IFwiR0VUXCI7XG5cdH1cbn0pO1xuXG4vLyBCaW5kIHNjcmlwdCB0YWcgaGFjayB0cmFuc3BvcnRcbmpRdWVyeS5hamF4VHJhbnNwb3J0KCBcInNjcmlwdFwiLCBmdW5jdGlvbiggcyApIHtcblx0Ly8gVGhpcyB0cmFuc3BvcnQgb25seSBkZWFscyB3aXRoIGNyb3NzIGRvbWFpbiByZXF1ZXN0c1xuXHRpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG5cdFx0dmFyIHNjcmlwdCwgY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbmQ6IGZ1bmN0aW9uKCBfLCBjb21wbGV0ZSApIHtcblx0XHRcdFx0c2NyaXB0ID0galF1ZXJ5KFwiPHNjcmlwdD5cIikucHJvcCh7XG5cdFx0XHRcdFx0YXN5bmM6IHRydWUsXG5cdFx0XHRcdFx0Y2hhcnNldDogcy5zY3JpcHRDaGFyc2V0LFxuXHRcdFx0XHRcdHNyYzogcy51cmxcblx0XHRcdFx0fSkub24oXG5cdFx0XHRcdFx0XCJsb2FkIGVycm9yXCIsXG5cdFx0XHRcdFx0Y2FsbGJhY2sgPSBmdW5jdGlvbiggZXZ0ICkge1xuXHRcdFx0XHRcdFx0c2NyaXB0LnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBudWxsO1xuXHRcdFx0XHRcdFx0aWYgKCBldnQgKSB7XG5cdFx0XHRcdFx0XHRcdGNvbXBsZXRlKCBldnQudHlwZSA9PT0gXCJlcnJvclwiID8gNDA0IDogMjAwLCBldnQudHlwZSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCggc2NyaXB0WyAwIF0gKTtcblx0XHRcdH0sXG5cdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pO1xuXG5cblxuXG52YXIgb2xkQ2FsbGJhY2tzID0gW10sXG5cdHJqc29ucCA9IC8oPSlcXD8oPz0mfCQpfFxcP1xcPy87XG5cbi8vIERlZmF1bHQganNvbnAgc2V0dGluZ3NcbmpRdWVyeS5hamF4U2V0dXAoe1xuXHRqc29ucDogXCJjYWxsYmFja1wiLFxuXHRqc29ucENhbGxiYWNrOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY2FsbGJhY2sgPSBvbGRDYWxsYmFja3MucG9wKCkgfHwgKCBqUXVlcnkuZXhwYW5kbyArIFwiX1wiICsgKCBub25jZSsrICkgKTtcblx0XHR0aGlzWyBjYWxsYmFjayBdID0gdHJ1ZTtcblx0XHRyZXR1cm4gY2FsbGJhY2s7XG5cdH1cbn0pO1xuXG4vLyBEZXRlY3QsIG5vcm1hbGl6ZSBvcHRpb25zIGFuZCBpbnN0YWxsIGNhbGxiYWNrcyBmb3IganNvbnAgcmVxdWVzdHNcbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBcImpzb24ganNvbnBcIiwgZnVuY3Rpb24oIHMsIG9yaWdpbmFsU2V0dGluZ3MsIGpxWEhSICkge1xuXG5cdHZhciBjYWxsYmFja05hbWUsIG92ZXJ3cml0dGVuLCByZXNwb25zZUNvbnRhaW5lcixcblx0XHRqc29uUHJvcCA9IHMuanNvbnAgIT09IGZhbHNlICYmICggcmpzb25wLnRlc3QoIHMudXJsICkgP1xuXHRcdFx0XCJ1cmxcIiA6XG5cdFx0XHR0eXBlb2Ygcy5kYXRhID09PSBcInN0cmluZ1wiICYmICEoIHMuY29udGVudFR5cGUgfHwgXCJcIiApLmluZGV4T2YoXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIikgJiYgcmpzb25wLnRlc3QoIHMuZGF0YSApICYmIFwiZGF0YVwiXG5cdFx0KTtcblxuXHQvLyBIYW5kbGUgaWZmIHRoZSBleHBlY3RlZCBkYXRhIHR5cGUgaXMgXCJqc29ucFwiIG9yIHdlIGhhdmUgYSBwYXJhbWV0ZXIgdG8gc2V0XG5cdGlmICgganNvblByb3AgfHwgcy5kYXRhVHlwZXNbIDAgXSA9PT0gXCJqc29ucFwiICkge1xuXG5cdFx0Ly8gR2V0IGNhbGxiYWNrIG5hbWUsIHJlbWVtYmVyaW5nIHByZWV4aXN0aW5nIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBpdFxuXHRcdGNhbGxiYWNrTmFtZSA9IHMuanNvbnBDYWxsYmFjayA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBzLmpzb25wQ2FsbGJhY2sgKSA/XG5cdFx0XHRzLmpzb25wQ2FsbGJhY2soKSA6XG5cdFx0XHRzLmpzb25wQ2FsbGJhY2s7XG5cblx0XHQvLyBJbnNlcnQgY2FsbGJhY2sgaW50byB1cmwgb3IgZm9ybSBkYXRhXG5cdFx0aWYgKCBqc29uUHJvcCApIHtcblx0XHRcdHNbIGpzb25Qcm9wIF0gPSBzWyBqc29uUHJvcCBdLnJlcGxhY2UoIHJqc29ucCwgXCIkMVwiICsgY2FsbGJhY2tOYW1lICk7XG5cdFx0fSBlbHNlIGlmICggcy5qc29ucCAhPT0gZmFsc2UgKSB7XG5cdFx0XHRzLnVybCArPSAoIHJxdWVyeS50ZXN0KCBzLnVybCApID8gXCImXCIgOiBcIj9cIiApICsgcy5qc29ucCArIFwiPVwiICsgY2FsbGJhY2tOYW1lO1xuXHRcdH1cblxuXHRcdC8vIFVzZSBkYXRhIGNvbnZlcnRlciB0byByZXRyaWV2ZSBqc29uIGFmdGVyIHNjcmlwdCBleGVjdXRpb25cblx0XHRzLmNvbnZlcnRlcnNbXCJzY3JpcHQganNvblwiXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhcmVzcG9uc2VDb250YWluZXIgKSB7XG5cdFx0XHRcdGpRdWVyeS5lcnJvciggY2FsbGJhY2tOYW1lICsgXCIgd2FzIG5vdCBjYWxsZWRcIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlQ29udGFpbmVyWyAwIF07XG5cdFx0fTtcblxuXHRcdC8vIGZvcmNlIGpzb24gZGF0YVR5cGVcblx0XHRzLmRhdGFUeXBlc1sgMCBdID0gXCJqc29uXCI7XG5cblx0XHQvLyBJbnN0YWxsIGNhbGxiYWNrXG5cdFx0b3ZlcndyaXR0ZW4gPSB3aW5kb3dbIGNhbGxiYWNrTmFtZSBdO1xuXHRcdHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlc3BvbnNlQ29udGFpbmVyID0gYXJndW1lbnRzO1xuXHRcdH07XG5cblx0XHQvLyBDbGVhbi11cCBmdW5jdGlvbiAoZmlyZXMgYWZ0ZXIgY29udmVydGVycylcblx0XHRqcVhIUi5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBSZXN0b3JlIHByZWV4aXN0aW5nIHZhbHVlXG5cdFx0XHR3aW5kb3dbIGNhbGxiYWNrTmFtZSBdID0gb3ZlcndyaXR0ZW47XG5cblx0XHRcdC8vIFNhdmUgYmFjayBhcyBmcmVlXG5cdFx0XHRpZiAoIHNbIGNhbGxiYWNrTmFtZSBdICkge1xuXHRcdFx0XHQvLyBtYWtlIHN1cmUgdGhhdCByZS11c2luZyB0aGUgb3B0aW9ucyBkb2Vzbid0IHNjcmV3IHRoaW5ncyBhcm91bmRcblx0XHRcdFx0cy5qc29ucENhbGxiYWNrID0gb3JpZ2luYWxTZXR0aW5ncy5qc29ucENhbGxiYWNrO1xuXG5cdFx0XHRcdC8vIHNhdmUgdGhlIGNhbGxiYWNrIG5hbWUgZm9yIGZ1dHVyZSB1c2Vcblx0XHRcdFx0b2xkQ2FsbGJhY2tzLnB1c2goIGNhbGxiYWNrTmFtZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYWxsIGlmIGl0IHdhcyBhIGZ1bmN0aW9uIGFuZCB3ZSBoYXZlIGEgcmVzcG9uc2Vcblx0XHRcdGlmICggcmVzcG9uc2VDb250YWluZXIgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIG92ZXJ3cml0dGVuICkgKSB7XG5cdFx0XHRcdG92ZXJ3cml0dGVuKCByZXNwb25zZUNvbnRhaW5lclsgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3BvbnNlQ29udGFpbmVyID0gb3ZlcndyaXR0ZW4gPSB1bmRlZmluZWQ7XG5cdFx0fSk7XG5cblx0XHQvLyBEZWxlZ2F0ZSB0byBzY3JpcHRcblx0XHRyZXR1cm4gXCJzY3JpcHRcIjtcblx0fVxufSk7XG5cblxuXG5cbi8vIGRhdGE6IHN0cmluZyBvZiBodG1sXG4vLyBjb250ZXh0IChvcHRpb25hbCk6IElmIHNwZWNpZmllZCwgdGhlIGZyYWdtZW50IHdpbGwgYmUgY3JlYXRlZCBpbiB0aGlzIGNvbnRleHQsIGRlZmF1bHRzIHRvIGRvY3VtZW50XG4vLyBrZWVwU2NyaXB0cyAob3B0aW9uYWwpOiBJZiB0cnVlLCB3aWxsIGluY2x1ZGUgc2NyaXB0cyBwYXNzZWQgaW4gdGhlIGh0bWwgc3RyaW5nXG5qUXVlcnkucGFyc2VIVE1MID0gZnVuY3Rpb24oIGRhdGEsIGNvbnRleHQsIGtlZXBTY3JpcHRzICkge1xuXHRpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGtlZXBTY3JpcHRzID0gY29udGV4dDtcblx0XHRjb250ZXh0ID0gZmFsc2U7XG5cdH1cblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0dmFyIHBhcnNlZCA9IHJzaW5nbGVUYWcuZXhlYyggZGF0YSApLFxuXHRcdHNjcmlwdHMgPSAha2VlcFNjcmlwdHMgJiYgW107XG5cblx0Ly8gU2luZ2xlIHRhZ1xuXHRpZiAoIHBhcnNlZCApIHtcblx0XHRyZXR1cm4gWyBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIHBhcnNlZFsxXSApIF07XG5cdH1cblxuXHRwYXJzZWQgPSBqUXVlcnkuYnVpbGRGcmFnbWVudCggWyBkYXRhIF0sIGNvbnRleHQsIHNjcmlwdHMgKTtcblxuXHRpZiAoIHNjcmlwdHMgJiYgc2NyaXB0cy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5KCBzY3JpcHRzICkucmVtb3ZlKCk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgcGFyc2VkLmNoaWxkTm9kZXMgKTtcbn07XG5cblxuLy8gS2VlcCBhIGNvcHkgb2YgdGhlIG9sZCBsb2FkIG1ldGhvZFxudmFyIF9sb2FkID0galF1ZXJ5LmZuLmxvYWQ7XG5cbi8qKlxuICogTG9hZCBhIHVybCBpbnRvIGEgcGFnZVxuICovXG5qUXVlcnkuZm4ubG9hZCA9IGZ1bmN0aW9uKCB1cmwsIHBhcmFtcywgY2FsbGJhY2sgKSB7XG5cdGlmICggdHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIiAmJiBfbG9hZCApIHtcblx0XHRyZXR1cm4gX2xvYWQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHR9XG5cblx0dmFyIHNlbGVjdG9yLCB0eXBlLCByZXNwb25zZSxcblx0XHRzZWxmID0gdGhpcyxcblx0XHRvZmYgPSB1cmwuaW5kZXhPZihcIiBcIik7XG5cblx0aWYgKCBvZmYgPj0gMCApIHtcblx0XHRzZWxlY3RvciA9IGpRdWVyeS50cmltKCB1cmwuc2xpY2UoIG9mZiApICk7XG5cdFx0dXJsID0gdXJsLnNsaWNlKCAwLCBvZmYgKTtcblx0fVxuXG5cdC8vIElmIGl0J3MgYSBmdW5jdGlvblxuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBwYXJhbXMgKSApIHtcblxuXHRcdC8vIFdlIGFzc3VtZSB0aGF0IGl0J3MgdGhlIGNhbGxiYWNrXG5cdFx0Y2FsbGJhY2sgPSBwYXJhbXM7XG5cdFx0cGFyYW1zID0gdW5kZWZpbmVkO1xuXG5cdC8vIE90aGVyd2lzZSwgYnVpbGQgYSBwYXJhbSBzdHJpbmdcblx0fSBlbHNlIGlmICggcGFyYW1zICYmIHR5cGVvZiBwYXJhbXMgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0dHlwZSA9IFwiUE9TVFwiO1xuXHR9XG5cblx0Ly8gSWYgd2UgaGF2ZSBlbGVtZW50cyB0byBtb2RpZnksIG1ha2UgdGhlIHJlcXVlc3Rcblx0aWYgKCBzZWxmLmxlbmd0aCA+IDAgKSB7XG5cdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0dXJsOiB1cmwsXG5cblx0XHRcdC8vIGlmIFwidHlwZVwiIHZhcmlhYmxlIGlzIHVuZGVmaW5lZCwgdGhlbiBcIkdFVFwiIG1ldGhvZCB3aWxsIGJlIHVzZWRcblx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRkYXRhVHlwZTogXCJodG1sXCIsXG5cdFx0XHRkYXRhOiBwYXJhbXNcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCByZXNwb25zZVRleHQgKSB7XG5cblx0XHRcdC8vIFNhdmUgcmVzcG9uc2UgZm9yIHVzZSBpbiBjb21wbGV0ZSBjYWxsYmFja1xuXHRcdFx0cmVzcG9uc2UgPSBhcmd1bWVudHM7XG5cblx0XHRcdHNlbGYuaHRtbCggc2VsZWN0b3IgP1xuXG5cdFx0XHRcdC8vIElmIGEgc2VsZWN0b3Igd2FzIHNwZWNpZmllZCwgbG9jYXRlIHRoZSByaWdodCBlbGVtZW50cyBpbiBhIGR1bW15IGRpdlxuXHRcdFx0XHQvLyBFeGNsdWRlIHNjcmlwdHMgdG8gYXZvaWQgSUUgJ1Blcm1pc3Npb24gRGVuaWVkJyBlcnJvcnNcblx0XHRcdFx0alF1ZXJ5KFwiPGRpdj5cIikuYXBwZW5kKCBqUXVlcnkucGFyc2VIVE1MKCByZXNwb25zZVRleHQgKSApLmZpbmQoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSB1c2UgdGhlIGZ1bGwgcmVzdWx0XG5cdFx0XHRcdHJlc3BvbnNlVGV4dCApO1xuXG5cdFx0fSkuY29tcGxldGUoIGNhbGxiYWNrICYmIGZ1bmN0aW9uKCBqcVhIUiwgc3RhdHVzICkge1xuXHRcdFx0c2VsZi5lYWNoKCBjYWxsYmFjaywgcmVzcG9uc2UgfHwgWyBqcVhIUi5yZXNwb25zZVRleHQsIHN0YXR1cywganFYSFIgXSApO1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG4vLyBBdHRhY2ggYSBidW5jaCBvZiBmdW5jdGlvbnMgZm9yIGhhbmRsaW5nIGNvbW1vbiBBSkFYIGV2ZW50c1xualF1ZXJ5LmVhY2goIFsgXCJhamF4U3RhcnRcIiwgXCJhamF4U3RvcFwiLCBcImFqYXhDb21wbGV0ZVwiLCBcImFqYXhFcnJvclwiLCBcImFqYXhTdWNjZXNzXCIsIFwiYWpheFNlbmRcIiBdLCBmdW5jdGlvbiggaSwgdHlwZSApIHtcblx0alF1ZXJ5LmZuWyB0eXBlIF0gPSBmdW5jdGlvbiggZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGUsIGZuICk7XG5cdH07XG59KTtcblxuXG5cblxualF1ZXJ5LmV4cHIuZmlsdGVycy5hbmltYXRlZCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmdyZXAoalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24oIGZuICkge1xuXHRcdHJldHVybiBlbGVtID09PSBmbi5lbGVtO1xuXHR9KS5sZW5ndGg7XG59O1xuXG5cblxuXG52YXIgZG9jRWxlbSA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbi8qKlxuICogR2V0cyBhIHdpbmRvdyBmcm9tIGFuIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93KCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmlzV2luZG93KCBlbGVtICkgPyBlbGVtIDogZWxlbS5ub2RlVHlwZSA9PT0gOSAmJiBlbGVtLmRlZmF1bHRWaWV3O1xufVxuXG5qUXVlcnkub2Zmc2V0ID0ge1xuXHRzZXRPZmZzZXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBpICkge1xuXHRcdHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXG5cdFx0XHRwb3NpdGlvbiA9IGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApLFxuXHRcdFx0Y3VyRWxlbSA9IGpRdWVyeSggZWxlbSApLFxuXHRcdFx0cHJvcHMgPSB7fTtcblxuXHRcdC8vIFNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cblx0XHRpZiAoIHBvc2l0aW9uID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0ZWxlbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0XHR9XG5cblx0XHRjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xuXHRcdGN1ckNTU1RvcCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwidG9wXCIgKTtcblx0XHRjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJsZWZ0XCIgKTtcblx0XHRjYWxjdWxhdGVQb3NpdGlvbiA9ICggcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiICkgJiZcblx0XHRcdCggY3VyQ1NTVG9wICsgY3VyQ1NTTGVmdCApLmluZGV4T2YoXCJhdXRvXCIpID4gLTE7XG5cblx0XHQvLyBOZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlclxuXHRcdC8vIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxuXHRcdGlmICggY2FsY3VsYXRlUG9zaXRpb24gKSB7XG5cdFx0XHRjdXJQb3NpdGlvbiA9IGN1ckVsZW0ucG9zaXRpb24oKTtcblx0XHRcdGN1clRvcCA9IGN1clBvc2l0aW9uLnRvcDtcblx0XHRcdGN1ckxlZnQgPSBjdXJQb3NpdGlvbi5sZWZ0O1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1clRvcCA9IHBhcnNlRmxvYXQoIGN1ckNTU1RvcCApIHx8IDA7XG5cdFx0XHRjdXJMZWZ0ID0gcGFyc2VGbG9hdCggY3VyQ1NTTGVmdCApIHx8IDA7XG5cdFx0fVxuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0aW9ucyApICkge1xuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMuY2FsbCggZWxlbSwgaSwgY3VyT2Zmc2V0ICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHRpb25zLnRvcCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMudG9wID0gKCBvcHRpb25zLnRvcCAtIGN1ck9mZnNldC50b3AgKSArIGN1clRvcDtcblx0XHR9XG5cdFx0aWYgKCBvcHRpb25zLmxlZnQgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLmxlZnQgPSAoIG9wdGlvbnMubGVmdCAtIGN1ck9mZnNldC5sZWZ0ICkgKyBjdXJMZWZ0O1xuXHRcdH1cblxuXHRcdGlmICggXCJ1c2luZ1wiIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRvcHRpb25zLnVzaW5nLmNhbGwoIGVsZW0sIHByb3BzICk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyRWxlbS5jc3MoIHByb3BzICk7XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0b2Zmc2V0OiBmdW5jdGlvbiggb3B0aW9ucyApIHtcblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gb3B0aW9ucyA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0dGhpcyA6XG5cdFx0XHRcdHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0XHRqUXVlcnkub2Zmc2V0LnNldE9mZnNldCggdGhpcywgb3B0aW9ucywgaSApO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cblx0XHR2YXIgZG9jRWxlbSwgd2luLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGJveCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH0sXG5cdFx0XHRkb2MgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcblxuXHRcdGlmICggIWRvYyApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdC8vIE1ha2Ugc3VyZSBpdCdzIG5vdCBhIGRpc2Nvbm5lY3RlZCBET00gbm9kZVxuXHRcdGlmICggIWpRdWVyeS5jb250YWlucyggZG9jRWxlbSwgZWxlbSApICkge1xuXHRcdFx0cmV0dXJuIGJveDtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBCbGFja0JlcnJ5IDUsIGlPUyAzIChvcmlnaW5hbCBpUGhvbmUpXG5cdFx0Ly8gSWYgd2UgZG9uJ3QgaGF2ZSBnQkNSLCBqdXN0IHVzZSAwLDAgcmF0aGVyIHRoYW4gZXJyb3Jcblx0XHRpZiAoIHR5cGVvZiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCAhPT0gc3RydW5kZWZpbmVkICkge1xuXHRcdFx0Ym94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHR9XG5cdFx0d2luID0gZ2V0V2luZG93KCBkb2MgKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBib3gudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXG5cdFx0XHRsZWZ0OiBib3gubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsZW0uY2xpZW50TGVmdFxuXHRcdH07XG5cdH0sXG5cblx0cG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggIXRoaXNbIDAgXSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgb2Zmc2V0UGFyZW50LCBvZmZzZXQsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0cGFyZW50T2Zmc2V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblxuXHRcdC8vIEZpeGVkIGVsZW1lbnRzIGFyZSBvZmZzZXQgZnJvbSB3aW5kb3cgKHBhcmVudE9mZnNldCA9IHt0b3A6MCwgbGVmdDogMH0sIGJlY2F1c2UgaXQgaXMgaXRzIG9ubHkgb2Zmc2V0IHBhcmVudFxuXHRcdGlmICggalF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICkgPT09IFwiZml4ZWRcIiApIHtcblx0XHRcdC8vIEFzc3VtZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgdGhlcmUgd2hlbiBjb21wdXRlZCBwb3NpdGlvbiBpcyBmaXhlZFxuXHRcdFx0b2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuXHRcdFx0b2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKTtcblxuXHRcdFx0Ly8gR2V0IGNvcnJlY3Qgb2Zmc2V0c1xuXHRcdFx0b2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcblx0XHRcdGlmICggIWpRdWVyeS5ub2RlTmFtZSggb2Zmc2V0UGFyZW50WyAwIF0sIFwiaHRtbFwiICkgKSB7XG5cdFx0XHRcdHBhcmVudE9mZnNldCA9IG9mZnNldFBhcmVudC5vZmZzZXQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG9mZnNldFBhcmVudCBib3JkZXJzXG5cdFx0XHRwYXJlbnRPZmZzZXQudG9wICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlclRvcFdpZHRoXCIsIHRydWUgKTtcblx0XHRcdHBhcmVudE9mZnNldC5sZWZ0ICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlckxlZnRXaWR0aFwiLCB0cnVlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU3VidHJhY3QgcGFyZW50IG9mZnNldHMgYW5kIGVsZW1lbnQgbWFyZ2luc1xuXHRcdHJldHVybiB7XG5cdFx0XHR0b3A6IG9mZnNldC50b3AgLSBwYXJlbnRPZmZzZXQudG9wIC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5Ub3BcIiwgdHJ1ZSApLFxuXHRcdFx0bGVmdDogb2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luTGVmdFwiLCB0cnVlIClcblx0XHR9O1xuXHR9LFxuXG5cdG9mZnNldFBhcmVudDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50IHx8IGRvY0VsZW07XG5cblx0XHRcdHdoaWxlICggb2Zmc2V0UGFyZW50ICYmICggIWpRdWVyeS5ub2RlTmFtZSggb2Zmc2V0UGFyZW50LCBcImh0bWxcIiApICYmIGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJwb3NpdGlvblwiICkgPT09IFwic3RhdGljXCIgKSApIHtcblx0XHRcdFx0b2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9mZnNldFBhcmVudCB8fCBkb2NFbGVtO1xuXHRcdH0pO1xuXHR9XG59KTtcblxuLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBzY3JvbGxMZWZ0OiBcInBhZ2VYT2Zmc2V0XCIsIHNjcm9sbFRvcDogXCJwYWdlWU9mZnNldFwiIH0sIGZ1bmN0aW9uKCBtZXRob2QsIHByb3AgKSB7XG5cdHZhciB0b3AgPSBcInBhZ2VZT2Zmc2V0XCIgPT09IHByb3A7XG5cblx0alF1ZXJ5LmZuWyBtZXRob2QgXSA9IGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG1ldGhvZCwgdmFsICkge1xuXHRcdFx0dmFyIHdpbiA9IGdldFdpbmRvdyggZWxlbSApO1xuXG5cdFx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gd2luID8gd2luWyBwcm9wIF0gOiBlbGVtWyBtZXRob2QgXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB3aW4gKSB7XG5cdFx0XHRcdHdpbi5zY3JvbGxUbyhcblx0XHRcdFx0XHQhdG9wID8gdmFsIDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuXHRcdFx0XHRcdHRvcCA/IHZhbCA6IHdpbmRvdy5wYWdlWU9mZnNldFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtWyBtZXRob2QgXSA9IHZhbDtcblx0XHRcdH1cblx0XHR9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCwgbnVsbCApO1xuXHR9O1xufSk7XG5cbi8vIFN1cHBvcnQ6IFNhZmFyaTw3KywgQ2hyb21lPDM3K1xuLy8gQWRkIHRoZSB0b3AvbGVmdCBjc3NIb29rcyB1c2luZyBqUXVlcnkuZm4ucG9zaXRpb25cbi8vIFdlYmtpdCBidWc6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTA4NFxuLy8gQmxpbmsgYnVnOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MjgwXG4vLyBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgcGVyY2VudCB3aGVuIHNwZWNpZmllZCBmb3IgdG9wL2xlZnQvYm90dG9tL3JpZ2h0O1xuLy8gcmF0aGVyIHRoYW4gbWFrZSB0aGUgY3NzIG1vZHVsZSBkZXBlbmQgb24gdGhlIG9mZnNldCBtb2R1bGUsIGp1c3QgY2hlY2sgZm9yIGl0IGhlcmVcbmpRdWVyeS5lYWNoKCBbIFwidG9wXCIsIFwibGVmdFwiIF0sIGZ1bmN0aW9uKCBpLCBwcm9wICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIHByb3AgXSA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5waXhlbFBvc2l0aW9uLFxuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGNvbXB1dGVkID0gY3VyQ1NTKCBlbGVtLCBwcm9wICk7XG5cdFx0XHRcdC8vIElmIGN1ckNTUyByZXR1cm5zIHBlcmNlbnRhZ2UsIGZhbGxiYWNrIHRvIG9mZnNldFxuXHRcdFx0XHRyZXR1cm4gcm51bW5vbnB4LnRlc3QoIGNvbXB1dGVkICkgP1xuXHRcdFx0XHRcdGpRdWVyeSggZWxlbSApLnBvc2l0aW9uKClbIHByb3AgXSArIFwicHhcIiA6XG5cdFx0XHRcdFx0Y29tcHV0ZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufSk7XG5cblxuLy8gQ3JlYXRlIGlubmVySGVpZ2h0LCBpbm5lcldpZHRoLCBoZWlnaHQsIHdpZHRoLCBvdXRlckhlaWdodCBhbmQgb3V0ZXJXaWR0aCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBIZWlnaHQ6IFwiaGVpZ2h0XCIsIFdpZHRoOiBcIndpZHRoXCIgfSwgZnVuY3Rpb24oIG5hbWUsIHR5cGUgKSB7XG5cdGpRdWVyeS5lYWNoKCB7IHBhZGRpbmc6IFwiaW5uZXJcIiArIG5hbWUsIGNvbnRlbnQ6IHR5cGUsIFwiXCI6IFwib3V0ZXJcIiArIG5hbWUgfSwgZnVuY3Rpb24oIGRlZmF1bHRFeHRyYSwgZnVuY05hbWUgKSB7XG5cdFx0Ly8gTWFyZ2luIGlzIG9ubHkgZm9yIG91dGVySGVpZ2h0LCBvdXRlcldpZHRoXG5cdFx0alF1ZXJ5LmZuWyBmdW5jTmFtZSBdID0gZnVuY3Rpb24oIG1hcmdpbiwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxuXHRcdFx0XHRleHRyYSA9IGRlZmF1bHRFeHRyYSB8fCAoIG1hcmdpbiA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdHJ1ZSA/IFwibWFyZ2luXCIgOiBcImJvcmRlclwiICk7XG5cblx0XHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIGRvYztcblxuXHRcdFx0XHRpZiAoIGpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXHRcdFx0XHRcdC8vIEFzIG9mIDUvOC8yMDEyIHRoaXMgd2lsbCB5aWVsZCBpbmNvcnJlY3QgcmVzdWx0cyBmb3IgTW9iaWxlIFNhZmFyaSwgYnV0IHRoZXJlXG5cdFx0XHRcdFx0Ly8gaXNuJ3QgYSB3aG9sZSBsb3Qgd2UgY2FuIGRvLiBTZWUgcHVsbCByZXF1ZXN0IGF0IHRoaXMgVVJMIGZvciBkaXNjdXNzaW9uOlxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNzY0XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50WyBcImNsaWVudFwiICsgbmFtZSBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gR2V0IGRvY3VtZW50IHdpZHRoIG9yIGhlaWdodFxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0ZG9jID0gZWxlbS5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRcdFx0XHQvLyBFaXRoZXIgc2Nyb2xsW1dpZHRoL0hlaWdodF0gb3Igb2Zmc2V0W1dpZHRoL0hlaWdodF0gb3IgY2xpZW50W1dpZHRoL0hlaWdodF0sXG5cdFx0XHRcdFx0Ly8gd2hpY2hldmVyIGlzIGdyZWF0ZXN0XG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KFxuXHRcdFx0XHRcdFx0ZWxlbS5ib2R5WyBcInNjcm9sbFwiICsgbmFtZSBdLCBkb2NbIFwic2Nyb2xsXCIgKyBuYW1lIF0sXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwib2Zmc2V0XCIgKyBuYW1lIF0sIGRvY1sgXCJvZmZzZXRcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGRvY1sgXCJjbGllbnRcIiArIG5hbWUgXVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdFx0Ly8gR2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudCwgcmVxdWVzdGluZyBidXQgbm90IGZvcmNpbmcgcGFyc2VGbG9hdFxuXHRcdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIHR5cGUsIGV4dHJhICkgOlxuXG5cdFx0XHRcdFx0Ly8gU2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudFxuXHRcdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgdHlwZSwgdmFsdWUsIGV4dHJhICk7XG5cdFx0XHR9LCB0eXBlLCBjaGFpbmFibGUgPyBtYXJnaW4gOiB1bmRlZmluZWQsIGNoYWluYWJsZSwgbnVsbCApO1xuXHRcdH07XG5cdH0pO1xufSk7XG5cblxuLy8gVGhlIG51bWJlciBvZiBlbGVtZW50cyBjb250YWluZWQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXRcbmpRdWVyeS5mbi5zaXplID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmxlbmd0aDtcbn07XG5cbmpRdWVyeS5mbi5hbmRTZWxmID0galF1ZXJ5LmZuLmFkZEJhY2s7XG5cblxuXG5cbi8vIFJlZ2lzdGVyIGFzIGEgbmFtZWQgQU1EIG1vZHVsZSwgc2luY2UgalF1ZXJ5IGNhbiBiZSBjb25jYXRlbmF0ZWQgd2l0aCBvdGhlclxuLy8gZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSwgYnV0IG5vdCB2aWEgYSBwcm9wZXIgY29uY2F0ZW5hdGlvbiBzY3JpcHQgdGhhdFxuLy8gdW5kZXJzdGFuZHMgYW5vbnltb3VzIEFNRCBtb2R1bGVzLiBBIG5hbWVkIEFNRCBpcyBzYWZlc3QgYW5kIG1vc3Qgcm9idXN0XG4vLyB3YXkgdG8gcmVnaXN0ZXIuIExvd2VyY2FzZSBqcXVlcnkgaXMgdXNlZCBiZWNhdXNlIEFNRCBtb2R1bGUgbmFtZXMgYXJlXG4vLyBkZXJpdmVkIGZyb20gZmlsZSBuYW1lcywgYW5kIGpRdWVyeSBpcyBub3JtYWxseSBkZWxpdmVyZWQgaW4gYSBsb3dlcmNhc2Vcbi8vIGZpbGUgbmFtZS4gRG8gdGhpcyBhZnRlciBjcmVhdGluZyB0aGUgZ2xvYmFsIHNvIHRoYXQgaWYgYW4gQU1EIG1vZHVsZSB3YW50c1xuLy8gdG8gY2FsbCBub0NvbmZsaWN0IHRvIGhpZGUgdGhpcyB2ZXJzaW9uIG9mIGpRdWVyeSwgaXQgd2lsbCB3b3JrLlxuXG4vLyBOb3RlIHRoYXQgZm9yIG1heGltdW0gcG9ydGFiaWxpdHksIGxpYnJhcmllcyB0aGF0IGFyZSBub3QgalF1ZXJ5IHNob3VsZFxuLy8gZGVjbGFyZSB0aGVtc2VsdmVzIGFzIGFub255bW91cyBtb2R1bGVzLCBhbmQgYXZvaWQgc2V0dGluZyBhIGdsb2JhbCBpZiBhblxuLy8gQU1EIGxvYWRlciBpcyBwcmVzZW50LiBqUXVlcnkgaXMgYSBzcGVjaWFsIGNhc2UuIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmJ1cmtlL3JlcXVpcmVqcy93aWtpL1VwZGF0aW5nLWV4aXN0aW5nLWxpYnJhcmllcyN3aWtpLWFub25cblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0ZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeTtcblx0fSk7XG59XG5cblxuXG5cbnZhclxuXHQvLyBNYXAgb3ZlciBqUXVlcnkgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0X2pRdWVyeSA9IHdpbmRvdy5qUXVlcnksXG5cblx0Ly8gTWFwIG92ZXIgdGhlICQgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0XyQgPSB3aW5kb3cuJDtcblxualF1ZXJ5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiggZGVlcCApIHtcblx0aWYgKCB3aW5kb3cuJCA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy4kID0gXyQ7XG5cdH1cblxuXHRpZiAoIGRlZXAgJiYgd2luZG93LmpRdWVyeSA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy5qUXVlcnkgPSBfalF1ZXJ5O1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeTtcbn07XG5cbi8vIEV4cG9zZSBqUXVlcnkgYW5kICQgaWRlbnRpZmllcnMsIGV2ZW4gaW4gQU1EXG4vLyAoIzcxMDIjY29tbWVudDoxMCwgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC81NTcpXG4vLyBhbmQgQ29tbW9uSlMgZm9yIGJyb3dzZXIgZW11bGF0b3JzICgjMTM1NjYpXG5pZiAoIHR5cGVvZiBub0dsb2JhbCA9PT0gc3RydW5kZWZpbmVkICkge1xuXHR3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnk7XG59XG5cblxuXG5cbnJldHVybiBqUXVlcnk7XG5cbn0pKTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgICAvKipcbiAgICAgKiBHRVQgY2FsbFxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdXJsIFRoZSByZXF1ZXN0IHVybFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgIFByb21pc2UgY29udGFpbmluZyB0aGUgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBnZXQodXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICQuZ2V0KHVybCwgZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmV0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCAkID0gcmVxdWlyZSgnalF1ZXJ5Jyk7XG5cbi8qKlxuKiBUaGUgbWFwIGluc3RhbmNlIGFuZCByZWxhdGVkIG1ldGhvZHNcbiogQGFjY2VzcyBwdWJsaWNcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXAge1xuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlcyB0aGUgTWFwIGluc3RhbmNlXG4gICAgICogQHJldHVybiB7Ym9vbH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tYXAgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgZ2VvanNvbiBvYmplY3QgdG8gdGhlIG1hcCBvYmplY3RcbiAgICAgKiBAcGFyYW0ge0pTT059IGdlb2pzb24gVGhlIGdlb2pzb24gb2JqZWN0IHRvIGFkZFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgICBUaGUgbWFwIG9iamVjdFxuICAgICAqL1xuICAgIGFkZEdlb2pzb24oZ2VvanNvbikge1xuICAgICAgICB0aGlzLm1hcC5kYXRhLmFkZEdlb0pzb24oZ2VvanNvbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGttbCBsYXllciB0byB0aGUgbWFwXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGttbExvYyBUaGUgbG9jYXRpb24gb2YgdGhlIEtNTCBsYXllciBmaWxlXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICBUaGUgbWFwIG9iamVjdFxuICAgICAqL1xuICAgIGFkZEttbExheWVyKGttbExvYykge1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5tYXA7XG4gICAgICAgIGxldCBhcHAgPSBhcHAgfHwge307XG4gICAgICAgIFxuICAgICAgICAvLyBnZW9YTUwgY2FsbGJhY2tcbiAgICAgICAgZnVuY3Rpb24gYWRkRXZlbnRzKCkge1xuICAgICAgICAgICAgLy8gdGhpcy5hZGRDYXRjaG1lbnRFdmVudChtYXAsIGdlb1htbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb2FkIHRoZSBjYXRjaG1lbnQgZGF0YVxuICAgICAgICBsZXQgZ2VvWG1sID0gYXBwLmdlb1hNTDMucGFyc2VyKHtcbiAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICB6b29tOiB0cnVlLFxuICAgICAgICAgICAgIHNpbmdsZUluZm9XaW5kb3c6IHRydWUsXG4gICAgICAgICAgICAgLy9tYXJrZXJPcHRpb25zOiB7b3B0aW1pemVkOiBmYWxzZX0sXG4gICAgICAgICAgICAgLy9jcmVhdGVNYXJrZXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICAgLy90aGUgZnVuY3Rpb24gY2FsbGVkIGFmdGVyIHBhcnNpbmcgdGhlIGttbCBmaWxlXG4gICAgICAgICAgICAgYWZ0ZXJQYXJzZTogYWRkRXZlbnRzLmJpbmQodGhpcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2VvWG1sLnBhcnNlKGttbExvYyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICogQWRkIGhvdmVyIGV2ZW50cyB0byBjYXRjaG1lbnQgbGF5ZXJcbiAgICAqIEBwYXJhbSBvYmplY3QgZ2VvWG1sICBUaGUgY2F0Y2htZW50IGxheWVyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgVGhlIG1hcCBvYmplY3RcbiAgICAqL1xuICAgIGFkZENhdGNobWVudEV2ZW50KG1hcCwgZ2VvWG1sKSB7XG4gICAgICAgIGxldCBnb29nbGUgPSBnb29nbGUgfHwge307XG4gICAgICAgIC8vIHRoZSBwb3B1cHNcbiAgICAgICAgdmFyIGliID0gbmV3IEluZm9CdWJibGUoe1xuICAgICAgICAgIHNoYWRvd1N0eWxlOiAwLFxuICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogNCxcbiAgICAgICAgICBhcnJvd1NpemU6IDAsXG4gICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgZGlzYWJsZUF1dG9QYW46IHRydWUsXG4gICAgICAgICAgaGlkZUNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgICAgIGFycm93UG9zaXRpb246IDUwLFxuICAgICAgICAgIGFycm93U3R5bGU6IDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYXR0YWNoZWQgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGZ1bmN0aW9uIHBvbHlnb25Nb3VzZW92ZXIocG9seSwgdGV4dCkge1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocG9seSwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIGliLnNldENvbnRlbnQodGV4dCk7XG4gICAgICAgICAgICAgICAgaWIuc2V0UG9zaXRpb24oZXZ0LmxhdExuZyk7XG4gICAgICAgICAgICAgICAgaWIuc2V0TWFwKG1hcCk7XG4gICAgICAgICAgICAgICAgaWIub3BlbigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHBvbHksICdtb3VzZW91dCcsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIGliLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnZW9YbWwuZG9jcyAmJiBnZW9YbWwuZG9jcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBpdGVyYXRlcyB0aHJvdWdoIHRoZSBjYXRjaG1lbnQgem9uZXMgYW5kIGF0dGFjaGVzIGV2ZW50IGxheWVyc1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgZ2VvWG1sLmRvY3NbMF0ucGxhY2VtYXJrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwbGFjZW1hcmsgPSBnZW9YbWwuZG9jc1swXS5wbGFjZW1hcmtzW2ldO1xuICAgICAgICAgICAgICAgIHBsYWNlbWFyay5uYW1lID0gJ1RFU1QgJyArIGk7XG4gICAgICAgICAgICAgICAgcG9seWdvbk1vdXNlb3ZlcihwbGFjZW1hcmsucG9seWdvbixwbGFjZW1hcmsubmFtZSk7XG4gICAgICAgICAgICAgICAgJCgnI21hcF90ZXh0JykuYXBwZW5kKHBsYWNlbWFyay5uYW1lICsgJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgYmFyZSBtYXAgdG8gdGhlIG1hcFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2MgVGhlIEhUTUwgI2lkIHRvIGFkZCB0aGUgbWFwIHRvXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAgICBUaGUgbWFwIG9iamVjdFxuICAgICAqL1xuICAgIHJlbmRlck1hcChsb2MpIHtcbiAgICAgICAgbGV0IGdvb2dsZSA9IGdvb2dsZSB8fCB7fTtcbiAgICAgICAgLy8gZGVmYXVsdCB0aGUgbWFwIHRvIFBoaWxseVxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobG9jKSwge1xuICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IDM5Ljk1MDAsIGxuZzogLTc1LjE2NjcgfSxcbiAgICAgICAgICB6b29tOiAxMVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgTWV0YWRhdGEge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgYXJncyA9IGFyZ3MgfHwge307XG4gICAgfVxuXG4gICAgcmVhZChzcmMpIHtcblxuICAgIH1cbn1cblxuZXhwb3J0cy5NZXRhZGF0YSA9IE1ldGFkYXRhO1xuIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IFJlbmRlcnMgS01MIG9uIHRoZSBHb29nbGUgTWFwcyBKYXZhU2NyaXB0IEFQSSBWZXJzaW9uIDNcbiAqIEBuYW1lIEdlb1hNTDNcbiAqIEBhdXRob3IgU3RlcmxpbmcgVWRlbGwsIExhcnJ5IFJvc3MsIEJyZW5kYW4gQnlyZFxuICogQHNlZSBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZ2VveG1sMy9cbiAqXG4gKiBnZW94bWwzLmpzXG4gKlxuICogUmVuZGVycyBLTUwgb24gdGhlIEdvb2dsZSBNYXBzIEphdmFTY3JpcHQgQVBJIFZlcnNpb24gM1xuICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2dlb3htbDMvXG4gKlxuICogQ29weXJpZ2h0IDIwMTAgU3RlcmxpbmcgVWRlbGwsIExhcnJ5IFJvc3NcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8qKlxuICogQSBNdWx0aUdlb21ldHJ5IG9iamVjdCB0aGF0IHdpbGwgYWxsb3cgbXVsdGlwbGUgcG9seWxpbmVzIGluIGEgTXVsdGlHZW9tZXRyeVxuICogY29udGFpbmluZyBMaW5lU3RyaW5ncyB0byBiZSB0cmVhdGVkIGFzIGEgc2luZ2xlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7TXV0aUdlb21ldHJ5T3B0aW9uc30gYW5vbnltb3VzIG9iamVjdC4gIEF2YWlsYWJsZSBwcm9wZXJ0aWVzOlxuICogbWFwOiBUaGUgbWFwIG9uIHdoaWNoIHRvIGF0dGFjaCB0aGUgTXVsdGlHZW9tZXRyeVxuICogcGF0aHM6IHRoZSBpbmRpdmlkdWFsIHBvbHlsaW5lc1xuICogcG9seWxpbmVPcHRpb25zOiBvcHRpb25zIHRvIHVzZSB3aGVuIGNvbnN0cnVjdGluZyBhbGwgdGhlIHBvbHlsaW5lc1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG4vLyBvbmx5IGlmIEdvb2dsZSBNYXBzIEFQSSBpbmNsdWRlZFxuaWYgKCEhd2luZG93Lmdvb2dsZSAmJiAhISBnb29nbGUubWFwcykge1xuZnVuY3Rpb24gTXVsdGlHZW9tZXRyeShtdWx0aUdlb21ldHJ5T3B0aW9ucykge1xuICAgZnVuY3Rpb24gY3JlYXRlUG9seWxpbmUocG9seWxpbmVPcHRpb25zLCBtZykge1xuICAgICB2YXIgcG9seWxpbmUgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWxpbmUocG9seWxpbmVPcHRpb25zKTtcbiAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocG9seWxpbmUsJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KSB7IGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWcsJ2NsaWNrJyxldnQpO30pO1xuICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihwb2x5bGluZSwnZGJsY2xpY2snLCBmdW5jdGlvbihldnQpIHsgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtZywgJ2RibGNsaWNrJywgZXZ0KTt9KTtcbiAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocG9seWxpbmUsJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2dCkgeyBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1nLCAnbW91c2Vkb3duJywgZXZ0KTt9KTtcbiAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocG9seWxpbmUsJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGV2dCkgeyBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1nLCAnbW91c2Vtb3ZlJywgZXZ0KTt9KTtcbiAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocG9seWxpbmUsJ21vdXNlb3V0JywgZnVuY3Rpb24oZXZ0KSB7IGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWcsICdtb3VzZW91dCcsIGV2dCk7fSk7XG4gICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHBvbHlsaW5lLCdtb3VzZW92ZXInLCBmdW5jdGlvbihldnQpIHsgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtZywgJ21vdXNlb3ZlcicsIGV2dCk7fSk7XG4gICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHBvbHlsaW5lLCdtb3VzZXVwJywgZnVuY3Rpb24oZXZ0KSB7IGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWcsICdtb3VzZXVwJywgZXZ0KTt9KTtcbiAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocG9seWxpbmUsJ3JpZ2h0Y2xpY2snLCBmdW5jdGlvbihldnQpIHsgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtZywgJ3JpZ2h0Y2xpY2snLCBldnQpO30pO1xuICAgICByZXR1cm4gcG9seWxpbmU7XG4gICB9XG4gICB0aGlzLnNldFZhbHVlcyhtdWx0aUdlb21ldHJ5T3B0aW9ucyk7XG4gICB0aGlzLnBvbHlsaW5lcyA9IFtdO1xuXG4gICBmb3IgKGk9MDsgaTx0aGlzLnBhdGhzLmxlbmd0aDtpKyspIHtcbiAgICAgdmFyIHBvbHlsaW5lT3B0aW9ucyA9IG11bHRpR2VvbWV0cnlPcHRpb25zO1xuICAgICBwb2x5bGluZU9wdGlvbnMucGF0aCA9IHRoaXMucGF0aHNbaV07XG4gICAgIHZhciBwb2x5bGluZSA9IGNyZWF0ZVBvbHlsaW5lKHBvbHlsaW5lT3B0aW9ucyx0aGlzKTtcbiAgICAgLy8gQmluZCB0aGUgcG9seWxpbmUgcHJvcGVydGllcyB0byB0aGUgTXVsdGlHZW9tZXRyeSBwcm9wZXJ0aWVzXG4gICAgIHRoaXMucG9seWxpbmVzLnB1c2gocG9seWxpbmUpO1xuICAgfVxufVxuTXVsdGlHZW9tZXRyeS5wcm90b3R5cGUgPSBuZXcgZ29vZ2xlLm1hcHMuTVZDT2JqZWN0KCk7XG5NdWx0aUdlb21ldHJ5LnByb3RvdHlwZS5jaGFuZ2VkID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgLy8gYWxlcnQoa2V5K1wiIGNoYW5nZWRcIik7XG4gICAgaWYgKHRoaXMucG9seWxpbmVzKSB7XG5cdGZvciAodmFyIGk9MDsgaTx0aGlzLnBvbHlsaW5lcy5sZW5ndGg7IGkrKykge1xuXHQgICAgdGhpcy5wb2x5bGluZXNbaV0uc2V0KGtleSx0aGlzLmdldChrZXkpKTtcblx0fVxuICAgIH1cbn07XG5NdWx0aUdlb21ldHJ5LnByb3RvdHlwZS5zZXRNYXAgPSBmdW5jdGlvbihtYXApIHsgdGhpcy5zZXQoJ21hcCcsbWFwKTsgfTtcbk11bHRpR2VvbWV0cnkucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5nZXQoJ21hcCcpOyB9O1xufVxuXG4vLyBFeHRlbmQgdGhlIGdsb2JhbCBTdHJpbmcgb2JqZWN0IHdpdGggYSBtZXRob2QgdG8gcmVtb3ZlIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2VcbmlmICghU3RyaW5nLnByb3RvdHlwZS50cmltKSB7XG4vKipcbiAqIFJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLlxuICpcbiAqIEBhdWdtZW50cyBTdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuICBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB9O1xufVxuXG4vKipcbiAqIEBuYW1lc3BhY2UgVGhlIEdlb1hNTDMgbmFtZXNwYWNlLlxuICovXG5nZW9YTUwzID0gd2luZG93Lmdlb1hNTDMgfHwge2luc3RhbmNlczogW119O1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIGZvciB0aGUgcm9vdCBLTUwgcGFyc2VyIG9iamVjdC5cbiAqXG4gKiA8cD5BbGwgdG9wLWxldmVsIG9iamVjdHMgYW5kIGZ1bmN0aW9ucyBhcmUgZGVjbGFyZWQgdW5kZXIgYSBuYW1lc3BhY2Ugb2YgZ2VvWE1MMy5cbiAqIFRoZSBjb3JlIG9iamVjdCBpcyBnZW9YTUwzLnBhcnNlcjsgdHlwaWNhbGx5LCB5b3UnbGwgaW5zdGFudGlhdGUgYSBvbmUgcGFyc2VyXG4gKiBwZXIgbWFwLjwvcD5cbiAqXG4gKiBAY2xhc3MgTWFpbiBYTUwgcGFyc2VyLlxuICogQHBhcmFtIHtnZW9YTUwzLnBhcnNlck9wdGlvbnN9IG9wdGlvbnNcbiAqL1xuZ2VvWE1MMy5wYXJzZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAvLyBJbmhlcml0IGZyb20gR29vZ2xlIE1WQyBPYmplY3QgdG8gaW5jbHVkZSBldmVudCBoYW5kbGluZ1xuICBnb29nbGUubWFwcy5NVkNPYmplY3QuY2FsbCh0aGlzKTtcblxuICAvLyBQcml2YXRlIHZhcmlhYmxlc1xuICB2YXIgcGFyc2VyT3B0aW9ucyA9IG5ldyBnZW9YTUwzLnBhcnNlck9wdGlvbnMob3B0aW9ucyk7XG4gIHZhciBkb2NzICAgICAgICA9IFtdOyAgLy8gSW5kaXZpZHVhbCBLTUwgZG9jdW1lbnRzXG4gIHZhciBkb2NzQnlVcmwgICA9IHt9OyAgLy8gU2FtZSBkb2NzIGFzIGFuIGhhc2ggYnkgY2xlYW5VUkxcbiAgdmFyIGttek1ldGFEYXRhID0ge307ICAvLyBFeHRyYSBmaWxlcyBmcm9tIEtNWiBkYXRhXG4gIHZhciBzdHlsZXMgICAgICA9IHt9OyAgLy8gR2xvYmFsIGxpc3Qgb2Ygc3R5bGVzXG4gIHZhciBsYXN0UGxhY2VtYXJrO1xuICB2YXIgcGFyc2VyTmFtZTtcbiAgaWYgKCFwYXJzZXJPcHRpb25zLmluZm9XaW5kb3cgJiYgcGFyc2VyT3B0aW9ucy5zaW5nbGVJbmZvV2luZG93KVxuICAgIHBhcnNlck9wdGlvbnMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cbiAgdmFyIHBhcnNlS21sU3RyaW5nID0gZnVuY3Rpb24gKGttbFN0cmluZywgZG9jU2V0KSB7XG4gICAgLy8gSW50ZXJuYWwgdmFsdWVzIGZvciB0aGUgc2V0IG9mIGRvY3VtZW50cyBhcyBhIHdob2xlXG4gICAgdmFyIGludGVybmFscyA9IHtcbiAgICAgIHBhcnNlcjogdGhpcyxcbiAgICAgIGRvY1NldDogZG9jU2V0IHx8IFtdLFxuICAgICAgcmVtYWluaW5nOiAxLFxuICAgICAgcGFyc2VPbmx5OiAhKHBhcnNlck9wdGlvbnMuYWZ0ZXJQYXJzZSB8fCBwYXJzZXJPcHRpb25zLnByb2Nlc3NTdHlsZXMpXG4gICAgfTtcbiAgICB0aGlzRG9jID0gbmV3IE9iamVjdCgpO1xuICAgIHRoaXNEb2MuaW50ZXJuYWxzID0gaW50ZXJuYWxzO1xuICAgIGludGVybmFscy5kb2NTZXQucHVzaCh0aGlzRG9jKTtcbiAgICByZW5kZXIoZ2VvWE1MMy54bWxQYXJzZShrbWxTdHJpbmcpLHRoaXNEb2MpO1xuICB9XG5cbiAgdmFyIHBhcnNlID0gZnVuY3Rpb24gKHVybHMsIGRvY1NldCkge1xuICAgIC8vIFByb2Nlc3Mgb25lIG9yIG1vcmUgS01MIGRvY3VtZW50c1xuICAgIGlmICghcGFyc2VyTmFtZSkge1xuICAgICAgcGFyc2VyTmFtZSA9ICdnZW9YTUwzLmluc3RhbmNlc1snICsgKGdlb1hNTDMuaW5zdGFuY2VzLnB1c2godGhpcykgLSAxKSArICddJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHVybHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBTaW5nbGUgS01MIGRvY3VtZW50XG4gICAgICB1cmxzID0gW3VybHNdO1xuICAgIH1cblxuICAgIC8vIEludGVybmFsIHZhbHVlcyBmb3IgdGhlIHNldCBvZiBkb2N1bWVudHMgYXMgYSB3aG9sZVxuICAgIHZhciBpbnRlcm5hbHMgPSB7XG4gICAgICBwYXJzZXI6IHRoaXMsXG4gICAgICBkb2NTZXQ6IGRvY1NldCB8fCBbXSxcbiAgICAgIHJlbWFpbmluZzogdXJscy5sZW5ndGgsXG4gICAgICBwYXJzZU9ubHk6ICEocGFyc2VyT3B0aW9ucy5hZnRlclBhcnNlIHx8IHBhcnNlck9wdGlvbnMucHJvY2Vzc1N0eWxlcylcbiAgICB9O1xuICAgIHZhciB0aGlzRG9jLCBqO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGJhc2VVcmwgPSBjbGVhblVSTChkZWZpbGVVUkwobG9jYXRpb24ucGF0aG5hbWUpLCB1cmxzW2ldKTtcbiAgICAgIGlmIChkb2NzQnlVcmxbYmFzZVVybF0pIHtcbiAgICAgICAgLy8gUmVsb2FkaW5nIGFuIGV4aXN0aW5nIGRvY3VtZW50XG4gICAgICAgIHRoaXNEb2MgPSBkb2NzQnlVcmxbYmFzZVVybF07XG4gICAgICAgIHRoaXNEb2MucmVsb2FkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzRG9jID0gbmV3IE9iamVjdCgpO1xuICAgICAgICB0aGlzRG9jLmJhc2VVcmwgPSBiYXNlVXJsO1xuICAgICAgICBpbnRlcm5hbHMuZG9jU2V0LnB1c2godGhpc0RvYyk7XG4gICAgICB9XG4gICAgICB0aGlzRG9jLnVybCAgICAgICA9IHVybHNbaV07XG4gICAgICB0aGlzRG9jLmludGVybmFscyA9IGludGVybmFscztcbiAgICAgIGZldGNoRG9jKHRoaXNEb2MudXJsLCB0aGlzRG9jKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gZmV0Y2hEb2ModXJsLCBkb2MsIHJlc0Z1bmMpIHtcbiAgICByZXNGdW5jID0gcmVzRnVuYyB8fCBmdW5jdGlvbiAocmVzcG9uc2VYTUwpIHsgcmVuZGVyKHJlc3BvbnNlWE1MLCBkb2MpOyB9O1xuXG4gICAgaWYgKHR5cGVvZiBaaXBGaWxlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBKU0lPID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgSlNJTy5ndWVzc0ZpbGVUeXBlID09PSAnZnVuY3Rpb24nKSB7ICAvLyBLTVogc3VwcG9ydCByZXF1aXJlcyB0aGVzZSBtb2R1bGVzIGxvYWRlZFxuICAgICAgY29udGVudFR5cGUgPSBKU0lPLmd1ZXNzRmlsZVR5cGUoZG9jLmJhc2VVcmwpO1xuICAgICAgaWYgKGNvbnRlbnRUeXBlID09IEpTSU8uRmlsZVR5cGUuQmluYXJ5IHx8IGNvbnRlbnRUeXBlID09IEpTSU8uRmlsZVR5cGUuVW5rbm93bikge1xuICAgICAgICAgZG9jLmlzQ29tcHJlc3NlZCA9IHRydWU7XG4gICAgICAgICBkb2MuYmFzZURpciA9IGRvYy5iYXNlVXJsICsgJy8nO1xuICAgICAgICAgZ2VvWE1MMy5mZXRjaFpJUCh1cmwsIHJlc0Z1bmMsIGRvYy5pbnRlcm5hbHMucGFyc2VyKTtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgZG9jLmlzQ29tcHJlc3NlZCA9IGZhbHNlO1xuICAgIGRvYy5iYXNlRGlyID0gZGVmaWxlVVJMKGRvYy5iYXNlVXJsKTtcbiAgICBnZW9YTUwzLmZldGNoWE1MKHVybCwgcmVzRnVuYyk7XG4gIH1cblxuICB2YXIgaGlkZURvY3VtZW50ID0gZnVuY3Rpb24gKGRvYykge1xuICAgIGlmICghZG9jKSBkb2MgPSBkb2NzWzBdO1xuICAgIC8vIEhpZGUgdGhlIG1hcCBvYmplY3RzIGFzc29jaWF0ZWQgd2l0aCBhIGRvY3VtZW50XG4gICAgdmFyIGk7XG4gICAgaWYgKCEhZG9jLm1hcmtlcnMpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkb2MubWFya2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZighIWRvYy5tYXJrZXJzW2ldLmluZm9XaW5kb3cpIGRvYy5tYXJrZXJzW2ldLmluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgZG9jLm1hcmtlcnNbaV0uc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghIWRvYy5nZ3JvdW5kb3ZlcmxheXMpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkb2MuZ2dyb3VuZG92ZXJsYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRvYy5nZ3JvdW5kb3ZlcmxheXNbaV0uc2V0T3BhY2l0eSgwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCEhZG9jLmdwb2x5bGluZXMpIHtcbiAgICAgIGZvciAoaT0wO2k8ZG9jLmdwb2x5bGluZXMubGVuZ3RoO2krKykge1xuICAgICAgICBpZighIWRvYy5ncG9seWxpbmVzW2ldLmluZm9XaW5kb3cpIGRvYy5ncG9seWxpbmVzW2ldLmluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgZG9jLmdwb2x5bGluZXNbaV0uc2V0TWFwKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoISFkb2MuZ3BvbHlnb25zKSB7XG4gICAgICBmb3IgKGk9MDtpPGRvYy5ncG9seWdvbnMubGVuZ3RoO2krKykge1xuICAgICAgICBpZighIWRvYy5ncG9seWdvbnNbaV0uaW5mb1dpbmRvdykgZG9jLmdwb2x5Z29uc1tpXS5pbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgIGRvYy5ncG9seWdvbnNbaV0uc2V0TWFwKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgc2hvd0RvY3VtZW50ID0gZnVuY3Rpb24gKGRvYykge1xuICAgIGlmICghZG9jKSBkb2MgPSBkb2NzWzBdO1xuICAgIC8vIFNob3cgdGhlIG1hcCBvYmplY3RzIGFzc29jaWF0ZWQgd2l0aCBhIGRvY3VtZW50XG4gICAgdmFyIGk7XG4gICAgaWYgKCEhZG9jLm1hcmtlcnMpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkb2MubWFya2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkb2MubWFya2Vyc1tpXS5zZXRWaXNpYmxlKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoISFkb2MuZ2dyb3VuZG92ZXJsYXlzKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZG9jLmdncm91bmRvdmVybGF5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkb2MuZ2dyb3VuZG92ZXJsYXlzW2ldLnNldE9wYWNpdHkoZG9jLmdncm91bmRvdmVybGF5c1tpXS5wZXJjZW50T3BhY2l0eV8pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoISFkb2MuZ3BvbHlsaW5lcykge1xuICAgICAgZm9yIChpPTA7aTxkb2MuZ3BvbHlsaW5lcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIGRvYy5ncG9seWxpbmVzW2ldLnNldE1hcChwYXJzZXJPcHRpb25zLm1hcCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghIWRvYy5ncG9seWdvbnMpIHtcbiAgICAgIGZvciAoaT0wO2k8ZG9jLmdwb2x5Z29ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIGRvYy5ncG9seWdvbnNbaV0uc2V0TWFwKHBhcnNlck9wdGlvbnMubWFwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGRlZmF1bHRTdHlsZSA9IHtcbiAgICBiYWxsb29uOiB7XG4gICAgICBiZ0NvbG9yOiAgICdmZmZmZmZmZicsXG4gICAgICB0ZXh0Q29sb3I6ICdmZjAwMDAwMCcsXG4gICAgICB0ZXh0OiBcIjxoMz4kW25hbWVdPC9oMz5cXG48ZGl2PiRbZGVzY3JpcHRpb25dPC9kaXY+XFxuPGRpdj4kW2dlRGlyZWN0aW9uc108L2Rpdj5cIixcbiAgICAgIGRpc3BsYXlNb2RlOiAnZGVmYXVsdCdcbiAgICB9LFxuICAgIGljb246IHtcbiAgICAgIHNjYWxlOiAxLjAsXG4gICAgICBkaW06IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgdzogLTEsXG4gICAgICAgIGg6IC0xXG4gICAgICB9LFxuICAgICAgaG90U3BvdDoge1xuICAgICAgICB4OiAwLjUsXG4gICAgICAgIHk6IDAuNSxcbiAgICAgICAgeHVuaXRzOiAnZnJhY3Rpb24nLFxuICAgICAgICB5dW5pdHM6ICdmcmFjdGlvbidcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpbmU6IHtcbiAgICAgIGNvbG9yOiAnZmZmZmZmZmYnLCAvLyB3aGl0ZSAoS01MIGRlZmF1bHQpXG4gICAgICBjb2xvck1vZGU6ICdub3JtYWwnLFxuICAgICAgd2lkdGg6IDEuMFxuICAgIH0sXG4gICAgcG9seToge1xuICAgICAgY29sb3I6ICdmZmZmZmZmZicsIC8vIHdoaXRlIChLTUwgZGVmYXVsdClcbiAgICAgIGNvbG9yTW9kZTogJ25vcm1hbCcsXG4gICAgICBmaWxsOiB0cnVlLFxuICAgICAgb3V0bGluZTogdHJ1ZVxuICAgIH1cbiAgfTtcblxuICB2YXIga21sTlMgPSAnaHR0cDovL3d3dy5vcGVuZ2lzLm5ldC9rbWwvMi4yJztcbiAgdmFyIGd4TlMgID0gJ2h0dHA6Ly93d3cuZ29vZ2xlLmNvbS9rbWwvZXh0LzIuMic7XG4gIHZhciBub2RlVmFsdWUgICAgICAgICAgICAgID0gZ2VvWE1MMy5ub2RlVmFsdWU7XG4gIHZhciBnZXRCb29sZWFuVmFsdWUgICAgICAgID0gZ2VvWE1MMy5nZXRCb29sZWFuVmFsdWU7XG4gIHZhciBnZXRFbGVtZW50c0J5VGFnTmFtZU5TID0gZ2VvWE1MMy5nZXRFbGVtZW50c0J5VGFnTmFtZU5TO1xuICB2YXIgZ2V0RWxlbWVudHNCeVRhZ05hbWUgICA9IGdlb1hNTDMuZ2V0RWxlbWVudHNCeVRhZ05hbWU7XG5cbmZ1bmN0aW9uIHByb2Nlc3NTdHlsZVVybChub2RlKSB7XG4gIHZhciBzdHlsZVVybFN0ciA9IG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShub2RlLCAnc3R5bGVVcmwnKVswXSk7XG4gIGlmICghIXN0eWxlVXJsU3RyICYmIHN0eWxlVXJsU3RyLmluZGV4T2YoJyMnKSAhPSAtMSlcbiAgICB2YXIgc3R5bGVVcmwgPSBzdHlsZVVybFN0ci5zcGxpdCgnIycpO1xuICBlbHNlIHZhciBzdHlsZVVybCA9IFtcIlwiLFwiXCJdO1xuICByZXR1cm4gc3R5bGVVcmw7XG59XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc1N0eWxlKHRoaXNOb2RlLCBiYXNlVXJsLCBzdHlsZUlELCBiYXNlRGlyKSB7XG4gICAgdmFyIHN0eWxlID0gKGJhc2VVcmwgPT09ICd7aW5saW5lfScpID8gY2xvbmUoZGVmYXVsdFN0eWxlKSA6IChzdHlsZXNbYmFzZVVybF1bc3R5bGVJRF0gPSBzdHlsZXNbYmFzZVVybF1bc3R5bGVJRF0gfHwgY2xvbmUoZGVmYXVsdFN0eWxlKSk7XG5cbiAgICB2YXIgc3R5bGVOb2RlcyA9IGdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXNOb2RlLCAnQmFsbG9vblN0eWxlJyk7XG4gICAgaWYgKCEhc3R5bGVOb2RlcyAmJiBzdHlsZU5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0eWxlLmJhbGxvb24uYmdDb2xvciAgICAgPSBub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUoc3R5bGVOb2Rlc1swXSwgJ2JnQ29sb3InKVswXSwgICAgIHN0eWxlLmJhbGxvb24uYmdDb2xvcik7XG4gICAgICBzdHlsZS5iYWxsb29uLnRleHRDb2xvciAgID0gbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKHN0eWxlTm9kZXNbMF0sICd0ZXh0Q29sb3InKVswXSwgICBzdHlsZS5iYWxsb29uLnRleHRDb2xvcik7XG4gICAgICBzdHlsZS5iYWxsb29uLnRleHQgICAgICAgID0gbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKHN0eWxlTm9kZXNbMF0sICd0ZXh0JylbMF0sICAgICAgICBzdHlsZS5iYWxsb29uLnRleHQpO1xuICAgICAgc3R5bGUuYmFsbG9vbi5kaXNwbGF5TW9kZSA9IG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShzdHlsZU5vZGVzWzBdLCAnZGlzcGxheU1vZGUnKVswXSwgc3R5bGUuYmFsbG9vbi5kaXNwbGF5TW9kZSk7XG4gICAgfVxuXG4gICAgLy8gc3R5bGUubGlzdCA9ICh1bnN1cHBvcnRlZDsgZG9lc24ndCBtYWtlIHNlbnNlIGluIEdvb2dsZSBNYXBzKVxuXG4gICAgdmFyIHN0eWxlTm9kZXMgPSBnZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzTm9kZSwgJ0ljb25TdHlsZScpO1xuICAgIGlmICghIXN0eWxlTm9kZXMgJiYgc3R5bGVOb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgaWNvbiA9IHN0eWxlLmljb247XG5cbiAgICAgIGljb24uc2NhbGUgPSBwYXJzZUZsb2F0KG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShzdHlsZU5vZGVzWzBdLCAnc2NhbGUnKVswXSwgaWNvbi5zY2FsZSkpO1xuICAgICAgLy8gc3R5bGUuaWNvbi5oZWFkaW5nICAgPSAodW5zdXBwb3J0ZWQ7IG5vdCBzdXBwb3J0ZWQgaW4gQVBJKVxuICAgICAgLy8gc3R5bGUuaWNvbi5jb2xvciAgICAgPSAodW5zdXBwb3J0ZWQ7IG5vdCBzdXBwb3J0ZWQgaW4gQVBJKVxuICAgICAgLy8gc3R5bGUuaWNvbi5jb2xvck1vZGUgPSAodW5zdXBwb3J0ZWQ7IG5vdCBzdXBwb3J0ZWQgaW4gQVBJKVxuXG4gICAgICBzdHlsZU5vZGVzID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUoc3R5bGVOb2Rlc1swXSwgJ2hvdFNwb3QnKTtcbiAgICAgIGlmICghIXN0eWxlTm9kZXMgJiYgc3R5bGVOb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGljb24uaG90U3BvdCA9IHtcbiAgICAgICAgICB4OiAgICAgIHN0eWxlTm9kZXNbMF0uZ2V0QXR0cmlidXRlKCd4JyksXG4gICAgICAgICAgeTogICAgICBzdHlsZU5vZGVzWzBdLmdldEF0dHJpYnV0ZSgneScpLFxuICAgICAgICAgIHh1bml0czogc3R5bGVOb2Rlc1swXS5nZXRBdHRyaWJ1dGUoJ3h1bml0cycpLFxuICAgICAgICAgIHl1bml0czogc3R5bGVOb2Rlc1swXS5nZXRBdHRyaWJ1dGUoJ3l1bml0cycpXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHN0eWxlTm9kZXMgPSBnZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzTm9kZSwgJ0ljb24nKTtcbiAgICAgIGlmICghIXN0eWxlTm9kZXMgJiYgc3R5bGVOb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGljb24uaHJlZiA9IG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShzdHlsZU5vZGVzWzBdLCAnaHJlZicpWzBdKTtcbiAgICAgICAgaWNvbi51cmwgID0gY2xlYW5VUkwoYmFzZURpciwgaWNvbi5ocmVmKTtcbiAgICAgICAgLy8gRGV0ZWN0IGltYWdlcyBidXJpZWQgaW4gS01aIGZpbGVzIChhbmQgdXNlIGEgYmFzZTY0IGVuY29kZWQgVVJMKVxuICAgICAgICBpZiAoa216TWV0YURhdGFbaWNvbi51cmxdKSBpY29uLnVybCA9IGttek1ldGFEYXRhW2ljb24udXJsXS5kYXRhVXJsO1xuXG4gICAgICAgIC8vIFN1cHBvcnQgZm9yIGljb24gcGFsZXR0ZXMgYW5kIGV4YWN0IHNpemUgZGltZW5zaW9uc1xuICAgICAgICBpY29uLmRpbSA9IHtcbiAgICAgICAgICB4OiBwYXJzZUludChub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyhzdHlsZU5vZGVzWzBdLCBneE5TLCAneCcpWzBdLCBpY29uLmRpbS54KSksXG4gICAgICAgICAgeTogcGFyc2VJbnQobm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lTlMoc3R5bGVOb2Rlc1swXSwgZ3hOUywgJ3knKVswXSwgaWNvbi5kaW0ueSkpLFxuICAgICAgICAgIHc6IHBhcnNlSW50KG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZU5TKHN0eWxlTm9kZXNbMF0sIGd4TlMsICd3JylbMF0sIGljb24uZGltLncpKSxcbiAgICAgICAgICBoOiBwYXJzZUludChub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyhzdHlsZU5vZGVzWzBdLCBneE5TLCAnaCcpWzBdLCBpY29uLmRpbS5oKSlcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBjZXJ0YWluIG9jY2FzaW9ucyB3aGVyZSB3ZSBuZWVkIHRoZSBwaXhlbCBzaXplIG9mIHRoZSBpbWFnZSAobGlrZSB0aGUgZGVmYXVsdCBzZXR0aW5ncy4uLilcbiAgICAgICAgLy8gKE5PVEU6IFNjYWxlIGlzIGFwcGxpZWQgdG8gZW50aXJlIGltYWdlLCBub3QganVzdCB0aGUgc2VjdGlvbiBvZiB0aGUgaWNvbiBwYWxldHRlLiAgU28sXG4gICAgICAgIC8vICBpZiB3ZSBuZWVkIHNjYWxpbmcsIHdlJ2xsIG5lZWQgdGhlIGltZyBkaW1lbnNpb25zIG5vIG1hdHRlciB3aGF0LilcbiAgICAgICAgaWYgKHRydWUgLyogKGljb24uZGltLncgPCAwIHx8IGljb24uZGltLmggPCAwKSAmJiAoaWNvbi54dW5pdHMgIT0gJ3BpeGVscycgfHwgaWNvbi55dW5pdHMgPT0gJ2ZyYWN0aW9uJykgfHwgaWNvbi5zY2FsZSAhPSAxLjAgKi8pIHtcbiAgICAgICAgICAvLyAoaG9wZWZ1bGx5LCB0aGlzIHdpbGwgbG9hZCBieSB0aGUgdGltZSB3ZSBuZWVkIGl0Li4uKVxuICAgICAgICAgIGljb24uaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgaWNvbi5pbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoaWNvbi5kaW0udyA8IDAgfHwgaWNvbi5kaW0uaCA8IDApIHtcbiAgICAgICAgICAgICAgaWNvbi5kaW0udyA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICAgIGljb24uZGltLmggPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGljb24uZGltLnRoID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpY29uLmltZy5zcmMgPSBpY29uLnVybDtcblxuICAgICAgICAgIC8vIHNvbWV0aW1lcyB0aGUgZmlsZSBpcyBhbHJlYWR5IGNhY2hlZCBhbmQgaXQgbmV2ZXIgY2FsbHMgb25Mb2FkXG4gICAgICAgICAgaWYgKGljb24uaW1nLndpZHRoID4gMCkge1xuICAgICAgICAgICAgaWYgKGljb24uZGltLncgPCAwIHx8IGljb24uZGltLmggPCAwKSB7XG4gICAgICAgICAgICAgaWNvbi5kaW0udyA9IGljb24uaW1nLndpZHRoO1xuICAgICAgICAgICAgIGljb24uZGltLmggPSBpY29uLmltZy5oZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIGljb24uZGltLnRoID0gaWNvbi5pbWcuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN0eWxlLmxhYmVsID0gKHVuc3VwcG9ydGVkOyBtYXkgYmUgcG9zc2libGUgYnV0IG5vdCB3aXRoIEFQSSlcblxuICAgIHN0eWxlTm9kZXMgPSBnZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzTm9kZSwgJ0xpbmVTdHlsZScpO1xuICAgIGlmICghIXN0eWxlTm9kZXMgJiYgc3R5bGVOb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzdHlsZS5saW5lLmNvbG9yICAgICA9IG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShzdHlsZU5vZGVzWzBdLCAnY29sb3InKVswXSwgICAgIHN0eWxlLmxpbmUuY29sb3IpO1xuICAgICAgc3R5bGUubGluZS5jb2xvck1vZGUgPSBub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUoc3R5bGVOb2Rlc1swXSwgJ2NvbG9yTW9kZScpWzBdLCBzdHlsZS5saW5lLmNvbG9yTW9kZSk7XG4gICAgICBzdHlsZS5saW5lLndpZHRoICAgICA9IG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShzdHlsZU5vZGVzWzBdLCAnd2lkdGgnKVswXSwgICAgIHN0eWxlLmxpbmUud2lkdGgpO1xuICAgICAgLy8gc3R5bGUubGluZS5vdXRlckNvbG9yICAgICAgPSAodW5zdXBwb3J0ZWQ7IG5vdCBzdXBwb3J0ZWQgaW4gQVBJKVxuICAgICAgLy8gc3R5bGUubGluZS5vdXRlcldpZHRoICAgICAgPSAodW5zdXBwb3J0ZWQ7IG5vdCBzdXBwb3J0ZWQgaW4gQVBJKVxuICAgICAgLy8gc3R5bGUubGluZS5waHlzaWNhbFdpZHRoICAgPSAodW5zdXBwb3J0ZWQ7IHVubmVjY2VzYXJ5IGluIEdvb2dsZSBNYXBzKVxuICAgICAgLy8gc3R5bGUubGluZS5sYWJlbFZpc2liaWxpdHkgPSAodW5zdXBwb3J0ZWQ7IHBvc3NpYmxlIHRvIGltcGxlbWVudClcbiAgICB9XG5cbiAgICBzdHlsZU5vZGVzID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUodGhpc05vZGUsICdQb2x5U3R5bGUnKTtcbiAgICBpZiAoISFzdHlsZU5vZGVzICYmIHN0eWxlTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgc3R5bGUucG9seS5jb2xvciAgICAgPSBub2RlVmFsdWUoICAgICAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoc3R5bGVOb2Rlc1swXSwgJ2NvbG9yJylbMF0sICAgICBzdHlsZS5wb2x5LmNvbG9yKTtcbiAgICAgIHN0eWxlLnBvbHkuY29sb3JNb2RlID0gbm9kZVZhbHVlKCAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lKHN0eWxlTm9kZXNbMF0sICdjb2xvck1vZGUnKVswXSwgc3R5bGUucG9seS5jb2xvck1vZGUpO1xuICAgICAgc3R5bGUucG9seS5vdXRsaW5lICAgPSBnZXRCb29sZWFuVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUoc3R5bGVOb2Rlc1swXSwgJ291dGxpbmUnKVswXSwgICBzdHlsZS5wb2x5Lm91dGxpbmUpO1xuICAgICAgc3R5bGUucG9seS5maWxsICAgICAgPSBnZXRCb29sZWFuVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUoc3R5bGVOb2Rlc1swXSwgJ2ZpbGwnKVswXSwgICAgICBzdHlsZS5wb2x5LmZpbGwpO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cblxuICAvLyBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTIyMTAyL3doYXQtaXMtdGhlLW1vc3QtZWZmaWNpZW50LXdheS10by1jbG9uZS1hLWphdmFzY3JpcHQtb2JqZWN0XG4gIC8vIGh0dHA6Ly9rZWl0aGRldmVucy5jb20vd2VibG9nL2FyY2hpdmUvMjAwNy9KdW4vMDcvamF2YXNjcmlwdC5jbG9uZVxuICBmdW5jdGlvbiBjbG9uZShvYmope1xuICAgIGlmKG9iaiA9PSBudWxsIHx8IHR5cGVvZihvYmopICE9ICdvYmplY3QnKSByZXR1cm4gb2JqO1xuICAgIGlmIChvYmouY2xvbmVOb2RlKSByZXR1cm4gb2JqLmNsb25lTm9kZSh0cnVlKTtcbiAgICB2YXIgdGVtcCA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHRlbXBba2V5XSA9IGNsb25lKG9ialtrZXldKTtcbiAgICByZXR1cm4gdGVtcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTdHlsZU1hcCh0aGlzTm9kZSwgYmFzZVVybCwgc3R5bGVJRCwgYmFzZURpcikge1xuICAgIHZhciBwYWlycyA9IGdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXNOb2RlLCAnUGFpcicpO1xuICAgIHZhciBtYXAgPSBuZXcgT2JqZWN0KCk7XG5cbiAgICAvLyBhZGQgZWFjaCBrZXkgdG8gdGhlIG1hcFxuICAgIGZvciAodmFyIHByPTA7cHI8cGFpcnMubGVuZ3RoO3ByKyspIHtcbiAgICAgIHZhciBwYWlyS2V5ICAgICAgPSBub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUocGFpcnNbcHJdLCAna2V5JylbMF0pO1xuICAgICAgdmFyIHBhaXJTdHlsZSAgICA9IG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShwYWlyc1twcl0sICdTdHlsZScpWzBdKTtcbiAgICAgIHZhciBwYWlyU3R5bGVVcmwgPSBwcm9jZXNzU3R5bGVVcmwocGFpcnNbcHJdKTtcbiAgICAgIHZhciBwYWlyU3R5bGVCYXNlVXJsID0gcGFpclN0eWxlVXJsWzBdID8gY2xlYW5VUkwoYmFzZURpciwgcGFpclN0eWxlVXJsWzBdKSA6IGJhc2VVcmw7XG4gICAgICB2YXIgcGFpclN0eWxlSUQgICAgICA9IHBhaXJTdHlsZVVybFsxXTtcblxuICAgICAgaWYgKCEhcGFpclN0eWxlKSB7XG4gICAgICAgIG1hcFtwYWlyS2V5XSA9IHByb2Nlc3NTdHlsZShwYWlyU3R5bGUsIHBhaXJTdHlsZUJhc2VVcmwsIHBhaXJTdHlsZUlEKTtcbiAgICAgIH0gZWxzZSBpZiAoISFwYWlyU3R5bGVJRCAmJiAhIXN0eWxlc1twYWlyU3R5bGVCYXNlVXJsXVtwYWlyU3R5bGVJRF0pIHtcbiAgICAgICAgbWFwW3BhaXJLZXldID0gY2xvbmUoc3R5bGVzW3BhaXJTdHlsZUJhc2VVcmxdW3BhaXJTdHlsZUlEXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghIW1hcFtcIm5vcm1hbFwiXSkge1xuICAgICAgc3R5bGVzW2Jhc2VVcmxdW3N0eWxlSURdID0gY2xvbmUobWFwW1wibm9ybWFsXCJdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzW2Jhc2VVcmxdW3N0eWxlSURdID0gY2xvbmUoZGVmYXVsdFN0eWxlKTtcbiAgICB9XG4gICAgaWYgKCEhbWFwW1wiaGlnaGxpZ2h0XCJdICYmICEhcGFyc2VyT3B0aW9ucy5wcm9jZXNzU3R5bGVzKSB7XG4gICAgICBwcm9jZXNzU3R5bGVJRChtYXBbXCJoaWdobGlnaHRcIl0pO1xuICAgIH1cbiAgICBzdHlsZXNbYmFzZVVybF1bc3R5bGVJRF0ubWFwID0gY2xvbmUobWFwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NQbGFjZW1hcmtDb29yZHMobm9kZSwgdGFnKSB7XG4gICAgdmFyIHBhcmVudCA9IGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsIHRhZyk7XG4gICAgdmFyIGNvb3JkTGlzdEEgPSBbXTtcbiAgICBmb3IgKHZhciBpPTA7IGk8cGFyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY29vcmROb2RlcyA9IGdldEVsZW1lbnRzQnlUYWdOYW1lKHBhcmVudFtpXSwgJ2Nvb3JkaW5hdGVzJyk7XG4gICAgICBpZiAoIWNvb3JkTm9kZXMpIHtcbiAgICAgICAgaWYgKGNvb3JkTGlzdEEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbe2Nvb3JkaW5hdGVzOiBbXX1dO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGo9MDsgajxjb29yZE5vZGVzLmxlbmd0aDtqKyspIHtcbiAgICAgICAgdmFyIGNvb3JkcyA9IG5vZGVWYWx1ZShjb29yZE5vZGVzW2pdKS50cmltKCk7XG4gICAgICAgIGNvb3JkcyA9IGNvb3Jkcy5yZXBsYWNlKC8sXFxzKy9nLCAnLCcpO1xuICAgICAgICB2YXIgcGF0aCA9IGNvb3Jkcy5zcGxpdCgvXFxzKy9nKTtcbiAgICAgICAgdmFyIHBhdGhMZW5ndGggPSBwYXRoLmxlbmd0aDtcbiAgICAgICAgdmFyIGNvb3JkTGlzdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBhdGhMZW5ndGg7IGsrKykge1xuICAgICAgICAgIGNvb3JkcyA9IHBhdGhba10uc3BsaXQoJywnKTtcbiAgICAgICAgICBpZiAoIWlzTmFOKGNvb3Jkc1swXSkgJiYgIWlzTmFOKGNvb3Jkc1sxXSkpIHtcbiAgICAgICAgICAgIGNvb3JkTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgbGF0OiBwYXJzZUZsb2F0KGNvb3Jkc1sxXSksXG4gICAgICAgICAgICAgIGxuZzogcGFyc2VGbG9hdChjb29yZHNbMF0pLFxuICAgICAgICAgICAgICBhbHQ6IHBhcnNlRmxvYXQoY29vcmRzWzJdKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvb3JkTGlzdEEucHVzaCh7Y29vcmRpbmF0ZXM6IGNvb3JkTGlzdH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRMaXN0QTtcbiAgfVxuXG4gIHZhciByZW5kZXIgPSBmdW5jdGlvbiAocmVzcG9uc2VYTUwsIGRvYykge1xuICAgIC8vIENhbGxiYWNrIGZvciByZXRyaWV2aW5nIGEgS01MIGRvY3VtZW50OiBwYXJzZSB0aGUgS01MIGFuZCBkaXNwbGF5IGl0IG9uIHRoZSBtYXBcbiAgICBpZiAoIXJlc3BvbnNlWE1MIHx8IHJlc3BvbnNlWE1MID09IFwiZmFpbGVkIHBhcnNlXCIpIHtcbiAgICAgIC8vIEVycm9yIHJldHJpZXZpbmcgdGhlIGRhdGFcbiAgICAgIGdlb1hNTDMubG9nKCdVbmFibGUgdG8gcmV0cmlldmUgJyArIGRvYy51cmwpO1xuICAgICAgaWYgKHBhcnNlck9wdGlvbnMuZmFpbGVkUGFyc2UpIHBhcnNlck9wdGlvbnMuZmFpbGVkUGFyc2UoZG9jKTtcbiAgICAgIGRvYy5mYWlsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2VYTUwucGFyc2VFcnJvciAmJiByZXNwb25zZVhNTC5wYXJzZUVycm9yLmVycm9yQ29kZSAhPSAwKSB7XG4gICAgICAvLyBJRSBwYXJzZSBlcnJvclxuICAgICAgdmFyIGVyciA9IHJlc3BvbnNlWE1MLnBhcnNlRXJyb3I7XG4gICAgICB2YXIgbXNnID0gJ1BhcnNlIGVycm9yIGluIGxpbmUgJyArIGVyci5saW5lICsgJywgY29sICcgKyBlcnIubGluZVBvcyArICcgKGVycm9yIGNvZGU6ICcgKyBlcnIuZXJyb3JDb2RlICsgXCIpXFxuXCIgK1xuICAgICAgICBcIlxcbkVycm9yIFJlYXNvbjogXCIgKyBlcnIucmVhc29uICtcbiAgICAgICAgJ0Vycm9yIExpbmU6ICcgKyBlcnIuc3JjVGV4dDtcblxuICAgICAgZ2VvWE1MMy5sb2coJ1VuYWJsZSB0byByZXRyaWV2ZSAnICsgZG9jLnVybCArICc6ICcgKyBtc2cpO1xuICAgICAgaWYgKHBhcnNlck9wdGlvbnMuZmFpbGVkUGFyc2UpIHBhcnNlck9wdGlvbnMuZmFpbGVkUGFyc2UoZG9jKTtcbiAgICAgIGRvYy5mYWlsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50ICYmIHJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PSAncGFyc2VyZXJyb3InKSB7XG4gICAgICAvLyBGaXJlZm94IHBhcnNlIGVycm9yXG4gICAgICBnZW9YTUwzLmxvZygnVW5hYmxlIHRvIHJldHJpZXZlICcgKyBkb2MudXJsICsgJzogJyArIHJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudC5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSk7XG4gICAgICBpZiAocGFyc2VyT3B0aW9ucy5mYWlsZWRQYXJzZSkgcGFyc2VyT3B0aW9ucy5mYWlsZWRQYXJzZShkb2MpO1xuICAgICAgZG9jLmZhaWxlZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICghZG9jKSB7XG4gICAgICB0aHJvdyAnZ2VvWE1MMyBpbnRlcm5hbCBlcnJvcjogcmVuZGVyIGNhbGxlZCB3aXRoIG51bGwgZG9jdW1lbnQnO1xuICAgIH0gZWxzZSB7IC8vbm8gZXJyb3JzXG4gICAgICB2YXIgaTtcbiAgICAgIGRvYy5wbGFjZW1hcmtzICAgICAgPSBbXTtcbiAgICAgIGRvYy5ncm91bmRvdmVybGF5cyAgPSBbXTtcbiAgICAgIGRvYy5nZ3JvdW5kb3ZlcmxheXMgPSBbXTtcbiAgICAgIGRvYy5uZXR3b3JrTGlua3MgICAgPSBbXTtcbiAgICAgIGRvYy5ncG9seWdvbnMgICAgICAgPSBbXTtcbiAgICAgIGRvYy5ncG9seWxpbmVzICAgICAgPSBbXTtcblxuICAgICAgLy8gQ2hlY2sgZm9yIGRlcGVuZGVudCBLTUwgZmlsZXNcbiAgICAgIHZhciBub2RlcyA9IGdldEVsZW1lbnRzQnlUYWdOYW1lKHJlc3BvbnNlWE1MLCAnc3R5bGVVcmwnKTtcbiAgICAgIHZhciBkb2NTZXQgPSBkb2MuaW50ZXJuYWxzLmRvY1NldDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdXJsID0gbm9kZVZhbHVlKG5vZGVzW2ldKS5zcGxpdCgnIycpWzBdO1xuICAgICAgICBpZiAoIXVybCkgICAgICAgICAgICAgICAgIGNvbnRpbnVlOyAgLy8gI2lkIChpbnNpZGUgZG9jKVxuICAgICAgICB2YXIgclVybCA9IGNsZWFuVVJMKCBkb2MuYmFzZURpciwgdXJsICk7XG4gICAgICAgIGlmIChyVXJsID09PSBkb2MuYmFzZVVybCkgY29udGludWU7ICAvLyBzZWxmXG4gICAgICAgIGlmIChkb2NzQnlVcmxbclVybF0pICAgICAgY29udGludWU7ICAvLyBhbHJlYWR5IGxvYWRlZFxuXG4gICAgICAgIHZhciB0aGlzRG9jO1xuICAgICAgICB2YXIgaiA9IGRvY1NldC5pbmRleE9mT2JqV2l0aEl0ZW0oJ2Jhc2VVcmwnLCByVXJsKTtcbiAgICAgICAgaWYgKGogIT0gLTEpIHtcbiAgICAgICAgICAvLyBBbHJlYWR5IGxpc3RlZCB0byBiZSBsb2FkZWQsIGJ1dCBwcm9iYWJseSBpbiB0aGUgd3Jvbmcgb3JkZXIuXG4gICAgICAgICAgLy8gTG9hZCBpdCByaWdodCBhd2F5IHRvIGltbWVkaWF0ZWx5IHJlc29sdmUgZGVwZW5kZW5jeS5cbiAgICAgICAgICB0aGlzRG9jID0gZG9jU2V0W2pdO1xuICAgICAgICAgIGlmICh0aGlzRG9jLmZhaWxlZCkgY29udGludWU7ICAvLyBmYWlsZWQgdG8gbG9hZCBsYXN0IHRpbWU7IGRvbid0IHJldHJ5IGl0IGFnYWluXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8gTm90IGxpc3RlZCBhdCBhbGw7IGFkZCBpdCBpblxuICAgICAgICAgIHRoaXNEb2MgICAgICAgICAgID0gbmV3IE9iamVjdCgpO1xuICAgICAgICAgIHRoaXNEb2MudXJsICAgICAgID0gclVybDsgIC8vIHVybCBjYW4ndCBiZSB0cnVzdGVkIGluc2lkZSBLTVogZmlsZXMsIHNpbmNlIGl0IG1heSAuLiBvdXRzaWRlIG9mIHRoZSBhcmNoaXZlXG4gICAgICAgICAgdGhpc0RvYy5iYXNlVXJsICAgPSByVXJsO1xuICAgICAgICAgIHRoaXNEb2MuaW50ZXJuYWxzID0gZG9jLmludGVybmFscztcblxuICAgICAgICAgIGRvYy5pbnRlcm5hbHMuZG9jU2V0LnB1c2godGhpc0RvYyk7XG4gICAgICAgICAgZG9jLmludGVybmFscy5yZW1haW5pbmcrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbmRlciBkZXBlbmRlbnQgS01MIGZpcnN0IHRoZW4gcmUtcnVuIHJlbmRlcmVyXG4gICAgICAgIGZldGNoRG9jKHJVcmwsIHRoaXNEb2MsIGZ1bmN0aW9uICh0aGlzUmVzWE1MKSB7XG4gICAgICAgICAgcmVuZGVyKHRoaXNSZXNYTUwsIHRoaXNEb2MpO1xuICAgICAgICAgIHJlbmRlcihyZXNwb25zZVhNTCwgZG9jKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdG8gcHJldmVudCBjcm9zcy1kZXBlbmRlbmN5IGlzc3VlcywganVzdCBsb2FkIHRoZSBvbmVcbiAgICAgICAgLy8gZmlsZSBmaXJzdCBhbmQgcmUtY2hlY2sgdGhlIHJlc3QgbGF0ZXJcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQYXJzZSBzdHlsZXNcbiAgICAgIGRvYy5zdHlsZXMgPSBzdHlsZXNbZG9jLmJhc2VVcmxdID0gc3R5bGVzW2RvYy5iYXNlVXJsXSB8fCB7fTtcbiAgICAgIHZhciBzdHlsZUlELCBzdHlsZU5vZGVzO1xuICAgICAgbm9kZXMgPSBnZXRFbGVtZW50c0J5VGFnTmFtZShyZXNwb25zZVhNTCwgJ1N0eWxlJyk7XG4gICAgICBub2RlQ291bnQgPSBub2Rlcy5sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbm9kZUNvdW50OyBpKyspIHtcbiAgICAgICAgdGhpc05vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgdmFyIHN0eWxlSUQgPSB0aGlzTm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgIGlmICghIXN0eWxlSUQpIHByb2Nlc3NTdHlsZSh0aGlzTm9kZSwgZG9jLmJhc2VVcmwsIHN0eWxlSUQsIGRvYy5iYXNlRGlyKTtcbiAgICAgIH1cbiAgICAgIC8vIFBhcnNlIFN0eWxlTWFwIG5vZGVzXG4gICAgICBub2RlcyA9IGdldEVsZW1lbnRzQnlUYWdOYW1lKHJlc3BvbnNlWE1MLCAnU3R5bGVNYXAnKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzTm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICB2YXIgc3R5bGVJRCA9IHRoaXNOb2RlLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgaWYgKCEhc3R5bGVJRCkgcHJvY2Vzc1N0eWxlTWFwKHRoaXNOb2RlLCBkb2MuYmFzZVVybCwgc3R5bGVJRCwgZG9jLmJhc2VEaXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoISFwYXJzZXJPcHRpb25zLnByb2Nlc3NTdHlsZXMgfHwgIXBhcnNlck9wdGlvbnMuY3JlYXRlTWFya2VyKSB7XG4gICAgICAgIC8vIENvbnZlcnQgcGFyc2VkIHN0eWxlcyBpbnRvIEdNYXBzIGVxdWl2YWxlbnRzXG4gICAgICAgIHByb2Nlc3NTdHlsZXMoZG9jKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGFyc2UgcGxhY2VtYXJrc1xuICAgICAgaWYgKCEhZG9jLnJlbG9hZCAmJiAhIWRvYy5tYXJrZXJzKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkb2MubWFya2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRvYy5tYXJrZXJzW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgcGxhY2VtYXJrLCBub2RlLCBjb29yZHMsIHBhdGgsIG1hcmtlciwgcG9seTtcbiAgICAgIHZhciBwYXRoTGVuZ3RoLCBtYXJrZXIsIHBvbHlnb25Ob2RlcywgY29vcmRMaXN0O1xuICAgICAgdmFyIHBsYWNlbWFya05vZGVzID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUocmVzcG9uc2VYTUwsICdQbGFjZW1hcmsnKTtcbiAgICAgIGZvciAocG0gPSAwOyBwbSA8IHBsYWNlbWFya05vZGVzLmxlbmd0aDsgcG0rKykge1xuICAgICAgICAvLyBJbml0IHRoZSBwbGFjZW1hcmsgb2JqZWN0XG4gICAgICAgIG5vZGUgPSBwbGFjZW1hcmtOb2Rlc1twbV07XG4gICAgICAgIHZhciBzdHlsZVVybCA9IHByb2Nlc3NTdHlsZVVybChub2RlKTtcbiAgICAgICAgcGxhY2VtYXJrID0ge1xuICAgICAgICAgIG5hbWU6ICAgICAgICAgbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsICduYW1lJylbMF0pLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAgbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsICdkZXNjcmlwdGlvbicpWzBdKSxcbiAgICAgICAgICBzdHlsZVVybDogICAgIHN0eWxlVXJsLmpvaW4oJyMnKSxcbiAgICAgICAgICBzdHlsZUJhc2VVcmw6IHN0eWxlVXJsWzBdID8gY2xlYW5VUkwoZG9jLmJhc2VEaXIsIHN0eWxlVXJsWzBdKSA6IGRvYy5iYXNlVXJsLFxuICAgICAgICAgIHN0eWxlSUQ6ICAgICAgc3R5bGVVcmxbMV0sXG4gICAgICAgICAgdmlzaWJpbGl0eTogICAgICAgIGdldEJvb2xlYW5WYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShub2RlLCAndmlzaWJpbGl0eScpWzBdLCB0cnVlKSxcbiAgICAgICAgICBiYWxsb29uVmlzaWJpbGl0eTogZ2V0Qm9vbGVhblZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lTlMobm9kZSwgZ3hOUywgJ2JhbGxvb25WaXNpYmlsaXR5JylbMF0sICFwYXJzZXJPcHRpb25zLnN1cHByZXNzSW5mb1dpbmRvd3MpLFxuICAgICAgICAgIGlkOiAgICAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAgICAgfTtcbiAgICAgICAgcGxhY2VtYXJrLnN0eWxlID0gKHN0eWxlc1twbGFjZW1hcmsuc3R5bGVCYXNlVXJsXSAmJiBzdHlsZXNbcGxhY2VtYXJrLnN0eWxlQmFzZVVybF1bcGxhY2VtYXJrLnN0eWxlSURdKSB8fCBjbG9uZShkZWZhdWx0U3R5bGUpO1xuICAgICAgICAvLyBpbmxpbmUgc3R5bGUgb3ZlcnJpZGVzIHNoYXJlZCBzdHlsZVxuICAgICAgICB2YXIgaW5saW5lU3R5bGVzID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ1N0eWxlJyk7XG4gICAgICAgIGlmIChpbmxpbmVTdHlsZXMgJiYgKGlubGluZVN0eWxlcy5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIHZhciBzdHlsZSA9IHByb2Nlc3NTdHlsZShub2RlLCAne2lubGluZX0nLCAne2lubGluZX0nKTtcbiAgICAgICAgICBwcm9jZXNzU3R5bGVJRChzdHlsZSk7XG4gICAgICAgICAgaWYgKHN0eWxlKSBwbGFjZW1hcmsuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgvXmh0dHBzPzpcXC9cXC8vLnRlc3QocGxhY2VtYXJrLmRlc2NyaXB0aW9uKSkge1xuICAgICAgICAgIHBsYWNlbWFyay5kZXNjcmlwdGlvbiA9IFsnPGEgaHJlZj1cIicsIHBsYWNlbWFyay5kZXNjcmlwdGlvbiwgJ1wiPicsIHBsYWNlbWFyay5kZXNjcmlwdGlvbiwgJzwvYT4nXS5qb2luKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlY29yZCBsaXN0IG9mIHZhcmlhYmxlcyBmb3Igc3Vic3RpdHV0aW9uXG4gICAgICAgIHBsYWNlbWFyay52YXJzID0ge1xuICAgICAgICAgIGRpc3BsYXk6IHtcbiAgICAgICAgICAgIG5hbWU6ICAgICAgICAgJ05hbWUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICAnRGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgYWRkcmVzczogICAgICAnU3RyZWV0IEFkZHJlc3MnLFxuICAgICAgICAgICAgaWQ6ICAgICAgICAgICAnSUQnLFxuICAgICAgICAgICAgU25pcHBldDogICAgICAnU25pcHBldCcsXG4gICAgICAgICAgICBnZURpcmVjdGlvbnM6ICdEaXJlY3Rpb25zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmFsOiB7XG4gICAgICAgICAgICBuYW1lOiAgICAgICAgcGxhY2VtYXJrLm5hbWUgfHwgJycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcGxhY2VtYXJrLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgICAgICAgYWRkcmVzczogICAgIG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShub2RlLCAnYWRkcmVzcycpWzBdLCAnJyksXG4gICAgICAgICAgICBpZDogICAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgJycsXG4gICAgICAgICAgICBTbmlwcGV0OiAgICAgbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsICdTbmlwcGV0JylbMF0sICcnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGlyZWN0aW9uczogW1xuICAgICAgICAgICAgJ2Y9ZCcsXG4gICAgICAgICAgICAnc291cmNlPUdlb1hNTDMnXG4gICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGFkZCBleHRlbmRlZCBkYXRhIHRvIHZhcmlhYmxlc1xuICAgICAgICB2YXIgZXh0RGF0YU5vZGVzID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ0V4dGVuZGVkRGF0YScpO1xuICAgICAgICBpZiAoISFleHREYXRhTm9kZXMgJiYgZXh0RGF0YU5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgZGF0YU5vZGVzID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUoZXh0RGF0YU5vZGVzWzBdLCAnRGF0YScpO1xuICAgICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YU5vZGVzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICB2YXIgZG4gICAgPSBkYXRhTm9kZXNbZF07XG4gICAgICAgICAgICB2YXIgbmFtZSAgPSBkbi5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICAgICAgICAgIGlmICghbmFtZSkgY29udGludWU7XG4gICAgICAgICAgICB2YXIgZE5hbWUgPSBub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUoZG4sICdkaXNwbGF5TmFtZScpWzBdLCBuYW1lKTtcbiAgICAgICAgICAgIHZhciB2YWwgICA9IG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShkbiwgJ3ZhbHVlJylbMF0pO1xuXG4gICAgICAgICAgICBwbGFjZW1hcmsudmFycy52YWxbbmFtZV0gICAgID0gdmFsO1xuICAgICAgICAgICAgcGxhY2VtYXJrLnZhcnMuZGlzcGxheVtuYW1lXSA9IGROYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByb2Nlc3MgTXVsdGlHZW9tZXRyeVxuICAgICAgICB2YXIgR2VvbWV0cnlOb2RlcyA9IGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsICdjb29yZGluYXRlcycpO1xuICAgICAgICB2YXIgR2VvbWV0cnkgPSBudWxsO1xuICAgICAgICBpZiAoISFHZW9tZXRyeU5vZGVzICYmIChHZW9tZXRyeU5vZGVzLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgZm9yICh2YXIgZ249MDtnbjxHZW9tZXRyeU5vZGVzLmxlbmd0aDtnbisrKSB7XG4gICAgICAgICAgICBpZiAoR2VvbWV0cnlOb2Rlc1tnbl0ucGFyZW50Tm9kZSAmJlxuICAgICAgICAgICAgICAgIEdlb21ldHJ5Tm9kZXNbZ25dLnBhcmVudE5vZGUubm9kZU5hbWUpIHtcbiAgICAgICAgICAgICAgdmFyIEdlb21ldHJ5UE4gPSBHZW9tZXRyeU5vZGVzW2duXS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICBHZW9tZXRyeSA9IEdlb21ldHJ5UE4ubm9kZU5hbWU7XG5cbiAgICAgICAgICAgICAgLy8gRXh0cmFjdCB0aGUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgLy8gV2hhdCBzb3J0IG9mIHBsYWNlbWFyaz9cbiAgICAgICAgICAgICAgc3dpdGNoKEdlb21ldHJ5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgICAgICAgICAgICBwbGFjZW1hcmsuUG9pbnQgPSBwcm9jZXNzUGxhY2VtYXJrQ29vcmRzKG5vZGUsIFwiUG9pbnRcIilbMF07XG4gICAgICAgICAgICAgICAgICBwbGFjZW1hcmsubGF0bG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwbGFjZW1hcmsuUG9pbnQuY29vcmRpbmF0ZXNbMF0ubGF0LCBwbGFjZW1hcmsuUG9pbnQuY29vcmRpbmF0ZXNbMF0ubG5nKTtcbiAgICAgICAgICAgICAgICAgIHBhdGhMZW5ndGggPSAxO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkxpbmVhclJpbmdcIjpcbiAgICAgICAgICAgICAgICAgIC8vIFBvbHlnb24vbGluZVxuICAgICAgICAgICAgICAgICAgcG9seWdvbk5vZGVzID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ1BvbHlnb24nKTtcbiAgICAgICAgICAgICAgICAgIC8vIFBvbHlnb25cbiAgICAgICAgICAgICAgICAgIGlmICghcGxhY2VtYXJrLlBvbHlnb24pXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWFyay5Qb2x5Z29uID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICBvdXRlckJvdW5kYXJ5SXM6IHtjb29yZGluYXRlczogW119LFxuICAgICAgICAgICAgICAgICAgICAgIGlubmVyQm91bmRhcnlJczogW3tjb29yZGluYXRlczogW119XVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIHBnPTA7cGc8cG9seWdvbk5vZGVzLmxlbmd0aDtwZysrKSB7XG4gICAgICAgICAgICAgICAgICAgICBwbGFjZW1hcmsuUG9seWdvbltwZ10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgIG91dGVyQm91bmRhcnlJczoge2Nvb3JkaW5hdGVzOiBbXX0sXG4gICAgICAgICAgICAgICAgICAgICAgIGlubmVyQm91bmRhcnlJczogW3tjb29yZGluYXRlczogW119XVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgcGxhY2VtYXJrLlBvbHlnb25bcGddLm91dGVyQm91bmRhcnlJcyA9IHByb2Nlc3NQbGFjZW1hcmtDb29yZHMocG9seWdvbk5vZGVzW3BnXSwgXCJvdXRlckJvdW5kYXJ5SXNcIik7XG4gICAgICAgICAgICAgICAgICAgICBwbGFjZW1hcmsuUG9seWdvbltwZ10uaW5uZXJCb3VuZGFyeUlzID0gcHJvY2Vzc1BsYWNlbWFya0Nvb3Jkcyhwb2x5Z29uTm9kZXNbcGddLCBcImlubmVyQm91bmRhcnlJc1wiKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvb3JkTGlzdCA9IHBsYWNlbWFyay5Qb2x5Z29uWzBdLm91dGVyQm91bmRhcnlJcztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgICAgICAgIHBhdGhMZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgcGxhY2VtYXJrLkxpbmVTdHJpbmcgPSBwcm9jZXNzUGxhY2VtYXJrQ29vcmRzKG5vZGUsXCJMaW5lU3RyaW5nXCIpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWxsIHRoZSBjdXN0b20gcGxhY2VtYXJrIHBhcnNlIGZ1bmN0aW9uIGlmIGl0IGlzIGRlZmluZWRcbiAgICAgICAgaWYgKCEhcGFyc2VyT3B0aW9ucy5wbVBhcnNlRm4pIHBhcnNlck9wdGlvbnMucG1QYXJzZUZuKG5vZGUsIHBsYWNlbWFyayk7XG4gICAgICAgIGRvYy5wbGFjZW1hcmtzLnB1c2gocGxhY2VtYXJrKTtcblxuICAgICAgICAvLyBzaW5nbGUgbWFya2VyXG4gICAgICAgIGlmIChwbGFjZW1hcmsuUG9pbnQpIHtcbiAgICAgICAgICBpZiAoISFnb29nbGUubWFwcykge1xuICAgICAgICAgICAgZG9jLmJvdW5kcyA9IGRvYy5ib3VuZHMgfHwgbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICAgICAgICAgICAgZG9jLmJvdW5kcy5leHRlbmQocGxhY2VtYXJrLmxhdGxuZyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUG90ZW50aWFsIHVzZXItZGVmaW5lZCBtYXJrZXIgaGFuZGxlclxuICAgICAgICAgIHZhciBwb2ludENyZWF0ZUZ1bmMgPSBwYXJzZXJPcHRpb25zLmNyZWF0ZU1hcmtlciB8fCBjcmVhdGVNYXJrZXI7XG4gICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgaWYgKCFwYXJzZXJPcHRpb25zLmNyZWF0ZU1hcmtlcikge1xuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoaXMgbWFya2VyIHdhcyBjcmVhdGVkIG9uIGEgcHJldmlvdXMgbG9hZCBvZiB0aGlzIGRvY3VtZW50XG4gICAgICAgICAgICBpZiAoISFkb2MpIHtcbiAgICAgICAgICAgICAgZG9jLm1hcmtlcnMgPSBkb2MubWFya2VycyB8fCBbXTtcbiAgICAgICAgICAgICAgaWYgKGRvYy5yZWxvYWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvYy5tYXJrZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoZG9jLm1hcmtlcnNbal0uaWQgPT0gcGxhY2VtYXJrLmlkKSB8fFxuXHRcdFx0Ly8gaWYgbm8gaWQsIGNoZWNrIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAoIWRvYy5tYXJrZXJzW2pdLmlkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgKGRvYy5tYXJrZXJzW2pdLmdldFBvc2l0aW9uKCkuZXF1YWxzKHBsYWNlbWFyay5sYXRsbmcpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBkb2MubWFya2Vyc1tqXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgbWFya2VyIGNyZWF0b3JcbiAgICAgICAgICAgIHZhciBtYXJrZXIgPSBwb2ludENyZWF0ZUZ1bmMocGxhY2VtYXJrLCBkb2MpO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikge1xuICAgICAgICAgICAgICBtYXJrZXIuYWN0aXZlID0gcGxhY2VtYXJrLnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgIG1hcmtlci5pZCA9IHBsYWNlbWFyay5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcG9seWdvbi9saW5lXG4gICAgICAgIHZhciBwb2x5LCBsaW5lO1xuICAgICAgICBpZiAoISFkb2MpIHtcbiAgICAgICAgICBpZiAocGxhY2VtYXJrLlBvbHlnb24pICAgIGRvYy5ncG9seWdvbnMgID0gZG9jLmdwb2x5Z29ucyAgfHwgW107XG4gICAgICAgICAgaWYgKHBsYWNlbWFyay5MaW5lU3RyaW5nKSBkb2MuZ3BvbHlsaW5lcyA9IGRvYy5ncG9seWxpbmVzIHx8IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvbHlDcmVhdGVGdW5jID0gcGFyc2VyT3B0aW9ucy5jcmVhdGVQb2x5Z29uICAgIHx8IGNyZWF0ZVBvbHlnb247XG4gICAgICAgIHZhciBsaW5lQ3JlYXRlRnVuYyA9IHBhcnNlck9wdGlvbnMuY3JlYXRlTGluZVN0cmluZyB8fCBjcmVhdGVQb2x5bGluZTtcbiAgICAgICAgaWYgKHBsYWNlbWFyay5Qb2x5Z29uKSB7XG4gICAgICAgICAgcG9seSA9IHBvbHlDcmVhdGVGdW5jKHBsYWNlbWFyayxkb2MpO1xuICAgICAgICAgIGlmIChwb2x5KSBwb2x5LmFjdGl2ZSA9IHBsYWNlbWFyay52aXNpYmlsaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZW1hcmsuTGluZVN0cmluZykge1xuICAgICAgICAgIGxpbmUgPSBsaW5lQ3JlYXRlRnVuYyhwbGFjZW1hcmssZG9jKTtcbiAgICAgICAgICBpZiAobGluZSkgbGluZS5hY3RpdmUgPSBwbGFjZW1hcmsudmlzaWJpbGl0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISFnb29nbGUubWFwcykge1xuICAgICAgICAgIGRvYy5ib3VuZHMgPSBkb2MuYm91bmRzIHx8IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgICAgICBpZiAocG9seSkgZG9jLmJvdW5kcy51bmlvbihwb2x5LmJvdW5kcyk7XG4gICAgICAgICAgaWYgKGxpbmUpIGRvYy5ib3VuZHMudW5pb24obGluZS5ib3VuZHMpO1xuICAgICAgICB9XG5cbiAgICAgIH0gLy8gcGxhY2VtYXJrIGxvb3BcblxuICAgICAgaWYgKCEhZG9jLnJlbG9hZCAmJiAhIWRvYy5tYXJrZXJzKSB7XG4gICAgICAgIGZvciAoaSA9IGRvYy5tYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMCA7IGktLSkge1xuICAgICAgICAgIGlmICghZG9jLm1hcmtlcnNbaV0uYWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAoISFkb2MubWFya2Vyc1tpXS5pbmZvV2luZG93KSB7XG4gICAgICAgICAgICAgIGRvYy5tYXJrZXJzW2ldLmluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvYy5tYXJrZXJzW2ldLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgIGRvYy5tYXJrZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUGFyc2UgZ3JvdW5kIG92ZXJsYXlzXG4gICAgICBpZiAoISFkb2MucmVsb2FkICYmICEhZG9jLmdyb3VuZG92ZXJsYXlzKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkb2MuZ3JvdW5kb3ZlcmxheXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkb2MuZ3JvdW5kb3ZlcmxheXNbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCEhZG9jKSB7XG4gICAgICAgIGRvYy5ncm91bmRvdmVybGF5cyA9IGRvYy5ncm91bmRvdmVybGF5cyB8fCBbXTtcbiAgICAgIH1cbiAgICAgIC8vIGRvYy5ncm91bmRvdmVybGF5cyA9W107XG4gICAgICB2YXIgZ3JvdW5kT3ZlcmxheSwgY29sb3IsIHRyYW5zcGFyZW5jeSwgb3ZlcmxheTtcbiAgICAgIHZhciBncm91bmROb2RlcyA9IGdldEVsZW1lbnRzQnlUYWdOYW1lKHJlc3BvbnNlWE1MLCAnR3JvdW5kT3ZlcmxheScpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdyb3VuZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5vZGUgPSBncm91bmROb2Rlc1tpXTtcblxuICAgICAgICAvLyBEZXRlY3QgaW1hZ2VzIGJ1cmllZCBpbiBLTVogZmlsZXMgKGFuZCB1c2UgYSBiYXNlNjQgZW5jb2RlZCBVUkwpXG4gICAgICAgIHZhciBnblVybCA9IGNsZWFuVVJMKCBkb2MuYmFzZURpciwgbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsICdocmVmJylbMF0pICk7XG4gICAgICAgIGlmIChrbXpNZXRhRGF0YVtnblVybF0pIGduVXJsID0ga216TWV0YURhdGFbZ25VcmxdLmRhdGFVcmw7XG5cbiAgICAgICAgLy8gSW5pdCB0aGUgZ3JvdW5kIG92ZXJsYXkgb2JqZWN0XG4gICAgICAgIGdyb3VuZE92ZXJsYXkgPSB7XG4gICAgICAgICAgbmFtZTogICAgICAgIG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShub2RlLCAnbmFtZScpWzBdKSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsICdkZXNjcmlwdGlvbicpWzBdKSxcbiAgICAgICAgICBpY29uOiB7IGhyZWY6IGduVXJsIH0sXG4gICAgICAgICAgbGF0TG9uQm94OiB7XG4gICAgICAgICAgICBub3J0aDogcGFyc2VGbG9hdChub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ25vcnRoJylbMF0pKSxcbiAgICAgICAgICAgIGVhc3Q6ICBwYXJzZUZsb2F0KG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShub2RlLCAnZWFzdCcpWzBdKSksXG4gICAgICAgICAgICBzb3V0aDogcGFyc2VGbG9hdChub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ3NvdXRoJylbMF0pKSxcbiAgICAgICAgICAgIHdlc3Q6ICBwYXJzZUZsb2F0KG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShub2RlLCAnd2VzdCcpWzBdKSlcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmICghIWdvb2dsZS5tYXBzKSB7XG4gICAgICAgICAgZG9jLmJvdW5kcyA9IGRvYy5ib3VuZHMgfHwgbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICAgICAgICAgIGRvYy5ib3VuZHMudW5pb24obmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyhcbiAgICAgICAgICAgIG5ldyBnb29nbGUubWFwcy5MYXRMbmcoZ3JvdW5kT3ZlcmxheS5sYXRMb25Cb3guc291dGgsIGdyb3VuZE92ZXJsYXkubGF0TG9uQm94Lndlc3QpLFxuICAgICAgICAgICAgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhncm91bmRPdmVybGF5LmxhdExvbkJveC5ub3J0aCwgZ3JvdW5kT3ZlcmxheS5sYXRMb25Cb3guZWFzdClcbiAgICAgICAgICApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9wYWNpdHkgaXMgZW5jb2RlZCBpbiB0aGUgY29sb3Igbm9kZVxuICAgICAgICB2YXIgY29sb3JOb2RlID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ2NvbG9yJyk7XG4gICAgICAgIGlmIChjb2xvck5vZGUgJiYgY29sb3JOb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBncm91bmRPdmVybGF5Lm9wYWNpdHkgPSBnZW9YTUwzLmdldE9wYWNpdHkobm9kZVZhbHVlKGNvbG9yTm9kZVswXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyb3VuZE92ZXJsYXkub3BhY2l0eSA9IDEuMDsgIC8vIEtNTCBkZWZhdWx0XG4gICAgICAgIH1cblxuICAgICAgICBkb2MuZ3JvdW5kb3ZlcmxheXMucHVzaChncm91bmRPdmVybGF5KTtcbiAgICAgICAgaWYgKCEhcGFyc2VyT3B0aW9ucy5jcmVhdGVPdmVybGF5KSB7XG4gICAgICAgICAgLy8gVXNlci1kZWZpbmVkIG92ZXJsYXkgaGFuZGxlclxuICAgICAgICAgIHBhcnNlck9wdGlvbnMuY3JlYXRlT3ZlcmxheShncm91bmRPdmVybGF5LCBkb2MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGlzIG92ZXJsYXkgd2FzIGNyZWF0ZWQgb24gYSBwcmV2aW91cyBsb2FkIG9mIHRoaXMgZG9jdW1lbnRcbiAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoISFkb2MpIHtcbiAgICAgICAgICAgIGRvYy5ncm91bmRvdmVybGF5cyA9IGRvYy5ncm91bmRvdmVybGF5cyB8fCBbXTtcbiAgICAgICAgICAgIGlmIChkb2MucmVsb2FkKSB7XG4gICAgICAgICAgICAgIG92ZXJsYXlCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKFxuICAgICAgICAgICAgICAgIG5ldyBnb29nbGUubWFwcy5MYXRMbmcoZ3JvdW5kT3ZlcmxheS5sYXRMb25Cb3guc291dGgsIGdyb3VuZE92ZXJsYXkubGF0TG9uQm94Lndlc3QpLFxuICAgICAgICAgICAgICAgIG5ldyBnb29nbGUubWFwcy5MYXRMbmcoZ3JvdW5kT3ZlcmxheS5sYXRMb25Cb3gubm9ydGgsIGdyb3VuZE92ZXJsYXkubGF0TG9uQm94LmVhc3QpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHZhciBvdmVybGF5cyA9IGRvYy5ncm91bmRvdmVybGF5cztcbiAgICAgICAgICAgICAgZm9yIChpID0gb3ZlcmxheXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICAgICAgaWYgKChvdmVybGF5c1tpXS5ib3VuZHMoKS5lcXVhbHMob3ZlcmxheUJvdW5kcykpICYmXG4gICAgICAgICAgICAgICAgICAgIChvdmVybGF5cy51cmxfID09PSBncm91bmRPdmVybGF5Lmljb24uaHJlZikpIHtcbiAgICAgICAgICAgICAgICAgIGZvdW5kID0gb3ZlcmxheXNbaV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIGJ1aWx0LWluIG92ZXJsYXkgY3JlYXRvclxuICAgICAgICAgICAgb3ZlcmxheSA9IGNyZWF0ZU92ZXJsYXkoZ3JvdW5kT3ZlcmxheSwgZG9jKTtcbiAgICAgICAgICAgIG92ZXJsYXkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhZG9jLnJlbG9hZCAmJiAhIWRvYy5ncm91bmRvdmVybGF5cyAmJiAhIWRvYy5ncm91bmRvdmVybGF5cy5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgb3ZlcmxheXMgPSBkb2MuZ3JvdW5kb3ZlcmxheXM7XG4gICAgICAgICAgZm9yIChpID0gb3ZlcmxheXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBpZiAoIW92ZXJsYXlzW2ldLmFjdGl2ZSkge1xuICAgICAgICAgICAgICBvdmVybGF5c1tpXS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgb3ZlcmxheXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkb2MuZ3JvdW5kb3ZlcmxheXMgPSBvdmVybGF5cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBQYXJzZSBuZXR3b3JrIGxpbmtzXG4gICAgICB2YXIgbmV0d29ya0xpbms7XG4gICAgICB2YXIgZG9jUGF0aCA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICBkb2NQYXRoID0gZG9jUGF0aC5zcGxpY2UoMCwgZG9jUGF0aC5sZW5ndGggLSAxKS5qb2luKCcvJyk7XG4gICAgICB2YXIgbGlua05vZGVzID0gZ2V0RWxlbWVudHNCeVRhZ05hbWUocmVzcG9uc2VYTUwsICdOZXR3b3JrTGluaycpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxpbmtOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBub2RlID0gbGlua05vZGVzW2ldO1xuXG4gICAgICAgIC8vIEluaXQgdGhlIG5ldHdvcmsgbGluayBvYmplY3RcbiAgICAgICAgbmV0d29ya0xpbmsgPSB7XG4gICAgICAgICAgbmFtZTogbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsICduYW1lJylbMF0pLFxuICAgICAgICAgIGxpbms6IHtcbiAgICAgICAgICAgIGhyZWY6ICAgICAgICBub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ2hyZWYnKVswXSksXG4gICAgICAgICAgICByZWZyZXNoTW9kZTogbm9kZVZhbHVlKGdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsICdyZWZyZXNoTW9kZScpWzBdKVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBFc3RhYmxpc2ggdGhlIHNwZWNpZmljIHJlZnJlc2ggbW9kZVxuICAgICAgICBpZiAoIW5ldHdvcmtMaW5rLmxpbmsucmVmcmVzaE1vZGUpIHtcbiAgICAgICAgICBuZXR3b3JrTGluay5saW5rLnJlZnJlc2hNb2RlID0gJ29uQ2hhbmdlJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV0d29ya0xpbmsubGluay5yZWZyZXNoTW9kZSA9PT0gJ29uSW50ZXJ2YWwnKSB7XG4gICAgICAgICAgbmV0d29ya0xpbmsubGluay5yZWZyZXNoSW50ZXJ2YWwgPSBwYXJzZUZsb2F0KG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShub2RlLCAncmVmcmVzaEludGVydmFsJylbMF0pKTtcbiAgICAgICAgICBpZiAoaXNOYU4obmV0d29ya0xpbmsubGluay5yZWZyZXNoSW50ZXJ2YWwpKSB7XG4gICAgICAgICAgICBuZXR3b3JrTGluay5saW5rLnJlZnJlc2hJbnRlcnZhbCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5ldHdvcmtMaW5rLmxpbmsucmVmcmVzaE1vZGUgPT09ICdvbkNoYW5nZScpIHtcbiAgICAgICAgICBuZXR3b3JrTGluay5saW5rLnZpZXdSZWZyZXNoTW9kZSA9IG5vZGVWYWx1ZShnZXRFbGVtZW50c0J5VGFnTmFtZShub2RlLCAndmlld1JlZnJlc2hNb2RlJylbMF0pO1xuICAgICAgICAgIGlmICghbmV0d29ya0xpbmsubGluay52aWV3UmVmcmVzaE1vZGUpIHtcbiAgICAgICAgICAgIG5ldHdvcmtMaW5rLmxpbmsudmlld1JlZnJlc2hNb2RlID0gJ25ldmVyJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5ldHdvcmtMaW5rLmxpbmsudmlld1JlZnJlc2hNb2RlID09PSAnb25TdG9wJykge1xuICAgICAgICAgICAgbmV0d29ya0xpbmsubGluay52aWV3UmVmcmVzaFRpbWUgPSBub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ3JlZnJlc2hNb2RlJylbMF0pO1xuICAgICAgICAgICAgbmV0d29ya0xpbmsubGluay52aWV3Rm9ybWF0ID0gICAgICBub2RlVmFsdWUoZ2V0RWxlbWVudHNCeVRhZ05hbWUobm9kZSwgJ3JlZnJlc2hNb2RlJylbMF0pO1xuICAgICAgICAgICAgaWYgKCFuZXR3b3JrTGluay5saW5rLnZpZXdGb3JtYXQpIHtcbiAgICAgICAgICAgICAgbmV0d29ya0xpbmsubGluay52aWV3Rm9ybWF0ID0gJ0JCT1g9W2Jib3hXZXN0XSxbYmJveFNvdXRoXSxbYmJveEVhc3RdLFtiYm94Tm9ydGhdJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIS9eW1xcL3xodHRwXS8udGVzdChuZXR3b3JrTGluay5saW5rLmhyZWYpKSB7XG4gICAgICAgICAgLy8gRnVsbHktcXVhbGlmeSB0aGUgSFJFRlxuICAgICAgICAgIG5ldHdvcmtMaW5rLmxpbmsuaHJlZiA9IGRvY1BhdGggKyAnLycgKyBuZXR3b3JrTGluay5saW5rLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBcHBseSB0aGUgbGlua1xuICAgICAgICBpZiAoKG5ldHdvcmtMaW5rLmxpbmsucmVmcmVzaE1vZGUgPT09ICdvbkludGVydmFsJykgJiZcbiAgICAgICAgICAgIChuZXR3b3JrTGluay5saW5rLnJlZnJlc2hJbnRlcnZhbCA+IDApKSB7XG4gICAgICAgICAgLy8gUmVsb2FkIGF0IHJlZ3VsYXIgaW50ZXJ2YWxzXG4gICAgICAgICAgc2V0SW50ZXJ2YWwocGFyc2VyTmFtZSArICcucGFyc2UoXCInICsgbmV0d29ya0xpbmsubGluay5ocmVmICsgJ1wiKScsXG4gICAgICAgICAgICAgICAgICAgICAgMTAwMCAqIG5ldHdvcmtMaW5rLmxpbmsucmVmcmVzaEludGVydmFsKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXR3b3JrTGluay5saW5rLnJlZnJlc2hNb2RlID09PSAnb25DaGFuZ2UnKSB7XG4gICAgICAgICAgaWYgKG5ldHdvcmtMaW5rLmxpbmsudmlld1JlZnJlc2hNb2RlID09PSAnbmV2ZXInKSB7XG4gICAgICAgICAgICAvLyBMb2FkIHRoZSBsaW5rIGp1c3Qgb25jZVxuICAgICAgICAgICAgZG9jLmludGVybmFscy5wYXJzZXIucGFyc2UobmV0d29ya0xpbmsubGluay5ocmVmLCBkb2MuaW50ZXJuYWxzLmRvY1NldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChuZXR3b3JrTGluay5saW5rLnZpZXdSZWZyZXNoTW9kZSA9PT0gJ29uU3RvcCcpIHtcbiAgICAgICAgICAgIC8vIFJlbG9hZCB3aGVuIHRoZSBtYXAgdmlldyBjaGFuZ2VzXG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoISFkb2MuYm91bmRzKSB7XG4gICAgICBkb2MuaW50ZXJuYWxzLmJvdW5kcyA9IGRvYy5pbnRlcm5hbHMuYm91bmRzIHx8IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgIGRvYy5pbnRlcm5hbHMuYm91bmRzLnVuaW9uKGRvYy5ib3VuZHMpO1xuICAgIH1cbiAgICBpZiAoISFkb2MubWFya2VycyB8fCAhIWRvYy5ncm91bmRvdmVybGF5cyB8fCAhIWRvYy5ncG9seWxpbmVzIHx8ICEhZG9jLmdwb2x5Z29ucykge1xuICAgICAgZG9jLmludGVybmFscy5wYXJzZU9ubHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWRvYy5pbnRlcm5hbHMucGFyc2VPbmx5KSB7XG4gICAgICAvLyBnZW9YTUwzIGlzIG5vdCBiZWluZyB1c2VkIG9ubHkgYXMgYSByZWFsLXRpbWUgcGFyc2VyLCBzbyBrZWVwIHRoZSBwcm9jZXNzZWQgZG9jdW1lbnRzIGFyb3VuZFxuICAgICAgaWYgKGRvYy5iYXNlVXJsKXsgLy8gaGFuZGxlIGNhc2UgZnJvbSBwYXJzZUttbFN0cmluZyAobm8gZG9jLmJhc2VVcmwpXG4gICAgICAgIGlmICghZG9jc0J5VXJsW2RvYy5iYXNlVXJsXSkge1xuICAgICAgICAgIGRvY3MucHVzaChkb2MpO1xuICAgICAgICAgIGRvY3NCeVVybFtkb2MuYmFzZVVybF0gPSBkb2M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaW50ZXJuYWwgcmVwbGFjZW1lbnQsIHdoaWNoIGtlZXBzIHRoZSBzYW1lIG1lbW9yeSByZWYgbG9jIGluIGRvY3MgYW5kIGRvY3NCeVVybFxuICAgICAgICAgIGZvciAodmFyIGkgaW4gZG9jc0J5VXJsW2RvYy5iYXNlVXJsXSkge1xuICAgICAgICAgICAgZG9jc0J5VXJsW2RvYy5iYXNlVXJsXVtpXSA9IGRvY1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBkb2MuaW50ZXJuYWxzLnJlbWFpbmluZy0tO1xuICAgIGlmIChkb2MuaW50ZXJuYWxzLnJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgLy8gV2UncmUgZG9uZSBwcm9jZXNzaW5nIHRoaXMgc2V0IG9mIEtNTCBkb2N1bWVudHNcbiAgICAgIC8vIE9wdGlvbnMgdGhhdCBnZXQgaW52b2tlZCBhZnRlciBwYXJzaW5nIGNvbXBsZXRlc1xuICAgICAgaWYgKHBhcnNlck9wdGlvbnMuem9vbSAmJiAhIWRvYy5pbnRlcm5hbHMuYm91bmRzICYmXG5cdCAgIWRvYy5pbnRlcm5hbHMuYm91bmRzLmlzRW1wdHkoKSAmJiAhIXBhcnNlck9wdGlvbnMubWFwKSB7XG4gICAgICAgIHBhcnNlck9wdGlvbnMubWFwLmZpdEJvdW5kcyhkb2MuaW50ZXJuYWxzLmJvdW5kcyk7XG4gICAgICB9XG4gICAgICBpZiAocGFyc2VyT3B0aW9ucy5hZnRlclBhcnNlKSB7XG4gICAgICAgIHBhcnNlck9wdGlvbnMuYWZ0ZXJQYXJzZShkb2MuaW50ZXJuYWxzLmRvY1NldCk7XG4gICAgICB9XG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKGRvYy5pbnRlcm5hbHMucGFyc2VyLCAncGFyc2VkJyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBrbWxDb2xvciA9IGZ1bmN0aW9uIChrbWxJbiwgY29sb3JNb2RlKSB7XG4gICAgdmFyIGttbENvbG9yID0ge307XG4gICAga21sSW4gPSBrbWxJbiB8fCAnZmZmZmZmZmYnOyAgLy8gd2hpdGUgKEtNTCAyLjIgZGVmYXVsdClcblxuICAgIHZhciBhYSA9IGttbEluLnN1YnN0cigwLDIpO1xuICAgIHZhciBiYiA9IGttbEluLnN1YnN0cigyLDIpO1xuICAgIHZhciBnZyA9IGttbEluLnN1YnN0cig0LDIpO1xuICAgIHZhciByciA9IGttbEluLnN1YnN0cig2LDIpO1xuXG4gICAga21sQ29sb3Iub3BhY2l0eSA9IHBhcnNlSW50KGFhLCAxNikgLyAyNTY7XG4gICAga21sQ29sb3IuY29sb3IgICA9IChjb2xvck1vZGUgPT09ICdyYW5kb20nKSA/IHJhbmRvbUNvbG9yKHJyLCBnZywgYmIpIDogJyMnICsgcnIgKyBnZyArIGJiO1xuICAgIHJldHVybiBrbWxDb2xvcjtcbiAgfTtcblxuICAvLyBJbXBsZW1lbnRlZCBwZXIgS01MIDIuMiA8Q29sb3JTdHlsZT4gc3BlY3NcbiAgdmFyIHJhbmRvbUNvbG9yID0gZnVuY3Rpb24ocnIsIGdnLCBiYikge1xuICAgIHZhciBjb2wgPSB7IHJyOiByciwgZ2c6IGdnLCBiYjogYmIgfTtcbiAgICBmb3IgKHZhciBrIGluIGNvbCkge1xuICAgICAgdmFyIHYgPSBjb2xba107XG4gICAgICBpZiAodiA9PSBudWxsKSB2ID0gJ2ZmJztcblxuICAgICAgLy8gUkdCIHZhbHVlcyBhcmUgbGltaXRlcnMgZm9yIHJhbmRvbSBudW1iZXJzIChpZTogN2Ygd291bGQgYmUgYSByYW5kb20gdmFsdWUgYmV0d2VlbiAwIGFuZCA3ZilcbiAgICAgIHYgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBwYXJzZUludChyciwgMTYpKS50b1N0cmluZygxNik7XG4gICAgICBpZiAodi5sZW5ndGggPT09IDEpIHYgPSAnMCcgKyB2O1xuICAgICAgY29sW2tdID0gdjtcbiAgICB9XG5cbiAgICByZXR1cm4gJyMnICsgY29sLnJyICsgY29sLmdnICsgY29sLmJiO1xuICB9O1xuXG4gIHZhciBwcm9jZXNzU3R5bGVJRCA9IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgIHZhciBpY29uID0gc3R5bGUuaWNvbjtcbiAgICBpZiAoIWljb24gfHwgIWljb24uaHJlZikgcmV0dXJuO1xuXG4gICAgaWYgKGljb24uaW1nICYmICFpY29uLmltZy5jb21wbGV0ZSAmJiAoaWNvbi5kaW0udyA8IDApICYmIChpY29uLmRpbS5oIDwgMCkgKSB7XG4gICAgICAvLyB3ZSdyZSBzdGlsbCB3YWl0aW5nIG9uIHRoZSBpbWFnZSBsb2FkaW5nIChwcm9iYWJseSBiZWNhdXNlIHdlJ3ZlIGJlZW4gYmxvY2tpbmcgc2luY2UgdGhlIGRlY2xhcmF0aW9uKVxuICAgICAgLy8gc28sIGxldCdzIHF1ZXVlIHRoaXMgZnVuY3Rpb24gb24gdGhlIG9ubG9hZCBzdGFja1xuICAgICAgaWNvbi5tYXJrZXJCYWNrbG9nID0gW107XG4gICAgICBpY29uLmltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGljb24uZGltLncgPCAwIHx8IGljb24uZGltLmggPCAwKSB7XG4gICAgICAgICAgaWNvbi5kaW0udyA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgaWNvbi5kaW0uaCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGljb24uZGltLnRoID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcHJvY2Vzc1N0eWxlSUQoc3R5bGUpO1xuXG4gICAgICAgIC8vIHdlIHdpbGwgdW5kb3VidGVkbHkgZ2V0IHNvbWUgY3JlYXRlTWFya2VyIHF1ZXVpbmcsIHNvIHNldCB0aGlzIHVwIGluIGFkdmFuY2VcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpY29uLm1hcmtlckJhY2tsb2cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgcCA9IGljb24ubWFya2VyQmFja2xvZ1tpXVswXTtcbiAgICAgICAgICB2YXIgZCA9IGljb24ubWFya2VyQmFja2xvZ1tpXVsxXTtcbiAgICAgICAgICBjcmVhdGVNYXJrZXIocCwgZCk7XG4gICAgICAgICAgaWYgKHAubWFya2VyKSBwLm1hcmtlci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBpY29uLm1hcmtlckJhY2tsb2c7XG4gICAgICB9O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHsgLy9pZiAoaWNvbi5kaW0udyA8IDAgfHwgaWNvbi5kaW0uaCA8IDApIHtcbiAgICAgIGlmIChpY29uLmltZyAmJiBpY29uLmltZy5jb21wbGV0ZSkge1xuICAgICAgICAvLyBzb21ldGltZXMgdGhlIGZpbGUgaXMgYWxyZWFkeSBjYWNoZWQgYW5kIGl0IG5ldmVyIGNhbGxzIG9uTG9hZFxuICAgICAgICBpZiAoaWNvbi5kaW0udyA8IDAgfHwgaWNvbi5kaW0uaCA8IDApIHtcbiAgICAgICAgaWNvbi5kaW0udyA9IGljb24uaW1nLndpZHRoO1xuICAgICAgICBpY29uLmRpbS5oID0gaWNvbi5pbWcuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGljb24uZGltLnRoID0gaWNvbi5pbWcuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gc2V0dGxlIGZvciBhIGRlZmF1bHQgb2YgMzJ4MzJcbiAgICAgICAgaWNvbi5kaW0ud2hHdWVzcyA9IHRydWU7XG4gICAgICAgIGljb24uZGltLncgPSAzMjtcbiAgICAgICAgaWNvbi5kaW0uaCA9IDMyO1xuICAgICAgICBpY29uLmRpbS50aCA9IDMyO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByZS1zY2FsZWQgdmFyaWFibGVzXG4gICAgdmFyIHJuZCA9IE1hdGgucm91bmQ7XG4gICAgdmFyIHkgPSBpY29uLmRpbS55O1xuICAgIGlmICh0eXBlb2YgaWNvbi5kaW0udGggIT09ICd1bmRlZmluZWQnICYmIGljb24uZGltLnRoICE9IGljb24uZGltLmgpIHsgLy8gcGFsZXR0ZSAtIHJldmVyc2Uga21sIHkgZm9yIG1hcHNcbiAgICAgIHkgPSBNYXRoLmFicyh5IC0gKGljb24uZGltLnRoIC0gaWNvbi5kaW0uaCkpO1xuICAgIH1cblxuICAgIHZhciBzY2FsZWQgPSB7XG4gICAgICB4OiAgaWNvbi5kaW0ueCAgICAgKiBpY29uLnNjYWxlLFxuICAgICAgeTogeSAqIGljb24uc2NhbGUsXG4gICAgICB3OiAgaWNvbi5kaW0udyAgICAgKiBpY29uLnNjYWxlLFxuICAgICAgaDogIGljb24uZGltLmggICAgICogaWNvbi5zY2FsZSxcbiAgICAgIGFYOiBpY29uLmhvdFNwb3QueCAqIGljb24uc2NhbGUsXG4gICAgICBhWTogaWNvbi5ob3RTcG90LnkgKiBpY29uLnNjYWxlLFxuICAgICAgaVc6IChpY29uLmltZyA/IGljb24uaW1nLndpZHRoICA6IGljb24uZGltLncpICogaWNvbi5zY2FsZSxcbiAgICAgIGlIOiAoaWNvbi5pbWcgPyBpY29uLmltZy5oZWlnaHQgOiBpY29uLmRpbS5oKSAqIGljb24uc2NhbGVcbiAgICB9O1xuXG4gICAgLy8gRmlndXJlIG91dCB0aGUgYW5jaG9yIHNwb3RcbiAgICAvLyBPcmlnaW5zLCBhbmNob3IgcG9zaXRpb25zIGFuZCBjb29yZGluYXRlcyBvZiB0aGUgbWFya2VyIGluY3JlYXNlIGluIHRoZSBYIGRpcmVjdGlvbiB0byB0aGUgcmlnaHQgYW5kIGluXG4gICAgLy8gdGhlIFkgZGlyZWN0aW9uIGRvd24uXG4gICAgdmFyIGFYLCBhWTtcbiAgICBzd2l0Y2ggKGljb24uaG90U3BvdC54dW5pdHMpIHtcbiAgICAgIGNhc2UgJ2ZyYWN0aW9uJzogICAgYVggPSBybmQoc2NhbGVkLmFYICogaWNvbi5kaW0udyk7IGJyZWFrO1xuICAgICAgY2FzZSAnaW5zZXRQaXhlbHMnOiBhWCA9IHJuZChpY29uLmRpbS53ICogaWNvbi5zY2FsZSAtIHNjYWxlZC5hWCk7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogICAgICAgICAgICBhWCA9IHJuZChzY2FsZWQuYVgpOyBicmVhazsgIC8vIGFscmVhZHkgcGl4ZWxzXG4gICAgfVxuICAgIGFZID0gc2NhbGVkLmggLSBybmQoICgoaWNvbi5ob3RTcG90Lnl1bml0cyA9PT0gJ2ZyYWN0aW9uJykgPyBpY29uLmRpbS5oIDogMSkgKiBzY2FsZWQuYVkgKTsgIC8vIGluc2V0UGl4ZWxzIFkgPSBwaXhlbHMgWVxuICAgIHZhciBpY29uQW5jaG9yID0gbmV3IGdvb2dsZS5tYXBzLlBvaW50KGFYLCBhWSk7XG5cbiAgICAvLyBTaXplc1xuICAgIC8vIChOT1RFOiBTY2FsZSBpcyBhcHBsaWVkIHRvIGVudGlyZSBpbWFnZSwgbm90IGp1c3QgdGhlIHNlY3Rpb24gb2YgdGhlIGljb24gcGFsZXR0ZS4pXG4gICAgdmFyIGljb25TaXplICAgPSBpY29uLmRpbS53aEd1ZXNzICA/IG51bGwgOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZShybmQoc2NhbGVkLncpLCAgcm5kKHNjYWxlZC5oKSk7XG4gICAgdmFyIGljb25TY2FsZSAgPSBpY29uLnNjYWxlID09IDEuMCA/IG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgaWNvbi5kaW0ud2hHdWVzcyAgPyAgICAgICAgbmV3IGdvb2dsZS5tYXBzLlNpemUocm5kKHNjYWxlZC53KSwgIHJuZChzY2FsZWQuaCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZShybmQoc2NhbGVkLmlXKSwgcm5kKHNjYWxlZC5pSCkpO1xuICAgIHZhciBpY29uT3JpZ2luID0gbmV3IGdvb2dsZS5tYXBzLlBvaW50KHJuZChzY2FsZWQueCksIHJuZChzY2FsZWQueSkpO1xuXG4gICAgLy8gRGV0ZWN0IGltYWdlcyBidXJpZWQgaW4gS01aIGZpbGVzIChhbmQgdXNlIGEgYmFzZTY0IGVuY29kZWQgVVJMKVxuICAgIGlmIChrbXpNZXRhRGF0YVtpY29uLnVybF0pIGljb24udXJsID0ga216TWV0YURhdGFbaWNvbi51cmxdLmRhdGFVcmw7XG5cbiAgICAvLyBJbml0IHRoZSBzdHlsZSBvYmplY3Qgd2l0aCB0aGUgS01MIGljb25cbiAgICBpY29uLm1hcmtlciA9IHtcbiAgICAgIHVybDogaWNvbi51cmwsICAgICAgICAvLyB1cmxcbiAgICAgIHNpemU6IGljb25TaXplLCAgICAgICAvLyBzaXplXG4gICAgICBvcmlnaW46IGljb25PcmlnaW4sICAgLy8gb3JpZ2luXG4gICAgICBhbmNob3I6IGljb25BbmNob3IsICAgLy8gYW5jaG9yXG4gICAgICBzY2FsZWRTaXplOiBpY29uU2NhbGUgLy8gc2NhbGVkU2l6ZVxuICAgIH07XG5cbiAgICAvLyBMb29rIGZvciBhIHByZWRpY3RhYmxlIHNoYWRvd1xuICAgIHZhciBzdGRSZWdFeCA9IC9cXC8ocmVkfGJsdWV8Z3JlZW58eWVsbG93fGxpZ2h0Ymx1ZXxwdXJwbGV8cGlua3xvcmFuZ2UpKC1kb3QpP1xcLnBuZy87XG4gICAgdmFyIHNoYWRvd1NpemUgPSBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg1OSwgMzIpO1xuICAgIHZhciBzaGFkb3dQb2ludCA9IG5ldyBnb29nbGUubWFwcy5Qb2ludCgxNiwgMzIpO1xuICAgIGlmIChzdGRSZWdFeC50ZXN0KGljb24uaHJlZikpIHtcbiAgICAgIC8vIEEgc3RhbmRhcmQgR01hcC1zdHlsZSBtYXJrZXIgaWNvblxuXHRpY29uLnNoYWRvdyA9IHtcblx0ICB1cmw6ICdodHRwOi8vbWFwcy5nb29nbGUuY29tL21hcGZpbGVzL21zL21pY29ucy9tc21hcmtlci5zaGFkb3cucG5nJywgLy8gdXJsXG4gICAgICAgICAgc2l6ZTogc2hhZG93U2l6ZSwgICAgLy8gc2l6ZVxuICAgICAgICAgIG9yaWdpbjogbnVsbCwgICAgICAgIC8vIG9yaWdpblxuXHQgIGFuY2hvcjogc2hhZG93UG9pbnQsIC8vIGFuY2hvclxuICAgICAgICAgIHNjYWxlZFNpemU6IHNoYWRvd1NpemUgLy8gc2NhbGVkU2l6ZVxuXHR9O1xuICAgIH0gZWxzZSBpZiAoaWNvbi5ocmVmLmluZGV4T2YoJy1wdXNocGluLnBuZycpID4gLTEpIHtcbiAgICAgIC8vIFB1c2hwaW4gbWFya2VyIGljb25cbiAgICAgIGljb24uc2hhZG93ID0ge1xuXHR1cmw6ICdodHRwOi8vbWFwcy5nb29nbGUuY29tL21hcGZpbGVzL21zL21pY29ucy9wdXNocGluX3NoYWRvdy5wbmcnLCAgLy8gdXJsXG4gICAgICAgIHNpemU6IHNoYWRvd1NpemUsICAgIC8vIHNpemVcbiAgICAgICAgb3JpZ2luOiBudWxsLCAgICAgICAgLy8gb3JpZ2luXG4gICAgICAgIGFuY2hvcjogc2hhZG93UG9pbnQsIC8vIGFuY2hvclxuICAgICAgICBzY2FsZWRTaXplOiBzaGFkb3dTaXplIC8vIHNjYWxlZFNpemVcbiAgICAgIH07XG4gICAgfSAvKiBlbHNlIHtcbiAgICAgIC8vIE90aGVyIE15TWFwcyBLTUwgc3RhbmRhcmQgaWNvblxuICAgICAgaWNvbi5zaGFkb3cgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UoXG4gICAgICAgIGljb24uaHJlZi5yZXBsYWNlKCcucG5nJywgJy5zaGFkb3cucG5nJyksICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXJsXG4gICAgICAgIHNoYWRvd1NpemUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2l6ZVxuICAgICAgICBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yaWdpblxuICAgICAgICBhbmNob3JQb2ludCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuY2hvclxuICAgICAgICBzaGFkb3dTaXplICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNjYWxlZFNpemVcbiAgICAgICk7XG4gICAgfSAqL1xuICB9XG5cbiAgdmFyIHByb2Nlc3NTdHlsZXMgPSBmdW5jdGlvbiAoZG9jKSB7XG4gICAgZm9yICh2YXIgc3R5bGVJRCBpbiBkb2Muc3R5bGVzKSB7XG4gICAgICBwcm9jZXNzU3R5bGVJRChkb2Muc3R5bGVzW3N0eWxlSURdKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGNyZWF0ZU1hcmtlciA9IGZ1bmN0aW9uIChwbGFjZW1hcmssIGRvYykge1xuICAgIC8vIGNyZWF0ZSBhIE1hcmtlciB0byB0aGUgbWFwIGZyb20gYSBwbGFjZW1hcmsgS01MIG9iamVjdFxuICAgIHZhciBpY29uID0gcGxhY2VtYXJrLnN0eWxlLmljb247XG5cbiAgICBpZiAoICFpY29uLm1hcmtlciAmJiBpY29uLmltZyApIHtcbiAgICAgIC8vIHlheSwgc2luZ2xlIHBvaW50IG9mIGZhaWx1cmUgaXMgaG9sZGluZyB1cCBtdWx0aXBsZSBtYXJrZXJzLi4uXG4gICAgICBpY29uLm1hcmtlckJhY2tsb2cgPSBpY29uLm1hcmtlckJhY2tsb2cgfHwgW107XG4gICAgICBpY29uLm1hcmtlckJhY2tsb2cucHVzaChbcGxhY2VtYXJrLCBkb2NdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBMb2FkIGJhc2ljIG1hcmtlciBwcm9wZXJ0aWVzXG4gICAgdmFyIG1hcmtlck9wdGlvbnMgPSBnZW9YTUwzLmNvbWJpbmVPcHRpb25zKHBhcnNlck9wdGlvbnMubWFya2VyT3B0aW9ucywge1xuICAgICAgbWFwOiAgICAgIHBhcnNlck9wdGlvbnMubWFwLFxuICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcocGxhY2VtYXJrLlBvaW50LmNvb3JkaW5hdGVzWzBdLmxhdCwgcGxhY2VtYXJrLlBvaW50LmNvb3JkaW5hdGVzWzBdLmxuZyksXG4gICAgICB0aXRsZTogICAgcGxhY2VtYXJrLm5hbWUsXG4gICAgICB6SW5kZXg6ICAgTWF0aC5yb3VuZChwbGFjZW1hcmsuUG9pbnQuY29vcmRpbmF0ZXNbMF0ubGF0ICogLTEwMDAwMCk8PDUsXG4gICAgICBpY29uOiAgICAgaWNvbi5tYXJrZXIsXG4gICAgICBzaGFkb3c6ICAgaWNvbi5zaGFkb3csXG4gICAgICBmbGF0OiAgICAgIWljb24uc2hhZG93LFxuICAgICAgdmlzaWJsZTogIHBsYWNlbWFyay52aXNpYmlsaXR5XG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgdGhlIG1hcmtlciBvbiB0aGUgbWFwXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIobWFya2VyT3B0aW9ucyk7XG4gICAgaWYgKCEhZG9jKSBkb2MubWFya2Vycy5wdXNoKG1hcmtlcik7XG5cbiAgICAvLyBTZXQgdXAgYW5kIGNyZWF0ZSB0aGUgaW5mb3dpbmRvdyBpZiBpdCBpcyBub3Qgc3VwcHJlc3NlZFxuICAgIGNyZWF0ZUluZm9XaW5kb3cocGxhY2VtYXJrLCBkb2MsIG1hcmtlcik7XG4gICAgcGxhY2VtYXJrLm1hcmtlciA9IG1hcmtlcjtcbiAgICByZXR1cm4gbWFya2VyO1xuICB9O1xuXG4gIHZhciBjcmVhdGVPdmVybGF5ID0gZnVuY3Rpb24gKGdyb3VuZE92ZXJsYXksIGRvYykge1xuICAgIC8vIEFkZCBhIFByb2plY3RlZE92ZXJsYXkgdG8gdGhlIG1hcCBmcm9tIGEgZ3JvdW5kT3ZlcmxheSBLTUwgb2JqZWN0XG5cbiAgICBpZiAoIXdpbmRvdy5Qcm9qZWN0ZWRPdmVybGF5KSB7XG4gICAgICB0aHJvdyAnZ2VvWE1MMyBlcnJvcjogUHJvamVjdGVkT3ZlcmxheSBub3QgZm91bmQgd2hpbGUgcmVuZGVyaW5nIEdyb3VuZE92ZXJsYXkgZnJvbSBLTUwnO1xuICAgIH1cblxuICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKFxuICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGdyb3VuZE92ZXJsYXkubGF0TG9uQm94LnNvdXRoLCBncm91bmRPdmVybGF5LmxhdExvbkJveC53ZXN0KSxcbiAgICAgICAgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhncm91bmRPdmVybGF5LmxhdExvbkJveC5ub3J0aCwgZ3JvdW5kT3ZlcmxheS5sYXRMb25Cb3guZWFzdClcbiAgICApO1xuICAgIHZhciBvdmVybGF5T3B0aW9ucyA9IGdlb1hNTDMuY29tYmluZU9wdGlvbnMocGFyc2VyT3B0aW9ucy5vdmVybGF5T3B0aW9ucywge3BlcmNlbnRPcGFjaXR5OiBncm91bmRPdmVybGF5Lm9wYWNpdHkqMTAwfSk7XG4gICAgdmFyIG92ZXJsYXkgPSBuZXcgUHJvamVjdGVkT3ZlcmxheShwYXJzZXJPcHRpb25zLm1hcCwgZ3JvdW5kT3ZlcmxheS5pY29uLmhyZWYsIGJvdW5kcywgb3ZlcmxheU9wdGlvbnMpO1xuXG4gICAgaWYgKCEhZG9jKSB7XG4gICAgICBkb2MuZ2dyb3VuZG92ZXJsYXlzID0gZG9jLmdncm91bmRvdmVybGF5cyB8fCBbXTtcbiAgICAgIGRvYy5nZ3JvdW5kb3ZlcmxheXMucHVzaChvdmVybGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxheTtcbiAgfTtcblxuICAvLyBDcmVhdGUgUG9seWxpbmVcbiAgdmFyIGNyZWF0ZVBvbHlsaW5lID0gZnVuY3Rpb24ocGxhY2VtYXJrLCBkb2MpIHtcbiAgICB2YXIgcGF0aHMgPSBbXTtcbiAgICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICAgIGZvciAodmFyIGo9MDsgajxwbGFjZW1hcmsuTGluZVN0cmluZy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIHBhdGggPSBbXTtcbiAgICAgIHZhciBjb29yZHMgPSBwbGFjZW1hcmsuTGluZVN0cmluZ1tqXS5jb29yZGluYXRlcztcbiAgICAgIGZvciAodmFyIGk9MDtpPGNvb3Jkcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIHZhciBwdCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoY29vcmRzW2ldLmxhdCwgY29vcmRzW2ldLmxuZyk7XG4gICAgICAgIHBhdGgucHVzaChwdCk7XG4gICAgICAgIGJvdW5kcy5leHRlbmQocHQpO1xuICAgICAgfVxuICAgICAgcGF0aHMucHVzaChwYXRoKTtcbiAgICB9XG4gICAgLy8gcG9pbnQgdG8gb3BlbiB0aGUgaW5mb3dpbmRvdyBpZiB0cmlnZ2VyZWRcbiAgICB2YXIgcG9pbnQgPSBwYXRoc1swXVtNYXRoLmZsb29yKHBhdGgubGVuZ3RoLzIpXTtcbiAgICAvLyBMb2FkIGJhc2ljIHBvbHlsaW5lIHByb3BlcnRpZXNcbiAgICB2YXIga21sU3Ryb2tlQ29sb3IgPSBrbWxDb2xvcihwbGFjZW1hcmsuc3R5bGUubGluZS5jb2xvciwgcGxhY2VtYXJrLnN0eWxlLmxpbmUuY29sb3JNb2RlKTtcbiAgICB2YXIgcG9seU9wdGlvbnMgPSBnZW9YTUwzLmNvbWJpbmVPcHRpb25zKHBhcnNlck9wdGlvbnMucG9seWxpbmVPcHRpb25zLCB7XG4gICAgICBtYXA6ICAgICAgICAgICBwYXJzZXJPcHRpb25zLm1hcCxcbiAgICAgIHBhdGg6ICAgICAgICAgIHBhdGgsXG4gICAgICBzdHJva2VDb2xvcjogICBrbWxTdHJva2VDb2xvci5jb2xvcixcbiAgICAgIHN0cm9rZVdlaWdodDogIHBsYWNlbWFyay5zdHlsZS5saW5lLndpZHRoLFxuICAgICAgc3Ryb2tlT3BhY2l0eToga21sU3Ryb2tlQ29sb3Iub3BhY2l0eSxcbiAgICAgIHRpdGxlOiAgICAgICAgIHBsYWNlbWFyay5uYW1lLFxuICAgICAgdmlzaWJsZTogICAgICAgcGxhY2VtYXJrLnZpc2liaWxpdHlcbiAgICB9KTtcbiAgICBpZiAocGF0aHMubGVuZ3RoID4gMSkge1xuICAgICAgcG9seU9wdGlvbnMucGF0aHMgPSBwYXRocztcbiAgICAgIHZhciBwID0gbmV3IE11bHRpR2VvbWV0cnkocG9seU9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb2x5T3B0aW9ucy5wYXRoID0gcGF0aHNbMF07XG4gICAgICB2YXIgcCA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShwb2x5T3B0aW9ucyk7XG4gICAgfVxuICAgIHAuYm91bmRzID0gYm91bmRzO1xuXG4gICAgLy8gc2V0dXAgYW5kIGNyZWF0ZSB0aGUgaW5mb1dpbmRvdyBpZiBpdCBpcyBub3Qgc3VwcHJlc3NlZFxuICAgIGNyZWF0ZUluZm9XaW5kb3cocGxhY2VtYXJrLCBkb2MsIHApO1xuICAgIGlmICghIWRvYykgZG9jLmdwb2x5bGluZXMucHVzaChwKTtcbiAgICBwbGFjZW1hcmsucG9seWxpbmUgPSBwO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgLy8gQ3JlYXRlIFBvbHlnb25cbiAgdmFyIGNyZWF0ZVBvbHlnb24gPSBmdW5jdGlvbihwbGFjZW1hcmssIGRvYykge1xuICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gICAgdmFyIHBhdGhzTGVuZ3RoID0gMDtcbiAgICB2YXIgcGF0aHMgPSBbXTtcbiAgICBmb3IgKHZhciBwb2x5Z29uUGFydD0wO3BvbHlnb25QYXJ0PHBsYWNlbWFyay5Qb2x5Z29uLmxlbmd0aDtwb2x5Z29uUGFydCsrKSB7XG4gICAgICBmb3IgKHZhciBqPTA7IGo8cGxhY2VtYXJrLlBvbHlnb25bcG9seWdvblBhcnRdLm91dGVyQm91bmRhcnlJcy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY29vcmRzID0gcGxhY2VtYXJrLlBvbHlnb25bcG9seWdvblBhcnRdLm91dGVyQm91bmRhcnlJc1tqXS5jb29yZGluYXRlcztcbiAgICAgICAgdmFyIHBhdGggPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8Y29vcmRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICB2YXIgcHQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGNvb3Jkc1tpXS5sYXQsIGNvb3Jkc1tpXS5sbmcpO1xuICAgICAgICAgIHBhdGgucHVzaChwdCk7XG4gICAgICAgICAgYm91bmRzLmV4dGVuZChwdCk7XG4gICAgICAgIH1cbiAgICAgICAgcGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgcGF0aHNMZW5ndGggKz0gcGF0aC5sZW5ndGg7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBqPTA7IGo8cGxhY2VtYXJrLlBvbHlnb25bcG9seWdvblBhcnRdLmlubmVyQm91bmRhcnlJcy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY29vcmRzID0gcGxhY2VtYXJrLlBvbHlnb25bcG9seWdvblBhcnRdLmlubmVyQm91bmRhcnlJc1tqXS5jb29yZGluYXRlcztcbiAgICAgICAgdmFyIHBhdGggPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8Y29vcmRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICB2YXIgcHQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGNvb3Jkc1tpXS5sYXQsIGNvb3Jkc1tpXS5sbmcpO1xuICAgICAgICAgIHBhdGgucHVzaChwdCk7XG4gICAgICAgICAgYm91bmRzLmV4dGVuZChwdCk7XG4gICAgICAgIH1cbiAgICAgICAgcGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgcGF0aHNMZW5ndGggKz0gcGF0aC5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTG9hZCBiYXNpYyBwb2x5Z29uIHByb3BlcnRpZXNcbiAgICB2YXIga21sU3Ryb2tlQ29sb3IgPSBrbWxDb2xvcihwbGFjZW1hcmsuc3R5bGUubGluZS5jb2xvciwgcGxhY2VtYXJrLnN0eWxlLmxpbmUuY29sb3JNb2RlKTtcbiAgICB2YXIga21sRmlsbENvbG9yID0ga21sQ29sb3IocGxhY2VtYXJrLnN0eWxlLnBvbHkuY29sb3IsIHBsYWNlbWFyay5zdHlsZS5wb2x5LmNvbG9yTW9kZSk7XG4gICAgaWYgKCFwbGFjZW1hcmsuc3R5bGUucG9seS5maWxsKSBrbWxGaWxsQ29sb3Iub3BhY2l0eSA9IDAuMDtcbiAgICB2YXIgc3Ryb2tlV2VpZ2h0ID0gcGxhY2VtYXJrLnN0eWxlLmxpbmUud2lkdGg7XG4gICAgaWYgKCFwbGFjZW1hcmsuc3R5bGUucG9seS5vdXRsaW5lKSB7XG4gICAgICBzdHJva2VXZWlnaHQgPSAwO1xuICAgICAga21sU3Ryb2tlQ29sb3Iub3BhY2l0eSA9IDAuMDtcbiAgICB9XG4gICAgdmFyIHBvbHlPcHRpb25zID0gZ2VvWE1MMy5jb21iaW5lT3B0aW9ucyhwYXJzZXJPcHRpb25zLnBvbHlnb25PcHRpb25zLCB7XG4gICAgICBtYXA6ICAgICAgICAgICBwYXJzZXJPcHRpb25zLm1hcCxcbiAgICAgIHBhdGhzOiAgICAgICAgIHBhdGhzLFxuICAgICAgdGl0bGU6ICAgICAgICAgcGxhY2VtYXJrLm5hbWUsXG4gICAgICBzdHJva2VDb2xvcjogICBrbWxTdHJva2VDb2xvci5jb2xvcixcbiAgICAgIHN0cm9rZVdlaWdodDogIHN0cm9rZVdlaWdodCxcbiAgICAgIHN0cm9rZU9wYWNpdHk6IGttbFN0cm9rZUNvbG9yLm9wYWNpdHksXG4gICAgICBmaWxsQ29sb3I6ICAgICBrbWxGaWxsQ29sb3IuY29sb3IsXG4gICAgICBmaWxsT3BhY2l0eTogICBrbWxGaWxsQ29sb3Iub3BhY2l0eSxcbiAgICAgIHZpc2libGU6ICAgICAgIHBsYWNlbWFyay52aXNpYmlsaXR5XG4gICAgfSk7XG4gICAgdmFyIHAgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbihwb2x5T3B0aW9ucyk7XG4gICAgcC5ib3VuZHMgPSBib3VuZHM7XG5cbiAgICBjcmVhdGVJbmZvV2luZG93KHBsYWNlbWFyaywgZG9jLCBwKTtcbiAgICBpZiAoISFkb2MpIGRvYy5ncG9seWdvbnMucHVzaChwKTtcbiAgICBwbGFjZW1hcmsucG9seWdvbiA9IHA7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICB2YXIgY3JlYXRlSW5mb1dpbmRvdyA9IGZ1bmN0aW9uKHBsYWNlbWFyaywgZG9jLCBnT2JqKSB7XG4gICAgdmFyIGJTdHlsZSA9IHBsYWNlbWFyay5zdHlsZS5iYWxsb29uO1xuICAgIHZhciB2YXJzID0gcGxhY2VtYXJrLnZhcnM7XG5cbiAgICBpZiAoIXBsYWNlbWFyay5iYWxsb29uVmlzaWJpbGl0eSB8fCBiU3R5bGUuZGlzcGxheU1vZGUgPT09ICdoaWRlJykgcmV0dXJuO1xuXG4gICAgLy8gZGVmaW5lIGdlRGlyZWN0aW9uc1xuICAgIGlmIChwbGFjZW1hcmsubGF0bG5nICYmXG4gICAgICAgICghcGFyc2VyT3B0aW9ucy5zdXBwcmVzc0RpcmVjdGlvbnMgfHwgIXBhcnNlck9wdGlvbnMuc3VwcHJlc3NEaXJlY3Rpb25zKSkge1xuICAgICAgdmFycy5kaXJlY3Rpb25zLnB1c2goJ3NsbD0nICsgcGxhY2VtYXJrLmxhdGxuZy50b1VybFZhbHVlKCkpO1xuXG4gICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9tYXBzLmdvb2dsZS5jb20vbWFwcz8nICsgdmFycy5kaXJlY3Rpb25zLmpvaW4oJyYnKTtcbiAgICAgIHZhciBhZGRyZXNzID0gZW5jb2RlVVJJQ29tcG9uZW50KCB2YXJzLnZhbC5hZGRyZXNzIHx8IHBsYWNlbWFyay5sYXRsbmcudG9VcmxWYWx1ZSgpICkucmVwbGFjZSgvXFwlMjAvZywgJysnKTtcblxuICAgICAgdmFycy52YWwuZ2VEaXJlY3Rpb25zID0gJzxhIGhyZWY9XCInICsgdXJsICsgJyZkYWRkcj0nICsgYWRkcmVzcyArICdcIiB0YXJnZXQ9X2JsYW5rPlRvIEhlcmU8L2E+IC0gPGEgaHJlZj1cIicgKyB1cmwgKyAnJnNhZGRyPScgKyBhZGRyZXNzICsgJ1wiIHRhcmdldD1fYmxhbms+RnJvbSBIZXJlPC9hPic7XG4gICAgfVxuICAgIGVsc2UgdmFycy52YWwuZ2VEaXJlY3Rpb25zID0gJyc7XG5cbiAgICAvLyBhZGQgaW4gdGhlIHZhcmlhYmxlc1xuICAgIHZhciBpd1RleHQgPSBiU3R5bGUudGV4dC5yZXBsYWNlKC9cXCRcXFsoXFx3KyhcXC9kaXNwbGF5TmFtZSk/KVxcXS9nLCBmdW5jdGlvbih0eHQsIG4sIGRuKSB7IHJldHVybiBkbiA/IHZhcnMuZGlzcGxheVtuXSA6IHZhcnMudmFsW25dOyB9KTtcbiAgICB2YXIgY2xhc3NUeHQgPSAnZ2VveG1sM19pbmZvd2luZG93IGdlb3htbDNfc3R5bGVfJyArIHBsYWNlbWFyay5zdHlsZUlEO1xuXG4gICAgLy8gY29sb3Igc3R5bGVzXG4gICAgdmFyIHN0eWxlQXJyID0gW107XG4gICAgaWYgKGJTdHlsZS5iZ0NvbG9yICAgIT0gJ2ZmZmZmZmZmJykgc3R5bGVBcnIucHVzaCgnYmFja2dyb3VuZDogJyArIGttbENvbG9yKGJTdHlsZS5iZ0NvbG9yICApLmNvbG9yICsgJzsnKTtcbiAgICBpZiAoYlN0eWxlLnRleHRDb2xvciAhPSAnZmYwMDAwMDAnKSBzdHlsZUFyci5wdXNoKCdjb2xvcjogJyAgICAgICsga21sQ29sb3IoYlN0eWxlLnRleHRDb2xvcikuY29sb3IgKyAnOycpO1xuICAgIHZhciBzdHlsZVByb3AgPSBzdHlsZUFyci5sZW5ndGggPyAnIHN0eWxlPVwiJyArIHN0eWxlQXJyLmpvaW4oJyAnKSArICdcIicgOiAnJztcblxuICAgIHZhciBpbmZvV2luZG93T3B0aW9ucyA9IGdlb1hNTDMuY29tYmluZU9wdGlvbnMocGFyc2VyT3B0aW9ucy5pbmZvV2luZG93T3B0aW9ucywge1xuICAgICAgY29udGVudDogJzxkaXYgY2xhc3M9XCInICsgY2xhc3NUeHQgKyAnXCInICsgc3R5bGVQcm9wICsgJz4nICsgaXdUZXh0ICsgJzwvZGl2PicsXG4gICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoMCwgMilcbiAgICB9KTtcblxuICAgIGdPYmouaW5mb1dpbmRvdyA9IHBhcnNlck9wdGlvbnMuaW5mb1dpbmRvdyB8fCBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyhpbmZvV2luZG93T3B0aW9ucyk7XG4gICAgZ09iai5pbmZvV2luZG93T3B0aW9ucyA9IGluZm9XaW5kb3dPcHRpb25zO1xuXG4gICAgLy8gSW5mbyBXaW5kb3ctb3BlbmluZyBldmVudCBoYW5kbGVyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoZ09iaiwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIGlXID0gdGhpcy5pbmZvV2luZG93O1xuICAgICAgaVcuY2xvc2UoKTtcbiAgICAgIGlXLnNldE9wdGlvbnModGhpcy5pbmZvV2luZG93T3B0aW9ucyk7XG5cbiAgICAgIGlmICAgICAgKGUgJiYgZS5sYXRMbmcpIGlXLnNldFBvc2l0aW9uKGUubGF0TG5nKTtcbiAgICAgIGVsc2UgaWYgKHRoaXMuYm91bmRzKSAgIGlXLnNldFBvc2l0aW9uKHRoaXMuYm91bmRzLmdldENlbnRlcigpKTtcblxuICAgICAgaVcuc2V0Q29udGVudChcIjxkaXYgaWQ9J2dlb3htbDNfaW5mb3dpbmRvdyc+XCIraVcuZ2V0Q29udGVudCgpK1wiPC9kaXY+XCIpO1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXJPbmNlKGlXLCBcImRvbXJlYWR5XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW94bWwzX2luZm93aW5kb3cnKTtcbiAgICAgICAgdmFyIGltZ0FycmF5ID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nQXJyYXkubGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaW1nVXJsSUUgPSBpbWdBcnJheVtpXS5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gICAgICAgICAgdmFyIGltZ1VybCAgPSBjbGVhblVSTChkb2MuYmFzZURpciwgaW1nVXJsSUUpO1xuXG4gICAgICAgICAgaWYgKGttek1ldGFEYXRhW2ltZ1VybF0pIHtcbiAgICAgICAgICAgICBpbWdBcnJheVtpXS5zcmMgPSBrbXpNZXRhRGF0YVtpbWdVcmxdLmRhdGFVcmw7XG4gICAgICAgICAgfSBlbHNlIGlmIChrbXpNZXRhRGF0YVtpbWdVcmxJRV0pIHtcbiAgICAgICAgICAgICBpbWdBcnJheVtpXS5zcmMgPSBrbXpNZXRhRGF0YVtpbWdVcmxJRV0uZGF0YVVybDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaVcub3Blbih0aGlzLm1hcCwgdGhpcy5ib3VuZHMgPyBudWxsIDogdGhpcyk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLy8gRXhwb3NlIHNvbWUgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuXG4gICAgb3B0aW9uczogICAgIHBhcnNlck9wdGlvbnMsXG4gICAgZG9jczogICAgICAgIGRvY3MsXG4gICAgZG9jc0J5VXJsOiAgIGRvY3NCeVVybCxcbiAgICBrbXpNZXRhRGF0YToga216TWV0YURhdGEsXG5cbiAgICBwYXJzZTogICAgICAgICAgcGFyc2UsXG4gICAgcmVuZGVyOiAgICAgICAgIHJlbmRlcixcbiAgICBwYXJzZUttbFN0cmluZzogcGFyc2VLbWxTdHJpbmcsXG4gICAgaGlkZURvY3VtZW50OiAgIGhpZGVEb2N1bWVudCxcbiAgICBzaG93RG9jdW1lbnQ6ICAgc2hvd0RvY3VtZW50LFxuICAgIHByb2Nlc3NTdHlsZXM6ICBwcm9jZXNzU3R5bGVzLFxuICAgIGNyZWF0ZU1hcmtlcjogICBjcmVhdGVNYXJrZXIsXG4gICAgY3JlYXRlT3ZlcmxheTogIGNyZWF0ZU92ZXJsYXksXG4gICAgY3JlYXRlUG9seWxpbmU6IGNyZWF0ZVBvbHlsaW5lLFxuICAgIGNyZWF0ZVBvbHlnb246ICBjcmVhdGVQb2x5Z29uXG4gIH07XG59O1xuLy8gRW5kIG9mIEtNTCBQYXJzZXJcblxuLy8gSGVscGVyIG9iamVjdHMgYW5kIGZ1bmN0aW9uc1xuZ2VvWE1MMy5nZXRPcGFjaXR5ID0gZnVuY3Rpb24gKGttbENvbG9yKSB7XG4gIC8vIEV4dHJhY3Qgb3BhY2l0eSBlbmNvZGVkIGluIGEgS01MIGNvbG9yIHZhbHVlLiBSZXR1cm5zIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMS5cbiAgaWYgKCEha21sQ29sb3IgJiZcbiAgICAgIChrbWxDb2xvciAhPT0gJycpICYmXG4gICAgICAoa21sQ29sb3IubGVuZ3RoID09IDgpKSB7XG4gICAgdmFyIHRyYW5zcGFyZW5jeSA9IHBhcnNlSW50KGttbENvbG9yLnN1YnN0cigwLCAyKSwgMTYpO1xuICAgIHJldHVybiB0cmFuc3BhcmVuY3kgLyAyNTU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbn07XG5cbi8vIExvZyBhIG1lc3NhZ2UgdG8gdGhlIGRlYnVnZ2luZyBjb25zb2xlLCBpZiBvbmUgZXhpc3RzXG5nZW9YTUwzLmxvZyA9IGZ1bmN0aW9uKG1zZykge1xuICBpZiAoISF3aW5kb3cuY29uc29sZSkge1xuICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gIH0gZWxzZSB7IGFsZXJ0KFwibG9nOlwiK21zZyk7IH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBwYXJzZXJPcHRpb25zIG9iamVjdC5cbiAqIEBjbGFzcyBHZW9YTUwzIHBhcnNlciBvcHRpb25zLlxuICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBBbnkgb3B0aW9ucyB5b3Ugd2FudCB0byBkZWNsYXJlIG91dHNpZGUgb2YgdGhlIGRlZmF1bHRzIHNob3VsZCBiZSBpbmNsdWRlZCBoZXJlLlxuICogQHByb3BlcnR5IHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgQVBJIG1hcCBvbiB3aGljaCBnZW8gb2JqZWN0cyBzaG91bGQgYmUgcmVuZGVyZWQuXG4gKiBAcHJvcGVydHkge2dvb2dsZS5tYXBzLk1hcmtlck9wdGlvbnN9IG1hcmtlck9wdGlvbnMgSWYgdGhlIHBhcnNlciBpcyBhZGRpbmcgTWFya2VycyB0byB0aGUgbWFwIGl0c2VsZiwgYW55IG9wdGlvbnMgc3BlY2lmaWVkIGhlcmUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZW0uXG4gKiBAcHJvcGVydHkge2dvb2dsZS5tYXBzLkluZm9XaW5kb3dPcHRpb25zfSBpbmZvV2luZG93T3B0aW9ucyBJZiB0aGUgcGFyc2VyIGlzIGFkZGluZyBNYXJrZXJzIHRvIHRoZSBtYXAgaXRzZWxmLCBhbnkgb3B0aW9ucyBzcGVjaWZpZWQgaGVyZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlaXIgYXR0YWNoZWQgSW5mb1dpbmRvd3MuXG4gKiBAcHJvcGVydHkge1Byb2plY3RlZE92ZXJsYXkub3B0aW9uc30gb3ZlcmxheU9wdGlvbnMgSWYgdGhlIHBhcnNlciBpcyBhZGRpbmcgUHJvamVjdGVkT3ZlcmxheXMgdG8gdGhlIG1hcCBpdHNlbGYsIGFueSBvcHRpb25zIHNwZWNpZmllZCBoZXJlIHdpbGwgYmUgYXBwbGllZCB0byB0aGVtLlxuICovXG5nZW9YTUwzLnBhcnNlck9wdGlvbnMgPSBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG4gIHRoaXMubWFwICAgICAgICAgICAgICAgICA9IG51bGwsXG4gIC8qKiBJZiB0cnVlLCB0aGUgcGFyc2VyIHdpbGwgYXV0b21hdGljYWxseSBtb3ZlIHRoZSBtYXAgdG8gYSBiZXN0LWZpdCBvZiB0aGUgZ2VvZGF0YSBhZnRlciBwYXJzaW5nIG9mIGEgS01MIGRvY3VtZW50IGNvbXBsZXRlcy5cbiAgICogQHR5cGUgQm9vbGVhblxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICB0aGlzLnpvb20gICAgICAgICAgICAgICAgPSB0cnVlLFxuICAvKiojQCsgQHR5cGUgQm9vbGVhblxuICAgKiAgICAgQGRlZmF1bHQgZmFsc2UgKi9cbiAgLyoqIElmIHRydWUsIG9ubHkgYSBzaW5nbGUgTWFya2VyIGNyZWF0ZWQgYnkgdGhlIHBhcnNlciB3aWxsIGJlIGFibGUgdG8gaGF2ZSBpdHMgSW5mb1dpbmRvdyBvcGVuIGF0IG9uY2UgKHNpbXVsYXRpbmcgdGhlIGJlaGF2aW9yIG9mIEdNYXBzIEFQSSB2MikuICovXG4gIHRoaXMuc2luZ2xlSW5mb1dpbmRvdyAgICA9IGZhbHNlLFxuICAvKiogSWYgdHJ1ZSwgc3VwcHJlc3NlcyB0aGUgcmVuZGVyaW5nIG9mIGluZm8gd2luZG93cy4gKi9cbiAgdGhpcy5zdXBwcmVzc0luZm9XaW5kb3dzID0gZmFsc2UsXG4gIC8qKlxuICAgKiBDb250cm9sIHdoZXRoZXIgdG8gcHJvY2VzcyBzdHlsZXMgbm93IG9yIGxhdGVyLlxuICAgKlxuICAgKiA8cD5CeSBkZWZhdWx0LCB0aGUgcGFyc2VyIG9ubHkgcHJvY2Vzc2VzIEtNTCAmbHQ7U3R5bGUmZ3Q7IGVsZW1lbnRzIGludG8gdGhlaXIgR01hcHMgZXF1aXZhbGVudHNcbiAgICogaWYgaXQgd2lsbCBiZSBjcmVhdGluZyBpdHMgb3duIE1hcmtlcnMgKHRoZSBjcmVhdGVNYXJrZXIgb3B0aW9uIGlzIG51bGwpLiBTZXR0aW5nIHRoaXMgb3B0aW9uXG4gICAqIHRvIHRydWUgd2lsbCBmb3JjZSBzdWNoIHByb2Nlc3NpbmcgdG8gaGFwcGVuIGFueXdheSwgdXNlZnVsIGlmIHlvdSdyZSBnb2luZyB0byBiZSBjYWxsaW5nIHBhcnNlci5jcmVhdGVNYXJrZXJcbiAgICogeW91cnNlbGYgbGF0ZXIuIE9UT0gsIGxlYXZpbmcgdGhpcyBvcHRpb24gZmFsc2UgcmVtb3ZlcyBydW50aW1lIGRlcGVuZGVuY3kgb24gdGhlIEdNYXBzIEFQSSwgZW5hYmxpbmdcbiAgICogdGhlIHVzZSBvZiBnZW9YTUwzIGFzIGEgc3RhbmRhbG9uZSBLTUwgcGFyc2VyLjwvcD5cbiAgICovXG4gIHRoaXMucHJvY2Vzc1N0eWxlcyAgICAgICA9IGZhbHNlLFxuICAvKiojQC0qL1xuXG4gIHRoaXMubWFya2VyT3B0aW9ucyAgICAgICA9IHt9LFxuICB0aGlzLmluZm9XaW5kb3dPcHRpb25zICAgPSB7fSxcbiAgdGhpcy5vdmVybGF5T3B0aW9ucyAgICAgID0ge30sXG5cbiAgLyoqI0ArIEBldmVudCAqL1xuICAvKiogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIHBhcnNpbmcgb2YgYSBLTUwgZG9jdW1lbnQgaXMgY29tcGxldGUuXG4gICAqIEBwYXJhbSB7Z2VvWE1MMy5wYXJzZXIjZG9jc30gZG9jIFBhcnNlZCBLTUwgZGF0YS4gKi9cbiAgdGhpcy5hZnRlclBhcnNlICAgICAgICAgID0gbnVsbCxcbiAgLyoqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiBwYXJzaW5nIG9mIGEgS01MIGRvY3VtZW50IGlzIGNvbXBsZXRlLlxuICAgKiBAcGFyYW0ge2dlb1hNTDMucGFyc2VyI2RvY3N9IGRvYyBQYXJzZWQgS01MIGRhdGEuICovXG4gIHRoaXMuZmFpbGVkUGFyc2UgICAgICAgICA9IG51bGwsXG4gIC8qKlxuICAgKiBJZiBzdXBwbGllZCwgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbmNlIGZvciBlYWNoIG1hcmtlciA8UGxhY2VtYXJrPiBpbiB0aGUgS01MIGRvY3VtZW50LCBpbnN0ZWFkIG9mIHRoZSBwYXJzZXIgYWRkaW5nIGl0cyBvd24gTWFya2VyIHRvIHRoZSBtYXAuXG4gICAqIEBwYXJhbSB7Z2VvWE1MMy5wYXJzZXIucmVuZGVyI3BsYWNlbWFya30gcGxhY2VtYXJrIFBsYWNlbWFyayBvYmplY3QuXG4gICAqIEBwYXJhbSB7Z2VvWE1MMy5wYXJzZXIjZG9jc30gZG9jIFBhcnNlZCBLTUwgZGF0YS5cbiAgICovXG4gIHRoaXMuY3JlYXRlTWFya2VyICAgICAgICA9IG51bGwsXG4gIC8qKlxuICAgKiBJZiBzdXBwbGllZCwgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbmNlIGZvciBlYWNoIDxHcm91bmRPdmVybGF5PiBpbiB0aGUgS01MIGRvY3VtZW50LCBpbnN0ZWFkIG9mIHRoZSBwYXJzZXIgYWRkaW5nIGl0cyBvd24gUHJvamVjdGVkT3ZlcmxheSB0byB0aGUgbWFwLlxuICAgKiBAcGFyYW0ge2dlb1hNTDMucGFyc2VyLnJlbmRlciNncm91bmRPdmVybGF5fSBncm91bmRPdmVybGF5IEdyb3VuZE92ZXJsYXkgb2JqZWN0LlxuICAgKiBAcGFyYW0ge2dlb1hNTDMucGFyc2VyI2RvY3N9IGRvYyBQYXJzZWQgS01MIGRhdGEuXG4gICAqL1xuICB0aGlzLmNyZWF0ZU92ZXJsYXkgICAgICAgPSBudWxsXG4gIC8qKiNALSovXG5cbiAgaWYgKG92ZXJyaWRlcykge1xuICAgIGZvciAodmFyIHByb3AgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICBpZiAob3ZlcnJpZGVzLmhhc093blByb3BlcnR5KHByb3ApKSB0aGlzW3Byb3BdID0gb3ZlcnJpZGVzW3Byb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29tYmluZSB0d28gb3B0aW9ucyBvYmplY3RzOiBhIHNldCBvZiBkZWZhdWx0IHZhbHVlcyBhbmQgYSBzZXQgb2Ygb3ZlcnJpZGUgdmFsdWVzLlxuICpcbiAqIEBkZXByZWNhdGVkIFRoaXMgaGFzIGJlZW4gcmVwbGFjZWQgd2l0aCB7QGxpbmsgZ2VvWE1MMy5wYXJzZXJPcHRpb25zI2NvbWJpbmVPcHRpb25zfS5cbiAqIEBwYXJhbSB7Z2VvWE1MMy5wYXJzZXJPcHRpb25zfE9iamVjdH0gb3ZlcnJpZGVzIE92ZXJyaWRlIHZhbHVlcy5cbiAqIEBwYXJhbSB7Z2VvWE1MMy5wYXJzZXJPcHRpb25zfE9iamVjdH0gZGVmYXVsdHMgRGVmYXVsdCB2YWx1ZXMuXG4gKiBAcmV0dXJuIHtnZW9YTUwzLnBhcnNlck9wdGlvbnN9IENvbWJpbmVkIHJlc3VsdC5cbiAqL1xuZ2VvWE1MMy5jb21iaW5lT3B0aW9ucyA9IGZ1bmN0aW9uIChvdmVycmlkZXMsIGRlZmF1bHRzKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKCEhb3ZlcnJpZGVzKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBvdmVycmlkZXMpIHtcbiAgICAgIGlmIChvdmVycmlkZXMuaGFzT3duUHJvcGVydHkocHJvcCkpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Byb3BdID0gb3ZlcnJpZGVzW3Byb3BdO1xuICAgIH1cbiAgfVxuICBpZiAoISFkZWZhdWx0cykge1xuICAgIGZvciAocHJvcCBpbiBkZWZhdWx0cykge1xuICAgICAgaWYgKGRlZmF1bHRzLmhhc093blByb3BlcnR5KHByb3ApICYmIHJlc3VsdFtwcm9wXSA9PT0gdW5kZWZpbmVkKSByZXN1bHRbcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQ29tYmluZSB0d28gb3B0aW9ucyBvYmplY3RzOiBhIHNldCBvZiBkZWZhdWx0IHZhbHVlcyBhbmQgYSBzZXQgb2Ygb3ZlcnJpZGUgdmFsdWVzLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtnZW9YTUwzLnBhcnNlck9wdGlvbnN8T2JqZWN0fSBvdmVycmlkZXMgT3ZlcnJpZGUgdmFsdWVzLlxuICogQHBhcmFtIHtnZW9YTUwzLnBhcnNlck9wdGlvbnN8T2JqZWN0fSBkZWZhdWx0cyBEZWZhdWx0IHZhbHVlcy5cbiAqIEByZXR1cm4ge2dlb1hNTDMucGFyc2VyT3B0aW9uc30gQ29tYmluZWQgcmVzdWx0LlxuICovXG5nZW9YTUwzLnBhcnNlck9wdGlvbnMucHJvdG90eXBlLmNvbWJpbmVPcHRpb25zID0gZ2VvWE1MMy5jb21iaW5lT3B0aW9ucztcblxuLy8gUmV0cmlldmUgYW4gWE1MIGRvY3VtZW50IGZyb20gdXJsIGFuZCBwYXNzIGl0IHRvIGNhbGxiYWNrIGFzIGEgRE9NIGRvY3VtZW50XG5nZW9YTUwzLmZldGNoZXJzID0gW107XG5cbi8qKlxuICogUGFyc2VzIGEgWE1MIHN0cmluZy5cbiAqXG4gKiA8cD5QYXJzZXMgdGhlIGdpdmVuIFhNTCBzdHJpbmcgYW5kIHJldHVybnMgdGhlIHBhcnNlZCBkb2N1bWVudCBpbiBhXG4gKiBET00gZGF0YSBzdHJ1Y3R1cmUuIFRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gYW4gZW1wdHkgRE9NIG5vZGUgaWZcbiAqIFhNTCBwYXJzaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyLjwvcD5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFhNTCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtFbGVtZW50fERvY3VtZW50fSBET00uXG4gKi9cbmdlb1hNTDMueG1sUGFyc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIGlmICgodHlwZW9mIEFjdGl2ZVhPYmplY3QgIT0gJ3VuZGVmaW5lZCcpIHx8IChcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3cpKSB7XG4gICAgdmFyIGRvYyA9IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MRE9NJyk7XG4gICAgZG9jLmxvYWRYTUwoc3RyKTtcbiAgICByZXR1cm4gZG9jO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBET01QYXJzZXIgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHN0ciwgJ3RleHQveG1sJyk7XG4gIH1cblxuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGZvciBYTUwgcGFyc2UgZXJyb3IuXG4gKlxuICogQHBhcmFtIHt4bWxET019IFhNTCBET00uXG4gKiBAcmV0dXJuIGJvb2xlYW4uXG4gKi9cbi8vIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTU2MzU1NC9ob3ctZG8taS1kZXRlY3QteG1sLXBhcnNpbmctZXJyb3JzLXdoZW4tdXNpbmctamF2YXNjcmlwdHMtZG9tcGFyc2VyLWluLWEtY3Jvc3Ncbmdlb1hNTDMuaXNQYXJzZUVycm9yID0gZnVuY3Rpb24ocGFyc2VkRG9jdW1lbnQpIHtcbiAgICBpZiAoKHR5cGVvZiBBY3RpdmVYT2JqZWN0ICE9ICd1bmRlZmluZWQnKSB8fCAoXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93KSlcblx0cmV0dXJuIGZhbHNlO1xuICAgIC8vIHBhcnNlciBhbmQgcGFyc2VyZXJyb3JOUyBjb3VsZCBiZSBjYWNoZWQgb24gc3RhcnR1cCBmb3IgZWZmaWNpZW5jeVxuICAgIHZhciBwID0gbmV3IERPTVBhcnNlcigpLFxuICAgICAgICBlcnJvcm5lb3VzUGFyc2UgPSBwLnBhcnNlRnJvbVN0cmluZygnPCcsICd0ZXh0L3htbCcpLFxuICAgICAgICBwYXJzZXJlcnJvck5TID0gZXJyb3JuZW91c1BhcnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGFyc2VyZXJyb3JcIilbMF0ubmFtZXNwYWNlVVJJO1xuXG4gICAgaWYgKHBhcnNlcmVycm9yTlMgPT09ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJykge1xuICAgICAgICAvLyBJbiBQaGFudG9tSlMgdGhlIHBhcnNlZXJyb3IgZWxlbWVudCBkb2Vzbid0IHNlZW0gdG8gaGF2ZSBhIHNwZWNpYWwgbmFtZXNwYWNlLCBzbyB3ZSBhcmUganVzdCBndWVzc2luZyBoZXJlIDooXG4gICAgICAgIHJldHVybiBwYXJzZWREb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBhcnNlcmVycm9yXCIpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlZERvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lTlMocGFyc2VyZXJyb3JOUywgJ3BhcnNlcmVycm9yJykubGVuZ3RoID4gMDtcbn07XG5cbi8qKlxuICogRmV0Y2hlcyBhIFhNTCBkb2N1bWVudC5cbiAqXG4gKiA8cD5GZXRjaGVzL3BhcnNlcyB0aGUgZ2l2ZW4gWE1MIFVSTCBhbmQgcGFzc2VzIHRoZSBwYXJzZWQgZG9jdW1lbnQgKGluIGFcbiAqIERPTSBkYXRhIHN0cnVjdHVyZSkgdG8gdGhlIGdpdmVuIGNhbGxiYWNrLiAgRG9jdW1lbnRzIGFyZSBkb3dubG9hZGVkXG4gKiBhbmQgcGFyc2VkIGFzeW5jaHJvbm91c2x5LjwvcD5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIFVSTCBvZiBYTUwgZG9jdW1lbnQuICBNdXN0IGJlIHVuY29tcHJlc3NlZCBYTUwgb25seS5cbiAqIEBwYXJhbSB7RnVuY3Rpb24oRG9jdW1lbnQpfSBjYWxsYmFjayBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGRvY3VtZW50IGlzIHByb2Nlc3NlZC5cbiAqL1xuZ2VvWE1MMy5mZXRjaFhNTCA9IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIHRpbWVvdXRIYW5kbGVyKCkgeyBjYWxsYmFjaygpOyB9O1xuXG4gIHZhciB4aHJGZXRjaGVyID0gbmV3IE9iamVjdCgpO1xuICBpZiAgICAgICghIWdlb1hNTDMuZmV0Y2hlcnMubGVuZ3RoKSB4aHJGZXRjaGVyID0gZ2VvWE1MMy5mZXRjaGVycy5wb3AoKTtcbiAgZWxzZSBpZiAoISF3aW5kb3cuWE1MSHR0cFJlcXVlc3QpICAgeGhyRmV0Y2hlci5mZXRjaGVyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpOyAgLy8gTW9zdCBicm93c2Vyc1xuICBlbHNlIGlmICghIXdpbmRvdy5BY3RpdmVYT2JqZWN0KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTb21lIElFXG4gICAgLy8gdGhlIG1hbnkgdmVyc2lvbnMgb2YgSUUncyBYTUwgZmV0Y2hlcnNcbiAgICB2YXIgQVhPcyA9IFtcbiAgICAgICdNU1hNTDIuWE1MSFRUUC42LjAnLFxuICAgICAgJ01TWE1MMi5YTUxIVFRQLjUuMCcsXG4gICAgICAnTVNYTUwyLlhNTEhUVFAuNC4wJyxcbiAgICAgICdNU1hNTDIuWE1MSFRUUC4zLjAnLFxuICAgICAgJ01TWE1MMi5YTUxIVFRQJyxcbiAgICAgICdNaWNyb3NvZnQuWE1MSFRUUCcsXG4gICAgICAnTVNYTUwuWE1MSFRUUCdcbiAgICBdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQVhPcy5sZW5ndGg7IGkrKykge1xuICAgICAgdHJ5ICAgICAgeyB4aHJGZXRjaGVyLmZldGNoZXIgPSBuZXcgQWN0aXZlWE9iamVjdChBWE9zW2ldKTsgYnJlYWs7IH1cbiAgICAgIGNhdGNoKGUpIHsgY29udGludWU7IH1cbiAgICB9XG4gICAgaWYgKCF4aHJGZXRjaGVyLmZldGNoZXIpIHtcbiAgICAgIGdlb1hNTDMubG9nKCdVbmFibGUgdG8gY3JlYXRlIFhIUiBvYmplY3QnKTtcbiAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgeGhyRmV0Y2hlci5mZXRjaGVyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gIGlmICghIXhockZldGNoZXIuZmV0Y2hlci5vdmVycmlkZU1pbWVUeXBlKSB4aHJGZXRjaGVyLmZldGNoZXIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC94bWwnKTtcbiAgeGhyRmV0Y2hlci5mZXRjaGVyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoeGhyRmV0Y2hlci5mZXRjaGVyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIC8vIFJldHJpZXZhbCBjb21wbGV0ZVxuICAgICAgaWYgKCEheGhyRmV0Y2hlci54aHJ0aW1lb3V0KSBjbGVhclRpbWVvdXQoeGhyRmV0Y2hlci54aHJ0aW1lb3V0KTtcbiAgICAgIGlmICh4aHJGZXRjaGVyLmZldGNoZXIuc3RhdHVzID49IDQwMCkge1xuICAgICAgICBnZW9YTUwzLmxvZygnSFRUUCBlcnJvciAnICsgeGhyRmV0Y2hlci5mZXRjaGVyLnN0YXR1cyArICcgcmV0cmlldmluZyAnICsgdXJsKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICAgIC8vIFJldHVybmVkIHN1Y2Nlc3NmdWxseVxuICAgICAgZWxzZSB7XG4gICAgICAgaWYgKHhockZldGNoZXIuZmV0Y2hlci5yZXNwb25zZVhNTCkge1xuICAgICAgICAvLyBTb21ldGltZXMgSUUgd2lsbCBnZXQgdGhlIGRhdGEsIGJ1dCB3b24ndCBib3RoZXIgbG9hZGluZyBpdCBhcyBhbiBYTUwgZG9jXG4gICAgICAgIHZhciB4bWwgPSB4aHJGZXRjaGVyLmZldGNoZXIucmVzcG9uc2VYTUw7XG4gICAgICAgIGlmICh4bWwgJiYgIXhtbC5kb2N1bWVudEVsZW1lbnQgJiYgIXhtbC5vd25lckVsZW1lbnQpIHtcbiAgICAgICAgIHhtbC5sb2FkWE1MKHhockZldGNoZXIuZmV0Y2hlci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9XG4gICAgICAgfSBlbHNlIHsvLyBoYW5kbGUgdmFsaWQgeG1sIHNlbnQgd2l0aCB3cm9uZyBNSU1FIHR5cGVcbiAgICAgICAgeG1sPWdlb1hNTDMueG1sUGFyc2UoeGhyRmV0Y2hlci5mZXRjaGVyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgfVxuICAgICAgIC8vIGhhbmRsZSBwYXJzZSBlcnJvcnNcbiAgICAgICBpZiAoeG1sLnBhcnNlRXJyb3IgJiYgKHhtbC5wYXJzZUVycm9yLmVycm9yQ29kZSAhPSAwKSkge1xuICAgICAgICBnZW9YTUwzLmxvZyhcIlhNTCBwYXJzZSBlcnJvciBcIit4bWwucGFyc2VFcnJvci5lcnJvckNvZGUrXCIsIFwiK3htbC5wYXJzZUVycm9yLnJlYXNvbitcIlxcbkxpbmU6XCIreG1sLnBhcnNlRXJyb3IubGluZStcIiwgUG9zaXRpb246XCIreG1sLnBhcnNlRXJyb3IubGluZXBvcytcIiwgc3JjVGV4dDpcIit4bWwucGFyc2VFcnJvci5zcmNUZXh0KTtcbiAgICAgICAgeG1sID0gXCJmYWlsZWQgcGFyc2VcIlxuICAgICAgIH0gZWxzZSBpZiAoZ2VvWE1MMy5pc1BhcnNlRXJyb3IoeG1sKSkge1xuICAgICAgICBnZW9YTUwzLmxvZyhcIlhNTCBwYXJzZSBlcnJvclwiKTtcbiAgICAgICAgeG1sID0gXCJmYWlsZWQgcGFyc2VcIlxuICAgICAgIH1cbiAgICAgICBjYWxsYmFjayh4bWwpO1xuICAgICAgfVxuICAgICAgLy8gV2UncmUgZG9uZSB3aXRoIHRoaXMgZmV0Y2hlciBvYmplY3RcbiAgICAgIGdlb1hNTDMuZmV0Y2hlcnMucHVzaCh4aHJGZXRjaGVyKTtcbiAgICB9XG4gIH07XG5cbiAgeGhyRmV0Y2hlci54aHJ0aW1lb3V0ID0gc2V0VGltZW91dCh0aW1lb3V0SGFuZGxlciwgNjAwMDApO1xuICB4aHJGZXRjaGVyLmZldGNoZXIuc2VuZChudWxsKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG52YXIgSUV2ZXJzaW9uID0gZnVuY3Rpb24oKSB7XG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vd29ya3Nob3AvYXV0aG9yL2RodG1sL292ZXJ2aWV3L2Jyb3dzZXJkZXRlY3Rpb24uYXNwXG4gIC8vIFJldHVybnMgdGhlIHZlcnNpb24gb2YgSW50ZXJuZXQgRXhwbG9yZXIgb3IgYSAtMVxuICAvLyAoaW5kaWNhdGluZyB0aGUgdXNlIG9mIGFub3RoZXIgYnJvd3NlcikuXG4gIHZhciBydiA9IC0xOyAvLyBSZXR1cm4gdmFsdWUgYXNzdW1lcyBmYWlsdXJlXG4gIGlmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJykge1xuICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgdmFyIHJlID0gbmV3IFJlZ0V4cChcIk1TSUUgKFswLTldezEsfVtcXC4wLTldezAsfSlcIik7XG4gICAgaWYgKHJlLmV4ZWModWEpICE9IG51bGwpIHtcbiAgICAgIHJ2ID0gcGFyc2VGbG9hdCggUmVnRXhwLiQxICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBydjtcbn07XG5cbi8qKlxuICogRmV0Y2hlcyBhIEtNWiBkb2N1bWVudC5cbiAqXG4gKiA8cD5GZXRjaGVzL3BhcnNlcyB0aGUgZ2l2ZW4gWklQIFVSTCwgcGFyc2VzIGVhY2ggaW1hZ2UgZmlsZSwgYW5kIHBhc3Nlc1xuICogdGhlIHBhcnNlZCBLTUwgZG9jdW1lbnQgdG8gdGhlIGdpdmVuIGNhbGxiYWNrLiAgRG9jdW1lbnRzIGFyZSBkb3dubG9hZGVkXG4gKiBhbmQgcGFyc2VkIGFzeW5jaHJvbm91c2x5LCB0aG91Z2ggdGhlIEtNTCBmaWxlIGlzIGFsd2F5cyBwYXNzZWQgYWZ0ZXIgdGhlXG4gKiBpbWFnZXMgaGF2ZSBiZWVuIHByb2Nlc3NlZCwgaW4gY2FzZSB0aGUgY2FsbGJhY2sgcmVxdWlyZXMgdGhlIGltYWdlIGRhdGEuPC9wPlxuICpcbiAqIEByZXF1aXJlcyBaaXBGaWxlLmNvbXBsZXRlLmpzXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIFVSTCBvZiBLTVogZG9jdW1lbnQuICBNdXN0IGJlIGEgdmFsaWQgS01aL1pJUCBhcmNoaXZlLlxuICogQHBhcmFtIHtGdW5jdGlvbihEb2N1bWVudCl9IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgZG9jdW1lbnQgaXMgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtnZW9YTUwzLnBhcnNlcn0gcGFyc2VyIEEgZ2VvWE1MMy5wYXJzZXIgb2JqZWN0LiAgVGhpcyBpcyB1c2VkIHRvIHBvcHVsYXRlIHRoZSBLTVogaW1hZ2UgZGF0YS5cbiAqIEBhdXRob3IgQnJlbmRhbiBCeXJkXG4gKiBAc2VlIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vYXBpcy9rbWwvZG9jdW1lbnRhdGlvbi9rbXphcmNoaXZlcy5odG1sXG4gKi9cbmdlb1hNTDMuZmV0Y2haSVAgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaywgcGFyc2VyKSB7XG4gIC8vIEp1c3QgbmVlZCBhIHNpbmdsZSAnbmV3JyBkZWNsYXJhdGlvbiB3aXRoIGEgcmVhbGx5IGxvbmcgZnVuY3Rpb24uLi5cbiAgdmFyIHppcEZpbGUgPSBuZXcgWmlwRmlsZSh1cmwsIGZ1bmN0aW9uICh6aXApIHtcbiAgICAvLyBSZXRyaWV2YWwgY29tcGxldGVcblxuICAgIC8vIENoZWNrIGZvciBFUlJPUnMgaW4gemlwLnN0YXR1c1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgemlwLnN0YXR1cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG1zZyA9IHppcC5zdGF0dXNbaV07XG4gICAgICBpZiAgICAgIChtc2cuaW5kZXhPZihcIkVSUk9SXCIpID09IDApIHtcbiAgICAgICAgZ2VvWE1MMy5sb2coJ0hUVFAvWklQIGVycm9yIHJldHJpZXZpbmcgJyArIHVybCArICc6ICcgKyBtc2cpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChtc2cuaW5kZXhPZihcIldBUk5JTkdcIikgPT0gMCkgeyAgLy8gbm9uLWZhdGFsLCBidXQgc3RpbGwgbWlnaHQgYmUgdXNlZnVsXG4gICAgICAgIGdlb1hNTDMubG9nKCdIVFRQL1pJUCB3YXJuaW5nIHJldHJpZXZpbmcgJyArIHVybCArICc6ICcgKyBtc2cpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSBLTVogc3RydWN0dXJlIGlzIGFjY29yZGluZyB0byBzcGVjICh3aXRoIGEgc2luZ2xlIEtNTCBmaWxlIGluIHRoZSByb290IGRpcilcbiAgICB2YXIgS01MQ291bnQgPSAwO1xuICAgIHZhciBLTUw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB6aXAuZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWUgPSB6aXAuZW50cmllc1tpXS5uYW1lO1xuICAgICAgaWYgKCEvXFwua21sJC8udGVzdChuYW1lKSkgY29udGludWU7XG5cbiAgICAgIEtNTENvdW50Kys7XG4gICAgICBpZiAoS01MQ291bnQgPT0gMSkgS01MID0gaTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBnZW9YTUwzLmxvZygnS01aIHdhcm5pbmcgcmV0cmlldmluZyAnICsgdXJsICsgJzogZm91bmQgZXh0cmEgS01MIFwiJyArIG5hbWUgKyAnXCIgaW4gS01aOyBkaXNjYXJkaW5nLi4uJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuZWQgc3VjY2Vzc2Z1bGx5LCBidXQgc3RpbGwgbmVlZHMgZXh0cmFjdGluZ1xuICAgIHZhciBiYXNlVXJsID0gY2xlYW5VUkwoZGVmaWxlVVJMKHVybCksIHVybCkgKyAnLyc7XG4gICAgdmFyIGttbFByb2Nlc3NpbmcgPSB7ICAvLyB0aGlzIGlzIGFuIG9iamVjdCBqdXN0IHNvIGl0IGdldHMgcGFzc2VkIHByb3Blcmx5XG4gICAgICB0aW1lcjogbnVsbCxcbiAgICAgIGV4dHJhY3RMZWZ0OiAwLFxuICAgICAgdGltZXJDYWxsczogMFxuICAgIH07XG4gICAgdmFyIGV4dHJhY3RDYiA9IGZ1bmN0aW9uKGVudHJ5LCBlbnRyeUNvbnRlbnQpIHtcbiAgICAgIHZhciBtZFVybCA9IGNsZWFuVVJMKGJhc2VVcmwsIGVudHJ5Lm5hbWUpO1xuICAgICAgdmFyIGV4dCA9IGVudHJ5Lm5hbWUuc3Vic3RyaW5nKGVudHJ5Lm5hbWUubGFzdEluZGV4T2YoXCIuXCIpICsgMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGttbFByb2Nlc3NpbmcuZXh0cmFjdExlZnQtLTtcblxuICAgICAgaWYgKCh0eXBlb2YgZW50cnlDb250ZW50LmRlc2NyaXB0aW9uID09IFwic3RyaW5nXCIpICYmIChlbnRyeUNvbnRlbnQubmFtZSA9PSBcIkVycm9yXCIpKSB7XG4gICAgICAgIGdlb1hNTDMubG9nKCdLTVogZXJyb3IgZXh0cmFjdGluZyAnICsgbWRVcmwgKyAnOiAnICsgZW50cnlDb250ZW50LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBNSU1FIHR5cGVzIHRoYXQgY2FuIGJlIHVzZWQgaW4gS01MXG4gICAgICB2YXIgbWltZTtcbiAgICAgIGlmIChleHQgPT09ICdqcGcnKSBleHQgPSAnanBlZyc7XG4gICAgICBpZiAoL14oZ2lmfGpwZWd8cG5nKSQvLnRlc3QoZXh0KSkgbWltZSA9ICdpbWFnZS8nICsgZXh0O1xuICAgICAgZWxzZSBpZiAoZXh0ID09PSAnbXAzJykgICAgICAgICAgIG1pbWUgPSAnYXVkaW8vbXBlZyc7XG4gICAgICBlbHNlIGlmIChleHQgPT09ICdtNGEnKSAgICAgICAgICAgbWltZSA9ICdhdWRpby9tcDQnO1xuICAgICAgZWxzZSBpZiAoZXh0ID09PSAnbTRhJykgICAgICAgICAgIG1pbWUgPSAnYXVkaW8vTVA0LUxBVE0nO1xuICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcblxuICAgICAgcGFyc2VyLmttek1ldGFEYXRhW21kVXJsXSA9IHt9O1xuICAgICAgcGFyc2VyLmttek1ldGFEYXRhW21kVXJsXS5lbnRyeSA9IGVudHJ5O1xuICAgICAgLy8gZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRUFBT0FMTUEuLi5cbiAgICAgIHBhcnNlci5rbXpNZXRhRGF0YVttZFVybF0uZGF0YVVybCA9ICdkYXRhOicgKyBtaW1lICsgJztiYXNlNjQsJyArIGJhc2U2NEVuY29kZShlbnRyeUNvbnRlbnQpO1xuICAgICAgLy8gSUUgY2Fubm90IGhhbmRsZSBHRVQgcmVxdWVzdHMgYmV5b25kIDIwNzEgY2hhcmFjdGVycywgZXZlbiBpZiBpdCdzIGFuIGlubGluZSBpbWFnZVxuXHRpZiAoL21zaWUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmICEvb3BlcmEvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoKChJRXZlcnNpb24oKSA8IDguMCkgJiZcbiAgICAgICAgICAgICAgICAgKHBhcnNlci5rbXpNZXRhRGF0YVttZFVybF0uZGF0YVVybC5sZW5ndGggPiAyMDcxKSkgfHxcbiAgICAgICAgICAgICAgICAoKElFdmVyc2lvbiA8IDkuMCkgJiZcbiAgICAgICAgICAgICAgICAgKHBhcnNlci5rbXpNZXRhRGF0YVttZFVybF0uZGF0YVVybC5sZW5ndGggPiAzMjc2NykpKSB7XG4gICAgICAgICAgICAgcGFyc2VyLmttek1ldGFEYXRhW21kVXJsXS5kYXRhVXJsID1cbiAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2ltcGxlIElFIGljb247IHRvIGhpbnQgYXQgdGhlIHByb2JsZW0uLi5cbiAgICAgICAgICAgICAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRHdBUUFPTVBBREJQdlNwUTFEcG95ejFwNkZod3ZVMkE2RUNQNjNDTTA0Q1d4WUNrK1Y2eCtVSysrSmFvM3J2QzNmajcrdi8vL3lINUJBRUtBQThBTEFBQUFBQVBBQkFBQUFTQzhNazVtd0NBVU1sV3djTFJIRWVsTEEnICtcbiAgICAgICAgICAgICAnb0dETWd6U3NpeUdDQWhDRVREUE1oNVhRQ0J3WUJyTkJJS1dtZzBNQ1FIajhNSlU1SW9yb1lDWTZBQUFnckRJYmJRREdJSzZEUjVVUGhsTm8wSkFsU1VOQWlEZ0g3ZU5BeEVEV0FLQ1FNMkFBRmhlVnhZQUEwQUlrRk9KMWdCY1FRYVVRS0tBNXc3THBjRUJ3a0phS01VRVFBNyc7XG4gICAgICAgICAgICB9XG4gICAgICAgfVxuICAgICAgIHBhcnNlci5rbXpNZXRhRGF0YVtpbnRlcm5hbFNyYyhlbnRyeS5uYW1lKV09cGFyc2VyLmttek1ldGFEYXRhW21kVXJsXTtcblxuICAgIH07XG4gICAgdmFyIGttbEV4dHJhY3RDYiA9IGZ1bmN0aW9uKGVudHJ5LCBlbnRyeUNvbnRlbnQpIHtcbiAgICAgIGlmICgodHlwZW9mIGVudHJ5Q29udGVudC5kZXNjcmlwdGlvbiA9PSBcInN0cmluZ1wiKSAmJiAoZW50cnlDb250ZW50Lm5hbWUgPT0gXCJFcnJvclwiKSkge1xuICAgICAgICBnZW9YTUwzLmxvZygnS01aIGVycm9yIGV4dHJhY3RpbmcgJyArIG1kVXJsICsgJzogJyArIGVudHJ5Q29udGVudC5kZXNjcmlwdGlvbik7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSBLTUwgaXMgdGhlIGxhc3QgZmlsZSBleHRyYWN0ZWRcbiAgICAgIGNsZWFyVGltZW91dChrbWxQcm9jZXNzaW5nLnRpbWVyKTtcbiAgICAgIGlmIChrbWxQcm9jZXNzaW5nLmV4dHJhY3RMZWZ0IDw9IDEpIHtcbiAgICAgICAga21sUHJvY2Vzc2luZy5leHRyYWN0TGVmdC0tO1xuICAgICAgICBjYWxsYmFjayhnZW9YTUwzLnhtbFBhcnNlKGVudHJ5Q29udGVudCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gS01MIGZpbGUgaXNuJ3QgbGFzdCB5ZXQ7IGl0IG1heSBuZWVkIHRvIHVzZSB0aG9zZSBmaWxlcywgc28gd2FpdCBhIGJpdCAoMTAwbXMpXG4gICAgICAgIGttbFByb2Nlc3NpbmcudGltZXJDYWxscysrO1xuICAgICAgICBpZiAoa21sUHJvY2Vzc2luZy50aW1lckNhbGxzIDwgMTAwKSB7XG4gICAgICAgICAga21sUHJvY2Vzc2luZy50aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGttbEV4dHJhY3RDYihlbnRyeSwgZW50cnlDb250ZW50KTsgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBnZW9YTUwzLmxvZygnS01aIHdhcm5pbmcgZXh0cmFjdGluZyAnICsgdXJsICsgJzogZW50aXJlIFpJUCBoYXMgbm90IGJlZW4gZXh0cmFjdGVkIGFmdGVyIDEwIHNlY29uZHM7IHJ1bm5pbmcgdGhyb3VnaCBLTUwsIGFueXdheS4uLicpO1xuICAgICAgICAgIGttbFByb2Nlc3NpbmcuZXh0cmFjdExlZnQtLTtcbiAgICAgICAgICBjYWxsYmFjayhnZW9YTUwzLnhtbFBhcnNlKGVudHJ5Q29udGVudCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHppcC5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZW50cnkgPSB6aXAuZW50cmllc1tpXTtcbiAgICAgIHZhciBleHQgPSBlbnRyeS5uYW1lLnN1YnN0cmluZyhlbnRyeS5uYW1lLmxhc3RJbmRleE9mKFwiLlwiKSArIDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIS9eKGdpZnxqcGU/Z3xwbmd8a21sKSQvLnRlc3QoZXh0KSkgY29udGludWU7ICAvLyBub3QgZ29pbmcgdG8gYm90aGVyIHRvIGV4dHJhY3QgZmlsZXMgd2UgZG9uJ3Qgc3VwcG9ydFxuICAgICAgaWYgKGV4dCA9PT0gXCJrbWxcIiAmJiBpICE9IEtNTCkgICAgICAgICAgY29udGludWU7ICAvLyBleHRyYSBLTUxzIGdldCBkaXNjYXJkZWRcbiAgICAgIGlmICghcGFyc2VyICYmIGV4dCAhPSBcImttbFwiKSAgICAgICAgICAgIGNvbnRpbnVlOyAgLy8gY2Fubm90IHN0b3JlIGltYWdlcyB3aXRob3V0IGEgcGFyc2VyIG9iamVjdFxuXG4gICAgICAvLyBleHRyYWN0IGFzeW5jaHJvbm91c2x5XG4gICAgICBrbWxQcm9jZXNzaW5nLmV4dHJhY3RMZWZ0Kys7XG4gICAgICBpZiAoZXh0ID09PSBcImttbFwiKSBlbnRyeS5leHRyYWN0KGttbEV4dHJhY3RDYik7XG4gICAgICBlbHNlICAgICAgICAgICAgICAgZW50cnkuZXh0cmFjdChleHRyYWN0Q2IpO1xuICAgIH1cbiAgfSk7XG5cbn07XG5cbi8qKlxuICogRXh0cmFjdCB0aGUgdGV4dCB2YWx1ZSBvZiBhIERPTSBub2RlLCB3aXRoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UgdHJpbW1lZC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGUgWE1MIG5vZGUvZWxlbWVudC5cbiAqIEBwYXJhbSB7QW55fSBkZWxWYWwgRGVmYXVsdCB2YWx1ZSBpZiB0aGUgbm9kZSBkb2Vzbid0IGV4aXN0LlxuICogQHJldHVybiB7U3RyaW5nfE51bGx9XG4gKi9cbmdlb1hNTDMubm9kZVZhbHVlID0gZnVuY3Rpb24obm9kZSwgZGVmVmFsKSB7XG4gIHZhciByZXRTdHI9XCJcIjtcbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZGVmVmFsID09PSAndW5kZWZpbmVkJyB8fCBkZWZWYWwgPT09IG51bGwpID8gbnVsbCA6IGRlZlZhbDtcbiAgfVxuICAgaWYobm9kZS5ub2RlVHlwZT09M3x8bm9kZS5ub2RlVHlwZT09NHx8bm9kZS5ub2RlVHlwZT09Mil7XG4gICAgICByZXRTdHIrPW5vZGUubm9kZVZhbHVlO1xuICAgfWVsc2UgaWYobm9kZS5ub2RlVHlwZT09MXx8bm9kZS5ub2RlVHlwZT09OXx8bm9kZS5ub2RlVHlwZT09MTEpe1xuICAgICAgZm9yKHZhciBpPTA7aTxub2RlLmNoaWxkTm9kZXMubGVuZ3RoOysraSl7XG4gICAgICAgICByZXRTdHIrPWFyZ3VtZW50cy5jYWxsZWUobm9kZS5jaGlsZE5vZGVzW2ldKTtcbiAgICAgIH1cbiAgIH1cbiAgIHJldHVybiByZXRTdHI7XG59O1xuXG4vKipcbiAqIExvb3NlbHkgdHJhbnNsYXRlIHZhcmlvdXMgdmFsdWVzIG9mIGEgRE9NIG5vZGUgdG8gYSBib29sZWFuLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZSBYTUwgbm9kZS9lbGVtZW50LlxuICogQHBhcmFtIHtCb29sZWFufSBkZWxWYWwgRGVmYXVsdCB2YWx1ZSBpZiB0aGUgbm9kZSBkb2Vzbid0IGV4aXN0LlxuICogQHJldHVybiB7Qm9vbGVhbnxOdWxsfVxuICovXG5nZW9YTUwzLmdldEJvb2xlYW5WYWx1ZSA9IGZ1bmN0aW9uKG5vZGUsIGRlZlZhbCkge1xuICB2YXIgbm9kZUNvbnRlbnRzID0gZ2VvWE1MMy5ub2RlVmFsdWUobm9kZSk7XG4gIGlmIChub2RlQ29udGVudHMgPT09IG51bGwpIHJldHVybiBkZWZWYWwgfHwgZmFsc2U7XG4gIG5vZGVDb250ZW50cyA9IHBhcnNlSW50KG5vZGVDb250ZW50cyk7XG4gIGlmIChpc05hTihub2RlQ29udGVudHMpKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKG5vZGVDb250ZW50cyA9PSAwKSByZXR1cm4gZmFsc2U7XG4gIGVsc2UgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogQnJvd3Nlci1ub3JtYWxpemVkIHZlcnNpb24gb2YgZ2V0RWxlbWVudHNCeVRhZ05hbWVOUy5cbiAqXG4gKiA8cD5SZXF1aXJlZCBiZWNhdXNlIElFOCBkb2Vzbid0IGRlZmluZSBpdC48L3A+XG4gKlxuICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50fSBub2RlIERPTSBvYmplY3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIEZ1bGwgbmFtZXNwYWNlIFVSTCB0byBzZWFyY2ggYWdhaW5zdC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0YWduYW1lIFhNTCBsb2NhbCB0YWcgbmFtZS5cbiAqIEByZXR1cm4ge0FycmF5IG9mIEVsZW1lbnRzfVxuICogQGF1dGhvciBCcmVuZGFuIEJ5cmRcbiAqL1xuZ2VvWE1MMy5nZXRFbGVtZW50c0J5VGFnTmFtZU5TID0gZnVuY3Rpb24obm9kZSwgbmFtZXNwYWNlLCB0YWduYW1lKSB7XG4gIGlmIChub2RlICYmIHR5cGVvZiBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lTlMgIT0gJ3VuZGVmaW5lZCcpIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lTlMobmFtZXNwYWNlLCB0YWduYW1lKTtcbiAgaWYgKCFub2RlKSByZXR1cm4gW107XG5cbiAgdmFyIHJvb3QgPSBub2RlLmRvY3VtZW50RWxlbWVudCB8fCBub2RlLm93bmVyRG9jdW1lbnQgJiYgbm9kZS5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgaWYgKCFyb290IHx8ICFyb290LmF0dHJpYnV0ZXMpIHJldHVybiBbXTtcblxuICAvLyBzZWFyY2ggZm9yIG5hbWVzcGFjZSBwcmVmaXhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb290LmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYXR0ciA9IHJvb3QuYXR0cmlidXRlc1tpXTtcbiAgICBpZiAgICAgIChhdHRyLnByZWZpeCAgID09PSAneG1sbnMnICYmIGF0dHIubm9kZVZhbHVlID09PSBuYW1lc3BhY2UpIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKGF0dHIuYmFzZU5hbWUgKyAnOicgKyB0YWduYW1lKTtcbiAgICBlbHNlIGlmIChhdHRyLm5vZGVOYW1lID09PSAneG1sbnMnICYmIGF0dHIubm9kZVZhbHVlID09PSBuYW1lc3BhY2UpIHtcbiAgICAgIC8vIGRlZmF1bHQgbmFtZXNwYWNlXG4gICAgICBpZiAodHlwZW9mIG5vZGUuc2VsZWN0Tm9kZXMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gTmV3ZXIgSUVzIGhhdmUgdGhlIFNlbGVjdGlvbk5hbWVzcGFjZSBwcm9wZXJ0eSB0aGF0IGNhbiBiZSB1c2VkIHdpdGggc2VsZWN0Tm9kZXNcbiAgICAgICAgaWYgKCFyb290Lm93bmVyRG9jdW1lbnQuZ2V0UHJvcGVydHkoJ1NlbGVjdGlvbk5hbWVzcGFjZXMnKSlcbiAgICAgICAgICByb290Lm93bmVyRG9jdW1lbnQuc2V0UHJvcGVydHkoJ1NlbGVjdGlvbk5hbWVzcGFjZXMnLCBcInhtbG5zOmRlZmF1bHROUz0nXCIgKyBuYW1lc3BhY2UgKyBcIidcIik7XG4gICAgICAgIHJldHVybiBub2RlLnNlbGVjdE5vZGVzKCcuLy9kZWZhdWx0TlM6JyArIHRhZ25hbWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgeW91IGNhbiBzdGlsbCB0cnkgdG8gdGFjayBvbiB0aGUgJ3htbG5zJyBhdHRyaWJ1dGUgdG8gcm9vdFxuICAgICAgICByb290LnNldEF0dHJpYnV0ZSgneG1sbnM6ZGVmYXVsdE5TJywgbmFtZXNwYWNlKTtcbiAgICAgICAgcmV0dXJuIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RlZmF1bHROUzonICsgdGFnbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBnZW9YTUwzLmdldEVsZW1lbnRzQnlUYWdOYW1lKG5vZGUsIHRhZ25hbWUpOyAgLy8gdHJ5IHRoZSB1bnF1YWxpZmllZCB2ZXJzaW9uXG59O1xuXG4vKipcbiAqIEJyb3dzZXItbm9ybWFsaXplZCB2ZXJzaW9uIG9mIGdldEVsZW1lbnRzQnlUYWdOYW1lLlxuICpcbiAqIDxwPlJlcXVpcmVkIGJlY2F1c2UgTVNYTUwgNi4wIHdpbGwgdHJlYXQgdGhpcyBmdW5jdGlvbiBhcyBhIE5TLXF1YWxpZmllZCBmdW5jdGlvbixcbiAqIGRlc3BpdGUgdGhlIG1pc3NpbmcgTlMgcGFyYW1ldGVyLjwvcD5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnR9IG5vZGUgRE9NIG9iamVjdC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0YWduYW1lIFhNTCBsb2NhbCB0YWcgbmFtZS5cbiAqIEByZXR1cm4ge0FycmF5IG9mIEVsZW1lbnRzfVxuICogQGF1dGhvciBCcmVuZGFuIEJ5cmRcbiAqL1xuZ2VvWE1MMy5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGZ1bmN0aW9uKG5vZGUsIHRhZ25hbWUpIHtcbiAgaWYgKG5vZGUgJiYgdHlwZW9mIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyAhPSAndW5kZWZpbmVkJykgcmV0dXJuIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnbmFtZSk7ICAvLyBpZiBpdCBoYXMgYm90aCBmdW5jdGlvbnMsIGl0IHNob3VsZCBiZSBhY2N1cmF0ZVxuLy8gIGlmIChub2RlICYmIHR5cGVvZiBub2RlLnNlbGVjdE5vZGVzICE9ICd1bmRlZmluZWQnKSAgICAgICAgICAgIHJldHVybiBub2RlLnNlbGVjdE5vZGVzKFwiLi8vKltsb2NhbC1uYW1lKCk9J1wiICsgdGFnbmFtZSArIFwiJ11cIik7XG4gIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ25hbWUpOyAgLy8gaG9wZSBmb3IgdGhlIGJlc3QuLi5cbn1cblxuLyoqXG4gKiBUdXJuIGEgZGlyZWN0b3J5ICsgcmVsYXRpdmUgVVJMIGludG8gYW4gYWJzb2x1dGUgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gZCBCYXNlIGRpcmVjdG9yeS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzIFJlbGF0aXZlIFVSTC5cbiAqIEByZXR1cm4ge1N0cmluZ30gQWJzb2x1dGUgVVJMLlxuICogQGF1dGhvciBCcmVuZGFuIEJ5cmRcbiAqL1xudmFyIHRvQWJzVVJMID0gZnVuY3Rpb24gKGQsIHMpIHtcbiAgdmFyIHAsIGYsIGk7XG4gIHZhciBoID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIjovL1wiICsgbG9jYXRpb24uaG9zdDtcblxuICBpZiAoIXMubGVuZ3RoKSAgICAgICAgICAgcmV0dXJuICcnO1xuICBpZiAoL15cXHcrOi8udGVzdChzKSkgICAgIHJldHVybiBzO1xuICBpZiAocy5pbmRleE9mKCcvJykgPT0gMCkgcmV0dXJuIGggKyBzO1xuXG4gIHAgPSBkLnJlcGxhY2UoL1xcL1teXFwvXSokLywgJycpO1xuICBmID0gcy5tYXRjaCgvXFwuXFwuXFwvL2cpO1xuICBpZiAoZikge1xuICAgIHMgPSBzLnN1YnN0cmluZyhmLmxlbmd0aCAqIDMpO1xuICAgIGZvciAoaSA9IGYubGVuZ3RoOyBpLS07KSB7IHAgPSBwLnN1YnN0cmluZygwLCBwLmxhc3RJbmRleE9mKCcvJykpOyB9XG4gIH1cblxuICByZXR1cm4gaCArIHAgKyAnLycgKyBzO1xufVxuXG52YXIgaW50ZXJuYWxTcmMgPSBmdW5jdGlvbihzcmMpIHtcbiAgLy90aGlzIGdldHMgdGhlIGZ1bGwgdXJsXG4gIHZhciB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAvL3RoaXMgcmVtb3ZlcyBldmVyeXRoaW5nIGFmdGVyIHRoZSBsYXN0IHNsYXNoIGluIHRoZSBwYXRoXG4gIHVybCA9IHVybC5zdWJzdHJpbmcoMCx1cmwubGFzdEluZGV4T2YoXCIvXCIpICsgMSk7XG4gIHZhciBpbnRlcm5hbFBhdGg9IHVybCtzcmM7XG4gIHJldHVybiBpbnRlcm5hbFBhdGg7XG59XG5cbi8qKlxuICogUmVtb3ZlIGN1cnJlbnQgaG9zdCBmcm9tIFVSTFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJvb3QtYmFzZWQgcmVsYXRpdmUgVVJMLlxuICogQGF1dGhvciBCcmVuZGFuIEJ5cmRcbiAqL1xudmFyIGRlaG9zdFVSTCA9IGZ1bmN0aW9uIChzKSB7XG4gIHZhciBoID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIjovL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgaCA9IGgucmVwbGFjZSgvKFtcXC5cXFxcXFwrXFwqXFw/XFxbXFxeXFxdXFwkXFwoXFwpXSkvZywgJ1xcXFwkMScpOyAgLy8gcXVvdGVtZXRhXG4gIHJldHVybiBzLnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyBoLCAnaScpLCAnJyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgcXVlcnkgc3RyaW5ncywgI0lEcywgJy4uLycgcmVmZXJlbmNlcywgYW5kXG4gKiBob3N0cyBmcm9tIGEgVVJMLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gZCBCYXNlIGRpcmVjdG9yeS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTC5cbiAqIEByZXR1cm4ge1N0cmluZ30gUm9vdC1iYXNlZCByZWxhdGl2ZSBVUkwuXG4gKiBAYXV0aG9yIEJyZW5kYW4gQnlyZFxuICovXG52YXIgY2xlYW5VUkwgID0gZnVuY3Rpb24gKGQsIHMpIHsgcmV0dXJuIGRlaG9zdFVSTCh0b0Fic1VSTChkID8gZC5zcGxpdCgnIycpWzBdLnNwbGl0KCc/JylbMF0gOiBkZWZpbGVVUkwobG9jYXRpb24ucGF0aG5hbWUpLCBzID8gcy5zcGxpdCgnIycpWzBdLnNwbGl0KCc/JylbMF0gOiAnJykpOyB9XG4vKipcbiAqIFJlbW92ZSBmaWxlbmFtZSBmcm9tIFVSTFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBSZWxhdGl2ZSBVUkwuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEJhc2UgZGlyZWN0b3J5LlxuICogQGF1dGhvciBCcmVuZGFuIEJ5cmRcbiAqL1xudmFyIGRlZmlsZVVSTCA9IGZ1bmN0aW9uIChzKSAgICB7IHJldHVybiBzID8gcy5zdWJzdHIoMCwgcy5sYXN0SW5kZXhPZignLycpICsgMSkgOiAnLyc7IH1cblxuXG4vLyBTb21lIGV4dHJhIEFycmF5IHN1YnMgZm9yIGVhc2Ugb2YgdXNlXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0Mzg0Ny9iZXN0LXdheS10by1maW5kLWFuLWl0ZW0taW4tYS1qYXZhc2NyaXB0LWFycmF5XG5BcnJheS5wcm90b3R5cGUuaGFzT2JqZWN0ID0gKFxuICAhQXJyYXkuaW5kZXhPZiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgbCA9IHRoaXMubGVuZ3RoICsgMTtcbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICBpZiAodGhpc1tsIC0gMV0gPT09IG9iaikgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gKHRoaXMuaW5kZXhPZihvYmopICE9PSAtMSk7XG4gIH1cbik7XG5BcnJheS5wcm90b3R5cGUuaGFzSXRlbUluT2JqID0gZnVuY3Rpb24gKG5hbWUsIGl0ZW0pIHtcbiAgdmFyIGwgPSB0aGlzLmxlbmd0aCArIDE7XG4gIHdoaWxlIChsLS0pIHtcbiAgICBpZiAodGhpc1tsIC0gMV1bbmFtZV0gPT09IGl0ZW0pIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5pZiAoIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gIEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKG9iaiwgZnJvbUluZGV4KSB7XG4gICAgaWYgKGZyb21JbmRleCA9PSBudWxsKSB7XG4gICAgICBmcm9tSW5kZXggPSAwO1xuICAgIH0gZWxzZSBpZiAoZnJvbUluZGV4IDwgMCkge1xuICAgICAgZnJvbUluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5sZW5ndGggKyBmcm9tSW5kZXgpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gZnJvbUluZGV4LCBqID0gdGhpcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGlmICh0aGlzW2ldID09PSBvYmopIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG59XG5BcnJheS5wcm90b3R5cGUuaW5kZXhPZk9ialdpdGhJdGVtID0gZnVuY3Rpb24gKG5hbWUsIGl0ZW0sIGZyb21JbmRleCkge1xuICBpZiAoZnJvbUluZGV4ID09IG51bGwpIHtcbiAgICBmcm9tSW5kZXggPSAwO1xuICB9IGVsc2UgaWYgKGZyb21JbmRleCA8IDApIHtcbiAgICBmcm9tSW5kZXggPSBNYXRoLm1heCgwLCB0aGlzLmxlbmd0aCArIGZyb21JbmRleCk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IGZyb21JbmRleCwgaiA9IHRoaXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgaWYgKHRoaXNbaV1bbmFtZV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbi8qKlxuICogQm9ycm93ZWQgZnJvbSBqcXVlcnkuYmFzZTY0LmpzLCB3aXRoIHNvbWUgXCJBcnJheSBhcyBpbnB1dFwiIGNvcnJlY3Rpb25zXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXkgb2YgY2hhckNvZGVzfSBpbnB1dCBBbiBhcnJheSBvZiBieXRlIEFTQ0lJIGNvZGVzICgwLTI1NSkuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEEgYmFzZTY0LWVuY29kZWQgc3RyaW5nLlxuICogQGF1dGhvciBCcmVuZGFuIEJ5cmRcbiAqL1xudmFyIGJhc2U2NEVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHZhciBrZXlTdHJpbmcgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7XG4gIHZhciBvdXRwdXQgPSBcIlwiO1xuICB2YXIgY2hyMSwgY2hyMiwgY2hyMywgZW5jMSwgZW5jMiwgZW5jMywgZW5jNDtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoaSA8IGlucHV0Lmxlbmd0aCkge1xuICAgIGNocjEgPSBpbnB1dFtpKytdO1xuICAgIGNocjIgPSBpbnB1dFtpKytdO1xuICAgIGNocjMgPSBpbnB1dFtpKytdO1xuICAgIGVuYzEgPSBjaHIxID4+IDI7XG4gICAgZW5jMiA9ICgoY2hyMSAmIDMpIDw8IDQpIHwgKGNocjIgPj4gNCk7XG4gICAgZW5jMyA9ICgoY2hyMiAmIDE1KSA8PCAyKSB8IChjaHIzID4+IDYpO1xuICAgIGVuYzQgPSBjaHIzICYgNjM7XG5cbiAgICBpZiAgICAgIChjaHIyID09IHVuZGVmaW5lZCkgZW5jMyA9IGVuYzQgPSA2NDtcbiAgICBlbHNlIGlmIChjaHIzID09IHVuZGVmaW5lZCkgZW5jNCA9IDY0O1xuXG4gICAgb3V0cHV0ID0gb3V0cHV0ICsga2V5U3RyaW5nLmNoYXJBdChlbmMxKSArIGtleVN0cmluZy5jaGFyQXQoZW5jMikgKyBrZXlTdHJpbmcuY2hhckF0KGVuYzMpICsga2V5U3RyaW5nLmNoYXJBdChlbmM0KTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGFwcCA9IGFwcCB8fCB7fTtcbiAgICBhcHAuTWFwLnJlbmRlcignbWFwJyk7XG59XG5cbmZ1bmN0aW9uIHRlc3QoTWV0YWRhdGEpIHtcbiAgICBsZXQgYXJncyA9IHt9O1xuICAgIGxldCBtZXRhID0gbmV3IE1ldGFkYXRhKGFyZ3MpO1xuICAgIG1ldGEucmVhZCgpO1xufVxuXG5mdW5jdGlvbiBfZ2V0RGF0YSgpIHtcbiAgICBrbWxMb2MgPSAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0pNZW5zY2gvcGhpbGFkZWxwaGlhLXNjaG9vbC1zZWFyY2gvbWFzdGVyL2Rpc3QvZGF0YS9jYXRjaG1lbnRzLmttbCc7XG4gICAgZ2VvanNvbkxvYyA9ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vSk1lbnNjaC9waGlsYWRlbHBoaWEtc2Nob29sLW1hcC9tYXN0ZXIvZGlzdC9kYXRhL2RhdGEuZ2VvanNvbidcbn1cbmV4cG9ydCB7IGluaXQsIHRlc3QgfTtcblxuXG4vLyB0aGlzLmttbExvYyA9XG5cblxuYXBwLkFwaS5nZXQoc3JjKVxuICAgIC50aGVuKFxuICAgICAgICBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgICAgICAgICAgLy8gaWYgZ2VvanNvbiBleGlzdHMsIGFkZCBpdFxuICAgICAgICAgICAgaWYgKGdlb2pzb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZ2VvanNvbiA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBnZW9qc29uID0gSlNPTi5wYXJzZShnZW9qc29uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICk7XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgQXBpIGZyb20gJy4vQVBJJztcbi8vIGNvbnN0IEluZm9CdWJibGUgPSByZXF1aXJlKCcuL2luZm9idWJibGUnKTtcbmltcG9ydCBNYXAgZnJvbSAnLi9NYXAnO1xuaW1wb3J0IE1ldGFkYXRhIGZyb20gJy4vTWV0YWRhdGEnO1xuaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vaW5pdCc7XG5jb25zdCBnZW9YTUwzID0gcmVxdWlyZSgnLi9nZW94bWwzJyk7XG5cbmNvbnN0IGFwcCA9IHtcbiAgICAnQXBpJzogbmV3IEFwaSgpLFxuICAgICdNYXAnOiBuZXcgTWFwKCksXG4gICAgJ01ldGFkYXRhJzogbmV3IE1ldGFkYXRhKCksXG4gICAgJ2dlb1hNTDMnOiBnZW9YTUwzXG59O1xuXG4vKipcbiAqIFJ1bnMgdGhlIGFwcFxuICovXG5sZXQgcnVuID0gZnVuY3Rpb24oKSB7XG4gICAgaW5pdCgpO1xufTtcblxuXG5cbndpbmRvdy5vbmxvYWQgPSBydW47XG4iXX0=
