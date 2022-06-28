export const AboutTestimonialSectionParams = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: false
}

export const AboutTestimonialSectionThumDots = {
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  centerMode: false,
  focusOnSelect: true,
  autoplay: true,
  autoplaySpeed: 4000
}

export const HomeTestimonialSectionParams = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2
      }
    }
  ]
}

export const TheeColumnCarousel = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2
      }
    }
  ]
}

export const TheeColumnCarousel2 = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

export const InstructorCourseSliderParams = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 1000,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}
