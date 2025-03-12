import Image from 'next/image';
import Instagram from '@/public/images/pngs/Instagram.png';
import Link2 from '@/public/images/pngs/Link.png';
import Twitter from '@/public/images/pngs/Twitter.png';
import Youtube from '@/public/images/pngs/Youtube.png';
import GitHub from '@/public/images/pngs/Github.png';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="flex items-center  p-4 border-t  dark:text-black">
      <Image className="px-2 py-2" src={Twitter} alt="설명"/>
      <Image className="px-2 py-2" src={Youtube} alt="설명"/>
      <Image className="px-2 py-2" src={Instagram} alt="설명"/>
      <Link href="https://www.figma.com/design/7Spt0Q3X3logSoTlqLEkBk/remember_cook?node-id=0-1&p=f&t=qkxvPJ5HhZPXuvwP-0">
      <Image className="px-2 py-2" src={Link2} alt="설명"/>
      </Link>
      <Link href="https://github.com/jun950829/nyamnyam-frontend.git">
      <Image className="px-2 py-2" src={GitHub} alt="설명"/>
      </Link>


      {/* <h1 className="text-2xl">Footer</h1> */}
    </footer>
  );
}