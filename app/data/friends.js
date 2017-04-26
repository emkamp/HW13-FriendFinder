// UI
$("#modal").hide();


$("#modal-close").on("click", function() {
    $("#modal").hide();
    $("#container").removeClass("greyout");
});

$("#submit").on("click", function() {
    $("#container").addClass("greyout");
    $("#modal").show();
});