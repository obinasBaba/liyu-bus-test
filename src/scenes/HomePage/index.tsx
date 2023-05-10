import Hero from './Hero';
import ActiveRoutes from './ActiveRoutes';
import Partners from './Partners';
import s from './home.module.scss';

const HomePage = () => {
  return (
    <div className={s.home_container}>
      <Hero />

      <ActiveRoutes />

      <Partners />
    </div>
  );
};

export default HomePage;
