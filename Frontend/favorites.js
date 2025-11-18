const container = document.getElementById('favorites-list');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

favorites.forEach(house => {
    const div = document.createElement('div');
    div.style.width = '250px';
    div.style.border = '1px solid #ddd';
    div.style.borderRadius = '10px';
    div.style.overflow = 'hidden';
    div.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

    div.innerHTML = `
        <img src="${house.image}" alt="${house.name}" style="width:100%; height:150px; object-fit:cover;">
        <div style="padding:10px;">
            <h3>${house.name}</h3>
            <p>Location: ${house.location}</p>
            <p>Price: $${house.price}</p>
        </div>
    `;
    container.appendChild(div);
});
