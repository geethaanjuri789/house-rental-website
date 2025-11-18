// Get house data from URL parameters
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const location = params.get('location');
const price = params.get('price');
const image = params.get('image');

const container = document.getElementById('house-details');
if(container) {
    container.innerHTML = `
        <img src="${image}" alt="${name}" style="width:100%; border-radius:10px; margin-bottom:15px;">
        <h2>${name}</h2>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Price:</strong> $${price}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod, nibh at vehicula lacinia, erat mi facilisis justo, sed tristique magna neque in libero.</p>


        <div class="gallery">
            <img src="${image}" alt="Gallery Image 1">
            <img src="https://picsum.photos/300/200?random=6" alt="Gallery Image 2">
            <img src="https://picsum.photos/300/200?random=7" alt="Gallery Image 3">
        </div>
        <button id="contact-btn" style="padding:10px 20px; background-color:#2c3e50; color:white; border:none; border-radius:5px; cursor:pointer; margin-top:15px;">
            Contact Owner
        </button>
        <p id="contact-msg" style="margin-top:10px;"></p>
    `;

 // Gallery click functionality
    document.querySelectorAll('.gallery img').forEach(img => {
        img.addEventListener('click', e => {
            document.getElementById('main-image').src = e.target.src;
        });
    });

    // Contact button functionality (just a demo message)
    document.getElementById('contact-btn').addEventListener('click', () => {
        document.getElementById('contact-msg').innerText = "Thank you! The owner will contact you soon.";
    });
}
