import { designs, projects, links, bio, skills, orbitKeywords, atlasKeywords, copy } from './content.js';
import { mountScene } from './scene.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const paths = {
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  right: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  left: '<path d="M20 12H4m6-6-6 6 6 6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon: '<path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  chevron: '<path d="m8 10 4 4 4-4"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  file: '<path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 6 9 7 9-7"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
const external = (href, label, className = 'text-link') => `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${label}${icon('arrow')}</a>`;
const connect = (label = 'Let’s connect', className = 'button primary') => `<a class="${className}" href="${links.email}" target="_blank" rel="noopener noreferrer">${label}${icon('arrow')}</a>`;
const cv = (className = 'button secondary') => `<button type="button" class="${className}" data-resume>View Resume${icon('file')}</button>`;
const label = (text) => `<span class="eyebrow">${text}</span>`;
const scene = (shape, className = '') => `<div class="scene ${className}" data-shape="${shape}" aria-hidden="true"><canvas></canvas><div class="scene-fallback"><span>H<span>R</span></span></div></div>`;
const skillList = () => skills.map(s => `<span>${s}</span>`).join('');
const social = () => `${external(links.github, 'GitHub')}${external(links.linkedin, 'LinkedIn')}`;
const experience = () => `<div class="experience"><div><span>2025 — PRESENT</span><h3>Machine Learning / AI Engineer</h3><p>SANWA SYSTEM SERVICE CO. LTD</p></div><div><span>2024 — 2025</span><h3>Undergraduate Research Assistant</h3><p>Center of Data Science, GCUF</p></div><div><span>2024</span><h3>Machine Learning Intern</h3><p>NextGen Learner</p></div><div><span>2021 — 2025</span><h3>BS Data Analytics</h3><p>Government College University Faisalabad</p></div></div>`;
const footer = () => `<footer class="page-footer"><div class="footer-brand"><strong>Habib Ur Rehman</strong><span>© ${new Date().getFullYear()} · Machine learning &amp; AI</span></div><nav aria-label="Footer">${social()}<button type="button" class="text-link" data-resume>View Resume${icon('arrow')}</button></nav></footer>`;
const orbitKeywordCloud = () => `<div class="globe-keywords orbit-keywords" aria-hidden="true">${orbitKeywords.map((word,i)=>`<span class="globe-chip orbit-chip" style="--i:${i};--n:${orbitKeywords.length};--angle:${(360/orbitKeywords.length)*i}deg"><em>${word}</em></span>`).join('')}</div>`;
const atlasKeywordCloud = () => `<div class="globe-keywords atlas-keywords" aria-hidden="true">
  <div class="atlas-ring atlas-ring-outer">${atlasKeywords.slice(0,6).map((word,i)=>`<span class="globe-chip atlas-chip" style="--i:${i};--n:6;--angle:${(360/6)*i}deg"><em>${word}</em></span>`).join('')}</div>
  <div class="atlas-ring atlas-ring-inner">${atlasKeywords.slice(6).map((word,i)=>`<span class="globe-chip atlas-chip" style="--i:${i};--n:6;--angle:${(360/6)*i+30}deg"><em>${word}</em></span>`).join('')}</div>
</div>`;
const stackStrip = (items) => `<div class="stack-strip" aria-label="Primary stack">${items.map(s=>`<span>${s}</span>`).join('')}</div>`;

