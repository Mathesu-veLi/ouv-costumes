import banner from '@/assets/banner.png';

export function About() {
  return (
    <div className="mx-5 mb-10 pt-32 lg:pt-40">
      <div className="flex justify-center items-center">
        <img src={banner} className="w-11/12 lg:w-2/5" alt="" />
      </div>

      <div className="flex flex-wrap mt-10 mx-5">
        <h1 className="text-blue-500 uppercase text-xl italic">
          Sobre a nossa empresa
        </h1>

        <p className="mt-4 text-sm leading-relaxed indent-2">
          Especializada em camisas de futebol e artigos esportivos, a loja
          virtual surgiu em 2024 na cidade de salvador(ba) e reúne uniformes
          completos dos mais variados clubes brasileiros, internacionais e
          seleções - dos mais consagrados aos menos conhecidos.
        </p>
        <p className="mt-4 text-sm leading-relaxed indent-2">
          Com a maior variedade em camisas de times de futebol no mercado
          nacional, a ouv trabalha em parceria com as principais marcas
          esportivas para comercializar somente produtos originais e com
          garantia de qualidade.
        </p>
        <p className="mt-4 text-sm leading-relaxed indent-2">
          Além disso, a loja possui certificados de segurança que oferecem ao
          cliente um ambiente de compra confiável.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 mx-5">
        <h1 className="text-blue-500 uppercase text-xl italic">
          Nossos produtos
        </h1>

        <h2 className="uppercase text-base italic">
          Camisas de alta qualidade
        </h2>
      </div>
    </div>
  );
}
