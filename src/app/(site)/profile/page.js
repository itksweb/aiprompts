"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@src/app/components/Profile";
import { api } from "@src/app/lib/libs";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await fetch(`${api}/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user) fetchUserPosts();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      posts={posts}
      setPosts={setPosts}
    />
  );
};

export default ProfilePage;
