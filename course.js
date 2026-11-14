const COURSE = {
  tracks: [
    { id: "html", title: "HTML", text: "اسکلت صفحه، از اولین تگ تا یک صفحه کامل" },
    { id: "css", title: "CSS", text: "رنگ، فاصله و چیدمان، از ساده تا حرفه‌ای" },
    { id: "python", title: "Python", text: "از یک جمله تا تابع و کلاس. اجرا داخل همین صفحه" },
    { id: "sql", title: "SQL", text: "جدول، MySQL و PostgreSQL" }
  ],
  seed: [
    "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, city TEXT, score INTEGER);",
    "INSERT INTO students (id, name, city, score) VALUES (1, 'نیایش', 'تهران', 19);",
    "INSERT INTO students (id, name, city, score) VALUES (2, 'سارا', 'اصفهان', 15);",
    "INSERT INTO students (id, name, city, score) VALUES (3, 'کیان', 'تهران', 12);",
    "INSERT INTO students (id, name, city, score) VALUES (4, 'هستی', 'شیراز', 17);",
    "CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT, student_id INTEGER);",
    "INSERT INTO courses (id, title, student_id) VALUES (1, 'Python', 1);",
    "INSERT INTO courses (id, title, student_id) VALUES (2, 'وب', 1);",
    "INSERT INTO courses (id, title, student_id) VALUES (3, 'وب', 2);",
    "INSERT INTO courses (id, title, student_id) VALUES (4, 'داده', 4);"
  ].join("\n"),
  sample: {
    students: {
      columns: ["id", "name", "city", "score"],
      rows: [[1, "نیایش", "تهران", 19], [2, "سارا", "اصفهان", 15], [3, "کیان", "تهران", 12], [4, "هستی", "شیراز", 17]]
    },
    courses: {
      columns: ["id", "title", "student_id"],
      rows: [[1, "Python", 1], [2, "وب", 1], [3, "وب", 2], [4, "داده", 4]]
    }
  },
  lessons: [
    {
      id: "html-1", track: "html", level: "شروع", title: "اسکلت صفحه",
      paragraphs: [
        "هر صفحه وب یک سند HTML است. مرورگر این سند را می‌خواند و همان را نشان می‌دهد.",
        "doctype می‌گوید این یک صفحه امروزی است. html زبان صفحه را نگه می‌دارد، head اطلاعات پنهان مثل عنوان زبانه است، و body همان چیزی است که دیده می‌شود.",
        "عنوان اصلی صفحه را با h1 می‌نویسیم. در هر صفحه یک h1 کافی است."
      ],
      example: "<h1>سلام نیایش</h1>",
      task: "داخل body یک h1 بگذار که متنش دقیقاً «سلام نیایش» باشد.",
      hint: "تگ را باز کن، متن را بنویس، بعد ببند: <h1>سلام نیایش</h1>",
      starter: "<!DOCTYPE html>\n<html lang=\"fa\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>درس</title>\n</head>\n<body>\n\n</body>\n</html>\n",
      solution: "<!DOCTYPE html>\n<html lang=\"fa\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>درس</title>\n</head>\n<body>\n  <h1>سلام نیایش</h1>\n</body>\n</html>\n",
      kind: "html",
      rules: [{ sel: "h1", text: "سلام نیایش", hint: "یک h1 با متن سلام نیایش لازم است." }]
    },
    {
      id: "html-2", track: "html", level: "شروع", title: "پاراگراف",
      paragraphs: [
        "متن معمولی را در p می‌گذاریم. h1 فریاد عنوان است و p حرف زدن عادی.",
        "اگر چند جمله داری، هر فکر را یک پاراگراف کن تا صفحه نفس بکشد."
      ],
      example: "<p>این اولین تمرین من است.</p>",
      task: "یک پاراگراف بساز که کلمه «تمرین» داخلش باشد.",
      hint: "از <p> و </p> استفاده کن و کلمه تمرین را در متن بیاور.",
      starter: "<p></p>\n",
      solution: "<p>این تمرین من است.</p>\n",
      kind: "html",
      rules: [{ sel: "p", text: "تمرین", hint: "یک p لازم است که کلمه تمرین را داشته باشد." }]
    },
    {
      id: "html-3", track: "html", level: "راه افتادن", title: "لینک",
      paragraphs: [
        "لینک با تگ a ساخته می‌شود. href آدرس مقصد است و متن بین تگ، چیزی است که دیده می‌شود.",
        "اگر href را فراموش کنی، متن فقط یک نوشته معمولی است و جایی نمی‌رود."
      ],
      example: "<a href=\"https://example.com\">درس</a>",
      task: "یک لینک بساز که href آن با https:// شروع شود و متن قابل‌دیدنش «درس» باشد.",
      hint: "href را داخل تگ باز بنویس و متن درس را بین تگ‌ها بگذار.",
      starter: "<a href=\"\"></a>\n",
      solution: "<a href=\"https://example.com\">درس</a>\n",
      kind: "html",
      rules: [{ sel: "a[href^='https://']", text: "درس", hint: "یک a با href که با https:// شروع شود و متن درس لازم است." }]
    },
    {
      id: "html-4", track: "html", level: "راه افتادن", title: "فهرست",
      paragraphs: [
        "فهرست بی‌شماره ul است و هر موردش یک li. مرورگر خودش نقطه‌ها را می‌گذارد.",
        "فهرست شماره‌دار ol است. وقتی ترتیب مهم است، مثل قدم‌های یک کار، از ol استفاده کن."
      ],
      example: "<ul>\n  <li>HTML</li>\n  <li>Python</li>\n</ul>",
      task: "یک ul بساز که حداقل دو li داشته باشد.",
      hint: "ul را باز کن، دو بار li بنویس، بعد ul را ببند.",
      starter: "<ul>\n\n</ul>\n",
      solution: "<ul>\n  <li>HTML</li>\n  <li>Python</li>\n</ul>\n",
      kind: "html",
      rules: [{ sel: "ul li", count: 2, hint: "داخل ul حداقل دو li لازم است." }]
    },
    {
      id: "html-5", track: "html", level: "راه افتادن", title: "تصویر",
      paragraphs: [
        "تصویر با img می‌آید. این تگ بسته ندارد. src آدرس فایل است.",
        "alt متن جایگزین است. اگر عکس باز نشود، یا کسی صفحه را بشنود، alt می‌گوید عکس چه بوده. خالی رهایش نکن."
      ],
      example: "<img src=\"flower.jpg\" alt=\"گل صورتی\">",
      task: "یک img بگذار که alt خالی نباشد.",
      hint: "هم src داشته باش هم alt با یک توضیح کوتاه.",
      starter: "<img src=\"flower.jpg\" alt=\"\">\n",
      solution: "<img src=\"flower.jpg\" alt=\"گل صورتی\">\n",
      kind: "html",
      rules: [{ sel: "img[alt]:not([alt=''])", hint: "img باید alt پر داشته باشد." }]
    },
    {
      id: "html-6", track: "html", level: "قشنگ", title: "جدول",
      paragraphs: [
        "جدول برای داده ردیفی است، نه برای چیدن صفحه. table جدول است، tr ردیف، th عنوان ستون و td خانه معمولی.",
        "عنوان ستون را th بگذار تا معلوم باشد آن خانه، اسم ستون است نه یک داده."
      ],
      example: "<table>\n  <tr><th>نام</th></tr>\n  <tr><td>نیایش</td></tr>\n</table>",
      task: "جدولی بساز که یک th با متن «نام» و حداقل یک td داشته باشد.",
      hint: "یک ردیف برای th و یک ردیف برای td.",
      starter: "<table>\n  <tr><th></th></tr>\n  <tr><td></td></tr>\n</table>\n",
      solution: "<table>\n  <tr><th>نام</th></tr>\n  <tr><td>نیایش</td></tr>\n</table>\n",
      kind: "html",
      rules: [
        { sel: "th", text: "نام", hint: "یک th با متن نام لازم است." },
        { sel: "td", hint: "حداقل یک td لازم است." }
      ]
    },
    {
      id: "html-7", track: "html", level: "قشنگ", title: "فرم",
      paragraphs: [
        "فرم جایی است که کاربر چیزی می‌نویسد. form دور آن را می‌گیرد، input جعبه نوشتن است و button دکمه.",
        "type=\"text\" یعنی یک خط متن. بدون دکمه، کاربر راهی برای فرستادن ندارد."
      ],
      example: "<form>\n  <input type=\"text\">\n  <button type=\"button\">بفرست</button>\n</form>",
      task: "یک form بساز که داخلش یک input از نوع text و یک button باشد.",
      hint: "input را با type=\"text\" بنویس و یک button هم کنارش بگذار.",
      starter: "<form>\n\n</form>\n",
      solution: "<form>\n  <input type=\"text\">\n  <button type=\"button\">بفرست</button>\n</form>\n",
      kind: "html",
      rules: [
        { sel: "form input[type='text']", hint: "داخل form یک input با type=text لازم است." },
        { sel: "form button", hint: "داخل form یک button لازم است." }
      ]
    },
    {
      id: "html-8", track: "html", level: "حرفه‌ای", title: "صفحه معنایی",
      paragraphs: [
        "صفحه حرفه‌ای فقط تگ پشت تگ نیست. header بالای صفحه است، main محتوای اصلی، و footer پایین صفحه.",
        "این نام‌ها به مرورگر و به آدم بعدی می‌گویند هر بخش چه نقشی دارد. div همه‌کاره است، ولی وقتی نقش را می‌دانی از اسم درست استفاده کن.",
        "یک صفحه کامل یعنی اسکلت، عنوان، متن، و این سه بخش."
      ],
      example: "<header><h1>کلاس</h1></header>\n<main><p>درس امروز</p></main>\n<footer><p>تمام</p></footer>",
      task: "header و main و footer را بساز. داخل header یک h1 باشد.",
      hint: "سه بخش را جدا بنویس و h1 را فقط داخل header بگذار.",
      starter: "<header>\n\n</header>\n<main>\n\n</main>\n<footer>\n\n</footer>\n",
      solution: "<header>\n  <h1>کلاس نیایش</h1>\n</header>\n<main>\n  <p>درس امروز</p>\n</main>\n<footer>\n  <p>تمام</p>\n</footer>\n",
      kind: "html",
      rules: [
        { sel: "header", hint: "header لازم است." },
        { sel: "header h1", hint: "h1 باید داخل header باشد." },
        { sel: "main", hint: "main لازم است." },
        { sel: "footer", hint: "footer لازم است." }
      ]
    },
    {
      id: "css-1", track: "css", level: "شروع", title: "رنگ متن",
      paragraphs: [
        "HTML می‌گوید چه چیزی در صفحه هست. CSS می‌گوید چه شکلی باشد.",
        "یک قانون سه تکه دارد: انتخاب‌گر، ویژگی، مقدار. .t یعنی هر چیزی که کلاس t دارد. color رنگ متن است.",
        "پیش‌نمایش همین‌جا، زیر کدت، ساخته می‌شود."
      ],
      example: ".t {\n  color: #b83266;\n}",
      task: "رنگ متن .t را #b83266 بگذار.",
      hint: "داخل .t بنویس color: #b83266;",
      starter: ".t {\n  \n}\n",
      solution: ".t {\n  color: #b83266;\n}\n",
      kind: "css",
      fixture: "<p class=\"t\">نیایش</p>",
      styles: [{ selector: ".t", prop: "color", equals: "rgb(184, 50, 102)", hint: "color عنصر .t باید #b83266 باشد." }]
    },
    {
      id: "css-2", track: "css", level: "شروع", title: "پس‌زمینه و فاصله",
      paragraphs: [
        "background-color رنگ پشت عنصر است. padding فاصله داخل کادر است، بین متن و لبه.",
        "margin فاصله بیرون کادر است. اگر متن به لبه چسبیده، padding کم داری نه margin."
      ],
      example: ".box {\n  background-color: #ffc9db;\n  padding: 20px;\n}",
      task: "برای .box پس‌زمینه #ffc9db و padding برابر ۲۰ پیکسل بگذار.",
      hint: "هر دو ویژگی را داخل .box بنویس.",
      starter: ".box {\n  \n}\n",
      solution: ".box {\n  background-color: #ffc9db;\n  padding: 20px;\n}\n",
      kind: "css",
      fixture: "<div class=\"box\">سلام</div>",
      styles: [
        { selector: ".box", prop: "backgroundColor", equals: "rgb(255, 201, 219)", hint: "پس‌زمینه باید #ffc9db باشد." },
        { selector: ".box", prop: "paddingTop", equals: "20px", hint: "padding باید ۲۰ پیکسل باشد." }
      ]
    },
    {
      id: "css-3", track: "css", level: "راه افتادن", title: "گوشه نرم",
      paragraphs: [
        "border-radius گوشه‌ها را گرد می‌کند. عدد بزرگ‌تر، گردتر.",
        "یک کارت دوست‌داشتنی معمولاً گوشه نرم، کمی padding و یک رنگ آرام دارد. هنوز سراغ چیدمان نرفته‌ایم."
      ],
      example: ".card {\n  border-radius: 16px;\n}",
      task: "گوشه .card را ۱۶ پیکسل گرد کن.",
      hint: "border-radius: 16px;",
      starter: ".card {\n  \n}\n",
      solution: ".card {\n  border-radius: 16px;\n}\n",
      kind: "css",
      fixture: "<div class=\"card\">کارت</div>",
      styles: [{ selector: ".card", prop: "borderTopLeftRadius", equals: "16px", hint: "border-radius باید ۱۶ پیکسل باشد." }]
    },
    {
      id: "css-4", track: "css", level: "راه افتادن", title: "اندازه نوشته",
      paragraphs: [
        "font-size اندازه متن است. px یعنی پیکسل و برای شروع روشن است.",
        "عنوان را بزرگ‌تر از متن معمولی بگذار تا چشم بداند از کجا شروع کند."
      ],
      example: "h1 {\n  font-size: 32px;\n}",
      task: "اندازه h1 را ۳۲ پیکسل کن.",
      hint: "انتخاب‌گر h1 است، نه یک کلاس.",
      starter: "h1 {\n  \n}\n",
      solution: "h1 {\n  font-size: 32px;\n}\n",
      kind: "css",
      fixture: "<h1>عنوان</h1>",
      styles: [{ selector: "h1", prop: "fontSize", equals: "32px", hint: "font-size عنوان باید ۳۲ پیکسل باشد." }]
    },
    {
      id: "css-5", track: "css", level: "قشنگ", title: "Flex",
      paragraphs: [
        "display: flex فرزندان یک عنصر را در یک ردیف می‌چیند. این ابزار اصلی چیدمان امروزی است.",
        "صفحه را با جدول نچین. جدول برای داده است و flex برای چیدمان."
      ],
      example: ".row {\n  display: flex;\n}",
      task: "کلاس .row را flex کن تا فرزندانش کنار هم بنشینند.",
      hint: "display: flex;",
      starter: ".row {\n  \n}\n",
      solution: ".row {\n  display: flex;\n}\n",
      kind: "css",
      fixture: "<div class=\"row\"><span>یک</span><span>دو</span></div>",
      styles: [{ selector: ".row", prop: "display", equals: "flex", hint: ".row باید display: flex داشته باشد." }]
    },
    {
      id: "css-6", track: "css", level: "قشنگ", title: "وسط‌چین با Flex",
      paragraphs: [
        "justify-content جای فرزندان را روی محور اصلی تنظیم می‌کند. center یعنی وسط.",
        "align-items روی محور عمودی است. اگر هر دو center باشند، محتوا هم افقی و هم عمودی وسط کادر می‌نشیند.",
        "برای اینکه وسط‌چین دیده شود، خود کادر باید ارتفاع داشته باشد."
      ],
      example: ".stage {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 120px;\n}",
      task: ".stage را flex کن، justify-content و align-items را center بگذار و height را ۱۲۰ پیکسل کن.",
      hint: "هر چهار ویژگی را بنویس.",
      starter: ".stage {\n  \n}\n",
      solution: ".stage {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 120px;\n}\n",
      kind: "css",
      fixture: "<div class=\"stage\"><span>وسط</span></div>",
      styles: [
        { selector: ".stage", prop: "display", equals: "flex", hint: "display باید flex باشد." },
        { selector: ".stage", prop: "justifyContent", equals: "center", hint: "justify-content باید center باشد." },
        { selector: ".stage", prop: "alignItems", equals: "center", hint: "align-items باید center باشد." },
        { selector: ".stage", prop: "height", equals: "120px", hint: "height باید ۱۲۰ پیکسل باشد." }
      ]
    },
    {
      id: "css-7", track: "css", level: "حرفه‌ای", title: "Grid",
      paragraphs: [
        "grid برای صفحه‌ای است که هم ردیف می‌خواهد هم ستون. flex یک جهت است. grid یک جدول نامرئی از خانه‌هاست.",
        "grid-template-columns: 1fr 1fr یعنی دو ستون برابر. fr واحد سهم است، نه پیکسل."
      ],
      example: ".g {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}",
      task: ".g را grid کن و دو ستون برابر با 1fr 1fr به آن بده.",
      hint: "display: grid و grid-template-columns: 1fr 1fr;",
      starter: ".g {\n  \n}\n",
      solution: ".g {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n",
      kind: "css",
      fixture: "<div class=\"g\"><div>راست</div><div>چپ</div></div>",
      styles: [
        { selector: ".g", prop: "display", equals: "grid", hint: "display باید grid باشد." },
        { selector: ".g", prop: "gridTemplateColumns", twoTracks: true, hint: "باید دو ستون داشته باشد." }
      ]
    },
    {
      id: "css-8", track: "css", level: "حرفه‌ای", title: "صفحه واکنش‌گرا و کارت",
      paragraphs: [
        "موبایل باریک است و دسکتاپ پهن. @media می‌گوید اگر عرض صفحه از حدی کمتر بود، قانون دیگری اعمال شود.",
        "یک کارت حرفه‌ای این‌ها را با هم دارد: رنگ، گوشه نرم، فاصله داخلی، و یک رسانه برای صفحه کوچک.",
        "بررسی این درس به متن کدت نگاه می‌کند: باید .card و padding و یک @media با max-width داشته باشی."
      ],
      example: ".card {\n  padding: 16px;\n}\n@media (max-width: 600px) {\n  .card { padding: 10px; }\n}",
      task: "برای .card یک padding بنویس و یک @media با max-width هم اضافه کن.",
      hint: "هم قانون عادی .card را بنویس هم بلوک @media (max-width: ...).",
      starter: ".card {\n  \n}\n",
      solution: ".card {\n  padding: 16px;\n  background: #ff85ad;\n  border-radius: 16px;\n}\n@media (max-width: 600px) {\n  .card { padding: 10px; }\n}\n",
      kind: "css",
      fixture: "<div class=\"card\">کارت</div>",
      sourceIncludes: [".card", "padding", "@media", "max-width"],
      styles: []
    },
    {
      id: "py-1", track: "python", level: "شروع", title: "چاپ",
      paragraphs: [
        "Python همین‌جا داخل همین صفحه اجرا می‌شود. لازم نیست اول چیزی نصب کنی. دکمه بررسی، برنامه‌ات را واقعاً اجرا می‌کند.",
        "print چیزی را در خروجی می‌نویسد. متن را داخل نقل‌قول می‌گذاریم تا Python بداند این داده است نه دستور."
      ],
      example: "print(\"سلام نیایش\")",
      task: "برنامه‌ای بنویس که دقیقاً این را چاپ کند: سلام نیایش",
      hint: "print(\"سلام نیایش\")",
      starter: "print(\"\")\n",
      solution: "print(\"سلام نیایش\")\n",
      kind: "python",
      expect: "سلام نیایش"
    },
    {
      id: "py-2", track: "python", level: "شروع", title: "متغیر",
      paragraphs: [
        "متغیر یک اسم برای یک مقدار است. name = \"نیایش\" یعنی از این به بعد name همان نیایش است.",
        "اول مقدار را در متغیر بگذار، بعد همان متغیر را چاپ کن. اگر نقل‌قول را دور اسم متغیر بگذاری، خود کلمه چاپ می‌شود نه مقدارش."
      ],
      example: "name = \"نیایش\"\nprint(name)",
      task: "متغیری به نام name بساز که مقدارش نیایش باشد و همان را چاپ کن.",
      hint: "نقل‌قول دور مقدار است، نه دور name در print.",
      starter: "name = \"\"\n",
      solution: "name = \"نیایش\"\nprint(name)\n",
      kind: "python",
      expect: "نیایش"
    },
    {
      id: "py-3", track: "python", level: "راه افتادن", title: "حساب",
      paragraphs: [
        "عدد نقل‌قول نمی‌خواهد. 2 + 3 عدد است. \"2\" + \"3\" چسباندن متن است و می‌شود 23.",
        "عملگرها: + جمع، - تفریق، * ضرب، / تقسیم، // تقسیم صحیح، % باقی‌مانده."
      ],
      example: "print(7 * 6)",
      task: "حاصل ۷ ضربدر ۶ را چاپ کن. باید عدد ۴۲ دیده شود.",
      hint: "print(7 * 6) و دور عدد نقل‌قول نگذار.",
      starter: "print(0)\n",
      solution: "print(7 * 6)\n",
      kind: "python",
      expect: "42"
    },
    {
      id: "py-4", track: "python", level: "راه افتادن", title: "شرط",
      paragraphs: [
        "if یک دوراهی است. اگر شرط درست باشد، بلوک زیرش اجرا می‌شود. else راه دیگر است.",
        "بلوک Python با تورفتگی ساخته می‌شود. خط زیر if باید فاصله داشته باشد. دونقطه آخر خط if را فراموش نکن.",
        "در این تمرین متغیر score از قبل ۱۶ است. تو فقط شرط را بنویس."
      ],
      example: "if score >= 10:\n    print(\"قبول\")\nelse:\n    print(\"مردود\")",
      task: "اگر score بزرگ‌تر یا مساوی ۱۰ بود «قبول» را چاپ کن، وگرنه «مردود».",
      hint: "چون score این‌جا ۱۶ است، خروجی باید قبول باشد. تورفتگی خط print مهم است.",
      starter: "if score >= 10:\n    print(\"قبول\")\n",
      solution: "if score >= 10:\n    print(\"قبول\")\nelse:\n    print(\"مردود\")\n",
      kind: "python",
      prelude: "score = 16\n",
      expect: "قبول"
    },
    {
      id: "py-5", track: "python", level: "راه افتادن", title: "حلقه",
      paragraphs: [
        "for یک کار را برای هر عضو یک دنباله تکرار می‌کند. range(1, 4) یعنی ۱ و ۲ و ۳. عدد آخر داخل محدوده نیست.",
        "while هم تکرار است، ولی تا وقتی شرط درست باشد. اگر فراموش کنی متغیر را جلو ببری، حلقه تمام نمی‌شود. این صفحه اگر حلقه بیش از حد طول بکشد خودش متوقفش می‌کند."
      ],
      example: "for n in range(1, 4):\n    print(n)",
      task: "با for و range عددهای ۱ و ۲ و ۳ را هر کدام در یک خط چاپ کن.",
      hint: "range(1, 4) عدد ۴ را چاپ نمی‌کند.",
      starter: "for n in range(1, 4):\n    print(n)\n",
      solution: "for n in range(1, 4):\n    print(n)\n",
      kind: "python",
      expect: "1\n2\n3"
    },
    {
      id: "py-6", track: "python", level: "قشنگ", title: "لیست",
      paragraphs: [
        "لیست چند مقدار است که ترتیب دارند. با کروشه ساخته می‌شود: nums = [2, 4, 6]",
        "sum جمع اعضا را می‌دهد. len تعدادشان را. عضو اول اندیس ۰ است، نه ۱."
      ],
      example: "nums = [2, 4, 6]\nprint(sum(nums))",
      task: "لیستی از ۲ و ۴ و ۶ بساز و جمعش را چاپ کن.",
      hint: "خروجی باید ۱۲ باشد.",
      starter: "nums = []\n",
      solution: "nums = [2, 4, 6]\nprint(sum(nums))\n",
      kind: "python",
      expect: "12"
    },
    {
      id: "py-7", track: "python", level: "قشنگ", title: "تابع",
      paragraphs: [
        "تابع یک کار با اسم است. def آن را می‌سازد و return نتیجه را برمی‌گرداند. print فقط نشان می‌دهد، return مقدار را به کسی که صدا زده پس می‌دهد.",
        "این‌جا بعد از کد تو، خود کلاس double(6) را صدا می‌زند. تو فقط تابع را بنویس."
      ],
      example: "def double(n):\n    return n * 2",
      task: "تابعی به نام double بنویس که عدد را دو برابر کند و برگرداند.",
      hint: "return n * 2 و تورفتگی زیر def.",
      starter: "def double(n):\n    pass\n",
      solution: "def double(n):\n    return n * 2\n",
      kind: "python",
      append: "\nprint(double(6))\n",
      expect: "12"
    },
    {
      id: "py-8", track: "python", level: "قشنگ", title: "دیکشنری",
      paragraphs: [
        "دیکشنری مقدار را با اسم نگه می‌دارد، نه با شماره. info[\"city\"] مقدار کلید city است.",
        "کلیدها معمولاً رشته‌اند. اگر کلیدی نباشد، Python خطا می‌دهد. برای همین اسم کلید را دقیق بنویس."
      ],
      example: "info = {\"name\": \"نیایش\", \"city\": \"تهران\"}\nprint(info[\"city\"])",
      task: "دیکشنری info را با کلیدهای name و city بساز. name برابر نیایش و city برابر تهران باشد. بعد city را چاپ کن.",
      hint: "خروجی باید تهران باشد.",
      starter: "info = {}\n",
      solution: "info = {\"name\": \"نیایش\", \"city\": \"تهران\"}\nprint(info[\"city\"])\n",
      kind: "python",
      expect: "تهران"
    },
    {
      id: "py-9", track: "python", level: "حرفه‌ای", title: "رشته قالب",
      paragraphs: [
        "وقتی متن و متغیر را قاطی می‌کنی، f-string تمیزترین راه است. قبل از نقل‌قول یک f بگذار و متغیر را داخل ابرو بنویس.",
        "در این تمرین name از قبل نیایش است. تو فقط چاپ را بنویس."
      ],
      example: "print(f\"سلام {name}\")",
      task: "با f-string دقیقاً «سلام نیایش» را چاپ کن. متغیر name آماده است.",
      hint: "print(f\"سلام {name}\")",
      starter: "print(\"\")\n",
      solution: "print(f\"سلام {name}\")\n",
      kind: "python",
      prelude: "name = \"نیایش\"\n",
      expect: "سلام نیایش"
    },
    {
      id: "py-10", track: "python", level: "حرفه‌ای", title: "کلاس",
      paragraphs: [
        "کلاس نقشه یک نوع شیء است. __init__ هنگام ساختن اجرا می‌شود و self خود همان شیء است.",
        "متد یک تابع داخل کلاس است و همیشه self را به‌عنوان آرگومان اول می‌گیرد. وقتی صدا می‌زنی، self را خودت نمی‌نویسی.",
        "این درس آخرین پله شروع Python است: داده و رفتار در یک جا."
      ],
      example: "class Cat:\n    def __init__(self, name):\n        self.name = name\n    def hello(self):\n        return \"سلام \" + self.name\n\nprint(Cat(\"نیایش\").hello())",
      task: "کلاس Cat را با __init__ و متد hello بنویس تا Cat(\"نیایش\").hello() بشود «سلام نیایش». چاپ را خودت هم بنویس.",
      hint: "return \"سلام \" + self.name و بین سلام و اسم یک فاصله بگذار.",
      starter: "class Cat:\n    def __init__(self, name):\n        self.name = name\n    def hello(self):\n        return \"\"\n",
      solution: "class Cat:\n    def __init__(self, name):\n        self.name = name\n    def hello(self):\n        return \"سلام \" + self.name\n\nprint(Cat(\"نیایش\").hello())\n",
      kind: "python",
      expect: "سلام نیایش"
    },
    {
      id: "sql-1", track: "sql", level: "شروع", title: "جدول و SELECT",
      paragraphs: [
        "پایگاه‌داده داده را بعد از بستن برنامه هم نگه می‌دارد. جدول مثل یک برگه است: هر ردیف یک چیز است و هر ستون یک ویژگی.",
        "این کلاس یک جدول تمرین به نام students دارد. هر بار که بررسی را بزنی، جدول از نو ساخته می‌شود. خرابش کنی هم چیزی در دنیای واقعی نمی‌شکند.",
        "SELECT یعنی نشان بده. SELECT name FROM students فقط ستون نام را می‌آورد. ستاره یعنی همه ستون‌ها، ولی در کار واقعی ستون‌ها را اسم ببر تا معلوم باشد چه می‌خواهی."
      ],
      example: "SELECT name FROM students ORDER BY id;",
      task: "نام همه دانشجوها را به ترتیب id بیاور.",
      hint: "SELECT name FROM students ORDER BY id",
      starter: "SELECT name\nFROM students\n",
      solution: "SELECT name FROM students ORDER BY id;",
      kind: "sql",
      expectRows: [["نیایش"], ["سارا"], ["کیان"], ["هستی"]]
    },
    {
      id: "sql-2", track: "sql", level: "شروع", title: "WHERE",
      paragraphs: [
        "WHERE ردیف‌ها را غربال می‌کند. بدون آن، کل جدول می‌آید.",
        "متن را در query با نقل‌قول تکی می‌نویسند، هم در MySQL و هم در PostgreSQL. عدد نقل‌قول نمی‌خواهد.",
        "AND هر دو شرط را می‌خواهد. OR یکی از دو شرط کافی است."
      ],
      example: "SELECT name FROM students WHERE city = 'تهران' ORDER BY id;",
      task: "نام دانشجوهایی را بیاور که شهرشان تهران است، به ترتیب id.",
      hint: "WHERE city = 'تهران'",
      starter: "SELECT name\nFROM students\nWHERE \n",
      solution: "SELECT name FROM students WHERE city = 'تهران' ORDER BY id;",
      kind: "sql",
      expectRows: [["نیایش"], ["کیان"]]
    },
    {
      id: "sql-3", track: "sql", level: "راه افتادن", title: "مرتب‌سازی",
      paragraphs: [
        "ORDER BY ترتیب را عوض می‌کند. ASC از کوچک به بزرگ است و حالت پیش‌فرض. DESC از بزرگ به کوچک.",
        "می‌توانی با دو ستون مرتب کنی: اول نمره، و اگر نمره یکی بود با id.",
        "LIMIT تعداد ردیف را کم می‌کند و در MySQL، PostgreSQL و همین موتور تمرین کار می‌کند."
      ],
      example: "SELECT name, score FROM students ORDER BY score DESC, id ASC;",
      task: "نام و نمره را بیاور. اول بیشترین نمره. اگر جایی مساوی شد، id کوچک‌تر اول باشد.",
      hint: "ORDER BY score DESC, id ASC",
      starter: "SELECT name, score\nFROM students\n",
      solution: "SELECT name, score FROM students ORDER BY score DESC, id ASC;",
      kind: "sql",
      expectRows: [["نیایش", 19], ["هستی", 17], ["سارا", 15], ["کیان", 12]]
    },
    {
      id: "sql-4", track: "sql", level: "راه افتادن", title: "LIKE",
      paragraphs: [
        "LIKE برای الگوی متن است. درصد یعنی هر چیزی با هر طول. city LIKE '%ان' یعنی شهرهایی که به «ان» ختم می‌شوند.",
        "در PostgreSQL، ILIKE همان LIKE است ولی بزرگ و کوچک لاتین برایش فرق ندارد. MySQL این دستور را ندارد و بزرگی و کوچکی حروف به collation جدول بستگی دارد."
      ],
      example: "SELECT name FROM students WHERE city LIKE '%ان' ORDER BY id;",
      task: "نام دانشجوهایی را بیاور که نام شهرشان به «ان» ختم می‌شود، به ترتیب id.",
      hint: "WHERE city LIKE '%ان'",
      starter: "SELECT name FROM students WHERE city LIKE ''\n",
      solution: "SELECT name FROM students WHERE city LIKE '%ان' ORDER BY id;",
      kind: "sql",
      expectRows: [["نیایش"], ["سارا"], ["کیان"]]
    },
    {
      id: "sql-5", track: "sql", level: "راه افتادن", title: "INSERT",
      paragraphs: [
        "INSERT یک ردیف تازه می‌گذارد. اسم ستون‌ها و مقدارها باید هم‌تعداد و هم‌ترتیب باشند.",
        "کلید اصلی نباید تکراری باشد. id شناسنامه ردیف است. اگر دو ردیف یک id داشته باشند، جدول آن را قبول نمی‌کند.",
        "این تمرین فقط روی کپی تمرینی اجرا می‌شود و با بررسی بعدی از نو ساخته می‌شود."
      ],
      example: "INSERT INTO students (id, name, city, score) VALUES (5, 'مریم', 'رشت', 16);",
      task: "دانشجویی با id برابر ۵، نام مریم، شهر رشت و نمره ۱۶ اضافه کن.",
      hint: "VALUES (5, 'مریم', 'رشت', 16)",
      starter: "INSERT INTO students (id, name, city, score)\nVALUES ();\n",
      solution: "INSERT INTO students (id, name, city, score) VALUES (5, 'مریم', 'رشت', 16);",
      kind: "sql",
      followedBy: "SELECT name, city FROM students WHERE id = 5",
      expectRows: [["مریم", "رشت"]]
    },
    {
      id: "sql-6", track: "sql", level: "قشنگ", title: "UPDATE",
      paragraphs: [
        "UPDATE مقدار ستون‌های یک ردیف موجود را عوض می‌کند. بدون WHERE همه ردیف‌ها عوض می‌شوند. این خطرناک‌ترین عادت در نوشتن query است.",
        "همیشه اول در ذهنت WHERE را بگو، بعد SET را."
      ],
      example: "UPDATE students SET score = 20 WHERE name = 'نیایش';",
      task: "نمره نیایش را به ۲۰ تغییر بده. فقط همان ردیف.",
      hint: "WHERE name = 'نیایش' را جا نگذار.",
      starter: "UPDATE students\nSET score = 20\nWHERE \n",
      solution: "UPDATE students SET score = 20 WHERE name = 'نیایش';",
      kind: "sql",
      followedBy: "SELECT score FROM students WHERE name = 'نیایش'",
      expectRows: [[20]]
    },
    {
      id: "sql-7", track: "sql", level: "قشنگ", title: "DELETE",
      paragraphs: [
        "DELETE ردیف را برمی‌دارد، نه یک ستون را. پاک کردن یک ستون کار UPDATE است و مقدارش را NULL می‌کند.",
        "DELETE بدون WHERE کل جدول را خالی می‌کند. در دیتابیس واقعی قبل از این دستور، WHERE را دو بار بخوان."
      ],
      example: "DELETE FROM students WHERE score < 15;",
      task: "دانشجوهایی را که نمره‌شان کمتر از ۱۵ است حذف کن.",
      hint: "فقط کیان نمره ۱۲ دارد. بعد از حذف، سه نفر می‌مانند.",
      starter: "DELETE FROM students\nWHERE \n",
      solution: "DELETE FROM students WHERE score < 15;",
      kind: "sql",
      followedBy: "SELECT name FROM students ORDER BY id",
      expectRows: [["نیایش"], ["سارا"], ["هستی"]]
    },
    {
      id: "sql-8", track: "sql", level: "حرفه‌ای", title: "JOIN",
      paragraphs: [
        "داده واقعی در یک جدول جا نمی‌شود. دانشجو در یک جدول است و درس‌ها در جدول دیگر. student_id در courses به id در students اشاره می‌کند. به این می‌گویند کلید خارجی.",
        "INNER JOIN فقط ردیف‌هایی را می‌آورد که در هر دو جدول جفت دارند. کیان هیچ درسی ندارد، پس در نتیجه این جوین نمی‌آید.",
        "ON شرط جفت شدن است. اگر ON را اشتباه بنویسی، یا چیزی نمی‌آید یا هر ردیف به همه ردیف‌ها می‌چسبد."
      ],
      example: "SELECT students.name, courses.title\nFROM students\nINNER JOIN courses ON courses.student_id = students.id\nORDER BY students.id, courses.id;",
      task: "نام دانشجو و عنوان درس را با INNER JOIN بیاور. به ترتیب id دانشجو و بعد id درس.",
      hint: "ON courses.student_id = students.id",
      starter: "SELECT students.name, courses.title\nFROM students\nINNER JOIN courses ON \n",
      solution: "SELECT students.name, courses.title\nFROM students\nINNER JOIN courses ON courses.student_id = students.id\nORDER BY students.id, courses.id;",
      kind: "sql",
      expectRows: [["نیایش", "Python"], ["نیایش", "وب"], ["سارا", "وب"], ["هستی", "داده"]]
    },
    {
      id: "sql-9", track: "sql", level: "حرفه‌ای", title: "GROUP BY",
      paragraphs: [
        "GROUP BY ردیف‌های هم‌گروه را یکی می‌کند تا بتوانی روی گروه حساب کنی. COUNT(*) تعداد ردیف هر گروه است.",
        "هر ستونی که در SELECT است و داخل تابع جمع‌کننده نیست، باید در GROUP BY باشد.",
        "ایندکس یک فهرست راهنما روی ستون است. جستجو، WHERE و JOIN را سریع‌تر می‌کند. نوشتن را سریع‌تر نمی‌کند و جای داده را کمی بیشتر می‌گیرد. روی ستونی ایندکس بگذار که زیاد با آن جستجو می‌کنی."
      ],
      example: "SELECT city, COUNT(*) AS n\nFROM students\nGROUP BY city\nORDER BY city;",
      task: "برای هر شهر تعداد دانشجو را با نام ستون n بیاور و بر اساس شهر مرتب کن.",
      hint: "SELECT city, COUNT(*) AS n FROM students GROUP BY city ORDER BY city",
      starter: "SELECT city, COUNT(*) AS n\nFROM students\n",
      solution: "SELECT city, COUNT(*) AS n FROM students GROUP BY city ORDER BY city;",
      kind: "sql",
      expectRows: [["اصفهان", 1], ["تهران", 2], ["شیراز", 1]]
    },
    {
      id: "sql-10", track: "sql", level: "حرفه‌ای", title: "MySQL و PostgreSQL",
      paragraphs: [
        "دستورهایی که تا اینجا نوشتی در هر دو دیتابیس درست‌اند. فرق‌ها سر ساخت جدول و چند ویژگی اضافه است.",
        "موتور تمرین همین صفحه SQLite است تا بدون نصب سرور بتوانی بنویسی. برای همین AUTO_INCREMENT و ILIKE این‌جا اجرا نمی‌شوند. آن‌ها را باید بشناسی، نه اینکه این‌جا اجرا کنی.",
        "رشته در هر دو با نقل‌قول تکی نوشته می‌شود. نقل‌قول دوتایی در PostgreSQL برای اسم ستون و جدول است، نه برای متن."
      ],
      compare: [
        { topic: "شماره خودکار", mysql: "AUTO_INCREMENT", postgres: "IDENTITY یا SERIAL" },
        { topic: "درست و غلط", mysql: "اغلب TINYINT", postgres: "BOOLEAN" },
        { topic: "جستجوی بدون بزرگی و کوچکی", mysql: "بسته به collation", postgres: "ILIKE" },
        { topic: "برگرداندن ردیف تازه‌درج‌شده", mysql: "یک SELECT جدا با LAST_INSERT_ID", postgres: "RETURNING" },
        { topic: "اسم ستون با فاصله یا کلمه رزرو", mysql: "بک‌تیک دور اسم", postgres: "نقل‌قول دوتایی دور اسم" }
      ],
      example: "",
      task: "در MySQL شماره خودکار ستون را با کدام می‌نویسند؟",
      hint: "IDENTITY مال PostgreSQL است. ILIKE هم همین‌طور.",
      solution: "AUTO_INCREMENT",
      kind: "choice",
      options: ["AUTO_INCREMENT", "ILIKE", "IDENTITY", "JOIN"],
      answer: 0
    }
  ],
  exam: [
    {
      id: "e-html-1", kind: "html", title: "عنوان",
      prompt: "یک h1 با متن «سلام نیایش» بنویس.",
      starter: "",
      rules: [{ sel: "h1", text: "سلام نیایش", hint: "h1 با متن سلام نیایش لازم است." }]
    },
    {
      id: "e-html-2", kind: "html", title: "فهرست",
      prompt: "یک ul با حداقل دو li بنویس.",
      starter: "<ul>\n</ul>",
      rules: [{ sel: "ul li", count: 2, hint: "دو li داخل ul لازم است." }]
    },
    {
      id: "e-css-1", kind: "css", title: "رنگ",
      prompt: "رنگ متن .t را #b83266 کن.",
      starter: ".t {\n}\n",
      fixture: "<p class=\"t\">نیایش</p>",
      styles: [{ selector: ".t", prop: "color", equals: "rgb(184, 50, 102)", hint: "رنگ باید #b83266 باشد." }]
    },
    {
      id: "e-css-2", kind: "css", title: "Flex",
      prompt: "کلاس .row را flex کن.",
      starter: ".row {\n}\n",
      fixture: "<div class=\"row\"><span>یک</span><span>دو</span></div>",
      styles: [{ selector: ".row", prop: "display", equals: "flex", hint: "display باید flex باشد." }]
    },
    {
      id: "e-py-1", kind: "python", title: "چاپ",
      prompt: "کلمه سلام نیایش را چاپ کن.",
      starter: "",
      expect: "سلام نیایش"
    },
    {
      id: "e-py-2", kind: "python", title: "شرط",
      prompt: "score از قبل ۱۶ است. اگر ۱۶ یا بیشتر بود «قبول» را چاپ کن وگرنه «مردود».",
      starter: "",
      prelude: "score = 16\n",
      expect: "قبول"
    },
    {
      id: "e-py-3", kind: "python", title: "تابع",
      prompt: "تابع add(a, b) را بنویس که جمع دو عدد را برگرداند. صدا زدن را خود کلاس انجام می‌دهد.",
      starter: "def add(a, b):\n    pass\n",
      append: "\nprint(add(2, 3))\n",
      expect: "5"
    },
    {
      id: "e-sql-1", kind: "sql", title: "شهر",
      prompt: "نام دانشجوهای تهران را به ترتیب id بیاور.",
      starter: "SELECT name FROM students\n",
      expectRows: [["نیایش"], ["کیان"]]
    },
    {
      id: "e-sql-2", kind: "sql", title: "شمارش گروهی",
      prompt: "برای هر شهر تعداد دانشجو را در ستونی به نام n بیاور و بر اساس شهر مرتب کن.",
      starter: "SELECT city\nFROM students\n",
      expectRows: [["اصفهان", 1], ["تهران", 2], ["شیراز", 1]]
    },
    {
      id: "e-ch-1", kind: "choice", title: "MySQL",
      prompt: "شماره خودکار در MySQL کدام است؟",
      options: ["AUTO_INCREMENT", "ILIKE", "RETURNING", "GRID"],
      answer: 0
    },
    {
      id: "e-ch-2", kind: "choice", title: "PostgreSQL",
      prompt: "ILIKE مال کدام پایگاه‌داده است؟",
      options: ["MySQL", "PostgreSQL", "CSS", "HTML"],
      answer: 1
    },
    {
      id: "e-ch-3", kind: "choice", title: "ایندکس",
      prompt: "ایندکس معمولاً کدام کار را سریع‌تر می‌کند؟",
      options: ["پاک کردن کل جدول", "جستجو روی یک ستون", "گرد کردن گوشه دکمه"],
      answer: 1
    }
  ],
  guide: [
    {
      id: "html",
      title: "HTML",
      intro: "این‌ها را مثل یک برگه یادداشت کنار دستت نگه دار. لازم نیست حفظ کنی؛ هر وقت نوشتی برگرد این‌جا.",
      rows: [
        ["<!DOCTYPE html>", "می‌گوید این صفحه امروزی است"],
        ["html", "ریشه سند. lang زبان صفحه را می‌گوید"],
        ["head", "اطلاعاتی که دیده نمی‌شود: عنوان زبانه و رمزگذاری"],
        ["body", "هر چه کاربر می‌بیند"],
        ["h1 تا h6", "عنوان، از مهم‌ترین به کوچک‌تر. در هر صفحه یک h1"],
        ["p", "پاراگراف"],
        ["a", "لینک. مقصد را در href می‌نویسی"],
        ["img", "تصویر. src فایل است و alt توضیح آن"],
        ["ul و li", "فهرست بی‌شماره و هر موردش"],
        ["ol", "فهرست شماره‌دار"],
        ["table, tr, th, td", "جدول، ردیف، عنوان ستون، خانه"],
        ["form, input, button", "فرم، جعبه نوشتن، دکمه"],
        ["header, main, footer", "بالا، محتوای اصلی، پایین صفحه"]
      ]
    },
    {
      id: "css",
      title: "CSS",
      intro: "هر قانون سه تکه دارد: چه چیزی، کدام ویژگی، چه مقدار.",
      rows: [
        ["selector { }", "انتخاب‌گر و بدنه قانون"],
        ["color", "رنگ متن"],
        ["background", "رنگ یا تصویر پشت عنصر"],
        ["padding", "فاصله داخل کادر"],
        ["margin", "فاصله بیرون کادر"],
        ["border-radius", "گردی گوشه"],
        ["font-size", "اندازه نوشته"],
        ["display: flex", "چیدن فرزندان در یک ردیف"],
        ["justify-content", "جای افقی در flex"],
        ["align-items", "جای عمودی در flex"],
        ["display: grid", "چیدن در ردیف و ستون"],
        ["grid-template-columns", "تعداد و اندازه ستون‌ها"],
        ["@media", "قانون مخصوص صفحه کوچک یا بزرگ"]
      ]
    },
    {
      id: "python",
      title: "Python",
      intro: "تورفتگی بخشی از زبان است. خط زیر if و def و for باید فاصله داشته باشد.",
      rows: [
        ["print(x)", "چاپ در خروجی"],
        ["name = \"نیایش\"", "ساختن متغیر"],
        ["+ - * /", "جمع، تفریق، ضرب، تقسیم"],
        ["if / else", "دوراهی. آخر خط if دونقطه می‌خواهد"],
        ["for x in range(1, 4)", "حلقه. ۴ خودش داخل محدوده نیست"],
        ["[2, 4, 6]", "لیست. عضو اول شماره ۰ است"],
        ["def f(n):", "تعریف تابع"],
        ["return", "برگرداندن نتیجه. با print فرق دارد"],
        ["{\"city\": \"تهران\"}", "دیکشنری. مقدار را با اسم کلید می‌گیری"],
        ["f\"سلام {name}\"", "چسباندن متن و متغیر"],
        ["class", "نقشه یک شیء. متد همیشه self می‌گیرد"]
      ]
    },
    {
      id: "sql",
      title: "SQL",
      intro: "این دستورها در MySQL و PostgreSQL یکی‌اند. موتور تمرین صفحه SQLite است و هر بار از نو ساخته می‌شود.",
      rows: [
        ["SELECT", "نشان بده"],
        ["FROM", "از کدام جدول"],
        ["WHERE", "کدام ردیف‌ها. بدون آن همه می‌آیند"],
        ["AND / OR", "هر دو شرط، یا یکی از دو شرط"],
        ["ORDER BY", "ترتیب. DESC از بزرگ به کوچک"],
        ["LIKE '%ان'", "الگوی متن. درصد یعنی هر چیز"],
        ["INSERT INTO", "ردیف تازه"],
        ["UPDATE ... WHERE", "عوض کردن مقدار. WHERE را جا نگذار"],
        ["DELETE ... WHERE", "حذف ردیف، نه یک ستون"],
        ["INNER JOIN ... ON", "چسباندن دو جدول روی کلید"],
        ["GROUP BY", "دسته‌کردن ردیف‌های هم‌گروه"],
        ["COUNT(*)", "تعداد ردیف"],
        ["ایندکس", "جستجو روی یک ستون را سریع‌تر می‌کند"]
      ]
    },
    {
      id: "db",
      title: "MySQL / PostgreSQL",
      intro: "queryهای درس در هر دو کار می‌کنند. این جدول فقط جاهایی است که اسم دستور فرق دارد.",
      rows: [
        ["شماره خودکار", "MySQL: AUTO_INCREMENT  ·  PostgreSQL: IDENTITY یا SERIAL"],
        ["درست و غلط", "MySQL اغلب از عدد کوچک استفاده می‌کند. PostgreSQL نوع BOOLEAN دارد"],
        ["جستجو بدون بزرگی و کوچکی", "PostgreSQL: ILIKE  ·  MySQL این دستور را ندارد"],
        ["ردیف تازه‌درج‌شده", "PostgreSQL: RETURNING  ·  MySQL: SELECT جدا"],
        ["اسم خاص ستون", "MySQL بک‌تیک می‌گذارد. PostgreSQL نقل‌قول دوتایی"],
        ["متن", "در هر دو با نقل‌قول تکی نوشته می‌شود"]
      ]
    }
  ]
};
