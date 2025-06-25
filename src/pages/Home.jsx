import React, { useEffect, useState } from "react";
import appWriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appWriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="text-center text-gray-500">No posts available</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
