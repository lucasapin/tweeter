$(document).ready(function () {
  let counter = 140;
  $("#tweet-text").on("keypress change", (event) => {
    let charRemain = counter - $(event.target).val().length
    $("output.counter").html(charRemain);
    if (charRemain < 0) {
      $("output.counter").addClass("negativeCount");
    } if (charRemain > 0) {
      $("output.counter").removeClass("negativeCount");
    }
  })

  $(".container").on("mouseover", () => {
    console.log("*****")
    $(".userId").removeClass("userIdTag")
  })

  $(".container").on("mouseout", () => {
    $(".userId").addClass("userIdTag")
  })
});