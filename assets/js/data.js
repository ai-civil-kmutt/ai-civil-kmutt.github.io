/* ─────────────────────────────────────────────────────────────
   AI Research Group — site content
   Edit this file to update the site. No build step required.
   ───────────────────────────────────────────────────────────── */

const THEMES = [
  {
    id: 'sequence',
    short: 'Transformers',
    n: '01',
    title: 'Transformers for geotechnical prediction',
    body: 'Soil profiles are sequences. We encode borehole logs, seismic records and CPT traces as token streams and let attention models read them the way an engineer reads a log. The approach now covers bored pile load-deformation, liquefaction potential, rapid impact compaction and soil electrical resistivity.',
    tags: ['Transformers', 'Sequence encoding', 'Site characterisation']
  },
  {
    id: 'vision',
    short: 'Computer vision',
    n: '02',
    title: 'Computer vision for infrastructure inspection',
    body: 'Detectors that survive contact with a real road survey. YOLO9tr and YOLO26-RD find pavement distress without non-maximum suppression. DINOv3-YOLOv12 pairs self-supervised features with a fast detector, so a few hundred labelled images are enough. Related work covers tunnel deformation, concrete cracks and railway obstruction.',
    tags: ['Object detection', 'Self-supervised features', 'Pavement distress']
  },
  {
    id: 'agentic',
    short: 'Agentic AI',
    n: '03',
    title: 'Agentic AI and LLM systems for design',
    body: 'Design is a workflow, not a single prediction. We build multi-agent systems where language models plan, call analysis tools, check codes of practice and produce a checked foundation design. The plaxisMCP server puts a finite-element package directly in reach of an agent.',
    tags: ['Multi-agent systems', 'LLM tool use', 'Automated design']
  },
  {
    id: 'pinn',
    short: 'Physics-informed ML',
    n: '04',
    title: 'Physics-informed and scientific machine learning',
    body: 'Where data is scarce, the governing equations are the data. We use Fourier-feature physics-informed neural networks for elasto-plastic analysis, and we assess honestly where PINNs and operator learning actually beat classical solvers in geotechnical practice.',
    tags: ['PINNs', 'Operator learning', 'Constitutive modelling']
  },
  {
    id: 'xai',
    short: 'Explainable AI',
    n: '05',
    title: 'Explainable AI for engineering decisions',
    body: 'A number an engineer cannot interrogate is a number they cannot sign off. We pair our predictive models with attribution analysis. That means SHAP, attention maps and dual-attention tabular architectures, so the physical drivers behind a prediction stay visible.',
    tags: ['SHAP', 'Attention analysis', 'Model trust']
  },
  {
    id: 'materials',
    short: 'Materials',
    n: '06',
    title: 'Materials and concrete informatics',
    body: 'Long-term material behaviour is a time-series problem. A triple-attention transformer predicts time-dependent concrete creep. Parallel work targets alkali-activated binders, recycled aggregate and supplementary cementitious materials, run with the construction materials group.',
    tags: ['Creep prediction', 'Sustainable binders', 'Time series']
  },
  {
    id: 'geophysics',
    short: 'Geophysics & NDT',
    n: '07',
    title: 'Geophysics and non-destructive testing',
    body: 'Faster ground models from surface measurements. We invert Rayleigh dispersion curves for shear-wave velocity profiles, predict critical pavement strains straight from falling weight deflectometer data without backcalculation, and fuse multi-view ground penetrating radar to find cavities.',
    tags: ['MASW / SASW', 'FWD', 'GPR']
  },
  {
    id: 'safety',
    short: 'Road safety',
    n: '08',
    title: 'Road safety and transport analytics',
    body: 'Crash records are messy and the factors behind them move over time. Random forests, gradient boosting and convolutional networks predict injury severity, and SHAP attribution says which factors drove each prediction. The same learners forecast transport energy demand and rail ridership.',
    tags: ['Crash severity', 'SHAP attribution', 'Demand forecasting']
  },
  {
    id: 'water',
    short: 'Water resources',
    n: '09',
    title: 'Water resources and climate adaptation',
    body: 'Physical basin models are accurate and slow. We train deep learning surrogates on them, so flood forecasts run at a fraction of the cost of a hydrodynamic solver, and couple cluster-based networks to SWAT-MODFLOW to predict groundwater levels where observations are sparse.',
    tags: ['Deep learning surrogates', 'Flood forecasting', 'SWAT-MODFLOW coupling']
  },
  {
    id: 'shm',
    short: 'Monitoring & twins',
    n: '10',
    title: 'Structural health monitoring and digital twins',
    body: 'A laser scan gives the geometry, a nonlinear model gives the behaviour, and a repeat survey gives the change. We close that loop on Thai historic pagodas, masonry walls and tunnel linings: terrestrial scanning records the structure as it actually stands, finite element models estimate how it carries load and what an earthquake would do to it, and later scans show what has moved.',
    tags: ['Laser scanning', 'Nonlinear FE', 'Heritage structures']
  }
];

/* ── People ─────────────────────────────────────────────────── */

