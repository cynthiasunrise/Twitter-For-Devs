import { useLocation } from 'react-router';

function Hero() {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return (
      <section>
        <div></div>
        <div>
          <form onsubmit={handleSubmit}>
            <textarea></textarea>
            <button>POST</button>
          </form>
        </div>
      </section>
    );
  }
}

export default Hero;
