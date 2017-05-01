// FRONT END STUFF
$(document).ready(function() {
    $("#modal").hide();
    $("#survey-questions").hide();
    $("#error").hide();

    // Form validation
    function validateForm(relevantFields) {
        console.log("validateForms triggered. fields are ->");
        console.log(relevantFields);
        var isValid = true;
        $(relevantFields).each(function() {
            if ($(this).val() === "") {
                isValid = false;
                console.log("result is: " + isValid);
            } else {
                console.log("result is: " + isValid);
            }
        });
        return isValid;
    }

    $("#btn-survey-begin").on("click", function() {
        console.log("btn-survey-begin click");
        var introFields = $(".form-control");
        if (validateForm(introFields)) {
            $("#survey-intro").hide();
            $("#survey-questions").show();
        } else {
            $("#error").show();
            $("#error").html("Blank fields? don't do that.");
        };
    });

    $("input, select").focus(function() {
        $("#error").hide();
    });

    $("#modal-close").on("click", function() {
        $("#modal").hide();
        $("#container").removeClass("greyout");
    });

    $("#submit").on("click", function(event) {
        event.preventDefault();
        var surveyResponses = $("#survey-questions select");
        // If all required fields are filled
        if (validateForm(surveyResponses)) {
            // Create an object for the user"s data
            var userData = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]
            };

            // AJAX post the data to the friends API.
            $.post("/api/friends", userData, function(data) {
                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
                $("#match-name").html(data.name);
                $("#match-pic").attr("src", data.photo);

                // Show the modal with the best match
                $("#container").addClass("greyout");
                $("#modal").show();
            });
        } else {
            console.log("error");
            $("#error").show();
            $("#error").html("Looks like you missed a question. Check the survey and try again.");
        }
        // end submit click event 
    });

});