import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/authContext'
import { HiSearch, HiDocumentText, HiBell, HiBriefcase } from 'react-icons/hi'

export function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleDashboard = () => {
    if (user) {
      navigate(user.role === 'candidate' ? '/candidateDashboard' : '/recruiterDashboard')
    } else {
      navigate('/signup')
    }
  }

  const features = [
    {
      icon: <HiSearch />,
      title: 'Job Search',
      description:
        'Filter by location, type, and tech stack. Browse open roles without needing an account.',
    },
    {
      icon: <HiDocumentText />,
      title: 'Simple Applications',
      description:
        'Submit your resume and cover letter in one step. Every application is saved to your dashboard.',
    },
    {
      icon: <HiBell />,
      title: 'Status Tracking',
      description:
        'See where every application stands — pending, under review, accepted, or rejected — in real time.',
    },
    {
      icon: <HiBriefcase />,
      title: 'Recruiter Tools',
      description:
        'Post jobs, review incoming applications, and move candidates through your pipeline from one place.',
    },
  ]

  return (
    <div className="homePage">
      <section className="hero">
        <div className="heroContent">
          <h1>Find work. Hire well.</h1>
          <p className="heroSubtitle">
            TalentTrack is a two-sided hiring platform — candidates search and track their
            applications, recruiters post jobs and manage their pipeline.
          </p>
          <div className="heroButtons">
            <button className="primaryBtn" onClick={() => navigate('/jobList')}>
              Browse Jobs
            </button>
            <button className="secondaryBtn" onClick={handleDashboard}>
              {user ? 'Go to Dashboard' : 'Post a Job'}
            </button>
          </div>
        </div>
      </section>

      <section className="roles">
        <div className="rolesContainer">
          <div className="roleCard">
            <h3>For candidates</h3>
            <ul>
              <li>Browse jobs filtered by location, type, and tech stack</li>
              <li>Apply with your resume and cover letter in one step</li>
              <li>Track every application from submission to outcome</li>
              <li>Manage your profile and resume from your dashboard</li>
            </ul>
            <button onClick={() => navigate('/signup')}>Create a candidate account</button>
          </div>
          <div className="roleCard">
            <h3>For employers</h3>
            <ul>
              <li>Post detailed job listings with requirements and benefits</li>
              <li>Review incoming applications from your dashboard</li>
              <li>Move candidates through your pipeline with status updates</li>
              <li>Manage all your active postings in one place</li>
            </ul>
            <button onClick={() => navigate('/signup')}>Create an employer account</button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="featuresContainer">
          <h2>What TalentTrack does</h2>
          <div className="featuresGrid">
            {features.map((feature, index) => (
              <div key={index} className="featureCard">
                <div className="featureIcon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="howItWorks">
        <div className="howItWorksContainer">
          <h2>How it works</h2>
          <div className="stepsGrid">
            <div className="step">
              <div className="stepNumber">1</div>
              <h3>Create an account</h3>
              <p>Sign up as a candidate or employer — takes less than a minute</p>
            </div>
            <div className="step">
              <div className="stepNumber">2</div>
              <h3>Browse or post</h3>
              <p>Candidates search and filter jobs. Employers create listings with full details</p>
            </div>
            <div className="step">
              <div className="stepNumber">3</div>
              <h3>Apply or review</h3>
              <p>Candidates submit applications. Employers see them in their dashboard immediately</p>
            </div>
            <div className="step">
              <div className="stepNumber">4</div>
              <h3>Track progress</h3>
              <p>Both sides see real-time status updates as the application moves forward</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
