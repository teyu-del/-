/* 問題は資料ごとにこの配列へ追加できます。answer は choices の添字（○×は 0=○、1=×）です。 */
const QUIZ_CATEGORIES = [
  { id: 'economy', name: '経済情報の捉え方', icon: '📈', available: true },
  { id: 'exchange', name: '外国為替相場', icon: '💱', available: true },
  { id: 'stock', name: '株式市場', icon: '📊', available: true },
  { id: 'fund', name: '投資信託', icon: '🧺', available: true },
  { id: 'ideco', name: '確定拠出年金', icon: '🏦', available: true },
  { id: 'behavior', name: '行動ファイナンス', icon: '🧠', available: true }
  ,{ id: 'markets', name: '金融市場と金融の役割', icon: '🏛️', available: true }
  ,{ id: 'saving', name: 'つみたて投資', icon: '🌱', available: true }
  ,{ id: 'planning', name: '資産形成とマネープラン', icon: '🗺️', available: true }
  ,{ id: 'bond', name: '債券市場', icon: '📜', available: true }
  ,{ id: 'pension', name: '公的年金制度', icon: '👥', available: true }
];

// 追加資料から作成した確認問題。各事実を四択と○×の2形式で復習できます。
var QUESTIONS = [];

const DISTRACTORS={
  markets:['間接金融','直接金融','信用創造','価値の貯蔵','資金の融通'],
  saving:['共同投資','元本割れ','長期・積立・分散','投資タイミングの分散','将来の投資収益は保証されない'],
  planning:['分散投資','リターン','収益のブレ','金融資産の集合体','資金を主体とする計画'],
  bond:['利息','既発債','価格変動リスク','債券','満期日（償還日）'],
  pension:['社会保険方式','国民皆年金','世代間扶養（賦課方式）','年金','国'],
  economy:['GDP','景気動向指数','消費者物価指数','公債金'],
  exchange:['円高','購買力平価','実質為替レート','クロスレート'],
  stock:['株主','配当金','株価','売買差益'],
  fund:['信託銀行','販売会社','分散投資','共同投資'],
  ideco:['NISA','ETF','給付','拠出'],
  behavior:['損失回避','心理的会計','代表性ヒューリスティック','固着性ヒューリスティック']
};

const EXTRA_FACTS=[
['markets','金融市場の役割とその変化 / 金融、金融機関、資本市場の果たす役割と社会的意義',[['貨幣の機能の一つは、価値を保存できる「価値の貯蔵」である。','価値の貯蔵'],['金融とは、余っているお金を足りない人へ資金の融通を行う仕組みである。','資金の融通'],['銀行などを介する資金の流れを間接金融という。','間接金融'],['株式・債券などを通じた資金の流れを直接金融という。','直接金融'],['銀行には、貸出を通じて預金を生み出す信用創造の機能がある。','信用創造']]],
['saving','つみたて投資の特長と活用方法',[['つみたて投資では、長期・積立・分散という考え方が重要である。','長期・積立・分散'],['投資信託は、共同投資によって多くの投資家の資金をまとめて運用できる商品である。','共同投資'],['投資信託では、運用の結果によっては元本割れが生じる可能性がある。','元本割れ'],['積立投資は、投資タイミングの分散を実現する方法の一つである。','投資タイミングの分散'],['資産形成では、将来の投資収益は保証されないことに注意が必要である。','将来の投資収益は保証されない']]],
['planning','ポートフォリオの作成 / マネープランの作成 / ライフプランと資産形成 / リスク・リターンとポートフォリオ分析',[['ポートフォリオとは、投資家が保有する金融資産の集合体である。','金融資産の集合体'],['分散投資には、資産・地域・銘柄などを分散する方法がある。','分散投資'],['投資におけるリターンは、投資の結果得られる収益をいう。','リターン'],['投資におけるリスクは、収益のブレや予想収益に対する不確実性をいう。','収益のブレ'],['マネープランは、資金を主体とする計画である。','資金を主体とする計画']]],
['bond','債券市場の役割と投資の考え方',[['債券は、国・地方公共団体・企業などが資金を借り入れる際に発行する証書である。','債券'],['債券の発行体は、決められた期日に利息を支払う。','利息'],['債券の満期日（償還日）には、原則として額面金額と最後の利息が支払われる。','満期日（償還日）'],['発行後に投資家間で売買される債券を既発債という。','既発債'],['債券を途中で売却する場合は、価格変動リスクがあるため元本は保証されない。','価格変動リスク']]],
['pension','公的年金制度について',[['年金とは、年を単位として定期的に給付されるお金である。','年金'],['公的年金は、国が運営する年金制度である。','国'],['国民皆年金では、基本的に20歳以上60歳未満の全ての人が対象となる。','国民皆年金'],['日本の公的年金は、加入者が保険料を拠出する社会保険方式である。','社会保険方式'],['世代間扶養（賦課方式）は、その時の現役世代の保険料を年金給付に充てる仕組みである。','世代間扶養（賦課方式）']]]
];

