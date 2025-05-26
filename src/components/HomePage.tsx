import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/search');
    };

    return (
        <div className="home-wrapper">
            <div className='home-content'>
                <header className='home-heading'>
                    Discover<span className='text-gradient'> Running Trails</span> in Oregon!
                </header>
                <button className="search-button" role="button" onClick={handleClick}>Search</button>
            </div>
        </div >
    )

}

export default HomePage;
