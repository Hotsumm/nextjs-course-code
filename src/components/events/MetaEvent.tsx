import Head from 'next/head';

type MetaEventProps = {
  title: string;
  description?: string;
};

export default function MetaEvent({ title, description }: MetaEventProps) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
}
