// グローバル変数の定義
const resultDiv = document.getElementById('result');

function resultDivTxt(tds, extractionYield, success, Upleft, UpCenter, UpRight, Centerleft, CenterRight, DownLeft, DownCenter, DownRight) {
    resultDiv.innerHTML = `<hr><p><span class="bluetxt">TDS値: ${tds.toFixed(2)}%</span> <br> <span class="comment">（ドリップコーヒー理想値は1.15～1.55％。SCA準拠）</span></p>`;
    resultDiv.innerHTML += `<p><span class="bluetxt">EXT収率: ${extractionYield.toFixed(2)}%</span>　<br><span class="comment">(豆から抽出できた成分の割合：理想値は18％～22％)</span></p>`;

    if (success) {
        resultDiv.innerHTML += '<p class="success">やったね！適正範囲内!</p><br><img id="coffeeGif" src="coffee.gif" alt="Coffee"><br><span class="comment">濃度と抽出が最適なバランスで、味が良い状態。</span></p>';
    } else if (Upleft) {
        resultDiv.innerHTML += '<p class="failure">残念&#129402;<br>濃度が高いが、抽出が不十分で味が未完成</p><br><img class="ThinkGif" src="Think.gif" alt="Think"><span class="advice">(抽出時間を延ばすか、挽き目を細かくする。これにより、抽出が進み、味が均等になる。</span></p>';
    } else if (UpCenter) {
        resultDiv.innerHTML += '<p class="failure">残念&#129402;<br>濃いめだが、<br>適切な抽出が行われている状態。</p><br><img class="ThinkGif" src="Think.gif" alt="Think"><span class="advice">抽出時間を少し短くするか、挽き目を少し粗くする。濃度が高すぎる場合、少しだけ薄めることも考える。</span></p>';
    } else if (UpRight) {
        resultDiv.innerHTML += '<p class="failure">残念&#129402;<br>濃度がかなり高く、<br>過剰な抽出により苦味が強い。</p><br><img class="ThinkGif" src="Think.gif" alt="Think"><span class="advice">抽出時間を短くするか、挽き目を粗くする。これにより、過剰な抽出が防がれ、苦味が減少する。</span></p></p>';
    } else if (Centerleft) {
        resultDiv.innerHTML += '<p class="failure">残念&#129402;<br>酸味が強め、<br>抽出が不十分なので甘み不足。</p><br><img class="ThinkGif" src="Think.gif" alt="Think"><span class="advice"> 抽出時間を延ばすか、挽き目を細かくする。これにより、コーヒーの味がしっかりと出るようになる。</span></p>';
    } else if (CenterRight) {
        resultDiv.innerHTML += '<p class="failure">残念&#129402;<br>苦味が強く、<br>過抽出になっている。</p><br><img class="ThinkGif" src="Think.gif" alt="Think"><span class="advice">抽出時間を短くするか、挽き目を粗くする。過剰な抽出を避けて、苦味を減らす。</span></p>';
    } else if (DownLeft) {
        resultDiv.innerHTML += '<p class="failure">残念&#129402;<br>濃度が非常に低く、<br>抽出が不十分で味が非常に薄い。</p><br><img class="ThinkGif" src="Think.gif" alt="Think"><span class="advice">抽出時間を延ばすか、挽き目を細かくする。濃度を上げるために、粉量を増やすことも検討する。</span></p>';
    } else if (DownCenter) {
        resultDiv.innerHTML += '<p class="failure">残念&#129402;<br>濃度が低く、<br>味が薄く印象が弱い。</p><br><img class="ThinkGif" src="Think.gif" alt="Think"><span class="advice">抽出時間を延ばすか、挽き目を細かくする。濃度を上げるために、粉量を増やすことも検討する。</span></p>';
    } else if (DownRight) {
        resultDiv.innerHTML += '<p class="failure">残念&#129402;<br>濃度が低く薄いのに、<br>過抽出で苦味成分が出ている。</p><br><img class="ThinkGif" src="Think.gif" alt="Think"><span class="advice">挽き目を粗くしたり、抽出時間を短くする。濃度を上げるために、粉量を増やすことも検討するが、抽出を適度に調整して苦味を減らす。</span></p>';
    } else {
        resultDiv.innerHTML += '<p class="failure">謎の入力をしているね？キミ！！困るんだよ！</p>';
    }

    // 各条件の評価結果をコンソールに出力
    console.log('success:', success);
    console.log('Upleft:', Upleft);
    console.log('UpCenter:', UpCenter);
    console.log('UpRight:', UpRight);
    console.log('Centerleft:', Centerleft);
    console.log('CenterRight:', CenterRight);
    console.log('DownLeft:', DownLeft);
    console.log('DownCenter:', DownCenter);
    console.log('DownRight:', DownRight);
}

