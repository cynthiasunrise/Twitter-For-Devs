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
    const tweetsUnsubscribeCallback = firestore
      .collection('tweets')
      .onSnapshot((tweetSnapshot) => {
        const mappedtweets = tweetSnapshot.docs.map((tweetDoc) => {
          return {
            id: tweetDoc.id,
            text: tweetDoc.data().text,
            likes: tweetDoc.data().likes,
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
