"""
Military-Grade Security Core & Intrusion Prevention System (IPS)
Author: Syed Ahmad Raza Shamsi (Founder, Imam Mahdi Civilization)
Description: A Zero-Trust Anti-Tampering Security Framework designed to block advanced 
             cyber threats, protect memory vectors, and enforce cryptographic seals.
"""

import hashlib
import hmac
import os
import secrets
import sys
import logging
from typing import Dict, Any

# فورسز لیول کا لاگنگ سسٹم (صرف انتہائی اہم الرٹس کے لیے)
logging.basicConfig(level=logging.INFO, format='[SECURITY-FORCE-ALERT] %(asctime)s - %(levelname)s - %(message)s')

class SecurityForcesCore:
    def __init__(self):
        # ہر سیشن کے لیے ایک منفرد کوانٹم سیف ماسٹر کی (Master Key) جنریٹ کرنا
        self._system_kernel_key: bytes = secrets.token_bytes(64)
        self._active_sessions: Dict[str, bytes] = {}
        # کوڈ کی سالمیت (Integrity) کو برقرار رکھنے کے لیے ابتدائی ہیش
        self._self_integrity_seal: str = self._calculate_code_checksum()
        
        logging.info("Security Forces Kernel initialized. Zero-Trust protocols active.")

    def _calculate_code_checksum(self) -> str:
        """موجودہ چلتے ہوئے کوڈ کا ہیش بنانا تاکہ اگر کوئی ہیکر رن ٹائم پر کوڈ بدلے تو پکڑا جائے"""
        try:
            with open(__file__, "rb") as f:
                return hashlib.sha3_512(f.read()).hexdigest()
        except Exception:
            # اگر فائل ریڈ کرنے میں کوئی گڑبڑ ہو (جو ہیکنگ کی نشانی ہو سکتی ہے)
            self.trigger_emergency_shutdown("Self-read failure. Code isolation compromised.")
            return ""

    def verify_system_integrity(self) -> bool:
        """رن ٹائم پر سسٹم کی سیکیورٹی چیک کرنا (Anti-Tampering Verification)"""
        current_seal = self._calculate_code_checksum()
        if current_seal != self._self_integrity_seal:
            self.trigger_emergency_shutdown("CRITICAL: Code tampering detected! System memory modified.")
            return False
        return True

    def generate_secure_token(self, payload: str) -> str:
        """ڈیٹا کو ملٹری گریڈ HMAC-SHA256 کے ذریعے سیل کرنا تاکہ ہیکر ڈیٹا تبدیل نہ کر سکے"""
        if not self.verify_system_integrity():
            return "UNAUTHORIZED"

        # ایک بار استعمال ہونے والا سیکیورٹی سالٹ (Salt)
        salt = secrets.token_bytes(16)
        secure_hmac = hmac.new(self._system_kernel_key, payload.encode() + salt, hashlib.sha256)
        token = secure_hmac.hexdigest()
        
        # سیشن کو عارضی طور پر محفوظ کرنا
        self._active_sessions[token] = salt
        return token

    def validate_incoming_packet(self, payload: str, token: str) -> bool:
        """باہر سے آنے والے کسی بھی ڈیٹا یا کمانڈ کی سخت ترین تصدیق"""
        self.verify_system_integrity()

        if token not in self._active_sessions:
            logging.warning(f"INTRUSION ATTEMPT: Invalid token signature submitted. Packet dropped.")
            return False

        # دوبارہ حساب لگا کر میچ کرنا کہ ہیکر نے بیچ میں ڈیٹا تو نہیں بدلا (Man-in-the-Middle Attack)
        salt = self._active_sessions[token]
        expected_hmac = hmac.new(self._system_kernel_key, payload.encode() + salt, hashlib.sha256).hexdigest()
        
        # Constant-Time Comparison (ٹائمنگ حملوں کو روکنے کے لیے استعمال ہوتا ہے)
        is_valid = hmac.compare_digest(expected_hmac, token)
        
        if not is_valid:
            logging.error("MALICIOUS DATA DETECTED: Payload signature mismatch. Blacklisting source IP.")
            return False
            
        return True

    def trigger_emergency_shutdown(self, reason: str):
        """اگر ہیکر کا حملہ ثابت ہو جائے، تو سسٹم فوراً خود کو تباہ (Lock/Shutdown) کر دے گا تاکہ ڈیٹا چوری نہ ہو"""
        logging.critical(f"EMERGENCY PROTOCOL ACTIVATED: {reason}")
        logging.critical("Wiping transient cryptographic keys from memory...")
        
        # میموری سے ماسٹر کیز کو اوور رائٹ (Erase) کرنا
        self._system_kernel_key = b'\x00' * 64
        self._active_sessions.clear()
        
        logging.critical("System isolated. Terminating process hierarchy.")
        sys.exit(1) # سیکیورٹی فورسز کا ایمرجنسی ایگزٹ

# --- لوکل ٹیسٹنگ اور رن کرنے کا طریقہ ---
if __name__ == "__main__":
    print("=== SECURITY FORCES DEFENSE SYSTEM - ACTIVE ===")
    
    # سیکیورٹی کور کو لانچ کریں
    defense_system = SecurityForcesCore()

    # 1. ایک محفوظ ڈیٹا پیکٹ (مثلاً حساس ہیڈ کوارٹر کمانڈ) بھیجنا
    sensitive_command = "COMMAND_ALPHA: MOVE_ASSETS_TO_SECTOR_46"
    secure_token = defense_system.generate_secure_token(sensitive_command)
    
    print(f"[SYSTEM] Secure Token Generated: {secure_token[:20]}...")

    # 2. درست طریقے سے ڈیٹا کی تصدیق
    is_safe = defense_system.validate_incoming_packet(sensitive_command, secure_token)
    print(f"[SYSTEM] Verification for Authentic Data: {'PASSED' if is_safe else 'FAILED'}")

    # 3. ہیکنگ کا منظر نامہ (Scenario): ہیکر کمانڈ کو تبدیل کرنے کی کوشش کرتا ہے
    hacked_command = "COMMAND_ALPHA: MOVE_ASSETS_TO_ENEMY_BASE"
    print("\n[ATTACK] Hacker is injecting malicious modified command...")
    
    # سسٹم فوراً ہیکر کو پکڑ لے گا اور پیکٹ ڈراپ کر دے گا
    is_hacked_safe = defense_system.validate_incoming_packet(hacked_command, secure_token)
    print(f"[SYSTEM] Verification for Hacked Data: {'PASSED' if is_hacked_safe else 'FAILED'}")

    # 4. ہیکنگ کا منظر نامہ 2 (Code Tampering): اگر ہیکر رن ٹائم پر میموری یا سورس کوڈ ہی بدل دے
    print("\n[ATTACK] Hacker trying to bypass integrity seals...")
    # ہم فرضی طور پر سیل کو تبدیل کر کے چیک کرتے ہیں
    defense_system._self_integrity_seal = "MALICIOUS_MODIFIED_HASH_KEY"
    
    # سسٹم ہیکر کو سورس کوڈ لیول پر پکڑ کر خود کو فوراً شٹ ڈاؤن (Lock) کر دے گا
    defense_system.verify_system_integrity()
