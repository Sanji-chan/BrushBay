import React from "react";

// YOU MAY WANT TO MOVE THIS TO ANOTHER FILE
const ImageContainer = ({ posts }) => {
    return (
      <div className="w-full flex flex-wrap rounded-lg border bg-white">
        {posts.map((post, index) => (
          <ImageSection key={index} title={post.title} subtitle={post.subtitle} />
        ))}
      </div>
    );
  };
export default ImageContainer();