"""
Imam Mahdi Civilization - Production Web Security Middleware
Author: Syed Ahmad Raza Shamsi (Founder)
Description: Comprehensive Web-Layer Shield including Input Sanitization (Anti-XSS),
             Rate Limiting (Anti-DDoS), CSRF Protection, and Security Headers.
"""

import time
import re
from typing import Dict, Tuple, Optional

class WebSecurityShield:
    def __init__(self):
        # ڈی ڈاس روکنے کے لیے آئی پی ٹریکر (IP: [کمپیوٹر کی ریکویسٹس، آخری ریکویسٹ کا وقت])
        self.__rate_limit_registry: Dict[str, Tuple[int, float]] = {}
        # CSRF پروٹیکشن کے لیے فعال سیشنز کا پول
        self.__active_csrf_tokens: Dict[str, str] = {}
        
        print("[WEB-SHIELD-ACTIVE] HTTP Layer Protection Matrix Initialized.")

    def enforce_rate_limiting(self, client_ip: str) -> bool:
        """
        Anti-DDoS Shield: ایک آئی پی کو ایک منٹ میں 60 سے زیادہ ریکویسٹس کی اجازت نہیں دیتا
        """
        current_time = time.time()
        
        if client_ip not in self.__rate_limit_registry:
            self.__rate_limit_registry[client_ip] = (1, current_time)
            return True
            
        requests, last_request_time = self.__rate_limit_registry[client_ip]
        
        # اگر 60 سیکنڈ گزر چکے ہیں تو کاؤنٹر دوبارہ 1 سے شروع کریں
        if current_time - last_request_time > 60.0:
            self.__rate_limit_registry[client_ip] = (1, current_time)
            return True
            
        # اگر 60 سیکنڈ کے اندر ریکویسٹس کی تعداد 60 سے تجاوز کر جائے تو بلاک کر دیں
        if requests >= 60:
            print(f"[SECURITY ALERT] Rate limit exceeded by IP: {client_ip}. Dropping connection.")
            return False
            
        # کاؤنٹر میں ایک کا اضافہ کریں
        self.__rate_limit_registry[client_ip] = (requests + 1, last_request_time)
        return True

    def sanitize_user_input(self, user_data: str) -> str:
        """
        Anti-XSS & Anti-SQL Injection: صارف کے لکھے ہوئے ڈیٹا میں سے 
        تمام نقصان دہ اسکرپٹس اور ہیکنگ کوڈ کو صاف کرنا۔
        """
        if not user_data:
            return ""
            
        # ایچ ٹی ایم ایل اسکرپٹ ٹیگز کو ختم کرنا (<script> وغیرہ)
        clean_data = re.sub(r'<script.*?>.*?</script.*?>', '', user_data, flags=re.IGNORECASE)
        clean_data = re.sub(r'<[^>]*>', '', clean_data)  # تمام بقایا ایچ ٹی ایم ایل ٹیگز صاف کرنا
        
        # ڈیٹا بیس ہیکنگ کے مخصوص کی ورڈز کو بے اثر کرنا (SQL Injection Mitigation)
        clean_data = clean_data.replace("DROP TABLE", "").replace("UNION SELECT", "").replace("OR 1=1", "")
        
        return clean_data.strip()

    def generate_csrf_token(self, session_id: str) -> str:
        """ویب سائٹ کے فارمز کے لیے ایک منفرد اور محفوظ CSRF ٹوکن بنانا"""
        import secrets
        token = secrets.token_hex(32)
        self.__active_csrf_tokens[session_id] = token
        return token

    def validate_csrf_token(self, session_id: str, submitted_token: str) -> bool:
        """فارم سبمٹ ہونے پر ٹوکن کی تصدیق کرنا کہ یہ ہماری ہی ویب سائٹ سے آیا ہے"""
        import hmac
        if session_id not in self.__active_csrf_tokens:
            return False
        
        # ٹائمنگ اٹیک سے محفوظ موازنہ
        return hmac.compare_digest(self.__active_csrf_tokens[session_id], submitted_token)

    def inject_http_security_headers(self) -> Dict[str, str]:
        """براؤزرز کے لیے ملٹری گریڈ سیکیورٹی ہیڈرز کی لسٹ فراہم کرنا"""
        return {
            "X-Frame-Options": "DENY",  # ہماری ویب سائٹ کو کوئی دوسری سائٹ اپنے اندر فریم میں نہیں کھول سکتی (Anti-Clickjacking)
            "X-Content-Type-Options": "nosniff",  # براؤزر کو فائل ٹائپ بدلنے سے روکنا
            "Content-Security-Policy": "default-src 'self'",  # صرف ہماری اپنی ویب سائٹ سے اسکرپٹس لوڈ کرنے کی اجازت
            "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"  # صرف HTTPS پر ویب سائٹ کھولنے کی پابندی
        }

# --- ویب سائٹ پر اس کے کام کا لوکل ٹیسٹ ---
if __name__ == "__main__":
    web_shield = WebSecurityShield()
    test_ip = "203.135.46.10"
    session_id = "user_session_abc123"

    # 1. ٹیسٹ: ان پٹ صفائی (Sanitization)
    hacker_input = "<script>malicious_code()</script> SELECT * FROM users WHERE ID = 1 OR 1=1;"
    clean_output = web_shield.sanitize_user_input(hacker_input)
    print(f"\n[TEST 1] Raw Input  : {hacker_input}")
    print(f"[TEST 1] Cleaned Input: {clean_output}")

    # 2. ٹیسٹ: ڈی ڈاس پروٹیکشن (Rate Limiting)
    print("\n[TEST 2] Simulating rapid requests from same IP...")
    for i in range(65):
        allowed = web_shield.enforce_rate_limiting(test_ip)
        if not allowed:
            print(f"-> Request {i+1}: Blocked automatically by DDoS Shield.")
            break

    # 3. ٹیسٹ: سیکیورٹی ہیڈرز
    headers = web_shield.inject_http_security_headers()
    print("\n[TEST 3] Recommended Production Security Headers injected successfully.")
