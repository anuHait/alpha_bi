"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const[gif,setGif]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //const [totalPages, setTotalPages] = useState(0);
  //const dataPerPage=3;
  const handleFocus = () => {
    setIsFocused(true);
  };
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65',
          q: query,
          limit: 10,
        },
      });
      setGif(response.data.data); 
      //setTotalPages(Math.ceil(response.data.pagination.total_count / recordsPerPage));
    } catch (error) {
      console.error('Error during loading', error);
    }
  };
  console.log({ gif });
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const totalPages = Math.ceil(gif?.length / recordsPerPage);
  const pageNumbers = totalPages > 0 ? [...Array(totalPages)].map((_, index) => index + 1) : [];
  
    const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");
  console.log({ user });
  const router = useRouter();
  if (!user && !userSession) {
    router.push("/signin");
  }
  return (
    <div className={`p-8 flex  flex-col items-center justify-center`}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mb-5 rounded-;g "
        onClick={() => {
          signOut(auth);
          if (typeof window !== 'undefined') {
            window.sessionStorage.removeItem("user");
          }        }}
      >
        Log out
      </button>
      <div
        className={`query-container transition-all ease-in-out duration-300  ${
          isFocused
            ? "w-[95%] lg:w-[83%] h-[80%]"
            : "w-[85%] lg:w-[39%] h-auto"
        } bg-white border border-gray-300 flex flex-col rounded-lg  `}
      >
        <div className="">
          <div className="flex flex-row gap-3 m-5">
          <div className="flex flex-row gap-1 items-center justify-center w-[90%] bg-gray-200 rounded-lg">
            <FaSearch className="text-xl ml-2 " />
            <input
              type="text"
              id="query"
              value={query}
              className={` flex-1 h-full p-5 bg-gray-200 rounded-lg outline-none`}
              placeholder="Article name or keyword..."
              onFocus={handleFocus}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            </div>
            <button
              className={`bg-black text-white font-semibold py-2 px-4  rounded-lg`}
            onClick={(e)=>{handleClick(e)}}>
              query
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center justify-center">
        {gif?.slice(firstIndex, lastIndex).map((item, index) => {
          const itemIndex = index + firstIndex + 1;
          return (
            <div key={itemIndex} className="flex flex-col gap-2 items-center rounded-lg justify-center m-5">
              <img src={item.images.fixed_height.url} alt={item.title} className="rounded-lg h-56" />
              <div className="flex flex-row items-center justify-between">
              <div>
              <p className="font-semibold text-lg ">{item?.user?.display_name}</p>
              <p className="font-semibold text-md text-gray-700">@{item?.user?.username}</p>
              </div>
              <FaStar className="text-xl hover:text-yellow-400 text-gray-400" />
            </div>
            </div>
          );
        }
        )
      }
        </div>
        {
          gif.length>0?(
            <nav className="flex justify-center mt-4 mb-20">
          <ul className="flex">
            <li>
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-2 py-1 mr-2 border-none font-semibold"
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  onClick={() => goToPage(page)}
                  className={`px-2 py-1 mx-1  rounded-sm ${
                    page === currentPage ? 'bg-pink-100 border-b-4 border-pink-400' : ''
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-2 py-1 ml-2 font-semibold border-none"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
          ):(<div></div>)
        }
      
      </div>
    </div>
  );
}