const templates = {
  orbit: () => {
    const c = copy.orbit;
    return `
    <div class="orbit-page" id="home">
      <section class="orbit-hero">
        <div class="orbit-copy">${label(c.eyebrow)}<h1>${c.headline}</h1><p>${c.sub}</p>${stackStrip(['PyTorch','LangGraph','RAG','Vision','FastAPI'])}<div class="actions"><a class="button primary" href="#work">Explore my work${icon('right')}</a>${cv()}</div></div>
        <div class="orbit-universe">${scene('orbit')}${orbitKeywordCloud()}</div>
        <div class="orbit-bottom"><a href="#work">Selected work ${icon('right')}</a></div>
      </section>
      <section class="orbit-work section-wrap" id="work"><div class="section-heading">${label(c.workLabel)}<h2>${c.workTitle}</h2><p>${c.workSub}</p></div><div class="orbit-projects">${projects.map((p,i)=>`<button class="orbit-project tilt" data-project="${i}" style="--project-color:${p.color}"><div class="project-visual visual-${i}" aria-hidden="true"><span>${p.metric}</span><i></i><i></i><i></i><i></i></div><div class="project-meta">${label(`0${i+1} / ${p.category}`)}${icon('arrow')}</div><h3>${p.title}</h3><p>${p.description}</p><span class="project-tag">${p.tag}</span></button>`).join('')}</div></section>
      <section class="orbit-about section-wrap" id="about"><div>${label(c.aboutLabel)}<h2>${c.aboutTitle}</h2><p>${bio}</p><div class="skill-pills">${skillList()}</div></div>${experience()}</section>
      <section class="orbit-contact section-wrap" id="contact">${label(c.contactLabel)}<h2>${c.contactTitle}</h2>${connect()}</section>${footer()}
    </div>`;
  },
  atlas: () => {
    const c = copy.atlas;
    return `
    <div class="atlas-page" id="home">
      <div class="atlas-backdrop" aria-hidden="true">${scene('atlas')}${atlasKeywordCloud()}</div>
      <section class="atlas-hero"><div class="atlas-hero-copy">${label(c.eyebrow)}<h1>${c.headline}</h1><p>${c.sub}</p>${stackStrip(['LLMs','RAG','Agents','Multimodal'])}<div class="actions"><a class="button primary" href="#work">See selected work${icon('right')}</a>${cv()}</div></div><div class="atlas-intro"><span>CURRENT FOCUS</span><p>${c.focus}</p></div></section>
      <section class="atlas-work" id="work"><div class="atlas-heading">${label(c.workLabel)}<h2>${c.workTitle}</h2></div><div class="atlas-project-list">${projects.map((p,i)=>`<button class="atlas-project" data-project="${i}"><span>0${i+1}</span><div><small>${p.category}</small><h3>${p.short}</h3><p>${p.description}</p></div>${icon('arrow')}</button>`).join('')}</div></section>
      <section class="atlas-about" id="about"><div class="atlas-statement">${label(c.aboutLabel)}<h2>${c.aboutTitle}</h2><p>${bio}</p></div><div class="atlas-toolkit">${label('CAPABILITIES')}<div class="atlas-skills">${skillList()}</div></div></section>
      <section class="atlas-path"><div>${label('EXPERIENCE')}<h2>Learning by building.</h2></div>${experience()}</section>
      <section class="atlas-contact" id="contact">${label(c.contactLabel)}<h2>${c.contactTitle}</h2>${connect()}</section>${footer()}
    </div>`;
  },
  signal: () => {
    const c = copy.signal;
    return `
    <div class="signal-page" id="home">
      <section class="signal-hero">
        <div class="signal-hero-glow" aria-hidden="true"></div>
        <div class="signal-hero-copy">
          ${label(c.eyebrow)}
          <h1>${c.headline}</h1>
          <p>${c.sub}</p>
          ${stackStrip(['PyTorch','LangGraph','RAG','Eval'])}
          <div class="actions"><a class="button primary" href="#work">View channels${icon('right')}</a>${cv()}</div>
          <div class="signal-metrics" aria-label="Focus areas">
            <div><span>01</span><strong>LLM + RAG</strong><small>Retrieval that holds up</small></div>
            <div><span>02</span><strong>Agents</strong><small>Tools, memory, loops</small></div>
            <div><span>03</span><strong>Vision</strong><small>Models for real data</small></div>
          </div>
        </div>
        <div class="signal-stage">
          <div class="signal-stage-frame">
            <div class="signal-stage-top"><span class="signal-live">PULSE LIVE</span><span>WAVEFORM · 60Hz</span></div>
            ${scene('signal')}
            <div class="signal-stage-bottom"><span>freq / adaptive</span><span>noise ↓ · clarity ↑</span></div>
          </div>
        </div>
      </section>
      <section id="work" class="signal-work">
        <div class="signal-work-head">${label(c.workLabel)}<h2>${c.workTitle}</h2></div>
        <div class="signal-channels">${projects.map((p,i)=>`
          <button class="signal-channel tilt" data-project="${i}" style="--channel:${p.color}">
            <div class="signal-channel-top"><span>${String(i+1).padStart(2,'0')}</span><span>${p.category}</span></div>
            <h3>${p.short}</h3>
            <p>${p.description}</p>
            <div class="signal-channel-foot"><span>${p.tag}</span><span class="signal-channel-go">Open${icon('arrow')}</span></div>
            <i class="signal-wave" aria-hidden="true"></i>
          </button>`).join('')}
        </div>
      </section>
      <section id="about" class="signal-about">
        <div class="signal-about-copy">${label(c.aboutLabel)}<h2>${c.aboutTitle}</h2><p>${bio}</p><div class="signal-skills">${skillList()}</div></div>
        <div class="signal-about-path">${label('TIMELINE')}${experience()}</div>
      </section>
      <section id="contact" class="signal-contact">
        <div>${label(c.contactLabel)}<h2>${c.contactTitle}</h2></div>
        ${connect('Let’s connect')}
      </section>
      ${footer()}
    </div>`;
  },
  aura: () => {
    const c = copy.aura;
    return `
    <div class="aura-page" id="home"><section class="aura-hero">${scene('aura')}<div class="aura-copy">${label(c.eyebrow)}<h1>${c.headline}</h1><p>${c.sub}</p><div class="actions">${connect()}${cv()}</div></div><a class="aura-scroll" href="#work">Selected work<span>↓</span></a></section>
      <section class="aura-work section-wrap" id="work"><div class="aura-section-title">${label(c.workLabel)}<h2>${c.workTitle}</h2></div><div class="aura-constellation">${projects.map((p,i)=>`<button class="aura-card aura-card-${i} tilt" data-project="${i}"><div class="aura-card-orb" aria-hidden="true"><span>${['◌','∞','⊕','≈'][i]}</span></div>${label(p.category)}<h3>${p.short}</h3><p>${p.description}</p><span class="aura-card-link">Explore research ${icon('arrow')}</span></button>`).join('')}</div></section>
      <section class="aura-about section-wrap" id="about"><h2>${c.aboutTitle}</h2><p>${bio}</p><div class="skill-pills">${skillList()}</div>${experience()}</section>
      <section id="contact" class="aura-contact section-wrap">${label(c.contactLabel)}<h2>${c.contactTitle}</h2>${connect()}</section>${footer()}</div>`;
  },
  folio: () => {
    const c = copy.folio;
    return `
    <div class="folio-page" id="home"><section class="folio-cover"><div class="folio-kicker"><span>${c.kickerLeft}</span><span>${c.kickerRight}</span></div><h1>Habib <em>Ur Rehman.</em></h1><div class="folio-cover-bottom"><p>${c.coverLead}</p>${scene('folio')}<div><p>${c.coverAside}</p>${cv()}</div></div></section>
      <section class="folio-index" id="work"><div class="folio-section-label"><span>Ⅰ.</span><h2>${c.workTitle}</h2><span>FOUR EXPLORATIONS</span></div>${projects.map((p,i)=>`<details class="folio-study" ${i===0?'open':''}><summary><span class="folio-number">0${i+1}</span><h3>${p.short}</h3><span class="folio-category">${p.category}</span>${icon('plus')}</summary><div class="folio-study-body"><span class="folio-large-number" aria-hidden="true">${p.metric}</span><div><p>${p.detail}</p><div class="folio-tags">${p.stack.join(' / ')}</div><button class="text-link" data-project="${i}">Read study notes${icon('arrow')}</button></div></div></details>`).join('')}</section>
      <section class="folio-profile" id="about"><div class="folio-section-label"><span>Ⅱ.</span><h2>${c.aboutTitle}</h2></div><div class="folio-profile-body"><h3>${c.quote}</h3><div><p>${bio}</p>${experience()}</div></div></section>
      <section class="folio-contact" id="contact"><span>Ⅲ. / ${c.contactLabel}</span><h2>${c.contactTitle}</h2>${connect('Let’s connect', 'folio-connect')}</section>${footer()}</div>`;
  },
  shift: () => {
    const c = copy.shift;
    return `
    <div class="shift-page" id="home"><section class="shift-hero"><div class="shift-title">${label(c.eyebrow)}<h1>${c.headline}</h1><div class="shift-hero-copy"><p>${c.sub}</p>${cv()}</div></div><div class="shift-object">${scene('shift')}<span>QUESTION ↗ BUILD ↗ EVALUATE</span></div></section>
      <section class="shift-work" id="work"><div class="shift-section-heading"><h2>${c.workTitle}<span>(04)</span></h2><div class="carousel-controls"><button class="icon-button" data-slide="-1" aria-label="Previous project">${icon('left')}</button><span id="slide-number">01 / 04</span><button class="icon-button" data-slide="1" aria-label="Next project">${icon('right')}</button></div></div><div class="shift-track" tabindex="0" aria-label="Selected projects, scroll horizontally">${projects.map((p,i)=>`<article class="shift-slide" data-slide-index="${i}" style="--slide-color:${p.color}"><div class="shift-slide-top"><span>PROJECT / 0${i+1}</span><span>${p.category}</span></div><div class="shift-slide-body"><h3>${p.title}</h3><span class="shift-glyph" aria-hidden="true">${['✳','↗','⊞','≈'][i]}</span></div><div class="shift-slide-bottom"><p>${p.description}</p><button data-project="${i}" class="shift-open" aria-label="Explore ${p.short}">${icon('arrow')}</button></div></article>`).join('')}</div></section>
      <section class="shift-about" id="about"><div><span class="shift-star" aria-hidden="true">✳</span><h2>${c.aboutTitle}</h2></div><div><p>${bio}</p>${experience()}<div class="shift-skills">${skillList()}</div></div></section>
      <section class="shift-contact" id="contact"><h2>${c.contactTitle}</h2>${connect('Let’s connect', 'shift-connect')}</section>${footer()}</div>`;
  },
};

