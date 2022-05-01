import Head from 'next/head'

export default function AppLayout(props) {
  return (
    <>
        <Head>
            <title>{ props.title }</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main className="min-h-screen">
            { props.children }
        </main>
        <style jsx>{`
          main {
            background-color: ${ props.bgColor };
          }
        `}</style>
    </>
  )
}