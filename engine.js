/* 規則是決策輔助，不是錄取預測；資源皆由使用者自行估計。 */
function decide(p) {
  const reasons=[], missing=[], next=[];
  let title;
  if(p.goal==='unknown') missing.push('確認：如果已考上律師，是否仍願意念研究所？');
  if(p.fund==='unknown') missing.push('確認目前資金或收入能否支撐預計準備期間。');
  if(p.goal==='yes' && p.fund==='yes' && p.fit==='yes') {
    title='優先評估報考研究所'; reasons.push('你有獨立於律師考試的進修目的。','你確認可負擔準備與就學，且已了解目標組別。');
    next.push('選定校系後核對當年度簡章、考科與畢業要求，再決定投入程度。');
  } else if(p.goal==='no' && p.fund==='yes') {
    title='優先準備律師考試'; reasons.push('你目前沒有即使考上律師也想念研究所的理由。','你自行確認資源足以支撐預計準備期間。');
    next.push('訂定每週讀書與申論練習計畫，約定下次檢核日期。');
  } else if(p.fund==='no') {
    title='先安排收入，再規劃備考'; reasons.push('你表示目前資源不足以支撐全職準備或就學。');
    next.push('比較工作並準備律師、延後報考與可取得的支援；勿直接假設全職備考可行。');
  } else {
    title='先補齊關鍵條件，再決定'; reasons.push('目前的條件尚不足以支持單一路線。');
    next.push('先完成下列待確認事項，再回到此流程重新比較。');
  }
  if(p.goal==='yes' && p.fit!=='yes') missing.push('確認至少一個目標校系的研究方向、考科及就學負擔。');
  if(p.dual==='yes') next.push('你想同時準備兩項考試：請列出考科重疊與額外時數，確認總量是否可負擔。');
  if(p.hours!=='' && Number(p.hours)<10) next.push('每週可投入時間有限，先排出實際週計畫，再評估報考數量。');
  return {title,reasons,missing,next};
}
if(typeof module!=='undefined') module.exports={decide};

