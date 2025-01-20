import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import search from "../Assests/DASHBOARDS/Search.svg";
import { hardcodedUsers } from "../utils.js/constant";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    setUsers(hardcodedUsers);
    setFilter(hardcodedUsers);
  }, []);

  const handleSearch = (e) => {
    const searchKey = e.target.value;
    if (searchKey) {
      const filteredUser = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.email.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilter(filteredUser);
      setCurrentPage(1);
    } else {
      setFilter(users);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filter.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filter.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginatePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginateNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="grid grid-cols-12 grid-rows-1">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="bg-[#F8F5F0] col-span-10">
        <div className="container mx-auto px-4 sm:px-9 w-full flex flex-col sm:flex-row sm:justify-between items-center py-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-0 text-center sm:text-left">
            登録ユーザー一覧
          </h2>
          <div className="relative w-full sm:w-1/5">
            <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400">
              <img src={search} alt="search" />
            </span>
            <input
              type="text"
              onChange={handleSearch}
              className="w-full pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9500] focus:border-transparent"
              placeholder="ニックネーム / メールアドレスで検索"
            />
          </div>
        </div>
        <div className="table-body">
          <div className="overflow-x-auto px-4 sm:px-9">
            <table className="w-full min-w-full table-auto border-collapse rounded-md bg-white">
              <thead className="text-[#878480]">
                <tr>
                  <th className="text-left px-5 py-2 border-b">No</th>
                  <th className="text-left px-5 py-2 border-b">ニックネーム</th>
                  <th className="text-left px-5 py-2 border-b">メールアドレス</th>
                  <th className="text-left px-5 py-2 border-b">生年月</th>
                  <th className="text-left px-5 py-2 border-b">居住地</th>
                  <th className="text-left px-5 py-2 border-b">登録日</th>
                </tr>
              </thead>
              {currentUsers.length > 0 ? (
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="text-left">
                      <td className="px-4 py-2">{user.id}.</td>
                      <td className="px-4 py-2" title={user.name}>
                        <div className="truncate w-32">{user.name}</div>
                      </td>
                      <td className="px-4 py-2" title={user.email}>
                        <div className="truncate w-32">{user.email}</div>
                      </td>
                      <td className="px-4 py-2">{user.birthdate}</td>
                      <td className="px-4 py-2" title={user.city}>
                        <div className="truncate w-32">{user.city}</div>
                      </td>
                      <td className="px-4 py-2">{user.registrationDate}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div className="h-60 w-full flex justify-center items-center text-[#878480]">
                  <p>表示するデータがありません</p>
                </div>
              )}
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-4">
            <p className="p-2 ml-10 font-thin text-center sm:text-left sm:ml-0">
              {filter.length}人中 - {filter.length}人表示
            </p>
            <div className="flex justify-center sm:justify-start">
              <span
                className="hover:cursor-pointer bg-white rounded text-[#878480] border border-gray-300 p-2"
                onClick={paginatePrevious}
              >
                ◀️
              </span>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === index + 1
                      ? "bg-[#FF9500] text-white"
                      : "bg-white text-[#878480] border border-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <span
                className="bg-white text-[#878480] border border-gray-300 p-2 rounded hover:cursor-pointer"
                onClick={paginateNext}
              >
                ▶️
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
