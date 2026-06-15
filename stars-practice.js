// 群星AI教育平台 - 实践工坊引擎 v3
// 自动生成于 2026-06-11
(function(){
var PRACTICE = window.StarsPractice = window.StarsPractice || {};

// HTML转义，防止XSS
function escapeHTML(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// 课程级配置 (5个任务)
var COURSE_TASKS = {
  "AI是什么": {
    aiPrompt: "你是一位专业、耐心的AI教育导师。请用积极鼓励的语气，对初二学生的学习成果给予肯定的同时提出建设性意见。",
    tasks: [
      {id:"task1",title:"概念复述",desc:"用自己的话解释AI是什么，并举3个生活中的例子",instruction:"欢迎来到AI是什么的综合练习！请用你自己的话解释什么是人工智能——不要背定义，用你自己的理解。然后列举3个你日常生活中遇到的AI应用，并简单分析每个应用背后的技术逻辑。",evaluator:"用户用自己的话解释了AI并列举了3个实际应用即通过。回复'通过！'"},
      {id:"task2",title:"分类挑战",desc:"判断10个AI应用属于弱AI、强AI还是超AI",instruction:"我会给你10个AI应用的描述，请判断每个属于弱AI（当前技术可实现）、强AI/AGI（尚未实现）还是超AI（理论概念）。每次给你一个，你分析后给出判断和理由。准备好了吗？",evaluator:"用户正确判断了至少8个场景的分类即通过。回复'通过！'"},
      {id:"task3",title:"历史排序",desc:"把8个AI历史事件按时间顺序排列",instruction:"人工智能的发展贯穿70年。我给你8个AI历史上的重要事件（打乱顺序），请你按时间先后排列。排完后选3个你认为最重要的，解释为什么。准备好了吗？",evaluator:"用户正确排序了AI历史事件即通过。回复'通过！'"},
      {id:"task4",title:"边界的智慧",desc:"分析一个AI应用能做什么和不能做什么",instruction:"选择一个你熟悉的AI应用，从能力边界、伦理问题、未来方向三个维度各写一段分析。要包含具体的例子，而不是泛泛而谈。",evaluator:"用户进行了有深度的三维度分析即通过。回复'通过！'"},
      {id:"task5",title:"我的AI观",desc:"写一篇300字的短文：AI对你这一代意味着什么",instruction:"作为00后/10后，你们是'AI原住民'——从记事起AI就是世界的一部分。请写一篇300字左右的短文，标题自拟，谈谈你对AI的思考和态度：它让你兴奋吗？担忧吗？你打算怎么和它相处？",evaluator:"用户写出300字以上有个人观点的短文即通过。回复'通过！'"},
    ]
  },
  "AI基础知识": {
    aiPrompt: "你是一位专业、耐心的AI教育导师。请用积极鼓励的语气，对初二学生的学习成果给予肯定的同时提出建设性意见。",
    tasks: [
      {id:"task1",title:"范式对比",desc:"用表格对比监督学习、无监督学习、强化学习的区别",instruction:"请用表格的形式对比监督学习、无监督学习和强化学习在以下维度上的区别：数据要求、学习目标、典型应用、代表算法、优势和局限。每个维度至少写一句话。",evaluator:"用户完成了至少5个维度的对比且内容准确即通过。回复'通过！'"},
      {id:"task2",title:"数据思维",desc:"分析一个真实数据集的清洗和预处理策略",instruction:"我给你一个描述：一个包含10000条用户信息的CSV文件，其中有姓名、年龄、电话、消费金额、注册日期五个字段。但这个数据集有问题——请你分析可能存在哪些数据质量问题，并设计处理方案。",evaluator:"用户识别了常见数据问题并设计了合理方案即通过。回复'通过！'"},
      {id:"task3",title:"过拟合侦探",desc:"判断4个训练场景中的过拟合/欠拟合问题",instruction:"我会给你4个模型训练的场景描述。对每个场景，判断模型是过拟合、欠拟合还是刚好，并给出你的诊断依据和改进建议。",evaluator:"用户正确诊断了至少3个场景并给出合理建议即通过。回复'通过！'"},
      {id:"task4",title:"特征工程挑战",desc:"为一个预测任务设计至少8个特征",instruction:"假设你要预测一个学生某次考试的成绩。你手头有该学生过去的所有考试记录。请设计至少8个你认为有预测力的特征，并解释每个特征为什么可能有用。",evaluator:"用户设计至少8个有意义特征并解释理由即通过。回复'通过！'"},
      {id:"task5",title:"全流程设计",desc:"设计一个从问题定义到部署的完整AI项目方案",instruction:"请设计一个你的AI项目——从你想解决什么问题开始，到数据、建模、评估、部署的全流程。这不是让你真的做，是锻炼你的全局思维。",evaluator:"用户写出了包含至少5个阶段的完整项目方案即通过。回复'通过！'"},
    ]
  },
  "AI原理实战": {
    aiPrompt: "你是一位专业、耐心的AI教育导师。请用积极鼓励的语气，对初二学生的学习成果给予肯定的同时提出建设性意见。",
    tasks: [
      {id:"task1",title:"原理讲述",desc:"向一个完全不懂的人解释梯度下降",instruction:"假设你要向你最好的朋友（完全不懂数学和编程）解释什么是梯度下降。请你用比喻、故事或任何你觉得能让人理解的方式——但不能用数学公式。",evaluator:"用户用通俗易懂的方式成功解释了梯度下降即通过。回复'通过！'"},
      {id:"task2",title:"网络设计",desc:"为一个多分类任务设计神经网络结构",instruction:"设计一个神经网络来识别10种不同动物的照片（尺寸为64x64像素的彩色图片）。请描述：各层结构、激活函数选择、参数量、以及你这样设计的理由。",evaluator:"用户设计了合理的网络结构并解释理由即通过。回复'通过！'"},
      {id:"task3",title:"Attention可视化",desc:"用自己的语言描述Self-Attention的工作过程",instruction:"不用公式，用你自己的语言描述Self-Attention是怎么让模型理解'我爱你'中'爱'和'我'、'你'的关系的。越形象越好。",evaluator:"用户用形象的语言正确描述了Self-Attention机制即通过。回复'通过！'"},
      {id:"task4",title:"CNN架构分析",desc:"分析一个经典CNN架构的层间特征演变",instruction:"选择一个你了解的CNN架构（如VGG、ResNet），描述从第一层到最后一层，每一层大概学到了什么特征。为什么浅层学边缘而深层学物体？",evaluator:"用户描述了CNN的层级特征提取过程即通过。回复'通过！'"},
      {id:"task5",title:"训练实战设计",desc:"为一个图像分类任务设计完整的训练方案",instruction:"你要训练一个模型识别猫和狗。请设计完整的训练方案：数据准备、模型选择、损失函数、优化器、训练步骤、评估方法。",evaluator:"用户设计了逻辑完整的训练方案即通过。回复'通过！'"},
    ]
  },
  "如何与AI对话": {
    aiPrompt: "你是一位专业、耐心的AI教育导师。请用积极鼓励的语气，对初二学生的学习成果给予肯定的同时提出建设性意见。",
    tasks: [
      {id:"task1",title:"Prompt对决",desc:"为同一任务写好Prompt和差Prompt对比效果",instruction:"选一个你想让AI完成的具体任务。先写一个你觉得'差'的Prompt（模糊的、缺少关键的），再写一个'好'的Prompt（包含角色、任务、格式、约束四要素）。如果条件允许，分别用两个Prompt测试并对比效果。",evaluator:"用户写出了包含四要素的优质Prompt即通过。回复'通过！'"},
      {id:"task2",title:"少样本魔法",desc:"用3个例子教AI完成一个格式化任务",instruction:"设计一个你需要AI反复完成的格式化任务（比如把非结构化的文字整理成表格）。写3个示例（输入→期望输出），然后用这3个示例做Few-shot Prompt。",evaluator:"用户设计了有效的Few-shot Prompt即通过。回复'通过！'"},
      {id:"task3",title:"思维链挑战",desc:"用思维链Prompt让AI解决一个需要多步推理的问题",instruction:"找一个需要多步推理的问题（数学、逻辑、规划类）。分别用普通Prompt和思维链Prompt测试AI，记录两次回答的差异。",evaluator:"用户完成了思维链对比实验即通过。回复'通过！'"},
      {id:"task4",title:"多轮对话",desc:"和AI进行至少5轮的深度对话",instruction:"选一个稍微复杂的话题（职业规划、学习方法、创意策划等），和AI进行至少5轮对话。记录对话并总结：AI在哪轮表现最好？哪轮出现了问题？你用了什么策略？",evaluator:"用户完成了5轮以上对话并进行了反思即通过。回复'通过！'"},
      {id:"task5",title:"AI协作文档",desc:"用AI辅助完成一篇完整文档的创作",instruction:"选一个你需要写的文档（读书笔记、学习计划、项目方案等），用AI协作完成。展示：1)你最初的想法 2)你和AI的对话过程 3)最终成品 4)AI做了什么、你做了什么。",evaluator:"用户完成了一份人机协作文档并清楚标注了分工即通过。回复'通过！'"},
    ]
  },
  "AI绘画实战": {
    aiPrompt: "你是一位专业、耐心的AI教育导师。请用积极鼓励的语气，对初二学生的学习成果给予肯定的同时提出建设性意见。",
    tasks: [
      {id:"task1",title:"Prompt大师",desc:"为一张'想象中的画'写完整的六维度Prompt",instruction:"想象一幅你心目中完美的画。按照六维度（主体、风格、构图、光线、色调、细节）写完整的Prompt。如果你有AI绘画工具，请实际生成并展示结果。",evaluator:"用户写出了六维度完整Prompt即通过。回复'通过！'"},
      {id:"task2",title:"风格实验室",desc:"同一个主体用5种不同风格描述生成",instruction:"选一个简单的主体（比如'a cat'或'a castle'），设计5种不同风格的Prompt描述（如油画、水彩、赛博朋克、浮世绘、像素风等）。如果可能，实际生成对比效果。",evaluator:"用户设计了5种不同风格的Prompt即通过。回复'通过！'"},
      {id:"task3",title:"参数指挥官",desc:"设计参数对比实验并分析效果",instruction:"选一个固定Prompt，设计一个参数对比实验——至少对比3种不同的参数组合（如不同--ar值、不同--s值）。分析每个参数对画面的具体影响。",evaluator:"用户设计了参数对比实验并进行了分析即通过。回复'通过！'"},
      {id:"task4",title:"图生图策略",desc:"设计一个'照片变画作'的完整图生图方案",instruction:"假设你有一张你房间的照片。你要把它变成一幅'吉卜力工作室风格的动画场景'。请设计完整的图生图策略：需要什么设置？Prompt怎么写？去噪强度多少？哪些部分可能需要Inpainting？",evaluator:"用户设计了详细合理的图生图方案即通过。回复'通过！'"},
      {id:"task5",title:"变现蓝图",desc:"设计自己的AI绘画商业计划",instruction:"如果你想靠AI绘画赚零花钱，你有什么计划？选择一条变现路径，写一个初步的商业计划：你的定位（做什么类型的图？）、你的客户是谁？、你的定价？、你第一个月要做什么？",evaluator:"用户写出了一个有可行性的商业化思考即通过。回复'通过！'"},
    ]
  },
  "AI文案实战": {
    aiPrompt: "你是一位专业、耐心的AI教育导师。请用积极鼓励的语气，对初二学生的学习成果给予肯定的同时提出建设性意见。",
    tasks: [
      {id:"task1",title:"文案医生",desc:"诊断并改进一段写得不好的文案",instruction:"我会给你一段写得不好（太广告腔、空洞、没有结构）的产品文案。请分析这段文案的问题，然后用你学到的框架（AIDA/PAS/FAB任选一个）重新写一遍。",evaluator:"用户正确诊断了文案问题并用框架重写了即通过。回复'通过！'"},
      {id:"task2",title:"场景切换",desc:"同一产品写三种不同平台的文案",instruction:"选一个你熟悉的产品/服务/APP。分别为它写：1)小红书种草笔记风格 2)微信公众号推广风格 3)抖音短视频脚本风格。三种风格要明显不同。",evaluator:"用户完成了三种平台风格的文案创作即通过。回复'通过！'"},
      {id:"task3",title:"框架组合",desc:"用AIDA+PAS+FAB组合框架写一篇完整文案",instruction:"自选主题，用AIDA（结构）+PAS（痛点开头）+FAB（产品介绍）三个框架组合，写一篇完整的营销文案。标注每个框架在文案的哪个部分。长度至少300字。",evaluator:"用户写出了清晰标注框架的300+字文案即通过。回复'通过！'"},
      {id:"task4",title:"Brief挑战",desc:"为一个'最难描述的产品'写Brief",instruction:"选一个你觉得特别难用文字描述的产品或概念（可以是抽象的，比如'一种让你开心的感觉'），写一份完整的Brief。你的Brief要让AI能生成有意义的相关文案。",evaluator:"用户为抽象概念写出了清晰可执行的Brief即通过。回复'通过！'"},
      {id:"task5",title:"AI文案工作流",desc:"设计从需求到发布的完整AI文案生产流程",instruction:"请为'群星AI教育平台'设计一整套AI文案生产工作流。从获取需求到最终发布，每一步AI怎么辅助、人做什么决策。画出流程并解释每一步的目的。",evaluator:"用户设计了逻辑合理、步骤清晰的完整工作流即通过。回复'通过！'"},
    ]
  },
};

var LESSON_TASKS = {
  "什么是人工智能？": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"发现身边的AI",desc:"列出你今天遇到的5个AI应用，判断每个用的是传统编程还是机器学习",instruction:"请仔细观察今天的生活，找出至少5个AI应用场景。对每个应用，分析它更可能使用传统编程（人工编写规则）还是机器学习（从数据中学习）。举个例子：手机人脸解锁用的是机器学习。准备好了就告诉我你的发现。",evaluator:"用户列出至少5个AI应用并正确分析即通过"},
      {id:"t2",title:"AI三要素分析",desc:"选一个你熟悉的AI应用，从数据、算法、算力三个维度分析",instruction:"请选一个你熟悉的AI应用（比如淘宝推荐、百度搜索、Siri等），尝试从数据、算法、算力三个维度分析。不需要专业术语，用你自己的理解来描述就好。准备好了就开始吧！",evaluator:"用户从三个维度进行了合理分析即通过"},
    ]
  },
  "AI简史：从图灵到达特茅斯": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"AI时间线制作",desc:"画出AI发展时间线，标注5个重要里程碑",instruction:"请你根据学到的AI历史，自己画一条AI发展时间线。至少包含5个重要的里程碑事件。不要求精确到年份，重要的是你能解释为什么这个事件很重要。准备好了就开始吧！",evaluator:"用户列出至少5个AI历史事件并解释重要性即通过"},
      {id:"t2",title:"图灵测试设计",desc:"设计一个问题来测试AI是否"真正理解"",instruction:"假设你要给一个聊天AI做图灵测试。请想出一个巧妙的问题或对话策略，能够区分它是在"真正理解"还是在"统计式接话"。解释为什么你认为这个问题能测出真正的智能。发挥创造力！",evaluator:"用户设计了有创意且逻辑合理的问题即通过"},
    ]
  },
  "AI的分类：弱AI、强AI与超AI": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"弱AI能力边界测试",desc:"找AI助手设计5个问题测试它的"强弱边界"",instruction:"找一个你可以使用的AI助手，设计5个不同类型的问题来测试它的能力边界。问题可以包括：需要常识推理的、需要数学计算的、需要创造力的、需要情感理解的、以及需要"知道自己不知道什么"的。记录回答并分析。准备好了吗？",evaluator:"用户设计5个不同类型问题并分析了AI表现即通过"},
      {id:"t2",title:"AGI时间预测",desc:"基于你学到的知识，预测AGI何时到来，用至少3个论据支持",instruction:"很多专家对AGI何时到来有不同看法。请预测一个你认为合理的时间点，并给出至少3个支持你观点的论据。不要求答对（因为没人知道答案），但要求推理有逻辑。准备好了就开始吧！",evaluator:"用户提供时间预测并给出至少3个有逻辑的论据即通过"},
    ]
  },
  "AI能做什么，不能做什么": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"AI幻觉打假实验",desc:"设计5个你专业领域的问题问AI，看它是否"编造"内容",instruction:"从你最熟悉的领域设计5个你自己知道答案的问题。测试AI会不会给出看似合理但实际错误的答案。记录并分析。",evaluator:"用户设计并完成测试，分析了AI回答准确性即通过"},
      {id:"t2",title:"AI伦理情景判断",desc:"选一个AI伦理困境，写300字分析AI的局限性",instruction:"从以下选一个AI伦理问题：1）自动驾驶在不可避免的事故中应优先保护乘客还是行人？2）AI招聘发现某些特征和"好员工"有统计相关性，应该使用吗？3）如果AI比你更了解你的心理状态，它应该替你做某些人生决定吗？写300字分析。",evaluator:"用户选择伦理问题写出合理分析即通过"},
    ]
  },
  "机器学习：AI的核心引擎": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"学习范式分类挑战",desc:"判断10个AI场景适合哪种学习范式",instruction:"判断以下场景适合监督学习(S)、无监督学习(U)还是强化学习(R)：识别手写数字、给客户分群、训练机器人走路、预测房价、发现异常账户、下围棋、垃圾邮件检测、推荐相似商品、自动驾驶决策、文本情感分析。对每个给出判断和理由。",evaluator:"用户正确分类至少8个场景即通过"},
      {id:"t2",title:"设计一个ML项目流程",desc:"自选一个问题，画出完整的机器学习项目流程",instruction:"你想用机器学习解决什么问题？请画出从数据收集到最终部署的完整流程，每一步写清楚你要做什么、为什么、可能的难点。",evaluator:"用户描述完整ML项目流程即通过"},
    ]
  },
  "深度学习与神经网络入门": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"手算一个神经元",desc:"给定输入和权重，手动计算神经元输出",instruction:"一个简单神经元：输入x1=2,x2=3,x3=1，权重w1=0.5,w2=-0.3,w3=0.8，偏置b=0.1。请计算加权求和结果，以及使用ReLU激活后的输出。展示计算步骤。",evaluator:"用户正确计算即通过"},
      {id:"t2",title:"设计一个简单神经网络",desc:"设计能识别三种水果图片的网络结构",instruction:"你要设计识别苹果、香蕉、橙子的神经网络。请说明：输入层、隐藏层、输出层的设计以及为什么需要隐藏层。",evaluator:"用户合理解释网络各层设计即通过"},
    ]
  },
  "AI的伦理与社会影响": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"AI偏见案例分析",desc:"搜索一个AI偏见的真实案例并写300字分析",instruction:"搜索或回忆一个AI偏见的真实案例。描述具体情况，分析偏见来源（数据问题还是算法问题？），提出你认为合理的解决方案。",evaluator:"用户描述真实AI偏见案例并进行合理分析即通过"},
      {id:"t2",title:"就业未来推演",desc:"选一个职业分析AI对它的影响",instruction:"选择一个你感兴趣的职业，分析AI在5-10年内会对它产生什么具体影响。哪些环节会被自动化？哪些环节AI反而能增强人的能力？",evaluator:"用户选择职业并进行具体有深度的分析即通过"},
    ]
  },
  "AI的未来图景": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"未来AI应用创意",desc:"设计一个5-10年内可能出现的AI应用",instruction:"发挥想象力！基于多模态、具身智能、AI Agent等趋势，想一个5-10年内可能出现的AI应用。描述它解决什么问题、怎么运作、为什么会改变人们的生活。",evaluator:"用户设计有创造力但技术上合理的AI应用即通过"},
      {id:"t2",title:"AI学习计划",desc:"制定一个3个月的个人AI学习计划",instruction:"学完AI是什么课程后，制定接下来3个月的个人AI学习计划。包含要深入的方向、每周时间投入、学习资源、具体目标。",evaluator:"用户制定具体可实现的学习计划即通过"},
    ]
  },
  "监督学习详解": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"监督学习任务分类",desc:"判断10个AI任务是分类还是回归",instruction:"判断以下任务是分类(C)还是回归(R)：预测明天温度、判断邮件是否垃圾、预测房价、判断照片是否猫、预测学生成绩、判断文字情感、预测股票价格、诊断肺炎、预测客户流失、预测视频播放量。对每个给出理由。",evaluator:"用户完成任务即通过"},
      {id:"t1",title:"找一组监督学习数据",desc:"从身边找一个可用监督学习解决的问题并设计数据方案",instruction:"从日常生活或学习中想一个可用监督学习解决的问题。描述问题、数据类型、输入和标签、需要多少样本、收集难点。",evaluator:"用户完成任务即通过"},
    ]
  },
  "无监督学习：发现隐藏结构": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"动手聚类实验",desc:"收集15个物品做手动聚类",instruction:"收集10-15个身边物品列出2-3个特征(大小、颜色、用途等)。手动做一次聚类——你觉得可以分几组？每组特征是什么？如果让电脑做需要什么指令？",evaluator:"用户完成任务即通过"},
      {id:"t1",title:"降维思想应用",desc:"用降维思路简化一个复杂问题",instruction:"想一个你遇到的复杂问题它有很多维度。如果只能保留最重要的2-3个维度来描述你会选哪几个？为什么？丢掉其他维度会损失什么信息？",evaluator:"用户完成任务即通过"},
    ]
  },
  "强化学习：试错中成长": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"设计强化学习任务",desc:"为一个日常场景设计强化学习奖励系统",instruction:"选一个日常场景(如学骑自行车、提高考试成绩、学做饭)用强化学习框架分解。Agent/State/Action/Reward是什么？奖励设计会不会引导AI学到"坏策略"？",evaluator:"用户完成任务即通过"},
    ]
  },
  "数据：AI的燃料": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:""脏数据"诊断",desc:"分析数据集的数据质量问题并给出方案",instruction:"假设你接手一个AI项目前人留的数据有1000条：200条缺年龄、15条身高超过300cm、电话格式五花八门、10%样本完全重复、备注列夹杂无用文字。逐条分析每个问题并给出处理方案。",evaluator:"用户完成任务即通过"},
    ]
  },
  "特征工程：让数据说话": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"特征设计挑战",desc:"为预测B站视频会不会火设计特征",instruction:"你要预测B站视频会不会火。手头有标题文本、发布时间、视频时长、UP主粉丝数、历史平均播放量。设计至少5个有预测力的特征(至少2个是创造性组合或变换的)。解释每个为什么可能有预测力。",evaluator:"用户完成任务即通过"},
    ]
  },
  "模型评估：好坏的标准": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"混淆矩阵实战计算",desc:"计算医疗AI的准确率、精确率、召回率和F1",instruction:"癌症筛查AI对200人检测：20人真的患癌180人健康。结果：正确找出16个(TP)错误诊断4个健康人为癌症(FP)漏掉4个癌症患者(FN)正确判断176个健康人(TN)。计算准确率、精确率、召回率、F1。这个AI适合做癌症筛查吗？",evaluator:"用户完成任务即通过"},
    ]
  },
  "过拟合与欠拟合": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"过拟合诊断",desc:"分析模型是过拟合还是欠拟合并给出优化方案",instruction:"你训练识别手写数字的神经网络。训练集准确率99.5%测试集85%。这是过拟合还是欠拟合？为什么？列举至少三种优化方法每种预计产生什么效果。",evaluator:"用户完成任务即通过"},
    ]
  },
  "模型选择与交叉验证": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"模型选择决策树",desc:"为三个不同场景推荐最合适模型",instruction:"场景1：预测房价(10000条数据50个数值特征) 场景2：判断文字情感(50000条文本数据) 场景3：在卫星图中找违法砍伐痕迹(1000张图片)。对每个推荐合适模型并说明理由。",evaluator:"用户完成任务即通过"},
    ]
  },
  "AI项目全流程实战": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"AI项目设计书",desc:"设计一个完整AI项目方案",instruction:"设计一个你有价值也有可行性的AI项目。写一份覆盖七个阶段的设计书：问题定义、数据获取、数据预处理、模型选择、评估方法、部署方案、监控维护。写200字以上。",evaluator:"用户完成任务即通过"},
    ]
  },
  "线性回归：AI的Hello World": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"手算线性回归",desc:"给一组(x,y)数据点，用最小二乘法手动估算w和b",instruction:"给你5个数据点：(1,2)(2,4)(3,5)(4,7)(5,8)。请凭直觉估算最佳拟合直线上w和b的大概值。然后思考：你是怎么估算的？这个过程和数学上的"最小二乘法"有什么相似之处？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"多元回归特征分析",desc:"分析预测深圳二手房价格需要哪些特征",instruction:"你要用多元线性回归预测深圳二手房价格。请列出至少8个你认为有预测力的特征（如面积、楼层等），判断每个特征的权重应该是正还是负，并给出理由。",evaluator:"用户完成任务即通过"},
    ]
  },
  "梯度下降：AI如何学习": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"手动梯度下降模拟",desc:"用二次函数模拟梯度下降迭代过程",instruction:"损失函数J(w)=w²+4w+6。从w=5开始，学习率=0.3。手动计算前3步：求J对w的导数(梯度)，用梯度下降公式更新w，计算每步更新后的J值。观察J是否在下降。展示完整计算过程。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"学习率实验分析",desc:"分析不同学习率对训练的影响",instruction:"请分析三种情况：1)学习率太小(如0.00001)——训练过程会怎样？有什么问题？2)学习率太大(如100)——会怎样？3)你怎么判断一个学习率"刚刚好"？不需要数学计算，需要你对概念的理解。",evaluator:"用户完成任务即通过"},
    ]
  },
  "神经网络的基本结构": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"设计一个简单网络",desc:"为手写数字识别(0-9)设计网络结构",instruction:"你要设计识别28×28手写数字(0-9)的神经网络。请说明：输入层几个神经元？隐藏层几层、每层多少神经元？输出层怎么设计？为什么这样选择？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"激活函数选择",desc:"判断不同场景该用哪种激活函数",instruction:"三个场景分别用哪种激活函数？1)网络中间隐藏层 2)输出0到1之间概率 3)输出10个类别概率分布。说明每种选择的理由。",evaluator:"用户完成任务即通过"},
    ]
  },
  "反向传播：学习的引擎": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"链式法则手算",desc:"给定复合函数手动计算梯度",instruction:"函数L=(wx+b-y)²。其中x=2,y=5,w=1,b=1。计算：L对w的偏导数和L对b的偏导数。用链式法则——先对外层平方求导，再对内层分别对w和b求导。展示步骤。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"梯度消失直观解释",desc:"不用数学公式解释为什么深层网络的梯度会消失",instruction:"用你自己的语言和比喻，向完全不懂AI的朋友解释：为什么神经网络层数太多后前面几层就"学不到东西"了。试着用"传话游戏"的比喻——第一个人说一句话经过100个人传下去，最后听到的可能面目全非。",evaluator:"用户完成任务即通过"},
    ]
  },
  "卷积神经网络（CNN）": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"卷积运算手算",desc:"用3×3滤波器在5×5图像上模拟卷积",instruction:"一个5×5灰度图像（所有像素值都是1），用一个3×3滤波器做卷积（所有滤波器权重也是1）。计算卷积后的输出尺寸和每个位置的值。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"CNN应用场景分析",desc:"为食物识别任务设计CNN配置",instruction:"你要设计拍食物照片识别100种菜的系统。请设计输入输出配置、不同层大概会学到什么特征、可能的问题和解决方案。",evaluator:"用户完成任务即通过"},
    ]
  },
  "循环神经网络与LSTM": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"RNN隐藏状态推算",desc:"手动计算2步简单RNN的隐藏状态和输出",instruction:"一个简单RNN：h_t=tanh(0.5×h_{t-1}+0.8×x_t)，y_t=0.6×h_t。h_0=0,x_1=1,x_2=0。tanh(0.8)≈0.664。请计算h_1,y_1,h_2,y_2。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"LSTM门控机制解释",desc:"用自己的话和比喻解释LSTM的三个门",instruction:"LSTM有三个门：遗忘门、输入门、输出门。请用你自己的语言和生活比喻解释它们各自的作用——不要用专业术语。",evaluator:"用户完成任务即通过"},
    ]
  },
  "Transformer架构深度解析": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"Attention权重推理",desc:"分析一句话中的Attention关系",instruction:"分析这句的Attention模式："小明把小红的书还给了她，因为她昨天催了他。"请问：1)"她"最可能关注哪两个词？2)"他"最可能关注哪个词？3)为什么"小明"和"小红"之间Attention权重较高？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"Transformer vs RNN对比",desc:"比较两种架构优劣",instruction:"用你自己的语言比较Transformer和RNN：为什么Transformer处理长文本更快？RNN有什么Transformer没有的优势？处理一整本书你会选哪种架构？",evaluator:"用户完成任务即通过"},
    ]
  },
  "大语言模型的训练": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"RLHF流程梳理",desc:"用自己的语言描述RLHF三步",instruction:"请用你自己的语言向完全不懂AI的朋友解释RLHF怎么让AI变得更"会聊天"。不用专业术语，用生活中的比喻。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"Scaling Law思考",desc:"分析为什么"更大"不总是"更好"",instruction:"Scaling Law说模型越大表现越好——但真的越大越好吗？分析更大模型有什么代价？有没有可能一个精心设计的小模型在特定任务上比通用大模型更好？",evaluator:"用户完成任务即通过"},
    ]
  },
  "动手训练你的第一个模型": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"写训练伪代码",desc:"用伪代码写出训练手写数字识别模型的完整流程",instruction:"用伪代码写出训练手写数字识别(MNIST)模型的流程：导入什么、如何加载数据、模型长什么样、训练循环里每一步做什么、训练完怎么测试。不需要能运行，但逻辑要完整。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"AI原理课程总结",desc:"回顾整个课程写200字学习感悟",instruction:"恭喜完成AI原理实战全部课程！请写200字以上学习感悟：最让你惊讶的知识点是什么？你现在能理解ChatGPT工作机制到什么程度？下一步想学什么、做什么？",evaluator:"用户完成任务即通过"},
    ]
  },
  "Prompt：AI时代的编程语言": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"Prompt优劣对比",desc:"写同一请求的好Prompt和坏Prompt各一个",instruction:"选一个你想让AI帮你做的事。写两个版本Prompt：一个坏版本(模糊无约束)和一个好版本(具体有结构有明确需求)。解释好版本好在哪。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"AI对话迭代练练",desc:"实际和AI对话迭代优化Prompt",instruction:"找AI助手完成"帮我制定一周学习计划"。先写第一直觉Prompt→分析输出→修改→再试。至少迭代3轮，记录每次改了哪里、AI输出有什么变化。总结最有效的改进。",evaluator:"用户完成任务即通过"},
    ]
  },
  "Prompt基本结构": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"四要素Prompt实战",desc:"写包含四要素的完整Prompt",instruction:"运用四要素(角色、任务、格式、约束)写一个完整Prompt。任务自选。在旁边标注每个要素对应的内容。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"角色影响测试",desc:"同一任务用不同角色设定观察回答差异",instruction:"选一个简单问题如"解释什么是光合作用"。用三个不同角色各问AI一次：1)生物学教授 2)幼儿园老师 3)科幻小说作家。比较三个回答在风格、深度、用词上的差异并分析。",evaluator:"用户完成任务即通过"},
    ]
  },
  "思维链（Chain-of-Thought）": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"思维链对比实验",desc:"对比直接问答和思维链问答同一道题的结果",instruction:"找一道需要推理的数学题(如鸡兔同笼)。先直接问AI答案记录回答。然后重新提问加上"请一步步推理"记录回答。比较两次回答的准确率和推理过程。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"设计思维链Prompt",desc:"为一个复杂任务设计包含思维链的Prompt",instruction:"选一个需要多步推理的任务(数学、逻辑、规划类)。设计一个引导AI一步步思考的Prompt——每一步要清晰标注，最后才给结论。",evaluator:"用户完成任务即通过"},
    ]
  },
  "少样本学习（Few-shot）": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"Few-shot分类器设计",desc:"用Few-shot Prompt让AI做文本分类",instruction:"设计Few-shot Prompt让AI对5条评论做情感分类(正面/中性/负面)。包含2-3个示例(输入→输出)。测试5条新评论记录AI的分类结果。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"例子质量对比",desc:"测试不同质量示例对AI输出的影响",instruction:"选一个任务准备两组示例：A组=精心挑选的多样化高质量示例(3个) B组=随便写的低质量示例(3个)。分别做Few-shot Prompt比较AI输出。分析什么样的示例最好。",evaluator:"用户完成任务即通过"},
    ]
  },
  "角色扮演Prompt": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"角色扮演实战",desc:"设计角色扮演Prompt并测试",instruction:"为学习任务设计角色扮演Prompt。如让AI扮演"苏格拉底"用提问方式教你思考，或让AI扮演"面试官"进行模拟面试。实际使用记录AI反应。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"角色对比实验",desc:"同一任务用不同角色比较效果",instruction:"选一个学习任务(如理解牛顿第一定律)。设计三个角色：A=严肃教授 B=幽默科学段子手 C=用乐高比喻一切的老师。分别比较回答，分析哪种最适合你。",evaluator:"用户完成任务即通过"},
    ]
  },
  "多轮对话策略": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"多轮对话实战",desc:"和AI进行至少5轮深度对话",instruction:"选一个稍微复杂的话题(如制定备考策略)和AI进行至少5轮对话。记录全程，分析：哪轮回答最满意？AI是否在某轮"忘记"了之前讨论的内容？你用了什么策略保持连贯性？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"对话纠错练习",desc:"故意让AI犯错然后练习纠正",instruction:"找一个你熟悉的领域，故意问AI可能答错的问题。当它答错后用清晰而不带情绪的方式纠正它。记录纠正过程和AI的反应。",evaluator:"用户完成任务即通过"},
    ]
  },
  "长文本与复杂任务处理": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"长文本摘要实战",desc:"用分段+摘要法处理一篇2000字以上的文章",instruction:"找一篇2000字以上的文章。用分段摘要法处理：先分段→逐段让AI摘要→最后整合所有摘要生成完整综述。评估效果。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"复杂任务分解",desc:"把一个复杂任务分解成子任务链",instruction:"选一个你最近面对的个人复杂任务(如复习半学期内容或策划班级活动)，分解成AI可辅助的子任务链。每个子任务要具体可执行。选其中一个让AI实际帮你完成。",evaluator:"用户完成任务即通过"},
    ]
  },
  "Prompt调试与优化": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"Prompt版本迭代",desc:"为一个任务写3个版本的Prompt",instruction:"选一个你常用的AI任务。写初版Prompt→使用→找问题→写第2版→可能第3版。记录每个版本的变化和AI输出的对应变化。总结哪个改进最有效。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"建立个人Prompt库",desc:"整理5个你常用的Prompt模板",instruction:"为自己整理5个不同类型Prompt模板：学习类、写作类、规划类、分析类、创意类。每个包含四要素，使用占位符标记可替换部分。",evaluator:"用户完成任务即通过"},
    ]
  },
  "AI协作思维": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"AI+人协作方案",desc:"为一个实际任务设计人机协作方案",instruction:"选一个你最近需要做的实际任务，设计详细的人机协作方案。明确：AI负责什么？你自己负责什么？你们怎么配合？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"课程总结与反思",desc:"写200字以上的课程总结",instruction:"恭喜完成如何与AI对话全部课程！写200字以上总结：最有用的3个技巧？你打算怎么在日常学习中使用？还想探索哪些进阶用法？",evaluator:"用户完成任务即通过"},
    ]
  },
  "AI绘画工具全景": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"工具选择决策",desc:"为自己选一个AI绘画工具并说明理由",instruction:"根据你学到的对比选择最适合你的AI绘画工具。说明你的选择、主要使用场景、电脑配置、预算情况。综合这些因素做合理选择。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"AI绘画作品收集",desc:"收集至少10张不同风格的AI画作并分析",instruction:"网上收集至少10张AI生成的画作。对每张分析：大概用了什么工具？什么风格？Prompt可能是什么样？你最喜欢哪张为什么？整理成观察报告。",evaluator:"用户完成任务即通过"},
    ]
  },
  "Midjourney入门实战": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"生成你的第一张AI画",desc:"用AI绘画工具实际生成一张画",instruction:"写一个包含主体+场景+风格的Prompt，用任何AI绘画工具实际生成一张画。反思：最喜欢什么？哪里不满意？如果要改进会怎么改Prompt？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"Prompt变体实验",desc:"同一主体用不同详细程度的Prompt看效果差异",instruction:"选一个简单主体(如"a cat")。写3个不同详细程度的Prompt：A=最简单 B=中等(加场景和风格) C=最详细(加光线、细节、视角、参数)。分析每个额外关键词可能带来的视觉变化。",evaluator:"用户完成任务即通过"},
    ]
  },
  "Prompt工程：绘画篇": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"Prompt配方设计",desc:"为自己想画的一幅画设计完整六维度Prompt",instruction:"想一幅你真正想生成的画。按六维度(主体、风格、构图、光线、色调、细节)设计完整Prompt。写出来——即使没有工具实际生成也没关系。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"风格融合实验",desc:"尝试混搭两种不同的艺术风格",instruction:"选两种看起来毫不相关的艺术风格(如"浮世绘"+"赛博朋克")设计融合Prompt。思考两种风格有什么可融合的元素？融合后可能产生什么视觉效果？",evaluator:"用户完成任务即通过"},
    ]
  },
  "风格控制与参数详解": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"参数实验矩阵",desc:"设计参数对比实验",instruction:"选一个固定Prompt设计参数对比计划：不同--ar值(1:1,16:9,9:16)、不同--s值(0,500,1000)。分析：参数对画面影响多大？哪个参数变化最明显？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"种子值微调模拟",desc:"描述种子值的实用场景",instruction:"你生成了一张很喜欢的画但觉得色调太冷了。请用种子值概念描述怎样修改：要固定什么？要改什么？期望得到什么结果？为什么种子值不可或缺？",evaluator:"用户完成任务即通过"},
    ]
  },
  "Stable Diffusion本地部署": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"SD部署可行性评估",desc:"评估自己电脑能否运行SD",instruction:"查你的显卡型号和显存、内存、硬盘空间。判断：你的电脑能跑SD吗？如果能适合用哪种安装方式？如果不能选什么替代方案？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"LoRA创意应用",desc:"想出3个LoRA的实际应用场景",instruction:"理解LoRA后想出3个你觉得有用的应用场景。对每个描述：这个LoRA教SD什么？你会在什么情况下用它？它能帮你解决什么创作问题？",evaluator:"用户完成任务即通过"},
    ]
  },
  "ControlNet与精确控制": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"ControlNet场景选择",desc:"为三个具体创作需求选择合适ControlNet模式",instruction:"三个创作需求：1)画跳舞的人有别人跳舞的照片做参考 2)画了简单风景草图想变精美CG画面 3)已生成满意图但主角表情不对。为每个选择合适ControlNet模式并解释理由。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"从草图到成品工作流",desc:"设计用AI实现"草图→成品"的工作流",instruction:"假设你是插画师，设计完整工作流：从潦草铅笔草图到精美AI辅助成品图。至少用到Prompt、ControlNet(Canny/Scribble)、Inpainting。每步做什么、用什么工具、预期产出什么——清楚描述。",evaluator:"用户完成任务即通过"},
    ]
  },
  "图生图与修复技巧": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"图生图场景设计",desc:"设计一个用图生图技术的实际创作场景",instruction:"想一个你可以用图生图来完成的实际创作：把你的照片变艺术风格、把草图变精细稿、给旧照片重新上色和修复。描述原始输入、要加的Prompt、预期的去噪强度、期望的结果。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"修复工作流设计",desc:"规划一个图像修复和提升的完整流程",instruction:"假设你已经用AI生成了比较满意的画——但你觉得"还不错还能更好"。设计完整的后期提升流程至少包括Inpainting修复+图生图调整风格+Upscale。每步用什么工具和设置。",evaluator:"用户完成任务即通过"},
    ]
  },
  "AI绘画应用场景": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"AI绘画商业应用分析",desc:"分析一个行业中AI绘画的应用和影响",instruction:"选一个你感兴趣的行业(游戏、电影、广告、教育等)。分析AI绘画对这个行业的可能影响：哪些工作流程会被改变？对从业者意味着机会还是威胁？"人类创作者"的价值在哪里？写200字以上。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"个人AI绘画项目设计",desc:"为自己设计一个AI绘画创作项目",instruction:"设计你真正想做的小项目：给自己设计头像、给班级做海报、为你喜欢的小说配插图、做手机壁纸。描述项目内容、工具选择、预估工作量、期望效果。",evaluator:"用户完成任务即通过"},
    ]
  },
  "AI绘画商业变现": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"变现路径选择",desc:"选一条最适合你的变现路径并做初步规划",instruction:"根据你的兴趣、技能和时间，选一条你觉得最适合的AI绘画变现路径。写初步计划：选哪条路径？需要准备什么？第一个月做什么？目标收入？",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"AI绘画课程总结",desc:"总结课程收获和下一步计划",instruction:"恭喜完成AI绘画实战全部课程！写200字以上总结：最大三点收获、最想深入练习的方向、计划做的第一个AI绘画项目。",evaluator:"用户完成任务即通过"},
    ]
  },
  "AI文案基础：让AI理解你的需求": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"写一个完整Brief",desc:"按六要素为自己想写的文案写一份Brief",instruction:"假设你要推广一个产品(真实或虚构)。按六要素(目标受众、核心信息、品牌调性、内容格式、字数、参考)写完整Brief。要足够详细——一个不认识你的人看了也能大概知道你要什么。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"Brief质量对比",desc:"写一个差Brief和一个好Brief对比差异",instruction:"为同一个任务写两份Brief：一份"差"的(模糊缺要素无法执行)和一份"好"的(清晰完整可执行)。标注好Brief在每个维度上比差Brief具体在哪。有AI工具的话分别生成对比效果。",evaluator:"用户完成任务即通过"},
    ]
  },
  "文案结构方法论": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"框架实战：PAS",desc:"用PAS框架写100字广告文案",instruction:"用PAS框架为任一款产品(帮初中生背单词的APP、养成早起习惯的闹钟等)写100字以内广告。严格遵循PAS三段式：Problem→Agitate→Solve。标注每一段。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"框架选择决策",desc:"为三个场景选择最合适的文案框架",instruction:"三个场景：1)公众号长文介绍你最喜欢的书 2)抖音带货视频脚本 3)水果店开业促销海报。为每个选最合适框架(可组合)，解释为什么。",evaluator:"用户完成任务即通过"},
    ]
  },
  "小红书种草文案": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t1",title:"写一篇小红书笔记",desc:"用AI辅助写完整小红书种草文案",instruction:"选你最近用过/学过/体验过的真实东西(书、APP、学习方法、零食等)。写小红书风格种草笔记：标题+正文+互动引导。语气真实自然不要像广告，适当emoji和分行，200-400字。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"小红书标题生成",desc:"为一个主题生成5个不同风格标题",instruction:"选一个主题生成5个不同风格小红书标题：数字型、反常识型、情绪型、身份共鸣型、自创组合。分析哪个最吸引你为什么？预期哪个打开率最高？",evaluator:"用户完成任务即通过"},
    ]
  },
  "微信公众号长文创作": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"长文框架设计",desc:"为公众号长文设计完整的AIDA+FAB框架",instruction:"选一个你想写的公众号文章主题。设计完整的AIDA+FAB组合框架：注意→兴趣→欲望→行动→特征→优势→利益。标注每个部分要写什么。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"AI协作写长文",desc:"和AI一起完成一篇公众号长文的创作",instruction:"选一个你感兴趣的话题，用AI协作完成一篇公众号长文。展示：最初想法、你和AI的对话过程、最终成品、AI做了什么你做了什么。",evaluator:"用户完成任务即通过"},
    ]
  },
  "广告投放文案": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"A/B文案对比",desc:"为同一产品写两版不同风格的广告文案",instruction:"选一个你熟悉的产品为你认为它最可能的目标受众写两版A/B测试用的广告文案——一版偏理性(列事实和数据)一版偏感性(讲故事和情感)。解释各自可能的优势和弱点。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"转化公式分解",desc:"分析一篇优秀广告文案用了哪些转化公式",instruction:"网上找一篇你认为转化很好的广告文案。分解它的结构：用了什么开头法？什么框架？什么说服技巧？最关键的那句话是什么？如果你用AI辅助写类似文案你会怎么设计Prompt？",evaluator:"用户完成任务即通过"},
    ]
  },
  "品牌故事与定位文案": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"品牌故事创作",desc:"为你自己的"品牌"写一个品牌故事",instruction:"为你自己(这是你最重要的"品牌")或一个你喜欢的品牌写一个故事。不是"成立于2020年"的简历——是一个能让人记住、让人共鸣、让人愿意转述的故事。300字以上。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"品牌定位分析",desc:"分析一个你喜欢的品牌定位和文案策略",instruction:"选一个你喜欢的品牌分析它的定位策略和文案风格。它和竞争对手怎么区分？它的"品牌人格"是什么？它最打动你的一句话是什么？",evaluator:"用户完成任务即通过"},
    ]
  },
  "短视频脚本创作": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"短视频脚本写作",desc:"为自选主题写一个15-30秒短视频脚本",instruction:"选一个主题写15-30秒短视频脚本。包含：前3秒钩子(如何抓住注意力)、核心内容(用什么方式呈现)、结尾引导(点赞关注评论)。如果可能用AI辅助创作。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"爆款公式分析",desc:"分析3个爆款短视频用了哪些创作公式",instruction:"找3个你喜欢的短视频(任何类型)。分析每个：前3秒用了什么技巧让你没划走？它的核心"爽点"或"价值点"是什么？如果你用AI来辅助创作类似视频脚本你会怎么写Prompt？",evaluator:"用户完成任务即通过"},
    ]
  },
  "文案优化与A/B测试": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"文案多版本优化",desc:"对同一文案写出3个优化版本",instruction:"选一段你之前写的或网上找的文案。写3个优化版本：A=改标题 B=改开头 C=改结尾/行动号召。标注每个版本改了什么和为什么这样改。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"A/B测试方案设计",desc:"为一个实际场景设计完整的A/B测试方案",instruction:"选一个你可能在社交媒体或学校活动中"发布"的内容。设计A/B测试方案：什么是A版什么是B版？你要测什么指标(打开率？互动率？)？怎么判断哪个更好？",evaluator:"用户完成任务即通过"},
    ]
  },
  "AI文案工作流搭建": {
    aiPrompt: "你是一位耐心的学习教练。请鼓励学生完成实践任务，给出积极反馈和建议。",
    tasks: [
      {id:"t2",title:"工作流设计",desc:"为群星AI教育平台设计完整AI文案生产工作流",instruction:"为群星AI教育平台设计从获取文案需求到最终发布的完整AI文案生产工作流。每一步AI怎么辅助、人做什么决策。画出流程并解释每步目的。",evaluator:"用户完成任务即通过"},
      {id:"t2",title:"课程总结",desc:"回顾课程写200字学习感悟",instruction:"恭喜完成AI文案实战全部课程！写200字以上总结：最大收获是什么？你最想应用到实践中的技巧是哪个？下一步打算用AI文案做什么？",evaluator:"用户完成任务即通过"},
    ]
  },
};

