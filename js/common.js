


//入力スライダー　フィールド連携　汎用
function syncInput(inputId, sliderId) {
    var inputElement = document.getElementById(inputId);
    var sliderElement = document.getElementById(sliderId);
    inputElement.value = sliderElement.value;
    
}

function syncSlider(inputId, sliderId) {
    var inputElement = document.getElementById(inputId);
    var sliderElement = document.getElementById(sliderId);
    sliderElement.value = inputElement.value;
}

//焙煎に基づく予測　抽出量

//ペーパーフィルターに吸収される量の設定
const paperfilter = 15;

function updateBrewAmount() {
    const roastLevel = document.getElementById('roastLevel').value;
    const coffeeWeight = document.getElementById('coffeeWeight').value;
    const hotwater = parseFloat(document.getElementById('hotwater').value);
    
    let brewAmount = 0;

    if (roastLevel === '浅煎り') {
        brewAmount = hotwater - ((coffeeWeight * 1.3)+paperfilter);
    } else if (roastLevel === '中煎り') {
        brewAmount = hotwater - ((coffeeWeight * 1.65)+paperfilter);
    } else if (roastLevel === '深煎り') {
        brewAmount = hotwater - ((coffeeWeight * 2)+paperfilter);
    }
    //console.log('マイナスされているお湯の量' , //((coffeeWeight * 2)+paperfilter));

    document.getElementById('brewAmount').value = Math.max(brewAmount, 0).toFixed(0);
    document.getElementById('brewAmountSlider').value = Math.max(brewAmount, 0).toFixed(0);


}

// 初期計算
updateBrewAmount();






 //珈琲アニメのスタートを管理
 function startGifAnimation() {
  setTimeout(() => {
      const img = document.getElementById('coffeeGif');
      if (img) { // imgがnullでないことを確認
          const src = img.src;
          img.src = ''; // 一旦srcを空にすることでGIFをリセット
          img.src = src; // 再度元のsrcを設定することでアニメーションを再スタート
      } else {
          console.error('結果が悪かったので珈琲成功の画像はでません。');
      }
  }, 0); // 1秒待つ
}


//テーブルのセルを消す
function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}


//テーブルのチェックしたデータを表示する
function getRowData(checkbox) {
  // チェックボックスの親要素の行を取得
  const row = checkbox.parentElement.parentElement.parentElement;

  // 他のチェックボックスをクリア
  const checkboxes = document.querySelectorAll('.hikakuCheckbox');
  checkboxes.forEach(cb => {
      if (cb !== checkbox) {
          cb.checked = false;
      }
  });


  // 行のすべてのセルを取得
  const cells = row.getElementsByTagName('td');

  // 各セルのデータを取得してログに出力
  const rowData = [];
  for (let i = 0; i < cells.length - 1; i++) { // 最後から1番目のセルはボタンなので除外
      rowData.push(cells[i].innerText);
  }

     // 豆の種類を更新
      logBeanTypeSpan.textContent = rowData[14];



  // TDSと抽出収率を取得
      const tds = parseFloat(rowData[4]); // 文字列から浮動小数点数に変換
      const extractionYield = parseFloat(rowData[5]); // 文字列から浮動小数点数に変換
      
   //console.log('セルから取得したグラフの座標:',tds, extractionYield);
   //console.log('セルの情報全部',rowData);
   
   //console.log('5番目の情報',rowData[4]);
   //console.log('更新した豆の名前',logBeanTypeSpan.textContent);
       
      // 成功判定
       const judgement = successJudgement(tds, extractionYield);

      // グラフを更新
      updateChart(tds, extractionYield);
      

      // 結果を表示
      resultDivTxt(tds, extractionYield, judgement.success, judgement.Upleft, judgement.UpCenter, judgement.UpRight, judgement.Centerleft, judgement.CenterRight, judgement.DownLeft, judgement.DownCenter, judgement.DownRight);


}

// チェックボックスをトグルする関数
function toggleCheckbox(row) {
    const checkbox = row.querySelector('.hikakuCheckbox');
    if (!checkbox.checked) {
        checkbox.checked = true;
        getRowData(checkbox);
    }
}

// 他のボタンがクリックされた場合にチェックボックスをクリア
function otherButtonClicked() {
    // すべてのチェックボックスをクリア
    const checkboxes = document.querySelectorAll('.hikakuCheckbox');
    checkboxes.forEach(cb => {
        cb.checked = false;
    });

    console.log('他のボタンがクリックされました。チェックボックスをクリアしました。');
}