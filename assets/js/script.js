const BASE_URL = "https://krithika-marvel-api.vercel.app";
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
                option.selected = true; // Set "Vormir" as the default selected value
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
        planetInfoElement.textContent = data.info ? data.info : '';
    } catch (error) {
        console.log('Error:', error);
    }
}