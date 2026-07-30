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
const EXTRA_FACTS = [
  ['markets','金融市場の役割とその変化 / 金融、金融機関、資本市場の果たす役割と社会的意義',[['貨幣の機能の一つは、価値を保存できる「価値の貯蔵」である。','価値の貯蔵'],['金融とは、余っているお金を足りない人へ融通する仕組みである。','資金の融通'],['銀行などを介する資金の流れを間接金融という。','間接金融'],['株式・債券などを通じた資金の流れを直接金融という。','直接金融'],['銀行には、貸出を通じて預金を生み出す信用創造の機能がある。','信用創造']]],
  ['saving','つみたて投資の特長と活用方法',[['つみたて投資では、長期・積立・分散という考え方が重要である。','長期・積立・分散'],['投資信託は、多くの投資家の資金をまとめて運用できる商品である。','共同投資'],['投資信託では、運用の結果によっては元本割れが生じる可能性がある。','元本割れ'],['積立投資は、投資する時期を分散する方法の一つである。','投資タイミングの分散'],['資産形成では、将来の投資収益は保証されないことに注意が必要である。','将来の投資収益は保証されない']]],
  ['planning','ポートフォリオの作成 / マネープランの作成 / ライフプランと資産形成 / リスク・リターンとポートフォリオ分析',[['ポートフォリオとは、投資家が保有する有価証券や金融資産の集合体である。','金融資産の集合体'],['分散投資には、資産・地域・銘柄などを分散する方法がある。','分散投資'],['投資におけるリターンは、投資の結果得られる収益をいう。','リターン'],['投資におけるリスクは、収益のブレや予想収益に対する不確実性をいう。','収益のブレ'],['ライフプランは人生イベントを主体とし、マネープランは資金を主体とする計画である。','資金を主体とする計画']]],
  ['bond','債券市場の役割と投資の考え方',[['債券は、国・地方公共団体・企業などが資金を借り入れる際に発行する証書である。','債券'],['債券の発行体は、決められた期日に利息を支払う。','利息'],['債券の満期日（償還日）には、原則として額面金額と最後の利息が支払われる。','満期日（償還日）'],['発行後に投資家間で売買される債券を既発債という。','既発債'],['債券を途中で売却する場合、価格は市場で決まり、元本が保証されるわけではない。','価格変動リスク']]],
  ['pension','公的年金制度について',[['年金とは、年を単位として定期的に給付されるお金である。','年金'],['公的年金は、国が運営する年金制度である。','国'],['国民皆年金では、基本的に20歳以上60歳未満の全ての人が対象となる。','国民皆年金'],['日本の公的年金は、加入者が保険料を拠出する社会保険方式である。','社会保険方式'],['世代間扶養（賦課方式）は、その時の現役世代の保険料を年金給付に充てる仕組みである。','世代間扶養（賦課方式）']]]
];

EXTRA_FACTS.forEach(([category, source, facts]) => facts.forEach(([statement, answer], index) => {
  const id = `${category}-${index + 1}`;
  QUESTIONS.push(
    {id:`${id}-ox`,category,type:'ox',question:statement,choices:['○','×'],answer:0,explanation:statement,source},
    {id:`${id}-choice`,category,type:'choice',question:`次の説明に当てはまる語句はどれ？\n${statement}`,choices:[answer,'GDP','為替レート','配当金'],answer:0,explanation:statement,source}
  );
}));

