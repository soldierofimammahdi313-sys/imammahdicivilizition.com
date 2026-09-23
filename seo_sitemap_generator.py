"""
Imam Mahdi Civilization - Automated SEO & Sitemap Indexing Engine
Author: Syed Ahmad Raza Shamsi (Founder)
Description: Generates standard XML sitemaps for Google Search Console and 
             automatically produces optimized SEO meta tags for all modules.
"""

import xml.etree.ElementTree as ET
from xml.dom import minidom
import datetime
from typing import List, Dict, Any

class IslamicCivilizationSEOEngine:
    def __init__(self, base_url: str):
        self.base_url = base_url if not base_url.endswith('/') else base_url[:-1]
        self.pages_registry: List[Dict[str, Any]] = []
        print(f"[SEO-ENGINE] Initialized for {self.base_url}. Standing by for page injection.")

    def register_page(self, path: str, title: str, category: str, priority: float = 0.8, changefreq: str = "weekly"):
        """ویب سائٹ کا کوئی بھی صفحہ یا ماڈیول اس سسٹم میں رجسٹر کرنا"""
        full_url = f"{self.base_url}/{path.lstrip('/')}"
        
        # خودکار طور پر اس پیج کے لیے ایس ای او کی ورڈز (Tags) جنریٹ کرنا
        generated_tags = self._generate_seo_tags(title, category)
        
        page_data = {
            "url": full_url,
            "title": title,
            "category": category,
            "priority": str(priority),
            "changefreq": changefreq,
            "lastmod": datetime.date.today().strftime("%Y-%m-%d"),
            "meta_tags": generated_tags
        }
        self.pages_registry.append(page_data)

    def _generate_seo_tags(self, title: str, category: str) -> Dict[str, str]:
        """ہر صفحے کے لیے گوگل فرینڈلی ٹیگز، کی ورڈز اور ڈسکرپشن بنانا"""
        # بنیادی کی ورڈز جو ہر اسلامی صفحے کے لیے ضروری ہیں
        base_keywords = ["Imam Mahdi Civilization", "Islamic Knowledge Network", "Shia Islamic AI"]
        
        # کیٹیگری کے حساب سے مخصوص ٹیگز شامل کرنا
        if category.lower() == "hadith":
            base_keywords.extend(["Authentic Hadith", "Ahl al-Bayt Narrations", "Isnad Viewer", "علم الحدیث"])
        elif category.lower() == "quran":
            base_keywords.extend(["Quran Tafsir", "Tafsir al-Mizan", "Quranic Research Tools", "قرآن کریم"])
        elif category.lower() == "ai":
            base_keywords.extend(["N-Eyes AI", "Islamic Artificial Intelligence", "Feqh Ja'fari AI"])
        else:
            base_keywords.extend(["Islamic History Timeline", "Civilization Simulator", "Islamic اکیڈمی"])

        keywords_str = ", ".join(base_keywords)
        description_str = f"Explore {title} on Imam Mahdi Civilization. A premium digital sanctuary dedicated to {category} research, interactive tools, and global community."
        
        return {
            "title": f"{title} | Imam Mahdi Civilization",
            "keywords": keywords_str,
            "description": description_str
        }

    def generate_google_sitemap(self, output_filename: str = "sitemap.xml") -> str:
        """گوگل سرچ کونسل کے لیے آفیشل XML سائیٹ میپ فائل تیار کرنا"""
        if not self.pages_registry:
            print("[WARN] No pages registered. Sitemap will be empty.")
            return ""

        # گوگل کے اسٹینڈرڈ کے مطابق XML اسٹرکچر بنانا
        urlset = ET.Element("urlset", xmlns="http://sitemaps.org")

        for page in self.pages_registry:
            url_element = ET.SubElement(urlset, "url")
            
            ET.SubElement(url_element, "loc").text = page["url"]
            ET.SubElement(url_element, "lastmod").text = page["lastmod"]
            ET.SubElement(url_element, "changefreq").text = page["changefreq"]
            ET.SubElement(url_element, "priority").text = page["priority"]

        # XML کو خوبصورت اور پڑھنے کے قابل (Formatted) بنانا
        xml_string = ET.tostring(urlset, encoding="utf-8")
        parsed_xml = minidom.parseString(xml_string)
        pretty_xml = parsed_xml.toprettyxml(indent="  ")

        # فائل محفوظ کرنا
        with open(output_filename, "w", encoding="utf-8") as f:
            f.write(pretty_xml)
            
        print(f"[SUCCESS] Google Sitemap successfully generated with {len(self.pages_registry)} pages.")
        return pretty_xml

    def get_html_meta_tags(self, target_url: str) -> Optional[Dict[str, str]]:
        """ویب سائٹ کے فرنٹ اینڈ کو مخصوص پیج کے ٹیگز سپلائی کرنا"""
        for page in self.pages_registry:
            if page["url"] == target_url:
                return page["meta_tags"]
        return None

# --- لوکل ٹیسٹنگ اور رن کرنے کا طریقہ ---
if __name__ == "__main__":
    print("=== IMAM MAHDI CIVILIZATION - GOOGLE INDEXING ENGINE ===")
    
    # 1. اپنی ویب سائٹ کے یو آر ایل سے انجن اسٹارٹ کریں
    seo_engine = IslamicCivilizationSEOEngine(base_url="https://imammahdicivilization.com")

    # 2. ویب سائٹ کے اہم صفحات اور ماڈیولز کو اس میں رجسٹر کریں
    seo_engine.register_page(path="/", title="Home - Luminous Heart of Digital Civilization", category="Core", priority=1.0)
    seo_engine.register_page(path="/quran", title="Interactive Quran & Tafsir Platform", category="Quran", priority=0.9)
    seo_engine.register_page(path="/hadith", title="Verified Hadith Collections & Isnad Viewer", category="Hadith", priority=0.9)
    seo_engine.register_page(path="/n-eyes", title="N-Eyes Islamic AI Assistant", category="AI", priority=0.9)
    seo_engine.register_page(path="/simulator", title="AI Islamic Civilization Simulator", category="Tools", priority=0.8)
    seo_engine.register_page(path="/timeline", title="Islamic History Timeline & Revelation", category="Knowledge", priority=0.8)

    # 3. گوگل سرچ کونسل کے لیے سائیٹ میپ فائل بنائیں
    sitemap_data = seo_engine.generate_google_sitemap()

    # 4. ٹیسٹ: چیک کریں کہ قرآن والے پیج کے لیے گوگل ٹیگز کیسے بنے ہیں
    tags = seo_engine.get_html_meta_tags("https://imammahdicivilization.com")
    if tags:
        print("\n--- Example Auto-Generated SEO Meta Tags for /quran ---")
        print(f"HTML Title      : {tags['title']}")
        print(f"Meta Description: {tags['description']}")
        print(f"Meta Keywords   : {tags['keywords']}\n")
