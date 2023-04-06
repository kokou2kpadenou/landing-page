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
const sections = [];


/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

function main() {

  // Select all section elements in the HTML
  const sectionElts = document.querySelectorAll("section");

  // Get navbar list element
  const navbarList = document.querySelector("#navbar__list");

  sectionElts.forEach((elt) => {
    const id = elt.getAttribute("id");
    const nav = elt.getAttribute("data-nav");

    const isActive = elt.classList.contains("active");
    sections.push({ id, nav, isActive });
  });

  // build the nav
  sections.forEach((section) => {
    // Create list item element with class navbar_menu
    const item = document.createElement("li");
    item.classList.add("navbar__menu");

    // Create an anchor element with class menu__link
    const link = document.createElement("a");
    link.textContent = section.nav;
    link.setAttribute("id", `lnk${section.id}`);
    link.setAttribute("href", `#${section.id}`);
    link.classList.add("menu__link");
    if (navbarList.childElementCount === 0) {
      link.classList.add("menu-active-class");
    }

    // Add the an anchor element to the list item element as child
    item.appendChild(link);
    // Add the list element to the list element
    navbarList.appendChild(item);
  });


  // Add class 'active' to section when near top of viewport
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("your-active-class");
        document.getElementById(`lnk${entry.target.id}`).classList.add("menu-active-class");
        sections.forEach((section) => {
          if (section.id !== entry.target.id) {
            const otherSection = document.getElementById(section.id);
            const otherMenu = document.getElementById(`lnk${section.id}`);
            console.log(otherMenu);
            otherSection.classList.remove("your-active-class");
            otherMenu.classList.remove("menu-active-class");
          }
        });
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(document.getElementById(section.id));
  });

  // Scroll to anchor ID using scrollTO event
  const links = document.querySelectorAll(".menu__link");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      // prevent the default behavior of the anchor
      event.preventDefault();

      const sectionId = link.getAttribute("href").substring(1);

      document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // To hide the fixed navigation bar while not scrolling
  const navbar = document.querySelector('.page__header');
  let pageScrollTimeout = null;

  window.addEventListener('scroll', () => {
    clearTimeout(pageScrollTimeout);
    navbar.classList.remove('page__header--hide');
    pageScrollTimeout = setTimeout(() => {
      navbar.classList.add('page__header--hide');
    }, 2000);
  })

}



/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener("DOMContentLoaded", () => {
  main();
});


// Scroll to section on link click

// Set sections as active


