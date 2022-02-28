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

const revealSection = function (entries, observer) {
  const [entry] = entries;

  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.5,
});

sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

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

// card slider

const cardSlider = function () {
  const cards = document.querySelectorAll('.project-card');

  const bntLeft = document.querySelector('.btn-left');
  const btnRight = document.querySelector('.btn-right');

  let curCard = 0;
  const maxCard = cards.length;

  // slider
  const goToCard = function (card) {
    cards.forEach(
      (c, i) => (c.style.transform = `translateX${100 * (i - card)}%`)
    );
  };

  // next card

  const nextCard = function () {
    if (curCard === maxCard - 1) {
      curCard = 0;
    } else curCard++;

    goToCard(curCard);
  };

  // previous card

  const prevCard = function () {
    if (curCard === 0) {
      curCard = maxCard - 1;
    } else curCard--;

    goToCard(curCard);
  };

  const init = () => goToCard(0);
  init();

  bntLeft.addEventListener('click', prevCard);
  btnRight.addEventListener('click', nextCard);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === 'ArrowRight') nextCard();
  });
};
cardSlider();
