(function () {
  console.log('javascript is running...');

  const body = document.querySelector('body');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const numberOfParticles = 615;
  let particles = [];
  let raf;

  class Particle {
    constructor() {
      this.x = 200 * Math.random();
      this.y = 30;
      this.size = 3;
      this.color = 'hsl(150deg 100% 60%)';
      this.hslDeg = 50 * Math.random();
      this.deg = 0;
      this.translateX = canvas.width / 2;
      this.translateY = canvas.height / 2;
    }
    rotate() {
      this.deg += 0.5;
    }
    scatter() {
      this.x -= 1 ;
      this.y -= 1/2;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.translate(this.translateX, this.translateY);
      ctx.rotate((this.deg * Math.PI) / 180);
      ctx.shadowColor = 'lightgrey';
      ctx.shadowBlur = 3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }

  //   canvas setter
  const setCanvas = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };
  // particle filler
  const fillParticles = () => {
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle());
    }
    console.log('number of filled particles:', particles.length);
  };

  const clear = () => {
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  //   animator
  const animate = () => {
    clear();
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].deg > 300) {
        particles[i].deg = i * 100;
      }
      particles[i].deg -= i / 200;
      particles[i].size = (i/100);
      particles[i].draw();
      particles[i].rotate();
      particles[i].scatter();
    }
    raf = requestAnimationFrame(animate);
  };

  //   initializer
  const init = () => {
    console.log('initialized...');
    setCanvas();
    fillParticles();
    animate();
  };

  //   initializing
  init();

  addEventListener('resize', (e) => setCanvas());

  const trace = (e) => {
    clear();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let X = e.clientX;
    let Y = e.clientY;
    particles.forEach((p) => {
      p.translateX = X;
      p.translateY = Y;
      p.x = 200 * Math.random();
      p.y = 30;
      
      p.draw();
    });
  };

  addEventListener('mousemove', trace);
})();