// Core engine (condensed)
var state={courseName:'',activeTaskId:null,chatHistory:[],rewardData:{},isLessonMode:false};
function loadRewards(){try{var d=localStorage.getItem('stars_practice_rewards');state.rewardData=d?JSON.parse(d):{}}catch(e){state.rewardData={}}}
function saveRewards(){localStorage.setItem('stars_practice_rewards',JSON.stringify(state.rewardData))}
function getCourseRewards(name){return state.rewardData[name]||{stars:0,completed:[]}}
function completeTask(name,taskId){var r=getCourseRewards(name);if(r.completed.includes(taskId))return;r.completed.push(taskId);r.stars=r.completed.length;if(!r.unlockedAt)r.unlockedAt=Date.now();state.rewardData[name]=r;saveRewards();if(state.isLessonMode&&r.stars>=2||!state.isLessonMode&&r.stars>=5){showCelebration(name,r.stars)}}

function injectPracticeBox(tasks,isLesson){
  var el=document.createElement('section');el.className=isLesson?'article-section':'content-section';
  el.innerHTML='<div class="max-w-6xl mx-auto px-8"><p class="section-label">AI Practice Lab</p><h2 class="section-heading">AI实践工坊</h2><p style="font-size:14px;color:#A0A8B8;margin-bottom:36px">完成练习任务，获得星座徽章奖励</p><div class="practice-grid" id="practiceGrid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px"></div><div class="star-display" id="starDisplay" style="text-align:center;margin-top:28px"></div></div>';
  if(isLesson){
    var nav=document.querySelector('.lesson-nav');if(nav){nav.parentNode.insertBefore(el,nav)}
  }else{
    var modules=document.getElementById('modules');if(modules){modules.parentNode.insertBefore(el,modules.nextSibling)}else{var last=document.querySelector('.content-section:last-of-type');if(last)last.parentNode.insertBefore(el,last)}
  }
  renderTasks(tasks);updateStarDisplay()
}

