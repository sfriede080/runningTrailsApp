import { FaHeart } from 'react-icons/fa'

type LikeButtonProps = {
  liked: boolean,
  onLiked: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ liked, onLiked }) => {

  function handleLiked(e: React.MouseEvent): void {
    e.stopPropagation();
    onLiked();
  }

  if (liked)
    return (<FaHeart
      color="red"
      size="20"
      onClick={handleLiked}
    />)
  return (<FaHeart
    color="gray"
    size="20"
    onClick={handleLiked}
  />)
}

export default LikeButton