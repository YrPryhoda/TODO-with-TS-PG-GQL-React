import { useState, useEffect } from 'react'

export const useLoadAvatar = () => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    fetch('https://picsum.photos/seed/300/300').then(data =>
      setAvatar(data.url)
    );
  }, []);

  return {
    avatar
  }
}