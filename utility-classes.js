/**
 * @author Thai Pangsakulyanont
 */

var alimit = dtjs2.u.l(0, 1);
var emptyFn = function() {};
var randomFn = function() { return Math.random() - 0.5; };

function LCDLight(num, container, digit) {
this.num = num;
this.anim = false;
this.state = false;
this.digit = digit;
this.render ();
}
LCDLight.prototype.render = function() {
this.el = document.createElement('div');
this.el.className = 'dlight';
this.el.style.background = 'url(img/c' + this.num + '.gif) no-repeat';
this.el.style.opacity = '1';
};
LCDLight.prototype.turn = function(state) {
var el = this.el;
if (!this.state && state) {
	if (this.anim) this.anim ();
	el.style.opacity = 0;
} else if (this.state && !state) {
	if (this.anim) this.anim ();
	if (this.digit.speed) {
		el.style.opacity = 1;
	} else {
		this.anim = dtjs2.a.c(1 - ((1 - parseFloat(el.style.opacity)) / 9), 1, 0.7, function(x){
			el.style.opacity = x;
		}, dtjs2.ease.o);
	}
}
this.state = state;
return this;
};

function LCDDigit(container, className, dimZero) {
this.className = className;
this.container = container;
this.dimZero = !!dimZero;
this.render ();
this.clearAnimation = 0;
this.toggler (1);
this.container.appendChild (this.el);
}
LCDDigit.number = [
[1, 1, 0, 1, 1, 1, 1],
[0, 0, 0, 1, 0, 0, 1],
[1, 0, 1, 1, 1, 1, 0],
[1, 0, 1, 1, 0, 1, 1],
[0, 1, 1, 1, 0, 0, 1],
[1, 1, 1, 0, 0, 1, 1],
[1, 1, 1, 0, 1, 1, 1],
[1, 0, 0, 1, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 0, 1, 1],
[0, 0, 0, 0, 0, 0, 0]
];
LCDDigit.prototype.render = function() {
var el = document.createElement('div');
this.el = el;
this.lightData = LCDDigit.number[0];
this.el.className = 'digit ' + this.className;
this.glow = document.createElement('div');
this.glow.className = 'dglow';
this.lights = [];
for (var i = 0; i < 7; i ++) {
	this.lights.push (new LCDLight(i + 1, this.el, this));
}
this.mask = document.createElement('div');
this.mask.className = 'dmask';
this.el.appendChild (this.glow);
for (var i = 0; i < this.lights.length; i ++) {
	this.el.appendChild (this.lights[i].el);
}
this.el.appendChild (this.mask);
var th = this;
var easingFunction = dtjs2.ease.make(function(q) {
	return q * q * q;
}).io;
this.toggler = dtjs2.a.t(0.5, function(a) {
	if (th.isFirstChild) {
		var b = alimit(a * 3 - 2);
		var c = alimit(a * 3 / 2);
		var d = easingFunction(c);
		el.style.opacity = b;
		el.style.marginRight = (10 + (-20 * (1 - d))) + 'px';
		el.style.width = (137 * d) + 'px';
		if (th.toggler)
			th.toggler.setDuration (0.5);
	} else {
		if (th.toggler)
			th.toggler.setDuration (0.5 / 3);
		el.style.opacity = a;
	}
});
};
LCDDigit.prototype.setLights = function(al) {
this.lightData = al;
for (var i = 0; i < this.lights.length && i < al.length; i ++)
	this.setLight (i, al[i]);
return this;
};
LCDDigit.prototype.setLight = function(i, state) {
this.lights[i].turn (state);
return this;
};
LCDDigit.prototype.setNumber = function(num, digit) {
clearInterval (this.clearAnimation);
this.toggler (digit == 0 || num >= Math.pow(10, digit));
this.setLights (LCDDigit.number[getDigit(num, digit)]);
return this;
};
LCDDigit.prototype.highspeed = function() {
this.speed = true;
};
LCDDigit.step = function(al, id) {
var F = [1, 0, 3, 2, 4, 5, 6];
var R = [1, 0, 3, 2, 4, 5, 6];
var n = [];
for (var i = 0; i < 7; i ++)
	n.push (al[F[i]]);
n.pop ();
var ni = 10 - 1 - id;
n.unshift (ni < 7 ? LCDDigit.number[0][R[ni]] : 0);
var o = [];
for (var i = 0; i < 7; i ++)
	o.push (n[R[i]]);
return o;
};
LCDDigit.prototype.clear = function(noDim) {
clearInterval (this.clearAnimation);
var c = this;
var d = 0;
var iv;
if (cVALUE) noDim = 0;
this.clearAnimation = iv = setInterval(function() {
	c.setLights (LCDDigit.step(c.lightData, d));
	d ++;
	if (!(d < 10)) {
		clearInterval(c.clearAnimation);
		clearInterval(iv);
		c.setNumber (0, noDim ? 0 : 1);
		c.toggler (noDim ? 1 : 0);
	}
}, 30);
};
LCDDigit.prototype.firstChild = function() {
this.isFirstChild = true;
};

function getDigit(num, digit) {
return Math.floor(num / Math.pow(10, digit)) % 10;
}

