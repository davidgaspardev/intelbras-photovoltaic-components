import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {

    static async getInitialProps(context: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = context.renderPage;
    
        try {
          context.renderPage = () => originalRenderPage({
            enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
          });
    
          const initialProps = await Document.getInitialProps(context)
          return {
            ...initialProps,
            styles: (
              <>
                {initialProps.styles}
                {sheet.getStyleElement()}
              </>
            ),
          };
        } finally {
          sheet.seal();
        }
      }
    

    render() {
        return (
            <Html lang="pt" id="light">
                <Head>
                    {/* metadata */}
                    <meta charSet="utf-8"/>
                    <meta name="theme-color" content="#4FAE72"/>
                    <meta
                      name="description"
                      content="Intelbras Project"/>

                    <meta
                      property="og:title"
                      content="Intelbras Photovoltaic Components"/>
                    <meta
                      property="og:description"
                      content="Photovoltaic components inventory manager. Photovoltaic components are part of the resources present in Intelbras' arsenal, which are used for product development."/>
                    <meta 
                      property="og:image"
                      content="https://firebasestorage.googleapis.com/v0/b/myself-dg.appspot.com/o/interview%2Fintelbras%2Fcover.png?alt=media&token=7b97bec8-d9b6-41ad-950c-243ac4cf8622" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}