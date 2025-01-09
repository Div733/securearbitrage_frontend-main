import { useState } from 'react';
import '../SecureWeb.css';
import Drawer from '../Home/Drawer';
import PageTitle from '../Components/PageTitle';
import BottomMessage from '../Components/BottomMessage';

const ContactUs = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Define the state for each form field
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission, like sending the data to an API
        console.log('Form Submitted:', formData);
        // Reset the form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    return (
        <section className='secure-body-background'>
            {/* <div className="secure-heading">
                <span>CONTACT US{" "}
              <i
                className="ms-3 fas fa-bars"
                onClick={() => setIsDrawerOpen(true)}
                style={{ cursor: "pointer" }}
            ></i></span>
            </div> */}
            <PageTitle title={'CONTACT US'}/>


      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        
            <main className='container py-5'>

                <div>
                    <p className='btn btn-success mb-2'>Get in Touch:</p>
                    <p>Have questions or need support? Reach out to us:</p>
                    <p>Email: support@securearbitrage.com</p>
                </div>

                 
                <form onSubmit={handleSubmit} className="contact-form mt-5">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder='Your Name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder='Your Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            placeholder='Your Subject'
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            placeholder='Your Message'
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button style={{ background: '#00008B', color: 'white' }} type="submit" className="btn">Send Us a Message</button>
                </form>
                {/* <p className='mt-5'></p>
                <BottomMessage/> */}
            </main>
        </section>
    );
};

export default ContactUs;
