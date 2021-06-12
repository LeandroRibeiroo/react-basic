import "./styles.css";
import { useEffect, useState } from "react";
import { loadPosts } from "../../components/utilities/loadPosts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  useEffect(() => {
    handleLoadPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadPosts = async () => {
    const photosAndPosts = await loadPosts();

    setPosts(photosAndPosts.slice(page, postsPerPage));
    setAllPosts(photosAndPosts);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  return (
    <section className="container">
      <div className="search-container">
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && (<Posts posts={filteredPosts} />)}
      {filteredPosts.length === 0 && (
        <p>Nothing was found in our database.</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
