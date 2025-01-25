import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';


export const POST = async (req) => {

  try {
    const body = await req.json();
    console.log("Request body:", body);
    const { customerEmail, companyEmail, formData, bookingDetails } = body;

    const templatePath = path.join(process.cwd(), 'public/templates/booking-email.html');
    if (!fs.existsSync(templatePath)) {
        console.error('Email template not found:', templatePath);
        return new Response(
            JSON.stringify({ error: 'Email template not found' }),
            { status: 500 }
        );
    }




    let emailTemplate = fs.readFileSync(templatePath, 'utf8');
    
    function transformBookingDetails(detailsArray) {
      return detailsArray.reduce((acc, item) => {
        acc[item.key] = item.description;
        return acc;
      }, {});
    }

    const transformedDetails = transformBookingDetails(bookingDetails);


    const discountApplied = transformedDetails.discountApplied || false;

    if (discountApplied) {
      emailTemplate = emailTemplate.replace(
        '{{bookingDetails.discountApplied}}',
        'Thanks to the code applied, all the sessions and F&amp;B will have a 50% discount!'
      );
    } else {
      emailTemplate = emailTemplate.replace('{{bookingDetails.discountApplied}}', '');
    }
    


    emailTemplate = emailTemplate
    .replace('{{name}}', formData.firstName + " "+formData.lastName || "N/A")
    .replace('{{bookingDetails.date}}', transformedDetails.date || 'N/A')
    .replace('{{bookingDetails.time}}',transformedDetails.time|| 'N/A')
    .replace('{{bookingDetails.duration}}',transformedDetails.duration || 'N/A')
    .replace('{{bookingDetails.amount}}',transformedDetails.price || 'N/A')
    .replace('{{bookingDetails.discountApplied}}',transformedDetails.disacountApplied || false);

    

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
      from: "no-reply@teleiosx.com",
      to: customerEmail,
      subject: "Booking Confirmation",
      html: emailTemplate,
    };

    const companyMessage = {
      from: "no-reply@teleiosx.com",
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



