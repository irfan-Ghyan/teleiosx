import nodemailer from "nodemailer";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { customerEmail, companyEmail, formData, bookingDetails } = body;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "rashidzia055@gmail.com",
        pass: "aetndsevcpdldhda",
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    const customerMessage = {
      from: "irfna@teleios.ae",
      to: customerEmail,
      subject: "Booking Confirmation",
      html: `
        <h2>Thank you for your booking!</h2>
        <p>Here are your booking details:</p>
        <ul>
          ${bookingDetails
          .map(
            (detail) =>
              `<li><strong>${detail.title}:</strong> ${detail.description}</li>`
          )
          .join("")}
        </ul>
        <p>We look forward to seeing you!</p>
      `,
    };

    const companyMessage = {
      from: "irfna@teleios.ae",
      to: companyEmail,
      subject: "New Booking Received",
      html: `
        <h2>New Booking Details</h2>
        <p>Here is the booking information:</p>
        <ul>
          ${bookingDetails
          .map(
            (detail) =>
              `<li><strong>${detail.title}:</strong> ${detail.description}</li>`
          )
          .join("")}
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


    await transporter.sendMail(customerMessage);
    await transporter.sendMail(companyMessage);

    return new Response(
      JSON.stringify({ message: "Emails sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send emails" }),
      { status: 500 }
    );
  }
};
