import React, { useState, useEffect } from "react";
import Axios from 'axios';

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    padding: "5vh 0",
    backgroundColor: "#f7f7f7",
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    margin: "10px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
    color: "#333",
  },
  highlight: {
    color: "#ff4081",
  },
  label: {
    marginBottom: "8px",
    display: "block",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#ff4081",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  submitButtonHover: {
    backgroundColor: "#ff6699",
  },

  
};

async function getTags() {
  let result = await fetch("http://127.0.0.1:8000/api/tag/");
  result = await result.json();
  return result;
}

const PostForm = ({ user }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  useEffect(() => {
    getTags().then((res) => {
      // console.log(res);
      setTags(res);
    });
  }, []);

  // useEffect(() => {
  //   setTags(["Tag1", "Tag2", "Tag3"]);
  // }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSelectedTag(selectedTags.toString())
    // console.log({ image, title, description, price, selectedTag });    
    // setSelectedTag(selectedTags.toString())
    const fData = new FormData();
    fData.append('title', title);
    fData.append('description', description);
    fData.append('tag', selectedTags.toString());
    fData.append('paintingimg_link', image);
    fData.append('owner_id', user.id);
    fData.append('author_id', user.id);
    console.log(selectedTag);
    Axios.post('http://127.0.0.1:8000/api/paintings', fData);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag) 
        : [...prevSelectedTags, tag]
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>
          Create <span style={styles.highlight}>Post</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="post-image" style={styles.label}>
              Image
            </label>
            <input
              type="file"
              id="post-image"
              style={styles.input}
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label htmlFor="post-title" style={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="post-title"
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="post-description" style={styles.label}>
              Description
            </label>
            <textarea
              id="post-description"
              style={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div>
            <label htmlFor="post-price" style={styles.label}>
              Price
            </label>
            <input
              type="number"
              id="post-price"
              style={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div> */}
          <div className="mb-10">
        <label style={styles.label}>Tags</label>
        {tags.map((tag) => (
          <div key={tag.id}>
            <input
              type="checkbox"
              id={`${tag.id}`}
              checked={selectedTags.includes(tag.name)}
              onChange={() => handleTagChange(tag.name)}
            />
            <label htmlFor={`${tag.id}`}>{tag.name}</label>
          </div>
        ))}
      </div>
          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.submitButtonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                styles.submitButton.backgroundColor)
            }
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;

