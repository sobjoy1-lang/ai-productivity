(() => {
  document.body.classList.add("enhanced", "js-ready");
  const palette = { ink:"#111417", muted:"#657078", teal:"#4454f5", mint:"#d8ff51", coral:"#ff4e32", yellow:"#d8ff51", navy:"#111417", grid:"#d4d0c6", darkGrid:"rgba(216,255,81,.16)" };
  const charts = [];
  const number = new Intl.NumberFormat("zh-CN");
  const axis = (dark = false) => ({
    axisLine:{lineStyle:{color:dark?"rgba(191,233,220,.22)":palette.grid}},
    axisTick:{show:false},
    axisLabel:{color:dark?"#9bb3b4":palette.muted,fontSize:10},
    splitLine:{lineStyle:{color:dark?palette.darkGrid:"#edf1ef"}}
  });
  function draw(id, option) {
    const el = document.getElementById(id);
    if (!el) return null;
    if (typeof echarts === "undefined") { el.innerHTML = '<div class="chart-fallback">图表需要联网加载 ECharts</div>'; return null; }
    const chart = echarts.init(el); chart.setOption(option); charts.push(chart); return chart;
  }
  draw("aiScaleChart", {
    animationDuration:1000, grid:{top:28,right:20,bottom:28,left:42},
    tooltip:{trigger:"axis",backgroundColor:palette.navy,borderWidth:0,textStyle:{color:"#fff",fontSize:11},formatter:function(params){return params[0].axisValue+" 年<br><b>≈ "+number.format(params[0].value)+" 亿元</b>";}},
    xAxis:{...axis(),type:"category",boundaryGap:false,data:["2020","2021","2022","2023","2024"]},
    yAxis:{...axis(),type:"value",name:"亿元",nameTextStyle:{color:palette.muted,fontSize:10},min:0,max:7000,splitNumber:4},
    series:[{type:"line",smooth:true,symbol:"circle",symbolSize:8,data:[3031,4000,5080,5784,6000],lineStyle:{width:3,color:palette.teal},itemStyle:{color:"#fff",borderColor:palette.teal,borderWidth:3},areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(14,138,130,.28)"},{offset:1,color:"rgba(14,138,130,.02)"}])},markPoint:{symbol:"pin",symbolSize:36,label:{color:"#fff",fontSize:9},itemStyle:{color:palette.coral},data:[{coord:["2024",6000],value:"≈6000"}]}}]
  });
  draw("structureChart", {
    animationDuration:900,
    tooltip:{trigger:"item",backgroundColor:palette.navy,borderWidth:0,textStyle:{color:"#fff",fontSize:11},formatter:"{b}<br/><b>{c} 亿元</b>（{d}%）"},
    legend:{bottom:0,left:"center",itemWidth:9,itemHeight:9,itemGap:12,textStyle:{color:palette.muted,fontSize:10}},
    series:[{type:"pie",radius:["49%","74%"],center:["50%","45%"],avoidLabelOverlap:true,itemStyle:{borderColor:"#fff",borderWidth:3},label:{show:false},emphasis:{label:{show:true,color:palette.ink,fontSize:13,fontWeight:700,formatter:"{d}%"}},data:[
      {value:61928,name:"数字技术应用业",itemStyle:{color:palette.teal}},
      {value:48145,name:"数字产品制造业",itemStyle:{color:palette.coral}},
      {value:26519,name:"数字要素驱动业",itemStyle:{color:palette.yellow}},
      {value:4298,name:"数字产品服务业",itemStyle:{color:"#8ab4ad"}}
    ]}]
  });
  draw("adoptionChart", {
    animationDuration:900,grid:{top:32,right:14,bottom:28,left:42},
    tooltip:{trigger:"axis",backgroundColor:"#0b1d24",borderColor:"rgba(191,233,220,.2)",textStyle:{color:"#fff",fontSize:11},formatter:function(params){return params[0].axisValue+" 年<br/>组织使用 AI：<b>"+params[0].value+"%</b><br/>使用生成式 AI：<b>"+params[1].value+"%</b>";}},
    legend:{top:0,right:0,itemWidth:10,itemHeight:10,textStyle:{color:"#aeb7b4",fontSize:10}},
    xAxis:{...axis(true),type:"category",data:["2023","2024"]},
    yAxis:{...axis(true),type:"value",max:100,name:"%",nameTextStyle:{color:"#aeb7b4",fontSize:10},splitNumber:4},
    series:[{name:"组织使用 AI",type:"bar",barWidth:22,data:[55,78],itemStyle:{color:palette.teal,borderRadius:[4,4,0,0]}},{name:"组织使用生成式 AI",type:"bar",barWidth:22,data:[33,71],itemStyle:{color:palette.coral,borderRadius:[4,4,0,0]}}]
  });
  draw("regionalChart", {
    animationDuration:900,grid:{top:16,right:28,bottom:23,left:48},
    tooltip:{trigger:"axis",axisPointer:{type:"shadow"},backgroundColor:"#0b1d24",borderColor:"rgba(191,233,220,.2)",textStyle:{color:"#fff",fontSize:11},formatter:function(p){return p[0].name+"地区：<b>"+p[0].value+"%</b>";}},
    xAxis:{...axis(true),type:"value",max:8,name:"%",nameTextStyle:{color:"#aeb7b4",fontSize:10}},
    yAxis:{...axis(true),type:"category",inverse:true,data:["东部","中部","东北","西部"]},
    series:[{type:"bar",barWidth:16,data:[6.5,4.2,2.5,0.8],itemStyle:{color:function(params){return [palette.teal,"#4db2a7",palette.yellow,palette.coral][params.dataIndex];},borderRadius:[0,4,4,0]},label:{show:true,position:"right",color:palette.mint,fontSize:10,formatter:"{c}%"}}]
  });
  draw("robotChart", {
    animationDuration:900,grid:{top:25,right:45,bottom:25,left:70},
    tooltip:{trigger:"axis",axisPointer:{type:"shadow"},backgroundColor:palette.navy,borderWidth:0,textStyle:{color:"#fff",fontSize:11},formatter:function(p){return p[0].name+"：<b>"+number.format(p[0].value)+"</b> 台 / 万人";}},
    xAxis:{...axis(),type:"value",max:1350,name:"台 / 万人",nameTextStyle:{color:palette.muted,fontSize:10}},
    yAxis:{...axis(),type:"category",inverse:true,data:["韩国","新加坡","中国","德国","日本"]},
    series:[{type:"bar",barWidth:20,data:[1220,818,567,449,446],itemStyle:{color:function(params){return params.name==="中国"?palette.coral:palette.teal;},borderRadius:[0,5,5,0]},label:{show:true,position:"right",color:palette.ink,fontSize:10,formatter:"{c}"},markLine:{symbol:"none",lineStyle:{color:"#a9b7b3",type:"dashed"},label:{formatter:"全球平均 177",color:palette.muted,fontSize:9},data:[{xAxis:177}]}}]
  });
  const sectorData = {
    service:{label:"客服与服务",gain:0.14,desc:"以现场研究中的客服效率提升为参考"},
    manufacturing:{label:"制造与质检",gain:0.18,desc:"以视觉质检案例中的流程改善为参考"},
    logistics:{label:"物流与供应链",gain:0.16,desc:"以智能调度和供应链协同作为情景参考"},
    research:{label:"研发与设计",gain:0.22,desc:"以研发设计中的迭代提速作为情景参考"}
  };
  let simChart = null;
  function updateSimulation() {
    const sector = sectorData[document.getElementById("sectorSelect").value];
    const adoption = Number(document.getElementById("adoptionSlider").value);
    const gain = sector.gain * adoption / 100;
    document.getElementById("adoptionValue").textContent = adoption + "%";
    document.getElementById("simSectorLabel").textContent = sector.label;
    document.getElementById("simGain").textContent = "+" + (gain * 100).toFixed(1) + "%";
    document.getElementById("simDescription").textContent = sector.desc;
    if (typeof echarts === "undefined") return;
    if (!simChart) { simChart = echarts.init(document.getElementById("simulatorChart")); charts.push(simChart); }
    simChart.setOption({
      animationDuration:500,grid:{top:30,right:30,bottom:28,left:42},
      tooltip:{trigger:"axis",backgroundColor:palette.navy,borderWidth:0,textStyle:{color:"#fff",fontSize:11},formatter:function(p){return p[0].name+"<br/><b>"+p[0].value.toFixed(1)+"</b>";}},
      xAxis:{...axis(),type:"category",data:["当前流程","AI 协同后"]},
      yAxis:{...axis(),type:"value",min:90,max:125,name:"指数",nameTextStyle:{color:palette.muted,fontSize:10}},
      series:[{type:"bar",barWidth:50,data:[100,100+gain*100],itemStyle:{color:function(params){return params.dataIndex===1?palette.teal:"#cdd9d5";},borderRadius:[6,6,0,0]},label:{show:true,position:"top",color:palette.ink,fontSize:11,formatter:function(p){return p.value.toFixed(1);}}}]
    });
  }
  if (typeof echarts !== "undefined") updateSimulation();
  document.getElementById("sectorSelect").addEventListener("change",updateSimulation);
  document.getElementById("adoptionSlider").addEventListener("input",updateSimulation);
  window.addEventListener("resize",() => charts.forEach(chart => chart && chart.resize()));
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) navLinks.forEach(link => link.classList.toggle("is-active",link.getAttribute("href")==="#"+entry.target.id)); }),{rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section => observer.observe(section));

  // Reveal each chapter and keep the progress rail in sync with the narrative.
  const storySections = [...document.querySelectorAll(".reveal-section[data-section]")];
  const railLinks = [...document.querySelectorAll(".story-rail [data-rail]")];
  const railFill = document.querySelector(".rail-line i");
  const setStoryActive = id => railLinks.forEach(link => link.classList.toggle("is-active", link.dataset.rail === id));
  const storyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
    const active = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (active) setStoryActive(active.target.dataset.section);
  }, {rootMargin:"-16% 0px -58% 0px", threshold:[0,.18,.45,.75]});
  storySections.forEach(section => storyObserver.observe(section));
  const topSection = document.querySelector('[data-section="top"]');
  if (topSection) topSection.classList.add("is-visible");
  setStoryActive("top");

  let scrollTick = false;
  const updateRailProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0;
    if (railFill) railFill.style.height = (progress * 100) + "%";
    scrollTick = false;
  };
  window.addEventListener("scroll", () => {
    if (!scrollTick) { window.requestAnimationFrame(updateRailProgress); scrollTick = true; }
  }, {passive:true});
  updateRailProgress();

  // Blueprint flow layer: the moving marks represent evidence moving through the production chain.
  const canvas = document.getElementById("heroCanvas");
  const hero = document.querySelector(".hero");
  if (canvas && hero && canvas.getContext) {
    const ctx = canvas.getContext("2d", {alpha:true});
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const route = [{x:.09,y:.60},{x:.34,y:.33},{x:.61,y:.66},{x:.90,y:.42}];
    const evidence = [
      {label:"R&D", color:"#4454f5", size:3.5},
      {label:"USERS", color:"#ff4e32", size:3},
      {label:"ADOPTION", color:"#4454f5", size:4},
      {label:"OUTPUT", color:"#ff4e32", size:3.5}
    ];
    let width = 0, height = 0, dpr = 1, raf = 0, heroVisible = true;
    const pointOnRoute = progress => {
      const scaled = progress * (route.length - 1), index = Math.min(route.length - 2, Math.floor(scaled)), local = scaled - index;
      const a = route[index], b = route[index + 1], ease = local * local * (3 - 2 * local);
      return {x:(a.x + (b.x-a.x)*ease)*width, y:(a.y + (b.y-a.y)*ease)*height};
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2); canvas.width = Math.max(1, Math.floor(width*dpr)); canvas.height = Math.max(1, Math.floor(height*dpr));
      ctx.setTransform(dpr,0,0,dpr,0,0); render(0);
    };
    const render = time => {
      if (!width || !height) return;
      ctx.clearRect(0,0,width,height);
      const phase = reducedMotion ? .1 : time * .00008;
      for (let i=0; i<38; i++) {
        const speed = 1 + (i % 4) * .035, progress = (phase * speed + i/38) % 1, section = Math.min(evidence.length-1, Math.floor(progress*evidence.length)), item = evidence[section];
        for (let trail=5; trail>=0; trail--) {
          const trailProgress = (progress - trail*.009 + 1) % 1, trailPoint = pointOnRoute(trailProgress), alpha = Math.max(.08, .72 - trail*.11);
          ctx.beginPath(); ctx.arc(trailPoint.x,trailPoint.y,Math.max(1.6,item.size - trail*.35),0,Math.PI*2); ctx.fillStyle = item.color === "#ff4e32" ? `rgba(255,78,50,${alpha})` : `rgba(68,84,245,${alpha})`; ctx.fill();
        }
        if (i % 4 === 0) { const packet = pointOnRoute(progress); ctx.fillStyle = item.color; ctx.fillRect(packet.x-3.5,packet.y-3.5,7,7); }
      }
      route.forEach((point,index) => {
        const x=point.x*width, y=point.y*height, pulse = 13 + Math.sin(time*.003 + index)*3; ctx.strokeStyle = index===3 ? "rgba(255,78,50,.5)" : "rgba(68,84,245,.42)"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(x,y,pulse,0,Math.PI*2); ctx.stroke(); ctx.fillStyle = index===3 ? "rgba(255,78,50,.65)" : "rgba(68,84,245,.65)"; ctx.fillRect(x-3,y-3,6,6);
      });
    };
    const animate = time => { raf = 0; if (!heroVisible || reducedMotion) return; render(time); raf = window.requestAnimationFrame(animate); };
    const heroObserver = new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      if (heroVisible && !reducedMotion && !raf) raf = window.requestAnimationFrame(animate);
      if (!heroVisible && raf) { window.cancelAnimationFrame(raf); raf = 0; }
    }, {threshold:.08});
    heroObserver.observe(hero);
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas); resize();
    if (!reducedMotion) raf = window.requestAnimationFrame(animate);
  }

})();

