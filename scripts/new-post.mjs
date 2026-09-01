#!/usr/bin/env node
// 사용법: npm run new-post -- "포스트 제목"
import fs from "fs";
import path from "path";

const title = process.argv[2];
if (!title) {
  console.error('사용법: npm run new-post -- "포스트 제목"');
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const slug = `${date}-${title
  .toLowerCase()
  .replace(/[^a-z0-9가-힣\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")}`;

const dir = path.join(process.cwd(), "content/posts");
fs.mkdirSync(dir, { recursive: true });

const filePath = path.join(dir, `${slug}.md`);
const frontmatter = `---
title: "${title}"
description: ""
date: "${date}"
tags: []
keywords: []
category: "" # "regulation"(규제·정책) | "infra"(인프라·시스템)
---

`;

fs.writeFileSync(filePath, frontmatter);
console.log(`생성됨: content/posts/${slug}.md`);
