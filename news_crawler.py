#!/usr/bin/env python3
"""
群星 AI 资讯爬虫 v2 - 日期归档版
运行方式: python news_crawler.py
输出: news.json（按日期分组的AI资讯归档）
"""

import json
import os
import re
from datetime import datetime
from urllib.request import Request, urlopen
from urllib.error import URLError
import ssl

OUTPUT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'news.json')
MAX_PER_DAY = 5

# 图片种子词（用于 picsum 真实摄影图）
IMAGE_SEEDS = [
    "neural-network", "autonomous-car", "satellite-space", "smart-factory",
    "data-center", "deep-learning", "digital-assistant", "code-programming",
    "apple-ai", "cloud-computing", "ai-future", "stock-market",
    "memory-chip", "education-tech", "european-parliament", "robot-automation",
    "rocket-launch", "tech-lab", "internet-data"
]

# RSS 资讯源
SOURCES = [
    {"name": "机器之心", "url": "https://www.jiqizhixin.com/rss", "type": "rss"},
    {"name": "量子位",     "url": "https://www.qbitai.com/feed", "type": "rss"},
    {"name": "IT之家 AI",  "url": "https://www.ithome.com/rss/tag/ai", "type": "rss"},
    {"name": "The Verge AI","url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", "type": "rss"},
]


def fetch_url(url, timeout=10):
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        with urlopen(req, timeout=timeout, context=ctx) as resp:
            raw = resp.read()
            for enc in ['utf-8', 'gbk', 'gb2312', 'latin-1']:
                try: return raw.decode(enc)
                except: continue
            return raw.decode('utf-8', errors='replace')
    except Exception as e:
        print(f"  [WARN] 获取失败: {url} - {e}")
        return None


def parse_rss(xml_text, source_name):
    items = []
    item_pat = re.compile(r'<item>(.*?)</item>', re.DOTALL)
    title_pat = re.compile(r'<title>(.*?)</title>', re.DOTALL)
    link_pat = re.compile(r'<link>(.*?)</link>', re.DOTALL)
    desc_pat = re.compile(r'<description>(.*?)</description>', re.DOTALL)
    date_pat = re.compile(r'<pubDate>(.*?)</pubDate>', re.DOTALL)
    clean_pat = re.compile(r'<[^>]+>')

    for match in item_pat.finditer(xml_text):
        item_xml = match.group(1)
        t = title_pat.search(item_xml)
        l = link_pat.search(item_xml)
        d = desc_pat.search(item_xml)
        dt = date_pat.search(item_xml)

        if t:
            title = clean_pat.sub('', t.group(1)).strip()
            summary = ''
            if d:
                raw = clean_pat.sub('', d.group(1)).strip()
                summary = raw[:150] + '...' if len(raw) > 150 else raw
            url = l.group(1).strip() if l else '#'
            date_str = datetime.now().strftime("%Y-%m-%d")
            if dt:
                try:
                    parsed = datetime.strptime(dt.group(1).strip()[:25], '%a, %d %b %Y %H:%M:%S')
                    date_str = parsed.strftime("%Y-%m-%d")
                except: pass

            items.append({"title": title, "summary": summary, "url": url,
                         "source": source_name, "date": date_str})
    return items


def crawl_all():
    all_items = []
    for src in SOURCES:
        print(f"[INFO] 抓取 {src['name']}...")
        txt = fetch_url(src['url'])
        if txt:
            its = parse_rss(txt, src['name'])
            print(f"  -> {len(its)} 条")
            all_items.extend(its)
        else:
            print(f"  -> 获取失败")
    return all_items


def guess_category(text):
    tl = text.lower()
    if any(k in tl for k in ['大模型','gpt','gemini','llm','基座','模型']): return "大模型"
    if any(k in tl for k in ['绘画','视频','生成','midjourney','sora','创作']): return "AI创作"
    if any(k in tl for k in ['伦理','安全','治理','法规','合规']): return "AI治理"
    if any(k in tl for k in ['汽车','驾驶','机器人','具身','制造']): return "AI应用"
    if any(k in tl for k in ['google','openai','meta','苹果','百度','ipo','上市']): return "大厂动态"
    if any(k in tl for k in ['教育','学校','学习']): return "AI教育"
    if any(k in tl for k in ['芯片','算力','数据','基础设施']): return "AI基础设施"
    return "行业动态"


def rank_dedup(items, n=MAX_PER_DAY):
    seen = set()
    uniq = []
    for it in items:
        key = it['title'][:35]
        if key not in seen:
            seen.add(key)
            uniq.append(it)
    def score(it):
        s = 0
        if len(it.get('summary', '')) > 50: s += 2
        if it['source'] in ('机器之心', '量子位', 'IT之家 AI'): s += 1
        return s
    return sorted(uniq, key=score, reverse=True)[:n]


def group_by_date(items):
    """按日期分组"""
    groups = {}
    for item in items:
        d = item.get('date', datetime.now().strftime("%Y-%m-%d"))
        groups.setdefault(d, []).append(item)
    return groups


def generate_output(grouped):
    """生成 news.json 输出格式"""
    dates = sorted(grouped.keys(), reverse=True)
    news = {}
    img_idx = 0

    for d in dates:
        day_items = []
        for i, item in enumerate(grouped[d]):
            img_idx = img_idx % len(IMAGE_SEEDS)
            day_items.append({
                "id": img_idx + 1,
                "title": item.get("title", "无标题"),
                "summary": item.get("summary", ""),
                "source": item.get("source", "未知来源"),
                "date": d,
                "url": item.get("url", "#"),
                "image": "https://picsum.photos/seed/{}/800/450".format(IMAGE_SEEDS[img_idx]),
                "category": guess_category(item.get("title", "") + item.get("summary", ""))
            })
            img_idx += 1
        news[d] = day_items

    return {
        "updated": datetime.now().strftime("%Y-%m-%dT%H:%M:%S+08:00"),
        "dates": dates,
        "news": news
    }


def main():
    print("=" * 50)
    print(f"  群星 AI 资讯爬虫 v2 - {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 50)

    items = crawl_all()

    if not items:
        print("[WARN] RSS全部失败，生成空归档")
        output = {
            "updated": datetime.now().strftime("%Y-%m-%dT%H:%M:%S+08:00"),
            "dates": [datetime.now().strftime("%Y-%m-%d")],
            "news": {}
        }
    else:
        # 去重排序后按日期分组
        daily = {}
        for item in items:
            d = item.get("date", datetime.now().strftime("%Y-%m-%d"))
            daily.setdefault(d, []).append(item)
        for d in daily:
            daily[d] = rank_dedup(daily[d])

        output = generate_output(daily)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    total = sum(len(v) for v in output['news'].values())
    print(f"\n[DONE] {len(output['dates'])} 天，共 {total} 条 -> {OUTPUT_FILE}")


if __name__ == '__main__':
    main()
