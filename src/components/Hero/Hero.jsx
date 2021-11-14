import useUserPreference from '../../hooks/useUserPreference';
import './Hero.css';

function Hero() {
  const { user, preference } = useUserPreference();

  return (
    <section className="hero">
      <div className="container hero__one_column">
        <img
          className="ornacia hero__ornacia"
          src={user ? user.photoURL : '/images/ornacia.jpg'}
          style={{ border: `5px solid ${preference.color}` }}
          alt="Profile canvas"
        />
        <h2 className="hero__title">
          <span style={{ backgroundColor: `${preference.color}` }}>
            {preference.username}
          </span>
        </h2>
      </div>
    </section>
  );
}

export default Hero;
