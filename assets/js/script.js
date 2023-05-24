if (window.location.pathname == "/universe.html") {
    const BASE_URL = "https://krithika-marvel-api.vercel.app";
    // const BASE_URL = "http://127.0.0.1:3000";
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
            emailjs.init('tqAWXJdq654vqEETQ');
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

        emailjs.send("service_rmkmuho", "template_bfhxk6t", templateParams, "tqAWXJdq654vqEETQ")
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
        `https://gateway.marvel.com/v1/public/characters?${process.env.API_HASH}`;
    const characterContainer = document.getElementById('character-container');

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const characters = data.data.results;
            characters.forEach(character => {
                const name = character.name;
                const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

                const card = document.createElement('div');
                card.className = 'card blue d-flex col-sm-3 ms-auto';
                
                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-container';
                
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = name;
                image.className = 'image border-2';
                
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body ms-auto';
                
                const cardTitle = document.createElement('h5');
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