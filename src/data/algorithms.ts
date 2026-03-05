export interface AlgorithmDetail {
  label: string;
  value: string;
}

export interface Algorithm {
  name: string;
  subtitle: string;
  details: AlgorithmDetail[];
  pseudocode?: string;
}

export interface Category {
  id: string;
  title: string;
  algorithms: Algorithm[];
}

export const algorithmData: Category[] = [
  {
    id: "industrial-control",
    title: "一、工业控制与自动化领域",
    algorithms: [
      {
        name: "PID 控制器",
        subtitle: "工业界的\"自动驾驶仪\"",
        details: [
          { label: "提出者", value: "Nicolas Minorsky (理论化) / Elmer Sperry (早期应用)" },
          { label: "年代", value: "1922年 (理论化)" },
          { label: "原理", value: "根据当前误差（P比例）、误差累积（I积分）、误差变化趋势（D微分）三个维度调整输出" },
          { label: "类比", value: "就像开车时，P是看你离车道线多远，I是你长时间偏差的累积，D是你偏离的速度" },
          { label: "特点", value: "结构简单、稳定性好、工作可靠、调整方便" },
          { label: "应用场景", value: "恒温器、无人机稳定、化工过程控制、电机调速" }
        ],
        pseudocode: `previous_error = 0
integral = 0

loop:
  error = setpoint - measured_value
  integral = integral + error * dt
  derivative = (error - previous_error) / dt
  
  output = Kp*error + Ki*integral + Kd*derivative
  previous_error = error
  
  wait(dt)`
      },
      {
        name: "模糊控制（Fuzzy Control）",
        subtitle: "模仿人类\"差不多\"的思维",
        details: [
          { label: "提出者", value: "Lotfi A. Zadeh (模糊逻辑) / Ebrahim Mamdani (模糊控制)" },
          { label: "年代", value: "1965年 (模糊逻辑) / 1974年 (模糊控制)" },
          { label: "原理", value: "用\"有点热\"、\"比较冷\"这样的模糊集合代替精确数值，通过经验规则做决策" },
          { label: "类比", value: "就像老师评价学生，“优秀”、“良好”、“及格”，而不是只看分数" },
          { label: "特点", value: "无需精确数学模型，鲁棒性强" },
          { label: "应用场景", value: "洗衣机自动调节、地铁平滑启停、空调温度控制" }
        ],
        pseudocode: `# 1. 模糊化 (Fuzzification)
temp_fuzzy = get_fuzzy_set(temperature) # 如: "Cold", "Warm", "Hot"

# 2. 规则推断 (Rule Evaluation)
if temp_fuzzy == "Cold": 
    power = "High"
elif temp_fuzzy == "Warm": 
    power = "Medium"
else: 
    power = "Low"

# 3. 去模糊化 (Defuzzification)
output_power = calculate_exact_power(power)`
      },
      {
        name: "模型预测控制（MPC）",
        subtitle: "工业过程的\" chess 大师\"",
        details: [
          { label: "提出者", value: "Charles Cutler & Brian Ramaker (DMC算法)" },
          { label: "年代", value: "1970s末" },
          { label: "原理", value: "每一步都预测未来一段时间的系统行为，滚动优化当前控制量" },
          { label: "类比", value: "就像下围棋，每走一步都会推演后面几十步的可能性" },
          { label: "特点", value: "能够处理多变量约束，预测性强" },
          { label: "应用场景", value: "炼油厂多变量协调控制、自动驾驶轨迹跟踪、机器人运动规划" }
        ],
        pseudocode: `loop:
  cost = 0
  # 预测未来 horizon 步的状态
  for t in range(current_time, current_time + horizon):
      predicted_state = system_model(current_state, planned_control_seq)
      cost += calculate_cost(predicted_state, target_state)
  
  # 求解最小化 cost 的最优控制序列
  optimal_control_seq = optimize(cost)
  
  # 仅执行序列的第一个控制动作 (滚动优化)
  apply_control(optimal_control_seq[0])`
      },
      {
        name: "自适应控制",
        subtitle: "会自我学习的控制器",
        details: [
          { label: "提出者", value: "Yakov Tsypkin, Richard Bellman 等" },
          { label: "年代", value: "1950s" },
          { label: "原理", value: "在线识别系统参数变化，实时调整控制策略" },
          { label: "类比", value: "就像变色龙根据环境颜色改变皮肤颜色" },
          { label: "特点", value: "自动补偿系统参数的不确定性" },
          { label: "应用场景", value: "飞行器自动适应空气密度变化、机械臂负载变化控制" }
        ],
        pseudocode: `loop:
  # 1. 实时估计系统参数 (如使用递归最小二乘法)
  estimated_params = recursive_least_squares(measured_data)
  
  # 2. 根据新参数调整控制器增益
  controller_gains = design_controller(estimated_params)
  
  # 3. 计算并输出控制量
  output = compute_control(state, controller_gains)
  apply_control(output)`
      },
      {
        name: "滑模控制（SMC）",
        subtitle: "强迫系统\"滑\"在理想轨迹上",
        details: [
          { label: "提出者", value: "Vadim Utkin 等" },
          { label: "年代", value: "1950s末" },
          { label: "原理", value: "设计一个\"滑动面\"，通过高频切换强制系统状态趋近并保持在面上" },
          { label: "类比", value: "就像强迫一个球沿着凹槽滚动，即使有颠簸也会回到槽里" },
          { label: "特点", value: "对参数变化和外部干扰具有极强的鲁棒性" },
          { label: "应用场景", value: "电机精确控制、航天器姿态调整、电力电子变换器控制" }
        ],
        pseudocode: `loop:
  # 1. 计算滑动面 s (例如 s = 0 为理想轨迹)
  s = error + lambda * derivative_error
  
  # 2. 计算等效控制 (保持在滑动面上所需的控制)
  u_eq = compute_equivalent_control(state)
  
  # 3. 计算切换控制 (强制系统状态趋向滑动面)
  u_sw = K * sign(s)  # sign(s) 为符号函数，产生高频切换
  
  # 4. 总控制输出
  output = u_eq + u_sw
  apply_control(output)`
      }
    ]
  },
  {
    id: "swarm-intelligence",
    title: "二、群体智能与自然启发算法",
    algorithms: [
      {
        name: "粒子群优化（PSO）",
        subtitle: "模拟鸟群觅食",
        details: [
          { label: "提出者", value: "James Kennedy & Russell Eberhart" },
          { label: "年代", value: "1995年" },
          { label: "原理", value: "每个解是一只\"鸟\"，既向自己找到的最好位置飞，也向群体最好的位置飞" },
          { label: "类比", value: "像鸟群在森林中寻找食物，每只鸟都关注自己飞过的最好位置和整个群体的最好位置" },
          { label: "特点", value: "参数少、收敛快、易于实现，适合连续优化问题" },
          { label: "应用场景", value: "神经网络权重训练、电力系统经济调度、图像分割" }
        ],
        pseudocode: `for each particle i:
  initialize position x[i] and velocity v[i] randomly
  pbest[i] = x[i] # 个体历史最优
gbest = best(pbest) # 全局历史最优

while not terminated:
  for each particle i:
    # 更新速度 (w:惯性, c1:个体认知, c2:社会认知)
    v[i] = w*v[i] + c1*rand()*(pbest[i] - x[i]) + c2*rand()*(gbest - x[i])
    # 更新位置
    x[i] = x[i] + v[i]
    
    # 更新最优解
    if fitness(x[i]) > fitness(pbest[i]):
      pbest[i] = x[i]
      if fitness(pbest[i]) > fitness(gbest):
        gbest = pbest[i]`
      },
      {
        name: "蚁群算法（ACO）",
        subtitle: "模拟蚂蚁找食物",
        details: [
          { label: "提出者", value: "Marco Dorigo" },
          { label: "年代", value: "1992年" },
          { label: "原理", value: "蚂蚁在路径上留下信息素，短路径信息素浓，吸引更多蚂蚁，形成正反馈" },
          { label: "类比", value: "像蚂蚁搬运食物，通过在路径上留下信息素来指引同伴，越短的路径信息素积累越快" },
          { label: "特点", value: "并行性、正反馈机制、鲁棒性强" },
          { label: "应用场景", value: "旅行商问题（TSP）、网络路由优化、物流配送路径规划" }
        ],
        pseudocode: `initialize pheromone matrix tau with small values

while not terminated:
  # 1. 蚂蚁构建解
  for each ant k:
    current_node = start_node
    while not all_nodes_visited:
      # 根据信息素(tau)和启发式信息(eta, 如距离倒数)计算转移概率
      prob[j] = (tau[current_node][j]^alpha) * (eta[current_node][j]^beta)
      next_node = select_node_based_on_prob(prob)
      ant[k].add_to_path(next_node)
      current_node = next_node
      
  # 2. 信息素挥发
  tau = (1 - rho) * tau
  
  # 3. 信息素更新 (好路径留下更多信息素)
  for each ant k:
    delta_tau = Q / ant[k].path_length
    for edge in ant[k].path:
      tau[edge] += delta_tau`
      },
      {
        name: "人工蜂群（ABC）",
        subtitle: "模拟蜜蜂采蜜分工",
        details: [
          { label: "提出者", value: "Dervis Karaboga" },
          { label: "年代", value: "2005年" },
          { label: "原理", value: "分为雇佣蜂（开发当前解）、观察蜂（按概率选择解）、侦察蜂（随机搜索新解）" },
          { label: "类比", value: "像蜜蜂分工采蜜，雇佣蜂分享信息，观察蜂选择花蜜，侦察蜂寻找新资源" },
          { label: "特点", value: "平衡探索与开发，参数简单" },
          { label: "应用场景", value: "无线传感器网络节点部署、图像多阈值分割、约束优化问题" }
        ],
        pseudocode: `initialize food sources (solutions) randomly

while not terminated:
  # 1. 雇佣蜂阶段 (Employed Bees)
  for each food source i:
    # 在邻域内产生新解
    new_source = generate_neighbor(source[i])
    if fitness(new_source) > fitness(source[i]):
      source[i] = new_source
      
  # 2. 观察蜂阶段 (Onlooker Bees)
  calculate selection probabilities based on fitness
  for each onlooker bee:
    select source[i] based on probability
    new_source = generate_neighbor(source[i])
    if fitness(new_source) > fitness(source[i]):
      source[i] = new_source
      
  # 3. 侦察蜂阶段 (Scout Bees)
  for each food source i:
    if source[i] has not improved for 'limit' trials:
      # 放弃旧解，随机生成新解
      source[i] = generate_random_source()`
      },
      {
        name: "萤火虫算法",
        subtitle: "亮度吸引机制",
        details: [
          { label: "提出者", value: "Xin-She Yang" },
          { label: "年代", value: "2008年" },
          { label: "原理", value: "萤火虫向更亮的个体移动，亮度对应目标函数值，距离越远吸引力越弱" },
          { label: "类比", value: "像夏夜的萤火虫，亮度低的向亮度高的移动，吸引力随距离增加而减弱" },
          { label: "特点", value: "能够处理多模态优化问题、自动分组" },
          { label: "应用场景", value: "多模态函数优化、特征选择、图像压缩" }
        ],
        pseudocode: `initialize population of fireflies x[i]
calculate light intensity I[i] = fitness(x[i])

while not terminated:
  for i from 1 to n:
    for j from 1 to n:
      if I[j] > I[i]:
        # 计算距离 r
        r = distance(x[i], x[j])
        # 计算吸引度 beta (随距离呈指数衰减)
        beta = beta_0 * exp(-gamma * r^2)
        
        # 萤火虫 i 向 j 移动，并加入随机扰动 alpha
        x[i] = x[i] + beta * (x[j] - x[i]) + alpha * (rand() - 0.5)
        
        update I[i] = fitness(x[i])
        
  rank fireflies and find current best`
      },
      {
        name: "布谷鸟搜索（Cuckoo Search）",
        subtitle: "寄生繁殖策略",
        details: [
          { label: "提出者", value: "Xin-She Yang & Suash Deb" },
          { label: "年代", value: "2009年" },
          { label: "原理", value: "布谷鸟在其他鸟巢产卵，以一定概率被发现丢弃，结合莱维飞行（随机长跳转）" },
          { label: "类比", value: "像布谷鸟寄生产卵，结合莱维飞行（长短结合的随机步长）来寻找更好的鸟巢" },
          { label: "特点", value: "全局搜索能力强，参数极少" },
          { label: "应用场景", value: "弹簧设计优化、工程结构优化、软件测试数据生成" }
        ],
        pseudocode: `initialize n host nests (solutions) randomly

while not terminated:
  # 1. 莱维飞行产生新解
  get a cuckoo randomly by Levy flights
  evaluate its fitness F_i
  
  # 2. 随机选择一个鸟巢 j
  choose a nest j randomly
  if F_i > fitness(nest[j]):
    replace nest[j] with the cuckoo
    
  # 3. 鸟巢主人发现外来鸟蛋
  for each nest:
    if rand() < p_a (discovery probability):
      # 丢弃该鸟巢，建立新鸟巢 (随机生成新解)
      replace nest with a new random solution
      
  keep the best solutions (nests)`
      },
      {
        name: "狼群算法（WPA）",
        subtitle: "模拟狼群狩猎层级",
        details: [
          { label: "提出者", value: "Seyedali Mirjalili (GWO) / Wu 等 (WPA)" },
          { label: "年代", value: "2014年 (GWO) / 2013年 (WPA)" },
          { label: "原理", value: "头狼、探狼、猛狼分工合作，围攻猎物时按等级分配食物" },
          { label: "类比", value: "像狼群围猎，通过头狼指挥、探狼搜索、猛狼围攻实现目标捕获" },
          { label: "特点", value: "严密的等级制度、协同搜索能力强" },
          { label: "应用场景", value: "特征选择、聚类分析、电力系统无功优化" }
        ],
        pseudocode: `initialize wolf pack randomly
find the best wolf as Alpha (头狼)

while not terminated:
  # 1. 游走行为 (Scouting)
  for each scout wolf:
    search in h directions around current position
    if better position found, update position
    if better than Alpha, replace Alpha
    
  # 2. 召唤行为 (Summoning)
  Alpha howls to summon others
  for each fierce wolf (猛狼):
    move towards Alpha with a large step size
    if better than Alpha during moving, replace Alpha
    
  # 3. 围攻行为 (Besieging)
  for all wolves:
    move towards the prey (Alpha's position) with small steps
    update positions
    
  # 4. 优胜劣汰 (Population update)
  remove the worst wolves and generate new ones`
      },
      {
        name: "蝙蝠算法",
        subtitle: "回声定位机制",
        details: [
          { label: "提出者", value: "Xin-She Yang" },
          { label: "年代", value: "2010年" },
          { label: "原理", value: "蝙蝠调整发射脉冲的频率和响度来定位猎物，频率控制搜索范围，响度控制收敛" },
          { label: "类比", value: "像蝙蝠利用回声定位，通过调整脉冲频率、响度和发射率来锁定猎物" },
          { label: "特点", value: "结合了PSO和局部搜索的优点，收敛性好" },
          { label: "应用场景", value: "微电子机械系统(MEMS)设计、图像匹配、无线网络路由" }
        ],
        pseudocode: `initialize bat population x[i] and velocity v[i]
initialize frequency f[i], pulse rate r[i], and loudness A[i]
find the global best position x_best

while not terminated:
  for each bat i:
    # 1. 更新频率、速度和位置
    f[i] = f_min + (f_max - f_min) * rand()
    v[i] = v[i] + (x[i] - x_best) * f[i]
    x_new = x[i] + v[i]
    
    # 2. 局部搜索 (基于脉冲发射率)
    if rand() > r[i]:
      x_new = x_best + epsilon * mean(A) * rand_normal()
      
    # 3. 接受新解 (基于响度)
    if fitness(x_new) > fitness(x[i]) and rand() < A[i]:
      x[i] = x_new
      # 降低响度，增加脉冲发射率 (靠近猎物)
      A[i] = alpha * A[i]
      r[i] = r_0 * (1 - exp(-gamma * t))
      
    if fitness(x[i]) > fitness(x_best):
      x_best = x[i]`
      }
    ]
  },
  {
    id: "optimization-search",
    title: "三、优化与搜索算法",
    algorithms: [
      {
        name: "模拟退火（SA）",
        subtitle: "模仿金属冷却过程",
        details: [
          { label: "提出者", value: "N. Metropolis (核心思想) / S. Kirkpatrick 等 (引入优化)" },
          { label: "年代", value: "1953年 / 1983年" },
          { label: "原理", value: "高温时接受差解的概率高（探索），低温时只接受好解（开发），温度逐渐降低" },
          { label: "类比", value: "就像打铁，先加热到高温让原子乱跳跳出局部缺陷，再慢慢冷却让原子排列整齐" },
          { label: "特点", value: "以一定概率跳出局部最优，具有全局搜索能力" },
          { label: "应用场景", value: "VLSI 布线、旅行商问题(TSP)、图像处理、大规模组合优化" }
        ],
        pseudocode: `T = T_initial
current_solution = generate_initial_solution()

while T > T_min:
  for i in range(iterations_per_T):
    new_solution = generate_neighbor(current_solution)
    delta_E = fitness(new_solution) - fitness(current_solution) # 假设求最小化
    
    if delta_E < 0:
      current_solution = new_solution
    else:
      # 以一定概率接受差解
      if rand(0, 1) < exp(-delta_E / T):
        current_solution = new_solution
        
  T = alpha * T # 降温 (alpha < 1)`
      },
      {
        name: "遗传算法（GA）",
        subtitle: "达尔文进化论的代码实现",
        details: [
          { label: "提出者", value: "John Holland" },
          { label: "年代", value: "1975年" },
          { label: "原理", value: "选择（适者生存）、交叉（基因重组）、变异（随机突变）三代操作循环" },
          { label: "类比", value: "就像生物进化，优秀的个体更容易留下后代，后代通过基因重组和突变产生更多可能性" },
          { label: "特点", value: "鲁棒性强，不依赖梯度信息，适合处理复杂非线性问题" },
          { label: "应用场景", value: "自动控制、机器人路径规划、机器学习超参数搜索、工程设计优化" }
        ],
        pseudocode: `population = initialize_population(pop_size)

while not terminated:
  evaluate_fitness(population)
  new_population = empty_list()
  
  while len(new_population) < pop_size:
    # 1. 选择 (Selection)
    parent1, parent2 = select_parents(population)
    
    # 2. 交叉 (Crossover)
    if rand() < crossover_rate:
      child1, child2 = crossover(parent1, parent2)
    else:
      child1, child2 = parent1, parent2
      
    # 3. 变异 (Mutation)
    mutate(child1, mutation_rate)
    mutate(child2, mutation_rate)
    
    new_population.add(child1, child2)
    
  population = new_population`
      },
      {
        name: "禁忌搜索（TS）",
        subtitle: "带\"记忆力\"的搜索",
        details: [
          { label: "提出者", value: "Fred Glover" },
          { label: "年代", value: "1986年" },
          { label: "原理", value: "将近期访问的解放入\"禁忌表\"避免循环，同时引入\"藐视准则\"允许打破禁忌" },
          { label: "类比", value: "就像走迷宫，记住刚走过的死胡同（禁忌），短时间内不再走，但如果发现某个死胡同其实通向出口（藐视准则），就破例进去" },
          { label: "特点", value: "具有记忆功能，能有效避免搜索过程中的重复和陷入局部最优" },
          { label: "应用场景", value: "车间调度、车辆路径问题(VRP)、图着色、网络设计" }
        ],
        pseudocode: `current_solution = generate_initial_solution()
best_solution = current_solution
tabu_list = empty_list()

while not terminated:
  neighbors = generate_neighbors(current_solution)
  best_candidate = null
  
  for candidate in neighbors:
    # 如果不在禁忌表中，或者满足藐视准则(比历史最优还好)
    if candidate not in tabu_list or meets_aspiration_criterion(candidate):
      if best_candidate is null or fitness(candidate) > fitness(best_candidate):
        best_candidate = candidate
        
  current_solution = best_candidate
  if fitness(best_candidate) > fitness(best_solution):
    best_solution = best_candidate
    
  # 更新禁忌表
  tabu_list.add(best_candidate)
  if len(tabu_list) > max_tabu_size:
    tabu_list.remove_oldest()`
      },
      {
        name: "变邻域搜索（VNS）",
        subtitle: "系统性改变搜索范围",
        details: [
          { label: "提出者", value: "Nenad Mladenović & Pierre Hansen" },
          { label: "年代", value: "1997年" },
          { label: "原理", value: "当在当前邻域陷入局部最优时，切换到更大或不同的邻域结构继续搜索" },
          { label: "类比", value: "就像在山上找最高点，如果在这个小土坡找不到了，就跳到更远的山头去试试" },
          { label: "特点", value: "系统性改变邻域结构，平衡了局部搜索和全局探索" },
          { label: "应用场景", value: "选址问题、调度问题、聚类分析、多目标优化" }
        ],
        pseudocode: `current_solution = generate_initial_solution()
neighborhoods = [N_1, N_2, ..., N_k_max] # 定义一组邻域结构

while not terminated:
  k = 1
  while k <= k_max:
    # 1. 抖动 (Shaking): 在第 k 个邻域中随机选一个解
    x_prime = random_solution_in_neighborhood(current_solution, N_k)
    
    # 2. 局部搜索 (Local Search): 从 x_prime 出发找局部最优
    x_double_prime = local_search(x_prime)
    
    # 3. 移动或改变邻域 (Move or not)
    if fitness(x_double_prime) > fitness(current_solution):
      current_solution = x_double_prime
      k = 1 # 找到更好解，回到第一个邻域重新开始
    else:
      k = k + 1 # 没找到更好解，扩大邻域`
      },
      {
        name: "和声搜索（HS）",
        subtitle: "模仿乐队即兴演奏",
        details: [
          { label: "提出者", value: "Zong Woo Geem 等" },
          { label: "年代", value: "2001年" },
          { label: "原理", value: "乐手（变量）从记忆库（历史优解）或随机音阶（搜索空间）中选择音高，按和声评价调整" },
          { label: "类比", value: "就像爵士乐即兴演奏，乐手根据记忆中的好乐句或随机灵感凑出动听的和声" },
          { label: "特点", value: "结构简单，参数少，搜索效率高" },
          { label: "应用场景", value: "供水网络设计、结构优化、电力系统调度、音乐作曲辅助" }
        ],
        pseudocode: `harmony_memory = initialize_harmony_memory(HMS) # HMS: 记忆库大小

while not terminated:
  new_harmony = empty_list()
  
  for each decision_variable i:
    if rand() < HMCR: # HMCR: 和声记忆库取值概率
      new_harmony[i] = choose_from_harmony_memory(i)
      
      if rand() < PAR: # PAR: 音调微调概率
        new_harmony[i] = pitch_adjust(new_harmony[i])
    else:
      # 随机生成新音调
      new_harmony[i] = random_value_in_range(i)
      
  # 替换最差解
  if fitness(new_harmony) > fitness(worst_in_harmony_memory):
    replace_worst_with(harmony_memory, new_harmony)`
      },
      {
        name: "教与学优化（TLBO）",
        subtitle: "模拟课堂教学",
        details: [
          { label: "提出者", value: "R.V. Rao 等" },
          { label: "年代", value: "2011年" },
          { label: "原理", value: "\"教师阶段\"向班级平均最优学习，\"学生阶段\"学生之间互相学习" },
          { label: "类比", value: "就像课堂学习，老师把知识传给全班（教师阶段），课后同学之间互相讨论提高（学生阶段）" },
          { label: "特点", value: "无需算法特定参数（如交叉率、变异率等），易于使用" },
          { label: "应用场景", value: "机械设计优化、热交换器设计、电力系统潮流优化" }
        ],
        pseudocode: `population = initialize_students()

while not terminated:
  # 1. 教师阶段 (Teacher Phase)
  teacher = get_best_student(population)
  mean_result = calculate_mean(population)
  
  for each student i:
    TF = round(1 + rand()) # 教学因子 1 或 2
    difference = rand() * (teacher - TF * mean_result)
    new_student = student[i] + difference
    
    if fitness(new_student) > fitness(student[i]):
      student[i] = new_student
      
  # 2. 学生阶段 (Learner Phase)
  for each student i:
    random_student_j = select_random_student(population, exclude=i)
    
    if fitness(student[i]) > fitness(random_student_j):
      new_student = student[i] + rand() * (student[i] - random_student_j)
    else:
      new_student = student[i] + rand() * (random_student_j - student[i])
      
    if fitness(new_student) > fitness(student[i]):
      student[i] = new_student`
      }
    ]
  },
  {
    id: "machine-learning",
    title: "四、机器学习与深度学习架构",
    algorithms: [
      {
        name: "卷积神经网络（CNN）",
        subtitle: "视觉皮层的数学模拟",
        details: [
          { label: "提出者", value: "Yann LeCun 等" },
          { label: "年代", value: "1989年 (LeNet) / 2012年 (AlexNet爆发)" },
          { label: "原理", value: "卷积核（滤镜）扫描图像提取边缘、纹理等特征，逐层抽象从线条到物体" },
          { label: "类比", value: "就像用放大镜扫描整张照片，先看线条，再看形状，最后认出物体" },
          { label: "特点", value: "局部连接、权值共享、平移不变性" },
          { label: "应用场景", value: "图像分类、目标检测、人脸识别、医学影像分析、自动驾驶视觉" }
        ],
        pseudocode: `def CNN_forward(image):
  # 1. 卷积层 (提取特征)
  conv1 = convolution_2d(image, filters=32, kernel_size=3x3)
  act1 = relu(conv1)
  
  # 2. 池化层 (降维、平移不变性)
  pool1 = max_pooling_2d(act1, pool_size=2x2)
  
  # 3. 更多卷积和池化层...
  conv2 = convolution_2d(pool1, filters=64, kernel_size=3x3)
  act2 = relu(conv2)
  pool2 = max_pooling_2d(act2, pool_size=2x2)
  
  # 4. 展平并连接全连接层 (分类)
  flat = flatten(pool2)
  fc1 = dense(flat, units=128, activation='relu')
  output = dense(fc1, units=num_classes, activation='softmax')
  
  return output`
      },
      {
        name: "循环神经网络（RNN/LSTM/GRU）",
        subtitle: "带记忆的神经网络",
        details: [
          { label: "提出者", value: "Sepp Hochreiter & Jürgen Schmidhuber (LSTM)" },
          { label: "年代", value: "1997年 (LSTM) / 2014年 (GRU)" },
          { label: "原理", value: "隐藏状态传递历史信息，LSTM用\"门控\"机制决定记住/忘记什么" },
          { label: "类比", value: "就像读小说，读到后面时还记得前面的情节，并根据情节重要性决定记住哪些关键点" },
          { label: "特点", value: "处理序列数据、具有短期/长期记忆" },
          { label: "应用场景", value: "语音识别、机器翻译、时间序列预测、文本生成、情感分析" }
        ],
        pseudocode: `def LSTM_cell(input_t, prev_hidden_state, prev_cell_state):
  # 1. 遗忘门 (决定丢弃什么历史信息)
  f_t = sigmoid(W_f * [prev_hidden_state, input_t] + b_f)
  
  # 2. 输入门 (决定存入什么新信息)
  i_t = sigmoid(W_i * [prev_hidden_state, input_t] + b_i)
  candidate_C_t = tanh(W_c * [prev_hidden_state, input_t] + b_c)
  
  # 3. 更新细胞状态 (记忆)
  C_t = f_t * prev_cell_state + i_t * candidate_C_t
  
  # 4. 输出门 (决定输出什么)
  o_t = sigmoid(W_o * [prev_hidden_state, input_t] + b_o)
  h_t = o_t * tanh(C_t)
  
  return h_t, C_t`
      },
      {
        name: "Transformer",
        subtitle: "注意力机制的革命",
        details: [
          { label: "提出者", value: "Ashish Vaswani 等 (Google Brain)" },
          { label: "年代", value: "2017年" },
          { label: "原理", value: "自注意力让模型同时关注输入的所有位置，计算它们之间的相关性权重" },
          { label: "类比", value: "就像在聚会上听人说话，虽然很多人在说，但你会自动“注意”到和你对话的人说的关键词" },
          { label: "特点", value: "并行化训练、长距离依赖建模能力强" },
          { label: "应用场景", value: "大语言模型(LLM)、多模态大模型、机器翻译、代码生成" }
        ],
        pseudocode: `def self_attention(query, key, value):
  # 计算注意力分数 (点积)
  scores = matmul(query, transpose(key))
  
  # 缩放以防止梯度消失
  scaled_scores = scores / sqrt(dimension_of_key)
  
  # Softmax 归一化得到权重
  attention_weights = softmax(scaled_scores)
  
  # 加权求和得到输出
  output = matmul(attention_weights, value)
  return output

def transformer_block(inputs):
  # 多头自注意力
  attention_out = multi_head_attention(inputs)
  # 残差连接 + 层归一化
  norm1 = layer_norm(inputs + attention_out)
  
  # 前馈神经网络
  ffn_out = feed_forward_network(norm1)
  # 残差连接 + 层归一化
  output = layer_norm(norm1 + ffn_out)
  
  return output`
      },
      {
        name: "生成对抗网络（GAN）",
        subtitle: "伪造者与鉴定师的博弈",
        details: [
          { label: "提出者", value: "Ian Goodfellow 等" },
          { label: "年代", value: "2014年" },
          { label: "原理", value: "生成器造假，判别器鉴真，两者对抗训练直至生成器以假乱真" },
          { label: "类比", value: "就像假币制造者和警察，制造者努力让假币更逼真，警察努力识破假币，双方在博弈中共同进步" },
          { label: "特点", value: "无监督学习、生成能力极强" },
          { label: "应用场景", value: "图像生成、图像修复、超分辨率重建、数据增强、Deepfake" }
        ],
        pseudocode: `for number_of_training_iterations:
  # 1. 训练判别器 (Discriminator)
  noise = sample_random_noise(batch_size)
  fake_images = Generator(noise)
  real_images = sample_real_images(batch_size)
  
  # 判别器目标：真实图片判为1，假图片判为0
  D_loss_real = binary_crossentropy(Discriminator(real_images), 1)
  D_loss_fake = binary_crossentropy(Discriminator(fake_images), 0)
  D_loss = D_loss_real + D_loss_fake
  update_weights(Discriminator, D_loss)
  
  # 2. 训练生成器 (Generator)
  noise = sample_random_noise(batch_size)
  
  # 生成器目标：让判别器把假图片判为1
  G_loss = binary_crossentropy(Discriminator(Generator(noise)), 1)
  update_weights(Generator, G_loss)`
      },
      {
        name: "强化学习（Q-learning/DQN/PPO）",
        subtitle: "试错学习",
        details: [
          { label: "提出者", value: "Richard Sutton (RL基础) / DeepMind (DQN)" },
          { label: "年代", value: "1989年 (Q-learning) / 2013年 (DQN)" },
          { label: "原理", value: "智能体在环境中采取行动获得奖励，学习最大化长期累积奖励的策略" },
          { label: "类比", value: "就像训练小狗，做对了给骨头（奖励），做错了不给，小狗最终学会为了骨头去做正确的动作" },
          { label: "特点", value: "试错学习、延迟奖励、探索与利用平衡" },
          { label: "应用场景", value: "AlphaGo、自动驾驶决策、游戏AI、机器人控制、推荐系统" }
        ],
        pseudocode: `initialize Q_table(state, action) arbitrarily

for each episode:
  state = environment.reset()
  
  while state is not terminal:
    # 探索与利用 (epsilon-greedy)
    if rand() < epsilon:
      action = random_action()
    else:
      action = argmax(Q_table[state])
      
    # 执行动作，观察新状态和奖励
    next_state, reward = environment.step(action)
    
    # Q-learning 更新公式 (贝尔曼方程)
    best_next_action = argmax(Q_table[next_state])
    td_target = reward + gamma * Q_table[next_state][best_next_action]
    td_error = td_target - Q_table[state][action]
    
    Q_table[state][action] += learning_rate * td_error
    
    state = next_state`
      },
      {
        name: "图神经网络（GNN）",
        subtitle: "处理关系数据的网络",
        details: [
          { label: "提出者", value: "Franco Scarselli 等 / Thomas Kipf (GCN)" },
          { label: "年代", value: "2008年 (GNN) / 2016年 (GCN)" },
          { label: "原理", value: "通过消息传递机制，节点聚合邻居信息更新自身表示" },
          { label: "类比", value: "就像社交圈，你的性格和爱好往往受到你最亲近的几个朋友的影响，大家互相交换信息" },
          { label: "特点", value: "处理非欧几里得空间数据、捕捉拓扑结构信息" },
          { label: "应用场景", value: "社交网络分析、分子性质预测、推荐系统、知识图谱推理" }
        ],
        pseudocode: `def GNN_layer(nodes, edges):
  new_node_features = empty_list()
  
  for each node v in nodes:
    # 1. 消息传递 (Message Passing)
    messages = empty_list()
    for neighbor u of v:
      msg = compute_message(nodes[u], nodes[v], edges[u, v])
      messages.add(msg)
      
    # 2. 聚合 (Aggregation)
    # 例如：求和、平均、最大值
    aggregated_msg = aggregate(messages)
    
    # 3. 更新 (Update)
    # 结合节点自身特征和聚合后的邻居特征
    updated_feature = neural_network(nodes[v], aggregated_msg)
    new_node_features.add(updated_feature)
    
  return new_node_features`
      },
      {
        name: "胶囊网络（CapsNet）",
        subtitle: "保留空间层次结构的网络",
        details: [
          { label: "提出者", value: "Geoffrey Hinton 等" },
          { label: "年代", value: "2017年" },
          { label: "原理", value: "用\"胶囊\"代替神经元，输出是向量（包含姿态信息）而非标量，用动态路由替代池化" },
          { label: "类比", value: "就像识别人的脸，不仅看有没有眼睛鼻子，还要看它们的相对位置和角度是否正确" },
          { label: "特点", value: "保留空间层次结构、对旋转和仿射变换更鲁棒" },
          { label: "应用场景", value: "重叠数字识别、视角变化鲁棒的图像分类、医学图像分割" }
        ],
        pseudocode: `def dynamic_routing(u_hat, num_iterations):
  # u_hat: 预测向量 (低层胶囊输出乘以权重矩阵)
  b = zeros(num_capsules_l, num_capsules_l_plus_1) # 初始路由权重(对数)
  
  for r in range(num_iterations):
    # 1. 计算耦合系数 (Softmax)
    c = softmax(b, axis=capsules_l_plus_1)
    
    # 2. 计算高层胶囊的输入 (加权求和)
    s = sum(c * u_hat, axis=capsules_l)
    
    # 3. 压缩函数 (Squash) 保证向量长度在 0 到 1 之间
    v = squash(s)
    
    # 4. 更新路由权重 (如果预测向量与高层输出一致，则增加权重)
    if r < num_iterations - 1:
      b += dot_product(u_hat, v)
      
  return v`
      }
    ]
  },
  {
    id: "privacy-security",
    title: "五、隐私保护与安全算法",
    algorithms: [
      {
        name: "差分隐私（Differential Privacy）",
        subtitle: "数学化的隐私保护",
        details: [
          { label: "提出者", value: "Cynthia Dwork 等" },
          { label: "年代", value: "2006年" },
          { label: "原理", value: "在查询结果中添加精心设计的噪声（拉普拉斯/高斯），使得单条记录的存在与否无法被推断" },
          { label: "类比", value: "就像在统计班级平均分时，故意给每个人的分数加减一点随机数，虽然平均分还是准的，但谁也猜不出具体的某个人考了多少分" },
          { label: "特点", value: "数学证明的隐私界限、抗背景攻击、隐私预算可控" },
          { label: "应用场景", value: "苹果收集用户数据、美国人口普查数据发布、Google统计Chrome使用情况" }
        ],
        pseudocode: `def laplace_mechanism(data, query_function, epsilon, sensitivity):
  # 1. 计算真实查询结果
  true_result = query_function(data)
  
  # 2. 根据敏感度(sensitivity)和隐私预算(epsilon)计算拉普拉斯噪声的尺度
  scale = sensitivity / epsilon
  
  # 3. 生成拉普拉斯噪声
  noise = sample_from_laplace_distribution(mu=0, b=scale)
  
  # 4. 返回加噪后的结果
  noisy_result = true_result + noise
  return noisy_result`
      },
      {
        name: "零信任架构（Zero Trust）",
        subtitle: "永不信任，始终验证",
        details: [
          { label: "提出者", value: "John Kindervag (Forrester Research)" },
          { label: "年代", value: "2010年" },
          { label: "原理", value: "不是具体算法而是安全模型，默认不信任任何内外网请求，每次访问都需身份验证和授权" },
          { label: "类比", value: "就像进入高度机密的实验室，不仅门口要刷卡，每进一扇门、每动一个设备都要重新验证身份，不管你已经在里面待了多久" },
          { label: "特点", value: "最小权限原则、微隔离、持续验证、不依赖网络边界" },
          { label: "应用场景", value: "企业内网安全、远程办公访问、云原生微服务间通信" }
        ],
        pseudocode: `def access_request_evaluation(user, device, resource, context):
  # 1. 持续身份验证 (不仅看密码，还看MFA)
  if not verify_identity(user.credentials, user.mfa_token):
    return DENY
    
  # 2. 设备健康度检查
  if not check_device_compliance(device.os_version, device.antivirus_status):
    return DENY
    
  # 3. 上下文风险评估 (如：异常地点、异常时间)
  risk_score = evaluate_risk(user.location, context.time, user.behavior_history)
  if risk_score > THRESHOLD:
    trigger_step_up_authentication() # 要求额外验证
    
  # 4. 最小权限授权 (微隔离)
  if has_least_privilege_access(user.role, resource):
    log_access_attempt(user, resource, "GRANTED")
    return GRANT
  else:
    log_access_attempt(user, resource, "DENIED")
    return DENY`
      },
      {
        name: "同态加密（HE）",
        subtitle: "在加密数据上直接计算",
        details: [
          { label: "提出者", value: "Rivest 等 (概念) / Craig Gentry (全同态实现)" },
          { label: "年代", value: "1978年 (概念) / 2009年 (FHE实现)" },
          { label: "原理", value: "密文运算结果解密后等于明文运算结果，支持加法和/或乘法" },
          { label: "类比", value: "就像把金块锁在一个带手套的透明盒子里，工人们可以戴着手套在盒子里加工金块，但他们拿不走金块，也看不见金块的真面目，只有主人有钥匙能打开盒子取走成品" },
          { label: "特点", value: "数据“可用不可见”、计算外包安全、计算开销大（尤其是FHE）" },
          { label: "应用场景", value: "隐私保护下的云计算、医疗数据联合分析、加密数据库查询" }
        ],
        pseudocode: `# 客户端 (数据拥有者)
public_key, private_key = generate_keys()
ciphertext_A = encrypt(public_key, plaintext_A)
ciphertext_B = encrypt(public_key, plaintext_B)

# 将密文发送给云端服务器...

# 云端服务器 (不拥有私钥，无法解密)
# 直接在密文上执行加法或乘法运算 (Eval)
ciphertext_result = homomorphic_add(ciphertext_A, ciphertext_B)
# 或者 ciphertext_result = homomorphic_mul(ciphertext_A, ciphertext_B)

# 将结果密文返回给客户端...

# 客户端 (解密结果)
final_result = decrypt(private_key, ciphertext_result)
# 此时 final_result == plaintext_A + plaintext_B`
      },
      {
        name: "安全多方计算（SMPC）",
        subtitle: "共同计算但互不泄露输入",
        details: [
          { label: "提出者", value: "Andrew Yao (姚期智 - 百万富翁问题)" },
          { label: "年代", value: "1982年" },
          { label: "原理", value: "多方各自持有秘密输入，共同计算函数结果，但彼此不知道对方的具体输入" },
          { label: "类比", value: "就像几个百万富翁想比谁更有钱，但谁都不想说出自己的具体存款。他们找来一个黑盒，每个人把钱数的一部分投进去，最后黑盒只显示谁最富有" },
          { label: "特点", value: "输入私密性、计算正确性、去中心化信任" },
          { label: "应用场景", value: "联合风控、跨机构医疗数据分析、隐私集合求交(PSI)、电子投票" }
        ],
        pseudocode: `# 示例: 基于秘密共享(Secret Sharing)的安全求和
# Alice 有秘密 a, Bob 有秘密 b, Charlie 有秘密 c。求 a+b+c

# 1. 秘密拆分 (每个人把自己的秘密拆成3份随机数，使得总和等于秘密)
Alice_shares = [a1, a2, a3] # a1+a2+a3 = a
Bob_shares   = [b1, b2, b3] # b1+b2+b3 = b
Charlie_shares = [c1, c2, c3] # c1+c2+c3 = c

# 2. 分发碎片 (每个人保留第1份，把第2份给下一个人，第3份给下下个人)
# Alice 收到: a1, b1, c1
# Bob 收到: a2, b2, c2
# Charlie 收到: a3, b3, c3

# 3. 局部求和 (每个人计算自己手中碎片的和)
Alice_sum = a1 + b1 + c1
Bob_sum = a2 + b2 + c2
Charlie_sum = a3 + b3 + c3

# 4. 汇总结果 (公开局部和，相加得到最终结果)
total_sum = Alice_sum + Bob_sum + Charlie_sum
# total_sum == a + b + c，且没有人知道别人的具体数字`
      },
      {
        name: "k-匿名与l-多样性",
        subtitle: "数据脱敏标准",
        details: [
          { label: "提出者", value: "Latanya Sweeney (k-匿名) / Ashwin Machanavajjhala 等 (l-多样性)" },
          { label: "年代", value: "1998年 (k-匿名) / 2006年 (l-多样性)" },
          { label: "原理", value: "发布数据时确保每条记录至少与k-1条其他记录不可区分（准标识符相同），且敏感属性有l种不同值" },
          { label: "类比", value: "就像在人群中找人，如果人群里有10个长得一模一样的人（k=10），你就很难确定谁是谁；如果这10个人得的病各不相同（l-多样性），你就更难猜出某个人的具体病情" },
          { label: "特点", value: "简单直观、易于实现、无法抗背景知识攻击（k-匿名缺陷）" },
          { label: "应用场景", value: "医疗记录发布、用户行为数据开源、位置轨迹脱敏" }
        ],
        pseudocode: `def apply_k_anonymity(dataset, quasi_identifiers, k):
  # 准标识符(QI)如：邮编、年龄、性别
  
  while not is_k_anonymous(dataset, quasi_identifiers, k):
    # 1. 泛化 (Generalization)
    # 例如：将年龄 "23" 泛化为 "20-30"
    # 将邮编 "12345" 泛化为 "123**"
    dataset = generalize_attributes(dataset, quasi_identifiers)
    
    # 2. 隐匿 (Suppression)
    # 如果某条记录实在无法与其他记录凑成 k 个，则直接删除或用 "*" 屏蔽
    dataset = suppress_outliers(dataset, quasi_identifiers, k)
    
  return dataset

def check_l_diversity(equivalence_class, sensitive_attribute, l):
  # 确保在一个 k-匿名等价类中，敏感属性（如：疾病）至少有 l 种不同的值
  unique_sensitive_values = count_unique(equivalence_class[sensitive_attribute])
  return unique_sensitive_values >= l`
      }
    ]
  },
  {
    id: "transportation-logistics",
    title: "六、交通运输与物流调度",
    algorithms: [
      {
        name: "列车调度算法（Train Scheduling）",
        subtitle: "铁路系统的\"大脑\"",
        details: [
          { label: "提出者", value: "Amit & Goldfarb (早期) / Caprara 等 (MIP模型)" },
          { label: "年代", value: "1970s (早期) / 2002年 (经典模型)" },
          { label: "原理", value: "混合整数规划求解，考虑轨道占用冲突、时刻表约束、最小追踪间隔" },
          { label: "类比", value: "就像在单行道上指挥多辆车，必须精确计算每辆车进入和离开的时间，防止追尾或堵塞" },
          { label: "特点", value: "强约束性、高安全性、多目标优化（准点率、能耗）" },
          { label: "应用场景", value: "高铁运行图编制、地铁日常调度、货运列车编组" }
        ],
        pseudocode: `def train_scheduling(trains, tracks, time_horizon):
  # 1. 定义决策变量
  # x[i, j, t] = 1 表示列车 i 在时间 t 占用轨道 j
  
  # 2. 设置目标函数 (例如：最小化总延误时间)
  objective = minimize( sum(delay[i] for i in trains) )
  
  # 3. 添加约束条件
  constraints = []
  for t in time_horizon:
    for track in tracks:
      # 冲突约束：同一时间同一轨道只能有一列车
      constraints.add( sum(x[i, track, t] for i in trains) <= 1 )
      
  for train in trains:
    # 运行时间约束、最小追踪间隔约束等
    constraints.add( check_running_time(train) )
    constraints.add( check_headway(train) )
    
  # 4. 求解混合整数规划 (MIP) 问题
  solution = solve_mip(objective, constraints)
  return solution`
      },
      {
        name: "车辆路径问题（VRP）算法",
        subtitle: "快递配送优化",
        details: [
          { label: "提出者", value: "George Dantzig & John Ramser" },
          { label: "年代", value: "1959年" },
          { label: "原理", value: "在满足客户需求和车辆容量约束下，规划多辆车的行驶路线，使总成本（距离、时间）最小" },
          { label: "类比", value: "就像快递员分拣包裹并规划送货路线，要用最少的车、走最短的路送完所有货" },
          { label: "特点", value: "组合优化难题（NP-hard）、约束复杂（时间窗、容量）、动态性强" },
          { label: "应用场景", value: "快递包裹派送、外卖路径规划、冷链物流配送、垃圾回收路线" }
        ],
        pseudocode: `# Clarke-Wright 节约算法 (启发式)
def clarke_wright_savings(depot, customers, capacity):
  # 1. 初始化：为每个客户分配一辆单独的车 (往返路线)
  routes = [[depot, c, depot] for c in customers]
  
  # 2. 计算节约值 (Savings)
  # S(i,j) = 距离(depot, i) + 距离(depot, j) - 距离(i, j)
  savings = []
  for i in customers:
    for j in customers:
      if i != j:
        s = dist(depot, i) + dist(depot, j) - dist(i, j)
        savings.append( (s, i, j) )
      
  # 3. 按节约值降序排序
  savings.sort(reverse=True)
  
  # 4. 合并路线
  for s, i, j in savings:
    if can_merge(routes, i, j, capacity):
      # 如果合并后不超过车辆容量，且 i 和 j 在各自路线的端点
      merge_routes(routes, i, j)
      
  return routes`
      },
      {
        name: "信号协调控制（绿波带）",
        subtitle: "一路绿灯的数学",
        details: [
          { label: "提出者", value: "John D. C. Little 等 (MAXBAND模型)" },
          { label: "年代", value: "1981年" },
          { label: "原理", value: "计算相邻路口信号灯的相位差，使以特定速度行驶的车辆连续遇到绿灯" },
          { label: "类比", value: "就像接力比赛，如果每个接棒者都提前起跑并精准接棒，整个队伍就能保持最高速前进" },
          { label: "特点", value: "提升干道通行效率、减少停车次数、降低排放" },
          { label: "应用场景", value: "城市主干道交通流优化、快速公交(BRT)优先通行" }
        ],
        pseudocode: `def calculate_green_wave(intersections, design_speed):
  # intersections: 沿线交叉口列表，包含距离和红绿灯周期
  
  # 1. 确定公共周期 (Common Cycle Length)
  C = max(intersection.min_cycle for intersection in intersections)
  
  # 2. 计算理想相位差 (Offset)
  for i in range(1, len(intersections)):
    distance = get_distance(intersections[i-1], intersections[i])
    
    # 行驶时间 = 距离 / 设计速度
    travel_time = distance / design_speed
    
    # 相位差 = 行驶时间对周期取模
    ideal_offset = travel_time % C
    
    intersections[i].offset = ideal_offset
    
  # 3. 微调带宽 (MAXBAND 算法逻辑)
  optimize_bandwidth(intersections, C)
  
  return intersections`
      },
      {
        name: "动态路径规划（Dijkstra/A*/D* Lite）",
        subtitle: "导航的核心",
        details: [
          { label: "提出者", value: "Dijkstra (1956) / Hart 等 (A*, 1968) / Koenig 等 (D* Lite, 2002)" },
          { label: "年代", value: "1956年 - 2002年" },
          { label: "原理", value: "Dijkstra寻找最短路径；A*加入启发式引导；D* Lite处理动态环境变化" },
          { label: "类比", value: "就像在森林里找出口，Dijkstra是地毯式搜索，A*是看着指南针往出口方向走，D* Lite是路断了能立刻换路" },
          { label: "特点", value: "计算效率高、结果最优（A*需满足一致性）、适应性强" },
          { label: "应用场景", value: "汽车导航系统、游戏NPC寻路、无人机避障飞行、AGV小车调度" }
        ],
        pseudocode: `# A* 算法伪代码
def A_star_search(start, goal, graph):
  open_set = PriorityQueue()
  open_set.put(start, priority=0)
  
  came_from = {} # 记录路径
  g_score = {start: 0} # 从起点到当前点的实际代价
  
  while not open_set.is_empty():
    current = open_set.pop()
    
    if current == goal:
      return reconstruct_path(came_from, current)
      
    for neighbor in graph.neighbors(current):
      # 实际代价 = 当前点代价 + 边权重
      tentative_g_score = g_score[current] + graph.cost(current, neighbor)
      
      if tentative_g_score < g_score.get(neighbor, INFINITY):
        came_from[neighbor] = current
        g_score[neighbor] = tentative_g_score
        
        # 优先级 f(n) = g(n) + h(n) (h为启发式函数，如曼哈顿距离)
        f_score = tentative_g_score + heuristic(neighbor, goal)
        open_set.put(neighbor, priority=f_score)
        
  return FAILURE`
      },
      {
        name: "航班调度与机组排班",
        subtitle: "航空运营的复杂优化",
        details: [
          { label: "提出者", value: "运筹学界 (如 Barnhart 等在列生成上的贡献)" },
          { label: "年代", value: "1990s (大规模应用)" },
          { label: "原理", value: "利用列生成算法在海量可行方案中寻找最优组合，满足法规和运营约束" },
          { label: "类比", value: "就像拼图，要把成千上万个航班、飞机和机组人员精准地拼在一起，不能有任何空隙或冲突" },
          { label: "特点", value: "极大规模优化、约束极其繁琐、对异常情况敏感" },
          { label: "应用场景", value: "航空公司航班计划编制、高铁乘务员排班、公交司机排班" }
        ],
        pseudocode: `# 列生成 (Column Generation) 框架
def crew_scheduling(flights, rules):
  # 1. 初始化主问题 (Restricted Master Problem, RMP)
  # 使用少量可行的机组排班方案(列)作为初始集合
  columns = generate_initial_rosters(flights)
  
  while not converged:
    # 2. 求解 RMP 的线性松弛问题
    dual_prices = solve_rmp_and_get_duals(columns)
    
    # 3. 求解子问题 (Pricing Problem)
    # 寻找 Reduced Cost 为负的新排班方案(新列)
    # 通常转化为带资源约束的最短路径问题 (ESPPRC)
    new_column, reduced_cost = solve_pricing_problem(flights, rules, dual_prices)
    
    if reduced_cost < 0:
      # 找到改进方案，加入主问题
      columns.add(new_column)
    else:
      # 没有负的 Reduced Cost，达到最优
      converged = True
      
  # 4. 恢复整数解 (Branch-and-Price)
  integer_solution = solve_integer_problem(columns)
  return integer_solution`
      }
    ]
  },
  {
    id: "decision-game-theory",
    title: "七、决策理论与博弈算法",
    algorithms: [
      {
        name: "37%法则（最优停止理论）",
        subtitle: "秘书问题的解",
        details: [
          { label: "提出者", value: "Merrill M. Flood, Martin Gardner (普及)" },
          { label: "年代", value: "1958年 / 1960年" },
          { label: "原理", value: "观察前37%的选项但不选择，之后遇到比前面都好的就选" },
          { label: "类比", value: "就像相亲，如果你打算见10个人，前3个（37%）只看不选，从第4个开始，只要遇到比前3个都好的就立刻结婚" },
          { label: "特点", value: "最大化选到最优项的概率（约37%）、平衡观察与决策" },
          { label: "应用场景", value: "招聘、租房、择偶（理论上）、买卖时机选择" }
        ],
        pseudocode: `def optimal_stopping(candidates):
  n = len(candidates)
  # 1. 确定观察期大小 (前 37%)
  k = int(n / math.e) 
  
  best_in_observation = -infinity
  
  # 2. 观察期：只看不选，记录最高分
  for i in range(k):
    if candidates[i].score > best_in_observation:
      best_in_observation = candidates[i].score
      
  # 3. 选择期：遇到比观察期最高分还高的，立刻选择
  for i in range(k, n):
    if candidates[i].score > best_in_observation:
      return candidates[i] # 成功选出
      
  # 4. 如果一直没遇到，只能选最后一个（或者空手而归）
  return candidates[-1]`
      },
      {
        name: "多臂老虎机（MAB）",
        subtitle: "探索与利用的权衡",
        details: [
          { label: "提出者", value: "Herbert Robbins" },
          { label: "年代", value: "1952年" },
          { label: "原理", value: "多个拉杆的老虎机，每个奖励概率未知，如何在有限次数内最大化收益" },
          { label: "类比", value: "就像去餐馆吃饭，是去那家你最喜欢的（利用），还是尝试一家新开的（探索）？" },
          { label: "特点", value: "解决探索与利用博弈、最小化累积遗憾" },
          { label: "应用场景", value: "A/B测试、推荐系统、广告投放、临床试验" }
        ],
        pseudocode: `# UCB (Upper Confidence Bound) 策略
def UCB_algorithm(arms, total_steps):
  counts = [0] * len(arms) # 每个摇臂被拉动的次数
  values = [0.0] * len(arms) # 每个摇臂的平均收益
  
  for t in range(1, total_steps + 1):
    # 1. 如果有摇臂还没拉过，先拉它
    if 0 in counts:
      action = counts.index(0)
    else:
      # 2. 计算每个摇臂的 UCB 值 = 平均收益 + 探索项
      ucb_values = []
      for i in range(len(arms)):
        # 探索项随总步数 t 增加，随该摇臂拉动次数 counts[i] 减少
        exploration_term = math.sqrt(2 * math.log(t) / counts[i])
        ucb_values.append(values[i] + exploration_term)
        
      # 3. 选择 UCB 值最大的摇臂
      action = argmax(ucb_values)
      
    # 4. 执行动作，获得奖励，更新状态
    reward = arms[action].pull()
    counts[action] += 1
    # 增量更新平均收益
    values[action] += (reward - values[action]) / counts[action]`
      },
      {
        name: "纳什均衡求解",
        subtitle: "博弈论的稳定点",
        details: [
          { label: "提出者", value: "John Forbes Nash Jr." },
          { label: "年代", value: "1950年" },
          { label: "原理", value: "寻找策略组合，使得任何单方改变策略都不会获得更高收益" },
          { label: "类比", value: "就像两个人在窄路上相遇，如果大家都靠右走，谁也不想换到左边（因为会撞车），这就是一种稳定状态" },
          { label: "特点", value: "非合作博弈的稳定性、策略的最优应对" },
          { label: "应用场景", value: "经济学寡头竞争、拍卖设计、交通网络流量分配、多智能体强化学习" }
        ],
        pseudocode: `# 虚拟博弈 (Fictitious Play) - 一种寻找纳什均衡的迭代算法
def fictitious_play(player1, player2, iterations):
  # 初始化双方对彼此策略的信念 (历史频率)
  belief_p1_about_p2 = initialize_uniform_distribution()
  belief_p2_about_p1 = initialize_uniform_distribution()
  
  for t in range(iterations):
    # 1. 玩家 1 假设玩家 2 会按历史频率出招，选择自己的最优应对 (Best Response)
    action1 = get_best_response(player1.payoff_matrix, belief_p1_about_p2)
    
    # 2. 玩家 2 假设玩家 1 会按历史频率出招，选择自己的最优应对
    action2 = get_best_response(player2.payoff_matrix, belief_p2_about_p1)
    
    # 3. 双方同时出招，更新历史频率信念
    belief_p1_about_p2.update(action2)
    belief_p2_about_p1.update(action1)
    
  # 经过大量迭代，信念的经验分布会收敛到纳什均衡
  return belief_p2_about_p1, belief_p1_about_p2`
      },
      {
        name: "拍卖算法",
        subtitle: "资源分配机制",
        details: [
          { label: "提出者", value: "William Vickrey (维克里拍卖)" },
          { label: "年代", value: "1961年" },
          { label: "原理", value: "通过特定规则（如第二高价）引导竞标者报出真实估值，实现资源最优分配" },
          { label: "类比", value: "就像在闲鱼拍卖，如果你真心想要某样东西，维克里规则能让你放心报出最高心理价，而不用担心被“杀猪”" },
          { label: "特点", value: "激励相容（诚实是最好策略）、分配效率高" },
          { label: "应用场景", value: "5G频谱分配、在线广告实时竞价（RTB）、碳排放权交易、云计算资源定价" }
        ],
        pseudocode: `# 维克里拍卖 (Vickrey Auction / 第二价格密封拍卖)
def vickrey_auction(bidders, item):
  # 1. 收集所有竞标者的密封报价
  bids = []
  for bidder in bidders:
    # 竞标者根据自己的真实估值出价 (在维克里拍卖中，诚实是弱占优策略)
    bid_amount = bidder.get_true_valuation(item) 
    bids.append({ "bidder": bidder, "amount": bid_amount })
    
  # 2. 按出价金额降序排序
  bids.sort(key=lambda x: x["amount"], reverse=True)
  
  # 3. 确定赢家 (出价最高者)
  winner = bids[0]["bidder"]
  highest_bid = bids[0]["amount"]
  
  # 4. 确定支付价格 (第二高的出价)
  if len(bids) > 1:
    price_to_pay = bids[1]["amount"]
  else:
    price_to_pay = reserve_price # 如果只有一人竞标，支付保留价
    
  return winner, price_to_pay`
      }
    ]
  },
  {
    id: "signal-communication",
    title: "八、信号处理与通信算法",
    algorithms: [
      {
        name: "快速傅里叶变换（FFT）",
        subtitle: "时域与频域的桥梁",
        details: [
          { label: "提出者", value: "James Cooley & John Tukey" },
          { label: "年代", value: "1965年" },
          { label: "原理", value: "将信号从时间域转换到频率域，高效计算DFT（O(n log n)）" },
          { label: "类比", value: "就像把一杯混合果汁（时域信号）还原成配方：3个苹果、2个橙子（频域分量）" },
          { label: "特点", value: "计算复杂度极低、分治法思想、现代信号处理基石" },
          { label: "应用场景", value: "音频压缩（MP3）、图像压缩（JPEG）、无线通信调制解调、雷达信号处理" }
        ],
        pseudocode: `# Cooley-Tukey FFT 算法 (递归实现)
def FFT(x):
  N = len(x)
  if N <= 1:
    return x
    
  # 1. 将输入序列分为偶数索引和奇数索引两部分
  even = FFT(x[0::2])
  odd = FFT(x[1::2])
  
  # 2. 合并结果
  T = [exp(-2j * pi * k / N) * odd[k] for k in range(N // 2)]
  
  # 3. 利用对称性计算前半部分和后半部分
  result = [0] * N
  for k in range(N // 2):
    result[k] = even[k] + T[k]
    result[k + N // 2] = even[k] - T[k]
    
  return result`
      },
      {
        name: "卡尔曼滤波",
        subtitle: "最优状态估计",
        details: [
          { label: "提出者", value: "Rudolf E. Kálmán" },
          { label: "年代", value: "1960年" },
          { label: "原理", value: "结合模型预测和传感器测量，根据各自的不确定性加权融合，递归更新" },
          { label: "类比", value: "就像在黑夜里走路，你根据步长估计位置（预测），同时用手摸墙确认（测量），两者结合最靠谱" },
          { label: "特点", value: "递归计算、最小均方误差最优、处理噪声能力强" },
          { label: "应用场景", value: "GPS导航、雷达跟踪、姿态估计、阿波罗登月计划" }
        ],
        pseudocode: `def kalman_filter(z_k, u_k):
  # 1. 预测阶段 (Predict)
  # 根据上一时刻状态预测当前状态
  x_pred = F * x_est_prev + B * u_k
  # 预测误差协方差 (加上过程噪声 Q)
  P_pred = F * P_prev * F^T + Q
  
  # 2. 更新阶段 (Update)
  # 计算卡尔曼增益 K (权衡预测和测量的信任度)
  # R 为测量噪声协方差
  K = P_pred * H^T * inv(H * P_pred * H^T + R)
  
  # 结合实际测量值 z_k 更新状态估计
  x_est = x_pred + K * (z_k - H * x_pred)
  
  # 更新误差协方差
  P = (I - K * H) * P_pred
  
  x_est_prev = x_est
  P_prev = P
  
  return x_est`
      },
      {
        name: "小波变换",
        subtitle: "多分辨率分析",
        details: [
          { label: "提出者", value: "Jean Morlet, Alex Grossmann, Yves Meyer 等" },
          { label: "年代", value: "1980s" },
          { label: "原理", value: "用不同尺度的小波函数分析信号，同时获得时域和频域局部信息" },
          { label: "类比", value: "就像用不同倍数的显微镜观察，既能看到整体轮廓（低频），也能看到微小瑕疵（高频）" },
          { label: "特点", value: "多分辨率分析、时频局部化、去噪效果好" },
          { label: "应用场景", value: "图像压缩（JPEG 2000）、去噪、特征提取、地震信号分析" }
        ],
        pseudocode: `# 离散小波变换 (DWT) 1D 伪代码
def DWT_1D(signal, low_pass_filter, high_pass_filter):
  # 1. 通过低通滤波器提取近似分量 (低频)
  approximation = convolve(signal, low_pass_filter)
  # 下采样 (Downsampling)
  cA = approximation[0::2] 
  
  # 2. 通过高通滤波器提取细节分量 (高频)
  detail = convolve(signal, high_pass_filter)
  # 下采样
  cD = detail[0::2]
  
  # cA 可以继续作为下一层的输入，进行多级分解
  return cA, cD`
      },
      {
        name: "OFDM（正交频分复用）",
        subtitle: "4G/5G的核心调制技术",
        details: [
          { label: "提出者", value: "Robert W. Chang" },
          { label: "年代", value: "1966年 (专利) / 1990s (广泛应用)" },
          { label: "原理", value: "将高速数据流分成多个低速子流，在正交子载波上并行传输，抵抗多径衰落" },
          { label: "类比", value: "就像把一大堆货分装在很多条小船上同时过河，就算沉了一两只，剩下的也能把货送到" },
          { label: "特点", value: "频谱利用率高、抗多径干扰强、易于实现" },
          { label: "应用场景", value: "Wi-Fi (802.11a/g/n/ac/ax)、4G LTE、5G NR、数字电视广播" }
        ],
        pseudocode: `def OFDM_transmitter(data_bits):
  # 1. 星座映射 (如 QAM 调制)
  symbols = QAM_modulate(data_bits)
  
  # 2. 串并转换 (将高速串行数据分为 N 个并行子流)
  parallel_symbols = serial_to_parallel(symbols, N)
  
  # 3. IFFT (将频域符号转换到时域信号，实现正交子载波叠加)
  time_signal = IFFT(parallel_symbols)
  
  # 4. 添加循环前缀 (CP, 消除符号间干扰 ISI)
  cp_length = N // 4
  signal_with_cp = add_cyclic_prefix(time_signal, cp_length)
  
  # 5. 并串转换后发送
  transmit_signal = parallel_to_serial(signal_with_cp)
  return transmit_signal`
      },
      {
        name: "MIMO检测算法",
        subtitle: "多天线系统信号分离",
        details: [
          { label: "提出者", value: "Arogyaswami Paulraj, Thomas Kailath 等" },
          { label: "年代", value: "1990s" },
          { label: "原理", value: "利用空间分集和复用，在接收端分离多路天线发送的重叠信号" },
          { label: "类比", value: "就像在嘈杂的晚宴上，你有两只耳朵（多天线），能从混合的声音中分辨出不同人的说话声" },
          { label: "特点", value: "大幅提升信道容量、空间复用增益、计算复杂度高" },
          { label: "应用场景", value: "现代无线通信 (Wi-Fi 6, 5G)、雷达系统" }
        ],
        pseudocode: `# 迫零检测 (Zero-Forcing Detection) 伪代码
def ZF_detection(received_signal_y, channel_matrix_H):
  # 接收信号模型: y = Hx + n (x为发送信号，n为噪声)
  
  # 1. 计算信道矩阵 H 的伪逆 (Moore-Penrose pseudoinverse)
  # W_ZF = (H^H * H)^-1 * H^H
  H_hermitian = conjugate_transpose(H)
  W_ZF = inverse(H_hermitian * H) * H_hermitian
  
  # 2. 乘以接收信号以消除天线间的干扰
  # x_hat = W_ZF * y = x + W_ZF * n
  x_estimated = W_ZF * received_signal_y
  
  # 3. 判决 (将估计值映射到最近的星座点)
  x_decoded = slice_to_constellation(x_estimated)
  
  return x_decoded`
      }
    ]
  },
  {
    id: "bioinformatics",
    title: "九、生物信息学算法",
    algorithms: [
      {
        name: "序列比对（Smith-Waterman/Needleman-Wunsch）",
        subtitle: "基因相似度计算",
        details: [
          { label: "提出者", value: "Needleman & Wunsch (全局) / Smith & Waterman (局部)" },
          { label: "年代", value: "1970年 / 1981年" },
          { label: "原理", value: "动态规划找最优比对，考虑匹配、错配、空位罚分" },
          { label: "BLAST", value: "启发式加速，适合数据库搜索" },
          { label: "应用场景", value: "DNA/蛋白质序列同源性分析、基因突变检测、亲子鉴定" }
        ],
        pseudocode: `# Smith-Waterman 局部比对算法
def smith_waterman(seq1, seq2, match_score, mismatch_penalty, gap_penalty):
  m, n = len(seq1), len(seq2)
  score_matrix = zeros(m+1, n+1)
  max_score = 0
  max_pos = (0, 0)
  
  # 动态规划填表
  for i in range(1, m+1):
    for j in range(1, n+1):
      # 计算四种可能的分数
      if seq1[i-1] == seq2[j-1]:
        match = score_matrix[i-1][j-1] + match_score
      else:
        match = score_matrix[i-1][j-1] - mismatch_penalty
        
      delete = score_matrix[i-1][j] - gap_penalty
      insert = score_matrix[i][j-1] - gap_penalty
      
      # 局部比对的关键：分数不能为负，最小为 0
      score_matrix[i][j] = max(0, match, delete, insert)
      
      if score_matrix[i][j] > max_score:
        max_score = score_matrix[i][j]
        max_pos = (i, j)
        
  # 从 max_pos 开始回溯，直到遇到 0，得到最优局部比对
  alignment = traceback(score_matrix, max_pos)
  return alignment`
      },
      {
        name: "隐马尔可夫模型（HMM）",
        subtitle: "基因预测",
        details: [
          { label: "提出者", value: "Leonard E. Baum 等" },
          { label: "年代", value: "1960s" },
          { label: "原理", value: "观测序列（DNA碱基）由隐藏状态（编码区/非编码区）生成，用Viterbi算法找最可能状态路径" },
          { label: "应用场景", value: "基因识别、蛋白质家族分类、语音识别、词性标注" }
        ],
        pseudocode: `# Viterbi 算法 (寻找最可能的隐藏状态序列)
def viterbi(observations, states, start_prob, trans_prob, emit_prob):
  V = [{}] # 动态规划表 V[时间t][状态s] = 最大概率
  path = {} # 记录路径
  
  # 1. 初始化 t=0
  for s in states:
    V[0][s] = start_prob[s] * emit_prob[s][observations[0]]
    path[s] = [s]
    
  # 2. 递推 t > 0
  for t in range(1, len(observations)):
    V.append({})
    new_path = {}
    
    for current_state in states:
      # 寻找从哪个前置状态转移过来概率最大
      (max_prob, best_prev_state) = max(
        (V[t-1][prev_state] * trans_prob[prev_state][current_state] * emit_prob[current_state][observations[t]], prev_state)
        for prev_state in states
      )
      
      V[t][current_state] = max_prob
      new_path[current_state] = path[best_prev_state] + [current_state]
      
    path = new_path
    
  # 3. 终止，找出最后时刻概率最大的状态
  (max_prob, final_state) = max((V[-1][s], s) for s in states)
  return path[final_state] # 返回最可能的隐藏状态序列`
      },
      {
        name: "系统发育树构建",
        subtitle: "进化关系推断",
        details: [
          { label: "提出者", value: "Naruya Saitou & Masatoshi Nei (NJ法)" },
          { label: "年代", value: "1987年 (NJ法)" },
          { label: "方法", value: "邻接法（NJ）、最大简约法、最大似然法、贝叶斯推断" },
          { label: "输入", value: "物种间的遗传距离矩阵" },
          { label: "应用场景", value: "物种进化史研究、病毒溯源（如新冠病毒变异株分析）" }
        ],
        pseudocode: `# 邻接法 (Neighbor-Joining, NJ) 伪代码
def neighbor_joining(distance_matrix, taxa):
  while len(taxa) > 2:
    n = len(taxa)
    
    # 1. 计算每个节点的净散度 (Net Divergence)
    r = calculate_net_divergence(distance_matrix)
    
    # 2. 计算调整后的距离矩阵 Q
    Q = zeros(n, n)
    for i in range(n):
      for j in range(i+1, n):
        Q[i][j] = (n - 2) * distance_matrix[i][j] - r[i] - r[j]
        
    # 3. 找到 Q 矩阵中值最小的一对节点 (i, j)
    i, j = find_min(Q)
    
    # 4. 创建新节点 u 连接 i 和 j，计算分支长度
    dist_i_u = 0.5 * distance_matrix[i][j] + (r[i] - r[j]) / (2 * (n - 2))
    dist_j_u = distance_matrix[i][j] - dist_i_u
    
    # 5. 更新距离矩阵：计算 u 到其他节点的距离，删除 i 和 j
    update_distance_matrix(distance_matrix, i, j, u)
    taxa.remove(i, j)
    taxa.add(u)
    
  # 连接最后剩下的两个节点
  return construct_tree()`
      },
      {
        name: "蛋白质折叠预测（AlphaFold）",
        subtitle: "从序列到结构",
        details: [
          { label: "提出者", value: "DeepMind (John Jumper, Demis Hassabis 等)" },
          { label: "年代", value: "2020年 (AlphaFold 2)" },
          { label: "原理", value: "深度学习方法，利用多序列比对（MSA）和注意力机制预测氨基酸残基间距离和角度" },
          { label: "应用场景", value: "新药研发、酶工程、疾病机理研究、农业生物技术" }
        ],
        pseudocode: `# AlphaFold 2 核心架构伪代码
def AlphaFold2(amino_acid_sequence):
  # 1. 特征提取
  # 搜索基因数据库，生成多序列比对 (MSA)
  msa_features = search_databases(amino_acid_sequence)
  # 生成氨基酸对特征 (Pair representation)
  pair_features = initialize_pair_features(amino_acid_sequence)
  
  # 2. Evoformer 模块 (核心注意力机制)
  for i in range(48): # 48层
    # MSA 和 Pair 特征相互交换信息更新
    msa_features = msa_attention(msa_features, pair_features)
    pair_features = pair_communication(pair_features, msa_features)
    
  # 3. 结构模块 (Structure Module)
  # 将抽象特征转化为 3D 坐标
  # 初始化所有残基在原点
  3d_coordinates = initialize_at_origin() 
  
  for j in range(8): # 迭代细化 3D 结构
    # 预测主链和侧链的旋转和平移 (SE(3) 等变注意力)
    updates = invariant_point_attention(msa_features, pair_features, 3d_coordinates)
    3d_coordinates = apply_updates(3d_coordinates, updates)
    
  # 4. 物理约束优化 (Amber relaxation)
  final_structure = relax_structure(3d_coordinates)
  
  return final_structure`
      }
    ]
  },
  {
    id: "finance-economics",
    title: "十、金融与经济算法",
    algorithms: [
      {
        name: "Black-Scholes 期权定价",
        subtitle: "金融工程的基石",
        details: [
          { label: "提出者", value: "Fischer Black, Myron Scholes, Robert Merton" },
          { label: "年代", value: "1973年" },
          { label: "原理", value: "假设股价服从几何布朗运动，通过无套利原则推导偏微分方程" },
          { label: "类比", value: "就像给一份“未来买房的权利”定金（期权）定价，要考虑现在的房价、未来的波动、利息和时间，算出一个公平价格" },
          { label: "特点", value: "偏微分方程模型、无套利定价、希腊字母风险管理" },
          { label: "应用场景", value: "欧式期权定价、金融衍生品估值、企业员工期权评估" }
        ],
        pseudocode: `import math
from scipy.stats import norm

def black_scholes_call(S, K, T, r, sigma):
  # S: 标的资产当前价格 (Spot price)
  # K: 期权执行价格 (Strike price)
  # T: 距离到期时间 (以年为单位)
  # r: 无风险利率 (Risk-free rate)
  # sigma: 标的资产波动率 (Volatility)
  
  # 1. 计算 d1 和 d2 参数
  d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
  d2 = d1 - sigma * math.sqrt(T)
  
  # 2. 计算看涨期权价格 (Call Option Price)
  # norm.cdf 是标准正态分布的累积分布函数
  call_price = S * norm.cdf(d1) - K * math.exp(-r * T) * norm.cdf(d2)
  
  return call_price`
      },
      {
        name: "蒙特卡洛模拟",
        subtitle: "风险分析的随机采样",
        details: [
          { label: "提出者", value: "Stanislaw Ulam, John von Neumann" },
          { label: "年代", value: "1940s (曼哈顿计划)" },
          { label: "原理", value: "大量随机采样模拟资产价格路径，计算衍生品价格或风险价值（VaR）" },
          { label: "类比", value: "就像预测一场球赛的结果，如果你模拟一万次比赛，统计胜平负的比例，就能得出一个非常接近真实概率的预测" },
          { label: "特点", value: "处理复杂非线性问题、计算精度随采样数增加、易于并行化" },
          { label: "应用场景", value: "复杂金融衍生品定价、投资组合风险评估(VaR)、项目成本估算" }
        ],
        pseudocode: `def monte_carlo_option_pricing(S0, K, T, r, sigma, num_simulations):
  payoff_sum = 0.0
  
  for i in range(num_simulations):
    # 1. 模拟一条资产价格路径 (基于几何布朗运动)
    # Z 是标准正态分布随机数
    Z = random_normal(0, 1)
    
    # 模拟到期日 T 时的资产价格 S_T
    S_T = S0 * exp((r - 0.5 * sigma**2) * T + sigma * sqrt(T) * Z)
    
    # 2. 计算该路径下的期权收益 (以看涨期权为例)
    payoff = max(S_T - K, 0)
    payoff_sum += payoff
    
  # 3. 计算所有模拟路径的平均收益
  average_payoff = payoff_sum / num_simulations
  
  # 4. 将未来收益折现到现在的价值
  option_price = exp(-r * T) * average_payoff
  
  return option_price`
      },
      {
        name: "高频交易算法",
        subtitle: "微秒级的博弈",
        details: [
          { label: "提出者", value: "华尔街量化基金 (如 Renaissance Technologies)" },
          { label: "年代", value: "1990s - 至今" },
          { label: "原理", value: "利用极速计算和低延迟网络，在微秒级时间内执行大量交易指令，赚取微小价差" },
          { label: "类比", value: "就像在超市里，你比所有人都能更快看到价格变动，在涨价前的一秒买光所有打折货，再在另一家超市高价卖掉" },
          { label: "特点", value: "极低延迟、高换手率、微小利润累积、硬件加速" },
          { label: "应用场景", value: "股票/期货市场流动性提供、跨市场套利、订单流毒性分析" }
        ],
        pseudocode: `# 简化的做市商策略 (Market Making)
def market_making_strategy(order_book, inventory, risk_limit):
  # 1. 计算理论公允价格 (Mid Price)
  best_bid = order_book.get_best_bid()
  best_ask = order_book.get_best_ask()
  mid_price = (best_bid + best_ask) / 2
  
  # 2. 根据当前库存调整报价 (Inventory Risk Management)
  # 如果持仓过多，降低报价以吸引买家；如果做空过多，提高报价以吸引卖家
  inventory_skew = calculate_skew(inventory, risk_limit)
  adjusted_mid = mid_price - inventory_skew
  
  # 3. 确定买卖价差 (Spread)
  # 基于市场波动率调整价差，波动率大则价差大以补偿风险
  spread = calculate_optimal_spread(order_book.volatility)
  
  # 4. 提交双边报价 (Quote)
  my_bid = adjusted_mid - spread / 2
  my_ask = adjusted_mid + spread / 2
  
  submit_limit_order("BUY", price=my_bid, size=standard_size)
  submit_limit_order("SELL", price=my_ask, size=standard_size)`
      },
      {
        name: "信用评分模型",
        subtitle: "违约概率预测",
        details: [
          { label: "提出者", value: "Bill Fair, Earl Isaac (FICO评分)" },
          { label: "年代", value: "1956年 (FICO成立) / 1989年 (通用FICO分数)" },
          { label: "原理", value: "利用逻辑回归或机器学习算法，根据历史信用数据预测借款人违约概率并转化为分数" },
          { label: "类比", value: "就像老师给学生打分，根据平时的作业、考试和出勤（信用历史），预测期末是否会挂科（违约），分数越高越可靠" },
          { label: "特点", value: "统计学建模、多维度特征评估、风险量化" },
          { label: "应用场景", value: "信用卡审批、房贷额度计算、P2P网贷风控、企业信用评级" }
        ],
        pseudocode: `# 信用评分卡模型 (基于逻辑回归的传统方法)
def build_scorecard(user_data):
  # 1. 特征分箱 (Binning) 与 WOE 编码 (Weight of Evidence)
  # 将连续变量(如年龄、收入)分段，计算每个分段的违约概率对数比
  woe_data = apply_woe_transformation(user_data)
  
  # 2. 训练逻辑回归模型
  # 预测违约概率 P(Default)
  model = LogisticRegression()
  model.fit(woe_data.features, woe_data.labels)
  
  # 3. 将模型系数转化为标准信用分数 (如 300-850 分)
  # Score = Offset + Factor * ln(Odds)
  # Odds = P(Good) / P(Bad)
  base_score = calculate_base_score(model.intercept)
  
  scorecard = {"base_score": base_score, "features": {}}
  for feature, coef in zip(features, model.coef_):
    # 将每个特征的 WOE 值乘以回归系数，转化为具体的分数加减项
    scorecard["features"][feature] = convert_coef_to_points(coef, feature.woe_bins)
    
  return scorecard`
      }
    ]
  },
  {
    id: "robotics-path-planning",
    title: "十一、机器人与路径规划",
    algorithms: [
      {
        name: "RRT（快速随机树）",
        subtitle: "高维空间路径规划",
        details: [
          { label: "提出者", value: "Steven M. LaValle" },
          { label: "年代", value: "1998年" },
          { label: "原理", value: "从起点开始随机采样并扩展树状结构，直到接近目标点，适合高维复杂空间" },
          { label: "类比", value: "就像一棵在黑暗中四处乱长的树根，只要有一根须子碰到了水源（目标），路径就通了" },
          { label: "特点", value: "概率完备性、适合非齐次约束、无需预处理空间" },
          { label: "应用场景", value: "机械臂抓取路径规划、无人车复杂环境避障、无人机三维空间飞行" }
        ],
        pseudocode: `def RRT(start, goal, environment):
  tree = Tree(root=start)
  
  for i in range(max_iterations):
    # 1. 随机采样 (以一定概率直接采样目标点，加速收敛)
    if rand() < goal_bias:
      q_rand = goal
    else:
      q_rand = random_state(environment)
      
    # 2. 找到树中距离 q_rand 最近的节点
    q_near = tree.nearest_neighbor(q_rand)
    
    # 3. 从 q_near 向 q_rand 延伸一个步长，得到新节点 q_new
    q_new = steer(q_near, q_rand, step_size)
    
    # 4. 碰撞检测
    if not environment.is_collision(q_near, q_new):
      tree.add_vertex(q_new)
      tree.add_edge(q_near, q_new)
      
      # 5. 检查是否到达目标附近
      if distance(q_new, goal) < threshold:
        return extract_path(tree, start, q_new)
        
  return FAILURE`
      },
      {
        name: "PRM（概率路线图）",
        subtitle: "多查询路径规划",
        details: [
          { label: "提出者", value: "Lydia E. Kavraki 等" },
          { label: "年代", value: "1996年" },
          { label: "原理", value: "预处理阶段在自由空间随机采样构建路线图，查询阶段利用图搜索算法寻找路径" },
          { label: "类比", value: "就像在陌生的城市里先随机撒下一堆路标并连成网（预处理），以后想去哪儿直接查地图（查询）就行了" },
          { label: "特点", value: "适合多查询任务、预处理开销大但查询快、适合静态环境" },
          { label: "应用场景", value: "静态工厂环境中的多机器人调度、游戏地图预处理寻路" }
        ],
        pseudocode: `# 1. 学习阶段 (预处理构建路线图)
def PRM_build_roadmap(environment, num_samples, k_neighbors):
  roadmap = Graph()
  
  # 随机撒点
  while roadmap.num_vertices() < num_samples:
    q_rand = random_state(environment)
    if not environment.is_collision(q_rand):
      roadmap.add_vertex(q_rand)
      
  # 连接邻居
  for q in roadmap.vertices:
    neighbors = find_k_nearest_neighbors(roadmap, q, k_neighbors)
    for q_near in neighbors:
      # 如果两点之间没有障碍物阻挡
      if not environment.is_collision_line(q, q_near):
        roadmap.add_edge(q, q_near, weight=distance(q, q_near))
        
  return roadmap

# 2. 查询阶段
def PRM_query(roadmap, start, goal, environment):
  # 将起点和终点连接到路线图上
  connect_to_roadmap(roadmap, start, environment)
  connect_to_roadmap(roadmap, goal, environment)
  
  # 使用 A* 或 Dijkstra 在图上搜索最短路径
  path = A_star_search(roadmap, start, goal)
  return path`
      },
      {
        name: "DWA（动态窗口法）",
        subtitle: "机器人局部避障",
        details: [
          { label: "提出者", value: "Dieter Fox 等" },
          { label: "年代", value: "1997年" },
          { label: "原理", value: "在速度空间(v,w)中采样，模拟运动轨迹，排除碰撞轨迹，选择最优评分轨迹" },
          { label: "类比", value: "就像开车时，你根据当前的油门和方向盘角度，预判未来几秒会撞到哪儿，然后选一个既快又安全的开法" },
          { label: "特点", value: "局部避障、考虑动力学约束、实时性强" },
          { label: "应用场景", value: "扫地机器人避障、仓储物流AGV动态避让行人" }
        ],
        pseudocode: `def DWA_local_planner(current_state, goal, obstacles):
  # 1. 计算动态窗口 (Dynamic Window)
  # 基于当前速度和最大加速度，计算下一时刻可能达到的速度范围 (v, w)
  v_min, v_max, w_min, w_max = calculate_dynamic_window(current_state)
  
  best_trajectory = null
  max_score = -infinity
  
  # 2. 在速度空间中采样
  for v in range(v_min, v_max, v_resolution):
    for w in range(w_min, w_max, w_resolution):
      
      # 3. 轨迹推演 (模拟以 (v,w) 运行一小段时间 dt 后的轨迹)
      trajectory = simulate_trajectory(current_state, v, w, dt)
      
      # 4. 碰撞检测
      if is_collision(trajectory, obstacles):
        continue
        
      # 5. 轨迹评价 (目标函数)
      # 评价指标：朝向目标的角度差、距离障碍物的距离、当前速度大小
      heading_score = evaluate_heading(trajectory[-1], goal)
      clearance_score = evaluate_clearance(trajectory, obstacles)
      velocity_score = evaluate_velocity(v)
      
      total_score = alpha * heading_score + beta * clearance_score + gamma * velocity_score
      
      if total_score > max_score:
        max_score = total_score
        best_trajectory = trajectory
        best_command = (v, w)
        
  return best_command # 返回最优的线速度和角速度`
      },
      {
        name: "人工势场法",
        subtitle: "引力和斥力的平衡",
        details: [
          { label: "提出者", value: "Oussama Khatib" },
          { label: "年代", value: "1986年" },
          { label: "原理", value: "目标产生引力，障碍物产生斥力，机器人沿合力方向运动" },
          { label: "类比", value: "就像一个小球滚向一个深坑（目标），但路上有很多凸起的石头（障碍物）把小球弹开，最后小球在引力和斥力的共同作用下到达坑底" },
          { label: "特点", value: "计算简单、实时性极高、容易陷入局部极小值（死胡同）" },
          { label: "应用场景", value: "无人机编队飞行、简单环境下的快速反应避障" }
        ],
        pseudocode: `def artificial_potential_field(current_pos, goal_pos, obstacles):
  # 1. 计算引力 (Attractive Force)
  # 引力指向目标，距离越远引力越大 (通常用二次函数)
  F_att = k_att * (goal_pos - current_pos)
  
  # 2. 计算斥力 (Repulsive Force)
  F_rep = [0, 0]
  for obs in obstacles:
    dist = distance(current_pos, obs.pos)
    # 只有在障碍物影响范围内才产生斥力，距离越近斥力越大
    if dist < obs.influence_radius:
      magnitude = k_rep * (1/dist - 1/obs.influence_radius) * (1 / dist^2)
      direction = normalize(current_pos - obs.pos)
      F_rep += magnitude * direction
      
  # 3. 计算合力
  F_total = F_att + F_rep
  
  # 4. 根据合力方向更新机器人位置 (或作为速度指令)
  next_pos = current_pos + step_size * normalize(F_total)
  
  return next_pos`
      },
      {
        name: "SLAM（同步定位与地图构建）",
        subtitle: "未知环境探索",
        details: [
          { label: "提出者", value: "Hugh Durrant-Whyte, John J. Leonard 等" },
          { label: "年代", value: "1986年 (概念提出) / 1990s (理论成熟)" },
          { label: "原理", value: "机器人在未知环境中移动时，通过传感器数据同时构建地图并估计自身位置" },
          { label: "类比", value: "就像你在一个完全漆黑的迷宫里，手里只有一把手电筒。你一边走一边画地图，同时根据画出的地图来判断自己现在走到了哪儿" },
          { label: "特点", value: "解决“鸡生蛋蛋生鸡”问题、回环检测、多传感器融合" },
          { label: "应用场景", value: "自动驾驶高精地图构建、AR/VR空间定位、火星车探测" }
        ],
        pseudocode: `# 基于图优化 (Graph-based) 的 SLAM 框架
def graph_slam(sensor_data, odometry_data):
  graph = PoseGraph()
  
  # 1. 前端 (Front-end): 构建位姿图
  for t in range(len(sensor_data)):
    # 节点：机器人在 t 时刻的位姿
    current_pose = estimate_pose_from_odometry(odometry_data[t])
    graph.add_node(t, current_pose)
    
    # 边 1：相邻位姿之间的里程计约束
    if t > 0:
      graph.add_edge(t-1, t, measurement=odometry_data[t])
      
    # 边 2：回环检测 (Loop Closure) 约束
    # 如果当前传感器数据与历史某个时刻的数据高度匹配，说明回到了走过的地方
    loop_candidate_id = detect_loop_closure(sensor_data[t], history_sensor_data)
    if loop_candidate_id is not null:
      relative_pose = compute_relative_pose(sensor_data[t], sensor_data[loop_candidate_id])
      graph.add_edge(loop_candidate_id, t, measurement=relative_pose)
      
  # 2. 后端 (Back-end): 图优化
  # 调整所有节点的位置，使得所有边(约束)的误差平方和最小
  optimized_poses = optimize_graph_least_squares(graph)
  
  # 3. 建图 (Mapping)
  # 根据优化后的精确位姿和传感器数据拼接全局地图
  global_map = build_map(optimized_poses, sensor_data)
  
  return optimized_poses, global_map`
      }
    ]
  },
  {
    id: "other-interdisciplinary",
    title: "十二、其他跨学科算法",
    algorithms: [
      {
        name: "PageRank",
        subtitle: "网页重要性排序",
        details: [
          { label: "提出者", value: "Larry Page & Sergey Brin (Google创始人)" },
          { label: "年代", value: "1998年" },
          { label: "原理", value: "将链接视为投票，重要页面的投票权重更高，通过迭代计算网页的特征向量来排序" },
          { label: "类比", value: "就像学术论文引用，被越多牛人引用的论文越牛，被越多重要网页链接的网页也越重要" },
          { label: "特点", value: "链接分析、随机游走模型、抗作弊能力强" },
          { label: "应用场景", value: "搜索引擎结果排序、社交网络影响力分析、文献引用分析" }
        ],
        pseudocode: `def calculate_pagerank(graph, d=0.85, max_iterations=100, tol=1e-6):
  # d: 阻尼系数 (Damping factor)，通常设为 0.85
  N = graph.num_nodes
  
  # 1. 初始化每个节点的 PageRank 值为 1/N
  PR = {node: 1.0 / N for node in graph.nodes}
  
  for iteration in range(max_iterations):
    new_PR = {}
    diff = 0
    
    for node in graph.nodes:
      # 2. 计算来自入链节点的贡献
      rank_sum = 0
      for incoming_node in graph.get_incoming_edges(node):
        out_degree = len(graph.get_outgoing_edges(incoming_node))
        rank_sum += PR[incoming_node] / out_degree
        
      # 3. 更新 PageRank 公式
      new_PR[node] = (1 - d) / N + d * rank_sum
      
      # 计算变化量用于收敛判断
      diff += abs(new_PR[node] - PR[node])
      
    PR = new_PR
    
    # 4. 检查是否收敛
    if diff < tol:
      break
      
  return PR`
      },
      {
        name: "Apriori/FP-Growth",
        subtitle: "关联规则挖掘",
        details: [
          { label: "提出者", value: "Rakesh Agrawal 等 (Apriori) / Jiawei Han 等 (FP-Growth)" },
          { label: "年代", value: "1994年 (Apriori) / 2000年 (FP-Growth)" },
          { label: "原理", value: "挖掘数据集中项与项之间的关联规则，通过支持度和置信度筛选频繁项集" },
          { label: "类比", value: "就像超市发现买尿布的人通常也会买啤酒，于是把它们摆在一起卖，这就是关联规则挖掘" },
          { label: "特点", value: "频繁项集挖掘、剪枝策略（Apriori）、树结构加速（FP-Growth）" },
          { label: "应用场景", value: "超市商品摆放优化、电商推荐系统(买了又买)、医疗并发症分析" }
        ],
        pseudocode: `# Apriori 算法伪代码
def apriori(transactions, min_support):
  # 1. 找出所有频繁 1-项集
  L1 = find_frequent_1_itemsets(transactions, min_support)
  L = [L1]
  k = 2
  
  while len(L[k-2]) > 0:
    # 2. 连接步 (Join): 由频繁 (k-1)-项集生成候选 k-项集
    C_k = generate_candidates(L[k-2])
    
    # 3. 剪枝步 (Prune): 如果候选集的某个子集不是频繁的，则它自身也不是频繁的
    C_k = prune_candidates(C_k, L[k-2])
    
    # 4. 扫描数据库，计算候选集的支持度
    item_counts = count_support(transactions, C_k)
    
    # 5. 过滤出满足最小支持度的频繁 k-项集
    L_k = filter_by_support(item_counts, min_support)
    
    L.append(L_k)
    k += 1
    
  return L # 返回所有频繁项集`
      },
      {
        name: "DBSCAN/OPTICS",
        subtitle: "密度聚类",
        details: [
          { label: "提出者", value: "Martin Ester 等 (DBSCAN) / Mihael Ankerst 等 (OPTICS)" },
          { label: "年代", value: "1996年 (DBSCAN) / 1999年 (OPTICS)" },
          { label: "原理", value: "基于密度的聚类方法，通过寻找高密度区域来识别簇，并能自动识别噪声点" },
          { label: "类比", value: "就像在地图上找城市，房子密集的区域就是城市（簇），荒郊野外零星的房子就是噪声" },
          { label: "特点", value: "发现任意形状簇、无需预设簇数、对噪声鲁棒" },
          { label: "应用场景", value: "异常检测、地理空间数据聚类、图像分割、雷达点云处理" }
        ],
        pseudocode: `# DBSCAN 算法伪代码
def dbscan(data, eps, min_pts):
  cluster_id = 0
  labels = [UNCLASSIFIED] * len(data)
  
  for i in range(len(data)):
    if labels[i] != UNCLASSIFIED:
      continue
      
    # 1. 寻找点 i 的 eps 邻域内的所有点
    neighbors = region_query(data, i, eps)
    
    # 2. 如果邻居数量少于 min_pts，标记为噪声
    if len(neighbors) < min_pts:
      labels[i] = NOISE
    else:
      # 3. 否则，点 i 是核心点，创建一个新簇
      cluster_id += 1
      expand_cluster(data, labels, i, neighbors, cluster_id, eps, min_pts)
      
  return labels

def expand_cluster(data, labels, point_idx, neighbors, cluster_id, eps, min_pts):
  labels[point_idx] = cluster_id
  
  # 遍历邻居队列
  i = 0
  while i < len(neighbors):
    neighbor_idx = neighbors[i]
    
    # 如果邻居之前被标记为噪声，现在它属于当前簇的边界点
    if labels[neighbor_idx] == NOISE:
      labels[neighbor_idx] = cluster_id
      
    # 如果邻居还未被分类
    if labels[neighbor_idx] == UNCLASSIFIED:
      labels[neighbor_idx] = cluster_id
      
      # 检查该邻居是否也是核心点
      new_neighbors = region_query(data, neighbor_idx, eps)
      if len(new_neighbors) >= min_pts:
        # 将新邻居加入队列继续扩展
        neighbors.extend(new_neighbors)
        
    i += 1`
      },
      {
        name: "t-SNE/UMAP",
        subtitle: "高维数据可视化",
        details: [
          { label: "提出者", value: "Laurens van der Maaten & Geoffrey Hinton (t-SNE) / Leland McInnes 等 (UMAP)" },
          { label: "年代", value: "2008年 (t-SNE) / 2018年 (UMAP)" },
          { label: "原理", value: "将高维数据映射到低维空间（2D/3D），同时尽可能保持高维空间中的局部邻域结构" },
          { label: "类比", value: "就像把一个复杂的地球仪压扁成一张平面地图，虽然形状变了，但原本挨在一起的国家在地图上还是挨在一起" },
          { label: "特点", value: "非线性降维、保持局部结构、可视化效果极佳" },
          { label: "应用场景", value: "单细胞RNA测序数据分析、深度学习特征可视化、自然语言词向量降维" }
        ],
        pseudocode: `# t-SNE 核心思想伪代码
def t_SNE(X, no_dims=2, perplexity=30.0, learning_rate=200.0, max_iter=1000):
  # 1. 计算高维空间中数据点之间的联合概率 P_ij (基于高斯分布)
  # 距离越近，概率越大；困惑度(perplexity)决定了高斯分布的方差
  P = compute_high_dimensional_affinities(X, perplexity)
  
  # 2. 随机初始化低维空间中的点 Y
  Y = sample_random_normal(size=(len(X), no_dims))
  
  for iter in range(max_iter):
    # 3. 计算低维空间中点之间的联合概率 Q_ij (基于 t 分布)
    # t 分布的长尾特性可以缓解"拥挤问题" (Crowding problem)
    Q = compute_low_dimensional_affinities(Y)
    
    # 4. 计算 KL 散度 (Kullback-Leibler divergence) 作为损失函数
    # 衡量 P 和 Q 两个概率分布的差异
    loss = KL_divergence(P, Q)
    
    # 5. 计算梯度并使用梯度下降更新低维坐标 Y
    gradients = compute_gradients(P, Q, Y)
    Y = Y - learning_rate * gradients
    
  return Y`
      },
      {
        name: "退火算法在芯片设计中的应用（Placement）",
        subtitle: "布局优化",
        details: [
          { label: "提出者", value: "Carl Sechen & Alberto Sangiovanni-Vincentelli (TimberWolf)" },
          { label: "年代", value: "1985年" },
          { label: "原理", value: "利用模拟退火算法优化芯片上标准单元的布局，以最小化总线长、时序延迟和功耗" },
          { label: "类比", value: "就像在有限的房间里摆放家具，先随机乱放（高温），然后慢慢微调（降温），直到找到一个走路最顺手、空间利用率最高的位置" },
          { label: "特点", value: "启发式搜索、跳出局部最优、处理大规模约束" },
          { label: "应用场景", value: "集成电路(IC)物理设计、FPGA布局布线、印刷电路板(PCB)设计" }
        ],
        pseudocode: `def simulated_annealing_placement(cells, netlist, T_initial, T_final, alpha):
  # 1. 随机生成初始布局
  current_placement = generate_random_placement(cells)
  T = T_initial
  
  while T > T_final:
    for i in range(moves_per_temperature):
      # 2. 产生扰动 (随机交换两个单元的位置，或移动一个单元)
      new_placement = perturb_placement(current_placement)
      
      # 3. 计算代价函数变化 (主要考虑总线长 HPWL、重叠面积、时序违例)
      delta_cost = calculate_cost(new_placement, netlist) - calculate_cost(current_placement, netlist)
      
      # 4. Metropolis 准则接受或拒绝新布局
      if delta_cost < 0:
        current_placement = new_placement # 接受更好解
      else:
        # 以一定概率接受较差解，避免陷入局部最优
        if rand(0, 1) < exp(-delta_cost / T):
          current_placement = new_placement
          
    # 5. 降温
    T = T * alpha
    
  return current_placement`
      },
      {
        name: "计算流体动力学（CFD）算法",
        subtitle: "纳维-斯托克斯方程求解",
        details: [
          { label: "提出者", value: "John von Neumann 等 (早期数值方法) / Suhas Patankar (SIMPLE算法)" },
          { label: "年代", value: "1950s (早期) / 1972年 (SIMPLE)" },
          { label: "原理", value: "通过数值方法求解描述流体运动的纳维-斯托克斯方程，模拟流体流动现象" },
          { label: "类比", value: "就像把空气或水切成无数个微小的立方体（网格），计算每个立方体受到的压力和推力，从而预测整股气流或水流的走向" },
          { label: "特点", value: "离散化求解、非线性耦合、计算量巨大" },
          { label: "应用场景", value: "飞机气动外形设计、F1赛车风洞模拟、建筑风环境评估、天气预报" }
        ],
        pseudocode: `# SIMPLE 算法 (Semi-Implicit Method for Pressure Linked Equations) 伪代码
def SIMPLE_algorithm(mesh, initial_conditions, boundary_conditions):
  # 初始化速度场 u*, v*, w* 和压力场 p*
  u, v, w, p = initial_conditions
  
  while not converged:
    # 1. 求解动量方程 (Momentum Equations)
    # 使用猜测的压力场 p* 计算出中间速度场 u*, v*, w*
    u_star, v_star, w_star = solve_momentum_equations(u, v, w, p, mesh)
    
    # 2. 求解压力修正方程 (Pressure Correction Equation)
    # 根据连续性方程(质量守恒)，由中间速度场计算压力修正量 p'
    p_prime = solve_pressure_correction(u_star, v_star, w_star, mesh)
    
    # 3. 修正压力场和速度场
    # p_new = p* + alpha * p' (alpha 为亚松弛因子)
    p = p + alpha_p * p_prime
    u = u_star + velocity_correction(p_prime, 'x')
    v = v_star + velocity_correction(p_prime, 'y')
    w = w_star + velocity_correction(p_prime, 'z')
    
    # 4. 求解其他标量方程 (如温度、湍流等)
    solve_scalar_equations(u, v, w, mesh)
    
    # 5. 检查残差是否满足收敛标准
    converged = check_residuals()
    
  return u, v, w, p`
      },
      {
        name: "有限元分析（FEA）",
        subtitle: "结构力学仿真",
        details: [
          { label: "提出者", value: "Richard Courant, Ray Clough 等" },
          { label: "年代", value: "1940s - 1950s" },
          { label: "原理", value: "将连续的结构体离散为有限个单元，通过求解大型刚度矩阵方程来计算结构的应力、应变和位移" },
          { label: "类比", value: "就像把一个复杂的零件（如大桥或汽车）看作是由无数个微小的弹簧连接而成的网格，通过计算每个小弹簧的拉伸程度来判断整个零件哪里最容易断" },
          { label: "特点", value: "几何适应性强、物理场耦合、工业仿真标准" },
          { label: "应用场景", value: "汽车碰撞测试仿真、桥梁承重分析、航空发动机叶片应力分析" }
        ],
        pseudocode: `def finite_element_analysis(geometry, material_properties, loads, boundary_conditions):
  # 1. 网格划分 (Meshing)
  # 将连续几何体离散为节点 (nodes) 和单元 (elements)
  nodes, elements = generate_mesh(geometry)
  
  # 初始化全局刚度矩阵 K 和全局载荷向量 F
  num_dof = len(nodes) * dof_per_node
  K_global = zeros(num_dof, num_dof)
  F_global = zeros(num_dof)
  
  # 2. 单元分析与组装 (Assembly)
  for element in elements:
    # 计算局部单元刚度矩阵 k_e (基于材料属性和单元形状)
    k_e = compute_element_stiffness(element, material_properties)
    # 将局部矩阵组装到全局矩阵中
    assemble_to_global(K_global, k_e, element.node_indices)
    
  # 3. 施加载荷和边界条件
  apply_loads(F_global, loads)
  apply_boundary_conditions(K_global, F_global, boundary_conditions)
  
  # 4. 求解线性代数方程组: K * U = F
  # U 为节点的位移向量
  U = solve_linear_system(K_global, F_global)
  
  # 5. 后处理 (Post-processing)
  # 根据节点位移计算单元内的应变 (Strain) 和应力 (Stress)
  strains, stresses = compute_stress_strain(U, elements, material_properties)
  
  return U, strains, stresses`
      }
    ]
  },
  {
    id: "frontier-interdisciplinary",
    title: "十三、前沿与交叉领域",
    algorithms: [
      {
        name: "联邦学习（Federated Learning）",
        subtitle: "数据不动模型动",
        details: [
          { label: "提出者", value: "Google (Brendan McMahan 等)" },
          { label: "年代", value: "2016年" },
          { label: "原理", value: "在保护数据隐私的前提下，让多个设备在本地训练模型，仅上传模型参数或梯度进行全局聚合" },
          { label: "类比", value: "就像一群医生想联合编写一本医学指南，但不能交换病人的病历。于是每个医生根据自己的病人总结经验（本地训练），最后大家聚在一起只交流经验（参数聚合），而不看病历" },
          { label: "特点", value: "数据不动模型动、隐私保护、分布式计算" },
          { label: "应用场景", value: "手机输入法预测词训练、多家医院联合训练疾病诊断模型、银行间联合反欺诈" }
        ],
        pseudocode: `# FedAvg (Federated Averaging) 算法伪代码
def federated_learning_server(num_rounds, clients):
  # 1. 服务器初始化全局模型参数 W_global
  W_global = initialize_model()
  
  for round in range(num_rounds):
    # 2. 随机选择一部分客户端参与本轮训练
    selected_clients = random_sample(clients, fraction=0.1)
    client_weights = []
    
    for client in selected_clients:
      # 3. 服务器将当前全局模型下发给客户端
      send_model_to_client(client, W_global)
      
      # 4. 客户端在本地私有数据上训练，返回更新后的参数 W_client
      W_client = client.local_training(W_global, epochs=5, lr=0.01)
      client_weights.append((client.num_samples, W_client))
      
    # 5. 服务器聚合客户端参数 (加权平均)
    total_samples = sum(n for n, _ in client_weights)
    W_global = zeros_like(W_global)
    
    for n, W_client in client_weights:
      W_global += (n / total_samples) * W_client
      
  return W_global`
      },
      {
        name: "神经架构搜索（NAS）",
        subtitle: "AI设计AI",
        details: [
          { label: "提出者", value: "Barret Zoph & Quoc V. Le (Google Brain)" },
          { label: "年代", value: "2016年" },
          { label: "原理", value: "利用强化学习、进化算法或梯度下降等方法，自动在搜索空间中寻找最优的神经网络拓扑结构" },
          { label: "类比", value: "就像给AI一个乐高仓库，让它自己去尝试拼出最稳固、最轻便的桥梁，而不需要人类工程师手动去设计每一根梁柱的位置" },
          { label: "特点", value: "自动化设计、搜索空间大、计算成本高（早期）" },
          { label: "应用场景", value: "移动端轻量化模型设计(MobileNetV3)、特定硬件架构的模型定制" }
        ],
        pseudocode: `# 基于强化学习的 NAS 伪代码
def neural_architecture_search(search_space, max_episodes):
  # 1. 初始化 RNN 控制器 (Controller)
  controller = RNN_Controller()
  
  for episode in range(max_episodes):
    # 2. 控制器生成一个神经网络架构 A
    architecture_A = controller.sample_architecture(search_space)
    
    # 3. 构建并训练该架构 A
    model_A = build_model(architecture_A)
    train_model(model_A, training_data, epochs=short_epochs)
    
    # 4. 在验证集上评估，获得准确率 R (作为奖励)
    accuracy_R = evaluate_model(model_A, validation_data)
    
    # 5. 计算策略梯度，更新控制器参数
    # 目标是最大化期望奖励 (即生成高准确率架构的概率)
    loss = -log_probability(architecture_A) * accuracy_R
    controller.update_weights(loss)
    
  # 搜索结束后，让控制器生成最可能的架构，并进行完整训练
  best_architecture = controller.get_most_likely_architecture()
  return best_architecture`
      },
      {
        name: "量子算法（Shor/Grover）",
        subtitle: "量子并行性",
        details: [
          { label: "提出者", value: "Peter Shor / Lov Grover" },
          { label: "年代", value: "1994年 (Shor) / 1996年 (Grover)" },
          { label: "原理", value: "利用量子的叠加和纠缠特性，实现对大数分解（Shor）或无序搜索（Grover）的指数级或平方级加速" },
          { label: "类比", value: "就像在迷宫里找出口，传统算法是一个人慢慢试错，而量子算法是瞬间分身成无数个影子，同时走遍所有路，瞬间找到出口" },
          { label: "特点", value: "量子并行性、超越经典计算极限、对现有加密体系构成威胁" },
          { label: "应用场景", value: "后量子密码学研究、新材料模拟、复杂组合优化问题" }
        ],
        pseudocode: `# Grover 搜索算法核心逻辑 (寻找无序数据库中满足条件的元素)
def grover_search(database_size_N, target_function):
  # 1. 初始化量子态为所有可能状态的均匀叠加态
  num_qubits = log2(database_size_N)
  state = apply_Hadamard_gates_to_all_qubits(initial_state_0)
  
  # 2. 计算最优迭代次数 (约等于 pi/4 * sqrt(N))
  iterations = int((pi / 4) * sqrt(database_size_N))
  
  for i in range(iterations):
    # 3. Oracle (量子黑盒) 操作
    # 翻转目标状态的相位 (如果 x 是目标，将幅度取反)
    state = apply_oracle(state, target_function)
    
    # 4. 扩散算子 (Diffusion Operator / Grover 迭代)
    # 围绕平均值反转幅度 (Inversion about average)
    # 这一步会放大目标状态的概率幅，缩小其他状态的概率幅
    state = apply_diffusion_operator(state)
    
  # 5. 测量量子态
  # 此时目标状态的概率极高，测量大概率得到正确答案
  result = measure(state)
  return result`
      },
      {
        name: "因果推断算法（Do-Calculus）",
        subtitle: "区分相关性与因果性",
        details: [
          { label: "提出者", value: "Judea Pearl" },
          { label: "年代", value: "1995年" },
          { label: "原理", value: "利用因果图模型和干预算子（do-operator）从观测数据中识别因果关系，区分相关性与因果性" },
          { label: "类比", value: "就像判断“公鸡打鸣”和“太阳升起”的关系。虽然它们高度相关，但如果你捂住公鸡的嘴（干预），太阳照样升起，说明公鸡打鸣不是太阳升起的原因" },
          { label: "特点", value: "区分相关与因果、反事实推理、处理混杂因子" },
          { label: "应用场景", value: "医学药效评估、政策效果分析、推荐系统去偏、A/B测试替代" }
        ],
        pseudocode: `# 后门准则 (Back-door Criterion) 伪代码
# 用于计算干预效果 P(Y | do(X))，消除混杂因子的影响
def calculate_causal_effect(data, causal_graph, treatment_X, outcome_Y):
  # 1. 在因果图中寻找满足后门准则的变量集合 Z (混杂因子)
  # Z 阻断了所有从 X 到 Y 的后门路径，且 Z 中不包含 X 的后代
  Z_set = find_backdoor_adjustment_set(causal_graph, treatment_X, outcome_Y)
  
  if Z_set is None:
    return "无法通过观测数据识别因果效应"
    
  # 2. 使用后门调整公式计算 P(Y | do(X=x))
  # P(Y | do(X=x)) = sum_z P(Y | X=x, Z=z) * P(Z=z)
  causal_effect = 0.0
  
  for z_value in get_all_possible_values(data, Z_set):
    # 计算 P(Z=z)
    prob_z = calculate_probability(data, Z_set, z_value)
    
    # 计算 P(Y | X=x, Z=z)
    prob_y_given_x_z = calculate_conditional_probability(data, outcome_Y, treatment_X, Z_set, z_value)
    
    # 累加调整后的概率
    causal_effect += prob_y_given_x_z * prob_z
    
  return causal_effect`
      },
      {
        name: "压缩感知（Compressed Sensing）",
        subtitle: "突破奈奎斯特采样定理",
        details: [
          { label: "提出者", value: "Emmanuel Candès, Justin Romberg, Terence Tao, David Donoho" },
          { label: "年代", value: "2004年 - 2006年" },
          { label: "原理", value: "如果信号是稀疏的，可以利用远少于奈奎斯特定理要求的样本量来精确重建信号" },
          { label: "类比", value: "就像画一幅素描，你不需要画出纸上的每一个像素，只需要勾勒出关键的线条（稀疏特征），大脑就能自动补全整幅画" },
          { label: "特点", value: "突破采样极限、利用信号稀疏性、L1范数优化" },
          { label: "应用场景", value: "单像素相机、快速核磁共振成像(MRI)、深空通信、无线传感器网络" }
        ],
        pseudocode: `# 压缩感知重建 (基于 L1 范数最小化)
def compressed_sensing_reconstruction(y, Phi, Psi):
  # y: 测量向量 (长度为 M，M 远小于信号原始长度 N)
  # Phi: 测量矩阵 (M x N，通常为随机高斯矩阵)
  # Psi: 稀疏变换矩阵 (N x N，如小波变换矩阵，信号在 Psi 域下是稀疏的)
  
  # 传感矩阵 A = Phi * Psi
  A = matmul(Phi, Psi)
  
  # 目标：求解欠定方程 y = A * s，使得 s 的 L1 范数最小
  # s 是信号在稀疏域下的系数向量
  
  # 使用凸优化算法 (如基追踪 Basis Pursuit) 求解
  objective = minimize( L1_norm(s) )
  constraints = [ matmul(A, s) == y ]
  
  optimal_s = solve_convex_optimization(objective, constraints)
  
  # 逆变换恢复原始信号 x
  # x = Psi * s
  reconstructed_x = matmul(Psi, optimal_s)
  
  return reconstructed_x`
      }
    ]
  },
  {
    id: "classic-dsa",
    title: "十四、经典数据结构与基础算法 (补充)",
    algorithms: [
      {
        name: "快速排序 (Quick Sort)",
        subtitle: "分而治之的经典",
        details: [
          { label: "提出者", value: "Tony Hoare" },
          { label: "年代", value: "1959年" },
          { label: "原理", value: "选择一个基准值，将数组分为小于和大于基准的两部分，递归排序" },
          { label: "类比", value: "就像排队买票，先找一个中间人，比他矮的站左边，比他高的站右边，然后左右两边的人再各自找中间人继续排，直到全排好" },
          { label: "特点", value: "分而治之思想、平均复杂度O(n log n)、原地排序" },
          { label: "应用场景", value: "标准库排序函数(如 C++ std::sort, Java Arrays.sort)、数据库索引构建" }
        ],
        pseudocode: `def quick_sort(arr, low, high):
  if low < high:
    # 1. 划分数组，获取基准值的最终位置
    pivot_index = partition(arr, low, high)
    
    # 2. 递归排序基准值左边的子数组
    quick_sort(arr, low, pivot_index - 1)
    
    # 3. 递归排序基准值右边的子数组
    quick_sort(arr, pivot_index + 1, high)

def partition(arr, low, high):
  # 选择最后一个元素作为基准值 (Pivot)
  pivot = arr[high]
  
  # i 指向小于基准值的区域的最后一个元素
  i = low - 1
  
  for j in range(low, high):
    # 如果当前元素小于基准值，将其交换到左侧区域
    if arr[j] < pivot:
      i = i + 1
      swap(arr[i], arr[j])
      
  # 将基准值放到中间位置
  swap(arr[i + 1], arr[high])
  return i + 1`
      },
      {
        name: "二分查找 (Binary Search)",
        subtitle: "对数级搜索",
        details: [
          { label: "提出者", value: "John Mauchly (首次提及) / Derrick Henry Lehmer (首个工作程序)" },
          { label: "年代", value: "1946年 / 1960年" },
          { label: "原理", value: "在有序数组中，每次比较中间元素，将搜索范围缩小一半" },
          { label: "类比", value: "就像在字典里查单词，先翻到中间，看单词在前半本还是后半本，然后继续翻那一半的中间，直到找到为止" },
          { label: "特点", value: "对数级时间复杂度、要求数据有序、实现简单高效" },
          { label: "应用场景", value: "数据库索引查找、Git Bisect 定位引入 Bug 的提交、字典查词" }
        ],
        pseudocode: `def binary_search(arr, target):
  # 数组必须是有序的
  left = 0
  right = len(arr) - 1
  
  while left <= right:
    # 计算中间位置 (防止溢出的写法)
    mid = left + (right - left) // 2
    
    if arr[mid] == target:
      return mid # 找到目标，返回索引
      
    elif arr[mid] < target:
      # 目标在右半部分，缩小左边界
      left = mid + 1
      
    else:
      # 目标在左半部分，缩小右边界
      right = mid - 1
      
  return -1 # 未找到目标`
      },
      {
        name: "动态规划 (Dynamic Programming)",
        subtitle: "空间换时间的艺术",
        details: [
          { label: "提出者", value: "Richard Bellman" },
          { label: "年代", value: "1953年" },
          { label: "原理", value: "将复杂问题分解为重叠子问题，通过保存子问题的解（备忘录）来避免重复计算" },
          { label: "类比", value: "就像计算 1+1+1+1+1，你数完是5。如果我再加个1，你不需要从头数，直接在5的基础上加1得到6，因为你记住了之前的计算结果" },
          { label: "特点", value: "空间换时间、处理重叠子问题、最优子结构" },
          { label: "应用场景", value: "序列比对、资源分配优化、最短路径计算(Floyd-Warshall)" }
        ],
        pseudocode: `# 0-1 背包问题 (0-1 Knapsack Problem) 伪代码
def knapsack_01(weights, values, capacity):
  n = len(weights)
  # dp[i][w] 表示前 i 个物品放入容量为 w 的背包中的最大价值
  dp = zeros(n + 1, capacity + 1)
  
  for i in range(1, n + 1):
    for w in range(1, capacity + 1):
      # 如果当前物品重量大于背包容量，无法放入
      if weights[i-1] > w:
        dp[i][w] = dp[i-1][w]
      else:
        # 否则，在"不放入"和"放入"之间选择价值最大的
        not_take = dp[i-1][w]
        take = values[i-1] + dp[i-1][w - weights[i-1]]
        dp[i][w] = max(not_take, take)
        
  return dp[n][capacity]`
      },
      {
        name: "图遍历 (BFS/DFS)",
        subtitle: "探索网络结构",
        details: [
          { label: "提出者", value: "Edward F. Moore (BFS) / Charles Pierre Trémaux (DFS前身)" },
          { label: "年代", value: "1959年 (BFS) / 19世纪 (DFS)" },
          { label: "原理", value: "BFS逐层扩展搜索，DFS沿路径深入搜索并回溯" },
          { label: "类比", value: "BFS就像往池塘里扔石头激起的涟漪，一层层向外扩散；DFS就像走迷宫，撞到南墙才回头，换条路继续钻" },
          { label: "特点", value: "BFS找最短路径（无权图）、DFS适合深度优先探索、基础图算法" },
          { label: "应用场景", value: "社交网络好友推荐(BFS)、网页爬虫、依赖关系解析(DFS)" }
        ],
        pseudocode: `# 广度优先搜索 (BFS)
def BFS(graph, start_node):
  visited = set()
  queue = Queue()
  
  queue.enqueue(start_node)
  visited.add(start_node)
  
  while not queue.is_empty():
    current_node = queue.dequeue()
    process(current_node)
    
    for neighbor in graph.get_neighbors(current_node):
      if neighbor not in visited:
        visited.add(neighbor)
        queue.enqueue(neighbor)

# 深度优先搜索 (DFS) - 递归实现
def DFS(graph, current_node, visited):
  visited.add(current_node)
  process(current_node)
  
  for neighbor in graph.get_neighbors(current_node):
    if neighbor not in visited:
      DFS(graph, neighbor, visited)`
      }
    ]
  },
  {
    id: "distributed-systems",
    title: "十五、分布式系统与云原生算法 (补充)",
    algorithms: [
      {
        name: "Paxos / Raft",
        subtitle: "分布式共识的基石",
        details: [
          { label: "提出者", value: "Leslie Lamport (Paxos) / Diego Ongaro & John Ousterhout (Raft)" },
          { label: "年代", value: "1989年 (Paxos) / 2014年 (Raft)" },
          { label: "原理", value: "在不可靠的网络中，让多个节点对某个值或日志序列达成一致，实现分布式系统的强一致性" },
          { label: "类比", value: "就像一个小班级选班长，必须有一套规则确保大家最后投出的票是一致的，而且就算有人请假（节点故障），选举也能正常进行" },
          { label: "特点", value: "强一致性、高可用性、容错能力强、Raft更易理解和实现" },
          { label: "应用场景", value: "ZooKeeper (ZAB), etcd (Raft), 分布式数据库的选主与数据同步" }
        ],
        pseudocode: `# Raft 领导者选举 (Leader Election) 简化逻辑
def raft_election_timer_timeout(node):
  # 1. 节点转为候选人 (Candidate)
  node.state = CANDIDATE
  node.current_term += 1
  node.voted_for = node.id
  votes_received = 1 # 投给自己
  
  # 2. 向其他所有节点发送 RequestVote RPC
  for peer in cluster:
    send_RequestVote(peer, term=node.current_term, candidate_id=node.id, ...)
    
  # 3. 统计选票
  while election_is_ongoing:
    if receive_vote_from(peer):
      votes_received += 1
      
    # 如果获得多数票 (Majority)
    if votes_received > len(cluster) / 2:
      node.state = LEADER
      start_sending_heartbeats()
      return
      
    # 如果收到更高任期的消息，退回跟随者
    if receive_higher_term_message():
      node.state = FOLLOWER
      return`
      },
      {
        name: "MapReduce",
        subtitle: "海量数据处理模型",
        details: [
          { label: "提出者", value: "Jeffrey Dean & Sanjay Ghemawat (Google)" },
          { label: "年代", value: "2004年" },
          { label: "原理", value: "将大规模计算任务拆分为多个并行的Map任务，处理完后再通过Reduce任务汇总结果" },
          { label: "类比", value: "就像人口普查，每个普查员负责一个街道（Map），最后把各街道的数据汇总到统计局（Reduce）得出总人口" },
          { label: "特点", value: "海量数据处理、容错性高、屏蔽底层分布式细节" },
          { label: "应用场景", value: "Hadoop、大规模日志分析、搜索引擎倒排索引构建、分布式单词计数" }
        ],
        pseudocode: `# MapReduce 经典案例：单词计数 (Word Count)

# 1. Map 阶段：在各个工作节点上并行执行
# 输入：(文档ID, 文档内容)
def map_function(document_id, text):
  words = text.split()
  for word in words:
    # 输出键值对：(单词, 1)
    emit(word, 1)
    
# 框架自动执行 Shuffle & Sort 阶段：
# 将所有 Map 输出的相同键(word)的值聚集在一起
# 例如：("apple", [1, 1, 1]), ("banana", [1])

# 2. Reduce 阶段：在各个工作节点上并行执行
# 输入：(单词, [1, 1, ...])
def reduce_function(word, counts_list):
  total_count = 0
  for count in counts_list:
    total_count += count
    
  # 输出最终结果：(单词, 总出现次数)
  emit(word, total_count)`
      },
      {
        name: "一致性哈希 (Consistent Hashing)",
        subtitle: "平滑扩容的负载均衡",
        details: [
          { label: "提出者", value: "David Karger 等" },
          { label: "年代", value: "1997年" },
          { label: "原理", value: "将数据和服务器节点映射到一个哈希环上，节点增删时只需迁移极少部分数据，实现平滑扩容" },
          { label: "类比", value: "就像大家围成一个圈坐，每个人负责自己顺时针方向到下一个人之间的区域。如果有人走了，他的区域就归下一个人管，而不需要所有人重新分地" },
          { label: "特点", value: "负载均衡、平滑扩容、减少缓存失效" },
          { label: "应用场景", value: "Redis 集群、Memcached、CDN 节点路由、分布式存储系统" }
        ],
        pseudocode: `class ConsistentHashRing:
  def __init__(self, num_virtual_nodes=100):
    self.ring = SortedMap() # 有序的哈希环
    self.num_virtual_nodes = num_virtual_nodes
    
  def add_server_node(self, server_ip):
    # 为每个物理节点创建多个虚拟节点，使数据分布更均匀
    for i in range(self.num_virtual_nodes):
      virtual_node_name = server_ip + "#" + str(i)
      hash_value = hash_function(virtual_node_name)
      self.ring.put(hash_value, server_ip)
      
  def remove_server_node(self, server_ip):
    for i in range(self.num_virtual_nodes):
      virtual_node_name = server_ip + "#" + str(i)
      hash_value = hash_function(virtual_node_name)
      self.ring.remove(hash_value)
      
  def get_server(self, data_key):
    if self.ring.is_empty():
      return null
      
    hash_value = hash_function(data_key)
    
    # 在环上顺时针查找第一个大于等于数据哈希值的节点
    server_entry = self.ring.first_entry_greater_or_equal(hash_value)
    
    # 如果没找到，说明越过了环的末尾，取环上的第一个节点
    if server_entry is null:
      server_entry = self.ring.first_entry()
      
    return server_entry.value # 返回对应的物理服务器 IP`
      }
    ]
  },
  {
    id: "cryptography-security",
    title: "十六、密码学与网络安全基础 (补充)",
    algorithms: [
      {
        name: "RSA 非对称加密",
        subtitle: "互联网安全的基石",
        details: [
          { label: "提出者", value: "Ron Rivest, Adi Shamir, Leonard Adleman" },
          { label: "年代", value: "1977年" },
          { label: "原理", value: "基于大整数分解的数学难题，利用公钥加密私钥解密，或私钥签名公钥验证" },
          { label: "类比", value: "就像一个带两把钥匙的保险箱：一把是公钥（大家都能拿去锁门），一把是私钥（只有主人能开门）。你把信锁进去，只有主人能看" },
          { label: "特点", value: "非对称加密、安全性高、计算开销大（相比对称加密）" },
          { label: "应用场景", value: "HTTPS/TLS 证书交换、SSH 登录、数字签名、PGP邮件加密" }
        ],
        pseudocode: `# RSA 密钥生成与加解密原理
def rsa_keygen():
  # 1. 随机选择两个大素数 p 和 q
  p = generate_large_prime()
  q = generate_large_prime()
  
  # 2. 计算模数 n 和欧拉函数 phi(n)
  n = p * q
  phi_n = (p - 1) * (q - 1)
  
  # 3. 选择公钥指数 e，使得 1 < e < phi_n 且 gcd(e, phi_n) = 1
  e = 65537 # 常用值
  
  # 4. 计算私钥指数 d，使得 (e * d) mod phi_n = 1 (即 e 的模反元素)
  d = modular_inverse(e, phi_n)
  
  public_key = (e, n)
  private_key = (d, n)
  return public_key, private_key

def rsa_encrypt(message, public_key):
  e, n = public_key
  # 密文 c = (m^e) mod n
  ciphertext = modular_exponentiation(message, e, n)
  return ciphertext

def rsa_decrypt(ciphertext, private_key):
  d, n = private_key
  # 明文 m = (c^d) mod n
  message = modular_exponentiation(ciphertext, d, n)
  return message`
      },
      {
        name: "AES 对称加密",
        subtitle: "高效的数据保护",
        details: [
          { label: "提出者", value: "Joan Daemen, Vincent Rijmen (Rijndael算法)" },
          { label: "年代", value: "1998年 (提出) / 2001年 (成为标准)" },
          { label: "原理", value: "使用相同的密钥进行多轮字节代换、行移位、列混淆等操作加密数据，属于对称加密算法" },
          { label: "类比", value: "就像一个复杂的魔方，你和朋友共用一个口诀（密钥）。你按照口诀把魔方拧乱（加密），朋友拿到后按照同样的口诀反向拧回来（解密）" },
          { label: "特点", value: "对称加密、速度极快、安全性高、硬件支持广泛" },
          { label: "应用场景", value: "磁盘加密(BitLocker)、Wi-Fi (WPA2/3)、大文件加密传输、VPN" }
        ],
        pseudocode: `# AES 加密轮函数 (以 128 位密钥，10 轮为例)
def aes_encrypt_block(plaintext_16bytes, key):
  # 1. 密钥扩展 (Key Expansion)
  round_keys = expand_key(key) # 生成 11 个轮密钥
  
  # 2. 初始轮密钥加 (AddRoundKey)
  state = bitwise_xor(plaintext_16bytes, round_keys[0])
  
  # 3. 前 9 轮循环
  for round in range(1, 10):
    state = sub_bytes(state)       # 字节代换 (非线性替换，基于 S-Box)
    state = shift_rows(state)      # 行移位 (打乱数据)
    state = mix_columns(state)     # 列混淆 (矩阵乘法，提供扩散性)
    state = add_round_key(state, round_keys[round]) # 轮密钥加
    
  # 4. 最后一轮 (没有列混淆)
  state = sub_bytes(state)
  state = shift_rows(state)
  state = add_round_key(state, round_keys[10])
  
  return state # 返回密文`
      },
      {
        name: "SHA 哈希算法",
        subtitle: "数字指纹",
        details: [
          { label: "提出者", value: "美国国家安全局 (NSA)" },
          { label: "年代", value: "1993年(SHA-0) / 2001年(SHA-2) / 2015年(SHA-3)" },
          { label: "原理", value: "将任意长度的数据映射为固定长度的散列值，具有不可逆性、抗碰撞性和雪崩效应" },
          { label: "类比", value: "就像人的指纹。虽然指纹很短，但能唯一代表一个人。只要人变了一点点（数据变了一个字节），指纹就会完全不同" },
          { label: "特点", value: "单向不可逆、固定长度输出、抗碰撞性" },
          { label: "应用场景", value: "密码存储(加盐)、区块链工作量证明(PoW)、文件完整性校验、数字签名" }
        ],
        pseudocode: `# SHA-256 核心处理逻辑 (简化)
def sha256(message):
  # 1. 预处理：附加填充比特和长度信息，使消息长度是 512 位的整数倍
  padded_message = pad_message(message)
  
  # 2. 初始化 8 个 32 位的哈希初值 (H0 到 H7)
  H = INITIAL_HASH_VALUES
  
  # 3. 分块处理 (每块 512 位)
  blocks = split_into_512bit_blocks(padded_message)
  for block in blocks:
    # 扩展为 64 个 32 位的字 (Message Schedule)
    W = expand_block_to_64_words(block)
    
    # 初始化工作变量 a,b,c,d,e,f,g,h
    a, b, c, d, e, f, g, h = H
    
    # 4. 64 轮压缩函数 (Compression Function)
    for i in range(64):
      # 包含位运算：右旋(ROTR)、右移(SHR)、异或(XOR)、逻辑与(AND)等
      T1 = h + Sigma1(e) + Ch(e, f, g) + K[i] + W[i]
      T2 = Sigma0(a) + Maj(a, b, c)
      
      h = g
      g = f
      f = e
      e = d + T1
      d = c
      c = b
      b = a
      a = T1 + T2
      
    # 5. 更新中间哈希值
    H[0] += a
    H[1] += b
    # ... 更新 H[2] 到 H[7]
    
  # 6. 拼接最终的哈希值 (256 位)
  return concatenate(H)`
      }
    ]
  },
  {
    id: "database-algorithms",
    title: "十七、数据库中的算法",
    algorithms: [
      {
        name: "B+树 (B+ Tree)",
        subtitle: "关系型数据库的基石",
        details: [
          { label: "提出者", value: "Rudolf Bayer & Edward M. McCreight" },
          { label: "年代", value: "1970年 (B树) / 1972年 (B+树)" },
          { label: "原理", value: "多路平衡查找树，非叶子节点只存索引，所有数据存在叶子节点且用链表相连，适合磁盘顺序读取" },
          { label: "类比", value: "就像图书馆的索引卡片目录。你先查大类（非叶子节点），再查小类，最后在书架上找到一排排的书（叶子节点），而且书与书之间是挨着的" },
          { label: "特点", value: "扇出高（树矮）、范围查询快、磁盘IO友好" },
          { label: "应用场景", value: "关系型数据库索引 (MySQL InnoDB)、文件系统 (NTFS, XFS)" }
        ],
        pseudocode: `def bplus_tree_search(node, key):
  # 1. 如果当前节点是叶子节点
  if node.is_leaf:
    # 在叶子节点中查找匹配的键
    for i in range(node.num_keys):
      if node.keys[i] == key:
        return node.values[i] # 找到数据记录
    return None # 未找到
    
  # 2. 如果当前节点是内部节点 (非叶子节点)
  else:
    # 找到第一个大于等于 key 的子节点指针
    i = 0
    while i < node.num_keys and key >= node.keys[i]:
      i += 1
      
    # 递归搜索对应的子节点
    return bplus_tree_search(node.children[i], key)`
      },
      {
        name: "LSM树 (Log-Structured Merge-Tree)",
        subtitle: "写密集型数据库的核心",
        details: [
          { label: "提出者", value: "Patrick O'Neil 等" },
          { label: "年代", value: "1996年" },
          { label: "原理", value: "将随机写转化为顺序写，先写入内存(MemTable)，满了后刷入磁盘(SSTable)，后台定期合并(Compaction)" },
          { label: "类比", value: "就像记账。你先随手记在小本子上（内存），记满一页就撕下来贴在大账本里（磁盘）。虽然查的时候要翻好几页，但记账速度极快" },
          { label: "特点", value: "写性能极高、顺序IO、读放大/空间放大问题" },
          { label: "应用场景", value: "NoSQL数据库 (Cassandra, RocksDB, HBase)、时序数据库、写密集型场景" }
        ],
        pseudocode: `def lsm_tree_write(key, value):
  # 1. 先写入预写日志 (WAL)，保证崩溃不丢数据
  append_to_wal(key, value)
  
  # 2. 写入内存表 (MemTable，通常是跳表或红黑树)
  memtable.insert(key, value)
  
  # 3. 如果 MemTable 满了，冻结并创建一个新的 MemTable
  if memtable.size() >= limit:
    immutable_memtable = memtable
    memtable = new MemTable()
    
    # 4. 异步将 Immutable MemTable 刷入磁盘，生成 SSTable (Level 0)
    async_flush_to_disk(immutable_memtable)
    
def lsm_tree_read(key):
  # 1. 先查当前 MemTable
  if key in memtable: return memtable.get(key)
  
  # 2. 再查 Immutable MemTable
  if key in immutable_memtable: return immutable_memtable.get(key)
  
  # 3. 最后按层级 (Level 0 -> Level N) 查找磁盘上的 SSTable
  # (通常结合布隆过滤器加速判断)
  for level in range(max_levels):
    for sstable in get_sstables(level):
      if bloom_filter_check(sstable, key):
        if key in sstable: return sstable.get(key)
        
  return None`
      },
      {
        name: "布隆过滤器 (Bloom Filter)",
        subtitle: "空间换时间的概率型数据结构",
        details: [
          { label: "提出者", value: "Burton Howard Bloom" },
          { label: "年代", value: "1970年" },
          { label: "原理", value: "多个哈希函数映射到一个位数组，能100%判断元素不存在，但判断存在有一定误判率" },
          { label: "类比", value: "就像一个简易的名单过滤器。如果名字没在上面，那肯定没来；如果名字在上面，可能真的来了，也可能是重名了（误判）" },
          { label: "特点", value: "空间利用率极高、查询极快、不支持删除" },
          { label: "应用场景", value: "数据库防缓存穿透、LSM树快速判断SSTable是否包含某Key、网页黑名单过滤" }
        ],
        pseudocode: `class BloomFilter:
  def __init__(self, size, num_hash_functions):
    self.bit_array = [0] * size
    self.k = num_hash_functions
    
  def insert(self, item):
    # 1. 对元素进行 k 次哈希计算
    for i in range(self.k):
      hash_val = hash_function(item, i) % len(self.bit_array)
      # 2. 将位数组对应位置设为 1
      self.bit_array[hash_val] = 1
      
  def check(self, item):
    # 1. 对元素进行 k 次哈希计算
    for i in range(self.k):
      hash_val = hash_function(item, i) % len(self.bit_array)
      # 2. 如果有任何一位是 0，则元素绝对不存在
      if self.bit_array[hash_val] == 0:
        return False
        
    # 3. 如果所有位都是 1，则元素可能存在 (存在误判率)
    return True`
      },
      {
        name: "多版本并发控制 (MVCC)",
        subtitle: "读写不互斥的并发控制",
        details: [
          { label: "提出者", value: "David P. Reed" },
          { label: "年代", value: "1978年" },
          { label: "原理", value: "每次写操作创建数据的新版本，读操作读取特定版本，实现读写不互斥，提高并发性能" },
          { label: "类比", value: "就像在云文档里协作。你改你的版本，我读我的旧版本，互不干扰。只有当你提交后，我刷新才能看到你的新版本" },
          { label: "特点", value: "读写不冲突、无锁读、事务隔离" },
          { label: "应用场景", value: "关系型数据库事务隔离 (MySQL InnoDB, PostgreSQL)、避免脏读和不可重复读" }
        ],
        pseudocode: `def mvcc_read(transaction_id, row_id):
  # 1. 获取该行的所有历史版本 (按版本号/时间戳倒序)
  versions = get_all_versions(row_id)
  
  for version in versions:
    # 2. 可见性判断 (Read View)
    # 如果该版本的创建事务在当前事务开始前已提交，且未被删除
    if is_visible(version, transaction_id):
      return version.data
      
  return None # 无可见版本

def mvcc_write(transaction_id, row_id, new_data):
  # 1. 锁定该行 (写操作仍需互斥)
  lock_row(row_id)
  
  # 2. 复制最新版本，创建新版本
  new_version = create_version(row_id, new_data)
  new_version.created_by = transaction_id
  new_version.deleted_by = None
  
  # 3. 更新旧版本的删除标记 (指向当前事务)
  latest_version = get_latest_version(row_id)
  latest_version.deleted_by = transaction_id
  
  # 4. 插入新版本并释放锁
  insert_version(new_version)
  unlock_row(row_id)`
      },
      {
        name: "ARIES 恢复算法",
        subtitle: "数据库崩溃恢复的黄金标准",
        details: [
          { label: "提出者", value: "C. Mohan 等 (IBM)" },
          { label: "年代", value: "1992年" },
          { label: "原理", value: "基于 Write-Ahead Logging (WAL)，崩溃恢复分三阶段：分析(Analysis)、重做(Redo)、撤销(Undo)" },
          { label: "类比", value: "就像飞机上的黑匣子。飞机出事后，先看黑匣子记录了什么（分析），然后复现当时的飞行轨迹（重做），最后撤销那些没完成的错误操作（撤销）" },
          { label: "特点", value: "保证ACID特性、支持部分回滚、恢复速度快" },
          { label: "应用场景", value: "数据库崩溃恢复 (Crash Recovery)、保证事务的原子性(A)和持久性(D)" }
        ],
        pseudocode: `def aries_recovery(log_file, checkpoint):
  # 1. 分析阶段 (Analysis Phase)
  # 从最近的检查点开始正向扫描日志
  # 确定崩溃时活跃的事务 (Active Transactions) 和脏页 (Dirty Pages)
  active_txns, dirty_pages = analysis_phase(log_file, checkpoint)
  
  # 2. 重做阶段 (Redo Phase)
  # 找到最老的脏页对应的日志序列号 (LSN)
  start_lsn = min(dirty_pages.recovery_lsn)
  
  # 从 start_lsn 正向扫描日志，重做所有更新操作 (包括未提交的事务)
  # 将数据库恢复到崩溃那一瞬间的状态 (Repeating History)
  for log_record in scan_logs_forward(log_file, start_lsn):
    if log_record.is_update():
      apply_update_to_page(log_record)
      
  # 3. 撤销阶段 (Undo Phase)
  # 针对分析阶段确定的所有活跃事务 (即未提交的事务)
  # 反向扫描日志，撤销它们的更新操作
  for log_record in scan_logs_backward(log_file, active_txns):
    if log_record.is_update():
      undo_update_to_page(log_record)
      # 写入补偿日志记录 (CLR)，防止再次崩溃时重复撤销
      write_clr(log_record)`
      }
    ]
  },
  {
    id: "power-of-algorithms",
    title: "十八、算法的力量",
    algorithms: [
      {
        name: "P vs NP 问题",
        subtitle: "计算机科学的终极悬赏",
        details: [
          { label: "提出者", value: "Stephen Cook & Leonid Levin" },
          { label: "年代", value: "1971年" },
          { label: "原理", value: "探讨“容易验证的问题”是否也“容易求解”，是克雷数学研究所的七大千禧年难题之首" },
          { label: "类比", value: "就像“看懂一个精彩的魔术”很容易（验证），但“自己发明并表演这个魔术”却极难（求解）。P=NP 意味着只要你能看懂，你就能发明" },
          { label: "意义", value: "如果 P=NP，现有的所有加密体系将瞬间崩溃，世界将变得完全不同" },
          { label: "应用场景", value: "密码学安全性证明、组合优化极限研究、计算复杂性理论" }
        ],
        pseudocode: `# 这是一个无法用代码实现的逻辑，因为它是一个未解之谜
# 如果你能写出下面这个函数的 O(poly(n)) 实现，你将获得 100 万美元奖励
def solve_np_complete_in_polynomial_time(problem_instance):
  # 目前已知最好的算法都是指数级的
  # return exponential_search(problem_instance)
  pass`
      },
      {
        name: "停机问题 (Halting Problem)",
        subtitle: "算法的极限",
        details: [
          { label: "提出者", value: "Alan Turing" },
          { label: "年代", value: "1936年" },
          { label: "原理", value: "证明不存在一个通用算法，能判断任意程序在任意输入下是否会停止运行" },
          { label: "类比", value: "就像不存在一个“全能裁判”，能预知任何一场比赛是否永远打不完。有些程序注定会陷入死循环，而我们无法用算法提前百分之百确定" },
          { label: "特点", value: "不可计算性、逻辑自洽性证明、图灵机的基石" },
          { label: "应用场景", value: "编译器优化限制、程序形式化验证、逻辑学基础" }
        ],
        pseudocode: `# 证明停机问题不可解的经典反证法逻辑
def H(program, input):
  # 假设存在这样一个全能函数 H，能判断程序是否停机
  if program_halts(program, input):
    return True
  else:
    return False

def evil_program(x):
  if H(x, x):
    while True: # 如果 H 说我会停机，我就进入死循环
      pass
  else:
    return # 如果 H 说我会死循环，我就立刻停机
    
# 悖论：evil_program(evil_program) 会停机吗？
# 无论 H 怎么回答，都会产生矛盾。`
      },
      {
        name: "通用近似定理 (Universal Approximation Theorem)",
        subtitle: "神经网络为何全能",
        details: [
          { label: "提出者", value: "George Cybenko / Kurt Hornik" },
          { label: "年代", value: "1989年 / 1991年" },
          { label: "原理", value: "证明只要神经网络有足够的隐藏层神经元，它可以以任意精度逼近任何连续函数" },
          { label: "类比", value: "就像乐高积木，只要你有足够多的小方块（神经元），你就可以拼出世界上任何形状的物体（函数）" },
          { label: "特点", value: "深度学习的理论基石、非线性映射能力、表达能力极限" },
          { label: "应用场景", value: "深度神经网络架构设计、复杂物理系统模拟、万能函数拟合" }
        ],
        pseudocode: `# 神经网络的前向传播 (逼近任意函数的核心)
def neural_network_forward(x, weights, biases):
  # 1. 第一层线性变换
  z1 = matmul(weights[0], x) + biases[0]
  # 2. 激活函数 (非线性是关键)
  a1 = sigmoid(z1)
  
  # 3. 第二层线性变换
  z2 = matmul(weights[1], a1) + biases[1]
  # 4. 输出层
  output = z2
  
  # 只要中间层 a1 的维度足够大，output 就能逼近任何函数 f(x)
  return output`
      }
    ]
  },
  {
    id: "latest-developments",
    title: "十九、算法的最新发展",
    algorithms: [
      {
        name: "大语言模型 (LLM) 与 Scaling Laws",
        subtitle: "规模即智能",
        details: [
          { label: "提出者", value: "OpenAI (Jared Kaplan 等)" },
          { label: "年代", value: "2020年" },
          { label: "原理", value: "发现模型性能与参数量、数据量、计算量之间存在幂律关系，推动了千亿参数模型的爆发" },
          { label: "类比", value: "就像大脑的进化，当神经元数量（参数）和阅读的书籍（数据）达到一定量级后，智能会产生质的飞跃（涌现）" },
          { label: "特点", value: "涌现能力 (Emergent Abilities)、上下文学习、多任务通用性" },
          { label: "应用场景", value: "ChatGPT, Claude, 智能助手、代码自动生成、多模态理解" }
        ],
        pseudocode: `# Transformer 核心：自注意力机制 (Self-Attention)
def self_attention(Q, K, V):
  # 1. 计算注意力分数 (相关性矩阵)
  # 每一个词都在看其他词，确定关注点
  scores = matmul(Q, K.transpose()) / sqrt(d_k)
  
  # 2. 归一化 (Softmax)
  weights = softmax(scores)
  
  # 3. 加权汇总 (得到新的语义表示)
  output = matmul(weights, V)
  
  return output`
      },
      {
        name: "扩散模型 (Diffusion Models)",
        subtitle: "创意生成的数学引擎",
        details: [
          { label: "提出者", value: "Jascha Sohl-Dickstein / Jonathan Ho" },
          { label: "年代", value: "2015年 (提出) / 2020年 (爆发)" },
          { label: "原理", value: "模拟将图像逐渐变成噪声的过程（正向），然后训练模型从纯噪声中一步步还原出图像（反向）" },
          { label: "类比", value: "就像把一滴墨水滴入清水里散开（加噪），然后要求模型学会“时光倒流”，把散开的墨水重新聚集成原来的图案" },
          { label: "特点", value: "生成质量极高、训练稳定、可控性强" },
          { label: "应用场景", value: "AI 绘画 (Midjourney, Stable Diffusion)、视频生成 (Sora)、新药分子设计" }
        ],
        pseudocode: `# 扩散模型反向去噪过程 (生成图像)
def diffusion_sampling(noise_image, model, steps):
  current_image = noise_image
  
  for t in reversed(range(steps)):
    # 1. 预测当前图像中的噪声成分
    predicted_noise = model.predict(current_image, t)
    
    # 2. 减去预测的噪声，还原出更清晰的一步
    # 就像在迷雾中一点点擦亮玻璃
    current_image = remove_noise(current_image, predicted_noise, t)
    
  return current_image # 最终得到清晰的生成图像`
      },
      {
        name: "科学人工智能 (AI for Science)",
        subtitle: "算法成为新的显微镜",
        details: [
          { label: "提出者", value: "跨学科研究团队 (DeepMind, Microsoft Research 等)" },
          { label: "年代", value: "2020s" },
          { label: "原理", value: "将深度学习与物理定律、化学方程结合，加速科学发现过程" },
          { label: "类比", value: "以前科学家是靠实验室里一次次做实验（试错），现在是让 AI 在虚拟实验室里进行亿万次模拟，直接告诉科学家最有希望的方案" },
          { label: "特点", value: "物理信息神经网络 (PINNs)、跨尺度建模、超越人类直觉" },
          { label: "应用场景", value: "新材料预测 (GNoME)、天气预报 (GraphCast)、核聚变控制、蛋白质设计" }
        ],
        pseudocode: `# 物理信息神经网络 (PINN) 损失函数
def pinn_loss(model, data_points, physics_equation):
  # 1. 数据驱动损失 (拟合已知实验数据)
  mse_data = calculate_mse(model.predict(data_points), true_values)
  
  # 2. 物理约束损失 (必须满足物理方程，如能量守恒)
  # 利用自动微分计算导数
  physics_residual = physics_equation(model, data_points)
  mse_physics = calculate_mse(physics_residual, 0)
  
  # 总损失 = 数据准确 + 物理正确
  return mse_data + lambda * mse_physics`
      }
    ]
  },
  {
    id: "networking-protocols",
    title: "二十、计算机网络与协议算法",
    algorithms: [
      {
        name: "滑动窗口 (Sliding Window)",
        subtitle: "流量控制的艺术",
        details: [
          { label: "提出者", value: "Vinton Cerf & Robert Kahn (TCP设计者)" },
          { label: "年代", value: "1974年" },
          { label: "原理", value: "发送方维持一个连续的允许发送的数据帧序列，无需等待每个包的确认即可连续发送，直到窗口填满" },
          { label: "类比", value: "就像一个传送带，你可以连续放上好几个箱子（数据包），只要传送带没满，你就不需要等第一个箱子到达目的地再放第二个" },
          { label: "特点", value: "流量控制、提高信道利用率、支持全双工通信" },
          { label: "应用场景", value: "TCP 协议流量控制、数据链路层 ARQ 协议" }
        ],
        pseudocode: `# 简化的滑动窗口发送逻辑
def sliding_window_sender(data_stream, window_size):
  base = 0
  next_seq_num = 0
  
  while base < len(data_stream):
    # 1. 发送窗口内的所有可用数据
    while next_seq_num < base + window_size and next_seq_num < len(data_stream):
      send_packet(data_stream[next_seq_num])
      start_timer(next_seq_num)
      next_seq_num += 1
      
    # 2. 等待确认 (ACK) 或超时
    event = wait_for_event()
    
    if event.type == ACK_RECEIVED:
      # 收到确认，窗口向前滑动
      # 累积确认：收到 ACK(n) 表示 n 之前的所有包都已收到
      if event.ack_num >= base:
        base = event.ack_num + 1
        
    elif event.type == TIMEOUT:
      # 超时重传：从 base 开始重新发送窗口内的所有包
      next_seq_num = base`
      },
      {
        name: "TCP 拥塞控制 (Reno/BBR)",
        subtitle: "互联网交通警察",
        details: [
          { label: "提出者", value: "Van Jacobson (Reno) / Google (BBR)" },
          { label: "年代", value: "1988年 (Reno) / 2016年 (BBR)" },
          { label: "原理", value: "动态调整发送速率以匹配网络带宽。Reno 基于丢包反馈，BBR 基于带宽和延迟乘积" },
          { label: "类比", value: "就像在高速公路上开车：Reno 是看到前面撞车了（丢包）才猛踩刹车；BBR 是根据路面的宽窄和车流速度（带宽时延）来平稳调节油门" },
          { label: "特点", value: "公平性、稳定性、最大化带宽利用、减少排队延迟" },
          { label: "应用场景", value: "互联网数据传输、视频流媒体、大规模文件分发" }
        ],
        pseudocode: `# TCP Reno 拥塞控制状态机
def tcp_reno_congestion_control():
  cwnd = 1 # 拥塞窗口初始大小
  ssthresh = 64 # 慢启动阈值
  state = SLOW_START
  
  while True:
    if state == SLOW_START:
      # 慢启动：每收到一个 ACK，窗口翻倍 (指数增长)
      cwnd *= 2
      if cwnd >= ssthresh:
        state = CONGESTION_AVOIDANCE
        
    elif state == CONGESTION_AVOIDANCE:
      # 拥塞避免：每个轮次窗口增加 1 (线性增长)
      cwnd += 1
      
    # 遇到丢包事件 (探测到拥塞)
    if detect_packet_loss():
      # 乘性减：阈值设为当前窗口一半，窗口重置
      ssthresh = cwnd / 2
      cwnd = 1
      state = SLOW_START`
      },
      {
        name: "Dijkstra / Bellman-Ford",
        subtitle: "寻找网络最短路径",
        details: [
          { label: "提出者", value: "Edsger Dijkstra / Bellman & Ford" },
          { label: "年代", value: "1956年 / 1958年" },
          { label: "原理", value: "计算网络拓扑中节点间的最短路径，用于构建路由表" },
          { label: "类比", value: "就像 GPS 导航，它会检查所有可能的路口和路段，为你计算出一条耗时最短或路费最省的路线" },
          { label: "特点", value: "全局最优（Dijkstra）、支持负权边（Bellman-Ford）、分布式计算" },
          { label: "应用场景", value: "OSPF 协议 (Dijkstra)、RIP 协议 (Bellman-Ford)、BGP 路径选择" }
        ],
        pseudocode: `# Dijkstra 算法 (链路状态路由核心)
def dijkstra(graph, start_node):
  distances = {node: infinity for node in graph}
  distances[start_node] = 0
  priority_queue = [(0, start_node)]
  
  while priority_queue:
    current_dist, u = pop_min(priority_queue)
    
    if current_dist > distances[u]:
      continue
      
    for v, weight in graph.neighbors(u):
      distance = current_dist + weight
      # 找到更短的路径
      if distance < distances[v]:
        distances[v] = distance
        push(priority_queue, (distance, v))
        
  return distances`
      },
      {
        name: "令牌桶算法 (Token Bucket)",
        subtitle: "流量整形与限流",
        details: [
          { label: "提出者", value: "网络工程社区" },
          { label: "年代", value: "1980s" },
          { label: "原理", value: "以固定速率向桶中放入令牌，发送数据包必须消耗令牌，允许一定程度的突发流量" },
          { label: "类比", value: "就像电影院检票：票（令牌）按固定速度打印并放进盒子里。如果盒子里有存票，一群人可以瞬间进去（突发）；如果没票了，大家只能按打印速度排队进" },
          { label: "特点", value: "允许突发流量、平滑输出速率、简单高效" },
          { label: "应用场景", value: "QoS 流量整形、API 接口限流、云服务带宽控制" }
        ],
        pseudocode: `class TokenBucket:
  def __init__(self, rate, capacity):
    self.rate = rate # 每秒产生的令牌数
    self.capacity = capacity # 桶的最大容量
    self.tokens = capacity
    self.last_refill_time = now()
    
  def consume(self, tokens_needed):
    # 1. 根据时间流逝补充令牌
    current_time = now()
    delta_time = current_time - self.last_refill_time
    new_tokens = delta_time * self.rate
    
    self.tokens = min(self.capacity, self.tokens + new_tokens)
    self.last_refill_time = current_time
    
    # 2. 尝试消耗令牌
    if self.tokens >= tokens_needed:
      self.tokens -= tokens_needed
      return True # 允许通过
    else:
      return False # 被限流`
      },
      {
        name: "Kademlia (DHT)",
        subtitle: "去中心化网络的指南针",
        details: [
          { label: "提出者", value: "Petar Maymounkov & David Mazières" },
          { label: "年代", value: "2002年" },
          { label: "原理", value: "基于 XOR 距离度量的分布式哈希表，通过递归查询在 log(n) 步内定位资源" },
          { label: "类比", value: "就像一个没有总部的去中心化通讯录：每个人只认识几个邻居，但如果你想找某人，邻居会告诉你谁离那个人更近，直到你找到为止" },
          { label: "特点", value: "完全去中心化、高容错性、节点动态加入/退出" },
          { label: "应用场景", value: "BitTorrent (DHT)、以太坊 (Node Discovery)、IPFS、电驴 (eMule)" }
        ],
        pseudocode: `# Kademlia 节点查找逻辑
def find_node(target_id, k_closest_nodes):
  # 1. 计算 XOR 距离: distance = node_id ^ target_id
  # 2. 从已知的 k 个最近节点中发起并行查询
  while not converged:
    for node in k_closest_nodes:
      # 向节点询问：“你认识的离 target_id 最近的 k 个节点是谁？”
      new_nodes = node.rpc_find_node(target_id)
      
      # 3. 更新最近节点列表
      k_closest_nodes = update_closest(k_closest_nodes, new_nodes, target_id)
      
    if no_closer_nodes_found():
      break
      
  return k_closest_nodes`
      }
    ]
  }
];