QUESTIONS.push(...[
  {id:'eco-01',category:'economy',type:'ox',question:'経済とは、「お金」「モノ」「サービス」の流れのことである。',choices:['○','×'],answer:0,explanation:'資料では、経済を「お金」「モノ」「サービス」の流れとして捉えています。',source:'経済情報の捉え方'},
  {id:'eco-02',category:'economy',type:'choice',question:'次のうち、資料で示される経済主体ではないものはどれ？',choices:['家計（個人）','企業','政府','学校'],answer:3,explanation:'経済主体として家計（個人）・企業・政府が示されています。',source:'経済情報の捉え方'},
  {id:'eco-03',category:'economy',type:'choice',question:'GDPとは、国内で一定期間に生み出された何の総額？',choices:['売上高','付加価値','利益','所得'],answer:1,explanation:'GDP（国内総生産）は、国内で一定期間に生み出された付加価値の総額です。',source:'経済情報の捉え方'},
  {id:'eco-04',category:'economy',type:'ox',question:'GDPは、国内で生産された商品の売上高の合計を表す。',choices:['○','×'],answer:1,explanation:'GDPは売上高の合計ではなく、国内で生み出された「付加価値」の総額です。',source:'経済情報の捉え方'},
  {id:'eco-05',category:'economy',type:'choice',question:'GDPを支出面から見たとき、日本で最も割合が大きい項目はどれ？',choices:['政府支出','個人消費','輸出','設備投資'],answer:1,explanation:'GDPの支出項目の中では、個人消費の割合が最も大きいと説明されています。',source:'経済情報の捉え方'},
  {id:'eco-06',category:'economy',type:'choice',question:'輸出から輸入を差し引いたものを何という？',choices:['経常収支','純輸出','貿易黒字','国際収支'],answer:1,explanation:'輸出－輸入は「純輸出」です。GDPの支出項目の一つとして扱われます。',source:'経済情報の捉え方'},
  {id:'eco-07',category:'economy',type:'ox',question:'純輸出がプラスになると、GDPを押し上げる要因となる。',choices:['○','×'],answer:0,explanation:'純輸出は輸出－輸入です。プラスであればGDPへの寄与は押し上げ方向になります。',source:'経済情報の捉え方'},
  {id:'eco-08',category:'economy',type:'choice',question:'2000年以降、経常利益が大きく増加したのはどの企業？',choices:['製造業','非製造業','金融業','建設業'],answer:1,explanation:'資料の比較では、2000年以降に経常利益が大きく増加したのは非製造業です。',source:'経済情報の捉え方'},
  {id:'eco-09',category:'economy',type:'choice',question:'日本銀行が実施する企業の景況感調査はどれ？',choices:['景気ウォッチャー調査','日銀短観','家計調査','法人企業統計'],answer:1,explanation:'日本銀行が行う全国企業短期経済観測調査は、一般に「日銀短観」と呼ばれます。',source:'経済情報の捉え方'},
  {id:'eco-10',category:'economy',type:'choice',question:'日銀短観を実施している機関はどれ？',choices:['財務省','総務省','日本銀行','内閣府'],answer:2,explanation:'日銀短観は日本銀行が実施する調査です。',source:'経済情報の捉え方'},
  {id:'eco-11',category:'economy',type:'choice',question:'国の歳出で最も割合が大きいものは？',choices:['公共事業関係費','文教・科学振興費','社会保障関係費','防衛関係費'],answer:2,explanation:'資料では、国の歳出で最も割合が大きいのは社会保障関係費とされています。',source:'経済情報の捉え方'},
  {id:'eco-12',category:'economy',type:'choice',question:'国の歳入のおよそ4分の1を占めるものは？',choices:['消費税','所得税','公債金','法人税'],answer:2,explanation:'資料の歳入構成では、公債金がおよそ4分の1を占めています。',source:'経済情報の捉え方'},
  {id:'eco-13',category:'economy',type:'choice',question:'日本の貿易額で、輸出・輸入ともに最も割合が大きい地域は？',choices:['アジア','欧州','北米','中東'],answer:0,explanation:'資料の地域別貿易額では、輸出・輸入ともアジアの割合が最も大きいことが示されています。',source:'経済情報の捉え方'},
  {id:'eco-14',category:'economy',type:'ox',question:'日本の輸出相手として最も割合が大きい地域は欧州である。',choices:['○','×'],answer:1,explanation:'最も割合が大きい地域は欧州ではなくアジアです。',source:'経済情報の捉え方'},
  {id:'eco-15',category:'economy',type:'choice',question:'景気動向指数の3種類として正しい組み合わせは？',choices:['先行・一致・遅行','先行・現在・未来','好況・不況・停滞','製造・非製造・金融'],answer:0,explanation:'景気動向指数は、先行系列・一致系列・遅行系列の3つに分けられます。',source:'経済情報の捉え方'},
  {id:'eco-16',category:'economy',type:'choice',question:'景気の動きを最も早く示すものを何指数という？',choices:['一致指数','遅行指数','先行指数','総合指数'],answer:2,explanation:'先行指数は、景気の動きに先行する指標です。',source:'経済情報の捉え方'},
  {id:'eco-17',category:'economy',type:'ox',question:'鉱工業生産指数は、製造業や鉱業の生産活動を表す指標である。',choices:['○','×'],answer:0,explanation:'鉱工業生産指数は、鉱業・製造業の生産活動の動きを示す指標です。',source:'経済情報の捉え方'},
  {id:'eco-18',category:'economy',type:'choice',question:'GDPの英語表記として正しいものは？',choices:['Gross Domestic Product','Global Domestic Production','General Domestic Product','Gross Development Product'],answer:0,explanation:'GDPは Gross Domestic Product の略です。',source:'経済情報の捉え方'},
  {id:'eco-19',category:'economy',type:'ox',question:'GDPを見ることで、家計・企業・政府・海外に関わる経済活動を捉えることができる。',choices:['○','×'],answer:0,explanation:'GDPの支出面には個人消費、設備投資、政府支出、純輸出などが含まれ、各経済主体の活動を把握する手掛かりになります。',source:'経済情報の捉え方'},
  {id:'eco-20',category:'economy',type:'choice',question:'企業の景況感が悪化し、個人消費も減少した場合に考えられるGDPへの影響は？',choices:['増加要因になる','減少要因になる','影響はない','必ず物価が上がる'],answer:1,explanation:'企業活動や個人消費の低下は、GDPを減少させる要因として考えられます。',source:'経済情報の捉え方'},

  {id:'fx-01',category:'exchange',type:'choice',question:'外国為替とは何をすること？',choices:['株式を売買すること','異なる通貨を交換すること','国債を発行すること','物価を測ること'],answer:1,explanation:'資料では、外国為替を異なる通貨を交換することと説明しています。',source:'外国為替相場とその変動要因 P3'},
  {id:'fx-02',category:'exchange',type:'choice',question:'為替レートとは何を示すもの？',choices:['2つの通貨の交換比率','各国の物価上昇率','企業の利益率','株式の配当率'],answer:0,explanation:'為替レートは、異なる2つの通貨を交換する時の交換比率です。',source:'外国為替相場とその変動要因 P3'},
  {id:'fx-03',category:'exchange',type:'ox',question:'外国為替市場は、必ずしも取引所のような物理的な場所で取引されるわけではない。',choices:['○','×'],answer:0,explanation:'資料では、電子取引などを通じて取引され、物理的な市場があるわけではないと説明されています。',source:'外国為替相場とその変動要因 P3'},
  {id:'fx-04',category:'exchange',type:'choice',question:'米ドル以外の2通貨間の為替レートを何という？',choices:['実効レート','クロスレート','名目レート','固定レート'],answer:1,explanation:'米ドル以外の2通貨間の為替レートはクロスレートと呼ばれます。',source:'外国為替相場とその変動要因 P5'},
  {id:'fx-05',category:'exchange',type:'choice',question:'1ドル=100円から1ドル=110円になった場合、これはどれ？',choices:['円高ドル安','円安ドル高','円高ユーロ安','変化なし'],answer:1,explanation:'1ドルを得るためにより多くの円が必要になるので、円安ドル高です。',source:'外国為替相場とその変動要因 P6'},
  {id:'fx-06',category:'exchange',type:'ox',question:'実質為替レートは、名目為替レートから物価変動の影響を考慮して求める。',choices:['○','×'],answer:0,explanation:'資料では、実質為替レートは名目為替レートに物価変動分を考慮したものと説明されています。',source:'外国為替相場とその変動要因 P8'},
  {id:'fx-07',category:'exchange',type:'choice',question:'購買力平価が前提とする考え方はどれ？',choices:['規模の経済','一物一価の法則','需要の価格弾力性','比較優位'],answer:1,explanation:'購買力平価は、同じ商品の価格は1つに決まるという一物一価の法則を前提にします。',source:'外国為替相場とその変動要因 P14'},
  {id:'fx-08',category:'exchange',type:'ox',question:'日本からの輸出が増え、外貨を円に換える需要が増えることは円高要因になり得る。',choices:['○','×'],answer:0,explanation:'輸出で得た外貨を円に換えることで円への需要が増え、円高要因となると説明されています。',source:'外国為替相場とその変動要因 P17'},

  {id:'stock-01',category:'stock',type:'choice',question:'株主総会で議案への賛否を投じることができる権利は？',choices:['議決権','優先権','交換権','解約権'],answer:0,explanation:'株主の主な権利の一つとして、株主総会の議案に対して賛否を投じる議決権が示されています。',source:'株式市場の役割と投資の考え方 P5'},
  {id:'stock-02',category:'stock',type:'ox',question:'会社が倒産した場合、株主は出資額を超えて責任を負うのが原則である。',choices:['○','×'],answer:1,explanation:'株主には有限責任の原則があり、責任は各々の出資額に限定されます。',source:'株式市場の役割と投資の考え方 P6'},
  {id:'stock-03',category:'stock',type:'choice',question:'株価が上がったときに売却して得られる利益を何という？',choices:['インカムゲイン','キャピタルゲイン','金利','信託報酬'],answer:1,explanation:'値上がり益はキャピタルゲインです。資料では、利益は売却後に得られると説明されています。',source:'株式市場の役割と投資の考え方 P8'},
  {id:'stock-04',category:'stock',type:'choice',question:'企業が利益の一部を株主に還元するものは？',choices:['配当金','株主資本','時価総額','元本'],answer:0,explanation:'配当金は、企業が利益の一部を株主に還元するものです。',source:'株式市場の役割と投資の考え方 P9'},
  {id:'stock-05',category:'stock',type:'ox',question:'配当金は、業績や経営方針によっては支払われない場合がある。',choices:['○','×'],answer:0,explanation:'資料では、配当金は業績や経営方針により金額が変わり、出ない場合もあると示されています。',source:'株式市場の役割と投資の考え方 P9'},
  {id:'stock-06',category:'stock',type:'choice',question:'株式を1,000円で1,000株購入し、1,200円で売却した場合の値上がり益は？',choices:['2万円','10万円','20万円','120万円'],answer:2,explanation:'(1,200円−1,000円) × 1,000株 = 200,000円です。',source:'株式市場の役割と投資の考え方 P8'},

  {id:'fund-01',category:'fund',type:'choice',question:'投資信託は、投資家から集めた資金を主に誰が運用する商品？',choices:['運用の専門家','国税庁','各投資家が別々に','中央銀行'],answer:0,explanation:'投資信託は、集めた資金を運用の専門家が株式や債券などに投資・運用する商品です。',source:'投資信託の役割とその仕組み P5'},
  {id:'fund-02',category:'fund',type:'ox',question:'投資信託の運用成果は、投資家それぞれの投資額に応じて分配される。',choices:['○','×'],answer:0,explanation:'資料では、運用成果は投資家それぞれの投資額に応じて分配されると説明されています。',source:'投資信託の役割とその仕組み P5'},
  {id:'fund-03',category:'fund',type:'choice',question:'投資信託の特長で、少額から投資を可能にする仕組みは？',choices:['共同投資','単独投資','信用創造','為替介入'],answer:0,explanation:'共同投資によって規模の効果が得られ、少額からの投資が可能になります。',source:'投資信託の役割とその仕組み P5・P9'},
  {id:'fund-04',category:'fund',type:'choice',question:'投資信託の資産を分別管理する機関は？',choices:['信託銀行','販売会社','投資家本人','証券取引所'],answer:0,explanation:'資料の仕組み図では、信託銀行が資産の分別管理を行うと示されています。',source:'投資信託の役割とその仕組み P5'},
  {id:'fund-05',category:'fund',type:'ox',question:'投資信託では、元本と分配金が保証されている。',choices:['○','×'],answer:1,explanation:'投資信託は元本・分配金の保証がない商品です。',source:'投資信託の役割とその仕組み P7'},
  {id:'fund-06',category:'fund',type:'choice',question:'投資信託の起源として資料で挙げられている国は？',choices:['英国','米国','日本','フランス'],answer:0,explanation:'投資信託は19世紀の英国で誕生したと言われています。',source:'投資信託の役割とその仕組み P6'},

  {id:'dc-01',category:'ideco',type:'choice',question:'確定拠出年金（DC）で年金額を左右するものは？',choices:['加入者自身の運用','必ず国が決める額','勤務先の売上のみ','為替相場のみ'],answer:0,explanation:'DCは、加入者ごとに管理された掛金を加入者自身が運用し、その結果で年金額が決まる制度です。',source:'確定拠出年金について P3'},
  {id:'dc-02',category:'ideco',type:'choice',question:'個人型DCの名称は？',choices:['iDeCo','NISA','ETF','REIT'],answer:0,explanation:'確定拠出年金には企業型DCと個人型DCがあり、個人型DCはiDeCoです。',source:'確定拠出年金について P4'},
  {id:'dc-03',category:'ideco',type:'ox',question:'iDeCoの掛金は加入者本人が拠出する。',choices:['○','×'],answer:0,explanation:'個人型DC（iDeCo）は加入者本人が掛金を拠出する制度です。',source:'確定拠出年金について P4'},
  {id:'dc-04',category:'ideco',type:'choice',question:'iDeCoの掛金は原則いくら以上、何円単位で設定できる？',choices:['1,000円以上・100円単位','5,000円以上・1,000円単位','10,000円以上・1,000円単位','自由に1円単位'],answer:1,explanation:'資料では、iDeCoの掛金は月額5,000円以上、1,000円単位の任意の額とされています。',source:'確定拠出年金について P4'},
  {id:'dc-05',category:'ideco',type:'ox',question:'iDeCoでは、運用益は非課税という税制優遇がある。',choices:['○','×'],answer:0,explanation:'資料では、iDeCoの税制メリットとして運用益が非課税であることが説明されています。',source:'確定拠出年金について P13'},
  {id:'dc-06',category:'ideco',type:'choice',question:'iDeCoで積立・運用してきた資産を受け取ることを何という？',choices:['給付','拠出','分別管理','償還'],answer:0,explanation:'iDeCoで積立・運用してきた資産を受け取ることを給付といいます。',source:'確定拠出年金について P12'},

  {id:'bf-01',category:'behavior',type:'choice',question:'行動ファイナンスとは、何を通じて市場価格の動きを理解しようとする分野？',choices:['金融市場関係者の現実の行動分析','過去の物価だけ','法律の条文だけ','企業の売上だけ'],answer:0,explanation:'行動ファイナンスは、金融市場関係者の現実の行動分析を通じて市場価格の動きを理解しようとする分野です。',source:'行動ファイナンス～投資家心理について P8'},
  {id:'bf-02',category:'behavior',type:'ox',question:'行動ファイナンスでは、人は常に収益最大化に向けた合理的行動をとると前提する。',choices:['○','×'],answer:1,explanation:'行動ファイナンスは、必ずしも合理的行動をとるとは限らない「普通の人間」を前提にします。',source:'行動ファイナンス～投資家心理について P8'},
  {id:'bf-03',category:'behavior',type:'choice',question:'ヒューリスティックの説明として最も適切なものは？',choices:['意思決定の便利な近道','国債の利率','投資信託の分配金','為替の交換比率'],answer:0,explanation:'ヒューリスティックは短時間で判断するための便利な近道ですが、合理的な判断を誤らせることもあります。',source:'行動ファイナンス～投資家心理について P10'},
  {id:'bf-04',category:'behavior',type:'choice',question:'典型的と思われるものを判断に利用する傾向を何という？',choices:['代表性ヒューリスティック','損失回避','心理的会計','分散投資'],answer:0,explanation:'代表性ヒューリスティックは、典型的と思われるものを判断に利用する傾向です。',source:'行動ファイナンス～投資家心理について P11'},
  {id:'bf-05',category:'behavior',type:'choice',question:'最初に示された数字や印象に判断が引きずられやすい傾向は？',choices:['固着性ヒューリスティック','共同投資','購買力平価','信用創造'],answer:0,explanation:'固着性ヒューリスティック（アンカリング）は、最初に示された数字などに判断が引きずられやすい傾向です。',source:'行動ファイナンス～投資家心理について P13'},
  {id:'bf-06',category:'behavior',type:'ox',question:'心理的会計とは、出どころや使い道によって心の中でお金を分類し、使い分ける傾向を指す。',choices:['○','×'],answer:0,explanation:'資料では、心理的会計をこのような傾向として説明しています。',source:'行動ファイナンス～投資家心理について P15'},
  {id:'bf-07',category:'behavior',type:'choice',question:'プロスペクト理論では、同じ金額なら利益より損失の方が一般にどう感じられる？',choices:['より大きく感じる','より小さく感じる','必ず同じに感じる','感じ方は扱わない'],answer:0,explanation:'資料では、同じ価値（金額）でも損失の場合の方が大きく感じると説明されています。',source:'行動ファイナンス～投資家心理について P18'}
]);

