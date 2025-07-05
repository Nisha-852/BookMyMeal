const template = ({ fullName, username, password }) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; margin: 20px auto; max-width: 600px;">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #182C56; border-radius: 8px 8px 0 0;">
                <h2 style="color: #ffffff; margin: 0;">Welcome!</h2>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: left;">
                <p style="font-size: 16px; color: #333333;">Dear <strong>${fullName}</strong>,</p>
                <p style="font-size: 16px; color: #333333;">Thank you for registering with us! We're excited to have you on board.</p>
                
                <p style="font-size: 16px; color: #333333;">Here are your login details:</p>
                <table role="presentation" style="width: 100%; margin-top: 10px; background-color: #f9f9f9; padding: 10px; border-radius: 4px; border: 1px solid #dddddd;">
                    <tr>
                        <td style="padding: 8px; font-weight: bold; color: #555555;">Username:</td>
                        <td style="padding: 8px; color: #555555;">${username}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold; color: #555555;">Password:</td>
                        <td style="padding: 8px; color: #555555;">${password}</td>
                    </tr>
                </table>

                <p style="font-size: 16px; color: #333333; margin-top: 20px;">To get started, simply log in to your account using the credentials above. If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:support@ourplatform.com" style="color: #4CAF50;">support@rishabhsoftware.com</a>.</p>

                <p style="font-size: 16px; color: #333333;">We hope you enjoy using our platform!</p>
                
                <p style="font-size: 16px; color: #333333; margin-top: 20px;">Best regards,</p>
                <p style="font-size: 16px; color: #333333;">The Rishabh Software Team</p>
            </td>
        </tr>
    </table>
</body>
</html>

`
}