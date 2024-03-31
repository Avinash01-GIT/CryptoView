// https://api.coingecko.com/api/v3/search/trending
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr

async function windowLoaded() {
  try {
    const response1 = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr");
    const data1 = await response1.json();
    const conversionRate = data1.bitcoin.inr;
    
    const response2 = await fetch("https://api.coingecko.com/api/v3/search/trending");
    const data2 = await response2.json();
    
    rander(data2, conversionRate);
  } catch (error) {
    console.error("Error:", error);
  }
}

function rander(coinData, conversionRate) {
  for (let i = 0; i < coinData.coins.length; i++) {
    const singleCoin = coinData.coins[i].item;
    const logo = singleCoin.thumb;
    const name = `${singleCoin.name} (${singleCoin.symbol})`;
    const price = Math.round(singleCoin.price_btc * conversionRate * 10000) / 10000;
    insertCryptoCard(logo, name, price);
  }
}

function insertCryptoCard(thumb, name, price) {
  const price_para = document.createElement('p');
  price_para.innerText = `₹ ${price}`;

  const name_head = document.createElement('h1');
  name_head.innerText = name;

  const right_container = document.createElement('div');
  right_container.classList.add('f-left');
  right_container.appendChild(name_head);
  right_container.appendChild(price_para);

  const image_elem = document.createElement('img');
  image_elem.src = thumb;
  image_elem.classList.add('f-left', 'card-image');
  image_elem.alt = "Coin Image";

  const card_conatiner = document.createElement('div');
  card_conatiner.classList.add('flex-item-small', 'card');
  card_conatiner.appendChild(image_elem);
  card_conatiner.appendChild(right_container);

  document.getElementById('coins_container').appendChild(card_conatiner);
}

window.onload = function () {
  windowLoaded();
};


