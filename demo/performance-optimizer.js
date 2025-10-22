// 性能优化脚本
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.optimizeAnimations();
    this.setupPreload();
    this.monitorPerformance();
  }

  // 图片懒加载
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // 动画性能优化
  optimizeAnimations() {
    // 使用requestAnimationFrame优化动画
    const optimizedAnimate = (callback) => {
      let ticking = false;
      
      return function() {
        if (!ticking) {
          requestAnimationFrame(() => {
            callback();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    // 监听滚动优化
    const handleScroll = optimizedAnimate(() => {
      // 滚动相关的动画逻辑
      this.updateParallax();
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 视差滚动效果
  updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 * (index + 1);
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  // 预加载关键资源
  setupPreload() {
    const criticalResources = [
      '/church/demo/style.css',
      '/church/demo/advanced-animations.css'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'style';
      document.head.appendChild(link);
    });
  }

  // 性能监控
  monitorPerformance() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.saveData) {
        this.enableSaveDataMode();
      }
    }

    // 监控核心网页指标
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.reportPerformance();
      }, 0);
    });
  }

  enableSaveDataMode() {
    // 为节省数据模式的用户优化
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.lowRes) {
        img.src = img.dataset.lowRes;
      }
    });
  }

  reportPerformance() {
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    if (navigationTiming) {
      const loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
      console.log(`页面加载时间: ${loadTime}ms`);
    }
  }
}

// 初始化性能优化
new PerformanceOptimizer();
