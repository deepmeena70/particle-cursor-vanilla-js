(function () {
  console.log('javascript is running...');

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const numberOfParticles = 865;
  let particles = [];

  class Particle {
    constructor() {
      this.x = 200 * Math.random();
      this.y = 45;
      this.size = 0;
      this.hslDeg = 50 * Math.random();
      this.deg = 0;
      this.hslDeg = 150;
      this.hslX = 100;
      this.hslY = 60;
      this.translateX = canvas.width / 2;
      this.translateY = canvas.height / 2;
      this.globalAlpha = 1;
    }
    rotate() {
      this.deg += 0.5;
    }
    scatter() {
      this.x -= 1 / 2;
      this.y -= 1 / 3;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.globalAlpha;
      ctx.translate(this.translateX, this.translateY);
      ctx.rotate((this.deg * Math.PI) / 180);
      ctx.shadowColor = 'lightgrey';
      ctx.shadowBlur = 3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = `hsl(${this.hslDeg}deg ${this.hslX}% ${this.hslY}%)`;
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

  //   canvas cleaner
  const clear = () => {
    ctx.globalAlpha = 0.185;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  //   animator
  const animate = () => {
    clear();
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].deg > 360) {
        particles[i].deg = i / 10;
      }
      particles[i].deg -= i / 270;
      particles[i].size = i / 400;
      particles[i].draw();
      particles[i].rotate();
      particles[i].scatter();
    }
    requestAnimationFrame(animate);
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

  //   resize event listener
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
      p.y = 45;
      p.hslDeg = X + Y / 2;
    });
  };

  //   mouse move event listener
  addEventListener('mousemove', trace);
})();
