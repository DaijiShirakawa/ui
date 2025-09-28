// アコーディオンの動作
document.addEventListener('DOMContentLoaded', function() {
    // パターン1: 他のを閉じる（一度に1つだけ開く）
    const closeOthersAccordions = document.querySelectorAll('.accordion_close_others .accordion_item');
    
    closeOthersAccordions.forEach(item => {
        const header = item.querySelector('.accordion_header');
        
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 同じアコーディオングループ内のすべてのアイテムを閉じる
            const parentAccordion = item.closest('.accordion');
            const allItemsInGroup = parentAccordion.querySelectorAll('.accordion_item');
            
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
    const keepOpenAccordions = document.querySelectorAll('.accordion_keep_open .accordion_item');
    
    keepOpenAccordions.forEach(item => {
        const header = item.querySelector('.accordion_header');
        
        header.addEventListener('click', function() {
            // クリックされたアイテムのみをトグル
            item.classList.toggle('active');
        });
    });
});

// ヘッダーの横スクロール機能
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    
    // ヘッダーの横スクロールをコンテンツと同期
    function syncHeaderScroll() {
        // ページの横スクロール位置を取得
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // ヘッダーを同じ位置にスクロール
        header.scrollLeft = scrollLeft;
    }
    
    // ページの横スクロールイベントを監視
    window.addEventListener('scroll', syncHeaderScroll);
    
    // ヘッダーの横スクロールイベントを監視
    header.addEventListener('scroll', function() {
        // ヘッダーがスクロールされたら、ページも同じ位置にスクロール
        window.scrollTo(header.scrollLeft, window.pageYOffset);
    });
    
    // リサイズ時に同期
    window.addEventListener('resize', syncHeaderScroll);
    
    // 初期同期
    syncHeaderScroll();
});

// トップへ戻るボタンのスムーススクロール
document.addEventListener('DOMContentLoaded', function() {
    const topButton = document.querySelector('.top_button');
    const topButtonLink = document.querySelector('.top_button_link');
    const mv = document.querySelector('.mv');
    const footer = document.querySelector('.footer');
    
    // ボタンの表示/非表示制御
    function toggleTopButton() {
        const mvBottom = mv.offsetTop + mv.offsetHeight; // MVの下端位置
        const footerTop = footer.offsetTop; // フッターの上端位置
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight; // ウィンドウの高さ
        
        // MVを通り過ぎて、フッターが画面に表示されていない場合のみ表示
        if (scrollTop > mvBottom && scrollTop + windowHeight < footerTop) {
            topButton.classList.add('show');
        } else {
            topButton.classList.remove('show');
        }
    }
    
    // スクロールイベントでボタンの表示/非表示を制御
    window.addEventListener('scroll', toggleTopButton);
    
    // リサイズイベントでも制御
    window.addEventListener('resize', toggleTopButton);
    
    // 初期状態を設定
    toggleTopButton();
    
    // クリックイベントを追加
    topButtonLink.addEventListener('click', function(e) {
        e.preventDefault(); // デフォルトの動作をキャンセル
        
        // スムーススクロールでトップへ移動
        window.scrollTo({
            top: 0,
            left: 0, // 横スクロールもリセット
            behavior: 'smooth'
        });
    });
});

// Swiper スライダー初期化
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        // オプション
        loop: true,
        autoplay: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide',
        speed: 600,
    });
});

// Slick スライダー初期化
$(document).ready(function() {
    $('.slick_slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true, // デフォルトのドットを有効化
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '.slick_button_prev', // Swiperスタイルのボタンを指定
        nextArrow: '.slick_button_next', // Swiperスタイルのボタンを指定
    });
});
