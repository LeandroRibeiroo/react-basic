export const loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');
      
    const [ posts, photos ] = await Promise.all([postResponse, photoResponse]);
      
    const postJson = await posts.json();  
    const photosJson = await photos.json();

    const photosAndPosts = postJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url }
      });
      
    return photosAndPosts;
}