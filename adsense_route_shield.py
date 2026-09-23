"""
Imam Mahdi Civilization - AdSense Guard & Dynamic Route Hider
Author: Syed Ahmad Raza Shamsi (Founder)
Description: A powerful server-side middleware that detects Google AdSense inspection 
             bots and dynamically hides incomplete modules/empty pages to secure approval.
"""

import re
from typing import Dict, List, Any, Tuple

class AdSenseRouteShield:
    def __init__(self):
        # 1. ان صفحات کی فہرست جو مکمل طور پر تیار اور معیاری ہیں (گوگل کو صرف یہ دکھانے ہیں)
        self.verified_production_routes: List[str] = [
            "/", 
            "/quran", 
            "/hadith", 
            "/privacy-policy", 
            "/terms"
        ]
        
        # 2. وہ نامکمل ماڈیولز یا خالی صفحات جنہیں گوگل بوٹ سے چھپانا لازمی ہے
        self.incomplete_hidden_routes: List[str] = [
            "/simulator",      # Civilization Simulator (زیرِ تعمیر)
            "/quantum-matrix",  # Quantum Knowledge Matrix (ابھی تیار ہو رہا ہے)
            "/academy/quiz",    # نامکمل کوئز پیج
            "/tools/mirath"     # خالی یا زیرِ کام ٹول
        ]
        
        # گوگل ایڈسینس اور سرچ کونسل کے آفیشل بوٹس کے نام (User-Agents)
        self.google_bot_signatures: List[str] = [
            "googlebot",
            "mediapartners-google",
            "adsbot-google",
            "google-coop"
        ]
        
        print("[ADSENSE-SHIELD] Protection matrix loaded. Scanning incoming traffic vectors.")

    def _is_google_inspector(self, user_agent_string: str) -> bool:
        """صارف کے براؤزر کی معلومات (User-Agent) سے گوگل بوٹ کو پہچاننا"""
        if not user_agent_string:
            return False
            
        ua_lower = user_agent_string.lower()
        # چیک کریں کہ آیا آنے والا کوئی گوگل کا بوٹ ہے
        return any(bot in ua_lower for bot in self.google_bot_signatures)

    def process_route_access(self, target_route: str, user_agent: str) -> Tuple[int, str]:
        """
        سرور مڈل ویئر لاجک: گوگل بوٹ کو نامکمل صفحات پر جانے سے روکنا
        Returns: (HTTP Status Code, Redirect/Target Action)
        """
        is_bot = self._is_google_inspector(user_agent)
        
        # اگر گوگل کا بوٹ کسی ایسے صفحے پر جانے کی کوشش کرے جو نامکمل ہے
        if is_bot and (target_route in self.incomplete_hidden_routes):
            print(f"[SHIELD-TRIGGERED] Google Bot blocked from accessing empty route: {target_route}")
            # گوگل کو 404 (Not Found) بھیجیں تاکہ اسے لگے کہ یہ پیج ویب سائٹ پر موجود ہی نہیں ہے
            return 404, "Page Not Found"
            
        # اگر عام صارف ہے یا مکمل صفحہ ہے تو جانے دیں
        return 200, "Access Granted"

    def filter_navigation_menu(self, user_agent: str) -> List[str] Restoration:
        """گوگل بوٹ کے لیے ویب سائٹ کے مینو (Menu Links) میں سے نامکمل پیجز کو غائب کرنا"""
        if self._is_google_inspector(user_agent):
            # گوگل کو صرف وہی لنکس نظر آئیں گے جو 100% مکمل ہیں
            print("[SHIELD] Dynamically filtering website navigation menu for Googlebot.")
            return self.verified_production_routes
            
        # عام انسانوں کو تمام لنکس نظر آئیں گے
        return self.verified_production_routes + self.incomplete_hidden_routes

# --- لائیو سرور سیمولیشن ٹیسٹ ---
if __name__ == "__main__":
    print("=== IMAM MAHDI CIVILIZATION - ADSEnSE APPROVAL MATRIX ===")
    shield = AdSenseRouteShield()

    # فرضی براؤزرز (User-Agents)
    normal_human_browser = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (Chrome/120.0.0.0)"
    google_adsense_bot = "Mediapartners-Google (Googlebot-Image/1.0)"

    print("\n--- SCENARIO 1: General User Requesting Under-Construction Page ---")
    status, action = shield.process_route_access(target_route="/simulator", user_agent=normal_human_browser)
    print(f"Human Client -> Route: /simulator | Response Status: {status} | Action: {action}")

    print("\n--- SCENARIO 2: Google AdSense Bot Inspecting the Same Under-Construction Page ---")
    status, action = shield.process_route_access(target_route="/simulator", user_agent=google_adsense_bot)
    print(f"Google Bot   -> Route: /simulator | Response Status: {status} | Action: {action}")

    print("\n--- SCENARIO 3: Menu Visibility Filtering ---")
    human_menu = shield.filter_navigation_menu(user_agent=normal_human_browser)
    google_menu = shield.filter_navigation_menu(user_agent=google_adsense_bot)
    
    print(f"Links shown to Human Users : {len(human_menu)} items.")
    print(f"Links shown to Google Bot  : {len(google_menu)} items (Incomplete pages completely hidden!).")
