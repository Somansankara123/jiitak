import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import { UserContext } from "../utils.js/UserContext";


import item1 from "../Assests/Item1.svg";
import item2 from "../Assests/item2.svg";
import item3 from "../Assests/item3.svg";
import item4 from "../Assests/item4.svg";

const Sidebar = () => {
  const { setLoginResponse } = useContext(UserContext);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    
    setActiveLink(location.pathname);
  }, [location]);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  

  return (
    <>
      
      <ToastContainer />

      <div className="w-12 sm:w-52 bg-white shadow-md h-screen">
        <ul className="space-y-4">
          <Link to={'/dashboard'}>
            <li
              className={`group w-full py-6 font-medium flex items-center ${
                activeLink === '/dashboard'
                  ? 'bg-orange-200 text-orange-500'
                  : 'text-[#878480] hover:bg-orange-200'
              }`}
              onClick={() => handleClick('/dashboard')}
            >
              <img
                src={item1}
                alt="Dashboard"
                className={`mr-2 px-2 ${activeLink === '/dashboard' ? 'text-orange-500' : 'group-hover:text-orange-500'}`}
              />
              <span className=''>"ダッシュボード"</span>
            </li>
          </Link>

          <Link to={'/userlist'}>
            <li
              className={`group w-full py-6 font-medium flex items-center ${
                activeLink === '/userlist'
                  ? 'bg-orange-200 text-orange-500'
                  : 'text-[#878480] hover:bg-orange-200'
              }`}
              onClick={() => handleClick('/userlist')}
            >
              <img
                src={item2}
                alt="Registered Users"
                className={`mr-2 px-2 ${activeLink === '/userlist' ? 'text-orange-500' : 'group-hover:text-orange-500'}`}
              />
              <span>登録ユーザー</span>
            </li>
          </Link>

          <Link to={'/winners'}>
            <li
              className={`group w-full py-6 font-medium flex items-center ${
                activeLink === '/winners'
                  ? 'bg-orange-200 text-orange-500'
                  : 'text-[#878480] hover:bg-orange-200'
              }`}
              onClick={() => handleClick('/winners')}
            >
              <img
                src={item3}
                alt="Winners"
                className={`mr-2 px-2 ${activeLink === '/winners' ? 'text-orange-500' : 'group-hover:text-orange-500'}`}
              />
              <span >当選者</span>
            </li>
          </Link>

          <Link to={'/settings'}>
            <li
              className={`group w-full py-6 font-medium flex items-center ${
                activeLink === '/settings'
                  ? 'bg-orange-200 text-orange-500'
                  : 'text-[#878480] hover:bg-orange-200'
              }`}
              onClick={() => handleClick('/settings')}
            >
              <img
                src={item4}
                alt="Settings"
                className={`mr-2 px-2 ${activeLink === '/settings' ? 'text-orange-500' : 'group-hover:text-orange-500'}`}
              />
              <span>運営管理者</span>
            </li>
          </Link>

          
        
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