const LEAD = {
  name: 'Assoc. Prof. Dr. Sompote Youwai',
  rg: 'Sompote-Youwai',
  role: 'Principal Investigator &middot; Group Lead',
  division: 'Geotechnical Engineering',
  email: 'sompote.you@kmutt.ac.th',
  phone: '+66 2470 9141',
  photo: 'assets/img/people/sompote-youwai.jpg',
  orcid: '0009-0002-9878-8504',
  bio: 'Sompote Youwai leads the group. His work moves along three connected paradigms: deep learning for prediction, computer vision for infrastructure monitoring, and agentic AI for design orchestration. Earlier work on rubber tyre&ndash;sand mixtures and reinforced embankments remains widely cited. He publishes the code and the weights for almost everything the group produces.',
  metrics: [
    { k: 'Citations', v: '1,943' },
    { k: 'h-index', v: '19' },
    { k: 'i10-index', v: '24' }
  ],
  links: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=rAIcivQAAAAJ' },
    { label: 'GitHub', url: 'https://github.com/Sompote' },
    { label: 'Hugging Face', url: 'https://huggingface.co/Sompote' },
    { label: 'KMUTT KIRIM', url: 'https://kirim.kmutt.ac.th/converis/portal/detail/Person/54119735?lang=en_GB' }
  ]
};

