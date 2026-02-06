import '../styles/footer.css'
import { Link } from 'react-router-dom'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="footerSection">
                    <p className="copyright">© {currentYear} ATS. All rights reserved.</p>
                </div>
                <div className="footerLinks">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}
