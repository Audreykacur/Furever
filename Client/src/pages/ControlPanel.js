import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import ChatFeature from '../components/ChatFeature/ChatFeature'
import {useCookies} from 'react-cookie'
import axios from 'axios'

const ControlPanel = () => {

    // The code defines three state variables - user, preferedUsers, and lastSwipe - and a cookies variable. 
    // The cookies variable is used to set, get, and remove cookies.
    const [newUser, setNewUser] = useState(null)
    const [preferedUsers, setpreferedUsers] = useState(null)
    const [lastSwipe, setLastSwipe] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId


    // This code uses the Axios library to send a GET request to the 'http://localhost:8888/user' endpoint. 
    // The 'userId' variable is passed in as a parameter in the request. If the request is successful, the response data is stored 
    // in the 'user' state variable.
    const getNewUser = async () => {
        try {
            const response = await axios.get('http://localhost:8888/user', {
                params: {userId}
            })
            setNewUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // This code uses the axios library to make a GET request to the server at 'http://localhost:8888/prefered-users'. 
    // The 'params' object contains the key-value pair 'gender: user?.gender_interest'. This means that the 'gender' 
    // parameter will be set to the value of the 'gender_interest' property of the 'user' object. If the 'user' object is undefined, 
    // then the 'gender' parameter will be set to undefined.
    // The response from the server is stored in the 'response' variable. The 'data' property of the 'response' object is then 
    // passed to the 'setpreferedUsers' function.
    const getpreferedUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8888/userOptions', {
                params: {preference: newUser?.pet_user}
            })
            setpreferedUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNewUser()

    }, [])

    // The code below uses the useEffect hook to call the getpreferedUsers function if the user is truthy.
    useEffect(() => {
        if (newUser) {
            getpreferedUsers()
        }
    }, [newUser])

    // The code below is a function that uses the axios PUT method to send a request to the server to update the matches for the user. 
    // The user's id and the id of the matched user are passed in as parameters. If the request is successful, the getNewUser function 
    // is called to get the updated list of matches for the user.

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8888/swipeMatches', {
                userId,
                matchedUserId
            })
            getNewUser()
        } catch (err) {
            console.log(err)
        }
    }

    // The code above defines two functions, swiped and outOfFrame, and a constant, filteredpreferedUsers. swiped takes in a 
    // Swipe and a swipedUserId, and if the Swipe is 'right', calls updateMatches with the swipedUserId. 
    // outOfFrame takes in a name and prints the name with ' left the screen!' concatenated to the console. 
    // filteredpreferedUsers is a constant that uses the .filter method on the preferedUsers array to return a new array with only 
    // the users that are not in the matchedUserIds array.
    const swiped = (Swipe, swipedUserId) => {
        if (Swipe === 'right') {
            updateMatches(swipedUserId)
        }
        setLastSwipe(Swipe)
    }
    const matchedUserIds = newUser?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredpreferedUsers = preferedUsers?.filter(preferedUser => !matchedUserIds.includes(preferedUser.user_id))

    // The code above is a functional component that renders a dashboard. The dashboard includes a chat container, 
    // a swipe container, and a card container. The chat container includes a chat window and a list of chat rooms. 
    // The swipe container contains Tinder cards that users can swipe left or right on. The card container displays the Tinder cards.
    return (
        <>
            {newUser &&
            <div className="control_panel">
                <div className="swipe-feature">
                    <div className="card-content">

                        {filteredpreferedUsers?.map((preferedUser) =>
                            <TinderCard
                                className="user-swipe"
                                key={preferedUser.user_id}
                                onSwipe={(dir) => swiped(dir, preferedUser.user_id)}>
                                <div
                                    style={{backgroundImage: "url(" + preferedUser.url + ")"}}
                                    className="user-card">
                                    <h3>{preferedUser.First_Name}</h3>
                                </div>
                            </TinderCard>
                        )}
                        <div className="swipe-content">
                            {lastSwipe ? <p>You swiped {lastSwipe}</p> : <p/>}
                        </div>
                    </div>
                </div>
                <ChatFeature user={newUser}/>
            </div>}
        </>
    )
}
export default ControlPanel