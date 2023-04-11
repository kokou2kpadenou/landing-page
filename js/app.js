/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/

// Create an empty to store the sections
let sections = [];
// Section active class
const SECTION_ACTIVE_CLASS = 'your-active-class';
// Menu item active class
const MENU_ITEM_ACTIVE_CLASS = 'menu-active-class';


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
* @description Set property isActive to true for element with id egal to eltToUpdate and false other elements
* @param {array} list
* @param {string} eltToUpdate
* @returns {array} the list with the updated state
*/
function updateSections(list, eltToUpdate) {
  return [...list].map(elt => {
    const found = elt.id === eltToUpdate;
    if (elt.isActive !== found)  {
      elt.isActive = found;
    }
    return elt;
  })
}

/**
* @description Update the DOM base on list
* @param {array} list
* @param {string} classNameSection
* @param {string} classNameMenuItem
*/
function SyncDOM(list, classNameSection, classNameMenuItem){

      [...list].forEach((item) => {
        const itemElt = document.getElementById(item.id);
        const menuLnk = document.getElementById(`lnk${item.id}`);

        // if section is active and don't have active class then add active class
        if (item.isActive && !itemElt.classList.contains(classNameSection)) {
          // section
          itemElt.classList.add(classNameSection);
          // menu
          menuLnk.classList.add(classNameMenuItem);
        }

        // if section is not active and has active class then remove the active class
        if (!item.isActive && itemElt.classList.contains(classNameSection)) {
          // section
          itemElt.classList.remove(classNameSection);
          // menu
          menuLnk.classList.remove(classNameMenuItem);
        }
      })
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

function main() {

  // Select all section elements in the HTML
  const sectionElts = document.querySelectorAll('section');

  // Get navbar list element
  const navbarList = document.querySelector('#navbar__list');

  sectionElts.forEach((elt) => {
    const id = elt.getAttribute('id');
    const nav = elt.getAttribute('data-nav');

    const isActive = elt.classList.contains('active');
    sections.push({ id, nav, isActive });
  });

  // build the nav
  sections.forEach((section) => {
    // Create list item element with class navbar_menu
    const item = document.createElement('li');
    item.classList.add('navbar__menu');

    // Create an anchor element with class menu__link, id, href and content
    const link = document.createElement('a');
    link.textContent = section.nav;
    link.setAttribute('id', `lnk${section.id}`);
    // NOTE: The scrollIntoView method is used to scroll sections to the viewport, no need for the href attribute.
    // But keep it for accessibility and fallback in case javascript is not available.
    link.setAttribute('href', `#${section.id}`);
    link.classList.add('menu__link');
    if (navbarList.childElementCount === 0) {
      link.classList.add('menu-active-class');
    }

    // Add the an anchor element to the list item element as child
    item.appendChild(link);
    // Add the list element to the list element
    navbarList.appendChild(item);
  });


  // Add class 'active' to section when near top of viewport
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Update the data structure
        sections = updateSections(sections, entry.target.id);
        // Update the DOM
        SyncDOM(sections, SECTION_ACTIVE_CLASS, MENU_ITEM_ACTIVE_CLASS);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(document.getElementById(section.id));
  });

  // Scroll to anchor ID using scrollTO event
  const links = document.querySelectorAll('.menu__link');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      // prevent the default behavior of the anchor
      event.preventDefault();

      const sectionId = link.getAttribute('href').substring(1);

      document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  // To hide the fixed navigation bar while not scrolling
  const GRACE_PERIOD_HIRE_BARE = 6000;
  const navbar = document.querySelector('.page__header');
  const progress = document.querySelector('.page__progress circle');
  const STROKE_DASHARRARY = 283;
  let pageScrollTimeout = null;


  function eventHandlerActiveNavbar() {
    clearTimeout(pageScrollTimeout);
    navbar.classList.remove('page__header--hide');
    pageScrollTimeout = setTimeout(() => {
      navbar.classList.add('page__header--hide');
    }, GRACE_PERIOD_HIRE_BARE);

    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);

    if (scrollPercentRounded > 100) {
      scrollPercentRounded = 100;
    }

    progress.style.strokeDashoffset = STROKE_DASHARRARY - (STROKE_DASHARRARY * scrollPercentRounded / 2) / 100
  }

  window.addEventListener('scroll', eventHandlerActiveNavbar);

  const menuBtn = document.querySelector('.menu__button');
  menuBtn.addEventListener('click', eventHandlerActiveNavbar);

  // Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page
  const scrollToTop = document.querySelector('.to__top');
  const hero = document.querySelector('.main__hero');

  const toTopObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        scrollToTop.classList.add('to__top--visible');
      } else {
        scrollToTop.classList.remove('to__top--visible');
      }
    })
  }, {root: null, threshold: 0,});

  toTopObserver.observe(hero);

  scrollToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  })

  // Section collapsible
  // Select buttons in sections
  const collapseBnts = document.querySelectorAll('section button[type="button"]');

  collapseBnts.forEach((btn => {

    btn.addEventListener('click', () => {
      const section = btn.closest('section');
      // Collapse / Expand
      section.classList.toggle('collapsed');
      // For accessibility
      btn.setAttribute('aria-label', section.classList.contains('collapsed') ? 'Expand' : 'Collapse');
      // For hint
      btn.setAttribute('title', btn.getAttribute('aria-label'));
    })
  }))

}



/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', () => {
  main();
});


// Scroll to section on link click

// Set sections as active


