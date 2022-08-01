function countdown_clock(clock_id, end_date, end_text) {
    var countDownDate = new Date(end_date).getTime();

    var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(clock_id).innerHTML = "Thời gian còn lại: " + days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById(clock_id).innerHTML = end_text;
    }
    }, 1000);
};