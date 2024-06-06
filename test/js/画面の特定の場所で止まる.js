function scrollDown() {
        const targetElement = document.getElementById('result');
        if (targetElement) {
            const elementRect = targetElement.getBoundingClientRect();
            const elementPosition = elementRect.top + window.pageYOffset;
            const offsetPosition = elementPosition - (window.innerHeight - elementRect.height);
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            console.error('Element with ID "result" not found.');
        }
    }
    
    // 確定ボタンを押すと下に自動に移動
    document.querySelector('button').addEventListener('click', scrollDown);
    