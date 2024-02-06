import banner from '@/assets/banner.png';
import topQualityShirts from '@/assets/topQualityShirts.png';
import tShirts from '@/assets/tShirts.png';
import { useCartStore } from '@/store/useCartStore';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Home() {
  const [queryParameters] = useSearchParams();
  const { reset } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const success = queryParameters.get('success');
    const canceled = queryParameters.get('canceled');

    if (success) {
      toast.success('Payment success');
      reset();
      return navigate('/');
    }
    if (canceled) {
      toast.error('Payment canceled');
      return navigate('/');
    }
  }, [navigate, queryParameters, reset]);

  return (
    <div className="mx-5 mb-10 pt-32 lg:pt-40 flex gap-20 flex-col">
      <div className="flex justify-center items-center">
        <img src={banner} className="w-11/12 lg:w-2/5" alt="" />
      </div>

      <div className="flex justify-around flex-wrap mx-5">
        <div className="lg:max-w-2xl flex flex-col gap-5">
          <h1 className="text-blue-500 uppercase text-xl italic lg:text-3xl font-bold">
            About our company
          </h1>

          <p className="text-sm lg:text-xl leading-relaxed indent-2">
            Specializing in soccer shirts and sporting goods, the online store
            came into being in 2024 in the city of salvador(ba) and brings
            together uniforms of the most varied Brazilian and international
            clubs and national teams - from the most famous to the least known.
          </p>
          <p className="text-sm lg:text-xl leading-relaxed indent-2">
            With the widest range of soccer shirts on the market market, ouv
            works in partnership with the main sports brands to brands to sell
            only original products with a quality guarantee. guaranteed quality.
          </p>
          <p className="text-sm lg:text-xl leading-relaxed indent-2">
            In addition, the store has security certificates that offer the
            customer a a reliable shopping environment.
          </p>
        </div>
        <img src={tShirts} alt="" className="mt-5 lg:w-4/12" />
      </div>

      <div className="flex justify-center items-center flex-col flex-wrap mx-5 gap-4">
        <h1 className="text-blue-500 uppercase text-xl lg:text-3xl italic font-bold">
          Our products
        </h1>

        <h2 className="uppercase text-lg lg:mt-3 lg:text-2xl italic text-center">
          High quality t-shirts
        </h2>
        <img src={topQualityShirts} className="mt-5" alt="" />
      </div>
    </div>
  );
}
