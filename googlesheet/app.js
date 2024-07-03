function handleCredentialResponse(response) {
    const data = document.getElementById('data').value;
    const sheetUrl = document.getElementById('sheetUrl').value;

    if (data && sheetUrl) {
        const token = response.credential;
        saveToGoogleSheets(token, data, sheetUrl);
    } else {
        alert('CSVデータとGoogleスプレッドシートのURLを両方入力してください。');
    }
}

function saveToGoogleSheets(token, data, sheetUrl) {
    const sheetId = extractSheetId(sheetUrl);
    const apiUrl = `https://script.google.com/macros/s/AKfycbz9xpLV8ZfRyBBICQ24o_h6VvOQnEQY4RuXddCw28w2B9SBpPk70dmlUH0Io1C_MNHK/exec`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: data, sheetId: sheetId })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('データが正常に保存されました！');
          } else {
              alert('データの保存に失敗しました。');
          }
      }).catch(error => {
          console.error('Error:', error);
          alert('データの保存中にエラーが発生しました。詳細: ' + error.message);
      });
}

function extractSheetId(url) {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
}
