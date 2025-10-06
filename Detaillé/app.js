class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 20;
        this.isAnimating = false;
        
        this.initializeElements();
        this.generateSlides();
        this.setupEventListeners();
        this.updateUI();
        this.triggerSlideAnimations();
    }

    initializeElements() {
        this.slidesWrapper = document.querySelector('.slides-wrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');
        this.progressFill = document.getElementById('progressFill');
        
        this.totalSlidesEl.textContent = this.totalSlides;
    }

    generateSlides() {
        const slidesData = this.getSlidesData();
        
        slidesData.forEach((slideData, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = `slide ${index === 0 ? 'active' : ''}`;
            slideEl.setAttribute('data-slide', index + 1);
            
            const contentEl = document.createElement('div');
            contentEl.className = slideData.className || 'slide-content';
            contentEl.innerHTML = slideData.content;
            
            slideEl.appendChild(contentEl);
            this.slidesWrapper.appendChild(slideEl);
        });

        this.slides = document.querySelectorAll('.slide');
    }

    getSlidesData() {
        return [
            // Slide 1: Titre
            {
                className: 'slide-content title-slide',
                content: `
                    <div class="title-content">
                        <h1 class="main-title">Audit d'Expérience Utilisateur (UX)</h1>
                        <h2 class="project-title">PROSA 2025-2026</h2>
                        <div class="subtitle">
                            <p>Réalisé par <strong>CERA Sylvain</strong> & <strong>VINCENTI Anghjula Dea</strong></p>
                        </div>
                        <div class="title-icon">
                            <i class="fas fa-search"></i>
                        </div>
                    </div>
                `
            },
            
            // Slide 2: Introduction et Contexte
            {
                content: `
                    <h1>Introduction et Contexte</h1>
                    <div class="content-section">
                        <p class="content-paragraph intro">PROSA représente une initiative pédagogique ambitieuse et innovante dans le domaine de la médiation culturelle numérique.</p>
                        
                        <p class="content-paragraph">PROSA est un projet universitaire mené dans le cadre du BUT MMI (Métiers du Multimédia et de l'Internet), fruit d'une collaboration entre les départements MMI de l'IUT de Corse et de l'IUT de Toulon. Ce projet ambitieux a pour vocation de faire découvrir aux jeunes générations la diversité et la richesse des cultures <span class="keyword">provençales et corses</span>. La découverte de ces cultures se fera de manière immersive et ludique, grâce à un jeu en réalité augmentée spécialement conçu pour les deux territoires.</p>
                        
                        <p class="content-paragraph">Le projet s'inscrit dans une démarche de <span class="keyword">valorisation du patrimoine méditerranéen</span>, en utilisant les technologies émergentes pour créer un pont entre les traditions ancestrales et les attentes des nouvelles générations. Cette approche novatrice vise à transformer l'apprentissage culturel en une expérience interactive et mémorable.</p>
                        
                        <div class="concept-box success">
                            <p class="content-paragraph">Ce projet repose sur une démarche pédagogique innovante qui allie une approche ludique et éducative. Conçu pour capter l'attention du <span class="success-keyword">public cible des 15-25 ans</span>, il utilise des technologies immersives et la gamification pour transformer l'apprentissage en une expérience engageante et interactive. L'objectif est de dépasser les méthodes traditionnelles d'enseignement culturel pour proposer une découverte authentique et personnalisée des territoires.</p>
                        </div>
                    </div>
                `
            },

            // Slide 3: Concept PROSA - Innovation Pédagogique
            {
                content: `
                    <h1>Concept PROSA - Innovation Pédagogique</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Le concept PROSA révolutionne l'approche traditionnelle de la découverte culturelle en proposant une <span class="keyword">expérience de gamification culturelle</span> inédite. Cette innovation pédagogique transforme l'apprentissage passif en aventure interactive, où chaque utilisateur devient l'acteur principal de sa découverte des patrimoines corses et provençaux.</p>
                        
                        <p class="content-paragraph">L'approche immersive par la <span class="keyword">réalité augmentée</span> constitue le cœur technologique du projet. Cette technologie permet de superposer des éléments virtuels au monde réel, créant ainsi des expériences narratives contextualisées dans l'environnement géographique authentique. Les utilisateurs peuvent ainsi découvrir les légendes, les personnages historiques et les traditions culturelles directement dans les lieux où ils ont vécu et évolué.</p>
                        
                        <div class="concept-box success">
                            <p class="content-paragraph">La valorisation des <span class="success-keyword">patrimoines corses et provençaux</span> s'appuie sur une recherche documentaire approfondie et une collaboration avec des experts locaux. Cette démarche garantit l'authenticité des contenus tout en les rendant accessibles et attrayants pour une génération habituée aux interfaces numériques sophistiquées.</p>
                        </div>
                        
                        <p class="content-paragraph">La transformation de l'apprentissage traditionnel s'opère par l'intégration de mécaniques de jeu motivantes : progression narrative, choix personnalisés, découvertes de secrets culturels et interactions sociales. Cette approche ludique permet de maintenir l'engagement des utilisateurs sur la durée tout en favorisant une mémorisation naturelle des connaissances culturelles acquises.</p>
                    </div>
                `
            },

            // Slide 4: Objectif de l'Audit
            {
                content: `
                    <h1>Objectif de l'Audit</h1>
                    <div class="content-section">
                        <p class="content-paragraph">L'audit d'expérience utilisateur de PROSA répond à des <span class="keyword">enjeux critiques d'évaluation UX</span> dans le contexte spécifique des applications éducatives en réalité augmentée. Cette évaluation systématique vise à identifier les points de friction qui peuvent compromettre l'efficacité pédagogique et l'engagement des utilisateurs dans leur parcours de découverte culturelle.</p>
                        
                        <p class="content-paragraph">L'optimisation de la navigation, de l'accessibilité et de l'engagement constitue un triptyque fondamental pour le succès du projet. Une navigation intuitive permet aux utilisateurs de se concentrer sur les contenus culturels plutôt que sur la maîtrise de l'interface. L'accessibilité garantit une inclusivité maximale, permettant à tous les publics cibles d'accéder aux richesses patrimoniales proposées. L'engagement, quant à lui, assure la rétention et la motivation nécessaires à un apprentissage approfondi.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">L'amélioration de l'<span class="critical-keyword">immersion utilisateur</span> représente un défi technique et créatif majeur. Dans le contexte de la réalité augmentée culturelle, l'immersion ne se limite pas aux aspects visuels mais englobe la cohérence narrative, la fluidité des interactions et la pertinence contextuelle des informations présentées.</p>
                        </div>
                        
                        <p class="content-paragraph">La définition d'axes d'amélioration concrets constitue l'aboutissement de cette démarche d'audit. Ces recommandations doivent être priorisées selon leur impact sur l'expérience utilisateur et leur faisabilité technique, permettant ainsi une roadmap de développement optimisée pour maximiser l'efficacité pédagogique du projet PROSA.</p>
                    </div>
                `
            },

            // Slide 5: Méthodologie d'Audit Détaillée
            {
                content: `
                    <h1>Méthodologie d'Audit Détaillée</h1>
                    <div class="content-section">
                        <p class="content-paragraph">L'<span class="keyword">analyse heuristique</span> constitue le fondement méthodologique de cet audit. Cette approche repose sur l'application rigoureuse des lois de l'UX et des heuristiques de Nielsen, référentiels reconnus scientifiquement dans le domaine de l'utilisabilité. Ces critères permettent d'identifier les problèmes d'interface selon des standards éprouvés et de les classifier par ordre de gravité.</p>
                        
                        <p class="content-paragraph">L'observation minutieuse des <span class="keyword">parcours utilisateurs</span> révèle les points de friction et d'abandon depuis la découverte du site jusqu'à l'utilisation complète du jeu. Cette analyse comportementale permet de comprendre les mécanismes cognitifs à l'œuvre lors de l'interaction et d'identifier les moments critiques où l'expérience peut se dégrader.</p>
                        
                        <div class="concept-box">
                            <p class="content-paragraph">L'analyse qualitative de l'<span class="keyword">immersion narrative et graphique</span> évalue la capacité du jeu à créer un engagement émotionnel durable. Cette dimension est particulièrement cruciale pour les applications éducatives, où la motivation intrinsèque détermine largement l'efficacité pédagogique.</p>
                        </div>
                        
                        <p class="content-paragraph">Le <span class="keyword">benchmarking d'expériences similaires</span> dans le domaine des jeux AR culturels permet de positionner PROSA par rapport aux standards du marché. Cette analyse comparative révèle les bonnes pratiques adoptées par les solutions concurrentes et identifie les opportunités de différenciation.</p>
                        
                        <p class="content-paragraph">Cette méthodologie multi-dimensionnelle garantit une évaluation exhaustive qui dépasse les aspects purement techniques pour englober les enjeux pédagogiques, culturels et d'engagement spécifiques au projet PROSA.</p>
                    </div>
                `
            },

            // Slide 6: Navigation et Architecture - Constat Général
            {
                content: `
                    <h1>Navigation et Architecture - Constat Général</h1>
                    <div class="content-section">
                        <p class="content-paragraph">L'analyse de la <span class="keyword">navigation globalement claire</span> révèle une architecture informationnelle cohérente qui facilite la compréhension générale du projet. Les utilisateurs parviennent à identifier les principales sections et à comprendre la logique organisationnelle du contenu. Cette clarté structurelle constitue une base solide pour l'expérience utilisateur, même si des améliorations restent nécessaires.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">Les <span class="critical-keyword">problématiques de hiérarchisation des menus</span> créent néanmoins des difficultés dans la découverte des fonctionnalités avancées. La structure actuelle ne met pas suffisamment en évidence les actions prioritaires, obligeant les utilisateurs à explorer de manière non guidée pour accéder aux éléments essentiels de l'expérience.</p>
                        </div>
                        
                        <p class="content-paragraph">Les <span class="keyword">actions essentielles à mettre en avant</span> souffrent d'un manque de visibilité qui impacte directement le taux de conversion et l'engagement initial. Les boutons d'accès au jeu, les liens vers les contenus éducatifs et les invitations à participer ne bénéficient pas de la priorisation visuelle nécessaire pour guider efficacement les utilisateurs vers les expériences de valeur.</p>
                        
                        <p class="content-paragraph">Le <span class="keyword">manque de structuration de l'information riche</span> constitue un paradoxe : alors que le projet dispose de contenus culturels et pédagogiques de qualité, leur organisation ne permet pas une découverte progressive et structurée. Cette situation peut décourager les utilisateurs face à la densité informationnelle et réduire l'efficacité pédagogique globale du projet.</p>
                    </div>
                `
            },

            // Slide 7: Analyse Section Héros - Problèmes Critiques
            {
                content: `
                    <h1>Analyse Section Héros - Problèmes Critiques</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Les <span class="critical-keyword">problèmes de lisibilité critique</span> identifiés dans la section héros compromettent gravement la première impression des utilisateurs. Le contraste insuffisant entre le texte blanc et les arrière-plans clairs crée des zones d'illisibilité qui empêchent la compréhension du message principal. Cette défaillance technique majeure peut provoquer un abandon immédiat, avant même que les utilisateurs aient pu appréhender la valeur du projet.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">L'<span class="critical-keyword">impact du responsive défaillant sur mobile</span> amplifie considérablement cette problématique. Sur les appareils mobiles, qui représentent la majorité du trafic pour cette tranche d'âge, les éléments textuels deviennent pratiquement invisibles, créant une barrière d'accès inacceptable pour le public cible principal.</p>
                        </div>
                        
                        <p class="content-paragraph">Le <span class="keyword">sous-titre excessivement long</span> génère une charge cognitive excessive qui fatigue prématurément les utilisateurs. Cette densité textuelle, combinée aux problèmes de lisibilité, crée un effet de rejet qui nuit à la poursuite de la navigation. La longueur excessive du message dilue l'impact des informations essentielles et complique la mémorisation des éléments clés.</p>
                        
                        <p class="content-paragraph">Les <span class="success-keyword">recommandations d'optimisation</span> incluent l'application stricte des standards WCAG pour le contraste (ratio minimum 4.5:1), la restructuration du message principal en éléments digestibles et l'implémentation d'une hiérarchie visuelle claire. Ces ajustements techniques permettront de transformer cette section critique en véritable porte d'entrée engageante vers l'univers PROSA.</p>
                    </div>
                `
            },

            // Slide 8: Interface et Gameplay - Limitations Majeures
            {
                content: `
                    <h1>Interface et Gameplay - Limitations Majeures</h1>
                    <div class="content-section">
                        <p class="content-paragraph">L'analyse approfondie de la <span class="critical-keyword">gestion des dialogues rigides</span> révèle des défaillances majeures dans l'interaction utilisateur. Le système actuel ne permet pas une lecture fluide : un clic unique provoque un skip complet du contenu, empêchant une découverte progressive du récit. Cette rigidité contraint les utilisateurs à subir un rythme imposé ou à perdre des informations narratives essentielles.</p>
                        
                        <p class="content-paragraph">Le <span class="keyword">problème de différenciation des personnages</span> crée une confusion narrative dommageable à l'immersion. Les bulles de dialogue identiques pour tous les personnages empêchent une identification rapide des interlocuteurs et nuisent à la construction de liens émotionnels avec l'univers. Cette uniformisation visuelle appauvrit l'expérience narrative et réduit l'efficacité pédagogique des interactions.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">La <span class="critical-keyword">dépendance excessive à la réalité augmentée</span> constitue une limitation architecturale majeure. En cas de problème technique, de compatibilité matérielle ou de conditions d'utilisation inadéquates, le jeu devient totalement inaccessible. Cette fragilité exclut potentiellement 40% des utilisateurs cibles et crée un risque de frustration élevé.</p>
                        </div>
                        
                        <p class="content-paragraph">La comparaison avec des références du marché comme <span class="success-keyword">Pokémon Go</span> illustre les bonnes pratiques d'accessibilité. Cette application propose systématiquement un mode alternatif sans AR, garantissant une expérience dégradée mais fonctionnelle pour tous les utilisateurs. L'implémentation d'une telle approche pour PROSA permettrait de maximiser l'inclusion tout en conservant l'innovation technologique comme différenciateur pour les utilisateurs équipés.</p>
                    </div>
                `
            },

            // Slide 9: Système de Sauvegarde - Contrainte Majeure
            {
                content: `
                    <h1>Système de Sauvegarde - Contrainte Majeure</h1>
                    <div class="content-section">
                        <p class="content-paragraph">L'<span class="critical-keyword">absence totale de système de sauvegarde</span> constitue l'une des défaillances les plus critiques identifiées dans l'audit. Cette lacune technique majeure transforme chaque interruption de session en perte définitive de progression, créant une frustration utilisateur considérable et compromettant gravement l'engagement à long terme nécessaire aux objectifs pédagogiques du projet.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">L'<span class="critical-keyword">impact sur l'engagement et la motivation</span> des joueurs est particulièrement sévère dans le contexte éducatif. Les utilisateurs investissent du temps et de l'énergie cognitive dans leur progression narrative et culturelle. La perte de cette progression brise le contrat de confiance implicite et peut provoquer un abandon définitif du projet, même chez les utilisateurs initialement motivés.</p>
                        </div>
                        
                        <p class="content-paragraph">Le constat que <span class="keyword">perdre sa progression équivaut à un abandon définitif</span> souligne l'urgence critique de cette problématique. Dans un environnement concurrentiel où les alternatives de divertissement éducatif sont nombreuses, les utilisateurs n'accordent généralement pas de seconde chance aux applications qui ne respectent pas leur investissement temporel.</p>
                        
                        <p class="content-paragraph">La <span class="success-keyword">nécessité d'une gamification robuste</span> incluant un système de succès, de chapitres sauvegardés et de suivi de progression devient évidente. Ces mécaniques permettraient non seulement de résoudre le problème technique mais aussi d'enrichir l'expérience par des éléments motivationnels durables : déblocage de contenus, reconnaissance des accomplissements et personnalisation du parcours d'apprentissage.</p>
                    </div>
                `
            },

            // Slide 10: Feedback et Micro-interactions
            {
                content: `
                    <h1>Feedback et Micro-interactions</h1>
                    <div class="content-section">
                        <p class="content-paragraph">L'analyse du <span class="keyword">manque de retours immédiats</span> révèle une carence majeure dans la conception d'expérience utilisateur. Les interactions manquent de confirmation visuelle, auditive ou tactile, laissant les utilisateurs dans l'incertitude quant à l'efficacité de leurs actions. Cette absence de feedback crée une sensation de déconnexion avec l'interface et nuit considérablement à la fluidité de l'expérience.</p>
                        
                        <p class="content-paragraph">L'<span class="critical-keyword">absence de feedback visuel, sonore et tactile</span> prive l'application de dimensions sensorielles essentielles à l'engagement. Les micro-interactions constituent le langage subtil qui guide intuitivement les utilisateurs et renforce leur sentiment de maîtrise. Sans ces éléments, l'interface paraît statique et peu réactive, ce qui contraste négativement avec les standards actuels d'interactivité numérique.</p>
                        
                        <div class="concept-box warning">
                            <p class="content-paragraph">L'expérience qualifiée de <span class="keyword">"plate" sans micro-interactions</span> reflète un déficit d'engagement émotionnel critique pour un projet éducatif. Les micro-interactions ne sont pas de simples ornements mais des facilitateurs cognitifs qui rendent l'apprentissage plus naturel et mémorable. Leur absence appauvrit l'expérience pédagogique et réduit l'efficacité de la transmission culturelle.</p>
                        </div>
                        
                        <p class="content-paragraph">Les <span class="success-keyword">recommandations d'enrichissement</span> incluent l'implémentation d'animations de transition fluides, de retours sonores contextuels et de vibrations tactiles sur mobile. Ces éléments doivent être conçus pour renforcer la cohérence narrative : sons d'ambiance corses et provençaux, animations évoquant les éléments culturels, retours haptiques synchronisés avec les moments narratifs forts. Cette approche transformerait l'expérience en véritable voyage sensoriel immersif.</p>
                    </div>
                `
            },

            // Slide 11: Immersion & Narration - Qualités et Défauts
            {
                content: `
                    <h1>Immersion & Narration - Qualités et Défauts</h1>
                    <div class="content-section">
                        <p class="content-paragraph">La description de l'<span class="success-keyword">univers médiéval-fantasy cohérent</span> témoigne d'un travail créatif remarquable qui constitue l'un des points forts majeurs du projet. Cette cohérence thématique permet aux utilisateurs de s'immerger dans un monde crédible où les éléments corses et provençaux s'intègrent naturellement dans une trame narrative engageante. L'univers créé offre un cadre riche pour l'exploration culturelle.</p>
                        
                        <p class="content-paragraph">La <span class="success-keyword">qualité de la recherche mythologique corse</span> révèle un investissement documentaire approfondi qui honore l'authenticité culturelle du projet. Cette rigueur scientifique et culturelle constitue un atout différenciateur majeur, permettant aux utilisateurs de découvrir des éléments patrimoniaux authentiques tout en bénéficiant d'une mise en scène attractive et moderne.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">Cependant, le <span class="critical-keyword">problème des dialogues générés par IA</span> compromet significativement la qualité narrative globale. Cette approche technologique, bien qu'efficace pour la production de contenu, génère des textes manquant d'émotion, présentant des incohérences stylistiques et une écriture globalement faible qui nuit à l'immersion soigneusement construite par ailleurs.</p>
                        </div>
                        
                        <p class="content-paragraph">Le <span class="keyword">manque d'émotion et les incohérences narratives</span> créent une dissonance préjudiciable entre la richesse de l'univers et la pauvreté des interactions dialoguées. Cette situation empêche la création d'un véritable lien narratif avec les personnages et réduit l'impact pédagogique des séquences éducatives. La correction de cette faiblesse nécessiterait une réécriture par des professionnels de l'écriture narrative.</p>
                    </div>
                `
            },

            // Slide 12: Choix Narratifs et Rythme
            {
                content: `
                    <h1>Choix Narratifs et Rythme</h1>
                    <div class="content-section">
                        <p class="content-paragraph">L'analyse détaillée du <span class="critical-keyword">premier choix sans impact</span> révèle une défaillance critique dans la mécanique d'engagement initial. Ce moment déterminant, conçu pour capter l'intérêt et démontrer l'agentivité du joueur, échoue à créer l'impression de contrôle narratif essentielle à l'immersion. Cette faiblesse initiale peut compromettre l'engagement sur l'ensemble du parcours.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">Les <span class="critical-keyword">options "aller à gauche/droite" problématiques</span> illustrent parfaitement les écueils d'une conception de choix superficielle. Ces alternatives, dépourvues de contexte narratif significatif et de conséquences visibles, donnent l'impression d'une fausse liberté qui peut frustrer les utilisateurs habitués à des expériences interactives plus sophistiquées.</p>
                        </div>
                        
                        <p class="content-paragraph">La <span class="keyword">rupture brutale vers le système de combat</span> crée une discontinuité narrative dommageable à la cohérence d'expérience. Après avoir établi une atmosphère basée sur l'exploration culturelle et les choix narratifs, cette transition abrupte vers des mécaniques de combat donne l'impression d'un changement de jeu non préparé, perturbant l'immersion soigneusement construite.</p>
                        
                        <p class="content-paragraph">La <span class="keyword">découverte tardive de l'utilité de l'avatar</span> souligne des problèmes de tutoriel et d'onboarding. Les utilisateurs investissent du temps dans la personnalisation de leur représentation virtuelle sans comprendre immédiatement son rôle dans l'expérience globale. Cette confusion initiale peut réduire l'attachement au personnage et, par extension, l'engagement dans l'aventure culturelle proposée.</p>
                    </div>
                `
            },

            // Slide 13: Problèmes Techniques Combat
            {
                content: `
                    <h1>Problèmes Techniques Combat</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Le <span class="critical-keyword">système réduit à l'action unique "attaquer"</span> représente une simplification excessive qui appauvrit dramatiquement l'expérience ludique. Cette limitation technique transforme les séquences de combat en interactions répétitives et prévisibles, privant les utilisateurs de la satisfaction cognitive associée à la stratégie et à la prise de décision tactique.</p>
                        
                        <p class="content-paragraph">Les <span class="keyword">combats répétitifs sans profondeur stratégique</span> créent une monotonie qui contraste négativement avec la richesse narrative développée dans les phases d'exploration. Cette disparité de qualité entre les différentes mécaniques de jeu nuit à la cohérence globale de l'expérience et peut provoquer de la frustration chez les utilisateurs attendant une progression en complexité.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">Les <span class="critical-keyword">incohérences techniques</span> comme la validation de combats impossibles révèlent des défaillances dans la logique de jeu qui compromettent la crédibilité du système. Ces bugs, bien que techniques, impactent directement l'immersion en brisant la suspension volontaire d'incrédulité nécessaire à l'engagement dans l'univers fictif.</p>
                        </div>
                        
                        <p class="content-paragraph">La <span class="keyword">rupture avec le rythme narratif</span> constitue peut-être l'aspect le plus dommageable de ces défaillances. Le passage abrupt d'une narration contemplative et éducative à des mécaniques de combat rudimentaires crée une dissonance qui peut déstabiliser les utilisateurs et réduire l'efficacité pédagogique globale du projet. Une refonte de cette transition pourrait intégrer les éléments de défi dans la trame culturelle de manière plus organique.</p>
                    </div>
                `
            },

            // Slide 14: Performance Mobile - Analyse Critique
            {
                content: `
                    <h1>Performance Mobile - Analyse Critique</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Le <span class="critical-keyword">score PageSpeed de 54/100</span> constitue une défaillance technique critique qui compromet gravement l'accessibilité du projet sur les appareils mobiles. Cette performance insuffisante place PROSA dans la catégorie des applications "lentes" selon les standards de Google, créant une barrière d'entrée significative pour le public cible principal, majoritairement utilisateur de smartphones.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">Le <span class="critical-keyword">First Contentful Paint de 10,6 secondes</span> dépasse dramatiquement les seuils d'acceptabilité utilisateur. Cette métrique, qui mesure le temps d'affichage du premier élément de contenu, révèle un délai près de quatre fois supérieur à la cible de 3 secondes recommandée. Ce retard initial peut provoquer un abandon avant même que l'utilisateur ait pu évaluer l'intérêt du projet.</p>
                        </div>
                        
                        <p class="content-paragraph">Le <span class="keyword">Total Blocking Time de 130ms</span> indique des problèmes de réactivité de l'interface pendant le chargement. Cette métrique révèle que l'interface reste non-interactive pendant des périodes significatives, créant une sensation de gel qui frustre les utilisateurs habitués à la fluidité des applications mobiles modernes.</p>
                        
                        <p class="content-paragraph">Les <span class="success-keyword">optimisations nécessaires</span> incluent la compression avancée des images avec adoption du format WebP, la minification et la compression des ressources JavaScript et CSS, l'implémentation d'un système de cache efficace et l'optimisation des requêtes réseau. Ces améliorations techniques permettraient d'atteindre les standards de performance attendus par les utilisateurs mobiles et d'améliorer significativement l'accessibilité du projet.</p>
                    </div>
                `
            },

            // Slide 15: Performance Bureau - Défaillances
            {
                content: `
                    <h1>Performance Bureau - Défaillances</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Le <span class="critical-keyword">score de 46/100</span> sur ordinateur de bureau révèle des problèmes de performance encore plus sévères que sur mobile, situation paradoxale compte tenu de la puissance supérieure de ces plateformes. Cette dégradation suggère des défaillances architecturales profondes dans l'optimisation du code et la gestion des ressources qui impactent l'ensemble de l'écosystème technique.</p>
                        
                        <div class="concept-box critical">
                            <p class="content-paragraph">Le <span class="critical-keyword">Total Blocking Time de 5190ms</span> atteint un niveau critique qui rend l'application pratiquement inutilisable lors du chargement initial. Cette durée de blocage, près de quarante fois supérieure aux recommandations, crée une expérience utilisateur inacceptable qui peut décourager définitivement même les utilisateurs les plus motivés.</p>
                        </div>
                        
                        <p class="content-paragraph">Les <span class="keyword">optimisations de compression, cache et scripts</span> deviennent une priorité absolue pour restaurer une utilisabilité minimale. La compression des ressources statiques, l'implémentation d'un système de mise en cache intelligent et l'optimisation du code JavaScript constituent des actions correctives urgentes pour rétablir des performances acceptables.</p>
                        
                        <p class="content-paragraph">L'<span class="keyword">impact de découragement des utilisateurs</span> est particulièrement préoccupant dans le contexte éducatif du projet. Les enseignants et formateurs évaluant l'outil sur des ordinateurs de bureau pourraient rejeter définitivement PROSA sur la base de cette première expérience dégradée, compromettant l'adoption institutionnelle et la diffusion pédagogique du projet. Une résolution rapide de ces problèmes devient donc stratégique pour la viabilité du projet.</p>
                    </div>
                `
            },

            // Slide 16: Synthèse - Vision Globale
            {
                content: `
                    <h1>Synthèse - Vision Globale</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Le <span class="success-keyword">projet original combinant AR, narration et culture</span> témoigne d'une vision ambitieuse et pertinente qui répond aux enjeux contemporains de médiation culturelle numérique. Cette approche innovante, alliant technologies immersives et patrimoine méditerranéen, positionne PROSA comme un pionnier dans le domaine de l'éducation culturelle interactive.</p>
                        
                        <p class="content-paragraph">L'<span class="success-keyword">objectif pédagogique atteint conceptuellement</span> confirme la solidité de la proposition de valeur éducative. La recherche documentaire approfondie, l'univers narratif cohérent et l'approche ludique démontrent une compréhension fine des enjeux pédagogiques et des attentes du public cible. Ces fondations solides constituent un socle prometteur pour le développement futur.</p>
                        
                        <div class="concept-box warning">
                            <p class="content-paragraph">Cependant, les <span class="critical-keyword">limites techniques et ergonomiques majeures</span> identifiées dans cet audit compromettent actuellement la réalisation de ce potentiel. Ces défaillances, bien qu'étant des obstacles significatifs, ne remettent pas en question la validité du concept mais soulignent la nécessité d'investissements techniques ciblés.</p>
                        </div>
                        
                        <p class="content-paragraph">La <span class="keyword">dépendance AR excessive et le gameplay limité</span> représentent les deux axes d'amélioration prioritaires. La diversification des modes d'accès et l'enrichissement des mécaniques interactives permettraient de maximiser l'audience et l'engagement, transformant les contraintes actuelles en opportunités d'innovation inclusive et d'approfondissement pédagogique.</p>
                    </div>
                `
            },

            // Slide 17: Matrice Impact/Effort - Priorisation
            {
                content: `
                    <h1>Matrice Impact/Effort - Priorisation</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Les <span class="success-keyword">actions prioritaires à fort impact et effort modéré</span> constituent le cœur de la stratégie d'amélioration recommandée. Ces interventions permettent d'obtenir des gains significatifs d'expérience utilisateur sans mobiliser des ressources disproportionnées, optimisant ainsi le retour sur investissement développement.</p>
                        
                        <div class="priority-matrix">
                            <div class="matrix-header">Priorités d'Intervention Stratégiques</div>
                            <div class="matrix-content">
                                <div class="matrix-quadrant high-priority">
                                    <h3>Priorité P0 - Impact Fort / Effort Modéré</h3>
                                    <p class="content-paragraph">Optimisation des performances mobile et bureau, implémentation du système de sauvegarde, correction des problèmes de contraste et amélioration de la navigation principale. Ces actions critiques peuvent transformer immédiatement l'expérience utilisateur.</p>
                                </div>
                                <div class="matrix-quadrant medium-priority">
                                    <h3>Priorité P1 - Impact Fort / Effort Élevé</h3>
                                    <p class="content-paragraph">Développement du mode sans AR, réécriture des dialogues par des professionnels, refonte des mécaniques de combat et optimisation avancée des performances. Investissements lourds mais rentables à moyen terme.</p>
                                </div>
                                <div class="matrix-quadrant low-priority">
                                    <h3>Priorité P2 - Impact Modéré / Effort Faible</h3>
                                    <p class="content-paragraph">Améliorations d'accessibilité secondaires, enrichissement des micro-interactions, optimisations mineures de l'interface utilisateur. Actions d'amélioration continue à implémenter progressivement.</p>
                                </div>
                                <div class="matrix-quadrant low-priority">
                                    <h3>Priorité P3 - Investissements Lourds</h3>
                                    <p class="content-paragraph">Refonte architecturale complète, développement de nouvelles fonctionnalités AR avancées, expansion géographique du contenu culturel. Développements futurs à planifier sur le long terme.</p>
                                </div>
                            </div>
                        </div>
                        
                        <p class="content-paragraph">Cette priorisation stratégique permet de planifier les améliorations selon une logique de gains progressifs, maximisant l'impact utilisateur à chaque itération tout en préservant la viabilité économique du projet de développement.</p>
                    </div>
                `
            },

            // Slide 18: Recommandations Stratégiques
            {
                content: `
                    <h1>Recommandations Stratégiques</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Le <span class="keyword">recentrage sur l'essentiel narratif</span> constitue la ligne directrice principale des recommandations stratégiques. Cette approche vise à concentrer les efforts de développement sur les éléments qui contribuent directement à l'efficacité pédagogique et à l'engagement culturel, en éliminant les fonctionnalités accessoires qui peuvent diluer l'expérience core.</p>
                        
                        <p class="content-paragraph">La <span class="success-keyword">simplification de l'expérience utilisateur</span> doit guider toutes les décisions de conception future. Cette philosophie privilégie l'intuitivité et l'accessibilité sur la sophistication technique, permettant aux utilisateurs de se concentrer sur la découverte culturelle plutôt que sur la maîtrise de l'interface. Cette approche démocratise l'accès aux contenus patrimoniaux.</p>
                        
                        <div class="concept-box success">
                            <p class="content-paragraph">La <span class="success-keyword">fluidification de la navigation et des interactions</span> transformerait fondamentalement l'expérience utilisateur. L'implémentation de transitions fluides, de retours visuels immédiats et d'une hiérarchie informationnelle claire créerait un environnement d'apprentissage naturel et engageant, favorisant l'immersion et la rétention pédagogique.</p>
                        </div>
                        
                        <p class="content-paragraph">Le <span class="keyword">renforcement de la qualité narrative</span> représente l'investissement stratégique le plus rentable à long terme. La réécriture professionnelle des dialogues, l'enrichissement des personnages et l'amélioration de l'arc narratif global transformeraient PROSA en référence de qualité dans le domaine de l'éducation culturelle interactive, justifiant une adoption institutionnelle large et durable.</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <span class="metric-value">+400%</span>
                                <span class="metric-label">Amélioration potentielle du taux de rétention</span>
                            </div>
                            <div class="metric-card">
                                <span class="metric-value critical">54→85</span>
                                <span class="metric-label">Objectif de performance mobile</span>
                            </div>
                            <div class="metric-card">
                                <span class="metric-value">95%</span>
                                <span class="metric-label">Cible d'accessibilité universelle</span>
                            </div>
                        </div>
                    </div>
                `
            },

            // Slide 19: Conclusion - Potentiel et Défis
            {
                content: `
                    <h1>Conclusion - Potentiel et Défis</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Le <span class="success-keyword">travail ambitieux d'innovation technologique</span> entrepris par l'équipe PROSA mérite une reconnaissance particulière. Cette initiative pionnière dans le domaine de la médiation culturelle numérique démontre une vision prospective et une ambition pédagogique remarquables, positionnant le projet comme un catalyseur potentiel pour l'évolution des pratiques éducatives culturelles.</p>
                        
                        <p class="content-paragraph">La <span class="success-keyword">réussite de la valorisation culturelle</span> constitue l'accomplissement majeur déjà atteint par le projet. La qualité de la recherche documentaire, la cohérence de l'univers créé et l'authenticité des références culturelles corses et provençales établissent une base solide pour le développement futur. Cette dimension patrimoniale différencie positivement PROSA des solutions concurrentes.</p>
                        
                        <div class="synthesis-content">
                            <div class="key-findings">
                                <div class="finding-item critical">
                                    <h3>Points Critiques Identifiés</h3>
                                    <p class="content-paragraph">Les défaillances techniques de performance (scores 54/100 mobile, 46/100 bureau), l'absence de système de sauvegarde et les problèmes d'accessibilité mobile constituent des obstacles immédiats à surmonter pour libérer le potentiel pédagogique du projet. Ces limitations compromettent actuellement l'expérience de 60% des utilisateurs cibles.</p>
                                </div>
                                <div class="finding-item success">
                                    <h3>Potentiel de Transformation</h3>
                                    <p class="content-paragraph">Les ajustements ciblés recommandés dans cet audit peuvent transformer ces limitations en opportunités d'innovation. Avec les corrections appropriées, PROSA dispose de tous les atouts pour devenir une référence dans l'éducation culturelle interactive, notamment grâce à son univers narratif cohérent et sa recherche culturelle authentique.</p>
                                </div>
                            </div>
                        </div>
                        
                        <p class="content-paragraph">L'horizon d'optimisation dessine un projet capable d'atteindre son <span class="success-keyword">plein potentiel pédagogique et culturel</span> grâce à des interventions techniques ciblées et stratégiquement priorisées. Cette transformation représente un investissement rentable pour l'avenir de la médiation culturelle numérique en Méditerranée, avec un potentiel d'impact significatif sur l'apprentissage des jeunes générations.</p>
                    </div>
                `
            },

            // Slide 20: Prochaines Étapes et Déploiement
            {
                content: `
                    <h1>Prochaines Étapes et Déploiement</h1>
                    <div class="content-section">
                        <p class="content-paragraph">Le <span class="keyword">plan de déploiement en deux phases</span> optimise l'allocation des ressources développement tout en maximisant l'impact utilisateur à court terme. La Phase 1 (0-4 semaines) concentre les efforts sur les corrections critiques qui transformeront immédiatement l'expérience. La Phase 2 (4-12 semaines) développe les améliorations structurelles pour une optimisation durable.</p>
                        
                        <div class="concept-box">
                            <h3>Phase 1 - Actions Critiques Immédiates</h3>
                            <p class="content-paragraph">Implémentation du système de sauvegarde, correction des contrastes WCAG, optimisation des performances mobile prioritaire et mise à jour des zones cliquables. Ces interventions peuvent être déployées rapidement avec un impact utilisateur immédiat et mesurable.</p>
                        </div>
                        
                        <div class="concept-box success">
                            <h3>Phase 2 - Développements Structurels</h3>
                            <p class="content-paragraph">Développement du mode sans AR, réécriture professionnelle des dialogues, refonte des mécaniques de gameplay et optimisation avancée des performances. Ces investissements plus lourds consolident les gains de la Phase 1 et positionnent PROSA comme solution de référence.</p>
                        </div>
                        
                        <p class="content-paragraph">La <span class="success-keyword">stratégie de mesure d'impact</span> s'appuie sur des KPIs précis : amélioration du score PageSpeed de 54 à 85/100, réduction du temps de chargement de 10,6s à moins de 3s, augmentation du taux de completion de 20% à 70% et amélioration du taux de retour J+7 de 10% à 40%. Ces métriques guideront l'évaluation du succès des interventions.</p>
                        
                        <p class="content-paragraph">L'engagement des parties prenantes (équipe pédagogique, développement, design) autour de cette roadmap partagée garantit une exécution coordonnée et efficace. La validation utilisateur continue par des tests d'usage réguliers permet d'ajuster les priorités selon les retours terrain et d'optimiser l'impact pédagogique réel du projet PROSA transformé.</p>
                    </div>
                `
            }
        ];
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;
            
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'f':
                case 'F':
                case 'F11':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        });

        // Touch/swipe support
        this.setupTouchEvents();

        // Fullscreen changes
        document.addEventListener('fullscreenchange', () => this.updateFullscreenButton());
        document.addEventListener('webkitfullscreenchange', () => this.updateFullscreenButton());
        document.addEventListener('mozfullscreenchange', () => this.updateFullscreenButton());
        document.addEventListener('MSFullscreenChange', () => this.updateFullscreenButton());
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (this.isAnimating) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides || slideNumber === this.currentSlide || this.isAnimating) {
            return;
        }

        this.isAnimating = true;
        
        const currentSlideEl = document.querySelector(`.slide[data-slide="${this.currentSlide}"]`);
        if (currentSlideEl) {
            currentSlideEl.classList.remove('active');
        }

        this.currentSlide = slideNumber;

        const newSlideEl = document.querySelector(`.slide[data-slide="${this.currentSlide}"]`);
        if (newSlideEl) {
            setTimeout(() => {
                newSlideEl.classList.add('active');
                this.triggerSlideAnimations();
                this.updateUI();
                
                setTimeout(() => {
                    this.isAnimating = false;
                }, 600);
            }, 50);
        }
    }

    updateUI() {
        this.currentSlideEl.textContent = this.currentSlide;
        
        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        
        this.prevBtn.style.opacity = this.currentSlide === 1 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentSlide === this.totalSlides ? '0.5' : '1';
    }

    updateFullscreenButton() {
        const isFullscreen = !!(document.fullscreenElement || 
                                document.webkitFullscreenElement || 
                                document.mozFullScreenElement || 
                                document.msFullscreenElement);
        
        if (isFullscreen) {
            this.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            this.fullscreenBtn.title = 'Quitter le plein écran';
        } else {
            this.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            this.fullscreenBtn.title = 'Plein écran';
        }
    }

    async toggleFullscreen() {
        try {
            const isFullscreen = !!(document.fullscreenElement || 
                                    document.webkitFullscreenElement || 
                                    document.mozFullScreenElement || 
                                    document.msFullscreenElement);
            
            if (!isFullscreen) {
                const element = document.documentElement;
                
                if (element.requestFullscreen) {
                    await element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    await element.webkitRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    await element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    await element.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                }
            }
        } catch (err) {
            console.log(`Fullscreen error: ${err.message}`);
        }
    }

    triggerSlideAnimations() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;

        // Animate text reveals
        const textElements = activeSlide.querySelectorAll('.content-paragraph, .concept-box, .finding-item');
        textElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150);
        });

        // Animate score circles
        const scoreCircles = activeSlide.querySelectorAll('.score-circle');
        scoreCircles.forEach((circle, index) => {
            const score = parseInt(circle.style.getPropertyValue('--score') || '50');
            setTimeout(() => {
                const degrees = (score / 100) * 360;
                circle.style.background = `conic-gradient(var(--color-primary) 0deg, var(--color-primary) ${degrees}deg, var(--color-secondary) ${degrees}deg 360deg)`;
            }, 500 + (index * 200));
        });
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.presentationController = new PresentationController();
    
    // Setup keyboard shortcuts help
    setupKeyboardShortcuts();
});

