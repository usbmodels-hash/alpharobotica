document.addEventListener('click',function(e){
  const btn=e.target.closest('.video-launch');
  if(!btn) return;
  const shell=btn.closest('.hd-lazy-shell');
  const video=shell.querySelector('video');
  if(!video.querySelector('source')){
    if(btn.dataset.videoWebm){
      const webmSource=document.createElement('source');
      webmSource.src=btn.dataset.videoWebm;
      webmSource.type='video/webm';
      video.appendChild(webmSource);
    }
    const mp4Source=document.createElement('source');
    mp4Source.src=btn.dataset.videoSrc;
    mp4Source.type='video/mp4';
    video.appendChild(mp4Source);
    video.load();
  }
  btn.style.display='none';
  video.hidden=false;
  video.play().catch(()=>{});
});
