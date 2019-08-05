const maxHits = 10;

let nthBoxToHit = 0;
let hits = 0;
let missed = 0;
let firstHitTime = 0;
let divSelector;

function showGreenBox() {
  
  $(".game-field").removeClass('target').text("");

  divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(".target").text(nthBoxToHit);
  if (nthBoxToHit === 1) {
    firstHitTime = getTimestamp();
  }
  nthBoxToHit ++;
}

function handleClick(event) {
   
   if (nthBoxToHit == 0) {
    return null;
   }
  $(".game-field").removeClass('miss');
  if ($(event.target).hasClass("target")) {
    hits ++;
  }

  else {
    $(event.target).addClass("miss");
    missed ++;
  }

  if (hits === maxHits) {
    endGame();
  }
  else {
    showGreenBox();
  }
}

function endGame() {
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#error-number").text(missed);
  $("#attempts").text(nthBoxToHit-1);
  $("#win-message").removeClass("d-none");
}

function init() {
  $("#button-reload").click(function() {

    $("#win-message").addClass("d-none");
    nthBoxToHit = 1;
    hits = 0;
    missed = 0;
    $("div.game-field").show();
    showGreenBox();
    });

  $(".game-field").click(handleClick);
}

$(document).ready(init);
