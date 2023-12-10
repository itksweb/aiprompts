"use client";
import { useState, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { api } from "../lib/libs";

export default function AuthForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useLayoutEffect(() => {
    pathname === "/register" ? setIsLogin(false) : setIsLogin(true);
  }, [pathname]);

  const loginUser = async (payload) => {
    signIn("credentials", { ...payload, redirect: false })
      .then(() => router.replace("/dashboard"))
      .catch((e) => alert(e.message));
  };
  const signUpUser = async (payload) => {
    const reqOpt = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${api}/register`, reqOpt)
      .then((res) => res.json())
      .then((user) => console.log(user));

    setData({
      name: "",
      email: "",
      password: "",
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    const payload = isLogin ? { email, password } : { name, email, password };
    isLogin ? loginUser(payload) : signUpUser(payload);
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            alt="Your company"
            src="/assets/images/logo.svg"
            width={37}
            height={37}
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isLogin ? "Sign in to your account" : "Create an account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {isLogin ? "Sign in" : "Create your account"}
              </button>
            </div>
          </form>

          <Link href={isLogin ? "/register" : "/login"}>
            <p className="mt-10 text-center text-sm text-gray-500">
              {isLogin ? "Not a member?" : "Already have an account?"}
              <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                {isLogin ? "Register here; it's free." : "Login"}
              </span>
            </p>
          </Link>

          <div>
            <button className="" onClick={() => signIn("github")}>
              Github
            </button>
          </div>
          <div>
            <button className="" onClick={() => signIn("google")}>
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
