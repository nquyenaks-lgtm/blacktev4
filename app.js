// BlackTea POS v8 final - full logic with payment preview, discount, history filter and expandable history items
let selectedTable = null;
let isAddingMore = false;
const KEY_MENU = 'BT8_MENU';
const KEY_CATS = 'BT8_CATS';
const KEY_TABLES = 'BT8_TABLES';
const KEY_HISTORY = 'BT8_HISTORY';
const KEY_GUEST = 'BT8_GUEST_CNT';
const FIXED_TABLES = [
  "L1","L2","L3","L4",
  "NT1","NT2",
  "T1","G1","N1",
  "T2","G2","N2",
  "T3","G3","N3",
  "T4","G4","N4"
];

let MENU = JSON.parse(localStorage.getItem(KEY_MENU)) || [
  // --- Cà phê ---
  { id: 1, name: "Cà phê sữa nóng (Pha phin)", price: 15000, cat: "Cà phê" },
  { id: 2, name: "Cà phê sữa đá (Pha phin)", price: 15000, cat: "Cà phê" },
  { id: 3, name: "Cà phê đen nóng (Pha phin)", price: 15000, cat: "Cà phê" },
  { id: 4, name: "Cà phê đen đá (Pha phin)", price: 15000, cat: "Cà phê" },
  { id: 5, name: "Cà phê sữa nóng (Pha máy)", price: 15000, cat: "Cà phê" },
  { id: 6, name: "Cà phê sữa đá (Pha máy)", price: 15000, cat: "Cà phê" },
  { id: 7, name: "Cà phê đen nóng (Pha máy)", price: 15000, cat: "Cà phê" },
  { id: 8, name: "Cà phê đen đá (Pha máy)", price: 15000, cat: "Cà phê" },
  { id: 9, name: "Cà phê Sài Gòn", price: 18000, cat: "Cà phê" },
  { id: 10, name: "Bạc xỉu", price: 20000, cat: "Cà phê" },
  { id: 11, name: "Cà phê kem trứng", price: 20000, cat: "Cà phê" },
  { id: 12, name: "Cà phê cốt dừa", price: 20000, cat: "Cà phê" },
  { id: 13, name: "Cacao nóng", price: 20000, cat: "Cà phê" },
  { id: 14, name: "Cacao đá", price: 20000, cat: "Cà phê" },

  // --- Trà sữa (M/L) ---
  { id: 15, name: "Trà sữa truyền thống (Size L)", price: 20000, cat: "Trà sữa" },
  { id: 16, name: "Trà sữa khoai môn (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 17, name: "Trà sữa khoai môn (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 18, name: "Trà sữa socola (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 19, name: "Trà sữa socola (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 20, name: "Chân châu đường đen (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 21, name: "Chân châu đường đen (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 22, name: "Trà đào (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 23, name: "Trà đào (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 24, name: "Trà đào cam sả (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 25, name: "Trà đào cam sả (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 26, name: "Trà vải (Size M)", price: 15000, cat: "Trà sữa" },
  { id: 27, name: "Trà vải (Size L)", price: 20000, cat: "Trà sữa" },
  { id: 28, name: "Trà gừng (Size M)", price: 15000, cat: "Trà sữa" },
  { id: 29, name: "Trà gừng (Size L)", price: 20000, cat: "Trà sữa" },
  { id: 30, name: "Trà lipton ngũ sắc (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 31, name: "Trà lipton ngũ sắc (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 32, name: "Trà thảo mộc (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 33, name: "Trà thảo mộc (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 34, name: "Trà tắc sỉ muối", price: 15000, cat: "Trà sữa" },

  // --- Sinh tố ---
  { id: 35, name: "Sinh tố Dứa", price: 25000, cat: "Sinh tố" },
  { id: 36, name: "Sinh tố Dâu", price: 25000, cat: "Sinh tố" },
  { id: 37, name: "Sinh tố Nho", price: 25000, cat: "Sinh tố" },
  { id: 38, name: "Sinh tố Kiwi", price: 25000, cat: "Sinh tố" },
  { id: 39, name: "Sinh tố Việt quất", price: 25000, cat: "Sinh tố" },
  { id: 40, name: "Sinh tố Xoài", price: 25000, cat: "Sinh tố" },

  // --- Sữa chua ---
  { id: 41, name: "Sữa chua thuần khiết", price: 20000, cat: "Sữa chua" },
  { id: 42, name: "Sữa chua Việt quất", price: 25000, cat: "Sữa chua" },
  { id: 43, name: "Sữa chua Nho", price: 25000, cat: "Sữa chua" },
  { id: 44, name: "Sữa chua Dâu", price: 25000, cat: "Sữa chua" },
  { id: 45, name: "Sữa chua Kiwi", price: 25000, cat: "Sữa chua" },
  { id: 46, name: "Sữa chua Xoài", price: 25000, cat: "Sữa chua" },

  // --- Giải khát ---
  { id: 47, name: "Bò húc", price: 18000, cat: "Giải khát" },
  { id: 48, name: "Nước các loại", price: 15000, cat: "Giải khát" },
  { id: 49, name: "Soda gum", price: 25000, cat: "Giải khát" },
  { id: 50, name: "Cocktail", price: 15000, cat: "Giải khát" },
  { id: 51, name: "Chanh đá", price: 15000, cat: "Giải khát" },
  { id: 52, name: "Chanh muối", price: 15000, cat: "Giải khát" },

  // --- Trà & Nước ép ---
  { id: 53, name: "Trà gừng", price: 15000, cat: "Trà & Nước ép" },
  { id: 54, name: "Trà Lipton ngũ sắc", price: 20000, cat: "Trà & Nước ép" },
  { id: 55, name: "Trà thảo mộc", price: 25000, cat: "Trà & Nước ép" },
  { id: 56, name: "Trà đào (Size M)", price: 15000, cat: "Trà & Nước ép" },
  { id: 57, name: "Trà đào (Size L)", price: 20000, cat: "Trà & Nước ép" },
  { id: 58, name: "Rau má đậu xanh (Size M)", price: 15000, cat: "Trà & Nước ép" },
  { id: 59, name: "Rau má đậu xanh (Size L)", price: 20000, cat: "Trà & Nước ép" },
  { id: 60, name: "Đậu xanh cốt dừa (Size M)", price: 20000, cat: "Trà & Nước ép" },
  { id: 61, name: "Đậu xanh cốt dừa (Size L)", price: 25000, cat: "Trà & Nước ép" },
  { id: 62, name: "Nước ép cà rốt ", price: 25000, cat: "Trà & Nước ép" },
  { id: 63, name: "Nước ép cam", price: 25000, cat: "Trà & Nước ép" },
  { id: 64, name: "Nước ép táo", price: 25000, cat: "Trà & Nước ép" },
  { id: 65, name: "Nước ép cam + cà rốt ", price: 25000, cat: "Trà & Nước ép" },
  { id: 66, name: "Nước ép cam + dừa", price: 25000, cat: "Trà & Nước ép" },
  { id: 67, name: "Nước ép cà rốt + dừa", price: 25000, cat: "Trà & Nước ép" },
  // --- Matcha ---
  { id: 68, name: "Matcha sữa xoài ", price: 25000, cat: "Matcha" },
  { id: 69, name: "Matcha khoai môn", price: 25000, cat: "Matcha" },
  { id: 70, name: "Matcha sữa dừa", price: 25000, cat: "Matcha" },
  // --- Ăn vặt ---
  { id: 71, name: "Bánh tráng ruốc nhỏ ", price: 17000, cat: "Ăn vặt" },
  { id: 72, name: "Bánh tráng ruốc lớn", price: 30000, cat: "Ăn vặt" },
  { id: 73, name: "Bánh tráng chấm", price: 15000, cat: "Ăn vặt" },
  // --- Topping ---
  { id: 74, name: "Thêm topping", price: 5000, cat: "Topping" },
  { id: 75, name: "Kem cheese", price: 5000, cat: "Topping" },
  { id: 76, name: "Trứng nướng", price: 5000, cat: "Topping" },
  { id: 77, name: "Kem lăng", price: 5000, cat: "Topping" },
  { id: 78, name: "Kem lăng dừa", price: 15000, cat: "Topping" }
];

let CATEGORIES = JSON.parse(localStorage.getItem(KEY_CATS)) || ["Cà phê","Trà sữa","Sinh tố","Sữa chua","Giải khát","Trà & Nước ép","Matcha","Ăn vặt","Topping"];
let TABLES = JSON.parse(localStorage.getItem(KEY_TABLES)) || [];

// ✅ Migration: đảm bảo mỗi item trong cart có locked và baseQty
TABLES = TABLES.map(t => ({
  ...t,
  cart: (t.cart || []).map(it => ({
    ...it,
    locked: !!it.locked, 
    baseQty: (typeof it.baseQty === 'number') 
               ? it.baseQty 
               : (it.locked ? it.qty : 0)
  }))
}));
let HISTORY = JSON.parse(localStorage.getItem(KEY_HISTORY)) || [];
let GUEST_CNT = parseInt(localStorage.getItem(KEY_GUEST) || '0');

let currentTable = null;
let createdFromMain = false;
let activeCategory = 'Cà phê';

// helpers
function showCustomAlert(msg) {
  document.getElementById("customAlertMessage").innerText = msg;
  document.getElementById("customAlert").style.display = "block";
}

function closeCustomAlert() {
  document.getElementById("customAlert").style.display = "none";
}
function $(id){ return document.getElementById(id); }
function fmtV(n){ return n.toLocaleString('vi-VN'); }
// thời gian đầy đủ 2 số
function nowStr(d = new Date()){ 
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function isoDateKey(d){ 
  if (!(d instanceof Date)) d = new Date(d);
  const y = d.getFullYear(); 
  const m = String(d.getMonth()+1).padStart(2,'0'); 
  const day = String(d.getDate()).padStart(2,'0'); 
  return `${y}-${m}-${day}`;
}

// hiển thị dạng dd/mm/yyyy (có zero padding)
function displayDateFromISO(iso){ 
  const parts = iso.split('-'); 
  const day = parts[2].padStart(2,'0');
  const month = parts[1].padStart(2,'0');
  const year = parts[0];
  return `${day}/${month}/${year}`;
}
function saveAll(){ localStorage.setItem(KEY_MENU, JSON.stringify(MENU)); localStorage.setItem(KEY_CATS, JSON.stringify(CATEGORIES)); localStorage.setItem(KEY_TABLES, JSON.stringify(TABLES)); localStorage.setItem(KEY_HISTORY, JSON.stringify(HISTORY)); localStorage.setItem(KEY_GUEST, String(GUEST_CNT)); }

// render tables (sắp xếp: L = 4 cột, NT = 2 cột, T/G/N = mỗi bàn 1 hàng dọc, khác = Bàn tạm)
function renderTables(){
  const div = $('tables');
  div.innerHTML = '';

  // Chỉ lấy bàn có món
  const activeTables = TABLES.filter(t => t.cart && t.cart.length > 0);

  if (!activeTables.length) {
    div.innerHTML = '<div class="small">Chưa có bàn nào đang phục vụ</div>';
    return;
  }

  // Nhóm L (4 cột)
  const groupL = activeTables.filter(t => t.name.startsWith('L'))
    .sort((a,b)=>(b.createdAt || 0) - (a.createdAt || 0));
  if (groupL.length) {
    const row = document.createElement('div');
    row.className = 'table-section table-section-4';
    groupL.forEach(t=>row.appendChild(makeTableCard(t)));
    div.appendChild(row);
  }

  // Nhóm NT (2 cột)
  const groupNT = activeTables.filter(t => t.name.startsWith('NT'))
    .sort((a,b)=>(b.createdAt || 0) - (a.createdAt || 0));
  if (groupNT.length) {
    const row = document.createElement('div');
    row.className = 'table-section table-section-2';
    groupNT.forEach(t=>row.appendChild(makeTableCard(t)));
    div.appendChild(row);
  }

  // Nhóm T, G, N (mỗi bàn 1 hàng)
  ['T','G','N'].forEach(prefix=>{
    const g = activeTables.filter(t =>
      t.name.startsWith(prefix) && !(prefix==='N' && t.name.startsWith('NT'))
    ).sort((a,b)=>(b.createdAt || 0) - (a.createdAt || 0));
    g.forEach(t=>{
      const row = document.createElement('div');
      row.className = 'table-section table-section-1';
      row.appendChild(makeTableCard(t));
      div.appendChild(row);
    });
  });

  // Nhóm khác
  const others = activeTables.filter(t =>
    !t.name.startsWith('L') &&
    !t.name.startsWith('NT') &&
    !t.name.startsWith('T') &&
    !t.name.startsWith('G') &&
    !t.name.startsWith('N')
  ).sort((a,b)=>(b.createdAt || 0) - (a.createdAt || 0));
  if (others.length) {
    const row = document.createElement('div');
    row.className = 'table-section table-section-others';
    others.forEach(t=>row.appendChild(makeTableCard(t)));
    div.appendChild(row);
  }
}



function makeTableCard(t){
  const card = document.createElement('div');
  card.className = 'table-card';

  const info = document.createElement('div');
  info.className = 'table-info';

  // ===== dòng 1: tên bàn =====
  let displayName = t.name;
  if (t.name.startsWith('L'))       displayName = `Bàn trên lầu ${t.name}`;
  else if (t.name.startsWith('NT')) displayName = `Bàn ngoài trời ${t.name}`;
  else if (t.name.startsWith('T'))  displayName = `Bàn tường ${t.name}`;
  else if (t.name.startsWith('G'))  displayName = `Bàn giữa ${t.name}`;
  else if (t.name.startsWith('N'))  displayName = `Bàn nệm ${t.name}`;

  const name = document.createElement('div');
  name.className = 'table-name';
  name.innerText = displayName;
  info.appendChild(name);

  // ===== dòng 2: số món + tổng tiền + giờ =====
  if (t.cart && t.cart.length){
    let qty = 0, total = 0;
    t.cart.forEach(it => { qty += it.qty; total += it.qty * it.price; });

    const meta = document.createElement('div');
    meta.className = 'table-meta';

    let timeStr = '';
    if (t.createdAt) {
      const d = new Date(t.createdAt);
      const hh = String(d.getHours()).padStart(2,'0');
      const mm = String(d.getMinutes()).padStart(2,'0');
      timeStr = ` • ⏰ ${hh}:${mm}`;
    }

    meta.innerText = qty + ' món • ' + fmtV(total) + ' VND' + timeStr;
    info.appendChild(meta);
  }

  card.appendChild(info);

  // click chọn bàn
  card.onclick = () => {
    document.querySelectorAll('.table-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    openTableFromMain(t.id);
  };

  return card;
}
// add guest
function addGuest() {
  const today = new Date().toISOString().split('T')[0];
  let savedData = localStorage.getItem('LAST_TAKEAWAY_INFO');
  let lastInfo = savedData ? JSON.parse(savedData) : { date: today, num: 0 };

  if (lastInfo.date !== today) {
    lastInfo = { date: today, num: 0 };
  }

  // Xóa bàn trống
  const emptyGuests = TABLES.filter(
    t => t.name.startsWith('Khách mang đi') && (!t.cart || t.cart.length === 0)
  );
  if (emptyGuests.length > 0) {
    TABLES = TABLES.filter(t => !emptyGuests.includes(t));
    saveAll();
  }

  // Tìm số tiếp theo
  const takeawayTables = TABLES.filter(t => t.name.startsWith('Khách mang đi'));
  const maxNum = takeawayTables.reduce((max, t) => {
    const m = t.name.match(/\d+/);
    return m ? Math.max(max, parseInt(m[0])) : max;
  }, 0);

  const nextNum = Math.max(maxNum, lastInfo.num) + 1;

  const id = Date.now();
  const name = 'Khách mang đi ' + nextNum;

  const tableObj = { id, name, cart: [], createdAt: Date.now() };
  TABLES.push(tableObj);
  saveAll();
  renderTables();

  currentTable = tableObj;
  openTable(currentTable.id);
  addMore(); // mở luôn menu order
}

function addGuestVisit(){
  GUEST_CNT += 1;
  const name = 'Khách ghé quán ' + GUEST_CNT;
  const id = Date.now();
  TABLES.push({ id, name, cart: [], createdAt: Date.now() }); // thêm createdAt
  saveAll();
  createdFromMain = true;
  openTable(id);
}

// add named table
function addNamed(){
  const name = $('new-table-name').value.trim();
  if(!name){ return; }
  const id = Date.now();
  TABLES.push({ id, name, cart: [], createdAt: Date.now() });
  $('new-table-name').value = '';
  saveAll();
  createdFromMain = true;
  openTable(id);
}

// open from main
function openTableFromMain(id){ createdFromMain = false; openTable(id); }

// Tên bàn mang đi
function getTableFullName(id){
  if (!id) return '';
  if (id.startsWith('L')) return 'Bàn trên lầu ' + id;
  if (id.startsWith('NT')) return 'Bàn ngoài trời ' + id;
  if (id.startsWith('T')) return 'Bàn tường ' + id;
  if (id.startsWith('G')) return 'Bàn giữa ' + id;
  if (id.startsWith('N')) return 'Bàn nệm ' + id;
  return id;
}

function openTable(id){
  // tìm xem bàn đã lưu trong TABLES chưa
  const savedIdx = TABLES.findIndex(t => t.id === id);

  if (savedIdx >= 0){
    // dùng object đã lưu (thao tác trực tiếp trên object trong TABLES)
    currentTable = TABLES[savedIdx];
    currentTable._isDraft = false;
  } else {
    // tạo bản nháp (chưa push vào TABLES)
    currentTable = {
      id: id,
      name: getTableFullName(id) || id,
      cart: [],
      createdAt: Date.now(),
      _isDraft: true
    };
  }

  // hiển thị màn menu
  $('table-screen').style.display = 'none';
  $('menu-screen').style.display = 'block';
  $('settings-screen').style.display = 'none';
  $('menu-settings-screen').style.display = 'none';
  $('printer-settings-screen').style.display = 'none';
  $('history-screen').style.display = 'none';
  $('payment-screen').style.display = 'none';

  // Nếu muốn hiển thị tên ở phần giao diện chi tiết (nếu có)
  if ($('table-title')) $('table-title').innerText = "";

  // hiển thị nút X / ẩn header buttons (theo yêu cầu)
  if ($('header-buttons')) $('header-buttons').style.display = 'none';
  if ($('order-info')) $('order-info').classList.remove('hidden');
  if ($('orderTitle')) $('orderTitle').innerText = getTableFullName(currentTable.name || '');
  if ($('backBtn')) $('backBtn').classList.remove('hidden');

  // render danh mục, menu, giỏ hàng
  renderCategories && renderCategories();
  renderMenuList && renderMenuList();
  renderCart && renderCart();

  // hiển thị primary actions (thêm món) / table actions theo flag createdFromMain nếu bạn dùng
  if (createdFromMain) {
    if ($('primary-actions')) $('primary-actions').style.display = 'flex';
    if ($('table-actions')) $('table-actions').style.display = 'none';
    if ($('menu-list')) $('menu-list').style.display = 'block';
    if (isAddingMore) {
      if ($('cancel-order-btn')) $('cancel-order-btn').style.display = 'none';
    } else {
      if ($('cancel-order-btn')) $('cancel-order-btn').style.display = 'inline-block';
    }
  } else {
    if ($('primary-actions')) $('primary-actions').style.display = 'none';
    if ($('table-actions')) $('table-actions').style.display = 'flex';
    if ($('menu-list')) $('menu-list').style.display = 'none';
  }
}
// back
function backToTables() {
  // 🧠 --- Thêm logic xử lý bàn "Khách mang đi" ---
  const today = new Date().toISOString().split('T')[0];
  let savedData = localStorage.getItem('LAST_TAKEAWAY_INFO');
  let lastInfo = savedData ? JSON.parse(savedData) : { date: today, num: 0 };

  if (lastInfo.date !== today) {
    lastInfo = { date: today, num: 0 };
  }

  if (currentTable && currentTable.name.startsWith('Khách mang đi')) {
    // Nếu bàn trống (chưa order gì) → xoá bàn, không lưu số
    if (!currentTable.cart || currentTable.cart.length === 0) {
      TABLES = TABLES.filter(t => t.id !== currentTable.id);
      saveAll();
    } 
    // Nếu bàn có món (tức đã order hoặc thanh toán xong) → cập nhật số bàn mới nhất
    else {
      const m = currentTable.name.match(/\d+/);
      const currentNum = m ? parseInt(m[0]) : 0;
      if (currentNum > lastInfo.num) {
        lastInfo = { date: today, num: currentNum };
        localStorage.setItem('LAST_TAKEAWAY_INFO', JSON.stringify(lastInfo));
      }
    }
  }

  // 👇 --- Phần UI bạn đang có (giữ nguyên hoàn toàn) ---
  $('table-screen').style.display = 'block';
  $('menu-screen').style.display = 'none';
  $('settings-screen').style.display = 'none';
  $('menu-settings-screen').style.display = 'none';
  $('printer-settings-screen').style.display = 'none';
  $('history-screen').style.display = 'none';
  $('payment-screen').style.display = 'none';

  // 👉 trả header về mặc định
  $('header-buttons').style.display = 'flex';  
  $('order-info').classList.add('hidden');
}

function goBack(){
  if (!currentTable) {
    hideOrderInfo();
    backToTables();
    return;
  }

  const idx = TABLES.findIndex(t => t.id === currentTable.id);

  // 🧠 Nếu bàn mới hoặc chưa lưu -> xoá luôn
  if (idx === -1 || currentTable._isDraft || !currentTable.cart || currentTable.cart.length === 0) {
    if (idx >= 0) TABLES.splice(idx, 1);
    currentTable = null;
    saveAll();
    hideOrderInfo();
    renderTables();
    backToTables();
    return;
  }

  const saved = TABLES[idx];

  // 🧠 Nếu đang ở chế độ thêm món (có bản sao cũ) -> khôi phục lại giỏ cũ
  if (currentTable._oldCart) {
    saved.cart = JSON.parse(JSON.stringify(currentTable._oldCart));
    delete currentTable._oldCart;
  }

  // ✅ Không hỏi gì hết, chỉ quay về và lưu trạng thái
  saveAll();
  renderTables();
  hideOrderInfo();
  backToTables();
}
// categories
function renderCategories(){
  const bar = $('category-bar'); bar.innerHTML = '';
  CATEGORIES.forEach(cat=>{
    const b = document.createElement('button'); b.className='category-btn' + (cat===activeCategory ? ' active' : '');
    b.innerText = cat;
    b.onclick = ()=>{ activeCategory = cat; renderMenuList(); renderCategories(); };
    bar.appendChild(b);
  });
}

// menu list
function renderMenuList(){
  const list = $('menu-list'); list.innerHTML = '';
  const items = MENU.filter(m=> activeCategory==='Tất cả' ? true : m.cat===activeCategory);
  items.forEach(item=>{
    const row = document.createElement('div'); row.className='menu-row';
    const left = document.createElement('div'); left.className='menu-left';
    left.innerHTML = '<div class="menu-name">'+item.name+'</div><div class="menu-price">'+fmtV(item.price)+' VND</div>';
    const controls = document.createElement('div'); controls.className='qty-controls';
    const minus = document.createElement('button'); minus.className='btn btn-secondary'; minus.innerText='-'; minus.onclick=(e)=>{ e.stopPropagation(); changeQty(item.id,-1); };
    const qty = document.createElement('span'); qty.id='qty-'+item.id; qty.innerText = getQty(item.id);
    const plus = document.createElement('button'); plus.className='btn btn-secondary'; plus.innerText='+'; plus.onclick=(e)=>{ e.stopPropagation(); changeQty(item.id,1); };
    controls.appendChild(minus); controls.appendChild(qty); controls.appendChild(plus);
    row.appendChild(left); row.appendChild(controls);
    list.appendChild(row);
  });
}

function getQty(id){ if(!currentTable) return 0; const it = currentTable.cart.find(c=>c.id===id); return it ? it.qty : 0; }

function changeQty(id, delta){ 
  if(!currentTable) return; 
  const item = MENU.find(m=>m.id===id); 
  if(!item) return; 
  let it = currentTable.cart.find(c=>c.id===id); 

  if(it){ 
    if(it.locked){ 
      // ✅ Nếu là món đã order, không cho giảm thấp hơn baseQty
      if(delta < 0 && it.qty <= (it.baseQty ?? 0)) return;  
    }

    it.qty += delta; 

    // ✅ Chỉ xoá nếu là món mới và qty <= 0
    if(!it.locked && it.qty <= 0) {
      currentTable.cart = currentTable.cart.filter(c=>c.id!==id); 
    }
  } else if(delta > 0){ 
    // ✅ Món mới thêm
    currentTable.cart.push({ 
      id: item.id, 
      name: item.name, 
      price: item.price, 
      qty: 1, 
      locked: false,
      baseQty: 0 
    }); 
  } 

  renderMenuList(); 
  renderCart(); 
}


// cart
function renderCart(){ const ul = $('cart-list'); ul.innerHTML = ''; if(!currentTable || !currentTable.cart.length){ ul.innerHTML = '<div class="small">Chưa có món</div>'; $('total').innerText='0'; return; } let total=0; currentTable.cart.forEach(it=>{ total += it.price*it.qty; const li=document.createElement('li'); li.innerHTML = '<div><div style="font-weight:700">'+it.name+'</div><div class="small">'+fmtV(it.price)+' x '+it.qty+'</div></div><div style="font-weight:700">'+fmtV(it.price*it.qty)+'</div>'; ul.appendChild(li); }); $('total').innerText = fmtV(total); }

// primary actions (new table)
function cancelOrder(){ if(!currentTable) return; currentTable.cart=[]; renderMenuList(); renderCart(); }

function saveOrder() {
  if (!currentTable) return;
  if (!currentTable.cart || currentTable.cart.length === 0) {
    // không lưu nếu không có món
    return;
  }

  // Đánh dấu món đã được lock / lưu baseQty nếu chưa có
  currentTable.cart = currentTable.cart.map(it => ({
    ...it,
    locked: true,
    baseQty: (typeof it.baseQty === 'number' && it.baseQty > 0) ? it.baseQty : it.qty
  }));

  const idx = TABLES.findIndex(t => t.id === currentTable.id);
  if (idx >= 0) {
    // cập nhật bàn đã lưu
    TABLES[idx] = { ...currentTable, _isDraft: false };
  } else {
    // thêm bàn mới (từ draft -> lưu)
    TABLES.push({ ...currentTable, _isDraft: false });
  }

  saveAll && saveAll();   // hàm lưu localStorage (giữ nguyên)
  renderTables && renderTables();

  // ẩn order-info + hiện lại header buttons + ẩn X
  hideOrderInfo();

  // về màn hình chính
  backToTables && backToTables();
}



// table actions
function addMore(){ 
  if(!currentTable) return; 

  // 👉 Lưu bản sao giỏ hàng cũ (giữ locked & baseQty)
  currentTable._oldCart = currentTable.cart.map(it => ({ ...it }));

  $('menu-list').style.display='block'; 
  createdFromMain = true; 
  $('primary-actions').style.display='flex'; 
  $('table-actions').style.display='none'; 

  const cancelBtn = $('cancel-order-btn');
  if (cancelBtn) cancelBtn.style.display = 'none';

  renderMenuList(); 
}
function payTable(){ if(!currentTable) return; if(!currentTable.cart.length){ return; } // open payment screen with bill preview
  $('menu-screen').style.display='none'; $('payment-screen').style.display='block';
  $('pay-table-name').innerText = currentTable.name;
  renderPaymentPreview();
}

// payment preview with discount input
function renderPaymentPreview(){
  const container = $('pay-bill'); container.innerHTML = '';
  if(!currentTable) return;
  let total = 0;
  const table = document.createElement('table'); table.className='payment-table';
  const thead = document.createElement('tr');
  thead.innerHTML = '<th>Tên</th><th style="text-align:right">SL</th><th style="text-align:right">Thành</th>';
  table.appendChild(thead);
  currentTable.cart.forEach(it=>{
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>'+it.name+'</td><td style="text-align:right">'+it.qty+'</td><td style="text-align:right">'+fmtV(it.price*it.qty)+'</td>';
    table.appendChild(tr);
    total += it.price*it.qty;
  });
  container.appendChild(table);
  // show subtotal and set final total
  const sub = document.createElement('div'); sub.style.marginTop='8px'; sub.innerText = 'Tạm tính: ' + fmtV(total) + ' VND';
  container.appendChild(sub);
  $('discount-input').value = '0';
  updateFinalTotal();
}

// compute final total based on discount input
function updateFinalTotal(){
  if(!currentTable) return;
  const subtotal = currentTable.cart.reduce((s,i)=> s + i.price*i.qty, 0);
  const raw = $('discount-input').value.trim();
  let discount = 0;
  if(!raw) discount = 0;
  else if(raw.endsWith('%')){ const pct = parseFloat(raw.slice(0,-1)); if(!isNaN(pct)) discount = subtotal * (pct/100); }
  else { const v = parseFloat(raw.replace(/[^0-9.-]/g,'')); if(!isNaN(v)) discount = v; }
  const final = Math.max(0, Math.round(subtotal - discount));
  $('pay-final-total').innerText = fmtV(final);
  return { subtotal, discount, final };
}

// close payment (back to table screen)
function closePayment(){ $('payment-screen').style.display='none'; $('menu-screen').style.display='block'; renderCart(); renderMenuList(); }

// Xuất bill tính tiền
// ===================== HÀM XUẤT HÓA ĐƠN =====================
// helper: hiện modal đơn giản (mở DOM tạm)
function showSimpleModal(message, okText='OK', onOk){
  // nếu đã có modal thì xóa
  const existing = document.getElementById('bt-simple-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'bt-simple-modal';
  overlay.style = 'position:fixed;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);z-index:9999;';
  const box = document.createElement('div');
  box.style = 'background:#fff;padding:22px;border-radius:10px;max-width:92%;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,0.2);';
  const p = document.createElement('div');
  p.style = 'margin-bottom:18px;color:#222;font-size:16px;';
  p.innerText = message;
  const okBtn = document.createElement('button');
  okBtn.innerText = okText;
  okBtn.style = 'background:#2f80ed;color:#fff;padding:8px 18px;border-radius:8px;border:0;cursor:pointer;font-weight:600;';
  okBtn.onclick = () => {
    overlay.remove();
    if (typeof onOk === 'function') onOk();
  };
  box.appendChild(p);
  box.appendChild(okBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// ===== THANH TOÁN / XUẤT HÓA ĐƠN =====
function confirmPayment() {
  if (!currentTable || !currentTable.cart || currentTable.cart.length === 0) return;

  const { subtotal, discount, final } = updateFinalTotal(); // dùng chung parser

  HISTORY.push({
    id: Date.now(),
    table: currentTable.name,
    items: JSON.parse(JSON.stringify(currentTable.cart)),
    subtotal,
    discount: Math.round(discount),
    total: final,
    time: new Date().toLocaleString(),
    iso: isoDateKey(new Date())
  });

  localStorage.setItem(KEY_HISTORY, JSON.stringify(HISTORY));

  currentTable.cart = [];
  saveAll();
  renderTables();
  hideOrderInfo();
  backToTables();
  showPopup("Xuất đơn hàng thành công");
}
function hideOrderInfo(){
  if ($('header-buttons')) $('header-buttons').style.display = 'flex';
  if ($('order-info')) $('order-info').classList.add('hidden');
  if ($('orderTitle')) $('orderTitle').innerText = '';
  if ($('backBtn')) $('backBtn').classList.add('hidden');
}
// print final bill
function printFinalBill(rec){
  const win = window.open("", "In hoá đơn", "width=400,height=600");
  if (!win) {
    alert("Trình duyệt đang chặn cửa sổ in. Hãy bật cho phép popup.");
    return;
  }

  let html = `
    <html><head><title>Hoá đơn</title></head><body>
    <h3 style="text-align:center">HOÁ ĐƠN</h3>
    <p><b>Bàn/Khách:</b> ${rec.table}</p>
    <p><b>Thời gian:</b> ${rec.time}</p>
    <hr>
  `;
  rec.items.forEach(it=>{
    html += `<div>${it.qty} x ${it.name} - ${formatCurrency(it.price * it.qty)}</div>`;
  });
  html += `
    <hr>
    <p><b>Tạm tính:</b> ${formatCurrency(rec.subtotal)}</p>
    <p><b>Giảm giá:</b> ${rec.discount > 0 ? rec.discount : 0}</p>
    <p><b>Tổng cộng:</b> ${formatCurrency(rec.total)}</p>
    <hr>
    <p style="text-align:center">Cám ơn quý khách!</p>
    </body></html>
  `;

  win.document.write(html);
  win.document.close();

  // chờ 500ms để trình duyệt render rồi in
  setTimeout(() => {
    win.print();
    win.close();
  }, 500);
}

// Settings screens
function openSettings(){ $('table-screen').style.display='none'; $('menu-screen').style.display='none'; $('history-screen').style.display='none'; $('settings-screen').style.display='block'; }
function openMenuSettings(){ $('settings-screen').style.display='none'; $('menu-settings-screen').style.display='block'; renderCategoriesList(); renderMenuSettings(); populateCatSelect(); }
function openPrinterSettings(){ $('settings-screen').style.display='none'; $('printer-settings-screen').style.display='block'; populatePrinterSettings(); }

// menu settings
function renderCategoriesList(){ const ul=$('categories-list'); ul.innerHTML=''; CATEGORIES.forEach((c,i)=>{ const li=document.createElement('li'); li.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><div>'+c+'</div>' + (i>0? '<div><button class="btn btn-secondary" onclick="deleteCategory('+i+')">Xóa</button></div>':'') + '</div>'; ul.appendChild(li); }); }
function addCategory(){ const name = $('new-cat-name').value.trim(); if(!name) return; if(CATEGORIES.includes(name)){ return; } CATEGORIES.push(name); $('new-cat-name').value=''; saveAll(); renderCategoriesList(); renderCategories(); populateCatSelect(); }
function deleteCategory(i){ const cat=CATEGORIES[i]; MENU = MENU.map(m=> m.cat===cat? {...m,cat:'Tất cả'}:m); CATEGORIES.splice(i,1); saveAll(); renderCategoriesList(); renderMenuSettings(); renderMenuList(); renderCategories(); populateCatSelect(); }
function populateCatSelect(){ const sel=$('cat-select'); sel.innerHTML=''; CATEGORIES.forEach(c=>{ const o=document.createElement('option'); o.value=c; o.innerText=c; sel.appendChild(o); }); if(!CATEGORIES.includes(activeCategory)) activeCategory='Tất cả'; }
function renderMenuSettings(){ const ul=$('menu-settings-list'); ul.innerHTML=''; MENU.forEach((m,i)=>{ const li=document.createElement('li'); li.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><div><b>'+m.name+'</b><div class="small">'+m.cat+' • '+fmtV(m.price)+'</div></div><div><button class="btn btn-secondary" onclick="deleteMenu('+i+')">Xóa</button></div></div>'; ul.appendChild(li); }); }
function addMenuItem(){ const name=$('new-item-name').value.trim(); const price=parseInt($('new-item-price').value); const cat=$('cat-select').value||'Tất cả'; if(!name||!price){ return; } MENU.push({ id: Date.now(), name, price, cat }); $('new-item-name').value=''; $('new-item-price').value=''; saveAll(); renderMenuSettings(); renderMenuList(); }
function deleteMenu(i){ MENU.splice(i,1); saveAll(); renderMenuSettings(); renderMenuList(); }
function populatePrinterSettings(){ if($('paper-size')) $('paper-size').value = localStorage.getItem('BT8_PAPER') || '58'; if($('print-name')) $('print-name').checked = (localStorage.getItem('BT8_PRINTNAME')||'true')==='true'; }

// history with filter and expandable items
function openHistory(){ $('table-screen').style.display='none'; $('menu-screen').style.display='none'; $('settings-screen').style.display='none'; $('menu-settings-screen').style.display='none'; $('printer-settings-screen').style.display='none'; $('payment-screen').style.display='none'; $('history-screen').style.display='block'; renderHistory(); }
function clearDateFilter(){ if($('history-date')){ $('history-date').value=''; renderHistory(); } }

function renderHistory(){
  const container = $('history-container'); container.innerHTML = '';
  if(!HISTORY.length){ container.innerHTML = '<div class="small">Chưa có lịch sử</div>'; return; }
  const grouped = {};
  HISTORY.forEach(h=>{
    const key = h.iso;
    if(!grouped[key]) grouped[key]=[];
    grouped[key].push(h);
  });
  const keys = Object.keys(grouped).sort((a,b)=> b.localeCompare(a));
  const filter = $('history-date') && $('history-date').value ? $('history-date').value : null;
  const showKeys = filter ? [filter] : keys;
  showKeys.forEach(k=>{
    if(!grouped[k]) return;
    const dayDiv = document.createElement('div'); dayDiv.className='history-day';
    const header = document.createElement('div'); header.innerHTML = '<b>' + displayDateFromISO(k) + '</b>';
    dayDiv.appendChild(header);
    let dailyTotal = 0;
    grouped[k].forEach(rec=>{
      const it = document.createElement('div'); it.className='history-item';
      const left = document.createElement('div');
      left.innerHTML = '<b>'+getTableFullName(rec.table)+'</b><div class="small">'+rec.time+'</div>';
      const right = document.createElement('div'); right.className='small'; right.innerText = rec.items.length + ' món • ' + fmtV(rec.total) + ' VND';
      it.appendChild(left); it.appendChild(right);
      it.style.cursor = 'pointer';
      it.addEventListener('click', ()=>{
        if(it._expanded){
          if(it._details) it.removeChild(it._details);
          it._expanded = false;
        } else {
          const details = document.createElement('div'); details.style.marginTop='6px';
          rec.items.forEach(i=>{
            const r = document.createElement('div'); r.className='small'; r.innerText = i.name + ' x' + i.qty + ' • ' + fmtV(i.price*i.qty) + ' VND';
            details.appendChild(r);
          });
          it.appendChild(details);
          it._details = details;
          it._expanded = true;
        }
      });
      dayDiv.appendChild(it);
      dailyTotal += rec.total;
    });
    const foot = document.createElement('div'); foot.className='history-total'; foot.innerText = 'Tổng doanh số: ' + fmtV(dailyTotal) + ' VND';
    dayDiv.appendChild(foot);
    container.appendChild(dayDiv);
  });
}

// hiện danh sách bàn để chọn (có overlay mờ nền)
function openTableModal() {
  // ===== Overlay mờ nền =====
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.5)'; // nền mờ
  overlay.style.zIndex = '999';
  document.body.appendChild(overlay);

  // ===== Bảng chọn bàn =====
  const list = document.createElement('div');
  list.style.position = 'fixed';
  list.style.top = '50%';
  list.style.left = '50%';
  list.style.transform = 'translate(-50%, -50%)';
  list.style.background = '#fff';
  list.style.padding = '20px';
  list.style.zIndex = '1000';   // nằm trên overlay
  list.style.border = '1px solid #ccc';
  list.style.borderRadius = '8px';
  list.style.maxWidth = '95%';
  list.style.width = '600px';
  list.style.maxHeight = '80vh';
  list.style.overflowY = 'auto';

  let selectedTable = null;

  // ===== Hàm đóng modal =====
  function closeModal() {
    document.body.removeChild(list);
    document.body.removeChild(overlay);
  }

  // ===== Hàm tạo nút bàn =====
  function createTableBtn(name) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerText = name;
    btn.style.transition = "0.2s";

    btn.onclick = () => {
  if (selectedTable) {
    selectedTable.className = "btn btn-secondary";
  }
  selectedTable = btn;
  btn.className = "btn btn-primary";  // xanh dương
};

    return btn;
  }

  // ===== Hàm render nhóm =====
  function renderGroup(titleText, layoutFn) {
    const group = document.createElement("fieldset");
    group.style.border = "1px solid #ddd";
    group.style.borderRadius = "8px";
    group.style.padding = "10px";
    group.style.marginBottom = "15px";
    group.style.background = "#f9f9f9";

    const legend = document.createElement("legend");
    legend.innerText = titleText;
    legend.style.fontSize = "12px";
    legend.style.padding = "0 6px";
    legend.style.textAlign = "center";
    group.appendChild(legend);

    layoutFn(group);
    list.appendChild(group);
  }

  // ===== Nhóm Lầu =====
  renderGroup("Bàn trên lầu", (group) => {
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(4, 1fr)";
    grid.style.gap = "10px";
    ["L1","L2","L3","L4"].forEach(name => {
      grid.appendChild(createTableBtn(name));
    });
    group.appendChild(grid);
  });

  // ===== Nhóm Ngoài trời =====
  renderGroup("Bàn ngoài trời", (group) => {
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(2, 1fr)";
    grid.style.gap = "10px";
    ["NT1","NT2"].forEach(name => {
      grid.appendChild(createTableBtn(name));
    });
    group.appendChild(grid);
  });

  // ===== Nhóm T / G / N song song =====
  const threeCols = document.createElement("div");
  threeCols.style.display = "flex";
  threeCols.style.gap = "15px";
  threeCols.style.marginBottom = "15px";
  threeCols.style.alignItems = "flex-start";

  function renderMiniGroup(titleText, tables) {
    const group = document.createElement("fieldset");
    group.style.border = "1px solid #ddd";
    group.style.borderRadius = "8px";
    group.style.padding = "10px";
    group.style.background = "#f9f9f9";
    group.style.flex = "1";

    const legend = document.createElement("legend");
    legend.innerText = titleText;
    legend.style.fontSize = "12px";
    legend.style.padding = "0 5px";
    legend.style.textAlign = "center";
    group.appendChild(legend);

    const col = document.createElement("div");
    col.style.display = "flex";
    col.style.flexDirection = "column";
    col.style.gap = "8px";

    tables.forEach(name => col.appendChild(createTableBtn(name)));

    group.appendChild(col);
    return group;
  }

  threeCols.appendChild(renderMiniGroup("Bàn tường", ["T1","T2","T3","T4"]));
  threeCols.appendChild(renderMiniGroup("Bàn giữa", ["G1","G2","G3","G4"]));
  threeCols.appendChild(renderMiniGroup("Bàn nệm", ["N1","N2","N3","N4"]));
  list.appendChild(threeCols);

  // ===== Nút hành động =====
  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.justifyContent = "flex-end";
  actions.style.gap = "10px";
  actions.style.marginTop = "15px";

  const cancelBtn = document.createElement('button');
  cancelBtn.innerText = 'Huỷ';
  cancelBtn.className = 'btn btn-outline-secondary';
  cancelBtn.onclick = closeModal;

  const confirmBtn = document.createElement('button');
  confirmBtn.innerText = 'Chọn bàn';
  confirmBtn.className = 'btn btn-primary';
  confirmBtn.onclick = () => {
    if (!selectedTable) {
      alert("Vui lòng chọn một bàn trước!");
      return;
    }
    const name = selectedTable.innerText;

    if (TABLES.some(t => t.name === name && t.cart && t.cart.length > 0)) {
  showCustomAlert("Bàn " + name + " đang phục vụ, hãy chọn bàn khác hoặc vào đơn hàng của bàn này để thêm món.");
  return;
}

    const id = Date.now();
    TABLES.push({ id, name, cart: [], createdAt: Date.now() });
    saveAll();
    closeModal();
    createdFromMain = true;
    openTable(id);
  };

  actions.appendChild(cancelBtn);
  actions.appendChild(confirmBtn);
  list.appendChild(actions);

  document.body.appendChild(list);
}




// init
window.addEventListener('load', ()=>{
  if($('guest-btn')) $('guest-btn').addEventListener('click', addGuest);
  if($('guest-visit-btn')) $('guest-visit-btn').addEventListener('click', openTableModal);
  if($('cancel-order-btn')) $('cancel-order-btn').addEventListener('click', cancelOrder);
  if($('save-btn')) $('save-btn').addEventListener('click', saveOrder);
  if($('addmore-btn')) $('addmore-btn').addEventListener('click', addMore);
  if($('pay-btn')) $('pay-btn').addEventListener('click', payTable);
  if($('history-date')) $('history-date').addEventListener('change', ()=> renderHistory());
  const brand = document.getElementById('brand'); if (brand) brand.addEventListener('click', ()=>{
  hideOrderInfo();   // ✅ ẩn nút X và phần tiêu đề đơn
  backToTables();    // quay về màn hình chính
});
  renderTables(); renderCategories(); populateCatSelect(); renderMenuSettings(); saveAll();
});
