class ArabicEnglishTranslator {
    constructor() {
        this.arabicInput = document.getElementById('arabicInput');
        this.translateBtn = document.getElementById('translateBtn');
        this.fanIcon = document.getElementById('fanIcon');
        this.loadingSection = document.getElementById('loadingSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.pronunciationBtn = document.getElementById('pronunciationBtn');
        
        this.initializeEventListeners();
        this.initializeExamples();
        this.loadDictionary();
    }

    initializeEventListeners() {
        this.translateBtn.addEventListener('click', () => this.translateWord());
        this.arabicInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.translateWord();
            }
        });
        
        this.pronunciationBtn.addEventListener('click', () => this.playPronunciation());
    }

    initializeExamples() {
        const exampleButtons = document.querySelectorAll('.example-btn');
        exampleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const word = button.dataset.word;
                this.arabicInput.value = word;
                this.translateWord();
                this.arabicInput.focus();
            });
        });
    }

    loadDictionary() {
        // قاموس شامل للكلمات العربية-الإنجليزية
        this.dictionary = {
            'كتاب': {
                english: 'book',
                pronunciation: '/bʊk/',
                type: 'noun',
                level: 'beginner',
                definition: 'A written or printed work consisting of pages glued or sewn together along one side and bound in covers.',
                examples: [
                    { english: 'I am reading a book.', arabic: 'أنا أقرأ كتاباً.' },
                    { english: 'This book is very interesting.', arabic: 'هذا الكتاب مثير جداً للاهتمام.' },
                    { english: 'She bought a new book.', arabic: 'اشترت كتاباً جديداً.' }
                ],
                synonyms: ['volume', 'publication', 'text', 'manual', 'handbook'],
                antonyms: ['magazine', 'newspaper', 'digital content'],
                compounds: ['bookstore', 'bookmark', 'bookshelf', 'textbook', 'notebook'],
                verbForms: null
            },
            'يجري': {
                english: 'run',
                pronunciation: '/rʌn/',
                type: 'verb',
                level: 'beginner',
                definition: 'Move at a speed faster than a walk, never having both or all the feet on the ground at the same time.',
                examples: [
                    { english: 'He runs every morning.', arabic: 'يجري كل صباح.' },
                    { english: 'The children are running in the park.', arabic: 'الأطفال يجرون في الحديقة.' },
                    { english: 'She ran to catch the bus.', arabic: 'جرت لتلحق بالحافلة.' }
                ],
                synonyms: ['jog', 'sprint', 'dash', 'race', 'hurry'],
                antonyms: ['walk', 'crawl', 'stop', 'rest'],
                compounds: ['runway', 'runaway', 'run-up', 'running'],
                verbForms: {
                    present: 'run/runs',
                    past: 'ran',
                    pastParticiple: 'run',
                    gerund: 'running'
                }
            },
            'جميل': {
                english: 'beautiful',
                pronunciation: '/ˈbjuːtɪfʊl/',
                type: 'adjective',
                level: 'beginner',
                definition: 'Pleasing the senses or mind aesthetically; having beauty.',
                examples: [
                    { english: 'She is very beautiful.', arabic: 'هي جميلة جداً.' },
                    { english: 'What a beautiful day!', arabic: 'يا له من يوم جميل!' },
                    { english: 'The sunset is beautiful.', arabic: 'غروب الشمس جميل.' }
                ],
                synonyms: ['pretty', 'lovely', 'gorgeous', 'stunning', 'attractive'],
                antonyms: ['ugly', 'hideous', 'unattractive', 'plain'],
                compounds: ['beautifully', 'beauty'],
                verbForms: null
            },
            'منزل': {
                english: 'house',
                pronunciation: '/haʊs/',
                type: 'noun',
                level: 'beginner',
                definition: 'A building for human habitation, especially one that consists of a ground floor and one or more upper storeys.',
                examples: [
                    { english: 'This is my house.', arabic: 'هذا منزلي.' },
                    { english: 'They bought a new house.', arabic: 'اشتروا منزلاً جديداً.' },
                    { english: 'The house has three bedrooms.', arabic: 'المنزل به ثلاث غرف نوم.' }
                ],
                synonyms: ['home', 'residence', 'dwelling', 'abode'],
                antonyms: ['homeless', 'outdoors'],
                compounds: ['household', 'housekeeper', 'housework', 'warehouse'],
                verbForms: null
            },
            'يدرس': {
                english: 'study',
                pronunciation: '/ˈstʌdi/',
                type: 'verb',
                level: 'beginner',
                definition: 'Devote time and attention to acquiring knowledge on an academic subject.',
                examples: [
                    { english: 'He studies mathematics.', arabic: 'يدرس الرياضيات.' },
                    { english: 'She is studying for her exam.', arabic: 'تدرس لامتحانها.' },
                    { english: 'We study English together.', arabic: 'ندرس الإنجليزية معاً.' }
                ],
                synonyms: ['learn', 'research', 'examine', 'analyze'],
                antonyms: ['ignore', 'neglect', 'play'],
                compounds: ['student', 'studies', 'study hall'],
                verbForms: {
                    present: 'study/studies',
                    past: 'studied',
                    pastParticiple: 'studied',
                    gerund: 'studying'
                }
            },
            'سعيد': {
                english: 'happy',
                pronunciation: '/ˈhæpi/',
                type: 'adjective',
                level: 'beginner',
                definition: 'Feeling or showing pleasure or contentment.',
                examples: [
                    { english: 'I am very happy today.', arabic: 'أنا سعيد جداً اليوم.' },
                    { english: 'She looks happy.', arabic: 'تبدو سعيدة.' },
                    { english: 'Happy birthday!', arabic: 'عيد ميلاد سعيد!' }
                ],
                synonyms: ['joyful', 'cheerful', 'glad', 'delighted', 'pleased'],
                antonyms: ['sad', 'unhappy', 'depressed', 'miserable'],
                compounds: ['happiness', 'happily'],
                verbForms: null
            },
            'طعام': {
                english: 'food',
                pronunciation: '/fuːd/',
                type: 'noun',
                level: 'beginner',
                definition: 'Any nutritious substance that people or animals eat or drink or that plants absorb in order to maintain life and growth.',
                examples: [
                    { english: 'I love Italian food.', arabic: 'أحب الطعام الإيطالي.' },
                    { english: 'The food is delicious.', arabic: 'الطعام لذيذ.' },
                    { english: 'We need to buy food.', arabic: 'نحتاج لشراء طعام.' }
                ],
                synonyms: ['meal', 'cuisine', 'nourishment', 'sustenance'],
                antonyms: ['poison', 'starvation'],
                compounds: ['foodstuff', 'food chain', 'fast food', 'seafood'],
                verbForms: null
            },
            'يسافر': {
                english: 'travel',
                pronunciation: '/ˈtrævəl/',
                type: 'verb',
                level: 'intermediate',
                definition: 'Go from one place to another, typically over a distance of some length.',
                examples: [
                    { english: 'He travels for work.', arabic: 'يسافر للعمل.' },
                    { english: 'We are traveling to Paris.', arabic: 'نحن نسافر إلى باريس.' },
                    { english: 'She loves to travel.', arabic: 'تحب السفر.' }
                ],
                synonyms: ['journey', 'voyage', 'tour', 'trip'],
                antonyms: ['stay', 'remain', 'settle'],
                compounds: ['traveler', 'travel agency', 'travel guide'],
                verbForms: {
                    present: 'travel/travels',
                    past: 'traveled',
                    pastParticiple: 'traveled',
                    gerund: 'traveling'
                }
            }
        };
    }

    async translateWord() {
        const word = this.arabicInput.value.trim();
        
        if (!word) {
            this.showError('يرجى إدخال كلمة عربية');
            return;
        }

        this.startTranslation();
        
        // محاكاة وقت البحث مع دوران المروحة
        await this.simulateSearching();
        
        const translation = this.dictionary[word];
        
        if (translation) {
            this.showResults(word, translation);
        } else {
            this.showNotFound(word);
        }
    }

    startTranslation() {
        // إخفاء النتائج السابقة
        this.resultsSection.classList.remove('show');
        
        // تشغيل دوران المروحة في الزر
        this.fanIcon.classList.add('fan-spinning');
        
        // إظهار شاشة التحميل
        this.loadingSection.classList.add('show');
        
        // تعطيل الزر
        this.translateBtn.disabled = true;
    }

    async simulateSearching() {
        // محاكاة وقت البحث (2-4 ثواني)
        const searchTime = 2000 + Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, searchTime));
    }

    showResults(arabicWord, translation) {
        // إيقاف التحميل
        this.loadingSection.classList.remove('show');
        this.fanIcon.classList.remove('fan-spinning');
        this.translateBtn.disabled = false;
        
        // ملء البيانات
        this.fillTranslationData(arabicWord, translation);
        
        // إظهار النتائج
        this.resultsSection.classList.add('show');
        
        // التمرير إلى النتائج
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    fillTranslationData(arabicWord, translation) {
        // الترجمة الأساسية
        document.getElementById('originalWord').textContent = arabicWord;
        document.getElementById('englishTranslation').textContent = translation.english;
        document.getElementById('pronunciation').textContent = translation.pronunciation;
        
        // التعريف
        document.getElementById('definition').textContent = translation.definition;
        
        // نوع الكلمة
        const wordTypeElement = document.getElementById('wordType');
        wordTypeElement.textContent = this.getArabicWordType(translation.type);
        
        // المستوى
        const levelElement = document.getElementById('level');
        levelElement.textContent = this.getArabicLevel(translation.level);
        levelElement.className = `level-badge level-${translation.level}`;
        
        // أمثلة الاستخدام
        this.fillExamples(translation.examples);
        
        // المرادفات
        this.fillSynonyms(translation.synonyms);
        
        // الأضداد
        this.fillAntonyms(translation.antonyms);
        
        // تصريفات الفعل
        this.fillVerbForms(translation.verbForms);
        
        // الكلمات المركبة
        this.fillCompounds(translation.compounds);
    }

    fillExamples(examples) {
        const examplesContainer = document.getElementById('examples');
        
        if (examples && examples.length > 0) {
            examplesContainer.innerHTML = examples.map(example => `
                <div class="example-item">
                    <div class="english">${example.english}</div>
                    <div class="arabic">${example.arabic}</div>
                </div>
            `).join('');
        } else {
            examplesContainer.innerHTML = '<p>لا توجد أمثلة متاحة</p>';
        }
    }

    fillSynonyms(synonyms) {
        const synonymsContainer = document.getElementById('synonyms');
        
        if (synonyms && synonyms.length > 0) {
            synonymsContainer.innerHTML = synonyms.map(synonym => 
                `<span class="synonym-tag">${synonym}</span>`
            ).join('');
        } else {
            synonymsContainer.innerHTML = '<p>لا توجد مرادفات متاحة</p>';
        }
    }

    fillAntonyms(antonyms) {
        const antonymsContainer = document.getElementById('antonyms');
        
        if (antonyms && antonyms.length > 0) {
            antonymsContainer.innerHTML = antonyms.map(antonym => 
                `<span class="antonym-tag">${antonym}</span>`
            ).join('');
        } else {
            antonymsContainer.innerHTML = '<p>لا توجد أضداد متاحة</p>';
        }
    }

    fillVerbForms(verbForms) {
        const verbFormsContainer = document.getElementById('verbForms');
        
        if (verbForms) {
            verbFormsContainer.innerHTML = `
                <div class="verb-forms">
                    <div class="verb-form">
                        <div class="form-name">المضارع</div>
                        <div class="form-word">${verbForms.present}</div>
                    </div>
                    <div class="verb-form">
                        <div class="form-name">الماضي</div>
                        <div class="form-word">${verbForms.past}</div>
                    </div>
                    <div class="verb-form">
                        <div class="form-name">اسم المفعول</div>
                        <div class="form-word">${verbForms.pastParticiple}</div>
                    </div>
                    <div class="verb-form">
                        <div class="form-name">المصدر</div>
                        <div class="form-word">${verbForms.gerund}</div>
                    </div>
                </div>
            `;
        } else {
            verbFormsContainer.innerHTML = '<p>ليس فعلاً</p>';
        }
    }

    fillCompounds(compounds) {
        const compoundsContainer = document.getElementById('compounds');
        
        if (compounds && compounds.length > 0) {
            compoundsContainer.innerHTML = `
                <div class="compounds-list">
                    ${compounds.map(compound => 
                        `<div class="compound-item">${compound}</div>`
                    ).join('')}
                </div>
            `;
        } else {
            compoundsContainer.innerHTML = '<p>لا توجد كلمات مركبة متاحة</p>';
        }
    }

    showNotFound(word) {
        this.loadingSection.classList.remove('show');
        this.fanIcon.classList.remove('fan-spinning');
        this.translateBtn.disabled = false;
        
        // إظهار رسالة عدم العثور على الكلمة
        this.fillNotFoundData(word);
        this.resultsSection.classList.add('show');
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    fillNotFoundData(word) {
        document.getElementById('originalWord').textContent = word;
        document.getElementById('englishTranslation').textContent = 'غير موجود في القاموس';
        document.getElementById('pronunciation').textContent = '-';
        document.getElementById('definition').textContent = 'عذراً، هذه الكلمة غير موجودة في قاموسنا حالياً. يرجى المحاولة بكلمة أخرى.';
        document.getElementById('wordType').textContent = '-';
        document.getElementById('level').textContent = '-';
        document.getElementById('examples').innerHTML = '<p>لا توجد أمثلة متاحة</p>';
        document.getElementById('synonyms').innerHTML = '<p>لا توجد مرادفات متاحة</p>';
        document.getElementById('antonyms').innerHTML = '<p>لا توجد أضداد متاحة</p>';
        document.getElementById('verbForms').innerHTML = '<p>غير متاح</p>';
        document.getElementById('compounds').innerHTML = '<p>غير متاح</p>';
    }

    playPronunciation() {
        const englishWord = document.getElementById('englishTranslation').textContent;
        
        if (englishWord && englishWord !== '-' && englishWord !== 'غير موجود في القاموس') {
            // استخدام Web Speech API للنطق
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(englishWord);
                utterance.lang = 'en-US';
                utterance.rate = 0.8;
                utterance.pitch = 1;
                
                // تأثير بصري للزر
                this.pronunciationBtn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.pronunciationBtn.style.transform = '';
                }, 200);
                
                speechSynthesis.speak(utterance);
            } else {
                alert('عذراً، متصفحك لا يدعم خاصية النطق');
            }
        }
    }

    getArabicWordType(type) {
        const types = {
            'noun': 'اسم',
            'verb': 'فعل',
            'adjective': 'صفة',
            'adverb': 'ظرف',
            'preposition': 'حرف جر',
            'pronoun': 'ضمير',
            'conjunction': 'حرف عطف'
        };
        return types[type] || type;
    }

    getArabicLevel(level) {
        const levels = {
            'beginner': 'مبتدئ',
            'intermediate': 'متوسط',
            'advanced': 'متقدم'
        };
        return levels[level] || level;
    }

    showError(message) {
        alert(message);
        this.arabicInput.focus();
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new ArabicEnglishTranslator();
    
    // إضافة تأثيرات بصرية للأزرار
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });

    // إضافة اختصارات لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    document.getElementById('translateBtn').click();
                    break;
            }
        }
    });

    // تأثيرات اللمس للأجهزة المحمولة
    if ('ontouchstart' in window) {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('touchstart', function() {
                if (!this.disabled) {
                    this.style.transform = 'scale(0.95)';
                }
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    console.log('🌟 مترجم شامل جاهز للاستخدام!');
    console.log('المميزات المتاحة:');
    console.log('- ترجمة شاملة من العربية إلى الإنجليزية');
    console.log('- تفاصيل كاملة عن كل كلمة');
    console.log('- نطق الكلمات الإنجليزية');
    console.log('- أمثلة ومرادفات وأضداد');
    console.log('- تصريفات الأفعال والكلمات المركبة');
});