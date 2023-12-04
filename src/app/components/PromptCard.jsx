"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleDelete, handleEdit, handleTagClick }) => {
  const [copied, setCopied] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // const handleEdit = (post) => {
  //   router.push(`/update-prompt?id=${post.id}`);
  // };
  // const handleDelete = (post) => {
  //   const hasConfirmed = confirm(
  //     "Are you sure you want to delete this prompt?"
  //   );
  //   if (hasConfirmed) {
  //     fetch(`/api/prompt/${post.id}`, {
  //       method: "DELETE",
  //     }).catch((err) => console.log(err));
  //     const remainingPosts = posts.filter((p) => p.id !== post.id);
  //     setPosts(remainingPosts);
  //   }
  // };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="">
          <Image
            src={post.user.image ? post.user.image : "/assets/images/logo.jpg"}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.user.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.user.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            width={12}
            height={12}
            alt="copy_prompt"
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={() => {
          handleTagClick(post.tag);
        }}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>
      {session?.user.id === post.userId && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            onClick={() => {
              handleEdit(post);
            }}
            className="font-inter text-sm green_gradient cursor-pointer"
          >
            edit
          </p>
          <p
            onClick={() => {
              handleDelete(post.id);
            }}
            className="font-inter text-sm green_gradient cursor-pointer"
          >
            delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
