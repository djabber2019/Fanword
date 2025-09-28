class BilingualTranslator {
    constructor() {
        this.wordInput = document.getElementById('wordInput');
        this.translateBtn = document.getElementById('translateBtn');
        this.fanIcon = document.getElementById('fanIcon');
        this.loadingSection = document.getElementById('loadingSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.pronunciationBtn = document.getElementById('pronunciationBtn');
        this.detectedLanguage = document.getElementById('detectedLanguage');
        
        // Premium status
        this.isPremium = false;
        
        this.initializeEventListeners();
        this.initializeExamples();
        this.loadDictionary();
    }

    initializeEventListeners() {
        this.translateBtn.addEventListener('click', () => this.translateWord());
        this.wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.translateWord();
            }
        });
        
        this.wordInput.addEventListener('input', () => this.detectLanguage());
        
        this.pronunciationBtn.addEventListener('click', () => this.playPronunciation());
    }

    initializeExamples() {
        const exampleButtons = document.querySelectorAll('.example-btn');
        exampleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const word = button.dataset.word;
                this.wordInput.value = word;
                this.detectLanguage();
                this.translateWord();
                this.wordInput.focus();
            });
        });
    }

    detectLanguage() {
        const word = this.wordInput.value.trim();
        if (!word) {
            this.detectedLanguage.textContent = '-';
            return;
        }

        // Simple language detection based on character sets
        const arabicRegex = /[\u0600-\u06FF]/;
        const englishRegex = /^[a-zA-Z\s]+$/;

        if (arabicRegex.test(word)) {
            this.detectedLanguage.textContent = 'عربي 🇸🇦';
        } else if (englishRegex.test(word)) {
            this.detectedLanguage.textContent = 'English 🇺🇸';
        } else {
            this.detectedLanguage.textContent = 'غير محدد';
        }
    }

    loadDictionary() {
        // Extended bilingual dictionary
        this.dictionary = {
            // Arabic to English
            'كتاب': {
                english: 'book',
                arabic: 'كتاب',
                pronunciation: '/bʊk/',
                type: 'noun',
                level: 'beginner',
                basicDefinition: 'مجموعة من الصفحات المطبوعة أو المكتوبة مجمعة معاً',
                detailedDefinition: 'A written or printed work consisting of pages glued or sewn together along one side and bound in covers. Books can contain fiction, non-fiction, poetry, or reference material.',
                examples: [
                    { english: 'I am reading a fascinating book.', arabic: 'أنا أقرأ كتاباً رائعاً.' },
                    { english: 'This book changed my perspective.', arabic: 'هذا الكتاب غير وجهة نظري.' },
                    { english: 'She published her first book last year.', arabic: 'نشرت كتابها الأول العام الماضي.' }
                ],
                synonyms: ['volume', 'publication', 'text', 'manual', 'handbook', 'tome'],
                antonyms: ['magazine', 'newspaper', 'digital content', 'oral tradition'],
                compounds: ['bookstore', 'bookmark', 'bookshelf', 'textbook', 'notebook', 'bookworm'],
                verbForms: null,
                sourceLanguage: 'arabic',
                targetLanguage: 'english'
            },
            'يجري': {
                english: 'run',
                arabic: 'يجري',
                pronunciation: '/rʌn/',
                type: 'verb',
                level: 'beginner',
                basicDefinition: 'يتحرك بسرعة على القدمين',
                detailedDefinition: 'Move at a speed faster than a walk, never having both or all the feet on the ground at the same time. Can also mean to operate, manage, or be in charge of something.',
                examples: [
                    { english: 'He runs every morning for exercise.', arabic: 'يجري كل صباح للتمرين.' },
                    { english: 'The children run happily in the park.', arabic: 'الأطفال يجرون بسعادة في الحديقة.' },
                    { english: 'She runs a successful business.', arabic: 'تدير عملاً ناجحاً.' }
                ],
                synonyms: ['jog', 'sprint', 'dash', 'race', 'hurry', 'operate', 'manage'],
                antonyms: ['walk', 'crawl', 'stop', 'rest', 'halt'],
                compounds: ['runway', 'runaway', 'run-up', 'running', 'runner'],
                verbForms: {
                    present: 'run/runs',
                    past: 'ran',
                    pastParticiple: 'run',
                    gerund: 'running'
                },
                sourceLanguage: 'arabic',
                targetLanguage: 'english'
            },
            'جميل': {
                english: 'beautiful',
                arabic: 'جميل',
                pronunciation: '/ˈbjuːtɪfʊl/',
                type: 'adjective',
                level: 'beginner',
                basicDefinition: 'يتصف بالجمال والحسن',
                detailedDefinition: 'Pleasing the senses or mind aesthetically; having beauty. Can describe physical appearance, art, music, or abstract concepts that evoke pleasure or admiration.',
                examples: [
                    { english: 'She has a beautiful smile.', arabic: 'لديها ابتسامة جميلة.' },
                    { english: 'What a beautiful sunset!', arabic: 'يا له من غروب جميل!' },
                    { english: 'The music was absolutely beautiful.', arabic: 'كانت الموسيقى جميلة تماماً.' }
                ],
                synonyms: ['pretty', 'lovely', 'gorgeous', 'stunning', 'attractive', 'magnificent'],
                antonyms: ['ugly', 'hideous', 'unattractive', 'plain', 'repulsive'],
                compounds: ['beautifully', 'beauty', 'beautify', 'beautification'],
                verbForms: null,
                sourceLanguage: 'arabic',
                targetLanguage: 'english'
            },

            // English to Arabic
            'beautiful': {
                english: 'beautiful',
                arabic: 'جميل',
                pronunciation: '/ˈbjuːtɪfʊl/',
                type: 'adjective',
                level: 'beginner',
                basicDefinition: 'Having beauty; pleasing to look at',
                detailedDefinition: 'Pleasing the senses or mind aesthetically; having beauty. Can describe physical appearance, art, music, or abstract concepts that evoke pleasure or admiration.',
                examples: [
                    { english: 'She has a beautiful smile.', arabic: 'لديها ابتسامة جميلة.' },
                    { english: 'What a beautiful sunset!', arabic: 'يا له من غروب جميل!' },
                    { english: 'The music was absolutely beautiful.', arabic: 'كانت الموسيقى جميلة تماماً.' }
                ],
                synonyms: ['pretty', 'lovely', 'gorgeous', 'stunning', 'attractive', 'magnificent'],
                antonyms: ['ugly', 'hideous', 'unattractive', 'plain', 'repulsive'],
                compounds: ['beautifully', 'beauty', 'beautify', 'beautification'],
                verbForms: null,
                sourceLanguage: 'english',
                targetLanguage: 'arabic'
            },
            'house': {
                english: 'house',
                arabic: 'منزل',
                pronunciation: '/haʊs/',
                type: 'noun',
                level: 'beginner',
                basicDefinition: 'A building where people live',
                detailedDefinition: 'A building for human habitation, especially one that consists of a ground floor and one or more upper storeys. It typically includes rooms for sleeping, eating, and living.',
                examples: [
                    { english: 'This is my house.', arabic: 'هذا منزلي.' },
                    { english: 'They bought a new house.', arabic: 'اشتروا منزلاً جديداً.' },
                    { english: 'The house has a beautiful garden.', arabic: 'المنزل له حديقة جميلة.' }
                ],
                synonyms: ['home', 'residence', 'dwelling', 'abode', 'domicile'],
                antonyms: ['homeless', 'outdoors', 'street'],
                compounds: ['household', 'housekeeper', 'housework', 'warehouse', 'greenhouse'],
                verbForms: null,
                sourceLanguage: 'english',
                targetLanguage: 'arabic'
            },
            'study': {
                english: 'study',
                arabic: 'يدرس',
                pronunciation: '/ˈstʌdi/',
                type: 'verb',
                level: 'beginner',
                basicDefinition: 'To learn about something',
                detailedDefinition: 'Devote time and attention to acquiring knowledge on an academic subject, especially by means of books. Can also mean to examine something carefully.',
                examples: [
                    { english: 'He studies mathematics at university.', arabic: 'يدرس الرياضيات في الجامعة.' },
                    { english: 'She is studying for her final exams.', arabic: 'تدرس لامتحاناتها النهائية.' },
                    { english: 'Scientists study climate change.', arabic: 'العلماء يدرسون تغير المناخ.' }
                ],
                synonyms: ['learn', 'research', 'examine', 'analyze', 'investigate'],
                antonyms: ['ignore', 'neglect', 'play', 'relax'],
                compounds: ['student', 'studies', 'study hall', 'case study'],
                verbForms: {
                    present: 'study/studies',
                    past: 'studied',
                    pastParticiple: 'studied',
                    gerund: 'studying'
                },
                sourceLanguage: 'english',
                targetLanguage: 'arabic'
            },
            'travel': {
                english: 'travel',
                arabic: 'يسافر',
                pronunciation: '/ˈtrævəl/',
                type: 'verb',
                level: 'intermediate',
                basicDefinition: 'To go from one place to another',
                detailedDefinition: 'Go from one place to another, typically over a distance of some length. Travel can be for business, pleasure, education, or other purposes.',
                examples: [
                    { english: 'He travels for work frequently.', arabic: 'يسافر للعمل بكثرة.' },
                    { english: 'We are planning to travel to Europe.', arabic: 'نخطط للسفر إلى أوروبا.' },
                    { english: 'She loves to travel and explore new cultures.', arabic: 'تحب السفر واستكشاف ثقافات جديدة.' }
                ],
                synonyms: ['journey', 'voyage', 'tour', 'trip', 'explore'],
                antonyms: ['stay', 'remain', 'settle', 'reside'],
                compounds: ['traveler', 'travel agency', 'travel guide', 'business travel'],
                verbForms: {
                    present: 'travel/travels',
                    past: 'traveled',
                    pastParticiple: 'traveled',
                    gerund: 'traveling'
                },
                sourceLanguage: 'english',
                targetLanguage: 'arabic'
            },

            // Additional Arabic words
            'منزل': {
                english: 'house',
                arabic: 'منزل',
                pronunciation: '/haʊs/',
                type: 'noun',
                level: 'beginner',
                basicDefinition: 'مبنى للسكن',
                detailedDefinition: 'A building for human habitation, especially one that consists of a ground floor and one or more upper storeys.',
                examples: [
                    { english: 'This is my house.', arabic: 'هذا منزلي.' },
                    { english: 'They bought a new house.', arabic: 'اشتروا منزلاً جديداً.' }
                ],
                synonyms: ['home', 'residence', 'dwelling', 'abode'],
                antonyms: ['homeless', 'outdoors'],
                compounds: ['household', 'housekeeper', 'housework'],
                verbForms: null,
                sourceLanguage: 'arabic',
                targetLanguage: 'english'
            },
            'يدرس': {
                english: 'study',
                arabic: 'يدرس',
                pronunciation: '/ˈstʌdi/',
                type: 'verb',
                level: 'beginner',
                basicDefinition: 'يتعلم ويكتسب المعرفة',
                detailedDefinition: 'Devote time and attention to acquiring knowledge on an academic subject.',
                examples: [
                    { english: 'He studies mathematics.', arabic: 'يدرس الرياضيات.' },
                    { english: 'She is studying for her exam.', arabic: 'تدرس لامتحانها.' }
                ],
                synonyms: ['learn', 'research', 'examine'],
                antonyms: ['ignore', 'neglect', 'play'],
                compounds: ['student', 'studies'],
                verbForms: {
                    present: 'study/studies',
                    past: 'studied',
                    pastParticiple: 'studied',
                    gerund: 'studying'
                },
                sourceLanguage: 'arabic',
                targetLanguage: 'english'
            },
            'سعيد': {
                english: 'happy',
                arabic: 'سعيد',
                pronunciation: '/ˈhæpi/',
                type: 'adjective',
                level: 'beginner',
                basicDefinition: 'يشعر بالفرح والسرور',
                detailedDefinition: 'Feeling or showing pleasure or contentment.',
                examples: [
                    { english: 'I am very happy today.', arabic: 'أنا سعيد جداً اليوم.' },
                    { english: 'She looks happy.', arabic: 'تبدو سعيدة.' }
                ],
                synonyms: ['joyful', 'cheerful', 'glad', 'delighted'],
                antonyms: ['sad', 'unhappy', 'depressed'],
                compounds: ['happiness', 'happily'],
                verbForms: null,
                sourceLanguage: 'arabic',
                targetLanguage: 'english'
            },
            'طعام': {
                english: 'food',
                arabic: 'طعام',
                pronunciation: '/fuːd/',
                type: 'noun',
                level: 'beginner',
                basicDefinition: 'ما يؤكل للتغذية',
                detailedDefinition: 'Any nutritious substance that people or animals eat or drink.',
                examples: [
                    { english: 'I love Italian food.', arabic: 'أحب الطعام الإيطالي.' },
                    { english: 'The food is delicious.', arabic: 'الطعام لذيذ.' }
                ],
                synonyms: ['meal', 'cuisine', 'nourishment'],
                antonyms: ['poison', 'starvation'],
                compounds: ['foodstuff', 'fast food', 'seafood'],
                verbForms: null,
                sourceLanguage: 'arabic',
                targetLanguage: 'english'
            },
            'يسافر': {
                english: 'travel',
                arabic: 'يسافر',
                pronunciation: '/ˈtrævəl/',
                type: 'verb',
                level: 'intermediate',
                basicDefinition: 'ينتقل من مكان إلى آخر',
                detailedDefinition: 'Go from one place to another, typically over a distance of some length.',
                examples: [
                    { english: 'He travels for work.', arabic: 'يسافر للعمل.' },
                    { english: 'We are traveling to Paris.', arabic: 'نحن نسافر إلى باريس.' }
                ],
                synonyms: ['journey', 'voyage', 'tour'],
                antonyms: ['stay', 'remain', 'settle'],
                compounds: ['traveler', 'travel agency'],
                verbForms: {
                    present: 'travel/travels',
                    past: 'traveled',
                    pastParticiple: 'traveled',
                    gerund: 'traveling'
                },
                sourceLanguage: 'arabic',
                targetLanguage: 'english'
            }
        };
    }

    async translateWord() {
        const word = this.wordInput.value.trim();
        
        if (!word) {
            this.showError('يرجى إدخال كلمة للترجمة');
            return;
        }

        this.startTranslation();
        
        // Simulate search time with spinning fan
        await this.simulateSearching();
        
        const translation = this.dictionary[word.toLowerCase()];
        
        if (translation) {
            this.showResults(word, translation);
        } else {
            this.showNotFound(word);
        }
    }

    startTranslation() {
        // Hide previous results
        this.resultsSection.classList.remove('show');
        
        // Start fan spinning
        this.fanIcon.classList.add('fan-spinning');
        
        // Show loading screen
        this.loadingSection.classList.add('show');
        
        // Disable button
        this.translateBtn.disabled = true;
    }

    async simulateSearching() {
        // Simulate search time (2-4 seconds)
        const searchTime = 2000 + Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, searchTime));
    }

    showResults(inputWord, translation) {
        // Stop loading
        this.loadingSection.classList.remove('show');
        this.fanIcon.classList.remove('fan-spinning');
        this.translateBtn.disabled = false;
        
        // Fill translation data
        this.fillTranslationData(inputWord, translation);
        
        // Show results
        this.resultsSection.classList.add('show');
        
        // Scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    fillTranslationData(inputWord, translation) {
        // Basic translation
        document.getElementById('originalWord').textContent = inputWord;
        document.getElementById('translatedWord').textContent = 
            translation.sourceLanguage === 'arabic' ? translation.english : translation.arabic;
        document.getElementById('pronunciation').textContent = translation.pronunciation;
        
        // Language flags
        const originalLang = translation.sourceLanguage === 'arabic' ? 'عربي 🇸🇦' : 'English 🇺🇸';
        document.getElementById('originalLanguage').textContent = originalLang;
        
        // Basic definition (always available)
        document.getElementById('basicDefinition').textContent = translation.basicDefinition;
        
        // Word type (always available)
        const wordTypeElement = document.getElementById('wordType');
        wordTypeElement.textContent = this.getArabicWordType(translation.type);
        
        // Premium features
        if (this.isPremium) {
            this.showPremiumContent(translation);
        } else {
            this.hidePremiumContent();
        }
    }

    showPremiumContent(translation) {
        // Hide premium overlays
        document.querySelectorAll('.premium-overlay').forEach(overlay => {
            overlay.style.display = 'none';
        });
        
        // Show premium content
        document.querySelectorAll('.premium-content').forEach(content => {
            content.style.display = 'block';
        });
        
        // Fill premium data
        document.getElementById('detailedDefinition').textContent = translation.detailedDefinition;
        
        const levelElement = document.getElementById('level');
        levelElement.textContent = this.getArabicLevel(translation.level);
        levelElement.className = `level-badge level-${translation.level}`;
        
        this.fillExamples(translation.examples);
        this.fillSynonyms(translation.synonyms);
        this.fillAntonyms(translation.antonyms);
        this.fillVerbForms(translation.verbForms);
    }

    hidePremiumContent() {
        // Show premium overlays
        document.querySelectorAll('.premium-overlay').forEach(overlay => {
            overlay.style.display = 'flex';
        });
        
        // Hide premium content
        document.querySelectorAll('.premium-content').forEach(content => {
            content.style.display = 'none';
        });
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

    showNotFound(word) {
        this.loadingSection.classList.remove('show');
        this.fanIcon.classList.remove('fan-spinning');
        this.translateBtn.disabled = false;
        
        // Show not found message
        this.fillNotFoundData(word);
        this.resultsSection.classList.add('show');
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    fillNotFoundData(word) {
        document.getElementById('originalWord').textContent = word;
        document.getElementById('translatedWord').textContent = 'غير موجود في القاموس';
        document.getElementById('pronunciation').textContent = '-';
        document.getElementById('basicDefinition').textContent = 'عذراً، هذه الكلمة غير موجودة في قاموسنا حالياً. يرجى المحاولة بكلمة أخرى أو ترقية حسابك للحصول على قاموس أكبر.';
        document.getElementById('wordType').textContent = '-';
        document.getElementById('originalLanguage').textContent = '-';
        
        this.hidePremiumContent();
    }

    playPronunciation() {
        const translatedWord = document.getElementById('translatedWord').textContent;
        
        if (translatedWord && translatedWord !== '-' && translatedWord !== 'غير موجود في القاموس') {
            // Use Web Speech API for pronunciation
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(translatedWord);
                
                // Detect if it's English or Arabic
                const arabicRegex = /[\u0600-\u06FF]/;
                if (arabicRegex.test(translatedWord)) {
                    utterance.lang = 'ar-SA';
                } else {
                    utterance.lang = 'en-US';
                }
                
                utterance.rate = 0.8;
                utterance.pitch = 1;
                
                // Visual effect for button
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
        this.wordInput.focus();
    }

    // Premium upgrade functionality
    upgradeToPremium() {
        this.isPremium = true;
        
        // Update UI
        const subscriptionStatus = document.getElementById('subscriptionStatus');
        subscriptionStatus.innerHTML = '<span class="premium-user">مستخدم Premium - استمتع بجميع المميزات!</span>';
        
        // Show success message
        alert('🎉 تم ترقية حسابك بنجاح! استمتع بجميع المميزات المتقدمة.');
        
        // Close modal
        closeUpgradeModal();
        
        // If there are current results, refresh them to show premium content
        if (this.resultsSection.classList.contains('show')) {
            const currentWord = document.getElementById('originalWord').textContent;
            const translation = this.dictionary[currentWord.toLowerCase()];
            if (translation) {
                this.showPremiumContent(translation);
            }
        }
    }
}

// Modal functions
function showUpgradeModal() {
    document.getElementById('upgradeModal').classList.add('show');
}

function closeUpgradeModal() {
    document.getElementById('upgradeModal').classList.remove('show');
}

function simulatePayment(plan) {
    const planNames = {
        'monthly': 'الشهري',
        'annual': 'السنوي'
    };
    
    const confirmation = confirm(`هل تريد المتابعة مع الاشتراك ${planNames[plan]}؟`);
    
    if (confirmation) {
        // Simulate payment processing
        alert('جاري معالجة الدفع...');
        
        setTimeout(() => {
            // Upgrade to premium
            window.translator.upgradeToPremium();
        }, 2000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.translator = new BilingualTranslator();
    
    // Add visual effects for buttons
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

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    document.getElementById('translateBtn').click();
                    break;
                case 'u':
                    e.preventDefault();
                    showUpgradeModal();
                    break;
            }
        }
        
        // Close modal with Escape
        if (e.key === 'Escape') {
            closeUpgradeModal();
        }
    });

    // Touch effects for mobile devices
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

    // Close modal when clicking outside
    document.getElementById('upgradeModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeUpgradeModal();
        }
    });

    console.log('🌟 مترجم ثنائي اللغة جاهز للاستخدام!');
    console.log('المميزات المتاحة:');
    console.log('- ترجمة ثنائية الاتجاه (عربي ⇄ إنجليزي)');
    console.log('- كشف تلقائي للغة');
    console.log('- مميزات مجانية ومدفوعة');
    console.log('- نطق صوتي للكلمات');
    console.log('- واجهة أنيقة ومتجاوبة');
});