import { URL } from "../pages"


export default function SeminarsHeader({TheatreName, TopicOrSubtitle, SponsoredByImg}) {
    return (
        
    <header className="headerSeminars">
        <div className="headerSeminars__grid">
            <h1 className="headerSeminars__grid__h1">{TheatreName}</h1>
            <h2 className="headerSeminars__grid__h2">{TopicOrSubtitle}</h2>
            <img src={URL+SponsoredByImg} alt="" className="headerSeminars__grid__img"/>
            <p className="headerSeminars__grid__p">Sponsored by</p>
        </div>
    </header>
        
    )
}
