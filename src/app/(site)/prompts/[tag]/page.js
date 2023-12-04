"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PromptByTag = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptTag = searchParams.get("tag");

  useEffect(() => {
    const fetchPromptsByTag = async () => {
      try {
        const res = await fetch(`/api/prompts/${promptTag}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    };
    if (promptTag) fetchPromptsByTag();
  }, [promptTag]);

  return (
    <section className="feed">
      <h1 className="ki">Hello</h1>
      <div className="mt-16 prompt_layout">
        {posts.map((post) => (
          <PromptCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PromptByTag;
