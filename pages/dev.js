import AdsContainer from "../components/AdsContainer"
import ContainerSeminars from "../components/ContainerSeminars"
import Layout from "../components/Layout"
import SeminarsFooter from "../components/SeminarsFooter"
import SeminarsHeader from "../components/SeminarsHeader"




export default function dev() {
    return (
    <div className="adsFullScreen">
        <div className="adsFullScreen__screen">
            <div className="adsFullScreen__date">Monday 14:32</div>
            <main className="adsFullScreen__main">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2301&q=80" alt="" className="adsFullScreen__main__img"/>
            </main>
            <footer className="adsFullScreen__footer">
                <div className="adsFullScreen__footer__grid">
                    <h1 className="adsFullScreen__footer__grid__h1">Event name</h1>
                    <h2 className="adsFullScreen__footer__grid__h2">Event date</h2>
                    <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2301&q=80" alt="" className="adsFullScreen__footer__grid__img"/>
                </div> 
            </footer>
        </div>
    </div>
    )
}
