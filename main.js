document.addEventListener('DOMContentLoaded', function () {
  // NAVBAR
  const navbar=document.getElementById('navbar'),hamburger=document.getElementById('hamburger'),mobileMenu=document.getElementById('mobile-menu'),navLinks=document.querySelectorAll('.navbar-links a, .mobile-menu a[data-section]'),sections=document.querySelectorAll('section[id]');
  function onScroll(){const scrolled=window.scrollY>50;navbar.classList.toggle('scrolled',scrolled);const backBtn=document.getElementById('back-to-top');if(backBtn)backBtn.classList.toggle('visible',window.scrollY>400);highlightActiveLink();}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  function highlightActiveLink(){let current='';sections.forEach(s=>{const top=s.offsetTop-100,bottom=top+s.offsetHeight;if(window.scrollY>=top&&window.scrollY<bottom)current=s.getAttribute('id');});navLinks.forEach(l=>{l.classList.remove('active');if(l.getAttribute('href')==='#'+current||l.getAttribute('data-section')===current)l.classList.add('active');});}
  if(hamburger&&mobileMenu){hamburger.addEventListener('click',function(){const isOpen=hamburger.classList.toggle('open');mobileMenu.classList.toggle('open',isOpen);document.body.style.overflow=isOpen?'hidden':'';});mobileMenu.querySelectorAll('a').forEach(l=>l.addEventListener('click',closeMobileMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu();});}
  function closeMobileMenu(){hamburger.classList.remove('open');mobileMenu.classList.remove('open');document.body.style.overflow='';}
  document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){const targetId=this.getAttribute('href').slice(1),target=document.getElementById(targetId);if(target){e.preventDefault();const offset=navbar.offsetHeight+16,top=target.getBoundingClientRect().top+window.scrollY-offset;window.scrollTo({top,behavior:'smooth'});}});});
  const backBtn=document.getElementById('back-to-top');if(backBtn)backBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // OBSERVERS
  function makeObserver(threshold=0.15,rootMargin='0px 0px -60px 0px'){return new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');else entry.target.classList.remove('visible');});},{threshold,rootMargin});}
  const obsDefault=makeObserver(0.12),obsSlow=makeObserver(0.08,'0px 0px -30px 0px'),obsStrict=makeObserver(0.30);
  function animateChildren(parent,selector,animClass,delayStep,observer,offset=0){const els=selector?Array.from(parent.querySelectorAll(selector)):Array.from(parent.children);els.forEach((el,i)=>{el.classList.add(animClass);el.style.transitionDelay=`${(i+offset)*delayStep}s`;observer.observe(el);});}

  // Ripple
  document.querySelectorAll('.btn').forEach(btn=>{btn.addEventListener('click',function(e){const r=document.createElement('span'),rect=btn.getBoundingClientRect(),size=Math.max(rect.width,rect.height);r.className='ripple';r.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;btn.appendChild(r);r.addEventListener('animationend',()=>r.remove());});});

  document.querySelectorAll('.fade-up,.fade-left,.fade-right,.section-divider').forEach(el=>obsDefault.observe(el));

  document.querySelectorAll('.section-label').forEach(label=>{new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting){label.classList.remove('glowing');void label.offsetWidth;label.classList.add('glowing');}else label.classList.remove('glowing');});},{threshold:0.8}).observe(label);});

  // Hero parallax
  const hero=document.getElementById('hero');
  if(hero){const orbs=hero.querySelectorAll('.hero-orb'),STRENGTH=[18,12,22];hero.addEventListener('mousemove',e=>{const rect=hero.getBoundingClientRect(),cx=(e.clientX-rect.left)/rect.width-0.5,cy=(e.clientY-rect.top)/rect.height-0.5;orbs.forEach((orb,i)=>{const s=STRENGTH[i]||15;orb.style.transform=`translate(${cx*s}px,${cy*s}px)`;});});hero.addEventListener('mouseleave',()=>orbs.forEach(orb=>{orb.style.transform='';}));}

  // About
  const aboutSection=document.getElementById('about');
  if(aboutSection){const rolesGrid=aboutSection.querySelector('.about-roles-grid');if(rolesGrid)animateChildren(rolesGrid,null,'anim-zoom',0.10,obsDefault);aboutSection.querySelectorAll('.stat-item').forEach((el,i)=>{el.classList.add('anim-pop');el.style.transitionDelay=`${i*0.12}s`;obsStrict.observe(el);});aboutSection.querySelectorAll('.info-item').forEach((el,i)=>{el.classList.add('anim-slide-left');el.style.transitionDelay=`${i*0.09}s`;obsDefault.observe(el);});const hackBadge=aboutSection.querySelector('.hackathon-badge');if(hackBadge){hackBadge.classList.add('anim-zoom');hackBadge.style.transitionDelay='0.5s';obsDefault.observe(hackBadge);}}

  // Experience
  const expSection=document.getElementById('experience');
  if(expSection){const timeline=expSection.querySelector('.timeline');if(timeline){new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting)timeline.classList.add('line-visible');else timeline.classList.remove('line-visible');});},{threshold:0.05}).observe(timeline);}expSection.querySelectorAll('.timeline-item').forEach((item,i)=>{const card=item.querySelector('.timeline-card'),dot=item.querySelector('.timeline-dot');if(card){const isRight=item.classList.contains('right');card.classList.add(isRight?'anim-slide-right':'anim-slide-left');card.style.transitionDelay=`${i*0.15+0.2}s`;obsSlow.observe(card);}if(dot){new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting)setTimeout(()=>dot.classList.add('dot-visible'),i*150+100);else dot.classList.remove('dot-visible');});},{threshold:0.8}).observe(dot);}});}

  // Skills
  const skillsSection=document.getElementById('skills');
  if(skillsSection){skillsSection.querySelectorAll('.skill-category').forEach((cat,i)=>{cat.classList.add('anim-zoom');cat.style.transitionDelay=`${i*0.10}s`;obsDefault.observe(cat);});skillsSection.querySelectorAll('.skill-tag').forEach((tag,i)=>{tag.classList.add('anim-pop');tag.style.transitionDelay=`${i*0.06+0.3}s`;obsDefault.observe(tag);});skillsSection.querySelectorAll('.language-item').forEach((el,i)=>{el.classList.add('anim-slide-left');el.style.transitionDelay=`${i*0.15}s`;obsDefault.observe(el);});}

  // Projects
  const projSection=document.getElementById('projects');
  if(projSection){projSection.querySelectorAll('.filter-btn').forEach((btn,i)=>{btn.classList.add('anim-fade-down');btn.style.transitionDelay=`${i*0.07}s`;obsDefault.observe(btn);});projSection.querySelectorAll('.project-card').forEach((card,i)=>{card.classList.add('anim-zoom');card.style.transitionDelay=`${i*0.09}s`;obsDefault.observe(card);});}

  // Education
  const eduSection=document.getElementById('education');
  if(eduSection){eduSection.querySelectorAll('.edu-card').forEach((card,i)=>{card.classList.add(i%2===0?'anim-slide-left':'anim-slide-right');card.style.transitionDelay=`${i*0.13}s`;obsDefault.observe(card);});eduSection.querySelectorAll('.hackathon-card').forEach((card,i)=>{card.classList.add('anim-flip');card.style.transitionDelay=`${i*0.15}s`;obsDefault.observe(card);});}

  // Exposoftware
  const expoSection=document.getElementById('exposoftware');
  if(expoSection){expoSection.querySelectorAll('.expo-pillar').forEach((p,i)=>{p.classList.add('anim-fade-up');p.style.transitionDelay=`${i*0.12+0.2}s`;obsDefault.observe(p);});expoSection.querySelectorAll('.expo-stat').forEach((s,i)=>{s.classList.add('anim-pop');s.style.transitionDelay=`${i*0.12+0.4}s`;obsDefault.observe(s);});expoSection.querySelectorAll('.expo-chip').forEach((c,i)=>{c.classList.add('anim-pop');c.style.transitionDelay=`${i*0.10+0.6}s`;obsDefault.observe(c);});const expoCard=expoSection.querySelector('.expo-card');if(expoCard){expoCard.style.opacity='0';new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting){expoCard.classList.remove('card-animated');void expoCard.offsetWidth;expoCard.style.opacity='0';setTimeout(()=>expoCard.classList.add('card-animated'),200);}else{expoCard.classList.remove('card-animated');expoCard.style.opacity='0';}});},{threshold:0.25}).observe(expoCard);}}

  // Contact
  const contactSection=document.getElementById('contact');
  if(contactSection){contactSection.querySelectorAll('.contact-method').forEach((el,i)=>{el.classList.add('anim-slide-left');el.style.transitionDelay=`${i*0.12}s`;obsDefault.observe(el);});contactSection.querySelectorAll('.contact-social-link').forEach((el,i)=>{el.classList.add('anim-pop');el.style.transitionDelay=`${i*0.10+0.3}s`;obsDefault.observe(el);});const formWrap=contactSection.querySelector('.contact-form-wrap');if(formWrap){formWrap.classList.add('anim-slide-right');obsDefault.observe(formWrap);}contactSection.querySelectorAll('.form-group').forEach((g,i)=>{g.classList.add('anim-fade-up');g.style.transitionDelay=`${i*0.08+0.3}s`;obsDefault.observe(g);});}

  // Footer
  const footer=document.getElementById('footer');
  if(footer){footer.querySelectorAll('.footer-brand,.footer-col').forEach((col,i)=>{col.classList.add('anim-fade-up');col.style.transitionDelay=`${i*0.12}s`;obsDefault.observe(col);});const fb=footer.querySelector('.footer-bottom');if(fb){fb.classList.add('anim-fade-up');fb.style.transitionDelay='0.4s';obsDefault.observe(fb);}}

  // Counters
  document.querySelectorAll('[data-count]').forEach(el=>{const suffix=el.getAttribute('data-suffix')||'',prefix=el.getAttribute('data-prefix')||'';new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting){el.classList.remove('counter-done');animateCounter(el);}else{el.textContent=prefix+'0'+suffix;el.classList.remove('counter-done');}});},{threshold:0.5}).observe(el);});
  function animateCounter(el){const target=parseFloat(el.getAttribute('data-count')),suffix=el.getAttribute('data-suffix')||'',prefix=el.getAttribute('data-prefix')||'',duration=1800,start=performance.now(),isFloat=target%1!==0;function update(now){const elapsed=now-start,progress=Math.min(elapsed/duration,1),eased=1-Math.pow(1-progress,3),current=target*eased;el.textContent=prefix+(isFloat?current.toFixed(1):Math.floor(current))+suffix;if(progress<1)requestAnimationFrame(update);else el.classList.add('counter-done');}requestAnimationFrame(update);}

  // Typewriter
  const typewriterEl=document.getElementById('typewriter-text');
  if(typewriterEl){const texts=['Desarrollador Full Stack','Mtro. en Ingeniería de Software','Lic. en Tecnologías de la Información','5× Ganador Exposoftware','Experto en Linux y SQL'];let textIndex=0,charIndex=0,isDeleting=false;const TYPING_SPEED=65,DELETING_SPEED=35,PAUSE_AFTER=2200;function type(){const current=texts[textIndex];if(!isDeleting){typewriterEl.textContent=current.substring(0,charIndex+1);charIndex++;if(charIndex===current.length){isDeleting=true;setTimeout(type,PAUSE_AFTER);return;}setTimeout(type,TYPING_SPEED);}else{typewriterEl.textContent=current.substring(0,charIndex-1);charIndex--;if(charIndex===0){isDeleting=false;textIndex=(textIndex+1)%texts.length;}setTimeout(type,DELETING_SPEED);}}setTimeout(type,1200);}

  // Particles
  function spawnParticle(section){const p=document.createElement('div'),size=Math.random()*6+3,left=Math.random()*90+5,dur=Math.random()*4+5,del=Math.random()*2,colors=['rgba(1,75,160,0.45)','rgba(127,0,178,0.45)','rgba(255,255,0,0.40)'];p.className='section-particle';p.style.cssText=`width:${size}px;height:${size}px;left:${left}%;bottom:0;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${del}s;animation-duration:${dur}s;`;section.appendChild(p);p.addEventListener('animationend',()=>p.remove());}
  ['#about','#skills','#exposoftware'].forEach(sel=>{const section=document.querySelector(sel);if(!section)return;let intervalId=null;new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting){let count=0;intervalId=setInterval(()=>{spawnParticle(section);if(++count>=10)clearInterval(intervalId);},280);}else{if(intervalId){clearInterval(intervalId);intervalId=null;}}});},{threshold:0.2}).observe(section);});

  // Projects filter
  const filterBtns=document.querySelectorAll('.filter-btn'),projectCards=document.querySelectorAll('.project-card');
  filterBtns.forEach(btn=>{btn.addEventListener('click',function(){filterBtns.forEach(b=>b.classList.remove('active'));this.classList.add('active');const filter=this.getAttribute('data-filter');projectCards.forEach((card,index)=>{const categories=card.getAttribute('data-category')||'',matches=filter==='all'||categories.includes(filter);if(matches){card.classList.remove('hidden');card.style.animationDelay=`${index*0.05}s`;}else card.classList.add('hidden');});});});

  // Contact form
  const form=document.getElementById('contact-form');
  if(form){form.addEventListener('submit',function(e){e.preventDefault();const btn=form.querySelector('.form-submit-btn'),originalText=btn.innerHTML;btn.innerHTML='<span>Enviando...</span>';btn.disabled=true;setTimeout(function(){showFormSuccess();btn.innerHTML=originalText;btn.disabled=false;form.reset();},1500);});}
  function showFormSuccess(){const wrap=document.querySelector('.contact-form-wrap'),success=document.createElement('div');success.className='form-success-msg';success.innerHTML=`<div style="font-size:3rem;margin-bottom:1rem;">✓</div><h3 style="margin-bottom:0.5rem;">¡Mensaje enviado!</h3><p>Gracias por escribirme. Te responderé a la brevedad.</p>`;success.style.cssText='text-align:center;padding:2rem;';const formEl=wrap.querySelector('.contact-form');formEl.style.display='none';wrap.appendChild(success);setTimeout(function(){wrap.removeChild(success);formEl.style.display='';},4000);}
});
