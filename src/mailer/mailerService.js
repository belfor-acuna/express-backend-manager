import refreshTransport from "../config/nodemailer/mailerConfig.js";

export default async function sendMailTo(to, token) {
    try{
      const transporter = await refreshTransport();
      const htmlContent = `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Recuperación de Contraseña</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; }
                    h2 { color: #333; }
                    p { font-size: 16px; color: #555; }
                    .code { font-size: 20px; font-weight: bold; background: #f8f9fa; padding: 10px;
                        border-radius: 5px; display: inline-block; margin-top: 10px; letter-spacing: 2px; color: #d9534f; }
                    .footer { margin-top: 20px; font-size: 14px; color: #888; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Recuperación de Contraseña</h2>
                    <p>Si usted <strong>no solicitó un cambio de contraseña</strong>, ignore este mensaje.</p>
                    <p>De lo contrario, use el siguiente código para restablecer su contraseña:</p>
                    <div class="code">${token}</div>
                    <p class="footer">Este código expirará en 15 minutos.</p>
                </div>
            </body>
            </html>`
      // Enviar el mensaje      
      const info = await transporter.sendMail({
        from: "belforportfolioutility@gmail.com",
        to: to,
        subject: "Recuperación de contraseña",
        html:htmlContent,
      });
      
      return {sent:true, message:info.messageId};
    }catch(e){
        console.log('Error sending email: ',e)
        return {sent:false, message:e};
    }

  }

  