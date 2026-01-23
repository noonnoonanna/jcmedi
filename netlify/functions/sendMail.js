const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // CORS 및 POST 메서드 체크
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);

  // 네이버 SMTP 설정 (환경 변수 권장: process.env.NAVER_PASS)
  const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    secure: true,
    auth: {
      user: '내네이버아이디@naver.com',
      pass: '네이버비밀번호' // 혹은 앱 비밀번호
    }
  });

  // 세련된 HTML 템플릿 디자인
  const htmlTemplate = `
    <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e5e7eb; border-top: 4px solid #00425f;">
      <div style="padding: 30px; background-color: #ffffff;">
        <h2 style="color: #00425f; margin-bottom: 20px; font-size: 22px; border-bottom: 1px solid #eee; padding-bottom: 15px;">[JC Medical] 새로운 문의가 도착했습니다</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <th style="width: 30%; text-align: left; padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #eee; color: #4b5563; font-size: 14px;">회사명/병원명</th>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #111827; font-size: 14px; font-weight: bold;">${data.name}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #eee; color: #4b5563; font-size: 14px;">이메일</th>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #111827; font-size: 14px;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #eee; color: #4b5563; font-size: 14px;">연락처</th>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #111827; font-size: 14px;">${data.tel}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 12px; background-color: #f9fafb; vertical-align: top; color: #4b5563; font-size: 14px;">문의내용</th>
            <td style="padding: 12px; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>
      </div>
      <div style="background-color: #f3f4f6; padding: 15px; text-align: center; color: #9ca3af; font-size: 12px;">
        본 메일은 JC Medical 홈페이지 관리 시스템에서 자동 발송되었습니다.
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '내네이버아이디@naver.com',
      to: '받을이메일@naver.com',
      subject: `[홈페이지 문의] ${data.name}님의 상담 요청입니다.`,
      html: htmlTemplate
    });

    return { statusCode: 200, body: JSON.stringify({ message: "Success" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
  }
};