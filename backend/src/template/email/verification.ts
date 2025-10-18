export const verificationTemplate = (verificationUrl: string, name: string) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Welcome to Chat App!</h2>
  <p>Hi ${name},</p>
  <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="${verificationUrl}" 
       style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
      Verify Email Address
    </a>
  </div>
  <p>Or copy and paste this link in your browser:</p>
  <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
  <p>This link will expire in 24 hours.</p>
  <p>If you didn't create an account, please ignore this email.</p>
</div>
`;
