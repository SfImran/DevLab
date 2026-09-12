const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'src', 'content');

const dirs = ['interview', 'salesforce', 'architecture', 'resources'];
dirs.forEach(d => {
  const p = path.join(contentDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Helper
const writeMd = (dir, slug, frontmatter, content) => {
  const fp = path.join(contentDir, dir, `${slug}.md`);
  let fm = '---\n';
  for (const [k, v] of Object.entries(frontmatter)) {
    if (Array.isArray(v)) {
      fm += `${k}:\n`;
      v.forEach(item => fm += `  - "${item}"\n`);
    } else {
      fm += `${k}: "${v}"\n`;
    }
  }
  fm += '---\n\n';
  fs.writeFileSync(fp, fm + content);
};

// Generate Interview Questions
const interviewCategories = [
  { name: 'Apex', count: 5 },
  { name: 'LWC', count: 5 },
  { name: 'Integration', count: 5 },
  { name: 'Salesforce Security', count: 5 },
  { name: 'Governor Limits', count: 5 },
  { name: 'Architecture', count: 5 }
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Architect'];

interviewCategories.forEach(cat => {
  for (let i = 1; i <= cat.count; i++) {
    const slug = `${cat.name.toLowerCase().replace(/ /g, '-')}-question-${i}`;
    writeMd('interview', slug, {
      title: `${cat.name} Interview Question ${i}`,
      category: cat.name,
      difficulty: difficulties[i % 4],
      tags: [cat.name, 'Interview']
    }, `### Short Answer\n\nConcise interview-ready answer for ${cat.name} question ${i}.\n\n### Detailed Explanation\n\nExplain the concept clearly.\n\n### When to Use\n\nPractical situations.\n\n### Example\n\n\`\`\`apex\n// Code example\n\`\`\`\n\n### Interview Tip\n\nWhat the interviewer is actually testing.\n\n### Follow-up Questions\n\n* Related question 1\n* Related question 2\n`);
  }
});

// Generate Articles
for (let i = 1; i <= 3; i++) {
  writeMd('salesforce', `salesforce-article-${i}`, {
    title: `Salesforce Technical Article ${i}`,
    description: `A detailed guide on Salesforce engineering concept ${i}.`,
    date: `2026-09-0${i}`,
    tags: ['Salesforce', 'Development']
  }, `## Introduction\n\nThis is a placeholder for Salesforce Technical Article ${i}.\n\n### Implementation\n\nDetails go here.`);

  writeMd('architecture', `architecture-article-${i}`, {
    title: `Salesforce Architecture Article ${i}`,
    description: `Exploring system design and scalable patterns in Salesforce ${i}.`,
    date: `2026-09-0${i}`,
    tags: ['Architecture', 'System Design']
  }, `## Problem\n\nProblem statement.\n\n### Architecture\n\n\`\`\`mermaid\nflowchart LR\n  Salesforce --> ExternalSystem\n\`\`\`\n\n### Trade-offs\n\nDiscuss trade-offs.`);

  writeMd('resources', `developer-resource-${i}`, {
    title: `Developer Productivity Resource ${i}`,
    description: `Tips and tools for developers to improve productivity ${i}.`,
    date: `2026-09-0${i}`,
    tags: ['Productivity', 'Tools']
  }, `## Overview\n\nBoost your productivity with these tools and tips.\n\n### Setup\n\nConfiguration details.`);
}

console.log('Content generation complete.');
