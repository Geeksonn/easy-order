import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap'
                    rel='stylesheet'
                />
                <link rel='stylesheet' href='https://use.typekit.net/jys2xij.css' />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
};

export default Document;