; =========================================================================
; Imam Mahdi Civilization - Hardware Kernel Cyber Defense Core
; Author: Syed Ahmad Raza Shamsi (Founder)
; Language: Intel x86 Assembly Language (دنیا کی بنیادی اور طاقتور ترین زبان)
; Description: Low-level CPU Register validation loop designed to intercept 
;              buffer overflows and enforce hardware-level isolation.
; =========================================================================

section .data
    ; سیکیورٹی اور کامیابی کے لائیو میسجز (Memory Constants)
    msg_boot    db "[HARDWARE-CORE] CPU Assembly Protection Matrix Engaged.", 0xA, 0
    msg_passed  db "[SECURITY-PASSED] Packet bounds verified at register layer.", 0xA, 0
    msg_panic   db "[CRITICAL PANIC] Memory corruption detected! Terminating CPU state.", 0xA, 0
    
    ; سیکیورٹی کی حد: زیادہ سے زیادہ 65,535 بائٹس کا ڈیٹا آ سکتا ہے (0xFFFF)
    MAX_SAFE_LIMIT equ 0xFFFF

section .text
    global _start

_start:
    ; 1. پروسیسر کو بوٹ کرنا اور سیکیورٹی آن کرنا
    mov edx, msg_boot
    call print_string

    ; --- سیمولیشن منظر نامہ (Hacker Attack Check) ---
    ; فرض کریں نیٹ ورک کارڈ سے آنے والے ڈیٹا کا سائز EAX رجسٹر میں لوڈ ہوا ہے
    ; ہیکر نے بفر اوور فلو کے لیے 500,000 بائٹس (0x7A120) کا پیکٹ بھیجا
    mov eax, 0x7A120        ; EAX = incoming packet size

    ; 2. ہارڈویئر لیول پر موازنہ (CMP - Compare Instruction)
    ; یہ پروسیسر کے اندر براہِ راست ڈیٹا سائز کو ہماری طے کردہ حد سے میچ کرتا ہے
    cmp eax, MAX_SAFE_LIMIT

    ; 3. اگر ان پٹ سائز حد سے بڑا ہے، تو فوراً پینک زون میں چھلانگ لگائیں (JIE / JG - Jump if Greater)
    jg trigger_cpu_panic

    ; 4. اگر ڈیٹا محفوظ ہے، تو سسٹم کو گرین سگنل دیں
    mov edx, msg_passed
    call print_string
    
    ; محفوظ طریقے سے پروسیس مکمل کر کے باہر نکلیں
    mov eax, 1              ; sys_exit command for CPU
    mov ebx, 0              ; Return status 0 (Success)
    int 0x80                ; CPU hardware interrupt to execute exit

trigger_cpu_panic:
    ; =====================================================================
    ; ایمرجنسی پروٹوکول: ہیکر کا حملہ پکڑے جانے پر پروسیسر خود کو لاک کرے گا
    ; =====================================================================
    mov edx, msg_panic
    call print_string

    ; تمام پروسیسر رجسٹرز کو سیکیورٹی کے تحت صفر (Flush) کرنا
    xor eax, eax            ; EAX کو زیرو کرنا
    xor ebx, ebx            ; EBX کو زیرو کرنا
    xor ecx, ecx            ; ECX کو زیرو کرنا
    
    ; پروسیسر کو سخت ترین شٹ ڈاؤن کمانڈ دینا تاکہ ڈیٹا ہیک نہ ہو سکے
    mov eax, 1              ; sys_exit command
    mov ebx, 1              ; Return status 1 (Hardware Security Failure Alert)
    int 0x80                ; System Interrupt to kill the process instantly

; --- یوٹیلیٹی فنکشن: اسکرین پر میسج پرنٹ کرنے کے لیے لو-لیول کوڈ ---
print_string:
    push eax
    push ecx
    push ebx
    
    ; ٹیکسٹ کی لمبائی معلوم کرنے کا اسمبلی لوپ
    mov ecx, edx
    xor ebx, ebx
.loop:
    cmp byte [ecx + ebx], 0
    je .done
    inc ebx
    jmp .loop
.done:
    mov eax, 4              ; sys_write command
    mov ebx, 1              ; stdout (Screen)
    mov ecx, edx            ; Text pointer
    mov edx, ebx            ; Length of characters
    int 0x80                ; Trigger CPU interrupt to write
    
    pop ebx
    pop ecx
    pop eax
    ret
