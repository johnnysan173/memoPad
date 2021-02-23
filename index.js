// Canvas初期化
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const parent = document.getElementById("parent");
canvas.width = parent.offsetWidth - 4;
canvas.height = parent.offsetHeight - 4;
const rect = canvas.getBoundingClientRect();

// クリアボタン設定
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => clear());

function clear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ダウンロードボタン設定
const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", () => download());

function download() {
  const canvas = document.getElementById("draw");
  var base64 = canvas.toDataURL("image/jpeg");
  document.getElementById("download").href = base64;
}

// 設定初期化
clear();
let isDrawing = false;
let lastX = 0;
let lastY = 0;
ctx.lineWidth = 2;

// パソコンのMouseポイントで描く
function mouseDraw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", mouseDraw);
canvas.addEventListener("mouseup", () => (isDrawing = false));

// スマホのタッチで描く
function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  ctx.stroke();
  [lastX, lastY] = [
    e.touches[0].clientX - rect.left,
    e.touches[0].clientY - rect.top
  ];
}

canvas.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    isDrawing = true;
    [lastX, lastY] = [
      e.touches[0].clientX - rect.left,
      e.touches[0].clientY - rect.top
    ];
  },
  false
);
canvas.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    draw(e);
  },
  false
);
canvas.addEventListener("touchend", () => (isDrawing = false));
