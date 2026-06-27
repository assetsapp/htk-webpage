import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_TRANSPORTER_HOST,
  port: Number(process.env.MAIL_TRANSPORTER_PORT ?? 587),
  secure: process.env.MAIL_TRANSPORTER_SECURE === 'true',
  auth: process.env.MAIL_TRANSPORTER_AUTH === 'true'
    ? {
        user: process.env.MAIL_TRANSPORTER_USER,
        pass: process.env.MAIL_TRANSPORTER_PASSWORD,
      }
    : undefined,
  tls: {
    rejectUnauthorized: process.env.MAIL_TRANSPORTER_REJECT === 'true',
  },
});

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  return transporter.sendMail({
    from: `"${process.env.REPORT_SENDER ?? 'Tagventory'}" <${process.env.MAIL_TRANSPORTER_EMAIL}>`,
    ...options,
  });
}
