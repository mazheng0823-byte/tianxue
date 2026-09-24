// Local demo fixtures. Source IDs are separate from target schoolbook IDs.
window.SELECTION_LIBRARY = {
  sources: [
    {id:'bank-high',kind:'bank',name:'高中英语综合题库',short:'高中英语题库',stage:'高中',subject:'英语',units:['语法与词汇','阅读理解','听力听说']},
    {id:'bank-junior',kind:'bank',name:'初中英语综合题库',short:'初中英语题库',stage:'初中',subject:'英语',units:['语法与词汇','阅读理解','听力听说']},
    {id:'bank-math',kind:'bank',name:'高中数学基础题库',short:'高中数学题库',stage:'高中',subject:'数学',units:['集合与逻辑','函数与方程']},
    {id:'vocab-high',kind:'vocab',name:'高中英语进阶词库',short:'高中进阶词库',stage:'高中',subject:'英语',units:['人与自我','人与自然']},
    {id:'vocab-junior',kind:'vocab',name:'初中英语基础词库',short:'初中基础词库',stage:'初中',subject:'英语',units:['校园生活','日常活动']},
    {id:'vocab-school',kind:'vocab',name:'校本自建词库 · 九月复习',short:'校本自建词库',stage:'高中',subject:'英语',units:['学习与成长','交流与合作']}
  ],
  bankQuestions: [
    {id:'QB-H01',bookId:'bank-high',unit:0,type:'单项选择',difficulty:'适中',knowledge:'语法 · 定语从句',stem:'The book _____ you lent me last week is very useful.',options:['who','which','where','when'],answer:'B',analysis:'先行词为 book，关系代词 which 在定语从句中作宾语。',score:2},
    {id:'QB-H02',bookId:'bank-high',unit:0,type:'单项选择',difficulty:'容易',knowledge:'语法 · 时态',stem:'By the time we arrived, the movie _____.',options:['begins','has begun','had begun','will begin'],answer:'C',analysis:'电影开始先于过去的到达时间，使用过去完成时。',score:2},
    {id:'QB-H03',bookId:'bank-high',unit:0,type:'词汇理解',difficulty:'容易',knowledge:'词汇 · 学习活动',stem:'A clear plan helps students _____ their learning goals.',options:['achieve','borrow','repair','invite'],answer:'A',analysis:'achieve goals 意为实现目标。',score:2},
    {id:'QB-H04',bookId:'bank-high',unit:1,type:'阅读理解',difficulty:'适中',knowledge:'阅读 · 主旨大意',stem:'Students at Green School repair old bicycles and give them to people who need them. The project teaches practical skills while helping the community. What is the main purpose of the project?',options:['To sell new bicycles.','To combine learning with helping others.','To build a new school.','To prepare for a race.'],answer:'B',analysis:'项目将实践技能学习与帮助社区居民相结合。',score:4},
    {id:'QB-J01',bookId:'bank-junior',unit:0,type:'单项选择',difficulty:'容易',knowledge:'语法 · 比较级',stem:'This box is _____ than that one.',options:['heavy','heavier','heaviest','the heaviest'],answer:'B',analysis:'than 表示两者比较，使用比较级 heavier。',score:2},
    {id:'QB-J02',bookId:'bank-junior',unit:0,type:'词汇理解',difficulty:'容易',knowledge:'词汇 · 时间表达',stem:'We have breakfast in the _____.',options:['evening','afternoon','morning','night'],answer:'C',analysis:'早餐通常在早晨，morning 表示早晨。',score:2},
    {id:'QB-J03',bookId:'bank-junior',unit:1,type:'阅读理解',difficulty:'适中',knowledge:'阅读 · 细节理解',stem:'Ben visits his grandparents every Saturday. This week he will go on Sunday because he has a school trip on Saturday. When will Ben visit his grandparents this week?',options:['On Friday.','On Saturday.','On Sunday.','On Monday.'],answer:'C',analysis:'根据 This week he will go on Sunday 可知，本周在星期日探望。',score:4},
    {id:'QB-M01',bookId:'bank-math',unit:0,type:'单项选择',difficulty:'容易',knowledge:'集合 · 并集',stem:'已知集合 A = {1, 2}，B = {2, 3}，则 A ∪ B = ____。',options:['{2}','{1, 3}','{1, 2, 3}','{1, 2, 2, 3}'],answer:'C',analysis:'并集包含两个集合的全部不同元素。',score:2},
    {id:'QB-M02',bookId:'bank-math',unit:1,type:'单项选择',difficulty:'适中',knowledge:'函数 · 求值',stem:'若 f(x) = 2x + 1，则 f(3) = ____。',options:['3','5','6','7'],answer:'D',analysis:'代入 x = 3，得到 2 × 3 + 1 = 7。',score:2}
  ].concat((window.FLOW_QUESTIONS||[]).filter(q=>['FH01','FH06','FJ01','FJ06'].includes(q.id)).map(q=>({...q,id:'QB-'+q.id,bookId:q.stage==='高中'?'bank-high':'bank-junior',unit:2}))),
  words: [
    {id:'H01',bookId:'vocab-high',unit:0,word:'potential',pos:'n.',meaning:'潜力'},
    {id:'H02',bookId:'vocab-high',unit:0,word:'confidence',pos:'n.',meaning:'信心'},
    {id:'H03',bookId:'vocab-high',unit:0,word:'challenge',pos:'n.',meaning:'挑战'},
    {id:'H04',bookId:'vocab-high',unit:0,word:'opportunity',pos:'n.',meaning:'机会'},
    {id:'H05',bookId:'vocab-high',unit:1,word:'protect',pos:'v.',meaning:'保护'},
    {id:'H06',bookId:'vocab-high',unit:1,word:'reduce',pos:'v.',meaning:'减少'},
    {id:'H07',bookId:'vocab-high',unit:1,word:'recycle',pos:'v.',meaning:'回收利用'},
    {id:'H08',bookId:'vocab-high',unit:1,word:'explore',pos:'v.',meaning:'探索'},
    {id:'J01',bookId:'vocab-junior',unit:0,word:'library',pos:'n.',meaning:'图书馆'},
    {id:'J02',bookId:'vocab-junior',unit:0,word:'classroom',pos:'n.',meaning:'教室'},
    {id:'J03',bookId:'vocab-junior',unit:0,word:'teacher',pos:'n.',meaning:'教师'},
    {id:'J04',bookId:'vocab-junior',unit:0,word:'homework',pos:'n.',meaning:'家庭作业'},
    {id:'J05',bookId:'vocab-junior',unit:1,word:'borrow',pos:'v.',meaning:'借入'},
    {id:'J06',bookId:'vocab-junior',unit:1,word:'listen',pos:'v.',meaning:'听'},
    {id:'J07',bookId:'vocab-junior',unit:1,word:'read',pos:'v.',meaning:'阅读'},
    {id:'J08',bookId:'vocab-junior',unit:1,word:'write',pos:'v.',meaning:'书写'},
    {id:'S01',bookId:'vocab-school',unit:0,word:'method',pos:'n.',meaning:'方法'},
    {id:'S02',bookId:'vocab-school',unit:0,word:'progress',pos:'n.',meaning:'进步'},
    {id:'S03',bookId:'vocab-school',unit:0,word:'experience',pos:'n.',meaning:'经验'},
    {id:'S04',bookId:'vocab-school',unit:0,word:'knowledge',pos:'n.',meaning:'知识'},
    {id:'S05',bookId:'vocab-school',unit:1,word:'communicate',pos:'v.',meaning:'交流'},
    {id:'S06',bookId:'vocab-school',unit:1,word:'cooperate',pos:'v.',meaning:'合作'},
    {id:'S07',bookId:'vocab-school',unit:1,word:'discuss',pos:'v.',meaning:'讨论'},
    {id:'S08',bookId:'vocab-school',unit:1,word:'encourage',pos:'v.',meaning:'鼓励'}
  ]
};

