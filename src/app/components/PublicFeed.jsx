"use client";
import { useEffect, useState } from "react";
import Feed from "./Feed";

const PublicFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return <Feed posts={posts} />;
};

export default PublicFeed;
