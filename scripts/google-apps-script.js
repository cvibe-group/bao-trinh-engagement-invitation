/**
 * Dán toàn bộ file này vào Extensions > Apps Script của Google Sheet.
 *
 * 1. Tạo sheet mới, ví dụ: "Sổ đính hôn Gia Bảo & Phương Trinh"
 * 2. Extensions > Apps Script > dán code này > Save
 * 3. Deploy > New deployment > Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy Web app URL vào GOOGLE_SHEETS_WEBHOOK_URL (.env.local và Vercel)
 *
 * Hai tab RSVP / Guestbook sẽ tự tạo khi có dữ liệu đầu tiên.
 */

const RSVP_SHEET = "RSVP";
const GUESTBOOK_SHEET = "Guestbook";
const TZ = "Asia/Ho_Chi_Minh";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const now = Utilities.formatDate(new Date(), TZ, "HH:mm:ss dd/MM/yyyy");

    if (data.type === "rsvp") {
      const sheet = getOrCreateSheet_(RSVP_SHEET, [
        "Thời gian",
        "Tên",
        "Tham dự",
      ]);
      sheet.appendRow([
        now,
        String(data.name || "").trim(),
        data.status === "yes" ? "Có" : "Không",
      ]);
      return json_({ ok: true });
    }

    if (data.type === "guestbook") {
      const id = String(Date.now());
      const author = String(data.author || "").trim();
      const message = String(data.message || "").trim();
      const sheet = getOrCreateSheet_(GUESTBOOK_SHEET, [
        "Thời gian",
        "Tên",
        "Lời chúc",
        "Id",
      ]);
      sheet.appendRow([now, author, message, id]);
      return json_({
        ok: true,
        wish: { id, author, at: now, message },
      });
    }

    return json_({ ok: false, error: "unknown_type" });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet(e) {
  try {
    if (e.parameter.type === "guestbook") {
      const sheet = getOrCreateSheet_(GUESTBOOK_SHEET, [
        "Thời gian",
        "Tên",
        "Lời chúc",
        "Id",
      ]);
      const values = sheet.getDataRange().getValues();
      const wishes = [];
      for (let i = values.length - 1; i >= 1; i -= 1) {
        const at = formatCell_(values[i][0]);
        const author = String(values[i][1] || "").trim();
        const message = String(values[i][2] || "").trim();
        const id = String(values[i][3] || i);
        if (!author && !message) continue;
        wishes.push({ id, author, at, message });
      }
      return json_({ ok: true, wishes });
    }

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function formatCell_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, TZ, "HH:mm:ss dd/MM/yyyy");
  }
  return String(value || "");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
