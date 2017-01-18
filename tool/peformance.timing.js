  let domInteractiveTime = performance.timing.domInteractive - performance.timing.navigationStart;
  let domCompleteTime = performance.timing.domComplete - performance.timing.navigationStart;
  _hmt.push(['_trackEvent', '性能记录', '页面可见用时', domInteractiveTime]);
  _hmt.push(['_trackEvent', '性能记录', '页面加载完用时', domCompleteTime]);