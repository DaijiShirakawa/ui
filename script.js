// アコーディオンの動作
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function () {
            // 他のアイテムは閉じない
            item.classList.toggle('active');

            // 他のアイテムは閉じる
            accordionItems.forEach(item => {
                if (item !== item) {
                    item.classList.remove('active');
                }
            });
        });
    });
});