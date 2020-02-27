/*--------Variables--------*/

const navbar = $('#navbar');
const stickyNavbar = $('.sticky-navbar');

const textAnimation = document.getElementById('textAnimation');

const slider = document.querySelector('#slider');
const sliderStage = document.querySelector('#sliderStage');
const prev =document.querySelector('#prev');
const show =document.querySelector('#show');
const next = document.querySelector('#next');
const prevArrow = document.querySelector('#prevArrow');
const nextArrow = document.querySelector('#nextArrow');
const windowClose = document.querySelector('#windowClose');
const sliderImgs = document.querySelectorAll('.works-img');
let currentSlider = 0;
let currentBool = false;

const blogQuestions = document.querySelectorAll('.blog-question span i');
const blogAnswers = document.querySelectorAll('.blog-answer');

/*--------Plugns--------*/

new WOW().init();

$(document).ready(function(){

    if(window.innerWidth > 768)
        $('#home').ripples();

    $('section[id="team"] .container .owl-carousel').owlCarousel({
        center: true,
        items:1,
        loop:true,
        margin:25,
        responsive:{
            0:{
              center:false  
            },
            500:{
                items:2,
                center:false
            },
            992:{
                items:3
            }
        }
        
    });
  
    $('section[id="about"] .container .owl-carousel').owlCarousel({
        center: false,
        items:1,
        loop:true,
        margin:0,
    });

    $('.counter').counterUp({
        delay:5,
        time:2500
    });
})
/*--------Loader--------*/
window.onload = function()
{
    window.innerWidth < 992 ? $('nav').addClass('bg-nav') : null;

    $('#loader').fadeOut(1000,function(){
        $('#loader').css("display","none");
        $('body,html').css("overflow-y","auto");
    });
};
/*--------Navbar & Up--------*/

$(window).scroll( () => {

    let top = $(this).scrollTop();

    if(window.innerWidth >= 992)
        top >= 100 ? $('nav').addClass('bg-nav') : $('nav').removeClass('bg-nav');

    top >= $("#services").offset().top ? $('#up').show(500) : $('#up').hide(500);
    
});

$('#up').click(() => {
    $('body,html').animate({scrollTop:0},500);
});

$('nav .nav-link').click(function(){
    let href = $(this).attr('href');
    let top = $(href).offset().top;

    if(window.innerHeight >= 992)
        $('body,html').animate({scrollTop:top-90},500);
    else
        $('body,html').animate({scrollTop:top-80},500);

    $('.navbar-collapse').removeClass('show');

});

/*--------Dots Links--------*/

$('.dots-link').click(function(){
    let href = $(this).attr("href");
    let top = $(href).offset().top;

    $('body,html').animate({scrollTop:top-90},500);
});

window.addEventListener("scroll",function(){
    let scrollTop = window.pageYOffset;
    
    if(scrollTop <= $('#services').offset().top-95)
    {
        $('.dots-link').removeClass('myActive');
        $('.dots-link').eq(0).addClass('myActive');
    }
    else if(scrollTop <= $('#works').offset().top-95 && scrollTop >= $('#services').offset().top-95)
    {
        $('.dots-link').removeClass('myActive');
        $('.dots-link').eq(1).addClass('myActive');
    }
    else if(scrollTop <= $('#team').offset().top-95 && scrollTop >= $('#works').offset().top-95)
    {
        $('.dots-link').removeClass('myActive');
        $('.dots-link').eq(2).addClass('myActive');
    }
    else if(scrollTop <= $('#about').offset().top-95 && scrollTop >= $('#team').offset().top-95)
    {
        $('.dots-link').removeClass('myActive');
        $('.dots-link').eq(3).addClass('myActive');
    }
    else if(scrollTop <= $('#blog').offset().top-95 && scrollTop >= $('#about').offset().top-95)
    {
        $('.dots-link').removeClass('myActive');
        $('.dots-link').eq(4).addClass('myActive');
    }
    else if(scrollTop <= $('#carrier').offset().top-95 && scrollTop >= $('#blog').offset().top-95)
    {
        $('.dots-link').removeClass('myActive');
        $('.dots-link').eq(5).addClass('myActive');
    }
    else if(scrollTop <= $('#developer').offset().top-95 && scrollTop >= $('#carrier').offset().top-95)
    {
        $('.dots-link').removeClass('myActive');
        $('.dots-link').eq(6).addClass('myActive');
    }
    else
    {
        $('.dots-link').removeClass('myActive');
        $('.dots-link').eq(7).addClass('myActive');
    }
    
});

/*--------Text Animation--------*/

