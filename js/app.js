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

  sectionElts.forEach((elt) => {
    const id = elt.getAttribute("id");
    const nav = elt.getAttribute("data-nav");

    const isActive = elt.classList.contains("active");
    sections.push({ id, nav, isActive });
  });


}

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


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


