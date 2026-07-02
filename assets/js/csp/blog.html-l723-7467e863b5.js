document.addEventListener('DOMContentLoaded',function(){
  if(!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js-reveal-ready');
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{rootMargin:'0px 0px -60px 0px',threshold:0.1});
  document.querySelectorAll('.reveal').forEach(function(el){observer.observe(el);});
});
