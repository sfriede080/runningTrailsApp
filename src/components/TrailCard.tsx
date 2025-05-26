import LikeButton from './LikeButton'
import './TrailCard.css'
import { useEffect, useState } from 'react'

type trailData = {
  id: string,
  fullName: string,
  description: string,
  directionsInfo: string,
  imagePath: string | null,
}

type TrailCardProps = {
  data: trailData,
  onLiked: (liked: boolean, data: trailData) => void,
  onClicked: (cardId: string) => void
}

const TrailCard: React.FC<TrailCardProps> = ({ data, onLiked, onClicked }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  function handleLiked() {
    const newLiked = !liked;
    setLiked(newLiked);
    onLiked(newLiked, data);
  }

  function handleClicked() {
    const newIsExpanded = !isExpanded
    if (newIsExpanded) {
      onClicked(data.id);
    }
    setIsExpanded(newIsExpanded);
  }


  useEffect(() => {
  }, [liked]); // only runs when `liked` changes

  return (
    <div>
      <div className='card' onClick={handleClicked}>
        <h5>{data.fullName} <LikeButton liked={liked} onLiked={handleLiked} /> </h5>

        {isExpanded &&
          (<>
            <p> {data.description}</p>
            {data.imagePath && (<img src={data.imagePath} alt="" />)}
            <p> Directions: {data.directionsInfo}</p>
          </>
          )
        }
      </div>
    </div>
  )
}

export default TrailCard;