// アコーディオンの動作
document.addEventListener('DOMContentLoaded', function() {
    // パターン1: 他のを閉じる（一度に1つだけ開く）
    const closeOthersAccordions = document.querySelectorAll('.accordion-close-others .accordion-item');
    
    closeOthersAccordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 同じアコーディオングループ内のすべてのアイテムを閉じる
            const parentAccordion = item.closest('.accordion');
            const allItemsInGroup = parentAccordion.querySelectorAll('.accordion-item');
            
            allItemsInGroup.forEach(accordionItem => {
                accordionItem.classList.remove('active');
            });
            
            // クリックされたアイテムが閉じていたら開く
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // パターン2: 他のを閉じない（複数同時に開く）
    const keepOpenAccordions = document.querySelectorAll('.accordion-keep-open .accordion-item');
    
    keepOpenAccordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // クリックされたアイテムのみをトグル
            item.classList.toggle('active');
        });
    });
});
