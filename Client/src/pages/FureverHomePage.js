import React from 'react'
import Navigation from '../components/Navigation/Navigation.js'
import AuthPopup from '../components/Authentication/FormAuth'
import {useState} from 'react'
import {useCookies} from "react-cookie"

const FureverHomePage = () => {

    // The code below does the following:
    // It creates a React state variable called "showPopup" and sets its initial value to false.
    // It also creates a React state variable called "isUser" and sets its initial value to true.
    // Finally, it creates a function called "useCookies" which allows us to manage cookies in our React application. 
    // This function takes an array of cookie names as its input and returns an object containing the values of those cookies.
    const [showPopup, setShowPopup] = useState(false)
    const [isUser, setIsUser] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['fureverUser'])
    const authentication = cookies.AuthToken


    // The code below checks to see if the user is logged in. If the user is logged in, it removes the cookies 
    // that are associated with the user's account and then reloads the page. If the user is not logged in, it sets the "showPopup" 
    // variable to true and the "isUser" variable to true.
    const handleClick = () => {
        if (authentication) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.authentication)
            window.location.reload()
            return
        }
        setShowPopup(true)
        setIsUser(true)
    }

    // This code renders a navbar, heading, and button to the page. The heading and button are conditionally rendered based on 
    // whether or not the user is authenticated. If the user is authenticated, the heading will say "We help you find your furever home." 
    // and the button will say "Signout". If the user is not authenticated, the heading will say "Welcome to Furever Home Finder" 
    // and the button will say "Create Account". When the button is clicked, a popup will appear asking the user to sign in or sign up.

    return (
        <div className="home_container">
            <Navigation
                authentication={authentication}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
                setIsUser={setIsUser}
            />
            <div className="home_content">
                <h1 className="home_heading">We help you find your furever home.</h1>
                <button className="home_button" onClick={handleClick}>
                    {authentication ? 'Signout' : 'Join Furever'}
                </button>


                {showPopup && (
                    <AuthPopup setShowPopup={setShowPopup} isUser={isUser}/>
                )}
            </div>
        </div>
    )
}
export default FureverHomePage