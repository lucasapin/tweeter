/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    for (let i = tweets.length - 1; i >= 0; i--) {
      createTweetElement(tweets[i]);
    }
  }

  const createTweetElement = function (tweetData) {
    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const $tweet = `<article class="tweet">
    <div class="divContainer">
    <header class="headerBox">
    <div class="tweetUsername">
  <img src="${tweetData.user.avatars}">
  <p>${escape(tweetData.user.name)}</p>
  </div>
  <span class="userId userIdTag">${escape(tweetData.user.handle)}</span>
  </header>
  <section class="tweetContent">
  <p class="body">${escape(tweetData.content.text)}</p>
  </section>
  <footer class="footerBox">
  <p>${tweetData.created_at}</p>
  <div class="icons">
  <i class="fas fa-flag" style="font-size:12px"></i>
  <i class="fas fa-retweet" style="font-size:12px"></i>
  <i class="fas fa-heart" style="font-size:12px"></i>
  </div>
  </footer>
  </div>
  </article>`

    $('#tweets-container').append($tweet);
    // return $($tweet)
  }

  const handleSubmit = function (event) {
    event.preventDefault();
    if ($("textarea").val().length > 140) {
      if ($(".error-message").first().is(":hidden")) {
        $(".error-message").slideDown("slow");
      } else {
        $(".error-message").empty().append("\rTweet Over 140 Characters").hide();
      }
      throw new Error
    } else if ($("textarea").val().length === 0) {
      if ($(".error-message").first().is(":hidden")) {
        $(".error-message").slideDown("slow");
      } else {
        $(".error-message").empty().append("\rYou cannot post an empty tweet!").hide();
      }
    }
    else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      })
        .then(function () {
          $(".error-message").hide();
          $("form").children("textarea").val('')
          loadTweets();
        });
    }
  }


  $("form").on("submit", handleSubmit);
  // renderTweets(data);

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then(function (res) {
        // console.log(res);
        renderTweets(res)
      });
  }
  loadTweets();
})
