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
})

function displayCard(cards){
  let randomCard = cards[Math.floor(Math.random() * cards.length)]
  console.log(randomCard)
  if (randomCard.cardType == 'HERO') {
    displayCard(cards)
    return
  }

  let cardHeader = document.getElementById('card-header')
  cardHeader.innerHTML = '';

  let cardType = document.createElement('h1')
  cardType.innerText = randomCard.cardType + ":"
  cardHeader.appendChild(cardType)

  let cardName = document.createElement('h1');
  cardName.id = 'card-name';
  cardName.innerText = '?????';
  cardHeader.appendChild(cardName);

  let imgDiv = document.getElementById('img-div');
  imgDiv.innerHTML = '';

  let buttonsDiv = document.getElementById('buttons-div');
  buttonsDiv.innerHTML = '';    

  createButton("mana-cost", "Mana Cost", randomCard.manaCost, "../media/gem.png");
  createButton("attack", "Attack", randomCard.attack, "../media/attack.png");
  createButton("durability", "Durability", randomCard.durability);
  createButton("health", "Health", randomCard.health, "../media/health.png");
  createButton("armor", "Armor", randomCard.armor);
  createButton("spell-school", "Spell School", randomCard.spellSchool);
  createButton("rarity", "Rarity", randomCard.rarity);
  createButton("card-class", "Card Class", randomCard.cardClass);
  createButton("set", "Set", randomCard.set);
  createButton("flavor-text", "Flavor Text", randomCard.flavorText);
  createButton("keywords", "Keywords", randomCard.keywords);
  getCardArt(randomCard.id);
  //getCardVoice(randomCard.id, randomCard.set);
  
  let revealButton = document.createElement('button');
  revealButton.innerText = 'Reveal Card Name';
  revealButton.onclick = () => {
    cardName.innerText = randomCard.name;
  }
  buttonsDiv.appendChild(revealButton);

  let restartButton = document.createElement('button');
  restartButton.innerText = 'Restart';
  restartButton.onclick = () => {
    displayCard(cards);
  }
  buttonsDiv.appendChild(restartButton);

  function createButton(id, text, property, image) {
    if (property == undefined) {return}

    let button;
    
    if (image) {
      button = document.createElement('div');
      button.id = id;
      button.style.backgroundImage = `url(${image})`;
      button.onclick = () => {
        button.innerText = property;
      }
      buttonsDiv.appendChild(button);
    }

    else {
      button = document.createElement('button');
      button.id = id;
      button.innerText = text;
      button.onclick = () => {
        button.innerText = property;
      }
    }

    buttonsDiv.appendChild(button);
  }

  async function getCardArt(cardId) {
    const img = document.createElement('img');
    img.src = `https://art.hearthstonejson.com/v1/orig/${cardId}.png`;
    img.style.opacity = 0; // hide the image initially
    imgDiv.appendChild(img);

    const showImageButton = document.createElement('button');
    showImageButton.innerText = 'Show Card Art';
    showImageButton.onclick = () => {
      img.style.opacity = 100; // show the image when the button is pressed
    }
    buttonsDiv.appendChild(showImageButton);
  }

  async function getCardVoice(id) {
    fetch(`https://hearthstonesounds.s3.amazonaws.com/${id}_A.wav`, { mode: 'no-cors' })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }
}