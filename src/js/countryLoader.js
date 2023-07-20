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
  const countryInfoDiv = document.getElementById('countryInfo');

  if (!countrySelect) {
      console.error('Country select element not found.');
      return;
  }

  const selectedCountry = countrySelect.value;
  if (selectedCountry) {
      try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          const data = await response.json();

          const country = data.find(country => country.name.common === selectedCountry);

          if (country) {
              const { name, capital } = country;
              countryInfoDiv.innerHTML = `
                  <p>Country: ${name.common}</p>
                  <p>Capital: ${capital[0]}</p>
              `;
          } else {
              console.error('Selected country not found.');
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
}