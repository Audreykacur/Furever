import { useCookies } from 'react-cookie'
import './ChatFeature.scss'

const ProfileHeader = ({ user }) => {
    const [ cookies, setCookie, removeCookie ] = useCookies(['fureverUser'])

    // The code above logs a user out by removing the UserId and AuthToken cookies, and then reloading the page.
    const logout = () => {
        removeCookie('FureverId', cookies.UserId)
        removeCookie('Authentication', cookies.AuthToken)
        window.location.reload()
    }

    // The code above renders a header for a chat container. The header includes the name and profile picture of the user, 
    // as well as a log-out icon.
    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"photo of " + user.first_name}/>
                </div>
                <h3>{user.First_Name}</h3>
            </div>
            <a href='/' className="home" style={{color: 'black'}}>Back</a>
        </div>
    )
}

export default ProfileHeader