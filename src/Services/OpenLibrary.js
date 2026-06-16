const BASE_URL = "https://openlibrary.org/search.json";
const subject_URL = "https://openlibrary.org/subjects/";

export async function fetchRecommendedBooks() {
  try {
    const response = await fetch(`${BASE_URL}?q=bestseller&limit=50`);
    console.log(response.status);
    const data = await response.json();
    console.log(data.docs);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status:${response.status}`);
    }
    return data.docs;
  } catch (err) {
    console.error("Error fetching books:", err.message);
    return [];
  }
}

export async function getBooksBySubject(subject, offset = 0){
  try {
    const response = await fetch(`${subject_URL}${encodeURIComponent(subject)}.json?limit=20&offset=${offset}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP failed! Status:${response.status}`);
    }
    return data.works || [];
  }
  catch (err) {
    console.error("Error fetching books:", err.message);
    return [];
  }
}
export async function searchBooks(query) {
  try {
    const response = await fetch(`${BASE_URL}?q=${query.trim()}&limit=10`);
    const data = await response.json();
    console.log("search results:", data.docs);
    return data.docs;
  } catch (err) {
    console.error("Error searching books:", err.message);
    return [];
  }
}
