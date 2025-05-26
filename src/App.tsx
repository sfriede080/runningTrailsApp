import './App.css'
import HomePage from './components/HomePage'
import SearchPage from './components/SearchPage'
import {
  Routes,
  Route,
} from "react-router-dom";
import { useReducer } from 'react';

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

  const initialLikedTrails: trailData[] = [];
  const [likedTrails, dispatch] = useReducer(likedTrailsReducer, initialLikedTrails);

  console.log(likedTrails);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/search' element={<SearchPage likedTrailsDispatch={dispatch} />} />
    </Routes >
  )
}
export default App
