// script.js

// Add event listener to the form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form data
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var date = document.querySelector('#appointment-date').value;
    var time = document.querySelector('#appointment-time').value;
})
