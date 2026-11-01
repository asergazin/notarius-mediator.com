/**
 * NOTARIUS-MEDIATOR.COM — INTERACTIVE LEGAL CODEX & SITUATION NAVIGATOR
 * Нотариус и Профессиональный Медиатор Кабдрахманова Диана Ерболатовна
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '77027169990';

  /* ==========================================================================
     0. THEME TOGGLE (ТЁМНАЯ / СВЕТЛАЯ ТЕМА)
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
     1. STICKY HEADER & MOBILE MENU
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
     2. SCROLL REVEAL CHOREOGRAPHY
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ==========================================================================
     3. CODEX OF COMPETENCIES — CHAPTER TABS & LIVE SEARCH
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
     4. INTERACTIVE LEGAL SITUATION NAVIGATOR (ДОСЬЕ РЕШЕНИЯ)
     ========================================================================== */
  const scenariosData = {
    evidence: {
      stamp: 'ГЛАВА I • СТ. 102–103 ЗАКОНА РК «О НОТАРИАТЕ»',
      title: 'Заверение переписки в мессенджерах, соцсетях и на сайтах',
      summary:
        'Обычный скриншот легко оспорить в суде, а оппонент может удалить сообщения в WhatsApp или Telegram в любой момент. Нотариальный протокол осмотра доказательств фиксирует факт, дату, время, метаданные и содержание переписки в WhatsApp, Telegram, Instagram, TikTok, Threads или на интернет-сайте, придавая им безусловную доказательственную силу.',
      statute: 'Ст. 102–103 Закона РК «О нотариате», ГПК РК',
      document: 'Протокол осмотра письменных и электронных доказательств',
      timing: 'В день обращения (от 40 минут)',
      format: 'Лично в офисе 101 (или выезд / срочный приём 24/7)',
      checklist: [
        'Устройство (смартфон или ноутбук), на котором открыта переписка или публикация',
        'Удостоверение личности заявителя (оригинал или цифровая версия в eGov)',
        'Точные реквизиты аккаунта / номера телефона отправителя и хронология сообщений',
        'При необходимости — фиксация голосовых сообщений, фото/видео и веб-страниц'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com. Мне необходимо нотариально заверить переписку / электронные доказательства для суда.'
    },
    banks: {
      stamp: 'ГЛАВА IV • БАНКОВСКАЯ И ФИНАНСОВАЯ МЕДИАЦИЯ',
      title: 'Урегулирование кредитных споров с Halyk Bank, БЦК и другими БВУ',
      summary:
        'Профессиональная банковская медиация позволяет остановить начисление непосильных штрафов, снять или предотвратить арест счетов и утвердить реальный график погашения задолженности с банками второго уровня (Народный банк / Halyk Bank, Банк ЦентрКредит / БЦК и др.), МФО и взыскателями.',
      statute: 'Закон РК «О медиации», Закон РК «О банках и банковской деятельности»',
      document: 'Медиативное соглашение и новый график погашения задолженности',
      timing: 'От 1 до 5 рабочих дней (с учётом согласования с БВУ)',
      format: 'Очно в Астане или дистанционно по РК',
      checklist: [
        'Кредитный договор, дополнительное соглашение или уведомление от банка / ЧСИ',
        'Справка об остатке ссудной задолженности (основной долг, вознаграждение, пеня)',
        'Предложение по комфортному ежемесячному платежу или реструктуризации',
        'Удостоверение личности заёмщика / созаёмщика / гаранта'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по вопросу банковской медиации и урегулирования графика платежей (Halyk Bank / БЦК / БВУ).'
    },
    criminal: {
      stamp: 'ГЛАВА V • СТ. 68, 106, 107, 108, 109, 190 УК РК',
      title: 'Примирение сторон по уголовным делам и делам о ДТП',
      summary:
        'Нейтральное, законное и деликатное проведение переговоров между сторонами по уголовным делам (ст. 106, 107, 108, 109, 190 и другим статьям УК РК с учётом категории правонарушения и требований законодательства), а также при дорожно-транспортных происшествиях. Оформление процессуально выверенного медиативного соглашения о примирении и заглаживании вреда.',
      statute: 'Ст. 68 УК РК, ст. 85 УПК РК, Закон РК «О медиации»',
      document: 'Медиативное соглашение о примирении сторон и возмещении вреда',
      timing: 'Срочный порядок — в день обращения (24/7 по записи)',
      format: 'Конфиденциальные переговоры в кабинете медиатора (оф. 101)',
      checklist: [
        'Квалификация деяния (статья УК РК) и стадия процесса (досудебное расследование / суд)',
        'Удостоверения личности сторон (потерпевшей стороны и стороны защиты / представителя)',
        'Согласование порядка, размера и сроков полного заглаживания причинённого вреда',
        'Соблюдение полной добровольности и процессуальных требований для прекращения дела'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com. Требуется профессиональная медиация и оформление примирения сторон по уголовному делу / ДТП.'
    },
    business: {
      stamp: 'ГЛАВА II • КОРПОРАТИВНОЕ ПРАВО И СДЕЛКИ',
      title: 'Купля-продажа ТОО, бизнеса, авто с выкупом, NDA и Non-Compete',
      summary:
        'Комплексное нотариальное оформление отчуждения долей в ТОО и готового бизнеса, договоров купли-продажи автомобилей (включая безопасную схему с последующим выкупом / рассрочкой), соглашений о совместной деятельности, графиков платежей, а также договоров о неконкуренции (NCA) и конфиденциальности (NDA) с сотрудниками.',
      statute: 'ГК РК, Закон РК «О ТОО и ТДО», Трудовой кодекс РК',
      document: 'Нотариальный договор купли-продажи / Соглашение о совместной деятельности / NDA',
      timing: 'От 30–60 минут (проверка через базу ЕНИС на месте)',
      format: 'Офис 101 (ул. Керей, Жанибек хандар, 18)',
      checklist: [
        'Для ТОО: устав, учредительные документы, решение/протокол участников, согласия супругов',
        'Для авто с выкупом: СРТС (техпаспорт), условия первоначального взноса и графика выкупа',
        'Для бизнеса и партнёрства: распределение долей, вкладов, ответственности и порядка выплат',
        'Проверка отсутствия арестов, залогов и обременений в государственных реестрах'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по вопросу оформления сделки (купля-продажа ТОО / авто с выкупом / договор NDA / график платежей).'
    },
    family: {
      stamp: 'ГЛАВА III • КОДЕКС РК «О БРАКЕ (СУПРУЖЕСТВЕ) И СЕМЬЕ»',
      title: 'Раздел имущества, алименты и определение места жительства детей',
      summary:
        'Цивилизованное урегулирование семейных и имущественных вопросов без многомесячных судебных заседаний и публичной огласки. Нотариальное соглашение об уплате алиментов имеет силу исполнительного листа, а соглашение о разделе общего имущества и порядке общения с детьми фиксирует твёрдые гарантии для обоих родителей.',
      statute: 'Кодекс РК «О браке (супружестве) и семье», Закон РК «О медиации»',
      document: 'Соглашение о разделе имущества / Алиментное соглашение / Медиативный договор',
      timing: '1 визит после согласования условий',
      format: 'Конфиденциальный приём в переговорной комнате',
      checklist: [
        'Свидетельство о заключении / расторжении брака и свидетельства о рождении детей',
        'Правоустанавливающие документы на недвижимость, транспорт, доли в бизнесе',
        'Согласованный размер алиментов (в твёрдой сумме, долях или путём передачи имущества)',
        'Порядок проживания детей, график встреч и участия в расходах на обучение и лечение'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com по семейному/имущественному вопросу (раздел имущества / алименты / порядок общения с детьми).'
    },
    online: {
      stamp: 'ГЛАВА II • ЦИФРОВОЙ НОТАРИАТ ЕНИС / EGOV',
      title: 'Оформление согласий и доверенностей онлайн',
      summary:
        'Дистанционное совершение нотариальных действий, не требующих обязательной личной явки в случаях, предусмотренных законодательством РК: оформление доверенностей, согласий супругов на совершение сделок, согласий родителей на выезд несовершеннолетних детей за границу через государственную систему ЕНИС с биометрической видеоидентификацией.',
      statute: 'Закон РК «О нотариате» (электронный нотариат ЕНИС)',
      document: 'Официальный электронный нотариальный документ с QR-кодом ЕНИС',
      timing: 'От 15–25 минут в режиме реального времени',
      format: 'Дистанционно (онлайн по видеосвязи и ЭЦП) или в офисе',
      checklist: [
        'Действующая ЭЦП (электронная цифровая подпись) и доступ к eGov Mobile',
        'Удостоверение личности заявителя и данные лица, на которое оформляется документ',
        'Смартфон или компьютер со стабильным интернетом и камерой для видеоидентификации',
        'Мгновенная регистрация документа в Единой нотариальной информационной системе (ЕНИС)'
      ],
      waText:
        'Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com. Мне необходимо оформить доверенность / согласие онлайн.'
    }
  };

  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  const dossierStamp = document.getElementById('dossierStamp');
  const dossierTitle = document.getElementById('dossierTitle');
  const dossierSummary = document.getElementById('dossierSummary');
  const dossierStatute = document.getElementById('dossierStatute');
  const dossierDocument = document.getElementById('dossierDocument');
  const dossierTiming = document.getElementById('dossierTiming');
  const dossierFormat = document.getElementById('dossierFormat');
  const dossierChecklist = document.getElementById('dossierChecklist');
  const dossierWaBtn = document.getElementById('dossierWaBtn');

  const renderScenario = (key) => {
    const data = scenariosData[key];
    if (!data) return;

    if (dossierStamp) dossierStamp.textContent = data.stamp;
    if (dossierTitle) dossierTitle.textContent = data.title;
    if (dossierSummary) dossierSummary.textContent = data.summary;
    if (dossierStatute) dossierStatute.textContent = data.statute;
    if (dossierDocument) dossierDocument.textContent = data.document;
    if (dossierTiming) dossierTiming.textContent = data.timing;
    if (dossierFormat) dossierFormat.textContent = data.format;

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
     5. CONTEXTUAL WHATSAPP LINKS FOR EVERY CODEX ARTICLE
     ========================================================================== */
  document.querySelectorAll('[data-wa-topic]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = el.getAttribute('data-wa-topic');
      const message = `Здравствуйте, Диана Ерболатовна! Обращаюсь с сайта notarius-mediator.com. Интересует услуга: «${topic}». Подскажите, пожалуйста, порядок записи и необходимые документы.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  });

  /* ==========================================================================
     6. LIGHTBOX MODAL FOR CERTIFICATES & PHOTOS
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
     7. DIRECT CONSULTATION DISPATCH FORM (WHATSAPP + EMAIL)
     ========================================================================== */
  const dispatchForm = document.getElementById('dispatchForm');
  const sendEmailBtn = document.getElementById('sendEmailBtn');

  const buildFormPayload = () => {
    const name = (document.getElementById('clientName')?.value || '').trim() || 'Не указано';
    const phone = (document.getElementById('clientPhone')?.value || '').trim() || 'Не указан';
    const category = document.getElementById('clientCategory')?.value || 'Общая консультация';
    const urgency = document.getElementById('clientUrgency')?.value || 'Плановый приём';
    const details = (document.getElementById('clientDetails')?.value || '').trim() || 'Без дополнительного описания';

    return {
      name,
      phone,
      category,
      urgency,
      details,
      formattedText:
        `Здравствуйте, Диана Ерболатовна!\n` +
        `Заявка с официального сайта notarius-mediator.com:\n\n` +
        `• Имя: ${name}\n` +
        `• Телефон: ${phone}\n` +
        `• Направление: ${category}\n` +
        `• Срочность: ${urgency}\n` +
        `• Суть вопроса: ${details}`
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
      const subject = `Заявка с сайта notarius-mediator.com: ${payload.category}`;
      const mailtoUrl = `mailto:diya.90@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(payload.formattedText)}`;
      window.location.href = mailtoUrl;
    });
  }
});

