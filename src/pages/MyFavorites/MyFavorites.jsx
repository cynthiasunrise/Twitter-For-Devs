import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Hero from '../../components/Layout/Hero';
import Tweets from '../../components/Tweets';
import { UserContext } from '../../contexts/UserContext';
import { firestore, firestore_documentId } from '../../firebase/firebase';

function MyFavorites() {
  const [tweets, setTweets] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const unSubscribe = (unsub) => unsub();

      const favNestedUnsubscribeCallbacks = [];
      const favUnsubscribeCallback = firestore
        .collection('user_favorite_tweets')
        .where('uid', '==', user.uid)
        .onSnapshot((userFavSnapshot) => {
          const list = [];
          if (!userFavSnapshot.empty) {
            userFavSnapshot.docs.forEach((userFavDoc) => {
              const tweetsUnsubscribeCallback = firestore
                .collection('tweets')
                .where(firestore_documentId, '==', userFavDoc.data().tweetId)
                .onSnapshot((tweetsSnapshot) => {
                  tweetsSnapshot.docs.forEach((tweetDoc) => {
                    const newData = {
                      id: tweetDoc.id,
                      text: tweetDoc.data().text,
                      likes: tweetDoc.data().likes,
                      favorite: tweetDoc.data().favorite,
                      email: tweetDoc.data().email,
                      created: tweetDoc.data().created,
                      uid: tweetDoc.data().uid,
                    };
                    list.push({ ...newData });
                  });
                  //Updating my state
                  if (userFavSnapshot.docs.length === list.length) {
                    setTweets(list);
                  }
                });
              favNestedUnsubscribeCallbacks.push(tweetsUnsubscribeCallback);
            });
          } else {
            setTweets([]);
          }
        });

      return () => {
        favUnsubscribeCallback();
        favNestedUnsubscribeCallbacks.forEach(unSubscribe);
      };
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

export default MyFavorites;
