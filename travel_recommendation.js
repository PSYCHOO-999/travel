const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const searchInput = document.getElementById("search_input");
const searchResultsContainer = document.getElementById("search-results-container");

async function fetchData() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function showResults() {
    // Clear previous search results
    searchResultsContainer.innerHTML = "";

    let searchKeyword = searchInput.value.toLowerCase();
    const data = await fetchData();
    if (!data) return;

    let filteredResults = [];

    data.countries.forEach(country => {
        if (country.name.toLowerCase() === searchKeyword) {
            filteredResults.push(country);
        }
    });

    // Display filtered results
    if (filteredResults.length > 0) {
        filteredResults.forEach(country => {
            const li = document.createElement("li");
            li.classList.add("search-result-item");
            li.innerHTML = `
              <div class="parent-container">
                <img src="${country.imageUrl}" alt="${country.name}" class="show-img" width="500px" height="auto">
                <div class="under-section">
                  <h1>${country.name}</h1>
                  <p>${country.description}</p>
                  <button class="visit">Visit</button>
                </div>
              </div>
            `;
            searchResultsContainer.appendChild(li);
        });

        // Show the clear button after search
        btnClear.style.display = "inline-block";
    } else {
        // If no results found, display prompt with available countries
        let availableCountries = "Available countries:\n";
        data.countries.forEach(country => {
            availableCountries += "- " + country.name + "\n";
        });
        alert("Data for this country not found.\n\n" + availableCountries);
    }
}

function clearSearchResults() {
    searchResultsContainer.innerHTML = "";
    searchInput.value = "";
    btnClear.style.display = "none"; // Hide the clear button again
}

btnSearch.addEventListener("click", showResults);

btnClear.addEventListener("click", function() {
    clearSearchResults();
    alert.style.display = "none"; // Hide the alert when clear button is clicked
});

searchInput.addEventListener("input", function() {
    if (this.value.trim() === "") {
        clearSearchResults();
    }
});

// Modify clear button style
btnClear.style.backgroundColor = "red";
btnClear.style.color = "white";
btnClear.style.marginLeft = "10px";
