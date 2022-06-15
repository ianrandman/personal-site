import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faStrava } from '@fortawesome/free-brands-svg-icons/faStrava';
// See https://fontawesome.com/icons?d=gallery&s=brands,regular&m=free
// to add other icons.

const data = [
  {
    link: 'https://github.com/ianrandman',
    label: 'Github',
    icon: faGithub,
  },
  {
    link: 'https://www.facebook.com/ianrandman',
    label: 'Facebook',
    icon: faFacebookF,
  },
  {
    link: 'https://www.instagram.com/ianrandman',
    label: 'Instagram',
    icon: faInstagram,
  },
  {
    link: 'https://www.linkedin.com/in/ianrandman',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    link: 'mailto:ianrandman@gmail.com',
    label: 'Email',
    icon: faEnvelope,
  },
  {
    link: 'https://www.strava.com/athletes/ianrandman',
    label: 'Strava',
    icon: faStrava,
  },
];

export default data;
