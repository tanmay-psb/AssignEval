const COURSE_KW = {
  DSA:  ['algorithm','tree','graph','sort','search','complexity','recursion','stack','queue','heap','hash','linked list','binary','traversal','node','pointer'],
  DBMS: ['database','sql','query','schema','table','normalization','transaction','join','index','primary key','relation','entity','attribute','trigger','stored procedure'],
  OS:   ['process','thread','scheduling','memory','page','frame','deadlock','semaphore','mutex','cpu','file system','kernel','interrupt','virtual','segmentation'],
  CN:   ['network','protocol','ip','tcp','udp','router','switch','packet','layer','osi','dns','http','bandwidth','subnet','mac address','socket','frame'],
  OOP:  ['class','object','inheritance','polymorphism','encapsulation','abstraction','method','interface','constructor','overriding','overloading','java','extends','implements'],
  WT:   ['html','css','javascript','dom','responsive','web','ajax','json','api','flexbox','grid','bootstrap','fetch','event listener'],
  SE:   ['requirement','design','testing','agile','sdlc','uml','use case','srs','module','maintenance','deployment','sprint','waterfall','prototype','verification'],
  M3:   ['probability','statistics','distribution','random variable','variance','mean','hypothesis','regression','correlation','normal','binomial','poisson','central limit','anova']
};

const AI_SIGNALS = ['furthermore','additionally','it is worth noting','in conclusion','to summarize','it is important to note','in essence','nevertheless','consequently','moreover','as a result','delve','crucial','significant','comprehensive','leverage','utilize','facilitate','paradigm','optimize'];

async function evaluateSubmission(text, assignment) {
  await delay(2200);
  const words     = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const paras     = text.split(/\n\n+/).filter(p => p.trim());
  const wordCount = words.length;

  const kw        = COURSE_KW[assignment.courseId] || [];
  const matched   = kw.filter(k => text.toLowerCase().includes(k));
  const relevance = Math.min(100, Math.round((matched.length / Math.max(kw.length * 0.4, 1)) * 100));

  let structure = 0;
  if (wordCount >= 500) structure += 35; else if (wordCount >= 200) structure += 22; else structure += 10;
  if (paras.length  >= 4) structure += 35; else if (paras.length >= 2) structure += 22; else structure += 10;
  const avgWPS = wordCount / Math.max(sentences.length, 1);
  structure += (avgWPS >= 10 && avgWPS <= 25) ? 30 : 15;
  structure = Math.min(100, structure);

  const titleWords  = assignment.title.toLowerCase().split(' ').filter(w => w.length > 3);
  const matchedT    = titleWords.filter(w => text.toLowerCase().includes(w));
  const completeness = Math.round((matchedT.length / Math.max(titleWords.length, 1)) * 100);

  const logic = Math.min(100, Math.round(45 + Math.random() * 45 + (wordCount > 300 ? 10 : 0)));

  const overall = Math.min(100, Math.max(35,
    Math.round(relevance * 0.4 + structure * 0.3 + completeness * 0.2 + logic * 0.1)
  ));

  const strengths = [], improvements = [], suggestions = [];
  if (relevance   >= 70) strengths.push('Excellent use of domain-specific terminology');
  else if (relevance >= 40) strengths.push('Good coverage of relevant concepts');
  if (structure   >= 70) strengths.push('Well-organised structure with clear paragraphing');
  if (completeness>= 70) strengths.push('Assignment requirements addressed comprehensively');
  if (logic       >= 80) strengths.push('Logical flow and reasoning demonstrated effectively');
  if (wordCount   >= 500) strengths.push('Detailed and thorough response provided');
  if (!strengths.length)  strengths.push('Submission received and processed successfully');

  if (relevance    < 60) improvements.push('Increase use of subject-specific keywords and concepts');
  if (structure    < 60) improvements.push('Improve document organisation with proper headings and sections');
  if (completeness < 60) improvements.push('Address all aspects of the assignment more thoroughly');
  if (wordCount    < 300) improvements.push('Expand your response with more detailed explanations');
  if (!improvements.length) improvements.push('Minor grammatical and formatting refinements could further improve the work');

  suggestions.push('Include diagrams or visual aids to support explanations');
  suggestions.push('Cite references to textbooks or academic sources');
  if (wordCount < 500) suggestions.push('Aim for at least 500 words for a comprehensive response');
  suggestions.push('Review and proofread for grammar and spelling before final submission');

  return { score: overall, breakdown:{ relevance, structure, completeness, logic }, feedback:{ strengths, improvements, suggestions }, wordCount };
}

async function checkPlagiarism(text) {
  await delay(1600);
  const commonPhrases = ['as defined by','according to','it is well known','the concept of','in other words','for example','in general'];
  const hits = commonPhrases.filter(p => text.toLowerCase().includes(p)).length;
  const pct  = Math.min(85, Math.round(Math.random() * 12 + hits * 3.5));
  const sources = [];
  if (pct > 8)  sources.push({ src:'GeeksforGeeks – Related Topic',         sim: Math.round(pct * 0.55) });
  if (pct > 18) sources.push({ src:'Wikipedia – Course Topic Overview',      sim: Math.round(pct * 0.30) });
  if (pct > 28) sources.push({ src:'ResearchGate – Academic Paper',          sim: Math.round(pct * 0.20) });
  return { percentage: pct, sources, status: pct < 20 ? 'low' : pct < 40 ? 'moderate' : 'high' };
}

async function detectAI(text) {
  await delay(1300);
  const lower    = text.toLowerCase();
  const signals  = AI_SIGNALS.filter(s => lower.includes(s));
  const words    = text.split(/\s+/).length;
  const sents    = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const avgLen   = words / Math.max(sents, 1);
  const score    = Math.min(92, Math.round(Math.random() * 18 + signals.length * 5 + (avgLen > 22 ? 10 : 0)));
  return { score, flagged: score > 30, confidence: score > 60 ? 'High' : score > 30 ? 'Moderate' : 'Low', signals: signals.slice(0, 5) };
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