const PEOPLE = [
  {
    name: 'Prof. Dr. Pornkasem Jongpradist',
    rg: 'Pornkasem-Jongpradist',
    orcid: '0000-0003-4234-0575',
    scopus: '35796870800',
    photo: 'assets/img/people/pornkasem-jongpradist.jpg',
    email: 'pornkasem.jon@kmutt.ac.th',
    emailVerified: true,
    role: 'Principal Investigator',
    division: 'Geotechnical Engineering',
    note: 'Associate Dean for Research, Faculty of Engineering',
    bio: 'Numerical methods in geomechanics, ground improvement, and tunnelling and underground construction. Recent work automates the estimation of tunnelling-induced ground stability and settlement.',
    metric: '5,400+ citations &middot; h-index 45',
    links: [
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=oaz_nvAAAAAJ' },
      { label: 'KIRIM', url: 'https://kirim.kmutt.ac.th/converis/portal/detail/Person/54115002?lang=en_GB' }
    ]
  },
  {
    name: 'Prof. Dr. Warat Kongkitkul',
    rg: 'Warat-Kongkitkul',
    orcid: '0000-0003-4075-0984',
    scopus: '8832418400',
    photo: 'assets/img/people/warat-kongkitkul.jpg',
    email: 'warat.kon@kmutt.ac.th',
    emailVerified: true,
    role: 'Principal Investigator',
    division: 'Geotechnical Engineering',
    note: 'Head of Geotechnical Engineering Programme',
    bio: 'Geosynthetics, geotechnical instrumentation and physical modelling. Contributes the experimental backbone for the group&rsquo;s pavement, resistivity and reinforcement datasets.',
    metric: '2,500+ citations &middot; h-index 28',
    links: [
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=3ovvMlMAAAAJ' },
      { label: 'KIRIM', url: 'https://kirim.kmutt.ac.th/converis/portal/detail/Person/54212134?lang=en_GB' }
    ]
  },
  {
    name: 'Prof. Dr. Sutat Leelataviwat',
    rg: 'Sutat-Leelataviwat',
    orcid: '0000-0001-9123-8126',
    scopus: '6506956958',
    photo: 'assets/img/people/sutat-leelataviwat.jpg',
    email: 'sutat.lee@kmutt.ac.th',
    emailVerified: true,
    role: 'Principal Investigator',
    division: 'Structural Engineering',
    note: 'Head, Institute for Scientific and Technological Research',
    bio: 'Seismic design, structural dynamics and earthquake engineering. Brings structural performance assessment into the group&rsquo;s liquefaction and hazard modelling work.',
    metric: '1,000+ citations &middot; h-index 17',
    links: [
      { label: 'KIRIM', url: 'https://kirim.kmutt.ac.th/converis/portal/detail/Person/54140039?lang=en_GB' }
    ]
  },
  {
    name: 'Prof. Dr. Weerachart Tangchirapat',
    rg: 'Weerachart-Tangchirapat',
    orcid: '0000-0002-4917-1367',
    scopus: '15133064100',
    photo: 'assets/img/people/weerachart-tangchirapat.jpg',
    email: 'weerachart.tan@kmutt.ac.th',
    emailVerified: true,
    role: 'Principal Investigator',
    division: 'Construction Materials',
    note: 'Deputy Director, M.Eng. Civil Engineering Technology',
    bio: 'Concrete technology and industrial by-products as alternative binders. This covers fly ash, bottom ash, biomass ash and recycled aggregate. Co-leads the concrete creep prediction work.',
    metric: '5,400+ citations &middot; h-index 41',
    links: [
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=9H_2wokAAAAJ' },
      { label: 'KIRIM', url: 'https://kirim.kmutt.ac.th/converis/portal/detail/Person/54248298?lang=en_GB' }
    ]
  },
  {
    name: 'Asst. Prof. Dr. Chana Phutthananon',
    rg: 'Chana-Phutthananon',
    orcid: '0009-0004-6718-0728',
    photo: 'assets/img/people/chana-phutthananon.jpg',
    email: 'chana.phu@kmutt.ac.th',
    emailVerified: false,
    role: 'Principal Investigator',
    division: 'Geotechnical Engineering',
    bio: 'Ground improvement, pile-supported embankments, and tunnelling effects on adjacent structures. Leads the rubber-modified asphalt and pavement overlay studies.',
    metric: '540+ citations &middot; h-index 12',
    links: []
  },
  {
    name: 'Asst. Prof. Dr. Chanchai Petpongpan',
    rg: 'Chanchai-Petpongpan-2',
    orcid: '0009-0007-2545-1683',
    photo: 'assets/img/people/chanchai-petpongpan.jpg',
    email: 'chanchai.pet@kmutt.ac.th',
    emailVerified: false,
    role: 'Principal Investigator',
    division: 'Water Resources Engineering',
    note: 'Head of Water Resources Engineering Programme',
    bio: 'Hydrological and hydraulic modelling, groundwater&ndash;surface water interaction and water resources management. Extends the group&rsquo;s machine learning methods to catchment-scale problems.',
    metric: '100+ citations &middot; h-index 6',
    links: []
  },
  {
    name: 'Assoc. Prof. Dr. Chainarong Athisakul',
    orcid: '0000-0003-0809-9167',
    photo: 'assets/img/people/chainarong-athisakul.jpg',
    email: 'chainarong.ath@kmutt.ac.th',
    emailVerified: true,
    role: 'Principal Investigator',
    division: 'Structural Engineering',
    note: 'Director, M.Eng. Civil Engineering Technology',
    bio: 'Structural mechanics, offshore and cable structures, and structural health monitoring. Brings terrestrial laser scanning into the group as a measurement channel, from historic pagodas to tunnel deformation during construction.',
    metric: '490+ citations &middot; h-index 13',
    links: [
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=z60ETHUAAAAJ' },
      { label: 'KIRIM', url: 'https://kirim.kmutt.ac.th/converis/portal/detail/Person/54234188?lang=en_GB' }
    ]
  },
  {
    name: 'Dr. Peerasit Mahasuwanchai',
    orcid: '0000-0002-0702-0712',
    photo: 'assets/img/people/peerasit-mahasuwanchai.jpg',
    email: 'peerasit.mahasu@kmutt.ac.th',
    emailVerified: true,
    role: 'Principal Investigator',
    division: 'Structural Engineering',
    bio: 'Heritage structures and long-term monitoring. Combines terrestrial laser scanning with nonlinear finite element models to track movement in Thai historic pagodas and masonry, and to assess their seismic performance.',
    metric: 'Heritage structures &amp; laser scanning',
    links: [
      { label: 'KIRIM', url: 'https://kirim.kmutt.ac.th/converis/portal/detail/Person/1448805615?lang=en_GB' }
    ]
  },
  {
    name: 'Dr. Chamroeun Se',
    orcid: '0000-0002-5975-8989',
    scopus: '57219304542',
    photo: 'assets/img/people/chamroeun-se.jpg',
    email: 'chamroeun.se@kmutt.ac.th',
    emailVerified: false,
    role: 'Principal Investigator',
    division: 'Transportation Engineering',
    bio: 'Road safety analytics, crash severity modelling and public transport. Applies tree-based learners, XGBoost&ndash;SHAP and unobserved heterogeneity models to Thai crash data.',
    metric: '1,200+ citations &middot; h-index 21',
    links: [
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=2omiIakAAAAJ' }
    ]
  },
  {
    name: 'Dr. Kosit Jariyatatsakorn',
    photo: 'assets/img/people/kosit-jariyatatsakorn.jpg',
    rg: 'Kosit_Jariyatatsakorn',
    orcid: '0000-0003-4912-850X',
    scopus: '58104830600',
    email: 'kosit.jar@kmutt.ac.th',
    emailVerified: false,
    role: 'Postdoctoral Researcher',
    division: 'Geotechnical Engineering',
    bio: 'Temperature-dependent behaviour of sands, creep deformation and stress relaxation under drained triaxial compression. Supplies the constitutive datasets behind the physics-informed models.',
    metric: 'Creep &amp; rate effects',
    links: []
  },
  {
    name: 'Tipok Kitkobsin',
    photo: 'assets/img/people/tipok-kitkobsin.jpg',
    rg: 'Tipok-Kitkobsin',
    orcid: '0009-0000-6783-4147',
    scopus: '59656639400',
    email: 'tipok.kit@kmutt.ac.th',
    emailVerified: false,
    role: 'Researcher',
    division: 'AI &amp; Geotechnical Engineering',
    bio: 'Explainable dual-stream transformers for soil liquefaction prediction, and XAI frameworks for the shear strength of municipal solid waste. Lead author on the group&rsquo;s liquefaction work.',
    metric: 'Liquefaction &amp; waste mechanics',
    links: [
      { label: 'Paper', url: 'https://www.sciencedirect.com/science/article/abs/pii/S1474034626004064' }
    ]
  }
];

/* ── Current projects ───────────────────────────────────────── */

