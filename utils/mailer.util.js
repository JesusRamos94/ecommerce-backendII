import nodemailer from 'nodemailer';

let transporter = null;

export const getTransporter = () => {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  return transporter;
};

export const sendPasswordResetEmail = async (to, link) => {
  const from = process.env.MAIL_FROM || 'no-reply@example.com';
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;padding:16px">
      <h2>Recuperar contraseña</h2>
      <p>Solicitaste restablecer tu contraseña. El enlace expira en <strong>1 hora</strong>.</p>
      <p><a href="${link}" style="display:inline-block;padding:12px 16px;background:#0d6efd;color:#fff;text-decoration:none;border-radius:6px">Restablecer contraseña</a></p>
      <p>Si no fuiste tú, ignora este correo.</p>
    </div>
  `;
  const transporter = getTransporter();
  return transporter.sendMail({ from, to, subject: 'Restablecer contraseña', html });
};