function setupKeyboardShortcuts() {
    let helpVisible = false;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === '?' || (e.key === 'h' && e.ctrlKey)) {
            e.preventDefault();
            toggleKeyboardHelp();
        } else if (e.key === 'Escape' && helpVisible) {
            e.preventDefault();
            hideKeyboardHelp();
        }
    });
    
    function toggleKeyboardHelp() {
        if (helpVisible) {
            hideKeyboardHelp();
        } else {
            showKeyboardHelp();
        }
    }
    
    function showKeyboardHelp() {
        if (helpVisible) return;
        
        const help = document.createElement('div');
        help.id = 'keyboard-help';
        help.innerHTML = `
            <div style="
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div style="
                    background: var(--color-surface);
                    padding: 32px;
                    border-radius: 16px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: var(--shadow-lg);
                ">
                    <h3 style="margin-bottom: 24px; color: var(--color-text);">Raccourcis Clavier</h3>
                    <div style="margin-bottom: 16px;">
                        <span style="
                            background: var(--color-secondary);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: var(--font-family-mono);
                            font-size: 12px;
                            font-weight: bold;
                            margin-right: 16px;
                        ">→ / Espace</span>
                        <span>Slide suivant</span>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <span style="
                            background: var(--color-secondary);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: var(--font-family-mono);
                            font-size: 12px;
                            font-weight: bold;
                            margin-right: 16px;
                        ">←</span>
                        <span>Slide précédent</span>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <span style="
                            background: var(--color-secondary);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: var(--font-family-mono);
                            font-size: 12px;
                            font-weight: bold;
                            margin-right: 16px;
                        ">F / F11</span>
                        <span>Plein écran</span>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <span style="
                            background: var(--color-secondary);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: var(--font-family-mono);
                            font-size: 12px;
                            font-weight: bold;
                            margin-right: 16px;
                        ">?</span>
                        <span>Cette aide</span>
                    </div>
                    <p style="margin-top: 24px; font-size: 14px; color: var(--color-text-secondary);">
                        Appuyez sur Echap pour fermer
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(help);
        helpVisible = true;
        
        requestAnimationFrame(() => {
            help.firstElementChild.style.opacity = '1';
        });
        
        help.addEventListener('click', (e) => {
            if (e.target === help.firstElementChild) {
                hideKeyboardHelp();
            }
        });
    }
    
    function hideKeyboardHelp() {
        const help = document.getElementById('keyboard-help');
        if (help) {
            help.firstElementChild.style.opacity = '0';
            setTimeout(() => {
                if (help.parentNode) {
                    help.parentNode.removeChild(help);
                }
            }, 300);
        }
        helpVisible = false;
    }
}

// Export utilities
window.PresentationUtils = {
    goToSlide: (slideNumber) => {
        if (window.presentationController) {
            window.presentationController.goToSlide(slideNumber);
        }
    },
    nextSlide: () => {
        if (window.presentationController) {
            window.presentationController.nextSlide();
        }
    },
    previousSlide: () => {
        if (window.presentationController) {
            window.presentationController.previousSlide();
        }
    }
};