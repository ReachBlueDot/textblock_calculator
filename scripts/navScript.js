/**
 * 
 * Code for navigation and tab elements
 */


/**
 * tabs
 */
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach(tabContents => {
            
            if (tabContents.id !== "results") {
                tabContents.classList.remove('active');
            }
            
        });
        target.classList.add('active');
    });
});






