
//Show preloader on DOM Load
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 5000);
});
