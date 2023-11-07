import { About, Banner, Title } from './styled.index';

import ouvBanner from '/public/banner.png';
import ouvShirts from '/public/shirts.png';

import Image from 'next/image';
export default function Page() {
    return (
        <>
            <Banner>
                <Image src={ouvBanner} alt="banner" />
            </Banner>

            <About>
                <div className="about-text ms-5">
                    <Title className="mb-5">Sobre a nossa empresa</Title>
                    <p>
                        ESPECIALIZADA EM CAMISAS DE FUTEBOL E ARTIGOS
                        ESPORTIVOS, A LOJA VIRTUAL SURGIU EM 2022 NA CIDADE DE
                        SALVADOR(BA) E REÚNE UNIFORMES COMPLETOS DOS MAIS
                        VARIADOS CLUBES BRASILEIROS, INTERNACIONAIS E SELEÇÕES -
                        DOS MAIS CONSAGRADOS AOS MENOS CONHECIDOS. COM A MAIOR
                        VARIEDADE EM CAMISAS DE TIMES DE FUTEBOL NO MERCADO
                        NACIONAL, A OUV TRABALHA EM PARCERIA COM AS PRINCIPAIS
                        MARCAS ESPORTIVAS PARA COMERCIALIZAR SOMENTE PRODUTOS
                        ORIGINAIS E COM GARANTIA DE QUALIDADE. ALÉM DISSO, A
                        LOJA POSSUI CERTIFICADOS DE SEGURANÇA QUE OFERECEM AO
                        CLIENTE UM AMBIENTE DE COMPRA CONFIÁVEL.
                    </p>
                </div>
                <div className="about-image me-5">
                    <Image src={ouvShirts} alt="shirts"></Image>
                </div>
            </About>
        </>
    );
}
