import { Link } from "react-router-dom"
import './landingPage.css'

export default function LandingPage(){
    return(
        <div className="landingPage">
            <div className="">
                <Link to={'/home'} className='lpLink'>
                    <span className="HomeButton">Comienza tu aventura!</span> <i className="i"></i>
                </Link>
            </div>
        </div>
    )
}
