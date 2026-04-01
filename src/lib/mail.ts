import nodemailer from "nodemailer";
import prisma from "./prisma";

export async function getTransporter() {
  const config = await prisma.sMTPConfig.findUnique({
    where: { id: "master" }
  });

  if (!config || !config.user || !config.pass) {
    throw new Error("SMTP configuration is incomplete.");
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const config = await prisma.sMTPConfig.findUnique({
      where: { id: "master" }
    });

    if (!config) throw new Error("No SMTP config found");

    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error: "فشل في إرسال البريد الإلكتروني" };
  }
}

export function getWelcomeEmailHtml(name: string) {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Cairo', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b; line-height: 1.6; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; overflow: hidden; shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        .header { background: #7c3aed; padding: 40px; text-align: center; color: white; }
        .content { padding: 40px; text-align: right; }
        .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
        .button { display: inline-block; padding: 16px 32px; background: #7c3aed; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;">مرحباً بك في مدارس تاج النزهة!</h1>
        </div>
        <div class="content">
          <h2>أهلاً ${name}،</h2>
          <p>يسعدنا جداً انضمامك إلى منصتنا التعليمية المتطورة. نحن هنا لنوفر لك أفضل تجربة تعليمية ممكنة.</p>
          <p>يمكنك الآن تسجيل الدخول والبدء في استكشاف دروسك ومتابعة مستواك الدراسي.</p>
          <a href="https://taj-schools.com/portal/login" class="button">دخول بوابة الطلاب</a>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} مدارس تاج النزهة. جميع الحقوق محفوظة.
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getPasswordResetHtml(resetLink: string) {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Cairo', sans-serif; background-color: #f8fafc; color: #1e293b; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; }
        .header { background: #ea580c; padding: 40px; text-align: center; color: white; }
        .content { padding: 40px; text-align: right; }
        .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
        .button { display: inline-block; padding: 16px 32px; background: #ea580c; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;">إعادة تعيين كلمة المرور</h1>
        </div>
        <div class="content">
          <p>لقد استلمنا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك.</p>
          <p>إذا كنت لم تطلب هذا، يمكنك تجاهل هذا البريد. أما إذا كنت ترغب في التغيير، اضغط على الزر أدناه:</p>
          <a href="${resetLink}" class="button">تغيير كلمة المرور</a>
        </div>
        <div class="footer">
          هذا الرابط صالح لمدة ساعة واحدة فقط.
        </div>
      </div>
    </body>
    </html>
  `;
}