function renderTasks(tasks){
  var g=document.getElementById('practiceGrid');if(!g)return;
  var r=getCourseRewards(state.courseName);
  g.innerHTML=tasks.map(function(t,i){
    var done=r.completed.includes(t.id);
    var bc=done?'rgba(76,175,80,.3)':'rgba(240,200,80,.12)';
    var nc=done?'#4CAF50':'rgba(240,200,80,.45)';
    var db=done?'<span style="font-size:11px;color:#4CAF50;background:rgba(76,175,80,.1);padding:4px 12px;border-radius:12px">done</span>':'';
    return '<div class="practice-card" data-taskid="'+t.id+'" style="background:#181E40;border:1px solid '+bc+';border-radius:18px;padding:28px;cursor:pointer;transition:all .45s">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'+
      '<span style="font-family:Space Grotesk,sans-serif;font-size:28px;font-weight:700;color:'+nc+'">'+String(i+1).padStart(2,'0')+'</span>'+db+'</div>'+
      '<h4 style="font-size:16px;font-weight:500;color:#E8ECF1;margin-bottom:8px">'+t.title+'</h4>'+
      '<p style="font-size:13px;color:#BCC3CC;line-height:1.6">'+t.desc+'</p></div>';
  }).join('');
  g.querySelectorAll('.practice-card').forEach(function(card){
    card.addEventListener('mouseenter',function(){this.style.borderColor='rgba(240,200,80,.3)';this.style.transform='translateY(-2px)'});
    card.addEventListener('mouseleave',function(){this.style.border='';this.style.transform='none'});
    card.addEventListener('click',function(){PRACTICE.startTask(this.dataset.taskid)});
  });
}

