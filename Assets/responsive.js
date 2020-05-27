checkWidth();

// This function makes the dates typography responsive 
function checkWidth() {
    if ($(window).width() > 763) {
        $('.cards').removeClass('display-4');
    }
    else {
        $('.cards').addClass('display-4');
    }
}

$(window).resize(checkWidth);