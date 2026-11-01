/**
 * NOTARIUS-MEDIATOR.COM — ИНФОРМАЦИОННО-СПРАВОЧНЫЙ РЕСУРС
 * Нотариус и Профессиональный Медиатор Кабдрахманова Диана Ерболатовна
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '77027169990';

  /* ==========================================================================
     0. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ (ТЁМНАЯ / СВЕТЛАЯ)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleLabel = document.getElementById('themeToggleLabel');

  const syncThemeUI = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    if (themeToggleLabel) {
      themeToggleLabel.textContent = current === 'light' ? 'Тёмная' : 'Светлая';
    }
  };
  syncThemeUI();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('nm_theme', next);
      } catch (e) {}
      syncThemeUI();
    });
  }

  /* ==========================================================================
     1. ФИКСИРОВАННАЯ ШАПКА И МОБИЛЬНОЕ МЕНЮ
     ========================================================================== */
  const header = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const siteNav = document.getElementById('siteNav');

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     2. ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ ПРИ СКРОЛЛЕ
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ==========================================================================
     3. ФИЛЬТРАЦИЯ И ПОИСК ПО ПЕРЕЧНЮ НАПРАВЛЕНИЙ
     ========================================================================== */
  const codexTabs = document.querySelectorAll('.codex-tab');
  const codexChapters = document.querySelectorAll('.codex-chapter');
  const codexSearchInput = document.getElementById('codexSearchInput');
  const codexEmptyState = document.getElementById('codexEmptyState');

  let activeChapterFilter = 'all';

  const filterCodex = () => {
    const query = (codexSearchInput ? codexSearchInput.value : '').trim().toLowerCase();
    let visibleChaptersCount = 0;

    codexChapters.forEach((chapter) => {
      const chapterCat = chapter.getAttribute('data-chapter');
      const matchesTab = activeChapterFilter === 'all' || chapterCat === activeChapterFilter;

      const articles = chapter.querySelectorAll('.codex-article');
      let visibleArticlesInChapter = 0;

      articles.forEach((article) => {
        const text = article.textContent.toLowerCase();
        const matchesQuery = !query || text.includes(query);

        if (matchesTab && matchesQuery) {
          article.style.display = '';
          visibleArticlesInChapter++;
        } else {
          article.style.display = 'none';
        }
      });

      if (matchesTab && visibleArticlesInChapter > 0) {
        chapter.style.display = '';
        visibleChaptersCount++;
      } else {
        chapter.style.display = 'none';
      }
    });

    if (codexEmptyState) {
      codexEmptyState.style.display = visibleChaptersCount === 0 ? 'block' : 'none';
    }
  };

  codexTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      codexTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeChapterFilter = tab.getAttribute('data-filter') || 'all';
      filterCodex();
    });
  });

  if (codexSearchInput) {
    codexSearchInput.addEventListener('input', filterCodex);
  }

  /* ==========================================================================
     4. ТЕМАТИЧЕСКИЙ УКАЗАТЕЛЬ РАЗДЕЛОВ (СТРОГО ПО ТЗ)
     ========================================================================== */
  const scenariosData = {
    evidence: {
      stamp: 'РАЗДЕЛ I • НОТАРИАЛЬНЫЕ ДЕЙСТВИЯ',
      title: 'Обеспечение и заверение доказательств',
      summary:
        'Совершение нотариальных действий по обеспечению доказательств, заверению переписки в мессенджерах и социальных сетях, заверению документов и оформлению протоколов опроса свидетелей.',
      checklist: [
        'Обеспечение доказательств.',
        'Нотариальное заверение переписки в мессенджерах и социальных сетях: WhatsApp, Telegram, Instagram, TikTok, Threads, а также на сайтах.',
        'Заверение иных вещественных и электронных доказательств.',
        'Заверение документов.',
        'Оформление и заверение протоколов опроса свидетелей.'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по разделу «Обеспечение и заверение доказательств».'
    },
    business: {
      stamp: 'РАЗДЕЛ II • НОТАРИАЛЬНОЕ ОФОРМЛЕНИЕ',
      title: 'Сделки и договоры',
      summary:
        'Нотариальное оформление сделок купли-продажи бизнеса и автотранспорта, составление соглашений, графиков платежей, договоров о конфиденциальности, а также оформление согласий и доверенностей онлайн.',
      checklist: [
        'Купля-продажа ТОО и бизнеса.',
        'Купля-продажа автомобилей, в том числе с последующим выкупом.',
        'Определение долей в имуществе.',
        'Составление соглашений о совместной деятельности.',
        'Составление графиков платежей и соглашений о порядке погашения задолженности.',
        'Подготовка договоров с сотрудниками о неконкуренции.',
        'Составление соглашений о конфиденциальности (NDA).',
        'Оформление согласий и доверенностей онлайн.'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по разделу «Сделки и договоры».'
    },
    family: {
      stamp: 'РАЗДЕЛ III • БРАЧНО-СЕМЕЙНЫЕ ПРАВООТНОШЕНИЯ',
      title: 'Семейные и имущественные споры',
      summary:
        'Оформление соглашений и урегулирование вопросов, связанных с разделом общего имущества, выплатой алиментов, определением места жительства детей и порядка общения с ними.',
      checklist: [
        'Раздел совместно нажитого имущества.',
        'Определение размера и порядка выплаты алиментов.',
        'Определение места жительства детей и порядка общения с ними.',
        'Урегулирование семейных и имущественных споров.'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по разделу «Семейные и имущественные споры».'
    },
    mediation: {
      stamp: 'РАЗДЕЛ IV • ПРИМИРИТЕЛЬНЫЕ ПРОЦЕДУРЫ',
      title: 'Медиация и примирение сторон',
      summary:
        'Проведение процедур медиации по гражданским, трудовым спорам, делам о ДТП, а также банковская медиация и урегулирование споров по кредитным обязательствам.',
      checklist: [
        'Медиация по гражданским спорам.',
        'Медиация по уголовным делам в случаях, предусмотренных законодательством.',
        'Примирение сторон и заключение соглашений об урегулировании споров.',
        'Медиация по делам, связанным с дорожно-транспортными происшествиями (ДТП).',
        'Урегулирование трудовых споров, в том числе связанных с нарушением трудовых прав и условий трудовых договоров.',
        'Банковская медиация и урегулирование споров с банками второго уровня, в том числе с Народным банком (Halyk Bank), Банком ЦентрКредит (БЦК) и другими финансовыми организациями.',
        'Урегулирование споров по кредитным обязательствам, задолженностям и графикам платежей.'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по разделу «Медиация и примирение сторон».'
    },
    criminal: {
      stamp: 'РАЗДЕЛ V • УГОЛОВНОЕ ЗАКОНОДАТЕЛЬСТВО РК',
      title: 'Медиация по уголовным делам',
      summary:
        'Содействие в примирении сторон по уголовным делам в случаях, предусмотренных законодательством Республики Казахстан.',
      checklist: [
        'Содействие в примирении сторон по делам, предусмотренным статьями 106, 107, 108, 109, 190 и другими статьями Уголовного кодекса Республики Казахстан, с учётом категории правонарушения и требований законодательства.'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по разделу «Медиация по уголовным делам».'
    }
  };

  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  const dossierStamp = document.getElementById('dossierStamp');
  const dossierTitle = document.getElementById('dossierTitle');
  const dossierSummary = document.getElementById('dossierSummary');
  const dossierChecklist = document.getElementById('dossierChecklist');
  const dossierWaBtn = document.getElementById('dossierWaBtn');

  const renderScenario = (key) => {
    const data = scenariosData[key];
    if (!data) return;

    if (dossierStamp) dossierStamp.textContent = data.stamp;
    if (dossierTitle) dossierTitle.textContent = data.title;
    if (dossierSummary) dossierSummary.textContent = data.summary;

    if (dossierChecklist) {
      dossierChecklist.innerHTML = data.checklist
        .map((item) => `<li>${item}</li>`)
        .join('');
    }

    if (dossierWaBtn) {
      dossierWaBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(data.waText)}`;
    }
  };

  scenarioBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const key = btn.getAttribute('data-scenario');
      renderScenario(key);
    });
  });

  /* ==========================================================================
     5. ПЕРЕХОД В WHATSAPP ПО ПУНКТАМ ПЕРЕЧНЯ
     ========================================================================== */
  document.querySelectorAll('[data-wa-topic]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = el.getAttribute('data-wa-topic');
      const message = `Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по вопросу: «${topic}».`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  });

  /* ==========================================================================
     6. ПРОСМОТР СЕРТИФИКАТА И ФОТОГРАФИЙ (ЛАЙТБОКС)
     ========================================================================== */
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-lightbox-src]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-lightbox-src');
      const caption = trigger.getAttribute('data-lightbox-caption') || '';
      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = caption;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      }
    });
  });

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ==========================================================================
     7. ФОРМА ОБРАЩЕНИЯ (WHATSAPP И ПОЧТА)
     ========================================================================== */
  const dispatchForm = document.getElementById('dispatchForm');
  const sendEmailBtn = document.getElementById('sendEmailBtn');

  const buildFormPayload = () => {
    const name = (document.getElementById('clientName')?.value || '').trim() || 'Не указано';
    const phone = (document.getElementById('clientPhone')?.value || '').trim() || 'Не указан';
    const category = document.getElementById('clientCategory')?.value || 'Общий вопрос';
    const urgency = document.getElementById('clientUrgency')?.value || 'Личный приём';
    const details = (document.getElementById('clientDetails')?.value || '').trim() || 'Без дополнительного описания';

    return {
      name,
      phone,
      category,
      urgency,
      details,
      formattedText:
        `Здравствуйте, Диана Ерболатовна!\n` +
        `Обращение с сайта notarius-mediator.com:\n\n` +
        `• Ф. И. О.: ${name}\n` +
        `• Телефон: ${phone}\n` +
        `• Направление: ${category}\n` +
        `• Формат: ${urgency}\n` +
        `• Содержание вопроса: ${details}`
    };
  };

  if (dispatchForm) {
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = buildFormPayload();
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(payload.formattedText)}`;
      window.open(waUrl, '_blank', 'noopener');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const payload = buildFormPayload();
      const subject = `Обращение с сайта notarius-mediator.com: ${payload.category}`;
      const mailtoUrl = `mailto:diya.90@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(payload.formattedText)}`;
      window.location.href = mailtoUrl;
    });
  }
});
