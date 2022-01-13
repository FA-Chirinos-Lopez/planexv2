import Head from "next/head"
import Image from "next/image"
import FooterSL from "./FooterSL"
import HeaderSL from "./HeaderSL"

export default function Layout({children}) {
    return (
        <div style={{backgroundColor:"#B9B7BD", height:"100vh",border: "5px solid red"}} >
        <HeaderSL/>
        <Head>
        <link
        href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
        rel="stylesheet"
      />
        </Head>
 
        <main>
        {children}
        </main>
    <FooterSL/>
    </div>
    )
}
