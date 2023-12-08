import React from "react";
import ImageSection from './ImageSection';
// YOU MAY WANT TO MOVE THIS TO ANOTHER FILE
const ImageContainer = ({ posts }) => {
    return (
      <div className="w-full flex  mb-16  flex-wrap rounded-lg p-2 border bg-white">  
        {posts.map((post, index) => (
          <ImageSection key={index} title={post.title} subtitle={post.description} img={post.paintingimg_link}/>
        ))}
      </div>
    );
  };
export default ImageContainer;