import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './AuthPopup.scss'


const AuthPopup = ({ setShowPopup,  isUser }) => {

    // The code is setting up a stateful component in React. The email, password, and confirmPassword variables are all set to null, 
    // and the error variable is set to null. The cookies variable is set to an object containing the cookies for the current domain, 
    // and the setCookie and removeCookie functions are used to set and remove cookies, respectively.
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null)
    const [confirmUserPassword, setConfirmUserPassword] = useState(null)
    const [error, setError] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(null)


    // The navigate variable is set to a function that can be used to navigate to a different route.
    let navigate = useNavigate()

    // The handleSubmit function is called when the user clicks the submit button. It checks if the user is signing up or logging in,
    const handleClick = () => {
        setShowPopup(false)
    }

    // The handleSubmit function is called when the user clicks the submit button. It checks if the user is signing up or logging in,
    // and then sends a request to the server to either create a new user or log in the user.
    // prevent default is used to prevent the page from refreshing when the form is submitted.
    const handleSubmit = async (e) => {
        e.preventDefault()


        // The code above is attempting to sign a user up or log a user in. If the user is signing up, it checks to see if the 
        // password and confirm password fields match. If they do match, it sends a post request to the server with the email and password. 
        // If the server responds with a status of 201, it means the user was userSuccessfully created, and the user is redirected to the onboarding page. 
        // If the user is logging in and the server responds with a status of 201, it means the user was userSuccessfully logged in and the 
        // user is redirected to the dashboard.        

        try {
            if (isUser && (userPassword !== confirmUserPassword)) {
                alert("Passwords do not match")
                setError('Passwords need to match!')
                return
            }

            const serverResponse = await axios.post(`http://localhost:8888/${isUser ? 'enter' : 'reenter'}`, { userEmail, userPassword })

            setCookie('AuthToken', serverResponse.data.token)
            setCookie('UserId', serverResponse.data.userId)

            const userSuccess = serverResponse.status === 201
            if (userSuccess && isUser) navigate ('/userform')
            if (userSuccess && !isUser) navigate ('/furever')

            window.location.reload()

        } catch (error) {
            console.log(error)
        }

    }


    // The code below defines a component for an authentication popup. The popup has a form with fields for email and password, 
    // and a submit button. If the isUser prop is true, then the form also includes a field for confirming the password. 
    // The component includes handlers for when the form is submitted and when the close icon is clicked. When the form is submitted, 
    // the email and password state variables are set to the values of the corresponding fields in the form. If isUser is true, 
    // then the confirmPassword state variable is set to the value of the password confirmation field. 
    // The error state variable is used to display an error message, if one exists.
    return (
        <div className="authPopup">
            <div className="close" onClick={handleClick}>X</div>

            <h2>{isUser ? 'Join Furever': 'Welcome Back'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                {isUser && <input
                    type="password"
                    id="password-confirm"
                    name="password-confirm"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmUserPassword(e.target.value)}
                />}
                <input className="form-button" type="submit"/>
                <p>{error}</p>
            </form>
        </div>
    )
}
export default AuthPopup