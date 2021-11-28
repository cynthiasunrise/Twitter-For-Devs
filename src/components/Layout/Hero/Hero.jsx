import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { firestore } from '../../../firebase/firebase';
import useUserPreference from '../../../hooks/useUserPreference';
import { Loading } from './../../Loading';
import './Hero.css';

function Hero() {
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState({
    author: '',
    authorColor: '',
    authorPhoto: '',
  });
  const { user, preference, loadingPreference } = useUserPreference();
  const { pathname } = useLocation();
  const { profileId } = useParams();

  useEffect(() => {
    if (pathname.includes('/profile')) {
      let userPhotoUnsubscribeCallback;
      const userPrefUnsubscribeCallback = firestore
        .collection('user_preferences')
        .where('uid', '==', profileId)
        .limit(1)
        .onSnapshot((userPrefSnapshot) => {
          userPhotoUnsubscribeCallback = firestore
            .collection('user_photos')
            .where('id', '==', profileId)
            .limit(1)
            .onSnapshot((userPhotoSnapshot) => {
              setAuthor({
                author: userPrefSnapshot.docs[0].data().username,
                authorColor: userPrefSnapshot.docs[0].data().color,
                authorPhoto: userPhotoSnapshot.docs[0].data().photoURL,
              });
              setLoading(false);
            });
        });

      return () => {
        userPrefUnsubscribeCallback();
        userPhotoUnsubscribeCallback();
      };
    }
  }, [pathname, profileId]);

  //-----------Render Functions-------------
  const getProfileResources = () => {
    if (pathname.includes('/profile')) {
      return {
        photo: author.authorPhoto,
        color: author.authorColor,
        username: author.author,
      };
    }
    return {
      photo: user ? user.photoURL : '/images/ornacia.jpg',
      color: preference.color || 'transparent',
      username: preference.username || '',
    };
  };

  return (
    <section className="hero">
      <div className="container hero__one_column">
        {(pathname.includes('/profile') && loadingPreference && loading) ||
        (!pathname.includes('/profile') && loadingPreference) ? (
          <Loading className="loading" fill="pink" stroke="" />
        ) : (
          <>
            <img
              className="ornacia hero__ornacia"
              src={getProfileResources().photo}
              style={{ border: `5px solid ${getProfileResources().color}` }}
              alt="Profile canvas"
              referrerPolicy="no-referrer"
            />
            <h2 className="hero__title">
              <span
                style={{ backgroundColor: `${getProfileResources().color}` }}
              >
                {getProfileResources().username}
              </span>
            </h2>
          </>
        )}
      </div>
    </section>
  );
}

export default Hero;