const shuffle=a=>a.map(v=>({v,r:Math.random()})).sort((x,y)=>x.r-y.r).map(x=>x.v);

EXTRA_FACTS.forEach(([category,source,facts])=>facts.forEach(([statement,answer],index)=>{
  const id=`${category}-${index+1}`;
  const blank=statement.replace(`「${answer}」`,'（　　　）').replace(answer,'（　　　）');
  const baseChoices=[answer,...DISTRACTORS[category].filter(v=>v!==answer).slice(0,3)];

  const choicesA=shuffle([...baseChoices]);
  const answerA=choicesA.indexOf(answer);

  const choicesB=shuffle([...baseChoices]);
  const answerB=choicesB.indexOf(answer);

  QUESTIONS.push(
    {id:`${id}-a`,category,type:'choice',question:blank,choices:choicesA,answer:answerA,explanation:statement,source},
    {id:`${id}-b`,category,type:'choice',question:`資料内容から空欄に入る最も適切な語句を選びなさい。\n${blank}`,choices:choicesB,answer:answerB,explanation:statement,source}
  );
}));

QUESTIONS.push(...[
  {id:'eco-01',category:'economy',type:'choice',question:'「お金」「モノ」「サービス」の流れ全体を表す言葉は（　　　）である。',choices:['経済','金融','市場','GDP'],answer:0,explanation:'資料では、経済を「お金」「モノ」「サービス」の流れとして説明している。',source:'経済情報の捉え方'},
  {id:'eco-02',category:'economy',type:'choice',question:'資料で示される経済主体に含まれないものはどれ？',choices:['家計（個人）','企業','政府','学校'],answer:3,explanation:'経済主体は家計・企業・政府である。',source:'経済情報の捉え方'},
  {id:'eco-03',category:'economy',type:'choice',question:'国内で一定期間に生み出された付加価値の総額を表す指標は（　　　）である。',choices:['GDP','GNP','CPI','TOPIX'],answer:0,explanation:'GDPは国内で一定期間に生み出された付加価値の総額である。',source:'経済情報の捉え方'},
  {id:'eco-04',category:'economy',type:'choice',question:'国内で生み出された付加価値の総額を示す指標はどれ？',choices:['GDP','売上高','営業利益','経常利益'],answer:0,explanation:'GDPは売上高ではなく付加価値の総額を示す。',source:'経済情報の捉え方'},
  {id:'eco-05',category:'economy',type:'choice',question:'GDPの支出項目の中で最も割合が大きいものは（　　　）である。',choices:['個人消費','政府支出','輸出','設備投資'],answer:0,explanation:'GDPの支出項目では個人消費が最も大きい。',source:'経済情報の捉え方'},
  {id:'eco-06',category:'economy',type:'choice',question:'輸出額から輸入額を差し引いた値を（　　　）という。',choices:['純輸出','経常収支','貿易黒字','国際収支'],answer:0,explanation:'輸出−輸入を純輸出という。',source:'経済情報の捉え方'},
  {id:'eco-07',category:'economy',type:'choice',question:'輸出額が輸入額を上回ると、GDPを（　　　）要因となる。',choices:['押し上げる','押し下げる','変化させない','必ず半減させる'],answer:0,explanation:'純輸出が増えるとGDPを押し上げる要因となる。',source:'経済情報の捉え方'},
  {id:'eco-08',category:'economy',type:'choice',question:'2000年以降、資料で経常利益の伸びが特に大きいとされるのは（　　　）である。',choices:['非製造業','製造業','金融業','建設業'],answer:0,explanation:'資料では非製造業の伸びが大きい。',source:'経済情報の捉え方'},
  {id:'eco-09',category:'economy',type:'choice',question:'日本銀行が実施する企業の景況感調査は（　　　）と呼ばれる。',choices:['日銀短観','家計調査','景気ウォッチャー調査','法人企業統計'],answer:0,explanation:'正式名称は全国企業短期経済観測調査（日銀短観）。',source:'経済情報の捉え方'},
  {id:'eco-10',category:'economy',type:'choice',question:'全国企業短期経済観測調査（日銀短観）を実施する機関は（　　　）である。',choices:['日本銀行','財務省','総務省','内閣府'],answer:0,explanation:'日銀短観は日本銀行が実施する。',source:'経済情報の捉え方'},
  {id:'eco-11',category:'economy',type:'choice',question:'国の歳出に占める割合が最も大きい費目は（　　　）である。',choices:['社会保障関係費','公共事業関係費','文教・科学振興費','防衛関係費'],answer:0,explanation:'資料では、国の歳出で最も割合が大きいのは社会保障関係費とされている。',source:'経済情報の捉え方'},
  {id:'eco-12',category:'economy',type:'choice',question:'国の歳入のおよそ4分の1を占める財源は（　　　）である。',choices:['公債金','消費税','所得税','法人税'],answer:0,explanation:'資料では、歳入のおよそ4分の1を公債金が占めている。',source:'経済情報の捉え方'},
  {id:'eco-13',category:'economy',type:'choice',question:'日本の貿易額で、輸出・輸入ともに最も割合が大きい地域は（　　　）である。',choices:['アジア','欧州','北米','中東'],answer:0,explanation:'輸出・輸入ともにアジアの割合が最も大きい。',source:'経済情報の捉え方'},
  {id:'eco-14',category:'economy',type:'choice',question:'日本の輸出相手として最も割合が大きい地域はどれか。',choices:['アジア','欧州','北米','中東'],answer:0,explanation:'最も割合が大きい地域はアジアである。',source:'経済情報の捉え方'},
  {id:'eco-15',category:'economy',type:'choice',question:'景気動向指数を構成する3つの系列として正しい組み合わせはどれか。',choices:['先行・一致・遅行','先行・現在・未来','好況・不況・停滞','製造・非製造・金融'],answer:0,explanation:'景気動向指数は先行系列・一致系列・遅行系列で構成される。',source:'経済情報の捉え方'},
  {id:'eco-16',category:'economy',type:'choice',question:'景気の変化を最も早く示す指標を（　　　）という。',choices:['先行指数','一致指数','遅行指数','総合指数'],answer:0,explanation:'先行指数は景気の動きに先行して変化する。',source:'経済情報の捉え方'},
  {id:'eco-17',category:'economy',type:'choice',question:'製造業や鉱業の生産活動の動向を示す代表的な指標は（　　　）である。',choices:['鉱工業生産指数','消費者物価指数','企業物価指数','景気一致指数'],answer:0,explanation:'鉱工業生産指数は鉱業・製造業の生産活動を示す。',source:'経済情報の捉え方'},
  {id:'eco-18',category:'economy',type:'choice',question:'国内総生産の正式な英語名称はどれか。',choices:['Gross Domestic Product','Global Domestic Production','General Domestic Product','Gross Development Product'],answer:0,explanation:'GDPはGross Domestic Productの略称である。',source:'経済情報の捉え方'},
  {id:'eco-19',category:'economy',type:'choice',question:'家計・企業・政府・海外を含めた経済活動を総合的に把握する代表的な指標は（　　　）である。',choices:['GDP','TOPIX','日経平均株価','消費者物価指数'],answer:0,explanation:'GDPは各経済主体の活動を総合的に把握する代表的な指標である。',source:'経済情報の捉え方'},
  {id:'eco-20',category:'economy',type:'choice',question:'企業の景況感が悪化し、個人消費も減少した場合、GDPへの影響として最も適切なのはどれか。',choices:['減少要因になる','増加要因になる','影響はない','必ず物価だけが上昇する'],answer:0,explanation:'企業活動や個人消費の低下はGDPを押し下げる要因となる。',source:'経済情報の捉え方'},
  
  {id:'fx-01',category:'exchange',type:'choice',question:'異なる国の通貨を交換することを（　　　）という。',choices:['外国為替','株式取引','金融政策','公開市場操作'],answer:0,explanation:'資料では、外国為替を異なる通貨を交換することと説明している。',source:'外国為替相場とその変動要因 P3'},
  {id:'fx-02',category:'exchange',type:'choice',question:'異なる2つの通貨を交換するときの交換比率を（　　　）という。',choices:['為替レート','物価指数','株価指数','金利'],answer:0,explanation:'為替レートは異なる2つの通貨の交換比率である。',source:'外国為替相場とその変動要因 P3'},
  {id:'fx-03',category:'exchange',type:'choice',question:'外国為替市場の取引方法として正しいものはどれか。',choices:['電子取引などを通じて行われ、必ずしも取引所は存在しない','必ず証券取引所で取引される','日本銀行だけが取引できる','銀行では取引できない'],answer:0,explanation:'外国為替市場は必ずしも物理的な市場ではなく、電子取引などで取引される。',source:'外国為替相場とその変動要因 P3'},
  {id:'fx-04',category:'exchange',type:'choice',question:'米ドルを介さない2通貨間の為替レートを（　　　）という。',choices:['クロスレート','実効レート','名目レート','固定レート'],answer:0,explanation:'米ドル以外の2通貨間の為替レートはクロスレートと呼ばれる。',source:'外国為替相場とその変動要因 P5'},
  {id:'fx-05',category:'exchange',type:'choice',question:'1ドル=100円から1ドル=110円へ変化した場合、この為替変動はどれか。',choices:['円安・ドル高','円高・ドル安','円高・ユーロ安','変化なし'],answer:0,explanation:'1ドルを得るためにより多くの円が必要になるため、円安・ドル高である。',source:'外国為替相場とその変動要因 P6'},
  {id:'fx-06',category:'exchange',type:'choice',question:'名目為替レートに物価変動の影響を考慮したものを（　　　）という。',choices:['実質為替レート','固定為替レート','クロスレート','直物為替レート'],answer:0,explanation:'実質為替レートは名目為替レートから物価変動を考慮した指標である。',source:'外国為替相場とその変動要因 P8'},
  {id:'fx-07',category:'exchange',type:'choice',question:'購買力平価説の前提となる考え方はどれか。',choices:['一物一価の法則','需要と供給の法則','比較優位','規模の経済'],answer:0,explanation:'購買力平価は一物一価の法則を前提としている。',source:'外国為替相場とその変動要因 P14'},
  {id:'fx-08',category:'exchange',type:'choice',question:'日本からの輸出が増え、外貨を円へ交換する取引が増加した場合、円相場への影響として最も適切なのはどれか。',choices:['円高要因となる','円安要因となる','影響しない','必ずドル安になる'],answer:0,explanation:'円への需要が増えるため、円高要因となる。',source:'外国為替相場とその変動要因 P17'},

  {id:'stock-01',category:'stock',type:'choice',question:'株式会社が事業に必要な資金を広く集める方法として発行するものは（　　　）である。',choices:['株式','社債','国債','手形'],answer:0,explanation:'株式会社は株式を発行して資金を調達する。',source:'株式投資と株価変動要因 P3'},
  {id:'stock-02',category:'stock',type:'choice',question:'株式を購入した人が会社に対して持つ立場として最も適切なのはどれか。',choices:['株主','債権者','従業員','取引先'],answer:0,explanation:'株式を保有する人は株主である。',source:'株式投資と株価変動要因 P3'},
  {id:'stock-03',category:'stock',type:'choice',question:'株式を保有することで企業から利益の一部を受け取ることを（　　　）という。',choices:['配当','利息','税還付','為替差益'],answer:0,explanation:'企業利益の一部を株主へ分配することを配当という。',source:'株式投資と株価変動要因 P4'},
  {id:'stock-04',category:'stock',type:'choice',question:'株価が変動する要因として最も適切なのはどれか。',choices:['企業業績や景気など様々な要因','天気だけ','人口だけ','曜日だけ'],answer:0,explanation:'株価は企業業績や景気、金利など様々な要因で変動する。',source:'株式投資と株価変動要因 P6'},
  {id:'stock-05',category:'stock',type:'choice',question:'株式を安く買って高く売ることで得られる利益を（　　　）という。',choices:['売買差益','配当金','利息','税額控除'],answer:0,explanation:'株価の値上がりによる利益を売買差益（キャピタルゲイン）という。',source:'株式投資と株価変動要因 P5'},
  {id:'stock-06',category:'stock',type:'choice',question:'企業の業績が大幅に改善した場合、一般的な株価への影響として最も適切なのはどれか。',choices:['上昇しやすい','下落しやすい','必ず変化しない','必ず取引停止になる'],answer:0,explanation:'企業業績の改善は株価の上昇要因となることが多い。',source:'株式投資と株価変動要因 P6'},

  {id:'fund-01',category:'fund',type:'choice',question:'投資家から集めた資金をまとめて運用する金融商品を（　　　）という。',choices:['投資信託','株式','社債','定期預金'],answer:0,explanation:'投資信託は、集めた資金を運用の専門家が株式や債券などに投資・運用する商品です。',source:'投資信託の役割とその仕組み P5'},
  {id:'fund-02',category:'fund',type:'choice',question:'投資信託の運用成果は、どのような基準で投資家へ分配されるか。',choices:['投資額に応じて分配される','全員に同額ずつ分配される','運用会社が自由に決める','販売会社が抽選で決める'],answer:0,explanation:'資料では、運用成果は投資家それぞれの投資額に応じて分配されると説明されています。',source:'投資信託の役割とその仕組み P5'},
  {id:'fund-03',category:'fund',type:'choice',question:'少額から幅広い資産へ投資しやすくなる投資信託の仕組みは（　　　）である。',choices:['共同投資','単独投資','信用創造','為替介入'],answer:0,explanation:'共同投資によって規模の効果が得られ、少額からの投資が可能になります。',source:'投資信託の役割とその仕組み P5・P9'},
  {id:'fund-04',category:'fund',type:'choice',question:'投資信託の資産を運用会社とは分けて管理する機関は（　　　）である。',choices:['信託銀行','販売会社','証券取引所','金融庁'],answer:0,explanation:'資料の仕組み図では、信託銀行が資産の分別管理を行うと示されています。',source:'投資信託の役割とその仕組み P5'},
  {id:'fund-05',category:'fund',type:'choice',question:'投資信託の特徴として正しいものはどれか。',choices:['元本や分配金は保証されていない','元本と分配金は必ず保証される','元本のみ保証される','分配金のみ保証される'],answer:0,explanation:'投資信託は元本・分配金の保証がない商品です。',source:'投資信託の役割とその仕組み P7'},
  {id:'fund-06',category:'fund',type:'choice',question:'資料で投資信託の発祥の地として紹介されている国は（　　　）である。',choices:['英国','米国','日本','フランス'],answer:0,explanation:'投資信託は19世紀の英国で誕生したと言われています。',source:'投資信託の役割とその仕組み P6'},

  {id:'dc-01',category:'ideco',type:'choice',question:'確定拠出年金（DC）で将来受け取る年金額を左右するものは（　　　）である。',choices:['加入者自身の運用成果','国が決める固定額','勤務先の売上','為替相場'],answer:0,explanation:'DCは、加入者ごとに管理された掛金を加入者自身が運用し、その結果で年金額が決まる制度です。',source:'確定拠出年金について P3'},
  {id:'dc-02',category:'ideco',type:'choice',question:'個人型確定拠出年金の愛称は（　　　）である。',choices:['iDeCo','NISA','ETF','REIT'],answer:0,explanation:'確定拠出年金には企業型DCと個人型DCがあり、個人型DCはiDeCoです。',source:'確定拠出年金について P4'},
  {id:'dc-03',category:'ideco',type:'choice',question:'個人型確定拠出年金（iDeCo）の掛金を拠出するのは誰か。',choices:['加入者本人','勤務先','国','金融機関'],answer:0,explanation:'個人型DC（iDeCo）は加入者本人が掛金を拠出する制度です。',source:'確定拠出年金について P4'},
  {id:'dc-04',category:'ideco',type:'choice',question:'iDeCoの掛金は原則どの条件で設定できるか。',choices:['5,000円以上・1,000円単位','1,000円以上・100円単位','10,000円以上・1円単位','自由に設定できる'],answer:0,explanation:'資料では、iDeCoの掛金は月額5,000円以上、1,000円単位の任意の額とされています。',source:'確定拠出年金について P4'},
  {id:'dc-05',category:'ideco',type:'choice',question:'iDeCoの税制優遇として正しいものはどれか。',choices:['運用益が非課税になる','運用益には必ず課税される','掛金は全額課税される','税制優遇はない'],answer:0,explanation:'資料では、iDeCoの税制メリットとして運用益が非課税であることが説明されています。',source:'確定拠出年金について P13'},
  {id:'dc-06',category:'ideco',type:'choice',question:'iDeCoで積み立てた資産を受け取ることを（　　　）という。',choices:['給付','拠出','償還','分別管理'],answer:0,explanation:'iDeCoで積立・運用してきた資産を受け取ることを給付といいます。',source:'確定拠出年金について P12'},

  {id:'bf-01',category:'behavior',type:'choice',question:'金融市場の価格変動を、人々の心理や行動から分析する分野を（　　　）という。',choices:['行動ファイナンス','マクロ経済学','財政学','金融工学'],answer:0,explanation:'行動ファイナンスは、金融市場関係者の現実の行動分析を通じて市場価格の動きを理解しようとする分野です。',source:'行動ファイナンス～投資家心理について P8'},
  {id:'bf-02',category:'behavior',type:'choice',question:'行動ファイナンスの考え方として適切なのはどれか。',choices:['人は必ずしも合理的な行動をとるとは限らない','人は常に合理的に行動する','損失は意思決定に影響しない','心理は市場価格に影響しない'],answer:0,explanation:'行動ファイナンスは、必ずしも合理的行動をとるとは限らない「普通の人間」を前提にします。',source:'行動ファイナンス～投資家心理について P8'},
  {id:'bf-03',category:'behavior',type:'choice',question:'短時間で判断するために用いられる思考の近道を（　　　）という。',choices:['ヒューリスティック','損失回避','分散投資','信用創造'],answer:0,explanation:'ヒューリスティックは短時間で判断するための便利な近道ですが、合理的な判断を誤らせることもあります。',source:'行動ファイナンス～投資家心理について P10'},
  {id:'bf-04',category:'behavior',type:'choice',question:'典型的だと思われる特徴を基に判断する傾向を（　　　）という。',choices:['代表性ヒューリスティック','固着性ヒューリスティック','心理的会計','損失回避'],answer:0,explanation:'代表性ヒューリスティックは、典型的と思われるものを判断に利用する傾向です。',source:'行動ファイナンス～投資家心理について P11'},
  {id:'bf-05',category:'behavior',type:'choice',question:'最初に示された数字や情報が判断に強く影響する傾向を（　　　）という。',choices:['固着性ヒューリスティック','代表性ヒューリスティック','心理的会計','現状維持バイアス'],answer:0,explanation:'固着性ヒューリスティック（アンカリング）は、最初に示された数字などに判断が引きずられやすい傾向です。',source:'行動ファイナンス～投資家心理について P13'},
  {id:'bf-06',category:'behavior',type:'choice',question:'お金の出どころや使い道によって頭の中で区別して管理する傾向を（　　　）という。',choices:['心理的会計','損失回避','分散投資','代表性ヒューリスティック'],answer:0,explanation:'資料では、心理的会計をこのような傾向として説明しています。',source:'行動ファイナンス～投資家心理について P15'},
  {id:'bf-07',category:'behavior',type:'choice',question:'プロスペクト理論では、同じ金額であれば一般的に利益よりも（　　　）の方が大きく感じられる。',choices:['損失','利益','配当','金利'],answer:0,explanation:'資料では、同じ価値（金額）でも損失の場合の方が大きく感じると説明されています。',source:'行動ファイナンス～投資家心理について P18'},
]);
