import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Layout/Header';
import Hero from '../../components/Layout/Hero';
import Tweets from '../../components/Tweets';
import { firestore } from '../../firebase/firebase';

function UserProfile() {
  const [tweets, setTweets] = useState([]);
  const { profileId } = useParams();

  useEffect(() => {
    const tweetsUnsubscribeCallback = firestore
      .collection('tweets')
      .where('uid', '==', profileId)
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
  }, [profileId]);

  return (
    <>
      <Header />
      <Hero />
      <Tweets tweets={tweets} />
    </>
  );
}

export default UserProfile;
