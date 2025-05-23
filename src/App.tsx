import './App.css'
import Card from './components/TrailCard'
import SearchBar from './components/SearchBar'
import { useEffect, useState } from 'react'

const App = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [trailsData, setTrailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = 'https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?stateCode=OR';
  const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
  const NPS_API_KEY = import.meta.env.VITE_NPS_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com',
      'x-rapidapi-key': RAPID_API_KEY,
      'x-api-key': NPS_API_KEY,
      accept: 'application/json'
    }
  };

  useEffect(() => {
    fetchTrails("");
  }, [])

  const fetchTrails = async (searchQuery: string) => {
    setIsLoading(true);
    let SEARCH_URL = API_BASE_URL;
    SEARCH_URL = searchQuery.length > 0 ? `${SEARCH_URL}&q=${searchQuery}` : SEARCH_URL
    try {
      const response = await fetch(SEARCH_URL, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseJSON = await response.json();
      if (responseJSON.Response == "False") {
        setErrorMessage('Error fetching trails. Please try again later.');
        setTrailsData([]);
        return;
      }

      setTrailsData(responseJSON.data);
      console.log(trailsData);
    } catch (error) {
      setErrorMessage('Error fetching trails. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <div className='wrapper'>
        <header className='app-heading'>
          Best<span className='text-gradient'> Running Trails</span> in Oregon
        </header>
      </div>
      <div className='search-bar-container'>
        <br />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={fetchTrails} />
        <br />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      )
        : errorMessage ? (
          <p> {errorMessage} </p>
        )
          : (
            <section>
              <ul>
                {trailsData.map((data) => {
                  let imagePath = data["images"] ? data["images"][0]["url"] : null;
                  return (
                    <div className='card-container'>
                      <Card title={data["fullName"]}>
                        <p> {data["description"]}</p>
                        {imagePath && <img src={imagePath} alt="" />}
                        <p> Directions: {data["directionsInfo"]}</p>
                      </Card>
                    </div>
                  )
                })}
              </ul>

            </section>
          )
      }
    </main >
  )
}
export default App
