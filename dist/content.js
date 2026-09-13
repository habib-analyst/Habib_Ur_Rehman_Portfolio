export const designs = [
  { id: 'orbit', name: 'Orbit', description: 'Spatial · Immersive', number: '01' },
  { id: 'atlas', name: 'Atlas', description: 'Global · Layered', number: '02' },
  { id: 'signal', name: 'Signal', description: 'Pulse · Telemetry', number: '03' },
  { id: 'aura', name: 'Aura', description: 'Fluid · Luminous', number: '04' },
  { id: 'folio', name: 'Folio', description: 'Editorial · Considered', number: '05' },
  { id: 'shift', name: 'Shift', description: 'Bold · Graphic', number: '06' },
];

/* Text sense (research): 6s scan — role + domain + outcome; stack early; clarity over cleverness;
   one primary CTA; work-first; short supporting lines. */
export const copy = {
  orbit: {
    eyebrow: 'ML ENGINEER · LLMs · VISION · RAG',
    headline: 'AI systems that<br>hold up in <em>practice.</em>',
    sub: 'I design LLM applications, retrieval pipelines, and vision models with evaluation and reliability built in — not bolted on.',
    workLabel: '01 / SELECTED WORK',
    workTitle: 'Problems worth solving.',
    workSub: 'Four directions across medical imaging, multimodal detection, secure learning, and agentic systems.',
    aboutLabel: '02 / PROFILE',
    aboutTitle: 'Curious by nature.<br>Rigorous by craft.',
    contactLabel: '03 / CONTACT',
    contactTitle: 'Building something useful?<br>Let’s <em>talk.</em>',
  },
  atlas: {
    eyebrow: 'AI ENGINEER · LANGUAGE · VISION · AUTOMATION',
    headline: 'Intelligence<br>without <em>borders.</em>',
    sub: 'Machine learning systems that connect retrieval, multimodal understanding, and agentic workflows under real constraints.',
    focus: 'LLM apps, RAG, agentic workflows, and reliable AI integrations.',
    workLabel: 'SELECTED WORK',
    workTitle: 'Systems shaped by<br>real questions.',
    aboutLabel: 'PROFILE',
    aboutTitle: 'Research depth.<br>Product direction.',
    contactLabel: 'START A CONVERSATION',
    contactTitle: 'Have an idea worth<br>building?',
  },
  signal: {
    eyebrow: 'ML ENGINEER · LIVE SYSTEMS',
    headline: 'Clear signal.<br><span>Real systems.</span>',
    sub: 'I ship LLM apps, retrieval pipelines, and vision models with evaluation loops you can trust.',
    workLabel: 'SELECTED CHANNELS',
    workTitle: 'Work that transmits.',
    aboutLabel: 'PROFILE',
    aboutTitle: 'Engineer in the loop.',
    contactLabel: 'TRANSMIT',
    contactTitle: 'Ready to sync?',
  },
  aura: {
    eyebrow: 'LANGUAGE · VISION · INTELLIGENT AUTOMATION',
    headline: 'Complex models.<br><em>Clear outcomes.</em>',
    sub: 'AI applications built around useful retrieval, careful evaluation, and thoughtful interaction.',
    workLabel: 'SELECTED RESEARCH',
    workTitle: 'Signals in the noise.',
    aboutTitle: 'A curious mind.<br><em>A considered approach.</em>',
    contactLabel: 'CONTACT',
    contactTitle: 'Let’s discuss<br>what you’re building.',
  },
  folio: {
    kickerLeft: 'SELECTED WORK',
    kickerRight: 'LANGUAGE · VISION · AGENTIC SYSTEMS',
    coverLead: 'Building useful systems<br>across language, vision<br>and secure learning.',
    coverAside: 'Machine learning engineer<br>working from research to delivery.',
    workTitle: 'Selected studies',
    aboutTitle: 'In perspective',
    quote: '“Curiosity is<br>where it begins.”',
    contactLabel: 'CONTACT',
    contactTitle: 'Let’s discuss<br>the <em>next problem.</em>',
  },
  shift: {
    eyebrow: 'HABIB UR REHMAN / ML ENGINEER',
    headline: 'BUILD<br>WHAT <span>MATTERS.</span>',
    sub: 'LLM applications, computer vision, and practical ML — judged by usefulness.',
    workTitle: 'THE WORK',
    aboutTitle: 'CURIOUS<br>BY DESIGN.',
    contactTitle: 'LET’S BUILD<br>SOMETHING<br><em>USEFUL.</em>',
  },
};

