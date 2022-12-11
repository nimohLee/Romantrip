/* glitter function for main*/
$(function () {
    let body = $("#starshine"),
        template = $(".template.shine"),
        stars = 500,
        sparkle = 20;

    let size = "small";
    const createStar = function () {
        template
            .clone()
            .removeAttr("id")
            .css({
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                webkitAnimationDelay: Math.random() * sparkle + "s",
                mozAnimationDelay: Math.random() * sparkle + "s",
            })
            .addClass(size)
            .appendTo(body);
    };

    for (let i = 0; i < stars; i++) {
        if (i % 2 === 0) {
            size = "small";
        } else if (i % 3 === 0) {
            size = "medium";
        } else {
            size = "large";
        }

        createStar();
    }
});