// 本番直前の反復用：同じ重要論点を別形式でも確認できるように追加。
// 103問の基礎セットと合わせ、全範囲は200問に固定しています。
const FINAL_REVIEW_QUESTIONS = EXTRA_FACTS.flatMap(([category, source, facts]) => facts.flatMap(([statement, answer], index) => [
  {id:`final-${category}-${index + 1}-a`,category,type:'choice',question:`「${answer}」について、資料の説明として正しいものはどれ？`,choices:[statement,'資料には説明されていない。','常に元本が保証される。','どの場合にも同じ結果になる。'],answer:0,explanation:statement,source},
  {id:`final-${category}-${index + 1}-b`,category,type:'ox',question:`確認：${statement}`,choices:['○','×'],answer:0,explanation:statement,source},
  {id:`final-${category}-${index + 1}-c`,category,type:'choice',question:`次の空欄に入る最も適切な語句を選びなさい。\n${statement.replace(answer, '（　　　）')}`,choices:[answer,'GDP','為替レート','配当金'],answer:0,explanation:statement,source},
  {id:`final-${category}-${index + 1}-d`,category,type:'choice',question:`資料内容の確認です。次の記述に最も関係する語句はどれ？\n${statement}`,choices:[answer,'景気動向指数','株主総会','投資信託'],answer:0,explanation:statement,source}
]));
QUESTIONS.push(...FINAL_REVIEW_QUESTIONS.slice(0, 97));
