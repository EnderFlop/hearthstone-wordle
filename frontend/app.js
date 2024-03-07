document.addEventListener('DOMContentLoaded', () => {

  // hearthstone wordle
  // player is presented with a bunch of buttons. each one reveals a different part of the card. obvjective is to pick the card name
  // buttons: mana cost, attack and health, rarity, class, set released, wild or standard, voice line, flavor text, keywords on the card, card art
  // could need different modes for different types of cards. spells dont have attack and health.
  // each one is weighted with a point value. more obvious clues give more points. goal is to have the least points. 
  //    (like mana cost gives 2 points because it is not obvious at all, while card art is 50 points cause it completely gives it away)
  // point system could be removed if it's too weird. maybe just reveal the card's attributes in order? 
  //    problem is the first guess will always be shitty, but if you can pick "voice line" first then you can win the game in one guess and feel smart.
  //
  // steps:
  // get database of all hearthstone cards. once per day or whatever. store somewhere and retrieve with other api.
  // remove other translations from api response
  // present user with all of a random card's attributes hidden under buttons
  // add game loop, reset for new random card, add give up button, etc
  // fine tune point values
  // make look good
  // GET get-cards.py PUSHING TO S3 once a day. change site to rely on s3 instead of rawgithubcontent

  //https://develop.battle.net/documentation/guides/getting-started
  //https://develop.battle.net/documentation/hearthstone/game-data-apis

  // code here

  class Card {
    constructor(name) {
      this.name = name
    }
  }

  fetch("https://koey8vhq3c.execute-api.us-east-2.amazonaws.com/hearthstone-wordle/get-cards", {method:'GET', headers:{'Content-Type': 'application/json'}})
  .then(res => res.json())
  .then(data => {
    console.log(data.body)
  })


})