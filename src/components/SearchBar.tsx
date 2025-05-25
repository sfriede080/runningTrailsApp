import { FaSearch } from "react-icons/fa"
import "./SearchBar.css"

type SearchBarProps = {
    searchTerm: string,
    onSearchChange: (searchQuery: string) => void;
    onSearch: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.onSearch(props.searchTerm);
        }
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                className="search-input"
                type='text'
                placeholder='Search for trails...'
                value={props.searchTerm}
                onChange={(event) => { props.onSearchChange(event.target.value) }}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default SearchBar