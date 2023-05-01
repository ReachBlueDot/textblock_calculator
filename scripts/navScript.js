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
        let wasActive = target.classList.contains('active');
        //console.log(wasActive);

        tabContents.forEach(tabContents => {

            tabContents.classList.remove('active');   
                     
        });

        if (wasActive===false) {
            target.classList.add('active');
        }
        
    });
});






