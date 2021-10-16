import { useLocation } from 'react-router';
import Header from '../../components/Header/';
import Hero from '../../components/Hero';
import Tweets from '../../components/Tweets';

function UserProfile() {
  console.log(useLocation());

  return (
    <>
      <Header />
      <Hero />
      <Tweets />
    </>
  );
}

export default UserProfile;
