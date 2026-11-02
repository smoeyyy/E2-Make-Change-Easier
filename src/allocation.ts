export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;

interface ShiftReport {
  assignedProducers: number;
  production: number;
  consumption: number;
  balance: number;
}

function calculateShiftReport(producerCount: number): ShiftReport {
  const production = producerCount * 3;
  const consumption = 6;
  const balance = production - consumption;
  return {
    assignedProducers: producerCount,
    production: production,
    consumption: consumption,
    balance: balance,
  };
}

let assignedProducers = 2;

function displayUI() {
  const shiftReport = calculateShiftReport(assignedProducers);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < shiftReport.assignedProducers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < shiftReport.assignedProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${shiftReport.assignedProducers} / 6`, 18, 76);
  ctx.fillText(`Production: ${shiftReport.production}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, shiftReport.production * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${shiftReport.consumption}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, shiftReport.consumption * 14, 20);
  readout.textContent =
    `Assigned: ${shiftReport.assignedProducers}/6 · Production: ${shiftReport.production} · Consumption: ${shiftReport.consumption} · Balance: ${
      shiftReport.balance > 0 ? "+" : ""
    }${shiftReport.balance}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  assignedProducers = Math.max(0, assignedProducers - 1);
  displayUI();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  assignedProducers = Math.min(6, assignedProducers + 1);
  displayUI();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    assignedProducers = 2;
    displayUI();
  };
displayUI();
