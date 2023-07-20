export async function fetchCountryInfo() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Sort the countries alphabetically by their common name
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Populate the dropdown select with country names
        const countrySelect = document.getElementById('countrySelect');
        data.forEach(country => {
            const { name } = country;
            const option = document.createElement('option');
            option.value = name.common;
            option.textContent = name.common;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to fetch and display country information for the selected country
export async function fetchSelectedCountryInfo(day) {
    const countrySelect = document.querySelector(`.${day} .countrySelect`);
    if (!countrySelect) {
        console.error('Country select element not found.');
        return;
    }
    const selectedCountry = countrySelect.value;
    if (selectedCountry) {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
  
        // Find the selected country in the data
        const country = data.find(country => country.name.common === selectedCountry);
  
        if (country) {
          const { name, timezones, flags, region, capital, currencies } = country;
          const currencyCode = currencies ? Object.keys(currencies)[0] : 'N/A';
          const currencyName = currencies ? currencies[currencyCode].name : 'N/A';
  
          // Update the form fields with the selected country's information
          const countryInfoDiv = document.querySelector(`.${day} .country-info`);
          countryInfoDiv.innerHTML = `
            <img class="flag" src="${flags.png}" alt="${name.common} flag">
            <h2 class="country">${name.common}</h2>
            <p>Timezone: ${timezones.join(', ')}</p>
            <p>Region: ${region}</p>
            <p>Capital: ${capital}</p>
            <p>Currency: ${currencyName} (${currencyCode})</p>
            <hr>
          `;
        } else {
          console.error('Selected country not found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

// Fetch country information and populate the dropdown when the page loads
fetchCountryInfo();