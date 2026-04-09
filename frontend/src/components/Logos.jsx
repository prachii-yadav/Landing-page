import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

import booking  from '../assets/logos/Booking.com_logo.svg';
import cartoon  from '../assets/logos/Cartoon_Network_logo.svg';
import cocacola from '../assets/logos/CocaCola_logo.svg';
import dropbox  from '../assets/logos/Dropbox_logo.svg';
import netflix  from '../assets/logos/Netflix_logo.svg';
import redbull  from '../assets/logos/RedBull_logo.svg';
import slack    from '../assets/logos/Slack_logo.svg';
import spotify  from '../assets/logos/Spotify_logo.svg';
import toshiba  from '../assets/logos/Toshiba_logo.svg';

const LOGOS = [
  { src: cartoon,  alt: 'Cartoon Network' },
  { src: booking,  alt: 'Booking.com'     },
  { src: dropbox,  alt: 'Dropbox'         },
  { src: toshiba,  alt: 'Toshiba'         },
  { src: slack,    alt: 'Slack'           },
  { src: netflix,  alt: 'Netflix'         },
  { src: spotify,  alt: 'Spotify'         },
  { src: cocacola, alt: 'Coca-Cola'       },
  { src: redbull,  alt: 'Red Bull'        },
];

export default function Logos() {
  const itemRefs = useRef([]);

  const sectionRef = useIntersectionObserver((el) => {
    el.classList.add('section-visible');

    // Stagger logos in: each 80ms apart
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      setTimeout(() => item.classList.add('logo-visible'), i * 80);
    });
  }, { threshold: 0.2 });

  return (
    <div className="logos" ref={sectionRef}>
      <div className="logos-track">
        {LOGOS.map(({ src, alt }, i) => (
          <div
            className="logo-item"
            key={`${alt}-${i}`}
            ref={(el) => (itemRefs.current[i] = el)}
          >
            <img src={src} alt={alt} height="32" />
          </div>
        ))}
      </div>
    </div>
  );
}
