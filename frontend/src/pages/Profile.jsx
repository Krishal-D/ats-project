import React from 'react'
import { useAuth } from '../auth/authContext'
import styles from '../styles/profile.module.css'
import {
  HiPencil,
  HiCamera,
  HiUser,
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiDocumentText,
} from 'react-icons/hi'
import API_BASE_URL from '../config/api'

export function Profile() {
  const { user, accessToken, refreshAccessToken, login } = useAuth()
  const [isEditing, setIsEditing] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [profile, setProfile] = React.useState(null)
  const [preview, setPreview] = React.useState(null)

  const [formData, setFormData] = React.useState({
    bio: '',
    location: '',
    phone: '',
    profile_pic: null,
  })

  React.useEffect(() => {
    fetchProfile()
  }, [user, accessToken])

  const fetchProfile = async () => {
    if (!user || !accessToken) return

    try {
      let res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      })

      if (res.status === 401) {
        const newToken = await refreshAccessToken()
        if (newToken) {
          res = await fetch(`${API_BASE_URL}/api/users/profile`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
            credentials: 'include',
          })
        }
      }

      if (res.ok) {
        const data = await res.json()
        setProfile(data)
        setFormData({
          bio: data.bio || '',
          location: data.location || '',
          phone: data.phone || '',
          profile_pic: null,
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profile_pic: file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('bio', formData.bio)
    data.append('location', formData.location)
    data.append('phone', formData.phone)
    if (formData.profile_pic) {
      data.append('profile_pic', formData.profile_pic)
    }

    try {
      let res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: data,
      })

      if (res.status === 401) {
        const newToken = await refreshAccessToken()
        if (newToken) {
          res = await fetch(`${API_BASE_URL}/api/users/profile`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
            credentials: 'include',
            body: data,
          })
        }
      }

      if (res.ok) {
        const updatedProfile = await res.json()
        setProfile(updatedProfile)
        setPreview(null)
        setIsEditing(false)

        // Update user context if needed
        login(accessToken, { ...user, ...updatedProfile })
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>
  }

  if (!profile) {
    return <div className={styles.error}>Failed to load profile</div>
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        {/* Header */}
        <div className={styles.profileHeader}>
          <div className={styles.headerContent}>
            <h1>My Profile</h1>
            <p>Manage your personal information</p>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className={styles.editButton}>
              <HiPencil /> Edit Profile
            </button>
          )}
        </div>

        {/* Profile Picture Section */}
        <div className={styles.profilePictureSection}>
          <div className={styles.profilePictureWrapper}>
            {preview || profile.profile_pic ? (
              <img
                src={preview || `${API_BASE_URL}/${profile.profile_pic}`}
                alt="Profile"
                className={styles.profilePicture}
              />
            ) : (
              <div className={styles.profilePicturePlaceholder}>
                <HiUser size={60} />
              </div>
            )}
            {isEditing && (
              <label className={styles.uploadLabel}>
                <HiCamera size={24} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </label>
            )}
          </div>
          <div className={styles.userBasicInfo}>
            <h2>{profile.name}</h2>
            <span className={styles.roleBadge}>{profile.role}</span>
          </div>
        </div>

        {/* Profile Information */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <div className={styles.formGroup}>
              <label>
                <HiMail className={styles.icon} />
                Email
              </label>
              <input type="email" value={profile.email} disabled className={styles.inputDisabled} />
              <small>Email cannot be changed</small>
            </div>

            <div className={styles.formGroup}>
              <label>
                <HiDocumentText className={styles.icon} />
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className={styles.textarea}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <HiLocationMarker className={styles.icon} />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <HiPhone className={styles.icon} />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className={styles.input}
              />
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setPreview(null)
                  setFormData({
                    bio: profile.bio || '',
                    location: profile.location || '',
                    phone: profile.phone || '',
                    profile_pic: null,
                  })
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.profileInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <HiMail className={styles.icon} />
                  Email
                </div>
                <div className={styles.infoValue}>{profile.email}</div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <HiDocumentText className={styles.icon} />
                  Bio
                </div>
                <div className={styles.infoValue}>{profile.bio || 'No bio added yet'}</div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <HiLocationMarker className={styles.icon} />
                  Location
                </div>
                <div className={styles.infoValue}>{profile.location || 'Not specified'}</div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <HiPhone className={styles.icon} />
                  Phone
                </div>
                <div className={styles.infoValue}>{profile.phone || 'Not specified'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
