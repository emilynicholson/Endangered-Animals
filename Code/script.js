document.addEventListener("DOMContentLoaded" , function () {
    const progressbarinner = document.querySelector('.progress-bar-inner')

    window.addEventListener('scroll' , function(){
        let h = document.documentElement;

        let st = h.scrollTop || document.body.scrollTop;
        let sh = h.scollHeight || document.body.scrollHeight;

        let percent = st / (sh - h.clientHeight) * 100;
        let roundedPercent = Math.round(percent);
    

        // for smooth effect
        // progressbarinner.style.width = percent + "%";

        progressbarinner.style.width = roundedPercent + "%";
         progressbarinner.innerText = roundedPercent + "% ";
    
    });


});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}





