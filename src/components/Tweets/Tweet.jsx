import { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import useUserPreference from '../../hooks/useUserPreference';

function Tweet({ tweet }) {
  const { user } = useUserPreference();
  const [author, setAuthor] = useState({
    author: '',
    authorColor: '',
    authorPhoto: '',
  });

  useEffect(() => {
    const unSubscribe = (unsub) => unsub();

    const userPrefNestedUnsubscribeCallbacks = [];
    const userPrefUnsubscribeCallback = firestore
      .collection('user_preferences')
      .where('uid', '==', tweet.uid)
      .limit(1)
      .onSnapshot((userPrefSnapshot) => {
        userPrefNestedUnsubscribeCallbacks.forEach(unSubscribe);
        userPrefNestedUnsubscribeCallbacks.length = 0;
        const userPhotoUnsubscribeCallback = firestore
          .collection('user_photos')
          .where('id', '==', tweet.uid)
          .limit(1)
          .onSnapshot((userPhotoSnapshot) => {
            setAuthor({
              author: userPrefSnapshot.docs[0].data().username,
              authorColor: userPrefSnapshot.docs[0].data().color,
              authorPhoto: userPhotoSnapshot.docs[0].data().photoURL,
            });
          });
        userPrefNestedUnsubscribeCallbacks.push(userPhotoUnsubscribeCallback);
      });

    return () => {
      userPrefUnsubscribeCallback();
      userPrefNestedUnsubscribeCallbacks.forEach(unSubscribe);
    };
  }, []);

  const handleLike = (id, likes) => {
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
  };

  const formatCreatedDate = () => {
    return tweet.created
      ? tweet.created.toDate().toLocaleDateString('es-PE')
      : '';
  };

  return (
    <article className="tweet">
      <div className="tweet__left">
        <img
          className="ornacia tweet__ornacia"
          src={author.authorPhoto}
          style={{ border: `5px solid ${author.authorColor}` }}
          alt="User avatar"
        />
      </div>
      <div className="tweet__right">
        <div className="tweet__header">
          <span
            className="tweet__author"
            style={{ backgroundColor: `${author.authorColor}` }}
          >
            {author.author}
          </span>
          <span className="tweet__date">{formatCreatedDate()}</span>
          {user?.uid === tweet.uid && (
            <img
              className="tweet__delete"
              src="/images/trash.svg"
              alt="Delete Tweet"
            />
          )}
        </div>
        <p>{tweet.text}</p>
        <div className="tweet__footer">
          <img
            className="tweet__like"
            src={
              tweet.likes > 0 ? '/images/heart.svg' : '/images/empty_heart.svg'
            }
            alt="Likes"
            onClick={() => handleLike(tweet.id, tweet.likes)}
          />
          <span>{tweet.likes}</span>
        </div>
      </div>
    </article>
  );
}

export default Tweet;
