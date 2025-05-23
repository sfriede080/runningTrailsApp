import { FaHeart } from 'react-icons/fa'

type LikeButtonProps = {
    liked: boolean,
    setLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

const LikeButton: React.FC<LikeButtonProps> = ({ liked, setLiked }) => {
  if(liked)
    return (<FaHeart 
      color="red" 
      size="20" 
      onClick={() => {setLiked((prevLiked) =>  !prevLiked)}}
      />)
  return (<FaHeart 
    color="gray" 
    size="20" 
    onClick={() => {setLiked((prevLiked) =>  !prevLiked)}}
    />)
}

export default LikeButton