const storage = {
  get(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Preferences remain available for this visit. */ } },
};
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const migrated = { quantum: 'orbit', editorial: 'atlas', lowkey: 'atlas', terminal: 'signal', aurora: 'aura' };
let design = storage.get('habib-design-v5', migrated[storage.get('habib-theme', '')] || 'orbit');
if (!templates[design]) design = 'orbit';
let mode = storage.get('habib-mode-v4', 'dark') === 'light' ? 'light' : 'dark';
let cleanups = [];
let slideIndex = 0;
const main = $('#main');
const designMenu = $('#design-menu');
const projectDialog = $('#project-dialog');
const resumeDialog = $('#resume-dialog');
const resumeFrame = $('#resume-frame');
let scrollLockY = 0;

function lockPageScroll() {
  scrollLockY = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.classList.add('is-scroll-locked');
  document.body.style.top = `-${scrollLockY}px`;
  document.documentElement.style.overflow = 'hidden';
}
function unlockPageScroll() {
  if (!document.body.classList.contains('is-scroll-locked')) return;
  document.body.classList.remove('is-scroll-locked');
  document.body.style.top = '';
  document.documentElement.style.overflow = '';
  window.scrollTo(0, scrollLockY);
}
function openResume() {
  if (!resumeFrame.src) resumeFrame.src = links.cvPreview;
  lockPageScroll();
  resumeDialog.showModal();
}
function motionOff() { return reducedMotion.matches; }
function updateMotion() {
  document.documentElement.dataset.motion = motionOff() ? 'off' : 'on';
  window.dispatchEvent(new Event('motionchange'));
}
function updateMode() {
  document.documentElement.dataset.mode = mode;
  $('#mode-toggle').innerHTML = icon(mode === 'dark' ? 'sun' : 'moon');
  const action = `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`;
  $('#mode-toggle').setAttribute('aria-label', action);
  $('#mode-toggle').title = action;
  document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  storage.set('habib-mode-v4', mode);
  window.dispatchEvent(new Event('themechange'));
}
function render() {
  cleanups.forEach(fn => fn());
  cleanups = [];
  document.documentElement.dataset.design = design;
  main.innerHTML = templates[design]();
  $('.current-design').textContent = `/ ${designs.find(d=>d.id===design).name}`;
  $$('.design-option').forEach(b => b.setAttribute('aria-checked', String(b.dataset.design===design)));
  $$('[data-nav]').forEach(a => { a.removeAttribute('aria-current'); a.classList.remove('active'); });
  updateMode();
  updateMotion();
  $$('.scene', main).forEach(el => cleanups.push(mountScene(el, motionOff)));
  initReveal();
  initTilt();
  if (design === 'shift') initCarousel();
  window.scrollTo({top:0, behavior:'instant'});
}
function initReveal() {
  if (!('IntersectionObserver' in window) || motionOff()) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  $$('main section:not(:first-child), .orbit-project, .aura-card, .signal-channel').forEach(el => {
    el.classList.add('reveal'); observer.observe(el);
  });
  cleanups.push(() => observer.disconnect());
}
function initTilt() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  $$('.tilt', main).forEach(el => {
    el.addEventListener('pointermove', event => {
      if (motionOff()) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--rx', `${-(event.clientY-r.top-r.height/2)/r.height*5}deg`);
      el.style.setProperty('--ry', `${(event.clientX-r.left-r.width/2)/r.width*5}deg`);
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg'); });
  });
}
function initCarousel() {
  slideIndex = 0;
  const track = $('.shift-track');
  const update = () => {
    const slides = $$('.shift-slide', track);
    const left = track.getBoundingClientRect().left;
    slideIndex = slides.reduce((best, el, i) => Math.abs(el.getBoundingClientRect().left-left) < Math.abs(slides[best].getBoundingClientRect().left-left) ? i : best, 0);
    $('#slide-number').textContent = `0${slideIndex+1} / 04`;
    $('[data-slide="-1"]').disabled = slideIndex === 0;
    $('[data-slide="1"]').disabled = slideIndex === 3;
  };
  track.addEventListener('scroll', update, {passive:true});
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault(); moveSlide(event.key==='ArrowRight'?1:-1);
  });
  update();
}
function moveSlide(delta) {
  const track = $('.shift-track');
  const next = $$('.shift-slide', track)[Math.max(0, Math.min(3, slideIndex+delta))];
  track.scrollTo({left: next.offsetLeft-track.offsetLeft, behavior:motionOff()?'instant':'smooth'});
}
function showProject(index) {
  const p = projects[index];
  if (!p) return;
  $('#project-detail').innerHTML = `${label(`RESEARCH NOTES / 0${index+1}`)}<h2 id="project-title">${p.short}</h2><p class="project-intro">${p.description}</p><div class="detail-metric"><strong>${p.metric}</strong><span>${p.unit}</span></div><h3>Approach</h3><p>${p.detail}</p><div class="skill-pills">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div><div class="actions">${external(links.github,'Explore GitHub','button primary')}${connect('Discuss this work','button secondary')}</div>`;
  lockPageScroll();
  projectDialog.showModal();
}

