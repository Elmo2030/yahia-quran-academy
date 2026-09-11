import os
import json
import whisper
from pydub import AudioSegment

def process_fatihah():
    print("🚀 بدء تشغيل مصنع بيانات FARAS...")
    
    # تحديد مسارات الملفات
    input_audio = "input/fatihah.mp3" 
    output_audio = "output/001.m4a"
    output_json = "output/001.json"

    # التأكد من وجود مجلد output
    os.makedirs("output", exist_ok=True)

    if not os.path.exists(input_audio):
        print(f"❌ خطأ: لم يتم العثور على الملف الصوتي في المسار {input_audio}")
        print("تأكد من تسمية ملف الشيخ الحصري باسم fatihah.mp3 ووضعه داخل مجلد input")
        return

    # 1. ضغط الملف الصوتي (لتوفير باقات الإنترنت للأطفال)
    print("🎵 جاري ضغط الملف الصوتي ليكون خفيفاً وسريعاً...")
    audio = AudioSegment.from_file(input_audio)
    audio.export(output_audio, format="ipod", bitrate="64k") 
    print("✅ تم ضغط الملف بنجاح: 001.m4a")

    # 2. استخراج التوقيتات بالذكاء الاصطناعي (Whisper)
    print("🧠 جاري استماع الذكاء الاصطناعي للتلاوة لاستخراج التوقيتات (قد يستغرق دقائق)...")
    model = whisper.load_model("base") # نستخدم النموذج الأساسي لسرعة الإنجاز في الـ MVP
    result = model.transcribe(input_audio, language="ar")

    # 3. تجهيز الـ JSON ليطابق قاعدة بيانات Supabase
    timestamps = []
    for index, segment in enumerate(result['segments']):
        timestamps.append({
            "surah": 1,
            "ayah": index + 1, # ترقيم الآيات
            "start_ms": int(segment['start'] * 1000),
            "end_ms": int(segment['end'] * 1000),
            "text": segment['text'].strip()
        })

    # حفظ ملف الـ JSON
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(timestamps, f, ensure_ascii=False, indent=4)
    
    print("✅ تم استخراج التوقيتات بنجاح: 001.json")
    print("🎉 اكتملت العملية! الملفات جاهزة الآن في مجلد output لرفعها على Supabase.")

if __name__ == "__main__":
    process_fatihah()