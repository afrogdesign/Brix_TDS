document.getElementById('downloadCSV').addEventListener('click', function () {
    const table = document.getElementById('log');
    let csvContent = '';

    // テーブルのヘッダー行を追加（最初の行をスキップ）
    const header = table.querySelectorAll('thead tr')[1];
    let headerContent = [];
    header.querySelectorAll('th').forEach((cell, index) => {
        if (index !== 2 && index !== 17) { // 0-based index, 3列目と16列目を除外
            headerContent.push(cell.innerText);
        }
    });
    csvContent += headerContent.join(',') + '\r\n';

    // テーブルのデータ行を追加
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        let rowContent = [];
        row.querySelectorAll('td').forEach((cell, index) => {
            if (index !== 2 && index !== 17) { // 0-based index, 3列目と16列目を除外
                rowContent.push(cell.innerText);
            }
        });
        csvContent += rowContent.join(',') + '\r\n';
    });

    // BOM付きUTF-8でCSVファイルを作成してダウンロード
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'coffee_log.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
