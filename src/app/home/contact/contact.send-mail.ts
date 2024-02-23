import { Input } from '../../interfaces/input.interface';


/**
 * Extracts the values from the contact form input fields and calls a php script for sending a mail with the collected information.
 * @param inputs array containing information about the inputs, e.g. the current value
 * @returns response from promise
 */
export async function sendEmail(inputs: Input[]): Promise<Response> {

    const data = {
        name: inputs[0].value,
        message: generateContactMessage(
            inputs[0].value,
            inputs[1].value,
            inputs[2].value)
    };

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data)
    };

    return await fetch('./../../send_mail.php', options);
}


/**
 * Generates an html template for an email with the passed parameters.
 * @param name of the person that sends the contact request
 * @param email of the person that sends the contact request
 * @param message message of the contact request
 * @returns html template for email to site admin
 */
function generateContactMessage(name: string, email: string, message: string): string {

    return /*html*/ `
          <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message from ${name}</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
          
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>New message from
                <a href="mailto:${email}">${name}</a>
              </h1>
              <p>${message}</p>
              </div>
          </div>
      </body>
      </html>
  `;
}