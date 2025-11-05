import '../styles/form.css'
import styles from '../styles/addJobForm.module.css'
import React from 'react'

export function PostJob() {
  const [form, setForm] = React.useState({
    title: '',
    company: '',
    location: '',
    job_type: '',
    salary: '',
    description: '',
    requirements: '',
    responsibility: '',
    benefits: '',
    tech_stack: '',
  })

  return (
    <main className={styles.postContainer}>
      <section className={styles.header}>
        <h3>Post New Job</h3>
        <p className={styles.headMessage}>
          Create a new job listing to attract top talent
        </p>
      </section>

      <section className={`${styles.formCard} ${styles.jobPostCard}`}>
        <p className={styles.formHeading}>Job Details</p>
        <p className={styles.formMessage}>
          Fill in the information about the position you're hiring for
        </p>

        <form method='POST' className={`formBody ${styles.formBody}`}>
          {/* Row: Job Title + Company */}
          <div className={styles.rowTwo}>
            <div className={styles.field}>
              <label htmlFor='title'>Job Title*</label>
              <input
                type='text'
                id='title'
                name='title'
                placeholder='eg.,Web Developer'
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='company'>Company*</label>
              <input
                type='text'
                id='company'
                name='companu'
                placeholder='eg.,Amazon'
                required
              />
            </div>
          </div>

          {/* Row: Location + Job Type + Salary */}
          <div className={styles.rowThree}>
            <div className={styles.field}>
              <label htmlFor='location'>Location*</label>
              <input
                type='text'
                id='location'
                name='location'
                placeholder='eg., Melbourne,Victoria'
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='jobType'>Job Type*</label>
              <select name='jobType' id='jobType' required>
                <option value='' default disabled>
                  Select job type
                </option>
                <option value='partTime'>Part-time</option>
                <option value='fullTime'>Full-time</option>
                <option value='contract'>Contract</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor='title'>Salary Range*</label>
              <input
                type='text'
                id='location'
                name='location'
                placeholder='eg., $120k-$160k'
                required
              />
            </div>
          </div>

          <label htmlFor='description'>Job Description*</label>
          <textarea
            name='description'
            id='description'
            placeholder='Brief overview of the role...'
            required
          />

          <label htmlFor='requirements'>Requirements*</label>
          <textarea
            name='requirements'
            id='requirements'
            placeholder='• 5+ years of experience in frontend development
• Expert knowledge of React and TypeScript
• Strong understanding of responsive design'
            required
          />

          <label htmlFor='responsibility'>Responsibility</label>
          <textarea
            name='responsibility'
            id='responsibility'
            placeholder='• Competitive salary and equity
• Health, dental, and vision insurance
• Flexible work hours and remote options'
          />

          <label htmlFor='benefits'>Benefits</label>
          <textarea
            name='benefits'
            id='benefits'
            placeholder='• Competitive salary and equity
• Health, dental, and vision insurance
• Flexible work hours and remote options'
          />

          <label htmlFor='skills'>Skills Required*</label>
          <input
            type='text'
            id='skills'
            name='skills'
            placeholder='Add skills required'
            required
          />

          <section className={styles.buttons}>
            <button className={styles.cancelButton} type='submit'>
              Cancel
            </button>
            <button className={styles.postButton} type='submit'>
              Post Job
            </button>
          </section>
        </form>
      </section>
    </main>
  )
}