function updateStarDisplay(){
  var d=document.getElementById('starDisplay');if(!d)return;
  var r=getCourseRewards(state.courseName),max=state.isLessonMode?2:5;
  d.innerHTML='<div style=display:flex;justify-content:center;gap:6px>'+Array.from({length:max},function(_,i){return '<span style=font-size:24px;opacity:'+(i<r.stars?'1':'.2')+';transition:all .5s>'+'&#11088;'+'</span>'}).join('')+'</div><p style=font-size:12px;color:#8890B0;margin-top:8px>'+r.stars+'/'+max+' Stars</p>';
  if(r.stars>=1){d.innerHTML+='<p style=font-size:11px;color:#F0C850;margin-top:4px>'+(r.stars>=5?'星辰徽章':r.stars>=4?'钻石徽章':r.stars>=3?'金星徽章':r.stars>=2?'银星徽章':'铜星徽章')+'</p>'}
}

function showCelebration(name,stars){
  for(var i=0;i<30;i++){var p=document.createElement('div');p.style.cssText='position:fixed;z-index:9999;width:6px;height:6px;border-radius:50%;background:'+(Math.random()>.5?'#F0C850':'#F8E090')+';top:50%;left:50%;animation:celebrate'+i+' 1.5s ease-out forwards;pointer-events:none';document.body.appendChild(p);
    var s=document.createElement('style');s.textContent='@keyframes celebrate'+i+'{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate('+(Math.random()*400-200)+'px,'+(Math.random()*400-200)+'px) scale(0);opacity:0}}';document.head.appendChild(s);
    setTimeout(function(){p.remove();s.remove()},1600)}
  var toast=document.createElement('div');toast.style.cssText='position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:10000;background:linear-gradient(135deg,#F0C850,#F8E090);color:#0A0E27;padding:16px 28px;border-radius:60px;font-size:14px;font-weight:600;animation:toastIn .4s ease-out';toast.textContent='Congratulations! '+name+(stars>=5?' All Stars!':'');document.body.appendChild(toast);setTimeout(function(){toast.remove()},3000);
  var ts=document.createElement('style');ts.textContent='@keyframes toastIn{0%{transform:translateX(-50%) translateY(-20px);opacity:0}100%{transform:translateX(-50%) translateY(0);opacity:1}}';document.head.appendChild(ts)
}

