// FOR MANTAINANCE
//window.location.href = "/maintenance.html";

// Adding ads
ads = document.createElement("script");
ads.src = "/js/ads.js";
document.body.appendChild(ads);


// For update notification
console.log(window.location.pathname)
if (localStorage.getItem('uptodate') != '2022-08-01 00:00:00') {
    if (window.location.pathname.search("startup") == -1) {
        window.location.href = "/startup.html?url=" + encodeURIComponent(window.location.href); 
    }
}


const sidebarWrapper = document.getElementById('sidebar-wrapper');
let scrollToTopVisible = false;
// Closes the sidebar menu
const menuToggle = document.body.querySelector('.menu-toggle');
menuToggle.addEventListener('click', event => {
    event.preventDefault();
    sidebarWrapper.classList.toggle('active');
    _toggleMenuIcon();
    menuToggle.classList.toggle('active');
})

// Closes responsive menu when a scroll trigger link is clicked
var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
scrollTriggerList.map(scrollTrigger => {
    scrollTrigger.addEventListener('click', () => {
        sidebarWrapper.classList.remove('active');
        menuToggle.classList.remove('active');
        _toggleMenuIcon();
    })
});

function _toggleMenuIcon() {
    const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
    const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
    if (menuToggleBars) {
        menuToggleBars.classList.remove('fa-bars');
        menuToggleBars.classList.add('fa-xmark');
    }
    if (menuToggleTimes) {
        menuToggleTimes.classList.remove('fa-xmark');
        menuToggleTimes.classList.add('fa-bars');
    }
}

// Scroll to top button appear
document.addEventListener('scroll', () => {
    const scrollToTop = document.body.querySelector('.scroll-to-top');
    if (document.documentElement.scrollTop > 100) {
        if (!scrollToTopVisible) {
            fadeIn(scrollToTop);
            scrollToTopVisible = true;
        }
    } else {
        if (scrollToTopVisible) {
            fadeOut(scrollToTop);
            scrollToTopVisible = false;
        }
    }
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
function expand_nav() {
    const nav = document.getElementById("more-nav-port");
    if (nav.style.display === "block") {
        $("#more-nav-port").fadeOut(500,'swing');
    } else {
        $("#more-nav-port").fadeIn(500,'swing');
        nav.style.display = "block";
    }
}

function expand_spec_nav(id) {
    const nav = document.getElementById(id);
    if (nav.style.display === "block") {
        $("#" + id).fadeOut(500,'swing');
    } else {
        $("#" + id).fadeIn(500,'swing');
        nav.style.display = "block";
    }
}

function update_nav() {
    const ul = document.querySelector('.sidebar-nav');
    main_li = document.createElement('li');
    main_li.className = "sidebar-nav-item";
    expand_button = document.createElement('a');
    expand_button.onclick = function() {expand_spec_nav("ex_nav")};
    expand_button.innerHTML = "Policy";
    ul1 = document.createElement('ul');
    ul1.id = "ex_nav";
    ul1.className = "sidebar-nav-item";
    ul1.style.display = "none";
    li1 = document.createElement('li');
    li1.className = "sidebar-nav-item";
    li1.innerHTML = "<a href='/policy/Privacy'>Quyền riêng tư</a>";
    li2 = document.createElement('li');
    li2.className = "sidebar-nav-item";
    li2.innerHTML = "<a href='/policy/Terms_of_use'>Điều khoản sử dụng</a>";
    ul1.appendChild(li1);
    ul1.appendChild(li2);
    main_li.appendChild(expand_button);
    main_li.appendChild(ul1);
    ul.appendChild(main_li);

}
update_nav();