


function getCanvas(zIndex) {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = zIndex;
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#000";
	ctx.lineWidth = 1;
	ctx.globalCompositeOperation = "source-over"; 
	ctx.globalAlpha = 1;

    ctx.canvas.height = 700;
    ctx.canvas.width = 700;
    return canvas;
  }



export function neonLightEffect(text) {
    console.log('neonLightEffect was called');

    /*var canvas;
    let zIndex = "1";
    canvas = getCanvas(zIndex);
    document.body.appendChild(canvas);
	changeDemo(window.location.hash.replace("#", ""));

    var ctx = canvas.getContext('2d');*/
	var canvas = document.createElement("canvas")
	var ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);

	//document.body.style.background = "#000"
	//if (window.timeout) window.clearTimeout(timeout);
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#000";
	ctx.lineWidth = 1;
	ctx.globalCompositeOperation = "source-over"; 
	ctx.globalAlpha = 1;
    ctx.canvas.height = 700;
    ctx.canvas.width = 700;


    console.log('Canvas was set');
    var text = "alert('"+String.fromCharCode(0x2665)+"')";
    var font = "120px Futura, Helvetica, sans-serif";
    var jitter = 25; // the distance of the maximum jitter
    var offsetX = 30;
    var offsetY = 70;
    var blur = getBlurValue(100);
    // save state
    ctx.save();
    ctx.font = font;
    // calculate width + height of text-block
    var metrics = getMetrics(text, font);
    // create clipping mask around text-effect
    ctx.rect(offsetX - blur/2, offsetY - blur/2,
            offsetX + metrics.width + blur, metrics.height + blur);
    ctx.clip();
    // create shadow-blur to mask rainbow onto (since shadowColor doesn't accept gradients)
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,0,0,1)";
    ctx.shadowOffsetX = metrics.width + blur;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = blur;
    ctx.fillText(text, -metrics.width + offsetX - blur, offsetY + metrics.top);
    ctx.restore();
    // create the rainbow linear-gradient
    var gradient = ctx.createLinearGradient(0, 0, metrics.width, 0);
    var gradient = ctx.createLinearGradient(10, 0, 500, 0);

    gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
    gradient.addColorStop(0.15, "rgba(255, 255, 0, 1)");
    gradient.addColorStop(0.3, "rgba(0, 255, 0, 1)");
    gradient.addColorStop(0.5, "rgba(0, 255, 255, 1)");
    gradient.addColorStop(0.65, "rgba(0, 0, 255, 1)");
    gradient.addColorStop(0.8, "rgba(255, 0, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 1)");
    // change composite so source is applied within the shadow-blur
    ctx.globalCompositeOperation = "source-atop";
    // apply gradient to shadow-blur
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 75);

    //ctx.fillRect(offsetX - jitter/2, offsetY, metrics.width + offsetX, metrics.height + offsetY);
    // change composite to mix as light
    ctx.globalCompositeOperation = "lighter";
    // multiply the layer
    ctx.globalAlpha = 0.7
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.globalAlpha = 1
    // draw white-text ontop of glow
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillText(text, offsetX, offsetY + metrics.top);
    // created jittered stroke
    ctx.lineWidth = 0.80;
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    var i = 10; while(i--) { 
        var left = jitter / 2 - Math.random() * jitter;
        var top = jitter / 2 - Math.random() * jitter;
        ctx.strokeText(text, left + offsetX, top + offsetY + metrics.top);
    }    
    ctx.strokeStyle = "rgba(0,0,0,0.20)";
    ctx.strokeText(text, offsetX, offsetY + metrics.top);
    ctx.restore();

  };


  export function simpleTextEffect(message){
    //simple text with background
    var canvas;
    let zIndex = "1";
    //add a check if canvas already exists
    canvas = getCanvas(zIndex);
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
        
    var textWidth = ctx.measureText(message).width;
    var lineHeight = 75 * 1.286;
    
    var xPosition = canvas.width/2 ;
    var yPosition = canvas.height/2;

    ctx.fillStyle = "#009900";
    ctx.fillRect(xPosition, yPosition, textWidth, lineHeight);
    
    ctx.font = '75px arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';    
    ctx.fillStyle = "red";
    ctx.fillText(message, xPosition, yPosition);

    setTimeout(function() {
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }.bind(this),3000);    


}
  

function getBlurValue(blur) {
    console.log('getBlurValue started');

	var userAgent = navigator.userAgent;
	if (userAgent && userAgent.indexOf('Firefox/4') != -1) {
		var kernelSize = (blur < 8 ? blur / 2 : Math.sqrt(blur * 2));
		var blurRadius = Math.ceil(kernelSize);
		return blurRadius * 2;
	}
    console.log('getBlurValue ended');
    console.log(blur);

	return blur;
}

    
function createInterlace(size, color1, color2) {
        console.log('createInterlace started');

        var proto = document.createElement("canvas").getContext("2d");
        proto.canvas.width = size * 2;
        proto.canvas.height = size * 2;
        proto.fillStyle = color1; // top-left
        proto.fillRect(0, 0, size, size);
        proto.fillStyle = color2; // top-right
        proto.fillRect(size, 0, size, size);
        proto.fillStyle = color2; // bottom-left
        proto.fillRect(0, size, size, size);
        proto.fillStyle = color1; // bottom-right
        proto.fillRect(size, size, size, size);
        var pattern = proto.createPattern(proto.canvas, "repeat");
        pattern.data = proto.canvas.toDataURL();
        console.log('createInterlace ended');

        return pattern;
    };

    function getMetrics(text, font) {
        console.log('getMetrics started');
        var op_8x8 = createInterlace(8, "#FFF", "#eee");
        console.log('op_8x8');        
        console.log(op_8x8);
        var image = document.createElement("img");
        image.width = 42;
        image.height = 1;
        image.src = op_8x8.data;
        image.style.cssText = "display: inline";
    
        var metrics = document.getElementById("metrics");
        if (metrics) {	
            metrics.style.cssText = "display: block";
            var parent = metrics.firstChild;
            parent.firstChild.textContent = text;
        } else {
            // setting up html used for measuring text-metrics
            var parent = document.createElement("span");
            parent.appendChild(document.createTextNode(text));
            parent.appendChild(image);
            var metrics = document.createElement("div");
            metrics.id = "metrics";
            metrics.appendChild(parent);
            document.body.insertBefore(metrics, document.body.firstChild);
        }
        
        // direction of the text
        var direction = "ltr";
    
        // getting css equivalent of ctx.measureText()
        parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
        var width = parent.offsetWidth;
        var height = parent.offsetHeight;
    
        // capturing the "top" and "bottom" baseline
        parent.style.cssText = "font: " + font + "; white-space: nowrap; display: block;";
        var top = image.offsetTop;
        //var bottom = top - height;
        var bottom = -134;
    
        // capturing the "middle" baseline
        parent.style.cssText = "font: " + font + "; white-space: nowrap; line-height: 0; display: block;";
        var middle = image.offsetTop + 1;
        
        // capturing "1em"
        parent.style.cssText = "font: " + font + "; white-space: nowrap; height: 1em; display: block;";
        parent.firstChild.textContent = "";
        var em = parent.offsetHeight;
        
        // cleanup
        metrics.style.display = "none";
        console.log('getMetrics ended');

        return {
            direction: direction,
            top: top,
            em: em,
            middle: middle,
            bottom: bottom,
            height: height,
            width: width
        };
    }
    
    
