import { useState ,useEffect} from 'react';

const useIconClick = () => {
  const [iconClicked, setIconClicked] = useState(false);

  const handleIconClick = () => {
    setTimeout(() => {
      setIconClicked(prev => !prev);
    }, 100);
  };

  return [ iconClicked, handleIconClick ];
};

export default useIconClick;
