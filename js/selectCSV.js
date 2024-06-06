// GoogleスプレッドシートからのCSVファイルのパス
const csvFilePath = 'https://docs.google.com/spreadsheets/d/1RAFJ0sAgW7GC7mtG8_Cw5UlI-GQp4mbQYf30dqdYUJs/export?format=csv';

// ページ読み込み時に実行する関数
window.onload = function() {
    console.log("ページが読み込まれました。");
    // CSVファイルを読み込む
    loadCSV(csvFilePath);
};

// CSVファイルを読み込む関数
function loadCSV(filePath) {
    const request = new XMLHttpRequest();
    request.open("GET", filePath, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                console.log("CSVファイルが読み込まれました。");
                console.log("CSVデータ:", request.responseText);
                // レスポンスを受け取ったらCSVを処理する関数を呼び出す
                processCSV(request.responseText);
            } else {
                console.error("CSVファイルの読み込みに失敗しました。ステータス: ", request.status);
            }
        }
    };
    request.send(null);
}

// CSVデータを処理し、プルダウンメニューにオプションを追加する関数
function processCSV(csvData) {
    console.log("CSVデータを処理中...");
    // CSVデータを改行で分割し、各行を配列に格納
    const rows = csvData.split("\n");
    console.log("行データ:", rows);

    // プルダウンメニューのセレクト要素を取得
    const beanType = document.getElementById("beanType");

    // グループ用の変数を初期化
    let currentGroup = null;

    // 各行のデータを処理してオプションを追加
    rows.forEach(function(row) {
        // 行をトリムして空白を削除
        row = row.trim();
        if (row === "") {
            return; // 空行をスキップ
        }

        // グループ名が指定されている場合（角括弧で囲まれている場合）
        if (row.startsWith("[") && row.endsWith("]")) {
            // グループ要素を作成し、プルダウンメニューに追加
            currentGroup = document.createElement("optgroup");
            currentGroup.label = row.slice(1, -1).trim();
            beanType.appendChild(currentGroup);
            console.log("新しいグループを追加:", currentGroup.label);
        } else {
            // オプション要素を作成し、テキストと値を設定してプルダウンメニューに追加
            const option = document.createElement("option");
            option.text = row; // テキストと値は同じ
            option.value = row; // テキストと値は同じ

            // グループが指定されている場合は、そのグループにオプションを追加
            if (currentGroup) {
                currentGroup.appendChild(option);
            } else {
                beanType.appendChild(option);
            }
            console.log("オプションを追加:", option.text, option.value);
        }
    });
    console.log("CSVデータの処理が完了しました。");
}
