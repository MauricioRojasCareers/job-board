import { type NextPage } from "next";

import { api } from "@/utils/api";
import { useState } from "react";
import { LoadingPage } from "@/components/LoadingSpinner";

const Home: NextPage = () => {
  const ctx = api.useContext();

  const [input, setInput] = useState("");

  const mutation = api.example.create.useMutation({
    onSuccess: () => {
      void ctx.example.getAll.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted!");
    console.log(input);
    setInput("");
    mutation.mutate({ content: input });
  };

  const { data: posts, isLoading: loadingPosts } =
    api.example.getAll.useQuery();

  if (loadingPosts) return <LoadingPage />;

  return (
    <div className="flex h-screen flex-col items-center gap-3 p-5">
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Enter something:"
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none"
        ></input>
        <button>Submit</button>
      </form>
      <ul className="flex h-20 flex-col">
        {posts?.map((post) => {
          return <li key={post.id}>{post.content}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
