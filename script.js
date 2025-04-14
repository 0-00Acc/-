const apiUrl = "https://docs.google.com/spreadsheets/d/1hHdqnL76nACxdr_p_3gM5ITWdnQmgXiVMXO4blGTrJ8/edit?pli=1&gid=0#gid=0";

document.getElementById("recordForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const note = document.getElementById("note").value;

    const data = { date, category, amount, note };

    fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors" // 避開 Google Script 的 CORS 限制
    }).then(() => {
        alert("資料已儲存！");
        loadRecords(); // 重新載入記錄
        document.getElementById("recordForm").reset();
    }).catch(error => {
        alert("儲存失敗：" + error);
    });
});

function loadRecords() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const recordsContainer = document.getElementById("records");
            recordsContainer.innerHTML = "";

            // 跳過標題列（第一列）
            data.slice(1).forEach(record => {
                const recordElement = document.createElement("div");
                recordElement.classList.add("record");
                recordElement.innerHTML = `
                    <p><strong>日期：</strong>${record[0]}</p>
                    <p><strong>類別：</strong>${record[1]}</p>
                    <p><strong>金額：</strong>${record[2]}</p>
                    <p><strong>備註：</strong>${record[3]}</p>
                    <hr>
                `;
                recordsContainer.appendChild(recordElement);
            });
        }).catch(error => {
            console.error("載入資料失敗：", error);
        });
}

// 載入頁面時讀取紀錄
loadRecords();


