import s from './footer.module.scss';
import clsx from 'clsx';
import { Typography } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Telegram } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const footerRows = [
  {
    title: 'Information',
    links: [
      { text: ' Our Company', link: '/' },
      { text: 'Our Service', link: '/' },
      {
        text: 'Why We?',
        link: '/',
      },
      {
        text: 'Carrier',
        link: '/',
      },
    ],
  },
  {
    title: 'Quick Link',
    links: [
      { text: 'About', link: '/' },
      { text: 'Service Providers', link: '/' },
      {
        text: 'Booking',
        link: '/',
      },
      { text: 'Contact', link: '/' },
    ],
  },
  {
    title: 'Support',
    links: [
      { text: 'Online Support', link: '/' },
      { text: 'Contact', link: '/' },
      {
        text: 'Refund',
        link: '/',
      },
      { text: 'FAQ', link: '/' },
    ],
  },
  {
    title: 'Store Information',
    links: [
      { text: 'Addis Ababa, Ethiopia', link: '/' },
      { text: '1000, Mexico', link: '/' },
      {
        text: ' Info@che.et',
        link: '/',
      },
      { text: '+251 966 638 785', link: '/' },
    ],
  },
];

const Footer = ({ background = 'black' }) => {
  // #464646
  return (
    <footer className={clsx([s.container])}>
      <div className={clsx([s.bg, "bg-[url('/public/img/paths.png')]"])} />

      <div className={s.wrapper}>
        <div className={s.row_wrapper}>
          {footerRows.map((row, idx) => (
            <div className={s.row} key={idx}>
              <Typography variant="h6"> {row.title} </Typography>
              <ul className={s.list}>
                {row.links.map(link => (
                  <li className={s.list_item} key={link.text}>
                    <Link to="/">{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className={s.bottom}>
          <div className="flex flex-col">
            <span className="text-xs tracking-tighter text-[#FF6B1b]">
              Powered By
            </span>
            <span className="text-xl tracking-[.3rem] uppercase -mb-2 mt-2">
              Guzo
            </span>
            <Typography
              variant="h5"
              className="tracking-[.2rem] text-[#FF6B1b]"
            >
              Mobility
            </Typography>
          </div>

          <div className={s.social}>
            <Link to={'/'}>
              <Facebook fontSize="large" />
            </Link>
            <Link to={'/'}>
              <Instagram fontSize="large" />
            </Link>
            <Link to={'/'}>
              <LinkedIn fontSize="large" />
            </Link>
            <Link to={'/'}>
              <Telegram fontSize="large" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
