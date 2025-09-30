// ========================================
// アコーディオン機能
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // パターン1: 他のを閉じる
    const accordionCloseOthers = document.querySelectorAll('.accordion_close_others .accordion_item');
    accordionCloseOthers.forEach(item => {
        const header = item.querySelector('.accordion_header');
        header.addEventListener('click', () => {
            // 他のアイテムを閉じる
            accordionCloseOthers.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // 現在のアイテムを切り替え
            item.classList.toggle('active');
        });
    });

    // パターン2: 開いたまま
    const accordionKeepOpen = document.querySelectorAll('.accordion_keep_open .accordion_item');
    accordionKeepOpen.forEach(item => {
        const header = item.querySelector('.accordion_header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});

// ========================================
// ヘッダーのスクロール制御
// ========================================

let lastScrollTop = 0;
let lastScrollLeft = 0;
let isHeaderVisible = true;

window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // 横スクロールの変化を検知
    const scrollLeftChanged = scrollLeft !== lastScrollLeft;
    const scrollTopChanged = scrollTop !== lastScrollTop;

    // 横スクロールが発生した場合の処理
    if (scrollLeftChanged) {
        // 横スクロール時はtransitionを無効化
        header.style.transition = "none";
        if (isHeaderVisible) {
            header.style.transform = `translateX(-${scrollLeft}px) translateY(0) translateZ(0)`;
        } else {
            header.style.transform = `translateX(-${scrollLeft}px) translateY(-100%) translateZ(0)`;
        }
    }

    // 縦スクロールでヘッダーの表示/非表示を制御
    if (scrollTop <= 100) {
        // 上から100px以内 → ヘッダーを表示
        if (!isHeaderVisible) {
            header.style.transition = "transform 0.3s ease";
            header.style.transform = `translateX(-${scrollLeft}px) translateY(0) translateZ(0)`;
            isHeaderVisible = true;
        }
    } else if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 下にスクロール & 100px以上 → ヘッダーを隠す
        if (isHeaderVisible) {
            header.style.transition = "transform 0.3s ease";
            header.style.transform = `translateX(-${scrollLeft}px) translateY(-100%) translateZ(0)`;
            isHeaderVisible = false;
        }
    } else if (scrollTop < lastScrollTop) {
        // 上にスクロール → ヘッダーを表示
        if (!isHeaderVisible) {
            header.style.transition = "transform 0.3s ease";
            header.style.transform = `translateX(-${scrollLeft}px) translateY(0) translateZ(0)`;
            isHeaderVisible = true;
        }
    }

    // 前回のスクロール位置を更新
    lastScrollTop = scrollTop;
    lastScrollLeft = scrollLeft;
});

// リサイズ時にも対応
window.addEventListener("resize", function () {
    const header = document.querySelector(".header");
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    if (isHeaderVisible) {
        header.style.transform = `translateX(-${scrollLeft}px) translateY(0) translateZ(0)`;
    } else {
        header.style.transform = `translateX(-${scrollLeft}px) translateY(-100%) translateZ(0)`;
    }
});

// ========================================
// トップへ戻るボタン
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const topButton = document.querySelector('.top_button');
    const topButtonLink = document.querySelector('.top_button_link');
    const footer = document.querySelector('.footer');

    // スクロール位置に応じてボタンの表示/非表示を制御
    function toggleTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const footerTop = footer.offsetTop;
        
        // 300px以上スクロールしていて、かつフッターが画面に表示されていない場合のみ表示
        if (scrollTop > 300 && scrollTop + windowHeight < footerTop) {
            topButton.classList.add('show');
        } else {
            topButton.classList.remove('show');
        }
    }

    // スクロールイベント
    window.addEventListener('scroll', toggleTopButton);
    
    // リサイズイベントでも制御
    window.addEventListener('resize', toggleTopButton);

    // クリックでトップに戻る
    topButtonLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ========================================
// Swiperスライダー
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.swiper', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
    });
});

// ========================================
// Slickスライダー
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    $('.slick_slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        arrows: true,
        prevArrow: '.slick_button_prev',
        nextArrow: '.slick_button_next',
    });
});

// ========================================
// フェード画像スライダー
// ========================================

class FadeSlider {
    constructor() {
        this.images = document.querySelectorAll('.fade_image .image');
        this.currentIndex = 0;
        this.interval = null;
        this.init();
    }

    init() {
        if (this.images.length === 0) return;
        
        // 最初の画像を表示
        this.images[0].classList.add('active');
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    nextSlide() {
        // 現在の画像をフェードアウト
        this.images[this.currentIndex].classList.add('fade-out');
        this.images[this.currentIndex].classList.remove('active');

        // 次の画像のインデックスを計算
        this.currentIndex = (this.currentIndex + 1) % this.images.length;

        // 次の画像を表示
        setTimeout(() => {
            this.images.forEach(img => {
                img.classList.remove('fade-out');
            });
            this.images[this.currentIndex].classList.add('active');
        }, 10000);
    }
}

// フェードスライダーを初期化
document.addEventListener('DOMContentLoaded', function() {
    new FadeSlider();
});

// ========================================
// Slickズームスライダー（Vanilla JS）
// ========================================

class ZoomSlider {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.slides = document.querySelectorAll('.slick_img');
        this.currentIndex = 0;
        this.interval = null;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        // 最初のスライドにアニメーションを追加
        this.slides[0].classList.add('add_animation');
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    nextSlide() {
        // 現在のスライドのアニメーションを削除
        this.slides[this.currentIndex].classList.remove('add_animation');

        // 次のスライドのインデックスを計算
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;

        // 次のスライドにアニメーションを追加
        setTimeout(() => {
            this.slides[this.currentIndex].classList.add('add_animation');
        }, 100);
    }
}

// ズームスライダーを初期化
document.addEventListener('DOMContentLoaded', function() {
    new ZoomSlider();
});