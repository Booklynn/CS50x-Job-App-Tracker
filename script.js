const form = document.getElementById("jobForm");
const addButton = document.getElementById("addButton");
const applicationList = document.getElementById("applicationList");
let jobApplications = [];

window.addEventListener("load", () => {
  jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
  jobApplications.forEach((application, index) => {
    if (!application.statusDate) {
      application.statusDate = application.dateApplied;
    }
    addApplicationRow(application, index);
  });
});

addButton.addEventListener("click", () => {
  const companyName = document.getElementById("companyName").value;
  const positionName = document.getElementById("positionName").value;
  const dateApplied = document.getElementById("dateApplied").value;

  if (companyName && positionName && dateApplied) {
    const application = {
      companyName,
      positionName,
      dateApplied
    };

    jobApplications.push(application);
    localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

    addApplicationRow(application, jobApplications.length - 1);

    form.reset();
  } else {
    alert("Please fill all the required fields.");
  }
});

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  const rowIndex = Array.from(applicationList.children).indexOf(row);
  jobApplications.splice(rowIndex, 1);
  localStorage.setItem("jobApplications", JSON.stringify(jobApplications));
  applicationList.removeChild(row);
}

function addApplicationRow(application, index) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" value="${application.positionName}" oninput="updateJobData(${index}, 'positionName', this.value)"></td>
    <td><input type="text" value="${application.companyName}" oninput="updateJobData(${index}, 'companyName', this.value)"></td>
    <td><input type="date" value="${application.dateApplied}" oninput="updateJobData(${index}, 'dateApplied', this.value)"></td>
    <td><input type="text" value="${application.status || 'Applied'}" oninput="updateJobData(${index}, 'status', this.value)"></td>
    <td><input type="date" value="${application.statusDate}" oninput="updateJobData(${index}, 'statusDate', this.value)"></td>
    <td><button type="button" onclick="deleteRow(this)">Delete</button></td>
  `;
  applicationList.appendChild(newRow);
}

function updateJobData(index, field, value) {
  jobApplications[index][field] = value;
  localStorage.setItem("jobApplications", JSON.stringify(jobApplications));
}
