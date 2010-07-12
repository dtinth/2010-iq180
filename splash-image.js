/**
 * @author Thai Pangsakulyanont
 */

var cIMG = $('cimg');

var cTOGGLER = dtjs2.a.t(1.3, function(v) {
	var o = Math.max(0, v * 6 - 5);
	if (cIMG) {
		cIMG.style.opacity = o;
		cIMG.style.WebkitTransform = 'scale(' + (1 + 0.3 * dtjs2.ease.i(1 - o)) + ')'
		cIMG.style.display = o == 0 ? 'none' : '';
	}
});
var cVALUE = 0;
var cTOGGLE = function(x) {
	cTOGGLER (x);
	cVALUE = x;
};
cTOGGLE (1);
			
if (window.nativeWindow)
	window.nativeWindow.stage.displayState = runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE;
			

var cCLOSE = '';
if (window.air) 
	cCLOSE = '<div id="close" onclick="air.NativeApplication.nativeApplication.exit()"></div>';

if ($('about')) {
	$('about').innerHTML = '\n\
						<img src="logo.png" alt="Made by Thai" /><br />\n\
						Made by<br /><b>Thai Pangsakulyanont</b><br />\n\
						<b>R.W.B. #36</b><br />\n\
						http://dt.in.th/<br />\n\
						[2010-07-13]' + cCLOSE;
}

if ($('logo')) {

	$('logo').innerHTML = '\n\
						<img src="rwb.png" height="180" id="limg" alt="Ratwinit Bangkaeo School" />\n\
						<h2>กลุ่มสาระการเรียนรู้\n\
						<br />คณิตศาสตร์</h2>';
	$('logo').className = $('logo');
	
}

var lIMG = $('limg');
if (lIMG) {
	function cMOVE() {
		dtjs2.a.c (0, Math.PI * 2, 4, function(v) {
			lIMG.style.WebkitTransform = 'scalex(' + Math.cos(v) + ')';
		});
	}
	setInterval (function(){
		if (cVALUE) {
			cMOVE ();
		}
	}, 8000);
	cMOVE ();
}



