import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import './ChatFeature.scss'

const MatchesDisplay = ({ matches, setselectedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);


  // The code below is retrieving data from the "users" endpoint on a local server. It is then mapping the response to only 
  // return the "user_id" key and setting the state of "matchedProfiles" to the response data.
  const usersMatchesByID = matches.map(({ user_id }) => user_id);
  const userId = cookies.UserId;

  const getUserMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8888/users", {
        params: { userIds: JSON.stringify(usersMatchesByID) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // The code below gets the matches and then filters the matched profiles by the user ID. It then sets the state of
  // "matchedProfiles" to the filtered response data.
  useEffect(() => {
    getUserMatches();
  }, [matches]);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id === userId)
        .length > 0
  );

  // It renders a list of matches, where each match has an image, name, and index. When you click on a match, 
  // it sets the clicked user to that match.
  return (
    <div className="matches-display">
      {filteredMatchedProfiles?.map((match, _index) => (
        <div
          key={_index}
          className="match-card"
          onClick={() => setselectedUser(match)}
        >
          <div className="img-container">
            <img src={match?.url} alt={match?.First_Name + " profile"} />
          </div>
          <h3>{match?.First_Name}</h3>
          <h3>{match?.Phone_Number}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;