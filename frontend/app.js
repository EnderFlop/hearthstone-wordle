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

  // code here

  class Card {
    constructor(id, name, cardType, manaCost, attack, health, rarity, cardClass, set, flavorText, keywords, spellSchool, durability, armor) {
      this.id = id
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
        element.id,
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

    displayCard(cards)
  })

  function displayCard(cards){
    let randomCard = cards[Math.floor(Math.random() * cards.length)]

    let cardDiv = document.getElementById('card-div');
    cardDiv.innerHTML = '';

    let cardType = document.createElement('h1')
    cardType.innerText = randomCard.cardType
    cardDiv.appendChild(cardType)

    createButton("card-name", "Card Name", randomCard.name);
    createButton("mana-cost", "Mana Cost", randomCard.manaCost);
    createButton("attack", "Attack", randomCard.attack);
    createButton("health", "Health", randomCard.health);
    createButton("rarity", "Rarity", randomCard.rarity);
    createButton("card-class", "Card Class", randomCard.cardClass);
    createButton("set", "Set", randomCard.set);
    createButton("flavor-text", "Flavor Text", randomCard.flavorText);
    createButton("keywords", "Keywords", randomCard.keywords);
    createButton("spell-school", "Spell School", randomCard.spellSchool);
    createButton("durability", "Durability", randomCard.durability);
    createButton("armor", "Armor", randomCard.armor);
    createButton("card-art", "Card Art", getCardArt(randomCard.id));

    function createButton(id, text, property) {
      if (property == undefined) {return}
      let button = document.createElement('button');
      button.id = id;
      button.innerText = text;
      button.onclick = () => {
      button.innerText = property;
      }
      cardDiv.appendChild(button);
    }

    function getCardArt(cardId) {
      return fetch(`https://art.hearthstonejson.com/v1/orig/${cardId}.png`, { mode: 'no-cors' })
        .then(response => response.blob())
        .then(blob => {
          const imgUrl = URL.createObjectURL(blob);
          const img = document.createElement('img');
          img.src = imgUrl;
          return img;
        });
    }

  }

})