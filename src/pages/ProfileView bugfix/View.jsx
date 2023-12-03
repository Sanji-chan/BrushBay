import React from "react";

// YOU MAY WANT TO MOVE THIS TO ANOTHER FILE
const ColumnSection = ({ title, options }) => {
  return (
    <div className="mb-5 py-3 px-5 rounded-lg border bg-white">
      <p className="font-bold mb-5">{title}</p>
      {options.map((option, id) => {
        return (
          <p
            key={id}
            className="text-sm font-medium text-gray-600 mb-2 cursor-pointer hover:text-black"
          >
            {option}
          </p>
        );
      })}
    </div>
  );
};

// YOU MAY WANT TO MOVE THIS TO ANOTHER FILE
const ImageSection = ({ title, subtitle }) => {
  return (
    <div className="w-1/3 p-2">
      <img
        className="mb-2 object-cover rounded-md"
        src="/img/nahin-background.jpg"
        alt=""
      />
      <p className="ml-2 font-bold">{title}</p>
      <p className="ml-2 font-medium text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};

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

const View = () => {
  const POSTS = [
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
  ];

  return (
    <div className="flex justify-center font-sans bg-slate-50">
      <div className="flex flex-col items-center">
        {/* PROFILE SECTION */}
        <div className="relative w-[80%] h-64 rounded-b-lg bg-cover bg-center bg-[url('../public/img/nahin-background.jpg')]">
          <div className="absolute -bottom-10 left-10 flex">
            {/* Profile picture */}
            <img
              src="/img/nahin-dp.jpg"
              className="h-32 w-32 rounded-full border-4 border-white bg-white"
              style={{
                boxShadow: "7px 5px 20px 0px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#fff",
              }}
              alt="Profile"
            />

            {/* Name */}
            <div className="flex h-14 mt-4 ml-8">
              <div>
                <div className="text-xl font-bold">Nahin Hossain</div>
                <div className="text-sm font-medium text-gray-600">
                  Toronto, CA
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute bottom-4 right-4 flex items-center justify-center">
            <div class="mr-6 pr-6 text-center border-r border-grey-100">
              <span class="text-3xl font-bold">142</span>
              <p class="text-m font-medium text-gray-600">Views</p>
            </div>

            <div class="mr-6 pr-6 text-center border-r border-grey-100">
              <span class="text-3xl font-bold">201</span>
              <p class="text-m font-medium text-gray-600">Likes</p>
            </div>

            <div class="pr-6 text-center">
              <span class="text-3xl font-bold">3.2K</span>
              <p class="text-m font-medium text-gray-600">Followers</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-[80%] m-16">
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-1/4 mr-5">
            <ColumnSection
              title="Dummy Title"
              options={["Dummy Text", "Dummy Text", "Dummy Text"]}
            />
            <ColumnSection
              title="Dummy Title"
              options={["Dummy Text", "Dummy Text", "Dummy Text", "Dummy Text"]}
            />
          </div>
          {/* RIGHT COLUMN (Images Section) */}
          <div className="w-3/4 flex flex-col gap-y-5">
            {/* Heading for the Owned Paintings */}
            <h2 className="text-2xl font-bold mb-0">Owned Paintings</h2>
            <ImageContainer posts={POSTS} />

            {/* Heading for the Created Paintings */}
            <h2 className="text-2xl font-bold mb-0">Created Paintings</h2>
            <ImageContainer posts={POSTS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