var EVAL_WORDS=['通过！','通过!','恭喜通过','已完成','完成得好','做得好','非常好'];

PRACTICE.startTask=function(taskId){
  state.activeTaskId=taskId;var tasks=state.isLessonMode?LESSON_TASKS[state.courseName]?.tasks:COURSE_TASKS[state.courseName]?.tasks;
  if(!tasks)return;var task=tasks.find(function(t){return t.id===taskId});if(!task)return;
  var chatPanel=document.getElementById('practiceChatPanel');if(!chatPanel){
    chatPanel=document.createElement('div');chatPanel.id='practiceChatPanel';
    chatPanel.innerHTML='<div style=background:#181E40;border-radius:18px;border:1px solid rgba(240,200,80,.1);padding:0;margin-top:28px;overflow:hidden;box-shadow:0 4px 30px rgba(0,0,0,.3)><div style=background:linear-gradient(135deg,rgba(91,155,213,.25),rgba(108,92,231,.18));padding:16px 24px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(240,200,80,.1)><div style=width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#5B9BD5,#6C5CE7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px>+</div><div><div style=font-size:14px;font-weight:500;color:#E8ECF1>Practice Coach</div><div style=font-size:11px;color:#4CAF50>Ready</div></div><button id=closePractice style=margin-left:auto;background:none;border:none;color:#8890B0;cursor:pointer;font-size:18px>&times;</button></div><div id=chatMessages style=padding:16px 24px;max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:12px></div><div style=padding:14px 20px;border-top:1px solid rgba(240,200,80,.1);display:flex;gap:10px;background:rgba(5,8,25,.8)><input id=chatInput type=text placeholder=输入你的回答... style=flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(240,200,80,.18);border-radius:22px;padding:10px 18px;font-size:13px;color:#E8ECF1;outline:none onkeydown=if(event.key===%22Enter%22)PRACTICE.sendMessage()><button id=chatSend style=width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#5B9BD5,#6C5CE7);border:none;cursor:pointer;color:#fff;font-size:16px>&#8594;</button></div></div>';
    var grid=document.getElementById('practiceGrid');if(grid)grid.parentNode.insertBefore(chatPanel,grid.nextSibling);
    document.getElementById('closePractice').addEventListener('click',function(){chatPanel.style.display='none'});
    document.getElementById('chatSend').addEventListener('click',function(){PRACTICE.sendMessage()})
  }
  chatPanel.style.display='block';state.chatHistory=[];
  var msgs=document.getElementById('chatMessages');msgs.innerHTML='';
  addChatMsg('assistant',task.instruction)
};

