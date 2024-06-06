        // tdsとextractionYieldの初期値を設定
        const tds = 1.15; // 例として1.2を設定
        const extractionYield = 17; // 例として20を設定

        const success = (tds >= 1.15 && tds <= 1.55 && extractionYield >= 18 && extractionYield <= 22);

        const condition1 = (tds > 1.55 && extractionYield < 18);
        const condition2 = (tds > 1.55 && extractionYield >= 18 && extractionYield <= 22);
        const condition3 = (tds > 1.55 && extractionYield > 22);

        const condition4 = (tds >= 1.15 && tds <= 1.55 && extractionYield < 18);
        const condition5 = (tds >= 1.15 && tds <= 1.55 && extractionYield > 22);

        const condition6 = (tds < 1.15 && extractionYield < 18);
        const condition7 = (tds < 1.15 && extractionYield >= 18 && extractionYield <= 22);
        const condition8 = (tds < 1.15 && extractionYield > 22);

        // 各条件を確認するためのログ（必要に応じて使用）
        console.log('適正範囲 (success):', success);
        console.log('左上 (condition1):', condition1);
        console.log('真ん中上 (condition2):', condition2);
        console.log('右上 (condition3):', condition3);
        console.log('真ん中左 (condition4):', condition4);
        console.log('真ん中右 (condition5):', condition5);
        console.log('下左 (condition6):', condition6);
        console.log('下真ん中 (condition7):', condition7);
        console.log('下右 (condition8):', condition8);

