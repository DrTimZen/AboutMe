'use strict';

const btnScrollToAboutMe = document.querySelector('.btn-scrollDown');
const sectionAboutMe = document.querySelector('#about-me');
const btnScrollToHeader = document.querySelector('.scrollToTop-icon');
const nav = document.querySelector('.nav');
const navLinksContainer = document.querySelector('.nav-links');
const image = document.querySelector('.header-image');
const sections = document.querySelectorAll('.section');
const modalWindow = document.querySelector('.modal-window');
const modalBtn = document.querySelector('.modal-btn');
const sliderCards = document.querySelector('.cards-slider');
const overlay = document.querySelector('.overlay');
const navBtn = document.querySelector('.nav-icon');

// set emailadress

const setEmail = function () {
  const me = 'tim.zen';
  const place = 'icloud.com';
  document.getElementById('email').href = `mailto:${me}@${place}`;
};
setEmail();

// scroll to about me

btnScrollToAboutMe.addEventListener('click', function () {
  sectionAboutMe.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// scroll to header

btnScrollToHeader.addEventListener('click', function (e) {
  e.preventDefault();
  header.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// navbar - scroll to section

navLinksContainer.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    document
      .querySelector(id)
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
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

// mobile navbar

const navMobile = function () {
  const openNavbar = function () {
    navBtn.classList.toggle('rotate');
    navLinksContainer.classList.toggle('move-nav');
    navLinksContainer.style.visibility = 'visible';
  };

  // event listener

  navBtn.addEventListener('click', openNavbar);
};
navMobile();

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight + 30}px`,
});
navObserver.observe(document.querySelector('#header'));

// reveal sections

const revealSection = function (entries, observer) {
  const [entry] = entries;

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
  image.setAttribute('src', './images/portrait-blacknwhite.webp');
  setTimeout(function () {
    image.classList.remove('roll');
    image.classList.add('fixed');
    image.setAttribute('src', './images/portrait-tim.webp');
  }, 3000);
});

// card slider

const cardSlider = function () {
  const cards = document.querySelectorAll('.project-card');
  const bntLeft = document.querySelector('.cards-btn-left');
  const btnRight = document.querySelector('.cards-btn-right');

  let curCard = 0;
  const maxCard = cards.length;

  // slider
  const goToCard = function (card) {
    cards.forEach(
      (c, i) => (c.style.transform = `translateX(${100 * (i - card)}%)`)
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

// modal window

const modal_window = function () {
  const projectsData = [
    {
      id: 1,
      header: 'Rollin` Dice Game',
      text: 'a small webapp game for JS practice',
      url: 'https://rollindices.netlify.app/',
      urlText: 'rollindices.netlify.app',
    },
    {
      id: 2,
      header: 'cd covers dymala',
      text: 'layout cd covers for dymala band',
      url: './images/dymala-cover.webp',
      urlText: 'cd cover dymala band',
    },
    {
      id: 3,
      header: 'Hannah Arendt Lectures 2015',
      text: 'design of info material for the <br> Hannah Arendt Lectures 2015<br> in Hanover',
      url: './images/work samples hal 2015.webp',
      urlText: 'work samples',
    },
  ];

  // open modal window

  const openModalWindow = function (e) {
    if (e.target.classList.contains('project-img')) {
      const id = e.target.getAttribute('id') - 1;
      modalWindow.classList.remove('hidden');
      overlay.classList.remove('hidden');
      modalWindow.insertAdjacentHTML(
        'afterbegin',
        `
      <div class="modal-text">
      <h3>${projectsData[id].header}</h3>
      <p>${projectsData[id].text}</p>
      <p>
        <a
        alt="${projectsData[id].urlText}
          target="_blank"
          class="modal-link"
          href="${projectsData[id].url}"
          >${projectsData[id].urlText}</a
        >
      </p>
    </div>
      `
      );
    }
  };

  // close modal window

  const closeModalWindow = function (e) {
    modalWindow.classList.add('hidden');
    modalWindow.removeChild(modalWindow.firstElementChild);
    overlay.classList.add('hidden');
  };

  // event listener

  sliderCards.addEventListener('click', openModalWindow);
  modalBtn.addEventListener('click', closeModalWindow);
  overlay.addEventListener('click', closeModalWindow);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalWindow.classList.contains('hidden'))
      closeModalWindow();
  });
};
modal_window();

window.addEventListener('orientationchange', function () {
  document.location.reload();
});
