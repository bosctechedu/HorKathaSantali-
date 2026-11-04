// Ported from EDISAM (edisam.ai.studio) — same UI, texts, question banks and behaviour.
// Converted from the production bundle back to TSX; local variable names are the minified originals.
// EDISAM's client-side PDF maker (html2canvas + jsPDF, loaded only when a PDF is downloaded).

export const generateEdisamPdf = async (a: any) => {
  try {
    const t = document.createElement("div");
    ((t.style.position = "absolute"),
      (t.style.left = "-9999px"),
      (t.style.top = "-9999px"),
      (t.style.width = "794px"),
      (t.style.minHeight = "1123px"),
      (t.style.backgroundColor = "#ffffff"),
      (t.style.fontFamily =
        'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", "Noto Sans Devanagari", sans-serif'),
      (t.style.color = "#0f172a"),
      (t.style.boxSizing = "border-box"),
      (t.style.padding = "0"),
      (t.style.margin = "0"));
    const s = Array.isArray(a.content) ? a.content : [a.content],
      n =
        a.date ||
        new Date().toLocaleDateString("hi-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
    let o = "";
    if (a.sections && a.sections.length > 0)
      for (const g of a.sections) {
        let b = "";
        g.body &&
          (b = (Array.isArray(g.body) ? g.body : [g.body])
            .map(
              (j: any) =>
                `<p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.6; color: #334155;">${j}</p>`,
            )
            .join(""));
        let m = "";
        g.bulletPoints &&
          g.bulletPoints.length > 0 &&
          (m = `<ul style="margin: 6px 0 12px 0; padding-left: 20px; font-size: 13px; color: #1e293b; line-height: 1.6;">
            ${g.bulletPoints.map((C: any) => `<li style="margin-bottom: 6px;">${C}</li>`).join("")}
          </ul>`);
        let B = "";
        if (g.tableData && g.tableData.headers) {
          const { headers: C, rows: j } = g.tableData;
          B = `<table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12px;">
            <thead>
              <tr style="background-color: #064e3b; color: #ffffff;">
                ${C.map((y: any) => `<th style="padding: 8px 10px; text-align: left; border: 1px solid #064e3b; font-weight: 700;">${y}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${j
                .map(
                  (y: any, E: any) => `
                <tr style="background-color: ${E % 2 === 0 ? "#f8fafc" : "#ffffff"};">
                  ${y.map((U: any) => `<td style="padding: 7px 10px; border: 1px solid #e2e8f0; color: #334155;">${U}</td>`).join("")}
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>`;
        }
        o += `
          <div style="margin-top: 18px; margin-bottom: 18px; page-break-inside: avoid;">
            <div style="background-color: #f1f5f9; border-left: 4px solid #10b981; padding: 8px 12px; margin-bottom: 10px; border-radius: 0 6px 6px 0;">
              <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #064e3b;">${g.heading}</h3>
            </div>
            ${b}
            ${m}
            ${B}
          </div>
        `;
      }
    ((t.innerHTML = `
      <div style="position: relative; width: 100%; min-height: 1123px; padding-bottom: 60px; box-sizing: border-box;">
        <!-- Header Bar -->
        <div style="background-color: #064e3b; color: #ffffff; padding: 12px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #f59e0b;">
          <div>
            <span style="font-size: 14px; font-weight: 800; letter-spacing: 0.5px; color: #ffffff;">EDISAM - India's Smart Education & Knowledge Platform</span>
          </div>
          <div style="font-size: 11px; font-weight: 600; color: #fde68a;">
            Official Study & Exam Resource
          </div>
        </div>

        <!-- Watermark -->
        <div style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 42px; font-weight: 900; color: rgba(226, 232, 240, 0.45); pointer-events: none; text-align: center; white-space: nowrap; font-family: sans-serif;">
          EDISAM STUDY MATERIAL
        </div>

        <!-- Main Body Area -->
        <div style="padding: 28px 36px;">
          ${a.category ? `<div style="font-size: 12px; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">${a.category}</div>` : ""}
          
          <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #0f172a; line-height: 1.3;">${a.title}</h1>
          
          ${a.subtitle ? `<p style="margin: 0 0 12px 0; font-size: 14px; color: #475569; font-weight: 500; line-height: 1.5;">${a.subtitle}</p>` : ""}
          
          <div style="font-size: 11px; color: #64748b; font-style: italic; margin-bottom: 12px;">
            प्रकाशित तिथि / Date: ${n} | Verified by EDISAM Academic & Research Team
          </div>

          <div style="height: 2px; background: linear-gradient(to right, #10b981, #f59e0b, #e2e8f0); margin-bottom: 20px;"></div>

          <!-- Content Paragraphs -->
          <div style="font-size: 13.5px; line-height: 1.6; color: #1e293b; margin-bottom: 16px;">
            ${s.map((g: any) => `<p style="margin: 0 0 10px 0;">${g}</p>`).join("")}
          </div>

          <!-- Structured Sections -->
          ${o}
        </div>

        <!-- Footer Bar -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 36px; border-top: 1px solid #e2e8f0; background-color: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b;">
          <div>Downloaded from EDISAM Portal • Free & Verified Educational Resource</div>
          <div>Page 1 • www.edisam.com</div>
        </div>
      </div>
    `),
      document.body.appendChild(t));
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");
    const l = await html2canvas(t, {
      scale: 2,
      useCORS: !0,
      logging: !1,
      backgroundColor: "#ffffff",
    });
    document.body.removeChild(t);
    const A = l.toDataURL("image/jpeg", 0.92),
      d = new jsPDF("p", "mm", "a4"),
      u = d.internal.pageSize.getWidth(),
      h = (l.height * u) / l.width;
    d.addImage(A, "JPEG", 0, 0, u, h);
    const p = (a.fileName || a.title)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .substring(0, 40);
    d.save(`EDISAM_${p || "document"}.pdf`);
  } catch (t) {
    console.error("PDF Generation Error:", t);
  }
};
