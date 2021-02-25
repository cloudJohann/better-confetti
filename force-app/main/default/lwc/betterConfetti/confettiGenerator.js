
const colors = ['#610B0B','#FFFF00','#FF00BF','#0040FF','#585858','#00FFBF','#FE642E','#FFBF00','#0101DF','#FF8000','#00FF00','#FF0040','#A901DB','#0B0B3B','#FF0000']
const colorGreen = ['green'];

export function feuerwerk_Utils(){
    var end = Date.now() + (9 * 100);
    
    var interval = setInterval(function() {
        if (Date.now() > end) {
            return clearInterval(interval);
        }
        
        window.confetti({
            particleCount : 150,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
            },
            colors : colors
        });
    }, 200);
}

export function nanaRain_Utils(){
    var duration = 15 * 150;
    var animationEnd = Date.now() + duration;
    var skew = 1;
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    (function frame() {
      var timeLeft = animationEnd - Date.now();
      var ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);
    
      window.confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        gravity: 0.5,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: (Math.random() * skew) - 0.2
        },
        colors: ['#85bb65'],
        shapes: ['dollarBills'],
        scalar: randomInRange(0.4, 1)
      });
    
      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    }());
}

export function regen_Utils(){
    var end = Date.now() + (20 * 100);
    
    (function frame() {
        window.confetti({
            particleCount: 3,
            startVelocity: 0,
            ticks: 300,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: 0
            },
            colors: colors
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}


export function kanone_Utils () {
    window.confetti({
        particleCount: 200,
        startVelocity: 60,
        spread: 150,
        origin: {
            y: 0.9
        },
        colors : colors
    });
}

export function Doppelfontaene_Utils(){
        var end = Date.now() + (3 * 100);
        
        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 25,
                origin: {
                    x: 0,
                    y : 0.65
                },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 25,
                origin: {
                    x: 1,
                    y : 0.65
                },
                colors: colors
            });
            
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }


export function confettiHelau_Utils(){
        console.log('confettiHelau_Utils started');
        fireRealistic(0.9, 0.7);
        fireRealistic(0.5, 0.7);
        fireRealistic(0.1, 0.7); 

    }
    


    function fireRealistic(xCordinate, yCordinate){
        console.log('fireRealistic started');

        fireForRealsitic(0.25, {
          spread: 26,
          startVelocity: 55,
          origin: { x: xCordinate ,y: yCordinate },
          
          
        });
        fireForRealsitic(0.2, {
          spread: 60,
            origin: { x: xCordinate, y: yCordinate },
    
        });
        fireForRealsitic(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
          origin: { x: xCordinate, y: yCordinate },
    
        });
        fireForRealsitic(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
                        origin: { x: xCordinate, y: yCordinate },
    
        });
        fireForRealsitic(0.1, {
          spread: 120,
          startVelocity: 45,
                        origin: { x: xCordinate, y: yCordinate },
    
        });
    }

    function fireForRealsitic(particleRatio, opts) { 
        console.log('fireForRealsitic started')
        const count = 50;
        const defaults = {
            origin: { y: 0.0 }
        };
        
        window.confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));

    }