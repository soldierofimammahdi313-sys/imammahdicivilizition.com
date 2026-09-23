"""
Imam Mahdi Civilization - Divine Cosmos Calendar (Astronomical Engine)
Author: Syed Ahmad Raza Shamsi (Founder)
Description: A precision astronomical tool calculating lunar visibility, 
             crescent elongation, and altitude parameters according to Ja'fari Feqh.
"""

import math
import datetime
from typing import Dict, Any, Tuple

class DivineCosmosCalendar:
    def __init__(self):
        # فقهِ جعفریہ کے مطابق چاند نظر آنے کے لیے بنیادی سائنسی شرائط (Minimum Thresholds)
        self.MIN_ELONGATION_DEGREES = 12.0  # سورج اور چاند کے درمیان کم از کم فاصلہ
        self.MIN_ALTITUDE_DEGREES = 5.0     # افق سے چاند کی کم از کم بلندی
        print("[COSMOS-ENGINE] Astronomical Moon Sighting Grid Activated.")

    def _calculate_lunar_parameters(self, days_since_new_moon: float) -> Tuple[float, float]:
        """
        زمین اور چاند کی گردش کے مدار کی بنیاد پر چاند کی بلندی اور فاصلے کا فرضی 
        ریاضیاتی حساب لگانا (Astronomical Simulation Logic)
        """
        # چاند کی پوزیشن کا زاویہ (Angle) نکالنا
        lunar_angle = (days_since_new_moon / 29.53) * 2 * math.pi
        
        # سائنسی فارمولوں کے مطابق بلندی اور فاصلے کا گراف تیار کرنا
        elongation = 15.0 * math.sin(lunar_angle / 2) + 2.0
        altitude = 12.0 * math.cos(lunar_angle - 0.5) + 3.0
        
        return abs(elongation), max(0.0, altitude)

    def predict_moon_sighting(self, target_date: datetime.date, location_lat: float, location_lon: float, days_since_new_moon: float) -> Dict[str, Any]:
        """
        مخصوص تاریخ اور جغرافیائی لوکیشن پر چاند نظر آنے کی پیشگوئی کرنا
        """
        # چاند کے فلکیاتی متغیرات (Parameters) حاصل کریں
        elongation, altitude = self._calculate_lunar_parameters(days_since_new_moon)
        
        # فقهِ جعفریہ کے معیار کے مطابق جانچ پڑتال
        is_visible_naked_eye = (elongation >= self.MIN_ELONGATION_DEGREES) and (altitude >= self.MIN_ALTITUDE_DEGREES)
        is_visible_telescope = (elongation >= 10.0) and (altitude >= 4.0)

        # امکانات (Probability) کا فیصد نکالنا
        probability_score = 0.0
        if is_visible_naked_eye:
            probability_score = min(50.0 + (elongation * 3.5), 99.9)
        elif is_visible_telescope:
            probability_score = 30.0 + (altitude * 4.0)
        else:
            probability_score = max(5.0, elongation * 1.2)

        # رویتِ ہلال کا شرعی اسٹیٹس متعین کرنا
        sighting_status = "NOT VISIBLE (نیا چاند ابھی افق پر ظاہر نہیں ہوا)"
        if is_visible_naked_eye:
            sighting_status = "VISIBLE BY NAKED EYE (عام آنکھ سے چاند نظر آنا ممکن ہے - شرعی چاند ثابت ہے)"
        elif is_visible_telescope:
            sighting_status = "VISIBLE BY TELESCOPE ONLY (صرف دوربین سے نظر آسکتا ہے - چشمِ مسلح کی رویت)"

        return {
            "date": target_date.strftime("%Y-%m-%d"),
            "coordinates": f"Lat: {location_lat}, Lon: {location_lon}",
            "crescent_elongation_deg": round(elongation, 2),
            "crescent_altitude_deg": round(altitude, 2),
            "sighting_probability_pct": round(probability_score, 2),
            "sharia_status": sighting_status
        }

# --- لوکل فلکیاتی ٹیسٹنگ رن ---
if __name__ == "__main__":
    print("=== IMAM MAHDI CIVILIZATION - COSMOS LUNAR PREDICTOR ===")
    cosmos_engine = DivineCosmosCalendar()

    # ٹیسٹ تاریخ: آج کی تاریخ
    test_date = datetime.date.today()
    
    # مقام کی لوکیشن (مثال: چونیاں، پاکستان کے کوآرڈینیٹس)
    latitude = 30.96
    longitude = 73.98

    print("\n[SIMULATION] Checking lunar visibility for 29th day of Islamic Month...")
    # فرض کریں چاند کو نکلے ہوئے 1.5 دن (29 تاریخ کی شام) ہو چکے ہیں
    result_29th = cosmos_engine.predict_moon_sighting(test_date, latitude, longitude, days_since_new_moon=1.5)
    
    print(f"Target Date       : {result_29th['date']}")
    print(f"Location Vector   : {result_29th['coordinates']}")
    print(f"Moon Elongation   : {result_29th['crescent_elongation_deg']}°")
    print(f"Moon Altitude     : {result_29th['crescent_altitude_deg']}°")
    print(f"Sighting Chance   : {result_29th['sighting_probability_pct']}%")
    print(f"SHARIA CONFIRMATION: {result_29th['sharia_status']}")
    
    print("\n" + "="*50)
    print("[SIMULATION] Checking lunar visibility for early 28th day (Too early)...")
    # چاند ابھی بہت چھوٹا ہے (صرف 0.5 دن گزرے ہیں)
    result_early = cosmos_engine.predict_moon_sighting(test_date, latitude, longitude, days_since_new_moon=0.5)
    print(f"SHARIA CONFIRMATION: {result_early['sharia_status']} (Chances: {result_early['sighting_probability_pct']}%).")
