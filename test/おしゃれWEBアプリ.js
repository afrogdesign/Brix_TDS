document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const slides = document.querySelectorAll('.slide');
    const nextButtons = document.querySelectorAll('.next');
    const prevButtons = document.querySelectorAll('.prev');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
  
    let currentSlide = 0;
  
    // スライド遷移関数
    function showSlide(n) {
      slides[currentSlide].style.display = 'none';
      currentSlide = n;
      slides[currentSlide].style.display = 'block';
    }
  
    // 次へボタンのイベントリスナー
    nextButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (validateInputs(slides[index])) {
          showSlide(index + 1);
        }
      });
    });
  
    // 戻るボタンのイベントリスナー
    prevButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        showSlide(index);
      });
    });
  
    // 入力バリデーション
    function validateInputs(slide) {
      const inputs = slide.querySelectorAll('input[required]');
      return Array.from(inputs).every(input => input.value.trim() !== '');
    }
  
    // 計算ボタンのイベントリスナー
    calculateButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateInputs(slides[slides.length - 1])) {
        calculateRecipe();
      }
    });
  
    // レシピ計算関数
    function calculateRecipe() {
      const formData = new FormData(form);
      let result = '';
  
      // ここで実際の計算ロジックを実装します
      // 例として、入力値を単純に表示する処理を記述しています
      for (let [key, value] of formData.entries()) {
        result += `${key}: ${value}<br>`;
      }
  
      resultDiv.innerHTML = `<h2>計算結果:</h2>${result}`;
      resultDiv.style.display = 'block';
  
      // 結果表示時のスムーズなスクロール
      resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
  
    // 初期表示
    showSlide(0);
  });