function calculate() {
    // チャックボックスをすべて外す
    otherButtonClicked();

    // 珈琲アニメの再生をリセット
    startGifAnimation();

    // 少し下にずらす
    scrollDown();
    
    //非表示エリアを表示
    toggleDiv();

    // 入力値を取得
    const brix = parseFloat(document.getElementById('brix').value);
    const brewAmount = parseFloat(document.getElementById('brewAmount').value);
    const coffeeWeight = parseFloat(document.getElementById('coffeeWeight').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const grindSize = document.getElementById('grindSize').value;
    const roastLevel = document.getElementById('roastLevel').value;
    const brewTime = parseFloat(document.getElementById('brewTime').value);
    const beanType = document.getElementById('beanType').value;
    const brewMethod = document.getElementById('brewMethod').value;

    // TDSを計算
    const tds = brix * 0.79;

    // 収率を計算
    const extractionYield = (tds * brewAmount) / coffeeWeight;

    // 成功判定
    const success = (tds >= 1.15 && tds <= 1.55 && extractionYield >= 18 && extractionYield <= 22);
    
    const Upleft = (tds > 1.55 && extractionYield < 18);
    const UpCenter = (tds > 1.55 && extractionYield >= 18 && extractionYield <= 22);
    const UpRight = (tds > 1.55 && extractionYield > 22);

    const Centerleft = (tds >= 1.15 && tds <= 1.55 && extractionYield < 18);
    const CenterRight = (tds >= 1.15 && tds <= 1.55 && extractionYield > 22);

    const DownLeft = (tds < 1.15 && extractionYield < 18);
    const DownCenter = (tds < 1.15 && extractionYield >= 18 && extractionYield <= 22);
    const DownRight = (tds < 1.15 && extractionYield > 22);

    //秒を時間に変更
    let minutes = Math.floor(brewTime / 60);
    let seconds = brewTime % 60;

    // 秒を分に変換
    const countTime = `${minutes}分${seconds}秒`;

    // 結果を表示
    resultDivTxt(tds, extractionYield, success, Upleft, UpCenter, UpRight, Centerleft, CenterRight, DownLeft, DownCenter, DownRight);

    // ログを追加
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const logRow = `<tr class="${success ? 'log-success' : ''}">
        <td>${date}</td>
        <td>${time}</td>
        <td>${brix}％</td>
        <td>${tds.toFixed(2)}％</td>
        <td>${extractionYield.toFixed(2)}％</td>
        <td>
        <label class="custom-checkbox">
        <input type="checkbox" class="hikakuCheckbox" onclick="getRowData(this)">
        <span class="checkmark"></span>
        </label>
        </td>
        <td>${success ? '◯' : '☓'}</td>
        <td>${temperature}℃</td>
        <td>${coffeeWeight}ｇ</td>
        <td>${brewAmount}cc</td>
        <td>${grindSize}</td>
        <td>${roastLevel}</td>
        <td>${countTime}</td>
        <td>${brewMethod}</td>
        <td>${beanType}</td>
        <td><button class="shokyoBtn" onclick="deleteRow(this)">消去</button></td>
    </tr>`;
    logTableBody.insertAdjacentHTML('beforeend', logRow);

    // 豆の種類を更新
    logBeanTypeSpan.textContent = beanType;

    // グラフを更新
    updateChart(tds, extractionYield);
}
