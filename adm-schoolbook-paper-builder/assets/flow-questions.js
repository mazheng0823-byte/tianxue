// Local sample questions for checking the supplied Beijing exam-flow templates.
window.FLOW_SOURCE_BOOKS = [
  {id:'flow-high',name:'北京高中英语听说专项',short:'北京高中听说',stage:'高中',subject:'英语',units:['听后选择','听后记录与转述','朗读与问答']},
  {id:'flow-junior',name:'北京初中英语听说专项',short:'北京初中听说',stage:'初中',subject:'英语',units:['听后选择','听后回答','转述与朗读']}
];
window.FLOW_QUESTIONS = (()=>{
  const passage='Being a green consumer means making choices that protect the environment. We can choose products with less packaging, buy only the food we need, and reuse things whenever possible. Small changes in our daily lives can make a big difference. By working together, we can save resources and create a healthier future.';
  const table=[['Cultural workshops','Join some cultural workshops to learn new (1) _____.'],['Social media','Share stories to raise cultural (2) _____.'],['At school','Give (3) _____ about traditional culture.'],['In the community','Take part in local (4) _____.']];
  const pair=[{stem:'Where are the speakers going?',options:['To the library.','To the museum.','To the park.']},{stem:'When will they meet?',options:['At 8:00.','At 8:30.','At 9:00.']}];
  const oral=[{stem:'What does being a green consumer mean?',options:[]},{stem:'How can we reduce food waste?',options:[]},{stem:'Name one way to save resources.',options:[]}];
  const make=(id,stage,flowType,type,unit,extra={})=>({id,stage,flowType,type,unit,bookId:stage==='高中'?'flow-high':'flow-junior',difficulty:'适中',knowledge:'英语听说 · '+type,stem:'',options:[],answer:'参考示例答案',analysis:'按题目要求完成听说任务。',score:2,response:'record',...extra});
  return [
    make('FH01','高中','short','听力短对话',0,{response:'choice',stem:'Where is the book actually?',options:['On Shelf K01.','On Shelf K03.','On Shelf K05.'],answer:'B',score:1.5}),
    make('FH02','高中','long','听力长对话',0,{response:'choice',stem:'听对话，回答以下两道小题。',subQuestions:pair,answer:'1. B；2. C',score:3}),
    make('FH03','高中','passage','听力短文',0,{response:'choice',stem:'听独白，回答以下两道小题。',subQuestions:[{stem:'What is the notice mainly about?',options:['A school trip.','A sports meeting.','A reading club.']},{stem:'What should students bring?',options:['Some food.','A notebook.','A camera.']}],answer:'1. A；2. B',score:3}),
    make('FH04','高中','information','听后记录',1,{response:'fill',stem:'听短文，根据提示填写关键信息，每空一词。',table,answer:'skills; awareness; presentations; activities',score:4}),
    make('FH05','高中','retell','听后转述',1,{stem:'请根据所听内容和提示信息完成转述。',table,opening:'Sam Smith provides some tips on how to preserve traditional culture. According to Sam, ...',score:8}),
    make('FH06','高中','reading','朗读短文',2,{stem:'请朗读下面的短文。',passage,score:6}),
    make('FH07','高中','oral','口语问答',2,{stem:'根据短文内容，口头回答以下问题。',passage,subQuestions:oral,score:6}),
    make('FJ01','初中','long','听长对话回答问题',0,{response:'choice',stem:'听对话，回答以下两道小题。',subQuestions:pair,answer:'1. B；2. C',score:4}),
    make('FJ02','初中','passage','听短文回答问题',0,{response:'choice',stem:'听独白，回答以下两道小题。',subQuestions:[{stem:'What day is the school trip?',options:['Monday.','Wednesday.','Friday.']},{stem:'How will they travel?',options:['By bus.','By train.','On foot.']}],answer:'1. C；2. A',score:4}),
    make('FJ03','初中','answer','听后回答',1,{stem:'What will the speakers have for breakfast today?',score:2}),
    make('FJ04','初中','answer-group','听后回答（组合题）',1,{stem:'听对话，依次口头回答两道问题。',subQuestions:[{stem:'What is the boy planning to do?',options:[]},{stem:'When will the activity start?',options:[]}],score:4}),
    make('FJ05','初中','retell','听后转述',2,{stem:'根据所听内容和提示信息，完成转述。',table:[['What','A reading club at school.'],['When','Every Friday afternoon.'],['Activities','Share favourite stories and discuss books.']],opening:'Tom would like to introduce the school reading club. ...',score:8}),
    make('FJ06','初中','reading','朗读短文',2,{stem:'请朗读下面的短文。',passage,score:6})
  ];
})();

