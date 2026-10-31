(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- I18N ---------- */
  const I18N = {
    en: {
      'nav.ritual': 'The ritual', 'nav.gallery': 'Gallery', 'nav.tavata': 'Tavata', 'nav.book': 'Book',
      'hero.sub': 'Photo Ritual', 'hero.scroll': 'Scroll',
      'hero.whisper': 'Memories that seal your transformation',
      'rit.eyebrow': 'A transformational photography experience in nature',
      'rit.title': "This is not a photoshoot. It's a meeting with yourself.",
      'rit.body': 'There are no poses. No performances. No masks to wear. A sacred space for those moving through a life transition, celebrating personal growth, or simply longing to feel seen beyond the roles they play. Nature becomes your witness. The camera becomes a mirror.',
      'w.kicker': "Here you don't pose",
      'w0': 'You breathe.', 'w1': 'You feel.', 'w2': 'You reconnect.', 'w3': 'You inhabit yourself.',
      'w.note': 'And in doing so, you remember the work of art you already are.',
      'np.title': 'No posing <em>— no masks</em>',
      'np.body': 'Connect with nature &amp; see yourself with new eyes. Remember who you are.',
      'gal.eyebrow': 'Explore your own ritual',
      'gal.title': 'Each image preserves <em>how you felt</em>, not just how you looked',
      'gal.hint': 'Drag or swipe to explore',
      'c0': 'Waters that hold you', 'c1': 'Wind on the shore', 'c2': 'Fire &amp; shadow', 'c3': 'Into the cave',
      'c4': 'Sand &amp; laughter', 'c5': 'The ritual begins', 'c6': 'Open heart', 'c7': 'In bloom',
      'c8': 'Authentic Self', 'c9': 'Calling the sun', 'c10': 'Dance with the sea', 'c11': 'Cenote rebirth',
      'tav.eyebrow': 'Your photographer',
      'tav.p1': "Photographer and keeper of the ritual. Tavata holds each session with presence: she invites you to slow down, breathe and inhabit your body, while she disappears behind the lens so that only what's true remains.",
      'tav.p2': "Her eye doesn't search for the perfect pose. It searches for the moment you return to yourself.",
      'tav.link': 'See her work on Instagram →',
      'nav.retreats': 'Retreats',
      'ev.eyebrow': 'Retreats &amp; gatherings',
      'ev.title': 'The ritual, <em>shared</em>',
      'ev.lead': 'Beyond the individual session, Tavata also gathers women in nature to be witnessed together. Here is a glimpse of the retreats she has captured.',
      'ev1.name': 'Selvática', 'ev1.tag': "Sensoul · Women's retreat",
      'ev1.desc': 'An invitation to embrace a journey of self-expression and sensual aliveness, held in the jungle.',
      'ev2.name': 'Slow &amp; Glow', 'ev2.tag': 'Women Retreat',
      'ev2.desc': 'Yoga, cacao and circle: days to slow down, glow from within and be held by a community of women.',
      'more.eyebrow': 'More than photographs',
      'more.quote': 'A photographic ritual to honor the person you have been and celebrate the one you are becoming.',
      'more.body': 'The courage to choose yourself. The moment you reclaimed your voice. The beauty of being fully present in your own skin. A visual anchor you can return to again and again.',
      'ct.eyebrow': 'Photo Ritual',
      'ct.title': 'When was the last time you <em>nurtured your soul?</em>',
      'ct.lead': "Let's create your Photo Ritual. Write to me and together we'll design your meeting with nature.",
      'footer': '© 2026 Fenifoto · Photography services',
      wa: 'Hi Tavata, I would love to book my Photo Ritual'
    },
    es: {
      'nav.ritual': 'El ritual', 'nav.gallery': 'Galería', 'nav.tavata': 'Tavata', 'nav.book': 'Reservar',
      'hero.sub': 'Photo Ritual', 'hero.scroll': 'Desliza',
      'hero.whisper': 'Memorias que sellan tu transformación',
      'rit.eyebrow': 'Una experiencia fotográfica transformacional en la naturaleza',
      'rit.title': 'Esto no es una sesión de fotos. Es un encuentro contigo.',
      'rit.body': 'Sin poses. Sin actuaciones. Sin máscaras. Un espacio sagrado para quien atraviesa una transición de vida, celebra su crecimiento o simplemente anhela sentirse vista más allá de los roles que juega. La naturaleza se vuelve tu testigo. La cámara, un espejo.',
      'w.kicker': 'Aquí no posas',
      'w0': 'Respiras.', 'w1': 'Sientes.', 'w2': 'Reconectas.', 'w3': 'Te habitas.',
      'w.note': 'Y al hacerlo, recuerdas la obra de arte que ya eres.',
      'np.title': 'Sin poses <em>— sin máscaras</em>',
      'np.body': 'Conéctate con la naturaleza y mírate con ojos nuevos. Recuerda quién eres.',
      'gal.eyebrow': 'Explora tu propio ritual',
      'gal.title': 'Cada imagen guarda <em>cómo te sentiste</em>, no solo cómo te veías',
      'gal.hint': 'Arrastra o desliza para explorar',
      'c0': 'Aguas que te sostienen', 'c1': 'Viento en la orilla', 'c2': 'Fuego y sombra', 'c3': 'Hacia la cueva',
      'c4': 'Arena y risa', 'c5': 'Comienza el ritual', 'c6': 'Corazón abierto', 'c7': 'En flor',
      'c8': 'Tu yo auténtico', 'c9': 'Llamando al sol', 'c10': 'Danza con el mar', 'c11': 'Renacer en el cenote',
      'tav.eyebrow': 'Tu fotógrafa',
      'tav.p1': 'Fotógrafa y guardiana del ritual. Tavata acompaña cada sesión con presencia: te invita a bajar el ritmo, respirar y habitar tu cuerpo, mientras ella desaparece detrás del lente para que solo quede lo verdadero.',
      'tav.p2': 'Su mirada no busca la pose perfecta. Busca el instante en que vuelves a ti.',
      'tav.link': 'Ver su trabajo en Instagram →',
      'nav.retreats': 'Retiros',
      'ev.eyebrow': 'Retiros y encuentros',
      'ev.title': 'El ritual, <em>compartido</em>',
      'ev.lead': 'Más allá de la sesión individual, Tavata también reúne a mujeres en la naturaleza para ser vistas en comunidad. Un vistazo a los retiros que ha fotografiado.',
      'ev1.name': 'Selvática', 'ev1.tag': 'Sensoul · Retiro de mujeres',
      'ev1.desc': 'Una invitación a abrazar un viaje de autoexpresión y vitalidad sensual, en plena selva.',
      'ev2.name': 'Slow &amp; Glow', 'ev2.tag': 'Retiro de mujeres',
      'ev2.desc': 'Yoga, cacao y círculo: días para bajar el ritmo, brillar desde dentro y sentirte sostenida por una comunidad de mujeres.',
      'more.eyebrow': 'Más que fotografías',
      'more.quote': 'Un ritual fotográfico para honrar a la persona que has sido y celebrar a la que estás llegando a ser.',
      'more.body': 'El coraje de elegirte. El momento en que recuperaste tu voz. La belleza de estar plenamente presente en tu propia piel. Un ancla visual a la que puedes volver una y otra vez.',
      'ct.eyebrow': 'Photo Ritual',
      'ct.title': '¿Cuándo fue la última vez que <em>nutriste tu alma?</em>',
      'ct.lead': 'Creemos tu Photo Ritual. Escríbeme y juntas diseñamos tu encuentro con la naturaleza.',
      'footer': '© 2026 Fenifoto · Servicios fotográficos',
      wa: 'Hola Tavata, me encantaría reservar mi Photo Ritual'
    }
  };

  // envuelve cada palabra conservando etiquetas internas (<em>, etc.)
  function splitWords(el, mode) {
    let k = 0;
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(' '); return; }
          const s = document.createElement('span');
          if (mode === 'reveal') { s.className = 'wd'; s.textContent = part; }
          else {
            s.className = 'm';
            const i = document.createElement('span');
            i.className = 'mi'; i.style.setProperty('--d', k++); i.textContent = part;
            s.append(i);
          }
          frag.append(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(el);
  }
  const splitAll = () => {
    $$('.reveal').forEach(el => { if (!el.querySelector('.wd')) splitWords(el, 'reveal'); });
    $$('.rise').forEach(el => { if (!el.querySelector('.m')) splitWords(el, 'rise'); });
  };

  let lang = 'en';
  try { lang = localStorage.getItem('fenifoto-lang') || 'en'; } catch (e) {}
  function applyLang(l) {
    lang = I18N[l] ? l : 'en';
    const dict = I18N[lang];
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    $$('.lang span').forEach(s => s.classList.toggle('on', s.dataset.l === lang));
    $('#wa').href = 'https://wa.me/527227110258?text=' + encodeURIComponent(dict.wa);
    splitAll();
    cacheWords();
    try { localStorage.setItem('fenifoto-lang', lang); } catch (e) {}
    onScroll();
  }
  $('.lang').addEventListener('click', () => applyLang(lang === 'en' ? 'es' : 'en'));

  /* ---------- SMOOTH SCROLL ---------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const t = $(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(t, { duration: 1.8 }) : t.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- SCROLL SCENES ---------- */
  const prog = el => { const r = el.getBoundingClientRect(); return clamp(-r.top / (r.height - innerHeight)); };

  const nav = $('#nav'), bar = $('.progress span');
  const hero = $('.hero'), heroImg = $('.hero-img'), heroContent = $('.hero-content'),
        heroMist = $('.hero-mist'), heroWhisper = $('.hero-whisper'), heroScroll = $('.hero-scroll');
  const ritual = $('.ritual'), floats = $$('.float');
  const words = $('.words'), frame = $('.frame'), wimgs = $$('.wimg'), wordEls = $$('.w'),
        kicker = $('.words-kicker'), note = $('.words-note'), wcount = $('.words-count'), wcountN = $('.words-count span');
  const nopose = $('.nopose'), rows = $$('.mq-row');
  const gallery = $('.gallery');
  const parallax = $$('[data-speed]');
  const more = $('.more'), moreBg = $('.more-bg');
  const fan = $('.fan'), fanImgs = $$('.fan img');
  let ritualWords = [], moreWords = [];
  function cacheWords() { ritualWords = $$('.wd', ritual); moreWords = $$('.wd', more); }

  let lastY = scrollY;
  function frameScroll() {
    const y = scrollY, vh = innerHeight, vw = innerWidth;

    bar.style.transform = `scaleX(${y / (document.documentElement.scrollHeight - vh)})`;

    // HERO — la imagen se difumina hacia un fondo cálido
    const h = prog(hero);
    heroImg.style.transform = `scale(${1 + h * 0.2}) translateY(${h * -3}%)`;
    heroImg.style.filter = `blur(${easeOut(clamp((h - 0.08) / 0.55)) * 24}px) saturate(${1 - h * 0.35})`;
    heroContent.style.opacity = 1 - clamp(h / 0.38);
    heroContent.style.transform = `translateY(${h * -110}px) scale(${1 - h * 0.12})`;
    heroContent.style.filter = `blur(${clamp(h / 0.38) * 10}px)`;
    heroScroll.style.opacity = 1 - clamp(h / 0.12);
    heroMist.style.opacity = easeOut(clamp((h - 0.22) / 0.5));
    const wh = clamp((h - 0.5) / 0.28);
    heroWhisper.style.opacity = wh * (1 - clamp((h - 0.9) / 0.1));
    heroWhisper.style.transform = `translateY(calc(-50% + ${(1 - easeOut(wh)) * 40}px))`;
    heroWhisper.style.filter = `blur(${(1 - wh) * 8}px)`;

    // NAV
    const gr = gallery.getBoundingClientRect(), wr = words.getBoundingClientRect();
    const overDark = (gr.top < 40 && gr.bottom > 40) || (wr.top < 0 && wr.bottom > vh && prog(words) > 0.12);
    nav.classList.toggle('solid', h > 0.45 || y > hero.offsetHeight);
    nav.classList.toggle('dark', overDark);
    if (y > lastY + 3 && y > vh * 2) nav.classList.add('hide');
    else if (y < lastY - 3) nav.classList.remove('hide');
    lastY = y;

    // RITUAL — fotos flotantes + texto que se ilumina
    const r = prog(ritual);
    const rw = clamp((r - 0.08) * 1.35);
    ritualWords.forEach((el, i) => el.classList.toggle('on', i / ritualWords.length < rw));
    const rr = ritual.getBoundingClientRect();
    const enter = clamp(1 - rr.top / vh); // 0→1 mientras la sección entra
    floats.forEach((f, i) => {
      const d = parseFloat(f.dataset.depth);
      const show = easeOut(clamp(enter * 1.6 - i * 0.18));
      f.style.clipPath = `inset(${(1 - show) * 100}% 0 0 0 round 0)`;
      f.style.transform = `translateY(${(0.35 - r) * vh * 0.7 * d}px) rotate(${(i % 2 ? 1 : -1) * (1 - r) * 3}deg)`;
    });

    // WORDS — ventana en arco que se abre a pantalla completa
    const p = prog(words);
    const e = easeOut(clamp(p / 0.2));
    const side = vw < 760 ? 16 : 34;
    const rad = lerp(vw < 760 ? 200 : 420, 0, e);
    frame.style.clipPath = `inset(${lerp(14, 0, e)}% ${lerp(side, 0, e)}% ${lerp(10, 0, e)}% ${lerp(side, 0, e)}% round ${rad}px ${rad}px ${lerp(16, 0, e)}px ${lerp(16, 0, e)}px)`;
    const q = clamp((p - 0.2) / 0.8);
    const seg = 1 / wordEls.length;
    wimgs.forEach((img, i) => {
      img.style.opacity = i === 0 ? 1 : clamp((1 - Math.abs(q * 4 - (i + 0.5))) * 2);
      img.style.transform = `scale(${1.18 - e * 0.1 - q * 0.06})`;
    });
    wordEls.forEach((el, i) => {
      const t = (q - i * seg) / seg;
      const inn = clamp(t / 0.35), out = clamp((t - 0.72) / 0.28);
      const o = i === wordEls.length - 1 ? inn : inn * (1 - out);
      el.style.opacity = o;
      el.style.filter = `blur(${(1 - o) * 16}px)`;
      el.style.transform = `translateY(${(1 - easeOut(inn)) * 50 - out * 50}px) scale(${lerp(0.94, 1, o)})`;
    });
    kicker.style.opacity = e * (1 - clamp((q - 0.15) / 0.1));
    note.classList.toggle('on', q > 0.85);
    wcount.style.opacity = clamp(q * 6);
    wcountN.textContent = '0' + Math.min(4, Math.floor(q * 4) + 1);

    // MARQUEE — se mueve con el scroll
    const nr = nopose.getBoundingClientRect();
    if (nr.bottom > 0 && nr.top < vh) {
      rows.forEach(row => {
        const dir = parseFloat(row.dataset.dir);
        row.style.transform = `translateX(calc(-25% + ${(nr.top - vh / 2) * 0.35 * dir}px))`;
      });
    }

    // RETIROS — scroll horizontal por evento
    events.forEach(ev => {
      const r = ev.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      const ep = clamp(-r.top / (r.height - vh));
      ev.track.style.transform = `translateX(${-ep * ev.dist}px)`;
      ev.bar.style.transform = `scaleX(${ep})`;
      ev.imgs.forEach(img => {
        const b = img.parentNode.getBoundingClientRect();
        if (b.right < 0 || b.left > vw) return;
        img.style.transform = `scale(1.18) translateX(${-(b.left + b.width / 2 - vw / 2) * 0.05}px)`;
      });
    });

    // PARALLAX
    parallax.forEach(el => {
      const b = el.getBoundingClientRect();
      if (b.bottom < -200 || b.top > vh + 200) return;
      el.style.transform = `translateY(${-(b.top + b.height / 2 - vh / 2) * parseFloat(el.dataset.speed)}px)`;
    });

    // MORE
    const mb = more.getBoundingClientRect();
    if (mb.bottom > 0 && mb.top < vh) {
      moreBg.style.transform = `translateY(${mb.top * -0.15}px) scale(1.05)`;
      const mr = clamp((vh - mb.top) / (vh + mb.height * 0.2) * 1.5 - 0.35);
      moreWords.forEach((el, i) => el.classList.toggle('on', i / moreWords.length < mr));
    }

    // FAN — las fotos se abren en abanico
    const fr = fan.getBoundingClientRect();
    const fe = easeOut(clamp((vh - fr.top) / (vh * 0.75)));
    const spread = Math.min(vw * 0.17, 200);
    fanImgs.forEach((img, i) => {
      const k = i - 2;
      img.style.transform = `translateX(${k * spread * fe}px) translateY(${Math.abs(k) * 22 * fe}px) rotate(${k * 7 * fe}deg)`;
      img.style.zIndex = 10 - Math.abs(k);
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { frameScroll(); ticking = false; });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { measure(); onScroll(); });

  /* ---------- REVEAL ON ENTER ---------- */
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  /* ---------- CURVED CAROUSEL ---------- */
  const car = $('.carousel'), cards = $$('.card', car), N = cards.length, countEl = $('.car-count b');
  let pos = 0, target = 0, gap = 300, drag = null, carOn = false;
  const wrapD = d => ((d % N) + N + N / 2) % N - N / 2;
  const events = $$('.event').map(el => ({ el, track: $('.event-track', el), bar: $('.event-bar i', el), imgs: $$('.event-track img', el), dist: 0 }));
  function measure() {
    gap = cards[0].offsetWidth * (innerWidth < 760 ? 0.98 : 1.16);
    events.forEach(ev => {
      ev.dist = Math.max(0, ev.track.scrollWidth - innerWidth);
      ev.el.style.height = innerHeight + ev.dist * 1.1 + 'px';
    });
  }

  function carFrame() {
    pos += (target - pos) * (drag && drag.moved ? 0.25 : 0.085);
    if (Math.abs(target - pos) < 0.0005) pos = target;
    cards.forEach((c, i) => {
      const d = wrapD(i - pos), a = Math.abs(d), cd = clamp(d, -3.2, 3.2);
      const x = d * gap - Math.sign(d) * Math.max(0, a - 1) * gap * 0.1;
      c.style.transform = `translate3d(${x}px,0,${Math.min(a, 3) * 40}px) rotateY(${-cd * 17}deg) scale(${1 + Math.max(0, 1 - a) * 0.05})`;
      c.style.opacity = clamp(3.8 - a);
      c.style.visibility = a > 4 ? 'hidden' : 'visible';
      c.style.zIndex = 100 - Math.round(a * 10);
      c.firstElementChild.style.transform = `scale(1.12) translateX(${-cd * 3}%)`;
    });
    const idx = ((Math.round(target) % N) + N) % N + 1;
    countEl.textContent = String(idx).padStart(2, '0');
    if (carOn) requestAnimationFrame(carFrame);
  }
  new IntersectionObserver(([en]) => {
    const was = carOn; carOn = en.isIntersecting;
    if (carOn && !was) requestAnimationFrame(carFrame);
  }).observe(car);

  car.addEventListener('pointerdown', e => {
    if (e.button) return;
    drag = { x: e.clientX, start: target, moved: false, lastX: e.clientX, lastT: performance.now(), v: 0, card: e.target.closest('.card'), id: e.pointerId };
  });
  addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) {
      drag.moved = true; car.classList.add('grabbing');
      try { car.setPointerCapture(drag.id); } catch (err) {}
    }
    if (!drag.moved) return;
    target = drag.start - dx / gap;
    const now = performance.now();
    drag.v = lerp(drag.v, (e.clientX - drag.lastX) / Math.max(1, now - drag.lastT), 0.6);
    drag.lastX = e.clientX; drag.lastT = now;
  });
  function endDrag() {
    if (!drag) return;
    const d = drag; drag = null; car.classList.remove('grabbing');
    if (d.moved) target = Math.round(target - clamp(d.v * 260 / gap, -3, 3));
    else if (d.card) {
      const rel = wrapD(cards.indexOf(d.card) - target);
      if (Math.abs(rel) < 0.5) openLB(cards.indexOf(d.card));
      else target = Math.round(target + rel);
    }
  }
  addEventListener('pointerup', endDrag);
  addEventListener('pointercancel', () => { if (drag) { drag.moved = false; drag.card = null; } endDrag(); target = Math.round(target); });

  let wheelT;
  car.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault(); e.stopPropagation();
    target += e.deltaX / gap;
    clearTimeout(wheelT);
    wheelT = setTimeout(() => { target = Math.round(target); }, 140);
  }, { passive: false });
  $('.car-btn.prev').addEventListener('click', () => { target = Math.round(target) - 1; });
  $('.car-btn.next').addEventListener('click', () => { target = Math.round(target) + 1; });
  car.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { target = Math.round(target) - 1; e.preventDefault(); }
    if (e.key === 'ArrowRight') { target = Math.round(target) + 1; e.preventDefault(); }
    if (e.key === 'Enter') openLB(((Math.round(target) % N) + N) % N);
  });

  /* ---------- LIGHTBOX ---------- */
  const lb = $('.lightbox'), lbImg = $('img', lb), lbCap = $('.lb-cap', lb);
  let lbI = 0, lbFree = false;
  function showLB(i) {
    lbI = (i + N) % N;
    lbImg.src = $('img', cards[lbI]).src;
    lbCap.textContent = $('figcaption', cards[lbI]).textContent;
  }
  function openLB(i) { lbFree = false; showLB(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); lenis && lenis.stop(); }
  function openImg(src) { lbFree = true; lbImg.src = src; lbCap.textContent = ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); lenis && lenis.stop(); }
  $$('.event-track figure').forEach(f => f.addEventListener('click', () => openImg($('img', f).src)));
  function closeLB() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); lenis && lenis.start(); }
  lb.addEventListener('click', e => { if (e.target !== lbImg) closeLB(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (lbFree) return;
    if (e.key === 'ArrowRight') { showLB(lbI + 1); target = Math.round(target) + 1; }
    if (e.key === 'ArrowLeft') { showLB(lbI - 1); target = Math.round(target) - 1; }
  });

  /* ---------- INIT ---------- */
  applyLang(lang);
  $$('.fade, .rise').forEach(el => io.observe(el));
  // IntersectionObserver ignora elementos totalmente recortados por clip-path, así que se revisan al hacer scroll
  let clips = $$('.clip');
  const checkClips = () => {
    clips = clips.filter(el => {
      if (el.getBoundingClientRect().top < innerHeight * 0.88) { el.classList.add('in'); return false; }
      return true;
    });
  };
  addEventListener('scroll', checkClips, { passive: true });
  checkClips();
  measure();
  frameScroll();
})();
