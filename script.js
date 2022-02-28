'use strict';

const btnScrollToAboutMe = document.querySelector('.btn-scrollDown');
const sectionAboutMe = document.querySelector('#about-me');

const btnScrollToHeader = document.querySelector('.header-icon');

const nav = document.querySelector('.nav');

const navLinksContainer = document.querySelector('.nav-links');

const image = document.querySelector('.header-image');

const sections = document.querySelectorAll('.section');

// scroll to about me

btnScrollToAboutMe.addEventListener('click', function () {
  sectionAboutMe.scrollIntoView({ behavior: 'smooth' });
});

// scroll to header

btnScrollToHeader.addEventListener('click', function (e) {
  e.preventDefault();
  header.scrollIntoView({ behavior: 'smooth' });
});

// navbar - scroll to section

navLinksContainer.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// sticky navbar

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  console.log(entries);
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    btnScrollToHeader.classList.remove('hidden');
  } else {
    nav.classList.remove('sticky');
    btnScrollToHeader.classList.add('hidden');
  }
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
navObserver.observe(document.querySelector('#header'));

// reveal sections

// sections.forEach(section => {
//   section.classList.add('section--hidden');
// });

// img behaviour

image.addEventListener('mouseenter', function () {
  image.classList.add('roll');
  image.classList.remove('fixed');
  image.setAttribute('src', './images/portrait-blacknwhite.jpeg');
  setTimeout(function () {
    image.classList.remove('roll');
    image.classList.add('fixed');
    image.setAttribute('src', './images/portrait-tim.jpeg');
  }, 3000);
});
