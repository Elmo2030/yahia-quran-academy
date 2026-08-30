# Seerah artwork

Drop the station cover and the five story pictures in here, named exactly as
below. The filenames match the story slugs in
`client/src/content/seerah.ts`, which is what the pages look up — so the name
is what puts each picture on the right story. JPEG, landscape, ideally around
1600×893 (16:9).

| file                  | story                | scene |
| --------------------- | -------------------- | ----- |
| `cover.jpg`           | station cover        | any of the five, or a scene of its own |
| `birth-of-light.jpg`  | يوم أشرقت مكة        | بيت مكي حجري يشع منه نور ذهبي تحت سماء مرصعة بالنجوم |
| `desert-breeze.jpg`   | هواء الصحراء النقي   | خيمة صحراوية ينمو حولها العشب والزهور، وبجوارها وعاء حليب |
| `grandfather-love.jpg`| في ظل الكعبة         | بساط أحمر وذهبي مفروش في ظل الكعبة |
| `uncle-home.jpg`      | بيت العم الحنون      | بيت حجري دافئ، نار هادئة ووعاء طعام فخاري |
| `little-shepherd.jpg` | الراعي الصغير        | عصا راعٍ تستند إلى صخرة على تل أخضر، وأغنام في الخلفية |

`cover.jpg` is currently a copy of `birth-of-light.jpg` — replace it whenever
a dedicated station cover exists.

Until a file lands, that story falls back to the drawn placeholder — nothing
breaks, the picture is simply missing.
