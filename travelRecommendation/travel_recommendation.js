document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the travel_recommendation_api.json file
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Function to display recommendations based on keyword search
            function displayRecommendations(keyword) {
                // Clear previous search results
                const searchResultsSection = document.getElementById('search-results');
                searchResultsSection.innerHTML = '';

                // Convert keyword to lowercase
                keyword = keyword.toLowerCase();

                // Define variations of keywords
                const keywordVariations = {
                    'beach': 'beaches',
                    'temple': 'temples',
                    'country': 'countries'
                };

                // Check if the keyword has variations
                if (keywordVariations[keyword]) {
                    keyword = keywordVariations[keyword];
                }

                // Search for recommendations based on the keyword
                let recommendations;
                if (keyword === 'beaches') {
                    recommendations = data.beaches;
                } else if (keyword === 'temples') {
                    recommendations = data.temples;
                } else if (keyword === 'countries') {
                    // Flatten the structure to include cities
                    recommendations = data.countries.reduce((acc, country) => {
                        return acc.concat(country.cities);
                    }, []);
                } else {
                    // Invalid keyword
                    console.log('Invalid keyword');
                    return;
                }

                // Display recommendations
                recommendations.forEach(recommendation => {
                    const recommendationHTML = `
        <div class="flex justify-center items-center h-full">
            <div class="max-w-lg rounded overflow-hidden shadow-lg mx-2 my-4 bg-white">
                <img class="w-full" src="${recommendation.imageUrl}" alt="${recommendation.name}">
                <div class="px-6 py-4">
                    <div class="font-semibold text-2xl mb-2 text-gray-900">${recommendation.name}</div>
                    <p class="text-gray-700 text-base">${recommendation.description}</p>
                </div>
            </div>
        </div>
    `;
                    searchResultsSection.insertAdjacentHTML('beforeend', recommendationHTML);
                });

                // Scroll to the recommendation result section
                setTimeout(() => {
                    searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100); // Adjust the delay time as needed

            }

            // Event listener for the search button
            document.getElementById('search-button').addEventListener('click', function () {
                const keyword = document.getElementById('search-input').value;
                displayRecommendations(keyword);
            });

            // Event listener for the clear button
            document.getElementById('clear-button').addEventListener('click', function () {
                const searchResultsSection = document.getElementById('search-results');
                searchResultsSection.innerHTML = '';
                document.getElementById('search-input').value = '';
                // Scroll back to the home section
                document.getElementById('home').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
