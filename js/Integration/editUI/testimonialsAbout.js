
// Get all staff members
let testimonialContainer = document.getElementById("testimonialContainer");

async function getTestimonials(){
        
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllTestimonials", getData)
    
    const allTestimonials = await response.json(); 
    const results = allTestimonials.allTestimonials;

        const testimonialTemplate = results.map(myFunction).join(' ');

        function myFunction(eachTestimonial) {

        return `
        <div class="testimonial-block">
            <div class="inner-box">
                <div class="row clearfix">
                    
                    <!-- Content Column -->
                    <div class="content-column col-lg-7 col-md-12 col-sm-12">
                        <div class="inner-column">
                            <div class="quote-icon">
                                <span class="icon fa fa-quote-left"></span>
                            </div>
                            <div class="text">${eachTestimonial.testimonial}</div>
                            <div class="author-info">
                                <div class="author-name">${eachTestimonial.name}</div>
                                <div class="designation">${eachTestimonial.location}</div>
                            </div>
                            
                        </div>
                    </div>
                    
                    <!-- Image Column -->
                    <div class="image-column col-lg-5 col-md-12 col-sm-12">
                        <div class="inner-column">
                            <div class="pattern-one"></div>
                            <div class="pattern-two"></div>
                            <div class="image">
                                <img src="${eachTestimonial.image}" alt="" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        `
        }

        testimonialContainer.innerHTML = testimonialTemplate;


        // Animate testimonials

        if ($('.client-testimonial-carousel').length && $('.client-thumbs-carousel').length) {

            var $sync3 = $(".client-testimonial-carousel"),
                $sync4 = $(".client-thumbs-carousel"),
                flag = false,
                duration = 500;
    
                $sync3
                    .owlCarousel({
                        loop:true,
                        items: 1,
                        margin: 0,
                        nav: true,
                        navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
                        dots: true,
                        autoplay: true,
                        autoplayTimeout: 15000
                    })
                    .on('changed.owl.carousel', function (e) {
                        if (!flag) {
                            flag = false;
                            $sync4.trigger('to.owl.carousel', [e.item.index, duration, true]);
                            flag = false;
                        }
                    });
    
                $sync4
                    .owlCarousel({
                        loop:true,
                        margin:20,
                        items: 1,
                        nav: false,
                        navText: [ '<span class="icon flaticon-left-arrow-2"></span>', '<span class="icon flaticon-right-arrow-1"></span>' ],
                        dots: false,
                        center: false,
                        autoplay: true,
                        autoplayTimeout: 15000,
                        responsive: {
                            0:{
                                items:1,
                                autoWidth: false
                            },
                            400:{
                                items:1,
                                autoWidth: false
                            },
                            600:{
                                items:1,
                                autoWidth: false
                            },
                            1000:{
                                items:1,
                                autoWidth: false
                            },
                            1200:{
                                items:1,
                                autoWidth: false
                            }
                        },
                    })
                    
            .on('click', '.owl-item', function () {
                $sync3.trigger('to.owl.carousel', [$(this).index(), duration, true]);
            })
            .on('changed.owl.carousel', function (e) {
                if (!flag) {
                    flag = true;		
                    $sync3.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;
                }
            });
        }
        

        }
        

getTestimonials();

