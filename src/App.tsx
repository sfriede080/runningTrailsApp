import './App.css'
import Card from './components/TrailCard'
import SearchBar from './components/SearchBar'
import { useEffect, useReducer, useState } from 'react'

type trailData = {
  id: string,
  fullName: string,
  description: string,
  directionsInfo: string,
  imagePath: string | null,
}
type likedTrailsAction = {
  type: string,
  data: trailData
}

const likedTrailsReducer = (likedTrails: trailData[], action: likedTrailsAction): trailData[] => {
  switch (action.type) {
    case 'liked': {
      if (!likedTrails.includes(action.data)) {
        return [...likedTrails,
        {
          id: action.data.id,
          fullName: action.data.fullName,
          description: action.data.description,
          imagePath: action.data.imagePath,
          directionsInfo: action.data.directionsInfo
        }];
      } else {
        return likedTrails;
      }
    }
    case 'unliked': {
      return likedTrails.filter(t => t.id !== action.data.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [trailsData, setTrailsData] = useState<trailData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialLikedTrails: trailData[] = [];
  const [likedTrails, dispatch] = useReducer(likedTrailsReducer, initialLikedTrails);

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

      setTrailsData(responseJSON.data.map((datum: any) => {
        return (
          {
            id: datum["id"],
            fullName: datum["fullName"],
            description: datum["desciption"],
            imagePath: datum["images"] ? datum["images"][0]["url"] : null,
            directionsInfo: datum["directionsInfo"]
          }
        )

      }));
    } catch (error) {
      setErrorMessage('Error fetching trails. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTrails("");
  }, [])

  const handleSearchChange = (searchQuery: string) => {
    setSearchTerm(searchQuery)
  }

  const handleCardLiked = (liked: boolean, data: trailData): void => {
    if (liked) {
      dispatch({
        type: "liked",
        data: data
      })
    } else {
      dispatch({
        type: "unliked",
        data: data
      })
    }
  }
  console.log(likedTrails);


  return (
    <main>
      <div className='wrapper'>
        <header className='app-heading'>
          Best<span className='text-gradient'> Running Trails</span> in Oregon
        </header>
      </div>
      <div className='search-bar-container'>
        <br />
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} onSearch={fetchTrails} />
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
                  return (
                    <li key={data["id"]}>
                      <div className='card-container'>
                        <Card data={data} onLiked={handleCardLiked} />
                      </div>
                    </li>
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
