import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../utils.js/UserContext"
import { ReactComponent as Icon } from "../Assests/My Account.svg"
import header from "../Assests/header.svg"
import { useNavigate } from 'react-router-dom'


import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 

const Header = () => {
    const { loginResponse ,setLoginResponse} = useContext(UserContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const handleLogout = () => {
        sessionStorage.removeItem('email');
        setLoginResponse('');
        toast.success('Successfully logged out!', { position: 'bottom-center', autoClose: 2000 }); // Show success message
        setTimeout(() => {
          navigate('/');
        }, 3000); 
      };

    useEffect(() => {
        setEmail(sessionStorage.getItem('email'))
    }, [loginResponse])

    return (
        <>
            <div className='w-full flex justify-between mb-2'>
                <img src={header} alt="header " className='w-40'/>
                {
                    !email &&
                    <Link to={'/signup'}><button className='px-2 text-2xl font-medium text-[#FF9500]'>signup</button></Link>
                }
                {email &&
                    <Icon className="text-2xl px-2 hover:cursor-pointer w-20" onClick={handleLogout} />
                }
            </div>
        </>
    )
}

export default Header
