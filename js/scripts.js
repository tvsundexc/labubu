// 完整轮播实现 - 支持多轮播项切换、导航按钮和指示器
window.addEventListener('DOMContentLoaded', function() {
  // 初始化轮播
  initReviewsCarousel();
  
  // 初始化FAQ手风琴功能
  initFaqAccordion();
});

function initReviewsCarousel() {
  // 获取轮播相关元素
  const carousel = document.querySelector('.reviews__carousel');
  const slides = document.querySelector('.reviews__slides');
  const slideItems = document.querySelectorAll('.reviews__slide');
  const prevBtn = document.querySelector('.reviews__prev');
  const nextBtn = document.querySelector('.reviews__next');
  const indicators = document.querySelectorAll('.reviews__indicator');
  
  // 确保元素存在
  if (!carousel || !slides || slideItems.length === 0) {
    console.log('轮播元素未找到');
    return;
  }
  
  let currentSlide = 0;
  let slideInterval;
  const slideCount = slideItems.length;
  
  // 设置轮播容器样式
  carousel.style.position = 'relative';
  carousel.style.width = '100%';
  carousel.style.height = 'auto';
  
  // 设置幻灯片容器样式
  slides.style.position = 'relative';
  slides.style.width = '100%';
  slides.style.height = 'auto';
  slides.style.overflow = 'hidden';
  
  // 初始化所有幻灯片样式
  slideItems.forEach((slide, index) => {
    slide.style.position = 'absolute';
    slide.style.top = '0';
    slide.style.left = '0';
    slide.style.width = '100%';
    slide.style.opacity = index === 0 ? '1' : '0';
    slide.style.visibility = index === 0 ? 'visible' : 'hidden';
    slide.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    slide.style.display = 'block';
    
    // 确保卡片内容可见
    const card = slide.querySelector('.reviews__card');
    if (card) {
      card.style.display = 'block';
      card.style.visibility = 'visible';
      card.style.opacity = '1';
    }
  });
  
  // 设置指示器样式
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === 0);
  });
  
  // 更新轮播容器高度
  updateCarouselHeight();
  
  // 切换到指定幻灯片
  function goToSlide(index) {
    // 确保索引在有效范围内
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    
    // 隐藏当前幻灯片，显示目标幻灯片
    slideItems.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.visibility = i === index ? 'visible' : 'hidden';
    });
    
    // 更新指示器状态
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
  }
  
  // 切换到下一张幻灯片
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  // 切换到上一张幻灯片
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // 更新轮播容器高度
  function updateCarouselHeight() {
    const activeSlide = slideItems[currentSlide];
    if (activeSlide) {
      const height = activeSlide.offsetHeight;
      slides.style.height = height + 'px';
    }
  }
  
  // 启动自动轮播
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  // 停止自动轮播
  function stopSlideshow() {
    clearInterval(slideInterval);
  }
  
  // 添加事件监听器
  prevBtn.addEventListener('click', () => {
    stopSlideshow();
    prevSlide();
    startSlideshow();
  });
  
  nextBtn.addEventListener('click', () => {
    stopSlideshow();
    nextSlide();
    startSlideshow();
  });
  
  // 添加指示器点击事件
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopSlideshow();
      goToSlide(index);
      startSlideshow();
    });
  });
  
  // 鼠标悬停暂停，离开继续
  carousel.addEventListener('mouseenter', stopSlideshow);
  carousel.addEventListener('mouseleave', startSlideshow);
  
  // 窗口大小改变时更新高度
  window.addEventListener('resize', updateCarouselHeight);
  
  // 启动轮播
  startSlideshow();
  
  console.log('轮播初始化完成，自动轮播已启动');
}

// FAQ手风琴功能实现
function initFaqAccordion() {
  // 获取所有FAQ问题按钮
  const faqQuestions = document.querySelectorAll('.faq__question');
  
  // 为每个问题添加点击事件监听
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // 获取父元素faq__item
      const faqItem = question.closest('.faq__item');
      
      // 切换active类
      faqItem.classList.toggle('active');
      
      // 更新aria属性
      const isActive = faqItem.classList.contains('active');
      question.setAttribute('aria-expanded', isActive);
      question.setAttribute('aria-controls', question.nextElementSibling.id || '');
      
      // 如果当前项展开，收起其他所有项
      if (isActive) {
        faqQuestions.forEach(otherQuestion => {
          if (otherQuestion !== question) {
            const otherItem = otherQuestion.closest('.faq__item');
            otherItem.classList.remove('active');
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  });
  
  console.log('FAQ手风琴初始化完成，支持点击展开/折叠和唯一展开功能');
}