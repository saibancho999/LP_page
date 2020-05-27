jQuery(document).ready(function($) {
  jQuery(document).ready(function() {
    //ナビゲーション
    $('.Toggle').click(function() {
      $(this).toggleClass('active');

      if ($(this).hasClass('active')) {
        $('.NavMenu').addClass('active'); //クラスを付与
      } else {
        $('.NavMenu').removeClass('active'); //クラスを外す
      }
    });


    //スライドショー
    $('.mainVisual').each(function() {
      var $slides = $(this).find('img'),
        slideCount = $slides.length,
        currentIndex = 0;

      $slides.eq(currentIndex).fadeIn();
      setInterval(showNextSlide, 7500);

      function showNextSlide() {
        var nextIndex = (currentIndex + 1) % slideCount;
        $slides.eq(currentIndex).fadeOut();
        $slides.eq(nextIndex).fadeIn();
        currentIndex = nextIndex;
      }
    });

    var windowWidth = $(window).width();
    $('.mainVisual').css({
      height: windowWidth * 0.5625
    });



    //要素のフェイドイン
    $(window).scroll(function() {
      $('.fadein').each(function() {
        var elemPos = $(this).offset().top,
          scroll = $(window).scrollTop(),
          windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight + 100) {
          //$(this).addClass('scrollin');
          $(this).addClass('animated');
          $(this).addClass('zoomInUp');
          $(this).css({
            opacity: 1
          });
        }
      });
    });

    //募集職種モーダル
    // モーダルウィンドウが開くときの処理
    $(".modalOpen").click(function() {

      var navClass = $(this).attr("class"),
        href = $(this).attr("href"),
        innerTop = $('.innerTop').height(),
        innerContents = $('innerContents').height(),
        inner_height = innerTop + innerContents,
        windowHeight = $(window).height(),
        modal_margin = windowHeight * 0.1,
        modal_height = windowHeight * 0.8;
      current_scrollY = $(window).scrollTop();

      $(href).fadeIn();
      $(this).addClass("open");
      $('.inner').css({
        //marginTop: modal_margin,
        //marginButtom: modal_margin,
        //height: inner_height
      });
      $('main').css({
        position: 'fixed',
        top: -1 * current_scrollY,
        width: '100%',
      });
      //return false;
    });

    // モーダルウィンドウが閉じるときの処理
    $(".modalClose").click(function() {

      $(this).parents(".modal").fadeOut();
      $(".modalOpen").removeClass("open");
      $('main').attr({
        style: ''
      });
      $('html, body').prop({
        scrollTop: current_scrollY
      });
      //return false;
    });

    //背景
    var $content = $(".canvas"),
      fixedClass = "ca-fixed";

    $(window).on("load scroll", function() {
      var scroll = $(this).scrollTop();
      if (scroll > 100) { //100px以上スクロールしたら
        $content.addClass(fixedClass); //クラスを付与
      } else {
        $content.removeClass(fixedClass);
      }
    });

    //研修・福利厚生
    $('.welfareContents').slick({
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1400,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 500,
        settings: {
          slidesToShow: 1
        }
      }]
    });



    //Q&A
    $('.question1').on('click', function() {
      if (!$(this).hasClass('active')) { //【判定】自身にactiveクラスが無い＝閉じている場合
        $(this).addClass('active'); // 自身にactiveクラスを付与し、開いている管理状態に変更
        $(this).find('.answer').slideDown(); // 自身の子要素である.answerを開く
        $(this).find("span").text("-");
        $(this).siblings().removeClass('active'); // 自身の兄弟要素（自身以外の質問）からactiveクラスを削除し、閉じている管理状態に変更
        $(this).siblings().find('.answer').slideUp(); // 自身の兄弟要素（自身以外の質問）の子要素の.answerを全て閉じる

      } else { // 【判定】自身がactiveクラスを持っている=開いている場合
        $(this).removeClass('active'); // 自身からactiveクラスを削除し、閉じている管理状態に変更
        $(this).find('.answer').slideUp(); // 自身の子要素である.answerを閉じる
        $(this).find("span").text("+");
        $(this).siblings().find("span").text("+");
      }
    });

    //会社ロゴ
    var pp_height = $('.postingPosition').offset().top;
    $(window).on("load scroll", function() {
      var scroll = $(this).scrollTop();
      if (scroll > pp_height) {
        $('.header_logo').fadeIn();
        $('.logo').fadeOut();
      } else {
        $('.header_logo').fadeOut();
        $('.logo').fadeIn();
      }
    });

    //スクロールボタン
    //スクロールの処理内容
    var urlHash = location.hash;
    //ハッシュ値があればページ内スクロール
    if (urlHash) {
      //スクロールを0に戻す
      $('body,html').stop().scrollTop(0);
      setTimeout(function() {
        //ロード時の処理を待ち、時間差でスクロール実行
        scrollToAnker(urlHash);
      }, 100);
    }

    //通常のクリック時
    $('a[href^="#"]').click(function() {
      //ページ内リンク先を取得
      var href = $(this).attr("href");
      //リンク先が#か空だったらhtmlに
      var hash = href == "#" || href == "" ? 'html' : href;
      //スクロール実行
      scrollToAnker(hash);
      //リンク無効化
      return false;
    });

    // 関数：スムーススクロール
    // 指定したアンカー(#ID)へアニメーションでスクロール
    function scrollToAnker(hash) {
      var target = $(hash);
      var position = target.offset().top;
      $('body,html').stop().animate({
        scrollTop: position
      }, 500);
    }

    //募集職種のところで表示させる
    var pp_height = $('.postingPosition').offset().top;
    $(window).on("load scroll", function() {
      var scroll = $(this).scrollTop();
      if (scroll > pp_height) {
        $('.button').fadeIn();
      }
    });

    //メニューの開閉
    $('.Toggle').click(function() {
      var $button = $('.button a');
      if ($button.hasClass('rollOut')) {
        $button.removeClass('rollOut');
        $button.addClass('rollIn');
        $button.fadeIn();
        $('.button p').css({
          bottom: '36px',
          right: '40px'
        });
      } else {
        $button.removeClass('rollIn');
        $button.addClass('rollOut');
      }
      $('.menu_title').fadeOut();
    });

  });
});
