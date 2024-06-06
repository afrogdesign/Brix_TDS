function calculateDifference(tds, extractionYield) {
        const minTDS = 1.15;
        const maxTDS = 1.55;
        const minExtractionYield = 18;
        const maxExtractionYield = 22;
    
        let tdsDifference = 0;
        let extractionYieldDifference = 0;
    
        if (tds < minTDS) {
            tdsDifference = minTDS - tds;
        } else if (tds > maxTDS) {
            tdsDifference = tds - maxTDS;
        }
    
        if (extractionYield < minExtractionYield) {
            extractionYieldDifference = minExtractionYield - extractionYield;
        } else if (extractionYield > maxExtractionYield) {
            extractionYieldDifference = extractionYield - maxExtractionYield;
        }
    
        return {
            tdsDifference,
            extractionYieldDifferencew
        };
    }
    
    // 例: 入力された数値
    const tds = 1.12;
    const extractionYield = 19;
    
    const differences = calculateDifference(tds, extractionYield);
    console.log(`TDSの差分: ${differences.tdsDifference}`);
    console.log(`抽出収率の差分: ${differences.extractionYieldDifference}`);
    