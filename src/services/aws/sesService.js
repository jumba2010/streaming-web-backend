const { SendEmailCommand, SendTemplatedEmailCommand,CreateTemplateCommand, UpdateTemplateCommand} = require("@aws-sdk/client-ses");
const {sesClient} = require("../../../config/awsConfig")


async function  sendEmail(clientEmail,body, subject)  {
    const params = {
        Destination: {
            ToAddresses: [clientEmail],
        },
        Message: {
            Body: {
                Text: {
                    Data: body,
                },
            },
            Subject: {
                Data: subject,
            },
        },
        Source: process.env.VERIFIED_EMAIL, 
    };
  
    try {
        const data = await sesClient.send(new SendEmailCommand(params));
        console.log("Email sent:", data.MessageId);
        return { statusCode: 200, body: JSON.stringify("Email sent successfully") };
    } catch (err) {
        console.error("Error sending email:", err);
        return { statusCode: 500, body: JSON.stringify("Error sending email") };
    }
  
  }



 async function  sendEmailWithTemplate (clientEmail,templateName,templateData) {
   
  
    const params = {
        Destination: {
            ToAddresses: [clientEmail],
        },
        Source:  process.env.VERIFIED_EMAIL,
        Template: templateName,
        TemplateData: JSON.stringify(templateData)
    };

    console.log('Sending email:',params)
    try {
        const data = await sesClient.send(new SendTemplatedEmailCommand(params));
        console.log("Email sent:", data.MessageId);
        return { statusCode: 200, body: JSON.stringify("Email sent successfully") };
    } catch (err) {
        console.error("Error sending email:", err);
        return { statusCode: 500, body: JSON.stringify("Error sending email") };
    }
};


async function createOrUpdateEmailTemplate(templateName, subjectPart, htmlPart) {
    try {
        const params = {
            Template: {
                TemplateName: templateName,
                SubjectPart: subjectPart,
                HtmlPart: htmlPart
            }
        };

        // Attempt to update the template
        try {
            await sesClient.send(new UpdateTemplateCommand(params));
            console.log(`${templateName} Template updated successfully.`);
        } catch (updateError) {
            if (updateError.name === "TemplateDoesNotExistException") {
                // If the template doesn't exist, create a new one
                try {
                    await sesClient.send(new CreateTemplateCommand(params));
                    console.log(`${templateName} Template created successfully.`);
                } catch (createError) {
                    console.error("Error creating template:", createError);
                }
            } else {
                // If there's another error during update, log it
                console.error("Error updating template:", updateError);
            }
        }
    } catch (err) {
        console.error("Error creating or updating template:", err);
    }
}


  module.exports = {sendEmail,sendEmailWithTemplate,createOrUpdateEmailTemplate}