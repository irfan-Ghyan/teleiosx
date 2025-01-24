import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { customerEmail, companyEmail, formData, bookingDetails } = req.body;


    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'irfna@teleios.ae',
        pass: 'Angu@2024',
      },
    });


    const customerMessage = {
      from: 'your-email@gmail.com',
      to: customerEmail,
      subject: 'Booking Confirmation',
      html: `
        <h2>Thank you for your booking!</h2>
        <p>Here are your booking details:</p>
        <ul>
          ${bookingDetails
            .map(
              (detail) =>
                `<li><strong>${detail.title}:</strong> ${detail.description}</li>`
            )
            .join('')}
        </ul>
        <p>We look forward to seeing you!</p>
      `,
    };

    // Email content for the company
    const companyMessage = {
      from: 'irfna@teleios.ae',
      to: companyEmail,
      subject: 'New Booking Received',
      html: `
        <h2>New Booking Details</h2>
        <p>Here is the booking information:</p>
        <ul>
          ${bookingDetails
            .map(
              (detail) =>
                `<li><strong>${detail.title}:</strong> ${detail.description}</li>`
            )
            .join('')}
        </ul>
        <p><strong>Customer Info:</strong></p>
        <ul>
          <li>First Name: ${formData.firstName}</li>
          <li>Last Name: ${formData.lastName}</li>
          <li>Email: ${formData.email}</li>
          <li>Phone: ${formData.phone}</li>
        </ul>
      `,
    };

    try {
      // Send emails
      await transporter.sendMail(customerMessage);
      await transporter.sendMail(companyMessage);

      res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'Failed to send emails' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
