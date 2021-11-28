import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Hero from '../../components/Layout/Hero';
import Tweets from '../../components/Tweets';
import { UserContext } from '../../contexts/UserContext';
import { firestore } from '../../firebase/firebase';

function MyPosts() {
  const [tweets, setTweets] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const tweetsUnsubscribeCallback = firestore
        .collection('tweets')
        .where('uid', '==', user.uid)
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
    }
  }, [user]);

  return (
    <>
      <Header />
      <Hero />
      <Tweets tweets={tweets} />
    </>
  );
}

export default MyPosts;