const PROJECTS = [
  {
    title: 'YOLO26-RD — end-to-end road damage detection',
    status: 'Active',
    theme: 'vision',
    body: 'An NMS-free detector for alligator cracking, linear cracks and patching, built on YOLO26 with edge-guided downsampling and learnable tile-wise contrast adaptation. Trained on a re-audited road damage dataset.',
    links: [
      { label: 'Code', url: 'https://github.com/Sompote/YOLO26RD' },
      { label: 'Demo', url: 'https://huggingface.co/spaces/Sompote/pavement_damage' }
    ]
  },
  {
    title: 'Agentic AI for automated foundation design',
    status: 'Active',
    theme: 'agentic',
    body: 'Router-based multi-agent architectures where language models decompose a foundation design brief, call analysis tools and verify the result against code requirements. Includes a Model Context Protocol server for PLAXIS.',
    links: [
      { label: 'plaxisMCP', url: 'https://github.com/Sompote/plaxisMCP' },
      { label: 'Model', url: 'https://huggingface.co/Sompote/DeepSeek-R1-foundation_design_V1' }
    ]
  },
  {
    title: 'FWD2Strain — pavement strain without backcalculation',
    status: 'Active',
    theme: 'geophysics',
    body: 'Predicts the two critical pavement strains directly from a falling weight deflectometer test, skipping layer backcalculation entirely. Ships as a command line tool, a REST API and a web interface on one set of weights.',
    links: [
      { label: 'Code', url: 'https://github.com/Sompote/FWD2Strain' },
      { label: 'Demo', url: 'https://huggingface.co/spaces/Sompote/FWD' }
    ]
  },
  {
    title: 'DINOv3 + YOLO — data-efficient detection',
    status: 'Active',
    theme: 'vision',
    body: 'Pairs DINOv3 self-supervised visual features with YOLOv12 detection so useful accuracy is reachable from a few hundred labelled images. Detection, segmentation and 3D variants are all maintained.',
    links: [
      { label: 'Code', url: 'https://github.com/Sompote/DINOV3-YOLOV12' },
      { label: 'Segmentation', url: 'https://github.com/Sompote/DinoV3-YOLO-Segment' }
    ]
  },
  {
    title: 'Physics-informed models for elasto-plastic analysis',
    status: 'Active',
    theme: 'pinn',
    body: 'Fourier-feature PINNs applied to elasto-plastic boundary value problems, alongside a critical assessment of where PINNs and operator learning genuinely help geotechnical practice and where they do not.',
    links: [
      { label: 'QPINNS', url: 'https://github.com/Sompote/QPINNS' }
    ]
  },
  {
    title: 'Surface wave inversion toolkit',
    status: 'Active',
    theme: 'geophysics',
    body: 'An open Python toolkit for multichannel and spectral analysis of surface waves, recovering 1-D shear-wave velocity profiles from a Rayleigh phase-velocity curve. Paired with a hosted inversion demo.',
    links: [
      { label: 'PyMASWaves', url: 'https://github.com/Sompote/PyMASWaves' },
      { label: 'Demo', url: 'https://huggingface.co/spaces/Sompote/openSWI' }
    ]
  },
  {
    title: 'Concrete creep prediction',
    status: 'Active',
    theme: 'materials',
    body: 'A triple-attention transformer for time-dependent concrete creep, trained across mix designs and loading histories. Built with the construction materials group.',
    links: [
      { label: 'Code', url: 'https://github.com/Sompote/concrete_creep_repo' },
      { label: 'Demo', url: 'https://huggingface.co/spaces/Sompote/Concrete_creep_predict' }
    ]
  },
  {
    title: 'SAM3 LoRA — segmentation for site imagery',
    status: 'Active',
    theme: 'vision',
    body: 'Parameter-efficient fine-tuning of Segment Anything 3 with LoRA for engineering image datasets, so a segmentation backbone can be adapted on a single GPU.',
    links: [
      { label: 'Code', url: 'https://github.com/Sompote/SAM3_LoRA' }
    ]
  }
];

/* ── Publications ───────────────────────────────────────────── */

const ME = /(Youwai|Jongpradist|Kongkitkul|Leelataviwat|Tangchirapat|Phutthananon|Petpongpan|Kitkobsin|Jariyatatsakorn|Se, C)/;

