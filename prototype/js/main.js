var main = function () {


    $("input").val("text")

    var FPS = 30;
    var resources = (Cookies.get('resources') ? parseInt(Cookies.get('resources')) : 0);
    var gather_rate = (Cookies.get('gather_rate') ? parseInt(Cookies.get('gather_rate')) : 1);

    $('#mine').click(function (){
        resources += gather_rate;
        Cookies.set('resources', resources)
    });

    $('#buy-pick').click(function (){
        if (resources >= 10) {
            resources -= 10;
            gather_rate += 1;
            Cookies.set('gather_rate', gather_rate)
        }
    });

    setInterval(function() {
        $("input").val(resources)

    }, 1000/FPS)

};

$(document).ready(main);
