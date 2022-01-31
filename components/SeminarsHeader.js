import { URL } from "../pages"


export default function SeminarsHeader({TheatreName, TopicOrSubtitle, SponsoredByImg}) {
    return (
        
    <header className="headerSeminars">
        <div className="headerSeminars__flexLeftHeader">
            <div className="headerSeminars__flexLeftHeader__grid">
                <h1 className="headerSeminars__flexLeftHeader__grid__h1">{TheatreName}</h1>
                <h2 className="headerSeminars__flexLeftHeader__grid__h2">{TopicOrSubtitle}</h2>
                </div>
            </div>
            <div className="headerSeminars__flexRightHeader">
            <img src={URL+SponsoredByImg} alt="" className="headerSeminars__flexRightHeader__img"/>
            <p className="headerSeminars__flexRightHeader__p">Sponsored by</p>
            </div>
        
    </header>
        
    )
}
