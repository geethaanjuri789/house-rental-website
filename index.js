// Sample house data
let housesData = [
    {name: "Cozy Apartment", location: "New York", price: 1200, image: "https://picsum.photos/300/200?random=1"},
    {name: "Modern Villa", location: "Los Angeles", price: 2500, image: "https://picsum.photos/300/200?random=2"},
    {name: "Beach House", location: "Miami", price: 3000, image: "https://picsum.photos/300/200?random=3"},
    {name: "Urban Flat", location: "Chicago", price: 1800, image: "https://picsum.photos/300/200?random=4"},
    {name: "Country House", location: "Austin", price: 2200, image: "https://picsum.photos/300/200?random=5"}
];

// Function to display houses
function displayHouses(data) {
    const container = document.getElementById('house-list');
    if(!container) return;
    container.innerHTML = '';

    data.forEach(house => {
        const div = document.createElement('div');
        div.classList.add('house-card');
        div.innerHTML = `
            <img src="${house.image}" alt="${house.name}">
            <div class="info">
                <h3>${house.name}</h3>
                <p>Location: ${house.location}</p>
                <p>Price: $${house.price}</p>
                <button class="view-details" 
                    data-name="${house.name}" 
                    data-location="${house.location}" 
                    data-price="${house.price}" 
                    data-image="${house.image}">
                    View Details
                </button>
                <button class="favorite-btn" 
                    data-name="${house.name}" 
                    data-location="${house.location}" 
                    data-price="${house.price}" 
                    data-image="${house.image}">
                    ❤️ Favorite
                </button>
            </div>
        `;
        container.appendChild(div);

        // View Details click
        div.querySelector('.view-details').addEventListener('click', (e) => {
            const btn = e.target;
            const name = encodeURIComponent(btn.dataset.name);
            const location = encodeURIComponent(btn.dataset.location);
            const price = encodeURIComponent(btn.dataset.price);
            const image = encodeURIComponent(btn.dataset.image);

            window.location.href = `details.html?name=${name}&location=${location}&price=${price}&image=${image}`;
        });

        // Favorite button click
        div.querySelector('.favorite-btn').addEventListener('click', (e) => {
            const btn = e.target;
            const house = {
                name: btn.dataset.name,
                location: btn.dataset.location,
                price: btn.dataset.price,
                image: btn.dataset.image
            };

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const exists = favorites.find(h => h.name === house.name && h.location === house.location);
            if (!exists) {
                favorites.push(house);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert(`${house.name} added to favorites!`);
            } else {
                alert(`${house.name} is already in favorites.`);
            }
        });
    });
}

// Initial display
displayHouses(housesData);

// Filter/Search functionality
document.getElementById('filter-btn')?.addEventListener('click', () => {
    const location = document.getElementById('search-location')?.value.toLowerCase() || '';
    const minPrice = Number(document.getElementById('min-price')?.value) || 0;
    const maxPrice = Number(document.getElementById('max-price')?.value) || Infinity;

    const filtered = housesData.filter(house => 
        house.location.toLowerCase().includes(location) &&
        house.price >= minPrice &&
        house.price <= maxPrice
    );

    displayHouses(filtered);
});
