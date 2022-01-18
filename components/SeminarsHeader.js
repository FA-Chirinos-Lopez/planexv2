import { URL } from "../pages"


export default function SeminarsHeader({theatreName, topicOrSubtitle, sponsoredByImg}) {
    return (
        
    <header className="headerSeminars">
        <div className="headerSeminars__grid">
            <h1 className="headerSeminars__grid__h1">{theatreName}</h1>
            <h2 className="headerSeminars__grid__h2">{topicOrSubtitle}</h2>
            <img src={URL+sponsoredByImg} alt="" className="headerSeminars__grid__img"/>
            <p className="headerSeminars__grid__p">Sponsored by</p>
        </div>
    </header>
        
    )
}
