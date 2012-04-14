var	GeeLoader	=	function( _args, _callback ) {
	//_args	: string or object
	if( typeof _args == "string" ) {	//	문자열인 경
		loadScript( _args, _callback );
		
	} else {	//	배열 처
		var nIdx		=	0;
		var callback	=	function() {
			if( _args.length == nIdx ) {
				_callback();
				return;
			}
			
			loadScript( _args[ nIdx++ ], callback );
		};
		
		loadScript( _args[ nIdx++ ], callback );
	}
	
	function loadScript( _url, _callback ) {
		var _script		=	document.createElement( "script" );
		_script.type	=	"text/javascript";
		
		if( _script.readyState ) {   // 익스플로러 처리
			_script.onreadystatechange	=	function() {
				if( _script.readyState == "loaded" || _script.readyState == "complete" ) {
					_script.onreadystatechange = null;
					_callback();
				}
			};
			
		} else {   // 다른 브라우저 처리
			_script.onerror	=	function() {
				alert( "Loading failed." );
			};
			
			_script.onload = function() {
				_callback();
			};
			
		}
		
		_script.src	=	_url;
		document.getElementsByTagName( "head" )[ 0 ].appendChild( _script );
		
	}
};