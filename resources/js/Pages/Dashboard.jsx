import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from "react";

const Carousel = ({posts}) => {
    const [isFullViewVisible, setIsFullViewVisible] = useState(false);
    const [currentActive, setCurrentActive] = useState(0);
    const [visibleStoriesStart, setVisibleStoriesStart] = useState(0);
    const [rightArrowClicked, setRightArrowClicked] = useState(false);
  
    // let stories = [
    //   { id: 1, imageUrl: "img/1.jpg", author: "Author 1" },
    //   { id: 2, imageUrl: "img/2.jpg", author: "Author 2" },
    //   { id: 3, imageUrl: "img/4.jpg", author: "Author 3" },
    //   { id: 4, imageUrl: "img/5.jpg", author: "Author 4" },
    //   { id: 5, imageUrl: "img/6.jpg", author: "Author 5" },
    //   { id: 6, imageUrl: "img/7.jpg", author: "Author 6" },
    // ];
  
    const isRightArrowDisabled = () => {
      return visibleStoriesStart + 5 >= posts.length;
    };
  
    const isLeftArrowDisabled = () => {
      return visibleStoriesStart === 0 && !rightArrowClicked;
    };
  
    const showFullView = (index) => {
      setCurrentActive(index);
      setIsFullViewVisible(true);
    };
  
    const closeFullView = () => {
      setIsFullViewVisible(false);
    };
  
    const nextStory = () => {
      if (!isRightArrowDisabled()) {
        setVisibleStoriesStart((visibleStoriesStart + 1) % posts.length);
        setRightArrowClicked(true);
      }
    };
  
    const prevStory = () => {
      if (visibleStoriesStart - 1 >= 0) {
        setVisibleStoriesStart(visibleStoriesStart - 1);
        if (visibleStoriesStart - 1 === 0) {
          setRightArrowClicked(false);
        }
      }
    };
    return (
      <>
        <div style={styles.storiesContainer}>
          <div style={styles.content}>
            <div
              style={{ ...styles.button, ...styles.previousBtn }}
              onClick={prevStory}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
            {posts
              .slice(visibleStoriesStart, visibleStoriesStart + 5)
              .map((story, index) => (
                <div
                  key={story.id}
                  style={styles.story}
                  onClick={() => showFullView(visibleStoriesStart + index)}
                  class=""
                >
                  <img src={"http://127.0.0.1:8000/storage/" + story.painting.paintingimg_link} alt="" style={styles.storyImg} />
                  <div style={styles.author}>
                  {story.painting.title}
                  <br/>
                  {story.painting.author.name}</div>
                </div>
              ))}
  
            <div
              style={{
                ...styles.button,
                ...styles.nextBtn,
                opacity: isRightArrowDisabled() ? 0.5 : 1,
              }}
              onClick={nextStory}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>
  
        {isFullViewVisible && (
          <div style={styles.storiesFullView}>
            <div style={styles.closeBtn} onClick={closeFullView}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
  
            <div style={styles.contentFullView}>
              <div style={styles.storyFullView} className='mx-auto'>
                <img
                  src={"http://127.0.0.1:8000/storage/" + posts[currentActive].painting.paintingimg_link}
                  alt=""
                  style={styles.storyImgFull}
                />
                <div style={styles.authorFull}>
                  {posts[currentActive].painting.author.name}
                </div>
              </div>
            </div>
          </div>  
        )}
      </>
    );
  };
  
  // Styles
  
  const fullViewButtonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  };
  
  const buttonStyle = {
    width: "40px",
    height: "40px",
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    background: "#444",
    color: "#fff",
    borderRadius: "50%",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };
  
  const styles = {
    storiesContainer: {
      maxWidth: "1400px",
      margin: "24px auto",
      position: "relative",
      // background: "red",
      display: "flex",
      justifyContent: "center",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
  
    button: { ...buttonStyle },
    previousBtn: {
      ...buttonStyle,
      left: "10px",
    },
    nextBtn: {
      ...buttonStyle,
      right: "10px",
    },
    story: {
      background: "rgba(0, 0, 0)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: "calc(100% / 5 - 16px)",
      margin: "0 8px",
      borderRadius: "16px",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    author: {
      position: "absolute",
      bottom: "0px",
      width: "100%",
      textAlign: "center",
      padding: "8px 0",
      background: "rgba(0, 0, 0, 0)",
      color: "#fff",
      fontSize: "15px",
      fontFamily: '"Roboto", sans-serif',
      fontWeight: "bold",
      borderRadius: "0 0 16px 16px",
    },
    storyImg: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
      // borderRadius: "16px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
    },
    storiesFullView: {
      position: "fixed",
      inset: 0,
      zIndex: 5,
      background: "rgba(0, 0, 0, 0.9)",
      display: "grid",
      placeItems: "center",
    },
    closeBtn: {
      ...buttonStyle,
      top: "40px",
      left: "16px",
    },
    contentFullView: {
      
      height: "90vh",
      width: "100%",
      maxWidth: "700px",
      position: "relative",
    },
  
    storyFullView: {
      height: "100%",
      textAlign: "center",
      display: 'flex', 
      alignItems: 'center',
       justifyContent: 'center'
    },
    storyImgFull: {
      height: "100%",
      width: "auto",
      aspectRatio: "10/16",
      objectFit: "cover",
      borderRadius: "16px",
    },
    authorFull: {
      position: "absolute",
      top: "8px",
      left: "50%",
      transform: "translateX(-100%)",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "18px",
      // background: "rgba(0, 0, 0, 0.4)",
      // background:"#F3F4F6"
      color: "#fff",
      padding: "4px 32px",
      borderRadius: "8px",
    },
  };  

export default function Dashboard({ auth, posts, tags }) {
    console.log(posts);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="pt-12 pb-32">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="p-6 text-gray-900" 
                                 style={{
                                  'font-size':'20px',
                                  'font-weight':'600',
                                 }}> Your Recomendations</div>
                      
                       {posts.length > 0 ? 
                          <div className="px-4" > 
                            <Carousel posts={Object.values(posts)}/> 
                          </div>
                           :  
                           <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                              <div className="p-6 text-gray-900">You have no Recomendations</div>
                              </div>
                    
                        }
                        
                   
                </div>
            </div>

           
        </AuthenticatedLayout>
    );
}
