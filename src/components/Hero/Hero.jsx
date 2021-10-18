import { useLocation } from 'react-router';
import './Hero.css';

function Hero() {
  const { pathname } = useLocation();

  const handleSubmit = () => {};

  if (pathname === '/') {
    return (
      <section className="hero">
        <div className="container hero__two_columns">
          <div className="hero__left">
            <img
              className="ornacia hero__img_profile"
              src="/images/ornacia.jpg"
              alt="Profile Pic"
            />
          </div>
          <div className="hero__right">
            <form className="hero__form" onSubmit={handleSubmit}>
              <textarea
                className="hero__input input-text"
                placeholder="What's happening?"
              ></textarea>
              <button className="btn hero__button">POST</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="hero">
      <div className="container hero__one_column">
        <img
          width="100px"
          className="ornacia hero__ornacia"
          src="/images/ornacia.jpg"
          alt="Profile canvas"
        />
        <h2 className="hero__title">USERNAME</h2>
      </div>
    </section>
  );
}

export default Hero;
