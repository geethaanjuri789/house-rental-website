// -----------------------------
// 1️⃣ Homepage – House Data & Display
// -----------------------------
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
            </div>
        `;
        container.appendChild(div);

        // Add click listener for the View Details button
        div.querySelector('.view-details').addEventListener('click', (e) => {
            const btn = e.target;
            const name = encodeURIComponent(btn.dataset.name);
            const location = encodeURIComponent(btn.dataset.location);
            const price = encodeURIComponent(btn.dataset.price);
            const image = encodeURIComponent(btn.dataset.image);

            window.location.href = `details.html?name=${name}&location=${location}&price=${price}&image=${image}`;
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

// -----------------------------
// 2️⃣ Register Page – Submit Form
// -----------------------------
// script.js
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const phone = document.querySelector("#phone").value.trim();

  const statusMsg = document.querySelector("#status");
  statusMsg.textContent = "Registering...";

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    const data = await response.json();

    if (response.ok) {
      statusMsg.textContent = "✅ Registration successful!";
      document.querySelector("form").reset();
    } else {
      statusMsg.textContent = "❌ " + (data.message || "Error registering user.");
    }
  } catch (err) {
    statusMsg.textContent = "⚠️ Could not connect to server.";
  }
});

// -----------------------------
// 3️⃣ Add House Page – Submit Form
// -----------------------------
if (document.getElementById('add-house-form')) {
    const form = document.getElementById('add-house-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = {
            name: document.getElementById('house-name').value,
            location: document.getElementById('house-location').value,
            price: document.getElementById('house-price').value,
            image: document.getElementById('house-image').value || "https://picsum.photos/300/200?random=5"
        };

        fetch('https://your-backend-url.com/houses', { // Replace with your backend
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(resp => {
            document.getElementById('house-msg').innerText = 'House added successfully!';
            form.reset();
        })
        .catch(err => {
            document.getElementById('house-msg').innerText = 'Error adding house.';
            console.error(err);
        });
    });
}
