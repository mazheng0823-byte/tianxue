// Original local fixtures with explicit sentence boundaries, not inferred splits.
window.READING_LIBRARY = {
  sources: [
    {id:'sentence-junior',kind:'sentence',name:'初中英语情景句库',short:'初中情景句库',stage:'初中',subject:'英语',units:['校园生活','日常交流']},
    {id:'sentence-high',kind:'sentence',name:'高中英语表达句库',short:'高中表达句库',stage:'高中',subject:'英语',units:['学习与成长','人与自然']},
    {id:'passage-junior',kind:'passage',name:'初中英语主题篇库',short:'初中主题篇库',stage:'初中',subject:'英语',units:['校园与生活','人与社会']},
    {id:'passage-high',kind:'passage',name:'高中英语读背篇库',short:'高中读背篇库',stage:'高中',subject:'英语',units:['学习与成长','人与自然']}
  ],
  sentences: [
    {id:'SJ01',bookId:'sentence-junior',unit:0,title:'My Favorite Subject',sentences:[{id:'1',text:'My favorite subject is English because I enjoy learning new words.',translation:'我最喜欢的科目是英语，因为我喜欢学习新单词。'}]},
    {id:'SJ02',bookId:'sentence-junior',unit:0,title:'Working Together',sentences:[{id:'1',text:'We often help each other with our homework after school.',translation:'放学后，我们经常在作业上互相帮助。'}]},
    {id:'SJ03',bookId:'sentence-junior',unit:0,title:'The School Library',sentences:[{id:'1',text:'There is a quiet reading room on the second floor of our library.',translation:'我们图书馆的二楼有一间安静的阅览室。'}]},
    {id:'SJ04',bookId:'sentence-junior',unit:1,title:'Asking for Directions',sentences:[{id:'1',text:'Could you tell me how to get to the nearest bus stop?',translation:'你能告诉我怎么去最近的公交车站吗？'}]},
    {id:'SJ05',bookId:'sentence-junior',unit:1,title:'Making Plans',sentences:[{id:'1',text:'Let us meet at the park entrance at nine tomorrow morning.',translation:'我们明天早上九点在公园入口见面吧。'}]},
    {id:'SJ06',bookId:'sentence-junior',unit:1,title:'Saying Thank You',sentences:[{id:'1',text:'Thank you for showing me around your beautiful school.',translation:'谢谢你带我参观你们美丽的学校。'}]},
    {id:'SH01',bookId:'sentence-high',unit:0,title:'Learning from Mistakes',sentences:[{id:'1',text:'Every mistake gives us an opportunity to learn something new.',translation:'每一次错误都给我们提供了学习新知识的机会。'}]},
    {id:'SH02',bookId:'sentence-high',unit:0,title:'Building Confidence',sentences:[{id:'1',text:'The more we practice, the more confident we become.',translation:'我们练习得越多，就会变得越自信。'}]},
    {id:'SH03',bookId:'sentence-high',unit:0,title:'Small Steps',sentences:[{id:'1',text:'Lasting progress begins with small steps taken every day.',translation:'持久的进步始于每天迈出的小步。'}]},
    {id:'SH04',bookId:'sentence-high',unit:1,title:'Protecting Nature',sentences:[{id:'1',text:'Protecting the environment is a responsibility we all share.',translation:'保护环境是我们共同的责任。'}]},
    {id:'SH05',bookId:'sentence-high',unit:1,title:'A Greener Future',sentences:[{id:'1',text:'By changing a few daily habits, we can make a difference to our planet.',translation:'通过改变一些日常习惯，我们可以为地球带来改变。'}]},
    {id:'SH06',bookId:'sentence-high',unit:1,title:'Respecting Wildlife',sentences:[{id:'1',text:'Wild animals need safe places where they can live without disturbance.',translation:'野生动物需要能不受干扰地生活的安全空间。'}]}
  ],
  passages: [
    {id:'PJ01',bookId:'passage-junior',unit:0,title:'Our Reading Corner',translation:'我们的阅读角',sentences:[
      {id:'1',text:'Our class has a small reading corner beside the window.',translation:'我们班在窗边有一个小小的阅读角。'},
      {id:'2',text:'Everyone can bring a book and share it with classmates.',translation:'每个人都可以带一本书与同学分享。'},
      {id:'3',text:'During the break, we sit together and talk about our favorite stories.',translation:'课间，我们坐在一起讨论最喜欢的故事。'},
      {id:'4',text:'The corner has made reading an important part of our school day.',translation:'这个阅读角让阅读成为我们在校生活的重要部分。'}]},
    {id:'PJ02',bookId:'passage-junior',unit:0,title:'A Healthy Morning',translation:'健康的早晨',sentences:[
      {id:'1',text:'I used to get up late and miss breakfast.',translation:'我以前起床很晚，常常不吃早饭。'},
      {id:'2',text:'Now I set my alarm ten minutes earlier each morning.',translation:'现在我每天早上把闹钟提前十分钟。'},
      {id:'3',text:'After a simple breakfast, I walk to school with my neighbor.',translation:'吃过简单的早饭后，我和邻居一起步行上学。'},
      {id:'4',text:'This small change helps me feel ready for the day.',translation:'这个小改变让我觉得做好了一天的准备。'}]},
    {id:'PJ03',bookId:'passage-junior',unit:1,title:'A Small Act of Kindness',translation:'一次小小的善举',sentences:[
      {id:'1',text:'One rainy afternoon, I saw a younger student waiting at the school gate.',translation:'一个下雨的下午，我看见一位低年级学生在校门口等候。'},
      {id:'2',text:'He had forgotten his umbrella, so I offered to share mine.',translation:'他忘了带伞，于是我提出和他共用我的伞。'},
      {id:'3',text:'We talked on the way home and soon became friends.',translation:'我们在回家的路上聊天，很快就成了朋友。'},
      {id:'4',text:'A small act of kindness can be the beginning of a friendship.',translation:'一次小小的善举可以成为一段友谊的开始。'}]},
    {id:'PH01',bookId:'passage-high',unit:0,title:'The Value of Practice',translation:'练习的价值',sentences:[
      {id:'1',text:'Learning a new skill takes more than understanding the rules.',translation:'学习一项新技能不仅仅需要理解规则。'},
      {id:'2',text:'It also requires the patience to practice regularly.',translation:'它还需要坚持定期练习的耐心。'},
      {id:'3',text:'At first, progress may be too small to notice.',translation:'最初，进步可能小到难以察觉。'},
      {id:'4',text:'However, each careful attempt builds on the one before it.',translation:'然而，每一次认真的尝试都建立在之前的尝试之上。'},
      {id:'5',text:'Over time, these small efforts can lead to remarkable improvement.',translation:'随着时间推移，这些微小的努力能带来显著提升。'}]},
    {id:'PH02',bookId:'passage-high',unit:1,title:'A Garden for Everyone',translation:'属于每个人的花园',sentences:[
      {id:'1',text:'An empty piece of land near our school has become a community garden.',translation:'学校附近的一块空地已经变成了社区花园。'},
      {id:'2',text:'Students and neighbors work together to grow vegetables and flowers.',translation:'学生和邻居们一起种植蔬菜和花卉。'},
      {id:'3',text:'The garden provides more than fresh food and a pleasant view.',translation:'这个花园提供的不仅是新鲜食物和宜人的景色。'},
      {id:'4',text:'It gives people a place to exchange ideas and support one another.',translation:'它为人们交流想法、互相支持提供了空间。'},
      {id:'5',text:'By caring for the same small space, we learn to care for our wider community.',translation:'通过照料同一片小空间，我们学会了关爱更广泛的社区。'}]},
    {id:'PH03',bookId:'passage-high',unit:1,title:'Choosing to Reuse',translation:'选择再次使用',sentences:[
      {id:'1',text:'Before buying something new, it is worth considering what we already own.',translation:'在购买新物品之前，值得想想我们已经拥有什么。'},
      {id:'2',text:'A repaired bag or a shared tool can often meet our needs.',translation:'一个修好的包或一件共享工具往往就能满足我们的需要。'},
      {id:'3',text:'Reusing things saves resources and encourages creative thinking.',translation:'再次使用物品可以节约资源，并鼓励创造性思考。'},
      {id:'4',text:'These everyday choices help us build a more responsible way of living.',translation:'这些日常选择有助于我们建立更负责任的生活方式。'}]}
  ]
};
window.SELECTION_LIBRARY.sources.push(...window.READING_LIBRARY.sources);

