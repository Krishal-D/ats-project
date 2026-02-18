import '../styles/footerPages.css'
import { useNavigate } from 'react-router-dom'

export function Privacy() {
  const navigate = useNavigate()

  return (
    <div className="footerPage">
      <div className="footerPageContent">
        <button className="backButton" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>Privacy Policy</h1>

        <p className="lastUpdated">Last Updated: February 2026</p>

        <section>
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including your name, email address,
            profile information, resume, and application materials.
          </p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To connect job seekers with employers</li>
            <li>To send you updates about your applications</li>
            <li>To improve our platform and user experience</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. Your
            data is stored securely and encrypted during transmission.
          </p>
        </section>

        <section>
          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. Your application materials are only shared
            with employers when you choose to apply for their positions.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information at any time
            through your profile settings.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at
            privacy@ats-platform.com
          </p>
        </section>
      </div>
    </div>
  )
}
