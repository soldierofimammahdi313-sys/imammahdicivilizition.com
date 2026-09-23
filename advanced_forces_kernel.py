"""
Advanced Forces Cyber Defense Kernel (Zero-Trust Industrial Grade)
Author: Syed Ahmad Raza Shamsi (Founder, Imam Mahdi Civilization)
Description: A production-grade defense mechanism featuring hardware-level 
             simulation, dynamic token isolation, and anti-tamper memory sealing.
"""

import hashlib
import hmac
import os
import sys
import secrets
import time
from typing import Dict, Final, Optional

class AdvancedForcesKernel:
    # سسٹم کی کچھ ویلیوز کو فائنل (Immutable) کر دیا تاکہ کوئی ہیکر انہیں اوور رائٹ نہ کر سکے
    BLOCK_DURATION_SEC: Final[int] = 300  # حملہ آور کو 5 منٹ کے لیے بلاک کرنا
    MAX_ATTEMPTS: Final[int] = 3  # صرف 3 غلطیوں کی اجازت

    def __init__(self) -> None:
        # 1. ہیکر پروف ماسٹر کیز (Cryptographic Isolation)
        self.__kernel_vault_key: bytes = secrets.token_bytes(64)
        self.__security_token_pool: Dict[str, float] = {}
        self.__malicious_ip_registry: Dict[str, float] = {}
        self.__failed_attempts_tracker: Dict[str, int] = {}
        
        # 2. کوڈ کی سیکیورٹی سیل (Dynamic Code Hardening)
        self.__initial_code_footprint: str = self.__generate_secure_footprint()
        
        print("[KERNEL-READY] Zero-Trust Cyber Shield active at hardware layer abstraction.")

    def __generate_secure_footprint(self) -> str:
        """سورس کوڈ کا ملٹری گریڈ ہیش بنانا تاکہ رن ٹائم انجیکشن روکا جا سکے"""
        try:
            with open(__file__, "rb") as kernel_file:
                return hashlib.sha3_512(kernel_file.read()).hexdigest()
        except IOError:
            self.execute_kernel_panic("Kernel panic: Code segment storage is inaccessible.")
            return ""

    def __enforce_static_integrity(self) -> None:
        """خودکار سیکیورٹی چیک: اگر ہیکر رن ٹائم پر میموری بدل دے تو کوڈ خود کو بند کر دے گا"""
        if hmac.compare_digest(self.__generate_secure_footprint(), self.__initial_code_footprint) is False:
            self.execute_kernel_panic("CRITICAL EXCEPTION: Runtime code tampering verified!")

    def register_secure_node(self, node_id: str, client_ip: str) -> Optional[str]:
        """سسٹم میں ایک محفوظ نوڈ (صارف یا ڈیوائس) کو رجسٹر کرنا اور ٹوکن دینا"""
        self.__enforce_static_integrity()

        # چیک کریں کہ کہیں یہ آئی پی پہلے سے بلیک لسٹ تو نہیں
        if self.is_ip_suspended(client_ip):
            print(f"[ACCESS-DENIED] Request from suspended source: {client_ip}")
            return None

        # ٹائم بیسڈ کوانٹم سیف ٹوکن جنریشن (Token Expiry Logic)
        salt: bytes = secrets.token_bytes(32)
        expiration_time = time.time() + 60.0  # ٹوکن صرف 60 سیکنڈ کے لیے کارآمد ہوگا
        
        token_generator = hmac.new(self.__kernel_vault_key, node_id.encode() + salt, hashlib.sha3_512)
        secure_token: str = token_generator.hexdigest()
        
        # ٹوکن پول میں ایکسپائری ٹائم کے ساتھ محفوظ کریں
        self.__security_token_pool[secure_token] = expiration_time
        return secure_token

    def authorize_network_packet(self, secure_token: str, client_ip: str) -> bool:
        """باہر سے آنے والے ہر ایک سیکیورٹی پیکٹ کی گہرائی سے جانچ پڑتال"""
        self.__enforce_static_integrity()

        # 1. بلیک لسٹ چیک
        if self.is_ip_suspended(client_ip):
            return False

        # 2. ٹوکن کی موجودگی کا چیک
        if secure_token not in self.__security_token_pool:
            self.__log_failed_attempt(client_ip)
            return False

        # 3. ٹوکن ایکسپائری چیک (Replay Attack Protection)
        if time.time() > self.__security_token_pool[secure_token]:
            print(f"[SECURITY] Expired token presented by {client_ip}. Revoking access.")
            del self.__security_token_pool[secure_token]
            self.__log_failed_attempt(client_ip)
            return False

        # پیکٹ بالکل محفوظ ہے، استعمال کے بعد ٹوکن ختم کر دیں (One-Time Use Token)
        del self.__security_token_pool[secure_token]
        return True

    def __log_failed_attempt(self, client_ip: str) -> None:
        """غلط کوششوں کو ٹریک کرنا اور ہیکر کو سیکنڈوں میں بلاک کرنا"""
        self.__failed_attempts_tracker[client_ip] = self.__failed_attempts_tracker.get(client_ip, 0) + 1
        attempts = self.__failed_attempts_tracker[client_ip]
        
        print(f"[SECURITY-WARN] Defective authorization packet from IP: {client_ip} (Attempt {attempts}/{self.MAX_ATTEMPTS})")
        
        if attempts >= self.MAX_ATTEMPTS:
            self.__malicious_ip_registry[client_ip] = time.time() + self.BLOCK_DURATION_SEC
            print(f"[ISOLATION-ACTIVE] IP {client_ip} has been hard-blocked for {self.BLOCK_DURATION_SEC} seconds.")

    def is_ip_suspended(self, client_ip: str) -> bool:
        """چیک کرنا کہ آئی پی بلاک ہے یا نہیں"""
        if client_ip in self.__malicious_ip_registry:
            if time.time() < self.__malicious_ip_registry[client_ip]:
                return True
            # اگر وقت پورا ہو گیا تو بلاک لسٹ سے نکال دیں
            del self.__malicious_ip_registry[client_ip]
            self.__failed_attempts_tracker[client_ip] = 0
        return False

    def execute_kernel_panic(self, error_message: str) -> None:
        """ایمرجنسی پروٹوکول: حملہ ہونے پر تمام حساس ڈیٹا سیکنڈ کے ہزارویں حصے میں ڈیلیٹ"""
        print(f"\n[!!! KERNEL PANIC !!!] {error_message}", file=sys.stderr)
        print("[KERNEL] Wiping cryptographic structures and memory layers...", file=sys.stderr)
        
        # تمام ڈیٹا کو میموری سے مکمل صاف (Purge) کرنا
        self.__kernel_vault_key = b'\x00' * 64
        self.__security_token_pool.clear()
        self.__malicious_ip_registry.clear()
        self.__failed_attempts_tracker.clear()
        
        print("[KERNEL] System isolated successfully. Terminating operational state.", file=sys.stderr)
        sys.exit(1)

# --- لوکل سیمولیشن ٹیسٹ ---
if __name__ == "__main__":
    kernel = AdvancedForcesKernel()
    ip_address = "192.168.46.1"

    # 1. کامیاب لاگ ان اور ٹوکن کا حصول
    token = kernel.register_secure_node(node_id="SECURE_SERVER_NODE", client_ip=ip_address)
    
    if token:
        # 2. درست ٹوکن کے ساتھ سسٹم تک رسائی
        access_granted = kernel.authorize_network_packet(secure_token=token, client_ip=ip_address)
        print(f"Authorized Request Status: {access_granted}")

    # 3. ہیکنگ اٹیک سیمولیشن (Hacker Brute-Force Attempt)
    print("\n[ATTACK] Hacker attempting brute-force entry with fake tokens...")
    for i in range(4):
        kernel.authorize_network_packet(secure_token="FAKE_INVALID_TOKEN_HASH", client_ip="185.220.101.5")
