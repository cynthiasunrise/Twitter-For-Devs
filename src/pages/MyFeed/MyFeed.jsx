import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Tweets from '../../components/Tweets';
import { UserContext } from '../../contexts/UserContext';
import { firestore, firestore_serverTimestamp } from '../../firebase/firebase';

const defaultTweet = {
  text: '',
  likes: 0,
  favorite: false,
  created: firestore_serverTimestamp,
};

function MyFeed() {
  const [tweets, setTweets] = useState([]);
  const { user } = useContext(UserContext);
  const [tweet, setTweet] = useState(defaultTweet);
  const [error, setError] = useState('');

  useEffect(() => {
    const tweetsUnsubscribeCallback = firestore
      .collection('tweets')
      .onSnapshot((tweetSnapshot) => {
        const mappedtweets = tweetSnapshot.docs.map((tweetDoc) => {
          return {
            id: tweetDoc.id,
            text: tweetDoc.data().text,
            likes: tweetDoc.data().likes,
            favorite: tweetDoc.data().favorite,
            email: tweetDoc.data().email,
            created: tweetDoc.data().created,
            uid: tweetDoc.data().uid,
          };
        });
        setTweets(mappedtweets);
      });

    return () => tweetsUnsubscribeCallback();
  }, []);

  const handleTweetPostChange = (e) => {
    setTweet((c) => ({
      ...c,
      text: e.target.value,
      email: user.email,
      uid: user.uid,
    }));
    e.target.value.length > 200
      ? setError('Limit is 200 characthers')
      : setError('');
  };

  const validate = () => {
    if (tweet.text.length < 4) {
      setError('You have to enter a post with minimum 4 characthers');
      return false;
    } else if (tweet.text.length > 200) {
      setError('Limit is 200 characthers');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      firestore.collection('tweets').add(tweet);
      setTweet(defaultTweet);
    }
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
              referrerPolicy="no-referrer"
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
              {error && <span className="error">{error}</span>}
              <button type="submit" className="btn btn-green hero__button">
                POST
              </button>
            </form>
          </div>
        </div>
      </section>
      <Tweets tweets={tweets} />
    </>
  );
}

export default MyFeed;
