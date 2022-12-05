import {useState} from 'react'
import { Cookies, useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import React from 'react'
import Nav from '../components/Navigation/Navigation'

const NewUsers = () => {

    // The code defines a state variable for a user's data, including their id, first name, date of birth, URL, 
    // and a list of matches. It also defines functions for setting and removing cookies.
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [userData, setFormData] = useState({
        user_id: cookies.UserId,
        First_Name: "",
        MonthOfBirth: "",
        DayOfBirth: "",
        YearOfBirth: "",
        pet_id: "",
        url: "",
        about: "",
        matches: []
    })


    // The code below submits a form to a server. It uses the useNavigate hook from React Router to navigate to the 
    // '/dashboard' route if the form is submitted successfully.
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8888/user', {userData})
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/furever')
        } catch (err) {
            console.log(err)
        }

    }

    // The code below sets up a handleChange function to be used on a form. It uses a ternary operator to check the type of input, 
    // whether it is a checkbox or not. If it is a checkbox, it returns the value as checked, if not, it returns the value as is. 
    // It then sets the name of the input to whatever was entered into the form.
    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    // The code above renders a form for a user to fill out to create an account. The form includes input fields for the user's 
    // first name, birthday, gender, gender preference, and a short description about themselves. There is also an input field for 
    // the user to submit a URL for a profile photo.
    return (
        <>
            <Nav
                setShowPopup={() => {
                }}
                showPopup={false}
            />

            <div className="verification">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="First_Name"
                            type='text'
                            name="First_Name"
                            placeholder="First Name"
                            required={true}
                            value={userData.First_Name}
                            onChange={handleChange}
                        />

                        <label htmlFor="phone_number">Phone Number</label>
                        <input
                            id="Phone_Number"
                            type='number'
                            name="Phone_Number"
                            placeholder="Phone Number"
                            required={true}
                            value={userData.Phone_Number}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple_container">
                            <input
                                id="MonthOfBirth"
                                type="number"
                                name="MonthOfBirth"
                                placeholder="Month"
                                required={true}
                                value={userData.MonthOfBirth}
                                onChange={handleChange}
                            />

                            <input
                                id="DayOfBirth"
                                type="number"
                                name="DayOfBirth"
                                placeholder="Day"
                                required={true}
                                value={userData.DayOfBirth}
                                onChange={handleChange}
                            />

                            <input
                                id="YearOfBirth"
                                type="number"
                                name="YearOfBirth"
                                placeholder="Year"
                                required={true}
                                value={userData.YearOfBirth}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Do you want to see Male or Female?</label>
                        <div className="multiple_container">
                            <input
                                id="pet-id-interest"
                                type="radio"
                                name="pet_id"
                                value="Male"
                                onChange={handleChange}
                                checked={userData.pet_id === "Male"}
                            />
                            <label htmlFor="pet-id-interest">Male</label>
                            <input
                                id="pet-female-id-interest"
                                type="radio"
                                name="pet_id"
                                value="Female"
                                onChange={handleChange}
                                checked={userData.pet_id === "Female"}
                            />
                            <label htmlFor="pet-female-id-interest">Female</label>
                        </div>

                        <label htmlFor="about">Why You Want To Adopt</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="We help you find your furever companion..."
                            value={userData.about}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                    </section>

                    <section>

                        <label htmlFor="url">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                            placeholder="URL"
                        />
                        <div className="photo-container">
                            {userData.url && <img src={userData.url} alt="profile pic preview"/>}
                        </div>

                        <p>Go to a website such as facebook or a place you have an image hosted online and  
                        <b> Right-click on the image</b> you want to use and <b>select “Copy Image Address”</b> or <b>“Copy Image Location”</b>from the menu that appears and <b>paste it above</b>. This will display the image.</p>
                    </section>

                </form>
            </div>
        </>
    )
}
export default NewUsers