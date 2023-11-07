import { Banner } from './styled.index';
import ouvBanner from '/public/banner.png';

import Image from 'next/image';
export default function Page() {
    return (
        <Banner>
            <Image src={ouvBanner} alt="banner" />
        </Banner>
    );
}
