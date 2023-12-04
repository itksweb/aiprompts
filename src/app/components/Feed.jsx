"use client";
import { useState } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const Feed = ({ posts, setPosts }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  let filtered = posts.filter(
    (post) =>
      post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      post.tag.toLowerCase() == searchText.toLowerCase()
  );

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post.id}`);
  };

  const handleDelete = (postId) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      fetch(`/api/prompt/${postId}`, {
        method: "DELETE",
      }).catch((err) => console.log(err));
      const remainingPosts = posts.filter((p) => p.id !== postId);
      setPosts(remainingPosts);
    }
  };

  const handleTagClick = (tag) => {
    //router.push(`/prompts/${tag.replace("#", "")}`);
    setSearchText(tag.replace("#", ""));
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="feed">
      <form onSubmit={handleSubmit} className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          value={searchText}
          required
          placeholder="Search for a tag or username"
          onChange={handleSearchChange}
        />
      </form>
      <div className="mt-16 prompt_layout">
        {filtered.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            setSearchText={setSearchText}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;
