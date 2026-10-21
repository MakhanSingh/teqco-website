  // Hero: manual prev/next only (no autoplay), copy swaps with the slide.
  if(document.getElementById('hero')){
  const slides=[...document.querySelectorAll('.hero .slide')];
  const dots=[...document.querySelectorAll('#dots i')];
  const copy=[
    {h:'Steel, tools and hardware for the rural, trade and handyman market',p:'Teqco stocks a comprehensive range of steel sections, sheet and mesh, hand and power tools, fasteners and hardware, right here in Condobolin. Fast, friendly service from people who know the land.'},
    {h:'A vast selection of steel section, sheet and mesh',p:'RHS, SHS, pipe, angle, flat bar and sheet in the sizes you need, plus in-store cutting and folding up to 3mm.'},
    {h:'The brands tradies trust, under one roof',p:'HiKoki, Alpha Tools, KC Tools, Bossweld, Macnaught and more, with fasteners and hardware to match.'}
  ];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroText=document.getElementById('heroText'),heroActs=document.querySelector('.hero .actions');
  const DUR=6000;let i=0,timer=null;
  function show(n){
    i=(n+slides.length)%slides.length;
    slides.forEach((s,k)=>s.classList.toggle('on',k===i));
    dots.forEach((d,k)=>d.classList.toggle('on',k===i));
    const fx=[heroText.querySelector('h1'),heroText.querySelector('p'),heroActs];
    if(!reduce)fx.forEach(e=>e.classList.add('out'));
    heroText.querySelector('h1').textContent=copy[i].h;
    heroText.querySelector('p').textContent=copy[i].p;
    if(!reduce){void heroText.offsetWidth;requestAnimationFrame(()=>fx.forEach(e=>e.classList.remove('out')));}
    restart();
  }
  function restart(){clearInterval(timer);if(!reduce)timer=setInterval(()=>show(i+1),DUR);}
  document.getElementById('prev').addEventListener('click',()=>show(i-1));
  document.getElementById('next').addEventListener('click',()=>show(i+1));
  const hero=document.getElementById('hero');
  hero.addEventListener('mouseenter',()=>clearInterval(timer));
  hero.addEventListener('mouseleave',restart);
  document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):restart());
  restart();
  }

  // Enquiry form: mock submit (live site will post to the store's email).
  const enq=document.getElementById('enquiry');
  if(enq)enq.addEventListener('submit',e=>{
    e.preventDefault();
    const f=e.target;
    if(!f.checkValidity()){f.reportValidity();return;}
    document.getElementById('ok').classList.add('show');
    f.reset();
  });

  // Mobile menu toggle
  const burger=document.getElementById('burger'),mnav=document.getElementById('mnav');
  if(burger&&mnav){
    burger.addEventListener('click',()=>{
      const open=mnav.classList.toggle('open');
      burger.classList.toggle('is-open',open);
      burger.setAttribute('aria-expanded',open);
      burger.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mnav.classList.remove('open');burger.classList.remove('is-open');burger.setAttribute('aria-expanded','false');}));
  }
