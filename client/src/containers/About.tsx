import banner from '@/assets/banner.png';
import topQualityShirts from '@/assets/topQualityShirts.png';
import tshirts from '@/assets/tshirts.png';

export function About() {
  return (
    <div className="mx-5 mb-10 pt-32 lg:pt-40 flex gap-20 flex-col">
      <div className="flex justify-center items-center">
        <img src={banner} className="w-11/12 lg:w-2/5" alt="" />
      </div>

      <div className="flex justify-around flex-wrap mx-5">
        <div className="lg:max-w-2xl flex flex-col gap-5">
          <h1 className="text-blue-500 uppercase text-xl italic lg:text-3xl font-bold">
            Sobre a nossa empresa
          </h1>

          <p className="text-sm lg:text-xl leading-relaxed indent-2">
            Especializada em camisas de futebol e artigos esportivos, a loja
            virtual surgiu em 2024 na cidade de salvador(ba) e reúne uniformes
            completos dos mais variados clubes brasileiros, internacionais e
            seleções - dos mais consagrados aos menos conhecidos.
          </p>
          <p className="text-sm lg:text-xl leading-relaxed indent-2">
            Com a maior variedade em camisas de times de futebol no mercado
            nacional, a ouv trabalha em parceria com as principais marcas
            esportivas para comercializar somente produtos originais e com
            garantia de qualidade.
          </p>
          <p className="text-sm lg:text-xl leading-relaxed indent-2">
            Além disso, a loja possui certificados de segurança que oferecem ao
            cliente um ambiente de compra confiável.
          </p>
        </div>
        <img src={tshirts} alt="" className="mt-5 lg:w-4/12" />
      </div>

      <div className="flex justify-center items-center flex-col flex-wrap mx-5 gap-4">
        <h1 className="text-blue-500 uppercase text-xl lg:text-3xl italic font-bold">
          Nossos produtos
        </h1>

        <h2 className="uppercase text-lg lg:mt-3 lg:text-2xl italic text-center">
          Camisetas de alta qualidade
        </h2>
        <img src={topQualityShirts} className="mt-5" alt="" />
      </div>
    </div>
  );
}