function addChatMsg(role,content){
  var msgs=document.getElementById('chatMessages');if(!msgs)return;
  var div=document.createElement('div');
  div.style.cssText='display:flex;gap:10px;align-items:flex-start;'+(role==='user'?'justify-content:flex-end':'');
  
  if(role==='assistant'){
    // AI头像
    var avatar=document.createElement('div');
    avatar.style.cssText='width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#5B9BD5,#6C5CE7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;flex-shrink:0';
    avatar.textContent='+';
    div.appendChild(avatar);
    // 气泡
    var bubble=document.createElement('div');
    bubble.style.cssText='background:rgba(91,155,213,.15);border-radius:14px 14px 14px 4px;padding:12px 16px;font-size:13px;color:#C8D0E0;line-height:1.7;max-width:85%;border:1px solid rgba(91,155,213,.08)';
    bubble.innerHTML=escapeHTML(content).replace(/\n/g,'<br>');
    div.appendChild(bubble);
  } else {
    // 用户气泡
    var bubble2=document.createElement('div');
    bubble2.style.cssText='background:rgba(240,200,80,.1);border-radius:14px 14px 4px 14px;padding:12px 16px;font-size:13px;color:#E8ECF1;line-height:1.7;max-width:85%';
    bubble2.textContent=content;
    div.appendChild(bubble2);
  }
  
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight
}

