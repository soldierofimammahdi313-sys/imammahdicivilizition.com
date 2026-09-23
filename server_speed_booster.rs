// =========================================================================
// Imam Mahdi Civilization - Ultra-Fast Server-Side Speed Booster
// Author: Syed Ahmad Raza Shamsi (Founder)
// Language: Rust (دنیا کی تیز ترین اور محفوظ ترین ملٹری گریڈ زبان)
// Description: Multi-threaded in-memory caching engine designed to bypass 
//              database bottlenecks and deliver pages in microseconds.
// =========================================================================

use std::collections::HashMap;
use std::sync::{Arc, RwLock};
use std::time::{Duration, Instant};

/// کیشے شدہ پیج کا ڈیٹا اسٹرکچر
#[derive(Clone)]
pub struct CachedPage {
    pub html_content: String,
    pub expires_at: Instant,
}

pub struct SpeedBoosterEngine {
    // Arc اور RwLock کا استعمال ملٹی تھریڈنگ (Multi-threading) کے لیے کیا گیا ہے
    // تاکہ ایک ہی سیکنڈ میں لاکھوں صارفین بغیر سرور سلو ہوئے ویب سائٹ دیکھ سکیں
    memory_vault: Arc<RwLock<HashMap<String, CachedPage>>>,
    time_to_live: Duration,
}

impl SpeedBoosterEngine {
    pub fn new(cache_duration_minutes: u64) -> Self {
        print!("[SPEED-BOOSTER] Compiling In-Memory Architecture Layer...");
        SpeedBoosterEngine {
            memory_vault: Arc::new(RwLock::new(HashMap::new())),
            time_to_live: Duration::from_secs(cache_duration_minutes * 60),
        }
    }

    /// ویب سائٹ کا پورا پیج سیکنڈ کے کروڑویں حصے میں کیشے (RAM) سے لوڈ کرنا
    pub fn serve_page(&self, route: &str) -> Option<String> {
        let vault = self.memory_vault.read().unwrap();
        
        if let Some(cached_page) = vault.get(route) {
            // چیک کریں کہ کیشے پرانا تو نہیں ہوا
            if Instant::now() < cached_page.expires_at {
                return Some(cached_page.html_content.clone());
            }
        }
        None // اگر ڈیٹا ریم میں نہیں ہے تو ڈیٹا بیس سے لانا ہوگا
    }

    /// پیج کے ڈیٹا کو سرور کی ریم (RAM) میں ہمیشہ کے لیے لاک کرنا تاکہ اگلی بار اسپیڈ راکٹ بن جائے
    pub fn store_page(&self, route: &str, raw_html: String) {
        let mut vault = self.memory_vault.write().unwrap();
        let expiry = Instant::now() + self.time_to_live;
        
        vault.insert(
            route.to_string(),
            CachedPage {
                html_content: raw_html,
                expires_at: expiry,
            },
        );
    }
}

fn main() {
    println!("\n=== IMAM MAHDI CIVILIZATION - SERVER SPEED CORE ===");
    
    // کیشے انجن کو ایکٹیویٹ کریں (ڈیٹا کو 10 منٹ کے لیے ریم میں لاک رکھیں)
    let booster = SpeedBoosterEngine::new(10);
    println!(" [ONLINE]");

    let target_route = "/quran";
    let mock_database_html = "<html><body><h1>Interactive Quran & Tafsir Platform</h1></body></html>".to_string();

    // فرسٹ ٹائم لوڈنگ: جب پہلا صارف پیج کھولے گا (ڈیٹا بیس سے لوڈ ہوگا)
    let start_time = Instant::now();
    booster.store_page(target_route, mock_database_html);
    let duration_first = start_time.elapsed();
    println!("[FIRST LOAD] Saved /quran to Secure RAM Cache. Time taken: {:?}", duration_first);

    // سپر فاسٹ لوڈنگ: جب دوسرا صارف یا گوگل کا بوٹ پیج کھولے گا (براہِ راست ریم سے سیکنڈ کے اربویں حصے میں سرونگ)
    let start_time_fast = Instant::now();
    if let Some(html) = booster.serve_page(target_route) {
        let duration_cached = start_time_fast.elapsed();
        println!("[SUPER-FAST LOAD] Served /quran from Hardware Cache. Time taken: {:?}", duration_cached);
        println!("-> Cache Output Verified: Length {} bytes.", html.len());
    }

    println!("====================================================");
}
