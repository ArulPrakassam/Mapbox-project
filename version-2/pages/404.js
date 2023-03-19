import Head from "next/head";

export default function Error() {
  return (
    <>
      <Head>
        <title>404 - Not found</title>
      </Head>
      <div className="error-page">
        <h1>404</h1>
        <p>Sorry. Page Not found</p>
      </div>
    </>
  );
}
