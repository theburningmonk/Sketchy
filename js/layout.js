$(function () {
    // set up the high level accordion
    var icons = {
        header: "ui-icon-circle-arrow-e",
        headerSelected: "ui-icon-circle-arrow-s"
    };

    $("#accordion").accordion({
        autoHeight: false,
        fillSpace: true,
        navigation: true,
        icons: icons
    });

    // set up colour picker
    $("#stroke-colour-picker").ColorPicker({
        flat: true,
        color: '#000',
        onSubmit: function (hsb, hex, rgb) {
            var hexColour = "#" + hex;
            $("#stroke-colour").css("background", hexColour);
            setColour(hexColour);
        }
    });

    var strokeColourPicker = $("#stroke-colour-picker");
    $("#stroke-colour-tool").hover(function () {
        strokeColourPicker.stop().animate({ height: 173 }, 500);
    }, function () {
        strokeColourPicker.stop().animate({ height: 0 }, 500);
    });

    var lineWidthPicker = $("#line-width-picker");
    $("#line-width-tool").hover(function () {
        lineWidthPicker.stop().animate({ height: 130 }, 500);
    }, function () {
        lineWidthPicker.stop().animate({ height: 0 }, 500);
    });

    $("#delete-tool").click(function () {
        clearDrawing();
    });

    $("#pencil-tool").click(function () {
        setBrush("pencil");
        $(".tool-button").removeClass("selected");
        $(this).parent().addClass("selected");
    });

    $("#spray-tool").click(function () {
        setBrush("spray");
        $(".tool-button").removeClass("selected");
        $(this).parent().addClass("selected");
    });

    $("#paint-tool").click(function () {
        setBrush("paint");
        $(".tool-button").removeClass("selected");
        $(this).parent().addClass("selected");
    });

    $("#eraser-tool").click(function () {
        setBrush("eraser");
        $(".tool-button").removeClass("selected");
        $(this).parent().addClass("selected");
    });

    $("#colour-picker-tool").click(function () {
        setBrush("colour-picker");
        $(".tool-button").removeClass("selected");
        $(this).parent().addClass("selected");
    });
});