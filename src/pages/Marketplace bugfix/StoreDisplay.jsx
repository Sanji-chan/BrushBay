import React, { useState } from "react";
import Card from "./Card";
import Modal from "./Modal";

const StoreDisplay = () => {
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
  const [stores, setStores] = useState([
    {
      name: "Store 1",
      category: "grocery",
      id: "1",
      imageUrl: "img/test1.jpg",
    },
    {
      name: "Store 2",
      category: "electronics",
      id: "2",
      imageUrl: "img/test2.png",
    },
    {
      name: "Art Gallery",
      category: "art",
      id: "3",
      imageUrl: "img/test4.png",
    },
    {
      name: "Azmain",
      category: "art",
      id: "4",
      imageUrl: "img/nahin-background.jpg",
    },
    {
      name: "Namirul",
      category: "art",
      id: "5",
      imageUrl: "img/nahin-background.jpg",
    },
    {
      name: "Nahin",
      category: "art",
      id: "6",
      imageUrl: "img/nahin-background.jpg",
    },
    {
      name: "Razer",
      category: "electronics",
      id: "7",
      imageUrl: "img/nahin-background.jpg",
    },
    {
      name: "Sapphire",
      category: "electronics",
      id: "8",
      imageUrl: "img/nahin-background.jpg",
    },
    {
      name: "Corsair",
      category: "electronics",
      id: "9",
      imageUrl: "img/nahin-background.jpg",
    },
    {
      name: "Gigabyte",
      category: "electronics",
      id: "10",
      imageUrl: "img/nahin-background.jpg",
    },
  ]);

  // Function to handle sorting
  const sortStores = (a, b) => {
    switch (sortBy) {
      case "Latest":
        return a.id < b.id ? 1 : -1;
      case "Oldest":
        return a.id > b.id ? 1 : -1;
      case "A-Z":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  };

  const filteredAndSortedStores = stores
    .filter(
      (store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "" || store.category === selectedCategory)
    )
    .sort(sortStores);

  const handleSearch = () => {
    // Implement search functionality or simply trigger re-render
    console.log("Search button clicked with query:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
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
            className="px-4 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Filter by</option>
            <option value="grocery">Grocery</option>
            <option value="electronics">Electronics</option>
            <option value="art">Art</option>
            <option value="clothing">Clothing</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Sort by</option>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
            <option value="A-Z">A-Z</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
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