PRACTICE.sendMessage=function(){
  var input=document.getElementById('chatInput');if(!input)return;
  var msg=input.value.trim();if(!msg)return;
  addChatMsg('user',msg);input.value='';
  state.chatHistory.push({role:'user',content:msg});
  var tasks=state.isLessonMode?LESSON_TASKS[state.courseName]?.tasks:COURSE_TASKS[state.courseName]?.tasks;
  var task=tasks?tasks.find(function(t){return t.id===state.activeTaskId}):null;
  var systemPrompt=(state.isLessonMode?LESSON_TASKS:COURSE_TASKS)[state.courseName]?.aiPrompt||'你是一位专业导师。';
  if(task)systemPrompt+=' 当前任务的评估标准：'+task.evaluator;
  var typing=document.createElement('div');typing.id='typing';typing.innerHTML='<div style=display:flex;gap:10px><div style=width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#5B9BD5,#6C5CE7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px>+</div><div style=background:rgba(91,155,213,.15);border-radius:14px;padding:12px 16px;font-size:13px;color:#8890B0>Thinking...</div></div>';
  var msgs=document.getElementById('chatMessages');msgs.appendChild(typing);
  fetch('https://thestars-ai.vercel.app/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg,systemPrompt:systemPrompt,history:state.chatHistory})})
  .then(function(r){return r.json()}).then(function(d){
    var el=document.getElementById('typing');if(el)el.remove();
    var reply=d.reply||'请检查网络连接后重试。';
    addChatMsg('assistant',reply);
    state.chatHistory.push({role:'assistant',content:reply});
    if(task&&EVAL_WORDS.some(function(w){return reply.includes(w)})){
      completeTask(state.courseName,task.id);updateStarDisplay();renderTasks(tasks)
    }
  }).catch(function(){
    var el=document.getElementById('typing');if(el)el.remove();
    addChatMsg('assistant','AI助手暂时离线。你仍然可以继续练习——描述你的方案或思考，后续可以通过评估。');
  })
};

PRACTICE.init=function(opts){
  state.courseName=opts.course;state.isLessonMode=false;loadRewards();
  var tasks=COURSE_TASKS[opts.course]?.tasks;if(!tasks)return;
  injectPracticeBox(tasks,false)
};

PRACTICE.initLesson=function(lessonName){
  state.courseName=lessonName;state.isLessonMode=true;loadRewards();
  var tasks=LESSON_TASKS[lessonName]?.tasks;if(!tasks)return;
  injectPracticeBox(tasks,true)
};
})();
