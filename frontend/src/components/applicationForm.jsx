import React from "react"
import '../styles/form.css'
import { useParams } from "react-router-dom";

export function Apply() {

    const { id } = useParams()

    const [form, setForm] = React.useState({
        user_name: '',
        job_title: '',
        user_email: '',
        resume_path: '',
        cover_letter: ''
    })

    React.useEffect(() => {
        const fetchUserJob = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/applications');
                const data = await res.json();

                setForm(prev => ({
                    ...prev,
                    user_name: data.user_name,
                    user_email: data.user_email,
                    job_title: data.job_title
                }));
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserJob();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        Object.keys(form).forEach(key => {
            if (form[key] !== null) formData.append(key, form[key]);
        })


        try {
            const res = await fetch(`http://localhost:5000/api/applications`, {
                method: "POST",
                body: formData
            })
            const data = await res.json();
            console.log(data);

        } catch (err) {
            console.error(err)

        }

    }



    return (

        <main className="applicationForm">
            <h1>Apply for Position</h1>
            <p>Complete the form below to submit your application</p>
            <section className="formCard">
                <h3>Application Form</h3>
                <form method="post" className="formBody" >
                    <h3>Personal Information</h3>

                    <label htmlFor="userName" >Full Name</label>
                    <input type="text" value={form.user_name} id="userName" name="userName" readOnly />


                    <label htmlFor="userEmail" >Email</label>
                    <input type="text" value={form.user_email} id="userEmail" name="userEmail" readOnly />


                    <label htmlFor="jobTitle" >Job Title</label>
                    <input type="text" value={form.job_title} id="jobTitle" name="jobTitle" readOnly />



                    <label htmlFor="coverLetter">Cover Letter*</label>
                    <h6>Why are you a good fit for this role? </h6>
                    <textarea
                        name="coverLetter"
                        id="coverLetter"
                        placeholder="Tell us why you are interested in this position..."
                        required
                    />


                    <label htmlFor="resume" className="upload-box">
                        <span className="upload-title">Upload Resume*</span>

                        <div className="upload-content">
                            <p>Click to add resume</p>
                            <p>(PDF, DOC, DOCX – Max 5MB)</p>
                        </div>
                        <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required />


                    </label>

                    <button className="postButton" type="submit">
                        Submit Application
                    </button>



                </form>

            </section>
        </main>


    )
}