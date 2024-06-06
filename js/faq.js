'use strict';
{
    // アコーディオン
    // DOM取得
    document.querySelectorAll('.js-qa__parent').forEach(function(el) {
        el.addEventListener('click', function() {
            const content = this.nextElementSibling;
    
            if (content.classList.contains('is-open')) {
                content.classList.remove('is-open');
            } else {
                // すべての.is-openクラスを削除
                document.querySelectorAll('.qa__child.is-open').forEach(function(openEl) {
                    openEl.classList.remove('is-open');
                });
                content.classList.add('is-open');
            }
        });
    });
    

}