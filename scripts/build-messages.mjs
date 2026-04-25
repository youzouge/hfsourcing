/**
 * Generates src/messages/en.json and zh-CN.json from a single source of truth.
 * Run: node scripts/build-messages.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../src/messages')

const en = {
  Meta: {
    title: 'HF Sourcing | Independent China Factory Audit & Inspection',
    description:
      'Independent factory audits, AQL inspections, and crisis negotiation in China. Flat rates, zero factory kickbacks, and a free first-line sanity check for serious buyers.',
  },
  Nav: {
    brand: 'HF Sourcing',
    tagline: 'On-site in Greater Bay, China',
    roadmap: 'Roadmap',
    trust: 'Trust',
    services: 'Services',
    reviews: 'Reviews',
    sampleReport: 'Sample report',
    bookFrom299: 'Book from $299',
  },
  Language: {
    label: 'Language',
  },
  Home: {
    announcement:
      'Buyer-side only · Flat-rate inspection · 24h reporting · No factory kickbacks',
    localTeamLine: 'I am your local team, not their partner.',
    g2: {
      jumpTo: 'Jump to',
      starsRated: 'Rated 5 out of 5',
    },
    hero: {
      badge: 'Sourcing · Samples · AQL QC · FBA / DDP',
      title: 'Find, verify, and ship from China without guessing who paid your inspector.',
      subtitle:
        'From sourcing & verification to sample hub, AQL on the line, and FBA / DDP out — one local team, flat or quoted prices, 24-hour reporting, and zero factory-side income to me. Compare the stack, not a generic inspection PDF.',
      searchPrefix: 'I need',
      searchExample:
        'a factory audit in Shenzhen before I wire 30% deposit — can you be there this week?',
      searchNote: 'That is a real first message. Free triage → paid onsite when you are ready.',
      ctaSample: 'Get sample report',
      ctaBook: 'Book QC from $299',
      imageAlt: 'Factory floor — on-site evidence for your report',
      heroPanelBuyer: 'Buyer satisfaction',
      rating: '4.9 / 5',
      ratingSub: 'From direct buyer feedback (sample)',
      onTheFloor: 'On the floor',
      onTheFloorSub: 'Real photos, AQL logic, fail/pass you can show your bank.',
    },
    services: {
      title: 'The full China stack — compare like a G2 grid',
      lead:
        'No hidden "factory marketing fees" — what you see is what funds the work. Start with a free line in, then add paid modules as your PO and risk grow.',
      pricingNote: 'Updated pricing · USD · + freight or custom where noted',
      entry: {
        heading: 'The entry — free + verification',
        lead: 'Most buyers start with a 10-minute sanity check, then go onsite before real money moves.',
      },
      roadmap: {
        heading: 'The roadmap',
        lead:
          'Sourcing → samples → QC on the line → logistics & FBA. Four modules, one relationship — your team on the ground, not the factory’s.',
      },
      stages: {
        heading: 'Then: samples, QC & e-com / FBA',
        lead:
          'When you are past the first supplier list, the real work is consolidation, in-line control, and getting shelf-ready without a second project manager. Again:',
      },
    },
    freeCard: {
      badge: 'Start here — free',
      satisfaction: 'Satisfaction — we earn the next step',
      includedHeading: "What's included",
      whyFreeHeading: "Why it's free",
    },
    paidModuleUi: {
      recommendedBadge: 'Recommended first paid step',
      coreGateBadge: 'Core gate — QC',
      whenToUse: 'When to use it',
      featuredSub: 'Where most importers start paying for peace of mind',
      getQuote: 'Get a custom quote',
    },
    g2Pills: [
      { label: 'Free plan', href: '#entry' },
      { label: 'Verification $249', href: '#entry' },
      { label: 'Samples $99+', href: '#stages-234' },
      { label: 'QC $299', href: '#stages-234' },
      { label: 'FBA & logistics', href: '#stages-234' },
    ],
    processSteps: [
      {
        step: '01',
        label: 'Sourcing & verification',
        detail: 'Backstop bad actors · negotiate with leverage',
      },
      {
        step: '02',
        label: 'Sample consolidation',
        detail: 'One hub · unbox · compare before you order big',
      },
      {
        step: '03',
        label: 'QC & line control',
        detail: 'AQL · timelines · on-floor disputes',
      },
      { step: '04', label: 'E-com & FBA', detail: 'Prep · DDP · private label' },
    ],
    heroStats: [
      { value: '10+ yrs', sub: 'Supply-chain systems' },
      { value: '24h', sub: 'Report SLA (standard runs)' },
      { value: '0%', sub: 'Factory-side fees to me' },
      { value: '100%', sub: 'Client-paid = client-first' },
    ],
    freeInsider: {
      title: 'The "China Insider" Friend (100% Free)',
      slogan: 'Your First Real Connection on the Ground.',
      priceLine: 'Free',
      whyFree:
        "I've spent 10 years in the system, and I'm tired of seeing honest Western buyers getting scammed or frustrated. I want to build a relationship first. If I can save you from a bad deal with a 10-minute chat, I've done my job as a friend. If you need me for an on-site audit later, you know where to find me.",
      included: [
        {
          title: 'Quick Factory Check',
          body: 'Send me a link or a name; I will tell you if they look like a real factory or a "bedroom" trader in 5 minutes.',
        },
        {
          title: 'Cultural & Business Translator',
          body: 'Confused by a factory\'s "vague" reply? I translate the real meaning behind their Chinese business talk.',
        },
        {
          title: 'General Sourcing Advice',
          body: 'Tips on shipping, local holidays, or market trends. No strings attached.',
        },
      ],
    },
    askMaxCta: 'Ask Max — form / WhatsApp / email',
    paidModules: [
      {
        id: 'sourcing-verification',
        title: 'Strategic Sourcing & Verification',
        integrator: 'Supplier due diligence + price negotiation on the ground.',
        focus: 'Find the right supplier, get the right price — before you send real money.',
        price: '$249',
        unit: '/ audit',
        whenToBook: 'Before you lock terms or pay a large deposit to a new vendor.',
        isEntry: true,
        isFeatured: false,
        bullets: [
          {
            title: 'Real-world Verification',
            body: "I don't trust Alibaba photos. I go onsite to verify their actual production capacity and legal DNA.",
          },
          {
            title: 'Price Negotiation',
            body: 'Using local knowledge and native language to cut through middleman markups and secure the best MOQs for you.',
          },
          {
            title: 'Factory vs. Trader',
            body: 'I expose "bedroom" trading companies posing as mega-factories.',
          },
        ],
      },
      {
        id: 'sample-consolidation',
        title: 'Smart Sample Consolidation',
        integrator: 'Inbound sample hub + unboxing + shortlist.',
        focus: 'Save on freight, kill bad samples early.',
        price: '$99',
        unit: '+ freight · (or per item — ask for a batch quote)',
        whenToBook:
          'When you are comparing 2+ suppliers and shipping samples from China is bleeding your margin.',
        isEntry: false,
        isFeatured: false,
        bullets: [
          {
            title: '70% Logistics Saving',
            body: 'Send 5 factory samples to my hub. I combine them into ONE parcel to slash your international freight costs.',
          },
          {
            title: 'Unboxing Reviews',
            body: "High-res video reviews of every sample before they leave China. If it's trash, we kill it early.",
          },
          {
            title: 'Quality Comparison',
            body: 'Side-by-side analysis to help you pick the winning supplier faster.',
          },
        ],
      },
      {
        id: 'professional-qc',
        title: 'Professional Quality Control (QC)',
        integrator: 'Pre-shipment inspection + line monitoring + on-site dispute handling.',
        focus: 'Reject bad goods, reject silent delays — before the 70% balance.',
        price: '$299',
        unit: '/ man-day · Greater Bay Area',
        whenToBook:
          'Before final payment and before goods leave your supplier — every serious PO should pass this gate.',
        isEntry: false,
        isFeatured: true,
        bullets: [
          {
            title: 'On-site AQL Inspection',
            body: 'Full check on functionality, packaging, and quantities before you pay the final 70%.',
          },
          {
            title: 'Timeline Monitoring',
            body: 'I\'m the "headache" the factory fears. I monitor production lines so they don\'t miss your shipping date.',
          },
          {
            title: 'Dispute Resolution',
            body: "If issues are found, I handle the rework negotiation on the factory floor, so you don't have to argue across the ocean.",
          },
        ],
      },
      {
        id: 'ecom-fba',
        title: 'E-com Logistics & FBA Prep',
        integrator: 'FBA prep + consolidated export + private label touches.',
        focus: 'Shelf-ready, compliant, and branded — without a second project manager.',
        price: 'Custom',
        unit: 'quote (volume-based)',
        whenToBook:
          'When the PO is done and you need China-side prep + door delivery — tell me volume and channels.',
        isEntry: false,
        isFeatured: false,
        bullets: [
          {
            title: 'FBA Compliance',
            body: 'Labeling, bagging, and palletizing that meets strict Amazon / Walmart requirements.',
          },
          {
            title: 'Global DDP Shipping',
            body: 'Sea, air, or rail. We handle customs and taxes so your goods arrive shelf-ready.',
          },
          {
            title: 'Private Labeling',
            body: 'Custom inserts, thank-you cards, and branded packaging to build your moat.',
          },
        ],
      },
    ],
    trustPillars: [
      {
        iconKey: 'shield',
        title: 'You pay. I work for you.',
        body: 'No factory commissions. No referral kickbacks. The invoice is between you and HF Sourcing.',
      },
      {
        iconKey: 'ban',
        title: 'Zero conflict of interest',
        body: 'If the supplier offers me a cut, you will know — and I walk away from that relationship.',
      },
      {
        iconKey: 'fileDown',
        title: 'Evidence you can use',
        body: 'Photos, line status, and AQL logic you can forward to your CEO, bank, or lawyer.',
      },
      {
        iconKey: 'clock',
        title: 'Fast, flat terms',
        body: 'Published prices. 24-hour reporting on standard inspections so you can decide before the wire.',
      },
    ],
    comparisonItems: [
      {
        iconKey: 'xCircle',
        label: 'Big inspection brands',
        text: "Tick-box reports from people who don't understand your product or margin.",
        tone: 'negative',
      },
      {
        iconKey: 'triangleAlert',
        label: '"Free" sourcing agents',
        text: 'Paid under the table by factories. They will not surface defects that hurt their commission.',
        tone: 'negative',
      },
      {
        iconKey: 'checkCircle2',
        label: 'HF Sourcing — Max Huang',
        text: '10 years in supply-chain systems. Paid only by you. I report what risks your money — not what makes the supplier happy.',
        tone: 'positive',
      },
    ],
    integrity: {
      badge: 'Trust & integrity',
      title: 'Why the incentive line matters',
      lead:
        'B2B marketplaces are built on transparent reviews. Your QC is no different: who funds the person in the WeChat group?',
    },
    compareStrip: {
      title: 'Same service — who gets paid twice?',
      lead: 'G2 differentiates by crowd truth. I differentiate by economics: one payer, one loyalty.',
    },
    people: {
      title: 'People, not a logo, buy trust.',
      body:
        'Replace the stock image with a clear photo of you. On G2, people filter by product — here they choose who will walk into a factory and tell them the hard truth.',
      imageAlt: 'Your own photo: coffee, city street, Dongguan or Shenzhen',
    },
    proof: {
      title: 'Reviews from buyers',
      lead: 'Structured like a marketplace review — with outcomes you can measure.',
      verified: 'Verified',
      channel: 'WhatsApp / email',
    },
    proofCards: [
      {
        name: 'David R.',
        country: 'United States',
        message:
          'Max found a welding defect our supplier never mentioned. The report gave us enough evidence to stop the balance payment.',
        result: '$18,400 shipment protected',
      },
      {
        name: 'Sophie M.',
        country: 'Germany',
        message:
          'The factory kept saying everything was ready. Max went onsite, counted cartons, and showed the order was only 62% finished.',
        result: 'Production delay exposed',
      },
      {
        name: 'Marcus T.',
        country: 'Australia',
        message:
          'Not a checklist inspector. He explained why the defects happened and how to push the supplier into rework.',
        result: 'Rework completed before loading',
      },
    ],
    reviewMeta: [
      { initials: 'DR', when: 'Mar 2024' },
      { initials: 'SM', when: 'Jan 2025' },
      { initials: 'MT', when: 'Nov 2024' },
    ],
    reportCta: {
      title: 'See a full report before you book',
      lead: 'Photo evidence, AQL, defect list — the same document you can forward internally.',
      button: 'Download sample report (PDF)',
    },
  },
  Footer: {
    about:
      'Verification, sample hub, line QC, and FBA / export prep in South China. No factory funding — compare with confidence.',
    servicesTitle: 'Services',
    trustTitle: 'Trust',
    contactTitle: 'Contact',
    region: 'Greater Bay Area, China',
    copyright:
      'Inspired by market-style B2B clarity (e.g. G2). Not affiliated with G2, Inc.',
    links: {
      freePlan: 'Free plan',
      verification249: 'Sourcing & verification $249',
      samples: 'Samples from $99 + freight',
      qc: 'QC from $299 / day',
      fba: 'FBA & logistics (quote)',
      integrity: 'Integrity & incentives',
      reviews: 'Reviews',
      sampleReport: 'Sample report',
    },
  },
  AskMax: {
    successTitle: 'Thank you. I have your context.',
    successDescription:
      'By the way, I just finished a similar case study last week. Here is the sample report. You might find it useful for your future quality control.',
    downloadReport: 'Download sample report (PDF)',
    preferHuman: 'Prefer a human channel?',
    email: 'Email',
    whatsapp: 'WhatsApp',
    beforeCallTitle: 'Before we jump on a call',
    beforeCallDescription:
      'Two short answers help me see whether you are a serious buyer, and how I can help in the first reply.',
    labelSourcing: 'What are you sourcing?',
    labelHeadache: 'What is your biggest headache right now?',
    placeholderSourcing:
      'e.g. stainless steel cutlery, MOQ 2,000 sets — or paste a factory link or name',
    placeholderHeadache: 'Factory ghosting, wrong samples, AQL fail last shipment…',
    sending: 'Sending',
    submit: 'Send to Max',
    reachWithoutForm: 'You can also reach out without the form:',
  },
}

const zhCN = {
  ...en,
  Meta: {
    title: 'HF Sourcing | 中国独立验厂与出货检验',
    description:
      '独立工厂验厂、AQL 出货前检验与现场争议协调。统一定价、零工厂回扣，为认真买家提供免费的首次沟通排查。',
  },
  Nav: {
    brand: 'HF Sourcing',
    tagline: '常驻粤港澳大湾区现场',
    roadmap: '路线图',
    trust: '信任',
    services: '服务',
    reviews: '评价',
    sampleReport: '样例报告',
    bookFrom299: '从 299 美元起预约',
  },
  Language: { label: '语言' },
  Home: {
    ...en.Home,
    announcement: '只为买家服务 · 统一定价验货 · 24 小时报告 · 不拿工厂佣金',
    localTeamLine: '我是你本地的团队，不是他们的合伙人。',
    g2: { jumpTo: '跳转', starsRated: '评分 5 星（满分 5 星）' },
    hero: {
      badge: '寻源 · 样品 · AQL 品控 · FBA / 双清',
      title: '在中国找货、验厂、发运，别再盲猜“验货员是谁养活的”。',
      subtitle:
        '从供应商背调到样品集货、产线 AQL 检验，到 FBA / 双清出口——一个本地团队、公开或按量报价、24 小时出报告、不向工厂拿一分钱。用完整能力栈来比较，不要只看一张模板检验 PDF。',
      searchPrefix: '我想',
      searchExample: '在付 30% 定金前先在深圳做工厂稽核，你这周能到现场吗？',
      searchNote: '这是真实的第一条消息。免费初筛，准备好再上付费现场服务。',
      ctaSample: '获取样例报告',
      ctaBook: '预约验货 299 美元起',
      imageAlt: '工厂现场——报告里的第一手感证据',
      heroPanelBuyer: '买家满意度',
      rating: '4.9 / 5',
      ratingSub: '来自买家直接反馈（示例）',
      onTheFloor: '在现场',
      onTheFloorSub: '真照片、AQL 逻辑、可交给银行/法务看的结论表述。',
    },
    services: {
      title: '覆盖中国的完整能力栈——像 G2 一样横向对比',
      lead:
        '没有看不见的“工厂营销费”——你付的钱就是工作本身。从一条免费线开始，随着订单与风险上升再叠加模块。',
      pricingNote: '价格更新 · 美元 · 未特别说明时另计运费或按量定制',
      entry: {
        heading: '入口：免费＋背调/验厂',
        lead: '多数买家从 10 分钟 sanity check 开始，真金白银出手前再付费到现场。',
      },
      roadmap: {
        heading: '路线图',
        lead:
          '寻源 → 样品 → 产线品控 → 物流与 FBA。四个模块、一段长期关系——你的在地团队，而不是工厂的伙伴。',
      },
      stages: {
        heading: '之后：样品、品控与电商 / FBA',
        lead: '进入供应商短名单后，工作重点是集货、产线控货与少一个项目经理也能上架。再说一次：',
      },
    },
    freeCard: {
      badge: '从这里开始——免费',
      satisfaction: '满意度——我们用下一步服务证明自己',
      includedHeading: '包含内容',
      whyFreeHeading: '为什么免费',
    },
    paidModuleUi: {
      recommendedBadge: '建议首购付费项',
      coreGateBadge: '核心节点——品控',
      whenToUse: '何时使用',
      featuredSub: '多数进口商从这里开始为确定性付费',
      getQuote: '获取定制报价',
    },
    g2Pills: [
      { label: '免费方案', href: '#entry' },
      { label: '验厂 249 美元', href: '#entry' },
      { label: '样品 99 美元+', href: '#stages-234' },
      { label: '品控 299 美元', href: '#stages-234' },
      { label: 'FBA 与物流', href: '#stages-234' },
    ],
    processSteps: [
      { step: '01', label: '寻源与验厂/背调', detail: '筛掉不老实 · 有筹码议价' },
      { step: '02', label: '样品集货', detail: '一个枢纽 · 拆箱 · 大货前对比' },
      { step: '03', label: '品控与产线', detail: 'AQL · 交期 · 现场争议' },
      { step: '04', label: '电商与 FBA', detail: '贴标 · 双清 · 轻定制' },
    ],
    heroStats: [
      { value: '10+ 年', sub: '供应链系统经验' },
      { value: '24h', sub: '标准验货出报告' },
      { value: '0%', sub: '来自工厂侧费用' },
      { value: '100%', sub: '客户付费=客户第一' },
    ],
    freeInsider: {
      title: '「中国圈内人」朋友（完全免费）',
      slogan: '你在中国的第一个真实连接。',
      priceLine: '免费',
      whyFree:
        '我在这个体系里做了十年，厌倦看到认真的海外买家被坑、被磨。想先把关系建起来。如果十分钟聊天能帮你避开一笔烂单，我作为朋友就值了。以后你要深度现场稽核，你知道去哪找我。',
      included: [
        {
          title: '快速工厂粗筛',
          body: '发链接或厂名，约 5 分钟告诉你更像真工厂还是“卧室倒爷”。',
        },
        {
          title: '文化/商务转译',
          body: '供应商回得含糊？我帮你听出中式商务话背后的真实意思。',
        },
        {
          title: '一般采购建议',
          body: '物流、假期、市场风向等小贴士，不捆绑销售。',
        },
      ],
    },
    askMaxCta: '联系 Max — 表单 / WhatsApp / 邮件',
    paidModules: [
      {
        id: 'sourcing-verification',
        title: '战略寻源与验厂/背调',
        integrator: '供应商尽调＋在地面议价的组合。',
        focus: '在对的人身上谈对的价格——在汇出真钱之前。',
        price: '249 美元',
        unit: '/ 次现场',
        whenToBook: '在锁定条款或给新供应商大额定金之前。',
        isEntry: true,
        isFeatured: false,
        bullets: [
          {
            title: '真实现场核验',
            body: '我不信平台照片。我上门核实真实产能与主体资质。',
          },
          { title: '价格谈判', body: '用本地经验与语言穿透中间商加价、争取更合理 MOQ。' },
          { title: '工厂 vs 倒爷', body: '拆穿把贸易公司装成大厂的套路。' },
        ],
      },
      {
        id: 'sample-consolidation',
        title: '智能样品集货',
        integrator: '到仓样品枢纽＋拆箱＋初筛短名单。',
        focus: '省运费、早点毙掉差样品。',
        price: '99 美元起',
        unit: '+ 运费（或按件批量询价）',
        whenToBook: '在对比 2+ 家供应商、样品运费在吃掉利润时。',
        isEntry: false,
        isFeatured: false,
        bullets: [
          {
            title: '约 70% 物流节省',
            body: '多家样品先到我处合并成一票国际件，拉低你那边运费。',
          },
          { title: '拆箱视频', body: '离境前高清点评每件样品。太差当场否决。' },
          { title: '质量横评', body: '并排对比，帮你更快锁定赢家。' },
        ],
      },
      {
        id: 'professional-qc',
        title: '专业出货检验（QC）',
        integrator: '装船前验货＋产线跟踪＋现场争议处理。',
        focus: '在付 70% 尾款前，挡住烂货和沉默型拖延。',
        price: '299 美元',
        unit: '/ 人天 · 大湾区',
        whenToBook: '在付尾款与货离厂之前——重要订单都应过这道门。',
        isEntry: false,
        isFeatured: true,
        bullets: [
          { title: '现场 AQL 检验', body: '付尾款前对功能、包装、数量做完整核对。' },
          {
            title: '交期监控',
            body: '我来做工厂“怕的那个人”，盯产线、盯船期，减少无声延误。',
          },
          {
            title: '争议协调',
            body: '发现问题的当场谈返工，不用你跨洋吵架。',
          },
        ],
      },
      {
        id: 'ecom-fba',
        title: '电商物流与 FBA 贴标出运',
        integrator: 'FBA 预处理＋集拼出口＋轻品牌物料。',
        focus: '合规可上架、少一个项目经理。',
        price: '定制',
        unit: '按量报价',
        whenToBook: '订单已定，需要中国侧贴标+门到门，告诉我体量与渠道。',
        isEntry: false,
        isFeatured: false,
        bullets: [
          { title: 'FBA 合规', body: '贴标、入袋、打托，符合亚马逊/沃尔玛等规则。' },
          { title: '全球 DDP 运输', body: '海空铁门到门，关税与清关我这边统筹。' },
          { title: '轻品牌', body: '插页、感谢卡、定制包装，叠一点点护城河。' },
        ],
      },
    ],
    trustPillars: [
      {
        iconKey: 'shield',
        title: '你付工资，我只向你负责。',
        body: '无工厂佣金、无返点。合同只在你我之间。',
      },
      {
        iconKey: 'ban',
        title: '利益冲突为 0',
        body: '若厂方要给我好处，你会知情——我直接终止这类关系。',
      },
      {
        iconKey: 'fileDown',
        title: '可转发的证据',
        body: '照片、产线状态、AQL 逻辑，能转发给老板、银行或律师。',
      },
      {
        iconKey: 'clock',
        title: '快、价格透明',
        body: '公开价格。标准验货 24h 出报告，方便你在电汇前做决策。',
      },
    ],
    comparisonItems: [
      {
        iconKey: 'xCircle',
        label: '大型检验品牌',
        text: '不懂你产品与利润的人，给你勾选式报告。',
        tone: 'negative',
      },
      {
        iconKey: 'triangleAlert',
        label: '“免费”找货中间人',
        text: '私下吃工厂返点，会隐瞒损害佣金的缺陷。',
        tone: 'negative',
      },
      {
        iconKey: 'checkCircle2',
        label: 'HF Sourcing — Max Huang',
        text: '十年供应链系统经验。只收你的钱。我报告的是资金风险，不是让工厂好看。',
        tone: 'positive',
      },
    ],
    integrity: {
      badge: '信任与原则',
      title: '为什么“谁发钱”很重要',
      lead: 'B2B 市场靠真实评价。验货也一样：谁在微信群里养这个人？',
    },
    compareStrip: { title: '同样服务，谁在拿双份？', lead: 'G2 用群体真相，我用经济学：一个付款人，一份忠诚。' },
    people: {
      title: '人让信任发生，不是 logo。',
      body: '把首图换成你的清晰照片。G2 上大家按产品筛；这里是谁敢进厂、敢讲真话。',
      imageAlt: '换成你自己的照片：街景、咖啡、东莞或深圳都可以',
    },
    proof: {
      title: '买家评价',
      lead: '像市场型评价一样结构化——用结果说话。',
      verified: '已验证',
      channel: 'WhatsApp / 邮件',
    },
    proofCards: [
      {
        name: 'David R.',
        country: '美国',
        message:
          'Max 发现供应商没提的焊接缺陷，报告帮我们在付尾款前止付。',
        result: '1.84 万美元货值得以保全',
      },
      {
        name: 'Sophie M.',
        country: '德国',
        message: '厂方一直说都好了。Max 到仓点数，只完成约 62%。',
        result: '产线拖期被证据坐实',
      },
      {
        name: 'Marcus T.',
        country: '澳大利亚',
        message: '不是走流程的检查员。他解释缺陷成因并推动厂方返工。',
        result: '装柜前完成返工',
      },
    ],
    reviewMeta: [
      { initials: 'DR', when: '2024年3月' },
      { initials: 'SM', when: '2025年1月' },
      { initials: 'MT', when: '2024年11月' },
    ],
    reportCta: {
      title: '预约前先看整份样例',
      lead: '照片证据、AQL、缺陷清单——同一套可内部分发的文档。',
      button: '下载样例报告（PDF）',
    },
  },
  Footer: {
    about:
      '在中国华南做验厂、样品集货、产线品控与 FBA/出口前准备。不拿厂方资金——带着结论去比。',
    servicesTitle: '服务',
    trustTitle: '信任',
    contactTitle: '联系',
    region: '粤港澳大湾区，中国',
    copyright: '受 B2B 市场式清晰呈现启发（如 G2）。与 G2, Inc. 无关联。',
    links: {
      freePlan: '免费方案',
      verification249: '寻源/验厂 249 美元起',
      samples: '样品 99 美元起 + 运费',
      qc: '品控 299 美元/人天起',
      fba: 'FBA 与物流（定制）',
      integrity: '原则与激励',
      reviews: '评价',
      sampleReport: '样例报告',
    },
  },
  AskMax: {
    successTitle: '感谢，我已收到你的背景信息。',
    successDescription: '另外，我上周刚做完一个相似案例的复盘。样例报告在此，对后续品控也许有用。',
    downloadReport: '下载样例报告（PDF）',
    preferHuman: '想直接找人聊？',
    email: '邮件',
    whatsapp: 'WhatsApp',
    beforeCallTitle: '在我们通话前',
    beforeCallDescription: '两句话说清你是否认真买家、以及我第一封回信能怎么帮到你。',
    labelSourcing: '你在找什么产品/项目？',
    labelHeadache: '目前最头疼的问题是什么？',
    placeholderSourcing: '如：不锈钢餐具，MOQ 2000 套；或贴工厂/链接/厂名',
    placeholderHeadache: '例如：已读不回、样品不对版、上批 AQL 翻车……',
    sending: '发送中',
    submit: '发给 Max',
    reachWithoutForm: '也可以不用表单，直接：',
  },
}

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'en.json'), `${JSON.stringify(en, null, 2)}\n`, 'utf8')
fs.writeFileSync(
  path.join(outDir, 'zh-CN.json'),
  `${JSON.stringify(zhCN, null, 2)}\n`,
  'utf8',
)

console.log('Wrote', path.join(outDir, 'en.json'), path.join(outDir, 'zh-CN.json'))
