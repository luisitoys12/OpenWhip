(() => {
  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(c);
  const x = c.getContext('2d');
  const WORDS = ['¡PLAS!', '¡CHANCLAZO!', '¡ASÍ APRENDES!', '¡TE LO DIJE!', '¡ÁNDALE!'];
  let flash = null;

  const origCrack = playCrackSound;
  playCrackSound = function () {
    origCrack();
    if (whip && whip.length) {
      const t = whip[whip.length - 1];
      flash = { x: t.x, y: t.y, t: Date.now(), w: WORDS[Math.floor(Math.random() * WORDS.length)] };
    }
  };

  function sandal(px, py, ang) {
    x.save();
    x.translate(px, py);
    x.rotate(ang);
    x.fillStyle = '#d9a441';
    x.strokeStyle = '#111';
    x.lineWidth = 3;
    x.beginPath();
    x.ellipse(0, 0, 38, 17, 0, 0, Math.PI * 2);
    x.fill();
    x.stroke();
    x.fillStyle = '#c0392b';
    x.beginPath();
    x.moveTo(-6, -14);
    x.quadraticCurveTo(14, 0, -6, 14);
    x.lineTo(-16, 10);
    x.quadraticCurveTo(2, 0, -16, -10);
    x.closePath();
    x.fill();
    x.stroke();
    x.restore();
  }

  function frame() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    x.clearRect(0, 0, c.width, c.height);
    if (whip && whip.length > 1) {
      const n = whip.length;
      const a = whip[n - 2], b = whip[n - 1];
      sandal(b.x, b.y, Math.atan2(b.y - a.y, b.x - a.x));
      x.font = '46px serif';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.fillText('🖐️', whip[0].x, whip[0].y);
    }
    if (flash) {
      const age = Date.now() - flash.t;
      if (age > 700) flash = null;
      else {
        x.save();
        x.globalAlpha = 1 - age / 700;
        x.font = 'bold 44px Impact, sans-serif';
        x.textAlign = 'center';
        x.lineWidth = 6;
        x.strokeStyle = '#fff';
        x.fillStyle = '#c0392b';
        const yy = flash.y - 30 - age / 12;
        x.strokeText(flash.w, flash.x, yy);
        x.fillText(flash.w, flash.x, yy);
        x.restore();
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();
