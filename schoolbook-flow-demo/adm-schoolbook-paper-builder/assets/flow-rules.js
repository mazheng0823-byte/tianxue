// Generated from the supplied workbook; default templates are never edited in place.
window.FLOW_RULE_LIBRARY = [
  {
    "id": "high-exam-short",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "short",
    "mode": "exam",
    "modeLabel": "高考流控",
    "section": "一：听后选择",
    "questionType": "听力短对话（1-4）每题1.5分",
    "intro": "一、听后选择本大题共两节；第一节听下面四段对话。每段对话后有一道小题，从每题所给的A、B、C三个选项中选出最佳选项，并用鼠标点击该选项。听对话前，你将有5秒钟的时间阅读每小题。听完后，每小题将有5秒钟的作答时间。每段对话你将听一遍。",
    "introAudio": "tinghouxuanze1zhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答第X小题。现在你有5秒钟的时间阅读该小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "t1zhunbei.mp3 t2zhunbei.mp3 t3zhunbei.mp3 t4zhunbei.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "5s倒计时；预览试题",
        "seconds": 5,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "write",
        "text": "5s倒计时；作答试题",
        "seconds": 5,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 3,
      "range": "A3:AC3"
    },
    "conflict": ""
  },
  {
    "id": "high-exam-long",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "long",
    "mode": "exam",
    "modeLabel": "高考流控",
    "section": "一：听后选择",
    "questionType": "听力长对话（5-12）每题1.5分",
    "intro": "第二节，听下面五段对话或独白。每段对话或独白后有两道小题，从每题所给的A、B、C三个选项中选出最佳选项，并用鼠标点击该选项。听每段对话或独白前，你将有5秒钟的时间阅读每小题。听完后，每小题将有5秒钟的作答时间。每段对话或独白你将听两遍。",
    "introAudio": "tinghouxuanze2zhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答第X至第Y小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "t56zhunbei.mp3 t78zhunbei.mp3 t910zhunbei.mp3 t1112zhunbei.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时；预览试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时；准备播放第二遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "10s倒计时；作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 24
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 4,
      "range": "A4:AC4"
    },
    "conflict": ""
  },
  {
    "id": "high-exam-passage",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "passage",
    "mode": "exam",
    "modeLabel": "高考流控",
    "section": "一：听后选择",
    "questionType": "听力短文（13-14）每题1.5分",
    "intro": "第二节，听下面五段对话或独白。每段对话或独白后有两道小题，从每题所给的A、B、C三个选项中选出最佳选项，并用鼠标点击该选项。听每段对话或独白前，你将有5秒钟的时间阅读每小题。听完后，每小题将有5秒钟的作答时间。每段对话或独白你将听两遍。",
    "introAudio": "tinghouxuanze2zhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段独白，回答第X至第Y小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "t1314zhunbei.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时；预览试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时；准备播放第二遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "10s倒计时；作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 24
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 5,
      "range": "A5:AC5"
    },
    "conflict": ""
  },
  {
    "id": "high-exam-information",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "information",
    "mode": "exam",
    "modeLabel": "高考流控",
    "section": "二：听后记录并转述",
    "questionType": "听取信息题（组合）(15-1 -15-4)",
    "intro": "二、听后记录并转述本大题共两节。第一节，听两遍短文，根据所听内容和提示，将所缺的关键信息填写在相应位置上，每空只需填写一个词。",
    "introAudio": "thjiluzhuanshuzhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：第一节，听后记录信息；现在，你有1分钟的时间浏览提示信息。",
        "seconds": null,
        "perQuestion": null,
        "audio": "thjiluzhunbei.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "60s倒计时；预览试题",
        "seconds": 60,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时；准备播放第二遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "narration",
        "text": "播报：下面，请在90秒钟内将所缺信息输入到指定的答题区域。",
        "seconds": null,
        "perQuestion": null,
        "audio": "thjiluzuoda.mp3",
        "sourceColumn": 24
      },
      {
        "id": "step-7",
        "kind": "write",
        "text": "90s倒计时；作答试题",
        "seconds": 90,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 27
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 6,
      "range": "A6:AC6"
    },
    "conflict": ""
  },
  {
    "id": "high-exam-retell",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "retell",
    "mode": "exam",
    "modeLabel": "高考流控",
    "section": "二：听后记录并转述",
    "questionType": "口语复述",
    "intro": "二、听后记录并转述本大题共两节。第一节，听两遍短文，根据所听内容和提示，将所缺的关键信息填写在相应位置上，每空只需填写一个词。",
    "introAudio": "thjiluzhuanshuzhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：第二节，转述短文内容；请再听一遍短文，完成转述。",
        "seconds": null,
        "perQuestion": null,
        "audio": "thzhuanshu.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "audio",
        "text": "播放题干，回填上一题填写答案",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "narration",
        "text": "播报：现在，你有2分钟的时间做转述准备。转述的开头已给出。",
        "seconds": null,
        "perQuestion": null,
        "audio": "thzhuanshuzhunbei.mp3",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "prepare",
        "text": "120s倒计时：准备转述",
        "seconds": 120,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "narration",
        "text": "播报：下面，请准备录音。听到录音提示音后，在2分钟内完成转述。开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "thzhuanshuluyin.mp3",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "record",
        "text": "120s倒计时：录音作答",
        "seconds": 120,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 24
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 7,
      "range": "A7:AC7"
    },
    "conflict": ""
  },
  {
    "id": "high-exam-reading",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "reading",
    "mode": "exam",
    "modeLabel": "高考流控",
    "section": "三：朗读短文并回答问题",
    "questionType": "短文听读（17）",
    "intro": "三、朗读短文并回答问题；本大题共两节。第一节，朗读一段短文。第二节，根据短文内容口头回答问题。",
    "introAudio": "lddwhdwtzhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：第一节，朗读短文；现在，你有1分钟的时间浏览短文与问题，并做录音准备。",
        "seconds": null,
        "perQuestion": null,
        "audio": "lddwzhunbei.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "60s倒计时：当短文听读和口语问答挨着出现时展示预览文章+问题",
        "seconds": 60,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "narration",
        "text": "播报：下面请准备录音，听到录音提示音后在90秒钟内完成朗读，开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "lddwluyin.mp3",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "record",
        "text": "90s倒计时：录音作答",
        "seconds": 90,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 8,
      "range": "A8:AC8"
    },
    "conflict": ""
  },
  {
    "id": "high-exam-oral",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "oral",
    "mode": "exam",
    "modeLabel": "高考流控",
    "section": "三：朗读短文并回答问题",
    "questionType": "口语问答（18-20）",
    "intro": "第二节：回答问题，回答每道问题前，你将有15秒钟的时间进行准备。每道问题你将有30秒钟的作答时间。",
    "introAudio": "hdwtzhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：请看第x个问题。现在，你有15秒钟的时间做录音准备。",
        "seconds": null,
        "perQuestion": null,
        "audio": "hdwt1zhunbei.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "15s倒计时：预览问题",
        "seconds": 15,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "narration",
        "text": "播报：下面，请准备录音。听到录音提示音后，在30秒钟内完成作答。开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "hdwt1luyin.mp3",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "record",
        "text": "30s倒计时：录音作答",
        "seconds": 30,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 9,
      "range": "A9:AC9"
    },
    "conflict": ""
  },
  {
    "id": "high-fallback-short",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "short",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "一：听后选择",
    "questionType": "听力短对话",
    "intro": "听后选择；听对话前，你将有5秒钟的时间阅读每小题。听完后，每小题将有5秒钟的作答时间。每段对话你将听一遍。",
    "introAudio": "ddthxz1.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答以下小题。现在你有5秒钟的时间阅读该小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthxzddh.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "5s倒计时；预览试题",
        "seconds": 5,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "write",
        "text": "5s倒计时；作答试题",
        "seconds": 5,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 10,
      "range": "A10:AC10"
    },
    "conflict": ""
  },
  {
    "id": "high-fallback-long",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "long",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "一：听后选择",
    "questionType": "听力长对话",
    "intro": "听后选择；听对话或独白前，你将有5秒钟的时间阅读每小题。听完后，每小题将有5秒钟的作答时间。每段对话或独白你将听两遍。",
    "introAudio": "ddthxz2.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答以下小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthxzcdh.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时；预览试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时；准备播放第二遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "10s倒计时；作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 24
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 11,
      "range": "A11:AC11"
    },
    "conflict": ""
  },
  {
    "id": "high-fallback-passage",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "passage",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "一：听后选择",
    "questionType": "听力短文",
    "intro": "听后选择；听对话或独白前，你将有5秒钟的时间阅读每小题。听完后，每小题将有5秒钟的作答时间。每段对话或独白你将听两遍。",
    "introAudio": "ddthxz2.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段独白，回答以下小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthxzdb.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时；预览试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时；准备播放第二遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "10s倒计时；作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 24
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 12,
      "range": "A12:AC12"
    },
    "conflict": ""
  },
  {
    "id": "high-fallback-information",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "information",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "二：听后记录",
    "questionType": "听取信息题（组合）",
    "intro": "听两遍短文，根据所听内容和提示，将所缺的关键信息填写在相应位置上，每空只需填写一个词。",
    "introAudio": "ddthjl.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听后记录信息；现在，你有1分钟的时间浏览提示信息。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthjlzb.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "60s倒计时；预览试题",
        "seconds": 60,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时；准备播放第二遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "narration",
        "text": "播报：下面，请在90秒钟内将所缺信息输入到指定的答题区域。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthjlzd.mp3",
        "sourceColumn": 24
      },
      {
        "id": "step-7",
        "kind": "write",
        "text": "90s倒计时；作答试题",
        "seconds": 90,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 27
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 13,
      "range": "A13:AC13"
    },
    "conflict": ""
  },
  {
    "id": "high-fallback-retell",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "retell",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "二：听后记录",
    "questionType": "口语复述",
    "intro": "听两遍短文，根据所听内容和提示，将所缺的关键信息填写在相应位置上，每空只需填写一个词。",
    "introAudio": "ddthjl.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：转述短文内容；请听一遍短文，完成转述。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthzs.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "audio",
        "text": "播放题干，回填上一题填写答案",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "narration",
        "text": "播报：现在，你有2分钟的时间做转述准备。转述的开头已给出。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthzszb.mp3",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "prepare",
        "text": "120s倒计时：准备转述",
        "seconds": 120,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "narration",
        "text": "播报：下面，请准备录音。听到录音提示音后，在2分钟内完成转述。开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthzszd.mp3",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "record",
        "text": "120s倒计时：录音作答",
        "seconds": 120,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 24
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 14,
      "range": "A14:AC14"
    },
    "conflict": ""
  },
  {
    "id": "high-fallback-reading",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "reading",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "三：朗读短文并回答问题",
    "questionType": "短文听读",
    "intro": "朗读一段短文",
    "introAudio": "ddlddw.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：朗读短文；现在，你有1分钟的时间浏览短文与问题，并做录音准备。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddlddwzb.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "60s倒计时：当短文听读和口语问答挨着出现时展示预览文章+问题",
        "seconds": 60,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "narration",
        "text": "播报：下面请准备录音，听到录音提示音后在90秒钟内完成朗读，开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddlddwzd.mp3",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "record",
        "text": "90s倒计时：录音作答",
        "seconds": 90,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 15,
      "range": "A15:AC15"
    },
    "conflict": ""
  },
  {
    "id": "high-fallback-oral",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "oral",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "三：朗读短文并回答问题",
    "questionType": "口语问答",
    "intro": "回答问题；回答每道问题前，你将有15秒钟的时间进行准备。每道问题你将有30秒钟的作答时间。",
    "introAudio": "ddhdwt.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：请看以下问题。现在，你有15秒钟的时间做录音准备。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddhdwtzb.mp3",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "15s倒计时：预览问题",
        "seconds": 15,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "narration",
        "text": "播报：下面，请准备录音。听到录音提示音后，在30秒钟内完成作答。开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddhdwtzd.mp3",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "record",
        "text": "30s倒计时：录音作答",
        "seconds": 30,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 16,
      "range": "A16:AC16"
    },
    "conflict": ""
  },
  {
    "id": "high-standalone-information",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "information",
    "mode": "standalone",
    "modeLabel": "独立布置",
    "section": "独立布置",
    "questionType": "听取信息题（组合）",
    "intro": "听后记录。听音频，完成表格内容。你将有30秒钟的准备时间，听完录音后，请在90秒钟内完成作答。",
    "introAudio": "",
    "steps": [
      {
        "id": "step-1",
        "kind": "read",
        "text": "30s倒计时；预览试题",
        "seconds": 30,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "wait",
        "text": "3s倒计时；准备播放第二遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "narration",
        "text": "播报：下面，请在90秒钟内将所缺信息输入到指定的答题区域。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthjlzd.mp3",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "90s倒计时；作答试题",
        "seconds": 90,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 24
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 17,
      "range": "A17:AC17"
    },
    "conflict": ""
  },
  {
    "id": "high-standalone-retell",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "retell",
    "mode": "standalone",
    "modeLabel": "独立布置",
    "section": "独立布置",
    "questionType": "口语复述",
    "intro": "听后转述。每题你将有60秒钟的准备时间，听2遍音频后，请在2分钟内完成转述。",
    "introAudio": "",
    "steps": [
      {
        "id": "step-1",
        "kind": "read",
        "text": "60s倒计时；预览试题",
        "seconds": 60,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "audio",
        "text": "播放题干，不回填答案",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "narration",
        "text": "播报：现在，你有2分钟的时间做转述准备。转述的开头已给出。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthzszb.mp3",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "prepare",
        "text": "120s倒计时：准备转述",
        "seconds": 120,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "narration",
        "text": "播报：下面，请准备录音。听到录音提示音后，在2分钟内完成转述。开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthzszd.mp3",
        "sourceColumn": 21
      },
      {
        "id": "step-6",
        "kind": "record",
        "text": "120s倒计时：录音作答",
        "seconds": 120,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 24
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 18,
      "range": "A18:AC18"
    },
    "conflict": "旁白为听2遍，步骤仅列1次播放；默认按旁白2遍，可调整。"
  },
  {
    "id": "high-standalone-reading",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "reading",
    "mode": "standalone",
    "modeLabel": "独立布置",
    "section": "独立布置",
    "questionType": "短文听读",
    "intro": "朗读短文。每题你将有60秒钟的准备时间和90秒钟的作答时间。",
    "introAudio": "",
    "steps": [
      {
        "id": "step-1",
        "kind": "read",
        "text": "60s倒计时：预览文章",
        "seconds": 60,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "narration",
        "text": "播报：下面请准备录音，听到录音提示音后在90秒钟内完成朗读，开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddlddwzd.mp3",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "record",
        "text": "90s倒计时：录音作答",
        "seconds": 90,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 19,
      "range": "A19:AC19"
    },
    "conflict": ""
  },
  {
    "id": "high-standalone-oral",
    "province": "11",
    "city": "*",
    "stage": "高中",
    "type": "oral",
    "mode": "standalone",
    "modeLabel": "独立布置",
    "section": "独立布置",
    "questionType": "口语问答",
    "intro": "口头回答问题。请根据短文内容口头回答问题。你将有x（一道题20s）秒钟的时间预览。每个问题你将有15秒钟的准备时间，在听到录音提示后，你有30秒钟的时间作答。",
    "introAudio": "",
    "steps": [
      {
        "id": "step-1",
        "kind": "read",
        "text": "x（一道题20s）s倒计时：预览文章（上一道题的文字题干）+多个问题汇总",
        "seconds": null,
        "perQuestion": 20,
        "audio": "",
        "sourceColumn": 9
      },
      {
        "id": "step-2",
        "kind": "narration",
        "text": "播报：请看以下问题。现在，你有15秒钟的时间做录音准备。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddhdwtzb.mp3",
        "sourceColumn": 12
      },
      {
        "id": "step-3",
        "kind": "read",
        "text": "15s倒计时：预览问题",
        "seconds": 15,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 15
      },
      {
        "id": "step-4",
        "kind": "narration",
        "text": "播报：下面，请准备录音。听到录音提示音后，在30秒钟内完成作答。开始录音",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddhdwtzd.mp3",
        "sourceColumn": 18
      },
      {
        "id": "step-5",
        "kind": "record",
        "text": "30s倒计时：录音作答",
        "seconds": 30,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 21
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京高中",
      "row": 20,
      "range": "A20:AC20"
    },
    "conflict": ""
  },
  {
    "id": "junior-exam-long",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "long",
    "mode": "exam",
    "modeLabel": "中考流控",
    "section": "一：听后选择",
    "questionType": "听长对话回答2个问题",
    "intro": "一：听后选择；听对话或独白，依据所听内容从每题所给的A、B、C三个选项中选择最佳选项，并用鼠标点击该选项。听每段对话或独白前，你有5秒钟的时间阅读每小题。听完后，你有5秒钟的时间作答。每段对话或独白你将听两遍。",
    "introAudio": "Tinghouxuanzezhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答第X至第Y小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "T1&2zhunbei.mp3 T3&4zhunbei.mp3",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时：阅读试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 20
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 3,
      "range": "A3:AI3"
    },
    "conflict": ""
  },
  {
    "id": "junior-exam-passage",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "passage",
    "mode": "exam",
    "modeLabel": "中考流控",
    "section": "一：听后选择",
    "questionType": "听短文回答问题",
    "intro": "一：听后选择；听对话或独白，依据所听内容从每题所给的A、B、C三个选项中选择最佳选项，并用鼠标点击该选项。听每段对话或独白前，你有5秒钟的时间阅读每小题。听完后，你有5秒钟的时间作答。每段对话或独白你将听两遍。",
    "introAudio": "Tinghouxuanzezhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段独白，回答第X至第Y小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "T5&6zhunbei.mp3",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时：阅读试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 20
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 4,
      "range": "A4:AI4"
    },
    "conflict": ""
  },
  {
    "id": "junior-exam-answer",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "answer",
    "mode": "exam",
    "modeLabel": "中考流控",
    "section": "二：听后回答",
    "questionType": "听后回答（北京）",
    "intro": "二：听后回答；听对话，根据所听内容口头回答问题。每小题你在听到录音提示音后，有10秒钟的作答时间。每段对话你将听两遍。",
    "introAudio": "Tinghouhuidazhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答该小题。现在，你有5秒钟的时间阅读这道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "THHDdantizhunbei.mp3",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "5s倒计时：阅读试题",
        "seconds": 5,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "narration",
        "text": "播报：下面，请准备录音，听到录音提示音后在10秒钟内完成作答。",
        "seconds": null,
        "perQuestion": null,
        "audio": "THHDdantizuoda.mp3",
        "sourceColumn": 20
      },
      {
        "id": "step-7",
        "kind": "record",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 23
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 5,
      "range": "A5:AI5"
    },
    "conflict": ""
  },
  {
    "id": "junior-exam-answer-group",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "answer-group",
    "mode": "exam",
    "modeLabel": "中考流控",
    "section": "二：听后回答",
    "questionType": "听后回答（北京）组合题",
    "intro": "二：听后回答；听对话，根据所听内容口头回答问题。每小题你在听到录音提示音后，有10秒钟的作答时间。每段对话你将听两遍。",
    "introAudio": "Tinghouhuidazhishiyu.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答两道小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "THHDT1&2zhunbei.mp3",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时：阅读试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "narration",
        "text": "播报：下面，请准备录音，听到录音提示音后在10秒钟内完成作答。",
        "seconds": null,
        "perQuestion": null,
        "audio": "THHDT1zuoda.mp3",
        "sourceColumn": 20
      },
      {
        "id": "step-7",
        "kind": "record",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 23
      },
      {
        "id": "step-8",
        "kind": "narration",
        "text": "播报：下面，请准备录音，听到录音提示音后在10秒钟内完成作答。",
        "seconds": null,
        "perQuestion": null,
        "audio": "THHDT2zuoda.mp3",
        "sourceColumn": 26
      },
      {
        "id": "step-9",
        "kind": "record",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 29
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 6,
      "range": "A6:AI6"
    },
    "conflict": ""
  },
  {
    "id": "junior-exam-retell",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "retell",
    "mode": "exam",
    "modeLabel": "中考流控",
    "section": "三：听后转述",
    "questionType": "说话",
    "intro": "播报：三：听后转述；听短文，根据所听内容和提示信息，完成转述。听短文前你将有1分钟的准备时间，听3遍短文后，你将有2分钟的时间做转述准备，然后在100秒内完成转述并录音。",
    "introAudio": "newt15.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "read",
        "text": "60s倒计时：阅读试题",
        "seconds": 60,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 20
      },
      {
        "id": "step-7",
        "kind": "narration",
        "text": "播报：现在你有两分钟的时间做转述准备，转述的开头已给出",
        "seconds": null,
        "perQuestion": null,
        "audio": "newt15.1.mp3",
        "sourceColumn": 23
      },
      {
        "id": "step-8",
        "kind": "prepare",
        "text": "120s倒计时：转述准备",
        "seconds": 120,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 26
      },
      {
        "id": "step-9",
        "kind": "narration",
        "text": "播报：下面请准备录音，听到录音提示音后在100秒中内完成转述。",
        "seconds": null,
        "perQuestion": null,
        "audio": "newt15.2.mp3",
        "sourceColumn": 29
      },
      {
        "id": "step-10",
        "kind": "record",
        "text": "100s倒计时：录音作答",
        "seconds": 100,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 32
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 7,
      "range": "A7:AI7"
    },
    "conflict": ""
  },
  {
    "id": "junior-exam-reading",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "reading",
    "mode": "exam",
    "modeLabel": "中考流控",
    "section": "四：朗读短文",
    "questionType": "朗读",
    "intro": "四：朗读短文；现在，你有90秒钟的时间浏览短文并做录音准备。",
    "introAudio": "Langduduanwenzhunbei.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "read",
        "text": "90s倒计时：阅读试题",
        "seconds": 90,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "narration",
        "text": "播报：下面，请准备录音。听到录音提示音后，在100秒内完成朗读。",
        "seconds": null,
        "perQuestion": null,
        "audio": "Langduzuoda.mp3",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "record",
        "text": "100s倒计时：录音作答",
        "seconds": 100,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 8,
      "range": "A8:AI8"
    },
    "conflict": ""
  },
  {
    "id": "junior-fallback-long",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "long",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "一：听后选择",
    "questionType": "听长对话回答2个问题",
    "intro": "听后选择；听对话或独白前，你将有5秒钟的时间阅读每小题。听完后，每小题将有5秒钟的作答时间。每段对话或独白你将听两遍。",
    "introAudio": "ddthxz1.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答以下小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthxz2.mp3",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时：阅读试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 20
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 9,
      "range": "A9:AI9"
    },
    "conflict": ""
  },
  {
    "id": "junior-fallback-passage",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "passage",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "一：听后选择",
    "questionType": "听短文回答问题",
    "intro": "听后选择；听对话或独白前，你将有5秒钟的时间阅读每小题。听完后，每小题将有5秒钟的作答时间。每段对话或独白你将听两遍。",
    "introAudio": "ddthxz1.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段独白，回答以下小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthxzdb.mp3",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时：阅读试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "write",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 20
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 10,
      "range": "A10:AI10"
    },
    "conflict": ""
  },
  {
    "id": "junior-fallback-answer",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "answer",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "二：听后回答",
    "questionType": "听后回答（北京）",
    "intro": "听后回答；听对话，根据所听内容口头回答问题。每小题你在听到录音提示音后，有10秒钟的作答时间。每段对话你将听两遍。",
    "introAudio": " ddthhd.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答该小题。现在，你有5秒钟的时间阅读这道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthhd1.mp3",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "5s倒计时：阅读试题",
        "seconds": 5,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "narration",
        "text": "播报：下面，请准备录音，听到录音提示音后在10秒钟内完成作答。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthhdzd.mp3",
        "sourceColumn": 20
      },
      {
        "id": "step-7",
        "kind": "record",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 23
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 11,
      "range": "A11:AI11"
    },
    "conflict": ""
  },
  {
    "id": "junior-fallback-answer-group",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "answer-group",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "二：听后回答",
    "questionType": "听后回答（北京）组合题",
    "intro": "听后回答；听对话，根据所听内容口头回答问题。每小题你在听到录音提示音后，有10秒钟的作答时间。每段对话你将听两遍。",
    "introAudio": " ddthhd.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "narration",
        "text": "播报：听下面一段对话，回答两道小题。现在，你有10秒钟的时间阅读这两道小题。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthhd2.mp3",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "read",
        "text": "10s倒计时：阅读试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "narration",
        "text": "播报：下面，请准备录音，听到录音提示音后在10秒钟内完成作答。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthhdzd.mp3",
        "sourceColumn": 20
      },
      {
        "id": "step-7",
        "kind": "record",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 23
      },
      {
        "id": "step-8",
        "kind": "narration",
        "text": "播报：下面，请准备录音，听到录音提示音后在10秒钟内完成作答。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthhdzd.mp3",
        "sourceColumn": 26
      },
      {
        "id": "step-9",
        "kind": "record",
        "text": "10s倒计时：作答试题",
        "seconds": 10,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 29
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 12,
      "range": "A12:AI12"
    },
    "conflict": ""
  },
  {
    "id": "junior-fallback-retell",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "retell",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "三：听后转述",
    "questionType": "说话",
    "intro": "听后转述；听短文，根据所听内容和提示信息，完成转述。听短文前你将有1分钟的准备时间，听3遍短文后，你将有2分钟的时间做转述准备，然后在100秒内完成转述并录音。",
    "introAudio": "ddthzs.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "read",
        "text": "60s倒计时：阅读试题",
        "seconds": 60,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      },
      {
        "id": "step-4",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 16
      },
      {
        "id": "step-5",
        "kind": "wait",
        "text": "3s倒计时：准备下一遍",
        "seconds": 3,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 18
      },
      {
        "id": "step-6",
        "kind": "audio",
        "text": "播放题干",
        "seconds": null,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 20
      },
      {
        "id": "step-7",
        "kind": "narration",
        "text": "播报：现在你有两分钟的时间做转述准备，转述的开头已给出。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthzszb.mp3",
        "sourceColumn": 23
      },
      {
        "id": "step-8",
        "kind": "prepare",
        "text": "120s倒计时：转述准备",
        "seconds": 120,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 26
      },
      {
        "id": "step-9",
        "kind": "narration",
        "text": "播报：下面请准备录音，听到录音提示音后在100秒中内完成转述。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddthzszd.mp3",
        "sourceColumn": 29
      },
      {
        "id": "step-10",
        "kind": "record",
        "text": "100s倒计时：录音作答",
        "seconds": 100,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 32
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 13,
      "range": "A13:AI13"
    },
    "conflict": ""
  },
  {
    "id": "junior-fallback-reading",
    "province": "11",
    "city": "*",
    "stage": "初中",
    "type": "reading",
    "mode": "fallback",
    "modeLabel": "兜底流程",
    "section": "四：朗读短文",
    "questionType": "朗读",
    "intro": "朗读短文；现在，你有90秒钟的时间浏览内容并做录音准备。",
    "introAudio": "ddlddw.mp3",
    "steps": [
      {
        "id": "step-1",
        "kind": "read",
        "text": "90s倒计时：阅读试题",
        "seconds": 90,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 8
      },
      {
        "id": "step-2",
        "kind": "narration",
        "text": "播报：下面，请准备录音。听到录音提示音后，在100秒内完成朗读。",
        "seconds": null,
        "perQuestion": null,
        "audio": "ddlddwzd.mp3",
        "sourceColumn": 11
      },
      {
        "id": "step-3",
        "kind": "record",
        "text": "100s倒计时：录音作答",
        "seconds": 100,
        "perQuestion": null,
        "audio": "",
        "sourceColumn": 14
      }
    ],
    "source": {
      "file": "流控梳理.xlsx",
      "sheet": "北京初中",
      "row": 14,
      "range": "A14:AI14"
    },
    "conflict": ""
  }
];
