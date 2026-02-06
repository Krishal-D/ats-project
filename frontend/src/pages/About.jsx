import '../styles/footerPages.css'
import { useNavigate } from 'react-router-dom'

export function About() {
    const navigate = useNavigate()

    return (
        <div className="footerPage">
            <div className="footerPageContent">
                <button className="backButton" onClick={() => navigate(-1)}>← Back</button>
                
                <h1>About ATS Platform</h1>
                
                <section>
                    <h2>Our Mission</h2>
                    <p>
                        We connect talented job seekers with leading employers through our modern 
                        Applicant Tracking System. Our platform streamlines the hiring process, 
                        making it easier for candidates to find opportunities and for recruiters 
                        to discover top talent.
                    </p>
                </section>

                <section>
                    <h2>What We Offer</h2>
                    <ul>
                        <li><strong>For Job Seekers:</strong> Browse thousands of job listings, apply with ease, and track your applications in one place</li>
                        <li><strong>For Employers:</strong> Post jobs, manage applications, and find qualified candidates efficiently</li>
                        <li><strong>Smart Matching:</strong> Our platform helps connect the right talent with the right opportunities</li>
                    </ul>
                </section>

                <section>
                    <h2>Why Choose Us</h2>
                    <p>
                        Built with modern technology and user experience in mind, our platform 
                        provides a seamless experience for both job seekers and recruiters. 
                        We're committed to making the job search and hiring process transparent, 
                        efficient, and successful.
                    </p>
                </section>
            </div>
        </div>
    )
}