let stauts = 0;
let timer = setInterval(typing,4500);

textAnimation.classList.add("type1");

function typing()
{
    if(stauts === 0)
    {
        textAnimation.classList.remove("type4");
        $("#textAnimation").html(`I'm <span class="red">Mahmoud Tarek</span>`);
        $(".header-icons .fa-github").removeClass("git");
        textAnimation.classList.add("type1");
        stauts++;
    }

    else if(stauts === 1)
    {
        textAnimation.classList.remove("type1");
        $("#textAnimation").html(`I'm <span class="red">Frontend Developer</span>`);
        textAnimation.classList.add("type2");
        stauts++;
    }

    else if(stauts === 2)
    {
        textAnimation.classList.remove("type2");
        $("#textAnimation").html(`My Github <span class="red">Profile</span>`);
        textAnimation.classList.add("type3");
        stauts++;
    }

    else if(stauts === 3)
    {
        textAnimation.classList.remove("type3");
        $("#textAnimation").html(`Is Here     <span class="red"><i class="fa fa-arrow-down"></i><i class="fa fa-arrow-down"></i><i class="fa fa-arrow-down"></i><i class="fa fa-arrow-down"></i><i class="fa fa-arrow-down"></i></span>`);
        $(".header-icons .fa-github").addClass("git");
        textAnimation.classList.add("type4");
        stauts = 0;
    }
}

/*--------Slider--------*/

sliderImgs.forEach( (element,i) => {

    element.addEventListener('click', function() {
        
        //let src = this.src;
        
        $(slider).animate({'opacity' : 1},500 , function(){
            $(this).css('pointerEvents' , 'all');
            $('body,html').css('overflow','hidden');
        });

        currentFun(i);
        
        currentSlider = i;
    })
});

windowClose.addEventListener('click', () => {
    fadeSliderOut();
});

slider.addEventListener('click', e => {
    let con = e.path[0];
    con==show || con==nextArrow || con==prevArrow || con==prev || con==next ? null : fadeSliderOut();
})

function fadeSliderOut(){
    $(slider).animate({'opacity' : 0},500 , function(){
        $(this).css('pointerEvents' , 'none');
        $('body,html').css('overflow','auto');
    });
};

prevArrow.addEventListener('click', prevFun);
nextArrow.addEventListener('click', nextFun);

function currentFun(i){
    $(prev).css('backgroundImage',`url(${i==0 ? sliderImgs[7].src : sliderImgs[i-1].src})`);
    $(show).css('backgroundImage',`url(${sliderImgs[i].src})`);
    $(next).css('backgroundImage',`url(${i==7 ? sliderImgs[0].src : sliderImgs[i+1].src})`);
};

function prevFun(){
    currentSlider==0 ? currentSlider=7 : currentSlider--;

   $(prev).animate({'right' : 0},300 , function(){

    currentBool = true;
       
        if(currentBool)
        {
            $(show).css('backgroundImage',`url(${sliderImgs[currentSlider].src})`);
            $(this).css('right','100%');

            currentFun(currentSlider);
        }
   });
};

function nextFun(){
    currentSlider==7 ? currentSlider=0 : currentSlider++;

   $(next).animate({'left' : 0},300 , function(){

    currentBool = true;
       
        if(currentBool)
        {
            $(show).css('backgroundImage',`url(${sliderImgs[currentSlider].src})`);
            $(this).css('left','100%');

            currentFun(currentSlider);
        }
   });
};

document.addEventListener('keydown', e => {
    e.keyCode==39 ? nextFun() : e.keyCode==37 ? prevFun() : e.keyCode==27 ? fadeSliderOut() : null;
})

/*--------Blog--------*/

function blogActive(index)
{
    $(blogQuestions[index]).hasClass('fa-minus') ? null : faPlus(index);
}

blogQuestions.forEach( (e,i) => {
    e.addEventListener('click' , () => {
        blogActive(i);
    });
});

function faPlus(num)
{
    let plusSiblings = $(blogQuestions[num]).parents('div[class="blog-caption"]').siblings().find('i');

    let plusArr = [...plusSiblings];

    plusArr.forEach( (e) => {
        if($(e).hasClass('fa-minus'))
        {
            $(e).parents('p').siblings().slideUp(500);

            $(e).removeClass('fa-minus');
            $(e).addClass('fa-plus');
            
            $(blogQuestions[num]).parents('p').siblings().slideDown(500);
        }
        
    });

    $(blogQuestions[num]).removeClass('fa-plus');
    $(blogQuestions[num]).addClass('fa-minus');
}
