import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Tweets from '../../components/Tweets';
import { UserContext } from '../../contexts/UserContext';
import { firestore, firestore_serverTimestamp } from '../../firebase/firebase';

function MyFeed() {
  const [tweets, setTweets] = useState([]);
  const { user } = useContext(UserContext);
  const defaultTweet = {
    text: '',
    likes: 0,
    email: '',
    created: firestore_serverTimestamp,
    uid: '',
  };
  const [tweet, setTweet] = useState(defaultTweet);

  useEffect(() => {
    console.log('SE ESTÁ EJECUTANDO EL USEEFFECT, POR ENDE EL ONSNAPSHOT');
    const cancelSuscription = firestore
      .collection('tweets')
      .onSnapshot((snapshot) => {
        const mappedTweets = snapshot.docs.map(async (doc) => {
          console.log('Itero tweet');
          const promises = [];
          const tweetMappped = {
            text: doc.data().text,
            likes: doc.data().likes,
            email: doc.data().email,
            created: doc.data().created,
            uid: doc.data().uid,
            id: doc.id,
          };

          const userPreferencePromise = firestore
            .collection('user_preferences')
            .where('uid', '==', tweetMappped.uid)
            .get();

          const userPhotoPromise = firestore
            .collection('user_photos')
            .where('id', '==', tweetMappped.uid)
            .get();

          promises.push(userPreferencePromise);
          promises.push(userPhotoPromise);

          const resp = await Promise.all(promises).then((results) => {
            const authorPreference = results[0].docs.map((doc) => {
              return {
                username: doc.data().username,
                color: doc.data().color,
              };
            });

            const authorPhoto = results[1].docs.map((doc) => {
              return {
                photoURL: doc.data().photoURL,
              };
            });

            return {
              ...tweetMappped,
              author: authorPreference[0].username,
              authorColor: authorPreference[0].color,
              authorPhoto: authorPhoto[0].photoURL,
            };
          });
          console.log(resp);
          return resp;
          // tempTweets.push([...tempTweets, resp]);
        });
        console.log('Seteo estado TWEETS');
        console.log(mappedTweets);
        setTweets(mappedTweets);
        return () => cancelSuscription();
      });
  }, []);

  const handleTweetPostChange = (e) => {
    setTweet({
      ...tweet,
      email: user.email,
      uid: user.uid,
      text: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection('tweets').add(tweet);
    setTweet(defaultTweet);
  };

  return (
    <>
      <Header />
      <section className="hero">
        <div className="container hero__two_columns">
          <div className="hero__left">
            <img
              className="ornacia hero__ornacia"
              src={user ? user.photoURL : '/images/ornacia.jpg'}
              alt="Profile Pic"
            />
          </div>
          <div className="hero__right">
            <form className="hero__form" onSubmit={handleSubmit}>
              <textarea
                className="hero__input input-text"
                placeholder="What's happening?"
                value={tweet.text}
                onChange={handleTweetPostChange}
              ></textarea>
              <button type="submit" className="btn btn-green hero__button">
                POST
              </button>
            </form>
          </div>
        </div>
      </section>
      {tweets?.length > 0 && <Tweets tweets={tweets} />}
    </>
  );
}

export default MyFeed;
