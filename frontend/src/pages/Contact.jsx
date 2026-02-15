import '../styles/footerPages.css'
import { useNavigate } from 'react-router-dom'

export function Contact() {
    const navigate = useNavigate()

    return (
        <div className="footerPage">
            <div className="footerPageContent">
                <button className="backButton" onClick={() => navigate(-1)}>← Back</button>
                
                <h1>Contact Us</h1>
                
                <section>
                    <h2>Get In Touch</h2>
                    <p>
                        Have questions or need assistance? We're here to help!
                    </p>
                </section>

                <section>
                    <h2>Contact Information</h2>
                    <div className="contactInfo">
                        <div className="contactItem">
                            <strong>Email:</strong>
                            <p>support@ats-platform.com</p>
                        </div>
                        <div className="contactItem">
                            <strong>For Job Seekers:</strong>
                            <p>candidates@ats-platform.com</p>
                        </div>
                        <div className="contactItem">
                            <strong>For Employers:</strong>
                            <p>recruiters@ats-platform.com</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Business Hours</h2>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday - Sunday: Closed</p>
                </section>

                <section>
                    <p className="responseTime">
                        We typically respond to all inquiries within 24 hours during business days.
                    </p>
                </section>
            </div>
        </div>
    )
}
