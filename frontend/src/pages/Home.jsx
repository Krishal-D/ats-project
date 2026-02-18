import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/authContext'

export function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleGetStarted = () => {
    if (user) {
      navigate(user.role === 'candidate' ? '/candidateDashboard' : '/recruiterDashboard')
    } else {
      navigate('/signup')
    }
  }

  const features = [
    {
      title: 'Smart Job Search',
      description:
        'Browse thousands of job opportunities with advanced filters for location, job type, and tech stack.',
    },
    {
      title: 'Easy Applications',
      description:
        'Apply to jobs with one click. Upload your resume once and track all your applications in one place.',
    },
    {
      title: 'Real-time Tracking',
      description:
        'Monitor your application status from submission to interview. Stay updated every step of the way.',
    },
    {
      title: 'Employer Dashboard',
      description:
        'Post jobs, manage applications, and find qualified candidates efficiently with our recruiter tools.',
    },
  ]

  const stats = [
    { number: '10,000+', label: 'Active Jobs' },
    { number: '50,000+', label: 'Job Seekers' },
    { number: '5,000+', label: 'Companies' },
    { number: '95%', label: 'Success Rate' },
  ]

  return (
    <div className="homePage">
      {/* Hero Section */}
      <section className="hero">
        <div className="heroContent">
          <h1>Find Your Dream Job</h1>
          <p className="heroSubtitle">
            Connect with top employers and discover opportunities that match your skills and
            aspirations
          </p>
          <div className="heroButtons">
            <button className="primaryBtn" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="secondaryBtn" onClick={() => navigate('/jobList')}>
              Browse Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="statsContainer">
          {stats.map((stat, index) => (
            <div key={index} className="statCard">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="featuresContainer">
          <h2>Why Choose Our Platform</h2>
          <p className="featuresSubtitle">
            Everything you need to succeed in your job search or hiring process
          </p>
          <div className="featuresGrid">
            {features.map((feature, index) => (
              <div key={index} className="featureCard">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="howItWorks">
        <div className="howItWorksContainer">
          <h2>How It Works</h2>
          <div className="stepsGrid">
            <div className="step">
              <div className="stepNumber">1</div>
              <h3>Create Your Profile</h3>
              <p>Sign up and build your professional profile with resume and details</p>
            </div>
            <div className="step">
              <div className="stepNumber">2</div>
              <h3>Browse & Apply</h3>
              <p>Search for jobs that match your skills and apply instantly</p>
            </div>
            <div className="step">
              <div className="stepNumber">3</div>
              <h3>Track Progress</h3>
              <p>Monitor application status and receive updates from employers</p>
            </div>
            <div className="step">
              <div className="stepNumber">4</div>
              <h3>Get Hired</h3>
              <p>Connect with employers and land your dream job</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="ctaContent">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of job seekers and employers already using our platform</p>
          <div className="ctaButtons">
            <button className="ctaPrimaryBtn" onClick={() => navigate('/signup')}>
              Sign Up as Job Seeker
            </button>
            <button className="ctaSecondaryBtn" onClick={() => navigate('/signup')}>
              Sign Up as Employer
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