const PUBS = [
  { y: 2026, theme: 'materials', title: 'Elastic properties of rubber-modified asphaltic concrete under various stress states', authors: 'C. Phutthananon, S. Youwai, P. Preeyanon, W. Kongkitkul, P. Jongpradist', venue: 'International Journal of Pavement Engineering, 27(1)', type: 'Journal' },
  { y: 2026, theme: 'agentic', title: 'Large language model-based multi-agent systems for automated foundation design', authors: 'S. Youwai, D. Phim, V. G. Murcia, R. C. Onas', venue: 'AI in Civil Engineering, 5(1)', type: 'Journal' },
  { y: 2026, theme: 'sequence', title: 'Explainable dual-stream transformer for soil liquefaction prediction', authors: 'T. Kitkobsin, S. Youwai, S. Leelataviwat, P. Jongpradist', venue: 'Advanced Engineering Informatics, 74', type: 'Journal', url: 'https://www.sciencedirect.com/science/article/abs/pii/S1474034626004064' },
  { y: 2026, theme: 'vision', title: 'YOLO26-RD: an end-to-end road damage detection network', authors: 'S. Youwai, P. Chaipetch, H. Samaikul, T. Yonseng', venue: 'arXiv preprint', type: 'Preprint' },
  { y: 2026, theme: 'geophysics', title: 'TriView-YOLO: early multi-view fusion for ground penetrating radar cavity detection', authors: 'S. Thawinutchokaudom, S. Youwai, W. Kongkitkul, M. Yamashina, et al.', venue: 'arXiv preprint', type: 'Preprint' },
  { y: 2026, theme: 'geophysics', title: 'A practical method for predicting pavement strains and overlay thickness', authors: 'C. Phutthananon, W. Kongkitkul, C. Wantanagun, J. Sunitsakul, S. Youwai, et al.', venue: 'Transportation Infrastructure Geotechnology, 13(6)', type: 'Journal' },
  { y: 2026, theme: 'xai', title: 'Predicting waste shear strength through explainable triple-stream attention deep learning', authors: 'P. Suknark, S. Youwai, T. Kitkobsin, S. Towprayoon, C. Chiemchaisri, K. Wangyao', venue: 'Discover Sustainability', type: 'Journal', url: 'https://doi.org/10.1007/s43621-026-04427-8' },
  { y: 2026, theme: 'xai', title: 'Prediction of waste shear strength parameters in open dumps', authors: 'P. Suknark, S. Towprayoon, S. Youwai, C. Chiemchaisri, K. Wangyao', venue: 'Waste Management, 222', type: 'Journal' },
  { y: 2026, theme: 'pinn', title: 'Fourier feature physics-informed neural networks for elasto-plastic analysis', authors: 'A. Robjanghvad, S. Youwai', venue: 'arXiv preprint', type: 'Preprint' },
  { y: 2025, theme: 'xai', title: 'Evaluation of shear strength parameters for municipal solid waste', authors: 'P. Suknark, S. Towprayoon, S. Youwai, C. Chiemchaisri, K. Wangyao', venue: 'Journal of Material Cycles and Waste Management, 27(6)', type: 'Journal' },
  { y: 2025, theme: 'sequence', title: 'Artificial intelligence-optimized shield parameters for soft ground tunneling', authors: 'S. Wainiphithapong, C. Phutthananon, S. Youwai, P. Jamsawang, et al.', venue: 'Underground Space', type: 'Journal' },
  { y: 2025, theme: 'agentic', title: 'Investigating the potential of large language model-based router multi-agent architectures', authors: 'S. Youwai, D. Phim, V. G. Murcia, R. C. Onas', venue: 'arXiv preprint', type: 'Preprint' },
  { y: 2025, theme: 'xai', title: 'Developing an explainable artificial intelligence (XAI) model for predicting pile driving vibrations', authors: 'S. Youwai, A. Pamungmoon', venue: 'Neural Computing and Applications, 37(18)', type: 'Journal' },
  { y: 2025, theme: 'materials', title: 'Strength and elastic properties of air&ndash;cement-treated clays', authors: 'C. Phutthananon, A. Songprom, R. Sukkarak, P. Jongpradist, W. Kongkitkul, S. Youwai', venue: 'Arabian Journal for Science and Engineering, 50(11)', type: 'Journal' },
  { y: 2025, theme: 'materials', title: 'Triple attention transformer architecture for time-dependent concrete creep prediction', authors: 'W. Dokduea, W. Tangchirapat, S. Youwai', venue: 'arXiv preprint', type: 'Preprint' },
  { y: 2025, theme: 'sequence', title: 'Load-deformation prediction of bored piles using sequential soil profile encoding with transformer architecture: a study of Bangkok subsoil', authors: 'S. Youwai, C. Thongnoo', venue: 'Expert Systems with Applications, 275', type: 'Journal', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0957417425007079' },
  { y: 2025, theme: 'xai', title: 'Explainable dual-attention tabular transformer for soil electrical resistivity prediction', authors: 'W. Kongkitkul, S. Youwai, W. Sakulpojworachai', venue: 'arXiv preprint', type: 'Preprint' },
  { y: 2025, theme: 'sequence', title: 'Evaluating and explaining earthquake-induced liquefaction potential through multi-modal transformers', authors: 'S. Youwai, T. Kitkobsin, S. Leelataviwat, P. Jongpradist', venue: 'arXiv:2502.10446', type: 'Preprint', url: 'https://arxiv.org/abs/2502.10446' },
  { y: 2025, theme: 'sequence', title: 'Predicting rapid impact compaction of soil using a parallel transformer and long short-term memory architecture', authors: 'S. Youwai, S. Detcheewa', venue: 'Engineering Applications of Artificial Intelligence, 139', type: 'Journal' },
  { y: 2024, theme: 'vision', title: 'A fused deep learning expert system for road damage detection and size analysis', authors: 'S. Youwai, A. Chaiyaphat, P. Chaipetch', venue: 'Int. Conf. on Intelligent Computing and Next Generation Networks', type: 'Conference' },
  { y: 2024, theme: 'xai', title: 'Explainable artificial intelligence (XAI) for predicting asphalt concrete stiffness and rutting resistance', authors: 'W. Kongkitkul, S. Youwai, S. Khamsoy, M. Feungfung', venue: 'arXiv preprint', type: 'Preprint' },
  { y: 2024, theme: 'vision', title: 'YOLO9tr: a lightweight model for pavement damage detection utilizing a generalized efficient layer aggregation network and attention mechanism', authors: 'S. Youwai, A. Chaiyaphat, P. Chaipetch', venue: 'Journal of Real-Time Image Processing, 21(5)', type: 'Journal' },
  { y: 2025, theme: 'safety', title: 'A random forest and SHAP-based analysis of motorcycle crash severity in Thailand', authors: 'S. Sum, C. Se, T. Champahom, S. Jomnonkwao, S. Sinha, V. Ratanavaraha', venue: 'Transportation Engineering', type: 'Journal' },
  { y: 2025, theme: 'safety', title: 'SHAP-based convolutional neural network modeling for intersection crash severity', authors: 'J. Sunkpho, C. Se, W. Wipulanusat, V. Ratanavaraha', venue: 'IATSS Research', type: 'Journal' },
  { y: 2024, theme: 'safety', title: 'XGBoost-SHAP and unobserved heterogeneity modelling of temporal multivehicle truck-involved crash severity patterns', authors: 'W. Laphrom, C. Se, T. Champahom, S. Jomnonkwao, W. Wipulanusat, T. Satiennam, V. Ratanavaraha', venue: 'Civil Engineering Journal', type: 'Journal' },
  { y: 2024, theme: 'safety', title: 'Tree-based approaches to understanding factors influencing crash severity across roadway classes: a Thailand case study', authors: 'T. Champahom, C. Se, F. Watcharamaisakul, S. Jomnonkwao, A. Karoonsoontawong, V. Ratanavaraha', venue: 'IATSS Research', type: 'Journal' },
  { y: 2024, theme: 'safety', title: 'Modeling motorcycle crash-injury severity using explainable data-driven approaches', authors: 'C. Se, J. Sunkpho, W. Wipulanusat, K. Tantisevi, T. Champahom, V. Ratanavaraha', venue: 'Transportation Letters', type: 'Journal' },
  { y: 2026, theme: 'safety', title: 'Temporal instability of highway pedestrian crash severity: comparative analysis of machine learning models', authors: 'P. Wisutwattanasak, C. Se, S. Sum, T. Champahom, V. Ratanavaraha, S. Jomnonkwao', venue: 'Transportation Research Interdisciplinary Perspectives', type: 'Journal' },
  { y: 2025, theme: 'safety', title: 'Deep learning vs. gradient boosting: optimizing transport energy forecasts in Thailand through LSTM and XGBoost', authors: 'T. Champahom, C. Banyong, T. Janhuaton, C. Se, F. Watcharamaisakul, V. Ratanavaraha, S. Jomnonkwao', venue: 'Energies', type: 'Journal' },
  { y: 2025, theme: 'safety', title: 'Pickup truck crash severity analysis via machine learning: policy insights for developing countries', authors: 'C. Se, T. Champahom, S. Jomnonkwao, T. Boonyoo, A. Karoonsoontawong, V. Ratanavaraha', venue: 'International Journal of Injury Control and Safety Promotion', type: 'Journal' },
  { y: 2025, theme: 'safety', title: 'XGBoost-based prediction model for train passenger numbers: evaluating the effect of the COVID-19 pandemic', authors: 'C. Se, T. Champahom, S. Jomnonkwao, V. Ratanavaraha', venue: 'Communications in Computer and Information Science', type: 'Conference' },
  { y: 2022, theme: 'safety', title: 'Motorcyclist injury severity analysis: a comparison of artificial neural networks and a random parameter model with heterogeneity in means and variances', authors: 'C. Se, T. Champahom, S. Jomnonkwao, V. Ratanavaraha', venue: 'International Journal of Injury Control and Safety Promotion', type: 'Journal' },
  { y: 2026, theme: 'water', title: 'Enhancing flood forecasting with deep learning: a scalable alternative to traditional hydrodynamic models', authors: 'W. Duangkhwan, C. Ekkawatpanit, C. Petpongpan, D. Kositgittiwong, S. Kazama, Y. Hiraga, C. Jaturapitakkul', venue: 'Environmental Modelling &amp; Software', type: 'Journal' },
  { y: 2026, theme: 'water', title: 'Enhancing groundwater level prediction in data-scarce regions: coupling SWAT-MODFLOW with cluster-based deep learning', authors: 'W. Duangkwan, C. Petpongpan, C. Ekkawatpanit, D. Kositgittiwong, C. Jaturapitakkul', venue: 'Research Square preprint', type: 'Preprint', url: 'https://doi.org/10.21203/rs.3.rs-8440121/v1' },
  { y: 2026, theme: 'shm', title: 'Seismic performance and possible damage scenario of an ancient Thai pagoda in Chiang Saen District, Northern Thailand', authors: 'K. Jintrakham, P. Mahasuwanchai, W. Wararuksajja, C. Athisakul, T. Ornthammarath, P. Jongpradist, S. Leelataviwat', venue: 'Results in Engineering', type: 'Journal' },
  { y: 2026, theme: 'shm', title: 'Tunnel deformation monitoring during construction using 3D laser scanning technology', authors: 'A. Intham, P. Jongpradist, C. Binzaits, P. Mahasuwanchai, P. Kungsuwan, A. Thuaksiri', venue: 'Connecting Communities Through Underground Infrastructure', type: 'Conference' },
  { y: 2025, theme: 'shm', title: 'Nonlinear finite element modeling and seismic analysis of Thai historical masonry wall structures', authors: 'F. Wu, C. Athisakul, P. Mahasuwanchai, C. Phansangud, S. Leelataviwat, K. Jintrakham, W. Wen, H. Yang', venue: 'IOP Conference Series: Earth and Environmental Science', type: 'Conference' },
  { y: 2025, theme: 'shm', title: 'Building data acquisition and seismic performance evaluation of a traditional Thai water tower using 3D laser scanning', authors: 'F. Wu, C. Athisakul, T. Srimontriphakdi, C. Binzaits, P. Mahasuwanchai, S. Leelataviwat', venue: 'IOP Conference Series: Earth and Environmental Science', type: 'Conference' },
  { y: 2024, theme: 'shm', title: 'Long-term monitoring and finite element analysis of the Pasana Chedi, Wat Ratchapradit Sathimahasimaram', authors: 'C. Binzaits, P. Mahasuwanchai, C. Athisakul, S. Leelataviwat, S. Chucheepsakul, C. Tingsanchali, C. Sudthongkhong', venue: "The Journal of King Mongkut's University of Technology North Bangkok", type: 'Journal' },
  { y: 2023, theme: 'shm', title: 'A non-contact approach for cable tension evaluation based on 3D laser scanning data and nonlinear finite element analysis', authors: 'T. Srimontriphakdi, P. Mahasuwanchai, C. Athisakul, S. Leelataviwat, K. Klaycham, N. Poovarodom, N. Magteppong, S. Chucheepsakul', venue: 'Measurement', type: 'Journal' },
  { y: 2021, theme: 'shm', title: 'An alternative method for long-term monitoring of Thai historic pagodas based on terrestrial laser scanning data: a case study of Wat Krachee in Ayutthaya', authors: 'P. Mahasuwanchai, C. Athisakul, P. Sairuamyat, W. Tangchirapat, S. Leelataviwat, S. Chucheepsakul', venue: 'Advances in Civil Engineering', type: 'Journal' },
  { y: 2020, theme: 'shm', title: 'Application of 3D laser scanning technology for preservation and monitoring of a Thai pagoda', authors: 'P. Sairuamyat, P. Mahasuwanchai, C. Athisakul, S. Leelataviwat, S. Chucheepsakul', venue: 'IOP Conference Series: Earth and Environmental Science', type: 'Conference' },
  { y: 2015, theme: 'legacy', title: 'High internal pressure induced fracture patterns in rock masses surrounding caverns', authors: 'P. Jongpradist, J. Tunsakul, W. Kongkitkul, N. Fadsiri, G. Arangelovski, S. Youwai', venue: 'Engineering Geology, 197', type: 'Journal' },
  { y: 2013, theme: 'legacy', title: 'Development of tunneling influence zones for adjacent pile foundations by numerical analyses', authors: 'P. Jongpradist, T. Kaewsri, A. Sawatparnich, S. Suwansawat, S. Youwai, et al.', venue: 'Tunnelling and Underground Space Technology, 34', type: 'Journal' },
  { y: 2003, theme: 'legacy', title: 'Strength and deformation characteristics of shredded rubber tire sand mixtures', authors: 'S. Youwai, D. T. Bergado', venue: 'Canadian Geotechnical Journal, 40(2)', type: 'Journal' }
];

/* ── Teaching ───────────────────────────────────────────────
   Open courses. `url` is the playlist; `sample` is one lecture
   linked directly so a visitor can start without committing.
   ─────────────────────────────────────────────────────────── */

const COURSES = [
  {
    title: 'Engineering Application of AI',
    term: 'Winter 2026',
    channel: 'Civil Engineering Online Course',
    url: 'https://www.youtube.com/playlist?list=PL44jd2bsjPZaWepZSwxxsZQnkFjwejirf',
    thumb: 'assets/img/software/course-ai-winter2026.jpg',
    desc: 'A recorded lecture series on putting machine learning to work on engineering problems, following the same ground the group publishes on. Free to watch, no enrolment.',
    sample: { label: 'Explainable AI', url: 'https://youtu.be/pm9BT2v4KXQ' }
  }
];

/* ── Featured software ──────────────────────────────────────
   Projects with their own site and mark. `plate` says which
   ground the logo artwork needs: 'light' for dark artwork,
   'dark' for artwork that is already white on a dark ground.
   ─────────────────────────────────────────────────────────── */

const FEATURED = [
  {
    name: 'TigrimOSR',
    logo: 'assets/img/software/tigrimosr.png',
    plate: 'light',
    url: 'https://tigrimosr.github.io',
    site: 'tigrimosr.github.io',
    desc: 'A native desktop AI assistant written entirely in Rust, using egui for the interface. It starts faster and uses less memory than the Python and Node.js original, and ships as one self-contained binary with no runtime to install.',
    meta: ['Rust', 'Apache&#8209;2.0', '75 stars']
  },
  {
    name: 'Tigriden',
    logo: 'assets/img/software/tigriden.png',
    plate: 'dark',
    url: 'https://tigriden.github.io',
    site: 'tigriden.github.io',
    desc: 'A small end-to-end research workbench. Per-folder terminals for AI coding agents, change tracking with one-click rollback, and LaTeX, PDF and Markdown read as typeset pages rather than source.',
    meta: ['Rust', 'MIT', '12 stars']
  },
  {
    name: 'VisionLabel',
    logo: 'assets/img/software/visionlabel.png',
    plate: 'light',
    url: 'https://github.com/Sompote/VisionLabel',
    site: 'github.com/Sompote/VisionLabel',
    desc: 'The annotation tool behind the group\u2019s vision datasets. Four modes in the browser \u2014 bounding box, oriented box, segmentation, and segmentation with a free-text description \u2014 exporting to YOLO, YOLO OBB, COCO, RefCOCO, ODVG and RF100-VL.',
    meta: ['React', '27 stars']
  }
];

/* ── Software ───────────────────────────────────────────────── */

const REPOS = [
  { name: 'DINOV3-YOLOV12', stars: 318, lang: 'Python', desc: 'DINOv3 self-supervised features plus YOLOv12 detection in one repo. Built for datasets of a few hundred labelled images.' },
  { name: 'SAM3_LoRA', stars: 254, lang: 'Python', desc: 'Fine-tune Segment Anything 3 with LoRA on image datasets. Single-GPU setup.' },
  { name: 'Tigrimos', stars: 110, lang: 'TypeScript', desc: 'Self-hosted AI workspace with chat, code execution and parallel multi-agent orchestration.' },
  { name: 'DINOV3_YOLO', stars: 74, lang: 'Python', desc: 'Detection backbone combining DINOv3 representations with a YOLO head.' },
  { name: 'DinoV3-YOLO-Segment', stars: 54, lang: 'Python', desc: 'Segmentation variant of the DINOv3 + YOLO architecture.' },
  { name: 'YOLO9tr', stars: 11, lang: 'Python', desc: 'Lightweight pavement damage detector with a generalized efficient layer aggregation network and attention.' },
  { name: 'plaxisMCP', stars: 10, lang: 'Python', desc: 'Model Context Protocol server exposing PLAXIS finite-element analysis to AI agents.' },
  { name: 'YOLO26RD', stars: 1, lang: 'Python', desc: 'NMS-free road damage detector with edge-guided downsampling and tile-wise contrast adaptation.' },
  { name: 'FWD2Strain', stars: 0, lang: 'Python', desc: 'Critical pavement strains straight from an FWD test. CLI, REST API and web UI on shared weights.' },
  { name: 'PyMASWaves', stars: 2, lang: 'Python', desc: 'Multichannel and spectral analysis of surface waves for shear-wave velocity profiling.' },
  { name: 'QPINNS', stars: 0, lang: 'Python', desc: 'Physics-informed neural networks for elasto-plastic boundary value problems.' }
];

const SPACES = [
  { id: 'Sompote/FWD', name: 'DBFT Pavement Strain Predictor', desc: 'Predict pavement strains directly from FWD measurements.' },
  { id: 'Sompote/openSWI', name: 'Vs from Dispersion Curve', desc: '1-D shear-wave velocity from a Rayleigh phase-velocity curve.' },
  { id: 'Sompote/MSW_Shear', name: 'MSW Shear Strength', desc: 'Friction angle and cohesion of municipal solid waste from composition.' },
  { id: 'Sompote/SoilResistivity', name: 'Soil Resistivity Prediction', desc: 'Predict soil electrical resistivity from index properties.' },
  { id: 'Sompote/Liquefaction_prediction', name: 'Liquefaction Prediction', desc: 'Multi-modal transformer for earthquake-induced liquefaction potential.' },
  { id: 'Sompote/Pile_deform', name: 'Bored Pile Load-Deformation', desc: 'Load-deformation curves from an encoded Bangkok subsoil profile.' },
  { id: 'Sompote/Concrete_creep_predict', name: 'Concrete Creep Prediction', desc: 'Time-dependent creep from mix design and loading history.' },
  { id: 'Sompote/pavement_damage', name: 'Pavement Damage Detection', desc: 'YOLO-based road distress detection on uploaded imagery.' },
  { id: 'Sompote/PileVibrationXAI', name: 'Pile Driving Vibration XAI', desc: 'Explainable prediction of ground vibration from pile driving.' },
  { id: 'Sompote/Tunnel_defext', name: 'Tunnel Deformation Extraction', desc: 'Extract tunnel deformation measurements from survey data.' },
  { id: 'Sompote/crack_detection', name: 'Concrete Crack Detection', desc: 'Segment cracks in concrete surface photographs.' },
  { id: 'Sompote/PVDcal', name: 'PVD Calculator', desc: 'Prefabricated vertical drain consolidation for multilayer ground.' }
];

/* ── Department contact ─────────────────────────────────────── */

const CONTACT = {
  lead: { name: 'Assoc. Prof. Dr. Sompote Youwai', email: 'sompote.you@kmutt.ac.th', phone: '+66 2470 9141' },
  dept: { name: 'Department of Civil Engineering', phone: '+66 2470 9134', fax: '+66 2427 9063', web: 'https://ce.kmutt.ac.th/en/' },
  address: [
    'AI Research Group',
    'Department of Civil Engineering, Faculty of Engineering',
    "King Mongkut's University of Technology Thonburi",
    '126 Pracha Uthit Road, Bang Mod, Thung Khru',
    'Bangkok 10140, Thailand'
  ]
};
