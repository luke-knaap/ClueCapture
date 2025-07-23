const gameBoard = document.getElementById("gameBoard") as HTMLElement;
const objectBaseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const cardImageMap = new Map<number, string>();

export function getGameCatagory() {
  return "standard game";
}

export function getCardImageMap() {
  return cardImageMap;
}

export function getImageUrlByIndex(index: number): string | undefined {
  return cardImageMap.get(index);
}

// Define the query options
const queryOptions = [
  "American Decorative Arts",
  "Ancient Near Eastern Art",
  "Arms and Armor",
  "Arts of Africa, Oceania, and the Americas",
  "Asian Art",
  "Costume Institute",
  "Drawings and Prints",
  "Egyptian Art",
  "European Paintings",
  "European Sculpture and Decorative Arts",
  "Greek and Roman Art",
  "Islamic Art",
  "Medieval Art",
  "Modern and Contemporary Art",
  "Musical Instruments",
  "Robert Lehman Collection",
  "Photographs",
  "The American Wing",
];

const metAPI = {
  searchUrl: (query: string) =>
    `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=${query}`,
  objectUrl: (id: string) =>
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
  extractImages: (data: any) => ({ imageUrl: data.primaryImageSmall, title: data.title }),
};

const picsumAPI = {
  searchUrl: (id: string) => `https://picsum.photos/v2/list?page=${id}&limit=16`,
  extractImages: (data: any) => ({ imageUrl: data.download_url, title: data.author }),
};

const selectedApi = localStorage.getItem("selectedApi") || "met";

export async function fetchGameCardsFromApi() {
  const cards = gameBoard.querySelectorAll(".card-image");
  cards.forEach((card) => (card.innerHTML = "")); // Clear board
  const objectQuary = "stone";
  try {
    let searchUrl: string;
    let extractImages: (data: any) => { imageUrl: string; title: string };

    if (selectedApi === "picsum") {
      const randomPage = Math.floor(Math.random() * 50) + 1; // Random page ID
      searchUrl = picsumAPI.searchUrl(randomPage.toString());
      extractImages = picsumAPI.extractImages;
    } else {
      searchUrl = metAPI.searchUrl(objectQuary);
      extractImages = metAPI.extractImages;
    }

    const response = await fetch(searchUrl);
    const searchData = await response.json();

    // Debugging log
    console.log(`API Response from ${selectedApi}:`, searchData);

    let imageObjects: any[] = [];

    if (selectedApi === "picsum") {
      // Directe lijst van afbeeldingen uit Picsum
      if (!Array.isArray(searchData)) {
        throw new Error("Invalid data format from Picsum API");
      }
      imageObjects = searchData;
    } else {
      // Met API: haal object-IDs op en fetch details
      const allObjectIDs = searchData.objectIDs;
      if (!Array.isArray(allObjectIDs) || allObjectIDs.length === 0) {
        throw new Error("No valid objects found in Met API response");
      }

      const shuffledObjectIDs = allObjectIDs.sort(() => Math.random() - 0.5).slice(0, 50);
      const objectDetailsPromises = shuffledObjectIDs.map(async (id: any) => {
        const response = await fetch(metAPI.objectUrl(id));
        return response.ok ? response.json() : null;
      });

      const objectDetails = await Promise.all(objectDetailsPromises);
      imageObjects = objectDetails.filter((data) => {
        const { imageUrl } = extractImages(data);
        return !!imageUrl; // Houd alleen objecten met een geldige afbeelding
      });
    }

    if (imageObjects.length < 16) {
      console.warn(`Only found ${imageObjects.length} valid images. Retrying...`);
      return fetchGameCardsFromApi();
    }

    // Preload alle afbeeldingen
    type PreloadedImage = {
      img: HTMLImageElement;
      object: { imageUrl: string; title?: string };
    };

    const preloadedImages: PreloadedImage[] = await Promise.all(
      imageObjects.map(
        (object) =>
          new Promise<PreloadedImage>((resolve, reject) => {
            const { imageUrl, title } = extractImages(object);
            const img = new Image();
            img.src = imageUrl;
            img.alt = title || "Image";

            img.onload = () => resolve({ img, object: { imageUrl, title } });
            img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
          })
      )
    );

    // Plaats de afbeeldingen op de kaarten
    preloadedImages.forEach(({ img, object }, index) => {
      const card = cards[index];

      card.appendChild(img);
      cardImageMap.set(index, object.imageUrl);
    });
  } catch (error) {
    console.error("Error fetching game cards:", error);
  } finally {
    cardImageMap.forEach((url, index) => {
      console.log(`Card Index: ${index + 1}, Image URL: ${url}`);
    });
  }
}