export const projects = [
  {
    title: 'Seeing beyond the scan.',
    short: 'Medical imaging',
    category: 'COMPUTER VISION',
    tag: 'ViT × Perceiver IO',
    metric: '6',
    unit: 'disease categories',
    description: 'Hybrid vision architecture for multi-disease detection in medical imaging — built to support clinical interpretation.',
    detail: 'Combines Vision Transformers and Perceiver IO across more than 30,000 images spanning stroke, Alzheimer’s disease, and pneumonia. Explores unified classification across six disease categories.',
    stack: ['Medical imaging', 'Vision Transformers', 'Perceiver IO'],
    color: '#b7ee73',
  },
  {
    title: 'Question what looks real.',
    short: 'Deepfake detection',
    category: 'MULTIMODAL AI',
    tag: 'Audio + video',
    metric: '2',
    unit: 'modalities, one model',
    description: 'Cross-modal deepfake detection with audio–video cues, Fourier-domain features, and cross-dataset evaluation.',
    detail: 'Uses complementary frequency-domain cues in audio and video. Cross-dataset evaluation tests how detection models generalize beyond their training distribution.',
    stack: ['Deep learning', 'Fourier analysis', 'Multimodal learning'],
    color: '#a7b5ff',
  },
  {
    title: 'Learn together. Stay private.',
    short: 'Federated learning',
    category: 'SECURE AI',
    tag: 'Privacy by design',
    metric: 'FL',
    unit: 'distributed intelligence',
    description: 'Secure collaborative learning for sensitive healthcare and finance data — models improve without centralizing raw records.',
    detail: 'Studies federated learning with GAN and blockchain-oriented approaches, focusing on privacy, participation, and practical collaboration constraints.',
    stack: ['Federated learning', 'GANs', 'Blockchain'],
    color: '#f4b882',
  },
  {
    title: 'Agents that act with context.',
    short: 'Agentic AI systems',
    category: 'LLM ENGINEERING',
    tag: 'RAG + tools + memory',
    metric: 'AI',
    unit: 'agents, retrieval and tools',
    description: 'LLM agents for research and workflow automation around retrieval, memory, tool use, and evaluation loops.',
    detail: 'Independent and multi-agent systems with RAG, planning, tool calling, memory, and orchestration — including research, email, and workflow automation patterns.',
    stack: ['LLMs', 'RAG', 'LangGraph', 'Tool calling'],
    color: '#79d6d1',
  },
];

export const links = {
  site: 'https://habib.top',
  email: 'https://mail.google.com/mail/?view=cm&fs=1&to=habib.gcuf.edu%40gmail.com&su=Let%27s%20connect',
  github: 'https://github.com/habib-analyst',
  linkedin: 'https://www.linkedin.com/in/hur.dev',
  cv: 'https://drive.google.com/file/d/181r5rEnYXCtm7LVtBOTN1ADBVyZcfWA_/view?usp=sharing',
  cvPreview: 'https://drive.google.com/file/d/181r5rEnYXCtm7LVtBOTN1ADBVyZcfWA_/preview',
  cvDownload: 'https://drive.google.com/uc?export=download&id=181r5rEnYXCtm7LVtBOTN1ADBVyZcfWA_',
};

export const bio = 'I’m Habib, a machine learning engineer turning LLM applications, retrieval systems, and vision research into usable products. I care about evaluation, reliability, and shipping systems people can trust.';
export const skills = ['Python', 'PyTorch', 'TensorFlow', 'Hugging Face', 'LLMs', 'Generative AI', 'RAG', 'Agentic RAG', 'Fine-tuning', 'LoRA / QLoRA', 'PEFT', 'LangChain', 'LangGraph', 'AI Agents', 'Multi-Agent Systems', 'Tool Calling', 'MCP', 'Vector Search', 'FastAPI', 'Docker', 'Computer Vision', 'Multimodal Learning', 'NLP', 'Federated Learning', 'SQL'];
export const orbitKeywords = ['LLM', 'RAG', 'Agents', 'PyTorch', 'Vision', 'LangGraph', 'LoRA', 'MCP'];
export const atlasKeywords = ['Python', 'Transformers', 'Retrieval', 'Multimodal', 'Privacy', 'Docker', 'SQL', 'PEFT', 'Hugging Face', 'Evaluation', 'Orchestration', 'Secure AI'];
