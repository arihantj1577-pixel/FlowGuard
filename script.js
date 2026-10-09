const initialEvents = [
  {id:"EVT-1048",record:"REC-2048",signal:"Unusual field modification",severity:"High",risk:94,time:"14:32:08",color:"high"},
  {id:"EVT-1047",record:"REC-2046",signal:"Permission change anomaly",severity:"High",risk:89,time:"14:31:41",color:"high"},
  {id:"EVT-1046",record:"REC-2042",signal:"Repeated rapid updates",severity:"Medium",risk:71,time:"14:30:57",color:"medium"},
  {id:"EVT-1045",record:"REC-2039",signal:"Unrecognized access pattern",severity:"High",risk:86,time:"14:30:14",color:"high"},
  {id:"EVT-1044",record:"REC-2037",signal:"Record changed outside baseline",severity:"Medium",risk:65,time:"14:29:48",color:"medium"},
  {id:"EVT-1043",record:"REC-2034",signal:"New source for update",severity:"Low",risk:38,time:"14:28:59",color:"low"},
  {id:"EVT-1042",record:"REC-2031",signal:"Multiple failed validations",severity:"Medium",risk:62,time:"14:28:20",color:"medium"},
  {id:"EVT-1041",record:"REC-2028",signal:"Expected scheduled update",severity:"Low",risk:18,time:"14:27:52",color:"low"}
];
let events = [...initialEvents];
let eventNumber = 1049;
let recordNumber = 2049;
const $ = (id) => document.getElementById(id);

function renderEvents() {
  const filter = $("severityFilter").value;
  const filtered = events.filter(event => filter === "all" || event.severity === filter);
  $("eventsTable").innerHTML = filtered.map(event => `
    <tr>
      <td><span class="event-type"><i class="event-dot ${event.color}"></i><span class="event-id">${event.id}</span></span></td>
      <td>${event.record}</td>
      <td>${event.signal}</td>
      <td><span class="severity ${event.severity}">${event.severity}</span> <span class="risk-number">${event.risk}</span></td>
      <td>${event.time}</td>
    </tr>`).join("");
  const high = events.filter(e => e.severity === "High").length;
  const medium = events.filter(e => e.severity === "Medium").length;
  const low = events.filter(e => e.severity === "Low").length;
  $("suspiciousCount").textContent = String(events.length).padStart(2, "0");
  $("highRiskCount").textContent = String(high).padStart(2, "0");
  $("legendHigh").textContent = high;
  $("legendMedium").textContent = medium;
  $("legendLow").textContent = low;
  $("eventCountLabel").textContent = `${filtered.length} event${filtered.length === 1 ? "" : "s"} shown`;
  $("reportHeadline").textContent = `${high} high-risk signal${high === 1 ? "" : "s"} detected`;
  $("reportText").textContent = high
    ? "Review unusual permission changes and repeated updates before taking action."
    : "No high-risk signals in the current demo list. Continue monitoring for unusual changes.";
  const total = high + medium + low || 1;
  const highEnd = high / total * 100;
  const mediumEnd = (high + medium) / total * 100;
  document.querySelector(".donut").style.background =
    `conic-gradient(var(--red) 0 ${highEnd}%, var(--orange) ${highEnd}% ${mediumEnd}%, var(--green) ${mediumEnd}% 100%)`;
  document.querySelector(".donut strong").textContent = String(events.length).padStart(2, "0");
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function nowTime() {
  return new Date().toLocaleTimeString("en-GB", {hour12:false});
}

$("simulateBtn").addEventListener("click", () => {
  const examples = [
    {signal:"Unusual field modification",severity:"High",risk:92,color:"high"},
    {signal:"Repeated rapid updates",severity:"Medium",risk:68,color:"medium"},
    {signal:"New source for update",severity:"Low",risk:32,color:"low"},
    {signal:"Permission change anomaly",severity:"High",risk:87,color:"high"},
    {signal:"Record changed outside baseline",severity:"Medium",risk:63,color:"medium"}
  ];
  const sample = examples[Math.floor(Math.random() * examples.length)];
  const record = `REC-${recordNumber++}`;
  events.unshift({...sample,id:`EVT-${eventNumber++}`,record,time:nowTime()});
  events = events.slice(0, 12);
  $("eventsProcessed").textContent = (12480 + eventNumber - 1049).toLocaleString("en-US");
  const manifest = document.createElement("div");
  manifest.className = "manifest-row";
  const statusClass = sample.severity === "High" ? "flagged" : sample.severity === "Medium" ? "changed" : "checked";
  const statusIcon = sample.severity === "High" ? "!" : sample.severity === "Medium" ? "↻" : "✓";
  manifest.innerHTML = `<span class="manifest-status ${statusClass}">${statusIcon}</span><div><b>Record update · ${record}</b><small>${sample.signal}</small></div><time>${nowTime()}</time>`;
  $("manifestList").prepend(manifest);
  while ($("manifestList").children.length > 4) $("manifestList").lastElementChild.remove();
  renderEvents();
  showToast(`Demo event added: ${sample.severity.toLowerCase()} risk signal.`);
});

$("severityFilter").addEventListener("change", renderEvents);
$("clearBtn").addEventListener("click", () => {
  events = [];
  renderEvents();
  showToast("The visible demo event list has been cleared.");
});
$("downloadReport").addEventListener("click", () => {
  const high = events.filter(e => e.severity === "High").length;
  const medium = events.filter(e => e.severity === "Medium").length;
  const low = events.filter(e => e.severity === "Low").length;
  const lines = [
    "FLOWGUARD — SUSPICIOUS ACTIVITY REPORT",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "IMPORTANT: This is a demo report from a front-end prototype. Values are illustrative and are not evidence of a real attack.",
    "",
    `Events currently listed: ${events.length}`,
    `High-risk signals: ${high}`,
    `Medium-risk signals: ${medium}`,
    `Low-risk signals: ${low}`,
    "",
    "Events:",
    ...events.map(e => `${e.time} | ${e.id} | ${e.record} | ${e.severity} | Risk ${e.risk}/100 | ${e.signal}`),
    "",
    "Suggested next step: validate the signal against trusted audit logs and investigate before taking action."
  ];
  const blob = new Blob([lines.join("\n")], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "flowguard-demo-report.txt";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Demo report downloaded.");
});

renderEvents();
