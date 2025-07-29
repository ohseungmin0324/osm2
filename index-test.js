const { GoogleSpreadsheet } = require('google-spreadsheet');

async function testWrite() {
  try {
    const creds = JSON.parse(process.env.GCP_CREDENTIALS);
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      timestamp: new Date().toISOString(),
      test: "Google Sheets API Test"
    });

    console.log("✅ 테스트 데이터가 Google Sheets에 성공적으로 추가되었습니다!");
  } catch (error) {
    console.error("❌ Google Sheets API 테스트 실패:", error);
    process.exit(1);
  }
}

testWrite();
