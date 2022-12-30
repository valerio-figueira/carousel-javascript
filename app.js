const slider = {
    hero: document.querySelector(".sliders"),
    next: document.querySelector(".next"),
    prev: document.querySelector(".previous"),
    direction: "",
    autorun: true,
    interval: undefined,
    idle: false,
    timer: 4000
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
        slider.autorun = false;
        slider.idle = true;
        addAutorun(slider);
    });
    
    slider.prev.addEventListener("click", () => {
        if(slider.direction.match("next")){
            slider.hero.appendChild(slider.hero.firstElementChild);
        }
        slider.direction = "previous";
        addSliderConditionals(slider); 
        slider.autorun = false;
        slider.idle = true;
        addAutorun(slider);
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
        addSliderInterval(slider);
    } else{
        clearInterval(slider.interval);
        if(slider.idle){
            addSliderInterval(slider);
            slider.idle = false;
        }
    }
}

function addSliderInterval(slider){
    slider.interval = setInterval(() => {
        if(slider.direction.match("previous")){
            slider.hero.prepend(slider.hero.lastElementChild);
        }
        slider.direction = "next";
        addSliderConditionals(slider);
    }, slider.timer);
}

function addSliderConditionals(slider){

    if(slider.direction.match("next")){
        slider.hero.style.justifyContent = "flex-start";
        slider.hero.style.transform = "translateX(-100%)";
        slider.hero.style.transition = "all 1s";  
    } else{
        slider.hero.style.justifyContent = "flex-end";
        slider.hero.style.transform = "translateX(100%)";
        slider.hero.style.transition = "all 1s";   
    }
}