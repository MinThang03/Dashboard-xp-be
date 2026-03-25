export const otpEmailTemplate = (otpCode: string, fullName?: string) => {
  const recipient = fullName?.trim() ? fullName.trim() : 'bạn';

  return {
    subject: 'Dashboard XP - Mã OTP xác thực tài khoản',
    html: `
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Xác thực tài khoản</title>
        </head>
        <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#1e293b;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(15,23,42,0.08);">
                  <tr>
                    <td style="padding:24px;background:linear-gradient(135deg,#DA291C,#003F88);color:#ffffff;">
                      <h1 style="margin:0;font-size:22px;">Dashboard XP</h1>
                      <p style="margin:8px 0 0 0;font-size:14px;opacity:0.95;">Xác thực đăng ký tài khoản</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;">
                      <p style="margin:0 0 12px 0;font-size:15px;">Xin chào ${recipient},</p>
                      <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;">Bạn vừa thực hiện đăng ký tài khoản trên Dashboard XP. Vui lòng nhập mã OTP bên dưới để hoàn tất đăng ký.</p>
                      <div style="background:#eef4ff;border:2px dashed #2b5fc7;border-radius:10px;padding:18px;text-align:center;margin:18px 0;">
                        <div style="font-size:13px;color:#475569;margin-bottom:8px;">Mã OTP của bạn</div>
                        <div style="font-size:34px;letter-spacing:8px;font-weight:700;color:#0f172a;">${otpCode}</div>
                      </div>
                      <p style="margin:0 0 10px 0;font-size:14px;color:#334155;">Mã OTP có hiệu lực trong 10 phút.</p>
                      <p style="margin:0;font-size:14px;color:#334155;">Nếu bạn không yêu cầu đăng ký, hãy bỏ qua email này.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `Dashboard XP - Mã OTP xác thực tài khoản\n\nXin chào ${recipient},\n\nMã OTP của bạn là: ${otpCode}\nMã có hiệu lực trong 10 phút.`,
  };
};
