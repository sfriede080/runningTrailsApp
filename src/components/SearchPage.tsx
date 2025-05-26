import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import TrailCard from "./TrailCard";
import { useNavigate } from "react-router-dom";


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

type SearchPageProps = {
    likedTrailsDispatch: React.Dispatch<likedTrailsAction>;
}

const SearchPage: React.FC<SearchPageProps> = ({ likedTrailsDispatch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [trailsData, setTrailsData] = useState<trailData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const cardsRef = useRef<Map<string, any> | null>(null);

    const handleHeadingClick = () => {
        navigate('/');
    };

    const scrollToCard = (cardId: string): void => {
        const map = getMap();
        const node = map.get(cardId);
        node.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }

    const getMap = (): Map<string, any> => {
        if (!cardsRef.current) {
            // Initialize the Map on first usage.
            cardsRef.current = new Map();
        }
        return cardsRef.current;
    }


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
                        description: datum["description"],
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
            likedTrailsDispatch({
                type: "liked",
                data: data
            })
        } else {
            likedTrailsDispatch({
                type: "unliked",
                data: data
            })
        }
    }

    const handleCardClicked = (cardId: string): void => {
        scrollToCard(cardId);
    }

    return (
        <div>
            <div className='wrapper' onClick={handleHeadingClick}>
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
                                        <li
                                            key={data["id"]}
                                            ref={(node) => {
                                                const map = getMap();
                                                map.set(data["id"], node);

                                                return () => {
                                                    map.delete(data["id"]);
                                                };
                                            }}>
                                            <div className='card-container'>
                                                <TrailCard data={data} onLiked={handleCardLiked} onClicked={handleCardClicked} />
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                        </section>
                    )
            }
        </div >
    )

}

export default SearchPage;
