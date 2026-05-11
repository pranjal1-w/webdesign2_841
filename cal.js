function calculateResult() {
  // ── 1. Read & validate subject count ──────────────────────────────────────
  const numSubjects = parseInt(document.getElementById("numsubjects").value);

  if (isNaN(numSubjects) || numSubjects <= 0) {
    alert("Please enter a valid number of subjects.");
    return;
  }

  // ── 2. Collect marks via prompt ────────────────────────────────────────────
  let totalMarks = 0;
  const marksArray = [];

  for (let i = 1; i <= numSubjects; i++) {
    const input = prompt(`Enter marks for Subject ${i} (out of 100):`);

    // User pressed Cancel
    if (input === null) {
      alert("Result calculation cancelled.");
      return;
    }

    const mark = parseFloat(input);

    if (isNaN(mark) || mark < 0 || mark > 100) {
      alert(`Invalid marks for Subject ${i}. Please enter a number between 0 and 100.`);
      return;
    }

    marksArray.push(mark);
    totalMarks += mark;
  }

  // ── 3. Calculate average ───────────────────────────────────────────────────
  const averageMarks = parseFloat((totalMarks / numSubjects).toFixed(2));

  // ── 4. Determine grade ─────────────────────────────────────────────────────
  let grade, gradeClass;

  if (averageMarks >= 90) {
    grade = "A";  gradeClass = "grade-a";
  } else if (averageMarks >= 75) {
    grade = "B";  gradeClass = "grade-b";
  } else if (averageMarks >= 60) {
    grade = "C";  gradeClass = "grade-c";
  } else if (averageMarks >= 40) {
    grade = "D";  gradeClass = "grade-d";
  } else {
    grade = "F";  gradeClass = "grade-f";
  }

  // ── 5. Determine pass / fail ───────────────────────────────────────────────
  const passed       = averageMarks >= 40;
  const resultStatus = passed ? "PASS" : "FAIL";
  const resultClass  = passed ? "grade-a" : "grade-f";

  // ── 6. Build per-subject rows ──────────────────────────────────────────────
  const subjectRows = marksArray
    .map((m, idx) => {
      const rowClass = m >= 40 ? "" : "grade-f";
      return `
        <tr>
          <td>Subject ${idx + 1}</td>
          <td class="${rowClass}">${m}</td>
          <td class="${rowClass}">${m >= 40 ? "✔ Pass" : "✘ Fail"}</td>
        </tr>`;
    })
    .join("");

  // ── 7. Render result box ───────────────────────────────────────────────────
  const resultBox = document.getElementById("resultBox");

  resultBox.innerHTML = `
    <h2 style="margin-bottom:1rem;">📊 Result Summary</h2>

    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Marks</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${subjectRows}
      </tbody>
    </table>

    <div style="margin-top:1.2rem; display:flex; flex-direction:column; gap:.6rem;">

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="color:var(--muted); font-size:.85rem;">Total Marks</span>
        <span style="font-family:'JetBrains Mono',monospace; font-weight:600;">
          ${totalMarks} / ${numSubjects * 100}
        </span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="color:var(--muted); font-size:.85rem;">Average</span>
        <span style="font-family:'JetBrains Mono',monospace; font-weight:600;">
          ${averageMarks} / 100
        </span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="color:var(--muted); font-size:.85rem;">Grade</span>
        <span class="${gradeClass}" style="font-size:1.1rem; font-weight:700;">${grade}</span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="color:var(--muted); font-size:.85rem;">Result</span>
        <span class="${resultClass}" style="font-size:1rem; font-weight:700; letter-spacing:.06em;">
          ${resultStatus}
        </span>
      </div>

    </div>
  `;

  // Show the box (removes the d-none class set in HTML)
  resultBox.classList.remove("d-none");

  // Smooth scroll so user sees the result
  resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}