var Tweet = function() {
  var $tweet = $('<div class="tweet"></div>');
  return $tweet;
};

Tweet.prototype.methodName = function() {

};




//need to use the this keyword and new keyword when making new instances of the class

var generateTimeline = function(user) {
  $('.twiddlerFeed').empty();
  for (var i = 0; i < streams.users[user].length; i++) {
    var tweet = streams.users[user][i];
    var $cloud = renderCloud(tweet);
    $cloud.appendTo('.twiddlerFeed').hide();
    $cloud.fadeTo(3000, 1);
  }
 }


var renderUser = function(user) {
  var $user = $(`<p class="user ${user}"></p>`)
  $user.text('@' + user)
  return $user;
};

var renderMessage = function(message) {
  var $message = $('<p class="message"></p>')
  $message.text(message);
  return $message;
};

var renderTime = function(created_at) {
  var $time = $('<span class="time"></span>')
  $time.livestamp(created_at)
  return $time;
};

var renderTweet = function($time, $message, user) {
  var $tweet = new Tweet;
  $tweet.addClass(user);
  $time.appendTo($tweet);
  $message.appendTo($tweet);
  return $tweet;
};

var renderCloud = function(tweet) {
  var $cloud = $('<div class="cloud"></div>');
  $cloud.html('<img class="birdTweet" src="images/usernameBird.png">');
  $cloud.addClass(tweet.user);

  var $user = renderUser(tweet.user);
  var $time = renderTime(tweet.created_at);
  var $message = renderMessage(tweet.message);
  var $tweet = renderTweet($time, $message);


  $user.appendTo($cloud);
  $tweet.appendTo($cloud);

  return $cloud;
};

$(document).ready(function(){
  var $body = $('body');

  var index = streams.home.length - 1;
  var twiddlerTweets = []

  while(index >= 0){
    var tweet = streams.home[index];
    var $cloud = renderCloud(tweet);
    $cloud.appendTo('.twiddlerFeed').hide();
    $cloud.fadeTo(3000, 1);
    index -= 1;
  }

  $('#twiddleInput').click(function() {
    $('.twiddle').animate({
      opacity: '100%'}, 1000)
  });


  $('#newThought').click(function(){
    var audio = $("#mysoundclip2")[0];
    audio.play();
    var tweet = {};
    if ($("#visitor").val() === '') {
      return;
    }
    if ($('#visitorMessage').val() === '') {
      return;
    }
    tweet.user = $("#visitor").val();
    tweet.message = $("#visitorMessage").val();
    tweet.created_at = new Date();
    var $cloud = renderCloud(tweet)
    $cloud.prependTo('.twiddlerFeed').hide();
    $cloud.fadeTo(3000, 1);
    $('.twiddle').animate({ opacity: '0%'}, 1000)
    document.getElementById('visitor').value='';
    document.getElementById('visitorMessage').value='';
    if (!streams.users.hasOwnProperty(tweet.user)) {
      streams.users[tweet.user] = [];
    }
    streams.users[tweet.user].push(tweet)
    streams.home.push(tweet);

    $('.user').on('click', function() {
      var user = this.textContent.slice(1);
      generateTimeline(user);
    })
  });

  $("#feed").click(function() {
    var audio = $("#mysoundclip")[0];
    audio.play();
    var tweet = {};
    tweet.user = randomElement(users);
    tweet.message = randomMessage();
    tweet.created_at = new Date();
    var $cloud = renderCloud(tweet)
    $cloud.prependTo('.twiddlerFeed').hide();
    $cloud.fadeTo(3000, 1);
    streams.home.push(tweet);
    $('.user').on('click', function() {
      var user = this.textContent.slice(1);
      generateTimeline(user);
    })
  })

  $('.home').click(function() {
    $('.twiddlerFeed').empty();
    for (var i = 0; i < streams.home.length; i++) {
      var tweet = streams.home[i];
      var $cloud = renderCloud(tweet);
      $cloud.prependTo('.twiddlerFeed').hide();
      $cloud.fadeTo(3000, 1);
      $('.user').on('click', function() {
        var user = this.textContent.slice(1);
        generateTimeline(user);
      })
    }
  })



  $('.user').on('click', function() {
    var user = this.textContent.slice(1);
    generateTimeline(user);
  })
})

