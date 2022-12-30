const slider = {
    hero: document.querySelector(".sliders"),
    next: document.querySelector(".next"),
    prev: document.querySelector(".previous"),
    direction: "",
    autorun: true,
    interval: undefined
}

initSlider(slider);

function initSlider(slider){
    addAutorun(slider);
    addSliderEvents(slider);
}

function addSliderEvents(slider){

    slider.hero.addEventListener("mouseenter", () => {
        slider.autorun = false;
        addAutorun(slider);
        console.log(slider.autorun)
    })

    slider.hero.addEventListener("mouseleave", () => {
        slider.autorun = true;
        addAutorun(slider);
    })

    slider.next.addEventListener('click', () => {
        if(slider.direction.match("previous")){
            slider.hero.prepend(slider.hero.lastElementChild);
        }
        slider.direction = "next";
        addSliderConditionals(slider); 
    });
    
    slider.prev.addEventListener("click", () => {
        if(slider.direction.match("next")){
            slider.hero.appendChild(slider.hero.firstElementChild);
        }
        slider.direction = "previous";
        addSliderConditionals(slider); 
    });
    
    slider.hero.addEventListener("transitionend", () => {
        if(slider.direction.match("next")){
            slider.hero.appendChild(slider.hero.firstElementChild);
        } else{
            slider.hero.prepend(slider.hero.lastElementChild);
        }
    
        slider.hero.style.transition = "0s";
        slider.hero.style.transform = "translateX(0)";
    });
}

function addAutorun(slider){
    if(slider.autorun){
        slider.interval = setInterval(() => {
            slider.direction = "next";
            addSliderConditionals(slider);
        }, 3000);
    } else{
        clearInterval(slider.interval);
    }
}

function addSliderConditionals(slider){

    if(slider.direction.match("next")){
        slider.hero.style.justifyContent = "flex-start";
        slider.hero.style.transform = "translateX(-100%)";
        slider.hero.style.transition = "all .5s";  
    } else{
        slider.hero.style.justifyContent = "flex-end";
        slider.hero.style.transform = "translateX(100%)";
        slider.hero.style.transition = "all .5s";   
    }
}