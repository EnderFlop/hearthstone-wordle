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
  // get all cards from hearthstoneapi, then pick and random card.
  // get that card's art and voice line from the wiki
  // present user with all of a random card's attributes hidden under buttons
  // add game loop, reset for new random card, add give up button, etc
  // fine tune point values
  // make look good

  //https://develop.battle.net/documentation/guides/getting-started
  //https://develop.battle.net/documentation/hearthstone/game-data-apis

  // code here

  class Card {
    constructor(name, cardType, manaCost, attack, health, rarity, cardClass, set, flavorText, keywords, spellSchool, durability, armor) {
      this.name = name
      this.cardType = cardType
      this.manaCost = manaCost
      this.attack = attack //minion
      this.health = health //minion, hero card, location
      this.rarity = rarity
      this.cardClass = cardClass
      this.set = set
      this.flavorText = flavorText
      this.keywords = keywords
      this.spellSchool = spellSchool //spell
      this.durability = durability //weapon
      this.armor = armor //hero card
    }
  }

  fetch("https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json")
  .then(res => res.json())
  .then(data => {
    console.log(data)

    let cards = []
    data.forEach(element => {
      cards.push(new Card(
        element.name,
        element.type,
        element.cost,
        element.attack,
        element.health,
        element.rarity,
        element.cardClass,
        element.set,
        element.flavor,
        element.mechanics,
        element.spellSchool,
        element.durability,
        element.armor
      ))
    });
    console.log(cards)
  })

  

})