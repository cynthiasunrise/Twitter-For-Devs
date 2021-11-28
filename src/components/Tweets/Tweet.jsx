import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from './../../firebase/firebase';
import useUserPreference from './../../hooks/useUserPreference';
import { Loading } from './../Loading';
import PopupDialog from './../PopupDialog';

function Tweet({ tweet }) {
  const { user } = useUserPreference();
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState({
    author: '',
    authorColor: '',
    authorPhoto: '',
    authorFavorite: false,
    authorFavoriteId: '',
  });
  const [dialog, setDialog] = useState({
    show: false,
    title: '',
  });

  useEffect(() => {
    let userPhotoUnsubscribeCallback, userFavoriteUnsubscribeCallback;
    const userPrefUnsubscribeCallback = firestore
      .collection('user_preferences')
      .where('uid', '==', tweet.uid)
      .limit(1)
      .onSnapshot((userPrefSnapshot) => {
        userPhotoUnsubscribeCallback = firestore
          .collection('user_photos')
          .where('id', '==', tweet.uid)
          .limit(1)
          .onSnapshot((userPhotoSnapshot) => {
            userFavoriteUnsubscribeCallback = firestore
              .collection('user_favorite_tweets')
              .where('tweetId', '==', tweet.id)
              .where('uid', '==', user.uid)
              .limit(1)
              .onSnapshot((userFavoriteSnapshot) => {
                setAuthor({
                  author: userPrefSnapshot.docs[0].data().username,
                  authorColor: userPrefSnapshot.docs[0].data().color,
                  authorPhoto: userPhotoSnapshot.docs[0].data().photoURL,
                  authorFavorite:
                    userFavoriteSnapshot.docs.length > 0 ? true : false,
                  authorFavoriteId:
                    userFavoriteSnapshot.docs.length > 0
                      ? userFavoriteSnapshot.docs[0].id
                      : '',
                });
                setLoading(false);
              });
          });
      });

    return () => {
      userPrefUnsubscribeCallback();
      userPhotoUnsubscribeCallback();
      userFavoriteUnsubscribeCallback();
    };
  }, [tweet.uid, tweet.id, user.uid]);

  const handleLike = (id, likes) => {
    const newFavoriteState = !author.authorFavorite;

    if (newFavoriteState) {
      firestore
        .collection('user_favorite_tweets')
        .add({ tweetId: tweet.id, uid: user.uid });

      firestore.doc(`tweets/${id}`).update({
        likes: likes + 1,
      });
    } else {
      firestore.doc(`tweets/${id}`).update({
        likes: likes - 1,
      });
      firestore.doc(`user_favorite_tweets/${author.authorFavoriteId}`).delete();
    }
  };

  const handleDelete = (id) => {
    setDialog({ ...dialog, show: false });
    firestore.doc(`tweets/${id}`).delete();
    firestore
      .collection('user_favorite_tweets')
      .where('tweetId', '==', tweet.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  };

  const formatCreatedDate = () => {
    return tweet.created
      ? tweet.created.toDate().toLocaleDateString('es-PE')
      : '';
  };

  return (
    <>
      <article className="tweet">
        {loading && <Loading className="loading" fill="pink" stroke="" />}
        {!loading && (
          <>
            <div className="tweet__left">
              <Link
                to={tweet.uid === user.uid ? '/posts' : `/profile/${tweet.uid}`}
              >
                <img
                  className="ornacia tweet__ornacia"
                  src={author.authorPhoto}
                  style={{ border: `5px solid ${author.authorColor}` }}
                  alt="User avatar"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </div>
            <div className="tweet__right">
              <div className="tweet__header">
                <Link
                  to={
                    tweet.uid === user.uid ? '/posts' : `/profile/${tweet.uid}`
                  }
                  className="tweet__author"
                  style={{ backgroundColor: `${author.authorColor}` }}
                >
                  {author.author}
                </Link>
                <span className="tweet__date">{formatCreatedDate()}</span>
                {user?.uid === tweet.uid && (
                  <img
                    className="tweet__delete"
                    src="/images/trash.svg"
                    alt="Delete Tweet"
                    onClick={() => {
                      setDialog({
                        show: true,
                        title: 'Estás seguro de eliminar este tweet?',
                      });
                    }}
                  />
                )}
              </div>
              <p>{tweet.text}</p>
              <div className="tweet__footer">
                <img
                  className="tweet__like"
                  src={
                    author.authorFavorite
                      ? '/images/heart.svg'
                      : '/images/empty_heart.svg'
                  }
                  alt="Likes"
                  onClick={() => handleLike(tweet.id, tweet.likes)}
                />
                <span>{tweet.likes}</span>
              </div>
            </div>
          </>
        )}
      </article>
      {dialog.show && (
        <PopupDialog
          dialog={dialog}
          setDialog={setDialog}
          handleDelete={() => handleDelete(tweet.id)}
        />
      )}
    </>
  );
}

export default Tweet;
