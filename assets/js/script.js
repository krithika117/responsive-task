const BASE_URL = "https://krithika-marvel-api.vercel.app";
// const BASE_URL = "http://127.0.0.1:3000"
const API_HASH = "ts=1&apikey=2c764864c5c72c7f6bf98584d2969e45&hash=91d69e2b93b176b0c9fb00841c1f805b";
const EMAIL_JS_KEY = "tqAWXJdq654vqEETQ";


if (window.location.pathname == "/universe.html") {

    const dropdown = document.getElementById('planet-dropdown');
    const planetNameElement = document.getElementById('planet-name');
    const planetInfoElement = document.getElementById('planet-info');
    const planetContainer = document.getElementById('planet-container');

    fetch(BASE_URL + '/planets')
        .then(response => response.json())
        .then(data => {
            data.forEach(planet => {
                const option = document.createElement('option');
                option.value = planet.name;
                option.textContent = planet.name;
                if (planet.name === 'Vormir') {
                    option.selected = true;
                    displayPlanetInfo('Vormir');
                }
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.log('Error:', error);
        });

    document.getElementById('planet-dropdown').addEventListener('change', (e) => {
        const selectedPlanet = e.target.value;
        displayPlanetInfo(selectedPlanet);
    });

    async function displayPlanetInfo(selectedPlanet) {
        try {
            const response = await fetch(`${BASE_URL}/planets/${selectedPlanet}`);
            const data = await response.json();

            planetContainer.className = 'planet ' + selectedPlanet.toLowerCase();
            planetNameElement.textContent = data.stone ? `${selectedPlanet} ${data.stone}` : selectedPlanet;
            planetContainer.style.boxShadow = data.boxShadow;
            planetContainer.style.backgroundImage = `url(${BASE_URL + "/" + data.backgroundImage})`;
            console.log(BASE_URL + "/" + data.backgroundImage)

            let info = '';
            if (data.stone) {
                info = `${data.stone}`;
                if (data.distance) {
                    info += ` and Thanos is ${data.distance} ⚠️`;
                } else {
                    info += ` but Thanos is not a threat`;
                }
            } else {
                info = 'No additional information available.';
            }

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body p-3';
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = selectedPlanet;
            const cardText = document.createElement('p');
            cardText.className = 'card-text';
            cardText.textContent = info;

            const card = document.createElement('div');
            card.className = 'card blue';
            card.appendChild(cardBody);

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            const cardContainer = document.querySelector('#planet-info');
            cardContainer.innerHTML = '';
            if (data.distance) {
                cardText.classList.add('blinking');
                const notifyButton = document.createElement('button');
                notifyButton.textContent = 'Notify Forces';
                notifyButton.className = "btn btn-secondary bg-danger";
                notifyButton.addEventListener('click', () => {
                    sendEmail(selectedPlanet, data);
                });

                cardBody.append(notifyButton);
            }
            cardContainer.appendChild(card);

        } catch (error) {
            console.log('Error:', error);
        }
    }

    async function sendEmail(selectedPlanet, data) {
        (function () {
            emailjs.init(EMAIL_JS_KEY);
        })();

        const templateParams = {
            to_name: "krithika.23it@licet.ac.in",
            planet: selectedPlanet,
            stone: data.stone,
        };

        const notifyButton = document.querySelector('.btn.bg-danger');
        notifyButton.textContent = 'Deployed Forces';
        notifyButton.className = 'btn bg-success'
        notifyButton.disabled = true;

        emailjs.send("service_rmkmuho", "template_bfhxk6t", templateParams, EMAIL_JS_KEY)
            .then(function (response) {
                console.log('Email sent:', response.status, response.text);
            }, function (error) {
                console.log('Error:', error);
                notifyButton.textContent = 'Notify Forces';
                notifyButton.disabled = false;
            });
    }
}
if (window.location.pathname == "/team.html") {
    const apiURL =
        `https://gateway.marvel.com/v1/public/comics/32477/characters?${API_HASH}&limit=100`;
    const characterContainer = document.getElementById('character-container');

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const characters = data.data.results;
            characters.forEach(character => {
                const name = character.name;
                const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

                const card = document.createElement('div');
                card.className = 'blue d-flex col-sm-3 m-1 align-items-center justify-content-center';

                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-container';

                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = name;
                image.className = 'image-1 border-2';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body ms-auto p-1';

                const cardTitle = document.createElement('h6');
                cardTitle.className = 'card-title';
                cardTitle.textContent = name;

                imageContainer.appendChild(image);
                cardBody.appendChild(cardTitle);

                card.appendChild(imageContainer);
                card.appendChild(cardBody);

                characterContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.log('Error:', error);
        });
}