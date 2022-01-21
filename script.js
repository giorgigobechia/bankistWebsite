'use strict';

//MODAL
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//SMOOTH SCROLL
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
//TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
//NAVIGATION
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
//TARGET IMAGES

const openModal = function (e) {
    e.preventDefault()
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal))
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
//SMOOTH SCROLL
btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
        section1.scrollIntoView({behavior: 'smooth'})
})
document.querySelector('.nav__links').addEventListener('click',function (e) {
    e.preventDefault()

    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
})

//TABBED COMPONENT
tabsContainer.addEventListener('click',function (e) {
    const clicked = e.target.closest('.operations__tab')
    if (!clicked) return
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    tabsContent.forEach(c => c.classList.remove('operations__content--active'))
    clicked.classList.add('operations__tab--active')
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})
// MENU FADE ANIMATION WITH JS
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this
        })
        logo.style.opacity = this
    }
}
nav.addEventListener('mouseover',handleHover.bind(0.5))
nav.addEventListener('mouseout',handleHover.bind(1))
//sticky navigation
const stickyNav = function (entries) {
    const [entry] = entries
    console.log(entry);
    !entry.isIntersecting ? nav.classList.add('sticky') :  nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav,{
    root: null,
    threshold: 0,
    rootMargin: `-90px`
})
headerObserver.observe(header)
//REVEAL SECTIONS
const allSections = document.querySelectorAll('.section')
const revealSection = function (entries,observer) {
    const [entry] = entries
    if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection,{
    root: null,
    threshold: 0.15
})

allSections.forEach(function (section) {
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})
//LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

const imgObserver = new IntersectionObserver(loadImg,{root: null,threshold: 0})

imgTargets.forEach(img => imgObserver.observe(img))