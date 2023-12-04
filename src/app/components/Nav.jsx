"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchedProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchedProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className=" flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="my logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">NextAuth Practice</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                className="rounded-full"
                alt="profile"
                src={
                  session?.user.image
                    ? session?.user.image
                    : "/assets/images/logo.jpg"
                }
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers)
                .filter((provider) => provider.id !== "credentials")
                .map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    {provider.id}
                  </button>
                ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              className="rounded-full"
              alt="profile"
              src={
                session?.user.image
                  ? session?.user.image
                  : "/assets/images/logo.jpg"
              }
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers)
                .filter((provider) => provider.id !== "credentials")
                .map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    {provider.id}
                  </button>
                ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
