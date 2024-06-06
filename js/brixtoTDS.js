        //結果エリアを非表示にしているのを表示させる
        function toggleDiv() {
           var div = document.getElementById("hiddenDiv");
           div.style.display = "block";
           }


        let chart;
        const logTableBody = document.querySelector('#log tbody');
        const logBeanTypeSpan = document.getElementById('logBeanType');




        // グローバル変数の定義
        const resultDiv = document.getElementById('result');


        //結果の文章を決める関数

        function resultDivTxt(tds, extractionYield, success, Upleft, UpCenter, UpRight, Centerleft, CenterRight, DownLeft, DownCenter, DownRight){

            resultDiv.innerHTML = `  <hr><p><span class="bluetxt">TDS値: ${tds.toFixed(2)}%</span> <br> <span class="comment">（ドリップコーヒー理想値は1.15～1.55％。SCA準拠）</span></p>`;
            resultDiv.innerHTML += `<p><span class="bluetxt">EXT収率: ${extractionYield.toFixed(2)}%</span> <br><span class="comment">(豆から抽出できた成分の割合：理想値は18％～22％)</span></p>`;


            if (success) {
                resultDiv.innerHTML += '<p class="success">やったね！適正範囲内!</p><br><img id="coffeeGif" src="img/coffee.gif" alt="Coffee"><br><span class="comment">濃度と抽出が最適なバランスで、味が良い状態。</span></p>';

            } else if (Upleft) {
                resultDiv.innerHTML += '<p class="failure">濃度が高いが、抽出が不十分で味が未完成</p><br><img class="ThinkGif" src="img/Think.gif" alt="Think"><span class="advice">(抽出時間を延ばすか、挽き目を細かくする。これにより、抽出が進み、味が均等になる。</span></p>';

            } else if (UpCenter) {
                resultDiv.innerHTML += '<p class="failure">濃いめだが、<br>適切な抽出が行われている状態。</p><br><img class="ThinkGif" src="img/Think.gif" alt="Think"><span class="advice">抽出時間を少し短くするか、挽き目を少し粗くする。濃度が高すぎる場合、少しだけ薄めることも考える。</span></p>';

            } else if (UpRight) {
                resultDiv.innerHTML += '<p class="failure">濃度がかなり高く、<br>過剰な抽出により苦味が強い。</p><br><img class="ThinkGif" src="img/Think.gif" alt="Think"><span class="advice">抽出時間を短くするか、挽き目を粗くする。これにより、過剰な抽出が防がれ、苦味が減少する。</span></p></p>';

            } else if (Centerleft) {
                resultDiv.innerHTML += '<p class="failure">酸味が強め、<br>抽出が不十分なので甘み不足。</p><br><img class="ThinkGif" src="img/Think.gif" alt="Think"><span class="advice"> 抽出時間を延ばすか、挽き目を細かくする。これにより、コーヒーの味がしっかりと出るようになる。</span></p>';

            } else if (CenterRight) {
                resultDiv.innerHTML += '<p class="failure">苦味が強く、<br>過抽出になっている。</p><br><img class="ThinkGif" src="img/Think.gif" alt="Think"><span class="advice">抽出時間を短くするか、挽き目を粗くする。過剰な抽出を避けて、苦味を減らす。</span></p>';
            
            } else if (DownLeft) {
                resultDiv.innerHTML += '<p class="failure">濃度が非常に低く、<br>抽出が不十分で味が非常に薄い。</p><br><img class="ThinkGif" src="img/Think.gif" alt="Think"><span class="advice">抽出時間を延ばすか、挽き目を細かくする。濃度を上げるために、粉量を増やすことも検討する。</span></p>';
            
            } else if (DownCenter) {
                resultDiv.innerHTML += '<p class="failure">濃度が低く、<br>味が薄く印象が弱い。</p><br><img class="ThinkGif" src="img/Think.gif" alt="Think"><span class="advice">抽出時間を延ばすか、挽き目を細かくする。濃度を上げるために、粉量を増やすことも検討する。</span></p>';
            
            } else if (DownRight) {
                resultDiv.innerHTML += '<p class="failure">濃度が低く薄いのに、<br>過抽出で苦味成分が出ている。</p><br><img class="ThinkGif" src="img/Think.gif" alt="Think"><span class="advice">挽き目を粗くしたり、抽出時間を短くする。濃度を上げるために、粉量を増やすことも検討するが、抽出を適度に調整して苦味を減らす。</span></p>';
           
            } else {
                resultDiv.innerHTML += '<p class="failure">謎の入力をしているね？キミ！！困るんだよ！</p>';
            }
            
            // 各条件の評価結果をコンソールに出力
            //console.log('success:', success);
            //console.log('Upleft:', Upleft);
            //console.log('UpCenter:', UpCenter);
            //console.log('UpRight:',UpRight);
            //console.log('Centerleft:', Centerleft);
            //console.log('CenterRight:', CenterRight);
            //console.log('DownLeft:', DownLeft);
            //console.log('DownCenter:', DownCenter);
            //console.log('DownRight:', DownRight);


        }
        // チャートのどの部分に位置するのかジャッジする  
        function successJudgement(tds, extractionYield) {
            return {
                success: (tds >= 1.15 && tds <= 1.55 && extractionYield >= 18 && extractionYield <= 22),
                Upleft: (tds > 1.55 && extractionYield < 18),
                UpCenter: (tds > 1.55 && extractionYield >= 18 && extractionYield <= 22),
                UpRight: (tds > 1.55 && extractionYield > 22),
                Centerleft: (tds >= 1.15 && tds <= 1.55 && extractionYield < 18),
                CenterRight: (tds >= 1.15 && tds <= 1.55 && extractionYield > 22),
                DownLeft: (tds < 1.15 && extractionYield < 18),
                DownCenter: (tds < 1.15 && extractionYield >= 18 && extractionYield <= 22),
                DownRight: (tds < 1.15 && extractionYield > 22)
            };
        }

        // 確認するボタンを押した時
        function calculate() {

            //非表示エリアを表示
            toggleDiv();

            // チャックボックスをすべて外す
            otherButtonClicked();

            // 珈琲アニメの再生をリセット
            startGifAnimation() ;

            // 少し下にずらす
            scrollToTarget();
            
          


            // 入力値を取得
            const brix = parseFloat(document.getElementById('brix').value);
            const brewAmount = parseFloat(document.getElementById('brewAmount').value);
            const hotwater =  parseFloat(document.getElementById('hotwater').value);
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

            // レシオを計算
            const ratio = Math.floor(hotwater / coffeeWeight);

            // 成功判定
            const judgement = successJudgement(tds, extractionYield);



            // 分と秒に変換
            let minutes = Math.floor(brewTime / 60);
            let seconds = brewTime % 60;

            // 秒を分に変換
            const countTime = `${minutes}分${seconds}秒`;

            // 結果を表示
            const resultDiv = document.getElementById('result');

            // 結果を表示
                resultDivTxt(tds, extractionYield, judgement.success, judgement.Upleft, judgement.UpCenter, judgement.UpRight, judgement.Centerleft, judgement.CenterRight, judgement.DownLeft, judgement.DownCenter, judgement.DownRight);



            // ログを追加
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            const logRow = `<tr class="${judgement.success ? 'log-success' : ''}" onclick="toggleCheckbox(this)">
    <td>${date}</td>
    <td>${time}</td>
    <td>
        <label class="custom-checkbox">
            <input type="checkbox" class="hikakuCheckbox" checked>
            <span class="checkmark"></span>
        </label>
    </td>
    <td>${brix}％</td>
    <td>${tds.toFixed(2)}％</td>
    <td>${extractionYield.toFixed(2)}％</td>
    <td>${judgement.success ? '◯' : '☓'}</td>
    <td>1:${ratio}</td>
    <td>${temperature}℃</td>
    <td>${coffeeWeight}ｇ</td>
    <td>${hotwater}cc</td>
    <td>${brewAmount}cc</td>
    <td>${grindSize}</td>
    <td>${roastLevel}</td>
    <td>${countTime}</td>
    <td>${brewMethod}</td>
    <td>${beanType}</td>
    <td><button class="shokyoBtn" onclick="deleteRow(this); event.stopPropagation();">消去</button></td>
</tr>`;
logTableBody.insertAdjacentHTML('beforeend', logRow);
        
            // 豆の種類を更新
            logBeanTypeSpan.textContent = beanType;

            // グラフを更新
            updateChart(tds, extractionYield);

     
        }
        
        
        // 珈琲チャートの描写をする
        function updateChart(tds, extractionYield) {
            const ctx = document.getElementById('brewingRatioChart').getContext('2d');

              // データセットの初期化
              const newData = {
                x: extractionYield,
                y: tds
            };

            // グラフが既に存在する場合は破棄
            if (chart) {
                // 既存のデータを更新してアニメーション
                chart.data.datasets[0].data[0] = newData;
                chart.update({
                    duration: 800, // アニメーションの持続時間（ミリ秒）
                    easing: 'easeInOutQuad' // アニメーションのイージング関数
                });
            } else {
                // 新しいチャートを作成
                chart = new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [
                            {
                                label: '抽出結果',
                                data: [newData],
                                backgroundColor: 'rgba(246, 86, 50, 1)',
                                pointRadius: 11,
                                pointStyle: 'circle'
                                
                            },
                            {
                                label: '適正範囲',
                                data: [],
                                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                pointRadius: 0,
                                type: 'bubble'
                            }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false, // アスペクト比を維持しない
                        responsive: true, // チャートのリサイズを有効にする
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'EXTRACTION: Solubles Yield(EXT%)',
                                    font: {
                                        size: 16,
                                        weight: 'lighter' // フォントの太さを指定（細いフォント）

                                    },
                                },
                                min: 14,
                                max: 26,
                                ticks: {
                                    stepSize: 1, // マス目を増やす
                                    callback: function(value) {
                                        return value;
                                    }
                                }
                            },
                            y: {                 
                                title: {
                                    display: true,
                                    text: 'STRENGTH: Solubles Concentration(TDS%)',
                                    font: {
                                        size: 16, // フォントサイズを指定
                                        weight: 'lighter' // フォントの太さを指定（細いフォント）
                                        
                                    },
                                },
                                min: 0.80,
                                max: 1.9, // 縦軸の範囲を増やす
                                ticks: {
                                    stepSize: 0.05, // マス目を増やす
                                    callback: function(value) {
                                        // 一つ飛ばしでラベルを表示
                                        return (Math.round(value * 100) % 10 === 0 ? value.toFixed(2)  : '');
                                    }
                                }
                            },
                            y2: {
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'BREWING RATIO',
                                    color: 'rgba(0, 123, 255, 0.6)',
                                    font: {
                                        size: 17,
                                        weight: 'lighter' // フォントの太さを指定（細いフォント）

                                    },
                                    padding: {
                                        bottom: 20
                                    }
                                },
                                afterBuildTicks: function(axis) {
                                    // タイトルを右にずらす
                                    axis.right += 50;
                                },
                                min: 0.80,
                                max: 1.9, // 縦軸の範囲を増やす
                                ticks: {
                                    display: false // メモリのラベルを非表示にする
                                },
                                grid: {
                                    drawOnChartArea: false // グリッドラインを右側の軸には表示しない
                                }
                            }
                        },
                        plugins: {
                                legend: {
                                display: true,
                                align: 'start', // レジェンドを左揃えにする
                                labels: {
                                    boxWidth: 20,
                                    padding: 15
                                }
                            },
                                
                            annotation: {
                                annotations: {
                                    box1: {
                                        type: 'box',
                                        xMin: 14,
                                        xMax: 18,
                                        yMin: 0.80,
                                        yMax: 1.15,
                                        backgroundColor: 'rgba(255, 206, 86, 0.0)',
                                        borderWidth: 0
                                    },
                                    box2: {
                                        type: 'box',
                                        xMin: 18,
                                        xMax: 22,
                                        yMin: 0.80,
                                        yMax: 1.15,
                                        backgroundColor: 'rgba(75, 192, 192, 0.15)',
                                        borderWidth: 0.3
                                    },
                                    box3: {
                                        type: 'box',
                                        xMin: 22,
                                        xMax: 26,
                                        yMin: 0.80,
                                        yMax: 1.15,
                                        backgroundColor: 'rgba(255, 159, 64, 0.0)',
                                        borderWidth: 0
                                    },
                                    box4: {
                                        type: 'box',
                                        xMin: 14,
                                        xMax: 18,
                                        yMin: 1.15,
                                        yMax: 1.55,
                                        backgroundColor: 'rgba(153, 102, 255, 0.0)',
                                        borderWidth: 0.3
                                    },
                                    /*box5: {
                                        type: 'box',
                                        xMin: 18,
                                        xMax: 22,
                                        yMin: 1.15,
                                        yMax: 1.55,
                                        backgroundColor: 'rgba(75, 192, 192, 0.0)',
                                        borderWidth: 0,
                                        borderColor: 'rgba(75, 192, 192, 0.5)',
                                    },*/
                                    box6: {
                                        type: 'box',
                                        xMin: 22,
                                        xMax: 26,
                                        yMin: 1.15,
                                        yMax: 1.55,
                                        backgroundColor: 'rgba(255, 99, 132, 0.0)',
                                        borderWidth: 0.3
                                    },
                                    box7: {
                                        type: 'box',
                                        xMin: 14,
                                        xMax: 18,
                                        yMin: 1.55,
                                        yMax: 2,
                                        backgroundColor: 'rgba(75, 192, 192, 0.0)',
                                        borderWidth: 0
                                    },
                                    box8: {
                                        type: 'box',
                                        xMin: 18,
                                        xMax: 22,
                                        yMin: 1.55,
                                        yMax: 2,
                                        backgroundColor: 'rgba(75, 192, 192, 0.15)',
                                        borderWidth: 0.3
                                    },
                                    box9: {
                                        type: 'box',
                                        xMin: 22,
                                        xMax: 26,
                                        yMin: 1.55,
                                        yMax: 2,
                                        backgroundColor: 'rgba(75, 192, 192, 0.0)',
                                        borderWidth: 0
                                    },
                                    line0: {
                                        type: 'line',
                                        xMin: 8.53,
                                        xMax: 21.32,
                                        yMin: 0.8,
                                        yMax: 2, // 縦軸の範囲を増やす
                                        borderColor: 'rgba(0, 123, 255, 0.4)',
                                        borderWidth: 1.2,
                                        borderDash: [5, 0],
                                        label: {
                                            enabled: true,
                                            content: '1:12',
                                            position: 'end',
                                            xAdjust: 28,
                                            yAdjust: -15,
                                            backgroundColor: 'rgba(150, 150, 150, 1.0)',
                                            color: 'white',
                                            padding: 5,
                                            cornerRadius: 5,
                                            font: {
                                                size: 8, // フォントサイズを指定
                                            }
                                        }
                                    },
                                    line1: {
                                        type: 'line',
                                        xMin: 9.78,
                                        xMax: 24.30,
                                        yMin: 0.80,
                                        yMax: 2, // 縦軸の範囲を増やす
                                        borderColor: 'rgba(0, 123, 255, 0.4)',
                                        borderWidth: 1.2,
                                        borderDash: [5, 0],
                                        label: {
                                            enabled: true,
                                            content: '1:14',
                                            position: 'end',
                                            xAdjust: 28,
                                            yAdjust: -15,
                                            backgroundColor: 'rgba(150, 150, 150, 1.0)',
                                            color: 'white',
                                            padding: 1,
                                            cornerRadius: 5,
                                                font: {
                                                size: 8, // フォントサイズを指定
                                            }
                                        }
                                    },
                                    line2: {
                                        type: 'line',
                                        xMin: 10.80,
                                        xMax: 27,
                                        yMin: 0.8,
                                        yMax: 2, // 縦軸の範囲を増やす
                                        borderColor: 'rgba(0, 123, 255, 0.4)',
                                        borderWidth: 1.2,
                                        borderDash: [5, 0],
                                        label: {
                                            enabled: true,
                                            content: '1:15',
                                            position: 'end',
                                            xAdjust:  31,
                                            yAdjust:  -15,
                                            backgroundColor: 'rgba(150, 150, 150, 1.0)',
                                            color: 'white',
                                            padding: 5,
                                            cornerRadius: 5,
                                                font: {
                                                size: 8, // フォントサイズを指定
                                            }
                                        }
                                    },
                                    line3: {
                                        type: 'line',
                                        xMin: 11.60,
                                        xMax: 29,
                                        yMin: 0.8,
                                        yMax: 2, // 縦軸の範囲を増やす
                                        borderColor: 'rgba(0, 123, 255, 0.4)',
                                        borderWidth: 1.2,
                                        borderDash: [5, 0],
                                        label: {
                                            enabled: true,
                                            content: '1:16',
                                            position: 'end',
                                            xAdjust: 31,
                                            yAdjust: -15,
                                            backgroundColor: 'rgba(150, 150, 150, 1.0)',
                                            color: 'white',
                                            padding: 5,
                                            cornerRadius: 5,
                                                font: {
                                                size: 8, // フォントサイズを指定
                                            }
                                        }
                                    },
                                    line4: {
                                        type: 'line',
                                        xMin: 12.75,
                                        xMax: 31.88,
                                        yMin: 0.8,
                                        yMax: 2, // 縦軸の範囲を増やす
                                        borderColor: 'rgba(0, 123, 255, 0.4)',
                                        borderWidth: 1.2,
                                        borderDash: [5, 0],
                                        label: {
                                            enabled: true,
                                            content: '1:18',
                                            position: 'end',
                                            xAdjust: 31,
                                            yAdjust: -15,
                                            backgroundColor: 'rgba(150, 150, 150, 1.0)',
                                            color: 'white',
                                            padding: 5,
                                            cornerRadius: 5,
                                                font: {
                                                size: 8, // フォントサイズを指定
                                            }
                                        }
                                    },
                                    line5: {
                                        type: 'line',
                                        xMin: 14.44,
                                        xMax: 36.10,
                                        yMin: 0.8,
                                        yMax: 2, // 縦軸の範囲を増やす
                                        borderColor: 'rgba(0, 123, 255, 0.4)',
                                        borderWidth: 1.2,
                                        borderDash: [5, 0],
                                        label: {
                                            enabled: true,
                                            content: '1:20',
                                            position: 'end',
                                            xAdjust: 31,
                                            yAdjust: -15,
                                            backgroundColor: 'rgba(150, 150, 150, 1.0)',
                                            color: 'white',
                                            padding: 5,
                                            cornerRadius: 5,
                                                font: {
                                                size: 8, // フォントサイズを指定
                                            }
                                        }
                                    },
                                    line6: {
                                        type: 'line',
                                        xMin: 16.19,
                                        xMax: 40.48,
                                        yMin: 0.8,
                                        yMax: 2, // 縦軸の範囲を増やす
                                        borderColor: 'rgba(0, 123, 255, 0.4)',
                                        borderWidth: 1.2,
                                        borderDash: [5, 0],
                                        label: {
                                            enabled: true,
                                            content: '1:22',
                                            position: 'end',
                                            xAdjust: 31,
                                            yAdjust: -15,
                                            backgroundColor: 'rgba(150, 150, 150, 1.0)',
                                            color: 'white',
                                            padding: 5,
                                            cornerRadius: 5,
                                                font: {
                                                size: 8, // フォントサイズを指定
                                            }
                                        }
                                    },
                                    line7: {
                                        type: 'line',
                                        xMin: 18.38,
                                        xMax: 45.95,
                                        yMin: 0.8,
                                        yMax: 2, // 縦軸の範囲を増やす
                                        borderColor: 'rgba(0, 123, 255, 0.4)',
                                        borderWidth: 1.2,
                                        borderDash: [5, 0],
                                        label: {
                                            enabled: true,
                                            content: '1:25',
                                            position: 'end',
                                            xAdjust: 31,
                                            yAdjust: -15,
                                            backgroundColor: 'rgba(150, 150, 150, 1.0)',
                                            color: 'white',
                                            padding: 5,
                                            cornerRadius: 5,
                                                font: {
                                                size: 8, // フォントサイズを指定
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    plugins: [{
                        id: 'background',
                        beforeDraw: function(chart) {
                            const ctx = chart.ctx;
                            ctx.save();
                            ctx.fillStyle =  'rgba(75, 192, 192, 0.5)',
                            ctx.fillRect(
                                chart.scales.x.getPixelForValue(18),
                                chart.scales.y.getPixelForValue(1.55),
                                chart.scales.x.getPixelForValue(22) - chart.scales.x.getPixelForValue(18),
                                chart.scales.y.getPixelForValue(1.15) - chart.scales.y.getPixelForValue(1.55)
                            );
                            ctx.restore();
                        }
                    }]
                });
            }
        }