$('#design-icon').innerHTML = icon('layers');
$('#chevron-icon').innerHTML = icon('chevron');
$('#nav-toggle').innerHTML = icon('menu');
const navToggle = $('#nav-toggle');
const navBackdrop = $('#nav-backdrop');
function setNavOpen(open) {
  document.documentElement.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navToggle.title = open ? 'Close menu' : 'Open menu';
  navToggle.innerHTML = icon(open ? 'close' : 'menu');
  navBackdrop.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
}
function setDesignMenu(open) {
  designMenu.hidden = !open;
  $('#design-toggle').setAttribute('aria-expanded', String(open));
  if (open) { setNavOpen(false); requestAnimationFrame(() => $('.design-option[aria-checked="true"]', designMenu)?.focus()); }
}
$$('[data-close]').forEach(button => { button.innerHTML = icon('close'); button.addEventListener('click', () => button.closest('dialog').close()); });
$$('dialog').forEach(dialog => {
  dialog.addEventListener('close', unlockPageScroll);
  dialog.addEventListener('cancel', unlockPageScroll);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close();
  });
});
resumeDialog.addEventListener('wheel', event => { if (!resumeDialog.contains(event.target)) event.preventDefault(); }, { passive: false });
projectDialog.addEventListener('wheel', event => {
  const scroller = projectDialog;
  const atTop = scroller.scrollTop <= 0 && event.deltaY < 0;
  const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1 && event.deltaY > 0;
  if (atTop || atBottom) event.preventDefault();
}, { passive: false });
$('#design-options').innerHTML = designs.map(d=>`<button class="design-option" role="menuitemradio" data-design="${d.id}" aria-checked="false"><span class="design-symbol symbol-${d.id}" aria-hidden="true">${d.id==='orbit'?'◉':d.id==='atlas'?'◎':d.id==='signal'?'⌁':d.id==='aura'?'◌':d.id==='folio'?'Aa':'↗'}</span><span><strong>${d.name}</strong><small>${d.description}</small></span><span class="design-number">${d.number}</span></button>`).join('');
navToggle.addEventListener('click', event => { event.stopPropagation(); setDesignMenu(false); setNavOpen(!document.documentElement.classList.contains('nav-open')); });
navBackdrop.addEventListener('click', () => setNavOpen(false));
$('#design-toggle').addEventListener('click', event => { event.stopPropagation(); setDesignMenu(designMenu.hidden); });
$('#mode-toggle').addEventListener('click', () => { mode = mode==='dark'?'light':'dark'; updateMode(); });
reducedMotion.addEventListener('change', updateMotion);
designMenu.addEventListener('click', event => {
  const button = event.target.closest('[data-design]');
  if (!button) return;
  design = button.dataset.design;
  storage.set('habib-design-v5', design);
  setDesignMenu(false);
  render();
  $('#design-toggle').focus();
  $('#announcement').textContent = `${designs.find(d=>d.id===design).name} design selected.`;
});
designMenu.addEventListener('keydown', event => {
  const options = $$('.design-option', designMenu), current = options.indexOf(document.activeElement);
  if (event.key === 'Escape') { event.preventDefault(); setDesignMenu(false); $('#design-toggle').focus(); return; }
  if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key==='Home'?0:event.key==='End'?options.length-1:(current+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
  options[next].focus();
});
document.addEventListener('click', event => { if (!event.target.closest('.design-picker')) setDesignMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 860) setNavOpen(false); });
document.addEventListener('click', event => {
  const resume = event.target.closest('[data-resume]');
  if (resume) { event.preventDefault(); openResume(); return; }
  const project = event.target.closest('[data-project]');
  if (project) { showProject(Number(project.dataset.project)); return; }
  const tab = event.target.closest('[data-tab]');
  if (tab) { setTab(tab.dataset.tab); return; }
  const slide = event.target.closest('[data-slide]');
  if (slide) { moveSlide(Number(slide.dataset.slide)); return; }
  const navLink = event.target.closest('#site-nav a');
  if (navLink) setNavOpen(false);
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = anchor.getAttribute('href').slice(1);
  if (target==='home') { event.preventDefault(); window.scrollTo({top:0,behavior:motionOff()?'instant':'smooth'}); }
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (resumeDialog.open) { resumeDialog.close(); return; }
  if (!designMenu.hidden) { setDesignMenu(false); $('#design-toggle').focus(); return; }
  if (document.documentElement.classList.contains('nav-open')) { setNavOpen(false); navToggle.focus(); }
});
render();
