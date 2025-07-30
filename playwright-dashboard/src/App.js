import React, { useEffect, useState } from 'react';

function App() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch('../public/report.json')
      .then(res => res.json())
      .then(data => setReport(data));
  }, []);

  if (!report) return <h2>Loading report...</h2>;

  const summary = {
    passed: 0, failed: 0, skipped: 0, flaky: 0,
    total: 0
  };

  const allTests = [];

  report.suites.forEach(suite =>
    suite.suites.forEach(inner =>
      inner.tests.forEach(test => {
        const status = test.results[0]?.status || 'unknown';
        summary[status] = (summary[status] || 0) + 1;
        summary.total++;
        allTests.push({
          title: test.title.join(' › '),
          status,
          duration: test.results[0]?.duration || 0,
        });
      })
    )
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>🎯 Playwright Test Report</h1>
      <p>Total: {summary.total} | ✅ Passed: {summary.passed} | ❌ Failed: {summary.failed} | 🔁 Flaky: {summary.flaky} | 🤷 Skipped: {summary.skipped}</p>

      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 20 }}>
        <thead>
          <tr>
            <th>Test</th>
            <th>Status</th>
            <th>Duration (ms)</th>
          </tr>
        </thead>
        <tbody>
          {allTests.map((t, i) => (
            <tr key={i}>
              <td>{t.title}</td>
              <td>{t.status.toUpperCase()}</td>
              <td>{t.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
