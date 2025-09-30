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
// Slickズームスライダー（jQuery）
// ========================================

$(document).ready(function() {
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 2000,
        pauseOnFocus: false,
        pauseOnHover: false
    }).on('init', function() {
        // 最初のスライドにアニメーションを追加
        $('.slick-slide[data-slick-index="0"]').addClass('add_animation');
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        // 表示されているスライドにアニメーションを追加
        $('.slick-slide', this).eq(nextSlide).addClass('add_animation');
        // 前のスライドのアニメーションを削除
        $('.slick-slide', this).eq(currentSlide).removeClass('add_animation');
    });
});

// ========================================
// ローディング画面
// ========================================

//ローディング画面を取得
const loading = document.querySelector(".loading");

//ページの読み込み完了時に処理を実行
window.addEventListener("load", () => {
  //3秒後にローディング画面を非表示にする
  setTimeout(() => {
    loading.classList.add("loaded");
  }, 3000);
});

