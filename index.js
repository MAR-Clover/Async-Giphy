
const API_KEY = 'AXkzYzb55gG0vDBwzHptp7yDoKwXGB9j'; 

async function getImage(query) {
    try {
        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const imageURL = data.data.map((gif) => gif.images.original.url);
        return imageURL;

    } catch (err) {
        console.log("Error occurred:", err);
        return [];
    }
}

async function displayImages() {
    const imageContainer = document.getElementById("image-container");
    const query = document.getElementById("query").value;
    const imgArr = await getImage(query);
    

    // Clear previous images
    imageContainer.innerHTML = '';

    if (imgArr.length === 0) {
        imageContainer.innerHTML = '<p>No images found.</p>';
        return;
    }

    imgArr.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'GIF image';
        img.style.width = '200px';
        img.style.margin = '5px';

        imageContainer.appendChild(img);
    });
}

document.getElementById('load-images').addEventListener('click', displayImages);
