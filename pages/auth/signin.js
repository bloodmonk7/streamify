import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import Loader from '../../components/Loader';

function Signin({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
      <Head>
        <title>Login - Chord</title>
        <link rel="icon" href="/streamlit.ico" />
      </Head>
      <Image
        src="https://cdn.svgporn.com/logos/streamlit.svg"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="text-white py-4 px-6 rounded-full bg-[#cb5050] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#c83636]"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name} API
          </button>
        </div>
      ))}
    </div>
  );
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
