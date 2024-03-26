// En el componente Cards
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import axios from "axios";
import useStore from "../GlobalStoreZustand/GlobalStoreZustand";
import CustomPagination from "../CustomPagination/CustonPagination";

const URL = "http://localhost:3001/products";
const PRODUCTS_PER_PAGE = 10;

const Cards = () => {
  const {
    items,
    totalItems,
    showFilters,
    currentPage,
    name,
    category,
    minPrice,
    maxPrice,
    material,
    colour,
    orderType,
    order,
    setItems,
    setTotalItems,
    setShowFilters,
    setCurrentPage,
    setName,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setMaterial,
    setColour,
    setOrderType,
    setOrder,
  } = useStore();

  const [displayedItems, setDisplayedItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(URL, {
        name,
        category,
        minPrice,
        maxPrice,
        material,
        colour,
        productLimit: PRODUCTS_PER_PAGE,
        pageNumber: currentPage,
        orderType,
        order,
      });
      setItems(response.data);
      setTotalItems(response.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    name,
    category,
    minPrice,
    maxPrice,
    material,
    colour,
    orderType,
    order,
  ]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, items.length);
    setDisplayedItems(items.slice(startIndex, endIndex));
  }, [items, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);

  return (
    
    <div className="flex-col pt-[120px] justify-center font-RedHat">
      <div className="flex justify-around relative">
        <div className="flex justify-center w-full md:justify-end md:px-12">
          <div
            className="border-solid px-4 py-2  bg-primary/20 hover:bg-primary hover:text-white hover:shadow-lg hover:cursor-pointer rounded-[6px] float-right"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </div>
        </div>
        {showFilters && <Filters />}
      </div>
      <div className="flex pt-[40px] justify-center w-full">
        <div
          className="flex flex-wrap gap-10 justify-center"
          style={{ maxWidth: "90vw" }}
        >
          {displayedItems.map((res) => (
            <div key={res.id} className="relative">
              <Card res={res} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default Cards;