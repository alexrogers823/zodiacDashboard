const zodiacMain = document.querySelector('[data-current-sign]');
const zodiacElement = document.querySelector('[data-image]')
const zodiacDates = document.querySelector('[data-dates]');
const leftButton = document.querySelector('[data-prev]');
const rightButton = document.querySelector('[data-next]');
const lovetta = document.querySelector('[data-lovetta]');
const harry = document.querySelector('[data-harry]');
const celebrityHeader = document.querySelector('[data-celebrity-header]');
const celebrity = document.querySelector('[data-celebrity]');
const trueLoveQuestion = document.querySelector('[data-lover-question]');
const trueLoveResponse = document.querySelector('[data-lover-answer]');
const footer = document.querySelector('[data-footer]');

const elements = {
  "Water": "./images/water-symbol.jpg",
  "Earth": "./images/earth-symbol.png",
  "Fire": "./images/fire-symbol.jpg",
  "Air": "./images/air-symbol.png"
}

const signs = [
  {
    name: "Aries",
    image: ""
  },
  {
    name: "Taurus",
    image: ""
  },
  {
    name: "Gemini",
    image: ""
  },
  {
    name: "Cancer",
    image: ""
  },
  {
    name: "Leo",
    image: ""
  },
  {
    name: "Virgo",
    image: ""
  },
  {
    name: "Libra",
    image: ""
  },
  {
    name: "Scorpio",
    image: ""
  },
  {
    name: "Sagittarius",
    image: ""
  },
  {
    name: "Capricorn",
    image: ""
  },
  {
    name: "Aquarius",
    image: ""
  },
  {
    name: "Pisces",
    image: ""
  }
]
const data = [];
let index = 0;

fetch('http://my-little-cors-proxy.herokuapp.com/https://zodiacal.herokuapp.com/api')
    .then(blob => blob.json())
    .then(j => data.push(...j))
    .then(() => {
      updateStaticText(index);
      updateRandomText();
    });


// Sets text for current zodiac sign, not changed by setInterval
function updateStaticText() {
  const zodiac = data[index];
  zodiacMain.textContent = zodiac.name;
  zodiacElement.setAttribute("src", elements[zodiac.element]);
  zodiacDates.textContent = `${zodiac.sun_dates[0]} - ${zodiac.sun_dates[1]}`;
  leftButton.textContent = (index === 0) ? `< ${data[data.length-1].name}` : `< ${data[index-1].name}`;
  rightButton.textContent = (index === data.length-1) ? `${data[0].name} >` : `${data[index+1].name} >`;
  celebrityHeader.textContent = `The ${zodiac.name} Celebrity Club`;
  trueLoveQuestion.textContent = `Me: "Hey honey, what do you think of these ${zodiac.name} people?"`;
}

// Sets text for current zodiac sign, switched at random by setInterval
function updateRandomText() {
  const zodiac = data[index];
  lovetta.textContent = `"Ohhh I love me a ${zodiac.name}! They're so ${zodiac.good_traits[randomNumber(zodiac.good_traits.length)]}!"`;
  harry.textContent = `"${zodiac.name} people are so ${zodiac.bad_traits[randomNumber(zodiac.bad_traits.length)].toLowerCase()}! Ugh!"`;
  celebrity.textContent = zodiac.famous_people[randomNumber(zodiac.famous_people.length)];
  trueLoveResponse.textContent = `My True Love: "${zodiac.mental_traits[randomNumber(zodiac.mental_traits.length)].trim()}"`;

}

// Provides random number to use for random text (helper function)
function randomNumber(length) {
  return Math.floor(Math.random()*length);
}

// Creates a button in the footer (helper function)
function generateButton(sign) {
  const smallButton = document.createElement('button');
  smallButton.textContent = sign;
  smallButton.classList.add("all-signs");
  // console.log(smallButton);
  footer.appendChild(smallButton);
  return smallButton;
  // console.log(footer);
}

// Adds correct sign to event listener (helper function)
function jumpToSign(sign) {
  index = signs.indexOf(sign);
  updateStaticText();
  updateRandomText();
}


//===== Event listeners =====
leftButton.addEventListener("click", () => {
  index = (index === 0) ? data.length-1 : index-1;
  updateStaticText();
  updateRandomText();
});

rightButton.addEventListener("click", () => {
  index = (index === data.length-1) ? 0 : index+1;
  updateStaticText();
  updateRandomText();
});

// forEach will create all twelve buttons in footer, with event listeners
signs.forEach(sign => {
  const newButton = generateButton(sign.name);
  newButton.addEventListener("click", () => jumpToSign(sign));
});
