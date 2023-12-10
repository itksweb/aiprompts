"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PromptForm from "@src/app/components/PromptForm";
import { api } from "@src/app/lib/libs";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tag: "",
    prompt: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${api}/prompt/${promptId}`);
      const data = await res.json();
      console.log(data);
      setPost(data);
    };
    if (promptId) fetchPost();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    console.log(post);
    setSubmitting(true);
    try {
      const res = await fetch(`${api}/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        console.log(res);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PromptForm
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        setSubmitting={setSubmitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default UpdatePrompt;
