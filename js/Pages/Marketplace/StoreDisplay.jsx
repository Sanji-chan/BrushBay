import React, { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "./Modal";
import { Axios } from "axios";

const StoreDisplay = ( props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (store) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStore(null);
  };

  async function getTags() {
    let result = await fetch("http://127.0.0.1:8000/api/tag/");
    result = await result.json();
    return result;
  }

  // const [selectedTag, setSelectedTag] = useState("");

  // useEffect(() => {
  //   getTags().then((res) => {
  //     setTags(res);
  //   });
  // }, []);


  const [stores, setStores] = useState([]);
  // console.log(stores)


  // const [flatArray, setFlatArray] = useState([]);

  // useEffect to convert multi-dimensional prop to a flat array
  useEffect(() => {
    // Check if multiDimensionalProp is an object
    if (props && typeof props === 'object') {
      // Extract values of the object and flatten the resulting array
      const valuesArray = Object.values(props);
      const newStore = valuesArray.flat();
      
      // Set the state with the flattened array
      setStores(newStore);
    }
  }, [props]);

  console.log(stores);


  
  // Function to handle sorting
  const sortStores = (a, b) => {
    switch (sortBy) {
      case "Latest":
        return a.id < b.id ? 1 : -1;
      case "Oldest":
        return a.id > b.id ? 1 : -1;
      case "A-Z":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  };

  const filteredAndSortedStores = stores
    .filter(
      (store) =>
        store.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "" || store.tag.includes(selectedCategory))
    )
    .sort(sortStores);

  const handleSearch = () => {
    // Implement search functionality or simply trigger re-render
    console.log("Search button clicked with query:", searchQuery);
  };

   // get tags 
   async function getTags() {
    let result = await fetch("http://127.0.0.1:8000/api/tag/");
    result = await result.json();
    return result;
  }
   const [tags, setTags] = useState([]);

   useEffect(() => {
    getTags().then((res) => {
      setTags(res);
    });

  }, []);
  return (
    <div className="min-h-screen pt-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Search Marketplace"
          />
        </div>
        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 text-gray-900 rounded-md 
                          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          style= {{"background-image": None}}
          >
            <option value="">Filter by</option>
            {tags.map((tag) => (
                  <option value={`${tag.name}`}> {tag.name} </option>
             ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Sort by</option>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
            <option value="A-Z">A-Z</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {filteredAndSortedStores.map((store) => (
          <div onClick={() => openModal(store)} key={store.id}>
            <Card store={store} />
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} store={selectedStore} />
    </div>
  );
};

export default StoreDisplay;
