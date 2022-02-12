'use strict';

const btnScrollToAboutMe = document.querySelector('.btn-scrollDown');
const sectionAboutMe = document.querySelector('#about-me');

const nav = document.querySelector('.nav');

const navLinksContainer = document.querySelector('.nav-links');

const image = document.querySelector('.header-image');

// scroll to about me

btnScrollToAboutMe.addEventListener('click', function () {
  sectionAboutMe.scrollIntoView({ behavior: 'smooth' });
});

// navbar - scroll to section

navLinksContainer.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e);
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// img behaviour

image.addEventListener('mouseenter', function () {
  image.classList.add('roll');
  image.classList.remove('fixed');
  image.setAttribute('src', './images/portrait-blacknwhite.jpeg');
});

// image.addEventListener('mouseleave', function () {
//   image.classList.remove('roll');
//   image.classList.add('fixed');
//   image.setAttribute('src', './images/portrait-tim.jpeg');
// });
